function setup(){
    createCanvas(windowWidth-50,windowHeight-50)
    setupGraphics()
    
    for(let a=0,la=types.relic.length;a<la;a++){
        types.relic[a].name=types.relic[a].internal
    }

    current=new battle(graphics.main,game.player)

    /*for(let a=1;a<=60;a++){
        current.relicManager.addRelic(a,0)
    }*/
    /*current.itemManager.addItemSlots(2,0)
    for(let a=0,la=5;a<la;a++){
        current.itemManager.addItem(2+a,0)
    }*/

    /*current.menu.combatant=[7]
    current.menu.deck=[0]
    current.startGame()
    transition.trigger=false
    //stage.scene='graphic'
    //graphics.test=7
    stage.scene='battle'
    current.setupBattle(types.encounter[1])*/

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