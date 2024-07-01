class particle{
    constructor(layer,x,y,type,args){
        this.layer=layer
        this.position={x:x,y:y}
        this.type=type
        this.remove=false
        this.time=0
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
            case 1: case 4: case 7: case 32: case 35:  case 49: case 50: case 89: case 105:
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
            case 74: case 75: case 76: case 80: case 84: case 85: case 86: case 88: case 90: case 93:
            case 95: case 97: case 99:
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
            case 111:
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
            case 53: case 55: case 58: case 69: case 70: case 71: case 87:
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
            case 61: case 62: case 63: case 64: case 96: case 100:
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
            case 81:
                this.direction=args[0]
                this.timer=args[1]
                this.color=random(0,1)
                this.speed=15*random(0.6,1.5)
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
            break
            case 94: case 102:
                this.direction=args[0]
                this.timer=args[1]
                this.color=floor(random(0,6))
                this.speed=15*random(0.6,1.5)
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
            break
            case 103: case 104: case 110:
                this.size=args[0]
                this.fade=1
                this.scale=0
                this.direction=random(0,360)
            break
            case 108:
                this.direction=args[0]
                this.timer=args[1]
                this.speed=5
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
            break
            case 109:
                this.direction=args[0]
                this.delay=args[1]
                this.curve=args[2]
                this.points=[]
                this.speed=5
                this.fade=1
                this.size=1
                this.scale=1
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
                        this.layer.fill(50,255,50,this.fade)
                        this.layer.arc(0,0,12,12,a*120,60+a*120)
                        this.layer.fill(50,150,255,this.fade)
                        this.layer.arc(0,0,12,12,-60+a*120,a*120)
                        this.layer.fill(50,255,125,this.fade)
                        this.layer.arc(0,0,8,8,a*120,60+a*120)
                        this.layer.fill(75,200,255,this.fade)
                        this.layer.arc(0,0,8,8,-60+a*120,a*120)
                        this.layer.fill(50,255,200,this.fade)
                        this.layer.arc(0,0,4,4,a*120,60+a*120)
                        this.layer.fill(100,255,255,this.fade)
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
                case 56:
                    this.layer.fill(this.color[0],this.color[1],this.color[2],this.fade)
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
                    this.layer.stroke(40,240,40,this.fade*2)
                    this.layer.arc(0,0,10,10,70,170)
                    this.layer.arc(0,0,8,8,-110,-10)
                    this.layer.stroke(40,40,240,this.fade*2)
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
                    regPoly(this.layer,0,0,5,8,8,this.position.y*3)
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
                    this.layer.fill(240,this.fade)
                    regStar(this.layer,0,0,5,8,8,6,6,this.time*2)
                    this.layer.fill(180,this.fade)
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
                    this.layer.rotate(this.position.x+this.position.y-this.time*10)
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
                    this.layer.fill([255,255,255,100,100,200][this.color],[150,200,255,255,200,100][this.color],[100,100,100,150,255,225][this.color],this.fade*0.5)
                    this.layer.stroke([255,255,255,100,100,200][this.color],[150,200,255,255,200,100][this.color],[100,100,100,150,255,225][this.color],this.fade)
                    this.layer.strokeWeight(2)
                    regStar(this.layer,0,0,5,12,12,5,5,this.position.y*3)
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

            }
            this.layer.pop()
        }
    }
    update(parent){
        this.time++
        switch(this.type){
            case 0: case 41: case 77: case 106:
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
            case 111:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed-10/this.timer
                this.fade=smoothAnim(this.fade,this.time<this.timer*2-5,0,1,5)
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 2: case 9: case 10: case 17: case 23: case 27: case 36: case 37: case 40: case 45:
            case 46: case 51: case 52: case 54: case 56: case 57: case 60: case 65: case 66: case 72:
            case 73: case 74: case 75: case 76: case 80: case 84: case 85: case 86: case 90: case 93:
            case 95: case 97: case 99: case 103: case 104: case 110:
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
            case 53: case 70: case 71:
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
            case 61: case 62: case 63: case 64: case 96: case 100:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=(lcos(this.direction)-0.2)*this.speed
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
            break
            case 68:
                this.fade-=0.1
                this.scale+=0.3-this.fade*0.3
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 81: case 94: case 102:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed-10/this.timer
                this.fade=smoothAnim(this.fade,this.time<this.timer*2-5,0,1,5)
                this.speed*=0.98
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 88:
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
            case 108:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed-10/this.timer
                this.fade=smoothAnim(this.fade,this.time<this.timer*2-5,0,1,5)
                if(this.fade<=0){
                    this.remove=true
                    for(let a=0,la=20;a<la;a++){
                        parent.particles.push(new particle(this.layer,this.position.x-lsin(this.direction-4.5-a*9)*100,this.position.y+lcos(this.direction-4.5-a*9)*100,109,[this.direction-4.5-a*9,a*2,-6]))
                        parent.particles.push(new particle(this.layer,this.position.x-lsin(this.direction+4.5+a*9)*100,this.position.y+lcos(this.direction+4.5+a*9)*100,109,[this.direction+4.5+a*9,a*2,-6]))
                        parent.particles.push(new particle(this.layer,this.position.x-lsin(this.direction-4.5-a*9)*100,this.position.y+lcos(this.direction-4.5-a*9)*100,109,[this.direction-4.5-a*9,a*2,6]))
                        parent.particles.push(new particle(this.layer,this.position.x-lsin(this.direction+4.5+a*9)*100,this.position.y+lcos(this.direction+4.5+a*9)*100,109,[this.direction+4.5+a*9,a*2,6]))
                    }
                }
            break
            case 109:
                if(this.time>=this.delay){
                    this.position.x+=lsin(this.direction)*this.speed
                    this.position.y-=lcos(this.direction)*this.speed
                    this.direction+=this.curve
                    this.curve*=0.98
                    this.speed*=1.03
                    this.points.push([this.position.x,this.position.y])
                }
                if(this.time>=this.delay+300){
                    this.remove=true
                }
            break
        }
    }
}