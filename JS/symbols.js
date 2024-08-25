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
            layer.fill(255,50,50,fade)
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
        case 8:
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
            layer.rect(-2,0,6,2)
            layer.triangle(1,-3,1,3,5,0)
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
            layer.rect(-2,0,6,2)
            layer.triangle(1,-3,1,3,5,0)
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
            layer.ellipse(0,0,8)
            layer.rect(0,-4,2,4)
            layer.rect(0,4,2,4)
            layer.rect(-4,0,4,2)
            layer.rect(4,0,4,2)
        break
        case 16:
            layer.fill(150,175,200,fade)
			layer.triangle(-4,-2.4,4,-2.4,0,-4.8)
			layer.arc(0,-2.4,8,12.8,0,180)
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(0.75)
            layer.noFill()
            layer.ellipse(0,0,12,12)
            layer.line(-3*sqrt(2),3*sqrt(2),3*sqrt(2),-3*sqrt(2))
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
        case 20:
            layer.fill(255,50,50,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.triangle(0,-3.5,-1,-6.5,1,-6.5)
        break
        case 21:
            layer.fill(255,125,0,fade)
            layer.rect(-1.5,-1.5,7,7)
            layer.fill(255,255,0,fade)
            layer.rect(0,0,7,7)
            layer.fill(125,255,0,fade)
            layer.rect(1.5,1.5,7,7)
        break
        case 22:
            layer.fill(150,0,0,fade)
            layer.beginShape()
            for(let a=0,la=9;a<la;a++){
                layer.vertex(sin(a/(la-1)*180)*(5-a%2*3),cos(a/(la-1)*180)*(5-a%2*3))
            }
            layer.endShape()
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
            layer.ellipse(0,0,8)
            layer.rotate(-45)
            for(let a=0,la=3;a<la;a++){
                layer.triangle(-2,3,2,3,0,8)
                layer.rotate(45)
            }
        break
        case 26:
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
        break
        case 27:
            layer.fill(150,fade)
            layer.rect(0,0,7.5,10,2)
            layer.fill(200,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
        break
        case 28:
            layer.fill(225,fade)
            layer.ellipse(0,2,5,5)
            layer.ellipse(sin(120)*2,cos(120)*2,5,5)
            layer.ellipse(-sin(120)*2,cos(120)*2,5,5)
        break
        case 29:
            layer.fill(225,fade)
            layer.ellipse(0,2,5,5)
            layer.ellipse(sin(120)*2,cos(120)*2,5,5)
            layer.ellipse(-sin(120)*2,cos(120)*2,5,5)
            layer.triangle(0,5.5,-1,7.5,1,7.5)
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
            layer.ellipse(0,0,10,10)
            layer.line(0,0,0,-3.25)
            layer.line(0,0,2,2)
        break
        case 36:
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.ellipse(0,6,3,3)
        break
        case 37:
            layer.fill(150,175,200,fade)
			layer.triangle(-4,-2.4,4,-2.4,0,-4.8)
			layer.arc(0,-2.4,8,12.8,0,180)
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(0.75)
            layer.noFill()
            layer.ellipse(0,0,12,12)
            layer.line(-3*sqrt(2),3*sqrt(2),3*sqrt(2),-3*sqrt(2))
            layer.fill(80,fade)
            layer.triangle(-2,-1.5,-2,1.5,4,0)
        break
        case 38:
            layer.fill(150,0,0,fade)
            layer.rect(-3,0,4,3)
            layer.triangle(6,0,-1,6,-1,-6)
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.ellipse(-8,0,3,3)
        break
        case 39:
            layer.fill(200,0,0,fade)
            layer.arc(0,0,8,8,-45,225)
            layer.quad(0,0,sqrt(2)*2,-sqrt(2)*2,0,-sqrt(2)*4,-sqrt(2)*2,-sqrt(2)*2)
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.ellipse(-8,0,3,3)
        break
        case 40:
            layer.fill(255,50,50,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.rect(-3,-2,3,3)
            layer.quad(-4.5,2,-3,0.5,-1.5,2,-3,3.5)
        break
        case 41:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.fill(75,fade)
            layer.rect(-5,0,2)
        break
        case 42:
            layer.scale(0.75)
            layer.stroke(0,fade)
            layer.strokeWeight(0.4)
            layer.fill(240,240,220,fade)
            layer.ellipse(0,0,16)
            layer.noStroke()
            layer.fill(220,220,200,fade)
            layer.ellipse(0,0,10)
            layer.fill(255,255,100,fade)
            layer.ellipse(0,0,4)
            layer.triangle(-1,-3,1,-3,0,-7)
            layer.triangle(-1,3,1,3,0,7)
        break
        case 43:
            layer.fill(150,0,0,fade)
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(lsin(360*a/la)*(6-a%2*3),lcos(360*a/la)*(6-a%2*3))
            }
            layer.endShape()
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
        break
        case 44:
            layer.fill(255,50,50,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.stroke(0,fade)
            layer.strokeWeight(1)
            layer.noFill()
            layer.ellipse(0,0,10,10)
            layer.line(-8/3,-2/3,-4/3,2/3)
            layer.line(-8/3,2/3,-4/3,-2/3)
            layer.line(8/3,-2/3,4/3,2/3)
            layer.line(8/3,2/3,4/3,-2/3)
        break
        case 45:
            layer.fill(0,150,255,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.stroke(0,fade)
            layer.strokeWeight(0.6)
            layer.noFill()
            layer.ellipse(0,0,8)
            layer.line(-3,-1,-1,1)
            layer.line(-3,1,-1,-1)
            layer.line(3,-1,1,1)
            layer.line(3,1,1,-1)
        break
        case 46:
            layer.stroke(200,180,120,fade)
            layer.strokeWeight(2)
            layer.ellipse(0,0,10,10)
            layer.noStroke()
            layer.fill(200,180,120,fade)
            layer.rect(0,-3,2,2)
            layer.rect(0,3,2,2)
            layer.rect(-3,0,2,2)
            layer.rect(3,0,2,2)
        break
        case 47:
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.ellipse(0,6,3,3)
            layer.ellipse(-8,0,3,3)
        break
        case 48:
            layer.fill(240,fade)
            layer.rect(0,-4,6,2)
            layer.rect(0,4,6,2)
            layer.quad(3,-3,1.5,-3,-3,3,-1.5,3)
        break
        case 49:
            layer.fill(150,0,0,fade)
            layer.arc(0,0,8,8,0,180)
            layer.triangle(-4,0,-3,-4,-2,0)
            layer.triangle(4,0,3,-4,2,0)
            layer.triangle(-2,0,2,0,0,-6)
        break
        case 50:
            layer.fill(150,175,200,fade)
            layer.triangle(-5,0,5,0,0,-5)
            layer.quad(5,1,-5,1,-2,4,2,4)
        break
        case 51:
            layer.fill(225,fade)
            layer.ellipse(0,0,8)
            layer.rotate(-22.5)
            for(let a=0,la=8;a<la;a++){
                layer.triangle(-1,3,1,3,0,8)
                layer.rotate(45)
            }
            layer.rotate(22.5)
        break
        case 52:
            layer.fill(225,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.arc(0,4,8,8,-90,90)
            }
        break
        case 53:
            layer.stroke(150,0,0,fade)
            layer.strokeWeight(0.5)
            layer.beginShape()
            for(let a=0,la=7;a<la;a++){
                layer.vertex(lsin(120*a/(la-1))*(5-a%2*2.5),lcos(120*a/(la-1))*(5-a%2*2.5))
            }
            layer.vertex(0,0)
            layer.endShape(CLOSE)
            layer.stroke(100,fade)
            layer.strokeWeight(0.5)
            layer.beginShape()
            for(let a=0,la=13;a<la;a++){
                layer.vertex(lsin(-240+240*a/(la-1))*(5-a%2*2.5),lcos(-240+240*a/(la-1))*(5-a%2*2.5))
            }
            layer.vertex(0,0)
            layer.endShape(CLOSE)
        break
        case 54:
            layer.fill(255,225,75,fade)
            layer.triangle(-2,4,2,4,0,-8)
        break
        case 55:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.triangle(0,3.5,-1,6.5,1,6.5)
        break
        case 56:
            layer.fill(150,0,0,fade)
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(lsin(360*a/la)*(6-a%2*3),lcos(360*a/la)*(6-a%2*3))
            }
            layer.endShape()
            layer.fill(255,50,50,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.rect(-3,0,3,3)
        break
        case 57:
            layer.stroke(150,0,0,fade)
            layer.strokeWeight(0.5)
            layer.beginShape()
            for(let a=0,la=13;a<la;a++){
                layer.vertex(lsin(270*a/(la-1))*(5-a%2*2.5),lcos(270*a/(la-1))*(5-a%2*2.5))
            }
            layer.vertex(0,0)
            layer.endShape(CLOSE)
            layer.stroke(100,fade)
            layer.strokeWeight(0.5)
            layer.beginShape()
            for(let a=0,la=5;a<la;a++){
                layer.vertex(lsin(-90+90*a/(la-1))*(5-a%2*2.5),lcos(-90+90*a/(la-1))*(5-a%2*2.5))
            }
            layer.vertex(0,0)
            layer.endShape(CLOSE)
        break
        case 58:
            layer.fill(255,50,50,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.rect(-3,0,3,3)
            layer.triangle(0,3.5,-1,6.5,1,6.5)
        break
        case 59:
            layer.fill(255,225,75,fade)
            layer.triangle(-2,4,2,4,0,-8)
            layer.rect(-4,0,3,3)
        break
        case 60:
            layer.fill(255,50,50,fade)
            layer.triangle(6,0,-4.5,-3,-4.5,3)
            layer.fill(40,fade)
            layer.rect(6,0,2,8)
        break
        case 61:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noFill()
            layer.stroke(200,0,0,fade)
            layer.strokeWeight(1.5)
            layer.ellipse(0,0,10,10)
            layer.line(-3.5,-3.5,3.5,3.5)
            layer.stroke(255,255,100)
            layer.line(5,-5,-5,5)
        break
        case 62:
            layer.fill(150,0,0,fade)
            layer.beginShape()
            for(let a=0,la=9;a<la;a++){
                layer.vertex(sin(a/(la-1)*180)*(5-a%2*3)+2.25,cos(a/(la-1)*180)*(5-a%2*3))
            }
            layer.endShape()
            layer.fill(200,fade)
            layer.stroke(175,fade)
            layer.strokeWeight(1)
            layer.rect(-1,0,6,8,1)
        break
        case 63:
            layer.fill(0,150,255,fade)
            layer.triangle(2,6,4,-3,0,-3)
            layer.quad(-4.5,0,-3,-1.5,-1.5,0,-3,1.5)
        break
        case 64:
            layer.fill(150,0,0,fade)
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(lsin(360*a/la)*(6-a%2*3),lcos(360*a/la)*(6-a%2*3))
            }
            layer.endShape()
            layer.fill(200,255,255,fade)
            layer.quad(-4,0,0,-5,4,0,0,5)
            layer.fill(225,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
        break
        case 65:
            layer.fill(150,175,200,fade)
            layer.rect(0,0,3,9)
            layer.rect(-3,0,2,6)
            layer.rect(3,0,2,6)
            layer.triangle(-1,-5,1,-5,0,-6)
            layer.triangle(-1,5,1,5,0,6)
        break
        case 66:
            layer.fill(255,200,255,fade)
            layer.quad(-1,-7.5,0,-5,0,5,-1,5)
            layer.fill(255,150,255,fade)
            layer.quad(1,-2.5,0,-5,0,5,1,5)
            layer.fill(255,255,255,fade)
            layer.rect(0,6,5,2)
            layer.rect(0,8,3,2)
        break
        case 67:
            layer.stroke(240,240,40,fade)
            layer.strokeWeight(1.5)
            layer.strokeCap(SQUARE)
            layer.arc(0.25,-0.25,7.5,7.5,-135,45)
            layer.arc(-0.25,0.25,7.5,7.5,45,225)
            layer.strokeCap(ROUND)
            layer.stroke(120,60,0,fade)
            layer.strokeWeight(1)
            layer.line(5,-5,-5,5)
        break
        case 68:
            layer.stroke(240,240,240,fade)
            layer.strokeWeight(3)
            layer.strokeCap(SQUARE)
            layer.arc(0.25,-0.25,7.5,7.5,-135,45)
            layer.arc(-0.25,0.25,7.5,7.5,45,225)
            layer.stroke(240,240,40,fade)
            layer.strokeWeight(1.5)
            layer.arc(0.25,-0.25,7.5,7.5,-135,45)
            layer.arc(-0.25,0.25,7.5,7.5,45,225)
            layer.strokeCap(ROUND)
        break
        case 69:
            layer.fill(150,0,0,fade)
            layer.beginShape()
            for(let a=0,la=9;a<la;a++){
                layer.vertex(sin(a/(la-1)*180)*(5-a%2*3),cos(a/(la-1)*180)*(5-a%2*3))
            }
            layer.endShape()
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,-0.5,4.5,6,1)
        break
        case 70:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.noFill()
            layer.stroke(240,240,40,fade)
            layer.strokeWeight(1.5)
            layer.strokeCap(SQUARE)
            layer.arc(0.25,-0.25,7.5,7.5,-135,45)
            layer.arc(-0.25,0.25,7.5,7.5,45,225)
            layer.strokeCap(ROUND)
        break
        case 71:
            layer.stroke(240,240,40,fade)
            layer.strokeWeight(1.5)
            layer.strokeCap(SQUARE)
            layer.arc(0.25,-0.25,7.5,7.5,-135,45)
            layer.arc(-0.25,0.25,7.5,7.5,45,225)
            layer.strokeCap(ROUND)
            layer.noStroke()
            layer.fill(80,fade)
            layer.triangle(-2,-1.5,-2,1.5,4,0)
        break
        case 72:
            layer.stroke(240,240,40,fade)
            layer.strokeWeight(1.5)
            layer.strokeCap(SQUARE)
            layer.arc(0.25,-0.25,7.5,7.5,-135,45)
            layer.arc(-0.25,0.25,7.5,7.5,45,225)
            layer.strokeCap(ROUND)
            layer.noStroke()
            layer.fill(80,fade)
            layer.triangle(-2,-1.5,-2,1.5,4,0)
            layer.fill(240,240,40,fade)
            layer.noStroke()
            layer.triangle(0,5,-1,8,1,8)
        break
        case 73:
            layer.fill(255,50,50,fade)
            layer.rect(-6,-2.25,1,3.5)
            layer.rect(6,2.25,1,3.5)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.ellipse(-8,0,3,3)
        break
        case 74:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,-0.5,4.5,6,1)
        break
        case 75:
            layer.fill(255,50,50,fade)
            layer.triangle(2,6,4,-3,0,-3)
            layer.rect(-3,2,3,3)
            layer.quad(-4.5,-2,-3,-0.5,-1.5,-2,-3,-3.5)
        break
        case 76:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.fill(255,200,255,fade)
            layer.quad(-1,-7.5,0,-5,0,5,-1,5)
            layer.fill(255,150,255,fade)
            layer.quad(1,-2.5,0,-5,0,5,1,5)
            layer.fill(255,255,255,fade)
            layer.rect(0,6,5,2)
            layer.rect(0,8,3,2)
        break
        case 77:
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(1)
            regStar(layer,0,0,4,5,5,3,3,0,0)
            layer.line(-3/2,-3/2,3/2,3/2)
            layer.line(-3/2,3/2,3/2,-3/2)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,-0.5,4.5,6,1)
        break
        case 78:
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.triangle(6.5,-1.5,6.5,1.5,8.5,0)
        break
        case 79:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,-0.5,4.5,6,1)
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(1.5)
            layer.ellipse(0,0,8)
            layer.line(-2*sqrt(2),2*sqrt(2),2*sqrt(2),-2*sqrt(2))
        break
        case 80:
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
            layer.stroke(0,fade)
            layer.strokeWeight(0.6)
            layer.noFill()
            layer.ellipse(0,0,8)
            layer.line(-3,-1,-1,1)
            layer.line(-3,1,-1,-1)
            layer.line(3,-1,1,1)
            layer.line(3,1,1,-1)
        break
        case 81:
            layer.fill(200,255,255,fade)
            layer.quad(-5,0,0,-6.25,5,0,0,6.25)
            layer.fill(225,255,255,fade)
            layer.quad(-4,0,0,-5,4,0,0,5)
            layer.triangle(0,-7,-1,-9,1,-9)
        break
        case 82:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,-6,-5,3,-1,3)
            layer.triangle(3,-6,5,3,1,3)
            layer.rect(0,4,10,1)
        break
        case 83:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,-6,-5,3,-1,3)
            layer.triangle(3,-6,5,3,1,3)
            layer.rect(0,4,10,1)
            layer.triangle(0,5,1,7,-1,7)
        break
        case 84:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
        break
        case 85:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.triangle(-2,4,2,4,0,7)
        break
        case 86:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
        break
        case 87:
            layer.fill(200,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
            layer.fill(255,200,255,fade)
            layer.quad(-1,-7.5,0,-5,0,5,-1,5)
            layer.fill(255,150,255,fade)
            layer.quad(1,-2.5,0,-5,0,5,1,5)
            layer.fill(255,255,255,fade)
            layer.rect(0,6,5,2)
            layer.rect(0,8,3,2)
        break
        case 88:
            layer.fill(50,150,100,fade)
            layer.ellipse(0,0,8)
            layer.rotate(-45)
            for(let a=0,la=3;a<la;a++){
                layer.triangle(-2,3,2,3,0,8)
                layer.rotate(45)
            }
            layer.triangle(0,-4.5,-1,-7.5,1,-7.5)
        break
        case 89:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(0,150,255,fade)
            layer.rect(-7,0,1,3)
            layer.rect(-2.25,0,7.5,3)
            layer.triangle(1.5,-4.5,1.5,4.5,7.5,0)
        break
        case 90:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(-3.5,0,4.5,6,1)
            layer.rect(3.5,0,4.5,6,1)
            layer.noFill()
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(0.5)
            layer.ellipse(-3.5,0,8)
            layer.line(-3.5-2*sqrt(2),2*sqrt(2),-3.5+2*sqrt(2),-2*sqrt(2))
        break
        case 91:
            layer.fill(200,25,25,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 92:
            layer.fill(150,0,0,fade)
            layer.quad(-1,-1.5,-1,1.5,-5,4.5,-5,1.5)
            layer.triangle(6,0,-1,6,-1,-6)
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.ellipse(-8,0,3,3)
        break
        case 93:
            layer.fill(150,0,0,fade)
            layer.quad(-1,-1.5,-1,1.5,-5,4.5,-5,1.5)
            layer.triangle(6,0,-1,6,-1,-6)
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.ellipse(-8,0,3,3)
        break
        case 94:
            layer.fill(255,225,75,fade)
            layer.triangle(-2,-4,2,-4,0,8)
            layer.rect(-4,0,3,3)
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.ellipse(-8,0,3,3)
        break
        case 95:
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
            layer.fill(255,100,100,fade)
            layer.rect(0,0,3,12)
            layer.rect(0,0,12,3)
        break
        case 96:
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(1)
            regStar(layer,0,0,4,5,5,3,3,0,0)
            layer.line(-3/2,-3/2,3/2,3/2)
            layer.line(-3/2,3/2,3/2,-3/2)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,-0.5,4.5,6,1)
            layer.noStroke()
            layer.fill(0,150,255,fade)
            layer.rect(-2,0,6,2)
            layer.triangle(1,-3,1,3,5,0)
        break
        case 97:
            layer.stroke(150,0,0,fade)
            layer.strokeWeight(0.5)
            layer.beginShape()
            for(let a=0,la=10;a<la;a++){
                layer.vertex(lsin(180*a/(la-1))*(5-a%2*2.5),lcos(180*a/(la-1))*(5-a%2*2.5))
            }
            layer.vertex(0,0)
            layer.endShape(CLOSE)
            layer.stroke(100,fade)
            layer.strokeWeight(0.5)
            layer.beginShape()
            for(let a=0,la=7;a<la;a++){
                layer.vertex(lsin(-216+180*a/(la-1))*(5-a%2*2.5),lcos(-216+180*a/(la-1))*(5-a%2*2.5))
            }
            layer.vertex(0,0)
            layer.endShape(CLOSE)
        break
        case 98:
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
            layer.fill(200,0,0,fade)
            layer.arc(0,0,6,6,-45,225)
            layer.quad(0,0,sqrt(2)*1.5,-sqrt(2)*1.5,0,-sqrt(2)*3,-sqrt(2)*1.5,-sqrt(2)*1.5)
            layer.rect(0,8,3,3)
        break
        case 99:
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
            layer.fill(200,0,0,fade)
            layer.arc(0,0,6,6,-45,225)
            layer.quad(0,0,sqrt(2)*1.5,-sqrt(2)*1.5,0,-sqrt(2)*3,-sqrt(2)*1.5,-sqrt(2)*1.5)
            layer.ellipse(0,8.5,4,4)
        break
        case 100:
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
            layer.fill(200,0,0,fade)
            layer.arc(0,0,6,6,-45,225)
            layer.quad(0,0,sqrt(2)*1.5,-sqrt(2)*1.5,0,-sqrt(2)*3,-sqrt(2)*1.5,-sqrt(2)*1.5)
        break
        case 101:
            layer.fill(255,175,255,fade)
            for(let a=0,la=5;a<la;a++){
                layer.ellipse(0,-3.5,3,6)
                layer.rotate(72)
            }
        break
        case 102:
            layer.fill(255,175,255,fade)
            for(let a=0,la=5;a<la;a++){
                layer.ellipse(0,-3.5,3,6)
                layer.rotate(72)
            }
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.ellipse(-8,0,3,3)
        break
        case 103:
            layer.fill(255,100,100,fade)
            layer.rect(0,0,3,12)
            layer.rect(0,0,12,3)
            layer.stroke(0,fade)
            layer.strokeWeight(0.6)
            layer.noFill()
            layer.ellipse(0,0,8)
            layer.line(-3,-1,-1,1)
            layer.line(-3,1,-1,-1)
            layer.line(3,-1,1,1)
            layer.line(3,1,1,-1)
        break
        case 104:
            for(let a=0,la=10;a<la;a++){
                layer.fill(255,200*a/la,200*a/la,fade)
                layer.arc(0,0,10,10,a*36,a*36+36)
            }
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(1)
            layer.noFill()
            layer.ellipse(0,0,12,12)
            layer.line(-3*sqrt(2),3*sqrt(2),3*sqrt(2),-3*sqrt(2))
        break
        case 105:
            for(let a=0,la=10;a<la;a++){
                layer.fill(255,200*a/la,200*a/la,fade)
                layer.arc(0,0,10,10,a*36,a*36+36)
            }
            layer.fill(200,255,255,fade)
            layer.quad(-5,0,0,-6.25,5,0,0,6.25)
            layer.fill(225,255,255,fade)
            layer.quad(-4,0,0,-5,4,0,0,5)
        break
        case 106:
            layer.fill(150,0,0,fade)
            layer.triangle(9,0,0,-2,0,2)
            layer.triangle(3,-3,-6,-5,-6,-1)
            layer.triangle(3,3,-6,1,-6,5)
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.ellipse(-8,0,3,3)
        break
        case 107:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(138,141,207,fade)
            layer.rect(-2,0,2,12)
            layer.triangle(-1,-6,-1,-3,8,-4.5)
        break
        case 108:
            layer.fill(150,175,200,fade)
            layer.triangle(-5,-1,5,-1,0,-5)
            layer.quad(5,0,-5,0,-2,2,2,2)
            layer.rect(0,4,3,3)
        break
        case 109:
            layer.fill(255,100,100,fade)
            layer.rect(0,0,2.5,10)
            layer.rect(0,0,10,2.5)
            layer.stroke(255,100,100,fade)
            layer.noFill()
            layer.strokeWeight(0.5)
            layer.rect(0,0,12.5,12.5)
        break
        case 110:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.fill(100,fade)
            layer.triangle(4.5,0,-2.25,-1.5,-2.25,1.5)
        break
        case 111:
            layer.fill(0,150,255,fade)
            layer.ellipse(0,0,8)
            for(let a=0,la=4;a<la;a++){
                layer.rotate(90)
                layer.triangle(0,-2,-2,0,-6,-6)
            }
            layer.fill(50,255,255,fade)
            layer.ellipse(0,0,4,4)
            for(let a=0,la=4;a<la;a++){
                layer.rotate(90)
                layer.triangle(0,-1,-1,0,-4,-4)
            }
        break
        case 112:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noFill()
            layer.stroke(255,255,200,fade)
            layer.strokeWeight(1)
            layer.beginShape()
            for(let a=0,la=8;a<la;a++){
                layer.vertex(lsin(360*a/la)*(5-a%2*3),lcos(360*a/la)*(5-a%2*3))
            }
            layer.endShape(CLOSE)
        break
        case 113:
            layer.fill(255,255,200,fade)
            layer.triangle(-1.5,6.5,1.5,6.5,0,8)
            layer.noFill()
            layer.stroke(255,255,200,fade)
            layer.strokeWeight(1)
            layer.beginShape()
            for(let a=0,la=8;a<la;a++){
                layer.vertex(lsin(360*a/la)*(5-a%2*3),lcos(360*a/la)*(5-a%2*3))
            }
            layer.endShape(CLOSE)
        break
        case 114:
            layer.stroke(100,255,100,fade)
            layer.strokeWeight(2)
            layer.line(-4,0,4,0)
            layer.line(-2,-2*sqrt(3),2,2*sqrt(3))
            layer.line(-3,2*sqrt(3),2,-2*sqrt(3))
            layer.stroke(255,255,200,fade)
            layer.strokeWeight(1)
            layer.beginShape()
            for(let a=0,la=8;a<la;a++){
                layer.vertex(lsin(360*a/la)*(5-a%2*3),lcos(360*a/la)*(5-a%2*3))
            }
            layer.endShape(CLOSE)
        break
        case 115:
            layer.stroke(100,255,255,fade)
            layer.strokeWeight(2)
            layer.line(-4,0,4,0)
            layer.line(-2,-2*sqrt(3),2,2*sqrt(3))
            layer.line(-3,2*sqrt(3),2,-2*sqrt(3))
            layer.noStroke()
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
        break
        case 116:
            layer.fill(80,fade)
            layer.rect(-2.5,0,1,8)
            layer.rect(-1,0,1,8)
            layer.rect(0,-3.5,5.5,1)
            layer.rect(0,3.5,5.5,1)
            layer.triangle(3,-1,3,1,4.5,0)
        break
        case 117:
            layer.stroke(150,225,50,fade)
            layer.strokeWeight(1)
            regPoly(layer,0,0,6,5,5,30)
            layer.line(-2.5,-sqrt(3)*2.5,-2.5,sqrt(3)*2.5)
            layer.line(2.5,-sqrt(3)*2.5,2.5,sqrt(3)*2.5)
        break
        case 118:
            layer.fill(0,150,255,fade)
            layer.ellipse(0,0,8)
            layer.triangle(-1.5,5,1.5,5,0,7)
            for(let a=0,la=4;a<la;a++){
                layer.rotate(90)
                layer.triangle(0,-2,-2,0,-6,-6)
            }
            layer.fill(50,255,255,fade)
            layer.ellipse(0,0,4,4)
            for(let a=0,la=4;a<la;a++){
                layer.rotate(90)
                layer.triangle(0,-1,-1,0,-4,-4)
            }
        break
        case 119:
            layer.fill(125,255,255,fade)
            layer.rect(0,0,9,9)
            layer.fill(175,255,255,fade)
            layer.rect(0,0,6,6)
            layer.fill(225,255,255,fade)
            layer.rect(0,0,3,3)
        break
        case 120:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.stroke(75,150,75,fade)
            layer.line(-5,-1,1,-1)
            layer.line(-5,1,1,1)
            layer.line(-5,-1,-5,1)
            layer.line(1,-4,6,0)
            layer.line(1,4,6,0)
            layer.line(1,-4,1,-1)
            layer.line(1,4,1,1)
        break
        case 121:
            layer.fill(175,0,0,fade)
            layer.arc(0,0,8,8,-45,225)
            layer.quad(0,0,sqrt(2)*2,-sqrt(2)*2,0,-sqrt(2)*4,-sqrt(2)*2,-sqrt(2)*2)
            layer.triangle(-3,2,-2,3,-5,5)
            layer.triangle(3,2,2,3,5,5)
        break
        case 122:
            layer.fill(200,0,0,fade)
            layer.arc(0,0,8,8,-45,225)
            layer.quad(0,0,sqrt(2)*2,-sqrt(2)*2,0,-sqrt(2)*4,-sqrt(2)*2,-sqrt(2)*2)
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.triangle(6.5,-1.5,6.5,1.5,8.5,0)
        break
        case 123:
            layer.fill(0,150,255,fade)
            layer.triangle(-3,6,-5,-3,-1,-3)
            layer.triangle(3,6,5,-3,1,-3)
        break
        case 124:
            layer.stroke(255,fade)
            layer.strokeWeight(0.8)
            layer.arc(0,0,10,10,-165,-105)
            layer.arc(0,0,10,10,-75,-15)
            layer.arc(0,0,10,10,15,75)
            layer.arc(0,0,10,10,105,165)
            layer.noStroke()
            layer.fill(255,fade)
            layer.triangle(0,6,-1,8,1,8)
        break
        case 125:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noFill()
            layer.stroke(255,fade)
            layer.strokeWeight(1)
            layer.beginShape()
            for(let a=0,la=8;a<la;a++){
                layer.vertex(lsin(360*a/la)*(5-a%2*3),lcos(360*a/la)*(5-a%2*3))
            }
            layer.endShape(CLOSE)
        break
        case 126:
            layer.stroke(175,fade)
            layer.strokeWeight(1)
            layer.line(-4,-4,4,4)
            layer.line(-4,4,4,-4)
            layer.line(-4,-4,-4,4)
            layer.line(4,4,4,-4)
            layer.line(-4,-4,0,-4)
            layer.line(4,4,0,4)
            layer.noStroke()
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
        break
        case 127:
            layer.stroke(175,fade)
            layer.strokeWeight(1)
            layer.line(-4,-4,4,4)
            layer.line(-4,4,4,-4)
            layer.line(-4,-4,-4,4)
            layer.line(4,4,4,-4)
            layer.line(-4,-4,0,-4)
            layer.line(4,4,0,4)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
        break
        case 128:
            layer.fill(150,0,0,fade)
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(sin(a/la*360)*(6-a%2*3.6),cos(a/la*360)*(6-a%2*3.6))
            }
            layer.endShape()
            layer.triangle(0,6.5,-1,9.5,1,9.5)
        break
        case 129:
            layer.fill(255,200,255,fade)
            layer.beginShape()
            for(let a=0,la=8;a<la;a++){
                layer.vertex(sin(a/la*360)*(4-a%2*3),cos(a/la*360)*(4-a%2*3))
            }
            layer.endShape()
            layer.fill(80,fade)
            layer.triangle(-2,-1.5,-2,1.5,4,0)
        break
        case 130:
            layer.stroke(255,100,200,fade)
            layer.strokeWeight(1)
            for(let a=0,la=12;a<la;a++){
                layer.line(lsin(a*30)*3,lcos(a*30)*3,lsin(a*30)*6,lcos(a*30)*6)
            }
            layer.fill(255,100,200,fade)
            layer.noStroke()
            layer.triangle(0,7,-1,10,1,10)
        break
        case 131:
            layer.stroke(255,100,200,fade)
            layer.strokeWeight(1)
            for(let a=0,la=12;a<la;a++){
                layer.line(lsin(a*30)*3,lcos(a*30)*3,lsin(a*30)*6,lcos(a*30)*6)
            }
            layer.fill(255,100,200,fade)
            layer.noStroke()
            layer.triangle(0,7,-1,10,1,10)
            layer.triangle(0,-10,-1,-7,1,-7)
        break
        case 132:
            layer.stroke(255,75,75,fade)
            layer.strokeWeight(1)
            layer.line(-4,-4,4,4)
            layer.line(-4,4,4,-4)
            layer.line(-4,-4,-4,4)
            layer.line(4,4,4,-4)
            layer.line(-4,-4,0,-4)
            layer.line(4,4,0,4)
            layer.fill(255,75,75,fade)
            layer.noStroke()
            layer.triangle(0,6.5,-1,9.5,1,9.5)
        break
        case 133:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(-2,0,4.5,6,1)
            layer.rect(3,0,3,4,1)
        break
        case 134:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(255,50,50,fade)
            layer.triangle(-8,-2,-8,2,-5,0)
            layer.fill(150,175,200,fade)
            layer.triangle(6,-2,6,2,9,0)
        break
        case 135:
            layer.fill(200,255,255,fade)
            layer.quad(-5,0,0,-6.25,5,0,0,6.25)
            layer.fill(225,255,255,fade)
            layer.quad(-4,0,0,-5,4,0,0,5)
            layer.triangle(0,6.5,-1,9.5,1,9.5)
        break
        case 136:
            layer.fill(200,255,255,fade)
            layer.quad(-5,0,0,-6.25,5,0,0,6.25)
            layer.fill(225,255,255,fade)
            layer.quad(-4,0,0,-5,4,0,0,5)
            layer.fill(200,100,200,fade)
            layer.rect(-3,0,6,4)
            layer.triangle(0,-6,0,6,8,0)
        break
        case 137:
            layer.stroke(0,fade)
            layer.strokeWeight(0.6)
            layer.noFill()
            layer.ellipse(0,0,8)
            layer.line(-3,-1,-1,1)
            layer.line(-3,1,-1,-1)
            layer.line(3,-1,1,1)
            layer.line(3,1,1,-1)
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(1)
            layer.ellipse(0,0,12,12)
            layer.line(-3*sqrt(2),3*sqrt(2),3*sqrt(2),-3*sqrt(2))
        break
        case 138:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.rect(-6.5,0,2,2)
            layer.rect(-6.5,-3,2,2)
            layer.rect(-6.5,3,2,2)
        break
        case 139:
            layer.fill(150,0,0,fade)
            regStar(layer,0,8,7.7,7.7,4.5,4.5,0)
            layer.fill(150,175,200,fade)
			layer.triangle(-4,-2.4,4,-2.4,0,-4.8)
			layer.arc(0,-2.4,8,12.8,0,180)
            layer.ellipse(0,6.5,4,4)
        break
        case 140:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(255,200,255,fade)
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(sin(a/la*360)*(6-a%2*4+(a%4==0?1:0)*5),cos(a/la*360)*(6-a%2*4+(a%4==0?1:0)*5))
            }
            layer.endShape()
        break
        case 141:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(255,200,255,fade)
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(sin(a/la*360)*(6-a%2*4+(a%4==0?1:0)*5),cos(a/la*360)*(6-a%2*4+(a%4==0?1:0)*5))
            }
            layer.endShape()
            layer.triangle(0,-10.5,-1,-7.5,1,-7.5)
        break
        case 142:
            layer.stroke(255,255,150)
            layer.strokeWeight(1)
            for(let a=0,la=5;a<la;a++){
                layer.rotate(72)
                layer.line(0,0,0,5)
                layer.line(0,5,-2,4)
            }
            layer.noStroke()
            layer.fill(80,fade)
            layer.triangle(-2,-1.5,-2,1.5,4,0)
        break
        case 143:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,4,4)
            layer.rotate(-36)
            for(let a=0,la=3;a<la;a++){
                layer.triangle(-1.2,-1.2,1.2,-1.2,0,-4)
                layer.rotate(36)
            }
        break
        case 144:
            layer.fill(0,fade)
            layer.ellipse(0,0,9,9)
            for(let a=0,la=10;a<la;a++){
                layer.rotate(36)
                layer.triangle(-0.5,-4,0.5,-4,0,-6)
            }
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.fill(255,150,255,fade)
            layer.triangle(-2,1.5,2,1.5,0,-2.5)
        break
        case 145:
            layer.fill(40,fade)
            layer.ellipse(0,0,9,9)
            for(let a=0,la=10;a<la;a++){
                layer.rotate(36)
                layer.triangle(-0.5,-4,0.5,-4,0,-6)
            }
            if(variants.mtg){
                displayMtgManaSymbol(layer,0,0,-1,0,0.4,fade,-1,[])
            }else{
                layer.fill(200,255,255,fade)
                layer.quad(-5,0,0,-6.25,5,0,0,6.25)
                layer.fill(225,255,255,fade)
                layer.quad(-4,0,0,-5,4,0,0,5)
            }
        break
        case 146:
            layer.fill(150,175,200,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.triangle(0,3.5,-1,6.5,1,6.5)
        break
        case 147:
            layer.fill(150,0,0,fade)
            layer.arc(0,0,8,8,0,180)
            layer.triangle(-4,0,-3,-4,-2,0)
            layer.triangle(4,0,3,-4,2,0)
            layer.triangle(-2,0,2,0,0,-6)
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.ellipse(-8,0,3,3)
        break
        case 148:
            layer.fill(0,fade)
            layer.ellipse(0,0,9,9)
            for(let a=0,la=10;a<la;a++){
                layer.rotate(36)
                layer.triangle(-0.5,-4,0.5,-4,0,-6)
            }
            layer.noFill()
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(1)
            layer.ellipse(0,0,12,12)
            layer.line(-3*sqrt(2),3*sqrt(2),3*sqrt(2),-3*sqrt(2))
        break
        case 149:
            layer.fill(0,fade)
            layer.ellipse(0,0,9,9)
            for(let a=0,la=10;a<la;a++){
                layer.rotate(36)
                layer.triangle(-0.5,-4,0.5,-4,0,-6)
            }
            layer.noFill()
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(1)
            layer.ellipse(0,0,12,12)
            layer.line(-3*sqrt(2),3*sqrt(2),3*sqrt(2),-3*sqrt(2))
            layer.noStroke()
            layer.fill(225,fade)
            layer.rect(-2,0,6,2)
            layer.triangle(1,-3,1,3,5,0)
        break
        case 150:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.stroke(255,255,150)
            layer.strokeWeight(1)
            for(let a=0,la=5;a<la;a++){
                layer.rotate(72)
                layer.line(0,0,0,5)
                layer.line(0,5,-2,4)
            }
        break
        case 151:
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
            layer.noStroke()
            layer.fill(200,255,255,fade)
            layer.quad(-5,0,0,-6.25,5,0,0,6.25)
            layer.fill(225,255,255,fade)
            layer.quad(-4,0,0,-5,4,0,0,5)
        break
        case 152:
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
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
        break
        case 153:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.fill(255,100,100,fade)
            layer.rect(0,0,3,12)
            layer.rect(0,0,12,3)
        break
        case 154:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-2,3,2,3)
            layer.triangle(-5,-6,-7,3,-3,3)
            layer.triangle(5,-6,7,3,3,3)
        break
        case 155:
            layer.stroke(255,255,150,fade)
            layer.strokeWeight(1)
            for(let a=0,la=5;a<la;a++){
                layer.rotate(72)
                layer.line(0,0,0,5)
                layer.line(0,5,-2,4)
            }
            layer.noStroke()
            layer.fill(255,255,150,fade)
            layer.triangle(0,6.5,-1,9.5,1,9.5)
        break
        case 156:
            layer.fill(0,fade)
            layer.ellipse(0,0,9,9)
            for(let a=0,la=10;a<la;a++){
                layer.rotate(36)
                layer.triangle(-0.5,-4,0.5,-4,0,-6)
            }
            layer.fill(200,255,255,fade)
            layer.quad(-5,0,0,-6.25,5,0,0,6.25)
            layer.ellipse(-8,0,3,3)
            layer.fill(225,255,255,fade)
            layer.quad(-4,0,0,-5,4,0,0,5)
        break
        case 157:
            layer.stroke(150,175,200,fade)
            layer.strokeWeight(1)
			layer.line(-5,-3,0,-6)
            layer.line(5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(150,175,200,fade)
            layer.noStroke()
            layer.triangle(0,6,-1,9,1,9)
        break
        case 158:
            layer.stroke(150,175,200,fade)
            layer.strokeWeight(1)
			layer.line(-5,-3,0,-6)
            layer.line(5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(150,175,200,fade)
            layer.noStroke()
            layer.triangle(0,6,-1,9,1,9)
            layer.fill(200,fade)
            layer.rect(0,0,6,2)
            layer.rect(0,0,2,6)
        break
        case 159:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,-6,-5,3,-1,3)
            layer.triangle(3,-3,5,1.5,1,1.5)
        break
        case 160:
            layer.fill(150,175,200,fade)
            layer.triangle(-3,-6,-5,3,-1,3)
            layer.triangle(3,-3,5,1.5,1,1.5)
        break
        case 161:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.fill(200,fade)
            layer.rect(-1,-3,2,8)
            layer.rect(-1,-3,8,2)
            layer.fill(255,150,255,fade)
            layer.rect(1,3,2,8)
            layer.rect(1,3,8,2)
        break
        case 162:
            layer.fill(225,fade)
            layer.rect(-3,0,10,10,2)
            layer.fill(40,fade)
            layer.ellipse(-3,0,3,3)
            layer.fill(255,50,50,fade)
            layer.triangle(4,-6,1,3,7,3)
        break
        case 163:
            layer.fill(255,50,50,fade)
            layer.quad(1,-5,-1,-5,-3,3,3,3)
        break
        case 164:
            layer.fill(200,255,255,fade)
            layer.quad(-5,0,0,-6.25,5,0,0,6.25)
            layer.fill(225,255,255,fade)
            layer.quad(-4,0,0,-5,4,0,0,5)
            layer.triangle(0,-7,-1,-9,1,-9)
            layer.triangle(0,-9.5,-1,-11.5,1,-11.5)
        break
        case 165:
            layer.fill(100,0,150,fade)
            layer.ellipse(0,0,9)
            layer.triangle(-2,-4,2,-4,0,-6)
            layer.triangle(-2,4,2,4,0,6)
            layer.fill(150,125,175,fade)
            layer.ellipse(0,0,4.5)
            layer.triangle(-2,-1,-2,1,-3,0)
            layer.triangle(2,-1,2,1,3,0)
        break
        case 166:
            layer.fill(100,fade)
            layer.rect(-4,1,2,6)
            layer.rect(2,-1,10,2)
        break
        case 167:
            layer.fill(0,150,255,fade)
            layer.triangle(-3,6,-5,-3,-1,-3)
            layer.triangle(3,6,5,-3,1,-3)
            layer.rect(0,-4,10,1)
        break
        case 168:
            layer.fill(150,175,200,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.quad(-4.5,0,-3,-1.5,-1.5,0,-3,1.5)
        break
        case 169:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.triangle(-7.5,-1,-7.5,1,-5,0)
            layer.fill(255,100,100,fade)
            layer.rect(0,0,3,12)
            layer.rect(0,0,12,3)
        break
        case 170:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.scale(0.5)
            layer.stroke(0,fade)
            layer.strokeWeight(0.4)
            layer.fill(240,240,220,fade)
            layer.ellipse(0,0,16)
            layer.noStroke()
            layer.fill(220,220,200,fade)
            layer.ellipse(0,0,10)
            layer.fill(255,255,100,fade)
            layer.ellipse(0,0,4)
            layer.triangle(-1,-3,1,-3,0,-7)
            layer.triangle(-1,3,1,3,0,7)
        break
        case 171:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.triangle(-7.5,-1,-7.5,1,-5,0)
            layer.fill(100,255,100,fade)
            layer.rect(0,0,3,12)
            layer.rect(0,0,12,3)
        break
        case 172:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.triangle(-7.5,-1,-7.5,1,-5,0)
            layer.fill(150,175,200,fade)
            layer.rect(0,0,3,12)
            layer.rect(0,0,12,3)
        break
        case 173:
            layer.fill(0,255,125,fade)
            regPoly(layer,-1.5,-1.5,5,4,4,0)
            layer.fill(0,255,255,fade)
            regPoly(layer,0,0,5,4,4,0)
            layer.fill(0,125,255,fade)
            regPoly(layer,1.5,1.5,5,4,4,0)
        break
        case 174:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.fill(150,175,200,fade)
            layer.rect(0,0,3,12)
            layer.rect(0,0,12,3)
            layer.scale(0.5)
            layer.stroke(0,fade)
            layer.strokeWeight(0.4)
            layer.fill(240,240,220,fade)
            layer.ellipse(0,0,16)
            layer.noStroke()
            layer.fill(220,220,200,fade)
            layer.ellipse(0,0,10)
            layer.fill(255,255,100,fade)
            layer.ellipse(0,0,4)
            layer.triangle(-1,-3,1,-3,0,-7)
            layer.triangle(-1,3,1,3,0,7)
        break
        case 175:
            layer.fill(255,50,50,fade)
            layer.triangle(2,6,4,-3,0,-3)
            layer.quad(-4.5,0,3,-1.5,1.5,0,-3,-1.5)
        break
        case 176:
            layer.fill(200,0,0,fade)
            layer.triangle(2,6,4,-3,0,-3)
            layer.quad(-4.5,0,3,-1.5,1.5,0,-3,-1.5)
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.ellipse(-8,0,3,3)
        break
        case 177:
            layer.fill(150,0,0,fade)
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(lsin(360*a/la)*(6-a%2*3),lcos(360*a/la)*(6-a%2*3))
            }
            layer.endShape()
            layer.fill(80,100,120,fade)
            layer.rect(-1,0,6,4)
            layer.arc(2,0,4,4,-90,90)
        break
        case 178:
            layer.stroke(100,0,150,fade)
            layer.strokeWeight(1.5)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.line(0,0,0,6)
                layer.line(0,3,3,5)
            }
        break
        case 179:
            layer.fill(255,50,50,fade)
            layer.triangle(-0.25,-4,-5.25,0,-0.25,4)
            layer.triangle(0.25,-4,5.25,0,0.25,4)
        break
        case 180:
            layer.fill(255,50,50,fade)
            layer.rect(0,0,1,8)
            layer.triangle(-1,-4,-6,0,-1,4)
            layer.triangle(1,-4,6,0,1,4)
        break
        case 181:
            layer.fill(255,50,50,fade)
            layer.rect(-0.75,0,1,8)
            layer.rect(0.75,0,1,8)
            layer.triangle(-1.75,-4,-6.75,0,-1.75,4)
            layer.triangle(1.75,-4,6.75,0,1.75,4)
        break
        case 182:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(0,150,255,fade)
            layer.rect(-7,0,1,3)
            layer.rect(-5.5,0,1,3)
            layer.rect(-1.5,0,6,3)
            layer.triangle(1.5,-4.5,1.5,4.5,7.5,0)
        break
        case 183:
            layer.fill(150,0,0,fade)
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(lsin(360*a/la)*(6-a%2*3),lcos(360*a/la)*(6-a%2*3))
            }
            layer.endShape()
            layer.fill(150,175,200,fade)
            layer.triangle(0,-6,-3,3,3,3)
        break
        case 184:
            layer.fill(150,0,0,fade)
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(lsin(360*a/la)*(6-a%2*3),lcos(360*a/la)*(6-a%2*3))
            }
            layer.endShape()
            layer.fill(150,175,200,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.rect(-3,0,3,3)
        break
        case 185:
            layer.fill(150,175,200,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.quad(-4.5,0,-3,-1.5,-1.5,0,-3,1.5)
            layer.rect(3,0,3,3)
        break
        case 186:
            layer.fill(255,50,50,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.quad(-4.5,0,-3,-1.5,-1.5,0,-3,1.5)
        break
        case 187:
            layer.fill(150,175,200,fade)
            layer.triangle(2,6,4,-3,0,-3)
            layer.quad(-4.5,0,-3,-1.5,-1.5,0,-3,1.5)
        break
        case 188:
            layer.fill(255,225,75,fade)
            layer.triangle(-2,4,2,4,0,-8)
            layer.rect(0,6,3,3)
        break
        case 189:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.fill(240,0,0,fade)
            layer.noStroke()
            layer.rect(0,1,2,6)
            layer.rect(0,-3,6,2)
        break
        case 190:
            layer.stroke(255,255,100,fade)
            layer.strokeWeight(2)
            layer.line(-2,-6,-2,6)
            layer.arc(-2,-3,8,6,-90,90)
            layer.line(-2,0,2,6)
        break
        case 191:
            layer.fill(255,255,50,fade)
            layer.beginShape()
            layer.vertex(0.5,-10)
            layer.vertex(-4,1.5)
            layer.vertex(0.5,1.5)
            layer.vertex(-0.5,10)
            layer.vertex(4,-1.5)
            layer.vertex(-0.5,-1.5)
            layer.endShape()
        break
        case 192:
            layer.fill(255,255,50,fade)
            layer.triangle(-4,-2,-4,2,8,0)
            layer.fill(255,200,255,fade)
            layer.quad(-1,-7.5,0,-5,0,5,-1,5)
            layer.fill(255,150,255,fade)
            layer.quad(1,-2.5,0,-5,0,5,1,5)
            layer.fill(255,255,255,fade)
            layer.rect(0,6,5,2)
            layer.rect(0,8,3,2)
        break
        case 193:
            layer.stroke(200,0,0,fade)
            layer.strokeWeight(1.5)
            layer.ellipse(0,0,10,10)
            layer.stroke(255,255,100)
            layer.line(5,-5,-5,5)
            layer.line(2,-6,-6,2)
            layer.line(6,-2,-2,6)
        break
        case 194:
            layer.fill(240,fade)
            layer.triangle(0,-2,-6,2,6,2)
            layer.triangle(1,2,-1,2,0,4)
            layer.triangle(-5,2,-3,2,-4,-4)
            layer.triangle(5,2,3,2,4,-4)
        break
        case 195:
            layer.fill(255,50,50,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.rect(-3,0,1,3)
            layer.rect(-3,0,3,1)
        break
        case 196:
            layer.stroke(150,0,0,fade)
            layer.strokeWeight(1)
            layer.arc(0,0,10,10,-90,225)
            layer.fill(150,0,0,fade)
            layer.noStroke()
            layer.triangle(0,-3.5,0,-6.5,-1.5,-5)
        break
        case 197:
            layer.stroke(255,100,255,fade)
            layer.strokeWeight(2)
            layer.arc(0,0,10,10,0,315)
            layer.ellipse(0,0,4,4)
            layer.line(2,0,5,0)
        break
        case 198:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,6,-5,-3,-1,-3)
            layer.triangle(3,6,5,-3,1,-3)
            layer.rect(0,-4,10,1)
        break
        case 199:
            layer.fill(150,150,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
            layer.stroke(0,fade)
            layer.strokeWeight(0.6)
            layer.noFill()
            layer.ellipse(0,0,8)
            layer.line(-3,-1,-1,1)
            layer.line(-3,1,-1,-1)
            layer.line(3,-1,1,1)
            layer.line(3,1,1,-1)
        break
        case 200:
            layer.fill(225,fade)
            layer.rect(0,0,10,10,2)
            layer.fill(40,fade)
            layer.ellipse(0,0,3,3)
            layer.fill(100,255,100,fade)
            layer.triangle(-7,-6,-4,3,-10,3)
            layer.triangle(7,-6,4,3,10,3)
        break
        case 201:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,-6,-5,3,-1,3)
            layer.triangle(3,-6,5,3,1,3)
            layer.ellipse(0,-1,2,2)
        break
        case 202:
            layer.fill(240,fade)
            layer.triangle(0,-2,-6,2,6,2)
            layer.triangle(1,2,-1,2,0,4)
            layer.triangle(-5,2,-3,2,-4,-4)
            layer.triangle(5,2,3,2,4,-4)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-1.5,-4.5,1.5)
        break
        case 203:
            layer.fill(255,100,100,fade)
            layer.rect(0,0,3,12)
            layer.rect(0,0,12,3)
            layer.triangle(7,-2,7,2,9,0)
            layer.triangle(-9,-2,-9,2,-7,0)
        break
        case 204:
            layer.fill(0,125,255,fade)
            layer.arc(0,0,8,8,-45,225)
            layer.quad(0,0,sqrt(2)*2,-sqrt(2)*2,0,-sqrt(2)*4,-sqrt(2)*2,-sqrt(2)*2)
        break
        case 205:
            layer.fill(200,0,0,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
        break
        case 206:
            layer.fill(125,255,255,fade)
            layer.rect(0,0,9,9)
            layer.fill(175,255,255,fade)
            layer.rect(0,0,6,6)
            layer.fill(225,255,255,fade)
            layer.rect(0,0,3,3)
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.ellipse(-8,0,3,3)
        break
        case 207:
            layer.fill(150,175,200,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.rect(-3,0,3,3)
            layer.triangle(0,3.5,-1,6.5,1,6.5)
        break
        case 208:
            layer.fill(100,fade)
            layer.rect(0,2,10,6,2)
            layer.noFill()
            layer.stroke(100,fade)
            layer.strokeWeight(2)
            layer.arc(0,-1,6,6,-180,0)
        break
        case 209:
            layer.fill(255,100,100,fade)
            layer.rect(0,-4.5,3,3)
            layer.rect(0,4.5,3,3)
            layer.rect(0,0,12,3)
        break
        case 210:
            layer.fill(255,50,50,fade)
            layer.triangle(-6,0,3,-3,3,3)
            layer.triangle(-3,-2,-3,-4,-2,-3)
            layer.triangle(3,-2,3,-4,2,-3)
            layer.fill(150,fade)
            layer.rect(0,0,2,8)
        break
        case 211:
            layer.fill(125,255,125,fade)
            regPoly(layer,-1.5,-1.5,5,4,4,0)
            layer.fill(255,255,255,fade)
            regPoly(layer,0,0,5,4,4,0)
            layer.fill(255,125,255,fade)
            regPoly(layer,1.5,1.5,5,4,4,0)
        break
        case 212:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,6,-5,-3,-1,-3)
            layer.triangle(3,6,5,-3,1,-3)
            layer.rect(0,-4,10,1)
            layer.triangle(0,-5,1,-7,-1,-7)
        break
        case 213:
            layer.fill(255,50,50,fade)
            layer.triangle(6,0,-3,-3,-3,3)
            layer.stroke(0,fade)
            layer.strokeWeight(0.6)
            layer.noFill()
            layer.ellipse(0,0,8)
            layer.line(-3,-1,-1,1)
            layer.line(-3,1,-1,-1)
            layer.line(3,-1,1,1)
            layer.line(3,1,1,-1)
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(1)
            layer.ellipse(0,0,12,12)
            layer.line(-3*sqrt(2),3*sqrt(2),3*sqrt(2),-3*sqrt(2))
        break
        case 214:
            layer.fill(150,fade)
            layer.rect(0,0,7.5,10,2)
            layer.fill(200,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
            layer.fill(0,100,255,fade)
            layer.ellipse(0,0,3)
        break
        case 215:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,0,-5,3,-1,3)
            layer.triangle(3,0,5,3,1,3)
            layer.triangle(-3,0,-5,-3,-1,-3)
            layer.triangle(3,0,5,-3,1,-3)
        break
        case 216:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,-6,-5,3,-1,3)
            layer.triangle(3,-1.5,5,3,1,3)
            layer.ellipse(3,-3,2,2)
        break
        case 217:
            layer.fill(150,175,200,fade)
            layer.ellipse(0,0,8)
            layer.triangle(-1,-5,1,-5,0,-7)
            layer.triangle(-5,-1,-5,1,-7,0)
            layer.triangle(-1,5,1,5,0,7)
            layer.triangle(5,-1,5,1,7,0)
        break
        case 218:
            layer.fill(225,fade)
            layer.rect(0,0,10,10,2)
            layer.fill(40,fade)
            layer.ellipse(2.5,-2.5,2)
            layer.ellipse(-2.5,2.5,2)
        break
        case 219:
            layer.fill(90,95,100,fade)
            regPoly(layer,0,0,6,5,2.25,0)
            layer.fill(200,0,0,fade)
            layer.ellipse(0,0,3,3)
        break
        case 220:
            layer.stroke(255,100,255,fade)
            layer.strokeWeight(2)
            layer.arc(0,0,10,10,0,315)
            layer.ellipse(0,0,4,4)
            layer.line(2,0,5,0)
            layer.fill(255,100,255,fade)
            layer.noStroke()
            layer.triangle(6.5,-1,6.5,1,8,0)
        break
        case 221:
            layer.fill(255,100,255,fade)
            layer.beginShape()
            layer.vertex(0.5,-10)
            layer.vertex(-4,1.5)
            layer.vertex(0.5,1.5)
            layer.vertex(-0.5,10)
            layer.vertex(4,-1.5)
            layer.vertex(-0.5,-1.5)
            layer.endShape()
        break
        case 222:
            layer.fill(150,0,0,fade)
            layer.arc(0,0,8,8,0,180)
            layer.triangle(-4,0,-3,-4,-2,0)
            layer.triangle(4,0,3,-4,2,0)
            layer.triangle(-2,0,2,0,0,-6)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
        break
        case 223:
            layer.fill(225,fade)
            layer.rect(-3,0,10,10,2)
            layer.fill(40,fade)
            layer.ellipse(-3,0,3,3)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(3,0,4.5,6,1)
        break
        case 224:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.triangle(-7.5,-1,-7.5,1,-5,0)
            layer.fill(100,255,100,fade)
            layer.rect(0,0,3,12)
            layer.rect(0,0,12,3)
            layer.ellipse(9,0,3)
        break
        case 225:
            layer.fill(125,255,255,fade)
            layer.rect(0,0,9,9)
            layer.fill(175,255,255,fade)
            layer.rect(0,0,6,6)
            layer.fill(225,255,255,fade)
            layer.rect(0,0,3,3)
            layer.fill(255,200,255,fade)
            layer.quad(-1,-7.5,0,-5,0,5,-1,5)
            layer.fill(255,150,255,fade)
            layer.quad(1,-2.5,0,-5,0,5,1,5)
            layer.fill(255,255,255,fade)
            layer.rect(0,6,5,2)
            layer.rect(0,8,3,2)
        break
        case 226:
            layer.fill(150,0,0,fade)
            layer.arc(0,0,8,8,0,180)
            layer.triangle(-4,0,-3,-4,-2,0)
            layer.triangle(4,0,3,-4,2,0)
            layer.triangle(-2,0,2,0,0,-6)
            layer.fill(255,200,255,fade)
            layer.quad(-1,-7.5,0,-5,0,5,-1,5)
            layer.fill(255,150,255,fade)
            layer.quad(1,-2.5,0,-5,0,5,1,5)
            layer.fill(255,255,255,fade)
            layer.rect(0,6,5,2)
            layer.rect(0,8,3,2)
        break
        case 227:
            layer.fill(255,255,150,fade)
            layer.triangle(-2,0,0,-4,2,0)
            layer.triangle(-2,1,0,2,2,1)
            layer.ellipse(-3,2,2)
            layer.ellipse(3,2,2)
        break
        case 228:
            layer.fill(150,255,255,fade)
            layer.triangle(0,-3,2,3,-2,3)
            layer.triangle(3,3,1,-3,5,-3)
            layer.triangle(-3,3,-1,-3,-5,-3)
        break
        case 229:
            layer.fill(255,200,255,fade)
            layer.beginShape()
            for(let a=0,la=8;a<la;a++){
                layer.vertex(sin(a/la*360)*(4-a%2*3),cos(a/la*360)*(4-a%2*3))
            }
            layer.endShape()
            layer.fill(255,200,255,fade)
            layer.triangle(-1,4.5,1,4.5,0,6)
        break
        case 230:
            layer.fill(100,fade)
            layer.rect(0,0,2,8)
            layer.quad(-2,-4,-2,-3,-4,-1,-4,-2)
            layer.quad(2,-4,2,-3,4,-1,4,-2)
            layer.rect(-3,2,2,2)
            layer.rect(3,2,2,2)
        break
        case 231:
            layer.fill(255,50,50,fade)
            layer.triangle(-2,-6,-4,3,0,3)
            layer.ellipse(3,-3,4,4)
            layer.ellipse(3,3,4,4)
        break
        case 232:
            layer.fill(80,fade)
            layer.triangle(-5,5,5,5,0,-7.5)
            layer.fill(255,fade)
            layer.triangle(0,-7.5,-1,-5,1,-5)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
        break
        case 233:
            layer.fill(150,255,225,fade)
            layer.stroke(100,255,225,fade)
            layer.strokeWeight(2)
            layer.rect(-2,-2,4,4)
            layer.arc(0,0,8,8,-90,180)
            layer.noStroke()
            layer.fill(255,0,0,fade)
            layer.ellipse(-4,0,5)
            layer.fill(0,255,0,fade)
            layer.ellipse(4,0,5)
        break
        case 234:
            layer.fill(255,50,200,fade)
            layer.arc(0,0,8,8,0,180)
            layer.triangle(-4,0,-5,-4,-2,0)
            layer.triangle(4,0,1,-4,2,0)
            layer.triangle(-2,0,2,0,-3,-6)
        break
        case 235:
            layer.stroke(255,100,200,fade)
            layer.strokeWeight(1)
            for(let a=0,la=12;a<la;a++){
                layer.line(lsin(a*30)*3,lcos(a*30)*3,lsin(a*30)*6,lcos(a*30)*6)
            }
            layer.fill(255,100,200,fade)
            layer.noStroke()
            layer.ellipse(0,8,2)
        break
        case 236:
            layer.fill(255,50,50,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.quad(-4.5,0,-3,-1.5,-1.5,0,-3,1.5)
            layer.rect(-6,-3,1)
            layer.rect(-6,-1.5,1)
            layer.rect(-6,0,1)
            layer.rect(-6,1.5,1)
            layer.rect(-6,3,1)
        break
        case 237:
            layer.fill(200,fade)
            layer.triangle(-2,5,2,5,0,-7)
            layer.fill(50,150,50,fade)
            layer.ellipse(0,0,6)
            layer.fill(150,75,0)
            layer.rect(0,0,2,2)
        break
        case 238:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,-6,-5,3,-1,3)
            layer.triangle(3,-6,5,3,1,3)
            layer.arc(-7.5,1,4,4,-180,0)
        break
        case 239:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,-6,-5,3,-1,3)
            layer.triangle(3,-6,5,3,1,3)
            layer.rect(-6,-3,1)
            layer.rect(-6,-1.5,1)
            layer.rect(-6,0,1)
            layer.rect(-6,1.5,1)
            layer.rect(-6,3,1)
        break
        case 240:
            layer.fill(25,fade)
            layer.ellipse(0,0,10)
            layer.fill(250,fade)
            layer.ellipse(-3,-1,2)
            layer.ellipse(1,-1,2)
        break
        case 241:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-2,3,2,3)
            layer.triangle(-3,-2,-3,2,-7.5,0)
            layer.triangle(3,-2,3,2,7.5,0)
        break
        case 242:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,-6,-5,3,-1,3)
            layer.triangle(3,-6,5,3,1,3)
            layer.rect(0,4,10,1)
            layer.arc(-5.5,-2,3,3,90,270)
            layer.arc(-5.5,2,3,3,90,270)
        break
        case 243:
            layer.stroke(150,0,0,fade)
            layer.strokeWeight(0.5)
            layer.beginShape()
            for(let a=0,la=7;a<la;a++){
                layer.vertex(lsin(180*a/(la-1))*(5-a%2*2.5),lcos(180*a/(la-1))*(5-a%2*2.5))
            }
            layer.vertex(0,0)
            layer.endShape(CLOSE)
            layer.stroke(100,fade)
            layer.strokeWeight(0.5)
            layer.beginShape()
            for(let a=0,la=10;a<la;a++){
                layer.vertex(lsin(-144+180*a/(la-1))*(5-a%2*2.5),lcos(-144+180*a/(la-1))*(5-a%2*2.5))
            }
            layer.vertex(0,0)
            layer.endShape(CLOSE)
        break
        case 244:
            layer.fill(255,50,50,fade)
            layer.triangle(-0.25,-4,-5.25,0,-0.25,4)
            layer.triangle(0.25,-4,5.25,0,0.25,4)
            layer.quad(0,-4.5,-1.5,-6,0,-7.5,1.5,-6)
        break
        case 245:
            layer.fill(255,50,50,fade)
            layer.rect(0,0,1,8)
            layer.triangle(-1,-4,-6,0,-1,4)
            layer.triangle(1,-4,6,0,1,4)
            layer.quad(0,-4.5,-1.5,-6,0,-7.5,1.5,-6)
        break
        case 246:
            layer.fill(255,50,50,fade)
            layer.rect(-0.75,0,1,8)
            layer.rect(0.75,0,1,8)
            layer.triangle(-1.75,-4,-6.75,0,-1.75,4)
            layer.triangle(1.75,-4,6.75,0,1.75,4)
            layer.quad(0,-4.5,-1.5,-6,0,-7.5,1.5,-6)
        break
        case 247:
            layer.fill(255,255,150,fade)
            layer.beginShape()
            layer.vertex(0.5,-6)
            layer.vertex(-3,1)
            layer.vertex(0.5,1)
            layer.vertex(-0.5,6)
            layer.vertex(3,-1)
            layer.vertex(-0.5,-1)
            layer.endShape()
        break
        case 248:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,0,-5,3,-1,3)
            layer.triangle(3,0,5,3,1,3)
            layer.triangle(-3,0,-5,-3,-1,-3)
            layer.triangle(3,0,5,-3,1,-3)
            layer.ellipse(0,0,2)
        break
        case 249:
            layer.fill(125,255,255,fade)
            layer.rect(0,0,9,9)
            layer.fill(175,255,255,fade)
            layer.rect(0,0,6,6)
            layer.fill(225,255,255,fade)
            layer.rect(0,0,3,3)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
        break
        case 250:
            layer.fill(255,50,50,fade)
            layer.triangle(-2,-6,-4,3,0,3)
            layer.ellipse(3,-3,4,4)
            layer.triangle(3,0,5,5,1,5)
        break
        case 251:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(-3.5,0,4.5,6,1)
            layer.rect(3.5,0,4.5,6,1)
            layer.noStroke()
            layer.fill(40,fade)
            layer.ellipse(3.5,-1,1.2)
            layer.ellipse(3.5,1,1.2)
            layer.noFill()
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(0.5)
            layer.ellipse(-3.5,0,8)
            layer.line(-3.5-2*sqrt(2),2*sqrt(2),-3.5+2*sqrt(2),-2*sqrt(2))
        break
        case 252:
            layer.fill(225,fade)
            layer.rect(-3,0,10,10,2)
            layer.fill(40,fade)
            layer.ellipse(-6,0,2)
            layer.ellipse(-6,-3,2)
            layer.ellipse(-6,3,2)
            layer.ellipse(0,0,2)
            layer.ellipse(0,-3,2)
            layer.ellipse(0,3,2)
            layer.fill(80,fade)
            layer.triangle(4,-6,1,3,7,3)
        break
        case 253:
            layer.fill(225,fade)
            layer.rect(-3,0,10,10,2)
            layer.fill(40,fade)
            layer.ellipse(-3,0,3,3)
            layer.fill(150,175,200,fade)
            layer.triangle(4,-6,1,3,7,3)
        break
        case 254:
            layer.fill(225,fade)
            layer.rect(-3,0,10,10,2)
            layer.fill(40,fade)
            layer.ellipse(-3,0,3,3)
            layer.fill(200,255,255,fade)
            layer.quad(-1,0,4,-6.25,9,0,4,6.25)
            layer.fill(225,255,255,fade)
            layer.quad(0,0,4,-5,8,0,4,5)
        break
        case 255:
            layer.fill(225,fade)
            layer.rect(-3,0,10,10,2)
            layer.fill(40,fade)
            layer.ellipse(-6,0,2)
            layer.ellipse(-6,-3,2)
            layer.ellipse(-6,3,2)
            layer.ellipse(0,0,2)
            layer.ellipse(0,-3,2)
            layer.ellipse(0,3,2)
            layer.fill(255,50,50,fade)
            layer.triangle(4,-6,1,3,7,3)
        break
        case 256:
            layer.fill(225,fade)
            layer.rect(-3,0,10,10,2)
            layer.fill(40,fade)
            layer.ellipse(-6,0,2)
            layer.ellipse(-6,-3,2)
            layer.ellipse(-6,3,2)
            layer.ellipse(0,0,2)
            layer.ellipse(0,-3,2)
            layer.ellipse(0,3,2)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(3,0,4.5,6,1)
        break
        case 257:
            layer.fill(225,fade)
            layer.rect(-3,0,10,10,2)
            layer.fill(40,fade)
            layer.ellipse(-6,0,2)
            layer.ellipse(-6,-3,2)
            layer.ellipse(-6,3,2)
            layer.ellipse(0,0,2)
            layer.ellipse(0,-3,2)
            layer.ellipse(0,3,2)
            layer.fill(150,175,200,fade)
            layer.triangle(4,-6,1,3,7,3)
        break
        case 258:
            layer.fill(225,fade)
            layer.rect(-3,0,10,10,2)
            layer.fill(40,fade)
            layer.ellipse(-6,0,2)
            layer.ellipse(-6,-3,2)
            layer.ellipse(-6,3,2)
            layer.ellipse(0,0,2)
            layer.ellipse(0,-3,2)
            layer.ellipse(0,3,2)
            layer.fill(200,255,255,fade)
            layer.quad(-1,0,4,-6.25,9,0,4,6.25)
            layer.fill(225,255,255,fade)
            layer.quad(0,0,4,-5,8,0,4,5)
        break
        case 259:
            layer.fill(0,150,255,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.triangle(0,-3.5,-1,-6.5,1,-6.5)
        break
        case 260:
            layer.fill(100,fade)
            layer.rect(-3.5,0,6,11)
            layer.rect(3.5,0,6,11)
            layer.fill(200,fade)
            layer.rect(-3.5,-2,4,1)
            layer.rect(-3.5,2,4,1)
            layer.rect(3.5,-4,4,1)
            layer.rect(3.5,2,4,1)
            layer.rect(3.5,4,4,1)
        break
        case 261:
            layer.fill(255,225,0,fade)
            layer.rect(0,0,12,12,2)
            layer.fill(225,fade)
            layer.rect(0,0,10,10,2)
            layer.fill(40,fade)
            layer.ellipse(-3,0,2)
            layer.ellipse(-3,-3,2)
            layer.ellipse(-3,3,2)
            layer.ellipse(3,0,2)
            layer.ellipse(3,-3,2)
            layer.ellipse(3,3,2)
        break
        case 262:
            layer.fill(225,fade)
            layer.rect(0,0,10,10,2)
            layer.fill(40,fade)
            layer.ellipse(0,0,3,3)
            layer.fill(100,255,100,fade)
            layer.triangle(-7,-6,-4,3,-10,3)
            layer.triangle(7,-6,4,3,10,3)
            layer.triangle(0,5.5,-1.5,8,1.5,8)
        break
        case 263:
            layer.fill(225,fade)
            layer.rect(0,0,10,10,2)
            layer.fill(40,fade)
            layer.ellipse(0,0,3,3)
            layer.fill(100,255,255,fade)
            layer.triangle(-6,-6,-4,3,-8,3)
            layer.triangle(6,-6,4,3,8,3)
            layer.triangle(8.5,2,8.5,-2,12,0)
        break
        case 264:
            layer.fill(255,50,50,fade)
            layer.triangle(-2,6,-4,-3,0,-3)
            layer.ellipse(3,0,4,4)
        break
        case 265:
            layer.fill(255,50,50,fade)
            layer.triangle(2,6,4,-3,0,-3)
            layer.triangle(2,-3.5,1,-6.5,3,-6.5)
            layer.rect(-3,-2,3,3)
            layer.quad(-4.5,2,-3,0.5,-1.5,2,-3,3.5)
        break
        case 266:
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.quad(-9,0,-8,-2,-7,0,-8,2)
            layer.triangle(-8,-2,-9,-3,-7,-3)
            layer.triangle(-8,2,-9,3,-7,3)
        break
        case 267:
            layer.fill(255,225,75,fade)
            layer.triangle(-1,-2.5,1,-2.5,0,-8)
            layer.quad(-2,4,2,4,1,-1.5,-1,-1.5)
        break
        case 268:
            layer.fill(150,175,200,fade)
            layer.triangle(-0.25,-4,-5.25,0,-0.25,4)
            layer.triangle(0.25,-4,5.25,0,0.25,4)
        break
        case 269:
            layer.fill(150,175,200,fade)
            layer.rect(0,0,1,8)
            layer.triangle(-1,-4,-6,0,-1,4)
            layer.triangle(1,-4,6,0,1,4)
        break
        case 270:
            layer.fill(255,50,50,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.triangle(2,3.5,1,6.5,3,6.5)
            layer.rect(-3,2,3,3)
            layer.quad(-4.5,-2,-3,-0.5,-1.5,-2,-3,-3.5)
        break
        case 271:
            layer.fill(255,50,50,fade)
            layer.triangle(2,6,4,-3,0,-3)
            layer.quad(-4.5,-2,-3,-0.5,-1.5,-2,-3,-3.5)
        break
        case 272:
            layer.fill(150,0,0,fade)
            layer.triangle(7,-3,-3.5,-5,-3.5,-1)
            layer.triangle(7,3,-3.5,1,-3.5,5)
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.ellipse(-8,0,3,3)
        break
        case 273:
            layer.fill(150,175,200,fade)
            layer.triangle(-3,0,-5,3,-1,3)
            layer.triangle(3,0,5,3,1,3)
            layer.triangle(-3,0,-5,-3,-1,-3)
            layer.triangle(3,0,5,-3,1,-3)
        break
        case 274:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,-0.5,4.5,6,1)
            layer.noStroke()
            layer.triangle(-2,4,2,4,0,7)
        break
        case 275:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.rect(6.5,-2.5,1,3)
            layer.rect(6.5,2.5,1,3)
            layer.fill(255,200,255,fade)
            layer.quad(-1,-7.5,0,-5,0,5,-1,5)
            layer.fill(255,150,255,fade)
            layer.quad(1,-2.5,0,-5,0,5,1,5)
            layer.fill(255,255,255,fade)
            layer.rect(0,6,5,2)
            layer.rect(0,8,3,2)
        break
        case 276:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(255,100,100,fade)
            layer.rect(0,0,3,12)
            layer.rect(0,0,12,3)
        break
        case 277:
            layer.fill(175,175,255,fade)
            layer.quad(-8,0,0,-2,8,0,0,2)
            layer.quad(-2,0,0,-8,2,0,0,8)
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
        break
        case 278:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-6.5,0,3,3)
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
        break
        case 279:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,-0.5,4.5,6,1)
            layer.noStroke()
            layer.fill(200,255,255,fade)
            layer.quad(-1.5,-2,-2.5,0,-1.5,2,-0.5,0)
            layer.quad(1.5,-2,2.5,0,1.5,2,0.5,0)
        break
        case 280:
            layer.fill(255,100,100,fade)
            layer.rect(0,0,2.5,10)
            layer.rect(0,0,10,2.5)
            layer.fill(255,50,50,fade)
            regStar(layer,0,0,3,8,8,2,2,0)
        break
        case 281:
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
            layer.fill(150,175,200,fade)
			regPoly(layer,0,0,6,4,4,0)
        break
        case 282:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.triangle(0,3.5,-1,6,1,6)
            layer.triangle(0,6.5,-1,9,1,9)
        break
        case 283:
            layer.fill(150,175,200,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.triangle(0,3.5,-1,6,1,6)
            layer.triangle(0,6.5,-1,9,1,9)
        break
        case 284:
            layer.fill(180,180,240,fade)
            layer.arc(0,0,8,8,-45,225)
            layer.quad(0,0,sqrt(2)*2,-sqrt(2)*2,0,-sqrt(2)*4,-sqrt(2)*2,-sqrt(2)*2)
            layer.quad(-6,0,0,-1,6,0,0,1)
            layer.triangle(-1,0,1,0,0,6)
        break
        case 285:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.arc(-5,-0.5,3,3,-180,0)
            layer.arc(-5,0.5,3,3,0,180)
        break
        case 286:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,-6,-5,3,-1,3)
            layer.triangle(3,-6,5,3,1,3)
            layer.triangle(0,3.5,1,5.5,-1,5.5)
        break
        case 287:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.triangle(0,3.5,-1,5.5,1,5.5)
            layer.triangle(0,6,-1,8,1,8)
            layer.triangle(0,8.5,-1,10.5,1,10.5)
        break
        case 288:
            layer.fill(75,150,75,fade)
            layer.rect(0,2,4,6)
            layer.triangle(-4,-1,4,-1,0,-7)
            layer.noStroke()
            layer.fill(200,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
        break
        case 289:
            layer.strokeWeight(1)
            layer.stroke(50,200,50,fade)
            layer.line(-5,3,5,-3)
            layer.stroke(200,50,50,fade)
            layer.line(-5,0,5,3)
            layer.stroke(50,50,200,fade)
            layer.line(-5,-3,5,0)
        break
        case 290:
            layer.fill(255,50,50,fade)
            layer.quad(0,0,-2,-2,0,-8,2,-2)
            layer.fill(150,175,200,fade)
            layer.quad(0,0,-3,3,0,6,3,3)
        break
        case 291:
            layer.fill(255,50,50,fade)
            layer.triangle(-2,-6,-4,3,0,3)
            layer.ellipse(3,0,4,4)
            layer.stroke(200,255,255,fade)
            layer.strokeWeight(1.5)
            layer.noFill()
            layer.ellipse(0,0,8)
        break
        case 292:
            layer.fill(255,50,50,fade)
            layer.triangle(-2,-6,-4,0,0,0)
            layer.triangle(2,6,4,0,0,0)
            layer.fill(150,175,200,fade)
            layer.triangle(-2,6,-4,0,0,0)
            layer.triangle(2,-6,4,0,0,0)
        break
        case 293:
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(1)
            regStar(layer,0,0,8,5,5,3,3,0,0)
            layer.noFill()
            layer.stroke(255,255,200,fade)
            layer.strokeWeight(1)
            regStar(layer,0,0,4,10,10,4,4,0)
        break
        case 294:
            layer.fill(255,100,255,fade)
            layer.rect(0,0,3,12)
            layer.rect(0,0,12,3)
        break
        case 295:
            layer.stroke(200,255,255,fade)
            layer.strokeWeight(2)
            layer.arc(0,0,10,10,-90,240)
            layer.line(0,-5,0,-3)
        break
        case 296:
            layer.fill(225,fade)
            layer.rect(0,0,10,10,2)
            layer.fill(40,fade)
            layer.ellipse(0,0,3,3)
            layer.fill(100,255,100,fade)
            layer.triangle(-7,6,-4,-3,-10,-3)
            layer.triangle(7,6,4,-3,10,-3)
        break
        case 297:
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,2.4,2.4,0)
            layer.scale(0.5)
            layer.stroke(0,fade)
            layer.strokeWeight(0.4)
            layer.fill(240,240,220,fade)
            layer.ellipse(0,0,16)
            layer.noStroke()
            layer.fill(220,220,200,fade)
            layer.ellipse(0,0,10)
            layer.fill(255,255,100,fade)
            layer.ellipse(0,0,4)
            layer.triangle(-1,-3,1,-3,0,-7)
            layer.triangle(-1,3,1,3,0,7)
        break
        case 298:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.fill(200,255,255,fade)
            layer.noStroke()
            layer.triangle(-2,-2,2,-2,0,3)
        break
        case 299:
            layer.fill(225,fade)
            layer.rect(0,0,10,10,2)
            layer.fill(40,fade)
            layer.ellipse(-3,0,2)
            layer.ellipse(-3,-3,2)
            layer.ellipse(-3,3,2)
            layer.ellipse(3,0,2)
            layer.ellipse(3,-3,2)
            layer.ellipse(3,3,2)
            layer.fill(100,255,255,fade)
            layer.triangle(-6,-6,-4,3,-8,3)
            layer.triangle(6,-6,4,3,8,3)
            layer.triangle(8.5,2,8.5,-2,12,0)
        break
        case 300:
            layer.fill(255,125,0,fade)
            layer.rect(-1.5,-1.5,7,7)
            layer.triangle(-5.5,0,-5.5,-3,-8,-1.5)
            layer.fill(255,255,0,fade)
            layer.rect(0,0,7,7)
            layer.fill(125,255,0,fade)
            layer.rect(1.5,1.5,7,7)
            layer.triangle(5.5,0,5.5,3,8,1.5)
        break
        case 301:
            layer.fill(255,50,50,fade)
            layer.quad(-2.5,-5,-3.5,-5,-5,3,-1,3)
            layer.quad(2.5,-5,3.5,-5,5,3,1,3)
            layer.ellipse(0,-4,2.5)
        break
        case 302:
            layer.fill(200,0,0,fade)
            layer.arc(0,0,8,8,-45,225)
            layer.quad(0,0,sqrt(2)*2,-sqrt(2)*2,0,-sqrt(2)*4,-sqrt(2)*2,-sqrt(2)*2)
            layer.triangle(0,5,-1,7,1,7)
        break
        case 303:
            layer.fill(200,0,0,fade)
            layer.arc(0,0,8,8,-45,225)
            layer.quad(0,0,sqrt(2)*2,-sqrt(2)*2,0,-sqrt(2)*4,-sqrt(2)*2,-sqrt(2)*2)
            layer.triangle(0,5,-1,7,1,7)
            layer.triangle(0,7.5,-1,9.5,1,9.5)
        break
        case 304:
            layer.fill(225,fade)
            layer.ellipse(0,2,5,5)
            layer.ellipse(sin(120)*2,cos(120)*2,5,5)
            layer.ellipse(-sin(120)*2,cos(120)*2,5,5)
            layer.fill(255,200,255,fade)
            layer.quad(-1,-7.5,0,-5,0,5,-1,5)
            layer.fill(255,150,255,fade)
            layer.quad(1,-2.5,0,-5,0,5,1,5)
            layer.fill(255,255,255,fade)
            layer.rect(0,6,5,2)
            layer.rect(0,8,3,2)
        break
        case 305:
            layer.stroke(150,200,255,fade)
            layer.strokeWeight(1)
            layer.bezier(-5,0,-3,-3.5,3,-3.5,5,0)
            layer.bezier(-5,0,-3,3.5,3,3.5,5,0)
            layer.strokeWeight(3)
            layer.point(0,0)
        break
        case 306:
            layer.fill(200,150,100,fade)
            layer.rect(0,0,6,8)
            layer.beginShape()
            layer.vertex(-3,-3)
            layer.bezierVertex(-3,-4,-2,-5,-1,-5)
            layer.vertex(5,-5)
            layer.bezierVertex(4,-5,3,-4,3,-3)
            layer.endShape()
            layer.beginShape()
            layer.vertex(3,3)
            layer.bezierVertex(3,4,2,5,1,5)
            layer.vertex(-5,5)
            layer.bezierVertex(-4,5,-3,4,-3,3)
            layer.endShape()
        break
        case 307:
            layer.fill(150,200,100,fade)
            layer.stroke(125,175,75,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.fill(200,255,150)
            layer.ellipse(0,0,4)
            layer.quad(0.6,-0.6,-3.6,-3.6,-0.6,0.6,3.6,3.6)
        break
        case 308:
            layer.fill(100,150,200,fade)
            layer.stroke(75,125,175,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.fill(150,200,255)
            layer.ellipse(0,0,4)
            layer.quad(0.6,-0.6,-3.6,-3.6,-0.6,0.6,3.6,3.6)
        break
        case 309:
            layer.fill(200,150,100,fade)
            layer.rect(0,0,6,8)
            layer.beginShape()
            layer.vertex(-3,-3)
            layer.bezierVertex(-3,-4,-2,-5,-1,-5)
            layer.vertex(5,-5)
            layer.bezierVertex(4,-5,3,-4,3,-3)
            layer.endShape()
            layer.beginShape()
            layer.vertex(3,3)
            layer.bezierVertex(3,4,2,5,1,5)
            layer.vertex(-5,5)
            layer.bezierVertex(-4,5,-3,4,-3,3)
            layer.endShape()
            layer.fill(255,225,200,fade)
            layer.triangle(-0.5,-0.5,-5,-0.5,-0.5,-5)
            layer.triangle(0.5,-0.5,5,-0.5,0.5,-5)
            layer.triangle(-0.5,0.5,-5,0.5,-0.5,5)
            layer.triangle(0.5,0.5,5,0.5,0.5,5)
        break
        case 310:
            layer.fill(200,150,100,fade)
            layer.rect(0,0,6,8)
            layer.beginShape()
            layer.vertex(-3,-3)
            layer.bezierVertex(-3,-4,-2,-5,-1,-5)
            layer.vertex(5,-5)
            layer.bezierVertex(4,-5,3,-4,3,-3)
            layer.endShape()
            layer.beginShape()
            layer.vertex(3,3)
            layer.bezierVertex(3,4,2,5,1,5)
            layer.vertex(-5,5)
            layer.bezierVertex(-4,5,-3,4,-3,3)
            layer.endShape()
            layer.fill(225,fade)
            layer.rect(-2,0,6,2)
            layer.triangle(1,-3,1,3,5,0)
        break
        case 311:
            layer.fill(200,150,100,fade)
            layer.rect(0,0,6,8)
            layer.beginShape()
            layer.vertex(-3,-3)
            layer.bezierVertex(-3,-4,-2,-5,-1,-5)
            layer.vertex(5,-5)
            layer.bezierVertex(4,-5,3,-4,3,-3)
            layer.endShape()
            layer.beginShape()
            layer.vertex(3,3)
            layer.bezierVertex(3,4,2,5,1,5)
            layer.vertex(-5,5)
            layer.bezierVertex(-4,5,-3,4,-3,3)
            layer.endShape()
            layer.fill(80,fade)
            layer.triangle(-2,-1.5,-2,1.5,4,0)
        break
        case 312:
            layer.stroke(150,255,100,fade)
            layer.strokeWeight(1)
            layer.bezier(-5,0,-3,-3.5,3,-3.5,5,0)
            layer.bezier(-5,0,-3,3.5,3,3.5,5,0)
            layer.strokeWeight(3)
            layer.point(0,0)
            layer.noStroke()
            layer.fill(255,50,50,fade)
            layer.triangle(-8,-2,-8,2,-5,0)
            layer.fill(150,175,200,fade)
            layer.triangle(6,-2,6,2,9,0)
        break
        case 313:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.fill(200,255,100,fade)
            layer.ellipse(0,0,2)
            layer.ellipse(0,-3,2)
            layer.ellipse(0,3,2)
        break
        case 314:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.fill(200,255,100,fade)
            layer.ellipse(0,-1.5,2)
            layer.ellipse(0,1.5,2)
        break
        case 315:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(200,255,100,fade)
            layer.triangle(-0.5,4,-0.5,-4,-4,-4)
            layer.triangle(0.5,-4,0.5,4,4,4)
        break
        case 316:
            layer.fill(200,255,100,fade)
            layer.triangle(-0.5,4,-0.5,-4,-4,-4)
            layer.triangle(0.5,-4,0.5,4,4,4)
            layer.fill(80,fade)
            layer.triangle(-2,-1.5,-2,1.5,4,0)
        break
        case 317:
            layer.fill(200,255,100,fade)
            layer.triangle(-0.5,4,-0.5,-4,-4,-4)
            layer.triangle(0.5,-4,0.5,4,4,4)
            layer.fill(200,255,255,fade)
            layer.quad(-6,0,0,-7.5,6,0,0,7.5)
        break
        case 318:
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
            layer.fill(255,255,50,fade)
            layer.beginShape()
            layer.vertex(0.5,-10)
            layer.vertex(-4,1.5)
            layer.vertex(0.5,1.5)
            layer.vertex(-0.5,10)
            layer.vertex(4,-1.5)
            layer.vertex(-0.5,-1.5)
            layer.endShape()
            layer.rect(-6,0,3,3)
        break
        case 319:
            layer.stroke(150,0,0,fade)
            layer.strokeWeight(0.5)
            layer.beginShape()
            for(let a=0,la=5;a<la;a++){
                layer.vertex(lsin(90*a/(la-1))*(5-a%2*2.5),lcos(90*a/(la-1))*(5-a%2*2.5))
            }
            layer.vertex(0,0)
            layer.endShape(CLOSE)
            layer.stroke(100,fade)
            layer.strokeWeight(0.5)
            layer.beginShape()
            for(let a=0,la=13;a<la;a++){
                layer.vertex(lsin(90+270*a/(la-1))*(5-a%2*2.5),lcos(90+270*a/(la-1))*(5-a%2*2.5))
            }
            layer.vertex(0,0)
            layer.endShape(CLOSE)
        break
        case 320:
            layer.fill(255,50,50,fade)
            layer.quad(-2.5,-5,-3.5,-5,-5,3,-1,3)
            layer.quad(2.5,-5,3.5,-5,5,3,1,3)
            layer.fill(255,255,100)
            layer.quad(-0.5,-4,0,-6,0.5,-4,0,-2)
            layer.quad(-2,-4,0,-4.5,2,-4,0,-3.5)
        break
        case 321:
            layer.fill(0,150,255,fade)
            layer.rect(-6,-1,2,4)
            layer.rect(-3,-1,2,4)
            layer.rect(0,-1,2,4)
            layer.rect(3,-1,2,4)
            layer.rect(6,-1,2,4)
            layer.triangle(0,1.5,2,4,-2,4)
            layer.rect(0,5,4,1)
        break
        case 322:
            layer.stroke(60,fade)
            layer.strokeWeight(0.5)
            layer.rect(-2,-2,3,3)
            layer.rect(2,-2,3,3)
            layer.rect(-2,2,3,3)
            layer.rect(2,2,3,3)
            layer.rect(0,0,9,9)
            layer.noStroke()
            layer.fill(200,255,255,fade)
            layer.quad(-5,0,0,-6.25,5,0,0,6.25)
            layer.fill(225,255,255,fade)
            layer.quad(-4,0,0,-5,4,0,0,5)
        break
        case 323:
            layer.stroke(60,fade)
            layer.strokeWeight(0.5)
            layer.rect(-2,-2,3,3)
            layer.rect(2,-2,3,3)
            layer.rect(-2,2,3,3)
            layer.rect(2,2,3,3)
            layer.rect(0,0,9,9)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
        break
        case 324:
            layer.fill(0,150,255,fade)
            for(let a=0,la=10;a<la;a++){
                layer.rect(-6.75+a*1.5,-1,1,4)
            }
            layer.triangle(0,1.5,2,5,-2,5)
        break
        case 325:
            layer.fill(0,150,255,fade)
            for(let a=0,la=10;a<la;a++){
                layer.rect(-6.75+a*1.5,-1,1,4)
            }
            layer.fill(255,50,50,fade)
            layer.triangle(0,5,2,1.5,-2,1.5)
        break
        case 326:
            layer.fill(0,150,255,fade)
            for(let a=0,la=10;a<la;a++){
                layer.rect(-6.75+a*1.5,-2.5,1,2)
            }
            for(let a=0,la=10;a<la;a++){
                layer.rect(-6.75+a*1.5,0,1,2)
            }
            layer.fill(255,50,50,fade)
            layer.triangle(0,5,0,1.5,-2,1.5)
            layer.fill(150,175,200,fade)
            layer.triangle(0,5,0,1.5,2,1.5)
        break
        case 327:
            layer.fill(255,50,50,fade)
            layer.rect(0,0,1,8)
            layer.triangle(-1,-3,-1,-1,-2.5,-2)
            layer.triangle(1,3,1,1,2.5,2)
            layer.triangle(-4.5,-3,-4.5,-1,-3,-2)
            layer.triangle(4.5,3,4.5,1,3,2)
        break
        case 328:
            layer.stroke(60,fade)
            layer.strokeWeight(0.5)
            layer.rect(-2,-2,3,3)
            layer.rect(2,-2,3,3)
            layer.rect(-2,2,3,3)
            layer.rect(2,2,3,3)
            layer.rect(0,0,9,9)
            layer.noStroke()
            layer.fill(180,fade)
            layer.triangle(-2,-1.5,-2,1.5,4,0)
        break
        case 329:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.stroke(240,240,200,fade)
            layer.strokeWeight(0.2)
            layer.rect(0,0,10)
            layer.quad(0,-7,-7,0,0,7,7,0)
        break
        case 330:
            layer.stroke(240,240,200,fade)
            layer.strokeWeight(0.2)
            layer.rect(0,0,10)
            layer.quad(0,-7,-7,0,0,7,7,0)
            layer.noStroke()
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
        break
        case 331:
            layer.fill(255,50,255,fade)
            layer.quad(-3,-6,-1.2,0.6,3,6,1.2,-0.6)
            layer.fill(50,255,50,fade)
            layer.quad(3,-6,1.2,0.6,-3,6,-1.2,-0.6)
            layer.fill(80,fade)
            layer.triangle(-2,-1.5,-2,1.5,4,0)
        break
        case 332:
            layer.fill(255,fade)
            layer.arc(0,0,10,10,-180,0)
            layer.fill(50,225,50,fade)
            layer.arc(0,0,10,10,0,180)
            layer.ellipse(2.5,0,5)
            layer.fill(255,fade)
            layer.ellipse(-2.5,0,5)
            layer.ellipse(2.5,0,1.5)
            layer.fill(50,225,50,fade)
            layer.ellipse(-2.5,0,1.5)
            layer.triangle(5.5,-1,5.5,1,7,0)
        break
        case 333:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.fill(75,fade)
            layer.rect(-5,0,2)
            layer.rect(-8,0,2)
        break
        case 334:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.fill(75,fade)
            layer.rect(-5,0,2)
            layer.rect(-8,0,2)
            layer.rect(-11,0,2)
        break
        case 335:
            layer.stroke(240,240,160,fade)
            layer.strokeWeight(0.5)
            regTriangle(layer,0,0,4,4,0)
            regTriangle(layer,0,-3,2,2,60)
            regTriangle(layer,-1.5*sqrt(3),1.5,2,2,60)
            regTriangle(layer,1.5*sqrt(3),1.5,2,2,60)
        break
        case 336:
            layer.fill(125,255,255,fade)
            layer.rect(0,0,9,9)
            layer.fill(175,255,255,fade)
            layer.rect(0,0,6,6)
            layer.fill(225,255,255,fade)
            layer.rect(0,0,3,3)
            layer.fill(255,50,50,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.rect(-3,0,3,3)
        break
        case 337:
            layer.fill(200,255,255,fade)
            layer.quad(-5,0,0,-6.25,5,0,0,6.25)
            layer.fill(225,255,255,fade)
            layer.quad(-4,0,0,-5,4,0,0,5)
            layer.fill(125,fade)
            layer.stroke(100,fade)  
            layer.strokeWeight(1)
            layer.rect(0,-0.5,4.5,6,1)
            layer.noStroke()
            layer.fill(200,255,255,fade)
            layer.quad(-1.5,-2,-2.5,0,-1.5,2,-0.5,0)
            layer.quad(1.5,-2,2.5,0,1.5,2,0.5,0)
            layer.ellipse(0,0,1)
        break
        case 338:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(-3,-0.5,4.5,6,1)
            layer.rect(3,-0.5,3.75,5,1)
            layer.noStroke()
            layer.fill(200,255,255,fade)
            layer.quad(-1.5,-2,-2.5,0,-1.5,2,-0.5,0)
            layer.quad(1.5,-2,2.5,0,1.5,2,0.5,0)
            layer.ellipse(0,0,1)
        break
        case 339:
            layer.stroke(240,240,200,fade)
            layer.strokeWeight(0.2)
            layer.rect(0,0,8)
            layer.quad(0,-5.6,-5.6,0,0,5.6,5.6,0)
            layer.noStroke()
            layer.fill(240,240,200,fade)
            layer.rect(0,0,3,3)
            layer.fill(255,50,50,fade)
            layer.triangle(-7,-2,-7,2,-4,0)
            layer.fill(150,175,200,fade)
            layer.triangle(5,-2,5,2,8,0)
        break
        case 340:
            layer.fill(255,fade)
            layer.arc(0,0,10,10,-180,0)
            layer.fill(50,225,50,fade)
            layer.arc(0,0,10,10,0,180)
            layer.ellipse(2.5,0,5)
            layer.fill(255,fade)
            layer.ellipse(-2.5,0,5)
            layer.ellipse(2.5,0,1.5)
            layer.fill(50,225,50,fade)
            layer.ellipse(-2.5,0,1.5)
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
        break
        case 341:
            layer.fill(255,fade)
            layer.arc(0,0,10,10,-180,0)
            layer.fill(50,225,50,fade)
            layer.arc(0,0,10,10,0,180)
            layer.ellipse(2.5,0,5)
            layer.fill(255,fade)
            layer.ellipse(-2.5,0,5)
            layer.ellipse(2.5,0,1.5)
            layer.fill(50,225,50,fade)
            layer.ellipse(-2.5,0,1.5)
            layer.fill(200,255,255,fade)
            layer.quad(0,-2,-1,0,0,2,1,0)
            layer.quad(-2.5,-2,-3.5,0,-2.5,2,-1.5,0)
            layer.quad(2.5,-2,3.5,0,2.5,2,1.5,0)
        break
        case 342:
            layer.fill(255,fade)
            layer.arc(0,0,10,10,-180,0)
            layer.fill(50,225,50,fade)
            layer.arc(0,0,10,10,0,180)
            layer.ellipse(2.5,0,5)
            layer.fill(255,fade)
            layer.ellipse(-2.5,0,5)
            layer.ellipse(2.5,0,1.5)
            layer.fill(50,225,50,fade)
            layer.ellipse(-2.5,0,1.5)
            layer.fill(0,150,0,fade)
            layer.rect(0,0,2,8)
            layer.rect(0,0,8,2)
            layer.fill(200,255,255,fade)
            layer.quad(0,-2,-1,0,0,2,1,0)
            layer.quad(-2.5,-2,-3.5,0,-2.5,2,-1.5,0)
            layer.quad(2.5,-2,3.5,0,2.5,2,1.5,0)
        break
        case 343:
            layer.fill(40,fade)
            layer.quad(-5.5,0,0,-6.75,5.5,0,0,6.75)
            layer.fill(200,255,255,fade)
            layer.quad(-5,0,0,-6.25,5,0,0,6.25)
            layer.fill(225,255,255,fade)
            layer.quad(-4,0,0,-5,4,0,0,5)
        break
        case 344:
            layer.fill(40,fade)
            layer.quad(-5.5,0,0,-6.75,5.5,0,0,6.75)
            layer.fill(200,255,255,fade)
            layer.quad(-5,0,0,-6.25,5,0,0,6.25)
            layer.fill(225,255,255,fade)
            layer.quad(-4,0,0,-5,4,0,0,5)
            layer.triangle(0,-7,-1,-9,1,-9)
        break
        case 345:
            layer.stroke(240,240,160,fade)
            layer.strokeWeight(0.5)
            regTriangle(layer,0,0,4,4,0)
            regTriangle(layer,0,-3,2,2,60)
            regTriangle(layer,-1.5*sqrt(3),1.5,2,2,60)
            regTriangle(layer,1.5*sqrt(3),1.5,2,2,60)
            layer.stroke(240,240,200,fade)
            layer.strokeWeight(0.2)
            layer.rect(0,0,10)
            layer.quad(0,-7,-7,0,0,7,7,0)
        break
        case 346:
            layer.stroke(255,100,200,fade)
            layer.strokeWeight(1)
            for(let a=0,la=12;a<la;a++){
                layer.line(lsin(a*30)*3,lcos(a*30)*3,lsin(a*30)*6,lcos(a*30)*6)
            }
            layer.fill(255,100,200,fade)
            layer.noStroke()
            layer.ellipse(0,8,2)
            layer.ellipse(0,10.5,2)
        break
        case 347:
            layer.fill(255,150,175,fade)
            layer.ellipse(0,0,3)
            layer.triangle(-2,0,-5,-2,-5,2)
            layer.triangle(2,0,5,-2,5,2)
            layer.rect(0,-3,4,2)
            layer.rect(0,3,4,2)
        break
        case 348:
            layer.stroke(240,240,200,fade)
            layer.strokeWeight(0.2)
            layer.rect(0,0,10)
            layer.quad(0,-7,-7,0,0,7,7,0)
            layer.noStroke()
            layer.fill(0,150,255,fade)
            layer.rect(-2,0,6,2)
            layer.triangle(1,-3,1,3,5,0)
        break
        case 349:
            layer.stroke(255,100,200,fade)
            layer.strokeWeight(1)
            for(let a=0,la=12;a<la;a++){
                layer.line(lsin(a*30)*3,lcos(a*30)*3,lsin(a*30)*6,lcos(a*30)*6)
            }
            layer.fill(255,100,200,fade)
            layer.noStroke()
            layer.ellipse(0,8,2)
            layer.ellipse(0,10.5,2)
            layer.ellipse(0,13,2)
        break
        case 350:
            layer.stroke(40,fade)
            layer.strokeWeight(1.5)
            layer.ellipse(0,0,12,12)
            layer.line(0,0,0,-3.75)
            layer.line(0,0,2.25,2.25)
            layer.fill(40,fade)
            layer.noStroke()
            layer.ellipse(0,9,2)
        break
        case 351:
            layer.stroke(40,fade)
            layer.strokeWeight(1.5)
            layer.ellipse(0,0,12,12)
            layer.line(0,0,0,-3.75)
            layer.line(0,0,2.25,2.25)
            layer.fill(40,fade)
            layer.noStroke()
            layer.ellipse(0,9,2)
            layer.ellipse(0,11.5,2)
        break
        case 352:
            layer.fill(0,150,255,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.quad(-4.5,0,-3,1.5,-1.5,0,-3,-1.5)
        break
        case 353:
            layer.fill(255,50,50,fade)
            layer.triangle(2,-6,3,-1.5,1,-1.5)
            layer.quad(4,3,0,3,0.8,-0.6,3.2,-0.6)
            layer.quad(-4.5,0,-3,-1.5,-1.5,0,-3,1.5)
        break
        case 354:
            layer.fill(150,fade)
            layer.triangle(0,0,-6,0,0,-6)
            layer.triangle(0,0,6,0,0,6)
            layer.fill(125,fade)
            layer.triangle(0,0,-6,0,0,6)
            layer.triangle(0,0,6,0,0,-6)
            layer.fill(200,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
        break
        case 355:
            layer.fill(120,fade)
            layer.ellipse(0,0,3)
            layer.stroke(40,fade)
            layer.strokeWeight(1.5)
            layer.ellipse(0,0,12,12)
            layer.line(0,0,0,-3.75)
            layer.line(0,0,2.25,2.25)
        break
        case 356:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-4,-3,2,3,2)
            layer.triangle(-2,-2,-3,0,-6,0)
            layer.triangle(2,-2,3,0,6,0)
        break
        case 357:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,0,-5,3,-1,3)
            layer.triangle(3,0,5,3,1,3)
            layer.triangle(-3,0,-5,-3,-1,-3)
            layer.triangle(3,0,5,-3,1,-3)
            layer.rect(0,-4,10,1)
            layer.rect(0,4,10,1)
        break
        case 358:
            layer.fill(150,150,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
            layer.fill(255,100,100,fade)
            layer.rect(0,0,3,12)
            layer.rect(0,0,12,3)
        break
        case 359:
            layer.fill(150,175,200,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.rect(-3,0,3,3)
            layer.fill(80,fade)
            layer.triangle(0,-1.5,0,1.5,6,0)
        break
        case 360:
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.quad(-9,0,-8,-2,-7,0,-8,2)
        break
        case 361:
            layer.fill(80,fade)
            layer.rect(-2.5,0,1,8)
            layer.rect(-1,0,1,8)
            layer.rect(0,-3.5,5.5,1)
            layer.rect(0,3.7,5.5,1)
            layer.fill(255,50,50,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.rect(-3,0,3,3)
        break
        case 362:
            layer.fill(255,50,50,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.rect(-3,0,3,3)
            layer.fill(200,0,0,fade)
            layer.triangle(0,-6,2,3,-2,3)
        break
        case 363:
            layer.fill(255,50,50,fade)
            layer.quad(-2.5,-5,-3.5,-5,-5,3,-1,3)
            layer.quad(2.5,-5,3.5,-5,5,3,1,3)
            layer.fill(75,150,75)
            layer.triangle(-1,-4,1,-4,0,-5.5)
            layer.rect(0,-3,1,2)
        break
        case 364:
            layer.fill(200,255,255,fade)
            layer.quad(-4,0,0,-5,4,0,0,5)
            layer.fill(225,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
            layer.noFill()
            layer.stroke(150,0,0,fade)
            layer.strokeWeight(1)
            layer.ellipse(0,0,10)
            layer.line(2.5*sqrt(2),-2.5*sqrt(2),-2.5*sqrt(2),2.5*sqrt(2))
        break
        case 365:
            layer.fill(255,100,100,fade)
            layer.rect(0,0,3,12)
            layer.rect(0,0,12,3)
            layer.fill(100,100,255,fade)
            layer.triangle(7,-2,7,2,9,0)
        break
        case 366:
            layer.fill(200,fade)
            layer.ellipse(0,0,11)
            layer.fill(150,fade)
            layer.triangle(0,0,-6,0,0,-6)
            layer.triangle(0,0,6,0,0,6)
            layer.fill(125,fade)
            layer.triangle(0,0,-6,0,0,6)
            layer.triangle(0,0,6,0,0,-6)
        break
        case 367:
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
            layer.fill(150,fade)
            layer.triangle(0,0,-6,0,0,-6)
            layer.triangle(0,0,6,0,0,6)
            layer.fill(125,fade)
            layer.triangle(0,0,-6,0,0,6)
            layer.triangle(0,0,6,0,0,-6)
        break
        case 368:
            layer.fill(200,fade)
            layer.stroke(175,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.stroke(75,150,75,fade)
            layer.line(-5,-1,1,-1)
            layer.line(-5,1,1,1)
            layer.line(-5,-1,-5,1)
            layer.line(1,-4,6,0)
            layer.line(1,4,6,0)
            layer.line(1,-4,1,-1)
            layer.line(1,4,1,1)
        break
        case 369:
            layer.fill(200,fade)
            layer.stroke(175,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.stroke(75,150,75,fade)
            layer.line(-5,-1,1,-1)
            layer.line(-5,1,1,1)
            layer.line(-5,-1,-5,1)
            layer.line(1,-4,6,0)
            layer.line(1,4,6,0)
            layer.line(1,-4,1,-1)
            layer.line(1,4,1,1)
            layer.noStroke()
            layer.fill(75,150,75,fade)
            layer.triangle(0,5,-1,6.5,1,6.5)
        break
        case 370:
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,5,5,3,3,0)
            layer.fill(0,150,255,fade)
            layer.triangle(0,6,2,-3,-2,-3)
            layer.quad(-5.5,0,-4,-1.5,-2.5,0,-4,1.5)
            layer.ellipse(4,0,3)
        break
        case 371:
            layer.fill(150,175,200,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.triangle(0,3.5,-1,5.5,1,5.5)
            layer.triangle(0,6,-1,8,1,8)
            layer.triangle(0,8.5,-1,10.5,1,10.5)
        break
        case 372:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.triangle(0,3.5,-1,5.5,1,5.5)
            layer.triangle(0,6,-1,8,1,8)
            layer.triangle(0,8.5,-1,10.5,1,10.5)
            layer.triangle(0,11,-1,13,1,13)
        break
        case 373:
            layer.fill(150,175,200,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.triangle(0,3.5,-1,5.5,1,5.5)
            layer.triangle(0,6,-1,8,1,8)
            layer.triangle(0,8.5,-1,10.5,1,10.5)
            layer.triangle(0,11,-1,13,1,13)
        break
        case 374:
            layer.fill(225,fade)
            layer.ellipse(0,0,8)
            layer.rotate(-22.5)
            for(let a=0,la=8;a<la;a++){
                layer.triangle(-1,3,1,3,0,8)
                layer.rotate(45)
            }
            layer.rotate(22.5)
            layer.fill(150,fade)
            layer.ellipse(0,0,5)
        break
        case 375:
            layer.fill(255,fade/5)
            layer.ellipse(0,0,10)
            layer.fill(100,255,100,fade)
            layer.triangle(-1,-5.5,1,-5.5,0,-7)
            layer.triangle(-1,5.5,1,5.5,0,7)
            layer.stroke(100,255,100,fade)
            layer.strokeWeight(1.5)
            layer.line(-3,0,3,0)
            layer.line(-1.5,-1.5*sqrt(3),1.5,1.5*sqrt(3))
            layer.line(-1.5,1.5*sqrt(3),1.5,-1.5*sqrt(3))
        break
        case 376:
            layer.stroke(0,fade)
            layer.strokeWeight(0.6)
            layer.noFill()
            layer.ellipse(0,0,8)
            layer.line(-3,-1,-1,1)
            layer.line(-3,1,-1,-1)
            layer.line(3,-1,1,1)
            layer.line(3,1,1,-1)
            layer.noStroke()
            layer.fill(255,200,255,fade)
            layer.quad(-1,-7.5,0,-5,0,5,-1,5)
            layer.fill(255,150,255,fade)
            layer.quad(1,-2.5,0,-5,0,5,1,5)
            layer.fill(255,255,255,fade)
            layer.rect(0,6,5,2)
            layer.rect(0,8,3,2)
        break
        case 377:
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
            layer.fill(225,0,225,fade)
            layer.quad(-2,0,0,-2,-2,-4,-4,-2)
            layer.quad(2,0,0,2,2,4,4,2)
        break
        case 378:
            layer.fill(180,fade)
            layer.rect(2,0,3,11)
            layer.rect(-2,-2,3,7)
            layer.rect(0,4,7,3)
        break
        case 379:
            layer.stroke(240,240,40,fade)
            layer.strokeWeight(1.5)
            layer.strokeCap(SQUARE)
            layer.arc(0.25,-0.25,7.5,7.5,-135,45)
            layer.arc(-0.25,0.25,7.5,7.5,45,225)
            layer.strokeCap(ROUND)
            layer.noStroke()
            layer.fill(80,fade)
            layer.triangle(-2,-1.5,-2,1.5,4,0)
            layer.noStroke()
            layer.fill(225,fade)
            layer.rect(-2,0,6,2)
            layer.triangle(1,-3,1,3,5,0)
        break
        case 380:
            layer.fill(140,120,160,fade)
            layer.stroke(120,100,140,fade)
            layer.strokeWeight(1)
            regPoly(layer,0,0,8,3.5,3.5,0)
            layer.noStroke()
            layer.fill(255,225,75,fade)
            layer.triangle(-2,4,2,4,0,-8)
        break
        case 381:
            layer.fill(255,50,50,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.fill(255,150,150,fade)
            layer.triangle(0,-5,-2.5,2.5,2.5,2.5)
        break
        case 382:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.fill(255,200,255,fade)
            layer.quad(-1,-7.5,0,-5,0,5,-1,5)
            layer.fill(255,150,255,fade)
            layer.quad(1,-2.5,0,-5,0,5,1,5)
            layer.fill(255,255,255,fade)
            layer.rect(0,6,5,2)
            layer.rect(0,8,3,2)
        break
        case 383:
            layer.fill(125,255,255,fade)
            layer.rect(0,0,9,9)
            layer.fill(175,255,255,fade)
            layer.rect(0,0,6,6)
            layer.fill(225,255,255,fade)
            layer.rect(0,0,3,3)
            for(let a=0,la=6;a<la;a++){
                layer.fill([255,255,255,0,0,150][a],[0,150,255,255,150,0][a],[0,0,0,50,255,200][a],fade)
                layer.quad(0,0,2*lsin(a*60-30),2*lcos(a*60-30),8*lsin(a*60),8*lcos(a*60),2*lsin(a*60+30),2*lcos(a*60+30))
            }
        break
        case 384:
            layer.fill(150,255,100,fade)
            layer.arc(0,0,8,8,-30,210)
            layer.quad(0,0,sqrt(3)*2,-2,0,-2/(2-sqrt(3)),-sqrt(3)*2,-2)
            for(let a=0,la=6;a<la;a++){
                layer.fill([255,255,255,0,0,150][a],[0,150,255,255,150,0][a],[0,0,0,50,255,200][a],fade)
                layer.quad(0,0,2*lsin(a*60-30),2*lcos(a*60-30),8*lsin(a*60),8*lcos(a*60),2*lsin(a*60+30),2*lcos(a*60+30))
            }
        break
        case 385:
            for(let a=0,la=6;a<la;a++){
                layer.fill([255,255,255,0,0,150][a],[0,150,255,255,150,0][a],[0,0,0,50,255,200][a],fade)
                layer.quad(0,0,2*lsin(a*60-30),2*lcos(a*60-30),8*lsin(a*60),8*lcos(a*60),2*lsin(a*60+30),2*lcos(a*60+30))
            }
            layer.fill(225,fade)
            layer.triangle(-1.5,-2.5,1.5,-2.5,0,-5)
            layer.triangle(-1.5,2.5,1.5,2.5,0,5)
            layer.triangle(-2.5,-1.5,-2.5,1.5,-5,0)
            layer.triangle(2.5,-1.5,2.5,1.5,5,0)
        break
        case 386:
            layer.fill(255,50,50,fade)
            layer.rect(-1,-2.5,4,4)
            layer.arc(1,-2.5,6,4,-90,90)
            layer.rect(1,2.5,4,4)
            layer.arc(-1,2.5,6,4,90,270)
            layer.ellipse(-8,0,3,3)
        break
        case 387:
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.ellipse(-8,0,3,3)
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,8)
            layer.fill(200,0,0,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.triangle(9,0,0,-2,0,2)
            }
        break
        case 388:
            layer.fill(140,120,160,fade)
            layer.stroke(120,100,140,fade)
            layer.strokeWeight(1)
            regPoly(layer,0,0,8,3.5,3.5,0)
            layer.noStroke()
            layer.fill(0,150,255,fade)
            layer.quad(0,0,-3,-4.5,0,6,3,-4.5)
        break
        case 389:
            layer.fill(255,50,50,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.rect(-3,0,3,3)
            layer.fill(80,fade)
            layer.triangle(0,-1.5,0,1.5,6,0)
        break
        case 390:
            layer.fill(255,150,150,fade)
            regStar(layer,0,0,8,7.5,7.5,3,3,0)
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
            layer.fill(225,0,225,fade)
            layer.quad(-2,0,0,-2,-2,-4,-4,-2)
            layer.quad(2,0,0,2,2,4,4,2)
        break
        case 391:
            for(let a=0,la=6;a<la;a++){
                layer.fill([255,255,255,0,0,150][a],[0,150,255,255,150,0][a],[0,0,0,50,255,200][a],fade)
                layer.quad(0,0,2*lsin(a*60-30),2*lcos(a*60-30),8*lsin(a*60),8*lcos(a*60),2*lsin(a*60+30),2*lcos(a*60+30))
            }
            layer.fill(200,fade)
            layer.triangle(0,-1.5,0,1.5,6,0)
        break
        case 392:
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
            layer.fill(75,fade)
            regStar(layer,0,0,6,2,2,6,6,0)
        break
        case 393:
            layer.fill(80,0,120,fade)
            layer.triangle(0,3,-6,3,-3,1)
            layer.triangle(0,3,6,3,3,1)
            layer.triangle(0,3,-1,-3,-2.5,0)
            layer.triangle(0,3,1,-3,2.5,0)
        break
        case 394:
            layer.fill(200,255,255,fade)
            layer.triangle(-0.25,-4,-5.25,0,-0.25,4)
            layer.triangle(0.25,-4,5.25,0,0.25,4)
        break
        case 395:
            layer.fill(200,255,255,fade)
            layer.rect(0,0,1,8)
            layer.triangle(-1,-4,-6,0,-1,4)
            layer.triangle(1,-4,6,0,1,4)
        break
        case 396:
            layer.fill(50,40,50,fade)
            layer.triangle(-1.5,6.5,1.5,6.5,0,8)
            layer.noFill()
            layer.stroke(50,40,50,fade)
            layer.strokeWeight(1)
            regPoly(layer,0,0,4,5,5,2,2,0)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
        break
        case 397:
            layer.fill(200,255,100,fade)
            layer.triangle(-0.5,4,-0.5,-4,-4,-4)
            layer.triangle(0.5,-4,0.5,4,4,4)
            layer.triangle(0,4.5,-1,6,1,6)
        break
        case 398:
            layer.fill(255,50,50,fade)
            layer.ellipse(0,0,6)
            layer.quad(-4,-3,-6,-2,-6,2,-4,3)
            layer.quad(4,-3,6,-2,6,2,4,3)
        break
        case 399:
            layer.fill(138,141,207,fade)
            layer.rect(-2,0,2,12)
            layer.triangle(-1,-6,-1,-3,8,-4.5)
            layer.fill(200,0,0,fade)
            layer.quad(1,2,4,-1,7,2,4,5)
        break
        case 400:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,6)
            layer.rotate(-36)
            for(let a=0,la=3;a<la;a++){
                layer.triangle(-1.8,-1.8,1.8,-1.8,0,-6)
                layer.rotate(36)
            }
            layer.rotate(-72)
            layer.fill(255,50,50,fade)
            layer.triangle(0,-4,-2,2,2,2)
        break
        case 401:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,6)
            layer.rotate(-36)
            for(let a=0,la=3;a<la;a++){
                layer.triangle(-1.8,-1.8,1.8,-1.8,0,-6)
                layer.rotate(36)
            }
            layer.rotate(-72)
            layer.fill(255,100,100,fade)
            layer.quad(-3,0,0,-3,3,0,0,3)
        break
        case 402:
            layer.fill(255,50,50,fade)
            layer.quad(-1,0,-3,-2,-1,-8,1,-2)
            layer.fill(150,175,200,fade)
            layer.quad(1,0,3,2,1,8,-1,2)
        break
        case 403:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.fill(180,200,220,fade)
            regPoly(layer,0,0,6,1.5,6,0)
            regPoly(layer,-4,0,6,1,4,0)
            regPoly(layer,4,0,6,1,4,0)
        break
        case 404:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.strokeWeight(1)
            layer.stroke(50,200,50,fade)
            layer.line(-5,3,5,3)
            layer.stroke(200,50,50,fade)
            layer.line(-5,0,5,0)
            layer.stroke(50,50,200,fade)
            layer.line(-5,-3,5,-3)
        break
        case 405:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(200,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
            layer.triangle(-4,-0.5,-4,0.5,-5,0)
            layer.triangle(4,-0.5,4,0.5,5,0)
        break
        case 406:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noFill()
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(0.5)
            layer.ellipse(0,0,8)
            layer.line(-2*sqrt(2),2*sqrt(2),2*sqrt(2),-2*sqrt(2))
        break
        case 407:
            layer.fill(255,50,50,fade)
            layer.quad(-2,3,-4,1,-2,-5,0,1)
            layer.fill(50,200,50,fade)
            layer.triangle(1,-1.5,1,1.5,6,0)
        break
        case 408:
            layer.fill(150,0,200,fade)
            layer.quad(-5,-0.5,5,-0.5,2.5,-2.5*sqrt(3),-2.5,-2.5*sqrt(3))
            layer.quad(-5,0.5,5,0.5,2.5,2.5*sqrt(3),-2.5,2.5*sqrt(3))
            layer.fill(200,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
            layer.triangle(-4,-1,-5,-1,-4.5,1)
            layer.triangle(4,-1,5,-1,4.5,1)
        break
        case 409:
            layer.fill(150,0,200,fade)
            layer.quad(-5,-0.5,5,-0.5,2.5,-2.5*sqrt(3),-2.5,-2.5*sqrt(3))
            layer.quad(-5,0.5,5,0.5,2.5,2.5*sqrt(3),-2.5,2.5*sqrt(3))
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noFill()
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(0.5)
            layer.ellipse(0,0,8)
            layer.line(-2*sqrt(2),2*sqrt(2),2*sqrt(2),-2*sqrt(2))
        break
        case 410:
            layer.fill(75,150,75,fade)
            layer.rect(-3,2,3,4)
            layer.triangle(-6,0,0,0,-3,-4.5)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(2,0,4.5,6,1)
        break
        case 411:
            layer.strokeWeight(1)
            layer.stroke(50,200,50,fade)
            layer.line(-5,3,5,3)
            layer.stroke(200,50,50,fade)
            layer.line(-5,0,5,0)
            layer.stroke(50,50,200,fade)
            layer.line(-5,-3,5,-3)
            layer.noStroke()
            layer.fill(50,200,50,fade)
            layer.triangle(-2,-1.5,-2,1.5,3,0)
        break
        case 412:
            layer.fill(180,200,220,fade)
            regPoly(layer,0,0,6,1.5,6,0)
            regPoly(layer,-4,0,6,1,4,0)
            regPoly(layer,4,0,6,1,4,0)
            layer.fill(50,200,50,fade)
            layer.triangle(-2,-1.5,-2,1.5,3,0)
        break
        case 413:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.fill(60,fade)
            layer.rect(-1,1,4)
            layer.rect(-1,-1,1.5)
            layer.rect(1,1,1.5)
        break
        case 414:
            layer.strokeWeight(1)
            layer.stroke(50,200,50,fade)
            layer.line(-5,3,5,3)
            layer.stroke(200,50,50,fade)
            layer.line(-5,0,5,0)
            layer.stroke(50,50,200,fade)
            layer.line(-5,-3,5,-3)
            layer.fill(200,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
            layer.triangle(-4,-0.5,-4,0.5,-5,0)
            layer.triangle(4,-0.5,4,0.5,5,0)
        break
        case 415:
            layer.fill(140,120,160,fade)
            layer.stroke(120,100,140,fade)
            layer.strokeWeight(0.8)
            regPoly(layer,0,0,6.4,2.8,2.8,0)
            layer.noFill()
            layer.stroke(40,fade)
            layer.strokeWeight(1.5)
            layer.ellipse(0,0,10,10)
            layer.line(0,0,0,-3.25)
            layer.line(0,0,2,2)
        break
        case 416:
            layer.fill(140,120,160,fade)
            layer.stroke(120,100,140,fade)
            layer.strokeWeight(1)
            regPoly(layer,0,0,8,3.5,3.5,0)
            layer.noStroke()
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
        break
        case 417:
            layer.fill(140,120,160,fade)
            layer.stroke(120,100,140,fade)
            layer.strokeWeight(1)
            regPoly(layer,0,0,8,3.5,3.5,0)
            layer.noStroke()
            layer.fill(200,fade)
            layer.triangle(0,-1.5,0,1.5,6,0)
        break
        case 418:
            layer.fill(140,120,160,fade)
            layer.stroke(120,100,140,fade)
            layer.strokeWeight(1)
            regPoly(layer,0,0,8,3.5,3.5,0)
            layer.noStroke()
            layer.fill(255,225,75,fade)
            layer.triangle(-2,4,2,4,0,-8)
            layer.quad(-3,-3,-5,-2,-5,2,-3,3)
            layer.quad(3,-3,5,-2,5,2,3,3)
        break
        case 419:
            layer.fill(140,120,160,fade)
            layer.stroke(120,100,140,fade)
            layer.strokeWeight(1)
            regPoly(layer,0,0,8,3.5,3.5,0)
            layer.noStroke()
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
        break
        case 420:
            layer.fill(140,120,160,fade)
            layer.stroke(120,100,140,fade)
            layer.strokeWeight(1)
            regPoly(layer,0,0,8,3.5,3.5,0)
            layer.noStroke()
            layer.fill(150,175,200,fade)
            layer.triangle(0,-6,-3,3,3,3)
        break
        case 421:
            layer.fill(100,fade)
            layer.rect(-4,1,2,6)
            layer.rect(2,-1,10,2)
            layer.fill(255,50,50,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.rect(-3,0,3,3)
        break
        case 422:
            layer.fill(100,fade)
            layer.rect(-4,1,2,6)
            layer.rect(2,-1,10,2)
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
        break
        case 423:
            layer.fill(0,fade)
            layer.stroke(255,fade)
            layer.strokeWeight(1)
            layer.triangle(-3,-2.5,-3,2.5,5,0)
        break
        case 424:
            layer.fill(150,175,200,fade)
            layer.triangle(-5,-3,5,-3,0,-6)
            layer.arc(0,-3,10,16,0,180)
            layer.stroke(40,fade)
            layer.strokeWeight(1.5)
            layer.ellipse(0,0,10,10)
            layer.line(0,0,0,-3.25)
            layer.line(0,0,2,2)
            layer.noStroke()
        break
        case 425:
            layer.fill(0,fade)
            layer.stroke(255,fade)
            layer.strokeWeight(1)
            layer.triangle(-4,-3.5,-4,-1,4,-2.25)
            layer.triangle(4,3.5,4,1,-4,2.25)
        break
        case 426:
            layer.fill(255,50,50,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.triangle(-3.5,-3,-4.5,0,-5.5,-3)
            layer.triangle(-6,-3,-5,0,-7,0)
            layer.triangle(3.5,-3,4.5,0,5.5,-3)
            layer.triangle(6,-3,5,0,7,0)
        break
        case 427:
            for(let a=0,la=6;a<la;a++){
                layer.fill([255,255,255,0,0,150][a],[0,150,255,255,150,0][a],[0,0,0,50,255,200][a],fade)
                layer.quad(0,0,2*lsin(a*60-30),2*lcos(a*60-30),8*lsin(a*60),8*lcos(a*60),2*lsin(a*60+30),2*lcos(a*60+30))
            }
            layer.fill(225,fade)
            layer.triangle(-3,3,3,3,0,-6)
        break
        case 428:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,0,-5,3,-1,3)
            layer.triangle(3,0,5,3,1,3)
            layer.triangle(-3,0,-5,-3,-1,-3)
            layer.triangle(3,0,5,-3,1,-3)
            layer.rect(0,-4,10,1)
            layer.rect(0,4,10,1)
            layer.triangle(0,5,1,7,-1,7)
        break
        case 429:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.fill(255,125,0,fade)
            layer.triangle(-2,-2,-2,2,4,0)
        break
        case 430:
            layer.fill(255,50,50,fade)
            layer.triangle(-2,-6,-4,3,0,3)
            layer.ellipse(3,0,4,4)
            layer.fill(125,fade)
            layer.stroke(100,fade)  
            layer.strokeWeight(1)
            layer.rect(0,-0.5,4.5,6,1)
            layer.noStroke()
            layer.fill(200,255,255,fade)
            layer.quad(-1.5,-2,-2.5,0,-1.5,2,-0.5,0)
            layer.quad(1.5,-2,2.5,0,1.5,2,0.5,0)
            layer.ellipse(0,0,1)
        break
        case 431:
            layer.fill(150,175,200,fade)
            layer.triangle(-5,-3,5,-3,0,-6)
            layer.arc(0,-3,10,16,0,180)
            layer.fill(125,fade)
            layer.stroke(100,fade)  
            layer.strokeWeight(1)
            layer.rect(0,-0.5,4.5,6,1)
            layer.noStroke()
            layer.fill(200,255,255,fade)
            layer.quad(-1.5,-2,-2.5,0,-1.5,2,-0.5,0)
            layer.quad(1.5,-2,2.5,0,1.5,2,0.5,0)
            layer.ellipse(0,0,1)
        break
        case 432:
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,7,7,4.2,4.2,0)
            layer.fill(150,175,200,fade)
			layer.triangle(-4,-2.4,4,-2.4,0,-4.8)
			layer.arc(0,-2.4,8,12.8,0,180)
        break
        case 433:
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,7,7,4.2,4.2,0)
            layer.fill(150,175,200,fade)
			layer.triangle(-1,-2.4,3,-2.4,-1,-4.8)
			layer.arc(-1,-2.4,8,12.8,0,90)
        break
        case 434:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(150,0,0,fade)
            regStar(layer,0,-1,8,6,6,3.6,3.6,0)
            layer.ellipse(0,7.5,4,4)
        break
        case 435:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noFill()
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(0.5)
            layer.ellipse(0,0,8)
            layer.line(-2*sqrt(2),2*sqrt(2),2*sqrt(2),-2*sqrt(2))
            layer.noStroke()
            layer.fill(100,255,100,fade)
            layer.quad(0,4,-1,5,0,6,1,5)
            layer.fill(200,fade)
            layer.triangle(-2,-1.5,-2,1.5,4,0)
        break
        case 436:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.noFill()
            layer.stroke(150,200,255,fade)
            layer.strokeWeight(1)
            layer.bezier(-5,0,-3,-3.5,3,-3.5,5,0)
            layer.bezier(-5,0,-3,3.5,3,3.5,5,0)
            layer.strokeWeight(3)
            layer.point(0,0)
        break
        case 437:
            layer.fill(255,175,0,fade)
            layer.quad(-6,-6,2,-2,6,6,-2,2)
            layer.quad(-2,-2,6,-6,2,2,-6,6)
            layer.fill(255,75,0,fade)
            layer.quad(-5,-5,1,-1,5,5,-1,1)
            layer.quad(-1,-1,5,-5,1,1,-5,5)
            layer.fill(200,255,255,fade)
            layer.quad(0,-4,-2,0,0,4,2,0)
        break
        case 438:
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.fill(255,255,50,fade)
            layer.quad(-3,-1,-1,-3,3,1,1,3)
        break
        case 439:
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
            layer.fill(200,255,255,fade)
            layer.quad(-4,0,0,-5,4,0,0,5)
            layer.triangle(-1.5,-5.5,1.5,-5.5,0,-7.5)
            layer.fill(225,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
        break
        case 440:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.fill(150,0,0,fade)
            layer.noStroke()
            regStar(layer,0,0,8,3,3,1.8,1.8,0)
        break
        case 441:
            layer.fill(150,0,200,fade)
            layer.triangle(-1.5,5,1.5,5,0,6.5)
            layer.noFill()
            layer.stroke(150,0,200,fade)
            layer.strokeWeight(0.5)
            regPoly(layer,0,0,6,4,4,30)
            layer.line(-10/3,-2/3*sqrt(3),10/3,-2/3*sqrt(3))
            layer.line(-10/3,2/3*sqrt(3),10/3,2/3*sqrt(3))
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.fill(200,255,255,fade)
            layer.noStroke()
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
        break
        case 442:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(-3.5,0,4.5,6,1)
            layer.rect(3.5,0,4.5,6,1)
            layer.noStroke()
            layer.fill(40,fade)
            layer.ellipse(3.5,-2,1.2)
            layer.ellipse(3.5,0,1.2)
            layer.ellipse(3.5,2,1.2)
            layer.noFill()
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(0.5)
            layer.ellipse(-3.5,0,8)
            layer.line(-3.5-2*sqrt(2),2*sqrt(2),-3.5+2*sqrt(2),-2*sqrt(2))
        break
        case 443:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noFill()
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(0.5)
            layer.ellipse(0,0,8)
            layer.line(-2*sqrt(2),2*sqrt(2),2*sqrt(2),-2*sqrt(2))
            layer.noStroke()
            layer.fill(255,200,255,fade)
            layer.quad(-1,-7.5,0,-5,0,5,-1,5)
            layer.fill(255,150,255,fade)
            layer.quad(1,-2.5,0,-5,0,5,1,5)
            layer.fill(255,255,255,fade)
            layer.rect(0,6,5,2)
            layer.rect(0,8,3,2)
        break
        case 444:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.rect(6.5,-3,1,4)
            layer.rect(6.5,3,1,4)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
        break
        case 445:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,3,3,3,0,-6)
            layer.noFill()
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(0.5)
            layer.ellipse(0,0,8)
            layer.line(-2*sqrt(2),2*sqrt(2),2*sqrt(2),-2*sqrt(2))
            layer.stroke(240,240,200,fade)
            layer.strokeWeight(0.2)
            layer.rect(0,0,10)
            layer.quad(0,-7,-7,0,0,7,7,0)
        break
        case 446:
            layer.fill(60,20,80,fade)
            layer.ellipse(0,0,10)
            layer.triangle(5.5,-1,5.5,1,7,0)
            layer.stroke(180,100,220,fade)
            layer.strokeWeight(1)
            layer.point(0,0)
            for(let a=0,la=5;a<la;a++){
                layer.point(lsin(a*72)*4,lcos(a*72)*4)
            }
            layer.strokeWeight(0.5)
            for(let a=0,la=5;a<la;a++){
                layer.line(0,0,lsin(a*72)*4,lcos(a*72)*4)
                layer.line(lsin(a*72+72)*4,lcos(a*72+72)*4,lsin(a*72)*4,lcos(a*72)*4)
            }
        break
        case 447:
            layer.fill(140,120,160,fade)
            layer.stroke(120,100,140,fade)
            layer.strokeWeight(1)
            regPoly(layer,-1,-1,8,3.5,3.5,0)
            regPoly(layer,1,1,8,3.5,3.5,0)
            layer.fill(255,255,50,fade)
            layer.noStroke()
            layer.quad(-3,-1,-1,-3,3,1,1,3)
        break
        case 448:
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
            layer.noFill()
            layer.stroke(255,100,255,fade)
            layer.strokeWeight(1)
            layer.arc(0,0,5,5,0,315)
            layer.ellipse(0,0,2,2)
            layer.line(1,0,2.5,0)
        break
        case 449:
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
            layer.fill(255,255,50,fade)
            layer.beginShape()
            layer.vertex(0.5,-10)
            layer.vertex(-4,1.5)
            layer.vertex(0.5,1.5)
            layer.vertex(-0.5,10)
            layer.vertex(4,-1.5)
            layer.vertex(-0.5,-1.5)
            layer.endShape()
        break
        case 450:
            layer.fill(80,100,120,fade)
            layer.rect(-1,0,8,6)
            layer.arc(3,0,6,6,-90,90)
            layer.fill(200,fade)
            layer.triangle(-3,-1.5,-3,1.5,6,0)
        break
        case 451:
            layer.fill(150,255,225,fade)
            layer.stroke(100,255,225,fade)
            layer.strokeWeight(2)
            layer.rect(-2,-2,4,4)
            layer.arc(0,0,8,8,-90,180)
            layer.noStroke()
            layer.fill(255,125,0,fade)
            layer.triangle(-1,-2,0.5,2,-2.5,2)
            layer.triangle(1,2,-0.5,-2,2.5,-2)
        break
        case 452:
            layer.fill(150,fade)
            layer.triangle(0,0,-6,0,0,-6)
            layer.triangle(0,0,6,0,0,6)
            layer.fill(125,fade)
            layer.triangle(0,0,-6,0,0,6)
            layer.triangle(0,0,6,0,0,-6)
            layer.fill(80,fade)
            layer.triangle(-3,-1.5,-3,1.5,6,0)
        break
        case 453:
            layer.fill(255,50,50,fade)
            layer.triangle(0,0,-4,-4,-4,4)
            layer.triangle(0,-1,-2,-3,0,-5)
            layer.triangle(0,1,-2,3,0,5)
            layer.triangle(1,-2,1,2,3,0)
            layer.triangle(4,-2,4,2,6,0)
        break
        case 454:
            layer.stroke(240,240,40,fade)
            layer.strokeWeight(1.5)
            layer.strokeCap(SQUARE)
            layer.arc(0.25,-0.25,7.5,7.5,-135,45)
            layer.arc(-0.25,0.25,7.5,7.5,45,225)
            layer.strokeCap(ROUND)
            layer.noStroke()
            layer.fill(200,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
            layer.triangle(-4,-1,-5,-1,-4.5,1)
            layer.triangle(4,-1,5,-1,4.5,1)
        break
        case 455:
            layer.fill(50,200,255,fade)
            layer.ellipse(0,0,9)
            layer.triangle(-1,-5,1,-5,0,-6.5)
            layer.triangle(-1,5,1,5,0,6.5)
            layer.fill(200,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
            layer.triangle(-4,-1,-5,-1,-4.5,1)
            layer.triangle(4,-1,5,-1,4.5,1)
        break
        case 456:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.fill(200,255,255,fade)
            layer.noStroke()
            layer.triangle(-2,-2,2,-2,0,3)
            layer.noStroke()
            layer.fill(75,fade)
            layer.rect(-5,0,2)
        break
        case 457:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(200,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
            layer.triangle(-4,-1,-5,-1,-4.5,1)
            layer.triangle(4,-1,5,-1,4.5,1)
        break
        case 458:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.noFill()
            layer.stroke(255,fade)
            layer.strokeWeight(0.8)
            layer.arc(0,0,10,10,-165,-105)
            layer.arc(0,0,10,10,-75,-15)
            layer.arc(0,0,10,10,15,75)
            layer.arc(0,0,10,10,105,165)
        break
        case 459:
            layer.fill(200,255,255,fade)
            layer.quad(-4,0,0,-5,4,0,0,5)
            layer.fill(225,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
            layer.noFill()
            layer.stroke(255,fade)
            layer.strokeWeight(0.8)
            layer.arc(0,0,10,10,-165,-105)
            layer.arc(0,0,10,10,-75,-15)
            layer.arc(0,0,10,10,15,75)
            layer.arc(0,0,10,10,105,165)
        break
        case 460:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-2,-4,2,-4)
            layer.triangle(0,-3.5,-2,-1.5,2,-1.5)
            layer.quad(0,-1,3,2,0,5,-3,2)
        break
        case 461:
            layer.stroke(225,75,25,fade)
            layer.strokeWeight(1.5)
            layer.point(0,0)
            layer.ellipse(0,0,6,6)
            layer.line(0,-3,0,-5)
            layer.line(-3,0,-5,0)
            layer.line(0,3,0,5)
            layer.line(3,0,5,0)
        break
        case 462:
            layer.fill(0,150,255,fade)
            layer.triangle(2,6,4,-3,0,-3)
            layer.rect(-3,2,3,3)
            layer.quad(-4.5,-2,-3,-0.5,-1.5,-2,-3,-3.5)
        break
        case 463:
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,5,5,3,3,0)
            layer.stroke(225,75,25,fade)
            layer.strokeWeight(1.5)
            layer.point(0,0)
            layer.ellipse(0,0,6,6)
            layer.line(0,-3,0,-5)
            layer.line(-3,0,-5,0)
            layer.line(0,3,0,5)
            layer.line(3,0,5,0)
            layer.noStroke()
            layer.fill(255,125,25,fade)
            layer.ellipse(4,4,3)
        break
        case 464:
            layer.fill(200,255,255,fade)
            layer.quad(-5,0,0,-6.25,5,0,0,6.25)
            layer.fill(225,255,255,fade)
            layer.quad(-4,0,0,-5,4,0,0,5)
            layer.fill(125,fade)
            layer.rect(-2,0,6,2)
            layer.triangle(1,-3,1,3,5,0)
        break
        case 465:
            layer.fill(50,200,255,fade)
            layer.ellipse(0,0,9)
            layer.triangle(-1,-5,1,-5,0,-6.5)
            layer.triangle(-1,5,1,5,0,6.5)
            layer.fill(200,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
            layer.triangle(-4,1,-5,1,-4.5,-1)
            layer.triangle(4,1,5,1,4.5,-1)
            layer.ellipse(-4,4,2)
        break
        case 466:
            layer.fill(50,200,255,fade)
            layer.ellipse(0,0,8)
            layer.triangle(-1,-5,1,-5,0,-6.5)
            layer.triangle(-1,5,1,5,0,6.5)
            layer.fill(200,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
            layer.triangle(-4,1,-5,1,-4.5,-1)
            layer.triangle(4,1,5,1,4.5,-1)
            layer.ellipse(-4,4,2)
            layer.triangle(3,5,5,5,4,2.5)
        break
        case 467:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.strokeWeight(0.8)
            layer.rect(-4.5,0,2.25,3,0.5)
            layer.rect(4.5,0,2.25,3,0.5)
            layer.noStroke()
            layer.fill(200,100,200,fade)
            layer.rect(-1.8,0,3.6,2.4)
            layer.triangle(0,-3.6,0,3.6,4.8,0)
        break
        case 468:
            layer.fill(255,125,0,fade)
            layer.rect(-1.5,-1.5,7,7)
            layer.fill(255,255,0,fade)
            layer.rect(0,0,7,7)
            layer.triangle(0,6,-1,8,1,8)
            layer.fill(125,255,0,fade)
            layer.rect(1.5,1.5,7,7)
        break
        case 469:
            layer.fill(150,0,200,fade)
            layer.quad(-5,-0.5,5,-0.5,2.5,-2.5*sqrt(3),-2.5,-2.5*sqrt(3))
            layer.quad(-5,0.5,5,0.5,2.5,2.5*sqrt(3),-2.5,2.5*sqrt(3))
            layer.fill(200,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
        break
        case 470:
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
            layer.fill(255,125,125,fade)
            layer.triangle(6,0,-3,-2,-3,2)
            layer.fill(255,50,50,fade)
            regStar(layer,0,0,8,4,4,2.4,2.4,0)
            layer.ellipse(0,8.5,4,4)
        break
        case 471:
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
            layer.fill(150,175,200,fade)
			layer.triangle(-4,-2.4,4,-2.4,0,-4.8)
			layer.arc(0,-2.4,8,12.8,0,180)
            layer.ellipse(0,8.5,4,4)
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(0.75)
            layer.noFill()
            layer.ellipse(0,0,12,12)
            layer.line(-3*sqrt(2),3*sqrt(2),3*sqrt(2),-3*sqrt(2))
        break
        case 472:
            layer.fill(200,0,0,fade)
            layer.arc(0,0,8,8,-45,225)
            layer.quad(0,0,sqrt(2)*2,-sqrt(2)*2,0,-sqrt(2)*4,-sqrt(2)*2,-sqrt(2)*2)
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.ellipse(-8,0,3,3)
            layer.ellipse(0,6,3,3)
        break
        case 473:
            layer.fill(225,fade)
            layer.rect(-3,0,10,10,2)
            layer.fill(40,fade)
            layer.ellipse(-6,0,2)
            layer.ellipse(-6,-3,2)
            layer.ellipse(-6,3,2)
            layer.ellipse(0,0,2)
            layer.ellipse(0,-3,2)
            layer.ellipse(0,3,2)
            layer.fill(240,100,80,fade)
            layer.triangle(4,-6,1,3,7,3)
        break
        case 474:
            layer.fill(150,175,200,fade)
            layer.triangle(0,-6,-2,-4,2,-4)
            layer.triangle(0,-3.5,-2,-1.5,2,-1.5)
            layer.quad(0,-1,3,2,0,5,-3,2)
        break
        case 475:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noFill()
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(0.5)
            layer.ellipse(0,0,8)
            layer.line(-2*sqrt(2),2*sqrt(2),2*sqrt(2),-2*sqrt(2))
            layer.noStroke()
            layer.fill(255,50,50,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.rect(-3,0,3,3)
        break
        case 476:
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
            layer.fill(150,255,100,fade)
            layer.arc(0,0,8,8,-30,210)
            layer.quad(0,0,sqrt(3)*2,-2,0,-2/(2-sqrt(3)),-sqrt(3)*2,-2)
        break
        case 477:
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.quad(-9,0,-8,-2,-7,0,-8,2)
            layer.triangle(0,4,-1,5.5,1,5.5)
        break
        case 478:
            layer.stroke(255,75,75,fade)
            layer.strokeWeight(1)
            layer.line(-4,-4,4,4)
            layer.line(-4,4,4,-4)
            layer.line(-4,-4,-4,4)
            layer.line(4,4,4,-4)
            layer.line(-4,-4,0,-4)
            layer.line(4,4,0,4)
            layer.fill(200,0,0,fade)
            layer.noStroke()
            layer.ellipse(0,0,3)
            layer.ellipse(-4.5,0,3)
            layer.ellipse(4.5,0,3)
        break
        case 479:
            displayMtgManaSymbol(layer,0,0,-1,0,0.4,fade,2,[1])
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.fill(40,fade)
            layer.ellipse(0,-4,1.2)
            layer.ellipse(0,-2,1.2)
            layer.ellipse(0,0,1.2)
            layer.ellipse(0,2,1.2)
            layer.ellipse(0,4,1.2)
        break
        case 480:
            layer.fill(200,255,255,fade)
            layer.quad(-5,0,0,-6.25,5,0,0,6.25)
            layer.fill(225,255,255,fade)
            layer.quad(-4,0,0,-5,4,0,0,5)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.fill(40,fade)
            layer.ellipse(0,-4,1.2)
            layer.ellipse(0,-2,1.2)
            layer.ellipse(0,0,1.2)
            layer.ellipse(0,2,1.2)
            layer.ellipse(0,4,1.2)
        break
        case 481:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(-3.5,0,4.5,6,1)
            layer.rect(3.5,0,4.5,6,1)
            layer.noStroke()
            layer.fill(255,255,150,fade)
            regStar(layer,-3.5,0,10,0.5,0.5,3.5,3.5,0)
        break
        case 482:
            layer.fill(150,0,200,fade)
            layer.quad(-5,-0.5,5,-0.5,2.5,-2.5*sqrt(3),-2.5,-2.5*sqrt(3))
            layer.quad(-5,0.5,5,0.5,2.5,2.5*sqrt(3),-2.5,2.5*sqrt(3))
            layer.fill(255,50,50,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.rect(-3,0,3,3)
        break
        case 483:
            layer.fill(150,255,100,fade)
            layer.arc(0,0,8,8,-30,210)
            layer.quad(0,0,sqrt(3)*2,-2,0,-2/(2-sqrt(3)),-sqrt(3)*2,-2)
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.ellipse(-8,0,3,3)
        break
        case 484:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(200,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
        break
        case 485:
            layer.fill(150,175,200,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.ellipse(-8,0,3,3)
            layer.fill(200,50,0,fade)
            layer.triangle(0,4,-2,-2,2,-2)
        break
        case 486:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.fill(200,255,255,fade)
            layer.noStroke()
            layer.triangle(-2,2,2,2,0,-3)
            layer.noStroke()
            layer.fill(75,fade)
            layer.rect(-5,0,2)
        break
        case 487:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.fill(255,125,0,fade)
            layer.triangle(-2,-2,-2,2,4,0)
            layer.triangle(-2.5,0,-4,-1,-4,1)
        break
        case 488:
            layer.scale(0.8)
            layer.fill(255,100,150,fade)
            layer.stroke(255,125,175,fade)
            layer.strokeWeight(1.2)
            layer.strokeJoin(ROUND)
            regStarGear(layer,0,0,6,2,5.6,5.6,7.2,7.2,30)  
            layer.strokeJoin(MITER)
            layer.noStroke()
            layer.fill(255,150,200,fade)
            layer.ellipse(0,0,4.8)
            for(let a=0,la=3;a<la;a++){
                layer.quad(-1.2,-3.4,1.2,-3.4,0.4,-4.8,-0.4,-4.8)
                layer.rotate(120)
            }
            layer.scale(1.25)
            layer.fill(200,fade)
            layer.triangle(0,-1.5,0,1.5,6,0)
        break
        case 489:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.fill(40,120,40,fade)
            layer.ellipse(-1.2,0,1.6)
            layer.fill(40,fade)
            layer.ellipse(1,-2,1.2)
            layer.ellipse(1,0,1.2)
            layer.ellipse(1,2,1.2)
        break
        case 490:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(-3.5,0,4.5,6,1)
            layer.rect(3.5,0,4.5,6,1)
            layer.noStroke()
            layer.fill(40,120,40,fade)
            layer.ellipse(-4.7,0,1.6)
            layer.fill(40,fade)
            layer.ellipse(-2.5,-2,1.2)
            layer.ellipse(-2.5,0,1.2)
            layer.ellipse(-2.5,2,1.2)
        break
        case 491:
            layer.fill(150,0,0,fade)
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(sin(a/la*360)*(6-a%2*3.6),cos(a/la*360)*(6-a%2*3.6))
            }
            layer.endShape()
            layer.triangle(0,6.5,-1,9.5,1,9.5)
            layer.triangle(0,10,-1,13,1,13)
        break
        case 492:
            layer.scale(0.8)
            layer.fill(255,100,150,fade)
            layer.stroke(255,125,175,fade)
            layer.strokeWeight(1.2)
            layer.strokeJoin(ROUND)
            regStarGear(layer,0,0,6,2,5.6,5.6,7.2,7.2,30)  
            layer.strokeJoin(MITER)
            layer.noStroke()
            layer.fill(255,150,200,fade)
            layer.ellipse(0,0,4.8)
            for(let a=0,la=3;a<la;a++){
                layer.quad(-1.2,-3.4,1.2,-3.4,0.4,-4.8,-0.4,-4.8)
                layer.rotate(120)
            }
            layer.scale(1.25)
            layer.stroke(255,175,225,fade)
            layer.strokeWeight(1)
            for(let a=0,la=12;a<la;a++){
                layer.line(lsin(a*30)*3,lcos(a*30)*3,lsin(a*30)*6,lcos(a*30)*6)
            }
        break
        case 493:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.fill(50,200,255,fade)
            layer.triangle(-2,4,2,4,0,7)
            layer.fill(100,255,150,fade)
            layer.triangle(-2,6,2,6,0,9)
        break
        case 494:
            layer.fill(150,fade)
            layer.triangle(0,0,-6,0,0,-6)
            layer.triangle(0,0,6,0,0,6)
            layer.fill(125,fade)
            layer.triangle(0,0,-6,0,0,6)
            layer.triangle(0,0,6,0,0,-6)
            layer.fill(200,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
            layer.triangle(-4,1,-5,1,-4.5,-1)
            layer.triangle(4,1,5,1,4.5,-1)
        break
        case 495:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(225,fade)
            layer.rect(0,0,7.5,7.5,1.5)
            layer.fill(40,fade)
            layer.ellipse(-2.25,0,1.5)
            layer.ellipse(-2.25,-2.25,1.5)
            layer.ellipse(-2.25,2.25,1.5)
            layer.ellipse(2.25,0,1.5)
            layer.ellipse(2.25,-2.25,1.5)
            layer.ellipse(2.25,2.25,1.5)
        break
        case 496:
            layer.stroke(150,255,100,fade)
            layer.strokeWeight(1)
            layer.bezier(-5,0,-3,-3.5,3,-3.5,5,0)
            layer.bezier(-5,0,-3,3.5,3,3.5,5,0)
            layer.strokeWeight(3)
            layer.point(0,0)
            layer.fill(150,255,100,fade)
            layer.noStroke()
            layer.triangle(0,3.5,-1,5,1,5)
        break
        case 497:
            layer.fill(150,200,100,fade)
            layer.stroke(125,175,75,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.fill(200,255,150)
            layer.ellipse(0,0,4)
            layer.quad(0.6,-0.6,-3.6,-3.6,-0.6,0.6,3.6,3.6)
            layer.fill(150,200,100,fade)
            layer.noStroke()
            layer.triangle(0,4,-1,5.5,1,5.5)
        break
        case 498:
            layer.fill(150,200,100,fade)
            layer.stroke(125,175,75,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.fill(200,255,150)
            layer.ellipse(0,0,4)
            layer.quad(0.6,-0.6,-3.6,-3.6,-0.6,0.6,3.6,3.6)
            layer.fill(150,200,100,fade)
            layer.noStroke()
            layer.triangle(0,4,-1,5.5,1,5.5)
            layer.triangle(0,6,-1,7.5,1,7.5)
        break
        case 499:
            layer.fill(200,255,255,fade)
            layer.quad(-5,0,0,-6.25,5,0,0,6.25)
            layer.fill(225,255,255,fade)
            layer.quad(-4,0,0,-5,4,0,0,5)
            layer.noFill()
            layer.stroke(150,200,255,fade)
            layer.strokeWeight(1)
            layer.bezier(-5,0,-3,-3.5,3,-3.5,5,0)
            layer.bezier(-5,0,-3,3.5,3,3.5,5,0)
            layer.strokeWeight(3)
            layer.point(0,0)
        break
        case 500:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1.5)
            layer.rect(0,0,6,8,1.5)
            layer.noFill()
            layer.stroke(150,200,255,fade)
            layer.strokeWeight(1)
            layer.bezier(-5,0,-3,-3.5,3,-3.5,5,0)
            layer.bezier(-5,0,-3,3.5,3,3.5,5,0)
            layer.strokeWeight(3)
            layer.point(0,0)
        break
        case 501:
            displayMtgManaSymbol(layer,0,0,6,0,0.4,fade,-1,[])
        break
        case 502:
            displayMtgManaSymbol(layer,0,0,1,0,0.4,fade,-1,[])
        break
        case 503:
            displayMtgManaSymbol(layer,0,0,2,0,0.4,fade,-1,[])
        break
        case 504:
            displayMtgManaSymbol(layer,0,0,3,0,0.4,fade,-1,[])
        break
        case 505:
            displayMtgManaSymbol(layer,0,0,4,0,0.4,fade,-1,[])
        break
        case 506:
            displayMtgManaSymbol(layer,0,0,5,0,0.4,fade,-1,[])
        break
        case 507:
            displayMtgManaSymbol(layer,0,0,0,0,0.4,fade,-1,[])
        break
        case 508:
            layer.fill(150,0,0,fade)
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(lsin(360*a/la)*(6-a%2*3),lcos(360*a/la)*(6-a%2*3))
            }
            layer.endShape()
            displayMtgManaSymbol(layer,0,0,6,0,0.4,fade,-1,[])
        break
        case 509:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.fill(200,255,255,fade)
            layer.triangle(0,0,-2,-2,-2,2)
            layer.triangle(0,0,2,-2,2,2)
        break
        case 510:
            layer.stroke(175,fade)
            layer.strokeWeight(1)
            layer.line(-4,-4,4,4)
            layer.line(-4,4,4,-4)
            layer.line(-4,-4,-4,4)
            layer.line(4,4,4,-4)
            layer.line(-4,-4,0,-4)
            layer.line(4,4,0,4)
            layer.noStroke()
            layer.fill(255,50,50,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.rect(-3,0,3,3)
        break
        case 511:
            layer.fill(200,25,25,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.fill(150,175,200,fade)
            layer.triangle(-9,0,4.5,-3,4.5,3)
        break
        case 512:
            layer.fill(60,fade)
            layer.rect(0,0,4,1.2)
            layer.rect(0,-2,7,1.2)
            layer.rect(0,2,7,1.2)
            layer.rect(0,-4,4,1.2)
            layer.rect(0,4,4,1.2)
            layer.fill(255,50,50,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.rect(-3,0,3,3)
        break
        case 513:
            layer.fill(60,fade)
            layer.rect(0,0,4,1.2)
            layer.rect(0,-2,7,1.2)
            layer.rect(0,2,7,1.2)
            layer.rect(0,-4,4,1.2)
            layer.rect(0,4,4,1.2)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
        break
        case 514:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.fill(200,fade)
            layer.triangle(-3.5,0,-5,-1,-5,1)
            layer.fill(50,255,255,fade)
            layer.triangle(5,0,3.5,-1,3.5,1)
        break
        case 515:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.fill(200,fade)
            layer.triangle(-3.5,0,-5,-1,-5,1)
            layer.fill(200,fade)
            layer.triangle(5,0,3.5,-1,3.5,1)
        break
        case 516:
            for(let a=0,la=10;a<la;a++){
                layer.fill(255,200*a/la,200*a/la,fade)
                layer.arc(0,0,10,10,a*36,a*36+36)
            }
            displayMtgManaSymbol(layer,0,0,6,0,0.3,fade,-1,[])
        break
        case 517:
            layer.fill(225,fade)
            layer.ellipse(0,0,8)
            layer.rotate(-22.5)
            for(let a=0,la=8;a<la;a++){
                layer.triangle(-1,3,1,3,0,8)
                layer.rotate(45)
            }
            layer.rotate(22.5)
            layer.fill(200,fade)
            layer.triangle(0,-1.5,0,1.5,6,0)
        break
        case 518:
            displayMtgManaSymbol(layer,0,0,-1,0,0.4,fade,-1,[])
        break
        case 519:
            layer.fill(150,fade)
            layer.triangle(0,0,-6,0,0,-6)
            layer.triangle(0,0,6,0,0,6)
            layer.fill(125,fade)
            layer.triangle(0,0,-6,0,0,6)
            layer.triangle(0,0,6,0,0,-6)
            layer.fill(200,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
            layer.triangle(-4,-1,-5,-1,-4.5,1)
            layer.triangle(4,-1,5,-1,4.5,1)
        break
        case 520:
            layer.fill(150,fade)
            layer.triangle(0,0,-4,0,0,-4)
            layer.triangle(0,0,4,0,0,4)
            layer.fill(125,fade)
            layer.triangle(0,0,-4,0,0,4)
            layer.triangle(0,0,4,0,0,-4)
            layer.stroke(200,fade)
            layer.strokeWeight(1)
            layer.noFill()
            layer.rect(0,0,10)
        break
        case 521:
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
            layer.fill(255,50,50,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.ellipse(0,-6,4,4)
        break
        case 522:
            layer.fill(0,fade)
            layer.ellipse(0,0,9,9)
            for(let a=0,la=10;a<la;a++){
                layer.rotate(36)
                layer.triangle(-0.5,-4,0.5,-4,0,-6)
            }
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
        break
        case 523:
            displayMtgManaSymbol(layer,0,0,6,0,0.4,fade,-1,[])
            layer.fill(30,fade)
            layer.triangle(0,-5,-1,-7,1,-7)
        break
        case 524:
            displayMtgManaSymbol(layer,0,0,1,0,0.4,fade,-1,[])
            layer.fill(240,240,120,fade)
            layer.triangle(0,-5,-1,-7,1,-7)
        break
        case 525:
            displayMtgManaSymbol(layer,0,0,2,0,0.4,fade,-1,[])
            layer.fill(60,150,240,fade)
            layer.triangle(0,-5,-1,-7,1,-7)
        break
        case 526:
            displayMtgManaSymbol(layer,0,0,3,0,0.4,fade,-1,[])
            layer.fill(120,30,120,fade)
            layer.triangle(0,-5,-1,-7,1,-7)
        break
        case 527:
            displayMtgManaSymbol(layer,0,0,4,0,0.4,fade,-1,[])
            layer.fill(60,240,60,fade)
            layer.triangle(0,-5,-1,-7,1,-7)
        break
        case 528:
            displayMtgManaSymbol(layer,0,0,5,0,0.4,fade,-1,[])
            layer.fill(240,60,60,fade)
            layer.triangle(0,-5,-1,-7,1,-7)
        break
        case 529:
            displayMtgManaSymbol(layer,0,0,0,0,0.4,fade,-1,[])
            layer.fill(30,fade)
            layer.triangle(0,-5,-1,-7,1,-7)
        break
        case 530:
            displayMtgManaSymbol(layer,0,0,6,0,0.4,fade,-1,[])
            layer.fill(30,fade)
            layer.triangle(0,-5,-1,-7,1,-7)
            layer.triangle(0,-7.5,-1,-9.5,1,-9.5)
        break
        case 531:
            displayMtgManaSymbol(layer,0,0,1,0,0.4,fade,-1,[])
            layer.fill(240,240,120,fade)
            layer.triangle(0,-5,-1,-7,1,-7)
            layer.triangle(0,-7.5,-1,-9.5,1,-9.5)
        break
        case 532:
            displayMtgManaSymbol(layer,0,0,2,0,0.4,fade,-1,[])
            layer.fill(60,150,240,fade)
            layer.triangle(0,-5,-1,-7,1,-7)
            layer.triangle(0,-7.5,-1,-9.5,1,-9.5)
        break
        case 533:
            displayMtgManaSymbol(layer,0,0,3,0,0.4,fade,-1,[])
            layer.fill(120,30,120,fade)
            layer.triangle(0,-5,-1,-7,1,-7)
            layer.triangle(0,-7.5,-1,-9.5,1,-9.5)
        break
        case 534:
            displayMtgManaSymbol(layer,0,0,4,0,0.4,fade,-1,[])
            layer.fill(60,240,60,fade)
            layer.triangle(0,-5,-1,-7,1,-7)
            layer.triangle(0,-7.5,-1,-9.5,1,-9.5)
        break
        case 535:
            displayMtgManaSymbol(layer,0,0,5,0,0.4,fade,-1,[])
            layer.fill(240,60,60,fade)
            layer.triangle(0,-5,-1,-7,1,-7)
            layer.triangle(0,-7.5,-1,-9.5,1,-9.5)
        break
        case 536:
            displayMtgManaSymbol(layer,0,0,0,0,0.4,fade,-1,[])
            layer.fill(30,fade)
            layer.triangle(0,-5,-1,-7,1,-7)
            layer.triangle(0,-7.5,-1,-9.5,1,-9.5)
        break
        case 537:
            layer.fill(225,fade)
            layer.rect(-3,0,10,10,2)
            layer.fill(40,fade)
            layer.ellipse(-3,0,3,3)
            displayMtgManaSymbol(layer,0,0,6,0,0.4,fade,-1,[])
        break
        case 538:
            layer.fill(225,fade)
            layer.rect(-3,0,10,10,2)
            layer.fill(40,fade)
            layer.ellipse(-6,0,2)
            layer.ellipse(-6,-3,2)
            layer.ellipse(-6,3,2)
            layer.ellipse(0,0,2)
            layer.ellipse(0,-3,2)
            layer.ellipse(0,3,2)
            displayMtgManaSymbol(layer,0,0,6,0,0.4,fade,-1,[])
        break
        case 539:
            displayMtgManaSymbol(layer,0,-3,-1,0,0.4,fade,-1,[])
            displayMtgManaSymbol(layer,0,3,1,0,0.4,fade,-1,[])
        break
        case 540:
            displayMtgManaSymbol(layer,0,-3,-1,0,0.4,fade,-1,[])
            displayMtgManaSymbol(layer,0,3,2,0,0.4,fade,-1,[])
        break
        case 541:
            displayMtgManaSymbol(layer,0,-3,-1,0,0.4,fade,-1,[])
            displayMtgManaSymbol(layer,0,3,3,0,0.4,fade,-1,[])
        break
        case 542:
            displayMtgManaSymbol(layer,0,-3,-1,0,0.4,fade,-1,[])
            displayMtgManaSymbol(layer,0,3,4,0,0.4,fade,-1,[])
        break
        case 543:
            displayMtgManaSymbol(layer,0,-3,-1,0,0.4,fade,-1,[])
            displayMtgManaSymbol(layer,0,3,5,0,0.4,fade,-1,[])
        break
        case 544:
            layer.fill(180,0,0,fade)
            layer.quad(0,5,-0.8,0,0,-5,0.8,0)
            layer.quad(-1,5,-2,0.4,-4,-4,-3,0.6)
            layer.quad(1,5,2,0.4,4,-4,3,0.6)
        break
        case 545:
            layer.fill(150,175,200,fade)
            layer.quad(0,-3,-3,0,0,3,3,0)
            layer.ellipse(-4,-4,3,3)
            layer.ellipse(-4,4,3,3)
            layer.ellipse(4,-4,3,3)
            layer.ellipse(4,4,3,3)
            layer.triangle(-1.5,-4,1.5,-4,0,-6)
            layer.triangle(-1.5,4,1.5,4,0,6)
        break
        case 546:
            layer.fill(150,175,200,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.triangle(0,-3.5,-1,-6.5,1,-6.5)
        break
        case 547:
            layer.stroke(255,fade)
            layer.strokeWeight(0.8)
            layer.arc(0,0,10,10,-165,-105)
            layer.arc(0,0,10,10,-75,-15)
            layer.arc(0,0,10,10,15,75)
            layer.arc(0,0,10,10,105,165)
            layer.noStroke()
            layer.fill(0,150,255,fade)
            layer.rect(-2,0,6,2)
            layer.triangle(1,-3,1,3,5,0)
        break
        case 548:
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.quad(-9,0,-8,-2,-7,0,-8,2)
            layer.triangle(-1,4.5,1,4.5,0,6)
        break
        case 549:
            layer.fill(200,0,0,fade)
            layer.arc(0,0,8,8,-45,225)
            layer.quad(0,0,sqrt(2)*2,-sqrt(2)*2,0,-sqrt(2)*4,-sqrt(2)*2,-sqrt(2)*2)
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.quad(-9,0,-8,-2,-7,0,-8,2)
        break
        case 550:
            layer.fill(200,0,0,fade)
            layer.arc(0,0,8,8,-45,225)
            layer.quad(0,0,sqrt(2)*2,-sqrt(2)*2,0,-sqrt(2)*4,-sqrt(2)*2,-sqrt(2)*2)
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.quad(-9,0,-8,-2,-7,0,-8,2)
            layer.triangle(-1,4.5,1,4.5,0,6)
        break
        case 551:
            layer.fill(255,50,50,fade)
            layer.rect(-1,-2.5,4,4)
            layer.arc(1,-2.5,6,4,-90,90)
            layer.rect(1,2.5,4,4)
            layer.arc(-1,2.5,6,4,90,270)
            layer.quad(-9,0,-8,-2,-7,0,-8,2)
        break
        case 552:
            layer.fill(255,50,50,fade)
            layer.rect(-1,-2.5,4,4)
            layer.arc(1,-2.5,6,4,-90,90)
            layer.rect(1,2.5,4,4)
            layer.arc(-1,2.5,6,4,90,270)
            layer.quad(-9,0,-8,-2,-7,0,-8,2)
            layer.triangle(-1,4.5,1,4.5,0,6)
        break
        case 553:
            layer.fill(150,0,0,fade)
            layer.rect(-3,0,4,3)
            layer.triangle(6,0,-1,6,-1,-6)
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
        break
        case 554:
            layer.fill(255,50,50,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
            layer.fill(150,0,0,fade)
            layer.arc(0,0,6,6,0,180)
            layer.triangle(-3,0,-2.25,-4,-1.5,0)
            layer.triangle(3,0,2.25,-4,1.5,0)
            layer.triangle(-1.5,0,1.5,0,0,-6)
        break
        case 555:
            layer.fill(255,50,50,fade)
            layer.triangle(-0.25,-4,-4.25,0,-0.25,4)
            layer.triangle(0.25,-4,4.25,0,0.25,4)
            layer.triangle(0,-7,-1.5,-4.5,1.5,-4.5)
        break
        case 556:
            layer.fill(255,50,50,fade)
            layer.rect(0,0,1,8)
            layer.triangle(-1,-4,-5,0,-1,4)
            layer.triangle(1,-4,5,0,1,4)
            layer.triangle(0,-7,-1.5,-4.5,1.5,-4.5)
        break
        case 557:
            layer.fill(255,50,50,fade)
            layer.rect(-0.75,0,1,8)
            layer.rect(0.75,0,1,8)
            layer.triangle(-1.75,-4,-5.75,0,-1.75,4)
            layer.triangle(1.75,-4,5.75,0,1.75,4)
            layer.triangle(0,-7,-1.5,-4.5,1.5,-4.5)
        break
        case 558:
            layer.fill(255,50,50,fade)
            layer.rect(-1.5,0,1,8)
            layer.rect(-1,0,1,8)
            layer.rect(1.5,0,1,8)
            layer.triangle(-2.5,-4,-6.5,0,-2.5,4)
            layer.triangle(2.5,-4,6.5,0,2.5,4)
            layer.triangle(0,-7,-1.5,-4.5,1.5,-4.5)
        break
        case 559:
            layer.fill(200,0,0,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
            layer.triangle(6.5,-1.5,6.5,1.5,8.5,0)
        break
        case 560:
            layer.fill(150,0,0,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.rect(2.5,0,5,2)
                layer.triangle(8,0,5,-2,5,2)
            }
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
        break
        case 561:
            layer.fill(225,fade)
            layer.ellipse(0,0,8)
            layer.rotate(-22.5)
            for(let a=0,la=8;a<la;a++){
                layer.triangle(-1,3,1,3,0,8)
                layer.rotate(45)
            }
            layer.rotate(22.5)
            layer.triangle(0,6,-1.5,8,1.5,8)
            layer.fill(150,fade)
            layer.ellipse(0,0,5)
        break
        case 562:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.noFill()
            layer.stroke(255,255,200,fade)
            layer.strokeWeight(0.5)
            regStar(layer,0,0,4,5,5,2,2,0)
        break
        case 563:
            layer.fill(255,50,50,fade)
            layer.triangle(-2,-6,-4,3,0,3)
            layer.ellipse(3,0,4,4)
            layer.fill(125,fade)
            layer.stroke(100,fade)  
            layer.strokeWeight(1)
            layer.rect(0,-0.5,4.5,6,1)
            layer.noStroke()
            layer.fill(200,255,255,fade)
            layer.quad(0,-2,-1,0,0,2,1,0)
            layer.quad(-2.5,-2,-3.5,0,-2.5,2,-1.5,0)
            layer.quad(2.5,-2,3.5,0,2.5,2,1.5,0)
        break
        case 564:
            layer.fill(150,175,200,fade)
            layer.triangle(-5,-3,5,-3,0,-6)
            layer.arc(0,-3,10,16,0,180)
            layer.fill(125,fade)
            layer.stroke(100,fade)  
            layer.strokeWeight(1)
            layer.rect(0,-0.5,4.5,6,1)
            layer.noStroke()
            layer.fill(200,255,255,fade)
            layer.quad(0,-2,-1,0,0,2,1,0)
            layer.quad(-2.5,-2,-3.5,0,-2.5,2,-1.5,0)
            layer.quad(2.5,-2,3.5,0,2.5,2,1.5,0)
        break
        case 565:
            layer.stroke(60,fade)
            layer.strokeWeight(0.5)
            layer.rect(-2,-2,3,3)
            layer.rect(2,-2,3,3)
            layer.rect(-2,2,3,3)
            layer.rect(2,2,3,3)
            layer.rect(0,0,9,9)
            displayMtgManaSymbol(layer,0,0,0,0,0.4,fade,-1,[])
        break
        case 566:
            layer.fill(60,fade)
            layer.triangle(-0.25,-4,-5.25,0,-0.25,4)
            layer.triangle(0.25,-4,5.25,0,0.25,4)
            displayMtgManaSymbol(layer,0,0,6,0,0.3,fade,-1,[])
        break
        case 567:
            layer.fill(60,fade)
            layer.rect(0,0,1,8)
            layer.triangle(-1,-4,-6,0,-1,4)
            layer.triangle(1,-4,6,0,1,4)
            displayMtgManaSymbol(layer,0,0,6,0,0.3,fade,-1,[])
        break
        case 568:
            layer.fill(60,fade)
            layer.triangle(-0.25,-4,-5.25,0,-0.25,4)
            layer.triangle(0.25,-4,5.25,0,0.25,4)
            displayMtgManaSymbol(layer,0,0,1,0,0.3,fade,-1,[])
        break
        case 569:
            layer.fill(60,fade)
            layer.rect(0,0,1,8)
            layer.triangle(-1,-4,-6,0,-1,4)
            layer.triangle(1,-4,6,0,1,4)
            displayMtgManaSymbol(layer,0,0,1,0,0.3,fade,-1,[])
        break
        case 570:
            layer.fill(60,fade)
            layer.triangle(-0.25,-4,-5.25,0,-0.25,4)
            layer.triangle(0.25,-4,5.25,0,0.25,4)
            displayMtgManaSymbol(layer,0,0,2,0,0.3,fade,-1,[])
        break
        case 571:
            layer.fill(60,fade)
            layer.rect(0,0,1,8)
            layer.triangle(-1,-4,-6,0,-1,4)
            layer.triangle(1,-4,6,0,1,4)
            displayMtgManaSymbol(layer,0,0,2,0,0.3,fade,-1,[])
        break
        case 572:
            layer.fill(60,fade)
            layer.triangle(-0.25,-4,-5.25,0,-0.25,4)
            layer.triangle(0.25,-4,5.25,0,0.25,4)
            displayMtgManaSymbol(layer,0,0,3,0,0.3,fade,-1,[])
        break
        case 573:
            layer.fill(60,fade)
            layer.rect(0,0,1,8)
            layer.triangle(-1,-4,-6,0,-1,4)
            layer.triangle(1,-4,6,0,1,4)
            displayMtgManaSymbol(layer,0,0,3,0,0.3,fade,-1,[])
        break
        case 574:
            layer.fill(60,fade)
            layer.triangle(-0.25,-4,-5.25,0,-0.25,4)
            layer.triangle(0.25,-4,5.25,0,0.25,4)
            displayMtgManaSymbol(layer,0,0,4,0,0.3,fade,-1,[])
        break
        case 575:
            layer.fill(60,fade)
            layer.rect(0,0,1,8)
            layer.triangle(-1,-4,-6,0,-1,4)
            layer.triangle(1,-4,6,0,1,4)
            displayMtgManaSymbol(layer,0,0,4,0,0.3,fade,-1,[])
        break
        case 576:
            layer.fill(60,fade)
            layer.triangle(-0.25,-4,-5.25,0,-0.25,4)
            layer.triangle(0.25,-4,5.25,0,0.25,4)
            displayMtgManaSymbol(layer,0,0,5,0,0.3,fade,-1,[])
        break
        case 577:
            layer.fill(60,fade)
            layer.rect(0,0,1,8)
            layer.triangle(-1,-4,-6,0,-1,4)
            layer.triangle(1,-4,6,0,1,4)
            displayMtgManaSymbol(layer,0,0,5,0,0.3,fade,-1,[])
        break
        case 578:
            layer.fill(60,fade)
            layer.triangle(-0.25,-4,-5.25,0,-0.25,4)
            layer.triangle(0.25,-4,5.25,0,0.25,4)
            displayMtgManaSymbol(layer,0,0,0,0,0.3,fade,-1,[])
        break
        case 579:
            layer.fill(60,fade)
            layer.rect(0,0,1,8)
            layer.triangle(-1,-4,-6,0,-1,4)
            layer.triangle(1,-4,6,0,1,4)
            displayMtgManaSymbol(layer,0,0,0,0,0.3,fade,-1,[])
        break
        case 580:
            displayMtgManaSymbol(layer,0,0,6,0,0.3,fade,-1,[])
            layer.noFill()
            layer.stroke(150,200,255,fade)
            layer.strokeWeight(1)
            layer.bezier(-5,0,-3,-3.5,3,-3.5,5,0)
            layer.bezier(-5,0,-3,3.5,3,3.5,5,0)
            layer.strokeWeight(3)
            layer.point(0,0)
        break
        case 581:
            displayMtgManaSymbol(layer,0,0,6,0,0.4,fade,2,[1])
        break
        case 582:
            displayMtgManaSymbol(layer,0,0,6,0,0.4,fade,2,[1])
            layer.fill(40,fade)
            layer.triangle(0,-7,-1,-9,1,-9)
        break
        case 583:
            layer.fill(0,150,255,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.rect(-3,-2,3,3)
            layer.quad(-4.5,0,-3,1.5,-1.5,0,-3,-1.5)
        break
        case 584:
            displayMtgManaSymbol(layer,0,0,4,0,0.3,fade,-1,[])
            layer.noFill()
            layer.stroke(255,fade)
            layer.strokeWeight(0.8)
            layer.arc(0,0,10,10,-165,-105)
            layer.arc(0,0,10,10,-75,-15)
            layer.arc(0,0,10,10,15,75)
            layer.arc(0,0,10,10,105,165)
        break

    }
    //mark s
    layer.pop()
}
function displayMtgManaIcon(layer,x,y,type,direction,size,fade){
    layer.push()
    layer.translate(x,y)
    layer.rotate(direction)
    layer.scale(size)
    layer.strokeJoin(ROUND)
    layer.noFill()
    layer.strokeWeight(2)
    switch(type){
        case -1:
            layer.stroke(160,150,130,fade)
            layer.quad(-5,0,0,-5,5,0,0,5)
        break
        case 0:
            layer.stroke(120,fade)
            layer.rect(-1.5,1.5,7)
            layer.quad(-5,-2,-2,-5,5,-5,2,-2)
            layer.quad(2,5,5,2,5,-5,2,-2)
        break
        case 1:
            layer.stroke(160,160,80,fade)
            layer.line(0,-6,0,6)
            layer.line(-3*sqrt(3),-3,+3*sqrt(3),3)
            layer.line(-3*sqrt(3),3,+3*sqrt(3),-3)
        break
        case 2:
            layer.stroke(40,100,160,fade)
            layer.arc(0,0,8,8,-45,225)
            layer.beginShape()
            layer.vertex(-2*sqrt(2),-2*sqrt(2))
            layer.vertex(0,-4*sqrt(2))
            layer.vertex(2*sqrt(2),-2*sqrt(2))
            layer.endShape()
        break
        case 3:
            layer.stroke(80,20,80,fade)
            layer.arc(0,0,10,10,-270,45)
            layer.line(0,0,0,5.8)
        break
        case 4:
            layer.stroke(40,160,40,fade)
            regPoly(layer,0,0,6,5,5,30)
            layer.line(2.5,-2.5*sqrt(3),-2.5,2.5*sqrt(3))
        break
        case 5:
            layer.stroke(160,40,40,fade)
            layer.quad(-3,0,0,-6,3,0,0,6)
        break
        case 6:
            layer.stroke(250,fade)
            regStar(layer,0,0,5,2.5,2.5,6,6,0)
        break
    }
    layer.strokeJoin(MITER)
    layer.strokeCap(ROUND)
    layer.pop()
}
function displayMtgManaSymbol(layer,x,y,type,direction,size,fade,variant=-1,args=[]){
    layer.push()
    layer.translate(x,y)
    layer.rotate(direction)
    layer.scale(size)
    layer.strokeCap(SQUARE)
    switch(variant){
        case 0:
            layer.noStroke()
            if(args[1]>0){
                layer.fill(100,255,255,args[1]*fade*0.5)
                layer.arc(0,0,20,25,45,135)
                layer.arc(0,0,20,25,55,125)
                layer.arc(0,0,20,25,65,115)
            }
            if(args[2]>0){
                layer.fill(100,255,255,args[2]*fade*0.5)
                layer.arc(0,0,20,25,-135,-45)
                layer.arc(0,0,20,25,-125,-55)
                layer.arc(0,0,20,25,-115,-65)
            }
        break
        case 1:
            layer.noStroke()
            if(args[1]>0){
                layer.fill(100,255,255,args[1]*fade*0.5)
                layer.arc(0,0,17,22,45,135)
                layer.arc(0,0,17,22,55,125)
                layer.arc(0,0,17,22,65,115)
            }
            if(args[2]>0){
                layer.fill(100,255,255,args[2]*fade*0.5)
                layer.arc(0,0,17,22,-135,-45)
                layer.arc(0,0,17,22,-125,-55)
                layer.arc(0,0,17,22,-115,-65)
            }
        break
        case 2:
            layer.noStroke()
            if(args[0]>0){
                layer.fill(40,args[0]*fade)
                layer.ellipse(0,0,23.6)
            }
        break
    }
    let fill=[0,0,0]
    let stroke=[0,0,0]
    let map=[]
    switch(type){
        case 0: case -2: case -3:
            fill=[180,180,180]
            stroke=[140,140,140]
        break
        case -1:
            fill=[220,210,190]
            stroke=[180,170,150]
        break
        case 1:
            fill=[240,240,120]
            stroke=[200,200,100]
        break
        case 2:
            fill=[60,150,240]
            stroke=[50,125,200]
        break
        case 3:
            fill=[120,30,120]
            stroke=[100,25,100]
        break
        case 4:
            fill=[60,240,60]
            stroke=[50,200,50]
        break
        case 5:
            fill=[240,60,60]
            stroke=[200,50,50]
        break
        case 6:
            let gradient=[new p5.ConicGradient(0,0,0),new p5.ConicGradient(0,0,0),new p5.ConicGradient(0,0,0)]
            layer.colorMode(HSB,360,1,1,1)
            gradient[0].colors(0.0,
                layer.color(0,1,0.9,fade),1/6,
                layer.color(60,1,0.9,fade),1/3,
                layer.color(120,1,0.9,fade),1/2,
                layer.color(180,1,0.9,fade),2/3,
                layer.color(240,1,0.9,fade),5/6,
                layer.color(300,1,0.9,fade),1.0,
                layer.color(360,1,0.9,fade))
            gradient[1].colors(0.0,
                layer.color(0,1,1,fade),1/6,
                layer.color(60,1,1,fade),1/3,
                layer.color(120,1,1,fade),1/2,
                layer.color(180,1,1,fade),2/3,
                layer.color(240,1,1,fade),5/6,
                layer.color(300,1,1,fade),1.0,
                layer.color(360,1,1,fade))
            gradient[2].colors(0.0,
                layer.color(0,1,0.8,fade),1/6,
                layer.color(60,1,0.8,fade),1/3,
                layer.color(120,1,0.8,fade),1/2,
                layer.color(180,1,0.8,fade),2/3,
                layer.color(240,1,0.8,fade),5/6,
                layer.color(300,1,0.8,fade),1.0,
                layer.color(360,1,0.8,fade))
            layer.noStroke()
            layer.fill(0,fade)
            layer.fillGradient(gradient[0])
            layer.ellipse(0,0,21.5)
            layer.fillGradient(gradient[1])
            layer.ellipse(0,0,18.5)
            layer.fillGradient(gradient[2])
            for(let c=0,lc=5;c<lc;c++){
                layer.quad(lsin(c*72)*5.5,lcos(c*72)*5.5,lsin(c*72-18)*8,lcos(c*72-18)*8,lsin(c*72)*8.5,lcos(c*72)*8.5,lsin(c*72+18)*8,lcos(c*72+18)*8)
            }
            layer.colorMode(RGB,255,255,255,1)
        break
        case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16:
            map=mtgSplitColor(type)
        break
    }
    if(map.length>0){
        fill=[]
        stroke=[]
        for(let a=0,la=map.length;a<la;a++){
            fill.push([[180,180,180],[240,240,120],[60,150,240],[120,30,120],[60,240,60],[240,60,60]][map[a]])
            stroke.push([[140,140,140],[200,200,100],[50,125,200],[100,25,100],[50,200,50],[200,50,50]][map[a]])
        }
    }
    layer.strokeWeight(1.5)
    switch(type){
        case -2: case -3:
            layer.fill(...fill,fade)
            layer.stroke(...stroke,fade)
            switch(variant){
                case 1:
                    layer.rect(-4.5,-4.5,9)
                    layer.arc(0,0,18,18,-90,180)
                    layer.noStroke()
                    layer.ellipse(0,0,16)
                break
                default:
                    layer.ellipse(0,0,20)
                break
            }
            layer.fill(0,fade)
            layer.noStroke()
            layer.textSize(args[3]>=10?12:15)
            layer.text(type==-3?'X':args[3],0,1)
        break
        case -1: case 0: case 1: case 2: case 3: case 4: case 5:
            layer.fill(...fill,fade)
            layer.stroke(...stroke,fade)
            switch(variant){
                case 1:
                    layer.rect(-4.5,-4.5,9)
                    layer.arc(0,0,18,18,-90,180)
                    layer.noStroke()
                    layer.ellipse(0,0,16)
                break
                default:
                    layer.ellipse(0,0,20)
                break
            }
            displayMtgManaIcon(layer,0,0,type,0,1,fade)
            if(variant==1){
                layer.fill(0,fade)
                layer.noStroke()
                layer.textSize(args[3]>=10?12:15)
                layer.text(type==-3?'X':args[3],0,1)
            }
        break
        case 6:
            displayMtgManaIcon(layer,0,0,type,0,1,fade)
        break
        case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16:
            layer.fill(...fill[0],fade)
            layer.stroke(...stroke[0],fade)
            switch(variant){
                case 1:
                    layer.arc(0,0,18,18,-225,-45)
                    layer.noStroke()
                    layer.arc(0,0,16,16,-225,-45)
                break
                default:
                    layer.arc(0,0,20,20,-225,-45)
                break
            }
            layer.fill(...fill[1],fade)
            layer.stroke(...stroke[1],fade)
            switch(variant){
                case 1:
                    layer.rect(-4.5,-4.5,9)
                    layer.arc(0,0,18,18,-90,45)
                    layer.arc(0,0,18,18,135,180)
                    layer.noStroke()
                    layer.arc(0,0,16,16,-45,135)
                break
                default:
                    layer.arc(0,0,20,20,-45,135)
                break
            }
            displayMtgManaIcon(layer,-3.2,-3.2,map[0],0,0.5,1)
            displayMtgManaIcon(layer,3.2,3.2,map[1],0,0.5,1)
        break
    }
    switch(variant){
        case 0: case 1:
            if(args[0]<1){
                layer.stroke(0,(1-args[0])*fade)
                layer.strokeWeight(1.2)
                layer.noFill()
                switch(variant){
                    case 1:
                        layer.line(0,-9,-9,-9)
                        layer.line(-9,0,-9,-9)
                        layer.arc(0,0,18.3,18.3,-90,180)
                        layer.line(-6,-6,-9,-9)
                    break
                    default:
                        layer.ellipse(0,0,20.3)
                        layer.line(7,7,-7,-7)
                    break
                }
            }
        break
        case 3:
            if(args[0]>0){
                layer.stroke(200,255,200,args[0]*fade)
                layer.strokeWeight(1)
                layer.noFill()
                layer.ellipse(0,0,20.5)
            }
        break
    }
    layer.strokeCap(ROUND)
    layer.pop()
}
function displayOrb(layer,x,y,typeFades,detail,direction,size,fade,id){
    layer.push()
    layer.translate(x,y)
    layer.rotate(direction)
    layer.scale(size)
    layer.fill(255,fade/5)
    layer.noStroke()
    layer.ellipse(0,0,20)
    layer.fill(255,fade)
    layer.textSize(10)
    layer.text(id+1,0,20)
    for(let a=0,la=game.orbNumber;a<la;a++){
        if(typeFades[a]>0){
            switch(a){
                case 0:
                    layer.stroke(100,255,100,fade*typeFades[a])
                    layer.strokeWeight(3)
                    layer.line(-6,0,6,0)
                    layer.line(-3,-3*sqrt(3),3,3*sqrt(3))
                    layer.line(-3,3*sqrt(3),3,-3*sqrt(3))
                break
                case 1:
                    layer.noFill()
                    layer.stroke(100,255,255,fade*typeFades[a])
                    layer.strokeWeight(2)
                    layer.quad(-4,0,0,-4,4,0,0,4)
                    layer.strokeWeight(1)
                    layer.quad(-7,0,0,-7,7,0,0,7)
                break
                case 2:
                    layer.stroke(255,100,100,fade*typeFades[a])
                    layer.strokeWeight(3)
                    layer.line(-6,0,6,0)
                    layer.line(-2,-3,-2,3)
                    layer.line(2,-3,2,3)
                break
                case 3:
                    layer.noFill()
                    layer.stroke(255,255,100,fade*typeFades[a])
                    layer.strokeWeight(3)
                    layer.ellipse(0,0,10,10)
                break
                case 4:
                    layer.noFill()
                    layer.stroke(100,0,100,fade*typeFades[a])
                    layer.strokeWeight(1.5)
                    layer.triangle(4,0,-6,-2,-6,2)
                    layer.fill(255,fade*typeFades[a])
                    layer.noStroke()
                    layer.textSize(10)
                    layer.text(detail,0,0)
                break
                case 5:
                    layer.stroke(255,175,100,fade*typeFades[a])
                    layer.strokeWeight(3)
                    layer.line(-3,0,3,0)
                    layer.line(-3,0,0,-7)
                    layer.line(3,0,0,7)
                break
                case 6:
                    layer.noFill()
                    layer.stroke(255,255,100,fade*typeFades[a])
                    layer.strokeWeight(3)
                    regTriangle(layer,0,0,6,6,60)
                break
                case 7:
                    layer.stroke(150,0,0,fade*typeFades[a])
                    layer.strokeWeight(2)
                    layer.line(0,6,-6,2)
                    layer.line(0,6,6,2)
                    layer.line(-6,2,-3,-6)
                    layer.line(0,0,-3,-6)
                    layer.line(6,2,3,-6)
                    layer.line(0,0,3,-6)
                break
                case 8:
                    layer.noFill()
                    layer.stroke(200,255,255,fade*typeFades[a])
                    layer.strokeWeight(3)
                    regPoly(layer,0,0,5,6,6,36)
                    layer.strokeWeight(2)
                    layer.line(0,4,0,-6)
                break
                case 9:
                    layer.noFill()
                    layer.stroke(255,50,50,fade*typeFades[a])
                    layer.strokeWeight(3)
                    layer.triangle(0,-5,-4,4,4,4)
                break
                case 10:
                    layer.noFill()
                    layer.stroke(255,50,50,fade*typeFades[a])
                    layer.strokeWeight(3)
                    layer.triangle(0,5,-4,-4,4,-4)
                break
                case 11:
                    layer.stroke(150,175,50,fade*typeFades[a])
                    layer.strokeWeight(3)
                    layer.line(-3,-5,0,6)
                    layer.line(3,-5,0,6)
                    layer.line(-5,-2,0,6)
                    layer.line(5,-2,0,6)
                break
                case 12:
                    layer.fill(200,fade*typeFades[a]*0.5)
                    layer.ellipse(0,0,12)
                    layer.stroke(255,fade*typeFades[a]*0.5)
                    layer.strokeWeight(2)
                    layer.arc(0,0,8,8,-150,-120)
                break
            }
        }
    }
    layer.pop()
}
function displayPlayerSymbol(layer,x,y,type,direction,size,fade){
    layer.push()
    layer.translate(x,y)
    layer.rotate(direction)
    layer.scale(size)
    switch(type){
        case 1:
            layer.fill(0,50,100,fade)
        break
        case 2:
            layer.fill(125,200,125,fade)
        break
        case 3:
            layer.fill(255,175,175,fade)
        break
        case 4:
            layer.fill(100,0,150,fade)
        break
        case 5:
            layer.fill(255,200,100,fade)
        break
        case 6:
            layer.fill(100,225,255,fade)
        break
        case 7:
            layer.fill(200,50,150,fade)
        break
        case 8:
            layer.fill(150,255,150,fade)
        break
        case 9:
            layer.fill(240,80,60,fade)
        break
        case 10:
            layer.fill(180,180,80,fade)
        break
        case 11:
            layer.fill(200,200,255,fade)
        break
        case 12:
            layer.fill(240,80,100,fade)
        break
        case 13:
            layer.fill(240,180,60,fade)
        break
        case 14:
            layer.fill(80,0,100,fade)
        break
        case 15:
            layer.fill(80,200,160,fade)
        break
        case 16:
            layer.fill(240,240,180,fade)
        break
    }
    layer.ellipse(0,0,50)
    layer.fill(255,fade)
    switch(type){
        case 1:
            layer.beginShape()
            layer.vertex(-20,0)
            layer.vertex(0,-20/sqrt(3))
            layer.vertex(20,0)
            layer.vertex(10,-10*sqrt(3))
            layer.vertex(-10,-10*sqrt(3))
            layer.endShape()
            layer.beginShape()
            layer.vertex(-20,0)
            layer.vertex(0,20/sqrt(3))
            layer.vertex(20,0)
            layer.vertex(10,10*sqrt(3))
            layer.vertex(-10,10*sqrt(3))
            layer.endShape()
            layer.ellipse(0,0,10,10)
        break
        case 2:
            layer.rotate(45)
            layer.ellipse(0,0,32,42)
            layer.stroke(125,200,125,fade)
            layer.strokeWeight(3)
            layer.line(0,17,0,-8)
            layer.line(0,10,-8,5)
            layer.line(0,10,8,5)
            layer.line(0,0,-6,-3.75)
            layer.line(0,0,6,-3.75)
            layer.rotate(-45)
        break
        case 3:
            for(let a=0,la=5;a<la;a++){
                layer.beginShape()
                layer.vertex(0,0)
                layer.bezierVertex(-8,-7,-8,-14,-2,-21)
                layer.vertex(0,-18)
                layer.vertex(2,-21)
                layer.bezierVertex(8,-14,8,-7,0,0)
                layer.rotate(72)
                layer.endShape()
            }
            layer.fill(255,175,175,fade)
            layer.rotate(-12)
            for(let a=0;a<5;a++){
                layer.quad(0,-1,-1,-6,0,-10,1,-6)
                layer.rotate(72)
            }
            layer.ellipse(0,0,4,4)
        break
        case 4:
            for(let a=0,la=4;a<la;a++){
                layer.rotate(90)
                layer.triangle(-9,0,9,0,0,21)
                layer.triangle(-5,-5,5,5,11,-11)
            }
            layer.fill(100,0,150,fade)
            for(let a=0,la=4;a<la;a++){
                layer.rotate(90)
                layer.triangle(-4,0,4,0,0,8)
            }
        break
        case 5:
            for(let a=0,la=3;a<la;a++){
                layer.ellipse(lsin(a*120)*12,-lcos(a*120)*12,16,16)
            }
            layer.stroke(255,200,100,fade)
            layer.strokeWeight(2)
            layer.noFill()
            for(let a=0,la=3;a<la;a++){
                layer.rotate(120)
                layer.arc(0,-15,8,16,-90,75)
                layer.point(-3,-13)
            }
        break
        case 6:
            layer.rotate(24)
            layer.rect(0,0,5,16)
            for(let a=0,la=2;a<la;a++){
                layer.scale(1,-1)
                layer.beginShape()
                layer.vertex(0,-6)
                layer.vertex(-8,-10)
                layer.vertex(-8,-18)
                layer.vertex(-5.8,-19)
                layer.vertex(-3.6,-18)
                layer.vertex(-3.6,-14)
                layer.vertex(0,-12)
                layer.vertex(3.6,-14)
                layer.vertex(3.6,-18)
                layer.vertex(5.8,-19)
                layer.vertex(8,-18)
                layer.vertex(8,-10)
                layer.endShape()
            }
            regPoly(layer,-12,0,6,4,4,0)
            regPoly(layer,12,0,6,4,4,0)
        break
        case 7:
            layer.ellipse(-12,0,5,5)
            layer.ellipse(0,-12,5,5)
            layer.ellipse(12,0,5,5)
            layer.ellipse(0,12,5,5)
            layer.stroke(255,fade)
            layer.strokeWeight(2)
            layer.noFill()
            layer.ellipse(-10,0,20,20)
            layer.ellipse(0,-10,20,20)
            layer.ellipse(10,0,20,20)
            layer.ellipse(0,10,20,20)
        break
        case 8:
            layer.scale(1.2)
            layer.stroke(255,fade)
            layer.noFill()
            layer.strokeWeight(2)
            layer.ellipse(0,0,20,20)
            layer.strokeWeight(3)
            layer.arc(0,0,30,30,-135,-45)
            layer.arc(0,0,30,30,45,75)
            layer.arc(0,0,30,30,-255,-225)
            layer.line(3,-3,-3,3)
            layer.line(15*lcos(75),15*lsin(75),18*lcos(75),18*lsin(75))
            layer.line(-15*lcos(75),15*lsin(75),-18*lcos(75),18*lsin(75))
            layer.fill(255,fade)
            layer.noStroke()
            for(let a=0,la=5;a<la;a++){
                layer.ellipse(-14*lcos(-27+a*13.5),-14*lsin(-27+a*13.5),2.5,2.5)
                layer.ellipse(14*lcos(-27+a*13.5),14*lsin(-27+a*13.5),2.5,2.5)
            }
            for(let a=0,la=4;a<la;a++){
                layer.ellipse(-16.5*lcos(-20.25+a*13.5),-16.5*lsin(-20.25+a*13.5),2.5,2.5)
                layer.ellipse(16.5*lcos(-20.25+a*13.5),16.5*lsin(-20.25+a*13.5),2.5,2.5)
            }
        break
        case 9:
            layer.rotate(-18)
            layer.quad(0,-22,-8,-14,0,-6,8,-14)
            layer.beginShape()
            layer.vertex(0,-3)
            layer.vertex(3,-6)
            layer.vertex(6,15)
            layer.vertex(0,21)
            layer.vertex(-6,15)
            layer.vertex(-3,-6)
            layer.endShape()
            layer.fill(240,80,60,fade)
            layer.rect(3,0,8,1)
            layer.rect(3,2,8,1)
        break
        case 10:
            layer.arc(-12,2,16,16,90,270)
            layer.arc(12,2,16,16,-90,90)
            layer.arc(0,-12,16,16,-180,0)
            layer.triangle(-8,-12,8,-12,0,6)
            layer.triangle(-12,-6,-12,10,4,2)
            layer.triangle(12,-6,12,10,-4,2)
            layer.triangle(0,-4,4,20,-4,20)
            layer.fill(180,180,80,fade)
            layer.quad(-12,-2,-14,2,-12,6,-10,2)
            layer.quad(12,-2,14,2,12,6,10,2)
            layer.quad(0,-16,-2,-12,0,-8,2,-12)
        break
        case 11:
            layer.ellipse(0,-12,12)
            layer.noFill()
            layer.stroke(255,fade)
            layer.strokeWeight(3)
            layer.arc(0,18,15,60,-180,0)
            layer.arc(-6,3,15,42,-180,-75)
            layer.arc(6,3,15,42,-105,0)
            layer.fill(200,200,255,fade)
            layer.noStroke()
            layer.ellipse(0,-15,3)
            layer.ellipse(-2.5,-10.5,3)
            layer.ellipse(2.5,-10.5,3)
        break
        case 12:
            for(let a=0,la=5;a<la;a++){
                layer.rect(0,20,8,2)
                layer.rotate(72)
            }
            regPoly(layer,0,0,5,20,20,36)
            layer.fill(240,80,100,fade)
            regPoly(layer,0,0,5,18,18,36)
            layer.fill(255,fade)
            layer.ellipse(0,0,9)
            for(let a=0,la=5;a<la;a++){
                regPoly(layer,0,-10,3,5,5,60)
                layer.rotate(72)
            }
            layer.fill(240,80,100,fade)
            layer.ellipse(0,0,6.25)
            for(let a=0,la=5;a<la;a++){
                regPoly(layer,0,-10,3,2.5,2.5,60)
                layer.rotate(72)
            }
        break
        case 13:
            regPoly(layer,0,0,16,20,20,0)
            layer.fill(240,180,60,fade)
            layer.ellipse(0,0,25)
            for(let a=0,la=16;a<la;a++){
                layer.rotate(360/la)
                layer.triangle(-1.5,-12,1.5,-12,0,-16)
            }
            layer.fill(255,fade)
            layer.ellipse(0,0,4)
            layer.stroke(255,fade)
            layer.strokeWeight(2)
            layer.line(0,0,6,-2)
            layer.strokeWeight(1.5)
            layer.line(0,0,-5,8)
        break
        case 14:
            layer.quad(-18,0,0,-6,18,0,0,6)
            layer.quad(0,-9,-3,-8,0,-21,3,-8)
            layer.quad(0,9,-3,8,0,21,3,8)
            layer.triangle(-9,-6,-15,-4,-9,-18)
            layer.triangle(-9,6,-15,4,-9,18)
            layer.triangle(9,-6,15,-4,9,-18)
            layer.triangle(9,6,15,4,9,18)
            layer.fill(80,0,100,fade)
            layer.beginShape()
            layer.vertex(0,-3)
            layer.vertex(3,-2)
            layer.vertex(3,2)
            layer.vertex(0,3)
            layer.vertex(-3,2)
            layer.vertex(-3,-2)
            layer.endShape()
            layer.triangle(-4.5,-1.5,-4.5,1.5,-9,0)
            layer.triangle(4.5,-1.5,4.5,1.5,9,0)
            layer.fill(255,fade)
            layer.ellipse(0,0,2)
        break
        case 15:
            layer.rotate(45)
            for(let a=0,la=4;a<la;a++){
                layer.fill(255,fade)
                layer.arc(0,-10,20,10,90,270)
                layer.triangle(-15,-4,-15,4,-22.5,0)
                layer.fill(80,200,160,fade)
                layer.arc(-10,0,15,25,-220,25)
                layer.fill(255,fade)
                layer.arc(-10,0,10,20,-225,30)
                layer.rotate(90)
            }
            layer.fill(80,200,160,fade)
            for(let a=0,la=4;a<la;a++){
                layer.ellipse(-10,-2,4)
                layer.ellipse(-10,2,4)
                layer.beginShape()
                layer.vertex(-8,-2)
                layer.bezierVertex(-9,0,-9,0,-8,2)
                layer.vertex(-12,2)
                layer.bezierVertex(-11,0,-11,0,-12,-2)
                layer.endShape()
                layer.rotate(90)
            }
        break
        case 16:
            for(let a=0,la=6;a<la;a++){
                layer.quad(-3,-12,-17.75,-12,-21,-6,0.25,-6)
                layer.rotate(60)
            }
        break
    }
    layer.pop()
}
function displayIntentSymbol(layer,x,y,type,effect,direction,size,fade,info){
    layer.push()
    layer.translate(x,y)
    layer.rotate(direction)
    layer.scale(size)
    layer.noStroke()
    layer.noFill()
    switch(type){
        case 1:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 2:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,0,-2,0,2)
            layer.triangle(3,-3,-6,-5,-6,-1)
            layer.triangle(3,3,-6,1,-6,5)
        break
        case 3:
            layer.fill(255,50,50,fade)
            layer.rect(-3,0,4,3)
            layer.triangle(6,0,-1,-4,-1,4)
        break
        case 4:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
        break
        case 5:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,6,8,1)
        break
        case 6:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
        break
        case 7:
            layer.fill(255,50,50,fade)
            layer.rect(-3,0,4,3)
            layer.triangle(6,0,-1,-4,-1,4)
            layer.rect(-6,0,1,6)
        break
        case 8:
            layer.fill(255,200,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,6,8,1)
        break
        case 9:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
        break
        case 10:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.ellipse(-7,0,3,3)
        break
        case 11:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,0,-1,0,1)
            layer.triangle(6,-2,-3,-3,-3,-1)
            layer.triangle(6,2,-3,1,-3,3)
            layer.triangle(3,-4,-6,-5,-6,-3)
            layer.triangle(3,4,-6,3,-6,5)
        break
        case 12: case 362:
            layer.fill(255,50,50,fade)
            layer.rect(-1.5,0,6,6)
            layer.arc(1.5,0,9,6,-90,90)
        break
        case 13:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 14:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
        break
        case 15:
            layer.fill(200,25,25,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
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
        case 18:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
        break
        case 19:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,0,-2,0,2)
            layer.triangle(3,-3,-6,-5,-6,-1)
            layer.triangle(3,3,-6,1,-6,5)
            layer.rect(-7,0,1,6)
        break
        case 20:
            layer.fill(255,50,50,fade)
            layer.triangle(7,-3,-3.5,-5,-3.5,-1)
            layer.triangle(7,3,-3.5,1,-3.5,5)
            layer.rect(-4.5,0,1,6)
        break
        case 21:
            layer.fill(255,fade)
            layer.quad(0,-5,-5,0,0,5,5,0)
        break
        case 22:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 23:
            layer.fill(255,50,50,fade)
            layer.triangle(0,6,-3,-3,3,-3)
        break
        case 24:
            layer.fill(150,0,0,fade)
            layer.arc(0,0,8,8,-45,225)
            layer.quad(0,0,-2*sqrt(2),-2*sqrt(2),0,-4*sqrt(2),2*sqrt(2),-2*sqrt(2))
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
        break
        case 25:
            layer.fill(255,100,100,fade)
            layer.rect(0,0,3,12)
            layer.rect(0,0,12,3)
            layer.ellipse(0,9,3,3)
        break
        case 26:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.rect(0,4,6,1)
            layer.ellipse(0,7,3,3)
        break
        case 27:
            layer.fill(150,175,200,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 28:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
            layer.rect(-5.5,0,1,6)
        break
        case 29:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(225,fade)
            layer.rect(-3,0,9,3)
            layer.triangle(1,-3,1,3,5,0)
        break
        case 30:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
        break
        case 31:
            layer.fill(255,50,50,fade)
            layer.triangle(7,-3,-3.5,-5,-3.5,-1)
            layer.triangle(7,3,-3.5,1,-3.5,5)
        break
        case 32:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
        break
        case 33:
            layer.fill(255,50,50,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.rect(0,-4,6,1)
        break
        case 34:
            layer.fill(240,240,40,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,0,-2,0,2)
            layer.triangle(3,-3,-6,-5,-6,-1)
            layer.triangle(3,3,-6,1,-6,5)
        break
        case 35:
            layer.fill(240,240,40,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.rect(-3,0,4,3)
            layer.triangle(6,0,-1,-4,-1,4)
        break
        case 36:
            layer.fill(240,240,40,fade)
            layer.ellipse(0,0,10,10)
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,7,7)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 37:
            layer.stroke(240,240,40,fade)
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
            layer.rect(-5.5,0,1,6)
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
        case 48:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(225,fade)
            layer.rect(-2.25,0,7.5,3)
            layer.rect(-7,0,1,3)
            layer.triangle(1,-3,1,3,5,0)
        break
        case 49:
            layer.fill(255,50,50,fade)
            layer.rect(-1.5,0,6,6)
            layer.triangle(-4.5,-3,1.5,-3,3,-6)
            layer.triangle(-4.5,3,1.5,3,3,6)
            layer.arc(1.5,0,9,6,-90,90)
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
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
            layer.rect(-5.5,0,1,6)
        break
        case 54:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,8)
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
            layer.rect(-10,0,1,6)
            layer.triangle(10.5,6,7.5,-3,13.5,-3)
        break
        case 56:
            layer.fill(180,20,120,fade)
            layer.ellipse(-5,0,4,4)
            layer.ellipse(5,0,4,4)
            layer.fill(40,fade)
            layer.triangle(-0.5,-1.5,-0.5,1.5,-3,0)
            layer.triangle(0.5,-1.5,0.5,1.5,3,0)
        break
        case 57:
            layer.fill(180,20,120,fade)
            layer.ellipse(-5,0,4,4)
            layer.ellipse(5,0,4,4)
            layer.fill(40,fade)
            layer.triangle(-3,-1.5,-3,1.5,-0.5,0)
            layer.triangle(3,-1.5,3,1.5,0.5,0)
        break
        case 58:
            layer.fill(150,0,0,fade)
            layer.arc(0,0,8,8,-45,225)
            layer.quad(0,0,-2*sqrt(2),-2*sqrt(2),0,-4*sqrt(2),2*sqrt(2),-2*sqrt(2))
        break
        case 59:
            layer.fill(255,50,50,fade)
            layer.triangle(7,-3,-3.5,-5,-3.5,-1)
            layer.triangle(7,3,-3.5,1,-3.5,5)
            layer.ellipse(-6.5,-2.25,3,3)
            layer.ellipse(-6.5,2.25,3,3)
        break
        case 60:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
        break
        case 61:
            layer.fill(150,175,200,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.rect(0,-4,6,1)
        break
        case 62:
            layer.fill(0,150,255,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.rect(0,-4,6,1)
        break
        case 63:
            layer.fill(150,175,200,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.rect(0,4,6,1)
            layer.ellipse(0,7,3,3)
        break
        case 64:
            layer.fill(150,175,200,fade)
			layer.triangle(-3,-3,2,-3,2,-6)
			layer.arc(2,-3,10,16,90,180)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
        break
        case 65:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.ellipse(-7,0,3,3)
            layer.fill(225,fade)
            layer.rect(-3,0,9,3)
            layer.triangle(1,-3,1,3,5,0)
        break
        case 66:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.triangle(7,-3,-3.5,-5,-3.5,-1)
            layer.triangle(7,3,-3.5,1,-3.5,5)
            layer.rect(-4.5,0,1,6)
        break
        case 67:
            layer.scale(0.5)
            layer.stroke(0,fade)
            layer.strokeWeight(0.4)
            layer.fill(240,240,220,fade)
            layer.ellipse(0,0,16)
            layer.noStroke()
            layer.fill(220,220,200,fade)
            layer.ellipse(0,0,10)
            layer.fill(255,255,100,fade)
            layer.ellipse(0,0,4)
            layer.triangle(-1,-3,1,-3,0,-7)
            layer.triangle(-1,3,1,3,0,7)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
            layer.scale(2)
        break
        case 68:
            layer.fill(150,255,255,fade)
            layer.rect(-2,0,6,2)
            layer.triangle(1,-3,1,3,5,0)
        break
        case 69:
            layer.fill(255,50,50,fade)
            layer.triangle(0,0,-6,-1.5,-6,1.5)
            layer.triangle(0,-4,-6,-1.5,-6,1.5)
            layer.triangle(0,4,-6,-1.5,-6,1.5)
            layer.triangle(8,0,2,-1.5,2,1.5)
            layer.triangle(8,-4,2,-1.5,2,1.5)
            layer.triangle(8,4,2,-1.5,2,1.5)
        break
        case 70:
            layer.fill(245,240,205,fade)
			regPoly(layer,0,0,6,6,6,0)
            layer.fill(255,100,100,fade)
            layer.rect(0,0,3,12)
            layer.rect(0,0,12,3)
        break
        case 71:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
            layer.rect(-7,0,1,6)
            layer.triangle(-8,-1,-8,1,-10,0)
        break
        case 72:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
        break
        case 73:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
            layer.rect(-7,0,1,6)
            layer.triangle(-8,-1,-8,1,-10,0)
        break
        case 74:
            layer.fill(0,255,100,fade)
            layer.ellipse(-5,0,4,4)
            layer.ellipse(5,0,4,4)
            layer.triangle(0,-6,-3,3,3,3)
        break
        case 75:
            layer.scale(0.5)
            layer.stroke(0,fade)
            layer.strokeWeight(0.4)
            layer.fill(240,240,220,fade)
            layer.ellipse(0,0,16)
            layer.noStroke()
            layer.fill(220,220,200,fade)
            layer.ellipse(0,0,10)
            layer.fill(255,255,100,fade)
            layer.ellipse(0,0,4)
            layer.triangle(-1,-3,1,-3,0,-7)
            layer.triangle(-1,3,1,3,0,7)
        break
        case 76:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,0,-2,0,2)
            layer.triangle(3,-3,-6,-5,-6,-1)
            layer.triangle(3,3,-6,1,-6,5)
            layer.rect(-7,0,6,1)
        break
        case 77:
            layer.fill(255,50,50,fade)
            layer.triangle(9,-2.5,0,-4.5,0,-0.5)
            layer.triangle(9,2.5,0,0.5,0,4.5)
            layer.triangle(3,-6,-6,-8,-6,-4)
            layer.triangle(3,6,-6,4,-6,8)
            layer.rect(-7.5,0,1,6)
        break
        case 78:
            layer.fill(255,0,0,fade)
            layer.rect(0,0,10,2)
            layer.fill(20,fade)
            layer.ellipse(-5,0,4,4)
            layer.ellipse(5,0,4,4)
        break
        case 79:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
            layer.rect(-7,0,1,6)
        break
        case 80:
            layer.fill(255,0,0,fade)
            layer.rect(1,0,12,2)
            layer.fill(20,fade)
            layer.ellipse(-5,0,4,4)
        break
        case 81:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.rect(-1.5,0,6,6)
            layer.arc(1.5,0,9,6,-90,90)
        break
        case 82:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
        break
        case 83:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.ellipse(-7.5,-2.25,3,3)
            layer.ellipse(-7.5,2.25,3,3)
        break
        case 84:
            layer.fill(200,25,25,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
        break
        case 85:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
            layer.triangle(3,-6,-4.5,-2,-4.5,2)
            layer.triangle(3,6,-4.5,-2,-4.5,2)
        break
        case 86:
            layer.fill(255,50,50,fade)
            for(let a=0,la=3;a<la;a++){
                layer.triangle(-0.25+a*4.5,0,-4.5+a*4.5,-2,-4.5+a*4.5,2)
                layer.triangle(-0.25+a*4.5,-4,-4.5+a*4.5,-2,-4.5+a*4.5,2)
                layer.triangle(-0.25+a*4.5,4,-4.5+a*4.5,-2,-4.5+a*4.5,2)
                layer.triangle(-1.5+a*4.5,-6,-4.5+a*4.5,-2,-4.5+a*4.5,2)
                layer.triangle(-1.5+a*4.5,6,-4.5+a*4.5,-2,-4.5+a*4.5,2)
            }
        break
        case 87:
            layer.fill(255,50,50,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.rect(2.5,0,5,2)
                layer.triangle(8,0,5,-2,5,2)
            }
        break
        case 88:
            layer.stroke(225,fade)
            layer.strokeWeight(1)
            layer.ellipse(0,8,3,3)
            layer.noStroke()
            layer.fill(225,fade)
            layer.ellipse(0,3,7.5,7.5)
            layer.ellipse(sin(120)*3,cos(120)*3,7.5,7.5)
            layer.ellipse(-sin(120)*3,cos(120)*3,7.5,7.5)
        break
        case 89:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.rect(-1.5,0,6,6)
            layer.arc(1.5,0,9,6,-90,90)
        break
        case 90:
            layer.fill(255,50,50,fade)
            layer.rect(-3,0,6,6)
            layer.arc(0,0,6,6,-90,90)
            layer.triangle(4.5,-4.5,4.5,4.5,9,0)
        break
        case 91:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.rect(-3,0,6,6)
            layer.arc(0,0,6,6,-90,90)
            layer.triangle(4.5,-4.5,4.5,4.5,9,0)
        break
        case 92:
            layer.fill(200,fade)
            layer.stroke(175,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,6,8,1)
        break
        case 93:
            if(variants.mtg){
                displayMtgManaSymbol(layer,0,0,-1,0,0.5,fade,-1,[])
            }else{
                layer.fill(200,255,255,fade)
                layer.quad(-6,0,0,-7.5,6,0,0,7.5)
                layer.fill(225,255,255,fade)
                layer.quad(-4.8,0,0,-6,4.8,0,0,6)
            }
        break
        case 94:
            layer.stroke(200,180,120,fade)
            layer.strokeWeight(2)
            layer.ellipse(0,0,10,10)
            layer.noStroke()
            layer.fill(200,180,120,fade)
            layer.rect(0,-3,2,2)
            layer.rect(0,3,2,2)
            layer.rect(-3,0,2,2)
            layer.rect(3,0,2,2)
        break
        case 95:
            layer.fill(255,50,50,fade)
            layer.triangle(-4,0,-7,-1.5,-7,1.5)
            layer.triangle(-4,-4,-7,-1.5,-7,1.5)
            layer.triangle(-4,4,-7,-1.5,-7,1.5)
            layer.triangle(0,0,-3,-1.5,-3,1.5)
            layer.triangle(0,-4,-3,-1.5,-3,1.5)
            layer.triangle(0,4,-3,-1.5,-3,1.5)
            layer.triangle(4,0,1,-1.5,1,1.5)
            layer.triangle(4,-4,1,-1.5,1,1.5)
            layer.triangle(4,4,1,-1.5,1,1.5)
            layer.triangle(8,0,5,-1.5,5,1.5)
            layer.triangle(8,-4,5,-1.5,5,1.5)
            layer.triangle(8,4,5,-1.5,5,1.5)
        break
        case 96:
            layer.fill(255,50,50,fade)
            layer.rect(3,0,4,3)
            layer.triangle(-6,0,1,-4,1,4)
        break
        case 97:
            layer.fill(255,50,50,fade)
            layer.rect(-3,-3,4,1.5)
            layer.rect(-3,3,4,1.5)
            layer.triangle(6,-3,-1,-5,-1,-1)
            layer.triangle(6,3,-1,1,-1,5)
        break
        case 98:
            layer.fill(255,50,50,fade)
            layer.rect(-3,0,4,3)
            layer.triangle(6,0,-1,-4,-1,4)
            layer.ellipse(-7.5,-2.25,3,3)
            layer.ellipse(-7.5,2.25,3,3)
        break
        case 99:
            layer.fill(255,50,50,fade)
            layer.triangle(7,-3,-3.5,-5,-3.5,-1)
            layer.triangle(7,3,-3.5,1,-3.5,5)
            layer.rect(-4.5,0,1,6)
            layer.rect(-6,0,1,6)
        break
        case 100:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
            layer.rect(-7,0,1,6)
            layer.rect(-8.5,0,1,6)
        break
        case 101:
            layer.fill(255,50,50,fade)
            layer.triangle(9,-2.5,0,-4.5,0,-0.5)
            layer.triangle(9,2.5,0,0.5,0,4.5)
            layer.triangle(3,-6,-6,-8,-6,-4)
            layer.triangle(3,6,-6,4,-6,8)
        break
        case 102:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(225,fade)
            layer.rect(-1.5,0,6,3)
            layer.rect(-5.5,0,1,3)
            layer.rect(-7,0,1,3)
            layer.triangle(1,-3,1,3,5,0)
        break
        case 103:
            layer.fill(200,25,25,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.fill(255,50,50,fade)
            layer.triangle(7,-3,-3.5,-5,-3.5,-1)
            layer.triangle(7,3,-3.5,1,-3.5,5)
            layer.rect(-4.5,0,1,6)
        break
        case 104:
            layer.fill(255,50,50,fade)
            layer.triangle(-2,0,-5,-1.5,-5,1.5)
            layer.triangle(-2,-4,-5,-1.5,-5,1.5)
            layer.triangle(-2,4,-5,-1.5,-5,1.5)
            layer.triangle(2,0,-1,-1.5,-1,1.5)
            layer.triangle(2,-4,-1,-1.5,-1,1.5)
            layer.triangle(2,4,-1,-1.5,-1,1.5)
            layer.triangle(6,0,3,-1.5,3,1.5)
            layer.triangle(6,-4,3,-1.5,3,1.5)
            layer.triangle(6,4,3,-1.5,3,1.5)
        break
        case 105:
            layer.fill(255,200,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
            layer.rect(-5.5,0,1,6)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,6,8,1)
        break
        case 106:
            layer.fill(255,50,50,fade)
            layer.rect(-6,0,1,3)
            layer.rect(-4.5,0,1,3)
            layer.rect(-3,0,1,3)
            layer.rect(-1.5,0,1,3)
            layer.triangle(6,0,-1,-4,-1,4)
        break
        case 107:
            layer.fill(200,25,25,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.fill(255,50,50,fade)
            layer.triangle(7,-3,-3.5,-5,-3.5,-1)
            layer.triangle(7,3,-3.5,1,-3.5,5)
            layer.rect(-4.5,0,1,6)
        break
        case 108:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
        break
        case 109:
            layer.fill(255,100,100,fade)
            layer.rect(0,0,3,12)
            layer.rect(0,0,12,3)
        break
        case 110:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(225,fade)
            layer.rect(-3,0,9,3)
            layer.triangle(1,-3,1,3,5,0)
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
        break
        case 111:
            layer.fill(150,175,200,fade)
            layer.quad(0,-3,-3,0,0,3,3,0)
            layer.ellipse(-4,-4,3,3)
            layer.ellipse(-4,4,3,3)
            layer.ellipse(4,-4,3,3)
            layer.ellipse(4,4,3,3)
        break
        case 112:
            layer.fill(200,25,25,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
        break
        case 113:
            layer.fill(255,100,100,fade)
            layer.rect(0,0,3,12)
            layer.rect(0,0,12,3)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 114:
            layer.fill(150,175,200,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.rect(0,-4,6,1)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
        break
        case 115:
            layer.fill(0,100,255,fade)
            layer.rect(1,0,12,2)
            layer.fill(100,fade)
            layer.ellipse(-5,0,4,4)
        break
        case 116:
            layer.fill(255,50,50,fade)
            layer.triangle(-9,0,3,-3,3,3)
            layer.triangle(7.5,0,4.5,-3,4.5,3)
        break
        case 117:
            layer.fill(255,50,50,fade)
            layer.triangle(1.5,0,-4.5,-3,-4.5,3)
            layer.triangle(6,0,0,-3,0,3)
            layer.triangle(10.5,0,4.5,-3,4.5,3)
        break
        case 118:
            layer.fill(0,100,255,fade)
            layer.rect(1,0,12,1)
            layer.rect(1,-2,12,1)
            layer.rect(1,2,12,1)
            layer.fill(100,fade)
            layer.ellipse(-5,0,4,6)
        break
        case 119:
            layer.fill(200,fade)
            layer.stroke(175,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,6,8,1)
            layer.fill(0,100,255,fade)
            layer.noStroke()
            layer.rect(1,0,12,2)
            layer.fill(100,fade)
            layer.ellipse(-5,0,4,4)
        break
        case 120:
            layer.fill(240,fade)
            layer.rect(0,-4,6,2)
            layer.rect(0,4,6,2)
            layer.quad(3,-3,1.5,-3,-3,3,-1.5,3)
        break
        case 121:
            layer.fill(255,50,50,fade)
            layer.quad(-1,1.5,-1,-1.5,-5,-4.5,-5,-1.5)
            layer.triangle(6,0,-1,-4,-1,4)
        break
        case 122:
            layer.fill(255,50,50,fade)
            layer.quad(-1,-1.5,-1,1.5,-5,4.5,-5,1.5)
            layer.triangle(6,0,-1,-4,-1,4)
        break
        case 123:
            layer.fill(150,0,0,fade)
            layer.arc(0,0,8,8,-45,225)
            layer.quad(0,0,-2*sqrt(2),-2*sqrt(2),0,-4*sqrt(2),2*sqrt(2),-2*sqrt(2))
            layer.fill(200,fade)
            layer.quad(-2,0,0,-8,2,0,0,8)
            layer.quad(-8,0,0,-2,8,0,0,2)
        break
        case 124:
            if(variants.mtg){
                displayMtgManaSymbol(layer,0,0,-1,0,0.35,fade,-1,[])
            }else{
                layer.fill(200,255,255,fade)
                layer.quad(-4,0,0,-5,4,0,0,5)
                layer.fill(225,255,255,fade)
                layer.quad(-3.2,0,0,-4,3.2,0,0,4)
            }
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
        break
        case 125:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.triangle(9.5,0,12,-2,12,2)
            layer.ellipse(-7.5,-2.25,3,3)
            layer.ellipse(-7.5,2.25,3,3)
        break
        case 126:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.ellipse(-7,0,3,3)
            layer.fill(225,fade)
            layer.rect(-2.25,0,7.5,3)
            layer.rect(-7,0,1,3)
            layer.triangle(1,-3,1,3,5,0)
        break
        case 127:
            layer.fill(60,fade)
            layer.ellipse(0,0,10,10)
            layer.fill(255,50,50,fade)
            for(let a=0,la=8;a<la;a++){
                layer.rotate(45)
                layer.triangle(6,0,0,-1,0,1)
            }
            layer.rect(-7,0,1,6)
        break
        case 128:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.triangle(9,0,0,-2,0,2)
            }
        break
        case 129:
            layer.fill(255,50,50,fade)
            for(let a=0,la=5;a<la;a++){
                layer.rect(-8.25+a*4,0,1.5,2)
                layer.arc(-7.5+a*4,0,3,2,-90,90)
            }
        break
        case 130:
            layer.fill(255,50,50,fade)
            layer.rect(-3,0,4,3)
            layer.triangle(6,0,-1,-4,-1,4)
        break
        case 131:
            layer.stroke(150,255,255,fade)
            layer.strokeWeight(2)
            layer.line(-5,0,7,0)
            layer.line(-5,0,6,-4)
            layer.line(-5,0,6,4)
            layer.fill(100,fade)
            layer.noStroke()
            layer.ellipse(-5,0,4,4)
        break
        case 132:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,6,8,1)
            layer.fill(255,50,50,fade)
            layer.noStroke()
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.triangle(9,0,0,-1,0,1)
            }
        break
        case 133:
            layer.translate(-5,0)
            layer.fill(255,50,50,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.triangle(4.5,0,0,-1,0,1)
            }
            layer.translate(10,0)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.triangle(4.5,0,0,-1,0,1)
            }
            layer.translate(-5,0)
        break
        case 134:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-6,0,2,2)
            layer.rect(-8,-1,2,4)
        break
        case 135:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.triangle(1.5,0,-4.5,-3,-4.5,3)
            layer.triangle(6,0,0,-3,0,3)
            layer.triangle(10.5,0,4.5,-3,4.5,3)
        break
        case 136:
            layer.fill(255,50,50,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.triangle(9,0,0,-2,0,2)
            }
            layer.stroke(150,0,0,fade)
            layer.strokeWeight(2)
            layer.line(-4,-4,4,4)
            layer.line(-4,4,4,-4)
        break
        case 137:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
            layer.triangle(-1,-3,1,-3,0,-4.5)
            layer.triangle(-1,3,1,3,0,4.5)
        break
        case 138:
            layer.fill(255,50,50,fade)
            layer.rect(-4.5,-4,3,1)
            layer.quad(-1,1.5,-1,-1.5,-3,-3,-6,-3)
            layer.triangle(6,0,-1,-4,-1,4)
        break
        case 139:
            layer.fill(255,50,50,fade)
            layer.rect(-4.5,4,3,1)
            layer.quad(-1,-1.5,-1,1.5,-3,3,-6,3)
            layer.triangle(6,0,-1,-4,-1,4)
        break
        case 140:
            layer.fill(225,fade)
            layer.ellipse(0,3,7.5,7.5)
            layer.ellipse(sin(120)*3,cos(120)*3,7.5,7.5)
            layer.ellipse(-sin(120)*3,cos(120)*3,7.5,7.5)
            layer.fill(255,50,50,fade)
            layer.rect(-1.5,0,6,6)
            layer.arc(1.5,0,9,6,-90,90)
        break
        case 141:
            if(variants.mtg){
                displayMtgManaSymbol(layer,0,0,-1,0,0.35,fade,-1,[])
            }else{
                layer.fill(200,255,255,fade)
                layer.quad(-4,0,0,-5,4,0,0,5)
                layer.fill(225,255,255,fade)
                layer.quad(-3.2,0,0,-4,3.2,0,0,4)
            }
            layer.fill(255,50,50,fade)
            layer.rect(-1.5,0,6,6)
            layer.arc(1.5,0,9,6,-90,90)
        break
        case 142:
            layer.fill(200,25,25,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.rect(2.5,0,5,2)
                layer.triangle(8,0,5,-2,5,2)
            }
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
        break
        case 143:
            layer.fill(255,50,50,fade)
            layer.rect(-3,0,4,3)
            layer.triangle(8,0,1,-4,1,4)
            layer.rect(-6,0,1,6)
            layer.rect(-7.5,0,1,6)
            layer.rect(0,0,1,6)
        break
        case 144:
            layer.fill(255,50,50,fade)
            layer.rect(-2,0,2,4)
            layer.rect(0,-3,6,2)
            layer.rect(0,3,6,2)
        break
        case 145:
            layer.fill(255,50,50,fade)
            layer.rect(-2,0,2,4)
            layer.rect(0,-3,6,2)
            layer.rect(0,3,6,2)
            layer.fill(200,255,255,fade)
            layer.ellipse(0,0,4,4)
        break
        case 146:
            layer.fill(255,50,50,fade)
            layer.rect(1,0,1,8)
            layer.triangle(2,-4,2,4,6,0)
            layer.triangle(0,-4,0,4,-6,0)
        break
        case 147:
            layer.fill(255,50,50,fade)
            for(let b=0,lb=3;b<lb;b++){
                layer.translate(sin(b*120)*5,cos(b*120)*5)
                for(let a=0,la=6;a<la;a++){
                    layer.rotate(60)
                    layer.triangle(4.5,0,0,-1,0,1)
                }
                layer.translate(sin(b*120)*-5,cos(b*120)*-5)
            }
        break
        case 148:
            layer.fill(150,255,100,fade)
            layer.arc(0,0,8,8,-30,210)
            layer.quad(0,0,sqrt(3)*2,-2,0,-2/(2-sqrt(3)),-sqrt(3)*2,-2)
            layer.fill(255,50,50,fade)
            layer.rect(-3,0,4,3)
            layer.triangle(6,0,-1,-4,-1,4)
        break
        case 149:
            layer.fill(150,0,0,fade)
            layer.arc(0,0,8,8,-45,225)
            layer.quad(0,0,-2*sqrt(2),-2*sqrt(2),0,-4*sqrt(2),2*sqrt(2),-2*sqrt(2))
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,0,-2,0,2)
            layer.triangle(3,-3,-6,-5,-6,-1)
            layer.triangle(3,3,-6,1,-6,5)
            layer.rect(-7,0,1,6)
        break
        case 150:
            layer.fill(200,fade)
            layer.ellipse(0,0,12,12)
            layer.fill(255,50,50,fade)
            for(let a=0,la=8;a<la;a++){
                layer.rotate(45)
                layer.triangle(6,0,0,-1,0,1)
            }
            layer.rect(-7,0,1,6)
        break
        case 151:
            layer.fill(150,0,0,fade)
            layer.arc(0,0,8,8,0,180)
            layer.triangle(-4,0,-3,-4,-2,0)
            layer.triangle(4,0,3,-4,2,0)
            layer.triangle(-2,0,2,0,0,-6)
            layer.fill(255,50,50,fade)
            layer.rect(-1.5,0,6,6)
            layer.arc(1.5,0,9,6,-90,90)
        break
        case 152:
            layer.fill(255,50,50,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.ellipse(-2.25,-6,3,3)
            layer.ellipse(2.25,-6,3,3)
        break
        case 153:
            layer.fill(255,50,50,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.triangle(-4.5,6,-3,-3,3,-3)
            layer.triangle(4.5,6,-3,-3,3,-3)
        break
        case 154:
            layer.fill(150,255,100,fade)
            layer.arc(0,0,8,8,-30,210)
            layer.quad(0,0,sqrt(3)*2,-2,0,-2/(2-sqrt(3)),-sqrt(3)*2,-2)
            layer.fill(255,50,50,fade)
            layer.triangle(1.5,0,-4.5,-3,-4.5,3)
            layer.triangle(6,0,0,-3,0,3)
            layer.triangle(10.5,0,4.5,-3,4.5,3)
        break
        case 155:
            layer.fill(50,fade)
            layer.triangle(0,5,2,7,-2,7)
            layer.noFill()
            layer.stroke(50,fade)
            layer.strokeWeight(1)
            layer.ellipse(0,0,10,10)
            layer.strokeWeight(2)
            layer.point(-2,0)
            layer.point(2,0)
        break
        case 156:
            layer.fill(255,50,50,fade)
            layer.rect(3,-4,4,2)
            layer.rect(3,4,4,2)
            layer.triangle(-6,-4,1,-7,1,-1)
            layer.triangle(-6,4,1,1,1,7)
        break
        case 157:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.rect(2.5,0,5,2)
                layer.triangle(8,0,5,-2,5,2)
            }
        break
        case 158:
            layer.fill(240,fade)
            layer.quad(-5,0,-2,-4,6,0,-2,4)
            layer.fill(160,fade)
            layer.quad(-5,0,0,-1,6,0,0,1)
        break
        case 159:
            layer.fill(255,50,50,fade)
            layer.triangle(-2,-6,-5,3,1,3)
            layer.fill(150,175,200,fade)
            layer.triangle(2,6,-1,-3,5,-3)
        break
        case 160:
            layer.fill(255,50,50,fade)
            layer.rect(2,0,1,4)
            layer.rect(3.5,0,1,4)
            layer.rect(5,0,1,4)
            layer.rect(0.5,0,1,6)
            layer.rect(-1,0,1,6)
            layer.rect(-2.5,0,1,4.5)
            layer.rect(-4,0,1,3)
            layer.rect(-5.5,0,1,1.5)
        break
        case 161:
            layer.fill(240,160,240,fade)
            layer.rect(1,0,12,2)
            layer.fill(100,fade)
            layer.ellipse(-5,0,4,4)
        break
        case 162:
            layer.fill(255,50,50,fade)
            layer.translate(2,0)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.triangle(9,0,0,-2,0,2)
            }
            layer.translate(-2,0)
            layer.rect(-2.5,0,7,3)
        break
        case 163:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,-6,-5,3,-1,3)
            layer.triangle(3,-6,5,3,1,3)
            layer.fill(255,100,100,fade)
            layer.rect(0,0,3,12)
            layer.rect(0,0,12,3)
        break
        case 164:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,10,10)
            layer.fill(255,50,50,fade)
            layer.rect(-1.5,0,6,6)
            layer.triangle(-4.5,-3,1.5,-3,3,-6)
            layer.triangle(-4.5,3,1.5,3,3,6)
            layer.arc(1.5,0,9,6,-90,90)
        break
        case 165:
            layer.fill(150,255,255,fade)
            layer.rect(1,0,12,2)
            layer.fill(100,fade)
            layer.ellipse(-5,0,4,4)
        break
        case 166:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.rect(2.5,0,5,2)
                layer.triangle(5,0,8,-2,8,2)
            }
        break
        case 167:
            layer.fill(255,50,50,fade)
            layer.triangle(-1,-6,-2.5,3,0.5,3)
            layer.triangle(3,-6,1.5,3,4.5,3)
            layer.fill(150,175,200,fade)
            layer.triangle(1,6,-0.5,-3,2.5,-3)
            layer.triangle(-3,6,-4.5,-3,-1.5,-3)
        break
        case 168:
            layer.fill(255,50,50,fade)
            layer.triangle(0,0,-6,-1.5,-6,1.5)
            layer.triangle(0,-4,-6,-1.5,-6,1.5)
            layer.triangle(0,4,-6,-1.5,-6,1.5)
            layer.triangle(8,0,2,-1.5,2,1.5)
            layer.triangle(8,-4,2,-1.5,2,1.5)
            layer.triangle(8,4,2,-1.5,2,1.5)
            layer.rect(-7,0,1,6)
            layer.rect(1,0,1,6)
        break
        case 169:
            layer.fill(150,255,150,fade)
            layer.rect(0,0,2.5,10)
            layer.rect(0,0,10,2.5)
            layer.ellipse(-3.75,-3.75,2.4,2.4)
            layer.ellipse(-3.75,3.75,2.4,2.4)
            layer.ellipse(3.75,-3.75,2.4,2.4)
            layer.ellipse(3.75,3.75,2.4,2.4)
            layer.ellipse(0,8,3,3)
        break
        case 170:
            layer.fill(255,125,0,fade)
            layer.rect(-1.5,-1.5,7,7)
            layer.fill(255,255,0,fade)
            layer.rect(0,0,7,7)
            layer.fill(125,255,0,fade)
            layer.rect(1.5,1.5,7,7)
            layer.ellipse(0,8,3,3)
        break
        case 171:
            layer.fill(150,0,0,fade)
            layer.arc(0,0,8,8,-45,225)
            layer.quad(0,0,-2*sqrt(2),-2*sqrt(2),0,-4*sqrt(2),2*sqrt(2),-2*sqrt(2))
            layer.fill(255,50,50,fade)
            layer.triangle(0,0,-6,-1.5,-6,1.5)
            layer.triangle(0,-4,-6,-1.5,-6,1.5)
            layer.triangle(0,4,-6,-1.5,-6,1.5)
            layer.triangle(8,0,2,-1.5,2,1.5)
            layer.triangle(8,-4,2,-1.5,2,1.5)
            layer.triangle(8,4,2,-1.5,2,1.5)
            layer.rect(-7,0,1,6)
            layer.rect(1,0,1,6)
        break
        case 172:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
            layer.rect(-7,0,1,6)
            layer.ellipse(-5,-5,3,3)
            layer.ellipse(5,5,3,3)
        break
        case 173:
            layer.fill(255,150,50,fade)
            layer.rect(1,-2,12,2)
            layer.rect(1,2,12,2)
            layer.fill(100,fade)
            layer.ellipse(-5,-2,4,4)
            layer.ellipse(-5,2,4,4)
        break
        case 174:
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
        case 175:
            layer.fill(255,50,50,fade)
            layer.triangle(3.75,0,-2.25,-3,-2.25,3)
            layer.triangle(8.25,0,2.25,-3,2.25,3)
        break
        case 176:
            layer.fill(255,50,50,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.triangle(9,0,0,-2,0,2)
            }
            layer.rect(-10,0,1,6)
            layer.triangle(-11,-2,-11,2,-14,0)
        break
        case 177:
            layer.fill(225,fade)
            layer.ellipse(0,0,8)
            layer.rotate(-22.5)
            for(let a=0,la=8;a<la;a++){
                layer.triangle(-1,3,1,3,0,8)
                layer.rotate(45)
            }
            layer.rotate(22.5)
        break
        case 178:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.ellipse(-7.5,-2.25,3,3)
            layer.ellipse(-7.5,2.25,3,3)
        break
        case 179:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.rect(-1.5,-3,6,4)
            layer.arc(1.5,-3,9,4,-90,90)
            layer.rect(-1.5,3,6,4)
            layer.arc(1.5,3,9,4,-90,90)
        break
        case 180:
            layer.fill(255,50,50,fade)
            layer.rect(3,0,4,3)
            layer.triangle(-6,0,1,-4,1,4)
            layer.rect(6,0,1,6)
            layer.rect(7.5,0,1,6)
            layer.rect(9,0,1,6)
        break
        case 181:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,12,12)
            layer.fill(60,fade)
            layer.ellipse(0,0,10,10)
            layer.fill(255,50,50,fade)
            for(let a=0,la=8;a<la;a++){
                layer.rotate(45)
                layer.triangle(6,0,0,-1,0,1)
            }
            layer.rect(-7,0,1,6)
        break
        case 182:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(225,fade)
            layer.rect(0,0,3,3)
            layer.rect(-2.5,0,1,3)
            layer.rect(-4,0,1,3)
            layer.rect(-5.5,0,1,3)
            layer.rect(-7,0,1,3)
            layer.rect(-8.5,0,1,3)
            layer.rect(-10,0,1,3)
            layer.triangle(1,-3,1,3,5,0)
        break
        case 183:
            layer.fill(0,255,100,fade)
            layer.rect(0,0,8,8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
        break
        case 184:
            layer.fill(255,50,50,fade)
            layer.triangle(7.5,0,3,-2,3,2)
            layer.triangle(4.5,-3,0,-5,0,-1)
            layer.triangle(4.5,3,0,1,0,5)
            layer.triangle(1.5,0,-3,-2,-3,2)
            layer.triangle(-1.5,-3,-6,-5,-6,-1)
            layer.triangle(-1.5,3,-6,1,-6,5)
            layer.ellipse(-9,-2.25,3,3)
            layer.ellipse(-9,2.25,3,3)
        break
        case 185:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
            layer.ellipse(-7.5,-2.25,3,3)
            layer.ellipse(-7.5,2.25,3,3)
        break
        case 186:
            layer.fill(255)
            layer.beginShape()
            for(let a=0,la=24;a<la;a++){
                layer.vertex(lsin(a*15)*(6+a%2*2),lcos(a*15)*(6+a%2*2))
            }
            layer.endShape()
            layer.fill(255,225,0,fade)
            layer.triangle(-4,-1,4,-1,0,-6)
            layer.rect(0,2,3,6)
        break
        case 187:
            layer.fill(255,125,0,fade)
            layer.rect(-1.5,-1.5,7,7)
            layer.fill(255,255,0,fade)
            layer.rect(0,0,7,7)
            layer.fill(125,255,0,fade)
            layer.rect(1.5,1.5,7,7)
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
        break
        case 188:
            layer.fill(255,50,50,fade)
            layer.rect(2,0,1,4)
            layer.rect(3.5,0,1,4)
            layer.rect(5,0,1,4)
            layer.rect(0.5,0,1,6)
            layer.rect(-1,0,1,6)
            layer.rect(-2.5,0,1,5)
            layer.rect(-4,0,1,4)
            layer.rect(-5.5,0,1,3)
            layer.triangle(-6.5,-1,-6.5,1,-8,0)
        break
        case 189:
            layer.fill(50,fade)
            layer.triangle(-6,-3,-3,-6,-7,-7)
            layer.triangle(6,-3,3,-6,7,-7)
            layer.triangle(-6,3,-3,6,-7,7)
            layer.triangle(6,3,3,6,7,7)
            layer.noFill()
            layer.stroke(50,fade)
            layer.strokeWeight(1)
            layer.ellipse(0,0,10,10)
            layer.strokeWeight(2)
            layer.point(-2,0)
            layer.point(2,0)
        break
        case 190:
            layer.fill(100,125,150,fade)
            layer.rect(0,0,8,8)
            layer.triangle(-1,-4,1,-4,0,-7)
            layer.triangle(-4,-1,-4,1,-7,0)
            layer.triangle(-1,4,1,4,0,7)
            layer.triangle(4,-1,4,1,7,0)
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
        break
        case 191:
            layer.fill(255,fade)
            layer.rect(1,-4,12,1)
            layer.rect(1,-2,12,1)
            layer.rect(1,0,12,1)
            layer.rect(1,2,12,1)
            layer.rect(1,4,12,1)
            layer.fill(80,fade)
            layer.ellipse(-5,0,4,10)
        break
        case 192:
            layer.fill(255,50,50,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.rect(2,0,4,2)
                layer.rect(5,0,1,2)
                layer.triangle(9,0,6,-2,6,2)
            }
        break
        case 193:
            layer.fill(150,175,200,fade)
			layer.triangle(-3,-3,2,-3,2,-6)
			layer.arc(2,-3,10,16,90,180)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.ellipse(-7.5,-2.25,3,3)
            layer.ellipse(-7.5,2.25,3,3)
        break
        case 194:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.triangle(7,-3,-3.5,-5,-3.5,-1)
            layer.triangle(7,3,-3.5,1,-3.5,5)
            layer.ellipse(-6.5,-2.25,3,3)
            layer.ellipse(-6.5,2.25,3,3)
        break
        case 195:
            layer.fill(255,50,50,fade)
            layer.triangle(1.5,0,-4.5,-3,-4.5,3)
            layer.triangle(6,0,0,-3,0,3)
            layer.triangle(10.5,0,4.5,-3,4.5,3)
            layer.triangle(-3,-4,3,-4,0,-10)
            layer.triangle(-3,4,3,4,0,10)
        break
        case 196:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.rect(-3,0,4,3)
            layer.triangle(6,0,-1,-4,-1,4)
            layer.ellipse(-7.5,-2.25,3,3)
            layer.ellipse(-7.5,2.25,3,3)
        break
        case 197:
            layer.fill(150,175,200,fade)
            layer.rect(0,0,8,8)
            layer.triangle(-1,-4,1,-4,0,-7)
            layer.triangle(-4,-1,-4,1,-7,0)
            layer.triangle(-1,4,1,4,0,7)
            layer.triangle(4,-1,4,1,7,0)
            layer.ellipse(0,9,3,3)
        break
        case 198:
            if(variants.mtg){
                displayMtgManaSymbol(layer,0,0,-1,0,0.35,fade,-1,[])
            }else{
                layer.fill(200,255,255,fade)
                layer.quad(-4,0,0,-5,4,0,0,5)
                layer.fill(225,255,255,fade)
                layer.quad(-3.2,0,0,-4,3.2,0,0,4)
            }
            layer.fill(255,50,50,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.triangle(9,0,0,-2,0,2)
            }
        break
        case 199:
            layer.fill(255,100,100,fade*0.6)
            layer.quad(-8,0,-6,-4,-4,0,-6,4)
            layer.quad(-5,0,-3,-5,-1,0,-3,5)
            layer.quad(-2,0,0,-6,2,0,0,6)
            layer.quad(1,0,3,-5,5,0,3,5)
            layer.quad(4,0,6,-4,8,0,6,4)
        break
        case 200:
            layer.fill(255,255,100,fade*0.6)
            layer.quad(-8,0,-6,-4,-4,0,-6,4)
            layer.quad(-5,0,-3,-5,-1,0,-3,5)
            layer.quad(-2,0,0,-6,2,0,0,6)
            layer.quad(1,0,3,-5,5,0,3,5)
            layer.quad(4,0,6,-4,8,0,6,4)
        break
        case 201:
            layer.fill(100,255,255,fade*0.6)
            layer.quad(-8,0,-6,-4,-4,0,-6,4)
            layer.quad(-5,0,-3,-5,-1,0,-3,5)
            layer.quad(-2,0,0,-6,2,0,0,6)
            layer.quad(1,0,3,-5,5,0,3,5)
            layer.quad(4,0,6,-4,8,0,6,4)
        break
        case 202:
            layer.fill(255,100,255,fade*0.6)
            layer.quad(-8,0,-6,-4,-4,0,-6,4)
            layer.quad(-5,0,-3,-5,-1,0,-3,5)
            layer.quad(-2,0,0,-6,2,0,0,6)
            layer.quad(1,0,3,-5,5,0,3,5)
            layer.quad(4,0,6,-4,8,0,6,4)
        break
        case 203:
            layer.fill(255,50,50,fade)
            layer.rect(-3,0,4,3)
            layer.triangle(6,0,-1,-4,-1,4)
            layer.triangle(-1,0,1,-5,1,5)
            layer.rect(-6,0,1,6)
        break
        case 204:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-3,-4.5,-2,-4.5,2)
            layer.triangle(9,3,-4.5,-2,-4.5,2)
            layer.triangle(9,-6,-4.5,-2,-4.5,2)
            layer.triangle(9,6,-4.5,-2,-4.5,2)
        break
        case 205:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(3,-7.5,-4.5,-2,-4.5,2)
            layer.triangle(3,7.5,-4.5,-2,-4.5,2)
            layer.ellipse(-7.5,-2.25,3,3)
            layer.ellipse(-7.5,2.25,3,3)
        break
        case 206:
            layer.fill(255,50,50,fade)
            layer.triangle(9,-3,-4.5,-5,-4.5,-1)
            layer.triangle(9.5,-3,12,-4.5,12,-1.5)
            layer.triangle(9,3,-4.5,5,-4.5,1)
            layer.triangle(9.5,3,12,4.5,12,1.5)
            layer.ellipse(-7.5,-2.25,3,3)
            layer.ellipse(-7.5,2.25,3,3)
        break
        case 207:
            layer.fill(255,100,100,fade)
            layer.rect(0,0,3,12)
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
        break
        case 208:
            layer.fill(60,fade)
            layer.ellipse(0,0,10,10)
            layer.fill(255,50,50,fade)
            for(let a=0,la=8;a<la;a++){
                layer.rotate(45)
                layer.triangle(6,0,0,-1,0,1)
            }
            layer.ellipse(-8,-2.25,3,3)
            layer.ellipse(-8,2.25,3,3)
        break
        case 209:
            layer.fill(60,fade)
            layer.ellipse(0,0,10,10)
            layer.fill(255,50,50,fade)
            for(let a=0,la=8;a<la;a++){
                layer.rotate(45)
                layer.triangle(6,0,0,-1,0,1)
            }
        break
        case 210:
            layer.fill(255,225,75,fade)
            layer.triangle(-2,4,2,4,0,-8)
        break
        case 211:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.triangle(9.5,-0.5,10,-4,13,-1)
            layer.triangle(9.5,0.5,10,4,13,1)
            layer.rect(-5.5,0,1,6)
        break
        case 212:
            layer.fill(255,50,50,fade)
            layer.rect(-2,0,8,3)
            layer.triangle(1,0,-4,-4,-4,4)
            layer.triangle(7,0,2,-4,2,4)
        break
        case 213:
            layer.fill(255,50,50,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.triangle(9,0,0,-2,0,2)
                layer.triangle(6,0,8,0,7,-3)
            }
        break
        case 214:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
            layer.triangle(-6,-3.5,-4,-3.5,-5,-5)
            layer.triangle(-6,3.5,-4,3.5,-5,5)
        break
        case 215:
            layer.fill(225,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.arc(0,4,8,8,-90,90)
            }
            layer.fill(255,50,50,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.triangle(9,0,0,-2,0,2)
            }
        break
        case 216:
            layer.fill(255,100,100,fade)
            layer.rect(0,0,3,8)
            layer.rect(0,0,12,3)
            layer.triangle(-1.5,-4.5,1.5,-4.5,0,-7.5)
            layer.triangle(-1.5,4.5,1.5,4.5,0,7.5)
        break
        case 217:
            layer.stroke(50,fade)
            layer.strokeWeight(1)
            layer.ellipse(0,0,10,10)
            layer.strokeWeight(2)
            layer.point(-2,0)
            layer.point(2,0)
            layer.fill(255,50,50,fade)
            layer.noStroke()
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.triangle(9,0,0,-2,0,2)
            }
        break
        case 218:
            layer.fill(255,150,255,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.triangle(0,0,10,-1,10,1)
            }
            layer.fill(100,fade)
            layer.ellipse(0,0,3,3)
        break
        case 219:
            layer.fill(255,150,255,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.rect(5,0,10,1)
            }
            layer.fill(100,fade)
            layer.ellipse(0,0,3,3)
        break
        case 220:
            layer.stroke(150,0,0,fade)
            layer.strokeWeight(0.5)
            layer.beginShape()
            for(let a=0,la=7;a<la;a++){
                layer.vertex(lsin(120*a/(la-1))*(5-a%2*2.5),lcos(120*a/(la-1))*(5-a%2*2.5))
            }
            layer.vertex(0,0)
            layer.endShape(CLOSE)
            layer.stroke(100,fade)
            layer.strokeWeight(0.5)
            layer.beginShape()
            for(let a=0,la=13;a<la;a++){
                layer.vertex(lsin(-240+240*a/(la-1))*(5-a%2*2.5),lcos(-240+240*a/(la-1))*(5-a%2*2.5))
            }
            layer.vertex(0,0)
            layer.endShape(CLOSE)
        break
        case 221:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
            layer.rect(-7,0,1,6)
            layer.triangle(-6,-3.5,-4,-3.5,-5,-5)
            layer.triangle(-6,3.5,-4,3.5,-5,5)
        break
        case 222:
            layer.fill(255,50,50,fade)
            layer.arc(-3,0,12,12,-30,30)
        break
        case 223:
            layer.fill(255,50,50,fade)
            layer.triangle(-6,-3,-6,6,0,-3)
            layer.triangle(-3,-3,-3,6,3,-3)
            layer.triangle(0,-3,0,6,6,-3)
            layer.triangle(3,-3,3,6,9,-3)
        break
        case 224:
            layer.fill(255,50,50,fade)
            layer.triangle(-6,3,-6,-6,0,3)
            layer.triangle(-3,3,-3,-6,3,3)
            layer.triangle(0,3,0,-6,6,3)
            layer.triangle(3,3,3,-6,9,3)
        break
        case 225:
            layer.fill(120,60,0,fade)
            layer.triangle(-8,-1,8,-1,0,5)
            layer.triangle(-4,-1,4,-1,0,-5)
        break
        case 228:
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
        break
        case 229:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.fill(100,fade)
            layer.triangle(4.5,0,-2.25,-1.5,-2.25,1.5)
        break
        case 230:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(100,200,225,fade)
            layer.ellipse(0,0,5,5)
        break
        case 231:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.fill(100,200,225,fade)
            layer.ellipse(0,0,5,5)
        break
        case 232:
            layer.fill(255,50,50,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.rect(-3,0,3,3)
            layer.fill(100,200,225,fade)
            layer.ellipse(0,0,5,5)
        break
        case 233:
            layer.fill(255,50,50,fade)
            layer.rect(3.5,0,3,3)
            layer.arc(5,0,4,3,-90,90)
            layer.rect(-3.5,0,3,3)
            layer.arc(-5,0,4,3,-270,-90)
            layer.quad(-1.5,0,0,-1.5,1.5,0,0,1.5)
        break
        case 234:
            layer.fill(40,40,fade)
            layer.rect(-4,0.5,2,4)
            layer.rect(1,-0.5,8,2)
        break
        case 235:
            layer.fill(255,50,50,fade)
            layer.rect(-4.5,-1,4,1)
            layer.rect(-4.5,1,4,1)
            layer.rect(-1.5,0,1,3)
            layer.triangle(6,0,-1,-4,-1,4)
        break
        case 236:
            layer.fill(255,50,50,fade)
            layer.rect(-3,-3,4.5,3)
            layer.arc(-0.75,-3,9,4,-90,90)
            layer.rect(-3,3,4.5,3)
            layer.arc(-0.75,3,9,4,-90,90)
            layer.rect(3,0,4.5,3)
            layer.arc(5.25,0,6.75,3,-90,90)
        break
        case 237:
            layer.fill(140,120,160,fade)
            layer.stroke(120,100,140,fade)
            layer.strokeWeight(2)
            regPoly(layer,0,0,8,8,8,0)
            layer.fill(200,fade)
            layer.noStroke()
            layer.rect(0,0,12,3)
            layer.rect(0,0,3,12)
        break
        case 238:
            layer.fill(200,fade)
            layer.stroke(200,225,255,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,6,8,1)
        break
        case 239:
            layer.fill(200,fade)
            layer.stroke(255,255,150,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,6,8,1)
        break
        case 240:
            layer.fill(200,fade)
            layer.stroke(255,100,255,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,6,8,1)
        break
        case 241:
            layer.fill(200,fade)
            layer.stroke(100,255,255,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,6,8,1)
        break
        case 242:
            layer.fill(150,0,0,fade)
            layer.arc(0,0,8,8,0,180)
            layer.triangle(-4,0,-3,-4,-2,0)
            layer.triangle(4,0,3,-4,2,0)
            layer.triangle(-2,0,2,0,0,-6)
        break
        case 243:
            layer.fill(255,50,50,fade)
            layer.triangle(6,0,-4.5,-3,-4.5,3)
            layer.triangle(6,0,9,-4.5,9,4.5)
        break
        case 244:
            layer.fill(150,75,0,fade)
            layer.triangle(0,0,-6,-4,-4,-6)
            layer.triangle(0,0,-6,4,-4,6)
            layer.triangle(0,0,6,-4,4,-6)
            layer.triangle(0,0,6,4,4,6)
            layer.fill(200,50,50,fade)
            layer.ellipse(0,0,3)
        break
        case 245:
            layer.fill(255,fade)
            layer.rect(1,0,12,1)
            layer.fill(80,fade)
            layer.ellipse(-5,0,4,6)
        break
        case 246:
            layer.fill(125,255,255,fade)
            layer.rect(0,0,9,9)
            layer.fill(175,255,255,fade)
            layer.rect(0,0,6,6)
            layer.fill(225,255,255,fade)
            layer.rect(0,0,3,3)
        break
        case 247:
            layer.fill(125,255,255,fade)
            layer.arc(0,0,10,10,-120,-60)
            layer.fill(150,0,0,fade)
            layer.arc(0,0,10,10,0,60)
            layer.fill(255,255,50,fade)
            layer.arc(0,0,10,10,120,180)
        break
        case 248:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.triangle(0,-1.5,3,-1.5,1.5,-3)
        break
        case 249:
            layer.fill(255,50,50,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.rect(-5,0,3,3)
            layer.rect(5,0,3,3)
        break
        case 250:
            layer.fill(0,150,255,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.fill(125,fade)
            layer.triangle(0,6,-1,-3,1,-3)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
        break
        case 251:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.arc(-5,-1.5,2,2,90,270)
            layer.arc(-5,1.5,2,2,90,270)
        break
        case 252:
            layer.fill(225,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.arc(0,4,8,8,-90,90)
            }
            layer.fill(255,50,50,fade)
            layer.rect(-3,0,4,3)
            layer.triangle(6,0,-1,-4,-1,4)
        break
        case 253:
            layer.fill(100,0,150,fade)
            layer.ellipse(0,0,9)
            layer.triangle(-2,-4,2,-4,0,-6)
            layer.triangle(-2,4,2,4,0,6)
            layer.fill(150,125,175,fade)
            layer.ellipse(0,0,4.5)
            layer.triangle(-2,-1,-2,1,-3,0)
            layer.triangle(2,-1,2,1,3,0)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
        break
        case 254:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.rect(0,4,6,1)
            layer.ellipse(0,7,3,3)
        break
        case 255:
            layer.fill(200,25,25,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.fill(255,50,50,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.triangle(9,0,0,-2,0,2)
            }
        break
        case 256:
            layer.fill(0,150,255,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.fill(255,50,50,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.triangle(9,0,0,-2,0,2)
            }
        break
        case 257:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.ellipse(-7,0,3,3)
            layer.fill(100,125,150,fade)
            layer.triangle(0,-6,-3,3,3,3)
        break
        case 258:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(255,50,50,fade)
            layer.triangle(7,-3,-3.5,-5,-3.5,-1)
            layer.triangle(7,3,-3.5,1,-3.5,5)
            layer.rect(-4.5,0,1,6)
        break
        case 259:
            layer.fill(255,50,50,fade)
            layer.quad(7,1,7,-1,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
            layer.rect(-5.5,0,1,6)
        break
        case 260:
            layer.fill(255,225,75,fade)
            layer.triangle(-2,4,2,4,0,-8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
        break
        case 261:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(255,225,75,fade)
            layer.triangle(-2,4,2,4,0,-8)
        break
        case 262:
            layer.fill(255,255,50,fade)
            layer.beginShape()
            layer.vertex(0.5,-10)
            layer.vertex(-4,1.5)
            layer.vertex(0.5,1.5)
            layer.vertex(-0.5,10)
            layer.vertex(4,-1.5)
            layer.vertex(-0.5,-1.5)
            layer.endShape()
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.ellipse(-7.5,-2.25,3,3)
            layer.ellipse(-7.5,2.25,3,3)
        break
        case 263:
            layer.fill(150,0,0,fade)
            layer.arc(0,0,8,8,0,180)
            layer.triangle(-4,0,-3,-4,-2,0)
            layer.triangle(4,0,3,-4,2,0)
            layer.triangle(-2,0,2,0,0,-6)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.ellipse(-7.5,-2.25,3,3)
            layer.ellipse(-7.5,2.25,3,3)
        break
        case 264:
            layer.fill(255,255,50,fade)
            layer.beginShape()
            layer.vertex(0.5,-10)
            layer.vertex(-4,1.5)
            layer.vertex(0.5,1.5)
            layer.vertex(-0.5,10)
            layer.vertex(4,-1.5)
            layer.vertex(-0.5,-1.5)
            layer.endShape()
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
        break
        case 265:
            layer.fill(150,0,0,fade)
            layer.arc(0,0,8,8,0,180)
            layer.triangle(-4,0,-3,-4,-2,0)
            layer.triangle(4,0,3,-4,2,0)
            layer.triangle(-2,0,2,0,0,-6)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
        break
        case 266:
            layer.stroke(100,0,150,fade)
            layer.strokeWeight(1.5)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.line(0,0,0,6)
                layer.line(0,3,3,5)
            }
            layer.noStroke()
            layer.fill(255,50,50,fade)
            layer.rect(-1.5,0,6,6)
            layer.arc(1.5,0,9,6,-90,90)
        break
        case 267:
            layer.stroke(100,0,150,fade)
            layer.strokeWeight(1.5)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.line(0,0,0,6)
                layer.line(0,3,3,5)
            }
            layer.noStroke()
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
        break
        case 268:
            layer.fill(255,225,75,fade)
            layer.triangle(-2,4,2,4,0,-8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.ellipse(-7.5,-2.25,3,3)
            layer.ellipse(-7.5,2.25,3,3)
        break
        case 269:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.fill(255,225,75,fade)
            layer.triangle(-2,4,2,4,0,-8)
        break
        case 270:
            layer.fill(200,fade)
            layer.stroke(175,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,6,8,1)
            layer.noStroke()
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 271:
            if(variants.mtg){
                displayMtgManaSymbol(layer,0,0,-1,0,0.5,fade,-1,[])
            }else{
                layer.fill(200,255,255,fade)
                layer.quad(-6,0,0,-7.5,6,0,0,7.5)
                layer.fill(225,255,255,fade)
                layer.quad(-4.8,0,0,-6,4.8,0,0,6)
            }
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 272:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
            layer.triangle(-6.5,-1,-6.5,1,-8.5,0)
        break
        case 273:
            layer.fill(255,50,50,fade)
            layer.triangle(7,-3,-3.5,-5,-3.5,-1)
            layer.triangle(7,3,-3.5,1,-3.5,5)
            layer.rect(-4.5,0,1,6)
            layer.triangle(-5.5,-1,-5.5,1,-7.5,0)
        break
        case 274:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.fill(200,fade)
            layer.stroke(255,0,0,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,6,8,1)
            layer.fill(255,50,50,fade)
        break
        case 275:
            layer.fill(200,fade)
            layer.stroke(175,fade)
            layer.strokeWeight(1)
            layer.rect(0,-3,6,8,1)
            layer.noStroke()
            layer.fill(255,255,50,fade)
            layer.quad(0,-6,-1,-3,0,0,1,-3)
            layer.quad(0,-4,-3,-3,0,-2,3,-3)
            layer.fill(255,50,50,fade)
            layer.triangle(9,3,-4.5,0,-4.5,6)
            layer.rect(-5.5,3,1,6)
        break
        case 276:
            layer.fill(200,fade)
            layer.stroke(175,fade)
            layer.strokeWeight(1)
            layer.rect(0,-3,6,8,1)
            layer.noStroke()
            layer.fill(255,255,50,fade)
            layer.triangle(4,-3,-2,-4.5,-2,-1.5)
            layer.fill(255,50,50,fade)
            layer.triangle(9,3,-4.5,0,-4.5,6)
            layer.rect(-5.5,3,1,6)
        break
        case 277:
            layer.fill(200,fade)
            layer.stroke(175,fade)
            layer.strokeWeight(1)
            layer.rect(0,-3,6,8,1)
            layer.noStroke()
            layer.fill(255,255,50,fade)
            layer.triangle(-3,-5,3,-5,0,-7)
			layer.arc(0,-5,6,10,0,180)
            layer.fill(255,50,50,fade)
            layer.triangle(9,3,-4.5,0,-4.5,6)
            layer.rect(-5.5,3,1,6)
        break
        case 278:
            layer.fill(150,175,200,fade)
            layer.ellipse(0,0,8)
            layer.triangle(-1,-5,1,-5,0,-7)
            layer.triangle(-5,-1,-5,1,-7,0)
            layer.triangle(-1,5,1,5,0,7)
            layer.triangle(5,-1,5,1,7,0)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
        break
        case 279:
            layer.fill(150,175,200,fade)
            layer.ellipse(0,0,8)
            layer.triangle(-1,-5,1,-5,0,-7)
            layer.triangle(-5,-1,-5,1,-7,0)
            layer.triangle(-1,5,1,5,0,7)
            layer.triangle(5,-1,5,1,7,0)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.ellipse(-7.5,-2.25,3,3)
            layer.ellipse(-7.5,2.25,3,3)
        break
        case 280:
            layer.fill(100,125,150,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(150,175,200,fade)
            layer.ellipse(0,0,8)
            layer.triangle(-1,-5,1,-5,0,-7)
            layer.triangle(-5,-1,-5,1,-7,0)
            layer.triangle(-1,5,1,5,0,7)
            layer.triangle(5,-1,5,1,7,0)
        break
        case 281:
            layer.fill(255,100,100,fade)
            layer.rect(0,0,3,12)
            layer.rect(0,0,12,3)
            layer.ellipse(-3,9,3,3)
            layer.fill(255,225,75,fade)
            layer.triangle(-2,4,2,4,0,-8)
            layer.ellipse(3,9,3,3)
        break
        case 282:
            layer.fill(255,100,100,fade)
            layer.rect(0,0,3,12)
            layer.rect(0,0,12,3)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
        break
        case 283:
            layer.fill(255,150,255,fade)
            layer.rect(2,0,14,1)
            layer.fill(100,fade)
            layer.ellipse(-5,0,3,3)
        break
        case 284:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,6,-5,-3,-1,-3)
            layer.fill(150,175,200,fade)
            layer.triangle(3,6,1,-3,5,-3)
            layer.fill(255,150,255,fade)
            layer.rect(2,0,14,1)
            layer.fill(100,fade)
            layer.ellipse(-5,0,3,3)
        break
        case 285:
            layer.fill(255,50,50,fade)
            layer.triangle(-1,6,-5,-3,-1,-3)
            layer.triangle(-1,-4,-5,-3,-1,-3)
            layer.fill(150,175,200,fade)
            layer.triangle(1,6,1,-3,5,-3)
            layer.triangle(1,-4,1,-3,5,-3)
            layer.fill(255,150,255,fade)
            layer.rect(2,0,14,1)
            layer.fill(100,fade)
            layer.ellipse(-5,0,3,3)
        break
        case 286:
            layer.fill(255,150,255,fade)
            for(let a=0,la=4;a<la;a++){
                layer.rotate(90)
                if(a%2==0){
                    layer.triangle(0,0,10,-1,10,1)
                }else{
                    layer.rect(5,0,10,1)
                }
            }
            layer.fill(100,fade)
            layer.ellipse(0,0,3,3)
        break
        case 287:
            layer.fill(50,150,100,fade)
            layer.ellipse(0,0,8)
            layer.rotate(-45)
            for(let a=0,la=3;a<la;a++){
                layer.triangle(-2,3,2,3,0,8)
                layer.rotate(45)
            }
            layer.rotate(-90)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.ellipse(-7.5,-2.25,3,3)
            layer.ellipse(-7.5,2.25,3,3)
        break
        case 288:
            layer.fill(240,fade)
            layer.triangle(0,-2,-6,2,6,2)
            layer.triangle(1,2,-1,2,0,4)
            layer.triangle(-5,2,-3,2,-4,-4)
            layer.triangle(5,2,3,2,4,-4)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
            layer.rect(-5.5,0,1,6)
        break
        case 289:
            layer.fill(255,125,0,fade)
            layer.rect(-1.5,-1.5,7,7)
            layer.fill(255,255,0,fade)
            layer.rect(0,0,7,7)
            layer.fill(125,255,0,fade)
            layer.rect(1.5,1.5,7,7)
        break
        case 290:
            layer.fill(150,255,150,fade)
            layer.rect(0,0,2.5,10)
            layer.rect(0,0,10,2.5)
            layer.ellipse(-3.75,-3.75,2.4,2.4)
            layer.ellipse(-3.75,3.75,2.4,2.4)
            layer.ellipse(3.75,-3.75,2.4,2.4)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.ellipse(-7.5,-2.25,3,3)
            layer.ellipse(-7.5,2.25,3,3)
        break
        case 291:
            layer.fill(255,50,50,fade)
            layer.quad(9,0,0,2,-9,0,0,-2)
            layer.quad(2,0,0,6,-2,0,0,-6)
        break
        case 292:
            layer.fill(255,50,50,fade)
            layer.quad(-1,0,-5,1,-9,0,-5,-1)
            layer.quad(-4,0,-5,6,-6,0,-5,-6)
            layer.quad(1,0,5,1,9,0,5,-1)
            layer.quad(4,0,5,6,6,0,5,-6)
        break
        case 293:
            layer.fill(150,175,200,fade)
            layer.strokeWeight(0.5)
            regStar(layer,0,0,4,5,5,2,2,0)
            layer.fill(150,0,0,fade)
            layer.triangle(7,-3,-3.5,-5,-3.5,-1)
            layer.triangle(7,3,-3.5,1,-3.5,5)
            layer.fill(255,50,50,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
        break
        case 294:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-7.5,-2,-1.5,2,-1.5)
            layer.fill(150,175,200,fade)
            layer.triangle(0,0,-2,6,2,6)
        break
        case 295:
            layer.fill(125,255,255,fade)
            layer.rect(-3,-3,6,6)
            layer.fill(150,0,0,fade)
            layer.rect(3,-3,6,6)
            layer.fill(255,255,50,fade)
            layer.rect(-3,3,6,6)
            layer.fill(150,255,100,fade)
            layer.rect(3,3,6,6)
        break
        case 296:
            layer.stroke(255,50,50,fade)
            layer.strokeWeight(1)
            layer.ellipse(9,0,3,3)
            layer.noStroke()
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 297:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,0,-2,0,2)
            layer.triangle(3,-3,-6,-5,-6,-1)
            layer.triangle(3,3,-6,1,-6,5)
            layer.rect(-7,0,1,6)
            layer.fill(150,0,0,fade)
            layer.arc(0,0,8,8,0,180)
            layer.triangle(-4,0,-3,-4,-2,0)
            layer.triangle(4,0,3,-4,2,0)
            layer.triangle(-2,0,2,0,0,-6)
        break
        case 298:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,0,-2,0,2)
            layer.triangle(3,-3,-6,-5,-6,-1)
            layer.triangle(3,3,-6,1,-6,5)
            layer.rect(-7,0,1,6)
            layer.fill(125,255,255,fade)
            layer.rect(0,0,9,9)
            layer.fill(175,255,255,fade)
            layer.rect(0,0,6,6)
            layer.fill(225,255,255,fade)
            layer.rect(0,0,3,3)
        break
        case 299:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,0,-2,0,2)
            layer.triangle(3,-3,-6,-5,-6,-1)
            layer.triangle(3,3,-6,1,-6,5)
            layer.rect(-7,0,1,6)
            layer.fill(255,255,50,fade)
            layer.beginShape()
            layer.vertex(0.5,-10)
            layer.vertex(-4,1.5)
            layer.vertex(0.5,1.5)
            layer.vertex(-0.5,10)
            layer.vertex(4,-1.5)
            layer.vertex(-0.5,-1.5)
            layer.endShape()
        break
        case 300:
            layer.stroke(150,0,0,fade)
            layer.strokeWeight(0.5)
            layer.beginShape()
            for(let a=0,la=7;a<la;a++){
                layer.vertex(lsin(120*a/(la-1))*(5-a%2*2.5),lcos(120*a/(la-1))*(5-a%2*2.5))
            }
            layer.vertex(0,0)
            layer.endShape(CLOSE)
            layer.stroke(100,fade)
            layer.strokeWeight(0.5)
            layer.beginShape()
            for(let a=0,la=13;a<la;a++){
                layer.vertex(lsin(-240+240*a/(la-1))*(5-a%2*2.5),lcos(-240+240*a/(la-1))*(5-a%2*2.5))
            }
            layer.vertex(0,0)
            layer.endShape(CLOSE)
        break
        case 301:
            layer.fill(150,75,0,fade)
            layer.triangle(0,0,-6,-4,-4,-6)
            layer.triangle(0,0,-6,4,-4,6)
            layer.triangle(0,0,6,-4,4,-6)
            layer.triangle(0,0,6,4,4,6)
            layer.fill(100,25,100,fade)
            layer.ellipse(0,0,3)
        break
        case 302:
            layer.fill(150,75,0,fade)
            layer.triangle(0,0,-6,-4,-4,-6)
            layer.triangle(0,0,-6,4,-4,6)
            layer.triangle(0,0,6,-4,4,-6)
            layer.triangle(0,0,6,4,4,6)
            layer.fill(200,200,50,fade)
            layer.ellipse(0,0,3)
        break
        case 303:
            layer.fill(255,50,50,fade)
            layer.rect(-1.5,0,6,6)
            layer.arc(1.5,0,9,6,-90,90)
            layer.triangle(0,-3.5,-3,-3.5,-3,-6.5)
            layer.triangle(0,3.5,-3,3.5,-3,6.5)
        break
        case 304:
            layer.fill(240,240,40,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 305:
            layer.fill(150,255,100,fade)
            layer.arc(0,0,8,8,-30,210)
            layer.quad(0,0,sqrt(3)*2,-2,0,-2/(2-sqrt(3)),-sqrt(3)*2,-2)
            layer.fill(255,50,50,fade)
            layer.triangle(7,-3,-3.5,-5,-3.5,-1)
            layer.triangle(7,3,-3.5,1,-3.5,5)
        break
        case 306:
            layer.fill(75,fade)
            layer.beginShape()
            for(let a=0,la=12;a<la;a++){
                layer.vertex(lsin(a*30)*(2+a%2*4),lcos(a*30)*(2+a%2*4))
            }
            layer.endShape()
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.ellipse(-7.5,-2.25,3,3)
            layer.ellipse(-7.5,2.25,3,3)
        break
        case 307:
            layer.stroke(255,fade)
            layer.strokeWeight(0.8)
            layer.arc(0,0,10,10,-165,-105)
            layer.arc(0,0,10,10,-75,-15)
            layer.arc(0,0,10,10,15,75)
            layer.arc(0,0,10,10,105,165)
            layer.fill(255,fade)
            layer.noStroke()
            layer.ellipse(0,8,3,3)
        break
        case 308:
            layer.fill(200,0,0,fade)
            layer.quad(-2,0,0,-6,2,0,0,6)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
        break
        case 309:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,0,-1,0,1)
            layer.triangle(7,-2,-2,-3,-2,-1)
            layer.triangle(7,2,-2,1,-2,3)
            layer.triangle(5,-4,-4,-5,-4,-3)
            layer.triangle(5,4,-4,3,-4,5)
            layer.triangle(3,-6,-6,-7,-6,-5)
            layer.triangle(3,6,-6,5,-6,7)
        break
        case 310:
            layer.fill(240,240,40,fade)
            layer.rect(-2,-2,4)
            layer.fill(240,40,240,fade)
            layer.rect(2,-2,4)
            layer.fill(40,240,240,fade)
            layer.rect(-2,2,4)
            layer.fill(240,240,240,fade)
            layer.rect(2,2,4)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 311:
            layer.fill(255,fade/5)
            layer.noStroke()
            layer.ellipse(0,0,10)
            layer.stroke(100,255,100,fade)
            layer.strokeWeight(1.5)
            layer.line(-3,0,3,0)
            layer.line(-1.5,-1.5*sqrt(3),1.5,1.5*sqrt(3))
            layer.line(-1.5,1.5*sqrt(3),1.5,-1.5*sqrt(3))
        break
        case 312:
            layer.fill(100,0,100,fade)
            layer.rect(-2.5,-2.5,5)
            layer.ellipse(0,0,10)
            layer.fill(150,0,150,fade)
            layer.rect(-2,-2,4)
            layer.ellipse(0,0,8)
            layer.fill(255,fade)
            layer.quad(-1,0,0,-4,1,0,0,4)
            layer.quad(0,-1,-4,0,0,1,4,0)
        break
        case 313:
            layer.fill(255,255,100,fade)
            layer.ellipse(0,0,3)
            layer.fill(100,255,100,fade)
            layer.triangle(-2,-0.5,-5,-0.5,-5,-3)
            layer.triangle(-2,0.5,-5,0.5,-5,3)
            layer.fill(255,100,100,fade)
            layer.triangle(2,-0.5,5,-0.5,5,-3)
            layer.triangle(2,0.5,5,0.5,5,3)
        break
        case 314:
            layer.fill(200,100,0,fade)
            layer.stroke(240,120,0,fade)
            layer.strokeWeight(2)
            layer.rect(0,0,9,9,2)
            layer.line(-4,-4,4,4)
            layer.line(-4,4,4,-4)
        break
        case 315:
            layer.fill(200,0,200,fade)
            layer.stroke(240,0,240,fade)
            layer.strokeWeight(2)
            layer.rect(0,0,9,9,2)
            layer.line(-4,-4,4,4)
            layer.line(-4,4,4,-4)
        break
        case 316:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.ellipse(-7.5,-2.25,3,3)
            layer.ellipse(-7.5,2.25,3,3)
            layer.fill(200,fade)
            layer.stroke(255,255,150,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,6,8,1)
            layer.noStroke()
            layer.fill(225,25,25,fade)
            layer.ellipse(-2.25,0,1.5)
            layer.fill(25,225,25,fade)
            layer.ellipse(0,0,1.5)
            layer.fill(25,25,225,fade)
            layer.ellipse(2.25,0,1.5)
        break
        case 317:
            layer.fill(255,75,75,fade)
            layer.quad(-0.5,0,-2,-8,-3.5,0,-2,8)
            layer.quad(0.5,0,2,-8,3.5,0,2,8)
            layer.fill(255,50,50,fade)
            layer.triangle(7,-3,-3.5,-5,-3.5,-1)
            layer.triangle(7,3,-3.5,1,-3.5,5)
            layer.rect(-4.5,0,1,6)
        break
        case 318:
            layer.fill(150,75,0,fade)
            layer.quad(-0.5,0,-2,-8,-3.5,0,-2,8)
            layer.quad(0.5,0,2,-8,3.5,0,2,8)
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(225,fade)
            layer.rect(-2.25,0,7.5,3)
            layer.rect(-7,0,1,3)
            layer.triangle(1,-3,1,3,5,0)
        break
        case 319:
            layer.fill(240,fade)
            layer.quad(-0.5,0,-2,-8,-3.5,0,-2,8)
            layer.quad(0.5,0,2,-8,3.5,0,2,8)
            layer.fill(255,50,50,fade)
            layer.triangle(3.75,0,-2.25,-3,-2.25,3)
            layer.triangle(8.25,0,2.25,-3,2.25,3)
        break
        case 320:
            layer.fill(150,255,150,fade)
            layer.rect(1,0,12,2)
            layer.fill(100,fade)
            layer.quad(-7.5,0,0,-2.5,-2.5,0,0,2.5)
        break
        case 321:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,150,150,fade)
            layer.rect(1,0,12,2)
            layer.fill(100,fade)
            layer.quad(-7.5,0,0,-2.5,-2.5,0,0,2.5)
        break
        case 322:
            layer.fill(255,100,0,fade)
            layer.ellipse(0,0,6)
            layer.fill(255,100,0,fade*0.5)
            regStar(layer,0,0,24,3,3,9,9,0)
            layer.endShape()
        break
        case 323:
            layer.stroke(150,0,0,fade)
            layer.strokeWeight(1)
            layer.ellipse(0,6,3,3)
            layer.noStroke()
            layer.fill(150,0,0,fade)
            layer.arc(0,0,8,8,0,180)
            layer.triangle(-4,0,-3,-4,-2,0)
            layer.triangle(4,0,3,-4,2,0)
            layer.triangle(-2,0,2,0,0,-6)
        break
        case 324:
            layer.stroke(240,fade)
            layer.strokeWeight(1)
            layer.ellipse(0,6,3,3)
            layer.noStroke()
            layer.fill(240,fade)
            layer.triangle(0,-2,-6,2,6,2)
            layer.triangle(1,2,-1,2,0,4)
            layer.triangle(-5,2,-3,2,-4,-4)
            layer.triangle(5,2,3,2,4,-4)
        break
        case 325:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
            layer.ellipse(0,-5,1.5)
            layer.ellipse(-1,5,1.5)
            layer.ellipse(1,5,1.5)
        break
        case 326:
            layer.fill(200,fade)
            layer.stroke(175,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,6,8,1)
            layer.noStroke()
            layer.fill(255,50,50,fade)
            layer.triangle(-1,-2,-1,2,-4,0)
            layer.fill(150,175,200,fade)
            layer.triangle(1,-2,1,2,4,0)
        break
        case 327:
            layer.fill(200,100,255,fade)
            layer.rect(1,0,12,2)
            layer.fill(100,fade)
            layer.quad(-7.5,0,0,-2.5,-2.5,0,0,2.5)
        break
        case 328:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.ellipse(-7.5,-2.25,3,3)
            layer.ellipse(-7.5,2.25,3,3)
            layer.fill(200,fade)
            layer.stroke(255,0,0,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,6,8,1)
        break
        case 329:
            if(variants.mtg){
                displayMtgManaSymbol(layer,0,0,-1,0,0.5,fade,-1,[])
            }else{
                layer.fill(200,255,255,fade)
                layer.quad(-6,0,0,-7.5,6,0,0,7.5)
                layer.fill(225,255,255,fade)
                layer.quad(-4.8,0,0,-6,4.8,0,0,6)
            }
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
        break
        case 330:
            layer.fill(255,255,50,fade)
            layer.beginShape()
            layer.vertex(0.5,-10)
            layer.vertex(-4,1.5)
            layer.vertex(0.5,1.5)
            layer.vertex(-0.5,10)
            layer.vertex(4,-1.5)
            layer.vertex(-0.5,-1.5)
            layer.endShape()
            layer.triangle(9,0,4.5,-2,4.5,2)
            layer.triangle(9,-4,4.5,-2,4.5,2)
            layer.triangle(9,4,4.5,-2,4.5,2)
        break
        case 331:
            if(variants.mtg){
                displayMtgManaSymbol(layer,0,0,-1,0,0.5,fade,-1,[])
            }else{
                layer.fill(200,255,255,fade)
                layer.quad(-6,0,0,-7.5,6,0,0,7.5)
                layer.fill(225,255,255,fade)
                layer.quad(-4.8,0,0,-6,4.8,0,0,6)
            }
            layer.fill(60,fade)
            layer.ellipse(0,0,10,10)
            layer.fill(255,50,50,fade)
            for(let a=0,la=8;a<la;a++){
                layer.rotate(45)
                layer.triangle(6,0,0,-1,0,1)
            }
            layer.rect(-7,0,1,6)
        break
        case 332:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,0,-4.5,4)
            layer.triangle(-1.5,-0.5,1.5,-0.5,0,-4)
        break
        case 333:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,-6,-5,3,-1,3)
            layer.rect(1.5,4,3,1)
            layer.arc(0,7,3,3,90,270)
            layer.fill(150,175,200,fade)
            layer.triangle(3,-6,5,3,1,3)
            layer.rect(1.5,4,3,1)
            layer.arc(0,7,3,3,-90,90)
        break
        case 334:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,-6,-5,3,-1,3)
            layer.triangle(3,-6,5,3,1,3)
            layer.rect(0,4,6,1)
            layer.ellipse(0,7,3,3)
        break
        case 335:
            layer.stroke(150,fade)
            layer.strokeWeight(1)
            layer.ellipse(0,0,12)
            layer.noStroke()
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.ellipse(-7.5,-2.25,3,3)
            layer.ellipse(-7.5,2.25,3,3)
        break
        case 336:
            layer.fill(200,100,255,fade)
            layer.rect(1,0,12,2)
            layer.fill(100,fade)
            layer.quad(-7.5,0,0,-2.5,-2.5,0,0,2.5)
            layer.fill(200,fade)
            layer.stroke(200,255,125,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,6,8,1)
        break
        case 337:
            layer.fill(200,fade)
            layer.stroke(175,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,6,8,1)
            layer.noStroke()
            layer.fill(200,255,125,fade)
            layer.rect(1,0,12,2)
            layer.fill(100,fade)
            layer.quad(-7.5,0,0,-2.5,-2.5,0,0,2.5)
        break
        case 338:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,8)
            layer.fill(200,255,125,fade)
            layer.rect(1,0,12,2)
            layer.fill(100,fade)
            layer.quad(-7.5,0,0,-2.5,-2.5,0,0,2.5)
        break
        case 339:
            layer.fill(255,fade)
            layer.arc(0,0,10,10,-180,0)
            layer.fill(50,225,50,fade)
            layer.arc(0,0,10,10,0,180)
            layer.ellipse(2.5,0,5)
            layer.fill(255,fade)
            layer.ellipse(-2.5,0,5)
            layer.ellipse(2.5,0,1.5)
            layer.fill(50,225,50,fade)
            layer.ellipse(-2.5,0,1.5)
            layer.triangle(5.5,-1,5.5,1,7,0)
        break
        case 340:
            layer.fill(150,175,200,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.stroke(150,175,200,fade)
            layer.strokeWeight(1)
            layer.noFill()
            layer.quad(0,3,-2,5,0,7,2,5)
        break
        case 341:
            layer.fill(50,150,100,fade)
            layer.ellipse(0,0,8)
            layer.rotate(-45)
            for(let a=0,la=3;a<la;a++){
                layer.triangle(-2,3,2,3,0,8)
                layer.rotate(45)
            }
            layer.rotate(-90)
            layer.scale(1,0.8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,0,-1,0,1)
            layer.triangle(7,-2,-2,-3,-2,-1)
            layer.triangle(7,2,-2,1,-2,3)
            layer.triangle(5,-4,-4,-5,-4,-3)
            layer.triangle(5,4,-4,3,-4,5)
            layer.triangle(3,-6,-6,-7,-6,-5)
            layer.triangle(3,6,-6,5,-6,7)
            layer.triangle(1,-8,-8,-9,-8,-7)
            layer.triangle(1,8,-8,7,-8,9)
        break
        case 342:
            layer.fill(150,175,200,fade)
			layer.triangle(-3,-3,2,-3,2,-6)
			layer.arc(2,-3,10,16,90,180)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
        break
        case 343:
            layer.noFill()
            layer.stroke(200,180,120,fade)
            layer.strokeWeight(2)
            layer.ellipse(0,0,10,10)
            layer.noStroke()
            layer.fill(200,180,120,fade)
            layer.rect(0,-3,2,2)
            layer.rect(0,3,2,2)
            layer.rect(-3,0,2,2)
            layer.rect(3,0,2,2)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
        break
        case 344:
            layer.fill(255,50,50,fade)
            layer.triangle(-3.75,0,2.25,-3,2.25,3)
            layer.triangle(-8.25,0,-2.25,-3,-2.25,3)
            layer.rect(3.25,0,1,6)
        break
        case 345:
            layer.fill(255,240,225,fade)
            layer.ellipse(0,0,5,5)
            layer.rect(0,-2.5,1.5,4)
            layer.rect(0,2.5,1.5,4)
            layer.rect(-2.5,0,4,1.5)
            layer.rect(2.5,0,4,1.5)
            layer.noFill()
            layer.stroke(255,240,225,fade)
            layer.strokeWeight(1)
            layer.ellipse(0,0,12,12)
        break
        case 346:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(225,fade)
            layer.rect(-2.25,0,7.5,3)
            layer.rect(-7,0,1,3)
            layer.triangle(1,-3,1,3,5,0)
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
        break
        case 347:
            layer.fill(255,50,50,fade)
            layer.triangle(3.75,0,-2.25,-3,-2.25,3)
            layer.triangle(8.25,0,2.25,-3,2.25,3)
            layer.rect(-3.25,0,1,6)
        break
        case 348:
            layer.fill(150,175,200,fade)
            layer.triangle(-3,6,-6,-3,0,-3)
            layer.fill(0,150,255,fade)
            layer.triangle(3,6,0,-3,6,-3)
            layer.fill(255,50,50,fade)
            layer.triangle(7,-3,-3.5,-5,-3.5,-1)
            layer.triangle(7,3,-3.5,1,-3.5,5)
            layer.rect(-4.5,0,1,6)
            layer.rect(-6,0,1,6)
        break
        case 349:
            layer.fill(50,150,100,fade)
            layer.ellipse(0,0,8)
            layer.rotate(-45)
            for(let a=0,la=3;a<la;a++){
                layer.triangle(-2,3,2,3,0,8)
                layer.rotate(45)
            }
            layer.rotate(-90)
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
        break
        case 350:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.triangle(9,0,0,-2,0,2)
                layer.triangle(6,0,8,0,7,-3)
            }
        break
        case 351:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            for(let a=0,la=6;a<la;a++){
                layer.rotate(60)
                layer.triangle(9,0,0,-2,0,2)
                layer.triangle(6,0,8,0,7,3)
            }
        break
        case 352:
            layer.stroke(50,fade)
            layer.strokeWeight(1)
            layer.ellipse(0,0,10,10)
            layer.strokeWeight(2)
            layer.point(-2,0)
            layer.point(2,0)
            layer.fill(50,fade)
            layer.noStroke()
            layer.rect(-2.5,7,2)
            layer.rect(0,7,2)
            layer.rect(2.5,7,2)
        break
        case 353:
            layer.fill(200,25,25,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.ellipse(-7.5,-2.25,3,3)
            layer.ellipse(-7.5,2.25,3,3)
        break
        case 354:
            layer.fill(0,150,255,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.fill(255,50,50,fade)
            layer.triangle(7,-3,-3.5,-5,-3.5,-1)
            layer.triangle(7,3,-3.5,1,-3.5,5)
            layer.rect(-4.5,0,1,6)
        break
        case 355:
            layer.fill(150,175,200,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,0,-2,0,2)
            layer.triangle(3,-3,-6,-5,-6,-1)
            layer.triangle(3,3,-6,1,-6,5)
        break
        case 356:
            layer.fill(100,0,0,fade)
            layer.quad(-2,0,0,-6,2,0,0,6)
            layer.quad(-6,-2,-4.5,-7,-3,-2,-4.5,3)
            layer.quad(6,-2,4.5,-7,3,-2,4.5,3)
        break
        case 357: case 360:
            layer.fill(255,50,50,fade)
            for(let a=0,la=5;a<la;a++){
                layer.triangle(-9+a*6,0,-13+a*6,-1.5,-13+a*6,1.5)
                layer.triangle(-9+a*6,-4,-13+a*6,-1.5,-13+a*6,1.5)
                layer.triangle(-9+a*6,4,-13+a*6,-1.5,-13+a*6,1.5)
                layer.rect(-14+a*6,0,1,6)
            }
        break
        case 358: case 361:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.triangle(7,-3,-3.5,-5,-3.5,-1)
            layer.triangle(7,3,-3.5,1,-3.5,5)
            layer.ellipse(-6.5,-2.25,3,3)
            layer.ellipse(-6.5,2.25,3,3)
        break
        case 359:
            layer.fill(255,240,225,fade)
            layer.ellipse(0,0,5,5)
            layer.rect(0,-2.5,1.5,4)
            layer.rect(0,2.5,1.5,4)
            layer.rect(-2.5,0,4,1.5)
            layer.rect(2.5,0,4,1.5)
            layer.noFill()
            layer.stroke(255,240,225,fade)
            layer.strokeWeight(1)
            layer.ellipse(0,0,12,12)
            layer.noStroke()
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(225,fade)
            layer.rect(-1.5,0,6,3)
            layer.rect(-5.5,0,1,3)
            layer.rect(-7,0,1,3)
            layer.triangle(1,-3,1,3,5,0)
        break
        case 362:
            layer.fill(255,50,50,fade)
            layer.rect(-1,-2.5,4,4)
            layer.arc(1,-2.5,6,4,-90,90)
            layer.rect(1,2.5,4,4)
            layer.arc(-1,2.5,6,4,90,270)
            layer.ellipse(-8,0,3,3)
        break
        case 363:
            layer.fill(60,fade)
            layer.ellipse(0,0,10,10)
            layer.fill(255,50,50,fade)
            for(let a=0,la=8;a<la;a++){
                layer.rotate(45)
                layer.triangle(6,0,0,-1,0,1)
            }
            layer.rect(-7,0,1,6)
            layer.fill(200,0,0,fade)
            layer.triangle(-5,-4,-5,-0.5,6,-2.25)
            layer.triangle(5,4,5,-0.5,-6,2.25)
        break
        case 364:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.rect(-1.5,0,6,6)
            layer.arc(1.5,0,9,6,-90,90)
            layer.triangle(0,-3.5,-3,-3.5,-3,-6.5)
            layer.triangle(0,3.5,-3,3.5,-3,6.5)
        break
        case 365:
            layer.fill(100,125,150,fade)
            layer.rect(0,0,8,8)
            layer.triangle(-1,-4,1,-4,0,-7)
            layer.triangle(-4,-1,-4,1,-7,0)
            layer.triangle(-1,4,1,4,0,7)
            layer.triangle(4,-1,4,1,7,0)
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.ellipse(-7,0,3,3)
        break
        case 366:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,-6,-5,3,-1,3)
            layer.triangle(3,-6,5,3,1,3)
            layer.fill(100,200,225,fade)
            layer.ellipse(0,0,5,5)
        break
        case 367:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,0,-2,0,2)
            layer.triangle(3,-3,-6,-5,-6,-1)
            layer.triangle(3,3,-6,1,-6,5)
            layer.rect(-7,0,1,6)
            layer.rect(-8.5,0,1,6)
        break
        case 368:
            layer.fill(0,150,255,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
        break
        case 369:
            layer.fill(150,0,0,fade)
            layer.arc(0,0,8,8,-45,225)
            layer.quad(0,0,-2*sqrt(2),-2*sqrt(2),0,-4*sqrt(2),2*sqrt(2),-2*sqrt(2))
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 370:
            layer.fill(0,150,255,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,0,-2,0,2)
            layer.triangle(3,-3,-6,-5,-6,-1)
            layer.triangle(3,3,-6,1,-6,5)
        break
        case 371:
            layer.fill(200,0,0,fade)
            layer.triangle(0,6,-3,-3,3,-3)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,0,-2,0,2)
            layer.triangle(3,-3,-6,-5,-6,-1)
            layer.triangle(3,3,-6,1,-6,5)
        break
        case 372:
            layer.fill(150,255,100,fade)
            layer.arc(0,0,8,8,-30,210)
            layer.quad(0,0,sqrt(3)*2,-2,0,-2/(2-sqrt(3)),-sqrt(3)*2,-2)
        break
        case 373:
            layer.fill(150,175,200,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.fill(200,50,0,fade)
            layer.triangle(0,4,-2,-2,2,-2)
        break
        case 374:
            layer.fill(255,255,50,fade)
            layer.beginShape()
            layer.vertex(0.5,-10)
            layer.vertex(-4,1.5)
            layer.vertex(0.5,1.5)
            layer.vertex(-0.5,10)
            layer.vertex(4,-1.5)
            layer.vertex(-0.5,-1.5)
            layer.endShape()
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
        break
        case 375:
            layer.fill(150,0,0,fade)
            layer.arc(0,0,8,8,0,180)
            layer.triangle(-4,0,-3,-4,-2,0)
            layer.triangle(4,0,3,-4,2,0)
            layer.triangle(-2,0,2,0,0,-6)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
        break
        case 376:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(150,175,200,fade)
            layer.triangle(0,-6,-3,3,3,3)
        break
        case 377:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,0,-2,0,2)
            layer.triangle(3,-3,-6,-5,-6,-1)
            layer.triangle(3,3,-6,1,-6,5)
        break
        case 378:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 379:
            layer.fill(0,150,255,fade)
            layer.triangle(-2,6,-4,-3,0,-3)
            layer.fill(200,0,5,fade)
            layer.triangle(2,6,4,-3,0,-3)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
            layer.triangle(3,-6,-4.5,-2,-4.5,2)
            layer.triangle(3,6,-4.5,-2,-4.5,2)
        break
        case 380:
            layer.fill(255,50,50,fade)
            layer.triangle(7,-3,-3.5,-5,-3.5,-1)
            layer.triangle(7,3,-3.5,1,-3.5,5)
            layer.rect(-4.5,0,1,6)
            layer.rect(-6,0,1,6)
            layer.rect(-7.5,0,1,6)
        break
        case 381:
            layer.fill(255,50,50,fade)
            layer.triangle(-3,0,-6,-1.5,-6,1.5)
            layer.triangle(-3,-4,-6,-1.5,-6,1.5)
            layer.triangle(-3,4,-6,-1.5,-6,1.5)
            layer.triangle(2,0,-1,-1.5,-1,1.5)
            layer.triangle(2,-4,-1,-1.5,-1,1.5)
            layer.triangle(2,4,-1,-1.5,-1,1.5)
            layer.triangle(7,0,4,-1.5,4,1.5)
            layer.triangle(7,-4,4,-1.5,4,1.5)
            layer.triangle(7,4,4,-1.5,4,1.5)
            layer.rect(-7,0,1,6)
            layer.rect(-2,0,1,6)
            layer.rect(3,0,1,6)
        break
        case 382:
            layer.fill(255,50,50,fade)
            layer.quad(-1,1.5,-1,-1.5,-5,-4.5,-5,-1.5)
            layer.triangle(6,0,-1,-4,-1,4)
            layer.rect(-6,-3,1,6)
        break
        case 383:
            layer.fill(255,50,50,fade)
            layer.quad(-1,-1.5,-1,1.5,-5,4.5,-5,1.5)
            layer.triangle(6,0,-1,-4,-1,4)
            layer.rect(-6,3,1,6)
        break
        case 384:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,8)
            layer.stroke(150,255,255,fade)
            layer.strokeWeight(2)
            layer.line(-5,0,7,0)
            layer.line(-5,0,6,-4)
            layer.line(-5,0,6,4)
            layer.fill(100,fade)
            layer.noStroke()
            layer.ellipse(-5,0,4,4)
        break
        case 385:
            layer.fill(240,120,240,fade)
            layer.rect(-6.5,0,1,6)
            layer.rect(-8,0,1,6)
            layer.fill(125,255,255,fade)
            layer.arc(0,0,10,10,-120,-60)
            layer.fill(150,0,0,fade)
            layer.arc(0,0,10,10,0,60)
            layer.fill(255,255,50,fade)
            layer.arc(0,0,10,10,120,180)
        break
        case 386:
            layer.fill(240,fade)
            layer.triangle(0,-2,-6,2,6,2)
            layer.triangle(1,2,-1,2,0,4)
            layer.triangle(-5,2,-3,2,-4,-4)
            layer.triangle(5,2,3,2,4,-4)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
        break
        case 387:
            layer.fill(255,255,50,fade)
            layer.beginShape()
            layer.vertex(0.5,-10)
            layer.vertex(-4,1.5)
            layer.vertex(0.5,1.5)
            layer.vertex(-0.5,10)
            layer.vertex(4,-1.5)
            layer.vertex(-0.5,-1.5)
            layer.endShape()
            layer.fill(255,50,50,fade)
            layer.rect(-5.5,0,1,6)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
        break
        case 388:
            layer.fill(150,0,0,fade)
            layer.arc(0,0,8,8,0,180)
            layer.triangle(-4,0,-3,-4,-2,0)
            layer.triangle(4,0,3,-4,2,0)
            layer.triangle(-2,0,2,0,0,-6)
            layer.fill(255,50,50,fade)
            layer.rect(-5.5,0,1,6)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
        break
        case 389:
            layer.fill(255,255,50,fade)
            layer.beginShape()
            layer.vertex(0.5,-10)
            layer.vertex(-4,1.5)
            layer.vertex(0.5,1.5)
            layer.vertex(-0.5,10)
            layer.vertex(4,-1.5)
            layer.vertex(-0.5,-1.5)
            layer.endShape()
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
            layer.rect(-7,0,1,6)
        break
        case 390:
            layer.fill(150,0,0,fade)
            layer.arc(0,0,8,8,0,180)
            layer.triangle(-4,0,-3,-4,-2,0)
            layer.triangle(4,0,3,-4,2,0)
            layer.triangle(-2,0,2,0,0,-6)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
            layer.rect(-7,0,1,6)
        break
        case 391:
            layer.fill(180,20,120,fade)
            layer.ellipse(-5,0,4,4)
            layer.ellipse(5,0,4,4)
            layer.fill(40,fade)
            layer.triangle(-3,-2.5,-3,-0.5,-0.5,-1.5)
            layer.triangle(3,-2.5,3,-0.5,0.5,-1.5)
            layer.triangle(-3,2.5,-3,0.5,-0.5,1.5)
            layer.triangle(3,2.5,3,0.5,0.5,1.5)
        break
        case 392:
            layer.fill(100,125,150,fade)
            layer.rect(0,0,8,8)
            layer.triangle(-1,-4,1,-4,0,-7)
            layer.triangle(-4,-1,-4,1,-7,0)
            layer.triangle(-1,4,1,4,0,7)
            layer.triangle(4,-1,4,1,7,0)
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.ellipse(-7,0,3,3)
            layer.fill(225,fade)
            layer.rect(-3,0,9,3)
            layer.triangle(1,-3,1,3,5,0)
        break

    }
    //mark i
    layer.fill(255,fade)
    layer.stroke(0,fade)
    layer.strokeWeight(1)
    layer.textSize(8)
    if(info){
        switch(type){
            case 1: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 12:
            case 13: case 14: case 16: case 18: case 22: case 23: case 25: case 26: case 28: case 29:
            case 32: case 33: case 35: case 36: case 38: case 39: case 40: case 41: case 42: case 43:
            case 46: case 48: case 49: case 51: case 52: case 53: case 54: case 55: case 58: case 60:
            case 61: case 62: case 63: case 64: case 65: case 70: case 71: case 73: case 74: case 78:
            case 79: case 80: case 81: case 82: case 83: case 85: case 87: case 88: case 89: case 90:
            case 91: case 94: case 96: case 98: case 100: case 102: case 105: case 106: case 109: case 111:
            case 113: case 115: case 116: case 117: case 120: case 121: case 122: case 123: case 125: case 126:
            case 127: case 128: case 130: case 131: case 132: case 134: case 135: case 136: case 137: case 138:
            case 139: case 143: case 144: case 145: case 146: case 152: case 153: case 154: case 155: case 157:
            case 159: case 160: case 161: case 162: case 164: case 165: case 166: case 169: case 170: case 174:
            case 175: case 176: case 177: case 178: case 180: case 181: case 182: case 183: case 185: case 189:
            case 192: case 195: case 196: case 197: case 200: case 202: case 203: case 204: case 205: case 208:
            case 209: case 210: case 211: case 213: case 214: case 216: case 218: case 219: case 220: case 221:
            case 222: case 223: case 224: case 228: case 229: case 230: case 231: case 232: case 233: case 234:
            case 235: case 237: case 238: case 239: case 240: case 242: case 243: case 245: case 246: case 247:
            case 249: case 252: case 259: case 272: case 275: case 276: case 277: case 283: case 286: case 289:
            case 291: case 296: case 300: case 304: case 306: case 307: case 308: case 311: case 317: case 318:
            case 319: case 320: case 321: case 322: case 323: case 324: case 327: case 330: case 332: case 334:
            case 335: case 336: case 340: case 344: case 347: case 350: case 351: case 359: case 362: case 363:
            case 366: case 372: case 373: case 382: case 383: case 384: case 385:
                layer.text(effect[0],0,0)
            break
            case 20: case 31: case 47: case 59: case 66: case 69: case 97: case 99: case 103: case 133:
            case 156: case 168: case 173: case 179: case 194: case 206: case 273: case 292: case 358: case 380:
                layer.text(`${effect[0]}x2`,0,0)
            break
            case 2: case 19: case 34: case 45: case 76: case 86: case 104: case 118: case 147: case 236:
            case 367: case 377: case 381:
                layer.text(`${effect[0]}x3`,0,0)
            break
            case 77: case 95: case 101:
                layer.text(`${effect[0]}x4`,0,0)
            break
            case 11: case 129: case 191: case 357:
                layer.text(`${effect[0]}x5`,0,0)
            break
            case 184:
                layer.text(`${effect[0]}x6`,0,0)
            break
            case 15: case 17: case 24: case 27: case 30: case 44: case 50: case 67: case 72: case 84:
            case 108: case 110: case 112: case 114: case 119: case 124: case 140: case 141: case 142: case 148:
            case 150: case 151: case 158: case 163: case 187: case 193: case 198: case 199: case 201: case 215:
            case 217: case 241: case 250: case 253: case 254: case 255: case 256: case 257: case 260: case 261:
            case 262: case 263: case 264: case 265: case 266: case 267: case 268: case 270: case 271: case 274:
            case 278: case 279: case 280: case 281: case 284: case 285: case 287: case 288: case 290: case 294:
            case 303: case 310: case 316: case 328: case 329: case 331: case 333: case 337: case 338: case 342:
            case 343: case 346: case 349: case 353: case 364: case 365: case 368: case 369: case 374: case 375:
            case 376: case 378: case 386: case 387: case 388: case 389: case 390: case 392:
                layer.text(`${effect[0]}|${effect[1]}`,0,0)
            break
            case 21:
                layer.text(`X`,0,0)
            break
            case 37:
                layer.textSize(6)
                layer.text(`${effect[0]}+${effect[1]}C`,0,0)
            break
            case 92: case 93:
                layer.text(`-${effect[0]}`,0,0)
            break
            case 107: case 171: case 258: case 305: case 339: case 354:
                layer.text(`${effect[0]}x2|${effect[1]}`,0,0)
            break
            case 149: case 282: case 297: case 298: case 299: case 355: case 370: case 371:
                layer.text(`${effect[0]}x3|${effect[1]}`,0,0)
            break
            case 172:
                layer.text(`${effect[0]}%`,0,0)
            break
            case 188:
                layer.text(`${effect[0]}xR`,0,0)
            break
            case 190: case 269: case 348: case 379:
                layer.text(`${effect[0]}|${effect[1]}|${effect[2]}`,0,0)
            break
            case 207:
                layer.text(`${effect[0]}+`,0,0)
            break
            case 212:
                layer.text(`${effect[0]}x(1-2)`,0,0)
            break
            case 167: case 248:
                layer.text(`${effect[0]}-${effect[1]}`,0,0)
            break
            case 251:
                layer.text(`${effect[0]}x3|${effect[1]}x3`,0,0)
            break
            case 293:
                layer.text(`${effect[0]}|${effect[1]}x2`,0,0)
            break
            case 295:
                layer.text(`${effect[0]}|${effect[1]}|${effect[2]}|${effect[3]}`,0,0)
            break
            case 309:
                layer.text(`${effect[0]}x7`,0,0)
            break
            case 325:
                layer.text(`${effect[0]}x?`,0,0)
            break
            case 341:
                layer.text(`${effect[0]}x9|${effect[1]}`,0,0)
            break
            case 360:
                layer.text(`${effect[0]}x5(x2)`,0,0)
            break
            case 361:
                layer.text(`${effect[0]}x2(x2)`,0,0)
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
            layer.fill(60,fade)
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
            regStar(layer,0,0,4,10,10,4,4,0)
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
            layer.scale(1.5)
            layer.stroke(0,fade)
            layer.strokeWeight(0.4)
            layer.fill(240,240,220,fade)
            layer.ellipse(0,0,16)
            layer.noStroke()
            layer.fill(220,220,200,fade)
            layer.ellipse(0,0,10)
            layer.fill(255,255,100,fade)
            layer.ellipse(0,0,4)
            layer.triangle(-1,-3,1,-3,0,-7)
            layer.triangle(-1,3,1,3,0,7)
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
            layer.line(-6,-6,6,6)
            layer.line(-6,6,6,-6)
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
            layer.fill(255,50,50,fade)
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
            layer.fill(255,125,0,fade)
            layer.rect(-1.5,-1.5,7,7)
            layer.fill(255,255,0,fade)
            layer.rect(0,0,7,7)
            layer.fill(125,255,0,fade)
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
            regStar(layer,0,0,10,1,1,7,7,0)
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
            layer.line(3,3,-3,-3)
            layer.line(-3,3,3,-3)
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
            regStar(layer,0,0,6,2,2,6,6,0)
        break
        case 61:        
            layer.fill(255,50,50,fade)
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
            layer.ellipse(0,0,8)
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
            layer.fill(60,fade)
            layer.triangle(-4,-3,-4,3,8,0)
        break
        case 73:
            layer.fill(150,175,200,fade)
            layer.triangle(0,-12,-3,6,3,6)
            layer.fill(60,fade)
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
        case 76:
            layer.stroke(120,fade)
            layer.strokeWeight(1.5)
            layer.rect(0,0,18,16,2)
            layer.stroke(60,fade)
            layer.rect(0,0,12,16,2)
        break
        case 77:
            layer.fill(150,fade)
            layer.quad(0,0,0,-6,-6,-6,-2,0)
            layer.quad(0,0,0,6,6,6,2,0)
            layer.fill(125,fade)
            layer.quad(0,0,6,0,6,-6,0,-2)
            layer.quad(0,0,-6,0,-6,6,0,2)
        break
        case 78:
            layer.stroke(120,fade)
            layer.strokeWeight(1.5)
            layer.rect(0,0,12,16,2)
            layer.strokeWeight(1)
            layer.ellipse(0,0,8)
        break
        case 79:
            layer.stroke(120,fade)
            layer.strokeWeight(1.5)
            layer.rect(0,0,12,16,2)
            layer.strokeWeight(1)
            regTriangle(layer,0,-4,4,4,30)
            regTriangle(layer,0,4,4,4,-30)
        break
        case 80:
            layer.stroke(120,fade)
            layer.strokeWeight(1.5)
            layer.rect(0,0,12,16,2)
            layer.strokeWeight(1)
            layer.ellipse(-2,-4,4)
            layer.ellipse(1.5,3,5)
        break
        case 81:
            layer.stroke(120,fade)
            layer.strokeWeight(1.5)
            layer.rect(0,0,12,16,2)
            layer.strokeWeight(1)
            layer.rect(0,0,4,2)
        break
        case 82:
            layer.stroke(120,fade)
            layer.strokeWeight(1.5)
            layer.rect(0,0,12,16,2)
            layer.strokeWeight(1)
            layer.line(6,-6,-6,0)
            layer.line(6,-3,-6,3)
            layer.line(6,0,-6,6)
        break
        case 83:
            layer.stroke(120,fade)
            layer.strokeWeight(1.5)
            layer.rect(0,0,12,16,2)
            layer.strokeWeight(1)
            layer.rect(0,-4.5,2)
            layer.point(0,0)
            layer.point(-1,-1)
            layer.point(-1,1)
            layer.point(1,-1)
            layer.point(1,1)
            layer.line(0,3,0,5)
            layer.line(-1,4,1,4)
        break
        case 84:
            layer.fill(160,fade)
            for(let a=0,la=7;a<la;a++){
                layer.triangle(-1,0,1,0,0,-8)
                layer.rotate(360/7)
            }
        break
        case 85:
            layer.fill(60,fade)
            layer.quad(-7,7,-7,2,7,-7,-2,7)
        break
        case 86:
            layer.stroke(60,fade)
            layer.strokeWeight(2)
            layer.arc(0,0,10,10,-90,240)
            layer.line(0,-5,0,-3)
        break
        case 87:
            layer.stroke(60,fade)
            layer.strokeWeight(2)
            layer.arc(2,-3,10,6,90,270)
            layer.arc(2,3,10,6,90,270)
        break
        case 88:
            layer.stroke(120,fade)
            layer.strokeWeight(1.5)
            layer.rect(0,0,12,16,2)
            layer.strokeWeight(1)
            layer.ellipse(0,0,10)
            layer.ellipse(0,0,5)
            layer.line(0,-8,0,8)
            layer.line(-6,-4,6,4)
            layer.line(-6,4,6,-4)
        break
        case 89:
            layer.stroke(120,fade)
            layer.strokeWeight(1.5)
            layer.rect(-1,-1,12,16,2)
            layer.rect(1,1,12,16,2)
        break
        case 90:
            layer.stroke(120,fade)
            layer.strokeWeight(1.5)
            layer.rect(0,0,12,16,2)
            layer.strokeWeight(2)
            layer.point(0,0)
        break
        case 91:
            layer.stroke(120,fade)
            layer.strokeWeight(1.5)
            layer.rect(0,0,12,16,2)
            layer.strokeWeight(2)
            layer.point(0,-5)
            layer.point(0,5)
        break
        case 92:
            layer.stroke(120,fade)
            layer.strokeWeight(1.5)
            layer.rect(0,0,12,16,2)
            layer.strokeWeight(2)
            layer.point(0,-5)
            layer.point(0,0)
            layer.point(0,5)
        break
        case 93:
            layer.noFill()
            layer.stroke(200,180,120,fade)
            layer.strokeWeight(2)
            layer.ellipse(0,0,10,10)
            layer.noStroke()
            layer.fill(200,180,120,fade)
            layer.rect(0,-3,2,2)
            layer.rect(0,3,2,2)
            layer.rect(-3,0,2,2)
            layer.rect(3,0,2,2)
        break
        case 94:
            layer.fill(150,175,200,fade)
			layer.triangle(-7.5,-4.5,7.5,-4.5,0,-9)
			layer.arc(0,-4.5,15,24,0,180)
            layer.fill(100,125,150,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
        break
        case 95:
            layer.fill(60,fade)
            layer.triangle(-6,-6,-6,6,6,6)
            layer.rect(0,0,4)
        break
        case 96:
            layer.fill(150,175,200,fade)
            layer.rect(0,0,3,9)
            layer.rect(-3,0,2,6)
            layer.rect(3,0,2,6)
            layer.triangle(-1,-5,1,-5,0,-6)
            layer.triangle(-1,5,1,5,0,6)
        break
        case 97:
            layer.fill(100,255,100,fade)
            layer.arc(0,0,10,10,30,210)
            layer.fill(100,255,255,fade)
            layer.arc(0,0,10,10,-150,30)
            layer.fill(50,225,50,fade)
            layer.arc(0,0,8,8,15,195)
            layer.fill(50,225,225,fade)
            layer.arc(0,0,8,8,-165,15)
        break
        case 98:
            layer.fill(0,150,255,fade)
            layer.rotate(45)
            layer.triangle(0,-1,2,5,-2,5)
            layer.triangle(-1,0,5,2,5,-2)
            layer.triangle(0,1,-2,-5,2,-5)
            layer.triangle(1,0,-5,-2,-5,2)
        break
        case 99:
            layer.fill(200,150,25,fade)
            layer.ellipse(0,0,4)
            for(let a=0,la=8;a<la;a++){
                layer.rotate(45)
                layer.ellipse(0,3.5,2)
            }
            layer.stroke(200,150,25,fade)
            layer.noFill()
            layer.strokeWeight(1)
            layer.ellipse(0,0,11)
        break
        case 100:
            layer.fill(60,fade)
            layer.rect(-2,2,8)
            layer.rect(-2,-2,3)
            layer.rect(2,2,3)
        break
        case 101:
            layer.fill(0,fade)
            layer.rect(0,0,9,13)
            layer.fill(240,fade)
            layer.rect(0,0,8,12)
            layer.fill(0,fade)
            layer.quad(-3.5,-3,-1,-5.5,1.5,-3,-1,-0.5)
            layer.fill(255,255,100,fade)
            layer.quad(-3,-3,-1,-5,1,-3,-1,-1)
        break
        case 102:
            layer.fill(0,fade)
            layer.rect(0,0,9,13)
            layer.fill(240,fade)
            layer.rect(0,0,8,12)
            layer.fill(0,fade)
            layer.quad(-3.5,-3,-1,-5.5,1.5,-3,-1,-0.5)
            layer.fill(255,150,200,fade)
            layer.quad(-3,-3,-1,-5,1,-3,-1,-1)
        break
        case 103:
            layer.stroke(120,fade)
            layer.strokeWeight(1.5)
            layer.rect(0,0,12,16,2)
            layer.stroke(60,fade)
            layer.strokeWeight(0.5)
            regStar(layer,0,0,12,2,2,5,5,0)
        break
        case 104:
            layer.fill(0,fade)
            layer.rect(0,0,9,13)
            layer.fill(240,fade)
            layer.rect(0,0,8,12)
            layer.fill(0,fade)
            layer.quad(-3.5,-3,-1,-5.5,1.5,-3,-1,-0.5)
            layer.quad(3.5,3,1,5.5,-1.5,3,1,0.5)
            layer.fill(255,255,100,fade)
            layer.quad(-3,-3,-1,-5,1,-3,-1,-1)
            layer.fill(255,150,200,fade)
            layer.quad(3,3,1,5,-1,3,1,1)
        break
        case 105:
            layer.fill(125,255,255,fade)
            layer.arc(0,0,15,15,-120,-60)
            layer.fill(150,0,0,fade)
            layer.arc(0,0,15,15,0,60)
            layer.fill(255,255,50,fade)
            layer.arc(0,0,15,15,120,180)
        break
        case 106:
            layer.fill(240,fade)
            layer.triangle(0,-3,-9,3,9,3)
            layer.triangle(1.5,3,-1.5,3,0,6)
            layer.triangle(-7.5,3,-4.5,3,-6,-6)
            layer.triangle(7.5,3,4.5,3,6,-6)
        break
        case 107:
            layer.noFill()
            layer.stroke(50,fade)
            layer.strokeWeight(1)
            layer.bezier(-5,0,-3,-3.5,3,-3.5,5,0)
            layer.bezier(-5,0,-3,3.5,3,3.5,5,0)
            layer.strokeWeight(3)
            layer.point(0,0)
        break
        case 108:
            layer.fill(60,fade)
            layer.rect(0,0,6,2)
            layer.rect(0,-3,10,2)
            layer.rect(0,3,10,2)
            layer.rect(0,-6,6,2)
            layer.rect(0,6,6,2)
        break
        case 109:
            layer.fill(255,50,50,fade)
            layer.triangle(2,-6,3,-1.5,1,-1.5)
            layer.quad(4,3,0,3,0.8,-0.6,3.2,-0.6)
            layer.quad(-4.5,0,-3,-1.5,-1.5,0,-3,1.5)
        break
        case 110:
            layer.fill(100,255,100,fade)
            layer.quad(0,1,-1,-3,0,-7,1,-3)
            layer.fill(255,255,100,fade)
            layer.quad(0,6,-2,4,0,2,2,4)
        break
        case 111:
            layer.fill(120,fade)
            layer.rect(-5,0,2,16)
            layer.rect(-2,0,2,16)
            layer.rect(0,-7,11,2)
            layer.rect(0,7,11,2)
        break
        case 112:
            layer.fill(120,fade)
            layer.rect(-6,0,2,14)
            layer.rect(-3,0,2,14)
            layer.rect(6,0,2,14)
            layer.rect(0,6,14,2)
        break
        case 113:
            layer.fill(0,50,150,fade)
            regTriangle(layer,0,-3,3,3,0)
            regTriangle(layer,-1.5*sqrt(3),1.5,3,3,0)
            regTriangle(layer,1.5*sqrt(3),1.5,3,3,0)
            layer.fill(0,100,150,fade)
            regTriangle(layer,0,3,3,3,60)
            regTriangle(layer,-1.5*sqrt(3),-1.5,3,3,60)
            regTriangle(layer,1.5*sqrt(3),-1.5,3,3,60)
        break
        case 114:
            for(let a=0,la=5;a<la;a++){
                layer.fill([255,0,255,0,50][a],[0,150,255,100,0][a],[0,0,100,200,100][a],fade)
                layer.triangle(0,0,6*lsin(a*72-36),6*lcos(a*72-36),6*lsin(a*72+36),6*lcos(a*72+36))
            }
        break
        case 115:
            layer.fill(225,fade)
            layer.rect(0,0,10,10,2)
            layer.fill(40,fade)
            layer.ellipse(0,0,3,3)
        break
        case 116:
            layer.stroke(80,fade)
            layer.strokeWeight(3)
            regPoly(layer,0,0,8,16,16,22.5)
            layer.strokeWeight(1.5)
            layer.line(-6,-6,6,6)
            layer.line(-6,6,6,-6)
        break
        case 117:
            layer.fill(100,0,100,fade)
            regStar(layer,0,0,5,2,2,6,6,0)
            layer.fill(50,0,50,fade)
            regStar(layer,0,0,5,2,2,6,6,36)
        break
        case 118:
            layer.stroke(0,fade)
            layer.strokeWeight(2.5)
            layer.noFill()
            layer.ellipse(0,0,30,30)
            layer.strokeWeight(1.5)
            layer.ellipse(0,4,20,10)
            layer.arc(0,4,20,2,0,180)
            layer.line(-3,2,-3,1)
            layer.line(3,2,3,1)
            layer.strokeWeight(5)
            layer.point(-6,-5)
            layer.point(6,-5)
        break
        case 119:
            layer.stroke(120,fade)
            layer.strokeWeight(1.5)
            layer.rect(-2,-2,12,16,2)
            layer.rect(0,0,12,16,2)
            layer.rect(2,2,12,16,2)
            layer.strokeWeight(1)
            layer.ellipse(-2,-4,4)
            layer.ellipse(1.5,3,5)
        break
        case 120:
            layer.fill(120,fade)
            layer.rect(0,0,6,1)
            layer.ellipse(0,-2.5,2)
            layer.ellipse(0,2.5,2)
        break
        case 121:
            layer.fill(60,fade)
            layer.ellipse(0,0,8)
            layer.triangle(-2,0,2,0,0,10)
            layer.triangle(0,-2,0,2,-10,0)
        break
        case 122:
            layer.fill(120,fade)
            layer.rect(-4,0,3,11)
            layer.rect(4,0,3,11)
            layer.rect(0,-4,11,3)
            layer.fill(160,fade)
            layer.rect(-4,0,1,9)
            layer.rect(4,0,1,9)
            layer.rect(0,-4,9,1)
        break
        case 123:
            layer.stroke(150,0,200,fade)
            layer.strokeWeight(1)
            regPoly(layer,0,0,6,8,8,30)
            layer.line(-20/3,-4/3*sqrt(3),20/3,-4/3*sqrt(3))
            layer.line(-20/3,4/3*sqrt(3),20/3,4/3*sqrt(3))
        break
        case 124:
            layer.stroke(0,240,120,fade)
            layer.strokeWeight(1)
            layer.arc(0,0,8,10,-90,90)
            layer.line(0,-5,-3,-5)
            layer.line(0,5,-4,5)
            layer.line(0,-5,-2,5)
            layer.line(-1.5,-5,-3.5,5)
        break
        case 125:
            layer.stroke(240,120,0,fade)
            layer.strokeWeight(1)
            layer.arc(0,0,8,10,-90,90)
            layer.line(0,-5,-3,-5)
            layer.line(0,5,-4,5)
            layer.line(0,-5,-2,5)
            layer.line(-1.5,-5,-3.5,5)
        break
        case 126:
            layer.stroke(120,0,240,fade)
            layer.strokeWeight(1)
            layer.arc(0,0,8,10,-90,90)
            layer.line(0,-5,-3,-5)
            layer.line(0,5,-4,5)
            layer.line(0,-5,-2,5)
            layer.line(-1.5,-5,-3.5,5)
        break
        case 127:
            layer.stroke(0,120,240,fade)
            layer.strokeWeight(1)
            layer.line(0,-5,-2,5)
            layer.line(-1.5,-5,-3.5,5)
            layer.line(4,-5,-2,-5)
            layer.line(3,0,-1,0)
            layer.line(2,5,-4,5)
        break
        case 128:
            layer.fill(200,255,255,fade)
            layer.quad(-8,0,0,-10,8,0,0,10)
            layer.fill(225,255,255,fade)
            layer.quad(-6.4,0,0,-8,6.4,0,0,8)
            layer.fill(125,fade)
            layer.rect(-3.2,0,9.6,3.2)
            layer.triangle(1.6,-4.8,1.6,4.8,8,0)
        break
        case 129:
            layer.fill(125,255,255,fade)
            layer.rect(0,0,9,9)
            layer.fill(175,255,255,fade)
            layer.rect(0,0,6,6)
            layer.fill(225,255,255,fade)
            layer.rect(0,0,3,3)
        break
        case 130:
            layer.fill(255,255,50,fade)
            layer.beginShape()
            layer.vertex(0.5,-10)
            layer.vertex(-4,1.5)
            layer.vertex(0.5,1.5)
            layer.vertex(-0.5,10)
            layer.vertex(4,-1.5)
            layer.vertex(-0.5,-1.5)
            layer.endShape()
        break
        case 131:
            layer.fill(40,fade)
            layer.quad(-8.8,0,0,-10.8,8.8,0,0,10.8)
            layer.fill(200,255,255,fade)
            layer.quad(-8,0,0,-10,8,0,0,10)
            layer.fill(225,255,255,fade)
            layer.quad(-6.4,0,0,-8,6.4,0,0,8)
        break
        case 132:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noFill()
            layer.stroke(200,0,0,fade)
            layer.strokeWeight(1.5)
            layer.ellipse(0,0,10,10)
            layer.line(-3.5,-3.5,3.5,3.5)
            layer.stroke(255,255,100)
            layer.line(5,-5,-5,5)
        break
        case 133:
            for(let a=0,la=6;a<la;a++){
                layer.fill([255,255,255,0,0,150][a],[0,150,255,255,150,0][a],[0,0,0,50,255,200][a],fade)
                layer.quad(0,0,2*lsin(a*60-30),2*lcos(a*60-30),8*lsin(a*60),8*lcos(a*60),2*lsin(a*60+30),2*lcos(a*60+30))
            }
        break
        case 134:
            layer.fill(40,fade)
            regPolyBroken(layer,0,-1,8,2,2,-11.25)
            regPolyBroken(layer,-4,1,8,2,2,-11.25)
            regPolyBroken(layer,4,1,8,2,2,-11.25)
        break
        case 135:
            layer.fill(60,fade)
            layer.rect(0,2,20,2)
            layer.rect(-9,-1,2,4)
            layer.rect(9,-1,2,4)
            layer.fill(120,fade)
            layer.rect(-3,-1,2,4)
            layer.rect(3,-1,2,4)
        break
        case 136:
            layer.fill(225,fade)
            layer.ellipse(0,2,5,5)
            layer.ellipse(sin(120)*2,cos(120)*2,5,5)
            layer.ellipse(-sin(120)*2,cos(120)*2,5,5)
            for(let a=0,la=6;a<la;a++){
                layer.triangle(-1.5,6-a%2,1.5,6-a%2,0,8.25-a%2)
                layer.rotate(60)
            }
        break
        case 137:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            for(let a=0,la=6;a<la;a++){
                layer.triangle(-1.5,8,1.5,8,0,10.25)
                layer.rotate(60)
            }
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(0.875)
            layer.noFill()
            layer.ellipse(0,0,14,14)
            layer.line(-3.5*sqrt(2),3.5*sqrt(2),3.5*sqrt(2),-3.5*sqrt(2))
        break
        case 138:
            layer.fill(200,255,255,fade)
            layer.ellipse(0,0,11)
            layer.fill(150,fade)
            layer.triangle(0,0,-6,0,0,-6)
            layer.triangle(0,0,6,0,0,6)
            layer.fill(125,fade)
            layer.triangle(0,0,-6,0,0,6)
            layer.triangle(0,0,6,0,0,-6)
        break
        case 139:
            layer.fill(100,255,255,fade)
            layer.triangle(-4,-5,4,-5,0,-15)
            layer.fill(200,255,255,fade)
            layer.quad(-8,0,0,-10,8,0,0,10)
            layer.fill(225,255,255,fade)
            layer.quad(-6.4,0,0,-8,6.4,0,0,8)
        break
        case 140:
            layer.fill(100,255,255,fade)
            layer.triangle(-4,5,4,5,0,15)
            layer.fill(200,255,255,fade)
            layer.quad(-8,0,0,-10,8,0,0,10)
            layer.fill(225,255,255,fade)
            layer.quad(-6.4,0,0,-8,6.4,0,0,8)
        break
        case 141:
            layer.fill(40,fade)
            layer.rect(-4,-2,12,2)
            layer.rect(4,2,12,2)
            layer.triangle(2,-8,2,-1,10,-1)
            layer.triangle(-2,8,-2,1,-10,1)
        break
        case 142:
            layer.fill(40,fade)
            layer.rect(0,4,4,12)
            layer.triangle(-6,-2,6,-2,0,-10)
            layer.triangle(-2.5,2,-2.5,6,-6,4)
            layer.triangle(2.5,2,2.5,6,6,4)
        break
        case 143:
            layer.fill(255,240,225,fade)
            layer.ellipse(0,0,5,5)
            layer.rect(0,-2.5,1.5,4)
            layer.rect(0,2.5,1.5,4)
            layer.rect(-2.5,0,4,1.5)
            layer.rect(2.5,0,4,1.5)
            layer.noFill()
            layer.stroke(255,240,225,fade)
            layer.strokeWeight(1)
            layer.ellipse(0,0,12,12)
        break
        case 144:
            layer.stroke(255,0,0,fade)
            layer.strokeWeight(1)
            regPoly(layer,0,0,8,6,6,22.5)
            layer.line(3.5,-3.5,-3.5,3.5)
        break
        case 145:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.triangle(0,3.5,-1,5.5,1,5.5)
            layer.triangle(0,6,-1,8,1,8)
            layer.triangle(0,8.5,-1,10.5,1,10.5)
        break
        case 146:
            layer.fill(150,175,200,fade)
            layer.triangle(0,-6,-3,3,3,3)
            layer.triangle(0,3.5,-1,5.5,1,5.5)
            layer.triangle(0,6,-1,8,1,8)
            layer.triangle(0,8.5,-1,10.5,1,10.5)
        break
        case 147:
            layer.stroke(120,fade)
            layer.strokeWeight(1.5)
            layer.rect(0,0,12,16,2)
            layer.strokeWeight(1)
            layer.line(-6,-6,-2,-6)
            layer.line(-6,-4,3,-4)
            layer.line(6,-2,5,-2)
            layer.line(-6,0,-4,0)
            layer.line(6,2,-4,2)
            layer.line(6,4,-1,4)
            layer.line(-6,6,-1,6)
        break
        case 148:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.fill(150,0,0,fade)
            regStar(layer,0,0,8,6,6,3.6,3.6,0)
        break
        case 149:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,15)
            layer.fill(255,50,50,fade)
            layer.triangle(0,-12,-6,6,6,6)
        break
        case 150:
            layer.stroke(80,fade)
            layer.strokeWeight(2)
            layer.rect(0,0,16)
            layer.line(-2,-8,-8,-4)
            layer.line(4,8,8,4)
            layer.line(0,16,0,24)
            layer.line(-8*sqrt(2),8*sqrt(2),-12*sqrt(2),12*sqrt(2))
            layer.line(8*sqrt(2),8*sqrt(2),12*sqrt(2),12*sqrt(2))
        break
        case 151:
            layer.fill(225,fade)
            layer.ellipse(0,0,8)
            layer.rotate(-22.5)
            for(let a=0,la=8;a<la;a++){
                layer.triangle(-1,3,1,3,0,8)
                layer.rotate(45)
            }
            layer.rotate(22.5)
        break
        case 152:
            layer.stroke(80,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,10,3)
            layer.rect(0,-5,10,3)
            layer.rect(0,5,10,3)
        break
        case 153:
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(200,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
        break
        case 154:
            layer.fill(25,75,250,fade)
            layer.quad(0,-3,-3,0,0,3,3,0)
            layer.triangle(-1,-6,6,1,6,-6)
            layer.triangle(1,6,-6,-1,-6,6)
        break
        case 155:
            layer.fill(200,255,255,fade)
            layer.quad(-8,0,0,-10,8,0,0,10)
            layer.ellipse(10,6,4)
            layer.ellipse(16,6,4)
            layer.ellipse(22,6,4)
            layer.fill(225,255,255,fade)
            layer.quad(-6.4,0,0,-8,6.4,0,0,8)
            layer.ellipse(10,6,2)
            layer.ellipse(16,6,2)
            layer.ellipse(22,6,2)
        break
        case 156:
            layer.fill(220,20,20,fade)
            layer.quad(-6,3,6,-3,6,-6,-6,0)
            layer.fill(20,20,220,fade)
            layer.quad(-6,3,6,-3,6,0,-6,6)
            layer.noFill()
            layer.stroke(120,fade)
            layer.strokeWeight(1.5)
            layer.rect(0,0,12,16,2)
        break
        case 157:
            layer.fill(255,50,50,fade)
            layer.triangle(0,-6,-2,3,2,3)
            layer.triangle(-5,-6,-7,3,-3,3)
            layer.triangle(5,-6,7,3,3,3)
        break
        case 158:
            layer.fill(150,25,200,fade)
            layer.ellipse(0,0,10)
            layer.fill(125,25,175,fade)
            layer.ellipse(0,0,9)
            layer.fill(100,25,150,fade)
            layer.ellipse(0,0,8)
            layer.noFill()
            layer.stroke(200,150,225,fade)
            layer.strokeJoin(ROUND)
            layer.strokeWeight(0.5)
            regPolyStellate(layer,0,0,5,2,4,4,15)
            for(let a=0,la=5;a<la;a++){
                layer.arc(0,0,8,8,30+a*72,60+a*72)
            }
            layer.strokeJoin(MITER)
            layer.strokeWeight(1.5)
            for(let a=0,la=5;a<la;a++){
                layer.point(lsin(15+a*72)*4,lcos(15+a*72)*4)
            }
        break
        case 159:
            layer.fill(225,75,75,fade)
            regTriangle(layer,-5,0,4,4,0)
            layer.fill(225,75,225,fade)
            regTriangle(layer,0,-5,4,4,30)
            layer.fill(225,150,75,fade)
            regTriangle(layer,5,0,4,4,60)
            layer.fill(225,225,75,fade)
            regTriangle(layer,0,5,4,4,90)
        break
        case 160:
            layer.fill(125,fade)
            layer.rect(-3.2,0,9.6,3.2)
            layer.triangle(1.6,-4.8,1.6,4.8,8,0)
        break
        case 161:
            layer.fill(150,175,200,fade)
            layer.triangle(2,-6,4,3,0,3)
            layer.quad(-4.5,0,-3,-1.5,-1.5,0,-3,1.5)
        break
        case 162:
            for(let a=0,la=6;a<la;a++){
                layer.rotate(a==3?90:45)
                layer.fill(100,200,225,fade)
                layer.quad(0,3,-1,5,0,8,1,5)
            }
        break
        case 163:
            layer.stroke(100,50,100,fade)
            layer.strokeWeight(0.5)
            for(let a=0,la=10;a<la;a++){
                layer.line(lsin(a*36)*3,lcos(a*36)*3,lsin(a*36)*8,lcos(a*36)*8)
                layer.line(lsin(a*36)*7+lcos(a*36)*1.5,lcos(a*36)*7-lsin(a*36)*1.5,lsin(a*36)*7-lcos(a*36)*1.5,lcos(a*36)*7+lsin(a*36)*1.5)
            }
        break
        case 164:
            layer.stroke(227,128,43,fade*0.5)
            layer.strokeWeight(1.5)
            for(let a=0,la=12;a<la;a++){
                layer.line(lsin(a/la*360)*8,lcos(a/la*360)*8,lsin(a/la*360)*16,lcos(a/la*360)*16)
            }
            layer.stroke(255,206,121,fade*0.5)
            layer.strokeWeight(1)
            for(let a=0,la=12;a<la;a++){
                layer.line(lsin(a/la*360)*8,lcos(a/la*360)*8,lsin(a/la*360)*16,lcos(a/la*360)*16)
            }
            layer.stroke(255,236,200,fade*0.5)
            layer.strokeWeight(0.5)
            for(let a=0,la=12;a<la;a++){
                layer.line(lsin(a/la*360)*8,lcos(a/la*360)*8,lsin(a/la*360)*16,lcos(a/la*360)*16)
            }
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
29-Single Damage Up
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
51-Status Card
52-Stash
53-Assort
54-Exhausting Card
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
76-Wide Card
77-offcolor
78-Foil Card
79-Holographic Card
80-Polychrome Card
81-Negative Card
82-Silver Card
83-Erratic Card
84-Fragile
85-Rare
86-Odd
87-Even
88-Edition
89-Duplicate Card
90-Card 1
91-Card 2
92-Card 3
93-Anti-Control
94-Holding Block
95-Uncommon
96-Conditioning
97-World
98-Anti-Innate
99-Arcana
100-Common
101-Cream Paper
102-Pink Paper
103-Booster Pack
104-Either Paper
105-Trifecta
106-Miss
107-Eye
108-Basic Card
109-Fragile Damage Up
110-Madness
111-Old Common
112-Old Uncommon
113-Spectral
114-Prism
115-Low Roll
116-Nonvisible Node
117-Trough
118-Duck
119-Triochrome
120-Select
121-Shop Rarity
122-Staple
123-Skill
124-Deck (Pile)
125-Discard (Pile)
126-Draw (Pile)
127-Exhaust (Pile)
128-Retain Energy
129-Shock
130-Freeze
131-Base Energy
132-Cancel Exhaust
133-Prismatic Bomb
134-Nothings
135-Tick
136-Cannot Move All
137-Cannot Add Block All
138-Pristine
139-High Cost
140-Low Cost
141-RightLeftHarpoon
142-Up Arrow Sided
143-Cleanse
144-Stop
145-Strength in 3 Turns
146-Dexterity in 3 Turns
147-Glitched Card
148-Lose Per Turn
149-Permanent Strength
150-Node With Paths
151-Invisible
152-Event Choice
153-Free Defense
154-Replenish
155-Delayed Energy
156-Colored Card
157-Triple Damage
158-Astrology
159-Transform
160-Retain (Subpart)
161-Block Up
162-Ice Wing
163-Occult
164-Sword of Hisou
*/