class optionManager{
    constructor(layer,battle,player){
        this.layer=layer
        this.battle=battle
        this.player=player
        this.options=[]

        this.complete=false
        this.selections=0
        this.selected=-1
    }
    assemble(){
        this.getPosKey()
        this.addOption(0)
        this.addOption(1)
        this.addOption(variants.cursed?8:2)
    }
    getPosKey(){
        this.posKey=0.5-this.battle.players*0.5+this.player*2
    }
    addOption(type){
        this.options.forEach(option=>option.position.x-=75)
        this.options.push(new option(this.layer,this.battle.players-1-this.player,this.layer.width/2+this.options.length*75,this.layer.height/4+this.posKey*60,type))
    }
    finishSelection(){
        this.selections++
        this.selected=-1
    }
    removeOption(type){
        for(let a=0,la=this.options.length;a<la;a++){
            if(this.options[a].type==type){
                delete this.options[a]
                this.options.splice(a,1)
                a--
                la--
            }
        }
        for(let a=0,la=this.options.length;a<la;a++){
            this.options[a].position.x=this.layer.width/2+75-la*75+a*150
        }
    }
    removeRandomOption(){
        let list=[]
        for(let a=0,la=this.options.length;a<la;a++){
            if(this.options[a].type>=1){
                list.push(a)
            }
        }
        if(list.length>0){
            let index=floor(random(0,list.length))
            delete this.options[list[index]]
            this.options.splice(list[index],1)
            for(let a=0,la=this.options.length;a<la;a++){
                this.options[a].position.x=this.layer.width/2+75-la*75+a*150
            }
        }
    }
    triggerOption(type){
        switch(type){
            case 0:
                this.selections+=10
                this.selected=-1
            break
            case 1:
                this.finishSelection()
                this.battle.combatantManager.combatants[this.player].healLifable(this.battle.relicManager.hasRelic(65,this.id)?round(this.battle.combatantManager.combatants[this.player].base.life)*0.4+10:round(this.battle.combatantManager.combatants[this.player].base.life)*0.4)
            break
            case 2:
                this.battle.overlayManager.overlays[5][this.player].active=true
                this.battle.overlayManager.overlays[5][this.player].activate()
            break
            case 3:
                this.finishSelection()
                this.battle.combatantManager.combatants[this.player].gainMaxHP(4)
            break
            case 4:
                this.finishSelection()
                this.battle.relicManager.addSetRelic(floor(random(0,2)),this.player)
            break
            case 5:
                this.battle.overlayManager.overlays[6][this.player].active=true
                this.battle.overlayManager.overlays[6][this.player].activate()
            break
            case 6:
                this.finishSelection()
                this.battle.relicManager.detail[60][this.player]++
            break
            case 7:
                this.battle.overlayManager.overlays[3][this.player].active=true
                this.battle.overlayManager.overlays[3][this.player].activate([0,floor(random(1,3)),0])
            break
            case 8:
                this.battle.overlayManager.overlays[12][this.player].active=true
                this.battle.overlayManager.overlays[12][this.player].activate()
            break
        }
    }
    reset(){
        this.complete=false
        this.selections=0
        this.selected=-1
        for(let a=0,la=this.options.length;a<la;a++){
            this.options[a].complete=false
            this.options[a].anim.complete=0
        }
    }
    display(){
        if(this.battle.players>1){
            displayPlayerSymbol(this.layer,40,40+this.player*60,this.battle.player[this.player],0,1,1)
        }
        this.options.forEach(option=>option.display())
    }
    update(){
        this.options.forEach(option=>option.update())
        if(this.selected==2&&!this.battle.overlayManager.overlays[5][this.player].active||
            this.selected==5&&!this.battle.overlayManager.overlays[6][this.player].active||
            this.selected==7&&!this.battle.overlayManager.overlays[3][this.player].active||
            this.selected==8&&!this.battle.overlayManager.overlays[12][this.player].active){
            this.finishSelection()
        }
        if(this.selections>=(this.battle.relicManager.hasRelic(117,this.player)?2:1)){
            this.complete=true
        }
    }
    onClick(){
        for(let a=0,la=this.options.length;a<la;a++){
            if(dist(inputs.rel.x,inputs.rel.y,this.options[a].position.x,this.options[a].position.y)<50&&this.selected==-1&&!this.options[a].complete&&!this.complete){
                this.options[a].complete=true
                this.selected=this.options[a].type
                this.triggerOption(this.options[a].type)
                if(this.options[a].type==6&&this.battle.relicManager.detail[60][this.player]>=3){
                    this.removeOption(6)
                }
            }
        }
    }
    onKey(key,code){
        for(let a=0,la=this.options.length;a<la;a++){
            if((int(key)+9)%10==a&&this.selected==-1&&!this.options[a].complete&&!this.complete){
                this.options[a].complete=true
                this.selected=this.options[a].type
                this.triggerOption(this.options[a].type)
                if(this.options[a].type==6&&this.battle.relicManager.detail[60][this.player]>=3){
                    this.removeOption(6)
                }
            }
        }
    }
}