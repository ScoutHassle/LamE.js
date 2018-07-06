var heirarchy = null;

scene.prototype.editorDraw = function() {
	
	var inner = "";
	for (var i = 0; i < this.getEntityCount(); i++)
	{
		var eStr = editorBuilder.createButton().addClass("entityButton").addId("Entity" + i).addOnClick("entityPressed\(" + i + "\)").
					closeTag().addInnerHtml("Entity " + i).closeButton().build();
			
		inner = inner + eStr + "<br>";
	}
	
	if(heirarchy === null)
	{
		heirarchy = document.getElementById("Heirarchy");
	}
	
	heirarchy.innerHTML = inner;
}

scene.prototype.editorPostDraw = function() {
	
	
}

function entityPressed(i)
{
	editorObj.setSelectedEntity(i);
	console.log("Pressed " + i);
}
