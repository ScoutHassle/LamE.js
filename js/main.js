// Globals
var globalCanvas = null;
var frameTime = 0.05;
var usingDebug = false;

var platform_mobile = 0;
var platform_web = 1;
var platform_pc = 2;
var platform = platform_web;

function loadProjectJson(path, callback)
{
	// TO DO:
	// XMLHttpRequest is going to require Firefox usage for now.
	// I want to get things running before I swap this to a more
	// Chrome friendly call. Yes this is not a great choice which
	// is why I'm leaving this comment for future me.
	var file = new XMLHttpRequest();
	file.overrideMimeType("application/json");
	file.open("GET", path, true);
	file.onreadystatechange = function() {
		if(file.readyState === 4 && file.status == "200") {
			callback(file.responseText);
		}
	}
	
	file.send(null);
}

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
	
	// TO DO: Fix file loading. Hacky way has gone in latest Firefox.

	// Callback to start the SceneManager.
	//loadProjectJson(loc + "assets/Project.json", function(text) {
		sceneManager.start(jsonData);
	//});
}

function updateEngine()
{
	// Dummy function to avoid issues
	sceneManager.update();
}


var jsonData = `{
	"Project": {
		"Scenes": [{
			"Name": "Splash",
			"Entitys": 
			[{
				"name": "e1",
				"x": 0.0,
				"y": 0.0,
				"w": 800.0,
				"h": 600.0,
				"components": 
				[{
					"type": "image",
					"data": 
					[{
						"file": "assets/images/splash.png" 
					}]
				},
				{
					"type": "text",
					"data":
					[{
						"text": "Hello World!",
						"resource": {
							"font": "70px Verdana",
							"colour": "#ffffff",
							"alignment": "left"
						}
					}]
				},
                {
                    "type": "script",
                    "data":
                    [{
                        "type": 4,
                        "parent": null,
                        "scriptName":"SkipSplash",
                        "skipKey": 32
                    }]
                }]
			}]			
		},
        {
            "Name": "Main",
            "Entitys":
            [{
                "name": "e1",
                "x": 0.0,
                "y": 0.0,
                "w": 800.0,
                "h": 600.0,
                "components":
                [{
                    "type": "image",
                    "data":
                    [{
                        "file": "assets/images/main_image.png"
                    }]
                }]
			},
			{
				"name": "player",
				"x": 0.0,
				"y": 0.0,
				"w": 0.0,
				"h": 0.0,
				"components":[
					{
						"type": "script",
						"data": [
							{
								"parent": null,
								"scriptName": "Player"
							}
						]
					}
				]
			},
			{
				"name": "obstacle",
				"x": 375.0,
				"y": 375.0,
				"w": 50.0,
				"h": 50.0,
				"components":[
					{
						"type": "script",
						"data": [
							{
								"parent": null,
								"scriptName": "Obstacle"
							}
						]
					}
				]
			}]
        
        }]
	}
}`