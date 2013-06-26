// provides
goog.provide('X.base');

// requires
goog.require('X');
goog.require('goog.events.EventTarget');

/**
 * The superclass for all X.base-objects. All derived objects will be registered
 * for event handling.
 *
 * @constructor
 * @extends goog.events.EventTarget
 */
X.base = function() {

  //
  // register this class within the event system by calling the superclass
  // constructor
  X.__super__(this);

  //
  // class attributes

  /**
   * The classname of this class.
   *
   * @type {!string}
   * @protected
   */
  this._classname = 'base';

  /**
   * The unique id of this instance.
   *
   * @type {!number}
   * @protected
   */
  this._id = X.counter++;

  /**
   * The 'dirty' flag of this instance.
   *
   * @type {!boolean}
   * @protected
   */
  this._dirty = false;

};
// enable events
X.__extends__(X.base, goog.events.EventTarget);


Object.defineProperty(X.base.prototype, 'classname', {
  /**
   * Get the classname of this instance.
   *
   * @return {!string} Returns the classname.
   * @this {X.base}
   * @public
   */
  get : function() {
    return this._classname;
  }
});

Object.defineProperty(X.base.prototype, 'id', {
  /**
   * Get the unique id of this instance.
   *
   * @return {!number} Returns the id.
   * @this {X.base}
   * @public
   */
  get : function() {
    return this._id;
  }
});

Object.defineProperty(X.base.prototype, 'dirty', {
  /**
   * Check if this instance was modified.
   *
   * @return {!boolean} Returns TRUE if this instance was modified, FALSE otherwise.
   * @this {X.base}
   * @public
   */
  get : function() {
    return this._dirty;
  },
  /**
   * Mark this instance as modified (==dirty) or clean.
   *
   * @param {!boolean} dirty TRUE if this instance was modified, FALSE otherwise.
   * @this {X.base}
   * @public
   */
  set : function(dirty) {
    this._dirty = dirty;
  }
});

goog.exportSymbol('X.base', X.base);
