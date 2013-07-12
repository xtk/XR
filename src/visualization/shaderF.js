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
  this.add_uniforms(['uniform vec3 u_light;',
                     'uniform vec3 u_light_direction;',
                     'uniform float u_specular;',
                     'uniform float u_diffuse;',
                     'uniform float u_ambient;',
                     'uniform vec3 u_ambient_color;']);
  this.add_varying(['varying vec4 v_vertex_position;',
                    'varying vec3 v_vertex_normal;']);
  this.add_code_at_main_begin(['vec3 light_direction = normalize( u_light_direction );',
                               'vec3 eye_direction = normalize( -v_vertex_position.xyz );',
                               'vec3 reflection_direction = reflect( -light_direction, v_vertex_normal );',
                               'float specular = pow( max( dot( reflection_direction, eye_direction ), 0.0 ), u_specular );',
                               'float diffuse = u_diffuse * max( dot( v_vertex_normal, u_light ), 0.0 );',
                               'vec3 color = vec3( 1.0, 0.0, 0.0 );',
                               'gl_FragColor = vec4( color * u_ambient +',
                               '                     color * diffuse +',
                               '                     u_ambient_color * specular, 1.0 );']);



};
X.__extends__(X.shaderF, X.shader);

goog.exportSymbol('X.shaderF', X.shaderF);
