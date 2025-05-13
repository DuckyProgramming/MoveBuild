class group{
    constructor(layer,battle,player,id){
        this.layer=layer
        this.battle=battle
        this.player=player
        this.id=id
        this.cards=[]
        this.sorted=[]
        this.drawEffects=[]
        this.target=[]
        this.lastDuplicate=[]
        this.tempCard=new card(this.layer,this.battle,this.player,0,0,0,0,0,0,variants.mtg?[]:0,[])
        this.lastPlayed=elementArray(this.tempCard,14)
        this.totalPlayed=[0,0,0,0,0,0,0,0,0,0,0,0]
        this.turnPlayed=[0,0,0,0,0,0,0,0,0,0,0,0]
        this.lastTurnPlayed=[0,0,0,0,0,0,0,0,0,0,0,0]
        this.turnPlayedEdition=[0,0,0,0,0,0,0,0,0]
        this.lastTurnPlayedEdition=[0,0,0,0,0,0,0,0,0]
        this.compact=1
        this.cardInUse=0
        this.cardSelectIndex=0
        this.cardShuffledIndex=0
        this.sendResultCancel=false
        this.pole=0
        this.exhausts=0
        this.rewinds=0
        this.turnExhausts=0
        this.turnRewinds=0
        this.lastMouseOver=-1
        this.lastSort=-1
        this.basicChange=[0,0]
        this.addEffect=[]
        this.costDownListing=[]
        this.finalPosition=0
        this.sendAmounts=[]
        this.listKey=50
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
            [27,31],
            [28,32],
            [29,35],
            [30,36],
            [31,37],
            [33,38],
            [34,39],
            [35,40],
            [36,41],
            [37,43],
            [38,44],
            [39,48],
            [40,49],
            [41,50],
            [42,51],
            [43,52],
            [44,53],
            [45,54],
            [46,55],
            [47,56],
            [48,57],
            [49,58],
        ]

        this.reset()
        this.cancel()
    }
    save(){
        let composite={
            cards:[],
        }
        this.cards.forEach(card=>composite.cards.push(card.save()))
        return composite
    }
    load(composite){
        this.cards=[]
        composite.cards.forEach(base=>this.cards.push(new card(
            this.layer,this.battle,base.player,base.position.x,base.position.y,
            findName(base.name,types.card),base.level,base.color,base.id,base.cost,
            base.additionalSpec,base.name,base.list,base.effect,base.attack,
            base.target,base.spec,base.cardClass,base.limit,undefined,
            false,base.colorful,base.edition,base.base.cost,base.drawn,
            base.fuel,base.edited.cost,base.edited.costComplete,base.nonCalc,base.costDownTrigger,
            base.costUpTrigger,base.baseCostDownTrigger,base.baseCostUpTrigger,base.debut,base.evolve
        )))
    }
    initialCards(type,player){
        let level=variants.cursed?1:0
        let activeList=variants.mtg?types.deck.mtg:types.deck.start
        switch(type){
            case -1:
                for(let a=0,la=6;a<la;a++){
                    let type=findName('-h Marker',types.card)+1+a
                    this.addInitialBypass(type,level,types.card[type].list>=0?types.card[type].list:0)
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
                    for(let a=0,la=activeList[game.ascend>=20?1:0].length;a<la;a++){
                        this.add(findName(activeList[game.ascend>=20?1:0][a][0],types.card),activeList[game.ascend>=20?1:0][a][1]+level,activeList[game.ascend>=20?1:0][a][2]==-2?types.card[findName(activeList[game.ascend>=20?1:0][a][0],types.card)].list:activeList[game.ascend>=20?1:0][a][2]==-1?(variants.mtg?0:player):activeList[game.ascend>=20?1:0][a][2])
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
                    {type:1,value:[0,1,0]},
                    {type:1,value:[0,1,0]},
                ]])
                for(let a=0,la=activeList[game.ascend>=20?5:4].length;a<la;a++){
                    this.addInitial(findName(activeList[game.ascend>=20?5:4][a][0],types.card),activeList[game.ascend>=20?5:4][a][1]+level,activeList[game.ascend>=20?5:4][a][2]==-2?types.card[findName(activeList[game.ascend>=20?5:4][a][0],types.card)].list:activeList[game.ascend>=20?5:4][a][2]==-1?player:activeList[game.ascend>=20?5:4][a][2])
                }
            break
            case 2:
                for(let a=0,la=activeList[game.ascend>=20?3:2].length;a<la;a++){
                    this.addInitial(findName(activeList[game.ascend>=20?3:2][a][0],types.card),activeList[game.ascend>=20?3:2][a][1]+level,activeList[game.ascend>=20?3:2][a][2]==-2?types.card[findName(activeList[game.ascend>=20?3:2][a][0],types.card)].list:activeList[game.ascend>=20?3:2][a][2]==-1?player:activeList[game.ascend>=20?3:2][a][2])
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
                for(let a=0,la=activeList[game.ascend>=20?1:0].length;a<la;a++){
                    this.add(findName(activeList[game.ascend>=20?1:0][a][0],types.card),activeList[game.ascend>=20?1:0][a][1]+level,activeList[game.ascend>=20?1:0][a][2]==-2?types.card[findName(activeList[game.ascend>=20?1:0][a][0],types.card)].list:activeList[game.ascend>=20?1:0][a][2]==-1?(variants.mtg?0:player):activeList[game.ascend>=20?1:0][a][2])
                }
                let special=this.battle.cardManagers[this.player].listing.card[player][3][floor(random(0,this.battle.cardManagers[this.player].listing.card[player][3].length))]
                for(let a=0,la=5;a<la;a++){
                    this.addInitial(special,level,player)
                }
            break
            case 100:
                for(let a=0,la=this.battle.cardManagers[this.player].listing.card[player][3].length;a<la;a++){
                    this.addInitial(this.battle.cardManagers[this.player].listing.card[player][3][a],level,player)
                }
            break
            case 101:
                for(let a=0,la=this.battle.cardManagers[this.player].listing.allPlayerCard[3].length;a<la;a++){
                    this.addInitial(this.battle.cardManagers[this.player].listing.allPlayerCard[3][a],level,types.card[this.battle.cardManagers[this.player].listing.allPlayerCard[3][a]].list)
                }
            break
            case 102:
                for(let a=0,la=this.battle.cardManagers[this.player].listing.card[player][2].length;a<la;a++){
                    this.addInitial(this.battle.cardManagers[this.player].listing.card[player][2][a],level,player)
                }
            break
            case 103:
                for(let a=0,la=this.battle.cardManagers[this.player].listing.allPlayerCard[2].length;a<la;a++){
                    this.addInitial(this.battle.cardManagers[this.player].listing.allPlayerCard[2][a],level,types.card[this.battle.cardManagers[this.player].listing.allPlayerCard[2][a]].list)
                }
            break
            case 104:
                for(let a=0,la=this.battle.cardManagers[this.player].listing.card[0][3].length;a<la;a++){
                    this.addInitial(this.battle.cardManagers[this.player].listing.card[0][3][a],level,0)
                }
            break
        }
        if(game.ascend>=10){
            this.add(findName(`Ascender's\nBane`,types.card),0,constants.playerNumber+2)
        }
        if(game.ascend>=25){
            this.add(findName('Pride',types.card),0,constants.playerNumber+2)
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
            this.add(this.battle.cardManagers[this.player].listing.card[constants.playerNumber+3][3][this.battle.cardManagers[this.player].listing.card[constants.playerNumber+3][3].length-1-a],0,constants.playerNumber+3)
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
                this.sendAmounts=[]
                this.anim=elementArray(0,this.listKey)
                this.lastTurnPlayed=copyArray(this.turnPlayed)
                this.turnPlayed=[0,0,0,0,0,0,0,0,0,0,0,0]
                this.lastTurnPlayedEdition=copyArray(this.turnPlayedEdition)
                this.turnPlayedEdition=[0,0,0,0,0,0,0,0,0,0,0,0]
                this.turnExhausts=0
                this.turnRewinds=0
                this.lastMouseOver=-1
            break
        }
    }
    clear(){
        this.lastPlayed=elementArray(this.tempCard,14)
        this.totalPlayed=[0,0,0,0,0,0,0,0,0,0,0,0]
        this.lastTurnPlayed=[0,0,0,0,0,0,0,0,0,0,0,0]
        this.lastTurnPlayedEdition=[0,0,0,0,0,0,0,0,0,0,0,0]
        this.pole=1
        this.exhausts=0
        this.rewinds=0
        this.sendAmounts=[]
        this.cancel()
    }
    cancel(){
        this.status=elementArray(0,this.listKey)
        this.statusMarker=[0,0,0]
    }
    added(){
        this.cards[this.cards.length-1].callAddEffect()
        this.cards.forEach(card=>card.callAnotherAddEffect())
        if(this.cards[this.cards.length-1].name.includes('War')>0){
            this.battle.cardManagers[this.player].trueAllGroupEffectArgs(65,[7554])
        }
    }
    subAdded(){
        this.cards[this.cards.length-1].callSubAddEffect()
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
            this.cards.push(new card(this.layer,this.battle,this.player,1200,500,type,level,variants.mtg?(types.card[type].mtg!=undefined?types.card[type].mtg.color:[0]):color,game.id))
            if(this.id==0){
                this.cards[this.cards.length-1].nonCalc=true
                this.added()
            }else{
                this.subAdded()
            }
        }
    }
    addInitialBypass(type,level,color){
        game.id++
        this.cards.push(new card(this.layer,this.battle,this.player,1200,500,type,level,variants.mtg?(types.card[type].mtg!=undefined?types.card[type].mtg.color:[0]):color,game.id))
        if(this.id==0){
            this.cards[this.cards.length-1].nonCalc=true
            this.added()
        }else{
            this.subAdded()
        }
    }
    add(type,level,color,edition=0){
        if(type<0||type>=types.card.length){
            type=0
        }
        let name=types.card[type].name
        let change=false
        if(variants.junk){
            switch(name){
                case 'Strike': case 'Defend': case 'Step': case 'Bash': case 'Shield':
                case 'Strike-': case 'Defend-': case 'Step-L': case 'Step-R': case 'Bash-': case 'Shield-':
                    name+='_'
                    change=true
                break
            }
        }
        if(change){
            type=findName(name,types.card)
        }
        this.battle.collectionManager.activate(types.card[type].name)
        game.id++
        this.lastSort=-1
        if(type>=0&&type<types.card.length){
            if(this.battle.initialized&&types.card[type].list==constants.playerNumber+2&&this.battle.relicManager.hasRelic(66,this.player)){
                this.battle.relicManager.active[66][this.player+1]--
                if(this.battle.relicManager.active[66][this.player+1]<=0){
                    this.battle.relicManager.deactivate(66,this.player)
                }
            }else{
                let effectiveColor=variants.mtg?(types.card[type].mtg!=undefined?types.card[type].mtg.color:[0]):color
                this.cards.push(new card(this.layer,this.battle,this.player,1200,500,type,this.selfLevel(type,level),effectiveColor,game.id))
                this.cards[this.cards.length-1].edition=edition
                if(this.id==0){
                    this.cards[this.cards.length-1].nonCalc=true
                    this.added()
                }else{
                    this.subAdded()
                }
                for(let a=0,la=this.addEffect.length;a<la;a++){
                    switch(this.addEffect[a][0]){
                        case 0:
                            this.cards[this.cards.length-1].edition=this.addEffect[a][1]
                        break
                    }
                    this.addEffect.splice(a,1)
                    a--
                    la--
                }
                if(this.id>=1&&this.id<=3&&this.cards[this.cards.length-1].spec.includes(70)&&this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Shiv Range Up')>0){
                    this.cards[this.cards.length-1].target[2]+=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Shiv Range Up')
                }
                if(this.battle.initialized&&this.id==0){
                    if(
                        this.cards[this.cards.length-1].level==0&&(
                        this.cards[this.cards.length-1].class==1&&this.battle.relicManager.hasRelic(12,this.player)||
                        this.cards[this.cards.length-1].class==2&&this.battle.relicManager.hasRelic(13,this.player)||
                        this.cards[this.cards.length-1].class==3&&this.battle.relicManager.hasRelic(14,this.player)||
                        this.cards[this.cards.length-1].class==4&&this.battle.relicManager.hasRelic(15,this.player)||
                        this.cards[this.cards.length-1].class==11&&this.battle.relicManager.hasRelic(311,this.player)||
                        this.cards[this.cards.length-1].rarity==0&&this.battle.relicManager.hasRelic(487,this.player)||
                        this.cards[this.cards.length-1].rarity==1&&this.battle.relicManager.hasRelic(488,this.player)||
                        this.cards[this.cards.length-1].rarity==2&&this.battle.relicManager.hasRelic(489,this.player)||
                        this.cards[this.cards.length-1].color!=this.battle.player[this.player]&&this.battle.relicManager.hasRelic(491,this.player)
                    )){
                        this.cards[this.cards.length-1]=upgradeCard(this.cards[this.cards.length-1])
                        this.generalUpgrade(this.cards[this.cards.length-1])
                    }
                    this.battle.relicManager.activate(5,[this.player])
                    if(types.card[type].rarity>=0||types.card[type].list>=0){
                        this.battle.stats.card[this.player]++
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
        }else{
            this.subAdded()
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
                        this.cards[this.cards.length-1].setCost(0,[0])
                    break
                    case 1:
                        this.cards[this.cards.length-1].setCost(2,[0])
                    break
                    case 2:
                        this.cards[this.cards.length-1].costDown(2,[1])
                    break
                    case 3:
                        this.cards[this.cards.length-1].costUp(2,[1])
                    break
                    case 4:
                        for(let a=0,la=args[ticker].length;a<la;a++){
                            this.cards[this.cards.length-1].spec.push(args[ticker][a])
                            this.cards[this.cards.length-1].additionalSpec.push(args[ticker][a])
                        }
                        ticker++
                    break
                    case 5:
                        this.selfShuffle()
                    break
                    case 6:
                        this.cards[this.cards.length-1].effect[args[ticker++]]=args[ticker++]
                    break
                    case 7:
                        this.cards[this.cards.length-1].effect[args[ticker++]]+=args[ticker++]
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
                    case 11:
                        for(let a=0,la=args[ticker].length;a<la;a++){
                            this.cards[this.cards.length-1].additionalSpec.push(args[ticker][a])
                        }
                        ticker++
                    break
                    case 12:
                        this.cards[this.cards.length-1].costVariant(args[ticker++])
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
    }
    slideTop(){
        this.cards.splice(0,0,this.cards[this.cards.length-1])
        this.cards.splice(this.cards.length-1,1)
    }
    slideSpecific(index){
        this.cards.splice(0,0,this.cards[index])
        this.cards.splice(index+1,1)
    }
    slideSpecificOver(index){
        this.cards.splice(this.cards.length,0,this.cards[index])
        this.cards.splice(index,1)
    }
    slideSpecificTop(index){
        this.cards.splice(index,0,this.cards[this.cards.length-1])
        this.cards.splice(this.cards.length-1,1)
    }
    resetAnim(){
        this.lastSort=-1
        for(let a=0,la=this.cards.length;a<la;a++){
            this.cards[a].size=0
            this.cards[a].deSize=true
            this.cards[a].select=false
            this.cards[a].anim.select=0
        }
        this.generalSelfStatus()
    }
    discard(amount){
        this.status[0]+=amount
        this.generalSelfStatus()
    }
    exhaust(amount){
        this.status[1]+=amount
        this.generalSelfStatus()
    }
    exhaustAny(){
        this.status[1]=-1
        this.generalSelfStatus()
    }
    reserve(amount){
        this.status[2]+=amount
        this.generalSelfStatus()
    }
    duplicate(amount){
        this.status[3]+=amount
        this.generalSelfStatus()
    }
    nightmare(amount){
        this.status[4]+=amount
        this.generalSelfStatus()
    }
    rebound(amount){
        this.status[5]+=amount
        this.generalSelfStatus()
    }
    upgrade(amount){
        this.status[6]+=amount
        this.generalSelfStatus()
    }
    transform(amount){
        this.status[7]+=amount
        this.generalSelfStatus()
    }
    rewind(amount){
        this.status[8]+=amount
        this.generalSelfStatus()
    }
    rewindAny(){
        this.status[8]=-1
        this.generalSelfStatus()
    }
    retain2(amount){
        this.status[9]+=amount
        this.generalSelfStatus()
    }
    discardBlock(amount){
        this.status[10]+=amount
        this.generalSelfStatus()
    }
    free2(amount){
        this.status[11]+=amount
        this.generalSelfStatus()
    }
    exhaustBlock(amount){
        this.status[12]+=amount
        this.generalSelfStatus()
    }
    exhaustSlot(amount){
        this.status[13]+=amount
        this.generalSelfStatus()
    }
    retain(amount){
        this.status[14]+=amount
        this.generalSelfStatus()
    }
    exhaustDamage(amount){
        this.status[15]+=amount
        this.generalSelfStatus()
    }
    exhaustEnergy(amount){
        this.status[16]+=amount
        this.generalSelfStatus()
    }
    unupgrade(amount){
        this.status[17]+=amount
        this.generalSelfStatus()
    }
    reserveRetain(amount){
        this.status[18]+=amount
        this.generalSelfStatus()
    }
    discardFree(amount){
        this.status[19]+=amount
        this.generalSelfStatus()
    }
    costDown(amount){
        this.status[20]+=amount
        this.generalSelfStatus()
    }
    costUp(amount){
        this.status[21]+=amount
        this.generalSelfStatus()
    }
    discardTriple(amount){
        this.status[22]+=amount
        this.generalSelfStatus()
    }
    reserveFree(amount){
        this.status[23]+=amount
        this.generalSelfStatus()
    }
    rewindTop(amount){
        this.status[24]+=amount
        this.generalSelfStatus()
    }
    duplicateNonRareColorless(amount){
        this.status[25]+=amount
        this.generalSelfStatus()
    }
    exhaustDrawSame(amount){
        this.status[26]+=amount
        this.generalSelfStatus()
    }
    discardViable(amount){
        this.status[27]+=amount
        this.generalSelfStatus()
    }
    exhaustViable(amount){
        this.status[28]+=amount
        this.generalSelfStatus()
    }
    exhaustViableAny(){
        this.status[28]=-1
        this.generalSelfStatus()
    }
    exhaustHeal(amount){
        this.status[29]+=amount
        this.generalSelfStatus()
    }
    exhaustDrawKey(amount){
        this.status[30]+=amount
        this.generalSelfStatus()
    }
    exhaustEachEnergy(amount){
        this.status[31]+=amount
        this.generalSelfStatus()
    }
    duplicateAttack(amount){
        this.status[32]+=amount
        this.generalSelfStatus()
    }
    duplicateSelect(amount){
        this.status[33]+=amount
        this.generalSelfStatus()
    }
    exhaustEachEnergyMtg(amount){
        this.status[34]+=amount
        this.generalSelfStatus()
    }
    exhaustChooseSame(amount){
        this.status[35]+=amount
        this.generalSelfStatus()
    }
    exhaustChooseSameLevel(amount){
        this.status[36]+=amount
        this.generalSelfStatus()
    }
    judge(amount){
        this.status[37]+=amount
        this.generalSelfStatus()
    }
    exhaustAdd(amount){
        this.status[38]=amount
        this.generalSelfStatus()
    }
    retain2Fuel(amount,value){
        this.status[39]=amount
        this.statusMarker[1]=value
        this.generalSelfStatus()
    }
    duplicateSelectFree(amount){
        this.status[40]+=amount
        this.generalSelfStatus()
    }
    diffract(amount){
        this.status[41]+=amount
        this.generalSelfStatus()
    }
    exhaustStrength(amount){
        this.status[42]+=amount
        this.generalSelfStatus()
    }
    discardValid(amount){
        this.status[43]+=amount
        this.generalSelfStatus()
    }
    exhaustCurseDraw(amount,marker){
        this.status[44]+=amount
        this.statusMarker[0]=marker
        this.generalSelfStatus()
    }
    copyIntoExhaust(amount){
        this.status[45]+=amount
        this.generalSelfStatus()
    }
    transformFree(amount){
        this.status[46]+=amount
        this.generalSelfStatus()
    }
    confuse(amount){
        this.status[47]+=amount
        this.generalSelfStatus()
    }
    retain2Foil(amount){
        this.status[48]=amount
        this.generalSelfStatus()
    }
    exhaustDiscover(amount,level){
        this.status[49]+=amount
        this.statusMarker[2]=level
        this.generalSelfStatus()
    }
    generalSelfStatus(){
        if(variants.mtg){
            this.battle.mtgUnmark(this.player)
        }
    }
    shuffle(){
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
        if(userCombatant.getStatus('Shuffle Energy')>0){
            this.battle.addSpecificEnergy(userCombatant.getStatus('Shuffle Energy'),this.player,0)
        }
        if(userCombatant.getStatus('Shuffle Draw')>0){
            this.battle.cardManagers[this.player].draw(userCombatant.getStatus('Shuffle Draw'))
        }
        if(userCombatant.getStatus('Shuffle (E)')>0){
            this.battle.addSpecificEnergy(userCombatant.getStatus('Shuffle (E)'),this.player,6)
        }
        this.battle.relicManager.activate(16,[this.id,this.player])
    }
    selfLevel(type,level){
        if(this.battle.initialized&&this.battle.combatantManager.combatants.length>this.player){
            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
            if(userCombatant.status.main[161]>0){
                return min(level+userCombatant.status.main[161],types.card[type].levels.length-1)
            }else{
                return level
            }
        }else{
            return level
        }
    }
    out(){
        this.cards.forEach(card=>console.log(card.name))
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
    countDupes(type){
        let total=0
        let names=[]
        let numbers=[]
        for(let a=0,la=this.cards.length;a<la;a++){
            if(names.includes(this.cards[a].name)){
                numbers[names.indexOf(this.cards[a].name)]++
            }else{
                names.push(this.cards[a].name)
                numbers.push(1)
            }
        }
        for(let a=0,la=this.cards.length;a<la;a++){
            if(
                names.includes(this.cards[a].name)&&numbers[names.indexOf(this.cards[a].name)]>=2&&
                !(type==1&&this.cards[a].getBasic(-1))
            ){
                total++
            }
        }
        return total
    }
    removeDupes(){
        for(let a=0,la=this.cards.length;a<la;a++){
            for(let b=0,lb=this.cards.length;b<lb;b++){
                if(a!=b&&b>a&&this.cards[a].name==this.cards[b].name&&!this.cards[a].basic){
                    this.remove(b)
                    b--
                    lb--
                    la--
                }
            }
        }
    }
    unRemoveDupes(){
        for(let a=0,la=this.battle.cardManagers[this.player].remove.cards.length;a<la;a++){
            for(let b=0,lb=this.cards.length;b<lb;b++){
                if(this.battle.cardManagers[this.player].remove.cards[a].name==this.cards[b].name){
                    this.battle.cardManagers[this.player].remove.send(this.cards,a,a+1,0)
                    a--
                    la--
                    b=lb
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
                    this.cards[a].setCost(0,[0])
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
                if(names.includes(this.cards[a].name)&&numbers[names.indexOf(this.cards[a].name)]>=limit){
                    if(this.cards[a].spec.includes(12)){
                        for(let b=0,lb=this.cards[a].effect.length;b<lb;b++){
                            if(this.cards[a].effect[b].length>=1&&this.cards[a].class[b]!=3){
                                this.cards[a].effect[b][0]+=value
                            }
                        }
                    }else if(this.cards[a].effect.length>=1&&this.cards[a].class!=3){
                        this.cards[a].effect[0]+=value
                    }
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
                type==1&&(this.cards[a].name=='Fatigue'||this.cards[a].name=='Heavy\nFatigue')||
                type==2&&this.cards[a].name==args[0]||
                type==3&&this.cards[a].class==5||
                type==4&&args[0].includes(this.cards[a].class)||
                type==5&&this.cards[a].rarity==args[0]||
                type==6&&this.cards[a].spec.includes(args[0])
            ){
                if(this.id==2){
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                }else if(this.id==1||this.id==3){
                    this.send(this.battle.cardManagers[this.player].exhaust.cards,a,a+1)
                    a--
                    la--
                }else{
                    if(this.remove(a)){
                        a--
                        la--
                    }
                }
                done++
                if(done>=value&&value>=0){
                    a=la
                }
            }
        }
        return done
    }
    upgradeAbstract(type,value,args){
        let done=0
        for(let a=0,la=this.cards.length;a<la;a++){
            if(
                type==0&&this.cards[a].class==5&&!(this.cards[a].name=='Fatigue'||this.cards[a].name=='Heavy\nFatigue')||
                type==1&&(this.cards[a].name=='Fatigue'||this.cards[a].name=='Heavy\nFatigue')||
                type==2&&this.cards[a].name==args[0]||
                type==3&&this.cards[a].class==5||
                type==4&&args[0].includes(this.cards[a].class)||
                type==5&&this.cards[a].rarity==args[0]
            ){
                if(this.id==2){
                    this.cards[a].deSize=true
                    this.cards[a].discardEffect.push(0)
                }else{
                    this.cards[a]=upgradeCard(this.cards[a])
                    this.generalUpgrade(this.cards[a])
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
            if(this.cards[a].usable&&this.cards[a].getCost(0)>0){
                total+=this.cards[a].getCost(0)
            }
        }
        return total
    }
    numberAbstract(type,args){
        let total=0
        for(let a=0,la=this.cards.length;a<la;a++){
            if(
                type==0&&args[0].includes(this.cards[a].name)||
                type==1&&args[0]==this.cards[a].getCost(0)&&!this.cards[a].spec.includes(5)&&!this.cards[a].spec.includes(41)||
                type==2&&args[0]<=this.cards[a].getCost(0)&&!this.cards[a].spec.includes(5)&&!this.cards[a].spec.includes(41)||
                type==3&&this.cards[a].spec.includes(args[0])||
                type==4&&args[0].includes(this.cards[a].class)||
                type==5&&args[0]==this.cards[a].color&&!this.cards[a].colorful||
                type==6&&args[0]==this.cards[a].color&&args[1]==this.cards[a].rarity&&!this.cards[a].colorful||
                type==7&&(this.cards[a].retain||this.cards[a].retain2||this.cards[a].spec.includes(2)||this.cards[a].spec.includes(29)||this.cards[a].spec.includes(55)||this.cards[a].spec.includes(60)||this.battle.relicManager.hasRelic(128,this.player))||
                type==8&&this.cards[a].getBasic(-1)||
                type==9&&this.cards[a].getBasicMultiple(args[0])||
                type==10&&args[0].includes(this.cards[a].class)&&!args[1].includes(this.cards[a].name)||
                type==11&&this.cards[a].colorless()&&!this.cards[a].spec.includes(7)||
                type==12&&args[0].includes(this.cards[a].attack)&&this.cards[a].name.includes(args[1])||
                type==13&&!this.cards[a].usable||
                type==14&&args[0].includes(this.cards[a].class)&&!this.cards[a].spec.includes(args[1])||
                type==15&&!args[0].includes(this.cards[a].class)||
                type==16&&args[0].includes(this.cards[a].class)&&this.cards[a].attack!=args[1]||
                type==17&&(this.cards[a].spec.includes(12)&&(this.cards[a].effect[0].includes(args[0])||this.cards[a].effect[1].includes(args[0]))||!this.cards[a].spec.includes(12)&&this.cards[a].effect.includes(args[0]))||
                type==18&&args[0].includes(this.cards[a].rarity)||
                type==19&&this.cards[a].level>=args[0]||
                type==20&&args[0].includes(this.cards[a].edition)||
                type==21&&!this.cards[a].deSize&&(variants.mtg&&!arrayCompareLoose(this.cards[a].color,this.battle.player[this.player])||!variants.mtg&&this.cards[a].color!=this.battle.player[this.player])
            ){
                total++
            }
        }
        return total
    }
    colorNumber(){
        let colors=[]
        for(let a=0,la=this.cards.length;a<la;a++){
            if(variants.mtg){
                for(let b=0,lb=this.cards[a].color.length;b<lb;b++){
                    if(!colors.includes(this.cards[a].color[b])){
                        colors.push(this.cards[a].color[b])
                    }
                }
            }else{
                if(!colors.includes(this.cards[a].color)){
                    colors.push(this.cards[a].color)
                }
            }
        }
        return colors.length
    }
    costNumber(){
        let costs=[]
        for(let a=0,la=this.cards.length;a<la;a++){
            if(!costs.includes(this.cards[a].getCost(0))){
                costs.push(this.cards[a].getCost(0))
            }
        }
        return costs.length
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
            this.cards[index0].falsed.list=this.cards[index1].list
            this.cards[index0].falsed.class=this.cards[index1].class
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
            this.cards[index1].falsed.list=this.cards[index0].list
            this.cards[index1].falsed.class=this.cards[index0].class
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
    extremaEffect(effect,extrema){
        switch(extrema){
            case 0: case 1:
                this.lastSort=1
                let costs=[]
                for(let a=0,la=this.cards.length;a<la;a++){
                    if(
                        !costs.includes(this.cards[a].getCost(0))
                        &&!(effect==1&&(this.cards[a].spec.includes(2)||this.cards[a].retain2))
                    ){
                        costs.push(this.cards[a].getCost(0))
                    }
                }
                this.sorted=sortNumbers(costs)
            break
        }
        if((extrema==0||extrema==1)&&this.sorted.length==0){
            return false
        }
        let possible=[]
        for(let a=0,la=this.cards.length;a<la;a++){
            if(
                (
                    extrema==0&&this.cards[a].getCost(0)==this.sorted[0]||
                    extrema==1&&this.cards[a].getCost(0)==this.sorted[this.sorted.length-1]
                )
                &&!(effect==0&&this.cards[a].getCost(0)==0)
                &&!(effect==1&&(this.cards[a].spec.includes(2)||this.cards[a].retain2))
            ){
                possible.push(a)
            }
        }
        if(possible.length>0){
            let index=possible[floor(random(0,possible.length))]
            switch(effect){
                case 0:
                    this.cards[index].setCost(0,[0])
                break
                case 1:
                    this.cards[index].retain2=true
                break
                case 2:
                    this.cards[index].deSize=true
                break
            }
        }
        return true
    }
    allEffect(effect){
        let total=0
        let userCombatant
        switch(effect){
            case 1:
                this.cancel()
                if(this.battle.relicManager.hasRelic(51,this.player)){
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.cards.length*this.battle.relicManager.active[51][this.player+1])
                }
                if(this.battle.relicManager.hasRelic(190,this.player)){
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Single Damage Up',this.cards.length*this.battle.relicManager.active[190][this.player+1])
                }
                userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
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
                    this.selfCall(1,a)
                    this.cards[a].callDiscardEffect()
                    if(this.cards[a].retain2||a<userCombatant.getStatus('Retain Bar Per Turn')){
                        this.cards[a].retained()
                        this.cards.forEach(card=>card.anotherRetained(this.cards[a]))
                        if(userCombatant.getStatus('Retain Duplicate')>0){
                            this.copySelf(a)
                            a++
                        }
                        total++
                    }else if(this.cards[a].retain||this.battle.relicManager.hasRelic(192,this.player)&&la==1){
                        this.cards[a].retained()
                        this.cards.forEach(card=>card.anotherRetained(this.cards[a]))
                        this.cards[a].retain=false
                        if(userCombatant.getStatus('Retain Duplicate')>0){
                            this.copySelf(a)
                            a++
                        }
                        total++
                    }else if(this.cards[a].spec.includes(4)){
                        this.cards[a].etherealed()
                        this.cards[a].usable=false
                        this.cards[a].deSize=true
                        this.cards[a].exhaust=true
                    }else if(this.cards[a].spec.includes(2)||this.cards[a].spec.includes(29)&&floor(random(0,5))!=0||this.cards[a].spec.includes(55)||this.cards[a].spec.includes(60)||this.battle.relicManager.hasRelic(128,this.player)||variants.cardHold){
                        this.cards[a].retained()
                        this.cards.forEach(card=>card.anotherRetained(this.cards[a]))
                        if(userCombatant.getStatus('Retain Duplicate')>0){
                            this.copySelf(a)
                            a++
                        }
                        total++
                    }else{
                        this.cards[a].usable=false
                        this.cards[a].deSize=true
                        if(this.cards[a].spec.includes(10)){
                            this.cards[a].spec.splice(this.cards[a].spec.indexOf(10),1)
                        }
                        if(this.cards[a].attack==-11){
                            this.battle.cardManagers[this.player].discard.add(findName('Pride',types.card),0,constants.playerNumber+2)
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
                    this.generalUpgrade(this.cards[a])
                break
                case 5:
                    this.cards[a].confuse()
                break
                case 6:
                    if(this.cards[a].basic&&this.cards[a].level==0){
                        this.cards[a]=upgradeCard(this.cards[a])
                        this.generalUpgrade(this.cards[a])
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
                        this.generalUpgrade(this.cards[a])
                    }
                break
                case 10:
                    if(this.cards[a].class==3&&this.cards[a].getCost(0)>=0){
                        this.cards[a].costUp(0,[1])
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
                        this.cards[a].costDown(0,[1])
                    }
                break
                case 15:
                    if(this.cards[a].spec.includes(11)){
                        this.cards[a].costDown(0,[1])
                    }
                break
                case 16:
                    this.cards[a].taken()
                break
                case 17:
                    this.cards[a].setCost(0,[0])
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
                        this.cards[a].setCost(2,[0])
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
                    if(this.cards[a].getCost(0)==0&&!this.cards[a].spec.includes(5)&&!this.cards[a].spec.includes(41)){
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
                        this.cards[a].setCost(0,[0])
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
                    if(this.cards[a].getBasic(1)&&this.cards[a].target.length>2&&this.cards[a].target[0]==2){
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
                    if(this.cards[a].callEndEffect()){
                        a++
                        la++
                    }
                break
                case 45:
                    this.cards[a].spec=[]
                    this.cards[a].additionalSpec=[]
                break
                case 46:
                    if(this.cards[a].getCost(0)&&floor(random(0,2))==0){
                        this.cards[a].costDown(0,[1])
                    }
                break
                case 47:
                    if(this.cards[a].attack==1305||this.cards[a].attack==2827||this.cards[a].attack==2828||this.cards[a].attack==2829||this.cards[a].attack==2830||this.cards[a].attack==4580||this.cards[a].attack==6439||this.cards[a].attack==6440){
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
                        this.cards[a].costDown(4,[])
                    }
                break
                case 50:
                    if(this.cards[a].getCost(0)!=1){
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
                        this.cards[a].setCost(0,[0])
                    }
                break
                case 55:
                    if(this.cards[a].spec.includes(35)&&this.cards[a].usable){
                        this.cards[a].costDown(5,[])
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
                    if(this.cards[a].getBasic(1)){
                        this.cards[a].setCost(0,[0])
                    }
                break
                case 59:
                    if(this.cards[a].getBasic(2)){
                        this.cards[a].setCost(0,[0])
                    }
                break
                case 60:
                    if(this.cards[a].getBasic(1)){
                        this.cards[a].effect[0]*=2
                    }
                break
                case 61:
                    if(this.cards[a].getBasic(2)){
                        this.cards[a].effect[this.cards[a].attack==5045?1:0]*=2
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
                        this.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                        a--
                        la--
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
                    if(this.cards[a].getCost(0)==2){
                        this.cards[a].setCost(0,[1])
                    }
                break
                case 70:
                    this.cards[a].onItem()
                break
                case 71:
                    this.cards[a].setCost(0,[floor(random(0,2))])
                break
                case 72:
                    if(this.cards[a].name.includes('Cable')&&this.cards[a].class==1){
                        this.cards[a].target[2]=3
                    }
                break
                case 73:
                    if(this.cards[a].class==4){
                        this.cards[a].costDown(2,[1])
                        this.cards[a].spec.push(1)
                    }
                break
                case 74:
                    if(this.cards[a].spec.includes(5)){
                        this.cards[a].deSize=true
                    }
                break
                case 75:
                    if(this.cards[a].spec.includes(52)){
                        this.cards[a].target[2]=2
                    }
                break
                case 76:
                    if(this.cards[a].getCost(0)>=0){
                        this.cards[a].costUp(0,[1])
                    }
                break
                case 77:
                    if(this.cards[a].getCost(0)==2){
                        this.cards[a].setCost(0,[3])
                    }
                break
                case 78:
                    if(this.cards[a].cost>0){
                        this.cards[a].costDown(0,[1])
                    }
                    this.cards[a].spec.push(4)
                break
                case 79:
                    if(this.cards[a].name.includes('Cable')&&this.cards[a].class==1){
                        this.cards[a].setCost(2,[0])
                    }
                break
                case 80:
                    if(this.cards[a].getCost(0)==2&&this.cards[a].class==1){
                        this.cards[a].setCost(0,[0])
                    }
                break
                case 81:
                    if(this.cards[a].getCost(0)==2&&this.cards[a].class==2){
                        this.cards[a].setCost(0,[0])
                    }
                break
                case 82:
                    this.cards[a].setCost(2,[1])
                    for(let b=0,lb=this.battle.cardManagers[this.player].deck.cards.length;b<lb;b++){
                        if(this.cards[a].id==this.battle.cardManagers[this.player].deck.cards[b].id){
                            this.battle.cardManagers[this.player].deck.cards[b].setCost(2,[1])
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
                break
                case 87:
                    this.cards[a].callAnotherDrawEffect()
                break
                case 88:
                    if(this.cards[a].cost>=0){
                        this.cards[a].costUp(2,[1])
                    }
                break
                case 89:
                    if(this.cards[a].getCost(0)==2&&this.cards[a].class==2){
                        this.cards[a].setCost(0,[1])
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
                        this.cards[a].costUp(2,[1])
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
                case 105:
                    if(!this.cards[a].spec.includes(4)){
                        this.cards[a].spec.push(4)
                    }
                break
                case 106:
                    this.cards[a].prismaticActivation()
                break
                case 107:
                    this.copySelfInput(a)
                break
                case 108:
                    if(!this.cards[a].basic){
                        this.cards[a]=this.battle.cardManagers[this.player].transformCardToBasic(this.cards[a])
                    }
                break
                case 109:
                    if(this.cards[a].basic){
                        if(this.cards[a].name=='Step'||this.cards[a].name=='Step-L'||this.cards[a].name=='Step-R'){
                            if(this.cards[a].level==0){
                                this.cards[a]=upgradeCard(this.cards[a])
                                this.generalUpgrade(this.cards[a])
                            }
                        }else{
                            this.cards[a]=this.battle.cardManagers[this.player].transformCard(this.cards[a])
                        }
                    }
                break
                case 110:
                    this.cards[a].callStanceChangeEffect()
                break
                case 111:
                    this.cards[a].callDeathEffect()
                break
                case 112:
                    this.cards[a].callAnotherExhaustEffect()
                break
                case 113:
                    if(!this.cards[a].spec.includes(57)){
                        this.cards[a].spec.push(57)
                        this.cards[a].additionalSpec.push(57)
                    }
                break
                case 114:
                    this.generalExhaust(a)
                    a--
                    la--
                break
                case 115:
                    this.cards[a].color=floor(random(0,constants.playerNumber))+1
                    this.cards[a].setColorDetail()
                break
                case 116:
                    this.cards[a].callPullEffect()
                break
                case 117:
                    switch(this.cards[a].callPostStartEffect(this.battle.encounter.class)){
                        case 1:
                            la--
                        break
                    }
                break
                case 118:
                    this.cards[a].callLeaderEffect()
                break
                case 119:
                    this.cards[a].callAssignEffect()
                break
                case 120:
                    if(this.cards[a].spec.includes(5)){
                        this.cards[a].spec.splice(this.cards[a].spec.indexOf(5),1)
                        this.cards[a].additionalSpec.push(-4)
                        this.cards[a].spec.push(1)
                        this.cards[a].additionalSpec.push(1)
                        this.cards[a].setCost(2,[1])
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
        if(effect==3||effect==10||effect==12||effect==18||effect==19||effect==32||effect==43||effect==49){
            total=0
        }else if(effect==9){
            total=args[1]
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
                    if(this.cards[a].getBasicMultiple([1,2])){
                        this.cards[a].effect[0]+=args[0]
                    }
                break
                case 3:
                    total++
                    if(total%args[0]==0){
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
                    if(this.cards[a].getBasic(1)){
                        this.cards[a].effect[0]=max(this.cards[a].effect[0]+args[0],0)
                    }
                break
                case 6:
                    if(this.cards[a].getBasic(2)){
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
                        this.cards[a].costDown(0,[args[0]])
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
                    if(this.cards[a].getBasic(3)){
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
                    if(this.cards[a].spec.includes(70)){
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
                    this.cards[a].callMoveTileEffect(args[0],args[1],args[2])
                break
                case 21:
                    this.cards[a].costDown(0,[args[0]])
                break
                case 22:
                    this.cards[a].costDown(2,args[0])
                break
                case 23:
                    if(this.cards[a].cost>=0&&!this.cards[a].colorless()){
                        this.cards[a].costUp(0,[args[0]])
                    }
                break
                case 24:
                    if(args.includes(this.cards[a].attack)){
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
                        this.cards[a].costUp(0,[args[0]])
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
                    if(this.cards[a].getCost(0)>=args[0]){
                        this.cards[a].setCost(0,[args[0]])
                    }
                break
                case 29:
                    if(this.cards[a].getCost(0)>=args[0]){
                        this.cards[a].setCost(0,[args[0]])
                    }
                    if(this.cards[a].getCost(2)>=args[1]){
                        this.cards[a].setCost(1,[args[1]])
                    }
                break
                case 30:
                    if(args[1].includes(this.cards[a].class)){
                        this.cards[a].costDown(0,[args[0]])
                    }
                break
                case 31:
                    this.cards[a].callAnotherDrawEffect(args[0])
                break
                case 32:
                    if(this.cards[a].class!=args[0]){
                        this.cards[a].deSize=true
                        total++
                    }
                break
                case 33:
                    if(this.cards[a].callEndEffect(args[0])){
                        a++
                        la++
                    }
                break
                case 34:
                    if(this.cards[a].class==args[0]){
                        this.cards[a].deSize=true
                        this.cards[a].discardEffect.push(0)
                    }
                break
                case 35:
                    if(this.cards[a].getCost(0)>0&&!this.cards[a].spec.includes(args[1])){
                        this.cards[a].costDown(0,[args[0]])
                    }
                break
                case 36:
                    if(this.cards[a].class==args[0]){
                        this.cards[a].deSize=true
                        this.cards[a].exhaust=true
                        this.battle.addEnergy(args[1],this.player)
                        this.battle.cardManagers[this.player].draw(args[2])
                    }
                break
                case 37:
                    if(this.cards[a].class==args[0]){
                        this.cards[a].deSize=true
                        this.cards[a].exhaust=true
                    }
                break
                case 38:
                    if(this.cards[a].getCost(0)>0&&this.cards[a].class==args[0]){
                        this.cards[a].costDown(2,[args[1]])
                    }
                break
                case 39:
                    if(this.cards[a].getCost(0)>0&&(this.cards[a].class==args[0]||args[0]==0)){
                        this.cards[a].costDown(0,[args[1]])
                    }
                break
                case 40:
                    if(this.cards[a].additionalSpec.includes(args[0])){
                        this.cards[a].setCost(2,[args[1]])
                    }
                break
                case 41:
                    this.cards[a].costDown(0,[args[0]])
                    this.cards[a].spec.push(4)
                break
                case 42:
                    if(this.cards[a].getCost(0)==args[0]&&this.cards[a].class==args[1]){
                        this.cards[a].setCost(0,[0])
                    }
                break
                case 43:
                    if(this.cards[a].class!=args[0]){
                        this.cards[a].deSize=true
                        this.cards[a].exhaust=true
                        total++
                    }
                break
                case 44:
                    if(args.includes(this.cards[a].attack)){
                        this.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,this.cards[a].attack==5163||this.cards[a].attack==6511?4:1)
                        a--
                        la--
                    }
                break
                case 45:
                    if(this.cards[a].id==args[0]){
                        this.send(args[1],a,a+1,4)
                        a--
                        la--
                    }
                break
                case 46:
                    this.cards[a].callPurchaseEffect(args[0])
                break
                case 47:
                    if(this.cards[a].edition==args[0]){
                        this.cards[a][args[1]]=true
                    }
                break
                case 48:
                    if(this.cards[a].id!=args[0]){
                        this.cards[a][args[1]](...args[2])
                    }
                break
                case 49:
                    if(this.cards[a].spec.includes(args[0])){
                        this.cards[a].deSize=true
                        this.cards[a].exhaust=true
                        total++
                    }
                break
                case 50:
                    this.cards[a].fuel+=args[0]
                break
                case 51:
                    this.cards[a].callEvokeEffect(...args)
                break
                case 52:
                    this.cards[a].setCost(0,[...args])
                break
                case 53:
                    if(this.cards[a].name.includes(args[1])){
                        this.cards[a].costDown(0,[args[0]])
                    }
                break
                case 54:
                    if(args[1].includes(this.cards[a].class)){
                        this.cards[a].costUp(0,[args[0]])
                    }
                break
                case 55:
                    this.cards[a][args[0]](...args[1])
                break
                case 56:
                    if(args[0].includes(this.cards[a].class)){
                        this.cards[a].deSize=true
                        this.cards[a].exhaust=true
                    }
                break
                case 57:
                    if(args[0].includes(this.cards[a].id)){
                        this.send(args[1],a,a+1,1)
                        a--
                        la--
                    }
                break
                case 58:
                    if(args[0].includes(this.cards[a].class)){
                        this.cards[a].deSize=true
                        this.cards[a].exhaust=true
                        total++
                    }
                break
                case 59:
                    if(args[0].includes(this.cards[a].class)){
                        this.cards[a].deSize=true
                        total++
                    }
                break
                case 60:
                    if(args[0].includes(this.cards[a].id)){
                        this.cards[a].deSizeDropDraw=true
                        this.cards[a].exhaust=true
                    }
                break
                case 61:
                    if(a>=args[0]){
                        this.cards[a].deSize=true
                    }
                break
                case 62:
                    if(this.cards[a].name.includes(args[1])||this.cards[a].attack==7453){
                        this.cards[a].costDown(0,[args[0]])
                    }
                    this.cards[a].callPrimeEffect()
                break
                case 63:
                    if(this.cards[a].getBasic(args[0])){
                        this.cards[a].setCost(0,[0])
                    }
                break
                case 64:
                    if(this.cards[a].spec.includes(79)){
                        this.cards[a].evolve+=args[0]
                        this.cards[a].callEvolveEffect()
                    }
                break
                case 65:
                    let changed=false
                    if(this.cards[a].attack==args[0]||args[0]==7274||args[0]==7470){
                        switch(this.cards[a].attack){
                            case 7236:
                                this.cards[a].effect[1]++
                                if(this.cards[a].effect[1]>=this.cards[a].effect[0]||args[0]==7274||args[0]==7470){
                                    if(args[0]==7470){
                                        this.add(findName('Nicholas\nII',types.card),this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                    }else{
                                        this.add(findName('Stalin',types.card),this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                    }
                                    if(this.id==0){
                                        changed=true
                                        this.remove(a)
                                        a--
                                        if(args[0]==7274||args[0]==7470){
                                            la--
                                        }
                                    }else if(this.id==2){
                                        this.cards[a].deSize=true
                                        this.cards[a].exhaust=true
                                        this.cards[a].purge=true
                                        if(args[0]!=7274&&args[0]!=7470){
                                            la--
                                        }
                                    }else{
                                        this.cards.splice(a,1)
                                        a--
                                    }
                                }
                            break
                            case 7237:
                                if(args[0]==7470){
                                    this.add(findName('Lenin',types.card),this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                }else{
                                    this.add(findName('Malenkov',types.card),this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                }
                                if(this.id==0){
                                    changed=true
                                    this.remove(a)
                                    a--
                                    if(args[0]==7274||args[0]==7470){
                                        la--
                                    }
                                }else if(this.id==2){
                                    this.cards[a].deSize=true
                                    this.cards[a].exhaust=true
                                    this.cards[a].purge=true
                                    if(args[0]!=7274&&args[0]!=7470){
                                        la--
                                    }
                                }else{
                                    this.cards.splice(a,1)
                                    a--
                                }
                            break
                            case 7238:
                                if(args[0]==7470){
                                    this.add(findName('Stalin',types.card),this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                }else{
                                    this.add(findName('Khrushchev',types.card),this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                }
                                if(this.id==0){
                                    changed=true
                                    this.remove(a)
                                    a--
                                    if(args[0]==7274||args[0]==7470){
                                        la--
                                    }
                                }else if(this.id==2){
                                    this.cards[a].deSize=true
                                    this.cards[a].exhaust=true
                                    this.cards[a].purge=true
                                    if(args[0]!=7274&&args[0]!=7470){
                                        la--
                                    }
                                }else{
                                    this.cards.splice(a,1)
                                    a--
                                }
                            break
                            case 7239:
                                if(args[1]>=this.cards[a].effect[1]||args[0]==7274||args[0]==7470){
                                    if(args[0]==7470){
                                        this.add(findName('Malenkov',types.card),this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                    }else{
                                        this.add(findName('Brezhnev',types.card),this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                    }
                                    if(this.id==0){
                                        changed=true
                                        this.remove(a)
                                        a--
                                        if(args[0]==7274||args[0]==7470){
                                            la--
                                        }
                                    }else if(this.id==2){
                                        this.cards[a].deSize=true
                                        this.cards[a].exhaust=true
                                        this.cards[a].purge=true
                                        if(args[0]!=7274&&args[0]!=7470){
                                            la--
                                        }
                                    }else{
                                        this.cards.splice(a,1)
                                        a--
                                    }
                                }
                            break
                            case 7240:
                                this.cards[a].effect[2]+=round(args[1]*10)/10
                                if(this.cards[a].effect[2]>=this.cards[a].effect[1]||args[0]==7274||args[0]==7470){
                                    if(args[0]==7470){
                                        this.add(findName('Khrushchev',types.card),this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                    }else{
                                        this.add(findName('Andropov',types.card),this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                    }
                                    if(this.id==0){
                                        changed=true
                                        this.remove(a)
                                        a--
                                        if(args[0]==7274||args[0]==7470){
                                            la--
                                        }
                                    }else if(this.id==2){
                                        this.cards[a].deSize=true
                                        this.cards[a].exhaust=true
                                        this.cards[a].purge=true
                                        if(args[0]!=7274&&args[0]!=7470){
                                            la--
                                        }
                                    }else{
                                        this.cards.splice(a,1)
                                        a--
                                    }
                                }
                            break
                            case 7241:
                                if(args[0]==7470){
                                    this.add(findName('Brezhnev',types.card),this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                }else{
                                    this.add(findName('Chernenko',types.card),this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                }
                                if(this.id==0){
                                    changed=true
                                    this.remove(a)
                                    a--
                                    if(args[0]==7274||args[0]==7470){
                                        la--
                                    }
                                }else if(this.id==2){
                                    this.cards[a].deSize=true
                                    this.cards[a].exhaust=true
                                    this.cards[a].purge=true
                                    if(args[0]!=7274&&args[0]!=7470){
                                        la--
                                    }
                                }else{
                                    this.cards.splice(a,1)
                                    a--
                                }
                            break
                            case 7242:
                                this.cards[a].effect[2]+=round(args[1]*10)/10
                                if(this.cards[a].effect[2]>=this.cards[a].effect[1]||args[0]==7274||args[0]==7470){
                                    if(args[0]==7470){
                                        this.add(findName('Andropov',types.card),this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                    }else{
                                        this.add(findName('Gorbachev',types.card),this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                    }
                                    if(this.id==0){
                                        changed=true
                                        this.remove(a)
                                        a--
                                        if(args[0]==7274||args[0]==7470){
                                            la--
                                        }
                                    }else if(this.id==2){
                                        this.cards[a].deSize=true
                                        this.cards[a].exhaust=true
                                        this.cards[a].purge=true
                                        if(args[0]!=7274&&args[0]!=7470){
                                            la--
                                        }
                                    }else{
                                        this.cards.splice(a,1)
                                        a--
                                    }
                                }
                            break
                            case 7243:
                                this.cards[a].effect[2]+=round(args[1]*10)/10
                                if(this.cards[a].effect[2]>=this.cards[a].effect[1]||args[0]==7274||args[0]==7470){
                                    if(args[0]==7470){
                                        this.add(findName('Chernenko',types.card),this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                    }else{
                                        this.add(findName('Fallen\nUnion',types.card),this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                    }
                                    if(this.id==0){
                                        changed=true
                                        this.remove(a)
                                        a--
                                        if(args[0]==7274||args[0]==7470){
                                            la--
                                        }
                                    }else if(this.id==2){
                                        this.cards[a].deSize=true
                                        this.cards[a].exhaust=true
                                        this.cards[a].purge=true
                                        if(args[0]!=7274&&args[0]!=7470){
                                            la--
                                        }
                                    }else{
                                        this.cards.splice(a,1)
                                        a--
                                    }
                                }
                            break
                            case 7244:
                                if(args[0]==7470){
                                    this.add(findName('Gorbachev',types.card),this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                }else{
                                    this.add(findName('Resurgent\nUnion',types.card),this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                }
                                if(this.id==0){
                                    changed=true
                                    this.remove(a)
                                    a--
                                    if(args[0]==7274||args[0]==7470){
                                        la--
                                    }
                                }else if(this.id==2){
                                    this.cards[a].deSize=true
                                    this.cards[a].exhaust=true
                                    this.cards[a].purge=true
                                    if(args[0]!=7274&&args[0]!=7470){
                                        la--
                                    }
                                }else{
                                    this.cards.splice(a,1)
                                    a--
                                }
                            break
                            case 7554:
                                if(args[0]==7470){
                                    this.add(findName('Alexander\nIII',types.card),this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                }else{
                                    this.add(findName('Lenin',types.card),this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                }
                                if(this.id==0){
                                    changed=true
                                    this.remove(a)
                                    a--
                                    if(args[0]==7274||args[0]==7470){
                                        la--
                                    }
                                }else if(this.id==2){
                                    this.cards[a].deSize=true
                                    this.cards[a].exhaust=true
                                    this.cards[a].purge=true
                                    if(args[0]!=7274&&args[0]!=7470){
                                        la--
                                    }
                                }else{
                                    this.cards.splice(a,1)
                                    a--
                                }
                            break
                            case 7555:
                                if(args[0]!=7470){
                                    this.add(findName('Nicholas\nII',types.card),this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                    if(this.id==0){
                                        changed=true
                                        this.remove(a)
                                        a--
                                        if(args[0]==7274||args[0]==7470){
                                            la--
                                        }
                                    }else if(this.id==2){
                                        this.cards[a].deSize=true
                                        this.cards[a].exhaust=true
                                        this.cards[a].purge=true
                                        if(args[0]!=7274&&args[0]!=7470){
                                            la--
                                        }
                                    }else{
                                        this.cards.splice(a,1)
                                        a--
                                    }
                                }
                            break
                        }
                    }
                    if(changed){
                        this.allEffect(118)
                    }
                break
                case 66:
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                    if(this.cards[a].spec.includes(args[0])){
                        total++
                    }
                break
                case 67:
                    if(this.cards[a].spec.includes(args[0])&&this.cards[a].usable){
                        this.cards[a].costDown(0,[args[1]])
                    }
                break
                case 68:
                    if(this.cards[a].class==args[0]){
                        if(this.id==2){
                            this.cards[a].deSize=true
                            this.cards[a].exhaust=true
                        }else{
                            this.generalExhaust(a)
                            a--
                            la--
                        }
                        this.add(findName('Newspaper',types.card),0,constants.playerNumber+1)
                        this.slideSpecificTop(a)
                    }
                break
                case 69:
                    this.cards[a].callHoldOrbEffect(...args)
                break
            }
        }
        if(effect==9){
            return args[1]-total
        }else if(effect==10||effect==12||effect==18||effect==19||effect==32||effect==43||effect==49||effect==58||effect==59||effect==66){
            return total
        }
    }
    randomEffect(effect,args=[]){
        if(this.cards.length>0){
            let list=[]
            let massed=false
            for(let a=0,la=2;a<la;a++){
                for(let b=0,lb=this.cards.length;b<lb;b++){
                    if(
                        (this.cards[b].usable||this.id!=2)&&(!this.cards[b].deSize||this.id!=2||effect==41)
                        &&(this.cards[b].spec.includes(69)&&a==0||a==1)
                        &&!((effect==0||effect==25||effect==28||effect==66)&&this.cards[b].deSize)
                        &&!((effect==1||effect==5||effect==33||effect==40||effect==48)&&(this.cards[b].getCost(1)<=0||this.cards[b].spec.includes(5)||this.cards[b].spec.includes(41)||this.cards[b].spec.includes(55)||this.cards[b].spec.includes(59)||this.cards[b].spec.includes(60)))
                        &&!((effect==7||effect==9)&&(this.cards[b].getCost(1)<0||this.cards[b].spec.includes(5)||this.cards[b].spec.includes(41)||this.cards[b].spec.includes(55)||this.cards[b].spec.includes(59)||this.cards[b].spec.includes(60)))
                        &&!((effect==2||effect==60||effect==67||effect==77)&&(this.cards[b].level>=1||this.cards[b].class!=args[0]&&args[0]!=0||this.cards[b].spec.includes(37)))
                        &&!(effect==3&&(this.cards[b].level==0||this.cards[b].class!=args[0]&&args[0]!=0||this.cards[b].spec.includes(37)))
                        &&!(effect==8&&this.cards[b].spec.includes(8))
                        &&!(effect==10&&this.cards[b].spec.includes(9))
                        &&!(effect==11&&this.cards[b].spec.includes(10))
                        &&!((effect==13||effect==50||effect==56||effect==74)&&this.cards[b].attack==5612)
                        &&!((effect==15||effect==20)&&(this.cards[b].effect.length==0||this.cards[b].class==3&&this.cards[b].effect==1))
                        &&!(effect==17&&(this.cards[b].attack==-66||this.cards[b].attack==1115||this.cards[b].deSize))
                        &&!(effect==18&&this.cards[b].class==3)
                        &&!(effect==19&&this.cards[b].spec.includes(1))
                        &&!((effect==20||effect==24)&&this.cards[b].effect.length<=0)
                        &&!(effect==21&&!this.removable(a))
                        &&!(effect==22&&(this.cards[b].spec.includes(39)||this.cards[b].attack==55))
                        &&!((effect==26||effect==27)&&!(this.cards[b].spec.includes(35)&&this.cards[b].getCost(0)>0))
                        &&!((effect==18||effect==29)&&(this.cards[b].spec.includes(15)||this.cards[b].spec.includes(30)||this.cards[b].spec.includes(36)||this.cards[b].spec.includes(38)||this.cards[b].limit!=[]))
                        &&!(effect==29&&(this.cards[b].limit!=[]||this.cards[b].spec.includes(15)||this.cards[b].spec.includes(38)))
                        &&!(effect==30&&this.cards[b].edition!=0)
                        &&!(effect==31&&this.cards[b].edition!=args[0])
                        &&!(effect==32&&!(this.cards[b].name==args[1]&&this.cards[b].cost>0))
                        &&!(effect==34&&(this.cards[b].retain||this.cards[b].retain2|this.cards[b].spec.includes(2)||this.cards[b].spec.includes(29)))
                        &&!((effect==35||effect==75)&&(this.cards[b].getCost(0)<=0||this.cards[b].spec.includes(5)||this.cards[b].spec.includes(41)||this.cards[b].spec.includes(41)||this.cards[b].class!=1))
                        &&!((effect==36||effect==45||effect==71)&&(this.cards[b].level>=2||this.cards[b].class!=args[0]&&args[0]!=0||this.cards[b].spec.includes(37)))
                        &&!(effect==38&&(this.cards[b].level!=1||this.cards[b].class!=args[0]&&args[0]!=0||this.cards[b].spec.includes(37)))
                        &&!(effect==39&&this.cards[b].spec.includes(7))
                        &&!((effect==41||effect==44)&&!this.cards[b].spec.includes(53))
                        &&!(effect==42&&(this.cards[b].effect.length==0||this.cards[b].class!=1))
                        &&!(effect==43&&(this.cards[b].spec.includes(5)||this.cards[b].spec.includes(41)||this.cards[b].spec.includes(41)))
                        &&!(effect==46&&this.cards[b].list!=constants.playerNumber+2)
                        &&!(effect==47&&(this.cards[b].level<=1||this.cards[b].class!=args[0]&&args[0]!=0||this.cards[b].spec.includes(37)))
                        &&!(effect==49&&this.cards[b].getCost(0)!=0)
                        &&!(effect==50&&this.cards[b].class!=5)
                        &&!(effect==51&&this.cards[b].spec.includes(57))
                        &&!(effect==52&&(!this.removable(a)||this.cards[b].class!=args[0]&&args[0]!=0))
                        &&!(effect==53&&(this.cards[b].spec.includes(48)||this.cards[b].attack==80))
                        &&!(effect==54&&(this.cards[b].level>=2||!this.cards[b].basic))
                        &&!(effect==55&&(!this.removable(a)||!this.cards[b].colorless()))
                        &&!(effect==57&&(this.cards[b].class==args[0]&&args[0]!=0||this.cards[b].spec.includes(55)))
                        &&!(effect==58&&this.cards[b].class!=args[0]&&args[0]!=0)
                        &&!(effect==62&&(this.cards[b].getCost(1)<=0||this.cards[b].class!=args[0]&&args[0]!=0))
                        &&!(effect==63&&(this.cards[b].getCost(0)<=0||this.cards[b].spec.includes(5)||this.cards[b].spec.includes(41)||this.cards[b].spec.includes(41)||!this.cards[b].spec.includes(args[1])))
                        &&!(effect==64&&(this.cards[b].class!=args[0]&&args[0]!=0||this.cards[b].retain2))
                        &&!(effect==65&&this.cards[b].edition!=args[0])
                        &&!(effect==70&&!this.cards[b].spec.includes(15))
                        &&!(effect==72&&this.cards[b].getCost(0)!=args[0])
                        &&!(effect==73&&(this.cards[b].attack==5612||b<args[0]))
                        &&!(effect==76&&!this.cards[b].spec.includes(71))
                        &&!(effect==77&&(this.cards[b].effect.length<=0||this.cards[b].effect[0]>=args[1]))
                        &&!(effect==78&&!this.cards[b].spec.includes(60))
                    ){
                        list.push(b)
                    }
                }
                if(list.length>0&&a==0&&this.id!=0){
                    massed=true
                    break
                }
            }
            if(list.length>0){
                let index=list[floor(random(0,list.length))]
                switch(effect){
                    case 0: case 17: case 57: case 58:
                        this.cards[index].deSize=true
                    break
                    case 1: case 35: case 63:
                        this.cards[index].costDown(0,[args[0]])
                    break
                    case 2: case 36: case 38: case 77:
                        this.cards[index]=upgradeCard(this.cards[index])
                        this.generalUpgrade(this.cards[index])
                    break
                    case 3: case 47:
                        this.cards[index]=unupgradeCard(this.cards[index])
                        this.generalUpgrade(this.cards[index])
                    break
                    case 4: case 65:
                        this.copySelf(index)
                    break
                    case 5: case 62: case 72: case 75:
                        this.cards[index].setCost(0,[0])
                    break
                    case 6:
                        this.cards.splice(index,1)
                    break
                    case 7:
                        this.cards[index].costUp(0,[args[0]])
                    break
                    case 8:
                        this.cards[index].spec.push(8)
                    break
                    case 9:
                        this.cards[index].costUp(2,[args[0]])
                    break
                    case 10:
                        this.cards[index].spec.push(9)
                    break
                    case 11:
                        this.cards[index].spec.push(10)
                    break
                    case 12: case 49:
                        if(massed&&this.id!=0){
                            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                            for(let a=0,la=1+userCombatant.getStatus('Mass Pull Boost');a<la;a++){
                                this.cards[index].callPullEffect()
                            }
                            this.battle.cardManagers[this.player].reserve.parseDrawEffects(this.battle.cardManagers[this.player].hand)
                            if(userCombatant.getStatus('Mass Pull Damage Random')>0){
                                this.battle.combatantManager.randomEnemyEffect(3,[userCombatant.getStatus('Mass Pull Damage Random'),userCombatant.id])
                            }
                        }
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
                        if(massed&&this.id!=0){
                            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                            for(let a=0,la=1+userCombatant.getStatus('Mass Pull Boost');a<la;a++){
                                this.cards[index].callPullEffect()
                            }
                            this.battle.cardManagers[this.player].reserve.parseDrawEffects(this.battle.cardManagers[this.player].hand)
                            if(userCombatant.getStatus('Mass Pull Damage Random')>0){
                                this.battle.combatantManager.randomEnemyEffect(3,[userCombatant.getStatus('Mass Pull Damage Random'),userCombatant.id])
                            }
                        }
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
                    case 21: case 52: case 55:
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
                        this.cards[index].costDown(0,[args[0]])
                    break
                    case 27: case 32:
                        this.cards[index].setCost(0,[args[0]])
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
                        this.cards[index].setCost(0,[0])
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
                        this.cards[index].costDown(3,[args[0]])
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
                        this.cards[index].confuse()
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
                        this.cards[index].callAddEffect()
                        this.cards.forEach(card=>card.callAnotherAddEffect())
                    break
                    case 48:
                        this.cards[index].costDown(0,[args[0]])
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
                        this.cards[index].additionalSpec.push(57)
                    break
                    case 53:
                        if(!this.cards[index].spec.includes(48)){
                            this.cards[index].spec.push(48)
                        }
                    break
                    case 54:
                        this.cards[index]=upgradeCard(upgradeCard(this.cards[index]))
                        this.generalUpgrade(this.cards[index])
                        this.generalUpgrade(this.cards[index])
                    break
                    case 56: case 73:
                        if(massed&&this.id!=0){
                            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                            for(let a=0,la=1+userCombatant.getStatus('Mass Pull Boost');a<la;a++){
                                this.cards[index].callPullEffect()
                            }
                            this.battle.cardManagers[this.player].reserve.parseDrawEffects(this.battle.cardManagers[this.player].hand)
                            if(userCombatant.getStatus('Mass Pull Damage Random')>0){
                                this.battle.combatantManager.randomEnemyEffect(3,[userCombatant.getStatus('Mass Pull Damage Random'),userCombatant.id])
                            }
                        }
                        this.generalExhaust(index)
                    break
                    case 60:
                        if(massed&&this.id!=0){
                            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                            for(let a=0,la=1+userCombatant.getStatus('Mass Pull Boost');a<la;a++){
                                this.cards[index].callPullEffect()
                            }
                            this.battle.cardManagers[this.player].reserve.parseDrawEffects(this.battle.cardManagers[this.player].hand)
                            if(userCombatant.getStatus('Mass Pull Damage Random')>0){
                                this.battle.combatantManager.randomEnemyEffect(3,[userCombatant.getStatus('Mass Pull Damage Random'),userCombatant.id])
                            }
                        }
                        this.cards[index].deSize=true
                        this.cards[index].discardEffect.push(0)
                        return true
                    case 61: case 76:
                        this.send(args[0],index,index+1,4)
                    break
                    case 64:
                        this.cards[index].retain2=true
                    break
                    case 66:
                        if(massed&&this.id!=0){
                            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                            for(let a=0,la=1+userCombatant.getStatus('Mass Pull Boost');a<la;a++){
                                this.cards[index].callPullEffect()
                            }
                            this.battle.cardManagers[this.player].reserve.parseDrawEffects(this.battle.cardManagers[this.player].hand)
                            if(userCombatant.getStatus('Mass Pull Damage Random')>0){
                                this.battle.combatantManager.randomEnemyEffect(3,[userCombatant.getStatus('Mass Pull Damage Random'),userCombatant.id])
                            }
                        }
                        this.cards[index].deSize=true
                        return this.cards[index].spec.includes(args[0])
                    case 67:
                        if(massed&&this.id!=0){
                            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                            for(let a=0,la=1+userCombatant.getStatus('Mass Pull Boost');a<la;a++){
                                this.cards[index].callPullEffect()
                            }
                            this.battle.cardManagers[this.player].reserve.parseDrawEffects(this.battle.cardManagers[this.player].hand)
                            if(userCombatant.getStatus('Mass Pull Damage Random')>0){
                                this.battle.combatantManager.randomEnemyEffect(3,[userCombatant.getStatus('Mass Pull Damage Random'),userCombatant.id])
                            }
                        }
                        this.cards[index]=upgradeCard(this.cards[index])
                        this.generalUpgrade(this.cards[index])
                        return this.cards[index].spec.includes(args[1])
                    case 68:
                        if(massed&&this.id!=0){
                            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                            for(let a=0,la=1+userCombatant.getStatus('Mass Pull Boost');a<la;a++){
                                this.cards[index].callPullEffect()
                            }
                            this.battle.cardManagers[this.player].reserve.parseDrawEffects(this.battle.cardManagers[this.player].hand)
                            if(userCombatant.getStatus('Mass Pull Damage Random')>0){
                                this.battle.combatantManager.randomEnemyEffect(3,[userCombatant.getStatus('Mass Pull Damage Random'),userCombatant.id])
                            }
                        }
                        let result=this.cards[index].spec.includes(args[1])
                        this.send(args[0],index,index+1,1)
                        return result
                    case 69:
                        this.copySelf(index)
                        for(let a=0,la=args[0].length;a<la;a++){
                            this.cards[index+1].spec.push(args[0][a])
                            this.cards[index+1].additionalSpec.push(args[0][a])
                        }
                    break
                    case 70:
                        this.cards[index].limit+=args[0]
                    break
                    case 71:
                        this.cards[index].deSize=true
                        this.cards[index].discardEffect.push(2)
                    break
                    case 74:
                        this.cards[index].deSize=true
                        this.cards[index].exhaust=true
                        return true
                    case 78:
                        this.cards[index].triggerWish()
                    break

                }
                if(massed&&this.id!=0&&
                    effect!=12&&effect!=16&&effect!=49&&effect!=56&&effect!=60&&
                    effect!=66&&effect!=67&&effect!=68
                ){
                    let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                    for(let a=0,la=1+userCombatant.getStatus('Mass Pull Boost');a<la;a++){
                        this.cards[index].callPullEffect()
                    }
                    this.battle.cardManagers[this.player].reserve.parseDrawEffects(this.battle.cardManagers[this.player].hand)
                    if(userCombatant.getStatus('Mass Pull Damage Random')>0){
                        this.battle.combatantManager.randomEnemyEffect(3,[userCombatant.getStatus('Mass Pull Damage Random'),userCombatant.id])
                    }
                }
            }
        }else{
            if(effect==60||effect==74){
                return false
            }
        }
    }
    drawEffect(card,sendId){
        card.drawn++
        card.drawMark=true
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        userCombatant.activateDraw()
        this.battle.relicManager.activate(19,[card,this.player])
        if(card.getBasicMultiple([1,2])){
            if(this.basicChange[0]>0){
                card.setCost(0,[0])
            }
            if(this.basicChange[1]>0){
                card.effect[0]+=this.basicChange[1]
            }
        }
        if(card.getBasic(1)){
            if(userCombatant.getStatus('Speed Strike')>0){
                this.battle.combatantManager.randomEnemyEffect(3,[max(0,card.effect[0]+userCombatant.getStatus('Strike Boost')),userCombatant.id])
            }
        }
        switch(card.class){
            case 5:
                if(userCombatant.getStatus('Drawn Status Draw')>0){
                    this.sendAmounts[sendId]+=userCombatant.getStatus('Drawn Status Draw')
                }
                if(userCombatant.getStatus('Drawn Status Exhaust')>0){
                    this.battle.cardManagers[this.player].hand.exhaust(userCombatant.getStatus('Drawn Status Exhaust'))
                }
                if(userCombatant.getStatus('Pure')>0||userCombatant.getStatus('Indefinite Pure')>0){
                    if(userCombatant.getStatus('Indefinite Pure')==0){
                        userCombatant.status.main[findList('Pure',userCombatant.status.name)]--
                    }
                    card.deSizeDropDraw=true
                    card.exhaust=true
                }
                if(userCombatant.getStatus('Drawn Status Block')>0){
                    userCombatant.addBlock(userCombatant.getStatus('Drawn Status Block'))
                }
                if(userCombatant.getStatus('Drawn Status Temporary Strength')>0){
                    userCombatant.statusEffect('Temporary Strength',userCombatant.getStatus('Drawn Status Temporary Strength'))
                }
                if(userCombatant.getStatus('Drawn Status Temporary Dexterity')>0){
                    userCombatant.statusEffect('Temporary Dexterity',userCombatant.getStatus('Drawn Status Temporary Dexterity'))
                }
            break
            case 6:
                if(userCombatant.getStatus('Drawn Curse Block')>0){
                    userCombatant.addBlock(userCombatant.getStatus('Drawn Curse Block'))
                }
            break
        }
        if((card.spec.includes(5)||card.spec.includes(41))&&userCombatant.getStatus('Unplayable Draw Retain Once')>0){
            card.retain=true
        }
        if((card.spec.includes(5)||card.spec.includes(41))&&userCombatant.getStatus('Unplayable Draw Block')>0){
            userCombatant.addBlock(userCombatant.getStatus('Unplayable Draw Block'))
        }
        if(card.spec.includes(62)){
            this.sendAmounts[sendId]++
        }
        if(card.spec.includes(63)){
            this.sendAmounts[sendId]+=2
        }
        if(card.spec.includes(65)){
            this.battle.cardManagers[this.player].drawAbstract(1,10,0,[65])
        }
        if(card.spec.includes(74)&&!card.spec.includes(57)){
            card.spec.push(57)
        }
        if(card.spec.includes(73)&&!card.spec.includes(73)){
            card.spec.push(73)
            if(card.spec.includes(57)){
                card.spec.splice(card.spec.indexOf(57))
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
                this.battle.cardManagers[this.player].hand.add(findName('Fatigue',types.card),0,constants.playerNumber+1)
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
            case -22: card.drawMark=false; return true
            case -23:
                for(let a=0,la=card.effect[0];a<la;a++){
                    this.drawEffects.push([0,13,[]])
                }
            break
            case -24:
                this.battle.cardManagers[this.player].hand.add(findName('Burn',types.card),0,constants.playerNumber+1)
            break
            case -25:
                this.drawEffects.push([0,19,[]])
            break
            case -26:
                this.drawEffects.push([3,12])
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
                this.drawEffects.push([5,card.effect[0]])
                return true
            case -51: case -89: case 2720: case 2804: case 4144:
                card.costDown(2,[1])
            break
            case -55:
                this.drawEffects.push([0,22,[]])
            break
            case -56:
                this.battle.loseEnergy(card.effect[0],this.player)
                this.drawEffects.push([8,card.effect[1]])
            break
            case -61: case 5360: case 6215:
                for(let a=0,la=card.effect[0];a<la;a++){
                    this.battle.cardManagers[this.player].hand.cards.push(copyCardNew(card))
                }
            break
            case -63:
                this.battle.cardManagers[this.player].hand.add(findName('Pristine',types.card),0,0)
            break
            case -64:
                this.drawEffects.push([7,23,card.effect[0]])
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
                this.battle.addSpecificEnergy(card.effect[0],this.player,6)
                this.sendAmounts[sendId]+=card.effect[1]
                for(let a=0,la=card.effect[2];a<la;a++){
                    this.battle.cardManagers[this.player].hand.cards.push(copyCardNew(card))
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
                this.sendAmounts[sendId]+=card.effect[0]
            break
            case -75:
                this.drawEffects.push([7,18,[2]])
            break
            case -76:
                this.drawEffects.push([7,18,[11]])
            break
            case -78:
                this.battle.drop(this.player,findName('Refracted\nSunlight',types.card),0,constants.playerNumber+1)
            break
            case -80:
                this.drawEffects.push([0,53,[]])
            break
            case -83:
                userCombatant.statusEffect('Lock On',card.effect[0])
            break
            case -85:
                userCombatant.statusEffect('Must Attack or Take Damage',card.effect[0])
            break
            case -91:
                this.battle.purify(card.effect[0],this.player)
            break
            case -103:
                this.drawEffects.push([7,18,[1]])
            break
            case -104:
                this.drawEffects.push([7,18,[3]])
            break
            case -105:
                this.drawEffects.push([7,18,[4]])
            break
            case -107:
                this.battle.cardManagers[this.player].hand.add(findName('Hurt',types.card),0,constants.playerNumber+1)
            break
            case -112:
                this.battle.loseEnergy(card.effect[0],this.player)
                userCombatant.statusEffect(variants.mtg?'Random Mana Next Turn':'Energy Next Turn',-card.effect[0])
                userCombatant.statusEffect(variants.mtg?'Random Mana in 2 Turns':'Energy in 2 Turns',-card.effect[0])
            break
            case -113:
                this.drawEffects.push([3,5])
                this.drawEffects.push([3,115])
            break
            case -114:
                if(userCombatant.luckCheck()||!userCombatant.luckCheckFail()&&floor(random(0,2))==0){
                    userCombatant.highRoll()
                }else{
                    userCombatant.lowRoll()
                    this.battle.loseEnergy(card.effect[0],this.player)
                }
            break
            case -116:
                userCombatant.statusEffect('No Damage',card.effect[0])
            break
            case -117: case 3245:
                userCombatant.block=0
            break
            case -121:
                this.battle.cardManagers[this.player].addRandomAbstract(2,0,0,1,0,[],[constants.playerNumber+2,3])
            break
            case -123:
                userCombatant.statusEffect('Temporary All Damage Convert',card.effect[0])
            break
            case -126:
                userCombatant.statusEffect('Vulnerable',card.effect[0])
            break
            case -128:
                userCombatant.statusEffect('Frail',card.effect[0])
            break
            case -135:
                this.battle.cardManagers[this.player].addRandomAbstract(2,0,0,1,0,[],[constants.playerNumber+1,3])
            break

            //mark n
            
            case 288: case 374: case 2217: case 2776: case 4078: case 5361: case 6214: case 7343:
                for(let a=0,la=card.effect[1];a<la;a++){
                    this.battle.cardManagers[this.player].hand.cards.push(copyCardNew(card))
                }
            break
            case 327:
                if(userCombatant.getStatus('Drawn Shiv Draw')>0){
                    this.sendAmounts[sendId]+=userCombatant.getStatus('Drawn Shiv Draw')
                }
            break
            case 933: case 4010: case 4290: case 4291:
                if(variants.mtg){
                    this.battle.addSpecificEnergy(card.effect[0],this.player,6)
                }else{
                    this.battle.addEnergy(card.effect[0],this.player)
                }
            break
            case 1064:
                this.sendAmounts[sendId]+=card.effect[2]
            break
            case 1065: case 3103: case 3113: case 3114: case 3119: case 3776:
                this.sendAmounts[sendId]+=card.effect[1]
            break
            case 1076:
                this.battle.combatantManager.allEffect(19,[card.effect[0]])
            break
            case 1114:
                this.sendAmounts[sendId]+=card.effect[0]
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
            case 1242: case 4393: case 5468: case 5469: case 6013:
                userCombatant.addBlock(card.effect[0])
            break
            case 1243: case 7939:
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
            case 1745: case 1943: case 2096: case 2128: case 2200: case 2465: case 6535: case 6536: case 6823: case 7509:
            case 7909:
                for(let a=0,la=card.effect[2];a<la;a++){
                    this.battle.cardManagers[this.player].hand.cards.push(copyCardNew(card))
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
            case 2822: case 7344:
                userCombatant.vision+=card.effect[0]
            break
            case 2873: case 4450: case 4451:
                this.battle.combatantManager.randomNumberEffect(
                    1+userCombatant.getStatus('Prismatic Bomb Targets'),
                    0,
                    [
                        card.effect[0]+userCombatant.getStatus('Prismatic Bomb Boost'),
                        this.player,
                        userCombatant.getStatus('Prismatic Bomb Freeze'),
                        userCombatant.getStatus('Prismatic Bomb Poison')
                    ]
                )
                if(userCombatant.getStatus('Prismatic Bomb Items')>0){
                    for(let a=0,la=userCombatant.getStatus('Prismatic Bomb Items');a<la;a++){
                        this.battle.itemManager.addItem(findInternal(['Heal 3',variants.mtg?'3 Mana':'2 Energy','5 Damage','10 Block','Draw 2','1 Strength','1 Dexterity','1 Free Card'][floor(random(0,8))],types.item),this.player)
                    }
                }
                if(card.attack==4451){
                    this.battle.addSpecificEnergy(1,this.player,6)
                }else{
                    this.battle.addSpecificEnergy(card.effect[1],this.player,6)
                }
                if(card.attack==2873){
                    this.sendAmounts[sendId]+=card.effect[2]
                }
                this.drawEffects.push([3,106])
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
            case 3072: case 6152:
                card.costUp(2,[1])
            break
            case 3088:
                this.drawEffects.push([7,21,card.effect[0]])
            break
            case 3089:
                this.drawEffects.push([7,21,card.effect[0]])
                this.sendAmounts[sendId]+=card.effect[1]
            break
            case 3149: case 4928: case 5073:
                card.effect[0]+=card.effect[1]
            break
            case 3358:
                this.drawEffects.push([4,card.effect[0],[2]])
                this.drawEffects.push([4,card.effect[1],[3]])
                this.drawEffects.push([4,card.effect[2],[4]])
            break
            case 3413:
                this.drawEffects.push([4,card.effect[0],[2]])
                this.drawEffects.push([4,card.effect[1],[3]])
                this.drawEffects.push([4,card.effect[2],[11]])
            break
            case 3581:
                this.battle.loseEnergy(card.effect[2],this.player)
            break
            case 3753: case 3754: case 4048: case 5992:
                card.edition=floor(random(1,7))
            break
            case 3910: case 6430:
                if(variants.mtg){
                    this.battle.addSpecificEnergy(card.effect[4],this.player,6)
                }else{
                    this.battle.addEnergy(card.effect[4],this.player)
                }
            break
            case 4009:
                this.drawEffect(this.battle.cardManagers[this.player].hand.addReturn(findName('Vitality',types.card),card.level,0))
            break
            case 4011:
                if(variants.mtg){
                    this.battle.addSpecificEnergy(card.effect[0],this.player,6)
                }else{
                    this.battle.addEnergy(card.effect[0],this.player)
                }
                this.sendAmounts[sendId]+=card.effect[1]
            break
            case 4038:
                userCombatant.statusEffect('Armor',card.effect[1])
            break
            case 4133:
                this.battle.combatantManager.allEffect(48,['Lock On',card.effect[0]])
            break
            case 4183:
                userCombatant.statusEffect('Bleed',card.effect[1])
            break
            case 4517:
                userCombatant.addBlock(card.effect[0])
                userCombatant.statusEffect('Knowledge',card.effect[1])
            break
            case 4566: case 4567: case 4568:
                this.battle.addSpecificEnergy(card.attack-4564,this.player,4)
            break
            case 4655: case 4656: case 4657:
                this.battle.addSpecificEnergy(1,this.player,6)
            break
            case 4746: case 6431:
                this.battle.addSpecificEnergy(1,this.player,3)
            break
            case 5223:
                if(!this.battle.cardManagers[this.player].tempDraw.active){
                    this.battle.addEnergy(card.effect[1],this.player)
                    this.sendAmounts[sendId]+=card.effect[2]
                }
            break
            case 5224:
                if(!this.battle.cardManagers[this.player].tempDraw.active){
                    this.battle.addSpecificEnergy(2,this.player,1)
                    this.sendAmounts[sendId]+=card.effect[1]
                }
            break
            case 5271:
                if(!this.battle.cardManagers[this.player].tempDraw.active){
                    card.effect[0]+=card.effect[1]
                }
            break
            case 5400:
                this.battle.overlayManager.overlays[8][this.player].active=true
                this.battle.overlayManager.overlays[8][this.player].activate()
            break
            case 5401:
                this.battle.overlayManager.overlays[8][this.player].active=true
                this.battle.overlayManager.overlays[8][this.player].activate()
                userCombatant.addBlock(card.effect[0])
            break
            case 5447:
                card.retain=true
                if(userCombatant.getStatus('Dark Matter Draw Block')>0){
                    userCombatant.addBlock(userCombatant.getStatus('Dark Matter Draw Block'))
                }
            break
            case 5448:
                card.retain2=true
                if(userCombatant.getStatus('Dark Matter Draw Block')>0){
                    userCombatant.addBlock(userCombatant.getStatus('Dark Matter Draw Block'))
                }
            break
            case 5500:
                for(let a=0,la=card.effect[0];a<la;a++){
                    this.drawEffects.push([0,13,[]])
                }
                userCombatant.statusEffect('Strength',card.effect[1])
            break
            case 5622:
                this.battle.combatantManager.areaAbstract(0,[card.effect[0],userCombatant.id,0],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
            break
            case 5757:
                this.drawEffects.push([4,card.effect[1],[11]])
            break
            case 5869: case 5870: case 5871:
                card.edition=2
            break
            case 5942:
                userCombatant.statusEffect('Focus',card.effect[0])
            break
            case 5971: case 7302: case 7709:
                if(variants.mtg){
                    this.battle.addSpecificEnergy(card.effect[1],this.player,6)
                }else{
                    this.battle.addEnergy(card.effect[1],this.player)
                }
            break
            case 5972: case 7303: case 7710:
                this.battle.addSpecificEnergy(1,this.player,6)
            break
            case 6375: case 6376: case 6412: case 6413:
                this.battle.addSpecificEnergy(1,this.player,1)
            break
            case 6448:
                for(let a=0,la=card.effect[1];a<la;a++){
                    this.battle.cardManagers[this.player].hand.add(findName('Dazed',types.card),0,constants.playerNumber+1)
                }
            break
            case 6633: case 6634:
                this.battle.loseEnergy(card.effect[0],this.player)
            break
            case 6760:
                if(variants.mtg){
                    this.battle.addSpecificEnergy(card.effect[0],this.player,6)
                }else{
                    this.battle.addEnergy(card.effect[0],this.player)
                }
                userCombatant.inspiration+=card.effect[1]
            break
            case 6761: case 6762: case 6763:
                this.battle.addSpecificEnergy(card.attack-6760,this.player,6)
                userCombatant.inspiration+=card.effect[0]
            break
            case 6868:
                userCombatant.addBlock(card.effect[2])
            break
            case 6886:
                this.sendAmounts[sendId]+=card.effect[0]
            break
            case 6903:
                card.falsed.trigger=true
                card.falsed.name=game.ascend>=20?'Strike-':'Strike'
                card.falsed.attack=1
                card.falsed.effect=[game.ascend>=20?5:6]
                card.falsed.rarity=-2
                card.falsed.list=-1
                card.falsed.class=1
                card.falsed.reality=[]
                card.falsed.colorDetail=card.colorDetail
                card.falsed.target=card.target
                card.falsed.cost=card.cost
            break
            case 6990:
                userCombatant.addBlock(card.effect[1])
                userCombatant.statusEffect('Vulnerable',card.effect[2])
            break
            case 7090:
                this.battle.addSpecificEnergy(card.effect[1],this.player,6)
                this.battle.combatantManager.areaAbstract(0,[card.effect[0],userCombatant.id,0],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
            break
            case 7091:
                this.battle.addSpecificEnergy(1,this.player,6)
                this.battle.combatantManager.areaAbstract(0,[card.effect[0],userCombatant.id,0],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
            break
            case 7514:
                userCombatant.vision+=card.effect[1]
            break
            case 7605:
                userCombatant.combo+=card.effect[1]
            break
            case 7698:
                userCombatant.enterStance(2)
            break
            case 7699:
                userCombatant.enterStance(2)
                userCombatant.addBlock(this.effect[0])
            break

        }
        card.drawMark=false
        return false
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
                        parent.allEffect(this.drawEffects[a][1])
                    break
                    case 4:
                        classDrawCount[this.drawEffects[a][2]]+=this.drawEffects[a][1]
                    break
                    case 5:
                        drawCount+=this.drawEffects[a][1]
                    break
                    case 6:
                        parent.falsedSwap()
                    break
                    case 7:
                        parent.allEffectArgs(this.drawEffects[a][1],[this.drawEffects[a][2]])
                    break
                    case 8:
                        this.battle.cardManagers[this.player].randomEffect(2,1,[this.drawEffects[a][1]])
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
    validAbstract(index,amount,variant,args){
        return !this.cards[index].drawMark&&(
            variant<0||
            variant==0&&this.cards[index].class==args[0]||
            variant==1&&this.cards[index].getCost(0)==args[0]&&!this.cards[index].specialCost||
            variant==2&&this.cards[index].attack==args[0]||
            variant==3&&this.cards[index].name==args[0]||
            variant==4&&this.cards[index].rarity==args[0]||
            variant==5&&this.cards[index].getCost(0)==this.sorted[0]||
            variant==6&&this.cards[index].getCost(0)==this.sorted[this.sorted.length-1]||
            variant==7&&this.cards[index].spec.length==this.sorted[0]||
            variant==8&&this.cards[index].spec.length==this.sorted[this.sorted.length-1]||
            variant==9&&this.cards[index].getCost(0)%args[0]==args[1]||
            variant==10&&this.cards[index].spec.includes(args[0])||
            variant==11&&this.cards[index].colorless()||
            variant==12&&this.cards[index].rarity==this.sorted[0]||
            variant==13&&this.cards[index].rarity==this.sorted[this.sorted.length-1]||
            variant==14&&this.cards[index].getBasic(-1)||
            variant==15&&args[0].includes(this.cards[index].class)&&args[1]==this.cards[index].getCost(0)||
            variant==16&&(!variants.mtg||this.cards[index].color.includes(args[0]))||
            variant==17&&args[0].includes(this.cards[index].name)||
            variant==18&&args[0].includes(this.cards[index].edition)||
            variant==19&&this.cards[index].class!=args[0]||
            variant==20&&this.cards[index].getBasic(args[0])||
            variant==21&&(variants.mtg&&!arrayCompareLoose(this.cards[index].color,this.battle.player[this.player])||!variants.mtg&&this.cards[index].color!=this.battle.player[this.player])||
            variant==22&&args[0].includes(this.cards[index].class)||
            variant==23&&this.cards[index].name.includes(args[0])&&args[1].includes(this.cards[index].class)
        )
    }
    checkAbstract(amount,variant,args){
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
        this.sendAmounts.push(amount)
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.validAbstract(a,amount,variant,args)){
                return true
            }
        }
        return false
    }
    sendAbstractBase(list,amount,variant,output,args){
        let total=output==22?[]:0
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
        this.sendAmounts.push(amount)
        let sent=[]
        let sendId=this.sendAmounts.length-1
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.validAbstract(a,amount,variant,args)){
                list.push(copyCard(this.cards[a]))
                list[list.length-1].size=0
                list[list.length-1].position.x=1200
                list[list.length-1].position.y=500
                delete this.cards[a]
                this.cards.splice(a,1)
                a--
                la--
                if(output==22){
                    total.push(list[list.length-1])
                }else{
                    total+=variant==-2?this.cards[a].getCost(0):1
                }
                if((output==22?total.length:total)>=this.sendAmounts[sendId]&&this.sendAmounts[sendId]!=-1){
                    a=la
                }
                if(this.drawEffect(list[list.length-1],sendId)){la=0}
                sent.push(list[list.length-1])
                switch(output){
                    case 1:
                        list.splice(floor(random(0,list.length-1)),0,list[list.length-1])
                        list.splice(list.length-1,1)
                    break
                    case 2:
                        list[list.length-1].setCost(0,[0])
                    break
                    case 3:
                        list[list.length-1].costDown(0,[1])
                    break
                    case 4:
                        list[list.length-1].costDown(0,[2])
                    break
                    case 5:
                        list[list.length-1].retain=true
                    break
                    case 6:
                        let listId=args[0]
                        for(let a=0,la=args[1];a<la;a++){
                            this.battle.cardManagers[this.player].getList(listId).copySelfInput(list.length-1)
                        }
                    break
                    case 7:
                        list[list.length-1]=upgradeCard(list[list.length-1])
                        this.generalUpgrade(list[list.length-1])
                        list[list.length-1].retain2=true
                    break
                    case 8:
                        if(list[list.length-1].level==0){
                            list[list.length-1]=upgradeCard(list[list.length-1])
                            this.generalUpgrade(list[list.length-1])
                        }else{
                            args[1].addBarrier(args[2])
                        }
                    break
                    case 9:
                        list[list.length-1].costUp(0,[1])
                    break
                    case 10:
                        list[list.length-1].setCost(0,[0])
                        list[list.length-1].retain2=true
                    break
                    case 11:
                        if(!list[list.length-1].spec.includes(args[0])){
                            list[list.length-1].spec.push(args[0])
                        }
                    break
                    case 12:
                        list[list.length-1].edition=args[0]
                    break
                    case 13:
                        list[list.length-1].retain2=true
                    break
                    case 14:
                        list[list.length-1].costDown(0,[args[1]])
                    break
                    case 15:
                        list[list.length-1].setCost(0,[0])
                        list[list.length-1].edition=args[0]
                    break
                    case 16:
                        list[list.length-1].setCost(0,[0])
                        if(!list[list.length-1].spec.includes(args[1])){
                            list[list.length-1].spec.push(args[1])
                        }
                    break
                    case 17:
                        list[list.length-1]=upgradeCard(list[list.length-1])
                        this.generalUpgrade(list[list.length-1])
                    break
                    case 18:
                        if(list[list.length-1].spec.includes(79)){
                            list[list.length-1].evolve+=args[0]
                            list[list.length-1].callEvolveEffect()
                        }
                    break
                    case 19:
                        if(this.battle.cardManagers[this.player].hand.cards.length>0){
                            for(let a=0,la=args[1];a<la;a++){
                                this.battle.cardManagers[this.player].hand.copySelf(this.battle.cardManagers[this.player].hand.cards.length-1)
                            }
                        }
                    break
                    case 20:
                        list[list.length-1].setCost(0,[floor(random(0,2))])
                    break
                    case 21:
                        list[list.length-1]=upgradeCard(list[list.length-1])
                        this.generalUpgrade(list[list.length-1])
                        switch(list[list.length-1].class){
                            case 1:
                                userCombatant.statusEffect('Cycle Attack',1)
                            break
                            case 2:
                                userCombatant.statusEffect('Cycle Defense',1)
                            break
                            case 3:
                                userCombatant.statusEffect('Cycle Movement',1)
                            break
                            case 4:
                                userCombatant.statusEffect('Cycle Power',1)
                            break
                            case 11:
                                userCombatant.statusEffect('Cycle Skill',1)
                            break
                        }
                    break
                    case 23:
                        list[list.length-1].deSizeDropDraw=true
                    break
                }
            }
        }
        return sent
    }
    sendAbstract(list,amount,variant,output,args){
        return this.sendAbstractBase(list,amount,variant,output,args).length
    }
    send(list,firstIndex,lastIndex,spec){
        this.lastSort=-1
        this.sendAmounts.push(lastIndex==-1?this.cards.length-firstIndex:lastIndex-firstIndex)
        let sendId=this.sendAmounts.length-1
        this.sent=[]
        while(this.sent.length<min(100,this.sendAmounts[sendId])){
            let preSent=this.sent.length
            if(firstIndex>=this.cards.length){
                if(spec==23){
                    this.battle.cardManagers[this.player].reserve.parseDrawEffects(this.battle.cardManagers[this.player].hand)
                }
                return this.sent
            }
            if(spec==17){
                this.cards[firstIndex].costDown(0,[1])
                let index=floor(random(0,list.length))
                list.splice(index,0,copyCard(this.cards[firstIndex]))
                this.sent.push(list[index])
            }else if(spec==15){
                let index=floor(random(0,list.length))
                list.splice(index,0,copyCard(this.cards[firstIndex]))
                this.sent.push(list[index])
            }else if(spec==11){
                list.splice(0,0,copyCard(this.cards[firstIndex]))
                this.sent.push(list[0])
            }else if(spec==22){
                this.cards[firstIndex].cost=variants.mtg?copyArray(this.cards[firstIndex].base.cost):this.cards[firstIndex].base.cost
                list.splice(0,0,copyCard(this.cards[firstIndex]))
                this.sent.push(list[0])
            }else if(spec==23){
                let index=floor(random(0,list.length))
                list.splice(index,0,copyCard(this.cards[firstIndex]))
                if(list[index].spec.includes(69)){
                    let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                    for(let a=0,la=1+userCombatant.getStatus('Mass Pull Boost');a<la;a++){
                        list[index].callPullEffect()
                    }
                    if(userCombatant.getStatus('Mass Pull Damage Random')>0){
                        this.battle.combatantManager.randomEnemyEffect(3,[userCombatant.getStatus('Mass Pull Damage Random'),userCombatant.id])
                    }
                }
                this.sent.push(list[index])
            }else{
                list.push(copyCard(this.cards[firstIndex]))
                this.sent.push(list[list.length-1])
            }
            list[list.length-1].size=0
            delete this.cards[firstIndex]
            this.cards.splice(firstIndex,1)
            if(
                spec==1||spec==2||spec==3||spec==4||spec==5||spec==6||spec==8||spec==9||spec==10||spec==12||
                spec==13||spec==14||spec==16||spec==18||spec==19||spec==20||spec==21||spec==24
            ){
                list[list.length-1]=this.sendSpec(list[list.length-1],spec,sendId)
                if(this.sendResultCancel){
                    la=0
                }
            }else if(spec==7&&!list[list.length-1].additionalSpec.includes(-2)){
                list[list.length-1].cost=variants.mtg?copyArray(list[list.length-1].base.cost):list[list.length-1].base.cost
                list[list.length-1].costDownTrigger=list[list.length-1].baseCostDownTrigger
                list[list.length-1].costUpTrigger=list[list.length-1].baseCostUpTrigger
            }
        }
        if(spec==23){
            this.battle.cardManagers[this.player].reserve.parseDrawEffects(this.battle.cardManagers[this.player].hand)
        }
        return this.sent
    }
    sendSpec(cardData,spec,sendId){
        cardData.position.x=1200
        cardData.position.y=500
        this.sendResultCancel=false
        if(this.id==3&&cardData.attack==6586){
            cardData.setCost(0,[0])
        }
        if(cardData.additionalSpec.includes(-3)){
            cardData.additionalSpec.splice(cardData.additionalSpec.indexOf(-3))
            cardData.deSize=true

        }
        switch(spec){
            case 2:
                if(!cardData.additionalSpec.includes(-2)&&!cardData.spec.includes(55)){
                    cardData.costDownTrigger=cardData.baseCostDownTrigger
                    cardData.costUpTrigger=cardData.baseCostUpTrigger
                    cardData.cost=variants.mtg?copyArray(cardData.base.cost):cardData.base.cost
                }
            break
            case 3:
                if(this.drawEffect(cardData,sendId)){this.sendResultCancel=true}
            break
            case 4:
                cardData.setCost(0,[0])
            break
            case 5:
                if(this.drawEffect(cardData,sendId)){this.sendResultCancel=true}
                cardData.setCost(0,[0])
            break
            case 6:
                if(this.drawEffect(cardData,sendId)){this.sendResultCancel=true}
                cardData.costDown(0,[1])
            break
            case 8:
                cardData=upgradeCard(cardData)
                this.generalUpgrade(cardData)
                if(this.drawEffect(cardData,sendId)){this.sendResultCancel=true}
            break
            case 9:
                cardData.retain=true
                if(this.drawEffect(cardData,sendId)){this.sendResultCancel=true}
            break
            case 10:
                if(cardData.level<=1){
                    cardData=upgradeCard(cardData)
                    this.generalUpgrade(cardData)
                }
            break
            case 12:
                cardData.retain2=true
                if(this.drawEffect(cardData,sendId)){this.sendResultCancel=true}
            break
            case 13:
                if(!cardData.spec.includes(39)){
                    cardData.spec.push(39)
                }
                if(this.drawEffect(cardData,sendId)){this.sendResultCancel=true}
            break
            case 14:
                if(!cardData.spec.includes(48)){
                    cardData.spec.push(48)
                }
                if(this.drawEffect(cardData,sendId)){this.sendResultCancel=true}
            break
            case 16:
                cardData.confuse()
            break
            case 18:
                if(!cardData.spec.includes(9)){
                    cardData.spec.push(9)
                }
                if(this.drawEffect(cardData,sendId)){this.sendResultCancel=true}
            break
            case 19:
                if(this.drawEffect(cardData,sendId)){this.sendResultCancel=true}
                cardData.costUp(0,[1])
            break
            case 20:
                cardData.spec.push(57)
                cardData.additionalSpec.push(57)
            break
            case 21:
                cardData.costDown(0,[1])
                if(this.drawEffect(cardData,sendId)){la=0}
            break
            case 24:
                cardData.setCost(0,[0])
                cardData.retain2=true
            break
        }
        return cardData
    }
    copy(list,firstIndex,lastIndex,spec){
        if(lastIndex==-1){
            for(let a=0,la=this.cards.length-firstIndex;a<la;a++){
                if(this.cards[a].attack!=7771){
                    list.push(copyCard(this.cards[firstIndex+a]))
                    list[list.length-1].position.x=1200
                    list[list.length-1].position.y=500
                    switch(spec){
                        case 1:
                            list[list.length-1].setCost(0,[0])
                        break
                        case 2:
                            list[list.length-1].nonCalc=false
                        break
                    }
                }
            }
        }else{
            for(let a=0,la=lastIndex-firstIndex;a<la;a++){
                if(this.cards[a].attack!=7771){
                    list.push(copyCard(this.cards[firstIndex+a]))
                    list[list.length-1].position.x=1200
                    list[list.length-1].position.y=500
                    switch(spec){
                        case 1:
                            list[list.length-1].setCost(0,[0])
                        break
                        case 2:
                            list[list.length-1].nonCalc=false
                        break
                    }
                }
            }
        }
    }
    copyAntiInnate(list,firstIndex,lastIndex,key,spec){
        if(lastIndex==-1){
            for(let a=0,la=this.cards.length-firstIndex;a<la;a++){
                if((
                    !this.cards[firstIndex+a].spec.includes(47)&&key==0||this.cards[firstIndex+a].spec.includes(47)&&key==1
                )&&this.cards[a].attack!=7771){
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
                if((
                    !this.cards[firstIndex+a].spec.includes(47)&&key==0||this.cards[firstIndex+a].spec.includes(47)&&key==1
                )&&this.cards[a].attack!=7771){
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
    copySelf(index,bar=false){
        game.id++
        this.lastDuplicate.push(this.cards[index].name)
        this.cards.splice(index+1,0,copyCard(this.cards[index]))
        if(this.id==0&&!bar){
            this.cards[index+1].callAddEffect()
        }
        this.cards[index+1].id=game.id
    }
    copySelfShuffleMulti(index,multi){
        game.id++
        this.lastDuplicate.push(this.cards[index].name)
        let result=copyCard(this.cards[index])
        for(let a=0,la=multi;a<la;a++){
            let point=floor(random(0,this.cards.length))
            this.cards.splice(point,0,result)
            if(this.id==0){
                this.cards[point].callAddEffect()
            }
            this.cards[point].id=game.i
        }
    }
    copySelfAbstract(index,spec){
        game.id++
        this.lastDuplicate.push(this.cards[index].name)
        this.cards.splice(index,0,copyCard(this.cards[index]))
        if(this.id==0){
            this.cards[index+1].callAddEffect()
        }
        this.cards[index+1].id=game.id
        switch(spec){
            case 0:
                this.cards[index+1].costUp(3,[1])
            break
        }
    }
    copySelfInput(index){
        game.id++
        this.cards.splice(this.cards.length,0,copyCard(this.cards[index]))
        this.cards[this.cards.length-1].position.x=1200
        this.cards[this.cards.length-1].position.y=500
        if(this.id==0){
            this.cards[this.cards.length-1].callAddEffect()
        }
        this.cards[this.cards.length-1].id=game.id
    }
    postCopyAbstract(type){
        game.id++
        if(this.id==0){
            this.cards[this.cards.length-1].callAddEffect()
        }
        this.cards[this.cards.length-1].id=game.id
        switch(type){
            case 0:
                this.cards[this.cards.length-1].position.x=1200
                this.cards[this.cards.length-1].position.y=500
            break
            case 1:
                this.cards[this.cards.length-1].position.x=1200
                this.cards[this.cards.length-1].position.y=500
                this.cards[this.cards.length-1].setCost(0,[0])
            break
        }
    }
    smoosh(index){
        for(let a=0,la=this.cards.length;a<la;a++){
            let block=(a+index)%la
            if(block!=index&&this.cards[block].name==this.cards[index].name&&!this.cards[index].spec.includes(37)&&!this.cards[block].spec.includes(37)){
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
    smooshNeg(index){
        for(let a=0,la=this.cards.length;a<la;a++){
            let block=(a+index)%la
            if(block!=index&&this.cards[block].name==this.cards[index].name){
                if(this.cards[index].level==this.cards[block].level&&this.cards[index].additionalSpec.length>this.cards[block].additionalSpec.length||this.cards[index].level>this.cards[block].level){
                    for(let b=0,lb=this.cards[index].effect.length;b<lb;b++){
                        if(this.cards[index].spec.includes(12)){
                            for(let c=0,lc=this.cards[index].effect[b].length;c<lc;c++){
                                if(!(c==0&&this.cards[index].class[b]==3)){
                                    this.cards[index].effect[b][c]=max(this.cards[index].effect[b][c],this.cards[block].effect[b][c])
                                }
                            }
                        }else{
                            if(!(b==0&&this.cards[index].class==3)){
                                this.cards[index].effect[b]=max(this.cards[index].effect[b],this.cards[block].effect[b])
                            }
                        }
                    }
                    this.cards[index].edition=5
                    this.cards.splice(block,1)
                }else{
                    for(let b=0,lb=this.cards[block].effect.length;b<lb;b++){
                        if(this.cards[index].spec.includes(12)){
                            for(let c=0,lc=this.cards[block].effect[b].length;c<lc;c++){
                                if(!(c==0&&this.cards[index].class[b]==3)){
                                    this.cards[block].effect[b][c]=max(this.cards[block].effect[b][c],this.cards[block].effect[b][c])
                                }
                            }
                        }else{
                            if(!(b==0&&this.cards[index].class==3)){
                                this.cards[block].effect[b]=max(this.cards[block].effect[b],this.cards[block].effect[b])
                            }
                        }
                    }
                    this.cards[block].edition=5
                    this.cards.splice(index,1)
                }
                return true
            }
        }
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
            if(!costs.includes(this.cards[a].getCost(0))){
                costs.push(this.cards[a].getCost(0))
            }
        }
        this.sorted=sortNumbers(costs)
    }
    sortSpecLength(){
        this.lastSort=2
        let costs=[]
        for(let a=0,la=this.cards.length;a<la;a++){
            if(!costs.includes(this.cards[a].spec.length)){
                costs.push(this.cards[a].spec.length)
            }
        }
        this.sorted=sortNumbers(costs)
    }
    sortRarity(){
        this.lastSort=3
        let rarities=[]
        for(let a=0,la=this.cards.length;a<la;a++){
            if(!rarities.includes(this.cards[a].rarity)&&this.cards[a].rarity<=3&&this.cards[a].rarity>=-2){
                rarities.push(this.cards[a].rarity)
            }
        }
        this.sorted=sortNumbers(rarities)
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
    sortBasic(trigger){
        this.lastSort=5
        let active=[]
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].basic==trigger){
                active.push(a)
            }
        }
        this.sorted=active
    }
    remove(index){
        let possible=!this.cards[index].spec.includes(7)&&!(this.battle.initialized&&this.battle.modded(97))
        if(possible){
            if(this.cards[index].class!=14){
                this.battle.cardManagers[this.player].trueAllGroupEffectArgs(65,[7241])
            }
            this.cards[index].callRemoveEffect()
            this.send(this.battle.cardManagers[this.player].remove.cards,index,index+1,0)
        }
        return possible
    }
    removeBypass(index){
        this.cards[index].callRemoveEffect()
        this.send(this.battle.cardManagers[this.player].remove.cards,index,index+1,0)
        return true
    }
    removable(index){
        return !this.cards[index].spec.includes(7)
    }
    unRemove(){
        this.battle.cardManagers[this.player].remove.send(this.cards,this.battle.cardManagers[this.player].remove.cards.length-1,this.battle.cardManagers[this.player].remove.length,0)
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
            if((
                    type==0&&args[0]==this.cards[a].type||
                    type==1&&args[0]==this.cards[a].type||
                    type==2&&args[0].includes(this.cards[a].class)||
                    type==3&&args[0]==this.cards[a].rarity||
                    type==4&&args[0]==this.cards[a].list||
                    type==5&&args[0]==this.cards[a].list&&args[1]==this.cards[a].edition||
                    type==6&&args[0].includes(this.cards[a].class)||
                    type==7&&this.cards[a].getBasicMultiple(args[0])||
                    type==8&&args[0]==this.cards[a].rarity&&args[1]==this.cards[a].level||
                    type==9&&args[0]==this.cards[a].id
                )&&this.removable(a)
            ){
                if(this.id==0&&type!=9){
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
    removeBypassAbstract(type,args){
        for(let a=0,la=this.cards.length;a<la;a++){
            if(
                type==0&&args[0]==this.cards[a].id
            ){
                this.cards[a].callRemoveEffect()
                this.send(this.battle.cardManagers[this.player].remove.cards,a,a+1,0)
                a=la
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
    unInnateExpense(cardClass){
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].additionalSpec.includes(3)&&(cardClass==-1||this.cards[a].class==cardClass)){
                this.cards[a].spec.splice(this.cards[a].spec.indexOf(3),1)
                this.cards[a].additionalSpec.splice(this.cards[a].additionalSpec.indexOf(3),1)
                this.cards[a].setCost(2,[99])
            }
        }
    }
    unCostDown(type,args){
        if(this.costDownListing.length>0){
            for(let a=0,la=this.cards.length;a<la;a++){
                if(this.cards[a].id==this.costDownListing[0]){
                    this.cards[a].costUp(type,args)
                }
            }
            this.costDownListing.splice(0,1)
        }
    }
    cost(cost,cardClass,spec,target,card){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(!card.spec.includes(55)&&!card.spec.includes(59)){
            let effectiveCost=card.editCost(cost,2,[cardClass])
            this.battle.attackManager.amplify=false
            if(spec.includes(25)&&userCombatant.ammo>0&&!(target[0]==46&&this.battle.attackManager.targetDistance<=1)){
                userCombatant.ammo--
            }
            if(
                !(userCombatant.getStatus('Free Defenses')>0&&cardClass==2)&&
                !(userCombatant.getStatus('Free Cables')>0&&card.name.includes('Cable')&&cardClass==1)&&
                !(userCombatant.getStatus('Free Minerals')>0&&card.spec.includes(52))
            ){
                let calculatoryCost=variants.mtg?(card.specialCost?effectiveCost[0]:effectiveCost.length):effectiveCost
                if(!card.spec.includes(72)){
                    if(userCombatant.getStatus('Cycle Attack')>0){
                        if(cardClass==1){
                            effectiveCost=0
                            calculatoryCost=0
                            if(userCombatant.getStatus('Cycle Draw')>0){
                                this.battle.cardManagers[this.player].draw(userCombatant.getStatus('Cycle Draw'))
                            }
                        }
                        userCombatant.status.main[findList('Cycle Attack',userCombatant.status.name)]--
                    }
                    if(userCombatant.getStatus('Cycle Defense')>0){
                        if(cardClass==2){
                            effectiveCost=0
                            calculatoryCost=0
                            if(userCombatant.getStatus('Cycle Draw')>0){
                                this.battle.cardManagers[this.player].draw(userCombatant.getStatus('Cycle Draw'))
                            }
                        }
                        userCombatant.status.main[findList('Cycle Defense',userCombatant.status.name)]--
                    }
                    if(userCombatant.getStatus('Cycle Movement')>0){
                        if(cardClass==3){
                            effectiveCost=0
                            calculatoryCost=0
                            if(userCombatant.getStatus('Cycle Draw')>0){
                                this.battle.cardManagers[this.player].draw(userCombatant.getStatus('Cycle Draw'))
                            }
                        }
                        userCombatant.status.main[findList('Cycle Movement',userCombatant.status.name)]--
                    }
                    if(userCombatant.getStatus('Cycle Power')>0){
                        if(cardClass==4){
                            effectiveCost=0
                            calculatoryCost=0
                            if(userCombatant.getStatus('Cycle Draw')>0){
                                this.battle.cardManagers[this.player].draw(userCombatant.getStatus('Cycle Draw'))
                            }
                        }
                        userCombatant.status.main[findList('Cycle Power',userCombatant.status.name)]--
                    }
                    if(userCombatant.getStatus('Cycle Skill')>0){
                        if(cardClass==11){
                            effectiveCost=0
                            calculatoryCost=0
                            if(userCombatant.getStatus('Cycle Draw')>0){
                                this.battle.cardManagers[this.player].draw(userCombatant.getStatus('Cycle Draw'))
                            }
                        }
                        userCombatant.status.main[findList('Cycle Skill',userCombatant.status.name)]--
                    }
                }
                if(calculatoryCost!=0&&card.colorless()&&card.rarity!=2&&userCombatant.getStatus('Temporary Free Non-Rare Colorless')>0){
                    userCombatant.status.main[findList('Temporary Free Non-Rare Colorless',userCombatant.status.name)]--
                }else if(calculatoryCost!=0&&cardClass==1&&userCombatant.getStatus('Free Attack')>0){
                    userCombatant.status.main[findList('Free Attack',userCombatant.status.name)]--
                }else if(calculatoryCost!=0&&cardClass==2&&userCombatant.getStatus('Free Defense')>0){
                    userCombatant.status.main[findList('Free Defense',userCombatant.status.name)]--
                }else if(calculatoryCost!=0&&cardClass==3&&userCombatant.getStatus('Free Movement')>0){
                    userCombatant.status.main[findList('Free Movement',userCombatant.status.name)]--
                }else if(calculatoryCost!=0&&cardClass==11&&userCombatant.getStatus('Free Skill')>0){
                    userCombatant.status.main[findList('Free Skill',userCombatant.status.name)]--
                }else if(calculatoryCost==1&&userCombatant.getStatus('Free 1 Cost Card')>0){
                    userCombatant.status.main[findList('Free 1 Cost Card',userCombatant.status.name)]--
                }else if(calculatoryCost!=0&&cardClass!=13&&userCombatant.getStatus('Free Card')>0){
                    userCombatant.status.main[findList('Free Card',userCombatant.status.name)]--
                }else if(calculatoryCost!=0&&spec.includes(11)){
                    userCombatant.combo-=calculatoryCost
                    if(calculatoryCost>0){
                        userCombatant.comboConsumed()
                    }
                }else if(calculatoryCost!=0&&spec.includes(21)){
                    userCombatant.metal-=calculatoryCost
                }else if(calculatoryCost!=0&&spec.includes(40)){
                    userCombatant.status.main[findList('Twos',userCombatant.status.name)]-=calculatoryCost
                }else if(calculatoryCost!=0&&spec.includes(58)){
                    userCombatant.loseHealth(calculatoryCost)
                }else{
                    if(variants.mtg){
                        let effectiveCards=[]
                        for(let a=0,la=this.cards.length;a<la;a++){
                            if(this.cards[a].usable){
                                effectiveCards.push(this.cards[a])
                            }
                        }
                        this.battle.mtgCost(effectiveCost,this.player,effectiveCards,spec.includes(35)&&userCombatant.getStatus('Double Countdowns')>0)
                    }else{
                        if(effectiveCost==-1){
                            this.battle.setEnergy(0,this.player)
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
                userCombatant.loseHealth(2)
            }
            if(userCombatant.getStatus('No Amplify')<=0){
                if(spec.includes(27)&&variants.mtg){
                    if(userCombatant.getStatus('Free Amplify')>0){
                        this.battle.attackManager.amplify=true
                        this.cards.forEach(card=>card.anotherAmplified())
                        userCombatant.amplified()
                    }else if(userCombatant.getStatus('Single Free Amplify')>0){
                        userCombatant.status.main[findList('Single Free Amplify',userCombatant.status.name)]--
                        this.battle.attackManager.amplify=true
                        this.cards.forEach(card=>card.anotherAmplified())
                        userCombatant.amplified()
                    }else{
                        let amplifyCost=[]
                        switch(this.battle.attackManager.type){
                            case 4636: case 4639: case 4640: case 4641: case 4643: case 4644: case 4646: case 4892: case 4937: case 4938:
                            case 4939:
                                amplifyCost=[1]
                            break
                            case 4637:
                                amplifyCost=[3,-1]
                            break
                            case 4642: case 4645:
                                amplifyCost=[1,5]
                            break
                            case 4650: case 6000: case 6229:
                                amplifyCost=[5]
                            break
                            case 4659: case 4660: case 4661: case 4662: case 4671: case 4678: case 4800: case 4803: case 4862: case 4885:
                                amplifyCost=[6]
                            break
                            case 4663: case 6946:
                                amplifyCost=[2]
                            break
                            case 4672: case 4866:
                                amplifyCost=[-1,-1]
                            break
                            case 4801:
                                amplifyCost=[6,6,6]
                            break
                            case 4802:
                                amplifyCost=[6,6]
                            break
                            case 4860: case 6321:
                                amplifyCost=[4]
                            break
                            case 4868:
                                amplifyCost=[1,1]
                            break
                            case 4869:
                                amplifyCost=[1,1,1]
                            break
                            default:
                                amplifyCost=[-1]
                            break
                        }
                        if(mtgAutoCost(this.battle.getSplitEnergy(this.player),amplifyCost,0,[],false)!=-1){
                            let effectiveCards=[]
                            for(let a=0,la=this.cards.length;a<la;a++){
                                if(this.cards[a].usable){
                                    effectiveCards.push(this.cards[a])
                                }
                            }
                            this.battle.updateEnergyCrystal()
                            this.battle.mtgCost(amplifyCost,this.player,effectiveCards)
                            this.battle.attackManager.amplify=true
                            this.cards.forEach(card=>card.anotherAmplified())
                            userCombatant.amplified()
                        }
                    }
                }else if(spec.includes(27)){
                    if(userCombatant.getStatus('Free Amplify')>0){
                        this.cards.forEach(card=>card.anotherAmplified())
                    }else if(userCombatant.getStatus('Single Free Amplify')>0){
                        userCombatant.status.main[findList('Single Free Amplify',userCombatant.status.name)]--
                        this.cards.forEach(card=>card.anotherAmplified())
                    }else if(this.battle.getEnergy(this.player)>=1){
                        if(variants.mtg){
                            this.battle.loseSpecificEnergy(1,this.player,6)
                        }else{
                            this.battle.loseEnergy(1,this.player)
                        }
                        this.cards.forEach(card=>card.anotherAmplified())
                    }
                    this.battle.attackManager.amplify=true
                    userCombatant.amplified()
                }else if(spec.includes(28)){
                    if(userCombatant.getStatus('Free Amplify')>0){
                        this.cards.forEach(card=>card.anotherAmplified())
                    }else if(userCombatant.getStatus('Single Free Amplify')>0){
                        userCombatant.status.main[findList('Single Free Amplify',userCombatant.status.name)]--
                        this.cards.forEach(card=>card.anotherAmplified())
                    }else if(this.battle.getEnergy(this.player)>=2){
                        if(variants.mtg){
                            this.battle.loseSpecificEnergy(2,this.player,6)
                        }else{
                            this.battle.loseEnergy(2,this.player)
                        }
                        this.cards.forEach(card=>card.anotherAmplified())
                    }
                    this.battle.attackManager.amplify=true
                    userCombatant.amplified()
                }
            }
            if(this.battle.getEnergy(this.player)<0&&variants.overheat){
                for(let a=0,la=-this.battle.getEnergy(this.player);a<la;a++){
                    this.battle.dropDrawShuffle(this.player,findName('Burn',types.card),0,constants.playerNumber+1)
                }
                this.battle.setEnergy(0,this.player)
            }
        }
    }
    callAmalgums(){
        for(let a=0,la=this.cards.length;a<la;a++){
            if(this.cards[a].spec.includes(26)&&this.cards[a].usable){
                this.battle.attackManager.type=this.cards[a].attack
                this.battle.attackManager.effect=copyArray(this.cards[a].effect)
                this.battle.attackManager.attackClass=this.cards[a].class
                this.battle.attackManager.player=this.player

                this.battle.attackManager.user=this.battle.combatantManager.getPlayerCombatantIndex(this.player)
                this.battle.attackManager.energy=this.battle.getEnergy(this.player)+this.battle.getXBoost(this.player)
                this.battle.attackManager.position.x=this.battle.combatantManager.combatants[this.battle.attackManager.user].position.x
                this.battle.attackManager.position.y=this.battle.combatantManager.combatants[this.battle.attackManager.user].position.y
                this.battle.attackManager.relativePosition.x=this.battle.combatantManager.combatants[this.battle.attackManager.user].relativePosition.x
                this.battle.attackManager.relativePosition.y=this.battle.combatantManager.combatants[this.battle.attackManager.user].relativePosition.y
                this.battle.attackManager.tilePosition.x=this.battle.combatantManager.combatants[this.battle.attackManager.user].tilePosition.x
                this.battle.attackManager.tilePosition.y=this.battle.combatantManager.combatants[this.battle.attackManager.user].tilePosition.y
                this.battle.attackManager.combo=this.battle.combatantManager.combatants[this.battle.attackManager.user].combo
                this.battle.attackManager.amplify=false
                this.battle.attackManager.relPos=[-1,this.cards.length]
                this.battle.attackManager.limit=0
                this.battle.attackManager.id=-1
                this.battle.attackManager.edition=-1
                this.battle.attackManager.drawn=-1
                this.battle.attackManager.fuel=-1
                this.battle.attackManager.debut=false
                this.battle.attackManager.evolve=-1
                this.battle.attackManager.fugue=this.battle.combatantManager.combatants[this.battle.attackManager.user].fugue

                this.battle.attackManager.targetInfo=copyArray(this.cards[a].target)
                this.battle.attackManager.targetDistance=0
                this.battle.attackManager.cost=this.cards[a].cost
                this.battle.combatantManager.combatants[this.battle.attackManager.user].goal.anim.direction=round(atan2(this.battle.combatantManager.combatants[this.battle.attackManager.target[0]].relativePosition.x-this.battle.attackManager.relativePosition.x,this.battle.combatantManager.combatants[this.battle.attackManager.target[0]].relativePosition.y-this.battle.attackManager.relativePosition.y)/60-1/2)*60+30
                this.battle.attackManager.targetDistance=distTargetCombatant(0,this.battle.combatantManager.combatants[this.battle.attackManager.target[0]],this.battle.attackManager)
                this.battle.attackManager.targetInfo[0]=0
                this.battle.attackManager.targetClass=2
                this.battle.attackManager.spec=[]
                this.target=[]
                this.battle.attackManager.execute()
                this.battle.updateTargetting()
            }
        }
    }
    display(scene,args){
        switch(scene){
            case 'battle':
                let anim=[max(this.anim[0],this.anim[43]),max(this.anim[1],this.anim[13],this.anim[29],this.anim[30],this.anim[44]),max(this.anim[2],this.anim[24]),this.anim[3],this.anim[4],this.anim[5],max(this.anim[6],this.anim[17]),this.anim[7],this.anim[8],this.anim[9],this.anim[10],this.anim[11],this.anim[12],this.anim[14],this.anim[15],this.anim[16],this.anim[18],this.anim[19],this.anim[20],this.anim[21],this.anim[22],this.anim[23],this.anim[25],this.anim[27],this.anim[28],max(this.anim[31],this.anim[34]),this.anim[32],this.anim[33],this.anim[26],max(this.anim[35],this.anim[36],this.anim[49]),this.anim[37],this.anim[38],this.anim[39],this.anim[40],this.anim[41],this.anim[42],this.anim[45],this.anim[46],this.anim[47],this.anim[48]]
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
                            this.cards[a].relIndex=a
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
                            this.cards[a].relIndex=a
                            this.cards[a].position.x=this.layer.width/2-200+a%5*100
                            this.cards[a].position.y=this.layer.height/2-130+floor(a/5)%3*130
                            this.cards[a].anim.afford=1
                            this.cards[a].display(this.id==0)
                        }
                    break
                    case 9:
                        for(let a=0,la=this.cards.length;a<la;a++){
                            if(this.cards[a].class==args[2]){
                                this.cards[a].deSize=!(position>=args[1]*15&&position<args[1]*15+15)
                                this.cards[a].fade=1
                                this.cards[a].relIndex=position
                                this.cards[a].position.x=this.layer.width/2-200+position%5*100
                                this.cards[a].position.y=this.layer.height/2-130+floor(position/5)%3*130
                                this.cards[a].anim.afford=1
                                this.cards[a].display(this.id==0)
                                position++
                                this.finalPosition=position
                            }
                        }
                    break
                    case 10:
                        for(let a=0,la=this.cards.length;a<la;a++){
                            if(this.cards[a].rarity==args[2]){
                                this.cards[a].deSize=!(position>=args[1]*15&&position<args[1]*15+15)
                                this.cards[a].fade=1
                                this.cards[a].relIndex=position
                                this.cards[a].position.x=this.layer.width/2-200+position%5*100
                                this.cards[a].position.y=this.layer.height/2-130+floor(position/5)%3*130
                                this.cards[a].anim.afford=1
                                this.cards[a].display(this.id==0)
                                position++
                                this.finalPosition=position
                            }
                        }
                    break
                    case 11:
                        if(this.lastSort!=5){
                            this.sortBasic(args[2])
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
                    case 12:
                        for(let a=0,la=this.cards.length;a<la;a++){
                            if(this.cards[a].level>=args[2]){
                                this.cards[a].deSize=!(position>=args[1]*15&&position<args[1]*15+15)
                                this.cards[a].fade=1
                                this.cards[a].relIndex=position
                                this.cards[a].position.x=this.layer.width/2-200+position%5*100
                                this.cards[a].position.y=this.layer.height/2-130+floor(position/5)%3*130
                                this.cards[a].anim.afford=1
                                this.cards[a].display(this.id==0)
                                position++
                                this.finalPosition=position
                            }
                        }
                    break
                    case 13:
                        for(let a=0,la=this.cards.length;a<la;a++){
                            if(this.cards[a].rarity==args[2]){
                                this.cards[a].deSize=!(position>=args[1]*15&&position<args[1]*15+15)
                                this.cards[a].fade=1
                                this.cards[a].relIndex=position
                                this.cards[a].position.x=this.layer.width/2-200+position%5*100
                                this.cards[a].position.y=this.layer.height/2-130+floor(position/5)%3*130
                                this.cards[a].anim.afford=1
                                this.cards[a].display(this.id==0)
                                position++
                                this.finalPosition=position
                            }
                        }
                    break
                    default:
                        for(let a=0,la=this.cards.length;a<la;a++){
                            this.cards[a].deSize=!(a>=args[1]*15&&a<args[1]*15+15)
                            this.cards[a].fade=1
                            this.cards[a].relIndex=a
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
    selfCall(type,a){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        switch(type){
            case 0:
                this.cardSelectIndex=a
                this.selfCall(34,this.cards[a])
                this.cards[a].usable=false
                if(this.cards[a].spec.includes(73)&&this.cards[a].attack!=1491&&options.oldDuplicate){
                    this.cards[a].spec.splice(this.cards[a].spec.indexOf(73))
                    this.cards[a].spec.push(57)
                    this.copySelfInput(a)
                }else if(this.cards[a].spec.includes(57)&&this.cards[a].attack!=1491&&options.oldDuplicate){
                    this.cards[a].spec.splice(this.cards[a].spec.indexOf(57))
                    this.copySelfInput(a)
                }else if((this.status[3]>0||this.status[25]>0&&this.cards[a].colorless()&&this.cards[a].rarity!=2||this.status[32]>0&&this.cards[a].class==1)&&this.cards[a].attack!=1491&&options.oldDuplicate){
                    if(this.status[32]>0&&this.cards[a].class==1){
                        this.status[32]--
                    }else if(this.status[25]>0&&this.cards[a].colorless()&&this.cards[a].rarity!=2){
                        this.status[25]--
                    }else{
                        this.status[3]--
                    }
                    this.copySelfInput(a)
                }
                if(
                    this.cards[a].target[0]==0||
                    this.cards[a].target[0]==62&&this.battle.turn.total%2==1||
                    this.cards[a].spec.includes(12)&&this.cards[a].target[0]==63||
                    this.cards[a].spec.includes(12)&&this.cards[a].target[0]==64||
                    this.cards[a].spec.includes(12)&&this.cards[a].target[0]==66
                ){
                    this.battle.attackManager.spec=this.cards[a].spec
                    if(this.cards[a].spec.includes(73)&&!(this.cards[a].limit<=1&&this.cards[a].spec.includes(15))&&!options.oldDuplicate){
                        this.cards[a].spec.splice(this.cards[a].spec.indexOf(73))
                        this.cards[a].spec.push(57)
                        this.cards[a].usable=true
                    }else if(this.cards[a].spec.includes(57)&&!(this.cards[a].limit<=1&&this.cards[a].spec.includes(15))&&!options.oldDuplicate){
                        this.cards[a].spec.splice(this.cards[a].spec.indexOf(57))
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
                            if(
                                this.cards[a].class==4||
                                this.cards[a].spec.includes(56)
                            ){
                                this.cards[a].purge=true
                            }
                        }else if((this.status[3]>0||this.status[25]>0&&this.cards[a].colorless()&&this.cards[a].rarity!=2||this.status[32]>0&&this.cards[a].class==1)&&!(this.cards[a].limit<=1&&this.cards[a].spec.includes(15))&&!options.oldDuplicate){
                            if(this.status[32]>0&&this.cards[a].class==1){
                                this.status[32]--
                            }else if(this.status[25]>0&&this.cards[a].colorless()&&this.cards[a].rarity!=2){
                                this.status[25]--
                            }else{
                                this.status[3]--
                            }
                            this.cards[a].usable=true
                            this.cards[a].deSize=false
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
                        }else if(this.cards[a].spec.includes(38)&&this.cards[a].limit>0){
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
                            this.battle.cardManagers[this.player].deck.add(findName('Card\nSleeve',types.card),this.cards[a].level,0)
                            this.battle.cardManagers[this.player].deck.add(findName('Worthless\nBaseball Card',types.card),this.cards[a].level,0)
                        }
                    }
                    if(this.cards[a].spec.includes(12)){
                        this.battle.overlayManager.overlays[108][this.player].active=true
                        this.battle.overlayManager.overlays[108][this.player].activate([this.cards[a]])
                    }else{
                        this.selfCall(33,this.cards[a])
                    }
                }else{
                    this.selfCall(45,this.cards[a])
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
                this.target=[]
                this.cardInUse=-1
                let mode=0
                for(let b=0,lb=this.cards.length;b<lb;b++){
                    if(!this.cards[b].usable){
                        mode=this.battle.combatantManager.combatants[this.battle.attackManager.user].id==a?1:0
                        this.battle.attackManager.spec=this.cards[b].spec
                        this.target=this.cards[b].target
                        if(this.cards[b].spec.includes(73)&&!(this.cards[b].limit<=1&&this.cards[b].spec.includes(15))&&!options.oldDuplicate){
                            this.cards[b].spec.splice(this.cards[a].spec.indexOf(73))
                            this.cards[b].spec.push(57)
                            this.cards[b].usable=true
                            this.cards[b].select=false
                        }else if(this.cards[b].spec.includes(57)&&!(this.cards[b].limit<=1&&this.cards[b].spec.includes(15))&&!options.oldDuplicate){
                            this.cards[b].spec.splice(this.cards[b].spec.indexOf(57))
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
                                if(
                                    this.cards[b].class==4||
                                    this.cards[b].spec.includes(56)
                                ){
                                    this.cards[b].purge=true
                                }
                            }else if((this.status[3]>0||this.status[25]>0&&this.cards[b].colorless()&&this.cards[b].rarity!=2||this.status[32]>0&&this.cards[b].class==1)&&this.cards[b].attack!=1491&&!(this.cards[b].limit<=1&&this.cards[b].spec.includes(15))&&!options.oldDuplicate){
                                if(this.status[32]>0&&this.cards[b].class==1){
                                    this.status[32]--
                                }else if(this.status[25]>0&&this.cards[b].colorless()&&this.cards[b].rarity!=2){
                                    this.status[25]--
                                }else{
                                    this.status[3]--
                                }
                                this.cards[b].usable=true
                                this.cards[b].deSize=false
                                this.cards[b].select=false
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
                                    this.battle.cardManagers[this.player].deck.cards[c].callVanishEffect()
                                    this.battle.cardManagers[this.player].deck.cards.splice(c,1)
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
                                this.battle.cardManagers[this.player].deck.add(findName('Card\nSleeve',types.card),this.cards[b].level,0)
                                this.battle.cardManagers[this.player].deck.add(findName('Worthless\nBaseball Card',types.card),this.cards[b].level,0)
                            }
                        }
                        if(this.cards[b].spec.includes(12)&&(this.cards[b].target[0]==11||this.cards[b].target[0]==15)){
                            let mode=1
                            this.battle.attackManager.type=this.battle.attackManager.type[mode]
                            this.battle.attackManager.effect=this.battle.attackManager.effect[mode]
                            this.battle.attackManager.attackClass=this.battle.attackManager.attackClass[mode]
                            this.battle.attackManager.spec=this.cards[b].reality[mode]
                            this.cards[b].characteristic=mode
                        }
                        this.cardInUse=this.cards[b]
                    }
                }
                if(this.cardInUse!=-1){
                    this.selfCall(42,[this.cardInUse,mode])
                }else{
                    this.battle.attackManager.execute()
                }
                this.battle.updateTargetting()
                for(let b=0,lb=this.cards.length;b<lb;b++){
                    if(!this.cards[b].usable){
                        this.lastPlayed[0]=copyCard(this.cards[b])
                        if(this.cards[b].class!=0){
                            this.lastPlayed[this.cards[b].class]=copyCard(this.cards[b])
                        }
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
                    this.target=[]
                    this.cardInUse=-1
                    let mode=0
                    for(let b=0,lb=this.cards.length;b<lb;b++){
                        if(!this.cards[b].usable){
                            mode=this.battle.combatantManager.combatants[this.battle.attackManager.user].id==a?1:0
                            this.battle.attackManager.spec=this.cards[b].spec
                            this.target=this.cards[b].target
                            if(this.cards[b].spec.includes(73)&&!(this.cards[b].limit<=1&&this.cards[b].spec.includes(15))&&!options.oldDuplicate){
                                this.cards[b].spec.splice(this.cards[b].spec.indexOf(73))
                                this.cards[b].spec.push(57)
                                this.cards[b].usable=true
                                this.cards[b].select=false
                            }else if(this.cards[b].spec.includes(57)&&!(this.cards[b].limit<=1&&this.cards[b].spec.includes(15))&&!options.oldDuplicate){
                                this.cards[b].spec.splice(this.cards[b].spec.indexOf(57))
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
                                    if(
                                        this.cards[b].class==4||
                                        this.cards[b].spec.includes(56)
                                    ){
                                        this.cards[b].purge=true
                                    }
                                }else if((this.status[3]>0||this.status[25]>0&&this.cards[b].colorless()&&this.cards[b].rarity!=2||this.status[32]>0&&this.cards[b].class==1)&&!(this.cards[b].limit<=1&&this.cards[b].spec.includes(15))&&!options.oldDuplicate){
                                    if(this.status[32]>0&&this.cards[b].class==1){
                                        this.status[32]--
                                    }else if(this.status[25]>0&&this.cards[b].colorless()&&this.cards[b].rarity!=2){
                                        this.status[25]--
                                    }else{
                                        this.status[3]--
                                    }
                                    this.cards[b].usable=true
                                    this.cards[b].deSize=false
                                    this.cards[b].select=false
                                }
                            }
                            if(this.battle.modded(108)&&floor(random(0,50))==0){
                                this.cards[b].exhaust=true
                                for(let c=0,lc=this.battle.cardManagers[this.player].deck.cards.length;c<lc;c++){
                                    if(this.battle.cardManagers[this.player].deck.cards[c].id==this.cards[b].id){
                                        this.battle.cardManagers[this.player].deck.cards[c].callVanishEffect()
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
                                if(this.cards[b].limit<=0&&this.cards[b].spec.includes(15)||this.cards[b].limit[0]<=0&&this.cards[b].spec.includes(38)){
                                    this.cards[b].exhaust=true
                                }
                                for(let c=0,lc=this.battle.cardManagers[this.player].deck.cards.length;c<lc;c++){
                                    if(this.battle.cardManagers[this.player].deck.cards[c].id==this.cards[b].id){
                                        this.battle.cardManagers[this.player].deck.cards[c].limit--
                                    }
                                    if(this.battle.cardManagers[this.player].deck.cards[c].limit<=0&&this.battle.cardManagers[this.player].deck.cards[c].spec.includes(15)||this.battle.cardManagers[this.player].deck.cards[c].limit[0]<=0&&this.battle.cardManagers[this.player].deck.cards[c].spec.includes(38)){
                                        this.battle.cardManagers[this.player].deck.cards[c].callVanishEffect()
                                        this.battle.cardManagers[this.player].deck.cards.splice(c,1)
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
                            if(this.cards[b].spec.includes(12)){
                                this.battle.attackManager.type=this.battle.attackManager.type[mode]
                                this.battle.attackManager.effect=this.battle.attackManager.effect[mode]
                                this.battle.attackManager.attackClass=this.battle.attackManager.attackClass[mode]
                                this.battle.attackManager.spec=this.cards[b].reality[mode]
                                this.cards[b].characteristic=mode
                            }
                            this.cardInUse=this.cards[b]
                        }
                    }
                    if(this.cardInUse!=-1){
                        this.selfCall(42,[this.cardInUse,mode])
                        this.lastPlayed[0]=copyCard(this.cardInUse)
                        if(this.battle.attackManager.attackClass!=0){
                            this.lastPlayed[this.battle.attackManager.attackClass]=copyCard(this.cardInUse)
                        }
                        if(this.cardInUse.spec.includes(26)){
                            this.battle.cardManagers[this.battle.players-1-this.player].callAmalgums(this.battle.attackManager)
                        }
                    }else{
                        this.battle.attackManager.execute()
                    }
                    this.battle.updateTargetting()
                }
            break
            case 4:
                this.cards[a].deSize=true
                if(this.status[0]>0){
                    this.status[0]--
                }
            break
            case 5:
                this.battle.attackManager.user=this.battle.combatantManager.getPlayerCombatantIndex(this.player)
                this.battle.attackManager.energy=this.battle.getEnergy(this.player)+this.battle.getXBoost(this.player)
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
                    this.selfCall(5,0)
                    this.battle.attackManager.execute()
                }else{
                    this.battle.attackManager.targetInfo=copyArray(a[3])
                    this.battle.attackManager.targetDistance=0
                    this.battle.attackManager.cost=variants.mtg?[]:0
                    this.selfCall(5,0)
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
                    this.battle.cardManagers[this.player].reserve.cards.push(copyCardNewAbstract(this.cards[a],1,[]))
                }
                if(this.status[4]>0){
                    this.status[4]=0
                }
            break
            case 11:
                if(this.cards[a].attack!=3828){
                    this.cards[a].deSize=true
                    this.cards[a].discardEffect.push(0)
                    if(this.status[6]>0){
                        this.status[6]--
                    }
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
            break
            case 14:
                this.cards[a].retain2=true
                if(this.status[9]>0){
                    this.status[9]--
                }
            break
            case 15:
                this.cards[a].deSize=true
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.status[10])
            break
            case 16:
                this.cards[a].setCost(2,[0])
                if(this.status[11]>0){
                    this.status[11]--
                }
            break
            case 17:
                if(this.cards[a].attack!=-3){
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.status[12]*max(0,this.cards[a].getCost(0)))
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
                    this.battle.combatantManager.randomEnemyEffect(3,[this.status[15]*max(0,this.cards[a].getCost(0)),this.battle.combatantManager.getPlayerCombatantIndex(this.player)])
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                    if(this.status[15]>0){
                        this.status[15]=0
                    }
                }
            break
            case 21:
                if(this.cards[a].attack!=-3){
                    if(variants.mtg){
                        if(this.cards[a].specialCost){
                            this.battle.addSpecificEnergy(max(0,this.cards[a].cost[0]),this.player,0)
                        }else{
                            for(let b=0,lb=this.cards[a].cost.length;b<lb;b++){
                                switch(this.cards[a].cost[b]){
                                    case -1:
                                        this.battle.addSpecificEnergy(1,this.player,0)
                                    break
                                    case 0: case 1: case 2: case 3: case 4: case 5: case 6:
                                        this.battle.addSpecificEnergy(1,this.player,this.cards[a].cost[b])
                                    break
                                    case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16:
                                        this.battle.addSpecificEnergy(1,this.player,6)
                                    break
                                }
                            }
                        }
                    }else{
                        this.battle.addEnergy(max(0,this.cards[a].cost),this.player)
                    }
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
                this.cards[a].setCost(2,[0])
                if(this.status[19]>0){
                    this.status[19]--
                }
            break
            case 25:
                if(!this.cards[a].spec.includes(5)&&!this.cards[a].spec.includes(41)){
                    this.cards[a].costDown(0,[1])
                    if(this.status[20]>0){
                        this.status[20]--
                    }
                }
            break
            case 26:
                if(!this.cards[a].spec.includes(5)&&!this.cards[a].spec.includes(41)){
                    this.cards[a].costUp(0,[1])
                    if(this.status[21]>0){
                        this.status[21]--
                    }
                }
            break
            case 27:
                this.cards[a].deSize=true
                this.cards[a].discardEffectBuffered.push(3)
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
            case 31:
                this.cards[a].deSize=true
                this.battle.cardManagers[this.player].draw(1)
                if(this.status[27]>0){
                    this.status[27]--
                }
            break
            case 32:
                if(this.cards[a].attack!=-3){
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                    this.battle.cardManagers[this.player].draw(1)
                    if(this.status[28]>0){
                        this.status[28]--
                    }
                }
            break
            case 33:
                this.cardInUse=a
                this.selfCall(5,0)
                this.selfCall(42,[a,0])
                this.lastPlayed[0]=copyCard(a)
                if(a.class!=0){
                    this.lastPlayed[a.class]=copyCard(a)
                }
            break
            case 34:
                this.battle.attackManager.type=a.attack
                this.battle.attackManager.effect=copyArray(a.effect)
                this.battle.attackManager.attackClass=a.class
                this.battle.attackManager.player=this.player
                this.battle.attackManager.relPos=[this.cardSelectIndex,this.cards.length-1]
                this.battle.attackManager.limit=a.limit
                this.battle.attackManager.id=a.id
                this.battle.attackManager.edition=a.edition
                this.battle.attackManager.drawn=a.drawn
                this.battle.attackManager.fuel=a.fuel
                this.battle.attackManager.debut=a.debut
                this.battle.attackManager.evolve=a.evolve
                this.battle.attackManager.fugue=userCombatant.fugue
                this.battle.attackManager.cost=a.editCost(a.cost,1)
                if(a.getBasic(1)&&this.battle.relicManager.hasRelic(50,this.player)&&this.battle.attackManager.effect.length>0){
                    this.battle.attackManager.effect[0]+=2
                }
                if(a.getBasic(1)&&userCombatant.getStatus('Strike Boost')!=0){
                    this.battle.attackManager.effect[0]=max(0,this.battle.attackManager.effect[0]+userCombatant.getStatus('Strike Boost'))
                }
                if(a.getBasic(2)&&userCombatant.getStatus('Defend Boost')!=0){
                    this.battle.attackManager.effect[a.attack==5045?1:0]=max(0,this.battle.attackManager.effect[a.attack==5045?1:0]+userCombatant.getStatus('Defend Boost'))
                }
                if(a.spec.includes(70)&&userCombatant.getStatus('Shiv Boost')>0){
                    this.battle.attackManager.effect[0]+=userCombatant.getStatus('Shiv Boost')
                }
                if(a.spec.includes(25)&&userCombatant.getStatus('Gun Boost')>0){
                    this.battle.attackManager.effect[0]+=userCombatant.getStatus('Gun Boost')
                }
                if(a.spec.includes(54)&&userCombatant.getStatus('Discus Boost')>0){
                    this.battle.attackManager.effect[0]+=userCombatant.getStatus('Discus Boost')
                }
                if(a.spec.includes(52)&&userCombatant.getStatus('Mineral Boost')>0){
                    this.battle.attackManager.effect[0]+=userCombatant.getStatus('Mineral Boost')
                }
                if(a.name.includes('Cable')&&a.class==1&&userCombatant.getStatus('Cable Boost')>0){
                    this.battle.attackManager.effect[0]+=userCombatant.getStatus('Cable Boost')
                }
                if(a.spec.includes(20)&&userCombatant.getStatus('Claw Up')>0){
                    this.battle.attackManager.effect[0]+=userCombatant.getStatus('Claw Up')
                }
                if(a.rarity==0&&a.class==1&&userCombatant.getStatus('Common Attack Boost')>0){
                    this.battle.attackManager.effect[0]+=userCombatant.getStatus('Common Attack Boost')
                }
                if(a.spec.includes(82)&&userCombatant.getStatus('Worker Boost')>0){
                    this.battle.attackManager.effect[0]+=userCombatant.getStatus('Worker Boost')
                    this.battle.attackManager.effect[1]+=userCombatant.getStatus('Worker Boost')
                }
            break
            case 35:
                if(this.cards[a].attack!=-3){
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].heal(this.status[29]*max(0,this.cards[a].getCost(0)))
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                    this.battle.cardManagers[this.player].draw(1)
                    if(this.status[29]>0){
                        this.status[29]=0
                    }
                }
            break
            case 36:
                if(this.cards[a].attack!=-3){
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                    this.battle.cardManagers[this.player].draw(max(0,this.cards[a].getCost(0))+this.status[30]-1)
                    if(this.status[30]>0){
                        this.status[30]=0
                    }
                }
            break
            case 37:
                if(this.cards[a].attack!=-3){
                    if(variants.mtg){
                        this.battle.addSpecificEnergy(this.status[31],this.player,6)
                    }else{
                        this.battle.addEnergy(this.status[31],this.player)
                    }
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                }
            break
            case 38:
                if(!this.cards[a].spec.includes(15)){
                    if(this.status[33]>0){
                        for(let b=0,lb=this.status[33];b<lb;b++){
                            this.copySelf(a)
                        }
                        this.status[33]=0
                    }
                }
            break
            case 39:
                if(this.cards[a].attack!=-3){
                    if(variants.mtg){
                        this.battle.addSpecificEnergy(1,this.player,this.status[34])
                    }else{
                        this.battle.addEnergy(this.status[34],this.player)
                    }
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                }
            break
            case 40:
                if(this.cards[a].attack!=-3){
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                    if(this.status[35]>0){
                        this.status[35]--
                    }
                    this.battle.overlayManager.overlays[10][this.player].active=true
                    this.battle.overlayManager.overlays[10][this.player].activate([0,this.cards[a].class,28])
                }
            break
            case 41:
                if(this.cards[a].attack!=-3){
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                    if(this.status[36]>0){
                        this.status[36]--
                    }
                    this.battle.overlayManager.overlays[10][this.player].active=true
                    this.battle.overlayManager.overlays[10][this.player].activate([this.cards[a].level,this.cards[a].class,28])
                }
            break
            case 42:
                this.battle.cardManagers[this.player].greenDiff++
                let cardInUse=a[0]
                cardInUse.played()
                this.battle.countCard(cardInUse,this.player,a[1])
                this.cards.forEach(card=>card.anotherPlayed(cardInUse,this.battle.attackManager.attackClass))
                this.cost(this.battle.attackManager.cost,this.battle.attackManager.attackClass,this.battle.attackManager.spec,this.target,cardInUse)
                if(!cardInUse.discardEffect.includes(13)&&!cardInUse.discardEffectBuffered.includes(1)){
                    this.battle.attackManager.execute()
                }
                this.battle.playCard(cardInUse,this.player,a[1])
                this.cards.forEach(card=>card.anotherPlayedAfter())
                this.lastMouseOver=-1
                if(variants.polar){
                    this.pole=1-this.pole
                }
            break
            case 43:
                if(this.cards[a].class==5||this.cards[a].class==6){
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                }else{
                    this.cards[a].costDown(0,[1])
                    this.cards[a].retain=true
                }
                if(this.status[37]>0){
                    this.status[37]--
                }
            break
            case 44:
                if(this.cards[a].attack!=-3){
                    this.add(this.status[38],0,this.battle.standardColorize(this.status[38]))
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                }
            break
            case 45:
                this.battle.attackManager.targetInfo=copyArray(a.target)
                this.battle.attackManager.targetDistance=0
                this.battle.attackManager.cost=a.cost
                a.select=true
                if(userCombatant.getStatus('Strike Range')>0&&a.getBasic(1)){
                    this.battle.attackManager.targetInfo[2]+=userCombatant.getStatus('Strike Range')
                }
                if(userCombatant.getStatus('Cable Range')>0&&a.name.includes('Cable')&&a.class==1){
                    this.battle.attackManager.targetInfo[2]+=userCombatant.getStatus('Cable Range')
                }
                if(userCombatant.getStatus('Mineral Range')>0&&a.spec.includes(52)){
                    this.battle.attackManager.targetInfo[2]+=userCombatant.getStatus('Mineral Range')
                }
                this.selfCall(5,0)
            break
            case 46:
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
                    this.target=[]
                    if(this.cardInUse!=-1){
                        this.selfCall(42,[this.cardInUse,0])
                    }else{
                        this.battle.attackManager.execute()
                    }
                    this.battle.updateTargetting()
                    this.lastPlayed[0]=copyCard(this.cardInUse)
                    if(this.battle.attackManager.attackClass!=0){
                        this.lastPlayed[this.battle.attackManager.attackClass]=copyCard(this.cardInUse)
                    }
                    if(this.cardInUse.spec.includes(26)){
                        this.battle.cardManagers[this.battle.players-1-this.player].callAmalgums(this.battle.attackManager)
                    }
                }
            break
            case 47:
                this.cardInUse=a
                this.selfCall(45,a)
            break
            case 48:
                this.cards[a].retain2=true
                this.cards[a].fuel+=this.statusMarker[1]
                if(this.status[39]>0){
                    this.status[39]--
                }
            break
            case 49:
                this.cards[a].setCost(0,[0])
                if(!this.cards[a].spec.includes(15)){
                    if(this.status[40]>0){
                        for(let b=0,lb=this.status[40];b<lb;b++){
                            this.copySelf(a)
                        }
                        this.status[40]=0
                    }
                }
            break
            case 50:
                this.cards[a].deSize=true
                this.cards[a].discardEffect.push(17)
                if(this.status[41]>0){
                    this.status[41]--
                }
            break
            case 51:
                if(this.cards[a].attack!=-3){
                    let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                    userCombatant.statusEffect('Strength',max(0,this.cards[a].getCost(0)),this.player)
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                    if(this.status[42]>0){
                        this.status[42]--
                    }
                }
            break
            case 52:
                this.cards[a].deSize=true
                if(this.status[43]>0){
                    this.status[43]--
                }
            break
            case 53:
                if(this.cards[a].attack!=-3){
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                    if(this.cards[a].class==6){
                        this.battle.cardManagers[this.player].draw(this.statusMarker[0])
                    }
                    if(this.status[44]>0){
                        this.status[44]=0
                    }
                }
            break
            case 54:
                for(let b=0,lb=this.status[45];b<lb;b++){
                    this.copySelf(a)
                    this.generalExhaust(a)
                }
                if(this.status[45]>0){
                    this.status[45]=0
                }
            break
            case 55:
                this.cards[a].deSize=true
                this.cards[a].discardEffect.push(10)
                if(this.status[46]>0){
                    this.status[46]--
                }
            break
            case 56:
                this.cards[a].confuse()
                if(this.status[47]>0){
                    this.status[47]--
                }
            break
            case 57:
                this.cards[a].retain2=true
                this.cards[a].edition=2
                if(this.status[48]>0){
                    this.status[48]--
                }
            break
            case 58:
                if(this.cards[a].attack!=-3){
                    this.cards[a].deSize=true
                    this.cards[a].exhaust=true
                    if(this.status[49]>0){
                        this.status[49]--
                    }
                    this.battle.overlayManager.overlays[10][this.player].active=true
                    this.battle.overlayManager.overlays[10][this.player].activate([this.statusMarker[2],[0,0],57,[],[[1,this.cards[a].class]]])
                }
            break
            case 59:
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
                this.target=[]
                if(this.cardInUse!=-1){
                    this.selfCall(42,[this.cardInUse,0])
                }else{
                    this.battle.attackManager.execute()
                }
                this.battle.updateTargetting()
                this.lastPlayed[0]=copyCard(this.cardInUse)
                if(this.battle.attackManager.attackClass!=0){
                    this.lastPlayed[this.battle.attackManager.attackClass]=copyCard(this.cardInUse)
                }
            break
        }
    }
    generalUpgrade(card){
        if(this.battle.relicManager.hasRelic(477,this.player)&&this.id==0){
            this.battle.addCurrency(20*this.battle.relicManager.active[477][this.player+1],this.player)
        }
    }
    generalExhaust(a){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        if(this.cards[a].purge){
            if(variants.witch&&this.cards[a].spec.includes(31)){
                this.battle.cardManagers[this.player].draw(1)
            }
            this.cards[a].callExhaustEffect()
            this.battle.cardManagers[this.player].hand.allEffectArgs(55,['callAnotherExhaustEffect',[this.cards[a]]])
            delete this.cards[a]
            this.cards.splice(a,1)
        }else if(userCombatant.getStatus('Double Exhaust')>0&&this.cards[a].attack!=1287){
            userCombatant.status.main[findList('Double Exhaust',userCombatant.status.name)]--
            this.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1,7)
            this.battle.cardManagers[this.player].reserve.copySelfInput(this.battle.cardManagers[this.player].reserve.cards.length-1)
        }else if(userCombatant.getStatus('Cancel Exhaust')>0&&this.cards[a].attack!=180){
            userCombatant.status.main[findList('Cancel Exhaust',userCombatant.status.name)]--
            this.send(this.battle.cardManagers[this.player].discard.cards,a,a+1,7)
        }else{
            this.exhausts++
            this.turnExhausts++
            if(userCombatant.getStatus('Exhaust Draw')>0){
                this.battle.cardManagers[this.player].draw(userCombatant.getStatus('Exhaust Draw'))
            }
            if(userCombatant.getStatus('2 Exhaust Draw')>0&&this.exhausts%2==0){
                this.battle.cardManagers[this.player].draw(userCombatant.getStatus('2 Exhaust Draw'))
            }
            if(userCombatant.getStatus('3 Exhaust Draw')>0&&this.exhausts%3==0){
                this.battle.cardManagers[this.player].draw(userCombatant.getStatus('3 Exhaust Draw'))
            }
            if(userCombatant.getStatus('Exhaust Shiv')>0&&this.cards[a].name!='Shiv'&&this.cards[a].name!='Broken\nShiv'&&this.cards[a].name!='Deluxe\nShiv'){
                for(let a=0,la=userCombatant.getStatus('Exhaust Shiv');a<la;a++){
                    this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                }
            }
            if(userCombatant.getStatus('Exhaust Temporary Strength')>0){
                userCombatant.statusEffect('Temporary Strength',userCombatant.getStatus('Exhaust Temporary Strength'))
            }
            if(userCombatant.getStatus('Exhaust Block')>0){
                userCombatant.addBlock(userCombatant.getStatus('Exhaust Block'))
            }
            this.battle.relicManager.activate(10,[this.player,this.cards[a]])
            if(variants.witch&&this.cards[a].spec.includes(31)){
                this.battle.cardManagers[this.player].draw(1)
            }
            this.cards[a].callExhaustEffect()
            this.battle.cardManagers[this.player].hand.allEffectArgs(55,['callAnotherExhaustEffect',[this.cards[a]]])
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
                    this.cards[0].setCost(0,[0])
                }
                let allDrop=true
                for(let a=0,la=this.cards.length;a<la;a++){
                    let length=
                    (a==0?
                        (100+(this.cards[a].spec.includes(34)?-20:((this.cards[a].spec.includes(33)?50:0)+(this.cards[a].spec.includes(66)?150:0)+(this.battle.relicManager.hasRelic(170,this.player)?25:0))))
                        :(
                            (this.cards[a].name=='Unbuild'&&this.cards[a-1].name=='Unbuild'&&this.cards[a].level==this.cards[a-1].level&&this.cards[a].color==this.cards[a-1].color&&this.cards[a].additionalSpec.length==0&&this.cards[a-1].additionalSpec.length==0?50:100)+
                            (this.cards[a].spec.includes(34)?-20:
                                (this.cards[a].spec.includes(33)?50:0)+
                                (this.cards[a].spec.includes(66)?150:0)+
                                (this.battle.relicManager.hasRelic(170,this.player)?25:0)
                            )+
                            (a>0&&this.cards[a-1].spec.includes(34)?-20:
                                (a>0&&this.cards[a-1].spec.includes(33)?50:0)+
                                (a>0&&this.cards[a-1].spec.includes(66)?150:0)+
                                (this.battle.relicManager.hasRelic(170,this.player)?25:0)
                            )
                        )*this.compact
                    )
                    cap+=length
                    for(let b=0,lb=variants.speedmove?2:1;b<lb;b++){
                        let mouseover=pointInsideBox({position:inputs.rel},this.cards[a])
                        if(variants.mtg&&mouseover&&this.cards[a].afford&&this.lastMouseOver!=this.cards[a].id&&this.battle.attackManager.targetInfo[0]==0){
                            let cancel=false
                            for(let b=0,lb=this.listInput.length;b<lb;b++){
                                if(this.status[this.listInput[b][0]]!=0){
                                    cancel=true
                                }
                            }
                            if(!cancel){
                                this.lastMouseOver=this.cards[a].id
                                if(!this.cards[a].specialCost){
                                    let effectiveCost=this.cards[a].editCost(this.cards[a].cost,0)
                                    let effectiveCards=[]
                                    for(let b=0,lb=this.cards.length;b<lb;b++){
                                        if(this.cards[b].usable&&a!=b){
                                            effectiveCards.push(this.cards[b])
                                        }
                                    }
                                    if(!this.cards[a].free()){
                                        this.battle.mtgMark(effectiveCost,this.player,effectiveCards)
                                    }
                                }
                            }
                        }
                        this.cards[a].update(1,'hand',this.battle.relicManager.hasRelic(170,this.player))
                        this.cards[a].upSize=mouseover&&!this.battle.overlayManager.anyActive&&!selected
                        if(this.cards[a].position.x>cap&&(this.cards[a].position.x>this.cards[max(0,a-1)].position.x+length||a==0||this.cards.swapped)){
                            this.cards[a].position.x=max(this.cards[a].position.x-25*this.compact,cap)
                            if(this.cards[a].position.x==cap&&this.cards[a].swapped){
                                this.cards[a].swapped=false
                            }
                            allDrop=false
                        }else{
                            if(allDrop){
                                if(this.cards[a].deSizeDrop){
                                    this.cards[a].deSizeDrop=false
                                    this.cards[a].deSize=true
                                }else if(this.cards[a].deSizeDropDraw){
                                    this.cards[a].deSizeDropDraw=false
                                    this.cards[a].deSize=true
                                    if(this.cards[a].exhaust){
                                        this.battle.cardManagers[this.player].draw(1)
                                    }
                                }else if(this.cards[a].spec.includes(68)&&this.cards[a].usable&&this.battle.attackManager.attacks.length<=0&&this.cards[a].playable()){
                                    this.selfCall(0,a)
                                }
                            }
                            if(this.cards[a].position.x<cap){
                                this.cards[a].position.x=min(this.cards[a].position.x+25*this.compact,cap)
                            }
                        }
                        if(this.cards[a].attack==-84&&this.cards[a].time>this.cards[a].effect[0]*60&&!this.cards[a].deSize&&!this.battle.result.victory){
                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].takeDamage(this.cards[a].effect[1],-1)
                            this.cards[a].deSize=true
                        }
                        if((this.cards[a].attack==1034||this.cards[a].attack==1037)&&this.cards.length>0&&abs((this.cards.length-1)/2-a)<=0.5&&!this.cards[a].deSize){
                            this.cards[a].setCost(0,[0])
                        }
                    }
                    if(this.cards[a].size<=0){
                        if(this.cards[a].spec.includes(34)){
                            this.cards[a].spec.splice(this.cards[a].spec.indexOf(34),1)
                        }
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
                                this.generalUpgrade(this.cards[a])
                                this.cards[a].discardEffect=hold
                                this.cards[a].discardEffect.splice(this.cards[a].discardEffect.indexOf(0),1)
                                for(let b=0,lb=5;b<lb;b++){
                                    if(this.cards[a].discardEffect.includes(0)){
                                        let hold=this.cards[a].discardEffect
                                        this.cards[a]=upgradeCard(this.cards[a],true)
                                        this.generalUpgrade(this.cards[a])
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
                                this.cards[a].additionalSpec.push(55)
                                this.cards[a].additionalSpec.push(-2)
                                this.cards[a].updateSpecialCost()
                                this.cards[a].usable=true
                                this.cards[a].edited.cost-=this.cards[a].getCost(0)
                                this.cards[a].edited.costComplete=true
                                this.cards[a].setCost(0,[0])
                                this.cards[a].discardEffect.splice(this.cards[a].discardEffect.indexOf(13),1)
                            }else if(this.cards[a].discardEffect.includes(14)){
                                this.cards[a].spec.push(34)
                                this.cards[a].spec.push(60)
                                this.cards[a].additionalSpec.push(60)
                                this.cards[a].usable=true
                                this.cards[a].discardEffect.splice(this.cards[a].discardEffect.indexOf(14),1)
                            }else if(this.cards[a].discardEffect.includes(15)){
                                this.cards[a].spec.push(60)
                                this.cards[a].additionalSpec.push(60)
                                this.cards[a].usable=true
                                this.cards[a].discardEffect.splice(this.cards[a].discardEffect.indexOf(14),1)
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
                                this.cards[a].setCost(0,[0])
                                this.cards[a].discardEffect=hold
                                this.cards[a].discardEffect.splice(this.cards[a].discardEffect.indexOf(4),1)
                            }else if(this.cards[a].discardEffect.includes(17)){
                                let hold=this.cards[a].discardEffect
                                this.cards[a]=this.battle.cardManagers[this.player].transformCardPrism(this.cards[a])
                                this.cards[a]=upgradeCard(this.cards[a])
                                this.generalUpgrade(this.cards[a])
                                this.cards[a].discardEffect=hold
                                this.cards[a].discardEffect.splice(this.cards[a].discardEffect.indexOf(17),1)
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
                                }else if(this.cards[a].discardEffect.includes(19)){
                                    this.cards[a].discardEffect.splice(this.cards[a].discardEffect.indexOf(19))
                                    this.send(this.cards,a,a+1,1)
                                }else{
                                    this.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1,15)
                                }
                                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].activateRewind()
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
                                this.cards[a].setCost(0,[0])
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
                            }else if(this.cards[a].discardEffect.includes(16)){
                                this.cards[a].discardEffect=[]
                                this.send(this.cards,a,a+1,2)
                                a--
                                la--
                            }else if(this.cards[a].discardEffect.includes(18)){
                                this.cards[a].discardEffect=[]
                                this.cards[a].evolve++
                                this.cards[a].callEvolveEffect()
                                this.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1,11)
                                a--
                                la--
                            }else{
                                this.cards[a].discardEffect=[]
                            }
                        }else if(
                            (
                                this.cards[a].attack==1031||this.cards[a].attack.length==2&&this.cards[a].attack[0]==1189||this.cards[a].attack==1739||this.cards[a].attack==1770||
                                this.cards[a].attack==1778||this.cards[a].attack==1893||this.cards[a].attack==2053||
                                (
                                    this.cards[a].attack==3371||this.cards[a].attack==5887||this.cards[a].attack==5888||this.cards[a].attack==5889||this.cards[a].attack==5890||
                                    this.cards[a].attack==6434||this.cards[a].attack==6673||this.cards[a].attack==6680||this.cards[a].attack==6852
                                )&&!this.cards[a].usable||
                                this.cards[a].spec.includes(12)&&this.cards[a].attack[this.cards[a].characteristic]==1366
                            )&&!this.cards[a].exhaust
                        ){
                            this.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1)
                            a--
                            la--
                        }else if(
                            (
                                this.cards[a].attack==1248||this.cards[a].attack==1333||this.cards[a].attack==1348||this.cards[a].attack==1384||this.cards[a].attack==1401||
                                this.cards[a].attack==1405||this.cards[a].attack==1443||this.cards[a].attack==1444||this.cards[a].attack==1455||this.cards[a].attack==1485||
                                this.cards[a].attack==1504||this.cards[a].attack==1616||this.cards[a].attack==1622||this.cards[a].attack==1623||this.cards[a].attack==1625||
                                this.cards[a].attack==1626||this.cards[a].attack==1627||this.cards[a].attack==1628||this.cards[a].attack==1630||this.cards[a].attack==1635||
                                this.cards[a].attack==1649||this.cards[a].attack==1650||this.cards[a].attack==1654||this.cards[a].attack==1655||this.cards[a].attack==1740||
                                this.cards[a].attack==1753||this.cards[a].attack==1777||this.cards[a].attack==1788||this.cards[a].attack==1806||this.cards[a].attack==1821||
                                this.cards[a].attack==1852||this.cards[a].attack==1856||this.cards[a].attack==1857||this.cards[a].attack==1868||this.cards[a].attack==1909||
                                this.cards[a].attack==1813||this.cards[a].attack==1921||this.cards[a].attack==1944||this.cards[a].attack==2470||this.cards[a].attack==3196||
                                this.cards[a].attack==4754||this.cards[a].attack==4805||this.cards[a].attack==4806||this.cards[a].attack==4807||this.cards[a].attack==4808||
                                this.cards[a].attack==4833||this.cards[a].attack==4834||
                                this.cards[a].attack==1642&&this.battle.attackManager.energy==4||
                                this.cards[a].attack==4772&&this.battle.attackManager.mtgEnergy.length==4||
                                (this.cards[a].attack==587||this.cards[a].attack==676)&&this.battle.combatantManager.constructAlive(this.player+1)&&!options.oldUnbuild||
                                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Hook')>0&&this.cards[a].getCost(0)>0&&this.battle.turn.main==this.player
                            )&&!this.cards[a].exhaust
                        ){
                            this.send(this.cards,a,a+1,2)
                            a--
                            la--
                        }else if(this.cards[a].exhaust){
                            this.generalExhaust(a)
                            a--
                            la--
                        }else if(this.status[5]>0){
                            this.cards[a].discardEffect=[]
                            this.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1,22)
                            a--
                            la--
                            this.status[5]--
                        }else{
                            if(this.cards[a].discardEffectBuffered.includes(0)||this.battle.relicManager.hasRelic(195,this.player)&&!this.cards[a].usable&&floor(random(0,4))==0){
                                this.cards[a]=upgradeCard(this.cards[a])
                                this.generalUpgrade(this.cards[a])
                                this.cards[a].usable=false
                                if(this.cards[a].discardEffectBuffered.includes(0)){
                                    this.cards[a].discardEffectBuffered.splice(this.cards[a].discardEffectBuffered.indexOf(0))
                                }
                            }
                            if(this.cards[a].discardEffectBuffered.includes(1)){
                                if(this.cards[a].spec.includes(60)){
                                    this.cards[a].spec.splice(this.cards[a].spec.indexOf(60))
                                }
                                if(this.cards[a].additionalSpec.includes(60)){
                                    this.cards[a].additionalSpec.splice(this.cards[a].additionalSpec.indexOf(60))
                                }
                                this.cards[a].discardEffectBuffered.splice(this.cards[a].discardEffectBuffered.indexOf(1),1)
                            }
                            if(this.cards[a].discardEffectBuffered.includes(2)){
                                if(this.cards[a].spec.includes(60)){
                                    this.cards[a].spec.splice(this.cards[a].spec.indexOf(60))
                                }
                                if(this.cards[a].additionalSpec.includes(60)){
                                    this.cards[a].additionalSpec.splice(this.cards[a].additionalSpec.indexOf(60))
                                }
                                this.cards[a].discardEffectBuffered.splice(this.cards[a].discardEffectBuffered.indexOf(2),1)
                                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.cards[a].position.x,this.cards[a].position.y,126,[20]))
                            }
                            if(this.cards[a].spec.includes(72)){
                                this.cards[a].spec.splice(this.cards[a].spec.indexOf(72))
                            }
                            if(this.battle.modded(160)&&!this.cards[a].usable){
                                this.cards[a]=unupgradeCard(this.cards[a])
                                this.generalUpgrade(this.cards[a])
                                this.cards[a].usable=false
                            }
                            if(this.cards[a].usable){
                                this.battle.cardManagers[this.player].greenDiff--
                                if(this.cards[a].usable){
                                    this.cards[a].callSpecDiscardEffect()
                                    if(this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Discard Block')>0){
                                        this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Discard Block'))
                                    }
                                    this.cards.forEach(card=>card.otherDiscard())
                                    if(this.cards[a].discardEffect.includes(16)){
                                        this.cards[a].discardEffect=[]
                                        this.send(this.cards,a,a+1,2)
                                        a--
                                        la--
                                        continue
                                    }else if(this.cards[a].exhaust){
                                        this.generalExhaust(a)
                                        a--
                                        la--
                                        continue
                                    }
                                }
                            }else{
                                let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                                if(userCombatant.getStatus('Play Evolve')>0&&this.cards[a].spec.includes(79)){
                                    this.cards[a].evolve++
                                    this.cards[a].callEvolveEffect()
                                }
                            }
                            let triplet=false
                            if(this.cards[a].discardEffectBuffered.includes(3)){
                                triplet=true
                                this.cards[a].discardEffectBuffered.splice(this.cards[a].discardEffectBuffered.indexOf(3))
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
        if(this.battle.attackManager.targetInfo[0]==1||this.battle.attackManager.targetInfo[0]==3||this.battle.attackManager.targetInfo[0]==4||this.battle.attackManager.targetInfo[0]==6||this.battle.attackManager.targetInfo[0]==11||this.battle.attackManager.targetInfo[0]==13||this.battle.attackManager.targetInfo[0]==15||this.battle.attackManager.targetInfo[0]==27||this.battle.attackManager.targetInfo[0]==31||this.battle.attackManager.targetInfo[0]==32||this.battle.attackManager.targetInfo[0]==60||this.battle.attackManager.targetInfo[0]==61||this.battle.attackManager.targetInfo[0]==65||this.battle.attackManager.targetInfo[0]==66){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6||this.battle.attackManager.targetInfo[0]==61||this.battle.attackManager.targetInfo[0]==65)&&
                    !(this.battle.attackManager.targetInfo[0]==61&&this.battle.combatantManager.getArea(this.battle.combatantManager.combatants[this.battle.attackManager.user].team,this.battle.tileManager.tiles[a].tilePosition,1).length>0)&&
                    !(this.battle.attackManager.targetInfo[0]==65&&this.battle.combatantManager.getArea(this.battle.combatantManager.combatants[this.battle.attackManager.user].team,this.battle.tileManager.tiles[a].tilePosition,1).length==0)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(this.battle.attackManager.targetInfo[0]==66?59:2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==2||this.battle.attackManager.targetInfo[0]==3||this.battle.attackManager.targetInfo[0]==5||this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==11||this.battle.attackManager.targetInfo[0]==22||this.battle.attackManager.targetInfo[0]==26||this.battle.attackManager.targetInfo[0]==30||this.battle.attackManager.targetInfo[0]==40||this.battle.attackManager.targetInfo[0]==45||this.battle.attackManager.targetInfo[0]==52||this.battle.attackManager.targetInfo[0]==53||this.battle.attackManager.targetInfo[0]==62||this.battle.attackManager.targetInfo[0]==63||this.battle.attackManager.targetInfo[0]==64){
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].life>0&&(this.battle.combatantManager.combatants[a].team!=this.battle.combatantManager.combatants[this.battle.attackManager.user].team||this.battle.attackManager.targetInfo[0]==45)&&
                    (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5||this.battle.attackManager.targetInfo[0]==45)&&
                    !(this.battle.attackManager.targetInfo[0]==22&&this.battle.combatantManager.combatants[a].tilePosition.y!=this.battle.attackManager.tilePosition.y)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<constants.targetRadius){
                    this.selfCall(this.battle.attackManager.targetInfo[0]==63||this.battle.attackManager.targetInfo[0]==64?46:3,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==4||this.battle.attackManager.targetInfo[0]==20){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&legalTargetCombatant(1,1,2,this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)&&dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==7){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    legalTargetCombatant(0,1,this.battle.getActiveEnergy(this.battle.attackManager.player)+this.battle.attackManager.targetInfo[1]+this.battle.getXBoost(this.battle.attackManager.player),this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==8){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if((legalTargetCombatant(2,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles))&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==9){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==26||this.battle.attackManager.targetInfo[0]==59||this.battle.attackManager.targetInfo[0]==64){
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team==this.battle.combatantManager.combatants[this.battle.attackManager.user].team&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<constants.targetRadius){
                    this.selfCall(this.battle.attackManager.targetInfo[0]==64?46:3,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==12||this.battle.attackManager.targetInfo[0]==13||this.battle.attackManager.targetInfo[0]==47){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetDiagonalCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    !(this.battle.attackManager.targetInfo[0]==47&&this.battle.tileManager.tiles[a].tilePosition.y-this.battle.tileManager.tiles[a].tilePosition.x*2!=this.battle.attackManager.tilePosition.y-this.battle.attackManager.tilePosition.x*2)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==14||this.battle.attackManager.targetInfo[0]==15||this.battle.attackManager.targetInfo[0]==48||this.battle.attackManager.targetInfo[0]==52||this.battle.attackManager.targetInfo[0]==53||this.battle.attackManager.targetInfo[0]==59){
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team!=this.battle.combatantManager.combatants[this.battle.attackManager.user].team&&
                    (legalTargetDiagonalCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5)&&
                    !(this.battle.attackManager.targetInfo[0]==48&&this.battle.combatantManager.combatants[a].tilePosition.y-this.battle.combatantManager.combatants[a].tilePosition.x*2!=this.battle.attackManager.tilePosition.y-this.battle.attackManager.tilePosition.x*2)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<constants.targetRadius){
                    this.selfCall(3,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==16){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    this.battle.tileManager.getTileIndex(this.battle.tileManager.tiles[a].tilePosition.x+(this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x)/max(abs(this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x),abs(this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y)),this.battle.tileManager.tiles[a].tilePosition.y+(this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y)/max(abs(this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x),abs(this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y)))<0&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==17){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    this.battle.tileManager.tiles[a].tilePosition.y==this.battle.attackManager.tilePosition.y&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==18){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    this.battle.tileManager.tiles[a].type.includes(3)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==19){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].type.includes(3)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==21||this.battle.attackManager.targetInfo[0]==31){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (arrayIncludes(constants.L,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y]))&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==23||this.battle.attackManager.targetInfo[0]==49||this.battle.attackManager.targetInfo[0]==50){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if((this.battle.tileManager.tiles[a].type.includes(19)||this.battle.attackManager.targetInfo[0]==50)&&(this.battle.tileManager.tiles[a].occupied==0||this.battle.attackManager.targetInfo[0]==23||this.battle.attackManager.targetInfo[0]==50&&!this.battle.tileManager.tiles[a].type.includes(19))&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==24){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    (this.battle.tileManager.tiles[a].tilePosition.y!=this.battle.attackManager.tilePosition.y||this.battle.tileManager.tiles[a].tilePosition.x<this.battle.attackManager.tilePosition.x)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==25){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    (this.battle.tileManager.tiles[a].tilePosition.y!=this.battle.attackManager.tilePosition.y||this.battle.tileManager.tiles[a].tilePosition.x>this.battle.attackManager.tilePosition.x)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==27){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetDiagonalCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[3],this.battle.attackManager.targetInfo[4],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==28){
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team==this.battle.combatantManager.combatants[this.battle.attackManager.user].team&&this.battle.combatantManager.combatants[a].construct&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<constants.targetRadius){
                    this.selfCall(3,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==29){
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team==this.battle.combatantManager.combatants[this.battle.attackManager.user].team&&
                    (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<constants.targetRadius){
                    this.selfCall(3,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==30||this.battle.attackManager.targetInfo[0]==32||this.battle.attackManager.targetInfo[0]==40||this.battle.attackManager.targetInfo[0]==53){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[3],this.battle.attackManager.targetInfo[4],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    (this.battle.tileManager.tiles[a].type.includes(3)||this.battle.attackManager.targetInfo[0]!=32)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==33){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    this.battle.tileManager.tiles[a].tilePosition.y>=this.battle.attackManager.tilePosition.y&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==34){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)&&
                    this.battle.tileManager.tiles[a].tilePosition.y<=this.battle.attackManager.tilePosition.y&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==35||this.battle.attackManager.targetInfo[0]==36){
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].life>0&&
                    (legalTargetCombatant(0,this.battle.attackManager.targetInfo[2],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[3],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==36)&&
                    this.battle.combatantManager.combatants[a].name==this.battle.attackManager.targetInfo[1]&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<constants.targetRadius){
                    this.selfCall(3,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==37){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (arrayIncludes(constants.D1,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y]))&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==38){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (arrayIncludes(constants.D2,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y]))&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==39){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (arrayIncludes(constants.D3,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y]))&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==41){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (arrayIncludes(constants.HG1,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y]))&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==42){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (arrayIncludes(constants.HG2,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y]))&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==43){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (arrayIncludes(constants.HG3,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y]))&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==44){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(2,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles))&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==46){
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].life>0&&(
                    (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles))||
                    (legalTargetCombatant(0,this.battle.attackManager.targetInfo[3],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[4],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)&&this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].ammo>0))&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<constants.targetRadius){
                    this.selfCall(3,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==51){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    legalTargetCombatant(0,1,this.battle.turn.total+this.battle.attackManager.targetInfo[1]+this.battle.getXBoost(this.battle.attackManager.player),this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
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
                    dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<constants.targetRadius
                ){
                    this.selfCall(3,a)
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
                    dist(inputs.rel.x,inputs.rel.y,this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y)<constants.targetRadius
                ){
                    this.selfCall(3,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==56||this.battle.attackManager.targetInfo[0]==57||this.battle.attackManager.targetInfo[0]==58){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (
                        legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||
                        legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[3],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)&&
                        targetDirectionCombatant(0,this.battle.attackManager,this.battle.tileManager.tiles[a])%3==this.battle.attackManager.targetInfo[0]-56
                    )&&
                    dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==60){
            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                if(this.battle.tileManager.tiles[a].occupied==0&&legalTargetCombatant(3,1,2,this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)&&dist(inputs.rel.x,inputs.rel.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)<constants.targetRadius){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==0){
            switch(scene){
                case 'battle':
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},this.cards[a])&&!this.cards[a].deSizeDrop&&!(variants.polar&&this.pole!=this.cards[a].pole)){
                            for(let b=0,lb=this.listInput.length;b<lb;b++){
                                if(this.status[this.listInput[b][0]]!=0&&this.cards[a].usable){
                                    this.selfCall(this.listInput[b][1],a)
                                    a=la
                                    b=lb
                                }
                            }
                            if(a!=la&&this.cards[a].usable){
                                if(this.cards[a].spec.includes(48)){
                                    this.cards[a].spec.splice(this.cards[a].spec.indexOf(48))
                                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Freeze',1)
                                }else if(this.cards[a].spec.includes(39)){
                                    this.cards[a].spec.splice(this.cards[a].spec.indexOf(39))
                                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Burn',1)
                                }else if(this.battle.attackManager.attacks.length<=0&&this.cards[a].playable()){
                                    if(this.cards[a].afford){
                                        this.selfCall(0,a)
                                        break
                                    }else if(this.cards[a].spec.includes(35)&&variants.mtg){
                                        let effectiveCards=[]
                                        for(let a=0,la=this.cards.length;a<la;a++){
                                            if(this.cards[a].usable){
                                                effectiveCards.push(this.cards[a])
                                            }
                                        }
                                        let result=this.battle.mtgCountCost(this.cards[a].cost,this.player,effectiveCards)
                                        let energyPay=result[0]
                                        let costLeft=result[1]
                                        this.battle.mtgLose(this.player,energyPay)
                                        this.cards[a].cost=copyArray(costLeft)
                                        this.cards[a].onIncrementCountdown(energyPay)
                                    }else if(this.cards[a].spec.includes(35)&&!variants.mtg&&this.battle.getEnergy(this.player)>0&&this.cards[a].cost>0){
                                        let cost=this.cards[a].cost
                                        if(this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Double Countdowns')>0){
                                            this.cards[a].cost=max(0,this.cards[a].cost-this.battle.getEnergy(this.player)*2)
                                            this.battle.loseEnergy(min(this.battle.getEnergy(this.player),round(cost/2)),this.player)
                                        }else{
                                            this.cards[a].cost=max(0,this.cards[a].cost-this.battle.getEnergy(this.player))
                                            this.battle.loseEnergy(min(this.battle.getEnergy(this.player),round(cost)),this.player)
                                        }
                                        this.cards[a].onIncrementCountdown([])
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
                    this.selfCall(1,a)
                }
            }
        }
    }
    onKey(scene,key,code){
        if(this.battle.attackManager.targetInfo[0]==1||this.battle.attackManager.targetInfo[0]==3||this.battle.attackManager.targetInfo[0]==4||this.battle.attackManager.targetInfo[0]==6||this.battle.attackManager.targetInfo[0]==11||this.battle.attackManager.targetInfo[0]==13||this.battle.attackManager.targetInfo[0]==15||this.battle.attackManager.targetInfo[0]==27||this.battle.attackManager.targetInfo[0]==31||this.battle.attackManager.targetInfo[0]==32||this.battle.attackManager.targetInfo[0]==60||this.battle.attackManager.targetInfo[0]==61||this.battle.attackManager.targetInfo[0]==65||this.battle.attackManager.targetInfo[0]==66){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6||this.battle.attackManager.targetInfo[0]==61||this.battle.attackManager.targetInfo[0]==65)&&
                    !(this.battle.attackManager.targetInfo[0]==61&&this.battle.combatantManager.getArea(this.battle.combatantManager.combatants[this.battle.attackManager.user].team,this.battle.tileManager.tiles[a].tilePosition,1).length>0)&&
                    !(this.battle.attackManager.targetInfo[0]==65&&this.battle.combatantManager.getArea(this.battle.combatantManager.combatants[this.battle.attackManager.user].team,this.battle.tileManager.tiles[a].tilePosition,1).length==0)
                ){
                    this.selfCall(this.battle.attackManager.targetInfo[0]==66?59:2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==2||this.battle.attackManager.targetInfo[0]==3||this.battle.attackManager.targetInfo[0]==5||this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==11||this.battle.attackManager.targetInfo[0]==22||this.battle.attackManager.targetInfo[0]==26||this.battle.attackManager.targetInfo[0]==30||this.battle.attackManager.targetInfo[0]==40||this.battle.attackManager.targetInfo[0]==45||this.battle.attackManager.targetInfo[0]==52||this.battle.attackManager.targetInfo[0]==53||this.battle.attackManager.targetInfo[0]==62||this.battle.attackManager.targetInfo[0]==63||this.battle.attackManager.targetInfo[0]==64){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&key==' '){
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.battle.combatantManager.combatants[a].life>0&&(this.battle.combatantManager.combatants[a].team!=this.battle.combatantManager.combatants[this.battle.attackManager.user].team||this.battle.attackManager.targetInfo[0]==45)&&
                        (legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5||this.battle.attackManager.targetInfo[0]==45)&&
                        !(this.battle.attackManager.targetInfo[0]==22&&this.battle.combatantManager.combatants[a].tilePosition.y!=this.battle.attackManager.tilePosition.y)&&
                        this.battle.combatantManager.combatants[a].tilePosition.x==int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x&&this.battle.combatantManager.combatants[a].tilePosition.y==int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y){
                        this.selfCall(this.battle.attackManager.targetInfo[0]==63||this.battle.attackManager.targetInfo[0]==64?46:3,a)
                    }
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==4||this.battle.attackManager.targetInfo[0]==20){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&legalTargetCombatant(1,1,2,this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==7){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&legalTargetCombatant(0,1,this.battle.getActiveEnergy(this.battle.attackManager.player)+this.battle.attackManager.targetInfo[1]+this.battle.getXBoost(this.battle.attackManager.player),this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==8){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(legalTargetCombatant(2,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==9){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                this.selfCall(2,a)
            }
        }
        if(this.battle.attackManager.targetInfo[0]==10||this.battle.attackManager.targetInfo[0]==26||this.battle.attackManager.targetInfo[0]==59||this.battle.attackManager.targetInfo[0]==64){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&key==' '){
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team==this.battle.combatantManager.combatants[this.battle.attackManager.user].team&&
                        this.battle.combatantManager.combatants[a].tilePosition.x==int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x&&this.battle.combatantManager.combatants[a].tilePosition.y==int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y){
                        this.selfCall(this.battle.attackManager.targetInfo[0]==64?46:3,a)
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
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==14||this.battle.attackManager.targetInfo[0]==15||this.battle.attackManager.targetInfo[0]==48||this.battle.attackManager.targetInfo[0]==52||this.battle.attackManager.targetInfo[0]==53||this.battle.attackManager.targetInfo[0]==59){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&key==' '){
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team!=this.battle.combatantManager.combatants[this.battle.attackManager.user].team&&
                        (legalTargetDiagonalCombatant(0,this.battle.attackManager.targetInfo[1],(this.battle.relicManager.hasRelic(145,this.player)||this.battle.modded(64))?1:this.battle.attackManager.targetInfo[2],this.battle.combatantManager.combatants[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==5)&&
                        !(this.battle.attackManager.targetInfo[0]==48&&this.battle.combatantManager.combatants[a].tilePosition.y-this.battle.combatantManager.combatants[a].tilePosition.x*2!=this.battle.attackManager.tilePosition.y-this.battle.attackManager.tilePosition.x*2)&&
                        this.battle.combatantManager.combatants[a].tilePosition.x==int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x&&this.battle.combatantManager.combatants[a].tilePosition.y==int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y){
                        this.selfCall(3,a)
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
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==17){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&this.battle.tileManager.tiles[a].tilePosition.y==this.battle.attackManager.tilePosition.y&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==18){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    this.battle.tileManager.tiles[a].type.includes(3)&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==19){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].type.includes(3)){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==21||this.battle.attackManager.targetInfo[0]==31){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&arrayIncludes(constants.L,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y])){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==23){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].type.includes(19)){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==24){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&(this.battle.tileManager.tiles[a].tilePosition.y!=this.battle.attackManager.tilePosition.y||this.battle.tileManager.tiles[a].tilePosition.x<this.battle.attackManager.tilePosition.x)&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==25){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&(this.battle.tileManager.tiles[a].tilePosition.y!=this.battle.attackManager.tilePosition.y||this.battle.tileManager.tiles[a].tilePosition.x>this.battle.attackManager.tilePosition.x)&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==27){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (legalTargetDiagonalCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[3],this.battle.attackManager.targetInfo[4],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==28){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&key==' '){
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team==this.battle.combatantManager.combatants[this.battle.attackManager.user].team&&this.battle.combatantManager.combatants[a].construct&&
                        this.battle.combatantManager.combatants[a].tilePosition.x==int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x&&this.battle.combatantManager.combatants[a].tilePosition.y==int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y){
                        this.selfCall(3,a)
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
                        this.selfCall(3,a)
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
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==33){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&this.battle.tileManager.tiles[a].tilePosition.y>=this.battle.attackManager.tilePosition.y&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==34){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&this.battle.tileManager.tiles[a].tilePosition.y<=this.battle.attackManager.tilePosition.y&&
                    (legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||this.battle.attackManager.targetInfo[0]==6)){
                    this.selfCall(2,a)
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
                        this.selfCall(3,a)
                    }
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==37){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&arrayIncludes(constants.D1,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y])){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==38){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&arrayIncludes(constants.D2,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y])){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==39){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&arrayIncludes(constants.D3,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y])){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==41){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&arrayIncludes(constants.HG1,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y])){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==42){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&arrayIncludes(constants.HG2,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y])){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==43){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&arrayIncludes(constants.HG3,[this.battle.tileManager.tiles[a].tilePosition.x-this.battle.attackManager.tilePosition.x,this.battle.tileManager.tiles[a].tilePosition.y-this.battle.attackManager.tilePosition.y])){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==44){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&legalTargetCombatant(2,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)){
                    this.selfCall(2,a)
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
                        this.selfCall(3,a)
                    }
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==51){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&legalTargetCombatant(0,1,this.battle.turn.total+this.battle.attackManager.targetInfo[1]+this.battle.getXBoost(this.battle.attackManager.player),this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)){
                    this.selfCall(2,a)
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
                        this.selfCall(3,a)
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
                        this.selfCall(3,a)
                    }
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==56||this.battle.attackManager.targetInfo[0]==57||this.battle.attackManager.targetInfo[0]==58){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&
                    (
                        legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[2],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)||
                        legalTargetCombatant(this.battle.relicManager.active[150][this.battle.attackManager.player+1]>0?2:0,this.battle.attackManager.targetInfo[1],this.battle.attackManager.targetInfo[3],this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)&&
                        targetDirectionCombatant(0,this.battle.attackManager,this.battle.tileManager.tiles[a])%3==this.battle.attackManager.targetInfo[0]-56
                    )){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==60){
            if(int(inputs.lastKey[0])-1>=0&&int(inputs.lastKey[1])-1+this.battle.tileManager.offset.x>=0&&this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)>=0&&key==' '){
                let a=this.battle.tileManager.getTileIndex(int(inputs.lastKey[0])-1+this.battle.tileManager.offset.x,int(inputs.lastKey[1])-1+this.battle.tileManager.offset.y)
                if(this.battle.tileManager.tiles[a].occupied==0&&legalTargetCombatant(3,1,2,this.battle.tileManager.tiles[a],this.battle.attackManager,this.battle.tileManager.tiles)){
                    this.selfCall(2,a)
                }
            }
        }
        if(this.battle.attackManager.targetInfo[0]==0){
            switch(scene){
                case 'battle':
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if((int(key)+9)%10==a&&!this.cards[a].deSizeDrop&&!(variants.polar&&this.pole!=this.cards[a].pole)){
                            for(let b=0,lb=this.listInput.length;b<lb;b++){
                                if(this.status[this.listInput[b][0]]!=0&&this.cards[a].usable){
                                    this.selfCall(this.listInput[b][1],a)
                                    a=la
                                    b=lb
                                }
                            }
                            if(a!=la&&this.cards[a].usable){
                                if(this.cards[a].spec.includes(48)){
                                    this.cards[a].spec.splice(this.cards[a].spec.indexOf(48))
                                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Freeze',1)
                                }else if(this.cards[a].spec.includes(39)){
                                    this.cards[a].spec.splice(this.cards[a].spec.indexOf(39))
                                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Burn',1)
                                }else if(this.battle.attackManager.attacks.length<=0&&this.cards[a].playable()){
                                    if(this.cards[a].afford){
                                        if(variants.mtg&&this.lastMouseOver!=this.cards[a].id&&this.battle.attackManager.targetInfo[0]==0){
                                            this.lastMouseOver=this.cards[a].id
                                            if(!this.cards[a].specialCost){
                                                let effectiveCost=this.cards[a].editCost(this.cards[a].cost,0)
                                                let effectiveCards=[]
                                                for(let b=0,lb=this.cards.length;b<lb;b++){
                                                    if(this.cards[b].usable&&a!=b){
                                                        effectiveCards.push(this.cards[b])
                                                    }
                                                }
                                                if(!this.cards[a].free()){
                                                    this.battle.mtgMark(effectiveCost,this.player,effectiveCards)
                                                }
                                            }
                                        }
                                        this.selfCall(0,a)
                                        break
                                    }else if(this.cards[a].spec.includes(35)&&variants.mtg){
                                        let effectiveCards=[]
                                        for(let a=0,la=this.cards.length;a<la;a++){
                                            if(this.cards[a].usable){
                                                effectiveCards.push(this.cards[a])
                                            }
                                        }
                                        let result=this.battle.mtgCountCost(this.cards[a].cost,this.player,effectiveCards)
                                        let energyPay=result[0]
                                        let costLeft=result[1]
                                        let userCombatant=this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(player)]
                                        if(userCombatant.getStatus('Double Countdowns')>0){
                                            let last=-99
                                            for(let a=0,la=energyPay.length;a<la;a++){
                                                if(energyPay[a]==last){
                                                    energyPay.splice(a,1)
                                                    a--
                                                    la--
                                                    last=-99
                                                }else{
                                                    last=energyPay[a]
                                                }
                                            }
                                        }
                                        this.battle.mtgLose(this.player,energyPay)
                                        this.cards[a].cost=copyArray(costLeft)
                                        this.cards[a].onIncrementCountdown(energyPay)
                                    }else if(this.cards[a].spec.includes(35)&&!variants.mtg&&this.battle.getEnergy(this.player)>0&&this.cards[a].cost>0){
                                        let cost=this.cards[a].cost
                                        if(this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].getStatus('Double Countdowns')>0){
                                            this.cards[a].cost=max(0,this.cards[a].cost-this.battle.getEnergy(this.player)*2)
                                            this.battle.loseEnergy(min(this.battle.getEnergy(this.player),round(cost/2)),this.player)
                                        }else{
                                            this.cards[a].cost=max(0,this.cards[a].cost-this.battle.getEnergy(this.player))
                                            this.battle.loseEnergy(min(this.battle.getEnergy(this.player),round(cost)),this.player)
                                        }
                                        this.cards[a].onIncrementCountdown([])
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
                        this.selfCall(1,a)
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