// Scene Manager is charged with running the current scene
// and the handling of the global canvas in the game.

// Running as a singleton so won't be using prototypal inheritance
// for this object.

var sceneManager = {
	
	//-----------------------------
	// Variables
	//-----------------------------
	currentScene : null,
	
	//-----------------------------
	// Scene Management
	//-----------------------------
	changeScene : function(scene) {
		
		// Shutdown current
		if(this.currentScene)
		{
			this.currentScene.shutdown();
		}
		
		this.currentScene = scene;
		this.currentScene.start();
		
		return scene;
	},
	
	//-----------------------------
	// Scene Update etc.
	//-----------------------------
	start : function() {
		
		// Default things we need to get running.
		// Global Canvas
		globalCanvas = new canvasManager();
		globalCanvas.createCanvas(800, 600);
		
		// Resource Manager
		resourceManager.start();
		
		// Input Manager
		inputManager.start();
		
		// Finally handle our first scene
		// TO DO - Find correct first scene based on json
		this.changeScene(new scene()); // For now go to Splash
		
		// [DEBUG] - Force json load
		var json = {
			"entitys": [{
				"name": "e1",
				"x": 0.0,
				"y": 0.0,
				"w": 800.0,
				"h": 600.0,
				"components": [{
						"type": "image",
						"data": [{
							"file": "assets/images/splash.png"
						}]
				}]
			}]
		};
		
		this.currentScene.load(json);
		
		// And create the tick
		// Interval is 1 second/frameTime in ms = ticks per second 
		// e.g. 1.0/0.05 = 20 FPS.
		this.interval = setInterval(updateEngine, 1.0/frameTime);
	},
	
	shutdown : function() {
		
		clearInterval(this.interval);
	},
	
	update : function() {
		
		// Input first (so it is handled during the update)
		inputManager.update();
		
		// Now the scene handling
		this.currentScene.update();
		
		// Finally draw...
		this.render();
	},
	
	render : function() {
		
		globalCanvas.clear();
		this.currentScene.render();
	}
}
