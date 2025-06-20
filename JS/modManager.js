class modManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.mods=[]
        this.holdMod=[]
        this.listing={mod:[]}
        this.initialListing()
    }
    save(){
        let composite={
            mods:this.mods,
            holdMod:this.holdMod,
            listing:{
                mod:this.listing.mod
            },
        }
        return composite
    }
    load(composite){
        this.mods=composite.mods
        this.holdMod=composite.holdMod
        this.listing.mod=composite.listing.mod
    }
    initialListing(){
        for(let a=0,la=types.mod.length;a<la;a++){
            this.mods.push(false)
            this.listing.mod.push(a)
        }
    }
    addMod(type){
        if(variants.mod){
            this.mods[type]=true
            this.holdMod.push(type)
            this.getMod(type)
        }
    }
    getMod(type){
        switch(type){
            case 77:
                for(let a=0,la=constants.playerNumber;a<la;a++){
                    this.battle.cardManagers.forEach(cardManager=>cardManager.addRandomAbstract(0,0,0,1,0,[],[a+1,0]))
                }
            break
            case 85:
                this.battle.optionManagers.forEach(optionManager=>optionManager.removeRandomOption())
            break
            case 90:
                for(let a=0,la=10;a<la;a++){
                    this.battle.cardManagers.forEach(cardManager=>cardManager.addRandomAbstract(0,0,0,4,0,[],[3]))
                }
            break
            case 98:
                for(let a=0,la=10;a<la;a++){
                    this.battle.cardManagers.forEach(cardManager=>cardManager.deck.randomEffect(21,[]))
                }
            break
            case 124:
                for(let a=0,la=2;a<la;a++){
                    this.battle.cardManagers.forEach(cardManager=>cardManager.addRandomAll(0,0,2))
                    this.battle.cardManagers.forEach(cardManager=>cardManager.addRandomCharacter(0,0,constants.playerNumber+2,3))
                }
            break
            case 132:
                for(let a=0,la=this.battle.players;a<la;a++){
                    let type=this.battle.cardManagers[a].listing.allListableCard[3][floor(random(0,this.battle.cardManagers[a].listing.allListableCard[3].length))]
                    for(let b=0,lb=10;b<lb;b++){
                        this.battle.cardManagers[a].deck.add(type,0,types.card[type].list)
                    }
                }
            break
            case 144:
                transition.trigger=true
                transition.scene='battle'
                this.battle.setupBattle(types.encounter[findName('Management Ambush',types.encounter)])
            break
            case 145:
                for(let a=0,la=this.battle.players;a<la;a++){
                    this.battle.addCurrency(777,this.player)
                }
                //this.battle.cardManagers.forEach(cardManager=>cardManager.deck.add(findName('Cornucopia',types.card),0,0))
                //this.battle.cardManagers.forEach(cardManager=>cardManager.deck.add(findName('Divine\nSword',types.card),0,0))
            break
            case 146:
                for(let a=0,la=5;a<la;a++){
                    this.battle.cardManagers.forEach(cardManager=>cardManager.deck.add(findName(`${a+1} of\nNothings`,types.card),0,0))
                }
            break
            case 148:
                for(let a=0,la=this.battle.players;a<la;a++){
                    for(let b=0,lb=this.battle.cardManagers[a].deck.cards.length;b<lb;b++){
                        if(this.battle.cardManagers[a].deck.cards[b].spec.includes(12)){
                            for(let c=0,lc=this.battle.cardManagers[a].deck.cards[b].class.length;c<lc;c++){
                                this.battle.cardManagers[a].deck.cards[b].class[c]=8
                            }
                        }else{
                            this.battle.cardManagers[a].deck.cards[b].class=8
                        }
                    }
                }
            break
            case 149:
                this.battle.cardManagers.forEach(cardManager=>cardManager.deck.removeDupes())
            break
            case 165:
                for(let a=0,la=this.battle.players;a<la;a++){
                    this.battle.relicManager.loseRandomRelic(a)
                }
            break
            case 171:
                for(let a=0,la=this.battle.players;a<la;a++){
                    for(let b=0,lb=5;b<lb;b++){
                        this.battle.cardManagers[a].randomEffect(0,30,[7])
                    }
                }
            break
            case 174:
                this.battle.combatantManager.combatants=[]
                this.battle.colorDetail=[]
                for(let a=0,la=this.battle.players;a<la;a++){
                    this.battle.player[a]=floor(random(0,constants.playerNumber))+1
                    this.battle.addCombatant({x:0,y:0},this.battle.player[a],a+1,0,false)
                    this.battle.colorDetail.push(types.color.card[this.battle.player[a]])
                }
                this.battle.initialGraphics()
            break
            case 182:
                for(let a=0,la=this.battle.players;a<la;a++){
                    this.battle.cardManagers[a].randomEffect(0,9,[100])
                }
            break
            case 214:
                frameRate(45)
            break
            case 221:
                for(let a=0,la=2;a<la;a++){
                    let index=floor(random(0,this.listing.mod.length))
                    this.addMod(this.listing.mod[index])
                    this.listing.mod.splice(index,1)
                }
            break
            case 227:
                for(let a=0,la=this.battle.players;a<la;a++){
                    this.battle.itemManager.removeItemSlots(1,a)
                }
            break
            case 235:
                this.layer.textFont('Comic Sans MS')
            break
        }
    }
    display(){
        if(variants.mod){
            this.layer.fill(200,this.fade)
            this.layer.noStroke()
            this.layer.ellipse(this.layer.width-25,250,40)
            this.layer.stroke(100,this.fade)
            this.layer.strokeWeight(2)
            this.layer.quad(this.layer.width-19,240,this.layer.width-11,240,this.layer.width-31,260,this.layer.width-39,260)
        }
    }
    onClick(){
        if(dist(inputs.rel.x,inputs.rel.y,this.layer.width-25,250)<20&&variants.mod){
            this.battle.overlayManager.overlays[41][0].active=true
            this.battle.overlayManager.overlays[41][0].activate()
        }
    }
    onKey(key,code){
        if(key=='m'&&variants.mod){
            this.battle.overlayManager.overlays[41][0].active=true
            this.battle.overlayManager.overlays[41][0].activate()
        }
    }
}