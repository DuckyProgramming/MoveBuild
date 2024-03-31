class turnManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        
        this.auxiliary=false
        this.phase=false
        this.loads=0

        this.turns=[]
        this.turnsBack=[]
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
        this.loads++
        if(this.battle.combatantManager.combatants[enemy].team==0||this.battle.combatantManager.combatants[enemy].construct){
            this.auxiliary=true
            this.turns.push(new turn(0,this.battle,
                this.battle.combatantManager.combatants[enemy].attack[this.battle.combatantManager.combatants[enemy].intent].type,
                this.battle.combatantManager.combatants[enemy].attack[this.battle.combatantManager.combatants[enemy].intent].effect,enemy))
        }
    }
    loadEnemyAttackRepeat(enemy){
        this.loads++
        if(this.battle.combatantManager.combatants[enemy].team==0||this.battle.combatantManager.combatants[enemy].construct){
            this.auxiliary=true
            this.turns.push(new turn(0,this.battle,
                this.battle.combatantManager.combatants[enemy].attack[this.battle.combatantManager.combatants[enemy].intent].type,
                this.battle.combatantManager.combatants[enemy].attack[this.battle.combatantManager.combatants[enemy].intent].effect,enemy,false))
        }
    }
    loadEnemyAttackRepeatBack(enemy){
        this.loads++
        if(this.battle.combatantManager.combatants[enemy].team==0||this.battle.combatantManager.combatants[enemy].construct){
            this.auxiliary=true
            this.turnsBack.push(new turn(0,this.battle,
                this.battle.combatantManager.combatants[enemy].attack[this.battle.combatantManager.combatants[enemy].intent].type,
                this.battle.combatantManager.combatants[enemy].attack[this.battle.combatantManager.combatants[enemy].intent].effect,enemy,false))
        }
    }
    loadEnemySudoku(enemy){
        this.loads++
        let damageMax=5
        this.auxiliary=true
        for(let a=0,la=this.battle.combatantManager.combatants[enemy].attack.length;a<la;a++){
            if(this.battle.combatantManager.combatants[enemy].attack[a].effect.length>0){
                damageMax=max(damageMax,this.battle.combatantManager.combatants[enemy].attack[a].effect[0])
            }
        }
        this.turns.push(new turn(0,this.battle,findName('Self-Kill',types.attack),[damageMax],enemy))
    }
    loadEnemyMove(enemy){
        this.loads++
        this.auxiliary=true
        for(let a=0,la=this.battle.combatantManager.combatants[enemy].move.speed;a<la;a++){
            this.turns.push(new turn(1,this.battle,this.battle.combatantManager.combatants[enemy].move.type,this.battle.combatantManager.combatants[enemy].move.speed,enemy))
        }
    }
    loadEnemyRandomMove(enemy){
        this.loads++
        this.auxiliary=true
        this.turns.push(new turn(1,this.battle,2,this.battle.combatantManager.combatants[enemy].move.speed,enemy))
    }
    loadEnemyRotate(enemy){
        this.loads++
        this.auxiliary=true
        this.turns.push(new turn(4,this.battle,0,0,enemy))
    }
    loadEnemyMoveBack(enemy){
        this.loads++
        this.auxiliary=true
        for(let a=0,la=this.battle.combatantManager.combatants[enemy].move.speed;a<la;a++){
            this.turnsBack.push(new turn(1,this.battle,this.battle.combatantManager.combatants[enemy].move.type,this.battle.combatantManager.combatants[enemy].move.speed,enemy))
        }
    }
    loadEnemyRotateBack(enemy){
        this.loads++
        this.auxiliary=true
        this.turnsBack.push(new turn(4,this.battle,0,0,enemy))
    }
    loadEnemyTurns(){
        this.auxiliary=false
        this.phase=true
        this.loads=0
        this.turns=[]
        if(this.battle.modded(125)){
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(floor(random(0,4))==0&&this.battle.combatantManager.combatants[a].team==0&&this.battle.combatantManager.combatants[a].getStatus('Stun')<=0&&this.battle.combatantManager.combatants[a].getStatus('Cannot Move')<=0){
                    for(let b=0,lb=this.battle.combatantManager.combatants[a].move.speed+this.battle.combatantManager.combatants[a].getStatus('Speed Up')+this.battle.combatantManager.combatants[a].getStatus('Temporary Speed Up')+
                    (variants.speedcard&&(this.battle.combatantManager.combatants[a].move.type==0||this.battle.combatantManager.combatants[a].move.type==1||this.battle.combatantManager.combatants[a].move.type==2||this.battle.combatantManager.combatants[a].move.type==4)?1:0);b<lb;b++){
                        this.turns.push(new turn(1,this.battle,this.battle.combatantManager.combatants[a].move.type,this.battle.combatantManager.combatants[a].move.speed,a))
                        this.turns.push(new turn(2,this.battle,0,0,a))
                    }
                }
            }
        }
        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
            if(this.battle.combatantManager.combatants[a].team==0&&this.battle.combatantManager.combatants[a].activated&&!this.battle.combatantManager.combatants[a].moved&&this.battle.combatantManager.combatants[a].getStatus('Stun')<=0){
                for(let b=0,lb=1+this.battle.combatantManager.combatants[a].getStatus('Extra Turn')+(this.battle.modded(6)&&floor(random(0,4))==0?1:0)+(this.battle.modded(26)&&types.attack[this.battle.combatantManager.combatants[a].attack[this.battle.combatantManager.combatants[a].intent].type].name.includes('Gun')?1:0)+(this.battle.modded(52)&&types.attack[this.battle.combatantManager.combatants[a].attack[this.battle.combatantManager.combatants[a].intent].type].name.includes('Summon')?1:0)+(this.battle.modded(116)&&this.battle.combatantManager.combatants[a].life<=this.battle.combatantManager.combatants[a].base.life/2?1:0);b<lb;b++){
                    if(this.battle.combatantManager.combatants[a].getStatus('Silence')>0){
                        let damageMax=1
                        for(let c=0,lc=this.battle.combatantManager.combatants[a].attack.length;c<lc;c++){
                            if(this.battle.combatantManager.combatants[a].attack[c].effect.length>0){
                                damageMax=max(damageMax,this.battle.combatantManager.combatants[a].attack[c].effect[0])
                            }
                        }
                        this.turns.push(new turn(0,this.battle,findName('Strike',types.attack),[damageMax],a))
                    }else{
                        this.turns.push(new turn(0,this.battle,
                            this.battle.combatantManager.combatants[a].attack[this.battle.combatantManager.combatants[a].intent].type,
                            this.battle.combatantManager.combatants[a].attack[this.battle.combatantManager.combatants[a].intent].effect,a))
                    }
                }
            }else{
                if(this.battle.modded(66)&&!this.battle.combatantManager.combatants[a].activated&&this.battle.combatantManager.combatants[a].team==0){
                    this.battle.combatantManager.combatants[a].statusEffect('Strength',2)
                }
                if(this.battle.modded(129)&&!this.battle.combatantManager.combatants[a].activated&&this.battle.combatantManager.combatants[a].team==0){
                    this.battle.combatantManager.combatants[a].heal(5)
                }
            }
        }
        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
            if(this.battle.combatantManager.combatants[a].team>0&this.battle.combatantManager.combatants[a].construct&&!this.battle.combatantManager.combatants[a].moved&&this.battle.combatantManager.combatants[a].getStatus('Stun')<=0){
                this.turns.push(new turn(0,this.battle,
                    this.battle.combatantManager.combatants[a].attack[this.battle.combatantManager.combatants[a].intent].type,
                    this.battle.combatantManager.combatants[a].attack[this.battle.combatantManager.combatants[a].intent].effect,a))
            }
        }
    }
    loadEnemyTurnsMove(){
        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
            if(this.battle.combatantManager.combatants[a].team==0&&this.battle.combatantManager.combatants[a].getStatus('Stun')<=0&&this.battle.combatantManager.combatants[a].getStatus('Cannot Move')<=0){
                for(let b=0,lb=this.battle.combatantManager.combatants[a].move.speed+this.battle.combatantManager.combatants[a].getStatus('Speed Up')+this.battle.combatantManager.combatants[a].getStatus('Temporary Speed Up')+
                (variants.speedcard&&(this.battle.combatantManager.combatants[a].move.type==0||this.battle.combatantManager.combatants[a].move.type==1||this.battle.combatantManager.combatants[a].move.type==2||this.battle.combatantManager.combatants[a].move.type==4)?1:0);b<lb;b++){
                    this.turns.push(new turn(1,this.battle,this.battle.combatantManager.combatants[a].move.type,this.battle.combatantManager.combatants[a].move.speed,a))
                }
            }
        }
        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
            if(this.battle.combatantManager.combatants[a].team>0&&this.battle.combatantManager.combatants[a].construct&&this.battle.combatantManager.combatants[a].getStatus('Stun')<=0&&this.battle.combatantManager.combatants[a].getStatus('Cannot Move')<=0){
                for(let b=0,lb=this.battle.combatantManager.combatants[a].move.speed+this.battle.combatantManager.combatants[a].getStatus('Speed Up')+this.battle.combatantManager.combatants[a].getStatus('Temporary Speed Up')+
                (variants.speedcard&&(this.battle.combatantManager.combatants[a].move.type==0||this.battle.combatantManager.combatants[a].move.type==1||this.battle.combatantManager.combatants[a].move.type==2||this.battle.combatantManager.combatants[a].move.type==4)?1:0);b<lb;b++){
                    this.turns.push(new turn(1,this.battle,this.battle.combatantManager.combatants[a].move.type,this.battle.combatantManager.combatants[a].move.speed,a))
                }
            }
        }
        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
            if(this.battle.combatantManager.combatants[a].team==0&&this.battle.combatantManager.combatants[a].getStatus('Stun')<=0&&this.battle.combatantManager.combatants[a].getStatus('Cannot Move')<=0&&this.battle.combatantManager.combatants[a].getStatus('End Move')>0){
                for(let b=0,lb=this.battle.combatantManager.combatants[a].getStatus('End Move')+
                (variants.speedcard&&(this.battle.combatantManager.combatants[a].move.type==0||this.battle.combatantManager.combatants[a].move.type==1||this.battle.combatantManager.combatants[a].move.type==2||this.battle.combatantManager.combatants[a].move.type==4)?1:0);b<lb;b++){
                    this.turns.push(new turn(1,this.battle,this.battle.combatantManager.combatants[a].move.type,this.battle.combatantManager.combatants[a].move.speed,a))
                }
            }
        }
        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
            if(this.battle.combatantManager.combatants[a].team==0&&this.battle.combatantManager.combatants[a].getStatus('Stun')<=0&&this.battle.combatantManager.combatants[a].getStatus('Rotate Lock')<=0){
                this.turns.push(new turn(2,this.battle,0,0,a))
            }
        }
        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
            if((this.battle.combatantManager.combatants[a].spec.includes(17)||this.battle.combatantManager.combatants[a].construct&&(this.battle.combatantManager.combatants[a].attack.length>1||this.battle.combatantManager.combatants[a].attack[0].type!=21))&&this.battle.combatantManager.combatants[a].getStatus('Stun')<=0){
                this.turns.push(new turn(5,this.battle,0,0,a))
            }
        }
    }
    loadEnemyPoint(point){
        this.auxiliary=true
        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
            if(this.battle.combatantManager.combatants[a].team==0&&this.battle.combatantManager.combatants[a].getStatus('Stun')<=0){
                for(let b=0,lb=this.battle.combatantManager.combatants[a].move.speed+this.battle.combatantManager.combatants[a].getStatus('Speed Up')+this.battle.combatantManager.combatants[a].getStatus('Temporary Speed Up');b<lb;b++){
                    this.turns.push(new turn(1,this.battle,0,this.battle.combatantManager.combatants[a].move.speed,a))
                    this.turns[this.turns.length-1].setTarget=point
                }
            }
        }
    }
    callInConstructs(target){
        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
            if(this.battle.combatantManager.combatants[a].team>0&&this.battle.combatantManager.combatants[a].construct){
                this.battle.combatantManager.combatants[a].goal.anim.direction=round(atan2(target.relativePosition.x-this.battle.combatantManager.combatants[a].relativePosition.x,target.relativePosition.y-this.battle.combatantManager.combatants[a].relativePosition.y)/60-1/2)*60+30
                this.turns.push(new turn(0,this.battle,
                    this.battle.combatantManager.combatants[a].attack[this.battle.combatantManager.combatants[a].intent].type,
                    this.battle.combatantManager.combatants[a].attack[this.battle.combatantManager.combatants[a].intent].effect,a))
            }
        }
        this.battle.updateTargetting()
    }
    aimInConstructs(target){
        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
            if(this.battle.combatantManager.combatants[a].team>0&&this.battle.combatantManager.combatants[a].construct){
                this.battle.combatantManager.combatants[a].goal.anim.direction=round(atan2(target.relativePosition.x-this.battle.combatantManager.combatants[a].relativePosition.x,target.relativePosition.y-this.battle.combatantManager.combatants[a].relativePosition.y)/60-1/2)*60+30
            }
        }
        this.battle.updateTargetting()
    }
    unMoveTurn(id){
        for(let a=0,la=this.turns.length;a<la;a++){
            if(this.turns[a].action==1&&this.turns[a].user==id){
                delete this.turns[a]
                this.turns.splice(a,1)
                a--
                la--
            }
        }
    }
    update(){
        if(game.turnTime>0&&this.battle.turn.time<=0&&this.battle.turn.main<this.battle.players&&this.battle.attackManager.attacks.length==0&&this.turns.length==0){
            this.battle.endTurn()
        }else if(!this.battle.result.victory&&!this.battle.result.defeat){
            this.battle.turn.time--
        }
        for(let a=0;a<game.animRate;a++){
            if(this.turns.length>0){
                if(this.battle.combatantManager.combatants.length>this.turns[0].user&&this.battle.combatantManager.combatants[this.turns[0].user].team==0&&!this.auxiliary){
                    this.battle.turn.main=this.turns[0].user
                }
                if(this.turns[0].timer==0){
                    this.turns[0].set()
                    if(!this.turns[0].remove||this.turns[0].selfRemoved){
                        this.battle.replayManager.list.push(this.turns[0])
                    }
                }
                if(this.turns[0].remove){
                    delete this.turns[0]
                    this.turns.splice(0,1)
                    this.battle.updateTargetting()
                }else{
                    this.turns[0].update()
                    if(this.turns[0].remove){
                        delete this.turns[0]
                        this.turns.splice(0,1)
                        this.battle.updateTargetting()
                    }
                }
            }else if(this.battle.turn.main>=this.battle.players){
                if(this.auxiliary){
                    this.battle.turn.main=0
                }else if(this.phase){
                    this.phase=false
                    this.loadEnemyTurnsMove()
                    this.battle.replayManager.list.push(new attack(-1001,this.battle,0,[],0,0,0,0,0,0,0,0,0,{replay:1,direction:-999}))
                    this.battle.combatantManager.tickLate()
                }else{
                    this.battle.startTurn()
                }
            }
            if(this.turnsBack.length>0&&this.battle.attackManager.attacks.length<=0){
                if(this.turnsBack[0].timer==0){
                    this.turnsBack[0].set()
                    if(!this.turnsBack[0].remove||this.turnsBack[0].selfRemoved){
                        this.battle.replayManager.list.push(this.turnsBack[0])
                    }
                }
                if(this.turnsBack[0].remove){
                    delete this.turnsBack[0]
                    this.turnsBack.splice(0,1)
                    this.battle.updateTargetting()
                }else{
                    this.turnsBack[0].update()
                    if(this.turnsBack[0].remove){
                        delete this.turnsBack[0]
                        this.turnsBack.splice(0,1)
                        this.battle.updateTargetting()
                    }
                }
            }
        }
    }
}