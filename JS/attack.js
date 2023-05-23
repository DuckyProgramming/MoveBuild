class attack{
    constructor(type,battle,player,effect,attackClass,user,energy,target,targetDistance,targetClass){
        this.type=type
        this.battle=battle
        this.player=player
        this.effect=effect
        this.attackClass=attackClass
        this.user=user
        this.energy=energy
        this.target=target
        this.targetDistance=targetDistance
        this.targetClass=targetClass

        this.procedure=[]

        this.userCombatant=this.battle.combatantManager.combatants[this.user]
        
        this.position={x:this.userCombatant.position.x,y:this.userCombatant.position.y}
        this.relativePosition={x:this.userCombatant.relativePosition.x,y:this.userCombatant.relativePosition.y}
        this.tilePosition={x:this.userCombatant.tilePosition.x,y:this.userCombatant.tilePosition.y}

        this.clearAttack=false
        switch(this.attackClass){
            case 1:
                if(this.userCombatant.status.main[0]>0){
                    this.clearAttack=true
                }
            break
        }
        switch(this.type){
            case 1: case 4: case 5: case 7: case 11: case 12: case 15: case 16: case 17: case 19:
            case 21: case 24: case 25: case 27: case 32: case 33: case 34: case 35: case 36: case 37:
            case 38: case 39: case 42: case 46: case 47: case 48: case 49: case 53: case 57: case 61:
            case 66: case 67: case 68: case 75: case 77: case 79: case 80: case 81: case 83: case 84:
            case 85: case 86: case 88: case 89: case 90: case 94: case 100: case 101: case 102: case 103:
            case 104: case 105:
                this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]

                this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)

                this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
            break
            case 3: case 14: case 20: case 51: case 52: case 54: case 56: case 58: case 59: case 60:
            case 82: case 83: case 87: case 91:
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
            case 31:
                this.targetCombatant=this.battle.combatantManager.getArea(this.userCombatant.team,this.userCombatant.tilePosition,1)
                this.direction=[]
                this.distance=[]
                this.relativeDirection=[]
                this.relativeDistance=[]

                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    this.direction.push(atan2(this.targetCombatant[a].position.x-this.position.x,this.targetCombatant[a].position.y-this.position.y))
                    this.distance.push(sqrt((this.targetCombatant[a].position.x-this.position.x)**2+(this.targetCombatant[a].position.y-this.position.y)**2))

                    this.relativeDirection.push(atan2(this.targetCombatant[a].relativePosition.x-this.relativePosition.x,this.targetCombatant[a].relativePosition.y-this.relativePosition.y))
                    this.relativeDistance.push(sqrt((this.targetCombatant[a].relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant[a].relativePosition.y-this.relativePosition.y)**2))
                }
            break
            case 87:
                this.targetCombatant=this.battle.combatantManager.getArea(this.userCombatant.team,this.userCombatant.tilePosition,2)
                this.direction=[]
                this.distance=[]
                this.relativeDirection=[]
                this.relativeDistance=[]
                this.targetDistance=[]

                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    this.direction.push(atan2(this.targetCombatant[a].position.x-this.position.x,this.targetCombatant[a].position.y-this.position.y))
                    this.distance.push(sqrt((this.targetCombatant[a].position.x-this.position.x)**2+(this.targetCombatant[a].position.y-this.position.y)**2))

                    this.relativeDirection.push(atan2(this.targetCombatant[a].relativePosition.x-this.relativePosition.x,this.targetCombatant[a].relativePosition.y-this.relativePosition.y))
                    this.relativeDistance.push(sqrt((this.targetCombatant[a].relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant[a].relativePosition.y-this.relativePosition.y)**2))

                    this.targetDistance.push(distTargetCombatant(0,this.targetCombatant[a],this.userCombatant))
                }
            break
        }

        this.timer=0
        this.remove=false
    }
    selfCall(type){
        switch(type){
            case 0:
                if(this.type==35&&this.targetCombatant.life==this.targetCombatant.base.life){
                    this.battle.energy.main[this.player]++
                }
                if(this.type==46&&this.targetCombatant.status.main[5]>0||this.type==101&&this.battle.counter.turnPlayed[this.player]<=1){
                    this.targetCombatant.takeDamage(this.effect[0]*2,this.user)
                }else if(this.type==12){
                    this.targetCombatant.takeDamage(this.effect[0]*this.energy,this.user)
                }else if(this.type==88){
                    this.targetCombatant.takeDamage(this.effect[0]*this.energy*this.energy,this.user)
                }else if(this.type==89){
                    this.targetCombatant.block=0
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }else{
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }
                switch(this.type){
                    case 7:
                        if(this.targetCombatant.life<=0){
                            this.battle.energy.main[this.player]++
                        }
                    break
                    case 34:
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[1])
                    break
                    case 42:
                        this.battle.cardManagers[this.player].draw(this.effect[1])
                    break
                    case 53:
                        this.userCombatant.statusEffect('Dodge',this.effect[1])
                    break
                    case 90:
                        this.userCombatant.statusEffect('Single Damage',this.effect[1])
                    break
                    case 94:
                        this.battle.cardManagers[this.player].hand.exhaust(this.effect[1])
                    break
                    case 103:
                        this.userCombatant.statusEffect('Temporary Draw',-this.effect[1])
                    break
                    case 105:
                        if(this.targetCombatant.life<=0){
                            this.battle.energy.main[this.player]--
                        }
                    break
                }
            break
        }
    }
    update(){
        this.timer++
        switch(this.type){
            case 1: case 7: case 12: case 34: case 35: case 42: case 46: case 53: case 88: case 89:
            case 90: case 94: case 101: case 103: case 105:
                if(this.targetDistance==1){
                    if(this.timer==1){
                        this.userCombatant.startAnimation(2)
                    }
                    this.userCombatant.runAnimation(1/30,2)
                    if(this.timer==15){
                        this.selfCall(0)
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                }else if(this.targetDistance==2){
                    if(this.timer==1||this.timer==31){
                        this.userCombatant.startAnimation(0)
                    }else if(this.timer==11){
                        this.userCombatant.startAnimation(2)
                    }
                    if(this.timer<=10||this.timer>30){
                        this.userCombatant.runAnimation(1/10,0)
                    }else if(this.timer>10&&this.timer<=30){
                        this.userCombatant.runAnimation(1/20,2)
                    }
                    if(this.timer<=10){
                        this.userCombatant.moveTile(this.direction,this.distance/30)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/30)
                    }else if(this.timer>30){
                        this.userCombatant.moveTile(this.direction,-this.distance/30)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/30)
                    }
                    if(this.timer==20){
                        this.selfCall(0)
                    }else if(this.timer>=40){
                        this.remove=true
                    }
                }
            break
            case 2: case 23: case 26: case 43: case 50: case 65: case 95: case 96: case 97:
                if(this.timer==1){
                    this.userCombatant.startAnimation(1)
                }
                this.userCombatant.runAnimation(1/30,1)
                if(this.timer==15){
                    this.userCombatant.addBlock(this.effect[0])
                    switch(this.type){
                        case 23:
                            this.userCombatant.statusEffect('Counter',this.effect[1])
                        break
                        case 26:
                            this.userCombatant.statusEffect('Cannot be Pushed',1)
                        break
                        case 43:
                            this.battle.cardManagers[this.player].draw(this.effect[1])
                        break
                        case 50:
                            this.userCombatant.statusEffect('Retain Block',this.effect[1])
                        break
                        case 65:
                            this.userCombatant.statusEffect('Cannot Gain Block',this.effect[1])
                        break
                        case 95:
                            this.battle.cardManagers[this.player].hand.exhaust(this.effect[1])
                        break
                        case 96:
                            this.userCombatant.statusEffect('Counter Push',1)
                        break
                        case 97:
                            this.userCombatant.statusEffect('Counter Bleed',this.effect[1])
                        break
                    }
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 3: case 20: case 51: case 52: case 56: case 58: case 59: case 60: case 91:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }
                this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                this.userCombatant.runAnimation(1/15,0)
                if(this.timer==10*this.targetDistance){
                    switch(this.type){
                        case 20:
                            this.battle.cardManagers[this.player].randomEffect(2,0,[])
                        break
                        case 51:
                            this.userCombatant.statusEffect('Dodge',this.effect[1])
                        break
                        case 58:
                            this.battle.cardManagers[this.player].hand.add(findName('Stagger',types.card),0,0)
                        break
                        case 59:
                            this.userCombatant.block=0
                        break
                        case 91:
                            this.userCombatant.addBlock(this.effect[1])
                        break
                    }
                }
                if(this.timer>=15*this.targetDistance){
                    this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                    this.remove=true
                }
            break
            case 4:
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                }
                if(this.timer>10&&this.timer<=20||this.timer>25&&this.timer<=35){
                    this.userCombatant.runAnimation(1/20,2)
                }
                if(this.timer==15||this.timer==30){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }else if(this.timer>=45){
                    this.remove=true
                }
            break
            case 5:
                if(this.targetDistance==1){
                    if(this.timer==1){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[0]=this.targetCombatant.status.main[2]>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.userCombatant.startAnimation(3)
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
                    }else if(this.timer==11){
                        this.userCombatant.startAnimation(3)
                    }else if(this.timer==20){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }else if(this.timer==31){
                        this.userCombatant.startAnimation(0)
                    }
                    if(this.timer<=10){
                        this.userCombatant.runAnimation(1/10,0)
                    }else if(this.timer<=30){
                        this.userCombatant.runAnimation(1/10,3)
                    }else{
                        this.userCombatant.runAnimation(1/10,0)
                    }
                    if(this.timer<=10){
                        this.userCombatant.moveTile(this.direction,this.distance/30)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/30)
                    }else if(this.timer>30){
                        this.userCombatant.moveTile(this.direction,-this.distance/30)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/30)
                    }
                    if(this.procedure[0]==2){
                        if(this.timer>20&&this.timer<=28){
                            this.targetCombatant.moveTile(this.direction,this.distance/80)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/80)
                        }else if(this.timer>28&&this.timer<=36){
                            this.targetCombatant.moveTile(this.direction,-this.distance/80)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/80)
                        }
                    }else if(this.procedure[0]==1){
                        if(this.timer>20&&this.timer<=28){
                            this.targetCombatant.moveTile(this.direction,this.distance/20)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/20)
                        }else if(this.timer>28&&this.timer<=36){
                            this.targetCombatant.moveTile(this.direction,-this.distance/20)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/20)
                        }
                        if(this.timer==28){
                            this.targetCombatant.takeDamage(constants.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(constants.collisionDamage,-1)
                            }
                        }
                    }else{
                        if(this.timer>20&&this.timer<=30){
                            this.targetCombatant.moveTile(this.direction,this.distance/20)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/20)
                        }
                        if(this.timer==30){
                            this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                            this.battle.activate(1,this.targetCombatant.id)
                        }
                    }
                    if(this.timer>=40){
                        this.remove=true
                    }
                }
            break
            case -15: case 6: case 41: case 71: case 92: case 98:
                if(this.timer==1){
                    this.userCombatant.startAnimation(4)
                }
                this.userCombatant.runAnimation(1/10,4)
                if(this.timer==10){
                    switch(this.type){
                        case -15:
                            this.userCombatant.deStatus('Cannot Move',this.effect[0])
                        break
                        case 6:
                            this.userCombatant.statusEffect('Double Damage',this.effect[0])
                        break
                        case 41:
                            this.battle.energy.main[this.player]+=this.effect[0]
                        break
                        case 71:
                            this.battle.overlayManager.overlays[10][this.player].active=true
                            this.battle.overlayManager.overlays[10][this.player].activate([0,3,1])
                        break
                        case 92:
                            this.battle.cardManagers[this.player].deFatigue(this.effect[0])
                        break
                        case 98:
                            this.userCombatant.statusEffect('Temporary Damage Up',this.effect[0])
                        break
                    }
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 8: case 28: case 29: case 40: case 44: case 45: case 55: case 60: case 62: case 63:
            case 69: case 70: case 76: case 78: case 93: case 99:
                if(this.timer==1){
                    this.userCombatant.startAnimation(5)
                }
                this.userCombatant.runAnimation(1/10,5)
                if(this.timer==10){
                    switch(this.type){
                        case 8:
                            this.battle.cardManagers[this.player].draw(this.effect[0])
                        break
                        case 28:
                            this.battle.overlayManager.overlays[7][this.player].active=true
                            this.battle.overlayManager.overlays[7][this.player].activate()
                        break
                        case 29:
                            this.battle.overlayManager.overlays[8][this.player].active=true
                            this.battle.overlayManager.overlays[8][this.player].activate()
                        break
                        case 40:
                            let amount=this.battle.cardManagers[this.player].hand.cards.length
                            this.battle.cardManagers[this.player].allEffect(2,2)
                            this.battle.cardManagers[this.player].draw(amount)
                        break
                        case 44:
                            this.battle.cardManagers[this.player].send(3,1)
                            this.battle.cardManagers[this.player].shuffle(1)
                            this.battle.draw(this.effect[0])
                        break
                        case 45:
                            this.battle.cardManagers[this.player].allEffect(1,4)
                            this.battle.cardManagers[this.player].allEffect(2,3)
                            this.battle.cardManagers[this.player].allEffect(3,4)
                        break
                        case 55:
                            this.battle.cardManagers[this.player].draw(this.effect[0])
                            this.battle.cardManagers[this.player].hand.discard(this.effect[1])
                        break
                        case 62:
                            for(let a=0,la=this.battle.cardManagers[this.player].hand.cards.length;a<la;a++){
                                this.battle.cardManagers[this.player].hand.cards[a].cost=min(this.battle.cardManagers[this.player].hand.cards[a].cost,this.effect[0])
                                if(this.effect[1]>0){
                                    this.battle.cardManagers[this.player].hand.cards[a].base.cost=min(this.battle.cardManagers[this.player].hand.cards[a].base.cost,this.effect[0])
                                }
                            }
                        break
                        case 63:
                            this.battle.cardManagers[this.player].hand.exhaustAny()
                        break
                        case 69:
                            for(let a=0;a<this.effect[0];a++){
                                let index=floor(random(0,this.battle.cardManagers[this.player].listing.card[0][3].length))
                                this.battle.cardManagers[this.player].hand.add(this.battle.cardManagers[this.player].listing.card[0][3][index],0,0)
                            }
                        break
                        case 70:
                            this.battle.cardManagers[this.player].hand.reserve(this.effect[0])
                        break
                        case 76:
                            this.userCombatant.statusEffect('Intangible',this.effect[0])
                        break
                        case 78:
                            this.battle.cardManagers[this.player].randomEffect(2,5,[])
                        break
                        case 93:
                            this.battle.overlayManager.overlays[19][this.player].active=true
                            this.battle.overlayManager.overlays[19][this.player].activate()
                        break
                        case 99:
                            this.userCombatant.statusEffect('Energy Next Turn',this.effect[0])
                        break
                    }
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
                this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                this.userCombatant.runAnimation(1/15,0)
                if(this.targetClass==2){
                    this.targetCombatant.moveTile(this.direction,-this.distance/(15*this.targetDistance))
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/(15*this.targetDistance))
                }
                if(this.timer>=15*this.targetDistance){
                    this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                    if(this.targetClass==2){
                        this.targetCombatant.moveTilePosition(this.tilePosition.x,this.tilePosition.y)
                        this.battle.activate(1,this.targetCombatant.id)
                    }
                    this.remove=true
                }
            break
            case -13: case 10: case 64: case 72: case 73: case 74:
                if(this.timer==1){
                    this.userCombatant.startAnimation(6)
                }
                this.userCombatant.runAnimation(1/10,6)
                if(this.timer==10){
                    switch(this.type){
                        case -13:
                            this.userCombatant.takeDamage(this.effect[0])
                        break
                        case 10:
                            this.userCombatant.heal(this.effect[0])
                        break
                        case 64:
                            this.userCombatant.statusEffect('Control',this.effect[0])
                        break
                        case 72:
                            this.userCombatant.statusEffect('Strength',this.effect[0])
                            this.userCombatant.life-=this.effect[1]
                        break
                        case 73:
                            this.userCombatant.statusEffect('Dexterity',this.effect[0])
                            this.userCombatant.life-=this.effect[1]
                        break
                        case 74:
                            this.userCombatant.statusEffect('Buffer',this.effect[0])
                            this.userCombatant.life-=this.effect[1]
                        break
                    }
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 11:
                if(this.targetDistance==2){
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
                        this.targetCombatant.goal.anim.direction=this.relativeDirection+180
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
                        this.targetCombatant.moveTilePosition(round(this.targetCombatant.tilePosition.x/2+this.userCombatant.tilePosition.x/2),round(this.targetCombatant.tilePosition.y/2+this.userCombatant.tilePosition.y/2))
                        this.battle.activate(1,this.userCombatant.id)
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }else if(this.targetDistance==3){
                    if(this.timer==1){
                        this.userCombatant.startAnimation(0)
                    }else if(this.timer==31){
                        this.userCombatant.startAnimation(3)
                    }
                    if(this.timer<=30){
                        this.userCombatant.runAnimation(1/15,0)
                    }else if(this.timer<=50){
                        this.userCombatant.runAnimation(1/10,3)
                    }
                    if(this.timer==30){
                        this.targetCombatant.goal.anim.direction=this.relativeDirection+180
                    }
                    if(this.timer<=30){
                        this.userCombatant.moveTile(this.direction,this.distance/45)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/45)
                    }else if(this.timer>30&&this.timer<=50){
                        this.userCombatant.moveTile(this.direction,-this.distance/30)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/30)
                        this.targetCombatant.moveTile(this.direction,-this.distance/30)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/30)
                    }
                    if(this.timer>=50){
                        this.targetCombatant.moveTilePosition(round(this.targetCombatant.tilePosition.x/3+this.userCombatant.tilePosition.x*2/3),round(this.targetCombatant.tilePosition.y/3+this.userCombatant.tilePosition.y*2/3))
                        this.battle.activate(1,this.userCombatant.id)
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 13:
                if(this.timer==1){
                    this.userCombatant.startAnimation(1)
                }
                this.userCombatant.runAnimation(1/15,1)
                if(this.timer==15){
                    this.userCombatant.addBlock(this.effect[0]*this.energy)
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 14:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }
                this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                this.userCombatant.runAnimation(1/15,0)
                if(this.timer<=8&&this.targetDistance==2){
                    if(this.timer==1){
                        this.procedure[0]=floor(random(0,2))
                    }
                    let middle=this.battle.combatantManager.getCombatantIndex(this.targetTile.tilePosition.x/2+this.tilePosition.x/2,this.targetTile.tilePosition.y/2+this.tilePosition.y/2)
                    if(middle>=0){
                        this.battle.combatantManager.combatants[middle].moveTile(this.direction+90*(this.procedure[0]*2-1),this.distance/(15*this.targetDistance))
                        this.battle.combatantManager.combatants[middle].moveRelativeTile(this.relativeDirection+90*(this.procedure[0]*2-1),this.relativeDistance/(15*this.targetDistance))
                    }
                }else if(this.timer>22&&this.targetDistance==2){
                    let middle=this.battle.combatantManager.getCombatantIndex(this.targetTile.tilePosition.x/2+this.tilePosition.x/2,this.targetTile.tilePosition.y/2+this.tilePosition.y/2)
                    if(middle>=0){
                        this.battle.combatantManager.combatants[middle].moveTile(this.direction-90*(this.procedure[0]*2-1),this.distance/(15*this.targetDistance))
                        this.battle.combatantManager.combatants[middle].moveRelativeTile(this.relativeDirection-90*(this.procedure[0]*2-1),this.relativeDistance/(15*this.targetDistance))
                    }
                }
                if(this.timer>=15*this.targetDistance){
                    this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                    this.remove=true
                }
            break
            case 15:
                if(this.timer==1){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.status.main[2]>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(8)
                }else if(this.timer==10){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }
                if(this.timer<=10){
                    this.userCombatant.runAnimation(1/10,8)
                }
                if(this.procedure[0]==2){
                    if(this.timer>10&&this.timer<=18){
                        this.userCombatant.moveTile(this.direction,this.distance/40)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                        this.targetCombatant.moveTile(this.direction,this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                    }else if(this.timer>18&&this.timer<=26){
                        this.userCombatant.moveTile(this.direction,-this.distance/40)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                        this.targetCombatant.moveTile(this.direction,-this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                    }
                    if(this.timer>=26){
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>10&&this.timer<=18){
                        this.userCombatant.moveTile(this.direction,this.distance/10)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                        this.targetCombatant.moveTile(this.direction,this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }else if(this.timer>18&&this.timer<=26){
                        this.userCombatant.moveTile(this.direction,-this.distance/10)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
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
                        this.userCombatant.moveTile(this.direction,this.distance/10)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                        this.targetCombatant.moveTile(this.direction,this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }
                    if(this.timer>=20){
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x/2+this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y/2+this.userCombatant.tilePosition.y/2)
                        this.battle.activate(1,this.userCombatant.id)
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 16:
                if(this.timer==1){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.status.main[2]>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(9)
                }else if(this.timer==10){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }
                if(this.timer<=20){
                    this.userCombatant.runAnimation(1/10,9)
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
            case 17:
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                    let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x*2-this.targetCombatant.tilePosition.x,this.userCombatant.tilePosition.y*2-this.targetCombatant.tilePosition.y)
                    this.procedure[0]=index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/30,2)
                }
                if(this.timer==15){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }
                if(this.procedure[0]==1&&this.timer>=30){
                    this.remove=true
                }else if(this.procedure[0]==0){
                    if(this.timer>30){
                        this.userCombatant.runAnimation(1/10,0)
                        this.userCombatant.moveTile(this.direction,-this.distance/10)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                    }
                    if(this.timer>=40){
                        this.userCombatant.moveTilePosition(this.userCombatant.tilePosition.x*2-this.targetCombatant.tilePosition.x,this.userCombatant.tilePosition.y*2-this.targetCombatant.tilePosition.y)
                        this.battle.activate(1,this.userCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 18:
                if(this.timer==1){
                    this.userCombatant.startAnimation(10)
                }
                this.userCombatant.runAnimation(1/10,10)
                if(this.timer==10){
                    this.battle.combatantManager.damageArea(this.effect[0],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 19:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                    let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x*2-this.targetCombatant.tilePosition.x,this.userCombatant.tilePosition.y*2-this.targetCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.status.main[2]>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                }
                if(this.timer<=15){
                    this.userCombatant.moveTile(this.direction,this.distance/(15))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15))
                    this.userCombatant.runAnimation(1/15,0)
                    this.targetCombatant.moveTile(this.direction,-this.distance/(15))
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/(15))
                }
                if(this.timer==15){
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)
                    this.targetCombatant.moveTilePosition(this.tilePosition.x,this.tilePosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer==23){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }
                if(this.timer>15&&this.timer<=23){
                    this.userCombatant.moveTile(this.direction,-this.distance/10)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                }else if(this.timer>23&&this.timer<=31){
                    this.userCombatant.moveTile(this.direction,this.distance/10)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                }
                if(this.procedure[0]==2){
                    if(this.timer>31){
                        this.targetCombatant.moveTile(this.direction,this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                    }else if(this.timer>23){
                        this.targetCombatant.moveTile(this.direction,-this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                    }
                    if(this.timer>=39){
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>31){
                        this.targetCombatant.moveTile(this.direction,this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }else if(this.timer>23){
                        this.targetCombatant.moveTile(this.direction,-this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                    }
                    if(this.timer==31){
                        this.targetCombatant.takeDamage(constants.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(constants.collisionDamage,-1)
                        }
                    }else if(this.timer>=39){
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }else{
                    if(this.timer>23){
                        this.targetCombatant.moveTile(this.direction,-this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                    }
                    if(this.timer>=33){
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 21:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }
                this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                this.userCombatant.runAnimation(1/15,0)
                if(this.timer>=15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                    this.battle.activate(1,this.userCombatant.id)
                    this.remove=true
                }
            break
            case 22:
                if(this.timer==1){
                    this.userCombatant.startAnimation(11)
                }
                this.userCombatant.runAnimation(1/10,11)
                if(this.timer==10){
                    this.battle.energy.main[this.player]+=this.effect[0]
                    this.userCombatant.takeDamage(this.effect[1],-1,1)
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 24:
                if(this.timer==1){
                    this.userCombatant.startAnimation(12)
                }
                this.userCombatant.runAnimation(1/10,12)
                if(this.timer==10){
                    this.battle.turnManager.loadEnemyAttack(this.targetCombatant.id)
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 25:
                if(this.timer==1||this.timer==29){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==9){
                    this.userCombatant.startAnimation(13)
                }
                if(this.timer<=8||this.timer>28){
                    this.userCombatant.runAnimation(1/8,0)
                }else if(this.timer>10&&this.timer<=28){
                    this.userCombatant.runAnimation(1/20,13)
                }
                if(this.timer<=8){
                    this.userCombatant.moveTile(this.direction,this.distance/30)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/30)
                }else if(this.timer>28){
                    this.userCombatant.moveTile(this.direction,-this.distance/30)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/30)
                }
                if(this.timer==18){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }else if(this.timer>=36){
                    this.remove=true
                }
            break
            case 27:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    this.userCombatant.startAnimation(2)
                }
                if(this.timer>=15*this.targetDistance-14){
                    this.userCombatant.runAnimation(1/30,2)
                }else{
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                }else if(this.timer==15*this.targetDistance){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }else if(this.timer>=15*this.targetDistance+15){
                    this.battle.activate(1,this.userCombatant.id)
                    this.remove=true
                }
            break
            case 30:
                if(this.timer==1){
                    this.userCombatant.startAnimation(4)
                }
                this.userCombatant.runAnimation(1/10,4)
                if(this.timer==10){
                    this.userCombatant.statusEffect('Dodge',this.effect[0])
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 31:
                if(this.timer==1){
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[a]=this.targetCombatant[a].status.main[2]>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    }
                    this.userCombatant.startAnimation(14)
                }
                if(this.timer<=15){
                    this.userCombatant.runAnimation(1/15,14)
                }
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    if(this.procedure[a]==2){
                        if(this.timer>10&&this.timer<=18){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/40)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/40)
                        }else if(this.timer>18&&this.timer<=26){
                            this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/40)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/40)
                        }
                    }else if(this.procedure[a]==1){
                        if(this.timer>10&&this.timer<=18){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10)
                        }else if(this.timer>18&&this.timer<=26){
                            this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/10)
                        }
                        if(this.timer==18){
                            this.targetCombatant[a].takeDamage(constants.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(constants.collisionDamage,-1)
                            }
                        }
                    }else if(this.procedure[a]==0){
                        if(this.timer>10){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10)
                        }
                        if(this.timer>=20){
                            this.targetCombatant[a].moveTilePosition(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                            this.battle.activate(1,this.targetCombatant[a].id)
                            this.procedure[a]=-1
                        }
                    }
                }
                if(this.timer>=26){
                    this.remove=true
                }
            break
            case 32:
                if(this.timer==1){
                    this.userCombatant.startAnimation(15)
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/15,15)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,1,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),5*this.targetDistance-2]))
                }else if(this.timer==10*this.targetDistance+15){
                    this.targetCombatant.takeDamage(this.effect[0],this.user,1)
                }else if(this.timer>=10*this.targetDistance+25){
                    this.remove=true
                }
            break
            case 33:
                if(this.targetDistance==1){
                    if(this.timer==1){
                        this.userCombatant.startAnimation(2)
                    }
                    this.userCombatant.runAnimation(1/30,2)
                    if(this.timer==15){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
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
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.activate(1,this.userCombatant.id)
                    }else if(this.timer>=45){
                        this.remove=true
                    }
                }
            break
            case 36: case 39: case 47:
                if(this.timer==1){
                    this.userCombatant.startAnimation(16)
                }
                this.userCombatant.runAnimation(1/30,16)
                if(this.timer==15){
                    if(this.type==39){
                        this.targetCombatant.statusEffect('Bleed',this.effect[0])
                    }else if(this.type==47){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Bleed',this.effect[1])
                    }else{
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 37:
                if(this.timer==1){
                    this.userCombatant.startAnimation(20)
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/15,20)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[this.userCombatant.animSet.hand].bottom.y,3,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),5*this.targetDistance-2]))
                    this.userCombatant.armed=false
                }else if(this.timer==10*this.targetDistance+15){
                    this.targetCombatant.takeDamage(this.effect[0],this.user,1)
                    this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)].addType(3)
                }else if(this.timer>=10*this.targetDistance+25){
                    this.remove=true
                }
            break
            case 38: case 79: case 81: case 84: case 85: case 86: case 104:
                if(this.timer==1){
                    this.userCombatant.startAnimation(17)
                }
                this.userCombatant.runAnimation(1/30,17)
                if(this.timer==15){
                    switch(this.type){
                        case 38:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1){
                                this.targetCombatant.attack[this.targetCombatant.intent].effect[0]=max(0,this.targetCombatant.attack[this.targetCombatant.intent].effect[0]-this.effect[1])
                            }
                        break
                        case 79:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.battle.cardManagers[this.player].discard.add(findName('Ouroboros',types.card),0,0)
                            this.battle.cardManagers[this.player].discard.cards[this.battle.cardManagers[this.player].discard.cards.length-1].effect[0]=this.effect[0]+2
                        break
                        case 81:
                            this.targetCombatant.statusEffect('Poison',this.effect[0])
                        break
                        case 84:
                            this.targetCombatant.statusEffect('Weak',this.effect[0])
                        break
                        case 85:
                            this.targetCombatant.statusEffect('Vulnerable',this.effect[0])
                        break
                        case 86:
                            this.targetCombatant.statusEffect('Frail',this.effect[0])
                        break
                        case 104:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==4&&isInt(this.targetCombatant.attack[this.targetCombatant.intent].effect[0])){
                                this.targetCombatant.attack[this.targetCombatant.intent].effect[0]=max(0,this.targetCombatant.attack[this.targetCombatant.intent].effect[0]-this.effect[1])
                            }
                        break
                    }
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 48: case 100:
                if(this.targetDistance==1){
                    if(this.timer==1){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[0]=this.targetCombatant.status.main[2]>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.userCombatant.startAnimation(this.type==100?3:9)
                    }else if(this.timer==10){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }
                    if(this.timer<=20){
                        this.userCombatant.runAnimation(1/10,this.type==100?3:9)
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
                        if(this.timer>10&&this.timer<=20){
                            this.targetCombatant.moveTile(this.direction,this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                        }
                        if(this.timer==20){
                            this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        } 
                        if(this.timer==21){
                            let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                            this.procedure[1]=this.targetCombatant.status.main[2]>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        }
                        if(this.procedure[1]==2){
                            if(this.timer>20&&this.timer<=28){
                                this.targetCombatant.moveTile(this.direction,this.distance/40)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                            }else if(this.timer>28&&this.timer<=36){
                                this.targetCombatant.moveTile(this.direction,-this.distance/40)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                            }
                            if(this.timer>=36){
                                this.battle.activate(1,this.targetCombatant.id)
                                this.remove=true
                            }
                        }else if(this.procedure[1]==1){
                            if(this.timer>20&&this.timer<=28){
                                this.targetCombatant.moveTile(this.direction,this.distance/10)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                            }else if(this.timer>28&&this.timer<=36){
                                this.targetCombatant.moveTile(this.direction,-this.distance/10)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                            }
                            if(this.timer==28){
                                this.targetCombatant.takeDamage(constants.collisionDamage,-1)
                                let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                                if(index>=0){
                                    this.battle.combatantManager.combatants[index].takeDamage(constants.collisionDamage,-1)
                                }
                            }else if(this.timer>=36){
                                this.battle.activate(1,this.targetCombatant.id)
                                this.remove=true
                            }
                        }else{
                            if(this.timer>20){
                                this.targetCombatant.moveTile(this.direction,this.distance/10)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                            }
                            if(this.timer>=30){
                                this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                                this.battle.activate(1,this.targetCombatant.id)
                                this.remove=true
                            }
                        }
                    }
                }else if(this.targetDistance==2){
                    if(this.timer==1){
                        this.userCombatant.startAnimation(0)
                    }else if(this.timer==16){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[0]=this.targetCombatant.status.main[2]>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.userCombatant.startAnimation(9)
                    }else if(this.timer==25){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }
                    if(this.timer<=15){
                        this.userCombatant.runAnimation(1/15,0)
                    }else if(this.timer<=35){
                        this.userCombatant.runAnimation(1/10,9)
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
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(constants.collisionDamage,-1)
                            }
                        }else if(this.timer>=41){
                            this.remove=true
                        }
                    }else{
                        if(this.timer>25&&this.timer<=35){
                            this.targetCombatant.moveTile(this.direction,this.distance/20)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/20)
                        }
                        if(this.timer==35){
                            this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        } 
                        if(this.timer==36){
                            let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                            this.procedure[1]=this.targetCombatant.status.main[2]>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        }
                        if(this.procedure[1]==2){
                            if(this.timer>35&&this.timer<=43){
                                this.targetCombatant.moveTile(this.direction,this.distance/80)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/80)
                            }else if(this.timer>43&&this.timer<=51){
                                this.targetCombatant.moveTile(this.direction,-this.distance/80)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/80)
                            }
                            if(this.timer>=51){
                                this.battle.activate(1,this.targetCombatant.id)
                                this.remove=true
                            }
                        }else if(this.procedure[1]==1){
                            if(this.timer>35&&this.timer<=43){
                                this.targetCombatant.moveTile(this.direction,this.distance/20)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/20)
                            }else if(this.timer>43&&this.timer<=51){
                                this.targetCombatant.moveTile(this.direction,-this.distance/20)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/20)
                            }
                            if(this.timer==43){
                                this.targetCombatant.takeDamage(constants.collisionDamage,-1)
                                let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                                if(index>=0){
                                    this.battle.combatantManager.combatants[index].takeDamage(constants.collisionDamage,-1)
                                }
                            }else if(this.timer>=51){
                                this.battle.activate(1,this.targetCombatant.id)
                                this.remove=true
                            }
                        }else{
                            if(this.timer>35){
                                this.targetCombatant.moveTile(this.direction,this.distance/20)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/20)
                            }
                            if(this.timer>=45){
                                this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                                this.battle.activate(1,this.targetCombatant.id)
                                this.remove=true
                            }
                        }
                    }
                }
            break
            case 49:
                if(this.timer==1){
                    this.userCombatant.startAnimation(18)
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/15,18)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1].bottom.y,4,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),5*this.targetDistance-2]))
                }else if(this.timer==10*this.targetDistance+15){
                    this.targetCombatant.statusEffect('Bleed',this.effect[0])
                }else if(this.timer>=10*this.targetDistance+25){
                    this.remove=true
                }
            break
            case 54: case 87:
                if(this.timer==1){
                    this.userCombatant.startAnimation(19)
                }
                this.userCombatant.runAnimation(1/20,19)
                if(this.timer==10){
                    if(this.type==87){
                        this.battle.combatantManager.clearTile(this.targetTile)
                    }
                    this.userCombatant.moveTile(this.direction,this.distance)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance)
                    this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 57:
                if(this.timer==1){
                    this.userCombatant.startAnimation(15)
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/15,15)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,5,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),7.5*this.targetDistance-2]))
                }else if(this.timer==30*this.targetDistance+15){
                    this.targetCombatant.takeDamage(this.effect[0],this.user,1)
                }else if(this.timer>=30*this.targetDistance+25){
                    this.remove=true
                }
            break
            case 61:
                if(this.timer==1){
                    this.userCombatant.startAnimation(21)
                }
                this.userCombatant.runAnimation(1/30,21)
                if(this.timer==15){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    if(this.targetCombatant.life<=0){
                        this.battle.addCurrency(this.effect[1],this.player)
                    }
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 66: case 68:
                if(this.timer==1){
                    this.userCombatant.startAnimation(22)
                }
                this.userCombatant.runAnimation(1/30,22)
                if(this.timer==15){
                    switch(this.type){
                        case 66:
                            this.targetCombatant.statusEffect('Weak',this.effect[0])
                        break
                        case 68:
                            this.targetCombatant.statusEffect('Strength',-this.effect[0])
                        break
                    }
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 67:
                if(this.timer==1){
                    this.userCombatant.startAnimation(23)
                }
                this.userCombatant.runAnimation(1/15,23)
                if(this.timer==15){
                    this.targetCombatant.statusEffect('Vulnerable',this.effect[0])
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 75:
                if(this.timer==1){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x-offset[0],this.userCombatant.tilePosition.y-offset[1])
                    this.procedure[0]=index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(0)
                }
                if(this.procedure[0]==1){
                    if(this.timer<=12){
                        this.userCombatant.moveTile(this.direction,-this.distance/this.targetDistance/15)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/this.targetDistance/15)
                        this.userCombatant.runAnimation(-1/15,0)
                    }else{
                        this.userCombatant.moveTile(this.direction,this.distance/this.targetDistance/15)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/this.targetDistance/15)
                        this.userCombatant.runAnimation(1/15,0)
                    }
                    if(this.timer>=24){
                        this.remove=true
                    }
                }else{
                    this.userCombatant.moveTile(this.direction,-this.distance/this.targetDistance/15)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/this.targetDistance/15)
                    this.userCombatant.runAnimation(-1/15,0)
                    if(this.timer>=15){
                        let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                        this.userCombatant.moveTilePosition(this.userCombatant.tilePosition.x-offset[0],this.userCombatant.tilePosition.y-offset[1])
                        this.battle.activate(1,this.userCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 77:
                if(this.timer==1){
                    this.userCombatant.startAnimation(24)
                }
                this.userCombatant.runAnimation(1/12,24)
                if(this.timer==6){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    this.userCombatant.heal(this.effect[1])
                }else if(this.timer>=12){
                    this.remove=true
                }
            break
            case 80:
                if(this.timer==1){
                    this.userCombatant.startAnimation(25)
                }
                if(this.timer<=10||this.timer>20&&this.timer<=30){
                    this.userCombatant.runAnimation(1/10,25)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),2.5*this.targetDistance-1]))
                }else if(this.timer==5*this.targetDistance+15){
                    this.targetCombatant.takeDamage(this.effect[0],this.user,1)
                    this.targetCombatant.statusEffect('Frail',this.effect[1])
                }else if(this.timer>=max(30,5*this.targetDistance+25)){
                    this.remove=true
                }
            break
            case 82:
                if(this.timer==1){
                    this.userCombatant.startAnimation(15)
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/15,15)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[this.userCombatant.animSet.hand].bottom.y,7,[atan2(this.targetTile.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetTile.position.y),5*this.targetDistance-2]))
                }else if(this.timer==10*this.targetDistance+15){
                    this.battle.combatantManager.damageArea(this.effect[0],this.userCombatant.id,this.userCombatant.team,this.targetTile.tilePosition)
                }else if(this.timer>=10*this.targetDistance+25){
                    this.remove=true
                }
            break
            case 83:
                if(this.timer==1){
                    this.userCombatant.startAnimation(15)
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/15,15)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,8,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),7.5*this.targetDistance-2]))
                }else if(this.timer==30*this.targetDistance+15){
                    this.targetCombatant.statusEffect('Stun',this.effect[0])
                }else if(this.timer>=30*this.targetDistance+25){
                    this.remove=true
                }
            break
            case 87:
                if(this.timer==1){
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        let index=this.targetDistance[a]==1?this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y):this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant[a].tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                        this.procedure[a]=this.targetCombatant[a].status.main[2]>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    }
                }
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    if(this.targetDistance[a]==1){
                        if(this.procedure[a]==2){
                            if(this.timer<=8){
                                this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/40)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/40)
                            }else if(this.timer>8&&this.timer<=16){
                                this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/40)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/40)
                            }
                        }else if(this.procedure[a]==1){
                            if(this.timer<=8){
                                this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10)
                            }else if(this.timer>8&&this.timer<=16){
                                this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/10)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/10)
                            }
                            if(this.timer==8){
                                this.targetCombatant[a].takeDamage(constants.collisionDamage,-1)
                                let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                                if(index>=0){
                                    this.battle.combatantManager.combatants[index].takeDamage(constants.collisionDamage,-1)
                                }
                            }
                        }else if(this.procedure[a]==0){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10)
                            if(this.timer>=10){
                                this.targetCombatant[a].moveTilePosition(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                                this.battle.activate(1,this.targetCombatant[a].id)
                                this.procedure[a]=-1
                            }
                        }
                    }else if(this.targetDistance[a]==2){
                        if(this.procedure[a]==2){
                            if(this.timer<=8){
                                this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/80)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/40)
                            }else if(this.timer>8&&this.timer<=16){
                                this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/80)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/40)
                            }
                        }else if(this.procedure[a]==1){
                            if(this.timer<=8){
                                this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/20)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10)
                            }else if(this.timer>8&&this.timer<=16){
                                this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/20)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/10)
                            }
                            if(this.timer==8){
                                this.targetCombatant[a].takeDamage(constants.collisionDamage,-1)
                                let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant[a].tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                                if(index>=0){
                                    this.battle.combatantManager.combatants[index].takeDamage(constants.collisionDamage,-1)
                                }
                            }
                        }else if(this.procedure[a]==0){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/20)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/20)
                            if(this.timer>=10){
                                this.targetCombatant[a].moveTilePosition(this.targetCombatant[a].tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant[a].tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                                this.battle.activate(1,this.targetCombatant[a].id)
                                this.procedure[a]=-1
                            }
                        }
                    }
                }
                if(this.timer>=16){
                    this.remove=true
                }
            break
            case 88:
                if(this.timer==10||this.timer==20||this.timer==30||this.timer==40||this.timer==50||this.timer==60||this.timer==70||this.timer==80||this.timer==90||this.timer==100||this.timer==110||this.timer==120||this.timer==130||this.timer==140||this.timer==150){
                    let list=[]
                    for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                        if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team!=this.userCombatant.team){
                            list.push(a)
                        }
                    }
                    let target=list[floor(random(0,list.length))]
                    this.battle.combatantManager.combatants[target].takeDamage(this.effect[0])
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.battle.combatantManager.combatants[target].position.x+random(-20,20),this.battle.combatantManager.combatants[target].position.y+random(-50,-10),9,[10]))
                }
                if(this.timer>=150){
                    this.remove=true
                }
            break
            case -14: case 102:
                if(this.timer==1){
                    this.userCombatant.startAnimation(26)
                }
                this.userCombatant.runAnimation(1/10,26)
                if(this.timer==10){
                    switch(this.type){
                        case -14:
                            this.battle.loseCurrency(this.effect[0],this.player)
                        break
                        case 102:
                            if(this.userCombatant.armed){
                                let tile=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)
                                if(tile>=0){
                                    this.battle.tileManager.tiles[tile].addType(3)
                                }
                            }else{
                                this.userCombatant.armed=true
                            }
                        break
                    }
                }else if(this.timer>=20){
                    this.remove=true
                }
            break

            default:
                this.remove=true
            break
        }
        if(this.remove){
            switch(this.attackClass){
                case 1:
                    if(this.userCombatant.status.main[0]>0&&this.clearAttack){
                        this.userCombatant.status.main[0]--
                    }
                    if(this.userCombatant.status.main[12]>0&&this.clearAttack){
                        this.userCombatant.status.main[12]=0
                    }
                break
            }
        }
    }
}