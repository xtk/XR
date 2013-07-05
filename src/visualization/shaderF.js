// provides
goog.provide('X.shaderF');

// requires
goog.require('X.shader');

/**
 * Create the default fragment shader.
 *
 * @constructor
 * @extends X.shader
 */
X.shaderF = function() {

  // call the superclass constructor
  X.__super__(this);

  //
  // class attributes

  /**
   * @inheritDoc
   */
  this._classname = 'shaderF';

  this.add_header(['precision mediump float;']);
  this.add_code_at_main_begin(['gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);']);

};
X.__extends__(X.shaderF, X.shader);

goog.exportSymbol('X.shaderF', X.shaderF);
