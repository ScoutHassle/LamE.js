'use strict';

class BoxColliderComponent extends ColliderComponent {

    constructor(entity, iMinX, iMinY, iMaxX, iMaxY) {
        super(entity, ColliderShape.ColliderShape_Box);

        this.minX = iMinX; /* int */
        this.minY = iMinY; /* int */
        this.maxX = iMaxX; /* int */
        this.maxY = iMaxY; /* int */
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