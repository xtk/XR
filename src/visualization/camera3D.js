// provides
goog.provide('X.camera3D');

// requires
goog.require('X.camera');

X.camera3D = function(width, height) {

  //
  // call the standard constructor of X.base
  X.__super__(this, width, height);

  //
  // class attributes

  /**
   * @inheritDoc
   * @const
   */
  this._classname = 'camera3D';

  /**
   * The field of view in degrees.
   *
   * @type {!number}
   * @const
   */
  this._field_of_view = 45;

  this._near = 0.01;

  this._far = 10000;

  /**
   * The perspective matrix.
   *
   * @type {Array.<number>|Float32Array|Float64Array|null}
   * @protected
   */
  this._perspective = X.matrix.makePerspective(X.matrix.identity(), this._field_of_view, (width/height), this._near, this._far);

};
// inherit from X.base
X.__extends__(X.camera3D, X.camera);

X.camera3D.prototype.onrotate_ = function(event) {

  this.rotate(event._distance.x, event._distance.y);

};