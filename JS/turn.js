class turn{
    constructor(action,battle,type,effect,user){
        this.action=action
        this.battle=battle
        this.type=type
        this.effect=effect
        this.user=user

        this.timer=0
        this.remove=false
    }
    set(){
        this.userCombatant=this.battle.combatantManager.combatants[this.user]
        this.position={x:this.userCombatant.position.x,y:this.userCombatant.position.y}
        this.relativePosition={x:this.userCombatant.relativePosition.x,y:this.userCombatant.relativePosition.y}
        this.tilePosition={x:this.userCombatant.tilePosition.x,y:this.userCombatant.tilePosition.y}
        if(this.userCombatant.life<=0){
            this.remove=true
        }else{
            switch(this.action){
                case 0:
                    switch(this.type){
                        case 1:
                            this.target=[this.battle.combatantManager.getCombatantIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1])]
                        break
                    }
                    if(this.target[0]==-1){
                        this.userCombatant.moved=true
                        this.remove=true
                    }else{
                        this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]

                        this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                        this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)

                        this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                        this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
                    }
                break
            }
        }
    }
    update(){
        this.timer++
        switch(this.action){
            case 0:
                switch(this.type){
                    case 1:
                        if(this.timer==15){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }else if(this.timer>=30){
                            this.userCombatant.moved=true
                            this.remove=true
                        }
                    break
                }
            break
            case 1:
                switch(this.type){
                    case 0:
                        this.remove=true
                        if(this.effect[0]==1){
                            //move 1 space
                        }
                    break
                }
            break
        }
    }
}