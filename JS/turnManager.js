class turnManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        
        this.auxiliary=false

        this.turns=[]
    }
    clear(){
        for(let a=0,la=this.turns.length;a<la;a++){
            delete this.turns[a]
            this.turns.splice(a,1)
            a--
            la--
        }
        this.turns=[]
    }
    loadEnemyAttack(enemy){
        this.auxiliary=true
        this.turns.push(new turn(0,this.battle,
            this.battle.combatantManager.combatants[enemy].attack[this.battle.combatantManager.combatants[enemy].intent].type,
            this.battle.combatantManager.combatants[enemy].attack[this.battle.combatantManager.combatants[enemy].intent].effect,enemy))
    }
    loadEnemyTurns(){
        this.auxiliary=false
        this.turns=[]
        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
            if(this.battle.combatantManager.combatants[a].team==0&&this.battle.combatantManager.combatants[a].activated&&!this.battle.combatantManager.combatants[a].moved){
                this.turns.push(new turn(0,this.battle,
                    this.battle.combatantManager.combatants[a].attack[this.battle.combatantManager.combatants[a].intent].type,
                    this.battle.combatantManager.combatants[a].attack[this.battle.combatantManager.combatants[a].intent].effect,a))
            }
        }
        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
            if(this.battle.combatantManager.combatants[a].team==0){
                this.turns.push(new turn(1,this.battle,this.battle.combatantManager.combatants[a].move.type,this.battle.combatantManager.combatants[a].move.speed,a))
            }
        }
        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
            if(this.battle.combatantManager.combatants[a].team==0){
                this.turns.push(new turn(2,this.battle,0,0,a))
            }
        }
    }
    update(){
        if(game.turnTime>0&&this.battle.turn.time<=0&&this.battle.turn.main<this.battle.players&&this.battle.attackManager.attacks.length==0&&this.turns.length==0){
            this.battle.endTurn()
        }else{
            this.battle.turn.time--
        }
        for(let a=0;a<game.animRate;a++){
            if(this.turns.length>0){
                if(this.battle.combatantManager.combatants[this.turns[0].user].team==0){
                    this.battle.turn.main=this.turns[0].user
                }
                if(this.turns[0].timer==0){
                    this.turns[0].set()
                }
                if(this.turns[0].remove){
                    delete this.turns[0]
                    this.turns.splice(0,1)
                }else{
                    this.turns[0].update()
                    if(this.turns[0].remove){
                        delete this.turns[0]
                        this.turns.splice(0,1)
                    }
                }
            }else if(this.battle.turn.main>=this.battle.players){
                if(this.auxiliary){
                    this.battle.turn.main=0
                }else{
                    this.battle.startTurn()
                }
            }
        }
    }
}