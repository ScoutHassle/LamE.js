'use strict';

class Obstacle extends ScriptComponent {
	
	constructor() {
		
        super("Obstacle");
        
        // Spawn a physics object
		var e = sceneManager.currentScene.createEntity("entity", 375, 325, 50, 50);
		var col = new ColourComponent(e, "#0000ff");
		var cc = new SphereColliderComponent(e, 25);

		this.spawn = {e: e, col: col, cc: cc};
	}
	
	setScriptData(json) {
		
	}
	
	update() {

	}
	
	save() {
		
		return this.constructor;
	}
}

scriptDatabase["Obstacle"] = function() { return new Obstacle(); };
