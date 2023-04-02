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
    }
    layer.pop()
}