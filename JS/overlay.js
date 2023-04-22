class overlay{
    constructor(layer,battle,player,type,args){
        this.layer=layer
        this.battle=battle
        this.player=player
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
                    case 0: case 6: case 9:
                        this.battle.cardManagers[this.player].reserve.cards.forEach(card=>card.size=0)
                    break
                    case 1: case 5:
                        this.battle.cardManagers[this.player].discard.cards.forEach(card=>card.size=0)
                    break
                    case 2: case 3: case 4: case 7: case 8: case 10:
                        this.battle.cardManagers[this.player].deck.cards.forEach(card=>card.size=0)
                    break
                }
                switch(this.args[0]){
                    case 3: this.card=new card(this.layer,this.battle,this.player,-100,-100,0,0,0,0); break
                }
            break
            case 3:
                this.cards=[]
                this.takable=1
                this.options=3
            break
        }
    }
    getPosKey(){
        this.posKey=1-this.battle.players+this.player*2
    }
    activate(args){
        switch(this.type){
            case 1:
                if(args[0]==0){
                    this.rewards=[]
                }
                for(let a=0,la=args[1].length;a<la;a++){
                    this.rewards.push({type:args[1][a].type,value:args[1][a].value,fade:1,position:this.rewards.length*50,usable:true})
                }
            break
            case 2:
                switch(this.args[0]){
                    case 0: case 6: case 9: this.battle.cardManagers[this.player].reserve.resetAnim(); break
                    case 1: case 7: this.battle.cardManagers[this.player].discard.resetAnim(); break
                    case 2: case 3: case 4: case 7: case 8: case 10: this.battle.cardManagers[this.player].deck.resetAnim(); break
                }
                switch(this.args[0]){
                    case 3: this.card=new card(this.layer,this.battle,this.player,-100,-100,0,0,0,0); break
                }
            break
            case 3:
                this.cards=[]
                let list=[]
                this.taken=0
                switch(args[2]){
                    case 0:
                        list=copyArrayStack(this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]])
                        for(let a=0,la=this.options;a<la;a++){
                            let index=floor(random(0,list[args[1]].length))
                            this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[args[1]][index],args[0],this.battle.player[this.player],-1))
                            this.cards[a].upSize=true
                            list[args[1]].splice(index,1)
                        }
                    break
                    case 1:
                        list=copyArrayStack(this.battle.cardManagers[this.player].listing.card[0])
                        for(let a=0,la=this.options;a<la;a++){
                            let index=floor(random(0,list[args[1]].length))
                            this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[args[1]][index],args[0],0,-1))
                            this.cards[a].upSize=true
                            list[args[1]].splice(index,1)
                        }
                    break
                }
            break
        }
    }
    execute(args){
        switch(this.type){
            case 1:
                switch(args.type){
                    case 0:
                        this.battle.getCurrency(args.value[0],this.player)
                    break
                    case 1:
                        this.battle.overlayManager.overlays[3][this.player].active=true
                        this.battle.overlayManager.overlays[3][this.player].activate(args.value)
                    break
                    case 2:
                        this.battle.relicManager.addRandomRelic(this.player)
                    break
                    case 3:
                        this.battle.itemManager.addRandomItem(this.player)
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
                    this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2,240,360,10)
                }else{
                    this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2+max(0,this.rewards[this.rewards.length-1].position-250)/2,240,360+max(0,this.rewards[this.rewards.length-1].position-250),10)
                }
                this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-205,120,40,10)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                this.layer.text('Rewards',this.layer.width/2+225*this.posKey,this.layer.height/2-150)
                this.layer.textSize(20)
                this.layer.text('Close',this.layer.width/2+225*this.posKey,this.layer.height/2-205)
                for(let a=0,la=this.rewards.length;a<la;a++){
                    this.layer.noStroke()
                    this.layer.fill(120,this.fade*this.rewards[a].fade)
                    switch(this.rewards[a].type){
                        case 0:
                            this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-105+this.rewards[a].position,60,40,10)
                            this.layer.fill(240,240,220,this.fade*this.rewards[a].fade)
                            this.layer.ellipse(this.layer.width/2+225*this.posKey-10,this.layer.height/2-105+this.rewards[a].position,16,16)
                            this.layer.fill(220,220,200,this.fade*this.rewards[a].fade)
                            this.layer.ellipse(this.layer.width/2+225*this.posKey-10,this.layer.height/2-105+this.rewards[a].position,10,10)
                            this.layer.fill(0,this.fade*this.rewards[a].fade)
                            this.layer.textSize(16)
                            this.layer.textAlign(LEFT,CENTER)
                            this.layer.text(this.rewards[a].value[0],this.layer.width/2+225*this.posKey,this.layer.height/2-103+this.rewards[a].position)
                            this.layer.textAlign(CENTER,CENTER)
                        break
                        case 1:
                            this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-105+this.rewards[a].position,120,40,10)
                            this.layer.fill(this.battle.colorDetail[this.player].fill)
                            this.layer.stroke(this.battle.colorDetail[this.player].stroke)
                            this.layer.strokeWeight(3)
                            this.layer.rect(this.layer.width/2+225*this.posKey-40,this.layer.height/2-105+this.rewards[a].position,24,32,5)
                            this.layer.fill(0,this.fade*this.rewards[a].fade)
                            this.layer.noStroke()
                            this.layer.textSize(16)
                            this.layer.text('New Card',this.layer.width/2+225*this.posKey+15,this.layer.height/2-103+this.rewards[a].position)
                        break
                        case 2:
                            this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-105+this.rewards[a].position,120,40,10)
                            this.layer.fill(200,this.fade)
                            this.layer.noStroke()
                            this.layer.ellipse(this.layer.width/2+225*this.posKey-40,this.layer.height/2-105+this.rewards[a].position,30,30)
                            this.layer.stroke(100,this.fade)
                            this.layer.noFill()
                            this.layer.strokeWeight(1)
                            this.layer.ellipse(this.layer.width/2+225*this.posKey-40,this.layer.height/2-105+this.rewards[a].position,12,12)
                            this.layer.ellipse(this.layer.width/2+225*this.posKey-40,this.layer.height/2-105+this.rewards[a].position,18,18)
                            this.layer.fill(0,this.fade*this.rewards[a].fade)
                            this.layer.noStroke()
                            this.layer.textSize(16)
                            this.layer.text('New Relic',this.layer.width/2+225*this.posKey+15,this.layer.height/2-103+this.rewards[a].position)
                        break
                        case 3:
                            this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-105+this.rewards[a].position,120,40,10)
                            this.layer.fill(200,this.fade)
                            this.layer.noStroke()
                            this.layer.ellipse(this.layer.width/2+225*this.posKey-40,this.layer.height/2-105+this.rewards[a].position,30,30)
                            this.layer.stroke(100,this.fade)
                            this.layer.noFill()
                            this.layer.strokeWeight(1)
                            this.layer.rect(this.layer.width/2+225*this.posKey-45,this.layer.height/2-110+this.rewards[a].position,8,8)
                            this.layer.rect(this.layer.width/2+225*this.posKey-35,this.layer.height/2-110+this.rewards[a].position,8,8)
                            this.layer.rect(this.layer.width/2+225*this.posKey-45,this.layer.height/2-100+this.rewards[a].position,8,8)
                            this.layer.rect(this.layer.width/2+225*this.posKey-35,this.layer.height/2-100+this.rewards[a].position,8,8)
                            this.layer.rect(this.layer.width/2+225*this.posKey-40,this.layer.height/2-105+this.rewards[a].position,22,22)
                            this.layer.fill(0,this.fade*this.rewards[a].fade)
                            this.layer.noStroke()
                            this.layer.textSize(16)
                            this.layer.text('New Item',this.layer.width/2+225*this.posKey+15,this.layer.height/2-103+this.rewards[a].position)
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
                    case 0: case 1: case 2: case 9: this.layer.text('Close',this.layer.width/2,this.layer.height/2+225); break
                    case 3: case 4: case 5: case 6: case 7: case 8: case 10: this.layer.text('Skip',this.layer.width/2,this.layer.height/2+225); break
                }
                switch(this.args[0]){
                    case 0: case 6: this.battle.cardManagers[this.player].reserve.display('overlay',[0,this.page]); break
                    case 1: case 5: this.battle.cardManagers[this.player].discard.display('overlay',[1,this.page]); break
                    case 2: case 3: case 4: case 7: case 8: case 10: this.battle.cardManagers[this.player].deck.display('overlay',[1,this.page]); break
                    case 9: this.battle.cardManagers[this.player].reserve.display('overlay',[1,this.page]); break
                }
                switch(this.args[0]){
                    case 3: this.card.fade=1; this.card.anim.afford=1; this.card.display(); break
                }
            break
            case 3:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2,this.layer.height/2,this.options*120+40,200,10)
                this.layer.rect(this.layer.width/2,this.layer.height/2+125,120,40,10)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                switch(this.args[0]){
                    case 0: case 1: this.layer.text('Add a Card',this.layer.width/2,this.layer.height/2-70); break
                }
                this.layer.textSize(20)
                switch(this.args[0]){
                    case 0: case 1: this.layer.text('Skip',this.layer.width/2,this.layer.height/2+125); break
                }
                if(this.args[0]==0&&this.battle.relicManager.hasRelic(49,this.player)){
                    this.layer.textSize(8)
                    this.layer.text('2 Max HP',this.layer.width/2,this.layer.height/2+140)
                }
                for(let a=0,la=this.cards.length;a<la;a++){
                    this.cards[a].fade=1
                    this.cards[a].anim={select:0,afford:1}
                    this.cards[a].display()
                }
            break
            case 4:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2,240,360,10)
                this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-205,120,40,10)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                this.layer.text('Stats',this.layer.width/2+225*this.posKey,this.layer.height/2-160)
                this.layer.textSize(20)
                this.layer.text('Close',this.layer.width/2+225*this.posKey,this.layer.height/2-205)
                this.layer.textSize(10)
                this.layer.text(this.battle.stats.node[0]+' Nodes Travelled',this.layer.width/2+225*this.posKey,this.layer.height/2-140)
                this.layer.text(this.battle.stats.killed[this.player]+' Enemies Killed',this.layer.width/2+225*this.posKey,this.layer.height/2-50)
                this.layer.text(this.battle.stats.damage[this.player]+' Damage Dealt',this.layer.width/2+225*this.posKey,this.layer.height/2-35)
                this.layer.text(this.battle.stats.block[this.player]+' Block Added',this.layer.width/2+225*this.posKey,this.layer.height/2-20)
                this.layer.text(this.battle.stats.move[this.player]+' Tiles Moved',this.layer.width/2+225*this.posKey,this.layer.height/2-5)
                this.layer.text(this.battle.stats.drawn[this.player]+' Cards Drawn',this.layer.width/2+225*this.posKey,this.layer.height/2+10)
                this.layer.text(this.battle.stats.played[this.player][0]+' Cards Played:',this.layer.width/2+225*this.posKey,this.layer.height/2+25)
                this.layer.text(this.battle.stats.taken[this.player][0]+' Damage Taken:',this.layer.width/2+225*this.posKey,this.layer.height/2+85)
                this.layer.text(this.battle.stats.earned[this.player]+' Currency Obtained',this.layer.width/2+225*this.posKey,this.layer.height/2+125)
                this.layer.text(this.battle.stats.card[this.player]+' Cards Obtained',this.layer.width/2+225*this.posKey,this.layer.height/2+140)
                this.layer.text(this.battle.stats.relic[this.player]+' Relics Obtained',this.layer.width/2+225*this.posKey,this.layer.height/2+155)
                this.layer.text(this.battle.stats.item[this.player]+' Items Obtained',this.layer.width/2+225*this.posKey,this.layer.height/2+170)
                this.layer.textSize(8)
                this.layer.text(this.battle.stats.node[1]+' Battles',this.layer.width/2+225*this.posKey,this.layer.height/2-125)
                this.layer.text(this.battle.stats.node[2]+' Elites',this.layer.width/2+225*this.posKey,this.layer.height/2-115)
                this.layer.text(this.battle.stats.node[3]+' Bosses',this.layer.width/2+225*this.posKey,this.layer.height/2-105)
                this.layer.text(this.battle.stats.node[4]+' Rest Sites',this.layer.width/2+225*this.posKey,this.layer.height/2-95)
                this.layer.text(this.battle.stats.node[5]+' Shops',this.layer.width/2+225*this.posKey,this.layer.height/2-85)
                this.layer.text(this.battle.stats.node[6]+' Unknowns',this.layer.width/2+225*this.posKey,this.layer.height/2-75)
                this.layer.text(this.battle.stats.node[7]+' Stashes',this.layer.width/2+225*this.posKey,this.layer.height/2-65)
                this.layer.text(this.battle.stats.played[this.player][1]+' Attacks',this.layer.width/2+225*this.posKey,this.layer.height/2+40)
                this.layer.text(this.battle.stats.played[this.player][2]+' Defense',this.layer.width/2+225*this.posKey,this.layer.height/2+50)
                this.layer.text(this.battle.stats.played[this.player][3]+' Movement',this.layer.width/2+225*this.posKey,this.layer.height/2+60)
                this.layer.text(this.battle.stats.played[this.player][4]+' Powers',this.layer.width/2+225*this.posKey,this.layer.height/2+70)
                this.layer.text(this.battle.stats.taken[this.player][1]+' Blocked',this.layer.width/2+225*this.posKey,this.layer.height/2+100)
                this.layer.text(this.battle.stats.taken[this.player][2]+' Unblocked',this.layer.width/2+225*this.posKey,this.layer.height/2+110)
            break
        }
    }
    update(first){
        this.fade=smoothAnim(this.fade,this.active&&(first==-1||first==this.type),0,1,5)
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
                    if(this.rewards.length<=0&&!this.battle.overlayManager.overlays[3].active&&this.active){
                        this.active=false
                    }
                break
                case 2:
                    switch(this.args[0]){
                        case 0: case 6: case 9: this.battle.cardManagers[this.player].reserve.update('overlay',[this.page]); break
                        case 1: case 5: this.battle.cardManagers[this.player].discard.update('overlay',[this.page]); break
                        case 2: case 3: case 4: case 7: case 8: case 10: this.battle.cardManagers[this.player].deck.update('overlay',[this.page]); break
                    }
                    switch(this.args[0]){
                        case 0: case 6: case 9:
                            for(let a=0,la=this.battle.cardManagers[this.player].reserve.cards.length;a<la;a++){
                                this.battle.cardManagers[this.player].reserve.cards[a].size=constrain(this.battle.cardManagers[this.player].reserve.cards[a].size,0,this.fade)
                            }
                        break
                        case 1: case 5:
                            for(let a=0,la=this.battle.cardManagers[this.player].discard.cards.length;a<la;a++){
                                this.battle.cardManagers[this.player].discard.cards[a].size=constrain(this.battle.cardManagers[this.player].discard.cards[a].size,0,this.fade)
                            }
                        break
                        case 2: case 3: case 4: case 7: case 8: case 10:
                            for(let a=0,la=this.battle.cardManagers[this.player].deck.cards.length;a<la;a++){
                                this.battle.cardManagers[this.player].deck.cards[a].size=constrain(this.battle.cardManagers[this.player].deck.cards[a].size,0,this.fade)
                            }
                        break
                    }
                    switch(this.args[0]){
                        case 3: this.card.size=constrain(smoothAnim(this.card.size,this.card.page==this.page,0,this.fade,5),0,this.fade); break
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
                        if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+225*this.posKey,y:this.layer.height/2-105+this.rewards[a].position},width:200,height:40})&&this.rewards[a].usable){
                            this.rewards[a].usable=false
                            this.execute(this.rewards[a])
                        }
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+225*this.posKey,y:this.layer.height/2-205},width:120,height:40})){
                        this.active=false
                        for(let a=0,la=this.rewards.length;a<la;a++){
                            if(this.rewards[a].type==1){
                                this.battle.relicManager.activate(8,[this.player])
                            }
                        }
                    }
                break
                case 2:
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-285,y:this.layer.height/2},width:40,height:40})&&this.page>0){
                        this.page--
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+285,y:this.layer.height/2},width:40,height:40})&&(
                    this.page<ceil((this.battle.cardManagers[this.player].reserve.cards.length-1)/15)-1&&(this.args[0]==0||this.args[0]==6)||
                    this.page<ceil((this.battle.cardManagers[this.player].discard.cards.length-1)/15)-1&&(this.args[0]==1||this.args[0]==5)||
                    this.page<ceil((this.battle.cardManagers[this.player].deck.cards.length-1)/15)-1&&(this.args[0]==2||this.args[0]==3||this.args[0]==4))){
                        this.page++
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2+225},width:120,height:40})){
                        this.active=false
                    }
                    switch(this.args[0]){
                        case 3: case 4: case 7: case 8: case 10:
                            for(let a=0,la=this.battle.cardManagers[this.player].deck.cards.length;a<la;a++){
                                if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].deck.cards[a])&&this.battle.cardManagers[this.player].deck.cards[a].size>0.5&&this.battle.cardManagers[this.player].deck.cards[a].select&&
                                !(this.args[0]==3&&this.battle.cardManagers[this.player].deck.cards[a].level>=types.card[this.battle.cardManagers[this.player].deck.cards[a].type].levels.length-1)){
                                    this.battle.cardManagers[this.player].deck.cards[a].select=false
                                    let size=this.battle.cardManagers[this.player].deck.cards[a].size
                                    let complete=true
                                    switch(this.args[0]){
                                        case 3:
                                            this.battle.cardManagers[this.player].deck.cards[a]=upgradeCard(this.battle.cardManagers[this.player].deck.cards[a])
                                            this.battle.cardManagers[this.player].deck.cards[a].size=size
                                        break
                                        case 4:
                                            if(this.battle.cardManagers[this.player].deck.remove(a)){
                                                if(this.battle.relicManager.hasRelic(104,this.player)){
                                                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].gainMaxHP(7*this.battle.relicManager.active[104])
                                                }
                                                a--
                                                la--
                                            }else{
                                                complete=false
                                            }
                                        break
                                        case 7:
                                            this.battle.cardManagers[this.player].deck.cards[a]=this.battle.cardManagers[this.player].transformCard(this.battle.cardManagers[this.player].deck.cards[a])
                                        break
                                        case 8:
                                            this.battle.cardManagers[this.player].deck.copySelf(a)
                                        break
                                        case 10:
                                            this.battle.cardManagers[this.player].deck.cards[a].spec.push(3)
                                            this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.push(3)
                                        break
                                    }
                                    this.battle.cardManagers[this.player].deck.cards[a].size=size
                                    this.active=!complete
                                }
                                this.battle.cardManagers[this.player].deck.cards[a].select=false
                                if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].deck.cards[a])&&this.battle.cardManagers[this.player].deck.cards[a].size>0.5){
                                    this.battle.cardManagers[this.player].deck.cards[a].select=true
                                    switch(this.args[0]){
                                        case 3:
                                            this.card=upgradeCard(this.battle.cardManagers[this.player].deck.cards[a])
                                            this.card.page=this.page
                                            this.card.size=1
                                        break
                                    }
                                }
                            }
                        break
                        case 5:
                            for(let a=0,la=this.battle.cardManagers[this.player].discard.cards.length;a<la;a++){
                                if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].discard.cards[a])&&this.battle.cardManagers[this.player].discard.cards[a].size>0.5&&this.battle.cardManagers[this.player].discard.cards[a].select){
                                    this.battle.cardManagers[this.player].discard.cards[a].select=false
                                    switch(this.args[0]){
                                        case 5:
                                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                    }
                                    this.active=false
                                }
                                if(a>=0){
                                    this.battle.cardManagers[this.player].discard.cards[a].select=false
                                    if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].discard.cards[a])&&this.battle.cardManagers[this.player].discard.cards[a].size>0.5){
                                        this.battle.cardManagers[this.player].discard.cards[a].select=true
                                    }
                                }
                            }
                        break
                        case 6:
                            for(let a=0,la=this.battle.cardManagers[this.player].reserve.cards.length;a<la;a++){
                                if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].reserve.cards[a])&&this.battle.cardManagers[this.player].reserve.cards[a].size>0.5&&this.battle.cardManagers[this.player].reserve.cards[a].select){
                                    this.battle.cardManagers[this.player].reserve.cards[a].select=false
                                    switch(this.args[0]){
                                        case 6:
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                    }
                                    this.active=false
                                }
                                if(a>=0){
                                    this.battle.cardManagers[this.player].reserve.cards[a].select=false
                                    if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].reserve.cards[a])&&this.battle.cardManagers[this.player].reserve.cards[a].size>0.5){
                                        this.battle.cardManagers[this.player].reserve.cards[a].select=true
                                    }
                                }
                            }
                        break
                    }
                break
                case 3:
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},this.cards[a])&&!this.cards[a].deSize){
                            switch(this.args[0]){
                                case 0:
                                    this.battle.cardManagers[this.player].deck.add(this.cards[a].type,this.cards[a].level,this.cards[a].color)
                                break
                                case 1:
                                    this.battle.cardManagers[this.player].hand.add(this.cards[a].type,this.cards[a].level,this.cards[a].color)
                                break
                            }
                            this.cards[a].deSize=true
                            this.cards[a].upSize=false
                            this.taken++
                            if(this.taken>=this.takable){
                                this.active=false
                                for(let b=0,lb=this.cards.length;b<lb;b++){
                                    this.cards[b].deSize=true
                                    this.cards[b].upSize=false
                                }
                            }
                        }
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2+125},width:120,height:40})){
                        this.active=false
                        if(this.args[0]==0){
                            this.battle.relicManager.activate(8,[this.player])
                        }
                    }
                break
                case 4:
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+225*this.posKey,y:this.layer.height/2-205},width:120,height:40})){
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
                        for(let a=0,la=this.rewards.length;a<la;a++){
                            if(this.rewards[a].type==1){
                                this.battle.relicManager.activate(8,[this.player])
                            }
                        }
                    }
                break
                case 2:
                    if(code==LEFT_ARROW&&this.page>0){
                        this.page--
                    }else if(code==RIGHT_ARROW&&(
                    this.page<ceil((this.battle.cardManagers[this.player].reserve.cards.length-1)/15)-1&&(this.args[0]==0||this.args[0]==6)||
                    this.page<ceil((this.battle.cardManagers[this.player].discard.cards.length-1)/15)-1&&(this.args[0]==1||this.args[0]==5)||
                    this.page<ceil((this.battle.cardManagers[this.player].deck.cards.length-1)/15)-1&&(this.args[0]==2||this.args[0]==3||this.args[0]==4))){
                        this.page++
                    }else if(code==ENTER){
                        this.active=false
                    }
                    switch(this.args[0]){
                        case 3: case 4: case 7: case 8: case 10:
                            for(let a=0,la=this.battle.cardManagers[this.player].deck.cards.length;a<la;a++){
                                if(key==inputs.hexadec[a]&&this.battle.cardManagers[this.player].deck.cards[a].size>0.5&&this.battle.cardManagers[this.player].deck.cards[a].select){
                                    this.battle.cardManagers[this.player].deck.cards[a].select=false
                                    let size=this.battle.cardManagers[this.player].deck.cards[a].size
                                    let complete=true
                                    switch(this.args[0]){
                                        case 3:
                                            this.battle.cardManagers[this.player].deck.cards[a]=upgradeCard(this.battle.cardManagers[this.player].deck.cards[a])
                                        break
                                        case 4:
                                            if(this.battle.cardManagers[this.player].deck.remove(a)){
                                                if(this.battle.relicManager.hasRelic(104,this.player)){
                                                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].gainMaxHP(7*this.battle.relicManager.active[104])
                                                }
                                                a--
                                                la--
                                            }else{
                                                complete=false
                                            }
                                        break
                                        case 7:
                                            this.battle.cardManagers[this.player].deck.cards[a]=this.battle.cardManagers[this.player].transformCard(this.battle.cardManagers[this.player].deck.cards[a])
                                        break
                                        case 8:
                                            this.battle.cardManagers[this.player].deck.copySelf(a)
                                        break
                                        case 10:
                                            this.battle.cardManagers[this.player].deck.cards[a].spec.push(3)
                                            this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.push(3)
                                        break
                                    }
                                    this.battle.cardManagers[this.player].deck.cards[a].size=size
                                    this.active=!complete
                                }
                                this.battle.cardManagers[this.player].deck.cards[a].select=false
                                if(key==inputs.hexadec[a]&&this.battle.cardManagers[this.player].deck.cards[a].size>0.5){
                                    this.battle.cardManagers[this.player].deck.cards[a].select=true
                                    switch(this.args[0]){
                                        case 3:
                                            this.card=upgradeCard(this.battle.cardManagers[this.player].deck.cards[a])
                                            this.card.page=this.page
                                            this.card.size=1
                                        break
                                    }
                                }
                            }
                        break
                        case 5:
                            for(let a=0,la=this.battle.cardManagers[this.player].discard.cards.length;a<la;a++){
                                if(key==inputs.hexadec[a]&&this.battle.cardManagers[this.player].discard.cards[a].size>0.5&&this.battle.cardManagers[this.player].discard.cards[a].select){
                                    this.battle.cardManagers[this.player].discard.cards[a].select=false
                                    switch(this.args[0]){
                                        case 5:
                                            
                                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                    }
                                    this.active=false
                                }
                                if(a>=0){
                                    this.battle.cardManagers[this.player].discard.cards[a].select=false
                                    if(key==inputs.hexadec[a]&&this.battle.cardManagers[this.player].discard.cards[a].size>0.5){
                                        this.battle.cardManagers[this.player].discard.cards[a].select=true
                                    }
                                }
                            }
                        break
                        case 6:
                            for(let a=0,la=this.battle.cardManagers[this.player].reserve.cards.length;a<la;a++){
                                if(key==inputs.hexadec[a]&&this.battle.cardManagers[this.player].reserve.cards[a].size>0.5&&this.battle.cardManagers[this.player].reserve.cards[a].select){
                                    this.battle.cardManagers[this.player].reserve.cards[a].select=false
                                    switch(this.args[0]){
                                        case 6:
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                    }
                                    this.active=false
                                }
                                if(a>=0){
                                    this.battle.cardManagers[this.player].reserve.cards[a].select=false
                                    if(key==inputs.hexadec[a]&&this.battle.cardManagers[this.player].reserve.cards[a].size>0.5){
                                        this.battle.cardManagers[this.player].reserve.cards[a].select=true
                                    }
                                }
                            }
                        break
                    }
                break
                case 3:
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if((int(key)+9)%10==a&&!this.cards[a].deSize){
                            switch(this.args[0]){
                                case 0:
                                    this.battle.cardManagers[this.player].deck.add(this.cards[a].type,this.cards[a].level,this.cards[a].color)
                                break
                            }
                            this.cards[a].deSize=true
                            this.cards[a].upSize=false
                            this.taken++
                            if(this.taken>=this.takable){
                                this.active=false
                                for(let b=0,lb=this.cards.length;b<lb;b++){
                                    this.cards[b].deSize=true
                                    this.cards[b].upSize=false
                                }
                            }
                        }
                    }
                    if(code==ENTER){
                        this.active=false
                        if(this.args[0]==0){
                            this.battle.relicManager.activate(8,[this.player])
                        }
                    }
                break
                case 4:
                    if(code==ENTER){
                        this.active=false
                    }
                break
            }
        }
    }
}