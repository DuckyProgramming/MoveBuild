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
    }
    layer.pop()
}
function displayIntentSymbol(layer,x,y,type,effect,direction,size,fade){
    layer.push()
    layer.translate(x,y)
    layer.rotate(direction)
    layer.scale(size)
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
        case 1: case 3: case 4: case 5:
            layer.text(effect[0],0,0)
        break
        case 2:
            layer.text(effect[0]+'x3',0,0)
        break
    }
    layer.pop()
}