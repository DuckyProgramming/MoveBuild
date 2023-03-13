class turnManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle

        this.turns=[]
    }
    loadEnemyTurns(){
        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
            if(this.battle.combatantManager.combatants[a].team==1&&this.battle.combatantManager.combatants[a].activated){
                this.turns.push(new turn(0,this.battle,
                    this.battle.combatantManager.combatants[a].attack[this.battle.combatantManager.combatants[a].intent].type,
                    this.battle.combatantManager.combatants[a].attack[this.battle.combatantManager.combatants[a].intent].effect,a))
            }
        }
        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
            if(this.battle.combatantManager.combatants[a].team==1){
                this.turns.push(new turn(1,this.battle,this.battle.combatantManager.combatants[a].move.type,this.battle.combatantManager.combatants[a].move.speed,a))
            }
        }
        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
            if(this.battle.combatantManager.combatants[a].team==1){
                this.turns.push(new turn(2,this.battle,0,0,a))
            }
        }
    }
    update(){
        if(game.turnTime>0&&this.battle.turn.time<=0&&this.battle.turn.main==0&&this.battle.attackManager.attacks.length==0&&this.turns.length==0){
            this.battle.endTurn()
        }else{
            this.battle.turn.time--
        }
        for(let a=0;a<game.animRate;a++){
            if(this.turns.length>0){
                this.battle.turn.main=this.turns[0].user
                if(this.turns[0].timer==0){
                    this.turns[0].set()
                }
                if(this.turns[0].remove){
                    this.turns.splice(0,1)
                }else{
                    this.turns[0].update()
                    if(this.turns[0].remove){
                        this.turns.splice(0,1)
                    }
                }
            }else if(this.battle.turn.main!=0){
                this.battle.startTurn()
            }
        }
    }
}