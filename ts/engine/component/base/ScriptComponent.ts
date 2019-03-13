import { Component, ComponentType } from "./Component";
import { Entity } from "../../Entity";
import { ScriptBuilder } from "../../utility/ScriptBuilder";


export class ScriptComponent extends Component {

    scriptName: string;

    constructor(name: string) {
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
    static Load(temp: Entity, json: any): ScriptComponent {
        
        let scriptObj = ScriptBuilder(json.data[0]);
        if (scriptObj != null) {
            scriptObj.parent = temp;
        }

        return scriptObj;
    }

    SetScriptData(json: any): void {

    }

    Shutdown(): void {
        super.Shutdown();
    }
}