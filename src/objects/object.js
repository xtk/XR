// provides
goog.provide('X.object2');

// requires
goog.require('X.base');
goog.require('X.buffer');
goog.require('X.shader');

/**
 * The superclass for all renderable objects.
 *
 * @constructor
 * @extends X.base
 */
X.object2 = function() {

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
  this._classname = 'object2';

  this._points = new Float32Array( [
             -1.0,  1.0,  0.0,
            -1.0, -1.0,  0.0,
             1.0, -1.0,  0.0
        ]);

};
// enable events
X.__extends__(X.object2, X.base);

X.object2.prototype.init_shaders = function(gl) {

  var fragment_shader = X.shader.FRAGMENT;
  //fragment_shader = fragment_shader.replace('// {UNIFORMS}', 'uniform vec3 uColor;');
  fragment_shader = fragment_shader.replace('// {MAIN_END}', 'gl_FragColor = vec4(0.0,0.0,0.0,1.0);');


  this.shader_program = X.shader.create(gl, X.shader.VERTEX, fragment_shader);

  return this.shader_program;

};

X.object2.prototype.init_buffers = function(gl) {

  this._vertex_buffer = X.buffer.create(gl, this._points);

};

X.object2.prototype.render = function(gl) {

  X.buffer.bind(gl, this.shader_program, 'aVertexPosition', this._vertex_buffer, 3);

  gl.drawArrays(gl.TRIANGLES, 0, 3);

};



goog.exportSymbol('X.object2', X.object2);
