class optionManager{
    constructor(layer,battle,player){
        this.layer=layer
        this.battle=battle
        this.player=player
        this.options=[]

        this.tilePosition={x:0,y:-1}
        this.scroll=0
        this.world=0

        this.complete=false
        this.selected=-1
    }
    assemble(){
        this.getPosKey()
        this.addOption(0)
        this.addOption(1)
        this.addOption(2)
    }
    getPosKey(){
        this.posKey=0.5-this.battle.player.length*0.5+this.player*2
    }
    addOption(type){
        for(let a=0,la=this.options.length;a<la;a++){
            this.options[a].position.x-=75
        }
        this.options.push(new option(this.layer,this.battle.player.length-1-this.player,this.layer.width/2+this.options.length*75,this.layer.height/4+this.posKey*60,type))
    }
    removeOption(type){
        for(let a=0,la=this.options.length;a<la;a++){
            if(this.options[a].type==type){
                this.options.splice(a,1)
                a--
                la--
            }
        }
        for(let a=0,la=this.options.length;a<la;a++){
            this.options[a].position.x=this.layer.width/2+75-la*75+a*150
        }
    }
    triggerOption(type){
        switch(type){
            case 0:
                this.complete=true
            break
            case 1:
                this.complete=true
                this.battle.combatantManager.combatants[this.player].heal(round(this.battle.combatantManager.combatants[this.player].base.life)*0.4)
            break
            case 2:
                this.battle.overlayManager.overlays[5][this.player].active=true
                this.battle.overlayManager.overlays[5][this.player].activate()
            break
            case 3:
                this.complete=true
                this.battle.combatantManager.combatants[this.player].gainMaxHP(4)
            break
            case 4:
                this.complete=true
                this.battle.relicManager.addSetRelic(floor(random(0,2)),this.player)
            break
            case 5:
                this.battle.overlayManager.overlays[6][this.player].active=true
                this.battle.overlayManager.overlays[6][this.player].activate()
            break
            case 6:
                this.complete=true
                this.battle.relicManager.detail[60]++
            break
        }
    }
    reset(){
        this.complete=false
        this.selected=-1
        for(let a=0,la=this.options.length;a<la;a++){
            this.options[a].complete=false
            this.options[a].anim.complete=0
        }
    }
    display(){
        for(let a=0,la=this.options.length;a<la;a++){
            this.options[a].display()
        }
    }
    update(){
        for(let a=0,la=this.options.length;a<la;a++){
            this.options[a].update()
        }
        if(this.selected==2&&!this.battle.overlayManager.overlays[5][this.player].active||
            this.selected==5&&!this.battle.overlayManager.overlays[6][this.player].active){
            this.complete=true
        }
    }
    onClick(){
        for(let a=0,la=this.options.length;a<la;a++){
            if(dist(inputs.rel.x,inputs.rel.y,this.options[a].position.x,this.options[a].position.y)<50&&this.selected==-1){
                this.options[a].complete=true
                this.triggerOption(this.options[a].type)
                this.selected=this.options[a].type
                if(this.options[a].type==6&&this.battle.relicManager.detail[60]>=3){
                    this.removeOption(6)
                }
            }
        }
    }
    onKey(key,code){
        for(let a=0,la=this.options.length;a<la;a++){
            if((int(key)+9)%10==a&&this.selected==-1){
                this.options[a].complete=true
                this.triggerOption(this.options[a].type)
                this.selected=this.options[a].type
                if(this.options[a].type==6&&this.battle.relicManager.detail[60]>=3){
                    this.removeOption(6)
                }
            }
        }
    }
}