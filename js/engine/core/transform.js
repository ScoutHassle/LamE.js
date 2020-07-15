class Transform {
	
	constructor(iX, iY, iW, iH) {
		this.matrix = new matrix3(iX, iY);
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
		// TO DO: Parenting back in.
		// For now just use position.
		return new vec2(this.matrix.m[m3.X], this.matrix.m[m3.Y]);
	}

	get PivotPosition() /* Vector2 */ {
		const worldPos = this.Position;
		return new vec2(worldPos.x + (this.width*0.5), worldPos.y + (this.height*0.5));
	}

	get Rotation() /* float */ {
		// if(this.parent != null) {
		// 	return this.parent.transform.Rotation - this.rotation;
		// }
		return this.rotation;
	}

	// Locals
	get LocalPosition()  /* Vector2 */ {
		return new vec2(this.matrix.m[m3.X], this.matrix.m[m3.Y]);
	}

	get LocalPivotPosition() /* Vector2 */ {
		return new vec2(this.matrix.m[m3.X] + (this.width*0.5),this.matrix.m[m3.Y] + (this.height));
	}

	get LocalRotation() /* float */ {
		return this.rotation;
	}

	set LocalRotation(fAngle) /* */ {
		this.rotation = fAngle;
	}

	moveX(iX) /* */ {
		this.matrix.translateX(iX);
	}

	moveY(iY) /* */ {
		this.matrix.translateY(iY);
	}

	move(v2) /* */ {
		this.matrix.translate(v2.x, v2.y);
	}

	rotate(angle) /* */ {
		this.rotation += angle;
	}
}
