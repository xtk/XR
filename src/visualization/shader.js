// provides
goog.provide('X.shader');

// requires
goog.require('goog.webgl');


X.shader.VERTEX = ['precision mediump float;',
                   'attribute vec3 aVertexPosition;',
                   '// {ATTRIBUTES}',
                   '// {UNIFORMS}',
                   '// {VARYING}',
                   '// {FUNCTIONS}',
                   'void main(void) {',
                     '// {MAIN_BEGIN}',
                     'gl_Position = vec4(aVertexPosition, 1.0);',
                     '// {MAIN_END}',
                   '}'].join('\n');

X.shader.FRAGMENT = ['precision mediump float;',
                     '// {UNIFORMS}',
                     '// {VARYING}',
                     '// {FUNCTIONS}',
                     'void main(void) {',
                       '// {MAIN_BEGIN}',
                       'gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);',
                       '// {MAIN_END}',
                     '}'].join('\n');


/**
 * Compile a GL shader.
 */
X.shader.compile_ = function(gl, shader, type) {

  var gl_shader = gl.createShader(type);
  gl.shaderSource(gl_shader, shader);
  gl.compileShader(gl_shader);

  if (!gl.getShaderParameter(gl_shader, goog.webgl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(gl_fragment_shader));
  }

  return gl_shader;

};


/**
 * Create a shader program from a vertex shader and fragment shader sources.
 *
 * @param {!Object} gl The WebGL rendering context.
 * @param {!string} vertex_shader The vertex shader source.
 * @param {!string} fragment_shader The fragment shader source.
 * @return {!Object} The created shader program.
 * @public
 */
X.shader.create = function(gl, vertex_shader, fragment_shader) {

  var shader_program = gl.createProgram();
  gl.attachShader(shader_program, X.shader.compile_(gl, vertex_shader,
      goog.webgl.VERTEX_SHADER));
  gl.attachShader(shader_program, X.shader.compile_(gl, fragment_shader,
      goog.webgl.FRAGMENT_SHADER));
  gl.linkProgram(shader_program);

  if (!gl.getProgramParameter(shader_program, goog.webgl.LINK_STATUS)) {
    throw new Error('Could not link shaders.');
  }

  return shader_program;

};

goog.exportSymbol('X.shader.create', X.shader.create);
