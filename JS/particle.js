class particle{
    constructor(layer,x,y,type,args){
        this.layer=layer
        this.position={x:x,y:y}
        this.type=type
        this.remove=false
        this.time=0
        switch(this.type){
            case 0:
                this.value=args[0]
                this.direction=random(0,360)
                this.speed=2.5
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
            break
            case 1: case 4: case 7: case 32: case 35:
                this.direction=args[0]
                this.timer=args[1]
                this.speed=8
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
            break
            case 2: case 9: case 10: case 17: case 23: case 27: case 36: case 37:
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
            case 6: case 11: case 14: case 16: case 18: case 19: case 20: case 21:
                this.direction=args[0]
                this.timer=args[1]
                this.speed=15
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
            break
            case 12: case 13:
                this.position2={x:args[0]-this.position.x,y:args[1]-this.position.y}
                this.fade=1
                this.size=1
                this.scale=1
            break
            case 15:
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
                    this.layer.fill(255,100,100,this.fade)
                    this.layer.textSize(20)
                    this.layer.text('-'+this.value,0,0)
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
                    this.layer.fill(200)
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
                    this.layer.fill(100,255,150)
                    this.layer.rect(0,0,4,8)
                    this.layer.fill(60)
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
            }
            this.layer.pop()
        }
    }
    update(){
        this.time++
        switch(this.type){
            case 0:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed
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
            case 1: case 4: case 5: case 6: case 7: case 8: case 11: case 14: case 16: case 18:
            case 19: case 20: case 21: case 32: case 35:
                this.position.x+=lsin(this.direction)*this.speed
                this.position.y-=lcos(this.direction)*this.speed-10/this.timer
                if(!this.trigger){
                    this.fade+=2/this.timer
                    if(this.fade>=2){
                        this.trigger=true
                    }
                }else{
                    this.fade-=2/this.timer
                    if(this.fade<=0){
                        this.remove=true
                    }
                }
            break
            case 2: case 9: case 10: case 17: case 23: case 27: case 36: case 37:
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
            case 12: case 13:
                this.fade-=1/15
                if(this.fade<=0){
                    this.remove=true
                }
            break
            case 15: case 22: case 24: case 25: case 26:
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
        }
    }
}