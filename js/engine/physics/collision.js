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
		const pos = sphere.Parent.transform.PivotPositionV2;
		const radius = sphere.radius;
		// Are we inside of...
		if( (pos.x + radius) > box.minX && /* left-side */
			(pos.x - radius) < box.maxX && /* right-side */
			(pos.y + radius) > box.minY && /* top-side */
			(pos.y - radius) < box.maxY) { /* bottom-side*/
				sphere.hasCollided = box.hasCollided = true;
				return true;
		}

		return false;
    }
    
    // Sphere to Sphere - Update stuff later.
    static SphereToSphereResponse(collider1, collider2, rigid1, rigid2) /*  */ {

        if(rigid1 == null && rigid2 == null) {
            return
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
            return
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

    static BoxToSphereResponse(collider1, collider2, rigid1, rigid2) /* */ {
        Collision.SphereToBoxResponse(collider2, collider1, rigid2, rigid1);
    }

    static SphereToBoxResponse(collider1, collider2, rigid1, rigid2) /* */ {

        const spherePos = collider1.Parent.transform.PivotPositionV2;

        // For each "line" of the box do we intersect?
        // Top - Really only one we care about atm.
        let topOrigin = new vec2(collider2.minX, collider2.minY);
        let topExtent = new vec2(collider2.maxX, collider2.minY);

		if(Collision.SphereToLine(collider1, topOrigin, topExtent)) {
			// Coll top true!
			collider1.Parent.transform.y = collider2.minY - (collider1.radius * 2);
			if(rigid1 != null) {
				rigid1.Velocity = new vec2(rigid1.velocity.x, 0.0);
			}
		}

        // IvVector3 w = mCenter - line.GetOrigin();
        // float wsq = w.Dot(w);
        // float proj = w.Dot(line.GetDirection());
        // float rsq = mRadius*mRadius;
        // float vsq = line.GetDirection().Dot(line.GetDirection());
    
        // // test length of difference vs. radius
        // return ( vsq*wsq - proj*proj <= vsq*rsq );
	}
	
	static SphereToLine(sphereCollider, origin, extent) /* bool */ {

		const spherePos = sphereCollider.Parent.transform.PivotPositionV2;

		let w = new vec2(spherePos.x - origin.x, spherePos.y - origin.y);
        let wSquared = w.dot(w);
        let topDir = new vec2(extent.x - origin.x, extent.y - origin.y);
        let proj = w.dot(topDir);
        let radSq = sphereCollider.radius * sphereCollider.radius;
        let vSquared = topDir.dot(topDir);

        if(vSquared * wSquared - proj * proj <= vSquared * radSq) {
            return true;
		}
		
		return false
	}
}