class battle{
    constructor(layer,player){
        this.layer=layer
        this.player=player

        this.tileManager=new tileManager(this.layer,this)
        this.combatantManager=new combatantManager(this.layer,this)
        this.cardManager=new cardManager(this.layer,this)
        this.attackManager=new attackManager(this.layer,this)
        this.turnManager=new turnManager(this.layer,this)
        this.particleManager=new particleManager(this.layer,this)
        this.overlayManager=new overlayManager(this.layer,this)
        this.nodeManager=new nodeManager(this.layer,this)
        this.optionManager=new optionManager(this.layer,this)
        this.purchaseManager=new purchaseManager(this.layer,this)

        this.encounter={class:0}
        this.currency={money:100}
        this.energy={main:0,gen:0,base:3}
        
        this.turn={main:0,total:1,time:0,accelerate:0}
        this.anim={reserve:1,discard:1,endTurn:1,turn:0,defeat:0,deck:1,exit:1}
        this.counter={enemy:0,killed:0}
        this.result={defeat:false,victory:false}
        this.reinforce={back:[],front:[]}

        this.colorDetail=types.color.card[this.player]
        
        this.initial()
        //this.setupBattle(types.encounter[0])
    }
    initial(){
        this.combatantManager.clearCombatants()

        this.nodeManager.setupMap()

        this.addCombatant({x:0,y:0},this.player,0,0)
        
        this.cardManager.initialDeck()
    }
    setupBattle(encounter){
        this.encounter.class=encounter.class
        this.energy.gen=this.energy.base
        this.turn={main:0,total:1,time:0,accelerate:0}
        this.anim={reserve:1,discard:1,endTurn:1,turn:0,defeat:0,deck:1}
        this.counter={enemy:0,killed:0}
        this.result={defeat:false,victory:false}
        this.reinforce={back:[],front:[]}

        this.tileManager.generateTiles(types.level[encounter.level])
        
        this.combatantManager.resetCombatants()

        this.positionCombatant(this.combatantManager.combatants[this.combatantManager.getPlayerCombatantIndex()],encounter.player.position)
        for(let a=0,la=encounter.enemy.length;a<la;a++){
            this.addCombatant(encounter.enemy[a].position,encounter.enemy[a].type,1,0)
            this.counter.enemy++
        }
        for(let a=0,la=encounter.reinforce.length;a<la;a++){
            this.reinforce.back.push({position:{x:encounter.reinforce[a].position.x,y:encounter.reinforce[a].position.y},type:encounter.reinforce[a].type,turn:encounter.reinforce[a].turn})
            this.counter.enemy++
        }

        this.cardManager.clearBattle()
        this.cardManager.copy(0,1)
        this.cardManager.shuffle(1)

        this.startTurn()
    }
    setupRest(){
        this.optionManager.reset()
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
    endTurn(){
        this.sendReinforce()
        this.turnManager.loadEnemyTurns()
        this.cardManager.allEffect(2,0)
        this.attackManager.clear()
    }
    startTurn(){
        this.turn.main=0
        this.turn.total++
        this.turn.time=game.turnTime
        this.energy.main=this.energy.gen
        this.combatantManager.setupCombatants()
        this.combatantManager.unmoveCombatants()
        this.combatantManager.activateCombatants(0,0)
        this.cardManager.draw(this.cardManager.drawAmount)
        this.loadReinforce()
    }
    displayCurrency(){
        this.layer.fill(240,240,220)
        this.layer.noStroke()
        this.layer.ellipse(20,16,16,16)
        this.layer.fill(220,220,200)
        this.layer.ellipse(20,16,10,10)
        this.layer.fill(230,230,210)
        this.layer.textSize(16)
        this.layer.textAlign(LEFT,CENTER)
        this.layer.text(this.currency.money,30,18)
        this.layer.textAlign(CENTER,CENTER)
    }
    display(scene){
        switch(scene){
            case 'battle':
                this.layer.background(110,115,120)
                this.layer.fill(225,255,255)
                this.layer.stroke(200,255,255)
                this.layer.strokeWeight(3)
                this.layer.quad(-90+this.anim.turn*100,454,-74+this.anim.turn*100,434,-58+this.anim.turn*100,454,-74+this.anim.turn*100,474)
                this.layer.fill(this.colorDetail.fill)
                this.layer.stroke(this.colorDetail.stroke)
                this.layer.strokeWeight(3*this.anim.reserve)
                this.layer.rect(-74+this.anim.turn*100,496,32*this.anim.reserve,24*this.anim.reserve,5*this.anim.reserve)
                this.layer.strokeWeight(3*this.anim.discard)
                this.layer.rect(-74+this.anim.turn*100,528,32*this.anim.discard,24*this.anim.discard,5*this.anim.discard)
                this.layer.strokeWeight(3*this.anim.endTurn)
                this.layer.rect(-74+this.anim.turn*100,560,32*this.anim.endTurn,24*this.anim.endTurn,5*this.anim.endTurn)
                if(game.turnTime>0){
                    this.layer.rect(58+game.turnTime/6,680-this.anim.turn*100,game.turnTime/3+12,16,5)
                    this.layer.fill(0)
                    this.layer.noStroke()
                    this.layer.rect(58+game.turnTime/6,680-this.anim.turn*100,game.turnTime/3,4,2)
                    this.layer.fill(this.colorDetail.active)
                    this.layer.rect(58+this.turn.time/6,680-this.anim.turn*100,this.turn.time/3,4,2)
                }
                this.layer.fill(0)
                this.layer.noStroke()
                this.layer.textSize(8*this.anim.reserve)
                this.layer.text('Draw',-74+this.anim.turn*100,496-4*this.anim.reserve)
                this.layer.text('('+this.cardManager.reserve.cards.length+')',-74+this.anim.turn*100,496+4*this.anim.reserve)
                this.layer.textSize(8*this.anim.discard)
                this.layer.text('Discard',-74+this.anim.turn*100,528-4*this.anim.discard)
                this.layer.text('('+this.cardManager.discard.cards.length+')',-74+this.anim.turn*100,528+4*this.anim.discard)
                this.layer.textSize(8*this.anim.endTurn)
                this.layer.text('End Turn',-74+this.anim.turn*100,560-4*this.anim.endTurn)
                this.layer.text('('+this.turn.total+')',-74+this.anim.turn*100,560+4*this.anim.endTurn)
                this.layer.textSize(14-min(floor(max(this.energy.main,this.energy.base)/10)*2,3))
                this.layer.text(this.energy.main+'/'+this.energy.gen,-74+this.anim.turn*100,454)
                this.tileManager.display(scene)
                this.combatantManager.display(scene)
                this.cardManager.display(scene)
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
                this.layer.fill(this.colorDetail.fill)
                this.layer.stroke(this.colorDetail.stroke)
                this.layer.strokeWeight(3*this.anim.deck)
                this.layer.rect(26,496,32*this.anim.deck,24*this.anim.deck,5*this.anim.deck)
                this.layer.fill(0)
                this.layer.noStroke()
                this.layer.textSize(8*this.anim.deck)
                this.layer.text('Deck',26,496-4*this.anim.deck)
                this.layer.text('('+this.cardManager.deck.cards.length+')',26,496+4*this.anim.deck)
                this.nodeManager.display()
                this.overlayManager.display()
                this.displayCurrency()
            break
            case 'rest':
                this.layer.image(graphics.backgrounds[3],0,0,this.layer.width,this.layer.height)
                this.layer.fill(this.colorDetail.fill)
                this.layer.stroke(this.colorDetail.stroke)
                this.layer.strokeWeight(3*this.anim.deck)
                this.layer.rect(26,496,32*this.anim.deck,24*this.anim.deck,5*this.anim.deck)
                this.layer.fill(0)
                this.layer.noStroke()
                this.layer.textSize(8*this.anim.deck)
                this.layer.text('Deck',26,496-4*this.anim.deck)
                this.layer.text('('+this.cardManager.deck.cards.length+')',26,496+4*this.anim.deck)
                this.combatantManager.displayInfo(stage.scene)
                this.optionManager.display()
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
                this.layer.image(graphics.backgrounds[1],0,0,this.layer.width,this.layer.height)
            break
        }
    }
    update(scene){
        switch(scene){
            case 'battle':
                this.tileManager.update(scene)
                this.combatantManager.update()
                this.cardManager.update(scene)
                if(!this.result.defeat){
                    this.attackManager.update()
                    this.turnManager.update()
                }
                this.particleManager.update()
                this.overlayManager.update()
                this.anim.turn=smoothAnim(this.anim.turn,this.turn.main==0,0,1,5)
                this.anim.reserve=smoothAnim(this.anim.reserve,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn*100,y:496},width:32,height:24})&&!this.overlayManager.anyActive,1,1.5,5)
                this.anim.discard=smoothAnim(this.anim.discard,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn*100,y:528},width:32,height:24})&&!this.overlayManager.anyActive,1,1.5,5)
                this.anim.endTurn=smoothAnim(this.anim.endTurn,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn*100,y:560},width:32,height:24})&&!this.overlayManager.anyActive,1,1.5,5)
                this.anim.defeat=smoothAnim(this.anim.defeat,this.result.defeat,0,1,240)
                if(this.result.defeat&&this.anim.defeat>=1){
                    transition.trigger=true
                    transition.scene='defeat'
                }
                if(this.counter.killed>=this.counter.enemy&&!this.result.victory){
                    this.result.victory=true
                    this.overlayManager.closeAll()
                    this.overlayManager.overlays[0].active=true
                    switch(this.encounter.class){
                        case 0:
                            this.overlayManager.overlays[0].activate([
                                {type:1,value:[0,floor(random(0,1.5))]},
                                {type:0,value:[floor(random(40,81))]}])
                        break
                        case 1:
                            this.overlayManager.overlays[0].activate([
                                {type:1,value:[1,floor(random(0,2))]},
                                {type:0,value:[floor(random(120,201))]}])
                        break
                    }
                }
            break
            case 'map':
                this.nodeManager.update()
                this.overlayManager.update()
                this.anim.deck=smoothAnim(this.anim.deck,pointInsideBox({position:inputs.rel},{position:{x:26,y:496},width:32,height:24})&&!this.overlayManager.anyActive,1,1.5,5)
            break
            case 'rest':
                this.optionManager.update()
                this.overlayManager.update()
                this.anim.deck=smoothAnim(this.anim.deck,pointInsideBox({position:inputs.rel},{position:{x:26,y:496},width:32,height:24})&&!this.overlayManager.anyActive,1,1.5,5)
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
                    }else if(this.turn.main==0){
                        this.cardManager.onClick(stage.scene)
                        if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn*100,y:496},width:32,height:24})){
                            this.overlayManager.overlays[1].active=true
                            this.overlayManager.overlays[1].activate()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn*100,y:528},width:32,height:24})){
                            this.overlayManager.overlays[2].active=true
                            this.overlayManager.overlays[2].activate()
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn*100,y:560},width:32,height:24})&&this.attackManager.attacks.length<=0&&this.turnManager.turns.length<=0){
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
                    if(pointInsideBox({position:inputs.rel},{position:{x:26,y:496},width:32,height:24})){
                        this.overlayManager.overlays[4].active=true
                        this.overlayManager.overlays[4].activate()
                    }
                }
            break
            case 'rest':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onClick()
                }else{
                    this.optionManager.onClick()
                    if(pointInsideBox({position:inputs.rel},{position:{x:26,y:496},width:32,height:24})){
                        this.overlayManager.overlays[4].active=true
                        this.overlayManager.overlays[4].activate()
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
                    }else if(this.turn.main==0){
                        this.cardManager.onKey(stage.scene,key,code)
                        if(key=='r'||key=='R'){
                            this.overlayManager.overlays[1].active=true
                            this.overlayManager.overlays[1].activate()
                        }else if(key=='d'||key=='D'){
                            this.overlayManager.overlays[2].active=true
                            this.overlayManager.overlays[2].activate()
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
                    if(key=='d'||key=='D'){
                        this.overlayManager.overlays[4].active=true
                        this.overlayManager.overlays[4].activate()
                    }
                }
            break
            case 'rest':
                if(this.overlayManager.anyActive){
                    this.overlayManager.onKey(key,code)
                }else{
                    this.optionManager.onKey(key,code)
                    if(key=='d'||key=='D'){
                        this.overlayManager.overlays[4].active=true
                        this.overlayManager.overlays[4].activate()
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