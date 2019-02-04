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
    
    update() {
        // PrePhysics

        // PhysicsUpdate

        // PostPhysics
    }
    
    shutdown() {
        
        this.parent = null;
    }
}

var physics = new PhysicsManager()
