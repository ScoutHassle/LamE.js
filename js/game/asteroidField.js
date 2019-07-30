'use strict';

class AsteroidField extends ScriptComponent {

	constructor() {
		
		super("AsteroidField");

		this.asteroids = [];
		this.maxAsteroids = 50;
		this.fieldRadius = 200;
		this.asteroidRadius = 10;
		this.asteroidMass = 200.0;
	}

	createAsteroidField() {

		const pos = new vec2(400, 200);
		for(let i = 0; i < this.maxAsteroids; i++) {

			const iX = pos.x + (this.fieldRadius - Math.floor(Math.random() * Math.floor(this.fieldRadius * 2)));
			const iY = pos.y + (this.fieldRadius - Math.floor(Math.random() * Math.floor(this.fieldRadius * 2)));
			this.asteroids.push(new Asteroid(iX, iY, this.asteroidRadius, this.asteroidMass));
		}
	}
	
	setScriptData(json) {

		// Just create our field when it tries to load us.
		this.createAsteroidField();
	}
	
	update() {

	}
	
	save() {
		
		return this.constructor;
	}

}

scriptDatabase["AsteroidField"] = function() { return new AsteroidField(); };