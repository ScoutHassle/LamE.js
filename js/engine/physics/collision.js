'use strict';

class Collision {

    // Collision Tests
	static SphereToSphere(s1, s2) /* bool */ {
		// (C1 - C2)dot(C1 - C2) <= (r1 + r2)squared

		// Get S1/S2 Pos at Pivot.
		const distance = vec2.Subtract(s2.Parent.transform.PivotPositionV2, s1.Parent.transform.PivotPositionV2);
		const distSquared = distance.dot(distance);  
		const radiusSum = s1.radius + s2.radius;
		if(distSquared <= (radiusSum * radiusSum)) {
            s1.hasCollided = s2.hasCollided = true;
			return true;
		}
		return false;
	}

	static SphereToBox(sphere, box) /* bool */ {
		const pos = sphere.Parent.transform.Position;
		const radius = sphere.radius;
		// Are we inside of...
		if( (pos.x + radius) > box.MinX && /* left-side */
			(pos.x - radius) < box.MaxX && /* right-side */
			(pos.y + radius) > box.MinY && /* top-side */
			(pos.y - radius) < box.MaxY) { /* bottom-side*/
				sphere.hasCollided = box.hasCollided = true;
				return true;
		}

		return false;
    }
    
    // Sphere to Sphere - Update stuff later.
    static SphereToSphereResponse(collider1, collider2, rigid1, rigid2) /*  Vector2 */ {

        if(rigid1 == null && rigid2 == null) {
            return new vec2(0.0, 0.0);
        }

        let responseShare = 0.5;
        if(rigid1 == null || rigid2 == null) {
            responseShare = 1.0;
        }

        const collisionNormal = vec2.Subtract(collider2.Parent.transform.PivotPositionV2, collider1.Parent.transform.PivotPositionV2);
        const penetration = (collider1.radius + collider2.radius) - collisionNormal.magnitude();
        collisionNormal.normalize();

        let mass1 = 1.0;
        let mass2 = 1.0; 
        if(rigid1 != null) {
            let translate = new vec2(-collisionNormal.x * penetration, -collisionNormal.y * penetration);
            translate.fmultiply(responseShare);
            collider1.Parent.transform.move(translate);

            // Slight optimisation for vDotN >= 0
            mass1 = rigid1.Mass;
        }

        if(rigid2 != null) {
            let translate =  new vec2(collisionNormal.x * penetration, collisionNormal.y * penetration);
            translate.fmultiply(responseShare);
            collider2.Parent.transform.move(translate)

            // Slight optimisation for vDotN >= 0
            mass2 = rigid2.Mass;
        }

        const relativeVector = new vec2(-rigid2.velocity.x, -rigid2.velocity.y);
        const vDotN = collisionNormal.dot(relativeVector);
        if(vDotN < 0) {
            return new vec2(0.0, 0.0);
        }

        const numerator = -(1.0)*vDotN;
        let denominator = collisionNormal.dot(collisionNormal);
        denominator = denominator * (1.0/mass1 + 1.0/mass2);
        const j = numerator/denominator;

        collisionNormal.fmultiply(j/1.0);
        if(rigid1 != null) {
            rigid1.velocity.add(collisionNormal);
        }

        if(rigid2 != null) {
            const minusCollisionNormal = new vec2(-collisionNormal.x, -collisionNormal.y);
            rigid2.velocity.add(minusCollisionNormal);
        }
    }
}