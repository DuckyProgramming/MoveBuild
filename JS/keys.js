function keyPressed(){
    switch(key){
        case 'a':
            inputs.keys[0][0]=true
        break
        case 'd':
            inputs.keys[0][1]=true
        break
        case 'w':
            inputs.keys[0][2]=true
        break
        case 's':
            inputs.keys[0][3]=true
        break
        case 'ArrowLeft':
            inputs.keys[1][0]=true
        break
        case 'ArrowRight':
            inputs.keys[1][1]=true
        break
        case 'ArrowUp':
            inputs.keys[1][2]=true
        break
        case 'ArrowDown':
            inputs.keys[1][3]=true
        break
    }
    if(!transition.trigger){
        switch(stage.scene){
        }
    }
}
function keyReleased(){
    switch(key){
        case 'a':
            inputs.keys[0][0]=false
        break
        case 'd':
            inputs.keys[0][1]=false
        break
        case 'w':
            inputs.keys[0][2]=false
        break
        case 's':
            inputs.keys[0][3]=false
        break
        case 'ArrowLeft':
            inputs.keys[1][0]=false
        break
        case 'ArrowRight':
            inputs.keys[1][1]=false
        break
        case 'ArrowUp':
            inputs.keys[1][2]=false
        break
        case 'ArrowDown':
            inputs.keys[1][3]=false
        break
    }
}