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
            case 3:
                this.relic=new relic(this.layer,this.player,0,0,this.args[0],1.5)
                this.relic.fade=1
            break
        }
        if(this.player==-1){
            this.anim.afford=[]
            for(let a=0,la=this.battle.player.length;a<la;a++){
                this.anim.afford.push(0)
            }
        }
    }
    buy(){
        if((this.player==-1&&(this.battle.currency.money[0]>=this.cost[0]&&inputs.rel.x<this.position.x||this.battle.currency.money[1]>=this.cost[1]&&inputs.rel.x>this.position.x)||this.player!=-1&&this.battle.currency.money[this.player]>=this.cost[this.player])&&this.usable){
            let purchaser=0
            if(this.player==-1){
                purchaser=inputs.rel.x<this.position.x?0:1
            }else{
                purchaser=this.player
            }
            this.battle.currency.money[purchaser]-=this.cost[purchaser]
            this.usable=false
            this.deSize=true
            switch(this.type){
                case 1:
                    if(this.battle.relicManager.hasRelic(110,purchaser)){
                        this.battle.cardManagers[purchaser].deck.add(this.card.type,max(types.card[this.card.type].levels.length-1,this.card.level+this.battle.relicManager.active[110]),this.card.color)
                    }else{
                        this.battle.cardManagers[purchaser].deck.add(this.card.type,this.card.level,this.card.color)
                    }
                    if(this.battle.relicManager.hasRelic(118,purchaser)&&this.cost[purchaser]>0){
                        this.battle.purchaseManager.bogo(purchaser,1)
                    }
                break
                case 2:
                    this.battle.overlayManager.overlays[6][purchaser].active=true
                    this.battle.overlayManager.overlays[6][purchaser].activate()
                break
                case 3:
                    this.battle.relicManager.addRelic(this.relic.type,purchaser)
                    if(this.battle.relicManager.hasRelic(118,purchaser)&&this.cost[purchaser]>0){
                        this.battle.purchaseManager.bogo(purchaser,3)
                    }
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
                case 3:
                    this.relic.display(0)
                break
            }
            this.layer.scale(1/min(this.size,1))
        }
        if(this.player==-1){
            switch(this.type){
                case 1: case 2:
                    this.layer.textSize(16)
                    for(let a=0,la=this.battle.player.length;a<la;a++){
                        this.layer.fill(mergeColor([255,0,0],[230,230,210],this.anim.afford[a])[0],mergeColor([255,0,0],[230,230,210],this.anim.afford[a])[1],mergeColor([255,0,0],[230,230,210],this.anim.afford[a])[2],this.anim.usable)
                        this.layer.text(this.cost[a],20-la*20+a*40,72.5)
                    }
                    this.layer.fill(255,0,0,1-this.anim.usable)
                    this.layer.textSize(16)
                    this.layer.text('Sold Out',0,72.5)
                break
                case 3:
                    this.layer.textSize(16)
                    for(let a=0,la=this.battle.player.length;a<la;a++){
                        this.layer.fill(mergeColor([255,0,0],[230,230,210],this.anim.afford[a])[0],mergeColor([255,0,0],[230,230,210],this.anim.afford[a])[1],mergeColor([255,0,0],[230,230,210],this.anim.afford[a])[2],this.anim.usable)
                        this.layer.text(this.cost[a],20-la*20+a*40,40)
                    }
                    this.layer.fill(255,0,0,1-this.anim.usable)
                    this.layer.textSize(16)
                    this.layer.text('Sold Out',0,40)
                break
            }
        }else{
            switch(this.type){
                case 1: case 2:
                    this.layer.fill(mergeColor([255,0,0],[230,230,210],this.anim.afford)[0],mergeColor([255,0,0],[230,230,210],this.anim.afford)[1],mergeColor([255,0,0],[230,230,210],this.anim.afford)[2],this.anim.usable)
                    this.layer.textSize(16)
                    this.layer.text(this.cost[this.player],0,72.5)
                    this.layer.fill(255,0,0,1-this.anim.usable)
                    this.layer.textSize(16)
                    this.layer.text('Sold Out',0,72.5)
                break
                case 3:
                    this.layer.fill(mergeColor([255,0,0],[230,230,210],this.anim.afford)[0],mergeColor([255,0,0],[230,230,210],this.anim.afford)[1],mergeColor([255,0,0],[230,230,210],this.anim.afford)[2],this.anim.usable)
                    this.layer.textSize(16)
                    this.layer.text(this.cost[this.player],0,40)
                    this.layer.fill(255,0,0,1-this.anim.usable)
                    this.layer.textSize(16)
                    this.layer.text('Sold Out',0,40)
                break
            }
        }
        this.layer.pop()
        switch(this.type){
            case 3:
                this.relic.displayInfo()
            break
        }
    }
    update(){
        if(this.deSize&&this.size>0||!this.upSize&&this.size>1){
            this.size=round(this.size*5-1)/5
        }else if(!this.deSize&&(this.size<1||this.upSize&&this.size<1.5)){
            this.size=min(round(this.size*5+1)/5,1.5)
        }
        this.anim.usable=smoothAnim(this.anim.usable,this.usable,0,1,5)
        if(this.player==-1){
            for(let a=0,la=this.battle.player.length;a<la;a++){
                this.anim.afford[a]=smoothAnim(this.anim.afford[a],this.battle.currency.money[a]>=this.cost[a],0,1,5)
            }
        }else{
            this.anim.afford=smoothAnim(this.anim.afford,this.battle.currency.money[this.player]>=this.cost[this.player],0,1,5)
        }
        switch(this.type){
            case 1:
                this.card.anim.afford=1
            break
        }
        this.upSize=this.type==1&&pointInsideBox({position:inputs.rel},{position:this.position,width:this.card.width,height:this.card.height})||
        this.type==2&&pointInsideBox({position:inputs.rel},{position:this.position,width:90,height:120})||
        this.type==3&&dist(inputs.rel.x,inputs.rel.y,this.position.x,this.position.y)<20*this.relic.size?true:false
        switch(this.type){
            case 3:
                this.relic.update(true,0,{rel:{x:inputs.rel.x-this.position.x,y:inputs.rel.y-this.position.y}})
            break
        }
    }
    onClick(){
        if(this.type==1&&pointInsideBox({position:inputs.rel},{position:this.position,width:this.card.width,height:this.card.height})||
        this.type==2&&pointInsideBox({position:inputs.rel},{position:this.position,width:90,height:120})||
        this.type==3&&dist(inputs.rel.x,inputs.rel.y,this.position.x,this.position.y)<20*this.relic.size){
            this.buy()
        }
    }
    onKey(key,code){
        if(this.type==2&&code==BACKSPACE){
            this.buy()
        }
    }
}