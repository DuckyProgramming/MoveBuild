function setup(){
    createCanvas(windowWidth-50,windowHeight-50)
    setupGraphics()

    current=new battle(graphics.main,game.player)

    //for(let a=1;a<=10;a++){
        //current.relicManager.addRelic(a,0)
    //}

    stage.scene='battle'
    current.setupBattle(types.encounter[1])

    /*current.overlayManager.overlays[0][0].active=true
    current.overlayManager.overlays[0][1].active=true
    current.overlayManager.overlays[0][0].activate([
        {type:1,value:[0,floor(random(0,2))]},
        {type:1,value:[0,floor(random(0,2))]},
        {type:1,value:[0,floor(random(0,2))]},])
    current.overlayManager.overlays[0][1].activate([
        {type:1,value:[0,floor(random(0,2))]},
        {type:1,value:[0,floor(random(0,2))]},
        {type:1,value:[0,floor(random(0,2))]},])*/
}
function windowResized(){
    resizeCanvas(windowWidth-50,windowHeight-50)
}