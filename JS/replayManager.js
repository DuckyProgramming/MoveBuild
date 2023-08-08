class replayManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle

        this.list=[]
        this.bank=[]
    }
    clear(){
        for(let a=0,la=this.list.length;a<la;a++){
            delete this.list[a]
            this.list.splice(a,1)
            a--
            la--
        }
        this.list=[]
        for(let a=0,la=this.bank.length;a<la;a++){
            delete this.bank[a]
            this.bank.splice(a,1)
            a--
            la--
        }
        this.bank=[]
    }
    reset(){
        if(this.bank.length>0){
            for(let a=0,la=this.bank.length;a<la;a++){
                this.bank[a].replayed=false
                this.list.push(this.bank[a])
                this.bank.splice(a,1)
                a--
                la--
            }
        }
    }
    update(){
        for(let a=0;a<game.animRate;a++){
            if(this.list.length>0){
                if(!this.list[0].replayed){
                    this.list[0].replayed=true
                    this.list[0].timer=0
                    this.list[0].remove=false
                }
                if(this.list[0].timer==0){
                    if(this.list[0].directive=='attack'||this.list[0].action==0||this.list[0].selfRemoved){
                        this.list[0].set()
                    }else{
                        this.list[0].setBase()
                    }
                }
                this.list[0].update()
                if(this.list[0].remove){
                    this.bank.push(this.list[0])
                    this.list.splice(0,1)
                }
            }else{
                this.battle.endReplay()
            }
        }
    }
}