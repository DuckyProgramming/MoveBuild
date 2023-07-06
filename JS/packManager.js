class packManager{
    constructor(layer,battle,player){
        this.layer=layer
        this.battle=battle
        this.player=player
        this.packs=[]

        this.complete=false
        this.selections=0
        this.selected=-1
    }
    assemble(){
        this.getPosKey()
        this.addPack()
        this.addPack()
        this.addPack()
    }
    getPosKey(){
        this.posKey=0.5-this.battle.players*0.5+this.player*2
    }
    addPack(){
        this.packs.forEach(pack=>pack.reposition(-125,0))
        this.packs.push(new pack(this.layer,this.player,this.battle,this.layer.width/2+this.packs.length*125,this.layer.height/4+this.posKey*60,this.packs.length))
    }
    display(){
        this.packs.forEach(pack=>pack.display())
    }
    update(){
        this.packs.forEach(pack=>pack.update())
    }
    onClick(){
        for(let a=0,la=this.packs.length;a<la;a++){
            if(dist(inputs.rel.x,inputs.rel.y,this.packs[a].position.x,this.packs[a].position.y)<100&&!this.complete){
                this.packs[a].take()
                for(let b=0,lb=this.packs.length;b<lb;b++){
                    if(b!=a){
                        this.packs[b].reject()
                    }
                }
                this.complete=true
            }
        }
    }
    onKey(key,code){
        for(let a=0,la=this.packs.length;a<la;a++){
            if((int(key)+9)%10==a&&!this.complete){
                this.packs[a].take()
                for(let b=0,lb=this.packs.length;b<lb;b++){
                    if(b!=a){
                        this.packs[b].reject()
                    }
                }
                this.complete=true
            }
        }
    }
}