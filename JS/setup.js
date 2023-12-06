function setup(){
    createCanvas(windowWidth-50,windowHeight-50)
    setupGraphics()
    
    for(let a=0,la=types.relic.length;a<la;a++){
        if(types.relic[a].name==''){
            types.relic[a].name=types.relic[a].internal
        }
    }

    current=new battle(graphics.main,game.player)

    //stage.scene='tier'
    //current.overlayManager=new overlayManager(current.layer,current,1)

    /*current.menu.combatant=[9,10]
    current.menu.deck=[0,0]
    current.startGame()

    //current.player=[1,2,3,4,5,6,7,8,9,10]
    //current.create()

    transition.trigger=false
    stage.scene='graphic'
    graphics.test=0
    graphics.staticBackground.clear()
	setupBackground(graphics.test,graphics.staticBackground)*/
    
    /*stage.scene='battle'
    current.setupBattle(types.encounter[1])*/
    //stage.scene='tier'
}
function windowResized(){
    resizeCanvas(windowWidth-50,windowHeight-50)
}