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
        this.lastDuplicate=[]
        this.lastPlayed=[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]
        this.turnPlayed=[0,0,0,0,0,0,0,0,0,0,0,0]
        this.lastTurnPlayed=[0,0,0,0,0,0,0,0,0,0,0,0]
        this.compact=1
        this.cardInUse=0
        this.cardShuffledIndex=0
        this.pole=0
        this.exhausts=0
        this.rewinds=0
        this.turnRewinds=0
        this.lastSort=-1
        this.basicChange=[0,0]
        this.listInput=[
            [0,4],
            [1,8],
            [2,9],
            [4,10],
            [6,11],
            [7,12],
            [8,13],
            [9,14],
            [10,15],
            [11,16],
            [12,17],
            [13,18],
            [14,19],
            [15,20],
            [16,21],
            [17,22],
            [18,23],
            [19,24],
            [20,25],
            [21,26],
            [22,27],
            [23,28],
            [24,29],
            [26,30],
        ]

        this.reset()
        
    }
    initialCards(type,player){
        let level=variants.cursed?1:0
        switch(type){
            case -1:
                for(let a=0,la=6;a<la;a++){
                    this.addInitialBypass(findName('-h Riff-Raff',types.card)+1+a,level,types.card[findName('-h Riff-Raff',types.card)+1+a].list>=0?types.card[findName('-h Riff-Raff',types.card)+1+a].list:0)
                }
            break
            case 0:
                if(game.dev&&options.devGen){
                    if(variants.junk){
                        for(let a=0,la=6;a<la;a++){
                            this.add(this.battle.cardManagers[this.player].listing.junk[11][this.battle.cardManagers[this.player].listing.junk[11].length-1-a],level,variants.mtg?0:this.battle.player[this.player])
                        }
                    }else{
                        for(let a=0,la=6;a<la;a++){
                            this.add(this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]][3][this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]][3].length-1-a],level,variants.mtg?0:this.battle.player[this.player])
                        }
                    }
                }else{
                    for(let a=0,la=types.deck.start[game.ascend>=20?1:0].length;a<la;a++){
                        this.add(findName(types.deck.start[game.ascend>=20?1:0][a][0],types.card),types.deck.start[game.ascend>=20?1:0][a][1]+level,types.deck.start[game.ascend>=20?1:0][a][2]==-2?types.card[findName(types.deck.start[game.ascend>=20?1:0][a][0],types.card)].list:types.deck.start[game.ascend>=20?1:0][a][2]==-1?(variants.mtg?0:player):types.deck.start[game.ascend>=20?1:0][a][2])
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
                    this.addInitial(findName(types.deck.start[game.ascend>=20?5:4][a][0],types.card),types.deck.start[game.ascend>=20?5:4][a][1]+level,types.deck.start[game.ascend>=20?5:4][a][2]==-2?types.card[findName(types.deck.start[game.ascend>=20?5:4][a][0],types.card)].list:types.deck.start[game.ascend>=20?5:4][a][2]==-1?player:types.deck.start[game.ascend>=20?5:4][a][2])
                }
            break
            case 2:
                for(let a=0,la=types.deck.start[game.ascend>=20?3:2].length;a<la;a++){
                    this.addInitial(findName(types.deck.start[game.ascend>=20?3:2][a][0],types.card),types.deck.start[game.ascend>=20?3:2][a][1]+level,types.deck.start[game.ascend>=20?3:2][a][2]==-2?types.card[findName(types.deck.start[game.ascend>=20?3:2][a][0],types.card)].list:types.deck.start[game.ascend>=20?3:2][a][2]==-1?player:types.deck.start[game.ascend>=20?3:2][a][2])
                }
            break
            case 3:
                for(let a=0,la=8;a<la;a++){
                    this.addInitial(this.battle.cardManagers[this.player].listing.card[player][0][floor(random(0,this.battle.cardManagers[this.player].listing.card[player][0].length))],level,player)
                }
                for(let a=0,la=2;a<la;a++){
                    this.addInitial(this.battle.cardManagers[this.player].listing.card[player][1][floor(random(0,this.battle.cardManagers[this.player].listing.card[player][1].length))],level,player)
                }
                if(game.ascend>=20){
                    this.addInitial(findName('Step-L',types.card),level,this.battle.player[this.player])
                    this.addInitial(findName('Step-R',types.card),level,this.battle.player[this.player])
                }else{
                    this.addInitial(findName('Step',types.card),level,this.battle.player[this.player])
                    this.addInitial(findName('Step',types.card),level,this.battle.player[this.player])
                }
            break
            case 4:
                for(let a=0,la=8;a<la;a++){
                    let type=this.battle.cardManagers[this.player].listing.allPlayerCard[0][floor(random(0,this.battle.cardManagers[this.player].listing.allPlayerCard[0].length))]
                    this.addInitial(type,level,types.card[type].list)
                }
                for(let a=0,la=2;a<la;a++){
                    let type=this.battle.cardManagers[this.player].listing.allPlayerCard[1][floor(random(0,this.battle.cardManagers[this.player].listing.allPlayerCard[1].length))]
                    this.addInitial(type,level,types.card[type].list)
                }
                if(game.ascend>=20){
                    this.addInitial(findName('Step-L',types.card),level,this.battle.player[this.player])
                    this.addInitial(findName('Step-R',types.card),level,this.battle.player[this.player])
                }else{
                    this.addInitial(findName('Step',types.card),level,this.battle.player[this.player])
                    this.addInitial(findName('Step',types.card),level,this.battle.player[this.player])
                }
            break
            case 5:
                for(let a=0,la=this.battle.cardManagers[this.player].listing.card[player][3].length;a<la;a++){
                    this.addInitial(this.battle.cardManagers[this.player].listing.card[player][3][a],level,player)
                }
            break
            case 6:
                for(let a=0,la=this.battle.cardManagers[this.player].listing.allPlayerCard[3].length;a<la;a++){
                    this.addInitial(this.battle.cardManagers[this.player].listing.allPlayerCard[3][a],level,types.card[this.battle.cardManagers[this.player].listing.allPlayerCard[3][a]].list)
                }
            break
            case 7:
                for(let a=0,la=this.battle.cardManagers[this.player].listing.card[player][2].length;a<la;a++){
                    this.addInitial(this.battle.cardManagers[this.player].listing.card[player][2][a],level,player)
                }
            break
            case 8:
                for(let a=0,la=this.battle.cardManagers[this.player].listing.allPlayerCard[2].length;a<la;a++){
                    this.addInitial(this.battle.cardManagers[this.player].listing.allPlayerCard[2][a],level,types.card[this.battle.cardManagers[this.player].listing.allPlayerCard[2][a]].list)
                }
            break
            case 9:
                for(let a=0,la=this.battle.cardManagers[this.player].listing.card[0][3].length;a<la;a++){
                    this.addInitial(this.battle.cardManagers[this.player].listing.card[0][3][a],level,0)
                }
            break
        }
        if(game.ascend>=10){
            this.add(findName(`Ascender's\nBane`,types.card),0,game.playerNumber+2)
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
        switch(this.id){
            case 1:
                this.basicChange=[0,0]
            break
            case 2:
                this.cancel()
                this.anim=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                this.lastTurnPlayed=copyArray(this.turnPlayed)
                this.turnPlayed=[0,0,0,0,0,0,0,0,0,0,0,0]
                this.turnRewinds=0
            break
        }
    }
    clear(){
        this.lastTurnPlayed=[0,0,0,0,0,0,0,0,0,0,0,0]
    }
    cancel(){
        this.status=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }
    added(){
        this.cards[this.cards.length-1].callAddEffect()
        this.cards.forEach(card=>card.callAnotherAddEffect())
    }
    addInitial(type,level,color){
        game.id++
        if(!types.card[type].levels[level].spec.includes(3)&&
            types.card[type].levels[level].attack!=1328&&
            types.card[type].levels[level].attack!=1393&&
            types.card[type].levels[level].attack!=1394&&
            types.card[type].levels[level].attack!=1398&&
            types.card[type].levels[level].attack!=1612&&
            types.card[type].levels[level].attack!=1881
        ){
            this.cards.push(new card(this.layer,this.battle,this.player,1200,500,type,this.selfLevel(type,level),color,game.id))
            if(this.id==0){
                this.cards[this.cards.length-1].nonCalc=true
                this.added()
            }
        }
    }
    addInitialBypass(type,level,color){
        game.id++
        this.cards.push(new card(this.layer,this.battle,this.player,1200,500,type,this.selfLevel(type,level),color,game.id))
        if(this.id==0){
            this.cards[this.cards.length-1].nonCalc=true
            this.added()
        }
    }
    add(type,level,color,edition=0){
        game.id++
        this.lastSort=-1
        if(type>=0&&type<types.card.length){
            if(this.battle.initialized&&types.card[type].list==game.playerNumber+2&&this.battle.relicManager.hasRelic(66,this.player)){
                this.battle.relicManager.active[66][this.player+1]--
                if(this.battle.relicManager.active[66][this.player+1]<=0){
                    this.battle.relicManager.deactivate(66,this.player)
                }
            }else{
                this.cards.push(new card(this.layer,this.battle,this.player,1200,500,type,this.selfLevel(type,level),color,game.id))
                this.cards[this.cards.length-1].edition=edition
                if(this.id==0){
                    this.cards[this.cards.length-1].nonCalc=true
                    this.added()
                }
                if(this.id>=1&&this.id<=3&&(this.cards[this.cards.length-1].name=='Shiv'||this.cards[this.cards.length-1].name=='Broken\nShiv'||this.cards[this.cards.length-1].name=='Deluxe\nShiv')&&this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Shiv Range Up')>0){
                    this.cards[this.cards.length-1].target[2]+=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Shiv Range Up')
                }
                if(this.battle.initialized&&this.id==0){
                    if(
                        this.cards[this.cards.length-1].level==0&&(
                        this.cards[this.cards.length-1].class==1&&this.battle.relicManager.hasRelic(12,this.player)||
                        this.cards[this.cards.length-1].class==2&&this.battle.relicManager.hasRelic(13,this.player)||
                        this.cards[this.cards.length-1].class==3&&this.battle.relicManager.hasRelic(14,this.player)||
                        this.cards[this.cards.length-1].class==4&&this.battle.relicManager.hasRelic(15,this.player)||
                        this.cards[this.cards.length-1].class==11&&this.battle.relicManager.hasRelic(311,this.player)
                    )){
                        this.cards[this.cards.length-1]=upgradeCard(this.cards[this.cards.length-1])
                    }
                    this.battle.relicManager.activate(5,[this.player])
                    if(types.card[type].rarity>=0||types.card[type].list>=0){
                        this.battle.stats.card[this.player]++
                    }
                    if(this.battle.relicManager.hasRelic(274,this.player)){
                        this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].gainMaxHP(this.battle.relicManager.active[274][this.player+1])
                    }
                }
                return true
            }
        }
        return false
    }
    addReturn(type,level,color,edition){
        let result=this.add(type,level,color,edition)
        return result?this.cards[this.cards.length-1]:{type:-1}
    }
    addDrop(type,level,color){
        game.id++
        this.cards.push(new card(this.layer,this.battle,this.player,40,-100-this.cards.length*200,type,level,color,game.id))
        if(this.id==0){
            this.cards[this.cards.length-1].nonCalc=true
            this.added()
        }
        this.cards[this.cards.length-1].downSize=true
        return true
    }
    addAbstract(type,level,color,edition,variant,args){
        let result=this.add(type,level,color,edition)
        let ticker=0
        if(result){
            for(let a=0,la=variant.length;a<la;a++){
                switch(variant[a]){
                    case 0:
                        this.cards[this.cards.length-1].cost=0
                    break
                    case 1:
                        this.cards[this.cards.length-1].cost=0
                        this.cards[this.cards.length-1].base.cost=0
                    break
                    case 2:
                        this.cards[this.cards.length-1].cost--
                        this.cards[this.cards.length-1].base.cost--
                    break
                    case 3:
                        this.cards[this.cards.length-1].cost++
                        this.cards[this.cards.length-1].base.cost++
                    break
                    case 4:
                        for(let a=0,la=args[ticker].length;a<la;a++){
                            this.cards[this.cards.length-1].spec.push(args[ticker][a])
                        }
                        ticker++
                    break
                    case 5:
                        this.selfShuffle()
                    break
                    case 6:
                        this.cards[this.cards.length-1].effect[args[ticker++]]=args[ticker++]
                        ticker+=2
                    break
                    case 7:
                        this.cards[this.cards.length-1].effect[args[ticker++]]+=args[ticker++]
                        ticker+=2
                    break
                    case 8:
                        this.cards[this.cards.length-1].retain=true
                    break
                    case 9:
                        this.cards[this.cards.length-1].retain2=true
                    break
                    case 10:
                        this.cards[this.cards.length-1].limit=args[ticker++]
                    break
                }
            }
        }
        return result
    }
    selfShuffle(){
        this.cardShuffledIndex=floor(random(0,this.cards.length-1))
        this.cards.splice(this.cardShuffledIndex,0,this.cards[this.cards.length-1])
        this.cards.splice(this.cards.length-1,1)
        this.shuffled()
    }
    slideTop(){
        this.cards.splice(0,0,this.cards[this.cards.length-1])
        this.cards.splice(this.cards.length-1,1)
    }
    resetAnim(){
        for(let a=0,la=this.cards.length;a<la;a++){
            this.cards[a].size=0
            this.cards[a].deSize=true
            this.cards[a].select=false
            this.cards[a].anim.select=0
        }
    }
    discard(amount){
        this.status[0]+=amount
    }
    exhaust(amount){
        this.status[1]+=amount
    }
    exhaustAny(){
        this.status[1]=-1
    }
    reserve(amount){
        this.status[2]+=amount
    }
    duplicate(amount){
        this.status[3]+=amount
    }
    nightmare(amount){
        this.status[4]+=amount
    }
    rebound(amount){
        this.status[5]+=amount
    }
    upgrade(amount){
        this.status[6]+=amount
    }
    transform(amount){
        this.status[7]+=amount
    }
    rewind(amount){
        this.status[8]+=amount
    }
    rewindAny(){
        this.status[8]=-1
    }
    retain2(amount){
        this.status[9]+=amount
    }
    discardBlock(amount){
        this.status[10]+=amount
    }
    free2(amount){
        this.status[11]+=amount
    }
    exhaustBlock(amount){
        this.status[12]+=amount
    }
    exhaustSlot(amount){
        this.status[13]+=amount
    }
    retain(amount){
        this.status[14]+=amount
    }
    exhaustDamage(amount){
        this.status[15]+=amount
    }
    exhaustEnergy(amount){
        this.status[16]+=amount
    }
    unupgrade(amount){
        this.status[17]+=amount
    }
    reserveRetain(amount){
        this.status[18]+=amount
    }
    discardFree(amount){
        this.status[19]+=amount
    }
    costDown(amount){
        this.status[20]+=amount
    }
    costUp(amount){
        this.status[21]+=amount
    }
    discardTriple(amount){
        this.status[22]+=amount
    }
    reserveFree(amount){
        this.status[23]+=amount
    }
    rewindTop(amount){
        this.status[24]+=amount
    }
    duplicateNonRareColorless(amount){
        this.status[25]+=amount
    }
    exhaustDrawSame(amount){
        this.status[26]+=amount
    }
    shuffle(after){
        let cards=[]
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards.length>0){
                cards.push(copyCard(this.cards[0]))
                this.cards.splice(0,1)
            }
        }
        for(let a=0,la=cards.length;a<la;a++){
            if(cards.length>0){
                let index=floor(random(0,cards.length))
                this.cards.push(copyCard(cards[index]))
                cards.splice(index,1)
            }
        }
        this.shuffled()
    }
    shuffleStart(){
        let cards=[]
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards.length>0){
                cards.push(copyCard(this.cards[0]))
                this.cards.splice(0,1)
            }
        }
        for(let a=0,la=cards.length;a<la;a++){
            if(cards.length>0){
                let index=floor(random(0,cards.length))
                this.cards.push(copyCard(cards[index]))
                cards.splice(index,1)
            }
        }
    }
    shuffled(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(userCombatant.status.main[151]>0){
            this.battle.addEnergy(userCombatant.status.main[151],this.player)
        }
        if(userCombatant.status.main[152]>0){
            this.battle.cardManagers[this.player].draw(userCombatant.status.main[152])
        }
        this.battle.relicManager.activate(16,[this.id,this.player])
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
    outCSV(){
        let collect=''
        for(let a=0,la=this.cards.length;a<la;a++){
            if(a>0){
                collect+=' '
            }
            collect+=this.cards[a].name.replace('\n',' ')+multiplyString('+',this.cards[a].level)
        }
        return collect
    }
    killDupes(){
        for(let a=0,la=this.cards.length;a<la;a++){
            for(let b=0,lb=this.cards.length;b<lb;b++){
                if(a!=b&&b>a&&this.cards[a].name==this.cards[b].name&&!this.cards[a].basic&&!this.cards[b].basic){
                    this.cards.splice(b,1)
                    b--
                    lb--
                    la--
                }
            }
        }
    }
    freeDupes(){
        let names=[]
        let numbers=[]
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].usable){
                if(names.includes(this.cards[a].name)){
                    numbers[names.indexOf(this.cards[a].name)]++
                }else{
                    names.push(this.cards[a].name)
                    numbers.push(1)
                }
            }
        }
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].usable){
                if(names.includes(this.cards[a].name)&&numbers[names.indexOf(this.cards[a].name)]>=2){
                    this.cards[a].cost=0
                }
            }
        }
    }
    plusDupes(value,limit){
        let names=[]
        let numbers=[]
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].usable){
                if(names.includes(this.cards[a].name)){
                    numbers[names.indexOf(this.cards[a].name)]++
                }else{
                    names.push(this.cards[a].name)
                    numbers.push(1)
                }
            }
        }
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].usable){
                if(names.includes(this.cards[a].name)&&numbers[names.indexOf(this.cards[a].name)]>=limit&&this.cards[a].effect.length>=1){
                    this.cards[a].effect[0]+=value
                }
            }
        }
    }
    discardDupes(){
        let names=[]
        let numbers=[]
        let success=false
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].usable){
                if(names.includes(this.cards[a].name)){
                    numbers[names.indexOf(this.cards[a].name)]++
                }else{
                    names.push(this.cards[a].name)
                    numbers.push(1)
                }
            }
        }
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].usable){
                if(names.includes(this.cards[a].name)&&numbers[names.indexOf(this.cards[a].name)]>=2){
                    this.cards[a].deSize=true
                    success=true
                }
            }
        }
        return success
    }
    deAbstract(type,value,args){
        let done=0
        for(let a=0,la=this.cards.length;a<la;a++){
            if(
                type==0&&this.cards[a].class==5&&!(this.cards[a].name=='Fatigue'||this.cards[a].name=='Heavy\nFatigue')||
                type==1&&this.cards[a].name=='Fatigue'||this.cards[a].name=='Heavy\nFatigue'||
                type==2&&this.cards[a].name==args[0]||
                type==3&&this.cards[a].class==5
            ){
                if(this.id==2){
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                }else if(this.id==1||this.id==3){
                    this.send(this.battle.cardManagers[this.player].exhaust.cards,a,a+1)
                    a--
                    la--
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
    reCard(name,type){
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].name==name){
                this.cards[a]=new card(this.layer,this.battle,this.player,this.cards[a].position.x,this.cards[a].position.y,type,this.cards[a].level,this.cards[a].color,this.cards[a].id)
            }
        }
    }
    totalCost(){
        let total=0
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].usable&&this.cards[a].cost>0){
                total+=this.cards[a].cost
            }
        }
        return total
    }
    numberAbstract(type,args){
        let total=0
        for(let a=0,la=this.cards.length;a<la;a++){
            if(
                type==0&&args[0].includes(this.cards[a].name)||
                type==1&&args[0]==this.cards[a].cost&&!this.cards[a].spec.includes(5)&&!this.cards[a].spec.includes(41)||
                type==2&&args[0]>=this.cards[a].cost&&!this.cards[a].spec.includes(5)&&!this.cards[a].spec.includes(41)||
                type==3&&this.cards[a].spec.includes(args[0])||
                type==4&&args[0].includes(this.cards[a].class)||
                type==5&&args[0]==this.cards[a].color&&!this.cards[a].colorful||
                type==6&&args[0]==this.cards[a].color&&args[1]==this.cards[a].rarity&&!this.cards[a].colorful||
                type==7&&(this.cards[a].retain||this.cards[a].retain2|this.cards[a].spec.includes(2)||this.cards[a].spec.includes(29)||this.cards[a].spec.includes(55)||this.battle.relicManager.hasRelic(128,this.player))||
                type==8&&this.cards[a].basic||
                type==9&&this.cards[a].basic&&args[0].includes(this.cards[a].class)||
                type==10&&args[0].includes(this.cards[a].class)&&!args[1].includes(this.cards[a].name)||
                type==11&&this.cards[a].colorless()
            ){
                total++
            }
        }
        return total
    }
    colorNumber(){
        let colors=[]
        for(let a=0,la=this.cards.length;a<la;a++){
            if(!colors.includes(this.cards[a].color)){
                colors.push(this.cards[a].color)
            }
        }
        return colors.length
    }
    uniqueNumber(){
        let types=[]
        for(let a=0,la=this.cards.length;a<la;a++){
            if(!types.includes(this.cards[a].type)){
                types.push(this.cards[a].type)
            }
        }
        return types.length
    }
    allClass(cardClass){
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].class!=cardClass){
                return false
            }
        }
        return true
    }
    allClassLeeway(cardClass){
        let total=0
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].class!=cardClass){
                total++
                if(total>1){
                    return false
                }
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
    classLimit(cardClass,limit){
        let total=0
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].class==cardClass){
                total++
            }
        }
        return total<=limit
    }
    falsedSwap(){
        let list=[]
        for(let a=0,la=this.cards.length;a<la;a++){
            if(!this.cards[a].spec.includes(12)&&this.cards[a].attack!==-34){
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
            this.cards[index0].falsed.cost=this.cards[index1].cost
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
            this.cards[index1].falsed.cost=this.cards[index0].cost
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
        let total=0
        switch(effect){
            case 1:
                this.cancel()
                if(this.battle.relicManager.hasRelic(51,this.player)){
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.cards.length*this.battle.relicManager.active[51][this.player+1])
                }
                if(this.battle.relicManager.hasRelic(190,this.player)){
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Single Damage Up',this.cards.length*this.battle.relicManager.active[190][this.player+1])
                }
            break
        }
        for(let a=0,la=this.cards.length;a<la;a++){
            switch(effect){
                case 0:
                    if(!this.cards[a].spec.includes(2)||this.cards[a].spec.includes(29)&&floor(random(0,5))!=0){
                        this.cards[a].deSize=true
                    }
                break
                case 1:
                    this.callInput(1,a)
                    this.cards[a].callDiscardEffect()
                    if(this.cards[a].retain2){
                        this.cards[a].retained()
                        this.cards.forEach(card=>card.anotherRetained())
                        total++
                    }else if(this.cards[a].retain||this.battle.relicManager.hasRelic(192,this.player)&&la==1){
                        this.cards[a].retained()
                        this.cards.forEach(card=>card.anotherRetained())
                        this.cards[a].retain=false
                        total++
                    }else if(this.cards[a].spec.includes(4)){
                        this.cards[a].etherealed()
                        this.cards[a].deSize=true
                        this.cards[a].exhaust=true
                    }else if(this.cards[a].spec.includes(2)||this.cards[a].spec.includes(29)&&floor(random(0,5))!=0||this.cards[a].spec.includes(55)||this.battle.relicManager.hasRelic(128,this.player)||variants.cardHold){
                        this.cards[a].retained()
                        this.cards.forEach(card=>card.anotherRetained())
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
                    this.cards[a]=upgradeCard(this.cards[a])
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
                    if(this.cards[a].spec.includes(12)){
                        for(let b=0,lb=this.cards[a].effect.length;b<lb;b++){
                            for(let c=0,lc=this.cards[a].effect[b].length;c<lc;c++){
                                if(this.cards[a].class[b]!=3||c!=0){
                                    this.cards[a].effect[b][c]=round(this.cards[a].effect[b][c]/2)
                                }
                            }
                        }
                    }else{
                        for(let b=0,lb=this.cards[a].effect.length;b<lb;b++){
                            if(this.cards[a].class!=3||b!=0){
                                this.cards[a].effect[b]=round(this.cards[a].effect[b]/2)
                            }
                        }
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
                        this.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                        a--
                        la--
                    }
                break
                case 26:
                    if(this.cards[a].class==7){
                        this.cards[a].deSize=true
                        this.cards[a].exhaust=true
                        this.battle.addEnergy(1,this.player)
                    }
                break
                case 27:
                    this.cards[a].deSize=true
                    this.cards[a].discardEffectBuffered.push(0)
                break
                case 28:
                    if(this.cards[a].attack==736){
                        this.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
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
                    if(this.cards[a].spec.includes(12)){
                        for(let b=0,lb=this.cards[a].effect.length;b<lb;b++){
                            if(this.cards[a].effect[b].length>0&&this.cards[a].effect[b][0]>0&&this.cards[a].class[b]!=3){
                                this.cards[a].effect[b][0]++
                            }
                        }
                    }else if(this.cards[a].effect.length>0&&this.cards[a].effect[0]>0&&this.cards[a].class!=3){
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
                    if(this.cards[a].attack==1305||this.cards[a].attack==2827||this.cards[a].attack==2828||this.cards[a].attack==2829||this.cards[a].attack==2830){
                        this.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,2)
                        a--
                        la--
                    }
                break
                case 48:
                    this.cards[a].callStartEffect(this.battle.encounter.class)
                break
                case 49:
                    if(this.cards[a].spec.includes(35)&&this.cards[a].usable){
                        this.cards[a].cost=round(this.cards[a].cost/2)
                        this.cards[a].onIncrementCountdown()
                    }
                break
                case 50:
                    if(this.cards[a].cost!=1){
                        this.cards[a].deSize=true
                    }
                break
                case 51:
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                    for(let b=0,lb=this.battle.cardManagers[this.player].deck.cards.length;b<lb;b++){
                        if(this.cards[a].id==this.battle.cardManagers[this.player].deck.cards[b].id){
                            if(this.battle.cardManagers[this.player].deck.remove(b)){
                                this.battle.relicManager.activate(11,[this.player])
                                b--
                                lb--
                            }
                        }
                    }
                break
                case 52:
                    this.cards[a].deSize=true
                    if(this.cards[a].usable){
                        this.cards[a].discardEffect.push(2)
                    }
                break
                case 53:
                    this.cards[a].swapped=true
                break
                case 54:
                    if(this.cards[a].spec.includes(35)&&this.cards[a].usable){
                        this.cards[a].cost=0
                        this.cards[a].onIncrementCountdown()
                    }
                break
                case 55:
                    if(this.cards[a].spec.includes(35)&&this.cards[a].usable){
                        this.cards[a].cost=floor(this.cards[a].cost/2)
                        this.cards[a].onIncrementCountdown()
                    }
                break
                case 56:
                    if(this.cards[a].spec.includes(3)||this.cards[a].spec.includes(47)){
                        this.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,2)
                        a--
                        la--
                    }
                break
                case 57:
                    this.cards[a].deSize=true
                    this.cards[a].discardEffect.push(0)
                    this.cards[a].discardEffect.push(8)
                break
                case 58:
                    if(this.cards[a].basic&&this.cards[a].class==1){
                        this.cards[a].cost=0
                    }
                break
                case 59:
                    if(this.cards[a].basic&&this.cards[a].class==2){
                        this.cards[a].cost=0
                    }
                break
                case 60:
                    if(this.cards[a].basic&&this.cards[a].class==1){
                        this.cards[a].effect[0]*=2
                    }
                break
                case 61:
                    if(this.cards[a].basic&&this.cards[a].class==2){
                        this.cards[a].effect[0]*=2
                    }
                break
                case 62:
                    this.cards[a].callNodeEffect()
                break
                case 63:
                    this.cards[a].callTurnEffect()
                break
                case 64:
                    if((this.cards[a].spec.includes(3)||this.cards[a].spec.includes(47))&&this.id!=2){
                        this.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,0)
                    }
                break
                case 65:
                    this.cards[a].edition=0
                break
                case 66:
                    this.cards[a].anotherPlayedGlobal()
                break
                case 67:
                    this.cards[a].anotherDiscardedGlobal()
                break
                case 68:
                    this.cards[a].deSize=true
                    this.cards[a].discardEffect.push(9)
                    for(let b=0,lb=this.battle.cardManagers[this.player].deck.cards.length;b<lb;b++){
                        if(this.cards[a].id==this.battle.cardManagers[this.player].deck.cards[b].id){
                            this.battle.cardManagers[this.player].deck.cards[b].edition=5
                        }
                    }
                break
                case 69:
                    if(this.cards[a].cost==2){
                        this.cards[a].cost=1
                    }
                break
                case 70:
                    this.cards[a].onItem()
                break
                case 71:
                    this.cards[a].cost=floor(random(0,2))
                break
                case 72:
                    if(this.cards[a].name.includes('Cable')&&this.cards[a].class==1){
                        this.cards[a].target[2]=3
                    }
                break
                case 73:
                    if(this.cards[a].class==4){
                        this.cards[a].cost=max(this.cards[a].cost-1,min(0,this.cards[a].cost))
                        this.cards[a].base.cost=max(this.cards[a].base.cost-1,min(0,this.cards[a].base.cost))
                        this.cards[a].spec.push(1)
                    }
                break
                case 74:
                    if(this.cards[a].spec.includes(5)){
                        this.cards[a].deSize=true
                        this.cards[a].callSpecDiscardEffect()
                    }
                break
                case 75:
                    if(this.cards[a].spec.includes(52)){
                        this.cards[a].target[2]=2
                    }
                break
                case 76:
                    if(this.cards[a].cost>=0){
                        this.cards[a].cost++
                    }
                break
                case 77:
                    if(this.cards[a].cost==2){
                        this.cards[a].cost=3
                    }
                break
                case 78:
                    if(this.cards[a].cost>0){
                        this.cards[a].cost--
                    }
                    this.cards[a].spec.push(4)
                break
                case 79:
                    if(this.cards[a].name.includes('Cable')&&this.cards[a].class==1){
                        this.cards[a].cost=0
                        this.cards[a].base.cost=0
                    }
                break
                case 80:
                    if(this.cards[a].cost==2&&this.cards[a].class==1){
                        this.cards[a].cost=0
                    }
                break
                case 81:
                    if(this.cards[a].cost==2&&this.cards[a].class==2){
                        this.cards[a].cost=0
                    }
                break
                case 82:
                    this.cards[a].cost=1
                    this.cards[a].base.cost=1
                    for(let b=0,lb=this.battle.cardManagers[this.player].deck.cards.length;b<lb;b++){
                        if(this.cards[a].id==this.battle.cardManagers[this.player].deck.cards[b].id){
                            this.battle.cardManagers[this.player].deck.cards[b].cost=1
                            this.battle.cardManagers[this.player].deck.cards[b].base.cost=1
                        }
                    }
                break
                case 83:
                    this.cards[a].callBossEffect()
                break
                case 84:
                    if(this.cards[a].spec.includes(53)){
                        this.cards[a].deSize=true
                        if(this.cards[a].usable){
                            this.cards[a].discardEffect.push(0)
                        }
                    }
                break
                case 85:
                    if(this.cards[a].spec.includes(53)){
                        this.cards[a].retain2=true
                    }
                break
                case 86:
                    this.cards[a].deSize=true
                    if(this.cards[a].usable){
                        this.cards[a].discardEffect.push(6)
                    }
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].activateRewind()
                break
                case 87:
                    this.cards[a].callAnotherDrawEffect()
                break
                case 88:
                    if(this.cards[a].cost>=0){
                        this.cards[a].cost++
                        this.cards[a].base.cost++
                    }
                break
                case 89:
                    if(this.cards[a].cost==2&&this.cards[a].class==2){
                        this.cards[a].cost=1
                    }
                break
                case 90:
                    if(this.cards[a].spec.includes(54)&&this.cards[a].edition==0){
                        this.cards[a].edition=2
                    }
                break
                case 91:
                    if(this.cards[a].attack==2994){
                        this.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                        a--
                        la--
                    }
                break
                case 92:
                    if(this.cards[a].attack==3009){
                        this.cards[a].effect[0]+=this.cards[a].effect[1]
                    }
                break
                case 93:
                    if(this.cards[a].name=='Fatigue'||this.cards[a].name=='Heavy\nFatigue'){
                        this.cards[a].cost++
                        this.cards[a].base.cost++
                    }
                break
                case 94:
                    this.cards[a].callBalanceBreakEffect()
                break
                case 95:
                    this.cards[a].callRearmEffect()
                break
                case 96:
                    if(this.cards[a].spec.includes(15)){
                        this.cards[a].limit++
                        for(let b=0,lb=this.battle.cardManagers[this.player].deck.cards.length;b<lb;b++){
                            if(this.battle.cardManagers[this.player].deck.cards[b].id==this.cards[a].id){
                                this.battle.cardManagers[this.player].deck.cards[b].limit++
                            }
                        }
                    }
                break
                case 97:
                    if(!this.cards[a].spec.includes(3)&&this.cards[a].level==0){
                        this.cards[a].deSize=true
                        if(this.cards[a].usable){
                            this.cards[a].discardEffect.push(0)
                        }
                    }
                break
                case 98:
                    if(this.cards[a].name=='Prismatic\nBomb'){
                        this.cards[a].deSize=true
                    }
                break
                case 99:
                    this.cards[a].edition=6
                break
                case 100:
                    if(this.cards[a].color!=0){
                        this.cards[a].deSize=true
                        this.cards[a].exhaust=true
                    }
                break
                case 101:
                    this.cards[a].callScryEffect()
                break
                case 102:
                    let list102=[0,16,14,18,46,45,44,51,50,49,19,17]
                    for(let b=0,lb=list102.length;b<lb;b++){
                        if(this.cards[a].spec.includes(list102[b])){
                            this.cards[a].spec.splice(this.cards[a].spec.indexOf(list102[b]),1)
                        }
                    }
                break
                case 103:
                    this.cards[a].turnStart()
                break
                case 104:
                    if(this.cards[a].class==3){
                        this.cards[a].deSize=true
                        this.cards[a].exhaust=true
                    }
                break


            }
        }
        switch(effect){
            case 1:
                if(total>0&&this.battle.relicManager.hasRelic(76,this.player)){
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(4*total*this.battle.relicManager.active[76][this.player+1])
                }
            break
        }
    }
    allEffectArgs(effect,args){
        let total=0
        if(effect==9){
            total=args[1]
        }else if(effect==10||effect==12||effect==18||effect==19){
            total=0
        }
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
                        a--
                        la--
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
                        this.cards[a].effect[0]=max(this.cards[a].effect[0]+args[0],0)
                    }
                break
                case 6:
                    if(this.cards[a].basic&&this.cards[a].class==2){
                        this.cards[a].effect[0]=max(this.cards[a].effect[0]+args[0],0)
                    }
                break
                case 7:
                    if(this.cards[a].attack==1228&&this.cards[a].usable){
                        this.battle.addEnergy(args[0],this.player)
                    }
                break
                case 8:
                    if(this.cards[a].spec.includes(35)&&this.cards[a].usable){
                        this.cards[a].cost=max(0,this.cards[a].cost-args[0])
                        this.cards[a].onIncrementCountdown()
                    }
                break
                case 9:
                    if(this.cards[a].class==args[0]){
                        this.cards[a].deSize=true
                        this.cards[a].exhaust=true
                        total--
                        if(total<=0){
                            a=la
                        }
                    }
                break
                case 10:
                    if(this.cards[a].usable&&this.cards[a].cost>=args[0]){
                        this.cards[a].deSize=true
                        total++
                    }
                break
                case 11:
                    if(this.cards[a].basic&&this.cards[a].class==3){
                        this.cards[a].effect[0]+=args[0]
                        this.cards[a].target[2]+=args[0]
                    }
                break
                case 12:
                    if(this.cards[a].usable&&this.cards[a].class==args[0]||this.cards[a].spec.includes(12)&&this.cards[a].class[0]==args[0]){
                        this.cards[a].deSize=true
                        this.cards[a].exhaust=true
                        total++
                    }
                break
                case 13:
                    if(this.cards[a].name=='Shiv'||this.cards[a].name=='Broken\nShiv'||this.cards[a].name=='Deluxe\nShiv'){
                        this.cards[a].effect[0]+=args[0]
                    }
                break
                case 14:
                    if(this.cards[a].name.includes('Cable')&&this.cards[a].class==1){
                        this.cards[a].effect[0]+=args[0]
                    }
                break
                case 15:
                    if(this.cards[a].spec.includes(12)){
                        for(let b=0,lb=this.cards[a].class.length;b<lb;b++){
                            if(this.cards[a].class[b]==1&&this.cards[a].rarity==0&&this.cards[a].effect[b].length>0){
                                this.cards[a].effect[b][0]+=args[0]
                            }
                        }
                    }else if(this.cards[a].class==1&&this.cards[a].rarity==0&&this.cards[a].effect.length>0){
                        this.cards[a].effect[0]+=args[0]
                    }
                break
                case 16:
                    if(this.cards[a].spec.includes(52)){
                        this.cards[a].effect[0]+=args[0]
                    }
                break
                case 17:
                    this.cards[a].color=args[0]
                    this.cards[a].colorDetail=types.color.card[args[0]]
                    for(let b=0,lb=this.battle.cardManagers[this.player].deck.cards.length;b<lb;b++){
                        if(this.cards[a].id==this.battle.cardManagers[this.player].deck.cards[b].id){
                            this.battle.cardManagers[this.player].deck.cards[b].color=args[0]
                            this.battle.cardManagers[this.player].deck.cards[b].colorDetail=types.color.card[args[0]]
                        }
                    }
                break
                case 18:
                    if(this.cards[a].usable&&this.cards[a].class==args[0]&&!this.cards[a].spec.includes(12)){
                        this.cards[a].deSize=true
                        total++
                    }
                break
                case 19:
                    if(this.cards[a].class!=1){
                        this.cards[a].deSize=true
                        this.cards[a].exhaust=true
                        total++
                    }
                break
                case 20:
                    this.cards[a].callMoveTileEffect(args[0],args[1])
                break
                case 21:
                    if(this.cards[a].cost>0){
                        this.cards[a].cost=max(min(this.cards[a].cost,0),this.cards[a].cost-args[0])
                    }
                break
                case 22:
                    if(this.cards[a].cost>0){
                        this.cards[a].cost=max(min(this.cards[a].cost,0),this.cards[a].cost-args[0])
                        this.cards[a].base.cost=max(min(this.cards[a].base.cost,0),this.cards[a].base.cost-args[0])
                    }
                break
                case 23:
                    if(this.cards[a].cost>=0&&this.cards[a].color!=0){
                        this.cards[a].cost+=args[0]
                    }
                break
                case 24:
                    if(this.cards[a].attack==args[0]){
                        this.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                        a--
                        la--
                    }
                break
                case 25:
                    this.cards[a].energyEffect(args[0])
                break
                case 26:
                    if(this.cards[a].spec.includes(55)){
                        this.cards[a].cost+=args[0]
                    }
                break
                case 27:
                    if(this.cards[a].spec.includes(12)){
                        for(let b=0,lb=this.cards[a].class.length;b<lb;b++){
                            if(this.cards[a].class[b]==1&&this.cards[a].effect[b].length>0){
                                this.cards[a].effect[b][0]+=args[0]
                            }
                        }
                    }else if(this.cards[a].class==1&&this.cards[a].effect.length>0){
                        this.cards[a].effect[0]+=args[0]
                    }
                break
                case 28:
                    this.cards[a].cost=min(this.cards[a].cost,args[0])
                break
                case 29:
                    this.cards[a].cost=min(this.cards[a].cost,args[0])
                    this.cards[a].base.cost=min(this.cards[a].base.cost,args[1])
                break
                case 30:
                    if(this.cards[a].cost>0&&args[1].includes(this.cards[a].class)){
                        this.cards[a].cost=max(min(this.cards[a].cost,0),this.cards[a].cost-args[0])
                    }
                break
            }
        }
        if(effect==9){
            return args[1]-total
        }else if(effect==10||effect==12||effect==18||effect==19){
            return total
        }
    }
    randomEffect(effect,args){
        if(this.cards.length>0){
            let list=[]
            for(let a=0,la=this.cards.length;a<la;a++){
                if(this.cards[a].usable&&(!this.cards[a].deSize||effect==41)
                &&!((effect==0||effect==25||effect==28)&&this.cards[a].deSize)
                &&!((effect==1||effect==5||effect==33||effect==40||effect==48)&&(this.cards[a].cost<=0||this.cards[a].spec.includes(5)||this.cards[a].spec.includes(41)||this.cards[a].spec.includes(55)))
                &&!((effect==7||effect==9)&&(this.cards[a].cost<0||this.cards[a].spec.includes(5)||this.cards[a].spec.includes(41)||this.cards[a].spec.includes(55)))
                &&!((effect==2||effect==45)&&(this.cards[a].level>=1||this.cards[a].class!=args[0]&&args[0]!=0||this.cards[a].spec.includes(37)))
                &&!(effect==3&&(this.cards[a].level==0||this.cards[a].class!=args[0]&&args[0]!=0||this.cards[a].spec.includes(37)))
                &&!(effect==8&&this.cards[a].spec.includes(8))
                &&!(effect==10&&this.cards[a].spec.includes(9))
                &&!(effect==11&&this.cards[a].spec.includes(10))
                &&!((effect==15||effect==20)&&(this.cards[a].effect.length==0||this.cards[a].class==3&&this.cards[a].effect==1))
                &&!(effect==17&&(this.cards[a].attack==-66||this.cards[a].attack==1115||this.cards[a].deSize))
                &&!(effect==18&&this.cards[a].class==3)
                &&!(effect==19&&this.cards[a].spec.includes(1))
                &&!((effect==20||effect==24)&&this.cards[a].effect.length<=0)
                &&!(effect==21&&!this.removable(a))
                &&!(effect==22&&this.cards[a].spec.includes(39))
                &&!((effect==26||effect==27)&&!(this.cards[a].spec.includes(35)&&this.cards[a].cost>0))
                &&!((effect==18||effect==29)&&(this.cards[a].spec.includes(15)||this.cards[a].spec.includes(30)||this.cards[a].spec.includes(36)||this.cards[a].spec.includes(38)))
                &&!(effect==29&&(this.cards[a].limit!=[]||this.cards[a].spec.includes(15)||this.cards[a].spec.includes(38)))
                &&!(effect==30&&this.cards[a].edition!=0)
                &&!(effect==31&&this.cards[a].edition!=args[0])
                &&!(effect==32&&!(this.cards[a].name==args[1]&&this.cards[a].cost>0))
                &&!(effect==34&&(this.cards[a].retain||this.cards[a].retain2|this.cards[a].spec.includes(2)||this.cards[a].spec.includes(29)))
                &&!(effect==35&&(this.cards[a].cost<=0||this.cards[a].spec.includes(5)||this.cards[a].spec.includes(41)||this.cards[a].spec.includes(41)||this.cards[a].class!=1))
                &&!(effect==36&&(this.cards[a].level>=2||this.cards[a].class!=args[0]&&args[0]!=0||this.cards[a].spec.includes(37)))
                &&!(effect==38&&(this.cards[a].level!=1||this.cards[a].class!=args[0]&&args[0]!=0||this.cards[a].spec.includes(37)))
                &&!(effect==39&&this.cards[a].spec.includes(7))
                &&!((effect==41||effect==44)&&!this.cards[a].spec.includes(53))
                &&!(effect==42&&(this.cards[a].effect.length==0||this.cards[a].class!=1))
                &&!(effect==43&&(this.cards[a].spec.includes(5)||this.cards[a].spec.includes(41)||this.cards[a].spec.includes(41)))
                &&!(effect==46&&this.cards[a].list!=game.playerNumber+2)
                &&!(effect==47&&(this.cards[a].level<=1||this.cards[a].class!=args[0]&&args[0]!=0||this.cards[a].spec.includes(37)))
                &&!(effect==49&&this.cards[a].cost!=0)
                &&!(effect==50&&this.cards[a].class!=5)
                &&!(effect==51&&this.cards[a].spec.includes(57))
                &&!(effect==52&&(!this.removable(a)||this.cards[a].class!=args[0]&&args[0]!=0))
                ){
                    list.push(a)
                }
            }
            if(list.length>0){
                let index=list[floor(random(0,list.length))]
                switch(effect){
                    case 0: case 17:
                        this.cards[index].deSize=true
                    break
                    case 1: case 35:
                        this.cards[index].cost=max(this.cards[index].cost-args[0],0)
                    break
                    case 2: case 36: case 38:
                        this.cards[index]=upgradeCard(this.cards[index])
                    break
                    case 3: case 47:
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
                    case 12: case 49:
                        this.send(args[0],index,index+1,1)
                    break
                    case 13:
                        this.cards[index].deSize=true
                        this.cards[index].exhaust=true
                    break
                    case 14:
                        if(this.id==2){
                            this.cards[index].deSize=true
                            this.cards[index].discardEffect.push(4)
                        }else{
                            this.cards[index]=this.battle.cardManagers[this.player].transformCard(this.cards[index])
                        }
                    break
                    case 15:
                        if(this.cards[index].spec.includes(12)){
                            for(let a=0,la=this.cards[index].effect.length;a<la;a++){
                                for(let b=0,lb=this.cards[index].effect[a].length;b<lb;b++){
                                    if(!b==0&&this.cards[index].class[a]==3){
                                        this.cards[index].effect[a][b]=min(this.cards[index].effect[a][b],1)
                                    }
                                }
                            }
                        }else{
                            for(let a=0,la=this.cards[index].effect.length;a<la;a++){
                                if(!a==0&&this.cards[index].class==3){
                                    this.cards[index].effect[a]=min(this.cards[index].effect[a],1)
                                }
                            }
                        }
                    break
                    case 16:
                        this.send(args[0],index,index+1,1)
                    break
                    case 18:
                        if(this.cards[index].spec.includes(12)){
                            for(let a=0,la=this.cards[index].effect.length;a<la;a++){
                                for(let b=0,lb=this.cards[index].effect[a].length;b<lb;b++){
                                    this.cards[index].effect[a][b]*=2
                                    this.cards[index].effect[a][b]=min(this.cards[index].effect[a][b],1)
                                }
                            }
                        }else{
                            for(let a=0,la=this.cards[index].effect.length;a<la;a++){
                                this.cards[index].effect[a]*=2
                            }
                        }
                        this.cards[index].spec.push(15)
                        this.cards[index].additionalSpec.push(15)
                        this.cards[index].limit=args[0]
                        if(this.cards[index].limit==undefined){
                            this.cards[index].limit=1
                        }
                    break
                    case 19:
                        if(!this.cards[index].spec.includes(1)&&this.cards[index].attack!=-25){
                            this.cards[index].spec.push(1)
                        }
                    break
                    case 20:
                        if(this.cards[index].spec.includes(12)){
                            for(let a=0,la=this.cards[index].effect.length;a<la;a++){
                                for(let b=0,lb=this.cards[index].effect[a].length;b<lb;b++){
                                    if(this.cards[index].effect[a][b]>0&&!(b==0&&this.cards[index].class[a]==3)){
                                        this.cards[index].effect[a][b]++
                                    }
                                }
                            }
                        }else{
                            for(let a=0,la=this.cards[index].effect.length;a<la;a++){
                                if(this.cards[index].effect[a]>0&&!(a==0&&this.cards[index].class==3)){
                                    this.cards[index].effect[a]++
                                }
                            }
                        }
                    break
                    case 21: case 52:
                        this.remove(index)
                    break
                    case 22:
                        if(!this.cards[index].spec.includes(39)){
                            this.cards[index].spec.push(39)
                        }
                    break
                    case 23:
                        this.cards[index]=this.battle.cardManagers[this.player].transformCard(this.cards[index])
                    break
                    case 24:
                        if(this.cards[index].spec.includes(12)){
                            for(let a=0,la=this.cards[index].effect.length;a<la;a++){
                                for(let b=0,lb=this.cards[index].effect[a].length;b<lb;b++){
                                    if(this.cards[index].effect[a][b]>0&&!(b==0&&this.cards[index].class[a]==3)){
                                        this.cards[index].effect[a][b]--
                                    }
                                }
                            }
                        }else{
                            for(let a=0,la=this.cards[index].effect.length;a<la;a++){
                                if(this.cards[index].effect[a]>0&&!(a==0&&this.cards[index].class==3)){
                                    this.cards[index].effect[a]--
                                }
                            }
                        }
                    break
                    case 25:
                        this.cards[index].deSize=true
                        this.battle.cardManagers[this.player].reserve.cards.push(copyCard(this.cards[index]))
                        this.battle.cardManagers[this.player].reserve.slideTop()
                        this.battle.cardManagers[this.player].reserve.cards.push(copyCard(this.cards[index]))
                        this.battle.cardManagers[this.player].reserve.slideTop()
                    break
                    case 26:
                        this.cards[index].cost=max(0,this.cards[index].cost-args[0])
                    break
                    case 27: case 32:
                        this.cards[index].cost=args[0]
                    break
                    case 28:
                        this.cards[index].deSize=true
                        this.battle.cardManagers[this.player].reserve.cards.splice(0,0,copyCard(this.cards[index]))
                    break
                    case 29:
                        this.cards[index].spec.push(15)
                        this.cards[index].additionalSpec.push(15)
                        this.cards[index].limit=args[0]
                    break
                    case 30:
                        this.cards[index].edition=args[0]
                    break
                    case 31:
                        this.cards[index].edition=0
                    break
                    case 33:
                        this.cards[index].cost=0
                        if(!this.cards[index].spec.includes(1)){
                            this.cards[index].spec.push(1)
                        }
                    break
                    case 34:
                        this.cards[index].retain=true
                    break
                    case 37:
                        this.send(args[0],index,index+1,6)
                    break
                    case 39:
                        this.remove(index)
                    break
                    case 40:
                        this.cards[index].cost=max(this.cards[index].cost-args[0],0)
                        this.cards[index].base.cost=max(this.cards[index].base.cost-args[0],0)
                        this.cards[index].edited.cost-=args[0]
                        this.cards[index].edited.costComplete=true
                    break
                    case 41:
                        this.cards[index].deSize=true
                        this.cards[index].discardEffect.push(0)
                    break
                    case 42:
                        if(this.cards[index].spec.includes(12)){
                            for(let a=0,la=this.cards[index].effect.length;a<la;a++){
                                if(this.cards[index].effect[a].length>0){
                                    this.cards[index].effect[a][0]+=args[0]
                                }
                            }
                        }else{
                            this.cards[index].effect[0]+=args[0]
                        }
                    break
                    case 43:
                        this.cards[index].cost=floor(random(0,4))
                    break
                    case 44:
                        this.cards[index].effect[1]*=2
                    break
                    case 45:
                        this.cards[index].deSize=true
                        this.cards[index].discardEffect.push(0)
                    break
                    case 46:
                        this.cards[index]=this.battle.cardManagers[this.player].transformCard(this.cards[index])
                    break
                    case 48:
                        this.cards[index].cost=max(this.cards[index].cost-args[0],0)
                        if(!this.cards[index].spec.includes(1)){
                            this.cards[index].spec.push(1)
                        }
                    break
                    case 50:
                        this.cards[index].deSize=true
                        this.cards[index].exhaust=true
                        this.battle.cardManagers[this.player].draw(args[0])
                    break
                    case 51:
                        this.cards[index].spec.push(57)
                    break

                }
            }
        }
    }
    drawEffect(card){
        card.drawn++
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        userCombatant.activateDraw()
        if((card.class==1||card.class==2)&&card.basic){
            if(this.battle.relicManager.hasRelic(264,this.player)&&floor(random(0,4))==0&&card.cost>0){
                card.cost--
            }
            if(this.basicChange[0]>0){
                card.cost=0
                card.cost=0
            }
            if(this.basicChange[1]>0){
                card.effect[0]+=this.basicChange[1]
            }
        }
        switch(card.attack){
            case -3:
                this.drawEffects.push([1,card.effect[0]])
            break
            case -6:
                userCombatant.statusEffect('Weak',card.effect[0])
            break
            case -12:
                this.drawEffects.push([0,7,[card.effect[0]]])
            break
            case -15: case -19:
                userCombatant.statusEffect('Cannot Move',card.effect[0])
            break
            case -16:
                this.battle.cardManagers[this.player].hand.add(findName('Fatigue',types.card),0,game.playerNumber+1)
            break
            case -17:
                this.drawEffects.push([0,9,[card.effect[0]]])
            break
            case -18: case -48:
                this.battle.loseEnergy(card.effect[0],this.player)
            break
            case -20:
                this.drawEffects.push([2,[card.effect[0]]])
            break
            case -22: return 'break'
            case -23:
                for(let a=0,la=card.effect[0];a<la;a++){
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
                userCombatant.statusEffect('Temporary Strength',-card.effect[0])
            break
            case -28:
                userCombatant.statusEffect('Strength',card.effect[0])
            break
            case -29:
                this.battle.setEnergy(0,this.player)
            break
            case -31:
                this.battle.combatantManager.fullAllEffect(3,[card.effect[0]])
            break
            case -32:
                this.battle.combatantManager.fullAllEffect(4,[card.effect[0],userCombatant.id])
            break
            case -34:
                for(let a=0,la=card.effect[0];a<la;a++){
                    this.drawEffects.push([6])
                }
            break
            case -43:
                for(let a=0,la=card.effect[0];a<la;a++){
                    this.battle.cardManagers[this.player].reserve.falsedSwap()
                }
            break
            case -44:
                this.drawEffects.push([0,10,[]])
            break
            case -46:
                this.drawEffects.push([5,this.effect[0]])
                return 'break'
            case -51: case 2720: case 2804:
                card.cost=max(0,card.cost-1)
                card.base.cost=max(0,card.base.cost-1)
            break
            case -55:
                this.battle.cardManagers[this.player].randomEffect(2,22,[])
            break
            case -56:
                this.battle.loseEnergy(card.effect[0],this.player)
                this.drawEffects.push([8,card.effect[1]])
            break
            case -61:
                for(let a=0,la=card.effect[0];a<la;a++){
                    this.battle.cardManagers[this.player].hand.add(card.type,card.level,card.color,card.edition)
                }
            break
            case -63:
                this.battle.cardManagers[this.player].hand.add(findName('Pristine',types.card),0,0)
            break
            case -64:
                this.drawEffects.push([9,card.effect[0]])
            break
            case -66:
                for(let a=0,la=card.effect[0];a<la;a++){
                    this.drawEffects.push([0,17,[]])
                }
            break
            case -67:
                this.battle.loseCurrency(card.effect[0],this.player)
            break
            case -68:
                this.battle.cardManagers[this.player].hand.discard(card.effect[0])
            break
            case -70:
                this.battle.addEnergy(card.effect[0],this.player)
                this.drawEffects.push([5,card.effect[1]])
                for(let a=0,la=card.effect[2];a<la;a++){
                    this.battle.cardManagers[this.player].hand.add(card.type,card.level,card.color,card.edition)
                }
            break
            case -71:
                userCombatant.statusEffect('Luck Guarantee Fail',1)
            break
            case -72:
                this.battle.loseEnergy(card.effect[0],this.player)
                this.battle.cardManagers[this.player].hand.add(findName('Pristine',types.card),0,0)
            break
            case -73:
                userCombatant.statusEffect('Temporary Strength',-card.effect[0])
                userCombatant.statusEffect('Temporary Dexterity',-card.effect[1])
            break
            case -74:
                userCombatant.statusEffect('Luck Guarantee',1)
                this.drawEffects.push([5,card.effect[0]])
            break

            //mark n
            
            case 288: case 374: case 2217: case 2776:
                for(let a=0,la=card.effect[1];a<la;a++){
                    this.battle.cardManagers[this.player].hand.add(card.type,card.level,card.color,card.edition)
                }
            break
            case 327:
                if(userCombatant.getStatus('Drawn Shiv Draw')>0){
                    this.drawEffects.push([5,this.drawEffects.push([5,userCombatant.getStatus('Drawn Shiv Draw')])])
                }
            break
            case 933:
                this.battle.addEnergy(card.effect[0],this.player)
            break
            case 1064:
                this.drawEffects.push([5,card.effect[2]])
            break
            case 1065: case 3103: case 3113: case 3114: case 3119:
                this.drawEffects.push([5,card.effect[1]])
            break
            case 1076:
                this.battle.combatantManager.allEffect(19,[card.effect[0]])
            break
            case 1114:
                this.drawEffects.push([5,card.effect[0]])
            break
            case 1115:
                userCombatant.heal(card.effect[0])
                for(let a=0,la=card.effect[1];a<la;a++){
                    this.drawEffects.push([0,17,[]])
                }
            break
            case 1239:
                userCombatant.statusEffect('Damage Down',card.effect[0])
            break
            case 1240:
                userCombatant.statusEffect('Burn',card.effect[0])
            break
            case 1241:
                userCombatant.statusEffect('Counter All',card.effect[0])
            break
            case 1242:
                userCombatant.addBlock(card.effect[0])
            break
            case 1243:
                this.battle.cardManagers[this.player].hand.upgrade(card.effect[0])
            break
            case 1271:
                this.battle.combatantManager.randomEnemyEffect(3,[card.effect[1],this.battle.combatantManager.getPlayerCombatantIndex(this.player)])
            break
            case 1307:
                userCombatant.statusEffect('Bleed',card.effect[0])
            break
            case 1332:
                userCombatant.heal(card.effect[0])
            break
            case 1369:
                userCombatant.statusEffect('Armor',card.effect[0])
            break
            case 1433:
                userCombatant.statusEffect('Freeze',card.effect[0])
            break
            case 1501:
                userCombatant.statusEffect('Shock',card.effect[0])
            break
            case 1565:
                userCombatant.balance+=card.effect[0]
            break
            case 1745: case 1943: case 2096: case 2128: case 2200: case 2465:
                for(let a=0,la=card.effect[2];a<la;a++){
                    this.battle.cardManagers[this.player].hand.add(card.type,card.level,card.color,card.edition)
                }
            break
            case 2244:
                userCombatant.statusEffect('Temporary Draw',card.effect[0])
            break
            case 2313:
                userCombatant.statusEffect('Dexterity',card.effect[0])
            break
            case 2411:
                userCombatant.statusEffect('Temporary Damage Up',card.effect[2])
            break
            case 2479:
                userCombatant.statusEffect('Jinx',card.effect[0])
            break
            case 2480:
                userCombatant.statusEffect('Shock',card.effect[0])
            break
            case 2510:
                userCombatant.heal(card.effect[0])
            break
            case 2511:
                userCombatant.heal(card.effect[0])
                this.battle.cardManagers[this.player].draw(card.effect[1])
            break
            case 2551:
                for(let a=0,la=card.effect[0];a<la;a++){
                    this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                }
            break
            case 2578:
                this.battle.itemManager.addRandomItem(this.player)
            break
            case 2694:
                userCombatant.addBlock(card.effect[0])
                userCombatant.statusEffect('History',card.effect[1])
            break
            case 2732:
                userCombatant.statusEffect('History',card.effect[0])
            break
            case 2779:
                userCombatant.statusEffect('Attack Shock Turn',card.effect[0])
            break
            case 2821:
                for(let a=0,la=card.effect[0];a<la;a++){
                    this.battle.itemManager.addItem(findName('Mundane Dust',types.item),this.player)
                }
            break
            case 2822:
                userCombatant.vision+=card.effect[0]
            break
            case 2873:
                this.battle.combatantManager.randomNumberEffect(
                    1+userCombatant.getStatus('Prismatic Bomb Targets'),
                    0,
                    [
                        card.effect[0],
                        this.player,
                        userCombatant.getStatus('Prismatic Bomb Freeze'),
                        userCombatant.getStatus('Prismatic Bomb Poison')
                    ]
                )
                this.battle.addEnergy(card.effect[1],this.player)
                this.drawEffects.push([5,card.effect[2]])
            break
            case 2904:
                userCombatant.statusEffect('Temporary Draw',card.effect[0])
                userCombatant.statusEffect('Temporary Draw Next Turn',card.effect[0])
            break
            case 2905:
                userCombatant.statusEffect('Temporary Draw',card.effect[0])
                userCombatant.statusEffect('Temporary Draw Next Turn',card.effect[0])
                userCombatant.statusEffect('Temporary Draw in 2 Turns',card.effect[0])
            break
            case 3072:
                card.cost++
                card.base.cost++
            break
            case 3088:
                this.drawEffects.push([7,card.effect[0]])
            break
            case 3089:
                this.drawEffects.push([7,card.effect[0]])
                this.drawEffects.push([5,card.effect[1]])
            break
            case 3149:
                card.effect[0]+=card.effect[1]
            break
            case 3245:
                userCombatant.block=0
            break
            case 3358:
                this.drawEffects.push([10,card.effect[0],[2]])
                this.drawEffects.push([10,card.effect[1],[3]])
                this.drawEffects.push([10,card.effect[2],[4]])
            break
            case 3413:
                this.drawEffects.push([10,card.effect[0],[2]])
                this.drawEffects.push([10,card.effect[1],[3]])
                this.drawEffects.push([10,card.effect[2],[11]])
            break
        }
    }
    deathEffect(){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        for(let a=0,la=this.cards.length;a<la;a++){
            switch(this.cards[a].attack){
                case -8:
                    userCombatant.takeDamage(this.cards[a].effect[0],-1)
                break
                case -69:
                    userCombatant.life=0
                break
                case 1275:
                    this.battle.addCurrency(this.cards[a].effect[0],this.player)
                break
                case 2547:
                    this.cards[a].effect[0]=this.cards[a].effect[1]
                break
            }
        }
    }
    parseDrawEffects(parent){
        this.basicChange=[0,0]
        if(this.drawEffects.length>0){
            let drawCount=0
            let classDrawCount=[0,0,0,0,0,0,0,0,0,0,0,0]
            for(let a=0,la=this.drawEffects.length;a<la;a++){
                switch(this.drawEffects[a][0]){
                    case 0:
                        parent.randomEffect(this.drawEffects[a][1],this.drawEffects[a][2])
                    break
                    case 1:
                        parent.status[1]+=this.drawEffects[a][1]
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
                    case 5:
                        drawCount+=this.drawEffects[a][1]
                    break
                    case 6:
                        parent.falsedSwap()
                    break
                    case 7:
                        parent.allEffectArgs(21,[this.drawEffects[a][1]])
                    break
                    case 8:
                        this.battle.cardManagers[this.player].randomEffect(2,1,[this.drawEffects[a][1]])
                    break
                    case 9:
                        parent.allEffectArgs(23,[this.drawEffects[a][1]])
                    break
                    case 10:
                        classDrawCount[this.drawEffects[a][2]]+=this.drawEffects[a][1]
                    break
                }
            }
            this.drawEffects=[]
            if(drawCount>0){
                this.battle.cardManagers[this.player].draw(drawCount)
            }
            for(let a=0,la=classDrawCount.length;a<la;a++){
                if(classDrawCount[a]>0){
                    this.battle.cardManagers[this.player].drawAbstract(classDrawCount[a],0,0,[a])
                }
            }
        }
    }
    sendAbstract(list,amount,variant,output,args){
        let total=0
        switch(variant){
            case 5: case 6:
                this.sortCost()
            break
            case 7: case 8:
                this.sortSpecLength()
            break
            case 12: case 13:
                this.sortRarity()
            break
        }
        if((variant==5||variant==6||variant==7||variant==8||variant==12||variant==13)&&this.sorted.length==0){
            return 0
        }
        for(let a=0,la=this.cards.length;a<la;a++){
            if(
                variant==0&&this.cards[a].class==args[0]||
                variant==1&&this.cards[a].cost==args[0]||
                variant==2&&this.cards[a].attack==args[0]||
                variant==3&&this.cards[a].name==args[0]||
                variant==4&&this.cards[a].rarity==args[0]||
                variant==5&&this.cards[a].cost==this.sorted[0]||
                variant==6&&this.cards[a].cost==this.sorted[this.sorted.length-1]||
                variant==7&&this.cards[a].spec.length==this.sorted[0]||
                variant==8&&this.cards[a].spec.length==this.sorted[this.sorted.length-1]||
                variant==9&&this.cards[a].cost%[args[0]]==args[1]||
                variant==10&&this.cards[a].spec.includes(args[0])||
                variant==11&&this.cards[a].colorless()||
                variant==12&&this.cards[a].rarity==this.sorted[0]||
                variant==13&&this.cards[a].rarity==this.sorted[this.sorted.length-1]
            ){
                if(output==1){
                    list.splice(index,0,copyCard(this.cards[a]))
                }else{
                    list.push(copyCard(this.cards[a]))
                }
                list[list.length-1].size=0
                list[list.length-1].position.x=1200
                list[list.length-1].position.y=500
                if(this.drawEffect(list[list.length-1])){la=0}
                switch(output){
                    case 2:
                        list[list.length-1].cost=0
                    break
                    case 3:
                        list[list.length-1].cost=max(min(0,list[list.length-1].cost),list[list.length-1].cost-1)
                    break
                    case 4:
                        list[list.length-1].cost=max(min(0,list[list.length-1].cost),list[list.length-1].cost-2)
                    break
                    case 5:
                        list[list.length-1].retain=true
                    break
                }
                delete this.cards[a]
                this.cards.splice(a,1)
                a--
                la--
                total++
                if(total>=amount&&amount!=-1){
                    a=la
                }
            }
        }
        return total
    }
    send(list,firstIndex,lastIndex,spec){
        this.lastSort=-1
        if(lastIndex==-1){
            for(let a=0,la=this.cards.length-firstIndex;a<la;a++){
                if(spec==17){
                    if(this.cards[firstIndex].cost>0){
                        this.cards[firstIndex].cost--
                    }
                    list.splice(floor(random(0,list.length)),0,copyCard(this.cards[firstIndex]))
                }else if(spec==15){
                    list.splice(floor(random(0,list.length)),0,copyCard(this.cards[firstIndex]))
                }else if(spec==11){
                    list.splice(0,0,copyCard(this.cards[firstIndex]))
                }else{
                    list.push(copyCard(this.cards[firstIndex]))
                }
                list[list.length-1].size=0
                if(
                    spec==1||spec==2||spec==3||spec==4||spec==5||spec==6||spec==8||spec==9||spec==10||spec==12||
                    spec==13||spec==14||spec==16||spec==18||spec==19
                ){
                    list[list.length-1].position.x=1200
                    list[list.length-1].position.y=500
                    switch(spec){
                        case 2:
                            if(!list[list.length-1].additionalSpec.includes(-2)&&!list[list.length-1].spec.includes(55)){
                                list[list.length-1].cost=list[list.length-1].base.cost
                            }
                        break
                        case 3:
                            if(this.drawEffect(list[list.length-1])){la=0}
                        break
                        case 4:
                            list[list.length-1].cost=0
                        break
                        case 5:
                            if(this.drawEffect(list[list.length-1])){la=0}
                            list[list.length-1].cost=0
                        break
                        case 6:
                            if(list[list.length-1].cost>0){
                                list[list.length-1].cost--
                            }
                        break
                        case 8:
                            if(list[list.length-1].level==0){
                                list[list.length-1]=upgradeCard(list[list.length-1])
                            }
                            if(this.drawEffect(list[list.length-1])){la=0}
                        break
                        case 9:
                            list[list.length-1].retain=true
                            if(this.drawEffect(list[list.length-1])){la=0}
                        break
                        case 10:
                            if(list[list.length-1].level<=1){
                                list[list.length-1]=upgradeCard(list[list.length-1])
                            }
                        break
                        case 12:
                            list[list.length-1].retain2=true
                            if(this.drawEffect(list[list.length-1])){la=0}
                        break
                        case 13:
                            if(!list[list.length-1].spec.includes(39)){
                                list[list.length-1].spec.push(39)
                            }
                            if(this.drawEffect(list[list.length-1])){la=0}
                        break
                        case 14:
                            if(!list[list.length-1].spec.includes(48)){
                                list[list.length-1].spec.push(48)
                            }
                            if(this.drawEffect(list[list.length-1])){la=0}
                        break
                        case 16:
                            list[list.length-1].cost=floor(random(0,4))
                        break
                        case 18:
                            if(!list[list.length-1].spec.includes(9)){
                                list[list.length-1].spec.push(9)
                            }
                            if(this.drawEffect(list[list.length-1])){la=0}
                        break
                        case 19:
                            if(this.drawEffect(list[list.length-1])){la=0}
                            if(list[list.length-1].cost>=0){
                                list[list.length-1].cost++
                            }
                        break
                    }
                }else if(spec==7&&!list[list.length-1].additionalSpec.includes(-2)){
                    list[list.length-1].cost=list[list.length-1].base.cost
                }
                delete this.cards[firstIndex]
                this.cards.splice(firstIndex,1)
            }
        }else{
            for(let a=0,la=lastIndex-firstIndex;a<la;a++){
                if(spec==17){
                    if(this.cards[firstIndex].cost>0){
                        this.cards[firstIndex].cost--
                    }
                    list.splice(floor(random(0,list.length)),0,copyCard(this.cards[firstIndex]))
                }else if(spec==15){
                    list.splice(floor(random(0,list.length)),0,copyCard(this.cards[firstIndex]))
                }else if(spec==11){
                    list.splice(0,0,copyCard(this.cards[firstIndex]))
                }else{
                    list.push(copyCard(this.cards[firstIndex]))
                }
                list[list.length-1].size=0
                if(
                    spec==1||spec==2||spec==3||spec==4||spec==5||spec==6||spec==8||spec==9||spec==10||spec==12||
                    spec==13||spec==14||spec==16||spec==18||spec==19
                ){
                    list[list.length-1].position.x=1200
                    list[list.length-1].position.y=500
                    switch(spec){
                        case 2:
                            if(!list[list.length-1].additionalSpec.includes(-2)&&!list[list.length-1].spec.includes(55)){
                                list[list.length-1].cost=list[list.length-1].base.cost
                            }
                        break
                        case 3:
                            if(this.drawEffect(list[list.length-1])){la=0}
                        break
                        case 4:
                            list[list.length-1].cost=0
                        break
                        case 5:
                            if(this.drawEffect(list[list.length-1])){la=0}
                            list[list.length-1].cost=0
                        break
                        case 6:
                            if(this.drawEffect(list[list.length-1])){la=0}
                            if(list[list.length-1].cost>0){
                                list[list.length-1].cost--
                            }
                        break
                        case 8:
                            if(list[list.length-1].level==0){
                                list[list.length-1]=upgradeCard(list[list.length-1])
                            }
                            if(this.drawEffect(list[list.length-1])){la=0}
                        break
                        case 9:
                            list[list.length-1].retain=true
                            if(this.drawEffect(list[list.length-1])){la=0}
                        break
                        case 10:
                            if(list[list.length-1].level<=1){
                                list[list.length-1]=upgradeCard(list[list.length-1])
                            }
                        break
                        case 12:
                            list[list.length-1].retain2=true
                            if(this.drawEffect(list[list.length-1])){la=0}
                        break
                        case 13:
                            if(!list[list.length-1].spec.includes(39)){
                                list[list.length-1].spec.push(39)
                            }
                            if(this.drawEffect(list[list.length-1])){la=0}
                        break
                        case 14:
                            if(!list[list.length-1].spec.includes(48)){
                                list[list.length-1].spec.push(48)
                            }
                            if(this.drawEffect(list[list.length-1])){la=0}
                        break
                        case 16:
                            list[list.length-1].cost=floor(random(0,4))
                        break
                        case 18:
                            if(!list[list.length-1].spec.includes(9)){
                                list[list.length-1].spec.push(9)
                            }
                            if(this.drawEffect(list[list.length-1])){la=0}
                        break
                        case 19:
                            if(this.drawEffect(list[list.length-1])){la=0}
                            if(list[list.length-1].cost>=0){
                                list[list.length-1].cost++
                            }
                        break
                    }
                }else if(spec==7&&!list[list.length-1].additionalSpec.includes(-2)){
                    list[list.length-1].cost=list[list.length-1].base.cost
                }
                delete this.cards[firstIndex]
                this.cards.splice(firstIndex,1)
            }
        }
    }
    copy(list,firstIndex,lastIndex,spec){
        if(lastIndex==-1){
            for(let a=0,la=this.cards.length-firstIndex;a<la;a++){
                list.push(copyCard(this.cards[firstIndex+a]))
                list[list.length-1].position.x=1200
                list[list.length-1].position.y=500
                if(spec==0){
                    list[list.length-1].nonCalc=false
                }
            }
        }else{
            for(let a=0,la=lastIndex-firstIndex;a<la;a++){
                list.push(copyCard(this.cards[firstIndex+a]))
                list[list.length-1].position.x=1200
                list[list.length-1].position.y=500
                if(spec==0){
                    list[list.length-1].nonCalc=false
                }
            }
        }
    }
    copyAntiInnate(list,firstIndex,lastIndex,key,spec){
        if(lastIndex==-1){
            for(let a=0,la=this.cards.length-firstIndex;a<la;a++){
                if(!this.cards[firstIndex+a].spec.includes(47)&&key==0||this.cards[firstIndex+a].spec.includes(47)&&key==1){
                    list.push(copyCard(this.cards[firstIndex+a]))
                    list[list.length-1].position.x=1200
                    list[list.length-1].position.y=500
                    if(spec==0){
                        list[list.length-1].nonCalc=false
                    }
                }
            }
        }else{
            for(let a=0,la=lastIndex-firstIndex;a<la;a++){
                if(!this.cards[firstIndex+a].spec.includes(47)&&key==0||this.cards[firstIndex+a].spec.includes(47)&&key==1){
                    list.push(copyCard(this.cards[firstIndex+a]))
                    list[list.length-1].position.x=1200
                    list[list.length-1].position.y=500
                    if(spec==0){
                        list[list.length-1].nonCalc=false
                    }
                }
            }
        }
    }
    copySelf(index){
        game.id++
        this.lastDuplicate.push(this.cards[index].name)
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
                        if(this.cards[index].spec.includes(12)){
                            for(let c=0,lc=this.cards[index].effect[b].length;c<lc;c++){
                                if(!(c==0&&this.cards[index].class[b]==3)){
                                    this.cards[index].effect[b][c]=max(this.cards[index].effect[b][c],this.cards[index].effect[b][c]+this.cards[block].effect[b][c]-1)
                                }
                            }
                        }else{
                            if(!(b==0&&this.cards[index].class==3)){
                                this.cards[index].effect[b]=max(this.cards[index].effect[b],this.cards[index].effect[b]+this.cards[block].effect[b]-1)
                            }
                        }
                    }
                    this.cards[index].spec.push(37)
                    this.cards[index].additionalSpec.push(37)
                    this.cards.splice(block,1)
                }else{
                    for(let b=0,lb=this.cards[block].effect.length;b<lb;b++){
                        if(this.cards[index].spec.includes(12)){
                            for(let c=0,lc=this.cards[block].effect[b].length;c<lc;c++){
                                if(!(c==0&&this.cards[index].class[b]==3)){
                                    this.cards[block].effect[b][c]=max(this.cards[block].effect[b][c],this.cards[block].effect[b][c]+this.cards[index].effect[b][c]-1)
                                }
                            }
                        }else{
                            if(!(b==0&&this.cards[index].class==3)){
                                this.cards[block].effect[b]=max(this.cards[block].effect[b],this.cards[block].effect[b]+this.cards[index].effect[b]-1)
                            }
                        }
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
        this.lastSort=0
        let names=[]
        for(let a=0,la=this.cards.length;a<la;a++){
            if(!names.includes(this.cards[a].name)){
                names.push(this.cards[a].name)
            }
        }
        let midSorted=names.sort()
        this.sorted=[]
        for(let a=0,la=midSorted.length;a<la;a++){
            for(let b=0,lb=this.cards.length;b<lb;b++){
                if(this.cards[b].name==midSorted[a]){
                    this.sorted.push(b)
                }
            }
        }
    }
    sortCost(){
        this.lastSort=1
        let costs=[]
        for(let a=0,la=this.cards.length;a<la;a++){
            if(!costs.includes(this.cards[a].cost)){
                costs.push(this.cards[a].cost)
            }
        }
        this.sorted=costs.sort()
    }
    sortSpecLength(){
        this.lastSort=2
        let costs=[]
        for(let a=0,la=this.cards.length;a<la;a++){
            if(!costs.includes(this.cards[a].spec.length)){
                costs.push(this.cards[a].spec.length)
            }
        }
        this.sorted=costs.sort()
    }
    sortRarity(){
        this.lastSort=3
        let rarities=[]
        for(let a=0,la=this.cards.length;a<la;a++){
            if(!rarities.includes(this.cards[a].rarity)&&this.cards[a].rarity<=2&&this.cards[a].rarity>=-2){
                rarities.push(this.cards[a].rarity)
            }
        }
        this.sorted=rarities.sort()
    }
    sortClass(cardClass){
        this.lastSort=4
        let names=[]
        for(let a=0,la=this.cards.length;a<la;a++){
            if(!names.includes(this.cards[a].name)&&this.cards[a].class==cardClass){
                names.push(this.cards[a].name)
            }
        }
        this.sorted=names.sort()
    }
    remove(index){
        let possible=!this.cards[index].spec.includes(7)&&!(this.battle.initialized&&this.battle.modded(97))
        if(possible){
            this.removed.push(copyCard(this.cards[index]))
            this.cards[index].callRemoveEffect()
            this.cards.splice(index,1)
        }
        return possible
    }
    removeBypass(index){
        this.removed.push(copyCard(this.cards[index]))
        this.cards[index].callRemoveEffect()
        this.cards.splice(index,1)
        return true
    }
    removable(index){
        return !this.cards[index].spec.includes(7)
    }
    unRemove(){
        this.cards.push(this.removed[this.removed.length-1])
        this.removed.splice(this.removed.length-1,1)
    }
    hasCard(type){
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].type==type){
                return true
            }
        }
        return false
    }
    removeAbstract(type,args){
        for(let a=0,la=this.cards.length;a<la;a++){
            if(
                type==0&&args[0]==this.cards[a].type||
                type==1&&args[0]==this.cards[a].type||
                type==2&&args[0].includes(this.cards[a].class)||
                type==3&&args[0]==this.cards[a].rarity||
                type==4&&args[0]==this.cards[a].list||
                type==5&&args[0]==this.cards[a].list&&args[1]==this.cards[a].edition||
                type==6&&args[0].includes(this.cards[a].class)||
                type==7&&args[0].includes(this.cards[a].class)&&this.cards[a].basic||
                type==8&&args[0]==this.cards[a].rarity&&args[1]==this.cards[a].level
            ){
                if(this.id==0){
                    if(this.remove(a)){
                        a--
                        la--
                    }
                }else{
                    this.cards.splice(a,1)
                    a--
                    la--
                }
                if(type==1||type==2||type==3||type==4||type==5){
                    a=la
                }
            }
        }
    }
    unDuplicate(){
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].name==this.lastDuplicate[this.lastDuplicate.length-1]){
                this.cards.splice(a,1)
                this.lastDuplicate.splice(this.lastDuplicate.length-1,1)
                a=la
            }
        }
    }
    unTriochrome(){
        this.unDuplicate()
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].name==this.lastDuplicate[this.lastDuplicate.length-1]){
                this.cards.splice(a,1)
                for(let b=0,lb=this.cards.length;b<lb;b++){
                    if(this.cards[b].name==this.lastDuplicate[this.lastDuplicate.length-1]&&this.cards[b].edition==4){
                        this.cards[b].edition=0
                    }
                }
                this.lastDuplicate.splice(this.lastDuplicate.length-1,1)
                a=la
            }
        }
    }
    unInnate(cardClass){
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].additionalSpec.includes(3)&&(cardClass==-1||this.cards[a].class==cardClass)){
                this.cards[a].spec.splice(this.cards[a].spec.indexOf(3),1)
                this.cards[a].additionalSpec.splice(this.cards[a].additionalSpec.indexOf(3),1)
            }
        }
    }
    cost(cost,cardClass,spec,target,mtgManaColor=0,card){
        let effectiveCost=cost
        this.battle.attackManager.amplify=false
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(spec.includes(25)&&userCombatant.ammo>0&&!(target[0]==46&&this.battle.attackManager.targetDistance<=1)){
            userCombatant.ammo--
        }
        if(effectiveCost>0&&userCombatant.getStatus('Skill Cost Down')>0){
            effectiveCost=max(effectiveCost-userCombatant.getStatus('Skill Cost Down'),0)
        }
        if(
            !(userCombatant.getStatus('Free Defenses')>0&&cardClass==2)&&
            !(userCombatant.getStatus('Free Cables')>0&&card.name.includes('Cable')&&cardClass==1)
        ){
            if(effectiveCost!=0&&card.colorless()&&card.rarity!=2&&userCombatant.getStatus('Temporary Free Non-Rare Colorless')>0){
                userCombatant.status.main[findList('Temporary Free Non-Rare Colorless',userCombatant.status.name)]--
            }else if(effectiveCost==1&&userCombatant.getStatus('Free 1 Cost Card')>0){
                userCombatant.status.main[findList('Free 1 Cost Card',userCombatant.status.name)]--
            }else if(effectiveCost!=0&&cardClass==3&&userCombatant.getStatus('Free Movement')>0){
                userCombatant.status.main[findList('Free Movement',userCombatant.status.name)]--
            }else if(effectiveCost!=0&&cardClass==1&&userCombatant.getStatus('Free Attack')>0){
                userCombatant.status.main[findList('Free Attack',userCombatant.status.name)]--
            }else if(effectiveCost!=0&&userCombatant.getStatus('Free Card')>0){
                userCombatant.status.main[findList('Free Card',userCombatant.status.name)]--
            }else if(effectiveCost!=0&&spec.includes(58)){
                userCombatant.life-=effectiveCost
            }else if(effectiveCost!=0&&spec.includes(11)){
                userCombatant.combo-=effectiveCost
            }else if(effectiveCost!=0&&spec.includes(21)){
                userCombatant.metal-=effectiveCost
            }else if(effectiveCost!=0&&spec.includes(40)){
                userCombatant.status.main[findList('Twos',userCombatant.status.name)]-=effectiveCost
            }else{
                if(effectiveCost==-1){
                    this.battle.setEnergy(0,this.player)
                }else{
                    if(variants.mtg){
                        if(spec.includes(35)&&userCombatant.getStatus('Double Countdowns')>0){
                            this.battle.loseSpecificEnergy(round(effectiveCost/2),this.player,mtgManaColor)
                        }else{
                            this.battle.loseSpecificEnergy(effectiveCost,this.player,mtgManaColor)
                        }
                    }else{
                        if(spec.includes(35)&&userCombatant.getStatus('Double Countdowns')>0){
                            this.battle.loseEnergy(round(effectiveCost/2),this.player)
                        }else{
                            this.battle.loseEnergy(effectiveCost,this.player)
                        }
                    }
                }
            }
        }
        if(effectiveCost==0&&this.battle.modded(38)){
            userCombatant.life-=2
        }
        if(userCombatant.getStatus('No Amplify')<=0){
            if(userCombatant.getStatus('Free Amplify')>0){
                this.battle.attackManager.amplify=true
            }else if(userCombatant.getStatus('Single Free Amplify')>0){
                userCombatant.status.main[findList('Single Free Amplify',userCombatant.status.name)]--
                this.battle.attackManager.amplify=true
            }else if(this.battle.getEnergy(this.player)>=1&&spec.includes(27)){
                if(variants.mtg){
                    this.battle.loseSpecificEnergy(1,this.player,6)
                }else{
                    this.battle.loseEnergy(1,this.player)
                }
                this.battle.attackManager.amplify=true
                this.cards.forEach(card=>card.anotherAmplified())
                if(userCombatant.status.main[144]>0){
                    this.battle.overlayManager.overlays[7][this.player].active=true
                    this.battle.overlayManager.overlays[7][this.player].activate()
                }
            }
            if(this.battle.getEnergy(this.player)>=2&&spec.includes(28)){
                if(variants.mtg){
                    this.battle.loseSpecificEnergy(2,this.player,6)
                }else{
                    this.battle.loseEnergy(2,this.player)
                }
                this.battle.attackManager.amplify=true
                this.cards.forEach(card=>card.anotherAmplified())
                if(userCombatant.status.main[144]>0){
                    this.battle.overlayManager.overlays[7][this.player].active=true
                    this.battle.overlayManager.overlays[7][this.player].activate()
                }
            }
        }
    }
    callAmalgums(){
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].spec.includes(26)&&this.cards[a].usable){
                this.battle.attackManager.type=this.cards[a].attack
                this.battle.attackManager.effect=copyArray(this.cards[a].effect)
                this.battle.attackManager.attackClass=this.cards[a].class
                this.battle.attackManager.mtgManaColor=this.cards[a].mtgManaColor
                this.battle.attackManager.player=this.player

                this.battle.attackManager.user=this.battle.combatantManager.getPlayerCombatantIndex(this.player)
                this.battle.attackManager.energy=this.battle.getEnergy(this.player)+(this.battle.relicManager.hasRelic(121,this.player)?2:0)
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
                this.battle.attackManager.edition=-1
                this.battle.attackManager.drawn=-1
                this.battle.attackManager.cost=-1

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
                let anim=[this.anim[0],max(this.anim[1],this.anim[13],this.anim[26]),max(this.anim[2],this.anim[24]),this.anim[3],this.anim[4],this.anim[5],max(this.anim[6],this.anim[17]),this.anim[7],this.anim[8],this.anim[9],this.anim[10],this.anim[11],this.anim[12],this.anim[14],this.anim[15],this.anim[16],this.anim[18],this.anim[19],this.anim[20],this.anim[21],this.anim[22],this.anim[23],this.anim[25]]
                for(let a=0,la=this.cards.length;a<la;a++){
                    if(this.cards[a].size<=1){
                        this.cards[a].display()
                        this.cards[a].displayStatus(anim)
                    }
                }
                for(let a=0,la=this.cards.length;a<la;a++){
                    if(this.cards[a].size>1){
                        this.cards[a].display()
                        this.cards[a].displayStatus(anim)
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
                        if(this.lastSort!=0){
                            this.sort()
                        }
                        for(let a=0,la=this.sorted.length;a<la;a++){
                            let b=this.sorted[a]
                            this.cards[b].deSize=!(position>=args[1]*15&&position<args[1]*15+15)
                            this.cards[b].fade=1
                            this.cards[b].relIndex=position
                            this.cards[b].position.x=this.layer.width/2-200+position%5*100
                            this.cards[b].position.y=this.layer.height/2-130+floor(position/5)%3*130
                            this.cards[b].anim.afford=1
                            this.cards[b].display(this.id==0)
                            position++
                        }
                    break
                    case 2: case 3: case 4: case 5: case 8:
                        this.sortClass(args[0]==8?11:args[0]-1)
                        for(let a=0,la=this.sorted.length;a<la;a++){
                            for(let b=0,lb=this.cards.length;b<lb;b++){
                                if(this.cards[b].name==this.sorted[a]){
                                    this.cards[b].deSize=!(position>=args[1]*15&&position<args[1]*15+15)
                                    this.cards[b].fade=1
                                    this.cards[b].relIndex=position
                                    this.cards[b].position.x=this.layer.width/2-200+position%5*100
                                    this.cards[b].position.y=this.layer.height/2-130+floor(position/5)%3*130
                                    this.cards[b].anim.afford=1
                                    this.cards[b].display(this.id==0)
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
                            this.cards[a].display(this.id==0)
                        }
                    break
                    case 7:
                        for(let a=0,la=this.cards.length;a<la;a++){
                            this.cards[a].deSize=a>=args[1]
                            this.cards[a].fade=1
                            this.cards[a].position.x=this.layer.width/2-200+a%5*100
                            this.cards[a].position.y=this.layer.height/2-130+floor(a/5)%3*130
                            this.cards[a].anim.afford=1
                            this.cards[a].display(this.id==0)
                        }
                    break
                    default:
                        for(let a=0,la=this.cards.length;a<la;a++){
                            this.cards[a].deSize=!(a>=args[1]*15&&a<args[1]*15+15)
                            this.cards[a].fade=1
                            this.cards[a].position.x=this.layer.width/2-200+a%5*100
                            this.cards[a].position.y=this.layer.height/2-130+floor(a/5)%3*130
                            this.cards[a].anim.afford=1
                            this.cards[a].display(this.id==0)
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
                    this.cards[a].display()
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
                this.battle.attackManager.mtgManaColor=this.cards[a].mtgManaColor
                this.battle.attackManager.player=this.player
                this.battle.attackManager.relPos=[a,this.cards.length-1]
                this.battle.attackManager.limit=this.cards[a].limit
                this.battle.attackManager.id=this.cards[a].id
                this.battle.attackManager.edition=this.cards[a].edition
                this.battle.attackManager.drawn=this.cards[a].drawn
                this.battle.attackManager.cost=this.cards[a].cost
                if(this.cards[a].basic&&this.cards[a].class==1&&this.battle.relicManager.hasRelic(50,this.player)&&this.battle.attackManager.effect.length>0){
                    this.battle.attackManager.effect[0]+=2
                }
                let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                if((this.cards[a].name=='Shiv'||this.cards[a].name=='Broken\nShiv'||this.cards[a].name=='Deluxe\nShiv')&&userCombatant.status.main[76]>0){
                    this.battle.attackManager.effect[0]+=userCombatant.status.main[76]
                }
                if(this.cards[a].spec.includes(25)&&userCombatant.status.main[166]>0){
                    this.battle.attackManager.effect[0]+=userCombatant.status.main[166]
                }
                if(this.cards[a].spec.includes(54)&&userCombatant.status.main[340]>0){
                    this.battle.attackManager.effect[0]+=userCombatant.status.main[340]
                }
                if(this.cards[a].basic&&(this.cards[a].class==1||this.cards[a].class==2)&&userCombatant.status.main[402]>0){
                    this.battle.attackManager.effect[0]+=userCombatant.status.main[402]
                }
                if(this.cards[a].spec.includes(52)&&userCombatant.status.main[403]>0){
                    this.battle.attackManager.effect[0]+=userCombatant.status.main[403]
                }
                if(this.cards[a].name.includes('Cable')&&this.cards[a].class==1&&userCombatant.status.main[404]>0){
                    this.battle.attackManager.effect[0]+=userCombatant.status.main[404]
                }
                if(this.cards[a].rarity==0&&this.cards[a].class==1&&userCombatant.status.main[413]>0){
                    this.battle.attackManager.effect[0]+=userCombatant.status.main[413]
                }
                this.cards[a].usable=false
                if(this.cards[a].spec.includes(57)&&this.cards[a].attack!=1491&&options.oldDuplicate){
                    this.cards[a].spec.splice(this.cards[a].spec.indexOf(57))
                    this.copySelfInput(a)
                }else if((this.status[3]>0||this.status[25]>0&&this.cards[a].colorless()&&this.cards[a].rarity!=2)&&this.cards[a].attack!=1491&&options.oldDuplicate){
                    this.status[this.status[25]>0&&this.cards[a].colorless()&&this.cards[a].rarity!=2?25:3]--
                    this.copySelfInput(a)
                }
                if(this.cards[a].target[0]==0){
                    if(this.cards[a].spec.includes(57)&&this.cards[a].attack!=1491&&!(this.cards[a].limit<=1&&this.cards[a].spec.includes(15))&&!options.oldDuplicate){
                        this.cards[a].spec.splice(this.cards[a].spec.indexOf(57))
                        this.cards[a].usable=true
                    }else if((this.status[3]>0||this.status[25]>0&&this.cards[a].colorless()&&this.cards[a].rarity!=2)&&this.cards[a].attack!=1491&&!(this.cards[a].limit<=1&&this.cards[a].spec.includes(15))&&!options.oldDuplicate){
                        this.status[this.status[25]>0&&this.cards[a].colorless()&&this.cards[a].rarity!=2?25:3]--
                        this.cards[a].usable=true
                    }else if(userCombatant.getStatus('Double Play')>0){
                        userCombatant.status.main[findList('Double Play',userCombatant.status.name)]--
                        this.cards[a].usable=true
                    }else{
                        this.cards[a].deSize=true
                        if(
                            this.cards[a].class==4||
                            this.cards[a].class==2&&userCombatant.getStatus('Exhausting Defenses')>0||
                            this.cards[a].class==11&&userCombatant.getStatus('Exhausting Skills')>0||
                            this.cards[a].spec.includes(1)||
                            this.cards[a].spec.includes(55)||
                            (
                                this.cards[a].spec.includes(5)||
                                this.cards[a].spec.includes(41)
                            )&&this.battle.relicManager.hasRelic(11,this.player)
                        ){
                            this.cards[a].exhaust=true
                        }
                    }
                    if(this.battle.modded(108)&&floor(random(0,50))==0){
                        this.cards[a].exhaust=true
                        for(let b=0,lb=this.battle.cardManagers[this.player].deck.cards.length;b<lb;b++){
                            if(this.battle.cardManagers[this.player].deck.cards[b].id==this.cards[a].id){
                                this.battle.cardManagers[this.player].deck.cards[b].callVanishEffect()
                                this.battle.cardManagers[this.player].deck.cards.splice(b,1)
                                b--
                                lb--
                            }
                        }
                    }else if(this.cards[a].spec.includes(15)||this.cards[a].spec.includes(38)){
                        if(this.cards[a].spec.includes(15)){
                            this.cards[a].limit=round(this.cards[a].limit-1)
                        }else if(this.cards[a].spec.includes(38)){
                            this.cards[a].limit[0]=round(this.cards[a].limit[0]-1)
                        }
                        if(this.cards[a].limit<=0&&this.cards[a].spec.includes(15)||this.cards[a].limit[0]<=0&&this.cards[a].spec.includes(38)){
                            this.cards[a].vanish=true
                        }
                        for(let b=0,lb=this.battle.cardManagers[this.player].deck.cards.length;b<lb;b++){
                            if(this.battle.cardManagers[this.player].deck.cards[b].id==this.cards[a].id){
                                this.battle.cardManagers[this.player].deck.cards[b].limit--
                                if(this.battle.cardManagers[this.player].deck.cards[b].limit<=0&&this.battle.cardManagers[this.player].deck.cards[b].spec.includes(15)||this.battle.cardManagers[this.player].deck.cards[b].limit[0]<=0&&this.battle.cardManagers[this.player].deck.cards[b].spec.includes(38)){
                                    this.battle.cardManagers[this.player].deck.cards[b].callVanishEffect()
                                    this.battle.cardManagers[this.player].deck.cards.splice(b,1)
                                    b--
                                    lb--
                                }
                            }
                        }
                    }else if(this.cards[a].spec.includes(42)){
                        this.cards[a].limit=round(this.cards[a].limit-1)
                        if(this.cards[a].limit<=0){
                            this.cards[a].exhaust=true
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
                            if(this.battle.cardManagers[this.player].deck.cards[b].id==this.cards[a].id){
                                this.battle.cardManagers[this.player].deck.cards[b].callVanishEffect()
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
                    this.battle.cardManagers[this.player].greenDiff++
                    this.battle.playCard(this.cards[a],this.player,0)
                    this.cardInUse=this.cards[a]
                    this.callInput(5,0)
                    if(!this.cards[a].spec.includes(55)){
                        this.cost(this.cards[a].cost,this.cards[a].class,this.cards[a].spec,this.cards[a].target,this.cards[a].mtgManaColor,this.cards[a])
                    }
                    this.cards[a].played()
                    this.cards.forEach(card=>card.anotherPlayed(this.cards[a]))
                    this.cards.forEach(card=>card.anotherPlayedAfter())
                    if(!this.cards[a].discardEffect.includes(13)){
                        this.battle.attackManager.execute()
                    }
                    this.lastPlayed[0]=[this.cards[a].type,this.cards[a].level,this.cards[a].color]
                    this.lastPlayed[this.cards[a].class]=[this.cards[a].type,this.cards[a].level,this.cards[a].color]
                    if(variants.polar){
                        this.pole=1-this.pole
                    }
                }else{
                    this.battle.attackManager.targetInfo=copyArray(this.cards[a].target)
                    this.battle.attackManager.targetDistance=0
                    this.battle.attackManager.cost=this.cards[a].cost
                    this.cards[a].select=true
                    if(userCombatant.getStatus('Strike Range')>0&&this.cards[a].basic&&this.cards[a].class==1){
                        this.battle.attackManager.targetInfo[2]+=userCombatant.getStatus('Strike Range')
                    }
                    if(userCombatant.getStatus('Cable Range')>0&&this.cards[a].name.includes('Cable')&&this.cards[a].class==1){
                        this.battle.attackManager.targetInfo[2]+=userCombatant.getStatus('Cable Range')
                    }
                    if(userCombatant.getStatus('Mineral Range')>0&&this.cards[a].spec.includes(52)){
                        this.battle.attackManager.targetInfo[2]+=userCombatant.getStatus('Mineral Range')
                    }
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
                }else if(this.battle.attackManager.targetInfo[0]==12||this.battle.attackManager.targetInfo[0]==14||this.battle.attackManager.targetInfo[0]==47||this.battle.attackManager.targetInfo[0]==48){
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
                        if(this.cards[b].spec.includes(57)&&this.cards[b].attack!=1491&&!(this.cards[b].limit<=1&&this.cards[b].spec.includes(15))&&!options.oldDuplicate){
                            this.cards[b].spec.splice(this.cards[b].spec.indexOf(57))
                            this.cards[b].usable=true
                            this.cards[b].select=false
                        }else if((this.status[3]>0||this.status[25]>0&&this.cards[b].colorless()&&this.cards[b].rarity!=2)&&this.cards[b].attack!=1491&&!(this.cards[b].limit<=1&&this.cards[b].spec.includes(15))&&!options.oldDuplicate){
                            this.status[this.status[25]>0&&this.cards[b].colorless()&&this.cards[b].rarity!=2?25:3]--
                            this.cards[b].usable=true
                            this.cards[b].select=false
                        }else if(userCombatant.getStatus('Double Play')>0){
                            userCombatant.status.main[findList('Double Play',userCombatant.status.name)]--
                            this.cards[b].usable=true
                            this.cards[b].select=false
                        }else{
                            this.cards[b].deSize=true
                            if(
                                this.cards[b].class==4||this.cards[b].spec.includes(12)&&this.cards[b].class[this.battle.combatantManager.combatants[this.battle.attackManager.user].id==a?1:0]==4||
                                (this.cards[b].class==2||this.cards[b].spec.includes(12)&&this.cards[b].class[this.battle.combatantManager.combatants[this.battle.attackManager.user].id==a?1:0]==2)&&userCombatant.getStatus('Exhausting Defenses')>0||
                                (this.cards[b].class==11||this.cards[b].spec.includes(12)&&this.cards[b].class[this.battle.combatantManager.combatants[this.battle.attackManager.user].id==a?1:0]==11)&&userCombatant.getStatus('Skills')>0||
                                this.cards[b].spec.includes(1)||this.cards[b].spec.includes(12)&&this.cards[b].reality[this.battle.combatantManager.combatants[this.battle.attackManager.user].id==a?1:0].includes(1)||
                                (
                                    this.cards[b].spec.includes(5)||this.cards[b].spec.includes(12)&&this.cards[b].reality[this.battle.combatantManager.combatants[this.battle.attackManager.user].id==a?1:0].includes(5)||
                                    this.cards[b].spec.includes(41)||this.cards[b].spec.includes(12)&&this.cards[b].reality[this.battle.combatantManager.combatants[this.battle.attackManager.user].id==a?1:0].includes(41)
                                )&&this.battle.relicManager.hasRelic(11,this.player)
                            ){
                                this.cards[b].exhaust=true
                            }
                        }
                        if(this.battle.modded(108)&&floor(random(0,50))==0){
                            this.cards[b].exhaust=true
                            for(let c=0,lc=this.battle.cardManagers[this.player].deck.cards.length;c<lc;c++){
                                if(this.battle.cardManagers[this.player].deck.cards[c].id==this.cards[b].id){
                                    this.battle.cardManagers[this.player].deck.cards.splice(c,1)
                                    c--
                                    lc--
                                }
                            }
                        }else if(this.cards[b].spec.includes(15)||this.cards[b].spec.includes(38)){
                            if(this.cards[b].spec.includes(15)){
                                this.cards[b].limit=round(this.cards[b].limit-1)
                            }else if(this.cards[b].spec.includes(38)){
                                this.cards[b].limit[0]=round(this.cards[b].limit[0]-1)
                            }
                            for(let c=0,lc=this.battle.cardManagers[this.player].deck.cards.length;c<lc;c++){
                                if(this.battle.cardManagers[this.player].deck.cards[c].id==this.cards[b].id){
                                    this.battle.cardManagers[this.player].deck.cards[c].limit--
                                }
                            }
                            if(this.cards[b].limit<=0&&this.cards[b].spec.includes(15)||this.cards[b].limit[0]<=0&&this.cards[b].spec.includes(38)){
                                this.cards[b].exhaust=true
                            }
                            for(let c=0,lc=this.battle.cardManagers[this.player].deck.cards.length;c<lc;c++){
                                if(this.battle.cardManagers[this.player].deck.cards[c].id==this.cards[b].id){
                                    this.battle.cardManagers[this.player].deck.cards[c].limit--
                                }
                                if(this.battle.cardManagers[this.player].deck.cards[c].limit<=0&&this.battle.cardManagers[this.player].deck.cards[c].spec.includes(15)||this.battle.cardManagers[this.player].deck.cards[c].limit[0]<=0&&this.battle.cardManagers[this.player].deck.cards[c].spec.includes(38)){
                                    this.battle.cardManagers[this.player].deck.cards.splice(c,1)
                                    this.battle.cardManagers[this.player].deck.cards[c].callVanishEffect()
                                    c--
                                    lc--
                                }
                            }
                        }else if(this.cards[b].spec.includes(42)){
                            this.cards[b].limit=round(this.cards[b].limit-1)
                            if(this.cards[b].limit<=0){
                                this.cards[b].exhaust=true
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
                                    this.battle.cardManagers[this.player].deck.cards[c].callVanishEffect()
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
                                        this.battle.cardManagers[this.player].deck.cards[c].callVanishEffect()
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
                        this.battle.cardManagers[this.player].greenDiff++
                        if(this.spec.includes(12)&&(this.cards[b].target[0]==11||this.cards[b].target[0]==15)){
                            let characteristic=1
                            this.battle.attackManager.type=this.battle.attackManager.type[characteristic]
                            this.battle.attackManager.effect=this.battle.attackManager.effect[characteristic]
                            this.battle.attackManager.attackClass=this.battle.attackManager.attackClass[characteristic]
                            this.cards[b].characteristic=characteristic
                        }
                        this.battle.playCard(this.cards[b],this.player,this.battle.combatantManager.combatants[this.battle.attackManager.user].id==a?1:0)
                        this.cards[b].played()
                        this.cards.forEach(card=>card.anotherPlayed(this.cards[b]))
                        this.cardInUse=this.cards[b]
                        if(variants.polar){
                            this.pole=1-this.pole
                        }
                    }
                }
                if(!this.spec.includes(55)){
                    this.cost(this.battle.attackManager.cost,this.battle.attackManager.attackClass,this.spec,this.target,this.battle.attackManager.mtgManaColor,this.cardInUse)
                }
                this.cards.forEach(card=>card.anotherPlayedAfter())
                if(!this.cardInUse.discardEffect.includes(13)){
                    this.battle.attackManager.execute()
                }
                this.battle.updateTargetting()
                for(let b=0,lb=this.cards.length;b<lb;b++){
                    if(!this.cards[b].usable){
                        this.lastPlayed[0]=[this.cards[b].type,this.cards[b].level,this.cards[b].color]
                        this.lastPlayed[this.cards[b].class]=[this.cards[b].type,this.cards[b].level,this.cards[b].color]
                    }
                }
            break
            case 3:
                if(this.battle.combatantManager.combatants[a].id!=this.battle.combatantManager.combatants[this.battle.attackManager.user].id){
                    this.battle.combatantManager.combatants[this.battle.attackManager.user].goal.anim.direction=round(atan2(this.battle.combatantManager.combatants[a].relativePosition.x-this.battle.attackManager.relativePosition.x,this.battle.combatantManager.combatants[a].relativePosition.y-this.battle.attackManager.relativePosition.y)/60-1/2)*60+30
                }
                if(!((this.battle.combatantManager.combatants[a].spec.includes(9)||this.battle.modded(86)&&this.battle.turn.total<=2)&&(abs(this.battle.combatantManager.combatants[a].goal.anim.direction+180-this.battle.combatantManager.combatants[this.battle.attackManager.user].goal.anim.direction)<30||abs(this.battle.combatantManager.combatants[a].goal.anim.direction-180-this.battle.combatantManager.combatants[this.battle.attackManager.user].goal.anim.direction)<30))){
                    if(this.battle.attackManager.targetInfo[0]==13||this.battle.attackManager.targetInfo[0]==27||this.battle.attackManager.targetInfo[0]==37||this.battle.attackManager.targetInfo[0]==38||this.battle.attackManager.targetInfo[0]==39||this.battle.attackManager.targetInfo[0]==41||this.battle.attackManager.targetInfo[0]==42||this.battle.attackManager.targetInfo[0]==43){
                        this.battle.attackManager.targetDistance=max(distTargetDiagonalCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager),distTargetCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager))
                    }else if(this.battle.attackManager.targetInfo[0]==12||this.battle.attackManager.targetInfo[0]==14||this.battle.attackManager.targetInfo[0]==47||this.battle.attackManager.targetInfo[0]==48){
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
                            if(this.cards[b].spec.includes(57)&&this.cards[b].attack!=1491&&!(this.cards[b].limit<=1&&this.cards[b].spec.includes(15))&&!options.oldDuplicate){
                                this.cards[b].spec.splice(this.cards[b].spec.indexOf(57))
                                this.cards[b].usable=true
                                this.cards[b].select=false
                            }else if((this.status[3]>0||this.status[25]>0&&this.cards[b].colorless()&&this.cards[b].rarity!=2)&&this.cards[b].attack!=1491&&!options.oldDuplicate){
                                this.status[this.status[25]>0&&this.cards[b].colorless()&&this.cards[b].rarity!=2?25:3]--
                                this.cards[b].usable=true
                                this.cards[b].select=false
                            }else if(userCombatant.getStatus('Double Play')>0){
                                userCombatant.status.main[findList('Double Play',userCombatant.status.name)]--
                                this.cards[b].usable=true
                                this.cards[b].select=false
                            }else{
                                this.cards[b].deSize=true
                                if(
                                    this.cards[b].class==4||this.cards[b].spec.includes(12)&&this.cards[b].class[this.battle.combatantManager.combatants[this.battle.attackManager.user].id==a?1:0]==4||
                                    (this.cards[b].class==2||this.cards[b].spec.includes(12)&&this.cards[b].class[this.battle.combatantManager.combatants[this.battle.attackManager.user].id==a?1:0]==2)&&userCombatant.getStatus('Exhausting Defenses')>0||
                                    (this.cards[b].class==11||this.cards[b].spec.includes(12)&&this.cards[b].class[this.battle.combatantManager.combatants[this.battle.attackManager.user].id==a?1:0]==11)&&userCombatant.getStatus('Exhausting Skills')>0||
                                    this.cards[b].spec.includes(1)||this.cards[b].spec.includes(12)&&this.cards[b].reality[this.battle.combatantManager.combatants[this.battle.attackManager.user].id==a?1:0].includes(1)||
                                    (
                                        this.cards[b].spec.includes(5)||this.cards[b].spec.includes(12)&&this.cards[b].reality[this.battle.combatantManager.combatants[this.battle.attackManager.user].id==a?1:0].includes(5)||
                                        this.cards[b].spec.includes(41)||this.cards[b].spec.includes(12)&&this.cards[b].reality[this.battle.combatantManager.combatants[this.battle.attackManager.user].id==a?1:0].includes(41)
                                    )&&this.battle.relicManager.hasRelic(11,this.player)
                                ){
                                    this.cards[b].exhaust=true
                                }
                            }
                            if(this.battle.modded(108)&&floor(random(0,50))==0){
                                this.cards[b].exhaust=true
                                for(let c=0,lc=this.battle.cardManagers[this.player].deck.cards.length;c<lc;c++){
                                    if(this.battle.cardManagers[this.player].deck.cards[c].id==this.cards[b].id){
                                        this.battle.cardManagers[this.player].deck.cards.splice(c,1)
                                        this.battle.cardManagers[this.player].deck.cards[c].callVanishEffect()
                                        c--
                                        lc--
                                    }
                                }
                            }else if(this.cards[b].spec.includes(15)||this.cards[b].spec.includes(38)){
                                if(this.cards[b].spec.includes(15)){
                                    this.cards[b].limit=round(this.cards[b].limit-1)
                                }else if(this.cards[b].spec.includes(38)){
                                    this.cards[b].limit[0]=round(this.cards[b].limit[0]-1)
                                }
                                if(this.cards[b].limit<=0&&this.cards[b].spec.includes(15)||this.cards[b].limit[0]<=0&&this.cards[b].spec.includes(38)){
                                    this.cards[b].exhaust=true
                                }
                                for(let c=0,lc=this.battle.cardManagers[this.player].deck.cards.length;c<lc;c++){
                                    if(this.battle.cardManagers[this.player].deck.cards[c].id==this.cards[b].id){
                                        this.battle.cardManagers[this.player].deck.cards[c].limit--
                                    }
                                    if(this.battle.cardManagers[this.player].deck.cards[c].limit<=0&&this.battle.cardManagers[this.player].deck.cards[c].spec.includes(15)||this.battle.cardManagers[this.player].deck.cards[c].limit[0]<=0&&this.battle.cardManagers[this.player].deck.cards[c].spec.includes(38)){
                                        this.battle.cardManagers[this.player].deck.cards.splice(c,1)
                                        this.battle.cardManagers[this.player].deck.cards[c].callVanishEffect()
                                        c--
                                        lc--
                                    }
                                }
                            }else if(this.cards[b].spec.includes(42)){
                                this.cards[b].limit=round(this.cards[b].limit-1)
                                if(this.cards[b].limit<=0){
                                    this.cards[b].exhaust=true
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
                                        this.battle.cardManagers[this.player].deck.cards[c].callVanishEffect()
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
                                            this.battle.cardManagers[this.player].deck.cards[c].callVanishEffect()
                                            c--
                                            lc--
                                        }
                                    }
                                    this.add(findName('Worthless\nBaseball Card',types.card),this.cards[b].level,this.cards[b].color)
                                    this.battle.cardManagers[this.player].deck.add(findName('Card\nSleeve',types.card),this.cards[b].level,this.cards[b].color)
                                    this.battle.cardManagers[this.player].deck.add(findName('Worthless\nBaseball Card',types.card),this.cards[b].level,this.cards[b].color)
                                }
                            }
                            this.battle.cardManagers[this.player].greenDiff++
                            if(this.spec.includes(12)){
                                let characteristic=this.battle.combatantManager.combatants[this.battle.attackManager.user].id==a?1:0
                                this.battle.attackManager.type=this.battle.attackManager.type[characteristic]
                                this.battle.attackManager.effect=this.battle.attackManager.effect[characteristic]
                                this.battle.attackManager.attackClass=this.battle.attackManager.attackClass[characteristic]
                                this.cards[b].characteristic=characteristic
                            }
                            this.battle.playCard(this.cards[b],this.player,this.battle.combatantManager.combatants[this.battle.attackManager.user].id==a?1:0)
                            this.cards[b].played()
                            this.cards.forEach(card=>card.anotherPlayed(this.cards[b]))
                            this.cardInUse=this.cards[b]
                            if(variants.polar){
                                this.pole=1-this.pole
                            }
                        }
                    }
                    if(!this.spec.includes(55)){
                        this.cost(this.battle.attackManager.cost,this.battle.attackManager.attackClass,this.spec,this.target,this.battle.attackManager.mtgManaColor,this.cardInUse)
                    }
                    this.cards.forEach(card=>card.anotherPlayedAfter())
                    if(!this.cardInUse.discardEffect.includes(13)){
                        this.battle.attackManager.execute()
                    }
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
                if(this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Discard Block')>0){
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Discard Block'))
                }
                for(let b=0,lb=this.cards.length;b<lb;b++){
                    this.cards[b].otherDiscard()
                }
                if(this.status[0]>0){
                    this.status[0]--
                }
            break
            case 5:
                this.battle.attackManager.user=this.battle.combatantManager.getPlayerCombatantIndex(this.player)
                this.battle.attackManager.energy=this.battle.getEnergy(this.player)+(this.battle.relicManager.hasRelic(121,this.player)?2:0)
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
                this.battle.attackManager.mtgManaColor=0
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
                    if(this.status[1]>0){
                        this.status[1]--
                    }
                }
            break
            case 9:
                this.cards[a].deSize=true
                this.cards[a].discardEffect.push(1)
                if(this.status[2]>0){
                    this.status[2]--
                }
            break
            case 10:
                for(let b=0,lb=this.status[4];b<lb;b++){
                    this.battle.cardManagers[this.player].reserve.cards.push(copyCardFree(this.cards[a]))
                }
                if(this.status[4]>0){
                    this.status[4]=0
                }
            break
            case 11:
                this.cards[a].deSize=true
                this.cards[a].discardEffect.push(0)
                if(this.status[6]>0){
                    this.status[6]--
                }
            break
            case 12:
                this.cards[a].deSize=true
                this.cards[a].discardEffect.push(4)
                if(this.status[7]>0){
                    this.status[7]--
                }
            break
            case 13:
                this.cards[a].deSize=true
                this.cards[a].discardEffect.push(6)
                if(this.status[8]>0){
                    this.status[8]--
                }
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].activateRewind()
            break
            case 14:
                this.cards[a].retain2=true
                if(this.status[9]>0){
                    this.status[9]--
                }
            break
            case 15:
                this.cards[a].deSize=true
                this.cards[a].callSpecDiscardEffect()
                if(this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Discard Block')>0){
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Discard Block'))
                }
                for(let b=0,lb=this.cards.length;b<lb;b++){
                    this.cards[b].otherDiscard()
                }
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.status[10])
            break
            case 16:
                this.cards[a].cost=0
                this.cards[a].base.cost=0
                if(this.status[11]>0){
                    this.status[11]--
                }
            break
            case 17:
                if(this.cards[a].attack!=-3){
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.status[12]*max(0,this.cards[a].cost))
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                    if(this.status[12]>0){
                        this.status[12]=0
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
                    if(this.status[13]>0){
                        this.status[13]--
                    }
                }
            break
            case 19:
                this.cards[a].retain=true
                if(this.status[14]>0){
                    this.status[14]--
                }
            break
            case 20:
                if(this.cards[a].attack!=-3){
                    this.battle.combatantManager.randomEnemyEffect(0,[this.status[15]*max(0,this.cards[a].cost)])
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                    if(this.status[15]>0){
                        this.status[15]=0
                    }
                }
            break
            case 21:
                if(this.cards[a].attack!=-3){
                    this.battle.addEnergy(max(0,this.cards[a].cost),this.player)
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                    if(this.status[16]>0){
                        this.status[16]--
                    }
                }
            break
            case 22:
                this.cards[a].deSize=true
                this.cards[a].discardEffect.push(2)
                if(this.status[17]>0){
                    this.status[17]--
                }
            break
            case 23:
                this.cards[a].deSize=true
                this.cards[a].discardEffect.push(7)
                if(this.status[18]>0){
                    this.status[18]--
                }
            break
            case 24:
                this.cards[a].deSize=true
                this.cards[a].callSpecDiscardEffect()
                if(this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Discard Block')>0){
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Discard Block'))
                }
                for(let b=0,lb=this.cards.length;b<lb;b++){
                    this.cards[b].otherDiscard()
                }
                this.cards[a].cost=0
                this.cards[a].base.cost=0
                if(this.status[19]>0){
                    this.status[19]--
                }
            break
            case 25:
                if(this.cards[a].cost>0){
                    this.cards[a].cost--
                }
                if(this.status[20]>0){
                    this.status[20]--
                }
            break
            case 26:
                if(this.cards[a].cost>=0){
                    this.cards[a].cost++
                }
                if(this.status[21]>0){
                    this.status[21]--
                }
            break
            case 27:
                this.cards[a].deSize=true
                this.cards[a].callSpecDiscardEffect()
                if(this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Discard Block')>0){
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Discard Block'))
                }
                for(let b=0,lb=this.cards.length;b<lb;b++){
                    this.cards[b].otherDiscard()
                }
                this.cards[a].discardEffectBuffered.push(1)
                if(this.status[22]>0){
                    this.status[22]--
                }
            break
            case 28:
                this.cards[a].deSize=true
                this.cards[a].discardEffect.push(11)
                if(this.status[23]>0){
                    this.status[23]--
                }
            break
            case 29:
                this.cards[a].deSize=true
                this.cards[a].discardEffect.push(12)
                if(this.status[24]>0){
                    this.status[24]--
                }
            break
            case 30:
                if(this.cards[a].attack!=-3){
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                    if(this.status[26]>0){
                        this.status[26]--
                    }
                    this.battle.cardManagers[this.player].drawAbstract(1,0,0,[this.cards[a].class])
                }
            break
        }
    }
    generalExhaust(a){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(this.cards[a].spec.includes(56)){
            if(userCombatant.getStatus('Exhaust Draw')>0){
                this.battle.cardManagers[this.player].draw(userCombatant.getStatus('Exhaust Draw'))
            }
            this.exhausts++
            if(userCombatant.getStatus('2 Exhaust Draw')>0&&this.exhausts%2==0){
                this.battle.cardManagers[this.player].draw(userCombatant.getStatus('2 Exhaust Draw'))
            }
            this.battle.relicManager.activate(10,[this.player])
            if(variants.witch&&this.cards[a].spec.includes(31)){
                this.battle.cardManagers[this.player].draw(1)
            }
            this.cards[a].callExhaustEffect()
            this.cards.splice(a,1)
            delete this.cards[a]
        }else if(userCombatant.getStatus('Double Exhaust')>0&&this.cards[a].attack!=1287){
            userCombatant.status.main[findList('Double Exhaust',userCombatant.status.name)]--
            this.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1,7)
            a--
            la--
            this.battle.cardManagers[this.player].reserve.copySelfInput(this.battle.cardManagers[this.player].reserve.cards.length-1)
        }else if(userCombatant.getStatus('Cancel Exhaust')>0&&this.cards[a].attack!=56&&this.cards[a].attack!=180){
            userCombatant.status.main[findList('Cancel Exhaust',userCombatant.status.name)]--
            this.send(this.battle.cardManagers[this.player].discard.cards,a,a+1,7)
            a--
            la--
        }else{
            if(userCombatant.getStatus('Exhaust Draw')>0){
                this.battle.cardManagers[this.player].draw(userCombatant.getStatus('Exhaust Draw'))
            }
            this.exhausts++
            if(userCombatant.getStatus('2 Exhaust Draw')>0&&this.exhausts%2==0){
                this.battle.cardManagers[this.player].draw(userCombatant.getStatus('2 Exhaust Draw'))
            }
            this.battle.relicManager.activate(10,[this.player])
            if(variants.witch&&this.cards[a].spec.includes(31)){
                this.battle.cardManagers[this.player].draw(1)
            }
            this.cards[a].callExhaustEffect()
            this.send(this.battle.cardManagers[this.player].exhaust.cards,a,a+1)
        }
    }
    update(scene,args){
        switch(scene){
            case 'battle':
                for(let a=0,la=this.anim.length;a<la;a++){
                    this.anim[a]=smoothAnim(this.anim[a],this.status[a]!=0,0,1,5)
                }
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
                            )*this.compact
                    )
                    cap+=length
                    for(let b=0,lb=variants.speedmove?2:1;b<lb;b++){
                        this.cards[a].update(1,'hand',this.battle.relicManager.hasRelic(170,this.player))
                        this.cards[a].upSize=pointInsideBox({position:inputs.rel},this.cards[a])&&!this.battle.overlayManager.anyActive&&!selected
                        if(this.cards[a].position.x>cap&&(this.cards[a].position.x>this.cards[max(0,a-1)].position.x+length||a==0||this.cards.swapped)){
                            this.cards[a].position.x=max(this.cards[a].position.x-25*this.compact,cap)
                            if(this.cards[a].position.x==cap&&this.cards[a].swapped){
                                this.cards[a].swapped=false
                            }
                        }else{
                            if(this.cards[a].deSizeDrop){
                                this.cards[a].deSizeDrop=false
                                this.cards[a].deSize=true
                            }
                            if(this.cards[a].position.x<cap){
                                this.cards[a].position.x=min(this.cards[a].position.x+25*this.compact,cap)
                            }
                        }
                        if(this.cards.length>0&&abs((this.cards.length-1)/2-a)<=0.5&&(this.cards[a].attack==1034||this.cards[a].attack==1037)){
                            this.cards[a].cost=0
                        }
                    }
                    if(this.cards[a].size<=0){
                        if(this.cards[a].vanish){
                            delete this.cards[a]
                            this.cards.splice(a,1)
                            a--
                            la--
                        }else if(this.cards[a].discardEffect.length>0){
                            this.cards[a].deSize=false
                            if(this.cards[a].discardEffect.includes(0)){
                                let hold=this.cards[a].discardEffect
                                this.cards[a]=upgradeCard(this.cards[a],true)
                                this.cards[a].discardEffect=hold
                                this.cards[a].discardEffect.splice(this.cards[a].discardEffect.indexOf(0),1)
                                for(let b=0,lb=5;b<lb;b++){
                                    if(this.cards[a].discardEffect.includes(0)){
                                        let hold=this.cards[a].discardEffect
                                        this.cards[a]=upgradeCard(this.cards[a],true)
                                        this.cards[a].discardEffect=hold
                                        this.cards[a].discardEffect.splice(this.cards[a].discardEffect.indexOf(0),1)
                                    }else{
                                        b=lb
                                    }
                                }
                            }else if(this.cards[a].discardEffect.includes(9)){
                                this.cards[a].edition=5
                                this.cards[a].discardEffect.splice(this.cards[a].discardEffect.indexOf(9),1)
                            }else if(this.cards[a].discardEffect.includes(13)){
                                this.cards[a].spec.push(55)
                                this.cards[a].usable=true
                                this.cards[a].cost=0
                                this.cards[a].discardEffect.splice(this.cards[a].discardEffect.indexOf(13),1)
                            }
                            if(this.cards[a].discardEffect.includes(2)){
                                let hold=this.cards[a].discardEffect
                                this.cards[a]=unupgradeCard(this.cards[a],true)
                                this.cards[a].discardEffect=hold
                                this.cards[a].discardEffect.splice(this.cards[a].discardEffect.indexOf(2),1)
                            }
                            if(this.cards[a].discardEffect.includes(4)){
                                let hold=this.cards[a].discardEffect
                                this.cards[a]=this.battle.cardManagers[this.player].transformCard(this.cards[a])
                                this.cards[a].discardEffect=hold
                                this.cards[a].discardEffect.splice(this.cards[a].discardEffect.indexOf(4),1)
                            }else if(this.cards[a].discardEffect.includes(10)){
                                let hold=this.cards[a].discardEffect
                                this.cards[a]=this.battle.cardManagers[this.player].transformCard(this.cards[a])
                                this.cards[a].cost=0
                                this.cards[a].discardEffect=hold
                                this.cards[a].discardEffect.splice(this.cards[a].discardEffect.indexOf(4),1)
                            }
                            if(this.cards[a].discardEffect.includes(1)){
                                this.cards[a].discardEffect=[]
                                this.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1,11)
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
                            }else if(this.cards[a].discardEffect.includes(6)){
                                this.cards[a].discardEffect=[]
                                this.rewinds++
                                this.turnRewinds++
                                let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                                if(userCombatant.getStatus('3 Rewind Draw')>0&&this.rewinds%3==0){
                                    this.battle.cardManagers[this.player].draw(userCombatant.getStatus('3 Rewind Draw'))
                                }
                                if(userCombatant.getStatus('2 Rewind Draw')>0&&this.rewinds%2==0){
                                    this.battle.cardManagers[this.player].draw(userCombatant.getStatus('2 Rewind Draw'))
                                }
                                if(userCombatant.getStatus('Rewind Block')>0){
                                    userCombatant.addBlock(userCombatant.getStatus('Rewind Block'))
                                }
                                if(this.cards[a].callRewindEffect()){
                                    this.generalExhaust(a)
                                }else{
                                    this.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1,15)
                                }
                                a--
                                la--
                            }else if(this.cards[a].discardEffect.includes(7)){
                                this.cards[a].discardEffect=[]
                                this.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1,11)
                                this.battle.cardManagers[this.player].reserve.cards[0].retain2=true
                                a--
                                la--
                            }else if(this.cards[a].discardEffect.includes(8)){
                                this.cards[a].discardEffect=[]
                                this.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1,15)
                                a--
                                la--
                            }else if(this.cards[a].discardEffect.includes(11)){
                                this.cards[a].cost=0
                                this.cards[a].discardEffect=[]
                                this.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1,11)
                                a--
                                la--
                            }else if(this.cards[a].discardEffect.includes(12)){
                                this.cards[a].discardEffect=[]
                                this.rewinds++
                                this.turnRewinds++
                                let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                                if(userCombatant.getStatus('3 Rewind Draw')>0&&this.rewinds%3==0){
                                    this.battle.cardManagers[this.player].draw(userCombatant.getStatus('3 Rewind Draw'))
                                }
                                if(userCombatant.getStatus('2 Rewind Draw')>0&&this.rewinds%2==0){
                                    this.battle.cardManagers[this.player].draw(userCombatant.getStatus('2 Rewind Draw'))
                                }
                                if(userCombatant.getStatus('Rewind Block')>0){
                                    userCombatant.addBlock(userCombatant.getStatus('Rewind Block'))
                                }
                                if(this.cards[a].callRewindEffect()){
                                    this.generalExhaust(a)
                                }else{
                                    this.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1,11)
                                }
                                a--
                                la--
                            }else{
                                this.cards[a].discardEffect=[]
                            }
                        }else if((
                            this.cards[a].attack==1031||this.cards[a].attack.length==2&&this.cards[a].attack[0]==1189||this.cards[a].attack==1739||this.cards[a].attack==1770||
                            this.cards[a].attack==1778||this.cards[a].attack==1893||this.cards[a].attack==2053||
                            this.cards[a].attack==3371&&!this.cards[a].usable||
                            this.cards[a].spec.includes(12)&&this.cards[a].attack[this.cards[a].characteristic]==1366
                        )&&!this.cards[a].exhaust){
                            this.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1)
                            a--
                            la--
                        }else if((
                            this.cards[a].attack==1248||this.cards[a].attack==1333||this.cards[a].attack==1348||this.cards[a].attack==1384||this.cards[a].attack==1401||
                            this.cards[a].attack==1405||this.cards[a].attack==1443||this.cards[a].attack==1444||this.cards[a].attack==1455||this.cards[a].attack==1485||
                            this.cards[a].attack==1504||this.cards[a].attack==1616||this.cards[a].attack==1622||this.cards[a].attack==1623||this.cards[a].attack==1625||
                            this.cards[a].attack==1626||this.cards[a].attack==1627||this.cards[a].attack==1628||this.cards[a].attack==1630||this.cards[a].attack==1635||
                            this.cards[a].attack==1649||this.cards[a].attack==1650||this.cards[a].attack==1654||this.cards[a].attack==1655||this.cards[a].attack==1740||
                            this.cards[a].attack==1753||this.cards[a].attack==1777||this.cards[a].attack==1788||this.cards[a].attack==1806||this.cards[a].attack==1821||
                            this.cards[a].attack==1852||this.cards[a].attack==1856||this.cards[a].attack==1857||this.cards[a].attack==1868||this.cards[a].attack==1909||
                            this.cards[a].attack==1813||this.cards[a].attack==1921||this.cards[a].attack==1944||this.cards[a].attack==2470||this.cards[a].attack==2489||
                            this.cards[a].attack==3196||
                            (this.cards[a].attack==587||this.cards[a].attack==676)&&this.battle.combatantManager.constructAlive(this.player+1)&&!options.oldUnbuild||
                            this.cards[a].attack==1642&&this.battle.attackManager.energy==4||
                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Hook')>0&&this.cards[a].cost>0&&this.battle.turn.main==this.player
                        )&&!this.cards[a].exhaust){
                            this.send(this.cards,a,a+1,2)
                            a--
                            la--
                        }else if(this.cards[a].exhaust){
                            this.generalExhaust(a)
                            a--
                            la--
                        }else if(this.status[5]>0){
                            this.cards[a].discardEffect=[]
                            this.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1)
                            a--
                            la--
                            this.status[5]--
                        }else{
                            if(this.cards[a].discardEffectBuffered.includes(0)||this.battle.relicManager.hasRelic(195,this.player)&&!this.cards[a].usable&&floor(random(0,4))==0){
                                this.cards[a]=upgradeCard(this.cards[a])
                                this.cards[a].usable=false
                                if(this.cards[a].discardEffectBuffered.includes(0)){
                                    this.cards[a].discardEffectBuffered.splice(this.cards[a].discardEffectBuffered.indexOf(0))
                                }
                            }
                            if(this.battle.modded(160)&&!this.cards[a].usable){
                                this.cards[a]=unupgradeCard(this.cards[a])
                                this.cards[a].usable=false
                            }
                            if(this.cards[a].usable){
                                this.battle.cardManagers[this.player].greenDiff--
                            }
                            let triplet=false
                            if(this.cards[a].discardEffectBuffered.includes(1)){
                                triplet=true
                                this.cards[a].discardEffectBuffered.splice(this.cards[a].discardEffectBuffered.indexOf(1))
                            }
                            this.send(this.battle.cardManagers[this.player].discard.cards,a,a+1,7)
                            if(triplet){
                                this.battle.cardManagers[this.player].discard.copySelf(this.battle.cardManagers[this.player].discard.cards.length-1)
                                this.battle.cardManagers[this.player].discard.copySelf(this.battle.cardManagers[this.player].discard.cards.length-1)
                            }
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
        if(this.battle.attackManager.targetInfo[0]==1||this.battle.attackManager.targetInfo[0]==3||this.battle.attackManager.targetInfo[0]==4||this.battle.attackManager.targetInfo[0]==6||this.battle.attackManager.targetInfo[0]==11||this.battle.attackManager.targetInfo[0]==13||this.battle.attackManager.targetInfo[0]==15||this.battle.attackManager.targetInfo[0]==27||this.battle.attackManager.targetInfo[0]==31||this.battle.attackManager.targetInfo[0]==32){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==2||this.battle.attackManager.targetInfo[0]==3||this.battle.attackManager.targetInfo[0]==5||this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==11||this.battle.attackManager.targetInfo[0]==22||this.battle.attackManager.targetInfo[0]==26||this.battle.attackManager.targetInfo[0]==30||this.battle.attackManager.targetInfo[0]==40||this.battle.attackManager.targetInfo[0]==45||this.battle.attackManager.targetInfo[0]==52||this.battle.attackManager.targetInfo[0]==53){
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].life>0&&(this.battle.combatantManager.combatants[a].team!=this.battle.combatantManager.combatants[this.battle.attackManager.user].team||this.battle.attackManager.targetInfo[0]==45)&&
                    (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5||this.battle.attackManager.targetInfo[0]==45)&&
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
                    legalTargetCombatant(0,1,this.battle.getEnergy(this.battle.attackManager.player)+this.battle.attackManager.targetInfo[1]+(this.battle.relicManager.hasRelic(121,this.battle.attackManager.player)?2:0),this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)&&
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
        if(this.battle.attackManager.targetInfo[0]==12||this.battle.attackManager.targetInfo[0]==13||this.battle.attackManager.targetInfo[0]==47){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetDiagonalCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    !(this.battle.attackManager.targetInfo[0]==47&&this.battle.tileManager.tiles[a].tilePosition.y-this.battle.tileManager.tiles[a].tilePosition.x*2!=this.battle.attackManager.tilePosition.y-this.battle.attackManager.tilePosition.x*2)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==14||this.battle.attackManager.targetInfo[0]==15||this.battle.attackManager.targetInfo[0]==48||this.battle.attackManager.targetInfo[0]==52||this.battle.attackManager.targetInfo[0]==53){
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team!=this.battle.combatantManager.combatants[this.battle.attackManager.user].team&&
                    (legalTargetDiagonalCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5)&&
                    !(this.battle.attackManager.targetInfo[0]==48&&this.battle.combatantManager.combatants[a].tilePosition.y-this.battle.combatantManager.combatants[a].tilePosition.x*2!=this.battle.attackManager.tilePosition.y-this.battle.attackManager.tilePosition.x*2)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<game.targetRadius){
                    this.callInput(3,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==16){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    this.battle.tileManager.getTileIndex(this.battle.tileManager.tiles[a].tilePosition.x+(this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x)/max(abs(this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x),abs(this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y)),this.battle.tileManager.tiles[a].tilePosition.y+(this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y)/max(abs(this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x),abs(this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y)))<0&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==17){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    this.battle.tileManager.tiles[a].tilePosition.y==this.battle.attackManager.tilePosition.y&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==18){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
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
        if(this.battle.attackManager.targetInfo[0]==23||this.battle.attackManager.targetInfo[0]==49||this.battle.attackManager.targetInfo[0]==50){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if((this.battle.tileManager.tiles[a].type.includes(19)||this.battle.attackManager.targetInfo[0]==50)&&(this.battle.tileManager.tiles[a].occupied==0||this.battle.attackManager.targetInfo[0]==23||this.battle.attackManager.targetInfo[0]==50&&!this.battle.tileManager.tiles[a].type.includes(19))&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==24){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    (this.battle.tileManager.tiles[a].tilePosition.y!=this.battle.attackManager.tilePosition.y||this.battle.tileManager.tiles[a].tilePosition.x<this.battle.attackManager.tilePosition.x)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==25){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    (this.battle.tileManager.tiles[a].tilePosition.y!=this.battle.attackManager.tilePosition.y||this.battle.tileManager.tiles[a].tilePosition.x>this.battle.attackManager.tilePosition.x)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==27){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetDiagonalCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[3],this.battle.attackManager.targetInfo[4],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
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
                    (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<game.targetRadius){
                    this.callInput(3,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==30||this.battle.attackManager.targetInfo[0]==32||this.battle.attackManager.targetInfo[0]==40||this.battle.attackManager.targetInfo[0]==53){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[3],this.battle.attackManager.targetInfo[4],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    (this.battle.tileManager.tiles[a].type.includes(3)||this.battle.attackManager.targetInfo[0]!=32)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==33){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    this.battle.tileManager.tiles[a].tilePosition.y>=this.battle.attackManager.tilePosition.y&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==34){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    this.battle.tileManager.tiles[a].tilePosition.y<=this.battle.attackManager.tilePosition.y&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==35||this.battle.attackManager.targetInfo[0]==36){
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].life>0&&
                    (legalTargetCombatant(0,this.battle.attackManager.targetInfo[2],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[3],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==36)&&
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
                    (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles))||
                    (legalTargetCombatant(0,this.battle.attackManager.targetInfo[3],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[4],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)&&this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].ammo>0))&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<game.targetRadius){
                    this.callInput(3,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==51){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    legalTargetCombatant(0,1,this.battle.turn.total+this.battle.attackManager.targetInfo[1]+(this.battle.relicManager.hasRelic(121,this.battle.attackManager.player)?2:0),this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<game.targetRadius){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==54){
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].life>0&&(this.battle.combatantManager.combatants[a].team!=this.battle.combatantManager.combatants[this.battle.attackManager.user].team)&&
                    (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5||this.battle.attackManager.targetInfo[0]==45)&&
                    this.battle.tileManager.getTileIndex(
                        this.battle.combatantManager.combatants[a].tilePosition.x+transformDirection(0,targetDirectionCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager)-60)[0],
                        this.battle.combatantManager.combatants[a].tilePosition.y+transformDirection(0,targetDirectionCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager)-60)[1]
                    )>=0&&
                    this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(
                        this.battle.combatantManager.combatants[a].tilePosition.x+transformDirection(0,targetDirectionCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager)-60)[0],
                        this.battle.combatantManager.combatants[a].tilePosition.y+transformDirection(0,targetDirectionCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager)-60)[1]
                    )].occupied==0&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<game.targetRadius
                ){
                    this.callInput(3,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==55){
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].life>0&&(this.battle.combatantManager.combatants[a].team!=this.battle.combatantManager.combatants[this.battle.attackManager.user].team)&&
                    (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5||this.battle.attackManager.targetInfo[0]==45)&&
                    this.battle.tileManager.getTileIndex(
                        this.battle.combatantManager.combatants[a].tilePosition.x+transformDirection(0,targetDirectionCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager)+60)[0],
                        this.battle.combatantManager.combatants[a].tilePosition.y+transformDirection(0,targetDirectionCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager)+60)[1]
                    )>=0&&
                    this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(
                        this.battle.combatantManager.combatants[a].tilePosition.x+transformDirection(0,targetDirectionCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager)+60)[0],
                        this.battle.combatantManager.combatants[a].tilePosition.y+transformDirection(0,targetDirectionCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager)+60)[1]
                    )].occupied==0&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<game.targetRadius
                ){
                    this.callInput(3,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==0){
            switch(scene){
                case 'battle':
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},this.cards[a])&&!this.cards[a].deSizeDrop&&!(variants.polar&&this.pole!=this.cards[a].pole)){
                            if(this.cards[a].spec.includes(48)){
                                this.cards[a].spec.splice(this.cards[a].spec.indexOf(48))
                                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Freeze',1)
                            }else if(this.cards[a].spec.includes(39)){
                                this.cards[a].spec.splice(this.cards[a].spec.indexOf(39))
                                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Burn',1)
                            }else{
                                for(let b=0,lb=this.listInput.length;b<lb;b++){
                                    if(this.status[this.listInput[b][0]]!=0){
                                        this.callInput(this.listInput[b][1],a)
                                        a=la
                                        b=lb
                                    }
                                }
                                if(a!=la&&this.cards[a].usable&&this.battle.attackManager.attacks.length<=0&&this.cards[a].playable()){
                                    if(this.cards[a].afford){
                                        this.callInput(0,a)
                                        break
                                    }else if(this.cards[a].spec.includes(35)&&(variants.mtg&&this.battle.getSpecificEnergy(this.player,this.cards[a].mtgManaColor)>0||!variants.mtg&&this.battle.getEnergy(this.player)>0)&&this.cards[a].cost>0){
                                        let cost=this.cards[a].cost
                                        if(variants.mtg){
                                            if(this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Double Countdowns')>0){
                                                this.cards[a].cost=max(0,this.cards[a].cost-this.battle.getSpecificEnergy(this.player,this.cards[a].mtgManaColor)*2)
                                                this.battle.loseSpecificEnergy(min(this.battle.getEnergy(this.player),round(cost/2)),this.player,this.cards[a].mtgManaColor)
                                            }else{
                                                this.cards[a].cost=max(0,this.cards[a].cost-this.battle.getSpecificEnergy(this.player,this.cards[a].mtgManaColor))
                                                this.battle.loseSpecificEnergy(min(this.battle.getEnergy(this.player),round(cost)),this.player,this.cards[a].mtgManaColor)
                                            }
                                        }else{
                                            if(this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Double Countdowns')>0){
                                                this.cards[a].cost=max(0,this.cards[a].cost-this.battle.getEnergy(this.player)*2)
                                                this.battle.loseEnergy(min(this.battle.getEnergy(this.player),round(cost/2)),this.player)
                                            }else{
                                                this.cards[a].cost=max(0,this.cards[a].cost-this.battle.getEnergy(this.player))
                                                this.battle.loseEnergy(min(this.battle.getEnergy(this.player),round(cost)),this.player)
                                            }
                                        }
                                        this.cards[a].onIncrementCountdown()
                                    }else if(!this.cards[a].energyAfford){
                                        this.battle.anim.upAfford=true
                                    }
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
        if(this.battle.attackManager.targetInfo[0]==1||this.battle.attackManager.targetInfo[0]==3||this.battle.attackManager.targetInfo[0]==4||this.battle.attackManager.targetInfo[0]==6||this.battle.attackManager.targetInfo[0]==11||this.battle.attackManager.targetInfo[0]==13||this.battle.attackManager.targetInfo[0]==15||this.battle.attackManager.targetInfo[0]==27||this.battle.attackManager.targetInfo[0]==31||this.battle.attackManager.targetInfo[0]==32){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==2||this.battle.attackManager.targetInfo[0]==3||this.battle.attackManager.targetInfo[0]==5||this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==11||this.battle.attackManager.targetInfo[0]==22||this.battle.attackManager.targetInfo[0]==26||this.battle.attackManager.targetInfo[0]==30||this.battle.attackManager.targetInfo[0]==40||this.battle.attackManager.targetInfo[0]==45||this.battle.attackManager.targetInfo[0]==52||this.battle.attackManager.targetInfo[0]==53){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&key==' '){
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.battle.combatantManager.combatants[a].life>0&&(this.battle.combatantManager.combatants[a].team!=this.battle.combatantManager.combatants[this.battle.attackManager.user].team||this.battle.attackManager.targetInfo[0]==45)&&
                        (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5||this.battle.attackManager.targetInfo[0]==45)&&
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
                if(this.battle.tileManager.tiles[a].occupied==0&&legalTargetCombatant(0,1,this.battle.getEnergy(this.battle.attackManager.player)+this.battle.attackManager.targetInfo[1]+(this.battle.relicManager.hasRelic(121,this.battle.attackManager.player)?2:0),this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)){
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
        if(this.battle.attackManager.targetInfo[0]==12||this.battle.attackManager.targetInfo[0]==13||this.battle.attackManager.targetInfo[0]==47){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    !(this.battle.attackManager.targetInfo[0]==47&&this.battle.tileManager.tiles[a].tilePosition.y-this.battle.tileManager.tiles[a].tilePosition.x*2!=this.battle.attackManager.tilePosition.y-this.battle.attackManager.tilePosition.x*2)&&
                    (legalTargetDiagonalCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==14||this.battle.attackManager.targetInfo[0]==15||this.battle.attackManager.targetInfo[0]==48||this.battle.attackManager.targetInfo[0]==52||this.battle.attackManager.targetInfo[0]==53){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&key==' '){
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team!=this.battle.combatantManager.combatants[this.battle.attackManager.user].team&&
                        (legalTargetDiagonalCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5)&&
                        !(this.battle.attackManager.targetInfo[0]==48&&this.battle.combatantManager.combatants[a].tilePosition.y-this.battle.combatantManager.combatants[a].tilePosition.x*2!=this.battle.attackManager.tilePosition.y-this.battle.attackManager.tilePosition.x*2)&&
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
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    this.battle.tileManager.getTileIndex(this.battle.tileManager.tiles[a].tilePosition.x+(this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x)/max(abs(this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x),abs(this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y)),this.battle.tileManager.tiles[a].tilePosition.y+(this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y)/max(abs(this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x),abs(this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y)))<0){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==17){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&this.battle.tileManager.tiles[a].tilePosition.y==this.battle.attackManager.tilePosition.y&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==18){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    this.battle.tileManager.tiles[a].type.includes(3)&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
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
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==25){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&(this.battle.tileManager.tiles[a].tilePosition.y!=this.battle.attackManager.tilePosition.y||this.battle.tileManager.tiles[a].tilePosition.x>this.battle.attackManager.tilePosition.x)&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==27){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetDiagonalCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[3],this.battle.attackManager.targetInfo[4],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
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
                        (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5)&&
                        this.battle.combatantManager.combatants[a].tilePosition.x==int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x&&this.battle.combatantManager.combatants[a].tilePosition.y==int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y){
                        this.callInput(3,a)
                    }
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==30||this.battle.attackManager.targetInfo[0]==32||this.battle.attackManager.targetInfo[0]==40||this.battle.attackManager.targetInfo[0]==53){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (this.battle.tileManager.tiles[a].type.includes(3)||this.battle.attackManager.targetInfo[0]!=32)&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[3],this.battle.attackManager.targetInfo[4],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==33){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&this.battle.tileManager.tiles[a].tilePosition.y>=this.battle.attackManager.tilePosition.y&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==34){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&this.battle.tileManager.tiles[a].tilePosition.y<=this.battle.attackManager.tilePosition.y&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==35||this.battle.attackManager.targetInfo[0]==36){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&key==' '){
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.battle.combatantManager.combatants[a].life>0&&
                        (legalTargetCombatant(0,this.battle.attackManager.targetInfo[2],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[3],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==36)&&
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
                        (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles))||
                        (legalTargetCombatant(0,this.battle.attackManager.targetInfo[3],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[4],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)&&this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].ammo>0))&&
                        this.battle.combatantManager.combatants[a].tilePosition.x==int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x&&this.battle.combatantManager.combatants[a].tilePosition.y==int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y){
                        this.callInput(3,a)
                    }
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==51){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&legalTargetCombatant(0,1,this.battle.turn.total+this.battle.attackManager.targetInfo[1]+(this.battle.relicManager.hasRelic(121,this.battle.attackManager.player)?2:0),this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)){
                    this.callInput(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==54){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&key==' '){
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.battle.combatantManager.combatants[a].life>0&&(this.battle.combatantManager.combatants[a].team!=this.battle.combatantManager.combatants[this.battle.attackManager.user].team)&&
                        (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5||this.battle.attackManager.targetInfo[0]==45)&&
                        this.battle.tileManager.getTileIndex(
                            this.battle.combatantManager.combatants[a].tilePosition.x+transformDirection(0,targetDirectionCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager)-60)[0],
                            this.battle.combatantManager.combatants[a].tilePosition.y+transformDirection(0,targetDirectionCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager)-60)[1]
                        )>=0&&
                        this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(
                            this.battle.combatantManager.combatants[a].tilePosition.x+transformDirection(0,targetDirectionCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager)-60)[0],
                            this.battle.combatantManager.combatants[a].tilePosition.y+transformDirection(0,targetDirectionCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager)-60)[1]
                        )].occupied==0&&
                        this.battle.combatantManager.combatants[a].tilePosition.x==int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x&&this.battle.combatantManager.combatants[a].tilePosition.y==int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y
                    ){
                        this.callInput(3,a)
                    }
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==55){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&key==' '){
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.battle.combatantManager.combatants[a].life>0&&(this.battle.combatantManager.combatants[a].team!=this.battle.combatantManager.combatants[this.battle.attackManager.user].team)&&
                        (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5||this.battle.attackManager.targetInfo[0]==45)&&
                        this.battle.tileManager.getTileIndex(
                            this.battle.combatantManager.combatants[a].tilePosition.x+transformDirection(0,targetDirectionCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager)+60)[0],
                            this.battle.combatantManager.combatants[a].tilePosition.y+transformDirection(0,targetDirectionCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager)+60)[1]
                        )>=0&&
                        this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(
                            this.battle.combatantManager.combatants[a].tilePosition.x+transformDirection(0,targetDirectionCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager)+60)[0],
                            this.battle.combatantManager.combatants[a].tilePosition.y+transformDirection(0,targetDirectionCombatant(0,this.battle.combatantManager.combatants[a],this.battle.attackManager)+60)[1]
                        )].occupied==0&&
                        this.battle.combatantManager.combatants[a].tilePosition.x==int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x&&this.battle.combatantManager.combatants[a].tilePosition.y==int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y
                    ){
                        this.callInput(3,a)
                    }
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==0){
            switch(scene){
                case 'battle':
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if((int(key)+9)%10==a&&!this.cards[a].deSizeDrop&&!(variants.polar&&this.pole!=this.cards[a].pole)){
                            if(this.cards[a].spec.includes(48)){
                                this.cards[a].spec.splice(this.cards[a].spec.indexOf(48))
                                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Freeze',1)
                            }else if(this.cards[a].spec.includes(39)){
                                this.cards[a].spec.splice(this.cards[a].spec.indexOf(39))
                                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Burn',1)
                            }else{
                                for(let b=0,lb=this.listInput.length;b<lb;b++){
                                    if(this.status[this.listInput[b][0]]!=0){
                                        this.callInput(this.listInput[b][1],a)
                                        a=la
                                        b=lb
                                    }
                                }
                                if(a!=la&&this.cards[a].usable&&this.battle.attackManager.attacks.length<=0&&this.cards[a].playable()){
                                    if(this.cards[a].afford){
                                        this.callInput(0,a)
                                        break
                                    }else if(this.cards[a].spec.includes(35)&&(variants.mtg&&this.battle.getSpecificEnergy(this.player,this.cards[a].mtgManaColor)>0||!variants.mtg&&this.battle.getEnergy(this.player)>0)&&this.cards[a].cost>0){
                                        let cost=this.cards[a].cost
                                        if(variants.mtg){
                                            if(this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Double Countdowns')>0){
                                                this.cards[a].cost=max(0,this.cards[a].cost-this.battle.getSpecificEnergy(this.player,this.cards[a].mtgManaColor)*2)
                                                this.battle.loseSpecificEnergy(min(this.battle.getEnergy(this.player),round(cost/2)),this.player,this.cards[a].mtgManaColor)
                                            }else{
                                                this.cards[a].cost=max(0,this.cards[a].cost-this.battle.getSpecificEnergy(this.player,this.cards[a].mtgManaColor))
                                                this.battle.loseSpecificEnergy(min(this.battle.getEnergy(this.player),round(cost)),this.player,this.cards[a].mtgManaColor)
                                            }
                                        }else{
                                            if(this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Double Countdowns')>0){
                                                this.cards[a].cost=max(0,this.cards[a].cost-this.battle.getEnergy(this.player)*2)
                                                this.battle.loseEnergy(min(this.battle.getEnergy(this.player),round(cost/2)),this.player)
                                            }else{
                                                this.cards[a].cost=max(0,this.cards[a].cost-this.battle.getEnergy(this.player))
                                                this.battle.loseEnergy(min(this.battle.getEnergy(this.player),round(cost)),this.player)
                                            }
                                        }
                                        this.cards[a].onIncrementCountdown()
                                    }else{
                                        this.battle.anim.upAfford=true
                                    }
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
                this.battle.updateTargetting()
            }
        }
    }
}