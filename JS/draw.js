function draw(){
    clear()
    background(125)
    graphics.main.push()
    switch(stage.scene){
        case 'battle':
            current.display()
            current.update()
        break
    }

    //graphics.main.image(graphics.backgrounds[0],0,0,graphics.main.width,graphics.main.height)
    
    graphics.main.pop()
    stage.scale=min(width/graphics.main.width,height/graphics.main.height)
    displayTransition(graphics.main,transition)
    image(graphics.main,width/2-stage.scale*graphics.main.width/2,height/2-stage.scale*graphics.main.height/2,stage.scale*graphics.main.width,stage.scale*graphics.main.height)
    updateMouse(graphics.main)
    game.timer++
}