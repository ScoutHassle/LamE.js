import { SceneManager } from "./managers/SceneManager";


function loadProjectJson(path, callback)
{
	// TO DO:
	// XMLHttpRequest is going to require Firefox usage for now.
	// I want to get things running before I swap this to a more
	// Chrome friendly call. Yes this is not a great choice which
	// is why I'm leaving this comment for future me.
	let file = new XMLHttpRequest();
	file.overrideMimeType("application/json");
	file.open("GET", path, true);
	file.onreadystatechange = function() {
		if(file.readyState === 4 && file.status == 200) {
			callback(file.responseText);
		}
	}
	
	file.send(null);
}

export function startEngine()
{
	// Initialise the Scene Manager and all the 
	// other bits needed to run the engine.
	SceneManager.Instance.Initialise();
	
	// Also kick off our project file load.
	// Callback will be to start the scene (and get the engine updating).
	// Having a few ideas about handling this all.
	
	// Strip the index.html
	let loc = window.location.href;
	loc = loc.slice(0, loc.indexOf("index.html"));
	
	// Callback to start the SceneManager.
	loadProjectJson(loc + "assets/Project.json", function(text) {
		SceneManager.Instance.Start(text);
	});
}

export function updateEngine() {
	// Dummy function to avoid issues
	SceneManager.Instance.Update();
}

window.onload = startEngine;