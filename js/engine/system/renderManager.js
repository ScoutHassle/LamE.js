'use strict';

const RenderLayer = {
	"RenderLayer_Background": 0,
	"RenderLayer_BackMiddle": 1,
	"RenderLayer_Middleground": 2,
	"RenderLayer_MiddleFore": 3,
	"RenderLayer_Foreground": 4,
	"RenderLayer_Front": 5,
	"RenderLayer_Count": 6,};
Object.freeze(RenderLayer); 

class RenderManager {
	constructor() {
		this.renderUID = 0;

		this.buckets = []; /* 2D Array of RenderComponents */
		for(let i = 0; i < RenderLayer.RenderLayer_Count; i++) {
			this.buckets[i] = new Map();
		}
	}

	addRenderable(renderObj, layer) /* int */ {
		this.buckets[layer].set(this.renderUID, renderObj);
		return this.renderUID++;
	}

	removeRenderable(uid, layer) {
		this.buckets[layer].delete(uid);
	}

	swapLayer(renderObj, uid, oldLayer, newLayer) /* */ {
		this.removeRenderable(oldLayer, uid);
		this.buckets[newLayer].set(uid, renderObj);
	}

	render() {
		for(let i = 0; i < RenderLayer.RenderLayer_Count; i++) {
			this.buckets[i].forEach(function(value, key){
				value.render();
			});
		}
	}
}

const renderManager = new RenderManager();