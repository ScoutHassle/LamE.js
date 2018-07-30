// Scene Manager is charged with running the current scene
// and the handling of the global canvas in the game.

// Running as a singleton so won't be using prototypal inheritance
// for this object.

var sceneManager = {
	
	//-----------------------------
	// Variables
	//-----------------------------
	projectData : null,
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
	initialise : function() {
		
		// Default things we need to get running.
		// Global Canvas
		globalCanvas = new canvasManager();
		globalCanvas.createCanvas(800, 600);
		
		// Resource Manager
		resourceManager.start();
		
		// Input Manager
		inputManager.start();
	},
	
	start : function(data) {
		
		this.projectData = JSON.parse(data);		
		
		// Finally handle our first scene - taken from json
		this.changeScene(new scene());		
		this.currentScene.load(this.getSceneData(0));
		
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
	},
	
	getSceneData : function(i) {
		
		return this.projectData['Project']['Scenes'][i];
	}
}
