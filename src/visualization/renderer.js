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
   * @type {!Element|HTMLBodyElement}
   * @protected
   */
  this._container = window.document.body;

  /**
   * The width of this renderer.
   *
   * @type {!number}
   * @public
   */
  this._width = this._container.clientWidth;

  /**
   * The height of this renderer.
   *
   * @type {!number}
   * @public
   */
  this._height = this._container.clientHeight;

  /**
   * The Canvas of this renderer.
   *
   * @type {?Element}
   * @public
   */
  this._canvas = null;

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
    this._width = _container.clientWidth;
    this._height = _container.clientHeight;

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


