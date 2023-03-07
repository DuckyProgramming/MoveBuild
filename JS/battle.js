class battle{
    constructor(layer){
        this.layer=layer
        this.tileManager=new tileManager(this.layer,5)
        this.combatantManager=new combatantManager(this.layer)

        this.calc={position:{x:0,y:0}}

        this.addCombatant({x:2,y:0},1,0)
        
    }
    addCombatant(position,type,team){
        this.calc.position=this.tileManager.getTilePosition(position.x,position.y)
        this.combatantManager.addCombatant(this.calc.position.x,this.calc.position.y,position.x,position.y,type,team,this.tileManager.getTileRelativeDirection(position.x,position.y,(this.tileManager.size-1)/2,(this.tileManager.size-1)/2))
    }
    display(){
        this.layer.background(200)
        switch(stage.scene){
            case 'battle':
                this.tileManager.display()
                this.combatantManager.display()
            break
        }
    }
    update(){
        switch(stage.scene){
            case 'battle':
                this.combatantManager.update()
            break
        }
    }
}