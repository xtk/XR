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

};
X.__extends__(X.renderer3D, X.renderer);



goog.exportSymbol('X.renderer3D', X.renderer3D);
