'use strict';

const AnimationDirection = {
	"AnimationDirection_Left": -1,
	"AnimationDirection_Right": 1,};
Object.freeze(AnimationDirection);

class SpriteAnimatorComponent extends RenderComponent {
	constructor(entity) {
		super(entity, null);

		this.animations = new Map(); /* Map: SpriteAnimation */
		this.active = false;

		this.defaultAnimation = "";
		this.currentAnimation = null; /* SpriteAnimation */
		this.currentFrame = 0;
		this.currentDirection = AnimationDirection.AnimationDirection_Left;
		this.timer = 0.0;
	}

	static load(temp, json) /* SpriteAnimatorComponent */ {
		return null;
	}

	createAnimation(name, direction, loop, animFolder, animFrames, speed) {
		this.animations.set(name, new SpriteAnimation(name, direction, loop, animFolder, animFrames, speed));
	}

	playAnimation(name, direction) {
		if(this.active) {
			if(name == this.currentAnimation.name && direction == this.currentDirection) {
				return;
			}
		}

		let animation = this.animations.get(name);
		if(animation == undefined) {
			return
		}

		this.currentAnimation = animation;
		this.currentDirection = direction;
		this.currentFrame = 0;
		this.active = true;
	}

	getActiveAnimationName() /* string */ {
		if(this.active)	{
			return this.currentAnimation.name;
		}
		
		return "";
	}
	
	stopAnimation() /* */ {
		this.active = false;
	}

	update() /* */ {
		if(this.active)
		{
			this.timer += frameTime;
			if(this.timer >= this.currentAnimation.speed) {
				// Ready for the next frame.
				if(++this.currentFrame >= this.currentAnimation.FrameCount) {
					// If we're looping, back to 0 else drop it to count - 1.
					if(this.currentAnimation.loop) {
						this.currentFrame = 0;
					}
					else {
						if(defaultAnimation != "") {
							this.playAnimation(this.defaultAnimation, this.currentDirection);
						} else {
							this.currentFrame = this.currentAnimation.GetFrameCount() - 1;
							this.active = false; // Stop the animator running.
						}
					}
				}
				
				// Reset the timer
				this.timer = 0.0;
			}
		}
	}

	shutdown() /* */ {
		// Kill animation objects
	}

	render() /* */ {
		if(this.active)	{
			this.currentAnimation.render(this.parent.transform, this.currentFrame, this.currentDirection);
		}
	}
}

class SpriteAnimation {
	constructor(name, direction, loop, folder, frameList, speed) {
		this.name = name; /* string */
		this.direction = direction; /* AnimationDirection */
		this.loop = loop; /* bool */
		this.speed = speed; /* float */
		this.frames = []; /* Resource: Image */

		this.loadAnimation(folder, frameList);
	}

	loadAnimation(folder, frameList /* []string */) /* */ {

		for(let i = 0; i < frameList.length; i++) {
	 		this.frames.push(resourceManager.loadResource(folder + frameList[i], resource_type_image));
	 	}
	}

	set LoopState(state) /* */ {
		this.loop = state;
	}

	get FrameCount() /* int */ {
		return this.frames.length;
	}

	render(transform, idx, direction) /* */ {
		var ctx = globalCanvas.context;
		const centre =  transform.PivotPosition;

		ctx.setTransform(direction, 0, 0, 1, centre.x, centre.y);
		

		// let offset = 0;
		let multiplier = 0.5;
		 if(direction == AnimationDirection.AnimationDirection_Left) {
		// 	offset = -transform.width * 0.5; // If we flip we need to shift it back into position.
			multiplier = 0;
			ctx.rotate(-transform.Rotation  * Math.PI / 180);
		 } else {
			ctx.rotate(transform.Rotation  * Math.PI / 180);
		 }

		ctx.drawImage(this.frames[idx] ,Math.floor(-transform.width *multiplier), Math.floor(-transform.height * 0.5), transform.width, transform.height);
		//ctx.drawImage(this.frames[idx], offset, 0, transform.width, transform.height);
	}
}
