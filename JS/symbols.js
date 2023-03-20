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
    }
    layer.fill(0,fade)
    layer.textSize(8)
    switch(type){
        case 1:
            layer.text(effect[0],0,0)
        break
        case 2:
            layer.text(effect[0]+'x3',0,0)
        break
    }
    layer.pop()
}