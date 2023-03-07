class combatantManager{
    constructor(layer){
        this.layer=layer
        this.combatants=[]
    }
    addCombatant(type,x,y,tileX,tileY){
        this.combatants.push(new combatant(this.layer,x,y,tileX,tileY,type,0,0))
    }
    display(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            this.combatants[a].display()
        }
    }
    update(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            this.combatants[a].update()
        }
    }
}