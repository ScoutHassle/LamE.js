import { CanvasManager } from "./CanvasManager";

export class LoadBarrier {

    // Singleton
    private static instance: LoadBarrier;

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }
	
	resourcesWaiting: number;
    resourcesLoaded: number;
    
    constructor() {

    }
	
	ClearLoadBarrier(): void
	{
		this.resourcesWaiting = 0;
		this.resourcesLoaded = 0;
	}
		
	ResourceLoading(): void	{
		this.resourcesWaiting++;
	}
	
	ObjectLoaded(): void {
		this.resourcesLoaded++;
	}
	
	LoadBarrierPassed(): boolean {
		// If we've loaded as much as we have to load then we've passed.
		return (this.resourcesWaiting === this.resourcesLoaded);
	}
	
	Render(): void {
        // Draw loading screen
		
		let ctx = CanvasManager.Instance.GetContext();
		const canvas = CanvasManager.Instance.GetCanvas();
		ctx.fillStyle = "Blue";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		// Text
		ctx.font = "20px Arial";
		ctx.fillStyle = "red";
		ctx.textAlign = "center";
		
		ctx.fillText("LOADING", canvas.width/2, canvas.height/2 - 20);
	}
}
