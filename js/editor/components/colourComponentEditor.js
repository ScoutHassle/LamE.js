colourComponent.prototype.editorDraw = function() {

	var string = "<p>Colour Component:<br>";
	string = string + "<input type=\"color\" value=\"" + this.getResource() + "\" oninput=\"updateColourComponentValue(this.value)\" >";
	string = string + "</p>";
	return string;
}

function updateColourComponentValue(value)
{
	var entity = editorObj.getScene().getEntityAt(editorObj.getSelectedEntity());
	var idx = entity.getComponentIndexOfBaseType(ComponentType.Component_Renderable);
	if(idx != -1)
	{
		entity.getComponentAt(idx).setResource(value);
	}
	
	// Request redraw
	editorObj.setDirty(true);
}