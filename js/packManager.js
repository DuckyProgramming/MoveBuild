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
        if(this.battle.deck[this.player]==0){
            this.addPack()
            this.addPack()
            this.addPack()
        }else{
            this.complete=true
        }
    }
    getPosKey(){
        this.posKey=0.5-this.battle.players*0.5+this.player*2.5
    }
    addPack(){
        this.packs.forEach(pack=>pack.reposition(-130,0))
        this.packs.push(new pack(this.layer,this.player,this.battle,this.layer.width/2+this.packs.length*130,this.layer.height/4+this.posKey*60,this.packs.length))
    }
    display(){
        if(this.battle.players>1){
            displayPlayerSymbol(this.layer,40,40+this.player*60,this.battle.player[this.player],0,1,1)
        }
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