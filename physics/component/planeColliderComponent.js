'use strict';


class PlaneColliderComponent extends ColliderComponent {

	constructor(entity, iMinX, iMaxX) {
		super(entity, ColliderShape.ColliderShape_Plane);

		this.minX = iMinX; /* int */
		this.maxX = iMaxX; /* int */
	}

	getOrigin() /* Vector 2 */ {
		return new vec2(this.minX, this.Parent.transform.y);
	}

	getExtent() /* Vector 2 */ {
		return new vec2(this.maxX, this.Parent.transform.y);
	}

	// Keep base intersect
	intersect(collider) /* bool */ {

		  switch(collider.shape) {
			 case ColliderShape.ColliderShape_Sphere:
				 return Collision.SphereToLine(collider, this.getOrigin(), this.getExtent());
		 }

		// Unhandled shape to shape intersection.
		return false;
	}

	DebugRender() {

		const ctx = globalCanvas.context;            
		const transform = this.parent.transform;        
		ctx.fillStyle = "#00ff0077"
		ctx.fillRect(this.minX, transform.y, this.maxX - this.minX, 5.0);
	}
}