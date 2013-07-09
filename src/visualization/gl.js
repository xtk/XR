// provides
goog.provide('X.gl');

// requires
goog.require('goog.webgl');

/**
 * Create a static GL buffer for a given array and return it.
 *
 * @param {?ArrayBuffer|ArrayBufferView|number} data The array data to buffer.
 * @return {!Object} The created GL buffer.
 * @this {WebGLRenderingContext}
 * @public
 */
X.gl.create_buffer = function(data) {

  var gl_buffer = this.createBuffer();
  this.bindBuffer(goog.webgl.ARRAY_BUFFER, gl_buffer);
  this.bufferData(goog.webgl.ARRAY_BUFFER, data, goog.webgl.STATIC_DRAW);

  return gl_buffer;

};

/**
 * Create a static GL element buffer for a given array and return it.
 *
 * @param {?ArrayBuffer|ArrayBufferView|number} data The array data to buffer.
 * @return {!Object} The created GL buffer.
 * @this {WebGLRenderingContext}
 * @public
 */
X.gl.create_element_buffer = function(data) {

  var gl_buffer = this.createBuffer();
  this.bindBuffer(goog.webgl.ELEMENT_ARRAY_BUFFER, gl_buffer);
  this.bufferData(goog.webgl.ELEMENT_ARRAY_BUFFER, data, goog.webgl.STATIC_DRAW);

  return gl_buffer;

};

/**
 * Bind a GL buffer to the WebGL rendering context using the relevant attribute position.
 *
 * @param {!number} position The shader attribute position to bind this buffer to.
 * @param {?WebGLBuffer} gl_buffer The GL buffer to bind.
 * @param {!number} itemsize The item size, e.g. (3 for x,y,z).
 * @this {WebGLRenderingContext}
 * @public
 */
X.gl.attribute = function(position, gl_buffer, itemsize) {

  this.enableVertexAttribArray(position);

  this.bindBuffer(goog.webgl.ARRAY_BUFFER, gl_buffer);
  this.vertexAttribPointer(position, itemsize, goog.webgl.FLOAT, false, 0, 0);

};

goog.exportSymbol('X.gl.create_buffer', X.gl.create_buffer);
goog.exportSymbol('X.gl.attribute', X.gl.attribute);
