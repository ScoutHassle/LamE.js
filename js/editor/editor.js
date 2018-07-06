var globalCanvas = null;

var editorObj = null;
function editor() {
	//-----------------------------
	// Variables
	//-----------------------------
	var editorScene = null;
	var dirty = true;
	var selectedEntity = -1;
	
	//-----------------------------
	// Getters/Setters
	//-----------------------------
	this.getScene = function() {
		
		return editorScene;
	};
	
	this.setScene = function(scene) {
		
		editorScene = scene;
	};
	
	this.getDirty = function() {
		
		return dirty;
	};
	
	this.setDirty = function(state) {
		
		dirty = state;
	};
	
	this.getSelectedEntity = function() {
		
		return selectedEntity;
	};
	
	//-----------------------------
	// Scene Management
	//-----------------------------	
	this.changeScene = function(scene) {
		// Shutdown current scene
		if(editorScene)
		{
			editorScene.shutdown();
			//loadBarrier.clearLoadBarrier();
		}
		
		editorScene = scene;
		editorScene.start();
		
		// TO DO - LoadBarrier
		/*if(!loadBarrier.loadBarrierPassed())
		{
			sceneManager.stop();
			sceneManager.interval = setInterval(sceneManager.loading, 20);
			sceneManager.barrier = barrier;
		}*/
		
		return scene;
	};
	
	//-----------------------------
	// Entity Stuff
	//-----------------------------
	this.createEntity = function() {
		
		// Debug - make something!
		var entity = editorScene.createEntity("GameObject", 0, 0, 100, 100);
	};
	
	this.setSelectedEntity = function(i) {
		
		var btn;
		if(selectedEntity != -1)
		{
			btn = document.getElementById("Entity" + selectedEntity);
			btn.style.background = "#FFFFFF";
		}
		
		btn = document.getElementById("Entity" + i);
		btn.style.background = "#FF0000";
		
		selectedEntity = i;
		dirty = true;
	};
	
	this.reSelectSelectedEntity = function() {
		
		if(selectedEntity != -1)
		{
			btn = document.getElementById("Entity" + selectedEntity);
			btn.style.background = "#FF0000";
		}
	};
	
	this.drawEntityEditorWindow = function() {
		
		if(selectedEntity != -1)
		{
			var entity = editorScene.getEntityAt(selectedEntity);
			entity.editorDraw();
			entity.editorPostDraw();
		}
	};
	
	this.selectedEntityUpdateValues = function() {
		
		if(selectedEntity != -1)
		{
			var entity = editorScene.getEntityAt(selectedEntity);
			
			// X
			if(field = document.getElementById(editorTransform_X))
			{
				entity.transform.x = field.value;
			}
			
			// Y
			if(field = document.getElementById(editorTransform_Y))
			{
				entity.transform.y = field.value;
			}
			
			// W
			if(field = document.getElementById(editorTransform_W))
			{
				entity.transform.width = field.value;
			}
			
			// H
			if(field = document.getElementById(editorTransform_H))
			{
				entity.transform.height = field.value;
			}
		}
	};
	
	this.removeComponentFromSelectedEntity = function(i) {
		
		if(selectedEntity != -1)
		{
			var entity = editorScene.getEntityAt(selectedEntity);
			entity.removeComponent(i);
			
			this.drawEntityEditorWindow();
		}
	};
	
	this.addComponentToSelectedEntity = function(type) {
		
		if(selectedEntity != -1)
		{
			var entity = editorScene.getEntityAt(selectedEntity);
			
			switch(type)
			{
				case ExtendedComponentType.Component_Colour:
					new colourComponent(entity, "#FF0000");
					break;
				
				case ExtendedComponentType.Component_Image:
					new imageComponent(entity, resourceManager.loadResource("assets/default.jpeg", resource_type_image));
					break;
				
				case ExtendedComponentType.Component_Text:
					break;
				
				case ExtendedComponentType.Component_Button:
					break;
			}
			
			this.drawEntityEditorWindow();
		}
	};
}

//-----------------------------
// Main Functions
//-----------------------------
editor.prototype.start = function() {
	
	this.changeScene(new scene());
	this.interval = setInterval(update, 20);
};
	
editor.prototype.update = function() {

	this.getScene().update();	
	this.render();
};
	
editor.prototype.render = function() {
	
	globalCanvas.clear();
	this.getScene().render();
	
	if(this.getDirty())
	{
		this.getScene().editorDraw();
		this.reSelectSelectedEntity();
		this.drawEntityEditorWindow();
		this.setDirty(false);
	}
};

//-----------------------------
// Internal Funcs
//-----------------------------
function update() {
	
	if(editorObj != null)
	{
		editorObj.update();
	}
}

//-----------------------------
// External
//-----------------------------
function external_CreateEditor() {
	
	if(editorObj != null)
	{
		editorObj.shutdown();
	}
	
	editorObj = new editor();
	editorObj.start();
	
	globalCanvas = new canvasManager();
	globalCanvas.getCanvas("MainCanvas");
}

// html -> editor calls
function external_CreateEntity() {
	
	editorObj.createEntity();
	editorObj.setDirty(true);
	console.log("Create entity button!");
};
