function setup(){
    createCanvas(windowWidth-50,windowHeight-50)
    setupGraphics()
    
    for(let a=0,la=types.relic.length;a<la;a++){
        if(types.relic[a].name==''){
            types.relic[a].name=types.relic[a].internal
        }
    }

    current=new battle(graphics.main,game.player)

    /*current.menu.combatant=[8]
    current.menu.deck=[0,0]
    current.startGame()
    transition.trigger=false
    //stage.scene='graphic'
    //graphics.test=7
    stage.scene='battle'
    current.setupBattle(types.encounter[1])*/
}
function windowResized(){
    resizeCanvas(windowWidth-50,windowHeight-50)
}