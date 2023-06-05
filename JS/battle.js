class battle{
    constructor(layer,player){
        this.layer=layer
        this.player=player

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
        this.initialized=true

        this.encounter={class:0}
        this.currency={money:[]}
        this.energy={main:[],gen:[],base:[],temp:[]}
        this.stats={node:[0,0,0,0,0,0,0,0],killed:[],earned:[],damage:[],block:[],move:[],drawn:[],played:[],taken:[],card:[],relic:[],item:[]}
        
        this.turn={main:0,total:0,time:0,accelerate:0}
        this.anim={reserve:1,discard:1,endTurn:1,cancel:1,extra:[],turn:[],defeat:0,deck:[],exit:1,sell:[],afford:0,upAfford:false}
        this.counter={enemy:0,killed:0,turnPlayed:[0,0,0,0,0]}
        this.result={defeat:false,victory:false}
        this.reinforce={back:[],front:[]}

        this.colorDetail=[]
        
        this.initial()
    }
    initialManagers(){
        this.cardManagers=[]
        this.optionManagers=[]
        this.perkManagers=[]
        this.eventManagers=[]
        for(let a=0,la=this.players;a<la;a++){
            this.cardManagers.push(new cardManager(this.layer,this,a))
            this.optionManagers.push(new optionManager(this.layer,this,a))
            this.perkManagers.push(new perkManager(this.layer,this,a))
            this.eventManagers.push(new eventManager(this.layer,this,a))
            this.cardManagers[a].initialDeck()
            this.eventManagers[a].initial()
        }
        this.optionManagers.forEach(optionManager=>optionManager.assemble())
        this.perkManagers.forEach(perkManager=>perkManager.assemble())
    }
    initial(){
        this.combatantManager.clearCombatants()
        this.nodeManager.setupMap()
        for(let a=0,la=this.players;a<la;a++){
            this.addCombatant({x:0,y:0},this.player[a],a+1,0,false)
            this.colorDetail.push(types.color.card[this.player[a]])
            this.currency.money.push(100)
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
        for(let a=0,la=game.playerNumber;a<la;a++){
            if(this.player.includes(a+1)){
                setupCombatantGraphics(a)
            }else{
                graphics.combatant.push(-1)
            }
        }
        for(let a=0,la=graphics.backgroundGen;a<la;a++){
            this.graphics.combatants.push([[],[]])
            for(let b=0,lb=this.players;b<lb;b++){
                this.graphics.combatants[a][0].push(setupCombatantBackground(a,this.player,b,lb,[0],this.layer))
                this.graphics.combatants[a][1].push(setupCombatantBackground(a,this.player,b,lb,[1],this.layer))
            }
        }
    }
    setupBattle(encounter){
        this.encounter.class=encounter.class
        for(let a=0,la=this.energy.base.length;a<la;a++){
            this.energy.gen[a]=this.energy.base[a]
        }
        this.turn={main:0,total:0,time:0,accelerate:0}
        this.anim={reserve:1,discard:1,endTurn:1,cancel:1,extra:[],turn:[],defeat:0,deck:[],sell:[],exit:1,afford:0,upAfford:false}
        this.counter={enemy:0,killed:0}
        this.result={defeat:false,victory:false}
        this.reinforce={back:[],front:[]}

        this.tileManager.generateTiles(types.level[findName(encounter.level[floor(random(0,encounter.level.length))],types.level)])
        
        this.combatantManager.resetCombatants()
        
        for(let a=0,la=this.players;a<la;a++){
            this.anim.extra.push(0)
            this.anim.turn.push(0)
            this.anim.deck.push(1)
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
    dropAll(type,level,color){
        for(let a=0,la=this.cardManagers.length;a<la;a++){
            this.cardManagers[a].discard.add(type,level,color)
            this.cardManagers[a].drop.addDrop(type,level,color)
        }
    }
    endTurn(){
        this.combatantManager.tickEarly()
        this.cardManagers[this.turn.main].allEffect(2,1)
        this.relicManager.activate(9,[this.turn.total,this.turn.main])
        if(this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(this.turn.main)].getStatus('Extra Turn')>0){
            this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(this.turn.main)].getStatus('Extra Turn')--
        }else{
            this.turn.main++
        }
        if(this.turn.main>=this.players){
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
            this.energy.main[a]=max(0,this.relicManager.hasRelic(28,a)&&this.energy.main[a]>=1?this.energy.gen[a]+1:this.energy.gen[a]+this.energy.temp[a])
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
        }
    }
    playCard(card,player){
        if(card.spec.includes(0)){
            this.cardManagers[player].fatigue()
        }
        this.stats.played[player][0]++
        this.stats.played[player][card.class]++
        this.counter.turnPlayed[0]++
        this.counter.turnPlayed[card.class]++
        this.relicManager.activate(4,[card.class,player])
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
                    this.layer.rect(-74+this.anim.turn[a]*100,496,32*this.anim.reserve,24*this.anim.reserve,5*this.anim.reserve)
                    this.layer.strokeWeight(3*this.anim.discard)
                    this.layer.rect(-74+this.anim.turn[a]*100,528,32*this.anim.discard,24*this.anim.discard,5*this.anim.discard)
                    this.layer.strokeWeight(3*this.anim.endTurn)
                    this.layer.rect(-74+this.anim.turn[a]*100,560,32*this.anim.endTurn,24*this.anim.endTurn,5*this.anim.endTurn)
                    this.layer.strokeWeight(3*this.anim.cancel)
                    this.layer.rect(-74+this.anim.extra[a]*100,412,32*this.anim.cancel,24*this.anim.cancel,5*this.anim.endTurn)
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
                    this.layer.text('Draw',-74+this.anim.turn[a]*100,496-4*this.anim.reserve)
                    this.layer.text('('+this.cardManagers[a].reserve.cards.length+')',-74+this.anim.turn[a]*100,496+4*this.anim.reserve)
                    this.layer.textSize(8*this.anim.discard)
                    this.layer.text('Discard',-74+this.anim.turn[a]*100,528-4*this.anim.discard)
                    this.layer.text('('+this.cardManagers[a].discard.cards.length+')',-74+this.anim.turn[a]*100,528+4*this.anim.discard)
                    this.layer.textSize(8*this.anim.endTurn)
                    this.layer.text('End Turn',-74+this.anim.turn[a]*100,560-4*this.anim.endTurn)
                    this.layer.text('('+this.turn.total+')',-74+this.anim.turn[a]*100,560+4*this.anim.endTurn)
                    this.layer.textSize(8*this.anim.cancel)
                    this.layer.text('Stop',-74+this.anim.extra[a]*100,412)
                    this.layer.textSize(14-min(floor(max(this.energy.main[a],this.energy.base[a])/10)*2,3))
                    this.layer.text(this.energy.main[a]+'/'+this.energy.gen[a],-74+this.anim.turn[a]*100,454)
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
                    this.layer.rect(26+a*(this.layer.width-52),496,32*this.anim.deck[a],24*this.anim.deck[a],5*this.anim.deck[a])
                    this.layer.fill(0)
                    this.layer.noStroke()
                    this.layer.textSize(8*this.anim.deck[a])
                    this.layer.text('Deck',26+a*(this.layer.width-52),496-4*this.anim.deck[a])
                    this.layer.text('('+this.cardManagers[a].deck.cards.length+')',26+a*(this.layer.width-52),496+4*this.anim.deck[a])
                }
                this.nodeManager.display()
                this.overlayManager.display()
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
                    this.layer.rect(26+a*(this.layer.width-52),496,32*this.anim.deck[a],24*this.anim.deck[a],5*this.anim.deck[a])
                    this.layer.fill(0)
                    this.layer.noStroke()
                    this.layer.textSize(8*this.anim.deck[a])
                    this.layer.text('Deck',26+a*(this.layer.width-52),496-4*this.anim.deck[a])
                    this.layer.text('('+this.cardManagers[a].deck.cards.length+')',26+a*(this.layer.width-52),496+4*this.anim.deck[a])
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
                    this.layer.rect(26+a*(this.layer.width-52),496,32*this.anim.deck[a],24*this.anim.deck[a],5*this.anim.deck[a])
                    this.layer.strokeWeight(3*this.anim.sell[a])
                    this.layer.rect(26+a*(this.layer.width-52),528,32*this.anim.sell[a],24*this.anim.sell[a],5*this.anim.sell[a])
                    this.layer.fill(0)
                    this.layer.noStroke()
                    this.layer.textSize(8*this.anim.deck[a])
                    this.layer.text('Deck',26+a*(this.layer.width-52),496-4*this.anim.deck[a])
                    this.layer.text('('+this.cardManagers[a].deck.cards.length+')',26+a*(this.layer.width-52),496+4*this.anim.deck[a])
                    this.layer.textSize(8*this.anim.sell[a])
                    this.layer.text('Sell',26+a*(this.layer.width-52),528-4*this.anim.sell[a])
                    this.layer.text('Relic',26+a*(this.layer.width-52),528+4*this.anim.sell[a])
                }
                this.layer.fill(this.player==1?this.colorDetail[0].fill:types.color.card[0].fill)
                this.layer.stroke(this.player==1?this.colorDetail[0].stroke:types.color.card[0].stroke)
                this.layer.strokeWeight(3*this.anim.exit)
                this.layer.rect(26,560,32*this.anim.exit,24*this.anim.exit,5*this.anim.exit)
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
                    this.layer.rect(26+a*(this.layer.width-52),496,32*this.anim.deck[a],24*this.anim.deck[a],5*this.anim.deck[a])
                    this.layer.fill(0)
                    this.layer.noStroke()
                    this.layer.textSize(8*this.anim.deck[a])
                    this.layer.text('Deck',26+a*(this.layer.width-52),496-4*this.anim.deck[a])
                    this.layer.text('('+this.cardManagers[a].deck.cards.length+')',26+a*(this.layer.width-52),496+4*this.anim.deck[a])
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
                    this.layer.rect(26+a*(this.layer.width-52),496,32*this.anim.deck[a],24*this.anim.deck[a],5*this.anim.deck[a])
                    this.layer.fill(0)
                    this.layer.noStroke()
                    this.layer.textSize(8*this.anim.deck[a])
                    this.layer.text('Deck',26+a*(this.layer.width-52),496-4*this.anim.deck[a])
                    this.layer.text('('+this.cardManagers[a].deck.cards.length+')',26+a*(this.layer.width-52),496+4*this.anim.deck[a])
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
                /*for(let a=0,la=this.players;a<la;a++){
                    this.graphics.combatants[5][this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)].trigger.display.extra.damage?1:0][a].display()
                }*/
                this.displayCurrency()
                for(let a=0,la=this.colorDetail.length;a<la;a++){
                    this.layer.fill(this.colorDetail[a].fill)
                    this.layer.stroke(this.colorDetail[a].stroke)
                    this.layer.strokeWeight(3*this.anim.deck[a])
                    this.layer.rect(26+a*(this.layer.width-52),496,32*this.anim.deck[a],24*this.anim.deck[a],5*this.anim.deck[a])
                    this.layer.fill(0)
                    this.layer.noStroke()
                    this.layer.textSize(8*this.anim.deck[a])
                    this.layer.text('Deck',26+a*(this.layer.width-52),496-4*this.anim.deck[a])
                    this.layer.text('('+this.cardManagers[a].deck.cards.length+')',26+a*(this.layer.width-52),496+4*this.anim.deck[a])
                }
                this.combatantManager.displayInfo(stage.scene)
                this.eventManagers.forEach(eventManager=>eventManager.display())
                this.overlayManager.display()
            break
        }
    }
    update(scene){
        switch(scene){
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
                this.anim.reserve=smoothAnim(this.anim.reserve,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:496},width:32,height:24})&&!this.overlayManager.anyActive,1,1.5,5)
                this.anim.discard=smoothAnim(this.anim.discard,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:528},width:32,height:24})&&!this.overlayManager.anyActive,1,1.5,5)
                this.anim.endTurn=smoothAnim(this.anim.endTurn,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:560},width:32,height:24})&&!this.overlayManager.anyActive,1,1.5,5)
                this.anim.cancel=smoothAnim(this.anim.cancel,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.extra[this.turn.main]*100,y:412},width:32,height:24})&&!this.overlayManager.anyActive,1,1.5,5)
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
                            transition.scene='map'
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
                                case 0:
                                    this.overlayManager.overlays[0][a].activate([0,[
                                        {type:1,value:[0,this.relicManager.hasRelic(164,a)?floor(random(0,2.25)):floor(random(0,1.5)),0]},
                                        {type:0,value:[floor(random(40,81))]}]])
                                break
                                case 1:
                                    this.overlayManager.overlays[0][a].activate([0,[
                                        {type:1,value:[1,this.relicManager.hasRelic(164,a)?floor(random(0.5,2.5)):floor(random(0,2)),0]},
                                        {type:2,value:[]},
                                        {type:0,value:[floor(random(120,201))]}]])
                                break
                            }
                            if(floor(random(0,3))==0||this.relicManager.hasRelic(83,a)){
                                this.overlayManager.overlays[0][a].activate([1,[
                                    {type:3,value:[]}]])
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
                    this.anim.deck[a]=smoothAnim(this.anim.deck[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:496},width:32,height:24})&&!this.overlayManager.anyActive,1,1.5,5)
                }
            break
            case 'rest':
                this.optionManagers.forEach(optionManager=>optionManager.update())
                this.combatantManager.update(scene)
                this.overlayManager.update()
                for(let a=0,la=this.anim.deck.length;a<la;a++){
                    this.anim.deck[a]=smoothAnim(this.anim.deck[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:496},width:32,height:24})&&!this.overlayManager.anyActive,1,1.5,5)
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
                    this.anim.deck[a]=smoothAnim(this.anim.deck[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:496},width:32,height:24})&&!this.overlayManager.anyActive,1,1.5,5)
                    this.anim.sell[a]=smoothAnim(this.anim.sell[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:528},width:32,height:24})&&!this.overlayManager.anyActive,1,1.5,5)
                }
                this.anim.exit=smoothAnim(this.anim.exit,pointInsideBox({position:inputs.rel},{position:{x:26,y:560},width:32,height:24})&&!this.overlayManager.anyActive,1,1.5,5)
            break
            case 'victory': case 'defeat':
                this.overlayManager.update()
                for(let a=0,la=this.anim.deck.length;a<la;a++){
                    this.anim.deck[a]=smoothAnim(this.anim.deck[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:496},width:32,height:24}),1,1.5,5)
                }
                let allClosed=true
                for(let a=0,la=this.overlayManager.overlays[11].length;a<la;a++){
                    if(this.overlayManager.overlays[11][a].active){
                        allClosed=false
                    }
                }
                if(allClosed){
                    transition.trigger=true
                    transition.scene='menu'
                }
            break
            case 'stash':
                this.relicManager.update(stage.scene)
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
                    this.anim.deck[a]=smoothAnim(this.anim.deck[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:496},width:32,height:24})&&!this.overlayManager.anyActive,1,1.5,5)
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
            case 'battle':
                if(!this.result.defeat){
                    this.itemManager.onClick(stage.scene)
                    if(this.overlayManager.anyActive){
                        this.overlayManager.onClick(stage.scene)
                    }else if(this.turn.main<this.players){
                        this.cardManagers[this.turn.main].onClick(stage.scene)
                        this.relicManager.onClick(stage.scene)
                        if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:496},width:32,height:24})){
                            this.overlayManager.overlays[this.relicManager.hasRelic(129,this.turn.main)?13:1][this.turn.main].active=true
                            this.overlayManager.overlays[this.relicManager.hasRelic(129,this.turn.main)?13:1][this.turn.main].activate()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:528},width:32,height:24})){
                            this.overlayManager.overlays[2][this.turn.main].active=true
                            this.overlayManager.overlays[2][this.turn.main].activate()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:560},width:32,height:24})&&this.attackManager.attacks.length<=0&&this.turnManager.turns.length<=0&&this.turnManager.turnsBack.length<=0){
                            this.endTurn()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.extra[this.turn.main]*100,y:412},width:32,height:24})){
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
                    for(let a=0,la=this.cardManagers.length;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:496},width:32,height:24})){
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
                        if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:496},width:32,height:24})){
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
                        if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:496},width:32,height:24})){
                            this.overlayManager.overlays[4][a].active=true
                            this.overlayManager.overlays[4][a].activate()
                        }
                        if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:528},width:32,height:24})){
                            this.overlayManager.overlays[16][a].active=true
                            this.overlayManager.overlays[16][a].activate()
                        }
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:26,y:560},width:32,height:24})){
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
                    if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:496},width:32,height:24})){
                        this.overlayManager.overlays[4][a].active=true
                        this.overlayManager.overlays[4][a].activate()
                    }
                }
            break
            case 'stash':
                this.relicManager.onClick(stage.scene)
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
                        if(pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:496},width:32,height:24})){
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
                        }else if(code==ENTER&&this.attackManager.attacks.length<=0&&this.turnManager.turns.length<=0&&this.turnManager.turns.length<=0){
                            this.endTurn()
                        }
                    }
                    if(key=='Q'&&game.dev){
                        quickAdd('Telefrag')
                    }
                    if(key=='W'&&game.dev){
                        save(graphics.main)
                    }
                }
            break
            case 'map':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onKey(key,code)
                }else{
                    this.nodeManager.onKey(key,code)
                    for(let a=0,la=this.cardManagers.length;a<la;a++){
                        if((key=='d'||key=='D')&&this.players==1||key=='d'&&a==0&&this.players.length==2||key=='D'&&a==1&&this.players==2){
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
                        if((key=='d'||key=='D')&&this.players==1||key=='d'&&a==0&&this.players.length==2||key=='D'&&a==1&&this.players==2){
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
                        if((key=='d'||key=='D')&&this.players==1||key=='d'&&a==0&&this.players.length==2||key=='D'&&a==1&&this.players==2){
                            this.overlayManager.overlays[4][a].active=true
                            this.overlayManager.overlays[4][a].activate()
                        }
                        if((key=='s'||key=='S')&&this.players==1||key=='s'&&a==0&&this.players.length==2||key=='S'&&a==1&&this.players==2){
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
                    if((key=='d'||key=='D')&&this.players==1||key=='d'&&a==0&&this.players.length==2||key=='D'&&a==1&&this.players==2){
                        this.overlayManager.overlays[4][a].active=true
                        this.overlayManager.overlays[4][a].activate()
                    }
                }
            break
            case 'stash':
                this.relicManager.onKey(stage.scene,key,code)
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
                        if((key=='d'||key=='D')&&this.players==1||key=='d'&&a==0&&this.players.length==2||key=='D'&&a==1&&this.players==2){
                            this.overlayManager.overlays[4][a].active=true
                            this.overlayManager.overlays[4][a].activate()
                        }
                    }
                }
            break
        }
    }
}