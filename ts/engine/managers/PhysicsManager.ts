'use strict';

import { Vector2 } from "engine/utility/Vector2";

export class PhysicsManager {
    
    // Singleton
    private static instance: PhysicsManager;

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    staticObjects: any[];
    kineticObjects: any[]; // Have Rigid Body

    // Universal Settings
    private gravity: Vector2;
    private drag: number;

    constructor() {
        
        // Actual things...
        this.staticObjects = [];
        this.kineticObjects = []; // Have Rigid Body

        // Universal Settings
        this.gravity = new Vector2(0.0, -9.8);
        this.drag = 0.1;
    }

    Gravity(): Vector2 {
        return this.gravity;
    }

    Drag(): number {
        return this.drag;
    }

    // Physics Object Management
    AddRigidBody(rb: any): void {
        this.kineticObjects.push(rb)
    }
    
    Update(): void {
        // PrePhysics

        // PhysicsUpdate
        for(var i = 0; i < this.kineticObjects.length; i++) {

            this.kineticObjects[i].physicsUpdate(frameTime)
        }

        // PostPhysics
    }
    
    Shutdown() {
        
    }
}
