import { updateEngine } from "../Main";
import { frameTime } from "../GlobalSettings";
import { Scene } from "../Scene";
import { CanvasManager } from "./CanvasManager";
import { ResourceManager } from "./ResourceManager";
import { PhysicsManager } from "./PhysicsManager";
import { InputManager } from "./InputManager";

// Scene Manager is charged with running the current scene
// and the handling of the global canvas in the game.

// Running as a singleton so won't be using prototypal inheritance
// for this object.

export class SceneManager {

    // Singleton
    private static instance: SceneManager;

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }
	
	//-----------------------------
	// Variables
	//-----------------------------
	projectData: any;
	currentScene: Scene;
    currentSceneIndex: number;
    private interval: any;

    constructor() {
		this.currentScene = null;
    }
	
	//-----------------------------
	// Scene Management
	//-----------------------------
	ChangeScene(index: number): Scene {
		
		// Shutdown current
		if(this.currentScene) {
			this.currentScene.Shutdown();
		}
		
        this.currentSceneIndex = index;        
        
		this.currentScene = new Scene();
        this.currentScene.Load(this.GetSceneData(index));
		this.currentScene.Start();
		
		return this.currentScene;
	}
	
	//-----------------------------
	// Scene Update etc.
	//-----------------------------
	Initialise(): void {
		
		// Default things we need to get running.
		// Global Canvas
		CanvasManager.Instance.CreateCanvas(800, 600);
		
		// Resource Manager
		ResourceManager.Instance.Start();
		
		// Input Manager
		InputManager.Instance.Start();
	}
	
	Start(data: any): void {
		
		this.projectData = JSON.parse(data);		
		
		// Finally handle our first scene - taken from json
		this.ChangeScene(0);

		
		// And create the tick
		// Interval is 1 second/frameTime in ms = ticks per second 
		// e.g. 1.0/0.05 = 20 FPS.
		this.interval = setInterval(updateEngine, 1.0/frameTime);
	}
	
	Shutdown(): void {
		
		clearInterval(this.interval);
	}
	
	Update(): void {
		
		// Input first (so it is handled during the update)
		InputManager.Instance.Update();
		
		// Now the scene handling
		this.currentScene.Update();

		// Global PhysicsManager.
		PhysicsManager.Instance.Update();
		
		// Finally draw...
		this.Render();
	}
	
	Render(): void {
		
		CanvasManager.Instance.Clear();
		this.currentScene.Render();
	}
	
	GetSceneData(i: number): any {
		
		return this.projectData['Project']['Scenes'][i];
	}
}
