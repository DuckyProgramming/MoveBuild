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

        //transition.trigger=true
        //transition.scene='menu'

    /*current.menu.combatant=[12]
    current.menu.deck=[0]
    current.startGame()
    game.animRate=4*/

        //current.player=[1,2,3,4,5,6,7,8,9,10]
        //current.create()

    //transition.trigger=false
    
        /*stage.scene='graphic'
        graphics.test=0
        graphics.staticBackground.clear()
        setupBackground(graphics.test,graphics.staticBackground)*/
    
    /*game.dev=true
    stage.scene='battle'
    current.setupBattle(types.encounter[1])*/

        /*variants.mod=true
        for(let a=0,la=4;a<la;a++){
            current.modManager.addMod(168+a)
        }*/

        //stage.scene='tier'
}
function windowResized(){
    resizeCanvas(windowWidth-50,windowHeight-50)
}