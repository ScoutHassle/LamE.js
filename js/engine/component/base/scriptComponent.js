'use strict';

class ScriptComponent extends Component {
    
    constructor(name) {
        
        super(ComponentType.Component_Script, null);
        
        this.scriptName = name;
    }

    start() /* */ {
        // default - called after the script is loaded so the parent is present.
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
    static load(temp, json) /* oftype ScriptComponent */ {
        
        var scriptObj = scriptBuilder(json.data[0]);
        
        if(scriptObj != null) {
            
            scriptObj.parent = temp;
            temp.addComponent(scriptObj);

            scriptObj.start();
        }
        
        return scriptObj;
    }
    
    setScriptData(json) /* */ {
        
        // default
    }
    
    shutdown() /* */ {
        
        super.shutdown();
    }
}
