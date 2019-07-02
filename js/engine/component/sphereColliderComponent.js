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
                return ColliderComponent.SphereToSphere(this, collider);

            case ColliderShape.ColliderShape_Box:
                return ColliderComponent.SphereToBox(this, collider);
        }

        // Unhandled shape to shape intersection.
        return false;
    }
}