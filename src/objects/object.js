// provides
goog.provide('X.object');

// requires
goog.require('X.base');
goog.require('X.shaderV');
goog.require('X.shaderF');
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

  this._color = [1.0,1.0,0.0];

  this._attributes = null;

  this._uniforms = null;

  this._type = goog.webgl.POINTS;

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
  this._face_buffer = this._gl.create_element_buffer(this._faces);
  this._faces_length = this._faces.length;

  this._normal_buffer = this._gl.create_buffer(this._normals);

};

/**
 *
 */
X.object.prototype.render = function(camera) {

  var gl = this._gl;

  gl.uniformMatrix4fv(this._uniforms['perspective'], false, camera._perspective);
  gl.uniformMatrix4fv(this._uniforms['view'], false, camera._view);

  gl.attribute(this._attributes['aVertexPosition'], this._vertex_buffer, 3);
  gl.attribute(this._attributes['aVertexNormal'], this._normal_buffer, 3);

  if (!this._faces) {

    // non-indexed drawing
    gl.drawArrays(this._type, 0, this._vertex_count);

  } else {

    // indexed drawing
    //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._face_buffer);
    gl.drawElements(this._type, 50000, goog.webgl.UNSIGNED_SHORT, 0);
    gl.drawElements(this._type, 100000, goog.webgl.UNSIGNED_SHORT, 50000);
    gl.drawElements(this._type, 150000, goog.webgl.UNSIGNED_SHORT, 100000);

  }

};

/**
 *
 */
X.object.prototype.destroy = function() {

};

X.object.normalize = function(vertices, faces) {

  var _normals = new Float32Array(vertices.length);
  var _counter = new Uint32Array(vertices.length);


  var _face_count = faces.length / 3;
  for (var i=0; i<_face_count; i++) {

    var f = i*3;

    var v_index_a = faces[f];
    _counter[v_index_a] += 1;
    v_index_a *= 3;
    var a = new X.vector(vertices[v_index_a], vertices[v_index_a+1], vertices[v_index_a+2]);
    var v_index_b = faces[f+1];
    _counter[v_index_b] += 1;
    v_index_b *= 3;
    var b = new X.vector(vertices[v_index_b], vertices[v_index_b+1], vertices[v_index_b+2]);
    var v_index_c = faces[f+2];
    _counter[v_index_c] += 1;
    v_index_c *= 3;
    var c = new X.vector(vertices[v_index_c], vertices[v_index_c+1], vertices[v_index_c+2]);

    var e1 = b.clone().subtract(a);
    var e2 = c.clone().subtract(a);
    var normal = X.vector.cross(e1, e2).normalize();
    var n_x = normal.x;
    var n_y = normal.y;
    var n_z = normal.z;

    _normals[v_index_a] += n_x;
    _normals[v_index_a+1] += n_y;
    _normals[v_index_a+2] += n_z;
    _normals[v_index_b] += n_x;
    _normals[v_index_b+1] += n_y;
    _normals[v_index_b+2] += n_z;
    _normals[v_index_c] += n_x;
    _normals[v_index_c+1] += n_y;
    _normals[v_index_c+2] += n_z;

  }
  for (var i=0; i<_face_count; i++) {

    var f = i*3;
    var v_index_a = faces[f];
    v_index_a *= 3;
    var a = new X.vector(_normals[v_index_a], _normals[v_index_a+1], _normals[v_index_a+2]);


    var v_index_b = faces[f+1];
    v_index_b *= 3;
    var b = new X.vector(_normals[v_index_b], _normals[v_index_b+1], _normals[v_index_b+2]);

    var v_index_c = faces[f+2];
    v_index_c *= 3;
    var c = new X.vector(_normals[v_index_c], _normals[v_index_c+1], _normals[v_index_c+2]);

    var n1 = a.scale(1/_counter[v_index_a]).normalize();
    var n2 = b.scale(1/_counter[v_index_b]).normalize();
    var n3 = c.scale(1/_counter[v_index_c]).normalize();

    _normals[v_index_a] = n1.x;
    _normals[v_index_a+1] = n1.y;
    _normals[v_index_a+2] = n1.z;
    _normals[v_index_b] = n2.x;
    _normals[v_index_b+1] = n2.y;
    _normals[v_index_b+2] = n2.z;
    _normals[v_index_c] = n3.x;
    _normals[v_index_c+1] = n3.y;
    _normals[v_index_c+2] = n3.z;

  }


  return _normals;

};

goog.exportSymbol('X.object', X.object);
goog.exportSymbol('X.object.prototype.init', X.object.prototype.init);
goog.exportSymbol('X.object.prototype.update', X.object.prototype.update);
goog.exportSymbol('X.object.prototype.render', X.object.prototype.render);
goog.exportSymbol('X.object.prototype.destroy', X.object.prototype.destroy);
