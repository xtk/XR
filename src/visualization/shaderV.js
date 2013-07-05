// provides
goog.provide('X.shaderV');

// requires
goog.require('X.shader');

/**
 * Create the default vertex shader.
 *
 * @constructor
 * @extends X.shader
 */
X.shaderV = function() {

  // call the superclass constructor
  X.__super__(this);

  //
  // class attributes

  /**
   * @inheritDoc
   */
  this._classname = 'shaderV';

  this.add_header(['precision mediump float;']);
  this.add_attributes(['attribute vec3 aVertexPosition;']);
  this.add_code_at_main_begin(['gl_Position = vec4(aVertexPosition, 1.0);']);

};
X.__extends__(X.shaderV, X.shader);

goog.exportSymbol('X.shaderV', X.shaderV);
