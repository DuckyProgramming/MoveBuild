function setup(){
    createCanvas(windowWidth-50,windowHeight-50)
    setupGraphics()

    current=new battle(graphics.main,game.player)
}
function windowResized(){
    resizeCanvas(windowWidth-50,windowHeight-50)
}
/*
Display Possible Targets
Make Step
Make Twin Strike
*/