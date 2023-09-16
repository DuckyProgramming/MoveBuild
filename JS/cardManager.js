class cardManager{
    constructor(layer,battle,player){
        this.layer=layer
        this.battle=battle
        this.player=player

        this.listing={card:[],allPlayerCard:[]}

        this.deck=new group(this.layer,this.battle,this.player,0)
        this.reserve=new group(this.layer,this.battle,this.player,1)
        this.hand=new group(this.layer,this.battle,this.player,2)
        this.discard=new group(this.layer,this.battle,this.player,3)
        this.drop=new group(this.layer,this.battle,this.player,4)
        this.exhaust=new group(this.layer,this.battle,this.player,5)

        this.altDraw=this.battle.player[this.player]==game.playerNumber
        this.drawAmount=variants.lowDraw?5:6-(this.altDraw?3:0)
        this.tempDraw=0

        this.initialListing()
    }
    initialListing(){
        for(let a=0;a<game.playerNumber+4;a++){
            this.listing.card.push([[],[],[],[]])
        }
        this.listing.allPlayerCard=[[],[],[],[]]
        for(let a=0,la=types.card.length;a<la;a++){
            if(types.card[a].rarity>=0&&types.card[a].list>=0){
                this.listing.card[types.card[a].list][types.card[a].rarity].push(a)
                this.listing.card[types.card[a].list][3].push(a)
                if(types.card[a].list>0&&types.card[a].list<=game.playerNumber){
                    this.listing.allPlayerCard[types.card[a].rarity].push(a)
                    this.listing.allPlayerCard[3].push(a)
                }
            }
            if(types.card[a].rarity==-4&&this.battle.player.includes(2)&&this.battle.player.includes(7)){
                if(types.card[a].list==27){
                    this.listing.card[2][2].push(a)
                    this.listing.card[2][3].push(a)
                    this.listing.card[7][2].push(a)
                    this.listing.card[7][3].push(a)
                }else{
                    this.listing.card[types.card[a].list][2].push(a)
                    this.listing.card[types.card[a].list][3].push(a)
                }
            }
        }
    }
    initialDeck(){
        this.deck.initialCards(this.battle.deck[this.player],this.battle.player[this.player])
    }
    getList(type){
        switch(type){
            case 0: return this.deck
            case 1: return this.reserve
            case 2: return this.hand
            case 3: return this.discard
            case 4: return this.drop
            case 5: return this.exhaust
        }
    }
    send(group1,group2){
        this.getList(group1).send(this.getList(group2).cards,0,-1)
    }
    copy(group1,group2){
        this.getList(group1).copy(this.getList(group2).cards,0,-1)
    }
    shuffle(group){
        this.getList(group).shuffle()
    }
    allEffect(group,effect){
        this.getList(group).allEffect(effect)
    }
    randomEffect(group,effect,args){
        this.getList(group).randomEffect(effect,args)
    }
    addRandom(group,level,rarity){
        this.getList(group).add(this.listing.card[this.battle.player[this.player]][rarity][floor(random(0,this.listing.card[this.battle.player[this.player]][rarity].length))],level,this.battle.player[this.player])
    }
    addRandomFree(group,level,rarity,variant){
        this.getList(group).addFree(this.listing.card[this.battle.player[this.player]][rarity][floor(random(0,this.listing.card[this.battle.player[this.player]][rarity].length))],level,this.battle.player[this.player],variant)
    }
    addRandomColor(group,level,color,rarity){
        this.getList(group).add(this.listing.card[color][rarity][floor(random(0,this.listing.card[color][rarity].length))],level,color)
    }
    addRandomClass(group,level,cardClass){
        let list=[]
        for(let a=0,la=this.listing.card[this.battle.player[this.player]][3].length;a<la;a++){
            if(types.card[this.listing.card[this.battle.player[this.player]][3][a]].levels[level].class==cardClass){
                list.push(this.listing.card[this.battle.player[this.player]][3][a])
            }
        }
        if(list.length>0){
            this.getList(group).add(list[floor(random(0,list.length))],level,this.battle.player[this.player])
        }
    }
    addRandomClassFree(group,level,cardClass,variant){
        let list=[]
        for(let a=0,la=this.listing.card[this.battle.player[this.player]][3].length;a<la;a++){
            if(types.card[this.listing.card[this.battle.player[this.player]][3][a]].levels[level].class==cardClass){
                list.push(this.listing.card[this.battle.player[this.player]][3][a])
            }
        }
        if(list.length>0){
            this.getList(group).addFree(list[floor(random(0,list.length))],level,this.battle.player[this.player],variant)
        }
    }
    addRandomClassFreeSpec(group,level,cardClass,variant,spec){
        let list=[]
        for(let a=0,la=this.listing.card[this.battle.player[this.player]][3].length;a<la;a++){
            if(types.card[this.listing.card[this.battle.player[this.player]][3][a]].levels[level].class==cardClass){
                list.push(this.listing.card[this.battle.player[this.player]][3][a])
            }
        }
        if(list.length>0){
            this.getList(group).addFreeSpec(list[floor(random(0,list.length))],level,this.battle.player[this.player],variant,spec)
        }
    }
    addRandomClassReturn(group,level,cardClass){
        let list=[]
        for(let a=0,la=this.listing.card[this.battle.player[this.player]][3].length;a<la;a++){
            if(types.card[this.listing.card[this.battle.player[this.player]][3][a]].levels[level].class==cardClass){
                list.push(this.listing.card[this.battle.player[this.player]][3][a])
            }
        }
        if(list.length>0){
            return this.getList(group).addReturn(list[floor(random(0,list.length))],level,this.battle.player[this.player])
        }
    }
    addRandomAll(group,level,rarity){
        let type=this.listing.allPlayerCard[rarity][floor(random(0,this.listing.allPlayerCard[rarity].length))]
        this.getList(group).add(type,level,types.card[type].list)
    }
    addRandomAllClass(group,level,cardClass){
        let list=[]
        for(let a=0,la=this.listing.allPlayerCard[3].length;a<la;a++){
            if(types.card[this.listing.allPlayerCard[3][a]].levels[level].class==cardClass){
                list.push(this.listing.allPlayerCard[3][a])
            }
        }
        if(list.length>0){
            let type=list[floor(random(0,list.length))]
            this.getList(group).add(type,level,types.card[type].list)
        }
    }
    addRandomClassAllFreeShuffle(group,level,cardClass,variant){
        let list=[]
        for(let a=0,la=this.listing.allPlayerCard[3].length;a<la;a++){
            if(types.card[this.listing.allPlayerCard[3][a]].levels[level].class==cardClass){
                list.push(this.listing.allPlayerCard[3][a])
            }
        }
        if(list.length>0){
            let type=list[floor(random(0,list.length))]
            this.getList(group).addFreeShuffle(type,level,types.card[type].list,variant)
        }
    }
    addRandomAllPriority(group,level){
        let list=[]
        for(let a=0,la=this.listing.allPlayerCard[3].length;a<la;a++){
            list.push(this.listing.allPlayerCard[3][a])
            if(types.card[this.listing.allPlayerCard[3][a]].list==this.battle.player[this.player]){
                for(let b=0,lb=4;b<lb;b++){
                    list.push(this.listing.allPlayerCard[3][a])
                }
            }
        }
        if(list.length>0){
            let type=list[floor(random(0,list.length))]
            this.getList(group).add(type,level,types.card[type].list)
        }
    }
    addRandomClassAllPriority(group,level,cardClass){
        let list=[]
        for(let a=0,la=this.listing.allPlayerCard[3].length;a<la;a++){
            if(types.card[this.listing.allPlayerCard[3][a]].levels[level].class==cardClass){
                list.push(this.listing.allPlayerCard[3][a])
                if(types.card[this.listing.allPlayerCard[3][a]].list==this.battle.player[this.player]){
                    for(let b=0,lb=4;b<lb;b++){
                        list.push(this.listing.allPlayerCard[3][a])
                    }
                }
            }
        }
        if(list.length>0){
            let type=list[floor(random(0,list.length))]
            this.getList(group).add(type,level,types.card[type].list)
        }
    }
    addRandomSpec(group,level,spec){
        let list=[]
        for(let a=0,la=types.card.length;a<la;a++){
            if(types.card[a].levels[level].spec.includes(spec)){
                list.push(a)
            }
        }
        if(list.length>0){
            this.getList(group).add(list[floor(random(0,list.length))],level,this.battle.player[this.player])
        }
    }
    callAmalgums(attackManager){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(legalTargetCombatant(0,1,1,this.battle.combatantManager.combatants[attackManager.target[0]],userCombatant,this.battle.tileManager.tiles)){
            this.hand.callAmalgums()
            this.discard.callAmalgums()
            this.reserve.callAmalgums()
        }
    }
    draw(amount){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(userCombatant.getStatus('No Draw')<=0){
            this.battle.stats.drawn[this.player]+=amount
            let amountLeft=amount-this.reserve.cards.length
            if(this.reserve.cards.length>0){
                this.reserve.send(this.hand.cards,0,min(amount,this.reserve.cards.length),3,this.hand)
            }
            if(amountLeft>0&&this.discard.cards.length>0&&!this.altDraw){
                this.discard.send(this.reserve.cards,0,-1,2)
                this.reserve.shuffle()
                if(this.reserve.cards.length>0){
                    this.reserve.send(this.hand.cards,0,min(amountLeft,this.reserve.cards.length),3,this.hand)
                }
            }
            if(this.battle.relicManager.hasRelic(106,this.player)){
                for(let a=0,la=this.hand.cards.length;a<la;a++){
                    if(this.hand.cards[a].class==5&&this.hand.cards[a].name!='Fatigue'){
                        this.hand.send(this.exhaust.cards,a,a+1,0)
                        a--
                        la--
                    }
                }
            }
        }
    }
    drawUpgrade(amount){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(userCombatant.getStatus('No Draw')<=0){
            this.battle.stats.drawn[this.player]+=amount
            let amountLeft=amount-this.reserve.cards.length
            if(this.reserve.cards.length>0){
                this.reserve.send(this.hand.cards,0,min(amount,this.reserve.cards.length),8,this.hand)
            }
            if(amountLeft>0&&this.discard.cards.length>0){
                this.discard.send(this.reserve.cards,0,-1,2)
                this.reserve.shuffle()
                if(this.reserve.cards.length>0){
                    this.reserve.send(this.hand.cards,0,min(amountLeft,this.reserve.cards.length),8,this.hand)
                }
            }
            if(this.battle.relicManager.hasRelic(106,this.player)){
                for(let a=0,la=this.hand.cards.length;a<la;a++){
                    if(this.hand.cards[a].class==5&&this.hand.cards[a].name!='Fatigue'){
                        this.hand.send(this.exhaust.cards,a,a+1,0)
                        a--
                        la--
                    }
                }
            }
        }
    }
    drawPrice(amount,variant){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(userCombatant.getStatus('No Draw')<=0){
            this.battle.stats.drawn[this.player]+=amount
            let amountLeft=amount-this.reserve.cards.length
            if(this.reserve.cards.length>0){
                this.reserve.send(this.hand.cards,0,min(amount,this.reserve.cards.length),variant==1?6:5,this.hand)
            }
            if(amountLeft>0&&this.discard.cards.length>0){
                this.discard.send(this.reserve.cards,0,-1,4)
                this.reserve.shuffle()
                if(this.reserve.cards.length>0){
                    this.reserve.send(this.hand.cards,0,min(amountLeft,this.reserve.cards.length),variant==1?6:5,this.hand)
                }
            }
            if(this.battle.relicManager.hasRelic(106,this.player)){
                for(let a=0,la=this.hand.cards.length;a<la;a++){
                    if(this.hand.cards[a].class==5&&this.hand.cards[a].name!='Fatigue'){
                        this.hand.send(this.exhaust.cards,a,a+1,0)
                        a--
                        la--
                    }
                }
            }
        }
    }
    drawRetain(amount){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(userCombatant.getStatus('No Draw')<=0){
            this.battle.stats.drawn[this.player]+=amount
            let amountLeft=amount-this.reserve.cards.length
            if(this.reserve.cards.length>0){
                this.reserve.send(this.hand.cards,0,min(amount,this.reserve.cards.length),9,this.hand)
            }
            if(amountLeft>0&&this.discard.cards.length>0){
                this.discard.send(this.reserve.cards,0,-1,2)
                this.reserve.shuffle()
                if(this.reserve.cards.length>0){
                    this.reserve.send(this.hand.cards,0,min(amountLeft,this.reserve.cards.length),9,this.hand)
                }
            }
            if(this.battle.relicManager.hasRelic(106,this.player)){
                for(let a=0,la=this.hand.cards.length;a<la;a++){
                    if(this.hand.cards[a].class==5&&this.hand.cards[a].name!='Fatigue'){
                        this.hand.send(this.exhaust.cards,a,a+1,0)
                        a--
                        la--
                    }
                }
            }
        }
    }
    drawInnate(){
        let total=0
        for(let a=0,la=this.reserve.cards.length;a<la;a++){
            if(this.reserve.cards[a].spec.includes(3)){
                this.reserve.send(this.hand.cards,a,a+1,3)
                a--
                la--
                total++
            }
        }
        return total
    }
    allGroupEffect(effect){
        this.reserve.allEffect(effect)
        this.hand.allEffect(effect)
        this.discard.allEffect(effect)
    }
    allGroupEffectArgs(effect,args){
        this.reserve.allEffectArgs(effect,args)
        this.hand.allEffectArgs(effect,args)
        this.discard.allEffectArgs(effect,args)
    }
    allGroupClaw(effect){
        this.reserve.allClaw(effect)
        this.hand.allClaw(effect)
        this.discard.allClaw(effect)
    }
    turnDraw(turn){
        let tempDrawAmount=this.drawAmount+this.tempDraw-(this.battle.turn.total==1&&(this.altDraw||game.ascend>=21)?1:0)
        if(turn==1){
            tempDrawAmount-=this.drawInnate()
        }
        if(this.altDraw){
            this.discard.send(this.reserve.cards,0,-1,2)
            this.reserve.shuffle()
        }
        this.draw(tempDrawAmount)
        this.tempDraw=0
        if(turn%4==0&&game.ascend>=24){
            this.reserve.addShuffle(findName('Dazed',types.card),0,game.playerNumber+1)
        }
    }
    fatigue(){
        if(this.battle.relicManager.hasRelic(108,this.player)&&this.battle.relicManager.detail[108]==0){
            this.battle.relicManager.detail[108]=1
        }else{
            this.discard.add(findName('Fatigue',types.card),0,game.playerNumber+1)
            this.drop.addDrop(findName('Fatigue',types.card),0,game.playerNumber+1)
            if(this.battle.relicManager.hasRelic(142,this.player)){
                this.discard.cards[this.discard.cards.length-1].cost++
                this.discard.cards[this.discard.cards.length-1].base.cost++
                this.drop.cards[this.drop.cards.length-1].cost++
            }
            if(this.battle.relicManager.hasRelic(167,this.player)&&floor(random(0,4))==0){
                this.discard.cards[this.discard.cards.length-1].cost--
                this.discard.cards[this.discard.cards.length-1].base.cost--
                this.drop.cards[this.drop.cards.length-1].cost--
            }
        }
    }
    heavyFatigue(){
        if(this.battle.relicManager.hasRelic(108,this.player)&&this.battle.relicManager.detail[108]==0){
            this.battle.relicManager.detail[108]=1
        }else{
            this.discard.add(findName('Heavy\nFatigue',types.card),0,game.playerNumber+1)
            this.drop.addDrop(findName('Heavy\nFatigue',types.card),0,game.playerNumber+1)
            if(this.battle.relicManager.hasRelic(142,this.player)){
                this.discard.cards[this.discard.cards.length-1].cost++
                this.discard.cards[this.discard.cards.length-1].base.cost++
                this.drop.cards[this.drop.cards.length-1].cost++
            }
            if(this.battle.relicManager.hasRelic(167,this.player)&&floor(random(0,4))==0){
                this.discard.cards[this.discard.cards.length-1].cost--
                this.discard.cards[this.discard.cards.length-1].base.cost--
                this.drop.cards[this.drop.cards.length-1].cost--
            }
        }
    }
    deStatus(value){
        let left=value
        left-=this.reserve.deStatus(left)
        if(left>0){
            left-=this.discard.deStatus(left)
        }
        if(left>0){
            left-=this.hand.deStatus(left)
        }
    }
    deFatigue(value){
        let left=value
        left-=this.reserve.deFatigue(left)
        if(left>0){
            left-=this.discard.deFatigue(left)
        }
        if(left>0){
            left-=this.hand.deFatigue(left)
        }
    }
    deFatigueAll(){
        let done=0
        done+=this.reserve.deFatigue(-1)
        done+=this.discard.deFatigue(-1)
        done+=this.hand.deFatigue(-1)
        return done
    }
    deCard(value,name){
        let left=value
        left-=this.reserve.deCard(left,name)
        if(left>0){
            left-=this.discard.deCard(left,name)
        }
        if(left>0){
            left-=this.hand.deCard(left,name)
        }
    }
    fatigueNumber(){
        return this.reserve.fatigueNumber()+this.hand.fatigueNumber()+this.discard.fatigueNumber()
    }
    cardNumber(name){
        return this.reserve.cardNumber(name)+this.hand.cardNumber(name)+this.discard.cardNumber(name)
    }
    transformCard(base){
        return new card(base.layer,base.battle,base.player,base.position.x,base.position.y,this.listing.card[base.list][3][floor(random(0,this.listing.card[base.list][3].length))],base.level,base.color,base.id)
    }
    transformCardToBasic(base){
        return new card(base.layer,base.battle,base.player,base.position.x,base.position.y,findName(['Strike','Defend','Step'][floor(random(0,3))],types.card),base.level,base.color,base.id)
    }
    clear(){
        this.reserve.cards=[]
        this.hand.cards=[]
        this.discard.cards=[]
        this.drop.cards=[]
        this.exhaust.cards=[]
    }
    reset(){
        this.hand.reset()
    }
    display(scene,args){
        switch(scene){
            case 'battle':
                this.drop.display('drop',[])
                this.layer.push()
                this.layer.translate(0,200-args[0]*200)
                this.hand.display('battle',[])
                this.layer.pop()
            break
        }
    }
    update(scene){
        switch(scene){
            case 'battle':
                this.hand.update('battle',[])
                this.drop.update('drop',[])
                if(this.altDraw&&this.hand.cards.length<this.drawAmount&&this.battle.turn.main==this.player){
                    this.draw(this.drawAmount-this.hand.cards.length)
                    if(this.hand.cards.length<this.drawAmount){
                        this.discard.sendAttack(this.hand.cards,945,1)
                    }
                }
            break
        }
    }
    onClick(scene){
        switch(scene){
            case 'battle':
                this.hand.onClick('battle')
            break
        }
    }
    onKey(scene,key,code){
        switch(scene){
            case 'battle':
                this.hand.onKey('battle',key,code)
            break
        }
    }
}