(function() {

  buster.testCase('base', {
    setUp : function() {

      this.base = new X.base();
      this.base2 = new X.base();

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
      assert(this.base2.id != this.base.id);
    },
    "set id" : function() {
      var old_id = this.base2.id;
      // should have no effect
      this.base2.id = 'something';
      assert(this.base2.id != 'something');
      assert(this.base2.id == old_id);
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
