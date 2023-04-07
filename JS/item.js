class item{
    constructor(layer,player,x,y,type,size){
        this.layer=layer
        this.player=player
        this.position={x:x,y:y}
        this.type=type
        this.size=size

        this.name=types.item[this.type].name
        this.description=types.item[this.type].description
        this.rarity=types.item[this.type].rarity

        this.fade=0
        this.infoFade=0
        this.deFade=false
    }
    display(){
        if(this.fade>0){
            this.layer.push()
            this.layer.translate(this.position.x,this.position.y)
            this.layer.scale(this.size)
            this.layer.fill(200,this.fade)
            this.layer.noStroke()
            this.layer.ellipse(0,0,40,40)
            switch(this.name){
                case '':
                    displaySymbol(this.layer,0,0,30,0,1,this.fade)
                break
                case 'Empty':
                    displaySymbol(this.layer,0,0,31,0,1,this.fade)
                break
                case 'Rock':
                break
            }
            this.layer.pop()
        }
    }
    displayInfo(){
        if(this.infoFade>0){
            this.layer.fill(150,this.infoFade)
            this.layer.noStroke()
            this.layer.rect(100,240,160,120,10)
            this.layer.fill(0,this.infoFade)
            this.layer.textSize(12)
            this.layer.text(this.name,100,200)
            this.layer.textSize(8)
            this.layer.text(this.description,100,245)
            this.layer.textSize(10)
            switch(this.rarity){
                case 0:
                    this.layer.text('Common',100,290)
                break
                case 1:
                    this.layer.text('Uncommon',100,290)
                break
                case 2:
                    this.layer.text('Rare',100,290)
                break
                case 3:
                    this.layer.text('Boss',100,290)
                break
            }
        }
    }
    update(up,total,inputs){
        this.fade=smoothAnim(this.fade,up&&!this.deFade||this.type==0&&total>0,0,1,5)
        this.infoFade=smoothAnim(this.infoFade,up&&dist(inputs.rel.x,inputs.rel.y,this.position.x,this.position.y)<20*this.size&&this.type!=0,0,1,5)
    }
}