class group{
    constructor(layer,battle,id){
        this.layer=layer
        this.battle=battle
        this.id=id
        this.cards=[]
    }
    initialCards(type,player){
        switch(type){
            case 0:
                for(let a=0,la=types.deck.start[player].length;a<la;a++){
                    this.add(findName(types.deck.start[player][a][0],types.card),types.deck.start[player][a][1],types.deck.start[player][a][2])
                }
            break
        }
    }
    add(type,level,color){
        game.id++
        this.cards.push(new card(this.layer,this.battle,1200,500,type,level,color,game.id))
    }
    addDrop(type,level,color){
        game.id++
        this.cards.push(new card(this.layer,this.battle,40,-100,type,level,color,game.id))
        this.cards[this.cards.length-1].downSize=true
    }
    shuffle(){
        let cards=[]
        while(this.cards.length>0){
            cards.push(copyCard(this.cards[0]))
            this.cards.splice(0,1)
        }
        while(cards.length>0){
            let index=floor(random(0,cards.length))
            this.cards.push(copyCard(cards[index]))
            cards.splice(index,1)
        }
    }
    send(list,firstIndex,lastIndex,spec){
        if(lastIndex==-1){
            for(let a=0,la=this.cards.length-firstIndex;a<la;a++){
                list.push(copyCard(this.cards[firstIndex]))
                if(spec==1){
                    list[list.length-1].position.x=1200
                    list[list.length-1].position.y=500
                }
                this.cards.splice(firstIndex,1)
            }
        }else{
            for(let a=0,la=lastIndex-firstIndex;a<la;a++){
                list.push(copyCard(this.cards[firstIndex]))
                if(spec==1){
                    list[list.length-1].position.x=1200
                    list[list.length-1].position.y=500
                }
                this.cards.splice(firstIndex,1)
            }
        }
    }
    copy(list,firstIndex,lastIndex){
        if(lastIndex==-1){
            for(let a=0,la=this.cards.length-firstIndex;a<la;a++){
                list.push(copyCard(this.cards[firstIndex+a]))
            }
        }else{
            for(let a=0,la=lastIndex-firstIndex+1;a<la;a++){
                list.push(copyCard(this.cards[firstIndex+a]))
            }
        }
    }
    display(scene){
        switch(scene){
            case 'battle':
                for(let a=0,la=this.cards.length;a<la;a++){
                    if(this.cards[a].size<=1){
                        this.cards[a].display()
                    }
                }
                for(let a=0,la=this.cards.length;a<la;a++){
                    if(this.cards[a].size>1){
                        this.cards[a].display()
                    }
                }
            break
            case 'drop':
                for(let a=0,la=this.cards.length;a<la;a++){
                    this.cards[a].display()
                }
            break
        }
    }
    update(scene){
        switch(scene){
            case 'battle':
                let selected=false
                for(let a=0,la=this.cards.length;a<la;a++){
                    if(this.cards[a].select){
                        selected=true
                    }
                }
                for(let a=0,la=this.cards.length;a<la;a++){
                    this.cards[a].update()
                    if(this.cards[a].position.x>a*100+100&&(this.cards[a].position.x>this.cards[max(0,a-1)].position.x+100||a==0)){
                        this.cards[a].position.x-=20
                    }
                    if(pointInsideBox({position:inputs.rel},this.cards[a])&&!selected){
                        this.cards[a].upSize=true
                    }else{
                        this.cards[a].upSize=false
                    }
                    if(this.cards[a].size<=0&&!this.cards[a].usable){
                        if(this.cards[a].spec.includes(1)){
                            this.cards.splice(a,1)
                            a--
                            la--
                        }else{
                            this.send(this.battle.cardManager.discard.cards,a,a+1)
                            a--
                            la--
                        }
                    }
                }
            break
            case 'drop':
                for(let a=0,la=this.cards.length;a<la;a++){
                    this.cards[a].update()
                    this.cards[a].position.y+=20
                    if(this.cards[a].position.y>this.layer.height+100){
                        this.cards.splice(a,1)
                        a--
                        la--
                    }
                }
            break
        }
    }
    callInput(type,a){
        switch(type){
            case 0:
                this.battle.attackManager.user=this.battle.combatantManager.getPlayerCombatant()
                this.battle.attackManager.type=this.cards[a].attack
                this.battle.attackManager.effect=this.cards[a].effect
                this.battle.attackManager.position.x=this.battle.combatantManager.combatants[this.battle.attackManager.user].position.x
                this.battle.attackManager.position.y=this.battle.combatantManager.combatants[this.battle.attackManager.user].position.y
                this.battle.attackManager.relativePosition.x=this.battle.combatantManager.combatants[this.battle.attackManager.user].relativePosition.x
                this.battle.attackManager.relativePosition.y=this.battle.combatantManager.combatants[this.battle.attackManager.user].relativePosition.y
                this.battle.attackManager.tilePosition.x=this.battle.combatantManager.combatants[this.battle.attackManager.user].tilePosition.x
                this.battle.attackManager.tilePosition.y=this.battle.combatantManager.combatants[this.battle.attackManager.user].tilePosition.y
                this.cards[a].usable=false
                if(this.cards[a].target[0]==0){
                    this.battle.attackManager.execute()
                    this.cards[a].deSize=true
                    this.battle.energy.main-=this.cards[a].cost
                    if(this.cards[a].spec.includes(0)){
                        this.battle.cardManager.fatigue()
                    }
                }else{
                    this.battle.attackManager.targetInfo=copyArray(this.cards[a].target)
                    this.battle.attackManager.targetDistance=0
                    this.battle.attackManager.cost=this.cards[a].cost
                    this.cards[a].select=true
                }
            break
            case 1:
                this.battle.attackManager.targetInfo[0]=0
                this.cards[a].upSize=false
                this.cards[a].select=false
                this.cards[a].usable=true
            break
            case 2:
                this.battle.combatantManager.combatants[this.battle.attackManager.user].goal.anim.direction=atan2(this.battle.tileManager.tiles[a].relativePosition.x-this.battle.attackManager.relativePosition.x,this.battle.tileManager.tiles[a].relativePosition.y-this.battle.attackManager.relativePosition.y)
                this.battle.attackManager.targetDistance=distTargetCombatant(0,this.battle.tileManager.tiles[a],this.battle.attackManager)
                this.battle.attackManager.targetInfo[0]=0
                this.battle.attackManager.target[0]=a
                this.battle.attackManager.execute()
                this.battle.energy.main-=this.battle.attackManager.cost
                for(let b=0,lb=this.cards.length;b<lb;b++){
                    if(!this.cards[b].usable){
                        this.cards[b].deSize=true
                        if(this.cards[b].spec.includes(0)){
                            this.battle.cardManager.fatigue()
                        }
                    }
                }
            break
            case 3:
                this.battle.combatantManager.combatants[this.battle.attackManager.user].goal.anim.direction=atan2(this.battle.combatantManager.combatants[a].relativePosition.x-this.battle.attackManager.relativePosition.x,this.battle.combatantManager.combatants[a].relativePosition.y-this.battle.attackManager.relativePosition.y)
                this.battle.attackManager.targetDistance=distTargetCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager)
                this.battle.attackManager.targetInfo[0]=0
                this.battle.attackManager.target[0]=a
                this.battle.attackManager.execute()
                this.battle.energy.main-=this.battle.attackManager.cost
                for(let b=0,lb=this.cards.length;b<lb;b++){
                    if(!this.cards[b].usable){
                        this.cards[b].deSize=true
                        if(this.cards[b].spec.includes(0)){
                            this.battle.cardManager.fatigue()
                        }
                    }
                }
            break
        }
    }
    onClick(scene){
        if(this.battle.attackManager.targetInfo[0]==0){
            switch(scene){
                case 'battle':
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},this.cards[a])&&this.cards[a].usable&&this.cards[a].afford){
                            this.callInput(0,a)
                        }
                    }
                break
            }
        }else if(this.battle.attackManager.targetInfo[0]==1){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(!this.battle.tileManager.tiles[a].occupied&&legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)&&dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
            for(let a=0,la=this.cards.length;a<la;a++){
                if(pointInsideBox({position:inputs.rel},this.cards[a])&&!this.cards[a].usable&&this.cards[a].afford){
                    this.callInput(1,a)
                }
            }
        }else if(this.battle.attackManager.targetInfo[0]==2){
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team!=this.battle.combatantManager.combatants[this.battle.attackManager.user].team&&legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)&&dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<game.targetRadius){
                    this.callInput(3,a)
                }
            }
            for(let a=0,la=this.cards.length;a<la;a++){
                if(pointInsideBox({position:inputs.rel},this.cards[a])&&!this.cards[a].usable&&this.cards[a].afford){
                    this.callInput(1,a)
                }
            }
        }
    }
    onKey(scene,key,code){
        if(this.battle.attackManager.targetInfo[0]==0){
            switch(scene){
                case 'battle':
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if((int(key)+9)%10==a&&this.cards[a].usable&&this.cards[a].afford){
                            this.callInput(0,a)
                        }
                    }
                break
            }
        }else if(this.battle.attackManager.targetInfo[0]==1){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1,int(inputs.lastKey[1])-1)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1,int(inputs.lastKey[1])-1)
                if(!this.battle.tileManager.tiles[a].occupied&&legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)){
                    this.callInput(2,a)
                }
            }
            for(let a=0,la=this.cards.length;a<la;a++){
                if(!this.cards[a].usable&&this.cards[a].afford&&(code==BACKSPACE||key==inputs.above[a])){
                    this.callInput(1,a)
                }
            }
        }else if(this.battle.attackManager.targetInfo[0]==2){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&key==' '){
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team!=this.battle.combatantManager.combatants[this.battle.attackManager.user].team&&legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.combatantManager.combatants)&&this.battle.combatantManager.combatants[a].tilePosition.x==int(inputs.lastKey[0])-1&&this.battle.combatantManager.combatants[a].tilePosition.y==int(inputs.lastKey[1])-1){
                        this.callInput(3,a)
                    }
                }
            }
            for(let a=0,la=this.cards.length;a<la;a++){
                if(!this.cards[a].usable&&this.cards[a].afford&&(code==BACKSPACE||key==inputs.above[a])){
                    this.callInput(1,a)
                }
            }
        }
    }
}