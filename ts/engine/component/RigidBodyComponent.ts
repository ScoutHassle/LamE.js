'use strict';

import { PhysicsComponent } from "./base/PhysicsComponent";
import { Vector2 } from "engine/utility/Vector2";
import { PhysicsManager } from "engine/managers/PhysicsManager";
import { Entity } from "engine/Entity";

export class RigidBodyComponent extends PhysicsComponent {    
    
    constantForce: Vector2;
    velocity: Vector2;
    mass: number;

	constructor(parent: Entity) {
        
		super(parent);
		this.constantForce = new Vector2(0.0, 0.0);
        this.velocity = new Vector2(0.0, 0.0);
        this.mass = 1.0;

        PhysicsManager.Instance.AddRigidBody(this)
    }

    Velocity(): Vector2 {
        return this.velocity;
    }

    Mass(): number {
        return this.mass;
    }

    SetVelocity(v: Vector2): void {
        this.velocity.Set(v);
    }

    SetMass(m: number): void {
        this.mass = m;
    }

    Update(): void {
        
        // Stub - Unused by the physics side.   
    }
    
    PhysicsUpdate(delta: number): void {
        
        // Start with Euler's method for force calculations.
        // It's simple and should serve my current needs.
        let accel = this.ComputeForces()
        accel.FloatDivide(this.mass);
        accel.Clean();
        
        let movement = new Vector2(this.velocity.x, this.velocity.y);
        movement.FloatMultiply(delta);
        this.Parent().transform.Move(movement);

        accel.FloatMultiply(delta)
        this.velocity.Add(accel);
        this.velocity.Clean();
    }

    Shutdown(): void {
        
        super.Shutdown();
    }
	
	//  Utility
    ComputeForces(): Vector2 {
        
        let totalForce = new Vector2(this.constantForce.x, this.constantForce.y);
        let gravity = new Vector2(PhysicsManager.Instance.Gravity().x, PhysicsManager.Instance.Gravity().y);
        gravity.FloatMultiply(this.mass)
        totalForce.Subtract(gravity);
        
        // Apply drag
        const speed = this.velocity.Magnitude();
        let vel = new Vector2(this.velocity.x, this.velocity.y);
        vel.FloatMultiply(PhysicsManager.Instance.Drag() * this.mass * speed)
        totalForce.Subtract(vel);
        
        return totalForce;
    }
}
