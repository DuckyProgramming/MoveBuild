function mouseClicked(){
    updateMouse(graphics.main)
    if(!transition.trigger){
        current.onClick()
    }
}