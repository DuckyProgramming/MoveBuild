function displayStatusSymbol(layer,x,y,type,direction,size,fade){
    layer.push()
    layer.translate(x,y)
    layer.rotate(direction)
    layer.scale(size)
    switch(type){
        case 0:
            layer.fill(255,50,50,this.fade)
            layer.triangle(-3,-6,-5,4,-1,4)
            layer.triangle(3,-6,5,4,1,4)
        break
    }
    layer.pop()
}