class perkManager{
    constructor(layer,battle,player){
        this.layer=layer
        this.battle=battle
        this.player=player
        this.perks=[]

        this.complete=false
        this.selected=-1
    }
    assemble(){
        this.getPosKey()
        this.addPerk([0,1,2,3,13][floor(random(0,5))])
        this.addPerk([4,5,6,7,12][floor(random(0,5))])
        this.addPerk([8,9,10,11,14][floor(random(0,5))])
        if(variants.mtg){
            let base=this.battle.energy.base[this.player]
            let active=[]
            for(let a=0,la=base.length;a<la;a++){
                if(!active.includes(base[a])){
                    active.push(base[a])
                }
            }
            if(active.length<=2){
                this.addPerk(15)
            }
        }
    }
    getPosKey(){
        this.posKey=0.5-this.battle.players*0.5+this.player*2
    }
    addPerk(type){
        this.perks.forEach(perk=>perk.position.x-=75)
        this.perks.push(new perk(this.layer,this.battle.players-1-this.player,this.layer.width/2+this.perks.length*75,this.layer.height/4+this.posKey*60,type))
    }
    getPerk(type){
        switch(type){
            case 0:
                this.complete=true
                this.battle.combatantManager.combatants[this.player].gainMaxHP(5)
            break
            case 1:
                this.complete=true
                this.battle.addCurrency(100,this.player)
            break
            case 2:
                this.complete=true
                this.battle.relicManager.addSetRelic(floor(random(0,2)),this.player)
            break
            case 3:
                this.complete=true
                for(let a=0,la=this.battle.itemManager.items[this.player].length-1;a<la;a++){
                    this.battle.itemManager.addSetItem(floor(random(0,2)),this.player)
                }
            break
            case 4:
                this.battle.overlayManager.overlays[5][this.player].active=true
                this.battle.overlayManager.overlays[5][this.player].activate()
            break
            case 5:
                this.battle.overlayManager.overlays[3][this.player].active=true
                this.battle.overlayManager.overlays[3][this.player].activate([0,1,0])
            break
            case 6:
                this.battle.overlayManager.overlays[6][this.player].active=true
                this.battle.overlayManager.overlays[6][this.player].activate()
            break
            case 7:
                this.battle.overlayManager.overlays[9][this.player].active=true
                this.battle.overlayManager.overlays[9][this.player].activate()
            break
            case 8:
                this.complete=true
                this.battle.combatantManager.combatants[this.player].loseMaxHP(5)
                this.battle.addCurrency(400,this.player)
            break
            case 9:
                this.complete=true
                this.battle.combatantManager.combatants[this.player].loseMaxHP(5)
                this.battle.relicManager.addSetRelic(2,this.player)
            break
            case 10:
                this.battle.combatantManager.combatants[this.player].loseMaxHP(5)
                this.battle.overlayManager.overlays[3][this.player].active=true
                this.battle.overlayManager.overlays[3][this.player].activate([0,2,0])
            break
            case 11:
                this.battle.combatantManager.combatants[this.player].loseMaxHP(5)
                this.battle.overlayManager.overlays[3][this.player].active=true
                this.battle.overlayManager.overlays[3][this.player].activate([0,1,1])
            break
            case 12:
                this.battle.overlayManager.overlays[44][this.player].active=true
                this.battle.overlayManager.overlays[44][this.player].activate()
            break
            case 13:
                this.complete=true
                this.battle.itemManager.addSetItem(2,this.player)
            break
            case 14:
                this.battle.combatantManager.combatants[this.player].loseMaxHP(5)
                this.battle.overlayManager.overlays[3][this.player].active=true
                this.battle.overlayManager.overlays[3][this.player].activate([0,3,16])
            break
            case 15:
                this.complete=true
                this.battle.energy.base[this.player].splice(this.battle.energy.base[this.player].indexOf(mtgPlayerColor(this.battle.player[this.player])[0]),1)
                this.battle.relicManager.addSetRelic(4,this.player)
            break
        }
    }
    reset(){
        this.complete=false
        this.selected=-1
        for(let a=0,la=this.perks.length;a<la;a++){
            this.perks[a].complete=false
            this.perks[a].anim.complete=0
        }
    }
    display(){
        if(this.battle.players>1){
            displayPlayerSymbol(this.layer,40,40+this.player*60,this.battle.player[this.player],0,1,1)
        }
        this.perks.forEach(perk=>perk.display())
    }
    update(){
        this.perks.forEach(perk=>perk.update())
        if(this.selected==4&&!this.battle.overlayManager.overlays[5][this.player].active||
            (this.selected==5||this.selected==10||this.selected==11||this.selected==14)&&!this.battle.overlayManager.overlays[3][this.player].active||
            this.selected==6&&!this.battle.overlayManager.overlays[6][this.player].active||
            this.selected==7&&!this.battle.overlayManager.overlays[9][this.player].active||
            this.selected==12&&!this.battle.overlayManager.overlays[44][this.player].active){
            this.complete=true
        }
    }
    onClick(){
        for(let a=0,la=this.perks.length;a<la;a++){
            if(dist(inputs.rel.x,inputs.rel.y,this.perks[a].position.x,this.perks[a].position.y)<50&&this.selected==-1){
                this.perks[a].complete=true
                this.getPerk(this.perks[a].type)
                this.selected=this.perks[a].type
            }
        }
    }
    onKey(key,code){
        for(let a=0,la=this.perks.length;a<la;a++){
            if((int(key)+9)%10==a&&this.selected==-1){
                this.perks[a].complete=true
                this.getPerk(this.perks[a].type)
                this.selected=this.perks[a].type
            }
        }
    }
}