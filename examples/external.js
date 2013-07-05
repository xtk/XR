X.external = function() {

  X.__super__(this);

  this.classname = 'external';

};
X.__extends__(X.external, X.object);

X.external.prototype.init = function(gl) {

  this.fragment_shader.add_uniforms(['uniform vec3 uColor;']);
  this.fragment_shader.add_code_at_main_end(['gl_FragColor = vec4(uColor, 1.0);']);

  return X.__super__(this, 'init', gl);

};

X.external.prototype.render = function() {

  this.gl.uniform3fv(this.uniforms['uColor'], [1,1,0]);

  X.__super__(this, 'render');

};
