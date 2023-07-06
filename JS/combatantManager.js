class combatantManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle

        this.id=0

        this.combatants=[]
        this.playerCombatantIndex=[]
        this.sorted=[]
        this.proxyPlayer=new combatant(this.layer,this.battle,0,0,0,0,0,0,0,0,0,0)
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
        this.sort()
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
            if(this.combatants[a].team==0&&this.combatants[a].life>0){
                this.combatants[a].endBlock()
            }
        }
    }
    unmoveCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0&&this.combatants[a].life>0){
                this.combatants[a].moved=false
                this.combatants[a].activated=types.attack[this.combatants[a].attack[this.combatants[a].intent].type].class==2||types.attack[this.combatants[a].attack[this.combatants[a].intent].type].class==4||types.attack[this.combatants[a].attack[this.combatants[a].intent].type].class==5
            }
        }
    }
    bossHeal(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team>0){
                this.combatants[a].heal(this.combatants[a].base.life-this.combatants[a].life)
            }
        }
    }
    activateCombatants(type,id){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0&&this.combatants[a].life>0){
                this.combatants[a].activate(type,id)
            }
        }
    }
    targetCombatants(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].team==0&&this.combatants[a].life>0){
                this.combatants[a].markTarget()
            }
            if((this.battle.attackManager.targetInfo[0]==2||this.battle.attackManager.targetInfo[0]==3||this.battle.attackManager.targetInfo[0]==5||this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==11)&&
            this.combatants[a].life>0&&(this.combatants[a].team!=this.combatants[this.battle.attackManager.user].team||this.battle.attackManager.targetInfo[0]==10&&this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y)&&
            !(this.combatants[a].spec.includes(9)&&abs(this.combatants[a].goal.anim.direction-atan2(this.combatants[this.battle.attackManager.player].relativePosition.x-this.combatants[a].relativePosition.x,this.combatants[this.battle.attackManager.player].relativePosition.y-this.combatants[a].relativePosition.y))<30)&&
            (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],this.battle.relicManager.hasRelic(145,this.battle.attackManager.player)?1:this.battle.attackManager.targetInfo[2],this.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5||
            this.battle.attackManager.targetInfo[0]==10&&this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y)){
                if(this.combatants[a].tilePosition.x==this.battle.attackManager.tilePosition.x&&this.combatants[a].tilePosition.y==this.battle.attackManager.tilePosition.y){
                    this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.combatants[a].tilePosition.x,this.combatants[a].tilePosition.y)].indescriptTarget(0,numeralizeDirection(0))
                }else{
                    this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.combatants[a].tilePosition.x,this.combatants[a].tilePosition.y)].target(0,numeralizeDirection(0,directionCombatant(this.combatants[a],this.combatants[this.battle.attackManager.user])))
                }
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
    summonCombatant(tilePosition,type,direction){
        let list=[]
        for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
            let length=distTargetCombatant(0,{tilePosition:tilePosition},this.battle.tileManager.tiles[a])
            if(length<=1&&length>=0&&this.battle.tileManager.tiles[a].occupied==0){
                list.push(a)
            }
        }
        if(list.length>0){
            let tile=this.battle.tileManager.tiles[list[floor(random(0,list.length))]]
            this.addCombatant(tile.position.x,tile.position.y,tile.relativePosition.x,tile.relativePosition.y,tile.tilePosition.x,tile.tilePosition.y,type,0,direction,false)
            this.battle.updateTargetting()
            this.battle.tileManager.activate()
            this.battle.counter.enemy++
        }
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
                    case 8:
                        this.combatants[a].statusEffect('Dexterity',args[0])
                    break
                    case 9:
                        this.combatants[a].statusEffect('Retain Block',args[0])
                    break
                    case 10:
                        if(this.combatants[a].name==args[1]){
                            this.combatants[a].heal(args[0])
                        }
                    break
                    case 11:
                        this.combatants[a].statusEffect('Regeneration',args[0])
                    break
                    case 12:
                        this.combatants[a].statusEffect('Buffer',args[0])
                    break
                    case 13:
                        this.combatants[a].statusEffect('Armor',args[0])
                    break
                }
            }
        }
    }
    killAll(name){
        let total=0
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].name==name){
                total+=this.combatants[a].life
                this.combatants[a].life=0
            }
        }
        return total
    }
    addCombatant(x,y,relativeX,relativeY,tileX,tileY,type,team,direction,minion){
        this.combatants.push(new combatant(this.layer,this.battle,x,y,relativeX,relativeY,tileX,tileY,type,team,this.id,round(direction/60-1/2)*60+30,minion))
        if(this.id<this.battle.players){
            this.playerCombatantIndex[this.id]=this.combatants.length-1
        }
        this.id++
        this.sort()
        this.reorder()
    }
    getCombatantIndex(tileX,tileY){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].tilePosition.x==tileX&&this.combatants[a].tilePosition.y==tileY&&this.combatants[a].life>0){
                return a
            }
        }
        return -1
    }
    playCard(){
        this.combatants.forEach(combatant=>combatant.playCard())
    }
    getPlayerCombatantIndex(id){
        return this.playerCombatantIndex[id]
    }
    damageArea(damage,user,team,tilePosition,spec){
        for(let a=0,la=this.combatants.length;a<la;a++){
            let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.combatants[a])
            if(this.combatants[a].team!=team&&distance>=0&&distance<=1){
                this.combatants[a].takeDamage(damage,user,spec)
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
    statusAreaID2(name,amount,id,tilePosition){
        for(let a=0,la=this.combatants.length;a<la;a++){
            let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.combatants[a])
            if(this.combatants[a].id!=id&&distance>=0&&distance<=2){
                this.combatants[a].statusEffect(name,amount)
            }
        }
    }
    dropAreaID(variant,type,level,color,id,tilePosition){
        for(let a=0,la=this.combatants.length;a<la;a++){
            let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.combatants[a])
            if(this.combatants[a].id!=id&&(variant==0||this.combatants[a].blocked>0)&&distance>=0&&distance<=1&&this.combatants[a].team>0){
                this.battle.drop(this.combatants[a].id,type,level,color)
            }
        }
    }
    energyDownAreaID(effect,id,tilePosition){
        for(let a=0,la=this.combatants.length;a<la;a++){
            let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.combatants[a])
            if(this.combatants[a].id!=id&&distance>=0&&distance<=1&&this.combatants[a].team>0){
                this.battle.energy.temp[this.combatants[a].id]-=effect
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
    randomEffectArea(loop,type,args,team,tilePosition){
        for(let b=0,lb=loop;b<lb;b++){
            for(let a=0,la=this.combatants.length;a<la;a++){
                let distance=distTargetCombatant(0,{tilePosition:tilePosition},this.combatants[a])
                if(this.combatants[a].team!=team&&distance>=0&&distance<=1&&this.combatants[a].id<this.battle.players){
                    if(this.battle.cardManagers[this.combatants[a].id].reserve.cards.length>0){
                        this.battle.cardManagers[this.combatants[a].id].randomEffect(1,type,args)
                    }else{
                        this.battle.cardManagers[this.combatants[a].id].randomEffect(3,type,args)
                    }
                }
            }
        }
    }
    clearTile(tile){
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(this.combatants[a].tilePosition.x==tile.tilePosition.x&&this.combatants[a].tilePosition.y==tile.tilePosition.y){
                this.combatants[a].life=0
            }
        }
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
            if(this.combatants[a].team==0&&this.combatants[a].life>0){
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
    sort(){
        let list=[]
        for(let a=0,la=this.combatants.length;a<la;a++){
            if(!list.includes(this.combatants[a].position.y)){
                list.push(this.combatants[a].position.y)
            }
        }
        this.sorted=list.sort(function(a,b){return a-b})
    }
    display(scene){
        switch(scene){
            case 'battle':
                for(let a=0,la=this.sorted.length;a<la;a++){
                    for(let b=0,lb=this.combatants.length;b<lb;b++){
                        if(this.combatants[b].position.y==this.sorted[a]){
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