class purchase{
    constructor(layer,battle,player,x,y,type,cost,args,tag){
        this.layer=layer
        this.battle=battle
        this.player=player
        this.position={x:x,y:y}
        this.type=type
        this.cost=cost
        this.args=args
        this.tag=tag
        this.size=0
        this.midSize=1
        this.usable=true
        this.deSize=false
        this.upSize=false
        this.anim={usable:1,afford:0}
        let roll=0
        this.formerCost=copyArray(this.cost)
        switch(this.type){
            case 1:
                if(variants.cursed){
                    args[1]++
                }
                this.card=new card(this.layer,this.battle,this.player,0,0,this.args[0],this.args[1],this.args[2],0)
                roll=floor(random(0,360*(this.battle.relicManager.hasRelic(180,this.player)?0.25:1)*(this.battle.relicManager.hasRelic(427,this.player)?0.5:1)))
                this.card.edition=this.battle.relicManager.hasRelic(213,player)?0:roll==0?6:roll==1?5:roll==2?4:roll>=3&&roll<=5?3:roll>=6&&roll<=8?2:roll>=9&&roll<=11?1:this.battle.relicManager.hasRelic(322,this.player)&&roll>=12&&roll<=11+this.battle.relicManager.active[322][this.player+1]*12?8:0
                if(this.player>=0&&this.battle.relicManager.active[110][this.player+1]){
                    for(let a=0,la=this.battle.relicManager.active[110][this.player+1];a<la;a++){
                        this.card=upgradeCard(this.card)
                    }
                }
            break
            case 3:
                this.relic=new relic(this.layer,this.battle,this.player,0,0,this.args[0],1.5)
                this.relic.fade=1
            break
            case 4:
                this.baseID=this.args[3]
                this.base=copyCard(this.battle.cardManagers[this.player].deck.cards[this.baseID])
                this.base.position={x:-80,y:0}
                this.card=this.battle.cardManagers[this.player].transformCard(this.base)
                if(this.card.name=='Garbled'){
                    this.card=new card(this.layer,this.battle,this.player,0,0,this.args[0],this.args[1],this.args[2],0)
                }
                roll=floor(random(0,360*(this.battle.relicManager.hasRelic(180,this.player)?0.25:1)*(this.battle.relicManager.hasRelic(427,this.player)?0.5:1)))
                this.card.edition=this.battle.relicManager.hasRelic(213,player)?0:roll==0?6:roll==1?5:roll==2?4:roll>=3&&roll<=5?3:roll>=6&&roll<=8?2:roll>=9&&roll<=11?1:0
                this.card.position={x:80,y:0}
            break
            case 6:
                this.item=new item(this.layer,this.battle,this.player,0,0,0,0,this.args[0],1.5)
                this.item.fade=1
            break
        }
        if(this.player==-1){
            this.anim.afford=[]
            for(let a=0,la=this.battle.players;a<la;a++){
                this.anim.afford.push(0)
            }
        }
        if(game.ascend>=16){
            for(let a=0,la=this.cost.length;a<la;a++){
                this.cost[a]=this.cost[a]*1.1
            }
        }
        if(this.battle.modded(130)){
            for(let a=0,la=this.cost.length;a<la;a++){
                this.cost[a]=this.cost[a]*2
            }
        }
    }
    costChange(player,value){
        for(let a=0,la=this.cost.length;a<la;a++){
            if(this.player>=0||this.player==-1&&a==player){
                this.cost[a]=value==-1?this.formerCost[a]:this.cost[a]*value
            }
        }
    }
    editSelf(type){
        switch(type){
            case 0:
                this.card=upgradeCard(this.card)
            break
            case 1:
                this.card=unupgradeCard(this.card)
            break
        }
    }
    buy(){
        if((this.player==-1&&(this.battle.currency.money[0]>=round(this.cost[0])-(this.battle.relicManager.hasRelic(187,0)?200:0)&&inputs.rel.x<this.position.x||this.battle.currency.money[1]>=round(this.cost[1])-(this.battle.relicManager.hasRelic(187,1)?200:0)&&inputs.rel.x>this.position.x)||this.player!=-1&&this.battle.currency.money[this.player]>=round(this.cost[this.player])-(this.battle.relicManager.hasRelic(187,this.player)?200:0))&&this.usable){
            let purchaser=0
            if(this.player==-1){
                purchaser=inputs.rel.x<this.position.x?0:1
            }else{
                purchaser=this.player
            }
            let cancel=false
            if(this.type==6&&!this.battle.itemManager.hasEmpty(purchaser)){
                cancel=true
            }
            if(!cancel){
                this.battle.loseCurrency(round(this.cost[purchaser]),purchaser)
                this.usable=false
                this.deSize=true
                this.battle.relicManager.activate(13,[purchaser])
                switch(this.type){
                    case 1:
                        this.battle.cardManagers[purchaser].deck.add(this.card.type,constrain(this.battle.relicManager.active[110][purchaser+1],0,types.card[this.card.type].levels.length-1),this.card.color,this.card.edition)
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
                        if(this.battle.relicManager.hasRelic(118,purchaser)&&this.cost[purchaser]>0&&this.battle.relicManager.detail[118][purchaser]==0){
                            this.battle.purchaseManager.bogo(purchaser,3)
                            this.battle.relicManager.detail[118][purchaser]=1
                        }
                    break
                    case 4:
                        this.battle.cardManagers[purchaser].deck.add(this.card.type,constrain(this.battle.relicManager.active[110][purchaser+1],0,types.card[this.card.type].levels.length-1),this.card.color,this.card.edition)
                    break
                    case 5:
                        this.battle.overlayManager.overlays[3][purchaser].active=true
                        this.battle.overlayManager.overlays[3][purchaser].activate([0,3,[14,15,16,25][this.args[0]]])
                    break
                    case 6:
                        this.battle.itemManager.addItem(this.item.type,purchaser)
                        if(this.battle.relicManager.hasRelic(118,purchaser)&&this.cost[purchaser]>0&&this.battle.relicManager.detail[118][purchaser]==0){
                            this.battle.purchaseManager.bogo(purchaser,6)
                            this.battle.relicManager.detail[118][purchaser]=1
                        }
                    break
                }
            }
        }
    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        this.layer.scale(this.midSize)
        if(this.size>0&&this.position.x>-150&&this.position.x<this.layer.width+150){
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
                    this.layer.noStroke()
                    if(this.player==-1){
                        this.layer.fill(200,100,100)
                        this.layer.rect(0,0,3,125)
                    }
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('Remove Card',0,0)
                break
                case 3:
                    this.relic.display(0)
                break
                case 4:
                    this.layer.fill(160)
                    this.layer.noStroke()
                    this.layer.rect(0,-25,300,200,10)
                    this.layer.fill(0)
                    this.layer.textSize(30)
                    this.layer.text('Trade Offer',0,-95)
                    this.card.size=1
                    this.card.display()
                    this.base.size=1
                    this.base.display()
                    this.layer.fill(120)
                    this.layer.noStroke()
                    regPoly(this.layer,-5,0,3,20,20,-30)
                break
                case 5:
                    if(this.args[0]==3){
                        this.layer.strokeWeight(4)
                        this.layer.fill(types.color.card[12].fill)
                        this.layer.stroke(types.color.card[12].stroke)
                        this.layer.rect(-16,0,40,96,4)
                        this.layer.fill(types.color.card[14].fill)
                        this.layer.stroke(types.color.card[14].stroke)
                        this.layer.rect(16,0,40,96,4)

                        this.layer.noStroke()
                        this.layer.fill(types.color.card[12].stroke)
                        this.layer.rect(-8,0,16,100)
                        this.layer.fill(types.color.card[14].stroke)
                        this.layer.rect(8,0,16,100)
                        this.layer.fill(types.color.card[12].fill)
                        this.layer.rect(-8,0,16,92)
                        this.layer.fill(types.color.card[14].fill)
                        this.layer.rect(8,0,16,92)

                        this.layer.translate(-50,0)
                        this.layer.noStroke()
                        this.gradient=[new p5.LinearGradient(15,90),new p5.LinearGradient(15,90),new p5.LinearGradient(15,90)]
                        this.gradient[0].colors(
                            0.0,color(types.color.card[12].stroke[0],types.color.card[12].stroke[1],types.color.card[12].stroke[2]),
                            0.2,color(types.color.card[9].stroke[0],types.color.card[9].stroke[1],types.color.card[9].stroke[2]),
                            0.4,color(types.color.card[13].stroke[0],types.color.card[13].stroke[1],types.color.card[13].stroke[2]),
                            0.6,color(types.color.card[15].stroke[0],types.color.card[15].stroke[1],types.color.card[15].stroke[2]),
                            0.8,color(types.color.card[game.playerNumber+5].stroke[0],types.color.card[game.playerNumber+5].stroke[1],types.color.card[16].stroke[2]),
                            1.0,color(types.color.card[14].stroke[0],types.color.card[14].stroke[1],types.color.card[14].stroke[2])
                        )
                        this.gradient[1].colors(
                            0.0,color(types.color.card[12].fill[0],types.color.card[12].fill[1],types.color.card[12].fill[2]),
                            0.2,color(types.color.card[9].fill[0],types.color.card[9].fill[1],types.color.card[9].fill[2]),
                            0.4,color(types.color.card[13].fill[0],types.color.card[13].fill[1],types.color.card[13].fill[2]),
                            0.6,color(types.color.card[15].fill[0],types.color.card[15].fill[1],types.color.card[15].fill[2]),
                            0.8,color(types.color.card[game.playerNumber+5].fill[0],types.color.card[game.playerNumber+5].fill[1],types.color.card[game.playerNumber+5].fill[2]),
                            1.0,color(types.color.card[14].fill[0],types.color.card[14].fill[1],types.color.card[14].fill[2])
                        )
                        this.gradient[2].colors(
                            0.0,color(types.color.card[12].active[0],types.color.card[12].active[1],types.color.card[12].active[2]),
                            0.2,color(types.color.card[9].active[0],types.color.card[9].active[1],types.color.card[9].active[2]),
                            0.4,color(types.color.card[13].active[0],types.color.card[13].active[1],types.color.card[13].active[2]),
                            0.6,color(types.color.card[15].active[0],types.color.card[15].active[1],types.color.card[15].active[2]),
                            0.8,color(types.color.card[game.playerNumber+5].active[0],types.color.card[game.playerNumber+5].active[1],types.color.card[game.playerNumber+5].active[2]),
                            1.0,color(types.color.card[14].active[0],types.color.card[14].active[1],types.color.card[14].active[2])
                        )

                        this.layer.fillGradient(this.gradient[0])
                        this.layer.rect(50,0,76,100,6)
                        this.layer.fillGradient(this.gradient[1])
                        this.layer.rect(50,0,68,92,2)
                        this.layer.fillGradient(this.gradient[2])
                        regStar(this.layer,50,0,12,12,12,30,30,0)
                        this.layer.translate(50,0)
                        if(this.player==-1){
                            this.layer.fill(180)
                            this.layer.rect(0,0,2.4,100)
                        }
                    }else if(this.args[0]==0&&this.player==-1){
                        this.layer.strokeWeight(4)
                        this.layer.fill(types.color.card[this.battle.player[0]].fill)
                        this.layer.stroke(types.color.card[this.battle.player[0]].stroke)
                        this.layer.rect(-16,0,40,96,4)
                        this.layer.fill(types.color.card[this.battle.player[1]].fill)
                        this.layer.stroke(types.color.card[this.battle.player[1]].stroke)
                        this.layer.rect(16,0,40,96,4)

                        this.layer.noStroke()
                        this.layer.fill(types.color.card[this.battle.player[0]].stroke)
                        this.layer.rect(-8,0,16,100)
                        this.layer.fill(types.color.card[this.battle.player[1]].stroke)
                        this.layer.rect(8,0,16,100)
                        this.layer.fill(types.color.card[this.battle.player[0]].fill)
                        this.layer.rect(-8,0,16,92)
                        this.layer.fill(types.color.card[this.battle.player[1]].fill)
                        this.layer.rect(8,0,16,92)

                        this.layer.translate(-10,0)
                        this.layer.noStroke()
                        this.gradient=[new p5.LinearGradient(15,20),new p5.LinearGradient(15,20),new p5.LinearGradient(15,20)]
                        this.gradient[0].colors(0.0,
                            color(...types.color.card[this.battle.player[0]].stroke),1.0,
                            color(...types.color.card[this.battle.player[1]].stroke))
                        this.gradient[1].colors(0.0,
                            color(...types.color.card[this.battle.player[0]].fill),1.0,
                            color(...types.color.card[this.battle.player[1]].fill))
                        this.gradient[2].colors(0.0,
                            color(...types.color.card[this.battle.player[0]].active),1.0,
                            color(...types.color.card[this.battle.player[1]].active))

                        this.layer.fillGradient(this.gradient[0])
                        this.layer.rect(10,0,60,100)
                        this.layer.fillGradient(this.gradient[1])
                        this.layer.rect(10,0,60,92)
                        this.layer.fillGradient(this.gradient[2])
                        regStar(this.layer,10,0,12,12,12,30,30,0)
                        this.layer.translate(10,0)

                        this.layer.fill(180)
                        this.layer.rect(0,0,2.4,100)
                    }else{
                        switch(this.args[0]){
                            case 0:
                                this.layer.fill(types.color.card[this.battle.player[this.player]].fill)
                                this.layer.stroke(types.color.card[this.battle.player[this.player]].stroke)
                            break
                            case 1: case 4:
                                this.layer.fill(types.color.card[0].fill)
                                this.layer.stroke(types.color.card[0].stroke)
                            break
                            case 2:
                                this.layer.fill(types.color.card[game.playerNumber+5].fill)
                                this.layer.stroke(types.color.card[game.playerNumber+5].stroke)
                            break
                        }
                        this.layer.strokeWeight(4)
                        this.layer.rect(0,0,72,96,3)
                        this.layer.noStroke()
                        switch(this.args[0]){
                            case 0:
                                this.layer.fill(types.color.card[this.battle.player[this.player]].active)
                            break
                            case 1: case 4:
                                this.layer.fill(types.color.card[0].active)
                            break
                            case 2:
                                this.layer.fill(types.color.card[game.playerNumber+5].active)
                            break
                        }
                        regStar(this.layer,0,0,12,12,12,30,30,0)
                        if(this.player==-1){
                            switch(this.args[0]){
                                case 0:
                                    this.layer.fill(upColor(types.color.card[this.battle.player[this.player]].stroke,-20,[1,1,1]))
                                break
                                case 1: case 4:
                                    this.layer.fill(upColor(types.color.card[0].stroke,-20,[1,1,1]))
                                break
                                case 2:
                                    this.layer.fill(upColor(types.color.card[game.playerNumber+5].stroke,-20,[1,1,1]))
                                break
                            }
                            this.layer.rect(0,0,2.4,100)
                        }
                    }
                    this.layer.fill(0)
                    this.layer.textSize(8)
                    switch(this.args[0]){
                        case 0:
                            this.layer.text('Standard\nPack',0,0)
                        break
                        case 1:
                            this.layer.text('Colorless\nPack',0,0)
                        break
                        case 2:
                            this.layer.text('Spectral\nPack',0,0)
                        break
                        case 3:
                            this.layer.text('Prism\nPack',0,0)
                        break
                        case 4:
                            this.layer.text('Placeholder\nBooster Pack',0,0)
                        break
                    }
                break
                case 6:
                    this.item.display(0)
                break
            }
            this.layer.scale(1/min(this.size,1))
        }
        this.layer.noStroke()
        if(this.player==-1){
            switch(this.type){
                case 1: case 2:
                    this.layer.textSize(16)
                    for(let a=0,la=this.battle.players;a<la;a++){
                        this.layer.fill(mergeColor([255,0,0],[230,230,210],this.anim.afford[a])[0],mergeColor([255,0,0],[230,230,210],this.anim.afford[a])[1],mergeColor([255,0,0],[230,230,210],this.anim.afford[a])[2],this.anim.usable)
                        this.layer.text(round(this.cost[a]),20-la*20+a*40,72.5)
                    }
                    if(this.args[3]){
                        this.layer.fill(255,255,50,this.anim.usable)
                        this.layer.text('Sale',0,-72.5)
                    }
                    this.layer.fill(255,0,0,1-this.anim.usable)
                    this.layer.text('Sold Out',0,72.5)
                break
                case 3: case 6:
                    this.layer.textSize(16)
                    for(let a=0,la=this.battle.players;a<la;a++){
                        this.layer.fill(mergeColor([255,0,0],[230,230,210],this.anim.afford[a])[0],mergeColor([255,0,0],[230,230,210],this.anim.afford[a])[1],mergeColor([255,0,0],[230,230,210],this.anim.afford[a])[2],this.anim.usable)
                        this.layer.text(round(this.cost[a]),20-la*20+a*40,40)
                    }
                    this.layer.fill(255,0,0,1-this.anim.usable)
                    this.layer.text('Sold Out',0,40)
                break
                case 5:
                    this.layer.textSize(12.8)
                    for(let a=0,la=this.battle.players;a<la;a++){
                        this.layer.fill(mergeColor([255,0,0],[230,230,210],this.anim.afford[a])[0],mergeColor([255,0,0],[230,230,210],this.anim.afford[a])[1],mergeColor([255,0,0],[230,230,210],this.anim.afford[a])[2],this.anim.usable)
                        this.layer.text(round(this.cost[a]),20-la*20+a*40,58)
                    }
                    this.layer.fill(255,0,0,1-this.anim.usable)
                    this.layer.textSize(9.6)
                    this.layer.text('Sold Out',0,58)
                break
            }
        }else{
            switch(this.type){
                case 1: case 2:
                    this.layer.fill(mergeColor([255,0,0],[230,230,210],this.anim.afford)[0],mergeColor([255,0,0],[230,230,210],this.anim.afford)[1],mergeColor([255,0,0],[230,230,210],this.anim.afford)[2],this.anim.usable)
                    this.layer.textSize(16)
                    this.layer.text(round(this.cost[this.player]),0,72.5)
                    if(this.args[3]){
                        this.layer.fill(255,255,50,this.anim.usable)
                        this.layer.text('Sale',0,-72.5)
                    }
                    this.layer.fill(255,0,0,1-this.anim.usable)
                    this.layer.text('Sold Out',0,72.5)
                break
                case 3: case 6:
                    this.layer.fill(mergeColor([255,0,0],[230,230,210],this.anim.afford)[0],mergeColor([255,0,0],[230,230,210],this.anim.afford)[1],mergeColor([255,0,0],[230,230,210],this.anim.afford)[2],this.anim.usable)
                    this.layer.textSize(16)
                    this.layer.text(round(this.cost[this.player]),0,40)
                    this.layer.fill(255,0,0,1-this.anim.usable)
                    this.layer.text('Sold Out',0,40)
                break
                case 5:
                    this.layer.fill(mergeColor([255,0,0],[230,230,210],this.anim.afford)[0],mergeColor([255,0,0],[230,230,210],this.anim.afford)[1],mergeColor([255,0,0],[230,230,210],this.anim.afford)[2],this.anim.usable)
                    this.layer.textSize(12.8)
                    this.layer.text(round(this.cost[this.player]),0,58)
                    this.layer.fill(255,0,0,1-this.anim.usable)
                    this.layer.text('Sold Out',0,58)
                break
            }
        }
        this.layer.pop()
    }
    displayInfo(){
        switch(this.type){
            case 3:
                this.relic.displayInfo()
            break
            case 6:
                this.item.displayInfo()
            break
        }
    }
    update(){
        if(this.deSize&&this.size>0||!this.upSize&&this.size>1){
            this.size=round(this.size*5-1)/5
        }else if(!this.deSize&&(this.size<1||this.upSize&&this.size<1.5)){
            this.size=min(round(this.size*5+1)/5,1.5)
        }
        this.midSize=1
        this.anim.usable=smoothAnim(this.anim.usable,this.usable,0,1,5)
        if(this.player==-1){
            for(let a=0,la=this.battle.players;a<la;a++){
                this.anim.afford[a]=smoothAnim(this.anim.afford[a],this.battle.currency.money[a]>=round(this.cost[a])-(this.battle.relicManager.hasRelic(187,a)?200:0),0,1,5)
            }
        }else{
            this.anim.afford=smoothAnim(this.anim.afford,this.battle.currency.money[this.player]>=round(this.cost[this.player])-(this.battle.relicManager.hasRelic(187,this.player)?200:0),0,1,5)
        }
        switch(this.type){
            case 1:
                this.card.anim.afford=1
            break
            case 4:
                this.base.anim.afford=1
                this.card.anim.afford=1
            break
        }
        this.upSize=!this.battle.overlayManager.anyActive&&this.position.x>0&&this.position.x<this.layer.width&&(
            this.type==1&&pointInsideBox({position:inputs.rel},{position:this.position,width:this.card.width*this.midSize,height:this.card.height*this.midSize})||
            this.type==2&&pointInsideBox({position:inputs.rel},{position:this.position,width:90*this.midSize,height:120*this.midSize})||
            this.type==3&&dist(inputs.rel.x,inputs.rel.y,this.position.x,this.position.y)<20*this.relic.size||
            this.type==5&&pointInsideBox({position:inputs.rel},{position:this.position,width:72*this.midSize,height:96*this.midSize})||
            this.type==6&&dist(inputs.rel.x,inputs.rel.y,this.position.x,this.position.y)<20*this.item.size
        )
        switch(this.type){
            case 3:
                this.relic.update(true,0,this.usable?{rel:{x:inputs.rel.x-this.position.x,y:inputs.rel.y-this.position.y}}:{rel:{x:-100,y:-100}},undefined,!this.battle.overlayManager.anyActive)
            break
            case 6:
                this.item.update(true,0,this.usable?{rel:{x:inputs.rel.x-this.position.x,y:inputs.rel.y-this.position.y}}:{rel:{x:-100,y:-100}},false)
            break
        }
    }
    onClick(){
        if((this.position.x<this.layer.width&&
            this.type==1&&pointInsideBox({position:inputs.rel},{position:this.position,width:this.card.width*this.midSize,height:this.card.height*this.midSize})||
            this.type==2&&pointInsideBox({position:inputs.rel},{position:this.position,width:90*this.midSize,height:120*this.midSize})||
            this.type==3&&dist(inputs.rel.x,inputs.rel.y,this.position.x,this.position.y)<20*this.relic.size||
            this.type==4&&pointInsideBox({position:inputs.rel},{position:{x:this.position.x,y:this.position.y-25},width:300,height:200})||
            this.type==5&&pointInsideBox({position:inputs.rel},{position:this.position,width:72*this.midSize,height:96*this.midSize})||
            this.type==6&&dist(inputs.rel.x,inputs.rel.y,this.position.x,this.position.y)<20*this.item.size
        )&&!this.battle.overlayManager.anyActive){
            this.buy()
        }
    }
    onKey(key,code){
        if(this.type==2&&code==BACKSPACE){
            this.buy()
        }
    }
}