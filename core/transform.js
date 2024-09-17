class Transform {
	
	constructor(iX, iY, iW, iH) {
		this.x = iX;
		this.y = iY;
		this.width = iW;
		this.height = iH;
		this.rotation = 0.0;

		this.parent = null;
	}

	// Parenting
	Attach(entity) /* */ {

		// Recalculate our position based on the parent.
		if(this.parent != null) {
			this.Detach();
		}

		const pos = entity.transform.PivotPosition;
		this.x = this.x - pos.x;
		this.y = this.y - pos.y;

		this.parent = entity;
	}

	Detach() /* */ {
		if(this.parent == null) {
			return;
		}

		const pos = this.parent.transform.PivotPosition;
		this.x = this.x + pos.x;
		this.y = this.y + pos.y;

		this.parent = null;
	}

	// World (local + parent)
	get Position() /* js: {x, y} */ {
		// TO DO: Make this a matrix and stop bodging the maths. Post Halloween project, shouldn't be required yet.
		if(this.parent != null) {
			/* Position accounting for parents rotation */
			const s = Math.sin(this.parent.transform.Rotation * Math.PI/180);
			const c = Math.cos(this.parent.transform.Rotation * Math.PI/180);

			const local = this.LocalPivotPosition;
			const x = (local.x * c - local.y * s) - (this.width * 0.5);
			const y = local.x * s + local.y * c - (this.height * 0.5);
			
			const pos = this.parent.transform.PivotPosition;
			return {x: x + pos.x, y: y + pos.y};
		}
		return new vec2(this.x, this.y);
	}

	get PivotPosition() /* Vector2 */ {
		const worldPos = this.Position;
		return new vec2(worldPos.x + (this.width*0.5), worldPos.y + (this.height*0.5));
	}

	get Rotation() /* float */ {
		if(this.parent != null) {
			return this.parent.transform.Rotation - this.rotation;
		}
		return this.rotation;
	}

	// Locals
	get LocalPosition()  /* Vector2 */ {
		return new vec2(this.x, this.y);
	}

	get LocalPivotPosition() /* Vector2 */ {
		return new vec2(this.x + (this.width*0.5), this.y + (this.height));
	}

	get LocalRotation() /* float */ {
		return this.rotation;
	}

	set LocalRotation(fAngle) /* */ {
		this.rotation = fAngle;
	}

	moveX(iX) /* */ {
		this.x += iX;
	}

	moveY(iY) /* */ {
		this.y += iY;
	}

	move(v2) /* */ {
		this.x += v2.x;
		this.y += v2.y;
	}

	rotate(angle) /* */ {
		this.rotation += angle;
	}
}
