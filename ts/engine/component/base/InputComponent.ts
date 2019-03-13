import { Component, ComponentType } from './Component';
import { Entity } from '../../Entity';

export enum TouchEventType {
	Touch_Start = 1,
	Touch_Move,
	Touch_End
}

interface LamETouchEvent { (touch: Touch): void }
export class InputComponent extends Component {

    touchId: number;
    onTouchStartEvent: LamETouchEvent;
    onTouchMoveEvent:LamETouchEvent;
    onTouchEndEvent: LamETouchEvent;

    constructor(parent: Entity) {
        super(ComponentType.Component_Input, parent);

        this.touchId = -1;
        this.onTouchStartEvent = null;
	    this.onTouchMoveEvent = null;
        this.onTouchEndEvent = null;

        // TO DO - InputManager
    }

    Update(): void {

    }

    Shutdown(): void {
        super.Shutdown();

        this.onTouchStartEvent = null;
	    this.onTouchMoveEvent = null;
        this.onTouchEndEvent = null;

        // TO DO - InputManager
    }

    SetTouchId(id: number): void {
		this.touchId = id;
	}
	
	IsValidTouchId(id: number): boolean {

		if (this.touchId == id && this.touchId != -1) return true;
		return false;
	}

	ClearTouchId(): void {
		this.touchId = -1;
	}

	SetTouchEvent(type: TouchEventType, func: LamETouchEvent): void {
        
		switch(type)
		{
			case TouchEventType.Touch_Start:
				this.onTouchStartEvent = func;
			break;
			
			case TouchEventType.Touch_Move:
				this.onTouchMoveEvent = func;
			break;
			
			case TouchEventType.Touch_End:
				this.onTouchEndEvent = func;
			break;
		}
	}

	TriggerTouchEvent(type: TouchEventType, touch: Touch): void {
        
		switch(type)
		{
			case TouchEventType.Touch_Start:
				if(this.onTouchStartEvent != null) this.onTouchStartEvent(touch);
			break;
			
			case TouchEventType.Touch_Move:
				if(this.onTouchMoveEvent != null) this.onTouchMoveEvent(touch);
			break;
			
			case TouchEventType.Touch_End:
				if(this.onTouchEndEvent != null) this.onTouchEndEvent(touch);
			break;
		}
	}

	// To Override
	OnTouchStart(touch: Touch): boolean {
        
        return false;
    }

    OnTouchMove(touch: Touch): boolean {
        
        return false;
    }

    OnTouchEnd(touch: Touch): boolean {
        
        return false;
    }
}
