// provides
goog.provide('X.object');

// requires
goog.require('X.base');
goog.require('X.shaderV');
goog.require('X.shaderF');
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

  this._points = new Float32Array( [
             -1.0,  1.0,  0.0,
            -1.0, -1.0,  0.0,
             1.0, -1.0,  0.0
        ]);

  this._color = [1.0,1.0,0.0];

  this._attributes = {};

  this._uniforms = {};

  this._type = goog.webgl.TRIANGLES;

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

X.object.prototype.init = function(gl) {

  this._gl = gl;

  // create the shader program and store the attribute and uniform locations
  var shader_program = X.shader.create(gl, this._vertex_shader._source, this._fragment_shader._source);
  this._attributes = this._vertex_shader.get_attribute_locations(gl, shader_program);
  this._uniforms = this._fragment_shader.get_uniform_locations(gl, shader_program);

  this.update();

  return shader_program;

};

X.object.prototype.update = function() {

  this._vertex_buffer = this._gl.create_buffer(this._points);

};

X.object.prototype.render = function() {

  var gl = this._gl;

  gl.attribute(this._attributes['aVertexPosition'], this._vertex_buffer, 3);

  gl.drawArrays(this._type, 0, 3);

};

X.object.prototype.destroy = function() {

};

goog.exportSymbol('X.object', X.object);
goog.exportSymbol('X.object.prototype.init', X.object.prototype.init);
goog.exportSymbol('X.object.prototype.update', X.object.prototype.update);
goog.exportSymbol('X.object.prototype.render', X.object.prototype.render);
goog.exportSymbol('X.object.prototype.destroy', X.object.prototype.destroy);
