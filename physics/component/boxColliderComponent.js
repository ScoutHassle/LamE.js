'use strict';

var BoxColliderEdge = {
	"Top": 0,
	"Right": 1,
	"Bottom": 2,
	"Left": 3,};
Object.freeze(BoxColliderEdge);

class BoxColliderComponent extends ColliderComponent {

	constructor(entity, iMinX, iMinY, iMaxX, iMaxY) {
		super(entity, ColliderShape.ColliderShape_Box);

		this.minX = iMinX; /* int */
		this.minY = iMinY; /* int */
		this.maxX = iMaxX; /* int */
		this.maxY = iMaxY; /* int */
	}

	getOrigin(edge) /* Vector 2 */ {
		switch(edge) {
			case BoxColliderEdge.Top:
			case BoxColliderEdge.Left:
				return new vec2(this.minX, this.minY);

			case BoxColliderEdge.Right:
				return new vec2(this.maxX, this.minY);

			case BoxColliderEdge.Bottom:
				return new vec2(this.minX, this.maxY);
		}
	}

	getExtent(edge) /* Vector 2 */ {
		switch(edge) {
			case BoxColliderEdge.Top:			
				return new vec2(this.maxX, this.minY);

			case BoxColliderEdge.Right:
				return new vec2(this.maxX, this.maxY);

			case BoxColliderEdge.Bottom:
				return new vec2(this.maxX, this.maxY);

			case BoxColliderEdge.Left:
				return new vec2(this.minX, this.maxY);
		}
	}

	// Keep base intersect
	intersect(collider) /* bool */ {

		  switch(collider.shape) {
			 case ColliderShape.ColliderShape_Sphere:
				 return Collision.SphereToBox(collider, this);

			 case ColliderShape.ColliderShape_Box:
				 return Collision.BoxToBox(this, collider);
		 }

		// Unhandled shape to shape intersection.
		return false;
	}

	DebugRender() {

		const ctx = globalCanvas.context;            
		const transform = this.parent.transform;        
		ctx.fillStyle = "#00ff0077"
		ctx.fillRect(transform.x, transform.y, transform.width, transform.height);
	}
}