class tile{
    constructor(layer,x,y,tileX,tileY){
        this.layer=layer
        this.position={x:x,y:y}
        this.tilePosition={x:tileX,y:tileY}
    }
    display(){
        this.layer.fill(80)
        this.layer.noStroke()
        regPoly(this.layer,this.position.x,this.position.y,6,44,20,0)
    }
}