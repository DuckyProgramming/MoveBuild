class optionManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.options=[]

        this.tilePosition={x:0,y:-1}
        this.scroll=0
        this.world=0

        this.selected=-1

        this.addOption(0)
        this.addOption(1)
        this.addOption(2)
    }
    addOption(type){
        for(let a=0,la=this.options.length;a<la;a++){
            this.options[a].position.x-=75
        }
        this.options.push(new option(this.layer,this.layer.width/2+this.options.length*75,this.layer.height/4,type))
    }
    triggerOption(type){
        switch(type){
            case 0:
                transition.trigger=true
                transition.scene='map'
            break
            case 1:
                transition.trigger=true
                transition.scene='map'
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.battle.combatantManager.combatants[a].team==0){
                        this.battle.combatantManager.combatants[a].heal(round(this.battle.combatantManager.combatants[a].base.life)*0.4)
                    }
                }
            break
            case 2:
                this.battle.overlayManager.overlays[5].active=true
                this.battle.overlayManager.overlays[5].activate()
            break
        }
    }
    reset(){
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
        if(this.selected==2&&!this.battle.overlayManager.overlays[5].active){
            transition.trigger=true
            transition.scene='map'
        }
    }
    onClick(){
        for(let a=0,la=this.options.length;a<la;a++){
            if(dist(inputs.rel.x,inputs.rel.y,this.options[a].position.x,this.options[a].position.y)<50&&this.selected==-1){
                this.options[a].complete=true
                this.triggerOption(this.options[a].type)
                this.selected=this.options[a].type
            }
        }
    }
    onKey(key,code){
        for(let a=0,la=this.options.length;a<la;a++){
            if((int(key)+9)%10==a&&this.selected==-1){
                this.options[a].complete=true
                this.triggerOption(this.options[a].type)
                this.selected=this.options[a].type
            }
        }
    }
}