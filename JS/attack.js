class attack{
    constructor(type,battle,effect,user,target,targetDistance,position,relativePosition,tilePosition){
        this.type=type
        this.battle=battle
        this.effect=effect
        this.user=user
        this.target=target
        this.targetDistance=targetDistance
        this.position={x:position.x,y:position.y}
        this.relativePosition={x:relativePosition.x,y:relativePosition.y}
        this.tilePosition={x:tilePosition.x,y:tilePosition.y}

        this.procedure=[]

        this.userCombatant=this.battle.combatantManager.combatants[this.user]

        switch(this.type){
            case 1: case 4: case 5:
                this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]

                this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)

                this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
            break
            case 3:
                this.targetTile=this.battle.tileManager.tiles[this.target[0]]

                this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
            break
        }

        this.timer=0
        this.remove=false
    }
    update(){
        this.timer++
        switch(this.type){
            case 1:
                if(this.targetDistance==1){
                    if(this.timer==15){
                        this.targetCombatant.takeDamage(this.effect[0])
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                }else if(this.targetDistance==2){
                    if(this.timer<=10){
                        this.userCombatant.moveTile(this.direction,this.distance/30)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/30)
                    }
                    if(this.timer>20){
                        this.userCombatant.moveTile(this.direction,-this.distance/30)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/30)
                    }
                    if(this.timer==15){
                        this.targetCombatant.takeDamage(this.effect[0])
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                }
            break
            case 2:
                if(this.timer==15){
                    this.userCombatant.addBlock(this.effect[0])
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 3:
                this.userCombatant.moveTile(this.direction,this.distance/(30*distTargetCombatant(0,this,this.targetTile)))
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(30*distTargetCombatant(0,this,this.targetTile)))
                if(this.timer>=30*distTargetCombatant(0,this,this.targetTile)){
                    this.userCombatant.tilePosition.x=this.targetTile.tilePosition.x
                    this.userCombatant.tilePosition.y=this.targetTile.tilePosition.y
                    this.remove=true
                }
            break
            case 4:
                if(this.timer==10||this.timer==20){
                    this.targetCombatant.takeDamage(this.effect[0])
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 5:
                if(this.timer==1){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    if(index>=0){
                        this.procedure[0]=this.battle.tileManager.tiles[index].occupied
                    }else{
                        this.procedure[0]=true
                    }
                }
                if(this.timer==10){
                    this.targetCombatant.takeDamage(this.effect[0])
                }
                if(this.procedure[0]){
                    if(this.timer>10&&this.timer<=18){
                        this.targetCombatant.moveTile(this.direction,this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }else if(this.timer>18&&this.timer<=26){
                        this.targetCombatant.moveTile(this.direction,-this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                    }
                    if(this.timer==18){
                        this.targetCombatant.takeDamage(constants.collisionDamage)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(constants.collisionDamage)
                        }

                    }
                    if(this.timer>=26){
                        this.remove=true
                    }
                }else{
                    if(this.timer>10){
                        this.targetCombatant.moveTile(this.direction,this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }
                    if(this.timer>=20){
                        this.targetCombatant.tilePosition.x=this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x
                        this.targetCombatant.tilePosition.y=this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y
                        this.remove=true
                    }
                }
            break
        }
    }
}