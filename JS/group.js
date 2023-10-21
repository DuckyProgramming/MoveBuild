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
        this.spec=[]
        this.target=[]
        this.lastDuplicate=''
        this.lastPlayed=[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]
        this.compact=false
        this.sevens=0

        this.reset()
    }
    initialCards(type,player){
        switch(type){
            case 0:
                if(game.dev){
                    for(let a=0,la=6;a<la;a++){
                        this.add(this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]][3][this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]][3].length-1-a],0,this.battle.player[this.player])
                    }
                }else{
                    for(let a=0,la=types.deck.start[game.ascend>=20?1:0].length;a<la;a++){
                        this.add(findName(types.deck.start[game.ascend>=20?1:0][a][0],types.card),types.deck.start[game.ascend>=20?1:0][a][1],types.deck.start[game.ascend>=20?1:0][a][2]==-2?types.card[findName(types.deck.start[game.ascend>=20?1:0][a][0],types.card)].list:types.deck.start[game.ascend>=20?1:0][a][2]==-1?player:types.deck.start[game.ascend>=20?1:0][a][2])
                    }
                }
            break
            case 1:
                this.battle.overlayManager.overlays[25][this.player].active=true
                this.battle.overlayManager.overlays[25][this.player].activate([0,[
                    {type:1,value:[0,0,0]},
                    {type:1,value:[0,0,0]},
                    {type:1,value:[0,0,0]},
                    {type:1,value:[0,0,0]},
                    {type:1,value:[0,0,0]},
                    {type:1,value:[0,0,0]},
                    {type:1,value:[0,0,0]},
                    {type:1,value:[0,0,0]},
                    {type:1,value:[0,0,0]},
                    {type:1,value:[0,0,0]},
                    {type:1,value:[0,0,0]},
                    {type:1,value:[0,0,0]},
                    {type:1,value:[0,1,0]},
                    {type:1,value:[0,1,0]},
                    {type:1,value:[0,1,0]},
                    {type:1,value:[0,1,0]},
                    ]])
                for(let a=0,la=types.deck.start[game.ascend>=20?5:4].length;a<la;a++){
                    this.addInitial(findName(types.deck.start[game.ascend>=20?5:4][a][0],types.card),types.deck.start[game.ascend>=20?5:4][a][1],types.deck.start[game.ascend>=20?5:4][a][2]==-2?types.card[findName(types.deck.start[game.ascend>=20?5:4][a][0],types.card)].list:types.deck.start[game.ascend>=20?5:4][a][2]==-1?player:types.deck.start[game.ascend>=20?5:4][a][2])
                }
            break
            case 2:
                for(let a=0,la=types.deck.start[game.ascend>=20?3:2].length;a<la;a++){
                    this.addInitial(findName(types.deck.start[game.ascend>=20?3:2][a][0],types.card),types.deck.start[game.ascend>=20?3:2][a][1],types.deck.start[game.ascend>=20?3:2][a][2]==-2?types.card[findName(types.deck.start[game.ascend>=20?3:2][a][0],types.card)].list:types.deck.start[game.ascend>=20?3:2][a][2]==-1?player:types.deck.start[game.ascend>=20?3:2][a][2])
                }
            break
            case 3:
                for(let a=0,la=8;a<la;a++){
                    this.addInitial(this.battle.cardManagers[this.player].listing.card[player][0][floor(random(0,this.battle.cardManagers[this.player].listing.card[player][0].length))],0,player)
                }
                for(let a=0,la=2;a<la;a++){
                    this.addInitial(this.battle.cardManagers[this.player].listing.card[player][1][floor(random(0,this.battle.cardManagers[this.player].listing.card[player][1].length))],0,player)
                }
                if(game.ascend>=20){
                    this.addInitial(findName('Step-L',types.card),0,this.battle.player[this.player])
                    this.addInitial(findName('Step-R',types.card),0,this.battle.player[this.player])
                }else{
                    this.addInitial(findName('Step',types.card),0,this.battle.player[this.player])
                    this.addInitial(findName('Step',types.card),0,this.battle.player[this.player])
                }
            break
            case 4:
                for(let a=0,la=8;a<la;a++){
                    let type=this.battle.cardManagers[this.player].listing.allPlayerCard[0][floor(random(0,this.battle.cardManagers[this.player].listing.allPlayerCard[0].length))]
                    this.addInitial(type,0,types.card[type].list)
                }
                for(let a=0,la=2;a<la;a++){
                    let type=this.battle.cardManagers[this.player].listing.allPlayerCard[1][floor(random(0,this.battle.cardManagers[this.player].listing.allPlayerCard[1].length))]
                    this.addInitial(type,0,types.card[type].list)
                }
                if(game.ascend>=20){
                    this.addInitial(findName('Step-L',types.card),0,this.battle.player[this.player])
                    this.addInitial(findName('Step-R',types.card),0,this.battle.player[this.player])
                }else{
                    this.addInitial(findName('Step',types.card),0,this.battle.player[this.player])
                    this.addInitial(findName('Step',types.card),0,this.battle.player[this.player])
                }
            break
            case 5:
                for(let a=0,la=this.battle.cardManagers[this.player].listing.card[player][3].length;a<la;a++){
                    this.addInitial(this.battle.cardManagers[this.player].listing.card[player][3][a],0,player)
                }
            break
            case 6:
                for(let a=0,la=this.battle.cardManagers[this.player].listing.allPlayerCard[3].length;a<la;a++){
                    this.addInitial(this.battle.cardManagers[this.player].listing.allPlayerCard[3][a],0,types.card[this.battle.cardManagers[this.player].listing.allPlayerCard[3][a]].list)
                }
            break
            case 7:
                for(let a=0,la=this.battle.cardManagers[this.player].listing.card[player][2].length;a<la;a++){
                    this.addInitial(this.battle.cardManagers[this.player].listing.card[player][2][a],0,player)
                }
            break
            case 8:
                for(let a=0,la=this.battle.cardManagers[this.player].listing.allPlayerCard[2].length;a<la;a++){
                    this.addInitial(this.battle.cardManagers[this.player].listing.allPlayerCard[2][a],0,types.card[this.battle.cardManagers[this.player].listing.allPlayerCard[2][a]].list)
                }
            break
            case 9:
                for(let a=0,la=this.battle.cardManagers[this.player].listing.card[0][3].length;a<la;a++){
                    this.addInitial(this.battle.cardManagers[this.player].listing.card[0][3][a],0,0)
                }
            break
        }
        if(game.ascend>=10){
            this.add(findName('Ascender\nBane',types.card),0,game.playerNumber+2)
        }
        if(game.ascend>=25){
            this.add(findName('Pride',types.card),0,game.playerNumber+2)
        }
        /*for(let a=0,la=8;a<la;a++){
            this.add(this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]][0][floor(random(0,this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]][0].length))],floor(random(0,1.5)),types.deck.start[player][0][2])
        }
        for(let a=0,la=4;a<la;a++){
            this.add(this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]][1][floor(random(0,this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]][1].length))],floor(random(0,1.5)),types.deck.start[player][0][2])
        }
        for(let a=0,la=6;a<la;a++){
            this.add(this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]][3][this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]][3].length-1-a],0,this.battle.player[this.player])
        }
        for(let a=0,la=6;a<la;a++){
            this.add(this.battle.cardManagers[this.player].listing.card[0][3][this.battle.cardManagers[this.player].listing.card[0][3].length-1-a],0,0)
        }
        for(let a=0,la=6;a<la;a++){
            this.add(this.battle.cardManagers[this.player].listing.card[game.playerNumber+3][3][this.battle.cardManagers[this.player].listing.card[game.playerNumber+3][3].length-1-a],0,game.playerNumber+3)
        }
        for(let a=1,la=types.card.length-2;a<la;a++){
            this.add(a,0,0)
        }*/
    }
    reset(){
        this.cancel()
        this.anim={discard:0,exhaust:0,reserve:0,duplicate:0,nightmare:0,rebound:0,upgrade:0,transform:0,badreserve:0,retain2:0,discardBlock:0,free2:0,exhaustBlock:0,exhaustSlot:0}
    }
    cancel(){
        this.status={discard:0,exhaust:0,reserve:0,duplicate:0,nightmare:0,rebound:0,upgrade:0,transform:0,badreserve:0,retain2:0,discardBlock:0,free2:0,exhaustBlock:0,exhaustSlot:0}
    }
    addInitial(type,level,color){
        game.id++
        if(!types.card[type].levels[level].spec.includes(3)){
            this.cards.push(new card(this.layer,this.battle,this.player,1200,500,type,this.selfLevel(type,level),color,game.id))
            if(this.id==0){
                this.cards[this.cards.length-1].nonCalc=true
            }
        }
    }
    add(type,level,color){
        game.id++
        if(type>=0&&type<types.card.length){
            if(this.battle.initialized&&types.card[type].list==game.playerNumber+2&&this.battle.relicManager.hasRelic(66,this.player)){
                this.battle.relicManager.active[66]--
                if(this.battle.relicManager.active[66]<=0){
                    this.battle.relicManager.deactivate(66)
                }
                return false
            }else{
                this.cards.push(new card(this.layer,this.battle,this.player,1200,500,type,this.selfLevel(type,level),color,game.id))
                if(this.id==0){
                    this.cards[this.cards.length-1].nonCalc=true
                }
                if(this.id>=1&&this.id<=3&&this.cards[this.cards.length-1].name=='Shiv'&&this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Shiv Range Up')>0){
                    this.cards[this.cards.length-1].target[2]+=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Shiv Range Up')
                }
                if(this.battle.initialized&&this.id==0){
                    if(
                        this.cards[this.cards.length-1].level==0&&(
                        this.cards[this.cards.length-1].class==1&&this.battle.relicManager.hasRelic(12,this.player)||
                        this.cards[this.cards.length-1].class==2&&this.battle.relicManager.hasRelic(13,this.player)||
                        this.cards[this.cards.length-1].class==3&&this.battle.relicManager.hasRelic(14,this.player)||
                        this.cards[this.cards.length-1].class==4&&this.battle.relicManager.hasRelic(15,this.player))){
                        this.cards[this.cards.length-1]=upgradeCard(this.cards[this.cards.length-1])
                    }
                    this.battle.relicManager.activate(5,[this.player])
                    if(types.card[type].rarity>=0||types.card[type].list>=0){
                        this.battle.stats.card[this.player]++
                    }
                }
                return true
            }
        }
    }
    addFree(type,level,color,variant){
        game.id++
        if(types.card[type].list==game.playerNumber+2&&this.battle.relicManager.hasRelic(66,this.player)){
            this.battle.relicManager.active[66]--
            if(this.battle.relicManager.active[66]<=0){
                this.battle.relicManager.deactivate(66)
            }
            return false
        }else{
            this.cards.push(new card(this.layer,this.battle,this.player,1200,500,type,this.selfLevel(type,level),color,game.id))
            if(this.id==0){
                this.cards[this.cards.length-1].nonCalc=true
            }
            this.cards[this.cards.length-1].cost=0
            if(variant==1){
                this.cards[this.cards.length-1].base.cost=0
            }
            if(this.battle.initialized&&this.id==0){
                if(
                    this.cards[this.cards.length-1].level==0&&(
                    this.cards[this.cards.length-1].class==1&&this.battle.relicManager.hasRelic(12,this.player)||
                    this.cards[this.cards.length-1].class==2&&this.battle.relicManager.hasRelic(13,this.player)||
                    this.cards[this.cards.length-1].class==3&&this.battle.relicManager.hasRelic(14,this.player)||
                    this.cards[this.cards.length-1].class==4&&this.battle.relicManager.hasRelic(15,this.player))){
                    this.cards[this.cards.length-1]=upgradeCard(this.cards[this.cards.length-1])
                }
                this.battle.relicManager.activate(5,[this.player])
                if(types.card[type].rarity>=0||types.card[type].list>=0){
                    this.battle.stats.card[this.player]++
                }
            }
            return true
        }
    }
    addFreeSpec(type,level,color,variant,spec){
        game.id++
        if(types.card[type].list==game.playerNumber+2&&this.battle.relicManager.hasRelic(66,this.player)){
            this.battle.relicManager.active[66]--
            if(this.battle.relicManager.active[66]<=0){
                this.battle.relicManager.deactivate(66)
            }
            return false
        }else{
            this.cards.push(new card(this.layer,this.battle,this.player,1200,500,type,this.selfLevel(type,level),color,game.id))
            if(this.id==0){
                this.cards[this.cards.length-1].nonCalc=true
            }
            this.cards[this.cards.length-1].cost=0
            if(variant==1){
                this.cards[this.cards.length-1].base.cost=0
            }
            for(let a=0,la=spec.length;a<la;a++){
                this.cards[this.cards.length-1].spec.push(spec[a])
            }
            if(this.battle.initialized&&this.id==0){
                if(
                    this.cards[this.cards.length-1].level==0&&(
                    this.cards[this.cards.length-1].class==1&&this.battle.relicManager.hasRelic(12,this.player)||
                    this.cards[this.cards.length-1].class==2&&this.battle.relicManager.hasRelic(13,this.player)||
                    this.cards[this.cards.length-1].class==3&&this.battle.relicManager.hasRelic(14,this.player)||
                    this.cards[this.cards.length-1].class==4&&this.battle.relicManager.hasRelic(15,this.player))){
                    this.cards[this.cards.length-1]=upgradeCard(this.cards[this.cards.length-1])
                }
                this.battle.relicManager.activate(5,[this.player])
                if(types.card[type].rarity>=0||types.card[type].list>=0){
                    this.battle.stats.card[this.player]++
                }
            }
            return true
        }
    }
    addDrop(type,level,color){
        game.id++
        this.cards.push(new card(this.layer,this.battle,this.player,40,-100-this.cards.length*200,type,level,color,game.id))
        if(this.id==0){
            this.cards[this.cards.length-1].nonCalc=true
        }
        this.cards[this.cards.length-1].downSize=true
    }
    addShuffle(type,level,color){
        if(this.add(type,level,color)){
            this.cards.splice(floor(random(0,this.cards.length-1)),0,this.cards[this.cards.length-1])
            this.cards.splice(this.cards.length-1,1)
            this.shuffled()
        }
    }
    addFreeShuffle(type,level,color,variant){
        if(this.addFree(type,level,color,variant)){
            this.cards.splice(floor(random(0,this.cards.length-1)),0,this.cards[this.cards.length-1])
            this.cards.splice(this.cards.length-1,1)
            this.shuffled()
        }
    }
    addShuffleEffect(type,level,color,index,effect){
        if(this.add(type,level,color)){
            this.cards[this.cards.length-1].effect[index]=effect
            this.cards.splice(floor(random(0,this.cards.length-1)),0,this.cards[this.cards.length-1])
            this.cards.splice(this.cards.length-1,1)
            this.shuffled()
        }
    }
    addRetain(type,level,color){
        if(this.add(type,level,color)){
            this.cards[this.cards.length-1].retain2=true
        }
    }
    addReturn(type,level,color){
        game.id++
        if(type>=0&&type<types.card.length){
            if(this.battle.initialized&&types.card[type].list==game.playerNumber+2&&this.battle.relicManager.hasRelic(66,this.player)){
                this.battle.relicManager.active[66]--
                if(this.battle.relicManager.active[66]<=0){
                    this.battle.relicManager.deactivate(66)
                }
                return {type:-1}
            }else{
                this.cards.push(new card(this.layer,this.battle,this.player,1200,500,type,level,color,game.id))
                if(this.id==0){
                    this.cards[this.cards.length-1].nonCalc=true
                }
                if(this.battle.initialized&&this.id==0){
                    if(
                        this.cards[this.cards.length-1].level==0&&(
                        this.cards[this.cards.length-1].class==1&&this.battle.relicManager.hasRelic(12,this.player)||
                        this.cards[this.cards.length-1].class==2&&this.battle.relicManager.hasRelic(13,this.player)||
                        this.cards[this.cards.length-1].class==3&&this.battle.relicManager.hasRelic(14,this.player)||
                        this.cards[this.cards.length-1].class==4&&this.battle.relicManager.hasRelic(15,this.player))){
                        this.cards[this.cards.length-1]=upgradeCard(this.cards[this.cards.length-1])
                    }
                    this.battle.relicManager.activate(5,[this.player])
                    if(types.card[type].rarity>=0||types.card[type].list>=0){
                        this.battle.stats.card[this.player]++
                    }
                }
                return this.cards[this.cards.length-1]
            }
        }
        return {type:-1}
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
    nightmare(amount){
        this.status.nightmare+=amount
    }
    rebound(amount){
        this.status.rebound+=amount
    }
    upgrade(amount){
        this.status.upgrade+=amount
    }
    transform(amount){
        this.status.transform+=amount
    }
    badreserve(amount){
        this.status.badreserve+=amount
    }
    retain2(amount){
        this.status.retain2+=amount
    }
    discardBlock(amount){
        this.status.discardBlock+=amount
    }
    free2(amount){
        this.status.free2+=amount
    }
    exhaustBlock(amount){
        this.status.exhaustBlock+=amount
    }
    exhaustSlot(amount){
        this.status.exhaustSlot+=amount
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
        this.shuffled()
    }
    shuffled(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(userCombatant.status.main[151]>0){
            this.battle.energy.main[this.player]+=userCombatant.status.main[151]
        }
        if(userCombatant.status.main[152]>0){
            this.battle.cardManagers[this.player].draw(userCombatant.status.main[152])
        }
    }
    selfLevel(type,level){
        if(this.battle.initialized){
            if(this.battle.combatantManager.combatants.length>0){
                let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                if(userCombatant.status.main[161]>0){
                    return min(level+userCombatant.status.main[161],types.card[type].levels.length-1)
                }else{
                    return level
                }
            }else{
                return level
            }
        }else{
            return level
        }
    }
    out(){
        this.cards.forEach(card=>print(card.name))
    }
    deStatus(value){
        let done=0
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].class==5){
                if(this.id==2){
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                }else{
                    this.remove(a)
                    a--
                    la--
                }
                done++
                if(done>=value){
                    a=la
                }
            }
        }
        return done
    }
    deFatigue(value){
        let done=0
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].name=='Fatigue'||this.cards[a].name=='Heavy\nFatigue'){
                if(this.id==2){
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                }else{
                    this.remove(a)
                    a--
                    la--
                }
                done++
                if(done>=value&&value>=0){
                    a=la
                }
            }
        }
        return done
    }
    deCard(value,name){
        let done=0
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].name==name){
                if(this.id==2){
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                }else{
                    this.remove(a)
                    a--
                    la--
                }
                done++
                if(done>=value&&value>=0){
                    a=la
                }
            }
        }
        return done
    }
    fatigueNumber(){
        let total=0
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].name=='Fatigue'||this.cards[a].name=='Heavy\nFatigue'){
                total++
            }
        }
        return total
    }
    cardNumber(name){
        let total=0
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].name==name){
                total++
            }
        }
        return total
    }
    classNumber(classes){
        let total=0
        for(let a=0,la=this.cards.length;a<la;a++){
            if(classes.includes(this.cards[a].class)){
                total++
            }
        }
        return total
    }
    allClass(cardClass){
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].class!=cardClass){
                return false
            }
        }
        return true
    }
    allClaw(effect){
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].spec.includes(20)){
                this.cards[a].effect[0]+=effect
            }
        }
    }
    falsedSwap(){
        let list=[]
        for(let a=0,la=this.cards.length;a<la;a++){
            if(!this.cards[a].spec.includes(12)){
                list.push(a)
            }
        }
        if(list.length>=2){
            let index=floor(random(0,list.length))
            let index0=list[index]
            list.splice(index,1)
            index=floor(random(0,list.length))
            let index1=list[index]
            this.cards[index0].falsed.trigger=true
            this.cards[index0].falsed.name=this.cards[index1].name
            this.cards[index0].falsed.attack=this.cards[index1].attack
            this.cards[index0].falsed.effect=this.cards[index1].effect
            this.cards[index0].falsed.spec=this.cards[index1].spec
            this.cards[index0].falsed.rarity=this.cards[index1].rarity
            this.cards[index0].falsed.classT=this.cards[index1].class
            this.cards[index0].falsed.reality=this.cards[index1].reality
            this.cards[index0].falsed.colorDetail=this.cards[index1].colorDetail
            this.cards[index0].falsed.target=this.cards[index1].target
            this.cards[index1].falsed.trigger=true
            this.cards[index1].falsed.name=this.cards[index0].name
            this.cards[index1].falsed.attack=this.cards[index0].attack
            this.cards[index1].falsed.effect=this.cards[index0].effect
            this.cards[index1].falsed.spec=this.cards[index0].spec
            this.cards[index1].falsed.rarity=this.cards[index0].rarity
            this.cards[index1].falsed.classT=this.cards[index0].class
            this.cards[index1].falsed.reality=this.cards[index0].reality
            this.cards[index1].falsed.colorDetail=this.cards[index0].colorDetail
            this.cards[index1].falsed.target=this.cards[index0].target
        }
    }
    halfEffect(effect){
        for(let a=0,la=this.cards.length;a<la;a++){
            if((a+la)%2==0){
                switch(effect){
                    case 0:
                        this.cards.splice(a,1)
                        a--
                        la--
                    break
                }
            }
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
                    if(!this.cards[a].spec.includes(2)||this.cards[a].spec.includes(29)&&floor(random(0,5))!=0){
                        this.cards[a].deSize=true
                    }
                break
                case 1:
                    this.cards[a].callDiscardEffect()
                    if(this.cards[a].retain2){
                        this.cards[a].retained()
                        total++
                    }else if(this.cards[a].retain){
                        this.cards[a].retained()
                        this.cards[a].retain=false
                        total++
                    }else if(this.cards[a].spec.includes(4)){
                        this.cards[a].etherealed()
                        this.cards[a].deSize=true
                        this.cards[a].exhaust=true
                    }else if(this.cards[a].spec.includes(2)||this.cards[a].spec.includes(29)&&floor(random(0,5))!=0||this.battle.relicManager.hasRelic(128,this.player)){
                        this.cards[a].retained()
                        total++
                    }else{
                        this.cards[a].deSize=true
                        if(this.cards[a].spec.includes(10)){
                            this.cards[a].spec.splice(this.cards[a].spec.indexOf(10),1)
                        }
                        if(this.cards[a].attack==-11){
                            this.battle.cardManagers[this.player].discard.add(findName('Pride',types.card),0,game.playerNumber+2)
                        }
                    }
                break
                case 2:
                    this.cards[a].deSize=true
                break
                case 3:
                    this.cards[a].deSize=true
                    if(this.cards[a].usable){
                        this.cards[a].discardEffect.push(0)
                    }
                break
                case 4:
                    if(this.cards[a].level==0){
                        this.cards[a]=upgradeCard(this.cards[a])
                    }
                break
                case 5:
                    this.cards[a].cost=floor(random(0,4))
                break
                case 6:
                    if(this.cards[a].basic&&this.cards[a].level==0){
                        this.cards[a]=upgradeCard(this.cards[a])
                    }
                break
                case 7:
                    this.copySelf(a)
                    a++
                    la++
                break
                case 8:
                    if(this.cards[a].name=='Fatigue'||this.cards[a].name=='Heavy\nFatigue'){
                        this.cards[a].deSize=true
                        this.cards[a].exhaust=true
                    }
                break
                case 9:
                    if(this.cards[a].name=='Burn'&&this.cards[a].level==0){
                        this.cards[a]=upgradeCard(this.cards[a])
                    }
                break
                case 10:
                    if(this.cards[a].class==3&&this.cards[a].cost>=0){
                        this.cards[a].cost++
                    }
                break
                case 11:
                    if(!this.cards[a].spec.includes(1)&&this.cards[a].attack!=-25){
                        this.cards[a].spec.push(1)
                    }
                break
                case 12:
                    for(let b=0,lb=this.cards[a].effect.length;b<lb;b++){
                        this.cards[a].effect[b]=round(this.cards[a].effect[b]/2)
                    }
                break
                case 13:
                    this.cards[a].deSize=true
                    if(this.cards[a].usable){
                        this.cards[a].discardEffect.push(3)
                    }
                break
                case 14:
                    if(this.cards[a].cost>0){
                        this.cards[a].cost--
                    }
                break
                case 15:
                    if(this.cards[a].spec.includes(11)){
                        this.cards[a].cost--
                    }
                break
                case 16:
                    this.cards[a].taken()
                break
                case 17:
                    this.cards[a].cost=0
                break
                case 18:
                    if(this.cards[a].class!=1){
                        this.cards[a].deSize=true
                    }
                break
                case 19:
                    if(this.cards[a].class!=1){
                        this.cards[a].deSize=true
                        this.cards[a].exhaust=true
                    }
                break
                case 20:
                    if(this.cards[a].class==2){
                        this.cards[a].cost=0
                        this.cards[a].base.cost=0
                        this.cards[a].spec.push(1)
                    }
                break
                case 21:
                    if(this.cards[a].name=='Fatigue'||this.cards[a].name=='Heavy\nFatigue'){
                        this.cards[a].spec.push(4)
                    }
                break
                case 22:
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                break
                case 23:
                    if(this.cards[a].spec.includes(6)){
                        this.cards[a].spec.splice(this.cards[a].spec.indexOf(6))
                    }
                break
                case 24:
                    this.cards[a].retain=true
                break
                case 25:
                    if(this.cards[a].cost==0){
                        this.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,0)
                        a--
                        la--
                    }
                break
                case 26:
                    if(this.cards[a].class==7){
                        this.cards[a].deSize=true
                        this.cards[a].exhaust=true
                        this.battle.energy.main[this.player]++
                    }
                break
                case 27:
                    this.cards[a].deSize=true
                    this.cards[a].discardEffectBuffered.push(0)
                break
                case 28:
                    if(this.cards[a].attack==736){
                        this.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,0)
                        a--
                        la--
                    }
                break
                case 29:
                    if(this.cards[a].name=='Fatigue'||this.cards[a].name=='Heavy\nFatigue'){
                        this.cards[a].spec.push(22)
                    }
                break
                case 30:
                    if(!this.cards[a].spec.includes(12)&&this.cards[a].effect.length>0&&this.cards[a].effect[0]>0&&this.cards[a].class!=3){
                        this.cards[a].effect[0]++
                    }
                break
                case 31:
                    if(this.cards[a].class==1){
                        this.cards[a].cost=0
                    }
                break
                case 32:
                    this.cards[a].deSize=true
                    this.cards[a].discardEffect.push(1)
                break
                case 33:
                    if(this.cards[a].class!=1){
                        this.cards[a].deSize=true
                        this.cards[a].exhaust=true
                        this.add(findName('Spark',types.card),0,0)
                    }
                break
                case 34:
                    if(this.cards[a].class!=1){
                        this.cards[a].deSize=true
                        this.cards[a].exhaust=true
                        this.add(findName('Spark',types.card),1,0)
                    }
                break
                case 35:
                    this.cards[a].deSize=true
                    this.cards[a].discardEffect.push(4)
                break
                case 36:
                    if(this.cards[a].basic&&this.cards[a].class==1&&this.cards[a].target.length>2&&this.cards[a].target[0]==2){
                        this.cards[a].target[2]++
                    }
                break
                case 37:
                    if(this.cards[a].class==7){
                        this.cards[a].deSize=true
                    }
                break
                case 38:
                    if(this.cards[a].name!='LXIV - The\nStack'){
                        this.copySelfInput(a)
                    }
                break
                case 39:
                    this.cards[a].callInDiscardEffect()
                break
                case 40:
                    this.cards[a].onHit()
                break
                case 41:
                    if(this.cards[a].attack==1216){
                        a=la
                    }else if(this.cards[a].attack!=1213){
                        this.cards[a].deSize=true
                    }
                break
                case 42:
                    if(this.cards[a].spec.includes(31)){
                        this.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,2)
                        a--
                        la--
                    }
                break
                case 43:
                    if(!this.cards[a].spec.includes(34)){
                        this.cards[a].spec.push(34)
                    }
                break
                case 44:
                    this.cards[a].callEndEffect()
                break
                case 45:
                    this.cards[a].spec=[]
                    this.cards[a].additionalSpec=[]
                break
                case 46:
                    if(this.cards[a].cost>0&&floor(random(0,2))==0){
                        this.cards[a].cost--
                    }
                break
                case 47:
                    if(this.cards[a].attack==1305){
                        this.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,2)
                        a--
                        la--
                    }
                break
                case 48:
                    this.cards[a].callStartEffect(this.battle.encounter.class)
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
    allEffectArgs(effect,args){
        for(let a=0,la=this.cards.length;a<la;a++){
            switch(effect){
                case 0:
                    if(this.cards[a].name=='Spark'){
                        this.cards[a].effect[0]+=args[0]
                    }
                break
                case 1:
                    if(this.cards[a].name=='Burn'){
                        this.cards[a].spec.push(4)
                        this.cards[a].attack=-28
                        this.cards[a].effect=[args[0]]
                    }
                break
                case 2:
                    if(this.cards[a].basic&&this.cards[a].class!=3){
                        this.cards[a].effect[0]+=args[0]
                    }
                break
                case 3:
                    if(a%args[0]==0){
                        this.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                    }
                break
                case 4:
                    if(this.cards[a].class!=3){
                        for(let b=0,lb=this.cards[a].effect.length;b<lb;b++){
                            this.cards[a].effect[b]+=args[0]
                        }
                    }
                break
                case 5:
                    if(this.cards[a].basic&&this.cards[a].class==1){
                        this.cards[a].effect[0]+=args[0]
                    }
                break
                case 6:
                    if(this.cards[a].basic&&this.cards[a].class==2){
                        this.cards[a].effect[0]+=args[0]
                    }
                break
                case 7:
                    if(this.cards[a].attack==1228&&this.cards[a].usable){
                        this.battle.energy.main[this.player]+=args[0]
                    }
                break
                case 8:
                    if(this.cards[a].spec.includes(35)&&this.cards[a].usable){
                        this.cards[a].cost=max(0,this.cards[a].cost-args[0])
                    }
                break
            }
        }
    }
    randomEffect(effect,args){
        if(this.cards.length>0){
            let list=[]
            for(let a=0,la=this.cards.length;a<la;a++){
                if(this.cards[a].usable&&!this.cards[a].spec.includes(12)
                &&!(effect==0&&this.cards[a].deSize)
                &&!((effect==1||effect==5)&&(this.cards[a].cost<=0||this.cards[a].spec.includes(5)))
                &&!((effect==7||effect==9)&&(this.cards[a].cost<0||this.cards[a].spec.includes(5)))
                &&!(effect==2&&(this.cards[a].level>=1||this.cards[a].class!=args[0]&&args[0]!=0))
                &&!(effect==3&&(this.cards[a].level==0||this.cards[a].class!=args[0]&&args[0]!=0))
                &&!(effect==8&&this.cards[a].spec.includes(8))
                &&!(effect==10&&this.cards[a].spec.includes(9))
                &&!(effect==11&&this.cards[a].spec.includes(10))
                &&!((effect==15||effect==20)&&this.cards[a].effect.length==0)
                &&!(effect==17&&(this.cards[a].attack==1115||this.cards[a].deSize))
                &&!(effect==18&&this.cards[a].class==3)
                &&!(effect==19&&this.cards[a].spec.includes(1))
                ){
                    list.push(a)
                }
            }
            if(list.length>0){
                let index=list[floor(random(0,list.length))]
                switch(effect){
                    case 0: case 17:
                        if(!this.cards[index].spec.includes(2)||this.cards[index].spec.includes(29)&&floor(random(0,5))!=0){
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
                    case 8:
                        this.cards[index].spec.push(8)
                    break
                    case 9:
                        this.cards[index].cost+=args[0]
                        this.cards[index].base.cost+=args[0]
                    break
                    case 10:
                        this.cards[index].spec.push(9)
                    break
                    case 11:
                        this.cards[index].spec.push(10)
                    break
                    case 12:
                        this.send(args[0],index,index+1,0)
                    break
                    case 13:
                        this.cards[index].deSize=true
                        this.cards[index].exhaust=true
                    break
                    case 14:
                        if(this.id==2){
                            this.cards[index].deSize=true
                            this.cards[index].discardEffect.push(2)
                        }else{
                            this.cards[index]=this.battle.cardManagers[this.player].transformCard(this.cards[index])
                        }
                    break
                    case 15:
                        for(let a=0,la=this.cards[index].effect.length;a<la;a++){
                            this.cards[index].effect[a]=min(this.cards[index].effect[a],1)
                        }
                    break
                    case 16:
                        this.send(args[0],index,index+1,1)
                    break
                    case 18:
                        for(let a=0,la=this.cards[index].effect.length;a<la;a++){
                            this.cards[index].effect[a]*=2
                        }
                        this.cards[index].spec.push(15)
                        this.cards[index].additionalSpec.push(15)
                        this.cards[index].limit=args[0]
                    break
                    case 19:
                        if(!this.cards[a].spec.includes(1)&&this.cards[a].attack!=-25){
                            this.cards[a].spec.push(1)
                        }
                    break
                    case 20:
                        for(let a=0,la=this.cards[index].effect.length;a<la;a++){
                            if(this.cards[index].effect[a]>0){
                                this.cards[index].effect[a]++
                            }
                        }
                    break
                }
            }
        }
    }
    drawEffect(attack,effect){
        switch(attack){
            case -3:
                this.drawEffects.push([1,effect[0]])
            break
            case -6:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Weak',effect[0])
            break
            case -12:
                this.drawEffects.push([0,7,[effect[0]]])
            break
            case -15: case -19:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Cannot Move',effect[0])
            break
            case -16:
                this.battle.cardManagers[this.player].hand.add(findName('Fatigue',types.card),0,game.playerNumber+1)
            break
            case -17:
                this.drawEffects.push([0,9,[effect[0]]])
            break
            case -18:
                this.battle.energy.main[this.player]-=effect[0]
            break
            case -20:
                this.drawEffects.push([2,[effect[0]]])
            break
            case -22: return 'break'
            case -23:
                for(let a=0,la=effect[0];a<la;a++){
                    this.drawEffects.push([0,13,[]])
                }
            break
            case -24:
                this.battle.cardManagers[this.player].hand.add(findName('Burn',types.card),0,game.playerNumber+1)
            break
            case -25:
                this.drawEffects.push([0,19,[]])
            break
            case -26:
                this.drawEffects.push([4])
            break
            case -27:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Temporary Strength',-effect[0])
            break
            case -28:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Strength',effect[0])
            break
            case -29:
                this.battle.energy.main[this.player]=0
            break
            case -31:
                this.battle.combatantManager.fullAllEffect(3,[effect[0]])
            break
            case -32:
                this.battle.combatantManager.fullAllEffect(4,[effect[0],this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].id])
            break
            case 288:
                for(let a=0,la=effect[1];a<la;a++){
                    this.battle.cardManagers[this.player].hand.add(findName('Stream',types.card),0,types.card[findName('Stream',types.card)].list)
                }
            break
            case 374:
                for(let a=0,la=effect[1];a<la;a++){
                    this.battle.cardManagers[this.player].hand.add(findName('Multi-Step',types.card),0,types.card[findName('Multi-Step',types.card)].list)
                }
            break
            case 933:
                this.battle.energy.main[this.player]+=effect[0]
            break
            case 1064: case 1065: case 1114:
                this.battle.cardManagers[this.player].draw(1)
            break
            case 1076:
                this.battle.combatantManager.allEffect(19,[effect[0]])
            break
            case 1115:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].heal(effect[0])
                for(let a=0,la=effect[1];a<la;a++){
                    this.drawEffects.push([0,317,[]])
                }
            break
            case 1239:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Damage Down',effect[0])
            break
            case 1240:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Burn',effect[0])
            break
            case 1241:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Counter All',effect[0])
            break
            case 1242:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(effect[0])
            break
            case 1243:
                this.battle.cardManagers[this.player].hand.upgrade(effect[0])
            break
            case 1271:
                this.battle.combatantManager.randomEnemyEffect(0,[effect[1]])
            break
            case 1307:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Bleed',effect[0])
            break
            case 1332:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].heal(effect[0])
            break
        }
    }
    deathEffect(){
        for(let a=0,la=this.cards.length;a<la;a++){
            switch(this.cards[a].attack){
                case -8:
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].takeDamage(this.cards[a].effect[0],-1)
                break
                case 1275:
                    this.battle.addCurrency(this.cards[a].effect[0],this.player)
                break
            }
        }
    }
    sendName(list,name){
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].name==name){
                list.push(copyCard(this.cards[a]))
                list[list.length-1].size=0
                list[list.length-1].position.x=1200
                list[list.length-1].position.y=500
                delete this.cards[a]
                this.cards.splice(a,1)
                a--
                la--
            }
        }
    }
    sendAttack(list,attack){
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].attack==attack){
                list.push(copyCard(this.cards[a]))
                list[list.length-1].size=0
                list[list.length-1].position.x=1200
                list[list.length-1].position.y=500
                delete this.cards[a]
                this.cards.splice(a,1)
                a--
                la--
            }
        }
    }
    sendRarity(list,rarity,amount,parent){
        let total=0
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].rarity==rarity){
                list.push(copyCard(this.cards[a]))
                list[list.length-1].size=0
                list[list.length-1].position.x=1200
                list[list.length-1].position.y=500
                if(this.drawEffect(list[list.length-1].attack,list[list.length-1].effect)){la=0}
                delete this.cards[a]
                this.cards.splice(a,1)
                a--
                la--
                total++
                if(total>amount){
                    a=la
                }
            }
        }
        if(this.drawEffects.length>0){
            for(let a=0,la=this.drawEffects.length;a<la;a++){
                switch(this.drawEffects[a][0]){
                    case 0:
                        parent.randomEffect(this.drawEffects[a][1],this.drawEffects[a][2])
                    break
                    case 1:
                        parent.status.exhaust+=this.drawEffects[a][1]
                    break
                    case 2:
                        for(let b=0,lb=this.drawEffects[a][1][0];b<lb;b++){
                            parent.allEffect(10)
                        }
                    break
                    case 3:
                        parent.allEffect(11)
                    break
                    case 4:
                        parent.allEffect(12)
                    break
                }
            }
            this.drawEffects=[]
        }
        return total
    }
    send(list,firstIndex,lastIndex,spec,parent){
        if(lastIndex==-1){
            for(let a=0,la=this.cards.length-firstIndex;a<la;a++){
                if(spec==11){
                    list.splice(0,0,copyCard(this.cards[firstIndex]))
                }else{
                    list.push(copyCard(this.cards[firstIndex]))
                }
                list[list.length-1].size=0
                if(spec==1||spec==2||spec==3||spec==4||spec==5||spec==6||spec==8||spec==9||spec==10||spec==12){
                    list[list.length-1].position.x=1200
                    list[list.length-1].position.y=500
                    if(spec==2){
                        list[list.length-1].cost=list[list.length-1].base.cost
                    }
                    if(spec==3){
                        if(this.drawEffect(list[list.length-1].attack,list[list.length-1].effect)){la=0}
                    }
                    if(spec==4){
                        list[list.length-1].cost=0
                    }
                    if(spec==5){
                        if(this.drawEffect(list[list.length-1].attack,list[list.length-1].effect)){la=0}
                        list[list.length-1].cost=0
                    }
                    if(spec==6&&list[list.length-1].cost>0){
                        list[list.length-1].cost-=1
                    }
                    if(spec==8){
                        if(list[list.length-1].level==0){
                            list[list.length-1]=upgradeCard(list[list.length-1])
                        }
                        if(this.drawEffect(list[list.length-1].attack,list[list.length-1].effect)){la=0}
                    }
                    if(spec==9){
                        list[list.length-1].retain=true
                        if(this.drawEffect(list[list.length-1].attack,list[list.length-1].effect)){la=0}
                    }
                    if(spec==10&&list[list.length-1].level==0){
                        list[list.length-1]=upgradeCard(list[list.length-1])
                    }
                    if(spec==12){
                        list[list.length-1].retain2=true
                        if(this.drawEffect(list[list.length-1].attack,list[list.length-1].effect)){la=0}
                    }
                }else if(spec==7){
                    list[list.length-1].cost=list[list.length-1].base.cost
                }
                delete this.cards[firstIndex]
                this.cards.splice(firstIndex,1)
            }
        }else{
            for(let a=0,la=lastIndex-firstIndex;a<la;a++){
                if(spec==11){
                    list.splice(0,0,copyCard(this.cards[firstIndex]))
                }else{
                    list.push(copyCard(this.cards[firstIndex]))
                }
                list[list.length-1].size=0
                if(spec==1||spec==2||spec==3||spec==4||spec==5||spec==6||spec==8||spec==9||spec==10||spec==12){
                    list[list.length-1].position.x=1200
                    list[list.length-1].position.y=500
                    if(spec==2){
                        list[list.length-1].cost=list[list.length-1].base.cost
                    }
                    if(spec==3){
                        if(this.drawEffect(list[list.length-1].attack,list[list.length-1].effect)){la=0}
                    }
                    if(spec==4){
                        list[list.length-1].cost=0
                    }
                    if(spec==5){
                        if(this.drawEffect(list[list.length-1].attack,list[list.length-1].effect)){la=0}
                        list[list.length-1].cost=0
                    }
                    if(spec==6&&list[list.length-1].cost>0){
                        list[list.length-1].cost-=1
                    }
                    if(spec==8){
                        if(list[list.length-1].level==0){
                            list[list.length-1]=upgradeCard(list[list.length-1])
                        }
                        if(this.drawEffect(list[list.length-1].attack,list[list.length-1].effect)){la=0}
                    }
                    if(spec==9){
                        list[list.length-1].retain=true
                        if(this.drawEffect(list[list.length-1].attack,list[list.length-1].effect)){la=0}
                    }
                    if(spec==10&&list[list.length-1].level==0){
                        list[list.length-1]=upgradeCard(list[list.length-1])
                    }
                    if(spec==12){
                        list[list.length-1].retain2=true
                        if(this.drawEffect(list[list.length-1].attack,list[list.length-1].effect)){la=0}
                    }
                }else if(spec==7){
                    list[list.length-1].cost=list[list.length-1].base.cost
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
                    case 1:
                        parent.status.exhaust+=this.drawEffects[a][1]
                    break
                    case 2:
                        for(let b=0,lb=this.drawEffects[a][1][0];b<lb;b++){
                            parent.allEffect(10)
                        }
                    break
                    case 3:
                        parent.allEffect(11)
                    break
                    case 4:
                        parent.allEffect(12)
                    break
                }
            }
            this.drawEffects=[]
        }
    }
    sendSpec(list,spec,number){
        let left=number
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].spec.includes(spec)){
                list.push(copyCard(this.cards[a]))
                list[list.length-1].size=0
                list[list.length-1].position.x=1200
                list[list.length-1].position.y=500
                delete this.cards[a]
                this.cards.splice(a,1)
                a--
                la--
                left--
                if(left<=0){
                    la=0
                }
            }
        }
    }
    copy(list,firstIndex,lastIndex){
        if(lastIndex==-1){
            for(let a=0,la=this.cards.length-firstIndex;a<la;a++){
                list.push(copyCard(this.cards[firstIndex+a]))
                list[list.length-1].position.x=1200
                list[list.length-1].position.y=500
            }
        }else{
            for(let a=0,la=lastIndex-firstIndex+1;a<la;a++){
                list.push(copyCard(this.cards[firstIndex+a]))
                list[list.length-1].position.x=1200
                list[list.length-1].position.y=500
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
    smoosh(index){
        for(let a=0,la=this.cards.length;a<la;a++){
            let block=(a+index)%la
            if(block!=index&&this.cards[block].name==this.cards[index].name&&!this.cards[index].spec.includes(37)){
                if(this.cards[index].level==this.cards[block].level&&this.cards[index].additionalSpec.length>this.cards[block].additionalSpec.length||this.cards[index].level>this.cards[block].level){
                    for(let b=0,lb=this.cards[index].effect.length;b<lb;b++){
                        this.cards[index].effect[b]=max(this.cards[index].effect[b],this.cards[index].effect[b]+this.cards[block].effect[b]-1)
                    }
                    this.cards[index].spec.push(37)
                    this.cards[index].additionalSpec.push(37)
                    this.cards.splice(block,1)
                }else{
                    for(let b=0,lb=this.cards[block].effect.length;b<lb;b++){
                        this.cards[block].effect[b]=max(this.cards[block].effect[b],this.cards[block].effect[b]+this.cards[index].effect[b]-1)
                    }
                    this.cards[block].spec.push(37)
                    this.cards[block].additionalSpec.push(37)
                    this.cards.splice(index,1)
                }
                return true
            }
        }
        return false
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
    sortClass(cardClass){
        let names=[]
        for(let a=0,la=this.cards.length;a<la;a++){
            if(!names.includes(this.cards[a].name)&&this.cards[a].class==cardClass){
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
    unRemove(){
        this.cards.push(this.removed[this.removed.length-1])
        this.removed.splice(this.removed.length-1,1)
    }
    removeAllType(type){
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].type==type){
                this.cards.splice(a,1)
                a--
                la--
            }
        }
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
    cost(cost,cardClass,spec,target){
        this.battle.attackManager.amplify=false
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(spec.includes(25)&&userCombatant.ammo>0&&!(target[0]==46&&this.battle.attackManager.targetDistance<=1)){
            userCombatant.ammo--
        }
        if(cardClass==1&&userCombatant.status.main[22]>0){
            userCombatant.status.main[22]--
        }else if(userCombatant.status.main[27]>0){
            userCombatant.status.main[27]--
        }else if(spec.includes(11)){
            userCombatant.combo-=cost
        }else if(spec.includes(21)){
            userCombatant.metal-=cost
        }else{
            if(cost==-1){
                this.battle.energy.main[this.player]=0
            }else{
                this.battle.energy.main[this.player]-=cost
            }
            if(userCombatant.getStatus('No Amplify')<=0){
                if(userCombatant.getStatus('Free Amplify')>0){
                    this.battle.attackManager.amplify=true
                }else if(userCombatant.getStatus('Single Free Amplify')>0){
                    userCombatant.status.main[findList('Single Free Amplify',userCombatant.status.name)]--
                    this.battle.attackManager.amplify=true
                }else if(this.battle.energy.main[this.player]>0&&spec.includes(27)){
                    this.battle.energy.main[this.player]--
                    this.battle.attackManager.amplify=true
                    this.cards.forEach(card=>card.anotherAmplified())
                    if(userCombatant.status.main[144]>0){
                        this.battle.overlayManager.overlays[7][this.player].active=true
                        this.battle.overlayManager.overlays[7][this.player].activate()
                    }
                }
                if(this.battle.energy.main[this.player]>1&&spec.includes(28)){
                    this.battle.energy.main[this.player]-=2
                    this.battle.attackManager.amplify=true
                    this.cards.forEach(card=>card.anotherAmplified())
                    if(userCombatant.status.main[144]>0){
                        this.battle.overlayManager.overlays[7][this.player].active=true
                        this.battle.overlayManager.overlays[7][this.player].activate()
                    }
                }
            }
        }
    }
    callAmalgums(){
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].spec.includes(26)){
                this.battle.attackManager.type=this.cards[a].attack
                this.battle.attackManager.effect=copyArray(this.cards[a].effect)
                this.battle.attackManager.attackClass=this.cards[a].class
                this.battle.attackManager.player=this.player

                this.battle.attackManager.user=this.battle.combatantManager.getPlayerCombatantIndex(this.player)
                this.battle.attackManager.energy=this.battle.energy.main[this.player]+(this.battle.relicManager.hasRelic(121,this.player)?2:0)
                this.battle.attackManager.position.x=this.battle.combatantManager.combatants[this.battle.attackManager.user].position.x
                this.battle.attackManager.position.y=this.battle.combatantManager.combatants[this.battle.attackManager.user].position.y
                this.battle.attackManager.relativePosition.x=this.battle.combatantManager.combatants[this.battle.attackManager.user].relativePosition.x
                this.battle.attackManager.relativePosition.y=this.battle.combatantManager.combatants[this.battle.attackManager.user].relativePosition.y
                this.battle.attackManager.tilePosition.x=this.battle.combatantManager.combatants[this.battle.attackManager.user].tilePosition.x
                this.battle.attackManager.tilePosition.y=this.battle.combatantManager.combatants[this.battle.attackManager.user].tilePosition.y
                this.battle.attackManager.combo=this.battle.combatantManager.combatants[this.battle.attackManager.user].combo
                this.battle.attackManager.amplify=false
                this.battle.attackManager.relPos=[-1,999]
                this.battle.attackManager.limit=0
                this.battle.attackManager.id=-1

                this.battle.attackManager.targetInfo=copyArray(this.cards[a].target)
                this.battle.attackManager.targetDistance=0
                this.battle.attackManager.cost=this.cards[a].cost
                this.battle.combatantManager.combatants[this.battle.attackManager.user].goal.anim.direction=round(atan2(this.battle.combatantManager.combatants[this.battle.attackManager.target[0]].relativePosition.x-this.battle.attackManager.relativePosition.x,this.battle.combatantManager.combatants[this.battle.attackManager.target[0]].relativePosition.y-this.battle.attackManager.relativePosition.y)/60-1/2)*60+30
                this.battle.attackManager.targetDistance=distTargetCombatant(0,this.battle.combatantManager.combatants[this.battle.attackManager.target[0]],this.battle.attackManager)
                this.battle.attackManager.targetInfo[0]=0
                this.battle.attackManager.targetClass=2
                this.spec=[]
                this.target=[]
                this.battle.attackManager.execute()
                this.battle.updateTargetting()
            }
        }
    }
    display(scene,args){
        switch(scene){
            case 'battle':
                for(let a=0,la=this.cards.length;a<la;a++){
                    if(this.cards[a].size<=1){
                        this.cards[a].display()
                        this.cards[a].displayStatus([this.anim.discard,max(this.anim.exhaust,this.anim.exhaustSlot),this.anim.reserve,this.anim.duplicate,this.anim.nightmare,this.anim.rebound,this.anim.upgrade,this.anim.transform,this.anim.badreserve,this.anim.retain2,this.anim.discardBlock,this.anim.free2,this.anim.exhaustBlock])
                    }
                }
                for(let a=0,la=this.cards.length;a<la;a++){
                    if(this.cards[a].size>1){
                        this.cards[a].display()
                        this.cards[a].displayStatus([this.anim.discard,max(this.anim.exhaust,this.anim.exhaustSlot),this.anim.reserve,this.anim.duplicate,this.anim.nightmare,this.anim.rebound,this.anim.upgrade,this.anim.transform,this.anim.badreserve,this.anim.retain2,this.anim.discardBlock,this.anim.free2,this.anim.exhaustBlock])
                    }
                }
            break
            case 'drop':
                this.cards.forEach(card=>card.display())
            break
            case 'overlay':
                let position=0
                switch(args[0]){
                    case 0:
                        this.sort()
                        for(let a=0,la=this.sorted.length;a<la;a++){
                            for(let b=0,lb=this.cards.length;b<lb;b++){
                                if(this.cards[b].name==this.sorted[a]){
                                    this.cards[b].deSize=!(position>=args[1]*15&&position<args[1]*15+15)
                                    this.cards[b].fade=1
                                    this.cards[b].position.x=this.layer.width/2-200+position%5*100
                                    this.cards[b].position.y=this.layer.height/2-130+floor(position/5)%3*130
                                    this.cards[b].anim.afford=1
                                    if(this.cards[b].size>=0){
                                        this.cards[b].display(this.id==0)
                                    }
                                    position++
                                }
                            }
                        }
                    break
                    case 2: case 3: case 4: case 5:
                        this.sortClass(args[0]-1)
                        for(let a=0,la=this.sorted.length;a<la;a++){
                            for(let b=0,lb=this.cards.length;b<lb;b++){
                                if(this.cards[b].name==this.sorted[a]){
                                    this.cards[b].deSize=!(position>=args[1]*15&&position<args[1]*15+15)
                                    this.cards[b].fade=1
                                    this.cards[b].relIndex=position
                                    this.cards[b].position.x=this.layer.width/2-200+position%5*100
                                    this.cards[b].position.y=this.layer.height/2-130+floor(position/5)%3*130
                                    this.cards[b].anim.afford=1
                                    if(this.cards[b].size>=0){
                                        this.cards[b].display(this.id==0)
                                    }
                                    position++
                                }
                            }
                        }
                    break
                    case 6:
                        for(let a=0,la=min(args[2],this.cards.length);a<la;a++){
                            this.cards[a].deSize=!(a>=args[1]*15&&a<args[1]*15+15)
                            this.cards[a].fade=1
                            this.cards[a].position.x=this.layer.width/2-200+a%5*100
                            this.cards[a].position.y=this.layer.height/2-130+floor(a/5)%3*130
                            this.cards[a].anim.afford=1
                            if(this.cards[a].size>=0){
                                this.cards[a].display(this.id==0)
                            }
                        }
                    break
                    case 7:
                        for(let a=0,la=this.cards.length;a<la;a++){
                            this.cards[a].deSize=a>=args[1]
                            this.cards[a].fade=1
                            this.cards[a].position.x=this.layer.width/2-200+a%5*100
                            this.cards[a].position.y=this.layer.height/2-130+floor(a/5)%3*130
                            this.cards[a].anim.afford=1
                            if(this.cards[a].size>=0){
                                this.cards[a].display(this.id==0)
                            }
                        }
                    break
                    default:
                        for(let a=0,la=this.cards.length;a<la;a++){
                            this.cards[a].deSize=!(a>=args[1]*15&&a<args[1]*15+15)
                            this.cards[a].fade=1
                            this.cards[a].position.x=this.layer.width/2-200+a%5*100
                            this.cards[a].position.y=this.layer.height/2-130+floor(a/5)%3*130
                            this.cards[a].anim.afford=1
                            if(this.cards[a].size>=0){
                                this.cards[a].display(this.id==0)
                            }
                        }
                    break
                }
            break
            case 'tier':
                for(let a=0,la=this.cards.length;a<la;a++){
                    this.cards[a].deSize=a!=0
                    this.cards[a].fade=1
                    this.cards[a].position.x=this.layer.width/2+args[0]*120
                    this.cards[a].position.y=this.layer.height/2
                    this.cards[a].anim.afford=1
                    if(this.cards[a].size>=0){
                        this.cards[a].display()
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
                this.battle.attackManager.relPos=[a,this.cards.length-1]
                this.battle.attackManager.limit=this.cards[a].limit
                this.battle.attackManager.id=this.cards[a].id
                if(this.cards[a].strike&&this.battle.relicManager.hasRelic(50,this.player)&&this.battle.attackManager.effect.length>0){
                    this.battle.attackManager.effect[0]+=2
                }
                if(this.cards[a].name=='Shiv'){
                    let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                    if(userCombatant.status.main[76]>0){
                        this.battle.attackManager.effect[0]+=userCombatant.status.main[76]
                    }
                }
                if(this.cards[a].spec.includes(25)){
                    let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                    if(userCombatant.status.main[166]>0){
                        this.battle.attackManager.effect[0]+=userCombatant.status.main[166]
                    }
                }
                this.cards[a].usable=false
                if(this.status.duplicate>0){
                    this.status.duplicate--
                    this.copySelfInput(a)
                }
                if(this.cards[a].target[0]==0){
                    let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                    if(userCombatant.status.main[23]>0){
                        userCombatant.status.main[23]--
                        this.cards[a].usable=true
                    }else{
                        this.cards[a].deSize=true
                        if(this.cards[a].spec.includes(1)||this.cards[a].spec.includes(5)||this.battle.relicManager.hasRelic(11,this.player)){
                            this.cards[a].exhaust=true
                        }
                    }
                    if(this.cards[a].spec.includes(15)){
                        this.cards[a].limit--
                        for(let b=0,lb=this.battle.cardManagers[this.player].deck.cards.length;b<lb;b++){
                            if(this.battle.cardManagers[this.player].deck.cards[b].id==this.cards[a].id){
                                this.battle.cardManagers[this.player].deck.cards[b].limit--
                            }
                        }
                        if(this.cards[a].limit<=0){
                            this.cards[a].exhaust=true
                            for(let b=0,lb=this.battle.cardManagers[this.player].deck.cards.length;b<lb;b++){
                                this.battle.cardManagers[this.player].deck.cards[b].callVanishEffect()
                                if(this.battle.cardManagers[this.player].deck.cards[b].id==this.cards[a].id){
                                    this.battle.cardManagers[this.player].deck.cards.splice(b,1)
                                    b--
                                    lb--
                                }
                            }
                        }
                    }
                    if(this.cards[a].spec.includes(30)){
                        this.cards[a].limit++
                        for(let b=0,lb=this.battle.cardManagers[this.player].deck.cards.length;b<lb;b++){
                            if(this.battle.cardManagers[this.player].deck.cards[b].id==this.cards[a].id){
                                this.battle.cardManagers[this.player].deck.cards[b].limit++
                            }
                        }
                    }
                    if(this.cards[a].spec.includes(36)&&floor(random(0,5))==0){
                        this.cards[a].exhaust=true
                        for(let b=0,lb=this.battle.cardManagers[this.player].deck.cards.length;b<lb;b++){
                            this.battle.cardManagers[this.player].deck.cards[b].callVanishEffect()
                            if(this.battle.cardManagers[this.player].deck.cards[b].id==this.cards[a].id){
                                this.battle.cardManagers[this.player].deck.cards.splice(b,1)
                                b--
                                lb--
                            }
                        }
                    }
                    if(this.cards[a].attack==1133){
                        this.cards[a].effect[0]--
                        for(let b=0,lb=this.battle.cardManagers[this.player].deck.cards.length;b<lb;b++){
                            if(this.battle.cardManagers[this.player].deck.cards[b].id==this.cards[a].id){
                                this.battle.cardManagers[this.player].deck.cards[b].effect[0]--
                            }
                        }
                        if(this.cards[a].effect[0]<=0){
                            this.cards[a].exhaust=true
                            for(let b=0,lb=this.battle.cardManagers[this.player].deck.cards.length;b<lb;b++){
                                if(this.battle.cardManagers[this.player].deck.cards[b].id==this.cards[a].id){
                                    this.battle.cardManagers[this.player].deck.cards.splice(b,1)
                                    b--
                                    lb--
                                }
                            }
                            this.add(findName('Worthless\nBaseball Card',types.card),this.cards[a].level,this.cards[a].color)
                            this.battle.cardManagers[this.player].deck.add(findName('Card\nSleeve',types.card),this.cards[a].level,this.cards[a].color)
                            this.battle.cardManagers[this.player].deck.add(findName('Worthless\nBaseball Card',types.card),this.cards[a].level,this.cards[a].color)
                        }
                    }
                    if(this.cards[a].attack==1146){
                        this.cards[a].effect[0]+=this.cards[a].effect[1]
                        for(let b=0,lb=this.battle.cardManagers[this.player].deck.cards.length;b<lb;b++){
                            if(this.battle.cardManagers[this.player].deck.cards[b].id==this.cards[a].id){
                                this.battle.cardManagers[this.player].deck.cards[b].effect[0]+=this.cards[a].effect[1]
                            }
                        }
                    }
                    this.cards[a].played()
                    this.cards.forEach(card=>card.anotherPlayed(this.cards[a].class,this.cards[a].name,this.cards[a].basic))
                    this.battle.playCard(this.cards[a],this.player,0)
                    this.callInput(5,0)
                    this.cost(this.cards[a].cost,this.cards[a].class,this.cards[a].spec,this.cards[a].target)
                    this.battle.attackManager.execute()
                    this.lastPlayed[0]=[this.cards[a].type,this.cards[a].level,this.cards[a].color]
                    this.lastPlayed[this.cards[a].class]=[this.cards[a].type,this.cards[a].level,this.cards[a].color]
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
                if(this.battle.attackManager.targetInfo[0]==13||this.battle.attackManager.targetInfo[0]==27||this.battle.attackManager.targetInfo[0]==37||this.battle.attackManager.targetInfo[0]==38||this.battle.attackManager.targetInfo[0]==39||this.battle.attackManager.targetInfo[0]==41||this.battle.attackManager.targetInfo[0]==42||this.battle.attackManager.targetInfo[0]==43){
                    this.battle.attackManager.targetDistance=max(distTargetDiagonalCombatant(0,this.battle.tileManager.tiles[a],this.battle.attackManager),distTargetCombatant(0,this.battle.tileManager.tiles[a],this.battle.attackManager))
                }else if(this.battle.attackManager.targetInfo[0]==12){
                    this.battle.attackManager.targetDistance=distTargetDiagonalCombatant(0,this.battle.tileManager.tiles[a],this.battle.attackManager)
                }else{
                    this.battle.attackManager.targetDistance=distTargetCombatant(0,this.battle.tileManager.tiles[a],this.battle.attackManager)
                }
                this.battle.attackManager.targetInfo[0]=0
                this.battle.attackManager.targetClass=1
                this.battle.attackManager.target[0]=a
                this.spec=[]
                this.target=[]
                for(let b=0,lb=this.cards.length;b<lb;b++){
                    if(!this.cards[b].usable){
                        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                        this.spec=this.cards[b].spec
                        this.target=this.cards[b].target
                        if(userCombatant.status.main[23]>0){
                            userCombatant.status.main[23]--
                            this.cards[b].usable=true
                            this.cards[b].select=false
                        }else{
                            this.cards[b].deSize=true
                            if(this.cards[b].spec.includes(1)||(this.cards[b].spec.includes(5)&&this.battle.relicManager.hasRelic(11,this.player))){
                                this.cards[b].exhaust=true
                            }
                        }
                        if(this.cards[b].spec.includes(15)){
                            this.cards[b].limit--
                            for(let c=0,lc=this.battle.cardManagers[this.player].deck.cards.length;c<lc;c++){
                                if(this.battle.cardManagers[this.player].deck.cards[c].id==this.cards[b].id){
                                    this.battle.cardManagers[this.player].deck.cards[c].limit--
                                }
                            }
                            if(this.cards[b].limit<=0){
                                this.cards[b].exhaust=true
                                for(let c=0,lc=this.battle.cardManagers[this.player].deck.cards.length;c<lc;c++){
                                    if(this.battle.cardManagers[this.player].deck.cards[c].id==this.cards[b].id){
                                        this.battle.cardManagers[this.player].deck.cards.splice(c,1)
                                        c--
                                        lc--
                                    }
                                }
                            }
                        }
                        if(this.cards[b].spec.includes(30)){
                            this.cards[b].limit++
                            for(let c=0,lc=this.battle.cardManagers[this.player].deck.cards.length;c<lc;c++){
                                if(this.battle.cardManagers[this.player].deck.cards[c].id==this.cards[b].id){
                                    this.battle.cardManagers[this.player].deck.cards[c].limit++
                                }
                            }
                        }
                        if(this.cards[b].spec.includes(36)&&floor(random(0,5))==0){
                            this.cards[b].exhaust=true
                            for(let c=0,lc=this.battle.cardManagers[this.player].deck.cards.length;c<lc;c++){
                                if(this.battle.cardManagers[this.player].deck.cards[c].id==this.cards[b].id){
                                    this.battle.cardManagers[this.player].deck.cards.splice(c,1)
                                    c--
                                    lc--
                                }
                            }
                        }
                        if(this.cards[b].attack==1133){
                            this.cards[b].effect[0]--
                            for(let c=0,lc=this.battle.cardManagers[this.player].deck.cards.length;c<lc;c++){
                                if(this.battle.cardManagers[this.player].deck.cards[c].id==this.cards[b].id){
                                    this.battle.cardManagers[this.player].deck.cards[c].effect[0]--
                                }
                            }
                            if(this.cards[b].effect[0]<=0){
                                this.cards[b].exhaust=true
                                for(let c=0,lc=this.battle.cardManagers[this.player].deck.cards.length;c<lc;c++){
                                    if(this.battle.cardManagers[this.player].deck.cards[c].id==this.cards[b].id){
                                        this.battle.cardManagers[this.player].deck.cards.splice(c,1)
                                        c--
                                        lc--
                                    }
                                }
                                this.add(findName('Worthless\nBaseball Card',types.card),this.cards[b].level,this.cards[b].color)
                                this.battle.cardManagers[this.player].deck.add(findName('Card\nSleeve',types.card),this.cards[b].level,this.cards[b].color)
                                this.battle.cardManagers[this.player].deck.add(findName('Worthless\nBaseball Card',types.card),this.cards[b].level,this.cards[b].color)
                            }
                        }
                        if(this.cards[b].attack==1146){
                            this.cards[b].effect[0]+=this.cards[b].effect[1]
                            for(let c=0,lc=this.battle.cardManagers[this.player].deck.cards.length;c<lc;c++){
                                if(this.battle.cardManagers[this.player].deck.cards[c].id==this.cards[b].id){
                                    this.battle.cardManagers[this.player].deck.cards[c].effect[0]+=this.cards[b].effect[1]
                                }
                            }
                        }
                        this.cards[b].played()
                        this.cards.forEach(card=>card.anotherPlayed(this.cards[b].class,this.cards[b].name,this.cards[b].basic))
                        if(this.spec.includes(12)){
                            let characteristic=this.battle.combatantManager.combatants[this.battle.attackManager.user].id==a?1:0
                            this.battle.attackManager.type=this.battle.attackManager.type[characteristic]
                            this.battle.attackManager.effect=this.battle.attackManager.effect[characteristic]
                            this.battle.attackManager.attackClass=this.battle.attackManager.attackClass[characteristic]
                            this.cards[b].characteristic=characteristic
                        }
                        this.battle.playCard(this.cards[b],this.player,this.battle.combatantManager.combatants[this.battle.attackManager.user].id==a?1:0)
                    }
                }
                this.cost(this.battle.attackManager.cost,this.battle.attackManager.attackClass,this.spec,this.target)
                this.battle.attackManager.execute()
                this.battle.updateTargetting()
                for(let b=0,lb=this.cards.length;b<lb;b++){
                    if(!this.cards[b].usable){
                        this.lastPlayed[0]=[this.cards[b].type,this.cards[b].level,this.cards[b].color]
                        this.lastPlayed[this.cards[b].class]=[this.cards[b].type,this.cards[b].level,this.cards[b].color]
                    }
                }
            break
            case 3:
                this.battle.combatantManager.combatants[this.battle.attackManager.user].goal.anim.direction=round(atan2(this.battle.combatantManager.combatants[a].relativePosition.x-this.battle.attackManager.relativePosition.x,this.battle.combatantManager.combatants[a].relativePosition.y-this.battle.attackManager.relativePosition.y)/60-1/2)*60+30
                if(!(this.battle.combatantManager.combatants[a].spec.includes(9)&&(abs(this.battle.combatantManager.combatants[a].goal.anim.direction+180-this.battle.combatantManager.combatants[this.battle.attackManager.user].goal.anim.direction)<30||abs(this.battle.combatantManager.combatants[a].goal.anim.direction-180-this.battle.combatantManager.combatants[this.battle.attackManager.user].goal.anim.direction)<30))){
                    if(this.battle.attackManager.targetInfo[0]==13||this.battle.attackManager.targetInfo[0]==27||this.battle.attackManager.targetInfo[0]==37||this.battle.attackManager.targetInfo[0]==38||this.battle.attackManager.targetInfo[0]==39||this.battle.attackManager.targetInfo[0]==41||this.battle.attackManager.targetInfo[0]==42||this.battle.attackManager.targetInfo[0]==43){
                        this.battle.attackManager.targetDistance=max(distTargetDiagonalCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager),distTargetCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager))
                    }else if(this.battle.attackManager.targetInfo[0]==12){
                        this.battle.attackManager.targetDistance=distTargetDiagonalCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager)
                    }else{
                        this.battle.attackManager.targetDistance=distTargetCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager)
                    }
                    this.battle.attackManager.targetInfo[0]=0
                    this.battle.attackManager.targetClass=2
                    this.battle.attackManager.target[0]=a
                    this.spec=[]
                    this.target=[]
                    for(let b=0,lb=this.cards.length;b<lb;b++){
                        if(!this.cards[b].usable){
                            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                            this.spec=this.cards[b].spec
                            this.target=this.cards[b].target
                            if(userCombatant.status.main[23]>0){
                                userCombatant.status.main[23]--
                                this.cards[b].usable=true
                                this.cards[b].select=false
                            }else{
                                this.cards[b].deSize=true
                                if(
                                    this.cards[b].spec.includes(1)||this.cards[b].spec.includes(12)&&this.cards[b].reality[this.battle.combatantManager.combatants[this.battle.attackManager.user].id==a?1:0].includes(1)||
                                    this.cards[b].spec.includes(5)||this.cards[b].spec.includes(12)&&this.cards[b].reality[this.battle.combatantManager.combatants[this.battle.attackManager.user].id==a?1:0].includes(5)||
                                    this.battle.relicManager.hasRelic(11,this.player)){
                                    this.cards[b].exhaust=true
                                }
                            }
                            if(this.cards[b].spec.includes(15)){
                                this.cards[b].limit--
                                for(let c=0,lc=this.battle.cardManagers[this.player].deck.cards.length;c<lc;c++){
                                    if(this.battle.cardManagers[this.player].deck.cards[c].id==this.cards[b].id){
                                        this.battle.cardManagers[this.player].deck.cards[c].limit--
                                    }
                                }
                                if(this.cards[b].limit<=0){
                                    this.cards[b].exhaust=true
                                    for(let c=0,lc=this.battle.cardManagers[this.player].deck.cards.length;c<lc;c++){
                                        if(this.battle.cardManagers[this.player].deck.cards[c].id==this.cards[b].id){
                                            this.battle.cardManagers[this.player].deck.cards.splice(c,1)
                                            c--
                                            lc--
                                        }
                                    }
                                }
                            }
                            if(this.cards[b].spec.includes(30)){
                                this.cards[b].limit++
                                for(let c=0,lc=this.battle.cardManagers[this.player].deck.cards.length;c<lc;c++){
                                    if(this.battle.cardManagers[this.player].deck.cards[c].id==this.cards[b].id){
                                        this.battle.cardManagers[this.player].deck.cards[c].limit++
                                    }
                                }
                            }
                            if(this.cards[b].spec.includes(36)&&floor(random(0,5))==0){
                                this.cards[b].exhaust=true
                                for(let c=0,lc=this.battle.cardManagers[this.player].deck.cards.length;c<lc;c++){
                                    if(this.battle.cardManagers[this.player].deck.cards[c].id==this.cards[b].id){
                                        this.battle.cardManagers[this.player].deck.cards.splice(c,1)
                                        c--
                                        lc--
                                    }
                                }
                            }
                            if(this.cards[b].attack==1133){
                                this.cards[b].effect[0]--
                                for(let c=0,lc=this.battle.cardManagers[this.player].deck.cards.length;c<lc;c++){
                                    if(this.battle.cardManagers[this.player].deck.cards[c].id==this.cards[b].id){
                                        this.battle.cardManagers[this.player].deck.cards[c].effect[0]--
                                    }
                                }
                                if(this.cards[b].effect[0]<=0){
                                    this.cards[b].exhaust=true
                                    for(let c=0,lc=this.battle.cardManagers[this.player].deck.cards.length;c<lc;c++){
                                        if(this.battle.cardManagers[this.player].deck.cards[c].id==this.cards[b].id){
                                            this.battle.cardManagers[this.player].deck.cards.splice(c,1)
                                            c--
                                            lc--
                                        }
                                    }
                                    this.add(findName('Worthless\nBaseball Card',types.card),this.cards[b].level,this.cards[b].color)
                                    this.battle.cardManagers[this.player].deck.add(findName('Card\nSleeve',types.card),this.cards[b].level,this.cards[b].color)
                                    this.battle.cardManagers[this.player].deck.add(findName('Worthless\nBaseball Card',types.card),this.cards[b].level,this.cards[b].color)
                                }
                            }
                            if(this.cards[b].attack==1146){
                                this.cards[b].effect[0]+=this.cards[b].effect[1]
                                for(let c=0,lc=this.battle.cardManagers[this.player].deck.cards.length;c<lc;c++){
                                    if(this.battle.cardManagers[this.player].deck.cards[c].id==this.cards[b].id){
                                        this.battle.cardManagers[this.player].deck.cards[c].effect[0]+=this.cards[b].effect[1]
                                    }
                                }
                            }
                            this.cards[b].played()
                            this.cards.forEach(card=>card.anotherPlayed(this.cards[b].class,this.cards[b].name,this.cards[b].basic))
                            if(this.spec.includes(12)){
                                let characteristic=this.battle.combatantManager.combatants[this.battle.attackManager.user].id==a?1:0
                                this.battle.attackManager.type=this.battle.attackManager.type[characteristic]
                                this.battle.attackManager.effect=this.battle.attackManager.effect[characteristic]
                                this.battle.attackManager.attackClass=this.battle.attackManager.attackClass[characteristic]
                            }
                            this.battle.playCard(this.cards[b],this.player,this.battle.combatantManager.combatants[this.battle.attackManager.user].id==a?1:0)
                        }
                    }
                    this.cost(this.battle.attackManager.cost,this.battle.attackManager.attackClass,this.spec,this.target)
                    this.battle.attackManager.execute()
                    this.battle.updateTargetting()
                    for(let b=0,lb=this.cards.length;b<lb;b++){
                        if(!this.cards[b].usable){
                            this.lastPlayed[0]=[this.cards[b].type,this.cards[b].level,this.cards[b].color]
                            this.lastPlayed[this.cards[b].class]=[this.cards[b].type,this.cards[b].level,this.cards[b].color]
                            if(this.cards[b].spec.includes(26)){
                                this.battle.cardManagers[this.battle.players-1-this.player].callAmalgums(this.battle.attackManager)
                            }
                        }
                    }
                }
            break
            case 4:
                this.cards[a].deSize=true
                this.cards[a].callSpecDiscardEffect()
                for(let b=0,lb=this.cards.length;b<lb;b++){
                    this.cards[b].otherDiscard()
                }
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
                this.battle.attackManager.combo=this.battle.combatantManager.combatants[this.battle.attackManager.user].combo
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
                if(this.cards[a].attack!=-3){
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                    if(this.status.exhaust>0){
                        this.status.exhaust--
                    }
                }
            break
            case 9:
                this.cards[a].deSize=true
                this.cards[a].discardEffect.push(1)
                if(this.status.reserve>0){
                    this.status.reserve--
                }
            break
            case 10:
                for(let b=0,lb=this.status.nightmare;b<lb;b++){
                    this.battle.cardManagers[this.player].reserve.cards.push(copyCardFree(this.cards[a]))
                }
                if(this.status.nightmare>0){
                    this.status.nightmare=0
                }
            break
            case 11:
                this.cards[a].deSize=true
                this.cards[a].discardEffect.push(0)
                if(this.status.upgrade>0){
                    this.status.upgrade--
                }
            break
            case 12:
                this.cards[a].deSize=true
                this.cards[a].discardEffect.push(4)
                if(this.status.transform>0){
                    this.status.transform--
                }
            break
            case 13:
                this.cards[a].deSize=true
                this.cards[a].discardEffect.push(5)
                if(this.status.badreserve>0){
                    this.status.badreserve--
                }
            break
            case 14:
                this.cards[a].retain2=true
                if(this.status.retain2>0){
                    this.status.retain2--
                }
            break
            case 15:
                this.cards[a].deSize=true
                this.cards[a].callSpecDiscardEffect()
                for(let b=0,lb=this.cards.length;b<lb;b++){
                    this.cards[b].otherDiscard()
                }
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.status.discardBlock)
            break
            case 16:
                this.cards[a].cost=0
                this.cards[a].base.cost=0
                if(this.status.free2>0){
                    this.status.free2--
                }
            break
            case 17:
                if(this.cards[a].attack!=-3){
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.status.exhaustBlock*max(0,this.cards[a].cost))
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                    if(this.status.exhaustBlock>0){
                        this.status.exhaustBlock=0
                    }
                }
            break
            case 18:
                if(this.cards[a].name=='Card\nSlot'||this.cards[a].spec.includes(31)){
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                    if(this.cards[a].name=='Card\nSlot'){
                        this.add(findName('Card\nSlot',types.card),0,0)
                    }
                    if(this.status.exhaustSlot>0){
                        this.status.exhaustSlot--
                    }
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
                this.anim.nightmare=smoothAnim(this.anim.nightmare,this.status.nightmare!=0,0,1,5)
                this.anim.rebound=smoothAnim(this.anim.rebound,this.status.rebound!=0,0,1,5)
                this.anim.upgrade=smoothAnim(this.anim.upgrade,this.status.upgrade!=0,0,1,5)
                this.anim.transform=smoothAnim(this.anim.transform,this.status.transform!=0,0,1,5)
                this.anim.badreserve=smoothAnim(this.anim.badreserve,this.status.badreserve!=0,0,1,5)
                this.anim.retain2=smoothAnim(this.anim.retain2,this.status.retain2!=0,0,1,5)
                this.anim.discardBlock=smoothAnim(this.anim.discardBlock,this.status.discardBlock!=0,0,1,5)
                this.anim.free2=smoothAnim(this.anim.free2,this.status.free2!=0,0,1,5)
                this.anim.exhaustBlock=smoothAnim(this.anim.exhaustBlock,this.status.exhaustBlock!=0,0,1,5)
                this.anim.exhaustSlot=smoothAnim(this.anim.exhaustSlot,this.status.exhaustSlot!=0,0,1,5)
                let selected=false
                for(let a=0,la=this.cards.length;a<la;a++){
                    if(this.cards[a].select){
                        selected=true
                    }
                }
                let cap=0
                if(this.cards.length>0&&(this.cards[0].attack==817||this.cards[0].attack==1003||this.cards[0].attack==1012)){
                    this.cards[0].cost=0
                }
                for(let a=0,la=this.cards.length;a<la;a++){
                    let length=
                    (a==0?
                        (100+(this.cards[a].spec.includes(34)?-20:((this.cards[a].spec.includes(33)?50:0)+(this.battle.relicManager.hasRelic(170,this.player)?25:0))))
                        :(
                            (this.cards[a].name=='Unbuild'&&this.cards[a-1].name=='Unbuild'&&this.cards[a].level==this.cards[a-1].level&&this.cards[a].color==this.cards[a-1].color&&this.cards[a].additionalSpec.length==0&&this.cards[a-1].additionalSpec.length==0?50:100)+
                            (this.cards[a].spec.includes(33)?50:0)+
                            (a>0&&this.cards[a-1].spec.includes(33)?50:0)+
                            (this.battle.relicManager.hasRelic(170,this.player)?50:0)+
                            (this.cards[a].spec.includes(34)?-20:0)+
                            (a>0&&this.cards[a-1].spec.includes(34)?-20:0)
                            )*(this.compact?0.7:1)
                    )
                    cap+=length
                    for(let b=0,lb=variants.speedmove?2:1;b<lb;b++){
                        this.cards[a].update(1,'hand',this.battle.relicManager.hasRelic(170,this.player))
                        this.cards[a].upSize=pointInsideBox({position:inputs.rel},this.cards[a])&&!this.battle.overlayManager.anyActive&&!selected
                        if(this.cards[a].position.x>cap&&(this.cards[a].position.x>this.cards[max(0,a-1)].position.x+length||a==0)){
                            this.cards[a].position.x=max(this.cards[a].position.x-25*(this.compact?0.7:1),cap)
                        }
                        if(this.cards.length>0&&abs((this.cards.length-1)/2-a)<=0.5&&(this.cards[a].attack==1034||this.cards[a].attack==1037)){
                            this.cards[a].cost=0
                        }
                    }
                    if(this.cards[a].size<=0){
                        if(this.cards[a].discardEffect.length>0){
                            this.cards[a].deSize=false
                            if(this.cards[a].discardEffect.includes(0)){
                                this.cards[a]=upgradeCard(this.cards[a])
                                this.cards[a].discardEffect.splice(this.cards[a].discardEffect.indexOf(0))
                            }
                            if(this.cards[a].discardEffect.includes(4)){
                                this.cards[a]=this.battle.cardManagers[this.player].transformCard(this.cards[a])
                                this.cards[a].discardEffect.splice(this.cards[a].discardEffect.indexOf(0))
                            }
                            if(this.cards[a].discardEffect.includes(2)){
                                this.cards[a]=this.battle.cardManagers[this.player].transformCard(this.cards[a])
                                this.cards[a].discardEffect.splice(this.cards[a].discardEffect.indexOf(2))
                            }
                            if(this.cards[a].discardEffect.includes(1)){
                                this.cards[a].cost=0
                                this.cards[a].discardEffect=[]
                                this.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1)
                                a--
                                la--
                            }else if(this.cards[a].discardEffect.includes(3)){
                                this.cards[a].discardEffect=[]
                                this.cards[a].player=this.battle.players-1-this.cards[a].player
                                this.send(this.battle.cardManagers[this.battle.players-1-this.player].hand.cards,a,a+1,1)
                                a--
                                la--
                            }else if(this.cards[a].discardEffect.includes(5)){
                                this.cards[a].discardEffect=[]
                                this.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                a--
                                la--
                            }else{
                                this.cards[a].discardEffect=[]
                            }
                        }else if(this.cards[a].attack==1031||this.cards[a].attack.length==2&&this.cards[a].attack[0]==1189&&!this.cards[a].exhaust){
                            this.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1)
                            a--
                            la--
                        }else if((this.cards[a].attack==1248||this.cards[a].attack==1333)&&!this.cards[a].exhaust){
                            this.send(this.cards,a,a+1,2)
                            a--
                            la--
                        }else if(this.cards[a].exhaust){
                            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                            if(userCombatant.getStatus('Double Exhaust')>0&&this.cards[a].attack!=1287){
                                userCombatant.status.main[findList('Double Exhaust',userCombatant.status.name)]--
                                this.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1,7)
                                a--
                                la--
                                this.battle.cardManagers[this.player].reserve.copySelfInput(this.battle.cardManagers[this.player].reserve.cards.length-1)
                            }else if(userCombatant.getStatus('Cancel Exhaust')>0&&this.cards[a].attack!=180){
                                userCombatant.status.main[findList('Cancel Exhaust',userCombatant.status.name)]--
                                this.send(this.battle.cardManagers[this.player].discard.cards,a,a+1,7)
                                a--
                                la--
                            }else{
                                if(userCombatant.getStatus('Exhaust Draw')>0){
                                    this.battle.cardManagers[this.player].draw(userCombatant.getStatus('Exhaust Draw'))
                                }
                                if(this.cards[a].class!=5&&!this.cards[a].spec.includes(4)){
                                    this.battle.relicManager.activate(10,[this.player])
                                }
                                if(variants.witch&&this.cards[a].spec.includes(31)){
                                    this.battle.cardManagers[this.player].draw(1)
                                }
                                this.cards[a].callExhaustEffect()
                                this.send(this.battle.cardManagers[this.player].exhaust.cards,a,a+1)
                                a--
                                la--
                            }
                        }else if(this.status.rebound>0){
                            this.cards[a].discardEffect=[]
                            this.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1)
                            a--
                            la--
                            this.status.rebound--
                        }else{
                            if(this.cards[a].discardEffectBuffered.includes(0)){
                                this.cards[a]=upgradeCard(this.cards[a])
                                this.cards[a].discardEffectBuffered.splice(this.cards[a].discardEffectBuffered.indexOf(0))
                            }
                            if(this.cards[a].spec.includes(23)){
                                this.battle.cardManagers[this.player].draw(1)
                            }
                            this.send(this.battle.cardManagers[this.player].discard.cards,a,a+1,7)
                            a--
                            la--
                        }
                    }else if(this.cards[a].remove){
                        this.cards.splice(a,1)
                        a--
                        la--
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
            case 'overlay': case 'tier':
                this.cards.forEach(card=>card.update())
            break
        }
    }
    onClick(scene){
        if(this.battle.attackManager.targetInfo[0]==1||this.battle.attackManager.targetInfo[0]==3||this.battle.attackManager.targetInfo[0]==4||this.battle.attackManager.targetInfo[0]==6||this.battle.attackManager.targetInfo[0]==11||this.battle.attackManager.targetInfo[0]==13||this.battle.attackManager.targetInfo[0]==15||this.battle.attackManager.targetInfo[0]==27||this.battle.attackManager.targetInfo[0]==30||this.battle.attackManager.targetInfo[0]==31||this.battle.attackManager.targetInfo[0]==32){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==2||this.battle.attackManager.targetInfo[0]==3||this.battle.attackManager.targetInfo[0]==5||this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==11||this.battle.attackManager.targetInfo[0]==22||this.battle.attackManager.targetInfo[0]==26||this.battle.attackManager.targetInfo[0]==40||this.battle.attackManager.targetInfo[0]==45){
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].life>0&&(this.battle.combatantManager.combatants[a].team!=this.battle.combatantManager.combatants[this.battle.attackManager.user].team||this.battle.attackManager.targetInfo[0]==45)&&
                    (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],this.battle.relicManager.hasRelic(145,this.player)?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5||this.battle.attackManager.targetInfo[0]==45)&&
                    !(this.battle.attackManager.targetInfo[0]==22&&this.battle.combatantManager.combatants[a].tilePosition.y!=this.battle.attackManager.tilePosition.y)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<game.targetRadius){
                    this.callInput(3,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==4||this.battle.attackManager.targetInfo[0]==20){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&legalTargetCombatant(1,this.battle.attackManager.targetInfo[1]+1,this.battle.attackManager.targetInfo[2]+1,this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)&&dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==7){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    legalTargetCombatant(0,1,this.battle.energy.main[this.battle.attackManager.player]+this.battle.attackManager.targetInfo[1]+(this.battle.relicManager.hasRelic(121,this.battle.attackManager.player)?2:0),this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)&&
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
        if(this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==26){
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team==this.battle.combatantManager.combatants[this.battle.attackManager.user].team&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<game.targetRadius){
                    this.callInput(3,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==12||this.battle.attackManager.targetInfo[0]==13){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetDiagonalCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==14||this.battle.attackManager.targetInfo[0]==15){
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team!=this.battle.combatantManager.combatants[this.battle.attackManager.user].team&&
                    (legalTargetDiagonalCombatant(0,this.battle.attackManager.targetInfo[1],this.battle.relicManager.hasRelic(145,this.player)?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<game.targetRadius){
                    this.callInput(3,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==16){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    this.battle.tileManager.getTileIndex(this.battle.tileManager.tiles[a].tilePosition.x+(this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x)/max(abs(this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x),abs(this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y)),this.battle.tileManager.tiles[a].tilePosition.y+(this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y)/max(abs(this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x),abs(this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y)))<0&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==17){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    this.battle.tileManager.tiles[a].tilePosition.y==this.battle.attackManager.tilePosition.y&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==18){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    this.battle.tileManager.tiles[a].type.includes(3)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==19){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].type.includes(3)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==21||this.battle.attackManager.targetInfo[0]==31){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (arrayIncludes(constants.L,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y]))&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==23){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].type.includes(19)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==24){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    (this.battle.tileManager.tiles[a].tilePosition.y!=this.battle.attackManager.tilePosition.y||this.battle.tileManager.tiles[a].tilePosition.x<this.battle.attackManager.tilePosition.x)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==25){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    (this.battle.tileManager.tiles[a].tilePosition.y!=this.battle.attackManager.tilePosition.y||this.battle.tileManager.tiles[a].tilePosition.x>this.battle.attackManager.tilePosition.x)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==27){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetDiagonalCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[3],this.battle.attackManager.targetInfo[4],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==28){
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team==this.battle.combatantManager.combatants[this.battle.attackManager.user].team&&this.battle.combatantManager.combatants[a].construct&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<game.targetRadius){
                    this.callInput(3,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==29){
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team==this.battle.combatantManager.combatants[this.battle.attackManager.user].team&&
                    (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],this.battle.relicManager.hasRelic(145,this.player)?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<game.targetRadius){
                    this.callInput(3,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==30){
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team!=this.battle.combatantManager.combatants[this.battle.attackManager.user].team&&
                    (legalTargetCombatant(0,this.battle.attackManager.targetInfo[3],this.battle.relicManager.hasRelic(145,this.player)?1:this.battle.attackManager.targetInfo[4],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5)&&
                    !(this.battle.attackManager.targetInfo[0]==22&&this.battle.combatantManager.combatants[a].tilePosition.y!=this.battle.attackManager.tilePosition.y)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<game.targetRadius){
                    this.callInput(3,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==32||this.battle.attackManager.targetInfo[0]==40){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[3],this.battle.attackManager.targetInfo[4],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    (this.battle.tileManager.tiles[a].type.includes(3)||this.battle.attackManager.targetInfo[0]==40)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==33){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    this.battle.tileManager.tiles[a].tilePosition.y>=this.battle.attackManager.tilePosition.y&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==34){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    this.battle.tileManager.tiles[a].tilePosition.y<=this.battle.attackManager.tilePosition.y&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==35||this.battle.attackManager.targetInfo[0]==36){
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].life>0&&
                    (legalTargetCombatant(0,this.battle.attackManager.targetInfo[2],this.battle.relicManager.hasRelic(145,this.player)?1:this.battle.attackManager.targetInfo[3],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==36)&&
                    this.battle.combatantManager.combatants[a].name==this.battle.attackManager.targetInfo[1]&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<game.targetRadius){
                    this.callInput(3,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==37){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (arrayIncludes(constants.D1,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y]))&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==38){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (arrayIncludes(constants.D2,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y]))&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==39){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (arrayIncludes(constants.D3,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y]))&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==41){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (arrayIncludes(constants.HG1,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y]))&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==42){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (arrayIncludes(constants.HG2,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y]))&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==43){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (arrayIncludes(constants.HG3,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y]))&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==44){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(2,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles))&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==46){
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].life>0&&(
                    (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],this.battle.relicManager.hasRelic(145,this.player)?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles))||
                    (legalTargetCombatant(0,this.battle.attackManager.targetInfo[3],this.battle.relicManager.hasRelic(145,this.player)?1:this.battle.attackManager.targetInfo[4],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)&&this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].ammo>0))&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<game.targetRadius){
                    this.callInput(3,a)
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
                            if(this.status.nightmare!=0){
                                this.callInput(10,a)
                                break
                            }
                            if(this.status.upgrade!=0){
                                this.callInput(11,a)
                                break
                            }
                            if(this.status.transform!=0){
                                this.callInput(12,a)
                                break
                            }
                            if(this.status.badreserve!=0){
                                this.callInput(13,a)
                                break
                            }
                            if(this.status.retain2!=0){
                                this.callInput(14,a)
                                break
                            }
                            if(this.status.discardBlock!=0){
                                this.callInput(15,a)
                                break
                            }
                            if(this.status.free2!=0){
                                this.callInput(16,a)
                                break
                            }
                            if(this.status.exhaustBlock!=0){
                                this.callInput(17,a)
                                break
                            }
                            if(this.status.exhaustSlot!=0){
                                this.callInput(18,a)
                                break
                            }
                            if(this.cards[a].usable&&this.battle.attackManager.attacks.length<=0&&this.cards[a].playable()){
                                if(this.cards[a].afford){
                                    this.callInput(0,a)
                                    break
                                }else if(this.cards[a].spec.includes(35)&&this.battle.energy.main[this.player]>0){
                                    this.cards[a].cost-=this.battle.energy.main[this.player]
                                    this.battle.energy.main[this.player]=0
                                }else if(!this.cards[a].energyAfford){
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
        if(this.battle.attackManager.targetInfo[0]==1||this.battle.attackManager.targetInfo[0]==3||this.battle.attackManager.targetInfo[0]==4||this.battle.attackManager.targetInfo[0]==6||this.battle.attackManager.targetInfo[0]==11||this.battle.attackManager.targetInfo[0]==13||this.battle.attackManager.targetInfo[0]==15||this.battle.attackManager.targetInfo[0]==27||this.battle.attackManager.targetInfo[0]==30||this.battle.attackManager.targetInfo[0]==31||this.battle.attackManager.targetInfo[0]==32){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==2||this.battle.attackManager.targetInfo[0]==3||this.battle.attackManager.targetInfo[0]==5||this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==11||this.battle.attackManager.targetInfo[0]==22||this.battle.attackManager.targetInfo[0]==26||this.battle.attackManager.targetInfo[0]==40||this.battle.attackManager.targetInfo[0]==45){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&key==' '){
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.battle.combatantManager.combatants[a].life>0&&(this.battle.combatantManager.combatants[a].team!=this.battle.combatantManager.combatants[this.battle.attackManager.user].team||this.battle.attackManager.targetInfo[0]==45)&&
                        (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],this.battle.relicManager.hasRelic(145,this.player)?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5||this.battle.attackManager.targetInfo[0]==45)&&
                        !(this.battle.attackManager.targetInfo[0]==22&&this.battle.combatantManager.combatants[a].tilePosition.y!=this.battle.attackManager.tilePosition.y)&&
                        this.battle.combatantManager.combatants[a].tilePosition.x==int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x&&this.battle.combatantManager.combatants[a].tilePosition.y==int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y){
                        this.callInput(3,a)
                    }
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==4||this.battle.attackManager.targetInfo[0]==20){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&legalTargetCombatant(1,this.battle.attackManager.targetInfo[1]+1,this.battle.attackManager.targetInfo[2]+1,this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==7){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&legalTargetCombatant(0,1,this.battle.energy.main[this.battle.attackManager.player]+this.battle.attackManager.targetInfo[1]+(this.battle.relicManager.hasRelic(121,this.battle.attackManager.player)?2:0),this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==8){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(legalTargetCombatant(2,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==9){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                this.callInput(2,a)
            }
        }
        if(this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==26){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&key==' '){
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team==this.battle.combatantManager.combatants[this.battle.attackManager.user].team&&
                        this.battle.combatantManager.combatants[a].tilePosition.x==int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x&&this.battle.combatantManager.combatants[a].tilePosition.y==int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y){
                        this.callInput(3,a)
                    }
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==12||this.battle.attackManager.targetInfo[0]==13){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetDiagonalCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==14||this.battle.attackManager.targetInfo[0]==15){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&key==' '){
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team!=this.battle.combatantManager.combatants[this.battle.attackManager.user].team&&
                        (legalTargetDiagonalCombatant(0,this.battle.attackManager.targetInfo[1],this.battle.relicManager.hasRelic(145,this.player)?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5)&&
                        this.battle.combatantManager.combatants[a].tilePosition.x==int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x&&this.battle.combatantManager.combatants[a].tilePosition.y==int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y){
                        this.callInput(3,a)
                    }
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==16){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    this.battle.tileManager.getTileIndex(this.battle.tileManager.tiles[a].tilePosition.x+(this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x)/max(abs(this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x),abs(this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y)),this.battle.tileManager.tiles[a].tilePosition.y+(this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y)/max(abs(this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x),abs(this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y)))<0){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==17){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&this.battle.tileManager.tiles[a].tilePosition.y==this.battle.attackManager.tilePosition.y&&
                    (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==18){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    this.battle.tileManager.tiles[a].type.includes(3)&&
                    (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==19){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].type.includes(3)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==21||this.battle.attackManager.targetInfo[0]==31){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&arrayIncludes(constants.L,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y])){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==23){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].type.includes(19)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==24){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&(this.battle.tileManager.tiles[a].tilePosition.y!=this.battle.attackManager.tilePosition.y||this.battle.tileManager.tiles[a].tilePosition.x<this.battle.attackManager.tilePosition.x)&&
                    (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==25){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&(this.battle.tileManager.tiles[a].tilePosition.y!=this.battle.attackManager.tilePosition.y||this.battle.tileManager.tiles[a].tilePosition.x>this.battle.attackManager.tilePosition.x)&&
                    (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==27){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetDiagonalCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[3],this.battle.attackManager.targetInfo[4],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==28){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&key==' '){
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team==this.battle.combatantManager.combatants[this.battle.attackManager.user].team&&this.battle.combatantManager.combatants[a].construct&&
                        this.battle.combatantManager.combatants[a].tilePosition.x==int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x&&this.battle.combatantManager.combatants[a].tilePosition.y==int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y){
                        this.callInput(3,a)
                    }
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==29){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&key==' '){
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team==this.battle.combatantManager.combatants[this.battle.attackManager.user].team&&
                        (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],this.battle.relicManager.hasRelic(145,this.player)?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5)&&
                        this.battle.combatantManager.combatants[a].tilePosition.x==int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x&&this.battle.combatantManager.combatants[a].tilePosition.y==int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y){
                        this.callInput(3,a)
                    }
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==30){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&key==' '){
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team!=this.battle.combatantManager.combatants[this.battle.attackManager.user].team&&
                        (legalTargetCombatant(0,this.battle.attackManager.targetInfo[3],this.battle.relicManager.hasRelic(145,this.player)?1:this.battle.attackManager.targetInfo[4],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5)&&
                        !(this.battle.attackManager.targetInfo[0]==22&&this.battle.combatantManager.combatants[a].tilePosition.y!=this.battle.attackManager.tilePosition.y)&&
                        this.battle.combatantManager.combatants[a].tilePosition.x==int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x&&this.battle.combatantManager.combatants[a].tilePosition.y==int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y){
                        this.callInput(3,a)
                    }
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==32||this.battle.attackManager.targetInfo[0]==40){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (this.battle.tileManager.tiles[a].type.includes(3)||this.battle.attackManager.targetInfo[0]==40)&&
                    (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[3],this.battle.attackManager.targetInfo[4],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==33){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&this.battle.tileManager.tiles[a].tilePosition.y>=this.battle.attackManager.tilePosition.y&&
                    (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==34){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&this.battle.tileManager.tiles[a].tilePosition.y<=this.battle.attackManager.tilePosition.y&&
                    (legalTargetCombatant(this.battle.relicManager.active[150]?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==35||this.battle.attackManager.targetInfo[0]==36){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&key==' '){
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.battle.combatantManager.combatants[a].life>0&&
                        (legalTargetCombatant(0,this.battle.attackManager.targetInfo[2],this.battle.relicManager.hasRelic(145,this.player)?1:this.battle.attackManager.targetInfo[3],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==36)&&
                        this.battle.combatantManager.combatants[a].name==this.battle.attackManager.targetInfo[1]&&
                        this.battle.combatantManager.combatants[a].tilePosition.x==int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x&&this.battle.combatantManager.combatants[a].tilePosition.y==int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y){
                        this.callInput(3,a)
                    }
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==37){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&arrayIncludes(constants.D1,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y])){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==38){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&arrayIncludes(constants.D2,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y])){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==39){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&arrayIncludes(constants.D3,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y])){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==41){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&arrayIncludes(constants.HG1,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y])){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==42){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&arrayIncludes(constants.HG2,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y])){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==43){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&arrayIncludes(constants.HG3,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y])){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==44){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&legalTargetCombatant(2,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==46){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&key==' '){
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.battle.combatantManager.combatants[a].life>0&&(
                        (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],this.battle.relicManager.hasRelic(145,this.player)?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles))||
                        (legalTargetCombatant(0,this.battle.attackManager.targetInfo[3],this.battle.relicManager.hasRelic(145,this.player)?1:this.battle.attackManager.targetInfo[4],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)&&this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].ammo>0))&&
                        this.battle.combatantManager.combatants[a].tilePosition.x==int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x&&this.battle.combatantManager.combatants[a].tilePosition.y==int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y){
                        this.callInput(3,a)
                    }
                }
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
                            if(this.status.nightmare!=0){
                                this.callInput(10,a)
                                break
                            }
                            if(this.status.upgrade!=0){
                                this.callInput(11,a)
                                break
                            }
                            if(this.status.transform!=0){
                                this.callInput(12,a)
                                break
                            }
                            if(this.status.badreserve!=0){
                                this.callInput(13,a)
                                break
                            }
                            if(this.status.retain2!=0){
                                this.callInput(14,a)
                                break
                            }
                            if(this.status.discardBlock!=0){
                                this.callInput(15,a)
                                break
                            }
                            if(this.status.free2!=0){
                                this.callInput(16,a)
                                break
                            }
                            if(this.status.exhaustBlock!=0){
                                this.callInput(17,a)
                                break
                            }
                            if(this.status.exhaustSlot!=0){
                                this.callInput(18,a)
                                break
                            }
                            if(this.cards[a].usable&&this.battle.attackManager.attacks.length<=0&&this.cards[a].playable()){
                                if(this.cards[a].afford){
                                    this.callInput(0,a)
                                    break
                                }else if(this.cards[a].spec.includes(35)&&this.battle.energy.main[this.player]>0){
                                    this.cards[a].cost-=this.battle.energy.main[this.player]
                                    this.battle.energy.main[this.player]=0
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