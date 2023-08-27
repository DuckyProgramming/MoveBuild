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

        this.procedure=[]

        this.timer=0
        this.remove=false
        this.selfRemoved=false
        this.replayed=false
        this.directive='turn'
    }
    setBase(){
        this.userCombatant=this.battle.combatantManager.combatants[this.user]
    }
    set(){
        this.setBase()
        this.position={x:this.userCombatant.position.x,y:this.userCombatant.position.y}
        this.relativePosition={x:this.userCombatant.relativePosition.x,y:this.userCombatant.relativePosition.y}
        this.tilePosition={x:this.userCombatant.tilePosition.x,y:this.userCombatant.tilePosition.y}
        if(this.userCombatant.life<=0){
            this.remove=true
        }else if(this.userCombatant.getStatus('Distracted')>0){
            this.userCombatant.statusEffect('Distracted',-1)
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
                        switch(this.type){
                            case 1: case 2: case 3: case 11: case 13: case 22: case 23: case 31: case 34: case 35:
                            case 36: case 37: case 58: case 97: case 101: case 103: case 113: case 116: case 121: case 122:
                            case 212: case 226: case 227: case 229:
                                this.target=[[this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]]]
                            break
                            case 6: case 7: case 8: case 14: case 15: case 19: case 20: case 24: case 27: case 30:
                            case 32: case 33: case 61: case 62: case 66: case 67: case 76: case 77: case 96: case 99:
                            case 107: case 112: case 138: case 139: case 149: case 156: case 183: case 203: case 211: case 223:
                            case 224:
                                this.target=[
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*2]
                                ]
                            break
                            case 71: case 73: case 79: case 143: case 172: case 175:
                                this.target=[
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*2],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*3]
                                ]
                            break
                            case 100:
                                this.target=[
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*2],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*3],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*4,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*4]
                                ]
                            break
                            case 9: case 60: case 64: case 69: case 82: case 84: case 95: case 104: case 114: case 124:
                            case 153:
                                this.target=[
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]]
                                ]
                            break
                            case 12: case 38: case 45: case 47: case 50: case 59: case 80: case 81: case 83: case 89:
                            case 90: case 91: case 98: case 106: case 115: case 118: case 119: case 123: case 125: case 129:
                            case 130: case 134: case 140: case 141: case 144: case 145: case 148: case 151: case 152: case 158:
                            case 160: case 161: case 162: case 165: case 173: case 178: case 179: case 180: case 184: case 188:
                            case 191: case 193: case 194: case 196: case 199: case 200: case 201: case 202: case 206: case 208:
                            case 235: case 236:
                                this.target=[
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*2],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*3],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*4,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*4],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*5,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*5],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*6,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*6]
                                ]
                            break
                            case 16: case 17: case 54: case 87: case 120: case 128: case 132: case 133: case 136: case 142:
                            case 147: case 157: case 198: case 213: case 215: case 217:
                                this.target=[
                                    [this.userCombatant.tilePosition.x+transformDirection(0,-150)[0],this.userCombatant.tilePosition.y+transformDirection(0,-150)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,-90)[0],this.userCombatant.tilePosition.y+transformDirection(0,-90)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,-30)[0],this.userCombatant.tilePosition.y+transformDirection(0,-30)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,30)[0],this.userCombatant.tilePosition.y+transformDirection(0,30)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,90)[0],this.userCombatant.tilePosition.y+transformDirection(0,90)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,150)[0],this.userCombatant.tilePosition.y+transformDirection(0,150)[1]]
                                ]
                            break
                            case 28: case 44: case 53: case 105: case 146: case 168: case 171:
                                this.target=[
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*2],
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
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*2],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*3],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*4,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*4],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*5,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*5],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*6,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*6],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0]+transformDirection(0,this.userCombatant.goal.anim.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]+transformDirection(0,this.userCombatant.goal.anim.direction)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0]+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*2],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0]+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*3],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0]+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*4,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*4],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0]+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*5,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*5],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]+transformDirection(0,this.userCombatant.goal.anim.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]+transformDirection(0,this.userCombatant.goal.anim.direction)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*2],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*3],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*4,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*4],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*5,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*5]
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
                            case 85: case 86:
                                this.target=[
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*2],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]]
                                ]
                            break
                            case 127: case 150: case 181:
                                this.targetIndex=[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*2)]
                            break
                            case 131: case 195: case 205:
                                this.target=[
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*2],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*3],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*4,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*4],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*5,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*5],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*6,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*6],
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
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*2],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]]
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
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-120)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-120)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+120)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+120)[1]]
                                ]
                            break
                            case 209:
                                this.targetIndex=[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1])]
                            break
                            case 214:
                                this.target=[
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*2]
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
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*2],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*3]
                                ]
                            break
                            case 222:
                                this.target=[
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*2],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]*2],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]*2],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*3],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]*3],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]*3,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]*3],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]*2],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0]*2,this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]*2],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*2+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*2+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]],
                                    [this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction)[0]*2+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction)[1]*2+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]]
                                ]
                            break
                            default:
                                this.target=[0]
                            break

                        }
                        if(this.type!=127&&this.type!=150&&this.type!=181&&this.type!=209){
                            this.targetTile=[]
                            for(let a=0,la=this.target.length;a<la;a++){
                                this.targetIndex.push(this.battle.combatantManager.getCombatantIndex(this.target[a][0],this.target[a][1]))
                                this.targetTile.push(this.battle.tileManager.getTileIndex(this.target[a][0],this.target[a][1]))
                            }
                        }
                        if(this.type==117||this.type==135||this.type==154||this.type==162||this.type==175){
                            this.direction=this.userCombatant.goal.anim.direction
                        }else if(this.type==127||this.type==150||this.type==181||this.type==209){
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
                        }else if(this.type==9||this.type==28||this.type==44||this.type==53||this.type==60||this.type==64||this.type==69||this.type==82||this.type==85||this.type==86||
                            this.type==87||this.type==95||this.type==104||this.type==105||this.type==114||this.type==120||this.type==124||this.type==142||this.type==146||this.type==153||
                            this.type==157||this.type==166||this.type==168||this.type==171||this.type==176||this.type==192||this.type==204||this.type==213||this.type==222||this.type==223||
                            this.type==224){
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
                                    if(!((abs(this.userCombatant.goal.anim.direction-targetCombatant+180)<10||abs(this.userCombatant.goal.anim.direction-targetCombatant-180)<10)&&this.targetCombatant.getStatus('Untargettable From Front')>0)){
                                        this.targetCombatant.push(targetCombatant)

                                        this.direction.push(atan2(targetCombatant.position.x-this.position.x,targetCombatant.position.y-this.position.y))
                                        this.distance.push(sqrt((targetCombatant.position.x-this.position.x)**2+(targetCombatant.position.y-this.position.y)**2))

                                        this.relativeDirection.push(atan2(targetCombatant.relativePosition.x-this.relativePosition.x,targetCombatant.relativePosition.y-this.relativePosition.y))
                                        this.relativeDistance.push(sqrt((targetCombatant.relativePosition.x-this.relativePosition.x)**2+(targetCombatant.relativePosition.y-this.relativePosition.y)**2))

                                        this.targetDistance.push(distTargetCombatant(0,this.userCombatant,targetCombatant))
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
                                    if(!((abs(this.userCombatant.goal.anim.direction-this.targetCombatant+180)<10||abs(this.userCombatant.goal.anim.direction-this.targetCombatant-180)<10)&&this.targetCombatant.getStatus('Untargettable From Front')>0)){
                                        this.direction=atan2(targetCombatant.position.x-this.position.x,targetCombatant.position.y-this.position.y)
                                    }
                                }
                            }
                        }else{
                            this.targetCombatant=-1
                            for(let a=0,la=this.targetIndex.length;a<la;a++){
                                let fail=false
                                switch(this.type){
                                    case 6: case 7: case 8: case 14: case 15: case 19: case 20: case 24: case 27: case 30:
                                    case 32: case 33: case 61: case 62: case 66: case 67: case 76: case 77: case 96: case 99:
                                    case 107: case 112: case 140: case 156: case 183: case 203: case 211:
                                        if(a==1&&this.targetTile[0]<0){
                                            fail=true
                                        }
                                    break
                                    case 71: case 73: case 79: case 172:
                                        if(
                                            (a>=1&&this.targetTile[0]<0)||
                                            (a>=2&&this.targetTile[1]<0)){
                                                fail=true
                                        }
                                    break
                                    case 100:
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
                                    case 202: case 206: case 208: case 235: case 236:
                                        if(
                                            (a>=1&&this.targetTile[0]<0)||
                                            (a>=2&&this.targetTile[1]<0)||
                                            (a>=3&&this.targetTile[2]<0)||
                                            (a>=4&&this.targetTile[3]<0)||
                                            (a>=5&&this.targetTile[4]<0)){
                                                fail=true
                                        }
                                    break
                                    case 49: case 164: case 185: case 205: case 219:
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
                    switch(this.type){
                        case 0: case 4:
                            let works=true
                            if(this.setTarget!=-1){
                                this.targetCombatant=this.setTarget
                            }else{
                                this.target=[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)]
                                this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                                if(this.target[0]<0||this.target[0]>=this.battle.combatantManager.combatants.length){
                                    works=false
                                }
                            }
                            if(works){
                                this.direction=round(atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)/60-random(0.4,0.6))*60+30
                                if(this.type==4){
                                    this.direction+=round(random(-2,2))*60
                                }
                                this.target=[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.direction)[1])]
                                let fail=false
                                if(this.target[0]==-1){
                                    fail=true
                                }else{
                                    this.targetTile=this.battle.tileManager.tiles[this.target[0]]
                                    if(this.targetTile.occupied>0){
                                        fail=true
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
                                            fail=true
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
                                                fail=true
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
                                                    fail=true
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
                                                        fail=true
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
                                this.userCombatant.goal.anim.direction=this.relativeDirection
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
                            this.target=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)].tilePosition
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
                                if(distTarget(0,this.battle.tileManager.tiles[a].tilePosition.x-this.target.x,this.battle.tileManager.tiles[a].tilePosition.y-this.target.y)==1){
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
                                if(distTarget(0,this.battle.tileManager.tiles[a].tilePosition.x-this.target.x,this.battle.tileManager.tiles[a].tilePosition.y-this.target.y)>0){
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
                        
                    }
                    if(!this.remove&&this.targetTile!=-1){
                        this.targetDistance=distTargetCombatant(0,this,this.targetTile)
                    }
                break
                case 2: case 4:
                    let works=true
                    if(this.userCombatant.getStatus('Confusion')>0){
                        this.userCombatant.status.main[findList('Confusion',this.userCombatant.status.name)]--
                        this.userCombatant.goal.anim.direction=-30+60*floor(random(0,6))
                        works=false
                    }
                    if(this.userCombatant.getStatus('Jagged Bleed')>0){
                        this.userCombatant.status.main[findList('Jagged Bleed',this.userCombatant.status.name)]--
                        this.userCombatant.goal.anim.direction+=floor(random(-1,2))*60
                        works=false
                    }
                    if(works){
                        this.target=[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)]
                        this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                        this.userCombatant.goal.anim.direction=round(atan2(this.targetCombatant.relativePosition.x-this.userCombatant.relativePosition.x,this.targetCombatant.relativePosition.y-this.userCombatant.relativePosition.y)/60-1/2)*60+30
                        let target=this.userCombatant.getTarget()[0]
                        if(target>=0&&!(this.battle.tileManager.tiles[target].tilePosition.x==this.targetCombatant.tilePosition.x&&this.battle.tileManager.tiles[target].tilePosition.y==this.targetCombatant.tilePosition.y)&&this.battle.tileManager.tiles[target].occupied>0&&floor(random(0,2)==0)){
                            let remember=this.userCombatant.goal.anim.direction
                            this.userCombatant.goal.anim.direction+=(floor(random(0,2))*2-1)*60
                            if(!(this.battle.tileManager.tiles[target].tilePosition.x==this.targetCombatant.tilePosition.x&&this.battle.tileManager.tiles[target].tilePosition.y==this.targetCombatant.tilePosition.y)&&this.battle.tileManager.tiles[target].occupied>0){
                                this.userCombatant.goal.anim.direction=remember
                            }else{
                                this.battle.activateCombatant(2,this.type==4?this.userCombatant.id:this.userCombatant.target)
                            }
                        }else{
                            this.battle.activateCombatant(2,this.type==4?this.userCombatant.id:this.userCombatant.target)
                        }
                    }
                    this.remove=true
                    this.selfRemoved=true
                break
                case 3:
                    let works2=true
                    if(this.userCombatant.getStatus('Confusion')>0){
                        this.userCombatant.status.main[findList('Confusion',this.userCombatant.status.name)]--
                        this.userCombatant.goal.anim.direction=-30+60*floor(random(0,6))
                        works2=false
                    }
                    if(this.userCombatant.getStatus('Jagged Bleed')>0){
                        this.userCombatant.status.main[findList('Jagged Bleed',this.userCombatant.status.name)]--
                        this.userCombatant.goal.anim.direction+=floor(random(-1,2))*60
                        works2=false
                    }
                    if(works2){
                        if(this.userCombatant.team==0){
                            this.target=[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)]
                        }
                        this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                        this.userCombatant.goal.anim.direction=round(atan2(this.targetCombatant.relativePosition.x-this.userCombatant.relativePosition.x,this.targetCombatant.relativePosition.y-this.userCombatant.relativePosition.y)/60-1/2)*60+30
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
    update(){
        this.timer++
        switch(this.action){
            case 0:
                switch(this.type){
                    case 1: case 6: case 8: case 13: case 14: case 15: case 22: case 23: case 24: case 27:
                    case 30: case 32: case 33: case 36: case 37: case 38: case 58: case 61: case 62: case 67:
                    case 79: case 83: case 100: case 112: case 113: case 152: case 172: case 178: case 183: case 193:
                    case 205: case 214: case 229:
                        if(this.type==205&&this.timer==1){
                            this.userCombatant.goal.anim.direction=this.relativeDirection
                        }
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
                                case 8:
                                    for(let a=0,la=this.effect[0];a<la;a++){
                                        this.battle.drop(this.targetCombatant.id,findName(this.effect[1],types.card),0,game.playerNumber+1)
                                    }
                                break
                                case 23: case 33: case 152:
                                    this.targetCombatant.statusEffect('Weak',this.effect[0])
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
                                    this.targetCombatant.statusEffect('Frail',this.effect[0])
                                break
                                case 62:
                                    this.targetCombatant.statusEffect('Vulnerable',this.effect[0])
                                break
                                case 172:
                                    this.targetCombatant.takeDamage(this.effect[0]/100*this.targetCombatant.life,this.user)
                                break
                                case 229:
                                    this.targetCombatant.statusEffect('Take Per Turn',this.effect[0])
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
                                case 15:
                                    this.targetCombatant.statusEffect('Weak',this.effect[1])
                                break
                                case 22: case 32: case 83:
                                    for(let a=0,la=this.effect[1];a<la;a++){
                                        this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,game.playerNumber+1)
                                    }
                                break
                                case 24:
                                    if(this.targetCombatant.blocked>0){
                                        this.targetCombatant.statusEffect('Bleed',this.effect[1])
                                    }
                                break
                                case 27:
                                    this.targetCombatant.statusEffect('Frail',this.effect[1])
                                break
                                case 30:
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
                                case 193:
                                    this.targetCombatant.statusEffect('Cannot Gain Block Next Turn',this.effect[1])
                                break
                            }
                        }else if(this.timer>=15*this.targetDistance+15){
                            if(this.targetDistance>1){
                                this.battle.activate(1,this.userCombatant.id)
                            }
                            this.remove=true
                        }
                    break
                    case 20: case 31: case 59: case 66: case 99: case 103: case 107: case 194:
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
                                    case 66:
                                        for(let a=0,la=this.effect[1];a<la;a++){
                                            this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,game.playerNumber+1)
                                        }
                                    break
                                    case 103:
                                        this.targetCombatant.statusEffect('Weak',this.effect[1])
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
                                }
                            }
                        }else if(this.timer>=15*this.targetDistance+15){
                            if(this.targetDistance>1){
                                this.battle.activate(1,this.userCombatant.id)
                            }
                            this.remove=true
                        }
                    break
                    case 2: case 19: case 34: case 45: case 76: case 149:
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
                            if(this.timer==15*this.targetDistance-5){
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
                                }
                            }
                        }else if(this.timer>=15*this.targetDistance+15){
                            if(this.targetDistance>1){
                                this.battle.activate(1,this.userCombatant.id)
                            }
                            this.remove=true
                        }
                    break
                    case 77: case 101:
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
                            this.userCombatant.runAnimation(1/12,2)
                        }else{
                            this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                            this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                            this.userCombatant.runAnimation(1/6,0)
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
                    case 3: case 7: case 35: case 98: case 196:
                        if(this.timer==1&&this.targetDistance>1){
                            this.userCombatant.startAnimation(0)
                        }else if(this.timer==15*this.targetDistance-14){
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
                    case 4: case 10: case 29: case 48: case 65: case 72: case 102: case 108: case 110: case 111:
                    case 126: case 182: case 190: case 230: case 231: case 232: case 234: case 237: case 238: case 239:
                    case 240: case 241:
                        if(this.timer==1){
                            this.userCombatant.startAnimation(1)
                        }
                        this.userCombatant.runAnimation(1/30,1)
                        if(this.timer==15){
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
                                    this.battle.combatantManager.combatants[this.userCombatant.builder].statusEffect('Block Next Turn',this.effect[0])
                                break
                                case 231:
                                    this.battle.cardManagers[this.battle.combatantManager.combatants[this.userCombatant.builder].id].draw(this.effect[0])
                                break
                                case 232:
                                    this.battle.combatantManager.combatants[this.userCombatant.builder].statusEffectNext('Temporary Strength',this.effect[0])
                                break
                                case 234:
                                    for(let a=0,la=this.effect[0];a<la;a++){
                                        this.battle.cardManagers[this.battle.combatantManager.combatants[this.userCombatant.builder].id].hand.add(findName('Revolver',types.card),0,0)
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
                                            this.userCombatant.statusEffect('Counter Combat Turn',this.effect[1])
                                        break
                                        case 110:
                                            this.userCombatant.statusEffect('Retain Block',1)
                                            this.userCombatant.statusEffect('Counter Combat Turn',this.effect[1])
                                        break
                                        case 182:
                                            this.userCombatant.statusEffect('Retain Block',6)
                                        break
                                        case 190:
                                            this.userCombatant.statusEffect('Armor',this.effect[1])
                                            this.userCombatant.statusEffect('Strength',this.effect[2])
                                        break
                                    }
                                break
                            }
                        }else if(this.timer>=30){
                            this.remove=true
                        }
                    break
                    case 5: case 39: case 40: case 41: case 42: case 51: case 52: case 56: case 57: case 74:
                    case 75: case 78: case 88: case 92: case 93: case 94: case 155: case 186: case 189:
                        if(this.userCombatant.name=='General Duckion'||
                        this.type!=39&&this.type!=56&&this.type!=74&&this.type!=75&&this.type!=78&&this.type!=92&&this.type!=93&&this.type!=94&&this.type!=155&&this.type!=186&&
                        this.type!=189){
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
                                    this.battle.tileManager.spawnAmountDouble(this.effect[0],this.userCombatant.tilePosition,6)
                                break
                                case 56:
                                    for(let a=0,la=this.effect[0];a<la;a++){
                                        this.battle.combatantManager.summonCombatant(this.userCombatant.tilePosition,findName('Shield Particle',types.combatant),this.userCombatant.goal.anim.direction)
                                    }
                                break
                                case 57:
                                    let amount=this.battle.combatantManager.killAll('Shield Particle')
                                    this.userCombatant.addBlock(amount)
                                break
                                case 74:
                                    this.battle.cardManagers.forEach(cardManager=>cardManager.allGroupEffect(9))
                                    for(let a=0,la=this.effect[0];a<la;a++){
                                        this.battle.dropAll(findName(this.effect[1],types.card),0,game.playerNumber+1)
                                    }
                                break
                                case 75:
                                    this.battle.tileManager.allEffect(0,[7])
                                break
                                case 78:
                                    for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                                        if(legalTargetCombatant(2,1,6,this.userCombatant,this.battle.combatantManager.combatants[a],this.battle.tileManager.tiles)&&this.battle.combatantManager.combatants[a].name==this.userCombatant.name&&distTargetCombatant(0,this.userCombatant,this.battle.combatantManager.combatants[a])>1){
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
                                    this.battle.energy.temp[this.userCombatant.target]-=this.effect[0]
                                break
                                case 94:
                                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.userCombatant.target)].statusEffect('Anti-Control',this.effect[0])
                                break
                                case 155:
                                    for(let a=0,la=this.effect[0];a<la;a++){
                                        this.battle.combatantManager.summonCombatant(this.userCombatant.tilePosition,findName(this.effect[1],types.combatant),this.userCombatant.goal.anim.direction)
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
                            }
                            this.remove=true
                        }
                    break
                    case 9: case 28: case 44: case 53: case 60: case 64: case 82: case 84: case 85: case 105:
                    case 114: case 124: case 153: case 204:
                        if(this.timer==1){
                            this.userCombatant.startAnimation(4)
                        }
                        this.userCombatant.runAnimation(1/30,4)
                        if(this.timer==15){
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
                                        this.targetCombatant[a].statusEffect('Weak',this.effect[0])
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
                                        this.targetCombatant[a].statusEffect('Weak',this.effect[1])
                                    break
                                    case 114:
                                        this.targetCombatant[a].statusEffect('Frail',this.effect[1])
                                    break
                                    case 124:
                                        if(this.targetCombatant[a].id<this.battle.players){
                                            this.battle.energy.temp[this.userCombatant.target]-=this.effect[1]
                                        }
                                    break
                                }
                            }
                        }else if(this.timer>=30){
                            this.remove=true
                        }
                    break
                    case 12: case 50: case 81: case 89: case 140: case 141: case 151:
                        if(this.timer==1){
                            this.userCombatant.startAnimation(5)
                        }
                        if(this.timer<=10||this.timer>20&&this.timer<=30){
                            this.userCombatant.runAnimation(1/10,5)
                        }
                        if(this.timer==15){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),2.5*this.targetDistance-1]))
                        }else if(this.timer==5*this.targetDistance+15){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            switch(this.type){
                                case 50:
                                    this.targetCombatant.statusEffect('Cannot Gain Block Next Turn',this.effect[1])
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
                                        this.targetCombatant.statusEffect('Energy Next Turn',-this.effect[1])
                                    }
                                break
                                case 151:
                                    this.targetCombatant.statusEffect('Burn',this.effect[1])
                                break
                            }
                        }else if(this.timer>=max(30,5*this.targetDistance+25)){
                            this.remove=true
                        }
                    break
                    case 16: case 17: case 54: case 128: case 132: case 198: case 215: case 217:
                        if(this.timer==1){
                            this.userCombatant.startAnimation(6)
                        }
                        this.userCombatant.runAnimation(1/10,6)
                        if(this.timer==10){
                            if(this.type==132){
                                for(let a=0,la=this.effect[0];a<la;a++){
                                    this.battle.combatantManager.dropAreaID(0,findName(this.effect[1],types.card),0,game.playerNumber+1,this.userCombatant.id,this.userCombatant.tilePosition)
                                }
                            }else{
                                this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
                            }
                            switch(this.type){
                                case 17:
                                    this.battle.combatantManager.statusAreaID('Cannot Move Next Turn',this.effect[1],this.userCombatant.id,this.userCombatant.tilePosition)
                                break
                                case 54:
                                    for(let a=0,la=this.effect[1];a<la;a++){
                                        this.battle.combatantManager.dropAreaID(0,findName(this.effect[2],types.card),0,game.playerNumber+1,this.userCombatant.id,this.userCombatant.tilePosition)
                                    }
                                break
                                case 128:
                                    for(let a=0,la=this.effect[1];a<la;a++){
                                        this.battle.combatantManager.dropAreaID(1,findName(this.effect[2],types.card),0,game.playerNumber+1,this.userCombatant.id,this.userCombatant.tilePosition)
                                    }
                                break
                                case 198:
                                    this.battle.combatantManager.energyDownAreaID(this.effect[1],this.userCombatant.id,this.userCombatant.tilePosition)
                                break
                                case 215:
                                    this.battle.combatantManager.statusAreaID('Dissipating',this.effect[1],this.userCombatant.id,this.userCombatant.tilePosition)
                                break
                                case 217:
                                    for(let a=0,la=this.effect[1];a<la;a++){
                                        this.battle.combatantManager.summonCombatant(this.targetCombatant.tilePosition,findName(this.effect[2],types.combatant),this.targetCombatant.goal.anim.direction)
                                    }
                                break
                            }
                        }else if(this.timer>=20){
                            this.remove=true
                        }
                    break
                    case 18: case 25: case 26: case 43: case 46: case 63: case 70: case 109: case 159: case 167:
                    case 169: case 170: case 174: case 177: case 197: case 207: case 210: case 216: case 220: case 228:
                        if(this.timer==1){
                            this.userCombatant.startAnimation(7)
                        }
                        this.userCombatant.runAnimation(1/15,7)
                        if(this.timer>=15){
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
                                    this.userCombatant.statusEffectNext('Take Half Damage',this.effect[0])
                                break
                                case 177:
                                    this.userCombatant.statusEffect('Invisible',this.effect[0])
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
                                    this.userCombatant.life-=this.effect[0]
                                    for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                                        if(this.battle.combatantManager.combatants[a].spec.includes(2)){
                                            this.battle.combatantManager.combatants[a].heal(this.effect[0])
                                        }
                                    }
                                break
                                case 220:
                                    this.userCombatant.statusEffectNext('Take Third Damage',this.effect[0])
                                break
                                case 228:
                                    this.userCombatant.statusEffect('Counter All Combat',this.effect[0])
                                break

                            }
                            this.remove=true
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
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),2.5*this.targetDistance-1]))
                        }
                        if(this.timer==5*this.targetDistance+15||this.timer==5*this.targetDistance+20){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            if(this.timer==5*this.targetDistance+20){
                                switch(this.type){
                                    case 89:
                                        if(this.targetCombatant.blocked>0){
                                            for(let a=0,la=this.effect[1];a<la;a++){
                                                this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,game.playerNumber+1)
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
                            try{
                                this.procedure[0]=distTargetCombatant(0,this.userCombatant,this.targetCombatant)>=0?0:distTargetCombatant(0,{tilePosition:{x:this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],y:this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]}},this.targetCombatant)>=0?1:distTargetCombatant(0,{tilePosition:{x:this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],y:this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]}},this.targetCombatant)>=0?2:3
                            }catch(error){
                                panic('ERROR CASE 49/164 CATCH')
                                this.procedure[0]=3
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
                                this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),2.5*this.targetDistance-1]))
                            }else if(this.timer==5*this.targetDistance+15){
                                this.targetCombatant.takeDamage(this.effect[0],this.user)
                                if(this.type==164){
                                    for(let a=0,la=this.effect[1];a<la;a++){
                                        this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,game.playerNumber+1)
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
                                this.battle.activateTile(1,this.userCombatant.id)
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
                                this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),2.5*this.targetDistance-1]))
                            }else if(this.timer==5*this.targetDistance+30){
                                this.targetCombatant.takeDamage(this.effect[0],this.user)
                                if(this.type==164){
                                    for(let a=0,la=this.effect[1];a<la;a++){
                                        this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,game.playerNumber+1)
                                    }
                                }
                            }else if(this.timer>=max(45,5*this.targetDistance+40)){
                                this.remove=true
                            }
                        }else{
                            this.remove=true
                        }
                    break
                    case 55:
                        if(this.timer==1){
                            this.userCombatant.startAnimation(6)
                        }
                        this.userCombatant.runAnimation(1/10,6)
                        if(this.timer==10){
                            this.battle.combatantManager.statusAreaID2('Weak',this.effect[0],this.userCombatant.id,this.userCombatant.tilePosition)
                        }else if(this.timer>=20){
                            this.remove=true
                        }
                    break
                    case 68:
                        if(this.timer==1){
                            this.userCombatant.startAnimation(0)
                        }
                        this.userCombatant.runAnimation(1/10,0)
                        if(this.timer>=30){
                            this.userCombatant.status.main[42]=0
                            this.userCombatant.life=0
                            this.remove=true
                        }
                    break
                    case 69: case 168: case 171:
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
                                            if(this.targetCombatant[a].blocked>0){
                                                this.targetCombatant[a].statusEffect('Bleed',this.effect[1])
                                            }
                                        break
                                    }
                                }
                            }
                        }else if(this.timer>=30){
                            this.remove=true
                        }
                    break
                    case 71: case 73:
                        if(this.timer==1){
                            this.userCombatant.startAnimation(5)
                        }
                        if(this.timer<=10||this.timer>20&&this.timer<=30){
                            this.userCombatant.runAnimation(1/20,5)
                        }
                        if(this.timer==15){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-30,11,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y-30),2.5*this.targetDistance-1]))
                        }else if(this.timer==5*this.targetDistance+15){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            if(this.type==73){
                                for(let a=0,la=this.effect[1];a<la;a++){
                                    this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,game.playerNumber+1)
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
                                        this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,game.playerNumber+1)
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
                                            this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,game.playerNumber+1)
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
                                this.procedure[a]=this.targetCombatant[a].getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                                        this.battle.drop(this.targetCombatant[a].id,findName(this.effect[2],types.card),0,game.playerNumber+1)
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
                    case 90: case 91:
                        if(this.timer==1){
                            let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.targetCombatant.tilePosition.y+transformDirection(0,this.direction)[1])
                            this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                            this.userCombatant.startAnimation(5)
                        }
                        if(this.timer<=10||this.timer>20&&this.timer<=30){
                            this.userCombatant.runAnimation(1/10,5)
                        }
                        if(this.timer==15){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),2.5*this.targetDistance-1]))
                        }else if(this.timer==5*this.targetDistance+15){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            if(this.type==91){
                                for(let a=0,la=this.effect[1];a<la;a++){
                                    this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,game.playerNumber+1)
                                }
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
                            this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                    case 104:
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
                    case 106:
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
                    case 117: case 135: case 154: case 175: case 195:
                        if(this.timer==1){
                            this.procedure[0]=0
                            if(this.type==175){
                                this.userCombatant.startAnimation(0)
                            }
                        }
                        if(this.timer==1+10*this.procedure[0]){
                            this.target=[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.direction)[1]),
                            this.battle.combatantManager.getCombatantIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.direction)[1])]
                            if(this.target[0]<0){
                                if(this.procedure[0]>0){
                                    this.battle.activateTile(1,this.userCombatant.id)
                                }
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
                            if(this.type==175){
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
                                this.targetCombatant.takeDamage(this.effect[0],this.user)
                                switch(this.type){
                                    case 135:
                                        for(let a=0,la=this.effect[1];a<la;a++){
                                            this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,game.playerNumber+1)
                                        }
                                    break
                                    case 154:
                                        this.targetCombatant.statusEffect('Poison',this.effect[1])
                                    break
                                }
                                this.targetCombatant.moveTilePosition(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)
                                this.battle.activateTile(1,this.targetCombatant.id)
                            }
                            if(this.type==154&&this.target[0]>=0){
                                this.targetTile.addType(10)
                            }
                            this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                            if(this.procedure[0]>=2&&this.type==175){
                                this.remove=true
                            }
                            this.procedure[0]++
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
                    case 121:
                        if(this.timer==1&&this.targetDistance>1){
                            this.userCombatant.startAnimation(0)
                        }else if(this.timer==15*this.targetDistance-14){
                            let offset=transformDirection(0,this.relativeDirection-60)
                            let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                            this.procedure[1]=atan2(sin(this.relativeDirection-60)*6/5,cos(this.relativeDirection-60)/sqrt(3))
                            this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                    case 122:
                        if(this.timer==1&&this.targetDistance>1){
                            this.userCombatant.startAnimation(0)
                        }else if(this.timer==15*this.targetDistance-14){
                            let offset=transformDirection(0,this.relativeDirection+60)
                            let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                            this.procedure[1]=atan2(sin(this.relativeDirection+60)*6/5,cos(this.relativeDirection+60)/sqrt(3))
                            this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                            this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                            this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                        }else if(this.timer==10*this.targetDistance+15&&this.targetCombatant.block<=0){
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
                    case 127: case 150: case 181: case 209:
                        if(this.timer==1){
                            this.userCombatant.startAnimation(5)
                        }
                        if(this.timer<=30){
                            this.userCombatant.runAnimation(1/15,5)
                        }
                        if(this.timer==15){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,7,[atan2(this.targetTile.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetTile.position.y),5*this.targetDistance-2]))
                        }else if(this.timer==10*this.targetDistance+15){
                            this.battle.combatantManager.damageArea(this.effect[0],this.userCombatant.id,-1,this.targetTile.tilePosition)
                            switch(this.type){
                                case 150:
                                    this.battle.combatantManager.randomEffectArea(this.effect[1],11,[],-1,this.targetTile.tilePosition)
                                break
                                case 181:
                                    for(let a=0,la=this.effect[1];a<la;a++){
                                        this.battle.combatantManager.dropAreaID(1,findName(this.effect[2],types.card),0,game.playerNumber+1,this.userCombatant.id,this.userCombatant.tilePosition)
                                    }
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
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),2.5*this.targetDistance-1]))
                        }
                        if(this.timer==5*this.targetDistance+15||this.timer==5*this.targetDistance+18||this.timer==5*this.targetDistance+21||this.timer==5*this.targetDistance+24||this.timer==5*this.targetDistance+27){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }else if(this.timer>=max(40,5*this.targetDistance+40)){
                            this.remove=true
                        }
                    break
                    case 130:
                        if(this.timer==10){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-30,11,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y-30),2.5*this.targetDistance-1]))
                        }
                        if(this.timer==1){
                            let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*(1+1/this.targetDistance)-this.userCombatant.tilePosition.x/this.targetDistance,this.targetCombatant.tilePosition.y*(1+1/this.targetDistance)-this.userCombatant.tilePosition.y/this.targetDistance)
                            this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                    case 131:
                        if(this.timer==10){
                            this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-48,15,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }else if(this.timer>=20){
                            this.remove=true
                        }
                    break
                    case 133:
                        if(this.timer==1){
                            this.userCombatant.startAnimation(6)
                        }
                        this.userCombatant.runAnimation(1/5,6)
                        if(this.timer==5||this.timer==15){
                            this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
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
                                this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,16,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),2.5*this.targetDistance-1]))
                            }else if(this.timer==5*this.targetDistance+15){
                                this.battle.combatantManager.damageArea(this.effect[0],this.userCombatant.id,-1,this.targetCombatant.tilePosition)
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
                            this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
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
                                this.procedure[a]=this.targetCombatant[a].getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                            this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                                this.procedure[1]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,18,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),2.5*this.targetDistance-1]))
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
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,19,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),2.5*this.targetDistance-1]))
                        }else if(this.timer==5*this.targetDistance+15){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            if(this.targetCombatant.blocked>0){
                                for(let a=0,la=this.effect[1];a<la;a++){
                                    this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,game.playerNumber+1)
                                }
                            }
                        }else if(this.timer>=max(30,5*this.targetDistance+25)){
                            this.remove=true
                        }
                    break
                    case 147:
                        if(this.timer==1){
                            this.userCombatant.startAnimation(6)
                        }
                        this.userCombatant.runAnimation(3/10,6)
                        if(this.timer==4||this.timer==10||this.timer==16){
                            this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
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
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,20,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),2.5*this.targetDistance-1]))
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
                            if(this.timer<=60){
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
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,21,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),2.5*this.targetDistance-1]))
                        }else if(this.timer==5*this.targetDistance+15){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            if(this.targetCombatant.id<this.battle.players){
                                this.battle.cardManagers[this.targetCombatant.id].randomEffect(1,12,[this.battle.cardManagers[this.targetCombatant.id].discard.cards])
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
                                    this.battle.activateTile(1,this.userCombatant.id)
                                }
                                this.battle.turnManager.unMoveTurn(this.user)
                                this.remove=true
                                this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y,23,[20]))
                                this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
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
                    case 163: case 187:
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
                                    this.procedure[a]=this.targetCombatant[a].getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                                        this.battle.drop(this.targetCombatant[a].id,findName(this.effect[2],types.card),0,game.playerNumber+1)
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
                            if(this.timer<=15*this.targetDistance-20||this.timer>15*this.targetDistance-10&&this.timer<=30*this.targetDistance-30){
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
                            if(this.timer>15*this.targetDistance-5&&this.timer<=30*this.targetDistance-30){
                                this.targetCombatant.moveTile(this.direction,-this.distance/10/this.targetDistance)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10/this.targetDistance)
                            }
                            if(this.timer==30*this.targetDistance-29){
                                this.targetCombatant.moveTilePosition(round(this.userCombatant.tilePosition.x*(1-1/this.targetDistance)+this.targetCombatant.tilePosition.x/this.targetDistance),round(this.userCombatant.tilePosition.y*(1-1/this.targetDistance)+this.targetCombatant.tilePosition.y/this.targetDistance))
                                this.battle.activate(1,this.targetCombatant.id)
                                this.userCombatant.startAnimation(0)
                                this.userCombatant.runAnimation(1/10,0)
                                this.userCombatant.startAnimation(2)
                            }
                            if(this.timer>=30*this.targetDistance-30&&this.timer<=30*this.targetDistance){
                                this.userCombatant.runAnimation(1/30,2)
                            }
                            if(this.timer==30*this.targetDistance-15){
                                this.targetCombatant.takeDamage(this.effect[0],this.user)
                                this.battle.activate(1,this.userCombatant.id)
                            }else if(this.timer>=30*this.targetDistance){
                                this.remove=true
                            }
                        }
                    break
                    case 185:
                        if(this.timer==1){
                            this.procedure[0]=distTargetCombatant(0,this.userCombatant,this.targetCombatant)>=0?0:distTargetCombatant(0,{tilePosition:{x:this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction-60)[0],y:this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction-60)[1]}},this.targetCombatant)>=0?1:distTargetCombatant(0,{tilePosition:{x:this.userCombatant.tilePosition.x+transformDirection(0,this.userCombatant.goal.anim.direction+60)[0],y:this.userCombatant.tilePosition.y+transformDirection(0,this.userCombatant.goal.anim.direction+60)[1]}},this.targetCombatant)>=0?2:3
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
                                this.battle.activateTile(1,this.userCombatant.id)
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
                            this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-100,26,[this.targetCombatant.position.x+random(-10,10),this.targetCombatant.position.y-30+random(-40,40)]))
                            this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.targetCombatant.position.x+random(-10,10),this.targetCombatant.position.y-30+random(-40,40),27,[25]))
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }else if(this.timer>=30){
                            this.remove=true
                        }
                    break
                    case 199: case 200: case 201: case 202:
                        if(this.timer==1){
                            this.userCombatant.startAnimation(3)
                        }
                        this.userCombatant.runAnimation(1/10,3)
                        if(this.timer==10){
                            this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,this.type-171,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
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
                            this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                                this.targetCombatant.moveTile(this.procedure[1],this.distance/40)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection+this.procedure[2]*60,this.relativeDistance/40/this.targetDistance)
                            }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                                this.targetCombatant.moveTile(this.procedure[1],-this.distance/40)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection+this.procedure[2]*60,-this.relativeDistance/40/this.targetDistance)
                            }
                            if(this.timer>=15*this.targetDistance+11){
                                this.remove=true
                            }
                        }else if(this.procedure[0]==1){
                            if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                                this.targetCombatant.moveTile(this.procedure[1],this.distance/10)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection+this.procedure[2]*60,this.relativeDistance/10/this.targetDistance)
                            }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                                this.targetCombatant.moveTile(this.procedure[1],-this.distance/10)
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
                            this.battle.combatantManager.damageArea(this.effect[0],this.user,-1,this.targetCombatant.tilePosition)
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
                                this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                            if(this.procedure[0]==2){
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
                            }else if(this.procedure[0]==1){
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
                    case 213:
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
                    case 218: case 219:
                        if(this.timer==1){
                            this.userCombatant.goal.anim.direction=this.relativeDirection
                            this.userCombatant.startAnimation(3)
                        }
                        this.userCombatant.runAnimation(1/10,3)
                        if(this.timer==10){
                            this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,33,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
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
                                this.procedure[0][a]=this.targetCombatant[a].getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                                this.procedure[0][a]=this.targetCombatant[a].getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                                this.targetCombatant[0].takeDamage(this.effect[0],this.user,1)
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
                            this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                            this.userCombatant.startAnimation(5)
                        }
                        if(this.timer<=10||this.timer>20&&this.timer<=30){
                            this.userCombatant.runAnimation(1/10,5)
                        }
                        if(this.timer==15){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,39,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x-this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y-this.targetCombatant.position.y-this.userCombatant.graphics.arms[0].bottom.y),2.5*this.targetDistance-1]))
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
                    case 236:
                        if(this.timer==1){
                            this.userCombatant.startAnimation(5)
                        }
                        if(this.timer<=10||this.timer>30&&this.timer<=40){
                            this.userCombatant.runAnimation(1/10,5)
                        }
                        if(this.timer==15||this.timer==20||this.timer==25){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),2.5*this.targetDistance-1]))
                        }
                        if(this.timer==5*this.targetDistance+15||this.timer==5*this.targetDistance+20||this.timer==5*this.targetDistance+25){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }else if(this.timer>=max(35,5*this.targetDistance+35)){
                            this.remove=true
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
                            if(this.userCombatant.status.main[0]>0){
                                this.userCombatant.status.main[0]--
                            }
                            if(this.userCombatant.status.main[12]>0){
                                this.userCombatant.status.main[12]=0
                            }
                        break
                    }
                }
            break
            case 1:
                switch(this.type){
                    case 0: case 1: case 2: case 4:
                        if(this.timer==1){
                            this.userCombatant.startAnimation(0)
                        }
                        this.userCombatant.moveTile(this.direction,this.distance/(15*distTargetCombatant(0,this,this.targetTile)))
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*distTargetCombatant(0,this,this.targetTile)))
                        this.userCombatant.runAnimation(1/15,0)
                        if(this.timer>=15*this.targetDistance){
                            this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                            this.battle.activateTile(1,this.userCombatant.id)
                            this.remove=true
                        }
                    break
                    case 3: case 5:
                        if(this.timer==1){
                            this.userCombatant.startAnimation(10)
                        }
                        this.userCombatant.runAnimation(1/20,10)
                        if(this.timer==10){
                            this.userCombatant.moveTile(this.direction,this.distance)
                            this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance)
                            this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                            this.battle.activate(1,this.userCombatant.id)
                        }else if(this.timer>=20){
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
}