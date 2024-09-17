var scriptDatabase = [];

function scriptBuilder(json) {
    
    var name = json.scriptName;
    var script = null;
    if(name != null) {
        if(scriptDatabase[name] != null && scriptDatabase[name] != undefined) {
            
            script = scriptDatabase[name]();
            if(script != null && script != undefined) {

                script.setScriptData(json);
            }
        }
    }
    
    return script;
}
