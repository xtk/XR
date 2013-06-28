// provides
goog.provide('X.renderer3D');

// requires
goog.require('X.renderer');
goog.require('goog.webgl');

/**
 * The WebGL powered renderer of XR.
 *
 * @constructor
 * @extends X.renderer
 */
X.renderer3D = function() {

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
  this._classname = 'renderer3D';

  /**
   * The WebGL rendering context of this renderer.
   *
   * @type {?WebGLRenderingContext}
   */
  this._gl = null;

};
X.__extends__(X.renderer3D, X.renderer);


Object.defineProperty(X.renderer3D.prototype, 'gl', {
  /**
   * Get the WebGL rendering context of this renderer.
   *
   * @return {?WebGLRenderingContext} The WebGL rendering context of this renderer or null before initialization.
   * @this {X.renderer3D}
   * @public
   */
  get : function() {
    return this._gl;
  }
});


/**
 * @inheritDoc
 */
X.renderer3D.prototype.init = function() {

  // call the superclass' init method
  X.__super__(this, 'init');

  // try to create the WebGL context
  try {

    // first use experimental-webgl
    this._gl = this._canvas.getContext('experimental-webgl');
    // if it doesn't work, use webgl
    if (!this._gl) {
      this._gl = this._canvas.getContext('webgl');
    }

  } catch(e) {

    throw new Error('Could not create rendering context.');

  }

};

/**
 * @inheritDoc
 */
X.renderer3D.prototype.destroy = function() {

  if (this._gl) {

    // remove the gl context
    this._gl.clear(goog.webgl.COLOR_BUFFER_BIT |
        goog.webgl.DEPTH_BUFFER_BIT);
    delete this._gl;
    this._gl = null;

  }

};


goog.exportSymbol('X.renderer3D', X.renderer3D);
goog.exportSymbol('X.renderer3D.prototype.init', X.renderer3D.prototype.init);
goog.exportSymbol('X.renderer3D.prototype.destroy', X.renderer3D.prototype.destroy);
