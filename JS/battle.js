class battle{
    constructor(layer,player){
        this.layer=layer
        this.player=player

        this.initialManagers()
        this.tileManager=new tileManager(this.layer,this)
        this.combatantManager=new combatantManager(this.layer,this)
        this.attackManager=new attackManager(this.layer,this)
        this.turnManager=new turnManager(this.layer,this)
        this.particleManager=new particleManager(this.layer,this)
        this.overlayManager=new overlayManager(this.layer,this)
        this.nodeManager=new nodeManager(this.layer,this)
        this.purchaseManager=new purchaseManager(this.layer,this)

        this.encounter={class:0}
        this.currency={money:[]}
        this.energy={main:[],gen:[],base:[]}
        
        this.turn={main:0,total:0,time:0,accelerate:0}
        this.anim={reserve:1,discard:1,endTurn:1,turn:[],defeat:0,deck:[],exit:1,afford:0,upAfford:false}
        this.counter={enemy:0,killed:0}
        this.result={defeat:false,victory:false}
        this.reinforce={back:[],front:[]}

        this.colorDetail=[]
        
        this.initial()
        //this.setupBattle(types.encounter[0])
    }
    initialManagers(){
        this.cardManagers=[]
        for(let a=0,la=this.player.length;a<la;a++){
            this.cardManagers.push(new cardManager(this.layer,this,a))
            this.cardManagers[a].initialDeck()
        }
        this.optionManagers=[]
        for(let a=0,la=this.player.length;a<la;a++){
            this.optionManagers.push(new optionManager(this.layer,this,a))
        }
        for(let a=0,la=this.optionManagers.length;a<la;a++){
            this.optionManagers[a].assemble()
        }
    }
    initial(){
        this.combatantManager.clearCombatants()
        this.nodeManager.setupMap()
        for(let a=0,la=this.player.length;a<la;a++){
            this.addCombatant({x:0,y:0},this.player[a],a+1,0)
            this.colorDetail.push(types.color.card[this.player[a]])
            this.currency.money.push(100)
            this.energy.main.push(0)
            this.energy.gen.push(0)
            this.energy.base.push(3)
            this.anim.deck.push(1)
        }
        if(this.player.length==1){
            this.playerKey=this.player[0]-1
        }else{
            this.playerKey=this.player[0]+1
        }
    }
    setupBattle(encounter){
        this.encounter.class=encounter.class
        for(let a=0,la=this.energy.base.length;a<la;a++){
            this.energy.gen[a]=this.energy.base[a]
        }
        this.turn={main:0,total:0,time:0,accelerate:0}
        this.anim={reserve:1,discard:1,endTurn:1,turn:[],defeat:0,deck:1,exit:1,afford:0,upAfford:false}
        this.counter={enemy:0,killed:0}
        this.result={defeat:false,victory:false}
        this.reinforce={back:[],front:[]}

        this.tileManager.generateTiles(types.level[encounter.level])
        
        this.combatantManager.resetCombatants()

        for(let a=0,la=this.player.length;a<la;a++){
            this.anim.turn.push(0)
            this.positionCombatant(this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex(a)],{x:encounter.player.position.x+a-la+1,y:encounter.player.position.y-la+1})
        }
        for(let a=0,la=encounter.enemy.length;a<la;a++){
            this.addCombatant(encounter.enemy[a].position,findName(encounter.enemy[a].name,types.combatant),0,0)
            this.counter.enemy++
        }
        for(let a=0,la=encounter.reinforce.length;a<la;a++){
            this.reinforce.back.push({position:{x:encounter.reinforce[a].position.x,y:encounter.reinforce[a].position.y},type:encounter.reinforce[a].type,turn:encounter.reinforce[a].turn})
            this.counter.enemy++
        }

        for(let a=0,la=this.cardManagers.length;a<la;a++){
            this.cardManagers[a].clear()
            this.cardManagers[a].copy(0,1)
            this.cardManagers[a].shuffle(1)
        }
        this.attackManager.clear()
        this.turnManager.clear()
        this.particleManager.clear()

        this.startTurn()
    }
    setupRest(){
        for(let a=0,la=this.optionManagers.length;a<la;a++){
            this.optionManagers[a].reset()
        }
        this.combatantManager.resetCombatants()
    }
    setupShop(){
        this.purchaseManager.setup()
    }
    addCombatant(position,type,team,direction){
        let truePosition=this.tileManager.getTilePosition(position.x,position.y)
        let relativePosition=this.tileManager.getTileRelativePosition(position.x,position.y)
        if(direction==0){
            this.combatantManager.addCombatant(truePosition.x,truePosition.y,relativePosition.x,relativePosition.y,position.x,position.y,type,team,this.tileManager.getTileRelativeDirection(position.x,position.y,round((this.tileManager.width-1)/2),round((this.tileManager.height-1)/2)))
        }else{
            this.combatantManager.addCombatant(truePosition.x,truePosition.y,relativePosition.x,relativePosition.y,position.x,position.y,type,team,this.tileManager.getTileRelativeDirection(position.x,position.y,-150+floor(random(0,6))*60))
        }
    }
    positionCombatant(combatant,position){
        combatant.position={x:this.tileManager.getTilePosition(position.x,position.y).x,y:this.tileManager.getTilePosition(position.x,position.y).y}
        combatant.relativePosition={x:this.tileManager.getTileRelativePosition(position.x,position.y).x,y:this.tileManager.getTileRelativePosition(position.x,position.y).y}
        combatant.tilePosition={x:position.x,y:position.y}
        combatant.anim.direction=round(this.tileManager.getTileRelativeDirection(position.x,position.y,round((this.tileManager.width-1)/2),round((this.tileManager.height-1)/2))/60-1/2)*60+30
        combatant.goal.anim.direction=combatant.anim.direction
    }
    loadReinforce(){
        for(let a=0,la=this.reinforce.back.length;a<la;a++){
            if(this.turn.total+this.turn.accelerate>=this.reinforce.back[a].turn){
                this.reinforce.front.push({position:{x:this.reinforce.back[a].position.x,y:this.reinforce.back[a].position.y},type:this.reinforce.back[a].type})
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
                this.addCombatant(this.reinforce.front[a].position,this.reinforce.front[a].type,1,1)
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
        this.combatantManager.activateCombatants(type,id)
        this.tileManager.activateTiles(type,id)
    }
    activateCombatant(type,id){
        this.combatantManager.activateCombatants(type,id)
    }
    activateTile(type,id){
        this.tileManager.activateTiles(type,id)
    }
    drop(type,level,color){
        for(let b=0,lb=this.cardManagers.length;b<lb;b++){
            this.cardManagers[b].discard.add(type,level,color)
            this.cardManagers[b].drop.addDrop(type,level,color)
        }
    }
    endTurn(){
        this.cardManagers[this.turn.main].allEffect(2,1)
        this.turn.main++
        if(this.turn.main>=this.player.length){
            this.sendReinforce()
            this.turnManager.loadEnemyTurns()
            this.combatantManager.enableCombatants()
        }else{
            this.cardManagers[this.turn.main].turnDraw()
        }
        this.attackManager.clear()
    }
    startTurn(){
        this.turn.main=0
        this.turn.total++
        this.turn.time=game.turnTime
        for(let a=0,la=this.energy.gen.length;a<la;a++){
            this.energy.main[a]=this.energy.gen[a]
        }
        this.combatantManager.setupCombatants()
        this.combatantManager.tick()
        this.combatantManager.unmoveCombatants()
        this.combatantManager.activateCombatants(0,0)
        this.turnManager.clear()
        this.cardManagers[0].turnDraw()
        this.loadReinforce()
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
    display(scene){
        switch(scene){
            case 'battle':
                this.layer.background(110,115,120)
                for(let a=0,la=this.player.length;a<la;a++){
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
                    this.layer.textSize(14-min(floor(max(this.energy.main[a],this.energy.base[a])/10)*2,3))
                    this.layer.text(this.energy.main[a]+'/'+this.energy.gen[a],-74+this.anim.turn[a]*100,454)
                }
                this.tileManager.display(scene)
                this.combatantManager.display(scene)
                for(let a=0,la=this.cardManagers.length;a<la;a++){
                    this.cardManagers[a].display(scene,[this.anim.turn[a]])
                }
                this.tileManager.displayCoordinate()
                this.combatantManager.displayInfo(scene)
                this.particleManager.display()
                this.overlayManager.display()
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
                this.layer.image(graphics.backgrounds[3][this.playerKey],0,0,this.layer.width,this.layer.height)
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
                for(let a=0,la=this.optionManagers.length;a<la;a++){
                    this.optionManagers[a].display()
                }
                this.overlayManager.display()
            break
            case 'shop':
                this.layer.background(110,115,120)
                this.layer.fill(this.colorDetail.fill)
                this.layer.stroke(this.colorDetail.stroke)
                this.layer.strokeWeight(3*this.anim.deck)
                this.layer.rect(26,496,32*this.anim.deck,24*this.anim.deck,5*this.anim.deck)
                this.layer.strokeWeight(3*this.anim.exit)
                this.layer.rect(26,528,32*this.anim.exit,24*this.anim.exit,5*this.anim.exit)
                this.layer.fill(0)
                this.layer.noStroke()
                this.layer.textSize(8*this.anim.deck)
                this.layer.text('Deck',26,496-4*this.anim.deck)
                this.layer.text('('+this.cardManager.deck.cards.length+')',26,496+4*this.anim.deck)
                this.layer.textSize(8*this.anim.exit)
                this.layer.text('Exit',26,528)
                this.purchaseManager.display()
                this.overlayManager.display()
                this.displayCurrency()
            break
            case 'defeat':
                this.layer.image(graphics.backgrounds[1][this.playerKey],0,0,this.layer.width,this.layer.height)
            break
            case 'perk':
                this.layer.image(graphics.backgrounds[0][this.playerKey],0,0,this.layer.width,this.layer.height)
            break
        }
    }
    update(scene){
        switch(scene){
            case 'battle':
                this.tileManager.update(scene)
                this.combatantManager.update()
                for(let a=0,la=this.cardManagers.length;a<la;a++){
                    this.cardManagers[a].update(scene)
                }
                if(!this.result.defeat){
                    this.attackManager.update()
                    this.turnManager.update()
                }
                this.particleManager.update()
                this.overlayManager.update()
                for(let a=0,la=this.anim.turn.length;a<la;a++){
                    this.anim.turn[a]=smoothAnim(this.anim.turn[a],this.turn.main==a,0,1,5)
                }
                this.anim.reserve=smoothAnim(this.anim.reserve,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:496},width:32,height:24})&&!this.overlayManager.anyActive,1,1.5,5)
                this.anim.discard=smoothAnim(this.anim.discard,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:528},width:32,height:24})&&!this.overlayManager.anyActive,1,1.5,5)
                this.anim.endTurn=smoothAnim(this.anim.endTurn,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:560},width:32,height:24})&&!this.overlayManager.anyActive,1,1.5,5)
                this.anim.defeat=smoothAnim(this.anim.defeat,this.result.defeat,0,1,240)
                this.anim.afford=smoothAnim(this.anim.afford,this.anim.upAfford,0,1,10)
                if(this.result.defeat&&this.anim.defeat>=1){
                    transition.trigger=true
                    transition.scene='defeat'
                }
                if(this.anim.upAfford&&this.anim.afford>=1){
                    this.anim.upAfford=false
                }
                if(this.counter.killed>=this.counter.enemy){
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
                            switch(this.encounter.class){
                                case 0:
                                    this.overlayManager.overlays[0][a].activate([
                                        {type:1,value:[0,floor(random(0,1.5))]},
                                        {type:0,value:[floor(random(40,81))]}])
                                break
                                case 1:
                                    this.overlayManager.overlays[0][a].activate([
                                        {type:1,value:[1,floor(random(0,2))]},
                                        {type:0,value:[floor(random(120,201))]}])
                                break
                            }
                        }
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
                for(let a=0,la=this.optionManagers.length;a<la;a++){
                    this.optionManagers[a].update()
                }
                this.overlayManager.update()
                for(let a=0,la=this.anim.deck.length;a<la;a++){
                    this.anim.deck[a]=smoothAnim(this.anim.deck[a],pointInsideBox({position:inputs.rel},{position:{x:26+a*(this.layer.width-52),y:496},width:32,height:24})&&!this.overlayManager.anyActive,1,1.5,5)
                }
                let allComplete=true
                for(let a=0,la=this.optionManagers.length;a<la;a++){
                    if(!this.optionManagers[a].complete){
                        allComplete=false
                    }
                }
                if(allComplete){
                    transition.trigger=true
                    transition.scene='map'
                }
            break
            case 'shop':
                this.purchaseManager.update()
                this.overlayManager.update()
                this.anim.deck=smoothAnim(this.anim.deck,pointInsideBox({position:inputs.rel},{position:{x:26,y:496},width:32,height:24})&&!this.overlayManager.anyActive,1,1.5,5)
                this.anim.exit=smoothAnim(this.anim.exit,pointInsideBox({position:inputs.rel},{position:{x:26,y:528},width:32,height:24})&&!this.overlayManager.anyActive,1,1.5,5)
            break
        }
    }
    onClick(scene){
        switch(scene){
            case 'battle':
                if(!this.result.defeat){
                    if(this.overlayManager.anyActive){
                        this.overlayManager.onClick()
                    }else if(this.turn.main<this.player.length){
                        this.cardManagers[this.turn.main].onClick(stage.scene)
                        if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:496},width:32,height:24})){
                            this.overlayManager.overlays[1][this.turn.main].active=true
                            this.overlayManager.overlays[1][this.turn.main].activate()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:528},width:32,height:24})){
                            this.overlayManager.overlays[2][this.turn.main].active=true
                            this.overlayManager.overlays[2][this.turn.main].activate()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn[this.turn.main]*100,y:560},width:32,height:24})&&this.attackManager.attacks.length<=0&&this.turnManager.turns.length<=0){
                            this.endTurn()
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
                    for(let a=0,la=this.optionManagers.length;a<la;a++){
                        this.optionManagers[a].onClick()
                    }
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
                    this.purchaseManager.onClick()
                    if(pointInsideBox({position:inputs.rel},{position:{x:26,y:496},width:32,height:24})){
                        this.overlayManager.overlays[4].active=true
                        this.overlayManager.overlays[4].activate()
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:26,y:528},width:32,height:24})){
                        transition.trigger=true
                        transition.scene='map'
                    }
                }
            break
        }
    }
    onKey(scene,key,code){
        switch(scene){
            case 'battle':
                if(!this.result.defeat){
                    if(this.overlayManager.anyActive){
                        this.overlayManager.onKey(key,code)
                    }else if(this.turn.main<this.player.length){
                        this.cardManagers[this.turn.main].onKey(stage.scene,key,code)
                        if(key=='r'||key=='R'){
                            this.overlayManager.overlays[1][this.turn.main].active=true
                            this.overlayManager.overlays[1][this.turn.main].activate()
                        }else if(key=='d'||key=='D'){
                            this.overlayManager.overlays[2][this.turn.main].active=true
                            this.overlayManager.overlays[2][this.turn.main].activate()
                        }else if(code==ENTER&&this.attackManager.attacks.length<=0&&this.turnManager.turns.length<=0){
                            this.endTurn()
                        }
                    }
                }
            break
            case 'map':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onKey(key,code)
                }else{
                    this.nodeManager.onKey(key,code)
                    for(let a=0,la=this.cardManagers.length;a<la;a++){
                        if((key=='d'||key=='D')&&this.player.length==1||key=='d'&&a==0&&this.players.length==2||key=='D'&&a==1&&this.player.length==2){
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
                        this.optionManagers[a].onKey(key,code)
                    }
                    for(let a=0,la=this.cardManagers.length;a<la;a++){
                        if((key=='d'||key=='D')&&this.player.length==1||key=='d'&&a==0&&this.players.length==2||key=='D'&&a==1&&this.player.length==2){
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
                    this.purchaseManager.onKey(key,code)
                    if(key=='d'||key=='D'){
                        this.overlayManager.overlays[4].active=true
                        this.overlayManager.overlays[4].activate()
                    }else if(code==ENTER){
                        transition.trigger=true
                        transition.scene='map'
                    }
                }
            break
        }
    }
}