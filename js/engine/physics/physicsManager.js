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
		this.collisionObjects = new Map(); /* Map: CollisionObject */

		// Universal Settings
		this.pixelsToMetres = 5.0;
		this.gravity = new vec2(0.0, -9.8);
		this.gravity.fmultiply(this.pixelsToMetres);
		this.drag = 0.025;

		// WARNING: Using Debug?
		this.debug = true;
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

		// Calculate collisions
		const list = Array.from(this.physicsObjects);
		for(let i = 0; i < list.length-1; i++) {

			const obj1 = list[i][1];

			if(obj1.collider != null) {
				for(let j = i+1; j < list.length; j++) {

					const obj2 = list[j][1];

					if(obj2.collider != null) {
						if(obj1.collider.intersect(obj2.collider)) {
							//Collision.Response(obj1.collider, obj2.collider, obj1.rigidBody, obj2.rigidBody);
							// Force response...

							const collisionName = obj1.collider.parent.uid + "|" + obj2.collider.parent.uid;
							const collObj = new CollisionObject(obj1, obj2);
							this.collisionObjects.set(collisionName, collObj);
						}
					}
				}
			}
		}
		
		// Resolve collisions
		this.collisionObjects.forEach(function(collision, key) {

			let responseFunction = null;
			switch(collision.physObj1.collider.shape) {

				case ColliderShape.ColliderShape_Sphere:
					switch(collision.physObj2.collider.shape) {
						case ColliderShape.ColliderShape_Sphere:
								responseFunction = Collision.SphereToSphereResponse;
							break;

						case ColliderShape.ColliderShape_Box:
							break;
					}
					break;

            	case ColliderShape.ColliderShape_Box:
					switch(collision.physObj2.collider.shape) {
						case ColliderShape.ColliderShape_Sphere:
							break;
	
						case ColliderShape.ColliderShape_Box:
						break;
					}
					break;
			}

			if(responseFunction != null) {
				responseFunction(collision.physObj1.collider, collision.physObj2.collider, collision.physObj1.rigidBody, collision.physObj2.rigidBody);
			}
		});

		// TO DO: Track these per frame - remove when needed.
		this.collisionObjects.clear();
	}

	postPhysicsUpdateStep() /* */ {
		
	}
	
	shutdown() /* */ {
		
		this.parent = null;
	}

	DebugRender() /* */ {
		if(this.debug) {
			this.physicsObjects.forEach(function(value, key) {
				if(value.collider != null) {
					value.collider.DebugRender();
				}
			});
		}
	}
}

const physics = new PhysicsManager();
