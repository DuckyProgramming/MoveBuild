function keyPressed(){
    if(!transition.trigger){
        inputs.lastKey+=key
        inputs.lastKey=inputs.lastKey.substring(max(0,inputs.lastKey.length-3),inputs.lastKey.length)
        current.onKey(stage.scene,key,keyCode)
    }
}