function mouseClicked(){
    updateMouse(graphics.main)
    if(!transition.trigger){
        current.onClick(stage.scene)
    }
}
function mouseDragged(){
    updateMouse(graphics.main)
    if(!transition.trigger){
        current.onDrag(stage.scene)
    }
}