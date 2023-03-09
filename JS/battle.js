class battle{
    constructor(layer,player){
        this.layer=layer
        this.player=player

        this.tileManager=new tileManager(this.layer,types.level[0])
        this.combatantManager=new combatantManager(this.layer)
        this.cardManager=new cardManager(this.layer,this.player)
        this.attackManager=new attackManager(this.layer)

        this.energy={main:0,base:3}
        this.calc={position:{x:0,y:0}}

        this.cardManager.initialDeck()
        
        this.setupBattle()

        this.addCombatant({x:3,y:1},this.player,0)
        this.addCombatant({x:3,y:2},0,1)
        this.addCombatant({x:2,y:1},0,1)
        this.addCombatant({x:2,y:2},0,1)
        this.addCombatant({x:1,y:1},0,1)
        this.addCombatant({x:3,y:3},0,1)
    }
    setupBattle(){
        this.energy.main=this.energy.base

        this.cardManager.clearBattle()
        this.cardManager.copy(0,1)
        this.cardManager.draw(this.cardManager.drawAmount)
    }
    addCombatant(position,type,team){
        this.calc.position=this.tileManager.getTilePosition(position.x,position.y)
        this.combatantManager.addCombatant(this.calc.position.x,this.calc.position.y,position.x,position.y,type,team,this.tileManager.getTileRelativeDirection(position.x,position.y,round((this.tileManager.width-1)/2),round((this.tileManager.height-1)/2)))
    }
    display(){
        this.layer.background(120)
        this.layer.fill(225,255,255)
        this.layer.stroke(200,255,255)
        this.layer.strokeWeight(3)
        this.layer.quad(10,454,26,434,42,454,26,474)
        this.layer.fill(0)
        this.layer.noStroke()
        this.layer.textSize(14-min(floor(this.energy.main/10)*2,3))
        this.layer.text(this.energy.main+'/'+this.energy.base,26,454)
        switch(stage.scene){
            case 'battle':
                this.tileManager.display()
                this.combatantManager.display(stage.scene,this.tileManager.height,[this.attackManager])
                this.cardManager.display(stage.scene)
                this.combatantManager.displayInfo()
            break
        }
    }
    update(){
        switch(stage.scene){
            case 'battle':
                this.combatantManager.update()
                this.cardManager.update(stage.scene,[this.energy])
                this.attackManager.update(this.combatantManager)
            break
        }
    }
    onClick(){
        switch(stage.scene){
            case 'battle':
                this.cardManager.onClick(stage.scene,[this.combatantManager,this.attackManager,this.energy])
            break
        }
    }
}