'use strict';

class Asteroid {
	
	constructor(iX, iY, radius, mass) {
		        
        // Spawn an asteroid!
		const dblRad = radius + radius;

		this.entity = sceneManager.currentScene.createEntity("Asteroid", iX, iY, dblRad, dblRad);
		new ImageComponent(this.entity, resourceManager.loadResource("assets/images/asteroid.png", resource_type_image));
		const rigidBody = new RigidBodyComponent(this.entity);
		rigidBody.Mass = mass;
		new SphereColliderComponent(this.entity, radius);
	}
	
	update() {
		// Update in case... I dunno.
	}
}

