'use strict';

class PhysicsManager {
    
    constructor() {
        
        // Actual things...
        this.staticObjects = [];
        this.kineticObjects = []; // Have Rigid Body

        // Universal Settings
        this.gravity = new vec2(0.0, -9.8);
        this.drag = 0.1;
    }

    get Gravity() {
        return this.gravity;
    }

    get Drag() {
        return this.drag;
    }

    // Physics Object Management
    addRigidBody(rb) {
        this.kineticObjects.push(rb)
    }
    
    update() {
        // PrePhysics

        // PhysicsUpdate
        for(var i = 0; i < this.kineticObjects.length; i++) {

            this.kineticObjects[i].physicsUpdate(frameTime)
        }

        // PostPhysics
    }
    
    shutdown() {
        
        this.parent = null;
    }
}

var physics = new PhysicsManager()
