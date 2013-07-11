
// provides
goog.provide('X.renderer3D');

// requires
goog.require('X.camera3D');
goog.require('X.gl');
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
   * @type {?Object}
   */
  this._gl = null;

  this._objects = [];

  this._objects_length = 0;

  this._shader_programs = [];

};
X.__extends__(X.renderer3D, X.renderer);


Object.defineProperty(X.renderer3D.prototype, 'gl', {
  /**
   * Get the WebGL rendering context of this renderer.
   *
   * @return {?Object} The WebGL rendering context of this renderer or null before initialization.
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
X.renderer3D.prototype.init = function(canvas) {

  // call the superclass' init method
  goog.base(this, 'init', canvas);

  // try to create the WebGL context
  try {

    // first use experimental-webgl
    this._gl = this._canvas.getContext('experimental-webgl');
    // if it doesn't work, use webgl
    if (!this._gl) {
      this._gl = this._canvas.getContext('webgl');
    }
    // and if this didn't work, we don't have webgl
    if (!this._gl) {
      return false;
    }

  } catch(e) {

    return false;

  }

  // inject customized functionality from X.gl
  for (var f in X.gl) {

    this._gl[f] = X.gl[f];

  }

  // configure the WebGL context
  this._gl.viewport(0, 0, this._width, this._height);

  // configure opacity to 0.0 to overwrite the viewport background-color by
  // the container color
  this._gl.clearColor(0.0, 0.0, 0.0, 0.0);

  // enable WebGL settings
  this._gl.enable(goog.webgl.BLEND);
  this._gl.blendEquation(goog.webgl.FUNC_ADD);
  this._gl.blendFunc(goog.webgl.SRC_ALPHA, goog.webgl.ONE_MINUS_SRC_ALPHA);
  this._gl.enable(goog.webgl.DEPTH_TEST);
  this._gl.depthFunc(goog.webgl.LEQUAL);

  // clear color and depth buffer
  this._gl.clear(goog.webgl.COLOR_BUFFER_BIT | goog.webgl.DEPTH_BUFFER_BIT);

  //
  // setup the camera
  this._camera = new X.camera3D(this._width, this._height);

  return true;

};

/**
 *
 * @param object
 */
X.renderer3D.prototype.add = function(object) {

  this._objects.push(object);
  this._objects_length++;

  this._shader_programs.push(object['init'](this._gl));

};


/**
 * @inheritDoc
 */
X.renderer3D.prototype.render = function() {

  // check if we have a valid WebGL rendering context
  if (!this._gl) {

    throw new Error('WebGL rendering context not found.');

  }

  // call the superclass' render method
  goog.base(this, 'render');

};

/**
 * @inheritDoc
 */
X.renderer3D.prototype.render_ = function() {

  // clear the viewport
  this._gl.viewport(0, 0, this._width, this._height);
  this._gl.clear(goog.webgl.COLOR_BUFFER_BIT | goog.webgl.DEPTH_BUFFER_BIT);

  // call the render method for each object
  for (var o=0; o < this._objects_length; o++) {

    this._gl.useProgram(this._shader_programs[o]);

    this._objects[o]['render'](this._camera);

  }

  // request another animation frame
  this._animation_frame_id = window.requestAnimationFrame(this.render_.bind(this));

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
goog.exportSymbol('X.renderer3D.prototype.add', X.renderer3D.prototype.add);
goog.exportSymbol('X.renderer3D.prototype.render', X.renderer3D.prototype.render);
