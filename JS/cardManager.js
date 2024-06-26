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
        this.tempCostDown=0
        this.baseDrops=variants.cyclicDraw?3:0
        this.drops=0
        this.interval=0
        this.greenDiff=0
        this.carry=[0,0,0,0,0]
        this.bufferedTurn=0
        this.pack=[]
        if(variants.mtg){
            this.mtgLastColor=6
        }

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
                    this.listing.all[floor(random(0,3))].push(a)
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
        let effectiveMana=[0,0,0,0,0,0,0]
        for(let a=0,la=this.battle.energy.base[this.player].length;a<la;a++){
            effectiveMana[this.battle.energy.base[this.player][a]]++
        }
        for(let a=0,la=types.card.length;a<la;a++){
            let cardColor=mtgPlayerColor(types.card[a].list)
            let manaColor=cardColor[a%cardColor.length]
            if(types.card[a].rarity>=0&&(types.card[a].list>0||effectiveMana[0]>0&&types.card[a].list==0)&&types.card[a].list<=game.playerNumber&&
                (cardColor.length==1&&effectiveMana[cardColor[0]]>0||cardColor.length==2&&effectiveMana[cardColor[0]]>0&&effectiveMana[cardColor[1]]>0||cardColor.length==3&&effectiveMana[cardColor[0]]>0&&effectiveMana[cardColor[1]]>0&&effectiveMana[cardColor[2]]>0||effectiveMana[6]>0)&&
                (manaColor==0||effectiveMana[manaColor]+effectiveMana[6]>=types.card[a].levels[0].cost||types.card[a].levels[0].spec.includes(11)||types.card[a].levels[0].spec.includes(21)||types.card[a].levels[0].spec.includes(35))
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
    copy(group1,group2,spec){
        this.getList(group1).copy(this.getList(group2).cards,0,-1,spec)
    }
    copyAntiInnate(group1,group2,key,spec){
        this.getList(group1).copyAntiInnate(this.getList(group2).cards,0,-1,key,spec)
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
    shuffleStart(group){
        this.getList(group).shuffleStart()
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
    addRandomAbstract(group,level,edition,cardList,output,filter,args){
        let list=[]
        let ticker=0
        switch(cardList){
            case 0:
                list=copyArray(this.listing.card[this.battle.player[this.player]][args[ticker++]])
            break
            case 1:
                list=copyArray(this.listing.card[args[ticker++]][args[ticker++]])
            break
            case 2:
                list=copyArray(this.listing.allPlayerCard[args[ticker++]])
            break
            case 3:
                list=copyArray(this.listing.allPlayerCard[args[ticker]])
                for(let a=0,la=3;a<la;a++){
                    list.push(...this.listing.card[this.battle.player[this.player]][args[ticker]])
                }
                ticker++
            break
            case 4:
                list=copyArray(this.listing.allListableCard[args[ticker++]])
            break
            case 5:
                list=copyArray(this.listing.sub)
            break
        }
        for(let a=0,la=filter.length;a<la;a++){
            for(let b=0,lb=list.length;b<lb;b++){
                let valid=false
                switch(filter[a]){
                    case 0:
                        if(types.card[list[b]].levels[level].class!=args[ticker]){
                            list.splice(b,1)
                            b--
                            lb--
                        }
                    break
                    case 1:
                        if(types.card[list[b]].levels[level].cost!=args[ticker]||
                            types.card[list[b]].levels[level].spec.includes(5)||
                            types.card[list[b]].levels[level].spec.includes(11)||
                            types.card[list[b]].levels[level].spec.includes(21)||
                            types.card[list[b]].levels[level].spec.includes(35)||
                            types.card[list[b]].levels[level].spec.includes(41)
                        ){
                            list.splice(b,1)
                            b--
                            lb--
                        }
                    break
                    case 2:
                        for(let c=0,lc=args[ticker].length;c<lc;c++){
                            if(types.card[list[b]].name.includes(args[ticker][c])){
                                valid=true
                            }
                        }
                        if(!valid){
                            list.splice(b,1)
                            b--
                            lb--
                        }
                    break
                    case 3:
                        for(let c=0,lc=args[ticker].length;c<lc;c++){
                            if(types.card[list[b]].name.substr(types.card[list[b]].name.length-args[ticker][c].length,types.card[list[b]].name.length-1)==args[ticker][c]){
                                valid=true
                            }
                        }
                        if(!valid){
                            list.splice(b,1)
                            b--
                            lb--
                        }
                    break
                    case 4:
                        if(!types.card[list[b]].levels[level].spec.includes(args[ticker])){
                            list.splice(b,1)
                            b--
                            lb--
                        }
                    break
                }
            }
            switch(filter[a]){
                case 0: case 1: case 2: case 3: case 4:
                    ticker++
                break
            }
        }
        if(list.length>0){
            let index=floor(random(0,list.length))
            let type=list[index]
            let color=types.card[type].list<0?0:types.card[type].list>=types.color.card.length?0:types.card[type].list
            switch(output){
                case 0:
                    this.getList(group).add(type,level,color,edition)
                break
                case 1:
                    this.getList(group).addAbstract(type,level,color,edition,[args[ticker++]],[])
                break
                case 2:
                    this.getList(group).addAbstract(type,level,color,edition,[args[ticker++],4],[[ticker++]])
                break
                case 3:
                    return this.getList(group).addReturn(type,level,color,edition)
                case 4:
                    this.getList(group).addAbstract(type,level,color,edition,[args[ticker++],5],[])
                break
                case 5:
                    let card=this.getList(group).addReturn(type,level,color,edition)
                    card.cost=max(min(card.cost,0),card.cost-args[ticker++])
                break
                case 6:
                    this.getList(group).addSAbstract(type,level,color,edition,0,[5],[])
                break
            }
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
                        this.reserve.send(this.hand.cards,0,min(amount,this.reserve.cards.length),[3,8,13,14,18,5,6,19,9,12][spec])
                    }
                    if(amountLeft>0&&this.discard.cards.length>0&&!variants.cyclicDraw){
                        this.discard.send(this.reserve.cards,0,-1,2)
                        this.reserve.shuffle()
                        if(this.reserve.cards.length>0){
                            this.reserve.send(this.hand.cards,0,min(amountLeft,this.reserve.cards.length),[3,8,13,14,18,5,6,19,9,12][spec])
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
    drawToCost(cost){
        if(cost>0){
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
    drawAbstract(amount,variant,output,args){
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
                        amountLeft-=this.reserve.sendAbstract(this.hand.cards,amount,variant,output,args)
                    }
                    if(amountLeft>0&&this.discard.cards.length>0&&!variants.cyclicDraw){
                        this.discard.send(this.reserve.cards,0,-1,2)
                        this.reserve.shuffle()
                        if(this.reserve.cards.length>0){
                            this.reserve.sendAbstract(this.hand.cards,amount,variant,output,args)
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
                switch(this.reserve.cards[a].attack){
                    case 3329:
                        total++
                    break
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
        this.hand.allEffect(103)
        let tempDrawAmount=this.drawAmount+this.tempDraw-(this.battle.turn.total==1&&(variants.cyclicDraw||game.ascend>=21)?1:0)
        if(turn==1){
            tempDrawAmount-=this.drawInnate()
        }
        if(variants.cyclicDraw){
            this.discard.send(this.reserve.cards,0,-1,2)
            this.reserve.shuffle()
        }
        if(variants.inventor){
            this.tech.copy(this.hand.cards,0,-1,0)
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
        if(this.battle.relicManager.hasRelic(292,this.player)){
            this.draw(this.battle.relicManager.active[292][this.player+1],5)
            tempDrawAmount-=this.battle.relicManager.active[292][this.player+1]
        }
        if(turn==1&&this.battle.modded(95)){
            this.drawAbstract(tempDrawAmount,1,0,[1])
        }else if(variants.balance){
            let classes=[1,2,1,2,3,11,4]
            for(let a=0,la=tempDrawAmount;a<la;a++){    
                this.drawAbstract(1,0,0,[classes[a%classes.length]])
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
        if(this.tempCostDown>0){
            for(let a=0,la=this.tempCostDown;a<la;a++){
                this.randomEffect(2,1,[1])
            }
        }
        this.tempDraw=0
        this.tempDrawFreeze=0
        this.tempDrawBurn=0
        this.tempCostDown=0
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(userCombatant.getStatus('Random Card Cost Less Per Turn')>0){
            this.randomEffect(2,1,[userCombatant.getStatus('Random Card Cost Less Per Turn')])
        }
        if(turn%4==0&&game.ascend>=24){
            this.reserve.addAbstract(findName('Dazed',types.card),0,game.playerNumber+1,0,[5],[])
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
            this.addRandomAbstract(2,0,0,4,0,[],[3])
        }
    }
    subFatigue(name,bypass){
        this.interval++
        if(this.numberAbstract(3,[43])<10||this.interval%2==0&&false||bypass){
            if(this.battle.relicManager.hasRelic(286,this.player)){
                this.reserve.add(findName(name,types.card),0,game.playerNumber+1)
                this.reserve.cards[this.reserve.cards.length-1].spec.push(43)
            }else{
                this.discard.add(findName(name,types.card),0,game.playerNumber+1)
                this.discard.cards[this.discard.cards.length-1].spec.push(43)
            }
            this.drop.addDrop(findName(name,types.card),0,game.playerNumber+1)
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
    numberAbstract(type,args){
        return this.reserve.numberAbstract(type,args)+this.hand.numberAbstract(type,args)+this.discard.numberAbstract(type,args)
    }
    transformCard(base){
        if(base.list>=0&&base.rarity>=0){
            let index=floor(random(0,this.listing.card[base.list][3].length))
            while(this.listing.card[base.list][3][index]==base.type){
                index=floor(random(0,this.listing.card[base.list][3].length))
            }
            return new card(base.layer,base.battle,base.player,base.position.x,base.position.y,this.listing.card[base.list][3][index],base.level,base.color,base.id)
        }else if(base.basic){
            let index=floor(random(0,this.listing.card[base.color][3].length))
            while(this.listing.card[base.color][3][index]==base.type){
                index=floor(random(0,this.listing.card[base.color][3].length))
            }
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
        this.hand.clear()
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
        this.reserve.reset()
    }
    switchCheck(){
        for(let a=0,la=this.carry.length;a<la;a++){
            if(this.carry[a]>0){
                for(let b=0,lb=this.carry[a];b<lb;b++){
                    this.hand.add(findName(['Miracle','Teleport','Redraw','Smite','Dual\nDiscus'][a],types.card),0,0)
                }
                this.carry[a]=0
            }
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
                this.layer.push()
                this.layer.translate(0,200-args[0]*200)
                this.hand.display('battle',[])
                this.layer.pop()
                this.drop.display('drop',[])
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
                        this.discard.sendAbstract(this.hand.cards,-1,2,0,[945])
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