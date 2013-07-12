// provides
goog.provide('X.camera');

// requires
goog.require('X.base');
goog.require('X.matrix');
goog.require('X.vector');

X.camera = function(width, height) {

  // validate width and height
  if (!goog.isNumber(width) || !goog.isNumber(height)) {

    throw new Error('A camera needs valid width and height values.');

  }

  //
  // call the standard constructor of X.base
  X.__super__(this);

  //
  // class attributes

  /**
   * @inheritDoc
   * @const
   */
  this._classname = 'camera';

  /**
   * The position of this camera, by default 0, 100, 0.
   *
   * @type {!X.vector}
   * @protected
   */
  this._position = new X.vector(0, 0.2, 0);

  /**
   * The focus point of this camera, by default 0, 0, 0.
   *
   * @type {!X.vector}
   * @protected
   */
  this._focus = new X.vector(0, 0, 0);

  /**
   * The unit vector pointing to the top of the three-dimensional space.
   *
   * @type {!X.vector}
   * @protected
   */
  this._up = new X.vector(0, 0, 1);

  /**
   * The view matrix.
   *
   * @type {!Float32Array}
   * @protected
   */
  this._view = X.matrix.makeLookAt(X.matrix.identity(), this._position, this._focus, this._up);

};
// inherit from X.base
X.__extends__(X.camera, X.base);


X.camera.prototype.zoom = function(value) {

  this._view[14] += value;

};

X.camera.prototype.rotate = function(x,y) {

  // in radii, the 5 is a constant stating how quick the rotation performs..
  var angleX = -x / 5 * Math.PI / 180;
  var angleY = -y / 5 * Math.PI / 180;

  // we need to normalize the axis here
  var axisX = new X.vector(this._view[1], this._view[5], this._view[9]);
  var axisY = new X.vector(this._view[0], this._view[4], this._view[8]);
  axisX.normalize();
  axisY.normalize();

  // row+col * 4
  X.matrix.rotate(this._view, angleX, axisX.x, axisX.y, axisX.z);
  X.matrix.rotate(this._view, angleY, axisY.x, axisY.y, axisY.z);

};

X.camera.prototype.onzoom_ = function(event) {
  
  this.zoom(event._distance);

};
