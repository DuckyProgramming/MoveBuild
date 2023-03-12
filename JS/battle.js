class battle{
    constructor(layer,player){
        this.layer=layer
        this.player=player

        this.tileManager=new tileManager(this.layer,this)
        this.combatantManager=new combatantManager(this.layer,this)
        this.cardManager=new cardManager(this.layer,this)
        this.attackManager=new attackManager(this.layer,this)
        this.turnManager=new turnManager(this.layer,this)
        this.particleManager=new particleManager(this.layer,this)

        this.energy={main:0,base:3}
        this.turn={main:0,total:1}
        this.anim={reserve:1,discard:1,endTurn:1,turn:0}
        this.counter={id:0}

        this.colorDetail=types.color.card[this.player]

        this.cardManager.initialDeck()
        
        this.setupBattle()

        this.addCombatant({x:3,y:1},this.player,0)
        this.addCombatant({x:3,y:2},0,1)
        this.addCombatant({x:2,y:1},0,1)
        this.addCombatant({x:2,y:2},0,1)
        this.addCombatant({x:1,y:1},0,1)
        this.addCombatant({x:3,y:3},0,1)
        this.addCombatant({x:3,y:0},0,1)
    }
    setupBattle(){
        this.energy.main=this.energy.base
        this.turn.total=1

        this.tileManager.generateTiles(types.level[0])

        this.combatantManager.resetCombatants()

        this.cardManager.clearBattle()
        this.cardManager.copy(0,1)
        this.cardManager.shuffle(1)
        this.cardManager.draw(this.cardManager.drawAmount)
    }
    addCombatant(position,type,team){
        let tilePosition=this.tileManager.getTilePosition(position.x,position.y)
        let relativePosition=this.tileManager.getTileRelativePosition(position.x,position.y)
        this.combatantManager.addCombatant(tilePosition.x,tilePosition.y,relativePosition.x,relativePosition.y,position.x,position.y,type,team,this.tileManager.getTileRelativeDirection(position.x,position.y,round((this.tileManager.width-1)/2),round((this.tileManager.height-1)/2)))
    }
    display(){
        this.layer.background(120)
        this.layer.fill(225,255,255)
        this.layer.stroke(200,255,255)
        this.layer.strokeWeight(3)
        this.layer.quad(10,454,26,434,42,454,26,474)
        this.layer.fill(this.colorDetail.fill)
        this.layer.stroke(this.colorDetail.stroke)
        this.layer.strokeWeight(3*this.anim.reserve)
        this.layer.rect(-74+this.anim.turn*100,496,32*this.anim.reserve,24*this.anim.reserve,5*this.anim.reserve)
        this.layer.strokeWeight(3*this.anim.discard)
        this.layer.rect(-74+this.anim.turn*100,528,32*this.anim.discard,24*this.anim.discard,5*this.anim.discard)
        this.layer.strokeWeight(3*this.anim.endTurn)
        this.layer.rect(-74+this.anim.turn*100,560,32*this.anim.endTurn,24*this.anim.endTurn,5*this.anim.endTurn)
        this.layer.fill(0)
        this.layer.noStroke()
        this.layer.textSize(8*this.anim.reserve)
        this.layer.text('Draw',-74+this.anim.turn*100,496-4*this.anim.reserve)
        this.layer.text('('+this.cardManager.reserve.cards.length+')',-74+this.anim.turn*100,496+4*this.anim.reserve)
        this.layer.textSize(8*this.anim.discard)
        this.layer.text('Discard',-74+this.anim.turn*100,528-4*this.anim.discard)
        this.layer.text('('+this.cardManager.discard.cards.length+')',-74+this.anim.turn*100,528+4*this.anim.discard)
        this.layer.textSize(8*this.anim.endTurn)
        this.layer.text('End Turn',-74+this.anim.turn*100,560-4*this.anim.endTurn)
        this.layer.text('('+this.turn.total+')',-74+this.anim.turn*100,560+4*this.anim.endTurn)
        this.layer.textSize(14-min(floor(max(this.energy.main,this.energy.base)/10)*2,3))
        this.layer.text(this.energy.main+'/'+this.energy.base,26,454)
        switch(stage.scene){
            case 'battle':
                this.tileManager.display(stage.scene)
                this.combatantManager.display(stage.scene)
                this.cardManager.display(stage.scene)
                this.combatantManager.displayInfo()
                this.tileManager.displayCoordinate()
                this.particleManager.display()
            break
        }
    }
    update(){
        switch(stage.scene){
            case 'battle':
                this.tileManager.update(stage.scene)
                this.combatantManager.update()
                this.cardManager.update(stage.scene)
                this.attackManager.update()
                this.turnManager.update()
                this.particleManager.update()
                this.anim.turn=smoothAnim(this.anim.turn,this.turn.main==0,0,1,5)
                this.anim.reserve=smoothAnim(this.anim.reserve,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn*100,y:496},width:32,height:24}),1,1.5,5)
                this.anim.discard=smoothAnim(this.anim.discard,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn*100,y:528},width:32,height:24}),1,1.5,5)
                this.anim.endTurn=smoothAnim(this.anim.endTurn,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn*100,y:560},width:32,height:24}),1,1.5,5)
            break
        }
    }
    onClick(){
        switch(stage.scene){
            case 'battle':
                this.cardManager.onClick(stage.scene)
            break
        }
    }
    onKey(key,code){
        switch(stage.scene){
            case 'battle':
                this.cardManager.onKey(stage.scene,key,code)
            break
        }
    }
}