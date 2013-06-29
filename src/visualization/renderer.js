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
   * The width of this renderer.
   *
   * @type {!number}
   * @protected
   */
  this._width = -1;

  /**
   * The height of this renderer.
   *
   * @type {!number}
   * @protected
   */
  this._height = -1;

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

Object.defineProperty(X.renderer.prototype, 'height', {
  /**
   * Get the height of this renderer.
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
   * Get the width of this renderer.
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
 * Initialize the renderer and create the rendering context. A <div>-element can be passed
 * to use as a container - by default, the <body> is used. Instead of a container, an optional <canvas>-element
 * can be passed to skip creating a new <canvas>.
 *
 * @param {?Element|?string=} element An optional <div>-element or <canvas>-element their corresponding IDs.
 * @return {boolean} TRUE or FALSE, depending if the rendering context could be created.
 * @public
 */
X.renderer.prototype.init = function(element) {
  
  // if an id is given, try to get the corresponding DOM element
  if (goog.isString(element)) {
    
    element = goog.dom.getElement(element);
    
  }  
  
  // check if we have a canvas element
  if (goog.isDefAndNotNull(element) && element.tagName.toUpperCase() == 'CANVAS') {

    // a canvas element was passed
    this._canvas = element;

  } else {
    
    // by default, use the <body> as the container
    var _element = window.document.body;
    
    // check if we have a div element
    if (goog.isDefAndNotNull(element) && element.tagName.toUpperCase() == 'DIV') {
      
      _element = element;
      
    }

    // create a new canvas element
    this._canvas = goog.dom.createDom('canvas');  
    this._canvas.width = _element.getBoundingClientRect().width;
    this._canvas.height = _element.getBoundingClientRect().height;
    
    // append it to either the <body> or a given <div>
    goog.dom.appendChild(_element, this._canvas);  
    
  }
  
  // cache the current canvas size
  this._width = this._canvas.width;
  this._height = this._canvas.height;
  
  return true;
  
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

};
