(function() {

  buster.testCase('renderer3D', {
    setUp : function() {

      this.renderer3D = new X.renderer3D();

    },
    "get container" : function() {
      // by default, the body is the container
      assert(this.renderer3D.container == window.document.body);
    },
    "set container by element" : function() {
      var domElement = window.document.createElement('div');
      domElement.style.width = '200px';
      domElement.style.height = '100px';
      this.renderer3D.container = domElement;
      assert(this.renderer3D.container == domElement);
      assert(this.renderer3D.width == '200px');
      assert(this.renderer3D.height == '100px');
    },
    "set container by id" : function() {
      var domElement = window.document.createElement('div');
      domElement.style.width = '400px';
      domElement.style.height = '300px';
      domElement.id = 'some_container';
      window.document.body.appendChild(domElement);

      this.renderer3D.container = 'some_container';
      assert(this.renderer3D.container == domElement);
      assert(this.renderer3D.width == '400px');
      assert(this.renderer3D.height == '300px');
    }
  });

})();
