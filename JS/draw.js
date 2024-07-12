function draw(){
    //clear()
    background(125)
    graphics.main.push()
    switch(stage.scene){
        case 'title': case 'menu': case 'menu2': case 'variants': case 'custom': case 'tutorial':  case 'graphic':
        case 'battle': case 'map': case 'shop': case 'replay':
        case 'victory': case 'defeat': case 'rest': case 'stash': case 'pack': case 'perk': case 'event': case 'bossstash':
        case 'tier':
            current.display(stage.scene)
            current.update(stage.scene)
        break
    }
    graphics.main.pop()
    stage.scale=min(width/graphics.main.width,height/graphics.main.height)
    displayTransition(graphics.main,transition)
    image(graphics.main,width/2-stage.scale*graphics.main.width/2,height/2-stage.scale*graphics.main.height/2,stage.scale*graphics.main.width,stage.scale*graphics.main.height)
    updateMouse(graphics.main)
    game.timer++
}