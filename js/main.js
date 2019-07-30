// Globals
let globalCanvas = null;
const frameTime = 0.05;
const usingDebug = false;
const isLocal = true;

const platform_mobile = 0;
const platform_web = 1;
const platform_pc = 2;
const platform = platform_web;

function startEngine()
{
	// Initialise the Scene Manager and all the 
	// other bits needed to run the engine.
	sceneManager.initialise();
	
	// Also kick off our project file load.
	// Callback will be to start the scene (and get the engine updating).
	// Having a few ideas about handling this all.
	
	// Strip the index.html
	var loc = window.location.href;
	loc = loc.slice(0, loc.indexOf("index.html"));	

	// Callback to start the SceneManager.
	if(!isLocal) {
	fetch('./assets/Project.json')
		.then(function(response){
			sceneManager.start(response.json);
		})
	} else {
		// Local project file is kind of the same but .js rather than json and stored in a variable to 
		// fire over to the sceneManager. This lets us get around loading from disk.
		const head = document.getElementsByTagName('head')[0];
		let script = document.createElement('script');
		script.type = 'text/javascript';
		script.onload = function() {

			// Do settings
			physics.loadSettings(settingsLocalJSON.Physics);

			// Then...
			// Load the scene
			const head = document.getElementsByTagName('head')[0];
			let script = document.createElement('script');
			script.type = 'text/javascript';
			script.onload = function() {

				// Cool, engine is up and running now.
				sceneManager.start(JSON.stringify(localProjectJSON));
			}
			script.src = './assets/ProjectLocal.js';
			head.appendChild(script);
		}
		script.src = './js/settingsLocal.js';
		head.appendChild(script);

		
	}
}

function updateEngine()
{
	// Dummy function to avoid issues
	sceneManager.update();
}
