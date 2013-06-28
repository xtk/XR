// provides
goog.provide('X.renderer');

// requires
goog.require('X.base');
goog.require('goog.dom');

/**
 * The core renderer class of XR.
 *
 * @constructor
 * @extends X.base
 */
X.renderer = function() {

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
  this._classname = 'renderer';

  /**
   * The HTML container of this renderer, E.g. a <div>.
   * By default, this is the <body>-element.
   *
   * @type {?Element|HTMLBodyElement}
   * @protected
   */
  this._container = window.document.body;

  /**
   * The width of this renderer.
   *
   * @type {!number}
   * @protected
   */
  this._width = this._container.getBoundingClientRect().width;

  /**
   * The height of this renderer.
   *
   * @type {!number}
   * @protected
   */
  this._height = this._container.getBoundingClientRect().height;

  /**
   * The Canvas of this renderer.
   *
   * @type {?Element}
   * @protected
   */
  this._canvas = null;

  /**
   * The animation frame id for the requestAnimationFrame loop.
   *
   * @type {!number}
   * @protected
   */
  this._animation_frame_id = -1;

  // make sure this abstract class can't be instantiated
  if (!(this instanceof X.renderer3D)) {
    throw new Error('X.renderer can not be instantiated. Use X.renderer3D instead.');
  }

};
X.__extends__(X.renderer, X.base);


Object.defineProperty(X.renderer.prototype, 'container', {
  /**
   * Get the HTML container of this renderer.
   *
   * @return {!Element|HTMLBodyElement} Returns the HTML container.
   * @this {X.renderer}
   * @public
   */
  get : function() {
    return this._container;
  },
  /**
   * Set the HTML container for this renderer either as a DOMElement or
   * using the element id.
   *
   * @param {!string|Element|HTMLBodyElement} container Set the HTML container.
   * @this {X.renderer}
   * @throws {Error} An error, if the given container is invalid.
   * @public
   */
  set : function(container) {

    // check if a container is passed
    if (!goog.isDefAndNotNull(container)) {

      throw new Error('An ID to a valid container (<div>..) is required.');

    }

    // check if the passed container is really valid
    var _container = container;

    // if an id is given, try to get the corresponding DOM element
    if (goog.isString(_container)) {

      _container = goog.dom.getElement(container);

    }

    // now we should have a valid DOM element
    if (!goog.dom.isElement(_container)) {

      throw new Error('Could not find the given container.');

    }

    this._container = _container;

    // and update the height and width
    this._width = this._container.getBoundingClientRect().width;
    this._height = this._container.getBoundingClientRect().height;

  }
});

Object.defineProperty(X.renderer.prototype, 'height', {
  /**
   * Get the height of this renderer (as defined by the container).
   *
   * @return {!number} The height of this renderer.
   * @this {X.renderer}
   * @public
   */
  get : function() {
    return this._height;
  }
});

Object.defineProperty(X.renderer.prototype, 'width', {
  /**
   * Get the width of this renderer (as defined by the container).
   *
   * @return {!number} The width of this renderer.
   * @this {X.renderer}
   * @public
   */
  get : function() {
    return this._width;
  }
});

Object.defineProperty(X.renderer.prototype, 'canvas', {
  /**
   * Get the <canvas>-element of this renderer.
   *
   * @return {?Element} The <canvas>-element of this renderer.
   * @this {X.renderer}
   * @public
   */
  get : function() {
    return this._canvas;
  }
});

/**
 * Initialize the renderer and create the rendering context. An optional <canvas>-element can be passed
 * to skip creating our own canvas inside the container.
 *
 * @param {?Element=} canvas An optional <canvas>-element to skip creating a new one.
 * @throws {Error} An error, if the rendering context could not be created.
 * @public
 */
X.renderer.prototype.init = function(canvas) {

  // check if we have a given canvas element
  if (goog.isDefAndNotNull(canvas) && canvas.tagName.toUpperCase() == 'CANVAS') {

    // a canvas element was passed
    this._canvas = canvas;

    // we will update the container
    this._container = goog.dom.getParentElement(canvas);

    // ..and our size
    this._width = canvas.width;
    this._height = canvas.height;


  } else {

    // create a new canvas element
    this._canvas = goog.dom.createDom('canvas');

    //
    // append it to the container
    goog.dom.appendChild(this._container, this._canvas);

    // the container might have resized now, so update our width and height
    // settings
    this._width = this._container.getBoundingClientRect().width;
    this._height = this._container.getBoundingClientRect().height;

    // propagate the container size to the canvas
    this._canvas.width = this._width;
    this._canvas.height = this._height;

  }

};

/**
 * (Re-)Start the rendering. This makes sure that all associated objects are ready to render.
 *
 * @throws {Error} An error if the renderer was not initialized properly.
 * @public
 */
X.renderer.prototype.render = function() {

  if (!this._canvas) {

    throw new Error('Could not find the <canvas>.');

  }

  // check if a rendering loop is already active
  // if yes, cancel it
  if (this._animation_frame_id != -1) {
    window.cancelAnimationFrame(this._animation_frame_id);
  }

  // trigger the rendering loop
  this._animation_frame_id = window.requestAnimationFrame(this.render_.bind(this));

};

/**
 * Perform the rendering.
 *
 * @protected
 */
X.renderer.prototype.render_ = function() {

};

/**
 * Destroys this renderer.
 *
 * @public
 */
X.renderer.prototype.destroy = function() {

  // remove the canvas from the dom tree
  goog.dom.removeNode(this._canvas);
  delete this._canvas;
  this._canvas = null;

  // remove reference to the container
  this._container = null;

};
