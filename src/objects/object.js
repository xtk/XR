// provides
goog.provide('X.object');

// requires
goog.require('X.base');
goog.require('X.shaderV');
goog.require('X.shaderF');
goog.require('X.triplets');
goog.require('X.vector');
goog.require('goog.webgl');

/**
 * The superclass for all renderable objects.
 *
 * @constructor
 * @extends X.base
 */
X.object = function() {

  // call the superclass constructor
  X.__super__(this);

  //
  // class attributes

  /**
   * The classname of this class.
   *
   * @type {!string}
   * @protected
   */
  this._classname = 'object';

  this._gl = null;

  this._vertex_count = 0;

  this._vertices = null;

  this._face_count = 0;

  this._faces_length = 0;

  this._faces = null;

  this._normals = null;

  this._colors = null;

  this._color = new Float32Array([1.0,1.0,0.0]);

  this._attributes = null;

  this._uniforms = null;

  this._type = goog.webgl.TRIANGLES;

  this._center = new Float32Array([0,0,0]);

  this._light = new Float32Array([0,-1,-1]);

  this._light_direction = new Float32Array([0, 0, -1]);

  this._specular = 1;

  this._diffuse = 0.4;

  this._ambient = 0.3;

  this._ambient_color = [0.6, 0.6, 0.6];

  //
  // create the default shaders

  this._vertex_shader = new X.shaderV();

  this._fragment_shader = new X.shaderF();

};
// enable events
X.__extends__(X.object, X.base);

Object.defineProperty(X.object.prototype, 'gl', {
  /**
   * Get the WebGL rendering context.
   *
   * @return {?Object} The WebGL rendering context.
   * @this {X.object}
   * @public
   */
  get : function() {
    return this._gl;
  }
});

Object.defineProperty(X.object.prototype, 'vertex_shader', {
  /**
   * Get the vertex shader of this object.
   *
   * @return {!X.shaderV} The vertex shader.
   * @this {X.object}
   * @public
   */
  get : function() {
    return this._vertex_shader;
  }
});

Object.defineProperty(X.object.prototype, 'fragment_shader', {
  /**
   * Get the fragment shader of this object.
   *
   * @return {!X.shaderF} The fragment shader.
   * @this {X.object}
   * @public
   */
  get : function() {
    return this._fragment_shader;
  }
});

Object.defineProperty(X.object.prototype, 'attributes', {
  /**
   * Get the attributes and attribute locations of this object.
   *
   * @return {!Object} The dictionary of attributes of this object.
   * @this {X.object}
   * @public
   */
  get : function() {
    return this._attributes;
  }
});

Object.defineProperty(X.object.prototype, 'uniforms', {
  /**
   * Get the uniforms and uniform locations of this object.
   *
   * @return {!Object} The dictionary of uniforms of this object.
   * @this {X.object}
   * @public
   */
  get : function() {
    return this._uniforms;
  }
});

/**
 *
 * @param gl
 * @returns
 */
X.object.prototype.init = function(gl) {

  this._gl = gl;

  // create the shader program and store the attribute and uniform locations
  var shader_program = X.shader.create(gl, this._vertex_shader._source, this._fragment_shader._source);
  this._attributes = this._vertex_shader.get_attribute_locations(gl, shader_program);
  this._uniforms = {};
  var vertex_uniforms = this._vertex_shader.get_uniform_locations(gl, shader_program);
  for (var vu in vertex_uniforms) {
    this._uniforms[vu] = vertex_uniforms[vu];
  }
  var fragment_uniforms = this._fragment_shader.get_uniform_locations(gl, shader_program);
  for (var fu in fragment_uniforms) {
    this._uniforms[fu] = fragment_uniforms[fu];
  }

  this.update();

  return shader_program;

};

/**
 *
 */
X.object.prototype.update = function() {

  this._vertex_buffer = this._gl.create_buffer(this._vertices);
  this._vertex_count = this._vertices.count;

  if (this._faces) {
    this._face_buffer = this._gl.create_element_buffer(this._faces);
    this._faces_length = this._faces.length;
  }

  this._normal_buffer = this._gl.create_buffer(this._normals);

};

/**
 *
 */
