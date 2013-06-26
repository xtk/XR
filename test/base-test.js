(function() {

  buster.testCase('base', {
    setUp : function() {

      this.oldcounter = X.counter;
      this.base = new X.base();

    },
    "get classname" : function() {
      assert(this.base.classname == 'base');
    },
    "set classname" : function() {
      // should have no effect
      this.base.classname = 'something';
      assert(this.base.classname == 'base');
    },
    "get id" : function() {
      assert(this.base.id == this.oldcounter+1);
    },
    "set id" : function() {
      // should have no effect
      this.base.id = 'something';
      assert(this.base.id == this.oldcounter+1);
    },
    "get dirty" : function() {
      assert(this.base.dirty == false);
    },
    "set dirty" : function() {
      this.base.dirty = true;
      assert(this.base.dirty == true);
      this.base.dirty = false;
      assert(this.base.dirty == false);
    }
  });

})();
