class turn{
    constructor(action,battle,type,effect,user,mover=true){
        this.action=action
        this.battle=battle
        this.type=type
        this.effect=effect
        this.user=user
        this.mover=mover
        this.attackClass=types.attack[this.type].class
        this.setTarget=-1
        this.target=[]

        this.procedure=[]

        this.timer=0
        this.remove=false
        this.selfRemoved=false
        this.replayed=false
        this.directive='turn'
    }
    base(){
        switch(this.attackClass){
            case 1:
                this.userCombatant.tempStatus=[1,0,0,0,0]
                this.clearAttack=[false,false,false,false,false,false,false,false,false,false,false,false,false,false]
                if(this.userCombatant.getStatus('Double Damage')>0){
                    this.clearAttack[0]=true
                    this.userCombatant.tempStatus[0]*=2
                }
                if(this.userCombatant.getStatus('Single Damage Up')>0){
                    this.clearAttack[1]=true
                    this.userCombatant.tempStatus[1]+=this.userCombatant.getStatus('Single Damage Up')
                }
                if(this.userCombatant.getStatus('Triple Damage')>0){
                    this.clearAttack[2]=true
                    this.userCombatant.tempStatus[0]*=3
                }
                if(this.userCombatant.getStatus('1.5x Damage')>0){
                    this.clearAttack[3]=true
                    this.userCombatant.tempStatus[0]*=1.5
                }
                if(this.userCombatant.getStatus('Double Damage-1')>0){
                    this.clearAttack[4]=true
                    this.userCombatant.tempStatus[0]*=2
                    this.userCombatant.tempStatus[1]-=1
                }
                if(this.userCombatant.getStatus('No Damage')>0){
                    this.clearAttack[5]=true
                    this.userCombatant.tempStatus[0]*=0
                }
                if(this.userCombatant.getStatus('Temporary Single Damage Up')>0){
                    this.clearAttack[6]=true
                    this.userCombatant.tempStatus[1]+=this.userCombatant.getStatus('Temporary Single Damage Up')
                }
                if(this.userCombatant.getStatus('Double Curse')>0&&floor(random(0,2))==0){
                    this.clearAttack[7]=true
                    this.userCombatant.tempStatus[0]*=2
                }
                if(this.userCombatant.getStatus('Single Damage Down')>0){
                    this.clearAttack[8]=true
                    this.userCombatant.tempStatus[1]-=this.userCombatant.getStatus('Single Damage Down')
                }
                if(this.userCombatant.getStatus('Double Damage Next')>0){
                    this.clearAttack[9]=true
                }
                if(this.userCombatant.getStatus('Damage Block Convert')>0){
                    this.clearAttack[10]=true
                    this.userCombatant.tempStatus[2]++
                }
                if(this.userCombatant.getStatus('Damage Half Block Convert')>0){
                    this.clearAttack[11]=true
                    this.userCombatant.tempStatus[2]+=0.5
                }
                if(this.userCombatant.getStatus('Damage Repeat in 2 Turns')>0){
                    this.clearAttack[12]=true
                    this.userCombatant.tempStatus[3]++
                }
                if(this.userCombatant.getStatus('Single Attack Bleed')>0){
                    this.clearAttack[13]=true
                    this.userCombatant.tempStatus[4]+=this.userCombatant.getStatus('Single Attack Bleed')
                }
                if(this.userCombatant.getStatus('1.5x Damage+1')>0){
                    this.clearAttack[14]=true
                    this.userCombatant.tempStatus[0]*=1.5
                    this.userCombatant.tempStatus[1]++
                }
            break
        }
    }
    setBase(){
        if(this.user>=this.battle.combatantManager.combatants.length){
            this.remove=true
        }else{
            this.userCombatant=this.battle.combatantManager.combatants[this.user]
        }
    }
    set(){
        this.setBase()
        this.base()
        if(!this.remove){
            this.position={x:this.userCombatant.position.x,y:this.userCombatant.position.y}
            this.relativePosition={x:this.userCombatant.relativePosition.x,y:this.userCombatant.relativePosition.y}
            this.tilePosition={x:this.userCombatant.tilePosition.x,y:this.userCombatant.tilePosition.y}
            if(this.userCombatant.life<=0){
                this.remove=true
            }else if(this.userCombatant.getStatus('Distracted')>0){
                this.userCombatant.statusEffect('Distracted',-1)
                this.remove=true
            }else{
                switch(this.action){
                    case 0:
                        if(this.attackClass==2||this.attackClass==4){
                            if(this.mover){
                                this.userCombatant.moved=true
                            }
                        }else{
                            this.target=[]
                            this.targetIndex=[]
                            let transformBase=transformDirection(0,this.userCombatant.goal.anim.direction)
                            switch(this.type){
                                case 1: case 2: case 3: case 11: case 13: case 22: case 23: case 31: case 34: case 35:
                                case 36: case 37: case 58: case 97: case 101: case 103: case 113: case 116: case 121: case 122:
                                case 212: case 226: case 227: case 229: case 242: case 246: case 247: case 251: case 252: case 270:
                                case 271: case 274: case 282: case 295: case 304: case 305: case 309: case 341: case 355: case 369:
                                case 370: case 371: case 372: case 373: case 377: case 378:
                                    this.target=this.battle.modded(57)?[
                                        [this.userCombatant.tilePosition.x+transformBase[0],this.userCombatant.tilePosition.y+transformBase[1]],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*2,this.userCombatant.tilePosition.y+transformBase[1]*2]
                                    ]:
                                    [[this.userCombatant.tilePosition.x+transformBase[0],this.userCombatant.tilePosition.y+transformBase[1]]]
                                break
                                case 6: case 7: case 8: case 14: case 15: case 19: case 20: case 24: case 27: case 30:
                                case 32:case 33: case 61: case 62: case 66: case 67: case 76: case 77: case 96: case 107:
                                case 112: case 138: case 139: case 149: case 156: case 183: case 203: case 211: case 223: case 224:
                                case 248: case 250: case 253: case 258: case 260: case 272: case 273: case 275: case 276: case 277:
                                case 297: case 298: case 299: case 310: case 317: case 325: case 329: case 332: case 342: case 343:
                                case 354: case 374: case 375: case 382: case 383: case 386:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x+transformBase[0],this.userCombatant.tilePosition.y+transformBase[1]],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*2,this.userCombatant.tilePosition.y+transformBase[1]*2]
                                    ]
                                break
                                case 71: case 73: case 79: case 99: case 143: case 172: case 175: case 312: case 319: case 322:
                                case 339: case 348: case 367: case 385: case 389: case 390:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x+transformBase[0],this.userCombatant.tilePosition.y+transformBase[1]],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*2,this.userCombatant.tilePosition.y+transformBase[1]*2],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*3,this.userCombatant.tilePosition.y+transformBase[1]*3]
                                    ]
                                break
                                case 100: case 347: case 380:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x+transformBase[0],this.userCombatant.tilePosition.y+transformBase[1]],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*2,this.userCombatant.tilePosition.y+transformBase[1]*2],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*3,this.userCombatant.tilePosition.y+transformBase[1]*3],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*4,this.userCombatant.tilePosition.y+transformBase[1]*4]
                                    ]
                                break
                                case 9: case 60: case 64: case 69: case 82: case 84: case 95: case 104: case 114: case 124:
                                case 153: case 264: case 265: case 278: case 308: case 330: case 368:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x+transformBase[0],this.userCombatant.tilePosition.y+transformBase[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]]
                                    ]
                                break
                                case 12: case 38: case 45: case 47: case 50: case 59: case 80: case 81: case 83: case 89:
                                case 90: case 91: case 98: case 106: case 115: case 118: case 119: case 123: case 125: case 129:
                                case 130: case 134: case 140: case 141: case 144: case 145: case 148: case 151: case 152: case 158:
                                case 160: case 161: case 162: case 165: case 173: case 178: case 179: case 180: case 184: case 188:
                                case 191: case 193: case 194: case 196: case 199: case 200: case 201: case 202: case 206: case 208:
                                case 235: case 236: case 245: case 262: case 263: case 266: case 268: case 279: case 283: case 284:
                                case 285: case 287: case 290: case 303: case 306: case 313: case 316: case 320: case 321: case 327:
                                case 328: case 335: case 336: case 337: case 338: case 340: case 353: case 358: case 361: case 362:
                                case 364:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x+transformBase[0],this.userCombatant.tilePosition.y+transformBase[1]],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*2,this.userCombatant.tilePosition.y+transformBase[1]*2],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*3,this.userCombatant.tilePosition.y+transformBase[1]*3],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*4,this.userCombatant.tilePosition.y+transformBase[1]*4],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*5,this.userCombatant.tilePosition.y+transformBase[1]*5],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*6,this.userCombatant.tilePosition.y+transformBase[1]*6]
                                    ]
                                break
                                case 16: case 17: case 54: case 87: case 120: case 128: case 132: case 133: case 136: case 142:
                                case 147: case 157: case 198: case 213: case 215: case 217: case 255: case 256: case 350: case 351:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-150)[0],this.userCombatant.tilePosition.y+transformDirection(0,-150)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-90)[0],this.userCombatant.tilePosition.y+transformDirection(0,-90)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-30)[0],this.userCombatant.tilePosition.y+transformDirection(0,-30)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,30)[0],this.userCombatant.tilePosition.y+transformDirection(0,30)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,90)[0],this.userCombatant.tilePosition.y+transformDirection(0,90)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,150)[0],this.userCombatant.tilePosition.y+transformDirection(0,150)[1]]
                                    ]
                                break
                                case 28: case 44: case 53: case 105: case 146: case 168: case 171: case 288: case 357: case 360:
                                case 381: case 387: case 388:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x+transformBase[0],this.userCombatant.tilePosition.y+transformBase[1]],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*2,this.userCombatant.tilePosition.y+transformBase[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]*2]
                                    ]
                                break
                                case 43: case 46:
                                    this.targetIndex=[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)]
                                break
                                case 49: case 164: case 185:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x+transformBase[0],this.userCombatant.tilePosition.y+transformBase[1]],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*2,this.userCombatant.tilePosition.y+transformBase[1]*2],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*3,this.userCombatant.tilePosition.y+transformBase[1]*3],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*4,this.userCombatant.tilePosition.y+transformBase[1]*4],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*5,this.userCombatant.tilePosition.y+transformBase[1]*5],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*6,this.userCombatant.tilePosition.y+transformBase[1]*6],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0]+transformBase[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]+transformBase[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0]+transformBase[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]+transformBase[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0]+transformBase[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]+transformBase[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0]+transformBase[0]*4,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]+transformBase[1]*4],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0]+transformBase[0]*5,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]+transformBase[1]*5],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]+transformBase[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]+transformBase[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]+transformBase[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]+transformBase[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]+transformBase[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]+transformBase[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]+transformBase[0]*4,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]+transformBase[1]*4],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]+transformBase[0]*5,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]+transformBase[1]*5]
                                    ]
                                break
                                case 55: case 192:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-150)[0],this.userCombatant.tilePosition.y+transformDirection(0,-150)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-90)[0],this.userCombatant.tilePosition.y+transformDirection(0,-90)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-30)[0],this.userCombatant.tilePosition.y+transformDirection(0,-30)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,30)[0],this.userCombatant.tilePosition.y+transformDirection(0,30)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,90)[0],this.userCombatant.tilePosition.y+transformDirection(0,90)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,150)[0],this.userCombatant.tilePosition.y+transformDirection(0,150)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-150)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,-150)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-90)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,-90)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-30)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,-30)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,30)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,30)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,90)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,90)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,150)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,150)[1]*2]
                                    ]
                                break
                                case 85: case 86: case 379:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x+transformBase[0],this.userCombatant.tilePosition.y+transformBase[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*2,this.userCombatant.tilePosition.y+transformBase[1]*2],
                                        [this.userCombatant.tilePosition.x+transformBase[0]+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformBase[1]+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                        [this.userCombatant.tilePosition.x+transformBase[0]+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformBase[1]+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]]
                                    ]
                                break
                                case 127: case 150: case 181: case 331: case 363:
                                    this.targetIndex=[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformBase[0]*2,this.userCombatant.tilePosition.y+transformBase[1]*2)]
                                break
                                case 131: case 195: case 205: case 384:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x+transformBase[0],this.userCombatant.tilePosition.y+transformBase[1]],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*2,this.userCombatant.tilePosition.y+transformBase[1]*2],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*3,this.userCombatant.tilePosition.y+transformBase[1]*3],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*4,this.userCombatant.tilePosition.y+transformBase[1]*4],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*5,this.userCombatant.tilePosition.y+transformBase[1]*5],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*6,this.userCombatant.tilePosition.y+transformBase[1]*6],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0]*4,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]*4],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0]*5,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]*5],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0]*6,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]*6],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]*4,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]*4],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]*5,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]*5],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]*6,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]*6]
                                    ]
                                break
                                case 137:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x+transformBase[0],this.userCombatant.tilePosition.y+transformBase[1]],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*2,this.userCombatant.tilePosition.y+transformBase[1]*2],
                                        [this.userCombatant.tilePosition.x+transformBase[0]+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformBase[1]+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                        [this.userCombatant.tilePosition.x+transformBase[0]+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformBase[1]+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]]
                                    ]
                                break
                                case 166:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-150)[0],this.userCombatant.tilePosition.y+transformDirection(0,-150)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-150)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,-150)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-90)[0],this.userCombatant.tilePosition.y+transformDirection(0,-90)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-90)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,-90)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-30)[0],this.userCombatant.tilePosition.y+transformDirection(0,-30)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-30)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,-30)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,30)[0],this.userCombatant.tilePosition.y+transformDirection(0,30)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,30)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,30)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,90)[0],this.userCombatant.tilePosition.y+transformDirection(0,90)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,90)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,90)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,150)[0],this.userCombatant.tilePosition.y+transformDirection(0,150)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,150)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,150)[1]*2]
                                    ]
                                break
                                case 176:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-150)[0],this.userCombatant.tilePosition.y+transformDirection(0,-150)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-90)[0],this.userCombatant.tilePosition.y+transformDirection(0,-90)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-30)[0],this.userCombatant.tilePosition.y+transformDirection(0,-30)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,30)[0],this.userCombatant.tilePosition.y+transformDirection(0,30)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,90)[0],this.userCombatant.tilePosition.y+transformDirection(0,90)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,150)[0],this.userCombatant.tilePosition.y+transformDirection(0,150)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-150)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,-150)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-90)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,-90)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-30)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,-30)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,30)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,30)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,90)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,90)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,150)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,150)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-150)[0]+transformDirection(0,-90)[0],this.userCombatant.tilePosition.y+transformDirection(0,-150)[1]+transformDirection(0,-90)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-90)[0]+transformDirection(0,-30)[0],this.userCombatant.tilePosition.y+transformDirection(0,-90)[1]+transformDirection(0,-30)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-30)[0]+transformDirection(0,30)[0],this.userCombatant.tilePosition.y+transformDirection(0,-30)[1]+transformDirection(0,30)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,30)[0]+transformDirection(0,90)[0],this.userCombatant.tilePosition.y+transformDirection(0,30)[1]+transformDirection(0,90)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,90)[0]+transformDirection(0,150)[0],this.userCombatant.tilePosition.y+transformDirection(0,90)[1]+transformDirection(0,150)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,150)[0]+transformDirection(0,-150)[0],this.userCombatant.tilePosition.y+transformDirection(0,150)[1]+transformDirection(0,-150)[1]]
                                    ]
                                break
                                case 204:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x+transformBase[0],this.userCombatant.tilePosition.y+transformBase[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-120)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-120)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+120)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+120)[1]]
                                    ]
                                break
                                case 209:
                                    this.targetIndex=[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformBase[0],this.userCombatant.tilePosition.y+transformBase[1])]
                                break
                                case 214:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x+transformBase[0],this.userCombatant.tilePosition.y+transformBase[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*2,this.userCombatant.tilePosition.y+transformBase[1]*2]
                                    ]
                                break
                                case 218:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-150)[0]+transformDirection(0,-90)[0],this.userCombatant.tilePosition.y+transformDirection(0,-150)[1]+transformDirection(0,-90)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-90)[0]+transformDirection(0,-30)[0],this.userCombatant.tilePosition.y+transformDirection(0,-90)[1]+transformDirection(0,-30)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-30)[0]+transformDirection(0,30)[0],this.userCombatant.tilePosition.y+transformDirection(0,-30)[1]+transformDirection(0,30)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,30)[0]+transformDirection(0,90)[0],this.userCombatant.tilePosition.y+transformDirection(0,30)[1]+transformDirection(0,90)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,90)[0]+transformDirection(0,150)[0],this.userCombatant.tilePosition.y+transformDirection(0,90)[1]+transformDirection(0,150)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,150)[0]+transformDirection(0,-150)[0],this.userCombatant.tilePosition.y+transformDirection(0,150)[1]+transformDirection(0,-150)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-150)[0]*2+transformDirection(0,-90)[0],this.userCombatant.tilePosition.y+transformDirection(0,-150)[1]*2+transformDirection(0,-90)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-90)[0]*2+transformDirection(0,-30)[0],this.userCombatant.tilePosition.y+transformDirection(0,-90)[1]*2+transformDirection(0,-30)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-30)[0]*2+transformDirection(0,30)[0],this.userCombatant.tilePosition.y+transformDirection(0,-30)[1]*2+transformDirection(0,30)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,30)[0]*2+transformDirection(0,90)[0],this.userCombatant.tilePosition.y+transformDirection(0,30)[1]*2+transformDirection(0,90)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,90)[0]*2+transformDirection(0,150)[0],this.userCombatant.tilePosition.y+transformDirection(0,90)[1]*2+transformDirection(0,150)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,150)[0]*2+transformDirection(0,-150)[0],this.userCombatant.tilePosition.y+transformDirection(0,150)[1]*2+transformDirection(0,-150)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-150)[0]+transformDirection(0,-90)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,-150)[1]+transformDirection(0,-90)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-90)[0]+transformDirection(0,-30)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,-90)[1]+transformDirection(0,-30)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-30)[0]+transformDirection(0,30)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,-30)[1]+transformDirection(0,30)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,30)[0]+transformDirection(0,90)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,30)[1]+transformDirection(0,90)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,90)[0]+transformDirection(0,150)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,90)[1]+transformDirection(0,150)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,150)[0]+transformDirection(0,-150)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,150)[1]+transformDirection(0,-150)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-150)[0]*2+transformDirection(0,-90)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,-150)[1]*2+transformDirection(0,-90)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-90)[0]*2+transformDirection(0,-30)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,-90)[1]*2+transformDirection(0,-30)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-30)[0]*2+transformDirection(0,30)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,-30)[1]*2+transformDirection(0,30)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,30)[0]*2+transformDirection(0,90)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,30)[1]*2+transformDirection(0,90)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,90)[0]*2+transformDirection(0,150)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,90)[1]*2+transformDirection(0,150)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,150)[0]*2+transformDirection(0,-150)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,150)[1]*2+transformDirection(0,-150)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-150)[0]*3+transformDirection(0,-90)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,-150)[1]*3+transformDirection(0,-90)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-90)[0]*3+transformDirection(0,-30)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,-90)[1]*3+transformDirection(0,-30)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-30)[0]*3+transformDirection(0,30)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,-30)[1]*3+transformDirection(0,30)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,30)[0]*3+transformDirection(0,90)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,30)[1]*3+transformDirection(0,90)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,90)[0]*3+transformDirection(0,150)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,90)[1]*3+transformDirection(0,150)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,150)[0]*3+transformDirection(0,-150)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,150)[1]*3+transformDirection(0,-150)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-150)[0]*2+transformDirection(0,-90)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,-150)[1]*2+transformDirection(0,-90)[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-90)[0]*2+transformDirection(0,-30)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,-90)[1]*2+transformDirection(0,-30)[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-30)[0]*2+transformDirection(0,30)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,-30)[1]*2+transformDirection(0,30)[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,30)[0]*2+transformDirection(0,90)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,30)[1]*2+transformDirection(0,90)[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,90)[0]*2+transformDirection(0,150)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,90)[1]*2+transformDirection(0,150)[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,150)[0]*2+transformDirection(0,-150)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,150)[1]*2+transformDirection(0,-150)[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-150)[0]*3+transformDirection(0,-90)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,-150)[1]*3+transformDirection(0,-90)[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-90)[0]*3+transformDirection(0,-30)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,-90)[1]*3+transformDirection(0,-30)[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-30)[0]*3+transformDirection(0,30)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,-30)[1]*3+transformDirection(0,30)[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,30)[0]*3+transformDirection(0,90)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,30)[1]*3+transformDirection(0,90)[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,90)[0]*3+transformDirection(0,150)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,90)[1]*3+transformDirection(0,150)[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,150)[0]*3+transformDirection(0,-150)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,150)[1]*3+transformDirection(0,-150)[1]*3]
                                    ]
                                break
                                case 219:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-150)[0],this.userCombatant.tilePosition.y+transformDirection(0,-150)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-150)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,-150)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-150)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,-150)[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-150)[0]*4,this.userCombatant.tilePosition.y+transformDirection(0,-150)[1]*4],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-150)[0]*5,this.userCombatant.tilePosition.y+transformDirection(0,-150)[1]*5],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-150)[0]*6,this.userCombatant.tilePosition.y+transformDirection(0,-150)[1]*6],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-90)[0],this.userCombatant.tilePosition.y+transformDirection(0,-90)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-90)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,-90)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-90)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,-90)[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-90)[0]*4,this.userCombatant.tilePosition.y+transformDirection(0,-90)[1]*4],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-90)[0]*5,this.userCombatant.tilePosition.y+transformDirection(0,-90)[1]*5],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-90)[0]*6,this.userCombatant.tilePosition.y+transformDirection(0,-90)[1]*6],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-30)[0],this.userCombatant.tilePosition.y+transformDirection(0,-30)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-30)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,-30)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-30)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,-30)[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-30)[0]*4,this.userCombatant.tilePosition.y+transformDirection(0,-30)[1]*4],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-30)[0]*5,this.userCombatant.tilePosition.y+transformDirection(0,-30)[1]*5],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,-30)[0]*6,this.userCombatant.tilePosition.y+transformDirection(0,-30)[1]*6],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,30)[0],this.userCombatant.tilePosition.y+transformDirection(0,30)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,30)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,30)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,30)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,30)[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,30)[0]*4,this.userCombatant.tilePosition.y+transformDirection(0,30)[1]*4],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,30)[0]*5,this.userCombatant.tilePosition.y+transformDirection(0,30)[1]*5],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,30)[0]*6,this.userCombatant.tilePosition.y+transformDirection(0,30)[1]*6],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,90)[0],this.userCombatant.tilePosition.y+transformDirection(0,90)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,90)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,90)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,90)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,90)[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,90)[0]*4,this.userCombatant.tilePosition.y+transformDirection(0,90)[1]*4],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,90)[0]*5,this.userCombatant.tilePosition.y+transformDirection(0,90)[1]*5],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,90)[0]*6,this.userCombatant.tilePosition.y+transformDirection(0,90)[1]*6],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,150)[0],this.userCombatant.tilePosition.y+transformDirection(0,150)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,150)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,150)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,150)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,150)[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,150)[0]*4,this.userCombatant.tilePosition.y+transformDirection(0,150)[1]*4],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,150)[0]*5,this.userCombatant.tilePosition.y+transformDirection(0,150)[1]*5],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,150)[0]*6,this.userCombatant.tilePosition.y+transformDirection(0,150)[1]*6]
                                    ]
                                break
                                case 221:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x+transformBase[0],this.userCombatant.tilePosition.y+transformBase[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*2,this.userCombatant.tilePosition.y+transformBase[1]*2],
                                        [this.userCombatant.tilePosition.x+transformBase[0]+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformBase[1]+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                        [this.userCombatant.tilePosition.x+transformBase[0]+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformBase[1]+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*3,this.userCombatant.tilePosition.y+transformBase[1]*3]
                                    ]
                                break
                                case 222:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x+transformBase[0],this.userCombatant.tilePosition.y+transformBase[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*2,this.userCombatant.tilePosition.y+transformBase[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformBase[0]+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformBase[1]+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                        [this.userCombatant.tilePosition.x+transformBase[0]+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformBase[1]+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*3,this.userCombatant.tilePosition.y+transformBase[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]*3],
                                        [this.userCombatant.tilePosition.x+transformBase[0]+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0]*2,this.userCombatant.tilePosition.y+transformBase[1]+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformBase[0]+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]*2,this.userCombatant.tilePosition.y+transformBase[1]+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*2+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformBase[1]*2+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*2+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformBase[1]*2+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]]
                                    ]
                                break
                                case 259:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x+transformBase[0],this.userCombatant.tilePosition.y+transformBase[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]*2]
                                    ]
                                break
                                case 286:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x+transformBase[0],this.userCombatant.tilePosition.y+transformBase[1]],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*2,this.userCombatant.tilePosition.y+transformBase[1]*2],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*3,this.userCombatant.tilePosition.y+transformBase[1]*3],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*4,this.userCombatant.tilePosition.y+transformBase[1]*4],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*5,this.userCombatant.tilePosition.y+transformBase[1]*5],
                                        [this.userCombatant.tilePosition.x+transformBase[0]*6,this.userCombatant.tilePosition.y+transformBase[1]*6],
                                        [this.userCombatant.tilePosition.x-transformBase[0],this.userCombatant.tilePosition.y-transformBase[1]],
                                        [this.userCombatant.tilePosition.x-transformBase[0]*2,this.userCombatant.tilePosition.y-transformBase[1]*2],
                                        [this.userCombatant.tilePosition.x-transformBase[0]*3,this.userCombatant.tilePosition.y-transformBase[1]*3],
                                        [this.userCombatant.tilePosition.x-transformBase[0]*4,this.userCombatant.tilePosition.y-transformBase[1]*4],
                                        [this.userCombatant.tilePosition.x-transformBase[0]*5,this.userCombatant.tilePosition.y-transformBase[1]*5],
                                        [this.userCombatant.tilePosition.x-transformBase[0]*6,this.userCombatant.tilePosition.y-transformBase[1]*6],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]+transformDirection(0,this.userCombatant.goal.anim.direction+120)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]+transformDirection(0,this.userCombatant.goal.anim.direction+120)[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]*2+transformDirection(0,this.userCombatant.goal.anim.direction+120)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]*2+transformDirection(0,this.userCombatant.goal.anim.direction+120)[1]*2],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]*3+transformDirection(0,this.userCombatant.goal.anim.direction+120)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]*3+transformDirection(0,this.userCombatant.goal.anim.direction+120)[1]*3],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]*4+transformDirection(0,this.userCombatant.goal.anim.direction+120)[0]*4,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]*4+transformDirection(0,this.userCombatant.goal.anim.direction+120)[1]*4],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]*5+transformDirection(0,this.userCombatant.goal.anim.direction+120)[0]*5,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]*5+transformDirection(0,this.userCombatant.goal.anim.direction+120)[1]*5],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]*6+transformDirection(0,this.userCombatant.goal.anim.direction+120)[0]*6,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]*6+transformDirection(0,this.userCombatant.goal.anim.direction+120)[1]*6],
                                        [this.userCombatant.tilePosition.x-transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]-transformDirection(0,this.userCombatant.goal.anim.direction+120)[0],this.userCombatant.tilePosition.y-transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]-transformDirection(0,this.userCombatant.goal.anim.direction+120)[1]],
                                        [this.userCombatant.tilePosition.x-transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]*2-transformDirection(0,this.userCombatant.goal.anim.direction+120)[0]*2,this.userCombatant.tilePosition.y-transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]*2-transformDirection(0,this.userCombatant.goal.anim.direction+120)[1]*2],
                                        [this.userCombatant.tilePosition.x-transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]*3-transformDirection(0,this.userCombatant.goal.anim.direction+120)[0]*3,this.userCombatant.tilePosition.y-transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]*3-transformDirection(0,this.userCombatant.goal.anim.direction+120)[1]*3],
                                        [this.userCombatant.tilePosition.x-transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]*4-transformDirection(0,this.userCombatant.goal.anim.direction+120)[0]*4,this.userCombatant.tilePosition.y-transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]*4-transformDirection(0,this.userCombatant.goal.anim.direction+120)[1]*4],
                                        [this.userCombatant.tilePosition.x-transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]*5-transformDirection(0,this.userCombatant.goal.anim.direction+120)[0]*5,this.userCombatant.tilePosition.y-transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]*5-transformDirection(0,this.userCombatant.goal.anim.direction+120)[1]*5],
                                        [this.userCombatant.tilePosition.x-transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]*6-transformDirection(0,this.userCombatant.goal.anim.direction+120)[0]*6,this.userCombatant.tilePosition.y-transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]*6-transformDirection(0,this.userCombatant.goal.anim.direction+120)[1]*6]
                                    ]
                                break
                                case 291: case 292:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x+transformBase[0],this.userCombatant.tilePosition.y+transformBase[1]],
                                        [this.userCombatant.tilePosition.x-transformBase[0],this.userCombatant.tilePosition.y-transformBase[1]],
                                        [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]+transformDirection(0,this.userCombatant.goal.anim.direction+120)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]+transformDirection(0,this.userCombatant.goal.anim.direction+120)[1]],
                                        [this.userCombatant.tilePosition.x-transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]-transformDirection(0,this.userCombatant.goal.anim.direction+120)[0],this.userCombatant.tilePosition.y-transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]-transformDirection(0,this.userCombatant.goal.anim.direction+120)[1]]
                                    ]
                                break
                                case 344:
                                    this.target=[
                                        [this.userCombatant.tilePosition.x-transformBase[0],this.userCombatant.tilePosition.y-transformBase[1]],
                                        [this.userCombatant.tilePosition.x-transformBase[0]*2,this.userCombatant.tilePosition.y-transformBase[1]*2],
                                        [this.userCombatant.tilePosition.x-transformBase[0]*3,this.userCombatant.tilePosition.y-transformBase[1]*3],
                                        [this.userCombatant.tilePosition.x-transformBase[0]*4,this.userCombatant.tilePosition.y-transformBase[1]*4]
                                    ]
                                break
                                default:
                                    this.target=[0]
                                break

                            }
                            if(this.type!=127&&this.type!=150&&this.type!=181&&this.type!=209&&this.type!=331){
                                this.targetTile=[]
                                for(let a=0,la=this.target.length;a<la;a++){
                                    this.targetIndex.push(this.battle.combatantManager.getCombatantIndexBarrier(this.target[a][0],this.target[a][1]))
                                    this.targetTile.push(this.battle.tileManager.getTileIndex(this.target[a][0],this.target[a][1]))
                                }
                            }
                            if(this.type==78||this.type==117||this.type==135||this.type==154||this.type==162||this.type==175||this.type==243||this.type==296||this.type==319||this.type==323||this.type==324||this.type==347){
                                this.direction=this.userCombatant.goal.anim.direction
                            }else if(this.type==344){
                                this.direction=this.userCombatant.goal.anim.direction+180
                            }else if(this.type==127||this.type==150||this.type==181||this.type==209||this.type==331||this.type==363){
                                if(this.targetIndex[0]==-1){
                                    if(this.mover){
                                        this.userCombatant.moved=true
                                    }
                                    this.remove=true
                                }else{
                                    this.targetTile=this.battle.tileManager.tiles[this.targetIndex[0]]

                                    this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                                    this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                                    this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                                    this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)

                                    this.targetDistance=distTargetCombatant(0,this.userCombatant,this.targetTile)
                                }
                            }else if(this.type==233){
                                this.targetCombatant=this.battle.combatantManager.getArea(this.userCombatant.team,this.userCombatant.tilePosition,6)
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
                
                                    this.targetDistance.push(distTargetCombatant(0,this.userCombatant,this.targetCombatant[a]))
                                }
                                if(this.targetCombatant.length==0){
                                    this.remove=true
                                }
                            }else if(this.targetIndex.length<=1){
                                if(this.targetIndex[0]==-1){
                                    if(this.mover){
                                        this.userCombatant.moved=true
                                    }
                                    this.remove=true
                                }else{
                                    this.targetCombatant=this.battle.combatantManager.combatants[this.targetIndex[0]]
                                    if((abs(this.userCombatant.goal.anim.direction-this.targetCombatant.goal.anim.direction+180)<10||abs(this.userCombatant.goal.anim.direction-this.targetCombatant.goal.anim.direction-180)<10)&&this.targetCombatant.getStatus('Untargettable From Front')>0){
                                        this.remove=true
                                    }else{
                                        this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                                        this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)

                                        this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                                        this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)

                                        this.targetDistance=distTargetCombatant(0,this.userCombatant,this.targetCombatant)
                                    }
                                }
                            }else if(this.type==9||this.type==28||this.type==44||this.type==53||this.type==60||this.type==64||this.type==69||this.type==82||this.type==84||this.type==85||
                                this.type==86||this.type==87||this.type==95||this.type==104||this.type==105||this.type==114||this.type==120||this.type==124||this.type==142||this.type==146||
                                this.type==153||this.type==157||this.type==166||this.type==168||this.type==171||this.type==176||this.type==192||this.type==204||this.type==213||this.type==222||
                                this.type==223||this.type==224||this.type==259||this.type==264||this.type==265||this.type==278||this.type==288||this.type==291||this.type==292||this.type==308||
                                this.type==330||this.type==350||this.type==351||this.type==357||this.type==360||this.type==368||this.type==379||this.type==381||this.type==387||this.type==388
                            ){
                                this.targetCombatant=[]
                                this.direction=[]
                                this.distance=[]
                                this.relativeDirection=[]
                                this.relativeDistance=[]
                                this.targetDistance=[]
                                for(let a=0,la=this.targetIndex.length;a<la;a++){
                                    if(this.targetIndex[a]==-1){
                                        if(this.mover){
                                            this.userCombatant.moved=true
                                        }
                                    }else{
                                        let targetCombatant=this.battle.combatantManager.combatants[this.targetIndex[a]]
                                        let direction=atan2(targetCombatant.relativePosition.x-this.x,targetCombatant.relativePosition.y-this.y)
                                        if(!((abs(direction-targetCombatant.goal.anim.direction+180)<10||abs(direction-targetCombatant.goal.anim.direction-180)<10)&&targetCombatant.getStatus('Untargettable From Front')>0)){
                                            this.targetCombatant.push(targetCombatant)

                                            this.direction.push(atan2(targetCombatant.position.x-this.position.x,targetCombatant.position.y-this.position.y))
                                            this.distance.push(sqrt((targetCombatant.position.x-this.position.x)**2+(targetCombatant.position.y-this.position.y)**2))

                                            this.relativeDirection.push(atan2(targetCombatant.relativePosition.x-this.relativePosition.x,targetCombatant.relativePosition.y-this.relativePosition.y))
                                            this.relativeDistance.push(sqrt((targetCombatant.relativePosition.x-this.relativePosition.x)**2+(targetCombatant.relativePosition.y-this.relativePosition.y)**2))

                                            let distance=distTargetCombatant(0,this.userCombatant,targetCombatant)
                                            this.targetDistance.push(distance<0?1:distTargetCombatant(0,this.userCombatant,targetCombatant))
                                        }
                                    }
                                }
                                if(this.targetCombatant.length==0&&this.attackClass!=5){
                                    this.remove=true
                                }
                            }else if(this.type==195){
                                this.direction=this.userCombatant.goal.anim.direction
                                for(let a=0,la=this.targetIndex.length;a<la;a++){
                                    if(this.targetIndex[a]==-1){
                                        if(this.mover){
                                            this.userCombatant.moved=true
                                        }
                                    }else{
                                        let targetCombatant=this.battle.combatantManager.combatants[this.targetIndex[a]]
                                        let direction=atan2(targetCombatant.relativePosition.x-this.x,targetCombatant.relativePosition.y-this.y)
                                        if(!((abs(direction-targetCombatant.goal.anim.direction+180)<10||abs(direction-targetCombatant.goal.anim.direction-180)<10)&&targetCombatant.getStatus('Untargettable From Front')>0)){
                                            this.direction=atan2(targetCombatant.position.x-this.position.x,targetCombatant.position.y-this.position.y)
                                            a=la
                                        }
                                    }
                                }
                            }else{
                                this.targetCombatant=-1
                                for(let a=0,la=this.targetIndex.length;a<la;a++){
                                    let fail=false
                                    if(this.battle.modded){
                                        switch(this.type){
                                            case 1: case 2: case 3: case 11: case 13: case 22: case 23: case 31: case 34: case 35:
                                            case 36: case 37: case 58: case 97: case 101: case 103: case 113: case 116: case 121: case 122:
                                            case 212: case 226: case 227: case 229: case 242: case 246: case 247: case 252: case 270: case 271:
                                            case 274: case 282: case 295: case 305: case 309: case 332: case 341: case 355: case 369: case 370:
                                            case 371: case 372: case 373: case 377:
                                                if(a==1&&this.targetTile[0]<0){
                                                    fail=true
                                                }
                                            break
                                        }
                                    }
                                    switch(this.type){
                                        case 6: case 7: case 8: case 14: case 15: case 19: case 20: case 24: case 27: case 30:
                                        case 32: case 33: case 61: case 62: case 66: case 67: case 76: case 77: case 96: case 107:
                                        case 112: case 140: case 156: case 183: case 203: case 211: case 248: case 253: case 258: case 260:
                                        case 272: case 273: case 275: case 276: case 277: case 297: case 298: case 299: case 310: case 317:
                                        case 325: case 329: case 342: case 343: case 354: case 374: case 375: case 378: case 382: case 383:
                                        case 386:
                                            if(a==1&&this.targetTile[0]<0){
                                                fail=true
                                            }
                                        break
                                        case 71: case 73: case 79: case 172: case 312: case 322: case 339: case 348:
                                        case 367: case 99: case 385: case 389: case 390:
                                            if(
                                                (a>=1&&this.targetTile[0]<0)||
                                                (a>=2&&this.targetTile[1]<0)){
                                                    fail=true
                                            }
                                        break
                                        case 100: case 380:
                                            if(
                                                (a>=1&&this.targetTile[0]<0)||
                                                (a>=2&&this.targetTile[1]<0)||
                                                (a>=3&&this.targetTile[2]<0)){
                                                    fail=true
                                            }
                                        break
                                        case 12: case 38: case 45: case 47: case 50: case 59: case 80: case 81: case 83: case 89:
                                        case 90: case 91: case 98: case 106: case 115: case 118: case 119: case 123: case 125: case 129:
                                        case 130: case 144: case 145: case 148: case 151: case 152: case 160: case 173: case 178: case 179:
                                        case 180: case 184: case 188: case 191: case 193: case 194: case 196: case 199: case 200: case 201:
                                        case 202: case 206: case 208: case 235: case 236: case 245: case 262: case 263: case 266: case 268:
                                        case 279: case 283: case 284: case 285: case 287: case 290: case 303: case 306: case 313: case 316:
                                        case 320: case 321: case 327: case 328: case 335: case 336: case 337: case 338: case 340: case 353:
                                        case 358: case 361: case 362: case 364:
                                            if(
                                                (a>=1&&this.targetTile[0]<0)||
                                                (a>=2&&this.targetTile[1]<0)||
                                                (a>=3&&this.targetTile[2]<0)||
                                                (a>=4&&this.targetTile[3]<0)||
                                                (a>=5&&this.targetTile[4]<0)){
                                                    fail=true
                                            }
                                        break
                                        case 49: case 131: case 164: case 185: case 195: case 205: case 219: case 286: case 384:
                                            if(
                                                (a%6>=1&&this.targetTile[floor(b/6)*6]<0)||
                                                (a%6>=2&&this.targetTile[floor(b/6)*6+1]<0)||
                                                (a%6>=3&&this.targetTile[floor(b/6)*6+2]<0)||
                                                (a%6>=4&&this.targetTile[floor(b/6)*6+3]<0)||
                                                (a%6>=5&&this.targetTile[floor(b/6)*6+4]<0)){
                                                    fail=true
                                            }
                                        break
                                        case 214:
                                            if(a==3&&this.targetTile[0]<0){
                                                fail=true
                                            }
                                        break
                                        case 218:
                                            if(a>=18&&this.targetTile[a-18]<0||a>=36&&this.targetTile[a-36]<0){
                                                fail=true
                                            }
                                        break
                                        case 221:
                                            if(a>=3&&this.targetTile[0]<0||a>=6&&this.targetTile[3]<0){
                                                fail=true
                                            }
                                        break
                                    }
                                    if(!fail){
                                        if(this.targetIndex[a]<0){
                                            if(this.mover){
                                                this.userCombatant.moved=true
                                            }
                                        }else{
                                            this.targetCombatant=this.battle.combatantManager.combatants[this.targetIndex[a]]
                                            if((abs(this.userCombatant.goal.anim.direction-this.targetCombatant.goal.anim.direction+180)<10||abs(this.userCombatant.goal.anim.direction-this.targetCombatant.goal.anim.direction-180)<10)&&this.targetCombatant.getStatus('Untargettable From Front')>0){
                                                this.targetCombatant=-1
                                            }else{
                                                this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)

                                                this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)

                                                this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                                                this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)

                                                this.targetDistance=distTargetCombatant(0,this.userCombatant,this.targetCombatant)
                                                break
                                            }
                                        }
                                    }
                                }
                                if(this.targetCombatant==-1&&this.attackClass!=5){
                                    this.remove=true
                                }
                            }
                        }
                    break
                    case 1:
                        this.targetTile=-1
                        if(this.type==6&&floor(random(0,5))==0){
                            this.type=5
                        }
                        switch(this.type){
                            case 0: case 4: case 6: case 8: case 9:
                                let works=true
                                if(this.setTarget!=-1){
                                    this.targetCombatant=this.setTarget
                                }else if(this.userCombatant.construct||this.userCombatant.support){
                                    this.target=[this.battle.combatantManager.getRandomNonplayerCombatantIndex()]
                                    this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                                    if(this.target[0]<0||this.target[0]>=this.battle.combatantManager.combatants.length){
                                        works=false
                                    }
                                }else{
                                    this.target=[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)]
                                    this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                                    if(this.target[0]<0||this.target[0]>=this.battle.combatantManager.combatants.length){
                                        works=false
                                    }
                                }
                                if(this.type==6||this.type==8){
                                    this.targetClass=1
                                    this.targetDistance=1
                                }
                                if(works){
                                    this.direction=round(atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)/60-random(0.4,0.6))*60+30
                                    if(this.type==4||this.type==5){
                                        this.direction+=round(random(-2,2))*60
                                    }else if(this.type==9){
                                        this.direction+=180
                                    }
                                    this.target=[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.direction)[1])]
                                    let fail=false
                                    if(this.target[0]==-1){
                                        fail=true
                                    }else{
                                        this.targetTile=this.battle.tileManager.tiles[this.target[0]]
                                        if(this.targetTile.occupied>0){
                                            if(this.type==6||this.type==8||this.battle.modded(115)){
                                                this.targetClass=2
                                                let index=this.battle.combatantManager.getCombatantIndex(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                                                if(index>=0){
                                                    this.targetCombatant=this.battle.combatantManager.combatants[index]
                                                    this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                                                    this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)
                                                    this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                                                    this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
                                                }else{
                                                    fail=true
                                                }
                                            }else{
                                                fail=true
                                            }
                                        }else{
                                            this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                                            this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                                            this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                                            this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                                        }
                                    }
                                    if(fail){
                                        let angle=floor(random(0,2))*2-1
                                        fail=false
                                        this.direction+=angle*60
                                        this.target=[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.direction)[1])]
                                        if(this.target[0]==-1){
                                            fail=true
                                        }else{
                                            this.targetTile=this.battle.tileManager.tiles[this.target[0]]
                                            if(this.targetTile.occupied>0){
                                                if(this.type==6||this.type==8||this.battle.modded(115)){
                                                    this.targetClass=2
                                                    let index=this.battle.combatantManager.getCombatantIndex(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                                                    if(index>=0){
                                                        this.targetCombatant=this.battle.combatantManager.combatants[index]
                                                        this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                                                        this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)
                                                        this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                                                        this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
                                                    }else{
                                                        fail=true
                                                    }
                                                }else{
                                                    fail=true
                                                }
                                            }else{
                                                this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                                                this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)
            
                                                this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                                                this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                                            }
                                        }
                                        if(fail){
                                            fail=false
                                            this.direction-=angle*120
                                            this.target=[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.direction)[1])]
                                            if(this.target[0]==-1){
                                                fail=true
                                            }else{
                                                this.targetTile=this.battle.tileManager.tiles[this.target[0]]
                                                if(this.targetTile.occupied>0){
                                                    if(this.type==6||this.type==8||this.battle.modded(115)){
                                                        this.targetClass=2
                                                        let index=this.battle.combatantManager.getCombatantIndex(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                                                        if(index>=0){
                                                            this.targetCombatant=this.battle.combatantManager.combatants[index]
                                                            this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                                                            this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)
                                                            this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                                                            this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
                                                        }else{
                                                            fail=true
                                                        }
                                                    }else{
                                                        fail=true
                                                    }
                                                }else{
                                                    this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                                                    this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)
                
                                                    this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                                                    this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                                                }
                                            }
                                            if(fail){
                                                fail=false
                                                this.direction+=angle*180
                                                this.target=[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.direction)[1])]
                                                if(this.target[0]==-1){
                                                    fail=true
                                                }else{
                                                    this.targetTile=this.battle.tileManager.tiles[this.target[0]]
                                                    if(this.targetTile.occupied>0){
                                                        if(this.type==6||this.type==8||this.battle.modded(115)){
                                                            this.targetClass=2
                                                            let index=this.battle.combatantManager.getCombatantIndex(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                                                            if(index>=0){
                                                                this.targetCombatant=this.battle.combatantManager.combatants[index]
                                                                this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                                                                this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)
                                                                this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                                                                this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
                                                            }else{
                                                                fail=true
                                                            }
                                                        }else{
                                                            fail=true
                                                        }
                                                    }else{
                                                        this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                                                        this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)
                    
                                                        this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                                                        this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                                                    }
                                                }
                                                if(fail){
                                                    fail=false
                                                    this.direction-=angle*240
                                                    this.target=[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.direction)[1])]
                                                    if(this.target[0]==-1){
                                                        fail=true
                                                    }else{
                                                        this.targetTile=this.battle.tileManager.tiles[this.target[0]]
                                                        if(this.targetTile.occupied>0){
                                                            if(this.type==6||this.type==8||this.battle.modded(115)){
                                                                this.targetClass=2
                                                                let index=this.battle.combatantManager.getCombatantIndex(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                                                                if(index>=0){
                                                                    this.targetCombatant=this.battle.combatantManager.combatants[index]
                                                                    this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                                                                    this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)
                                                                    this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                                                                    this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
                                                                }else{
                                                                    fail=true
                                                                }
                                                            }else{
                                                                fail=true
                                                            }
                                                        }else{
                                                            this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                                                            this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)
                        
                                                            this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                                                            this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                                                        }
                                                    }
                                                    if(fail){
                                                        this.remove=true
                                                    }
                                                }else{
                                                    this.userCombatant.goal.anim.direction=this.relativeDirection
                                                }
                                            }else{
                                                this.userCombatant.goal.anim.direction=this.relativeDirection
                                            }
                                        }else{
                                            this.userCombatant.goal.anim.direction=this.relativeDirection
                                        }
                                    }else{
                                        this.userCombatant.goal.anim.direction=this.relativeDirection
                                    }
                                }else{
                                    this.remove=true
                                }
                            break
                            case 1:
                                this.target=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)].tilePosition
                                this.possible=[]
                                for(let a=0,la=6;a<la;a++){
                                    let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,360*(a+0.5)/la)[0],this.userCombatant.tilePosition.y+transformDirection(0,360*(a+0.5)/la)[1])
                                    if(index>=0&&this.battle.tileManager.tiles[index].occupied==0){
                                        this.possible.push(index)
                                    }
                                }
                                this.movable=[]
                                for(let a=0,la=this.possible.length;a<la;a++){
                                    if(distTarget(0,this.battle.tileManager.tiles[this.possible[a]].tilePosition.x-this.target.x,this.battle.tileManager.tiles[this.possible[a]].tilePosition.y-this.target.y)>0){
                                        this.movable.push(this.possible[a])
                                    }
                                }
                                if(this.movable.length>0){
                                    this.targetTile=this.battle.tileManager.tiles[this.movable[floor(random(0,this.movable.length))]]

                                    this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                                    this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                                    this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                                    this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                                }else{
                                    this.type=0
                                    this.set()
                                }
                            break
                            case 2:
                                this.possible=[]
                                for(let a=0,la=6;a<la;a++){
                                    let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,360*(a+0.5)/la)[0],this.userCombatant.tilePosition.y+transformDirection(0,360*(a+0.5)/la)[1])
                                    if(index>=0&&this.battle.tileManager.tiles[index].occupied==0){
                                        this.possible.push(index)
                                    }
                                }
                                if(this.possible.length>0){
                                    this.targetTile=this.battle.tileManager.tiles[this.possible[floor(random(0,this.possible.length))]]

                                    this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                                    this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                                    this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                                    this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                                }else{
                                    this.type=0
                                    this.set()
                                }
                            break
                            case 3:
                                this.target=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)].tilePosition
                                this.movable=[]
                                for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                                    if(distTarget(0,this.battle.tileManager.tiles[a].tilePosition.x-this.target.x,this.battle.tileManager.tiles[a].tilePosition.y-this.target.y)==1&&this.battle.tileManager.tiles[a].occupied<=0){
                                        this.movable.push(a)
                                    }
                                }
                                if(this.movable.length>0){
                                    let id=this.movable[floor(random(0,this.movable.length))]
                                    if(id==this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)){
                                        this.remove=true
                                    }else{
                                        this.targetTile=this.battle.tileManager.tiles[id]

                                        this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                                        this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                                        this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                                        this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                                    }
                                }else{
                                    this.type=0
                                    this.set()
                                }
                            break
                            case 5:
                                this.target=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)].tilePosition
                                this.movable=[]
                                for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                                    if(distTarget(0,this.battle.tileManager.tiles[a].tilePosition.x-this.target.x,this.battle.tileManager.tiles[a].tilePosition.y-this.target.y)>0&&this.battle.tileManager.tiles[a].occupied<=0){
                                        this.movable.push(a)
                                    }
                                }
                                if(this.movable.length>0){
                                    let id=this.movable[floor(random(0,this.movable.length))]
                                    if(id==this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)){
                                        this.remove=true
                                    }else{
                                        this.targetTile=this.battle.tileManager.tiles[id]

                                        this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                                        this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                                        this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                                        this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                                    }
                                }else{
                                    this.type=0
                                    this.set()
                                }
                            break
                            case 7:
                                this.target=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)].tilePosition
                                this.movable=[]
                                for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                                    if(distTarget(0,this.battle.tileManager.tiles[a].tilePosition.x-this.target.x,this.battle.tileManager.tiles[a].tilePosition.y-this.target.y)>0&&distTarget(0,this.battle.tileManager.tiles[a].tilePosition.x-this.target.x,this.battle.tileManager.tiles[a].tilePosition.y-this.target.y)<=2&&this.battle.tileManager.tiles[a].occupied<=0){
                                        this.movable.push(a)
                                    }
                                }
                                if(this.movable.length>0){
                                    let id=this.movable[floor(random(0,this.movable.length))]
                                    if(id==this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)){
                                        this.remove=true
                                    }else{
                                        this.targetTile=this.battle.tileManager.tiles[id]

                                        this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                                        this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                                        this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                                        this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                                    }
                                }else{
                                    this.type=0
                                    this.set()
                                }
                            break
                            case 10:
                                this.target=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)].tilePosition
                                this.possible=[]
                                for(let a=0,la=3;a<la;a++){
                                    let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.procedure[0]-60+a*60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.procedure[0]-60+a*60)[1])
                                    if(index>=0&&this.battle.tileManager.tiles[index].occupied==0){
                                        this.possible.push(index)
                                    }
                                }
                                if(this.possible.length>0){
                                    this.targetTile=this.battle.tileManager.tiles[this.possible[floor(random(0,this.possible.length))]]

                                    this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                                    this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                                    this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                                    this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                                }else{
                                    this.remove=true
                                }
                            break
                            case 11: case 12: case 13:
                                this.targetCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)]
                                this.target=this.targetCombatant.tilePosition
                                this.possible=[]
                                if(this.type==13){
                                    this.possible=this.battle.tileManager.getEmptyTiles()
                                }else{
                                    for(let a=0,la=6;a<la;a++){
                                        let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,360*(a+0.5)/la)[0],this.userCombatant.tilePosition.y+transformDirection(0,360*(a+0.5)/la)[1])
                                        if(index>=0&&this.battle.tileManager.tiles[index].occupied==0){
                                            this.possible.push(index)
                                        }
                                    }
                                }
                                this.movable=[]
                                let distance=0
                                for(let a=0,la=this.possible.length;a<la;a++){
                                    if(this.type==12||distTarget(0,this.battle.tileManager.tiles[this.possible[a]].tilePosition.x-this.target.x,this.battle.tileManager.tiles[this.possible[a]].tilePosition.y-this.target.y)>0){
                                        this.movable.push(this.possible[a])
                                        distance=max(distance,dist(this.battle.tileManager.tiles[this.possible[a]].relativePosition.x,this.battle.tileManager.tiles[this.possible[a]].relativePosition.y,this.targetCombatant.relativePosition.x,this.targetCombatant.relativePosition.y))
                                    }
                                }
                                for(let a=0,la=this.movable.length;a<la;a++){
                                    if(abs(dist(this.battle.tileManager.tiles[this.movable[a]].relativePosition.x,this.battle.tileManager.tiles[this.movable[a]].relativePosition.y,this.targetCombatant.relativePosition.x,this.targetCombatant.relativePosition.y)-distance)>10){
                                        this.movable.splice(a,1)
                                        a--
                                        la--
                                    }
                                }
                                if(this.movable.length>0){
                                    this.targetTile=this.battle.tileManager.tiles[this.movable[floor(random(0,this.movable.length))]]

                                    this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                                    this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                                    this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                                    this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                                }else{
                                    this.type=2
                                    this.set()
                                }
                            break
                            
                        }
                        if(!this.remove&&this.targetTile!=-1){
                            this.targetDistance=distTargetCombatant(0,this,this.targetTile)
                        }
                    break
                    case 2: case 4:
                        if(this.action==4){
                            this.battle.combatantManager.setSingleTarget(this.userCombatant.id,this.effect[0])
                        }
                        if(this.userCombatant.getStatus('Chained')>0){
                            this.userCombatant.status.main[findList('Chained',this.userCombatant.status.name)]--
                        }else if(this.userCombatant.getStatus('Confusion')>0){
                            this.userCombatant.status.main[findList('Confusion',this.userCombatant.status.name)]--
                            this.userCombatant.goal.anim.direction=-30+60*floor(random(0,6))
                        }else{
                            this.target=[this.userCombatant.target]
                            this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                            if(this.target[0]<0||this.target[0]>=this.battle.combatantManager.combatants.length||this.targetCombatant.life<0){
                                this.remove=true
                            }
                            if(!this.remove){
                                this.userCombatant.goal.anim.direction=round(atan2(this.targetCombatant.relativePosition.x-this.userCombatant.relativePosition.x,this.targetCombatant.relativePosition.y-this.userCombatant.relativePosition.y)/60-1/2)*60+30
                                let target=this.userCombatant.getTarget()[0]
                                if(target>=0&&!(this.battle.tileManager.tiles[target].tilePosition.x==this.targetCombatant.tilePosition.x&&this.battle.tileManager.tiles[target].tilePosition.y==this.targetCombatant.tilePosition.y)&&this.battle.tileManager.tiles[target].occupied>0&&floor(random(0,2)==0)){
                                    let remember=this.userCombatant.goal.anim.direction
                                    this.userCombatant.goal.anim.direction+=(floor(random(0,2))*2-1)*60
                                    if(!(this.battle.tileManager.tiles[target].tilePosition.x==this.targetCombatant.tilePosition.x&&this.battle.tileManager.tiles[target].tilePosition.y==this.targetCombatant.tilePosition.y)&&this.battle.tileManager.tiles[target].occupied>0){
                                        this.userCombatant.goal.anim.direction=remember
                                    }else{
                                        this.battle.activateCombatant(2,this.userCombatant.target)
                                    }
                                }else{
                                    this.battle.activateCombatant(2,this.userCombatant.target)
                                }
                                if(this.userCombatant.getStatus('Mixed')>0){
                                    this.userCombatant.status.main[findList('Mixed',this.userCombatant.status.name)]--
                                    this.userCombatant.goal.anim.direction+=180
                                }
                            }
                        }
                        if(this.userCombatant.getStatus('Jagged Bleed')>0){
                            this.userCombatant.status.main[findList('Jagged Bleed',this.userCombatant.status.name)]--
                            this.userCombatant.goal.anim.direction+=floor(random(-1,2))*60
                        }
                        this.remove=true
                        this.selfRemoved=true
                    break
                    case 3:
                        if(this.userCombatant.getStatus('Chained')>0){
                            this.userCombatant.status.main[findList('Chained',this.userCombatant.status.name)]--
                        }else if(this.userCombatant.getStatus('Confusion')>0){
                            this.userCombatant.status.main[findList('Confusion',this.userCombatant.status.name)]--
                            this.userCombatant.goal.anim.direction=-30+60*floor(random(0,6))
                        }else{
                            if(this.userCombatant.team==0&&this.target==[]){
                                this.target=[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)]
                            }
                            if(this.target.length>0&&this.target[0]>=0&&this.target[0]<this.battle.combatantManager.combatants.length){
                                this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                                this.userCombatant.goal.anim.direction=round(atan2(this.targetCombatant.relativePosition.x-this.userCombatant.relativePosition.x,this.targetCombatant.relativePosition.y-this.userCombatant.relativePosition.y)/60-1/2)*60+30
                                if(this.userCombatant.getStatus('Mixed')>0){
                                    this.userCombatant.status.main[findList('Mixed',this.userCombatant.status.name)]--
                                    this.userCombatant.goal.anim.direction+=180
                                }
                            }
                        }
                        if(this.userCombatant.getStatus('Jagged Bleed')>0){
                            this.userCombatant.status.main[findList('Jagged Bleed',this.userCombatant.status.name)]--
                            this.userCombatant.goal.anim.direction+=floor(random(-1,2))*60
                        }
                        this.remove=true
                        this.selfRemoved=true
                    break
                    case 5:
                        this.userCombatant.autoAim()
                        this.remove=true
                    break
                    default:
                        this.remove=true
                    break
                }
                if(this.remove){
                    if(this.userCombatant.aggressor){
                        this.userCombatant.aggressor=false
                    }
                }
            }
        }
    }
    selfCall(type){
        switch(type){
            case 0:
                switch(this.type){
                    case 8:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.drop(this.targetCombatant.id,findName(this.effect[1],types.card),0,game.playerNumber+1)
                        }
                    break
                    case 23: case 33: case 152:
                        this.targetCombatant.statusEffect('Weak Next Turn',this.effect[0])
                    break
                    case 37:
                        this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*this.userCombatant.combo,this.user)
                        this.userCombatant.combo=0
                    break
                    case 58:
                        if(this.targetCombatant.block<=0){
                            this.targetCombatant.statusEffect('Bleed',this.effect[0])
                        }
                    break
                    case 61:
                        this.targetCombatant.statusEffect('Frail Next Turn',this.effect[0])
                    break
                    case 62:
                        this.targetCombatant.statusEffect('Vulnerable Next Turn',this.effect[0])
                    break
                    case 172:
                        this.targetCombatant.takeDamage(this.effect[0]/100*this.targetCombatant.life,this.user)
                    break
                    case 229:
                        this.targetCombatant.statusEffect('Take Per Turn',this.effect[0])
                    break
                    case 242:
                        this.targetCombatant.statusEffect('Burn',this.effect[0])
                    break
                    case 243:
                        this.userCombatant.takeDamage(this.effect[0],this.user)
                    break
                    case 246:
                        this.targetCombatant.statusEffect('Freeze',this.effect[0])
                    break
                    case 247: case 385:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.targetCombatant.statusEffect(['Burn','Freeze','Shock'][floor(random(0,3))],1)
                        }
                    break
                    case 248:
                        this.targetCombatant.takeDamage(floor(random(this.effect[0],this.effect[1]+1)),this.user)
                    break
                    case 291:
                        for(let a=0,la=this.targetCombatant.length;a<la;a++){
                            this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                        }
                    break
                    case 295:
                        this.targetCombatant.statusEffect('Burn',this.effect[0])
                        this.targetCombatant.statusEffect('Freeze',this.effect[1])
                        this.targetCombatant.statusEffect('Shock',this.effect[2])
                        this.targetCombatant.statusEffect('Poison',this.effect[3])
                    break
                    case 325:
                        this.targetCombatant.takeDamage(this.effect[0]*(1+floor(random(0,2))),this.user)
                    break
                    case 372:
                        this.targetCombatant.statusEffect('Poison',this.effect[0])
                    break
                    case 373:
                        this.targetCombatant.statusEffect('Dexterity',-this.effect[0])
                    break
                    default:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    break
                }
                switch(this.type){
                    case 13: case 14: case 178:
                        if(this.targetCombatant.blocked>0){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,game.playerNumber+1)
                            }
                        }
                    break
                    case 15: case 353:
                        this.targetCombatant.statusEffect('Weak Next Turn',this.effect[1])
                    break
                    case 22: case 32: case 83:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,game.playerNumber+1)
                        }
                    break
                    case 24: case 369:
                        if(this.targetCombatant.blocked>0){
                            this.targetCombatant.statusEffect('Bleed',this.effect[1])
                        }
                    break
                    case 27:
                        this.targetCombatant.statusEffect('Frail Next Turn',this.effect[1])
                    break
                    case 30: case 378:
                        this.userCombatant.addBlock(this.effect[1])
                    break
                    case 67:
                        if(this.targetCombatant.id<this.battle.players){
                            this.userCombatant.statusEffect('Currency',this.effect[1])
                            this.battle.loseCurrency(this.effect[1],this.targetCombatant.id)
                        }
                    break
                    case 36:
                        this.userCombatant.combo++
                        if(this.targetCombatant.blocked>0){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,game.playerNumber+1)
                            }
                        }
                    break
                    case 112:
                        this.userCombatant.statusEffect('Strength',this.effect[1])
                    break
                    case 113:
                        this.userCombatant.heal(this.effect[0])
                    break
                    case 183:
                        for(let a=0,la=this.effect[1]*(3-this.targetDistance);a<la;a++){
                            this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,game.playerNumber+1)
                        }
                    break
                    case 193: case 342:
                        this.targetCombatant.statusEffect('Cannot Add Block Next Turn',this.effect[1])
                    break
                    case 250:
                        this.userCombatant.statusEffect('Vulnerable Next Turn',this.effect[1])
                    break
                    case 253:
                        this.targetCombatant.statusEffect('Bruise',this.effect[1])
                    break
                    case 260: case 268:
                        this.userCombatant.statusEffect('Speed Up',this.effect[1])
                    break
                    case 262: case 374: case 389:
                        this.targetCombatant.statusEffect('Shock',this.effect[1])
                    break
                    case 263: case 375: case 390:
                        this.targetCombatant.statusEffect('Burn',this.effect[1])
                    break
                    case 270:
                        if(this.targetCombatant.id<this.battle.players){
                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.targetCombatant.id)].statusEffect('Temporary Draw',-this.effect[1])
                        }
                    break
                    case 271: case 329:
                        this.targetCombatant.statusEffect(variants.mtg?'Random Mana Next Turn':'Energy Next Turn',-this.effect[1])
                    break
                    case 274:
                        if(this.targetCombatant.id<this.battle.cardManagers.length){
                            this.battle.cardManagers[this.targetCombatant.id].hand.discard(this.effect[1])
                        }
                    break
                    case 275:
                        this.battle.dropHand(this.targetCombatant.id,findName('Miracle',types.card),0,0)
                    break
                    case 276:
                        this.battle.dropHand(this.targetCombatant.id,findName('Smite',types.card),0,0)
                    break
                    case 277:
                        this.battle.dropHand(this.targetCombatant.id,findName('Safety',types.card),0,0)
                    break
                    case 279:
                        this.userCombatant.statusEffect('Decrementing Armor',this.effect[1])
                    break
                    case 287:
                        this.userCombatant.statusEffect('Intangible Next Turn',this.effect[1])
                    break
                    case 290:
                        this.userCombatant.statusEffect('Regeneration',this.effect[1])
                    break
                    case 304:
                        this.userCombatant.combo++
                    break
                    case 306:
                        if(this.targetCombatant.id<this.battle.players){
                            this.battle.cardManagers[this.targetCombatant.id].allGroupEffect(93)
                        }
                    break
                    case 316:
                        if(this.targetCombatant.id<this.battle.players){
                            this.battle.cardManagers[this.targetCombatant.id].hand.transform(this.effect[1])
                        }
                    break
                    case 328:
                        if(this.targetCombatant.id<this.battle.players){
                            this.battle.cardManagers[this.targetCombatant.id].hand.discard(this.effect[1])
                        }
                    break
                    case 332:
                        this.userCombatant.attack[this.userCombatant.intent].effect[0]+=this.effect[1]
                    break
                    case 335:
                        if(this.targetCombatant.id<this.battle.players){
                            this.battle.itemManager.removeAll(this.targetCombatant.id)
                            this.battle.itemManager.fillAll(findName('Mundane Dust',types.item),this.targetCombatant.id)
                        }
                    break
                    case 343:
                        this.targetCombatant.statusEffect('Anti-Control',this.effect[1])
                    break
                    case 386:
                        this.targetCombatant.statusEffect('Miss',this.effect[1])
                    break
                }
            break
            case 1:
                switch(this.type){
                    case 10:
                        this.battle.combatantManager.allEffect(6,[this.effect[0]])
                    break
                    case 65:
                        this.battle.combatantManager.allEffect(6,[this.effect[0]])
                        this.battle.combatantManager.allEffect(9,[1])
                    break
                    case 126:
                        this.battle.combatantManager.allEffect(6,[this.effect[0]])
                        this.battle.combatantManager.allEffect(9,[2])
                    break
                    case 111:
                        this.userCombatant.statusEffect('Metallicize',this.effect[0])
                    break
                    case 230:
                        if(this.userCombatant.builder==this.battle.turn.main){
                            this.battle.combatantManager.combatants[this.userCombatant.builder].addBlock(this.effect[0])
                            this.battle.combatantManager.allConstructEffect(this.userCombatant.builder,1,[this.effect[0]])
                        }else{
                            this.battle.combatantManager.combatants[this.userCombatant.builder].statusEffect('Block Next Turn',this.effect[0])
                            this.battle.combatantManager.allConstructEffect(this.userCombatant.builder,0,['Block Next Turn',this.effect[0]])
                        }
                    break
                    case 231:
                        this.battle.cardManagers[this.battle.combatantManager.combatants[this.userCombatant.builder].id].draw(this.effect[0])
                    break
                    case 232:
                        if(this.userCombatant.builder==this.battle.turn.main){
                            this.battle.combatantManager.combatants[this.userCombatant.builder].statusEffect('Temporary Strength',this.effect[0])
                            this.battle.combatantManager.allConstructEffect(this.userCombatant.builder,0,['Temporary Strength',this.effect[0]])
                        }else{
                            this.battle.combatantManager.combatants[this.userCombatant.builder].statusEffect('Temporary Strength Next Turn',this.effect[0])
                            this.battle.combatantManager.allConstructEffect(this.userCombatant.builder,0,['Temporary Strength Next Turn',this.effect[0]])
                        }
                    break
                    case 234:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            for(let b=0,lb=this.battle.cardManagers.length;b<lb;b++){
                                this.battle.cardManagers[b].hand.add(findName('Revolver',types.card),0,0)
                            }
                        }
                    break
                    case 237:
                        this.battle.combatantManager.combatants[this.userCombatant.builder].metal+=this.effect[0]
                    break
                    case 238:
                        this.battle.cardManagers[this.battle.combatantManager.combatants[this.userCombatant.builder].id].hand.upgrade(this.effect[0])
                    break
                    case 239:
                        this.battle.cardManagers[this.battle.combatantManager.combatants[this.userCombatant.builder].id].hand.transform(this.effect[0])
                    break
                    case 240:
                        this.battle.cardManagers[this.battle.combatantManager.combatants[this.userCombatant.builder].id].hand.duplicate(this.effect[0])
                    break
                    case 241:
                        this.battle.cardManagers[this.battle.combatantManager.combatants[this.userCombatant.builder].id].hand.exhaust(this.effect[0])
                        this.battle.cardManagers[this.battle.combatantManager.combatants[this.userCombatant.builder].id].draw(this.effect[1])
                    break
                    case 257:
                        this.battle.combatantManager.allEffect(6,[this.effect[0]])
                        this.battle.combatantManager.allEffect(8,[this.effect[1]])
                    break
                    case 365:
                        this.battle.combatantManager.allEffect(6,[this.effect[0]])
                        this.battle.combatantManager.allEffect(13,[this.effect[1]])
                    break
                    case 392:
                        this.battle.combatantManager.allEffect(6,[this.effect[0]])
                        this.battle.combatantManager.allEffect(9,[1])
                        this.battle.combatantManager.allEffect(48,['Armor',this.effect[1]])
                    break
                    default:
                        this.userCombatant.addBlock(this.effect[0])
                        switch(this.type){
                            case 29:
                                this.userCombatant.statusEffect('Retain Block',1)
                            break
                            case 48:
                                this.userCombatant.statusEffect('Retain Block',2)
                            break
                            case 72:
                                this.userCombatant.statusEffect('Strength',this.effect[1])
                            break
                            case 102:
                                this.userCombatant.statusEffect('Retain Block',3)
                            break
                            case 108:
                                this.userCombatant.statusEffectNext('Counter',this.effect[1])
                            break
                            case 110:
                                this.userCombatant.statusEffect('Retain Block',1)
                                this.userCombatant.statusEffectNext('Counter',this.effect[1])
                            break
                            case 182:
                                this.userCombatant.statusEffect('Retain Block',6)
                            break
                            case 190:
                                this.userCombatant.statusEffect('Armor',this.effect[1])
                                this.userCombatant.statusEffect('Strength',this.effect[2])
                            break
                            case 254:
                                this.battle.combatantManager.allEffect(3,[this.effect[1]])
                            break
                            case 261:
                                this.userCombatant.statusEffect('Speed Up',this.effect[1])
                            break
                            case 267:
                                this.userCombatant.statusEffect('Ichor',this.effect[1])
                            break
                            case 269:
                                this.userCombatant.statusEffect('Strength',this.effect[1])
                                this.userCombatant.statusEffect('Speed Up',this.effect[2])
                            break
                            case 280:
                                this.userCombatant.statusEffect('Decrementing Armor',this.effect[1])
                            break
                            case 293:
                                this.userCombatant.statusEffectNext('Counter 2 Times',this.effect[1])
                            break
                            case 318:
                                this.userCombatant.statusEffect('Retain Block',2)
                                this.userCombatant.stance=4
                            break
                            case 346:
                                this.userCombatant.statusEffect('Retain Block',2)
                                this.userCombatant.statusEffect('Strength',this.effect[1])
                            break
                            case 359:
                                this.userCombatant.statusEffect('Retain Block',3)
                                this.userCombatant.removeAllStatuses([1,3])
                            break
                            case 376:
                                this.userCombatant.statusEffect('Dexterity',this.effect[1])
                            break

                        }
                    break
                }
            break
            case 2:
                switch(this.type){
                    case 5:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.dropAll(findName(this.effect[1],types.card),0,game.playerNumber+1)
                        }
                    break
                    case 39:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.quickReinforce(this.effect[1])
                        }
                    break
                    case 40:
                        this.battle.tileManager.spawnAmount(this.effect[0],this.userCombatant.tilePosition,2)
                    break
                    case 41:
                        this.battle.tileManager.spawnAmount(this.effect[0],this.userCombatant.tilePosition,1)
                    break
                    case 42:
                        this.battle.tileManager.spawnAmount(this.effect[0],this.userCombatant.tilePosition,4)
                    break
                    case 51:
                        this.battle.tileManager.spawnAmount(this.effect[0],this.userCombatant.tilePosition,5)
                    break
                    case 52:
                        this.battle.tileManager.spawnAmount(this.effect[0],this.userCombatant.tilePosition,6)
                    break
                    case 56:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.combatantManager.summonCombatant(this.userCombatant.tilePosition,findName('Shield Particle',types.combatant),this.userCombatant.goal.anim.direction)
                        }
                    break
                    case 57: case 391:
                        this.userCombatant.addBlock(this.battle.combatantManager.killAll('Shield Particle')*(this.type==391?2:1))
                    break
                    case 74:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.dropAll(findName(this.effect[1],types.card),0,game.playerNumber+1)
                        }
                        this.battle.cardManagers.forEach(cardManager=>cardManager.allGroupEffect(9))
                    break
                    case 75:
                        this.battle.tileManager.allEffect(0,[7])
                    break
                    case 78:
                        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                            if(legalTargetCombatant(2,1,6,this.userCombatant,this.battle.combatantManager.combatants[a],this.battle.tileManager.tiles)&&this.battle.combatantManager.combatants[a].name==this.userCombatant.name&&distTargetCombatant(0,this.userCombatant,this.battle.combatantManager.combatants[a])>1&&this.battle.combatantManager.combatants[a].life>0){
                                this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-30,12,[this.battle.combatantManager.combatants[a].position.x,this.battle.combatantManager.combatants[a].position.y-30]))
                                let direction=targetDirectionCombatant(0,this.userCombatant,this.battle.combatantManager.combatants[a])
                                for(let b=1,lb=distTargetCombatant(0,this.userCombatant,this.battle.combatantManager.combatants[a]);b<lb;b++){
                                    let index=this.battle.combatantManager.getCombatantIndex(this.userCombatant.tilePosition.x+transformDirection(0,-direction*60+90)[0]*b,this.userCombatant.tilePosition.y+transformDirection(0,-direction*60+90)[1]*b)
                                    if(index>=0){
                                        this.battle.combatantManager.combatants[index].takeDamage(this.effect[0],-1)
                                    }
                                }
                            }
                        }
                    break
                    case 88:
                        this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)].statusEffect('Cannot Move Next Turn',this.effect[0])
                    break
                    case 92:
                        this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)].statusEffect('Temporary Draw',-this.effect[0])
                    break
                    case 93:
                        this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)].statusEffect(variants.mtg?'Random Mana Next Turn':'Energy Next Turn',this.effect[0])
                    break
                    case 94:
                        this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)].statusEffect('Anti-Control',this.effect[0])
                    break
                    case 155:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            if(this.userCombatant.construct){
                                this.battle.combatantManager.summonCombatantRandom(this.userCombatant.tilePosition,findName(this.effect[1],types.combatant),this.userCombatant.team,this.userCombatant.goal.anim.direction,this.userCombatant.id)
                            }else{
                                this.battle.combatantManager.summonCombatant(this.userCombatant.tilePosition,findName(this.effect[1],types.combatant),this.userCombatant.goal.anim.direction)
                            }
                        }
                    break
                    case 186:
                        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                            if(this.battle.combatantManager.combatants[a].name==this.userCombatant.name&&this.battle.combatantManager.combatants[a].life<=0&&!this.battle.combatantManager.combatants[a].respawn){
                                this.battle.combatantManager.combatants[a].respawn=true
                                this.battle.combatantManager.summonCombatant(this.userCombatant.tilePosition,this.userCombatant.type,this.userCombatant.goal.anim.direction)
                            }
                        }
                    break
                    case 189:
                        this.battle.quickReinforceCorner(this.effect[1],this.effect[2],this.effect[0],3)
                    break
                    case 244:
                        for(let a=0,la=8;a<la;a++){
                            this.battle.tileManager.randomClearType(2)
                        }
                    break
                    case 249:
                        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                            if(this.battle.combatantManager.combatants[a].id!=this.userCombatant.id){
                                this.battle.combatantManager.combatants[a].statusEffect('Weak Next Turn',this.effect[0])
                            }
                        }
                    break
                    case 301:
                        for(let a=0,la=4;a<la;a++){
                            this.battle.tileManager.randomClearType(26)
                        }
                    break
                    case 302:
                        for(let a=0,la=8;a<la;a++){
                            this.battle.tileManager.randomClearType(25)
                        }
                    break
                    case 352:
                        this.battle.setReinforce('-h Traitor',{x:2,y:1})
                    break
                }
            break
            case 3:
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    switch(this.type){
                        case 64:
                            this.targetCombatant[a].takeDamage(this.effect[0],this.user,2)
                        break
                        case 105:
                            for(let b=0,lb=this.effect[0];b<lb;b++){
                                this.battle.drop(this.targetCombatant[a].id,findName(this.effect[1],types.card),0,game.playerNumber+1)
                            }
                        break
                        case 153:
                            this.targetCombatant[a].statusEffect('Weak Next Turn',this.effect[0])
                        break
                        case 308:
                            this.targetCombatant[a].takeDamage(this.effect[0]*(this.targetCombatant[a].getStatus('Bleed')>0?2:1),this.user)
                        break
                        case 330:
                            this.targetCombatant[a].statusEffect('Shock',this.effect[0])
                        break
                        default:
                            this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                        break
                    }
                    switch(this.type){
                        case 44:
                            if(this.targetCombatant[a].blocked>0){
                                this.targetCombatant[a].statusEffect('Bleed',this.effect[1])
                            }
                        break
                        case 53: case 60:
                            for(let b=0,lb=this.effect[1];b<lb;b++){
                                this.battle.drop(this.targetCombatant[a].id,findName(this.effect[2],types.card),0,game.playerNumber+1)
                            }
                        break
                        case 82:
                            if(this.targetCombatant[a].blocked>0){
                                for(let b=0,lb=this.effect[1];b<lb;b++){
                                    this.battle.drop(this.targetCombatant[a].id,findName(this.effect[2],types.card),0,game.playerNumber+1)
                                }
                            }
                        break
                        case 84:
                            this.targetCombatant[a].statusEffect('Weak Next Turn',this.effect[1])
                        break
                        case 114:
                            this.targetCombatant[a].statusEffect('Frail Next Turn',this.effect[1])
                        break
                        case 124:
                            this.targetCombatant[a].statusEffect(variants.mtg?'Random Mana Next Turn':'Energy Next Turn',-this.effect[1])
                        break
                        case 264: case 387:
                            this.targetCombatant[a].statusEffect('Shock',this.effect[1])
                        break
                        case 265: case 388:
                            this.targetCombatant[a].statusEffect('Burn',this.effect[1])
                        break
                        case 278:
                            if(a==0){
                                this.userCombatant.statusEffect('Decrementing Armor',this.effect[1])
                            }
                        break
                        case 288:
                            this.targetCombatant[a].statusEffect('Miss',this.effect[1])
                        break
                        case 368:
                            this.targetCombatant[a].statusEffect('Vulnerable Next Turn',this.effect[1])
                        break
                        case 379:
                            this.targetCombatant[a].statusEffect('Weak Next Turn',this.effect[1])
                            this.targetCombatant[a].statusEffect('Vulnerable Next Turn',this.effect[2])
                        break
                    }
                }
            break
            case 4:
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                switch(this.type){
                    case 50:
                        this.targetCombatant.statusEffect('Cannot Add Block Next Turn',this.effect[1])
                    break
                    case 81:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,game.playerNumber+1)
                        }
                    break
                    case 89:
                        if(this.targetCombatant.blocked>0){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,game.playerNumber+1)
                            }
                        }
                    break
                    case 140:
                        this.targetCombatant.statusEffect('Cannot Move Next Turn',this.effect[1])
                    break
                    case 141:
                        if(this.targetCombatant.id<this.battle.players){
                            this.targetCombatant.statusEffect(variants.mtg?'Random Mana Next Turn':'Energy Next Turn',-this.effect[1])
                        }
                    break
                    case 151:
                        this.targetCombatant.statusEffect('Burn',this.effect[1])
                    break
                    case 266:
                        this.targetCombatant.statusEffect('Ichor',this.effect[1])
                    break
                }
            break
            case 5:
                switch(this.type){
                    case 18:
                        this.userCombatant.statusEffect('Strength',this.effect[0])
                    break
                    case 25:
                        this.battle.combatantManager.allEffect(7,[this.effect[0]])
                    break
                    case 26:
                        this.battle.combatantManager.allEffect(3,[this.effect[0]])
                    break
                    case 43:
                        this.battle.tileManager.fireArea(0,this.effect[0],this.targetCombatant.tilePosition,this.effect[1])
                    break
                    case 46:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            if(a==0){
                                this.battle.tileManager.fireRandomTarget(0,this.effect[0],this.targetCombatant.tilePosition)
                            }else{
                                this.battle.tileManager.fireRandomSet(0,this.effect[0])
                            }
                        }
                    break
                    case 63:
                        this.battle.combatantManager.allEffect(8,[this.effect[0]])
                    break
                    case 70:
                        this.battle.combatantManager.allEffect(10,[this.effect[0],'Hexaghost Core'])
                    break
                    case 109:
                        this.userCombatant.heal(this.effect[0])
                    break
                    case 159:
                        this.userCombatant.randomStatus(this.effect[0],[0,1])
                    break
                    case 167:
                        for(let a=0,la=5;a<la;a++){
                            this.userCombatant.randomStatus(floor(random(this.effect[0],this.effect[1]+1)),[1])
                        }
                    break
                    case 169:
                        this.battle.combatantManager.allEffect(11,[this.effect[0]])
                    break
                    case 170:
                        this.battle.combatantManager.allEffect(12,[this.effect[0]])
                    break
                    case 174:
                        this.userCombatant.statusEffect('Take Half Damage',this.effect[0])
                    break
                    case 177:
                        this.userCombatant.statusEffect('Invisible',this.effect[0])
                        this.battle.updateTargetting()
                        this.battle.tileManager.activate()
                    break
                    case 197:
                        this.battle.combatantManager.allEffect(13,[this.effect[0]])
                    break
                    case 207:
                        this.userCombatant.statusEffect('Strength',this.effect[0]*(this.userCombatant.life<this.userCombatant.base.life/2?2:1))
                    break
                    case 210:
                        this.userCombatant.statusEffect('Speed Up',this.effect[0])
                    break
                    case 216:
                        this.userCombatant.loseHealth(this.effect[0])
                        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                            if(this.battle.combatantManager.combatants[a].spec.includes(2)){
                                this.battle.combatantManager.combatants[a].heal(this.effect[0])
                            }
                        }
                    break
                    case 220:
                        if(this.battle.turnManager.auxiliary){
                            this.userCombatant.statusEffect('Take Third Damage',this.effect[0])
                        }else{
                            this.userCombatant.statusEffect('Take Third Damage',this.effect[0])
                        }
                    break
                    case 228:
                        this.userCombatant.statusEffect('Counter All Combat',this.effect[0])
                    break
                    case 281:
                        this.battle.combatantManager.allEffect(7,[this.effect[0]])
                        this.battle.combatantManager.allEffect(27,[this.effect[1]])
                    break
                    case 289:
                        this.userCombatant.statusEffect('Buffer',this.effect[0])
                    break
                    case 294:
                        this.userCombatant.statusEffect('Strength',this.effect[0])
                        this.userCombatant.statusEffect('Dexterity',this.effect[1])
                    break
                    case 296:
                        this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)].takeDamage(this.effect[0],this.user)
                    break
                    case 300:
                        this.userCombatant.statusEffect('Take Third Damage',this.effect[0])
                    break
                    case 345:
                        this.userCombatant.removeAllStatuses([1,3])
                    break
                    case 349:
                        this.userCombatant.statusEffect('Intangible Next Turn',this.effect[0])
                        this.userCombatant.statusEffect('Strength',this.effect[1])
                    break
                    case 356:
                        if(this.userCombatant.sins.length>=7){
                            this.userCombatant.sins.push(this.userCombatant.sins.length)
                            this.userCombatant.infoAnim.sins.push(0)
                        }else{
                            let remaining=[0,1,2,3,4,5,6]
                            for(let a=0,la=this.userCombatant.sins.length;a<la;a++){
                                if(remaining.includes(this.userCombatant.sins[a])){
                                    remaining.splice(remaining.indexOf(this.userCombatant.sins[a]),1)
                                }
                            }
                            if(remaining.length>0){
                                let sin=remaining[floor(random(0,remaining.length))]
                                this.userCombatant.sins.push(sin)
                                this.userCombatant.infoAnim.sins.push(0)
                                this.userCombatant.addSin(sin)
                            }
                        }
                    break

                }
            break
            case 6:
                switch(this.type){
                    case 66: case 358:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,game.playerNumber+1)
                        }
                    break
                    case 103:
                        this.targetCombatant.statusEffect('Weak Next Turn',this.effect[1])
                    break
                    case 107:
                        this.userCombatant.statusEffect('Strength',this.effect[1])
                    break
                    case 194:
                        if(this.targetCombatant.blocked>0){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,game.playerNumber+1)
                            }
                        }
                    break
                    case 258:
                        this.userCombatant.addBlock(this.effect[1])
                    break
                    case 305:
                        this.targetCombatant.statusEffect('Poison',this.effect[1])
                    break
                    case 317:
                        this.userCombatant.stance=1
                    break
                    case 348:
                        this.targetCombatant.statusEffect('Vulnerable Next Turn',this.effect[1])
                        this.targetCombatant.statusEffect('Frail Next Turn',this.effect[2])
                    break
                    case 354:
                        this.targetCombatant.statusEffect('Vulnerable Next Turn',this.effect[1])
                    break
                }
            break
            case 7:
                switch(this.type){
                    case 76:
                        if(this.targetCombatant.blocked>0){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,game.playerNumber+1)
                            }
                        }
                    break
                    case 149:
                        if(this.targetCombatant.blocked>0){
                            this.targetCombatant.statusEffect('Bleed',this.effect[1])
                        }
                    break
                    case 282:
                        this.userCombatant.heal(this.effect[1])
                    break
                    case 297:
                        this.targetCombatant.statusEffect('Burn',this.effect[1])
                    break
                    case 298:
                        this.targetCombatant.statusEffect('Freeze',this.effect[1])
                    break
                    case 299:
                        this.targetCombatant.statusEffect('Shock',this.effect[1])
                    break
                    case 355:
                        this.targetCombatant.statusEffect('Frail Next Turn',this.effect[1])
                    break
                    case 370:
                        this.targetCombatant.statusEffect('Vulnerable Next Turn',this.effect[1])
                    break
                    case 371:
                        this.targetCombatant.statusEffect('Weak Next Turn',this.effect[1])
                    break
                    case 377:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,game.playerNumber+1)
                        }
                    break
                }
            break
            case 8:
                if(this.type==132){
                    for(let a=0,la=this.effect[0];a<la;a++){
                        this.battle.combatantManager.areaAbstract(4,[findName(this.effect[1],types.card),0,game.playerNumber+1],this.userCombatant.tilePosition,[3,this.userCombatant.id],[0,1],false,0)
                    }
                }else{
                    this.battle.combatantManager.areaAbstract(0,[this.effect[0],this.user,0],this.userCombatant.tilePosition,[3,this.userCombatant.id],[0,1],false,0)
                }
                switch(this.type){
                    case 17:
                        this.battle.combatantManager.areaAbstract(2,['Cannot Move Next Turn',this.effect[1]],this.userCombatant.tilePosition,[3,this.userCombatant.id],[0,1],false,0)
                    break
                    case 54:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.combatantManager.areaAbstract(4,[findName(this.effect[2],types.card),0,game.playerNumber+1],this.userCombatant.tilePosition,[5,this.userCombatant.id],[0,1],false,0)
                        }
                    break
                    case 128:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.combatantManager.areaAbstract(4,[findName(this.effect[2],types.card),0,game.playerNumber+1],this.userCombatant.tilePosition,[3,this.userCombatant.id],[0,1],false,0)
                        }
                    break
                    case 198:
                        this.battle.combatantManager.areaAbstract(5,[this.effect[1]],this.userCombatant.tilePosition,[3,this.userCombatant.id],[0,1],false,0)
                    break
                    case 215:
                        this.battle.combatantManager.areaAbstract(2,['Dissipating',this.effect[1]],this.userCombatant.tilePosition,[3,this.userCombatant.id],[0,1],false,0)
                    break
                    case 217:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.combatantManager.summonCombatant(this.targetCombatant.tilePosition,findName(this.effect[2],types.combatant),this.targetCombatant.goal.anim.direction)
                        }
                    break
                    case 255:
                        this.battle.combatantManager.areaAbstract(2,['Weak Next Turn',this.effect[1]],this.userCombatant.tilePosition,[3,this.userCombatant.id],[0,1],false,0)
                    break
                    case 256:
                        this.battle.combatantManager.areaAbstract(2,['Vulnerable Next Turn',this.effect[1]],this.userCombatant.tilePosition,[3,this.userCombatant.id],[0,1],false,0)
                    break
                }
            break
            case 9:
                switch(this.type){
                    case 310:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.randomStatusInstant(this.effect[1],[1])
                    break
                    case 312:
                        this.targetCombatant.statusEffect('Poison',this.effect[0])
                        this.targetCombatant.statusEffect('Shock',this.effect[1])
                        this.targetCombatant.statusEffect('Freeze',this.effect[2])
                        this.targetCombatant.statusEffect('Burn',this.effect[3])
                        this.targetCombatant.statusEffect('Weak Next Turn',this.effect[4])
                        this.targetCombatant.statusEffect('Vulnerable Next Turn',this.effect[5])
                        this.targetCombatant.statusEffect('Frail Next Turn',this.effect[6])
                        this.targetCombatant.statusEffect('Anti-Control',this.effect[7])
                        this.targetCombatant.statusEffect('Jinx',this.effect[8])
                    break
                    case 314:
                        let tiles314=this.battle.tileManager.getArea(this.userCombatant.tilePosition,1,1)
                        if(tiles314.length>0){
                            this.targetTile=tiles314[floor(random(0,tiles314.length))]
                            this.userCombatant.goal.anim.direction=round(atan2(this.targetTile.relativePosition.x-this.userCombatant.relativePosition.x,this.targetTile.relativePosition.y-this.userCombatant.relativePosition.y)/60-1/2)*60+30
                            this.battle.combatantManager.summonCombatantDefinite(this.targetTile.tilePosition,findName('Shotgun',types.combatant),this.userCombatant.goal.anim.direction)
                        }
                    break
                    case 315:
                        let tiles315=this.battle.tileManager.getArea(this.userCombatant.tilePosition,1,1)
                        if(tiles315.length>0){
                            this.targetTile=tiles315[floor(random(0,tiles315.length))]
                            this.userCombatant.goal.anim.direction=round(atan2(this.targetTile.relativePosition.x-this.userCombatant.relativePosition.x,this.targetTile.relativePosition.y-this.userCombatant.relativePosition.y)/60-1/2)*60+30
                            this.battle.combatantManager.summonCombatantDefinite(this.targetTile.tilePosition,findName('Repulse Turret',types.combatant),this.userCombatant.goal.anim.direction)
                        }
                    break
                }
            break
    
        }
    }
}