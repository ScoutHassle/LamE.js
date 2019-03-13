export var ScriptDatabase: any[] = [];

export function ScriptBuilder(json) {
    
    const name = json.scriptName;
    let script = null;
    if(name != null) {
        if(ScriptDatabase[name] != null && ScriptDatabase[name] != undefined) {
            
            script = ScriptDatabase[name]();
            if(script != null && script != undefined) {

                script.SetScriptData(json);
            }
        }
    }
    
    return script;
}
