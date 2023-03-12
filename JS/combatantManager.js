class combatantManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle

        this.id=0

        this.combatants=[]
    }
    resetCombatants(){
        this.id=0
        for(let a=1,la=this.combatants.length;a<la;a++){
            this.combatants.splice(a,1)
            a--
            la--
        }
    }
    addCombatant(x,y,relativeX,relativeY,tileX,tileY,type,team,direction){
        this.combatants.push(new combatant(this.layer,this.battle,x,y,relativeX,relativeY,tileX,tileY,type,team,this.id,round(direction/60-1/2)*60+30))
        this.id++
    }
    getCombatantIndex(tileX,tileY){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].tilePosition.x==tileX&&this.combatants[a].tilePosition.y==tileY){
                return a
            }
        }
        return -1
    }
    getPlayerCombatant(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0){
                return a
            }
        }
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
                    this.combatants[a].infoAnim.target[0]=smoothAnim(this.combatants[a].infoAnim.target[0],this.battle.attackManager.targetInfo[0]==2&&this.combatants[a].life>0&&this.combatants[a].team!=this.combatants[this.battle.attackManager.user].team&&legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles),0,1,5)
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