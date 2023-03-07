class card{
    constructor(layer,x,y,type,level,color,id){
        this.layer=layer
        this.position={x:x,y:y}
        this.type=type
        this.level=level
        this.color=color
        this.id=id
        this.width=60
        this.height=80
        this.size=1
        this.fade=1
        this.deSize=false
        this.deFade=false

        this.name=types.card[this.type].name
    }
    display(){
        if(this.size>0&&this.fade>0){
            this.layer.push()
            this.layer.translate(this.position.x,this.position.y)
            this.layer.scale(this.size)
            this.layer.fill(types.color[this.color].fill,this.fade)
            this.layer.stroke(types.color[this.color].stroke,this.fade)
            this.layer.strokeWeight(5)
            this.layer.rect(0,0,this.width,this.height)
            this.layer.pop()
        }
    }
    update(){
        if(this.deSize&&this.size>0){
            this.size=round(this.size*10-1)/10
        }else if(!this.deSize&&this.size<1){
            this.size=round(this.size*10+1)/10
        }
        if(this.deFade&&this.fade>0){
            this.fade=round(this.fade*10-1)/10
        }else if(!this.deFade&&this.size<1){
            this.fade=round(this.fade*10+1)/10
        }
    }
}