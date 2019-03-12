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
//# sourceMappingURL=ScriptComponent.js.map