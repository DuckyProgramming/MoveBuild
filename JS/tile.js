class tile{
    constructor(layer,x,y,relativeX,relativeY,tileX,tileY){
        this.layer=layer
        this.position={x:x,y:y}
        this.relativePosition={x:relativeX,y:relativeY}
        this.tilePosition={x:tileX,y:tileY}

        this.fade=1
        this.occupied=false

        this.anim={target:[0,0,0]}

        this.targetted=[false,false,false]
    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        if(this.occupied){
            this.layer.fill(80,this.fade)
        }else{
            this.layer.fill(100,this.fade)
        }
        this.layer.noStroke()
        regPoly(this.layer,0,0,6,40,18,0)
        let stack=0
        if(this.anim.target[0]>0){
            this.layer.noFill()
            this.layer.stroke(200,this.fade*this.anim.target[0])
            this.layer.strokeWeight(2)
            this.layer.ellipse(0,0,game.targetRadius*2)
            stack++
        }
        if(this.anim.target[1]>0){
            this.layer.noFill()
            this.layer.stroke(255,50,50,this.fade*this.anim.target[1])
            this.layer.strokeWeight(2)
            this.layer.ellipse(0,0,game.targetRadius*2-stack*4)
            stack++
        }
        if(this.anim.target[2]>0){
            this.layer.noFill()
            this.layer.stroke(200,0,0,this.fade*this.anim.target[2])
            this.layer.strokeWeight(2)
            this.layer.ellipse(0,0,game.targetRadius*2-stack*4)
        }
        this.layer.pop()
    }
    update(){
        for(let g=0,lg=this.anim.target.length;g<lg;g++){
            this.anim.target[g]=smoothAnim(this.anim.target[g],this.targetted[g],0,1,5)
            this.targetted[g]=false
        }
    }
    displayCoordinate(coordinateAnim){
        this.layer.fill(0,this.fade*coordinateAnim)
        this.layer.noStroke()
        this.layer.textSize(12)
        this.layer.text((this.tilePosition.x+1)+','+(this.tilePosition.y+1),this.position.x,this.position.y)
    }
}