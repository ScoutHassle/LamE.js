import { InputComponent } from "engine/component/base/InputComponent";
import { CanvasManager } from "./CanvasManager";


export enum Keys {
    Key_Space_Bar = 32,
    Key_Arrow_Left = 37,
    Key_Arrow_Down = 38,
    Key_Arrow_Right = 39,
    Key_Arrow_Up = 40,

    Key_A = 65,
    Key_D = 68,
    Key_S = 83,
    Key_W = 87
}

class TouchData {
    identifier: number;
    pageX: number; 
    pageY: number;

    constructor(id: number, x: number, y: number) {
        this.identifier = id;
        this.pageX = x;
        this.pageY = y;
    }
}

export class InputManager {
    
      // Singleton
    private static instance: InputManager;

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

	//-----------------------------
	// Variables
	//-----------------------------
	inputComponentList: InputComponent[];
	
	x: number;
	y: number;
	touching: boolean;
	handledTouches: Touch[];
	
	// Currently not using keys... mobile focused still?
    keys: boolean[];

    constructor() {
		
		this.inputComponentList = [];
		this.handledTouches = [];
		this.keys = [];
    }
	
	//-----------------------------
	Start(): void {
		
		/*if(platform === platform_mobile)			
		{
			// Add touch controls!
			sceneManager.canvas.addEventListener('touchstart', this.onTouchStart, false);
			sceneManager.canvas.addEventListener('touchmove', this.onTouchMove, false);
			sceneManager.canvas.addEventListener('touchend', this.onTouchEnd, false);
			sceneManager.canvas.addEventListener('touchcancel', this.onTouchCancel, false);
		}*/
		
		//if(platform === platform_web || platform === platform_pc)
		//{
            // Mouse controls
            const canvas = CanvasManager.Instance.GetCanvas();
			canvas.addEventListener('mousedown', 	this.OnMouseDown, 	false);
			canvas.addEventListener('mousemove', 	this.OnMouseMove, 	false);
			canvas.addEventListener('mouseup', 	    this.OnMouseUp, 	false);
        
        // Keys
        document.addEventListener('keydown',     this.OnKeyDown,     false);
        document.addEventListener('keyup',       this.OnKeyUp,       false);
		//}
	}
	
	Update(): void {
		
		// TO DO - If we're going to do PC keys
		// that can be handled here and passed over
		// to the currentScene etc.
	}
	
	//-----------------------------
	// Component Management
	//-----------------------------
	AddInputComponent(obj: InputComponent): void {
		this.inputComponentList.push(obj);
	}
	
	RemoveInputComponent(obj: InputComponent): void	{
		// Does this work in js?
		for(let i = 0; i < this.inputComponentList.length; i++)
		{
			if(this.inputComponentList[i] == obj)
			{
				this.inputComponentList.splice(i, 1);
				return;
			}
		}
	}
	
	//-----------------------------
	// Event Handlers
	//-----------------------------
	OnTouchStart(e: TouchEvent): void {
		// To fix an android based issue.
		e.preventDefault();
		
		const touches = e.changedTouches;
		for(let t = 0; t < touches.length; t++)
		{
			for(let i = 0; i < this.inputComponentList.length; i++)
			{
				if(this.inputComponentList[i].OnTouchStart(touches[t]))
				{
					// Consumed.
					break;
				}
			}
		}
	}
	
	OnTouchMove(e: TouchEvent): void {
		// To fix an android based issue.
		e.preventDefault();
		
		const touches = e.changedTouches;
		for(let t = 0; t < touches.length; t++)
		{
			for(let i = 0; i < this.inputComponentList.length; i++)
			{
				if(this.inputComponentList[i].OnTouchMove(touches[t]))
				{
					// Consumed.
					break;
				}
			}
		}
	}
	
	OnTouchCancel(e: TouchEvent): void {

		e.preventDefault();
	}
	
	OnTouchEnd(e: TouchEvent): void {

		// Yep, android.
		e.preventDefault();
		
		const touches = e.changedTouches;
		for(let t = 0; t < touches.length; t++)	{
			for(let i = 0; i < this.inputComponentList.length; i++)	{
				if(this.inputComponentList[i].OnTouchEnd(touches[t])) {
					// Consumed.
					break;
				}
			}
		}
	}
	
	//--------------------
	// Touch Utility
	//--------------------
	CopyTouchfunction(touch: Touch): TouchData {
        return new TouchData(touch.identifier,
                touch.pageX, 
                touch.pageY);
	}
	

	GetTouchIdxById(inId: number): number {
		for (let i = 0; i < this.handledTouches.length; i++) 
		{
			const id = this.handledTouches[i].identifier;
		
			if (id == inId) 
			{
				return i;
			}
		}
				
		return -1;    // not found
    }
    

    // TO DO - Sort all the touch stuff for mice etc.
    // Just get it working since its 11pm again.
    BadTouch(id: number, x: number, y: number): Touch {

        let t = {
        altitudeAngle: 0,
        azimuthAngle: 0,
        clientX: 0,
        clientY: 0,
        force: 0,
        identifier: id,
        pageX: x,
        pageY: y,
        radiusX: 0,
        radiusY: 0,
        rotationAngle: 0,
        screenX: 0,
        screenY: 0,
        target: null,
        touchType: null
    };

        return t;
    }
	
	//--------------------
	// Mouse
	//--------------------
	OnMouseDown(e: MouseEvent): void {

		e.preventDefault();
		if(InputManager.Instance.GetTouchIdxById(e.button) === -1)
		{			
            const t = InputManager.Instance.BadTouch(e.button,	e.pageX, e.pageY);
            InputManager.Instance.handledTouches.push(t);

			for(let i = 0; i < InputManager.Instance.inputComponentList.length; i++) {
				if(InputManager.Instance.inputComponentList[i].OnTouchStart(t))
				{
					// Consumed.
					break;
				}
			}
		}
	}
	
	OnMouseMove(e: MouseEvent): void {
	
		e.preventDefault();
		const idx = InputManager.Instance.GetTouchIdxById(e.button);
		if(idx > -1)
		{
            const t = InputManager.Instance.BadTouch(e.button,	e.pageX, e.pageY);				
			InputManager.Instance.handledTouches.splice(idx, 1, t);
			
			for(let i = 0; i < InputManager.Instance.inputComponentList.length; i++)
			{
				if(InputManager.Instance.inputComponentList[i].OnTouchMove(t))
				{
					// Consumed.
					break;
				}
			}
		}
	}
	
	OnMouseUp(e: MouseEvent): void {

		e.preventDefault();
		const idx = InputManager.Instance.GetTouchIdxById(e.button);
		if(idx > -1) {
            const t = InputManager.Instance.BadTouch(e.button,	e.pageX, e.pageY);	
			InputManager.Instance.handledTouches.splice(idx, 1);
			
			for(let i = 0; i < InputManager.Instance.inputComponentList.length; i++)	{
				if(InputManager.Instance.inputComponentList[i].OnTouchEnd(t)) {
					// Consumed.
					break;
				}
			}
		}
	}
    
    OnKeyDown(e: KeyboardEvent): void {
        
        InputManager.Instance.keys[e.keyCode] = true;
    }
    
    OnKeyUp(e: KeyboardEvent): void {
        
		InputManager.Instance.keys[e.keyCode] = false;
    }
    
    IsKeyDown(code: number): boolean {
        
        if(InputManager.Instance.keys[code] != null && InputManager.Instance.keys[code] == true) {
        
            return true;
        }
        
        return false;
    }
}
