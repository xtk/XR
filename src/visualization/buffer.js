// provides
goog.provide('X.buffer');

// requires
goog.require('goog.webgl');


/**
 * Create a static GL buffer for a given array and return it.
 *
 * @param {!Object} gl The WebGL rendering context.
 * @param {!Array} data The array data to buffer.
 * @return {!Object} The created GL buffer.
 * @public
 */
X.buffer.create = function(gl, data) {

  var gl_buffer = gl.createBuffer();
  gl.bindBuffer(goog.webgl.ARRAY_BUFFER, gl_buffer);
  gl.bufferData(goog.webgl.ARRAY_BUFFER, data, goog.webgl.STATIC_DRAW);

  return gl_buffer;

};

/**
 * Destroy an existing GL buffer.
 *
 * @param {!Object} gl The WebGL rendering context.
 * @param {!Object} gl_buffer The GL buffer to destroy.
 * @public
 */
X.buffer.destroy = function(gl, gl_buffer) {

  if (gl.isBuffer(gl_buffer)) {
    gl.deleteBuffer(gl_buffer);
  }

};

/**
 * Bind a GL buffer to the WebGL rendering context using the given shader program
 * and the relevant attribute name.
 *
 * @param {!Object} gl The WebGL rendering context.
 * @param {!Object} shader_program The shader program to use.
 * @param {!string} attribute The shader attribute to bind this buffer to.
 * @param {!Object} gl_buffer The GL buffer to bind.
 * @param {!number} itemsize The item size, e.g. (3 for x,y,z).
 * @public
 */
X.buffer.bind = function(gl, shader_program, attribute, gl_buffer, itemsize) {

  var position = gl.getAttribLocation(shader_program, attribute);
  gl.enableVertexAttribArray(position);

  gl.bindBuffer(goog.webgl.ARRAY_BUFFER, gl_buffer);
  gl.vertexAttribPointer(position, itemsize, gl.FLOAT, false, 0, 0);

};

goog.exportSymbol('X.buffer.create', X.buffer.create);
goog.exportSymbol('X.buffer.destroy', X.buffer.destroy);
goog.exportSymbol('X.buffer.bind', X.buffer.bind);
