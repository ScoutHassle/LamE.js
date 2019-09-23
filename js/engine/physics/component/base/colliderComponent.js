'use strict';

var ColliderShape = {
	"ColliderShape_Point": 1,
	"ColliderShape_Sphere": 2,
	"ColliderShape_Box": 3,
	"ColliderShape_Plane": 4,};
Object.freeze(ColliderShape);

var CollisionEvent = {
	"Collision_Enter": 1,
	"Collision_Active": 2,
	"Collision_Exit": 3,
	"Collision_Expire": 4,};
Object.freeze(CollisionEvent);

// Whilst ColliderComponent is a base type it is also an extension of the
// PhysicsComponent in order to get the PhysicsUpdate methods.
class ColliderComponent extends PhysicsComponent {
	#tag;

	constructor(entity, colliderShape) {
		super(entity);
		this.shape = colliderShape;
		this.hasCollided = false;
		this.#tag = "";

		this.onCollisionEnter = function(collider, collision){}; /* Function Ptr: (collider, collision) */
		this.onCollisionActive = function(collider, collision){}; /* Function Ptr: (collider, collision) */
		this.onCollisionExit = function(collider, collision){}; /* Function Ptr: (collider, collision) */

		physics.addCollider(entity.uid, this)
		if(physics.debug) {
			this.resource = "#00ff0077";
		}
	}

	get ColliderShape() /* ColliderShape */ {
		return this.shape;
	}

	get HasCollided() /* bool */ {
		return this.hasCollided;
	}

	get Tag() /* string */ {
		return this.#tag;
	}

	set Tag(name) /* */ {
		this.#tag = name;
	}

	intersect(collider) /* bool */ {

		// Unhandled shape to shape intersection.
		return false;
	}

	OnCollisionEnter(collider, collision) /* */ {
		this.onCollisionEnter(collider, collision);
	}

	OnCollisionActive(collider, collision) /* */ {
		this.onCollisionActive(collider, collision);
	}

	OnCollisionExit(collider, collision) /* */ {
		this.onCollisionExit(collider, collision);
	}

	// Physics steps
	prePhysicsUpdate() /* */ {
		this.hasCollided = false;
	}

	DebugRender() /* */ {
		/* stub */
	}
}
 