'use strict';

class Ground extends ScriptComponent {
	
	constructor() {
		
        super("Ground");
        
        // Spawn a physics object
		const e = sceneManager.currentScene.createEntity("entity", 200, 450, 400, 50);
		const col = new ColourComponent(e, "#0000ff");

		const t = e.transform;
		const cc = new BoxColliderComponent(e,t.x, t.y, t.x + t.width, t.y + t.height);

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
