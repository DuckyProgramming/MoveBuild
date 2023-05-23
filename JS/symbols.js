function displayStatusSymbol(layer,x,y,type,direction,size,fade){
    layer.push()
    layer.translate(x,y)
    layer.rotate(direction)
    layer.scale(size)
    layer.noFill()
    layer.noStroke()
    switch(type){
        case 0:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,-6,-5,3,-1,3)
            layer.triangle(3,-6,5,3,1,3)
        break
        case 1:
            layer.fill(255,50,50,this.fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.ellipse(-8,0,3,3)
        break
        case 2:
            layer.fill(255,50,50,fade)
            layer.rect(-3,0,4,3)
            layer.triangle(6,0,-1,-4,-1,4)
            layer.stroke(255,fade)
            layer.strokeWeight(0.8)
            layer.noFill()
            layer.line(-5/sqrt(2),-5/sqrt(2),5/sqrt(2),5/sqrt(2))
            layer.ellipse(0,0,10,10)
        break
        case 3:
            layer.stroke(255,fade)
            layer.strokeWeight(0.8)
            layer.arc(0,0,10,10,-165,-105)
            layer.arc(0,0,10,10,-75,-15)
            layer.arc(0,0,10,10,15,75)
            layer.arc(0,0,10,10,105,165)
        break
        case 4:
            layer.fill(200,255,255,fade)
            layer.quad(-5,0,0,-6.25,5,0,0,6.25)
            layer.fill(225,255,255,fade)
            layer.quad(-4,0,0,-5,4,0,0,5)
        break
        case 5:
            layer.fill(200,0,0,fade)
            layer.arc(0,0,8,8,-45,225)
            layer.quad(0,0,sqrt(2)*2,-sqrt(2)*2,0,-sqrt(2)*4,-sqrt(2)*2,-sqrt(2)*2)
        break
        case 6:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
        break
        case 7:
            layer.fill(150,175,200,fade)
            layer.triangle(0,-6,-3,3,3,3)
        break
        case 8: case 20:
            layer.fill(255,50,50,fade)
            layer.triangle(0,6,-3,-3,3,-3)
        break
        case 9:
            layer.fill(150,175,200,fade)
            layer.triangle(0,6,-3,-3,3,-3)
        break
        case 10:
            layer.fill(0,150,255,fade)
            layer.triangle(0,6,-3,-3,3,-3)
        break
        case 11:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(225,fade)
            layer.rect(-3,0,9,3)
            layer.triangle(1.5,-4.5,1.5,4.5,7.5,0)
        break
        case 12:
            layer.fill(255,50,50,fade)
            layer.triangle(-2,-6,-4,3,0,3)
            layer.ellipse(3,0,4,4)
        break
        case 13:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(0,150,255,fade)
            layer.rect(-3,0,9,3)
            layer.triangle(1.5,-4.5,1.5,4.5,7.5,0)
        break
        case 14:
            layer.fill(150,175,200,fade)
            layer.rect(0,0,8,8)
            layer.triangle(-1,-4,1,-4,0,-7)
            layer.triangle(-4,-1,-4,1,-7,0)
            layer.triangle(-1,4,1,4,0,7)
            layer.triangle(4,-1,4,1,7,0)
        break
        case 15:
            layer.fill(200,180,120,fade)
            layer.ellipse(0,0,8,8)
            layer.rect(0,-4,2,4)
            layer.rect(0,4,2,4)
            layer.rect(-4,0,4,2)
            layer.rect(4,0,4,2)
        break
        case 16:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(0.875)
            layer.noFill()
            layer.ellipse(0,0,14,14)
            layer.line(-3.5*sqrt(2),3.5*sqrt(2),3.5*sqrt(2),-3.5*sqrt(2))
        break
        case 17:
            layer.fill(255,50,50,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.rect(-3,0,3,3)
        break
        case 18:
            layer.fill(150,175,200,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.rect(-3,0,3,3)
        break
        case 19:
            layer.fill(150,175,200,fade)
            layer.quad(0,-3,-3,0,0,3,3,0)
            layer.ellipse(-4,-4,3,3)
            layer.ellipse(-4,4,3,3)
            layer.ellipse(4,-4,3,3)
            layer.ellipse(4,4,3,3)
        break
        case 21:
            layer.fill(255,125,0,this.fade)
            layer.rect(-1.5,-1.5,7,7)
            layer.fill(255,255,0,this.fade)
            layer.rect(0,0,7,7)
            layer.fill(125,255,0,this.fade)
            layer.rect(1.5,1.5,7,7)
        break
        case 22:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.fill(200,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
        break
        case 23:
            layer.fill(200,fade)
            layer.rect(-3,0,4.5,6,1)
            layer.rect(3,0,4.5,6,1)
        break
        case 24:
            layer.stroke(150,0,0,fade)
            layer.strokeWeight(0.5)
            layer.beginShape()
            for(let a=0,la=9;a<la;a++){
                layer.vertex(lsin(180*a/(la-1))*(5-a%2*2.5)+0.25,lcos(180*a/(la-1))*(5-a%2*2.5))
            }
            layer.endShape(CLOSE)
            layer.stroke(100,fade)
            layer.strokeWeight(0.5)
            layer.beginShape()
            for(let a=0,la=9;a<la;a++){
                layer.vertex(lsin(-180+180*a/(la-1))*(5-a%2*2.5)-0.25,lcos(-180+180*a/(la-1))*(5-a%2*2.5))
            }
            layer.endShape(CLOSE)
        break
        case 25:
            layer.fill(50,150,100,fade)
            layer.ellipse(0,0,8,8)
            layer.rotate(-45)
            for(let a=0,la=3;a<la;a++){
                layer.triangle(-2,3,2,3,0,8)
                layer.rotate(45)
            }
        break
        case 26:
            layer.fill(255,50,50,this.fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
        break
        case 27:
            layer.fill(150,fade)
            layer.rect(0,0,7.5,10,2)
            layer.fill(200,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
        break
        case 28: case 29:
            layer.fill(225,fade)
            layer.ellipse(0,2,5,5)
            layer.ellipse(sin(120)*2,cos(120)*2,5,5)
            layer.ellipse(-sin(120)*2,cos(120)*2,5,5)
        break
        case 30:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-1.5,3,1.5,3)
            layer.fill(80,fade)
            layer.triangle(-2,-1.5,-2,1.5,4,0)
        break
        case 31:
            layer.fill(150,255,100,fade)
            layer.arc(0,0,8,8,-30,210)
            layer.quad(0,0,sqrt(3)*2,-2,0,-2/(2-sqrt(3)),-sqrt(3)*2,-2)
        break
        case 32:
            layer.fill(100,255,100,fade)
            layer.triangle(-3,-4,3,-4,0,-6)
            layer.triangle(-3,4,3,4,0,6)
            layer.triangle(-4,-3,-4,3,-6,0)
            layer.triangle(4,-3,4,3,6,0)
        break
        case 33:
            layer.fill(150,255,150,fade)
            layer.rect(0,0,2.5,10)
            layer.rect(0,0,10,2.5)
            layer.ellipse(-3.75,-3.75,2.4,2.4)
            layer.ellipse(-3.75,3.75,2.4,2.4)
            layer.ellipse(3.75,-3.75,2.4,2.4)
            layer.ellipse(3.75,3.75,2.4,2.4)
        break
        case 34:
            layer.fill(150,175,200,fade)
            layer.triangle(0,-6,-1.5,3,1.5,3)
            layer.fill(80,fade)
            layer.triangle(-2,-1.5,-2,1.5,4,0)
        break
        case 35:
            layer.stroke(40,fade)
            layer.strokeWeight(1.5)
            layer.ellipse(0,0,12,12)
            layer.line(0,0,0,-3.75)
            layer.line(0,0,2.25,2.25)
        break
        case 36:
            layer.fill(255,50,50,this.fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.ellipse(0,6,3,3)
        break
        case 37:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(0.875)
            layer.noFill()
            layer.ellipse(0,0,14,14)
            layer.line(-3.5*sqrt(2),3.5*sqrt(2),3.5*sqrt(2),-3.5*sqrt(2))
            layer.fill(80,fade)
            layer.triangle(-2,-1.5,-2,1.5,4,0)
        break
        case 38:
            layer.fill(150,0,0,fade)
            layer.rect(-3,0,4,3)
            layer.triangle(6,0,-1,6,-1,-6)
            layer.fill(255,50,50,this.fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.ellipse(-8,0,3,3)
        break
        case 39:
            layer.fill(200,0,0,fade)
            layer.arc(0,0,8,8,-45,225)
            layer.quad(0,0,sqrt(2)*2,-sqrt(2)*2,0,-sqrt(2)*4,-sqrt(2)*2,-sqrt(2)*2)
            layer.fill(255,50,50,this.fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.ellipse(-8,0,3,3)
        break
        case 40:
            layer.fill(255,50,50,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.quad(-4.5,0,-3,-1.5,-1.5,0,-3,1.5)
        break
        case 41:
            layer.fill(125,125,125,fade)
            layer.stroke(100,100,100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.rect(-5,0,3,3)
        break

    }
    layer.pop()
}
function displayIntentSymbol(layer,x,y,type,effect,direction,size,fade,info){
    layer.push()
    layer.translate(x,y)
    layer.rotate(direction)
    layer.scale(size)
    switch(type){
        case 1: case 6:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 2: case 19: case 34:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,0,-2,0,2)
            layer.triangle(3,-3,-6,-5,-6,-1)
            layer.triangle(3,3,-6,1,-6,5)
        break
        case 3: case 7: case 35:
            layer.fill(255,50,50,fade)
            layer.rect(-3,0,4,3)
            layer.triangle(6,0,-1,-4,-1,4)
        break
        case 4: case 10: case 48:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
        break
        case 5: case 8:
            layer.fill(125,125,125,fade)
            layer.stroke(100,100,100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,6,8,1)
        break
        case 9: case 28:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
        break
        case 11:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,0,-1,0,1)
            layer.triangle(6,-2,-3,-3,-3,-1)
            layer.triangle(6,2,-3,1,-3,3)
            layer.triangle(3,-4,-6,-5,-6,-3)
            layer.triangle(3,4,-6,3,-6,5)
        break
        case 12:
            layer.fill(255,50,50,fade)
            layer.rect(-1.5,0,6,6)
            layer.arc(1.5,0,9,6,-90,90)
        break
        case 13: case 14: case 36:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,8,8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 15:
            layer.fill(200,25,25,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 16:
            layer.fill(255,50,50,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.triangle(9,0,0,-2,0,2)
            }
        break
        case 17:
            layer.fill(225,fade)
            layer.ellipse(0,3,7.5,7.5)
            layer.ellipse(sin(120)*3,cos(120)*3,7.5,7.5)
            layer.ellipse(-sin(120)*3,cos(120)*3,7.5,7.5)
            layer.fill(255,50,50,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.triangle(9,0,0,-2,0,2)
            }
        break
        case 18: case 26:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
        break
        case 20: case 31:
            layer.fill(255,50,50,fade)
            layer.triangle(7,-3,-4.5,-5,-3.5,-1)
            layer.triangle(7,3,-4.5,1,-3.5,5)
        break
        case 21:
            layer.fill(255,fade)
            layer.quad(0,-5,-5,0,0,5,5,0)
        break
        case 22: case 32:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,8,8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 23: case 33:
            layer.fill(255,50,50,fade)
            layer.triangle(0,6,-3,-3,3,-3)
        break
        case 24:
            layer.fill(150,0,0,fade)
            layer.arc(0,0,8,8,-45,225)
            layer.quad(0,0,-2*sqrt(2),-2*sqrt(2),0,-4*sqrt(2),2*sqrt(2),-2*sqrt(2))
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 25:
            layer.fill(255,100,100,fade)
            layer.rect(0,0,3,12)
            layer.rect(0,0,12,3)
        break
        case 27:
            layer.fill(150,175,200,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 30:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 29:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(225,fade)
            layer.rect(-3,0,9,3)
            layer.triangle(1,-3,1,3,5,0)
        break
        case 37:
            layer.stroke(240,240,40,fade)
            layer.noFill()
            layer.strokeWeight(2)
            layer.ellipse(0,0,10,10)
            layer.noStroke()
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 38:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.ellipse(-7.5,-2.25,3,3)
            layer.ellipse(-7.5,2.25,3,3)
        break
        case 39:
            layer.stroke(50,fade)
            layer.strokeWeight(1)
            layer.noFill()
            layer.ellipse(0,0,10,10)
            layer.strokeWeight(2)
            layer.point(-2,0)
            layer.point(2,0)
        break
        case 40:
            layer.fill(60,fade)
            layer.ellipse(0,0,16,6)
            layer.fill(150,50,50,fade)
            layer.ellipse(0,0,8,3)
        break
        case 41:
            layer.fill(190,195,200,fade)
            layer.triangle(0,2,-6,2,-3,-4)
            layer.triangle(0,2,6,2,3,-4)
        break
        case 42:
            layer.fill(40,fade)
            layer.rect(-3.5,0,3,4)
            layer.rect(0,0,3,4)
            layer.rect(3.5,0,3,4)
        break
        case 43:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,6,-5,-3,-1,-3)
            layer.triangle(3,6,5,-3,1,-3)
            layer.ellipse(-8,0,3,3)
        break
        case 44:
            layer.fill(150,0,0,fade)
            layer.arc(0,0,8,8,-45,225)
            layer.quad(0,0,-2*sqrt(2),-2*sqrt(2),0,-4*sqrt(2),2*sqrt(2),-2*sqrt(2))
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
        break
        case 45:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,0,-2,0,2)
            layer.triangle(3,-3,-6,-5,-6,-1)
            layer.triangle(3,3,-6,1,-6,5)
            layer.ellipse(-9,-2.25,3,3)
            layer.ellipse(-9,2.25,3,3)
        break
        case 46:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,6,-5,-3,-1,-3)
            layer.triangle(3,6,5,-3,1,-3)
            layer.rect(-8,0,2,5)
        break
        case 47:
            layer.fill(255,50,50,fade)
            layer.rect(-1.5,-3,6,4)
            layer.arc(1.5,-3,9,4,-90,90)
            layer.rect(-1.5,3,6,4)
            layer.arc(1.5,3,9,4,-90,90)
        break
        case 50:
            layer.fill(150,175,200,fade)
			layer.triangle(-3,-3,2,-3,2,-6)
			layer.arc(2,-3,10,16,90,180)
            layer.fill(255,50,50,fade)
            layer.rect(-1.5,0,6,6)
            layer.arc(1.5,0,9,6,-90,90)
        break
        case 51:
            layer.fill(120,80,40,fade)
            layer.rect(0,0,12,6,4)
            layer.fill(90,60,30,fade)
            layer.rect(0,0,10,4,2)
            layer.fill(200,fade)
            layer.triangle(-5,1.5,-1,1.5,-3,-6)
            layer.triangle(1,1.5,5,1.5,3,-6)
        break
        case 52:
            layer.fill(120,225,20,fade)
            layer.ellipse(0,0,16,8)
        break
        case 53:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,8,8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
        break
        case 54:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,8,8)
            layer.fill(255,50,50,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.triangle(9,0,0,-2,0,2)
            }
        break
        case 55:
            layer.fill(255,50,50,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.triangle(9,0,0,-2,0,2)
            }
            layer.triangle(10.5,6,7.5,-3,13.5,-3)
        break
    }
    layer.fill(0,fade)
    layer.noStroke()
    layer.textSize(8)
    if(info){
        switch(type){
            case 1: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 12:
            case 13: case 14: case 16: case 18: case 22: case 23: case 25: case 26: case 28: case 29:
            case 32: case 33: case 35: case 36: case 38: case 39: case 40: case 41: case 42: case 43:
            case 46: case 48: case 51: case 52: case 53: case 54: case 55:
                layer.text(effect[0],0,0)
            break
            case 20: case 31: case 47:
                layer.text(`${effect[0]}x2`,0,0)
            break
            case 2: case 19: case 34: case 45:
                layer.text(`${effect[0]}x3`,0,0)
            break
            case 11:
                layer.text(`${effect[0]}x5`,0,0)
            break
            case 15: case 17: case 24: case 27: case 30: case 44: case 50:
                layer.text(`${effect[0]}|${effect[1]}`,0,0)
            break
            case 21:
                layer.text(`X`,0,0)
            break
            case 37:
                layer.textSize(6)
                layer.text(`${effect[0]}+${effect[1]}C`,0,0)
            break
        }
    }else{
        layer.text('?',0,0)
    }
    layer.pop()
}
function displaySymbol(layer,x,y,type,direction,size,fade){
    layer.push()
    layer.translate(x,y)
    layer.rotate(direction)
    layer.scale(size)
    layer.noFill()
    layer.noStroke()
    switch(type){
        case 1:
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.ellipse(0,0,16,16)
            layer.ellipse(0,0,24,24)
        break
        case 2:
            layer.fill(255,100,100,fade)
            layer.rect(0,0,6,24)
            layer.rect(0,0,24,6)
        break
        case 3:
            layer.stroke(0,fade)
            layer.strokeWeight(3)
            layer.noFill()
            layer.ellipse(0,0,30,30)
            layer.strokeWeight(6)
            layer.point(-6,0)
            layer.point(6,0)
        break
        case 4:
            layer.fill(40,fade)
            layer.rect(-4,0,12,4)
            layer.triangle(2,-6,2,6,10,0)
        break
        case 5:
            layer.fill(40,fade)
            layer.rect(4,0,12,4)
            layer.triangle(-2,-6,-2,6,-10,0)
        break
        case 6:
            layer.fill(40,fade)
            layer.rect(0,-4,4,12)
            layer.triangle(-6,2,6,2,0,10)
        break
        case 7:
            layer.fill(40,fade)
            layer.rect(0,4,4,12)
            layer.triangle(-6,-2,6,-2,0,-10)
        break
        case 8:
            layer.stroke(120,fade)
            layer.strokeWeight(1.5)
            layer.rect(0,0,12,16,2)
        break
        case 9:
            layer.fill(200,255,255,fade)
            layer.quad(-8,0,0,-10,8,0,0,10)
            layer.fill(225,255,255,fade)
            layer.quad(-6.4,0,0,-8,6.4,0,0,8)
        break
        case 10:
            layer.fill(255,100,100,fade)
            layer.rect(0,0,6,24)
            layer.rect(0,0,24,6)
            layer.stroke(255,100,100,fade)
            layer.noFill()
            layer.strokeWeight(1)
            layer.rect(0,0,30,30)
        break
        case 11:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-12,-6,6,6,6)
        break
        case 12:
            layer.fill(150,175,200,fade)
            layer.triangle(0,-12,-6,6,6,6)
        break
        case 13:
            layer.fill(75,150,75,fade)
            layer.rect(0,2,4,6)
            layer.triangle(-4,-1,4,-1,0,-7)
        break
        case 14:
            layer.fill(75,fade)
            layer.triangle(-6,0,-2,0,-4,2)
            layer.triangle(6,0,2,0,4,-2)
            layer.stroke(75,fade)
            layer.noFill()
            layer.strokeWeight(2)
            layer.strokeCap(SQUARE)
            layer.arc(0,0,8,8,-180,-45)
            layer.arc(0,0,8,8,0,135)
            layer.strokeCap(ROUND)
        break
        case 15:
            layer.stroke(255,100,200,fade)
            layer.strokeWeight(1)
            for(let a=0,la=12;a<la;a++){
                layer.line(lsin(a*30)*3,lcos(a*30)*3,lsin(a*30)*6,lcos(a*30)*6)
            }
        break
        case 16:
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(1.5)
            layer.ellipse(0,0,24,24)
            layer.line(-6*sqrt(2),6*sqrt(2),6*sqrt(2),-6*sqrt(2))
        break
        case 17:
            layer.fill(80,fade)
            layer.rect(0,0,6,24)
            layer.rect(0,0,24,6)
        break
        case 18:
            layer.stroke(150,0,0,fade)
            layer.strokeWeight(1)
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(lsin(360*a/la)*(10-a%2*5),lcos(360*a/la)*(10-a%2*5))
            }
            layer.endShape(CLOSE)
        break
        case 19:
            layer.stroke(150,175,200,fade)
            layer.strokeWeight(1.5)
			layer.line(-7.5,-4.5,0,-9)
            layer.line(7.5,-4.5,0,-9)
			layer.arc(0,-4.5,15,24,0,180)
        break
        case 20:
            layer.stroke(75,150,75,fade)
            layer.strokeWeight(1.5)
            layer.line(-7.5,-3,1.5,-3)
            layer.line(-7.5,3,1.5,3)
            layer.line(-7.5,-3,-7.5,3)
            layer.line(1.5,-7.5,10.5,0)
            layer.line(1.5,7.5,10.5,0)
            layer.line(1.5,-7.5,1.5,-3)
            layer.line(1.5,7.5,1.5,3)
        break
        case 21:
            layer.stroke(255,255,200,fade)
            layer.strokeWeight(1)
            layer.beginShape()
            for(let a=0,la=8;a<la;a++){
                layer.vertex(lsin(360*a/la)*(10-a%2*6),lcos(360*a/la)*(10-a%2*6))
            }
            layer.endShape(CLOSE)
        break
        case 22:
            layer.stroke(0,fade)
            layer.strokeWeight(3)
            layer.noFill()
            layer.ellipse(0,0,30,30)
            layer.line(-8,-2,-4,2)
            layer.line(-8,2,-4,-2)
            layer.line(8,-2,4,2)
            layer.line(8,2,4,-2)
        break
        case 23:
            layer.stroke(255,fade)
            layer.strokeWeight(1.2)
            layer.arc(0,0,15,15,-165,-105)
            layer.arc(0,0,15,15,-75,-15)
            layer.arc(0,0,15,15,15,75)
            layer.arc(0,0,15,15,105,165)
        break
        case 24:
            layer.fill(255,50,50,fade)
            layer.triangle(0,12,-6,-6,6,-6)
        break
        case 25:
            layer.fill(150,175,200,fade)
            layer.triangle(0,12,-6,-6,6,-6)
        break
        case 26:
            layer.fill(0,150,255,fade)
            layer.triangle(0,12,-6,-6,6,-6)
        break
        case 27:
            layer.fill(150,175,200,fade)
			layer.triangle(-7.5,-4.5,7.5,-4.5,0,-9)
			layer.arc(0,-4.5,15,24,0,180)
        break
        case 28:
            layer.fill(240,240,220,fade)
            layer.ellipse(0,0,24,24)
            layer.fill(220,220,200,fade)
            layer.ellipse(0,0,15,15)
        break
        case 29:
            layer.fill(255,50,50,fade)
            layer.triangle(-4,-12,-8,6,0,6)
            layer.ellipse(6,0,8,8)
        break
        case 30:
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(-5,-5,8,8)
            layer.rect(5,-5,8,8)
            layer.rect(-5,5,8,8)
            layer.rect(5,5,8,8)
            layer.rect(0,0,22,22)
        break
        case 31:
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(1.5)
            layer.line(-10,-10,10,10)
            layer.line(-10,10,10,-10)
        break
        case 32:
            layer.fill(255,fade)
            layer.ellipse(-4,1,6,6)
            layer.ellipse(0,2,6,6)
            layer.ellipse(4,1,6,6)
            layer.ellipse(-2,-2,6,6)
            layer.ellipse(2,-2,6,6)
        break
        case 33:
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(1)
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(lsin(360*a/la)*(10-a%2*4),lcos(360*a/la)*(10-a%2*4))
            }
            layer.endShape(CLOSE)
            layer.line(-3,-3,3,3)
            layer.line(-3,3,3,-3)
        break
        case 34:
            layer.stroke(0,fade)
            layer.strokeWeight(3)
            layer.noFill()
            layer.ellipse(0,0,30,30)
            layer.strokeWeight(6)
            layer.point(-6,0)
            layer.point(6,0)
            layer.strokeWeight(2)
            layer.line(-3,-3,-8,-5)
            layer.line(3,-3,8,-5)
        break
        case 35:
            layer.stroke(0,fade)
            layer.strokeWeight(3)
            layer.noFill()
            layer.ellipse(0,0,70,70)
            layer.ellipse(0,0,50,50)
            for(let a=0,la=12;a<la;a++){
                layer.line(lsin(360*a/la)*25,lcos(360*a/la)*25,lsin(360*(a-0.5)/la)*35,lcos(360*(a-0.5)/la)*35)
                layer.line(lsin(360*a/la)*25,lcos(360*a/la)*25,lsin(360*(a+0.5)/la)*35,lcos(360*(a+0.5)/la)*35)
                layer.line(lsin(360*(a-0.5)/la)*35,lcos(360*(a-0.5)/la)*35,lsin(360*(a-0.5)/la)*40,lcos(360*(a-0.5)/la)*40)
            }
            layer.ellipse(0,0,30,30)
            layer.strokeWeight(6)
            layer.point(-6,0)
            layer.point(6,0)
            layer.strokeWeight(2)
            layer.line(-3,-3,-8,-5)
            layer.line(3,-3,8,-5)
        break
        case 36:
            layer.fill(150)
            layer.triangle(0,-10,-3,4,3,4)
            layer.fill(100,60,20)
            layer.rect(0,6,3,4)
        break
        case 37:
            layer.fill(150,175,200,fade)
            layer.rect(0,0,12,12)
            layer.triangle(-1.5,-6,1.5,-6,0,-10.5)
            layer.triangle(-6,-1.5,-6,1.5,-10.5,0)
            layer.triangle(-1.5,6,1.5,6,0,10.5)
            layer.triangle(6,-1.5,6,1.5,10.5,0)
        break
        case 38:
            layer.fill(255,50,50,this.fade)
            layer.triangle(-7.5,-6,-7.5,-0.75,9,-3.375)
            layer.triangle(7.5,6,7.5,-0.75,-9,3.375)
        break
        case 39:
            layer.fill(255,50,50,fade)
            layer.triangle(-4.5,-9,-7.5,4.5,-1.5,4.5)
            layer.triangle(4.5,-9,7.5,4.5,1.5,4.5)
        break
        case 40:
            layer.fill(100,0,100,fade)
            layer.rect(0,0,8,8)
            layer.quad(0,-4*sqrt(2),-4*sqrt(2),0,0,4*sqrt(2),4*sqrt(2),0)
        break
        case 41:
            layer.fill(255,50,50,fade)
            layer.triangle(4,-12,8,6,0,6)
            layer.rect(-6,0,6,6)
        break
        case 42:
            layer.fill(150,175,200,fade)
            layer.triangle(4,-12,8,6,0,6)
            layer.rect(-6,0,6,6)
        break
        case 43:
            layer.fill(150,175,200,fade)
            layer.quad(0,-3,-3,0,0,3,3,0)
            layer.ellipse(-4,-4,3,3)
            layer.ellipse(-4,4,3,3)
            layer.ellipse(4,-4,3,3)
            layer.ellipse(4,4,3,3)
        break
        case 44:
            layer.fill(255,125,0,this.fade)
            layer.rect(-1.5,-1.5,7,7)
            layer.fill(255,255,0,this.fade)
            layer.rect(0,0,7,7)
            layer.fill(125,255,0,this.fade)
            layer.rect(1.5,1.5,7,7)
        break
        case 45:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.fill(200,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
        break
        case 46:
            layer.fill(150,fade)
            layer.rect(-3,0,4.5,6,1)
            layer.rect(3,0,4.5,6,1)
        break
        case 47:
            layer.stroke(150,0,0,fade)
            layer.strokeWeight(0.5)
            layer.beginShape()
            for(let a=0,la=9;a<la;a++){
                layer.vertex(lsin(180*a/(la-1))*(5-a%2*2.5)+0.25,lcos(180*a/(la-1))*(5-a%2*2.5))
            }
            layer.endShape(CLOSE)
            layer.stroke(100,fade)
            layer.strokeWeight(0.5)
            layer.beginShape()
            for(let a=0,la=9;a<la;a++){
                layer.vertex(lsin(-180+180*a/(la-1))*(5-a%2*2.5)-0.25,lcos(-180+180*a/(la-1))*(5-a%2*2.5))
            }
            layer.endShape(CLOSE)
        break
        case 48:
            layer.fill(50,150,100,fade)
            layer.ellipse(0,0,12,12)
            layer.rotate(-45)
            for(let a=0,la=3;a<la;a++){
                layer.triangle(-3,4.5,3,4.5,0,12)
                layer.rotate(45)
            }
        break
        case 49:
            layer.fill(200,100,200,fade)
            layer.rect(-3,0,6,4)
            layer.triangle(0,-6,0,6,8,0)
        break
        case 50:
            layer.fill(100,200,150,fade)
            layer.ellipse(-4,-4,8,8)
            layer.ellipse(4,-4,8,8)
            layer.ellipse(-4,4,8,8)
            layer.ellipse(4,4,8,8)
            layer.ellipse(0,0,6,6)
            layer.rect(0,6,1,12)
        break
        case 51:
            layer.fill(255,255,150,fade)
            layer.beginShape()
            for(let a=0,la=10;a<la;a++){
                layer.vertex(lsin(a*36)*(1+a%2*6),lcos(a*36)*(1+a%2*6))
            }
            layer.endShape()
        break
        case 52:
            layer.stroke(0,fade)
            layer.strokeWeight(3)
            layer.noFill()
            layer.rect(0,-7,32,12)
            layer.rect(0,7,28,16)
            layer.rect(0,-4,6,4)
        break
        case 53:
            layer.fill(100,fade)
            layer.rect(-4,-4,5,5)
            layer.ellipse(4,-4,6,6)
            regTriangle(layer,-4,4,4,4,60)
            layer.quad(4,1,7,4,4,7,1,4)
        break
        case 54:
            layer.stroke(120,fade)
            layer.strokeWeight(1.5)
            layer.line(6,-4,6,6)
            layer.arc(4,6,4,4,0,90)
            layer.line(-4,8,4,8)
            layer.arc(-4,6,4,4,90,180)
            layer.line(-6,-4,-6,6)
        break
        case 55:
            layer.fill(75,150,75,fade)
            layer.rect(0,-2,4,6)
            layer.triangle(-4,1,4,1,0,7)
        break
        case 56:
            layer.fill(200,180,120,fade)
            layer.ellipse(0,0,12,12)
            layer.rect(0,-6,3,6)
            layer.rect(0,6,3,6)
            layer.rect(-6,0,6,3)
            layer.rect(6,0,6,3)
        break
        case 57:
            layer.fill(150,fade)
            layer.triangle(0,0,-6,0,0,-6)
            layer.triangle(0,0,6,0,0,6)
            layer.fill(125,fade)
            layer.triangle(0,0,-6,0,0,6)
            layer.triangle(0,0,6,0,0,-6)
        break
        case 58:
            layer.fill(0,150,255,fade)
            layer.triangle(0,1,-2,-5,2,-5)
            layer.triangle(1,0,-5,-2,-5,2)
            layer.triangle(0,-1,2,5,-2,5)
            layer.triangle(-1,0,5,2,5,-2)
        break
        case 59:
            layer.fill(255,50,50,fade)
            layer.triangle(13.5,0,-6.75,-4.5,-6.75,4.5)
        break
        case 60:
            layer.fill(75,fade)
            layer.beginShape()
            for(let a=0,la=12;a<la;a++){
                layer.vertex(lsin(a*30)*(2+a%2*4),lcos(a*30)*(2+a%2*4))
            }
            layer.endShape()
        break
        case 61:        
            layer.fill(255,50,50,this.fade)
            layer.triangle(-7.5,-6,-7.5,-0.75,9,-3.375)
            layer.triangle(7.5,6,7.5,-0.75,-9,3.375)
            layer.ellipse(-12,0,4.5,4.5)
        break
        case 62:
            layer.fill(150,fade)
            layer.rect(0,0,7.5,10,2)
            layer.fill(200,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
        break
        case 63:
            layer.fill(75,fade)
            layer.beginShape()
            for(let a=0,la=8;a<la;a++){
                layer.vertex(lsin((a+0.5)/la*360)*6,lcos((a+0.5)/la*360)*6)
            }
            layer.endShape()
        break
        case 64:
            layer.fill(225,25,25,fade)
            layer.ellipse(-12,0,8,8)
            layer.fill(25,225,25,fade)
            layer.ellipse(0,0,8,8)
            layer.fill(25,25,225,fade)
            layer.ellipse(12,0,8,8)
        break
        case 65:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,10,10)
            layer.rotate(-36)
            for(let a=0,la=3;a<la;a++){
                layer.triangle(-3,-3,3,-3,0,-10)
                layer.rotate(36)
            }
        break
        case 66:
            layer.fill(150,255,100,fade)
            layer.arc(0,0,12,12,-30,210)
            layer.quad(0,0,sqrt(3)*3,-3,0,-3/(2-sqrt(3)),-sqrt(3)*3,-3)
        break
        case 67:
            layer.stroke(150,0,0,fade)
            layer.strokeWeight(1)
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(lsin(360*a/la)*(10-a%2*5),lcos(360*a/la)*(10-a%2*5))
            }
            for(let a=0,la=16;a<la;a++){
                layer.vertex(lsin(360*a/la)*(16-a%2*9),lcos(360*a/la)*(16-a%2*9))
            }
            layer.endShape(CLOSE)
        break
        case 68:
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,8,8)
            layer.rect(0,0,22,12)
        break
        case 69:
            layer.fill(100,255,100,fade)
            layer.triangle(-4.5,-6,4.5,-6,0,-9)
            layer.triangle(-4.5,6,4.5,6,0,9)
            layer.triangle(-6,-4.5,-6,4.5,-9,0)
            layer.triangle(6,-4.5,6,4.5,9,0)
        break
        case 70:
            layer.fill(90,95,100,fade)
            regPoly(layer,0,0,6,24,10.8,0)
            layer.fill(190,195,200,fade)
            for(let a=0,la=5;a<la;a++){
                for(let b=0,lb=1+a%2;b<lb;b++){
                    layer.triangle(-2+10-lb*10+b*20,2+3/2-la*3/2+a*3,2+10-lb*10+b*20,2+3/2-la*3/2+a*3,10-lb*10+b*20,-3+3/2-la*3/2+a*3)
                }
            }
        break
        case 71:
            layer.fill(150,255,150,fade)
            layer.rect(0,0,6,24)
            layer.rect(0,0,24,6)
            layer.ellipse(-9,-9,6,6)
            layer.ellipse(-9,9,6,6)
            layer.ellipse(9,-9,6,6)
            layer.ellipse(9,9,6,6)
        break
        case 72:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-12,-3,6,3,6)
            layer.fill(80,fade)
            layer.triangle(-4,-3,-4,3,8,0)
        break
        case 73:
            layer.fill(150,175,200,fade)
            layer.triangle(0,-12,-3,6,3,6)
            layer.fill(80,fade)
            layer.triangle(-4,-3,-4,3,8,0)
        break
        case 74:
            layer.fill(150,175,200,fade)
			layer.triangle(-7.5,-4.3,7.5,-4.5,0,-9)
			layer.arc(0,-4.5,15,24,0,180)
            layer.fill(225,fade)
            layer.rect(-4.5,0,13.5,4.5)
            layer.triangle(2.25,-6.75,2.25,6.75,11.25,0)
        break
        case 75:
            layer.stroke(40,fade)
            layer.strokeWeight(2)
            layer.ellipse(0,0,16,16)
            layer.line(0,0,0,-5)
            layer.line(0,0,3,3)
        break
    }
    layer.pop()
}
/*
1-Relic
2-Health
3-Enemy
4-7-Arrow
8-Card
9-Energy
10-Max Health
11-Strength
12-Dexterity
13-Movement (Card Symbol)
14-Redo
15-Miracle
16-No
17-Add
18-Attack
19-Defense
20-Movement (Standard Symbol)
21-Power
22-Dead
23-Dodge
24-Weak
25-Frail
26-Vulnerable
27-Block
28-Currency
29-Single Damage
30-Item
31-Empty
32-Rest
33-Pain
34-Elite
35-Boss
36-Shiv
37-Armor
38-Counter
39-Double Damage
40-Curse
41-Temporary Strength
42-Temporary Dexterity
43-Metallicize
44-Buffer
45-Free Attack
46-Double Play
47-Half Damage
48-Intangible
49-Retain
50-Luck
51-Status
52-Stash
53-Random
54-Exhaust
55-Movement (Card Symbol) (Reverse)
56-Control
57-Colorless
58-Innate
59-Offensive Intent
60-Fatigue
61-Counter Once
62-Free Card
63-Obstruction
64-Random
65-Burn
66-Poison
67-Explosion
68-Item Slot
69-Stun
70-Spike Tile
71-Regen
72-Strength Per Turn
73-Dexterity Per Turn
74-Retain Block
75-Extra Turn
*/