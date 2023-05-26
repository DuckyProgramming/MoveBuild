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
            case 1: case 4: case 7:
                this.direction=args[0]
                this.timer=args[1]
                this.speed=8
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
            break
            case 2: case 9: case 10:
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
            case 6: case 11:
                this.direction=args[0]
                this.timer=args[1]
                this.speed=15
                this.fade=0
                this.trigger=false
                this.size=1
                this.scale=1
            break
            case 12:
                this.position2={x:args[0]-this.position.x,y:args[1]-this.position.y}
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
            case 1: case 4: case 5: case 6: case 7: case 8: case 11:
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
            case 2: case 9: case 10:
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
            case 12:
                this.fade-=1/15
                if(this.fade<=0){
                    this.remove=true
                }
            break
        }
    }
}