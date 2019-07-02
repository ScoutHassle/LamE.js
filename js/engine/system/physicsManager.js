'use strict';

class PhysicsObject {
	constructor() {
		this.collider = null; /* CollisionComponent */
		this.rigidBody = null; /* RigidBodyCompontn */
	}
}

class PhysicsManager {
	
	constructor() {
		
		// Actual things...
		this.physicsObjects = new Map(); /* Map: PhysicsObject */

		// Universal Settings
		this.gravity = new vec2(0.0, -9.8);
		this.drag = 0.1;
	}

	get Gravity() /* Vec2 */ {
		return this.gravity;
	}

	get Drag() /* float */ {
		return this.drag;
	}

	// Physics Object Management
	addRigidBody(entityUID, rigidBody) /* */ {
		let physObj = this.physicsObjects.get(entityUID);
		if(physObj == undefined) {
			physObj = new PhysicsObject();
		}

		physObj.rigidBody = rigidBody;
		this.physicsObjects.set(entityUID, physObj)
	}

	addCollider(entityUID, collider) /* */ {
		let physObj = this.physicsObjects.get(entityUID);
		if(physObj == undefined) {
			physObj = new PhysicsObject();
		}

		physObj.collider = collider;
		this.physicsObjects.set(entityUID, physObj)
	}
	
	update() /* */ {
		this.prePhysicsUpdateStep();
		this.physicsUpdateStep();
		this.postPhysicsUpdateStep();
	}

	// Split stages into functions, can then be more modular in the future with function pointers perhaps.
	prePhysicsUpdateStep() /* */ {
		this.physicsObjects.forEach(function(value, key) {
			if(value.collider != null) {
				value.collider.prePhysicsUpdate();
			}
		});
	}

	physicsUpdateStep() /* */ {
		this.physicsObjects.forEach(function(value, key) {
			if(value.rigidBody != null) {
				value.rigidBody.physicsUpdate(frameTime);
			}
		});
	}

	postPhysicsUpdateStep() /* */ {
		// Calculate collisions
		const list = Array.from(this.physicsObjects);
		for(let i = 0; i < list.length-1; i++) {
			if(list[i][1].collider != null) {
				for(let j = i+1; j < list.length; j++) {
					if(list[j][1].collider != null) {
						list[i][1].collider.intersect(list[j][1].collider);
					}
				}
			}
		}
		// Resolve collisions
	}
	
	shutdown() /* */ {
		
		this.parent = null;
	}
}

const physics = new PhysicsManager();
