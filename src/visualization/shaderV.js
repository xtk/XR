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
  this.add_attributes(['attribute vec3 a_vertex_position;',
                       'attribute vec3 a_vertex_normal;']);
  this.add_uniforms(['uniform mat4 u_view;',
                     'uniform mat4 u_perspective;',
                     'uniform vec3 u_center;',
                     'uniform vec3 u_centroid;']);
  this.add_varying(['varying vec4 v_vertex_position;',
                    'varying vec3 v_vertex_normal;']);
  this.add_code_at_main_begin(['vec3 vertex_offset = u_center - u_centroid;',
                               'v_vertex_normal = normalize( mat3( u_view[0].xyz, u_view[1].xyz, u_view[2].xyz ) * a_vertex_normal );',
                               'v_vertex_position = u_perspective * u_view * vec4( a_vertex_position + vertex_offset, 1.0 );',
                               'gl_Position = v_vertex_position;']);



};
X.__extends__(X.shaderV, X.shader);

goog.exportSymbol('X.shaderV', X.shaderV);
