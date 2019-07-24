'use strict';


class CollisionObject {
	constructor(physObj1, physObj2) /* */ {
		this.physObj1 = physObj1;
		this.physObj2 = physObj2;
        this.collisionEvent = CollisionEvent.Collision_Enter;
	}

	CollisionEnter() /* */ {
        this.collisionEvent = CollisionEvent.Collision_Enter;
		this.physObj1.collider.OnCollisionEnter(this.physObj2.collider, this);
		this.physObj2.collider.OnCollisionEnter(this.physObj1.collider, this);
    }
    
    CollisionActive() /* */ {
        this.collisionEvent = CollisionEvent.Collision_Active;
		this.physObj1.collider.OnCollisionActive(this.physObj2.collider, this);
		this.physObj2.collider.OnCollisionActive(this.physObj1.collider, this);
    }

    CollisionExit() /* */ {
        this.collisionEvent = CollisionEvent.Collision_Exit;
		this.physObj1.collider.OnCollisionExit(this.physObj2.collider, this);
		this.physObj2.collider.OnCollisionExit(this.physObj1.collider, this);
    }
}