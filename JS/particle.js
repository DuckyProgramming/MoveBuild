class particle{
    constructor(layer,x,y,type,args){
        this.layer=layer
        this.position={x:x,y:y}
        this.type=type
        this.remove=false
        this.time=0
        this.base={position:{x:x,y:y}}
        switch(this.type){
            case 0: case 41: case 77: case 106:
                this.value=args[0]
                this.direction=random(120,240)
                this.speed=random(2.5,5)
                this.gravity=random(0.25,0.5)
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
                this.velocity={x:lsin(this.direction)*this.speed,y:lcos(this.direction)*this.speed}
            break
            case 1: case 4: case 7: case 32: case 35: case 49: case 50: case 89: case 105: case 113:
            case 131:
                this.direction=args[0]
                this.timer=args[1]
                this.speed=8
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
            break
            case 2: case 9: case 10: case 17: case 23: case 27: case 36: case 37: case 40: case 45:
            case 51: case 52: case 54: case 57: case 60: case 65: case 66: case 68: case 72: case 73:
            case 74: case 75: case 76: case 80: case 84: case 85: case 86: case 88: case 90: case 95:
            case 97: case 99: case 114: case 115: case 116: case 117: case 118: case 119: case 120: case 121:
            case 126: case 135: case 136: case 139: case 152: case 154: case 155: case 156: case 163: case 164:
            case 168: case 169: case 170: case 173: case 192: case 193: case 195: case 196: case 199: case 206:
            case 225: case 244:
                this.size=args[0]
                this.fade=1
                this.scale=0
            break
            case 3:
                this.direction=args[0]
                this.timer=args[1]
                this.speed=8
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
                this.size=0
            break
            case 5: case 8:
                this.direction=args[0]
                this.timer=args[1]
                this.speed=16/3
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
            break
            case 6: case 11: case 14: case 16: case 18: case 19: case 20: case 21: case 39: case 42:
            case 43: case 44: case 47: case 48: case 78: case 79: case 82: case 83: case 98: case 101:
            case 111: case 123: case 160:
                this.direction=args[0]
                this.timer=args[1]
                this.speed=15
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
            break
            case 12: case 13: case 91: case 92: case 107:
                this.position2={x:args[0]-this.position.x,y:args[1]-this.position.y}
                this.fade=1
                this.size=1
                this.scale=1
            break
            case 15: case 38:
                this.position2={x:args[0]-this.position.x,y:args[1]-this.position.y}
                this.fade=1
                this.size=1
                this.scale=1
                this.ticks=ceil(dist(0,0,this.position2.x,this.position2.y)/15)
                this.direction=atan2(this.position2.x,this.position2.y)
            break
            case 22:
                this.position2={x:args[0]-this.position.x,y:args[1]-this.position.y}
                this.fade=1
                this.size=1
                this.scale=1
                this.ticks=ceil(dist(0,0,this.position2.x,this.position2.y)/5)
                this.direction=atan2(this.position2.x,this.position2.y)
            break
            case 24:
                this.position2={x:args[0]-this.position.x,y:args[1]-this.position.y}
                this.fade=1
                this.size=1
                this.scale=1
                this.ticks=ceil(dist(0,0,this.position2.x,this.position2.y)/10)
                this.direction=atan2(this.position2.x,this.position2.y)
            break
            case 25:
                this.position2={x:args[0]-this.position.x,y:args[1]-this.position.y}
                this.fade=1
                this.size=1
                this.scale=1
                this.ticks=ceil(dist(0,0,this.position2.x,this.position2.y)/20)
                this.direction=atan2(this.position2.x,this.position2.y)
            break
            case 26:
                this.position2={x:args[0]-this.position.x,y:args[1]-this.position.y}
                this.fade=1
                this.size=1
                this.scale=1
                this.ticks=ceil(dist(0,0,this.position2.x,this.position2.y)/8)
                this.direction=atan2(this.position2.x,this.position2.y)
            break
            case 28: case 29: case 30: case 31:
                this.position2={x:args[0]-this.position.x,y:args[1]-this.position.y}
                this.fade=1
                this.size=1
                this.scale=1
                this.ticks=ceil(dist(0,0,this.position2.x,this.position2.y)/12)
                this.direction=atan2(this.position2.x,this.position2.y)
                this.sets=[]
                for(let a=0,la=this.ticks;a<la;a++){
                    this.sets.push([random(-15,15),random(-15,15)])
                }
            break
            case 33:
                this.position2={x:args[0]-this.position.x,y:args[1]-this.position.y}
                this.fade=1
                this.size=1
                this.scale=1
                this.ticks=ceil(dist(0,0,this.position2.x,this.position2.y)/6)
                this.direction=atan2(this.position2.x,this.position2.y)
                this.sets=[]
                for(let a=0,la=this.ticks;a<la;a++){
                    this.sets.push([random(-5,5),random(-5,5)])
                }
            break
            case 34:
                this.fade=1
                this.size=args[0]
                this.scale=0.1
                this.direction=args[1]
            break
            case 46:
                this.size=args[0]
                this.fade=1
                this.scale=0
                this.direction=[random(0,360),random(0,360),random(0,360),random(0,360)]
            break
            case 53: case 55: case 58: case 69: case 70: case 71: case 87: case 175:
                this.position2={x:args[0]-this.position.x,y:args[1]-this.position.y}
                this.fade=1
                this.size=1
                this.scale=1
                this.ticks=ceil(dist(0,0,this.position2.x,this.position2.y)/12)
                this.direction=atan2(this.position2.x,this.position2.y)
                this.sets=[]
                for(let a=0,la=this.ticks;a<la;a++){
                    this.sets.push(this.type==58?[0,0]:[random(-10,10),random(-10,10)])
                }
            break
            case 56:
                this.size=args[0]
                this.color=[[255,0,0],[255,125,0],[255,255,0],[0,255,0],[0,255,255],[0,0,255],[255,0,255]][floor(random(0,7))]
                this.fade=1
                this.scale=0
            break
            case 59:
                this.position2={x:args[0]-this.position.x,y:args[1]-this.position.y}
                this.fade=1
                this.size=1
                this.scale=1
                this.ticks=ceil(dist(0,0,this.position2.x,this.position2.y)/24)
                this.direction=atan2(this.position2.x,this.position2.y)
                this.sets=[]
                for(let a=0,la=this.ticks;a<la;a++){
                    this.sets.push([0,0])
                }
            break
            case 61: case 62: case 63: case 64: case 96: case 100: case 171: case 172: case 179: case 180:
            case 181: case 182: case 198:
                this.direction=args[0]
                this.speed=args[1]
                this.baseSpeed=args[1]
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
            break
            case 67:
                this.position2={x:args[0]-this.position.x,y:args[1]-this.position.y}
                this.fade=1
                this.size=1
                this.scale=1
                this.ticks=ceil(dist(0,0,this.position2.x,this.position2.y)/20)
                this.direction=atan2(this.position2.x,this.position2.y)
                this.sets=[]
                for(let a=0,la=this.ticks;a<la;a++){
                    this.sets.push([random(-10,10),random(-10,10)])
                }
            break
            case 81: case 231:
                this.direction=args[0]
                this.timer=args[1]
                this.color=random(0,1)
                this.speed=15*random(0.6,1.5)
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
                this.spin=random(0,360)
            break
            case 93: case 103: case 104: case 110: case 212:
                this.size=args[0]
                this.fade=1
                this.scale=0
                this.direction=random(0,360)
            break
            case 94: case 102: case 127:
                this.direction=args[0]
                this.timer=args[1]
                this.color=floor(random(0,6))
                this.speed=15*random(0.5,1.5)
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
            break
            case 108: case 140: case 142: case 157: case 202: case 215: case 226: case 227:
                this.direction=args[0]
                this.timer=args[1]
                this.speed=this.type==140||this.type==226||this.type==227?10:5
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=0
            break
            case 109: case 143:
                this.direction=args[0]
                this.delay=args[1]
                this.curve=args[2]
                this.points=[]
                this.speed=this.type==143?12:6
                this.fade=1
                this.size=1
                this.scale=1
            break
            case 112:
                this.color=args[0]
                this.direction=random(0,360)
                this.spin=random(0,360)
                this.curl=random(-2,2)
                this.speed=0.5
                this.fade=0
                this.size=1
                this.scale=1
                this.trigger=false
            break
            case 122:
                this.size=args[0]
                this.fade=0
                this.scale=1
            break
            case 124: case 214:
                this.size=args[0]
                this.fade=1
                this.scale=0
                this.direction=random(0,360)
                this.curve=random(0.5,1)*(floor(random(0,2))*2-1)
                this.tick=[]
                for(let a=0,la=60;a<la;a++){
                    this.tick.push([random(0,40),random(1,2)])
                }
            break
            case 125:
                this.size=1
                this.fade=1
                this.scale=1
            break
            case 128:
                this.value=floor(random(1,10))
                this.direction=args[0]
                this.speed=random(2.5,5)
                this.gravity=random(0.1,0.2)
                this.color=random(0,1)
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
                this.velocity={x:lsin(this.direction)*this.speed,y:lcos(this.direction)*this.speed}
            break
            case 129: case 130:
                this.size=args[0]
                this.fade=1
                this.scale=1
            break
            case 132: case 134: case 153: case 165:
                this.size=args[0]
                this.offset=args[1]
                this.delay=args[2]
                this.fade=1
                this.scale=0
            break
            case 133: case 194: case 217: case 218: case 219: case 232:
                this.size=args[0]
                this.fade=1
                this.scale=0
                this.notes=[]
                for(let a=0,la=20;a<la;a++){
                    this.notes.push([floor(random(0,2)),floor(random(0,3)),-1+floor(random(0,2))*2])
                }
            break
            case 137: case 176:
                this.direction=args[0]
                this.timer=args[1]
                this.color=args[2]
                this.distance=0
                this.speed=this.type==176?8:4
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
            break
            case 138:
                this.direction=args[0]
                this.timer=args[1]
                this.color=args[2]
                this.distance=0
                this.speed=3.5
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
            break
            case 141:
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
            break
            case 144: case 240:
                this.position2={x:args[0]-this.position.x,y:args[1]-this.position.y}
                this.position3={x:args[2]-this.position.x,y:args[3]-this.position.y}
                this.direction=atan2(this.position2.x,-this.position2.y)
                this.fade=2
                this.size=1
                this.scale=1
            break
            case 145: case 146:
                this.direction=args[0]
                this.timer=args[1]
                this.color=args[2]
                this.speed=args[3]
                this.scale=args[4]
                this.fade=0
                this.trigger=false
                this.size=1
            break
            case 147:
                this.position2={x:args[0]-this.position.x,y:args[1]-this.position.y}
                this.position3={x:args[2]-this.position.x,y:args[3]-this.position.y}
                this.direction=atan2(this.position2.x,-this.position2.y)
                this.fade=2
                this.size=1
                this.scale=1
                this.summon=random(0,360)
            break
            case 148:
                this.size=args[0]
                this.fade=2
                this.scale=0
                this.direction=args[1]
            break
            case 149:
                this.direction=args[0]
                this.curve=args[1]
                this.curveSpeed=args[2]
                this.size=1
                this.scale=1
                this.fade=1
                this.speed=6
            break
            case 150:
                this.direction=args[0]
                this.curve=args[1]
                this.curveSpeed=args[2]
                this.size=1
                this.scale=1
                this.fade=1
                this.speed=6
                this.color=[[255,0,0],[255,175,0],[255,255,0],[0,255,0],[0,255,255],[255,0,255]][floor(random(0,6))]
            break
            case 151:
                this.direction=args[0]
                this.curve=args[1]
                this.curveSpeed=args[2]
                this.size=1
                this.scale=1
                this.fade=1
                this.speed=8
                this.clouds=[]
            break
            case 158: case 243:
                this.direction=args[0]
                this.curve=args[1]
                this.curveSpeed=args[2]
                this.size=1
                this.scale=1
                this.fade=1
                this.speed=8
                this.clouds=[]
            break
            case 159: case 200:
                this.direction=args[0]
                this.fade=0
                this.size=1
                this.scale=1
                this.trigger=false
            break
            case 161:
                this.position2={x:args[0]-this.position.x,y:args[1]-this.position.y}
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
                this.ticks=ceil(dist(0,0,this.position2.x,this.position2.y)/100)
                this.direction=atan2(this.position2.x,this.position2.y)
                this.sets=[[],[],[]]
                for(let a=0,la=this.ticks;a<la;a++){
                    this.sets[0].push([random(-10,10),random(-10,10)])
                    this.sets[1].push([random(-20,20),random(-10,20)])
                    this.sets[2].push([random(-20,20),random(-10,20)])
                }
            break
            case 162:
                this.size=args[0]
                this.fade=0
                this.scale=1
                this.trigger=false
                this.occlude=0
            break
            case 166:
                this.direction=args[0]
                this.timer=args[1]
                this.gear=random(-4,4)
                this.size=1
                this.scale=1.5
                this.fade=0
                this.speed=10
                this.trigger=false
            break
            case 167:
                this.direction=args[0]
                this.timer=args[1]
                this.gear=random(-4,4)
                this.size=1
                this.scale=1
                this.fade=0
                this.speed=8
                this.trigger=false
            break
            case 174:
                this.size=args[0]
                this.offset=args[1]
                this.delay=args[2]
                this.fade=0
                this.trigger=false
                this.scale=1
            break
            case 177:
                this.direction=args[0]
                this.curve=args[1]
                this.curveSpeed=args[2]
                this.size=1
                this.scale=1
                this.fade=1
                this.speed=8
                this.timer=args[3]
                this.clouds=[]
            break
            case 178:
                this.direction=args[0]
                this.timer=args[1]
                this.color=floor(random(0,6))
                this.speed=15*random(0.5,1.5)
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
                this.sparkle=[random(-6,6),random(-15,15),random(0.8,1)]
            break
            case 183:
                this.position2={x:args[0]-this.position.x,y:args[1]-this.position.y}
                this.fade=0
                this.size=1
                this.scale=1
                this.trigger=false
                this.ticks=ceil(dist(0,0,this.position2.x,this.position2.y)/12)
                this.direction=atan2(this.position2.x,this.position2.y)
                this.color=random(0,1)
                this.sets=[]
                for(let a=0,la=this.ticks;a<la;a++){
                    this.sets.push(this.type==58?[0,0]:[random(-10,10),random(-10,10)])
                }
            break
            case 184: case 186:
                this.direction=args[0]
                this.timer=args[1]
                this.speed=7
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=2
                this.offset=random(0,360)
            break
            case 185: case 216: case 229:
                this.direction=args[0]
                this.fade=1
                this.trigger=false
                this.activation=0
                this.size=1
                this.scale=4
                this.sparks=[]
            break
            case 187:
                this.direction=args[0]
                this.key=args[1]
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
                this.width=random(0.5,1)
                this.mult=random(0.05,0.2)
                this.curve=0
                this.curveAcc=random(-0.05,0.05)
            break
            case 188:
                this.direction=args[0]
                this.speed=args[1]
                this.fade=1
                this.size=1
                this.scale=0
            break
            case 189:
                this.direction=args[0]
                this.speed=args[1]
                this.angularAcc=args[2]
                this.fade=1
                this.size=1
                this.scale=0
                this.angular=0
            break
            case 190:
                this.direction=args[0]
                this.timer=args[1]
                this.delay=args[2]
                this.speed=20
                this.fade=1
                this.size=1
                this.scale=0
                this.spin=random(0,360)
                this.trail=[]
                for(let a=0,la=5;a<la;a++){
                    this.trail.push([random(-6,6),16+a*12+random(-4,4),random(0.5,1.5),random(0,360)])
                }
            break
            case 191:
                this.direction=args[0]
                this.timer=args[1]
                this.fadeKey=args[2]
                this.key=args[3]
                this.distance=0
                this.speed=0
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=0
            break
            case 197:
                this.direction=args[0]
                this.size=args[1]
                this.shear=random(0,360)
                this.side=floor(random(0,2))
                this.speed=3
                this.scale=1
                this.fade=0
                this.trigger=false
            break
            case 201:
                this.direction=args[0]
                this.timer=args[1]
                this.speed=12
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
                this.color=floor(random(0,6))
            break
            case 203:
                this.direction=args[0]
                this.timer=args[1]
                this.speed=4
                this.fade=0
                this.size=1
                this.scale=1
            break
            case 204:
                this.target=args[0]
                this.direction=args[1]
                this.color=args[2]
                this.timer=180
                this.speed=8
                this.hit=false
                this.size=1
                this.scale=1
                this.fade=0
            break
            case 205:
                this.direction=args[0]
                this.timer=args[1]
                this.color=args[2]
                this.speed=4
                this.fade=0
                this.size=1
                this.scale=1
            break
            case 207: case 237:
                this.direction=args[0]
                this.spin=args[1]
                this.fade=0
                this.size=1
                this.scale=1
                this.trigger=false
            break
            case 208:
                this.direction=args[0]
                this.color=args[1]
                this.bounce=0
                this.bounceLimit=args[2]
                this.gear=random(-4,4)
                this.size=1
                this.scale=1.5
                this.fade=0
                this.speed=15
                this.velocity={x:lsin(this.direction)*this.speed,y:lcos(this.direction)*this.speed}
            break
            case 209:
                this.direction=args[0]
                this.color=args[1]
                this.gear=random(-4,4)
                this.size=1
                this.scale=1
                this.fade=0
                this.speed=12
            break
            case 210:
                this.direction=args[0]
                this.color=args[1]
                this.timer=args[2]
                this.gear=random(-4,4)
                this.size=1
                this.scale=random(1.2,1.8)
                this.fade=0
                this.speed=15
                this.velocity={x:lsin(this.direction)*this.speed,y:lcos(this.direction)*this.speed}
            break
            case 211: case 228:
                this.size=args[0]
                this.color=args[1]
                this.fade=1
                this.scale=0
            break
            case 213:
                this.size=args[0]
                this.direction=args[1]
                this.speed=args[2]
                this.gear=args[3]
                this.fade=1
                this.scale=1
                this.trigger=false
                this.baseSpeed=args[2]
            break
            case 220:
                this.fade=1
                this.trigger=false
                this.activation=0
                this.size=args[0]
                this.scale=4
                this.sparks=[]
            break
            case 221:
                this.direction=args[0]
                this.color=args[1]
                this.speed=args[2]
                this.spin=0
                this.fade=1
                this.size=1
                this.scale=0
                this.grav=0
            break
            case 222: case 234: case 241:
                this.direction=args[0]
                this.color=args[1]
                this.colorShift=args[2]
                this.delay=args[3]
                this.speed=args[4]
                this.size=args[5]
                this.spin=0
                this.fade=1
                this.scale=0
                this.grav=0
            break
            case 223:
                this.spin=args[0]
                this.color=args[1]
                this.colorShift=args[2]
                this.size=args[3]
                this.trigger=false
                this.fade=0
                this.scale=1
            break
            case 224:
                this.fade=1
                this.size=1
                this.scale=1
                this.points=[[0,0]]
                this.progress=0
                this.speed=2
                for(let a=0,la=10;a<la;a++){
                    let direction=random(0,360)
                    this.points.push([
                        this.points[this.points.length-1][0]+lsin(direction)*40,
                        this.points[this.points.length-1][1]+lcos(direction)*40
                    ])
                }
            break
            case 230:
                this.direction=args[0]
                this.timer=args[1]
                this.switch=args[2]
                this.interval=args[3]
                this.points=[[0,0]]
                this.speed=2
                this.fade=1
                this.trigger=false
                this.size=1
                this.scale=1
                this.shift=0
                this.shiftGoal=0
                this.shiftTrigger=false
                this.bumps=0
            break
            case 233:
                this.size=args[0]
                this.direction=args[1]
                this.side=args[2]
                this.color=args[3]
                this.fade=1
                this.scale=0
            break
            case 235: case 242:
                this.direction=args[0]
                this.speed=args[1]
                this.grav=args[2]
                this.spin=args[3]
                this.color=args[4]
                this.colorShift=args[5]
                this.size=args[6]
                this.trigger=false
                this.fade=0
                this.scale=1
            break
            case 236:
                this.size=args[0]
                this.direction=args[1]
                this.fade=0
                this.scale=1
                this.trigger=false
                this.occlude=0
            break
            case 238:
                this.direction=args[0]
                this.spin=args[1]
                this.speed=0
                this.fade=0
                this.size=1
                this.scale=0
                this.extent=0
                this.trigger=false
            break
            case 239:
                this.direction=args[0]
                this.fade=1
                this.trigger=false
                this.activation=0
                this.size=1
                this.scale=4
            break

        }
    }
    display(){
        if(this.size>0&&this.scale>0){
            this.layer.push()
            this.layer.translate(this.position.x,this.position.y)
            this.layer.scale(this.size*this.scale)
            this.layer.noStroke()
            switch(this.type){
                case 0:
                    this.layer.textSize(20)
                    this.layer.fill(255,this.fade)
                    this.layer.stroke(0,this.fade)
                    this.layer.strokeWeight(1)
                    this.layer.text(tennify(this.value),0,0)
                break
                case 1:
                    this.layer.rotate(this.direction)
                    this.layer.fill(235,245,255,this.fade)
                    this.layer.rect(0,-5,3,10)
                    this.layer.triangle(-3/2,-10,3/2,-10,0,-20)
                    this.layer.fill(160,170,180,this.fade)
                    this.layer.rect(3/4,-5,3/2,10)
                    this.layer.triangle(3/2,-10,0,-20,0,-10)
                    for(let g=0;g<4;g++){
                        this.layer.stroke(125+g*10,70+g*10,80+g*10,this.fade)
                        this.layer.strokeWeight(4-g)
                        this.layer.line(0,-2+g/2,0,2-g/2)
                    }
                break
                case 2:
                    this.layer.fill(255,180,0,this.fade)
                    this.layer.ellipse(0,0,12,12)
                    this.layer.fill(255,150,0,this.fade)
                    this.layer.ellipse(0,0,9,9)
                    this.layer.fill(255,120,0,this.fade)
                    this.layer.ellipse(0,0,6,6)
                    this.layer.fill(255,90,0,this.fade)
                    this.layer.ellipse(0,0,3,3)
                break
                case 3:
                    if(this.size>0){
                        this.layer.rotate(this.time*6)
                        this.layer.image(graphics.minor[17],-30*this.size,-30*this.size,60*this.size,60*this.size)
                    }
                break
                case 4:
                    this.layer.rotate(this.time*10)
                    this.layer.fill(200,this.fade)
                    for(let a=0,la=4;a<la;a++){
                        this.layer.rotate(90)
                        this.layer.rect(0,-2,5,1)
                        this.layer.triangle(-1,-2,1,-2,0,-8)
                    }
                break
                case 5:
                    this.layer.fill(160,this.fade)
                    regPoly(this.layer,0,0,7,4,4,this.time*3)
                break
                case 6:
                    this.layer.rotate(this.direction)
                    this.layer.fill(200,this.fade)
                    this.layer.rect(0,1,4,4)
                    this.layer.arc(0,-1,4,6,-180,0)
                break
                case 7:
                    this.layer.rotate(this.time*10)
                    this.layer.fill(40,this.fade)
                    this.layer.rect(0,-4,2,2)
                    this.layer.fill(60,this.fade)
                    this.layer.rect(0,0,8,8)
                break
                case 8:
                    this.layer.rotate(this.direction)
                    this.layer.fill(100,255,150,this.fade)
                    this.layer.rect(0,0,4,8)
                    this.layer.fill(60,this.fade)
                    this.layer.triangle(-2.5,-4,2.5,-4,0,-7)
                    this.layer.rect(0,5,5,2)
                break
                case 9:
                    this.layer.fill(255,50,50,this.fade)
                    this.layer.ellipse(0,0,12,12)
                    this.layer.fill(255,100,100,this.fade)
                    this.layer.ellipse(0,0,9,9)
                    this.layer.fill(255,150,150,this.fade)
                    this.layer.ellipse(0,0,6,6)
                    this.layer.fill(255,200,200,this.fade)
                    this.layer.ellipse(0,0,3,3)
                break
                case 10:
                    this.layer.fill(255,255,50,this.fade)
                    this.layer.ellipse(0,0,12,12)
                    this.layer.fill(255,255,75,this.fade)
                    this.layer.ellipse(0,0,8,8)
                    this.layer.fill(255,255,100,this.fade)
                    this.layer.ellipse(0,0,4,4)
                break
                case 11:
                    this.layer.rotate(this.direction)
                    this.layer.fill(230,130,210,this.fade/10)
                    for(let a=0,la=10;a<la;a++){
                        this.layer.triangle(0,-9,-15*(a+1)/la,-9+15*(a+1)/la,15*(a+1)/la,-9+15*(a+1)/la)
                    }
                break
                case 12:
                    this.layer.stroke(255,0,0,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.line(0,0,this.position2.x,this.position2.y)
                break
                case 13:
                    this.layer.stroke(0,100,255,this.fade)
                    this.layer.strokeWeight(5)
                    this.layer.line(0,0,this.position2.x,this.position2.y)
                break
                case 14:
                    this.layer.fill(255,this.fade)
                    this.layer.strokeWeight(2)
                    this.layer.noFill()
                    this.layer.arc(0,-8,6,6,-150,-30)
                    this.layer.arc(0,-8,12,12,-150,-30)
                    this.layer.arc(0,-8,18,18,-150,-30)
                break
                case 15:
                    this.layer.stroke(50,255,255,this.fade)
                    this.layer.strokeWeight(5)
                    for(let a=0,la=this.ticks;a<la;a++){
                        this.layer.line(
                            map(a/la,0,1,0,this.position2.x)+(a==0?0:(a%2*2-1)*10*lcos(this.direction)*lsin(this.time*15)),
                            map(a/la,0,1,0,this.position2.y)+(a==0?0:(a%2*2-1)*-10*lsin(this.direction)*lsin(this.time*15)),
                            map((a+1)/la,0,1,0,this.position2.x)+(a==la-1?0:(a%2*2-1)*-10*lcos(this.direction)*lsin(this.time*15)),
                            map((a+1)/la,0,1,0,this.position2.y)+(a==la-1?0:(a%2*2-1)*10*lsin(this.direction)*lsin(this.time*15)))
                    }
                break
                case 16:
                    this.layer.rotate(this.direction)
                    this.layer.fill(40)
                    this.layer.triangle(-4,4,4,4,0,-8)
                    this.layer.rect(0,6,6,4)
                break
                case 17:
                    this.layer.fill(50,255,50,this.fade)
                    this.layer.ellipse(0,0,12,12)
                    this.layer.fill(100,255,100,this.fade)
                    this.layer.ellipse(0,0,9,9)
                    this.layer.fill(150,255,150,this.fade)
                    this.layer.ellipse(0,0,6,6)
                    this.layer.fill(200,255,200,this.fade)
                    this.layer.ellipse(0,0,3,3)
                break
                case 18:
                    this.layer.rotate(this.direction-90)
                    this.layer.fill(200,this.fade)
                    this.layer.rect(-2,0,2,4)
                    this.layer.rect(0,-3,6,2)
                    this.layer.rect(0,3,6,2)
                break
                case 19:
                    this.layer.rotate(this.direction-90)
                    this.layer.fill(200,this.fade)
                    this.layer.rect(-2,0,2,4)
                    this.layer.rect(0,-3,6,2)
                    this.layer.rect(0,3,6,2)
                    this.layer.fill(200,255,255,this.fade)
                    this.layer.ellipse(0,0,4,4)
                break
                case 20:
                    this.layer.rotate(this.direction)
                    this.layer.fill(120,60,0,this.fade)
                    this.layer.rect(0,3,2,8)
                    this.layer.fill(180,this.fade)
                    this.layer.triangle(-2.5,-1,2.5,-1,0,-5)
                break
                case 21:
                    this.layer.rotate(this.direction)
                    this.layer.fill(240,this.fade)
                    this.layer.quad(0,5,-4,2,0,-6,4,2)
                    this.layer.fill(160,this.fade)
                    this.layer.quad(0,5,-1,0,0,-6,1,0)
                break
                case 22:
                    this.layer.stroke(100,255,255,this.fade)
                    this.layer.strokeWeight(5)
                    for(let a=0,la=this.ticks;a<la;a++){
                        this.layer.line(
                            map(a/la,0,1,0,this.position2.x)+(a==0?0:10*lcos(this.direction)*lsin(this.time*-60+a*60)),
                            map(a/la,0,1,0,this.position2.y)+(a==0?0:-10*lsin(this.direction)*lsin(this.time*-60+a*60)),
                            map((a+1)/la,0,1,0,this.position2.x)+(a==la-1?0:10*lcos(this.direction)*lsin(this.time*-60+a*60+60)),
                            map((a+1)/la,0,1,0,this.position2.y)+(a==la-1?0:-10*lsin(this.direction)*lsin(this.time*-60+a*60+60)))
                    }
                break
                case 23:
                    this.layer.fill(240,160,240,this.fade)
                    this.layer.ellipse(0,0,12,12)
                    this.layer.fill(240,120,240,this.fade)
                    this.layer.ellipse(0,0,9,9)
                    this.layer.fill(240,80,240,this.fade)
                    this.layer.ellipse(0,0,6,6)
                    this.layer.fill(240,40,240,this.fade)
                    this.layer.ellipse(0,0,3,3)
                break
                case 24:
                    this.layer.stroke(100,255,255,this.fade)
                    this.layer.strokeWeight(5)
                    for(let a=0,la=this.ticks;a<la;a++){
                        this.layer.line(
                            map(a/la,0,1,0,this.position2.x)+(a==0?0:10*lcos(this.direction)*lsin(this.time*30)*lsin(a*60)),
                            map(a/la,0,1,0,this.position2.y)+(a==0?0:-10*lsin(this.direction)*lsin(this.time*30)*lsin(a*60)),
                            map((a+1)/la,0,1,0,this.position2.x)+(a==la-1?0:10*lcos(this.direction)*lsin(this.time*30)*lsin(a*60+60)),
                            map((a+1)/la,0,1,0,this.position2.y)+(a==la-1?0:-10*lsin(this.direction)*lsin(this.time*30)*lsin(a*60+60)))
                    }
                break
                case 25:
                    this.layer.stroke(255,150,50,this.fade)
                    this.layer.strokeWeight(5)
                    for(let a=0,la=this.ticks;a<la;a++){
                        this.layer.line(
                            map(a/la,0,1,0,this.position2.x)+(a==0?0:15*lcos(this.direction)*lsin(this.time*-30+a*90)),
                            map(a/la,0,1,0,this.position2.y)+(a==0?0:-15*lsin(this.direction)*lsin(this.time*-30+a*90)),
                            map((a+1)/la,0,1,0,this.position2.x)+(a==la-1?0:15*lcos(this.direction)*lsin(this.time*-30+a*90+90)),
                            map((a+1)/la,0,1,0,this.position2.y)+(a==la-1?0:-15*lsin(this.direction)*lsin(this.time*-30+a*90+90)))
                    }
                break
                case 26:
                    this.layer.stroke(255,this.fade)
                    this.layer.strokeWeight(5)
                    let endSet=[0,0]
                    for(let a=0,la=this.ticks;a<la;a++){
                        let startSet=[random(-3,3),random(-3,3)]
                        this.layer.line(
                            map(a/la,0,1,0,this.position2.x)+endSet[0],
                            map(a/la,0,1,0,this.position2.y)+endSet[1],
                            map((a+1)/la,0,1,0,this.position2.x)+startSet[0],
                            map((a+1)/la,0,1,0,this.position2.y)+startSet[1])
                        endSet=[startSet[0],startSet[1]]
                    }
                break
                case 27:
                    this.layer.fill(255,this.fade)
                    this.layer.ellipse(0,0,12,12)
                break
                case 28:
                    this.layer.stroke(255,100,100,this.fade)
                    this.layer.strokeWeight(5)
                    for(let a=0,la=this.ticks;a<la;a++){
                        this.layer.line(
                            map(a/la,0,1,0,this.position2.x)+(a==0?0:this.sets[a-1][0]),
                            map(a/la,0,1,0,this.position2.y)+(a==0?0:this.sets[a-1][1]),
                            map((a+1)/la,0,1,0,this.position2.x)+this.sets[a][0],
                            map((a+1)/la,0,1,0,this.position2.y)+this.sets[a][1])
                    }
                break
                case 29:
                    this.layer.stroke(255,255,100,this.fade)
                    this.layer.strokeWeight(5)
                    for(let a=0,la=this.ticks;a<la;a++){
                        this.layer.line(
                            map(a/la,0,1,0,this.position2.x)+(a==0?0:this.sets[a-1][0]),
                            map(a/la,0,1,0,this.position2.y)+(a==0?0:this.sets[a-1][1]),
                            map((a+1)/la,0,1,0,this.position2.x)+this.sets[a][0],
                            map((a+1)/la,0,1,0,this.position2.y)+this.sets[a][1])
                    }
                break
                case 30:
                    this.layer.stroke(100,255,255,this.fade)
                    this.layer.strokeWeight(5)
                    for(let a=0,la=this.ticks;a<la;a++){
                        this.layer.line(
                            map(a/la,0,1,0,this.position2.x)+(a==0?0:this.sets[a-1][0]),
                            map(a/la,0,1,0,this.position2.y)+(a==0?0:this.sets[a-1][1]),
                            map((a+1)/la,0,1,0,this.position2.x)+this.sets[a][0],
                            map((a+1)/la,0,1,0,this.position2.y)+this.sets[a][1])
                    }
                break
                case 31:
                    this.layer.stroke(255,100,255,this.fade)
                    this.layer.strokeWeight(5)
                    for(let a=0,la=this.ticks;a<la;a++){
                        this.layer.line(
                            map(a/la,0,1,0,this.position2.x)+(a==0?0:this.sets[a-1][0]),
                            map(a/la,0,1,0,this.position2.y)+(a==0?0:this.sets[a-1][1]),
                            map((a+1)/la,0,1,0,this.position2.x)+this.sets[a][0],
                            map((a+1)/la,0,1,0,this.position2.y)+this.sets[a][1])
                    }
                break
                case 32:
                    this.layer.rotate(this.direction)
                    this.layer.fill(20,this.fade)
                    this.layer.arc(0,2,6,6,0,180)
                    this.layer.triangle(-3,2,3,2,0,-6)
                break
                case 33:
                    this.layer.stroke(255,150,255,this.fade)
                    this.layer.strokeWeight(5)
                    for(let a=0,la=this.ticks;a<la;a++){
                        this.sets[a][0]+=random(-1,1)
                        this.sets[a][1]+=random(-1,1)
                        this.layer.line(
                            map(a/la,0,1,0,this.position2.x)+(a==0?0:this.sets[a-1][0]),
                            map(a/la,0,1,0,this.position2.y)+(a==0?0:this.sets[a-1][1]),
                            map((a+1)/la,0,1,0,this.position2.x)+this.sets[a][0],
                            map((a+1)/la,0,1,0,this.position2.y)+this.sets[a][1])
                    }
                break
                case 34:
                    this.layer.stroke(0,this.fade)
                    this.layer.strokeWeight(1)
                    this.layer.noFill()
                    this.layer.arc(0,0,24,20,-this.direction+15,-this.direction+165)
                break
                case 35:
                    this.layer.rotate(this.direction)
                    this.layer.fill(255,200,255,this.fade)
                    this.layer.quad(-1,-12.5,0,-10,0,5,-1,5)
                    this.layer.fill(255,150,255,this.fade)
                    this.layer.quad(1,-7.5,0,-10,0,5,1,5)
                    this.layer.fill(255,255,255,this.fade)
                    this.layer.rect(0,6,5,2)
                    this.layer.rect(0,8,3,2)
                break
                case 36:
                    this.layer.fill(255,150,150,this.fade)
                    this.layer.ellipse(0,0,12,12)
                break
                case 37:
                    this.layer.fill(255,175,255,this.fade)
                    this.layer.ellipse(0,0,12,12)
                break
                case 38:
                    this.layer.stroke(255,255,200,this.fade)
                    this.layer.strokeWeight(10)
                    for(let a=0,la=this.ticks;a<la;a++){
                        this.layer.line(
                            map(a/la,0,1,0,this.position2.x)+(a==0?0:10*lcos(this.direction)*lsin(this.time*-10+a*60)),
                            map(a/la,0,1,0,this.position2.y)+(a==0?0:-10*lsin(this.direction)*lsin(this.time*-10+a*60)),
                            map((a+1)/la,0,1,0,this.position2.x)+(a==la-1?0:10*lcos(this.direction)*lsin(this.time*-10+a*60+60)),
                            map((a+1)/la,0,1,0,this.position2.y)+(a==la-1?0:-10*lsin(this.direction)*lsin(this.time*-10+a*60+60)))
                    }
                break
                case 39:
                    this.layer.rotate(this.direction)
                    this.layer.fill(240,this.fade/5)
                    for(let a=0,la=10;a<la;a++){
                        this.layer.triangle(0,-9,-15*(a+1)/la,-9+15*(a+1)/la,15*(a+1)/la,-9+15*(a+1)/la)
                    }
                break
                case 40:
                    this.layer.fill(120,100,80,this.fade)
                    this.layer.ellipse(0,0,10,10)
                break
                case 41:
                    this.layer.textSize(20)
                    this.layer.fill(200,200,100,this.fade)
                    this.layer.stroke(0,this.fade)
                    this.layer.strokeWeight(1)
                    this.layer.text(tennify(this.value),0,0)
                break
                case 42:
                    this.layer.fill(255,100,0,this.fade)
                    this.layer.ellipse(0,0,12)
                    this.layer.fill(255,100,0,this.fade*0.5)
                    regStar(this.layer,0,0,24,6,6,18,18,0)
                break
                case 43:
                    this.layer.fill(0,100,255,this.fade)
                    this.layer.ellipse(0,0,12)
                    this.layer.fill(0,100,255,this.fade*0.5)
                    regStar(this.layer,0,0,24,6,6,18,18,0)
                break
                case 44:
                    this.layer.fill(50,255,50,this.fade)
                    this.layer.ellipse(0,0,12)
                    this.layer.fill(50,255,50,this.fade*0.5)
                    regStar(this.layer,0,0,24,6,6,18,18,0)
                break
                case 45:
                    this.layer.fill(180,255,0,this.fade)
                    this.layer.ellipse(0,0,12,12)
                    this.layer.fill(250,255,0,this.fade)
                    this.layer.ellipse(0,0,9,9)
                    this.layer.fill(120,255,0,this.fade)
                    this.layer.ellipse(0,0,6,6)
                    this.layer.fill(90,255,0,this.fade)
                    this.layer.ellipse(0,0,3,3)
                break
                case 46:
                    this.layer.fill(50,0,150,this.fade)
                    regStar(this.layer,0,0,6,9,9,3,3,this.direction[0])
                    this.layer.fill(75,0,200,this.fade)
                    regStar(this.layer,0,0,6,6.75,6.75,2.25,2.25,this.direction[1])
                    this.layer.fill(100,0,255,this.fade)
                    regStar(this.layer,0,0,6,4.5,4.5,1.5,1.5,this.direction[2])
                    this.layer.fill(125,25,255,this.fade)
                    regStar(this.layer,0,0,6,2.25,2.25,0.75,0.75,this.direction[3])
                break
                case 47:
                    this.layer.rotate(this.direction)
                    this.layer.fill(180,this.fade)
                    this.layer.rect(0,0,4,8)
                    this.layer.fill(240,this.fade)
                    this.layer.triangle(-1,4,1,4,0,6)
                    this.layer.fill(255,0,0,this.fade)
                    this.layer.rect(0,0,1,3)
                    this.layer.rect(0,0,3.3)
                break
                case 48:
                    this.layer.rotate(this.direction)
                    this.layer.fill(160,80,0,this.fade)
                    this.layer.rect(0,0,2,12)
                    this.layer.fill(40,120,240,this.fade)
                    this.layer.triangle(-2,-6,2,-6,0,-4)
                    this.layer.fill(200,this.fade)
                    this.layer.triangle(-2,6,2,6,0,9)
                break
                case 49:
                    this.layer.fill(40,130,255,this.fade*0.25)
                    regStar(this.layer,0,0,5,20,20,8,8,this.time*12)
                    this.layer.fill(220,this.fade*0.5)
                    regStar(this.layer,0,0,5,16,16,5,5,this.time*12)
                    this.layer.fill(160,this.fade*0.5)
                    regStar(this.layer,0,0,5,16,16,2,2,this.time*12)
                break
                case 50:
                    this.layer.rotate(this.time*15)
                    this.layer.fill(60,70,80,this.fade*0.5)
                    this.layer.beginShape()
                    for(let a=0,la=6;a<la;a++){
                        this.layer.vertex(6*lsin(a*60),6*lcos(a*60))
                        this.layer.bezierVertex(12*lsin(a*60+20),12*lcos(a*60+20),16*lsin(a*60+40),16*lcos(a*60+40),18*lsin(a*60+60),18*lcos(a*60+60))
                    }
                    this.layer.vertex(0,6)
                    this.layer.endShape()
                    this.layer.fill(200,205,210,this.fade*0.5)
                    this.layer.beginShape()
                    for(let a=0,la=6;a<la;a++){
                        this.layer.vertex(lsin(a*60),lcos(a*60))
                        this.layer.bezierVertex(7*lsin(a*60+20),7*lcos(a*60+20),12*lsin(a*60+40),12*lcos(a*60+40),16*lsin(a*60+60),16*lcos(a*60+60))
                    }
                    this.layer.vertex(0,6)
                    this.layer.endShape()
                break
                case 51:
                    this.layer.rotate(this.time*10)
                    for(let a=0,la=3;a<la;a++){
                        this.layer.fill(50,255,50,this.fade*0.5)
                        this.layer.arc(0,0,12,12,a*120,60+a*120)
                        this.layer.fill(50,150,255,this.fade*0.5)
                        this.layer.arc(0,0,12,12,-60+a*120,a*120)
                        this.layer.fill(50,255,125,this.fade*0.5)
                        this.layer.arc(0,0,8,8,a*120,60+a*120)
                        this.layer.fill(75,200,255,this.fade*0.5)
                        this.layer.arc(0,0,8,8,-60+a*120,a*120)
                        this.layer.fill(50,255,200,this.fade*0.5)
                        this.layer.arc(0,0,4,4,a*120,60+a*120)
                        this.layer.fill(100,255,255,this.fade*0.5)
                        this.layer.arc(0,0,4,4,-60+a*120,a*120)
                    }
                break
                case 52:
                    this.layer.rotate(this.time*18)
                    this.layer.fill(180,180,240,this.fade)
                    this.layer.ellipse(0,0,10,10)
                    this.layer.fill(60,150,255,this.fade)
                    for(let a=0,la=5;a<la;a++){
                        this.layer.quad(0,0,-0.5,2,0,4,0.5,2)
                        this.layer.rotate(72)
                    }
                break
                case 53:
                    this.layer.stroke(200,100,255,this.fade)
                    this.layer.strokeWeight(5)
                    for(let a=0,la=this.ticks;a<la;a++){
                        this.layer.line(
                            map(a/la,0,1,0,this.position2.x)+(a==0?0:this.sets[a-1][0]),
                            map(a/la,0,1,0,this.position2.y)+(a==0?0:this.sets[a-1][1]),
                            map((a+1)/la,0,1,0,this.position2.x)+this.sets[a][0],
                            map((a+1)/la,0,1,0,this.position2.y)+this.sets[a][1])
                    }
                break
                case 54:
                    this.layer.fill(40,70,90,this.fade)
                    regStar(this.layer,0,0,9,3,3,1,1,0)
                    this.layer.fill(80,140,180,this.fade)
                    regStar(this.layer,0,0,9,2.4,2.4,0.8,0.8,20)
                break
                case 55:
                    this.layer.stroke(230,125,160,this.fade)
                    this.layer.strokeWeight(5)
                    for(let a=0,la=this.ticks;a<la;a++){
                        this.layer.line(
                            map(a/la,0,1,0,this.position2.x)+(a==0?0:this.sets[a-1][0]),
                            map(a/la,0,1,0,this.position2.y)+(a==0?0:this.sets[a-1][1]),
                            map((a+1)/la,0,1,0,this.position2.x)+this.sets[a][0],
                            map((a+1)/la,0,1,0,this.position2.y)+this.sets[a][1])
                    }
                break
                case 56: case 211:
                    this.layer.fill(...this.color,this.fade)
                    this.layer.ellipse(0,0,12,12)
                break
                case 57:
                    this.layer.rotate(this.time*3)
                    this.layer.fill(150,50,150,this.fade)
                    this.layer.beginShape()
                    this.layer.vertex(0,5)
                    for(let a=0,la=8;a<la;a++){
                        this.layer.bezierVertex(lsin(a*45+15)*6.5,lcos(a*45+15)*6.5,lsin(a*45+30)*6.5,lcos(a*45+30)*6.5,lsin(a*45+45)*5,lcos(a*45+45)*5)
                    }
                    this.layer.endShape()
                break
                case 58: case 59:
                    this.layer.stroke(200,255,125,this.fade*0.5)
                    this.layer.strokeWeight(this.type==59?6:3)
                    for(let a=0,la=this.ticks;a<la;a++){
                        this.layer.line(
                            map(a/la,0,1,0,this.position2.x)+(a==0?0:this.sets[a-1][0]),
                            map(a/la,0,1,0,this.position2.y)+(a==0?0:this.sets[a-1][1]),
                            map((a+1)/la,0,1,0,this.position2.x)+this.sets[a][0],
                            map((a+1)/la,0,1,0,this.position2.y)+this.sets[a][1])
                    }
                break
                case 60:
                    this.layer.rotate(this.time*-3)
                    this.layer.fill(0,50,150,this.fade)
                    this.layer.beginShape()
                    this.layer.vertex(0,5)
                    for(let a=0,la=6;a<la;a++){
                        this.layer.bezierVertex(lsin(a*60+10)*5,lcos(a*60+10)*5,lsin(a*60+20)*7,lcos(a*60+20)*7,lsin(a*60+30)*7,lcos(a*60+30)*7)
                        this.layer.bezierVertex(lsin(a*60+40)*7,lcos(a*60+40)*7,lsin(a*60+50)*5,lcos(a*60+50)*5,lsin(a*60+60)*5,lcos(a*60+60)*5)
                    }
                    this.layer.endShape()
                break
                case 61:
                    this.layer.rotate(this.time*-5)
                    this.layer.fill(255,this.fade)
                    this.layer.arc(0,0,20,20,-180,0)
                    this.layer.fill(50,225,50,this.fade)
                    this.layer.arc(0,0,20,20,0,180)
                    this.layer.ellipse(5,0,10)
                    this.layer.fill(255,this.fade)
                    this.layer.ellipse(-5,0,10)
                    this.layer.ellipse(5,0,3)
                    this.layer.fill(50,225,50,this.fade)
                    this.layer.ellipse(-5,0,3)
                break
                case 62:
                    this.layer.rotate(this.time*-5)
                    this.layer.fill(255,this.fade)
                    this.layer.arc(0,0,20,20,-180,0)
                    this.gradient=new p5.LinearGradient(0,20)
                    this.gradient.colors(0.0,color(55,90,120),1.0,color(220,230,125))
                    this.layer.fillGradient(this.gradient)
                    this.layer.translate(-5,-5)
                    this.layer.arc(5,5,20,20,0,180)
                    this.layer.ellipse(10,5,10)
                    this.layer.pop()
                    this.layer.push()
                    this.layer.translate(this.position.x,this.position.y)
                    this.layer.scale(this.size*this.scale)
                    this.layer.rotate(this.time*-5)
                    this.layer.noStroke()
                    this.layer.fill(255,this.fade)
                    this.layer.arc(-5,0,10,10,0,180)
                    this.layer.ellipse(5,0,3)
                    this.layer.fill(55,90,120,this.fade)
                    this.layer.ellipse(-5,0,3)
                break
                case 63:
                    this.layer.rotate(this.time*-5)
                    this.layer.fill(255,this.fade)
                    this.layer.arc(0,0,20,20,-180,0)
                    this.gradient=new p5.LinearGradient(0,20)
                    this.gradient.colors(0.0,color(60,110,60),1.0,color(240,115,200))
                    this.layer.fillGradient(this.gradient)
                    this.layer.translate(-5,-5)
                    this.layer.arc(5,5,20,20,0,180)
                    this.layer.ellipse(10,5,10)
                    this.layer.pop()
                    this.layer.push()
                    this.layer.translate(this.position.x,this.position.y)
                    this.layer.scale(this.size*this.scale)
                    this.layer.rotate(this.time*-5)
                    this.layer.noStroke()
                    this.layer.fill(255,this.fade)
                    this.layer.arc(-5,0,10,10,0,180)
                    this.layer.ellipse(5,0,3)
                    this.layer.fill(60,110,60,this.fade)
                    this.layer.ellipse(-5,0,3)
                break
                case 64:
                    this.layer.rotate(this.time*-5)
                    this.layer.fill(255,this.fade)
                    this.layer.arc(0,0,20,20,-180,0)
                    this.gradient=new p5.LinearGradient(0,20)
                    this.gradient.colors(0.0,color(65,95,140),1.0,color(255,140,135))
                    this.layer.fillGradient(this.gradient)
                    this.layer.translate(-5,-5)
                    this.layer.arc(5,5,20,20,0,180)
                    this.layer.ellipse(10,5,10)
                    this.layer.pop()
                    this.layer.push()
                    this.layer.translate(this.position.x,this.position.y)
                    this.layer.scale(this.size*this.scale)
                    this.layer.rotate(this.time*-5)
                    this.layer.noStroke()
                    this.layer.fill(255,this.fade)
                    this.layer.arc(-5,0,10,10,0,180)
                    this.layer.ellipse(5,0,3)
                    this.layer.fill(65,95,140,this.fade)
                    this.layer.ellipse(-5,0,3)
                break
                case 65:
                    this.layer.rotate(this.time)
                    this.layer.noFill()
                    this.layer.strokeWeight(0.1)
                    this.layer.stroke(240,240,200,this.fade*2)
                    this.layer.rect(0,0,10)
                    this.layer.rect(0,0,9)
                    this.layer.rotate(45)
                    this.layer.stroke(220,220,180,this.fade*2)
                    this.layer.rect(0,0,10)
                    this.layer.rect(0,0,9)
                break
                case 66:
                    this.layer.noFill()
                    this.layer.strokeWeight(0.1)
                    this.layer.stroke(240,240,200,this.fade*2)
                    regPoly(this.layer,0,0,8,5,5,-this.time)
                    regPoly(this.layer,0,0,8,4.5,4.5,-this.time)
                    this.layer.stroke(220,220,180,this.fade*2)
                    regPoly(this.layer,0,0,8,3,3,this.time)
                    regPoly(this.layer,0,0,8,2.5,2.5,this.time)
                break
                case 67:
                    this.layer.stroke(200,255,200,this.fade*0.5)
                    this.layer.strokeWeight(this.fade*10)
                    for(let a=0,la=this.ticks;a<la;a++){
                        this.layer.line(
                            map(a/la,0,1,0,this.position2.x)+(a==0?0:this.sets[a-1][0]),
                            map(a/la,0,1,0,this.position2.y)+(a==0?0:this.sets[a-1][1]),
                            map((a+1)/la,0,1,0,this.position2.x)+this.sets[a][0],
                            map((a+1)/la,0,1,0,this.position2.y)+this.sets[a][1])
                    }
                break
                case 68:
                    this.layer.rotate(this.time)
                    this.layer.noFill()
                    this.layer.strokeWeight(0.1)
                    this.layer.stroke(240,240,200,this.fade*2)
                    regTriangle(this.layer,0,0,5,5,0)
                    regTriangle(this.layer,0,0,4.5,4.5,0)
                    this.layer.stroke(220,220,180,this.fade*2)
                    regTriangle(this.layer,0,0,5,5,60)
                    regTriangle(this.layer,0,0,4.5,4.5,60)
                break
                case 69:
                    this.layer.fill(255,255,200,this.fade)
                    this.layer.stroke(255,255,200,this.fade)
                    this.layer.strokeWeight(1)
                    for(let a=0,la=this.ticks;a<la;a++){
                        if(a<this.time*3){
                            let dir=atan2(
                                map(a/la,0,1,0,this.position2.x)+(a==0?0:this.sets[a-1][0])-map((a+1)/la,0,1,0,this.position2.x)-this.sets[a][0],
                                map(a/la,0,1,0,this.position2.y)+(a==0?0:this.sets[a-1][1])-map((a+1)/la,0,1,0,this.position2.y)-this.sets[a][1],
                            )
                            this.layer.quad(
                                map(a/la,0,1,0,this.position2.x)+(a==0?0:this.sets[a-1][0]),
                                map(a/la,0,1,0,this.position2.y)+(a==0?0:this.sets[a-1][1]),
                                map((a+0.5)/la,0,1,0,this.position2.x)+(a==0?0:this.sets[a-1][0])*0.5+this.sets[a][0]*0.5+lcos(dir)*2,
                                map((a+0.5)/la,0,1,0,this.position2.y)+(a==0?0:this.sets[a-1][1])*0.5+this.sets[a][1]*0.5-lsin(dir)*2,
                                map((a+1)/la,0,1,0,this.position2.x)+this.sets[a][0],
                                map((a+1)/la,0,1,0,this.position2.y)+this.sets[a][1],
                                map((a+0.5)/la,0,1,0,this.position2.x)+(a==0?0:this.sets[a-1][0])*0.5+this.sets[a][0]*0.5-lcos(dir)*2,
                                map((a+0.5)/la,0,1,0,this.position2.y)+(a==0?0:this.sets[a-1][1])*0.5+this.sets[a][1]*0.5+lsin(dir)*2
                            )
                        }
                    }
                break
                case 70:
                    this.layer.stroke(100,255,100,this.fade)
                    for(let a=0,la=this.ticks;a<la;a++){
                        this.layer.strokeWeight(4+a%2*2)
                        this.layer.line(
                            map(a/la,0,1,0,this.position2.x)+(a==0?0:this.sets[a-1][0]),
                            map(a/la,0,1,0,this.position2.y)+(a==0?0:this.sets[a-1][1]),
                            map((a+1)/la,0,1,0,this.position2.x)+this.sets[a][0],
                            map((a+1)/la,0,1,0,this.position2.y)+this.sets[a][1])
                    }
                break
                case 71:
                    this.layer.stroke(255,150,100,this.fade)
                    for(let a=0,la=this.ticks;a<la;a++){
                        this.layer.strokeWeight(4+a%2*2)
                        this.layer.line(
                            map(a/la,0,1,0,this.position2.x)+(a==0?0:this.sets[a-1][0]),
                            map(a/la,0,1,0,this.position2.y)+(a==0?0:this.sets[a-1][1]),
                            map((a+1)/la,0,1,0,this.position2.x)+this.sets[a][0],
                            map((a+1)/la,0,1,0,this.position2.y)+this.sets[a][1])
                    }
                break
                case 72:
                    this.layer.rotate(this.time)
                    this.layer.noFill()
                    this.layer.strokeWeight(0.1)
                    this.layer.stroke(200,240,240,this.fade*2)
                    this.layer.rect(0,0,8,12)
                    this.layer.rect(0,0,7,11)
                    this.layer.rotate(45)
                    this.layer.stroke(180,220,220,this.fade*2)
                    this.layer.rect(0,0,8,12)
                    this.layer.rect(0,0,7,11)
                break
                case 73:
                    this.layer.rotate(this.time)
                    this.layer.noFill()
                    this.layer.strokeWeight(0.1)
                    this.layer.stroke(200,240,240,this.fade*2)
                    for(let a=0,la=5;a<la;a++){
                        this.layer.line(lsin(a*144)*6,lcos(a*144)*6,lsin(a*144+144)*6,lcos(a*144+144)*6)
                    }
                break
                case 74:
                    this.layer.rotate(this.time)
                    this.layer.noFill()
                    this.layer.strokeWeight(0.1)
                    this.layer.stroke(240,240,200,this.fade*2)
                    this.layer.rect(0,0,10)
                    this.layer.rect(0,0,9)
                    this.layer.rect(0,0,2,8)
                    this.layer.rect(0,0,8,2)
                    this.layer.line(-3,-3,3,3)
                    this.layer.line(-3,3,3,-3)
                break
                case 75:
                    this.layer.rotate(this.time)
                    this.layer.noFill()
                    this.layer.strokeWeight(0.1)
                    this.layer.stroke(200,240,240,this.fade*2)
                    this.layer.rect(0,0,10)
                    regPoly(this.layer,0,0,8,5,5,22.5)
                break
                case 76:
                    this.layer.rotate(this.time)
                    this.layer.noFill()
                    this.layer.strokeWeight(0.2)
                    this.layer.stroke(240,40,40,this.fade*2)
                    this.layer.arc(0,0,10,10,-50,50)
                    this.layer.arc(0,0,8,8,130,230)
                    this.layer.stroke(240,240,40,this.fade*2)
                    this.layer.arc(0,0,10,10,70,170)
                    this.layer.arc(0,0,8,8,-110,-10)
                    this.layer.stroke(120,20,120,this.fade*2)
                    this.layer.arc(0,0,10,10,-170,-70)
                    this.layer.arc(0,0,8,8,10,110)
                break
                case 77:
                    this.layer.textSize(20)
                    this.layer.fill(0,255,0,this.fade)
                    this.layer.stroke(0,this.fade)
                    this.layer.strokeWeight(1)
                    this.layer.text(tennify(this.value),0,0)
                break
                case 78:
                    this.layer.rotate(this.direction)
                    this.layer.fill(75,225,75,this.fade)
                    this.layer.rect(0,0,9,17)
                    this.layer.fill(225,this.fade)
                    this.layer.rect(0,0,7,15)
                    this.layer.fill(75,225,75,this.fade)
                    this.layer.rect(-2,0,1,4)
                    this.layer.rect(2,0,1,4)
                    this.layer.rect(0,-1.5,5,1)
                    this.layer.rect(0,1.5,5,1)
                    this.layer.rect(0,0,1,10)
                break
                case 79:
                    this.layer.rotate(this.direction)
                    this.layer.fill(255,200,150,this.fade)
                    this.layer.ellipse(0,0,32)
                    this.layer.fill(255,225,200,this.fade*0.5)
                    regStar(this.layer,0,0,9,16,16,24,24,0)
                    regStar(this.layer,0,0,9,16,16,24,24,20)
                break
                case 80:
                    this.layer.rotate(-this.time)
                    this.layer.noFill()
                    this.layer.strokeWeight(0.25)
                    this.layer.stroke(120,240,120,this.fade*2)
                    this.layer.beginShape()
                    this.layer.vertex(0,5)
                    for(let a=0,la=8;a<la;a++){
                        this.layer.bezierVertex(lsin(a*45+15)*6.5,lcos(a*45+15)*6.5,lsin(a*45+30)*6.5,lcos(a*45+30)*6.5,lsin(a*45+45)*5,lcos(a*45+45)*5)
                    }
                    this.layer.endShape()
                    this.layer.beginShape()
                    this.layer.vertex(0,5)
                    for(let a=0,la=8;a<la;a++){
                        this.layer.bezierVertex(lsin(a*45+15)*3.5,lcos(a*45+15)*3.5,lsin(a*45+30)*6.5,lcos(a*45+30)*6.5,lsin(a*45+45)*5,lcos(a*45+45)*5)
                    }
                    this.layer.endShape()
                break
                case 81:
                    this.layer.fill(120-this.color*240,this.color*240,240,this.fade*0.5)
                    this.layer.stroke(80-this.color*160,this.color*160,160,this.fade)
                    this.layer.strokeWeight(2)
                    regPoly(this.layer,0,0,5,8,8,this.position.y*3+this.spin)
                    this.layer.strokeWeight(3)
                    this.layer.point(0,0)
                break
                case 82:
                    this.layer.rotate(this.direction)
                    this.layer.fill(75,225,75,this.fade)
                    this.layer.ellipse(0,0,13)
                    this.layer.fill(225,this.fade)
                    this.layer.ellipse(0,0,12)
                    this.layer.fill(75,225,75,this.fade)
                    this.layer.rect(0,0,10,1)
                    this.layer.rect(0,-3,7,1)
                    this.layer.rect(0,3,7,1)
                    this.layer.rect(0,0,1,7)
                break
                case 83:
                    this.layer.rotate(this.direction)
                    this.layer.fill(240,240,120,this.fade*0.5)
                    regStar(this.layer,0,0,12,6,6,15,15,0)
                    this.layer.fill(225,225,75,this.fade)
                    this.layer.rect(0,0,9,17)
                    this.layer.fill(225,this.fade)
                    this.layer.rect(0,0,7,15)
                    this.layer.fill(225,225,75,this.fade)
                    this.layer.rect(-2,0,1,4)
                    this.layer.rect(2,0,1,4)
                    this.layer.rect(0,-1.5,5,1)
                    this.layer.rect(0,1.5,5,1)
                    this.layer.rect(0,0,1,10)
                break
                case 84:
                    this.layer.rotate(-this.time*4)
                    this.layer.noFill()
                    this.layer.stroke(240,this.fade)
                    this.layer.strokeWeight(2)
                    regStar(this.layer,0,0,5,10,10,5,5,0)
                    regStar(this.layer,0,0,5,2.5,2.5,5,5,0)
                    this.layer.stroke(180,this.fade)
                    this.layer.strokeWeight(2)
                    regStar(this.layer,0,0,5,10,10,5,5,0)
                    regStar(this.layer,0,0,5,2.5,2.5,5,5,0)
                break
                case 85:
                    this.layer.noFill()
                    this.layer.strokeWeight(1)
                    this.layer.stroke(240,this.fade)
                    regStar(this.layer,0,0,5,8,8,6,6,this.time*2)
                    this.layer.stroke(180,this.fade)
                    regStar(this.layer,0,0,5,6,6,4,4,-this.time*2)
                break
                case 86:
                    this.layer.rotate(this.position.x+this.position.y)
                    this.layer.fill(240,this.fade)
                    for(let a=0,la=30;a<la;a++){
                        this.layer.rotate(360/la)
                        this.layer.ellipse(0,5+5*abs(lcos(a/la*5*180)),1,2)
                    }
                    this.layer.fill(180,this.fade)
                    for(let a=0,la=30;a<la;a++){
                        this.layer.rotate(360/la)
                        this.layer.ellipse(0,5+5*abs(lcos(a/la*5*180)),0.6,1.2)
                    }
                break
                case 87:
                    for(let a=0,la=2;a<la;a++){
                        this.layer.stroke(240-a*60,this.fade)
                        this.layer.strokeWeight(4-a*2)
                        this.layer.line(0,0,this.position2.x,this.position2.y)
                        this.layer.strokeWeight(2-a)
                        for(let b=0,lb=this.ticks;b<lb;b++){
                            this.layer.line(
                                map(b/lb,0,1,0,this.position2.x)+(b==0?0:this.sets[b-1][0]),
                                map(b/lb,0,1,0,this.position2.y)+(b==0?0:this.sets[b-1][1]),
                                map((b+1)/lb,0,1,0,this.position2.x)+this.sets[b][0],
                                map((b+1)/lb,0,1,0,this.position2.y)+this.sets[b][1])
                        }
                    }
                break
                case 88:
                    this.layer.rotate(this.time*-5)
                    this.layer.noFill()
                    for(let a=0,la=2;a<la;a++){
                        this.layer.stroke(240,160+a*80,200+a*40,this.fade*(0.5+a*0.5))
                        this.layer.strokeWeight(2-a)
                        for(let b=0,lb=5;b<lb;b++){
                            this.layer.rotate(360/lb)
                            this.layer.bezier(0,0,-5,5,5,5,0,10)
                        }
                    }
                break
                case 89:
                    this.layer.scale(0.8)
                    this.layer.translate(0,24)
                    this.layer.noStroke()
                    this.layer.fill(75,70,80,this.fade)
                    this.layer.arc(0,-36,48,48,0,54)
                    this.layer.arc(0,-36,48,48,126,180)
                    this.layer.quad(0,-38,-lcos(54)*24,-36+lsin(54)*24,0,-36+24/lsin(54),lcos(54)*24,-36+lsin(54)*24)
                    this.layer.fill(95,90,100,this.fade)
                    this.layer.ellipse(0,-36,48,8)
                    this.layer.fill(220,220,220,this.fade)
                    for(let a=0,la=30;a<la;a++){
                        let spin=a/la*360+this.time*0.5
                        if(lcos(spin)>0){
                            this.layer.beginShape()
                            this.layer.vertex(lsin(spin)*24,lcos(spin)*4-32)
                            this.layer.vertex(lsin(spin)*28-lcos(spin)*2,lcos(spin)*4-24)
                            this.layer.vertex(lsin(spin)*27.5,lcos(spin)*4-25)
                            this.layer.vertex(lsin(spin)*30,lcos(spin)*4-20)
                            this.layer.vertex(lsin(spin)*26+lcos(spin)*2,lcos(spin)*4-28)
                            this.layer.vertex(lsin(spin)*26.5,lcos(spin)*4-27)
                            this.layer.endShape()
                        }
                    }
                    this.layer.fill(165,105,45,this.fade)
                    for(let a=0,la=30;a<la;a++){
                        let spin=a/la*360+this.time*0.5
                        if(lcos(spin)>0){
                            this.layer.ellipse(lsin(spin)*24,lcos(spin)*4-33,5*lcos(spin),4)
                        }
                    }
                break
                case 90:
                    this.layer.rotate(this.position.x+this.position.y)
                    this.layer.fill(140,105,140,this.fade)
                    for(let a=0,la=36;a<la;a++){
                        this.layer.rotate(360/la)
                        this.layer.ellipse(0,8-a%6,2,2)
                    }
                    this.layer.fill(240,220,240,this.fade)
                    for(let a=0,la=36;a<la;a++){
                        this.layer.rotate(360/la)
                        this.layer.ellipse(0,8-a%6,1.2,1.2)
                    }
                break
                case 91:
                    for(let a=0,la=6;a<la;a++){
                        this.layer.stroke([255,255,255][a%3],[0,150,255,2][a%3],[0,0,0,50][a%3],this.fade)
                        this.layer.strokeWeight(6)
                        this.layer.line(this.position2.x*a/12,this.position2.y*a/12,this.position2.x*(1-a/12),this.position2.y*(1-a/12))
                    }
                break
                case 92:
                    this.layer.stroke(50,200,150,this.fade*0.1)
                    for(let a=0,la=5;a<la;a++){
                        this.layer.strokeWeight(15-a*3)
                        this.layer.line(0,0,this.position2.x,this.position2.y)
                    }
                break
                case 93:
                    this.layer.rotate(this.direction-this.time*10)
                    this.layer.fill(200,40,20,this.fade)
                    for(let a=0,la=36;a<la;a++){
                        this.layer.rotate(360/la)
                        this.layer.quad(0,abs(a%9-4)*4+6,-1,abs(a%9-4)*4+4,0,abs(a%9-4)*4+2,1,abs(a%9-4)*4+4)
                    }
                    this.layer.fill(150,30,15,this.fade)
                    for(let a=0,la=36;a<la;a++){
                        this.layer.rotate(360/la)
                        this.layer.quad(0,abs(a%9-4)*4+5,-0.5,abs(a%9-4)*4+4,0,abs(a%9-4)*4+3,0.5,abs(a%9-4)*4+4)
                    }
                break
                case 94:
                    this.layer.stroke([255,255,255,100,100,200][this.color],[150,200,255,255,200,100][this.color],[100,100,100,150,255,225][this.color],this.fade*0.5)
                    this.layer.strokeWeight(1.2)
                    regStar(this.layer,0,0,5,8,8,3.3,3.3,this.position.y*3)
                    this.layer.strokeWeight(0.6)
                    regStar(this.layer,0,0,5,8,8,3.3,3.3,this.position.y*3)
                    this.layer.fill(255)
                    regStar(this.layer,0,0,5,8,8,3.3,3.3,this.position.y*3)
                break
                case 95:
                    this.layer.rotate(this.position.x+this.position.y)
                    this.layer.fill(40,120,40,this.fade)
                    for(let a=0,la=30;a<la;a++){
                        this.layer.rotate(360/la)
                        this.layer.ellipse(0,5+3*lcos(a/la*5*360),0.8,2.4)
                    }
                    this.layer.fill(80,240,80,this.fade)
                    for(let a=0,la=30;a<la;a++){
                        this.layer.rotate(360/la)
                        this.layer.ellipse(0,5+3*lcos(a/la*5*360),0.5,1.5)
                    }
                break
                case 96:
                    this.layer.rotate(this.time*-5)
                    this.layer.fill(255,this.fade)
                    this.layer.arc(0,0,20,20,-180,0)
                    this.gradient=new p5.LinearGradient(0,20)
                    this.gradient.colors(0.0,color(89,84,89),1.0,color(85,34,63))
                    this.layer.fillGradient(this.gradient)
                    this.layer.translate(-5,-5)
                    this.layer.arc(5,5,20,20,0,180)
                    this.layer.ellipse(10,5,10)
                    this.layer.pop()
                    this.layer.push()
                    this.layer.translate(this.position.x,this.position.y)
                    this.layer.scale(this.size*this.scale)
                    this.layer.rotate(this.time*-5)
                    this.layer.noStroke()
                    this.layer.fill(255,this.fade)
                    this.layer.arc(-5,0,10,10,0,180)
                    this.layer.ellipse(5,0,3)
                    this.layer.fill(89,84,89,this.fade)
                    this.layer.ellipse(-5,0,3)
                break
                case 97:
                    this.layer.rotate(this.position.x-this.position.y+this.time*4)
                    this.layer.fill(225,this.fade)
                    for(let a=0,la=25;a<la;a++){
                        this.layer.quad(0,0,-0.25,-11+a%5*2,0,-12+a%5*2,0.25,-11+a%5*2)
                        this.layer.rotate(360/la)
                    }
                break
                case 98:
                    this.layer.rotate(this.direction)
                    this.layer.fill(200,this.fade)
                    this.layer.rect(0,1,4,4)
                    this.layer.arc(0,-1,4,6,-180,0)
                    this.layer.stroke(100,255,100,this.fade)
                    this.layer.strokeWeight(1)
                    this.layer.noFill()
                    this.layer.arc(0,-1,8,10,-180,0)
                    this.layer.line(-4,-1,-4,5)
                    this.layer.line(4,-1,4,5)
                    this.layer.line(-4,5,4,5)
                break
                case 99:
                    this.layer.noFill()
                    this.layer.strokeWeight(0.5)
                    this.layer.stroke(250,25,25,this.fade*2)
                    this.layer.rect(0,0,10)
                    this.layer.rect(0,0,9)
                    this.layer.rotate(45)
                    this.layer.rect(0,0,10)
                    this.layer.rect(0,0,9)
                    this.layer.strokeWeight(0.3)
                    this.layer.stroke(250,250,225,this.fade*2)
                    this.layer.rect(0,0,10)
                    this.layer.rect(0,0,9)
                    this.layer.rotate(45)
                    this.layer.rect(0,0,10)
                    this.layer.rect(0,0,9)
                break
                case 100:
                    this.layer.rotate(this.time*-5)
                    this.layer.stroke(255,125,125,this.fade)
                    this.layer.strokeWeight(1.5)
                    this.layer.noFill()
                    this.layer.arc(0,0,6,30,-90,90)
                    this.layer.noStroke()
                    this.layer.fill(255,this.fade)
                    this.layer.arc(0,0,20,20,-180,0)
                    this.layer.fill(255,25,25,this.fade)
                    this.layer.arc(0,0,20,20,0,180)
                    this.layer.ellipse(5,0,10)
                    this.layer.fill(255,this.fade)
                    this.layer.ellipse(-5,0,10)
                    this.layer.ellipse(5,0,3)
                    this.layer.fill(255,25,25,this.fade)
                    this.layer.ellipse(-5,0,3)
                    this.layer.stroke(255,125,125,this.fade)
                    this.layer.strokeWeight(1.5)
                    this.layer.noFill()
                    this.layer.arc(0,0,6,30,90,270)
                break
                case 101:
                    this.layer.rotate(this.direction)
                    this.layer.fill(225,25,25,this.fade)
                    this.layer.rect(0,0,9,17)
                    this.layer.fill(240,235,215,this.fade)
                    this.layer.rect(0,0,7,15)
                    this.layer.fill(225,25,25,this.fade)
                    this.layer.rect(-2,0,1,5)
                    this.layer.rect(2,0,1,5)
                    this.layer.rect(0,-2,5,1)
                    this.layer.rect(0,2,5,1)
                    this.layer.rect(0,0,1,1)
                    this.layer.rect(0,-4,1,5)
                    this.layer.rect(0,4,1,5)
                    this.layer.rect(0,-6,5,1)
                    this.layer.rect(0,6,5,1)
                    this.layer.rect(-2,-5.5,1,2)
                    this.layer.rect(2,-5.5,1,2)
                    this.layer.rect(-2,5.5,1,2)
                    this.layer.rect(2,5.5,1,2)
                break
                case 102:
                    this.layer.fill(180+this.color*15,180+this.color*15,180-this.color*15,this.fade*0.5)
                    this.layer.stroke(180+this.color*15,180+this.color*15,180-this.color*15,this.fade)
                    this.layer.strokeWeight(2)
                    regStar(this.layer,0,0,5,12,12,5,5,this.position.y*3)
                break
                case 103:
                    this.layer.rotate(this.direction)
                    for(let a=0,la=5;a<la;a++){
                        this.layer.fill(0,100,225,this.fade)
                        this.layer.quad(0,0,-1,-4,0,-12,1,-4)
                        this.layer.fill(50,0,125,this.fade)
                        this.layer.quad(0,0,-0.5,-2,0,-8,0.5,-2)
                        this.layer.rotate(360/la)
                    }
                break
                case 104:
                    this.layer.rotate(this.direction+this.time*3)
                    for(let a=0,la=10;a<la;a++){
                        this.layer.fill(255,100+a*15,0,this.fade)
                        for(let b=0,lb=6;b<lb;b++){
                            this.layer.quad(-1*(1-a/la),-5,0,-5+3*(1-a/la),1*(1-a/la),-5,0,-5-3*(1-a/la))
                            this.layer.rotate(360/lb)
                        }
                        this.layer.rotate(2)
                    }
                break
                case 105:
                    this.layer.rotate(this.direction)
                    this.layer.scale(0.8)
                    this.layer.stroke(90,0,120,this.fade)
                    this.layer.strokeWeight(3)
                    this.layer.line(0,-8,-6,-2)
                    this.layer.line(0,-8,6,-2)
                    this.layer.line(-6,-2,-10,6)
                    this.layer.line(6,-2,10,6)
                    this.layer.strokeWeight(6)
                    this.layer.point(0,6)
                    this.layer.stroke(45,0,60,this.fade)
                    this.layer.strokeWeight(2)
                    this.layer.line(0,-8,-6,-2)
                    this.layer.line(0,-8,6,-2)
                    this.layer.line(-6,-2,-10,6)
                    this.layer.line(6,-2,10,6)
                    this.layer.strokeWeight(4)
                    this.layer.point(0,6)
                break
                case 106:
                    this.layer.textSize(20)
                    this.layer.fill(255,255,100,this.fade)
                    this.layer.stroke(0,this.fade)
                    this.layer.strokeWeight(1)
                    this.layer.text(this.value,0,0)
                break
                case 107:
                    this.layer.noFill()
                    this.layer.stroke(255,255,100,this.fade*0.1)
                    for(let a=0,la=6;a<la;a++){
                        this.layer.strokeWeight(12-a*2)
                        this.layer.line(0,0,this.position2.x,this.position2.y)
                        this.layer.strokeWeight(6-a)
                        for(let b=0,lb=round(dist(0,0,this.position2.x,this.position2.y)/30);b<lb;b++){
                            this.layer.push()
                            this.layer.translate(this.position2.x*(b+1)/lb,this.position2.y*(b+1)/lb)
                            this.layer.rotate(atan2(this.position2.x,-this.position2.y))
                            this.layer.ellipse(0,0,25,10)
                            this.layer.pop()
                        }
                    }
                break
                case 108:
                    this.layer.rotate(this.direction)
                    this.layer.fill(255,this.fade)
                    this.layer.ellipse(0,0,32)
                    this.layer.fill(225,this.fade*0.5)
                    regStar(this.layer,0,0,11,12,12,20,20,this.time)
                    regStar(this.layer,0,0,11,12,12,20,20,180/11+this.time)
                break
                case 109:
                    if(this.points.length>=2){
                        this.layer.stroke(255,this.fade)
                        this.layer.strokeWeight(1)
                        this.layer.noFill()
                        /*this.layer.curve(
                            this.points[this.points.length-1][0]-this.position.x,this.points[this.points.length-1][1]-this.position.y,
                            this.points[this.points.length-1][0]-this.position.x,this.points[this.points.length-1][1]-this.position.y,
                            this.points[max(round(this.points.length*2/3),this.points.length-11)][0]-this.position.x,this.points[max(round(this.points.length*2/3),this.points.length-11)][1]-this.position.y,
                            this.points[max(round(this.points.length/3),this.points.length-21)][0]-this.position.x,this.points[max(round(this.points.length/3),this.points.length-21)][1]-this.position.y
                        )*/
                            this.layer.bezier(
                                this.points[this.points.length-1][0]-this.position.x,this.points[this.points.length-1][1]-this.position.y,
                                this.points[max(round(this.points.length*2/3),this.points.length-9)][0]-this.position.x,this.points[max(round(this.points.length*2/3),this.points.length-9)][1]-this.position.y,
                                this.points[max(round(this.points.length/3),this.points.length-17)][0]-this.position.x,this.points[max(round(this.points.length/3),this.points.length-17)][1]-this.position.y,
                                this.points[max(0,this.points.length-25)][0]-this.position.x,this.points[max(0,this.points.length-25)][1]-this.position.y
                            )
                            /*let keypoints=[
                                this.points[this.points.length-1][0]-this.position.x,this.points[this.points.length-1][1]-this.position.y,
                                this.points[max(round(this.points.length/2),this.points.length-13)][0]-this.position.x,this.points[max(round(this.points.length/2),this.points.length-13)][1]-this.position.y,
                                this.points[max(0,this.points.length-25)][0]-this.position.x,this.points[max(0,this.points.length-25)][1]-this.position.y
                            ]
                            let mid=circleMid(...keypoints)
                            if(this.curve>=0){
                                this.layer.arc(mid[0],mid[1],mid[2]*2,mid[2]*2,
                                    -90+atan2(keypoints[0]-mid[0],-keypoints[1]+mid[1]),
                                    -90+atan2(keypoints[4]-mid[0],-keypoints[5]+mid[1])
                                )
                            }else{
                                this.layer.arc(mid[0],mid[1],mid[2]*2,mid[2]*2,
                                    -90+atan2(keypoints[4]-mid[0],-keypoints[5]+mid[1]),
                                    -90+atan2(keypoints[0]-mid[0],-keypoints[1]+mid[1])
                                )
                            }*/
                        /*this.layer.curve(
                            this.points[max(round(this.points.length*2/3),this.points.length-11)][0]-this.position.x,this.points[max(round(this.points.length*2/3),this.points.length-11)][1]-this.position.y,
                            this.points[max(round(this.points.length/3),this.points.length-21)][0]-this.position.x,this.points[max(round(this.points.length/3),this.points.length-21)][1]-this.position.y,
                            this.points[max(0,this.points.length-31)][0]-this.position.x,this.points[max(0,this.points.length-31)][1]-this.position.y,
                            this.points[max(0,this.points.length-31)][0]-this.position.x,this.points[max(0,this.points.length-31)][1]-this.position.y
                        )*/
                        /*this.layer.beginShape()
                        this.layer.curveVertex(this.points[this.points.length-1][0]-this.position.x,this.points[this.points.length-1][1]-this.position.y)
                        this.layer.curveVertex(this.points[this.points.length-2][0]-this.position.x,this.points[this.points.length-2][1]-this.position.y)
                        if(this.points.length>=2){
                            if(this.points.length>=3){
                                if(this.points.length>=4){
                                    this.layer.curveVertex(this.points[max(round(this.points.length*2/3),this.points.length-11)][0]-this.position.x,this.points[max(round(this.points.length*2/3),this.points.length-11)][1]-this.position.y)
                                }
                                this.layer.curveVertex(this.points[max(round(this.points.length/3),this.points.length-21)][0]-this.position.x,this.points[max(round(this.points.length/3),this.points.length-21)][1]-this.position.y)
                            }
                            this.layer.curveVertex(this.points[max(1,this.points.length-30)][0]-this.position.x,this.points[max(1,this.points.length-30)][1]-this.position.y)
                            this.layer.curveVertex(this.points[max(0,this.points.length-31)][0]-this.position.x,this.points[max(0,this.points.length-31)][1]-this.position.y)
                        }
                        this.layer.endShape()*/
                    }
                break
                case 110:
                    this.layer.rotate(this.direction)
                    for(let a=0,la=5;a<la;a++){
                        this.layer.fill(255,100,100,this.fade)
                        this.layer.quad(0,0,-1,-4,0,-12,1,-4)
                        this.layer.fill(255,50,150,this.fade)
                        this.layer.quad(0,0,-0.5,-2,0,-8,0.5,-2)
                        this.layer.rotate(360/la)
                    }
                break
                case 111:
                    this.layer.rotate(this.direction)
                    this.layer.fill(75,225,150,this.fade)
                    this.layer.rect(0,0,9,17)
                    this.layer.fill(225,this.fade)
                    this.layer.rect(0,0,7,15)
                    this.layer.fill(75,225,150,this.fade)
                    this.layer.rect(-2,0,1,3)
                    this.layer.rect(2,0,1,3)
                    this.layer.rect(0,-1.5,5,1)
                    this.layer.rect(0,1.5,5,1)
                    this.layer.rect(0,-4.5,3,1)
                    this.layer.rect(0,4.5,3,1)
                    this.layer.rect(0,0,1,8)
                    this.layer.rect(0,0,3,1)
                break
                case 112:
                    this.layer.rotate(this.spin)
                    this.layer.scale(0.25)
                    this.layer.fill(this.color[0],this.color[1],this.color[2],this.fade)
                    this.layer.quad(-4,0,0,-12,4,0,0,12)
                    this.layer.quad(-12,0,0,-4,12,0,0,4)
                    this.layer.fill(this.color[0]*0.5+125,this.color[1]*0.5+125,this.color[2]*0.5+125,this.fade)
                    this.layer.quad(-1,0,0,-8,1,0,0,8)
                    this.layer.quad(-8,0,0,-1,8,0,0,1)
                break
                case 113:
                    this.layer.fill(180,180,240,this.fade)
                    this.layer.ellipse(0,0,3,3)
                    this.layer.fill(60,150,255,this.fade)
                    for(let a=0,la=5;a<la;a++){
                        this.layer.quad(0,0,-0.25,1,0,2,0.25,1)
                        this.layer.rotate(72)
                    }
                break
                case 114:
                    for(let a=0,la=12;a<la;a++){
                        this.layer.rotate(180/la)
                        this.layer.fill(250-a/(la-1)*500,250,-250+a/(la-1)*500,this.fade)
                        this.layer.beginShape()
                        this.layer.vertex(-1,-8)
                        this.layer.vertex(-1,-10)
                        this.layer.vertex(-2.5,-10)
                        this.layer.vertex(0,-12.5)
                        this.layer.vertex(2.5,-10)
                        this.layer.vertex(1,-10)
                        this.layer.vertex(1,-8)
                        this.layer.endShape()
                        this.layer.rotate(180/la)
                    }
                break
                case 115:
                    for(let a=0,la=12;a<la;a++){
                        this.layer.rotate(180/la)
                        this.layer.fill(250-a/(la-1)*500,250,-250+a/(la-1)*500,this.fade)
                        this.layer.beginShape()
                        this.layer.vertex(-2,-11)
                        this.layer.vertex(0,-11)
                        this.layer.vertex(0,-12.5)
                        this.layer.vertex(2.5,-10)
                        this.layer.vertex(0,-7.5)
                        this.layer.vertex(0,-9)
                        this.layer.vertex(-2,-9)
                        this.layer.endShape()
                        this.layer.rotate(180/la)
                    }
                break
                case 116:
                    for(let a=0,la=12;a<la;a++){
                        this.layer.rotate(180/la)
                        this.layer.fill(250-a/(la-1)*500,250,-250+a/(la-1)*500,this.fade)
                        this.layer.beginShape()
                        this.layer.vertex(-1,-12)
                        this.layer.vertex(-1,-10)
                        this.layer.vertex(-2.5,-10)
                        this.layer.vertex(0,-7.5)
                        this.layer.vertex(2.5,-10)
                        this.layer.vertex(1,-10)
                        this.layer.vertex(1,-11)
                        this.layer.endShape()
                        this.layer.rotate(180/la)
                    }
                break
                case 117:
                    this.layer.rotate(this.time)
                    this.layer.noFill()
                    this.layer.strokeWeight(0.2)
                    this.layer.stroke(120,20,120,this.fade*2)
                    this.layer.arc(0,0,10,10,-50,50)
                    this.layer.arc(0,0,8,8,130,230)
                    this.layer.arc(0,0,10,10,70,170)
                    this.layer.arc(0,0,8,8,-110,-10)
                    this.layer.arc(0,0,10,10,-170,-70)
                    this.layer.arc(0,0,8,8,10,110)
                break
                case 118:
                    this.layer.rotate(this.time)
                    this.layer.noFill()
                    this.layer.strokeWeight(0.2)
                    this.layer.stroke(240,240,40,this.fade*2)
                    this.layer.arc(0,0,10,10,-50,50)
                    this.layer.arc(0,0,8,8,130,230)
                    this.layer.arc(0,0,10,10,70,170)
                    this.layer.arc(0,0,8,8,-110,-10)
                    this.layer.arc(0,0,10,10,-170,-70)
                    this.layer.arc(0,0,8,8,10,110)
                break
                case 119:
                    this.layer.rotate(this.time)
                    this.layer.noFill()
                    this.layer.strokeWeight(0.2)
                    this.layer.stroke(240,40,40,this.fade*2)
                    this.layer.arc(0,0,10,10,-50,50)
                    this.layer.arc(0,0,8,8,130,230)
                    this.layer.arc(0,0,10,10,70,170)
                    this.layer.arc(0,0,8,8,-110,-10)
                    this.layer.arc(0,0,10,10,-170,-70)
                    this.layer.arc(0,0,8,8,10,110)
                break
                case 120:
                    this.layer.rotate(this.time)
                    this.layer.noFill()
                    this.layer.strokeWeight(0.4)
                    this.layer.stroke(240,40,40,this.fade*2)
                    this.layer.arc(0,0,10,10,-50,50)
                    this.layer.arc(0,0,8,8,10,110)
                    this.layer.stroke(240,240,40,this.fade*2)
                    this.layer.arc(0,0,10,10,70,170)
                    this.layer.arc(0,0,8,8,130,230)
                    this.layer.stroke(40,140,240,this.fade*2)
                    this.layer.arc(0,0,10,10,-170,-70)
                    this.layer.arc(0,0,8,8,-110,-10)
                break
                case 121:
                    this.layer.rotate(this.time)
                    for(let a=0,la=3;a<la;a++){
                        for(let b=0,lb=6;b<lb;b++){
                            this.layer.fill(50+b*25,255,50+b*25,this.fade)
                            this.layer.quad(0,0,-3,-6,0,-18,3,-6)
                            this.layer.fill(150+b*25,255,150+b*25,this.fade)
                            this.layer.quad(0,0,-1,-4,0,-12,1,-4)
                            this.layer.rotate(60)
                        }
                        this.layer.scale(0.8)
                        this.layer.rotate(15)
                    }
                break
                case 122:
                    this.layer.fill(80,0,160,this.fade)
                    regStar(this.layer,0,0,24,9,9,12,12,-this.time*2)
                    this.layer.fill(100,0,200,this.fade)
                    regStar(this.layer,0,0,24,9,9,13,13,this.time*2)
                    this.layer.fill(200,160,240,this.fade)
                    this.layer.ellipse(0,0,20)
                    this.layer.fill(60,0,120,this.fade)
                    regStar(this.layer,0,0,30,9,9,8,8,this.time)
                    this.layer.fill(30,0,60,this.fade)
                    regStar(this.layer,0,0,30,6,6,7,7,this.time)
                break
                case 123:
                    this.layer.fill(225,25,25,this.fade*0.5)
                    regStar(this.layer,0,0,12,90,90,18,18,-this.time)
                    this.layer.fill(225,225,25,this.fade*0.5)
                    regStar(this.layer,0,0,12,18,18,54,54,this.time)
                    this.layer.fill(225,25,25,this.fade)
                    this.layer.ellipse(0,0,36)
                    this.layer.fill(225,225,25,this.fade)
                    regStar(this.layer,0,0,9,6,6,15,15,-this.time)
                break
                case 124:
                    this.layer.rotate(this.direction)
                    this.layer.fill(120,this.fade*0.5)
                    this.layer.stroke(140,this.fade*10)
                    this.layer.strokeWeight(1)
                    this.layer.ellipse(0,0,20)
                    this.layer.strokeWeight(0.5)
                    for(let a=0,la=12;a<la;a++){
                        this.layer.line(10*lsin(a/la*360),10*lcos(a/la*360),50*lsin(a/la*360),50*lcos(a/la*360))
                    }
                    this.layer.noFill()
                    this.layer.strokeWeight(2)
                    for(let a=0,la=12;a<la;a++){
                        this.layer.arc(0,0,20,20,(a-0.1)/la*360,(a+0.1)/la*360)
                    }
                    this.layer.noStroke()
                    this.layer.fill(160,this.fade)
                    for(let a=0,la=60;a<la;a++){
                        this.layer.rotate(135+this.tick[a][0])
                        this.layer.quad(0,-19+a*0.3,-0.05*this.tick[a][1],-19+0.25*this.tick[a][1]+a*0.3,0,-19+0.5*this.tick[a][1]+a*0.3,0.05*this.tick[a][1],-19+0.25*this.tick[a][1]+a*0.3)
                    }
                break
                case 125:
                    this.layer.fill(125,this.fade)
                    this.layer.ellipse(0,0,10000,10000)
                break
                case 126:
                    this.layer.fill(255,50,100,this.fade)
                    this.layer.stroke(255,75,125,this.fade)
                    this.layer.strokeWeight(1.5)
                    this.layer.strokeJoin(ROUND)
                    regStarGear(this.layer,0,0,6,2,7,7,9,9,30)  
                    this.layer.strokeJoin(MITER)
                    this.layer.noStroke()
                    this.layer.fill(255,100,150,this.fade)
                    this.layer.ellipse(0,0,6)
                    for(let a=0,la=3;a<la;a++){
                        this.layer.quad(-1.5,-4.25,1.5,-4.25,0.5,-6,-0.5,-6)
                        this.layer.rotate(120)
                    }
                break
                case 127:
                    this.layer.rotate(this.direction)
                    this.layer.scale(0.6)
                    this.layer.fill(100,200,255,this.fade*0.5)
                    regStar(this.layer,0,0,5,24,24,2,2,0)
                    this.layer.fill(150,25,200,this.fade*0.5)
                    regStar(this.layer,0,0,5,24,24,2,2,180)
                    this.layer.fill(100,200,255,this.fade)
                    regStar(this.layer,0,0,5,20,20,1,1,0)
                    this.layer.fill(150,25,200,this.fade)
                    regStar(this.layer,0,0,5,20,20,1,1,180)
                    this.layer.fill(150,225,75,this.fade)
                    this.layer.ellipse(0,0,10,24)
                    this.layer.fill(100,150,50,this.fade)
                    this.layer.quad(-1,0,0,-12,1,0,0,12)
                    this.layer.rotate(-36)
                    this.layer.quad(-1,0,0,-10,1,0,0,10)
                    this.layer.rotate(72)
                    this.layer.quad(-1,0,0,-10,1,0,0,10)
                    this.layer.rotate(-36)
                break
                case 128:
                    this.layer.textSize(20)
                    this.layer.fill(this.color*250,this.color*125+125,250,this.fade)
                    this.layer.stroke(0,this.fade)
                    this.layer.strokeWeight(1)
                    this.layer.text(this.value,0,0)
                break
                case 129:
                    this.layer.rotate(this.position.x+this.position.y)
                    for(let a=0,la=40;a<la;a++){
                        let mult=this.fade+a%10*0.1+floor(a/20)*0.5
                        this.layer.rotate(360/la*2)
                        if(mult>0&&mult<1){
                            this.layer.fill(240,40,40,mult)
                            regStar(this.layer,0,20*(1-mult),8,0.4*(1-mult),0.8*(1-mult),2*(1-mult),6*(1-mult),0)
                        }
                    }
                    for(let a=0,la=40;a<la;a++){
                        let mult=this.fade+a%10*0.1+floor(a/20)*0.5
                        this.layer.rotate(360/la*2)
                        if(mult>0&&mult<1){
                            this.layer.fill(180,30,30,mult)
                            regStar(this.layer,0,20*(1-mult),8,0.24*(1-mult),0.48*(1-mult),1.2*(1-mult),3.6*(1-mult),0)
                        }
                    }
                break
                case 130:
                    this.layer.rotate(this.position.x+this.position.y-9)
                    for(let a=0,la=40;a<la;a++){
                        let mult=this.fade+a%10*0.1+floor(a/20)*0.5
                        this.layer.rotate(-360/la*2)
                        if(mult>0&&mult<1){
                            this.layer.fill(40,140,240,mult)
                            regStar(this.layer,0,20*(1-mult),8,0.4*(1-mult),0.8*(1-mult),2*(1-mult),6*(1-mult),0)
                        }
                    }
                    for(let a=0,la=40;a<la;a++){
                        let mult=this.fade+a%10*0.1+floor(a/20)*0.5
                        this.layer.rotate(-360/la*2)
                        if(mult>0&&mult<1){
                            this.layer.fill(30,105,180,mult)
                            regStar(this.layer,0,20*(1-mult),8,0.24*(1-mult),0.48*(1-mult),1.2*(1-mult),3.6*(1-mult),0)
                        }
                    }
                break
                case 131:
                    this.layer.rotate(this.direction)
                    this.layer.fill(200,200,255,this.fade)
                    this.layer.quad(-1,-12.5,0,-10,0,5,-1,5)
                    this.layer.fill(150,150,255,this.fade)
                    this.layer.quad(1,-7.5,0,-10,0,5,1,5)
                    this.layer.fill(255,255,255,this.fade)
                    this.layer.rect(0,6,5,2)
                    this.layer.rect(0,8,3,2)
                break
                case 132:
                    this.layer.fill(255,50,100,this.fade*0.5)
                    this.layer.stroke(255,75,125,this.fade*0.5)
                    this.layer.strokeWeight(0.3)
                    this.layer.strokeJoin(ROUND)
                    for(let a=0,la=10;a<la;a++){
                        regStarGear(this.layer,lsin(360*(a+this.offset)/la)*(6+a%2*3),lcos(360*(a+this.offset)/la)*(6+a%2*3),6,2,1.4,1.4,1.8,1.8,30+360*(a+this.offset)/la)
                    }
                    this.layer.strokeJoin(MITER)
                    this.layer.noStroke()
                    this.layer.fill(255,125,175,this.fade*0.1)
                    this.layer.ellipse(0,0,24)
                break
                case 133: case 194: case 217: case 218: case 219: case 232:
                    for(let a=0,la=this.notes.length;a<la;a++){
                        this.layer.rotate(360/la)
                        switch(this.type){
                            case 133:
                                this.layer.fill(100,255,100+this.notes[a][0]*155,this.fade*2)
                                this.layer.stroke(100,255,100+this.notes[a][0]*155,this.fade*2)
                            break
                            case 194:
                                this.layer.fill(255-this.notes[a][0]*40,51+this.notes[a][0]*170,73+this.notes[a][0]*178,this.fade*2)
                                this.layer.stroke(255-this.notes[a][0]*40,51+this.notes[a][0]*170,73+this.notes[a][0]*178,this.fade*2)
                            break
                            case 217:
                                this.layer.fill(120+this.notes[a][0]*80,20,120+this.notes[a][0]*80,this.fade*2)
                                this.layer.stroke(120+this.notes[a][0]*80,20,120+this.notes[a][0]*80,this.fade*2)
                            break
                            case 218:
                                this.layer.fill(240,240,40+this.notes[a][0]*120,this.fade*2)
                                this.layer.stroke(240,240,40+this.notes[a][0]*120,this.fade*2)
                            break
                            case 219:
                                this.layer.fill(240,40+this.notes[a][0]*120,40+this.notes[a][0]*120,this.fade*2)
                                this.layer.stroke(240,40+this.notes[a][0]*120,40+this.notes[a][0]*120,this.fade*2)
                            break
                            case 232:
                                this.layer.fill(200+this.notes[a][0]*40,this.fade*2)
                                this.layer.stroke(200+this.notes[a][0]*40,this.fade*2)
                            break
                        }
                        this.layer.strokeWeight(0.8)
                        switch(this.notes[a][1]){
                            case 0:
                                this.layer.ellipse(-0.7*this.notes[a][2],-28,1.4,0.8)
                                this.layer.line(0,-28,0,-32)
                                this.layer.line(0,-32,2*this.notes[a][2],-31)
                            break
                            case 1:
                                this.layer.ellipse(-2.2*this.notes[a][2],-28,1.4,0.8)
                                this.layer.ellipse(0.8*this.notes[a][2],-28,1.4,0.8)
                                this.layer.line(-1.5,-28,-1.5,-32)
                                this.layer.line(1.5,-28,1.5,-32)
                                this.layer.line(-1.5,-32,1.5,-32)
                            break
                            case 2:
                                this.layer.ellipse(-2.2*this.notes[a][2],-28,1.4,0.8)
                                this.layer.ellipse(0.8*this.notes[a][2],-28,1.4,0.8)
                                this.layer.line(-1.5,-28,-1.5,-32)
                                this.layer.line(1.5,-28,1.5,-32)
                                this.layer.line(-1.5,-32,1.5,-32)
                                this.layer.line(-1.5,-30.5,1.5,-30.5)
                            break
                        }
                        this.layer.fill(255,this.fade*2)
                        this.layer.stroke(255,this.fade*2)
                        this.layer.strokeWeight(0.4)
                        switch(this.notes[a][1]){
                            case 0:
                                this.layer.ellipse(-0.7*this.notes[a][2],-28,1.4,0.8)
                                this.layer.line(0,-28,0,-32)
                                this.layer.line(0,-32,2*this.notes[a][2],-31)
                            break
                            case 1:
                                this.layer.ellipse(-2.2*this.notes[a][2],-28,1.4,0.8)
                                this.layer.ellipse(0.8*this.notes[a][2],-28,1.4,0.8)
                                this.layer.line(-1.5,-28,-1.5,-32)
                                this.layer.line(1.5,-28,1.5,-32)
                                this.layer.line(-1.5,-32,1.5,-32)
                            break
                            case 2:
                                this.layer.ellipse(-2.2*this.notes[a][2],-28,1.4,0.8)
                                this.layer.ellipse(0.8*this.notes[a][2],-28,1.4,0.8)
                                this.layer.line(-1.5,-28,-1.5,-32)
                                this.layer.line(1.5,-28,1.5,-32)
                                this.layer.line(-1.5,-32,1.5,-32)
                                this.layer.line(-1.5,-30.5,1.5,-30.5)
                            break
                        }
                    }
                break
                case 134:
                    this.layer.fill(100,50,100,this.fade*0.5)
                    this.layer.stroke(100,75,125,this.fade*0.5)
                    this.layer.strokeWeight(0.3)
                    this.layer.strokeJoin(ROUND)
                    for(let a=0,la=10;a<la;a++){
                        regStarGear(this.layer,lsin(360*(a+this.offset)/la)*(6+a%2*3),lcos(360*(a+this.offset)/la)*(6+a%2*3),6,2,1.4,1.4,1.8,1.8,30+360*(a+this.offset)/la)
                    }
                    this.layer.strokeJoin(MITER)
                    this.layer.noStroke()
                    this.layer.fill(100,125,175,this.fade*0.1)
                    this.layer.ellipse(0,0,24)
                break
                case 135:
                    this.layer.rotate(this.position.x*1.5-this.position.y)
                    for(let a=0,la=14;a<la;a++){
                        this.layer.rotate(360/la)
                        this.layer.translate(0,-(50-a%2*20))
                        this.layer.stroke(255,175,200,this.fade)
                        this.layer.strokeWeight(1.5)
                        this.layer.line(0,-4,-3,-1)
                        this.layer.line(0,-4,3,-1)
                        this.layer.line(-3,-1,-5,3)
                        this.layer.line(3,-1,5,3)
                        this.layer.strokeWeight(3)
                        this.layer.point(0,6)
                        this.layer.translate(0,(50-a%2*20))
                    }
                break
                case 136:
                    this.layer.rotate(this.time*6)
                    this.layer.fill(100,0,150,this.fade)
                    this.layer.ellipse(-20,0,8)
                    this.layer.fill(100,0,150,this.fade*0.5)
                    this.layer.beginShape()
                    this.layer.vertex(-23,0)
                    this.layer.bezierVertex(-22*lcos(30),22*lsin(30),-21*lcos(60),21*lsin(60),0,20)
                    this.layer.bezierVertex(-19*lcos(60),19*lsin(60),-18*lcos(30),18*lsin(30),-17,0)
                    this.layer.endShape()
                    this.layer.fill(250,225,150,this.fade)
                    this.layer.ellipse(20,0,8)
                    this.layer.fill(250,225,150,this.fade*0.5)
                    this.layer.beginShape()
                    this.layer.vertex(23,0)
                    this.layer.bezierVertex(22*lcos(30),-22*lsin(30),21*lcos(60),-21*lsin(60),0,-20)
                    this.layer.bezierVertex(19*lcos(60),-19*lsin(60),18*lcos(30),-18*lsin(30),17,0)
                    this.layer.endShape()
                break
                case 137:
                    this.layer.rotate(this.direction)
                    this.layer.stroke(...this.color,this.fade)
                    this.layer.strokeWeight(3)
                    this.layer.noFill()
                    for(let a=max(0,floor(this.distance/30)-3),la=floor(this.distance/30);a<la;a++){
                        this.layer.ellipse(0,-15-30*a,18,30)
                        this.layer.line(-9,-15-30*a,9,-15-30*a)
                    }
                    this.layer.arc(0,-15-30*floor(this.distance/30),18,30,90,90+this.distance%30*6)
                    this.layer.arc(0,-15-30*floor(this.distance/30),18,30,90-this.distance%30*6,90)
                    if(this.distance%30>24){
                        this.layer.line(-9,-15-30*floor(this.distance/30),9,-15-30*floor(this.distance/30))
                    }else if(this.distance%30>15){
                        this.layer.line(-9,-15-30*floor(this.distance/30),-24+this.distance%30,-15-30*floor(this.distance/30))
                        this.layer.line(9,-15-30*floor(this.distance/30),24-this.distance%30,-15-30*floor(this.distance/30))
                    }
                    if(floor(this.distance/30)>3){
                        this.layer.arc(0,105-30*floor(this.distance/30),18,30,90+this.distance%30*6,270)
                        this.layer.arc(0,105-30*floor(this.distance/30),18,30,-90,90-this.distance%30*6)
                        if(this.distance%30<5){
                            this.layer.line(-9,105-30*floor(this.distance/30),9,105-30*floor(this.distance/30))
                        }else if(this.distance%30<14){
                            this.layer.line(-9,105-30*floor(this.distance/30),5-this.distance%30,105-30*floor(this.distance/30))
                            this.layer.line(9,105-30*floor(this.distance/30),-5+this.distance%30,105-30*floor(this.distance/30))
                        }
                    }else if(floor(this.distance/30)==3&&this.distance%30>=15){
                        this.layer.arc(0,15,18,30,90+this.distance%30*6,270)
                        this.layer.arc(0,15,18,30,-90,90-this.distance%30*6)
                    }else{
                        this.layer.arc(0,15,18,30,180,270)
                        this.layer.arc(0,15,18,30,-90,0)
                    }
                break
                case 138:
                    this.layer.rotate(this.direction)
                    this.layer.stroke(...this.color,this.fade)
                    this.layer.strokeWeight(2)
                    this.layer.noFill()
                    for(let a=max(0,floor(this.distance/20)-3),la=floor(this.distance/20);a<la;a++){
                        this.layer.ellipse(0,-10-20*a,12,20)
                        this.layer.line(-6,-10-20*a,6,-10-20*a)
                    }
                    this.layer.arc(0,-10-20*floor(this.distance/20),12,20,90,90+this.distance%20*9)
                    this.layer.arc(0,-10-20*floor(this.distance/20),12,20,90-this.distance%20*9,90)
                    if(this.distance%20>16){
                        this.layer.line(-6,-10-20*floor(this.distance/20),6,-10-20*floor(this.distance/20))
                    }else if(this.distance%20>10){
                        this.layer.line(-6,-10-20*floor(this.distance/20),-18+this.distance%20,-10-20*floor(this.distance/20))
                        this.layer.line(6,-10-20*floor(this.distance/20),18-this.distance%20,-10-20*floor(this.distance/20))
                    }
                    if(floor(this.distance/20)>3){
                        this.layer.arc(0,70-20*floor(this.distance/20),12,20,90+this.distance%20*9,270)
                        this.layer.arc(0,70-20*floor(this.distance/20),12,20,-90,90-this.distance%20*9)
                        if(this.distance%20<3){
                            this.layer.line(-6,70-20*floor(this.distance/20),6,70-20*floor(this.distance/20))
                        }else if(this.distance%20<9){
                            this.layer.line(-6,70-20*floor(this.distance/20),3-this.distance%20,70-20*floor(this.distance/20))
                            this.layer.line(6,70-20*floor(this.distance/20),-3+this.distance%20,70-20*floor(this.distance/20))
                        }
                    }else if(floor(this.distance/20)==3&&this.distance%20>=10){
                        this.layer.arc(0,10,12,20,90+this.distance%20*9,270)
                        this.layer.arc(0,10,12,20,-90,90-this.distance%20*9)
                    }else{
                        this.layer.arc(0,10,12,20,180,270)
                        this.layer.arc(0,10,12,20,-90,0)
                    }
                break
                case 139:
                    this.layer.rotate(this.position.x*2.2-this.time)
                    this.layer.fill(60,150,60,this.fade*2)
                    for(let a=0,la=24;a<la;a++){
                        this.layer.ellipse(lsin(360*a/la)*10,lcos(360*a/la)*10,6)
                    }
                    this.layer.fill(40,100,40,this.fade*1.5)
                    for(let a=0,la=24;a<la;a++){
                        this.layer.ellipse(lsin(360*a/la)*10,lcos(360*a/la)*10,4)
                    }
                    this.layer.fill(150,75,200,this.fade*3)
                    for(let a=0,la=18;a<la;a++){
                        regStarFlower(this.layer,lsin(360*a/la)*(11-a%2*2),lcos(360*a/la)*(11-a%2*2),5,0.2,0.2,1,1,360*a/la)
                    }
                break
                case 140:
                    this.layer.rotate(this.direction)
                    this.layer.fill(255,this.fade*0.4)
                    this.layer.triangle(-12,0,12,0,0,48)
                    this.layer.triangle(-6,0,6,0,0,30)
                    this.layer.fill(255,this.fade)
                    this.layer.ellipse(0,0,32)
                    this.layer.fill(225,this.fade*0.5)
                    regStar(this.layer,0,0,11,12,12,20,20,this.time)
                    regStar(this.layer,0,0,11,12,12,20,20,180/11+this.time)
                break
                case 141:
                    for(let a=0,la=3;a<la;a++){
                        this.layer.stroke(50+a*100,200+a*25,225+a*15,this.fade*(0.5+a*0.25))
                        this.layer.strokeWeight(5-a*2)
                        for(let b=0,lb=8;b<lb;b++){
                            this.layer.line(-70+b*20,-80,-70+b*20,-80+min(80,this.time*8))
                            this.layer.line(-70+b*20,80,-70+b*20,80-min(80,this.time*8))
                            this.layer.line(-80,-70+b*20,-80+min(80,this.time*8),-70+b*20)
                            this.layer.line(80,-70+b*20,80-min(80,this.time*8),-70+b*20)
                        }
                    }
                break
                case 142:
                    this.layer.rotate(this.direction)
                    this.layer.noFill()
                    for(let a=0,la=3;a<la;a++){
                        this.layer.stroke(50+a*100,200+a*25,225+a*15,this.fade*(0.5+a*0.25))
                        this.layer.strokeWeight(5-a*2)
                        regPolyStellate(this.layer,0,0,5,2,24,24,this.time)
                    }
                break
                case 143:
                    if(this.points.length>=2){
                        this.layer.noFill()
                        for(let a=0,la=3;a<la;a++){
                            this.layer.stroke(50+a*100,200+a*25,225+a*15,this.fade*(0.5+a*0.25))
                            this.layer.strokeWeight(5-a*2)
                            this.layer.bezier(
                                this.points[this.points.length-1][0]-this.position.x,this.points[this.points.length-1][1]-this.position.y,
                                this.points[max(round(this.points.length*2/3),this.points.length-4)][0]-this.position.x,this.points[max(round(this.points.length*2/3),this.points.length-4)][1]-this.position.y,
                                this.points[max(round(this.points.length/3),this.points.length-7)][0]-this.position.x,this.points[max(round(this.points.length/3),this.points.length-7)][1]-this.position.y,
                                this.points[max(0,this.points.length-10)][0]-this.position.x,this.points[max(0,this.points.length-10)][1]-this.position.y
                            )
                        }
                    }
                break
                case 144:
                    this.layer.colorMode(HSB,360,1,1,1)
                    for(let a=0,la=5;a<la;a++){
                        this.layer.stroke(this.time*6%360,1-a*0.2,1,this.fade)
                        this.layer.strokeWeight(15-a*3)
                        this.layer.line(0,0,lsin(this.direction)*900,-lcos(this.direction)*900)
                    }
                    this.layer.colorMode(RGB,255,255,255,1)
                break
                case 145:
                    this.layer.rotate(this.time*-3)
                    this.layer.noFill()
                    this.layer.stroke([255,255,255,100,100,200][this.color],[150,200,255,255,200,100][this.color],[100,100,100,150,255,225][this.color],this.fade)
                    this.layer.strokeWeight(1.5)
                    this.layer.rect(0,0,8)
                    this.layer.stroke(255,this.fade*0.5)
                    this.layer.strokeWeight(1)
                    this.layer.rect(0,0,8)
                    this.layer.stroke(255,this.fade)
                    this.layer.strokeWeight(0.5)
                    this.layer.rect(0,0,8)
                break
                case 146:
                    this.layer.fill([255,255,255,100,100,200,150][this.color],[150,200,255,255,200,100,225][this.color],[100,100,100,150,255,225,240][this.color],this.fade)
                    this.layer.stroke([255,255,255,100,100,200,150][this.color],[150,200,255,255,200,100,225][this.color],[100,100,100,150,255,225,240][this.color],this.fade)
                    this.layer.strokeWeight(1.5)
                    regStar(this.layer,0,0,5,6,6,2.5,2.5,this.time*3)
                    this.layer.noFill()
                    this.layer.stroke(255,this.fade*0.5)
                    this.layer.strokeWeight(1)
                    regStar(this.layer,0,0,5,4,4,1.6,1.6,this.time*3)
                    this.layer.fill(255,this.fade)
                    this.layer.strokeWeight(0.5)
                    regStar(this.layer,0,0,5,4,4,1.6,1.6,this.time*3)
                break
                case 147:
                    for(let a=0,la=5;a<la;a++){
                        let merge=mergeColor([195,68,137],[254,228,242],a/(la-1))
                        this.layer.stroke(...merge,this.fade)
                        this.layer.strokeWeight(15-a*3)
                        this.layer.line(0,0,lsin(this.direction)*900,-lcos(this.direction)*900)
                    }
                break
                case 148:
                    this.layer.rotate(this.direction)
                    for(let a=0,la=15;a<la;a++){
                        this.layer.rotate((a<7?-1:1)*abs((a-7)/7)**0.9*30)
                        this.layer.fill(240,120,200,this.fade*2)
                        this.layer.ellipse(0,10+8*abs(lsin(a/(la-1)*180))-abs(a-7)*0.5,0.5,1)
                        this.layer.fill(245,175,220,this.fade*2)
                        this.layer.ellipse(0,10+8*abs(lsin(a/(la-1)*180))-abs(a-7)*0.5,0.35,0.7)
                        this.layer.fill(250,230,240,this.fade*2)
                        this.layer.ellipse(0,10+8*abs(lsin(a/(la-1)*180))-abs(a-7)*0.5,0.2,0.4)
                        this.layer.rotate(-(a<7?-1:1)*abs((a-7)/7)**0.9*30)
                    }
                break
                case 149:
                    this.layer.rotate(this.direction)
                    this.layer.noFill()
                    for(let a=0,la=3;a<la;a++){
                        this.layer.stroke(122+a*7,60+a*64,251-a*12,this.fade*(0.4+a*0.2))
                        this.layer.strokeWeight(4-a*1.5)
                        this.layer.ellipse(0,0,24)
                        this.layer.line(0,12,-15,17)
                        this.layer.line(-12,3,-15,17)
                        this.layer.line(0,12,15,17)
                        this.layer.line(12,3,15,17)
                        this.layer.line(0,-12,-24,-21)
                        this.layer.line(-12,3,-24,-21)
                        this.layer.line(0,-12,24,-21)
                        this.layer.line(12,3,24,-21)
                        this.layer.point(-13,-6.5)
                        this.layer.point(-15,-10.5)
                        this.layer.point(-17,-14.5)
                        this.layer.point(13,-6.5)
                        this.layer.point(15,-10.5)
                        this.layer.point(17,-14.5)
                        this.layer.arc(-8,-12,16,24,-90,0)
                        this.layer.arc(8,-12,16,24,-180,-90)
                    }
                    this.layer.noStroke()
                    this.layer.fill(84,158,203,this.fade*0.5)
                    this.layer.ellipse(0,0,20)
                    this.layer.fill(219,255,255,this.fade*0.5)
                    this.layer.ellipse(0,0,16)
                    this.layer.ellipse(0,0,12)
                    this.layer.ellipse(0,0,8)
                break
                case 150:
                    this.layer.rotate(this.direction)
                    this.layer.fill(...this.color,this.fade*0.1)
                    this.layer.ellipse(0,-4,20)
                    this.layer.ellipse(0,-4,28)
                    this.layer.ellipse(0,-4,36)
                    this.layer.rotate(-39)
                    this.layer.fill(...this.color,this.fade*0.5)
                    this.layer.ellipse(0,-8,9,22)
                    this.layer.ellipse(0,5,6,10)
                    this.layer.rotate(78)
                    this.layer.ellipse(0,-8,9,22)
                    this.layer.ellipse(0,5,6,10)
                    this.layer.fill(223,234,235,this.fade)
                    this.layer.ellipse(0,-8,7,20)
                    this.layer.ellipse(0,5,4,8)
                    this.layer.rotate(-78)
                    this.layer.ellipse(0,-8,7,20)
                    this.layer.ellipse(0,5,4,8)
                break
                case 151:
                    for(let a=0,la=this.clouds.length;a<la;a++){
                        for(let b=0,lb=3;b<lb;b++){
                            let merge=mergeColor(mergeColor([110,64,165],[163,191,236],this.clouds[a][4]),[223,234,235],this.fade*b*0.25)
                            this.layer.fill(...merge,this.fade*this.clouds[a][2]*0.5)
                            this.layer.ellipse(this.clouds[a][0]-this.position.x,this.clouds[a][1]-this.position.y,this.clouds[a][5]*(1-0.5*b/(lb-1)))
                        }
                    }
                break
                case 152:
                    for(let a=0,la=12;a<la;a++){
                        this.layer.rotate(180/la)
                        this.layer.fill(1000-a/(la-1)*950,min(a/(la-1)*300,200),25,this.fade)
                        this.layer.beginShape()
                        this.layer.vertex(-2,-11)
                        this.layer.vertex(0,-11)
                        this.layer.vertex(0,-12.5)
                        this.layer.vertex(2.5,-10)
                        this.layer.vertex(0,-7.5)
                        this.layer.vertex(0,-9)
                        this.layer.vertex(-2,-9)
                        this.layer.endShape()
                        this.layer.rotate(180/la)
                    }
                break
                case 153:
                    this.layer.fill(255,50,100,this.fade*0.5)
                    this.layer.stroke(255,75,125,this.fade*0.5)
                    this.layer.strokeWeight(0.3)
                    this.layer.strokeJoin(ROUND)
                    for(let a=0,la=10;a<la;a++){
                        regStarGear(this.layer,lsin(360*(a+this.offset)/la)*(6+a%2*3),lcos(360*(a+this.offset)/la)*(6+a%2*3),6,2,1.4,1.4,1.8,1.8,30+360*(a+this.offset)/la)
                    }
                    this.layer.strokeJoin(MITER)
                    this.layer.noStroke()
                    this.layer.fill(255,125,175,this.fade*0.1)
                    regStar(this.layer,0,0,10,6,6,18,18,0)
                break
                case 154:
                    for(let a=0,la=12;a<la;a++){
                        this.layer.rotate(180/la)
                        this.layer.fill(min(200,400-a/(la-1)*400),0,min(200,a/(la-1)*400),this.fade)
                        this.layer.beginShape()
                        this.layer.vertex(-1,-8)
                        this.layer.vertex(-1,-10)
                        this.layer.vertex(-2.5,-10)
                        this.layer.vertex(0,-12.5)
                        this.layer.vertex(2.5,-10)
                        this.layer.vertex(1,-10)
                        this.layer.vertex(1,-8)
                        this.layer.endShape()
                        this.layer.rotate(180/la)
                    }
                break
                case 155:
                    this.layer.noFill()
                    this.layer.stroke(255,150,175,this.fade*0.5)
                    this.layer.strokeWeight(3)
                    this.layer.ellipse(0,0,20)
                    this.layer.line(0,-10,-3,sqrt(91))
                    this.layer.line(0,-10,3,sqrt(91))
                    this.layer.line(-3,sqrt(91),3,sqrt(91))
                    this.layer.stroke(225,50,100,this.fade)
                    this.layer.strokeWeight(1)
                    this.layer.ellipse(0,0,20)
                    this.layer.line(0,-10,-3,sqrt(91))
                    this.layer.line(0,-10,3,sqrt(91))
                    this.layer.line(-3,sqrt(91),3,sqrt(91))
                break
                case 156:
                    this.layer.noFill()
                    this.layer.stroke(255,150,175,this.fade*0.5)
                    this.layer.strokeWeight(3)
                    this.layer.ellipse(0,0,20)
                    this.layer.line(sqrt(8)*-10/3,-10/3,sqrt(8)*10/3,-10/3)
                    this.layer.line(sqrt(8)*-10/3,10/3,sqrt(8)*10/3,10/3)
                    this.layer.stroke(225,50,100,this.fade)
                    this.layer.strokeWeight(1)
                    this.layer.ellipse(0,0,20)
                    this.layer.line(sqrt(8)*-10/3,-10/3,sqrt(8)*10/3,-10/3)
                    this.layer.line(sqrt(8)*-10/3,10/3,sqrt(8)*10/3,10/3)
                break
                case 157:
                    this.layer.rotate(this.direction)
                    this.layer.fill(240,120,200,this.fade)
                    regStar(this.layer,0,0,11,12,12,30,30,this.time)
                    this.layer.fill(250,this.fade*0.25)
                    regStar(this.layer,0,0,11,7.2,7.2,27,27,this.time)
                    regStar(this.layer,0,0,11,6.4,6.4,24,24,this.time)
                    regStar(this.layer,0,0,11,5.6,5.6,21,21,this.time)
                    regStar(this.layer,0,0,11,4.8,4.8,18,18,this.time)
                    this.layer.fill(240,80,80,this.fade)
                    regStar(this.layer,0,0,11,8,8,30,30,-this.time)
                    this.layer.fill(250,this.fade*0.25)
                    regStar(this.layer,0,0,11,7.2,7.2,27,27,-this.time)
                    regStar(this.layer,0,0,11,6.4,6.4,24,24,-this.time)
                    regStar(this.layer,0,0,11,5.6,5.6,21,21,-this.time)
                    regStar(this.layer,0,0,11,4.8,4.8,18,18,-this.time)
                break
                case 158:
                    for(let a=0,la=this.clouds.length;a<la;a++){
                        for(let b=0,lb=3;b<lb;b++){
                            let merge=mergeColor(mergeColor([68,155,206],[99,200,255],this.clouds[a][4]),[238,253,248],this.fade*b*0.25)
                            this.layer.fill(...merge,this.fade*this.clouds[a][2]*0.5)
                            this.layer.ellipse(this.clouds[a][0]-this.position.x,this.clouds[a][1]-this.position.y,this.clouds[a][5]*(1-0.5*b/(lb-1)))
                        }
                    }
                    this.layer.fill(97,250,255,this.fade*0.2)
                    for(let a=0,la=6;a<la;a++){
                        this.layer.ellipse(0,0,30-a*2)
                    }
                    this.layer.fill(222,242,244,this.fade)
                    this.layer.ellipse(0,0,12,18)
                    this.layer.fill(140,157,163,this.fade)
                    this.layer.ellipse(1,-3,2)
                    this.layer.ellipse(-3,-3,2)
                    this.layer.stroke(140,157,163,this.fade)
                    this.layer.strokeWeight(0.5)
                    this.layer.noFill()
                    this.layer.arc(-1,2,6,3,-150,-30)
                break
                case 159:
                    this.layer.rotate(this.direction)
                    for(let a=0,la=4;a<la;a++){
                        this.layer.fill(255,125+a*125,-55+a*100,this.fade)
                        this.layer.rect(0,-640,8-a*2,1200)
                        this.layer.triangle(-4+a,-40,4-a,-40,0,-20)
                    }
                break
                case 160:
                    this.layer.fill(50,0,50,this.fade)
                    this.layer.ellipse(0,0,12)
                    this.layer.fill(50,0,50,this.fade*0.5)
                    regStar(this.layer,0,0,24,6,6,18,18,0)
                break
                case 161:
                    for(let a=0,la=5;a<la;a++){
                        this.layer.stroke(150+a*10,this.fade*0.1)
                        for(let b=0,lb=this.sets.length;b<lb;b++){
                            this.layer.strokeWeight(this.fade*(50-a*5)*(b==0?1:0.2))
                            for(let c=0,lc=this.ticks;c<lc;c++){
                                this.layer.line(
                                    map(c/lc,0,1,0,this.position2.x)+(c==0?0:this.sets[b][c-1][0]*3),
                                    map(c/lc,0,1,0,this.position2.y)+(c==0?0:this.sets[b][c-1][1]*3),
                                    map((c+1)/lc,0,1,0,this.position2.x)+this.sets[b][c][0]*3,
                                    map((c+1)/lc,0,1,0,this.position2.y)+this.sets[b][c][1]*3)
                            }
                        }
                    }
                break
                case 162:
                    for(let a=0,la=4;a<la;a++){
                        this.layer.fill(255,160+a*30,255,this.fade*0.5)
                        if(this.occlude<10){
                            this.layer.triangle(-(60-a*10),(60-a*10),-(60-a*10)+(58-a*10)*this.occlude/10,(60-a*10)-(62-a*10)*this.occlude/10,-(60-a*10)+(62-a*10)*this.occlude/10,(60-a*10)-(58-a*10)*this.occlude/10)
                        }else if(this.occlude<20){
                            this.layer.triangle(-(60-a*10),(60-a*10),-2,-2,2,2)
                            this.layer.quad(-2,-2,2,2,2+(58-a*10)*(this.occlude-10)/10,2-(62-a*10)*(this.occlude-10)/10,-2+(62-a*10)*(this.occlude-10)/10,-2-(58-a*10)*(this.occlude-10)/10)
                        }else if(this.occlude<30){
                            this.layer.triangle((60-a*10),-(60-a*10),-2,-2,2,2)
                            this.layer.quad(-2,-2,2,2,-(60-a*10)+(62-a*10)*(this.occlude-20)/10,(60-a*10)-(58-a*10)*(this.occlude-20)/10,-(60-a*10)+(58-a*10)*(this.occlude-20)/10,(60-a*10)-(62-a*10)*(this.occlude-20)/10)
                        }else if(this.occlude<40){
                            this.layer.triangle((60-a*10),-(60-a*10),-2+(62-a*10)*(this.occlude-30)/10,-2-(58-a*10)*(this.occlude-30)/10,2+(58-a*10)*(this.occlude-30)/10,2-(62-a*10)*(this.occlude-30)/10)
                        }
                    }
                break
                case 163:
                    this.layer.noFill()
                    this.layer.strokeCap(SQUARE)
                    for(let a=0,la=5;a<la;a++){
                        this.layer.stroke(150+a*20,225+a*5,255,this.fade*0.2)
                        this.layer.strokeWeight(5-a)
                        this.layer.arc(0,0,40,24,-180,0)
                    }
                    this.layer.strokeCap(ROUND)
                    this.layer.noStroke()
                    this.layer.fill(255,this.fade*0.1)
                    for(let a=0,la=6;a<la;a++){
                        for(let b=0,lb=5;b<lb;b++){
                            this.layer.arc(0,0,60*(1-a*0.1),36*(1-a*0.1),constrain(-195+b*45+a*2+this.time*3%45,-180,0),constrain(-165+b*45-a*2+this.time*3%45,-180,0))
                        }
                    }
                break
                case 164:
                    this.layer.noFill()
                    this.layer.strokeCap(SQUARE)
                    for(let a=0,la=5;a<la;a++){
                        this.layer.stroke(150+a*20,225+a*5,255,this.fade*0.2)
                        this.layer.strokeWeight(5-a)
                        this.layer.arc(0,0,40,24,0,180)
                    }
                    this.layer.strokeCap(ROUND)
                    this.layer.noStroke()
                    this.layer.fill(255,this.fade*0.1)
                    for(let a=0,la=6;a<la;a++){
                        for(let b=0,lb=5;b<lb;b++){
                            this.layer.arc(0,0,60*(1-a*0.1),36*(1-a*0.1),constrain(-15+b*45+a*2+this.time*3%45,0,180),constrain(15+b*45-a*2+this.time*3%45,0,180))
                        }
                    }
                break
                case 165:
                    this.layer.rotate(-this.time)
                    this.layer.fill(0,0,150,this.fade*0.5)
                    for(let a=0,la=7;a<la;a++){
                        regStar(this.layer,lsin(360*(a+this.offset)/la)*5,lcos(360*(a+this.offset)/la)*5,7,1,1,1.5,1.5,360*(a+this.offset)/la)
                    }
                    this.layer.fill(100,0,100,this.fade*0.5)
                    for(let a=0,la=7;a<la;a++){
                        regStar(this.layer,lsin(360*(a+this.offset+0.5)/la)*4,lcos(360*(a+this.offset+0.5)/la)*4,7,1,1,1.5,1.5,360*(a+this.offset)/la)
                    }
                    this.layer.fill(50,0,125,this.fade*0.25)
                    regStar(this.layer,0,0,7,2,2,3,3,this.time*3)
                break
                case 166:
                    this.layer.rotate(this.direction)
                    this.layer.fill(225,50,25,this.fade*0.2)
                    for(let a=0,la=4;a<la;a++){
                        this.layer.triangle(-5,3,5,3,0,(24+a*12)*min(this.time/20,1))
                    }
                    for(let a=0,la=4;a<la;a++){
                        regStar(this.layer,0,0,5,12-a,12-a,4.8-a*0.4,4.8-a*0.4,this.time*this.gear)
                    }
                    this.layer.fill(255,this.fade*0.5)
                    for(let a=0,la=5;a<la;a++){
                        regStar(this.layer,0,0,5,8-a,8-a,3.2-a*0.4,3.2-a*0.4,this.time*this.gear)
                    }
                break
                case 167:
                    this.layer.rotate(this.direction)
                    this.layer.fill(225,50,25,this.fade*0.2)
                    for(let a=0,la=4;a<la;a++){
                        this.layer.triangle(-4,3,4,3,0,(20+a*10)*min(this.time/20,1))
                    }
                    this.layer.noFill()
                    this.layer.stroke(225,50,25,this.fade*0.2)
                    for(let a=0,la=4;a<la;a++){
                        this.layer.strokeWeight(4-a*2)
                        regStar(this.layer,0,0,5,8,8,3.2,3.2,this.time*this.gear)
                    }
                    this.layer.stroke(255,this.fade*0.5)
                    for(let a=0,la=4;a<la;a++){
                        this.layer.strokeWeight(2-a)
                        regStar(this.layer,0,0,5,6-a*0.5,6-a*0.5,2.4-a*0.2,2.4-a*0.2,this.time*this.gear)
                    }
                    this.layer.stroke(255,this.fade)
                    this.layer.strokeWeight(1)
                    regStar(this.layer,0,0,5,4,4,1.6,1.6,this.time*this.gear)
                break
                case 168:
                    this.layer.rotate(this.time)
                    this.layer.fill(150,25,200,this.fade)
                    this.layer.ellipse(0,0,30)
                    this.layer.fill(125,25,175,this.fade)
                    this.layer.ellipse(0,0,27)
                    this.layer.fill(100,25,150,this.fade)
                    this.layer.ellipse(0,0,24)
                    this.layer.noFill()
                    this.layer.stroke(200,150,225,this.fade)
                    this.layer.strokeJoin(ROUND)
                    this.layer.strokeWeight(1.5)
                    regPolyStellate(this.layer,0,0,5,2,12,12,15)
                    for(let a=0,la=5;a<la;a++){
                        this.layer.arc(0,0,24,24,-12-90-15+a*72,12-90-15+a*72)
                    }
                    this.layer.strokeJoin(MITER)
                    this.layer.strokeWeight(4.5)
                    for(let a=0,la=5;a<la;a++){
                        this.layer.point(lsin(15+a*72)*12,lcos(15+a*72)*12)
                    }
                break
                case 169:
                    for(let a=0,la=12;a<la;a++){
                        this.layer.rotate(180/la)
                        this.layer.fill(100+a/(la-1)*150,150+a/(la-1)*150,200+a/(la-1)*150,this.fade)
                        this.layer.beginShape()
                        this.layer.vertex(-1,-12)
                        this.layer.vertex(-1,-10)
                        this.layer.vertex(-2.5,-10)
                        this.layer.vertex(0,-7.5)
                        this.layer.vertex(2.5,-10)
                        this.layer.vertex(1,-10)
                        this.layer.vertex(1,-11)
                        this.layer.endShape()
                        this.layer.rotate(180/la)
                    }
                break
                case 170:
                    for(let a=0,la=12;a<la;a++){
                        this.layer.rotate(180/la)
                        this.layer.fill(250,100+a/(la-1)*150,100+a/(la-1)*50,this.fade)
                        this.layer.beginShape()
                        this.layer.vertex(-1,-12)
                        this.layer.vertex(-1,-10)
                        this.layer.vertex(-2.5,-10)
                        this.layer.vertex(0,-7.5)
                        this.layer.vertex(2.5,-10)
                        this.layer.vertex(1,-10)
                        this.layer.vertex(1,-11)
                        this.layer.endShape()
                        this.layer.rotate(180/la)
                    }
                break
                case 171:
                    this.layer.rotate(this.time*-5)
                    this.layer.fill(255,this.fade)
                    this.layer.arc(0,0,20,20,-180,0)
                    this.gradient=new p5.LinearGradient(0,20)
                    this.gradient.colors(0.0,color(254,218,182),1.0,color(164,247,255))
                    this.layer.fillGradient(this.gradient)
                    this.layer.translate(-5,-5)
                    this.layer.arc(5,5,20,20,0,180)
                    this.layer.ellipse(10,5,10)
                    this.layer.pop()
                    this.layer.push()
                    this.layer.translate(this.position.x,this.position.y)
                    this.layer.scale(this.size*this.scale)
                    this.layer.rotate(this.time*-5)
                    this.layer.noStroke()
                    this.layer.fill(255,this.fade)
                    this.layer.arc(-5,0,10,10,0,180)
                    this.layer.ellipse(5,0,3)
                    this.layer.fill(254,218,182,this.fade)
                    this.layer.ellipse(-5,0,3)
                break
                case 172:
                    this.layer.rotate(this.time*-5)
                    this.layer.fill(255,this.fade)
                    this.layer.arc(0,0,20,20,-180,0)
                    this.gradient=new p5.LinearGradient(0,20)
                    this.gradient.colors(0.0,color(248,247,252),1.0,color(88,97,202))
                    this.layer.fillGradient(this.gradient)
                    this.layer.translate(-5,-5)
                    this.layer.arc(5,5,20,20,0,180)
                    this.layer.ellipse(10,5,10)
                    this.layer.pop()
                    this.layer.push()
                    this.layer.translate(this.position.x,this.position.y)
                    this.layer.scale(this.size*this.scale)
                    this.layer.rotate(this.time*-5)
                    this.layer.noStroke()
                    this.layer.fill(255,this.fade)
                    this.layer.arc(-5,0,10,10,0,180)
                    this.layer.ellipse(5,0,3)
                    this.layer.fill(248,247,252,this.fade)
                    this.layer.ellipse(-5,0,3)
                break
                case 173:
                    for(let a=0,la=6;a<la;a++){
                        this.layer.rotate(a==3?90:45)
                        this.layer.fill(100,200,225,this.fade)
                        this.layer.quad(0,12,-3,15,0,24,3,15)
                        this.layer.fill(125,225,250,this.fade)
                        this.layer.quad(0,13,-2,15,0,21,2,15)
                        this.layer.fill(150,250,250,this.fade)
                        this.layer.quad(0,14,-1,15,0,18,1,15)
                    }
                break
                case 174:
                    this.layer.stroke(227,128,43,this.fade*0.5)
                    this.layer.strokeWeight(1.5)
                    for(let a=0,la=9;a<la;a++){
                        this.layer.line(lsin(a/la*360+this.offset)*8,lcos(a/la*360+this.offset)*8,lsin(a/la*360+this.offset)*20,lcos(a/la*360+this.offset)*20)
                    }
                    this.layer.stroke(255,206,121,this.fade*0.5)
                    this.layer.strokeWeight(1)
                    for(let a=0,la=9;a<la;a++){
                        this.layer.line(lsin(a/la*360+this.offset)*8,lcos(a/la*360+this.offset)*8,lsin(a/la*360+this.offset)*20,lcos(a/la*360+this.offset)*20)
                    }
                    this.layer.stroke(255,236,200,this.fade*0.5)
                    this.layer.strokeWeight(0.5)
                    for(let a=0,la=9;a<la;a++){
                        this.layer.line(lsin(a/la*360+this.offset)*8,lcos(a/la*360+this.offset)*8,lsin(a/la*360+this.offset)*20,lcos(a/la*360+this.offset)*20)
                    }
                break
                case 175:
                    for(let a=0,la=3;a<la;a++){
                        this.layer.stroke(50+a*25,200+a*25,100+a*25,this.fade)
                        this.layer.strokeWeight(9-a*3)
                        this.layer.line(0,0,this.position2.x,this.position2.y)
                    }
                    this.layer.stroke(150,255,200,this.fade)
                    this.layer.strokeWeight(2)
                    for(let a=0,la=this.ticks;a<la;a++){
                        this.layer.line(
                            map(a/la,0,1,0,this.position2.x)+(a==0?0:this.sets[a-1][0]),
                            map(a/la,0,1,0,this.position2.y)+(a==0?0:this.sets[a-1][1]),
                            map((a+1)/la,0,1,0,this.position2.x)+this.sets[a][0],
                            map((a+1)/la,0,1,0,this.position2.y)+this.sets[a][1])
                    }
                break
                case 176:
                    this.layer.rotate(this.direction)
                    this.layer.stroke(200,255,255,this.fade*0.5)
                    this.layer.noFill()
                    this.layer.strokeJoin(ROUND)
                    for(let a=0,la=2;a<la;a++){
                        this.layer.strokeWeight(a*2+2)
                        this.layer.beginShape()
                        for(let b=0,lb=min(60,2+this.time*2);b<lb;b++){
                            this.layer.vertex(-15*lcos(b*30+this.distance*5)+random(-2,2),10*lsin(b*30+this.distance*5)-this.distance+b*2+random(-2,2))
                        }
                        this.layer.endShape()
                    }
                    this.layer.strokeJoin(MITER)
                break
                case 177:
                    for(let a=0,la=this.clouds.length;a<la;a++){
                        for(let b=0,lb=3;b<lb;b++){
                            let merge=mergeColor(mergeColor([180,0,20],[60,0,140],this.clouds[a][4]),[160,40,120],this.fade*b*0.25)
                            this.layer.fill(...merge,this.clouds[a][2]*0.5)
                            this.layer.ellipse(this.clouds[a][0]-this.position.x,this.clouds[a][1]-this.position.y,this.clouds[a][5]*(1-0.5*b/(lb-1)))
                        }
                    }
                    this.layer.fill(250,50,100,this.fade*0.2)
                    for(let a=0,la=4;a<la;a++){
                        this.layer.ellipse(0,0,24-a*4)
                    }
                break
                case 178:
                    this.layer.rotate(this.direction)
                    this.layer.scale(0.6)
                    this.layer.fill(150,25,200,this.fade*0.5)
                    regStar(this.layer,0,0,5,20,20,2,2,180)
                    this.layer.fill(150,25,200,this.fade)
                    regStar(this.layer,0,0,5,16,16,1,1,180)
                    this.layer.fill(150,225,75,this.fade)
                    this.layer.ellipse(0,0,10,24)
                    this.layer.fill(100,150,50,this.fade)
                    this.layer.quad(-1,0,0,-12,1,0,0,12)
                    this.layer.rotate(-36)
                    this.layer.quad(-1,0,0,-10,1,0,0,10)
                    this.layer.rotate(72)
                    this.layer.quad(-1,0,0,-10,1,0,0,10)
                    this.layer.rotate(-36)
                    this.layer.fill(200,255,200,this.fade)
                    regStar(this.layer,this.sparkle[0],this.sparkle[1],5,15*this.sparkle[2],15*this.sparkle[2],1.5*this.sparkle[2],1.5*this.sparkle[2],0)
                break
                case 179:
                    this.layer.rotate(this.time*-5)
                    this.layer.fill(255,this.fade)
                    this.layer.arc(0,0,20,20,-180,0)
                    this.gradient=new p5.LinearGradient(0,20)
                    this.gradient.colors(0.0,color(102,23,11),1.0,color(215,211,206))
                    this.layer.fillGradient(this.gradient)
                    this.layer.translate(-5,-5)
                    this.layer.arc(5,5,20,20,0,180)
                    this.layer.ellipse(10,5,10)
                    this.layer.pop()
                    this.layer.push()
                    this.layer.translate(this.position.x,this.position.y)
                    this.layer.scale(this.size*this.scale)
                    this.layer.rotate(this.time*-5)
                    this.layer.noStroke()
                    this.layer.fill(255,this.fade)
                    this.layer.arc(-5,0,10,10,0,180)
                    this.layer.ellipse(5,0,3)
                    this.layer.fill(102,23,11,this.fade)
                    this.layer.ellipse(-5,0,3)
                break
                case 180:
                    this.layer.rotate(this.time*-5)
                    this.layer.fill(255,this.fade)
                    this.layer.arc(0,0,20,20,-180,0)
                    this.gradient=new p5.LinearGradient(0,20)
                    this.gradient.colors(0.0,color(187,220,201),1.0,color(219,188,154))
                    this.layer.fillGradient(this.gradient)
                    this.layer.translate(-5,-5)
                    this.layer.arc(5,5,20,20,0,180)
                    this.layer.ellipse(10,5,10)
                    this.layer.pop()
                    this.layer.push()
                    this.layer.translate(this.position.x,this.position.y)
                    this.layer.scale(this.size*this.scale)
                    this.layer.rotate(this.time*-5)
                    this.layer.noStroke()
                    this.layer.fill(255,this.fade)
                    this.layer.arc(-5,0,10,10,0,180)
                    this.layer.ellipse(5,0,3)
                    this.layer.fill(187,220,201,this.fade)
                    this.layer.ellipse(-5,0,3)
                break
                case 181:
                    this.layer.rotate(this.time*-5)
                    this.layer.fill(255,this.fade)
                    this.layer.arc(0,0,20,20,-180,0)
                    this.gradient=new p5.LinearGradient(0,20)
                    this.gradient.colors(0.0,color(12,23,97),1.0,color(239,217,182))
                    this.layer.fillGradient(this.gradient)
                    this.layer.translate(-5,-5)
                    this.layer.arc(5,5,20,20,0,180)
                    this.layer.ellipse(10,5,10)
                    this.layer.pop()
                    this.layer.push()
                    this.layer.translate(this.position.x,this.position.y)
                    this.layer.scale(this.size*this.scale)
                    this.layer.rotate(this.time*-5)
                    this.layer.noStroke()
                    this.layer.fill(255,this.fade)
                    this.layer.arc(-5,0,10,10,0,180)
                    this.layer.ellipse(5,0,3)
                    this.layer.fill(12,23,97,this.fade)
                    this.layer.ellipse(-5,0,3)
                break
                case 182:
                    this.layer.rotate(this.time*-5)
                    this.layer.fill(255,this.fade)
                    this.layer.arc(0,0,20,20,-180,0)
                    this.gradient=new p5.LinearGradient(0,20)
                    this.gradient.colors(0.0,color(81,98,91),1.0,color(154,205,162))
                    this.layer.fillGradient(this.gradient)
                    this.layer.translate(-5,-5)
                    this.layer.arc(5,5,20,20,0,180)
                    this.layer.ellipse(10,5,10)
                    this.layer.pop()
                    this.layer.push()
                    this.layer.translate(this.position.x,this.position.y)
                    this.layer.scale(this.size*this.scale)
                    this.layer.rotate(this.time*-5)
                    this.layer.noStroke()
                    this.layer.fill(255,this.fade)
                    this.layer.arc(-5,0,10,10,0,180)
                    this.layer.ellipse(5,0,3)
                    this.layer.fill(81,98,91,this.fade)
                    this.layer.ellipse(-5,0,3)
                break
                case 183:
                    this.layer.stroke(102+this.color*113,23+this.color*188,11+this.color*205,this.fade)
                    this.layer.strokeWeight(3)
                    for(let a=0,la=this.ticks;a<la;a++){
                        this.layer.line(
                            map(a/la,0,1,0,this.position2.x)+(a==0?0:this.sets[a-1][0]),
                            map(a/la,0,1,0,this.position2.y)+(a==0?0:this.sets[a-1][1]),
                            map((a+1)/la,0,1,0,this.position2.x)+this.sets[a][0],
                            map((a+1)/la,0,1,0,this.position2.y)+this.sets[a][1])
                    }
                    this.layer.stroke(102+this.color*113,23+this.color*188,11+this.color*205,this.fade*0.5)
                    this.layer.strokeWeight(6)
                    for(let a=0,la=this.ticks;a<la;a++){
                        this.layer.line(
                            map(a/la,0,1,0,this.position2.x)+(a==0?0:this.sets[a-1][0]),
                            map(a/la,0,1,0,this.position2.y)+(a==0?0:this.sets[a-1][1]),
                            map((a+1)/la,0,1,0,this.position2.x)+this.sets[a][0],
                            map((a+1)/la,0,1,0,this.position2.y)+this.sets[a][1])
                    }
                break
                case 184:
                    this.layer.rotate(this.time*-5+this.offset)
                    this.layer.fill(175+80*this.fade,255*this.fade,255*this.fade,this.fade)
                    this.layer.arc(0,0,20,20,-180,0)
                    this.layer.fill(175,0,0,this.fade)
                    this.layer.arc(0,0,20,20,0,180)
                    this.layer.arc(5,0,10,10,-180,0)
                    this.layer.fill(175+80*this.fade,255*this.fade,255*this.fade,this.fade)
                    this.layer.arc(-5,0,10,10,0,180)
                    this.layer.ellipse(5,0,3)
                    this.layer.fill(175,0,0,this.fade)
                    this.layer.ellipse(-5,0,3)
                break
                case 185:
                    let cap=constrain(this.activation,0,1)
                    this.layer.rotate(this.direction)
                    this.layer.noFill()
                    for(let a=0,la=5;a<la;a++){
                        for(let b=0,lb=4;b<lb;b++){
                            this.layer.stroke(b/(lb-1)*120,40-b/(lb-1)*40,120+b/(lb-1)*40,this.fade*0.4)
                            this.layer.strokeWeight((1.6-b*0.4)*cap)
                            this.layer.line(-6+a*3,-16,-6+a*3,-400)
                        }
                        this.layer.stroke(225,225,255,this.fade)
                        this.layer.strokeWeight(2.4*cap)
                        this.layer.point(-6+a*3,-16)
                        this.layer.stroke(200,200,255,this.fade)
                        this.layer.strokeWeight(2*cap)
                        this.layer.point(-6+a*3,-16)
                    }
                    for(let a=0,la=this.sparks.length;a<la;a++){
                        this.layer.stroke(255,this.sparks[a][2]*this.fade)
                        this.layer.strokeWeight(0.2*cap)
                        regStar(this.layer,-6+this.sparks[a][0]*3,-16-this.sparks[a][1],5,1.5,1.5,0.5,0.5,this.sparks[a][3])
                    }
                break
                case 186:
                    for(let a=0,la=5;a<la;a++){
                        this.layer.fill([255,255,100,100,255][a],[100,255,255,255,100,][a],[100,100,100,255,255][a],this.fade)
                        this.layer.triangle(
                            lsin(a*72+this.time*6)*16,lcos(a*72+this.time*6)*16,
                            lsin(a*72+this.time*6)*8+lsin(a*72+144+this.time*6)*8,lcos(a*72+this.time*6)*8+lcos(a*72+144+this.time*6)*8,
                            lsin(a*72+this.time*6)*8+lsin(a*72+144+this.time*6)*8-lsin(a*72+72+this.time*6)*2,lcos(a*72+this.time*6)*8+lcos(a*72+144+this.time*6)*8-lcos(a*72+72+this.time*6)*2
                        )
                        this.layer.triangle(
                            lsin(a*72+72+this.time*6)*16,lcos(a*72+72+this.time*6)*16,
                            lsin(a*72-72+this.time*6)*8+lsin(a*72+72+this.time*6)*8,lcos(a*72-72+this.time*6)*8+lcos(a*72+72+this.time*6)*8,
                            lsin(a*72-72+this.time*6)*8+lsin(a*72+72+this.time*6)*8-lsin(a*72+this.time*6)*2,lcos(a*72-72+this.time*6)*8+lcos(a*72+72+this.time*6)*8-lcos(a*72+this.time*6)*2
                        )
                    }
                break
                case 187:
                    this.layer.rotate(this.direction)
                    this.layer.stroke(20+220*this.key,240*this.key,40+80*this.key,constrain(this.fade,0,1)*this.mult)
                    for(let a=0,la=5;a<la;a++){
                        this.layer.strokeWeight((10-a*2)*this.width)
                        this.layer.line(0,0,0,1000-a*200)
                    }
                break
                case 188:
                    this.layer.rotate(this.direction)
                    for(let a=0,la=5;a<la;a++){
                        this.layer.fill(255,a/(la-1)*240,175+a/(la-1)*80,this.fade)
                        this.layer.ellipse(0,0,10-a*2,16-a*3)
                    }
                break
                case 189:
                    this.layer.rotate(this.direction)
                    for(let a=0,la=5;a<la;a++){
                        this.layer.fill(50,150+a/(la-1)*100,250,this.fade)
                        this.layer.quad(0,0,-1+a/la,12,0,16-a/la*2,1-a/la,12)
                    }
                break
                case 190:
                    this.layer.rotate(this.direction)
                    this.layer.fill(225,175,0,this.fade*0.1)
                    this.layer.ellipse(0,0,12)
                    this.layer.ellipse(0,0,15)
                    this.layer.ellipse(0,0,18)
                    this.layer.triangle(-1,0,1,0,0,40)
                    this.layer.triangle(-2,0,2,0,0,60)
                    this.layer.triangle(-3,0,3,0,0,80)
                    this.layer.fill(225,175,0,this.fade)
                    regStar(this.layer,0,0,4,12,12,2,2,this.spin)
                    this.layer.ellipse(0,0,9)
                    for(let a=0,la=this.trail.length;a<la;a++){
                        regStar(this.layer,this.trail[a][0],this.trail[a][1],4,3*this.trail[a][2],3*this.trail[a][2],0.5*this.trail[a][2],0.5*this.trail[a][2],this.trail[a][3])
                        this.layer.ellipse(this.trail[a][0],this.trail[a][1],2.25*this.trail[a][2])
                    }
                    this.layer.fill(255,this.fade)
                    regStar(this.layer,0,0,4,9,9,1.5,1.5,this.spin)
                    this.layer.ellipse(0,0,9)
                    for(let a=0,la=this.trail.length;a<la;a++){
                        regStar(this.layer,this.trail[a][0],this.trail[a][1],4,2*this.trail[a][2],2*this.trail[a][2],0.35*this.trail[a][2],0.35*this.trail[a][2],this.trail[a][3])
                        this.layer.ellipse(this.trail[a][0],this.trail[a][1],1.5*this.trail[a][2])
                    }
                break
                case 191:
                    this.layer.noFill()
                    for(let a=0,la=5;a<la;a++){
                        this.layer.stroke(20+220*this.key,240*this.key,40+80*this.key,this.fade*(a+1)/la*this.fadeKey)
                        this.layer.strokeWeight(8*(1-a/la))
                        regPolyStellate(this.layer,0,0,5,2,30,30,this.time*2)
                    }
                break
                case 192:
                    for(let a=0,la=12;a<la;a++){
                        this.layer.rotate(180/la)
                        this.layer.fill(150+a/(la-1)*100,150+a/(la-1)*100,150,this.fade)
                        this.layer.beginShape()
                        this.layer.vertex(-1,-8)
                        this.layer.vertex(-1,-10)
                        this.layer.vertex(-2.5,-10)
                        this.layer.vertex(0,-12.5)
                        this.layer.vertex(2.5,-10)
                        this.layer.vertex(1,-10)
                        this.layer.vertex(1,-8)
                        this.layer.endShape()
                        this.layer.rotate(180/la)
                    }
                break
                case 193:
                    for(let a=0,la=12;a<la;a++){
                        this.layer.rotate(180/la)
                        this.layer.fill(a/(la-1)*150,50-a/(la-1)*100,200,this.fade)
                        this.layer.beginShape()
                        this.layer.vertex(-2,-11)
                        this.layer.vertex(0,-11)
                        this.layer.vertex(0,-12.5)
                        this.layer.vertex(2.5,-10)
                        this.layer.vertex(0,-7.5)
                        this.layer.vertex(0,-9)
                        this.layer.vertex(-2,-9)
                        this.layer.endShape()
                        this.layer.rotate(180/la)
                    }
                break
                case 195:
                    this.layer.noFill()
                    this.layer.strokeWeight(0.25)
                    this.layer.stroke(220,60,40,this.fade*2)
                    this.layer.ellipse(0,0,10*constants.sqrt2)
                    this.layer.rect(0,0,10)
                    this.layer.rect(0,0,9)
                    this.layer.rotate(45)
                    this.layer.strokeWeight(0.15)
                    this.layer.ellipse(0,0,10*constants.sqrt2)
                    this.layer.stroke(200,40,20,this.fade*2)
                    this.layer.rect(0,0,10)
                    this.layer.rect(0,0,9)
                break
                case 196:
                    this.layer.noFill()
                    this.layer.stroke(255,150,175,this.fade*0.5)
                    this.layer.strokeWeight(3)
                    this.layer.ellipse(0,0,20)
                    this.layer.quad(-10,0,0,-10,10,0,0,10)
                    this.layer.line(-15,0,-10,0)
                    this.layer.line(0,-15,0,-10)
                    this.layer.line(15,0,10,0)
                    this.layer.line(0,15,0,10)
                    this.layer.stroke(225,50,100,this.fade)
                    this.layer.strokeWeight(1)
                    this.layer.ellipse(0,0,20)
                    this.layer.quad(-10,0,0,-10,10,0,0,10)
                    this.layer.line(-15,0,-10,0)
                    this.layer.line(0,-15,0,-10)
                    this.layer.line(15,0,10,0)
                    this.layer.line(0,15,0,10)
                break
                case 197:
                    for(let a=0,la=10;a<la;a++){
                        this.layer.fill(...mergeColor([255,245,125],[255,255,235],a/la),this.fade*0.2)
                        regStar(this.layer,0,0,4,9*(1-a/la),9*(1-a/la),3*(1-a/la),3*(1-a/la),(this.time*2-a*9)*(this.side*2-1))
                    }
                break
                case 198:
                    this.layer.rotate(this.time*-5)
                    this.layer.fill(200,50,100,this.fade*0.2)
                    regStar(this.layer,0,0,6,20,20,6,6,0)
                    this.layer.fill(100,50,200,this.fade*0.2)
                    regStar(this.layer,0,0,6,6,6,20,20,0)
                    this.layer.fill(200,50,100,this.fade)
                    this.layer.arc(0,0,20,20,-180,0)
                    this.layer.fill(100,50,200,this.fade)
                    this.layer.arc(0,0,20,20,0,180)
                    this.layer.ellipse(5,0,10)
                    this.layer.fill(200,50,100,this.fade)
                    this.layer.ellipse(-5,0,10)
                break
                case 199:
                    this.layer.rotate(this.time*-2)
                    this.layer.fill(255,255,240,this.fade)
                    this.layer.beginShape()
                    this.layer.vertex(0,10)
                    for(let a=0,la=18;a<la;a++){
                        this.layer.bezierVertex(
                            lsin((a+0.2)/la*360)*11,lcos((a+0.2)/la*360)*11,
                            lsin((a+0.8)/la*360)*11,lcos((a+0.8)/la*360)*11,
                            lsin((a+1)/la*360)*10,lcos((a+1)/la*360)*10
                        )
                    }
                    this.layer.endShape()
                    for(let a=0,la=10;a<la;a++){
                        let size=1-a%2*0.2
                        this.layer.fill(255-a%2*105,255-a%2*230,200-a%2*175,this.fade)
                        this.layer.beginShape()
                        this.layer.vertex(0,0)
                        this.layer.vertex(6*size,-1*size)
                        this.layer.bezierVertex(10*size,-1*size,14*size,2*size,18*size,9*size)
                        this.layer.bezierVertex(14*size,4*size,10*size,2*size,6*size,1*size)
                        this.layer.endShape()
                        this.layer.rotate(360/la)
                    }
                break
                case 200:
                    this.layer.rotate(this.direction)
                    for(let a=0,la=8;a<la;a++){
                        this.layer.fill(255,150+a/la*150,150+a/la*50,this.fade)
                        this.layer.rect(0,-640,8-a,1200)
                        this.layer.triangle(-4+a*0.5,-40,4-a*0.5,-40,0,-20)
                    }
                break
                case 201:
                    this.layer.rotate(this.direction)
                    this.layer.scale(0.8)
                    this.layer.stroke(...[[255,100,100],[255,150,50],[255,255,175],[80,240,80],[40,160,240],[150,0,180]][this.color],this.fade*0.25)
                    for(let a=0,la=3;a<la;a++){
                        this.layer.strokeWeight(9-a*2)
                        this.layer.line(0,-8,-6,-2)
                        this.layer.line(0,-8,6,-2)
                        this.layer.line(-6,-2,-10,6)
                        this.layer.line(6,-2,10,6)
                    }
                    this.layer.stroke(...[[255,0,0],[255,125,0],[255,255,100],[40,160,40],[20,120,200],[90,0,120]][this.color],this.fade)
                    this.layer.strokeWeight(3)
                    this.layer.line(0,-8,-6,-2)
                    this.layer.line(0,-8,6,-2)
                    this.layer.line(-6,-2,-10,6)
                    this.layer.line(6,-2,10,6)
                    this.layer.strokeWeight(6)
                    this.layer.point(0,6)
                    this.layer.stroke(...[[255,100,100],[255,150,50],[255,255,175],[80,240,80],[40,160,240],[150,0,180]][this.color],this.fade)
                    this.layer.strokeWeight(2)
                    this.layer.line(0,-8,-6,-2)
                    this.layer.line(0,-8,6,-2)
                    this.layer.line(-6,-2,-10,6)
                    this.layer.line(6,-2,10,6)
                    this.layer.strokeWeight(4)
                    this.layer.point(0,6)
                break
                case 202:
                    this.layer.rotate(this.time*-1.5)
                    this.layer.fill(170,this.fade)
                    regStar(this.layer,0,0,5,10,10,6,6,0)
                    this.layer.fill(210,this.fade)
                    regStar(this.layer,0,0,5,6,6,10,10,0)
                break
                case 203:
                    this.layer.rotate(this.direction)
                    this.layer.fill(170,this.fade)
                    this.layer.ellipse(0,0,8,12)
                    this.layer.fill(210,this.fade)
                    this.layer.ellipse(0,0,4,8)
                break
                case 204:
                    this.layer.rotate(this.direction)
                    this.layer.fill(...[[255,255,100],[100,100,255]][this.color],this.fade*0.1)
                    for(let a=0,la=6;a<la;a++){
                        this.layer.ellipse(0,0,36-a*3,48-a*4)
                    }
                    for(let a=0,la=6;a<la;a++){
                        this.layer.fill(...[[255,255,100+a/(la-1)*150],[100+a/(la-1)*150,100+a/(la-1)*150,255]][this.color],this.fade)
                        this.layer.ellipse(0,0,18-a*3,24-a*4)
                    }
                break
                case 205:
                    this.layer.rotate(this.direction)
                    for(let a=0,la=5;a<la;a++){
                        this.layer.fill(...[[255,255,100+a/(la-1)*150],[100+a/(la-1)*150,100+a/(la-1)*150,255]][this.color],this.fade)
                        this.layer.ellipse(0,0,10-a*2,15-a*3)
                    }
                break
                case 206:
                    this.layer.fill(150,25,200,this.fade)
                    this.layer.ellipse(0,0,10)
                    this.layer.fill(125,25,175,this.fade)
                    this.layer.ellipse(0,0,9)
                    this.layer.fill(100,25,150,this.fade)
                    this.layer.ellipse(0,0,8)
                    this.layer.noFill()
                    this.layer.stroke(200,150,225,this.fade)
                    this.layer.strokeJoin(ROUND)
                    this.layer.strokeWeight(0.5)
                    regPolyStellate(this.layer,0,0,5,2,4,4,15)
                    for(let a=0,la=5;a<la;a++){
                        this.layer.arc(0,0,8,8,30+a*72,60+a*72)
                    }
                    this.layer.strokeJoin(MITER)
                    this.layer.strokeWeight(1.5)
                    for(let a=0,la=5;a<la;a++){
                        this.layer.point(lsin(15+a*72)*4,lcos(15+a*72)*4)
                    }
                break
                case 207:
                    this.layer.rotate(this.direction)
                    for(let a=0,la=6;a<la;a++){
                        this.layer.fill(255,200+a/la*100,50+a/la*150,this.fade)
                        for(let b=0,lb=6;b<lb;b++){
                            this.layer.rect(0,-640,6-a,1200)
                            this.layer.triangle(-3+a*0.5,-40,3-a*0.5,-40,0,-20)
                            this.layer.rotate(360/lb)
                        }
                    }
                break
                case 208: case 210:
                    this.layer.rotate(this.direction)
                    this.layer.scale(0.6)
                    for(let a=0,la=4;a<la;a++){
                        this.layer.fill(...mergeColor([this.color*50,50+this.color*150,255],[255,255,255],a/(la-1)),this.fade*0.2)
                        this.layer.triangle(-4,3,4,3,0,(20+a*10)*min(this.time/20,1))
                    }
                    this.layer.fill(this.color*50,50+this.color*150,255,this.fade*0.2)
                    for(let a=0,la=4;a<la;a++){
                        regStar(this.layer,0,0,5,12-a,12-a,5.4-a*0.45,5.4-a*0.45,this.time*this.gear)
                    }
                    this.layer.fill(255,this.fade*0.4)
                    for(let a=0,la=5;a<la;a++){
                        regStar(this.layer,0,0,5,8-a,8-a,3.6-a*0.45,3.6-a*0.45,this.time*this.gear)
                    }
                break
                case 209:
                    this.layer.rotate(this.direction)
                    this.layer.scale(0.6)
                    for(let a=0,la=4;a<la;a++){
                        this.layer.fill(...mergeColor([this.color*50,50+this.color*150,255],[255,255,255],a/(la-1)),this.fade*0.2)
                        this.layer.triangle(-3,3,3,3,0,(16+a*8)*min(this.time/20,1))
                    }
                    this.layer.fill([this.color*50,50+this.color*150,255],this.fade*0.2)
                    this.layer.noFill()
                    this.layer.stroke(this.color*50,50+this.color*150,255,this.fade*0.2)
                    for(let a=0,la=4;a<la;a++){
                        this.layer.strokeWeight(4-a*2)
                        regStar(this.layer,0,0,5,8,8,3.6,3.6,this.time*this.gear)
                    }
                    this.layer.stroke(255,this.fade*0.4)
                    for(let a=0,la=5;a<la;a++){
                        this.layer.strokeWeight(2-a)
                        regStar(this.layer,0,0,5,6-a*0.5,6-a*0.5,2.7-a*0.225,2.7-a*0.225,this.time*this.gear)
                    }
                    this.layer.stroke(255,this.fade)
                    this.layer.strokeWeight(1)
                    regStar(this.layer,0,0,5,3.5,3.5,1.575,1.575,this.time*this.gear)
                break
                case 212:
                    this.layer.rotate(this.direction)
                    for(let a=0,la=5;a<la;a++){
                        this.layer.fill(255,225,0,this.fade)
                        this.layer.quad(0,0,-1,-4,0,-12,1,-4)
                        this.layer.fill(225,175,0,this.fade)
                        this.layer.quad(0,0,-0.5,-2,0,-8,0.5,-2)
                        this.layer.rotate(360/la)
                    }
                break
                case 213:
                    this.layer.rotate(this.time*this.gear)
                    flower(this.layer,0.1,[[241,170,189],[250,222,226],[240,207,211],[254,228,232]],[20,40,12,4],[54],this.fade,4)
                break
                case 214:
                    this.layer.rotate(this.direction)
                    this.layer.fill(80,160,200,this.fade*0.25)
                    this.layer.stroke(80,160,200,this.fade*10)
                    this.layer.strokeWeight(1)
                    this.layer.ellipse(0,0,20)
                    this.layer.strokeWeight(0.05)
                    for(let a=0,la=15;a<la;a++){
                        this.layer.stroke(...[[120,200,240],[0,80,160],[40,0,80]][a%3],this.fade*10)
                        this.layer.line(2*lsin(a/la*360),2*lcos(a/la*360),8*lsin(a/la*360),8*lcos(a/la*360))
                    }
                    this.layer.noFill()
                    this.layer.strokeWeight(0.1)
                    for(let a=0,la=9;a<la;a++){
                        this.layer.stroke(...[[120,200,240],[0,80,160],[40,0,80]][a%3],this.fade*10)
                        this.layer.arc(0,0,a*2,a*2,(a-0.1)/la*720,(a+0.1)/la*720)
                        this.layer.arc(0,0,a*2,a*2,(a-0.1)/la*720+180,(a+0.1)/la*720+180)
                    }
                    this.layer.noStroke()
                    for(let a=0,la=60;a<la;a++){
                        this.layer.fill(...[[120,200,240],[0,80,160],[40,0,80]][a%3],this.fade)
                        this.layer.rotate(135+this.tick[a][0])
                        regPoly(this.layer,0,-9.5+0.25*this.tick[a][1]+a*0.15,6,0.2*this.tick[a][1],0.2*this.tick[a][1],0)
                    }
                break
                case 215:
                    this.layer.rotate(this.direction)
                    this.layer.stroke(200,100,0,this.fade)
                    this.layer.strokeWeight(2)
                    this.layer.line(0,0,4,6)
                    this.layer.line(-4,18,4,6)
                    this.layer.line(-4,18,4,30)
                    this.layer.line(-4,42,4,30)
                    this.layer.line(-4,42,0,48)
                    this.layer.noStroke()
                    this.layer.fill(225,125,25,this.fade*0.2)
                    for(let a=0,la=8;a<la;a++){
                        regStar(this.layer,0,0,5,24-a,24-a,10.8-a*0.45,10.8-a*0.45,this.time)
                    }
                    this.layer.fill(255,this.fade*0.1)
                    for(let a=0,la=15;a<la;a++){
                        regStar(this.layer,0,0,5,16-a,16-a,7.2-a*0.45,7.2-a*0.45,this.time)
                    }
                break
                case 216:
                    let cap216=constrain(this.activation,0,1)
                    this.layer.rotate(this.direction)
                    this.layer.noFill()
                    for(let a=0,la=3;a<la;a++){
                        for(let b=0,lb=4;b<lb;b++){
                            this.layer.stroke(120-b/(lb-1)*40,0,40+b/(lb-1)*40,this.fade*0.4)
                            this.layer.strokeWeight((1.2-b*0.3)*cap216)
                            this.layer.line(-3+a*3,-10,0,-400)
                        }
                        this.layer.stroke(180,0,120,this.fade)
                        this.layer.strokeWeight(1.8*cap216)
                        this.layer.point(-3+a*3,-10)
                        this.layer.stroke(150,0,100,this.fade)
                        this.layer.strokeWeight(1.5*cap216)
                        this.layer.point(-3+a*3,-10)
                    }
                    for(let a=0,la=this.sparks.length;a<la;a++){
                        this.layer.stroke(255,225,255,this.sparks[a][2]*this.fade)
                        this.layer.strokeWeight(0.1*cap216)
                        regStar(this.layer,-3+this.sparks[a][0]*3,-410+this.sparks[a][1],3,1,1,0.2,0.2,this.sparks[a][3])
                    }
                break
                case 220:
                    this.layer.noFill()
                    let cap220=constrain(this.activation,0,1)
                    for(let a=0,la=4;a<la;a++){
                        this.layer.stroke(120-a/(la-1)*40,0,40+a/(la-1)*40,this.fade*0.4)
                        this.layer.strokeWeight((1.2-a*0.3)*cap220)
                        this.layer.ellipse(0,0,60)
                    }
                    for(let a=0,la=6;a<la;a++){
                        this.layer.stroke(180,0,120,this.fade)
                        this.layer.strokeWeight(3.6*cap220)
                        this.layer.point(lsin(a/la*360)*30,lcos(a/la*360)*30)
                        this.layer.stroke(150,0,100,this.fade)
                        this.layer.strokeWeight(3*cap220)
                        this.layer.point(lsin(a/la*360)*30,lcos(a/la*360)*30)
                    }
                    for(let a=0,la=this.sparks.length;a<la;a++){
                        this.layer.stroke(255,225,255,this.sparks[a][1]*this.fade)
                        this.layer.strokeWeight(0.1*cap220)
                        regStar(this.layer,lsin(this.sparks[a][0])*30,lcos(this.sparks[a][0])*30,3,1,1,0.2,0.2,this.sparks[a][2])
                    }
                break
                case 221:
                    this.layer.noFill()
                    this.layer.strokeJoin(ROUND)
                    for(let a=0,la=8;a<la;a++){
                        this.layer.stroke(...mergeColor(this.color[0],[255,225,255],a/la),this.fade)
                        this.layer.strokeWeight(8-a)
                        regStar(this.layer,0,0,5,16-a*0.5,16-a*0.5,7.2-a*0.225,7.2-a*0.225,this.spin)
                    }
                    this.layer.strokeJoin(MITER)
                break
                case 222: case 223: case 234: case 235:
                    this.layer.noFill()
                    this.layer.strokeJoin(ROUND)
                    for(let a=0,la=4;a<la;a++){
                        this.layer.stroke(...mergeColor(mergeColor(this.color[0],this.color[1],this.colorShift),[255,225,255],a/la),this.fade)
                        this.layer.strokeWeight(4-a)
                        regStar(this.layer,0,0,5,12-a*0.5,12-a*0.5,5.4-a*0.225,5.4-a*0.225,this.spin)
                    }
                    this.layer.strokeJoin(MITER)
                break
                case 224:
                    this.layer.stroke(255,this.fade*0.5)
                    for(let a=0,la=3;a<la;a++){
                        this.layer.strokeWeight(3-a)
                        if(this.progress<450){
                            this.layer.line(
                                map(this.progress%50/50,0,1,this.points[floor(this.progress/50)][0],this.points[floor(this.progress/50)+1][0]),
                                map(this.progress%50/50,0,1,this.points[floor(this.progress/50)][1],this.points[floor(this.progress/50)+1][1]),
                                this.points[floor(this.progress/50)][0],this.points[floor(this.progress/50)][1]
                            )
                        }
                        if(this.progress>=50){
                            this.layer.line(
                                map(this.progress%50/50,0,1,this.points[floor(this.progress/50)-1][0],this.points[floor(this.progress/50)][0]),
                                map(this.progress%50/50,0,1,this.points[floor(this.progress/50)-1][1],this.points[floor(this.progress/50)][1]),
                                this.points[floor(this.progress/50)][0],this.points[floor(this.progress/50)][1]
                            )
                        }
                    }
                break
                case 225:
                    this.layer.fill(50,0,0,this.fade)
                    this.layer.ellipse(0,0,12,12)
                    this.layer.fill(100,25,0,this.fade)
                    this.layer.ellipse(0,0,8,8)
                    this.layer.fill(100,75,0,this.fade)
                    this.layer.ellipse(0,0,4,4)
                break
                case 226:
                    this.layer.rotate(this.direction)
                    this.layer.fill(100,200,50,this.fade*0.5)
                    this.layer.ellipse(0,0,6,12)
                    this.layer.ellipse(0,0,3,6)
                    this.layer.quad(0,0,-6,-2,0,-4,6,-2)
                    this.layer.quad(0,0,-6,2,0,4,6,2)
                break
                case 227:
                    this.layer.rotate(this.direction)
                    this.layer.fill(200,255,255,this.fade*0.5)
                    this.layer.ellipse(0,0,6,12)
                    this.layer.ellipse(0,0,3,6)
                    this.layer.quad(0,0,-6,-2,0,-4,6,-2)
                    this.layer.quad(0,0,-6,2,0,4,6,2)
                break
                case 228:
                    this.layer.noFill()
                    this.layer.stroke(...this.color,this.fade)
                    this.layer.strokeWeight(2)
                    this.layer.ellipse(0,0,10,4)
                break
                case 229:
                    let cap229=constrain(this.activation,0,1)
                    this.layer.rotate(this.direction)
                    this.layer.noFill()
                    for(let a=0,la=3;a<la;a++){
                        for(let b=0,lb=4;b<lb;b++){
                            this.layer.stroke(120-b/(lb-1)*40,b/(lb-1)*20,b/(lb-1)*20,this.fade*0.4)
                            this.layer.strokeWeight((1.2-b*0.3)*cap229)
                            this.layer.line(-3+a*3,-10,0,-400)
                        }
                        this.layer.stroke(180,30,30,this.fade)
                        this.layer.strokeWeight(1.8*cap229)
                        this.layer.point(-3+a*3,-10)
                        this.layer.stroke(150,25,25,this.fade)
                        this.layer.strokeWeight(1.5*cap229)
                        this.layer.point(-3+a*3,-10)
                    }
                    for(let a=0,la=this.sparks.length;a<la;a++){
                        this.layer.stroke(50,0,100,this.sparks[a][2]*this.fade)
                        this.layer.strokeWeight(0.1*cap229)
                        regStar(this.layer,-3+this.sparks[a][0]*3,-410+this.sparks[a][1],3,1,1,0.2,0.2,this.sparks[a][3])
                    }
                break
                case 230:
                    this.layer.strokeWeight(2)
                    for(let a=0,la=this.points.length;a<la;a++){
                        this.layer.stroke(255,this.fade*(0.8+a*0.08-this.time*0.01))
                        this.layer.line(
                            this.points[a][0]+this.base.position.x-this.position.x,
                            this.points[a][1]+this.base.position.y-this.position.y,
                            a==la-1?0:this.points[a+1][0]+this.base.position.x-this.position.x,
                            a==la-1?0:this.points[a+1][1]+this.base.position.y-this.position.y
                        )
                    }
                    this.layer.rotate(this.direction)
                    this.layer.noStroke()
                    this.layer.fill(100,200,225,this.fade)
                    this.layer.quad(-1,-12.5,0,-10,0,5,-1,5)
                    this.layer.fill(50,150,225,this.fade)
                    this.layer.quad(1,-7.5,0,-10,0,5,1,5)
                    this.layer.fill(255,255,255,this.fade)
                    this.layer.rect(0,6,5,2)
                    this.layer.rect(0,8,3,2)
                break
                case 231:
                    this.layer.rotate(this.position.y*3+this.spin)
                    this.layer.fill(120-this.color*120,240,240,this.fade*0.5)
                    this.layer.stroke(80-this.color*80,200,200,this.fade)
                    this.layer.strokeWeight(2)
                    this.layer.quad(-3,0,0,-6,3,0,0,6)
                    this.layer.strokeWeight(3)
                    this.layer.point(0,0)
                break
                case 233:
                    this.layer.rotate(this.direction)
                    this.layer.scale(this.side,1)
                    this.layer.fill(...[[255,0,0],[255,125,0],[255,255,0],[0,255,0],[0,0,255],[255,0,255]][this.color],this.fade*0.5)
                    this.layer.beginShape()
                    this.layer.vertex(0,4)
                    for(let a=0,la=6;a<la;a++){
                        this.layer.bezierVertex(12*lsin(a*60+20),12*lcos(a*60+20),16*lsin(a*60+40),16*lcos(a*60+40),18*lsin(a*60+50),18*lcos(a*60+50))
                        this.layer.bezierVertex(16*lsin(a*60+40),16*lcos(a*60+40),12*lsin(a*60+20),12*lcos(a*60+20),4*lsin(a*60+60),4*lcos(a*60+60))
                    }
                    this.layer.endShape()
                    this.layer.fill(...[[255,125,125],[255,190,125],[255,255,125],[125,255,125],[125,125,255],[255,125,255]][this.color],this.fade*0.5)
                    this.layer.beginShape()
                    this.layer.vertex(0,2)
                    for(let a=0,la=6;a<la;a++){
                        this.layer.bezierVertex(10*lsin(a*60+20),10*lcos(a*60+20),14*lsin(a*60+40),14*lcos(a*60+40),18*lsin(a*60+50),18*lcos(a*60+50))
                        this.layer.bezierVertex(16*lsin(a*60+40),16*lcos(a*60+40),14*lsin(a*60+20),14*lcos(a*60+20),2*lsin(a*60+60),2*lcos(a*60+60))
                    }
                    this.layer.endShape()
                break
                case 236:
                    this.layer.rotate(this.direction)
                    this.layer.strokeWeight(1)
                    for(let a=0,la=3;a<la;a++){
                        this.layer.fill(50+a*75,0,0,this.fade)
                        this.layer.stroke(50+a*75,0,0,this.fade)
                        if(this.occlude<10){
                            this.layer.triangle(-(90-a*15),(60-a*10),-(90-a*15)+(88-a*15)*this.occlude/10,(60-a*10)-(62-a*10)*this.occlude/10,-(90-a*15)+(92-a*15)*this.occlude/10,(60-a*10)-(58-a*10)*this.occlude/10)
                        }else if(this.occlude<20){
                            this.layer.triangle(-(90-a*15),(60-a*10),-2,-2,2,2)
                            this.layer.quad(-2,-2,2,2,2+(58-a*10)*(this.occlude-10)/10,2-(92-a*15)*(this.occlude-10)/10,-2+(62-a*10)*(this.occlude-10)/10,-2-(88-a*15)*(this.occlude-10)/10)
                        }else if(this.occlude<30){
                            this.layer.triangle((60-a*10),-(90-a*15),-2,-2,2,2)
                            this.layer.quad(-2,-2,2,2,-(90-a*15)+(92-a*15)*(this.occlude-20)/10,(60-a*10)-(58-a*10)*(this.occlude-20)/10,-(90-a*15)+(88-a*15)*(this.occlude-20)/10,(60-a*10)-(62-a*10)*(this.occlude-20)/10)
                        }else if(this.occlude<40){
                            this.layer.triangle((60-a*10),-(90-a*15),-2+(62-a*10)*(this.occlude-30)/10,-2-(88-a*15)*(this.occlude-30)/10,2+(58-a*10)*(this.occlude-30)/10,2-(92-a*15)*(this.occlude-30)/10)
                        }
                    }
                break
                case 237:
                    this.layer.rotate(this.direction)
                    for(let a=0,la=6;a<la;a++){
                        this.layer.fill(a/la*150,255+a/la*100,200+a/la*50,this.fade)
                        for(let b=0,lb=6;b<lb;b++){
                            this.layer.triangle(-3+a*0.5,-40,3-a*0.5,-40,0,-1200)
                            this.layer.triangle(-3+a*0.5,-40,3-a*0.5,-40,0,-20)
                            this.layer.rotate(360/lb)
                        }
                    }
                break
                case 238:
                    this.layer.rotate(this.direction)
                    for(let a=0,la=6;a<la;a++){
                        this.layer.fill(a/la*150,255+a/la*100,200+a/la*50,this.fade)
                        for(let b=0,lb=6;b<lb;b++){
                            this.layer.triangle(-6+a,-60-this.extent,6-a,-60-this.extent,0,-100-this.extent)
                            this.layer.triangle(-6+a,-60-this.extent,6-a,-60-this.extent,0,-40-this.extent)
                            this.layer.rotate(360/lb)
                        }
                    }
                break
                case 239:
                    this.layer.rotate(this.direction)
                    this.layer.noFill()
                    for(let a=0,la=5;a<la;a++){
                        let cap=constrain(this.activation-abs(2-a)*0.5,0,1)
                        for(let b=0,lb=5;b<lb;b++){
                            for(let c=0,lc=4;c<lc;c++){
                                this.layer.stroke(mergeColor([240-c/(lc-1)*40,240-a%2*200-c/(lc-1)*(40-a%2*20),120-a%2*60-c/(lc-1)*20],[255,255,255],1-b/lb),this.fade*0.4)
                                this.layer.strokeWeight((1.2-b*0.3)*cap*(1-b/lb*0.5))
                                this.layer.line(-6+a*3,-12+(2-a)*(2-a)*1.5,-6+a*3,-400)
                            }
                            this.layer.stroke(mergeColor([210,210-a%2*60,90-a%2*45],[255,255,255],1-b/lb),this.fade)
                            this.layer.strokeWeight(1.8*cap*(1-b/lb*0.5))
                            this.layer.point(-6+a*3,-12+(2-a)*(2-a)*1.5)
                            this.layer.stroke(mergeColor([175,175-a%2*50,75-a%2*45],[255,255,255],1-b/lb),this.fade)
                            this.layer.strokeWeight(1.5*cap*(1-b/lb*0.5))
                            this.layer.point(-6+a*3,-12+(2-a)*(2-a)*1.5)
                        }
                    }
                break
                case 240:
                    for(let a=0,la=5;a<la;a++){
                        this.layer.stroke(...mergeColor([225+a*30,50+a*100,50+a*100],[255,200,200],0.5+lsin(this.time*9)*0.5),this.fade)
                        this.layer.strokeWeight(15-a*3)
                        this.layer.line(0,0,lsin(this.direction)*900,-lcos(this.direction)*900)
                    }
                break
                case 241: case 242:
                    this.layer.rotate(this.direction)
                    this.layer.noFill()
                    this.layer.strokeJoin(ROUND)
                    for(let a=0,la=4;a<la;a++){
                        this.layer.stroke(...mergeColor(mergeColor(this.color[0],this.color[1],this.colorShift),[255,225,255],a/la*0.5),this.fade)
                        this.layer.strokeWeight(4-a)
                        this.layer.rect(0,0,12-a*0.5,12-a*0.5)
                        let value=(6-a*0.5)*constants.sqrt2
                        this.layer.quad(-value,0,0,-value,value,0,0,value)
                    }
                    this.layer.strokeJoin(MITER)
                break
                case 243:
                    for(let a=0,la=this.clouds.length;a<la;a++){
                        for(let b=0,lb=3;b<lb;b++){
                            let merge=mergeColor(mergeColor([101,165,124],[76,133,85],this.clouds[a][4]),[238,253,248],this.fade*b*0.25)
                            this.layer.fill(...merge,this.fade*this.clouds[a][2]*0.5)
                            this.layer.ellipse(this.clouds[a][0]-this.position.x,this.clouds[a][1]-this.position.y,this.clouds[a][5]*(1-0.5*b/(lb-1)))
                        }
                    }
                    this.layer.fill(113,255,129,this.fade*0.2)
                    for(let a=0,la=6;a<la;a++){
                        this.layer.ellipse(0,0,30-a*2)
                    }
                    this.layer.fill(222,244,224,this.fade)
                    this.layer.ellipse(0,0,12,18)
                    this.layer.stroke(140,157,163,this.fade)
                    this.layer.strokeWeight(0.5)
                    this.layer.noFill()
                    this.layer.arc(1,-2.5,2,2,-165,-15)
                    this.layer.arc(-3,-2.5,2,2,-165,-15)
                    this.layer.arc(-1,1,6,4,30,150)
                break
                case 244:
                    this.layer.rotate(this.time*6)
                    this.layer.fill(100,0,150,this.fade)
                    for(let a=0,la=3;a<la;a++){
                        this.layer.rotate(360/la)
                        this.layer.ellipse(-20,0,6)
                    }
                    this.layer.fill(100,0,150,this.fade*0.5)
                    for(let a=0,la=3;a<la;a++){
                        this.layer.rotate(360/la)
                        regStar(this.layer,-20,0,12,5,5,3,3,0)
                        this.layer.beginShape()
                        this.layer.vertex(-23,0)
                        this.layer.bezierVertex(-22*lcos(30),22*lsin(30),-21*lcos(60),21*lsin(60),0,20)
                        this.layer.bezierVertex(-19*lcos(60),19*lsin(60),-18*lcos(30),18*lsin(30),-17,0)
                        this.layer.endShape()
                    }
                break

            }
            //mark p
            this.layer.pop()
        }
    }
    update(parent){
        this.time++
        switch(this.type){
            case 0: case 41: case 77: case 106: case 128:
                this.position.x+=this.velocity.x/game.animRate
                this.position.y+=this.velocity.y/game.animRate
                this.velocity.y+=this.gravity/game.animRate
                if(!this.trigger){
                    this.fade+=0.2/game.animRate
                    if(this.fade>=3){
                        this.trigger=true
                    }
                }else{
                    this.fade-=0.2/game.animRate
                    if(this.fade<=0){
                        this.remove=true
                    }
                }
            break
            case 1: case 4: case 5: case 6: case 7: case 8: case 11: case 14: case 16: case 18:
            case 19: case 20: case 21: case 32: case 35: case 39: case 42: case 43: case 44: case 47:
            case 48: case 49: case 50: case 78: case 79: case 82: case 83: case 89: case 98: case 105:
            case 111: case 113: case 131: case 160: case 201:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed-10/this.timer
                this.fade=smoothAnim(this.fade,this.time<this.timer*2,0,1,5)
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 2: case 9: case 10: case 17: case 23: case 27: case 36: case 37: case 40: case 45:
            case 46: case 51: case 52: case 54: case 56: case 57: case 60: case 65: case 66: case 72:
            case 73: case 74: case 75: case 76: case 80: case 84: case 85: case 86: case 90: case 93:
            case 95: case 97: case 99: case 103: case 104: case 110: case 114: case 115: case 116: case 117:
            case 118: case 119: case 120: case 121: case 126: case 152: case 154: case 155: case 156: case 168:
            case 169: case 170: case 173: case 192: case 193: case 196: case 211: case 212: case 225: case 228:
            case 233:
                this.fade-=0.1
                this.scale+=0.1
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 3:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed-10/this.timer
                if(!this.trigger){
                    this.fade+=1/this.timer
                    if(this.fade>=1){
                        this.trigger=true
                    }
                    if(this.size<1){
                        this.size=round(this.size*5+1)/5
                    }
                }else{
                    this.fade-=1/this.timer
                    if(this.fade<=0){
                        if(this.size>0){
                            this.size=round(this.size*5-1)/5
                        }else{
                            this.remove=true
                        }
                    }
                }
            break
            case 12: case 13: case 87: case 91: case 92: case 107:
                this.fade-=1/15
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 15: case 22: case 24: case 25: case 26: case 38: case 67:
                this.fade-=1/30
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 28: case 29: case 30: case 31:
                this.fade-=1/45
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 33:
                this.fade-=1/60
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 34:
                this.fade-=1/10
                this.scale+=0.2
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 53: case 70: case 71: case 175:
                this.fade-=1/45
                if(this.fade<=0){
                    this.remove=true
                }
                for(let a=0,la=this.ticks;a<la;a++){
                    this.sets[a][0]+=random(-2,2)
                    this.sets[a][1]+=random(-2,2)
                }
            break
            case 55: case 69:
                this.fade-=1/60
                if(this.fade<=0){
                    this.remove=true
                }
                for(let a=0,la=this.ticks;a<la;a++){
                    this.sets[a][0]+=random(-1,1)
                    this.sets[a][1]+=random(-1,1)
                }
            break
            case 58:
                this.fade-=1/36
                if(this.fade<=0){
                    this.remove=true
                }
                for(let a=0,la=this.ticks;a<la;a++){
                    this.sets[a][0]+=floor(random(0,2))*2-1
                    this.sets[a][1]+=floor(random(0,2))*2-1
                }
            break
            case 59:
                this.fade-=1/36
                if(this.fade<=0){
                    this.remove=true
                }
                for(let a=0,la=this.ticks;a<la;a++){
                    this.sets[a][0]+=floor(random(0,2))*4-2
                    this.sets[a][1]+=floor(random(0,2))*4-2
                }
            break
            case 61: case 62: case 63: case 64: case 96: case 100: case 171: case 172: case 179: case 180:
            case 181: case 182: case 198:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed
                this.speed-=this.baseSpeed/30
                if(!this.trigger){
                    this.fade+=0.2
                    if(this.fade>=6){
                        this.trigger=true
                    }
                }else{
                    this.fade-=0.2
                    if(this.fade<=0){
                        this.remove=true
                    }
                }
                if(this.type==179&&this.fade>=0.5&&(this.time%15==3||this.time%15==6)){
                    let direction=random(0,360)
                    let distance=random(30,150)
                    parent.particles.push(new particle(this.layer,this.position.x,this.position.y,183,[this.position.x+sin(direction)*distance,this.position.y+cos(direction)*distance]))
                }
            break
            case 68:
                this.fade-=0.1
                this.scale+=0.3-this.fade*0.3
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 81: case 94: case 102: case 127: case 178: case 231:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed-10/this.timer
                this.fade=smoothAnim(this.fade,this.time<this.timer*2-5,0,1,5)
                this.speed*=0.98
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 88: case 133: case 136: case 194: case 217: case 218: case 219: case 232: case 244:
                this.fade-=0.05
                this.scale+=0.05
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 101:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed-10/this.timer
                this.speed*=0.96
                this.fade=smoothAnim(this.fade,this.time<this.timer*2-5,0,1,5)
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 108: case 140: case 142: case 202: case 215: case 226: case 227:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed
                this.fade=smoothAnim(this.fade,this.time<this.timer*2-5,0,1,this.type==226||this.type==227?2:10)
                this.scale=smoothAnim(this.scale,this.time<this.timer*2-5,0,1,this.type==226||this.type==227?2:10)
                if(this.time==this.timer*2-5){
                    switch(this.type){
                        case 202:
                            let direction=random(0,360)
                            for(let a=0,la=5;a<la;a++){
                                parent.particles.push(new particle(this.layer,this.position.x,this.position.y,203,[a/la*360+direction,20]))
                            }
                        break
                        case 226:
                            parent.particles.push(new particle(this.layer,this.position.x,this.position.y,211,[5,[100,200,50]]))
                        break
                        case 227:
                            parent.particles.push(new particle(this.layer,this.position.x,this.position.y,228,[3,[200,255,255]]))
                        break
                    }
                }else if(this.fade<=0){
                    this.remove=true
                    switch(this.type){
                        case 108:
                            for(let a=0,la=20;a<la;a++){
                                parent.particles.push(new particle(this.layer,this.position.x-lsin(this.direction-4.5-a*9)*120,this.position.y+lcos(this.direction-4.5-a*9)*120,109,[this.direction-4.5-a*9,a*2,-8]))
                                parent.particles.push(new particle(this.layer,this.position.x-lsin(this.direction+4.5+a*9)*120,this.position.y+lcos(this.direction+4.5+a*9)*120,109,[this.direction+4.5+a*9,a*2,-8]))
                                parent.particles.push(new particle(this.layer,this.position.x-lsin(this.direction-4.5-a*9)*120,this.position.y+lcos(this.direction-4.5-a*9)*120,109,[this.direction-4.5-a*9,a*2,8]))
                                parent.particles.push(new particle(this.layer,this.position.x-lsin(this.direction+4.5+a*9)*120,this.position.y+lcos(this.direction+4.5+a*9)*120,109,[this.direction+4.5+a*9,a*2,8]))
                            }
                        break
                        case 140:
                            for(let a=0,la=20;a<la;a++){
                                parent.particles.push(new particle(this.layer,this.position.x,this.position.y,109,[this.direction-4.5-a*9,a%6==0?30:a%2==0?15:0,-4]))
                                parent.particles.push(new particle(this.layer,this.position.x,this.position.y,109,[this.direction+4.5+a*9,a%6==0?30:a%2==0?15:0,-4]))
                                parent.particles.push(new particle(this.layer,this.position.x,this.position.y,109,[this.direction-4.5-a*9,a%6==0?30:a%2==0?15:0,4]))
                                parent.particles.push(new particle(this.layer,this.position.x,this.position.y,109,[this.direction+4.5+a*9,a%6==0?30:a%2==0?15:0,4]))
                            }
                        break
                        case 142:
                            for(let a=0,la=7;a<la;a++){
                                parent.particles.push(new particle(this.layer,this.position.x,this.position.y,143,[120+120*(a+0.5)/la,a%2==0?0:5,-(a%2+1)*0.5]))
                                parent.particles.push(new particle(this.layer,this.position.x,this.position.y,143,[120+120*(a+0.5)/la,a%2==0?0:5,(a%2+1)*0.5]))
                                /*if(a%2==0){
                                    parent.particles.push(new particle(this.layer,this.position.x,this.position.y,143,[120+120*(a+0.5)/la,10,-1]))
                                    parent.particles.push(new particle(this.layer,this.position.x,this.position.y,143,[120+120*(a+0.5)/la,10,1]))
                                }*/
                            }
                            for(let a=0,la=7;a<la;a++){
                                parent.particles.push(new particle(this.layer,this.position.x,this.position.y,
                                    146,[120+a/(la-1)*120,120,7,12+a%2*8,1+a%2*0.25]))
                            }
                        break
                        case 215:
                            parent.particles.push(new particle(this.layer,this.position.x,this.position.y,211,[5,mergeColor([225,125,25],[255,255,255],random(2,3))]))
                        break
                    }
                }
            break
            case 109: case 143:
                if(this.time>=this.delay){
                    this.position.x+=lsin(this.direction)*this.speed
                    this.position.y-=lcos(this.direction)*this.speed
                    this.direction+=this.curve
                    if(this.time<this.delay+30){
                        this.curve*=1.01
                        this.speed*=0.99
                    }else{
                        this.curve*=0.96
                        this.speed*=1.02
                    }
                    this.speed*=1.03
                    this.points.push([this.position.x,this.position.y])
                }
                if(this.time>=this.delay+300){
                    this.remove=true
                }
            break
            case 112:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed
                this.spin+=this.curl
                this.speed*=0.9
                if(!this.trigger){
                    this.fade+=0.1
                    if(this.fade>=3){
                        this.trigger=true
                    }
                }else{
                    this.fade-=0.1
                    if(this.fade<=0){
                        this.remove=true
                    }
                }
            break
            case 122:
                this.fade+=0.02
                this.scale*=(0.996-this.time*0.004)
                if(this.scale<=0){
                    this.remove=true
                }
            break
            case 123:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed
                this.fade=smoothAnim(this.fade,this.time<this.timer,0,1,5)
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 124: case 195: case 214:
                this.fade-=0.02
                this.scale=(this.scale+0.02)*(1+this.time*0.001)
                this.direction+=this.curve
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 125:
                this.fade-=0.1
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 129: case 130:
                this.fade-=0.05
                if(this.fade<=-1.5){
                    this.remove=true
                }
            break
            case 132: case 134: case 153: case 165:
                if(this.time>=this.delay){
                    this.fade-=0.05
                    this.scale+=0.05
                    if(this.fade<=0){
                        this.remove=true
                    }
                }
            break
            case 135: case 163: case 164:
                this.fade-=0.05
                this.scale+=0.1-this.time*0.005
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 137: case 138: case 176:
                this.distance+=this.speed
                this.fade=smoothAnim(this.fade,this.time<this.timer,0,1,5)
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 139:
                this.fade-=0.04
                this.scale+=0.1-this.time*0.005
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 141:
                if(!this.trigger){
                    this.fade+=0.2
                    if(this.fade>=2){
                        this.trigger=true
                    }
                }else{
                    this.fade-=0.2
                    if(this.fade<=0){
                        this.remove=true
                    }
                }
            break
            case 144:
                this.fade-=1/30
                if(this.fade<=0){
                    this.remove=true
                }
                let distance=floor(random(0,900))
                parent.particles.push(new particle(this.layer,
                    this.position.x+lsin(this.direction)*distance+random(-20,20),
                    this.position.y-lcos(this.direction)*distance+random(-20,20),
                    145+floor(random(0,2)),[random(0,360),random(10,15),floor(random(0,6)),random(1,2),1]))
            break
            case 145: case 146:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed
                if(!this.trigger){
                    this.fade+=0.2
                    if(this.fade>=2){
                        this.fade=2
                        if(this.time>this.timer){
                            this.trigger=true
                        }
                    }
                }else{
                    this.fade-=0.2
                    if(this.fade<=0){
                        this.remove=true
                    }
                }
            break
            case 147:
                this.fade-=1/30
                if(this.fade<=0){
                    this.remove=true
                }
                if(this.time%5==0){
                    parent.particles.push(new particle(this.layer,
                        this.position.x+this.position3.x,
                        this.position.y+this.position3.y,
                        148,[5,this.summon+this.time*27]))
                }
            break
            case 148:
                this.fade-=0.05
                this.scale+=0.1-this.time*0.0025
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 149: case 150:
                this.direction+=lsin(this.time*this.curveSpeed)*this.curve/60*this.curveSpeed
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed
                if(this.time>=600||this.position.y<-50||this.position.x<-50||this.position.x>this.layer.width+50){
                    this.remove=true
                }
            break
            case 151: case 158: case 177: case 243:
                this.direction+=lsin(this.time*this.curveSpeed)*this.curve/120*this.curveSpeed
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed
                if(this.time>=600||this.position.y<-300||this.position.x<-300||this.position.x>this.layer.width+300){
                    this.remove=true
                }
                for(let a=0,la=this.clouds.length;a<la;a++){
                    if(this.clouds[a][3]){
                        if(this.clouds[a][2]>0.5){
                            this.clouds[a][2]-=0.2
                        }else{
                            this.clouds[a][5]*=0.9
                            this.clouds[a][2]-=0.05
                        }
                        if(this.clouds[a][2]<=0){
                            this.clouds.splice(a,1)
                            a--
                            la--
                        }
                    }else{
                        this.clouds[a][2]+=0.2
                        if(this.clouds[a][2]>=2){
                            this.clouds[a][3]=true
                        }
                    }
                }
                if(this.type==177&&this.time>=this.timer-5){
                    this.speed*=0.8
                }
                if(this.type==177&&this.time>=this.timer){
                    this.fade-=0.1
                    if(this.clouds.length==0){
                        this.remove=true
                    }
                }else{
                    this.clouds.push([this.position.x+random(-5,5),this.position.y+random(-5,5),0,false,random(0,1),random(10,15)])
                }
            break
            case 157:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed-10/this.timer
                this.fade=smoothAnim(this.fade,this.time<this.timer*2-5,0,1,10)
                this.scale=smoothAnim(this.scale,this.time<this.timer*2-5,0,1,10)
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 159:
                if(!this.trigger){
                    this.fade+=0.1
                    if(this.fade>=2){
                        this.trigger=true
                    }
                }else{
                    this.fade-=0.1
                    if(this.fade<=0){
                        this.remove=true
                    }
                }
            break
            case 161:
                if(!this.trigger){
                    this.fade+=0.1
                    if(this.fade>=1){
                        this.trigger=true
                    }
                }else{
                    this.fade-=0.1
                    if(this.fade<=0){
                        this.remove=true
                    }
                }
            break
            case 162: case 236:
                this.occlude+=2
                if(!this.trigger){
                    this.fade+=0.1
                    if(this.fade>=1){
                        this.trigger=true
                    }
                }else{
                    this.fade-=0.1
                    if(this.fade<=0){
                        this.remove=true
                    }
                }
            break
            case 166:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed
                if(!this.trigger){
                    if(this.fade<1){
                        this.fade+=0.1
                    }
                    if(this.time>this.timer){
                        this.trigger=true
                    }
                }else{
                    this.fade-=0.1
                    if(this.fade<=0){
                        this.remove=true
                    }
                }
                if(this.time%10==0&&floor(random(0,2))==0){
                    parent.particles.push(new particle(this.layer,this.position.x,this.position.y,167,[this.direction+random(-20,20),60]))
                }
            break
            case 167:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed
                if(!this.trigger){
                    if(this.fade<1){
                        this.fade+=0.1
                    }
                    if(this.time>this.timer){
                        this.trigger=true
                    }
                }else{
                    this.fade-=0.1
                    if(this.fade<=0){
                        this.remove=true
                    }
                }
            break
            case 174:
                if(this.time>=this.delay){
                    if(!this.trigger){
                        this.fade+=0.1
                        if(this.fade>=1){
                            this.trigger=true
                        }
                    }else{
                        this.fade-=0.1
                        if(this.fade<=0){
                            this.remove=true
                        }
                    }
                }
            break
            case 183:
                if(!this.trigger){
                    this.fade+=0.2
                    if(this.fade>=1){
                        this.trigger=true
                    }
                }else{
                    this.fade-=0.05
                    if(this.fade<=0){
                        this.remove=true
                    }
                }
            break
            case 184: case 186:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed
                if(this.time<=this.timer){
                    if(this.fade<1){
                        this.fade+=0.2
                    }
                }else{
                    this.speed*=0.8
                    this.fade-=0.05
                    this.scale+=0.5
                    if(this.fade<=0){
                        this.remove=true
                    }
                }
            break
            case 185: case 216: case 229:
                if(!this.trigger){
                    this.activation+=0.1
                    if(this.activation>=2){
                        this.trigger=true
                    }
                }else{
                    this.activation-=0.05
                    if(this.activation<=0){
                        this.remove=true
                    }
                }
                for(let a=0,la=this.sparks.length;a<la;a++){
                    this.sparks[a][1]+=this.type==216?2:3
                    if(this.sparks[a][1]>=400){
                        this.sparks.splice(a,1)
                        a--
                        la--
                    }else if(this.sparks[a][2]<1){
                        this.sparks[a][2]+=0.2
                    }
                }
                if(this.type==216){
                    this.sparks.push([this.time%3,random(0,360),0,random(0,360)])
                }else{
                    this.sparks.push([this.time%5,random(0,max(0,200-this.time*4)),0,random(0,360)])
                }
            break
            case 187:
                if(!this.trigger){
                    this.fade+=0.1
                    if(this.fade>=1.5){
                        this.trigger=true
                    }
                }else{
                    this.fade-=0.1
                    if(this.fade<=0){
                        this.remove=true
                    }
                }
                this.direction+=this.curve
                this.curve+=this.curveAcc
            break
            case 188:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed
                this.speed-=0.4
                this.scale=smoothAnim(this.scale,this.speed>-14,0,1,10)
                if(this.scale<=0){
                    this.remove=true
                }
            break
            case 189:
                this.angular+=this.angularAcc
                this.direction+=this.angular
                this.scale+=this.speed
                this.speed-=0.1
                if(this.scale<=0){
                    this.remove=true
                }
            break
            case 190:
                if(this.time>this.delay){
                    this.position.x+=lsin(this.direction)*this.speed
                    this.position.y-=lcos(this.direction)*this.speed
                    this.scale=smoothAnim(this.scale,this.time<=this.timer+this.delay,0,1,10)
                    if(this.scale<=0){
                        this.remove=true
                    }
                }
            break
            case 191:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed
                this.fade=smoothAnim(this.fade,this.time<this.timer,0,1,10)
                this.scale=smoothAnim(this.scale,this.time<this.timer,0,1,10)
                this.speed+=0.4
            break
            case 197:
                this.position.x+=lsin(this.direction)*this.speed+lcos(this.direction)*this.speed*lsin(this.shear+this.time*6)*0.2
                this.position.y-=lcos(this.direction)*this.speed-lsin(this.direction)*this.speed*lsin(this.shear+this.time*6)*0.2
                if(!this.trigger){
                    this.fade+=0.1
                    if(this.fade>=2){
                        this.trigger=true
                    }
                }else{
                    this.fade-=0.1
                    if(this.fade<=0){
                        this.remove=true
                    }
                }
            break
            case 199: case 206:
                this.fade-=0.05
                this.scale+=0.2-this.fade*0.2
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 200:
                if(this.time%4==0){
                    let distance=floor(random(0,900))
                    parent.particlesNonCalc.push(new particle(this.layer,
                        this.position.x+lsin(this.direction)*distance+random(-10,10),
                        this.position.y-lcos(this.direction)*distance+random(-10,10),
                        197,[0,random(0.4,0.6)]))
                }
                if(!this.trigger){
                    this.fade+=0.1
                    if(this.fade>=2){
                        this.trigger=true
                    }
                }else{
                    this.fade-=0.1
                    if(this.fade<=0){
                        this.remove=true
                    }
                }
            break
            case 203: case 205:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed
                this.fade=smoothAnim(this.fade,this.time<this.timer,0,1,5)
                this.speed*=0.95
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 204:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed
                if(dist(this.target[0],this.target[1],this.position.x,this.position.y)<40){
                    this.hit=true
                }
                if(!this.hit){
                    let goalDirection=atan2(this.target[0]-this.position.x,this.position.y-this.target[1])
                    if(abs(this.direction-goalDirection)<=8||abs(this.direction-goalDirection-360)<=8||abs(this.direction-goalDirection+360)<=8||abs(this.direction-goalDirection-720)<=8||abs(this.direction-goalDirection+720)<=8){
                        this.direction=goalDirection
                    }else if(
                        this.direction>goalDirection&&this.direction<goalDirection+180||
                        this.direction>goalDirection-360&&this.direction<goalDirection-180||
                        this.direction>goalDirection+360&&this.direction<goalDirection+540||
                        this.direction>goalDirection-720&&this.direction<goalDirection-540||
                        this.direction>goalDirection+720&&this.direction<goalDirection+900){
                        this.direction-=8
                    }else if(
                        this.direction<goalDirection&&this.direction>goalDirection-180||
                        this.direction<goalDirection+360&&this.direction>goalDirection+180||
                        this.direction<goalDirection-360&&this.direction>goalDirection-540||
                        this.direction<goalDirection+720&&this.direction>goalDirection+540||
                        this.direction<goalDirection-720&&this.direction>goalDirection-900){
                        this.direction+=8
                    }else{
                        this.direction+=8*(floor(random(0,2)*2-1))
                    }
                    if(this.direction>180){
                        this.direction-=360
                    }else if(this.direction<-180){
                        this.direction+=360
                    }
                }
                if(this.time%6==0){
                    let direction=random(0,360)
                    for(let a=0,la=4;a<la;a++){
                        parent.particles.push(new particle(this.layer,this.position.x,this.position.y,205,[a/la*360+direction,25,this.color]))
                    }
                }
                this.fade=smoothAnim(this.fade,this.time<this.timer,0,1,5)
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 207: case 237:
                this.direction+=this.spin
                if(!this.trigger){
                    this.fade+=0.1
                    if(this.fade>=2){
                        this.trigger=true
                    }
                }else{
                    this.fade-=0.1
                    if(this.fade<=0){
                        this.remove=true
                    }
                }
            break
            case 208:
                this.position.x+=this.velocity.x
                this.position.y-=this.velocity.y
                if(this.fade<1){
                    this.fade+=0.1
                }
                if(this.time%20==0&&floor(random(0,2))==0){
                    parent.particles.push(new particle(this.layer,this.position.x,this.position.y,209,[random(0,360),this.color]))
                }
                if(this.position.x<=0&&this.bounce<this.bounceLimit){
                    this.velocity.x*=-1
                    this.position.x=0
                    this.bounce++
                }else if(this.position.y<=0&&this.bounce<this.bounceLimit){
                    this.velocity.y*=-1
                    this.position.y=0
                    this.bounce++
                }else if(this.position.x>=this.layer.width&&this.bounce<this.bounceLimit){
                    this.velocity.x*=-1
                    this.position.x=this.layer.width
                    this.bounce++
                }else if(this.position.y>=this.layer.height&&this.bounce<this.bounceLimit){
                    this.velocity.y*=-1
                    this.position.y=this.layer.height
                    this.bounce++
                }
                if((this.position.x<=-20||this.position.y<=-20||this.position.x>this.layer.width+20||this.position.y>this.layer.height+20)&&this.bounce>=this.bounceLimit){
                    this.remove=true
                }
                this.direction=atan2(this.velocity.x,this.velocity.y)
            break
            case 209:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed
                if(this.fade<1){
                    this.fade+=0.1
                }
                if(this.position.x<=-20||this.position.y<=-20||this.position.x>this.layer.width+20||this.position.y>this.layer.height+20){
                    this.remove=true
                }
            break
            case 210:
                this.position.x+=this.velocity.x
                this.position.y-=this.velocity.y
                this.fade=smoothAnim(this.fade,this.time<this.timer,0,1,10)
                if(this.fade<=0){
                    this.remove=true
                    parent.particles.push(new particle(this.layer,this.position.x,this.position.y,211,[5,mergeColor([this.color*50,50+this.color*150,255],[255,255,255],random(0,0.8))]))
                }
            break
            case 213:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed
                this.speed-=this.baseSpeed/60
                if(!this.trigger){
                    this.fade+=0.05
                    if(this.fade>=1.5){
                        this.trigger=true
                    }
                }else{
                    this.fade-=0.05
                    if(this.fade<=0){
                        this.remove=true
                    }
                }
            break
            case 220:
                if(!this.trigger){
                    this.activation+=0.1
                    if(this.activation>=2){
                        this.trigger=true
                    }
                }else{
                    this.activation-=0.05
                    if(this.activation<=0){
                        this.remove=true
                    }
                }
                for(let a=0,la=this.sparks.length;a<la;a++){
                    this.sparks[a][0]+=2
                    if(this.sparks[a][1]<1){
                        this.sparks[a][1]+=0.2
                    }
                }
                this.sparks.push([random(0,360),0,random(0,360)])
            break
            case 221:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed-this.grav
                this.grav+=0.15
                if(this.scale<1){
                    this.scale+=0.05
                }
                this.spin+=3
                if(this.time%15==0){
                    parent.particles.push(new particle(this.layer,this.position.x+random(-20,20),this.position.y+random(-20,20),223,[random(0,360),this.color,0,random(0.3,0.5)]))
                }
                if(this.position.y>this.layer.height+50||this.position.x<-50||this.position.x>this.layer.width+50){
                    this.remove=true
                }
            break
            case 222: case 234: case 241:
                if(this.time>this.delay){
                    this.position.x+=lsin(this.direction)*this.speed
                    this.position.y-=lcos(this.direction)*this.speed-this.grav
                    this.grav+=0.15
                    if(this.scale<1){
                        this.scale+=0.05
                    }
                    this.spin+=3
                    if(this.time%15==14-this.delay%15){
                        switch(this.type){
                            case 222:
                                parent.particles.push(new particle(this.layer,this.position.x+random(-20,20),this.position.y+random(-20,20),223,[random(0,360),this.color,this.colorShift,random(0.3,0.5)*this.size]))
                            break
                            case 234:
                                parent.particles.push(new particle(this.layer,this.position.x+random(-20,20),this.position.y+random(-20,20),235,[this.direction,this.speed*0.25,this.grav*0.5,random(0,360),this.color,this.colorShift,random(0.3,0.5)*this.size]))
                            break
                            case 241:
                                parent.particles.push(new particle(this.layer,this.position.x+random(-20,20),this.position.y+random(-20,20),242,[this.direction,this.speed*0.25,this.grav*0.5,random(0,360),this.color,this.colorShift,random(0.3,0.5)*this.size]))
                            break
                        }
                    }
                }
                if(this.position.y>this.layer.height+50||this.position.x<-50||this.position.x>this.layer.width+50){
                    this.remove=true
                }
            break
            case 223:
                if(this.colorShift<1){
                    this.colorShift+=0.01
                }
                if(!this.trigger){
                    this.fade+=0.1
                    if(this.fade>=3){
                        this.trigger=true
                    }
                }else{
                    this.fade-=0.1
                    if(this.fade<=0){
                        this.remove=true
                    }
                }
            break
            case 224:
                this.progress+=5
                if(this.progress>=500){
                    this.remove=true
                }
            break
            case 230:
                if(this.speed<8){
                    this.speed+=0.1
                }
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed
                if(this.shift<this.shiftGoal-15){
                    this.shift+=15
                    this.position.x+=lcos(this.direction)*15
                    this.position.y+=lsin(this.direction)*15
                }else if(this.shift>this.shiftGoal+15){
                    this.shift-=15
                    this.position.x-=lcos(this.direction)*15
                    this.position.y-=lsin(this.direction)*15
                }else if(this.shiftTrigger){
                    this.shiftTrigger=false
                    this.points.push([this.position.x-this.base.position.x,this.position.y-this.base.position.y])
                }
                if(this.time%16==this.interval){
                    this.shiftTrigger=true
                    this.shiftGoal+=(this.bumps*30-15)*this.switch
                    this.bumps++
                    this.switch=-this.switch
                    this.points.push([this.position.x-this.base.position.x,this.position.y-this.base.position.y])
                }
                this.fade=smoothAnim(this.fade,this.time<this.timer,0,1,30)
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 235: case 242:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed-this.grav
                this.grav+=0.15
                if(this.colorShift<1){
                    this.colorShift+=0.01
                }
                if(!this.trigger){
                    this.fade+=0.1
                    if(this.fade>=3){
                        this.trigger=true
                    }
                }else{
                    this.fade-=0.1
                    if(this.fade<=0){
                        this.remove=true
                    }
                }
            break
            case 238:
                this.direction+=this.spin
                if(this.scale<1){
                    this.scale+=0.1
                }else{
                    this.extent+=this.speed
                    this.speed+=1
                }
                if(!this.trigger){
                    this.fade+=0.1
                    if(this.fade>=3){
                        this.trigger=true
                    }
                }else{
                    this.fade-=0.1
                    if(this.fade<=0){
                        this.remove=true
                    }
                }
            break
            case 239:
                if(!this.trigger){
                    this.activation+=0.1
                    if(this.activation>=2){
                        this.trigger=true
                    }
                }else{
                    this.activation-=0.05
                    if(this.activation<=0){
                        this.remove=true
                    }
                }
            break
            case 240:
                this.fade-=1/30
                if(this.fade<=0){
                    this.remove=true
                }
                let distance240=floor(random(0,900))
                parent.particles.push(new particle(this.layer,
                    this.position.x+lsin(this.direction)*distance240+random(-20,20),
                    this.position.y-lcos(this.direction)*distance240+random(-20,20),
                    145,[random(0,360),random(10,15),0,random(1,2),1]))
            break

        }
    }
}