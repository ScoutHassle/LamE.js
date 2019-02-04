'use strict';

class RigidBodyComponent extends PhysicsComponent {    
    
	constructor(parent) {
        
		super(parent);
		this.constantForce = new vec2(0.0, 0.0);
        this.velocity = new vec2(0.0, 0.0);
        this.mass = 1.0;
    }

    get Velocity() {
        return this.velocity;
    }

    get Mass() {
        return this.mass;
    }

    set SetVelocity(v) {
        this.velocity = v;
    }

    set SetMass(m) {
        this.mass = m;
    }

    update() {
        
        // Stub - Unused by the physics side.   
    }
    
    physicsUpdate() {
        
        // Start with Euler's method for force calculations.
        // It's simple and should serve my current needs.
        var accel = this.ComputeForces().fdivide(this.mass);
        accel.clean();
        
        //position += frameTime * velocity
        this.velocity.add(accel.scale(frameTime));
        this.velocity.clean();
    }

    shutdown() {
        
        super.shutdown();
    }
	
	//  Utility
    ComputeForces(velocity) {
        
        var totalForce = new vec2(this.constant.x, this.constant.y);
        var gravity = new vec2(physics.Gravity.x, physics.Gravity.y);
        totalForce.add(gravity.fmultiply(this.mass));
        
        // Apply drag
        var speed = this.velocity.magnitude();
        var vel = new vec2(this.velocity.x, this.velocity.y);
        totalForce.subtract(vel.fmultiply(physics.Drag * this.mass * speed));
        
        return totalForce;
    }
}
