class combatantManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle

        this.id=0

        this.combatants=[]
    }
    resetCombatants(){
        this.id=0
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==1){
                this.combatants.splice(a,1)
                a--
                la--
            }
        }
    }
    setupCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            this.combatants[a].block=0
            if(this.combatants[a].team==1){
                this.combatants[a].setIntent(0)
            }
        }
    }
    unmoveCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==1){
                this.combatants[a].moved=false
                this.combatants[a].activated=false
            }
        }
    }
    activateCombatants(type,id){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==1){
                this.combatants[a].activate(type,id)
            }
        }
    }
    addCombatant(x,y,relativeX,relativeY,tileX,tileY,type,team,direction){
        this.combatants.push(new combatant(this.layer,this.battle,x,y,relativeX,relativeY,tileX,tileY,type,team,this.id,round(direction/60-1/2)*60+30))
        this.id++
    }
    getCombatantIndex(tileX,tileY){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].tilePosition.x==tileX&&this.combatants[a].tilePosition.y==tileY&&this.combatants[a].life>0){
                return a
            }
        }
        return -1
    }
    getPlayerCombatantIndex(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0){
                return a
            }
        }
    }
    reorder(){
        let order=1
        let left=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==1&&this.combatants[a].life>0){
                left.push(a)
            }
        }
        while(left.length>0){
            let minimum=this.combatants[left[0]].id
            for(let a=1,la=left.length;a<la;a++){
                minimum=min(minimum,this.combatants[left[a]].id)
            }
            for(let a=0,la=left.length;a<la;a++){
                if(this.combatants[left[a]].id==minimum){
                    this.combatants[left[a]].order=order
                    left.splice(a,1)
                    a--
                    la--
                    order++
                }
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
                    if((this.battle.attackManager.targetInfo[0]==2||this.battle.attackManager.targetInfo[0]==3)&&this.combatants[a].life>0&&this.combatants[a].team!=this.combatants[this.battle.attackManager.user].team&&legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)){
                        this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.combatants[a].tilePosition.x,this.combatants[a].tilePosition.y)].targetted[0]=true
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
            if(dist(inputs.rel.x,inputs.rel.y,this.combatants[a].position.x,this.combatants[a].position.y)<game.targetRadius){
                this.combatants[a].infoAnim.upSize=true
            }else{
                this.combatants[a].infoAnim.upSize=false
            }
        }
    }
}