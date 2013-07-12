
// provides
goog.provide('X.event');
goog.provide('X.events');

// events provided
goog.provide('X.event.RotateEvent');
goog.provide('X.event.ZoomEvent');

// requires
goog.require('X');
goog.require('goog.events');
goog.require('goog.events.Event');



/**
 * The super class for all events in XIO.
 * 
 * @constructor
 * @param {string} type A type identifier for this event.
 * @extends goog.events.Event
 */
X.event = function(type) {

  //
  // call the default event constructor
  goog.base(this, type);
  
  //
  // class attributes
  
  /**
   * The className of this class.
   * 
   * @type {string}
   * @protected
   */
  this._classname = 'event';
  
};
// inherit from goog.events.Event
goog.inherits(X.event, goog.events.Event);


/**
 * The events of this class.
 * 
 * @enum {string}
 */
X.events = {
 
  ROTATE: goog.events.getUniqueId('rotate'),

  ZOOM: goog.events.getUniqueId('zoom')

};


/**
 * 
 * 
 * @constructor
 * @extends X.event
 */
X.event.RotateEvent = function(distance) {

  // call the default event constructor
  goog.base(this, X.events.ROTATE);
  
  /**
   * 
   * 
   * @type {!number}
   * @protected
   */
  this._distance = distance;
  
};
// inherit from goog.events.Event
goog.inherits(X.event.RotateEvent, X.event);


/**
 * 
 * 
 * @constructor
 * @extends X.event
 */
X.event.ZoomEvent = function(distance) {

  // call the default event constructor
  goog.base(this, X.events.ZOOM);
  
  /**
   * 
   * 
   * @type {!number}
   * @protected
   */
  this._distance = distance;
  
};
// inherit from goog.events.Event
goog.inherits(X.event.ZoomEvent, X.event);

/**
 * @inheritDoc
 */
X.listen = goog.events.listen;

goog.exportSymbol('X.listen', X.listen);


