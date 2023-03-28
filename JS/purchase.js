class purchase{
    constructor(layer,battle,player,x,y,type,cost,args){
        this.layer=layer
        this.battle=battle
        this.player=player
        this.position={x:x,y:y}
        this.type=type
        this.cost=cost
        this.args=args
        this.size=1
        this.usable=true
        this.deSize=false
        this.upSize=false
        this.anim={usable:1,afford:0}
        switch(this.type){
            case 1:
                this.card=new card(this.layer,this.battle,this.player,0,0,this.args[0],this.args[1],this.args[2],0)
            break
        }
    }
    buy(){
        if(this.battle.currency.money[this.player]>=this.cost&&this.usable){
            this.battle.currency.money[this.player]-=this.cost
            this.usable=false
            this.deSize=true
            switch(this.type){
                case 1:
                    this.battle.cardManagers[this.player].deck.add(this.card.type,this.card.level,this.card.color)
                break
                case 2:
                    this.battle.overlayManager.overlays[6][this.player].active=true
                    this.battle.overlayManager.overlays[6][this.player].activate()
                break
            }
        }
    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        if(this.size>0){
            this.layer.scale(this.size)
            switch(this.type){
                case 1:
                    this.card.size=1
                    this.card.display()
                break
                case 2:
                    this.layer.fill(200,150,150)
                    this.layer.stroke(200,125,125)
                    this.layer.strokeWeight(5)
                    this.layer.rect(0,0,90,120,5)
                    this.layer.fill(0,this.fade)
                    this.layer.noStroke()
                    this.layer.textSize(10)
                    this.layer.text('Remove Card',0,0)
                break
            }
            this.layer.scale(1/min(this.size,1))
        }
        switch(this.type){
            case 1: case 2:
                this.layer.fill(mergeColor([255,0,0],[230,230,210],this.anim.afford)[0],mergeColor([255,0,0],[230,230,210],this.anim.afford)[1],mergeColor([255,0,0],[230,230,210],this.anim.afford)[2],this.anim.usable)
                this.layer.textSize(16)
                this.layer.text(this.cost,0,72.5)
                this.layer.fill(255,0,0,1-this.anim.usable)
                this.layer.textSize(16)
                this.layer.text('Sold Out',0,72.5)
            break
        }
        this.layer.pop()
    }
    update(){
        if(this.deSize&&this.size>0||!this.upSize&&this.size>1){
            this.size=round(this.size*5-1)/5
        }else if(!this.deSize&&(this.size<1||this.upSize&&this.size<1.5)){
            this.size=min(round(this.size*5+1)/5,1.5)
        }
        this.anim.usable=smoothAnim(this.anim.usable,this.usable,0,1,5)
        this.anim.afford=smoothAnim(this.anim.afford,this.battle.currency.money[this.player]>=this.cost,0,1,5)
        switch(this.type){
            case 1:
                this.card.anim.afford=1
            break
        }
        if(this.type==1&&pointInsideBox({position:inputs.rel},{position:this.position,width:this.card.width,height:this.card.height})||
        this.type==2&&pointInsideBox({position:inputs.rel},{position:this.position,width:90,height:120})){
            this.upSize=true
        }else{
            this.upSize=false
        }
    }
    onClick(){
        if(this.type==1&&pointInsideBox({position:inputs.rel},{position:this.position,width:this.card.width,height:this.card.height})||
        this.type==2&&pointInsideBox({position:inputs.rel},{position:this.position,width:90,height:120})){
            this.buy()
        }
    }
    onKey(key,code){
        if(this.type==2&&code==BACKSPACE){
            this.buy()
        }
    }
}