const localProjectJSON ={
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
                "name": "Background_Layer",
                "x": 0.0,
                "y": 0.0,
                "w": 800.0,
                "h": 600.0,
                "components":
                [{
                    "type": "colour",
                    "data":
                    [{
                        "colour": "#555555"
                    }]
                }]
			},
			{
				"name": "AsteroidField",
				"x": 400.0,
				"y": 200.0,
				"w": 0.0,
				"h": 0.0,
				"components":[
					{
						"type": "script",
						"data": [
							{
								"parent": null,
								"scriptName": "AsteroidField"
							}
						]
					}
				]
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
			}]
        
        }]
	}
}