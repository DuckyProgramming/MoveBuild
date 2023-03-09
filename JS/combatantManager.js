class combatantManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.combatants=[]
    }
    addCombatant(x,y,relativeX,relativeY,tileX,tileY,type,team,direction){
        this.combatants.push(new combatant(this.layer,x,y,relativeX,relativeY,tileX,tileY,type,team,direction))
    }
    display(scene){
        switch(scene){
            case 'battle':
                for(let a=0;a<this.battle.tileManager.height;a++){
                    for(let b=0,lb=this.combatants.length;b<lb;b++){
                        if(this.combatants[b].tilePosition.y==a){
                            this.combatants[b].display()
                        }
                    }
                }
                this.layer.noFill()
                this.layer.stroke(255)
                this.layer.strokeWeight(3)
                for(let a=0,la=this.combatants.length;a<la;a++){
                    if((this.battle.attackManager.targetInfo[0]==2&&this.combatants[a].life>0&&this.combatants[a].team!=this.combatants[this.battle.attackManager.user].team&&legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],this.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles))&&this.combatants[a].infoAnim.target[0]<1){
                        this.combatants[a].infoAnim.target[0]=round(this.combatants[a].infoAnim.target[0]*5+1)/5
                    }else if(!(this.battle.attackManager.targetInfo[0]==2&&this.combatants[a].life>0&&this.combatants[a].team!=this.combatants[this.battle.attackManager.user].team&&legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],this.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles))&&this.combatants[a].infoAnim.target[0]>0){
                        this.combatants[a].infoAnim.target[0]=round(this.combatants[a].infoAnim.target[0]*5-1)/5
                    }
                }
            break
        }
    }
    displayInfo(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            this.combatants[a].displayInfo()
        }
    }
    update(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            for(let b=0;b<game.animRate;b++){
                this.combatants[a].update()
            }
            if(dist(inputs.rel.x,inputs.rel.y,this.combatants[a].position.x,this.combatants[a].position.y)<40){
                this.combatants[a].infoAnim.upSize=true
            }else{
                this.combatants[a].infoAnim.upSize=false
            }
        }
    }
}