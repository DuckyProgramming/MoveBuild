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

        this.energy={main:0,gen:0,base:3}
        this.turn={main:0,total:1,time:0}
        this.anim={reserve:1,discard:1,endTurn:1,turn:0}
        this.counter={id:0}

        this.colorDetail=types.color.card[this.player]

        this.cardManager.initialDeck()
        
        this.setupBattle()
    }
    setupBattle(){
        this.energy.gen=this.energy.base
        this.turn.total=0

        this.tileManager.generateTiles(types.level[0])

        this.combatantManager.resetCombatants()

        this.addCombatant({x:3,y:3},this.player,0)
        this.addCombatant({x:0,y:0},2,1)
        this.addCombatant({x:1,y:0},2,1)
        this.addCombatant({x:2,y:0},2,1)
        this.addCombatant({x:3,y:0},2,1)

        /*this.addCombatant({x:4,y:1},2,1)
        this.addCombatant({x:5,y:2},2,1)
        this.addCombatant({x:6,y:3},2,1)
        this.addCombatant({x:6,y:4},2,1)
        this.addCombatant({x:6,y:5},2,1)*/

        this.addCombatant({x:6,y:6},2,1)
        this.addCombatant({x:5,y:6},2,1)
        this.addCombatant({x:4,y:6},2,1)
        this.addCombatant({x:3,y:6},2,1)

        /*this.addCombatant({x:2,y:5},2,1)
        this.addCombatant({x:1,y:4},2,1)
        this.addCombatant({x:0,y:3},2,1)
        this.addCombatant({x:0,y:2},2,1)
        this.addCombatant({x:0,y:1},2,1)*/

        this.cardManager.clearBattle()
        this.cardManager.copy(0,1)
        this.cardManager.shuffle(1)

        this.startTurn()
    }
    addCombatant(position,type,team){
        let tilePosition=this.tileManager.getTilePosition(position.x,position.y)
        let relativePosition=this.tileManager.getTileRelativePosition(position.x,position.y)
        this.combatantManager.addCombatant(tilePosition.x,tilePosition.y,relativePosition.x,relativePosition.y,position.x,position.y,type,team,this.tileManager.getTileRelativeDirection(position.x,position.y,round((this.tileManager.width-1)/2),round((this.tileManager.height-1)/2)))
    }
    endTurn(){
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
    }
    display(){
        this.layer.background(120,110,100)
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
        switch(stage.scene){
            case 'battle':
                this.tileManager.display(stage.scene)
                this.combatantManager.display(stage.scene)
                this.cardManager.display(stage.scene)
                this.tileManager.displayCoordinate()
                this.combatantManager.displayInfo()
                this.particleManager.display()
            break
        }
    }
    update(){
        switch(stage.scene){
            case 'battle':
                this.tileManager.update(stage.scene)
                this.combatantManager.update()
                this.cardManager.update(stage.scene)
                this.attackManager.update()
                this.turnManager.update()
                this.particleManager.update()
                this.anim.turn=smoothAnim(this.anim.turn,this.turn.main==0,0,1,5)
                this.anim.reserve=smoothAnim(this.anim.reserve,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn*100,y:496},width:32,height:24}),1,1.5,5)
                this.anim.discard=smoothAnim(this.anim.discard,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn*100,y:528},width:32,height:24}),1,1.5,5)
                this.anim.endTurn=smoothAnim(this.anim.endTurn,pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn*100,y:560},width:32,height:24}),1,1.5,5)
            break
        }
    }
    onClick(){
        switch(stage.scene){
            case 'battle':
                if(this.turn.main==0){
                    this.cardManager.onClick(stage.scene)
                    if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn*100,y:496},width:32,height:24})){
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn*100,y:528},width:32,height:24})){
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:-74+this.anim.turn*100,y:560},width:32,height:24})&&this.attackManager.attacks.length<=0&&this.turnManager.turns.length<=0){
                        this.endTurn()
                    }
                }
            break
        }
    }
    onKey(key,code){
        switch(stage.scene){
            case 'battle':
                if(this.turn.main==0){
                    this.cardManager.onKey(stage.scene,key,code)
                    if(key=='r'||key=='R'){
                    }else if(key=='d'||key=='D'){
                    }else if(code==ENTER&&this.attackManager.attacks.length<=0&&this.turnManager.turns.length<=0){
                        this.endTurn()
                    }
                }
            break
        }
    }
}