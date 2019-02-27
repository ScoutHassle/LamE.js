let ScriptDatabase:any[];

function ScriptBuilder(json) {
    
    var name = json.scriptName;
    var script = null;
    if(name != null) {
        if(ScriptDatabase[name] != null && ScriptDatabase[name] != undefined) {
            
            script = ScriptDatabase[name]();
            if(script != null && script != undefined) {

                script.setScriptData(json);
            }
        }
    }
    
    return script;
}
