class turn{
    constructor(action,battle,type,effect,user){
        this.action=action
        this.battle=battle
        this.type=type
        this.effect=effect
        this.user=user

        this.procedure=[]

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
                        case 1: case 2:
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
                case 1:
                    switch(this.type){
                        case 0:
                            this.target=[this.battle.combatantManager.getPlayerCombatantIndex()]
                            this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]

                            this.direction=round(atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)/60-random(0.4,0.6))*60+30

                            this.target=[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.direction)[1])]
                            if(this.target[0]==-1){
                                this.remove=true
                            }else{
                                this.targetTile=this.battle.tileManager.tiles[this.target[0]]
                                if(this.targetTile.occupied){
                                    this.direction+=(floor(random(0,2))*2-1)*60
                                    this.target=[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.direction)[1])]
                                    if(this.target[0]==-1){
                                        this.remove=true
                                    }else{
                                        this.targetTile=this.battle.tileManager.tiles[this.target[0]]
                                        if(this.targetTile.occupied){
                                            this.remove=true
                                        }
    
                                        this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                                        this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)
    
                                        this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                                        this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                                    }
                                }else{
                                    if(this.targetTile.occupied){
                                        this.remove=true
                                    }

                                    this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                                    this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                                    this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                                    this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                                }
                            }
                        break
                    }
                break
                case 2:
                    this.target=[this.battle.combatantManager.getPlayerCombatantIndex()]
                    this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                    this.userCombatant.goal.anim.direction=round(atan2(this.targetCombatant.relativePosition.x-this.userCombatant.relativePosition.x,this.targetCombatant.relativePosition.y-this.userCombatant.relativePosition.y)/60-1/2)*60+30
                    if(!(this.battle.tileManager.tiles[this.userCombatant.getTarget()].tilePosition.x==this.targetCombatant.tilePosition.x&&this.battle.tileManager.tiles[this.userCombatant.getTarget()].tilePosition.y==this.targetCombatant.tilePosition.y)&&this.battle.tileManager.tiles[this.userCombatant.getTarget()].occupied&&floor(random(0,2)==0)){
                        let remember=this.userCombatant.goal.anim.direction
                        this.userCombatant.goal.anim.direction+=(floor(random(0,2))*2-1)*60
                        if(!(this.battle.tileManager.tiles[this.userCombatant.getTarget()].tilePosition.x==this.targetCombatant.tilePosition.x&&this.battle.tileManager.tiles[this.userCombatant.getTarget()].tilePosition.y==this.targetCombatant.tilePosition.y)&&this.battle.tileManager.tiles[this.userCombatant.getTarget()].occupied){
                            this.userCombatant.goal.anim.direction=remember
                        }else{
                            this.battle.activateCombatant(1,this.userCombatant.id)
                        }
                    }else{
                        this.battle.activateCombatant(1,this.userCombatant.id)
                    }
                    this.remove=true
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
                        if(this.timer==1){
                            this.userCombatant.startAnimation(2)
                        }
                        this.userCombatant.runAnimation(1/30,2)
                        if(this.timer==15){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }else if(this.timer>=30){
                            this.userCombatant.moved=true
                            this.remove=true
                        }
                    break
                    case 2:
                        if(this.timer==1){
                            this.userCombatant.startAnimation(2)
                        }
                        this.userCombatant.runAnimation(1/30,2)
                        if(this.timer==10||this.timer==15||this.timer==20){
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
                        if(this.timer==1){
                            this.userCombatant.startAnimation(0)
                        }
                        this.userCombatant.moveTile(this.direction,this.distance/(15*distTargetCombatant(0,this,this.targetTile)))
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*distTargetCombatant(0,this,this.targetTile)))
                        this.userCombatant.runAnimation(1/15,0)
                        if(this.timer>=15*distTargetCombatant(0,this,this.targetTile)){
                            this.userCombatant.tilePosition.x=this.targetTile.tilePosition.x
                            this.userCombatant.tilePosition.y=this.targetTile.tilePosition.y
                            this.battle.activateTile(1,this.userCombatant.id)
                            this.remove=true
                        }
                    break
                }
            break
        }
    }
}