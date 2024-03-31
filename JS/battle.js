class battle{
    constructor(layer,player){
        this.layer=layer
        this.player=player
        this.createBasic()
    }
    createBasic(){
        this.initialized=false
        this.menu={combatant:[1],deck:[0,0],anim:{combatant:[[],[]],deck:[[],[]],ascend:[],ascendDesc:[],ascendSingle:0,animRate:[],turnTime:[],variants:[],prismrule:[]}}
        for(let a=0,la=game.playerNumber;a<=la;a++){
            for(let b=0,lb=2;b<lb;b++){
                this.menu.anim.combatant[b].push(-1)
            }
        }
        for(let a=0,la=types.deckmode.length;a<=la;a++){
            for(let b=0,lb=2;b<lb;b++){
                this.menu.anim.deck[b].push(-1)
            }
        }
        for(let a=0,la=types.ascend.length;a<la;a++){
            this.menu.anim.ascend.push(-1)
            this.menu.anim.ascendDesc.push(-1)
        }
        for(let a=0,la=4;a<la;a++){
            this.menu.anim.animRate.push(-1)
            this.menu.anim.turnTime.push(-1)
        }
        for(let a=0,la=24;a<la;a++){
            this.menu.anim.variants.push(0)
        }
        for(let a=-2,la=game.playerNumber+6;a<la;a++){
            this.menu.anim.prismrule.push(0)
            variants.prismrule.push(a)
        }
        this.proxyPlayer=new combatant(this.layer,this,0,0,0,0,0,0,0,0,0,0)
        this.tutorialManager=new tutorialManager(this.layer,this)
        //this.tierManager=new tierManager(this.layer,this)
    }
    startGame(){
        game.player=[this.menu.combatant[0]]
        game.deck=[this.menu.deck[0]]
        if(this.menu.combatant[1]>0){
            game.player.push(this.menu.combatant[1])
            game.deck.push(this.menu.deck[1])
        }
        this.player=game.player
        this.deck=game.deck
        transition.trigger=true
        transition.scene='pack'
        this.altPhase=false
        this.create()
    }
    create(){
        graphics.combatant=[]
        constants.collisionDamage=4
        game.theme=0
        this.players=this.player.length
        this.initialGraphics()
        this.initialManagers()
        this.tileManager=new tileManager(this.layer,this)
        this.combatantManager=new combatantManager(this.layer,this)
        this.attackManager=new attackManager(this.layer,this)
        this.turnManager=new turnManager(this.layer,this)
        this.particleManager=new particleManager(this.layer,this)
        this.nodeManager=new nodeManager(this.layer,this)
        this.purchaseManager=new purchaseManager(this.layer,this)
        this.relicManager=new relicManager(this.layer,this)
        this.itemManager=new itemManager(this.layer,this)
        this.overlayManager=new overlayManager(this.layer,this,0)
        this.modManager=new modManager(this.layer,this)
        this.replayManager=new replayManager(this.layer,this)
        
        this.initialManagersAfter()
        this.initialized=true

        this.encounter={class:0,custom:[0,0]}
        this.currency={money:[],ss:[]}
        this.energy={main:[],gen:[],base:[],temp:[]}
        this.stats={node:[0,0,0,0,0,0,0,0],killed:[],earned:[],damage:[],block:[],move:[],drawn:[],played:[],taken:[],card:[],relic:[],item:[]}
        this.lastEncounter=types.encounter[0]
        
        this.turn={main:0,total:0,time:0,accelerate:0,endReady:false}
        this.counter={enemy:0,killed:0,turnPlayed:[0,0,0,0,0]}
        this.result={defeat:false,victory:false,noAnim:false}
        this.reinforce={back:[],front:[]}
        this.first=true

        this.colorDetail=[]
        
        this.initial()
    }
    initialManagers(){
        this.cardManagers=[]
        this.packManagers=[]
        this.optionManagers=[]
        this.perkManagers=[]
        this.eventManagers=[]
        for(let a=0,la=this.players;a<la;a++){
            this.cardManagers.push(new cardManager(this.layer,this,a))
            this.packManagers.push(new packManager(this.layer,this,a))
            this.optionManagers.push(new optionManager(this.layer,this,a))
            this.perkManagers.push(new perkManager(this.layer,this,a))
            this.eventManagers.push(new eventManager(this.layer,this,a))
            this.eventManagers[a].initial()
        }
        this.packManagers.forEach(packManager=>packManager.assemble())
        this.optionManagers.forEach(optionManager=>optionManager.assemble())
        this.perkManagers.forEach(perkManager=>perkManager.assemble())
    }
    initialManagersAfter(){
        this.cardManagers.forEach(cardManager=>cardManager.initialDeck())
    }
    initial(){
        this.combatantManager.clearCombatants()
        this.nodeManager.setupMap()
        this.resetAnim()
        for(let a=0,la=this.players;a<la;a++){
            this.addCombatant({x:0,y:0},this.player[a],a+1,0,false)

            this.colorDetail.push(types.color.card[this.player[a]])

            this.currency.money.push(game.ascend>=22?0:100)
            this.currency.ss.push(0)

            this.energy.main.push(0)
            this.energy.gen.push(0)
            this.energy.base.push(game.startEnergy)
            this.energy.temp.push(0)

            this.stats.killed.push(0)
            this.stats.earned.push(0)
            this.stats.damage.push(0)
            this.stats.block.push(0)
            this.stats.move.push(0)
            this.stats.drawn.push(0)
            this.stats.played.push([0,0,0,0,0])
            this.stats.taken.push([0,0,0])
            this.stats.card.push(0)
            this.stats.relic.push(0)
            this.stats.item.push(0)
        }
    }
    resetAnim(){
        this.anim={reserve:1,discard:1,dictionary:1,endTurn:1,cancel:1,extra:[],turn:[],drop:[],defeat:0,deck:[],dictionaryMulti:[],exit:1,sell:[],food:[],afford:[],upAfford:false,reroll:[],rerollActive:[]}
        for(let a=0,la=this.players;a<la;a++){
            this.anim.extra.push(0)
            this.anim.turn.push(0)
            this.anim.drop.push(1)
            this.anim.deck.push(1)
            this.anim.dictionaryMulti.push(1)
            this.anim.sell.push(1)
            this.anim.food.push(1)
            this.anim.afford.push(1)
            this.anim.reroll.push(1)
            this.anim.rerollActive.push(1)
        }
    }
    initialGraphics(){
        this.graphics={combatants:[]}
        for(let a=0,la=10;a<la;a++){
            if(
                a==0&&this.player.includes(2)||
                a==1&&this.player.includes(3)||
                a==2&&this.player.includes(4)||
                a==3&&this.player.includes(7)||
                a==4&&this.player.includes(8)
            ){
                setupCombatantGraphics(a)
            }else{
                graphics.combatant.push(-1)
            }
        }
        for(let a=0,la=options.preGen.length;a<la;a++){
            setupCombatantGraphics(options.preGen[a])
        }
        for(let a=0,la=graphics.backgroundGen;a<la;a++){
            this.graphics.combatants.push([[],[]])
            for(let b=0,lb=this.players;b<lb;b++){
                this.graphics.combatants[a][0].push(setupCombatantBackground(a,this.player,b,lb,[0],this.layer))
                if(options.damage){
                    this.graphics.combatants[a][1].push(setupCombatantBackground(a,this.player,b,lb,[1],this.layer))
                }
            }
        }
    }
    replay(){
        transition.trigger=true
        transition.scene='replay'
        transition.convert=true
        this.replayManager.reset()
    }
    convert(scene){
        switch(scene){
            case 'replay':
                this.combatantManager.proxyCombatants()
                this.setupBattle(this.lastEncounter,false)
                this.result.victory=true
                this.updateTargetting()
            break
            case 'battle':
                this.combatantManager.deproxyCombatants()
                this.updateTargetting()
            break
            case 'title':
                this.tutorialManager.active=false
            break
        }
    }
    endReplay(){
        transition.trigger=true
        transition.scene='battle'
        transition.convert=true
        this.overlayManager.closeElse([0])
    }
    setupBattle(encounter,first=true){
        this.lastEncounter=encounter
        this.encounter.class=encounter.class
        for(let a=0,la=this.energy.base.length;a<la;a++){
            this.energy.gen[a]=this.energy.base[a]
        }
        this.turn={main:0,total:0,time:0,accelerate:0}
        this.counter={enemy:0,killed:0,turnPlayed:[0,0,0,0,0]}
        this.result={defeat:false,victory:false,noAnim:false}
        this.reinforce={back:[],front:[]}
        this.first=first

        game.collisionDamage=constants.collisionDamage

        this.tileManager.generateTiles(types.level[findName(encounter.level[floor(random(0,encounter.level.length))],types.level)])
        this.combatantManager.resetCombatants()
        
        this.resetAnim()
        for(let a=0,la=this.players;a<la;a++){
            let playerCombatant=this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)]
            if(playerCombatant.life<=0){
                this.positionCombatant(playerCombatant,{x:-1,y:-1})
            }else{
                if(playerCombatant.dead){
                    playerCombatant.revive()
                }
                this.positionCombatant(playerCombatant,{x:encounter.player.position[la-1][a].x,y:encounter.player.position[la-1][a].y})
            }
        }
        for(let a=0,la=encounter.enemy.length;a<la;a++){
            if(this.modded(1)&&floor(random(0,2))==0){
                this.reinforce.back.push({position:{x:encounter.enemy[a].position.x,y:encounter.enemy[a].position.y},name:encounter.enemy[a].name,turn:1,minion:false})
                this.quickReinforce(encounter.enemy[a].name)
            }else{
                this.addCombatant(encounter.enemy[a].position,findName(encounter.enemy[a].name,types.combatant),0,0,false)
            }
            this.counter.enemy++
        }
        for(let a=0,la=encounter.reinforce.length;a<la;a++){
            this.reinforce.back.push({position:{x:encounter.reinforce[a].position.x,y:encounter.reinforce[a].position.y},name:encounter.reinforce[a].name,turn:encounter.reinforce[a].turn,minion:false})
            this.counter.enemy++
        }
        for(let a=0,la=this.cardManagers.length;a<la;a++){
            this.cardManagers[a].reset()
            this.cardManagers[a].clear()
            this.cardManagers[a].copyAntiInnate(0,1,0)
            this.cardManagers[a].standardBase()
            this.cardManagers[a].shuffle(1)
            this.cardManagers[a].copyAntiInnate(0,1,1)
        }
        this.combatantManager.deTargetCombatants()
        if(this.modded(21)&&this.encounter.class==0){
            this.combatantManager.equalize()
        }
        if(this.modded(33)&&this.encounter.class==0){
            this.combatantManager.allEffect(3,[this.counter.enemy])
        }
        if(this.modded(147)){
            this.combatantManager.allEffect(26,[])
        }
        this.attackManager.clear()
        this.turnManager.clear()
        this.particleManager.clear()
        if(this.encounter.class==0&&!this.modded(10)){
            if(this.first){
                let tile=this.tileManager.getRandomTilePosition()
                this.encounter.custom=tile==-1?[0,0]:[constrain(floor(random(-3,5)),0,4),tile]
            }
            if(this.encounter.custom[0]>0){
                let list=['Medic','Smith','Navigator','Rich Kid']
                this.addCombatantSupport(this.encounter.custom[1],findName(list[this.encounter.custom[0]-1],types.combatant),this.players+1,-30+floor(random(0,6))*60,false)
                this.combatantManager.recount()
            }
        }
        if(this.modded(51)){
            let tile=this.tileManager.getRandomTilePosition()
            this.addCombatant(tile,findName('Sentry',types.combatant),0,0,false)
            this.counter.enemy++
            this.combatantManager.recount()
        }
        if(this.modded(78)&&(this.encounter.class==1||this.encounter.class==2)){
            let tile=this.tileManager.getRandomTilePosition()
            this.addCombatant(tile,findName('Bodyguard',types.combatant),0,0,false)
            this.combatantManager.recount()
        }
        this.combatantManager.setTargets()
        this.combatantManager.reID()
        if(this.modded(63)&&floor(random(0,2))==0){
            this.tileManager.activate()
            this.sendReinforce()
            this.tileManager.fire()
            this.turnManager.loadEnemyTurns()
            this.replayManager.list.push(new attack(-1005,this,0,[],0,0,0,0,0,0,0,0,0,{replay:1,direction:-999}))
            this.combatantManager.enableCombatants()
            this.turn.main=this.players
        }else{
            this.startTurn()
        }
    }
    setupRest(){
        this.optionManagers.forEach(optionManager=>optionManager.reset())
        this.combatantManager.resetCombatants()
    }
    setupShop(){
        this.purchaseManager.setup(0)
        this.purchaseManager.rerollActive=[false,false]
    }
    setupStash(){
        this.relicManager.setupStash()
        this.combatantManager.resetCombatants()
    }
    setupBossStash(){
        this.relicManager.setupBossStash()
        this.combatantManager.resetCombatants()
    }
    setupEvent(){
        this.eventManagers.forEach(eventManager=>eventManager.pickEvent())
        this.eventManagers.forEach(eventManager=>eventManager.setup())
        this.combatantManager.resetCombatants()
    }
    setupSpecificEvent(event){
        this.eventManagers.forEach(eventManager=>eventManager.event=event)
        this.eventManagers.forEach(eventManager=>eventManager.setup())
        this.combatantManager.resetCombatants()
    }
    setupStats(){
        this.overlayManager.closeAll()
        this.overlayManager.overlays[11].forEach(overlay=>overlay.active=true)
    }
    nextWorld(){
        this.nodeManager.nextWorld()
    }
    addCombatant(position,type,team,direction,minion){
        let truePosition=this.tileManager.getTilePosition(position.x,position.y)
        let relativePosition=this.tileManager.getTileRelativePosition(position.x,position.y)
        this.combatantManager.addCombatant(truePosition.x,truePosition.y,relativePosition.x,relativePosition.y,position.x,position.y,type,team,direction==0?(this.tileManager.getTileRelativeDirection(position.x,position.y,round((this.tileManager.width-1)/2),round((this.tileManager.height-1)/2))+random(-10,10)):direction,minion)
    }
    addCombatantSupport(position,type,team,direction,minion){
        let truePosition=this.tileManager.getTilePosition(position.x,position.y)
        let relativePosition=this.tileManager.getTileRelativePosition(position.x,position.y)
        this.combatantManager.addCombatantSupport(truePosition.x,truePosition.y,relativePosition.x,relativePosition.y,position.x,position.y,type,team,direction==0?(this.tileManager.getTileRelativeDirection(position.x,position.y,round((this.tileManager.width-1)/2),round((this.tileManager.height-1)/2))+random(-10,10)):direction,minion)
    }
    positionCombatant(combatant,position){
        if(position.x==-1){
            combatant.position={x:-100,y:-100}
            combatant.relativePosition={x:-100,y:-100}
            combatant.anim.direction=30
        }else{
            combatant.position={x:this.tileManager.getTilePosition(position.x,position.y).x,y:this.tileManager.getTilePosition(position.x,position.y).y}
            combatant.relativePosition={x:this.tileManager.getTileRelativePosition(position.x,position.y).x,y:this.tileManager.getTileRelativePosition(position.x,position.y).y}
            combatant.anim.direction=round(this.tileManager.getTileRelativeDirection(position.x,position.y,round((this.tileManager.width-1)/2),round((this.tileManager.height-1)/2))/60-1/2)*60+30
        }
        combatant.tilePosition={x:position.x,y:position.y}
        combatant.goal.anim.direction=combatant.anim.direction
    }
    quickReinforce(name){
        let empty=this.tileManager.getEmptyTiles()
        if(empty.length>0){
            let index=empty[floor(random(0,empty.length))]
            this.reinforce.front.push({position:this.tileManager.tiles[index].tilePosition,name:name,minion:true})
            this.tileManager.tiles[index].reinforce=true
            this.counter.enemy++
        }
    }
    longReinforce(name,time){
        let empty=this.tileManager.getEmptyTiles()
        if(empty.length>0){
            let index=empty[floor(random(0,empty.length))]
            this.reinforce.back.push({position:this.tileManager.tiles[index].tilePosition,name:name,turn:this.turn.total+time,minion:true})
            this.counter.enemy++
        }
    }
    quickReinforceCorner(name1,name2,amount,size){
        for(let a=0,la=amount;a<la;a++){
            let index=this.tileManager.getTileIndex(size*(1+transformDirection(0,a*60-150)[0]),size*(1+transformDirection(0,a*60-150)[1]))
            if(index>=0){
                this.reinforce.front.push({position:{x:size*(1+transformDirection(0,a*60-150)[0]),y:size*(1+transformDirection(0,a*60-150)[1])},name:floor(random(0,5))==0?name2:name1,minion:true})
                this.tileManager.tiles[index].reinforce=true
                this.counter.enemy++
            }
        }
    }
    clearReinforce(){
        this.counter.enemy-=this.reinforce.back.length+this.reinforce.front.length
        this.reinforce={back:[],front:[]}
    }
    loadReinforce(){
        for(let a=0,la=this.reinforce.back.length;a<la;a++){
            if(this.turn.total+this.turn.accelerate>=this.reinforce.back[a].turn){
                this.reinforce.front.push({position:{x:this.reinforce.back[a].position.x,y:this.reinforce.back[a].position.y},name:this.reinforce.back[a].name,minion:this.reinforce.back[a].minion})
                this.tileManager.tiles[this.tileManager.getTileIndex(this.reinforce.back[a].position.x,this.reinforce.back[a].position.y)].reinforce=true
                this.reinforce.back.splice(a,1)
                a--
                la--
            }
        }
    }
    sendReinforce(){
        for(let a=0,la=this.reinforce.front.length;a<la;a++){
            if(this.tileManager.tiles[this.tileManager.getTileIndex(this.reinforce.front[a].position.x,this.reinforce.front[a].position.y)].occupied==0){
                this.addCombatant(this.reinforce.front[a].position,findName(this.reinforce.front[a].name,types.combatant),0,1,this.reinforce.front[a].minion)
                this.tileManager.activate()
                this.tileManager.tiles[this.tileManager.getTileIndex(this.reinforce.front[a].position.x,this.reinforce.front[a].position.y)].reinforce=false
                this.reinforce.front.splice(a,1)
                a--
                la--
            }else{
                this.tileManager.tiles[this.tileManager.getTileIndex(this.reinforce.front[a].position.x,this.reinforce.front[a].position.y)].reinforce=false
                let empty=this.tileManager.getEmptyTiles()
                if(empty.length>0){
                    let tile=empty[floor(random(0,empty.length))]
                    this.reinforce.front[a].position={x:this.tileManager.tiles[tile].tilePosition.x,y:this.tileManager.tiles[tile].tilePosition.y}
                    this.tileManager.tiles[tile].reinforce=true
                }
            }
        }
    }
    activate(type,id){
        this.tileManager.activate()
        this.combatantManager.activateCombatants(type,id)
        this.tileManager.activateTiles(type,id)
        this.updateTargetting()
    }
    activateCombatant(type,id){
        this.tileManager.activate()
        this.combatantManager.activateCombatants(type,id)
        this.updateTargetting()
    }
    activateTile(type,id){
        this.tileManager.activate()
        this.tileManager.activateTiles(type,id)
        this.updateTargetting()
    }
    updateTargetting(){
        this.tileManager.unTargetTiles()
        this.tileManager.retargetTiles()
        this.combatantManager.targetCombatants()
    }
    drop(player,type,level,color){
        if(player<this.cardManagers.length){
            if(this.cardManagers[player].discard.add(type,level,color)){
                if(this.modded(70)&&!this.cardManagers[player].discard.cards[this.cardManagers[player].discard.cards.length-1].spec.includes(5)){
                    this.cardManagers[player].discard.cards[this.cardManagers[player].discard.cards.length-1].spec.push(5)
                }
            }
            this.cardManagers[player].drop.addDrop(type,level,color)
        }
    }
    dropDraw(player,type,level,color){
        if(player<this.cardManagers.length){
            if(this.cardManagers[player].reserve.add(type,level,color)){
                if(this.modded(70)&&!this.cardManagers[player].reserve.cards[this.cardManagers[player].reserve.cards.length-1].spec.includes(5)){
                    this.cardManagers[player].reserve.cards[this.cardManagers[player].reserve.cards.length-1].spec.push(5)
                }
            }
            this.cardManagers[player].drop.addDrop(type,level,color)
        }
    }
    dropDrawShuffle(player,type,level,color){
        if(player<this.cardManagers.length){
            if(this.cardManagers[player].reserve.addShuffle(type,level,color)){
                if(this.modded(70)&&!this.cardManagers[player].reserve.cards[this.cardManagers[player].reserve.cardShuffledIndex].spec.includes(5)){
                    this.cardManagers[player].reserve.cards[this.cardManagers[player].reserve.cardShuffledIndex].spec.push(5)
                }
            }
            this.cardManagers[player].drop.addDrop(type,level,color)
        }
    }
    dropDrawShuffleEffect(player,type,level,color,index,effect){
        if(player<this.cardManagers.length){
            if(this.cardManagers[player].reserve.addShuffleEffect(type,level,color,index,effect)){
                if(this.modded(70)&&!this.cardManagers[player].reserve.cards[this.cardManagers[player].reserve.cardShuffledIndex].spec.includes(5)){
                    this.cardManagers[player].reserve.cards[this.cardManagers[player].reserve.cardShuffledIndex].spec.push(5)
                }
            }
            this.cardManagers[player].drop.addDrop(type,level,color)
        }
    }
    dropAll(type,level,color){
        for(let a=0,la=this.cardManagers.length;a<la;a++){
            if(this.cardManagers[a].discard.add(type,level,color)){
                if(this.modded(70)&&!this.cardManagers[a].discard.cards[this.cardManagers[a].discard.cards.length-1].spec.includes(5)){
                    this.cardManagers[a].discard.cards[this.cardManagers[a].discard.cards.length-1].spec.push(5)
                }
            }
            this.cardManagers[a].drop.addDrop(type,level,color)
        }
    }
    endTurn(){
        this.turn.endReady=false
        this.replayManager.list.push(new attack(-1000,this,0,[],0,0,0,0,0,0,0,0,0,{replay:1,direction:-999}))
        this.combatantManager.tickEarly()
        this.relicManager.activate(14,[this.turn.main,this.energy.main[this.turn.main]])
        this.cardManagers[this.turn.main].allEffect(2,1)
        this.relicManager.activate(9,[this.turn.total,this.turn.main])
        if(this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(this.turn.main)].getStatus('Extra Turn')>0){
            let combatant=this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(this.turn.main)]
            combatant.status.main[findList('Extra Turn',combatant.status.name)]--
            this.energy.main[this.turn.main]=max(0,this.relicManager.hasRelic(28,this.turn.main)&&this.turn.total>1&&this.energy.main[this.turn.main]>=1?this.energy.gen[this.turn.main]+1:this.energy.gen[this.turn.main]+this.energy.temp[this.turn.main])-(this.modded(5)?max(3-this.turn.total,0):0)
            this.energy.temp[this.turn.main]=0
        }else{
            this.cardManagers[this.turn.main].reset()
            this.turn.main++
        }
        if(this.turn.main>=this.players){
            this.tileManager.activate()
            this.sendReinforce()
            this.tileManager.fire()
            this.turnManager.loadEnemyTurns()
            this.replayManager.list.push(new attack(-1005,this,0,[],0,0,0,0,0,0,0,0,0,{replay:1,direction:-999}))
            this.combatantManager.enableCombatants()
            this.replayManager.list.push(new attack(-1002,this,0,[],0,0,0,0,0,0,0,0,0,{replay:1,direction:-999}))
            this.combatantManager.tickA()
        }else{
            if(!this.tutorialManager.active){
                if(this.turn.total==1){
                    if(!this.relicManager.hasRelic(141,this.turn.main)){
                        this.cardManagers[this.turn.main].hand.add(findName('Initiative',types.card),0,0)
                    }
                    if(this.relicManager.hasRelic(107,this.turn.main)){
                        this.cardManagers[this.turn.main].hand.add(findName('Initiative',types.card),0,0)
                    }
                    if(this.nodeManager.world==3&&this.encounter.class==2){
                        this.cardManagers[this.turn.main].hand.add(findName('Rewrite',types.card),0,0)
                    }
                    this.cardManagers[this.turn.main].switchCheck()
                    if(variants.witch){
                        this.cardManagers[this.turn.main].hand.add(findName('Slot\nShift',types.card),0,0)
                    }
                }
                if((this.turn.total==1||!variants.witch)&&!variants.blackjack){
                    this.cardManagers[this.turn.main].turnDraw(this.turn.total)
                    if(this.turn.total==1){
                        this.cardManagers[this.turn.main].allEffect(0,48)
                    }
                    this.cardManagers[this.turn.main].allEffect(3,47)
                }else if(variants.witch){
                    this.cardManagers[this.turn.main].allEffect(3,42)
                }
            }
            this.cardManagers[this.turn.main].allEffect(3,39)
            this.cardManagers[this.turn.main].regenDrops()
            this.relicManager.activate(2,[this.turn.total,this.turn.main,this.counter.turnPlayed])
            this.turn.time=game.turnTime
            this.counter.turnPlayed=[0,0,0,0,0]
        }
        this.attackManager.clear()
        this.updateTargetting()
        if(this.combatantManager.combatants[this.turn.main].life<=0&&this.turn.main<this.players){
            this.endTurn()
        }
    }
    setTurn(value){
        this.turn.total=value
        for(let a=0,la=this.players;a<la;a++){
            this.cardManagers[a].allGroupEffect(63)
        }
    }
    startTurn(){
        if(this.modded(109)){
            this.combatantManager.allEffect(7,[this.counter.enemy-this.counter.killed-1])
        }
        if(this.modded(110)){
            this.combatantManager.allEffect(6,[2*(this.counter.enemy-this.counter.killed-1)])
        }
        if(this.modded(137)&&floor(random(0,20))==0){
            for(let a=0,la=this.nodeManager.world+1;a<la;a++){
                this.quickReinforce('Management Robot')
            }
        }
        this.turn.main=0
        this.setTurn(this.turn.total+1)
        this.turn.time=game.turnTime
        for(let a=0,la=this.energy.gen.length;a<la;a++){
            this.energy.main[a]=max(0,this.relicManager.hasRelic(28,a)&&this.turn.total>1&&this.energy.main[a]>=1?this.energy.gen[a]+1:this.energy.gen[a]+this.energy.temp[a])-(this.modded(5)?max(3-this.turn.total,0):0)
            this.energy.temp[a]=0
        }
        this.combatantManager.setupCombatants()
        this.replayManager.list.push(new attack(-1004,this,0,[],0,0,0,0,0,0,0,0,0,{replay:1,direction:-999}))
        if(this.turn.total>1){
            this.replayManager.list.push(new attack(-1003,this,0,[],0,0,0,0,0,0,0,0,0,{replay:1,direction:-999}))
            this.combatantManager.tickB()
        }
        this.combatantManager.unmoveCombatants()
        this.combatantManager.resetCombatantsAnim()
        this.tileManager.activate()
        if(this.turn.total>1){
            this.tileManager.tick()
        }
        this.combatantManager.activateCombatants(0,0)
        this.updateTargetting()
        this.turnManager.clear()
        if(!this.tutorialManager.active){
            if(this.turn.total==1){
                if(!this.relicManager.hasRelic(141,this.turn.main)){
                    this.cardManagers[this.turn.main].hand.add(findName('Initiative',types.card),0,0)
                }
                if(this.relicManager.hasRelic(107,this.turn.main)){
                    this.cardManagers[this.turn.main].hand.add(findName('Initiative',types.card),0,0)
                }
                if(this.nodeManager.world==3&&this.encounter.class==2){
                    this.cardManagers[this.turn.main].hand.add(findName('Rewrite',types.card),0,0)
                }
                this.cardManagers[this.turn.main].switchCheck()
                if(variants.witch){
                    this.cardManagers[this.turn.main].hand.add(findName('Slot\nShift',types.card),0,0)
                }
            }
            if((this.turn.total==1||!variants.witch)&&!variants.blackjack){
                this.cardManagers[this.turn.main].turnDraw(this.turn.total)
                if(this.turn.total==1){
                    this.cardManagers[this.turn.main].allEffect(0,48)
                }
                this.cardManagers[this.turn.main].allEffect(3,47)
            }else if(variants.witch){
                this.cardManagers[this.turn.main].allEffect(3,42)
            }
        }
        this.cardManagers[this.turn.main].allEffect(3,39)
        this.cardManagers[0].regenDrops()
        this.relicManager.activate(2,[this.turn.total,this.turn.main,this.counter.turnPlayed])
        this.relicManager.activate(0,[this.turn.total,this.encounter.class])
        this.counter.turnPlayed=[0,0,0,0,0]
        this.loadReinforce()
        if(this.combatantManager.combatants[this.turn.main].life<=0&&this.turn.main<this.players){
            this.endTurn()
        }else if(this.combatantManager.combatants[this.turn.main].getStatus('Distracted')>0){
            this.combatantManager.combatants[this.turn.main].statusEffect('Distracted',-1)
            this.endTurn()
        }
    }
    playCard(card,player,mode){
        let cardClass=card.spec.includes(12)?card.class[mode]:card.class
        if(card.spec.includes(0)||card.spec.includes(12)&&card.reality[mode].includes(0)){
            this.cardManagers[player].fatigue()
        }
        if(card.spec.includes(16)||card.spec.includes(12)&&card.reality[mode].includes(16)){
            this.cardManagers[player].fatigue(true)
            this.cardManagers[player].fatigue(true)
        }
        if(card.spec.includes(14)||card.spec.includes(12)&&card.reality[mode].includes(14)){
            this.cardManagers[player].fatigue(true)
            this.cardManagers[player].fatigue(true)
            this.cardManagers[player].fatigue(true)
        }
        if(card.spec.includes(18)||card.spec.includes(12)&&card.reality[mode].includes(18)){
            for(let a=0,la=4;a<la;a++){
                this.cardManagers[player].fatigue(true)
            }
        }
        if(card.spec.includes(46)||card.spec.includes(12)&&card.reality[mode].includes(45)){
            for(let a=0,la=6;a<la;a++){
                this.cardManagers[player].fatigue(true)
            }
        }
        if(card.spec.includes(45)||card.spec.includes(12)&&card.reality[mode].includes(44)){
            for(let a=0,la=8;a<la;a++){
                this.cardManagers[player].fatigue(true)
            }
        }
        if(card.spec.includes(44)||card.spec.includes(12)&&card.reality[mode].includes(43)){
            for(let a=0,la=10;a<la;a++){
                this.cardManagers[player].fatigue(true)
            }
        }
        if(card.spec.includes(51)||card.spec.includes(12)&&card.reality[mode].includes(51)){
            for(let a=0,la=16;a<la;a++){
                this.cardManagers[player].fatigue(true)
            }
        }
        if(card.spec.includes(50)||card.spec.includes(12)&&card.reality[mode].includes(50)){
            for(let a=0,la=20;a<la;a++){
                this.cardManagers[player].fatigue(true)
            }
        }
        if(card.spec.includes(49)||card.spec.includes(12)&&card.reality[mode].includes(49)){
            for(let a=0,la=24;a<la;a++){
                this.cardManagers[player].fatigue(true)
            }
        }
        if(card.spec.includes(19)||card.spec.includes(12)&&card.reality[mode].includes(19)){
            this.cardManagers[player].heavyFatigue(true)
        }
        if(card.spec.includes(17)||card.spec.includes(12)&&card.reality[mode].includes(17)){
            for(let a=0,la=this.energy.main[player];a<la;a++){
                this.cardManagers[player].fatigue(true)
            }
        }
        if(card.spec.includes(22)||card.spec.includes(12)&&card.reality[mode].includes(22)){
            this.cardManagers[player].draw(1)
        }
        if(card.spec.includes(24)||card.spec.includes(12)&&card.reality[mode].includes(24)){
            this.cardManagers[player].draw(2)
        }
        if(card.spec.includes(32)||card.spec.includes(12)&&card.reality[mode].includes(32)){
            this.quickReinforce('Inconsistent')
        }
        if(this.modded(101)){
            this.cardManagers[player].hand.randomEffect(0)
            this.cardManagers[player].draw(1)
        }
        this.stats.played[player][0]++
        this.stats.played[player][cardClass]++
        this.counter.turnPlayed[0]++
        this.counter.turnPlayed[cardClass]++
        let userCombatant=this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(player)]
        switch(card.edition){
            case 1:
                userCombatant.heal(2)
            break
            case 2:
                userCombatant.addBlock(5)
            break
            case 3:
                userCombatant.statusEffect('Strength',1)
            break
            case 4:
                this.energy.main[player]++
            break
            case 5:
                this.cardManagers[player].draw(2)
            break
            case 6:
                this.attackManager.edition(6)
            break
        }
        switch(cardClass){
            case 1:
                if(userCombatant.getStatus('Must Attack or Take Damage')>0){
                    userCombatant.status.main[findList('Must Attack or Take Damage',userCombatant.status.name)]=0
                }
                if(userCombatant.getStatus('Attack Draw')>0){
                    this.cardManagers[player].draw(userCombatant.getStatus('Attack Draw'))
                }
            break
            case 4:
                if(userCombatant.getStatus('Power Draw')>0){
                    this.cardManagers[player].draw(userCombatant.getStatus('Power Draw'))
                }
                if(userCombatant.getStatus('Power Basic')>0){
                    userCombatant.holdOrb(0)
                }
            break
        }
        if(userCombatant.getStatus('Card Play Block')>0){
            userCombatant.addBlock(userCombatant.getStatus('Card Play Block'))
        }
        this.combatantManager.playCardFront()
        this.relicManager.activate(4,[cardClass,player,card.cost,card.rarity,card.name])
    }
    displayCurrency(){
        this.layer.fill(240,240,220)
        this.layer.noStroke()
        this.layer.ellipse(20,16,16,16)
        if(this.currency.money.length>1){
            this.layer.ellipse(this.layer.width-20,16,16,16)
        }
        this.layer.fill(220,220,200)
        this.layer.ellipse(20,16,10,10)
        if(this.currency.money.length>1){
            this.layer.ellipse(this.layer.width-20,16,10,10)
        }
        this.layer.fill(230,230,210)
        this.layer.textSize(16)
        this.layer.textAlign(LEFT,CENTER)
        this.layer.text(this.currency.money[0],30,18)
        if(this.currency.money.length>1){
            this.layer.textAlign(RIGHT,CENTER)
            this.layer.text(this.currency.money[1],this.layer.width-30,18)
        }
        this.layer.textAlign(CENTER,CENTER)
    }
    addCurrency(amount,player){
        let multi=this.relicManager.hasRelic(135,player)?0.5:1*this.relicManager.hasRelic(165,player)?1.25:1
        let bonus=this.relicManager.hasRelic(119,player)?20:0
        this.stats.earned[player]+=round((amount+bonus)*multi)
        if(this.cardManagers[player].deck.hasCard(findName('Social\nSecurity Card',types.card))){
            this.currency.ss[player]+=round((amount+bonus)*multi/2)
            this.currency.money[player]+=round((amount+bonus)*multi/2)
        }else{
            this.currency.money[player]+=round((amount+bonus)*multi)
        }
    }
    loseCurrency(amount,player){
        if(this.currency.money[player]>=0&&this.currency.money[player]-round(amount)<0&&!this.relicManager.hasRelic(187,player)){
            this.cardManagers[player].deck.add(findName('Debt',types.card),0,game.playerNumber+2)
        }
        this.currency.money[player]-=round(amount)
    }
    modded(type){
        return variants.mod?this.modManager.mods[type]:false
    }
    display(scene){
        switch(scene){
            case 'title':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
            break
            case 'menu':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
                for(let a=0,la=game.playerNumber;a<=la;a++){
                    if(this.menu.anim.combatant[0][a]>0&&a>0){
                        displayPlayerSymbol(this.layer,this.layer.width/2,this.layer.height*0.3+88.75,a,0,1,1)
                    }
                }
                for(let a=0,la=game.playerNumber;a<=la;a++){
                    if(this.menu.anim.combatant[0][a]>0){
                        this.layer.fill(255,this.menu.anim.combatant[0][a])
                        this.layer.textSize(10)
                        this.layer.text(a==0?'000_BLANK':`0${a<10?`0`:``}${a}_${types.combatant[a].name.toUpperCase()}`,this.layer.width/2,this.layer.height*0.65)
                        this.layer.textSize(9)
                        this.layer.text(types.combatant[a].moniker.toUpperCase(),this.layer.width/2,this.layer.height*0.65+40)
                    }
                }
                for(let a=0,la=types.deckmode.length;a<=la;a++){
                    if(this.menu.anim.deck[0][a]>0){
                        this.layer.fill(255,this.menu.anim.deck[0][a])
                        this.layer.textSize(types.deckmode[a].name.length>20?8:10)
                        this.layer.text(types.deckmode[a].name.toUpperCase(),this.layer.width/2,this.layer.height*0.65+80)
                    }
                }
                this.layer.fill(255,this.menu.anim.ascendSingle)
                this.layer.textSize(16)
                this.layer.text('Difficult Options',this.layer.width/2,30)
                this.layer.textSize(10)
                this.layer.text('Mouseover 0-30 to Learn More',this.layer.width/2,62.5)
                for(let a=0,la=types.ascend.length;a<la;a++){
                    if(this.menu.anim.ascend[a]>0){
                        this.layer.fill(255,0,0,this.menu.anim.ascend[a])
                        this.layer.ellipse(12.5+(this.layer.width-25)*(0.5+a)/la,102.5,10)
                    }
                    if(this.menu.anim.ascendDesc[a]>0){
                        this.layer.fill(255,this.menu.anim.ascendDesc[a])
                        this.layer.textSize(16)
                        this.layer.text(types.ascend[a].name,this.layer.width/2,30)
                        this.layer.textSize(10)
                        this.layer.text(types.ascend[a].desc,this.layer.width/2,62.5)
                    }
                }
                for(let a=0,la=this.menu.anim.animRate.length;a<la;a++){
                    if(this.menu.anim.animRate[a]>0){
                        this.layer.fill(255,0,0,this.menu.anim.animRate[a])
                        this.layer.rect(this.layer.width/2-287.5+a*75,this.layer.height-30,67.5,4)
                    }
                }
                for(let a=0,la=this.menu.anim.turnTime.length;a<la;a++){
                    if(this.menu.anim.turnTime[a]>0){
                        this.layer.fill(255,0,0,this.menu.anim.turnTime[a])
                        this.layer.rect(this.layer.width/2+62.5+a*75,this.layer.height-30,67.5,4)
                    }
                }
            break
            case 'menu2':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
                for(let a=0,la=game.playerNumber;a<=la;a++){
                    for(let b=0,lb=2;b<lb;b++){
                        if(this.menu.anim.combatant[b][a]>0&&a>0){
                            displayPlayerSymbol(this.layer,this.layer.width/4+b*this.layer.width/2,this.layer.height*0.3+88.75,a,0,1,this.menu.anim.combatant[b][a])
                        }
                    }
                }
                for(let a=0,la=game.playerNumber;a<=la;a++){
                    for(let b=0,lb=2;b<lb;b++){
                        if(this.menu.anim.combatant[b][a]>0){
                            this.layer.fill(255,this.menu.anim.combatant[b][a])
                            this.layer.textSize(10)
                            this.layer.text(a==0?'000_BLANK':`0${a<10?`0`:``}${a}_${types.combatant[a].name.toUpperCase()}`,this.layer.width/4+b*this.layer.width/2,this.layer.height*0.65)
                            this.layer.textSize(9)
                            this.layer.text(types.combatant[a].moniker.toUpperCase(),this.layer.width/4+b*this.layer.width/2,this.layer.height*0.65+40)
                        }
                    }
                }
                for(let a=0,la=types.deckmode.length;a<=la;a++){
                    for(let b=0,lb=2;b<lb;b++){
                        if(this.menu.anim.deck[b][a]>0){
                            this.layer.fill(255,this.menu.anim.deck[b][a])
                            this.layer.textSize(types.deckmode[a].name.length>20?8:10)
                            this.layer.text(types.deckmode[a].name.toUpperCase(),this.layer.width/4+b*this.layer.width/2,this.layer.height*0.65+80)
                        }
                    }
                }
                this.layer.fill(255,this.menu.anim.ascendSingle)
                this.layer.textSize(16)
                this.layer.text('Difficult Options',this.layer.width/2,30)
                this.layer.textSize(10)
                this.layer.text('Mouseover 0-30 to Learn More',this.layer.width/2,62.5)
                for(let a=0,la=types.ascend.length;a<la;a++){
                    if(this.menu.anim.ascend[a]>0){
                        this.layer.fill(255,0,0,this.menu.anim.ascend[a])
                        this.layer.ellipse(12.5+(this.layer.width-25)*(0.5+a)/la,102.5,10)
                    }
                    if(this.menu.anim.ascendDesc[a]>0){
                        this.layer.fill(255,this.menu.anim.ascendDesc[a])
                        this.layer.textSize(16)
                        this.layer.text(types.ascend[a].name,this.layer.width/2,30)
                        this.layer.textSize(10)
                        this.layer.text(types.ascend[a].desc,this.layer.width/2,62.5)
                    }
                }
                for(let a=0,la=this.menu.anim.animRate.length;a<la;a++){
                    if(this.menu.anim.animRate[a]>0){
                        this.layer.fill(255,0,0,this.menu.anim.animRate[a])
                        this.layer.rect(this.layer.width/2-287.5+a*75,this.layer.height-30,67.5,4)
                    }
                }
                for(let a=0,la=this.menu.anim.turnTime.length;a<la;a++){
                    if(this.menu.anim.turnTime[a]>0){
                        this.layer.fill(255,0,0,this.menu.anim.turnTime[a])
                        this.layer.rect(this.layer.width/2+62.5+a*75,this.layer.height-30,67.5,4)
                    }
                }
            break
            case 'variants':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.menu.anim.variants.length;a<la;a++){
                    if(this.menu.anim.variants[a]>0){
                        this.layer.fill(255,this.menu.anim.variants[a])
                        this.layer.ellipse(this.layer.width/2-107.5+a%2*350,this.layer.height/2-floor(la/2)*22.5+22.5+floor(a/2)*45,10)
                    }
                }
            break
            case 'custom':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
                for(let a=0,la=7;a<la;a++){
                    if(this.menu.anim.prismrule[a]>0){
                        this.layer.fill(255,this.menu.anim.prismrule[a])
                        this.layer.ellipse(this.layer.width/2-107.5,this.layer.height/2-190+a*45,10)
                    }
                }
                for(let a=0,la=game.playerNumber;a<la;a++){
                    if(this.menu.anim.prismrule[a+7]>0){
                        this.layer.fill(255,this.menu.anim.prismrule[a+7])
                        this.layer.ellipse(this.layer.width/2+242.5,this.layer.height/2-190+a*45,10)
                    }
                }
            break
            case 'tutorial':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
            break
            case 'battle':
                this.layer.background(110,115,120)
                for(let a=0,la=this.players;a<la;a++){
                    this.layer.fill(mergeColor([225,255,255],[255,0,0],this.anim.afford))
                    this.layer.stroke(mergeColor([200,255,255],[255,0,0],this.anim.afford))
                    this.layer.strokeWeight(3)
                    this.layer.quad(-90+this.anim.turn[a]*100,454,-74+this.anim.turn[a]*100,434,-58+this.anim.turn[a]*100,454,-74+this.anim.turn[a]*100,474)
                    this.layer.fill(this.colorDetail[a].fill)
                    this.layer.stroke(this.colorDetail[a].stroke)
                    this.layer.strokeWeight(3*this.anim.reserve)
                    this.layer.rect(-74+this.anim.turn[a]*100,494,32*this.anim.reserve,20*this.anim.reserve,5*this.anim.reserve)
                    this.layer.strokeWeight(3*this.anim.discard)
                    this.layer.rect(-74+this.anim.turn[a]*100,522,32*this.anim.discard,20*this.anim.discard,5*this.anim.discard)
                    this.layer.strokeWeight(3*this.anim.dictionary)
                    this.layer.rect(-74+this.anim.turn[a]*100,550,32*this.anim.dictionary,20*this.anim.dictionary,5*this.anim.dictionary)
                    this.layer.strokeWeight(3*this.anim.endTurn)
                    this.layer.rect(-74+this.anim.turn[a]*100,578,32*this.anim.endTurn,20*this.anim.endTurn,5*this.anim.endTurn)
                    this.layer.strokeWeight(3*this.anim.cancel)
                    this.layer.rect(-74+this.anim.extra[a]*100,414,32*this.anim.cancel,20*this.anim.cancel,5*this.anim.endTurn)
                    if(game.turnTime>0){
                        if(variants.altDraw||variants.blackjack){
                            this.layer.strokeWeight(3*this.anim.drop[a])
                            this.layer.rect(66,680-this.anim.turn[a]*100,32*this.anim.drop[a],20*this.anim.drop[a],5*this.anim.drop[a])
                            this.layer.strokeWeight(3)
                            this.layer.rect(96+game.turnTime/9,680-this.anim.turn[a]*100,game.turnTime/4.5+12,16,5)
                            this.layer.fill(0)
                            this.layer.noStroke()
                            this.layer.rect(96+game.turnTime/9,680-this.anim.turn[a]*100,game.turnTime/4.5,4,2)
                            this.layer.fill(this.colorDetail[a].active)
                            this.layer.rect(96+this.turn.time/9,680-this.anim.turn[a]*100,this.turn.time/4.5,4,2)
                        }else{
                            this.layer.strokeWeight(3)
                            this.layer.rect(58+game.turnTime/9,680-this.anim.turn[a]*100,game.turnTime/4.5+12,16,5)
                            this.layer.fill(0)
                            this.layer.noStroke()
                            this.layer.rect(58+game.turnTime/9,680-this.anim.turn[a]*100,game.turnTime/4.5,4,2)
                            this.layer.fill(this.colorDetail[a].active)
                            this.layer.rect(58+this.turn.time/9,680-this.anim.turn[a]*100,this.turn.time/4.5,4,2)
                        }
                    }else if(variants.altDraw||variants.blackjack){
                        this.layer.strokeWeight(3*this.anim.drop[a])
                        this.layer.rect(66,680-this.anim.turn[a]*100,32*this.anim.drop[a],20*this.anim.drop[a],5*this.anim.drop[a])
                    }
                    this.layer.fill(0)
                    this.layer.noStroke()
                    this.layer.textSize(8*this.anim.reserve)
                    this.layer.text('Draw',-74+this.anim.turn[a]*100,494-4*this.anim.reserve)
                    this.layer.text('('+this.cardManagers[a].reserve.cards.length+')',-74+this.anim.turn[a]*100,494+4*this.anim.reserve)
                    this.layer.textSize(8*this.anim.discard)
                    this.layer.text('Discard',-74+this.anim.turn[a]*100,522-4*this.anim.discard)
                    this.layer.text('('+this.cardManagers[a].discard.cards.length+')',-74+this.anim.turn[a]*100,522+4*this.anim.discard)
                    this.layer.textSize(7*this.anim.dictionary)
                    this.layer.text('Dictionary',-74+this.anim.turn[a]*100,550)
                    this.layer.textSize(7*this.anim.endTurn)
                    this.layer.text('End Turn',-74+this.anim.turn[a]*100,578-4*this.anim.endTurn)
                    this.layer.text(`(Turn ${this.turn.total})`,-74+this.anim.turn[a]*100,578+4*this.anim.endTurn)
                    this.layer.textSize(8*this.anim.cancel)
                    this.layer.text('Stop',-74+this.anim.extra[a]*100,414)
                    if(variants.altDraw){
                        this.layer.textSize(7*this.anim.drop[a])
                        this.layer.text('Drop First',66,680-this.anim.turn[a]*100-4*this.anim.drop[a])
                        this.layer.text('('+this.cardManagers[a].drops+' Left)',66,680-this.anim.turn[a]*100+4*this.anim.drop[a])
                    }else if(variants.blackjack){
                        this.layer.textSize(7*this.anim.drop[a])
                        this.layer.text('Hit',66,680-this.anim.turn[a]*100-4*this.anim.drop[a])
                        this.layer.text(this.cardManagers[a].drops+'/'+this.cardManagers[a].baseDrops,66,680-this.anim.turn[a]*100+4*this.anim.drop[a])
                    }
                    this.layer.textSize(14-min(floor(max(this.energy.main[a],this.energy.base[a])/10)*2,3))
                    this.layer.text(this.energy.main[a]+'/'+this.energy.base[a],-74+this.anim.turn[a]*100,454)
                }
                this.tileManager.display(scene)
                this.particleManager.display('back')
                this.combatantManager.display(scene)
                for(let a=0,la=this.cardManagers.length;a<la;a++){
                    this.cardManagers[a].display(scene,[this.anim.turn[a]])
                }
                this.tileManager.displayCoordinate()
                this.combatantManager.displayInfo(scene)
                this.particleManager.display('front')
                this.overlayManager.display()
                this.relicManager.display(stage.scene)
                this.itemManager.display(stage.scene)
                this.modManager.display()
                this.displayCurrency()
                if(this.anim.defeat>0){
                    this.layer.fill(0,this.anim.defeat)
                    this.layer.noStroke()
                    this.layer.rect(this.layer.width/2,this.layer.height/2,this.layer.width,this.layer.height)
                }
                if(game.theme>0){
                    switch(game.theme){
                        case 1:
                            this.layer.fill(255,0,0,0.1)
                        break
                        case 2:
                            this.layer.fill(150,0,255,0.1)
                        break
                        case 3:
                            this.layer.fill(255,255,0,0.1)
                        break
                    }
                    this.layer.noStroke()
                    for(let a=0,la=10;a<la;a++){
                        for(let b=0,lb=4;b<lb;b++){
                            this.layer.triangle(this.layer.width*(b%2),this.layer.height*floor(b/2),3+3*a+(this.layer.width-6-6*a)*(b%2),this.layer.height*floor(b/2),this.layer.width*(b%2),3+3*a+(this.layer.height-6-6*a)*floor(b/2))
                        }
                    }
                }
            break
            case 'replay':
                this.layer.background(110,115,120)
                this.tileManager.display(scene)
                this.particleManager.display('back')
                this.combatantManager.display(scene)
                this.particleManager.display('front')
            break
            case 'map':
                this.layer.background(70,75,80)
                for(let a=0,la=this.colorDetail.length;a<la;a++){
                    this.layer.fill(this.colorDetail[a].fill)
                    this.layer.stroke(this.colorDetail[a].stroke)
                    this.layer.strokeWeight(3*this.anim.deck[a])
                    this.layer.rect(26+a*(this.layer.width-52),494,32*this.anim.deck[a],20*this.anim.deck[a],5*this.anim.deck[a])
                    this.layer.strokeWeight(3*this.anim.dictionaryMulti[a])
                    this.layer.rect(26+a*(this.layer.width-52),522,32*this.anim.dictionaryMulti[a],20*this.anim.dictionaryMulti[a],5*this.anim.dictionaryMulti[a])
                    this.layer.fill(0)
                    this.layer.noStroke()
                    this.layer.textSize(8*this.anim.deck[a])
                    this.layer.text('Deck',26+a*(this.layer.width-52),494-4*this.anim.deck[a])
                    this.layer.text('('+this.cardManagers[a].deck.cards.length+')',26+a*(this.layer.width-52),494+4*this.anim.deck[a])
                    this.layer.textSize(7*this.anim.dictionaryMulti[a])
                    this.layer.text('Dictionary',26+a*(this.layer.width-52),522)
                }
                this.nodeManager.display()
                this.overlayManager.display()
                this.relicManager.display(stage.scene)
                this.itemManager.display(stage.scene)
                this.modManager.display()
                this.displayCurrency()
            break
            case 'rest':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[3][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].display()
                }
			    this.layer.image(graphics.overlays[0],0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.colorDetail.length;a<la;a++){
                    this.layer.fill(this.colorDetail[a].fill)
                    this.layer.stroke(this.colorDetail[a].stroke)
                    this.layer.strokeWeight(3*this.anim.deck[a])
                    this.layer.rect(26+a*(this.layer.width-52),494,32*this.anim.deck[a],20*this.anim.deck[a],5*this.anim.deck[a])
                    this.layer.strokeWeight(3*this.anim.dictionaryMulti[a])
                    this.layer.rect(26+a*(this.layer.width-52),522,32*this.anim.dictionaryMulti[a],20*this.anim.dictionaryMulti[a],5*this.anim.dictionaryMulti[a])
                    this.layer.fill(0)
                    this.layer.noStroke()
                    this.layer.textSize(8*this.anim.deck[a])
                    this.layer.text('Deck',26+a*(this.layer.width-52),494-4*this.anim.deck[a])
                    this.layer.text('('+this.cardManagers[a].deck.cards.length+')',26+a*(this.layer.width-52),494+4*this.anim.deck[a])
                    this.layer.textSize(7*this.anim.dictionaryMulti[a])
                    this.layer.text('Dictionary',26+a*(this.layer.width-52),522)
                }
                this.combatantManager.displayInfo(stage.scene)
                this.optionManagers.forEach(optionManager=>optionManager.display())
                this.overlayManager.display()
            break
            case 'shop':
                this.layer.background(110,115,120)
                for(let a=0,la=this.colorDetail.length;a<la;a++){
                    this.layer.fill(this.colorDetail[a].fill)
                    this.layer.stroke(this.colorDetail[a].stroke)
                    this.layer.strokeWeight(3*this.anim.deck[a])
                    this.layer.rect(26+a*(this.layer.width-52),494,32*this.anim.deck[a],20*this.anim.deck[a],5*this.anim.deck[a])
                    this.layer.strokeWeight(3*this.anim.dictionaryMulti[a])
                    this.layer.rect(26+a*(this.layer.width-52),522,32*this.anim.dictionaryMulti[a],20*this.anim.dictionaryMulti[a],5*this.anim.dictionaryMulti[a])
                    this.layer.strokeWeight(3*this.anim.sell[a])
                    this.layer.rect(26+a*(this.layer.width-52),550,32*this.anim.sell[a],20*this.anim.sell[a],5*this.anim.sell[a])
                    this.layer.strokeWeight(3*this.anim.food[a])
                    this.layer.rect(26+a*(this.layer.width-52),578,32*this.anim.food[a],20*this.anim.food[a],5*this.anim.food[a])
                    if(this.relicManager.hasRelic(191,a)){
                        this.layer.strokeWeight(3*this.anim.reroll[a])
                        this.layer.rect(-74+100*this.anim.rerollActive[a]+a*(this.layer.width+148-200*this.anim.rerollActive[a]),438,32*this.anim.reroll[a],20*this.anim.reroll[a],5*this.anim.reroll[a])
                    }
                    this.layer.fill(0)
                    this.layer.noStroke()
                    this.layer.textSize(8*this.anim.deck[a])
                    this.layer.text('Deck',26+a*(this.layer.width-52),494-4*this.anim.deck[a])
                    this.layer.text('('+this.cardManagers[a].deck.cards.length+')',26+a*(this.layer.width-52),494+4*this.anim.deck[a])
                    this.layer.textSize(7*this.anim.dictionaryMulti[a])
                    this.layer.text('Dictionary',26+a*(this.layer.width-52),522)
                    this.layer.textSize(8*this.anim.sell[a])
                    this.layer.text('Sell',26+a*(this.layer.width-52),550-4*this.anim.sell[a])
                    this.layer.text('Relic',26+a*(this.layer.width-52),550+4*this.anim.sell[a])
                    this.layer.textSize(8*this.anim.food[a])
                    this.layer.text('Food',26+a*(this.layer.width-52),578)
                    if(this.relicManager.hasRelic(191,a)){
                        this.layer.textSize(8*this.anim.reroll[a])
                        this.layer.text('Reroll',-74+100*this.anim.rerollActive[a]+a*(this.layer.width+148-200*this.anim.rerollActive[a]),438-4*this.anim.reroll[a])
                        this.layer.textSize(6*this.anim.reroll[a])
                        this.layer.text('50 Currency',-74+100*this.anim.rerollActive[a]+a*(this.layer.width+148-200*this.anim.rerollActive[a]),438+4*this.anim.reroll[a])
                    }
                }
                this.layer.fill(this.player==1?this.colorDetail[0].fill:types.color.card[0].fill)
                this.layer.stroke(this.player==1?this.colorDetail[0].stroke:types.color.card[0].stroke)
                this.layer.strokeWeight(3*this.anim.exit)
                this.layer.rect(26,466,32*this.anim.exit,20*this.anim.exit,5*this.anim.exit)
                this.layer.fill(0)
                this.layer.noStroke()
                this.layer.textSize(8*this.anim.exit)
                this.layer.text('Exit',26,466)
                this.purchaseManager.display()
                this.overlayManager.display()
                this.itemManager.display(stage.scene)
                this.displayCurrency()
            break
            case 'victory':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[2][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].display()
                }
                for(let a=0,la=this.colorDetail.length;a<la;a++){
                    this.layer.fill(this.colorDetail[a].fill)
                    this.layer.stroke(this.colorDetail[a].stroke)
                    this.layer.strokeWeight(3*this.anim.deck[a])
                    this.layer.rect(26+a*(this.layer.width-52),494,32*this.anim.deck[a],20*this.anim.deck[a],5*this.anim.deck[a])
                    this.layer.strokeWeight(3*this.anim.dictionaryMulti[a])
                    this.layer.rect(26+a*(this.layer.width-52),522,32*this.anim.dictionaryMulti[a],20*this.anim.dictionaryMulti[a],5*this.anim.dictionaryMulti[a])
                    this.layer.fill(0)
                    this.layer.noStroke()
                    this.layer.textSize(8*this.anim.deck[a])
                    this.layer.text('Deck',26+a*(this.layer.width-52),494-4*this.anim.deck[a])
                    this.layer.text('('+this.cardManagers[a].deck.cards.length+')',26+a*(this.layer.width-52),494+4*this.anim.deck[a])
                    this.layer.textSize(7*this.anim.dictionaryMulti[a])
                    this.layer.text('Dictionary',26+a*(this.layer.width-52),522)
                }
                this.combatantManager.displayInfo(stage.scene)
                this.overlayManager.display()
            break
            case 'defeat':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[1][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].display()
                }
                for(let a=0,la=this.colorDetail.length;a<la;a++){
                    this.layer.fill(this.colorDetail[a].fill)
                    this.layer.stroke(this.colorDetail[a].stroke)
                    this.layer.strokeWeight(3*this.anim.deck[a])
                    this.layer.rect(26+a*(this.layer.width-52),494,32*this.anim.deck[a],20*this.anim.deck[a],5*this.anim.deck[a])
                    this.layer.strokeWeight(3*this.anim.dictionaryMulti[a])
                    this.layer.rect(26+a*(this.layer.width-52),522,32*this.anim.dictionaryMulti[a],20*this.anim.dictionaryMulti[a],5*this.anim.dictionaryMulti[a])
                    this.layer.fill(0)
                    this.layer.noStroke()
                    this.layer.textSize(8*this.anim.deck[a])
                    this.layer.text('Deck',26+a*(this.layer.width-52),494-4*this.anim.deck[a])
                    this.layer.text('('+this.cardManagers[a].deck.cards.length+')',26+a*(this.layer.width-52),494+4*this.anim.deck[a])
                    this.layer.textSize(7*this.anim.dictionaryMulti[a])
                    this.layer.text('Dictionary',26+a*(this.layer.width-52),522)
                }
                this.combatantManager.displayInfo(stage.scene)
                this.overlayManager.display()
            break
            case 'stash':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[4][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].display()
                }
                this.relicManager.display(stage.scene)
            break
            case 'bossstash':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[6][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].display()
                }
                this.relicManager.display(stage.scene)
            break
            case 'pack':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[7][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].display()
                }
                this.packManagers.forEach(packManager=>packManager.display())
                this.overlayManager.display()
            break
            case 'perk':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[0][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].display()
                }
                this.perkManagers.forEach(perkManager=>perkManager.display())
                this.overlayManager.display()
            break
            case 'event':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[5][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].display()
                }
                this.displayCurrency()
                for(let a=0,la=this.colorDetail.length;a<la;a++){
                    this.layer.fill(this.colorDetail[a].fill)
                    this.layer.stroke(this.colorDetail[a].stroke)
                    this.layer.strokeWeight(3*this.anim.deck[a])
                    this.layer.rect(26+a*(this.layer.width-52),494,32*this.anim.deck[a],20*this.anim.deck[a],5*this.anim.deck[a])
                    this.layer.strokeWeight(3*this.anim.dictionaryMulti[a])
                    this.layer.rect(26+a*(this.layer.width-52),522,32*this.anim.dictionaryMulti[a],20*this.anim.dictionaryMulti[a],5*this.anim.dictionaryMulti[a])
                    this.layer.fill(0)
                    this.layer.noStroke()
                    this.layer.textSize(8*this.anim.deck[a])
                    this.layer.text('Deck',26+a*(this.layer.width-52),494-4*this.anim.deck[a])
                    this.layer.text('('+this.cardManagers[a].deck.cards.length+')',26+a*(this.layer.width-52),494+4*this.anim.deck[a])
                    this.layer.textSize(7*this.anim.dictionaryMulti[a])
                    this.layer.text('Dictionary',26+a*(this.layer.width-52),522)
                }
                this.combatantManager.displayInfo(stage.scene)
                this.eventManagers.forEach(eventManager=>eventManager.display())
                this.overlayManager.display()
            break
            case 'graphic':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[graphics.test][0][a].display()
                }
            break
            case 'tier':
                this.tierManager.display()
                this.overlayManager.display()
            break
        }
        if(this.initialized&&this.modded(150)){
            this.layer.noStroke()
            for(let a=0,la=45;a<la;a++){
                for(let b=0,la=4;b<lb;b++){
                    this.layer.fill((a*6+3)*(b*34+9)%240,255,255)
                    this.layer.rect(10+a*20,530+b*20,20,20)
                }
            }
        }
        this.tutorialManager.display()
    }
    update(scene){
        switch(scene){
            case 'menu':
                for(let a=0,la=game.playerNumber;a<=la;a++){
                    this.menu.anim.combatant[0][a]=smoothAnim(this.menu.anim.combatant[0][a],this.menu.combatant[0]==a,-1,1,5)
                }
                for(let a=0,la=types.deckmode.length;a<=la;a++){
                    this.menu.anim.deck[0][a]=smoothAnim(this.menu.anim.deck[0][a],this.menu.deck[0]==a,-1,1,5)
                }
                for(let a=0,la=types.ascend.length;a<=la;a++){
                    this.menu.anim.ascend[a]=smoothAnim(this.menu.anim.ascend[a],game.ascend==a,0,1,5)
                    this.menu.anim.ascendDesc[a]=smoothAnim(this.menu.anim.ascendDesc[a],pointInsideBox({position:inputs.rel},{position:{x:12.5+(this.layer.width-25)*(0.5+a)/la,y:102.5},width:(this.layer.width-25)/la-6.25,height:17.5}),-1,1,5)
                }
                for(let a=0,la=this.menu.anim.animRate.length;a<la;a++){
                    this.menu.anim.animRate[a]=smoothAnim(this.menu.anim.animRate[a],game.animRate==a+1,0,1,5)
                }
                for(let a=0,la=this.menu.anim.turnTime.length;a<la;a++){
                    this.menu.anim.turnTime[a]=smoothAnim(this.menu.anim.turnTime[a],game.turnTime==[0,900,1800,3600][a],0,1,5)
                }
                this.menu.anim.ascendSingle=smoothAnim(this.menu.anim.ascendSingle,inputs.rel.y>=120,0,1,5)
            break
            case 'menu2':
                for(let a=0,la=game.playerNumber;a<=la;a++){
                    for(let b=0,lb=2;b<lb;b++){
                        this.menu.anim.combatant[b][a]=smoothAnim(this.menu.anim.combatant[b][a],this.menu.combatant[b]==a,-1,1,5)
                    }
                }
                for(let a=0,la=types.deckmode.length;a<=la;a++){
                    for(let b=0,lb=2;b<lb;b++){
                        this.menu.anim.deck[b][a]=smoothAnim(this.menu.anim.deck[b][a],this.menu.deck[b]==a,-1,1,5)
                    }
                }
                for(let a=0,la=types.ascend.length;a<=la;a++){
                    this.menu.anim.ascend[a]=smoothAnim(this.menu.anim.ascend[a],game.ascend==a,0,1,5)
                    this.menu.anim.ascendDesc[a]=smoothAnim(this.menu.anim.ascendDesc[a],pointInsideBox({position:inputs.rel},{position:{x:12.5+(this.layer.width-25)*(0.5+a)/la,y:102.5},width:(this.layer.width-25)/la-6.25,height:17.5}),-1,1,5)
                }
                for(let a=0,la=this.menu.anim.animRate.length;a<la;a++){
                    this.menu.anim.animRate[a]=smoothAnim(this.menu.anim.animRate[a],game.animRate==a+1,0,1,5)
                }
                for(let a=0,la=this.menu.anim.turnTime.length;a<la;a++){
                    this.menu.anim.turnTime[a]=smoothAnim(this.menu.anim.turnTime[a],game.turnTime==[0,900,1800,3600][a],0,1,5)
                }
                this.menu.anim.ascendSingle=smoothAnim(this.menu.anim.ascendSingle,inputs.rel.y>=120,0,1,5)
            break
            case 'variants':
                let variantNames=[
                    'mod','junk',
                    'lowDraw','deckbuild',
                    'altDraw','blackjack',
                    'witch','inventor',
                    'chooselose','compress',
                    'unexpected','balance',
                    'lowhealth','midhealth',
                    'shortmap','shortermap',
                    'speedmove','polar',
                    'prism','ultraprism',
                    'vanish','blind',
                    'cursed','terminal',
                ]
                for(let a=0,la=this.menu.anim.variants.length;a<la;a++){
                    this.menu.anim.variants[a]=smoothAnim(this.menu.anim.variants[a],variants[variantNames[a]],0,1,5)
                }
            break
            case 'custom':
                let prismrules=[0,game.playerNumber+1,game.playerNumber+2,game.playerNumber+3,game.playerNumber+4,-2,-1]
                for(let a=0,la=prismrules.length;a<la;a++){
                    this.menu.anim.prismrule[a]=smoothAnim(this.menu.anim.prismrule[a],variants.prismrule.includes(prismrules[a]),0,1,5)
                }
                for(let a=0,la=game.playerNumber;a<la;a++){
                    this.menu.anim.prismrule[a+7]=smoothAnim(this.menu.anim.prismrule[a+7],variants.prismrule.includes(a+1),0,1,5)
                }
            break
            case 'battle':
                this.tileManager.update(scene)
                this.combatantManager.update(scene)
                this.cardManagers.forEach(cardManager=>cardManager.update(scene))
                if(!this.result.defeat&&!this.result.noAnim){
                    this.attackManager.update()
                    this.turnManager.update()
                }
                this.particleManager.update()
                this.overlayManager.update()
                this.relicManager.update(stage.scene)
                this.itemManager.update(stage.scene)
                for(let a=0,la=this.anim.turn.length;a<la;a++){
                    this.anim.turn[a]=smoothAnim(this.anim.turn[a],this.turn.main==a,0,1,5)
                    this.anim.extra[a]=smoothAnim(this.anim.extra[a],this.turn.main==a&&
                        (this.cardManagers[a].hand.status.discard<0||this.cardManagers[a].hand.status.exhaust<0||this.cardManagers[a].hand.status.discardBlock>0),0,1,5)
                    this.anim.drop[a]=smoothAnim(this.anim.drop[a],pointInsideBox({position:inputs.rel},{position:{x:66,y:680-this.anim.turn[a]*100},width:32,height:20})&&!this.overlayManager.anyActive&&(variants.altDraw||variants.blackjack),1,1.5,5)
                }
                this.anim.reserve=smoothAnim(this.anim.reserve,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:494},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                this.anim.discard=smoothAnim(this.anim.discard,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:522},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                this.anim.dictionary=smoothAnim(this.anim.dictionary,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:550},width:32,height:20}),1,1.5,5)
                this.anim.endTurn=smoothAnim(this.anim.endTurn,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:578},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                this.anim.cancel=smoothAnim(this.anim.cancel,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.extra[this.turn.main]*100,y:414},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                this.anim.defeat=smoothAnim(this.anim.defeat,this.result.defeat,0,1,240)
                this.anim.afford=smoothAnim(this.anim.afford,this.anim.upAfford,0,1,10)
                if(this.result.defeat&&this.anim.defeat>=1){
                    transition.trigger=true
                    transition.scene='defeat'
                    this.setupStats()
                }
                if(this.anim.upAfford&&this.anim.afford>=1){
                    this.anim.upAfford=false
                }
                if(this.turn.endReady&&this.attackManager.attacks.length<=0&&this.turnManager.turns.length<=0&&this.turnManager.turnsBack.length<=0){
                    this.endTurn()
                }
                if(this.result.victory){
                    if(this.attackManager.attacks.length==0&&this.turnManager.turns.length==0&&this.turnManager.turnsBack.length==0){
                        this.result.noAnim=true
                    }
                    let allClosed=true
                    for(let a=0,la=this.overlayManager.overlays[0].length;a<la;a++){
                        if(this.overlayManager.overlays[0][a].active){
                            allClosed=false
                        }
                    }
                    if(allClosed&&!this.result.defeat){
                        transition.trigger=true
                        if(this.encounter.class==2){
                            if(this.nodeManager.world==3){
                                transition.scene='victory'
                                this.setupStats()
                            }else{
                                transition.scene='bossstash'
                                this.combatantManager.bossHeal()
                                this.setupBossStash()
                            }
                        }else{
                            transition.scene='map'
                            this.replayManager.clear()
                        }
                    }
                }else if(this.counter.killed>=this.counter.enemy&&!this.result.defeat&&!this.overlayManager.anyActive&&!this.tutorialManager.active){
                    this.result.victory=true
                    this.overlayManager.closeAll()
                    let prefered=floor(random(0,this.overlayManager.overlays[0].length))
                    this.cardManagers.forEach(cardManager=>cardManager.allEffect(0,44))
                    for(let a=0,la=this.overlayManager.overlays[0].length;a<la;a++){
                        this.overlayManager.overlays[0][a].active=true
                        if(this.encounter.class==0&&this.relicManager.hasRelic(79,a)&&floor(random(0,5))==0){
                            this.encounter.class=1
                        }
                        if(variants.inventor){
                            this.overlayManager.overlays[38][a].active=true
                            this.overlayManager.overlays[38][a].activate()
                        }
                        let reward=[]
                        for(let a=0,la=(variants.vanish||variants.inventor)?2:1;a<la;a++){
                            if(floor(random(0,2))==0||!this.modded(50)){
                                switch(this.encounter.class){
                                    case 0: case 3: case 4:
                                        reward.push({type:1,value:[random(0,1)<this.nodeManager.world*(game.ascend>=12?0.125:0.25)?1:0,this.relicManager.hasRelic(164,a)?floor(random(0,2.25)):floor(random(0,1.5)),0]})
                                    break
                                    case 1:
                                        reward.push({type:1,value:[random(0,1)<(this.nodeManager.world*(game.ascend>=12?0.125:0.25)+0.5)?1:0,this.relicManager.hasRelic(164,a)?floor(random(0.5,2.5)):floor(random(0,2)),0]})
                                    break
                                    case 2:
                                        if(this.nodeManager.world!=3){
                                            reward.push({type:1,value:[0,2,0]})
                                        }
                                    break
                                }
                            }
                        }
                        let mult=1
                        if(this.modded(82)){
                            mult*=0.5
                        }
                        this.relicManager.activate(15,[a,-1,reward,this.turn.total])
                        switch(this.encounter.class){
                            case 0: case 3: case 4:
                                reward.push({type:0,value:[floor(random(40,81)*mult)]})
                                if((floor(random(0,3))==0||this.relicManager.hasRelic(83,a))&&!this.modded(49)){
                                    reward.push({type:3,value:[]})
                                }
                                if(floor(random(0,6))==0){
                                    reward.push({type:5,value:[1]})
                                }
                            break
                            case 1:
                                if(!this.modded(48)){
                                    this.relicManager.activate(15,[a,1,reward,this.turn.total])
                                    reward.push({type:2,value:[]})
                                }
                                reward.push({type:0,value:[floor(random(120,201)*mult)]})
                                if((floor(random(0,3))==0||this.relicManager.hasRelic(83,a))&&!this.modded(49)){
                                    reward.push({type:3,value:[]})
                                }
                                if(floor(random(0,6))==0){
                                    reward.push({type:5,value:[1]})
                                }
                            break
                            case 2:
                                if(this.nodeManager.world!=3){
                                    if(game.ascend<13){
                                        reward.push({type:0,value:[floor(random(240,401)*mult)]})
                                    }
                                    this.relicManager.activate(15,[a,2,reward,this.turn.total])
                                }
                            break
                        }
                        for(let b=0,lb=this.combatantManager.combatants.length;b<lb;b++){
                            if(this.combatantManager.combatants[b].life>0){
                                if(this.combatantManager.combatants[b].spec.includes(13)){
                                    reward.push({type:4,value:[20]})
                                }
                                if(this.combatantManager.combatants[b].spec.includes(14)){
                                    reward.push({type:7,value:[1]})
                                }
                                if(this.combatantManager.combatants[b].spec.includes(15)&&a==prefered){
                                    reward.push({type:6,value:[1]})
                                }
                                if(this.combatantManager.combatants[b].spec.includes(16)){
                                    reward.push({type:0,value:[25]})
                                }
                            }
                        }
                        this.overlayManager.overlays[0][a].activate([0,reward])
                    }
                    this.relicManager.activate(1,[])
                }
            break
            case 'replay':
                this.tileManager.update(scene)
                this.combatantManager.update(scene)
                this.replayManager.update()
                this.particleManager.update()
            break
            case 'map':
                this.nodeManager.update()
                this.overlayManager.update()
                for(let a=0,la=this.anim.deck.length;a<la;a++){
                    this.anim.deck[a]=smoothAnim(this.anim.deck[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:494},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                    this.anim.dictionaryMulti[a]=smoothAnim(this.anim.dictionaryMulti[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:522},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                }
                this.relicManager.update(stage.scene)
                this.itemManager.update(stage.scene)
            break
            case 'rest':
                this.optionManagers.forEach(optionManager=>optionManager.update())
                this.combatantManager.update(scene)
                this.overlayManager.update()
                for(let a=0,la=this.anim.deck.length;a<la;a++){
                    this.anim.deck[a]=smoothAnim(this.anim.deck[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:494},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                    this.anim.dictionaryMulti[a]=smoothAnim(this.anim.dictionaryMulti[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:522},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                }
                let allOptionsComplete=true
                for(let a=0,la=this.optionManagers.length;a<la;a++){
                    if(!this.optionManagers[a].complete){
                        allOptionsComplete=false
                    }
                }
                if(allOptionsComplete&&!transition.trigger){
                    transition.trigger=true
                    if(this.altPhase){
                        this.altPhase=false
                        transition.scene='battle'
                    }else{
                        transition.scene='map'
                    }
                }
            break
            case 'shop':
                this.purchaseManager.update()
                this.overlayManager.update()
                this.itemManager.update(stage.scene)
                for(let a=0,la=this.anim.deck.length;a<la;a++){
                    this.anim.deck[a]=smoothAnim(this.anim.deck[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:494},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                    this.anim.dictionaryMulti[a]=smoothAnim(this.anim.dictionaryMulti[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:522},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                    this.anim.sell[a]=smoothAnim(this.anim.sell[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:550},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                    this.anim.food[a]=smoothAnim(this.anim.food[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:578},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                    this.anim.reroll[a]=smoothAnim(this.anim.reroll[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:438},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                    this.anim.rerollActive[a]=smoothAnim(this.anim.rerollActive[a],!this.purchaseManager.rerollActive[a]&&!this.overlayManager.anyActive,0,1,5)
                }
                this.anim.exit=smoothAnim(this.anim.exit,pointInsideBox({position:inputs.rel},{position:{x:26,y:466},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
            break
            case 'victory': case 'defeat':
                this.overlayManager.update()
                for(let a=0,la=this.anim.deck.length;a<la;a++){
                    this.anim.deck[a]=smoothAnim(this.anim.deck[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:494},width:32,height:20}),1,1.5,5)
                    this.anim.dictionaryMulti[a]=smoothAnim(this.anim.dictionaryMulti[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:522},width:32,height:20}),1,1.5,5)
                }
                let allClosed=true
                for(let a=0,la=this.overlayManager.overlays[11].length;a<la;a++){
                    if(this.overlayManager.overlays[11][a].active){
                        allClosed=false
                    }
                }
                if(allClosed){
                    transition.trigger=true
                    transition.scene='title'
                }
            break
            case 'stash':  case 'bossstash':
                this.relicManager.update(stage.scene)
            break
            case 'pack':
                this.packManagers.forEach(packManager=>packManager.update())
                this.combatantManager.update(scene)
                this.overlayManager.update()
                let allPackComplete=true
                for(let a=0,la=this.packManagers.length;a<la;a++){
                    if(!this.packManagers[a].complete){
                        allPackComplete=false
                    }
                }
                if(allPackComplete){
                    transition.trigger=true
                    transition.scene='perk'
                }
            break
            case 'perk':
                this.perkManagers.forEach(perkManager=>perkManager.update())
                this.combatantManager.update(scene)
                this.overlayManager.update()
                let allPerkComplete=true
                for(let a=0,la=this.perkManagers.length;a<la;a++){
                    if(!this.perkManagers[a].complete){
                        allPerkComplete=false
                    }
                }
                if(allPerkComplete){
                    transition.trigger=true
                    transition.scene='map'
                }
            break
            case 'event':
                this.eventManagers.forEach(eventManager=>eventManager.update())
                this.combatantManager.update(scene)
                this.overlayManager.update()
                for(let a=0,la=this.anim.deck.length;a<la;a++){
                    this.anim.deck[a]=smoothAnim(this.anim.deck[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:494},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                    this.anim.dictionaryMulti[a]=smoothAnim(this.anim.dictionaryMulti[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:522},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                }
                if(!this.overlayManager.anyActive){
                    let allEventsComplete=true
                    for(let a=0,la=this.eventManagers.length;a<la;a++){
                        if(!this.eventManagers[a].complete){
                            allEventsComplete=false
                        }
                    }
                    if(allEventsComplete){
                        transition.trigger=true
                        transition.scene='map'
                    }
                }
            break
            case 'tier':
                this.tierManager.update()
                this.overlayManager.update()
            break
        }
        if(this.initialized&&this.modded(135)&&game.timer%180==0){
            for(let a=0,la=this.players;a<la;a++){
                this.loseCurrency(1,a)
            }
        }
        this.tutorialManager.update()
    }
    onClick(scene){
        switch(scene){
            case 'title':
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-157.5,y:this.layer.height*0.6},width:62.5,height:62.5})){
                    transition.trigger=true
                    transition.scene='menu'
                    if(this.menu.combatant.length==2){
                        this.menu.combatant=[1]
                    }
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-52.5,y:this.layer.height*0.6},width:62.5,height:62.5})){
                    transition.trigger=true
                    transition.scene='menu2'
                    if(this.menu.combatant.length==1){
                        this.menu.combatant=[this.menu.combatant[0],1]
                    }
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+52.5,y:this.layer.height*0.6},width:62.5,height:62.5})){
                    transition.trigger=true
                    transition.scene='variants'
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+157.5,y:this.layer.height*0.6},width:62.5,height:62.5})){
                    transition.trigger=true
                    transition.scene='tutorial'
                }
            break
            case 'menu':
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-80,y:this.layer.height*0.65},width:37.5,height:37.5})&&this.menu.combatant[0]>1){
                    this.menu.combatant[0]--
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+80,y:this.layer.height*0.65},width:37.5,height:37.5})&&this.menu.combatant[0]<game.playerNumber){
                    this.menu.combatant[0]++
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-80,y:this.layer.height*0.65+80},width:37.5,height:37.5})&&this.menu.deck[0]>0){
                    this.menu.deck[0]--
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+80,y:this.layer.height*0.65+80},width:37.5,height:37.5})&&this.menu.deck[0]<types.deckmode.length-1){
                    this.menu.deck[0]++
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height*0.65-240},width:112.5,height:32.5})){
                    this.menu.combatant[0]=floor(random(0,game.playerNumber))+1
                }
                for(let a=0,la=types.ascend.length;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:12.5+(this.layer.width-25)*(0.5+a)/la,y:102.5},width:(this.layer.width-25)/la-6.25,height:17.5})){
                        game.ascend=a
                    }
                }
                for(let a=0,la=this.menu.anim.animRate.length;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-287.5+a*75,y:this.layer.height-30},width:67.5,height:27.5})){
                        game.animRate=a+1
                    }
                }
                for(let a=0,la=this.menu.anim.turnTime.length;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+62.5+a*75,y:this.layer.height-30},width:67.5,height:27.5})){
                        game.turnTime=[0,900,1800,3600][a]
                    }
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+150,y:this.layer.height*0.6},width:62.5,height:62.5})){
                    this.startGame()
                }
            break
            case 'menu2':
                for(let a=0,la=2;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/4+this.layer.width/2*a-80,y:this.layer.height*0.65},width:37.5,height:37.5})&&this.menu.combatant[a]>1){
                        this.menu.combatant[a]--
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/4+this.layer.width/2*a+80,y:this.layer.height*0.65},width:37.5,height:37.5})&&this.menu.combatant[a]<game.playerNumber){
                        this.menu.combatant[a]++
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/4+this.layer.width/2*a-80,y:this.layer.height*0.65+80},width:37.5,height:37.5})&&this.menu.deck[a]>0){
                        this.menu.deck[a]--
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/4+this.layer.width/2*a+80,y:this.layer.height*0.65+80},width:37.5,height:37.5})&&this.menu.deck[a]<types.deckmode.length-1){
                        this.menu.deck[a]++
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/4+this.layer.width/2*a,y:this.layer.height*0.65-240},width:112.5,height:32.5})){
                        this.menu.combatant[a]=floor(random(0,game.playerNumber))+1
                    }
                }
                for(let a=0,la=types.ascend.length;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:12.5+(this.layer.width-25)*(0.5+a)/la,y:102.5},width:(this.layer.width-25)/la-6.25,height:17.5})){
                        game.ascend=a
                    }
                }
                for(let a=0,la=this.menu.anim.animRate.length;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-287.5+a*75,y:this.layer.height-30},width:67.5,height:27.5})){
                        game.animRate=a+1
                    }
                }
                for(let a=0,la=this.menu.anim.turnTime.length;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+62.5+a*75,y:this.layer.height-30},width:67.5,height:27.5})){
                        game.turnTime=[0,900,1800,3600][a]
                    }
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height*0.6},width:62.5,height:62.5})){
                    this.startGame()
                }
            break
            case 'variants':
                let variantNames=[
                    'mod','junk',
                    'lowDraw','deckbuild',
                    'altDraw','blackjack',
                    'witch','inventor',
                    'chooselose','compress',
                    'unexpected','balance',
                    'lowhealth','midhealth',
                    'shortmap','shortermap',
                    'speedmove','polar',
                    'prism','ultraprism',
                    'vanish','blind',
                    'cursed','terminal',
                ]
                for(let a=0,la=this.menu.anim.variants.length;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-107.5+a%2*350,y:this.layer.height/2-floor(la/2)*22.5+22.5+floor(a/2)*45},width:27.5,height:27.5})){
                        variants[variantNames[a]]=toggle(variants[variantNames[a]])
                    }
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height*0.6},width:62.5,height:62.5})){
                    transition.trigger=true
                    transition.scene='title'
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height*0.8},width:137.5,height:37.5})){
                    transition.trigger=true
                    transition.scene='custom'
                    variants.ultraprism=true
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height*0.8+42.5},width:137.5,height:37.5})){
                    let keys=[floor(random(0,12)),floor(random(0,2.25)),floor(random(0,2.25)),floor(random(0,5))]
                    let subkeys=[
                        floor(random(0,5))==0,floor(random(0,5))==0,
                        keys[0]==2,keys[0]==3,
                        keys[0]==4,keys[0]==5,
                        keys[0]==6,keys[0]==7,
                        keys[0]==8,keys[0]==9,
                        keys[0]==10,keys[0]==11,
                        keys[1]==1,keys[1]==2,
                        keys[2]==1,keys[2]==2,
                        floor(random(0,5))==0,0,
                        keys[3]==3,keys[3]==4,
                        floor(random(0,5))==0,floor(random(0,5))==0,
                        floor(random(0,5))==0,floor(random(0,5))==0
                    ]
                    for(let a=0,la=variantNames.length;a<la;a++){
                        variants[variantNames[a]]=subkeys[a]
                    }
                }
            break
            case 'custom':
                let prismrules=[0,game.playerNumber+1,game.playerNumber+2,game.playerNumber+3,game.playerNumber+4,-2,-1]
                for(let a=0,la=7;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-107.5,y:this.layer.height/2-190+a*45},width:27.5,height:27.5})){
                        if(variants.prismrule.includes(prismrules[a])){
                            variants.prismrule.splice(variants.prismrule.indexOf(prismrules[a]),1)
                        }else{
                            variants.prismrule.push(prismrules[a])
                        }
                    }
                }
                for(let a=0,la=game.playerNumber;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+242.5,y:this.layer.height/2-190+a*45},width:27.5,height:27.5})){
                        if(variants.prismrule.includes(a+1)){
                            variants.prismrule.splice(variants.prismrule.indexOf(a+1),1)
                        }else{
                            variants.prismrule.push(a+1)
                        }
                    }
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-175,y:this.layer.height*0.7+50},width:62.5,height:62.5})){
                    transition.trigger=true
                    transition.scene='variants'
                }
            break
            case 'tutorial':
                for(let a=0,la=6;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-107.5,y:this.layer.height/2-190+a*45},width:27.5,height:27.5})){
                        this.tutorialManager.setupTutorial(a)
                    }
                }
                for(let a=0,la=game.playerNumber;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+242.5,y:this.layer.height/2-190+a*45},width:27.5,height:27.5})){
                        this.tutorialManager.setupTutorial(a+6)
                    }
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-175,y:this.layer.height*0.7},width:62.5,height:62.5})){
                    transition.trigger=true
                    transition.scene='title'
                }
            break
            case 'battle':
                if(!this.result.defeat){
                    if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:550},width:32,height:20})){
                        this.overlayManager.overlays[24][this.turn.main].active=true
                        this.overlayManager.overlays[24][this.turn.main].activate()
                    }
                    if(this.overlayManager.anyActive){
                        this.overlayManager.onClick(stage.scene)
                    }else if(this.turn.main<this.players){
                        this.cardManagers[this.turn.main].onClick(stage.scene)
                        this.relicManager.onClick(stage.scene)
                        this.itemManager.onClick(stage.scene)
                        this.modManager.onClick()
                        if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:494},width:32,height:20})){
                            this.overlayManager.overlays[this.relicManager.hasRelic(129,this.turn.main)?13:1][this.turn.main].active=true
                            this.overlayManager.overlays[this.relicManager.hasRelic(129,this.turn.main)?13:1][this.turn.main].activate()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:522},width:32,height:20})){
                            this.overlayManager.overlays[2][this.turn.main].active=true
                            this.overlayManager.overlays[2][this.turn.main].activate()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:578},width:32,height:20})&&this.attackManager.attacks.length<=0&&this.turnManager.turns.length<=0&&this.turnManager.turnsBack.length<=0){
                            this.endTurn()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.extra[this.turn.main]*100,y:414},width:32,height:20})){
                            this.cardManagers[this.turn.main].hand.cancel()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:66,y:680-this.anim.turn[this.turn.main]*100},width:32,height:20})&&variants.altDraw){
                            this.cardManagers[this.turn.main].dropFirst()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:66,y:680-this.anim.turn[this.turn.main]*100},width:32,height:20})&&variants.blackjack&&this.cardManagers[this.turn.main].drops<this.cardManagers[this.turn.main].baseDrops){
                            this.cardManagers[this.turn.main].allEffect(2,40)
                            this.cardManagers[this.turn.main].draw(1)
                            this.cardManagers[this.turn.main].drops+=floor(random(1,7))
                            if(this.cardManagers[this.turn.main].drops==this.cardManagers[this.turn.main].baseDrops){
                                this.cardManagers[this.turn.main].drawPrice(1,0)
                            }else if(this.cardManagers[this.turn.main].drops>this.cardManagers[this.turn.main].baseDrops){
                                this.cardManagers[this.turn.main].allEffect(2,41)
                            }
                        }
                    }
                }
            break
            case 'map':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onClick()
                }else{
                    this.nodeManager.onClick()
                    this.relicManager.onClick(stage.scene)
                    this.itemManager.onClick(stage.scene)
                    this.modManager.onClick()
                    for(let a=0,la=this.cardManagers.length;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:494},width:32,height:20})){
                            this.overlayManager.overlays[4][a].active=true
                            this.overlayManager.overlays[4][a].activate()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:522},width:32,height:20})){
                            this.overlayManager.overlays[24][a].active=true
                            this.overlayManager.overlays[24][a].activate()
                        }
                    }
                }
            break
            case 'rest':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onClick()
                }else{
                    this.optionManagers.forEach(optionManager=>optionManager.onClick())
                    for(let a=0,la=this.cardManagers.length;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:494},width:32,height:20})){
                            this.overlayManager.overlays[4][a].active=true
                            this.overlayManager.overlays[4][a].activate()
                        }
                    }
                }
            break
            case 'shop':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onClick()
                }else{
                    this.itemManager.onClick(stage.scene)
                    this.purchaseManager.onClick()
                    for(let a=0,la=this.cardManagers.length;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:494},width:32,height:20})){
                            this.overlayManager.overlays[4][a].active=true
                            this.overlayManager.overlays[4][a].activate()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:522},width:32,height:20})){
                            this.overlayManager.overlays[24][a].active=true
                            this.overlayManager.overlays[24][a].activate()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:550},width:32,height:20})){
                            this.overlayManager.overlays[16][a].active=true
                            this.overlayManager.overlays[16][a].activate()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:578},width:32,height:20})){
                            this.overlayManager.overlays[27][a].active=true
                            this.overlayManager.overlays[27][a].activate()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:438},width:32,height:20})&&this.relicManager.hasRelic(191,a)&&!this.purchaseManager.rerollActive[a]&&this.currency.money[a]>=50-(this.relicManager.hasRelic(187,a)?200:0)){
                            this.purchaseManager.setup(0)
                            this.purchaseManager.rerollActive[a]=true
                            this.currency.money[a]-=50
                        }
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:26,y:466},width:32,height:20})){
                        transition.trigger=true
                        transition.scene='map'
                    }
                }
            break
            case 'victory': case 'defeat':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onClick()
                }
                for(let a=0,la=this.cardManagers.length;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:494},width:32,height:20})){
                        this.overlayManager.overlays[4][a].active=true
                        this.overlayManager.overlays[4][a].activate()
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:522},width:32,height:20})){
                        this.overlayManager.overlays[24][a].active=true
                        this.overlayManager.overlays[24][a].activate()
                    }
                }
            break
            case 'stash': case 'bossstash':
                this.relicManager.onClick(stage.scene)
            break
            case 'pack':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onClick()
                }else{
                    this.packManagers.forEach(packManager=>packManager.onClick())
                }
            break
            case 'perk':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onClick()
                }else{
                    this.perkManagers.forEach(perkManager=>perkManager.onClick())
                }
            break
            case 'event':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onClick()
                }else{
                    this.eventManagers.forEach(eventManager=>eventManager.onClick())
                    for(let a=0,la=this.cardManagers.length;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:494},width:32,height:20})){
                            this.overlayManager.overlays[4][a].active=true
                            this.overlayManager.overlays[4][a].activate()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:522},width:32,height:20})){
                            this.overlayManager.overlays[24][a].active=true
                            this.overlayManager.overlays[24][a].activate()
                        }
                    }
                }
            break
            case 'tier':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onClick()
                }else{
                    this.tierManager.onClick()
                }
            break
        }
        this.tutorialManager.onClick()
    }
    onKey(scene,key,code){
        switch(scene){
            case 'title':
                if(code==ENTER||key=='1'){
                    transition.trigger=true
                    transition.scene='menu'
                    if(this.menu.combatant.length==2){
                        this.menu.combatant=[1]
                    }
                }
                if(key=='2'){
                    transition.trigger=true
                    transition.scene='menu2'
                    if(this.menu.combatant.length==1){
                        this.menu.combatant=[this.menu.combatant[0],1]
                    }
                }
                if(key=='3'){
                    transition.trigger=true
                    transition.scene='variants'
                }
                if(key=='4'){
                    transition.trigger=true
                    transition.scene='tutorial'
                }
            break
            case 'menu':
                if(code==LEFT_ARROW&&this.menu.combatant[0]>1){
                    this.menu.combatant[0]--
                }
                if(code==RIGHT_ARROW&&this.menu.combatant[0]<game.playerNumber){
                    this.menu.combatant[0]++
                }
                if((key=='a'||key=='A')&&this.menu.deck[0]>0){
                    this.menu.deck[0]--
                }
                if((key=='d'||key=='D')&&this.menu.deck[0]<types.deckmode.length-1){
                    this.menu.deck[0]++
                }
                if(key=='r'||key=='R'){
                    this.menu.combatant[0]=floor(random(0,game.playerNumber))+1
                }
                if(code==UP_ARROW&&game.ascend<types.ascend.length-1){
                    game.ascend++
                }else if(code==DOWN_ARROW&&game.ascend>0){
                    game.ascend--
                }
                for(let a=0,la=this.menu.anim.animRate.length;a<la;a++){
                    if(a+1==int(key)){
                        game.animRate=a+1
                    }
                }
                for(let a=0,la=this.menu.anim.turnTime.length;a<la;a++){
                    if(a+5==int(key)){
                        game.turnTime=[0,900,1800,3600][a]
                    }
                }
                if(code==ENTER||key=='1'&&game.animRate==1){
                    this.startGame()
                }
            break
            case 'menu2':
                for(let a=0,la=2;a<la;a++){
                    if((code==LEFT_ARROW&&a==0||(key=='a'||key=='A')&&a==1)&&this.menu.combatant[a]>1){
                        this.menu.combatant[a]--
                    }
                    if((code==RIGHT_ARROW&&a==0||(key=='d'||key=='D')&&a==1)&&this.menu.combatant[a]<game.playerNumber){
                        this.menu.combatant[a]++
                    }
                    if((key==','&&a==0||(key=='z'||key=='Z')&&a==1)&&this.menu.deck[a]>0){
                        this.menu.deck[a]--
                    }
                    if((key=='/'&&a==0||(key=='c'||key=='C')&&a==1)&&this.menu.deck[a]<types.deckmode.length-1){
                        this.menu.deck[a]++
                    }
                    if(key=='r'&&a==0||key=='R'&&a==1){
                        this.menu.combatant[a]=floor(random(0,game.playerNumber))+1
                    }
                }
                if(code==UP_ARROW&&game.ascend<types.ascend.length-1){
                    game.ascend++
                }else if(code==DOWN_ARROW&&game.ascend>0){
                    game.ascend--
                }
                for(let a=0,la=this.menu.anim.animRate.length;a<la;a++){
                    if(a+1==int(key)){
                        game.animRate=a+1
                    }
                }
                for(let a=0,la=this.menu.anim.turnTime.length;a<la;a++){
                    if(a+5==int(key)){
                        game.turnTime=[0,900,1800,3600][a]
                    }
                }
                if(code==ENTER){
                    this.startGame()
                }
            break
            case 'variants':
                let variantNames=[
                    'mod','junk',
                    'lowDraw','deckbuild',
                    'altDraw','blackjack',
                    'witch','inventor',
                    'chooselose','compress',
                    'unexpected','balance',
                    'lowhealth','midhealth',
                    'shortmap','shortermap',
                    'speedmove','polar',
                    'prism','ultraprism',
                    'vanish','blind',
                    'cursed','terminal',
                ]
                for(let a=0,la=this.menu.anim.variants.length;a<la;a++){
                    if(key==inputs.hexadec[a]){
                        variants[variantNames[a]]=toggle(variants[variantNames[a]])
                    }
                }
                if(code==ENTER){
                    transition.trigger=true
                    transition.scene='title'
                }
                if(key=='C'){
                    transition.trigger=true
                    transition.scene='custom'
                    variants.ultraprism=true
                }
                if(key=='r'){
                    let keys=[floor(random(0,8)),floor(random(0,2.5)),floor(random(0,2.5)),floor(random(0,5))]
                    let subkeys=[
                        floor(random(0,5))==0,floor(random(0,5))==0,
                        keys[0]==2,keys[0]==3,
                        keys[0]==4,keys[0]==5,
                        keys[0]==6,keys[0]==7,
                        keys[0]==8,keys[0]==9,
                        keys[0]==10,keys[0]==11,
                        keys[1]==1,keys[1]==2,
                        keys[2]==1,keys[2]==2,
                        floor(random(0,5))==0,0,
                        keys[3]==3,keys[3]==4,
                        floor(random(0,5))==0,floor(random(0,5))==0,
                        floor(random(0,5))==0,floor(random(0,5))==0
                    ]
                    for(let a=0,la=variantNames.length;a<la;a++){
                        variants[variantNames[a]]=subkeys[a]
                    }
                }
            break
            case 'custom':
                let prismrules=[0,game.playerNumber+1,game.playerNumber+2,game.playerNumber+3,game.playerNumber+4,-2,-1]
                for(let a=0,la=prismrules.length;a<la;a++){
                    if(key=='abcdefg'[a]||key=='ABCDEFG'[a]){
                        if(variants.prismrule.includes(prismrules[a])){
                            variants.prismrule.splice(variants.prismrule.indexOf(prismrules[a]),1)
                        }else{
                            variants.prismrule.push(prismrules[a])
                        }
                    }
                }
                for(let a=0,la=game.playerNumber;a<la;a++){
                    if((a+1)%10==int(key)){
                        if(variants.prismrule.includes(a+1)){
                            variants.prismrule.splice(variants.prismrule.indexOf(a+1),1)
                        }else{
                            variants.prismrule.push(a+1)
                        }
                    }
                }
                if(code==ENTER){
                    transition.trigger=true
                    transition.scene='variants'
                }
            break
            case 'tutorial':
                for(let a=0,la=6;a<la;a++){
                    if(key=='abcdefg'[a]||key=='ABCDEFG'[a]){
                        this.tutorialManager.setupTutorial(a)
                    }
                }
                for(let a=0,la=game.playerNumber;a<la;a++){
                    if((a+1)%10==int(key)){
                        this.tutorialManager.setupTutorial(a+6)
                    }
                }
                if(code==ENTER){
                    transition.trigger=true
                    transition.scene='title'
                }
            break
            case 'battle':
                if(!this.result.defeat){
                    this.itemManager.onKey(stage.scene,key,code)
                    if(this.overlayManager.anyActive){
                        this.overlayManager.onKey(key,code)
                    }else if(this.turn.main<this.players){
                        this.cardManagers[this.turn.main].onKey(stage.scene,key,code)
                        this.relicManager.onKey(stage.scene,key,code)
                        this.modManager.onKey(key,code)
                        if(key=='r'||key=='R'){
                            this.overlayManager.overlays[this.relicManager.hasRelic(129,this.turn.main)?13:1][this.turn.main].active=true
                            this.overlayManager.overlays[this.relicManager.hasRelic(129,this.turn.main)?13:1][this.turn.main].activate()
                        }else if(key=='d'||key=='D'){
                            this.overlayManager.overlays[2][this.turn.main].active=true
                            this.overlayManager.overlays[2][this.turn.main].activate()
                        }else if(key=='s'||key=='S'){
                            this.overlayManager.overlays[24][this.turn.main].active=true
                            this.overlayManager.overlays[24][this.turn.main].activate()
                        }else if(code==ENTER&&this.attackManager.attacks.length<=0&&this.turnManager.turns.length<=0&&this.turnManager.turns.length<=0&&this.turnManager.turnsBack.length<=0){
                            this.endTurn()
                        }else if(key=='.'&&variants.altDraw){
                            this.cardManagers[this.turn.main].dropFirst()
                        }else if(key=='.'&&variants.blackjack&&this.cardManagers[this.turn.main].drops<this.cardManagers[this.turn.main].baseDrops){
                            this.cardManagers[this.turn.main].allEffect(2,40)
                            this.cardManagers[this.turn.main].draw(1)
                            this.cardManagers[this.turn.main].drops+=floor(random(1,7))
                            if(this.cardManagers[this.turn.main].drops==this.cardManagers[this.turn.main].baseDrops){
                                this.cardManagers[this.turn.main].drawPrice(1,0)
                            }else if(this.cardManagers[this.turn.main].drops>this.cardManagers[this.turn.main].baseDrops){
                                this.cardManagers[this.turn.main].allEffect(2,41)
                            }
                        }
                    }
                    if(game.dev){
                        switch(key){
                            case 'Q':
                                quickAdd('Telefrag')
                            break
                            case 'W':
                                save(graphics.main)
                            break
                            case 'E':
                                this.cardManagers[0].allEffect(2,1)
                            break
                            case 'A':
                                this.energy.main[0]=999999
                            break
                            case 'Z':
                                this.endTurn()
                            break
                            case 'X':
                                massacre(1)
                            break
                            case 'C':
                                this.cardManagers[this.turn.main].hand.allEffect(2)
                            break
                        }
                    }
                }
            break
            case 'map':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onKey(key,code)
                }else{
                    this.nodeManager.onKey(key,code)
                    this.relicManager.onKey(stage.scene,key,code)
                    this.itemManager.onKey(stage.scene,key,code)
                    this.modManager.onKey(key,code)
                    for(let a=0,la=this.cardManagers.length;a<la;a++){
                        if((key=='d'||key=='D')&&this.players==1||key=='d'&&a==0&&this.players==2||key=='D'&&a==1&&this.players==2){
                            this.overlayManager.overlays[4][a].active=true
                            this.overlayManager.overlays[4][a].activate()
                        }else if((key=='s'||key=='S')&&this.players==1||key=='s'&&a==0&&this.players==2||key=='S'&&a==1&&this.players==2){
                            this.overlayManager.overlays[24][a].active=true
                            this.overlayManager.overlays[24][a].activate()
                        }
                    }
                }
            break
            case 'rest':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onKey(key,code)
                }else{
                    for(let a=0,la=this.optionManagers.length;a<la;a++){
                        if(!this.optionManagers[a].complete){
                            this.optionManagers[a].onKey(key,code)
                            break
                        }
                    }
                    for(let a=0,la=this.cardManagers.length;a<la;a++){
                        if((key=='d'||key=='D')&&this.players==1||key=='d'&&a==0&&this.players==2||key=='D'&&a==1&&this.players==2){
                            this.overlayManager.overlays[4][a].active=true
                            this.overlayManager.overlays[4][a].activate()
                        }else if((key=='s'||key=='S')&&this.players==1||key=='s'&&a==0&&this.players==2||key=='S'&&a==1&&this.players==2){
                            this.overlayManager.overlays[24][a].active=true
                            this.overlayManager.overlays[24][a].activate()
                        }
                    }
                }
            break
            case 'shop':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onKey(key,code)
                }else{
                    this.itemManager.onKey(stage.scene,key,code)
                    this.purchaseManager.onKey(key,code)
                    for(let a=0,la=this.cardManagers.length;a<la;a++){
                        if((key=='d'||key=='D')&&this.players==1||key=='d'&&a==0&&this.players==2||key=='D'&&a==1&&this.players==2){
                            this.overlayManager.overlays[4][a].active=true
                            this.overlayManager.overlays[4][a].activate()
                        }else if((key=='s'||key=='S')&&this.players==1||key=='s'&&a==0&&this.players==2||key=='S'&&a==1&&this.players==2){
                            this.overlayManager.overlays[24][a].active=true
                            this.overlayManager.overlays[24][a].activate()
                        }else if((key=='r'||key=='R')&&this.players==1||key=='r'&&a==0&&this.players==2||key=='R'&&a==1&&this.players==2){
                            this.overlayManager.overlays[16][a].active=true
                            this.overlayManager.overlays[16][a].activate()
                        }else if((key=='f'||key=='F')&&this.players==1||key=='r'&&a==0&&this.players==2||key=='R'&&a==1&&this.players==2){
                            this.overlayManager.overlays[27][a].active=true
                            this.overlayManager.overlays[27][a].activate()
                        }else if(((key=='c'||key=='C')&&this.players==1||key=='c'&&a==0&&this.players==2||key=='C'&&a==1&&this.players==2)&&this.relicManager.hasRelic(191,a)&&!this.purchaseManager.rerollActive[a]&&this.currency.money[a]>=50-(this.relicManager.hasRelic(187,a)?200:0)){
                            this.purchaseManager.setup(0)
                            this.purchaseManager.rerollActive[a]=true
                            this.currency.money[a]-=50
                        }
                    }
                    if(code==ENTER){
                        transition.trigger=true
                        transition.scene='map'
                    }
                }
            break
            case 'victory': case 'defeat':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onKey(key,code)
                }
                for(let a=0,la=this.cardManagers.length;a<la;a++){
                    if((key=='d'||key=='D')&&this.players==1||key=='d'&&a==0&&this.players==2||key=='D'&&a==1&&this.players==2){
                        this.overlayManager.overlays[4][a].active=true
                        this.overlayManager.overlays[4][a].activate()
                    }else if((key=='s'||key=='S')&&this.players==1||key=='s'&&a==0&&this.players==2||key=='S'&&a==1&&this.players==2){
                        this.overlayManager.overlays[24][a].active=true
                        this.overlayManager.overlays[24][a].activate()
                    }
                }
            break
            case 'stash': case 'bossstash':
                this.relicManager.onKey(stage.scene,key,code)
            break
            case 'pack':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onKey(key,code)
                }else{
                    for(let a=0,la=this.packManagers.length;a<la;a++){
                        if(!this.packManagers[a].complete){
                            this.packManagers[a].onKey(key,code)
                            break
                        }
                    }
                }
            break
            case 'perk':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onKey(key,code)
                }else{
                    for(let a=0,la=this.perkManagers.length;a<la;a++){
                        if(!this.perkManagers[a].complete){
                            this.perkManagers[a].onKey(key,code)
                            break
                        }
                    }
                }
            break
            case 'event':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onKey(key,code)
                }else{
                    for(let a=0,la=this.eventManagers.length;a<la;a++){
                        if(!this.eventManagers[a].complete){
                            this.eventManagers[a].onKey(key,code)
                            break
                        }
                    }
                    for(let a=0,la=this.cardManagers.length;a<la;a++){
                        if((key=='d'||key=='D')&&this.players==1||key=='d'&&a==0&&this.players==2||key=='D'&&a==1&&this.players==2){
                            this.overlayManager.overlays[4][a].active=true
                            this.overlayManager.overlays[4][a].activate()
                        }else if((key=='s'||key=='S')&&this.players==1||key=='s'&&a==0&&this.players==2||key=='S'&&a==1&&this.players==2){
                            this.overlayManager.overlays[24][a].active=true
                            this.overlayManager.overlays[24][a].activate()
                        }
                    }
                }
            break
            case 'tier':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onKey(key,code)
                }else{
                    this.tierManager.onKey(key,code)
                }
            break
        }
        this.tutorialManager.onKey(key,code)
    }
}