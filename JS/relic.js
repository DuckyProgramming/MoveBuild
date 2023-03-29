class relic{
    constructor(layer,x,y,type){
        this.layer=layer
        this.position={x:x,y:y}
        this.type=type

        this.name=types.relic[this.type].name

        this.fade=1
    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        this.layer.fill(200,this.fade)
        this.layer.noStroke()
        this.layer.ellipse(0,0,40,40)
        switch(this.name){
            case '':
            break
        }
        this.layer.pop()
    }
    update(){
        this.fade=smoothAnim(this.fade,dist(inputs.rel.x,inputs.rel.y,25,50)<20||this.type==0,0,1,5)
    }
}