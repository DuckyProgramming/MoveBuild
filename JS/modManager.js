class modManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.mods=[]
        this.holdMod=[]
        this.listing={mod:[]}
        this.createListing()
        for(let a=0,la=10;a<la;a++){
            this.addMod(70+a)
        }
    }
    createListing(){
        for(let a=0,la=types.mod.length;a<la;a++){
            this.mods.push(false)
            this.listing.mod.push(a)
        }
    }
    addMod(type){
        this.mods[type]=true
        this.holdMod.push(type)
        this.getMod(type)
    }
    getMod(type){
        switch(type){
            case 68:
                constants.collisionDamage*=5
            break
            case 77:
                for(let a=0,la=game.playerNumber;a<la;a++){
                    for(let b=0,lb=this.battle.cardManagers.length;b<lb;b++){
                        this.battle.cardManagers[b].addRandomColor(0,0,a+1,0)
                    }
                }
            break
        }
    }
    display(){
        if(variants.mod){
            this.layer.fill(200,this.fade)
            this.layer.noStroke()
            this.layer.ellipse(this.layer.width-25,250,40,40)
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