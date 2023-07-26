class battle{
    constructor(layer,player){
        this.layer=layer
        this.player=player
        this.createBasic()
    }
    createBasic(){
        this.title={}
        this.menu={combatant:[1,0],deck:[0,0],anim:{combatant:[[],[]],deck:[[],[]],ascend:[],ascendDesc:[],ascendSingle:0,animRate:[]}}
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
        for(let a=0,la=3;a<la;a++){
            this.menu.anim.animRate.push(-1)
        }
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
        this.create()
    }
    create(){
        graphics.combatant=[]
        this.initialized=false
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
        this.overlayManager=new overlayManager(this.layer,this)
        this.initialManagersAfter()
        this.initialized=true

        this.encounter={class:0}
        this.currency={money:[]}
        this.energy={main:[],gen:[],base:[],temp:[]}
        this.stats={node:[0,0,0,0,0,0,0,0],killed:[],earned:[],damage:[],block:[],move:[],drawn:[],played:[],taken:[],card:[],relic:[],item:[]}
        
        this.turn={main:0,total:0,time:0,accelerate:0,endReady:false}
        this.anim={reserve:1,discard:1,dictionary:1,endTurn:1,cancel:1,extra:[],turn:[],defeat:0,deck:[],exit:1,sell:[],afford:0,upAfford:false}
        this.counter={enemy:0,killed:0,turnPlayed:[0,0,0,0,0]}
        this.result={defeat:false,victory:false}
        this.reinforce={back:[],front:[]}

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
        for(let a=0,la=this.players;a<la;a++){
            this.addCombatant({x:0,y:0},this.player[a],a+1,0,false)
            this.colorDetail.push(types.color.card[this.player[a]])
            this.currency.money.push(stage.ascend>=22?0:100)
            this.energy.main.push(0)
            this.energy.gen.push(0)
            this.energy.base.push(game.startEnergy)
            this.energy.temp.push(0)
            this.anim.extra.push(0)
            this.anim.turn.push(0)
            this.anim.deck.push(1)
            this.anim.sell.push(1)
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
    initialGraphics(){
        this.graphics={combatants:[]}
        for(let a=0,la=10;a<la;a++){
            if(
                a==0&&this.player.includes(2)||
                a==1&&this.player.includes(3)||
                a==2&&this.player.includes(4)
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
    setupBattle(encounter){
        this.encounter.class=encounter.class
        for(let a=0,la=this.energy.base.length;a<la;a++){
            this.energy.gen[a]=this.energy.base[a]
        }
        this.turn={main:0,total:0,time:0,accelerate:0}
        this.anim={reserve:1,discard:1,dictionary:1,endTurn:1,cancel:1,extra:[],turn:[],defeat:0,deck:[],sell:[],exit:1,afford:0,upAfford:false}
        this.counter={enemy:0,killed:0,turnPlayed:[0,0,0,0,0]}
        this.result={defeat:false,victory:false}
        this.reinforce={back:[],front:[]}

        this.tileManager.generateTiles(types.level[findName(encounter.level[floor(random(0,encounter.level.length))],types.level)])
        
        this.combatantManager.resetCombatants()
        
        for(let a=0,la=this.players;a<la;a++){
            this.anim.extra.push(0)
            this.anim.turn.push(0)
            this.anim.deck.push(1)
            this.anim.sell.push(1)
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
            this.addCombatant(encounter.enemy[a].position,findName(encounter.enemy[a].name,types.combatant),0,0,false)
            this.counter.enemy++
        }
        for(let a=0,la=encounter.reinforce.length;a<la;a++){
            this.reinforce.back.push({position:{x:encounter.reinforce[a].position.x,y:encounter.reinforce[a].position.y},name:encounter.reinforce[a].name,turn:encounter.reinforce[a].turn,minion:false})
            this.counter.enemy++
        }
        for(let a=0,la=this.cardManagers.length;a<la;a++){
            this.cardManagers[a].reset()
            this.cardManagers[a].clear()
            this.cardManagers[a].copy(0,1)
            this.cardManagers[a].shuffle(1)
        }
        this.combatantManager.deTargetCombatants()
        this.attackManager.clear()
        this.turnManager.clear()
        this.particleManager.clear()

        this.startTurn()

        game.collisionDamage=constants.collisionDamage
    }
    setupRest(){
        this.optionManagers.forEach(optionManager=>optionManager.reset())
        this.combatantManager.resetCombatants()
    }
    setupShop(){
        this.purchaseManager.setup(0)
    }
    setupStash(){
        this.relicManager.setupStash()
    }
    setupBossStash(){
        this.relicManager.setupBossStash()
    }
    setupEvent(){
        this.eventManagers.forEach(eventManager=>eventManager.pickEvent())
        this.eventManagers.forEach(eventManager=>eventManager.setup())
    }
    setupSpecificEvent(event){
        this.eventManagers.forEach(eventManager=>eventManager.event=event)
        this.eventManagers.forEach(eventManager=>eventManager.setup())
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
        let index=empty[floor(random(0,empty.length))]
        this.reinforce.front.push({position:this.tileManager.tiles[index].tilePosition,name:name,minion:true})
        this.tileManager.tiles[index].reinforce=true
        this.counter.enemy++
    }
    quickReinforceCorner(name1,name2,amount,size){
        for(let a=0,la=amount;a<la;a++){
            this.reinforce.front.push({position:{x:size*(1+transformDirection(0,a*60-150)[0]),y:size*(1+transformDirection(0,a*60-150)[1])},name:floor(random(0,5))==0?name2:name1,minion:true})
            this.tileManager.tiles[this.tileManager.getTileIndex(size*(1+transformDirection(0,a*60-150)[0]),size*(1+transformDirection(0,a*60-150)[1]))].reinforce=true
            this.counter.enemy++
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
                let tile=empty[floor(random(0,empty.length))]
                this.reinforce.front[a].position={x:this.tileManager.tiles[tile].tilePosition.x,y:this.tileManager.tiles[tile].tilePosition.y}
                this.tileManager.tiles[tile].reinforce=true
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
            this.cardManagers[player].discard.add(type,level,color)
            this.cardManagers[player].drop.addDrop(type,level,color)
        }
    }
    dropDraw(player,type,level,color){
        if(player<this.cardManagers.length){
            this.cardManagers[player].reserve.add(type,level,color)
            this.cardManagers[player].drop.addDrop(type,level,color)
        }
    }
    dropAll(type,level,color){
        for(let a=0,la=this.cardManagers.length;a<la;a++){
            this.cardManagers[a].discard.add(type,level,color)
            this.cardManagers[a].drop.addDrop(type,level,color)
        }
    }
    endTurn(){
        this.turn.endReady=false
        this.combatantManager.tickEarly()
        this.cardManagers[this.turn.main].allEffect(2,1)
        this.relicManager.activate(9,[this.turn.total,this.turn.main])
        if(this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(this.turn.main)].getStatus('Extra Turn')>0){
            let combatant=this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(this.turn.main)]
            combatant.status.main[findList('Extra Turn',combatant.status.name)]--
        }else{
            this.cardManagers[this.turn.main].reset()
            this.turn.main++
        }
        if(this.turn.main>=this.players){
            this.tileManager.activate()
            this.sendReinforce()
            this.tileManager.fire()
            this.turnManager.loadEnemyTurns()
            this.combatantManager.enableCombatants()
        }else{
            if(this.turn.total==1){
                if(!this.relicManager.hasRelic(141,this.turn.main)){
                    this.cardManagers[this.turn.main].hand.add(findName('Initiative',types.card),0,0)
                }
                if(this.relicManager.hasRelic(107,this.turn.main)){
                    this.cardManagers[this.turn.main].hand.add(findName('Initiative',types.card),0,0)
                }
            }
            this.cardManagers[this.turn.main].turnDraw(this.turn.total)
            this.relicManager.activate(2,[this.turn.total,this.turn.main,this.counter.turnPlayed])
            this.turn.time=game.turnTime
            this.counter.turnPlayed=[0,0,0,0,0]
        }
        this.attackManager.clear()
        if(this.combatantManager.combatants[this.turn.main].life<=0&&this.turn.main<this.players){
            this.endTurn()
        }
    }
    startTurn(){
        this.turn.main=0
        this.turn.total++
        this.turn.time=game.turnTime
        for(let a=0,la=this.energy.gen.length;a<la;a++){
            this.energy.main[a]=max(0,this.relicManager.hasRelic(28,a)&&this.turn.total>1&&this.energy.main[a]>=1?this.energy.gen[a]+1:this.energy.gen[a]+this.energy.temp[a])
            this.energy.temp[a]=0
        }
        this.combatantManager.setupCombatants()
        this.combatantManager.tick()
        this.combatantManager.unmoveCombatants()
        this.tileManager.activate()
        this.combatantManager.activateCombatants(0,0)
        this.updateTargetting()
        this.turnManager.clear()
        if(this.turn.total==1){
            if(!this.relicManager.hasRelic(141,this.turn.main)){
                this.cardManagers[this.turn.main].hand.add(findName('Initiative',types.card),0,0)
            }
            if(this.relicManager.hasRelic(107,this.turn.main)){
                this.cardManagers[this.turn.main].hand.add(findName('Initiative',types.card),0,0)
            }
        }
        this.cardManagers[0].turnDraw(this.turn.total)
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
            this.cardManagers[player].fatigue()
            this.cardManagers[player].fatigue()
        }
        if(card.spec.includes(14)||card.spec.includes(12)&&card.reality[mode].includes(14)){
            this.cardManagers[player].fatigue()
            this.cardManagers[player].fatigue()
            this.cardManagers[player].fatigue()
        }
        if(card.spec.includes(18)||card.spec.includes(12)&&card.reality[mode].includes(18)){
            this.cardManagers[player].fatigue()
            this.cardManagers[player].fatigue()
            this.cardManagers[player].fatigue()
            this.cardManagers[player].fatigue()
        }
        if(card.spec.includes(19)||card.spec.includes(12)&&card.reality[mode].includes(19)){
            this.cardManagers[player].heavyFatigue()
        }
        if(card.spec.includes(17)||card.spec.includes(12)&&card.reality[mode].includes(17)){
            for(let a=0,la=this.energy.main[player];a<la;a++){
                this.cardManagers[player].fatigue()
            }
        }
        this.stats.played[player][0]++
        this.stats.played[player][cardClass]++
        this.counter.turnPlayed[0]++
        this.counter.turnPlayed[cardClass]++
        let userCombatant=this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(player)]
        switch(cardClass){
            case 1:
                if(userCombatant.getStatus('Must Attack or Take Damage')>0){
                    userCombatant.status.main[findList('Must Attack or Take Damage',userCombatant.status.name)]=0
                }
                if(userCombatant.getStatus('Attack Draw')>0){
                    this.cardManagers[player].draw(userCombatant.getStatus('Attack Draw'))
                }
            break
        }
        if(userCombatant.getStatus('Card Play Block')>0){
            userCombatant.addBlock(userCombatant.getStatus('Card Play Block'))
        }
        this.combatantManager.playCardFront()
        this.relicManager.activate(4,[cardClass,player])
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
        let bonus=this.relicManager.hasRelic(119,player)?10:0
        this.stats.earned[player]+=round((amount+bonus)*multi)
        this.currency.money[player]+=round((amount+bonus)*multi)
    }
    loseCurrency(amount,player){
        if(this.currency.money[player]>=0&&this.currency.money[player]-round(amount)<0){
            this.cardManagers[player].deck.add(findName('Debt',types.card),0,game.playerNumber+2)
        }
        this.currency.money[player]-=round(amount)
    }
    display(scene){
        switch(scene){
            case 'title':
                this.layer.image(graphics.backgrounds[8],0,0,this.layer.width,this.layer.height)
            break
            case 'menu':
                this.layer.image(graphics.backgrounds[9],0,0,this.layer.width,this.layer.height)
                for(let a=0,la=game.playerNumber;a<=la;a++){
                    if(this.menu.anim.combatant[0][a]>0&&a>0){
                        this.layer.push()
                        this.layer.translate(this.layer.width/2,this.layer.height*0.3+81.25)
                        switch(a){
                            case 1:
                                this.layer.fill(0,50,100,this.menu.anim.combatant[0][a])
                            break
                            case 2:
                                this.layer.fill(125,200,125,this.menu.anim.combatant[0][a])
                            break
                            case 3:
                                this.layer.fill(255,175,175,this.menu.anim.combatant[0][a])
                            break
                            case 4:
                                this.layer.fill(100,0,150,this.menu.anim.combatant[0][a])
                            break
                        }
                        this.layer.ellipse(0,0,50)
                        this.layer.fill(255,this.menu.anim.combatant[0][a])
                        switch(a){
                            case 1:
                                this.layer.beginShape()
                                this.layer.vertex(-20,0)
                                this.layer.vertex(0,-20/sqrt(3))
                                this.layer.vertex(20,0)
                                this.layer.vertex(10,-10*sqrt(3))
                                this.layer.vertex(-10,-10*sqrt(3))
                                this.layer.endShape()
                                this.layer.beginShape()
                                this.layer.vertex(-20,0)
                                this.layer.vertex(0,20/sqrt(3))
                                this.layer.vertex(20,0)
                                this.layer.vertex(10,10*sqrt(3))
                                this.layer.vertex(-10,10*sqrt(3))
                                this.layer.endShape()
                                this.layer.ellipse(0,0,10,10)
                            break
                            case 2:
                                this.layer.rotate(45)
                                this.layer.ellipse(0,0,32,42)
                                this.layer.stroke(125,200,125,this.menu.anim.combatant[0][a])
                                this.layer.strokeWeight(3)
                                this.layer.line(0,17,0,-8)
                                this.layer.line(0,10,-8,5)
                                this.layer.line(0,10,8,5)
                                this.layer.line(0,0,-6,-3.75)
                                this.layer.line(0,0,6,-3.75)
                                this.layer.rotate(-45)
                            break
                            case 3:
                                for(let a=0,la=5;a<la;a++){
                                    this.layer.beginShape()
                                    this.layer.vertex(0,0)
                                    this.layer.bezierVertex(-8,-7,-8,-14,-2,-21)
                                    this.layer.vertex(0,-18)
                                    this.layer.vertex(2,-21)
                                    this.layer.bezierVertex(8,-14,8,-7,0,0)
                                    this.layer.rotate(72)
                                    this.layer.endShape()
                                }
                                this.layer.fill(255,175,175,this.menu.anim.combatant[0][a])
                                this.layer.rotate(-12)
                                for(let a=0;a<5;a++){
                                    this.layer.quad(0,-1,-1,-6,0,-10,1,-6)
                                    this.layer.rotate(72)
                                }
                                this.layer.ellipse(0,0,4,4)
                            break
                            case 4:
                                for(let a=0,la=4;a<la;a++){
                                    this.layer.rotate(90)
                                    this.layer.triangle(-9,0,9,0,0,21)
                                    this.layer.triangle(-5,-5,5,5,11,-11)
                                }
                                this.layer.fill(100,0,150,this.menu.anim.combatant[0][a])
                                for(let a=0,la=4;a<la;a++){
                                    this.layer.rotate(90)
                                    this.layer.triangle(-4,0,4,0,0,8)
                                }
                            break
                        }
                        this.layer.pop()
                    }
                }
                for(let a=0,la=game.playerNumber;a<=la;a++){
                    if(this.menu.anim.combatant[0][a]>0){
                        this.layer.fill(255,this.menu.anim.combatant[0][a])
                        this.layer.textSize(10)
                        this.layer.text(a==0?'000_BLANK':`00${a}_${types.combatant[a].name.toUpperCase()}`,this.layer.width/2,this.layer.height*0.65)
                        this.layer.textSize(9)
                        this.layer.text(types.combatant[a].moniker.toUpperCase(),this.layer.width/2,this.layer.height*0.65+40)
                    }
                }
                for(let a=0,la=types.deckmode.length;a<=la;a++){
                    if(this.menu.anim.deck[0][a]>0){
                        this.layer.fill(255,this.menu.anim.deck[0][a])
                        this.layer.textSize(types.deckmode[a].name.length>20?8:10)
                        this.layer.text(types.deckmode[a].name,this.layer.width/2,this.layer.height*0.65+80)
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
                        this.layer.rect(this.layer.width/2-67.5+a*67.5,this.layer.height-30,60,4)
                    }
                }
            break
            case 'menu2':
                this.layer.image(graphics.backgrounds[10],0,0,this.layer.width,this.layer.height)
                for(let a=0,la=game.playerNumber;a<=la;a++){
                    for(let b=0,lb=2;b<lb;b++){
                        if(this.menu.anim.combatant[b][a]>0&&a>0){
                            displayPlayerSymbol(this.layer,this.layer.width/4+b*this.layer.width/2,this.layer.height*0.3+81.25,a,0,1,this.menu.anim.combatant[b][a])
                        }
                    }
                }
                for(let a=0,la=game.playerNumber;a<=la;a++){
                    for(let b=0,lb=2;b<lb;b++){
                        if(this.menu.anim.combatant[b][a]>0){
                            this.layer.fill(255,this.menu.anim.combatant[b][a])
                            this.layer.textSize(10)
                            this.layer.text(a==0?'000_BLANK':`00${a}_${types.combatant[a].name.toUpperCase()}`,this.layer.width/4+b*this.layer.width/2,this.layer.height*0.65)
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
                            this.layer.text(types.deckmode[a].name,this.layer.width/4+b*this.layer.width/2,this.layer.height*0.65+80)
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
                        this.layer.rect(this.layer.width/2-67.5+a*67.5,this.layer.height-30,60,4)
                    }
                }
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
                        this.layer.rect(58+game.turnTime/6,680-this.anim.turn[a]*100,game.turnTime/3+12,16,5)
                        this.layer.fill(0)
                        this.layer.noStroke()
                        this.layer.rect(58+game.turnTime/6,680-this.anim.turn[a]*100,game.turnTime/3,4,2)
                        this.layer.fill(this.colorDetail[a].active)
                        this.layer.rect(58+this.turn.time/6,680-this.anim.turn[a]*100,this.turn.time/3,4,2)
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
                    this.layer.textSize(8*this.anim.endTurn)
                    this.layer.text('End Turn',-74+this.anim.turn[a]*100,578-4*this.anim.endTurn)
                    this.layer.text('('+this.turn.total+')',-74+this.anim.turn[a]*100,578+4*this.anim.endTurn)
                    this.layer.textSize(8*this.anim.cancel)
                    this.layer.text('Stop',-74+this.anim.extra[a]*100,414)
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
                this.displayCurrency()
                if(this.anim.defeat>0){
                    this.layer.fill(0,this.anim.defeat)
                    this.layer.noStroke()
                    this.layer.rect(this.layer.width/2,this.layer.height/2,this.layer.width,this.layer.height)
                }
            break
            case 'map':
                this.layer.background(70,75,80)
                for(let a=0,la=this.colorDetail.length;a<la;a++){
                    this.layer.fill(this.colorDetail[a].fill)
                    this.layer.stroke(this.colorDetail[a].stroke)
                    this.layer.strokeWeight(3*this.anim.deck[a])
                    this.layer.rect(26+a*(this.layer.width-52),494,32*this.anim.deck[a],20*this.anim.deck[a],5*this.anim.deck[a])
                    this.layer.fill(0)
                    this.layer.noStroke()
                    this.layer.textSize(8*this.anim.deck[a])
                    this.layer.text('Deck',26+a*(this.layer.width-52),494-4*this.anim.deck[a])
                    this.layer.text('('+this.cardManagers[a].deck.cards.length+')',26+a*(this.layer.width-52),494+4*this.anim.deck[a])
                }
                this.nodeManager.display()
                this.overlayManager.display()
                this.relicManager.display(stage.scene)
                this.itemManager.display(stage.scene)
                this.displayCurrency()
            break
            case 'rest':
                this.layer.image(graphics.backgrounds[3],0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[3][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].display()
                }
			    this.layer.image(graphics.overlays[0],0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.colorDetail.length;a<la;a++){
                    this.layer.fill(this.colorDetail[a].fill)
                    this.layer.stroke(this.colorDetail[a].stroke)
                    this.layer.strokeWeight(3*this.anim.deck[a])
                    this.layer.rect(26+a*(this.layer.width-52),494,32*this.anim.deck[a],20*this.anim.deck[a],5*this.anim.deck[a])
                    this.layer.fill(0)
                    this.layer.noStroke()
                    this.layer.textSize(8*this.anim.deck[a])
                    this.layer.text('Deck',26+a*(this.layer.width-52),494-4*this.anim.deck[a])
                    this.layer.text('('+this.cardManagers[a].deck.cards.length+')',26+a*(this.layer.width-52),494+4*this.anim.deck[a])
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
                    this.layer.strokeWeight(3*this.anim.sell[a])
                    this.layer.rect(26+a*(this.layer.width-52),528,32*this.anim.sell[a],20*this.anim.sell[a],5*this.anim.sell[a])
                    this.layer.fill(0)
                    this.layer.noStroke()
                    this.layer.textSize(8*this.anim.deck[a])
                    this.layer.text('Deck',26+a*(this.layer.width-52),494-4*this.anim.deck[a])
                    this.layer.text('('+this.cardManagers[a].deck.cards.length+')',26+a*(this.layer.width-52),494+4*this.anim.deck[a])
                    this.layer.textSize(8*this.anim.sell[a])
                    this.layer.text('Sell',26+a*(this.layer.width-52),528-4*this.anim.sell[a])
                    this.layer.text('Relic',26+a*(this.layer.width-52),528+4*this.anim.sell[a])
                }
                this.layer.fill(this.player==1?this.colorDetail[0].fill:types.color.card[0].fill)
                this.layer.stroke(this.player==1?this.colorDetail[0].stroke:types.color.card[0].stroke)
                this.layer.strokeWeight(3*this.anim.exit)
                this.layer.rect(26,560,32*this.anim.exit,20*this.anim.exit,5*this.anim.exit)
                this.layer.fill(0)
                this.layer.noStroke()
                this.layer.textSize(8*this.anim.exit)
                this.layer.text('Exit',26,560)
                this.purchaseManager.display()
                this.overlayManager.display()
                this.itemManager.display(stage.scene)
                this.displayCurrency()
            break
            case 'victory':
                this.layer.image(graphics.backgrounds[2],0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[2][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].display()
                }
                for(let a=0,la=this.colorDetail.length;a<la;a++){
                    this.layer.fill(this.colorDetail[a].fill)
                    this.layer.stroke(this.colorDetail[a].stroke)
                    this.layer.strokeWeight(3*this.anim.deck[a])
                    this.layer.rect(26+a*(this.layer.width-52),494,32*this.anim.deck[a],20*this.anim.deck[a],5*this.anim.deck[a])
                    this.layer.fill(0)
                    this.layer.noStroke()
                    this.layer.textSize(8*this.anim.deck[a])
                    this.layer.text('Deck',26+a*(this.layer.width-52),494-4*this.anim.deck[a])
                    this.layer.text('('+this.cardManagers[a].deck.cards.length+')',26+a*(this.layer.width-52),494+4*this.anim.deck[a])
                }
                this.combatantManager.displayInfo(stage.scene)
                this.overlayManager.display()
            break
            case 'defeat':
                this.layer.image(graphics.backgrounds[1],0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[1][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].display()
                }
                for(let a=0,la=this.colorDetail.length;a<la;a++){
                    this.layer.fill(this.colorDetail[a].fill)
                    this.layer.stroke(this.colorDetail[a].stroke)
                    this.layer.strokeWeight(3*this.anim.deck[a])
                    this.layer.rect(26+a*(this.layer.width-52),494,32*this.anim.deck[a],20*this.anim.deck[a],5*this.anim.deck[a])
                    this.layer.fill(0)
                    this.layer.noStroke()
                    this.layer.textSize(8*this.anim.deck[a])
                    this.layer.text('Deck',26+a*(this.layer.width-52),494-4*this.anim.deck[a])
                    this.layer.text('('+this.cardManagers[a].deck.cards.length+')',26+a*(this.layer.width-52),494+4*this.anim.deck[a])
                }
                this.combatantManager.displayInfo(stage.scene)
                this.overlayManager.display()
            break
            case 'stash':
                this.layer.image(graphics.backgrounds[4],0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[4][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].display()
                }
                this.relicManager.display(stage.scene)
            break
            case 'bossstash':
                this.layer.image(graphics.backgrounds[6],0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[6][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].display()
                }
                this.relicManager.display(stage.scene)
            break
            case 'pack':
                this.layer.image(graphics.backgrounds[7],0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[7][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].display()
                }
                this.packManagers.forEach(packManager=>packManager.display())
                this.overlayManager.display()
            break
            case 'perk':
                this.layer.image(graphics.backgrounds[0],0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[0][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].display()
                }
                this.perkManagers.forEach(perkManager=>perkManager.display())
                this.overlayManager.display()
            break
            case 'event':
                this.layer.image(graphics.backgrounds[5],0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[5][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].display()
                }
                this.displayCurrency()
                for(let a=0,la=this.colorDetail.length;a<la;a++){
                    this.layer.fill(this.colorDetail[a].fill)
                    this.layer.stroke(this.colorDetail[a].stroke)
                    this.layer.strokeWeight(3*this.anim.deck[a])
                    this.layer.rect(26+a*(this.layer.width-52),494,32*this.anim.deck[a],20*this.anim.deck[a],5*this.anim.deck[a])
                    this.layer.fill(0)
                    this.layer.noStroke()
                    this.layer.textSize(8*this.anim.deck[a])
                    this.layer.text('Deck',26+a*(this.layer.width-52),494-4*this.anim.deck[a])
                    this.layer.text('('+this.cardManagers[a].deck.cards.length+')',26+a*(this.layer.width-52),494+4*this.anim.deck[a])
                }
                this.combatantManager.displayInfo(stage.scene)
                this.eventManagers.forEach(eventManager=>eventManager.display())
                this.overlayManager.display()
            break
            case 'graphic':
                this.layer.image(graphics.backgrounds[graphics.test],0,0,this.layer.width,this.layer.height)
                for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[graphics.test][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].display()
                }
            break
        }
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
                for(let a=0,la=this.menu.anim.animRate.length;a<=la;a++){
                    this.menu.anim.animRate[a]=smoothAnim(this.menu.anim.animRate[a],game.animRate==a+1,0,1,5)
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
                for(let a=0,la=this.menu.anim.animRate.length;a<=la;a++){
                    this.menu.anim.animRate[a]=smoothAnim(this.menu.anim.animRate[a],game.animRate==a+1,0,1,5)
                }
                this.menu.anim.ascendSingle=smoothAnim(this.menu.anim.ascendSingle,inputs.rel.y>=120,0,1,5)
            break
            case 'battle':
                this.tileManager.update(scene)
                this.combatantManager.update(scene)
                this.cardManagers.forEach(cardManager=>cardManager.update(scene))
                if(!this.result.defeat){
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
                        (this.cardManagers[a].hand.status.discard<0||this.cardManagers[a].hand.status.exhaust<0),0,1,5)
                }
                this.anim.reserve=smoothAnim(this.anim.reserve,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:494},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                this.anim.discard=smoothAnim(this.anim.discard,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:522},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                this.anim.dictionary=smoothAnim(this.anim.dictionary,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:550},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
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
                if(this.counter.killed>=this.counter.enemy&&!this.result.defeat){
                    if(this.result.victory){
                        let allClosed=true
                        for(let a=0,la=this.overlayManager.overlays[0].length;a<la;a++){
                            if(this.overlayManager.overlays[0][a].active){
                                allClosed=false
                            }
                        }
                        if(allClosed){
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
                            }
                        }
                    }else{
                        this.result.victory=true
                        this.overlayManager.closeAll()
                        for(let a=0,la=this.overlayManager.overlays[0].length;a<la;a++){
                            this.overlayManager.overlays[0][a].active=true
                            if(this.encounter.class==0&&this.relicManager.hasRelic(79,a)&&floor(random(0,5))==0){
                                this.encounter.class=1
                            }
                            switch(this.encounter.class){
                                case 0: case 3: case 4:
                                    this.overlayManager.overlays[0][a].activate([0,[
                                        {type:1,value:[random(0,1)<this.nodeManager.world*(game.ascend>=12?0.125:0.25)?1:0,this.relicManager.hasRelic(164,a)?floor(random(0,2.25)):floor(random(0,1.5)),0]},
                                        {type:0,value:[floor(random(40,81))]}]])
                                break
                                case 1:
                                    this.overlayManager.overlays[0][a].activate([0,[
                                        {type:1,value:[random(0,1)<(this.nodeManager.world*(game.ascend>=12?0.125:0.25)+0.5)?1:0,this.relicManager.hasRelic(164,a)?floor(random(0.5,2.5)):floor(random(0,2)),0]},
                                        {type:2,value:[]},
                                        {type:0,value:[floor(random(120,201))]}]])
                                break
                                case 2:
                                    this.overlayManager.overlays[0][a].activate([0,game.ascend>=13?[]:[
                                        {type:0,value:[floor(random(240,401))]}]])
                                break
                            }
                            if(this.encounter.class!=2){
                                if(floor(random(0,3))==0||this.relicManager.hasRelic(83,a)){
                                    this.overlayManager.overlays[0][a].activate([1,[
                                        {type:3,value:[]}]])
                                }
                            }
                        }
                        this.relicManager.activate(1,[])
                    }
                }
            break
            case 'map':
                this.nodeManager.update()
                this.overlayManager.update()
                for(let a=0,la=this.anim.deck.length;a<la;a++){
                    this.anim.deck[a]=smoothAnim(this.anim.deck[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:494},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
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
                }
                let allOptionsComplete=true
                for(let a=0,la=this.optionManagers.length;a<la;a++){
                    if(!this.optionManagers[a].complete){
                        allOptionsComplete=false
                    }
                }
                if(allOptionsComplete){
                    transition.trigger=true
                    transition.scene='map'
                }
            break
            case 'shop':
                this.purchaseManager.update()
                this.overlayManager.update()
                this.itemManager.update(stage.scene)
                for(let a=0,la=this.anim.deck.length;a<la;a++){
                    this.anim.deck[a]=smoothAnim(this.anim.deck[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:494},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                    this.anim.sell[a]=smoothAnim(this.anim.sell[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:528},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
                }
                this.anim.exit=smoothAnim(this.anim.exit,pointInsideBox({position:inputs.rel},{position:{x:26,y:560},width:32,height:20})&&!this.overlayManager.anyActive,1,1.5,5)
            break
            case 'victory': case 'defeat':
                this.overlayManager.update()
                for(let a=0,la=this.anim.deck.length;a<la;a++){
                    this.anim.deck[a]=smoothAnim(this.anim.deck[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:494},width:32,height:20}),1,1.5,5)
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
        }
    }
    onClick(scene){
        switch(scene){
            case 'title':
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-52.5,y:this.layer.height*0.6},width:62.5,height:62.5})){
                    transition.trigger=true
                    transition.scene='menu'
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+52.5,y:this.layer.height*0.6},width:62.5,height:62.5})){
                    transition.trigger=true
                    transition.scene='menu2'
                    this.menu.combatant[1]=1
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
                for(let a=0,la=types.ascend.length;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:12.5+(this.layer.width-25)*(0.5+a)/la,y:102.5},width:(this.layer.width-25)/la-6.25,height:17.5})){
                        game.ascend=a
                    }
                }
                for(let a=0,la=this.menu.anim.animRate.length;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-67.5+a*67.5,y:this.layer.height-30},width:60,height:27.5})){
                        game.animRate=a+1
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
                }
                for(let a=0,la=types.ascend.length;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:12.5+(this.layer.width-25)*(0.5+a)/la,y:102.5},width:(this.layer.width-25)/la-6.25,height:17.5})){
                        game.ascend=a
                    }
                }
                for(let a=0,la=this.menu.anim.animRate.length;a<la;a++){
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-67.5+a*67.5,y:this.layer.height-30},width:60,height:27.5})){
                        game.animRate=a+1
                    }
                }
                if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height*0.6},width:62.5,height:62.5})){
                    this.startGame()
                }
            break
            case 'battle':
                if(!this.result.defeat){
                    if(this.overlayManager.anyActive){
                        this.overlayManager.onClick(stage.scene)
                    }else if(this.turn.main<this.players){
                        this.cardManagers[this.turn.main].onClick(stage.scene)
                        this.relicManager.onClick(stage.scene)
                        this.itemManager.onClick(stage.scene)
                        if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:494},width:32,height:20})){
                            this.overlayManager.overlays[this.relicManager.hasRelic(129,this.turn.main)?13:1][this.turn.main].active=true
                            this.overlayManager.overlays[this.relicManager.hasRelic(129,this.turn.main)?13:1][this.turn.main].activate()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:522},width:32,height:20})){
                            this.overlayManager.overlays[2][this.turn.main].active=true
                            this.overlayManager.overlays[2][this.turn.main].activate()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:550},width:32,height:20})){
                            this.overlayManager.overlays[24][this.turn.main].active=true
                            this.overlayManager.overlays[24][this.turn.main].activate()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:578},width:32,height:20})&&this.attackManager.attacks.length<=0&&this.turnManager.turns.length<=0&&this.turnManager.turnsBack.length<=0){
                            this.endTurn()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.extra[this.turn.main]*100,y:414},width:32,height:20})){
                            this.cardManagers[this.turn.main].hand.cancel()
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
                    for(let a=0,la=this.cardManagers.length;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:494},width:32,height:20})){
                            this.overlayManager.overlays[4][a].active=true
                            this.overlayManager.overlays[4][a].activate()
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
                        }
                        if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:528},width:32,height:20})){
                            this.overlayManager.overlays[16][a].active=true
                            this.overlayManager.overlays[16][a].activate()
                        }
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:26,y:560},width:32,height:20})){
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
                        }
                    }
                }
            break
        }
    }
    onKey(scene,key,code){
        switch(scene){
            case 'title':
                if(code==ENTER||key=='1'){
                    transition.trigger=true
                    transition.scene='menu'
                }
                if(key=='2'){
                    transition.trigger=true
                    transition.scene='menu2'
                    this.menu.combatant[1]=1
                }
            break
            case 'menu':
                if(code==LEFT_ARROW&&this.menu.combatant[0]>1){
                    this.menu.combatant[0]--
                }
                if(code==RIGHT_ARROW&&this.menu.combatant[0]<game.playerNumber){
                    this.menu.combatant[0]++
                }
                if(key=='a'&&this.menu.deck[0]>0){
                    this.menu.deck[0]--
                }
                if(key=='d'&&this.menu.deck[0]<types.deckmode.length-1){
                    this.menu.deck[0]++
                }
                if(code==UP_ARROW&&game.ascend<types.ascend.length-1){
                    game.ascend++
                }else if(code==DOWN_ARROW&&game.ascend>0){
                    game.ascend--
                }
                if(code==ENTER){
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
                }
                if(code==UP_ARROW&&game.ascend<types.ascend.length-1){
                    game.ascend++
                }else if(code==DOWN_ARROW&&game.ascend>0){
                    game.ascend--
                }
                if(code==ENTER){
                    this.startGame()
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
                        }
                    }
                }
            break
            case 'map':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onKey(key,code)
                }else{
                    this.relicManager.onKey(stage.scene,key,code)
                    this.itemManager.onKey(stage.scene,key,code)
                    this.nodeManager.onKey(key,code)
                    for(let a=0,la=this.cardManagers.length;a<la;a++){
                        if((key=='d'||key=='D')&&this.players==1||key=='d'&&a==0&&this.players==2||key=='D'&&a==1&&this.players==2){
                            this.overlayManager.overlays[4][a].active=true
                            this.overlayManager.overlays[4][a].activate()
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
                        }
                        if((key=='s'||key=='S')&&this.players==1||key=='s'&&a==0&&this.players==2||key=='S'&&a==1&&this.players==2){
                            this.overlayManager.overlays[16][a].active=true
                            this.overlayManager.overlays[16][a].activate()
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
                        }
                    }
                }
            break
        }
    }
}