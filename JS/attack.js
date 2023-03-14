class attack{
    constructor(type,battle,effect,user,target,targetDistance,targetClass){
        this.type=type
        this.battle=battle
        this.effect=effect
        this.user=user
        this.target=target
        this.targetDistance=targetDistance
        this.targetClass=targetClass

        this.procedure=[]

        this.userCombatant=this.battle.combatantManager.combatants[this.user]
        
        this.position={x:this.userCombatant.position.x,y:this.userCombatant.position.y}
        this.relativePosition={x:this.userCombatant.relativePosition.x,y:this.userCombatant.relativePosition.y}
        this.tilePosition={x:this.userCombatant.tilePosition.x,y:this.userCombatant.tilePosition.y}

        switch(this.type){
            case 1: case 4: case 5: case 7: case 11:
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
            case 9:
                if(this.targetClass==1){
                    this.targetTile=this.battle.tileManager.tiles[this.target[0]]

                    this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                    this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                    this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                    this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                }else if(this.targetClass==2){
                    this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                    this.targetTile=this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)]

                    this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                    this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)

                    this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                    this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
                }
            break
        }

        this.timer=0
        this.remove=false
    }
    update(){
        this.timer++
        switch(this.type){
            case 0:
                this.remove=true
            break
            case 1:
                if(this.targetDistance==1){
                    if(this.timer==1){
                        this.userCombatant.startAnimation(2)
                    }
                    this.userCombatant.runAnimation(1/15,2)
                    if(this.timer==15){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                }else if(this.targetDistance==2){
                    if(this.timer==1||this.timer==36){
                        this.userCombatant.startAnimation(0)
                    }else if(this.timer==11){
                        this.userCombatant.startAnimation(2)
                    }
                    if(this.timer<=10||this.timer>30){
                        this.userCombatant.runAnimation(1/10,0)
                    }else if(this.timer>10&&this.timer<=30){
                        this.userCombatant.runAnimation(1/10,2)
                    }
                    if(this.timer<=10){
                        this.userCombatant.moveTile(this.direction,this.distance/25)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/25)
                    }else if(this.timer>30){
                        this.userCombatant.moveTile(this.direction,-this.distance/25)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/25)
                    }
                    if(this.timer==20){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }else if(this.timer>=40){
                        this.remove=true
                    }
                }
            break
            case 2:
                if(this.timer==1){
                    this.userCombatant.startAnimation(1)
                }
                this.userCombatant.runAnimation(1/15,1)
                if(this.timer==15){
                    this.userCombatant.addBlock(this.effect[0])
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 3:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }
                this.userCombatant.moveTile(this.direction,this.distance/(15*distTargetCombatant(0,this,this.targetTile)))
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*distTargetCombatant(0,this,this.targetTile)))
                this.userCombatant.runAnimation(1/15,0)
                if(this.timer>=15*distTargetCombatant(0,this,this.targetTile)){
                    this.userCombatant.tilePosition.x=this.targetTile.tilePosition.x
                    this.userCombatant.tilePosition.y=this.targetTile.tilePosition.y
                    this.battle.combatantManager.activateCombatants(1,this.userCombatant.id)
                    this.remove=true
                }
            break
            case 4:
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                }
                if(this.timer>10&&this.timer<=20||this.timer>25&&this.timer<=35){
                    this.userCombatant.runAnimation(1/10,2)
                }
                if(this.timer==15||this.timer==30){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }else if(this.timer>=45){
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
                    this.userCombatant.startAnimation(3)
                }else if(this.timer==10){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }
                if(this.timer<=20){
                    this.userCombatant.runAnimation(1/10,3)
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
                        this.targetCombatant.takeDamage(constants.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(constants.collisionDamage,-1)
                        }

                    }else if(this.timer>=26){
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
                        this.battle.combatantManager.activateCombatants(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 6:
                if(this.timer==1){
                    this.userCombatant.startAnimation(4)
                }
                this.userCombatant.runAnimation(1/10,4)
                if(this.timer==10){
                    this.userCombatant.statusEffect('Double Damage',this.effect[0])
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 7:
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                }
                this.userCombatant.runAnimation(1/15,2)
                if(this.timer==15){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    if(this.targetCombatant.life<=0){
                        this.battle.energy.main++
                    }
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 8:
                if(this.timer==1){
                    this.userCombatant.startAnimation(5)
                }
                this.userCombatant.runAnimation(1/10,5)
                if(this.timer==10){
                    this.battle.cardManager.draw(this.effect[0])
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 9:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                    if(this.targetClass==2){
                        this.targetCombatant.goal.anim.direction=this.direction
                    }
                }
                this.userCombatant.moveTile(this.direction,this.distance/(15*distTargetCombatant(0,this,this.targetTile)))
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*distTargetCombatant(0,this,this.targetTile)))
                this.userCombatant.runAnimation(1/15,0)
                if(this.targetClass==2){
                    this.targetCombatant.moveTile(this.direction,-this.distance/(15*distTargetCombatant(0,this,this.targetTile)))
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/(15*distTargetCombatant(0,this,this.targetTile)))
                }
                if(this.timer>=15*distTargetCombatant(0,this,this.targetTile)){
                    this.userCombatant.tilePosition.x=this.targetTile.tilePosition.x
                    this.userCombatant.tilePosition.y=this.targetTile.tilePosition.y
                    if(this.targetClass==2){
                        this.targetCombatant.tilePosition.x=this.tilePosition.x
                        this.targetCombatant.tilePosition.y=this.tilePosition.y
                    }
                    this.battle.combatantManager.activateCombatants(1,this.userCombatant.id)
                    this.remove=true
                }
            break
            case 10:
                if(this.timer==1){
                    this.userCombatant.startAnimation(6)
                }
                this.userCombatant.runAnimation(1/10,6)
                if(this.timer==10){
                    this.userCombatant.heal(this.effect[0])
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 11:   
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==11){
                    this.userCombatant.startAnimation(3)
                }
                if(this.timer<=10){
                    this.userCombatant.runAnimation(1/10,0)
                }else if(this.timer<=30){
                    this.userCombatant.runAnimation(1/10,3)
                }
                if(this.timer==10){
                    this.targetCombatant.goal.anim.direction=this.direction+180
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }
                if(this.timer<=10){
                    this.userCombatant.moveTile(this.direction,this.distance/30)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/30)
                }else if(this.timer>20&&this.timer<=30){
                    this.userCombatant.moveTile(this.direction,-this.distance/30)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/30)
                    this.targetCombatant.moveTile(this.direction,-this.distance/20)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/20)
                }
                if(this.timer>=30){
                    this.targetCombatant.tilePosition.x=round(this.targetCombatant.tilePosition.x/2+this.userCombatant.tilePosition.x/2)
                    this.targetCombatant.tilePosition.y=round(this.targetCombatant.tilePosition.y/2+this.userCombatant.tilePosition.y/2)
                    this.battle.combatantManager.activateCombatants(1,this.targetCombatant.id)
                    this.remove=true
                }
            break
            default:
                this.remove=true
            break
        }
    }
}