'use strict';

class Ground extends ScriptComponent {
	
	constructor() {
		
        super("Ground");
        
        // Spawn a physics object
		var e = sceneManager.currentScene.createEntity("entity", 200, 450, 400, 50);
		var col = new ColourComponent(e, "#0000ff");
		var cc = new BoxColliderComponent(e, 25);

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

scriptDatabase["Ground"] = function() { return new Ground(); };
