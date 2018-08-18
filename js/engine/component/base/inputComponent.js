var TouchEventType = {
	"Touch_Start":1,
	"Touch_Move":2,
	"Touch_End":3 };
Object.freeze(TouchEventType);

class InputComponent extends Component {
    
    constructor(parent) {
        
        super(ComponentType.Component_Input, parent);
        
        this.touchId = -1;
        this.onTouchStartEvent = null;
        this.onTouchMoveEvent = null;
        this.onTouchEndEvent = null;
        
        inputManager.addInputComponent(this);
    }

    update() {
        
    }

    shutdown() {
        
        super.shutdown();
			
        this.onTouchStartEvent = null;
		this.onTouchMoveEvent = null;
		this.onTouchEndEvent = null;
			
		inputManager.removeInputComponent(this);
    }

    set SetTouchId(id) {
        this.touchId = id;
    }

    IsValidTouchId(id) {
        
        if(this.touchId == id && this.touchId != -1) return true;
		
		return false;
    }

    ClearTouchId() {
        
		this.touchId = -1;
	}
	
	SetTouchEvent(type, func) {
        
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
	
	TriggerTouchEvent(type, touch) {
        
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

    OnTouchStart(touch) {
        
        return false;
    }

    OnTouchMove(touch) {
        
        return false;
    }

    OnTouchEnd(touch) {
        
        return false;
    }
}
