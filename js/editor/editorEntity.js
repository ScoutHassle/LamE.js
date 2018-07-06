var entityEditor = null;

var editorTransform_X = "XFM_X";
var editorTransform_Y = "XFM_Y";
var editorTransform_W = "XFM_W";
var editorTransform_H = "XFM_H";

var dictionary = [];

entity.prototype.editorDraw = function()
{
	var inner = "";
	inner = inner + editorBuilder.createParagraph().addInnerHtml("Transform:").addBreak().
		addInnerHtml("X: ").addInputOpen().addId(editorTransform_X).addType("number").
		addValue(this.transform.x).addOnInput("entityValuesChanged()").addInnerHtml("/").closeTag().build();
		
	inner = inner +	editorBuilder.clear().addInnerHtml("Y: ").addInputOpen().addId(editorTransform_Y).addType("number").
		addValue(this.transform.y).addOnInput("entityValuesChanged()").addInnerHtml("/").closeTag().addBreak().build();
	
	inner = inner +	editorBuilder.clear().addInnerHtml("W: ").addInputOpen().addId(editorTransform_W).addType("number").
		addValue(this.transform.width).addOnInput("entityValuesChanged()").addInnerHtml("/").closeTag().build();
	
	inner = inner +	editorBuilder.clear().addInnerHtml("H: ").addInputOpen().addId(editorTransform_H).addType("number").
		addValue(this.transform.height).addOnInput("entityValuesChanged()").addInnerHtml("/").closeTag().addBreak().
		closeParagraph().build();
		
	//inner = inner + "</div></div>";
	
/*	if(!dictionary[editorTransform_X.n])
	{
		dictionary[editorTransform_X.n] = this.transform.x;
	}
	else
	{
		this.transform.x = dictionary[editorTransform_X.n];
	}*/
	
	// [begin] container
	inner = inner + "<div class=\"container\">";
	
	// Components
	for(var i = 0; i < this.components.length; i++)
	{
		inner = inner + editorBuilder.createDivWithClass("row").addDivWithClass("col-sm-9").build();
		inner = inner + this.components[i].editorDraw();
		inner = inner + editorBuilder.clear().closeDiv().addDivWithClass("col-1 justify-content-center").build();
		
		// Remove Button
		inner = inner + editorBuilder.createButton().addType("button").addClass("btn btn-danger").addOnClick("entityRemoveComponent(" + i + ")").closeTag().addInnerHtml("X").closeButton().build();		
		inner = inner + editorBuilder.clear().closeDiv().closeDiv().build();
	}
	
	// TO DO: Seperate out this list for add component into some kind of json call then I can just update
	// that json doc and this will carry on working. For now I just want to see it working.
	inner = inner + editorBuilder.createDivWithClass("row").addDivWithClass("col-sm-9").build() + getEntityAddComponentButton() + editorBuilder.clear().closeDiv().closeDiv().build();
	
	// [end] container
	inner = inner + editorBuilder.clear().closeDiv().build();
	

	
	if(entityEditor === null)
	{
		entityEditor = document.getElementById("Entity-Editor");
	}
	
	entityEditor.innerHTML = inner;
}

entity.prototype.editorPostDraw = function() {
	
	// Components
	for(var i = 0; i < this.components.length; i++)
	{
		if(this.components[i].editorPostDraw)
		{
			this.components[i].editorPostDraw();
		}
	}
}

function entityValuesChanged()
{
	// Trigger the selected entity to update its values from the editor window
	editorObj.selectedEntityUpdateValues();
	console.log("Value changed!");
}

function entityRemoveComponent(i) {
	
	editorObj.removeComponentFromSelectedEntity(i);
	console.log("Removing component from entity");
}

function getEntityAddComponentButton() {
	
	var string = editorBuilder.createDivWithClass("dropdown").build();
	string = string + editorBuilder.createButton().addClass("btn btn-primary dropdown-toggle").addType("button").addId("dropdownMenuAddComponent").
		addInnerHtml("data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"").closeTag().addInnerHtml("Add Component").closeButton().build();
	
	// Menu
	string = string + editorBuilder.createDiv().addClass("dropdown-menu").addInnerHtml("aria-labelledby=\"dropdownMenuAddComponent\"").closeTag().build();
	
	// Render Components
	string = string + editorBuilder.clear().addInnerHtml("<h6 class=\"dropdown-header\">Render Components</h6>").build();
	string = string + getEntityAddComponentButtonForComponent("Colour", ExtendedComponentType.Component_Colour);		
	string = string + getEntityAddComponentButtonForComponent("Image", ExtendedComponentType.Component_Image);

	
	string = string + editorBuilder.clear().closeDiv().closeDiv().build();
	return string;
}

function getEntityAddComponentButtonForComponent(name, type) {
	
	return editorBuilder.createButton().addClass("dropdown-item").addType("button").
		addOnClick("entityEditorAddComponent(" + type + ")").closeTag().
		addInnerHtml(name).closeButton().build();
}

function entityEditorAddComponent(type) {
	
	editorObj.addComponentToSelectedEntity(type);
	console.log("Adding new component to entity");
}

function trusomething(x, v)
{
	dictionary[x] = v;
	console.log(x + " " + v);
	console.log("I tried!");
}
