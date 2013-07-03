// provides
goog.provide('X.buffer');

// requires
goog.require('X.base');
goog.require('goog.webgl');


/**
 * Create a GL buffer container. Besides the actual GL buffer, the container
 * stores the number of items and the size of each item.
 *
 * @param {!Object} gl The WebGL rendering context.
 * @constructor
 * @extends X.base
 * @public
 */
X.buffer = function(gl) {

  if (!goog.isDefAndNotNull(gl)) {
    throw new Error('WebGL rendering context is not defined.');
  }

  // call the standard constructor of X.base
  X.__super__(this);

  //
  // class attributes

  /**
   * @inheritDoc
   * @const
   */
  this._classname = 'buffer';

  /**
   * The WebGL rendering context.
   *
   * @type {!Object}
   * @protected
   */
  this._gl = gl;

  /**
   * The GL buffer.
   *
   * @type {?Object}
   * @protected
   */
  this._gl_buffer = null;

  /**
   * The number of items.
   *
   * @type {!number}
   * @protected
   */
  this._count = -1;

  /**
   * The size of each item.
   *
   * @type {!number}
   * @protected
   */
  this._itemsize = -1;

};
// inherit from X.base
goog.inherits(X.buffer, X.base);


Object.defineProperty(X.buffer.prototype, 'count', {
  /**
   * Return the item count of the associated data.
   * count * itemsize = data.length
   *
   * @return {!number} The number of items for the associated data.
   * @this {X.buffer}
   * @public
   */
  get : function() {
    return this._count;
  },
  /**
   * Set the item count of the associated data.
   * count * itemsize = data.length
   *
   * @param {!number} count The number of items for the associated data.
   * @this {X.buffer}
   * @public
   */
  set : function(count) {
    this._count = count;
  }
});


Object.defineProperty(X.buffer.prototype, 'itemsize', {
  /**
   * Return the item size for the associated data.
   * count * itemsize = data.length
   *
   * @return {!number} The number of items for the associated data.
   * @this {X.buffer}
   * @public
   */
  get : function() {
    return this._itemsize;
  },
  /**
   * Set the item size for the associated data.
   * count * itemsize = data.length
   *
   * @param {!number} count The number of items for the associated data.
   * @this {X.buffer}
   * @public
   */
  set : function(itemsize) {
    this._itemsize = itemsize;
  }
});


Object.defineProperty(X.buffer.prototype, 'gl_buffer', {
  /**
   * Return the GL buffer.
   *
   * @return {?Object} The GL buffer.
   * @this {X.buffer}
   * @public
   */
  get : function() {
    return this._gl_buffer;
  }
});


/**
 * Create a static GL buffer for a given array and return it.
 * This overrides any previously configured GL buffer.
 *
 * @param {!Array} data The array data to buffer.
 * @public
 */
X.buffer.create = function(data) {

  if (this._gl_buffer != null) {

    // reset the old buffer
    if (this._gl.isBuffer(this._gl_buffer)) {
      this._gl.deleteBuffer(this._gl_buffer);
    }

  }

  this._gl_buffer = this._gl.createBuffer();
  this._gl.bindBuffer(goog.webgl.ARRAY_BUFFER, this._gl_buffer);
  this._gl.bufferData(goog.webgl.ARRAY_BUFFER, data, goog.webgl.STATIC_DRAW);

};

/**
 * Bind this GL buffer to the WebGL rendering context using the given shader program
 * and the relevant attribute name.
 *
 * @param {!Object} shader_program The shader program to use.
 * @param {!string} attribute The shader attribute to bind this buffer to.
 * @public
 */
X.buffer.prototype.bind = function(shader_program, attribute) {

  var position = this._gl.getAttribLocation(shader_program, attribute);
  this._gl.enableVertexAttribArray(position);

  this._gl.bindBuffer(goog.webgl.ARRAY_BUFFER, this._gl_buffer);
  this._gl.vertexAttribPointer(position, this._itemsize, this._gl.FLOAT, false, 0, 0);

};

goog.exportSymbol('X.buffer', X.buffer);
goog.exportSymbol('X.buffer.prototype.create', X.buffer.prototype.create);
goog.exportSymbol('X.buffer.prototype.bind', X.buffer.prototype.bind);
