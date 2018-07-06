var editorBuilder = new htmlFactory();

function htmlFactory()
{
	this.string = "";
}

htmlFactory.prototype.build = function()
{
	return this.string;
}

htmlFactory.prototype.clear = function()
{
	this.string = "";
	return this;
}

//------------------------------------
// <button>
//------------------------------------
htmlFactory.prototype.createButton = function() {
	
	this.string = "<button ";
	return this;
}

htmlFactory.prototype.closeButton = function() {
	
	this.string = this.string + "</button>";
	return this;
}

//------------------------------------
// <input>
//------------------------------------
htmlFactory.prototype.createInput = function() {
	
	this.string = "<input ";
	return this;
}

htmlFactory.prototype.addInputClosed = function() {
	
	this.string = this.string + "<input>";
	return this;
}

htmlFactory.prototype.addInputOpen = function() {
	
	this.string = this.string + "<input ";
	return this;
}

htmlFactory.prototype.addInputWithInner = function(inner) {
	
	this.string = this.string + "<input" + inner + ">";
	return this;
}

htmlFactory.prototype.closeInput = function() {
	
	this.string = this.string + "</input>";
	return this;
}

//------------------------------------
// <p>
//------------------------------------
htmlFactory.prototype.createParagraph = function() {
	
	this.string = "<p>";
	return this;
}

htmlFactory.prototype.closeParagraph = function() {
	
	this.string = this.string + "</p>";
	return this;
}

//------------------------------------
// <div>
//------------------------------------
htmlFactory.prototype.createDiv = function() {
	
	this.string = "<div ";
	return this;
}

htmlFactory.prototype.createDivWithClass = function(name) {
	
	this.string = "<div class=\"" + name + "\">";
	return this;
}

htmlFactory.prototype.addDiv = function() {
	
	this.string = this.string + "<div ";
	return this;
}

htmlFactory.prototype.addDivWithClass = function(name) {
	
	this.string = this.string + "<div class=\"" + name + "\">";
	return this;
}

htmlFactory.prototype.closeDiv = function() {
	
	this.string = this.string + "</div>";
	return this;
}

//------------------------------------
// Generic
//------------------------------------
htmlFactory.prototype.createTag = function() {
	this.string = "<";
	return this;
}

htmlFactory.prototype.closeTag = function() {
	
	this.string = this.string + ">";
	return this;
}

htmlFactory.prototype.closeTagSlash = function() {
	
	this.string = this.string + "/>";
	return this;
}

// Class
htmlFactory.prototype.addClass = function(c) {
	
	this.string = this.string + "class=\"" + c + "\" ";
	return this;
}

// Id
htmlFactory.prototype.addId = function(id) {
	
	this.string = this.string + "id=\"" + id + "\" ";
	return this;
}

// onclick
htmlFactory.prototype.addOnClick = function(func) {
	
	// TO DO - try run this with params somehow...
	this.string = this.string + "onclick=\"" + func + "\" ";
	return this;
}

// innerHtml
htmlFactory.prototype.addInnerHtml = function(inner) {
	
	// Just adding some text really.
	this.string = this.string + inner;
	return this;
}

// type
htmlFactory.prototype.addType = function(type) {
	
	this.string = this.string + "type=\"" + type + "\" ";
	return this;
}

// value
htmlFactory.prototype.addValue = function(value) {
	
	this.string = this.string + "value=\"" + value + "\" ";
	return this;
}

// oninput
htmlFactory.prototype.addOnInput = function(func) {
	
	this.string = this.string + "oninput=\"" + func + "\" " ;
	return this;
}

// onchange
htmlFactory.prototype.addOnChange = function(func) {
	
	this.string = this.string + "onchange=\"" + func + "\" ";
	return this;
}

// name
htmlFactory.prototype.addName = function(name) {
	
	this.string = this.string + "name=\"" + name + "\" ";
	return this;
}

// Break
htmlFactory.prototype.addBreak = function() {
	this.string = this.string + "<br>";
	return this;
}
