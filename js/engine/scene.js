"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("./Entity");
const ScriptComponent_1 = require("./component/base/ScriptComponent");
const ColourComponent_1 = require("./component/ColourComponent");
const ImageComponent_1 = require("./component/ImageComponent");
const TextComponent_1 = require("./component/TextComponent");
class Scene {
    constructor() {
        // ?
    }
    //--------------------------------
    // Scene Running
    //--------------------------------
    Start() {
    }
    Update() {
        this.UpdateEntityList();
    }
    Render() {
        this.RenderEntityList();
    }
    Shutdown() {
        this.ClearEntityList();
    }
    //--------------------------------
    // Entity Management
    //--------------------------------
    CreateEntity(name, x, y, w, h) {
        const e = new Entity_1.Entity(name, x, y, w, h);
        this.entityList.push(e);
        return e;
    }
    ClearEntityList() {
        for (let i = 0; i < this.entityList.length; i++) {
            this.entityList[i].Shutdown();
        }
        this.entityList.splice(0, this.entityList.length);
    }
    UpdateEntityList() {
        for (let i = 0; i < this.entityList.length; i++) {
            this.entityList[i].Update();
        }
    }
    RenderEntityList() {
        for (let i = 0; i < this.entityList.length; i++) {
            this.entityList[i].Render();
        }
    }
    // Utility Getters
    GetEntityCount() {
        return this.entityList.length;
    }
    GetEntityAt(i) {
        return this.entityList[i];
    }
    //--------------------------------
    // Scene Creation - TO DO
    //--------------------------------
    Load(json) {
        // TO DO - Load in from json
        // Running as a test example
        const entitys = json['Entitys'];
        for (let i = 0; i < entitys.length; i++) {
            // DONE - Pass entitys[i] into createEntity. Not my problem!
            this.CreateEntityFromJson(entitys[i]);
        }
    }
    ;
    CreateEntityFromJson(data) {
        const temp = this.CreateEntity(data.name, data.x, data.y, data.w, data.h);
        const components = data.components;
        for (let i = 0; i < components.length; i++) {
            switch (components[i].type) {
                case "image":
                    ImageComponent_1.ImageComponent.Load(temp, components[i]);
                    break;
                case "colour":
                    ColourComponent_1.ColourComponent.Load(temp, components[i]);
                    break;
                case "text":
                    TextComponent_1.TextComponent.Load(temp, components[i]);
                    break;
                case "script":
                    ScriptComponent_1.ScriptComponent.Load(temp, components[i]);
                    break;
            }
        }
    }
    ;
}
exports.Scene = Scene;
//# sourceMappingURL=Scene.js.map