X.object.prototype.render = function(camera) {

  var gl = this._gl;

  gl.uniformMatrix4fv(this._uniforms['u_perspective'], false, camera._perspective);
  gl.uniformMatrix4fv(this._uniforms['u_view'], false, camera._view);

  gl.uniform3fv(this._uniforms['u_center'], this._center);
  gl.uniform3fv(this._uniforms['u_centroid'], this._vertices._centroid);

  gl.uniform3fv(this._uniforms['u_light'], this._light);
  gl.uniform3fv(this._uniforms['u_light_direction'], this._light_direction);
  gl.uniform1f(this._uniforms['u_specular'], this._specular);
  gl.uniform1f(this._uniforms['u_diffuse'], this._diffuse);
  gl.uniform1f(this._uniforms['u_ambient'], this._ambient);
  gl.uniform3fv(this._uniforms['u_ambient_color'], this._ambient_color);

  gl.attribute(this._attributes['a_vertex_position'], this._vertex_buffer, 3);
  gl.attribute(this._attributes['a_vertex_normal'], this._normal_buffer, 3);

  if (!this._faces) {

    // non-indexed drawing
    gl.drawArrays(this._type, 0, this._vertex_count);

  } else {

    // indexed drawing
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._face_buffer);
    gl.drawElements(this._type, this._faces_length, goog.webgl.UNSIGNED_SHORT, 0);

  }

};

/**
 *
 */
X.object.prototype.destroy = function() {

};

X.object.normalize = function(vertices, faces) {

  var _points = new Float32Array(faces.length * 3);
  var _normals_buffer = new Float32Array(faces.length * 9);
  var _normals = new Float32Array(faces.length * 3);
  var _normals_counter = new Uint32Array(faces.length);

  var _face_count = faces.length / 3;
  for (var i=0; i<_face_count; ++i) {

    // loop through all triangles
    // to create face normals

    var f = i*3;

    // grab the 3 vertex indices
    var index1 = faces[f];
    var index2 = faces[f+1];
    var index3 = faces[f+2];    

    // and increase the counter
    _normals_counter[index1]++;
    _normals_counter[index2]++;
    _normals_counter[index3]++;

    index1 *= 3;
    var x1 = vertices[index1];
    var y1 = vertices[index1+1];
    var z1 = vertices[index1+2];

    index2 *= 3;
    var x2 = vertices[index2];
    var y2 = vertices[index2+1];
    var z2 = vertices[index2+2];

    index3 *= 3;
    var x3 = vertices[index3];
    var y3 = vertices[index3+1];
    var z3 = vertices[index3+2];

    // add the points for this triangle
    _points.add(x1, y1, z1);
    _points.add(x2, y2, z2);
    _points.add(x3, y3, z3);

    // also create a vector representation for the normal calculation
    var a = new X.vector(x1, y1, z1);
    var b = new X.vector(x2, y2, z2);
    var c = new X.vector(x3, y3, z3);

    var e1 = a.subtract(b);
    var e2 = c.subtract(b);
    var normal = X.vector.cross(e1, e2).normalize();

    // sum all normals
    _normals_buffer[index1] += normal.x;
    _normals_buffer[index1 + 1] += normal.y;
    _normals_buffer[index1 + 2] += normal.z;
    _normals_buffer[index2] += normal.x;
    _normals_buffer[index2 + 1] += normal.y;
    _normals_buffer[index2 + 2] += normal.z;
    _normals_buffer[index3] += normal.x;
    _normals_buffer[index3 + 1] += normal.y;
    _normals_buffer[index3 + 2] += normal.z;

  }

  // now create the vertex normals
  for (var i=0; i<_face_count; ++i) {

    var f = i*3;

    // grab the 3 vertices
    var index1 = faces[f];
    var index2 = faces[f+1];
    var index3 = faces[f+2];
    var _i1 = index1*3;
    var _i2 = index2*3;
    var _i3 = index3*3;

    var n1 = new X.vector(_normals_buffer[_i1], _normals_buffer[_i1 + 1], _normals_buffer[_i1 + 2]);
    var n2 = new X.vector(_normals_buffer[_i2], _normals_buffer[_i2 + 1], _normals_buffer[_i2 + 2]);
    var n3 = new X.vector(_normals_buffer[_i3], _normals_buffer[_i3 + 1], _normals_buffer[_i3 + 2]);

    // scale the vectors according to the counter
    n1 = n1.scale(1 / _normals_counter[index1]);
    n2 = n2.scale(1 / _normals_counter[index2]);
    n3 = n3.scale(1 / _normals_counter[index3]);

    _normals.add(n1.x, n1.y, n1.z);
    _normals.add(n2.x, n2.y, n2.z);
    _normals.add(n3.x, n3.y, n3.z);
  }

  return [_points, _normals];

};

goog.exportSymbol('X.object', X.object);
goog.exportSymbol('X.object.prototype.init', X.object.prototype.init);
goog.exportSymbol('X.object.prototype.update', X.object.prototype.update);
goog.exportSymbol('X.object.prototype.render', X.object.prototype.render);
goog.exportSymbol('X.object.prototype.destroy', X.object.prototype.destroy);
