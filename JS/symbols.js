function displayStatusSymbol(layer,x,y,type,direction,size,fade){
    layer.push()
    layer.translate(x,y)
    layer.rotate(direction)
    layer.scale(size)
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
    }
    layer.pop()
}
function displayIntentSymbol(layer,x,y,type,effect,direction,size,fade){
    layer.push()
    layer.translate(x,y)
    layer.rotate(direction)
    layer.scale(size)
    switch(type){
        case 1: case 6:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,-4.5,-3,-4.5,3)
        break
        case 2:
            layer.fill(255,50,50,fade)
            layer.triangle(9,0,0,-2,0,2)
            layer.triangle(3,-3,-6,-5,-6,-1)
            layer.triangle(3,3,-6,1,-6,5)
        break
        case 3: case 7:
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
            layer.fill(125,125,125,fade)
            layer.stroke(100,100,100,fade)
            layer.strokeWeight(1)
            layer.rect(0,0,6,8,1)
        break
    }
    layer.fill(0,fade)
    layer.noStroke()
    layer.textSize(8)
    switch(type){
        case 1: case 3: case 4: case 5: case 6: case 7:
            layer.text(effect[0],0,0)
        break
        case 2:
            layer.text(effect[0]+'x3',0,0)
        break
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
                layer.line(sin(a*30)*3,cos(a*30)*3,sin(a*30)*6,cos(a*30)*6)
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
                layer.vertex(sin(360*a/la)*(10-a%2*5),cos(360*a/la)*(10-a%2*5))
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
                layer.vertex(sin(360*a/la)*(10-a%2*6),cos(360*a/la)*(10-a%2*6))
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
                layer.vertex(sin(360*a/la)*(10-a%2*4),cos(360*a/la)*(10-a%2*4))
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
                layer.line(sin(360*a/la)*25,cos(360*a/la)*25,sin(360*(a-0.5)/la)*35,cos(360*(a-0.5)/la)*35)
                layer.line(sin(360*a/la)*25,cos(360*a/la)*25,sin(360*(a+0.5)/la)*35,cos(360*(a+0.5)/la)*35)
                layer.line(sin(360*(a-0.5)/la)*35,cos(360*(a-0.5)/la)*35,sin(360*(a-0.5)/la)*40,cos(360*(a-0.5)/la)*40)
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
29-Single Strength
30-Item
31-Empty
32-Rest
33-Pain
34-Elite
35-Boss
36-Shiv
37-Armor
*/