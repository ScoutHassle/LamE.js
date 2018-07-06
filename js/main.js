// Globals
var globalCanvas = null;
var frameTime = 0.05;
var usingDebug = false;

var platform_mobile = 0;
var platform_web = 1;
var platform_pc = 2;
var platform = platform_web;

function startEngine()
{
	// Kick off the current scene
	sceneManager.start();
}

function updateEngine()
{
	// Dummy function to avoid issues
	sceneManager.update();
}
