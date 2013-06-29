(function() {

  buster.testCase('renderer3D', {
    setUp : function() {

      this.renderer3D = new X.renderer3D();
      
      // check if this platform supports webgl
      this.webgl_supported = true;
      try {
        
        var canvas = window.document.createElement('canvas');
        var gl = canvas.getContext('experimental-webgl');
        if (!gl) {
          canvas.getContext('webgl');
        }
        
      } catch (e) {
        
        this.webgl_supported = false;
        
      }
      window.console.log('WebGL supported:', this.webgl_supported);

    },
    "init" : function() {
      
      // initialize using the <body> (default)
      assert(this.renderer3D.init() == this.webgl_supported);
      
      // the canvas element should match the first child of the body
      assert(this.renderer3D.canvas == window.document.body.children[0]);
      
      // and now the height and width of the renderer should match the newly created <canvas>
      assert(this.renderer3D.height == window.document.body.children[0].height);
      assert(this.renderer3D.width == window.document.body.children[0].width);      

    },
    "init with container" : function() {
      
      // setup the container
      var domElement = window.document.createElement('div');
      domElement.style.width = '200px';
      domElement.style.height = '100px';
      window.document.body.appendChild(domElement);

      // initialize using the container
      assert(this.renderer3D.init(domElement) == this.webgl_supported);

      // now the height and width of the renderer should match the container
      assert(this.renderer3D.height == domElement.clientHeight);
      assert(this.renderer3D.width == domElement.clientWidth);

      // and the canvas element should match the first child of the container
      assert(this.renderer3D.canvas == domElement.children[0]);

    },
    "init with container id" : function() {
      
      // setup the container
      var domElement = window.document.createElement('div');
      domElement.style.width = '200px';
      domElement.style.height = '100px';
      domElement.id = 'something';
      window.document.body.appendChild(domElement);

      // initialize using the container
      assert(this.renderer3D.init('something') == this.webgl_supported);

      // now the height and width of the renderer should match the container
      assert(this.renderer3D.height == domElement.clientHeight);
      assert(this.renderer3D.width == domElement.clientWidth);

      // and the canvas element should match the first child of the container
      assert(this.renderer3D.canvas == domElement.children[0]);

    },    
    "init with invisible canvas" : function() {     
      
      // create a canvas
      var canvasElement = window.document.createElement('canvas');
      canvasElement.width = 500;
      canvasElement.height = 501;

      // initialize using the canvas
      assert(this.renderer3D.init(canvasElement) == this.webgl_supported);

      // now the height and width of the renderer should match the container
      assert(this.renderer3D.height == canvasElement.height);
      assert(this.renderer3D.width == canvasElement.width);

    },
    "init with canvas" : function() {
      
      // create a canvas
      var canvasElement = window.document.createElement('canvas');
      canvasElement.width = 1000;
      canvasElement.height = 1001;
      window.document.body.appendChild(canvasElement);

      // initialize using the canvas
      assert(this.renderer3D.init(canvasElement) == this.webgl_supported);

      // now the height and width of the renderer should match the container
      assert(this.renderer3D.height == canvasElement.height);
      assert(this.renderer3D.width == canvasElement.width);

    },
    "get canvas" : function() {
      
      var canvasElement = window.document.createElement('canvas');
      // initialize using the canvas
      assert(this.renderer3D.init(canvasElement), this.webgl_supported);
      assert(this.renderer3D.canvas == canvasElement);
    },
    "get gl" : function() {
      
      this.renderer3D.destroy();
      // no gl context should be there
      assert(this.renderer3D.gl == null);
      // re-create the gl context
      assert(this.renderer3D.init(), this.webgl_supported);
      if (this.webgl_supported) {
        // only check for the gl context if webgl is supported
        assert(this.renderer3D.gl != null);
      }
    },
    "destroy" : function() {
      this.renderer3D.destroy();
      // canvas and gl context should be removed
      assert(this.renderer3D.gl == null);
      assert(this.renderer3D.canvas == null);

      delete this.renderer3D;
      this.renderer3D = null;
      assert(this.renderer3D == null);

    }
  });

})();
