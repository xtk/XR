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
  this.add_varying(['varying vec4 vVertexPosition;',
                    'varying vec3 vVertexNormal;']);
  this.add_code_at_main_begin(['vec3 light = vec3(0.0, 0.0, 1.0);',
                               'vec3 lightDirection = normalize(vec3(0, 0, -10));',
                               'vec3 eyeDirection = normalize(-vVertexPosition.xyz);',
                               'vec3 reflectionDirection = reflect(-lightDirection, vVertexNormal);',
                               'float specular = pow(max(dot(reflectionDirection, eyeDirection), 0.0), 10.0);',
                               'float diffuse = 0.8 * max(dot(vVertexNormal, light), 0.0);',
                               'float ambient = 0.3;',
                               'vec3 color = vec3(1.0, 0.0, 0.0);',
                               'gl_FragColor = vec4(color * ambient +',
                               '                    color * diffuse +',
                               '                    vec3(0.2) * specular, 1.0);']);



};
X.__extends__(X.shaderF, X.shader);

goog.exportSymbol('X.shaderF', X.shaderF);
