// Scene Manager is charged with running the current scene
// and the handling of the global canvas in the game.

// Running as a singleton so won't be using prototypal inheritance
// for this object.

const defaultCanvas = new vec2(1280, 720);

class SceneManager {
	constructor() {
		
		this.projectData = null; /* json */
		this.currentScene = null; /* Scene */
		this.currentSceneIndex = 1;

		this.paused = false;
		this.pausedUpdate = null;
	}

	changeScene(index) /* */ {
		
		// Shutdown current
		if(this.currentScene)
		{
			this.currentScene.shutdown();
		}
		
        this.currentSceneIndex = index;
        
		this.currentScene = new Scene();
        this.currentScene.load(this.getSceneData(index));
		this.currentScene.start();
	}

	initialise() /* */ {
		// Default things we need to get running.
		// Global Canvas
		//globalCanvas = new Canvas();
		globalCanvas = new GLCanvas();
		globalCanvas.createCanvas(defaultCanvas.x, defaultCanvas.y);
		
		
		// Resource Manager
		resourceManager.start();
		
		// Input Manager
		inputManager.start();
	}

	start(data) /* */ {
		
		this.projectData = JSON.parse(data);		
		
		// Finally handle our first scene - taken from json
		this.changeScene(0);
		
		// And create the tick
		// Interval is 1 second/frameTime in ms = ticks per second 
		// e.g. 1.0/0.05 = 20 FPS.
		this.interval = setInterval(updateEngine, 1.0/frameTime);
	}

	shutdown() /* */ {
		
		clearInterval(this.interval);
	}

	update() /* */ {
		
		// Input first (so it is handled during the update)
		inputManager.update(); // We can still make inputs whilst paused.
		
		if(!this.paused) {
			// Now the scene handling
			this.currentScene.update();

			// Global PhysicsManager.
			physics.update();
		} else {
			if(this.pausedUpdate != null) {
				this.pausedUpdate();
			}
		}
		
		// Finally draw...
		this.render();
	}

	render()  /* */ {
		
		globalCanvas.clear();
		renderManager.render();

		physics.DebugRender();
	}

	pause(updateFunc) {
		this.paused = true;
		this.pausedUpdate = updateFunc;
	}

	unpause() {
		this.paused = false;
	}
	
	getSceneData(idx) /* json */ {
		
		return this.projectData['Project']['Scenes'][idx];
	}
}

const sceneManager = new SceneManager();
