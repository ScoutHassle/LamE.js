(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Transform_1 = require("./Transform");
class Entity {
    constructor(name, x, y, w, h) {
        this.name = name;
        this.transform = new Transform_1.Transform(x, y, w, h);
    }
    AddComponent(component) {
        if (component != null) {
            this.components.push(component);
        }
    }
    // Needs work... Component UID?
    RemoveComponent(index) {
        this.components.splice(index, 1);
    }
    Update() {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].Update();
        }
    }
    Render() {
        for (let i = 0; i < this.components.length; i++) {
            if (this.components[i].Render) {
                this.components[i].Render();
            }
        }
    }
    Shutdown() {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].shutdown();
        }
        this.transform = null;
        this.components.splice(0, this.components.length);
    }
    GetComponentAt(i) {
        return this.components[i];
    }
    GetComponentIndexOfBaseType(type) {
        for (let i = 0; i < this.components.length; i++) {
            if (this.components[i].type === type) {
                return i;
            }
        }
        return -1;
    }
}
exports.Entity = Entity;

},{"./Transform":5}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frameTime = 0.5;
exports.platform = Platform.platform_web;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SceneManager_1 = require("./managers/SceneManager");
function loadProjectJson(path, callback) {
    // TO DO:
    // XMLHttpRequest is going to require Firefox usage for now.
    // I want to get things running before I swap this to a more
    // Chrome friendly call. Yes this is not a great choice which
    // is why I'm leaving this comment for future me.
    let file = new XMLHttpRequest();
    file.overrideMimeType("application/json");
    file.open("GET", path, true);
    file.onreadystatechange = function () {
        if (file.readyState === 4 && file.status == 200) {
            callback(file.responseText);
        }
    };
    file.send(null);
}
function startEngine() {
    // Initialise the Scene Manager and all the 
    // other bits needed to run the engine.
    SceneManager_1.SceneManager.Instance.Initialise();
    // Also kick off our project file load.
    // Callback will be to start the scene (and get the engine updating).
    // Having a few ideas about handling this all.
    // Strip the index.html
    let loc = window.location.href;
    loc = loc.slice(0, loc.indexOf("index.html"));
    // Callback to start the SceneManager.
    loadProjectJson(loc + "assets/Project.json", function (text) {
        SceneManager_1.SceneManager.Instance.Start(text);
    });
}
function updateEngine() {
    // Dummy function to avoid issues
    SceneManager_1.SceneManager.Instance.Update();
}
exports.updateEngine = updateEngine;

},{"./managers/SceneManager":17}],4:[function(require,module,exports){
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

},{"./Entity":1,"./component/ColourComponent":6,"./component/ImageComponent":7,"./component/TextComponent":8,"./component/base/ScriptComponent":11}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_1 = require("./utility/Vector2");
class Transform {
    constructor(x, y, w, h) {
        this.position = new Vector2_1.Vector2(x, y);
        this.size = new Vector2_1.Vector2(w, h);
    }
    Position() {
        return this.position;
    }
    Size() {
        return this.size;
    }
    SetPosition(v) {
        this.position.Set(v);
    }
    MoveX(x) {
        this.position.x += x;
    }
    MoveY(y) {
        this.position.y += y;
    }
    Move(v) {
        this.position.x += v.x;
        this.position.y += v.y;
    }
    Rotate(angle) {
    }
}
exports.Transform = Transform;

},{"./utility/Vector2":18}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RenderComponent_1 = require("./base/RenderComponent");
const CanvasManager_1 = require("../managers/CanvasManager");
class ColourComponent extends RenderComponent_1.RenderComponent {
    constructor(parent, colour) {
        super(parent, colour);
    }
    static Load(temp, json) {
        const colour = json.data[0].colour;
        return new ColourComponent(temp, colour);
    }
    Render() {
        if (this.visible) {
            // TO DO - Port GlobalCanvas for context etc.
            let ctx = CanvasManager_1.CanvasManager.Instance.GetContext();
            ctx.fillStyle = this.Resource();
            const transform = this.Parent().transform;
            const pos = transform.Position();
            const size = transform.Size();
            ctx.fillRect(pos.x, pos.y, size.x, size.y);
        }
    }
}
exports.ColourComponent = ColourComponent;

},{"../managers/CanvasManager":12,"./base/RenderComponent":10}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RenderComponent_1 = require("./base/RenderComponent");
const CanvasManager_1 = require("../managers/CanvasManager");
const ResourceManager_1 = require("../managers/ResourceManager");
class ImageComponent extends RenderComponent_1.RenderComponent {
    constructor(parent, r) {
        super(parent, r);
    }
    static Load(temp, json) {
        const path = json.data[0].file;
        const imgComp = new ImageComponent(temp, ResourceManager_1.ResourceManager.Instance.LoadResource(path, ResourceType.Image));
        return imgComp;
    }
    render() {
        if (this.IsVisible) {
            const ctx = CanvasManager_1.CanvasManager.Instance.GetContext();
            const transform = this.parent.transform;
            const pos = transform.Position();
            const size = transform.Size();
            ctx.drawImage(this.Resource(), pos.x, pos.y, size.x, size.y);
        }
    }
}
exports.ImageComponent = ImageComponent;

},{"../managers/CanvasManager":12,"../managers/ResourceManager":16,"./base/RenderComponent":10}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RenderComponent_1 = require("./base/RenderComponent");
const CanvasManager_1 = require("../managers/CanvasManager");
class TextComponent extends RenderComponent_1.RenderComponent {
    constructor(parent, txtRes, text) {
        super(parent, txtRes);
        this.text = text;
    }
    //-----------------------------------
    // Load from Json
    // Format:
    //	"data": 
    //	[{
    //		"text": "Hello World",
    //		"resource": {
    //			"font": "family",
    //			"color": "#ffffff",
    //			"alignment": "left"
    //		}
    //	}]
    //-----------------------------------
    static Load(temp, json) {
        const str = json.data[0].text;
        const textRes = new TextResource(json.data[0].resource.font, json.data[0].resource.colour, json.data[0].resource.alignment);
        return new TextComponent(temp, textRes, str);
    }
    render() {
        if (this.IsVisible) {
            let ctx = CanvasManager_1.CanvasManager.Instance.GetContext();
            ctx.save();
            // Grab our textResource object
            const resource = this.Resource();
            ctx.font = resource.font;
            ctx.fillStyle = resource.colour;
            ctx.textAlign = resource.alignment;
            // Cache transform and draw
            const transform = this.parent.transform;
            const pos = transform.Position();
            ctx.fillText(this.text, pos.x, pos.y);
            // Restore ctx to its old state
            ctx.restore();
        }
    }
}
exports.TextComponent = TextComponent;
class TextResource {
    constructor(font, colour, alignment) {
        this.font = font;
        this.colour = colour;
        this.alignment = alignment;
    }
}
exports.TextResource = TextResource;

},{"../managers/CanvasManager":12,"./base/RenderComponent":10}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Component {
    constructor(type, parent) {
        this.type = type;
        this.parent = parent;
    }
    Parent() {
        return this.parent;
    }
    Update() {
    }
    Shutdown() {
    }
    Save() {
        return JSON.stringify(Flatten(this));
    }
}
exports.Component = Component;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
class RenderComponent extends Component_1.Component {
    constructor(parent, resource) {
        super(ComponentType.Component_Renderable, parent);
        this.resource = resource;
        this.visible = true;
    }
    Resource() {
        return this.resource;
    }
    SetResource(resource) {
        this.resource = resource;
    }
    IsVisible() {
        return this.visible;
    }
    SetVisible(state) {
        this.visible = state;
    }
    Update() {
    }
    Shutdown() {
        super.Shutdown();
        this.resource = null;
    }
    Render() {
    }
}
exports.RenderComponent = RenderComponent;

},{"./Component":9}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
class ScriptComponent extends Component_1.Component {
    constructor(name) {
        super(ComponentType.Component_Script, null);
        this.scriptName = name;
    }
    //-----------------------------------
    // Load from Json
    // Format:
    //	"data": 
    //	[{
    //		{
    //          scriptName: "",
    //          objectJson...
    //      }
    //	}]
    //-----------------------------------
    static Load(temp, json) {
        let scriptObj = ScriptBuilder(json.data[0]);
        if (scriptObj != null) {
            scriptObj.parent = temp;
            temp.AddComponent(scriptObj);
        }
        return scriptObj;
    }
    SetScriptData(json) {
    }
    Shutdown() {
        super.Shutdown();
    }
}
exports.ScriptComponent = ScriptComponent;

},{"./Component":9}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CanvasManager {
    static get Instance() {
        return this.instance || (this.instance = new this());
    }
    constructor() {
        this.canvas = null;
        this.context = null;
    }
    CreateCanvas(w, h) {
        let c = document.createElement("canvas");
        c.id = "MainCanvas";
        c.width = w;
        c.height = h;
        document.body.insertBefore(c, document.body.childNodes[0]);
        this.canvas = c;
        this.context = c.getContext("2d");
        return c;
    }
    GetCanvas() {
        return this.canvas;
    }
    GetContext() {
        return this.context;
    }
    Clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
exports.CanvasManager = CanvasManager;

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CanvasManager_1 = require("./CanvasManager");
class TouchData {
    constructor(id, x, y) {
        this.identifier = id;
        this.pageX = x;
        this.pageY = y;
    }
}
class InputManager {
    static get Instance() {
        return this.instance || (this.instance = new this());
    }
    constructor() {
    }
    //-----------------------------
    Start() {
        /*if(platform === platform_mobile)
        {
            // Add touch controls!
            sceneManager.canvas.addEventListener('touchstart', this.onTouchStart, false);
            sceneManager.canvas.addEventListener('touchmove', this.onTouchMove, false);
            sceneManager.canvas.addEventListener('touchend', this.onTouchEnd, false);
            sceneManager.canvas.addEventListener('touchcancel', this.onTouchCancel, false);
        }*/
        //if(platform === platform_web || platform === platform_pc)
        //{
        // Mouse controls
        const canvas = CanvasManager_1.CanvasManager.Instance.GetCanvas();
        canvas.addEventListener('mousedown', this.OnMouseDown, false);
        canvas.addEventListener('mousemove', this.OnMouseMove, false);
        canvas.addEventListener('mouseup', this.OnMouseUp, false);
        // Keys
        document.addEventListener('keydown', this.OnKeyDown, false);
        document.addEventListener('keyup', this.OnKeyUp, false);
        //}
    }
    Update() {
        // TO DO - If we're going to do PC keys
        // that can be handled here and passed over
        // to the currentScene etc.
    }
    //-----------------------------
    // Component Management
    //-----------------------------
    AddInputComponent(obj) {
        this.inputComponentList.push(obj);
    }
    RemoveInputComponent(obj) {
        // Does this work in js?
        for (let i = 0; i < this.inputComponentList.length; i++) {
            if (this.inputComponentList[i] == obj) {
                this.inputComponentList.splice(i, 1);
                return;
            }
        }
    }
    //-----------------------------
    // Event Handlers
    //-----------------------------
    OnTouchStart(e) {
        // To fix an android based issue.
        e.preventDefault();
        const touches = e.changedTouches;
        for (let t = 0; t < touches.length; t++) {
            for (let i = 0; i < this.inputComponentList.length; i++) {
                if (this.inputComponentList[i].OnTouchStart(touches[t])) {
                    // Consumed.
                    break;
                }
            }
        }
    }
    OnTouchMove(e) {
        // To fix an android based issue.
        e.preventDefault();
        const touches = e.changedTouches;
        for (let t = 0; t < touches.length; t++) {
            for (let i = 0; i < this.inputComponentList.length; i++) {
                if (this.inputComponentList[i].OnTouchMove(touches[t])) {
                    // Consumed.
                    break;
                }
            }
        }
    }
    OnTouchCancel(e) {
        e.preventDefault();
    }
    OnTouchEnd(e) {
        // Yep, android.
        e.preventDefault();
        const touches = e.changedTouches;
        for (let t = 0; t < touches.length; t++) {
            for (let i = 0; i < this.inputComponentList.length; i++) {
                if (this.inputComponentList[i].OnTouchEnd(touches[t])) {
                    // Consumed.
                    break;
                }
            }
        }
    }
    //--------------------
    // Touch Utility
    //--------------------
    CopyTouchfunction(touch) {
        return new TouchData(touch.identifier, touch.pageX, touch.pageY);
    }
    GetTouchIdxById(inId) {
        for (let i = 0; i < this.handledTouches.length; i++) {
            const id = this.handledTouches[i].identifier;
            if (id == inId) {
                return i;
            }
        }
        return -1; // not found
    }
    // TO DO - Sort all the touch stuff for mice etc.
    // Just get it working since its 11pm again.
    BadTouch(id, x, y) {
        let t = {
            altitudeAngle: 0,
            azimuthAngle: 0,
            clientX: 0,
            clientY: 0,
            force: 0,
            identifier: id,
            pageX: x,
            pageY: y,
            radiusX: 0,
            radiusY: 0,
            rotationAngle: 0,
            screenX: 0,
            screenY: 0,
            target: null,
            touchType: null
        };
        return t;
    }
    //--------------------
    // Mouse
    //--------------------
    OnMouseDown(e) {
        e.preventDefault();
        if (this.GetTouchIdxById(e.button) === -1) {
            const t = this.BadTouch(e.button, e.pageX, e.pageY);
            this.handledTouches.push(t);
            for (let i = 0; i < this.inputComponentList.length; i++) {
                if (this.inputComponentList[i].OnTouchStart(t)) {
                    // Consumed.
                    break;
                }
            }
        }
    }
    OnMouseMove(e) {
        e.preventDefault();
        const idx = this.GetTouchIdxById(e.button);
        if (idx > -1) {
            const t = this.BadTouch(e.button, e.pageX, e.pageY);
            this.handledTouches.splice(idx, 1, t);
            for (let i = 0; i < this.inputComponentList.length; i++) {
                if (this.inputComponentList[i].OnTouchMove(t)) {
                    // Consumed.
                    break;
                }
            }
        }
    }
    OnMouseUp(e) {
        e.preventDefault();
        const idx = this.GetTouchIdxById(e.button);
        if (idx > -1) {
            const t = this.BadTouch(e.button, e.pageX, e.pageY);
            this.handledTouches.splice(idx, 1);
            for (let i = 0; i < this.inputComponentList.length; i++) {
                if (this.inputComponentList[i].OnTouchEnd(t)) {
                    // Consumed.
                    break;
                }
            }
        }
    }
    OnKeyDown(e) {
        this.keys[e.keyCode] = true;
    }
    OnKeyUp(e) {
        this.keys[e.keyCode] = false;
    }
    IsKeyDown(code) {
        if (this.keys[code] != null && this.keys[code] == true) {
            return true;
        }
        return false;
    }
}
exports.InputManager = InputManager;

},{"./CanvasManager":12}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CanvasManager_1 = require("./CanvasManager");
class LoadBarrier {
    static get Instance() {
        return this.instance || (this.instance = new this());
    }
    constructor() {
    }
    ClearLoadBarrier() {
        this.resourcesWaiting = 0;
        this.resourcesLoaded = 0;
    }
    ResourceLoading() {
        this.resourcesWaiting++;
    }
    ObjectLoaded() {
        this.resourcesLoaded++;
    }
    LoadBarrierPassed() {
        // If we've loaded as much as we have to load then we've passed.
        return (this.resourcesWaiting === this.resourcesLoaded);
    }
    Render() {
        // Draw loading screen
        let ctx = CanvasManager_1.CanvasManager.Instance.GetContext();
        const canvas = CanvasManager_1.CanvasManager.Instance.GetCanvas();
        ctx.fillStyle = "Blue";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Text
        ctx.font = "20px Arial";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText("LOADING", canvas.width / 2, canvas.height / 2 - 20);
    }
}
exports.LoadBarrier = LoadBarrier;

},{"./CanvasManager":12}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_1 = require("../utility/Vector2");
const GlobalSettings_1 = require("../GlobalSettings");
class PhysicsManager {
    static get Instance() {
        return this.instance || (this.instance = new this());
    }
    constructor() {
        // Actual things...
        this.staticObjects = [];
        this.kineticObjects = []; // Have Rigid Body
        // Universal Settings
        this.gravity = new Vector2_1.Vector2(0.0, -9.8);
        this.drag = 0.1;
    }
    Gravity() {
        return this.gravity;
    }
    Drag() {
        return this.drag;
    }
    // Physics Object Management
    AddRigidBody(rb) {
        this.kineticObjects.push(rb);
    }
    Update() {
        // PrePhysics
        // PhysicsUpdate
        for (let i = 0; i < this.kineticObjects.length; i++) {
            this.kineticObjects[i].physicsUpdate(GlobalSettings_1.frameTime);
        }
        // PostPhysics
    }
    Shutdown() {
    }
}
exports.PhysicsManager = PhysicsManager;

},{"../GlobalSettings":2,"../utility/Vector2":18}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoadBarrier_1 = require("./LoadBarrier");
class ResourceManager {
    static get Instance() {
        return this.instance || (this.instance = new this());
    }
    constructor() {
    }
    Start() {
    }
    LoadResource(src, type) {
        let res = this.resourceList.find(res => res.source === src);
        let obj = null;
        if (!res) {
            switch (type) {
                case ResourceType.Image:
                    obj = new Image();
                    obj.onload = ImageLoadComplete();
                    obj.src = src;
                    break;
                case ResourceType.Audio:
                    obj = new Audio(src + this.audioFormat);
                    LoadBarrier_1.LoadBarrier.Instance.ObjectLoaded(); // auto loads
            }
            res = new Resource(src, obj, type);
            LoadBarrier_1.LoadBarrier.Instance.ResourceLoading();
        }
        else {
            obj = res.object;
            res.addReference();
        }
        return obj;
    }
    GetResource(src) {
        const res = this.resourceList.find(res => res.source === src);
        if (res) {
            return res.obj;
        }
        return null;
    }
    UnloadResource(src) {
        // TO DO
    }
}
exports.ResourceManager = ResourceManager;
class Resource {
    constructor(src, obj, type) {
        this.source = src;
        this.object = obj;
        this.type = type;
        this.referenceCount = 1;
    }
    ReferenceCount() {
        return this.referenceCount;
    }
    AddReference() {
        this.referenceCount++;
    }
    RemoveReference() {
        this.referenceCount--;
        if (this.referenceCount < 0) {
            this.referenceCount = 0;
        }
    }
}
exports.Resource = Resource;
function ImageLoadComplete() {
    LoadBarrier_1.LoadBarrier.Instance.ObjectLoaded();
}

},{"./LoadBarrier":14}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Main_1 = require("../Main");
const GlobalSettings_1 = require("../GlobalSettings");
const Scene_1 = require("../Scene");
const CanvasManager_1 = require("./CanvasManager");
const ResourceManager_1 = require("./ResourceManager");
const PhysicsManager_1 = require("./PhysicsManager");
const InputManager_1 = require("./InputManager");
// Scene Manager is charged with running the current scene
// and the handling of the global canvas in the game.
// Running as a singleton so won't be using prototypal inheritance
// for this object.
class SceneManager {
    static get Instance() {
        return this.instance || (this.instance = new this());
    }
    constructor() {
    }
    //-----------------------------
    // Scene Management
    //-----------------------------
    ChangeScene(index) {
        // Shutdown current
        if (this.currentScene) {
            this.currentScene.Shutdown();
        }
        this.currentSceneIndex = index;
        this.currentScene = new Scene_1.Scene();
        this.currentScene.Load(this.GetSceneData(index));
        this.currentScene.Start();
        return this.currentScene;
    }
    //-----------------------------
    // Scene Update etc.
    //-----------------------------
    Initialise() {
        // Default things we need to get running.
        // Global Canvas
        CanvasManager_1.CanvasManager.Instance.CreateCanvas(800, 600);
        // Resource Manager
        ResourceManager_1.ResourceManager.Instance.Start();
        // Input Manager
        InputManager_1.InputManager.Instance.Start();
    }
    Start(data) {
        this.projectData = JSON.parse(data);
        // Finally handle our first scene - taken from json
        this.ChangeScene(0);
        // And create the tick
        // Interval is 1 second/frameTime in ms = ticks per second 
        // e.g. 1.0/0.05 = 20 FPS.
        this.interval = setInterval(Main_1.updateEngine, 1.0 / GlobalSettings_1.frameTime);
    }
    Shutdown() {
        clearInterval(this.interval);
    }
    Update() {
        // Input first (so it is handled during the update)
        InputManager_1.InputManager.Instance.Update();
        // Now the scene handling
        this.currentScene.Update();
        // Global PhysicsManager.
        PhysicsManager_1.PhysicsManager.Instance.Update();
        // Finally draw...
        this.Render();
    }
    Render() {
        CanvasManager_1.CanvasManager.Instance.Clear();
        this.currentScene.Render();
    }
    GetSceneData(i) {
        return this.projectData['Project']['Scenes'][i];
    }
}
exports.SceneManager = SceneManager;

},{"../GlobalSettings":2,"../Main":3,"../Scene":4,"./CanvasManager":12,"./InputManager":13,"./PhysicsManager":15,"./ResourceManager":16}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    Set(v) {
        this.x = v.x;
        this.y = v.y;
    }
    Magnitude() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
    MagnitudeSquared() {
        return (this.x * this.x) + (this.y * this.y);
    }
    Normalize() {
        const length = Math.sqrt((this.x * this.x) + (this.y * this.y));
        this.x = this.x / length;
        this.y = this.y / length;
    }
    Clean() {
        if (Math.abs(this.x) < Number.EPSILON) {
            this.x = 0.0;
        }
        if (Math.abs(this.y) < Number.EPSILON) {
            this.y = 0.0;
        }
    }
    //----------------------------------------
    // No operator overloading so methods to 
    // support addition and multiplication
    //----------------------------------------
    // Vector/Vector
    Add(v) {
        this.x = this.x + v.x;
        this.y = this.y + v.y;
    }
    Subtract(v) {
        this.x = this.x - v.x;
        this.y = this.y - v.y;
    }
    Multiply(v) {
        this.x = this.x * v.x;
        this.y = this.y * v.y;
    }
    // Vector/Float
    FloatMultiply(f) {
        this.x = this.x * f;
        this.y = this.y * f;
    }
    FloatDivide(f) {
        this.x = this.x / f;
        this.y = this.y / f;
    }
}
exports.Vector2 = Vector2;

},{}]},{},[3]);
