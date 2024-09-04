class battle{
    constructor(layer,player){
        this.layer=layer
        this.player=player
        this.createBasic()
    }
    createBasic(){
        this.initialized=false
        this.menu={combatant:[1],deck:[0,0],anim:{combatant:[[],[]],deck:[[],[]],ascend:[],ascendDesc:[],ascendSingle:0,animRate:[],turnTime:[],variants:[],prismrule:[],mtg:[]},mtg:{manaChoice:[],manaBase:[],manaOld:[],manaNew:[]}}
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
        for(let a=0,la=variants.names.length;a<la;a++){
            this.menu.anim.variants.push(0)
        }
        for(let a=-8,la=game.playerNumber+6;a<la;a++){
            this.menu.anim.prismrule.push(0)
            variants.prismrule.push(a)
        }
        for(let a=0,la=2;a<la;a++){
            this.menu.anim.mtg.push(0)
            this.menu.mtg.manaChoice.push(0)
            this.menu.mtg.manaBase.push([])
            this.menu.mtg.manaOld.push([])
            this.menu.mtg.manaNew.push([])
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

        this.encounter={class:0,world:0,name:'',custom:[0,0]}
        this.currency={money:[],ss:[]}
        this.energy={main:[],gen:[],base:[],originalBase:[],temp:[],lastSpend:[],crystal:[],crystalTotal:[]}
        this.stats={node:[0,0,0,0,0,0,0,0],killed:[],earned:[],damage:[],block:[],barrier:[],move:[],drawn:[],played:[],taken:[],card:[],relic:[],item:[]}
        this.lastEncounter=types.encounter[0]
        
        this.turn={main:0,total:0,time:0,accelerate:0,endReady:false,active:false}
        this.counter={enemy:0,killed:0,tooltip:0}
        this.result={defeat:false,victory:false,noAnim:false}
        this.reinforce={back:[],front:[],assault:{back:[],front:[]}}
        this.first=true
        this.colorDetail=[]

        this.initialConstants()
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
        this.optionManagers.forEach(optionManager=>optionManager.assemble())
        this.perkManagers.forEach(perkManager=>perkManager.assemble())
    }
    initialManagersAfter(){
        this.cardManagers.forEach(cardManager=>cardManager.initialDeck())
    }
    initialConstants(){
        this.colorDetail=[]
        for(let a=0,la=this.players;a<la;a++){
            this.colorDetail.push(types.color.card[this.player[a]])

            this.currency.money.push(game.ascend>=22?0:100)
            this.currency.ss.push(0)

            this.energy.main.push(variants.mtg?[]:0)
            this.energy.gen.push(variants.mtg?[]:0)
            this.energy.base.push(variants.mtg?copyArray(this.menu.mtg.manaBase[a][this.menu.mtg.manaChoice[a]]):game.startEnergy)
            this.energy.originalBase.push(variants.mtg?copyArray(this.menu.mtg.manaBase[a][this.menu.mtg.manaChoice[a]]):game.startEnergy)
            this.energy.temp.push(0)
            this.energy.lastSpend.push(variants.mtg?[]:0)
            if(variants.mtg){
                this.energy.crystal.push([])
                this.energy.crystalTotal.push([0,0,0,0,0,0,0])
            }

            this.stats.killed.push(0)
            this.stats.earned.push(0)
            this.stats.damage.push(0)
            this.stats.block.push(0)
            this.stats.barrier.push(0)
            this.stats.move.push(0)
            this.stats.drawn.push(0)
            this.stats.played.push([0,0,0,0,0,0,0,0,0,0,0,0])
            this.stats.taken.push([0,0,0])
            this.stats.card.push(0)
            this.stats.relic.push(0)
            this.stats.item.push(0)
        }
    }
    initial(){
        this.combatantManager.clearCombatants()
        this.nodeManager.setupMap()
        this.resetAnim()
        if(variants.chaos){
            for(let a=0,la=types.card.length;a<la;a++){
                if(
                    types.card[a].name!='Strike'&&
                    types.card[a].name!='Defend'&&
                    types.card[a].name!='Step'&&
                    types.card[a].name!='Strike-'&&
                    types.card[a].name!='Defend-'&&
                    types.card[a].name!='Step-L'&&
                    types.card[a].name!='Step-R'&&
                    types.card[a].name!='Strike_'&&
                    types.card[a].name!='Defend_'&&
                    types.card[a].name!='Step_'&&
                    types.card[a].name!='Deckbuild\nDefend'&&
                    types.card[a].name!='Deckbuild\nDefend-'
                ){
                    for(let b=0,lb=types.card[a].levels.length;b<lb;b++){
                        if(types.card[a].levels[b].spec.includes(12)){
                            for(let c=0,lc=types.card[a].levels[b].effect.length;c<lc;c++){
                                for(let d=0,ld=types.card[a].levels[b].effect[c].length;d<ld;d++){
                                    if(!(types.card[a].levels[b].class[c]==3&&d==0)){
                                        types.card[a].levels[b].effect[c][d]=round(types.card[a].levels[b].effect[c][d]*(10**random(-1.6,0.8)))
                                    }
                                }
                            }
                        }else{
                            for(let c=0,lc=types.card[a].levels[b].effect.length;c<lc;c++){
                                if(!(types.card[a].levels[b].class==3&&c==0)){
                                    types.card[a].levels[b].effect[c]=round(types.card[a].levels[b].effect[c]*(10**random(-1.6,0.8)))
                                }
                            }
                        }
                    }
                }
            }
        }
        for(let a=0,la=this.players;a<la;a++){
            this.addCombatant({x:0,y:0},this.player[a],a+1,0,false)
        }
        if(variants.mtg){
            this.cardManagers.forEach(cardManager=>cardManager.mtgListing())
        }
        this.packManagers.forEach(packManager=>packManager.assemble())
    }
    resetAnim(){
        this.anim={
            reserve:1,discard:1,dictionary:1,endTurn:1,cancel:1,extra:[],turn:[],drop:[],
            deck:[],dictionaryMulti:[],sell:[],food:[],reroll:[],rerollActive:[],
            defeat:0,afford:1,upAfford:false,energyUp:0,energyDown:0
        }
        for(let a=0,la=this.players;a<la;a++){
            this.anim.extra.push(0)
            this.anim.turn.push(0)
            this.anim.drop.push(1)
            this.anim.deck.push(1)
            this.anim.dictionaryMulti.push(1)
            this.anim.sell.push(1)
            this.anim.food.push(1)
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
                a==4&&this.player.includes(8)||
                a==5&&this.player.includes(11)||
                a==6&&this.player.includes(15)||
                a==7&&this.player.includes(16)||
                a==8&&this.player.includes(17)||
                a==9&&this.player.includes(18)
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
    sceneChange(past,post){
        if(this.initialized){
            this.cardManagers.forEach(cardManager=>cardManager.sceneChange())
        }
        switch(past){
            case 'rest':
                this.optionManagers.forEach(optionManager=>optionManager.removeAfter())
            break
        }
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
        this.encounter.world=encounter.world
        this.encounter.name=encounter.name
        for(let a=0,la=this.energy.base.length;a<la;a++){
            this.energy.gen[a]=variants.mtg?copyArray(this.energy.base[a]):this.energy.base[a]
        }
        this.turn={main:0,total:0,time:0,accelerate:0,active:false}
        this.counter={enemy:0,killed:0}
        this.result={defeat:false,victory:false,noAnim:false}
        this.reinforce={back:[],front:[],assault:{back:[],front:[]}}
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
                if(!this.modded(156)){
                    this.positionCombatant(playerCombatant,{x:encounter.player.position[la-1][a].x,y:encounter.player.position[la-1][a].y})
                }
            }
        }
        for(let a=0,la=encounter.enemy.length;a<la;a++){
            let effectiveName=encounter.enemy[a].name
            if(effectiveName=='-h Traitor'){
                let summon=this.combatantManager.getRandomNonexistingPlayer()
                if(summon>=0){
                    effectiveName=types.combatant[summon].name
                }
            }
            if(this.modded(1)&&floor(random(0,2))==0){
                this.reinforce.back.push({position:{x:encounter.enemy[a].position.x,y:encounter.enemy[a].position.y},name:effectiveName,turn:1,minion:false})
                this.quickReinforce(encounter.enemy[a].name)
            }else{
                this.addCombatant(encounter.enemy[a].position,findName(effectiveName,types.combatant),0,0,false)
            }
            if(effectiveName!='Prisoner Informant'){
                this.counter.enemy++
            }
        }
        for(let a=0,la=this.players;a<la;a++){
            let playerCombatant=this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)]
            if(playerCombatant.life>=0&&this.modded(156)){
                this.positionCombatant(playerCombatant,this.tileManager.getRandomTilePosition())
            }
        }
        for(let a=0,la=encounter.reinforce.length;a<la;a++){
            this.reinforce.back.push({position:{x:encounter.reinforce[a].position.x,y:encounter.reinforce[a].position.y},name:encounter.reinforce[a].name,turn:encounter.reinforce[a].turn,minion:false})
            if(encounter.reinforce[a].name!='Prisoner Informant'){
                this.counter.enemy++
            }
        }
        if(variants.assault){
            for(let a=0,la=encounter.assaultReinforce.length;a<la;a++){
                this.reinforce.assault.back.push({position:{x:encounter.assaultReinforce[a].position.x,y:encounter.assaultReinforce[a].position.y},name:encounter.assaultReinforce[a].name,turn:encounter.assaultReinforce[a].turn,minion:false})
            }
        }
        for(let a=0,la=encounter.ally.length;a<la;a++){
            this.addCombatantAbstract(encounter.ally[a].position,findName(encounter.ally[a].name,types.combatant),this.players+1,0,false,0)
            this.combatantManager.lastAlly()
        }
        for(let a=0,la=this.cardManagers.length;a<la;a++){
            this.cardManagers[a].reset()
            this.cardManagers[a].clear()
            this.cardManagers[a].copyAntiInnate(0,1,0,0)
            this.cardManagers[a].standardBase()
            this.cardManagers[a].shuffleStart(1)
            this.cardManagers[a].copyAntiInnate(0,1,1,0)
            if(variants.transcend){
                this.cardManagers[a].allGroupEffect(88)
            }
            if(variants.mtg){
                this.cardManagers[a].mtgLastColor=6
            }
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
        if(this.modded(154)){
            this.combatantManager.randomEnemyEffect(12,[])
        }
        this.attackManager.clear()
        this.turnManager.clear()
        this.particleManager.clear()
        if(this.encounter.class==0&&this.encounter.world!=-1&&encounter.ally.length==0&&!this.modded(10)){
            if(this.first){
                let tile=this.tileManager.getRandomTilePosition()
                this.encounter.custom=tile==-1?[0,0]:[constrain(floor(random(-3,5)),0,4),tile]
            }
            if(this.encounter.custom[0]>0){
                let list=['Medic','Smith','Navigator','Rich Kid']
                this.addCombatantAbstract(this.encounter.custom[1],findName(list[this.encounter.custom[0]-1],types.combatant),this.players+1,-30+floor(random(0,6))*60,false,0)
                this.combatantManager.recount()
            }
        }
        this.combatantManager.sendAllies()
        if(this.modded(51)){
            let tile=this.tileManager.getRandomTilePosition()
            if(tile!=-1){
                this.addCombatant(tile,findName('Sentry',types.combatant),0,0,false)
                this.counter.enemy++
                this.combatantManager.recount()
            }
        }
        if(this.modded(78)&&(this.encounter.class==1||this.encounter.class==2)){
            let tile=this.tileManager.getRandomTilePosition()
            if(tile!=-1){
                this.addCombatant(tile,findName('Bodyguard',types.combatant),0,0,false)
                this.combatantManager.recount()
            }
        }
        this.combatantManager.reID()
        this.tileManager.activate()
        if(this.modded(63)&&floor(random(0,2))==0){
            this.sendReinforce()
            this.tileManager.fire()
            this.turnManager.loadEnemyTurns()
            this.replayManager.list.push(new attack(-1005,this,0,[],0,0,0,0,0,0,0,0,0,{replay:1,direction:-999}))
            this.combatantManager.enableCombatants()
            this.turn.main=this.players
        }else if(variants.initiative){
            this.turnManager.loadEnemyTurnsMove()
            this.turn.main=this.players
        }else{
            this.startTurn()
        }
        if(this.encounter.class==2&&this.nodeManager.harmBoss>0){
            this.nodeManager.harmBoss=0
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
    addCombatantAbstract(position,type,team,direction,minion,spec){
        let truePosition=this.tileManager.getTilePosition(position.x,position.y)
        let relativePosition=this.tileManager.getTileRelativePosition(position.x,position.y)
        this.combatantManager.addCombatantAbstract(truePosition.x,truePosition.y,relativePosition.x,relativePosition.y,position.x,position.y,type,team,direction==0?(this.tileManager.getTileRelativeDirection(position.x,position.y,round((this.tileManager.width-1)/2),round((this.tileManager.height-1)/2))+random(-10,10)):direction,minion,spec)
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
    setReinforce(name,tilePosition){
        let index=this.tileManager.getTileIndex(tilePosition.x,tilePosition.y)
        if(index>=0){
            this.reinforce.front.push({position:{x:tilePosition.x,y:tilePosition.y},name:name,minion:true})
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
        this.reinforce={back:[],front:[],assault:{back:[],front:[]}}
        this.tileManager.clearReinforce()
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
        if(variants.assault){
            for(let a=0,la=this.reinforce.assault.back.length;a<la;a++){
                if(this.turn.total+this.turn.accelerate>=this.reinforce.assault.back[a].turn){
                    this.reinforce.assault.front.push({position:{x:this.reinforce.assault.back[a].position.x,y:this.reinforce.assault.back[a].position.y},name:this.reinforce.assault.back[a].name,minion:this.reinforce.assault.back[a].minion})
                    this.tileManager.tiles[this.tileManager.getTileIndex(this.reinforce.assault.back[a].position.x,this.reinforce.assault.back[a].position.y)].reinforce=true
                    this.reinforce.assault.back.splice(a,1)
                    a--
                    la--
                }
            }
        }
    }
    sendReinforce(){
        for(let a=0,la=this.reinforce.front.length;a<la;a++){
            if(this.tileManager.tiles[this.tileManager.getTileIndex(this.reinforce.front[a].position.x,this.reinforce.front[a].position.y)].occupied==0){
                let effectiveName=this.reinforce.front[a].name
                if(effectiveName=='-h Traitor'){
                    let summon=this.combatantManager.getRandomNonexistingPlayer()
                    if(summon>=0){
                        effectiveName=types.combatant[summon].name
                    }
                }
                this.addCombatant(this.reinforce.front[a].position,findName(effectiveName,types.combatant),0,1,this.reinforce.front[a].minion)
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
        if(variants.assault){
            for(let a=0,la=this.reinforce.assault.front.length;a<la;a++){
                if(this.tileManager.tiles[this.tileManager.getTileIndex(this.reinforce.assault.front[a].position.x,this.reinforce.assault.front[a].position.y)].occupied==0){
                    let effectiveName=this.reinforce.assault.front[a].name
                    if(effectiveName=='-h Traitor'){
                        let summon=this.combatantManager.getRandomNonexistingPlayer()
                        if(summon>=0){
                            effectiveName=types.combatant[summon].name
                        }
                    }
                    this.addCombatant(this.reinforce.assault.front[a].position,findName(effectiveName,types.combatant),0,1,this.reinforce.assault.front[a].minion)
                    this.counter.enemy++
                    this.tileManager.activate()
                    this.tileManager.tiles[this.tileManager.getTileIndex(this.reinforce.assault.front[a].position.x,this.reinforce.assault.front[a].position.y)].reinforce=false
                    this.reinforce.assault.front.splice(a,1)
                    a--
                    la--
                }else{
                    this.tileManager.tiles[this.tileManager.getTileIndex(this.reinforce.assault.front[a].position.x,this.reinforce.assault.front[a].position.y)].reinforce=false
                    let empty=this.tileManager.getEmptyTiles()
                    if(empty.length>0){
                        let tile=empty[floor(random(0,empty.length))]
                        this.reinforce.assault.front[a].position={x:this.tileManager.tiles[tile].tilePosition.x,y:this.tileManager.tiles[tile].tilePosition.y}
                        this.tileManager.tiles[tile].reinforce=true
                    }
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
    dropAbstract(player,type,level,color,variant,args){
        if(player<this.cardManagers.length){
            if(this.cardManagers[player].discard.addAbstract(type,level,color,0,variant,args)){
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
    dropDrawTop(player,type,level,color){
        if(player<this.cardManagers.length){
            if(this.cardManagers[player].reserve.add(type,level,color)){
                if(this.modded(70)&&!this.cardManagers[player].reserve.cards[this.cardManagers[player].reserve.cards.length-1].spec.includes(5)){
                    this.cardManagers[player].reserve.cards[this.cardManagers[player].reserve.cards.length-1].spec.push(5)
                }
                this.cardManagers[player].reserve.slideTop()
            }
            this.cardManagers[player].drop.addDrop(type,level,color)
        }
    }
    dropDrawShuffle(player,type,level,color){
        if(player<this.cardManagers.length){
            if(this.cardManagers[player].reserve.addAbstract(type,level,color,0,[5],[])){
                if(this.modded(70)&&!this.cardManagers[player].reserve.cards[this.cardManagers[player].reserve.cardShuffledIndex].spec.includes(5)){
                    this.cardManagers[player].reserve.cards[this.cardManagers[player].reserve.cardShuffledIndex].spec.push(5)
                }
            }
            this.cardManagers[player].drop.addDrop(type,level,color)
        }
    }
    dropDrawShuffleAbstract(player,type,level,color,variant,args){
        if(player<this.cardManagers.length){
            if(this.cardManagers[player].reserve.addAbstract(type,level,color,0,variant.concat(5),args)){
                if(this.modded(70)&&!this.cardManagers[player].reserve.cards[this.cardManagers[player].reserve.cardShuffledIndex].spec.includes(5)){
                    this.cardManagers[player].reserve.cards[this.cardManagers[player].reserve.cardShuffledIndex].spec.push(5)
                }
            }
            this.cardManagers[player].drop.addDrop(type,level,color)
        }
    }
    dropHand(player,type,level,color){
        if(player<this.cardManagers.length){
            if(this.cardManagers[player].hand.add(type,level,color)){
                if(this.modded(70)&&!this.cardManagers[player].hand.cards[this.cardManagers[player].hand.cards.length-1].spec.includes(5)){
                    this.cardManagers[player].hand.cards[this.cardManagers[player].hand.cards.length-1].spec.push(5)
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
    newTurn(){
        this.turn.active=false
        this.subTurn()
        this.turn.active=true
        this.cardManagers[this.turn.main].allEffect(3,39)
        if(variants.cyclicDraw||variants.blackjack){
            this.cardManagers[this.turn.main].regenDrops()
        }
        this.relicManager.activate(2,[this.turn.total,this.turn.main,this.cardManagers[this.turn.main].hand.lastTurnPlayed])
        this.turn.time=game.turnTime
    }
    endTurn(){
        let combatant=this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(this.turn.main)]
        combatant.endTurn()
        this.turn.endReady=false
        this.relicManager.activate(14,[this.turn.main,this.getEnergy(this.turn.main)])
        if(combatant.getStatus('Retain Hand')>0){
            combatant.status.main[findList('Retain Hand',combatant.status.name)]--
        }else{
            this.cardManagers[this.turn.main].allEffect(2,1)
        }
        this.cardManagers[this.turn.main].reset()
        this.relicManager.activate(9,[this.turn.total,this.turn.main])
        if(variants.mtg){
            this.cardManagers[this.turn.main].mtgLastColor=6
        }
        if(variants.hungry){
            combatant.loseHealth(2)
        }
        let extra=false
        let noDraw=false
        if(combatant.getStatus('Extra Drawless Turn')>0){
            combatant.status.main[findList('Extra Drawless Turn',combatant.status.name)]--
            let lastEnergy=this.getEnergy(this.turn.main)
            combatant.extraTurn()
            this.baselineEnergy(this.turn.main,this.energy.gen[this.turn.main],combatant)
            if(!variants.mtg){
                this.addEnergy(max(0,(combatant.retainAllEnergy()?lastEnergy:this.relicManager.hasRelic(28,this.turn.main)&&this.turn.total>1?min(this.relicManager.active[28][this.turn.main+1],lastEnergy):0))-(this.modded(5)?max(3-this.turn.total,0):0),this.turn.main)
            }
            if(this.energy.temp[this.turn.main]>0){
                this.addEnergy(this.energy.temp[this.turn.main],this.turn.main)
            }else if(this.energy.temp[this.turn.main]<0){
                this.loseEnergy(-this.energy.temp[this.turn.main],this.turn.main)
            }
            this.energy.temp[this.turn.main]=0
            this.cardManagers[this.turn.main].discard.allEffectArgs(24,[5050,5051])
            this.cardManagers[this.turn.main].reserve.allEffectArgs(24,[5050,5051])
            noDraw=true
            extra=true
        }else if(combatant.getStatus('Extra Turn')>0){
            combatant.status.main[findList('Extra Turn',combatant.status.name)]--
            let lastEnergy=this.getEnergy(this.turn.main)
            combatant.extraTurn()
            this.baselineEnergy(this.turn.main,this.energy.gen[this.turn.main],combatant)
            if(!variants.mtg){
                this.addEnergy(max(0,(combatant.retainAllEnergy()?lastEnergy:this.relicManager.hasRelic(28,this.turn.main)&&this.turn.total>1?min(this.relicManager.active[28][this.turn.main+1],lastEnergy):0))-(this.modded(5)?max(3-this.turn.total,0):0),this.turn.main)
            }
            if(this.energy.temp[this.turn.main]>0){
                this.addEnergy(this.energy.temp[this.turn.main],this.turn.main)
            }else if(this.energy.temp[this.turn.main]<0){
                this.loseEnergy(-this.energy.temp[this.turn.main],this.turn.main)
            }
            this.energy.temp[this.turn.main]=0
            this.cardManagers[this.turn.main].discard.allEffectArgs(24,[5050,5051])
            this.cardManagers[this.turn.main].reserve.allEffectArgs(24,[5050,5051])
            extra=true
        }else{
            this.turn.main++
        }
        if(this.turn.main>=this.players){
            this.tileManager.activate()
            this.sendReinforce()
            this.tileManager.fire()
            this.turnManager.loadEnemyTurns()
            this.combatantManager.enableCombatants()
        }else if(!noDraw){
            combatant=this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(this.turn.main)]
            if(combatant.life<=0&&this.turn.main<this.players){
                this.endTurn()
            }else if(combatant.getStatus('Distracted')>0){
                combatant.statusEffect('Distracted',-1)
                this.endTurn()
            }else{
                if(extra){
                    this.cardManagers[this.turn.main].bufferedTurn=30
                }else{
                    this.newTurn()
                }
            }
        }
        this.updateTargetting()
    }
    baselineEnergy(player,gen,combatant){
        let effectiveGen=variants.mtg?copyArray(gen):gen
        if(variants.mtg){
            if(combatant.retainAllEnergy()){
                for(let a=0,la=this.energy.crystal[player].length;a<la;a++){
                    effectiveGen.splice(0,0,this.energy.crystal[player][la-1-a][0])
                    this.energy.crystal[player].splice(la-1-a,1)
                    a--
                    la--
                }
            }else{
                if(this.relicManager.hasRelic(424,player)){
                    for(let a=0,la=this.relicManager.active[424][player+1];a<la;a++){
                        let index=-1
                        for(let b=0,lb=this.energy.crystal[player].length;b<lb;b++){
                            if(this.energy.crystal[player][b][0]==6){
                                index=b
                                b=lb
                            }
                        }
                        if(index>=0){
                            effectiveGen.splice(0,0,this.energy.crystal[player][index][0])
                            this.energy.crystal[player].splice(index,1)
                        }
                    }
                }
                if(this.relicManager.hasRelic(363,player)){
                    for(let a=0,la=this.relicManager.active[363][player+1];a<la;a++){
                        if(this.energy.crystal[player].length>0){
                            let index=floor(random(0,this.energy.crystal[player].length))
                            effectiveGen.splice(0,0,this.energy.crystal[player][index][0])
                            this.energy.crystal[player].splice(index,1)
                        }
                    }
                }
            }
            this.resetEnergyCrystal(player)
            this.energy.main[player]=[0,0,0,0,0,0,0]
            let cap=484
            for(let a=0,la=this.energy.crystal[player].length;a<la;a++){
                let goal=a==0?459:this.energy.crystal[player][a-1][1]-25
                cap=min(goal,cap)
            }
            for(let a=0,la=effectiveGen.length;a<la;a++){
                this.energy.main[player][effectiveGen[a]]++
                this.energy.crystalTotal[player][effectiveGen[a]]++
                cap-=25
                this.energy.crystal[player].push([effectiveGen[a],cap,0,true,false,false,true])
            }
        }else{
            this.energy.main[player]=gen
        }
    }
    singularBaselineEnergy(player){
        let effectiveGen=variants.mtg?copyArray(this.energy.gen[player]):this.energy.gen[player]
        if(variants.mtg){
            this.resetEnergyCrystal(player)
            this.energy.main[player]=[0,0,0,0,0,0,0]
            let cap=484
            for(let a=0,la=this.energy.crystal[player].length;a<la;a++){
                let goal=a==0?459:this.energy.crystal[player][a-1][1]-25
                cap=min(goal,cap)
            }
            for(let a=0,la=effectiveGen.length;a<la;a++){
                this.energy.main[player][effectiveGen[a]]++
                this.energy.crystalTotal[player][effectiveGen[a]]++
                cap-=25
                this.energy.crystal[player].push([effectiveGen[a],cap,0,true,false,false,true])
            }
        }else{
            this.energy.main[player]=gen
        }
    }
    setTurn(value){
        let reverses=0
        for(let a=0,la=this.players;a<la;a++){
            reverses+=this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].getStatus('Turn Reversal')>0?1:0
        }
        if(reverses%2==1){
            this.turn.total=max(0,this.turn.total*2-value)
        }else{
            this.turn.total=value
        }
        this.cardManagers.forEach(cardManager=>cardManager.allEffect(2,63))
    }
    subTurn(){
        let combatant=this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(this.turn.main)]
        combatant.tick()
        if(!this.tutorialManager.active){
            if(this.turn.total<=1+this.relicManager.active[448][this.turn.main+1]){
                if(!variants.initiative){
                    for(let a=0,la=1+(this.relicManager.hasRelic(141,this.turn.main)?1-1:0)+(this.relicManager.hasRelic(107,this.turn.main)?1:0);a<la;a++){
                        this.cardManagers[this.turn.main].hand.add(findName('Initiative',types.card),0,0)
                    }
                }
            }
            if(this.turn.total==1){
                if(this.encounter.name=='Rewriter'){
                    this.cardManagers[this.turn.main].hand.add(findName('Rewrite',types.card),0,0)
                }
                if(this.encounter.name=='Duck Hunt'){
                    for(let a=0,la=3;a<la;a++){
                        this.dropDrawShuffle(this.turn.main,findName('Hunting\nRifle',types.card),0,0)
                    }
                }
                this.cardManagers[this.turn.main].switchCheck()
                if(variants.witch){
                    this.cardManagers[this.turn.main].hand.add(findName('Slot\nShift',types.card),0,0)
                }
            }
            if((this.turn.total==1||!variants.witch)&&!variants.blackjack){
                this.cardManagers[this.turn.main].allEffect(3,47)
                if(this.cardManagers[this.turn.main].reserve.cards.length+this.cardManagers[this.turn.main].discard.cards.length<this.cardManagers[this.turn.main].drawAmount&&this.cardManagers[this.turn.main].hand.cards.length>0&&this.cardManagers[this.turn.main].hand.numberAbstract(13,[])>0){
                    this.cardManagers[this.turn.main].bufferedTurn=30
                }else{
                    this.cardManagers[this.turn.main].turnDraw(this.turn.total)
                }
                if(this.turn.total==1){
                    this.cardManagers[this.turn.main].allEffect(0,48)
                }
                if(variants.mtg){
                    this.cardManagers[this.turn.main].mtgLastColor=6
                }
            }else if(variants.witch){
                this.cardManagers[this.turn.main].allEffect(3,42)
            }
        }
        this.attackManager.clear()
    }
    startTurn(){
        this.turn.active=false
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
        let combatant=this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(this.turn.main)]
        for(let a=0,la=this.energy.gen.length;a<la;a++){
            let lastEnergy=this.getEnergy(this.turn.main)
            this.baselineEnergy(a,this.energy.gen[a],combatant)
            if(!variants.mtg){
                this.addEnergy(max(0,(combatant.retainAllEnergy()?lastEnergy:this.relicManager.hasRelic(28,this.turn.main)&&this.turn.total>1?min(this.relicManager.active[28][this.turn.main+1],lastEnergy):0))-(this.modded(5)?max(3-this.turn.total,0):0)+this.energy.temp[this.turn.main],this.turn.main)
            }
            this.energy.temp[a]=0
        }
        this.combatantManager.setupCombatants()
        this.combatantManager.unmoveCombatants()
        this.combatantManager.enableCombatantsAlt()
        this.combatantManager.resetCombatantsAnim()
        this.tileManager.tick()
        this.tileManager.activate()
        this.combatantManager.setTargets()
        this.combatantManager.activateCombatants(0,0)
        this.updateTargetting()
        this.turnManager.clear()
        this.subTurn()
        this.cardManagers[this.turn.main].allEffect(3,39)
        this.cardManagers[0].regenDrops()
        this.relicManager.activate(2,[this.turn.total,this.turn.main,this.cardManagers[this.turn.main].hand.lastTurnPlayed])
        this.relicManager.activate(0,[this.turn.total,this.encounter.class])
        this.loadReinforce()
        if(combatant.life<=0&&this.turn.main<this.players){
            this.endTurn()
        }else if(combatant.getStatus('Distracted')>0){
            combatant.statusEffect('Distracted',-1)
            this.endTurn()
        }else{
            this.turn.active=true
        }
    }
    getXBoost(player){
        let userCombatant=this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(player)]
        return this.relicManager.active[121][player+1]*2+userCombatant.getStatus('X Cost Boost')
    }
    standardColorize(card){
        return variants.mtg?(types.card[card].mtg!=undefined?copyArray(types.card[card].mtg.color):[0]):types.card[card].list
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
            for(let a=0,la=this.getEnergy(player);a<la;a++){
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
        if(variants.running){
            for(let a=0,la=this.cardManagers[player].hand.cards.length;a<la;a++){
                if(!this.cardManagers[player].hand.cards[a].deSize){
                    this.cardManagers[player].hand.cards[a].deSize=true
                    a=la
                }
            }
            this.cardManagers[player].draw(1)
        }
        this.stats.played[player][0]++
        this.stats.played[player][cardClass]++
        this.cardManagers[player].hand.totalPlayed[0]++
        if(cardClass!=0){
            this.cardManagers[player].hand.totalPlayed[cardClass]++
        }
        this.cardManagers[player].hand.turnPlayed[0]++
        if(cardClass!=0){
            this.cardManagers[player].hand.turnPlayed[cardClass]++
        }
        let userCombatant=this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(player)]
        if(this.modded(155)){
            switch(card.edition){
                case 1:
                    if(this.relicManager.hasRelic(354,player)){
                        userCombatant.loseHealth(1+1*this.relicManager.active[354][player+1])
                    }else{
                        userCombatant.loseHealth(1)
                    }
                break
                case 2:
                    if(this.relicManager.hasRelic(349,player)){
                        userCombatant.block=max(0,userCombatant.block-(5+5*this.relicManager.active[349][player+1]))
                    }else{
                        userCombatant.block=max(0,userCombatant.block-5)
                    }
                break
                case 3:
                    userCombatant.statusEffect('Temporary Strength',-2)
                break
                case 4:
                    this.loseEnergy(1,player)
                    if(this.relicManager.hasRelic(249,player)){
                        this.attackManager.editionCard(-6)
                    }
                break
                case 5:
                    this.cardManagers[player].hand.randomEffect(0,[])
                    this.cardManagers[player].hand.randomEffect(0,[])
                break
                case 6:
                    this.attackManager.editionCard(-6)
                    if(this.relicManager.hasRelic(249,player)){
                        this.loseEnergy(1,player)
                    }
                break
                case 7:
                    this.cardManagers[player].draw(1)
                break
                case 8:
                    this.cardManagers[player].hand.randomEffect(0,[])
                break
            }
        }else{
            switch(card.edition){
                case 1:
                    if(this.relicManager.hasRelic(354,player)){
                        userCombatant.heal(1+1*this.relicManager.active[354][player+1])
                    }else{
                        userCombatant.heal(1)
                    }
                break
                case 2:
                    if(this.relicManager.hasRelic(349,player)){
                        userCombatant.addBlock(5+5*this.relicManager.active[349][player+1])
                    }else{
                        userCombatant.addBlock(5)
                    }
                break
                case 3:
                    userCombatant.statusEffect('Temporary Strength',2)
                break
                case 4:
                    this.addSpecificEnergy(1,player,6)
                    if(this.relicManager.hasRelic(249,player)){
                        this.attackManager.editionCard(6)
                    }
                break
                case 5:
                    this.cardManagers[player].draw(2)
                break
                case 6:
                    this.attackManager.editionCard(6)
                    if(this.relicManager.hasRelic(249,player)){
                        this.addSpecificEnergy(1,player,6)
                    }
                break
                case 7:
                    this.cardManagers[player].hand.randomEffect(0,[])
                break
                case 8:
                    this.cardManagers[player].addRandomAbstract(2,0,0,0,7,[],[3,[1]])
                break
            }
        }
        if(userCombatant.name=='Daiyousei'){
            userCombatant.vision++
        }
        let effectiveCost=variants.mtg?(card.specialCost?card.cost[0]:card.cost.length):card.cost
        switch(cardClass){
            case 1:
                if(userCombatant.getStatus('Must Attack or Take Damage')>0){
                    userCombatant.status.main[findList('Must Attack or Take Damage',userCombatant.status.name)]=0
                }
                if(userCombatant.getStatus('Attack Draw')>0){
                    this.cardManagers[player].draw(userCombatant.getStatus('Attack Draw'))
                }
            break
            case 3:
                if(userCombatant.getStatus('Double Damage Without Movement')>0){
                    userCombatant.statusEffect('Double Damage Without Movement',-1)
                }
                if(card.basic&&userCombatant.getStatus('Step Draw')>0){
                    this.cardManagers[player].draw(userCombatant.getStatus('Step Draw'))
                }
            break
            case 4:
                if(userCombatant.getStatus('Power Draw')>0){
                    this.cardManagers[player].draw(userCombatant.getStatus('Power Draw'))
                }
                if(userCombatant.getStatus('Power Basic Orb')>0){
                    for(let a=0,la=userCombatant.getStatus('Power Basic Orb');a<la;a++){
                        userCombatant.holdOrb(0)
                    }
                }
                if(userCombatant.getStatus('Double Damage Without Power')>0){
                    userCombatant.statusEffect('Double Damage Without Power',-1)
                }
            break
        }
        if(userCombatant.getStatus('Card Play Block')>0){
            userCombatant.addBlock(userCombatant.getStatus('Card Play Block'))
        }
        if(effectiveCost==2&&userCombatant.getStatus('2 Cost Block')>0){
            userCombatant.addBlock(userCombatant.getStatus('2 Cost Block'))
        }
        if((card.name=='Strike'||card.name=='Strike-')&&userCombatant.getStatus('Strike Block')>0){
            userCombatant.addBlock(userCombatant.getStatus('Strike Block'))
        }
        if((card.name=='Strike'||card.name=='Strike-')&&userCombatant.getStatus('Strike Lock On')>0){
            if(this.attackManager.attacks[this.attackManager.attacks.length-1].type==1){
                this.attackManager.attacks[this.attackManager.attacks.length-1].type=5117
                this.attackManager.attacks[this.attackManager.attacks.length-1].effect.push(userCombatant.getStatus('Strike Lock On'))
            }
        }
        if(effectiveCost==0&&userCombatant.getStatus('0 Cost Single Damage Up')>0){
            userCombatant.statusEffect('Single Damage Up',userCombatant.getStatus('0 Cost Single Damage Up'))
        }
        if(effectiveCost>=2&&userCombatant.getStatus('2+ Cost Energy')>0){
            this.addEnergy(userCombatant.getStatus('2+ Cost Energy'),player)
        }
        if(effectiveCost>=2&&userCombatant.getStatus('2+ Cost (E)')>0){
            this.addSpecificEnergy(userCombatant.getStatus('2+ Cost (E)'),player,6)
        }
        if(effectiveCost>=2&&userCombatant.getStatus('2+ Cost Draw')>0){
            this.cardManagers[player].draw(userCombatant.getStatus('2+ Cost Draw'))
        }
        if(effectiveCost>=3&&userCombatant.getStatus('3+ Cost Free Discus')>0){
            for(let a=0,la=userCombatant.getStatus('3+ Cost Free Discus');a<la;a++){
                this.cardManagers[player].hand.addAbstract(findName('Dual\nDiscus',types.card),0,0,0,[0])
            }
        }
        if(effectiveCost>=3&&userCombatant.getStatus('3+ Cost Free Upgraded Discus')>0){
            for(let a=0,la=userCombatant.getStatus('3+ Cost Free Upgraded Discus');a<la;a++){
                this.cardManagers[player].hand.addAbstract(findName('Dual\nDiscus',types.card),1,0,0,[0])
            }
        }
        if(card.colorless()&&userCombatant.getStatus('Colorless Damage All')>0){
            this.combatantManager.allEffect(43,[userCombatant.getStatus('Colorless Damage All'),userCombatant.id])
        }
        if(card.rarity==0&&userCombatant.getStatus('Common Temporary Strength')>0){
            userCombatant.statusEffect('Temporary Strength',userCombatant.getStatus('Common Temporary Strength'))
        }
        if(card.name=='Fatigue'&&userCombatant.getStatus('Fatigue Splash')>0){
            this.combatantManager.areaAbstract(0,[userCombatant.getStatus('Fatigue Splash'),userCombatant.id,0],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
            this.particleManager.particlesBack.push(new particle(this.layer,userCombatant.position.x,userCombatant.position.y,93,[8]))
        }
        if(card.spec.includes(25)&&userCombatant.getStatus('Gun Temporary Strength')>0){
            userCombatant.statusEffect('Temporary Strength',userCombatant.getStatus('Gun Temporary Strength'))
        }
        if(card.spec.includes(25)&&userCombatant.getStatus('Gun Block')>0){
            userCombatant.addBlock(userCombatant.getStatus('Gun Block'))
        }
        if(effectiveCost>=2&&userCombatant.getStatus('2+ Cost Single Damage Up')>0){
            userCombatant.statusEffect('Single Damage Up',userCombatant.getStatus('2+ Cost Single Damage Up'))
        }
        if(effectiveCost>=2&&userCombatant.getStatus('2+ Cost Block')>0){
            userCombatant.addBlock(userCombatant.getStatus('2+ Cost Block'))
        }
        if(effectiveCost>=3&&userCombatant.getStatus('3+ Cost Single Damage Up')>0){
            userCombatant.statusEffect('Single Damage Up',userCombatant.getStatus('3+ Cost Single Damage Up'))
        }
        if(effectiveCost>=3&&userCombatant.getStatus('3+ Cost Block')>0){
            userCombatant.addBlock(userCombatant.getStatus('3+ Cost Block'))
        }
        if(effectiveCost==-1&&userCombatant.getStatus('X Cost Boost')>0){
            userCombatant.status.main[findList('X Cost Boost',userCombatant.status.name)]=0
        }
        if(userCombatant.getStatus('Play Limit')>0&&this.cardManagers[player].hand.turnPlayed[0]>=userCombatant.getStatus('Play Limit')){
            this.cardManagers[player].allEffect(2,2)
        }
        if(card.spec.includes(35)&&userCombatant.getStatus('Countdown Chain')>0){
            this.cardManagers[player].hand.randomEffect(26,[userCombatant.getStatus('Countdown Chain')])
        }
        if(this.cardManagers[player].hand.totalPlayed[0]%5==0&&userCombatant.getStatus('5 Card Energy')>0){
            this.addEnergy(userCombatant.getStatus('5 Card Energy'),player)
        }
        if(this.cardManagers[player].hand.totalPlayed[0]%5==0&&userCombatant.getStatus('5 Card Random Mana')>0){
            this.addSpecificEnergy(userCombatant.getStatus('5 Card Random Mana'),player,floor(random(0,7)))
        }
        if(cardClass==11&&userCombatant.getStatus('Skill Temporary Strength')>0){
            userCombatant.statusEffect('Temporary Strength',userCombatant.getStatus('Skill Temporary Strength'))
        }
        if(this.cardManagers[player].hand.totalPlayed[0]%13==0&&userCombatant.getStatus('13 Card Block')>0){
            userCombatant.addBlock(userCombatant.getStatus('13 Card Block'))
        }
        if(this.cardManagers[player].hand.totalPlayed[0]%13==0&&userCombatant.getStatus('13 Card Draw')>0){
            this.cardManagers[player].draw(userCombatant.getStatus('13 Card Draw'))
        }
        if(cardClass==12&&!card.spec.includes(60)&&userCombatant.getStatus('Wish Miracle')>0){
            for(let a=0,la=userCombatant.getStatus('Wish Miracle');a<la;a++){
                this.cardManagers[player].hand.add(findName('Miracle',types.card),0,0)
            }
        }
        if(card.getBasic(-1)&&userCombatant.getStatus('Basic Temporary Strength')>0){
            userCombatant.statusEffect('Temporary Strength',userCombatant.getStatus('Basic Temporary Strength'))
        }
        if(card.getBasic(-1)&&userCombatant.getStatus('Basic Draw')>0){
            this.cardManagers[player].draw(userCombatant.getStatus('Basic Draw'))
        }
        if(userCombatant.getStatus('Card Delay Exhaust')>0){
            this.cardManagers[player].hand.exhaust(userCombatant.getStatus('Card Delay Exhaust'))
            userCombatant.status.main[findList('Card Delay Exhaust',userCombatant.status.name)]=0
        }
        if(userCombatant.getStatus('Card Delay Draw')>0){
            this.cardManagers[player].draw(userCombatant.getStatus('Card Delay Draw'))
            userCombatant.status.main[findList('Card Delay Draw',userCombatant.status.name)]=0
        }
        if(card.spec.includes(54)&&userCombatant.getStatus('Discus Temporary Strength')>0){
            userCombatant.statusEffect('Temporary Strength',userCombatant.getStatus('Discus Temporary Strength'))
        }
        if(card.spec.includes(54)&&userCombatant.getStatus('Discus Temporary Dexterity')>0){
            userCombatant.statusEffect('Temporary Dexterity',userCombatant.getStatus('Discus Temporary Dexterity'))
        }
        this.combatantManager.playCardFront(cardClass,card)
        this.relicManager.activate(4,[cardClass,player,card,this.cardManagers[player].hand.turnPlayed])
    }
    displayCurrency(){
        this.layer.stroke(0)
        this.layer.strokeWeight(0.4)
        this.layer.fill(240,240,220)
        this.layer.ellipse(20,16,16)
        if(this.currency.money.length>1){
            this.layer.ellipse(this.layer.width-20,16,16)
        }
        this.layer.noStroke()
        this.layer.fill(220,220,200)
        this.layer.ellipse(20,16,10)
        if(this.currency.money.length>1){
            this.layer.ellipse(this.layer.width-20,16,10)
        }
        this.layer.fill(255,255,100)
        this.layer.ellipse(20,16,4)
        this.layer.triangle(19,13,21,13,20,9)
        this.layer.triangle(19,19,21,19,20,23)
        if(this.currency.money.length>1){
            this.layer.ellipse(this.layer.width-20,16,4)
            this.layer.triangle(this.layer.width-19,13,this.layer.width-21,13,this.layer.width-20,9)
            this.layer.triangle(this.layer.width-19,19,this.layer.width-21,19,this.layer.width-20,23)
        }
        this.layer.fill(230,230,210)
        this.layer.stroke(0)
        this.layer.strokeWeight(1)
        this.layer.textSize(16)
        this.layer.textAlign(LEFT,CENTER)
        this.layer.text(this.currency.money[0],30,18)
        if(this.currency.money.length>1){
            this.layer.textAlign(RIGHT,CENTER)
            this.layer.text(this.currency.money[1],this.layer.width-30,18)
        }
        this.layer.textAlign(CENTER,CENTER)
    }
    addEnergy(amount,player){
        this.relicManager.activate(17,[amount,player])
        if(player<this.players){
            if(amount!=0){
                this.anim[amount>0?'energyUp':'energyDown']=1
            }
            this.cardManagers[player].allEffectArgs(2,25,[amount])
            this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(player)].energyChange(amount)
            if(variants.mtg){
                this.energy.main[player][this.cardManagers[player].mtgLastColor]+=amount
            }else{
                this.energy.main[player]+=amount
            }
        }
    }
    addSpecificEnergy(amount,player,type){
        this.relicManager.activate(17,[amount,player])
        if(player<this.players){
            if(amount!=0){
                this.anim[amount>0?'energyUp':'energyDown']=1
            }
            this.cardManagers[player].allEffectArgs(2,25,[amount])
            this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(player)].energyChange(amount)
            if(variants.mtg){
                if(type==-1){
                    for(let a=0,la=amount;a<la;a++){
                        let choice=floor(random(0,7))
                        this.energy.main[player][choice]+=amount
                        let cap=484
                        for(let a=0,la=this.energy.crystal[player].length;a<la;a++){
                            cap=min(a==0?459:this.energy.crystal[player][a-1][1]-25,cap)
                        }
                        cap-=25
                        this.energy.crystal[player].push([this.setupMtgManaChoice,cap,0,true,false,false,true])
                        this.energy.crystalTotal[player][this.setupMtgManaChoice]++
                    }
                }else{
                    this.energy.main[player][type]+=amount
                    for(let a=0,la=amount;a<la;a++){
                        let cap=484
                        for(let a=0,la=this.energy.crystal[player].length;a<la;a++){
                            cap=min(a==0?459:this.energy.crystal[player][a-1][1]-25,cap)
                        }
                        cap-=25
                        this.energy.crystal[player].push([type,cap,0,true,false,false,true])
                        this.energy.crystalTotal[player][type]++
                    }
                }
            }else{
                this.energy.main[player]+=amount
            }
        }
    }
    addEnergyGen(amount,player){
        if(player<this.players){
            if(amount!=0){
                this.anim[amount>0?'energyUp':'energyDown']=1
            }
            if(variants.mtg){
                for(let a=0,la=amount;a<la;a++){
                    this.energy.gen[player].push(6)
                }
            }else{
                this.energy.gen[player]+=amount
            }
        }
    }
    addSpecificEnergyGen(amount,player,type){
        if(player<this.players){
            if(amount!=0){
                this.anim[amount>0?'energyUp':'energyDown']=1
            }
            if(variants.mtg){
                for(let a=0,la=amount;a<la;a++){
                    this.energy.gen[player].push(type)
                }
            }else{
                this.energy.gen[player]+=amount
            }
        }
    }
    purify(amount,player){
        if(variants.mtg){
            for(let a=0,la=amount;a<la;a++){
                let cap=0
                for(let b=0,lb=this.energy.main[player].length;b<lb;b++){
                    if(b!=0&&b!=6){
                        cap=max(this.energy.main[player][b],cap)
                    }
                }
                if(cap>0){
                    let top=[]
                    for(let b=0,lb=this.energy.main[player].length;b<lb;b++){
                        if(b!=0&&b!=6&&cap==this.energy.main[player][b]){
                            top.push(b)
                        }
                    }
                    if(top.length>0){
                        let choice=top[floor(random(0,top.length))]
                        this.energy.main[player][choice]--
                        this.energy.main[player][0]++
                        this.energy.crystalTotal[player][choice]--
                        this.energy.crystalTotal[player][0]++
                        let crystals=[]
                        for(let b=0,lb=this.energy.crystal[player].length;b<lb;b++){
                            if(this.energy.crystal[player][b][0]==choice&&this.energy.crystal[player][b][3]){
                                crystals.push(b)
                            }
                        }
                        if(crystals.length>0){
                            let index=crystals[floor(random(0,crystals.length))]
                            this.energy.crystal[player][index][3]=false
                            this.energy.crystal[player][index][6]=false
                            this.energy.crystal[player].splice(index,0,[0,this.energy.crystal[player][index][1],0,true,this.energy.crystal[player][index][4],this.energy.crystal[player][index][5],true])
                        }
                    }
                }
            }
        }
    }
    loseEnergy(amount,player){
        this.relicManager.activate(17,[-amount,player])
        this.energy.lastSpend[player]=variants.mtg?[]:amount
        if(player<this.players){
            if(amount!=0){
                this.anim[amount>0?'energyDown':'energyUp']=1
            }
            this.cardManagers[player].allEffectArgs(2,25,[-amount])
            this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(player)].energyChange(-amount)
            if(variants.mtg){
                let available=[]
                for(let a=0,la=this.energy.main[player].length;a<la;a++){
                    for(let b=0,lb=this.energy.main[player][a];b<lb;b++){
                        available.push(a)
                    }
                }
                for(let a=0,la=amount;a<la;a++){
                    if(available.length>0){
                        let index=floor(random(0,available.length))
                        this.energy.main[player][available[index]]--
                        this.energy.lastSpend[player].push(available[index])
                        available.splice(index,1)
                    }
                }
            }else{
                this.energy.main[player]-=amount
            }
        }
    }
    loseSpecificEnergy(amount,player,type){
        this.relicManager.activate(17,[-amount,player])
        this.energy.lastSpend[player]=variants.mtg?[]:amount
        if(player<this.players){
            if(amount!=0){
                this.anim[amount>0?'energyDown':'energyUp']=1
            }
            this.cardManagers[player].allEffectArgs(2,25,[-amount])
            this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(player)].energyChange(-amount)
            if(type==6){
                let amountLeft=amount
                for(let a=0,la=amountLeft;a<la;a++){
                    for(let b=0,lb=this.energy.crystal[player].length;b<lb;b++){
                        if(this.energy.crystal[player][lb-1-b][3]&&this.energy.crystal[player][lb-1-b][0]!=6&&amountLeft>0){
                            this.energy.crystal[player][lb-1-b][3]=false
                            this.energy.crystalTotal[player][this.energy.crystal[player][lb-1-b][0]]--
                            this.energy.main[player][this.energy.crystal[player][lb-1-b][0]]--
                            this.energy.lastSpend[player].push(this.energy.crystal[player][lb-1-b][0])
                            b=lb
                            amountLeft--
                        }
                    }
                }
                if(amountLeft>0){
                    for(let a=0,la=amountLeft;a<la;a++){
                        for(let b=0,lb=this.energy.crystal[player].length;b<lb;b++){
                            if(this.energy.crystal[player][lb-1-b][3]&&amountLeft>0){
                                this.energy.crystal[player][lb-1-b][3]=false
                                this.energy.crystalTotal[player][this.energy.crystal[player][lb-1-b][0]]--
                                this.energy.main[player][this.energy.crystal[player][lb-1-b][0]]--
                                this.energy.lastSpend[player].push(this.energy.crystal[player][lb-1-b][0])
                                b=lb
                                amountLeft--
                            }
                        }
                    }
                }
            }else{
                let left=amount
                if(this.energy.main[player][type]>=left){
                    this.energy.main[player][type]-=left
                    for(let a=0,la=left;a<la;a++){
                        this.energy.lastSpend[player].push(type)
                    }
                    left=0
                }else if(this.energy.main[player][type]>0){
                    left-=this.energy.main[player][type]
                    for(let a=0,la=this.energy.main[player][type];a<la;a++){
                        this.energy.lastSpend[player].push(type)
                    }
                    this.energy.main[player][type]=0
                }
                if(left>0){
                    if(this.energy.main[player][6]>=left){
                        this.energy.main[player][6]-=left
                        for(let a=0,la=left;a<la;a++){
                            this.energy.lastSpend[player].push(6)
                        }
                        left=0
                    }else if(this.energy.main[player][6]>0){
                        left-=this.energy.main[player][6]
                        for(let a=0,la=this.energy.main[player][6];a<la;a++){
                            this.energy.lastSpend[player].push(6)
                        }
                        this.energy.main[player][6]=0
                    }
                }
            }
        }
    }
    mtgCountCost(cost,player,cards){
        let userCombatant=this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(player)]
        this.energy.lastSpend[player]=[]
        let costLeft=copyArray(cost)
        let effectiveEnergy=[0,0,0,0,0,0,0]
        for(let a=0,la=this.energy.crystal[player].length;a<la;a++){
            if(this.energy.crystal[player][a][4]){
                effectiveEnergy[this.energy.crystal[player][a][0]]+=(userCombatant.getStatus('Double Countdowns')>0?2:1)
            }
        }
        return mtgAutoCost(effectiveEnergy,costLeft,2,[cards],true)
    }
    mtgLose(player,energyPay){
        for(let a=0,la=energyPay.length;a<la;a++){
            if(this.energy.main[player][energyPay[a]]>0){
                this.energy.main[player][energyPay[a]]--
                this.energy.lastSpend[player].push(energyPay[a])
            }
        }
    }
    mtgCost(cost,player,cards,halving=false){
        let chainedEnergy=[]
        for(let a=0,la=this.energy.crystal[player].length;a<la;a++){
            chainedEnergy.push(this.energy.crystal[player][a][0])
        }
        this.attackManager.mtgEnergy=chainedEnergy
        this.energy.lastSpend[player]=[]
        let costLeft=copyArray(cost)
        let effectiveEnergy=[0,0,0,0,0,0,0]
        for(let a=0,la=this.energy.crystal[player].length;a<la;a++){
            if(this.energy.crystal[player][a][3]&&this.energy.crystal[player][a][4]){
                effectiveEnergy[this.energy.crystal[player][a][0]]++
            }
        }
        let result=mtgAutoCost(effectiveEnergy,costLeft,2,[cards],true)
        let energyPay=result[0]
        costLeft=result[1]
        if(halving){
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
        this.mtgLose(player,energyPay)
        energyPay=mtgAutoCost(this.energy.main[player],costLeft,3,[cards],true)
        if(halving){
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
        this.mtgLose(player,energyPay)
        let boost=this.getXBoost(player)
        this.attackManager.energy=this.energy.lastSpend[player].length+boost
        for(let a=0,la=boost;a<la;a++){
            this.energy.lastSpend[player].push(-1)
        }
        if(variants.mtg){
            this.attackManager.spendCard(this.energy.lastSpend[player],this.cardManagers[player].hand.cardInUse,player)
        }
    }
    mtgUnmark(player){
        for(let a=0,la=this.energy.crystal[player].length;a<la;a++){
            this.energy.crystal[player][a][4]=false
            this.energy.crystal[player][a][5]=false
        }
    }
    mtgMark(cost,player,cards){
        let costLeft=copyArray(cost)
        let effectiveEnergy=[0,0,0,0,0,0,0]
        for(let a=0,la=this.energy.crystal[player].length;a<la;a++){
            if(this.energy.crystal[player][a][5]){
                effectiveEnergy[this.energy.crystal[player][a][0]]++
            }else if(this.energy.crystal[player][a][4]&&!this.energy.crystal[player][a][5]){
                this.energy.crystal[player][a][4]=false
            }
        }
        let result=mtgAutoCost(effectiveEnergy,costLeft,2,[cards],true)
        costLeft=result[1]
        let energyPay=mtgAutoCost(this.energy.main[player],costLeft,1,[cards],true)
        let replace=[]
        for(let a=0,la=energyPay.length;a<la;a++){
            for(let b=0,lb=this.energy.crystal[player].length;b<lb;b++){
                if(this.energy.crystal[player][lb-1-b][0]==energyPay[a]&&this.energy.crystal[player][lb-1-b][3]&&!this.energy.crystal[player][lb-1-b][4]){
                    this.energy.crystal[player][lb-1-b][4]=true
                    replace.push(lb-1-b)
                    b=lb
                }
            }
        }
        replace=sortNumbers(replace)
        let totalMoved=0
        for(let a=0,la=replace.length;a<la;a++){
            let temp=this.energy.crystal[player][replace[a]-totalMoved]
            this.energy.crystal[player].splice(replace[a]-totalMoved,1)
            this.energy.crystal[player].push(temp)
            totalMoved++
        }
    }
    loseEnergyGen(amount,player){
        if(player<this.players){
            if(amount!=0){
                this.anim[amount>0?'energyDown':'energyUp']=1
            }
            if(variants.mtg){
                for(let a=0,la=amount;a<la;a++){
                    if(this.energy.gen[player].length>0){
                        this.energy.gen[player].splice(this.energy.gen[player].length-1,1)
                    }
                }
            }else{
                this.energy.gen[player]-=amount
            }
        }
    }
    loseRandomEnergyGen(amount,player){
        if(player<this.players){
            if(amount!=0){
                this.anim[amount>0?'energyDown':'energyUp']=1
            }
            if(variants.mtg){
                for(let a=0,la=amount;a<la;a++){
                    if(this.energy.gen[player].length>0){
                        this.energy.gen[player].splice(floor(random(0,this.energy.gen[player].length)),1)
                    }
                }
            }else{
                this.energy.gen[player]-=amount
            }
        }
    }
    setEnergy(amount,player){
        if(player<this.players){
            if(variants.mtg){
                if(amount!=total7(this.energy.main[player])){
                    this.anim[amount>total7(this.energy.main[player])?'energyUp':'energyDown']=1
                }
                this.relicManager.activate(17,[amount-total7(this.energy.main[player]),player])
                this.cardManagers[player].allEffectArgs(2,25,[amount-total7(this.energy.main[player])])
                this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(player)].energyChange(amount-total7(this.energy.main[player]))
                if(total7(this.energy.main[player])>amount){
                    this.loseEnergy(total7(this.energy.main[player])-amount,player)
                }else if(total7(this.energy.main[player])<amount){
                    this.addEnergy(amount-total7(this.energy.main[player]),player)
                }
            }else{
                if(amount!=this.energy.main[player]){
                    this.anim[amount>this.energy.main[player]?'energyUp':'energyDown']=1
                }
                this.relicManager.activate(17,[amount-this.energy.main[player],player])
                this.cardManagers[player].allEffectArgs(2,25,[amount-this.energy.main[player]])
                this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(player)].energyChange(amount-this.energy.main[player])
                this.energy.main[player]=amount
            }
        }
    }
    setSpecificEnergy(amount,player,type){
        if(player<this.players){
            if(variants.mtg){
                let total=type==6?total7(this.energy.main[player]):this.energy.main[player][type]+this.energy.main[player][6]
                if(amount!=total){
                    this.anim[amount>total?'energyUp':'energyDown']=1
                }
                this.relicManager.activate(17,[amount-total,player])
                this.cardManagers[player].allEffectArgs(2,25,[amount-total])
                this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(player)].energyChange(amount-total7(this.energy.main[player]))
                if(total7(this.energy.main[player])>amount){
                    this.loseSpecificEnergy(total-amount,player,type)
                }else if(total7(this.energy.main[player])<amount){
                    this.addSpecificEnergy(amount-total,player,type)
                }
            }else{
                if(amount!=this.energy.main[player]){
                    this.anim[amount>this.energy.main[player]?'energyUp':'energyDown']=1
                }
                this.relicManager.activate(17,[amount-this.energy.main[player],player])
                this.cardManagers[player].allEffectArgs(2,25,[amount-this.energy.main[player]])
                this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(player)].energyChange(amount-this.energy.main[player])
                this.energy.main[player]=amount
            }
        }
    }
    multiplyEnergy(amount,player){
        if(player<this.players){
            if(amount!=1){
                this.anim[amount>1?'energyUp':'energyDown']=1
            }
            if(variants.mtg){
                this.cardManagers[player].allEffectArgs(2,25,[(amount-1)*total7(this.energy.main[player])])
                this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(player)].energyChange((amount-1)*total7(this.energy.main[player]))
                for(let a=0,la=this.energy.crystal[player].length;a<la;a++){
                    if(this.energy.crystal[player][a][1]){
                        this.energy.crystal[player].splice(a,0,copyArray(this.energy.crystal[player][a]))
                        a++
                        la++
                    }
                }
            }else{
                this.cardManagers[player].allEffectArgs(2,25,[(amount-1)*this.energy.main[player]])
                this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(player)].energyChange((amount-1)*this.energy.main[player])
                this.energy.main[player]*=amount
            }
        }
    }
    getEnergy(player){
        return variants.mtg?total7(this.energy.main[player]):this.energy.main[player]
    }
    getActiveEnergy(player){
        if(variants.mtg){
            let total=0
            for(let a=0,la=this.energy.crystal[player].length;a<la;a++){
                if(this.energy.crystal[player][a][4]){
                    total++
                }
            }
            return total
        }else{
            return this.energy.main[player]
        }
    }
    getSpecificEnergy(player,type){
        return this.energy.main[player][type]+(type==6?this.energy.main[player][0]+this.energy.main[player][1]+this.energy.main[player][2]+this.energy.main[player][3]+this.energy.main[player][4]+this.energy.main[player][5]:this.energy.main[player][6])
    }
    getSingularEnergy(player,type){
        return this.energy.main[player][type]
    }
    getSplitEnergy(player){
        return this.energy.main[player]
    }
    getEnergyBase(player){
        return variants.mtg?this.energy.base[player].length:this.energy.base[player]
    }
    addEnergyBase(player){
        if(variants.mtg){
            this.overlayManager.overlays[64][player].active=true
            this.overlayManager.overlays[64][player].activate([])
        }else{
            this.energy.base[player]++
        }
    }
    loseEnergyBase(player){
        if(variants.mtg){
            this.overlayManager.overlays[120][player].active=true
            this.overlayManager.overlays[120][player].activate([])
        }else{
            this.energy.base[player]--
        }
    }
    addSpecificEnergyBase(player,type){
        if(variants.mtg){
            this.energy.base[player].push(type)
        }else{
            this.energy.base[player]++
        }
    }
    loseSpecificEnergyBase(player,type){
        if(variants.mtg){
            if(this.energy.base[player].includes(type)){
                for(let a=0,la=this.energy.base[player].length;a<la;a++){
                    if(this.energy.base[player][la-1-a]==type){
                        this.energy.base[player].splice(la-1-a,1)
                        a=la
                    }
                }
            }else{
                this.energy.base[player].splice(this.energy.base[player].length-1,1)
            }
            this.cardManagers[player].mtgListing()
        }else{
            this.energy.base[player]--
        }
    }
    setEnergyMainGen(player){
        if(variants.mtg){
            this.energy.main[player]=[0,0,0,0,0,0,0]
            for(let a=0,la=this.energy.gen[player].length;a<la;a++){
                this.energy.main[player][this.energy.gen[player][a]]++
            }
        }else{
            this.energy.main[player]=this.energy.gen[player]
        }
    }
    resetEnergyGeneral(player){
        if(variants.mtg){
            for(let a=0,la=this.energy.main[player].length;a<la;a++){
                this.energy.main[player][a]=0
            }
            this.resetEnergyCrystal(player)
        }else{
            this.energy.main[player]=0
        }
    }
    resetEnergyCrystal(player){
        this.energy.crystal[player]=[]
        this.energy.crystalTotal[player]=[0,0,0,0,0,0,0]
    }
    updateEnergyCrystal(){
        for(let a=0,la=this.players;a<la;a++){
            let cap=484
            for(let b=0,lb=this.energy.crystal[a].length;b<lb;b++){
                if(!this.energy.crystal[a][b][4]){
                    let goal=459
                    for(let c=1,lc=b+1;c<lc;c++){
                        if(this.energy.crystal[a][b-c][1]>this.energy.crystal[a][b][1]-25&&!this.energy.crystal[a][b-c][4]){
                            goal=this.energy.crystal[a][b-c][1]-(this.energy.crystal[a][b][6]?25:0)-(this.energy.crystal[a][b][4]&&!this.energy.crystal[a][b-c][4]?50:0)
                            c=lc
                        }
                    }
                    cap=min(goal,cap)
                }
            }
            let midcap=cap
            for(let b=0,lb=this.energy.crystal[a].length;b<lb;b++){
                if(this.energy.crystal[a][b][4]){
                    let goal=midcap-75
                    for(let c=1,lc=b+1;c<lc;c++){
                        if(this.energy.crystal[a][b-c][1]>this.energy.crystal[a][b][1]-25&&this.energy.crystal[a][b-c][4]){
                            goal=this.energy.crystal[a][b-c][1]-(this.energy.crystal[a][b][6]?25:0)-(this.energy.crystal[a][b][4]&&!this.energy.crystal[a][b-c][4]?50:0)
                            c=lc
                        }
                    }
                    cap=min(goal,cap)
                }
            }
            for(let b=0,lb=this.energy.crystalTotal[a].length;b<lb;b++){
                while(this.energy.crystalTotal[a][b]<this.energy.main[a][b]){
                    cap-=25
                    this.energy.crystal[a].push([b,cap,0,true,false,false,true])
                    this.energy.crystalTotal[a][b]++
                }
                while(this.energy.crystalTotal[a][b]>this.energy.main[a][b]){
                    let triggered=false
                    for(let c=0,lc=this.energy.crystal[a].length;c<lc;c++){
                        if(this.energy.crystal[a][lc-1-c][0]==b&&this.energy.crystal[a][lc-1-c][3]&&this.energy.crystal[a][lc-1-c][4]&&this.energy.crystalTotal[a][b]>this.energy.main[a][b]){
                            this.energy.crystal[a][lc-1-c][3]=false
                            this.energy.crystalTotal[a][b]--
                            triggered=true
                        }
                    }
                    if(!triggered){
                        for(let c=0,lc=this.energy.crystal[a].length;c<lc;c++){
                            if(this.energy.crystal[a][lc-1-c][0]==b&&this.energy.crystal[a][lc-1-c][3]&&this.energy.crystalTotal[a][b]>this.energy.main[a][b]){
                                this.energy.crystal[a][lc-1-c][3]=false
                                this.energy.crystalTotal[a][b]--
                                triggered=true
                            }
                        }
                        if(!triggered){
                            this.energy.crystalTotal[a][b]--
                        }
                    }
                }
            }
        }
    }
    manageEnergyCrystal(){
        for(let a=0,la=this.players;a<la;a++){
            let cap=484
            for(let b=0,lb=this.energy.crystal[a].length;b<lb;b++){
                if(!this.energy.crystal[a][b][4]){
                    let goal=459
                    for(let c=1,lc=b+1;c<lc;c++){
                        if(this.energy.crystal[a][b-c][1]>this.energy.crystal[a][b][1]-25&&!this.energy.crystal[a][b-c][4]){
                            goal=this.energy.crystal[a][b-c][1]-(this.energy.crystal[a][b][6]?25:0)-(this.energy.crystal[a][b][4]&&!this.energy.crystal[a][b-c][4]?50:0)
                            c=lc
                        }
                    }
                    cap=min(goal,cap)
                    if(this.energy.crystal[a][b][1]<goal-1){
                        this.energy.crystal[a][b][1]+=5
                    }else if(this.energy.crystal[a][b][1]>goal+1){
                        this.energy.crystal[a][b][1]-=5
                    }
                    this.energy.crystal[a][b][2]=smoothAnim(this.energy.crystal[a][b][2],this.energy.crystal[a][b][3],0,1,5)
                    if(this.energy.crystal[a][b][2]<=0&&!this.energy.crystal[a][b][3]){
                        this.energy.crystal[a].splice(b,1)
                        b--
                        lb--
                    }
                }
            }
            let midcap=cap
            for(let b=0,lb=this.energy.crystal[a].length;b<lb;b++){
                if(this.energy.crystal[a][b][4]){
                    let goal=midcap-75
                    for(let c=1,lc=b+1;c<lc;c++){
                        if(this.energy.crystal[a][b-c][1]>this.energy.crystal[a][b][1]-25&&this.energy.crystal[a][b-c][4]){
                            goal=this.energy.crystal[a][b-c][1]-(this.energy.crystal[a][b][6]?25:0)-(this.energy.crystal[a][b][4]&&!this.energy.crystal[a][b-c][4]?50:0)
                            c=lc
                        }
                    }
                    cap=min(goal,cap)
                    if(this.energy.crystal[a][b][1]<goal-1){
                        this.energy.crystal[a][b][1]+=5
                    }else if(this.energy.crystal[a][b][1]>goal+1){
                        this.energy.crystal[a][b][1]-=5
                    }
                    this.energy.crystal[a][b][2]=smoothAnim(this.energy.crystal[a][b][2],this.energy.crystal[a][b][3],0,1,5)
                    if(this.energy.crystal[a][b][2]<=0&&!this.energy.crystal[a][b][3]){
                        this.energy.crystal[a].splice(b,1)
                        b--
                        lb--
                    }
                }
            }
        }
        this.updateEnergyCrystal()
    }
    setupMtgManaChoice(player){
        this.menu.anim.mtg[player]=0
        this.menu.mtg.manaChoice[player]=0
        this.menu.mtg.manaBase[player]=mtgManaBase(this.menu.combatant[player])
        this.menu.mtg.manaOld[player]=copyArray(this.menu.mtg.manaNew[player])
        this.menu.mtg.manaNew[player]=copyArray(this.menu.mtg.manaBase[player][0])
    }
    addCurrency(amount,player){
        if(player>=0&&player<this.players&&this.initialized){
            let multi=(this.relicManager.hasRelic(135,player)?max(0,1-0.5*this.relicManager.active[135][player+1]):1)*(this.relicManager.hasRelic(165,player)?1+0.25*this.relicManager.active[165][player+1]:1)*(this.relicManager.hasRelic(415,player)?1+0.25*this.relicManager.active[415][player+1]:1)
            let bonus=this.relicManager.hasRelic(119,player)?20:0
            this.stats.earned[player]+=round((amount+bonus)*multi)
            if(this.cardManagers[player].deck.hasCard(findName('Social\nSecurity Card',types.card))){
                this.currency.ss[player]+=round((amount+bonus)*multi/2)
                this.currency.money[player]+=round((amount+bonus)*multi/2)
            }else{
                this.currency.money[player]+=round((amount+bonus)*multi)
            }
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
                        this.layer.textSize(types.combatant[a].name.length>=12?9:10)
                        this.layer.text(a==0?'000_BLANK':`0${a<10?`0`:``}${a}_${types.combatant[a].name.toUpperCase()}`,this.layer.width/2,this.layer.height*0.65)
                        this.layer.textSize(9)
                        this.layer.text(types.combatant[a].moniker.toUpperCase(),this.layer.width/2,this.layer.height*0.65+40)
                    }
                }
                for(let a=0,la=types.deckmode.length;a<=la;a++){
                    if(this.menu.anim.deck[0][a]>0){
                        this.layer.fill(255,this.menu.anim.deck[0][a])
                        this.layer.textSize(types.deckmode[a].name.length>15?8:10)
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
                if(variants.mtg){
                    this.layer.fill(120)
                    this.layer.rect(this.layer.width/2-140,this.layer.height*0.5-5,42.5,142.5)
                    this.layer.rect(this.layer.width/2-140,this.layer.height*0.5-100,37.5,37.5)
                    this.layer.rect(this.layer.width/2-140,this.layer.height*0.5+90,37.5,37.5)
                    this.layer.fill(0)
                    this.layer.rect(this.layer.width/2-140,this.layer.height*0.5-5,30,130)
                    this.layer.rect(this.layer.width/2-140,this.layer.height*0.5-100,25,25)
                    this.layer.rect(this.layer.width/2-140,this.layer.height*0.5+90,25,25)
                    this.layer.fill(120)
                    regTriangle(this.layer,this.layer.width/2-140,this.layer.height*0.5-98.75,10,10,60)
                    regTriangle(this.layer,this.layer.width/2-140,this.layer.height*0.5+88.75,10,10,0)
                    for(let a=0,la=this.menu.mtg.manaOld[0].length;a<la;a++){
                        displayMtgManaSymbol(this.layer,this.layer.width/2-140,this.layer.height*0.5+45-a*25,this.menu.mtg.manaOld[0][a],0,1-this.menu.anim.mtg[0],1)
                    }
                    for(let a=0,la=this.menu.mtg.manaNew[0].length;a<la;a++){
                        displayMtgManaSymbol(this.layer,this.layer.width/2-140,this.layer.height*0.5+45-a*25,this.menu.mtg.manaNew[0][a],0,this.menu.anim.mtg[0],1)
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
                            this.layer.textSize(types.combatant[a].name.length>=12?9:10)
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
                if(variants.mtg){
                    for(let a=0,la=2;a<la;a++){
                        this.layer.fill(120)
                        this.layer.rect(this.layer.width/4+140+(this.layer.width/2-280)*a,this.layer.height*0.5-5,42.5,142.5)
                        this.layer.rect(this.layer.width/4+140+(this.layer.width/2-280)*a,this.layer.height*0.5-100,37.5,37.5)
                        this.layer.rect(this.layer.width/4+140+(this.layer.width/2-280)*a,this.layer.height*0.5+90,37.5,37.5)
                        this.layer.fill(0)
                        this.layer.rect(this.layer.width/4+140+(this.layer.width/2-280)*a,this.layer.height*0.5-5,30,130)
                        this.layer.rect(this.layer.width/4+140+(this.layer.width/2-280)*a,this.layer.height*0.5-100,25,25)
                        this.layer.rect(this.layer.width/4+140+(this.layer.width/2-280)*a,this.layer.height*0.5+90,25,25)
                        this.layer.fill(120)
                        regTriangle(this.layer,this.layer.width/4+140+(this.layer.width/2-280)*a,this.layer.height*0.5-98.75,10,10,60)
                        regTriangle(this.layer,this.layer.width/4+140+(this.layer.width/2-280)*a,this.layer.height*0.5+88.75,10,10,0)
                        for(let b=0,lb=this.menu.mtg.manaOld[a].length;b<lb;b++){
                            displayMtgManaSymbol(this.layer,this.layer.width/4+140+(this.layer.width/2-280)*a,this.layer.height*0.5+45-b*25,this.menu.mtg.manaOld[a][b],0,1-this.menu.anim.mtg[a],1)
                        }
                        for(let b=0,lb=this.menu.mtg.manaNew[a].length;b<lb;b++){
                            displayMtgManaSymbol(this.layer,this.layer.width/4+140+(this.layer.width/2-280)*a,this.layer.height*0.5+45-b*25,this.menu.mtg.manaNew[a][b],0,this.menu.anim.mtg[a],1)
                        }
                    }
                }
            break
            case 'variants':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.menu.anim.variants.length;a<la;a++){
                    if(this.menu.anim.variants[a]>0){
                        this.layer.fill(255,this.menu.anim.variants[a])
                        this.layer.ellipse(this.layer.width/2-215+a%4*190,this.layer.height/2-225+floor(a/4)*40,10)
                    }
                }
            break
            case 'custom':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
                for(let a=0,la=32;a<la;a++){
                    if(this.menu.anim.prismrule[a]>0){
                        this.layer.fill(255,this.menu.anim.prismrule[a])
                        this.layer.ellipse(this.layer.width/2-215+a%4*190,this.layer.height/2-185+floor(a/4)*40,10)
                    }
                }
            break
            case 'tutorial':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
            break
            case 'battle':
                this.encounter.tooltip=0
                this.layer.background(110,115,120)
                for(let a=0,la=this.players;a<la;a++){
                    this.layer.fill(this.colorDetail[a].fill)
                    this.layer.stroke(this.colorDetail[a].stroke)
                    if(!this.relicManager.hasRelic(243,a)){
                        this.layer.strokeWeight(3*this.anim.reserve)
                        this.layer.rect(-74+this.anim.turn[a]*100,494,32*this.anim.reserve,20*this.anim.reserve,5*this.anim.reserve)
                        this.layer.strokeWeight(3*this.anim.discard)
                        this.layer.rect(-74+this.anim.turn[a]*100,522,32*this.anim.discard,20*this.anim.discard,5*this.anim.discard)
                    }
                    this.layer.strokeWeight(3*this.anim.dictionary)
                    this.layer.rect(-74+this.anim.turn[a]*100,550,32*this.anim.dictionary,20*this.anim.dictionary,5*this.anim.dictionary)
                    this.layer.strokeWeight(3*this.anim.endTurn)
                    this.layer.rect(-74+this.anim.turn[a]*100,578,32*this.anim.endTurn,20*this.anim.endTurn,5*this.anim.endTurn)
                    this.layer.strokeWeight(3*this.anim.cancel)
                    this.layer.rect(-74+this.anim.extra[a]*(variants.mtg?150:100),414,32*this.anim.cancel,20*this.anim.cancel,5*this.anim.endTurn)
                    if(game.turnTime>0){
                        if(variants.cyclicDraw||variants.blackjack){
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
                    }else if(variants.cyclicDraw||variants.blackjack){
                        this.layer.strokeWeight(3*this.anim.drop[a])
                        this.layer.rect(66,680-this.anim.turn[a]*100,32*this.anim.drop[a],20*this.anim.drop[a],5*this.anim.drop[a])
                    }
                    if(variants.mtg){
                        this.layer.stroke(mergeColor([200,255,255],[255,0,0],this.anim.afford))
                        this.layer.strokeWeight(3)
                        this.layer.line(-90+this.anim.turn[a]*100,474,-58+this.anim.turn[a]*100,474)
                        this.layer.line(-90+this.anim.turn[a]*100,474,-90+this.anim.turn[a]*100,374)
                        this.layer.line(-58+this.anim.turn[a]*100,474,-58+this.anim.turn[a]*100,374)
                        for(let b=0,lb=this.energy.crystal[a].length;b<lb;b++){
                            displayMtgManaSymbol(this.layer,-74+this.anim.turn[a]*100,this.energy.crystal[a][b][1],this.energy.crystal[a][b][0],0,this.energy.crystal[a][b][2],1,3,[this.energy.crystal[a][b][5]])
                        }
                    }else{
                        this.layer.noStroke()
                        let merge=mergeColor([225,255,255],[255,0,0],this.anim.afford)
                        if(this.anim.energyUp){
                            this.layer.fill(...merge,this.anim.energyUp)
                            this.layer.triangle(-90+this.anim.turn[a]*100,454,-74+this.anim.turn[a]*100,394+this.anim.energyUp*40,-58+this.anim.turn[a]*100,454)
                        }
                        if(this.anim.energyDown){
                            this.layer.fill(...merge,this.anim.energyDown)
                            this.layer.triangle(-90+this.anim.turn[a]*100,454,-74+this.anim.turn[a]*100,514-this.anim.energyDown*40,-58+this.anim.turn[a]*100,454)
                        }
                        this.layer.fill(...merge)
                        this.layer.stroke(...merge)
                        this.layer.strokeWeight(3)
                        this.layer.quad(-90+this.anim.turn[a]*100,454,-74+this.anim.turn[a]*100,434,-58+this.anim.turn[a]*100,454,-74+this.anim.turn[a]*100,474)
                    }
                    this.layer.fill(0)
                    this.layer.noStroke()
                    if(!this.relicManager.hasRelic(243,a)){
                        this.layer.textSize(8*this.anim.reserve)
                        this.layer.text('Draw',-74+this.anim.turn[a]*100,494-4*this.anim.reserve)
                        this.layer.text('('+this.cardManagers[a].reserve.cards.length+')',-74+this.anim.turn[a]*100,494+4*this.anim.reserve)
                        this.layer.textSize(8*this.anim.discard)
                        this.layer.text('Discard',-74+this.anim.turn[a]*100,522-4*this.anim.discard)
                        this.layer.text('('+this.cardManagers[a].discard.cards.length+')',-74+this.anim.turn[a]*100,522+4*this.anim.discard)
                    }
                    this.layer.textSize(7*this.anim.dictionary)
                    this.layer.text('Dictionary',-74+this.anim.turn[a]*100,550)
                    this.layer.textSize(7*this.anim.endTurn)
                    this.layer.text('End Turn',-74+this.anim.turn[a]*100,578-4*this.anim.endTurn)
                    this.layer.text(`(Turn ${this.turn.total})`,-74+this.anim.turn[a]*100,578+4*this.anim.endTurn)
                    this.layer.textSize(8*this.anim.cancel)
                    this.layer.text('Stop',-74+this.anim.extra[a]*(variants.mtg?150:100),414)
                    if(variants.cyclicDraw){
                        this.layer.textSize(7*this.anim.drop[a])
                        this.layer.text('Drop First',66,680-this.anim.turn[a]*100-4*this.anim.drop[a])
                        this.layer.text('('+this.cardManagers[a].drops+' Left)',66,680-this.anim.turn[a]*100+4*this.anim.drop[a])
                    }else if(variants.blackjack){
                        this.layer.textSize(7*this.anim.drop[a])
                        this.layer.text('Hit',66,680-this.anim.turn[a]*100-4*this.anim.drop[a])
                        this.layer.text(this.cardManagers[a].drops+'/'+this.cardManagers[a].baseDrops,66,680-this.anim.turn[a]*100+4*this.anim.drop[a])
                    }
                    if(!variants.mtg){
                        this.layer.textSize(14-min(floor(max(this.energy.main[a],this.energy.base[a])/10)*2,3))
                        this.layer.text((this.relicManager.hasRelic(234,a)?'?':this.energy.main[a])+'/'+this.energy.base[a],-74+this.anim.turn[a]*100,454)
                    }
                }
                this.tileManager.display(scene)
                this.particleManager.display('back')
                this.combatantManager.display(scene)
                for(let a=0,la=this.cardManagers.length;a<la;a++){
                    this.cardManagers[a].display(scene,[this.anim.turn[a]])
                }
                this.tileManager.displayCoordinate()
                this.particleManager.display('front')
                this.relicManager.display(stage.scene)
                this.itemManager.display(stage.scene)
                if(!game.infoOff){
                    this.combatantManager.displayInfo(scene)
                }
                this.relicManager.display('info')
                this.itemManager.display('info')
                this.overlayManager.display()
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
                this.relicManager.display(stage.scene)
                this.itemManager.display(stage.scene)
                this.overlayManager.display()
                this.modManager.display()
                this.displayCurrency()
            break
            case 'rest':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[3][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].time++
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
                this.displayCurrency()
            break
            case 'shop':
                this.layer.background(110,115,120)
                for(let a=0,la=this.colorDetail.length;a<la;a++){
                    this.layer.fill(this.colorDetail[a].fill)
                    this.layer.stroke(this.colorDetail[a].stroke)
                    this.layer.strokeWeight(3*this.anim.deck[a])
                    this.layer.rect(152+a*(this.layer.width-304),578,32*this.anim.deck[a],20*this.anim.deck[a],5*this.anim.deck[a])
                    this.layer.strokeWeight(3*this.anim.dictionaryMulti[a])
                    this.layer.rect(110+a*(this.layer.width-220),578,32*this.anim.dictionaryMulti[a],20*this.anim.dictionaryMulti[a],5*this.anim.dictionaryMulti[a])
                    this.layer.strokeWeight(3*this.anim.sell[a])
                    this.layer.rect(68+a*(this.layer.width-136),578,32*this.anim.sell[a],20*this.anim.sell[a],5*this.anim.sell[a])
                    this.layer.strokeWeight(3*this.anim.food[a])
                    this.layer.rect(26+a*(this.layer.width-52),578,32*this.anim.food[a],20*this.anim.food[a],5*this.anim.food[a])
                    if(this.relicManager.hasRelic(191,a)){
                        this.layer.strokeWeight(3*this.anim.reroll[a])
                        this.layer.rect(194+a*(this.layer.width-388),628-50*this.anim.rerollActive[a],32*this.anim.reroll[a],20*this.anim.reroll[a],5*this.anim.reroll[a])
                    }
                    this.layer.fill(0)
                    this.layer.noStroke()
                    this.layer.textSize(8*this.anim.deck[a])
                    this.layer.text('Deck',152+a*(this.layer.width-304),578-4*this.anim.deck[a])
                    this.layer.text('('+this.cardManagers[a].deck.cards.length+')',152+a*(this.layer.width-304),578+4*this.anim.deck[a])
                    this.layer.textSize(7*this.anim.dictionaryMulti[a])
                    this.layer.text('Dictionary',110+a*(this.layer.width-220),578)
                    this.layer.textSize(8*this.anim.sell[a])
                    this.layer.text('Sell',68+a*(this.layer.width-136),578-4*this.anim.sell[a])
                    this.layer.text('Relic',68+a*(this.layer.width-136),578+4*this.anim.sell[a])
                    this.layer.textSize(8*this.anim.food[a])
                    this.layer.text('Food',26+a*(this.layer.width-52),578)
                    if(this.relicManager.hasRelic(191,a)){
                        this.layer.textSize(8*this.anim.reroll[a])
                        this.layer.text('Reroll',194+a*(this.layer.width-388),628-50*this.anim.rerollActive[a]-4*this.anim.reroll[a])
                        this.layer.textSize(6*this.anim.reroll[a])
                        this.layer.text('50 Currency',194+a*(this.layer.width-388),628-50*this.anim.rerollActive[a]+4*this.anim.reroll[a])
                    }
                }
                this.purchaseManager.display()
                this.itemManager.display(stage.scene)
                this.overlayManager.display()
                this.displayCurrency()
            break
            case 'victory':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[2][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].time++
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
                    this.graphics.combatants[4][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].time++
                    this.graphics.combatants[4][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].display()
                }
                this.relicManager.display(stage.scene)
                this.overlayManager.display()
                this.displayCurrency()
            break
            case 'bossstash':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[6][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].time++
                    this.graphics.combatants[6][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].display()
                }
                this.relicManager.display(stage.scene)
                this.overlayManager.display()
                this.displayCurrency()
            break
            case 'pack':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[7][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].time++
                    this.graphics.combatants[7][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].display()
                }
                this.packManagers.forEach(packManager=>packManager.display())
                this.overlayManager.display()
            break
            case 'perk':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[0][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].time++
                    this.graphics.combatants[0][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].display()
                }
                this.perkManagers.forEach(perkManager=>perkManager.display())
                this.overlayManager.display()
            break
            case 'event':
                this.layer.image(graphics.staticBackground,0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[5][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].time++
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
                if(graphics.test==-1){
                    this.graphics.combatants[0][0][0].position.x=this.layer.width/2
                    this.graphics.combatants[0][0][0].position.y=this.layer.height/2+200
                    if(game.timer%30==0){
                        this.graphics.combatants[0][0][0].anim.direction+=15
                    }
                    this.graphics.combatants[0][0][0].time++
                    this.graphics.combatants[0][0][0].size=4
                    this.graphics.combatants[0][0][0].display()
                }else{
                    for(let a=0,la=this.players;a<la;a++){
                        this.graphics.combatants[graphics.test][0][a].time++
                        this.graphics.combatants[graphics.test][0][a].display()
                    }
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
                if(variants.mtg&&this.menu.anim.mtg[0]<1){
                    this.menu.anim.mtg[0]=min(1,this.menu.anim.mtg[0]+0.2)
                }
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
                if(variants.mtg){
                    for(let a=0,la=2;a<la;a++){
                        if(this.menu.anim.mtg[a]<1){
                            this.menu.anim.mtg[a]=min(1,this.menu.anim.mtg[a]+0.2)
                        }
                    }
                }
            break
            case 'variants':
                for(let a=0,la=this.menu.anim.variants.length;a<la;a++){
                    this.menu.anim.variants[a]=smoothAnim(this.menu.anim.variants[a],variants[variants.map[a]],0,1,5)
                }
            break
            case 'custom':
                let prismrules=[0,game.playerNumber+1,game.playerNumber+2,game.playerNumber+3,game.playerNumber+4,game.playerNumber+5,-1,-2,-3,-4,-5,-6,-7,-8]
                for(let a=0,la=32;a<la;a++){
                    this.menu.anim.prismrule[a]=smoothAnim(this.menu.anim.prismrule[a],variants.prismrule.includes(a<14?prismrules[a]:a-13),0,1,5)
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
                        (this.cardManagers[a].hand.status[0]<0||this.cardManagers[a].hand.status[1]<0||this.cardManagers[a].hand.status[8]<0||this.cardManagers[a].hand.status[10]>0||this.cardManagers[a].hand.status[27]>0||this.cardManagers[a].hand.status[31]>0||this.cardManagers[a].hand.status[34]>0),0,1,5)
                    this.anim.drop[a]=smoothAnim(this.anim.drop[a],pointInsideBox({position:inputs.rel},{position:{x:66,y:680-this.anim.turn[a]*100},width:32,height:20})&&!this.overlayManager.anyActive&&(variants.cyclicDraw||variants.blackjack),1,1.5,5)
                }
                this.anim.reserve=smoothAnim(this.anim.reserve,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:494},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                this.anim.discard=smoothAnim(this.anim.discard,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:522},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                this.anim.dictionary=smoothAnim(this.anim.dictionary,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:550},width:32,height:20}),1,1.5,5)
                this.anim.endTurn=smoothAnim(this.anim.endTurn,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:578},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                this.anim.cancel=smoothAnim(this.anim.cancel,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.extra[this.turn.main]*(variants.mtg?150:100),y:414},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                this.anim.defeat=smoothAnim(this.anim.defeat,this.result.defeat,0,1,240)
                this.anim.afford=smoothAnim(this.anim.afford,this.anim.upAfford,0,1,10)
                this.anim.energyUp=smoothAnim(this.anim.energyUp,false,0,1,15)
                this.anim.energyDown=smoothAnim(this.anim.energyDown,false,0,1,15)
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
                if(variants.mtg){
                    this.manageEnergyCrystal()
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
                    if(allClosed&&!this.result.defeat&&!transition.trigger){
                        transition.trigger=true
                        this.combatantManager.clearBlockCombatants()
                        this.combatantManager.clearStatusCombatants()
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
                    this.cardManagers.forEach(cardManager=>cardManager.allEffectArgs(0,33,[this.encounter.class]))
                    this.combatantManager.fullAllEffect(10)
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
                        for(let b=0,lb=variants.business?0:(variants.vanish||variants.inventor||variants.commoners)?2:1;b<lb;b++){
                            if(floor(random(0,2))==0||!this.modded(50)){
                                switch(this.encounter.class){
                                    case 0: case 3: case 4:
                                        reward.push({type:1,value:[random(0,1)<this.nodeManager.world*(game.ascend>=12?0.125:0.25)?1:0,this.relicManager.hasRelic(164,a)?floor(random(0,2.25)):floor(random(0,1.5)),0]})
                                        for(let b=0,lb=this.relicManager.active[260][a+1];b<lb;b++){
                                            reward.push({type:1,value:[random(0,1)<this.nodeManager.world*(game.ascend>=12?0.125:0.25)?1:0,this.relicManager.hasRelic(164,a)?floor(random(0,2.25)):floor(random(0,1.5)),0]})
                                        }
                                    break
                                    case 1:
                                        reward.push({type:1,value:[random(0,1)<(this.nodeManager.world*(game.ascend>=12?0.125:0.25)+0.5)?1:0,this.relicManager.hasRelic(164,a)?floor(random(0.5,2.5)):floor(random(0,2)),0]})
                                    break
                                    case 2:
                                        if(this.nodeManager.world!=3){
                                            reward.push({type:1,value:[0,2,0]})
                                            for(let b=0,lb=this.relicManager.active[232][a+1];b<lb;b++){
                                                reward.push({type:1,value:[0,2,0]})
                                            }
                                        }
                                    break
                                }
                            }
                        }
                        let mult=1
                        if(variants.business){
                            mult*=3
                        }
                        if(this.modded(82)){
                            mult*=0.5
                        }
                        if(!(this.encounter.class==2&&this.nodeManager.world==3)){
                            this.relicManager.activate(15,[a,-1,reward,this.turn.total])
                            this.itemManager.activateEndBattle(a,this.encounter.class,reward)
                        }
                        switch(this.encounter.class){
                            case 0: case 3: case 4:
                                if(!this.modded(177)||this.turn.total<=5){
                                    reward.push({type:0,value:[floor(random(40,81)*mult)]})
                                }
                                if(!variants.business){
                                    if((floor(random(0,3))==0||this.relicManager.hasRelic(83,a))&&!this.modded(49)){
                                        reward.push({type:3,value:[]})
                                    }
                                    if(floor(random(0,6))==0){
                                        reward.push({type:5,value:[1]})
                                    }
                                }
                            break
                            case 1:
                                reward.push({type:0,value:[floor(random(120,201)*mult)]})
                                if(!variants.business){
                                    if(!this.modded(48)&&!this.relicManager.hasRelic(289,a)){
                                        this.relicManager.activate(15,[a,1,reward,this.turn.total])
                                        reward.push({type:2,value:[]})
                                    }
                                    if((floor(random(0,3))==0||this.relicManager.hasRelic(83,a))&&!this.modded(49)){
                                        reward.push({type:3,value:[]})
                                    }
                                    if(floor(random(0,6))==0){
                                        reward.push({type:5,value:[1]})
                                    }
                                }
                            break
                            case 2:
                                if(this.nodeManager.world!=3){
                                    if(game.ascend<13){
                                        reward.push({type:0,value:[round(floor(random(240,401)*mult*(1+this.relicManager.active[232][a+1]*0.5)))]})
                                    }
                                    if(!variants.business){
                                        this.relicManager.activate(15,[a,2,reward,this.turn.total])
                                    }
                                }
                            break
                        }
                        for(let b=0,lb=this.combatantManager.combatants.length;b<lb;b++){
                            if(this.combatantManager.combatants[b].life>0){
                                if(this.combatantManager.combatants[b].spec.includes(13)){
                                    reward.push({type:4,value:[10]})
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
                                if(this.combatantManager.combatants[b].spec.includes(21)){
                                    reward.push({type:4,value:[15]})
                                    reward.push({type:0,value:[250]})
                                }
                                if(this.combatantManager.combatants[b].spec.includes(22)){
                                    reward.push({type:0,value:[100]})
                                }
                            }
                        }
                        this.overlayManager.overlays[0][a].activate([0,reward])
                    }
                    this.relicManager.activate(1,[this.encounter.class])
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
                    this.anim.deck[a]=smoothAnim(this.anim.deck[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:494},width:32,height:20}),1,1.5,5)
                    this.anim.dictionaryMulti[a]=smoothAnim(this.anim.dictionaryMulti[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:522},width:32,height:20}),1,1.5,5)
                }
                this.relicManager.update(stage.scene)
                this.itemManager.update(stage.scene)
            break
            case 'rest':
                this.optionManagers.forEach(optionManager=>optionManager.update())
                this.combatantManager.update(scene)
                this.overlayManager.update()
                for(let a=0,la=this.anim.deck.length;a<la;a++){
                    this.anim.deck[a]=smoothAnim(this.anim.deck[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:494},width:32,height:20}),1,1.5,5)
                    this.anim.dictionaryMulti[a]=smoothAnim(this.anim.dictionaryMulti[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:522},width:32,height:20}),1,1.5,5)
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
                    this.anim.deck[a]=smoothAnim(this.anim.deck[a],pointInsideBox({position:inputs.rel},{position:{x:152+a*(this.layer.width-304),y:578},width:32,height:20}),1,1.5,5)
                    this.anim.dictionaryMulti[a]=smoothAnim(this.anim.dictionaryMulti[a],pointInsideBox({position:inputs.rel},{position:{x:110+a*(this.layer.width-220),y:578},width:32,height:20}),1,1.5,5)
                    this.anim.sell[a]=smoothAnim(this.anim.sell[a],pointInsideBox({position:inputs.rel},{position:{x:68+a*(this.layer.width-136),y:578},width:32,height:20}),1,1.5,5)
                    this.anim.food[a]=smoothAnim(this.anim.food[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:578},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                    this.anim.reroll[a]=smoothAnim(this.anim.reroll[a],pointInsideBox({position:inputs.rel},{position:{x:194+a*(this.layer.width-388),y:628-this.anim.rerollActive[a]*50},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                    this.anim.rerollActive[a]=smoothAnim(this.anim.rerollActive[a],!this.purchaseManager.rerollActive[a],0,1,5)
                }
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
                this.overlayManager.update()
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
                    this.anim.deck[a]=smoothAnim(this.anim.deck[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:494},width:32,height:20}),1,1.5,5)
                    this.anim.dictionaryMulti[a]=smoothAnim(this.anim.dictionaryMulti[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:522},width:32,height:20}),1,1.5,5)
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
                    if(variants.mtg){
                        this.setupMtgManaChoice(0)
                    }
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-52.5,y:this.layer.height*0.6},width:62.5,height:62.5})){
                    transition.trigger=true
                    transition.scene='menu2'
                    if(this.menu.combatant.length==1){
                        this.menu.combatant=[this.menu.combatant[0],1]
                    }
                    if(variants.mtg){
                        for(let a=0,la=this.menu.combatant.length;a<la;a++){
                            this.setupMtgManaChoice(a)
                        }
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
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-80,y:this.layer.height*0.65},width:37.5,height:37.5})){
                    this.menu.combatant[0]=(this.menu.combatant[0]+game.playerNumber-2)%game.playerNumber+1
                    if(variants.mtg){
                        this.setupMtgManaChoice(0)
                    }
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+80,y:this.layer.height*0.65},width:37.5,height:37.5})){
                    this.menu.combatant[0]=this.menu.combatant[0]%game.playerNumber+1
                    if(variants.mtg){
                        this.setupMtgManaChoice(0)
                    }
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-80,y:this.layer.height*0.65+80},width:37.5,height:37.5})){
                    this.menu.deck[0]=(this.menu.deck[0]+types.deckmode.length-1)%types.deckmode.length
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+80,y:this.layer.height*0.65+80},width:37.5,height:37.5})){
                    this.menu.deck[0]=(this.menu.deck[0]+types.deckmode.length+1)%types.deckmode.length
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height*0.65-240},width:112.5,height:32.5})){
                    let remaining=[]
                    for(let a=0,la=game.playerNumber;a<la;a++){
                        if(this.menu.combatant[0]!=a+1){
                            remaining.push(a+1)
                        }
                    }
                    this.menu.combatant[0]=remaining[floor(random(0,remaining.length))]
                    if(variants.mtg){
                        this.setupMtgManaChoice(0)
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
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+150,y:this.layer.height*0.6},width:62.5,height:62.5})){
                    this.startGame()
                }
                if(variants.mtg){
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-140,y:this.layer.height*0.5-100},width:37.5,height:37.5})){
                        this.menu.mtg.manaChoice[0]=(this.menu.mtg.manaChoice[0]+this.menu.mtg.manaBase[0].length-1)%this.menu.mtg.manaBase[0].length
                        this.menu.mtg.manaOld[0]=copyArray(this.menu.mtg.manaNew[0])
                        this.menu.mtg.manaNew[0]=copyArray(this.menu.mtg.manaBase[0][this.menu.mtg.manaChoice[0]])
                        this.menu.anim.mtg[0]=0
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-140,y:this.layer.height*0.5+90},width:37.5,height:37.5})){
                        this.menu.mtg.manaChoice[0]=(this.menu.mtg.manaChoice[0]+this.menu.mtg.manaBase[0].length+1)%this.menu.mtg.manaBase[0].length
                        this.menu.mtg.manaOld[0]=copyArray(this.menu.mtg.manaNew[0])
                        this.menu.mtg.manaNew[0]=copyArray(this.menu.mtg.manaBase[0][this.menu.mtg.manaChoice[0]])
                        this.menu.anim.mtg[0]=0
                    }
                }
            break
            case 'menu2':
                for(let a=0,la=2;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/4+this.layer.width/2*a-80,y:this.layer.height*0.65},width:37.5,height:37.5})){
                        this.menu.combatant[a]=(this.menu.combatant[a]+game.playerNumber-2)%game.playerNumber+1
                        if(variants.mtg){
                            this.setupMtgManaChoice(a)
                        }
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/4+this.layer.width/2*a+80,y:this.layer.height*0.65},width:37.5,height:37.5})){
                        this.menu.combatant[a]=this.menu.combatant[a]%game.playerNumber+1
                        if(variants.mtg){
                            this.setupMtgManaChoice(a)
                        }
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/4+this.layer.width/2*a-80,y:this.layer.height*0.65+80},width:37.5,height:37.5})){
                        this.menu.deck[a]=(this.menu.deck[a]+types.deckmode.length-1)%types.deckmode.length
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/4+this.layer.width/2*a+80,y:this.layer.height*0.65+80},width:37.5,height:37.5})){
                        this.menu.deck[a]=(this.menu.deck[a]+types.deckmode.length+1)%types.deckmode.length
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/4+this.layer.width/2*a,y:this.layer.height*0.65-240},width:112.5,height:32.5})){
                        let remaining=[]
                        for(let b=0,lb=game.playerNumber;b<lb;b++){
                            if(this.menu.combatant[a]!=b+1){
                                remaining.push(b+1)
                            }
                        }
                        this.menu.combatant[a]=remaining[floor(random(0,remaining.length))]
                        if(variants.mtg){
                            this.setupMtgManaChoice(a)
                        }
                    }
                    if(variants.mtg){
                        if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/4+140+(this.layer.width/2-280)*a,y:this.layer.height*0.5-100},width:37.5,height:37.5})){
                            this.menu.mtg.manaChoice[a]=(this.menu.mtg.manaChoice[a]+this.menu.mtg.manaBase[a].length-1)%this.menu.mtg.manaBase[a].length
                            this.menu.mtg.manaOld[a]=copyArray(this.menu.mtg.manaNew[a])
                            this.menu.mtg.manaNew[a]=copyArray(this.menu.mtg.manaBase[a][this.menu.mtg.manaChoice[a]])
                            this.menu.anim.mtg[a]=0
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/4+140+(this.layer.width/2-280)*a,y:this.layer.height*0.5+90},width:37.5,height:37.5})){
                            this.menu.mtg.manaChoice[a]=(this.menu.mtg.manaChoice[a]+this.menu.mtg.manaBase[a].length+1)%this.menu.mtg.manaBase[a].length
                            this.menu.mtg.manaOld[a]=copyArray(this.menu.mtg.manaNew[a])
                            this.menu.mtg.manaNew[a]=copyArray(this.menu.mtg.manaBase[a][this.menu.mtg.manaChoice[a]])
                            this.menu.anim.mtg[a]=0
                        }
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
                for(let a=0,la=this.menu.anim.variants.length;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-215+a%4*190,y:this.layer.height/2-225+floor(a/4)*40},width:22.5,height:22.5})){
                        variants[variants.map[a]]=toggle(variants[variants.map[a]])
                    }
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-52.5,y:this.layer.height*0.7+95},width:62.5,height:62.5})){
                    transition.trigger=true
                    transition.scene='title'
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+52.5,y:this.layer.height*0.7+95},width:62.5,height:62.5})){
                    transition.trigger=true
                    transition.scene='custom'
                    variants.ultraprism=true
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-300,y:this.layer.height*0.6+42.5},width:137.5,height:37.5})){
                    let keys=[floor(random(0,20)),floor(random(0,8)),floor(random(0,8)),floor(random(0,13))]
                    let subkeys=[
                        floor(random(0,20))==0,floor(random(0,20))==0,floor(random(0,20))==0,floor(random(0,20))==0,
                        keys[0]==8,keys[0]==9,keys[0]==10,keys[0]==11,
                        keys[0]==12,keys[0]==13,keys[0]==14,keys[0]==15,
                        keys[0]==16,keys[0]==17,keys[0]==18,keys[0]==19,
                        keys[1]==4,keys[1]==5,keys[1]==6,keys[1]==7,
                        keys[2]==4,keys[2]==5,keys[2]==6,keys[2]==7,
                        keys[3]==6,keys[3]==7,keys[3]==8,keys[3]==9,
                        floor(random(0,20))==0,floor(random(0,20))==0,floor(random(0,20))==0,floor(random(0,20))==0,
                        floor(random(0,20))==0,floor(random(0,20))==0,floor(random(0,20))==0,floor(random(0,20))==0,
                        false,false,false,false,
                    ]
                    for(let a=0,la=variants.map.length;a<la;a++){
                        variants[variants.map[a]]=subkeys[a]
                    }
                }
            break
            case 'custom':
                let prismrules=[0,game.playerNumber+1,game.playerNumber+2,game.playerNumber+3,game.playerNumber+4,game.playerNumber+5,-1,-2,-3,-4,-5,-6,-7,-8]
                for(let a=0,la=32;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-215+a%4*190,y:this.layer.height/2-185+floor(a/4)*40},width:22.5,height:22.5})){
                        let value=a<14?prismrules[a]:a-13
                        if(variants.prismrule.includes(value)){
                            variants.prismrule.splice(variants.prismrule.indexOf(value),1)
                        }else{
                            variants.prismrule.push(value)
                        }
                    }
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-52.5,y:this.layer.height*0.7+50},width:62.5,height:62.5})){
                    transition.trigger=true
                    transition.scene='variants'
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+52.5,y:this.layer.height*0.7+50},width:62.5,height:62.5})){
                    variants.prismrule=[]
                }
            break
            case 'tutorial':
                for(let a=0,la=26;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-215+a%4*190+(a>=24?190:0),y:this.layer.height/2-165+(a>=8?30:0)+floor(a/4)*40},width:22.5,height:22.5})){
                        this.tutorialManager.setupTutorial(a)
                    }
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height*0.7+50},width:62.5,height:62.5})){
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
                    if(variants.mtg){
                        let anyClicked=false
                        for(let a=0,la=this.players;a<la;a++){
                            for(let b=0,lb=this.energy.crystal[a].length;b<lb;b++){
                                if(dist(inputs.rel.x,inputs.rel.y,-74+this.anim.turn[a]*100,this.energy.crystal[a][b][1])<12){
                                    let temp=this.energy.crystal[a][b]
                                    this.energy.crystal[a][b][4]=!this.energy.crystal[a][b][4]
                                    this.energy.crystal[a][b][5]=!this.energy.crystal[a][b][5]
                                    for(let c=0,lc=this.energy.crystal[a].length;c<lc;c++){
                                        if(!this.energy.crystal[a][c][4]&&this.energy.crystal[a][c][5]){
                                            this.energy.crystal[a][c][5]=this.energy.crystal[a][c][4]
                                        }
                                    }
                                    this.energy.crystal[a].splice(b,1)
                                    this.energy.crystal[a].push(temp)
                                    b=lb
                                    anyClicked=true
                                }
                            }
                        }
                        if(anyClicked&&this.turn.main>=0&&this.turn.main<this.players){
                            let anyActive=false
                            for(let a=0,la=this.energy.crystal[this.turn.main].length;a<la;a++){
                                if(this.energy.crystal[this.turn.main][a][4]){
                                    anyActive=true
                                }
                            }
                            if(!anyActive){
                                this.cardManagers[this.turn.main].hand.lastMouseOver=-1
                            }
                        }
                    }
                    if(this.overlayManager.anyActive){
                        this.overlayManager.onClick(stage.scene)
                        if(this.overlayManager.anySpecificActive(0)){
                            this.itemManager.onClick('rewards')
                        }
                    }else if(this.turn.main<this.players){
                        this.cardManagers[this.turn.main].onClick(stage.scene)
                        this.combatantManager.onClick(stage.scene,[this.turn.main])
                        this.relicManager.onClick(stage.scene)
                        this.itemManager.onClick(stage.scene)
                        this.modManager.onClick()
                        if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:494},width:32,height:20})&&!this.relicManager.hasRelic(243,this.turn.main)){
                            this.overlayManager.overlays[this.relicManager.hasRelic(129,this.turn.main)?13:1][this.turn.main].active=true
                            this.overlayManager.overlays[this.relicManager.hasRelic(129,this.turn.main)?13:1][this.turn.main].activate()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:522},width:32,height:20})&&!this.relicManager.hasRelic(243,this.turn.main)){
                            this.overlayManager.overlays[2][this.turn.main].active=true
                            this.overlayManager.overlays[2][this.turn.main].activate()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:578},width:32,height:20})&&this.attackManager.attacks.length<=0&&this.turnManager.turns.length<=0&&this.turnManager.turnsBack.length<=0){
                            this.endTurn()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.extra[this.turn.main]*(variants.mtg?150:100),y:414},width:32,height:20})){
                            this.cardManagers[this.turn.main].hand.cancel()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:66,y:680-this.anim.turn[this.turn.main]*100},width:32,height:20})&&variants.cyclicDraw){
                            this.cardManagers[this.turn.main].dropFirst()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:66,y:680-this.anim.turn[this.turn.main]*100},width:32,height:20})&&variants.blackjack&&this.cardManagers[this.turn.main].drops<this.cardManagers[this.turn.main].baseDrops){
                            this.cardManagers[this.turn.main].allEffect(2,40)
                            this.cardManagers[this.turn.main].draw(1)
                            this.cardManagers[this.turn.main].drops+=floor(random(1,7))
                            if(this.cardManagers[this.turn.main].drops==this.cardManagers[this.turn.main].baseDrops){
                                this.cardManagers[this.turn.main].draw(3,5)
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
            case 'rest':
                for(let a=0,la=this.cardManagers.length;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:494},width:32,height:20})&&
                        !this.overlayManager.anySpecificActive(5)&&!this.overlayManager.anySpecificActive(6)&&!this.overlayManager.anySpecificActive(12)&&!this.overlayManager.anySpecificActive(62)
                    ){
                        this.overlayManager.overlays[4][a].active=true
                        this.overlayManager.overlays[4][a].activate()
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:522},width:32,height:20})){
                        this.overlayManager.overlays[24][a].active=true
                        this.overlayManager.overlays[24][a].activate()
                    }
                }
                if(this.overlayManager.anyActive){
                    this.overlayManager.onClick()
                }else{
                    this.optionManagers.forEach(optionManager=>optionManager.onClick())
                }
            break
            case 'shop':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onClick()
                }else{
                    this.itemManager.onClick(stage.scene)
                    this.purchaseManager.onClick()
                    for(let a=0,la=this.cardManagers.length;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:578},width:32,height:20})){
                            this.overlayManager.overlays[27][a].active=true
                            this.overlayManager.overlays[27][a].activate()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:194+a*(this.layer.width-388),y:628-50*this.anim.rerollActive[a]},width:32,height:20})&&this.relicManager.hasRelic(191,a)&&!this.purchaseManager.rerollActive[a]&&this.currency.money[a]>=50-(this.relicManager.hasRelic(187,a)?200:0)){
                            this.purchaseManager.reroll()
                            this.purchaseManager.rerollActive[a]=true
                            this.currency.money[a]-=50
                        }
                    }
                }
                for(let a=0,la=this.cardManagers.length;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:152+a*(this.layer.width-304),y:578},width:32,height:20})&&
                        !this.overlayManager.anyNotSpecificActive(3)
                    ){
                        this.overlayManager.overlays[4][a].active=true
                        this.overlayManager.overlays[4][a].activate()
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:110+a*(this.layer.width-220),y:578},width:32,height:20})){
                        this.overlayManager.overlays[24][a].active=true
                        this.overlayManager.overlays[24][a].activate()
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:68+a*(this.layer.width-136),y:578},width:32,height:20})){
                        this.overlayManager.overlays[16][a].active=true
                        this.overlayManager.overlays[16][a].activate()
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
                if(this.overlayManager.anyActive){
                    this.overlayManager.onClick()
                }else{
                    this.relicManager.onClick(stage.scene)
                }
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
                }
                for(let a=0,la=this.cardManagers.length;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:494},width:32,height:20})&&
                        !this.overlayManager.anySpecificActive(6)&&!this.overlayManager.anySpecificActive(17)
                    ){
                        this.overlayManager.overlays[4][a].active=true
                        this.overlayManager.overlays[4][a].activate()
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:522},width:32,height:20})){
                        this.overlayManager.overlays[24][a].active=true
                        this.overlayManager.overlays[24][a].activate()
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
                    if(variants.mtg){
                        this.setupMtgManaChoice(0)
                    }
                }
                if(key=='2'){
                    transition.trigger=true
                    transition.scene='menu2'
                    if(this.menu.combatant.length==1){
                        this.menu.combatant=[this.menu.combatant[0],1]
                    }
                    if(variants.mtg){
                        for(let a=0,la=this.menu.combatant.length;a<la;a++){
                            this.setupMtgManaChoice(a)
                        }
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
                if(code==LEFT_ARROW){
                    this.menu.combatant[0]=(this.menu.combatant[0]+game.playerNumber-2)%game.playerNumber+1
                    if(variants.mtg){
                        this.setupMtgManaChoice(0)
                    }
                }
                if(code==RIGHT_ARROW){
                    this.menu.combatant[0]=this.menu.combatant[0]%game.playerNumber+1
                    if(variants.mtg){
                        this.setupMtgManaChoice(0)
                    }
                }
                if(key=='a'||key=='A'){
                    this.menu.deck[0]=(this.menu.deck[0]+types.deckmode.length-1)%types.deckmode.length
                }
                if(key=='d'||key=='D'){
                    this.menu.deck[0]=(this.menu.deck[0]+types.deckmode.length+1)%types.deckmode.length
                }
                if(key=='r'||key=='R'){
                    let remaining=[]
                    for(let a=0,la=game.playerNumber;a<la;a++){
                        if(this.menu.combatant[0]!=a+1){
                            remaining.push(a+1)
                        }
                    }
                    this.menu.combatant[0]=remaining[floor(random(0,remaining.length))]
                    if(variants.mtg){
                        this.setupMtgManaChoice(0)
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
                if(code==ENTER||key=='1'&&game.animRate==1){
                    this.startGame()
                }
            break
            case 'menu2':
                for(let a=0,la=2;a<la;a++){
                    if(code==LEFT_ARROW&&a==0||(key=='a'||key=='A')&&a==1){
                        this.menu.combatant[a]=(this.menu.combatant[a]+game.playerNumber-2)%game.playerNumber+1
                        if(variants.mtg){
                            this.setupMtgManaChoice(a)
                        }
                    }
                    if(code==RIGHT_ARROW&&a==0||(key=='d'||key=='D')&&a==1){
                        this.menu.combatant[a]=this.menu.combatant[a]%game.playerNumber+1
                        if(variants.mtg){
                            this.setupMtgManaChoice(a)
                        }
                    }
                    if(key==','&&a==0||(key=='z'||key=='Z')&&a==1){
                        this.menu.deck[a]=(this.menu.deck[a]+types.deckmode.length-1)%types.deckmode.length
                    }
                    if(key=='/'&&a==0||(key=='c'||key=='C')&&a==1){
                        this.menu.deck[a]=(this.menu.deck[a]+types.deckmode.length+1)%types.deckmode.length
                    }
                    if(key=='r'&&a==0||key=='R'&&a==1){
                        let remaining=[]
                        for(let b=0,lb=game.playerNumber;b<lb;b++){
                            if(this.menu.combatant[a]!=b+1){
                                remaining.push(b+1)
                            }
                        }
                        this.menu.combatant[a]=remaining[floor(random(0,remaining.length))]
                        if(variants.mtg){
                            this.setupMtgManaChoice(a)
                        }
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
                if(key==' '&&int(inputs.lastKey[0])>=0&&int(inputs.lastKey[0])<=9&&int(inputs.lastKey[1])>=1&&int(inputs.lastKey[1])<=4){
                    let index=(int(inputs.lastKey[0])+9)%10*4+int(inputs.lastKey[1])-1
                    variants[variants.map[index]]=toggle(variants[variants.map[index]])
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
                if(key=='R'){
                    let keys=[floor(random(0,20)),floor(random(0,8)),floor(random(0,8)),floor(random(0,10))]
                    let subkeys=[
                        floor(random(0,20))==0,floor(random(0,20))==0,floor(random(0,20))==0,floor(random(0,20))==0,
                        keys[0]==8,keys[0]==9,keys[0]==10,keys[0]==11,
                        keys[0]==12,keys[0]==13,keys[0]==14,keys[0]==15,
                        keys[0]==16,keys[0]==17,keys[0]==18,keys[0]==19,
                        keys[1]==4,keys[1]==5,keys[1]==6,keys[1]==7,
                        keys[2]==4,keys[2]==5,keys[2]==6,keys[2]==7,
                        keys[3]==6,keys[3]==7,keys[3]==8,keys[3]==9,
                        floor(random(0,20))==0,floor(random(0,20))==0,floor(random(0,20))==0,floor(random(0,20))==0,
                        floor(random(0,20))==0,floor(random(0,20))==0,floor(random(0,20))==0,floor(random(0,20))==0,
                        false,false,false,false,
                    ]
                    for(let a=0,la=variants.map.length;a<la;a++){
                        variants[variants.map[a]]=subkeys[a]
                    }
                }
            break
            case 'custom':
                let prismrules=[0,game.playerNumber+1,game.playerNumber+2,game.playerNumber+3,game.playerNumber+4,game.playerNumber+5,-1,-2,-3,-4,-5,-6,-7,-8]
                if(key==' '&&int(inputs.lastKey[0])>=1&&int(inputs.lastKey[0])<=8&&int(inputs.lastKey[1])>=1&&int(inputs.lastKey[1])<=4){
                    let index=(int(inputs.lastKey[0])+9)%10*4+int(inputs.lastKey[1])-1
                    let value=index<14?prismrules[index]:index-13
                    if(variants.prismrule.includes(value)){
                        variants.prismrule.splice(variants.prismrule.indexOf(value),1)
                    }else{
                        variants.prismrule.push(value)
                    }
                }
                if(code==ENTER){
                    transition.trigger=true
                    transition.scene='variants'
                }
                if(code==BACKSPACE){
                    variants.prismrule=[]
                }
            break
            case 'tutorial':
                if(key==' '&&int(inputs.lastKey[0])>=1&&int(inputs.lastKey[0])<=7&&int(inputs.lastKey[1])>=(int(inputs.lastKey[0])==7?2:1)&&int(inputs.lastKey[1])<=(int(inputs.lastKey[0])==7?3:4)){
                    let index=(int(inputs.lastKey[0])+9)%10*4+int(inputs.lastKey[1])-1+(int(inputs.lastKey[0])==7?-1:0)
                    this.tutorialManager.setupTutorial(index)
                }
                if(code==ENTER){
                    transition.trigger=true
                    transition.scene='title'
                }
            break
            case 'battle':
                if(!this.result.defeat){
                    this.itemManager.onKey(stage.scene,key,code)
                    if(variants.mtg&&this.turn.main>=0&&this.turn.main<this.players){
                        let positions=[]
                        for(let a=0,la=this.energy.crystal[this.turn.main].length;a<la;a++){
                            positions.push(this.energy.crystal[this.turn.main][a][1])
                        }
                        positions=sortNumbers(positions)
                        for(let a=0,la=this.energy.crystal[this.turn.main].length;a<la;a++){
                            let index=positions.length-1-positions.indexOf(this.energy.crystal[this.turn.main][a][1])
                            if(key==inputs.above[index]){
                                let temp=this.energy.crystal[this.turn.main][a]
                                this.energy.crystal[this.turn.main][a][4]=!this.energy.crystal[this.turn.main][a][4]
                                this.energy.crystal[this.turn.main][a][5]=this.energy.crystal[this.turn.main][a][4]
                                for(let b=0,lb=this.energy.crystal[this.turn.main].length;b<lb;b++){
                                    if(!this.energy.crystal[this.turn.main][b][4]&&this.energy.crystal[this.turn.main][b][5]){
                                        this.energy.crystal[this.turn.main][b][5]=this.energy.crystal[this.turn.main][b][4]
                                    }
                                }
                                this.energy.crystal[this.turn.main].splice(a,1)
                                this.energy.crystal[this.turn.main].push(temp)
                                a=la
                            }
                        }
                    }
                    if(this.overlayManager.anyActive){
                        this.overlayManager.onKey(key,code)
                    }else if(this.turn.main<this.players){
                        this.cardManagers[this.turn.main].onKey(stage.scene,key,code)
                        this.relicManager.onKey(stage.scene,key,code)
                        this.modManager.onKey(key,code)
                        if((key=='r'||key=='R')&&!this.relicManager.hasRelic(243,this.turn.main)){
                            this.overlayManager.overlays[this.relicManager.hasRelic(129,this.turn.main)?13:1][this.turn.main].active=true
                            this.overlayManager.overlays[this.relicManager.hasRelic(129,this.turn.main)?13:1][this.turn.main].activate()
                        }else if((key=='d'||key=='D')&&!this.relicManager.hasRelic(243,this.turn.main)){
                            this.overlayManager.overlays[2][this.turn.main].active=true
                            this.overlayManager.overlays[2][this.turn.main].activate()
                        }else if(key=='s'||key=='S'){
                            this.overlayManager.overlays[24][this.turn.main].active=true
                            this.overlayManager.overlays[24][this.turn.main].activate()
                        }else if(code==ENTER&&this.attackManager.attacks.length<=0&&this.turnManager.turns.length<=0&&this.turnManager.turns.length<=0&&this.turnManager.turnsBack.length<=0){
                            this.endTurn()
                        }else if(key=='.'&&variants.cyclicDraw){
                            this.cardManagers[this.turn.main].dropFirst()
                        }else if(key=='.'&&variants.blackjack&&this.cardManagers[this.turn.main].drops<this.cardManagers[this.turn.main].baseDrops){
                            this.cardManagers[this.turn.main].allEffect(2,40)
                            this.cardManagers[this.turn.main].draw(1)
                            this.cardManagers[this.turn.main].drops+=floor(random(1,7))
                            if(this.cardManagers[this.turn.main].drops==this.cardManagers[this.turn.main].baseDrops){
                                this.cardManagers[this.turn.main].draw(3,5)
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
                                this.cardManagers[this.turn.main].allEffect(2,1)
                            break
                            case 'A':
                                if(variants.mtg){
                                    this.addSpecificEnergy(5,this.turn.main,6)
                                }else{
                                    this.setEnergy(99,this.turn.main)
                                }
                            break
                            case 'Z':
                                this.endTurn()
                            break
                            case 'X':
                                massacre(this.players)
                            break
                            case 'C':
                                this.cardManagers[this.turn.main].hand.allEffect(2)
                            break
                            case 'V':
                                this.combatantManager.combatants[this.turn.main].setMaxHP(9999)
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
            case 'rest':
                for(let a=0,la=this.cardManagers.length;a<la;a++){
                    if(((key=='d'||key=='D')&&this.players==1||key=='d'&&a==0&&this.players==2||key=='D'&&a==1&&this.players==2)&&
                        !this.overlayManager.anySpecificActive(5)&&!this.overlayManager.anySpecificActive(6)&&!this.overlayManager.anySpecificActive(12)&&!this.overlayManager.anySpecificActive(62)
                    ){
                        this.overlayManager.overlays[4][a].active=true
                        this.overlayManager.overlays[4][a].activate()
                    }else if((key=='s'||key=='S')&&this.players==1||key=='s'&&a==0&&this.players==2||key=='S'&&a==1&&this.players==2){
                        this.overlayManager.overlays[24][a].active=true
                        this.overlayManager.overlays[24][a].activate()
                    }
                }
                if(this.overlayManager.anyActive){
                    this.overlayManager.onKey(key,code)
                }else{
                    for(let a=0,la=this.optionManagers.length;a<la;a++){
                        if(!this.optionManagers[a].complete){
                            this.optionManagers[a].onKey(key,code)
                            break
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
                        if((key=='f'||key=='F')&&this.players==1||key=='r'&&a==0&&this.players==2||key=='R'&&a==1&&this.players==2){
                            this.overlayManager.overlays[27][a].active=true
                            this.overlayManager.overlays[27][a].activate()
                        }else if(((key=='c'||key=='C')&&this.players==1||key=='c'&&a==0&&this.players==2||key=='C'&&a==1&&this.players==2)&&this.relicManager.hasRelic(191,a)&&!this.purchaseManager.rerollActive[a]&&this.currency.money[a]>=50-(this.relicManager.hasRelic(187,a)?200:0)){
                            this.purchaseManager.reroll()
                            this.purchaseManager.rerollActive[a]=true
                            this.currency.money[a]-=50
                        }
                    }
                }
                for(let a=0,la=this.cardManagers.length;a<la;a++){
                    if(((key=='d'||key=='D')&&this.players==1||key=='d'&&a==0&&this.players==2||key=='D'&&a==1&&this.players==2)&&
                        !this.overlayManager.anyNotSpecificActive(3)
                    ){
                        this.overlayManager.overlays[4][a].active=true
                        this.overlayManager.overlays[4][a].activate()
                    }else if((key=='s'||key=='S')&&this.players==1||key=='s'&&a==0&&this.players==2||key=='S'&&a==1&&this.players==2){
                        this.overlayManager.overlays[24][a].active=true
                        this.overlayManager.overlays[24][a].activate()
                    }else if((key=='r'||key=='R')&&this.players==1||key=='r'&&a==0&&this.players==2||key=='R'&&a==1&&this.players==2){
                        this.overlayManager.overlays[16][a].active=true
                        this.overlayManager.overlays[16][a].activate()
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
                if(this.overlayManager.anyActive){
                    this.overlayManager.onKey(key,code)
                }else{
                    this.relicManager.onKey(stage.scene,key,code)
                }
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
                }
                for(let a=0,la=this.cardManagers.length;a<la;a++){
                    if(((key=='d'||key=='D')&&this.players==1||key=='d'&&a==0&&this.players==2||key=='D'&&a==1&&this.players==2)&&
                        !this.overlayManager.anySpecificActive(6)&&!this.overlayManager.anySpecificActive(17)
                    ){
                        this.overlayManager.overlays[4][a].active=true
                        this.overlayManager.overlays[4][a].activate()
                    }else if((key=='s'||key=='S')&&this.players==1||key=='s'&&a==0&&this.players==2||key=='S'&&a==1&&this.players==2){
                        this.overlayManager.overlays[24][a].active=true
                        this.overlayManager.overlays[24][a].activate()
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