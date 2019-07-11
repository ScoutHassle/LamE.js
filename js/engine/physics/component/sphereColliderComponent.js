'use strict';

class SphereColliderComponent extends ColliderComponent {

    constructor(entity, radius) {
        super(entity, ColliderShape.ColliderShape_Sphere);

        this.radius = radius; /* float */
    }

    // Keep base intersect
    intersect(collider) /* bool */ {

         switch(collider.shape) {
        //     case ColliderShape_Point:
        //         return this.toPoint(collider);

            case ColliderShape.ColliderShape_Sphere:
                return Collision.SphereToSphere(this, collider);

            case ColliderShape.ColliderShape_Box:
                return Collision.SphereToBox(this, collider);
        }

        // Unhandled shape to shape intersection.
        return false;
    }

    DebugRender() {

        const ctx = globalCanvas.context;
        ctx.fillStyle = this.GetResource;
            
        const transform = this.parent.transform;
        const pos = transform.PivotPosition;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#00ff0077"
        ctx.fill();
    }
}