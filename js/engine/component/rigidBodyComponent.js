'use strict';

class RigidBodyComponent extends PhysicsComponent {    
    
	constructor(entity) {
        
		super(entity);
		this.constantForce = new vec2(0.0, 0.0);
        this.velocity = new vec2(0.0, 0.0);
        this.mass = 1.0;

        physics.addRigidBody(this)
    }

    get Velocity()  /* js: {x, y} */ {
		return this.velocity.position;
	}

    get Mass() /* float */ {
        return this.mass;
    }

    set Velocity(v) /* */ {
        this.velocity.Set = v;
    }

    set Mass(m) /* */ {
        this.mass = m;
    }

    addForceX(fX) /* */ {
        this.velocity.x += fX;
    }

    addForceY(fY) /* */ {
        this.velocity.y += fY;
    }

    update() /* */ {
        
        // Stub - Unused by the physics side.   
    }
    
    physicsUpdate(delta) /* */ {
        
        // Start with Euler's method for force calculations.
        // It's simple and should serve my current needs.
        var accel = this.computeForces()
        accel.fdivide(this.mass);
        accel.clean();
        
        var movement = new vec2(this.velocity.x, this.velocity.y);
        movement.fmultiply(delta);
        this.Parent.transform.move(movement);

        accel.fmultiply(delta)
        this.velocity.add(accel);
        this.velocity.clean();
    }

    shutdown() /* */ {
        
        super.shutdown();
    }
	
	//  Utility
    computeForces() /* Vec2 */ {
        
        var totalForce = new vec2(this.constantForce.x, this.constantForce.y);
        var gravity = new vec2(physics.Gravity.x, physics.Gravity.y);
        gravity.fmultiply(this.mass)
        totalForce.subtract(gravity);
        
        // Apply drag
        var speed = this.velocity.magnitude();
        var vel = new vec2(this.velocity.x, this.velocity.y);
        vel.fmultiply(physics.Drag * this.mass * speed)
        totalForce.subtract(vel);
        
        return totalForce;
    }
}
