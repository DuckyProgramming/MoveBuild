class cardManager{
    constructor(layer,battle,player){
        this.layer=layer
        this.battle=battle
        this.player=player

        this.listing={card:[],allPlayerCard:[],allListableCard:[],coc:[],all:[],junk:[],sub:[],mtg:[]}

        this.deck=new group(this.layer,this.battle,this.player,0)
        this.reserve=new group(this.layer,this.battle,this.player,1)
        this.hand=new group(this.layer,this.battle,this.player,2)
        this.discard=new group(this.layer,this.battle,this.player,3)
        this.drop=new group(this.layer,this.battle,this.player,4)
        this.exhaust=new group(this.layer,this.battle,this.player,5)
        if(variants.inventor){
            this.tech=new group(this.layer,this.battle,this.player,6)
            this.tech.add(findName('Techless',types.card),0,0)
        }

        this.drawAmount=variants.blackjack?0:(variants.lowDraw?5:6-(variants.cyclicDraw?2:0)-(variants.witch?2:0)-(variants.chooselose?1:0)-(variants.compress?1:0)-(variants.unexpected?1:0)+(variants.polar?1:0)-(variants.cardHold?1:0))
        this.drawBoost=0
        this.tempDraw=0
        this.tempDrawFreeze=0
        this.tempDrawBurn=0
        this.baseDrops=variants.cyclicDraw?3:0
        this.drops=0
        this.interval=0
        this.greenDiff=0
        this.switch={miracle:false,teleport:false,redraw:false,smite:false,dualDiscus:false}
        this.bufferedTurn=0
        this.pack=[]

        this.initialListing()
    }
    initialListing(){
        for(let a=0;a<game.playerNumber+6;a++){
            this.listing.card.push([[],[],[],[]])
        }
        this.listing.allPlayerCard=[[],[],[],[]]
        this.listing.allListableCard=[[],[],[],[]]
        this.listing.coc=[[],[],[],[]]
        this.listing.all=[[],[],[],[]]
        this.listing.junk=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]
        this.listing.sub=[]
        for(let a=0,la=types.card.length;a<la;a++){
            if(types.card[a].rarity==-10){
                this.listing.junk[types.card[a].list].push(a)
                this.listing.junk[game.playerNumber+1].push(a)
            }
            if(types.card[a].rarity==-6){
                this.listing.sub.push(a)
            }
            if(variants.prismrule.includes(types.card[a].list)&&types.card[a].rarity>-10||variants.prismrule.includes(-1)&&types.card[a].list<0||variants.prismrule.includes(-2)&&types.card[a].rarity==-10){
                if(types.card[a].rarity<0){
                    this.listing.all[0].push(a)
                    this.listing.all[1].push(a)
                    this.listing.all[2].push(a)
                }else{
                    this.listing.all[types.card[a].rarity].push(a)
                }
                this.listing.all[3].push(a)
            }
            if(types.card[a].rarity>=0&&types.card[a].list>=0){
                this.listing.card[types.card[a].list][types.card[a].rarity].push(a)
                this.listing.card[types.card[a].list][3].push(a)
                if(types.card[a].list>0&&types.card[a].list<=game.playerNumber){
                    this.listing.allPlayerCard[types.card[a].rarity].push(a)
                    this.listing.allPlayerCard[3].push(a)
                }
                if(types.card[a].list>=0&&types.card[a].list<=game.playerNumber+5){
                    this.listing.allListableCard[types.card[a].rarity].push(a)
                    this.listing.allListableCard[3].push(a)
                }
            }
            if(types.card[a].rarity==-4&&this.battle.player.includes(2)&&this.battle.player.includes(7)){
                if(types.card[a].list==27){
                    this.listing.card[2][1].push(a)
                    this.listing.card[2][3].push(a)
                    this.listing.card[7][1].push(a)
                    this.listing.card[7][3].push(a)
                }else{
                    this.listing.card[types.card[a].list][1].push(a)
                    this.listing.card[types.card[a].list][3].push(a)
                }
            }
        }
        for(let a=0,la=game.playerNumber;a<la;a++){
            if(variants.cyclicDraw){
                let list=['Buster','Multicard','Dropbox','DeDrop','Eye\nDropper']
                for(let b=0,lb=list.length;b<lb;b++){
                    this.listing.card[a][types.card[findName(list[b],types.card)].rarity].push(findName(list[b],types.card))
                    this.listing.card[a][3].push(findName(list[b],types.card))
                }
            }else if(variants.blackjack){
                let list=['Heat\nSink','Memory\nLeak','Ruby','Stack\nOverflow','House\nRules','Gate','Screwdriver','Gear\nGrind','Virus','Fixed\nPayout']
                for(let b=0,lb=list.length;b<lb;b++){
                    this.listing.card[a][types.card[findName(list[b],types.card)].rarity].push(findName(list[b],types.card))
                    this.listing.card[a][3].push(findName(list[b],types.card))
                }
            }
        }
        let list=[]
        for(let a=0,la=game.playerNumber+1;a<la;a++){
            list=[]
            for(let b=0,lb=types.card.length;b<lb;b++){
                if(types.card[b].rarity>=0&&types.card[b].list==(a+1)%(game.playerNumber+1)){
                    list.push(b)
                }
            }
            let names=[]
            for(let b=0,lb=list.length;b<lb;b++){
                if(!names.includes(types.card[list[b]].name)){
                    names.push(types.card[list[b]].name)
                }
            }
            let sorted=names.sort()
            for(let b=0,lb=names.length;b<lb;b++){
                for(let c=0,lc=list.length;c<lc;c++){
                    if(types.card[list[c]].name==names[b]){
                        this.listing.coc[types.card[list[c]].rarity].push(list[c])
                        this.listing.coc[3].push(list[c])
                        list.splice(c,1)
                        c--
                        lc--
                    }
                }
            }
        }
    }
    mtgListing(){
        this.listing.mtg=[[],[],[],[]]
        let effectiveMana=[0,0,0,0,0,0]
        for(let a=0,la=this.battle.energy.base[this.player].length;a<la;a++){
            effectiveMana[this.battle.energy.base[this.player][a]]++
        }
        for(let a=0,la=types.card.length;a<la;a++){
            let cardColor=mtgPlayerColor(types.card[a].list)
            let manaColor=cardColor[a%cardColor.length]
            if(types.card[a].rarity>=0&&types.card[a].list>0&&types.card[a].list<=game.playerNumber&&
                (cardColor.length==1&&effectiveMana[cardColor[0]]>0||cardColor.length==2&&effectiveMana[cardColor[0]]>0&&effectiveMana[cardColor[1]]>0||cardColor.length==3&&effectiveMana[cardColor[0]]>0&&effectiveMana[cardColor[1]]>0&&effectiveMana[cardColor[2]]>0)&&
                (manaColor==0||effectiveMana[manaColor]>=types.card[a].levels[0].cost||types.card[a].levels[0].spec.includes(35))
            ){
                this.listing.mtg[types.card[a].rarity].push(a)
                this.listing.mtg[3].push(a)
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
    cardInUse(){
        return this.hand.cardInUse
    }
    send(group1,group2){
        this.getList(group1).send(this.getList(group2).cards,0,-1)
    }
    copy(group1,group2){
        this.getList(group1).copy(this.getList(group2).cards,0,-1)
    }
    copyAntiInnate(group1,group2,key){
        this.getList(group1).copyAntiInnate(this.getList(group2).cards,0,-1,key)
    }
    swap(group1,group2){
        let list=[]
        this.getList(group1).send(list,0,-1)
        this.getList(group2).send(this.getList(group1).cards,0,-1)
        this.getList(group2).cards=list
    }
    shuffle(group){
        this.getList(group).shuffle()
    }
    allEffect(group,effect){
        this.getList(group).allEffect(effect)
    }
    allEffectArgs(group,effect,args){
        this.getList(group).allEffectArgs(effect,args)
    }
    randomEffect(group,effect,args){
        this.getList(group).randomEffect(effect,args)
    }
    addRandom(group,level,rarity){
        this.getList(group).add(this.listing.card[this.battle.player[this.player]][rarity][floor(random(0,this.listing.card[this.battle.player[this.player]][rarity].length))],level,this.battle.player[this.player])
    }
    addRandomCharacter(group,character,level,rarity){
        this.getList(group).add(this.listing.card[character][rarity][floor(random(0,this.listing.card[character].length))],level,character)
    }
    addRandomFree(group,level,rarity,variant){
        this.getList(group).addCost(this.listing.card[this.battle.player[this.player]][rarity][floor(random(0,this.listing.card[this.battle.player[this.player]][rarity].length))],level,this.battle.player[this.player],variant)
    }
    addRandomColor(group,level,color,rarity){
        this.getList(group).add(this.listing.card[color][rarity][floor(random(0,this.listing.card[color][rarity].length))],level,color)
    }
    addRandomEdition(group,level,rarity,edition){
        this.getList(group).add(this.listing.card[this.battle.player[this.player]][rarity][floor(random(0,this.listing.card[this.battle.player[this.player]][rarity].length))],level,this.battle.player[this.player],edition)
    }
    addRandomCharacterEdition(group,character,level,rarity,edition){
        this.getList(group).add(this.listing.card[character][rarity][floor(random(0,this.listing.card[character].length))],level,character,edition)
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
            this.getList(group).addCost(list[floor(random(0,list.length))],level,this.battle.player[this.player],variant)
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
            this.getList(group).addCostSpec(list[floor(random(0,list.length))],level,this.battle.player[this.player],variant,spec)
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
    addRandomAll(group,level,rarity,edition=0){
        let type=this.listing.allPlayerCard[rarity][floor(random(0,this.listing.allPlayerCard[rarity].length))]
        this.getList(group).add(type,level,types.card[type].list,edition)
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
            this.getList(group).addCostShuffle(type,level,types.card[type].list,variant)
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
    addRandomAllCostFree(group,level,cost){
        let list=[]
        for(let a=0,la=this.listing.allPlayerCard[3].length;a<la;a++){
            if(types.card[this.listing.allPlayerCard[3][a]].levels[level].cost==cost){
                list.push(this.listing.allPlayerCard[3][a])
            }
        }
        if(list.length>0){
            let type=list[floor(random(0,list.length))]
            this.getList(group).addCost(type,level,types.card[type].list)
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
    addRandomCompleteAll(group,level,rarity){
        let type=this.listing.allListableCard[rarity][floor(random(0,this.listing.allListableCard[rarity].length))]
        this.getList(group).add(type,level,types.card[type].list)
    }
    addRandomCompleteAllContain(group,level,contain){
        let list=[]
        for(let a=0,la=this.listing.allListableCard[3].length;a<la;a++){
            for(let b=0,lb=contain.length;b<lb;b++){
                if(types.card[this.listing.allListableCard[3][a]].name.includes(contain[b])){
                    list.push(this.listing.allListableCard[3][a])
                }
            }
        }
        if(list.length>0){
            let type=list[floor(random(0,list.length))]
            this.getList(group).add(type,level,types.card[type].list)
        }
    }
    addRandomCompleteAllContainFree(group,level,contain){
        let list=[]
        for(let a=0,la=this.listing.allListableCard[3].length;a<la;a++){
            for(let b=0,lb=contain.length;b<lb;b++){
                if(types.card[this.listing.allListableCard[3][a]].name.includes(contain[b])){
                    list.push(this.listing.allListableCard[3][a])
                }
            }
        }
        if(list.length>0){
            let type=list[floor(random(0,list.length))]
            this.getList(group).addCost(type,level,types.card[type].list)
        }
    }
    addRandomCompleteAllEnd(group,level,contain){
        let list=[]
        for(let a=0,la=this.listing.allListableCard[3].length;a<la;a++){
            for(let b=0,lb=contain.length;b<lb;b++){
                if(types.card[this.listing.allListableCard[3][a]].name.substr(types.card[this.listing.allListableCard[3][a]].name.length-contain[b].length,types.card[this.listing.allListableCard[3][a]].name.length-1)==contain[b]){
                    list.push(this.listing.allListableCard[3][a])
                }
            }
        }
        if(list.length>0){
            let type=list[floor(random(0,list.length))]
            this.getList(group).add(type,level,types.card[type].list)
        }
    }
    addRandomCompleteAllContainClass(group,level,contain,cardClass,spec){
        let list=[]
        for(let a=0,la=this.listing.allListableCard[3].length;a<la;a++){
            for(let b=0,lb=contain.length;b<lb;b++){
                if(types.card[this.listing.allListableCard[3][a]].name.includes(contain[b])&&types.card[this.listing.allListableCard[3][a]].levels[level].class==cardClass){
                    list.push(this.listing.allListableCard[3][a])
                }
            }
        }
        if(list.length>0){
            let type=list[floor(random(0,list.length))]
            if(spec==1){
                this.getList(group).addCost(type,level,types.card[type].list)
            }else{
                this.getList(group).add(type,level,types.card[type].list)
            }
        }
    }
    addRandomCompleteAllClassFree(group,level,cardClass,variant){
        let list=[]
        for(let a=0,la=this.listing.allListableCard[3].length;a<la;a++){
            if(types.card[this.listing.allListableCard[3][a]].levels[level].class==cardClass){
                list.push(this.listing.allListableCard[3][a])
            }
        }
        if(list.length>0){
            let type=list[floor(random(0,list.length))]
            this.getList(group).addCost(type,level,types.card[type].list,variant)
        }
    }
    addRandomCompleteAllCost(group,level,cost){
        let list=[]
        for(let a=0,la=this.listing.allListableCard[3].length;a<la;a++){
            if(types.card[this.listing.allListableCard[3][a]].levels[level].cost==cost){
                list.push(this.listing.allListableCard[3][a])
            }
        }
        if(list.length>0){
            let type=list[floor(random(0,list.length))]
            this.getList(group).add(type,level,types.card[type].list)
        }
    }
    addRandomCompleteAllCostDown(group,level,down){
        let type=this.listing.allListableCard[rarity][floor(random(0,this.listing.allListableCard[rarity].length))]
        let card=this.getList(group).addReturn(type,level,types.card[type].list)
        card.cost=max(min(card.cost,0),card.cost-down)
    }
    addRandomCompleteAllCostCostDown(group,level,cost,down){
        let list=[]
        for(let a=0,la=this.listing.allListableCard[3].length;a<la;a++){
            if(types.card[this.listing.allListableCard[3][a]].levels[level].cost==cost){
                list.push(this.listing.allListableCard[3][a])
            }
        }
        if(list.length>0){
            let type=list[floor(random(0,list.length))]
            let card=this.getList(group).addReturn(type,level,types.card[type].list)
            card.cost=max(min(card.cost,0),card.cost-down)
        }
    }
    addRandomSpec(group,level,spec){
        let list=[]
        for(let a=0,la=this.listing.allPlayerCard[3].length;a<la;a++){
            if(types.card[this.listing.allPlayerCard[3][a]].levels[level].spec.includes(spec)){
                list.push(this.listing.allPlayerCard[3][a])
            }
        }
        if(list.length>0){
            let type=list[floor(random(0,list.length))]
            this.getList(group).add(type,level,types.card[type].list)
        }
    }
    addRandomSpecCostDown(group,level,spec,down){
        let list=[]
        for(let a=0,la=this.listing.allPlayerCard[3].length;a<la;a++){
            if(types.card[this.listing.allPlayerCard[3][a]].levels[level].spec.includes(spec)){
                list.push(this.listing.allPlayerCard[3][a])
            }
        }
        if(list.length>0){
            let type=list[floor(random(0,list.length))]
            let card=this.getList(group).addReturn(type,level,types.card[type].list)
            card.cost=max(min(card.cost,0),card.cost-down)
        }
    }
    addRandomSub(group,level){
        this.getList(group).add(this.listing.sub[floor(random(0,this.listing.sub.length))],level,0)
    }
    callAmalgums(attackManager){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(legalTargetCombatant(0,1,1,this.battle.combatantManager.combatants[attackManager.target[0]],userCombatant,this.battle.tileManager.tiles)){
            this.hand.callAmalgums()
            this.discard.callAmalgums()
            this.reserve.callAmalgums()
        }
    }
    draw(amount,spec=0){
        if(amount>0){
            this.hand.allEffect(87)
            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
            if(userCombatant.getStatus('No Draw')<=0){
                this.battle.stats.drawn[this.player]+=amount
                if(variants.witch){
                    for(let a=0,la=amount;a<la;a++){
                        this.hand.add(findName('Card\nSlot',types.card),0,0)
                    }
                }else{
                    let amountLeft=amount-this.reserve.cards.length
                    if(this.reserve.cards.length>0){
                        this.reserve.send(this.hand.cards,0,min(amount,this.reserve.cards.length),[3,8,13,14,18][spec])
                    }
                    if(amountLeft>0&&this.discard.cards.length>0&&!variants.cyclicDraw){
                        this.discard.send(this.reserve.cards,0,-1,2)
                        this.reserve.shuffle()
                        if(this.reserve.cards.length>0){
                            this.reserve.send(this.hand.cards,0,min(amountLeft,this.reserve.cards.length),[3,8,13,14,18][spec])
                        }
                    }
                    this.reserve.parseDrawEffects(this.hand)
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
        }
    }
    drawReturn(amount,spec=0){
        let sent=[]
        if(amount>0){
            this.hand.allEffect(87)
            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
            if(userCombatant.getStatus('No Draw')<=0){
                this.battle.stats.drawn[this.player]+=amount
                if(variants.witch){
                    for(let a=0,la=amount;a<la;a++){
                        this.hand.add(findName('Card\nSlot',types.card),0,0)
                    }
                }else{
                    let amountLeft=amount-this.reserve.cards.length
                    if(this.reserve.cards.length>0){
                        let amountSent=min(amount,this.reserve.cards.length)
                        this.reserve.send(this.hand.cards,0,amountSent,[3,8,13,14,18][spec])
                        for(let a=0,la=amountSent;a<la;a++){
                            sent.push(this.hand.cards[this.hand.cards.length-1-a])
                        }
                    }
                    if(amountLeft>0&&this.discard.cards.length>0&&!variants.cyclicDraw){
                        this.discard.send(this.reserve.cards,0,-1,2)
                        this.reserve.shuffle()
                        if(this.reserve.cards.length>0){
                            let amountSent=min(amountLeft,this.reserve.cards.length)
                            this.reserve.send(this.hand.cards,0,amountSent,[3,8,13,14,18][spec])
                            for(let a=0,la=amountSent;a<la;a++){
                                sent.push(this.hand.cards[this.hand.cards.length-1-a])
                            }
                        }
                    }
                    this.reserve.parseDrawEffects(this.hand)
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
        }
        return sent
    }
    drawBottom(amount){
        if(amount>0){
            this.hand.allEffect(87)
            this.battle.stats.drawn[this.player]+=amount
            if(variants.witch){
                for(let a=0,la=amount;a<la;a++){
                    this.hand.add(findName('Card\nSlot',types.card),0,0)
                }
            }else{
                let amountLeft=amount-this.reserve.cards.length
                if(this.reserve.cards.length>0){
                    this.reserve.send(this.hand.cards,this.reserve.cards.length-min(amount,this.reserve.cards.length),-1,3)
                }
                if(amountLeft>0&&this.discard.cards.length>0&&!variants.cyclicDraw){
                    this.discard.send(this.reserve.cards,0,-1,2)
                    this.reserve.shuffle()
                    if(this.reserve.cards.length>0){
                        this.reserve.send(this.hand.cards,this.reserve.cards.length-min(amountLeft,this.reserve.cards.length),-1,3)
                    }
                }
                this.reserve.parseDrawEffects(this.hand)
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
    }
    drawPrice(amount,variant){
        if(amount>0){
            this.hand.allEffect(87)
            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
            if(userCombatant.getStatus('No Draw')<=0){
                this.battle.stats.drawn[this.player]+=amount
                if(variants.witch){
                    for(let a=0,la=amount;a<la;a++){
                        this.hand.add(findName('Card\nSlot',types.card),1,0)
                    }
                }else{
                    let amountLeft=amount-this.reserve.cards.length
                    if(this.reserve.cards.length>0){
                        this.reserve.send(this.hand.cards,0,min(amount,this.reserve.cards.length),variant==1?6:5)
                    }
                    if(amountLeft>0&&this.discard.cards.length>0){
                        this.discard.send(this.reserve.cards,0,-1,4)
                        this.reserve.shuffle()
                        if(this.reserve.cards.length>0){
                            this.reserve.send(this.hand.cards,0,min(amountLeft,this.reserve.cards.length),variant==1?6:5)
                        }
                    }
                    this.reserve.parseDrawEffects(this.hand)
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
        }
    }
    drawRetain(amount,variant){
        if(amount>0){
            this.hand.allEffect(87)
            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
            if(userCombatant.getStatus('No Draw')<=0){
                this.battle.stats.drawn[this.player]+=amount
                if(variants.witch){
                    for(let a=0,la=amount;a<la;a++){
                        this.hand.add(findName('Card\nSlot',types.card),0,0)
                        if(variant==0){
                            this.hand.cards[this.hand.cards.length-1].retain=true
                        }else if(variant==1){
                            this.hand.cards[this.hand.cards.length-1].retain2=true
                        }
                    }
                }else{
                    let amountLeft=amount-this.reserve.cards.length
                    if(this.reserve.cards.length>0){
                        this.reserve.send(this.hand.cards,0,min(amount,this.reserve.cards.length),variant==1?12:9)
                    }
                    if(amountLeft>0&&this.discard.cards.length>0){
                        this.discard.send(this.reserve.cards,0,-1,2)
                        this.reserve.shuffle()
                        if(this.reserve.cards.length>0){
                            this.reserve.send(this.hand.cards,0,min(amountLeft,this.reserve.cards.length),variant==1?12:9)
                        }
                    }
                    this.reserve.parseDrawEffects(this.hand)
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
        }
    }
    drawClass(amount,cardClass,spec=0){
        if(amount>0){
            this.hand.allEffect(87)
            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
            if(userCombatant.getStatus('No Draw')<=0){
                this.battle.stats.drawn[this.player]+=amount
                if(variants.witch){
                    for(let a=0,la=amount;a<la;a++){
                        this.hand.add(findName('Card\nSlot',types.card),0,0)
                    }
                }else{
                    let amountLeft=amount
                    if(this.reserve.cards.length>0){
                        amountLeft-=this.reserve.sendClass(this.hand.cards,cardClass,amount,spec)
                    }
                    if(amountLeft>0&&this.discard.cards.length>0&&!variants.cyclicDraw){
                        this.discard.send(this.reserve.cards,0,-1,2)
                        this.reserve.shuffle()
                        if(this.reserve.cards.length>0){
                            amountLeft-=this.reserve.sendClass(this.hand.cards,cardClass,amount,spec)
                        }
                    }
                    this.reserve.parseDrawEffects(this.hand)
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
        }
    }
    drawSetCost(amount,type){
        if(amount>0){
            this.hand.allEffect(87)
            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
            if(userCombatant.getStatus('No Draw')<=0){
                this.battle.stats.drawn[this.player]+=amount
                if(variants.witch){
                    for(let a=0,la=amount;a<la;a++){
                        this.hand.add(findName('Card\nSlot',types.card),0,0)
                    }
                }else{
                    let amountLeft=amount
                    if(this.reserve.cards.length>0){
                        amountLeft-=this.reserve.sendPriority(this.hand.cards,type,amount)
                    }
                    if(amountLeft>0&&this.discard.cards.length>0&&!variants.cyclicDraw){
                        this.discard.send(this.reserve.cards,0,-1,2)
                        this.reserve.shuffle()
                        if(this.reserve.cards.length>0){
                            amountLeft-=this.reserve.sendPriority(this.hand.cards,type,amount)
                        }
                    }
                    this.reserve.parseDrawEffects(this.hand)
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
        }
    }
    drawRarity(amount){
        if(amount>0){
            this.hand.allEffect(87)
            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
            if(userCombatant.getStatus('No Draw')<=0){
                this.battle.stats.drawn[this.player]+=amount
                if(variants.witch){
                    for(let a=0,la=amount;a<la;a++){
                        this.hand.add(findName('Card\nSlot',types.card),0,0)
                    }
                }else{
                    let amountLeft=amount
                    if(this.reserve.cards.length>0){
                        amountLeft-=this.reserve.sendRarity(this.hand.cards,2,amount,this.hand)
                        if(amountLeft>0){
                            amountLeft-=this.reserve.sendRarity(this.hand.cards,1,amount,this.hand)
                            if(amountLeft>0){
                                let holdAmount=this.reserve.cards.length
                                this.reserve.send(this.hand.cards,0,min(amountLeft,this.reserve.cards.length),3)
                                amountLeft-=holdAmount
                            }
                        }
                    }
                    if(amountLeft>0&&this.discard.cards.length>0&&!variants.cyclicDraw){
                        this.discard.send(this.reserve.cards,0,-1,2)
                        this.reserve.shuffle()
                        if(this.reserve.cards.length>0){
                            amountLeft-=this.reserve.sendRarity(this.hand.cards,2,amount,this.hand)
                            if(amountLeft>0){
                                amountLeft-=this.reserve.sendRarity(this.hand.cards,1,amount,this.hand)
                                if(amountLeft>0){
                                    let holdAmount=this.reserve.cards.length
                                    this.reserve.send(this.hand.cards,0,min(amountLeft,this.reserve.cards.length),3)
                                    amountLeft-=this.holdAmount
                                }
                            }
                        }
                    }
                    this.reserve.parseDrawEffects(this.hand)
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
        }
    }
    drawCost(cost){
        if(amount>0){
            this.hand.allEffect(87)
            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
            let left=cost
            if(userCombatant.getStatus('No Draw')<=0){
                if(variants.witch){
                    for(let a=0,la=cost;a<la;a++){
                        this.hand.add(findName('Card\nSlot',types.card),0,0)
                    }
                }else{
                    for(let a=0,la=10;a<la;a++){
                        if(left>0){
                            this.battle.stats.drawn[this.player]++
                            if(this.reserve.cards.length>0){
                                let success=false
                                for(let b=0,lb=this.reserve.cards.length;b<lb;b++){
                                    if(this.reserve.cards[b].cost<=left&&this.reserve.cards[b].cost>=0){
                                        left-=this.reserve.cards[b].cost
                                        this.reserve.send(this.hand.cards,b,b+1)
                                        success=true
                                        break
                                    }
                                }
                                if(!success){
                                    if(this.discard.cards.length>0){
                                        this.discard.send(this.reserve.cards,0,-1,4)
                                        this.reserve.shuffle()
                                    }else{
                                        left=0
                                    }
                                }
                            }else if(this.discard.cards.length>0){
                                this.discard.send(this.reserve.cards,0,-1,4)
                                this.reserve.shuffle()
                            }else{
                                left=0
                            }
                        }else{
                            a=la
                        }
                    }
                    this.reserve.parseDrawEffects(this.hand)
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
        }
    }
    drawInnate(){
        let total=0
        for(let a=0,la=this.reserve.cards.length;a<la;a++){
            if(this.reserve.cards[a].spec.includes(3)){
                if(variants.witch){
                    this.reserve.cards[a].spec.push(31)
                }
                this.reserve.send(this.hand.cards,a,a+1,3)
                a--
                la--
                total++
                if(total>=this.drawAmount&&variants.witch){
                    a=la
                }
            }
        }
        return total
    }
    dropFirst(){
        if(this.drops>0){
            this.drops--
            if(this.hand.cards.length>0){
                this.hand.cards[0].deSize=true
                this.hand.cards[0].exhaust=true
            }
        }
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
        let tempDrawAmount=this.drawAmount+this.tempDraw-(this.battle.turn.total==1&&(variants.cyclicDraw||game.ascend>=21)?1:0)
        if(turn==1){
            tempDrawAmount-=this.drawInnate()
        }
        if(variants.cyclicDraw){
            this.discard.send(this.reserve.cards,0,-1,2)
            this.reserve.shuffle()
        }
        if(variants.inventor){
            this.tech.copy(this.hand.cards,0,-1)
            this.hand.cards[this.hand.cards.length-1].position.x=1200
            this.hand.cards[this.hand.cards.length-1].position.y=500
        }
        if(variants.cardHold){
            tempDrawAmount-=this.hand.cards.length
        }
        if(turn%3==0&&this.battle.modded(67)){
            this.hand.add(findName('Onyx',types.card),0,0)
            tempDrawAmount--
        }
        if(turn==1&&this.battle.modded(95)){
            this.drawSetCost(tempDrawAmount,2)
        }else if(variants.balance){
            let classes=[1,1,2,2,3,4]
            for(let a=0,la=tempDrawAmount;a<la;a++){    
                this.drawClass(1,classes[a%classes.length])
            }
        }else{
            this.draw(tempDrawAmount)
        }
        if(this.tempDrawFreeze>0){
            this.draw(this.tempDrawFreeze,3)
        }
        if(this.tempDrawBurn>0){
            this.draw(this.tempDrawBurn,2)
        }
        this.tempDraw=0
        this.tempDrawFreeze=0
        this.tempDrawBurn=0
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(userCombatant.getStatus('Random Card Cost Less Per Turn')>0){
            this.randomEffect(2,1,[userCombatant.getStatus('Random Card Cost Less Per Turn')])
        }
        if(turn%4==0&&game.ascend>=24){
            this.reserve.addShuffle(findName('Dazed',types.card),0,game.playerNumber+1)
        }
        if(turn%3==0&&this.battle.modded(0)){
            this.battle.drop(this.player,findName('Dazed',types.card),0,game.playerNumber+1)
        }
        if(turn%5==0&&this.battle.modded(31)){
            this.battle.drop(this.player,findName('Spiked',types.card),0,game.playerNumber+1)
        }
        if(this.battle.modded(4)){
            this.hand.randomEffect(7,[1])
        }
        if(this.battle.modded(75)){
            this.hand.randomEffect(22,[])
        }
        if(variants.chooselose){
            this.hand.add(findName('Choose\nor Lose',types.card),0,0)
        }
        if(variants.compress){
            this.hand.add(findName('Compression',types.card),0,0)
        }
        if(variants.unexpected){
            this.addRandomCompleteAll(2,0,3)
        }
    }
    subFatigue(name,bypass){
        this.interval++
        if(this.hand.specNumber(43)+this.reserve.specNumber(43)+this.discard.specNumber(43)<10||this.interval%2==0||bypass){
            this.discard.add(findName(name,types.card),0,game.playerNumber+1)
            this.drop.addDrop(findName(name,types.card),0,game.playerNumber+1)
            this.discard.cards[this.discard.cards.length-1].spec.push(43)
            this.drop.cards[this.drop.cards.length-1].spec.push(43)
            if(this.battle.modded(61)&&!this.discard.cards[this.discard.cards.length-1].spec.includes(33)){
                this.discard.cards[this.discard.cards.length-1].spec.push(33)
                this.drop.cards[this.drop.cards.length-1].spec.push(33)
            }
            if(this.battle.modded(120)){
                this.discard.cards[this.discard.cards.length-1].attack=-35
                this.drop.cards[this.drop.cards.length-1].attack=-35
            }
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
    fatigue(bypass=false){
        if(this.battle.relicManager.hasRelic(108,this.player)&&this.battle.relicManager.detail[108][this.player]==0){
            this.battle.relicManager.detail[108][this.player]=1
        }else{
            if(this.battle.modded(30)||this.battle.modded(65)){
                if(this.battle.modded(30)){
                    for(let a=0,la=1+floor(random(0,2));a<la;a++){
                        this.subFatigue('Spiked',bypass)
                    }
                }
                if(this.battle.modded(65)){
                    this.subFatigue('Burn',bypass)
                }
            }else{
                this.subFatigue('Fatigue',bypass)
            }
        }
    }
    heavyFatigue(){
        if(this.battle.relicManager.hasRelic(108,this.player)&&this.battle.relicManager.detail[108][this.player]==0){
            this.battle.relicManager.detail[108][this.player]=1
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
    deAbstract(type,value,args){
        let left=value
        left-=this.reserve.deAbstract(type,left,args)
        if(left>0){
            left-=this.discard.deAbstract(type,left,args)
        }
        if(left>0){
            left-=this.hand.deAbstract(type,left,args)
        }
    }
    deAbstractAll(type,args){
        let done=0
        done+=this.reserve.deAbstract(type,-1,args)
        done+=this.discard.deAbstract(type,-1,args)
        done+=this.hand.deAbstract(type,-1,args)
        return done
    }
    reCard(name,type){
        this.reserve.reCard(name,type)
        this.discard.reCard(name,type)
        this.hand.reCard(name,type)
    }
    fatigueNumber(){
        return this.reserve.fatigueNumber()+this.hand.fatigueNumber()+this.discard.fatigueNumber()
    }
    cardNumber(name){
        return this.reserve.cardNumber(name)+this.hand.cardNumber(name)+this.discard.cardNumber(name)
    }
    transformCard(base){
        if(base.list>=0&&base.rarity>=0){
            let index=floor(random(0,this.listing.card[base.list][3].length))
            return new card(base.layer,base.battle,base.player,base.position.x,base.position.y,this.listing.card[base.list][3][index],base.level,base.color,base.id)
        }else if(base.basic){
            let index=floor(random(0,this.listing.card[base.color][3].length))
            return new card(base.layer,base.battle,base.player,base.position.x,base.position.y,this.listing.card[base.color][3][index],base.level,base.color,base.id)
        }else{
            return new card(base.layer,base.battle,base.player,base.position.x,base.position.y,findName('Garbled',types.card),base.level,game.playerNumber+1,base.id)
        }
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
    sceneChange(){
        this.greenDiff=0
    }
    reset(){
        this.hand.reset()
    }
    regenDrops(){
        this.drawBoost=0
        if(variants.cyclicDraw){
            this.drops=min(this.drops+1,this.baseDrops)
        }else if(variants.blackjack){
            this.drops=0
        }
    }
    standardBase(){
        this.checkCompact()
        if(variants.polar){
            this.hand.pole=1
        }
        this.hand.exhausts=0
        if(variants.cyclicDraw){
            this.drops=this.baseDrops
        }else if(variants.blackjack){
            this.drops=0
            this.baseDrops=21
        }
    }
    switchCheck(){
        if(this.switch.miracle){
            this.switch.miracle=false
            this.hand.add(findName('Miracle',types.card),0,0)
        }
        if(this.switch.teleport){
            this.switch.teleport=false
            this.hand.add(findName('Teleport',types.card),0,0)
        }
        if(this.switch.redraw){
            this.switch.redraw=false
            this.hand.add(findName('Redraw',types.card),0,0)
        }
        if(this.switch.smite){
            this.switch.smite=false
            this.hand.add(findName('Smite',types.card),0,0)
        }
        if(this.switch.dualDiscus){
            this.switch.dualDiscus=false
            this.hand.add(findName('Dual\nDiscus',types.card),0,0)
        }
    }
    checkCompact(){
        this.hand.compact=1
        for(let a=0,la=this.deck.cards.length;a<la;a++){
            if(this.deck.cards[a].attack==1113||this.deck.cards[a].attack==1114){
                this.hand.compact*=0.7
            }
        }
        if(this.battle.relicManager.active[230][this.player+1]>0){
            this.hand.compact*=0.8**this.battle.relicManager.active[230][this.player+1]
        }
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
                if(variants.cyclicDraw&&this.hand.cards.length<this.drawAmount+this.drawBoost&&this.battle.turn.main==this.player){
                    this.draw(this.drawAmount+this.drawBoost-this.hand.cards.length)
                    if(this.hand.cards.length<this.drawAmount){
                        this.discard.sendAttack(this.hand.cards,945,1)
                    }
                }
                if(this.bufferedTurn>0){
                    this.bufferedTurn-=game.animRate
                    if(this.bufferedTurn<=0){
                        this.battle.newTurn()
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