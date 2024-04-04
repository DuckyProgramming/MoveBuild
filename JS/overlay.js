class overlay{
    constructor(layer,battle,player,type,args){
        this.layer=layer
        this.battle=battle
        this.player=player
        this.type=type
        this.args=args
        this.fade=0
        this.active=false
        this.endAfter=false
        switch(this.type){
            case 1:
                this.rewards=[]
            break
            case 2:
                this.page=0
                switch(this.args[0]){
                    case 0: case 6: case 9: case 13: case 14: case 15: case 16: case 18: case 20: case 22:
                    case 23: case 25:
                        this.battle.cardManagers[this.player].reserve.cards.forEach(card=>card.size=0)
                    break
                    case 1: case 5: case 11: case 19: case 21:
                        this.battle.cardManagers[this.player].discard.cards.forEach(card=>card.size=0)
                    break
                    case 2: case 3: case 4: case 7: case 8: case 10: case 17: case 26: case 27: case 28:
                    case 29:
                        this.battle.cardManagers[this.player].deck.cards.forEach(card=>card.size=0)
                    break
                    case 12:
                        this.battle.cardManagers[this.player].exhaust.cards.forEach(card=>card.size=0)
                    break
                    case 24:
                        this.battle.tierManager.tiers[this.args[1]].cards.forEach(card=>card.size=0)
                    break
                }
                switch(this.args[0]){
                    case 3: case 17:
                        this.card=new card(this.layer,this.battle,this.player,-100,-100,0,0,0,0)
                        this.card.nonCalc=true
                    break
                }
            break
            case 3:
                this.cards=[]
                this.takable=1
                this.options=3
            break
            case 5:
                this.page=0
                this.battle.relicManager.relics.forEach(relic=>relic.fade=0)
            break
            case 6:
                this.text=''
                this.possible='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
                this.suggestions=[]
            break
            case 8:
                this.page=0
                this.cards=[]
                this.takable=1
            break
            case 9:
                this.choices=[]
                this.cards=[]
            break
            case 11:
                this.choices=[]
            break
            case 12:
                this.world=0
            break
        }
    }
    getPosKey(){
        this.posKey=1-this.battle.players+this.player*2
    }
    activate(args){
        let list=[]
        switch(this.type){
            case 1:
                if(args[0]==0){
                    this.rewards=[]
                }
                for(let a=0,la=args[1].length;a<la;a++){
                    this.rewards.push({type:args[1][a].type,value:args[1][a].value,fade:1,position:this.rewards.length*50,usable:true})
                    if(this.rewards[this.rewards.length-1].type==2){
                        this.rewards[this.rewards.length-1].relic=new relic(this.layer,-1,0,0,this.battle.relicManager.makeRelicSelection([[0,0,0,1,1,2][floor(random(0,6))]])[0],0.8)
                    }else if(this.rewards[this.rewards.length-1].type==3){
                        this.rewards[this.rewards.length-1].item=new item(this.layer,-1,0,0,0,0,this.battle.itemManager.makeRandom(),0.8)
                    }
                }
            break
            case 2:
                switch(this.args[0]){
                    case 0: case 6: case 9: case 13: case 14: case 15: case 16: case 18: case 20: case 22:
                    case 23: case 25: this.battle.cardManagers[this.player].reserve.resetAnim(); break
                    case 1: case 5: case 11: case 19: case 21: this.battle.cardManagers[this.player].discard.resetAnim(); break
                    case 2: case 3: case 4: case 7: case 8: case 10: case 17: case 26: case 27: case 28:
                    case 29: this.battle.cardManagers[this.player].deck.resetAnim(); break
                    case 12: this.battle.cardManagers[this.player].exhaust.resetAnim(); break
                    case 24: this.battle.tierManager.tiers[this.args[1]].resetAnim(); break
                }
                switch(this.args[0]){
                    case 3: case 17:
                        this.card=new card(this.layer,this.battle,this.player,-100,-100,0,0,0,0)
                        this.card.nonCalc=true
                    break
                    case 4: this.activated=0; break
                    case 21: case 22: this.block=args[0]; break
                }
            break
            case 3:
                this.cards=[]
                let sublist=[]
                this.taken=0
                if(args[2]==7||args[2]==9||args[2]==10||args[2]==11){
                    this.options=args[3]
                }else{
                    this.options=3
                }
                if(variants.cursed){
                    args[0]=min(args[0]+1,2)
                }
                switch(args[2]){
                    case 0: case 7:
                        list=variants.junk?quadroArray(copyArray(this.battle.cardManagers[this.player].listing.junk[game.playerNumber+1])):variants.ultraprism?copyArrayStack(this.battle.cardManagers[this.player].listing.all):variants.prism?copyArrayStack(this.battle.cardManagers[this.player].listing.allPlayerCard):copyArrayStack(this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]])
                        for(let a=0,la=this.options;a<la;a++){
                            let index=floor(random(0,list[args[1]].length))
                            this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[args[1]][index],args[0],variants.junk?types.card[list[args[1]][index]].list:variants.ultraprism?(types.card[list[args[1]][index]].list<0?0:types.card[list[args[1]][index]].list>=types.color.card.length?0:types.card[list[args[1]][index]].list):variants.prism?types.card[list[args[1]][index]].list:this.battle.player[this.player],-1))
                            let roll=this.battle.relicManager.hasRelic(180,this.player)?floor(random(0,60)):floor(random(0,240))
                            this.cards[this.cards.length-1].edition=this.battle.relicManager.hasRelic(213,player)?0:roll==0?6:roll==1?5:roll==2?4:roll>=3&&roll<=5?3:roll>=6&&roll<=8?2:roll>=9&&roll<=11?1:0
                            this.cards[this.cards.length-1].upSize=true
                            list[args[1]].splice(index,1)
                        }
                        if(this.args[0]==0&&this.battle.relicManager.hasRelic(172,this.player)){
                            list=variants.junk?quadroArray(copyArray(this.battle.cardManagers[this.player].listing.junk[game.playerNumber+1])):variants.ultraprism?copyArrayStack(this.battle.cardManagers[this.player].listing.all):variants.prism?copyArrayStack(this.battle.cardManagers[this.player].listing.allPlayerCard):copyArrayStack(this.battle.cardManagers[this.player].listing.allPlayerCard)
                            let index=floor(random(0,list[args[1]].length))
                            this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+this.options*60+120,this.layer.height/2+20,list[args[1]][index],args[0],variants.junk?types.card[list[args[1]][index]].list:variants.ultraprism?(types.card[list[args[1]][index]].list<0?0:types.card[list[args[1]][index]].list>=types.color.card.length?0:types.card[list[args[1]][index]].list):variants.prism?types.card[list[args[1]][index]].list:types.card[list[args[1]][index]].list,-1))
                            let roll=this.battle.relicManager.hasRelic(180,this.player)?floor(random(0,60)):floor(random(0,240))
                            this.cards[this.cards.length-1].edition=this.battle.relicManager.hasRelic(213,player)?0:roll==0?6:roll==1?5:roll==2?4:roll>=3&&roll<=5?3:roll>=6&&roll<=8?2:roll>=9&&roll<=11?1:0
                            this.cards[this.cards.length-1].upSize=true
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
                    case 2:
                        list=copyArrayStack(this.battle.cardManagers[this.player].listing.allPlayerCard)
                        for(let a=0,la=this.options;a<la;a++){
                            let index=floor(random(0,list[args[1]].length))
                            this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[args[1]][index],args[0],types.card[list[args[1]][index]].list,-1))
                            this.cards[a].cost=0
                            this.cards[a].upSize=true
                        }
                    break
                    case 3:
                        list=copyArrayStack(this.battle.cardManagers[this.player].listing.allPlayerCard)
                        sublist=[]
                        for(let a=0,la=list[3].length;a<la;a++){
                            if(types.card[list[3][a]].levels[args[0]].class==args[1]){
                                sublist.push(list[3][a])
                            }
                        }
                        for(let a=0,la=this.options;a<la;a++){
                            let index=floor(random(0,sublist.length))
                            this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,sublist[index],args[0],types.card[sublist[index]].list,-1))
                            this.cards[a].upSize=true
                            sublist.splice(index,1)
                        }
                    break
                    case 4: case 10:
                        list=copyArrayStack(this.battle.cardManagers[this.player].listing.allPlayerCard)
                        sublist=[]
                        for(let a=0,la=list[3].length;a<la;a++){
                            if(types.card[list[3][a]].levels[args[0]].class==args[1]){
                                sublist.push(list[3][a])
                            }
                        }
                        for(let a=0,la=this.options;a<la;a++){
                            let index=floor(random(0,sublist.length))
                            this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,sublist[index],args[0],types.card[sublist[index]].list,-1))
                            if(args[2]==4){
                                this.cards[a].cost=0
                            }
                            this.cards[a].upSize=true
                            sublist.splice(index,1)
                        }
                    break
                    case 5:
                        list=[]
                        for(let a=0,la=11;a<la;a++){
                            list.push(findName(`${a+1} of Nothings`,types.card))
                        }
                        for(let a=0,la=this.options;a<la;a++){
                            let index=floor(random(0,list.length))
                            this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[index],args[0],0,-1))
                            this.cards[a].upSize=true
                            list.splice(index,1)
                        }
                    break
                    case 6:
                        list=copyArrayStack(this.battle.cardManagers[this.player].listing.card[game.playerNumber+4])
                        for(let a=0,la=this.options;a<la;a++){
                            let index=floor(random(0,list[args[1]].length))
                            this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[args[1]][index],args[0],game.playerNumber+4,-1))
                            this.cards[a].upSize=true
                            list[args[1]].splice(index,1)
                        }
                    break
                    case 8:
                        for(let a=0,la=this.options;a<la;a++){
                            this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,findName('Better\nCard',types.card),0,0,-1))
                            this.cards[a].upSize=true
                        }
                    break
                    case 9:
                        for(let a=0,la=this.options;a<la;a++){
                            this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,findName(['White\nDwarf','Black\nDwarf'][a%2],types.card),0,0,-1))
                            this.cards[a].upSize=true
                        }
                    break
                    case 11:
                        for(let a=0,la=this.options;a<la;a++){
                            this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,findName(['Mixture A','Mixture B','Mixture C'][a%3],types.card),0,0,-1))
                            this.cards[a].upSize=true
                        }
                    break
                    case 12:
                        this.world=[args[0]]
                    break
                }
                this.setupArgs=args
                for(let a=0,la=this.cards.length;a<la;a++){
                    this.cards[a].nonCalc=true
                }
            break
            case 7:
                this.battle.combatantManager.combatants[this.player].reset()
                this.battle.combatantManager.combatants[this.player].infoAnim.life=0
            break
            case 8:
                this.cards=[]
                this.taken=0
                switch(args[2]){
                    case 0:
                        list=copyArrayStack(this.battle.cardManagers[this.player].listing.coc)
                        let tick=0
                        for(let a=0,la=list[args[1]].length;a<la;a++){
                            //if(types.card[list[args[1]][a]].levels[0].class==3){
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2-350+tick%8*100,this.layer.height/2-130+floor(tick/8)%3*130,list[args[1]][a],args[0],types.card[list[args[1]][a]].list,-1))
                                this.cards[tick].upSize=true
                                tick++
                            //}
                        }
                    break
                }
                this.setupArgs=args
                for(let a=0,la=this.cards.length;a<la;a++){
                    this.cards[a].nonCalc=true
                }
            break
            case 9:
                list=[]
                for(let a=0,la=this.battle.cardManagers[this.player].deck.cards.length;a<la;a++){
                    list.push(a)
                }
                this.choices=[]
                this.cards=[]
                if(list.length>=3){
                    for(let a=0,la=3;a<la;a++){
                        let index=floor(random(0,list.length))
                        this.choices.push(list[index])
                        this.cards.push(copyCard(this.battle.cardManagers[this.player].deck.cards[list[index]]))
                        this.cards[this.cards.length-1].upSize=true
                        this.cards[this.cards.length-1].position.x=this.layer.width/2-120+a*120
                        this.cards[this.cards.length-1].position.y=this.layer.height/2+20-this.battle.players*150+150+this.player*300
                        list.splice(index,1)
                    }
                }
            break
            case 11:
                this.choices=[]
                for(let a=0,la=3;a<la;a++){
                    let index=floor(random(0,this.battle.modManager.listing.mod.length))
                    this.choices.push(this.battle.modManager.listing.mod[index])
                    this.battle.modManager.listing.mod.splice(index,1)
                }
            break
            
        }
    }
    execute(args){
        switch(this.type){
            case 1:
                switch(args.type){
                    case 0:
                        this.battle.addCurrency(args.value[0],this.player)
                    break
                    case 1:
                        this.battle.overlayManager.overlays[3][this.player].active=true
                        this.battle.overlayManager.overlays[3][this.player].activate(args.value)
                    break
                    case 2:
                        this.battle.relicManager.addRelic(args.relic.type,this.player)
                    break
                    case 3:
                        this.battle.itemManager.addItem(args.item.type,this.player)
                    break
                    case 4:
                        this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].heal(args.value[0])
                    break
                    case 5:
                        this.battle.overlayManager.overlays[26][this.player].active=true
                        this.battle.overlayManager.overlays[26][this.player].activate(args.value)
                    break
                    case 6:
                        this.battle.nodeManager.freeMove=1
                    break
                    case 7:
                        this.battle.overlayManager.overlays[28][this.player].active=true
                        this.battle.overlayManager.overlays[28][this.player].activate(args.value)
                    break
                    case 8:
                        this.battle.overlayManager.overlays[6][this.player].active=true
                        this.battle.overlayManager.overlays[6][this.player].activate(args.value)
                    break
                    case 9:
                        this.battle.overlayManager.overlays[44][this.player].active=true
                        this.battle.overlayManager.overlays[44][this.player].activate(args.value)
                    break
                    case 10:
                        this.battle.overlayManager.overlays[12][this.player].active=true
                        this.battle.overlayManager.overlays[12][this.player].activate(args.value)
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
                if(this.args[0]==0){
                    this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-250,120,40,10)
                }
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                this.layer.text('Rewards',this.layer.width/2+225*this.posKey,this.layer.height/2-150)
                this.layer.textSize(20)
                this.layer.text('Close',this.layer.width/2+225*this.posKey,this.layer.height/2-205)
                if(this.args[0]==0){
                    this.layer.text('Replay',this.layer.width/2+225*this.posKey,this.layer.height/2-250)
                }
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
                            this.layer.fill(this.battle.colorDetail[this.player].fill,this.fade*this.rewards[a].fade)
                            this.layer.stroke(this.battle.colorDetail[this.player].stroke,this.fade*this.rewards[a].fade)
                            this.layer.strokeWeight(3)
                            this.layer.rect(this.layer.width/2+225*this.posKey-40,this.layer.height/2-105+this.rewards[a].position,24,32,5)
                            this.layer.fill(0,this.fade*this.rewards[a].fade)
                            this.layer.noStroke()
                            this.layer.textSize(16)
                            this.layer.text('New Card',this.layer.width/2+225*this.posKey+15,this.layer.height/2-103+this.rewards[a].position)
                        break
                        case 2:
                            this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-105+this.rewards[a].position,120,40,10)
                            this.rewards[a].relic.display(0,true,{x:this.layer.width/2+225*this.posKey-40,y:this.layer.height/2-105+this.rewards[a].position},false)
                            this.rewards[a].relic.displayInfo()
                            this.layer.fill(0,this.fade*this.rewards[a].fade)
                            this.layer.noStroke()
                            this.layer.textSize(16)
                            this.layer.text('New Relic',this.layer.width/2+225*this.posKey+15,this.layer.height/2-103+this.rewards[a].position)
                        break
                        case 3:
                            this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-105+this.rewards[a].position,120,40,10)
                            this.rewards[a].item.display(false)
                            this.rewards[a].item.position.x=this.layer.width/2+225*this.posKey-40
                            this.rewards[a].item.position.y=this.layer.height/2-105+this.rewards[a].position
                            this.rewards[a].item.displayInfo()
                            this.layer.fill(0,this.fade*this.rewards[a].fade)
                            this.layer.noStroke()
                            this.layer.textSize(16)
                            this.layer.text('New Item',this.layer.width/2+225*this.posKey+15,this.layer.height/2-103+this.rewards[a].position)
                        break
                        case 4:
                            this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-105+this.rewards[a].position,60,40,10)
                            this.layer.fill(255,100,100,this.fade*this.rewards[a].fade)
                            this.layer.rect(this.layer.width/2+225*this.posKey-10,this.layer.height/2-105+this.rewards[a].position,6,24)
                            this.layer.rect(this.layer.width/2+225*this.posKey-10,this.layer.height/2-105+this.rewards[a].position,24,6)
                            this.layer.fill(0,this.fade*this.rewards[a].fade)
                            this.layer.textSize(16)
                            this.layer.textAlign(LEFT,CENTER)
                            this.layer.text(this.rewards[a].value[0],this.layer.width/2+225*this.posKey,this.layer.height/2-103+this.rewards[a].position)
                            this.layer.textAlign(CENTER,CENTER)
                        break
                        case 5:
                            this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-105+this.rewards[a].position,120,40,10)
                            this.layer.fill(this.battle.colorDetail[this.player].fill,this.fade*this.rewards[a].fade)
                            this.layer.stroke(this.battle.colorDetail[this.player].stroke,this.fade*this.rewards[a].fade)
                            this.layer.strokeWeight(3)
                            this.layer.rect(this.layer.width/2+225*this.posKey-40,this.layer.height/2-105+this.rewards[a].position,24,32,5)
                            this.layer.stroke(40,this.fade*this.rewards[a].fade)
                            this.layer.strokeWeight(2)
                            this.layer.push()
                            this.layer.translate(this.layer.width/2+225*this.posKey-40,this.layer.height/2-105+this.rewards[a].position)
                            this.layer.line(-4,-10,4,-10)
                            this.layer.line(-4,-10,-6,-9)
                            this.layer.line(-6,-9,-6,-5)
                            this.layer.line(-4,-4,-6,-5)
                            this.layer.line(-4,-4,4,-4)
                            this.layer.line(4,-4,6,-5)
                            this.layer.line(6,-5,6,-9)
                            this.layer.line(6,-9,4,-10)
                            this.layer.rect(0,3,4,14)
                            this.layer.pop()
                            this.layer.fill(0,this.fade*this.rewards[a].fade)
                            this.layer.noStroke()
                            this.layer.textSize(16)
                            this.layer.text('Upgrade',this.layer.width/2+225*this.posKey+15,this.layer.height/2-103+this.rewards[a].position)
                        break
                        case 6:
                            this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-105+this.rewards[a].position,150,40,10)
                            this.layer.fill(200,this.fade*this.rewards[a].fade)
                            this.layer.push()
                            this.layer.translate(this.layer.width/2+225*this.posKey-40,this.layer.height/2-120+this.rewards[a].position)
                            this.layer.rotate(-75)
                            for(let a=0,la=4;a<la;a++){
                                this.layer.rect(0,11.5,4,25)
                                this.layer.triangle(-6,24,6,24,0,32)
                                this.layer.rotate(50)
                            }
                            this.layer.pop()
                            this.layer.fill(0,this.fade*this.rewards[a].fade)
                            this.layer.noStroke()
                            this.layer.textSize(16)
                            this.layer.text('Free Move',this.layer.width/2+225*this.posKey+30,this.layer.height/2-103+this.rewards[a].position)
                        break
                        case 7:
                            this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-105+this.rewards[a].position,120,40,10)
                            this.layer.fill(this.battle.colorDetail[this.player].fill,this.fade*this.rewards[a].fade)
                            this.layer.stroke(this.battle.colorDetail[this.player].stroke,this.fade*this.rewards[a].fade)
                            this.layer.strokeWeight(3)
                            this.layer.rect(this.layer.width/2+225*this.posKey-40,this.layer.height/2-105+this.rewards[a].position,24,32,5)
                            this.layer.stroke(40,this.fade*this.rewards[a].fade)
                            this.layer.strokeWeight(2)
                            this.layer.push()
                            this.layer.translate(this.layer.width/2+225*this.posKey-40,this.layer.height/2-105+this.rewards[a].position)
                            this.layer.line(-4,-10,4,-10)
                            this.layer.line(-4,-10,-6,-9)
                            this.layer.line(-6,-9,-6,-5)
                            this.layer.line(-4,-4,-6,-5)
                            this.layer.line(-4,-4,4,-4)
                            this.layer.line(4,-4,6,-5)
                            this.layer.line(6,-5,6,-9)
                            this.layer.line(6,-9,4,-10)
                            this.layer.rect(0,3,4,14)
                            this.layer.strokeWeight(1)
                            this.layer.line(0,-9,0,-5)
                            this.layer.line(-2,-7,2,-7)
                            this.layer.pop()
                            this.layer.fill(0,this.fade*this.rewards[a].fade)
                            this.layer.noStroke()
                            this.layer.textSize(12)
                            this.layer.text('Deluxe Upgrade',this.layer.width/2+225*this.posKey+15,this.layer.height/2-103+this.rewards[a].position)
                        break
                        case 8:
                            this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-105+this.rewards[a].position,120,40,10)
                            this.layer.fill(this.battle.colorDetail[this.player].fill,this.fade*this.rewards[a].fade)
                            this.layer.stroke(this.battle.colorDetail[this.player].stroke,this.fade*this.rewards[a].fade)
                            this.layer.strokeWeight(3)
                            this.layer.rect(this.layer.width/2+225*this.posKey-40,this.layer.height/2-105+this.rewards[a].position,24,32,5)
                            this.layer.stroke(40,this.fade*this.rewards[a].fade)
                            this.layer.strokeWeight(2)
                            this.layer.push()
                            this.layer.translate(this.layer.width/2+225*this.posKey-40,this.layer.height/2-105+this.rewards[a].position)
                            this.layer.line(-8,-8,-6,-8)
                            this.layer.line(-6,-8,0,-2)
                            this.layer.line(2,0,8,6)
                            this.layer.line(8,6,8,8)
                            this.layer.line(6,8,8,8)
                            this.layer.line(-8,-6,-2,0)
                            this.layer.line(0,2,6,8)
                            this.layer.line(-8,-8,-8,-6)
                            this.layer.line(-8,8,-6,8)
                            this.layer.line(-6,8,0,2)
                            this.layer.line(2,0,8,-6)
                            this.layer.line(8,-6,8,-8)
                            this.layer.line(6,-8,8,-8)
                            this.layer.line(-8,6,-2,0)
                            this.layer.line(0,-2,6,-8)
                            this.layer.line(-8,8,-8,6)
                            this.layer.pop()
                            this.layer.fill(0,this.fade*this.rewards[a].fade)
                            this.layer.noStroke()
                            this.layer.textSize(16)
                            this.layer.text('Remove',this.layer.width/2+225*this.posKey+15,this.layer.height/2-103+this.rewards[a].position)
                        break
                        case 9:
                            this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-105+this.rewards[a].position,120,40,10)
                            this.layer.fill(this.battle.colorDetail[this.player].fill,this.fade*this.rewards[a].fade)
                            this.layer.stroke(this.battle.colorDetail[this.player].stroke,this.fade*this.rewards[a].fade)
                            this.layer.strokeWeight(3)
                            this.layer.rect(this.layer.width/2+225*this.posKey-40,this.layer.height/2-105+this.rewards[a].position,24,32,5)
                            this.layer.stroke(40,this.fade*this.rewards[a].fade)
                            this.layer.strokeWeight(2)
                            this.layer.noFill()
                            this.layer.push()
                            this.layer.translate(this.layer.width/2+225*this.posKey-40,this.layer.height/2-105+this.rewards[a].position)
                            this.layer.ellipse(0,0,20)
                            this.layer.ellipse(0,0,10)
                            this.layer.line(0,-16,0,16)
                            this.layer.line(-12,-7,12,7)
                            this.layer.line(-12,7,12,-7)
                            this.layer.pop()
                            this.layer.stroke(this.battle.colorDetail[this.player].stroke,this.fade*this.rewards[a].fade)
                            this.layer.strokeWeight(3)
                            this.layer.rect(this.layer.width/2+225*this.posKey-40,this.layer.height/2-105+this.rewards[a].position,24,32,5)
                            this.layer.fill(0,this.fade*this.rewards[a].fade)
                            this.layer.noStroke()
                            this.layer.textSize(16)
                            this.layer.text('Edition',this.layer.width/2+225*this.posKey+15,this.layer.height/2-103+this.rewards[a].position)
                        break
                        case 10:
                            this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-105+this.rewards[a].position,120,40,10)
                            this.layer.fill(this.battle.colorDetail[this.player].fill,this.fade*this.rewards[a].fade)
                            this.layer.stroke(this.battle.colorDetail[this.player].stroke,this.fade*this.rewards[a].fade)
                            this.layer.strokeWeight(3)
                            this.layer.rect(this.layer.width/2+225*this.posKey-42,this.layer.height/2-107+this.rewards[a].position,21,28,5)
                            this.layer.rect(this.layer.width/2+225*this.posKey-38,this.layer.height/2-103+this.rewards[a].position,21,28,5)
                            this.layer.fill(0,this.fade*this.rewards[a].fade)
                            this.layer.noStroke()
                            this.layer.textSize(16)
                            this.layer.text('Duplicate',this.layer.width/2+225*this.posKey+15,this.layer.height/2-103+this.rewards[a].position)
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
                    case 0: case 6: case 20: case 22: case 25: this.layer.text('Not in Actual Order',this.layer.width/2,this.layer.height/2+197.5); break
                }
                this.layer.textSize(20)
                switch(this.args[0]){
                    case 0: case 1: case 2: case 9: case 23: case 24:
                        this.layer.text('Close',this.layer.width/2,this.layer.height/2+225); break
                    case 3: case 4: case 5: case 6: case 7: case 8: case 10: case 11: case 13: case 14:
                    case 15: case 16: case 12: case 17: case 18: case 19: case 20: case 21: case 22: case 25:
                    case 26: case 27: case 28: case 29:
                        this.layer.text('Skip',this.layer.width/2,this.layer.height/2+225); break
                }
                switch(this.args[0]){
                    case 0: case 6: case 18: case 22: case 25: this.battle.cardManagers[this.player].reserve.display('overlay',[0,this.page]); break
                    case 1: case 5: case 11: case 19: case 21: this.battle.cardManagers[this.player].discard.display('overlay',[1,this.page]); break
                    case 2: case 3: case 4: case 7: case 8: case 10: case 17: case 26: case 27: case 28:
                    case 29: this.battle.cardManagers[this.player].deck.display('overlay',[1,this.page]); break
                    case 9: this.battle.cardManagers[this.player].reserve.display('overlay',[1,this.page]); break
                    case 12: this.battle.cardManagers[this.player].exhaust.display('overlay',[1,this.page]); break
                    case 13: this.battle.cardManagers[this.player].reserve.display('overlay',[2,this.page]); break
                    case 14: this.battle.cardManagers[this.player].reserve.display('overlay',[3,this.page]); break
                    case 15: this.battle.cardManagers[this.player].reserve.display('overlay',[4,this.page]); break
                    case 16: this.battle.cardManagers[this.player].reserve.display('overlay',[5,this.page]); break
                    case 20: this.battle.cardManagers[this.player].reserve.display('overlay',[6,this.page,3]); break
                    case 23: this.battle.cardManagers[this.player].reserve.display('overlay',[7,this.args[1]]); break
                    case 24: this.battle.tierManager.tiers[this.args[1]].display('overlay',[1,this.page]); break

                }
                switch(this.args[0]){
                    case 3: case 17: this.card.fade=1; this.card.anim.afford=1; this.card.display(); break
                }
            break
            case 3:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2,this.layer.height/2,this.options*120+40,200,10)
                if(!this.battle.modded(83)){
                    this.layer.rect(this.layer.width/2,this.layer.height/2+125,120,40,10)
                }
                if(this.battle.relicManager.hasRelic(173,this.player)){
                    this.layer.rect(this.layer.width/2,this.layer.height/2+170,120,40,10)
                }
                if(this.args[0]==0&&this.battle.relicManager.hasRelic(172,this.player)){
                    this.layer.rect(this.layer.width/2+120+this.options*60,this.layer.height/2,160,200,10)
                }
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                switch(this.args[0]){
                    case 0: case 1: this.layer.text('Add a Card',this.layer.width/2,this.layer.height/2-70); break
                }
                if(!this.battle.modded(83)){
                    this.layer.textSize(20)
                    switch(this.args[0]){
                        case 0: case 1: this.layer.text('Skip',this.layer.width/2,this.layer.height/2+125); break
                    }
                    let bonuses=[]
                    if(this.args[0]==0&&this.battle.relicManager.hasRelic(49,this.player)){
                        bonuses.push('2 Max HP')
                    }
                    if(this.args[0]==0&&this.battle.relicManager.hasRelic(101,this.player)){
                        bonuses.push('10 Currency')
                    }
                    this.layer.textSize(8)
                    if(bonuses.length>=2){
                        this.layer.text('Multiple Bonuses',this.layer.width/2,this.layer.height/2+140)
                    }else if(bonuses.length>=1){
                        this.layer.text(bonuses[0],this.layer.width/2,this.layer.height/2+140)
                    }
                }
                if(this.battle.relicManager.hasRelic(173,this.player)){
                    this.layer.textSize(20)
                    this.layer.text('Select All',this.layer.width/2,this.layer.height/2+170)
                }
                for(let a=0,la=this.cards.length;a<la;a++){
                    this.cards[a].fade=1
                    this.cards[a].anim={select:0,afford:1}
                    this.cards[a].display()
                }
            break
            case 4:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2,240,400,10)
                this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-225,120,40,10)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                this.layer.text('Stats',this.layer.width/2+225*this.posKey,this.layer.height/2-175)
                this.layer.textSize(20)
                this.layer.text('Close',this.layer.width/2+225*this.posKey,this.layer.height/2-225)
                this.layer.textSize(10)
                let variantStack=''
                let variantNames=[
                    'mod','junk',
                    'lowDraw','deckbuild',
                    'altDraw','blackjack',
                    'witch','inventor',
                    'chooselose','compress',
                    'unexpected','balance',
                    'lowhealth','midhealth',
                    'shortmap','shortermap',
                    'speedmove','polar',
                    'prism','ultraprism',
                    'vanish','blind',
                    'cursed','terminal',
                ]
                let names=[
                    'Bonus Mods','Junkyard',
                    '-1 Draw','Deckbuild Defends',
                    'Cyclic','Blackjack',
                    'Card Slot','Card Techify',
                    'Choose or Lose','Compression',
                    'Expect the Unexpected','Balanced',
                    '20% HP','50% HP',
                    'Short Map','Shorter Map',
                    'Quick','Polar Mode',
                    'Prism','Ultraprism',
                    'Vanishing','Silent Cards',
                    'Cursed','Terminal',
                ]
                for(let a=0,la=variantNames.length;a<la;a++){
                    if(variants[variantNames[a]]){
                        if(variantStack.length>0){
                            variantStack+=', '
                        }
                        variantStack+=names[a]
                    }
                }
                this.layer.text('Difficulty '+game.ascend,this.layer.width/2+225*this.posKey,this.layer.height/2-150)
                this.layer.text(`Variants: ${variantStack.length>0?variantStack:`None`}`,this.layer.width/2+225*this.posKey,this.layer.height/2-135)
                this.layer.text(this.battle.stats.node[0]+' Nodes Traveled',this.layer.width/2+225*this.posKey,this.layer.height/2-120)
                this.layer.text(this.battle.stats.killed[this.player]+' Enemies Killed',this.layer.width/2+225*this.posKey,this.layer.height/2-30)
                this.layer.text(tennify(this.battle.stats.damage[this.player])+' Damage Dealt',this.layer.width/2+225*this.posKey,this.layer.height/2-15)
                this.layer.text(tennify(this.battle.stats.block[this.player])+' Block Added',this.layer.width/2+225*this.posKey,this.layer.height/2)
                this.layer.text(this.battle.stats.move[this.player]+' Tiles Moved',this.layer.width/2+225*this.posKey,this.layer.height/2+15)
                this.layer.text(this.battle.stats.drawn[this.player]+' Cards Drawn',this.layer.width/2+225*this.posKey,this.layer.height/2+30)
                this.layer.text(this.battle.stats.played[this.player][0]+' Cards Played:',this.layer.width/2+225*this.posKey,this.layer.height/2+45)
                this.layer.text(tennify(this.battle.stats.taken[this.player][0])+' Damage Taken:',this.layer.width/2+225*this.posKey,this.layer.height/2+105)
                this.layer.text(this.battle.stats.earned[this.player]+' Currency Obtained',this.layer.width/2+225*this.posKey,this.layer.height/2+145)
                this.layer.text(this.battle.stats.card[this.player]+' Cards Obtained',this.layer.width/2+225*this.posKey,this.layer.height/2+160)
                this.layer.text(this.battle.stats.relic[this.player]+' Relics Obtained',this.layer.width/2+225*this.posKey,this.layer.height/2+175)
                this.layer.text(this.battle.stats.item[this.player]+' Items Obtained',this.layer.width/2+225*this.posKey,this.layer.height/2+190)
                this.layer.textSize(8)
                this.layer.text(this.battle.stats.node[1]+' Battles',this.layer.width/2+225*this.posKey,this.layer.height/2-105)
                this.layer.text(this.battle.stats.node[2]+' Elites',this.layer.width/2+225*this.posKey,this.layer.height/2-95)
                this.layer.text(this.battle.stats.node[3]+' Bosses',this.layer.width/2+225*this.posKey,this.layer.height/2-85)
                this.layer.text(this.battle.stats.node[4]+' Rest Sites',this.layer.width/2+225*this.posKey,this.layer.height/2-75)
                this.layer.text(this.battle.stats.node[5]+' Shops',this.layer.width/2+225*this.posKey,this.layer.height/2-65)
                this.layer.text(this.battle.stats.node[6]+' Unknowns',this.layer.width/2+225*this.posKey,this.layer.height/2-55)
                this.layer.text(this.battle.stats.node[7]+' Stashes',this.layer.width/2+225*this.posKey,this.layer.height/2-45)
                this.layer.text(this.battle.stats.played[this.player][1]+' Attacks',this.layer.width/2+225*this.posKey,this.layer.height/2+60)
                this.layer.text(this.battle.stats.played[this.player][2]+' Defenses',this.layer.width/2+225*this.posKey,this.layer.height/2+70)
                this.layer.text(this.battle.stats.played[this.player][3]+' Movements',this.layer.width/2+225*this.posKey,this.layer.height/2+80)
                this.layer.text(this.battle.stats.played[this.player][4]+' Powers',this.layer.width/2+225*this.posKey,this.layer.height/2+90)
                this.layer.text(tennify(this.battle.stats.taken[this.player][1])+' Blocked',this.layer.width/2+225*this.posKey,this.layer.height/2+120)
                this.layer.text(tennify(this.battle.stats.taken[this.player][2])+' Unblocked',this.layer.width/2+225*this.posKey,this.layer.height/2+130)
            break
            case 5:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2,this.layer.height/2,370,310,10)
                this.layer.rect(this.layer.width/2-215,this.layer.height/2,40,40,10)
                this.layer.rect(this.layer.width/2+215,this.layer.height/2,40,40,10)
                this.layer.rect(this.layer.width/2,this.layer.height/2+180,120,40,10)
                this.layer.fill(0,this.fade*0.8)
                regTriangle(this.layer,this.layer.width/2-212.5,this.layer.height/2,15,15,30)
                regTriangle(this.layer,this.layer.width/2+212.5,this.layer.height/2,15,15,-30)
                this.layer.textSize(20)
                this.layer.text('Close',this.layer.width/2,this.layer.height/2+180)
                this.battle.relicManager.display('overlay',[this.player,this.page])
            break
            case 6:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2,this.layer.height/2+50,480,540,10)
                this.layer.rect(this.layer.width/2,this.layer.height/2-250,120,40,10)
                this.layer.fill(200,this.fade*0.8)
                this.layer.stroke(0,this.fade*0.8)
                this.layer.strokeWeight(3)
                this.layer.rect(this.layer.width/2,this.layer.height/2-180,440,30,5)
                for(let a=0,la=this.suggestions.length;a<la;a++){
                    this.layer.rect(this.layer.width/2,this.layer.height/2-130+a*60,400,50,5)
                }
                this.layer.textAlign(LEFT,CENTER)
                this.layer.fill(0,this.fade*0.8)
                this.layer.noStroke()
                this.layer.textSize(20)
                this.layer.text(this.text,this.layer.width/2-215,this.layer.height/2-180)
                this.layer.textAlign(CENTER,CENTER)
                this.layer.text('Close',this.layer.width/2,this.layer.height/2-250)
                this.layer.textSize(12)
                for(let a=0,la=this.suggestions.length;a<la;a++){
                    this.layer.text(types.dictionary[this.suggestions[a]].name,this.layer.width/2,this.layer.height/2-145+a*60)
                }
                this.layer.textSize(8)
                for(let a=0,la=this.suggestions.length;a<la;a++){
                    this.layer.text(types.dictionary[this.suggestions[a]].desc,this.layer.width/2,this.layer.height/2-125+a*60)
                }
            break
            case 7:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2,this.layer.height/2,120,30,10)
                this.layer.rect(this.layer.width/2,this.layer.height/2-40,120,40,10)
                this.layer.rect(this.layer.width/2,this.layer.height/2+40,120,40,10)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(20)
                this.layer.text('Heal 10 HP',this.layer.width/2,this.layer.height/2-40)
                this.layer.text('Close',this.layer.width/2,this.layer.height/2+40)
                this.layer.textSize(8)
                this.layer.text('60 Currency',this.layer.width/2,this.layer.height/2-25)
                this.battle.combatantManager.combatants[this.player].displayInfo('food')
            break
            case 8:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2,this.layer.height/2,810,400,10)
                this.layer.rect(this.layer.width/2-85,this.layer.height/2+225,40,40,10)
                this.layer.rect(this.layer.width/2+85,this.layer.height/2+225,40,40,10)
                this.layer.rect(this.layer.width/2,this.layer.height/2+225,120,40,10)
                this.layer.fill(0,this.fade*0.8)
                regTriangle(this.layer,this.layer.width/2-82.5,this.layer.height/2+225,15,15,30)
                regTriangle(this.layer,this.layer.width/2+82.5,this.layer.height/2+225,15,15,-30)
                this.layer.textSize(8)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                switch(this.args[0]){
                    case 0: case 1: this.layer.text('Add a Card',this.layer.width/2,this.layer.height/2-170); break
                }
                this.layer.textSize(20)
                switch(this.args[0]){
                    case 0: case 1: this.layer.text('Skip',this.layer.width/2,this.layer.height/2+225); break
                }
                for(let a=0,la=this.cards.length;a<la;a++){
                    this.cards[a].fade=1
                    this.cards[a].anim={select:0,afford:1}
                    this.cards[a].display()
                }
            break
            case 9:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2,this.layer.height/2-this.battle.players*150+150+this.player*300,400,200,10)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                this.layer.text('Techify a Card',this.layer.width/2,this.layer.height/2-70-this.battle.players*150+150+this.player*300)
                for(let a=0,la=this.cards.length;a<la;a++){
                    this.cards[a].fade=1
                    this.cards[a].anim={select:0,afford:1}
                    this.cards[a].display()
                }
            break
            case 10:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2,this.layer.height/2+100,360,560,10)
                this.layer.rect(this.layer.width/2,this.layer.height/2-205,120,40,10)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                this.layer.text('Mods',this.layer.width/2,this.layer.height/2-150)
                this.layer.textSize(20)
                this.layer.text('Close',this.layer.width/2,this.layer.height/2-205)
                for(let a=0,la=this.battle.modManager.holdMod.length;a<la;a++){
                    this.layer.noStroke()
                    this.layer.fill(120,this.fade)
                    this.layer.rect(this.layer.width/2,this.layer.height/2-105+a*50,340,40,10)
                    this.layer.fill(0,this.fade)
                    this.layer.noStroke()
                    this.layer.textSize(12)
                    this.layer.text(types.mod[this.battle.modManager.holdMod[a]].name,this.layer.width/2,this.layer.height/2-112+a*50)
                    this.layer.textSize(8)
                    this.layer.text(types.mod[this.battle.modManager.holdMod[a]].desc,this.layer.width/2,this.layer.height/2-95+a*50)
                }
            break
            case 11:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2,this.layer.height/2-77.5,360,205,10)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                this.layer.text('Add a Mod',this.layer.width/2,this.layer.height/2-150)
                for(let a=0,la=this.choices.length;a<la;a++){
                    this.layer.noStroke()
                    this.layer.fill(120,this.fade)
                    this.layer.rect(this.layer.width/2,this.layer.height/2-105+a*50,340,40,10)
                    this.layer.fill(0,this.fade)
                    this.layer.noStroke()
                    this.layer.textSize(12)
                    this.layer.text(types.mod[this.choices[a]].name,this.layer.width/2,this.layer.height/2-112+a*50)
                    this.layer.textSize(8)
                    this.layer.text(types.mod[this.choices[a]].desc,this.layer.width/2,this.layer.height/2-95+a*50)
                }
            break
            case 12:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2,this.layer.height/2+100,360,560,10)
                this.layer.rect(this.layer.width/2,this.layer.height/2-205,120,40,10)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                this.layer.text('Select Boss',this.layer.width/2,this.layer.height/2-150)
                this.layer.textSize(20)
                this.layer.text('Close',this.layer.width/2,this.layer.height/2-205)
                for(let a=0,la=this.battle.nodeManager.listing.encounter[this.world][2].length;a<la;a++){
                    this.layer.noStroke()
                    this.layer.fill(120,this.fade)
                    this.layer.rect(this.layer.width/2,this.layer.height/2-105+a*50,340,40,10)
                    this.layer.fill(0,this.fade)
                    this.layer.noStroke()
                    this.layer.textSize(18)
                    this.layer.text(types.encounter[this.battle.nodeManager.listing.encounter[this.world][2][a]].name,this.layer.width/2,this.layer.height/2-105+a*50)
                }
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
                                delete this.rewards[a]
                                this.rewards.splice(a,1)
                                a--
                                la--
                            }
                        }else{
                            if(this.rewards[a].position>a*50){
                                this.rewards[a].position-=10
                            }
                            if(this.rewards[a].type==2){
                                this.rewards[a].relic.update(this.rewards[a].usable,0,inputs,{x:this.layer.width/2+225*this.posKey-40,y:this.layer.height/2-105+this.rewards[a].position})
                            }else if(this.rewards[a].type==3){
                                this.rewards[a].item.update(this.rewards[a].usable,0,inputs,false)
                            }
                        }
                    }
                    if(this.rewards.length<=0&&!this.battle.overlayManager.overlays[3].active&&this.active){
                        this.active=false
                        this.battle.combatantManager.clearBlockCombatants()
                        this.battle.combatantManager.clearStatusCombatants()
                    }
                break
                case 2:
                    switch(this.args[0]){
                        case 0: case 6: case 9: case 18: case 22: case 25:
                            this.page=constrain(this.page,0,ceil(this.battle.cardManagers[this.player].reserve.cards.length/15)-1)
                        break
                        case 1: case 5: case 11: case 19: case 21:
                            this.page=constrain(this.page,0,ceil(this.battle.cardManagers[this.player].discard.cards.length/15)-1)
                        break
                        case 2: case 3: case 4: case 7: case 8: case 10: case 17: case 26: case 27: case 28:
                        case 29:
                            this.page=constrain(this.page,0,ceil(this.battle.cardManagers[this.player].deck.cards.length/15)-1)
                        break
                        case 12:
                            this.page=constrain(this.page,0,ceil(this.battle.cardManagers[this.player].exhaust.cards.length/15)-1)
                        break
                        case 13: case 14: case 15: case 16:
                            this.page=constrain(this.page,0,ceil(this.battle.cardManagers[this.player].reserve.sorted.length/15)-1)
                        break
                        case 20: case 23:
                            this.page=0
                        break
                        case 24:
                            this.page=constrain(this.page,0,ceil(this.battle.tierManager.tiers[this.args[1]].cards.length/15)-1)
                        break
                    }
                    switch(this.args[0]){
                        case 0: case 6: case 9: case 13: case 14: case 15: case 16: case 18: case 20: case 22:
                        case 23: case 25: this.battle.cardManagers[this.player].reserve.update('overlay',[this.page]); break
                        case 1: case 5: case 11: case 19: case 21: this.battle.cardManagers[this.player].discard.update('overlay',[this.page]); break
                        case 2: case 3: case 4: case 7: case 8: case 10: case 17: case 26: case 27: case 28:
                        case 29: this.battle.cardManagers[this.player].deck.update('overlay',[this.page]); break
                        case 12: this.battle.cardManagers[this.player].exhaust.update('overlay',[this.page]); break
                        case 24: this.battle.tierManager.tiers[this.args[1]].update('overlay',[this.page]); break
                    }
                    switch(this.args[0]){
                        case 0: case 6: case 9: case 13: case 14: case 15: case 16: case 18: case 20: case 22:
                        case 23: case 25:
                            for(let a=0,la=this.battle.cardManagers[this.player].reserve.cards.length;a<la;a++){
                                this.battle.cardManagers[this.player].reserve.cards[a].size=constrain(this.battle.cardManagers[this.player].reserve.cards[a].size,0,this.fade)
                            }
                        break
                        case 1: case 5: case 11: case 19: case 21:
                            for(let a=0,la=this.battle.cardManagers[this.player].discard.cards.length;a<la;a++){
                                this.battle.cardManagers[this.player].discard.cards[a].size=constrain(this.battle.cardManagers[this.player].discard.cards[a].size,0,this.fade)
                            }
                        break
                        case 2: case 3: case 4: case 7: case 8: case 10: case 17: case 26: case 27: case 28:
                        case 29:
                            for(let a=0,la=this.battle.cardManagers[this.player].deck.cards.length;a<la;a++){
                                this.battle.cardManagers[this.player].deck.cards[a].size=constrain(this.battle.cardManagers[this.player].deck.cards[a].size,0,this.fade)
                            }
                        break
                        case 12:
                            for(let a=0,la=this.battle.cardManagers[this.player].exhaust.cards.length;a<la;a++){
                                this.battle.cardManagers[this.player].exhaust.cards[a].size=constrain(this.battle.cardManagers[this.player].exhaust.cards[a].size,0,this.fade)
                            }
                        break
                        case 24:
                            for(let a=0,la=this.battle.tierManager.tiers[this.args[1]].cards.length;a<la;a++){
                                this.battle.tierManager.tiers[this.args[1]].cards[a].size=constrain(this.battle.tierManager.tiers[this.args[1]].cards[a].size,0,this.fade)
                            }
                        break
                    }
                    switch(this.args[0]){
                        case 3: case 17: this.card.size=constrain(smoothAnim(this.card.size,this.card.page==this.page,0,this.fade,5),0,this.fade); break
                    }
                break
                case 3: case 9:
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if(this.cards[a].upSize&&this.cards[a].size<1){
                            this.cards[a].size=round(this.cards[a].size*5+1)/5
                        }else if(this.cards[a].deSize&&this.cards[a].size>0){
                            this.cards[a].size=round(this.cards[a].size*5-1)/5
                        }
                    }
                break
                case 5:
                    this.battle.relicManager.update('overlay',[this.active,this.page,this.player])
                break
                case 7:
                    this.battle.combatantManager.combatants[this.player].updatePassive()
                    this.battle.combatantManager.combatants[this.player].updatePassiveAnimLife()
                break
                case 8:
                    this.page=constrain(this.page,0,ceil(this.cards.length/24)-1)
                    for(let a=0,la=this.cards.length;a<la;a++){
                        this.cards[a].upSize=a>=this.page*24&&a<this.page*24+24
                        this.cards[a].deSize=!this.cards[a].upSize
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
                        this.battle.combatantManager.clearBlockCombatants()
                        this.battle.combatantManager.clearStatusCombatants()
                        for(let a=0,la=this.rewards.length;a<la;a++){
                            if(this.rewards[a].type==1){
                                this.battle.relicManager.activate(8,[this.player])
                            }
                        }
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+225*this.posKey,y:this.layer.height/2-250},width:120,height:40})&&this.args[0]==0){
                        this.battle.replay()
                    }
                break
                case 2:
                    if(this.args[0]==24){
                        if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-285,y:this.layer.height/2},width:40,height:40})&&this.page>0){
                            this.page--
                            switch(this.args[0]){
                                case 3: case 17:
                                    this.card=new card(this.layer,this.battle,this.player,-100,-100,0,0,0,0)
                                    this.card.nonCalc=true
                                break
                            }
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+285,y:this.layer.height/2},width:40,height:40})&&this.page<ceil(this.battle.tierManager.tiers[this.args[1]].cards.length/15)-1){
                            this.page++
                            switch(this.args[0]){
                                case 3: case 17:
                                    this.card=new card(this.layer,this.battle,this.player,-100,-100,0,0,0,0)
                                    this.card.nonCalc=true
                                break
                            }
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2+225},width:120,height:40})){
                            this.active=false
                        }
                    }else{
                        if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-285,y:this.layer.height/2},width:40,height:40})&&this.page>0){
                            this.page--
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+285,y:this.layer.height/2},width:40,height:40})&&(
                        this.page<ceil(this.battle.cardManagers[this.player].reserve.cards.length/15)-1&&(this.args[0]==0||this.args[0]==6||this.args[0]==9||this.args[0]==18||this.args[0]==23||this.args[0]==25)||
                        this.page<ceil(this.battle.cardManagers[this.player].discard.cards.length/15)-1&&(this.args[0]==1||this.args[0]==5||this.args[0]==11||this.args[0]==19||this.args[0]==21)||
                        this.page<ceil(this.battle.cardManagers[this.player].deck.cards.length/15)-1&&(this.args[0]==2||this.args[0]==3||this.args[0]==4||this.args[0]==7||this.args[0]==8||this.args[0]==10||this.args[0]==17||this.args[0]==26||this.args[0]==27||this.args[0]==28||this.args[0]==29)||
                        this.page<ceil(this.battle.cardManagers[this.player].exhaust.cards.length/15)-1&&(this.args[0]==12)||
                        this.page<ceil(this.battle.cardManagers[this.player].reserve.sorted.length/15)-1&&(this.args[0]==13||this.args[0]==14||this.args[0]==15||this.args[0]==16))){
                            this.page++
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2+225},width:120,height:40})){
                            this.active=false
                        }
                    }
                    switch(this.args[0]){
                        case 3: case 4: case 7: case 8: case 10: case 17: case 26: case 27: case 28: case 29:
                            for(let a=0,la=this.battle.cardManagers[this.player].deck.cards.length;a<la;a++){
                                if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].deck.cards[a])&&this.battle.cardManagers[this.player].deck.cards[a].size>0.5&&this.battle.cardManagers[this.player].deck.cards[a].select&&
                                !this.battle.cardManagers[this.player].deck.cards[a].spec.includes(37)&&
                                !(this.args[0]==3&&this.battle.cardManagers[this.player].deck.cards[a].level>=1)&&
                                !(this.args[0]==17&&this.battle.cardManagers[this.player].deck.cards[a].level>=2)){
                                    this.battle.cardManagers[this.player].deck.cards[a].select=false
                                    let size=this.battle.cardManagers[this.player].deck.cards[a].size
                                    let complete=true
                                    let breakAfter=false
                                    let rarity=this.battle.cardManagers[this.player].deck.cards[a].rarity
                                    let basic=this.battle.cardManagers[this.player].deck.cards[a].basic
                                    let type=this.battle.cardManagers[this.player].deck.cards[a].type
                                    let cardClass=this.battle.cardManagers[this.player].deck.cards[a].class
                                    switch(this.args[0]){
                                        case 3: case 17:
                                            this.battle.cardManagers[this.player].deck.cards[a]=upgradeCard(this.battle.cardManagers[this.player].deck.cards[a])
                                            this.battle.cardManagers[this.player].deck.cards[a].size=size
                                        break
                                        case 4:
                                            if(this.battle.cardManagers[this.player].deck.remove(a)){
                                                this.battle.relicManager.activate(11,[this.player,cardClass])
                                                a--
                                                la--
                                                this.activated++
                                                complete=this.activated>=this.args[1]
                                                breakAfter=true
                                                if(this.args[2]==1){
                                                    this.battle.eventManagers[this.player].page=basic?3:rarity==2?6:rarity==1?5:4
                                                }else if(this.args[2]==2){
                                                    this.battle.cardManagers[this.player].deck.removeAllType(type)
                                                }
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
                                            if(!this.battle.cardManagers[this.player].deck.cards[a].spec.includes(3)){
                                                this.battle.cardManagers[this.player].deck.cards[a].spec.push(3)
                                                this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.push(3)
                                            }
                                        break
                                        case 26:
                                            if(this.battle.cardManagers[this.player].deck.smoosh(a)){
                                                la--
                                                a--
                                            }else{
                                                complete=false
                                            }
                                        break
                                        case 27:
                                            this.battle.cardManagers[this.player].deck.copy(this.battle.cardManagers[this.player].hand.cards,a,a)
                                        break
                                        case 28:
                                            if(floor(random(0,2))==0){
                                                this.battle.cardManagers[this.player].deck.copySelf(a)
                                            }else if(this.battle.cardManagers[this.player].deck.removeBypass(a)){
                                                this.battle.relicManager.activate(11,[this.player,cardClass])
                                                a--
                                                la--
                                                this.activated++
                                                breakAfter=true
                                                if(this.args[2]==1){
                                                    this.battle.eventManagers[this.player].page=basic?3:rarity==2?6:rarity==1?5:4
                                                }else if(this.args[2]==2){
                                                    this.battle.cardManagers[this.player].deck.removeAllType(type)
                                                }
                                            }else{
                                                complete=false
                                            }
                                        break
                                        case 29:
                                            this.battle.cardManagers[this.player].deck.cards[a].edition=floor(random(1,7))
                                        break
                                    }
                                    this.active=!complete
                                    if(breakAfter){
                                        break
                                    }
                                    this.battle.cardManagers[this.player].deck.cards[a].size=size
                                }
                                this.battle.cardManagers[this.player].deck.cards[a].select=false
                                if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].deck.cards[a])&&this.battle.cardManagers[this.player].deck.cards[a].size>0.5&&!this.battle.cardManagers[this.player].deck.cards[a].spec.includes(37)){
                                    this.battle.cardManagers[this.player].deck.cards[a].select=true
                                    switch(this.args[0]){
                                        case 3: case 17:
                                            if(!(this.args[0]==3&&this.battle.cardManagers[this.player].deck.cards[a].level>=1)){
                                                this.card=upgradeCard(this.battle.cardManagers[this.player].deck.cards[a])
                                                this.card.nonCalc=true
                                                this.card.page=this.page
                                                this.card.size=1
                                            }else{
                                                this.card=new card(this.layer,this.battle,this.player,-100,-100,0,0,0,0)
                                            }
                                        break
                                    }
                                }
                            }
                        break
                        case 5: case 11: case 19: case 21:
                            for(let a=0,la=this.battle.cardManagers[this.player].discard.cards.length;a<la;a++){
                                if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].discard.cards[a])&&this.battle.cardManagers[this.player].discard.cards[a].size>0.5&&this.battle.cardManagers[this.player].discard.cards[a].select&&
                                !this.battle.cardManagers[this.player].discard.cards[a].spec.includes(37)){
                                    this.battle.cardManagers[this.player].discard.cards[a].select=false
                                    switch(this.args[0]){
                                        case 5:
                                            if(this.endAfter){
                                                this.endAfter=false
                                                this.battle.endTurn()
                                            }
                                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                        case 11:
                                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,4)
                                            a--
                                            la--
                                        break
                                        case 19:
                                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1,11)
                                            a--
                                            la--
                                        break
                                        case 21:
                                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.block*this.battle.cardManagers[this.player].discard.cards[a].cost)
                                            if(this.endAfter){
                                                this.endAfter=false
                                                this.battle.endTurn()
                                            }
                                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                    }
                                    this.active=false
                                }
                                if(a>=0){
                                    this.battle.cardManagers[this.player].discard.cards[a].select=false
                                    if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].discard.cards[a])&&this.battle.cardManagers[this.player].discard.cards[a].size>0.5&&!this.battle.cardManagers[this.player].discard.cards[a].spec.includes(37)){
                                        this.battle.cardManagers[this.player].discard.cards[a].select=true
                                    }
                                }
                            }
                        break
                        case 6: case 13: case 14: case 15: case 16: case 18: case 22: case 25:
                            for(let a=0,la=this.battle.cardManagers[this.player].reserve.cards.length;a<la;a++){
                                if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].reserve.cards[a])&&this.battle.cardManagers[this.player].reserve.cards[a].size>0.5&&this.battle.cardManagers[this.player].reserve.cards[a].select&&
                                !this.battle.cardManagers[this.player].reserve.cards[a].spec.includes(37)){
                                    this.battle.cardManagers[this.player].reserve.cards[a].select=false
                                    switch(this.args[0]){
                                        case 6: case 13: case 14: case 15: case 16:
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                        case 18:
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,10)
                                            a--
                                            la--
                                        break
                                        case 22:
                                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.block*this.battle.cardManagers[this.player].reserve.cards[a].cost)
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                        case 25:
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                            if(this.battle.cardManagers[this.player].hand.cards.length>0){
                                                this.battle.cardManagers[this.player].hand.cards[this.battle.cardManagers[this.player].hand.cards.length-1].spec.push(31)
                                                this.battle.cardManagers[this.player].hand.cards[this.battle.cardManagers[this.player].hand.cards.length-1].additionalSpec.push(31)
                                            }
                                        break
                                    }
                                    this.active=false
                                }
                                if(a>=0){
                                    this.battle.cardManagers[this.player].reserve.cards[a].select=false
                                    if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].reserve.cards[a])&&this.battle.cardManagers[this.player].reserve.cards[a].size>0.5&&!this.battle.cardManagers[this.player].reserve.cards[a].spec.includes(37)){
                                        this.battle.cardManagers[this.player].reserve.cards[a].select=true
                                    }
                                }
                            }
                        break
                        case 12:
                            for(let a=0,la=this.battle.cardManagers[this.player].exhaust.cards.length;a<la;a++){
                                if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].exhaust.cards[a])&&this.battle.cardManagers[this.player].exhaust.cards[a].size>0.5&&this.battle.cardManagers[this.player].exhaust.cards[a].select&&
                                !this.battle.cardManagers[this.player].exhaust.cards[a].spec.includes(37)){
                                    this.battle.cardManagers[this.player].exhaust.cards[a].select=false
                                    switch(this.args[0]){
                                        case 12:
                                            this.battle.cardManagers[this.player].exhaust.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                    }
                                    this.active=false
                                }
                                if(a>=0){
                                    this.battle.cardManagers[this.player].exhaust.cards[a].select=false
                                    if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].exhaust.cards[a])&&this.battle.cardManagers[this.player].exhaust.cards[a].size>0.5&&!this.battle.cardManagers[this.player].exhaust.cards[a].spec.includes(37)){
                                        this.battle.cardManagers[this.player].exhaust.cards[a].select=true
                                    }
                                }
                            }
                        break
                        case 20:
                            for(let a=0,la=min(3,this.battle.cardManagers[this.player].reserve.cards.length);a<la;a++){
                                if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].reserve.cards[a])&&this.battle.cardManagers[this.player].reserve.cards[a].size>0.5&&this.battle.cardManagers[this.player].reserve.cards[a].select){
                                    this.battle.cardManagers[this.player].reserve.cards[a].select=false
                                    switch(this.args[0]){
                                        case 20:
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,4)
                                            a--
                                            la--
                                        break
                                        
                                    }
                                    this.active=false
                                }
                                if(a>=0){
                                    this.battle.cardManagers[this.player].reserve.cards[a].select=false
                                    if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].reserve.cards[a])&&this.battle.cardManagers[this.player].reserve.cards[a].size>0.5&&!this.battle.cardManagers[this.player].reserve.cards[a].spec.includes(37)){
                                        this.battle.cardManagers[this.player].reserve.cards[a].select=true
                                    }
                                }
                            }
                        break
                        case 24:
                            for(let a=0,la=this.battle.tierManager.tiers[this.args[1]].cards.length;a<la;a++){
                                if(pointInsideBox({position:inputs.rel},this.battle.tierManager.tiers[this.args[1]].cards[a])&&this.battle.tierManager.tiers[this.args[1]].cards[a].size>0.5){
                                    switch(this.args[0]){
                                        case 24:
                                            this.battle.tierManager.tiers[this.args[1]].send(this.battle.tierManager.unranked.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                    }
                                    this.active=false
                                }
                            }
                        break
                    }
                break
                case 3:
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if((pointInsideBox({position:inputs.rel},this.cards[a])||this.battle.relicManager.hasRelic(173,this.player)&&pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2+170},width:120,height:40}))&&!this.cards[a].deSize){
                            switch(this.args[0]){
                                case 0:
                                    if(this.setupArgs[2]==2||this.setupArgs[2]==4){
                                        this.battle.cardManagers[this.player].deck.addFree(this.cards[a].type,this.cards[a].level,this.cards[a].color,1,this.cards[a].edition)
                                    }else{
                                        this.battle.cardManagers[this.player].deck.add(this.cards[a].type,this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                    }
                                break
                                case 1:
                                    if(this.setupArgs[2]==2||this.setupArgs[2]==4){
                                        this.battle.cardManagers[this.player].hand.addFree(this.cards[a].type,this.cards[a].level,this.cards[a].color,1,this.cards[a].edition)
                                    }else{
                                        this.battle.cardManagers[this.player].hand.add(this.cards[a].type,this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                    }
                                break
                            }
                            this.cards[a].deSize=true
                            this.cards[a].upSize=false
                            this.taken++
                            if(this.taken>=this.takable&&!(this.battle.relicManager.hasRelic(173,this.player)&&pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2+170},width:120,height:40})&&a!=la-1)){
                                this.active=false
                                for(let b=0,lb=this.cards.length;b<lb;b++){
                                    this.cards[b].deSize=true
                                    this.cards[b].upSize=false
                                }
                            }
                        }
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2+125},width:120,height:40})&&!this.battle.modded(83)){
                        this.active=false
                        if(this.args[0]==0){
                            this.battle.relicManager.activate(8,[this.player])
                        }
                    }
                break
                case 4:
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+225*this.posKey,y:this.layer.height/2-225},width:120,height:40})){
                        this.active=false
                    }
                break
                case 5:
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-215,y:this.layer.height/2},width:40,height:40})&&this.page>0){
                        this.page--
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+215,y:this.layer.height/2},width:40,height:40})&&
                    this.page<ceil(this.battle.relicManager.total[this.player]/30)-1){
                        this.page++
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2+180},width:120,height:40})){
                        this.active=false
                    }
                    this.battle.relicManager.onClick('overlay',[this.player,this.page])
                break
                case 6:
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2-250},width:120,height:40})){
                        this.active=false
                    }
                break
                case 7:
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2-40},width:120,height:40})&&this.battle.currency.money[this.player]>=60){
                        this.battle.currency.money[this.player]-=60
                        this.battle.combatantManager.combatants[this.player].heal(10)
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2+40},width:120,height:40})){
                        this.active=false
                    }
                break
                case 8:
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-85,y:this.layer.height/2+225},width:40,height:40})&&this.page>0){
                        this.page--
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+85,y:this.layer.height/2+225},width:40,height:40})&&this.page<ceil(this.cards.length/24)-1){
                        this.page++
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2+225},width:120,height:40})){
                        this.active=false
                    }
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},this.cards[a])&&!this.cards[a].deSize){
                            switch(this.args[0]){
                                case 0:
                                    this.battle.cardManagers[this.player].deck.add(this.cards[a].type,this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                break
                                case 1:
                                    this.battle.cardManagers[this.player].hand.add(this.cards[a].type,this.cards[a].level,this.cards[a].color,this.cards[a].edition)
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
                case 9:
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},this.cards[a])&&!this.cards[a].deSize){
                            this.battle.cardManagers[this.player].tech.cards=[]
                            this.battle.cardManagers[this.player].deck.send(this.battle.cardManagers[this.player].tech.cards,this.choices[a],this.choices[a]+1)
                            this.active=false
                            for(let b=0,lb=this.cards.length;b<lb;b++){
                                this.cards[b].deSize=true
                                this.cards[b].upSize=false
                            }
                        }
                    }
                break
                case 10:
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2-205},width:120,height:40})){
                        this.active=false
                    }
                break
                case 11:
                    for(let a=0,la=this.choices.length;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2-105+a*50},width:340,height:40})){
                            this.active=false
                            this.battle.modManager.addMod(this.choices[a])
                        }
                    }
                break
                case 12:
                    for(let a=0,la=this.battle.nodeManager.listing.encounter[this.world][2].length;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2-105+a*50},width:340,height:40})){
                            this.active=false
                            this.battle.nodeManager.saveBoss=a
                        }
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
                        this.battle.combatantManager.clearBlockCombatants()
                        this.battle.combatantManager.clearStatusCombatants()
                        for(let a=0,la=this.rewards.length;a<la;a++){
                            if(this.rewards[a].type==1){
                                this.battle.relicManager.activate(8,[this.player])
                            }
                        }
                    }
                    if((key=='r'||key=='R')&&this.args[0]==0){
                        this.battle.replay()
                    }
                break
                case 2:
                    if(this.args[0]==24){
                        if(code==LEFT_ARROW&&this.page>0){
                            this.page--
                            switch(this.args[0]){
                                case 3: case 17:
                                    this.card=new card(this.layer,this.battle,this.player,-100,-100,0,0,0,0)
                                    this.card.nonCalc=true
                                break
                            }
                        }else if(code==RIGHT_ARROW&&this.page<ceil(this.battle.tierManager.tiers[this.args[1]].cards.length/15)-1){
                            this.page++
                            switch(this.args[0]){
                                case 3: case 17:
                                    this.card=new card(this.layer,this.battle,this.player,-100,-100,0,0,0,0)
                                    this.card.nonCalc=true
                                break
                            }
                        }else if(code==ENTER){
                            this.active=false
                        }
                    }else{
                        if(code==LEFT_ARROW&&this.page>0){
                            this.page--
                        }else if(code==RIGHT_ARROW&&(
                        this.page<ceil(this.battle.cardManagers[this.player].reserve.cards.length/15)-1&&(this.args[0]==0||this.args[0]==6||this.args[0]==9||this.args[0]==18||this.args[0]==22||this.args[0]==25)||
                        this.page<ceil(this.battle.cardManagers[this.player].discard.cards.length/15)-1&&(this.args[0]==1||this.args[0]==5||this.args[0]==11||this.args[0]==19||this.args[0]==21)||
                        this.page<ceil(this.battle.cardManagers[this.player].deck.cards.length/15)-1&&(this.args[0]==2||this.args[0]==3||this.args[0]==4||this.args[0]==7||this.args[0]==8||this.args[0]==10||this.args[0]==17||this.args[0]==26||this.args[0]==27||this.args[0]==28||this.args[0]==29)||
                        this.page<ceil(this.battle.cardManagers[this.player].exhaust.cards.length/15)-1&&(this.args[0]==12)||
                        this.page<ceil(this.battle.cardManagers[this.player].reserve.sorted.length/15)-1&&(this.args[0]==13||this.args[0]==14||this.args[0]==15||this.args[0]==16))){
                            this.page++
                        }else if(code==ENTER){
                            this.active=false
                        }
                    }
                    switch(this.args[0]){
                        case 3: case 4: case 7: case 8: case 10: case 17: case 26: case 27: case 28: case 29:
                            for(let a=0,la=this.battle.cardManagers[this.player].deck.cards.length;a<la;a++){
                                if(key==inputs.hexadec[a%15]&&this.battle.cardManagers[this.player].deck.cards[a].size>0.5&&this.battle.cardManagers[this.player].deck.cards[a].select&&
                                !this.battle.cardManagers[this.player].deck.cards[a].spec.includes(37)&&
                                !(this.args[0]==3&&this.battle.cardManagers[this.player].deck.cards[a].level>=1)&&
                                !(this.args[0]==17&&this.battle.cardManagers[this.player].deck.cards[a].level>=2)){
                                    this.battle.cardManagers[this.player].deck.cards[a].select=false
                                    let size=this.battle.cardManagers[this.player].deck.cards[a].size
                                    let complete=true
                                    let breakAfter=false
                                    let rarity=this.battle.cardManagers[this.player].deck.cards[a].rarity
                                    let basic=this.battle.cardManagers[this.player].deck.cards[a].basic
                                    let type=this.battle.cardManagers[this.player].deck.cards[a].type
                                    let cardClass=this.battle.cardManagers[this.player].deck.cards[a].class
                                    switch(this.args[0]){
                                        case 3: case 17:
                                            this.battle.cardManagers[this.player].deck.cards[a]=upgradeCard(this.battle.cardManagers[this.player].deck.cards[a])
                                        break
                                        case 4:
                                            if(this.battle.cardManagers[this.player].deck.remove(a)){
                                                this.battle.relicManager.activate(11,[this.player,cardClass])
                                                a--
                                                la--
                                                this.activated++
                                                complete=this.activated>=this.args[1]
                                                breakAfter=true
                                                if(this.args[2]==1){
                                                    this.battle.eventManagers[this.player].page=basic?3:rarity==2?6:rarity==1?5:4
                                                }else if(this.args[2]==2){
                                                    this.battle.cardManagers[this.player].deck.removeAllType(type)
                                                }
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
                                            if(!this.battle.cardManagers[this.player].deck.cards[a].spec.includes(3)){
                                                this.battle.cardManagers[this.player].deck.cards[a].spec.push(3)
                                                this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.push(3)
                                            }
                                        break
                                        case 26:
                                            if(this.battle.cardManagers[this.player].deck.smoosh(a)){
                                                la--
                                                a--
                                            }else{
                                                complete=false
                                            }
                                        break
                                        case 27:
                                            this.battle.cardManagers[this.player].deck.copy(this.battle.cardManagers[this.player].hand.cards,a,a)
                                        break
                                        case 28:
                                            if(floor(random(0,2))==0){
                                                this.battle.cardManagers[this.player].deck.copySelf(a)
                                            }else if(this.battle.cardManagers[this.player].deck.removeBypass(a)){
                                                this.battle.relicManager.activate(11,[this.player,cardClass])
                                                a--
                                                la--
                                                this.activated++
                                                breakAfter=true
                                                if(this.args[2]==1){
                                                    this.battle.eventManagers[this.player].page=basic?3:rarity==2?6:rarity==1?5:4
                                                }else if(this.args[2]==2){
                                                    this.battle.cardManagers[this.player].deck.removeAllType(type)
                                                }
                                            }else{
                                                complete=false
                                            }
                                        break
                                        case 29:
                                            this.battle.cardManagers[this.player].deck.cards[a].edition=floor(random(1,7))
                                        break

                                    }
                                    this.active=!complete
                                    if(breakAfter){
                                        break
                                    }
                                    this.battle.cardManagers[this.player].deck.cards[a].size=size
                                }
                                this.battle.cardManagers[this.player].deck.cards[a].select=false
                                if(key==inputs.hexadec[a%15]&&this.battle.cardManagers[this.player].deck.cards[a].size>0.5&&!this.battle.cardManagers[this.player].deck.cards[a].spec.includes(37)){
                                    this.battle.cardManagers[this.player].deck.cards[a].select=true
                                    switch(this.args[0]){
                                        case 3: case 17:
                                            if(!(this.args[0]==3&&this.battle.cardManagers[this.player].deck.cards[a].level>=1)){
                                                this.card=upgradeCard(this.battle.cardManagers[this.player].deck.cards[a])
                                                this.card.nonCalc=true
                                                this.card.page=this.page
                                                this.card.size=1
                                            }else{
                                                this.card=new card(this.layer,this.battle,this.player,-100,-100,0,0,0,0)
                                            }
                                        break
                                    }
                                }
                            }
                        break
                        case 5: case 11: case 19: case 21:
                            for(let a=0,la=this.battle.cardManagers[this.player].discard.cards.length;a<la;a++){
                                if(key==inputs.hexadec[a%15]&&this.battle.cardManagers[this.player].discard.cards[a].size>0.5&&this.battle.cardManagers[this.player].discard.cards[a].select&&
                                    !this.battle.cardManagers[this.player].discard.cards[a].spec.includes(37)){
                                    this.battle.cardManagers[this.player].discard.cards[a].select=false
                                    switch(this.args[0]){
                                        case 5:
                                            if(this.endAfter){
                                                this.endAfter=false
                                                this.battle.endTurn()
                                            }
                                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                        case 11:
                                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,4)
                                            a--
                                            la--
                                        break
                                        case 19:
                                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1,11)
                                            a--
                                            la--
                                        break
                                        case 21:
                                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.block*this.battle.cardManagers[this.player].discard.cards[a].cost)
                                            if(this.endAfter){
                                                this.endAfter=false
                                                this.battle.endTurn()
                                            }
                                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                    }
                                    this.active=false
                                }
                                if(a>=0){
                                    this.battle.cardManagers[this.player].discard.cards[a].select=false
                                    if(key==inputs.hexadec[a%15]&&this.battle.cardManagers[this.player].discard.cards[a].size>0.5&&!this.battle.cardManagers[this.player].discard.cards[a].spec.includes(37)){
                                        this.battle.cardManagers[this.player].discard.cards[a].select=true
                                    }
                                }
                            }
                        break
                        case 6: case 13: case 14: case 15: case 16: case 18: case 22: case 25:
                            for(let a=0,la=this.battle.cardManagers[this.player].reserve.cards.length;a<la;a++){
                                if((
                                    key==inputs.hexadec[a%15]&&!(this.args[0]>=13&&this.args[0]<=17)||
                                    key==inputs.hexadec[this.battle.cardManagers[this.player].reserve.cards[a].relIndex%15]&&this.args[0]>=13&&this.args[0]<=17
                                    )&&this.battle.cardManagers[this.player].reserve.cards[a].size>0.5&&this.battle.cardManagers[this.player].reserve.cards[a].select&&
                                    !this.battle.cardManagers[this.player].reserve.cards[a].spec.includes(37)){
                                    this.battle.cardManagers[this.player].reserve.cards[a].select=false
                                    switch(this.args[0]){
                                        case 6: case 13: case 14: case 15: case 16:
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                        case 18:
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,10)
                                            a--
                                            la--
                                        break
                                        case 22:
                                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.block*this.battle.cardManagers[this.player].reserve.cards[a].cost)
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                        case 25:
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                            if(this.battle.cardManagers[this.player].hand.cards.length>0){
                                                this.battle.cardManagers[this.player].hand.cards[this.battle.cardManagers[this.player].hand.cards.length-1].spec.push(31)
                                                this.battle.cardManagers[this.player].hand.cards[this.battle.cardManagers[this.player].hand.cards.length-1].additionalSpec.push(31)
                                            }
                                        break
                                    }
                                    this.active=false
                                }
                                if(a>=0){
                                    this.battle.cardManagers[this.player].reserve.cards[a].select=false
                                    if((
                                        key==inputs.hexadec[a%15]&&!(this.args[0]>=13&&this.args[0]<=17)||
                                        key==inputs.hexadec[this.battle.cardManagers[this.player].reserve.cards[a].relIndex%15]&&this.args[0]>=13&&this.args[0]<=17
                                        )&&this.battle.cardManagers[this.player].reserve.cards[a].size>0.5&&!this.battle.cardManagers[this.player].reserve.cards[a].spec.includes(37)){
                                        this.battle.cardManagers[this.player].reserve.cards[a].select=true
                                    }
                                }
                            }
                        break
                        case 12:
                            for(let a=0,la=this.battle.cardManagers[this.player].exhaust.cards.length;a<la;a++){
                                if(key==inputs.hexadec[a%15]&&this.battle.cardManagers[this.player].exhaust.cards[a].size>0.5&&this.battle.cardManagers[this.player].exhaust.cards[a].select&&
                                    !this.battle.cardManagers[this.player].exhaust.cards[a].spec.includes(37)){
                                    this.battle.cardManagers[this.player].exhaust.cards[a].select=false
                                    switch(this.args[0]){
                                        case 12:
                                            this.battle.cardManagers[this.player].exhaust.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                    }
                                    this.active=false
                                }
                                if(a>=0){
                                    this.battle.cardManagers[this.player].exhaust.cards[a].select=false
                                    if(key==inputs.hexadec[a%15]&&this.battle.cardManagers[this.player].exhaust.cards[a].size>0.5&&!this.battle.cardManagers[this.player].exhaust.cards[a].spec.includes(37)){
                                        this.battle.cardManagers[this.player].exhaust.cards[a].select=true
                                    }
                                }
                            }
                        break
                        case 20:
                            for(let a=0,la=min(3,this.battle.cardManagers[this.player].reserve.cards.length);a<la;a++){
                                if(key==inputs.hexadec[a%15]&&this.battle.cardManagers[this.player].reserve.cards[a].size>0.5&&this.battle.cardManagers[this.player].reserve.cards[a].select&&
                                    !this.battle.cardManagers[this.player].reserve.cards[a].spec.includes(37)){
                                    this.battle.cardManagers[this.player].reserve.cards[a].select=false
                                    switch(this.args[0]){
                                        case 20:
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,4)
                                            a--
                                            la--
                                        break
                                    }
                                    this.active=false
                                }
                                if(a>=0){
                                    this.battle.cardManagers[this.player].reserve.cards[a].select=false
                                    if(key==inputs.hexadec[a%15]&&this.battle.cardManagers[this.player].reserve.cards[a].size>0.5&&!this.battle.cardManagers[this.player].reserve.cards[a].spec.includes(37)){
                                        this.battle.cardManagers[this.player].reserve.cards[a].select=true
                                    }
                                }
                            }
                        break
                        case 24:
                            for(let a=0,la=this.battle.tierManager.tiers[this.args[1]].cards.length;a<la;a++){
                                if(key==inputs.hexadec[a%15]&&this.battle.tierManager.tiers[this.args[1]].cards[a].size>0.5){
                                    switch(this.args[0]){
                                        case 24:
                                            this.battle.tierManager.tiers[this.args[1]].send(this.battle.tierManager.unranked.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                    }
                                    this.active=false
                                }
                            }
                        break
                    }
                break
                case 3:
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if(((int(key)+9)%10==a||this.battle.relicManager.hasRelic(173,this.player)&&(key=='t'||key=='T'))&&!this.cards[a].deSize){
                            switch(this.args[0]){
                                case 0:
                                    if(this.setupArgs[2]==2||this.setupArgs[2]==4){
                                        this.battle.cardManagers[this.player].deck.addFree(this.cards[a].type,this.cards[a].level,this.cards[a].color,1,this.cards[a].edition)
                                    }else{
                                        this.battle.cardManagers[this.player].deck.add(this.cards[a].type,this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                    }
                                break
                                case 1:
                                    if(this.setupArgs[2]==2||this.setupArgs[2]==4){
                                        this.battle.cardManagers[this.player].hand.addFree(this.cards[a].type,this.cards[a].level,this.cards[a].color,1,this.cards[a].edition)
                                    }else{
                                        this.battle.cardManagers[this.player].hand.add(this.cards[a].type,this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                    }
                                break
                            }
                            this.cards[a].deSize=true
                            this.cards[a].upSize=false
                            this.taken++
                            if(this.taken>=this.takable&&!(this.battle.relicManager.hasRelic(173,this.player)&&(key=='t'||key=='T')&&a!=la-1)){
                                this.active=false
                                for(let b=0,lb=this.cards.length;b<lb;b++){
                                    this.cards[b].deSize=true
                                    this.cards[b].upSize=false
                                }
                            }
                        }
                    }
                    if(code==ENTER&&!this.battle.modded(83)){
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
                case 5:
                    if(code==LEFT_ARROW&&this.page>0){
                        this.page--
                    }else if(code==RIGHT_ARROW&&
                        this.page<ceil(this.battle.relicManager.total[this.player]/30)-1){
                        this.page++
                    }else if(code==ENTER){
                        this.active=false
                    }
                break
                case 6:
                    if(this.possible.includes(key)&&this.text.length<40){
                        this.text+=key
                        this.suggestions=[]
                        for(let a=0,la=types.dictionary.length;a<la;a++){
                            if(types.dictionary[a].name.substr(0,this.text.length).toUpperCase()==this.text.toUpperCase()){
                                this.suggestions.push(a)
                            }
                        }
                    }else if(code==BACKSPACE&&this.text.length>0){
                        this.text=this.text.substring(0,this.text.length-1)
                        this.suggestions=[]
                        if(this.text.length>0){
                            for(let a=0,la=types.dictionary.length;a<la;a++){
                                if(types.dictionary[a].name.substr(0,this.text.length).toUpperCase()==this.text.toUpperCase()){
                                    this.suggestions.push(a)
                                }
                            }
                        }
                    }else if(code==ENTER){
                        this.active=false
                    }
                break
                case 7:
                    if(key==UP_ARROW&&this.battle.currency.money[this.player]>=60){
                        this.battle.currency.money[this.player]-=60
                        this.battle.combatantManager.combatants[this.player].heal(10)
                    }else if(code==ENTER){
                        this.active=false
                    }
                break
                case 8:
                    if(code==LEFT_ARROW&&this.page>0){
                        this.page--
                    }else if(code==RIGHT_ARROW&&this.page<ceil(this.cards.length/24)-1){
                        this.page++
                    }else if(code==ENTER){
                        this.active=false
                    }
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if((int(key)+9)%10==a&&!this.cards[a].deSize){
                            switch(this.args[0]){
                                case 0:
                                    this.battle.cardManagers[this.player].deck.addFree(this.cards[a].type,this.cards[a].level,this.cards[a].color,1,this.cards[a].edition)
                                    this.battle.cardManagers[this.player].deck.add(this.cards[a].type,this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                break
                                case 1:
                                    this.battle.cardManagers[this.player].hand.addFree(this.cards[a].type,this.cards[a].level,this.cards[a].color,1,this.cards[a].edition)
                                    this.battle.cardManagers[this.player].hand.add(this.cards[a].type,this.cards[a].level,this.cards[a].color,this.cards[a].edition)
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
                case 9:
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if((int(key)+9)%10==a&&!this.cards[a].deSize){
                            this.battle.cardManagers[this.player].tech.cards=[]
                            this.battle.cardManagers[this.player].deck.send(this.battle.cardManagers[this.player].tech.cards,this.choices[a],this.choices[a]+1)
                            this.active=false
                            for(let b=0,lb=this.cards.length;b<lb;b++){
                                this.cards[b].deSize=true
                                this.cards[b].upSize=false
                            }
                        }
                    }
                break
                case 10:
                    if(code==ENTER){
                        this.active=false
                    }
                break
                case 11:
                    for(let a=0,la=this.choices.length;a<la;a++){
                        if(int(key)==a+1){
                            this.active=false
                            this.battle.modManager.addMod(this.choices[a])
                        }
                    }
                break
                case 12:
                    for(let a=0,la=this.battle.nodeManager.listing.encounter[this.world][2].length;a<la;a++){
                        if(int(key)==a+1){
                            this.active=false
                            this.battle.nodeManager.saveBoss=a
                        }
                    }
                break
            }
        }
    }
}