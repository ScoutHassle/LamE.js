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
		this.minVelocity = 0.75;

		// WARNING: Using Debug?
		this.debug = false;
	}

	get Gravity() /* Vec2 */ {
		return this.gravity;
	}

	get Drag() /* float */ {
		return this.drag;
	}

	loadSettings(json) /* */ {

		this.pixelsToMetres = json.PixelRatio;
		this.gravity = new vec2(json.Gravity.x, json.Gravity.y);
		this.gravity.fmultiply(this.pixelsToMetres);
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

	removeCollider(entityUID) /* */ {
		this.physicsObjects.delete(entityUID);
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

		// Update any collisions
		let clearList = [];
		this.collisionObjects.forEach(function(value, key){
			switch(value.collisionEvent) {
				// Set these to expire at the end of the frame.
				case  CollisionEvent.Collision_Enter:
				case  CollisionEvent.Collision_Active:
					value.collisionEvent =  CollisionEvent.Collision_Expire;
					break;

				case CollisionEvent.Collision_Exit:
					// Clean up
					clearList.push(key);
					break;
			}
		});

		for(let i = 0; i < clearList.length; i++) {
			this.collisionObjects.delete(clearList[i]);
		}
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
							const collisionName = obj1.collider.parent.UID + "|" + obj2.collider.parent.UID;

							let collObj = this.collisionObjects.get(collisionName);
							if(collObj != undefined) {
								collObj.collisionEvent = CollisionEvent.Collision_Active;
								collObj.CollisionActive();
								continue;
							}
							collObj = new CollisionObject(obj1, obj2);
							this.collisionObjects.set(collisionName, collObj);
							collObj.CollisionEnter();
						}
					}
				}
			}
		}
		
		// Resolve collisions
		const clearList = [];
		this.collisionObjects.forEach(function(collision, key) {

			switch(collision.collisionEvent) { 
				case CollisionEvent.Collision_Enter:
				case CollisionEvent.Collision_Active:
					let responseFunction = null;
					switch(collision.physObj1.collider.shape) {

						case ColliderShape.ColliderShape_Sphere:
							switch(collision.physObj2.collider.shape) {
								case ColliderShape.ColliderShape_Sphere:
									responseFunction = Collision.SphereToSphereResponse;
									break;

								case ColliderShape.ColliderShape_Box:
									responseFunction = Collision.SphereToBoxResponse;
									break;
							}
							break;

						case ColliderShape.ColliderShape_Box:
							switch(collision.physObj2.collider.shape) {
								case ColliderShape.ColliderShape_Sphere:
									responseFunction = Collision.BoxToSphereResponse;
									break;
			
								case ColliderShape.ColliderShape_Box:
								break;
							}
							break;
					}

					if(responseFunction != null) {
						responseFunction(collision.physObj1.collider, collision.physObj2.collider, collision.physObj1.rigidBody, collision.physObj2.rigidBody);
					}
					break;

				case CollisionEvent.Collision_Expire:
					// Same again, think this needs resolving AFTER the foreach.
					collision.CollisionExit();
					break;
			}
		});

		
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
