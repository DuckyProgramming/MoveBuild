class overlay{
    constructor(layer,battle,type,args){
        this.layer=layer
        this.battle=battle
        this.type=type
        this.args=args
        this.fade=0
        this.active=false
        switch(this.type){
            case 1:
                this.rewards=[]
            break
            case 2:
                this.scroll=0
                this.page=0
                switch(this.args[0]){
                    case 0:
                        for(let a=0,la=this.battle.cardManager.reserve.cards.length;a<la;a++){
                            this.battle.cardManager.reserve.cards[a].size=0
                        }
                    break
                    case 1:
                        for(let a=0,la=this.battle.cardManager.discard.cards.length;a<la;a++){
                            this.battle.cardManager.discard.cards[a].size=0
                        }
                    break
                }
            break
        }
    }
    display(){
        this.layer.noStroke()
        switch(this.type){
            case 1:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2,this.layer.height/2,240,360,10)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                this.layer.text('Rewards',this.layer.width/2,this.layer.height/2-150)
            break
            case 2:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2-285,this.layer.height/2,40,40,10)
                this.layer.rect(this.layer.width/2+285,this.layer.height/2,40,40,10)
                this.layer.rect(this.layer.width/2,this.layer.height/2+225,120,40,10)
                this.layer.rect(this.layer.width/2,this.layer.height/2,510,400,10)
                this.layer.fill(0,this.fade*0.8)
                regTriangle(this.layer,this.layer.width/2-282.5,this.layer.height/2,15,15,30)
                regTriangle(this.layer,this.layer.width/2+282.5,this.layer.height/2,15,15,-30)
                this.layer.textSize(8)
                switch(this.args[0]){
                    case 0: this.layer.text('Not in Actual Order',this.layer.width/2,this.layer.height/2+197.5); break
                }
                this.layer.textSize(20)
                switch(this.args[0]){
                    case 0: case 1: this.layer.text('Close',this.layer.width/2,this.layer.height/2+225); break
                }
                switch(this.args[0]){
                    case 0: this.battle.cardManager.reserve.display('overlay',[0,this.page]); break
                    case 1: this.battle.cardManager.discard.display('overlay',[1,this.page]); break
                }
            break
        }
    }
    update(primary){
        this.fade=smoothAnim(this.fade,this.active&&primary,0,1,5)
        switch(this.type){
            case 1:
            break
            case 2:
                switch(this.args[0]){
                    case 0:
                        for(let a=0,la=this.battle.cardManager.reserve.cards.length;a<la;a++){
                            this.battle.cardManager.reserve.cards[a].size=constrain(this.battle.cardManager.reserve.cards[a].size,0,this.fade)
                        }
                    break
                    case 1:
                        for(let a=0,la=this.battle.cardManager.discard.cards.length;a<la;a++){
                            this.battle.cardManager.discard.cards[a].size=constrain(this.battle.cardManager.discard.cards[a].size,0,this.fade)
                        }
                    break
                }
            break
        }
    }
    onClick(){
        if(this.active){
            switch(this.type){
                case 1:
                break
                case 2:
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-285,y:this.layer.height/2},width:40,height:40})&&this.page>0){
                        this.page--
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+285,y:this.layer.height/2},width:40,height:40})&&(
                    this.page<ceil((this.battle.cardManager.reserve.cards.length-1)/15)-1&&this.args[0]==0||
                    this.page<ceil((this.battle.cardManager.discard.cards.length-1)/15)-1&&this.args[0]==1)){
                        this.page++
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2+225},width:120,height:40})){
                        this.active=false
                    }
                break
            }
        }
    }
    onKey(key,code){
        if(this.active){
            switch(this.type){
                case 1:
                break
                case 2:
                    if(code==LEFT_ARROW&&this.page>0){
                        this.page--
                    }else if(code==RIGHT_ARROW&&(
                    this.page<ceil((this.battle.cardManager.reserve.cards.length-1)/15)-1&&this.args[0]==0||
                    this.page<ceil((this.battle.cardManager.discard.cards.length-1)/15)-1&&this.args[0]==1)){
                        this.page++
                    }else if(code==ENTER){
                        this.active=false
                    }
                break
            }
        }
    }
}