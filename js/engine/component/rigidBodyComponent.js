"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PhysicsComponent_1 = require("./base/PhysicsComponent");
const Vector2_1 = require("../utility/Vector2");
const PhysicsManager_1 = require("engine/managers/PhysicsManager");
class RigidBodyComponent extends PhysicsComponent_1.PhysicsComponent {
    constructor(parent) {
        super(parent);
        this.constantForce = new Vector2_1.Vector2(0.0, 0.0);
        this.velocity = new Vector2_1.Vector2(0.0, 0.0);
        this.mass = 1.0;
        PhysicsManager_1.PhysicsManager.Instance.AddRigidBody(this);
    }
    Velocity() {
        return this.velocity;
    }
    Mass() {
        return this.mass;
    }
    SetVelocity(v) {
        this.velocity.Set(v);
    }
    SetMass(m) {
        this.mass = m;
    }
    Update() {
        // Stub - Unused by the physics side.   
    }
    PhysicsUpdate(delta) {
        // Start with Euler's method for force calculations.
        // It's simple and should serve my current needs.
        let accel = this.ComputeForces();
        accel.FloatDivide(this.mass);
        accel.Clean();
        let movement = new Vector2_1.Vector2(this.velocity.x, this.velocity.y);
        movement.FloatMultiply(delta);
        this.Parent().transform.Move(movement);
        accel.FloatMultiply(delta);
        this.velocity.Add(accel);
        this.velocity.Clean();
    }
    Shutdown() {
        super.Shutdown();
    }
    //  Utility
    ComputeForces() {
        let totalForce = new Vector2_1.Vector2(this.constantForce.x, this.constantForce.y);
        let gravity = new Vector2_1.Vector2(PhysicsManager_1.PhysicsManager.Instance.Gravity().x, PhysicsManager_1.PhysicsManager.Instance.Gravity().y);
        gravity.FloatMultiply(this.mass);
        totalForce.Subtract(gravity);
        // Apply drag
        const speed = this.velocity.Magnitude();
        let vel = new Vector2_1.Vector2(this.velocity.x, this.velocity.y);
        vel.FloatMultiply(PhysicsManager_1.PhysicsManager.Instance.Drag() * this.mass * speed);
        totalForce.Subtract(vel);
        return totalForce;
    }
}
exports.RigidBodyComponent = RigidBodyComponent;
//# sourceMappingURL=RigidBodyComponent.js.map