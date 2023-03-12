class turnManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle

        this.turns=[]
    }
    update(){
        for(let a=0;a<game.animRate;a++){
            if(this.turns.length>0){
                this.battle.turn.main=this.turns[0].user
                this.turns[0].update()
                if(this.turns[0].remove){
                    this.turns.splice(0,1)
                }
            }else{
                this.battle.turn.main=0
            }
        }
    }
}