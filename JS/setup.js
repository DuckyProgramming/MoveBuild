function setup(){
    createCanvas(windowWidth-50,windowHeight-50)
    setupGraphics()

    current=new battle(graphics.main,game.player)

    current.setupBattle(types.encounter[1])
}
function windowResized(){
    resizeCanvas(windowWidth-50,windowHeight-50)
}