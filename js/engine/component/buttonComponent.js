'use strict';

class ButtonComponent extends InputComponent {
    
    constructor(entity) {
        
        super(entity);
    }
    
    OnTouchStart(touch) {
        
        if(this.TouchBoundCheck(touch))
        {
            this.TriggerTouchEvent(TouchEventType.Touch_Start, touch);
			this.SetTouchId(touch.identifier);
				
			return true;
        }
			
		return false;
    }
    
    OnTouchMove(touch) {
        
        if(this.TouchBoundCheck(touch))
        {
            if(this.ValidTouchId(touch.identifier))
			{
                this.TriggerTouchEvent(TouchEventType.Touch_Start, touch);
					
				return true;
            }
        }
			
		return false;
    }
    
    OnTouchEnd(touch) {
        
        if(this.TouchBoundCheck(touch))
			{
				if(this.ValidTouchId(touch.identifier))
				{
					this.TriggerTouchEvent(TouchEventType.Touch_End, touch);
					this.ClearTouchId();
					
					return true;
				}
			}
			
			return false;
    }
    
    TouchBoundCheck(touch) {
        
        // Cache
	   var transform = this.parent.transform;
	
	   if((touch.pageX > transform.x && touch.pageX < (transform.x + transform.width)) &&
		  (touch.pageY < (transform.y + transform.height) && touch.pageY > transform.y))
	   {
		  return true;
	   }
		
	   return false;
    }
    
}
