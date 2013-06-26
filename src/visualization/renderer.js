// provides
goog.provide('X.renderer');

// requires
goog.require('X.base');
goog.require('goog.webgl');

/**
 * The WebGL powered renderer of XR.
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

};
X.__extends__(X.renderer, X.base);


goog.exportSymbol('X.renderer', X.renderer);
