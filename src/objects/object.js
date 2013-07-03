// provides
goog.provide('X.object');

// requires
goog.require('X.base');
goog.require('X.shader');
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

  this._color = [1,0,1];

  this._attributes = {};

  this._uniforms = {};

  this._type = goog.webgl.TRIANGLES;

};
// enable events
X.__extends__(X.object, X.base);

X.object.prototype.init = function(gl) {

  this._gl = gl;

  var vertex_shader = X.shader.VERTEX;

  var fragment_shader = X.shader.FRAGMENT;
  fragment_shader = fragment_shader.replace('// {UNIFORMS}', 'uniform vec3 uColor;');
  fragment_shader = fragment_shader.replace('// {MAIN_END}', 'gl_FragColor = vec4(uColor,1.0);');

  var shader_program = X.shader.create(gl, vertex_shader, fragment_shader);

  this._attributes['aVertexPosition'] = gl.getAttribLocation(shader_program, 'aVertexPosition');
  this._uniforms['uColor'] = gl.getUniformLocation(shader_program, 'uColor');

  this.update();

  return shader_program;

};

X.object.prototype.update = function() {

  this._vertex_buffer = this._gl.create_buffer(this._points);

};

X.object.prototype.render = function() {

  var gl = this._gl;

  gl.attribute(this._attributes['aVertexPosition'], this._vertex_buffer, 3);
  gl.uniform3fv(this._uniforms['uColor'], this._color);

  gl.drawArrays(this._type, 0, 3);

};

X.object.prototype.destroy = function() {

};

goog.exportSymbol('X.object', X.object);
goog.exportSymbol('X.object.prototype.init', X.object.prototype.init);
goog.exportSymbol('X.object.prototype.update', X.object.prototype.update);
goog.exportSymbol('X.object.prototype.render', X.object.prototype.render);
goog.exportSymbol('X.object.prototype.destroy', X.object.prototype.destroy);
