'use strict';

var ColliderShape = {
	"ColliderShape_Point": 1,
	"ColliderShape_Sphere": 2,
	"ColliderShape_Box": 3,};
Object.freeze(ColliderShape);

// Whilst ColliderComponent is a base type it is also an extension of the
// PhysicsComponent in order to get the PhysicsUpdate methods.
class ColliderComponent extends PhysicsComponent {

	constructor(entity, colliderShape) {
		super(entity);
		this.shape = colliderShape;
		this.hasCollided = false;

		physics.addCollider(entity.uid, this)
	}

	get ColliderShape() /* ColliderShape */ {
		return this.shape;
	}

	get HasCollided() /* bool */ {
		return this.hasCollided;
	}

	intersect(collider) /* bool */ {

		// Unhandled shape to shape intersection.
		return false;
	}

	// Physics steps
	prePhysicsUpdate() /* */ {
		this.hasCollided = false;
	}

	// TO DO - DebugRender(){}

	// Sphere to X
	static SphereToSphere(s1, s2) /* bool */ {
		// (C1 - C2)dot(C1 - C2) <= (r1 + r2)squared
		let diff = s1.Parent.transform.PositionV2;
		diff.subtract(s2.Parent.transform.PositionV2);
		const dotDiff = diff.dot(diff);
   
		const radSq = (s1.radius + s2.radius) * (s1.radius + s2.radius);
		if(dotDiff <= radSq) {
			s1.hasCollided = s2.hasCollided = true;
			return true;
		}
		return false;
	}

	static SphereToBox(sphere, box) /* bool */ {
		const pos = sphere.Parent.transform.Position;
		const radius = sphere.radius;
		// Are we inside of...
		if( (pos.x + radius) > box.MinX && /* left-side */
			(pos.x - radius) < box.MaxX && /* right-side */
			(pos.y + radius) > box.MinY && /* top-side */
			(pos.y - radius) < box.MaxY) { /* bottom-side*/
				sphere.hasCollided = box.hasCollided = true;
				return true;
		}

		return false;
	}
}
 