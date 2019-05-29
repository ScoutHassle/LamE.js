//-----------------------------
// Define Keys (PC)
//-----------------------------
var key_Arrow_Left = 37;
var key_Arrow_Right = 39
var key_Arrow_Up = 40;
var key_Arrow_Down = 38;
var key_Space_Bar = 32;

var key_W = 87;
var key_A = 65;
var key_S = 83;
var key_D = 68;

var inputManager = {
	
	//-----------------------------
	// Variables
	//-----------------------------
	inputComponentList : [],
	
	x : 0,
	y : 0,
	touching : false,
	handledTouches : [],
	
	// Currently not using keys... mobile focused still?
    keys : [],
	
	//-----------------------------
	start : function() {
		
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
			globalCanvas.canvas.addEventListener('mousedown', 	this.onMouseDown, 	false);
			globalCanvas.canvas.addEventListener('mousemove', 	this.onMouseMove, 	false);
			globalCanvas.canvas.addEventListener('mouseup', 	this.onMouseUp, 	false);
        
        // Keys
        document.addEventListener('keydown',     this.onKeyDown,     false);
       document.addEventListener('keyup',       this.onKeyUp,       false);
		//}
	},
	
	update : function() {
		
		// TO DO - If we're going to do PC keys
		// that can be handled here and passed over
		// to the currentScene etc.
	},
	
	//-----------------------------
	// Component Management
	//-----------------------------
	addInputComponent : function(obj)
	{
		this.inputComponentList.push(obj);
	},
	
	removeInputComponent : function(obj)
	{
		// Does this work in js?
		for(var i = 0; i < this.inputComponentList.length; i++)
		{
			if(this.inputComponentList[i] == obj)
			{
				this.inputComponentList.splice(i, 1);
				return;
			}
		}
	},
	
	//-----------------------------
	// Event Handlers
	//-----------------------------
	onTouchStart : function(e)
	{
		// To fix an android based issue.
		e.preventDefault();
		
		var touches = e.changedTouches;
		for(var t = 0; t < touches.length; t++)
		{
			for(var i = 0; i < this.inputComponentList.length; i++)
			{
				if(this.inputComponentList[i].onTouchStart(touches[t]))
				{
					// Consumed.
					break;
				}
			}
		}
	},
	
	onTouchMove : function(e)
	{
		// To fix an android based issue.
		e.preventDefault();
		
		var touches = e.changedTouches;
		for(var t = 0; t < touches.length; t++)
		{
			for(var i = 0; i < this.inputComponentList.length; i++)
			{
				if(this.inputComponentList[i].onTouchMove(touches[t]))
				{
					// Consumed.
					break;
				}
			}
		}
	},
	
	onTouchCancel : function(e)
	{
		e.preventDefault();
	},
	
	onTouchEnd : function(e)
	{
		// Yep, android.
		e.preventDefault();
		
		var touches = e.changedTouches;
		for(var t = 0; t < touches.length; t++)
		{
			for(var i = 0; i < this.inputComponentList.length; i++)
			{
				if(this.inputComponentList[i].onTouchEnd(t))
				{
					// Consumed.
					break;
				}
			}
		}
	},
	
	//--------------------
	// Touch Utility
	//--------------------
	copyTouch : function(touch) {
	return {identifier: touch.identifier,
			pageX: touch.pageX, 
			pageY: touch.pageY };
	},
	

	getTouchIdxById : function(inId) {
		for (var i = 0; i < this.handledTouches.length; i++) 
		{
			var id = this.handledTouches[i].identifier;
		
			if (id == inId) 
			{
				return i;
			}
		}
				
		return -1;    // not found
	},
	
	//--------------------
	// Mouse
	//--------------------
	onMouseDown : function(e)
	{
		e.preventDefault();
		if(inputManager.getTouchIdxById(e.button) === -1)
		{
			var touch = {identifier: e.button,
			pageX: e.pageX, 
			pageY: e.pageY };
				
			inputManager.handledTouches.push(touch);
			
			for(var i = 0; i < inputManager.inputComponentList.length; i++)
			{
				if(inputManager.inputComponentList[i].onTouchStart(touch))
				{
					// Consumed.
					break;
				}
			}
		}
	},
	
	onMouseMove : function(e)
	{
		e.preventDefault();
		var idx = inputManager.getTouchIdxById(e.button);
		if(idx > -1)
		{
			var touch = {identifier: e.button,
			pageX: e.pageX, 
			pageY: e.pageY };
				
			inputManager.handledTouches.splice(idx, 1, touch);
			
			for(var i = 0; i < inputManager.inputComponentList.length; i++)
			{
				if(inputManager.inputComponentList[i].onTouchMove(touch))
				{
					// Consumed.
					break;
				}
			}
		}
	},
	
	onMouseUp : function(e)
	{
		e.preventDefault();
		var idx = inputManager.getTouchIdxById(e.button);
		if(idx > -1)
		{
			var touch = {identifier: e.button,
			pageX: e.pageX, 
			pageY: e.pageY };
			
			inputManager.handledTouches.splice(idx, 1);
			
			for(var i = 0; i < inputManager.inputComponentList.length; i++)
			{
				if(inputManager.inputComponentList[i].onTouchEnd(touch))
				{
					// Consumed.
					break;
				}
			}
		}
	},
    
    onKeyDown : function(e) {
        
        inputManager.keys[e.keyCode] = 1;
    },
    
    onKeyUp : function(e) {
        
         inputManager.keys[e.keyCode] = 0;
    },
    
    isKeyDown : function(code) {
        
        if(this.keys[code] != null && this.keys[code] == 1) {
        
            return true;
        }
        
        return false;
    }
}
