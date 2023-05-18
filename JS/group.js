class group{
    constructor(layer,battle,player,id){
        this.layer=layer
        this.battle=battle
        this.player=player
        this.id=id
        this.cards=[]
        this.removed=[]
        this.sorted=[]
        this.drawEffects=[]
        this.lastDuplicate=''

        this.reset()
    }
    initialCards(type,player){
        switch(type){
            case 0:
                for(let a=0,la=types.deck.start[player].length;a<la;a++){
                    this.add(findName(types.deck.start[player][a][0],types.card),types.deck.start[player][a][1],types.deck.start[player][a][2])
                }
                for(let a=0;a<8;a++){
                    //this.add(this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]][0][floor(random(0,this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]][0].length))],types.deck.start[player][0][1],types.deck.start[player][0][2])
                }
                for(let a=0;a<4;a++){
                    //this.add(this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]][1][floor(random(0,this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]][1].length))],types.deck.start[player][0][1],types.deck.start[player][0][2])
                }
                for(let a=1,la=types.card.length-2;a<la;a++){
                    //this.add(a,0,0)
                }
                /**/
            break
        }
    }
    reset(){
        this.cancel()
        this.anim={discard:0,exhaust:0,reserve:0,duplicate:0}
    }
    cancel(){
        this.status={discard:0,exhaust:0,reserve:0,duplicate:0}
    }
    add(type,level,color){
        game.id++
        if(types.card[type].list==game.playerNumber+2&&this.battle.relicManager.hasRelic(66,this.player)){
            this.battle.relicManager.active[66]--
            if(this.battle.relicManager.active[66]<=0){
                this.battle.relicManager.deactivate(66)
            }
        }else{
            this.cards.push(new card(this.layer,this.battle,this.player,1200,500,type,level,color,game.id))
            if(this.battle.initialized&&this.id==0){
                if(
                    this.cards[this.cards.length-1].class==1&&this.battle.relicManager.hasRelic(12,this.player)||
                    this.cards[this.cards.length-1].class==2&&this.battle.relicManager.hasRelic(13,this.player)||
                    this.cards[this.cards.length-1].class==3&&this.battle.relicManager.hasRelic(14,this.player)||
                    this.cards[this.cards.length-1].class==4&&this.battle.relicManager.hasRelic(15,this.player)){
                    this.cards[this.cards.length-1]=upgradeCard(this.cards[this.cards.length-1])
                }
                this.battle.relicManager.activate(5,[this.player])
                if(types.card[type].rarity>=0||types.card[type].list>=0){
                    this.battle.stats.card[this.player]++
                }
            }
        }
    }
    addDrop(type,level,color){
        game.id++
        this.cards.push(new card(this.layer,this.battle,this.player,40,-100-this.cards.length*200,type,level,color,game.id))
        this.cards[this.cards.length-1].downSize=true
    }
    addShuffle(type,level,color){
        this.add(type,level,color)
        this.cards.splice(floor(random(0,this.cards.length-1)),0,this.cards[this.cards.length-1])
        this.cards.splice(this.cards.length-1,1)
    }
    resetAnim(){
        for(let a=0,la=this.cards.length;a<la;a++){
            this.cards[a].select=false
            this.cards[a].anim.select=0
        }
    }
    discard(amount){
        this.status.discard+=amount
    }
    exhaust(amount){
        this.status.exhaust+=amount
    }
    exhaustAny(){
        this.status.exhaust=-1
    }
    reserve(amount){
        this.status.reserve+=amount
    }
    duplicate(amount){
        this.status.duplicate+=amount
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
    allEffect(effect){
        if(effect==1){
            this.cancel()
            if(this.battle.relicManager.hasRelic(51,this.player)){
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.cards.length)
            }
        }
        let total=0
        for(let a=0,la=this.cards.length;a<la;a++){
            switch(effect){
                case 0:
                    if(!this.cards[a].spec.includes(2)){
                        this.cards[a].deSize=true
                    }
                break
                case 1:
                    this.cards[a].callDiscardEffect()
                    if(this.cards[a].spec.includes(4)){
                        this.cards[a].deSize=true
                        this.cards[a].exhaust=true
                    }else if(this.cards[a].spec.includes(2)||this.battle.relicManager.hasRelic(128,this.player)){
                        total++
                    }else{
                        this.cards[a].deSize=true
                    }
                break
                case 2:
                    this.cards[a].deSize=true
                break
                case 3:
                    this.cards[a].deSize=true
                    this.cards[a].discardEffect.push(0)
                break
                case 4:
                    this.cards[a]=upgradeCard(this.cards[a])
                break
                case 5:
                    this.cards[a].cost=floor(random(0,4))
                break
                case 6:
                    if(this.cards[a].basic){
                        this.cards[a]=upgradeCard(this.cards[a])
                    }
                break
                case 7:
                    this.copySelf(a)
                    a++
                    la++
                break
                case 8:
                    if(this.cards[a].name=='Fatigue'){
                        this.cards[a].deSize=true
                        this.cards[a].exhaust=true
                    }
                break
            }
        }
        if(effect==1&&this.battle.relicManager.hasRelic(53,this.player)){
            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.cards.length)
        }
        if(effect==1&&total>0&&this.battle.relicManager.hasRelic(76,this.player)){
            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(4*total)
        }
    }
    randomEffect(effect,args){
        if(this.cards.length>0){
            let list=[]
            for(let a=0,la=this.cards.length;a<la;a++){
                if(this.cards[a].usable
                &&!((this.cards[a].cost<=0||this.cards[a].spec.includes(5))&&(effect==1||effect==5))
                &&!((this.cards[a].cost<0||this.cards[a].spec.includes(5))&&effect==7)
                &&!((this.cards[a].level>=types.card[this.cards[a].type].levels.length-1||this.cards[a].class!=args[0]&&args[0]!=0)&&effect==2)
                &&!((this.cards[a].level==0||this.cards[a].class!=args[0]&&args[0]!=0)&&effect==3)){
                    list.push(a)
                }
            }
            if(list.length>0){
                let index=list[floor(random(0,list.length))]
                switch(effect){
                    case 0:
                        if(!this.cards[index].spec.includes(2)){
                            this.cards[index].deSize=true
                        }
                    break
                    case 1:
                        this.cards[index].cost=max(this.cards[index].cost-args[0],0)
                    break
                    case 2:
                        this.cards[index]=upgradeCard(this.cards[index])
                    break
                    case 3:
                        this.cards[index]=unupgradeCard(this.cards[index])
                    break
                    case 4:
                        this.copySelf(index)
                    break
                    case 5:
                        this.cards[index].cost=0
                    break
                    case 6:
                        this.cards.splice(index,1)
                    break
                    case 7:
                        this.cards[index].cost+=args[0]
                    break
                }
            }
        }
    }
    drawEffect(attack,effect){
        switch(attack){
            case -3:
                this.status.exhaust+=effect[0]
            break
            case -6:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Weak',effect[0])
            break
            case -12:
                this.drawEffects.push([0,7,[effect[0]]])
            break
        }
    }
    deathEffect(){
        for(let a=0,la=this.cards.length;a<la;a++){
            switch(this.cards[a].attack){
                case -8:
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].takeDamage(this.cards[a].effect[0],-1)
                break
            }
        }
    }
    send(list,firstIndex,lastIndex,spec,parent){
        if(lastIndex==-1){
            for(let a=0,la=this.cards.length-firstIndex;a<la;a++){
                list.push(copyCard(this.cards[firstIndex]))
                list[list.length-1].size=0
                if(spec==1||spec==2||spec==3||spec==4||spec==5){
                    list[list.length-1].position.x=1200
                    list[list.length-1].position.y=500
                    if(spec==2){
                        list[list.length-1].cost=list[list.length-1].base.cost
                    }
                    if(spec==3){
                        this.drawEffect(list[list.length-1].attack,list[list.length-1].effect)
                    }
                    if(spec==4){
                        list[list.length-1].cost=0
                    }
                    if(spec==5){
                        this.drawEffect(list[list.length-1].attack,list[list.length-1].effect)
                        list[list.length-1].cost=0
                    }
                }
                delete this.cards[firstIndex]
                this.cards.splice(firstIndex,1)
            }
        }else{
            for(let a=0,la=lastIndex-firstIndex;a<la;a++){
                list.push(copyCard(this.cards[firstIndex]))
                list[list.length-1].size=0
                if(spec==1||spec==2||spec==3||spec==4||spec==5){
                    list[list.length-1].position.x=1200
                    list[list.length-1].position.y=500
                    if(spec==2){
                        list[list.length-1].cost=list[list.length-1].base.cost
                    }
                    if(spec==3){
                        this.drawEffect(list[list.length-1].attack,list[list.length-1].effect)
                    }
                    if(spec==4){
                        list[list.length-1].cost=0
                    }
                    if(spec==5){
                        this.drawEffect(list[list.length-1].attack,list[list.length-1].effect)
                        list[list.length-1].cost=0
                    }
                }
                delete this.cards[firstIndex]
                this.cards.splice(firstIndex,1)
            }
        }
        if(this.drawEffects.length>0){
            for(let a=0,la=this.drawEffects.length;a<la;a++){
                switch(this.drawEffects[a][0]){
                    case 0:
                        parent.randomEffect(this.drawEffects[a][1],this.drawEffects[a][2])
                    break
                }
            }
            this.drawEffects=[]
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
    copySelf(index){
        game.id++
        this.lastDuplicate=this.cards[index].name
        this.cards.splice(index,0,copyCard(this.cards[index]))
        this.cards[index+1].id=game.id
    }
    copySelfInput(index){
        game.id++
        this.cards.splice(this.cards.length,0,copyCard(this.cards[index]))
        this.cards[this.cards.length-1].position.x=1200
        this.cards[this.cards.length-1].position.y=500
        this.cards[index+1].id=game.id
    }
    sort(){
        let names=[]
        for(let a=0,la=this.cards.length;a<la;a++){
            if(!names.includes(this.cards[a].name)){
                names.push(this.cards[a].name)
            }
        }
        this.sorted=names.sort()
    }
    remove(index){
        let possible=!this.cards[index].spec.includes(7)
        if(possible){
            this.removed.push(copyCard(this.cards[index]))
            if(this.cards[index].attack==-10){
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].loseMaxHP(this.cards[index].effect[0])
            }
            this.cards.splice(index,1)
        }
        return possible
    }
    unremove(){
        this.cards.push(this.removed[this.removed.length-1])
        this.removed.splice(this.removed.length-1,1)
    }
    removeType(type){
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].type==type){
                this.cards.splice(a,1)
                break
            }
        }
    }
    removeCurse(){
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].class==6){
                this.cards.splice(a,1)
                break
            }
        }
    }
    removeRarity(rarity){
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].rarity==rarity){
                this.cards.splice(a,1)
                break
            }
        }
    }
    removeAllCurse(){
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].class==6){
                this.cards.splice(a,1)
                a--
                la--
            }
        }
    }
    removeAllName(name){
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].name==name){
                this.cards.splice(a,1)
                a--
                la--
            }
        }
    }
    unDuplicate(){
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].name==this.lastDuplicate){
                this.cards.splice(a,1)
                break
            }
        }
    }
    unInnate(){
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].additionalSpec.includes(3)){
                this.cards[a].spec.splice(this.cards[a].spec.indexOf(3),1)
                this.cards[a].additionalSpec.splice(this.cards[a].additionalSpec.indexOf(3),1)
            }
        }
    }
    cost(cost,cardClass){
        if(cost!=0){
            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
            if(cardClass==1&&userCombatant.status.main[22]>0){
                userCombatant.status.main[22]--
            }else if(userCombatant.status.main[27]>0){
                userCombatant.status.main[27]--
            }else{
                if(cost==-1){
                    this.battle.energy.main[this.player]=0
                }else{
                    this.battle.energy.main[this.player]-=cost
                }
            }
        }
    }
    display(scene,args){
        switch(scene){
            case 'battle':
                for(let a=0,la=this.cards.length;a<la;a++){
                    if(this.cards[a].size<=1){
                        this.cards[a].display()
                        this.cards[a].displayStatus([this.anim.discard,this.anim.exhaust,this.anim.reserve,this.anim.duplicate])
                    }
                }
                for(let a=0,la=this.cards.length;a<la;a++){
                    if(this.cards[a].size>1){
                        this.cards[a].display()
                        this.cards[a].displayStatus([this.anim.discard,this.anim.exhaust,this.anim.reserve,this.anim.duplicate])
                    }
                }
            break
            case 'drop':
                this.cards.forEach(card=>card.display())
            break
            case 'overlay':
                if(args[0]==0){
                    this.sort()
                    let position=0
                    for(let a=0,la=this.sorted.length;a<la;a++){
                        for(let b=0,lb=this.cards.length;b<lb;b++){
                            if(this.cards[b].name==this.sorted[a]){
                                this.cards[b].deSize=!(position>=args[1]*15&&position<args[1]*15+15)
                                this.cards[b].fade=1
                                this.cards[b].position.x=this.layer.width/2-200+position%5*100
                                this.cards[b].position.y=this.layer.height/2-130+floor(position/5)%3*130
                                this.cards[b].anim.afford=1
                                if(this.cards[b].size>=0){
                                    this.cards[b].display()
                                }
                                position++
                            }
                        }
                    }
                }else{
                    for(let a=0,la=this.cards.length;a<la;a++){
                        this.cards[a].deSize=!(a>=args[1]*15&&a<args[1]*15+15)
                        this.cards[a].fade=1
                        this.cards[a].position.x=this.layer.width/2-200+a%5*100
                        this.cards[a].position.y=this.layer.height/2-130+floor(a/5)%3*130
                        this.cards[a].anim.afford=1
                        if(this.cards[a].size>=0){
                            this.cards[a].display()
                        }
                    }
                }
            break
        }
    }
    callInput(type,a){
        switch(type){
            case 0:
                this.battle.attackManager.type=this.cards[a].attack
                this.battle.attackManager.effect=copyArray(this.cards[a].effect)
                this.battle.attackManager.attackClass=this.cards[a].class
                this.battle.attackManager.player=this.player
                if(this.cards[a].strike&&this.battle.relicManager.hasRelic(50,this.player)&&this.battle.attackManager.effect.length>0){
                    this.battle.attackManager.effect[0]+=2
                }
                this.cards[a].usable=false
                if(this.status.duplicate>0){
                    this.status.duplicate--
                    this.copySelfInput(a)
                }
                if(this.cards[a].target[0]==0){
                    this.callInput(5,0)
                    this.battle.attackManager.execute()
                    let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                    if(userCombatant.status.main[23]>0){
                        userCombatant.status.main[23]--
                        this.cards[a].usable=true
                    }else{
                        this.cards[a].deSize=true
                    }
                    this.cost(this.cards[a].cost,this.cards[a].class)
                    if(this.cards[a].spec.includes(1)||this.cards[a].spec.includes(5)||this.battle.relicManager.hasRelic(11,this.player)){
                        this.cards[a].exhaust=true
                    }
                    this.cards.forEach(card=>card.anotherPlayed())
                    this.battle.playCard(this.cards[a],this.player)
                }else{
                    this.battle.attackManager.targetInfo=copyArray(this.cards[a].target)
                    this.battle.attackManager.targetDistance=0
                    this.battle.attackManager.cost=this.cards[a].cost
                    this.cards[a].select=true
                    this.callInput(5,0)
                }
            break
            case 1:
                this.battle.attackManager.targetInfo[0]=0
                this.cards[a].select=false
                this.cards[a].usable=true
                this.battle.updateTargetting()
            break
            case 2:
                this.battle.combatantManager.combatants[this.battle.attackManager.user].goal.anim.direction=round(atan2(this.battle.tileManager.tiles[a].relativePosition.x-this.battle.attackManager.relativePosition.x,this.battle.tileManager.tiles[a].relativePosition.y-this.battle.attackManager.relativePosition.y)/60-1/2)*60+30
                this.battle.attackManager.targetDistance=distTargetCombatant(0,this.battle.tileManager.tiles[a],this.battle.attackManager)
                this.battle.attackManager.targetInfo[0]=0
                this.battle.attackManager.targetClass=1
                this.battle.attackManager.target[0]=a
                this.battle.attackManager.execute()
                this.cost(this.battle.attackManager.cost,this.battle.attackManager.attackClass)
                this.battle.updateTargetting()
                for(let b=0,lb=this.cards.length;b<lb;b++){
                    if(!this.cards[b].usable){
                        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                        if(userCombatant.status.main[23]>0){
                            userCombatant.status.main[23]--
                            this.cards[b].usable=true
                            this.cards[b].select=false
                        }else{
                            this.cards[b].deSize=true
                            if(this.cards[b].spec.includes(1)||this.cards[b].spec.includes(5)||this.battle.relicManager.hasRelic(11,this.player)){
                                this.cards[b].exhaust=true
                            }
                        }
                        this.cards.forEach(card=>card.anotherPlayed())
                        this.battle.playCard(this.cards[b],this.player)
                    }
                }
            break
            case 3:
                this.battle.combatantManager.combatants[this.battle.attackManager.user].goal.anim.direction=round(atan2(this.battle.combatantManager.combatants[a].relativePosition.x-this.battle.attackManager.relativePosition.x,this.battle.combatantManager.combatants[a].relativePosition.y-this.battle.attackManager.relativePosition.y)/60-1/2)*60+30
                this.battle.attackManager.targetDistance=distTargetCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager)
                this.battle.attackManager.targetInfo[0]=0
                this.battle.attackManager.targetClass=2
                this.battle.attackManager.target[0]=a
                this.battle.attackManager.execute()
                this.cost(this.battle.attackManager.cost,this.battle.attackManager.attackClass)
                this.battle.updateTargetting()
                for(let b=0,lb=this.cards.length;b<lb;b++){
                    if(!this.cards[b].usable){
                        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                        if(userCombatant.status.main[23]>0){
                            userCombatant.status.main[23]--
                            this.cards[b].usable=true
                            this.cards[b].select=false
                        }else{
                            this.cards[b].deSize=true
                            if(this.cards[b].spec.includes(1)||this.cards[b].spec.includes(5)||this.battle.relicManager.hasRelic(11,this.player)){
                                this.cards[b].exhaust=true
                            }
                        }
                        this.cards.forEach(card=>card.anotherPlayed())
                        this.battle.playCard(this.cards[b],this.player)
                    }
                }
            break
            case 4:
                this.cards[a].deSize=true
                if(this.status.discard>0){
                    this.status.discard--
                }
            break
            case 5:
                this.battle.attackManager.user=this.battle.combatantManager.getPlayerCombatantIndex(this.player)
                this.battle.attackManager.energy=this.battle.energy.main[this.player]+(this.battle.relicManager.hasRelic(121,this.player)?2:0)
                this.battle.attackManager.position.x=this.battle.combatantManager.combatants[this.battle.attackManager.user].position.x
                this.battle.attackManager.position.y=this.battle.combatantManager.combatants[this.battle.attackManager.user].position.y
                this.battle.attackManager.relativePosition.x=this.battle.combatantManager.combatants[this.battle.attackManager.user].relativePosition.x
                this.battle.attackManager.relativePosition.y=this.battle.combatantManager.combatants[this.battle.attackManager.user].relativePosition.y
                this.battle.attackManager.tilePosition.x=this.battle.combatantManager.combatants[this.battle.attackManager.user].tilePosition.x
                this.battle.attackManager.tilePosition.y=this.battle.combatantManager.combatants[this.battle.attackManager.user].tilePosition.y
                this.battle.updateTargetting()
            break
            case 6:
                this.battle.attackManager.type=a[0]
                this.battle.attackManager.effect=a[1]
                this.battle.attackManager.attackClass=a[2]
                if(a[3][0]==0){
                    this.callInput(5,0)
                    this.battle.attackManager.execute()
                }else{
                    this.battle.attackManager.targetInfo=copyArray(a[3])
                    this.battle.attackManager.targetDistance=0
                    this.battle.attackManager.cost=0
                    this.callInput(5,0)
                }
            break
            case 7:
                for(let a=0,la=this.cards.length;a<la;a++){
                    if(!this.cards[a].usable){
                        this.cards[a].select=false
                        this.cards[a].usable=true
                    }
                }
            break
            case 8:
                this.cards[a].deSize=true
                this.cards[a].exhaust=true
                if(this.status.exhaust>0){
                    this.status.exhaust--
                }
            break
            case 9:
                this.cards[a].deSize=true
                this.cards[a].discardEffect.push(1)
                if(this.status.reserve>0){
                    this.status.reserve--
                }
            break
        }
    }
    update(scene,args){
        switch(scene){
            case 'battle':
                this.anim.discard=smoothAnim(this.anim.discard,this.status.discard!=0,0,1,5)
                this.anim.exhaust=smoothAnim(this.anim.exhaust,this.status.exhaust!=0,0,1,5)
                this.anim.reserve=smoothAnim(this.anim.reserve,this.status.reserve!=0,0,1,5)
                this.anim.duplicate=smoothAnim(this.anim.duplicate,this.status.duplicate!=0,0,1,5)
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
                    this.cards[a].upSize=pointInsideBox({position:inputs.rel},this.cards[a])&&!this.battle.overlayManager.anyActive&&!selected
                    if(this.cards[a].size<=0){
                        if(this.cards[a].discardEffect.length>0){
                            this.cards[a].deSize=false
                            if(this.cards[a].discardEffect.includes(0)){
                                this.cards[a]=upgradeCard(this.cards[a])
                                this.cards[a].discardEffect=[]
                            }
                            if(this.cards[a].discardEffect.includes(1)){
                                this.cards[a].cost=0
                                this.cards[a].discardEffect=[]
                                this.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1)
                                a--
                                la--
                            }
                        }else if(this.cards[a].exhaust){
                            if(this.cards[a].class!=5&&!this.cards[a].spec.includes(4)){
                                this.battle.relicManager.activate(10,[this.player])
                            }
                            this.send(this.battle.cardManagers[this.player].exhaust.cards,a,a+1)
                            a--
                            la--
                        }else{
                            this.send(this.battle.cardManagers[this.player].discard.cards,a,a+1)
                            a--
                            la--
                        }
                    }
                }
                if(this.battle.turn.main==this.player&&this.cards.length==0&&this.battle.relicManager.hasRelic(54,this.player)){
                    this.battle.cardManagers[this.player].draw(1)
                }
            break
            case 'drop':
                for(let a=0,la=this.cards.length;a<la;a++){
                    this.cards[a].update()
                    this.cards[a].position.y+=20
                    if(this.cards[a].position.y>this.layer.height+100){
                        delete this.cards[a]
                        this.cards.splice(a,1)
                        a--
                        la--
                    }
                }
            break
            case 'overlay':
                this.cards.forEach(card=>card.update())
            break
        }
    }
    onClick(scene){
        if(this.battle.attackManager.targetInfo[0]==1||this.battle.attackManager.targetInfo[0]==3||this.battle.attackManager.targetInfo[0]==4||this.battle.attackManager.targetInfo[0]==6){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==2||this.battle.attackManager.targetInfo[0]==3||this.battle.attackManager.targetInfo[0]==5){
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team!=this.battle.combatantManager.combatants[this.battle.attackManager.user].team&&
                    (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],this.battle.relicManager.hasRelic(145,this.player)?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<game.targetRadius){
                    this.callInput(3,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==4){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&legalTargetCombatant(1,this.battle.attackManager.targetInfo[1]+1,this.battle.attackManager.targetInfo[2]+1,this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)&&dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==7){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(0,1,this.battle.energy.main[this.battle.attackManager.player]+this.battle.attackManager.targetInfo[1]+(this.battle.relicManager.hasRelic(121,this.battle.attackManager.player)?2:0),this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==8){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if((legalTargetCombatant(2,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles))&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==9){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==0){
            switch(scene){
                case 'battle':
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},this.cards[a])){
                            if(this.status.discard!=0){
                                this.callInput(4,a)
                                break
                            }
                            if(this.status.exhaust!=0){
                                this.callInput(8,a)
                                break
                            }
                            if(this.status.reserve!=0){
                                this.callInput(9,a)
                                break
                            }
                            if(this.cards[a].usable&&this.battle.attackManager.attacks.length<=0&&this.cards[a].playable()){
                                if(this.cards[a].afford){
                                    this.callInput(0,a)
                                }else{
                                    this.battle.anim.upAfford=true
                                }
                            }
                        }
                    }
                break
            }
        }else{
            for(let a=0,la=this.cards.length;a<la;a++){
                if(pointInsideBox({position:inputs.rel},this.cards[a])&&!this.cards[a].usable){
                    this.callInput(1,a)
                }
            }
        }
    }
    onKey(scene,key,code){
        if(this.battle.attackManager.targetInfo[0]==1||this.battle.attackManager.targetInfo[0]==3||this.battle.attackManager.targetInfo[0]==4||this.battle.attackManager.targetInfo[0]==6){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1,int(inputs.lastKey[1])-1)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1,int(inputs.lastKey[1])-1)
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==2||this.battle.attackManager.targetInfo[0]==3||this.battle.attackManager.targetInfo[0]==5){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&key==' '){
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team!=this.battle.combatantManager.combatants[this.battle.attackManager.user].team&&
                        (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],this.battle.relicManager.hasRelic(145,this.player)?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.combatantManager.combatants)||this.battle.attackManager.targetInfo[0]==5)&&
                        this.battle.combatantManager.combatants[a].tilePosition.x==int(inputs.lastKey[0])-1&&this.battle.combatantManager.combatants[a].tilePosition.y==int(inputs.lastKey[1])-1){
                        this.callInput(3,a)
                    }
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==4){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1,int(inputs.lastKey[1])-1)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1,int(inputs.lastKey[1])-1)
                if(this.battle.tileManager.tiles[a].occupied==0&&legalTargetCombatant(1,this.battle.attackManager.targetInfo[1]+1,this.battle.attackManager.targetInfo[2]+1,this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==9){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1,int(inputs.lastKey[1])-1)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1,int(inputs.lastKey[1])-1)
                this.callInput(2,a)
            }
        }
        if(this.battle.attackManager.targetInfo[0]==0){
            switch(scene){
                case 'battle':
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if((int(key)+9)%10==a){
                            if(this.status.discard!=0){
                                this.callInput(4,a)
                                break
                            }
                            if(this.status.exhaust!=0){
                                this.callInput(8,a)
                                break
                            }
                            if(this.status.reserve!=0){
                                this.callInput(9,a)
                                break
                            }
                            if(this.cards[a].usable&&this.battle.attackManager.attacks.length<=0&&this.cards[a].playable()){
                                if(this.cards[a].afford){
                                    this.callInput(0,a)
                                    break
                                }else{
                                    this.battle.anim.upAfford=true
                                }
                            }
                        }
                    }
                break
            }
        }else{
            let allUsable=true
            for(let a=0,la=this.cards.length;a<la;a++){
                if(!this.cards[a].usable){
                    allUsable=false
                    if(code==BACKSPACE||key==inputs.above[a]){
                        this.callInput(1,a)
                    }
                }
            }
            if(allUsable&&code==BACKSPACE){
                this.battle.attackManager.targetInfo[0]=0
            }
        }
    }
}