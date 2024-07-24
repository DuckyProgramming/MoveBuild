function setup(){
    createCanvas(windowWidth-50,windowHeight-50)
    setupGraphics()
    
    for(let a=0,la=types.relic.length;a<la;a++){
        if(types.relic[a].name==''){
            types.relic[a].name=types.relic[a].internal
        }
    }

    current=new battle(graphics.main,game.player)

    if(false){

            //stage.scene='tier'
            //current.overlayManager=new overlayManager(current.layer,current,1)

            //transition.trigger=true
            //transition.scene='menu'

        current.menu.combatant=[17]
        current.menu.deck=[-1]
        if(variants.mtg){
            for(let a=0,la=current.menu.combatant.length;a<la;a++){
                current.setupMtgManaChoice(a)
            }
        }
        current.startGame()

        //game.animRate=4

            //current.player=[1,2,3,4,5,6,7,8,9,10,11,12,13]
            //current.create()

        transition.trigger=false
        
            /*stage.scene='graphic'
            graphics.test=5
            graphics.staticBackground.clear()
            setupBackground(graphics.test,graphics.staticBackground)*/
        
        game.dev=true
        stage.scene='battle'
        current.setupBattle(types.encounter[1])

            /*transition.trigger=true
            transition.scene='event'
            current.setupSpecificEvent(136)*/

            /*player(0).size=3
            player(0).goal.anim.direction=-30
            player(0).anim.direction=-30*/

            /*variants.mod=true
            for(let a=0,la=3;a<la;a++){
                current.modManager.addMod(186+a)
            }*/

            /*for(let a=0,la=5;a<la;a++){
                //current.relicManager.addRandomRelic(0)
                quickRelic(355+a,0)
            }*/

            /*current.itemManager.addItemSlots(2,0)
            for(let a=0,la=5;a<la;a++){
                current.itemManager.addItem(98+a,0)
            }*/

            //stage.scene='tier'
    }
}
function windowResized(){
    resizeCanvas(windowWidth-50,windowHeight-50)
}