goog.provide('X.interactor');

goog.require('X.base');
goog.require('X.event');
goog.require('goog.events');
goog.require('goog.events.BrowserEvent');
goog.require('goog.events.EventType');
goog.require('goog.events.MouseWheelHandler');

X.interactor = function(element) {

  //
  // call the standard constructor of X.base
  X.__super__(this);

  //
  // class attributes

  /**
   * @inheritDoc
   * @const
   */
  this._classname = 'interactor';

  this._element = element;

  this._mousewheel_handler = null;
  this._mousewheel_listener = null;

  this._mousedown_listener = null;
  this._mouseup_listener = null;

  this._leftbutton_down = false;
  this._middlebutton_down = false;
  this._rightbutton_down = false;

  this._mouseposition_old = null;
  this._mouseposition = null;

  this._zoom_speed = 1;

  this._rotate_speed = 3;

};
X.__extends__(X.interactor, X.base);

/**
 *
 * @public
 */
X.interactor.prototype.init = function() {

  // add event listeners

  // mouse wheel
  this._mousewheel_handler = new goog.events.MouseWheelHandler(this._element);
  this._mousewheel_listener = goog.events.listen(this._mousewheel_handler,
    goog.events.MouseWheelHandler.EventType.MOUSEWHEEL, this.onmousewheel_.bind(this));

  // mouse down
  this._mousedown_listener = goog.events.listen(this._element,
      goog.events.EventType.MOUSEDOWN, this.onmousedown_.bind(this));

  // mouse up
  this._mouseup_listener = goog.events.listen(this._element,
      goog.events.EventType.MOUSEUP, this.onmouseup_.bind(this));

  // mouse move
  this._mousemove_listener = goog.events.listen(this._element,
      goog.events.EventType.MOUSEMOVE, this.onmousemove_.bind(this));  

};

/**
 * @protected
 */
X.interactor.prototype.onmousedown_ = function(event) {

  if (event.button == goog.events.BrowserEvent.MouseButton.LEFT) {

    // left button click
    this._leftbutton_down = true;

  } else if (event.button == goog.events.BrowserEvent.MouseButton.MIDDLE) {

    // middle button click
    this._middlebutton_down = true;

  } else if (event.button == goog.events.BrowserEvent.MouseButton.RIGHT) {

    // right button click
    this._rightbutton_down = true;

  }

  this._mouseposition = new X.vector(event.clientX, event.clientY);
  this._mouseposition_old = new X.vector(event.clientX, event.clientY);

};

/*
 * @protected
 */
X.interactor.prototype.onmouseup_ = function(event) {

  if (event.button == goog.events.BrowserEvent.MouseButton.LEFT) {

    // left button release
    this._leftbutton_down = false;

  } else if (event.button == goog.events.BrowserEvent.MouseButton.MIDDLE) {

    // middle button release
    this._middlebutton_down = false;

  } else if (event.button == goog.events.BrowserEvent.MouseButton.RIGHT) {

    // right button release
    this._rightbutton_down = false;

  }

  this._mouseposition = new X.vector(event.clientX, event.clientY);
  this._mouseposition_old = new X.vector(event.clientX, event.clientY);

};

X.interactor.prototype.onmousemove_ = function(event) {

  event.preventDefault();

  this._mouseposition = new X.vector(event.clientX, event.clientY);

  if (!this._mouseposition_old) {

    this._mouseposition_old = this._mouseposition;

  }

  // get traveled cursor distance
  var distance = this._mouseposition_old.subtract(this._mouseposition);

  if (distance.magnitude() == 0) {
    // no distance
    return;
  }

  if (this._leftbutton_down) {

    distance.scale(this._rotate_speed);

    var e = new X.event.RotateEvent(distance);
    this.fire(e);

  };

  this._mouseposition_old = this._mouseposition;

};

X.interactor.prototype.onmousewheel_ = function(event) {

  var e = new X.event.ZoomEvent(-event.deltaY/(this._zoom_speed*100));
  this.fire(e);

};

goog.exportSymbol('X.interactor', X.interactor);
goog.exportSymbol('X.interactor.prototype.init', X.interactor.prototype.init);