'use strict';

class Player extends ScriptComponent {
	
	constructor() {
		
		super("Player");
		
		this.health = 10;
		this.speed = 5.0;
		
		this.entity = null;
		this.rigidBody = null;
		this.createPlayer();
	}

	createPlayer() {
		this.entity = sceneManager.currentScene.createEntity("entity", 375, 250, 50, 50);
		new ImageComponent(this.entity, resourceManager.loadResource("assets/images/ship.png", resource_type_image));
		this.rigidBody = new RigidBodyComponent(this.entity);
		this.rigidBody.Mass = 1.0;
		new SphereColliderComponent(this.entity, 25);
	}
	
	setScriptData(json) {
		
		if(json.health) {
			this.health = json.health;
		}

		if(json.speed) {
			this.speed = json.speed;
		}
	}
	
	update() {
		
		if(inputManager.isKeyDown(key_W)) {

			this.rigidBody.addForceY(-this.speed);
		}

		if(inputManager.isKeyDown(key_S)) {

			this.rigidBody.addForceY(this.speed);
		}


		if(inputManager.isKeyDown(key_A)) {
			this.rigidBody.addForceX(-this.speed)
		}

		if(inputManager.isKeyDown(key_D)) {
			this.rigidBody.addForceX(this.speed)
		}
	}
	
	save() {
		
		return this.constructor;
	}
}

scriptDatabase["Player"] = function() { return new Player(); };
