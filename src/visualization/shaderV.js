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
  this.add_attributes(['attribute vec3 aVertexPosition;',
                       'attribute vec3 aVertexNormal;']);
  this.add_uniforms(['uniform mat4 view;',
                     'uniform mat4 perspective;']);
  this.add_varying(['varying vec4 vVertexPosition;',
                    'varying vec3 vVertexNormal;']);
  this.add_code_at_main_begin(['vVertexNormal = normalize(aVertexNormal);',
                               'vVertexPosition = perspective * view * vec4(aVertexPosition, 1.0);',
                               'gl_Position = vVertexPosition;']);



};
X.__extends__(X.shaderV, X.shader);

goog.exportSymbol('X.shaderV', X.shaderV);
