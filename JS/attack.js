class attack{
    constructor(type,battle,player,effect,attackClass,user,level,color,energy,target,targetDistance,targetClass,combo){
        this.type=type
        this.battle=battle
        this.player=player
        this.effect=effect
        this.attackClass=attackClass
        this.user=user
        this.level=level
        this.color=color
        this.energy=energy
        this.target=target
        this.targetDistance=targetDistance
        this.targetClass=targetClass
        this.combo=combo

        this.procedure=[]

        this.userCombatant=this.battle.combatantManager.combatants[this.user]
        
        this.position={x:this.userCombatant.position.x,y:this.userCombatant.position.y}
        this.relativePosition={x:this.userCombatant.relativePosition.x,y:this.userCombatant.relativePosition.y}
        this.tilePosition={x:this.userCombatant.tilePosition.x,y:this.userCombatant.tilePosition.y}

        switch(this.attackClass){
            case 1:
                this.clearAttack=[false,false]
                if(this.userCombatant.getStatus('Double Damage')>0){
                    this.clearAttack[0]=true
                }
                if(this.userCombatant.getStatus('Single Damage')>0){
                    this.clearAttack[1]=true
                }
            break
        }
        let targetCombatant=-1
        switch(this.type){
            case 1: case 4: case 5: case 7: case 11: case 12: case 15: case 16: case 17: case 19:
            case 21: case 24: case 25: case 27: case 32: case 33: case 34: case 35: case 36: case 37:
            case 38: case 39: case 42: case 46: case 47: case 48: case 49: case 53: case 57: case 61:
            case 66: case 67: case 68: case 75: case 77: case 79: case 80: case 81: case 83: case 84:
            case 85: case 86: case 88: case 89: case 90: case 94: case 100: case 101: case 103: case 104:
            case 105: case 106: case 108: case 110: case 111: case 115: case 117: case 118: case 119: case 121:
            case 123: case 124: case 125: case 126: case 127: case 129: case 130: case 132: case 133: case 134:
            case 135: case 136: case 137: case 140: case 143: case 144: case 151: case 154: case 155: case 156:
            case 157: case 173: case 174: case 176: case 178: case 179: case 185: case 187: case 188: case 189:
            case 191: case 193: case 196: case 208: case 211: case 217: case 218: case 220: case 228: case 234:
            case 236: case 237: case 241: case 243: case 244: case 245: case 246: case 247: case 250: case 251:
            case 252: case 255: case 260: case 263: case 265: case 266: case 267: case 268: case 269: case 271:
            case 272: case 273: case 274: case 275: case 277: case 280: case 282: case 287: case 288: case 290:
            case 292: case 293: case 295: case 296: case 297: case 301: case 304: case 305: case 310: case 314:
            case 316: case 319: case 323: case 326: case 327: case 329: case 333: case 342: case 345: case 348:
            case 361: case 364: case 368: case 373: case 376: case 378: case 379: case 382: case 384: case 385:
            case 401: case 402: case 408: case 409: case 412: case 413: case 414: case 415: case 417: case 419:
            case 427: case 429: case 432: case 433: case 435: case 436: case 437: case 438: case 441: case 444:
            case 447: case 449: case 452: case 460: case 462: case 465: case 466: case 467: case 468: case 469:
            case 475: case 487: case 491: case 494: case 496: case 497: case 498: case 501: case 504: case 507:
            case 508: case 509: case 510: case 514:
                this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]

                this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)

                this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
            break
            case 3: case 14: case 20: case 51: case 52: case 54: case 56: case 58: case 59: case 60:
            case 82: case 83: case 87: case 91: case 153: case 177: case 182: case 192: case 205: case 248:
            case 256: case 330: case 331: case 332: case 335: case 341: case 374: case 375: case 383: case 397:
            case 421: case 448: case 458: case 464: case 472: case 474: case 479: case 482: case 484: case 485:
            case 486: case 503:
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
            case 31: case 356: case 357: case 459: case 471:
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
            case 489:
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
            case 138: case 139: case 175: case 400: case 453: case 516:
                this.targetCombatant=[]
                this.direction=[]
                this.distance=[]
                this.relativeDirection=[]
                this.relativeDistance=[]
                this.targetDistance=[]
                targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                this.targetCombatant.push(targetCombatant)
                this.direction.push(atan2(targetCombatant.position.x-this.position.x,targetCombatant.position.y-this.position.y))
                this.distance.push(sqrt((targetCombatant.position.x-this.position.x)**2+(targetCombatant.position.y-this.position.y)**2))
                this.relativeDirection.push(atan2(targetCombatant.relativePosition.x-this.relativePosition.x,targetCombatant.relativePosition.y-this.relativePosition.y))
                this.relativeDistance.push(sqrt((targetCombatant.relativePosition.x-this.relativePosition.x)**2+(targetCombatant.relativePosition.y-this.relativePosition.y)**2))
                for(let a=0,la=2;a<la;a++){
                    let offset=transformDirection(0,this.relativeDirection[0]-60+a*120)
                    let index=this.battle.combatantManager.getCombatantIndex(this.userCombatant.tilePosition.x+offset[0],this.userCombatant.tilePosition.y+offset[1])
                    if(index>=0){
                        targetCombatant=this.battle.combatantManager.combatants[index]
                        this.targetCombatant.push(targetCombatant)
                        this.direction.push(atan2(targetCombatant.position.x-this.position.x,targetCombatant.position.y-this.position.y))
                        this.distance.push(sqrt((targetCombatant.position.x-this.position.x)**2+(targetCombatant.position.y-this.position.y)**2))
                        this.relativeDirection.push(atan2(targetCombatant.relativePosition.x-this.relativePosition.x,targetCombatant.relativePosition.y-this.relativePosition.y))
                        this.relativeDistance.push(sqrt((targetCombatant.relativePosition.x-this.relativePosition.x)**2+(targetCombatant.relativePosition.y-this.relativePosition.y)**2))
                    }
                }
            break
            case 145: case 146: case 147: case 148: case 158: case 159: case 160: case 161: case 162:
            case 163: case 164: case 351: case 352: case 353:
                this.targetCombatant=this.battle.combatantManager.combatants[this.battle.players-1-this.userCombatant.id]

                this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)

                this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
            break
            case 165:
                this.targetTile=this.battle.tileManager.tiles[this.target[0]]
                this.targetCombatant=this.battle.combatantManager.combatants[this.battle.players-1-this.userCombatant.id]

                this.direction=atan2(this.targetTile.position.x-this.targetCombatant.position.x,this.targetTile.position.y-this.targetCombatant.position.y)
                this.distance=sqrt((this.targetTile.position.x-this.targetCombatant.position.x)**2+(this.targetTile.position.y-this.targetCombatant.position.y)**2)

                this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.targetCombatant.relativePosition.x,this.targetTile.relativePosition.y-this.targetCombatant.relativePosition.y)
                this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.targetCombatant.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.targetCombatant.relativePosition.y)**2)
            break
            case 201: case 222:
                this.targetCombatant=[]
                this.direction=[]
                this.distance=[]
                this.relativeDirection=[]
                this.relativeDistance=[]
                this.targetDistance=[]
                targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                this.targetCombatant.push(targetCombatant)
                this.direction.push(atan2(targetCombatant.position.x-this.position.x,targetCombatant.position.y-this.position.y))
                this.distance.push(sqrt((targetCombatant.position.x-this.position.x)**2+(targetCombatant.position.y-this.position.y)**2))
                this.relativeDirection.push(atan2(targetCombatant.relativePosition.x-this.relativePosition.x,targetCombatant.relativePosition.y-this.relativePosition.y))
                this.relativeDistance.push(sqrt((targetCombatant.relativePosition.x-this.relativePosition.x)**2+(targetCombatant.relativePosition.y-this.relativePosition.y)**2))
                let offset=transformDirection(0,this.relativeDirection[0]-180)
                let index=this.battle.combatantManager.getCombatantIndex(this.userCombatant.tilePosition.x+offset[0],this.userCombatant.tilePosition.y+offset[1])
                if(index>=0){
                    targetCombatant=this.battle.combatantManager.combatants[index]
                    this.targetCombatant.push(targetCombatant)
                    this.direction.push(atan2(targetCombatant.position.x-this.position.x,targetCombatant.position.y-this.position.y))
                    this.distance.push(sqrt((targetCombatant.position.x-this.position.x)**2+(targetCombatant.position.y-this.position.y)**2))
                    this.relativeDirection.push(atan2(targetCombatant.relativePosition.x-this.relativePosition.x,targetCombatant.relativePosition.y-this.relativePosition.y))
                    this.relativeDistance.push(sqrt((targetCombatant.relativePosition.x-this.relativePosition.x)**2+(targetCombatant.relativePosition.y-this.relativePosition.y)**2))
                }
            break
            case 328:
                this.targetTile=this.battle.tileManager.tiles[this.target[0]]

                this.targetVariant=distTargetCombatant(0,this,this.targetTile)>0

                this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
            break
            case 358:
                this.targetCombatant=[]
                this.direction=[]
                this.distance=[]
                this.relativeDirection=[]
                this.relativeDistance=[]
                this.targetDistance=[]
                targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                this.targetCombatant.push(targetCombatant)
                this.direction.push(atan2(targetCombatant.position.x-this.position.x,targetCombatant.position.y-this.position.y))
                this.distance.push(sqrt((targetCombatant.position.x-this.position.x)**2+(targetCombatant.position.y-this.position.y)**2))
                this.relativeDirection.push(atan2(targetCombatant.relativePosition.x-this.relativePosition.x,targetCombatant.relativePosition.y-this.relativePosition.y))
                this.relativeDistance.push(sqrt((targetCombatant.relativePosition.x-this.relativePosition.x)**2+(targetCombatant.relativePosition.y-this.relativePosition.y)**2))
                let offset2=transformDirection(0,this.relativeDirection[0])
                let index2=this.battle.combatantManager.getCombatantIndex(targetCombatant.tilePosition.x+offset2[0],targetCombatant.tilePosition.y+offset2[1])
                if(index2>=0){
                    targetCombatant=this.battle.combatantManager.combatants[index2]
                    this.targetCombatant.push(targetCombatant)
                    this.direction.push(atan2(targetCombatant.position.x-this.position.x,targetCombatant.position.y-this.position.y))
                    this.distance.push(sqrt((targetCombatant.position.x-this.position.x)**2+(targetCombatant.position.y-this.position.y)**2))
                    this.relativeDirection.push(atan2(targetCombatant.relativePosition.x-this.relativePosition.x,targetCombatant.relativePosition.y-this.relativePosition.y))
                    this.relativeDistance.push(sqrt((targetCombatant.relativePosition.x-this.relativePosition.x)**2+(targetCombatant.relativePosition.y-this.relativePosition.y)**2))
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
                switch(this.type){
                    case 12:
                        this.targetCombatant.takeDamage(this.effect[0]*this.energy,this.user)
                    break
                    case 46:
                        if(this.targetCombatant.getStatus('Bleed')>0||this.type==101&&this.battle.counter.turnPlayed[this.player]<=1||this.type==117&&this.userCombatant.getStatus('Weak')>0){
                            this.targetCombatant.takeDamage(this.effect[0]*2,this.user)
                        }else{
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }
                    break
                    case 88:
                        this.targetCombatant.takeDamage(this.effect[0]*this.energy*this.energy,this.user)
                    break
                    case 89:
                        this.targetCombatant.block=0
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    break
                    case 119:
                        if(this.battle.cardManagers[this.player].hand.allClass(1)){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }
                    break
                    case 129: case 229:
                        this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*this.combo,this.user)
                    break
                    case 140:
                        this.targetCombatant.takeDamage(this.effect[0],this.user,2)
                    break
                    case 144:
                        this.targetCombatant.takeDamage(this.effect[0]*this.battle.cardManagers[this.player].discard.cards.length,this.user)
                    break
                    case 154:
                        this.targetCombatant.takeDamage(this.effect[0]*this.userCombatant.block,this.user)
                    break
                    case 191:
                        this.targetCombatant.takeDamage(this.effect[0]*this.combo,this.user)
                    break
                    case 193:
                        if(this.targetCombatant.spec.includes(2)||this.targetCombatant.spec.includes(12)){
                            this.targetCombatant.takeDamage(this.effect[0]*2,this.user)
                        }else{
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }
                    break
                    case 265:
                        this.targetCombatant.takeDamage(this.effect[0]*this.battle.counter.turnPlayed[1],this.user)
                    break
                    case 267:
                        this.number=0
                        for(let a=0,la=this.battle.cardManagers[this.player].hand.cards.length;a<la;a++){
                            if(this.battle.cardManagers[this.player].hand.cards[a].class==2){
                                this.number++
                            }
                        }
                        this.targetCombatant.takeDamage(this.effect[0]*this.number,this.user)
                    break
                    case 275:
                        if(this.energy%2==1){
                            this.targetCombatant.takeDamage(this.effect[1]*this.energy,this.user)
                            this.userCombatant.addBlock(this.effect[0]*this.energy)
                        }else{
                            this.targetCombatant.takeDamage(this.effect[0]*this.energy,this.user)
                            this.userCombatant.addBlock(this.effect[1]*this.energy)
                        }
                    break
                    case 280:
                        this.number=0
                        for(let a=0,la=this.battle.cardManagers[this.player].hand.cards.length;a<la;a++){
                            if(this.battle.cardManagers[this.player].hand.cards[a].class==1){
                                this.number++
                            }
                        }
                        this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*this.number,this.user)
                    break
                    case 296:
                        if(this.battle.cardManagers[this.player].reserve.cards.length==0){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }
                    break
                    case 364:
                        this.targetCombatant.takeDamage(this.effect[0]*this.energy,this.user)
                        this.userCombatant.life-=this.effect[1]*this.energy
                    break
                    case 371:
                        if(this.userCombatant.life<this.userCombatan.base.life*0.5){
                            this.targetCombatant.takeDamage(this.effect[0]*2,this.user)
                        }else{
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }
                    break
                    case 376:
                        this.targetCombatant.takeDamage(floor(this.userCombatant.life/this.effect[0])*this.effect[1],this.user)
                    break
                    case 378:
                        this.targetCombatant.takeDamage(this.effect[0]*round(this.userCombatant.life)/10,this.user)
                        this.userCombatant.life-=round(this.userCombatant.life)/10
                    break
                    case 379:
                        this.targetCombatant.takeDamage(this.effect[0]*this.battle.cardManagers[this.player].exhaust.fatigueNumber(),this.user)
                    break
                    case 388:
                        this.targetCombatant.takeDamage(this.effect[0]*this.userCombatant.balance,this.user)
                        this.userCombatant.balance=0
                    break
                    case 475:
                        let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)
                        if(index>=0&&this.battle.tileManager.tiles[index].type.includes(19)){
                            this.targetCombatant.takeDamage(this.effect[0]*2,this.user)
                        }else{
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }
                    break
                    case 510:
                        this.targetCombatant.takeDamage(this.effect[0]*this.userCombatant.getOrbNumber(-1),this.user)
                    break
                    default:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    break
                }
                switch(this.type){
                    case 7:
                        if(this.targetCombatant.life<=0){
                            this.battle.energy.main[this.player]+=this.effect[1]
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
                    case 106:
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1){
                            this.targetCombatant.statusEffect('Weak',this.effect[1])
                        }
                    break
                    case 110:
                        this.userCombatant.statusEffect('Control',this.effect[1])
                    break
                    case 111:
                        if(this.battle.counter.turnPlayed[this.player]<=this.effect[1]+1){
                            this.battle.cardManagers[this.player].draw(this.effect[2])
                        }
                    break
                    case 115:
                        this.battle.dropDraw(this.player,findName('Anger',types.card),this.level,this.color)
                    break
                    case 123:
                        this.battle.drop(this.player,findName('Slow\nBleed',types.card),this.level,game.playerNumber+1)
                    break
                    case 124:
                        this.battle.cardManagers[this.player].randomEffect(2,13)
                    break
                    case 125:
                        this.battle.cardManagers[this.player].hand.discard(this.effect[1])
                    break
                    case 126:
                        this.targetCombatant.statusEffect('Weak',this.effect[1])
                    break
                    case 137:
                        this.userCombatant.statusEffect('Strength Next Turn',this.effect[1])
                    break
                    case 155:
                        this.battle.energy.main[this.player]+=this.effect[1]
                    break
                    case 156:
                        this.targetCombatant.statusEffect('Temporary Speed Up',-this.effect[1])
                    break
                    case 157:
                        let list=this.battle.combatantManager.getArea(this.userCombatant.team,this.targetCombatant.tilePosition,1)
                        if(list.length>0){
                            list[floor(random(0,list.length))].takeDamage(this.effect[0],this.user)
                        }
                    break
                    case 174:
                        this.targetCombatant.statusEffect('Stun',this.effect[1])
                        this.battle.updateTargetting()
                    break
                    case 185:
                        this.battle.cardManagers[this.player].drawPrice(this.effect[1],0)
                    break
                    case 189:
                        this.battle.turnManager.loadEnemyAttack(this.targetCombatant.id)
                    break
                    case 196:
                        this.userCombatant.statusEffect('Conditioning',this.effect[1])
                    break
                    case 228:
                        this.battle.cardManagers[this.player].draw(this.effect[1])
                    break
                    case 234:
                        if(this.targetCombatant.life<=0){
                            this.userCombatant.combo+=this.effect[1]
                        }
                    break
                    case 260:
                        this.targetCombatant.statusEffect('Temporary Damage Down',this.effect[1])
                    break
                    case 268:
                        if(this.targetCombatant.getStatus('Weak')>0){
                            this.battle.energy.main[this.player]+=this.effect[1]
                            this.battle.cardManagers[this.player].draw(this.effect[2])
                        }
                    break
                    case 269:
                        if(this.targetCombatant.getStatus('Vulnerable')>0){
                            this.battle.energy.main[this.player]+=this.effect[1]
                            this.battle.cardManagers[this.player].draw(this.effect[2])
                        }
                    break
                    case 271:
                        this.userCombatant.statusEffect('Counter',this.effect[1])
                    break
                    case 273:
                        this.userCombatant.addBlock(this.effect[1])
                    break
                    case 274:
                        this.battle.drop(this.player,findName('Chip',types.card),this.level,0)
                    break
                    case 277:
                        this.battle.drop(this.player,findName('Overflow',types.card),this.level,this.color)
                    break
                    case 287:
                        this.targetCombatant.statusEffect('Take Per Card Played',this.effect[1])
                    break
                    case 293:
                        this.userCombatant.statusEffect('Temporary Draw',this.effect[1])
                    break
                    case 301:
                        this.battle.cardManagers[this.player].allEffect(2,18)
                    break
                    case 304:
                        this.battle.cardManagers[this.player].allEffect(2,19)
                    break
                    case 310:
                        if(this.targetCombatant.life<=0){
                            this.userCombatant.gainMaxHP(this.effect[1])
                        }
                    break
                    case 319:
                        let list2=[]
                        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                            if(this.battle.combatantManager.combatants[a].team==0&&this.battle.combatantManager.combatants[a].id!=this.targetCombatant.id){
                                list2.push(a)
                            }
                        }
                        if(list2.length>0){
                            this.battle.combatantManager.combatants[list2[floor(random(0,list2.length))]].takeDamage(this.effect[1],this.user)
                        }
                    break
                    case 323:
                        if(this.targetCombatant.blocked<=1){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                            }
                        }
                    break
                    case 361:
                        this.userCombatant.life-=this.effect[1]
                    break
                    case 373:
                        this.userCombatant.loseMaxHP(this.effect[1])
                    break
                    case 385: case 414:
                        this.userCombatant.balance+=this.effect[1]
                    break
                    case 402:
                        if(this.targetCombatant.getStatus('Bleed')>0){
                            this.userCombatant.heal(this.targetCombatant.getStatus('Bleed'))
                        }
                    break
                    case 409:
                        this.userCombatant.statusEffect('Weak',this.effect[1])
                    break
                    case 427:
                        this.targetCombatant.statusEffect('Confusion',this.effect[1])
                        this.targetCombatant.statusEffect('Vulnerable',this.effect[2])
                    break
                    case 429:
                        this.battle.drop(this.player,findName('Winded',types.card),this.level,game.playerNumber+1)
                    break
                    case 435:
                        if(this.userCombatant.armed){
                            this.userCombatant.armed=false
                            this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)].addType(3)
                        }
                    break
                    case 444:
                        this.battle.cardManagers[this.player].hand.add(findName('Fury',types.card),this.level,this.color)
                        if(this.battle.cardManagers[this.player].hand.cards.length>=1){
                            this.battle.cardManagers[this.player].hand.cards[this.battle.cardManagers[this.player].hand.cards.length-1].effect[0]=max(1,this.effect[0]-1)
                        }
                        this.userCombatant.balance+=this.effect[1]
                    break
                    case 449:
                        if(!this.userCombatant.armed){
                            let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)
                            if(index>=0&&this.battle.tileManager.tiles[index].type.includes(3)){
                                this.battle.tileManager.tiles[index].anim.upPart[this.battle.tileManager.tiles[index].type.indexOf(3)]=false
                                this.userCombatant.armed=true
                                la=0
                            }
                        }
                    break
                    case 460:
                        this.userCombatant.life-=this.effect[1]
                        this.battle.cardManagers[this.player].hand.add(findName('Pain\nStrike',types.card),this.level,this.color)
                    break
                    case 462:
                        this.battle.cardManagers[this.player].deFatigue(this.effect[1])
                    break
                    case 496:
                        this.targetCombatant.statusEffect('Weak',this.effect[1])
                    break
                    case 497:
                        this.battle.cardManagers[this.player].allGroupClaw(this.effect[1])
                    break
                    case 507:
                        if(this.targetCombatant.life<=0){
                            this.battle.energy.main[this.player]+=this.effect[1]
                        }
                        this.battle.cardManagers[this.player].allGroupClaw(this.effect[2])
                    break
                    case 508:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userCombatant.holdOrb(0)
                        }
                    break
                    case 509:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userCombatant.holdOrb(1)
                        }
                    break
                    case 514:
                        this.battle.cardManagers[this.player].hand.rebound(1)
                    break
                }
            break
        }
    }
    update(){
        this.timer++
        switch(this.type){
            case 1: case 7: case 12: case 34: case 35: case 42: case 46: case 53: case 88: case 89:
            case 90: case 94: case 101: case 103: case 105: case 106: case 108: case 110: case 111: case 115:
            case 117: case 118: case 119: case 123: case 124: case 125: case 126: case 129: case 137: case 140:
            case 144: case 151: case 154: case 155: case 156: case 157: case 174: case 185: case 187: case 189:
            case 191: case 193: case 196: case 220: case 228: case 234: case 260: case 263: case 265: case 266:
            case 267: case 268: case 269: case 271: case 273: case 274: case 275: case 277: case 280: case 282:
            case 287: case 288: case 293: case 296: case 301: case 304: case 310: case 319: case 323: case 361:
            case 364: case 371: case 373: case 376: case 378: case 379: case 385: case 388: case 402: case 409:
            case 414: case 415: case 427: case 429: case 435: case 444: case 449: case 460: case 462: case 469:
            case 475: case 496: case 497: case 507: case 508: case 509: case 510: case 514:
                if(this.type==427&&this.userCombatant.armed){
                    this.remove=true
                }else if(this.targetDistance==1){
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
            case 2: case 13: case 23: case 26: case 43: case 50: case 65: case 95: case 96: case 97:
            case 107: case 120: case 122: case 131: case 141: case 142: case 146: case 152: case 172: case 190:
            case 194: case 197: case 206: case 216: case 221: case 235: case 242: case 261: case 262: case 281:
            case 303: case 320: case 321: case 322: case 354: case 355: case 359: case 365: case 377: case 386:
            case 389: case 396: case 399: case 410: case 416: case 428: case 430: case 443: case 461: case 463:
            case 502: case 513: case 515: case 518: case 522:
                if(this.timer==1){
                    this.userCombatant.startAnimation(1)
                }
                this.userCombatant.runAnimation(1/30,1)
                if(this.timer==15){
                    switch(this.type){
                        case 13: case 235:
                            this.userCombatant.addBlock(this.effect[0]*this.energy)
                        break
                        case 141:
                            this.userCombatant.addBlock(this.effect[0]*this.combo)
                            this.userCombatant.combo=0
                        break
                        case 146:
                            this.targetCombatant.addBlock(this.effect[0])
                        break
                        case 172:
                            this.userCombatant.statusEffect('Untargettable From Front',this.effect[0])
                        break
                        case 206:
                            this.userCombatant.addBlock(this.effect[0]*this.battle.cardManagers[this.player].hand.cards.length)
                            this.battle.cardManagers[this.player].allEffect(2,1)
                        break
                        case 322:
                            if(this.userCombatant.block==0){
                                this.battle.energy.main[this.player]+=this.effect[1]
                            }
                            this.userCombatant.addBlock(this.effect[0])
                        break
                        case 365:
                            this.userCombatant.addBlock(this.effect[0]*this.energy)
                            this.userCombatant.life-=this.effect[1]*this.energy
                        break
                        case 377:
                            this.userCombatant.addBlock(this.effect[0]*this.battle.cardManagers[this.player].fatigueNumber())
                        break
                        case 389:
                            this.userCombatant.addBlock(this.effect[0]*this.userCombatant.balance)
                            this.userCombatant.balance=0
                        break
                        case 515:
                            this.userCombatant.addBlock(this.effect[0]+this.battle.cardManagers[this.player].discard.cards.length)
                        break
                        case 518:
                            this.userCombatant.addBlock(floor(this.userCombatant.life/this.effect[0])*this.effect[1])
                        break
                        default:
                            this.userCombatant.addBlock(this.effect[0])
                        break
                    }
                    switch(this.type){
                        case 23:
                            this.userCombatant.statusEffect('Counter',this.effect[1])
                        break
                        case 26:
                            this.userCombatant.statusEffect('Cannot Be Pushed',1)
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
                        case 120:
                            this.battle.cardManagers[this.player].hand.discard(this.effect[1])
                        break
                        case 122:
                            this.userCombatant.statusEffect('Counter All',this.effect[1])
                        break
                        case 131:
                            this.userCombatant.statusEffect('Counter',this.effect[1]+this.effect[2]*this.combo)
                        break
                        case 142:
                            this.userCombatant.statusEffect('Temporary Strength on Hit',this.effect[1])
                        break
                        case 190:
                            this.userCombatant.statusEffect('Energy on Hit',this.effect[1])
                        break
                        case 194:
                            this.userCombatant.life-=this.effect[1]
                        break
                        case 197:
                            this.userCombatant.statusEffect('Conditioning',this.effect[1])
                        break
                        case 216:
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                            }
                        break
                        case 221:
                            this.userCombatant.combo+=this.effect[1]
                        break
                        case 235:
                            this.userCombatant.statusEffect('Counter',this.effect[1]*this.energy)
                        break
                        case 242:
                            this.userCombatant.statusEffect('2 Range Counter',this.effect[1])
                        break
                        case 261:
                            this.battle.cardManagers[this.player].drawPrice(this.effect[1],1)
                        break
                        case 262:
                            this.userCombatant.statusEffect('Block Next Turn',this.effect[1])
                        break
                        case 281:
                            this.battle.cardManagers[this.player].randomEffect(2,13,[])
                        break
                        case 320:
                            this.userCombatant.statusEffect('Block Next Turn',this.effect[0])
                            this.userCombatant.statusEffect('Block Next Turn Next Turn',this.effect[0])
                        break
                        case 321:
                            this.userCombatant.statusEffect('Single Damage',this.effect[1])
                        break
                        case 354:
                            this.userCombatant.statusEffect('Counter Push Left',1)
                        break
                        case 355:
                            this.userCombatant.statusEffect('Counter Push Right',1)
                        break
                        case 359:
                            this.userCombatant.statusEffect('Counter Temporary Speed Down',this.effect[1])
                        break
                        case 386:
                            this.userCombatant.balance+=this.effect[1]
                        break
                        case 396:
                            if(!this.userCombatant.armed){
                                for(let a=0,la=6;a<la;a++){
                                    let offset=transformDirection(0,-30+a*60)
                                    let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+offset[0],this.userCombatant.tilePosition.y+offset[1])
                                    if(index>=0&&this.battle.tileManager.tiles[index].type.includes(3)){
                                        this.battle.tileManager.tiles[index].anim.upPart[this.battle.tileManager.tiles[index].type.indexOf(3)]=false
                                        this.userCombatant.armed=true
                                        la=0
                                    }
                                }
                            }
                        break
                        case 399:
                            if(this.userCombatant.armed){
                                this.userCombatant.armed=false
                                this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)].addType(3)
                            }
                        break
                        case 410:
                            this.userCombatant.statusEffect('Counter Confusion',this.effect[1])
                        break
                        case 428:
                            this.userCombatant.statusEffect('Counter 3 Times',this.effect[1])
                        break
                        case 430:
                            this.userCombatant.statusEffect('Retain Block',this.effect[1])
                            this.userCombatant.balance+=this.effect[2]
                        break
                        case 443:
                            this.userCombatant.balanceCap=max(1,this.userCombatant.balanceCap-this.effect[1])
                        break
                        case 461:
                            this.userCombatant.life-=this.effect[1]
                            this.battle.cardManagers[this.player].hand.add(findName('Pain\nDefend',types.card),this.level,this.color)
                        break
                        case 463:
                            this.battle.cardManagers[this.player].deFatigue(this.effect[1])
                        break
                        case 502:
                            this.battle.cardManagers[this.player].allGroupClaw(this.effect[0])
                        break
                        case 513:
                            this.battle.overlayManager.overlays[7][this.player].active=true
                            this.battle.overlayManager.overlays[7][this.player].activate()
                        break
                        case 522:
                            this.battle.cardManagers[this.player].hand.allEffect(24)
                        break
                    }
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 3: case 20: case 51: case 52: case 56: case 58: case 59: case 60: case 91: case 182:
            case 192: case 205: case 248: case 256: case 330: case 331: case 332: case 335: case 374: case 375:
            case 383: case 397: case 484: case 485: case 503:
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
                            this.battle.cardManagers[this.player].hand.add(findName('Stride',types.card),0,0)
                        break
                        case 59:
                            this.userCombatant.block=0
                        break
                        case 91:
                            this.userCombatant.addBlock(this.effect[1])
                        break
                        case 182:
                            this.userCombatant.combo+=this.effect[1]
                            this.userCombatant.statusEffect('Must Attack or Take Damage',this.effect[2])
                        break
                        case 192:
                            this.userCombatant.statusEffect('Strength',this.effect[1])
                        break
                        case 248:
                            this.userCombatant.statusEffect('Conditioning',this.effect[1])
                        break
                        case 256:
                            this.battle.cardManagers[this.player].hand.discard(this.effect[1])
                        break
                        case 331:
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                            }
                        break
                        case 335:
                            this.userCombatant.statusEffect('Energy Next Turn',this.effect[1])
                        break
                        case 397:
                            this.userCombatant.balance+=this.effect[1]
                        break
                        case 503:
                            this.battle.cardManagers[this.player].allGroupClaw(this.effect[0])
                        break
                    }
                }
                if(this.timer>=15*this.targetDistance){
                    this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                    if(this.type==205){
                        this.battle.activateTile(1,this.userCombatant.id)
                    }else{
                        this.battle.activate(1,this.userCombatant.id)
                    }
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
            case 5: case 121:
                if(this.type==121&&this.userCombatant.armed){
                    this.remove=true
                }else if(this.targetDistance==1){
                    if(this.timer==1){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.userCombatant.startAnimation(this.userCombatant.name=='Sakura'&&this.type==121?27:3)
                    }else if(this.timer==10){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }
                    if(this.timer<=20){
                        this.userCombatant.runAnimation(1/10,this.userCombatant.name=='Sakura'&&this.type==121?27:3)
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
                            this.targetCombatant.takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
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
                        this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                            this.targetCombatant.takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
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
            case -15: case 6: case 30: case 41: case 71: case 92: case 98: case 113: case 128: case 149:
            case 150: case 181: case 184: case 198: case 200: case 203: case 204: case 212: case 215: case 223:
            case 225: case 226: case 231: case 239: case 240: case 249: case 264: case 278: case 286: case 299:
            case 306: case 307: case 311: case 312: case 347: case 362: case 366: case 367: case 370: case 372:
            case 381: case 393: case 406: case 424: case 439: case 440: case 445: case 446: case 450: case 454:
            case 455: case 457: case 488: case 500: case 517: case 521:
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
                        case 30:
                            this.userCombatant.statusEffect('Dodge',this.effect[0])
                        break
                        case 41:
                            this.battle.energy.main[this.player]+=this.effect[0]
                        break
                        case 71:
                            this.battle.overlayManager.overlays[10][this.player].active=true
                            this.battle.overlayManager.overlays[10][this.player].activate([0,3,2])
                        break
                        case 92:
                            this.battle.cardManagers[this.player].deFatigue(this.effect[0])
                        break
                        case 98:
                            this.userCombatant.statusEffect('Temporary Damage Up',this.effect[0])
                        break
                        case 113:
                            this.battle.energy.main[this.player]+=this.effect[0]
                            this.battle.cardManagers[this.player].draw(this.effect[1])
                        break
                        case 128:
                            this.userCombatant.combo+=this.effect[0]
                        break
                        case 149:
                            this.userCombatant.statusEffect('Take 3/4 Damage',this.effect[0])
                        break
                        case 150:
                            this.userCombatant.statusEffect('Temporary Strength',this.effect[0])
                            this.userCombatant.statusEffect('Temporary Strength Next Turn',this.effect[0])
                        break
                        case 181:
                            this.userCombatant.statusEffect('Dodge',this.effect[0])
                            this.userCombatant.statusEffect('Counter',this.effect[1])
                        break
                        case 184:
                            game.collisionDamage+=this.effect[0]
                        break
                        case 198:
                            this.userCombatant.combo*=2
                        break
                        case 200:
                            this.userCombatant.statusEffect('Conditioning',this.effect[0])
                            this.userCombatant.life-=this.effect[1]
                        break
                        case 203:
                            this.userCombatant.statusEffect('Retain Block',this.effect[0])
                        break
                        case 204:
                            this.userCombatant.statusEffect('Dodge',this.effect[0])
                            this.userCombatant.statusEffect('Conditioning',this.effect[1])
                        break
                        case 212:
                            this.battle.energy.gen[this.player]+=this.effect[0]
                        break
                        case 215:
                            this.userCombatant.combo+=this.effect[0]
                            this.userCombatant.life-=this.effect[1]
                        break
                        case 223:
                            this.userCombatant.statusEffect('Conditioning',this.effect[0])
                        break
                        case 225:
                            this.userCombatant.combo+=this.effect[0]
                            this.userCombatant.statusEffect('Energy Next Turn',this.effect[1])
                        break
                        case 226:
                            this.userCombatant.combo+=this.effect[0]
                            this.userCombatant.statusEffect('Remove Combo',1)
                        break
                        case 231:
                            this.userCombatant.statusEffect('Combo Per Hit Boost',this.effect[0])
                        break
                        case 239:
                            this.userCombatant.statusEffect('Combo Per Turn',this.effect[0])
                        break
                        case 240:
                            this.userCombatant.statusEffect('Combo Next Turn',this.effect[0])
                        break
                        case 249:
                            this.userCombatant.statusEffect('Strength',floor(this.userCombatant.combo/this.effect[0]))
                            this.userCombatant.combo=0
                        break
                        case 264:
                            this.userCombatant.statusEffect('Shiv Boost',this.effect[0])
                        break
                        case 278:
                            this.userCombatant.statusEffect('Temporary Strength',this.effect[0])
                        break
                        case 286:
                            this.userCombatant.statusEffect('Counter All Combat',this.effect[0])
                        break
                        case 299:
                            this.userCombatant.statusEffect('Double Damage Turn Next Turn',1)
                        break
                        case 306:
                            this.userCombatant.statusEffect('Retain Block',999)
                        break
                        case 307:
                            this.userCombatant.statusEffect('Vulnerable',this.effect[0])
                            this.battle.energy.gen[this.player]+=this.effect[1]
                        break
                        case 311:
                            this.userCombatant.multiplyStatusClass(this.effect[0],[0,2])
                        break
                        case 312:
                            this.userCombatant.statusEffect('Shiv on Hit',this.effect[0])
                        break
                        case 347:
                            this.userCombatant.statusEffect('Debuff Damage',this.effect[0])
                        break
                        case 362:
                            this.userCombatant.life-=this.effect[0]*this.battle.cardManagers[this.player].deFatigueAll()
                        break
                        case 366:
                            this.battle.cardManagers[this.player].allGroupEffect(21)
                        break
                        case 367:
                            this.battle.cardManagers[this.player].reserve.sendName(this.battle.cardManagers[this.player].hand.cards,'Fatigue')
                            this.battle.cardManagers[this.player].discard.sendName(this.battle.cardManagers[this.player].hand.cards,'Fatigue')
                        break
                        case 370:
                            this.userCombatant.statusEffect('Heal on Hit',this.effect[0])
                        break
                        case 372:
                            this.battle.energy.gen[this.player]+=this.effect[0]
                            this.userCombatant.statusEffect('Take Per Card Played Combat',this.effect[1])
                        break
                        case 381:
                            this.userCombatant.statusEffect('Take 3/5 Damage',999)
                        break
                        case 393:
                            this.userCombatant.statusEffect('Dexterity',this.effect[0])
                            this.battle.cardManagers[this.player].draw(this.effect[1])
                        break
                        case 406:
                            this.userCombatant.statusEffect('Bleed',this.effect[0])
                            this.userCombatant.statusEffect('Strength',this.effect[1])
                        break
                        case 424:
                            this.battle.cardManagers[this.player].allGroupEffect(23)
                        break
                        case 439:
                            this.userCombatant.statusEffect('Armed Block Per Turn',this.effect[0])
                        break
                        case 440:
                            this.userCombatant.statusEffect('Dodge',this.effect[0])
                            this.userCombatant.statusEffect('Bleed',this.effect[1])
                        break
                        case 445:
                            this.userCombatant.statusEffect('Strength',this.userCombatant.balance*this.effect[0])
                            this.userCombatant.balance=0
                        break
                        case 446:
                            this.userCombatant.statusEffect('Dexterity',this.userCombatant.balance*this.effect[0])
                            this.userCombatant.balance=0
                        break
                        case 450:
                            this.userCombatant.balance*=2
                        break
                        case 454:
                            this.userCombatant.statusEffect('Counter Block',this.effect[0])
                        break
                        case 455:
                            this.userCombatant.statusEffect('Heal Gain Max HP',this.effect[0])
                        break
                        case 457:
                            this.battle.energy.main[this.player]+=this.effect[0]
                            this.battle.cardManagers[this.player].draw(this.effect[1])
                        break
                        case 488:
                            this.userCombatant.combo+=this.effect[0]
                            this.battle.cardManagers[this.player].addRandomSpec(2,0,11)
                        break
                        case 500:
                            this.battle.cardManagers[this.player].allGroupClaw(this.effect[0])
                        break
                        case 517:
                            this.battle.energy.main[this.player]+=this.effect[0]
                            this.battle.drop(this.player,findName('Void',types.card),0,game.playerNumber+1)
                        break
                        case 521:
                            this.battle.energy.main[this.player]*=2
                        break
                    }
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 8: case 28: case 29: case 40: case 44: case 45: case 55: case 60: case 62: case 63:
            case 69: case 70: case 76: case 78: case 93: case 99: case 109: case 116: case 183: case 186:
            case 199: case 207: case 209: case 210: case 213: case 214: case 227: case 229: case 230: case 232:
            case 233: case 253: case 254: case 259: case 276: case 279: case 284: case 285: case 289: case 291:
            case 294: case 298: case 300: case 302: case 305: case 308: case 309: case 313: case 315: case 317:
            case 318: case 334: case 337: case 338: case 339: case 340: case 343: case 344: case 346: case 363:
            case 387: case 390: case 392: case 398: case 418: case 422: case 423: case 431: case 451: case 499:
            case 511: case 512: case 519: case 523: case 524: case 525: case 527: case 528: case 529: case 530:
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
                            this.battle.cardManagers[this.player].allEffect(2,1)
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
                                this.battle.cardManagers[this.player].addRandomColor(2,0,0,3)
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
                        case 109:
                            this.battle.cardManagers[this.player].draw(this.effect[0])
                            this.battle.drop(this.player,findName('Burn',types.card),0,game.playerNumber+1)
                        break
                        case 116:
                            this.userCombatant.statusEffect('Energy Next Turn',this.effect[0]+this.energy)
                            this.battle.attackManager.endAfter=true
                        break
                        case 183:
                            this.battle.cardManagers[this.player].draw(this.effect[0]*this.energy+this.effect[1])
                        break
                        case 186:
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.battle.cardManagers[this.player].allEffect(2,14)
                            }
                        break
                        case 199:
                            this.battle.cardManagers[this.player].allEffect(0,15)
                            this.battle.cardManagers[this.player].allEffect(1,15)
                            this.battle.cardManagers[this.player].allEffect(2,15)
                        break
                        case 207:
                            this.battle.cardManagers[this.player].draw(this.effect[0])
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.battle.cardManagers[this.player].addRandom(2,0,3)
                            }
                        break
                        case 209:
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.battle.cardManagers[this.player].addRandomClassFree(2,0,2,0)
                            }
                        break
                        case 210:
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.battle.cardManagers[this.player].addRandomClassFree(2,0,2,1)
                            }
                        break
                        case 213:
                            this.battle.cardManagers[this.player].draw(this.effect[0])
                            this.userCombatant.statusEffect('Conditioning',this.effect[1])
                        break
                        case 214:
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.battle.cardManagers[this.player].randomEffect(2,2,[0])
                            }
                            this.battle.cardManagers[this.player].draw(this.effect[1])
                        break
                        case 227:
                            this.battle.cardManagers[this.player].hand.duplicate(this.effect[0])
                        break
                        case 229:
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.battle.cardManagers[this.player].addRandomClassFree(2,0,1,0)
                            }
                        break
                        case 230:
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.battle.cardManagers[this.player].addRandomClassFree(2,0,1,1)
                            }
                        break
                        case 232:
                            this.userCombatant.statusEffect('Attack Draw',this.effect[0])
                        break
                        case 233:
                            this.userCombatant.statusEffect('Combo on Block',this.effect[0])
                        break
                        case 253:
                            let amount2=this.battle.cardManagers[this.player].hand.cards.length
                            this.battle.cardManagers[this.player].allEffect(2,1)
                            for(let a=0,la=amount2+this.effect[0];a<la;a++){
                                this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                            }
                        break
                        case 254:
                            this.userCombatant.statusEffect('Card Play Block',this.effect[0])
                        break
                        case 259:
                            this.battle.energy.main[this.player]+=this.effect[0]
                            this.battle.cardManagers[this.player].hand.discard(this.effect[1])
                        break
                        case 276:
                            this.battle.cardManagers[this.player].hand.duplicate(this.effect[0])
                            this.battle.cardManagers[this.player].randomEffect(2,0)
                        break
                        case 279:
                            this.battle.cardManagers[this.player].drawPrice(this.effect[0],0)
                        break
                        case 284:
                            this.userCombatant.statusEffect('Energy Next Turn',this.effect[0])
                            this.userCombatant.statusEffect('Energy Next Turn Next Turn',this.effect[0])
                        break
                        case 285:
                            this.battle.cardManagers[this.player].draw(this.effect[0])
                            this.battle.cardManagers[this.player].hand.discard(this.effect[1])
                        break
                        case 289:
                            this.battle.cardManagers[this.player].draw(this.effect[0])
                            if(this.battle.cardManagers[this.player].hand.cards.length>0&&this.battle.cardManagers[this.player].hand.cards[this.battle.cardManagers[this.player].hand.cards.length-1].class==2){
                                this.userCombatant.addBlock(this.effect[1])
                            }
                        break
                        case 291:
                            if(this.battle.cardManagers[this.player].hand.cards.length<this.effect[0]){
                                this.battle.cardManagers[this.player].draw(this.effect[0]-this.battle.cardManagers[this.player].hand.cards.length)
                            }
                        break
                        case 294:
                            this.battle.cardManagers[this.player].allEffect(2,17)
                            this.userCombatant.statusEffect('No Draw',1)
                        break
                        case 298:
                            this.battle.cardManagers[this.player].hand.nightmare(this.effect[0])
                        break
                        case 300:
                            this.userCombatant.statusEffect('Draw Up',this.effect[0])
                            this.userCombatant.statusEffect('Turn Discard',this.effect[0])
                        break
                        case 302:
                            this.userCombatant.statusEffect('Intangible',this.effect[0])
                            this.userCombatant.statusEffect('Dexterity Per Turn',-this.effect[1])
                        break
                        case 305:
                            if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1){
                                this.userCombatant.statusEffect('Strength',this.effect[0])
                            }
                        break
                        case 308:
                            this.userCombatant.statusEffect('Draw Up',this.effect[0])
                            this.userCombatant.statusEffect('Lose Per Turn',this.effect[1])
                        break
                        case 309:
                            this.battle.cardManagers[this.player].allGroupEffect(20)
                        break
                        case 313:
                            this.battle.cardManagers[this.player].draw(this.effect[0])
                            if(this.battle.cardManagers[this.player].hand.cards.length>0&&this.battle.cardManagers[this.player].hand.cards[this.battle.cardManagers[this.player].hand.cards.length-1].class==1){
                                for(let a=0,la=this.effect[1];a<la;a++){
                                    this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                                }
                            }
                        break
                        case 315:
                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].hand.cards,0,-1,2,this.battle.cardManagers[this.player].hand)
                        break
                        case 317:
                            this.userCombatant.statusEffect('Intangible Next Turn',this.effect[0])
                            this.userCombatant.statusEffect('Energy Next Turn',this.effect[1])
                        break
                        case 318:
                            this.userCombatant.statusEffect('Exhaust Draw',this.effect[0])
                        break
                        case 334:
                            this.battle.energy.gen[this.player]+=this.effect[0]
                            this.userCombatant.statusEffect('Draw Up',-this.effect[1])
                        break
                        case 337:
                            this.battle.overlayManager.overlays[20][this.player].active=true
                            this.battle.overlayManager.overlays[20][this.player].activate()
                        break
                        case 338:
                            this.battle.overlayManager.overlays[21][this.player].active=true
                            this.battle.overlayManager.overlays[21][this.player].activate()
                        break
                        case 339:
                            this.battle.overlayManager.overlays[22][this.player].active=true
                            this.battle.overlayManager.overlays[22][this.player].activate()
                        break
                        case 340:
                            this.battle.overlayManager.overlays[23][this.player].active=true
                            this.battle.overlayManager.overlays[23][this.player].activate()
                        break
                        case 343:
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.battle.cardManagers[this.player].addRandomClassAllFreeShuffle(1,0,1,1)
                            }
                        break
                        case 344:
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.battle.cardManagers[this.player].addRandomClassAllFreeShuffle(1,0,2,1)
                            }
                        break
                        case 346:
                            for(let a=0;a<this.effect[0]*this.energy;a++){
                                this.battle.cardManagers[this.player].addRandomColor(2,0,0,3)
                            }
                        break
                        case 363:
                            this.userCombatant.heal(this.effect[0])
                            this.battle.cardManagers[this.player].hand.exhaust(this.effect[1])
                        break
                        case 387:
                            this.userCombatant.balance=0
                        break
                        case 390:
                            this.battle.cardManagers[this.player].draw(this.effect[0])
                            this.userCombatant.balance+=this.effect[1]
                        break
                        case 392:
                            this.userCombatant.statusEffect('Intangible',this.effect[0])
                            this.userCombatant.balance+=this.effect[1]
                        break
                        case 398:
                            this.battle.cardManagers[this.player].draw(this.effect[0])
                            this.battle.combatantManager.tick()
                        break
                        case 418:
                            this.userCombatant.statusEffect('Heal on Death',this.effect[0])
                        break
                        case 422:
                            this.userCombatant.statusEffect('Ignore Balance',1)
                        break
                        case 423:
                            this.userCombatant.statusEffect('Balance Energy',1)
                        break
                        case 431:
                            if(!this.userCombatant.armed){
                                for(let a=0,la=6;a<la;a++){
                                    let offset=transformDirection(0,-30+a*60)
                                    let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+offset[0],this.userCombatant.tilePosition.y+offset[1])
                                    if(index>=0&&this.battle.tileManager.tiles[index].type.includes(3)){
                                        this.battle.tileManager.tiles[index].anim.upPart[this.battle.tileManager.tiles[index].type.indexOf(3)]=false
                                        this.userCombatant.armed=true
                                        la=0
                                    }
                                }
                            }
                        break
                        case 451:
                            this.userCombatant.statusEffect('Temporary Draw',this.effect[0])
                        break
                        case 499:
                            this.battle.cardManagers[this.player].draw(this.effect[0])
                            this.battle.cardManagers[this.player].allGroupClaw(this.effect[1])
                        break
                        case 511:
                            this.battle.cardManagers[this.player].draw(this.effect[0]*this.userCombatant.getOrbNumber(-1))
                        break
                        case 512:
                            this.battle.cardManagers[this.player].draw(this.effect[0])
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.userCombatant.holdOrb(1)
                            }
                        break
                        case 519:
                            this.userCombatant.statusEffect('Focus',this.effect[0])
                        break
                        case 523:
                            this.userCombatant.statusEffect('Power Draw',this.effect[0])
                        break
                        case 524:
                            this.userCombatant.statusEffect('Random Power Per Turn',this.effect[0])
                        break
                        case 525:
                            this.userCombatant.statusEffect('Strength',this.effect[0])
                            this.userCombatant.statusEffect('Dexterity',this.effect[0])
                            this.userCombatant.statusEffect('Focus',-this.effect[0])
                        break
                        case 527:
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.battle.cardManagers[this.id].addRandomClass(2,0,4,0)
                            }
                        break
                        case 528:
                            this.userCombatant.statusEffect('Power Basic',this.effect[0])
                        break
                        case 529:
                            this.userCombatant.statusEffect('Damage Taken Basic',this.effect[0])
                        break
                        case 530:
                            this.userCombatant.statusEffect('Random Common Per Turn',this.effect[0])
                        break
                        
                    }
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 9: case 333:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                    if(this.targetClass==2){
                        this.targetCombatant.goal.anim.direction=this.relativeDirection
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
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                    if(this.targetClass==2){
                        this.targetCombatant.moveTilePosition(this.tilePosition.x,this.tilePosition.y)
                        this.battle.activate(1,this.targetCombatant.id)
                    }
                    this.remove=true
                }
            break
            case -13: case -21: case 10: case 64: case 72: case 73: case 74: case 164: case 166: case 167:
            case 168: case 169: case 170: case 171: case 180: case 195: case 202: case 224: case 283: case 349:
            case 360: case 369: case 380: case 391: case 442: case 456: case 470:
                if(this.timer==1){
                    this.userCombatant.startAnimation(6)
                }
                this.userCombatant.runAnimation(1/10,6)
                if(this.timer==10){
                    switch(this.type){
                        case -13:
                            this.userCombatant.takeDamage(this.effect[0])
                        break
                        case -21:
                            this.userCombatant.takeDamage(this.effect[0])
                            this.battle.cardManagers[this.player].draw(this.effect[1])
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
                        case 164:
                            this.battle.currency.money[this.player]+=this.effect[0]
                            this.battle.currency.money[this.targetCombatant.id]-=this.effect[0]
                        break
                        case 166:
                            this.battle.cardManagers[this.player].hand.add(findName('Riot\nShield',types.card),0,this.color)
                            this.battle.cardManagers[this.player].hand.add(findName('Pepper\nSpray',types.card),0,this.color)
                            this.battle.cardManagers[this.player].hand.add(findName('Shock\nBaton',types.card),0,this.color)
                        break
                        case 167:
                            this.number=floor(random(0,3))
                            this.battle.cardManagers[this.player].hand.add(findName('Riot\nShield',types.card),this.number==0?1:0,this.color)
                            this.battle.cardManagers[this.player].hand.add(findName('Pepper\nSpray',types.card),this.number==1?1:0,this.color)
                            this.battle.cardManagers[this.player].hand.add(findName('Shock\nBaton',types.card),this.number==2?1:0,this.color)
                        break
                        case 168:
                            this.battle.cardManagers[this.player].hand.add(findName('Flamethrower',types.card),0,this.color)
                            this.battle.cardManagers[this.player].hand.add(findName('Impact\nGrenade',types.card),0,this.color)
                            this.battle.cardManagers[this.player].hand.add(findName('Landmine',types.card),0,this.color)
                        break
                        case 169:
                            this.number=floor(random(0,3))
                            this.battle.cardManagers[this.player].hand.add(findName('Flamethrower',types.card),this.number==0?1:0,this.color)
                            this.battle.cardManagers[this.player].hand.add(findName('Impact\nGrenade',types.card),this.number==1?1:0,this.color)
                            this.battle.cardManagers[this.player].hand.add(findName('Landmine',types.card),this.number==2?1:0,this.color)
                        break
                        case 170:
                            this.battle.cardManagers[this.player].hand.add(findName('Submachine',types.card),0,this.color)
                            this.battle.cardManagers[this.player].hand.add(findName('Antitank\nRocket',types.card),0,this.color)
                            this.battle.cardManagers[this.player].hand.add(findName('Ammo\nBox',types.card),0,this.color)
                        break
                        case 171:
                            this.number=floor(random(0,3))
                            this.battle.cardManagers[this.player].hand.add(findName('Submachine',types.card),this.number==0?1:0,this.color)
                            this.battle.cardManagers[this.player].hand.add(findName('Antitank\nRocket',types.card),this.number==1?1:0,this.color)
                            this.battle.cardManagers[this.player].hand.add(findName('Ammo\nBox',types.card),this.number==2?1:0,this.color)
                        break
                        case 180:
                            this.userCombatant.statusEffect('Cancel Exhaust',this.effect[0])
                        break
                        case 195:
                            this.userCombatant.heal(this.combo*this.effect[0])
                            this.userCombatant.combo=0
                        break
                        case 202:
                            this.userCombatant.combo+=this.effect[0]
                        break
                        case 224:
                            this.userCombatant.heal(this.effect[0]*this.energy)
                        break
                        case 283:
                            this.battle.energy.main[this.player]+=this.effect[0]
                            this.userCombatant.takeDamage(this.effect[1])
                        break
                        case 349:
                            this.userCombatant.heal(this.userCombatant.base.life-this.userCombatant.life)
                        break
                        case 360:
                            this.userCombatant.gainMaxHP(this.effect[0])
                        break
                        case 369:
                            this.userCombatant.statusEffect('Regeneration',this.effect[0])
                        break
                        case 380:
                            this.userCombatant.statusEffect('Strength',this.effect[0])
                            this.userCombatant.loseMaxHP(this.effect[1])
                        break
                        case 391:
                            this.userCombatant.heal(this.effect[0]*this.userCombatant.balance)
                            this.userCombatant.balance=0
                        break
                        case 442:
                            if(this.userCombatant.getStatus('Bleed')>0){
                                this.userCombatant.heal(this.effect[0]*this.userCombatant.getStatus('Bleed'))
                                this.userCombatant.status.main[findList('Bleed',this.userCombatant.status.name)]=0
                            }
                        break
                        case 456:
                            for(let a=0,la=this.battle.itemManager.items[this.player].length;a<la;a++){
                                if(this.battle.itemManager.items[this.player][a].type>1){
                                    this.userCombatant.gainMaxHP(this.effect[0])
                                    this.battle.itemManager.total[this.player]--
                                    this.battle.itemManager.items[this.player][a].type=1
                                    this.battle.itemManager.items[this.player][a].refresh()
                                }
                            }
                        break
                        case 470:
                            this.userCombatant.gainMaxHP(this.effect[0]*this.energy)
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
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 14: case 448: case 458:
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
                }else if(this.type==448&&this.timer==15&&this.targetDistance==2){
                    let middle=this.battle.combatantManager.getCombatantIndex(this.targetTile.tilePosition.x/2+this.tilePosition.x/2,this.targetTile.tilePosition.y/2+this.tilePosition.y/2)
                    if(middle>=0){
                        this.battle.combatantManager.combatants[middle].statusEffect('Bleed',this.effect[0])
                    }
                }else if(this.type==458&&this.timer==15&&this.targetDistance==2){
                    this.battle.cardManagers[this.player].hand.add(findName('Chain\nShift',types.card),this.level,this.color)
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
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
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
            case 16: case 436:
                if(this.timer==1){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(9)
                }else if(this.timer==10){
                    switch(this.type){
                        case 436:
                            this.targetCombatant.statusEffect('Bleed',this.effect[0])
                        break
                        default:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        break
                    }
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
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
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
            case 18: case 394: case 395: case 420: case 434:
                if(this.timer==1){
                    this.userCombatant.startAnimation(10)
                }
                this.userCombatant.runAnimation(1/10,10)
                if(this.timer==10){
                    switch(this.type){
                        case 394:
                            this.battle.combatantManager.damageArea(this.effect[0],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                            this.userCombatant.balance+=this.effect[1]
                        break
                        case 395:
                            this.battle.combatantManager.statusAreaBlock('Bleed',this.effect[0],this.userCombatant.team,this.userCombatant.tilePosition)
                        break
                        case 420:
                            let total=this.battle.combatantManager.damageArea(this.effect[0],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                            this.userCombatant.heal(this.effect[0]*total)
                        break
                        case 434:
                            this.battle.combatantManager.damageArea(this.effect[0],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                            this.battle.combatantManager.intentNerfArea(1,this.effect[1],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                        break
                        default:
                            this.battle.combatantManager.damageArea(this.effect[0],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                        break
                    }
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 19:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                    let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x*2-this.targetCombatant.tilePosition.x,this.userCombatant.tilePosition.y*2-this.targetCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
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
            case 24: case 348:
                if(this.timer==1){
                    this.userCombatant.startAnimation(12)
                }
                this.userCombatant.runAnimation(1/10,12)
                if(this.timer==10){
                    switch(this.type){
                        case 24:
                            this.battle.turnManager.loadEnemyAttack(this.targetCombatant.id)
                        break
                        case 348:
                            this.targetCombatant.goal.anim.direction+=180
                            this.battle.updateTargetting()
                        break
                    }
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
            case 31:
                if(this.timer==1){
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[a]=this.targetCombatant[a].getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                            this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
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
            case 33: case 127: case 130: case 437: case 504:
                if(this.timer==1&&this.targetDistance>1){
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
                    switch(this.type){
                        case 130:
                            this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*this.combo,this.user)
                            this.userCombatant.combo=0
                        break
                        default:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        break
                    }
                    switch(this.type){
                        case 127:
                            this.targetCombatant.statusEffect('Vulnerable',this.effect[1])
                        break
                        case 437:
                            if(this.userCombatant.armed){
                                this.userCombatant.armed=false
                            }
                        break
                        case 504:
                            this.battle.cardManagers[this.player].allGroupClaw(this.effect[0])
                        break
                    }
                }else if(this.timer>=15*this.targetDistance+15){
                    this.remove=true
                    this.battle.activate(1,this.userCombatant.id)
                }
            break
            case 36: case 39: case 47: case 384: case 412: case 413: case 441:
                if(this.timer==1){
                    this.userCombatant.startAnimation(16)
                }
                this.userCombatant.runAnimation(1/30,16)
                if(this.timer==15){
                    switch(this.type){
                        case 36:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        break
                        case 39:
                            this.targetCombatant.statusEffect('Bleed',this.effect[0])
                        break
                        case 47:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.targetCombatant.statusEffect('Bleed',this.effect[1])
                        break
                        case 384:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.targetCombatant.statusEffect('Bleed',this.effect[1])
                            this.battle.cardManagers[this.player].hand.discard(this.effect[2])
                        break
                        case 412:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.targetCombatant.statusEffect('Bleed',this.effect[1])
                            if(this.userCombatant.armed){
                                this.userCombatant.armed=false
                                this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)].addType(3)
                            }
                        break
                        case 413:
                            this.targetCombatant.statusEffect('Bleed',this.effect[0])
                            if(this.userCombatant.armed){
                                this.userCombatant.armed=false
                                this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)].addType(3)
                            }
                        break
                        case 441:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.targetCombatant.statusEffect('Bleed',this.effect[1])
                            this.userCombatant.statusEffect('Bleed',this.effect[2])
                        break
                    }
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 37: case 432:
                if(this.timer==1){
                    this.userCombatant.startAnimation(20)
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/15,20)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[this.userCombatant.animSet.hand].bottom.y,3,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),5*this.targetDistance-2]))
                    if(this.userCombatant.armed){
                        this.userCombatant.armed=false
                        this.procedure[0]=1
                    }else{
                        this.procedure[0]=0
                    }
                }else if(this.timer==10*this.targetDistance+15&&this.procedure[0]==1){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    switch(this.type){
                        case 37:
                            this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)].addType(3)
                        break
                        case 432:
                            this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)].addType(3)
                        break
                    }
                }else if(this.timer>=10*this.targetDistance+25){
                    this.remove=true
                }
            break
            case 38: case 79: case 81: case 84: case 85: case 86: case 104: case 145: case 148: case 158:
            case 159: case 160: case 161: case 162: case 163: case 173: case 177: case 272: case 292: case 295:
            case 297: case 314: case 316: case 326: case 351: case 352: case 382: case 408: case 419: case 433:
            case 452: case 472: case 474: case 482:
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
                        case 145:
                            this.targetCombatant.heal(this.effect[0])
                        break
                        case 148:
                            this.userCombatant.heal(this.effect[0])
                            this.targetCombatant.safeDamage(this.effect[1])
                        break
                        case 158:
                            this.battle.cardManagers[this.targetCombatant.id].tempDraw+=this.effect[0]
                        break
                        case 159:
                            this.targetCombatant.statusEffect('Strength',this.effect[0])
                        break
                        case 160:
                            this.targetCombatant.statusEffect('Energy Next Turn',this.effect[0])
                        break
                        case 161:
                            this.battle.cardManagers[this.player].allEffect(2,13)
                        break
                        case 162:
                            this.targetCombatant.statusEffect('Buffer',this.effect[0])
                        break
                        case 163:
                            this.battle.cardManagers[this.player].deStatus(this.effect[0])
                        break
                        case 173:
                            this.battle.turnManager.loadEnemyRandomMove(this.targetCombatant.id)
                        break
                        case 177:
                            this.targetTile.addType(2)
                        break
                        case 272:
                            this.targetCombatant.randomStatusInstant(this.effect[0],[1])
                        break
                        case 292:
                            this.targetCombatant.statusEffect('Weak',this.effect[0])
                            this.userCombatant.addBlock(this.effect[1])
                        break
                        case 295:
                            this.targetCombatant.statusEffect('Explode on Death',1)
                        break
                        case 297:
                            this.targetCombatant.statusEffect('Strength',-this.effect[0])
                            this.targetCombatant.statusEffect('Weak',this.effect[1])
                        break
                        case 314:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            if(this.targetCombatant.life<=0){
                                this.battle.combatantManager.damageArea(this.effect[1],this.user,-1,this.targetCombatant.tilePosition)
                            }
                        break
                        case 316:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.targetCombatant.randomStatusInstant(this.effect[1],[1])
                        break
                        case 326:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1){
                                for(let a=0,la=this.effect[1];a<la;a++){
                                    this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                                }
                            }
                        break
                        case 351:
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.battle.cardManagers[this.targetCombatant.id].addRandomAll(2,0,3)
                            }
                        break
                        case 352:
                            this.battle.cardManagers[this.targetCombatant.id].hand.add(findName('Strike\nAid',types.card),0,this.color)
                            this.battle.cardManagers[this.targetCombatant.id].hand.add(findName('Defend\nAid',types.card),0,this.color)
                            this.battle.cardManagers[this.targetCombatant.id].hand.add(findName('Step\nAid',types.card),0,this.color)
                        break
                        case 382:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.targetCombatant.statusEffect('Confusion',this.effect[1])
                            this.battle.updateTargetting()
                        break
                        case 408:
                            this.targetCombatant.multiplyStatus('Bleed',this.effect[0])
                        break
                        case 419:
                            this.targetCombatant.takeDamage(this.effect[0]*this.battle.cardManagers[this.player].hand.cards.length,this.user)
                            this.battle.cardManagers[this.player].allEffect(2,22)
                        break
                        case 433:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==2){
                                this.targetCombatant.attack[this.targetCombatant.intent].effect[0]=max(0,this.targetCombatant.attack[this.targetCombatant.intent].effect[0]-this.effect[1])
                            }
                        break
                        case 452:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.battle.dropDraw(this.player,findName('Dazed',types.card),this.level,game.playerNumber+1)
                        break
                        case 472:
                            this.targetTile.addType(19)
                        break
                        case 474:
                            this.targetTile.addType(19)
                            this.battle.tileManager.typeArea(19,this.targetTile.tilePosition)
                        break
                        case 482:
                            this.targetTile.addType(19)
                            for(let a=0,la=5;a<la;a++){
                                let index=this.battle.tileManager.getTileIndex(this.targetTile.tilePosition.x*(a+2)-this.userCombatant.tilePosition.x*(a+1),this.targetTile.tilePosition.y*(a+2)-this.userCombatant.tilePosition.y*(a+1))
                                if(index>=0){
                                    this.battle.tileManager.tiles[index].addType(19)
                                }
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
                        this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                            this.targetCombatant.takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
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
                            this.procedure[1]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                                this.targetCombatant.takeDamage(game.collisionDamage,-1)
                                let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                                if(index>=0){
                                    this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
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
                        this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                            this.targetCombatant.takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
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
                            this.procedure[1]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                                this.targetCombatant.takeDamage(game.collisionDamage,-1)
                                let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                                if(index>=0){
                                    this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
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
            case 54: case 87: case 486:
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
            case 66: case 68: case 421: case 465: case 466: case 467: case 468:
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
                        case 421:
                            if(this.targetTile.type.includes(3)&&!this.userCombatant.armed){
                                this.targetTile.anim.upPart[this.targetTile.type.indexOf(3)]=false
                                this.userCombatant.armed=true
                            }
                        break
                        case 465:
                            this.targetCombatant.goal.anim.direction-=60
                            this.battle.updateTargetting()
                        break
                        case 466:
                            this.targetCombatant.goal.anim.direction+=60
                            this.battle.updateTargetting()
                        break
                        case 467:
                            this.targetCombatant.goal.anim.direction-=120
                            this.battle.updateTargetting()
                        break
                        case 468:
                            this.targetCombatant.goal.anim.direction+=120
                            this.battle.updateTargetting()
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
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetTile.position.x,this.targetTile.position.y,10,[10]))
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
            case 489:
                if(this.timer==1){
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        let index=this.targetDistance[a]==1?this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y):this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant[a].tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                        this.procedure[a]=this.targetCombatant[a].getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                                this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                                let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                                if(index>=0){
                                    this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
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
                                this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                                let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant[a].tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                                if(index>=0){
                                    this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
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
            case -14: case 102: case 112: case 114: case 219: case 270: case 324: case 325: case 341: case 403:
            case 404: case 405: case 426:
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
                        case 112:
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                            }
                        break
                        case 114:
                            this.battle.itemManager.addRandomItem(this.player)
                        break
                        case 219:
                            this.userCombatant.statusEffect('Shiv Per Turn',this.effect[0])
                        break
                        case 270:
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                            }
                            this.battle.cardManagers[this.player].draw(this.effect[1])
                        break
                        case 324:
                            for(let a=0,la=this.battle.cardManagers[this.player].hand.cards.length;a<la;a++){
                                if(this.battle.cardManagers[this.player].hand.cards[a].name=='Shiv'){
                                    this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                                }
                            }
                        break
                        case 325:
                            for(let a=0,la=this.effect[0]*this.energy;a<la;a++){
                                this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                            }
                        break
                        case 341:
                            this.battle.turnManager.loadEnemyPoint(this.targetTile)
                        break
                        case 403:
                            this.userCombatant.statusEffect('Attack Bleed Turn',this.effect[0])
                        break
                        case 404:
                            this.userCombatant.statusEffect('Single Attack Bleed',this.effect[0])
                        break
                        case 405:
                            this.userCombatant.statusEffect('Attack Bleed Combat',this.effect[0])
                        break
                        case 426:
                            this.userCombatant.statusEffect('Strength',this.effect[0])
                            this.userCombatant.statusEffect('Dexterity',this.effect[1])
                            if(this.userCombatant.armed){
                                this.userCombatant.armed=false
                            }
                        break
                    }
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 132: case 136: case 290:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    this.userCombatant.startAnimation(2)
                }
                if(this.timer>=15*this.targetDistance-14){
                    this.userCombatant.runAnimation(1/10,2)
                }else{
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                }else if(this.timer==15*this.targetDistance-5||this.timer==15*this.targetDistance||this.timer==15*this.targetDistance+5){
                    switch(this.type){
                        case 132:
                            this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*this.combo,this.user)
                        break
                        default:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        break
                    }
                    if(this.timer==15*this.targetDistance+5){
                        switch(this.type){
                            case 132:
                                this.userCombatant.combo=0
                            break
                        }
                    }
                }else if(this.timer>=15*this.targetDistance+15){
                    if(this.targetDistance>1){
                        this.battle.activate(1,this.userCombatant.id)
                    }
                    this.remove=true
                }
            break
            case 133:
                if(this.timer==1){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x*2-this.targetCombatant.tilePosition.x,this.userCombatant.tilePosition.y*2-this.targetCombatant.tilePosition.y)
                    this.userCombatant.goal.anim.direction+=180
                    this.procedure[1]=index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.procedure[2]=false
                    this.procedure[3]=false
                    this.userCombatant.startAnimation(28)
                }else if(this.timer==10){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }
                if(this.timer<=20){
                    this.userCombatant.runAnimation(1/10,28)
                }
                if(this.procedure[0]==2){
                    if(this.timer>10&&this.timer<=18){
                        this.targetCombatant.moveTile(this.direction,this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                    }else if(this.timer>18&&this.timer<=26){
                        this.targetCombatant.moveTile(this.direction,-this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                    }
                    if(this.timer==26){
                        this.procedure[2]=true
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
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer==26){
                        this.procedure[2]=true
                    }
                }else{
                    if(this.timer>10&&this.timer<=20){
                        this.targetCombatant.moveTile(this.direction,this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }
                    if(this.timer==20){
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.battle.activate(1,this.targetCombatant.id)
                        this.procedure[2]=true
                    }
                }
                if(this.procedure[0]==1&&this.timer>=20){
                    this.procedure[3]=true
                }else if(this.procedure[0]==0){
                    if(this.timer>20){
                        this.userCombatant.runAnimation(1/10,0)
                        this.userCombatant.moveTile(this.direction,-this.distance/10)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                    }
                    if(this.timer==30){
                        if(this.procedure[0]==0){
                            this.userCombatant.moveTilePosition(this.userCombatant.tilePosition.x*3/2-this.targetCombatant.tilePosition.x/2,this.userCombatant.tilePosition.y*3/2-this.targetCombatant.tilePosition.y/2)
                        }else{
                            this.userCombatant.moveTilePosition(this.userCombatant.tilePosition.x*2-this.targetCombatant.tilePosition.x,this.userCombatant.tilePosition.y*2-this.targetCombatant.tilePosition.y)
                        }
                        this.battle.activate(1,this.userCombatant.id)
                        this.procedure[3]=true
                    }
                }
                if(this.procedure[2]&&this.procedure[3]){
                    this.remove=true
                }
            break
            case 134:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    let offset=transformDirection(0,this.relativeDirection-60)
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                    this.procedure[1]=atan2(sin(this.relativeDirection-60)*6/5,cos(this.relativeDirection-60)/sqrt(3))
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(9)
                    if(index>=0){
                        this.distance=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant.position.x,this.targetCombatant.position.y)
                    }
                }
                if(this.timer>=15*this.targetDistance-14&&this.timer<15*this.targetDistance+6){
                    this.userCombatant.runAnimation(1/10,9)
                }else if(this.timer<15*this.targetDistance-14){
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer==15*this.targetDistance-5){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    if(this.type==35){
                        this.userCombatant.combo++
                    }
                }else if(this.timer>=15*this.targetDistance+15){
                    this.remove=true
                }
                if(this.procedure[0]==2){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-60,this.relativeDistance/40/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-60,-this.relativeDistance/40/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-60,this.relativeDistance/10/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-60,-this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer==15*this.targetDistance+3){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let offset=transformDirection(0,this.relativeDirection+60)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else{
                    if(this.timer>15*this.targetDistance-5){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-60,this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+5){
                        let offset=transformDirection(0,this.relativeDirection-60)
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 135:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    let offset=transformDirection(0,this.relativeDirection+60)
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                    this.procedure[1]=atan2(sin(this.relativeDirection+60)*6/5,cos(this.relativeDirection+60)/sqrt(3))
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(9)
                    if(index>=0){
                        this.distance=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant.position.x,this.targetCombatant.position.y)
                    }
                }
                if(this.timer>=15*this.targetDistance-14&&this.timer<15*this.targetDistance+6){
                    this.userCombatant.runAnimation(1/10,9)
                }else if(this.timer<15*this.targetDistance-14){
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer==15*this.targetDistance-5){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    if(this.type==35){
                        this.userCombatant.combo++
                    }
                }else if(this.timer>=15*this.targetDistance+15){
                    this.remove=true
                }
                if(this.procedure[0]==2){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+60,this.relativeDistance/40/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+60,-this.relativeDistance/40/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+60,this.relativeDistance/10/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+60,-this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer==15*this.targetDistance+3){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let offset=transformDirection(0,this.relativeDirection+60)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else{
                    if(this.timer>15*this.targetDistance-5){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+60,this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+5){
                        let offset=transformDirection(0,this.relativeDirection+60)
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 138: case 139: case 175: case 400: case 453: case 516:
                if(this.timer==1){
                    this.userCombatant.startAnimation(29)
                }
                this.userCombatant.runAnimation(1/30,29)
                if(this.timer==15){
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        switch(this.type){
                            case 139:
                                this.targetCombatant[a].takeDamage(this.effect[0]+this.effect[1]*this.combo,this.user)
                            break
                            case 175:
                                this.targetCombatant[a].statusEffect('Burn',this.effect[0])
                            break
                            case 453:
                                this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                                this.targetCombatant[a].statusEffect('Bleed',this.effect[1])
                            break
                            case 516:
                                this.battle.cardManagers[this.player].draw(this.effect[1])
                            break
                            default:
                                this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                            break
                        }
                    }
                    switch(this.type){
                        case 139:
                            this.userCombatant.combo=0
                        break
                        case 400:
                            this.userCombatant.balance+=this.effect[1]
                        break
                    }
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 143:
                if(this.timer==1){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(2)
                }else if(this.timer==10||this.timer==30){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }else if(this.timer==21){
                    this.userCombatant.startAnimation(9)
                }
                if(this.timer<=20){
                    this.userCombatant.runAnimation(1/20,2)
                }else if(this.timer<=40){
                    this.userCombatant.runAnimation(1/10,9)
                }
                if(this.procedure[0]==2){
                    if(this.timer>30&&this.timer<=38){
                        this.targetCombatant.moveTile(this.direction,this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                    }else if(this.timer>38&&this.timer<=46){
                        this.targetCombatant.moveTile(this.direction,-this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                    }
                    if(this.timer>=46){
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>30&&this.timer<=38){
                        this.targetCombatant.moveTile(this.direction,this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }else if(this.timer>38&&this.timer<=46){
                        this.targetCombatant.moveTile(this.direction,-this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                    }
                    if(this.timer==38){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=46){
                        this.remove=true
                    }
                }else{
                    if(this.timer>30){
                        this.targetCombatant.moveTile(this.direction,this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }
                    if(this.timer>=40){
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 147:
                if(this.timer==1){
                    this.userCombatant.startAnimation(19)
                    this.targetCombatant.startAnimation(19)
                }
                this.userCombatant.runAnimation(1/20,19)
                this.targetCombatant.runAnimation(1/20,19)
                if(this.timer==10){
                    let userPosition={x:this.userCombatant.tilePosition.x,y:this.userCombatant.tilePosition.y}
                    this.userCombatant.moveTile(this.direction,this.distance)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)
                    this.targetCombatant.moveTile(this.direction,-this.distance)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance)
                    this.targetCombatant.moveTilePosition(userPosition.x,userPosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 153:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }
                this.userCombatant.moveTile(this.direction,this.distance/(24*this.targetDistance))
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(24*this.targetDistance))
                this.userCombatant.runAnimation(1/12,0)
                if(this.timer>=24*this.targetDistance){
                    this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                    this.remove=true
                }
            break
            case 165:
                if(this.timer==1){
                    this.targetCombatant.startAnimation(19)
                }
                this.targetCombatant.runAnimation(1/20,19)
                if(this.timer==10){
                    if(this.type==87){
                        this.battle.combatantManager.clearTile(this.targetTile)
                    }
                    this.targetCombatant.moveTile(this.direction,this.distance)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance)
                    this.targetCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                    this.battle.activate(1,this.targetCombatant.id)
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 176:
                if(this.timer==1){
                    this.userCombatant.startAnimation(15)
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/15,15)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[this.userCombatant.animSet.hand].bottom.y,7,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),5*this.targetDistance-2]))
                }else if(this.timer==10*this.targetDistance+15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y,10,[10]))
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    this.battle.combatantManager.damageAreaID(this.effect[0],this.userCombatant.id,this.targetCombatant.id,this.targetCombatant.tilePosition,2)
                }else if(this.timer>=10*this.targetDistance+25){
                    this.remove=true
                }
            break
            case 178:
                if(this.timer==1){
                    this.userCombatant.startAnimation(25)
                }
                if(this.timer<=10||this.timer>20&&this.timer<=30){
                    this.userCombatant.runAnimation(1/10,25)
                }
                if(this.timer==15||this.timer==20||this.timer==25||this.timer==30){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),2.5*this.targetDistance-1]))
                }
                if(this.timer==5*this.targetDistance+15){
                    this.targetCombatant.takeDamage(this.effect[0],this.user,1)
                }else if(this.timer==5*this.targetDistance+20){
                    this.targetCombatant.takeDamage(this.effect[0]-1,this.user,1)
                }else if(this.timer==5*this.targetDistance+25){
                    this.targetCombatant.takeDamage(this.effect[0]-2,this.user,1)
                }else if(this.timer==5*this.targetDistance+30){
                    this.targetCombatant.takeDamage(this.effect[0]-3,this.user,1)
                }else if(this.timer>=max(45,5*this.targetDistance+40)){
                    this.remove=true
                }
            break
            case 179:
                if(this.targetDistance==1){
                    if(this.timer==1){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.userCombatant.startAnimation(2)
                    }else if(this.timer==10){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }
                    if(this.timer<=20){
                        this.userCombatant.runAnimation(1/20,2)
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
                            this.targetCombatant.takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
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
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(25)
                    }
                    if(this.timer<=30){
                        this.userCombatant.runAnimation(1/15,25)
                    }
                    if(this.timer==15){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,32,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),5*this.targetDistance-2]))
                    }else if(this.timer==10*this.targetDistance+15){
                        this.battle.combatantManager.damageArea(this.effect[0],this.user,-1,this.targetCombatant.tilePosition)
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y,2,[8]))
                    }else if(this.timer>=10*this.targetDistance+25){
                        this.remove=true
                    }
                }
            break
            case 188:
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                }
                this.userCombatant.runAnimation(1/30,2)
                if(this.timer==15){
                    this.targetCombatant.statusEffect('Damage Taken Up',this.effect[0])
                    this.targetCombatant.statusEffect('Strength',this.effect[1])
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 201:
                if(this.timer==1){
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[a]=this.targetCombatant[a].getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    }
                    this.userCombatant.startAnimation(31)
                }
                if(this.timer<=15){
                    this.userCombatant.runAnimation(2/15,31)
                }
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    if(this.timer==10){
                        this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                    }
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
                            this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
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
            case 208:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    this.userCombatant.startAnimation(2)
                }
                if(this.timer>=15*this.targetDistance-14){
                    this.userCombatant.runAnimation(1/10,2)
                }else{
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                }else if(this.timer==15*this.targetDistance-6||this.timer==15*this.targetDistance-2||this.timer==15*this.targetDistance+2||this.timer==15*this.targetDistance+6){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }else if(this.timer>=15*this.targetDistance+15){
                    this.battle.activate(1,this.userCombatant.id)
                    this.remove=true
                }
            break
            case 211: case 501:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    this.userCombatant.startAnimation(2)
                }
                if(this.timer>=15*this.targetDistance-14){
                    this.userCombatant.runAnimation(1/15,2)
                }else{
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                }else if(this.timer==15*this.targetDistance-3||this.timer==15*this.targetDistance+3){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    if(this.timer==15*this.targetDistance-3){
                        switch(this.type){
                            case 211:
                                this.userCombatant.statusEffect('Dodge',this.effect[1])
                            break
                            case 501:
                                this.battle.cardManagers[this.player].allGroupClaw(this.effect[1])
                            break
                        }
                    }
                }else if(this.timer>=15*this.targetDistance+15){
                    this.battle.activate(1,this.userCombatant.id)
                    this.remove=true
                }
            break
            case 217:
                if(this.timer==1){
                    this.userCombatant.startAnimation(15)
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/15,15)
                }
                if(this.timer==15||this.timer==20||this.timer==25){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,35,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),5*this.targetDistance-2]))
                }
                if(this.timer==10*this.targetDistance+15||this.timer==10*this.targetDistance+20||this.timer==10*this.targetDistance+25){
                    this.targetCombatant.takeDamage(this.effect[0],this.user,1)
                }else if(this.timer>=10*this.targetDistance+35){
                    this.remove=true
                }
            break
            case 218:
                if(this.timer==1){
                    this.userCombatant.startAnimation(15)
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/15,15)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,35,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),5*this.targetDistance-2]))
                }else if(this.timer==10*this.targetDistance+15){
                    this.targetCombatant.takeDamage(this.effect[0],this.user,1)
                    this.battle.cardManagers[this.player].draw(this.effect[1])
                    this.battle.cardManagers[this.player].hand.discard(this.effect[2])
                }else if(this.timer>=10*this.targetDistance+25){
                    this.remove=true
                }
            break
            case 222:
                if(this.timer==1){
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[a]=this.targetCombatant[a].getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    }
                    this.userCombatant.startAnimation(31)
                }
                if(this.timer<=15){
                    this.userCombatant.runAnimation(2/15,31)
                }else{
                    this.remove=true
                }
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    if(this.timer==10){
                        this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                    }
                }
            break
            case 236:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    let offset=transformDirection(0,this.relativeDirection-120)
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                    this.procedure[1]=atan2(sin(this.relativeDirection-120)*6/5,cos(this.relativeDirection-120)/sqrt(3))
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(9)
                    if(index>=0){
                        this.distance=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant.position.x,this.targetCombatant.position.y)
                    }
                }
                if(this.timer>=15*this.targetDistance-14&&this.timer<15*this.targetDistance+6){
                    this.userCombatant.runAnimation(1/10,9)
                }else if(this.timer<15*this.targetDistance-14){
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer==15*this.targetDistance-5){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    if(this.type==35){
                        this.userCombatant.combo++
                    }
                }else if(this.timer>=15*this.targetDistance+15){
                    this.remove=true
                }
                if(this.procedure[0]==2){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-120,this.relativeDistance/40/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-120,-this.relativeDistance/40/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-120,this.relativeDistance/10/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-120,-this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer==15*this.targetDistance+3){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let offset=transformDirection(0,this.relativeDirection-120)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else{
                    if(this.timer>15*this.targetDistance-5){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-120,this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+5){
                        let offset=transformDirection(0,this.relativeDirection-120)
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 237:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    let offset=transformDirection(0,this.relativeDirection+120)
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                    this.procedure[1]=atan2(sin(this.relativeDirection+120)*6/5,cos(this.relativeDirection+120)/sqrt(3))
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(9)
                    if(index>=0){
                        this.distance=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant.position.x,this.targetCombatant.position.y)
                    }
                }
                if(this.timer>=15*this.targetDistance-14&&this.timer<15*this.targetDistance+6){
                    this.userCombatant.runAnimation(1/10,9)
                }else if(this.timer<15*this.targetDistance-14){
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer==15*this.targetDistance-5){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    if(this.type==35){
                        this.userCombatant.combo++
                    }
                }else if(this.timer>=15*this.targetDistance+15){
                    this.remove=true
                }
                if(this.procedure[0]==2){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+120,this.relativeDistance/40/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+120,-this.relativeDistance/40/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+120,this.relativeDistance/10/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+120,-this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer==15*this.targetDistance+3){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let offset=transformDirection(0,this.relativeDirection+120)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else{
                    if(this.timer>15*this.targetDistance-5){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+120,this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+5){
                        let offset=transformDirection(0,this.relativeDirection+120)
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 241:
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                    let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x*2-this.targetCombatant.tilePosition.x,this.userCombatant.tilePosition.y*2-this.targetCombatant.tilePosition.y)
                    this.procedure[0]=index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/30,2)
                }
                if(this.timer==15){
                    this.targetCombatant.takeDamage(this.procedure[0]==1?this.effect[0]+this.effect[1]:this.effect[0],this.user)
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
            case 243:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==-19+this.targetDistance*15){
                    this.userCombatant.startAnimation(3)
                }
                if(this.timer<=10){
                    this.userCombatant.runAnimation(1/10,0)
                }else if(this.timer<=-20+this.targetDistance*15){
                    this.userCombatant.runAnimation(1/15,0)
                }else if(this.timer<=this.targetDistance*15){
                    this.userCombatant.runAnimation(1/10,3)
                }
                if(this.timer==-20+this.targetDistance*15){
                    this.targetCombatant.goal.anim.direction=this.relativeDirection+180
                }
                if(this.timer<=-20+this.targetDistance*15){
                    this.userCombatant.moveTile(this.direction,this.distance/15/this.targetDistance)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/15/this.targetDistance)
                }else if(this.timer>-10+this.targetDistance*15&&this.timer<=this.targetDistance*15){
                    this.userCombatant.moveTile(this.direction,-this.distance/15/this.targetDistance)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/15/this.targetDistance)
                    this.targetCombatant.moveTile(this.direction,-this.distance/10/this.targetDistance)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10/this.targetDistance)
                }
                if(this.timer==this.targetDistance*15-35){
                    this.userCombatant.moveTilePosition(this.userCombatant.tilePosition.x*(1-1/this.targetDistance)+this.targetCombatant.tilePosition.x/this.targetDistance,this.userCombatant.tilePosition.y*(1-1/this.targetDistance)+this.targetCombatant.tilePosition.y/this.targetDistance)
                }
                if(this.timer>=this.targetDistance*15){
                    this.targetCombatant.moveTilePosition(round(this.targetCombatant.tilePosition.x/2+this.userCombatant.tilePosition.x/2),round(this.targetCombatant.tilePosition.y/2+this.userCombatant.tilePosition.y/2))
                    this.battle.activate(1,this.targetCombatant.id)
                    this.remove=true
                }
            break
            case 244:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    let offset=transformDirection(0,this.relativeDirection-120)
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                    this.procedure[1]=atan2(sin(this.relativeDirection-120)*6/5,cos(this.relativeDirection-120)/sqrt(3))
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(3)
                    if(index>=0){
                        this.tempDistance=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant.position.x,this.targetCombatant.position.y)
                    }else{
                        this.tempDistance=this.distance
                    }
                }
                if(this.timer>=15*this.targetDistance-14&&this.timer<15*this.targetDistance+6){
                    this.userCombatant.runAnimation(1/10,3)
                }else if(this.timer<15*this.targetDistance-14){
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer==15*this.targetDistance-5){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    if(this.type==35){
                        this.userCombatant.combo++
                    }
                }else if(this.timer>=15*this.targetDistance+21){
                    this.remove=true
                }
                if(this.procedure[0]==2){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.tempDistance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-120,this.relativeDistance/40/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.tempDistance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-120,-this.relativeDistance/40/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.tempDistance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-120,this.relativeDistance/10/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.tempDistance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-120,-this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer==15*this.targetDistance+3){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let offset=transformDirection(0,this.relativeDirection-120)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else{
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+5){
                        this.targetCombatant.moveTile(this.procedure[1],this.tempDistance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-120,this.relativeDistance/10/this.targetDistance)
                        this.userCombatant.goal.anim.direction-=6
                        this.userCombatant.anim.direction-=6
                    }
                    if(this.timer==15*this.targetDistance+5){
                        let offset=transformDirection(0,this.relativeDirection-120)
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                    }
                    if(this.timer==15*this.targetDistance+6){
                        let offset=transformDirection(0,this.relativeDirection-180)
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        this.procedure[2]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.userCombatant.startAnimation(3)
                    }
                    if(this.procedure[2]==2){
                        if(this.timer>15*this.targetDistance+5&&this.timer<=15*this.targetDistance+13){
                            this.targetCombatant.moveTile(this.direction,-this.distance/40)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                        }else if(this.timer>15*this.targetDistance+13&&this.timer<=15*this.targetDistance+21){
                            this.targetCombatant.moveTile(this.direction,this.distance/40)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                        }
                        if(this.timer>=15*this.targetDistance+21){
                            this.battle.activate(1,this.targetCombatant.id)
                            this.remove=true
                        }
                    }else if(this.procedure[2]==1){
                        if(this.timer>15*this.targetDistance+5&&this.timer<=15*this.targetDistance+13){
                            this.targetCombatant.moveTile(this.direction,-this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                        }else if(this.timer>15*this.targetDistance+13&&this.timer<=15*this.targetDistance+21){
                            this.targetCombatant.moveTile(this.direction,this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                        }
                        if(this.timer==15*this.targetDistance+13){
                            this.targetCombatant.takeDamage(game.collisionDamage,-1)
                            let offset=transformDirection(0,this.relativeDirection-180)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }else if(this.timer>=15*this.targetDistance+21){
                            this.battle.activate(1,this.targetCombatant.id)
                            this.remove=true
                        }
                    }else{
                        if(this.timer>15*this.targetDistance+5){
                            this.targetCombatant.moveTile(this.direction,-this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                            this.userCombatant.goal.anim.direction+=6
                            this.userCombatant.anim.direction+=6
                        }
                        if(this.timer>=15*this.targetDistance+15){
                            let offset=transformDirection(0,this.relativeDirection-180)
                            this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                            this.battle.activate(1,this.targetCombatant.id)
                            this.remove=true
                        }
                    }
                }
            break
            case 245:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    let offset=transformDirection(0,this.relativeDirection+120)
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                    this.procedure[1]=atan2(sin(this.relativeDirection+120)*6/5,cos(this.relativeDirection+120)/sqrt(3))
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(3)
                    if(index>=0){
                        this.tempDistance=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant.position.x,this.targetCombatant.position.y)
                    }else{
                        this.tempDistance=this.distance
                    }
                }
                if(this.timer>=15*this.targetDistance-14&&this.timer<15*this.targetDistance+6){
                    this.userCombatant.runAnimation(1/10,3)
                }else if(this.timer<15*this.targetDistance-14){
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer==15*this.targetDistance-5){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    if(this.type==35){
                        this.userCombatant.combo++
                    }
                }else if(this.timer>=15*this.targetDistance+21){
                    this.remove=true
                }
                if(this.procedure[0]==2){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.tempDistance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+120,this.relativeDistance/40/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.tempDistance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+120,-this.relativeDistance/40/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.tempDistance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+120,this.relativeDistance/10/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.tempDistance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+120,-this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer==15*this.targetDistance+3){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let offset=transformDirection(0,this.relativeDirection+120)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else{
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+5){
                        this.targetCombatant.moveTile(this.procedure[1],this.tempDistance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+120,this.relativeDistance/10/this.targetDistance)
                        this.userCombatant.goal.anim.direction+=6
                        this.userCombatant.anim.direction+=6
                    }
                    if(this.timer==15*this.targetDistance+5){
                        let offset=transformDirection(0,this.relativeDirection+120)
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                    }
                    if(this.timer==15*this.targetDistance+6){
                        let offset=transformDirection(0,this.relativeDirection-180)
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        this.procedure[2]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.userCombatant.startAnimation(3)
                    }
                    if(this.procedure[2]==2){
                        if(this.timer>15*this.targetDistance+5&&this.timer<=15*this.targetDistance+13){
                            this.targetCombatant.moveTile(this.direction,-this.distance/40)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                        }else if(this.timer>15*this.targetDistance+13&&this.timer<=15*this.targetDistance+21){
                            this.targetCombatant.moveTile(this.direction,this.distance/40)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                        }
                        if(this.timer>=15*this.targetDistance+21){
                            this.battle.activate(1,this.targetCombatant.id)
                            this.remove=true
                        }
                    }else if(this.procedure[2]==1){
                        if(this.timer>15*this.targetDistance+5&&this.timer<=15*this.targetDistance+13){
                            this.targetCombatant.moveTile(this.direction,-this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                        }else if(this.timer>15*this.targetDistance+13&&this.timer<=15*this.targetDistance+21){
                            this.targetCombatant.moveTile(this.direction,this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                        }
                        if(this.timer==15*this.targetDistance+13){
                            this.targetCombatant.takeDamage(game.collisionDamage,-1)
                            let offset=transformDirection(0,this.relativeDirection-180)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }else if(this.timer>=15*this.targetDistance+21){
                            this.battle.activate(1,this.targetCombatant.id)
                            this.remove=true
                        }
                    }else{
                        if(this.timer>15*this.targetDistance+5){
                            this.targetCombatant.moveTile(this.direction,-this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                            this.userCombatant.goal.anim.direction+=6
                            this.userCombatant.anim.direction+=6
                        }
                        if(this.timer>=15*this.targetDistance+15){
                            let offset=transformDirection(0,this.relativeDirection-180)
                            this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                            this.battle.activate(1,this.targetCombatant.id)
                            this.remove=true
                        }
                    }
                }
            break
            case 246:
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                    let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x*2-this.targetCombatant.tilePosition.x,this.userCombatant.tilePosition.y*2-this.targetCombatant.tilePosition.y)
                    this.procedure[0]=index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.procedure[1]=this.targetDistance
                    this.procedure[2]=0
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
                    if(this.timer>30+this.procedure[2]*15){
                        this.userCombatant.runAnimation(1/10,0)
                        this.userCombatant.moveTile(this.direction,-this.distance/10)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                    }
                    if(this.timer==40+this.procedure[2]*15){
                        this.userCombatant.moveTilePosition(this.userCombatant.tilePosition.x*(1+1/this.procedure[1])-this.targetCombatant.tilePosition.x/this.procedure[1],this.userCombatant.tilePosition.y*(1+1/this.procedure[1])-this.targetCombatant.tilePosition.y/this.procedure[1])
                        this.battle.activate(1,this.userCombatant.id)
                        this.procedure[1]++
                        let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x*(1+1/this.procedure[1])-this.targetCombatant.tilePosition.x/this.procedure[1],this.userCombatant.tilePosition.y*(1+1/this.procedure[1])-this.targetCombatant.tilePosition.y/this.procedure[1])
                        this.procedure[0]=index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.procedure[2]++
                    }
                }
            break
            case 247:
                if(this.timer==1){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==10){
                    this.targetCombatant.takeDamage(this.effect[0]+this.combo*this.effect[1],this.user)
                    this.userCombatant.combo=0
                }
                if(this.timer<=20){
                    this.userCombatant.runAnimation(1/10,0)
                }
                if(this.timer<=10){
                    this.userCombatant.moveTile(this.direction,this.distance/15)
                }else if(this.timer<=20){
                    this.userCombatant.moveTile(this.direction,-this.distance/15)
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
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
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
            case 250:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    this.upTargetDistance=this.targetDistance
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(3)
                }
                if(this.timer>=15*this.targetDistance-14&&this.timer<15*this.targetDistance+6){
                    this.userCombatant.runAnimation(1/10,3)
                }else if(this.timer<15*this.targetDistance-14){
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer==15*this.targetDistance-5){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }
                if(this.procedure[this.procedure.length-1]==2){
                    if(this.timer>15*this.upTargetDistance-5&&this.timer<=15*this.upTargetDistance+3){
                        this.targetCombatant.moveTile(this.direction,this.distance/40/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40/this.targetDistance)
                    }else if(this.timer>15*this.upTargetDistance+3&&this.timer<=15*this.upTargetDistance+11){
                        this.targetCombatant.moveTile(this.direction,-this.distance/40/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40/this.targetDistance)
                    }
                    if(this.timer>=15*this.upTargetDistance+11){
                        this.remove=true
                    }
                }else if(this.procedure[this.procedure.length-1]==1){
                    if(this.timer>15*this.upTargetDistance-5&&this.timer<=15*this.upTargetDistance+3){
                        this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                    }else if(this.timer>15*this.upTargetDistance+3&&this.timer<=15*this.upTargetDistance+11){
                        this.targetCombatant.moveTile(this.direction,-this.distance/10/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer==15*this.upTargetDistance+3){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*(1/(this.upTargetDistance-this.targetDistance+1)+1)-this.userCombatant.tilePosition.x/(this.upTargetDistance-this.targetDistance+1),this.targetCombatant.tilePosition.y*(1/(this.upTargetDistance-this.targetDistance+1)+1)-this.userCombatant.tilePosition.y/(this.upTargetDistance-this.targetDistance+1))
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=15*this.upTargetDistance+11){
                        this.remove=true
                    }
                }else{
                    if(this.timer>15*this.upTargetDistance-5){
                        this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer>=15*this.upTargetDistance+5){
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*(1/(this.upTargetDistance-this.targetDistance+1)+1)-this.userCombatant.tilePosition.x/(this.upTargetDistance-this.targetDistance+1),this.targetCombatant.tilePosition.y*(1/(this.upTargetDistance-this.targetDistance+1)+1)-this.userCombatant.tilePosition.y/(this.upTargetDistance-this.targetDistance+1))
                        this.battle.activate(1,this.targetCombatant.id)
                        this.upTargetDistance++
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*(1/(this.upTargetDistance-this.targetDistance+1)+1)-this.userCombatant.tilePosition.x/(this.upTargetDistance-this.targetDistance+1),this.targetCombatant.tilePosition.y*(1/(this.upTargetDistance-this.targetDistance+1)+1)-this.userCombatant.tilePosition.y/(this.upTargetDistance-this.targetDistance+1))
                        this.procedure.push(this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1)
                    }
                }
            break
            case 251:
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
                    this.userCombatant.moveTile(this.direction,this.distance/15/this.targetDistance)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/15/this.targetDistance)
                }else if(this.timer>20&&this.timer<=30){
                    this.userCombatant.moveTile(this.direction,-this.distance/15/this.targetDistance)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/15/this.targetDistance)
                }
                if(this.timer>20&&this.timer<=10+this.targetDistance*10){
                    this.targetCombatant.moveTile(this.direction,-this.distance/10/this.targetDistance)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10/this.targetDistance)
                }
                if(this.timer==-5+this.targetDistance*10){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer>=10+this.targetDistance*10){
                    this.targetCombatant.moveTilePosition(round(this.userCombatant.tilePosition.x*(1-1/this.targetDistance)+this.targetCombatant.tilePosition.x/this.targetDistance),round(this.userCombatant.tilePosition.y*(1-1/this.targetDistance)+this.targetCombatant.tilePosition.y/this.targetDistance))
                    this.battle.activate(1,this.targetCombatant.id)
                    this.remove=true
                }
            break
            case 252:
                if(this.energy<=0){
                    this.remove=true
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(2)
                    }
                    this.userCombatant.runAnimation(1/30,2)
                    if(this.timer%30==15){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }else if(this.timer>=30*this.energy){
                        this.remove=true
                    }
                }
            break
            case 255:
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                }
                this.userCombatant.runAnimation(1/15,2)
                if(this.timer==10||this.timer==20){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 327:
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                }
                this.userCombatant.runAnimation(1/10,2)
                if(this.timer==5){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }else if(this.timer>=10){
                    this.remove=true
                }
            break
            case 328:
                if(this.targetVariant){
                    if(this.timer==1){
                        this.userCombatant.startAnimation(0)
                    }
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                    if(this.timer>=15*this.targetDistance){
                        this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                        if(this.type==205){
                            this.battle.activateTile(1,this.userCombatant.id)
                        }else{
                            this.battle.activate(1,this.userCombatant.id)
                        }
                        this.remove=true
                    }
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(0)
                    }
                    this.userCombatant.moveTile(this.direction,this.distance/(24*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(24*this.targetDistance))
                    this.userCombatant.runAnimation(1/12,0)
                    if(this.timer>=24*this.targetDistance){
                        this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                        this.battle.activate(1,this.userCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 329:
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
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }else if(this.timer>=40){
                    this.remove=true
                }
            break
            case 336:
                if(this.timer==1){
                    this.userCombatant.startAnimation(32)
                }
                this.userCombatant.runAnimation(1/20,32)
                if(this.timer==10){
                    this.battle.combatantManager.damageArea2(this.effect[0],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 342: case 350: case 353: case 407: case 425: case 473: case 476: case 477: case 478: case 479:
            case 480: case 490: case 491: case 492: case 493: case 494: case 495: case 498: case 505: case 506:
            case 520: case 526:
                if(this.timer==1){
                    this.userCombatant.startAnimation(32)
                }
                this.userCombatant.runAnimation(1/20,32)
                if(this.timer==10){
                    switch(this.type){
                        case 342:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        break
                        case 350:
                            this.battle.energy.gen[this.player]+=this.effect[0]
                            this.userCombatant.statusEffect('Strength',this.effect[1])
                            this.userCombatant.statusEffect('Dexterity',this.effect[2])
                        break
                        case 353:
                            this.battle.combatantManager.damageArea(this.effect[0],this.user,-1,this.targetCombatant.tilePosition)
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y,36,[20]))
                        break
                        case 407:
                            this.battle.combatantManager.multiplyStatus('Bleed',this.effect[0])
                        break
                        case 425:
                            this.battle.combatantManager.allEffect(14,[this.effect[0]])
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y,37,[20]))
                        break
                        case 473:
                            this.battle.tileManager.customActivate(0,[this.effect[0]])
                        break
                        case 476:
                            this.battle.tileManager.customActivate(1,[this.effect[0]])
                        break
                        case 477:
                            let total=0
                            for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                                if(this.battle.tileManager.tiles[a].type.includes(19)){
                                    total++
                                }
                            }
                            this.userCombatant.addBlock(this.effect[0]*total)
                        break
                        case 478:
                            this.battle.tileManager.customActivate(2,[])
                            this.battle.updateTargetting()
                        break
                        case 479:
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(this.effect[0],1)
                            }
                        break
                        case 480:
                            this.battle.tileManager.customActivate(3,[this.effect[0]])
                            this.battle.tileManager.customActivate(4,[this.effect[1]])
                        break
                        case 490:
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.userCombatant.holdOrb(0)
                            }
                        break
                        case 491:
                            this.userCombatant.evoke(0,this.targetCombatant.id,[this.effect[0]])
                        break
                        case 492:
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.userCombatant.holdOrb(1)
                            }
                        break
                        case 493:
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.userCombatant.holdOrb(2)
                            }
                        break
                        case 494:
                            this.userCombatant.evoke(1,this.targetCombatant.id,[1])
                        break
                        case 495:
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.userCombatant.holdOrb(3)
                            }
                        break
                        case 498:
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.userCombatant.holdOrb(0)
                            }
                            this.battle.cardManagers[this.player].allGroupClaw(this.effect[1])
                        break
                        case 505:
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.userCombatant.holdOrb(4)
                            }
                        break
                        case 506:
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.userCombatant.holdOrb(5)
                            }
                        break
                        case 520:
                            this.battle.combatantManager.damageArea(this.effect[0],this.user,-1,this.userCombatant.tilePosition)
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.userCombatant.holdOrb(4)
                            }
                        break
                        case 526:
                            for(let a=0,la=this.effect[0]*this.energy.main;a<la;a++){
                                this.userCombatant.holdOrb(0)
                            }
                        break
                    }
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 345:
                if(this.timer==1){
                    this.userCombatant.startAnimation(33)
                }
                this.userCombatant.runAnimation(1/20,33)
                if(this.timer==10){
                    this.targetCombatant.takeDamage(this.battle.cardManagers[this.player].deck.cards.length,this.user)
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 356:
                if(this.timer==1){
                    this.procedure=[[],[]]
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        let offset=transformDirection(0,this.relativeDirection[a]+60)
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                        this.procedure[1][a]=atan2(sin(this.relativeDirection[a]+60)*6/5,cos(this.relativeDirection[a]+60)/sqrt(3))
                        this.procedure[0][a]=this.targetCombatant[a].getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        if(index>=0){
                            this.distance[a]=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant[a].position.x,this.targetCombatant[a].position.y)
                        }
                    }
                    this.userCombatant.startAnimation(10)
                }
                if(this.timer<=20){
                    this.userCombatant.runAnimation(1/10,10)
                }
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    if(this.procedure[0][a]==2){
                        if(this.timer>10&&this.timer<=18){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/40)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+60,this.relativeDistance[a]/40/this.targetDistance[a])
                        }else if(this.timer>18&&this.timer<=26){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],-this.distance[a]/40)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+60,-this.relativeDistance[a]/40/this.targetDistance[a])
                        }
                    }else if(this.procedure[0][a]==1){
                        if(this.timer>10&&this.timer<=18){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+60,this.relativeDistance[a]/10/this.targetDistance[a])
                        }else if(this.timer>18&&this.timer<=26){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],-this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+60,-this.relativeDistance[a]/10/this.targetDistance[a])
                        }
                        if(this.timer==18){
                            this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                            let offset=transformDirection(0,this.relativeDirection+60)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }
                    }else if(this.procedure[0][a]==0){
                        if(this.timer>10){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+60,this.relativeDistance[a]/10/this.targetDistance[a])
                        }
                        if(this.timer>=20){
                            let offset=transformDirection(0,this.relativeDirection[a]+60)
                            this.targetCombatant[a].moveTilePosition(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                            this.battle.activate(1,this.targetCombatant[a].id)
                            this.procedure[0][a]=-1
                        }
                    }
                }
                if(this.timer>=26){
                    this.remove=true
                }
            break
            case 357:
                if(this.timer==1){
                    this.procedure=[[],[]]
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        let offset=transformDirection(0,this.relativeDirection[a]-60)
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                        this.procedure[1][a]=atan2(sin(this.relativeDirection[a]-60)*6/5,cos(this.relativeDirection[a]-60)/sqrt(3))
                        this.procedure[0][a]=this.targetCombatant[a].getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        if(index>=0){
                            this.distance[a]=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant[a].position.x,this.targetCombatant[a].position.y)
                        }
                    }
                    this.userCombatant.startAnimation(10)
                }
                if(this.timer<=20){
                    this.userCombatant.runAnimation(1/10,10)
                }
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    if(this.procedure[0][a]==2){
                        if(this.timer>10&&this.timer<=18){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/40)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]-60,this.relativeDistance[a]/40/this.targetDistance[a])
                        }else if(this.timer>18&&this.timer<=26){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],-this.distance[a]/40)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]-60,-this.relativeDistance[a]/40/this.targetDistance[a])
                        }
                    }else if(this.procedure[0][a]==1){
                        if(this.timer>10&&this.timer<=18){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]-60,this.relativeDistance[a]/10/this.targetDistance[a])
                        }else if(this.timer>18&&this.timer<=26){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],-this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]-60,-this.relativeDistance[a]/10/this.targetDistance[a])
                        }
                        if(this.timer==18){
                            this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                            let offset=transformDirection(0,this.relativeDirection-60)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }
                    }else if(this.procedure[0][a]==0){
                        if(this.timer>10){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]-60,this.relativeDistance[a]/10/this.targetDistance[a])
                        }
                        if(this.timer>=20){
                            let offset=transformDirection(0,this.relativeDirection[a]-60)
                            this.targetCombatant[a].moveTilePosition(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                            this.battle.activate(1,this.targetCombatant[a].id)
                            this.procedure[0][a]=-1
                        }
                    }
                }
                if(this.timer>=26){
                    this.remove=true
                }
            break
            case 358:
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                }
                this.userCombatant.runAnimation(1/30,2)
                if(this.timer==15){
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                    }
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 368:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }
                this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                this.userCombatant.runAnimation(1/15,0)
                if(this.timer>=15*this.targetDistance-30){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0]*2,this.targetCombatant.tilePosition.y-offset[1]*2)
                    this.battle.activate(1,this.userCombatant.id)
                    this.remove=true
                }
            break
            case 401: case 417:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(34)
                }else if(this.timer==15*this.targetDistance-14){
                    this.userCombatant.startAnimation(2)
                }
                if(this.timer>=15*this.targetDistance-14){
                    this.userCombatant.runAnimation(1/30,2)
                }else{
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,34)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                }else if(this.timer==15*this.targetDistance){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    switch(this.type){
                        case 401:
                            this.targetCombatant.statusEffect('Bleed',this.effect[1])
                        break
                        case 417:
                            this.userCombatant.statusEffect('Confused',this.effect[1])
                            this.userCombatant.balance+=this.effect[2]
                        break
                    }
                }else if(this.timer>=15*this.targetDistance+15){
                    this.remove=true
                    this.battle.activate(1,this.userCombatant.id)
                }
            break
            case 411:
                if(this.timer==1){
                    this.userCombatant.startAnimation(35)
                }
                this.userCombatant.runAnimation(1/30,35)
                if(this.timer==15){
                    this.userCombatant.statusEffect('Draw Up',this.effect[0])
                    this.userCombatant.balance+=this.effect[1]
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 438:
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
                    this.targetCombatant.goal.anim.direction=this.relativeDirection
                    this.targetCombatant.statusEffect('Confusion',this.effect[0])
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
                    this.battle.activate(1,this.targetCombatant.id)
                    this.remove=true
                }
            break
            case 447:
                if(this.timer==1){
                    this.offset=[this.targetCombatant.tilePosition.x-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y-this.userCombatant.tilePosition.y]
                    for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                        let index=this.battle.tileManager.getTileIndex(this.battle.combatantManager.combatants[a].tilePosition.x+this.offset[0],this.battle.combatantManager.combatants[a].tilePosition.y+this.offset[1])
                        this.procedure[a]=this.battle.combatantManager.combatants[a].team==this.userCombatant.team?3:this.battle.combatantManager.combatants[a].getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    }
                    this.userCombatant.startAnimation(3)
                }else if(this.timer==10){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }
                if(this.timer<=20){
                    this.userCombatant.runAnimation(1/10,3)
                }
                let allDone=true
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.procedure[a]==2){
                        allDone=false
                        if(this.timer>10&&this.timer<=18){
                            this.battle.combatantManager.combatants[a].moveTile(this.direction,this.distance/40)
                            this.battle.combatantManager.combatants[a].moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                        }else if(this.timer>18&&this.timer<=26){
                            this.battle.combatantManager.combatants[a].moveTile(this.direction,-this.distance/40)
                            this.battle.combatantManager.combatants[a].moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                        }
                        if(this.timer>=26){
                            this.procedure[a]=3
                        }
                    }else if(this.procedure[a]==1){
                        allDone=false
                        if(this.timer>10&&this.timer<=18){
                            this.battle.combatantManager.combatants[a].moveTile(this.direction,this.distance/10)
                            this.battle.combatantManager.combatants[a].moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                        }else if(this.timer>18&&this.timer<=26){
                            this.battle.combatantManager.combatants[a].moveTile(this.direction,-this.distance/10)
                            this.battle.combatantManager.combatants[a].moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                        }
                        if(this.timer==18){
                            this.battle.combatantManager.combatants[a].takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.battle.combatantManager.combatants[a].tilePosition.x+this.offset[0],this.battle.combatantManager.combatants[a].tilePosition.y+this.offset[1])
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }else if(this.timer>=26){
                            this.procedure[a]=3
                        }
                    }else if(this.procedure[a]==0){
                        allDone=false
                        if(this.timer>10){
                            this.battle.combatantManager.combatants[a].moveTile(this.direction,this.distance/10)
                            this.battle.combatantManager.combatants[a].moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                        }
                        if(this.timer>=20){
                            this.battle.combatantManager.combatants[a].moveTilePosition(this.battle.combatantManager.combatants[a].tilePosition.x+this.offset[0],this.battle.combatantManager.combatants[a].tilePosition.y+this.offset[1])
                            this.battle.activate(1,this.battle.combatantManager.combatants[a].id)
                            this.procedure[a]=3
                        }
                    }
                }
                if(allDone){
                    this.remove=true
                }
            break
            case 459:
                if(this.timer==1){
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[a]=this.targetCombatant[a].getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                            this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }
                    }else if(this.procedure[a]==0){
                        if(this.timer>10&&this.timer<=20){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10)
                        }
                        if(this.timer==20){
                            this.targetCombatant[a].moveTilePosition(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                        } 
                        if(this.timer==21){
                            let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant[a].tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                            this.procedure[a+la]=this.targetCombatant[a].getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        }
                        if(this.procedure[a+la]==2){
                            if(this.timer>20&&this.timer<=28){
                                this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/40)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/40)
                            }else if(this.timer>28&&this.timer<=36){
                                this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/40)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/40)
                            }
                            if(this.timer==36){
                                this.battle.activate(1,this.targetCombatant[a].id)
                            }
                        }else if(this.procedure[a+la]==1){
                            if(this.timer>20&&this.timer<=28){
                                this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10)
                            }else if(this.timer>28&&this.timer<=36){
                                this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/10)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/10)
                            }
                            if(this.timer==28){
                                this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                                let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant[a].tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                                if(index>=0){
                                    this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                                }
                            }else if(this.timer==36){
                                this.battle.activate(1,this.targetCombatant[a].id)
                            }
                        }else{
                            if(this.timer>20&&this.timer<=30){
                                this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10)
                            }
                            if(this.timer==30){
                                this.targetCombatant[a].moveTilePosition(this.targetCombatant[a].tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant[a].tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                                this.battle.activate(1,this.targetCombatant[a].id)
                            }
                        }
                    }
                }
                if(this.timer>=36){
                    this.remove=true
                }
            break
            case 464:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }
                this.userCombatant.moveTile(this.direction,this.distance/42)
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/42)
                this.userCombatant.runAnimation(1/14,0)
                if(this.timer>=42){
                    this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                    this.remove=true
                }
            break
            case 471:
                if(this.timer==1){
                    this.userCombatant.startAnimation(10)
                }
                this.userCombatant.runAnimation(1/10,10)
                if(this.timer==10){
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                        this.battle.turnManager.loadEnemyAttack(this.targetCombatant[a].id)
                        this.targetCombatant[a].goal.anim.direction=this.relativeDirection[a]
                    }
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 483:
                if(this.timer==1){
                    this.userCombatant.startAnimation(36)
                }
                this.userCombatant.runAnimation(1/30,36)
                if(this.timer==15){
                    this.userCombatant.life=0
                    this.battle.combatantManager.damageArea(this.effect[0],this.user,-1,this.userCombatant.tilePosition)
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y,2,[20]))
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 487:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(9)
                }
                if(this.timer>=15*this.targetDistance-14&&this.timer<15*this.targetDistance+6){
                    this.userCombatant.runAnimation(1/10,9)
                }else if(this.timer<15*this.targetDistance-14){
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer==15*this.targetDistance-5){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    switch(this.type){
                        case 35:
                            this.userCombatant.combo++
                        break
                        case 196:
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,game.playerNumber+1)
                            }
                        break
                    }
                }else if(this.timer>=15*this.targetDistance+15){
                    this.remove=true
                }
                if(this.procedure[0]==2){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.direction,this.distance/40/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.direction,-this.distance/40/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.direction,-this.distance/10/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer==15*this.targetDistance+3){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else{
                    if(this.timer>15*this.targetDistance-5){
                        this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+5){
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            break
                    
            default:
                this.remove=true
            break
        }
        if(this.remove){
            this.battle.combatantManager.playCard()
            switch(this.attackClass){
                case 1:
                    if(this.userCombatant.getStatus('Double Damage')>0&&this.clearAttack[0]){
                        this.userCombatant.status.main[0]--
                    }
                    if(this.userCombatant.getStatus('Single Damage')>0&&this.clearAttack[1]){
                        this.userCombatant.status.main[12]=0
                    }
                break
            }
        }
    }
}