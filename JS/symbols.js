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
                layer.vertex(sin(a/(la-1)*180)*(5-a%2*3)+0.5,cos(a/(la-1)*180)*(5-a%2*3))
            }
            layer.endShape()
            layer.fill(200,255,255,fade)
            layer.quad(-4,0,-0.8,-4,2.4,0,-0.8,4)
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
            layer.fill(255,50,50,fade)
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
            layer.quad(-4.5,0,-3,-1.5,-1.5,0,-3,1.5)
            layer.rect(3,0,3,3)
        break
        case 41:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.noStroke()
            layer.rect(-5,0,3,3)
        break
        case 42:
            layer.fill(240,240,220,fade)
            layer.ellipse(0,0,12,12)
            layer.fill(220,220,200,fade)
            layer.ellipse(0,0,7.5,7.5)
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
            layer.ellipse(0,0,8,8)
            layer.line(-3,-1,-1,1)
            layer.line(-3,1,-1,-1)
            layer.line(3,-1,1,1)
            layer.line(3,1,1,-1)
        break
        case 46:
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
            layer.ellipse(0,0,8,8)
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
                layer.vertex(sin(a/(la-1)*180)*(5-a%2*3)+0.5,cos(a/(la-1)*180)*(5-a%2*3))
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
            layer.quad(-4.5,0,-3,-1.5,-1.5,0,-3,1.5)
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
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(lsin(360*a/la)*(5-a%2*2),lcos(360*a/la)*(5-a%2*2))
            }
            layer.endShape(CLOSE)
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
            layer.ellipse(0,0,8,8)
            layer.line(-2*sqrt(2),2*sqrt(2),2*sqrt(2),-2*sqrt(2))
        break
        case 80:
            layer.fill(150,0,0,fade)
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(sin(a/la*360)*(6-a%2*3.6)+0.5,cos(a/la*360)*(6-a%2*3.6))
            }
            layer.endShape()
            layer.stroke(0,fade)
            layer.strokeWeight(0.6)
            layer.noFill()
            layer.ellipse(0,0,8,8)
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
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(sin(a/la*360)*(6-a%2*3.6)+0.5,cos(a/la*360)*(6-a%2*3.6))
            }
            layer.endShape()
        break
        case 87:
            layer.fill(150,0,0,fade)
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(sin(a/la*360)*(6-a%2*3.6)+0.5,cos(a/la*360)*(6-a%2*3.6))
            }
            layer.endShape()
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
            layer.ellipse(0,0,8,8)
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
            layer.rect(0,0,4.5,6,1)
            layer.noFill()
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(0.5)
            layer.ellipse(0,0,8,8)
            layer.line(-2*sqrt(2),2*sqrt(2),2*sqrt(2),-2*sqrt(2))
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
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(sin(a/la*360)*(6-a%2*3.6),cos(a/la*360)*(6-a%2*3.6))
            }
            layer.endShape()
            layer.fill(255,100,100,fade)
            layer.rect(0,0,3,12)
            layer.rect(0,0,12,3)
        break
        case 96:
            layer.stroke(100,0,0,fade)
            layer.strokeWeight(1)
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(lsin(360*a/la)*(5-a%2*2),lcos(360*a/la)*(5-a%2*2))
            }
            layer.endShape(CLOSE)
            layer.line(-3/2,-3/2,3/2,3/2)
            layer.line(-3/2,3/2,3/2,-3/2)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,-0.5,4.5,6,1)
            layer.noStroke()
            layer.fill(0,150,255,fade)
            layer.rect(-3,0,9,3)
            layer.triangle(1.5,-4.5,1.5,4.5,7.5,0)
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
                layer.vertex(lsin(-216+180*a/(la-1))*(5-a%2*2.5),lcos(-2716180*a/(la-1))*(5-a%2*2.5))
            }
            layer.vertex(0,0)
            layer.endShape(CLOSE)
        break
        case 98:
            layer.fill(150,0,0,fade)
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(sin(a/la*360)*(6-a%2*3.6),cos(a/la*360)*(6-a%2*3.6))
            }
            layer.endShape()
            layer.fill(200,0,0,fade)
            layer.arc(0,0,6,6,-45,225)
            layer.quad(0,0,sqrt(2)*1.5,-sqrt(2)*1.5,0,-sqrt(2)*3,-sqrt(2)*1.5,-sqrt(2)*1.5)
            layer.rect(-5,0,3,3)
        break
        case 99:
            layer.fill(150,0,0,fade)
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(sin(a/la*360)*(6-a%2*3.6),cos(a/la*360)*(6-a%2*3.6))
            }
            layer.endShape()
            layer.fill(200,0,0,fade)
            layer.arc(0,0,6,6,-45,225)
            layer.quad(0,0,sqrt(2)*1.5,-sqrt(2)*1.5,0,-sqrt(2)*3,-sqrt(2)*1.5,-sqrt(2)*1.5)
            layer.ellipse(5.5,0,4,4)
        break
        case 100:
            layer.fill(150,0,0,fade)
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(sin(a/la*360)*(6-a%2*3.6),cos(a/la*360)*(6-a%2*3.6))
            }
            layer.endShape()
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
            layer.ellipse(0,0,8,8)
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
            layer.ellipse(0,0,8,8)
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
            layer.stroke(100,255,255,fade)
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
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(sin(a/la*360)*(6-a%2*3.6)+0.5,cos(a/la*360)*(6-a%2*3.6))
            }
            layer.endShape()
        break
        case 116:
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
            layer.rect(-0.75,1.5,3,3)
            layer.noStroke()
            layer.triangle(-1.5,4.5,1.5,4.5,0,6.5)
        break
        case 117:
            layer.stroke(200,0,0,fade)
            layer.strokeWeight(2)
            layer.point(0,0)
            layer.ellipse(0,0,6,6)
            layer.line(0,-3,0,-6)
            layer.line(-3,0,-6,0)
            layer.line(0,3,0,6)
            layer.line(3,0,6,0)
        break
        case 118:
            layer.fill(0,150,255,fade)
            layer.ellipse(0,0,8,8)
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
            layer.fill(0,150,255,fade)
            layer.rect(-3,0,9,3)
            layer.triangle(1.5,-4.5,1.5,4.5,7.5,0)
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
            layer.stroke(200,200,50,fade)
            layer.strokeWeight(1)
            layer.quad(0,-4*sqrt(2),-4*sqrt(2),0,0,4*sqrt(2),4*sqrt(2),0)
            layer.rect(0,0,8,8)
            layer.noStroke()
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
        break
        case 127:
            layer.stroke(200,200,50,fade)
            layer.strokeWeight(1)
            layer.quad(0,-4*sqrt(2),-4*sqrt(2),0,0,4*sqrt(2),4*sqrt(2),0)
            layer.rect(0,0,8,8)
            layer.fill(125,fade)
            layer.stroke(100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,4.5,6,1)
        break
        case 128:
            layer.fill(150,0,0,fade)
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(sin(a/la*360)*(6-a%2*3.6)+0.5,cos(a/la*360)*(6-a%2*3.6))
            }
            layer.endShape()
            layer.triangle(0,6.5,-1,9.5,1,9.5)
        break
        case 129:
            layer.fill(255,200,255,fade)
            layer.beginShape()
            for(let a=0,la=8;a<la;a++){
                layer.vertex(sin(a/la*360)*(4-a%2*3)+0.5,cos(a/la*360)*(4-a%2*3))
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
            layer.quad(0,-4*sqrt(2),-4*sqrt(2),0,0,4*sqrt(2),4*sqrt(2),0)
            layer.rect(0,0,8,8)
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
            layer.rect(-2.5,0,7,3)
            layer.triangle(1,-5.5,1,5.5,8,0)
        break
        case 137:
            layer.stroke(0,fade)
            layer.strokeWeight(0.6)
            layer.noFill()
            layer.ellipse(0,0,8,8)
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
            layer.fill(150,175,200,fade)
			layer.triangle(-5,-3,5,-3,0,-6)
			layer.arc(0,-3,10,16,0,180)
            layer.fill(150,0,0,fade)
            layer.beginShape()
            for(let a=0,la=16;a<la;a++){
                layer.vertex(sin(a/la*360)*(6-a%2*3.6)+0.5,cos(a/la*360)*(6-a%2*3.6))
            }
            layer.endShape()
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
            layer.fill(0,fade)
            layer.ellipse(0,0,9,9)
            for(let a=0,la=10;a<la;a++){
                layer.rotate(36)
                layer.triangle(-0.5,-4,0.5,-4,0,-6)
            }
            layer.fill(200,255,255,fade)
            layer.quad(-5,0,0,-6.25,5,0,0,6.25)
            layer.fill(225,255,255,fade)
            layer.quad(-4,0,0,-5,4,0,0,5)
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
            layer.rect(-3,0,9,3)
            layer.triangle(1.5,-4.5,1.5,4.5,7.5,0)
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

    }
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
        if(typeFades[a]>=0.2){
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
                    layer.line(6,0,3,-6)
                    layer.line(0,2,3,-6)
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
        case 12:
            layer.fill(255,50,50,fade)
            layer.rect(-1.5,0,6,6)
            layer.arc(1.5,0,9,6,-90,90)
        break
        case 13:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,8,8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 14:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,8,8)
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
            layer.ellipse(0,0,8,8)
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
        break
        case 31:
            layer.fill(255,50,50,fade)
            layer.triangle(7,-3,-3.5,-5,-3.5,-1)
            layer.triangle(7,3,-3.5,1,-3.5,5)
        break
        case 32:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,8,8)
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
            layer.ellipse(0,0,8,8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,0,-2,0,2)
            layer.triangle(3,-3,-6,-5,-6,-1)
            layer.triangle(3,3,-6,1,-6,5)
        break
        case 35:
            layer.fill(240,240,40,fade)
            layer.ellipse(0,0,8,8)
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
            layer.ellipse(0,0,8,8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
            layer.rect(-5.5,0,1,6)
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
            layer.ellipse(0,0,8,8)
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
            layer.ellipse(-7,0,3,3)
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
            layer.ellipse(0,0,8,8)
            layer.fill(255,50,50,fade)
            layer.triangle(7,-3,-3.5,-5,-3.5,-1)
            layer.triangle(7,3,-3.5,1,-3.5,5)
            layer.rect(-4.5,0,1,6)
        break
        case 67:
            layer.fill(240,240,220,fade)
            layer.ellipse(0,0,8,8)
            layer.fill(220,220,200,fade)
            layer.ellipse(0,0,5,5)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.rect(-5.5,0,1,6)
        break
        case 68:
            layer.fill(150,255,255,fade)
            layer.rect(-3,0,9,3)
            layer.triangle(1.5,-4.5,1.5,4.5,7.5,0)
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
            layer.ellipse(0,0,8,8)
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
            layer.fill(240,240,220,fade)
            layer.ellipse(0,0,8,8)
            layer.fill(220,220,200,fade)
            layer.ellipse(0,0,5,5)
        break
        case 76:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,8,8)
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
            layer.ellipse(0,0,8,8)
            layer.fill(255,50,50,fade)
            layer.rect(-1.5,0,6,6)
            layer.arc(1.5,0,9,6,-90,90)
        break
        case 82:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,8,8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-2,-4.5,2)
            layer.triangle(9,-4,-4.5,-2,-4.5,2)
            layer.triangle(9,4,-4.5,-2,-4.5,2)
        break
        case 83:
            layer.fill(0,255,100,fade)
            layer.ellipse(0,0,8,8)
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
            layer.fill(225,fade)
            layer.ellipse(0,3,7.5,7.5)
            layer.ellipse(sin(120)*3,cos(120)*3,7.5,7.5)
            layer.ellipse(-sin(120)*3,cos(120)*3,7.5,7.5)
        break
        case 89:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,8,8)
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
            layer.ellipse(0,0,8,8)
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
            layer.fill(200,255,255,fade)
            layer.quad(-6,0,0,-7.5,6,0,0,7.5)
            layer.fill(225,255,255,fade)
            layer.quad(-4.8,0,0,-6,4.8,0,0,6)
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
            layer.triangle(0,6,-3,-3,3,-3)
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
            layer.triangle(0,6,-3,-3,3,-3)
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
            layer.fill(200,255,255,fade)
            layer.quad(-4,0,0,-5,4,0,0,5)
            layer.fill(225,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
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
            layer.ellipse(0,0,8,8)
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
                layer.triangle(9,0,0,-2,0,2)
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
            layer.ellipse(0,0,8,8)
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
            layer.fill(200,255,255,fade)
            layer.quad(-4,0,0,-5,4,0,0,5)
            layer.fill(225,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
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
            layer.ellipse(0,0,8,8)
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
            layer.ellipse(0,0,8,8)
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
            layer.ellipse(0,0,8,8)
            layer.rotate(-22.5)
            for(let a=0,la=8;a<la;a++){
                layer.triangle(-1,3,1,3,0,8)
                layer.rotate(45)
            }
            layer.rotate(22.5)
        break
        case 178:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,8,8)
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
            layer.ellipse(-7.5,-2.25,3,3)
            layer.ellipse(-7.5,2.25,3,3)
        break
        case 179:
            layer.fill(150,0,0,fade)
            layer.ellipse(0,0,8,8)
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
            layer.ellipse(0,0,8,8)
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
            layer.ellipse(0,0,8,8)
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
            layer.fill(200,255,255,fade)
            layer.quad(-4,0,0,-5,4,0,0,5)
            layer.fill(225,255,255,fade)
            layer.quad(-3.2,0,0,-4,3.2,0,0,4)
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
    }
    layer.fill(0,fade)
    layer.noStroke()
    layer.textSize(8)
    if(info){
        switch(type){
            case 1: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 12:
            case 13: case 14: case 16: case 18: case 22: case 23: case 25: case 26: case 28: case 29:
            case 32: case 33: case 35: case 36: case 38: case 39: case 40: case 41: case 42: case 43:
            case 46: case 48: case 49: case 51: case 52: case 53: case 54: case 55: case 58: case 60:
            case 61: case 62: case 63: case 64: case 65: case 69: case 70: case 71: case 73: case 78:
            case 79: case 80: case 81: case 82: case 83: case 85: case 87: case 88: case 89: case 90:
            case 91: case 94: case 96: case 98: case 100: case 102: case 105: case 106: case 109: case 111:
            case 113: case 115: case 116: case 117: case 120: case 121: case 122: case 123: case 125: case 126:
            case 127: case 128: case 130: case 131: case 132: case 134: case 135: case 136: case 137: case 138:
            case 139: case 143: case 144: case 145: case 146: case 152: case 153: case 155: case 157: case 159:
            case 160: case 161: case 162: case 164: case 165: case 166: case 167: case 169: case 170: case 174:
            case 175: case 176: case 177: case 178: case 180: case 181: case 182: case 183: case 185: case 189:
            case 192: case 193: case 195: case 196: case 197: case 200: case 202: case 203: case 204: case 205:
            case 208: case 209: case 210: case 211: case 213: case 214: case 216: case 218: case 219: case 220:
            case 221: case 222: case 223: case 224: case 228: case 229: case 230: case 231: case 233: case 234:
            case 235: case 237: case 238: case 239: case 240:
                layer.text(effect[0],0,0)
            break
            case 20: case 31: case 47: case 59: case 66: case 97: case 99: case 103: case 133: case 156:
            case 168: case 173: case 179: case 194: case 206:
                layer.text(`${effect[0]}x2`,0,0)
            break
            case 2: case 19: case 34: case 45: case 76: case 86: case 104: case 118: case 147: case 236:
                layer.text(`${effect[0]}x3`,0,0)
            break
            case 77: case 95: case 101:
                layer.text(`${effect[0]}x4`,0,0)
            break
            case 11: case 129: case 191:
                layer.text(`${effect[0]}x5`,0,0)
            break
            case 184:
                layer.text(`${effect[0]}x6`,0,0)
            break
            case 15: case 17: case 24: case 27: case 30: case 44: case 50: case 67: case 72: case 84:
            case 108: case 110: case 112: case 114: case 119: case 124: case 140: case 141: case 142: case 148:
            case 150: case 151: case 154: case 158: case 163: case 187: case 198: case 199: case 201: case 215:
            case 217: case 241:
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
            case 107: case 171:
                layer.text(`${effect[0]}x2|${effect[1]}`,0,0)
            break
            case 149:
                layer.text(`${effect[0]}x3|${effect[1]}`,0,0)
            break
            case 172:
                layer.text(`${effect[0]}%`,0,0)
            break
            case 188:
                layer.text(`${effect[0]}xR`,0,0)
            break
            case 190:
                layer.text(`${effect[0]}|${effect[1]}|${effect[2]}`,0,0)
            break
            case 207:
                layer.text(`${effect[0]}+`,0,0)
            break
            case 212:
                layer.text(`${effect[0]}x(1-2)`,0,0)
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