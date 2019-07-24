'use strict';

class Player extends ScriptComponent {
	
	constructor() {
		
		super("Player");
		
		this.health = 10;
		this.speed = 5.0;

		this.spawn = null;
	}
	
	setScriptData(json) {
		
		this.health = json.health;
		this.speed = json.speed;
	}
	
	update() {
		
		if(inputManager.isKeyDown(key_W)) {
			
			// Do something.
			if (this.spawn == null) {
			   
				// Spawn a physics object
				var e = sceneManager.currentScene.createEntity("entity", 375, 250, 50, 50);
				var col = new ColourComponent(e, "#ff0000");
				var rb = new RigidBodyComponent(e);
				rb.Mass = 5.0;
				var cc = new SphereColliderComponent(e, 25);

				this.spawn = {e: e, col: col, rb: rb, cc: cc};
			}

			this.spawn.rb.Velocity = {x: 0, y: -20};
		}

		if(inputManager.isKeyDown(key_A)) {
			if(this.spawn != null) {
				this.spawn.rb.addForceX(-5)
			}
		}

		if(inputManager.isKeyDown(key_D)) {
			if(this.spawn != null) {
				this.spawn.rb.addForceX(5)
			}
		}

		if(this.spawn != null) {
			if(this.spawn.cc.HasCollided) {
				this.spawn.col.SetResource = "#00ff00";
			} else {
				this.spawn.col.SetResource = "#ff0000";
			}
		}
	}
	
	save() {
		
		return this.constructor;
	}
}

scriptDatabase["Player"] = function() { return new Player(); };
