'use strict';

import { InputComponent } from "./base/InputComponent";
import { Entity } from "engine/Entity";


export class ButtonComponent extends InputComponent {
    
    constructor(parent: Entity) {
        
        super(parent);
    }
    
    OnTouchStart(touch: Touch): boolean {
        
        if(this.TouchBoundCheck(touch))
        {
            this.TriggerTouchEvent(TouchEventType.Touch_Start, touch);
			this.SetTouchId(touch.identifier);
				
			return true;
        }
			
		return false;
    }
    
    OnTouchMove(touch: Touch): boolean {
        
        if(this.TouchBoundCheck(touch))
        {
            if(this.IsValidTouchId(touch.identifier))
			{
                this.TriggerTouchEvent(TouchEventType.Touch_Start, touch);
					
				return true;
            }
        }
			
		return false;
    }
    
    OnTouchEnd(touch: Touch): boolean {
        
        if(this.TouchBoundCheck(touch))
			{
				if(this.IsValidTouchId(touch.identifier))
				{
					this.TriggerTouchEvent(TouchEventType.Touch_End, touch);
					this.ClearTouchId();
					
					return true;
				}
			}
			
			return false;
    }
    
    TouchBoundCheck(touch: Touch): boolean {
        
        // Cache
       const transform = this.parent.transform;
       const pos = transform.Position();
       const size = transform.Size();
	
	   if((touch.pageX > pos.x && touch.pageX < (pos.x + size.x)) &&
		  (touch.pageY < (pos.y + size.y) && touch.pageY > pos.y))
	   {
		  return true;
	   }
		
	   return false;
    }
    
}
