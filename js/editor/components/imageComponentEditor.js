imageComponent.prototype.editorDraw = function() {

	var string = "";
	string = editorBuilder.createParagraph().addInnerHtml("Image Component:").addBreak().build();
	
	var absoluteSrc = this.getResource().src;
	var localIdx = absoluteSrc.indexOf("/assets/");
	var localSrc = absoluteSrc.substring(localIdx, absoluteSrc.length);
	
	string = string + editorBuilder.clear().addInnerHtml("Path: ").addInnerHtml(localSrc).closeParagraph().build();
	
	// Bootstrap
	string = string + "<div class=\"input-group mb-2\">";
		//string = string + "<div class=\"input-group-prepend\">";
		//	string = string + "<span class=\"input-group-text\">Upload</span>";
		//string = string + "</div>";
		string = string + "<div class=\"custom-file\">";
	
	string = string + editorBuilder.clear().createInput().addType("file").addId("files").addName("files[]").addOnChange("onImageChange").closeTagSlash().build();
	
	    string = string + "<label class=\"custom-file-label\" for=\"files\">Choose file</label>";
		string = string + "</div>";
	string = string + "</div>";
	
	return string;
}

imageComponent.prototype.editorPostDraw = function() {
	
	document.getElementById('files').addEventListener('change', onImageChange, false);
}

function onImageChange(evt) {
	
	var files = evt.target.files;
	
	// Request current selected entity
	// Find the index of the render component (aka this)
	
	console.log("new iamge name: " + files[0].name);
	
	var entity = editorObj.getScene().getEntityAt(editorObj.getSelectedEntity());
	var idx = entity.getComponentIndexOfBaseType(ComponentType.Component_Renderable);
	if(idx != -1)
	{
		var imgComp = entity.getComponentAt(idx);	
		imgComp.setResource(resourceManager.loadResource("assets/" + files[0].name, resource_type_image));
	}
	
	// Request redraw
	editorObj.setDirty(true);
}

function updateImageComponentValue(entity, index, value) {
	
	editorObj.getScene().getEntityAt(entity).getComponentAt(index).getResource().src = value;
}