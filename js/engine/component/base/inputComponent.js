"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
class InputComponent extends Component_1.Component {
    constructor(parent) {
        super(ComponentType.Component_Input, parent);
        this.touchId = -1;
        this.onTouchStartEvent = null;
        this.onTouchMoveEvent = null;
        this.onTouchEndEvent = null;
        // TO DO - InputManager
    }
    Update() {
    }
    Shutdown() {
        super.Shutdown();
        this.onTouchStartEvent = null;
        this.onTouchMoveEvent = null;
        this.onTouchEndEvent = null;
        // TO DO - InputManager
    }
    SetTouchId(id) {
        this.touchId = id;
    }
    IsValidTouchId(id) {
        if (this.touchId == id && this.touchId != -1)
            return true;
        return false;
    }
    ClearTouchId() {
        this.touchId = -1;
    }
    SetTouchEvent(type, func) {
        switch (type) {
            case TouchEventType.Touch_Start:
                this.onTouchStartEvent = func;
                break;
            case TouchEventType.Touch_Move:
                this.onTouchMoveEvent = func;
                break;
            case TouchEventType.Touch_End:
                this.onTouchEndEvent = func;
                break;
        }
    }
    TriggerTouchEvent(type, touch) {
        switch (type) {
            case TouchEventType.Touch_Start:
                if (this.onTouchStartEvent != null)
                    this.onTouchStartEvent(touch);
                break;
            case TouchEventType.Touch_Move:
                if (this.onTouchMoveEvent != null)
                    this.onTouchMoveEvent(touch);
                break;
            case TouchEventType.Touch_End:
                if (this.onTouchEndEvent != null)
                    this.onTouchEndEvent(touch);
                break;
        }
    }
    // To Override
    OnTouchStart(touch) {
        return false;
    }
    OnTouchMove(touch) {
        return false;
    }
    OnTouchEnd(touch) {
        return false;
    }
}
exports.InputComponent = InputComponent;
//# sourceMappingURL=InputComponent.js.map