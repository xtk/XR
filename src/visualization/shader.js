// provides
goog.provide('X.shader');

// requires
goog.require('X.base');
goog.require('goog.webgl');

/**
 * The superclass for all shaders.
 *
 * @constructor
 * @extends X.base
 */
X.shader = function() {

  // call the superclass constructor
  X.__super__(this);

  //
  // class attributes

  /**
   * The classname of this class.
   *
   * @type {!string}
   * @protected
   */
  this._classname = 'shader';

  this._source = ['// XTK SHADER',
                  '//',
                  '// {HEADER}',
                  '// {ATTRIBUTES}',
                  '// {UNIFORMS}',
                  '// {VARYING}',
                  '// {CODE}',
                  'void main(void) {',
                  '// {MAIN_BEGIN}',
                  '// {MAIN_END}',
                  '}'].join('\n');

  this._attributes = [];

  this._uniforms = [];

};
X.__extends__(X.shader, X.base);

Object.defineProperty(X.shader.prototype, 'source', {
  /**
   * Get the source of this shader.
   *
   * @return {!string} The source of this shader.
   * @this {X.shader}
   * @public
   */
  get : function() {
    return this._source;
  },
  /**
   * Set the source of this shader.
   *
   * @param {!string} source The new source for this shader.
   * @this {X.shader}
   * @public
   */
  set : function(source) {
    this._source = source;
  }
});

/**
 *
 * @public
 */
X.shader.prototype.get_attribute_locations = function(gl, shader_program) {

  var _locations = {};

  for (var a=0; a<this._attributes.length; a++) {

    _locations[this._attributes[a]] = gl.getAttribLocation(shader_program, this._attributes[a]);

  }

  return _locations;

};

/**
 *
 * @public
 */
X.shader.prototype.get_uniform_locations = function(gl, shader_program) {

  var _locations = {};

  for (var u=0; u<this._uniforms.length; u++) {

    _locations[this._uniforms[u]] = gl.getUniformLocation(shader_program, this._uniforms[u]);

  }

  return _locations;

};


/**
 * @protected
 */
X.shader.prototype.add_ = function(where, lines) {

  where = '// {' + where + '}';
  lines.unshift(where);
  this._source = this._source.replace(where, lines.join('\n'));

};

X.shader.prototype.add_header = function(lines) {

  this.add_('HEADER', lines);

};

X.shader.prototype.add_attributes = function(lines) {

  // grab the attribute names
  for (var l=0; l<lines.length; l++) {
    // just grab the name of the attribute
    // and attach it to our list
    this._attributes.push(lines[l].match(/[^ ]+/g)[2].replace(';',''));
  }

  this.add_('ATTRIBUTES', lines);

};

X.shader.prototype.add_uniforms = function(lines) {

  // grab the uniform names
  for (var l=0; l<lines.length; l++) {
    // just grab the name of the uniform
    // and attach it to our list
    this._uniforms.push(lines[l].match(/[^ ]+/g)[2].replace(';',''));
  }

  this.add_('UNIFORMS', lines);

};

X.shader.prototype.add_varying = function(lines) {

  this.add_('VARYING', lines);

};

X.shader.prototype.add_code = function(lines) {

  this.add_('CODE', lines);

};

X.shader.prototype.add_code_at_main_begin = function(lines) {

  this.add_('MAIN_BEGIN', lines);

};

X.shader.prototype.add_code_at_main_end = function(lines) {

  lines.push('// {MAIN_END}');
  this._source = this._source.replace('// {MAIN_END}', lines.join('\n'));

};

/**
 * Compile a GL shader.
 *
 * @static
 * @protected
 */
X.shader.compile_ = function(gl, shader, type) {

  var gl_shader = gl.createShader(type);
  gl.shaderSource(gl_shader, shader);
  gl.compileShader(gl_shader);

  if (!gl.getShaderParameter(gl_shader, goog.webgl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(gl_shader));
  }

  return gl_shader;

};


/**
 * Create a shader program from a vertex shader and fragment shader sources.
 *
 * @param {!Object} gl The WebGL rendering context.
 * @param {!string} vertex_shader The vertex shader source.
 * @param {!string} fragment_shader The fragment shader source.
 * @return {!Object} The created shader program.
 * @static
 * @public
 */
X.shader.create = function(gl, vertex_shader, fragment_shader) {

  var shader_program = gl.createProgram();
  gl.attachShader(shader_program, X.shader.compile_(gl, vertex_shader,
      goog.webgl.VERTEX_SHADER));
  gl.attachShader(shader_program, X.shader.compile_(gl, fragment_shader,
      goog.webgl.FRAGMENT_SHADER));
  gl.linkProgram(shader_program);

  if (!gl.getProgramParameter(shader_program, goog.webgl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(shader_program));
  }

  return shader_program;

};

goog.exportSymbol('X.shader', X.shader);
goog.exportSymbol('X.shader.prototype.add_header', X.shader.prototype.add_header);
goog.exportSymbol('X.shader.prototype.add_attributes', X.shader.prototype.add_attributes);
goog.exportSymbol('X.shader.prototype.add_uniforms', X.shader.prototype.add_uniforms);
goog.exportSymbol('X.shader.prototype.add_varying', X.shader.prototype.add_varying);
goog.exportSymbol('X.shader.prototype.add_code', X.shader.prototype.add_code);
goog.exportSymbol('X.shader.prototype.add_code_at_main_begin', X.shader.prototype.add_code_at_main_begin);
goog.exportSymbol('X.shader.prototype.add_code_at_main_end', X.shader.prototype.add_code_at_main_end);
goog.exportSymbol('X.shader.prototype.get_attribute_locations', X.shader.prototype.get_attribute_locations);
goog.exportSymbol('X.shader.prototype.get_uniform_locations', X.shader.prototype.get_uniform_locations);
goog.exportSymbol('X.shader.create', X.shader.create);
