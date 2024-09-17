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

            case ColliderShape.ColliderShape_Plane:
                    return Collision.SphereToLine(this, collider.getOrigin(), collider.getExtent());
        }

        // Unhandled shape to shape intersection.
        return false;
    }

    DebugRender() {

        const ctx = globalCanvas.context;
            
        const transform = this.parent.transform;
        const pos = transform.PivotPosition;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.resource;
        ctx.fill();
    }
}