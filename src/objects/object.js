// provides
goog.provide('X.object');

// requires
goog.require('X.base');

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

  this._points = new Float32Array( [
             0.0,  1.0,  0.0,
            -1.0, -1.0,  0.0,
             1.0, -1.0,  0.0
        ]);

};
// enable events
X.__extends__(X.object, X.base);

X.object.prototype.init_shaders = function(gl) {

var vertex_shader = " \
  attribute vec3 aVertexPosition; \
\
  void main(void) { \
      gl_Position = vec4(aVertexPosition, 1.0); \
  } \
  ";

var fragment_shader = " \
\
    precision mediump float;\
\
    void main(void) {\
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\
    }\
  ";

// compile the fragment and vertex shaders
var _glFragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(_glFragmentShader, fragment_shader);
gl.compileShader(_glFragmentShader);

if (!gl.getShaderParameter(_glFragmentShader, gl.COMPILE_STATUS)) {
  alert(gl.getShaderInfoLog(_glFragmentShader));
  return null;
}

var _glVertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(_glVertexShader, vertex_shader);
gl.compileShader(_glVertexShader);

if (!gl.getShaderParameter(_glVertexShader, gl.COMPILE_STATUS)) {
  alert(gl.getShaderInfoLog(_glVertexShader));
  return null;
}


var shader_program = gl.createProgram();
gl.attachShader(shader_program, _glVertexShader);
gl.attachShader(shader_program, _glFragmentShader);
gl.linkProgram(shader_program);

if (!gl.getProgramParameter(shader_program, gl.LINK_STATUS)) {
  alert("Could not initialise shaders");
}

this.shader_program = shader_program;

return shader_program;

};

X.object.prototype.init_buffers = function(gl) {

  var vertex_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, this._points, gl.STATIC_DRAW);

  this.vertex_buffer = vertex_buffer;

};

X.object.prototype.render = function(gl) {

  // after switching the shader program
  var vertex_pos = gl.getAttribLocation(this.shader_program, "aVertexPosition");
  gl.enableVertexAttribArray(vertex_pos);

  gl.bindBuffer(gl.ARRAY_BUFFER, this.vertex_buffer);
  gl.vertexAttribPointer(vertex_pos, 3, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

};



goog.exportSymbol('X.object', X.object);
