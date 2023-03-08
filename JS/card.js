class card{
    constructor(layer,x,y,type,level,color,id){
        this.layer=layer
        this.position={x:x,y:y}
        this.type=type
        this.level=level
        this.color=color
        this.id=id
        this.width=90
        this.height=120
        this.size=1
        this.fade=1
        this.deSize=false
        this.deFade=false
        this.upSize=false

        this.colorDetail=types.color.card[this.color]

        this.name=types.card[this.type].name
        this.effect=types.card[this.type].levels[this.level].effect
        this.attack=types.card[this.type].levels[this.level].attack
        this.cost=types.card[this.type].levels[this.level].cost
        this.levels=types.card[this.type].levels.length
    }
    description(){
        let string=''
        switch(this.attack){
            case 1: string+='Deal '+this.effect[0]+'\nDamage'; break
            case 2: string+='Add '+this.effect[0]+ '\nBlock'; break
            case 3: string+='Move '+this.effect[0]+'\nTiles'; break
        }
        return string
    }
    display(){
        if(this.size>0&&this.fade>0){
            this.layer.push()
            this.layer.translate(this.position.x,this.position.y)
            this.layer.scale(this.size)
            this.layer.fill(this.colorDetail.fill,this.fade)
            this.layer.stroke(this.colorDetail.stroke,this.fade)
            this.layer.strokeWeight(5)
            this.layer.rect(0,0,this.width,this.height,5)
            this.layer.fill(mergeColor([0,0,0],this.colorDetail.text,this.level/max(1,this.levels-1)),this.level/2,this.fade)
            this.layer.noStroke()
            this.layer.textSize(12)
            this.layer.text(this.name+multiplyString('+',this.level),0,-this.height/2+15)
            this.layer.textSize(8)
            this.layer.text(this.description(),0,5)
            this.layer.pop()
        }
    }
    update(){
        if(this.deSize&&this.size>0){
            this.size=round(this.size*10-1)/10
        }else if(!this.deSize&&(this.size<1||this.upSize&&this.size<1.5)){
            this.size=round(this.size*10+1)/10
        }
        if(this.deFade&&this.fade>0){
            this.fade=round(this.fade*10-1)/10
        }else if(!this.deFade&&this.size<1){
            this.fade=round(this.fade*10+1)/10
        }
    }
}