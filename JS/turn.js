class turn{
    constructor(action,battle,type,effect,user){
        this.action=action
        this.battle=battle
        this.type=type
        this.effect=effect
        this.user=user
        this.attackClass=types.attack[this.type].class

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
                    if(this.attackClass==2||this.attackClass==4){
                        this.userCombatant.moved=true
                    }else{
                        switch(this.type){
                            case 1: case 2: case 3: case 11:
                                this.target=[this.battle.combatantManager.getCombatantIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1])]
                            break
                            case 6: case 7: case 8:
                                this.target=[
                                    this.battle.combatantManager.getCombatantIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]),
                                    this.battle.combatantManager.getCombatantIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*2)
                                ]
                            break
                            case 9:
                                this.target=[
                                    this.battle.combatantManager.getCombatantIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]),
                                    this.battle.combatantManager.getCombatantIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]),
                                    this.battle.combatantManager.getCombatantIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1])
                                ]
                            break
                        }
                        if(this.target.length<=1){
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
                        }else if(this.type==9){
                            this.targetCombatant=[]
                            this.direction=[]
                            this.distance=[]
                            this.relativeDirection=[]
                            this.relativeDistance=[]
                            this.targetDistance=[]
                            for(let a=0,la=this.target.length;a<la;a++){
                                if(this.target[a]==-1){
                                    this.userCombatant.moved=true
                                }else{
                                    let targetCombatant=this.battle.combatantManager.combatants[this.target[a]]
                                    this.targetCombatant.push(targetCombatant)

                                    this.direction.push(atan2(targetCombatant.position.x-this.position.x,targetCombatant.position.y-this.position.y))
                                    this.distance.push(sqrt((targetCombatant.position.x-this.position.x)**2+(targetCombatant.position.y-this.position.y)**2))

                                    this.relativeDirection.push(atan2(targetCombatant.relativePosition.x-this.relativePosition.x,targetCombatant.relativePosition.y-this.relativePosition.y))
                                    this.relativeDistance.push(sqrt((targetCombatant.relativePosition.x-this.relativePosition.x)**2+(targetCombatant.relativePosition.y-this.relativePosition.y)**2))

                                    this.targetDistance.push(distTargetCombatant(0,this.userCombatant,targetCombatant))
                                }
                            }
                            if(this.targetCombatant.length==0){
                                this.remove=true
                            }
                        }else{
                            this.targetCombatant=-1
                            for(let a=0,la=this.target.length;a<la;a++){
                                if(this.target[a]==-1){
                                    this.userCombatant.moved=true
                                }else{
                                    this.targetCombatant=this.battle.combatantManager.combatants[this.target[a]]

                                    this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                                    this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)

                                    this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                                    this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)

                                    this.targetDistance=distTargetCombatant(0,this.userCombatant,this.targetCombatant)
                                    break
                                }
                            }
                            if(this.targetCombatant==-1){
                                this.remove=true
                            }
                        }
                    }
                break
                case 1:
                    switch(this.type){
                        case 0:
                            this.target=[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)]
                            this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]

                            this.direction=round(atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)/60-random(0.4,0.6))*60+30

                            this.target=[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.direction)[1])]
                            if(this.target[0]==-1){
                                this.remove=true
                            }else{
                                this.targetTile=this.battle.tileManager.tiles[this.target[0]]
                                if(this.targetTile.occupied>0){
                                    this.direction+=(floor(random(0,2))*2-1)*60
                                    this.target=[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.direction)[1])]
                                    if(this.target[0]==-1){
                                        this.remove=true
                                    }else{
                                        this.targetTile=this.battle.tileManager.tiles[this.target[0]]
                                        if(this.targetTile.occupied>0){
                                            this.remove=true
                                        }
    
                                        this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                                        this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)
    
                                        this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                                        this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                                    }
                                }else{
                                    if(this.targetTile.occupied>0){
                                        this.remove=true
                                    }

                                    this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                                    this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                                    this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                                    this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                                }
                                if(!this.remove){
                                    this.userCombatant.goal.anim.direction=this.relativeDirection
                                }
                            }
                        break
                    }
                break
                case 2:
                    this.target=[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)]
                    this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                    this.userCombatant.goal.anim.direction=round(atan2(this.targetCombatant.relativePosition.x-this.userCombatant.relativePosition.x,this.targetCombatant.relativePosition.y-this.userCombatant.relativePosition.y)/60-1/2)*60+30
                    let target=this.userCombatant.getTarget()
                    if(target>=0&&!(this.battle.tileManager.tiles[target].tilePosition.x==this.targetCombatant.tilePosition.x&&this.battle.tileManager.tiles[target].tilePosition.y==this.targetCombatant.tilePosition.y)&&this.battle.tileManager.tiles[target].occupied>0&&floor(random(0,2)==0)){
                        let remember=this.userCombatant.goal.anim.direction
                        this.userCombatant.goal.anim.direction+=(floor(random(0,2))*2-1)*60
                        if(!(this.battle.tileManager.tiles[target].tilePosition.x==this.targetCombatant.tilePosition.x&&this.battle.tileManager.tiles[target].tilePosition.y==this.targetCombatant.tilePosition.y)&&this.battle.tileManager.tiles[target].occupied>0){
                            this.userCombatant.goal.anim.direction=remember
                        }else{
                            this.battle.activateCombatant(1,this.userCombatant.id)
                        }
                    }else{
                        this.battle.activateCombatant(1,this.userCombatant.id)
                    }
                    this.remove=true
                break
                case 3:
                    this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                    this.userCombatant.goal.anim.direction=round(atan2(this.targetCombatant.relativePosition.x-this.userCombatant.relativePosition.x,this.targetCombatant.relativePosition.y-this.userCombatant.relativePosition.y)/60-1/2)*60+30
                    this.remove=true
                break
                default:
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
                            this.remove=true
                        }
                    break
                    case 3:
                        if(this.timer==1){
                            let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                            this.procedure[0]=this.targetCombatant.status.main[2]>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                            this.userCombatant.startAnimation(3)
                        }else if(this.timer==10){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }
                        if(this.timer<=20){
                            this.userCombatant.runAnimation(1/10,3)
                        }
                        if(this.procedure[0]==2){
                            if(this.timer>10&&this.timer<=18){
                                this.targetCombatant.moveTile(this.direction,this.distance/40)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                            }else if(this.timer>18&&this.timer<=26){
                                this.targetCombatant.moveTile(this.direction,-this.distance/40)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                            }
                            if(this.timer>=26){
                                this.remove=true
                            }
                        }else if(this.procedure[0]==1){
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
                                this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                                this.battle.activate(1,this.targetCombatant.id)
                                this.remove=true
                            }
                        }
                    break
                    case 4: case 10:
                        if(this.timer==1){
                            this.userCombatant.startAnimation(1)
                        }
                        this.userCombatant.runAnimation(1/30,1)
                        if(this.timer==15){
                            if(this.type==10){
                                this.battle.combatantManager.allEffect(6,[this.effect[0]])
                            }else{
                                this.userCombatant.addBlock(this.effect[0])
                            }
                        }else if(this.timer>=30){
                            this.remove=true
                        }
                    break
                    case 5:
                        if(this.timer==1){
                            this.userCombatant.startAnimation(3)
                        }
                        this.userCombatant.runAnimation(1/15,3)
                        if(this.timer>=15){
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.battle.drop(findName('Dazed',types.card),0,game.playerNumber+1)
                            }
                            this.remove=true
                        }
                    break
                    case 6: case 8:
                        if(this.targetDistance==1){
                            if(this.timer==1){
                                this.userCombatant.startAnimation(2)
                            }
                            this.userCombatant.runAnimation(1/30,2)
                            if(this.timer==15){
                                if(this.type==8){
                                    for(let a=0,la=this.effect[0];a<la;a++){
                                        this.battle.drop(findName('Burn',types.card),0,game.playerNumber+1)
                                    }
                                }else{
                                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                                }
                            }else if(this.timer>=30){
                                this.remove=true
                            }
                        }else if(this.targetDistance==2){
                            if(this.timer==1){
                                this.userCombatant.startAnimation(0)
                            }else if(this.timer==16){
                                this.userCombatant.startAnimation(2)
                            }
                            if(this.timer<=15){
                                this.userCombatant.runAnimation(1/15,0)
                            }else if(this.timer<=45){
                                this.userCombatant.runAnimation(1/30,2)
                            }
                            if(this.timer<=15){
                                this.userCombatant.moveTile(this.direction,this.distance/30)
                                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/30)
                            }
                            if(this.timer==15){
                                this.userCombatant.moveTilePosition(this.userCombatant.tilePosition.x/2+this.targetCombatant.tilePosition.x/2,this.userCombatant.tilePosition.y/2+this.targetCombatant.tilePosition.y/2)
                            }else if(this.timer==30){
                                if(this.type==8){
                                    for(let a=0,la=this.effect[0];a<la;a++){
                                        this.battle.drop(findName('Burn',types.card),0,game.playerNumber+1)
                                    }
                                }else{
                                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                                }
                                this.battle.activate(1,this.userCombatant.id)
                            }else if(this.timer>=45){
                                this.remove=true
                            }
                        }
                    break
                    case 7:
                        if(this.targetDistance==1){
                            if(this.timer==1){
                                let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                                this.procedure[0]=this.targetCombatant.status.main[2]>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                                this.userCombatant.startAnimation(3)
                            }else if(this.timer==10){
                                this.targetCombatant.takeDamage(this.effect[0],this.user)
                            }
                            if(this.timer<=20){
                                this.userCombatant.runAnimation(1/10,3)
                            }
                            if(this.procedure[0]==2){
                                if(this.timer>10&&this.timer<=18){
                                    this.targetCombatant.moveTile(this.direction,this.distance/40)
                                    this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                                }else if(this.timer>18&&this.timer<=26){
                                    this.targetCombatant.moveTile(this.direction,-this.distance/40)
                                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                                }
                                if(this.timer>=26){
                                    this.remove=true
                                }
                            }else if(this.procedure[0]==1){
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
                                    this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                                    this.battle.activate(1,this.targetCombatant.id)
                                    this.remove=true
                                }
                            }
                        }else if(this.targetDistance==2){
                            if(this.timer==1){
                                this.userCombatant.startAnimation(0)
                                let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                                this.procedure[0]=this.targetCombatant.status.main[2]>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                            }else if(this.timer==16){
                                this.userCombatant.startAnimation(3)
                            }else if(this.timer==25){
                                this.targetCombatant.takeDamage(this.effect[0],this.user)
                            }
                            if(this.timer<=15){
                                this.userCombatant.runAnimation(1/15,0)
                            }else if(this.timer<=35){
                                this.userCombatant.runAnimation(1/10,3)
                            }
                            if(this.timer<=15){
                                this.userCombatant.moveTile(this.direction,this.distance/30)
                                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/30)
                            }
                            if(this.timer==15){
                                this.userCombatant.moveTilePosition(this.userCombatant.tilePosition.x/2+this.targetCombatant.tilePosition.x/2,this.userCombatant.tilePosition.y/2+this.targetCombatant.tilePosition.y/2)
                            }
                            if(this.procedure[0]==2){
                                if(this.timer>25&&this.timer<=33){
                                    this.targetCombatant.moveTile(this.direction,this.distance/80)
                                    this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/80)
                                }else if(this.timer>33&&this.timer<=41){
                                    this.targetCombatant.moveTile(this.direction,-this.distance/80)
                                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/80)
                                }
                                if(this.timer>=41){
                                    this.remove=true
                                }
                            }else if(this.procedure[0]==1){
                                if(this.timer>25&&this.timer<=33){
                                    this.targetCombatant.moveTile(this.direction,this.distance/20)
                                    this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/20)
                                }else if(this.timer>33&&this.timer<=41){
                                    this.targetCombatant.moveTile(this.direction,-this.distance/20)
                                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/20)
                                }
                                if(this.timer==33){
                                    this.targetCombatant.takeDamage(constants.collisionDamage,-1)
                                    let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                                    if(index>=0){
                                        this.battle.combatantManager.combatants[index].takeDamage(constants.collisionDamage,-1)
                                    }
                                }else if(this.timer>=41){
                                    this.remove=true
                                }
                            }else{
                                if(this.timer>25){
                                    this.targetCombatant.moveTile(this.direction,this.distance/20)
                                    this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/20)
                                }
                                if(this.timer>=35){
                                    this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                                    this.battle.activate(1,this.targetCombatant.id)
                                    this.remove=true
                                }
                            }
                        }
                    break
                    case 9:
                        if(this.timer==1){
                            this.userCombatant.startAnimation(4)
                        }
                        this.userCombatant.runAnimation(1/30,4)
                        if(this.timer==15){
                            this.targetCombatant.forEach(targetCombatant=>targetCombatant.takeDamage(this.effect[0],this.user))
                        }else if(this.timer>=30){
                            this.remove=true
                        }
                    break
                    case 11:
                        if(this.timer==1){
                            this.userCombatant.startAnimation(2)
                        }
                        this.userCombatant.runAnimation(1/10,2)
                        if(this.timer==10||this.timer==15||this.timer==20||this.timer==25||this.timer==30){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }else if(this.timer>=40){
                            this.remove=true
                        }
                    break
                }
                if(this.remove){
                    this.userCombatant.moved=true
                    switch(this.attackClass){
                        case 1:
                            if(this.userCombatant.status.main[0]>0){
                                this.userCombatant.status.main[0]--
                            }
                        break
                    }
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
                            this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                            this.battle.activateTile(1,this.userCombatant.id)
                            this.remove=true
                        }
                    break
                }
            break
        }
    }
}