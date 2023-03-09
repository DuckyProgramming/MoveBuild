class group{
    constructor(layer,id){
        this.layer=layer
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
        this.cards.push(new card(this.layer,1200,500,type,level,color,game.id))
    }
    send(list,firstIndex,lastIndex){
        if(lastIndex==-1){
            for(let a=0,la=this.cards.length-firstIndex;a<la;a++){
                list.push(copyCard(this.cards[firstIndex]))
                this.cards.splice(firstIndex,1)
            }
        }else{
            for(let a=0,la=lastIndex-firstIndex;a<la;a++){
                list.push(copyCard(this.cards[firstIndex]))
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
        }
    }
    update(scene,args){
        switch(scene){
            case 'battle':
                let selected=false
                for(let a=0,la=this.cards.length;a<la;a++){
                    if(this.cards[a].select){
                        selected=true
                    }
                }
                for(let a=0,la=this.cards.length;a<la;a++){
                    this.cards[a].update(args[1])
                    if(this.cards[a].position.x>a*100+100&&(this.cards[a].position.x>this.cards[max(0,a-1)].position.x+100||a==0)){
                        this.cards[a].position.x-=20
                    }
                    if(pointInsideBox({position:inputs.rel},this.cards[a])&&!selected){
                        this.cards[a].upSize=true
                    }else{
                        this.cards[a].upSize=false
                    }
                    if(this.cards[a].size<=0&&!this.cards[a].usable){
                        if(this.cards[a].exhaust){
                            this.cards.splice(a,1)
                            a--
                            la--
                        }else{
                            this.send(args[0],a,a+1)
                            a--
                            la--
                        }
                    }
                }
            break
        }
    }
    onClick(scene,args){
        if(args[1].targetInfo[0]==0){
            switch(scene){
                case 'battle':
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},this.cards[a])&&this.cards[a].usable&&this.cards[a].afford){
                            for(let b=0,lb=args[0].combatants.length;b<lb;b++){
                                if(args[0].combatants[b].team==0){
                                    args[1].user=b
                                }
                            }
                            args[1].type=this.cards[a].attack
                            args[1].effect=this.cards[a].effect
                            this.cards[a].usable=false
                            if(this.cards[a].target[0]==0){
                                args[1].execute(args[0])
                                this.cards[a].deSize=true
                                args[2].main-=this.cards[a].cost
                            }else{
                                args[1].targetInfo=copyArray(this.cards[a].target)
                                args[1].cost=this.cards[a].cost
                                this.cards[a].select=true
                            }
                        }
                    }
                break
            }
        }else if(args[1].targetInfo[0]==2){
            for(let a=0,la=args[0].combatants.length;a<la;a++){
                if(args[0].combatants[a].life>0&&args[0].combatants[a].team!=args[0].combatants[args[1].user].team&&legalTargetCombatant(0,args[1].targetInfo[1],args[0].combatants[a],args[0].combatants[args[1].user])&&dist(inputs.rel.x,inputs.rel.y,args[0].combatants[a].position.x,args[0].combatants[a].position.y)<36){
                    args[1].targetInfo[0]=0
                    args[1].target[0]=a
                    args[1].execute(args[0])
                    args[2].main-=args[1].cost
                    for(let b=0,lb=this.cards.length;b<lb;b++){
                        if(!this.cards[b].usable){
                            this.cards[b].deSize=true
                        }
                    }
                }
            }
        }
    }
}