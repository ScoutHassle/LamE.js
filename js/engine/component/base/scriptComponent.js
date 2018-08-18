'use strict';

class ScriptComponent extends Component {
    
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
    static load(temp, json) {
        
        var scriptObj = scriptBuilder(json.data[0]);
        
        if(scriptObj != null) {
            
            scriptObj.parent = temp;
            temp.addComponent(scriptObj);
        }
        
        return scriptObj;
    }
    
    setScriptData(json) {
        
        // default
    }
    
    shutdown() {
        
        super.shutdown();
    }
}
