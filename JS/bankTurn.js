turn.prototype.update=function(){
    this.timer++
    switch(this.action){
        case 0:
            switch(this.type){
                case 1: case 6: case 8: case 13: case 14: case 15: case 22: case 23: case 24: case 27:
                case 30: case 32: case 33: case 36: case 37: case 38: case 58: case 61: case 62: case 67:
                case 79: case 83: case 100: case 112: case 113: case 152: case 172: case 178: case 183: case 193:
                case 205: case 214: case 229: case 242: case 246: case 247: case 248: case 250: case 253: case 260:
                case 262: case 263: case 268: case 270: case 271: case 274: case 275: case 276: case 277: case 279:
                case 287: case 290: case 291: case 295: case 304: case 306: case 316: case 325: case 328: case 329:
                case 332: case 335: case 342: case 343: case 353: case 369: case 372: case 373: case 374: case 375:
                case 378: case 385: case 386: case 389: case 390: case 397: case 398: case 402: case 412: case 419:
                case 420: case 424: case 426: case 433: case 434: case 435: case 448:
                    if(this.type==205&&this.timer==1){
                        this.userCombatant.goal.anim.direction=this.relativeDirection
                    }
                    if(variants.nobasicanim){
                        if(this.targetDistance>1){
                            this.userCombatant.moveTile(this.direction,this.distance*(this.targetDistance-1)/this.targetDistacne)
                            this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance*(this.targetDistance-1)/this.targetDistacne)
                            let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                            this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                        }
                        this.selfCall(0)
                        if(this.targetDistance>1){
                            this.battle.activate(1,this.userCombatant.id)
                        }
                        this.remove=true
                    }else{
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
                            this.selfCall(0)
                        }else if(this.timer>=15*this.targetDistance+15){
                            if(this.targetDistance>1){
                                this.battle.activate(1,this.userCombatant.id)
                            }
                            this.remove=true
                        }
                    }
                break
                case 20: case 31: case 59: case 66: case 99: case 103: case 107: case 194: case 258: case 292:
                case 305: case 317: case 348: case 354: case 358: case 380: case 437:
                    if(variants.nobasicanim){
                        if(this.targetDistance>1){
                            this.userCombatant.moveTile(this.direction,this.distance*(this.targetDistance-1)/this.targetDistacne)
                            this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance*(this.targetDistance-1)/this.targetDistacne)
                            let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                            this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                        }
                        if(this.type==292){
                            for(let a=0,la=this.targetCombatant.length;a<la;a++){
                                this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                                this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                            }
                        }else{
                            for(let a=0,la=2;a<la;a++){
                                this.targetCombatant.takeDamage(this.effect[0],this.user)
                                switch(this.type){
                                    case 437:
                                        this.userCombatant.combo++
                                    break
                                }
                            }
                            this.selfCall(6)
                        }
                        if(this.targetDistance>1){
                            this.battle.activate(1,this.userCombatant.id)
                        }
                        this.remove=true
                    }else{
                        if(this.timer==1&&this.targetDistance>1){
                            this.userCombatant.startAnimation(0)
                        }else if(this.timer==15*this.targetDistance-14||this.timer==15*this.targetDistance+1&&(this.userCombatant.name=='Lira'||this.userCombatant.name=='Setsuna')){
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
                            if(this.type==292){
                                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                                    this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                                }
                            }else{
                                this.targetCombatant.takeDamage(this.effect[0],this.user)
                                switch(this.type){
                                    case 437:
                                        this.userCombatant.combo++
                                    break
                                }
                                if(this.timer==15*this.targetDistance-3){
                                    this.selfCall(6)
                                }
                            }
                        }else if(this.timer>=15*this.targetDistance+15){
                            if(this.targetDistance>1){
                                this.battle.activate(1,this.userCombatant.id)
                            }
                            this.remove=true
                        }
                    }
                break
                case 2: case 19: case 34: case 45: case 76: case 149: case 282: case 297: case 298: case 299:
                case 355: case 367: case 370: case 371: case 377: case 394:
                    if(variants.nobasicanim){
                        if(this.targetDistance>1){
                            this.userCombatant.moveTile(this.direction,this.distance*(this.targetDistance-1)/this.targetDistacne)
                            this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance*(this.targetDistance-1)/this.targetDistacne)
                            let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                            this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                        }
                        for(let a=0,la=3;a<la;a++){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            switch(this.type){
                                case 34:
                                    this.userCombatant.combo++
                                break
                            }
                        }
                        this.selfCall(7)
                        if(this.targetDistance>1){
                            this.battle.activate(1,this.userCombatant.id)
                        }
                        this.remove=true
                    }else{
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
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            switch(this.type){
                                case 34:
                                    this.userCombatant.combo++
                                break
                            }
                            if(this.timer==15*this.targetDistance+5){
                                this.selfCall(7)
                            }
                        }else if(this.timer>=15*this.targetDistance+15){
                            if(this.targetDistance>1){
                                this.battle.activate(1,this.userCombatant.id)
                            }
                            this.remove=true
                        }
                    }
                break
                case 77: case 101: case 361: case 407:
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
                        if(this.timer==15*this.targetDistance-6){
                            switch(this.type){
                                case 361:
                                    for(let a=0,la=this.effect[1];a<la;a++){
                                        this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,constants.playerNumber+1)
                                    }
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
                case 11:
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
                    }else if(this.timer==15*this.targetDistance-8||this.timer==15*this.targetDistance-4||this.timer==15*this.targetDistance||this.timer==15*this.targetDistance+4||this.timer==15*this.targetDistance+8){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }else if(this.timer>=15*this.targetDistance+15){
                        if(this.targetDistance>1){
                            this.battle.activate(1,this.userCombatant.id)
                        }
                        this.remove=true
                    }
                break
                case 184:
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
                        this.userCombatant.runAnimation(1/5,0)
                    }
                    if(this.timer==15*this.targetDistance-15){
                        let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                        this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                    }else if(this.timer==15*this.targetDistance-10||this.timer==15*this.targetDistance-6||this.timer==15*this.targetDistance-2||
                        this.timer==15*this.targetDistance+2||this.timer==15*this.targetDistance+6||this.timer==15*this.targetDistance+10){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }else if(this.timer>=15*this.targetDistance+15){
                        if(this.targetDistance>1){
                            this.battle.activate(1,this.userCombatant.id)
                        }
                        this.remove=true
                    }
                break
                case 3: case 7: case 35: case 98: case 196: case 252: case 399:
                    if(this.timer==1&&this.targetDistance>1){
                        this.userCombatant.startAnimation(0)
                    }else if(this.timer==15*this.targetDistance-14){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                        if(this.type==252){
                            this.targetCombatant.statusEffect('Dissipating',this.effect[0])
                        }else{
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }
                        switch(this.type){
                            case 35:
                                this.userCombatant.combo++
                            break
                            case 196:
                                for(let a=0,la=this.effect[1];a<la;a++){
                                    this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,constants.playerNumber+1)
                                }
                            break
                            case 399:
                                this.userCombatant.addBlock(this.effect[1])
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
                case 4: case 10: case 29: case 48: case 65: case 72: case 102: case 108: case 110: case 111:
                case 126: case 182: case 190: case 230: case 231: case 232: case 234: case 237: case 238: case 239:
                case 240: case 241: case 254: case 257: case 261: case 267: case 269: case 280: case 293: case 318:
                case 346: case 359: case 365: case 376: case 392: case 401: case 405: case 408: case 410: case 411:
                case 438: case 442:
                    if(variants.nobasicanim){
                        this.selfCall(1)
                        this.remove=true
                    }else{
                        if(this.timer==1){
                            this.userCombatant.startAnimation(1)
                        }
                        this.userCombatant.runAnimation(1/30,1)
                        if(this.timer==15){
                            this.selfCall(1)
                        }else if(this.timer>=30){
                            this.remove=true
                        }
                    }
                break
                case 5: case 39: case 40: case 41: case 42: case 51: case 52: case 56: case 57: case 74:
                case 75: case 78: case 88: case 92: case 93: case 94: case 155: case 186: case 189: case 244:
                case 249: case 301: case 302: case 352: case 391: case 414:
                    if(variants.nobasicanim){
                        this.selfCall(2)
                        this.remove=true
                    }else{
                        if(this.userCombatant.name=='Certes'||this.userCombatant.name=='Merlin'){
                            if(this.timer==1){
                                this.userCombatant.startAnimation(32)
                            }
                            this.userCombatant.runAnimation(1/20,32)
                            if(this.timer>=20){
                                this.selfCall(2)
                                this.remove=true
                            }
                        }else{
                            if(
                                this.userCombatant.name=='General Duckion'||
                                this.type!=39&&this.type!=56&&this.type!=74&&this.type!=75&&this.type!=78&&this.type!=92&&this.type!=93&&this.type!=94&&this.type!=155&&this.type!=186&&
                                this.type!=189&&this.type!=244&&this.type!=249&&this.type!=352&&this.type!=392&&this.type!=414
                            ){
                                if(this.timer==1){
                                    this.userCombatant.startAnimation(3)
                                }
                                this.userCombatant.runAnimation(1/15,3)
                            }else{
                                if(this.timer==1){
                                    this.userCombatant.startAnimation(8)
                                }
                                this.userCombatant.runAnimation(1/15,8)
                            }
                            if(this.timer>=15){
                                this.selfCall(2)
                                this.remove=true
                            }
                        }
                    }
                break
                case 9: case 28: case 44: case 53: case 60: case 64: case 82: case 84: case 85: case 105:
                case 114: case 124: case 153: case 204: case 259: case 264: case 265: case 278: case 288: case 308:
                case 330: case 368: case 379: case 387: case 388: case 395: case 404: case 409: case 449:
                    if(variants.nobasicanim){
                        this.selfCall(3)
                        this.remove=true
                    }else{
                        if(this.timer==1){
                            this.userCombatant.startAnimation(this.userCombatant.name=='Sakura'||this.userCombatant.name=='DD-610'||this.userCombatant.name=='Prehextorica'||this.userCombatant.name=='Ducopo'?29:4)
                        }
                        this.userCombatant.runAnimation(1/30,this.userCombatant.name=='Sakura'||this.userCombatant.name=='DD-610'||this.userCombatant.name=='Prehextorica'||this.userCombatant.name=='Ducopo'?29:4)
                        if(this.timer==15){
                            this.selfCall(3)
                        }else if(this.timer>=30){
                            this.remove=true
                        }
                    }
                break
                case 12: case 50: case 81: case 89: case 140: case 141: case 151: case 266: case 427: case 428:
                case 439:
                    if(variants.nobasicanim){
                        this.selfCall(4)
                        this.remove=true
                    }else{
                        if(this.timer==1){
                            this.userCombatant.startAnimation(5)
                        }
                        if(this.timer<=10||this.timer>20&&this.timer<=30){
                            this.userCombatant.runAnimation(1/10,5)
                        }
                        if(this.timer==15){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                        }else if(this.timer==5*this.targetDistance+15){
                            this.selfCall(4)
                        }else if(this.timer>=max(30,5*this.targetDistance+25)){
                            this.remove=true
                        }
                    }
                break
                case 16: case 17: case 54: case 128: case 132: case 198: case 215: case 217: case 255: case 256:
                case 396:
                    if(variants.nobasicanim){
                        this.selfCall(8)
                        this.remove=true
                    }else{
                        if(this.timer==1){
                            this.userCombatant.startAnimation(6)
                        }
                        this.userCombatant.runAnimation(1/10,6)
                        if(this.timer==10){
                            this.selfCall(8)
                        }else if(this.timer>=20){
                            this.remove=true
                        }
                    }
                break
                case 18: case 25: case 26: case 43: case 46: case 63: case 70: case 109: case 159: case 167:
                case 169: case 170: case 174: case 177: case 197: case 207: case 210: case 216: case 220: case 228:
                case 281: case 289: case 294: case 296: case 300: case 345: case 349: case 356: case 413: case 421:
                case 423: case 432: case 450:
                    if(variants.nobasicanim){
                        this.selfCall(5)
                        this.remove=true
                    }else{
                        let alt=this.userCombatant.name=='Lira'||this.userCombatant.name=='Shinmyoumaru'||this.userCombatant.name=='Ducopo'||this.userCombatant.name=='Randy'
                        if(this.timer==1){
                            this.userCombatant.startAnimation(alt?6:7)
                        }
                        this.userCombatant.runAnimation(alt?2/15:1/15,alt?6:7)
                        if(this.timer>=15){
                            this.selfCall(5)
                            this.remove=true
                        }
                    }
                break
                case 21:
                    this.remove=true
                    if(this.battle.modded(14)){
                        this.userCombatant.statusEffect('Strength',2)
                    }
                break
                case 47: case 179:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(5)
                    }
                    if(this.timer<=10||this.timer>25&&this.timer<=35){
                        this.userCombatant.runAnimation(1/10,5)
                    }
                    if(this.timer==15||this.timer==20){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                    }
                    if(this.timer==5*this.targetDistance+15||this.timer==5*this.targetDistance+20){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.timer==5*this.targetDistance+20){
                            switch(this.type){
                                case 89:
                                    if(this.targetCombatant.blocked>0){
                                        for(let a=0,la=this.effect[1];a<la;a++){
                                            this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,constants.playerNumber+1)
                                        }
                                    }
                                break
                            }
                        }
                    }else if(this.timer>=max(30,5*this.targetDistance+30)){
                        this.remove=true
                    }
                break
                case 49: case 164:
                    if(this.timer==1){
                        this.procedure[0]=distTargetCombatant(0,this.userCombatant,this.targetCombatant)>=0?0:
                            distTargetCombatant(0,{tilePosition:{x:this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],y:this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]}},this.targetCombatant)==1?1:
                            distTargetCombatant(0,{tilePosition:{x:this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],y:this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]}},this.targetCombatant)==1?2:
                            distTargetCombatant(0,{tilePosition:{x:this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],y:this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]}},this.targetCombatant)>=0?1:
                            distTargetCombatant(0,{tilePosition:{x:this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],y:this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]}},this.targetCombatant)>=0?2:3
                        if(this.relativeDirection<this.userCombatant.goal.anim.direction-30){
                            this.userCombatant.goal.anim.direction-=60
                        }else if(this.relativeDirection>this.userCombatant.goal.anim.direction+30){
                            this.userCombatant.goal.anim.direction+=60
                        }
                    }
                    if(this.procedure[0]==0){
                        if(this.timer==1){
                            this.userCombatant.startAnimation(5)
                        }
                        if(this.timer<=10||this.timer>20&&this.timer<=30){
                            this.userCombatant.runAnimation(1/10,5)
                        }
                        if(this.timer==15){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                        }else if(this.timer==5*this.targetDistance+15){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            if(this.type==164){
                                for(let a=0,la=this.effect[1];a<la;a++){
                                    this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,constants.playerNumber+1)
                                }
                            }
                        }else if(this.timer>=max(30,5*this.targetDistance+25)){
                            this.remove=true
                        }
                    }else if(this.procedure[0]==1||this.procedure[0]==2){
                        if(this.timer==1){
                            this.ztarget=this.procedure[0]==2?[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1])]:[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1])]
                            if(this.ztarget[0]==-1){
                                this.remove=true
                            }else{
                                this.ztargetTile=this.battle.tileManager.tiles[this.ztarget[0]]
                                if(this.ztargetTile.occupied>0){
                                    this.remove=true
                                }
                                this.zdirection=atan2(this.ztargetTile.position.x-this.position.x,this.ztargetTile.position.y-this.position.y)
                                this.zdistance=sqrt((this.ztargetTile.position.x-this.position.x)**2+(this.ztargetTile.position.y-this.position.y)**2)
                                this.zrelativeDirection=atan2(this.ztargetTile.relativePosition.x-this.relativePosition.x,this.ztargetTile.relativePosition.y-this.relativePosition.y)
                                this.zrelativeDistance=sqrt((this.ztargetTile.relativePosition.x-this.relativePosition.x)**2+(this.ztargetTile.relativePosition.y-this.relativePosition.y)**2)
                            }
                            this.userCombatant.startAnimation(0)
                        }
                        if(this.timer<=15&&!this.remove){
                            this.userCombatant.moveTile(this.zdirection,this.zdistance/(15*distTargetCombatant(0,this,this.ztargetTile)))
                            this.userCombatant.moveRelativeTile(this.zrelativeDirection,this.zrelativeDistance/(15*distTargetCombatant(0,this,this.ztargetTile)))
                            this.userCombatant.runAnimation(1/15,0)
                        }
                        if(this.timer==15&&!this.remove){
                            this.userCombatant.moveTilePosition(this.ztargetTile.tilePosition.x,this.ztargetTile.tilePosition.y)
                            this.battle.activate(1,this.userCombatant.id)
                            this.direction=atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.targetCombatant.position.y-this.userCombatant.position.y)
                            this.distance=sqrt((this.targetCombatant.position.x-this.userCombatant.position.x)**2+(this.targetCombatant.position.y-this.userCombatant.position.y)**2)
                            this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.userCombatant.relativePosition.x,this.targetCombatant.relativePosition.y-this.userCombatant.relativePosition.y)
                            this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.userCombatant.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.userCombatant.relativePosition.y)**2)
                            this.targetDistance=distTargetCombatant(0,this.userCombatant,this.targetCombatant)
                        }
                        if(this.timer==16){
                            this.userCombatant.startAnimation(5)
                        }
                        if(this.timer>15&&this.timer<=25||this.timer>35&&this.timer<=45){
                            this.userCombatant.runAnimation(1/10,5)
                        }
                        if(this.timer==30){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                        }else if(this.timer==5*this.targetDistance+30){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            if(this.type==164){
                                for(let a=0,la=this.effect[1];a<la;a++){
                                    this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,constants.playerNumber+1)
                                }
                            }
                        }else if(this.timer>=max(45,5*this.targetDistance+40)){
                            this.remove=true
                        }
                    }else{
                        this.remove=true
                    }
                break
                case 55: case 451: case 452:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(6)
                    }
                    this.userCombatant.runAnimation(1/10,6)
                    if(this.timer==10){
                        switch(this.type){
                            case 55:
                                this.battle.combatantManager.areaAbstract(2,['Weak Next Turn',this.effect[0]],this.userCombatant.tilePosition,[3,this.userCombatant.id],[0,2],false,0)
                            break
                            case 451:
                                this.battle.combatantManager.areaAbstract(2,['Weak Next Turn',this.effect[0]],this.userCombatant.tilePosition,[3,this.userCombatant.id],[0,1],false,0)
                            break
                            case 452:
                                this.battle.combatantManager.areaAbstract(2,['Vulnerable Next Turn',this.effect[0]],this.userCombatant.tilePosition,[3,this.userCombatant.id],[0,1],false,0)
                            break
                        }
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                break
                case 68: case 431:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(0)
                    }
                    this.userCombatant.runAnimation(1/10,0)
                    if(this.timer>=30){
                        switch(this.type){
                            case 431:
                                for(let a=0,la=this.effect[0];a<la;a++){
                                    this.battle.quickReinforce(this.effect[1])
                                }
                            break
                        }
                        this.userCombatant.status.main[42]=0
                        this.userCombatant.life=0
                        this.remove=true
                    }
                break
                case 69: case 168: case 171: case 441:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(4)
                    }
                    this.userCombatant.runAnimation(1/15,4)
                    if(this.timer==12||this.timer==18){
                        for(let a=0,la=this.targetCombatant.length;a<la;a++){
                            this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                            if(this.timer==18){
                                switch(this.type){
                                    case 171:
                                        this.targetCombatant[a].statusEffect('Bleed',this.effect[1])
                                    break
                                    case 441:
                                        this.targetCombatant[a].statusEffect('Anti-Control',this.effect[1])
                                    break
                                }
                            }
                        }
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                break
                case 71: case 73: case 272:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(5)
                    }
                    if(this.timer<=10||this.timer>20&&this.timer<=30){
                        this.userCombatant.runAnimation(1/20,5)
                    }
                    if(this.timer==15){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-30,11,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y-30),this.distance/30-2]))
                    }else if(this.timer==5*this.targetDistance+15){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.type==73){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,constants.playerNumber+1)
                            }
                        }
                    }else if(this.timer>=max(30,5*this.targetDistance+25)){
                        this.remove=true
                    }
                break
                case 76:
                    if(this.targetDistance==1){
                        if(this.timer==1){
                            this.userCombatant.startAnimation(2)
                        }
                        this.userCombatant.runAnimation(1/30,2)
                        if(this.timer==10||this.timer==15||this.timer==20){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            if(this.type==76&&this.targetCombatant.blocked>0){
                                for(let a=0,la=this.effect[1];a<la;a++){
                                    this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,constants.playerNumber+1)
                                }
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
                        }else if(this.timer==25||this.timer==30||this.timer==35){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            if(this.timer==25){
                                this.battle.activate(1,this.userCombatant.id)
                                if(this.type==76&&this.targetCombatant.blocked>0){
                                    for(let a=0,la=this.effect[1];a<la;a++){
                                        this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,constants.playerNumber+1)
                                    }
                                }
                            }
                        }else if(this.timer>=45){
                            this.remove=true
                        }
                    }
                break
                case 80:
                    if(this.timer==10){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-30,12,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                break
                case 86:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(4)
                    }
                    this.userCombatant.runAnimation(1/10,4)
                    if(this.timer==10||this.timer==15||this.timer==20){
                        for(let a=0,la=this.targetCombatant.length;a<la;a++){
                            this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                        }
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                break
                case 87: case 146: case 157: case 192:
                    if(this.timer==1){
                        for(let a=0,la=this.targetCombatant.length;a<la;a++){
                            let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*(1+1/this.targetDistance[a])-this.userCombatant.tilePosition.x/this.targetDistance[a],this.targetCombatant[a].tilePosition.y*(1+1/this.targetDistance[a])-this.userCombatant.tilePosition.y/this.targetDistance[a])
                            this.procedure[a]=this.targetCombatant[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        }
                        if(this.type==146){
                            this.userCombatant.startAnimation(3)
                        }else{
                            this.userCombatant.startAnimation(9)
                        }
                    }
                    if(this.timer<=15){
                        if(this.type==146){
                            this.userCombatant.runAnimation(2/15,3)
                        }else{
                            this.userCombatant.runAnimation(1/15,9)
                        }
                    }
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        if(this.timer==10){
                            this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                            if(this.type==157&&this.targetCombatant[a].id<this.battle.players){
                                for(let b=0,lb=this.effect[1];b<lb;b++){
                                    this.battle.drop(this.targetCombatant[a].id,findName(this.effect[2],types.card),0,constants.playerNumber+1)
                                }
                            }
                        }
                        if(this.procedure[a]==2){
                            if(this.timer>10&&this.timer<=18){
                                this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/40/this.targetDistance[a])
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/40/this.targetDistance[a])
                            }else if(this.timer>18&&this.timer<=26){
                                this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/40/this.targetDistance[a])
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/40/this.targetDistance[a])
                            }
                        }else if(this.procedure[a]==1){
                            if(this.timer>10&&this.timer<=18){
                                this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10/this.targetDistance[a])
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10/this.targetDistance[a])
                            }else if(this.timer>18&&this.timer<=26){
                                this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/10/this.targetDistance[a])
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/10/this.targetDistance[a])
                            }
                            if(this.timer==18){
                                this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                                let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x*(1+1/this.targetDistance[a])-this.userCombatant.tilePosition.x/this.targetDistance[a],this.targetCombatant[a].tilePosition.y*(1+1/this.targetDistance[a])-this.userCombatant.tilePosition.y/this.targetDistance[a])
                                if(index>=0){
                                    this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                                }
                            }
                        }else if(this.procedure[a]==0){
                            if(this.timer>10){
                                this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10/this.targetDistance[a])
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10/this.targetDistance[a])
                            }
                            if(this.timer>=20){
                                this.targetCombatant[a].moveTilePosition(this.targetCombatant[a].tilePosition.x*(1+1/this.targetDistance[a])-this.userCombatant.tilePosition.x/this.targetDistance[a],this.targetCombatant[a].tilePosition.y*(1+1/this.targetDistance[a])-this.userCombatant.tilePosition.y/this.targetDistance[a])
                                this.battle.activate(1,this.targetCombatant[a].id)
                                this.procedure[a]=-1
                            }
                        }
                    }
                    if(this.timer>=26){
                        this.remove=true
                    }
                break
                case 90: case 91: case 400:
                    if(this.timer==1){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.targetCombatant.tilePosition.y+transformDirection(0,this.direction)[1])
                        this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.userCombatant.startAnimation(5)
                    }
                    if(this.timer<=10||this.timer>20&&this.timer<=30){
                        this.userCombatant.runAnimation(1/10,5)
                    }
                    if(this.timer==15){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                    }else if(this.timer==5*this.targetDistance+15){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        switch(this.type){
                            case 91:
                                for(let a=0,la=this.effect[1];a<la;a++){
                                    this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,constants.playerNumber+1)
                                }
                            break
                            case 400:
                                for(let a=0,la=this.effect[1];a<la;a++){
                                    this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,constants.playerNumber+1)
                                }
                            break
                        }
                    }
                    if(this.procedure[0]==2){
                        if(this.timer>5*this.targetDistance+15&&this.timer<=5*this.targetDistance+23){
                            this.targetCombatant.moveTile(this.direction,this.distance/40/this.targetDistance)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40/this.targetDistance)
                        }else if(this.timer>5*this.targetDistance+23&&this.timer<=5*this.targetDistance+31){
                            this.targetCombatant.moveTile(this.direction,-this.distance/40/this.targetDistance)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40/this.targetDistance)
                        }
                        if(this.timer>=5*this.targetDistance+31){
                            this.remove=true
                        }
                    }else if(this.procedure[0]==1){
                        if(this.timer>5*this.targetDistance+15&&this.timer<=5*this.targetDistance+23){
                            this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                        }else if(this.timer>5*this.targetDistance+23&&this.timer<=5*this.targetDistance+31){
                            this.targetCombatant.moveTile(this.direction,-this.distance/10/this.targetDistance)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10/this.targetDistance)
                        }
                        if(this.timer==5*this.targetDistance+23){
                            this.targetCombatant.takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.targetCombatant.tilePosition.y+transformDirection(0,this.direction)[1])
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }else if(this.timer>5*this.targetDistance+31){
                            this.remove=true
                        }
                    }else{
                        if(this.timer>5*this.targetDistance+15){
                            this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                        }
                        if(this.timer>=5*this.targetDistance+25){
                            this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.targetCombatant.tilePosition.y+transformDirection(0,this.direction)[1])
                            this.battle.activate(1,this.targetCombatant.id)
                            this.remove=true
                        }
                    }
                break
                case 95:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(4)
                    }
                    this.userCombatant.runAnimation(2/15,4)
                    if(this.timer==9||this.timer==13||this.timer==17||this.timer==21){
                        for(let a=0,la=this.targetCombatant.length;a<la;a++){
                            this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                        }
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                break
                case 96: case 160: case 188:
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
                    }else if(this.targetDistance>1){
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
                        if(this.timer==11+this.targetDistance*10){
                            this.targetCombatant.moveTilePosition(round(this.userCombatant.tilePosition.x*(1-1/this.targetDistance)+this.targetCombatant.tilePosition.x/this.targetDistance),round(this.userCombatant.tilePosition.y*(1-1/this.targetDistance)+this.targetCombatant.tilePosition.y/this.targetDistance))
                            this.battle.activate(1,this.targetCombatant.id)
                            this.userCombatant.startAnimation(2)
                            if(this.type==188){
                                this.targetCombatant.takeDamage(this.effect[0]*(this.targetDistance-1),this.user)
                            }
                        }
                        if(this.timer>=10+this.targetDistance*10&&this.timer<=40+this.targetDistance*10){
                            this.userCombatant.runAnimation(1/30,2)
                        }
                        if(this.timer==25+this.targetDistance*10){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.battle.activate(1,this.userCombatant.id)
                        }else if(this.timer>=40+this.targetDistance*10){
                            this.remove=true
                        }
                    }
                break
                case 97:
                    if(this.timer==1){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.userCombatant.startAnimation(2)
                    }else if(this.timer==21){
                        this.userCombatant.startAnimation(3)
                    }else if(this.timer==10||this.timer==30){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }
                    if(this.timer<=20){
                        this.userCombatant.runAnimation(1/20,2)
                    }else if(this.timer<=40){
                        this.userCombatant.runAnimation(1/10,3)
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
                case 104: case 381:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(4)
                    }
                    this.userCombatant.runAnimation(1/10,4)
                    if(this.timer==10||this.timer==15||this.timer==20){
                        for(let a=0,la=this.targetCombatant.length;a<la;a++){
                            this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                        }
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                break
                case 106: case 447:
                    if(this.timer==1&&this.targetDistance>1){
                        this.userCombatant.startAnimation(0)
                    }else if(this.timer==15*this.targetDistance-14){
                        this.upTargetDistance=this.targetDistance
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                            this.procedure.push(this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1)
                        }
                    }
                break
                case 115:
                    if(this.timer==10){
                        this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-48,13,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                break
                case 116:
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
                        this.battle.turnManager.unMoveTurn(this.user)
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
                case 117: case 135: case 154: case 175: case 195: case 319: case 344: case 347: case 403: case 440:
                    if(this.timer==1){
                        this.procedure[0]=0
                        if(this.type==175||this.type==319||this.type==403||this.type==440){
                            this.userCombatant.startAnimation(0)
                        }
                    }
                    if(this.timer==1+10*this.procedure[0]){
                        this.target=[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.direction)[1]),
                        this.battle.combatantManager.getCombatantIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.direction)[1])]
                        if(this.target[0]<0){
                            this.battle.turnManager.unMoveTurn(this.user)
                            this.remove=true
                        }else{
                            this.targetTile=this.battle.tileManager.tiles[this.target[0]]
                            this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                            this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)
                            this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                            this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                            if(this.target[1]<0){
                                this.targetCombatant=-1
                            }else{
                                this.targetCombatant=this.battle.combatantManager.combatants[this.target[1]]
                                this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                                this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)
                                this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                                this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
                            }
                        }
                    }
                    if(!this.remove){
                        if(this.type==175||this.type==319||this.type==403||this.type==440){
                            this.userCombatant.runAnimation(1/10,0)
                        }
                        this.userCombatant.moveTile(this.direction,this.distance/(10*distTargetCombatant(0,this,this.targetTile)))
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(10*distTargetCombatant(0,this,this.targetTile)))
                        if(this.targetCombatant!=-1){
                            this.targetCombatant.moveTile(this.direction,-this.distance/(10*distTargetCombatant(0,this,this.targetTile)))
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/(10*distTargetCombatant(0,this,this.targetTile)))
                        }
                    }
                    if(this.timer>=10+10*this.procedure[0]){
                        if(this.targetCombatant!=-1){
                            this.targetCombatant.takeDamage(this.effect[0]*(this.battle.modded(3)?3:1),this.user)
                            switch(this.type){
                                case 135:
                                    for(let a=0,la=this.effect[1];a<la;a++){
                                        this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,constants.playerNumber+1)
                                    }
                                break
                            }
                            this.targetCombatant.moveTilePosition(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)
                            this.battle.activate(1,this.targetCombatant.id)
                        }
                        if(this.type==154&&this.target[0]>=0){
                            this.targetTile.addType(10)
                        }
                        this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                        this.battle.activate(1,this.userCombatant.id)
                        if(
                            this.procedure[0]>=0&&this.type==440||
                            this.procedure[0]>=1&&this.type==403||
                            this.procedure[0]>=2&&(this.type==175||this.type==319)||
                            this.procedure[0]>=3&&(this.type==344||this.type==347)
                        ){
                            this.remove=true
                        }
                        this.procedure[0]++
                    }
                    if(this.remove&&this.type==319){
                        this.userCombatant.stance=3
                    }
                break
                case 118:
                    if(this.timer==10||this.timer==15||this.timer==20){
                        this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-56,13,[this.targetCombatant.position.x+random(-10,10),this.targetCombatant.position.y-30+random(-20,20)]))
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                break
                case 119:
                    if(this.timer==10){
                        this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-56,13,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)].statusEffect('Temporary Draw',-this.effect[1])
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                break
                case 120:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(11)
                    }
                    this.userCombatant.runAnimation(1/30,11)
                    if(this.timer==15){
                        for(let a=0,la=this.targetCombatant.length;a<la;a++){
                            this.targetCombatant[a].statusEffect('Distracted',this.effect[0])
                        }
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                break
                case 121: case 382:
                    if(this.timer==1&&this.targetDistance>1){
                        this.userCombatant.startAnimation(0)
                    }else if(this.timer==15*this.targetDistance-14){
                        let offset=transformDirection(0,this.relativeDirection-60)
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        this.procedure[1]=atan2(sin(this.relativeDirection-60)*6/5,cos(this.relativeDirection-60)/sqrt(3))
                        this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.userCombatant.startAnimation(3)
                        if(index>=0){
                            this.distance=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant.position.x,this.targetCombatant.position.y)
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
                case 122: case 383:
                    if(this.timer==1&&this.targetDistance>1){
                        this.userCombatant.startAnimation(0)
                    }else if(this.timer==15*this.targetDistance-14){
                        let offset=transformDirection(0,this.relativeDirection+60)
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        this.procedure[1]=atan2(sin(this.relativeDirection+60)*6/5,cos(this.relativeDirection+60)/sqrt(3))
                        this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.userCombatant.startAnimation(3)
                        if(index>=0){
                            this.distance=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant.position.x,this.targetCombatant.position.y)
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
                case 138:
                    if(this.timer==1&&this.targetDistance>1){
                        this.userCombatant.startAnimation(0)
                    }else if(this.timer==15*this.targetDistance-14){
                        let offset=transformDirection(0,this.relativeDirection-120)
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        this.procedure[1]=atan2(sin(this.relativeDirection-120)*6/5,cos(this.relativeDirection-120)/sqrt(3))
                        this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.userCombatant.startAnimation(12)
                        if(index>=0){
                            this.distance=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant.position.x,this.targetCombatant.position.y)
                        }
                    }
                    if(this.timer>=15*this.targetDistance-14&&this.timer<15*this.targetDistance+6){
                        this.userCombatant.runAnimation(1/10,12)
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
                case 139:
                    if(this.timer==1&&this.targetDistance>1){
                        this.userCombatant.startAnimation(0)
                    }else if(this.timer==15*this.targetDistance-14){
                        let offset=transformDirection(0,this.relativeDirection+120)
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        this.procedure[1]=atan2(sin(this.relativeDirection+120)*6/5,cos(this.relativeDirection+120)/sqrt(3))
                        this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.userCombatant.startAnimation(12)
                        if(index>=0){
                            this.distance=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant.position.x,this.targetCombatant.position.y)
                        }
                    }
                    if(this.timer>=15*this.targetDistance-14&&this.timer<15*this.targetDistance+6){
                        this.userCombatant.runAnimation(1/10,12)
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
                case 123:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(5)
                    }
                    if(this.timer<=30){
                        this.userCombatant.runAnimation(1/15,5)
                    }
                    if(this.timer==15){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,4,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),5*this.targetDistance-2]))
                    }else if(this.timer==10*this.targetDistance+15){
                        this.targetCombatant.statusEffect('Bleed',this.effect[0])
                    }else if(this.timer>=10*this.targetDistance+25){
                        this.remove=true
                    }
                break
                case 125:
                    if(this.timer==1&&this.targetDistance>1){
                        this.userCombatant.startAnimation(0)
                    }else if(this.timer==15*this.targetDistance-14){
                        this.targetCombatant.goal.anim.direction=this.relativeDirection
                        this.userCombatant.goal.anim.direction+=180
                    }else if(this.timer==15*this.targetDistance+1){
                        this.userCombatant.startAnimation(2)
                    }
                    if(this.timer>=15*this.targetDistance+1){
                        this.userCombatant.runAnimation(1/30,2)
                    }else{
                        this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                        this.userCombatant.runAnimation(1/15,0)
                        if(this.timer>=15*this.targetDistance-14){
                            this.targetCombatant.moveTile(this.direction,-this.distance/this.targetDistance/15)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/this.targetDistance/15)
                        }
                    }
                    if(this.timer==15*this.targetDistance){
                        let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                        this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                    }else if(this.timer==15*this.targetDistance+15){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }else if(this.timer>=15*this.targetDistance+30){
                        this.battle.activate(1,this.userCombatant.id)
                        this.remove=true
                    }
                break
                case 127: case 150: case 181: case 209: case 331: case 363:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(this.userCombatant.name=='DD-610'||this.type==363?42:5)
                    }
                    if(this.timer<=30){
                        this.userCombatant.runAnimation(1/15,this.userCombatant.name=='DD-610'||this.type==363?42:5)
                    }
                    if(this.timer==15){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,7,[atan2(this.targetTile.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetTile.position.y),5*this.targetDistance-2]))
                    }else if(this.timer==10*this.targetDistance+15){
                        this.battle.combatantManager.areaAbstract(0,[this.effect[0],this.user,0],this.targetTile.tilePosition,[0],[0,1],false,0)
                        switch(this.type){
                            case 150:
                                this.battle.combatantManager.areaAbstract(7,[this.effect[1],11,[]],this.targetTile.tilePosition,[3,this.userCombatant.id],[0,1],false,0)
                            break
                            case 181:
                                for(let a=0,la=this.effect[1];a<la;a++){
                                    this.battle.combatantManager.areaAbstract(4,[findName(this.effect[2],types.card),0,constants.playerNumber+1],this.targetTile.tilePosition,[5,this.userCombatant.id],[0,1],false,0)
                                }
                            break
                            case 331:
                                this.battle.combatantManager.areaAbstract(5,[this.effect[1]],this.targetTile.tilePosition,[0],[0,1],false,0)
                            break
                        }
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetTile.position.x,this.targetTile.position.y,2,[10]))
                    }else if(this.timer>=10*this.targetDistance+25){
                        this.remove=true
                    }
                break
                case 129:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(5)
                    }
                    if(this.timer<=10||this.timer>35&&this.timer<=45){
                        this.userCombatant.runAnimation(1/10,5)
                    }
                    if(this.timer==15||this.timer==18||this.timer==21||this.timer==24||this.timer==27){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                    }
                    if(this.timer==5*this.targetDistance+15||this.timer==5*this.targetDistance+18||this.timer==5*this.targetDistance+21||this.timer==5*this.targetDistance+24||this.timer==5*this.targetDistance+27){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }else if(this.timer>=max(45,5*this.targetDistance+40)){
                        this.remove=true
                    }
                break
                case 130:
                    if(this.timer==10){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-30,11,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y-30),this.distance/30-2]))
                    }
                    if(this.timer==1){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*(1+1/this.targetDistance)-this.userCombatant.tilePosition.x/this.targetDistance,this.targetCombatant.tilePosition.y*(1+1/this.targetDistance)-this.userCombatant.tilePosition.y/this.targetDistance)
                        this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.userCombatant.startAnimation(3)
                    }
                    if(this.timer<=20){
                        this.userCombatant.runAnimation(1/10,3)
                    }
                    if(this.timer==5*this.targetDistance+5){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.type==35){
                            this.userCombatant.combo++
                        }
                    }else if(this.timer>=5*this.targetDistance+25){
                        this.remove=true
                    }
                    if(this.procedure[0]==2){
                        if(this.timer>5*this.targetDistance+5&&this.timer<=5*this.targetDistance+13){
                            this.targetCombatant.moveTile(this.direction,this.distance/40/this.targetDistance)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40/this.targetDistance)
                        }else if(this.timer>5*this.targetDistance+13&&this.timer<=5*this.targetDistance+21){
                            this.targetCombatant.moveTile(this.direction,-this.distance/40/this.targetDistance)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40/this.targetDistance)
                        }
                        if(this.timer>=5*this.targetDistance+21){
                            this.remove=true
                        }
                    }else if(this.procedure[0]==1){
                        if(this.timer>5*this.targetDistance+5&&this.timer<=5*this.targetDistance+13){
                            this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                        }else if(this.timer>5*this.targetDistance+13&&this.timer<=5*this.targetDistance+21){
                            this.targetCombatant.moveTile(this.direction,-this.distance/10/this.targetDistance)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10/this.targetDistance)
                        }
                        if(this.timer==5*this.targetDistance+13){
                            this.targetCombatant.takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*(1+1/this.targetDistance)-this.userCombatant.tilePosition.x/this.targetDistance,this.targetCombatant.tilePosition.y*(1+1/this.targetDistance)-this.userCombatant.tilePosition.y/this.targetDistance)
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }else if(this.timer>=5*this.targetDistance+21){
                            this.remove=true
                        }
                    }else{
                        if(this.timer>5*this.targetDistance+5){
                            this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                        }
                        if(this.timer>=5*this.targetDistance+15){
                            this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*(1+1/this.targetDistance)-this.userCombatant.tilePosition.x/this.targetDistance,this.targetCombatant.tilePosition.y*(1+1/this.targetDistance)-this.userCombatant.tilePosition.y/this.targetDistance)
                            this.battle.activate(1,this.targetCombatant.id)
                            this.remove=true
                        }
                    }
                break
                case 131: case 384:
                    if(this.timer==10){
                        this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-48,15,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.type==384){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,constants.playerNumber+1)
                            }
                        }
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                break
                case 133:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(this.userCombatant.name=='Randy'?10:6)
                    }
                    this.userCombatant.runAnimation(1/5,this.userCombatant.name=='Randy'?10:6)
                    if(this.timer==5||this.timer==15){
                        this.battle.combatantManager.areaAbstract(0,[this.effect[0],this.user,0],this.userCombatant.tilePosition,[3,this.userCombatant.id],[0,1],false,0)
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                break
                case 134:
                    if(this.targetCombatant==-1){
                        if(this.timer==1){
                            this.userCombatant.startAnimation(7)
                        }
                        this.userCombatant.runAnimation(1/15,7)
                        if(this.timer==10){
                            this.targetIndex=[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)]
                            this.targetCombatant=this.battle.combatantManager.combatants[this.targetIndex[0]]
                            this.battle.tileManager.fireAreaTrefoil(1,this.effect[0],this.targetCombatant.tilePosition,this.effect[1])
                            this.targetCombatant=-1
                        }
                        if(this.timer>=15){
                            this.remove=true
                        }
                    }else{
                        if(this.timer==1){
                            this.userCombatant.startAnimation(5)
                        }
                        if(this.timer<=30){
                            this.userCombatant.runAnimation(1/15,5)
                        }
                        if(this.timer==15){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,16,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),this.distance/30-2]))
                        }else if(this.timer==5*this.targetDistance+15){
                            this.battle.combatantManager.areaAbstract(0,[this.effect[0],this.user,0],this.targetCombatant.tilePosition,[0],[0,1],false,0)
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y,17,[10]))
                        }else if(this.timer>=5*this.targetDistance+25){
                            this.remove=true
                        }
                    }
                break
                case 136:
                    if(this.timer==1){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y,10,[30]))
                    }
                    if(this.timer==10){
                        this.battle.combatantManager.areaAbstract(0,[this.effect[0],this.user,0],this.userCombatant.tilePosition,[3,this.userCombatant.id],[0,1],false,0)
                        this.userCombatant.life=0
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                break
                case 137: case 221:
                    if(this.targetDistance<0){
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
                    }else{
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
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }else if(this.timer>=15*this.targetDistance+15){
                            this.battle.activate(1,this.userCombatant.id)
                            this.remove=true
                        }
                    }
                break
                case 142:
                    if(this.timer==1){
                        for(let a=0,la=this.targetCombatant.length;a<la;a++){
                            let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                            this.procedure[a]=this.targetCombatant[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        }
                        this.userCombatant.startAnimation(13)
                    }
                    if(this.timer<=15){
                        this.userCombatant.runAnimation(1/15,13)
                    }
                    if(this.timer==10){
                        this.userCombatant.statusEffect('Strength',this.effect[0])
                    }
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        if(this.timer==10){
                            this.targetCombatant[a].takeDamage(this.effect[1],this.user)
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
                case 143:
                    if(this.timer==1&&this.targetDistance>1){
                        this.userCombatant.startAnimation(0)
                    }else if(this.timer==15*this.targetDistance-14){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.userCombatant.startAnimation(12)
                    }
                    if(this.timer>=15*this.targetDistance-14&&this.timer<15*this.targetDistance+6){
                        this.userCombatant.runAnimation(1/10,12)
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
                        if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+5){
                            this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                        }
                        if(this.timer==15*this.targetDistance+5){
                            this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        }
                        if(this.timer==15*this.targetDistance+6){
                            let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                            this.procedure[1]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        }
                        if(this.procedure[1]==2){
                            if(this.timer>15*this.targetDistance+5&&this.timer<=15*this.targetDistance+13){
                                this.targetCombatant.moveTile(this.direction,this.distance/40/this.targetDistance)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40/this.targetDistance)
                            }else if(this.timer>15*this.targetDistance+13&&this.timer<=15*this.targetDistance+21){
                                this.targetCombatant.moveTile(this.direction,-this.distance/40/this.targetDistance)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40/this.targetDistance)
                            }
                            if(this.timer>=15*this.targetDistance+21){
                                this.battle.activate(1,this.targetCombatant.id)
                                this.remove=true
                            }
                        }else if(this.procedure[1]==1){
                            if(this.timer>15*this.targetDistance+5&&this.timer<=15*this.targetDistance+13){
                                this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                            }else if(this.timer>15*this.targetDistance+13&&this.timer<=15*this.targetDistance+21){
                                this.targetCombatant.moveTile(this.direction,-this.distance/10/this.targetDistance)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10/this.targetDistance)
                            }
                            if(this.timer==15*this.targetDistance+13){
                                this.targetCombatant.takeDamage(game.collisionDamage,-1)
                            }else if(this.timer>=15*this.targetDistance+21){
                                this.battle.activate(1,this.targetCombatant.id)
                                this.remove=true
                            }
                        }else{
                            if(this.timer>15*this.targetDistance+5){
                                this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                            }
                            if(this.timer>=15*this.targetDistance+15){
                                this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                                this.battle.activate(1,this.targetCombatant.id)
                                this.remove=true
                            }
                        }
                    }
                break
                case 144:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(5)
                    }
                    if(this.timer<=10||this.timer>20&&this.timer<=30){
                        this.userCombatant.runAnimation(1/10,5)
                    }
                    if(this.timer==15){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,18,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                    }else if(this.timer==5*this.targetDistance+15){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.id<this.battle.players){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                if(this.battle.cardManagers[this.targetCombatant.id].reserve.cards.length>0){
                                    this.battle.cardManagers[this.targetCombatant.id].randomEffect(1,10,[])
                                }else{
                                    this.battle.cardManagers[this.targetCombatant.id].randomEffect(3,10,[])
                                }
                            }
                        }
                    }else if(this.timer>=max(30,5*this.targetDistance+25)){
                        this.remove=true
                    }
                break
                case 145:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(5)
                    }
                    if(this.timer<=10||this.timer>20&&this.timer<=30){
                        this.userCombatant.runAnimation(1/10,5)
                    }
                    if(this.timer==15){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,19,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                    }else if(this.timer==5*this.targetDistance+15){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.blocked>0){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,constants.playerNumber+1)
                            }
                        }
                    }else if(this.timer>=max(30,5*this.targetDistance+25)){
                        this.remove=true
                    }
                break
                case 147: case 415:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(6)
                    }
                    this.userCombatant.runAnimation(3/10,6)
                    if(this.timer==4||this.timer==10||this.timer==16){
                        switch(this.type){
                            case 147:
                                this.battle.combatantManager.areaAbstract(0,[this.effect[0],this.user,0],this.userCombatant.tilePosition,[3,this.userCombatant.id],[0,1],false,0)
                            break
                            case 415:
                                this.battle.combatantManager.areaAbstract(0,[this.effect[0],this.user,0],this.userCombatant.tilePosition,[3,this.userCombatant.id],[0,2],false,0)
                            break
                        }
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                break
                case 148:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(5)
                    }
                    if(this.timer<=10||this.timer>20&&this.timer<=30){
                        this.userCombatant.runAnimation(1/10,5)
                    }
                    if(this.timer==15){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,20,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                    }else if(this.timer==5*this.targetDistance+15){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Poison',this.effect[1])
                    }else if(this.timer>=max(30,5*this.targetDistance+25)){
                        this.remove=true
                    }
                break
                case 156:
                    if(this.targetDistance==1){
                        if(this.timer==1){
                            this.userCombatant.startAnimation(2)
                        }
                        this.userCombatant.runAnimation(1/15,2)
                        if(this.timer==12||this.timer==18){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }else if(this.timer>=30){
                            this.remove=true
                        }
                    }else if(this.targetDistance==2){
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
                        if(this.timer<=10){
                            this.userCombatant.moveTile(this.direction,this.distance/30)
                            this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/30)
                        }else if(this.timer>20&&this.timer<=30){
                            this.userCombatant.moveTile(this.direction,-this.distance/30)
                            this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/30)
                            this.targetCombatant.moveTile(this.direction,-this.distance/20)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/20)
                        }
                        if(this.timer==31){
                            this.targetCombatant.moveTilePosition(round(this.targetCombatant.tilePosition.x/2+this.userCombatant.tilePosition.x/2),round(this.targetCombatant.tilePosition.y/2+this.userCombatant.tilePosition.y/2))
                            this.battle.activate(1,this.targetCombatant.id)
                            this.userCombatant.startAnimation(2)
                        }
                        if(this.timer>30&&this.timer<=60){
                            this.userCombatant.runAnimation(1/15,2)
                        }
                        if(this.timer==42||this.timer==48){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.battle.activate(1,this.userCombatant.id)
                        }else if(this.timer>=60){
                            this.remove=true
                        }
                    }
                break
                case 158:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(5)
                    }
                    if(this.timer<=10||this.timer>20&&this.timer<=30){
                        this.userCombatant.runAnimation(1/10,5)
                    }
                    if(this.timer==15){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,21,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                    }else if(this.timer==5*this.targetDistance+15){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.id<this.battle.players){
                            this.battle.cardManagers[this.targetCombatant.id].hand.exhaust(this.effect[1])
                        }
                    }else if(this.timer>=max(30,5*this.targetDistance+25)){
                        this.remove=true
                    }
                break
                case 161:
                    if(this.timer==10){
                        this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-36,22,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }else if(this.timer>=20){
                        this.battle.turnManager.unMoveTurn(this.user)
                        this.remove=true
                    }
                break
                case 162:
                    if(this.timer==1){
                        this.procedure[0]=0
                    }
                    if(this.timer==1+10*this.procedure[0]){
                        this.target=[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.direction)[1]),
                        this.battle.combatantManager.getCombatantIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.direction)[1])]
                        if(this.target[0]<0||this.target[1]>=0){
                            if(this.procedure[0]>0){
                                this.battle.activate(1,this.userCombatant.id)
                            }
                            this.battle.turnManager.unMoveTurn(this.user)
                            this.remove=true
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y,23,[20]))
                            this.battle.combatantManager.areaAbstract(0,[this.effect[0],this.user,0],this.userCombatant.tilePosition,[0],[0,1],false,0)
                        }else{
                            this.targetTile=this.battle.tileManager.tiles[this.target[0]]
                            this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                            this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)
                            this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                            this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                        }
                    }
                    if(!this.remove){
                        this.userCombatant.moveTile(this.direction,this.distance/(10*distTargetCombatant(0,this,this.targetTile)))
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(10*distTargetCombatant(0,this,this.targetTile)))
                    }
                    if(this.timer>=10+10*this.procedure[0]){
                        this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                        this.procedure[0]++
                    }
                break
                case 163: case 187: case 366:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(14)
                    }
                    this.userCombatant.runAnimation(1/30,14)
                    if(this.timer==15){
                        switch(this.type){
                            case 163:
                                this.userCombatant.heal(this.effect[0])
                                this.userCombatant.statusEffect('Double Damage',this.effect[1])
                            break
                            case 187:
                                this.userCombatant.statusEffect('Buffer',this.effect[0])
                                this.userCombatant.statusEffect('Strength',this.effect[1])
                            break
                            case 366:
                                this.battle.combatantManager.combatants[this.userCombatant.builder].statusEffect('Double Damage',this.effect[0])
                                this.battle.particleManager.createNumber(106,this.position.x,this.position.y,'Yes')
                            break
                        }
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                break
                case 165:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(1)
                    }
                    this.userCombatant.runAnimation(1/20,1)
                    if(this.timer==10){
                        this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-30,24,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                break
                case 166:
                    if(this.timer==1){
                        for(let a=0,la=this.targetCombatant.length;a<la;a++){
                            if(this.targetDistance[a]==2){
                                let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x/2+this.userCombatant.tilePosition.x/2,this.targetCombatant[a].tilePosition.y/2+this.userCombatant.tilePosition.y/2)
                                this.procedure[a]=this.targetCombatant[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                            }
                        }
                        this.userCombatant.startAnimation(9)
                    }
                    if(this.timer<=15){
                        this.userCombatant.runAnimation(1/15,9)
                    }
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        if(this.timer==10){
                            this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                            if(this.type==166&&this.targetCombatant[a].id<this.battle.players){
                                for(let b=0,lb=this.effect[1];b<lb;b++){
                                    this.battle.drop(this.targetCombatant[a].id,findName(this.effect[2],types.card),0,constants.playerNumber+1)
                                }
                            }
                        }
                        if(this.targetDistance[a]==2){
                            if(this.procedure[a]==2){
                                if(this.timer>10&&this.timer<=18){
                                    this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/40/this.targetDistance[a])
                                    this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/40/this.targetDistance[a])
                                }else if(this.timer>18&&this.timer<=26){
                                    this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/40/this.targetDistance[a])
                                    this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/40/this.targetDistance[a])
                                }
                            }else if(this.procedure[a]==1){
                                if(this.timer>10&&this.timer<=18){
                                    this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/10/this.targetDistance[a])
                                    this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/10/this.targetDistance[a])
                                }else if(this.timer>18&&this.timer<=26){
                                    this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10/this.targetDistance[a])
                                    this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10/this.targetDistance[a])
                                }
                                if(this.timer==18){
                                    this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                                    let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x/2+this.userCombatant.tilePosition.x/2,this.targetCombatant[a].tilePosition.y/2+this.userCombatant.tilePosition.y/2)
                                    if(index>=0){
                                        this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                                    }
                                }
                            }else if(this.procedure[a]==0){
                                if(this.timer>10){
                                    this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/10/this.targetDistance[a])
                                    this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/10/this.targetDistance[a])
                                }
                                if(this.timer>=20){
                                    this.targetCombatant[a].moveTilePosition(this.targetCombatant[a].tilePosition.x/2+this.userCombatant.tilePosition.x/2,this.targetCombatant[a].tilePosition.y/2+this.userCombatant.tilePosition.y/2)
                                    this.battle.activate(1,this.targetCombatant[a].id)
                                    this.procedure[a]=-1
                                }
                            }
                        }
                    }
                    if(this.timer>=26){
                        this.remove=true
                    }
                break
                case 173:
                    if(this.timer==10||this.timer==25){
                        this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-81,25,[this.targetCombatant.position.x,this.targetCombatant.position.y-33]))
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }else if(this.timer>=35){
                        this.remove=true
                    }
                break
                case 176:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(6)
                    }
                    this.userCombatant.runAnimation(1/10,6)
                    if(this.timer==10){
                        for(let a=0,la=this.targetCombatant.length;a<la;a++){
                            this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                        }
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                break
                case 180:
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
                    }else if(this.targetDistance>1){
                        if(this.timer==1){
                            this.userCombatant.startAnimation(0)
                        }else if(this.timer==15*this.targetDistance-19){
                            this.userCombatant.startAnimation(3)
                        }
                        if(this.timer<=15*this.targetDistance-20||this.timer>15*this.targetDistance-5&&this.timer<=30*this.targetDistance-25){
                            this.userCombatant.runAnimation(1/10,0)
                        }else if(this.timer<=15*this.targetDistance+10){
                            this.userCombatant.runAnimation(1/10,3)
                        }
                        if(this.timer<=15*this.targetDistance-20){
                            this.userCombatant.moveTile(this.direction,this.distance/15/this.targetDistance)
                            this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/15/this.targetDistance)
                        }else if(this.timer>15*this.targetDistance-10&&this.timer<=30*this.targetDistance-30){
                            this.userCombatant.moveTile(this.direction,-this.distance/15/this.targetDistance)
                            this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/15/this.targetDistance)
                        }
                        if(this.timer>15*this.targetDistance-5&&this.timer<=30*this.targetDistance-20){
                            this.targetCombatant.moveTile(this.direction,-this.distance/15/this.targetDistance)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/15/this.targetDistance)
                        }
                        if(this.timer==30*this.targetDistance-19){
                            this.targetCombatant.moveTilePosition(round(this.userCombatant.tilePosition.x*(1-1/this.targetDistance)+this.targetCombatant.tilePosition.x/this.targetDistance),round(this.userCombatant.tilePosition.y*(1-1/this.targetDistance)+this.targetCombatant.tilePosition.y/this.targetDistance))
                            this.battle.activate(1,this.targetCombatant.id)
                            this.userCombatant.startAnimation(0)
                            this.userCombatant.runAnimation(1/10,0)
                            this.userCombatant.startAnimation(2)
                        }
                        if(this.timer>=30*this.targetDistance-20&&this.timer<=30*this.targetDistance+10){
                            this.userCombatant.runAnimation(1/30,2)
                        }
                        if(this.timer==30*this.targetDistance-5){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.battle.activate(1,this.userCombatant.id)
                        }else if(this.timer>=30*this.targetDistance+10){
                            this.remove=true
                        }
                    }
                break
                case 185:
                    if(this.timer==1){
                        this.procedure[0]=distTargetCombatant(0,this.userCombatant,this.targetCombatant)>=0?0:
                            distTargetCombatant(0,{tilePosition:{x:this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],y:this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]}},this.targetCombatant)==1?1:
                            distTargetCombatant(0,{tilePosition:{x:this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],y:this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]}},this.targetCombatant)==1?2:
                            distTargetCombatant(0,{tilePosition:{x:this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],y:this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]}},this.targetCombatant)>=0?1:
                            distTargetCombatant(0,{tilePosition:{x:this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],y:this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]}},this.targetCombatant)>=0?2:3
                    }
                    if(this.procedure[0]==0){
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
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }else if(this.timer>=15*this.targetDistance+15){
                            this.battle.activate(1,this.userCombatant.id)
                            this.remove=true
                        }
                    }else if(this.procedure[0]==1||this.procedure[0]==2){
                        if(this.timer==1){
                            this.ztarget=this.procedure[0]==2?[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1])]:[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1])]
                            if(this.ztarget[0]==-1){
                                this.remove=true
                            }else{
                                this.ztargetTile=this.battle.tileManager.tiles[this.ztarget[0]]
                                if(this.ztargetTile.occupied>0){
                                    this.remove=true
                                }
                                this.zdirection=atan2(this.ztargetTile.position.x-this.position.x,this.ztargetTile.position.y-this.position.y)
                                this.zdistance=sqrt((this.ztargetTile.position.x-this.position.x)**2+(this.ztargetTile.position.y-this.position.y)**2)
                                this.zrelativeDirection=atan2(this.ztargetTile.relativePosition.x-this.relativePosition.x,this.ztargetTile.relativePosition.y-this.relativePosition.y)
                                this.zrelativeDistance=sqrt((this.ztargetTile.relativePosition.x-this.relativePosition.x)**2+(this.ztargetTile.relativePosition.y-this.relativePosition.y)**2)
                            }
                            this.userCombatant.startAnimation(0)
                        }
                        if(this.timer<=15&&!this.remove){
                            this.userCombatant.moveTile(this.zdirection,this.zdistance/(15*distTargetCombatant(0,this,this.ztargetTile)))
                            this.userCombatant.moveRelativeTile(this.zrelativeDirection,this.zrelativeDistance/(15*distTargetCombatant(0,this,this.ztargetTile)))
                            this.userCombatant.runAnimation(1/15,0)
                        }
                        if(this.timer==15&&!this.remove){
                            this.userCombatant.moveTilePosition(this.ztargetTile.tilePosition.x,this.ztargetTile.tilePosition.y)
                            this.battle.activate(1,this.userCombatant.id)
                            this.direction=atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.targetCombatant.position.y-this.userCombatant.position.y)
                            this.distance=sqrt((this.targetCombatant.position.x-this.userCombatant.position.x)**2+(this.targetCombatant.position.y-this.userCombatant.position.y)**2)
                            this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.userCombatant.relativePosition.x,this.targetCombatant.relativePosition.y-this.userCombatant.relativePosition.y)
                            this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.userCombatant.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.userCombatant.relativePosition.y)**2)
                            this.targetDistance=distTargetCombatant(0,this.userCombatant,this.targetCombatant)
                        }
                        if(this.timer==16&&this.targetDistance>1){
                            this.userCombatant.startAnimation(0)
                        }else if(this.timer==15*this.targetDistance+1){
                            this.userCombatant.startAnimation(2)
                        }
                        if(this.timer>=15*this.targetDistance+1){
                            this.userCombatant.runAnimation(1/30,2)
                        }else if(this.timer>15){
                            this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                            this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                            this.userCombatant.runAnimation(1/15,0)
                        }
                        if(this.timer==15*this.targetDistance){
                            let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                            this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                        }else if(this.timer==15*this.targetDistance+15){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }else if(this.timer>=15*this.targetDistance+30){
                            this.battle.activate(1,this.userCombatant.id)
                            this.remove=true
                        }
                    }else{
                        this.remove=true
                    }
                break
                case 191:
                    if(this.timer==5||this.timer==10||this.timer==15||this.timer==20||this.timer==25){
                        this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-90,26,[this.targetCombatant.position.x+random(-10,10),this.targetCombatant.position.y-25+random(-40,40)]))
                        this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.targetCombatant.position.x+random(-10,10),this.targetCombatant.position.y-25+random(-40,40),27,[25]))
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                break
                case 199: case 200: case 201: case 202: case 425:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(3)
                    }
                    this.userCombatant.runAnimation(1/10,3)
                    if(this.timer==10){
                        this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,this.type==425?28:this.type-171,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        switch(this.type){
                            case 199:
                                if(this.targetCombatant.id<this.battle.players){
                                    for(let a=0,la=this.effect[1];a<la;a++){
                                        if(this.battle.cardManagers[this.targetCombatant.id].reserve.cards.length>0){
                                            this.battle.cardManagers[this.targetCombatant.id].reserve.randomEffect(14,[])
                                        }else if(this.battle.cardManagers[this.targetCombatant.id].discard.cards.length>0){
                                            this.battle.cardManagers[this.targetCombatant.id].discard.randomEffect(14,[])
                                        }else{
                                            this.battle.cardManagers[this.targetCombatant.id].hand.randomEffect(14,[])
                                        }
                                    }
                                }
                            break
                            case 200:
                                this.userCombatant.heal(this.targetCombatant.taken)
                            break
                            case 201:
                                if(this.targetCombatant.id<this.battle.players){
                                    for(let a=0,la=this.effect[1];a<la;a++){
                                        if(this.battle.cardManagers[this.targetCombatant.id].reserve.cards.length>0){
                                            this.battle.cardManagers[this.targetCombatant.id].reserve.randomEffect(15,[])
                                        }else if(this.battle.cardManagers[this.targetCombatant.id].discard.cards.length>0){
                                            this.battle.cardManagers[this.targetCombatant.id].discard.randomEffect(15,[])
                                        }else{
                                            this.battle.cardManagers[this.targetCombatant.id].hand.randomEffect(15,[])
                                        }
                                    }
                                }
                            break
                            case 202:
                                this.targetCombatant.clearStatus()
                            break
                        }
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                break
                case 203:
                    if(this.timer==1&&this.targetDistance>1){
                        this.userCombatant.startAnimation(0)
                    }else if(this.timer==15*this.targetDistance-14){
                        this.procedure[2]=floor(random(-1,2))
                        let offset=transformDirection(0,this.relativeDirection+this.procedure[2]*60)
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        this.procedure[1]=atan2(sin(this.relativeDirection+this.procedure[2]*60)*6/5,cos(this.relativeDirection+this.procedure[2]*60)/sqrt(3))
                        this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.userCombatant.startAnimation(3)
                        if(index>=0){
                            this.distance=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant.position.x,this.targetCombatant.position.y)
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
                    }else if(this.timer>=15*this.targetDistance+15){
                        this.remove=true
                    }
                    if(this.procedure[0]==2){
                        if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                            this.targetCombatant.moveTile(this.procedure[1],this.distance/40/this.targetDistance)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection+this.procedure[2]*60,this.relativeDistance/40/this.targetDistance)
                        }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                            this.targetCombatant.moveTile(this.procedure[1],-this.distance/40/this.targetDistance)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection+this.procedure[2]*60,-this.relativeDistance/40/this.targetDistance)
                        }
                        if(this.timer>=15*this.targetDistance+11){
                            this.remove=true
                        }
                    }else if(this.procedure[0]==1){
                        if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                            this.targetCombatant.moveTile(this.procedure[1],this.distance/10/this.targetDistance)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection+this.procedure[2]*60,this.relativeDistance/10/this.targetDistance)
                        }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                            this.targetCombatant.moveTile(this.procedure[1],-this.distance/10/this.targetDistance)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection+this.procedure[2]*60,-this.relativeDistance/10/this.targetDistance)
                        }
                        if(this.timer==15*this.targetDistance+3){
                            this.targetCombatant.takeDamage(game.collisionDamage,-1)
                            let offset=transformDirection(0,this.relativeDirection+this.procedure[2]*60)
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
                            this.targetCombatant.moveRelativeTile(this.relativeDirection+this.procedure[2]*60,this.relativeDistance/10/this.targetDistance)
                        }
                        if(this.timer>=15*this.targetDistance+5){
                            let offset=transformDirection(0,this.relativeDirection+this.procedure[2]*60)
                            this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                            this.battle.activate(1,this.targetCombatant.id)
                            this.remove=true
                        }
                    }
                break
                case 206:
                    if(this.timer==1&&this.targetDistance>1){
                        this.userCombatant.startAnimation(0)
                    }else if(this.timer==15*this.targetDistance-14){
                        this.targetCombatant.goal.anim.direction=this.relativeDirection
                        this.userCombatant.goal.anim.direction+=180
                    }else if(this.timer==15*this.targetDistance+1){
                        this.userCombatant.startAnimation(2)
                    }
                    if(this.timer>=15*this.targetDistance+1){
                        this.userCombatant.runAnimation(1/15,2)
                    }else{
                        this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                        this.userCombatant.runAnimation(1/15,0)
                        if(this.timer>=15*this.targetDistance-14){
                            this.targetCombatant.moveTile(this.direction,-this.distance/this.targetDistance/15)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/this.targetDistance/15)
                        }
                    }
                    if(this.timer==15*this.targetDistance){
                        let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                        this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                    }else if(this.timer==15*this.targetDistance+10||this.timer==15*this.targetDistance+20){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }else if(this.timer>=15*this.targetDistance+30){
                        this.battle.activate(1,this.userCombatant.id)
                        this.remove=true
                    }
                break
                case 208:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(5)
                    }
                    if(this.timer<=30){
                        this.userCombatant.runAnimation(1/15,5)
                    }
                    if(this.timer==15){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,32,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),5*this.targetDistance-2]))
                    }else if(this.timer==10*this.targetDistance+15){
                        this.battle.combatantManager.areaAbstract(0,[this.effect[0],this.user,0],this.targetCombatant.tilePosition,[0],[0,1],false,0)
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y,2,[8]))
                    }else if(this.timer>=10*this.targetDistance+25){
                        this.remove=true
                    }
                break
                case 211:
                    if(this.targetDistance==1){
                        if(this.timer==1&&this.targetDistance>1){
                            this.userCombatant.startAnimation(0)
                        }else if(this.timer==15*this.targetDistance-14){
                            let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                            this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                    }else if(this.targetDistance>1){
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
                        if(this.timer==11+this.targetDistance*10){
                            this.targetCombatant.moveTilePosition(round(this.userCombatant.tilePosition.x*(1-1/this.targetDistance)+this.targetCombatant.tilePosition.x/this.targetDistance),round(this.userCombatant.tilePosition.y*(1-1/this.targetDistance)+this.targetCombatant.tilePosition.y/this.targetDistance))
                            this.battle.activate(1,this.targetCombatant.id)
                            this.userCombatant.startAnimation(2)
                            if(this.type==188){
                                this.targetCombatant.takeDamage(this.effect[0]*(this.targetDistance-1),this.user)
                            }
                        }
                        if(this.timer>=10+this.targetDistance*10&&this.timer<=40+this.targetDistance*10){
                            this.userCombatant.runAnimation(1/30,2)
                        }
                        if(this.timer==25+this.targetDistance*10){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.battle.activate(1,this.userCombatant.id)
                        }else if(this.timer>=40+this.targetDistance*10){
                            this.remove=true
                        }
                    }
                break
                case 212:
                    if(this.timer==1&&this.targetDistance>1){
                        this.userCombatant.startAnimation(0)
                    }else if(this.timer==15*this.targetDistance-14){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                    }else if(this.timer>=15*this.targetDistance+50){
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
                        if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+5){
                            this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                        }
                        if(this.timer==15*this.targetDistance+5){
                            this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                            this.battle.activate(1,this.targetCombatant.id)
                        }
                        if(this.timer==15*this.targetDistance+6){
                            this.userCombatant.startAnimation(0)
                        }else if(this.timer==15*this.targetDistance+21){
                            let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                            this.procedure[1]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                            this.userCombatant.startAnimation(3)
                        }
                        if(this.timer>15*this.targetDistance+20&&this.timer<=15*this.targetDistance+40){
                            this.userCombatant.runAnimation(1/10,3)
                        }else if(this.timer>15*this.targetDistance+5&&this.timer<=15*this.targetDistance+20){
                            this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                            this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                            this.userCombatant.runAnimation(1/15,0)
                        }
                        if(this.timer==15*this.targetDistance+20){
                            let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                            this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                            this.battle.activate(1,this.userCombatant.id)
                        }else if(this.timer==15*this.targetDistance+30){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }else if(this.timer>=15*this.targetDistance+50){
                            this.remove=true
                        }
                        if(this.procedure[1]==2){
                            if(this.timer>15*this.targetDistance+30&&this.timer<=15*this.targetDistance+38){
                                this.targetCombatant.moveTile(this.direction,this.distance/40/this.targetDistance)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40/this.targetDistance)
                            }else if(this.timer>15*this.targetDistance+38&&this.timer<=15*this.targetDistance+46){
                                this.targetCombatant.moveTile(this.direction,-this.distance/40/this.targetDistance)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40/this.targetDistance)
                            }
                            if(this.timer>=15*this.targetDistance+46){
                                this.remove=true
                            }
                        }else if(this.procedure[1]==1){
                            if(this.timer>15*this.targetDistance+30&&this.timer<=15*this.targetDistance+38){
                                this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                            }else if(this.timer>15*this.targetDistance+38&&this.timer<=15*this.targetDistance+46){
                                this.targetCombatant.moveTile(this.direction,-this.distance/10/this.targetDistance)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10/this.targetDistance)
                            }
                            if(this.timer==15*this.targetDistance+38){
                                this.targetCombatant.takeDamage(game.collisionDamage,-1)
                                let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                                if(index>=0){
                                    this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                                }
                            }else if(this.timer>=15*this.targetDistance+46){
                                this.remove=true
                            }
                        }else{
                            if(this.timer>15*this.targetDistance+30){
                                this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                            }
                            if(this.timer>=15*this.targetDistance+40){
                                this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                                this.battle.activate(1,this.targetCombatant.id)
                                this.remove=true
                            }
                        }
                    }
                break
                case 213: case 350:
                    if(this.timer==1){
                        this.procedure=[[],[]]
                        for(let a=0,la=this.targetCombatant.length;a<la;a++){
                            let offset=transformDirection(0,this.relativeDirection[a]+60)
                            let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                            this.procedure[1][a]=atan2(sin(this.relativeDirection[a]+60)*6/5,cos(this.relativeDirection[a]+60)/sqrt(3))
                            this.procedure[0][a]=this.targetCombatant[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                            if(index>=0){
                                this.distance[a]=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant[a].position.x,this.targetCombatant[a].position.y)
                            }
                        }
                        this.userCombatant.startAnimation(6)
                    }
                    if(this.timer<=15){
                        this.userCombatant.runAnimation(2/15,6)
                    }
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        if(this.timer==10){
                            this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                            switch(this.type){
                                case 350:
                                    for(let a=0,la=this.effect[1];a<la;a++){
                                        this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,constants.playerNumber+1)
                                    }
                                break
                            }
                        }
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
                case 351:
                    if(this.timer==1){
                        this.procedure=[[],[]]
                        for(let a=0,la=this.targetCombatant.length;a<la;a++){
                            let offset=transformDirection(0,this.relativeDirection[a]-60)
                            let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                            this.procedure[1][a]=atan2(sin(this.relativeDirection[a]-60)*6/5,cos(this.relativeDirection[a]-60)/sqrt(3))
                            this.procedure[0][a]=this.targetCombatant[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                            if(index>=0){
                                this.distance[a]=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant[a].position.x,this.targetCombatant[a].position.y)
                            }
                        }
                        this.userCombatant.startAnimation(6)
                    }
                    if(this.timer<=15){
                        this.userCombatant.runAnimation(2/15,6)
                    }
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        if(this.timer==10){
                            this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                            switch(this.type){
                                case 350:
                                    for(let a=0,la=this.effect[1];a<la;a++){
                                        this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,constants.playerNumber+1)
                                    }
                                break
                            }
                        }
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
                case 218: case 219: case 283: case 284: case 285: case 286:
                    if(this.timer==1){
                        this.userCombatant.goal.anim.direction=this.relativeDirection
                        this.userCombatant.startAnimation(3)
                    }
                    this.userCombatant.runAnimation(1/10,3)
                    if(this.timer==10){
                        this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,33,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        switch(this.type){
                            case 284:
                                this.targetCombatant.randomStatusInstant(this.effect[1],[1])
                            break
                            case 285:
                                this.userCombatant.randomStatusInstant(this.effect[1],[1])
                            break
                        }
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                break
                case 222:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(3)
                    }
                    this.userCombatant.runAnimation(1/15,3)
                    if(this.timer==15){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y,34,[10,this.userCombatant.goal.anim.direction]))
                        for(let a=0,la=this.targetCombatant.length;a<la;a++){
                            this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                        }
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                break
                case 223:
                    if(this.timer==1){
                        this.procedure=[[],[]]
                        for(let a=0,la=this.targetCombatant.length;a<la;a++){
                            let offset=transformDirection(0,this.relativeDirection[a]+120)
                            let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                            this.procedure[1][a]=atan2(sin(this.relativeDirection[a]+120)*6/5,cos(this.relativeDirection[a]+120)/sqrt(3))
                            this.procedure[0][a]=this.targetCombatant[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                            if(index>=0){
                                this.distance[a]=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant[a].position.x,this.targetCombatant[a].position.y)
                            }
                        }
                        this.userCombatant.startAnimation(6)
                    }
                    if(this.timer<=15){
                        this.userCombatant.runAnimation(2/15,6)
                    }
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        if(this.timer==10){
                            this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                        }
                        if(this.procedure[0][a]==2){
                            if(this.timer>10&&this.timer<=18){
                                this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/40)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+120,this.relativeDistance[a]/40/this.targetDistance[a])
                            }else if(this.timer>18&&this.timer<=26){
                                this.targetCombatant[a].moveTile(this.procedure[1][a],-this.distance[a]/40)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+120,-this.relativeDistance[a]/40/this.targetDistance[a])
                            }
                        }else if(this.procedure[0][a]==1){
                            if(this.timer>10&&this.timer<=18){
                                this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/10)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+120,this.relativeDistance[a]/10/this.targetDistance[a])
                            }else if(this.timer>18&&this.timer<=26){
                                this.targetCombatant[a].moveTile(this.procedure[1][a],-this.distance[a]/10)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+120,-this.relativeDistance[a]/10/this.targetDistance[a])
                            }
                            if(this.timer==18){
                                this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                                let offset=transformDirection(0,this.relativeDirection+120)
                                let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                                if(index>=0){
                                    this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                                }
                            }
                        }else if(this.procedure[0][a]==0){
                            if(this.timer>10){
                                this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/10)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+120,this.relativeDistance[a]/10/this.targetDistance[a])
                            }
                            if(this.timer>=20){
                                let offset=transformDirection(0,this.relativeDirection[a]+120)
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
                case 224:
                    if(this.timer==1){
                        this.procedure=[[],[]]
                        for(let a=0,la=this.targetCombatant.length;a<la;a++){
                            let offset=transformDirection(0,this.relativeDirection[a]-120)
                            let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                            this.procedure[1][a]=atan2(sin(this.relativeDirection[a]-120)*6/5,cos(this.relativeDirection[a]-120)/sqrt(3))
                            this.procedure[0][a]=this.targetCombatant[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                            if(index>=0){
                                this.distance[a]=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant[a].position.x,this.targetCombatant[a].position.y)
                            }
                        }
                        this.userCombatant.startAnimation(6)
                    }
                    if(this.timer<=15){
                        this.userCombatant.runAnimation(2/15,6)
                    }
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        if(this.timer==10){
                            this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                        }
                        if(this.procedure[0][a]==2){
                            if(this.timer>10&&this.timer<=18){
                                this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/40)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]-120,this.relativeDistance[a]/40/this.targetDistance[a])
                            }else if(this.timer>18&&this.timer<=26){
                                this.targetCombatant[a].moveTile(this.procedure[1][a],-this.distance[a]/40)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]-120,-this.relativeDistance[a]/40/this.targetDistance[a])
                            }
                        }else if(this.procedure[0][a]==1){
                            if(this.timer>10&&this.timer<=18){
                                this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/10)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]-120,this.relativeDistance[a]/10/this.targetDistance[a])
                            }else if(this.timer>18&&this.timer<=26){
                                this.targetCombatant[a].moveTile(this.procedure[1][a],-this.distance[a]/10)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]-120,-this.relativeDistance[a]/10/this.targetDistance[a])
                            }
                            if(this.timer==18){
                                this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                                let offset=transformDirection(0,this.relativeDirection-120)
                                let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                                if(index>=0){
                                    this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                                }
                            }
                        }else if(this.procedure[0][a]==0){
                            if(this.timer>10){
                                this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/10)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]-120,this.relativeDistance[a]/10/this.targetDistance[a])
                            }
                            if(this.timer>=20){
                                let offset=transformDirection(0,this.relativeDirection[a]-120)
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
                case 225:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(10)
                    }
                    this.userCombatant.runAnimation(1/20,10)
                    if(this.timer>=10){
                        this.userCombatant.life=0
                        this.battle.quickReinforce(this.userCombatant.name)
                        this.remove=true
                    }
                break
                case 226:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(17)
                    }
                    this.userCombatant.runAnimation(1/30,17)
                    if(this.timer==15){
                        this.targetCombatant.statusEffect('Temporary Speed Up',-this.effect[0])
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                break
                case 227:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(17)
                    }
                    this.userCombatant.runAnimation(1/30,17)
                    if(this.timer==15){
                        this.targetCombatant.statusEffect('Confusion',this.effect[0])
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                break
                case 233:
                    if(this.targetCombatant.length>0){
                        if(this.timer==1){
                            this.timer+=10
                        }
                        if(this.timer==11){
                            this.userCombatant.goal.anim.direction=round(atan2(this.targetCombatant[0].relativePosition.x-this.userCombatant.relativePosition.x,this.targetCombatant[0].relativePosition.y-this.userCombatant.relativePosition.y)/60-1/2)*60+30
                            this.userCombatant.startAnimation(25)
                        }
                        if(this.timer<=20||this.timer>30&&this.timer<=40){
                            this.userCombatant.runAnimation(1/10,25)
                        }
                        if(this.timer==25){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,6,[atan2(this.targetCombatant[0].position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant[0].position.y+30),2.5*this.targetDistance[0]-1]))
                        }else if(this.timer==5*this.targetDistance[0]+25){
                            this.targetCombatant[0].takeDamage(this.effect[0],this.user)
                        }else if(this.timer>=max(40,5*this.targetDistance[0]+35)){
                            this.targetCombatant.splice(0,1)
                            this.targetDistance.splice(0,1)
                            this.timer=10
                        }
                    }else{
                        this.remove=true
                    }
                break
                case 235:
                    if(this.timer==1){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.targetCombatant.tilePosition.y+transformDirection(0,this.direction)[1])
                        this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.userCombatant.startAnimation(5)
                    }
                    if(this.timer<=10||this.timer>20&&this.timer<=30){
                        this.userCombatant.runAnimation(1/10,5)
                    }
                    if(this.timer==15){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,39,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x-this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y-this.targetCombatant.position.y-this.userCombatant.graphics.arms[0].bottom.y),this.distance/30-2]))
                    }else if(this.timer==5*this.targetDistance+15){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }
                    if(this.procedure[0]==2){
                        if(this.timer>5*this.targetDistance+15&&this.timer<=5*this.targetDistance+23){
                            this.targetCombatant.moveTile(this.direction,this.distance/40/this.targetDistance)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40/this.targetDistance)
                        }else if(this.timer>5*this.targetDistance+23&&this.timer<=5*this.targetDistance+31){
                            this.targetCombatant.moveTile(this.direction,-this.distance/40/this.targetDistance)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40/this.targetDistance)
                        }
                        if(this.timer>=5*this.targetDistance+31){
                            this.remove=true
                        }
                    }else if(this.procedure[0]==1){
                        if(this.timer>5*this.targetDistance+15&&this.timer<=5*this.targetDistance+23){
                            this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                        }else if(this.timer>5*this.targetDistance+23&&this.timer<=5*this.targetDistance+31){
                            this.targetCombatant.moveTile(this.direction,-this.distance/10/this.targetDistance)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10/this.targetDistance)
                        }
                        if(this.timer==5*this.targetDistance+23){
                            this.targetCombatant.takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.targetCombatant.tilePosition.y+transformDirection(0,this.direction)[1])
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }else if(this.timer>5*this.targetDistance+31){
                            this.remove=true
                        }
                    }else{
                        if(this.timer>5*this.targetDistance+15){
                            this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                        }
                        if(this.timer>=5*this.targetDistance+25){
                            this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.targetCombatant.tilePosition.y+transformDirection(0,this.direction)[1])
                            this.battle.activate(1,this.targetCombatant.id)
                            this.remove=true
                        }
                    }
                break
                case 236: case 443:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(5)
                    }
                    if(this.timer<=10||this.timer>30&&this.timer<=40){
                        this.userCombatant.runAnimation(1/10,5)
                    }
                    if(this.timer==15||this.timer==20||this.timer==25){
                        if(this.userCombatant.name=='Pistol Duck'){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].middle.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].middle.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                        }else{
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                        }
                    }
                    if(this.timer==5*this.targetDistance+15||this.timer==5*this.targetDistance+20||this.timer==5*this.targetDistance+25){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.timer==5*this.targetDistance+25){
                            switch(this.type){
                                case 443:
                                    for(let a=0,la=this.effect[1];a<la;a++){
                                        this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,constants.playerNumber+1)
                                    }
                                break
                            }
                        }
                    }else if(this.timer>=max(35,5*this.targetDistance+35)){
                        this.remove=true
                    }
                break
                case 243:
                    if(variants.nobasicanim){
                        this.selfCall(0)
                        this.remove=true
                    }else{
                        if(this.timer==1){
                            this.userCombatant.startAnimation(2)
                        }
                        this.userCombatant.runAnimation(1/30,2)
                        if(this.timer==15){
                            this.selfCall(0)
                        }else if(this.timer>=30){
                            this.remove=true
                        }
                    }
                break
                case 245:
                    if(this.timer==10){
                        this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-90,26,[this.targetCombatant.position.x+random(-10,10),this.targetCombatant.position.y-25+random(-40,40)]))
                        this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.targetCombatant.position.x+random(-10,10),this.targetCombatant.position.y-25+random(-40,40),27,[25]))
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                break
                case 251:
                    if(this.timer==1&&this.targetDistance>1){
                        this.userCombatant.startAnimation(0)
                    }else if(this.timer==15*this.targetDistance-14){
                        this.userCombatant.startAnimation(2)
                        this.targetCombatant.startAnimation(2)
                        this.targetCombatant.goal.anim.direction=this.relativeDirection+180
                    }
                    if(this.timer>=15*this.targetDistance-14){
                        this.userCombatant.runAnimation(1/30,2)
                        this.targetCombatant.runAnimation(1/30,2)
                    }else{
                        this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                        this.userCombatant.runAnimation(1/15,0)
                    }
                    if(this.timer==15*this.targetDistance-15){
                        let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                        this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                    }else if(this.timer==15*this.targetDistance||this.timer==15*this.targetDistance+30||this.timer==15*this.targetDistance+60){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userCombatant.takeDamage(this.effect[1],this.targetCombatant.id)
                    }else if(this.timer>=15*this.targetDistance+75){
                        if(this.targetDistance>1){
                            this.battle.activate(1,this.userCombatant.id)
                        }
                        this.remove=true
                    }
                break
                case 273:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(5)
                    }
                    if(this.timer<=10||this.timer>30&&this.timer<=40){
                        this.userCombatant.runAnimation(1/20,5)
                    }
                    if(this.timer==15||this.timer==25){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-30,11,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y-30),this.distance/30-2]))
                    }
                    if(this.timer==5*this.targetDistance+15||this.timer==5*this.targetDistance+25){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }else if(this.timer>=max(40,5*this.targetDistance+35)){
                        this.remove=true
                    }
                break
                case 303: case 364:
                    if(variants.nobasicanim){
                        this.targetCombatant.takeDamage(this.effect[0]-this.effect[1]*this.targetDistance,this.user)
                        this.remove=true
                    }else{
                        if(this.timer==1){
                            this.userCombatant.startAnimation(this.userCombatant.name=='Edgar'?25:5)
                        }
                        if(this.timer<=10||this.timer>20&&this.timer<=30){
                            this.userCombatant.runAnimation(1/10,this.userCombatant.name=='Edgar'?25:5)
                        }
                        if(this.timer==15){
                            for(let a=0,la=5;a<la;a++){
                                this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30)+random(-10,10),this.distance/30-2]))
                                this.battle.particleManager.particles[this.battle.particleManager.particles.length-1].speed*=random(0.9,1.1)
                            }
                        }else if(this.timer==5*this.targetDistance+15){
                            this.targetCombatant.takeDamage(this.effect[0]-this.effect[1]*this.targetDistance,this.user)
                            switch(this.type){
                                case 364:
                                    if(this.targetCombatant.blocked>0){
                                        for(let b=0,lb=this.effect[2];b<lb;b++){
                                            this.battle.drop(this.targetCombatant.id,findName(this.effect[3],types.card),0,constants.playerNumber+1)
                                        }
                                    }
                                break
                            }
                        }else if(this.timer>=max(30,5*this.targetDistance+25)){
                            this.remove=true
                        }
                    }
                break
                case 307: case 323: case 324: case 326: case 333: case 334:
                    if(variants.nobasicanim){
                        this.battle.combatantManager.allEffect(36,[this.effect[0]])
                        this.remove=true
                    }else{
                        if(this.timer==1){
                            this.userCombatant.startAnimation(32)
                        }
                        this.userCombatant.runAnimation(1/20,32)
                        if(this.timer==10){
                            switch(this.type){
                                case 307:
                                    this.battle.combatantManager.allEffect(36,[this.effect[0]])
                                break
                                case 323:
                                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)].statusEffect('Burn',this.effect[0])
                                break
                                case 324:
                                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)].statusEffect('Miss',this.effect[0])
                                break
                                case 326:
                                    for(let a=0,la=this.battle.players;a<la;a++){
                                        this.battle.cardManagers[a].tempDraw.main-=this.effect[0]+this.effect[1]
                                        for(let b=0,lb=this.effect[0];b<lb;b++){
                                            this.battle.cardManagers[a].hand.add(findName('Strike',types.card),0,10)
                                        }
                                        for(let b=0,lb=this.effect[1];b<lb;b++){
                                            this.battle.cardManagers[a].hand.add(findName('Defend',types.card),0,10)
                                        }
                                    }
                                break
                                case 333:
                                    this.battle.combatantManager.allEffect(37,[this.effect[0],this.effect[1]])
                                break
                                case 334:
                                    this.battle.combatantManager.allEffect(38,[this.effect[0]])
                                break
                            }
                        }else if(this.timer>=20){
                            this.remove=true
                        }
                    }
                break
                case 309:
                    if(variants.nobasicanim){
                        if(this.targetDistance>1){
                            this.userCombatant.moveTile(this.direction,this.distance*(this.targetDistance-1)/this.targetDistacne)
                            this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance*(this.targetDistance-1)/this.targetDistacne)
                            let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                            this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                        }
                        for(let a=0,la=7;a<la;a++){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }
                        if(this.targetDistance>1){
                            this.battle.activate(1,this.userCombatant.id)
                        }
                        this.remove=true
                    }else{
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
                        }else if(this.timer==15*this.targetDistance-5||this.timer==15*this.targetDistance||this.timer==15*this.targetDistance+5||this.timer==15*this.targetDistance+15||this.timer==15*this.targetDistance+25||this.timer==15*this.targetDistance+35||this.timer==15*this.targetDistance+45){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }else if(this.timer>=15*this.targetDistance+55){
                            if(this.targetDistance>1){
                                this.battle.activate(1,this.userCombatant.id)
                            }
                            this.remove=true
                        }
                    }
                break
                case 310: case 312: case 314: case 315:
                    if(variants.nobasicanim){
                        this.selfCall(9)
                        this.remove=true
                    }else{
                        if(this.timer==1){
                            this.userCombatant.startAnimation(17)
                        }
                        this.userCombatant.runAnimation(1/30,17)
                        if(this.timer==15){
                            this.selfCall(9)
                        }else if(this.timer>=30){
                            this.remove=true
                        }
                    }
                break
                case 311: case 313:
                    if(variants.nobasicanim){
                        switch(this.type){
                            case 311:
                                for(let a=0,la=this.effect[0];a<la;a++){
                                    this.userCombatant.holdOrb(floor(random(0,game.orbNumber)))
                                }
                            break
                            case 313:
                                this.userCombatant.evoke(7,this.targetCombatant==-1?this.user:this.targetCombatant.id,[])
                            break
                        }
                        this.remove=true
                    }else{
                        if(this.timer==1){
                            this.userCombatant.startAnimation(32)
                        }
                        this.userCombatant.runAnimation(1/20,32)
                        if(this.timer==10){
                            switch(this.type){
                                case 311:
                                    for(let a=0,la=this.effect[0];a<la;a++){
                                        this.userCombatant.holdOrb(floor(random(0,game.orbNumber)))
                                    }
                                break
                                case 313:
                                    this.userCombatant.evoke(7,this.targetCombatant==-1?this.user:this.targetCombatant.id,[])
                                break
                            }
                        }else if(this.timer>=20){
                            this.remove=true
                        }
                    }
                break
                case 320: case 321:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(17)
                    }
                    this.userCombatant.runAnimation(1/10,17)
                    if(this.timer==10){
                        this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,this.type-250,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        switch(this.type){
                            case 320:
                                this.userCombatant.charge+=this.effect[1]
                            break
                            case 321:
                                this.userCombatant.charge+=this.effect[3]
                                if(this.targetCombatant.blocked>0){
                                    for(let a=0,la=this.effect[1];a<la;a++){
                                        this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,constants.playerNumber+1)
                                    }
                                }
                            break
                        }
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                break
                case 322:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(17)
                    }
                    if(this.timer<=10||this.timer>20&&this.timer<=30){
                        this.userCombatant.runAnimation(1/20,17)
                    }
                    if(this.timer==15){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,
                            this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                            this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                        42,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                    }else if(this.timer==5*this.targetDistance+15){
                        this.targetCombatant.takeDamage((this.userCombatant.charge>=5?2:1)*this.effect[0],this.user)
                    }else if(this.timer>=max(30,5*this.targetDistance+25)){
                        this.remove=true
                    }
                break
                case 327:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(17)
                    }
                    this.userCombatant.runAnimation(1/10,17)
                    if(this.timer==10){
                        this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,53,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                        this.targetCombatant.statusEffect('Jinx',this.effect[0])
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                break
                case 336: case 337: case 338:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(17)
                    }
                    this.userCombatant.runAnimation(1/10,17)
                    if(this.timer==10){
                        this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,58,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        switch(this.type){
                            case 336:
                                if(this.targetCombatant.id<this.battle.players){
                                    this.battle.cardManagers[this.targetCombatant.id].hand.rewind(this.effect[1])
                                }
                            break
                            case 337:
                                this.targetCombatant.statusEffect('Temporary Draw',-this.effect[1])
                            break
                            case 338:
                                if(this.targetCombatant.blocked>0){
                                    for(let b=0,lb=this.effect[1];b<lb;b++){
                                        this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,constants.playerNumber+1)
                                    }
                                }
                            break
                        }
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                break
                case 339:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(17)
                    }
                    if(this.timer<=10||this.timer>20&&this.timer<=30){
                        this.userCombatant.runAnimation(1/20,17)
                    }
                    if(this.timer==15){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,
                            this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                            this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                        61,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),7*this.targetDistance]))
                    }else if(this.timer==21+this.targetDistance*3||this.timer==69-this.targetDistance*3){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.timer==69-this.targetDistance*3){
                            this.userCombatant.addBarrier(this.effect[1])
                        }
                    }else if(this.timer>=75){
                        this.remove=true
                    }
                break
                case 340:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(17)
                    }
                    this.userCombatant.runAnimation(1/10,17)
                    if(this.timer==10){
                        this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,69,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                        this.userCombatant.statusEffect('Dexterity',this.effect[0])
                        this.targetCombatant.statusEffect('Dexterity',-this.effect[1])
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                break
                case 341:
                    if(this.timer%10==1){
                        this.userCombatant.startAnimation(2)
                    }
                    this.userCombatant.runAnimation(1/10,2)
                    if(this.timer%10==5){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.timer==5){
                            this.userCombatant.statusEffect('Intangible',this.effect[1])
                        }
                    }else if(this.timer>=90){
                        this.remove=true
                    }
                break
                case 357:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(4)
                    }
                    this.userCombatant.runAnimation(1/10,4)
                    if(this.timer%10==5){
                        this.selfCall(3)
                    }else if(this.timer>=50){
                        this.remove=true
                    }
                break
                case 360:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(4)
                    }
                    this.userCombatant.runAnimation(1/10,4)
                    if(this.timer%10==5){
                        this.selfCall(3)
                    }else if(this.timer>=100){
                        this.remove=true
                    }
                break
                case 362:
                    if(variants.nobasicanim){
                        this.selfCall(4)
                        this.remove=true
                    }else{
                        if(this.timer==1){
                            this.userCombatant.startAnimation(this.userCombatant.team==0?5:25)
                        }
                        if(this.timer<=10||this.timer>20&&this.timer<=30){
                            this.userCombatant.runAnimation(1/10,this.userCombatant.team==0?5:25)
                        }
                        if(this.timer==15){
                            let hand=this.userCombatant.team==0?0:1-this.userCombatant.animSet.hand
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[hand].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                        }else if(this.timer==5*this.targetDistance+15){
                            this.selfCall(4)
                        }else if(this.timer>=max(30,5*this.targetDistance+25)){
                            this.remove=true
                        }
                    }
                break
                case 393:
                    if(this.timer==1){
                        for(let a=0,la=8;a<la;a++){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.battle.combatantManager.combatants[this.effect[0]].position.x+150,this.battle.combatantManager.combatants[this.effect[0]].position.y-600,190,[random(193,197),50,a*6+random(0,4)]))
                        }
                    }else if(this.timer%15==0&&this.timer>=30&&this.timer<30+this.effect[3]*15){
                        this.battle.combatantManager.combatants[this.effect[0]].takeDamage(this.effect[1],this.effect[2])
                    }else if(this.timer>=45+this.effect[3]*15){
                        this.remove=true
                    }
                break
                case 406:
                    if(this.timer==1){
                        this.procedure[0]=distTargetCombatant(0,this.userCombatant,this.targetCombatant)>=0?0:
                            distTargetCombatant(0,{tilePosition:{x:this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],y:this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]}},this.targetCombatant)==1?1:
                            distTargetCombatant(0,{tilePosition:{x:this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],y:this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]}},this.targetCombatant)==1?2:
                            distTargetCombatant(0,{tilePosition:{x:this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],y:this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]}},this.targetCombatant)>=0?1:
                            distTargetCombatant(0,{tilePosition:{x:this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],y:this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]}},this.targetCombatant)>=0?2:3
                        if(this.relativeDirection<this.userCombatant.goal.anim.direction-30){
                            this.userCombatant.goal.anim.direction-=60
                        }else if(this.relativeDirection>this.userCombatant.goal.anim.direction+30){
                            this.userCombatant.goal.anim.direction+=60
                        }
                    }
                    if(this.procedure[0]==0){
                        if(this.timer==1){
                            this.userCombatant.startAnimation(5)
                        }
                        if(this.timer<=10||this.timer>20&&this.timer<=30){
                            this.userCombatant.runAnimation(1/10,5)
                        }
                        if(this.timer==12||this.timer==18){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                        }else if(this.timer==5*this.targetDistance+12||this.timer==5*this.targetDistance+18){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            if(this.type==164){
                                for(let a=0,la=this.effect[1];a<la;a++){
                                    this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,constants.playerNumber+1)
                                }
                            }
                        }else if(this.timer>=max(30,5*this.targetDistance+25)){
                            this.remove=true
                        }
                    }else if(this.procedure[0]==1||this.procedure[0]==2){
                        if(this.timer==1){
                            this.ztarget=this.procedure[0]==2?[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1])]:[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1])]
                            if(this.ztarget[0]==-1){
                                this.remove=true
                            }else{
                                this.ztargetTile=this.battle.tileManager.tiles[this.ztarget[0]]
                                if(this.ztargetTile.occupied>0){
                                    this.remove=true
                                }
                                this.zdirection=atan2(this.ztargetTile.position.x-this.position.x,this.ztargetTile.position.y-this.position.y)
                                this.zdistance=sqrt((this.ztargetTile.position.x-this.position.x)**2+(this.ztargetTile.position.y-this.position.y)**2)
                                this.zrelativeDirection=atan2(this.ztargetTile.relativePosition.x-this.relativePosition.x,this.ztargetTile.relativePosition.y-this.relativePosition.y)
                                this.zrelativeDistance=sqrt((this.ztargetTile.relativePosition.x-this.relativePosition.x)**2+(this.ztargetTile.relativePosition.y-this.relativePosition.y)**2)
                            }
                            this.userCombatant.startAnimation(0)
                        }
                        if(this.timer<=15&&!this.remove){
                            this.userCombatant.moveTile(this.zdirection,this.zdistance/(15*distTargetCombatant(0,this,this.ztargetTile)))
                            this.userCombatant.moveRelativeTile(this.zrelativeDirection,this.zrelativeDistance/(15*distTargetCombatant(0,this,this.ztargetTile)))
                            this.userCombatant.runAnimation(1/15,0)
                        }
                        if(this.timer==15&&!this.remove){
                            this.userCombatant.moveTilePosition(this.ztargetTile.tilePosition.x,this.ztargetTile.tilePosition.y)
                            this.battle.activate(1,this.userCombatant.id)
                            this.direction=atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.targetCombatant.position.y-this.userCombatant.position.y)
                            this.distance=sqrt((this.targetCombatant.position.x-this.userCombatant.position.x)**2+(this.targetCombatant.position.y-this.userCombatant.position.y)**2)
                            this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.userCombatant.relativePosition.x,this.targetCombatant.relativePosition.y-this.userCombatant.relativePosition.y)
                            this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.userCombatant.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.userCombatant.relativePosition.y)**2)
                            this.targetDistance=distTargetCombatant(0,this.userCombatant,this.targetCombatant)
                        }
                        if(this.timer==16){
                            this.userCombatant.startAnimation(5)
                        }
                        if(this.timer>15&&this.timer<=25||this.timer>35&&this.timer<=45){
                            this.userCombatant.runAnimation(1/10,5)
                        }
                        if(this.timer==27||this.timer==33){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                        }else if(this.timer==5*this.targetDistance+27||this.timer==5*this.targetDistance+33){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            if(this.type==164){
                                for(let a=0,la=this.effect[1];a<la;a++){
                                    this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,constants.playerNumber+1)
                                }
                            }
                        }else if(this.timer>=max(45,5*this.targetDistance+40)){
                            this.remove=true
                        }
                    }else{
                        this.remove=true
                    }
                break
                case 416:
                    if(this.timer==1||this.timer==11){
                        this.procedure[0]=random(0,360)
                        for(let a=0,la=9;a<la;a++){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y,208,[this.procedure[0]+a/la*360,0,1]))
                        }
                    }else if(this.timer==6||this.timer==16){
                        for(let a=0,la=9;a<la;a++){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y,208,[this.procedure[0]+(a+0.5)/la*360,1,1]))
                        }
                    }else if(this.timer==15){
                        this.battle.combatantManager.areaAbstract(0,[this.effect[0],this.userCombatant.id,0],this.userCombatant.tilePosition,[3,this.userCombatant.id],[0,1],false,0)
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                break
                case 422:
                    if(variants.nobasicanim){
                        for(let a=0,la=3;a<la;a++){
                            this.selfCall(1)
                        }
                        this.remove=true
                    }else{
                        if(this.timer==1){
                            this.userCombatant.startAnimation(1)
                        }
                        this.userCombatant.runAnimation(1/30,1)
                        if(this.timer==10||this.timer==15||this.timer==20){
                            this.selfCall(1)
                        }else if(this.timer>=30){
                            this.remove=true
                        }
                    }
                break
                case 429: case 430:
                    if(this.timer==1||this.timer==29){
                        this.userCombatant.startAnimation(1)
                        if(this.type==5057){
                            this.userCombatant.goal.anim.direction-=180
                        }
                    }else if(this.timer==9){
                        this.userCombatant.startAnimation(2)
                    }
                    if(this.timer<=8||this.timer>28){
                        this.userCombatant.runAnimation(1/8,1)
                    }else if(this.timer>8&&this.timer<=28){
                        this.userCombatant.runAnimation(1/20,2)
                        if(this.type==5057){
                            this.userCombatant.goal.anim.direction+=18
                        }
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
                        switch(this.type){
                            case 430:
                                this.targetCombatant.statusEffect('Vulnerable Next Turn',this.effect[1])
                            break
                        }
                    }else if(this.timer>=36){
                        this.remove=true
                    }
                break
                case 436:
                    if(variants.nobasicanim){
                        this.targetCombatant.takeDamage(this.effect[0]-this.effect[1]*this.targetDistance,this.user)
                        this.targetCombatant.takeDamage(this.effect[0]-this.effect[1]*this.targetDistance,this.user)
                        this.remove=true
                    }else{
                        if(this.timer==1){
                            this.userCombatant.startAnimation(this.userCombatant.name=='Edgar'?25:5)
                        }
                        if(this.timer<=10||this.timer>30&&this.timer<=40){
                            this.userCombatant.runAnimation(1/10,this.userCombatant.name=='Edgar'?25:5)
                        }
                        if(this.timer==15||this.timer==25){
                            for(let a=0,la=5;a<la;a++){
                                this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30)+random(-10,10),this.distance/30-2]))
                                this.battle.particleManager.particles[this.battle.particleManager.particles.length-1].speed*=random(0.9,1.1)
                            }
                        }
                        if(this.timer==5*this.targetDistance+15||this.timer==5*this.targetDistance+25){
                            this.targetCombatant.takeDamage(this.effect[0]-this.effect[1]*this.targetDistance,this.user)
                            switch(this.type){
                                case 364:
                                    if(this.targetCombatant.blocked>0){
                                        for(let b=0,lb=this.effect[2];b<lb;b++){
                                            this.battle.drop(this.targetCombatant.id,findName(this.effect[3],types.card),0,constants.playerNumber+1)
                                        }
                                    }
                                break
                            }
                        }else if(this.timer>=max(40,5*this.targetDistance+35)){
                            this.remove=true
                        }
                    }
                break
                case 417:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(4)
                    }
                    this.userCombatant.runAnimation(1/30,4)
                    if(this.timer==15){
                        this.selfCall(3)
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                break
                case 418:
                    if(this.timer==1){
                        this.userCombatant.startAnimation(5)
                    }
                    this.userCombatant.runAnimation(1/30,5)
                    if(this.timer==15){
                        this.selfCall(3)
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                break
                case 444:
                    if(this.timer==1){
                        this.procedure[0]=distTargetCombatant(0,this.userCombatant,this.targetCombatant)>=0?0:
                            distTargetCombatant(0,{tilePosition:{x:this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],y:this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]}},this.targetCombatant)==1?1:
                            distTargetCombatant(0,{tilePosition:{x:this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],y:this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]}},this.targetCombatant)==1?2:
                            distTargetCombatant(0,{tilePosition:{x:this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],y:this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]}},this.targetCombatant)>=0?1:
                            distTargetCombatant(0,{tilePosition:{x:this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],y:this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]}},this.targetCombatant)>=0?2:3
                        if(this.relativeDirection<this.userCombatant.goal.anim.direction-30){
                            this.userCombatant.goal.anim.direction-=60
                        }else if(this.relativeDirection>this.userCombatant.goal.anim.direction+30){
                            this.userCombatant.goal.anim.direction+=60
                        }
                    }
                    if(this.procedure[0]==0){
                        if(this.timer==1){
                            this.userCombatant.startAnimation(5)
                        }
                        if(this.timer<=10||this.timer>35&&this.timer<=45){
                            this.userCombatant.runAnimation(1/10,5)
                        }
                        if(this.timer==15||this.timer==18||this.timer==21||this.timer==24||this.timer==27){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                        }
                        if(this.timer==5*this.targetDistance+15||this.timer==5*this.targetDistance+18||this.timer==5*this.targetDistance+21||this.timer==5*this.targetDistance+24||this.timer==5*this.targetDistance+27){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }else if(this.timer>=max(45,5*this.targetDistance+40)){
                            this.remove=true
                        }
                    }else if(this.procedure[0]==1||this.procedure[0]==2){
                        if(this.timer==1){
                            this.ztarget=this.procedure[0]==2?[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1])]:[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1])]
                            if(this.ztarget[0]==-1){
                                this.remove=true
                            }else{
                                this.ztargetTile=this.battle.tileManager.tiles[this.ztarget[0]]
                                if(this.ztargetTile.occupied>0){
                                    this.remove=true
                                }
                                this.zdirection=atan2(this.ztargetTile.position.x-this.position.x,this.ztargetTile.position.y-this.position.y)
                                this.zdistance=sqrt((this.ztargetTile.position.x-this.position.x)**2+(this.ztargetTile.position.y-this.position.y)**2)
                                this.zrelativeDirection=atan2(this.ztargetTile.relativePosition.x-this.relativePosition.x,this.ztargetTile.relativePosition.y-this.relativePosition.y)
                                this.zrelativeDistance=sqrt((this.ztargetTile.relativePosition.x-this.relativePosition.x)**2+(this.ztargetTile.relativePosition.y-this.relativePosition.y)**2)
                            }
                            this.userCombatant.startAnimation(0)
                        }
                        if(this.timer<=15&&!this.remove){
                            this.userCombatant.moveTile(this.zdirection,this.zdistance/(15*distTargetCombatant(0,this,this.ztargetTile)))
                            this.userCombatant.moveRelativeTile(this.zrelativeDirection,this.zrelativeDistance/(15*distTargetCombatant(0,this,this.ztargetTile)))
                            this.userCombatant.runAnimation(1/15,0)
                        }
                        if(this.timer==15&&!this.remove){
                            this.userCombatant.moveTilePosition(this.ztargetTile.tilePosition.x,this.ztargetTile.tilePosition.y)
                            this.battle.activate(1,this.userCombatant.id)
                            this.direction=atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.targetCombatant.position.y-this.userCombatant.position.y)
                            this.distance=sqrt((this.targetCombatant.position.x-this.userCombatant.position.x)**2+(this.targetCombatant.position.y-this.userCombatant.position.y)**2)
                            this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.userCombatant.relativePosition.x,this.targetCombatant.relativePosition.y-this.userCombatant.relativePosition.y)
                            this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.userCombatant.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.userCombatant.relativePosition.y)**2)
                            this.targetDistance=distTargetCombatant(0,this.userCombatant,this.targetCombatant)
                        }
                        if(this.timer==16){
                            this.userCombatant.startAnimation(5)
                        }
                        if(this.timer>15&&this.timer<=25||this.timer>50&&this.timer<=60){
                            this.userCombatant.runAnimation(1/10,5)
                        }
                        if(this.timer==30||this.timer==33||this.timer==36||this.timer==39||this.timer==42){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                        }
                        if(this.timer==5*this.targetDistance+30||this.timer==5*this.targetDistance+33||this.timer==5*this.targetDistance+36||this.timer==5*this.targetDistance+39||this.timer==5*this.targetDistance+42){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }else if(this.timer>=max(60,5*this.targetDistance+55)){
                            this.remove=true
                        }
                    }else{
                        this.remove=true
                    }
                break
                case 445:
                    if(this.targetDistance==1){
                        if(this.timer==1){
                            this.userCombatant.startAnimation(5)
                        }
                        if(this.timer<=10||this.timer>20&&this.timer<=30){
                            this.userCombatant.runAnimation(1/10,5)
                        }
                        if(this.timer==15){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                        }else if(this.timer==5*this.targetDistance+15){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }else if(this.timer>=max(30,5*this.targetDistance+25)){
                            this.remove=true
                        }
                    }else{
                        if(this.timer==1){
                            this.userCombatant.startAnimation(5)
                            let offset=transformDirection(0,this.relativeDirection)
                            let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+offset[0],this.userCombatant.tilePosition.y+offset[1])
                            this.procedure[0]=index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        }
                        if(this.timer<=10||this.timer>20&&this.timer<=30){
                            this.userCombatant.runAnimation(1/10,5)
                        }
                        if(this.timer==15){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                        }else if(this.timer==5*this.targetDistance+15){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }
                        if(this.procedure[0]==0){
                            if(this.timer==31){
                                this.userCombatant.startAnimation(0)
                            }
                            if(this.timer>30&&this.timer<=45){
                                this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                                this.userCombatant.runAnimation(1/15,0)
                            }
                            if(this.timer>=max(45,5*this.targetDistance+25)){
                                let offset=transformDirection(0,this.relativeDirection)
                                this.userCombatant.moveTilePosition(this.userCombatant.tilePosition.x+offset[0],this.userCombatant.tilePosition.y+offset[1])
                                this.battle.activate(1,this.userCombatant.id)
                                this.remove=true
                            }
                        }else if(this.timer>=max(30,5*this.targetDistance+25)){
                            this.remove=true
                        }
                    }
                break
                case 446:
                    if(variants.nobasicanim){
                        this.selfCall(4)
                        this.remove=true
                    }else{
                        if(this.timer==1){
                            this.userCombatant.startAnimation(5)
                        }
                        if(this.timer<=10||this.timer>20&&this.timer<=30){
                            this.userCombatant.runAnimation(1/10,5)
                        }
                        if(this.timer==15){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                        }else if(this.timer==round(this.distance/30+15)){
                            this.selfCall(4)
                        }else if(this.timer>=max(30,this.distance/30+25)){
                            this.remove=true
                        }
                    }
                break

                default:
                    this.remove=true
                break
            }
            if(this.remove){
                if(this.mover){
                    this.userCombatant.moved=true
                }
                if(this.userCombatant.aggressor){
                    this.userCombatant.aggressor=false
                }
                switch(this.attackClass){
                    case 1:
                        if(this.userCombatant.getStatus('Double Damage')>0&&this.clearAttack[0]){
                            this.userCombatant.status.main[findList('Double Damage',this.userCombatant.status.name)]--
                        }
                        if(this.userCombatant.getStatus('Single Damage Up')>0&&this.clearAttack[1]){
                            this.userCombatant.status.main[findList('Single Damage Up',this.userCombatant.status.name)]=0
                        }
                        if(this.userCombatant.getStatus('Triple Damage')>0&&this.clearAttack[2]){
                            this.userCombatant.status.main[findList('Triple Damage',this.userCombatant.status.name)]--
                        }
                        if(this.userCombatant.getStatus('1.5x Damage')>0&&this.clearAttack[3]){
                            this.userCombatant.status.main[findList('1.5x Damage',this.userCombatant.status.name)]--
                        }
                        if(this.userCombatant.getStatus('Double Damage-1')>0&&this.clearAttack[4]){
                            this.userCombatant.status.main[findList('Double Damage-1',this.userCombatant.status.name)]--
                        }
                        if(this.userCombatant.getStatus('No Damage')>0&&this.clearAttack[5]){
                            this.userCombatant.status.main[findList('No Damage',this.userCombatant.status.name)]--
                        }
                        if(this.userCombatant.getStatus('Temporary Single Damage Up')>0&&this.clearAttack[6]){
                            this.userCombatant.status.main[findList('Temporary Single Damage Up',this.userCombatant.status.name)]--
                        }
                        if(this.userCombatant.getStatus('Double Curse')>0&&this.clearAttack[7]){
                            this.userCombatant.status.main[findList('Double Curse',this.userCombatant.status.name)]--
                        }
                        if(this.userCombatant.getStatus('Single Damage Down')>0&&this.clearAttack[8]){
                            this.userCombatant.status.main[findList('Single Damage Down',this.userCombatant.status.name)]=0
                        }
                        if(this.userCombatant.getStatus('Double Damage Next')>0&&this.clearAttack[9]){
                            this.userCombatant.status.main[findList('Double Damage',this.userCombatant.status.name)]++
                            this.userCombatant.status.main[findList('Double Damage Next',this.userCombatant.status.name)]--
                        }
                        if(this.userCombatant.getStatus('Damage Block Convert')>0&&this.clearAttack[10]){
                            this.userCombatant.status.main[findList('Damage Block Convert',this.userCombatant.status.name)]--
                        }
                        if(this.userCombatant.getStatus('Damage Half Block Convert')>0&&this.clearAttack[11]){
                            this.userCombatant.status.main[findList('Damage Half Block Convert',this.userCombatant.status.name)]--
                        }
                        if(this.userCombatant.getStatus('Damage Repeat in 2 Turns')>0&&this.clearAttack[12]){
                            this.userCombatant.status.main[findList('Damage Repeat in 2 Turns',this.userCombatant.status.name)]--
                        }
                        if(this.userCombatant.getStatus('Single Attack Bleed')>0&&this.clearAttack[13]){
                            this.userCombatant.status.main[findList('Single Attack Bleed',this.userCombatant.status.name)]=0
                        }
                        if(this.userCombatant.getStatus('1.5x Damage+1')>0&&this.clearAttack[14]){
                            this.userCombatant.status.main[findList('1.5x Damage+1',this.userCombatant.status.name)]--
                        }
                        if(this.userCombatant.getStatus('Single Attack Regeneration')>0&&this.clearAttack[15]){
                            this.userCombatant.status.main[findList('Single Attack Regeneration',this.userCombatant.status.name)]=0
                        }
                        this.userCombatant.tempStatus=[1,0,0,0,0,0]
                    break
                }
            }
        break
        case 1:
            switch(this.type){
                case 0: case 1: case 2: case 4: case 9: case 10: case 11: case 12: case 14: case 15:
                    if(this.battle.modded(115)){
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
                            if(this.targetClass==2){
                                this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)
                                this.battle.activate(1,this.userCombatant.id)
                                this.targetCombatant.moveTilePosition(this.tilePosition.x,this.tilePosition.y)
                                this.battle.activate(1,this.targetCombatant.id)
                            }else{
                                this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                                this.battle.activate(1,this.userCombatant.id)
                            }
                            this.remove=true
                        }
                    }else{
                        if(variants.nobasicanim){
                            this.userCombatant.moveTile(this.direction,this.distance)
                            this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance)
                            this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                            this.battle.activate(1,this.userCombatant.id)
                            this.remove=true
                        }else{
                            if(this.timer==1){
                                this.userCombatant.startAnimation(0)
                            }
                            this.userCombatant.moveTile(this.direction,this.distance/(15*distTargetCombatant(0,this,this.targetTile)))
                            this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*distTargetCombatant(0,this,this.targetTile)))
                            this.userCombatant.runAnimation(1/15,0)
                            if(this.timer>=15*this.targetDistance){
                                this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                                this.battle.activate(1,this.userCombatant.id)
                                this.remove=true
                            }
                        }
                    }
                break
                case 3: case 5: case 7: case 13:
                    if(variants.nobasicanim){
                        this.userCombatant.moveTile(this.direction,this.distance)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance)
                        this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                        this.battle.activate(1,this.userCombatant.id)
                        this.remove=true
                    }else{
                        if(this.timer==1){
                            this.userCombatant.startAnimation(19)
                        }
                        this.userCombatant.runAnimation(1/20,19)
                        if(this.timer==10){
                            this.userCombatant.moveTile(this.direction,this.distance)
                            this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance)
                            this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                            this.battle.activate(1,this.userCombatant.id)
                        }else if(this.timer>=20){
                            this.remove=true
                        }
                    }
                break
                case 6: case 8:
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
                        if(this.targetClass==2){
                            this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)
                            this.battle.activate(1,this.userCombatant.id)
                            this.targetCombatant.moveTilePosition(this.tilePosition.x,this.tilePosition.y)
                            this.battle.activate(1,this.targetCombatant.id)
                        }else{
                            this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                            this.battle.activate(1,this.userCombatant.id)
                        }
                        this.remove=true
                    }
                break
                default:
                    this.remove=true
                break
            }
        break
    }
}