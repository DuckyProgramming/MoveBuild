class combatantManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle

        this.id=0

        this.combatants=[]
        this.playerCombatantIndex=[]
    }
    assignPlayer(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team>0){
                this.playerCombatantIndex[this.combatants[a].id]=a
            }
        }
    }
    clearCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            delete this.combatants[a]
            this.combatants.splice(a,1)
            a--
            la--
        }
        this.combatants=[]
    }
    resetCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0){
                delete this.combatants[a]
                this.combatants.splice(a,1)
                a--
                la--
            }else{
                this.combatants[a].reset()
            }
        }
        this.assignPlayer()
        for(let a=0,la=this.combatants.length;a<la;a++){
            this.combatants[a].id=a
        }
        this.id=this.combatants.length
    }
    setupCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0){
                this.combatants[a].setIntent(0)
            }else{
                this.combatants[a].endBlock()
            }
        }
        this.assignPlayer()
    }
    enableCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0){
                this.combatants[a].endBlock()
            }
        }
    }
    unmoveCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0){
                this.combatants[a].moved=false
                this.combatants[a].activated=types.attack[this.combatants[a].attack[this.combatants[a].intent].type].class==2||types.attack[this.combatants[a].attack[this.combatants[a].intent].type].class==4
            }
        }
    }
    activateCombatants(type,id){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0){
                this.combatants[a].activate(type,id)
            }
        }
    }
    targetCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0){
                this.combatants[a].markTarget()
            }
            if((this.battle.attackManager.targetInfo[0]==2||this.battle.attackManager.targetInfo[0]==3||this.battle.attackManager.targetInfo[0]==5)&&this.combatants[a].life>0&&this.combatants[a].team!=this.combatants[this.battle.attackManager.user].team&&
            (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],this.battle.relicManager.hasRelic(145,this.battle.attackManager.player)?1:this.battle.attackManager.targetInfo[2],this.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5)){
                this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.combatants[a].tilePosition.x,this.combatants[a].tilePosition.y)].targetted[0]=true
            }
        }
    }
    deTargetCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team>0&&this.combatants[a].tilePosition.x==-1&&this.combatants[a].tilePosition.y==-1){
                this.combatants[a].deTarget()
            }
        }
    }
    randomizeCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0){
                this.combatants[a].goal.anim.direction=-150+floor(random(0,6))*60
                this.combatants[a].activated=true
            }
        }
        this.battle.updateTargetting()
    }
    allEffect(effect,args){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0){
                switch(effect){
                    case 1:
                        this.combatants[a].life*=args[0]
                    break
                    case 2:
                        this.combatants[a].life=args[0]
                    break
                    case 3:
                        this.combatants[a].statusEffect('Strength',args[0])
                    break
                    case 4:
                        this.combatants[a].statusEffect('Counter All',args[0])
                    break
                    case 5:
                        this.combatants[a].life*=args[0]
                        this.combatants[a].base.life*=args[0]
                    break
                    case 6:
                        this.combatants[a].addBlock(args[0])
                    break
                    case 7:
                        this.combatants[a].heal(args[0])
                    break
                }
            }
        }
    }
    addCombatant(x,y,relativeX,relativeY,tileX,tileY,type,team,direction,minion){
        this.combatants.push(new combatant(this.layer,this.battle,x,y,relativeX,relativeY,tileX,tileY,type,team,this.id,round(direction/60-1/2)*60+30,minion))
        if(this.id<this.battle.players){
            this.playerCombatantIndex[this.id]=this.combatants.length-1
        }
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
    getPlayerCombatantIndex(id){
        return this.playerCombatantIndex[id]
    }
    damageArea(damage,user,team,tilePosition){
        for(let a=0,la=this.combatants.length;a<la;a++){
            let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.combatants[a])
            if(this.combatants[a].team!=team&&distance>=0&&distance<=1){
                this.combatants[a].takeDamage(damage,user)
            }
        }
    }
    damageAreaID(damage,user,id,tilePosition){
        for(let a=0,la=this.combatants.length;a<la;a++){
            let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.combatants[a])
            if(this.combatants[a].id!=id&&distance>=0&&distance<=1){
                this.combatants[a].takeDamage(damage,user)
            }
        }
    }
    statusAreaID(name,amount,id,tilePosition){
        for(let a=0,la=this.combatants.length;a<la;a++){
            let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.combatants[a])
            if(this.combatants[a].id!=id&&distance>=0&&distance<=1){
                this.combatants[a].statusEffect(name,amount)
            }
        }
    }
    getArea(team,tilePosition,range){
        let combatants=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team!=team&&legalTargetCombatant(0,0,range,{tilePosition:tilePosition},this.combatants[a],this.battle.tileManager.tiles)){
                combatants.push(this.combatants[a])
            }
        }
        return combatants
    }
    tick(){
        this.combatants.forEach(combatant=>combatant.tick())
    }
    tickEarly(){
        this.combatants.forEach(combatant=>combatant.tickEarly())
    }
    reorder(){
        let order=1
        let left=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==1&&this.combatants[a].life>0){
                left.push(a)
            }
        }
        while(left.length<=0&&this.battle.reinforce.front.length==0&&this.battle.reinforce.back.length>0){
            this.battle.turn.accelerate++
            this.battle.loadReinforce()
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
                let list=[]
                for(let a=0,la=this.combatants.length;a<la;a++){
                    if(!list.includes(this.combatants[a].position.y)){
                        list.push(this.combatants[a].position.y)
                    }
                }
                let sorted=list.sort()
                for(let a=0,la=sorted.length;a<la;a++){
                    for(let b=0,lb=this.combatants.length;b<lb;b++){
                        if(this.combatants[b].position.y==sorted[a]){
                            this.combatants[b].display()
                        }
                    }
                }
            break
        }
    }
    displayInfo(scene){
        switch(scene){
            case 'battle':
                this.combatants.forEach(combatant=>combatant.displayInfo('battle'))
                this.combatants.forEach(combatant=>combatant.displayInfo('overlay'))
            break
            case 'rest':
                for(let a=0,la=this.combatants.length;a<la;a++){
                    if(this.combatants[a].team>0){
                        this.combatants[a].displayInfo('rest')
                    }
                }
            break
            case 'event':
                for(let a=0,la=this.combatants.length;a<la;a++){
                    if(this.combatants[a].team>0){
                        this.combatants[a].displayInfo('event')
                    }
                }
            break
        }
    }
    update(scene){
        switch(scene){
            case 'battle':
                for(let a=0,la=this.combatants.length;a<la;a++){
                    for(let b=0;b<game.animRate;b++){
                        this.combatants[a].update()
                    }
                    this.combatants[a].infoAnim.upSize=dist(inputs.rel.x,inputs.rel.y,this.combatants[a].position.x,this.combatants[a].position.y)<game.targetRadius&&!this.battle.overlayManager.anyActive
                }
            break
            case 'rest': case 'event':
                for(let a=0,la=this.combatants.length;a<la;a++){
                    for(let b=0;b<game.animRate;b++){
                        this.combatants[a].updatePassive()
                    }
                }
            break
        }
    }
}