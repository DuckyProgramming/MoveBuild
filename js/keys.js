function keyPressed(){
    if(!transition.trigger){
        inputs.lastKey.push(key)
        if(inputs.lastKey.length>=4){
            inputs.lastKey.splice(0,1)
        }
        current.onKey(stage.scene,key,keyCode)
    }
}