class perk{
    constructor(layer,player,x,y,type){
        this.layer=layer
        this.player=player
        this.position={x:x,y:y}
        this.type=type

        this.size=1
        this.fade=1
        this.complete=false

        this.anim={complete:0,description:0}
    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        this.layer.scale(this.size)
        switch(this.type){
            case 0:
                this.layer.stroke(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade)
                this.layer.strokeWeight(3)
                this.layer.noFill()
                plus(this.layer,10)
                this.layer.noStroke()
                this.layer.fill(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade*max(this.anim.complete,this.anim.description))
                this.layer.textSize(24)
                this.layer.text('Max HP',0,60-this.player*120)
            break
            case 1:
                this.layer.stroke(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade)
                this.layer.strokeWeight(3)
                this.layer.noFill()
                this.layer.line(-30,-15,-30,35)
                this.layer.line(-10,-40,-10,40)
                this.layer.line(10,-40,10,40)
                this.layer.line(30,-25,30,35)
                this.layer.arc(0,-40,20,10,-180,0)
                this.layer.arc(-20,-15,20,10,-180,0)
                this.layer.arc(20,-25,20,10,-180,0)
                for(let a=0,la=17;a<la;a++){
                    this.layer.arc(0,-40+a*5,20,10,0,180)
                }
                for(let a=0,la=11;a<la;a++){
                    this.layer.arc(-20,-15+a*5,20,10,0,180)
                }
                for(let a=0,la=13;a<la;a++){
                    this.layer.arc(20,-25+a*5,20,10,0,180)
                }
                this.layer.noStroke()
                this.layer.fill(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade*max(this.anim.complete,this.anim.description))
                this.layer.textSize(24)
                this.layer.text('Currency',0,60-this.player*120)
            break
            case 2:
                this.layer.stroke(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade)
                this.layer.strokeWeight(3)
                this.layer.noFill()
                this.layer.ellipse(0,0,56,56)
                this.layer.ellipse(0,0,84,84)
                plus(this.layer,5)
                this.layer.noStroke()
                this.layer.fill(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade*max(this.anim.complete,this.anim.description))
                this.layer.textSize(24)
                this.layer.text('Relic',0,60-this.player*120)
            break
            case 3:
                this.layer.stroke(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade)
                this.layer.strokeWeight(3)
                this.layer.noFill()
                this.layer.rect(-15,-15,24,24)
                this.layer.rect(15,-15,24,24)
                this.layer.rect(-15,15,24,24)
                this.layer.rect(15,15,24,24)
                this.layer.rect(0,0,66,66)
                this.layer.noStroke()
                this.layer.fill(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade*max(this.anim.complete,this.anim.description))
                this.layer.textSize(24)
                this.layer.text('Items',0,60-this.player*120)
            break
            case 4:
                this.layer.stroke(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade)
                this.layer.strokeWeight(3)
                this.layer.noFill()
                this.layer.rect(0,0,60,80,5)
                this.layer.line(-10,-25,10,-25)
                this.layer.line(-10,-25,-15,-22.5)
                this.layer.line(-15,-22.5,-15,-12.5)
                this.layer.line(-10,-10,-15,-12.5)
                this.layer.line(-10,-10,10,-10)
                this.layer.line(10,-10,15,-12.5)
                this.layer.line(15,-12.5,15,-22.5)
                this.layer.line(15,-22.5,10,-25)
                this.layer.rect(0,7.5,10,35)
                this.layer.noStroke()
                this.layer.fill(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade*max(this.anim.complete,this.anim.description))
                this.layer.textSize(24)
                this.layer.text('Upgrade',0,60-this.player*120)
            break
            case 5:
                this.layer.stroke(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade)
                this.layer.strokeWeight(3)
                this.layer.noFill()
                this.layer.rect(0,0,60,80,5)
                plus(this.layer,5)
                this.layer.noStroke()
                this.layer.fill(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade*max(this.anim.complete,this.anim.description))
                this.layer.textSize(24)
                this.layer.text('Card',0,60-this.player*120)
            break
            case 6:
                this.layer.stroke(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade)
                this.layer.strokeWeight(3)
                this.layer.noFill()
                this.layer.rect(0,0,60,80,5)
                this.layer.line(-20,-20,-15,-20)
                this.layer.line(-15,-20,0,-5)
                this.layer.line(5,0,20,15)
                this.layer.line(20,15,20,20)
                this.layer.line(15,20,20,20)
                this.layer.line(-20,-15,-5,0)
                this.layer.line(0,5,15,20)
                this.layer.line(-20,-20,-20,-15)
                this.layer.line(-20,20,-15,20)
                this.layer.line(-15,20,0,5)
                this.layer.line(5,0,20,-15)
                this.layer.line(20,-15,20,-20)
                this.layer.line(15,-20,20,-20)
                this.layer.line(-20,15,-5,0)
                this.layer.line(0,-5,15,-20)
                this.layer.line(-20,20,-20,15)
                this.layer.noStroke()
                this.layer.fill(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade*max(this.anim.complete,this.anim.description))
                this.layer.textSize(24)
                this.layer.text('Remove',0,60-this.player*120)
            break
            case 7:
                this.layer.stroke(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade)
                this.layer.strokeWeight(3)
                this.layer.noFill()
                this.layer.rect(0,0,60,80,5)
                this.layer.arc(0,0,36,36,-180,-45)
                this.layer.arc(0,0,36,36,0,135)
                this.layer.line(-18,3,-24,-3)
                this.layer.line(-18,3,-12,-3)
                this.layer.line(18,-3,24,3)
                this.layer.line(18,-3,12,3)
                this.layer.noStroke()
                this.layer.fill(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade*max(this.anim.complete,this.anim.description))
                this.layer.textSize(24)
                this.layer.text('Transform',0,60-this.player*120)
            break
            case 8:
                this.layer.stroke(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade)
                this.layer.strokeWeight(3)
                this.layer.noFill()
                this.layer.push()
                this.layer.scale(0.5)
                this.layer.line(30,-30,-30,30)
                this.layer.translate(-40,-40)
                this.layer.line(-30,-15,-30,35)
                this.layer.line(-10,-40,-10,40)
                this.layer.line(10,-40,10,40)
                this.layer.line(30,-25,30,35)
                this.layer.arc(0,-40,20,10,-180,0)
                this.layer.arc(-20,-15,20,10,-180,0)
                this.layer.arc(20,-25,20,10,-180,0)
                for(let a=0,la=17;a<la;a++){
                    this.layer.arc(0,-40+a*5,20,10,0,180)
                }
                for(let a=0,la=11;a<la;a++){
                    this.layer.arc(-20,-15+a*5,20,10,0,180)
                }
                for(let a=0,la=13;a<la;a++){
                    this.layer.arc(20,-25+a*5,20,10,0,180)
                }
                this.layer.translate(80,80)
                plus(this.layer,10)
                this.layer.pop()
                this.layer.noStroke()
                this.layer.fill(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade*max(this.anim.complete,this.anim.description))
                this.layer.textSize(16)
                this.layer.text('Lose Max HP\nMore Currency',0,60-this.player*120)
            break
            case 9:
                this.layer.stroke(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade)
                this.layer.strokeWeight(3)
                this.layer.noFill()
                this.layer.push()
                this.layer.scale(0.5)
                this.layer.line(30,-30,-30,30)
                this.layer.translate(-40,-40)
                this.layer.ellipse(0,0,56,56)
                this.layer.ellipse(0,0,84,84)
                plus(this.layer,5)
                this.layer.translate(80,80)
                plus(this.layer,10)
                this.layer.pop()
                this.layer.noStroke()
                this.layer.fill(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade*max(this.anim.complete,this.anim.description))
                this.layer.textSize(16)
                this.layer.text('Lose Max HP\nRare Relic',0,60-this.player*120)
            break
            case 10:
                this.layer.stroke(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade)
                this.layer.strokeWeight(3)
                this.layer.noFill()
                this.layer.push()
                this.layer.scale(0.5)
                this.layer.line(30,-30,-30,30)
                this.layer.translate(-40,-40)
                this.layer.rect(0,0,60,80,5)
                plus(this.layer,5)
                this.layer.translate(80,80)
                plus(this.layer,10)
                this.layer.pop()
                this.layer.noStroke()
                this.layer.fill(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade*max(this.anim.complete,this.anim.description))
                this.layer.textSize(16)
                this.layer.text('Lose Max HP\nRare Card',0,60-this.player*120)
            break
            case 11:
                this.layer.stroke(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade)
                this.layer.strokeWeight(3)
                this.layer.noFill()
                this.layer.push()
                this.layer.scale(0.5)
                this.layer.line(30,-30,-30,30)
                this.layer.translate(-40,-40)
                this.layer.rect(0,0,60,80,5)
                this.layer.quad(0,20,20,0,0,-20,-20,0)
                this.layer.line(0,-20,0,20)
                this.layer.line(-20,0,20,0)
                this.layer.translate(80,80)
                plus(this.layer,10)
                this.layer.pop()
                this.layer.noStroke()
                this.layer.fill(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade*max(this.anim.complete,this.anim.description))
                this.layer.textSize(16)
                this.layer.text('Lose Max HP\nColorless Card',0,60-this.player*120)
            break
            case 12:
                this.layer.stroke(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade)
                this.layer.strokeWeight(3)
                this.layer.noFill()
                this.layer.rect(0,0,60,80,5)
                this.layer.strokeWeight(2)
                this.layer.ellipse(0,0,50)
                this.layer.ellipse(0,0,25)
                this.layer.line(0,-40,0,40)
                this.layer.line(-30,-18,30,18)
                this.layer.line(-30,18,30,-18)
                this.layer.noStroke()
                this.layer.fill(mergeColor([25,25,25],[50,255,50],this.anim.complete)[0],mergeColor([25,25,25],[50,255,50],this.anim.complete)[1],mergeColor([25,25,25],[50,255,50],this.anim.complete)[2],this.fade*max(this.anim.complete,this.anim.description))
                this.layer.textSize(24)
                this.layer.text('Edition',0,60-this.player*120)
            break
        }
        this.layer.pop()
    }
    update(){
        this.size=smoothAnim(this.size,dist(inputs.rel.x,inputs.rel.y,this.position.x,this.position.y)<50,1,1.5,5)
        this.anim.description=smoothAnim(this.anim.description,dist(inputs.rel.x,inputs.rel.y,this.position.x,this.position.y)<50,0,1,5)
        this.anim.complete=smoothAnim(this.anim.complete,this.complete,0,1,5)
    }
}