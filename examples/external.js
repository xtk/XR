X.external = function() {

  X.__super__(this);

  this._classname = 'external';

  this.dirty = true;

};
X.__extends__(X.external, X.base);

X.external.prototype.test = function() {

  console.log('ex');

};


X.external2 = function() {

  X.__super__(this);

};
X.__extends__(X.external2, X.external);

X.external2.prototype.test = function() {

  X.__super__(this,
      'test');

  console.log('2');

};