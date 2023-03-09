class tile{
    constructor(layer,x,y,relativeX,relativeY,tileX,tileY){
        this.layer=layer
        this.position={x:x,y:y}
        this.relativePosition={x:relativeX,y:relativeY}
        this.tilePosition={x:tileX,y:tileY}

        this.fade=1
        this.occupied=false

        this.anim={target:[0]}
    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        this.layer.fill(100,this.fade)
        this.layer.noStroke()
        regPoly(this.layer,0,0,6,40,18,0)
        this.layer.fill(0)
        this.layer.textSize(10)
        this.layer.text(this.tilePosition.x+','+this.tilePosition.y,0,0)
        if(this.anim.target[0]>0){
            this.layer.noFill()
            this.layer.stroke(200,this.fade*this.anim.target[0])
            this.layer.strokeWeight(2)
            this.layer.ellipse(0,0,game.targetRadius*2)
        }
        this.layer.pop()
    }
}