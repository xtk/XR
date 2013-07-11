// provides
goog.provide('X.triplets');

// requires
goog.require('X.base');



/**
 * Create an ordered container for triplets (3D tuples) with a 
 * fixed memory size.
 * 
 * @param {!number} size The number of triplets to store. This is used to
 *                       allocate memory: 4 bytes * size.
 * @param {X.triplets=} data Initial data as another X.triplets container.
 * @constructor
 * @extends X.base
 */
// X.triplets = function(size) {

//   //
//   // call the standard constructor of X.base
//   X.__super__(this, size);
  
//   //
//   // class attributes
  
//   /**
//    * @inheritDoc
//    * @const
//    */
//   this._classname = 'triplets';
  
//   /**
//    * The minA border of the bounding box.
//    * 
//    * @type {number}
//    * @protected
//    */
//   this._minA = Infinity;
  
//   /**
//    * The maxA border of the bounding box.
//    * 
//    * @type {number}
//    * @protected
//    */
//   this._maxA = -Infinity;
  
//   /**
//    * The minB border of the bounding box.
//    * 
//    * @type {number}
//    * @protected
//    */
//   this._minB = Infinity;
  
//   /**
//    * The maxB border of the bounding box.
//    * 
//    * @type {number}
//    * @protected
//    */
//   this._maxB = -Infinity;
  
//   *
//    * The minC border of the bounding box.
//    * 
//    * @type {number}
//    * @protected
   
//   this._minC = Infinity;
  
//   /**
//    * The maxC border of the bounding box.
//    * 
//    * @type {number}
//    * @protected
//    */
//   this._maxC = -Infinity;
  
//   /**
//    * The centroid of the bounding box.
//    * 
//    * @type {!Array}
//    * @protected
//    */
//   this._centroid = [0, 0, 0];
  
//   /**
//    * This marks the triplets container as fresh meaning unused.
//    * 
//    * @type {!boolean}
//    * @protected
//    */
//   this._fresh = true;
  
//   /**
//    * The pointer to the current position in the float array.
//    * 
//    * @type {!number}
//    * @protected
//    */
//   this._dataPointer = 0;
  
// };
// // inherit from X.base
// X.__extends__(X.triplets, Float32Array);



Float32Array.prototype.init = function() {



  this._minA = 0;
  this._minB = 0;
  this._minC = 0;
  this._maxA = 0;
  this._maxB = 0;
  this._maxC = 0;

  this._centroid = [0, 0, 0];

  this._initialized = true;

  this._fresh = true;
  this._dirty = false;

  this._dataPointer = 0;

};


/**
 * Add a triplet to this container.
 * 
 * @param {!number} a The first value of the triplet.
 * @param {!number} b The second value of the triplet.
 * @param {!number} c The third value of the triplet.
 * @return {!number} The id of the added triplet.
 * @throws {Error} An exception if the passed coordinates are invalid.
 * @public
 */
Float32Array.prototype.add = function(a, b, c) {
  
  if (!this._initialized) {
    this.init();
  }

  // update bounding box
  this._minA = Math.min(this._minA, a);
  this._maxA = Math.max(this._maxA, a);
  this._minB = Math.min(this._minB, b);
  this._maxB = Math.max(this._maxB, b);
  this._minC = Math.min(this._minC, c);
  this._maxC = Math.max(this._maxC, c);
  
  this._centroid = [(this._minA + this._maxA) / 2,
                    (this._minB + this._maxB) / 2,
                    (this._minC + this._maxC) / 2];
  
  this._fresh = false;
  this._dirty = true;
  
  this[this._dataPointer++] = a;
  this[this._dataPointer++] = b;
  this[this._dataPointer++] = c;
  
  return this._dataPointer / 3;
  
};


/**
 * Adjust the size of the internal array to match
 * the real content.
 */
Float32Array.prototype.resize = function() {
  
  // jump out if there is no need
  if (this._dataPointer == this.length) {
    
    //console.log('no resize',this._dataPointer,this.length);
    
    return;
    
  }
  //console.log('resize',this._dataPointer,this.length);
  
  // resize the array according to its real content
  var _tmpArr = new Float32Array(this._dataPointer);
  _tmpArr.set(this.subarray(0,this._dataPointer));
  
  this = _tmpArr; 
  
};


/**
 * Get the triplet with the given id.
 * 
 * @param {!number} id The id of the requested triplet.
 * @return {!Array} The triplet with the given id as a 1D Array with length 3.
 * @public
 */
Float32Array.prototype.get = function(id) {
  
  // we need to convert the id to the index in the array
  id = id * 3;
  
  //return this.subarray(id,id+3);
  return [this[id],this[id+1],this[id+2]];
  
};


/**
 * Remove a given triplet from this container.
 * 
 * @param {!number} id The id of the to be removed triplet.
 * @public
 */
Float32Array.prototype.remove = function(id) {
  
  //this.splice(id, 3);
  //TODO do we need that?
  throw new Error('Not implemented.');
  //this._dirty = true;
  
};


/**
 * Delete all triplets in this container.
 * 
 * @public
 */
Float32Array.prototype.clear = function() {

  // delete all triplets
  this = new Float32Array(this.length);
  
  this._dirty = true;
  
};


/**
 * Get the number of triplets in this container.
 * 
 * @return {!number} The number of triplets in this container.
 * @public
 */
Float32Array.prototype.__defineGetter__('count', function() {

  // just in case resize here to get the right number
  this.resize();
  
  return this.length / 3;
  
});


// /**
//  * Get the length of this container. This equals the number of triplets
//  * multiplied by 3.
//  * 
//  * @return {!number} The length of this container.
//  * @public
//  */
// Float32Array.prototype.__defineGetter__('length', function() {

//   // just in case resize here to get the right number
//   this.resize();
  
//   return this.length;
  
// });


// export symbols (required for advanced compilation)
goog.exportSymbol('X.triplets', X.triplets);
goog.exportSymbol('Float32Array.prototype.add', Float32Array.prototype.add);
goog.exportSymbol('Float32Array.prototype.resize', Float32Array.prototype.resize);
goog.exportSymbol('Float32Array.prototype.get', Float32Array.prototype.get);
goog.exportSymbol('Float32Array.prototype.remove', Float32Array.prototype.remove);
goog.exportSymbol('Float32Array.prototype.clear', Float32Array.prototype.clear);
