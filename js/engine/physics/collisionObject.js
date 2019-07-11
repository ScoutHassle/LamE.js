'use strict';


class CollisionObject {
	constructor(c1, c2, hit) /* */ {
		this.collider1 = c1;
		this.collider2 = c2;
        this.collisionEvent = CollisionEvent.Collision_Enter;
        
        this.hitPoint = hit; /* Vector2 */
	}

	CollisionEnter() /* */ {
        this.collisionEvent = CollisionEvent.Collision_Enter;
		this.collider1.OnCollisionEnter(this.collider2, this);
		this.collider2.OnCollisionEnter(this.collider1, this);
    }
    
    CollisionActive(hit) /* */ {
        this.hitPoint = hit;
        this.collisionEvent = CollisionEvent.Collision_Active;
		this.collider1.OnCollisionActive(this.collider2, this);
		this.collider2.OnCollisionActive(this.collider1, this);
    }

    CollisionExit() /* */ {
        this.collisionEvent = CollisionEvent.Collision_Exit;
		this.collider1.OnCollisionExit(this.collider2, this);
		this.collider2.OnCollisionExit(this.collider1, this);
    }
}