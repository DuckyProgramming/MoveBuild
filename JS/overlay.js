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
                    case 0: case 6:
                        for(let a=0,la=this.battle.cardManager.reserve.cards.length;a<la;a++){
                            this.battle.cardManager.reserve.cards[a].size=0
                        }
                    break
                    case 1: case 5:
                        for(let a=0,la=this.battle.cardManager.discard.cards.length;a<la;a++){
                            this.battle.cardManager.discard.cards[a].size=0
                        }
                    break
                    case 2: case 3: case 4:
                        for(let a=0,la=this.battle.cardManager.deck.cards.length;a<la;a++){
                            this.battle.cardManager.deck.cards[a].size=0
                        }
                    break
                }
                switch(this.args[0]){
                    case 3: this.card=new card(this.layer,this.battle,-100,-100,0,0,0,0); break
                }
            break
            case 3:
                this.cards=[]
            break
        }
    }
    activate(args){
        switch(this.type){
            case 1:
                this.rewards=[]
                for(let a=0,la=args.length;a<la;a++){
                    this.rewards.push({type:args[a].type,value:args[a].value,fade:1,position:this.rewards.length*50,usable:true})
                }
            break
            case 2:
                switch(this.args[0]){
                    case 0: this.battle.cardManager.reserve.resetAnim(); break
                    case 1: case 7: this.battle.cardManager.discard.resetAnim(); break
                    case 2: case 3: case 4: this.battle.cardManager.deck.resetAnim(); break
                }
                switch(this.args[0]){
                    case 3: this.card=new card(this.layer,this.battle,-100,-100,0,0,0,0); break
                }
            break
            case 3:
                this.cards=[]
                let list=copyArrayStack(this.battle.cardManager.listing.card[this.battle.player])
                for(let a=0,la=3;a<la;a++){
                    let index=floor(random(0,list[args[1]].length))
                    this.cards.push(new card(this.layer,this.battle,this.layer.width/2-120+240*a/(la-1),this.layer.height/2+20,list[args[1]][index],args[0],1,-1))
                    this.cards[a].upSize=true
                    list[args[1]].splice(index,1)
                }
            break
        }
    }
    execute(args){
        switch(this.type){
            case 1:
                switch(args.type){
                    case 0:
                        this.battle.currency.money+=args.value[0]
                    break
                    case 1:
                        this.battle.overlayManager.overlays[3].active=true
                        this.battle.overlayManager.overlays[3].activate(args.value)
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
                if(this.rewards.length==0){
                    this.layer.rect(this.layer.width/2,this.layer.height/2,240,360,10)
                }else{
                    this.layer.rect(this.layer.width/2,this.layer.height/2+max(0,this.rewards[this.rewards.length-1].position-250)/2,240,360+max(0,this.rewards[this.rewards.length-1].position-250),10)
                }
                this.layer.rect(this.layer.width/2,this.layer.height/2-205,120,40,10)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                this.layer.text('Rewards',this.layer.width/2,this.layer.height/2-150)
                this.layer.textSize(20)
                this.layer.text('Close',this.layer.width/2,this.layer.height/2-205)
                for(let a=0,la=this.rewards.length;a<la;a++){
                    this.layer.noStroke()
                    this.layer.fill(120,this.fade*this.rewards[a].fade)
                    switch(this.rewards[a].type){
                        case 0:
                            this.layer.rect(this.layer.width/2,this.layer.height/2-105+this.rewards[a].position,60,40,10)
                            this.layer.fill(240,240,220,this.fade*this.rewards[a].fade)
                            this.layer.ellipse(this.layer.width/2-10,this.layer.height/2-105+this.rewards[a].position,16,16)
                            this.layer.fill(220,220,200,this.fade*this.rewards[a].fade)
                            this.layer.ellipse(this.layer.width/2-10,this.layer.height/2-105+this.rewards[a].position,10,10)
                            this.layer.fill(0,this.fade*this.rewards[a].fade)
                            this.layer.textSize(16)
                            this.layer.textAlign(LEFT,CENTER)
                            this.layer.text(this.rewards[a].value[0],this.layer.width/2,this.layer.height/2-103+this.rewards[a].position)
                            this.layer.textAlign(CENTER,CENTER)
                        break
                        case 1:
                            this.layer.rect(this.layer.width/2,this.layer.height/2-105+this.rewards[a].position,120,40,10)
                            this.layer.fill(this.battle.colorDetail.fill)
                            this.layer.stroke(this.battle.colorDetail.stroke)
                            this.layer.strokeWeight(3)
                            this.layer.rect(this.layer.width/2-40,this.layer.height/2-105+this.rewards[a].position,24,32,5)
                            this.layer.fill(0,this.fade*this.rewards[a].fade)
                            this.layer.noStroke()
                            this.layer.textSize(16)
                            this.layer.text('New Card',this.layer.width/2+15,this.layer.height/2-103+this.rewards[a].position)
                        break
                    }
                }
            break
            case 2:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2,this.layer.height/2,510,400,10)
                this.layer.rect(this.layer.width/2-285,this.layer.height/2,40,40,10)
                this.layer.rect(this.layer.width/2+285,this.layer.height/2,40,40,10)
                this.layer.rect(this.layer.width/2,this.layer.height/2+225,120,40,10)
                this.layer.fill(0,this.fade*0.8)
                regTriangle(this.layer,this.layer.width/2-282.5,this.layer.height/2,15,15,30)
                regTriangle(this.layer,this.layer.width/2+282.5,this.layer.height/2,15,15,-30)
                this.layer.textSize(8)
                switch(this.args[0]){
                    case 0: case 6: this.layer.text('Not in Actual Order',this.layer.width/2,this.layer.height/2+197.5); break
                }
                this.layer.textSize(20)
                switch(this.args[0]){
                    case 0: case 1: case 2: this.layer.text('Close',this.layer.width/2,this.layer.height/2+225); break
                    case 3: case 4: case 5: case 6: this.layer.text('Skip',this.layer.width/2,this.layer.height/2+225); break
                }
                switch(this.args[0]){
                    case 0: case 6: this.battle.cardManager.reserve.display('overlay',[0,this.page]); break
                    case 1: case 5: this.battle.cardManager.discard.display('overlay',[1,this.page]); break
                    case 2: case 3: case 4: this.battle.cardManager.deck.display('overlay',[1,this.page]); break
                }
                switch(this.args[0]){
                    case 3: this.card.fade=1; this.card.anim.afford=1; this.card.display(); break
                }
            break
            case 3:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2,this.layer.height/2,400,200,10)
                this.layer.rect(this.layer.width/2,this.layer.height/2+125,120,40,10)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                switch(this.args[0]){
                    case 0: this.layer.text('Add a Card',this.layer.width/2,this.layer.height/2-70); break
                }
                this.layer.textSize(20)
                switch(this.args[0]){
                    case 0: this.layer.text('Skip',this.layer.width/2,this.layer.height/2+125); break
                }
                for(let a=0,la=this.cards.length;a<la;a++){
                    this.cards[a].fade=1
                    this.cards[a].anim={select:0,afford:1}
                    this.cards[a].display()
                }
            break
        }
    }
    update(primary){
        this.fade=smoothAnim(this.fade,this.active&&primary,0,1,5)
        if(this.fade>0){
            switch(this.type){
                case 1:
                    for(let a=0,la=this.rewards.length;a<la;a++){
                        if(!this.rewards[a].usable){
                            this.rewards[a].fade-=0.2
                            if(this.rewards[a].fade<=0){
                                this.rewards.splice(a,1)
                                a--
                                la--
                            }
                        }else if(this.rewards[a].position>a*50){
                            this.rewards[a].position-=10
                        }
                    }
                    if(this.rewards.length<=0&&this.active&&!this.battle.overlayManager.overlays[3].active&&this.active){
                        this.active=false
                        transition.trigger=true
                        transition.scene='map'
                    }
                break
                case 2:
                    switch(this.args[0]){
                        case 0: case 6: this.battle.cardManager.reserve.update('overlay',[this.page]); break
                        case 1: case 5: this.battle.cardManager.discard.update('overlay',[this.page]); break
                        case 2: case 3: case 4: this.battle.cardManager.deck.update('overlay',[this.page]); break
                    }
                    switch(this.args[0]){
                        case 0: case 6:
                            for(let a=0,la=this.battle.cardManager.reserve.cards.length;a<la;a++){
                                this.battle.cardManager.reserve.cards[a].size=constrain(this.battle.cardManager.reserve.cards[a].size,0,this.fade)
                            }
                        break
                        case 1: case 5:
                            for(let a=0,la=this.battle.cardManager.discard.cards.length;a<la;a++){
                                this.battle.cardManager.discard.cards[a].size=constrain(this.battle.cardManager.discard.cards[a].size,0,this.fade)
                            }
                        break
                        case 2: case 3: case 4:
                            for(let a=0,la=this.battle.cardManager.deck.cards.length;a<la;a++){
                                this.battle.cardManager.deck.cards[a].size=constrain(this.battle.cardManager.deck.cards[a].size,0,this.fade)
                            }
                        break
                    }
                    switch(this.args[0]){
                        case 3: this.card.size=smoothAnim(this.card.size,this.card.page==this.page,0,this.fade,5); break
                    }
                break
                case 3:
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if(this.cards[a].upSize&&this.cards[a].size<1){
                            this.cards[a].size=round(this.cards[a].size*5+1)/5
                        }else if(this.cards[a].deSize&&this.cards[a].size>0){
                            this.cards[a].size=round(this.cards[a].size*5-1)/5
                        }
                    }
                break
            }
        }
    }
    onClick(){
        if(this.active){
            switch(this.type){
                case 1:
                    for(let a=0,la=this.rewards.length;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2-105+this.rewards[a].position},width:200,height:40})&&this.rewards[a].usable){
                            this.rewards[a].usable=false
                            this.execute(this.rewards[a])
                        }
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2-205},width:120,height:40})){
                        this.active=false
                        transition.trigger=true
                        transition.scene='map'
                    }
                break
                case 2:
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-285,y:this.layer.height/2},width:40,height:40})&&this.page>0){
                        this.page--
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+285,y:this.layer.height/2},width:40,height:40})&&(
                    this.page<ceil((this.battle.cardManager.reserve.cards.length-1)/15)-1&&this.args[0]==0||
                    this.page<ceil((this.battle.cardManager.discard.cards.length-1)/15)-1&&this.args[0]==1||
                    this.page<ceil((this.battle.cardManager.deck.cards.length-1)/15)-1&&(this.args[0]==2||this.args[0]==3))){
                        this.page++
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2+225},width:120,height:40})){
                        this.active=false
                    }
                    switch(this.args[0]){
                        case 3: case 4:
                            for(let a=0,la=this.battle.cardManager.deck.cards.length;a<la;a++){
                                if(pointInsideBox({position:inputs.rel},this.battle.cardManager.deck.cards[a])&&this.battle.cardManager.deck.cards[a].size>0.5&&this.battle.cardManager.deck.cards[a].select&&
                                !(this.args[0]==3&&this.battle.cardManager.deck.cards[a].level>=types.card[this.battle.cardManager.deck.cards[a].type].levels.length-1)){
                                    this.battle.cardManager.deck.cards[a].select=false
                                    switch(this.args[0]){
                                        case 3:
                                            let size=this.battle.cardManager.deck.cards[a].size
                                            this.battle.cardManager.deck.cards[a]=upgradeCard(this.battle.cardManager.deck.cards[a])
                                            this.battle.cardManager.deck.cards[a].size=size
                                        break
                                        case 4:
                                            if(this.battle.cardManager.deck.remove(a)){
                                                a--
                                                la--
                                            }
                                        break
                                    }
                                    this.active=false
                                }
                                this.battle.cardManager.deck.cards[a].select=false
                                if(pointInsideBox({position:inputs.rel},this.battle.cardManager.deck.cards[a])&&this.battle.cardManager.deck.cards[a].size>0.5){
                                    this.battle.cardManager.deck.cards[a].select=true
                                    switch(this.args[0]){
                                        case 3:
                                            this.card=upgradeCard(this.battle.cardManager.deck.cards[a])
                                            this.card.page=this.page
                                            this.card.size=1
                                        break
                                    }
                                }
                            }
                        break
                        case 5:
                            for(let a=0,la=this.battle.cardManager.discard.cards.length;a<la;a++){
                                if(pointInsideBox({position:inputs.rel},this.battle.cardManager.discard.cards[a])&&this.battle.cardManager.discard.cards[a].size>0.5&&this.battle.cardManager.discard.cards[a].select){
                                    this.battle.cardManager.discard.cards[a].select=false
                                    switch(this.args[0]){
                                        case 5:
                                            this.battle.cardManager.discard.send(this.battle.cardManager.hand.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                    }
                                    this.active=false
                                }
                                if(a>=0){
                                    this.battle.cardManager.discard.cards[a].select=false
                                    if(pointInsideBox({position:inputs.rel},this.battle.cardManager.discard.cards[a])&&this.battle.cardManager.discard.cards[a].size>0.5){
                                        this.battle.cardManager.discard.cards[a].select=true
                                    }
                                }
                            }
                        break
                        case 6:
                            for(let a=0,la=this.battle.cardManager.reserve.cards.length;a<la;a++){
                                if(pointInsideBox({position:inputs.rel},this.battle.cardManager.reserve.cards[a])&&this.battle.cardManager.reserve.cards[a].size>0.5&&this.battle.cardManager.reserve.cards[a].select){
                                    this.battle.cardManager.reserve.cards[a].select=false
                                    switch(this.args[0]){
                                        case 6:
                                            this.battle.cardManager.reserve.send(this.battle.cardManager.hand.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                    }
                                    this.active=false
                                }
                                if(a>=0){
                                    this.battle.cardManager.reserve.cards[a].select=false
                                    if(pointInsideBox({position:inputs.rel},this.battle.cardManager.reserve.cards[a])&&this.battle.cardManager.reserve.cards[a].size>0.5){
                                        this.battle.cardManager.reserve.cards[a].select=true
                                    }
                                }
                            }
                        break
                    }
                break
                case 3:
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},this.cards[a])&&!this.cards[a].deSize){
                            this.battle.cardManager.deck.add(this.cards[a].type,this.cards[a].level,this.cards[a].color)
                            for(let b=0,lb=this.cards.length;b<lb;b++){
                                this.cards[b].deSize=true
                                this.cards[b].upSize=false
                            }
                            this.active=false
                        }
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2+125},width:120,height:40})){
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
                    for(let a=0,la=this.rewards.length;a<la;a++){
                        if((int(key)+9)%10==a&&this.rewards[a].usable){
                            this.rewards[a].usable=false
                            this.execute(this.rewards[a])
                        }
                    }
                    if(code==ENTER){
                        this.active=false
                        transition.trigger=true
                        transition.scene='map'
                    }
                break
                case 2:
                    if(code==LEFT_ARROW&&this.page>0){
                        this.page--
                    }else if(code==RIGHT_ARROW&&(
                    this.page<ceil((this.battle.cardManager.reserve.cards.length-1)/15)-1&&this.args[0]==0||
                    this.page<ceil((this.battle.cardManager.discard.cards.length-1)/15)-1&&this.args[0]==1||
                    this.page<ceil((this.battle.cardManager.deck.cards.length-1)/15)-1&&(this.args[0]==2||this.args[0]==3))){
                        this.page++
                    }else if(code==ENTER){
                        this.active=false
                    }
                    switch(this.args[0]){
                        case 3: case 4:
                            for(let a=0,la=this.battle.cardManager.deck.cards.length;a<la;a++){
                                if(key==inputs.hexadec[a]&&this.battle.cardManager.deck.cards[a].size>0.5&&this.battle.cardManager.deck.cards[a].select){
                                    this.battle.cardManager.deck.cards[a].select=false
                                    let size=this.battle.cardManager.deck.cards[a].size
                                    switch(this.args[0]){
                                        case 3:
                                            this.battle.cardManager.deck.cards[a]=upgradeCard(this.battle.cardManager.deck.cards[a])
                                        break
                                        case 4:
                                            if(this.battle.cardManager.deck.remove(a)){
                                                a--
                                                la--
                                            }
                                        break
                                    }
                                    this.battle.cardManager.deck.cards[a].size=size
                                    this.active=false
                                }
                                this.battle.cardManager.deck.cards[a].select=false
                                if(key==inputs.hexadec[a]&&this.battle.cardManager.deck.cards[a].size>0.5){
                                    this.battle.cardManager.deck.cards[a].select=true
                                    switch(this.args[0]){
                                        case 3:
                                            this.card=upgradeCard(this.battle.cardManager.deck.cards[a])
                                            this.card.page=this.page
                                            this.card.size=1
                                        break
                                    }
                                }
                            }
                        break
                        case 5:
                            for(let a=0,la=this.battle.cardManager.discard.cards.length;a<la;a++){
                                if(key==inputs.hexadec[a]&&this.battle.cardManager.discard.cards[a].size>0.5&&this.battle.cardManager.discard.cards[a].select){
                                    this.battle.cardManager.discard.cards[a].select=false
                                    switch(this.args[0]){
                                        case 5:
                                            this.battle.cardManager.discard.send(this.battle.cardManager.hand.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                    }
                                    this.active=false
                                }
                                if(a>=0){
                                    this.battle.cardManager.discard.cards[a].select=false
                                    if(key==inputs.hexadec[a]&&this.battle.cardManager.discard.cards[a].size>0.5){
                                        this.battle.cardManager.discard.cards[a].select=true
                                    }
                                }
                            }
                        break
                        case 6:
                            for(let a=0,la=this.battle.cardManager.reserve.cards.length;a<la;a++){
                                if(key==inputs.hexadec[a]&&this.battle.cardManager.reserve.cards[a].size>0.5&&this.battle.cardManager.reserve.cards[a].select){
                                    this.battle.cardManager.reserve.cards[a].select=false
                                    switch(this.args[0]){
                                        case 6:
                                            this.battle.cardManager.reserve.send(this.battle.cardManager.hand.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                    }
                                    this.active=false
                                }
                                if(a>=0){
                                    this.battle.cardManager.reserve.cards[a].select=false
                                    if(key==inputs.hexadec[a]&&this.battle.cardManager.reserve.cards[a].size>0.5){
                                        this.battle.cardManager.reserve.cards[a].select=true
                                    }
                                }
                            }
                        break
                    }
                break
                case 3:
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if((int(key)+9)%10==a&&!this.cards[a].deSize){
                            this.battle.cardManager.deck.add(this.cards[a].type,this.cards[a].level,this.cards[a].color)
                            for(let b=0,lb=this.cards.length;b<lb;b++){
                                this.cards[b].deSize=true
                                this.cards[b].upSize=false
                            }
                            this.active=false
                        }
                    }
                    if(code==ENTER){
                        this.active=false
                    }
                break
            }
        }
    }
}