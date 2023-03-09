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

        switch(this.type){
            case 1:
                this.direction=atan2(this.battle.combatantManager.combatants[this.target].position.x-this.position.x,this.battle.combatantManager.combatants[this.target].position.y-this.position.y)
                this.distance=sqrt((this.battle.combatantManager.combatants[this.target].position.x-this.position.x)**2+(this.battle.combatantManager.combatants[this.target].position.y-this.position.y)**2)

                this.relativeDirection=atan2(this.battle.combatantManager.combatants[this.target].relativePosition.x-this.relativePosition.x,this.battle.combatantManager.combatants[this.target].relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.battle.combatantManager.combatants[this.target].relativePosition.x-this.relativePosition.x)**2+(this.battle.combatantManager.combatants[this.target].relativePosition.y-this.relativePosition.y)**2)
            break
            case 3:
                this.direction=atan2(this.battle.tileManager.tiles[this.target].position.x-this.position.x,this.battle.tileManager.tiles[this.target].position.y-this.position.y)
                this.distance=sqrt((this.battle.tileManager.tiles[this.target].position.x-this.position.x)**2+(this.battle.tileManager.tiles[this.target].position.y-this.position.y)**2)

                this.relativeDirection=atan2(this.battle.tileManager.tiles[this.target].relativePosition.x-this.relativePosition.x,this.battle.tileManager.tiles[this.target].relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.battle.tileManager.tiles[this.target].relativePosition.x-this.relativePosition.x)**2+(this.battle.tileManager.tiles[this.target].relativePosition.y-this.relativePosition.y)**2)
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
                        this.battle.combatantManager.combatants[this.target[0]].takeDamage(this.effect[0])
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                }else if(this.targetDistance==2){
                    if(this.timer<=10){
                        this.battle.combatantManager.combatants[this.user].moveTile(this.direction,this.distance/30)
                        this.battle.combatantManager.combatants[this.user].moveRelativeTile(this.relativeDirection,this.relativeDistance/30)
                    }
                    if(this.timer>20){
                        this.battle.combatantManager.combatants[this.user].moveTile(this.direction,-this.distance/30)
                        this.battle.combatantManager.combatants[this.user].moveRelativeTile(this.relativeDirection,-this.relativeDistance/30)
                    }
                    if(this.timer==15){
                        this.battle.combatantManager.combatants[this.target[0]].takeDamage(this.effect[0])
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                }
            break
            case 2:
                if(this.timer==15){
                    this.battle.combatantManager.combatants[this.user].addBlock(this.effect[0])
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 3:
                this.battle.combatantManager.combatants[this.user].moveTile(this.direction,this.distance/30)
                this.battle.combatantManager.combatants[this.user].moveRelativeTile(this.relativeDirection,this.relativeDistance/30)
                if(this.timer>=30){
                    this.battle.combatantManager.combatants[this.user].tilePosition.x=this.battle.tileManager.tiles[this.target].tilePosition.x
                    this.battle.combatantManager.combatants[this.user].tilePosition.y=this.battle.tileManager.tiles[this.target].tilePosition.y
                    this.remove=true
                }
            break
            case 4:
                if(this.timer==10||this.timer==20){
                    this.battle.combatantManager.combatants[this.target[0]].takeDamage(this.effect[0])
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
        }
    }
}