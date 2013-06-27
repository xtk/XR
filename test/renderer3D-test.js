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
      window.document.body.appendChild(domElement);
      this.renderer3D.container = domElement;
      assert(this.renderer3D.container == domElement);
      assert(this.renderer3D.width == 200);
      assert(this.renderer3D.height == 100);
    },
    "set container by id" : function() {
      var domElement = window.document.createElement('div');
      domElement.style.width = '400px';
      domElement.style.height = '300px';
      domElement.id = 'some_container';
      window.document.body.appendChild(domElement);

      this.renderer3D.container = 'some_container';
      assert(this.renderer3D.container == domElement);
      assert(this.renderer3D.width == 400);
      assert(this.renderer3D.height == 300);
    },
    "init" : function() {

      // set the container back to the default (<body>)
      this.renderer3D.container = window.document.body;

      // initialize using the <body> (default)
      this.renderer3D.init();

      // now the height and width of the renderer should match the <body>
      assert(this.renderer3D.height == window.document.body.clientHeight);
      assert(this.renderer3D.width == window.document.body.clientWidth);

      // and the canvas element should match the first child of the body
      assert(this.renderer3D.canvas == window.document.body.children[0]);

    },
    "init with container" : function() {
      // setup the container
      var domElement = window.document.createElement('div');
      domElement.style.width = '200px';
      domElement.style.height = '100px';
      window.document.body.appendChild(domElement);
      this.renderer3D.container = domElement;

      // initialize using the container
      this.renderer3D.init();

      // now the height and width of the renderer should match the container
      assert(this.renderer3D.height == this.renderer3D.container.clientHeight);
      assert(this.renderer3D.width == this.renderer3D.container.clientWidth);

      // and the canvas element should match the first child of the container
      assert(this.renderer3D.canvas == this.renderer3D.container.children[0]);

    },
    "init with invisible canvas" : function() {
      // create a canvas
      var canvasElement = window.document.createElement('canvas');
      canvasElement.width = 500;
      canvasElement.height = 501;

      // initialize using the canvas
      this.renderer3D.init(canvasElement);

      // now the height and width of the renderer should match the container
      assert(this.renderer3D.height == canvasElement.height);
      assert(this.renderer3D.width == canvasElement.width);

      // and the container should match the canvas parent element (null in this case)
      assert(this.renderer3D.container == canvasElement.parentElement);
      assert(this.renderer3D.container == null);

    },
    "init with canvas" : function() {
      // create a canvas
      var canvasElement = window.document.createElement('canvas');
      canvasElement.width = 1000;
      canvasElement.height = 1001;
      window.document.body.appendChild(canvasElement);

      // initialize using the canvas
      this.renderer3D.init(canvasElement);

      // now the height and width of the renderer should match the container
      assert(this.renderer3D.height == canvasElement.height);
      assert(this.renderer3D.width == canvasElement.width);

      // and the container should match the canvas parent element (<body> in this case)
      assert(this.renderer3D.container == canvasElement.parentElement);
      assert(this.renderer3D.container == window.document.body);

    },
    "get canvas" : function() {
      var canvasElement = window.document.createElement('canvas');
      // initialize using the canvas
      this.renderer3D.init(canvasElement);
      assert(this.renderer3D.canvas == canvasElement);
    }
  });

})();
