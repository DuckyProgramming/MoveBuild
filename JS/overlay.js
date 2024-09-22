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
        this.activeTimer=0
        this.index=0
        switch(this.type){
            case 1:
                this.rewards=[]
            break
            case 2:
                this.page=0
                switch(this.args[0]){
                    case 3: case 17: case 43: case 75: case 77: case 91:
                        this.card=new card(this.layer,this.battle,this.player,-100,-100,0,0,variants.mtg?[]:0,0)
                        this.card.nonCalc=true
                    break
                }
            break
            case 3:
                this.cards=[]
                this.takable=1
                this.options=variants.unary?1:3
                this.additionalOptions=0
                this.prune=false
            break
            case 5:
                this.page=0
                this.battle.relicManager.relics.forEach(relic=>relic.fade=0)
            break
            case 6:
                this.text=''
                this.possible=` ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz12345678990+=-_<>,./?;':"[]{}`
                this.suggestions=[]
            break
            case 8:
                this.page=0
                this.cards=[]
                this.marks=[]
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
            case 13:
                this.text=''
                this.possible='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
            break
            case 14:
                this.id=0
                this.combatant=0
            break
            case 15:
                this.encounters=[]
                this.class=0
            break
            case 16:
                this.colors=[]
            break
            case 17:
                this.card=0
                this.cards=[]
            break
            case 20:
                this.card=new card(this.layer,this.battle,this.player,-100,-100,0,0,variants.mtg?[]:0,0)
            break
            case 22:
                this.page=0
                this.battle.relicManager.allRelics.forEach(relic=>relic.fade=0)
            break
        }
    }
    getPosKey(){
        this.posKey=1-this.battle.players+this.player*2
    }
    rollEdition(roll){
        return this.battle.relicManager.hasRelic(213,this.player)?0:roll==0?6:roll==1?5:roll==2?4:roll>=3&&roll<=5?3:roll>=6&&roll<=8?2:roll>=9&&roll<=11?1:this.battle.relicManager.hasRelic(322,this.player)&&roll>=12&&roll<=11+this.battle.relicManager.active[322][this.player+1]*12?8:0
    }
    activate(args){
        if(!arrayIncludes(this.battle.overlayManager.priority,[this.index,this.player])){
            this.battle.overlayManager.priority.splice(0,0,[this.index,this.player])
        }
        let list=[]
        switch(this.type){
            case 1:
                if(args[0]==0){
                    this.rewards=[]
                }
                for(let a=0,la=args[1].length;a<la;a++){
                    this.rewards.push({type:args[1][a].type,value:args[1][a].value,fade:0,position:this.rewards.length*50,usable:true})
                    if(args[1][a].key!=undefined){
                        switch(this.rewards[this.rewards.length-1].type){
                            case 2:
                                this.rewards[this.rewards.length-1].relic=new relic(this.layer,this.battle,0,0,0,args[1][a].key,0.8)
                            break
                            case 3:
                                this.rewards[this.rewards.length-1].item=new item(this.layer,this.battle,0,0,0,0,0,args[1][a].key,0.8)
                            break
                        }
                    }else{
                        switch(this.rewards[this.rewards.length-1].type){
                            case 2:
                                let list=this.battle.relicManager.listing.relic[[0,0,0,1,1,2][floor(random(0,6))]]
                                let index=floor(random(0,list.length))
                                this.rewards[this.rewards.length-1].relic=new relic(this.layer,this.battle,0,0,0,list[index],0.8)
                                list.splice(index,1)
                            break
                            case 3:
                                this.rewards[this.rewards.length-1].item=new item(this.layer,this.battle,0,0,0,0,0,this.battle.itemManager.makeRandom(),0.8)
                            break
                        }
                    }
                }
            break
            case 2:
                switch(this.args[0]){
                    case 0: case 6: case 9: case 13: case 14: case 15: case 16: case 18: case 20: case 22:
                    case 23: case 25: case 30: case 41: case 44: case 45: case 47: case 48: case 49: case 58:
                    case 59: case 60: case 62: case 63: case 73: case 74: case 80: case 84: case 85: case 94:
                    case 95: case 96:
                        this.battle.cardManagers[this.player].reserve.resetAnim()
                    break
                    case 1: case 5: case 11: case 19: case 21: case 31: case 34: case 39: case 40: case 42:
                    case 46: case 52: case 77: case 79:
                        this.battle.cardManagers[this.player].discard.resetAnim()
                    break
                    case 2: case 3: case 4: case 7: case 8: case 10: case 17: case 26: case 27: case 28:
                    case 29: case 32: case 33: case 35: case 36: case 37: case 38: case 43: case 50: case 51:
                    case 53: case 54: case 55: case 56: case 57: case 61: case 64: case 65: case 66: case 67:
                    case 68: case 69: case 70: case 72: case 75: case 76: case 78: case 81: case 82: case 83:
                    case 86: case 87: case 89: case 90: case 91: case 92: case 93:
                        this.battle.cardManagers[this.player].deck.resetAnim()
                    break
                    case 12: case 97:
                        this.battle.cardManagers[this.player].exhaust.resetAnim()
                    break
                    case 71: case 88:
                        this.battle.cardManagers[this.player].remove.resetAnim()
                    break
                    case 24:
                        this.battle.tierManager.tiers[this.args[1]].resetAnim()
                    break
                }
                switch(this.args[0]){
                    case 3: case 17: case 77: case 91:
                        this.card=new card(this.layer,this.battle,this.player,-100,-100,0,0,0,0)
                        this.card.nonCalc=true
                        this.activated=0
                    break
                    case 4: case 5: case 6: case 7: case 66: case 67: case 82: case 87: case 90: case 92:
                    case 93:
                        this.activated=0
                    break
                    case 21: case 22: this.block=args[0]; break
                    case 30: case 31: case 52: case 58: this.activated=0;this.args[1]=args[0]; break
                    case 41: case 44: case 48: case 84:
                        this.args[1]=args[0]+this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].onScry()
                        this.args[2]=args[1]
                        this.battle.cardManagers[this.player].hand.allEffect(101)
                        this.battle.cardManagers[this.player].discard.allEffect(91)
                        this.battle.cardManagers[this.player].reserve.allEffect(91)
                        if(this.battle.cardManagers[this.player].reserve.cards.length==0&&this.battle.cardManagers[this.player].discard.cards.length>0){
                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].reserve.cards,0,-1,2)
                            this.battle.cardManagers[this.player].reserve.shuffle()
                        }
                    break
                    case 43: case 75: case 89:
                        this.card=new card(this.layer,this.battle,this.player,-100,-100,0,0,0,0)
                        this.card.nonCalc=true
                    break
                    case 47: case 49: case 73: case 85:
                        this.args[1]=args[0]+this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].onScry()
                        this.args[2]=args[1]
                        this.args[3]=args[2]
                        this.battle.cardManagers[this.player].hand.allEffect(101)
                        this.battle.cardManagers[this.player].discard.allEffect(91)
                        this.battle.cardManagers[this.player].reserve.allEffect(91)
                        if(this.battle.cardManagers[this.player].reserve.cards.length==0&&this.battle.cardManagers[this.player].discard.cards.length>0){
                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].reserve.cards,0,-1,2)
                            this.battle.cardManagers[this.player].reserve.shuffle()
                        }
                    break
                    case 45: this.activated=0;this.args[1]=args[0];this.args[2]=args[1];this.args[3]=args[2]; break
                    case 46: this.activated=0;this.args[1]=args[0];this.args[2]=args[1]; break
                    case 59:
                        this.args[1]=args[0]+this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].onScry()
                        for(let a=0,la=4;a<la;a++){
                            this.args[2+a]=args[1+a]
                        }
                        this.battle.cardManagers[this.player].hand.allEffect(101)
                        this.battle.cardManagers[this.player].discard.allEffect(91)
                        this.battle.cardManagers[this.player].reserve.allEffect(91)
                        if(this.battle.cardManagers[this.player].reserve.cards.length==0&&this.battle.cardManagers[this.player].discard.cards.length>0){
                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].reserve.cards,0,-1,2)
                            this.battle.cardManagers[this.player].reserve.shuffle()
                        }
                    break
                    case 60: case 80: case 96:
                        this.args[1]=args[0]
                    break
                }
            break
            case 3:
                this.cards=[]
                let sublist=[]
                this.taken=0
                this.setupArgs=args
                let upKey=0
                if(
                    args[2]==7||args[2]==9||args[2]==10||args[2]==11||args[2]==17||args[2]==22||args[2]==26||args[2]==27||args[2]==34||args[2]==33||
                    args[2]==37||args[2]==46
                ){
                    this.options=args[3]
                }else{
                    this.options=variants.unary?1:3
                }
                if(this.battle.relicManager.active[46][this.player+1]>0&&this.args[0]==0){
                    this.options+=this.battle.relicManager.active[46][this.player+1]
                }
                if(this.battle.relicManager.active[131][this.player+1]>0&&this.args[0]==0){
                    this.options-=this.battle.relicManager.active[131][this.player+1]
                }
                if(this.battle.relicManager.active[238][this.player+1]>0&&[14,15,16,25].includes(args[2])&&this.args[0]==0){
                    this.options+=2*this.battle.relicManager.active[238][this.player+1]
                }
                if(this.battle.relicManager.active[420][this.player+1]>0&&this.args[0]==0){
                    this.options+=this.battle.relicManager.active[420][this.player+1]
                }
                if(this.battle.relicManager.active[333][this.player+1]>0&&[14,15,16,25].includes(args[2])&&this.args[0]==0){
                    upKey+=0.5*this.battle.relicManager.active[333][this.player+1]
                }
                if(this.additionalOptions!=0){
                    this.options=constrain(this.options+this.additionalOptions,1,6)
                    this.additionalOptions=0
                }
                if(variants.cursed){
                    args[0]=min(args[0]+1,2)
                }
                if(this.options<=0){
                    this.active=false
                }
                switch(args[2]){
                    case 0: case 7:
                        list=variants.ultraprism?copyArrayStack(this.battle.cardManagers[this.player].listing.all):variants.prism?copyArrayStack(this.battle.cardManagers[this.player].listing.allPlayerCard):variants.mtg?copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[0]):variants.junk?quadroArray(copyArray(this.battle.cardManagers[this.player].listing.junk[constants.playerNumber+1])):copyArrayStack(this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]])
                        let effectiveRarity=variants.commoners&&floor(random(0,3))!=0?0:args[1]
                        let effectiveOptions=this.options+this.battle.relicManager.active[172][this.player+1]+this.battle.relicManager.active[458][this.player+1]
                        let list2=[[],[],[],[]]
                        if(this.args[0]==0&&this.battle.relicManager.hasRelic(315,this.player)){
                            list2=copyArrayStack(this.battle.cardManagers[this.player].listing.card[constants.playerNumber+5])
                        }
                        if(variants.mtg){
                            for(let a=0,la=list[effectiveRarity].length;a<la;a++){
                                if(types.card[list[effectiveRarity][a]].mtg.list==-1&&types.card[list[effectiveRarity][a]].mtg.color[0]!=0&&floor(random(0,4))!=0){
                                    list[effectiveRarity].splice(a,1)
                                    a--
                                    la--
                                }
                            }
                        }
                        let positionKey=this.layer.width/2+60-effectiveOptions*60
                        for(let a=0,la=this.options;a<la;a++){
                            if(list[effectiveRarity].length>0){
                                let index=0
                                if(this.args[0]==0&&this.battle.relicManager.hasRelic(315,this.player)&&floor(random(0,30))<this.battle.relicManager.active[315][this.player+1]){
                                    index=floor(random(0,list2[3].length))
                                    this.cards.push(new card(this.layer,this.battle,this.player,positionKey,this.layer.height/2+20,
                                        list2[3][index],0,constants.playerNumber+5,-1))
                                    list2[3].splice(index,1)
                                    positionKey+=120
                                }else{
                                    index=floor(random(0,list[effectiveRarity].length))
                                    this.cards.push(new card(this.layer,this.battle,this.player,positionKey,this.layer.height/2+20,
                                        list[effectiveRarity][index],this.battle.relicManager.hasRelic(219,this.player)&&floor(random(0,10))<this.battle.relicManager.active[219][this.player+1]?2:args[0],this.battle.standardColorize(list[effectiveRarity][index]),-1))
                                    let roll=floor(random(0,360*(this.battle.relicManager.hasRelic(180,this.player)?0.25:1)*(this.battle.relicManager.hasRelic(427,this.player)?0.5:1)))
                                    this.cards[this.cards.length-1].edition=this.rollEdition(roll)
                                    list[effectiveRarity].splice(index,1)
                                    positionKey+=120
                                    if(variants.colorshift){
                                        (variants.ultraprism?this.battle.cardManagers[this.player].listing.all[effectiveRarity]:variants.prism?this.battle.cardManagers[this.player].listing.allPlayerCard[effectiveRarity]:variants.mtg?this.battle.cardManagers[this.player].listing.mtg[0][effectiveRarity]:variants.junk?this.battle.cardManagers[this.player].listing.junk[constants.playerNumber+1]:this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]][effectiveRarity]).splice(index,1)
                                        if(!variants.ultraprism&&!variants.prism&&!variants.mtg&&!variants.junk){
                                            let possible=[]
                                            for(let a=0,la=constants.playerNumber;a<la;a++){
                                                if(!this.battle.player.includes(a+1)){
                                                    possible.push(a+1)
                                                }
                                            }
                                            let type=possible[floor(random(0,possible.length))]
                                            if(this.battle.cardManagers[this.player].listing.card[type][effectiveRarity].length>0){
                                                let index=floor(random(0,this.battle.cardManagers[this.player].listing.card[type][effectiveRarity].length))
                                                this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]][effectiveRarity].push(this.battle.cardManagers[this.player].listing.card[type][effectiveRarity][index])
                                                this.battle.cardManagers[this.player].listing.card[type][effectiveRarity].splice(index,1)
                                            }
                                        }
                                    }
                                }
                                this.cards[this.cards.length-1].upSize=true
                            }
                        }
                        if(this.args[0]==0&&this.battle.relicManager.hasRelic(172,this.player)){
                            for(let a=0,la=this.battle.relicManager.active[172][this.player+1];a<la;a++){
                                list=variants.ultraprism?copyArrayStack(this.battle.cardManagers[this.player].listing.all):variants.prism?copyArrayStack(this.battle.cardManagers[this.player].listing.allPlayerCard):variants.mtg?copyArrayStack(this.battle.cardManagers[this.player].listing.allPlayerCard):variants.junk?quadroArray(copyArray(this.battle.cardManagers[this.player].listing.junk[constants.playerNumber+1])):copyArrayStack(this.battle.cardManagers[this.player].listing.allPlayerCard)
                                if(list[args[1]].length>0){
                                    let index=floor(random(0,list[args[1]].length))
                                    this.cards.push(new card(this.layer,this.battle,this.player,positionKey,this.layer.height/2+20,
                                        list[args[1]][index],this.battle.relicManager.hasRelic(219,this.player)&&floor(random(0,10))<this.battle.relicManager.active[219][this.player+1]?2:args[0],this.battle.standardColorize(list[args[1]][index]),-1))
                                    let roll=floor(random(0,360*(this.battle.relicManager.hasRelic(180,this.player)?0.25:1)*(this.battle.relicManager.hasRelic(427,this.player)?0.5:1)))
                                    this.cards[this.cards.length-1].edition=this.rollEdition(roll)
                                    this.cards[this.cards.length-1].upSize=true
                                    list.splice(index,1)
                                    positionKey+=120
                                }
                            }
                        }
                        if(this.args[0]==0&&this.battle.relicManager.hasRelic(458,this.player)){
                            for(let a=0,la=this.battle.relicManager.active[458][this.player+1];a<la;a++){
                                list=variants.ultraprism?copyArrayStack(this.battle.cardManagers[this.player].listing.all):variants.prism?copyArrayStack(this.battle.cardManagers[this.player].listing.allPlayerCard):variants.mtg?copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[1][this.battle.relicManager.detail[458][this.player]]):variants.junk?quadroArray(copyArray(this.battle.cardManagers[this.player].listing.junk[constants.playerNumber+1])):copyArrayStack(this.battle.cardManagers[this.player].listing.card[this.battle.relicManager.detail[458][this.player]])
                                if(list[args[1]].length>0){
                                    let index=floor(random(0,list[args[1]].length))
                                    this.cards.push(new card(this.layer,this.battle,this.player,positionKey,this.layer.height/2+20,
                                        list[args[1]][index],this.battle.relicManager.hasRelic(219,this.player)&&floor(random(0,10))<this.battle.relicManager.active[219][this.player+1]?2:args[0],this.battle.standardColorize(list[args[1]][index]),-1))
                                    let roll=floor(random(0,360*(this.battle.relicManager.hasRelic(180,this.player)?0.25:1)*(this.battle.relicManager.hasRelic(427,this.player)?0.5:1)))
                                    this.cards[this.cards.length-1].edition=this.rollEdition(roll)
                                    this.cards[this.cards.length-1].upSize=true
                                    list.splice(index,1)
                                    positionKey+=120
                                }
                            }
                        }
                        this.options=effectiveOptions
                    break
                    case 1:
                        list=variants.mtg?copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[1][0]):copyArrayStack(this.battle.cardManagers[this.player].listing.card[0])
                        for(let a=0,la=this.options;a<la;a++){
                            if(list[args[1]].length>0){
                                let index=floor(random(0,list[args[1]].length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[args[1]][index],args[0],0,-1))
                                this.cards[a].upSize=true
                                list[args[1]].splice(index,1)
                            }
                        }
                    break
                    case 2: case 12:
                        list=variants.mtg?(args[2]==12?
                            copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[1][constants.playerNumber+7]):
                            copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[2])
                        ):copyArrayStack(this.battle.cardManagers[this.player].listing.allPlayerCard)
                        for(let a=0,la=this.options;a<la;a++){
                            if(list[args[1]].length>0){
                                let index=floor(random(0,list[args[1]].length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[args[1]][index],args[0],this.battle.standardColorize(list[args[1]][index]),-1))
                                if(args[3]==1){
                                    this.cards[a].setCost(0,[0])
                                }
                                this.cards[a].upSize=true
                                list[args[1]].splice(index,1)
                            }
                        }
                    break
                    case 3: case 4: case 10:
                        list=variants.mtg?copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[2]):copyArrayStack(this.battle.cardManagers[this.player].listing.allPlayerCard)
                        sublist=[]
                        for(let a=0,la=list[3].length;a<la;a++){
                            if(
                                variants.mtg&&types.card[list[3][a]].mtg.levels[args[0]].class==args[1]||
                                !variants.mtg&&types.card[list[3][a]].levels[args[0]].class==args[1]
                            ){
                                sublist.push(list[3][a])
                            }
                        }
                        for(let a=0,la=this.options;a<la;a++){
                            if(sublist.length>0){
                                let index=floor(random(0,sublist.length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,sublist[index],args[0],this.battle.standardColorize(sublist[index]),-1))
                                if(args[2]==4){
                                    this.cards[a].setCost(0,[0])
                                }
                                this.cards[a].upSize=true
                                sublist.splice(index,1)
                            }
                        }
                    break
                    case 5:
                        list=[]
                        for(let a=0,la=11;a<la;a++){
                            list.push(findName(`${a+1} of\nNothings`,types.card))
                        }
                        for(let a=0,la=this.options;a<la;a++){
                            if(list.length>0){
                                let index=floor(random(0,list.length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[index],args[0],0,-1))
                                this.cards[a].upSize=true
                                list.splice(index,1)
                            }
                        }
                    break
                    case 6:
                        list=copyArrayStack(this.battle.cardManagers[this.player].listing.card[constants.playerNumber+4])
                        for(let a=0,la=this.options;a<la;a++){
                            if(list[args[1]].length>0){
                                let index=floor(random(0,list[args[1]].length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[args[1]][index],args[0],constants.playerNumber+4,-1))
                                this.cards[a].upSize=true
                                list[args[1]].splice(index,1)
                            }
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
                    case 13:
                        list=[]
                        for(let a=0,la=11;a<la;a++){
                            list.push(a)
                        }
                        for(let a=0,la=this.options;a<la;a++){
                            if(list.length>0){
                                let index=floor(random(0,list.length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,findName('Timestamp',types.card),args[0],0,-1))
                                this.cards[a].upSize=true
                                this.cards[a].effect[0]=list[index]
                                list.splice(index,1)
                            }
                        }
                    break
                    case 14:
                        list=variants.ultraprism?copyArrayStack(this.battle.cardManagers[this.player].listing.all):variants.prism?copyArrayStack(this.battle.cardManagers[this.player].listing.allPlayerCard):variants.mtg?copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[0]):variants.junk?quadroArray(copyArray(this.battle.cardManagers[this.player].listing.junk[constants.playerNumber+1])):copyArrayStack(this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]])
                        if(variants.mtg){
                            for(let a=0,la=list[args[1]].length;a<la;a++){
                                if(types.card[list[args[1]][a]].mtg.list==-1&&types.card[list[args[1]][a]].mtg.color[0]!=0&&floor(random(0,4))!=0){
                                    list[args[1]].splice(a,1)
                                    a--
                                    la--
                                }
                            }
                        }
                        for(let a=0,la=this.options;a<la;a++){
                            if(list[args[1]].length>0){
                                let index=floor(random(0,list[args[1]].length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[args[1]][index],floor(random(args[0]+upKey,2.5+upKey)),this.battle.standardColorize(list[args[1]][index]),-1))
                                let roll=floor(random(0,90*(this.battle.relicManager.hasRelic(180,this.player)?0.25:1)*(this.battle.relicManager.hasRelic(427,this.player)?0.5:1)))
                                this.cards[this.cards.length-1].edition=this.rollEdition(roll)
                                this.cards[this.cards.length-1].upSize=true
                                list[args[1]].splice(index,1)
                            }
                        }
                    break
                    case 15:
                        list=copyArrayStack(this.battle.cardManagers[this.player].listing.card[0])
                        for(let a=0,la=this.options;a<la;a++){
                            if(list[args[1]].length>0){
                                let index=floor(random(0,list[args[1]].length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[args[1]][index],floor(random(args[0]+upKey,2.5+upKey)),0,-1))
                                let roll=floor(random(0,90*(this.battle.relicManager.hasRelic(180,this.player)?0.25:1)*(this.battle.relicManager.hasRelic(427,this.player)?0.5:1)))
                                this.cards[this.cards.length-1].edition=this.rollEdition(roll)
                                this.cards[this.cards.length-1].upSize=true
                                list[args[1]].splice(index,1)
                            }
                        }
                    break
                    case 16:
                        list=copyArrayStack(this.battle.cardManagers[this.player].listing.card[constants.playerNumber+5])
                        for(let a=0,la=this.options;a<la;a++){
                            if(list[args[1]].length>0){
                                let index=floor(random(0,list[args[1]].length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[args[1]][index],floor(random(args[0]+upKey,1+upKey)),constants.playerNumber+5,-1))
                                this.cards[this.cards.length-1].upSize=true
                                list[args[1]].splice(index,1)
                            }
                        }
                    break
                    case 17:
                        list=variants.mtg?copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[1][constants.playerNumber+7]):copyArrayStack(this.battle.cardManagers[this.player].listing.allPlayerCard)
                        for(let a=0,la=list[args[1]].length;a<la;a++){
                            if(types.card[list[args[1]][a]].levels[args[0]].class!=args[4]){
                                list[args[1]].splice(a,1)
                                a--
                                la--
                            }
                        }
                        for(let a=0,la=this.options;a<la;a++){
                            if(list[args[1]].length>0){
                                let index=floor(random(0,list[args[1]].length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[args[1]][index],args[0],this.battle.standardColorize(list[args[1]][index]),-1))
                                let roll=floor(random(0,12))
                                this.cards[this.cards.length-1].edition=roll==0?6:roll==1?5:roll==2?4:roll>=3&&roll<=5?3:roll>=6&&roll<=8?2:roll>=9&&roll<=11?1:0
                                this.cards[this.cards.length-1].upSize=true
                                list[args[1]].splice(index,1)
                            }
                        }
                    break
                    case 18: case 24: case 36:
                        list=variants.mtg?(args[2]==18?
                                copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[1][constants.playerNumber+7]):
                                copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[2])
                            ):
                            args[2]==36?
                            copyArrayStack(this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]]):
                            copyArrayStack(this.battle.cardManagers[this.player].listing.allPlayerCard)
                        for(let a=0,la=list[args[1]].length;a<la;a++){
                            if(
                                variants.mtg&&(
                                    arrayPurge(types.card[list[args[1]][a]].mtg.levels[args[0]].cost,[-3]).length!=args[3]||
                                    specialCost(types.card[list[args[1]][a]].mtg.levels[args[0]])
                                )||
                                !variants.mtg&&(
                                    types.card[list[args[1]][a]].levels[args[0]].cost!=args[3]||
                                    specialCost(types.card[list[args[1]][a]].levels[args[0]])
                                )
                            ){
                                list[args[1]].splice(a,1)
                                a--
                                la--
                            }
                        }
                        for(let a=0,la=this.options;a<la;a++){
                            if(list[args[1]].length>0){
                                let index=floor(random(0,list[args[1]].length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[args[1]][index],args[0],this.battle.standardColorize(list[args[1]][index]),-1))
                                if(args[2]==24||args[2]==36){
                                    this.cards[a].setCost(0,[0])
                                }
                                this.cards[this.cards.length-1].upSize=true
                                list[args[1]].splice(index,1)
                            }
                        }
                    break
                    case 19:
                        list=variants.mtg?copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[1][constants.playerNumber+7]):copyArrayStack(this.battle.cardManagers[this.player].listing.allPlayerCard)
                        for(let a=0,la=list[args[1]].length;a<la;a++){
                            if(!types.card[list[args[1]][a]].levels[args[0]].spec.includes(args[3])){
                                list[args[1]].splice(a,1)
                                a--
                                la--
                            }
                        }
                        for(let a=0,la=this.options;a<la;a++){
                            if(list[args[1]].length>0){
                                let index=floor(random(0,list[args[1]].length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[args[1]][index],args[0],this.battle.standardColorize(list[args[1]][index]),-1))
                                this.cards[this.cards.length-1].upSize=true
                                list[args[1]].splice(index,1)
                            }
                        }
                    break
                    case 20:
                        list=variants.mtg?copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[1][args[3]]):copyArrayStack(this.battle.cardManagers[this.player].listing.card[args[3]])
                        for(let a=0,la=this.options;a<la;a++){
                            if(list[args[1]].length>0){
                                let index=floor(random(0,list[args[1]].length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[args[1]][index],this.battle.relicManager.hasRelic(219,this.player)&&floor(random(0,20))==0?2:args[0],this.battle.standardColorize(list[args[1]][index]),-1))
                                let roll=floor(random(0,360*(this.battle.relicManager.hasRelic(180,this.player)?0.25:1)*(this.battle.relicManager.hasRelic(427,this.player)?0.5:1)))
                                this.cards[this.cards.length-1].edition=this.rollEdition(roll)
                                this.cards[this.cards.length-1].upSize=true
                                list[args[1]].splice(index,1)
                            }
                        }
                    break
                    case 21:
                        for(let a=0,la=this.options;a<la;a++){
                            let type=findName(['Discus of Fire\nand Water','Discus of Mountain\nand Rain','Discus of Wind\nand Thunder'][a%3],types.card)
                            this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,type,args[0],this.battle.standardColorize(type),-1))
                            this.cards[a].upSize=true
                        }
                    break
                    case 22:
                        list=copyArrayStack(this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]])
                        sublist=[[],[]]
                        for(let a=0,la=list[3].length;a<la;a++){
                            if(types.card[list[3][a]].levels[args[0]].class==1||types.card[list[3][a]].levels[args[0]].class==2){
                                sublist[types.card[list[3][a]].levels[args[0]].class-1].push(list[3][a])
                            }
                        }
                        for(let a=0,la=this.options;a<la;a++){
                            if(sublist[a%2].length>0){
                                let index=floor(random(0,sublist[a%2].length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,sublist[a%2][index],args[0],types.card[sublist[a%2][index]].list,-1))
                                this.cards[a].upSize=true
                                sublist[a%2].splice(index,1)
                            }
                        }
                    break
                    case 23: case 30:
                        list=[]
                        for(let a=0,la=args[3].length;a<la;a++){
                            list.push(variants.mtg?copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[1][args[3][a]]):copyArrayStack(this.battle.cardManagers[this.player].listing.card[args[3][a]]))
                        }
                        let preColors=[]
                        for(let a=0,la=args[3].length;a<la;a++){
                            preColors.push(a)
                        }
                        for(let a=0,la=this.options-args[3].length;a<la;a++){
                            preColors.push(floor(random(0,args[3].length)))
                        }
                        let colors=[]
                        for(let a=0,la=preColors.length;a<la;a++){
                            let index=floor(random(0,preColors.length))
                            colors.push(preColors[index])
                            preColors.splice(index,1)
                        }
                        for(let a=0,la=this.options;a<la;a++){
                            let listIndex=colors[a]
                            if(list[listIndex][args[1]].length>0){
                                let index=floor(random(0,list[listIndex][args[1]].length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[listIndex][args[1]][index],args[0],this.battle.standardColorize(list[listIndex][args[1]][index]),-1))
                                if(args[2]==23){
                                    this.cards[a].setCost(0,[0])
                                }
                                this.cards[a].upSize=true
                                list[listIndex][args[1]].splice(index,1)
                            }
                        }
                    break
                    case 25:
                        list=variants.mtg?copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[2]):copyArrayStack(this.battle.cardManagers[this.player].listing.allPlayerCard)
                        for(let a=0,la=this.options;a<la;a++){
                            if(list[args[1]].length>0){
                                let index=floor(random(0,list[args[1]].length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[args[1]][index],floor(random(args[0]+upKey,2.5+upKey)),this.battle.standardColorize(list[args[1]][index]),-1))
                                let roll=floor(random(0,90*(this.battle.relicManager.hasRelic(180,this.player)?0.25:1)*(this.battle.relicManager.hasRelic(427,this.player)?0.5:1)))
                                this.cards[this.cards.length-1].edition=this.rollEdition(roll)
                                this.cards[this.cards.length-1].upSize=true
                                list[args[1]].splice(index,1)
                            }
                        }
                    break
                    case 26:
                        for(let a=0,la=this.options;a<la;a++){
                            list=variants.mtg?copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[2]):copyArrayStack(this.battle.cardManagers[this.player].listing.allPlayerCard)
                            for(let b=0,lb=list[args[1]].length;b<lb;b++){
                                if(
                                    variants.mtg&&(
                                        types.card[list[args[1]][b]].mtg.levels[args[0]].cost.length!=a+1||
                                        specialCost(types.card[list[args[1]][b]].mtg.levels[args[0]])
                                    )||
                                    !variants.mtg&&(
                                        types.card[list[args[1]][b]].levels[args[0]].cost!=a+1||
                                        specialCost(types.card[list[args[1]][b]].levels[args[0]])
                                    )
                                ){
                                    list[args[1]].splice(b,1)
                                    b--
                                    lb--
                                }
                            }
                            if(list[args[1]].length>0){
                                let index=floor(random(0,list[args[1]].length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[args[1]][index],args[0],this.battle.standardColorize(list[args[1]][index]),-1))
                                this.cards[this.cards.length-1].upSize=true
                                list[args[1]].splice(index,1)
                            }
                        }
                    break
                    case 27:
                        this.setupArgs[4]=[]
                        list=[]
                        for(let a=0,la=this.battle.cardManagers[this.player].discard.cards.length;a<la;a++){
                            if(this.battle.cardManagers[this.player].discard.cards[a].name!='Fatigue'){
                                list.push(a)
                            }
                        }
                        for(let a=0,la=this.options;a<la;a++){
                            if(list.length>0){
                                let index=floor(random(0,list.length))
                                this.cards.push(copyCard(this.battle.cardManagers[this.player].discard.cards[list[index]]))
                                this.cards[this.cards.length-1].upSize=true
                                this.cards[this.cards.length-1].position.x=this.layer.width/2+60-la*60+a*120
                                this.cards[this.cards.length-1].position.y=this.layer.height/2+20
                                this.setupArgs[4].push(list[index])
                                list.splice(index,1)
                            }
                        }
                    break
                    case 28:
                        list=variants.mtg?copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[0]):copyArrayStack(this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]])
                        if(variants.mtg){
                            for(let a=0,la=list[args[1]].length;a<la;a++){
                                if(types.card[list[args[1]][a]].mtg.list==-1&&types.card[list[args[1]][a]].mtg.color[0]!=0&&floor(random(0,4))!=0){
                                    list[args[1]].splice(a,1)
                                    a--
                                    la--
                                }
                            }
                        }
                        sublist=[]
                        for(let a=0,la=list[3].length;a<la;a++){
                            if(types.card[list[3][a]].levels[args[0]].class==args[1]){
                                sublist.push(list[3][a])
                            }
                        }
                        for(let a=0,la=this.options;a<la;a++){
                            if(sublist.length>0){
                                let index=floor(random(0,sublist.length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,sublist[index],args[0],this.battle.standardColorize(sublist[index]),-1))
                                this.cards[a].upSize=true
                                sublist.splice(index,1)
                            }
                        }
                    break
                    case 29:
                        list=variants.mtg?copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[0]):copyArrayStack(this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]])
                        if(variants.mtg){
                            for(let a=0,la=list[args[1]].length;a<la;a++){
                                if(types.card[list[args[1]][a]].mtg.list==-1&&types.card[list[args[1]][a]].mtg.color[0]!=0&&floor(random(0,4))!=0){
                                    list[args[1]].splice(a,1)
                                    a--
                                    la--
                                }
                            }
                        }
                        sublist=[]
                        for(let a=0,la=list[args[1]].length;a<la;a++){
                            if(types.card[list[args[1]][a]].levels[args[0]].class==args[3]){
                                sublist.push(list[args[1]][a])
                            }
                        }
                        for(let a=0,la=this.options;a<la;a++){
                            if(sublist.length>0){
                                let index=floor(random(0,sublist.length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,sublist[index],args[0],this.battle.standardColorize(sublist[index]),-1))
                                this.cards[a].setCost(0,[0])
                                this.cards[a].upSize=true
                                sublist.splice(index,1)
                            }
                        }
                    break
                    case 31:
                        list=variants.mtg?copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[0]):copyArrayStack(this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]])
                        if(variants.mtg){
                            for(let a=0,la=list[args[1]].length;a<la;a++){
                                if(types.card[list[args[1]][a]].mtg.list==-1&&types.card[list[args[1]][a]].mtg.color[0]!=0&&floor(random(0,4))!=0){
                                    list[args[1]].splice(a,1)
                                    a--
                                    la--
                                }
                            }
                        }
                        for(let a=0,la=list[args[1]].length;a<la;a++){
                            if(
                                (variants.mtg?(specialCost(types.card[list[args[1]][a]].mtg.levels[args[0]])?
                                types.card[list[args[1]][a]].mtg.levels[args[0]].cost[0]:arrayPurge(types.card[list[args[1]][a]].mtg.levels[args[0]].cost,[-3]).length
                                ):types.card[list[args[1]][a]].levels[args[0]].cost)!=args[3]&&args[3]!=-99||
                                types.card[list[args[1]][a]].levels[args[0]].class!=args[4]||
                                specialCost(variants.mtg?types.card[list[args[1]][a]].mtg.levels[args[0]]:types.card[list[args[1]][a]].levels[args[0]])
                            ){
                                list[args[1]].splice(a,1)
                                a--
                                la--
                            }
                        }
                        for(let a=0,la=this.options;a<la;a++){
                            if(list[args[1]].length>0){
                                let index=floor(random(0,list[args[1]].length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[args[1]][index],args[0],this.battle.standardColorize(list[args[1]][index]),-1))
                                this.cards[this.cards.length-1].upSize=true
                                list[args[1]].splice(index,1)
                            }
                        }
                    break
                    case 32:
                        for(let a=0,la=this.options;a<la;a++){
                            this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,findName(['Hakurei\nTalisman','Hakurei\nOrb','Hakurei\nAmulet'][a%3],types.card),0,0,-1))
                            this.cards[a].upSize=true
                        }
                    break
                    case 33:
                        list=variants.mtg?copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[1][constants.playerNumber+7]):copyArrayStack(this.battle.cardManagers[this.player].listing.allPlayerCard)
                        sublist=[[],[],[],[]]
                        for(let a=0,la=list[args[1]].length;a<la;a++){
                            switch(types.card[list[args[1]][a]].levels[args[0]].class){
                                case 1:
                                    sublist[0].push(list[args[1]][a])
                                break
                                case 2:
                                    sublist[1].push(list[args[1]][a])
                                break
                                case 3:
                                    sublist[2].push(list[args[1]][a])
                                break
                                case 11:
                                    sublist[3].push(list[args[1]][a])
                                break
                            }
                        }
                        for(let a=0,la=this.options;a<la;a++){
                            if(sublist[a%4].length>0){
                                let index=floor(random(0,sublist[a%4].length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,sublist[a%4][index],args[0],this.battle.standardColorize(sublist[a%4][index]),-1))
                                this.cards[a].upSize=true
                                this.cards[a].setCost(0,[0])
                                sublist[a%4].splice(index,1)
                            }
                        }
                    break
                    case 34:
                        this.setupArgs[4]=[]
                        list=[]
                        for(let a=0,la=this.battle.cardManagers[this.player].reserve.cards.length;a<la;a++){
                            if(this.battle.cardManagers[this.player].reserve.cards[a].name!='Fatigue'){
                                list.push(a)
                            }
                        }
                        for(let a=0,la=this.options;a<la;a++){
                            if(list.length>0){
                                let index=floor(random(0,list.length))
                                this.cards.push(copyCard(this.battle.cardManagers[this.player].reserve.cards[list[index]]))
                                this.cards[this.cards.length-1].upSize=true
                                this.cards[this.cards.length-1].position.x=this.layer.width/2+60-la*60+a*120
                                this.cards[this.cards.length-1].position.y=this.layer.height/2+20
                                this.setupArgs[4].push(list[index])
                                list.splice(index,1)
                            }
                        }
                    break
                    case 35:
                        for(let a=0,la=this.options;a<la;a++){
                            this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,findName(['Spring-Colored\nPath','Lakeside\nPath','Ghostly\nPath'][a%3],types.card),0,0,-1))
                            this.cards[a].upSize=true
                        }
                    break
                    case 37: case 39: case 40: case 41: case 42:
                        let second=''
                        switch(args[2]){
                            case 37:
                                second='Splash'
                            break
                            case 39:
                                second='Radiance'
                            break
                            case 40:
                                second='Occult'
                            break
                            case 41:
                                second='Vibrant'
                            break
                            case 42:
                                second='Torch'
                            break
                        }
                        for(let a=0,la=this.options;a<la;a++){
                            let type=findName(['Pristine',second][a%2],types.card)
                            this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,type,0,this.battle.standardColorize(type),-1))
                            this.cards[a].upSize=true
                        }
                    break
                    case 38:
                        list=variants.mtg?copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[0]):copyArrayStack(this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]])
                        for(let a=0,la=this.options;a<la;a++){
                            if(list[args[1]].length>0){
                                let index=floor(random(0,list[args[1]].length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[args[1]][index],args[0],this.battle.standardColorize(list[args[1]][index]),-1))
                                this.cards[a].setCost(0,[0])
                                this.cards[this.cards.length-1].upSize=true
                                list[args[1]].splice(index,1)
                            }
                        }
                    break
                    case 43:
                        list=copyArray(this.battle.cardManagers[this.player].listing[args[1]])
                        for(let a=0,la=this.options;a<la;a++){
                            if(list.length>0){
                                let index=floor(random(0,list.length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[index],args[0],this.battle.standardColorize(list[index]),-1))
                                this.cards[a].upSize=true
                                list.splice(index,1)
                            }
                        }
                    break
                    case 44:
                        list=copyArray(this.battle.cardManagers[this.player].listing.junk[args[1]])
                        for(let a=0,la=this.options;a<la;a++){
                            if(list.length>0){
                                let index=floor(random(0,list.length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[index],args[0],this.battle.standardColorize(list[index]),-1))
                                this.cards[a].setCost(0,[0])
                                this.cards[this.cards.length-1].upSize=true
                                list.splice(index,1)
                            }
                        }
                    break
                    case 45:
                        for(let a=0,la=this.options;a<la;a++){
                            list=variants.mtg?copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[2]):copyArrayStack(this.battle.cardManagers[this.player].listing.allPlayerCard)
                            for(let b=0,lb=list[args[1]].length;b<lb;b++){
                                if(
                                    variants.mtg&&(
                                        types.card[list[args[1]][b]].mtg.levels[args[0]].class!=args[3]||
                                        types.card[list[args[1]][b]].mtg.levels[args[0]].target[0]!=0&&a%3==0||
                                        (types.card[list[args[1]][b]].mtg.levels[args[0]].target[0]!=2||types.card[list[args[1]][b]].mtg.levels[args[0]].target[2]!=1)&&a%3==1||
                                        (types.card[list[args[1]][b]].mtg.levels[args[0]].target[0]!=2||types.card[list[args[1]][b]].mtg.levels[args[0]].target[2]<=1)&&a%3==2
                                    )||
                                    !variants.mtg&&(
                                        types.card[list[args[1]][b]].levels[args[0]].class!=args[3]||
                                        types.card[list[args[1]][b]].levels[args[0]].target[0]!=0&&a%3==0||
                                        (types.card[list[args[1]][b]].levels[args[0]].target[0]!=2||types.card[list[args[1]][b]].levels[args[0]].target[2]!=1)&&a%3==1||
                                        (types.card[list[args[1]][b]].levels[args[0]].target[0]!=2||types.card[list[args[1]][b]].levels[args[0]].target[2]<=1)&&a%3==2
                                    )
                                ){
                                    list[args[1]].splice(b,1)
                                    b--
                                    lb--
                                }
                            }
                            if(list[args[1]].length>0){
                                let index=floor(random(0,list[args[1]].length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[args[1]][index],args[0],this.battle.standardColorize(list[args[1]][index]),-1))
                                this.cards[this.cards.length-1].upSize=true
                                this.cards[this.cards.length-1].setCost(0,[0])
                                list[args[1]].splice(index,1)
                            }
                        }
                    break
                    case 46:
                        list=variants.mtg?copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[0]):copyArrayStack(this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]])
                        if(this.options>=8){
                            let groups=[ceil(this.options/2),floor(this.options/2)]
                            for(let a=0,la=this.options;a<la;a++){
                                if(list[args[1]].length>0){
                                    let index=floor(random(0,list[args[1]].length))
                                    this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-groups[a%2]*60+floor(a/2)*120,this.layer.height/2-55+a%2*150,list[args[1]][index],args[0],this.battle.standardColorize(list[args[1]][index]),-1))
                                    this.cards[this.cards.length-1].upSize=true
                                    list[args[1]].splice(index,1)
                                }
                            }
                        }else{
                            for(let a=0,la=this.options;a<la;a++){
                                if(list[args[1]].length>0){
                                    let index=floor(random(0,list[args[1]].length))
                                    this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,list[args[1]][index],args[0],this.battle.standardColorize(list[args[1]][index]),-1))
                                    this.cards[this.cards.length-1].upSize=true
                                    list[args[1]].splice(index,1)
                                }
                            }
                        }
                    break
                    case 47:
                        list=variants.mtg?copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[1][args[3]]):copyArrayStack(this.battle.cardManagers[this.player].listing.card[args[3]])
                        sublist=[]
                        for(let a=0,la=list[args[1]].length;a<la;a++){
                            if(types.card[list[args[1]][a]].levels[args[0]].class==args[4]){
                                sublist.push(list[args[1]][a])
                            }
                        }
                        for(let a=0,la=this.options;a<la;a++){
                            if(sublist.length>0){
                                let index=floor(random(0,sublist.length))
                                this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2+60-la*60+a*120,this.layer.height/2+20,sublist[index],args[0],this.battle.standardColorize(sublist[index]),-1))
                                this.cards[a].upSize=true
                                sublist.splice(index,1)
                            }
                        }
                    break
                }
                for(let a=0,la=this.cards.length;a<la;a++){
                    this.cards[a].nonCalc=true
                }
            break
            case 7:
                this.battle.combatantManager.combatants[this.player].reset()
                this.battle.combatantManager.combatants[this.player].infoAnim.life=0
            break
            case 8:
                if(this.cards.length==0||args[0]!=this.cards[0].level){
                    this.cards=[]
                    this.marks=[]
                    this.taken=0
                    let mark=-2
                    let tick=0
                    let total=0
                    switch(this.args[2]){
                        case 0: case 1: case 2:
                            switch(this.args[2]){
                                case 0:
                                    list=copyArray(this.battle.cardManagers[this.player].listing.coc)[3]
                                break
                                case 1:
                                    list=copyArray(this.battle.cardManagers[this.player].listing.disband)
                                break
                                case 2:
                                    list=copyArray(this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]][3])
                                break
                            }
                            switch(this.args[2]){
                                case 0: case 1:
                                    for(let a=0,la=args[1]==-99?types.card.length:list.length;a<la;a++){
                                        let selector=args[1]==-99?a:list[a]
                                        if((types.card[selector].rarity==this.args[1]||this.args[1]==-1)&&!(variants.mtg&&types.card[selector].mtg==undefined)){
                                            this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2-350+tick%8*100,this.layer.height/2-130+floor(tick/8)%3*130,selector,args[0],this.battle.standardColorize(selector),-1))
                                            this.cards[tick].upSize=true
                                            tick++
                                            if(variants.mtg){
                                                if(types.card[selector].mtg.list!=mark){
                                                    mark=types.card[selector].mtg.list
                                                    this.marks.push(floor(total/24))
                                                }
                                            }else{
                                                if(types.card[selector].list!=mark){
                                                    mark=types.card[selector].list
                                                    this.marks.push(floor(total/24))
                                                }
                                            }
                                            total++
                                        }
                                    }
                                break
                                case 2:
                                    let names=[]
                                    for(let a=0,la=list.length;a<la;a++){
                                        names.push(types.card[list[a]].name)
                                    }
                                    names.sort()
                                    for(let a=0,la=names.length;a<la;a++){
                                        let index=0
                                        for(let b=0,lb=list.length;b<lb;b++){
                                            if(types.card[list[b]].name==names[a]){
                                                index=b
                                            }
                                        }
                                        let selector=list[index]
                                        this.cards.push(new card(this.layer,this.battle,this.player,this.layer.width/2-350+tick%8*100,this.layer.height/2-130+floor(tick/8)%3*130,selector,args[0],this.battle.standardColorize(selector),-1))
                                        this.cards[tick].upSize=true
                                        tick++
                                    }
                                break
                            }
                            this.marks.push(ceil(this.cards.length/24)-1)
                        break
                    }
                    this.setupArgs=args
                    for(let a=0,la=this.cards.length;a<la;a++){
                        this.cards[a].nonCalc=true
                    }
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
            case 12:
                this.world=args[0]
            break
            case 13:
                this.text=''
            break
            case 14:
                this.id=args[0]
                this.combatant=this.battle.combatantManager.getCombatant(this.id)
            break
            case 15:
                this.encounters=[]
                let index=0
                this.class=args[0]
                for(let a=0,la=args[1]==0?1:2;a<la;a++){
                    switch(args[0]){
                        case 0:
                            list=this.battle.nodeManager.listing.encounter[this.battle.nodeManager.world][args[1]==0?4:args[1]<3&&this.world==0?3:0]
                            index=floor(random(0,list.length))
                            this.encounters.push(list[index])
                            if(y>0){
                                list.splice(index,1)
                            }
                        break
                        case 1:
                            list=this.battle.nodeManager.listing.encounter[this.battle.nodeManager.world][args[1]==0?4:args[1]<3&&this.world==0?3:0]
                            index=floor(random(0,list.length))
                            this.encounters.push(list[index])
                            list.splice(index,1)
                        break
                        case 2:
                            list=this.battle.nodeManager.listing.encounter[this.battle.nodeManager.world][1]
                            index=floor(random(0,list.length))
                            this.encounters.push(list[index])
                            list.splice(index,1)
                        break
                    }
                }
            break
            case 16:
                this.setupArgs=args
                switch(this.args[0]){
                    case 0:
                        this.colors=[]
                        let possible=[0,1,1,2,2,3,3,4,4,5,5]
                        for(let a=0,la=3;a<la;a++){
                            let index=floor(random(0,possible.length))
                            let remove=possible[index]
                            this.colors.push(remove)
                            for(let b=0,lb=possible.length;b<lb;b++){
                                if(possible[b]==remove){
                                    possible.splice(b,1)
                                    b--
                                    lb--
                                }
                            }
                        }
                    break
                    case 1:
                        this.colors=[0,1,2,3,4,5]
                    break
                    case 2: case 3:
                        this.colors=[]
                        for(let a=0,la=this.battle.energy.base[this.player].length;a<la;a++){
                            if(!this.colors.includes(this.battle.energy.base[this.player][a])&&this.battle.energy.base[this.player][a]!=0){
                                this.colors.push(this.battle.energy.base[this.player][a])
                            }
                        }
                    break
                }
            break
            case 17:
                this.card=args[0]
                this.setupArgs=args
                this.cards=[]
                switch(this.args[0]){
                    case 0:
                        for(let a=0,la=this.args[1];a<la;a++){
                            this.cards.push(copyCard(this.card))
                            this.cards[this.cards.length-1].upSize=true
                            this.cards[this.cards.length-1].position.x=this.layer.width/2+60-la*60+a*120
                            this.cards[this.cards.length-1].position.y=this.layer.height/2+20
                            switch(this.cards[a].attack){
                                case 3074:
                                    this.cards[a].attack=[-1000,-1001][a]
                                break
                                case 3075:
                                    this.cards[a].attack=[-1002,-1003][a]
                                break
                                case 3076:
                                    this.cards[a].attack=[-1004,-1005][a]
                                break
                                case 3078:
                                    this.cards[a].attack=[-1006,-1007][a]
                                break
                                case 3082:
                                    this.cards[a].attack=[-1008,-1009][a]
                                break
                                case 3134:
                                    this.cards[a].attack=[-1010,-1011][a]
                                break
                                case 3135:
                                    this.cards[a].attack=[-1012,-1013][a]
                                break
                                case 3334:
                                    this.cards[a].attack=[-1014,-1015][a]
                                break
                                case 3335:
                                    this.cards[a].attack=[-1016,-1017][a]
                                break
                                case 3381:
                                    this.cards[a].attack=[-1018,-1019][a]
                                break
                                case 3382:
                                    this.cards[a].attack=[-1020,-1021][a]
                                break
                                case 3383:
                                    this.cards[a].attack=[-1022,-1021][a]
                                break
                                case 3390:
                                    this.cards[a].attack=[-1023,-1024][a]
                                break
                                case 3395: case 3689:
                                    this.cards[a].attack=[-1025,-1026][a]
                                break
                                case 3396:
                                    this.cards[a].attack=[-1027,-1028][a]
                                break
                                case 3397: case 3568:
                                    this.cards[a].attack=[-1029,-1030][a]
                                break
                                case 3459:
                                    this.cards[a].attack=[-1031,-1032][a]
                                break
                                case 3569:
                                    this.cards[a].attack=[-1033,-1034][a]
                                break
                                case 3584:
                                    this.cards[a].attack=[-1035,-1036][a]
                                break
                                case 3585:
                                    this.cards[a].attack=[-1037,-1038][a]
                                break
                                case 3586:
                                    this.cards[a].attack=[-1039,-1040][a]
                                break
                                case 3724:
                                    this.cards[a].attack=[-1041,-1042][a]
                                break
                                case 3725:
                                    this.cards[a].attack=[-1043,-1044][a]
                                break
                                case 3726:
                                    this.cards[a].attack=[-1045,-1046][a]
                                break
                                case 3727:
                                    this.cards[a].attack=[-1047,-1048,-1049][a]
                                break
                                case 3908:
                                    this.cards[a].attack=[-1050,-1051][a]
                                break
                                case 3909:
                                    this.cards[a].attack=[-1052,-1053][a]
                                break
                                case 4626:
                                    this.cards[a].attack=[-1054,-1055][a]
                                break
                                case 4627:
                                    this.cards[a].attack=[-1037,-1056][a]
                                break
                                case 4628:
                                    this.cards[a].attack=[-1037,-1057][a]
                                break
                                case 4629:
                                    this.cards[a].attack=[-1037,-1058][a]
                                break
                                case 4630:
                                    this.cards[a].attack=[-1052,-1059][a]
                                break
                                case 4631:
                                    this.cards[a].attack=[-1052,-1060][a]
                                break
                                case 4632:
                                    this.cards[a].attack=[-1052,-1061][a]
                                break
                                case 5164:
                                    this.cards[a].attack=[-1062,-1063][a]
                                break
                                case 5543:
                                    this.cards[a].attack=[-1064,-1065][a]
                                break
                                case 5544:
                                    this.cards[a].attack=[-1064,-1066][a]
                                break
                            }
                        }
                    break
                    case 1:
                        for(let a=0,la=2;a<la;a++){
                            this.cards.push(copyCard(this.card))
                            this.cards[this.cards.length-1].effect=copyArray(this.cards[this.cards.length-1].effect[a])
                            this.cards[this.cards.length-1].attack=this.cards[this.cards.length-1].attack[a]
                            this.cards[this.cards.length-1].spec=copyArray(this.cards[this.cards.length-1].reality[a])
                            this.cards[this.cards.length-1].class=this.cards[this.cards.length-1].class[a]
                            this.cards[this.cards.length-1].upSize=true
                            this.cards[this.cards.length-1].position.x=this.layer.width/2+60-la*60+a*120
                            this.cards[this.cards.length-1].position.y=this.layer.height/2+20
                        }
                    break
                }
            break
            case 20:
                this.setupArgs=args
                switch(args[0]){
                    case 0:
                        let type=findName('Duckiz\nPod',types.card)
                        this.card=new card(this.layer,this.battle,this.player,this.layer.width/2+225*this.posKey,this.layer.height/2-60,type,0,this.battle.standardColorize(type),0)
                        this.options=2
                        this.cost=60
                        this.changes=0
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
                        this.battle.addCurrency(args.value[0],this.player)
                    break
                    case 1: case 11: case 12:
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
            case 2:
                switch(this.args[0]){
                    case 41: case 73:
                        this.battle.cardManagers[this.player].draw(this.args[2])
                    break
                    case 45:
                        this.battle.overlayManager.overlays[66][this.player].active=true
                        this.battle.overlayManager.overlays[66][this.player].activate([this.args[2],this.args[3]])
                    break
                    case 46:
                        this.battle.cardManagers[this.player].hand.exhaust(this.args[2])
                    break
                    case 48:
                        this.battle.cardManagers[this.player].draw(this.args[2])
                        this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].reserve.cards,0,-1,15)
                    break
                    case 49:
                        let result=this.battle.cardManagers[this.player].drawReturn(this.args[2])
                        if(result.length>0&&result[0].class==this.args[4]){
                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Intangible',this.args[3])
                        }
                    break
                    case 59:
                        this.battle.cardManagers[this.player].draw(this.args[2])
                        this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.args[1]*this.args[4])
                    break
                    case 84:
                        this.battle.cardManagers[this.player].drawAbstract(...this.args[2])
                    break
                }
            break
            case 17:
                switch(this.args[0]){
                    case 0:
                        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                        switch(args[0].attack){
                            case -1000:
                                this.card.costDown(0,[3])
                                userCombatant.statusEffect('Take 1/4 Damage',args[0].effect[1])
                            break
                            case -1001:
                                this.card.costDown(0,[7])
                                userCombatant.statusEffect('Strength',args[0].effect[2])
                            break
                            case -1002:
                                this.card.costDown(0,[3])
                                userCombatant.statusEffect('Dodge',args[0].effect[1])
                            break
                            case -1003:
                                this.card.costDown(0,[7])
                                this.battle.cardManagers[this.player].hand.selfCall(6,[3080,[args[0].effect[2],args[0].effect[3]],1,[5]])
                            break
                            case -1004:
                                this.card.costDown(0,[3])
                                this.battle.addEnergy(args[0].effect[1],this.player)
                            break
                            case -1005:
                                this.card.costDown(0,[7])
                                userCombatant.statusEffect('Intangible',args[0].effect[2])
                            break
                            case -1006:
                                this.card.costDown(0,[4])
                                this.battle.overlayManager.overlays[19][this.player].active=true
                                this.battle.overlayManager.overlays[19][this.player].activate()
                            break
                            case -1007:
                                this.card.costDown(0,[9])
                                for(let a=0,la=args[0].effect[1];a<la;a++){
                                    this.battle.cardManagers[this.player].addRandomAbstract(2,0,0,2,2,[],[2,1,[[4]]])
                                }
                            break
                            case -1008:
                                this.card.costDown(0,[3])
                                this.battle.cardManagers[this.player].allEffectArgs(2,21,[args[0].effect[1]])
                            break
                            case -1009:
                                this.card.costDown(0,[6])
                                userCombatant.heal(args[0].effect[2])
                            break
                            case -1010:
                                this.card.costDown(0,[3])
                                this.battle.cardManagers[this.player].allEffect(2,4)
                            break
                            case -1011:
                                this.card.costDown(0,[7])
                                this.battle.combatantManager.allEffect(41,[args[0].effect[1]])
                            break
                            case -1012:
                                this.card.costDown(0,[5])
                                this.battle.cardManagers[this.player].hand.add(findName('17 of\nNothings',types.card),0,0)
                                this.battle.cardManagers[this.player].draw(args[0].effect[1])
                            break
                            case -1013:
                                this.card.costDown(0,[12])
                                this.battle.overlayManager.overlays[6][this.player].active=true
                                this.battle.overlayManager.overlays[6][this.player].activate([0,3,1])
                            break
                            case -1014:
                                this.card.costDown(0,[3])
                                this.battle.overlayManager.overlays[58][this.player].active=true
                                this.battle.overlayManager.overlays[58][this.player].activate([args[0].effect[1],args[0].effect[2]])
                            break
                            case -1015:
                                this.card.costDown(0,[8])
                                for(let a=0,la=args[0].effect[3];a<la;a++){
                                    this.battle.cardManagers[this.player].hand.add(findName('Miracle',types.card),0,0)
                                }
                            break
                            case -1016:
                                this.card.costDown(0,[3])
                                for(let a=0,la=args[0].effect[1];a<la;a++){
                                    this.battle.cardManagers[this.player].hand.add(findName('Riptide',types.card),0,0)
                                }
                            break
                            case -1017:
                                this.card.costDown(0,[8])
                                this.battle.overlayManager.overlays[10][this.player].active=true
                                this.battle.overlayManager.overlays[10][this.player].activate([0,2,29,4])
                            break
                            case -1018:
                                this.card.costDown(0,[3])
                                this.battle.cardManagers[this.player].draw(args[0].effect[1],5)
                            break
                            case -1019:
                                this.card.costDown(0,[6])
                                this.battle.overlayManager.overlays[3][this.player].additionalOptions+=args[0].effect[2]
                            break
                            case -1020:
                                this.card.costDown(0,[3])
                                for(let a=0,la=args[0].effect[0];a<la;a++){
                                    this.battle.cardManagers[this.player].hand.addAbstract(findName('Strike',types.card),0,this.battle.attackManager.color,0,[1,4],[[1]])
                                }
                                for(let a=0,la=args[0].effect[1];a<la;a++){
                                    this.battle.cardManagers[this.player].hand.addAbstract(findName('Defend',types.card),0,this.battle.attackManager.color,0,[1,4],[[1]])
                                }
                            break
                            case -1021:
                                this.card.costDown(0,[12])
                                this.battle.overlayManager.overlays[71][this.player].active=true
                                this.battle.overlayManager.overlays[71][this.player].activate()
                            break
                            case -1022:
                                this.card.costDown(0,[3])
                                for(let a=0,la=args[0].effect[1];a<la;a++){
                                    this.battle.cardManagers[this.player].hand.addAbstract(findName('Strike',types.card),0,this.battle.attackManager.color,0,[1,4],[[1]])
                                }
                                for(let a=0,la=args[0].effect[2];a<la;a++){
                                    this.battle.cardManagers[this.player].hand.addAbstract(findName('Defend',types.card),0,this.battle.attackManager.color,0,[1,4],[[1]])
                                }
                            break
                            case -1023:
                                this.card.costDown(0,[2])
                                this.battle.dropDrawShuffle(this.player,findName('Vitality',types.card),0,0)
                            break
                            case -1024:
                                this.card.costDown(0,[5])
                                userCombatant.statusEffect('End of Combat Heal',args[0].effect[1])
                            break
                            case -1025:
                                this.card.costDown(0,[4])
                                userCombatant.statusEffect('Reflect',1)
                            break
                            case -1026:
                                this.card.costDown(0,[9])
                                for(let a=0,la=args[0].effect[2];a<la;a++){
                                    this.battle.cardManagers[this.player].hand.addAbstract(findName('Discus of Light\nand Dark',types.card),0,0,0,[1],[])
                                }
                            break
                            case -1027:
                                this.card.costDown(0,[2])
                                for(let a=0,la=args[0].effect[1];a<la;a++){
                                    this.battle.cardManagers[this.player].hand.add(findName('Pristine',types.card),0,0)
                                }
                            break
                            case -1028:
                                this.card.costDown(0,[6])
                                this.battle.overlayManager.overlays[83][this.player].active=true
                                this.battle.overlayManager.overlays[83][this.player].activate([0,0,1])
                            break
                            case -1029:
                                this.card.costDown(0,[3])
                                userCombatant.addBlock(userCombatant.lastBlock*args[0].effect[1])
                            break
                            case -1030:
                                this.card.costDown(0,[8])
                                for(let a=0,la=args[0].effect[2];a<la;a++){
                                    this.battle.cardManagers[this.player].addRandomAbstract(2,this.battle.attackManager.level,0,4,1,[2],[3,['Sculpture'],1])
                                }
                            break
                            case -1031:
                                this.battle.combatantManager.combatants[this.setupArgs[1]].takeDamage(args[0].effect[0]*2,this.setupArgs[2])
                                userCombatant.addBlock(args[0].effect[1])
                            break
                            case -1032:
                                this.battle.combatantManager.combatants[this.setupArgs[1]].takeDamage(args[0].effect[0],this.setupArgs[2])
                                userCombatant.addBlock(args[0].effect[1]*2)
                            break
                            case -1033:
                                this.card.costDown(0,[2])
                                this.battle.combatantManager.allEffect(47,[])
                            break
                            case -1034:
                                this.card.costDown(0,[12])
                                this.battle.overlayManager.overlays[99][this.player].active=true
                                this.battle.overlayManager.overlays[99][this.player].activate()
                            break
                            case -1035:
                                this.card.costDown(0,[3])
                                userCombatant.addBlock(args[0].effect[2])
                                this.battle.cardManagers[this.player].hand.upgrade(args[0].effect[3])
                            break
                            case -1036:
                                this.card.costDown(0,[6])
                                this.battle.cardManagers[this.player].hand.selfCall(6,[2951,[args[0].effect[4],args[0].effect[5]],1,[5]])
                            break
                            case -1037:
                                this.card.costDown(0,[2])
                                userCombatant.statusEffect('Dodge',args[0].effect[2])
                                userCombatant.statusEffect('Temporary Strength',args[0].effect[3]*userCombatant.getStatus('Dodge'))
                            break
                            case -1038:
                                this.card.costDown(0,[5])
                                if(this.battle.cardManagers[this.player].hand.cards.length<args[0].effect[4]){
                                    this.battle.cardManagers[this.player].draw(args[0].effect[4]-this.battle.cardManagers[this.player].hand.cards.length)
                                }
                                this.battle.addEnergy(args[0].effect[5],this.player)
                            break
                            case -1039:
                                this.card.costDown(0,[2])
                                this.battle.overlayManager.overlays[10][this.player].active=true
                                this.battle.overlayManager.overlays[10][this.player].activate([0,1,33,4])
                            break
                            case -1040:
                                this.card.costDown(0,[4])
                                this.battle.overlayManager.overlays[10][this.player].active=true
                                this.battle.overlayManager.overlays[10][this.player].activate([0,2,33,4])
                            break
                            case -1041:
                                this.card.costDown(0,[2])
                                this.battle.cardManagers[this.player].hand.selfCall(6,[3881,[args[0].effect[1],args[0].effect[2]],11,[5]])
                            break
                            case -1042:
                                this.card.costDown(0,[10])
                                this.battle.cardManagers[this.player].addRandomAbstract(2,0,0,1,0,[],[constants.playerNumber+5,3])
                            break
                            case -1043:
                                this.card.costDown(0,[3])
                                userCombatant.statusEffect('Attack Lock On Turn',args[0].effect[1])
                            break
                            case -1044:
                                this.card.costDown(0,[8])
                                this.battle.cardManagers[this.player].hand.selfCall(6,[3635,[args[0].effect[2],args[0].effect[3],args[0].effect[4]],1,[2,1,3]])
                            break
                            case -1045:
                                this.card.costDown(0,[4])
                                this.battle.cardManagers[this.player].hand.duplicate(args[0].effect[2])
                            break
                            case -1046:
                                this.card.costDown(0,[7])
                                this.battle.cardManagers[this.player].hand.allEffect(105)
                                userCombatant.statusEffect('Strength',this.battle.cardManagers[this.player].hand.cards.length)
                            break
                            case -1047:
                                this.card.costDown(0,[3])
                                this.battle.cardManagers[this.player].addRandomAbstract(0,0,0,1,0,[],[constants.playerNumber+2,3])
                            break
                            case -1048:
                                this.card.costDown(0,[5])
                                this.battle.overlayManager.overlays[112][this.player].active=true
                                this.battle.overlayManager.overlays[112][this.player].activate()
                            break
                            case -1049:
                                this.card.costDown(0,[9])
                                this.battle.overlayManager.overlays[113][this.player].active=true
                                this.battle.overlayManager.overlays[113][this.player].activate()
                            break
                            case -1050:
                                this.card.costDown(0,[2])
                                this.battle.cardManagers[this.player].allEffectArgs(2,39,[1,args[0].effect[1]])
                            break
                            case -1051:
                                this.card.costDown(0,[6])
                                this.battle.cardManagers[this.player].allEffectArgs(2,39,[0,args[0].effect[2]])
                            break
                            case -1052:
                                this.card.costDown(0,[4])
                                this.battle.overlayManager.overlays[7][this.player].active=true
                                this.battle.overlayManager.overlays[7][this.player].activate()
                                this.battle.overlayManager.overlays[8][this.player].active=true
                                this.battle.overlayManager.overlays[8][this.player].activate()
                            break
                            case -1053:
                                this.card.costDown(0,[9])
                                this.battle.cardManagers[this.player].allEffect(2,2)
                                this.battle.addEnergy(args[0].effect[2],this.player)
                                this.battle.cardManagers[this.player].draw(args[0].effect[3])
                            break
                            case -1054:
                                this.card.costDown(0,[3])
                                this.battle.cardManagers[this.player].allEffectArgs(2,21,[args[0].effect[0]])
                            break
                            case -1055:
                                this.card.costDown(0,[6])
                                userCombatant.heal(args[0].effect[1])
                            break
                            case -1056:
                                this.card.costDown(0,[5])
                                if(this.battle.cardManagers[this.player].hand.cards.length<args[0].effect[4]){
                                    this.battle.cardManagers[this.player].draw(args[0].effect[4]-this.battle.cardManagers[this.player].hand.cards.length)
                                }
                                this.battle.addSpecificEnergy(2,this.player,4)
                                this.battle.addSpecificEnergy(2,this.player,5)
                            break
                            case -1057:
                                this.card.costDown(0,[5])
                                if(this.battle.cardManagers[this.player].hand.cards.length<args[0].effect[4]){
                                    this.battle.cardManagers[this.player].draw(args[0].effect[4]-this.battle.cardManagers[this.player].hand.cards.length)
                                }
                                this.battle.addSpecificEnergy(3,this.player,4)
                                this.battle.addSpecificEnergy(3,this.player,5)
                            break
                            case -1058:
                                this.card.costDown(0,[5])
                                if(this.battle.cardManagers[this.player].hand.cards.length<args[0].effect[4]){
                                    this.battle.cardManagers[this.player].draw(args[0].effect[4]-this.battle.cardManagers[this.player].hand.cards.length)
                                }
                                this.battle.addSpecificEnergy(6,this.player,6)
                            break
                            case -1059:
                                this.card.costDown(0,[9])
                                this.battle.cardManagers[this.player].allEffect(2,2)
                                this.battle.addSpecificEnergy(3,this.player,6)
                                this.battle.cardManagers[this.player].draw(args[0].effect[2])
                            break
                            case -1060:
                                this.card.costDown(0,[9])
                                this.battle.cardManagers[this.player].allEffect(2,2)
                                this.battle.addSpecificEnergy(4,this.player,6)
                                this.battle.cardManagers[this.player].draw(args[0].effect[2])
                            break
                            case -1061:
                                this.card.costDown(0,[9])
                                this.battle.cardManagers[this.player].allEffect(2,2)
                                this.battle.addSpecificEnergy(5,this.player,6)
                                this.battle.cardManagers[this.player].draw(args[0].effect[2])
                            break
                            case -1062:
                                this.card.costDown(0,[5])
                                this.battle.addCurrency(args[0].effect[1],this.player)
                            break
                            case -1063:
                                this.card.costDown(0,[10])
                                this.battle.combatantManager.allEffect(48,['Self-Reflect',1])
                            break
                            case -1064:
                                this.card.costDown(0,[3])
                                this.battle.combatantManager.areaAbstract(0,[args[0].effect[2]*this.battle.cardManagers[this.player].discard.cards.length,userCombatant.id,0],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
                                this.battle.particleManager.particles.push(new particle(this.battle.layer,userCombatant.position.x,userCombatant.position.y,2,[10]))
                                this.battle.cardManagers[this.player].discard.allEffect(114)
                            break
                            case -1065:
                                let handSize1065=this.battle.cardManagers[this.player].hand.cards.length
                                this.card.costDown(0,[6])
                                this.battle.cardManagers[this.player].hand.allEffect(22)
                                this.battle.cardManagers[this.player].draw(handSize1065*args[0].effect[3])
                                this.battle.addEnergy(handSize1065*args[0].effect[4],this.player)
                            break
                            case -1066:
                                let handSize1066=this.battle.cardManagers[this.player].hand.cards.length
                                this.card.costDown(0,[6])
                                this.battle.cardManagers[this.player].hand.allEffect(22)
                                this.battle.cardManagers[this.player].draw(handSize1066*args[0].effect[3])
                                this.battle.addSpecificEnergy(handSize1066,this.player,6)
                            break
                        }
                    break
                    case 1:
                        if(args[0].spec.includes(1)){
                            let list1=[this.battle.cardManagers[this.player].discard,this.battle.cardManagers[this.player].reserve,this.battle.cardManagers[this.player].hand]
                            for(let a=0,la=list1.length;a<la;a++){
                                for(let b=0,lb=list1[a].cards.length;b<lb;b++){
                                    if(list1[a].cards[b].id==args[0].id){
                                        if(a==2){
                                            list1[a].cards[b].deSize=true
                                            list1[a].cards[b].exhaust=true
                                        }else{
                                            list1[a].generalExhaust(b)
                                        }
                                    }
                                }
                            }
                        }
                        this.battle.cardManagers[this.player].hand.selfCall(34,args[0])
                        if(args[0].target[0]==63){
                            this.battle.cardManagers[this.player].hand.selfCall(47,args[0])
                        }else{
                            this.battle.cardManagers[this.player].hand.selfCall(33,args[0])
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
                if(this.rewards.length==0){
                    this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2,240,360,10)
                }else{
                    this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2+max(0,this.rewards[this.rewards.length-1].position-250)/2,240,360+max(0,this.rewards[this.rewards.length-1].position-250),10)
                }
                this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-205,120,40,10)
                if(this.args[0]==0){
                    //this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-250,120,40,10)
                }
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                this.layer.text('Rewards',this.layer.width/2+225*this.posKey,this.layer.height/2-150)
                this.layer.textSize(20)
                this.layer.text('Close',this.layer.width/2+225*this.posKey,this.layer.height/2-205)
                if(this.args[0]==0){
                    //this.layer.text('Replay',this.layer.width/2+225*this.posKey,this.layer.height/2-250)
                }
                for(let a=0,la=this.rewards.length;a<la;a++){
                    this.layer.noStroke()
                    this.layer.fill(120,this.fade*this.rewards[a].fade)
                    switch(this.rewards[a].type){
                        case 0:
                            this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-105+this.rewards[a].position,60,40,10)
                            if(this.battle.players==2){
                                this.layer.rect(this.layer.width/2+170*this.posKey,this.layer.height/2-105+this.rewards[a].position,30,30,10)
                                this.layer.fill(60,this.fade*this.rewards[a].fade)
                                regTriangle(this.layer,this.layer.width/2+171*this.posKey,this.layer.height/2-105+this.rewards[a].position,8,8,this.posKey*30)
                            }
                            this.layer.translate(this.layer.width/2+225*this.posKey-10,this.layer.height/2-105+this.rewards[a].position)
                            this.layer.stroke(0,this.fade*this.rewards[a].fade)
                            this.layer.strokeWeight(0.4)
                            this.layer.fill(240,240,220,this.fade*this.rewards[a].fade)
                            this.layer.ellipse(0,0,16,16)
                            this.layer.noStroke()
                            this.layer.fill(220,220,200,this.fade*this.rewards[a].fade)
                            this.layer.ellipse(0,0,10,10)
                            this.layer.fill(255,255,100,this.fade*this.rewards[a].fade)
                            this.layer.ellipse(0,0,4)
                            this.layer.triangle(-1,-3,1,-3,0,-7)
                            this.layer.triangle(-1,3,1,3,0,7)
                            this.layer.translate(-this.layer.width/2-225*this.posKey+10,-this.layer.height/2+105-this.rewards[a].position)
                            this.layer.fill(0,this.fade*this.rewards[a].fade)
                            this.layer.textSize(16)
                            this.layer.textAlign(LEFT,CENTER)
                            this.layer.text(this.rewards[a].value[0],this.layer.width/2+225*this.posKey,this.layer.height/2-103+this.rewards[a].position)
                            this.layer.textAlign(CENTER,CENTER)
                        break
                        case 1:
                            this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-105+this.rewards[a].position,120,40,10)
                            this.layer.fill(this.battle.colorDetail[this.player].fill[0],this.battle.colorDetail[this.player].fill[1],this.battle.colorDetail[this.player].fill[2],this.fade*this.rewards[a].fade)
                            this.layer.stroke(this.battle.colorDetail[this.player].stroke[0],this.battle.colorDetail[this.player].stroke[1],this.battle.colorDetail[this.player].stroke[2],this.fade*this.rewards[a].fade)
                            this.layer.strokeWeight(3)
                            this.layer.rect(this.layer.width/2+225*this.posKey-40,this.layer.height/2-105+this.rewards[a].position,24,32,5)
                            this.layer.fill(0,this.fade*this.rewards[a].fade)
                            this.layer.noStroke()
                            this.layer.textSize(16)
                            this.layer.text('New Card',this.layer.width/2+225*this.posKey+15,this.layer.height/2-103+this.rewards[a].position)
                        break
                        case 2:
                            this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-105+this.rewards[a].position,120,40,10)
                            if(this.battle.players==2){
                                this.layer.rect(this.layer.width/2+140*this.posKey,this.layer.height/2-105+this.rewards[a].position,30,30,10)
                                this.layer.fill(60,this.fade*this.rewards[a].fade)
                                regTriangle(this.layer,this.layer.width/2+141*this.posKey,this.layer.height/2-105+this.rewards[a].position,8,8,this.posKey*30)
                            }
                            this.rewards[a].relic.display(0,true,{x:this.layer.width/2+225*this.posKey-40,y:this.layer.height/2-105+this.rewards[a].position},false)
                            this.rewards[a].relic.displayInfo()
                            this.rewards[a].relic.fade=this.fade
                            this.layer.fill(0,this.fade*this.rewards[a].fade)
                            this.layer.noStroke()
                            this.layer.textSize(16)
                            this.layer.text('New Relic',this.layer.width/2+225*this.posKey+15,this.layer.height/2-103+this.rewards[a].position)
                        break
                        case 3:
                            this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-105+this.rewards[a].position,120,40,10)
                            if(this.battle.players==2){
                                this.layer.rect(this.layer.width/2+140*this.posKey,this.layer.height/2-105+this.rewards[a].position,30,30,10)
                                this.layer.fill(60,this.fade*this.rewards[a].fade)
                                regTriangle(this.layer,this.layer.width/2+141*this.posKey,this.layer.height/2-105+this.rewards[a].position,8,8,this.posKey*30)
                            }
                            this.rewards[a].item.display(false)
                            this.rewards[a].item.position.x=this.layer.width/2+225*this.posKey-40
                            this.rewards[a].item.position.y=this.layer.height/2-105+this.rewards[a].position
                            this.rewards[a].item.displayInfo()
                            this.rewards[a].item.fade=this.fade
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
                            this.layer.fill(this.battle.colorDetail[this.player].fill[0],this.battle.colorDetail[this.player].fill[1],this.battle.colorDetail[this.player].fill[2],this.fade*this.rewards[a].fade)
                            this.layer.stroke(this.battle.colorDetail[this.player].stroke[0],this.battle.colorDetail[this.player].stroke[1],this.battle.colorDetail[this.player].stroke[2],this.fade*this.rewards[a].fade)
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
                            this.layer.fill(this.battle.colorDetail[this.player].fill[0],this.battle.colorDetail[this.player].fill[1],this.battle.colorDetail[this.player].fill[2],this.fade*this.rewards[a].fade)
                            this.layer.stroke(this.battle.colorDetail[this.player].stroke[0],this.battle.colorDetail[this.player].stroke[1],this.battle.colorDetail[this.player].stroke[2],this.fade*this.rewards[a].fade)
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
                            this.layer.fill(this.battle.colorDetail[this.player].fill[0],this.battle.colorDetail[this.player].fill[1],this.battle.colorDetail[this.player].fill[2],this.fade*this.rewards[a].fade)
                            this.layer.stroke(this.battle.colorDetail[this.player].stroke[0],this.battle.colorDetail[this.player].stroke[1],this.battle.colorDetail[this.player].stroke[2],this.fade*this.rewards[a].fade)
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
                            this.layer.fill(this.battle.colorDetail[this.player].fill[0],this.battle.colorDetail[this.player].fill[1],this.battle.colorDetail[this.player].fill[2],this.fade*this.rewards[a].fade)
                            this.layer.stroke(this.battle.colorDetail[this.player].stroke[0],this.battle.colorDetail[this.player].stroke[1],this.battle.colorDetail[this.player].stroke[2],this.fade*this.rewards[a].fade)
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
                            this.layer.fill(this.battle.colorDetail[this.player].fill[0],this.battle.colorDetail[this.player].fill[1],this.battle.colorDetail[this.player].fill[2],this.fade*this.rewards[a].fade)
                            this.layer.stroke(this.battle.colorDetail[this.player].stroke[0],this.battle.colorDetail[this.player].stroke[1],this.battle.colorDetail[this.player].stroke[2],this.fade*this.rewards[a].fade)
                            this.layer.strokeWeight(3)
                            this.layer.rect(this.layer.width/2+225*this.posKey-42,this.layer.height/2-107+this.rewards[a].position,21,28,5)
                            this.layer.rect(this.layer.width/2+225*this.posKey-38,this.layer.height/2-103+this.rewards[a].position,21,28,5)
                            this.layer.fill(0,this.fade*this.rewards[a].fade)
                            this.layer.noStroke()
                            this.layer.textSize(16)
                            this.layer.text('Duplicate',this.layer.width/2+225*this.posKey+15,this.layer.height/2-103+this.rewards[a].position)
                        break
                        case 11:
                            this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-105+this.rewards[a].position,120,40,10)
                            this.layer.fill(types.color.card[constants.playerNumber+5].fill[0],types.color.card[constants.playerNumber+5].fill[1],types.color.card[constants.playerNumber+5].fill[2],this.fade*this.rewards[a].fade)
                            this.layer.stroke(types.color.card[constants.playerNumber+5].stroke[0],types.color.card[constants.playerNumber+5].stroke[1],types.color.card[constants.playerNumber+5].stroke[2],this.fade*this.rewards[a].fade)
                            this.layer.strokeWeight(3)
                            this.layer.rect(this.layer.width/2+225*this.posKey-40,this.layer.height/2-105+this.rewards[a].position,24,32,5)
                            this.layer.noStroke()
                            this.layer.fill(types.color.card[constants.playerNumber+5].active[0],types.color.card[constants.playerNumber+5].active[1],types.color.card[constants.playerNumber+5].active[2],this.fade*this.rewards[a].fade)
                            regStar(this.layer,this.layer.width/2+225*this.posKey-40,this.layer.height/2-105+this.rewards[a].position,12,4,4,10,10,0)
                            this.layer.fill(0,this.fade*this.rewards[a].fade)
                            this.layer.textSize(16)
                            this.layer.text('Spectral',this.layer.width/2+225*this.posKey+15,this.layer.height/2-103+this.rewards[a].position)
                        break
                        case 12:
                            this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-105+this.rewards[a].position,120,40,10)
                            this.layer.fill(types.color.card[0].fill[0],types.color.card[0].fill[1],types.color.card[0].fill[2],this.fade*this.rewards[a].fade)
                            this.layer.stroke(types.color.card[0].stroke[0],types.color.card[0].stroke[1],types.color.card[0].stroke[2],this.fade*this.rewards[a].fade)
                            this.layer.strokeWeight(3)
                            this.layer.rect(this.layer.width/2+225*this.posKey-40,this.layer.height/2-105+this.rewards[a].position,24,32,5)
                            this.layer.fill(0,this.fade*this.rewards[a].fade)
                            this.layer.noStroke()
                            this.layer.textSize(12)
                            this.layer.text('Colorless Card',this.layer.width/2+225*this.posKey+15,this.layer.height/2-103+this.rewards[a].position)
                        break
                    }
                }
            break
            case 2:
                switch(this.args[0]){
                    case 0: case 9: case 23: this.title='View Draw Pile'; break
                    case 1: this.title='View Discard Pile'; break
                    case 2: this.title='View Deck'; break
                    case 3: this.title='Upgrade a Card'; break
                    case 4: case 87: case 92: this.title='Remove a Card'; break
                    case 5: this.title='Put a Card From Discard Pile in Hand'; break
                    case 6: case 25: this.title='Put a Card From Draw Pile in Hand'; break
                    case 7: case 93: this.title='Transform a Card'; break
                    case 8: this.title='Duplicate a Card'; break
                    case 10: this.title='Make a Card Innate'; break
                    case 11: this.title='Put a Card From Discard Pile in Hand and Make it Cost 0'; break
                    case 12: this.title='Put a Card From Exhaust Pile in Hand'; break
                    case 13: this.title='Put an Attack From Draw Pile in Hand'; break
                    case 14: this.title='Put a Defense From Draw Pile in Hand'; break
                    case 15: this.title='Put a Movement From Draw Pile in Hand'; break
                    case 16: this.title='Put a Power From Draw Pile in Hand'; break
                    case 17: this.title='Deluxe Upgrade a Card'; break
                    case 18: this.title='Put a Card From Draw Pile in Hand and Upgrade it'; break
                    case 19: this.title='Put a Card From Discard Pile Into Draw Pile'; break
                    case 20: this.title='Put a Card From Draw Pile in Hand and Make it Cost 0'; break
                    case 21: this.title='Put a Card From Discard Pile in Hand And Add Block'; break
                    case 22: this.title='Put a Card From Draw Pile in Hand And Add Block'; break
                    case 24: this.title='View Tier'; break
                    case 26: this.title='Smush Together Two Equivalent Cards'; break
                    case 27: this.title='Put a Card From Deck in Hand'; break
                    case 28: this.title='Randomly Duplicate or Destroy a Card'; break
                    case 29: this.title='Edition a Card'; break
                    case 30: case 45: this.title='Exhaust a Card From Draw Pile'; break
                    case 31: case 46: this.title='Exhaust a Card From Discard Pile'; break
                    case 32: this.title='Make a Card Silver'; break
                    case 33: this.title='Make a Card Polychrome'; break
                    case 34: this.title='Put a Card From Draw Pile in Hand and Become Confused'; break
                    case 35: this.title='Make a Card Negative'; break
                    case 36: this.title='Duplicate a Common Card 2 Times'; break
                    case 37: this.title='Make a Card Anti-Innate'; break
                    case 38: this.title='Make a Card Foil and Duplicate it 2 Times'; break
                    case 39: this.title='Rewind a Card From Discard Pile'; break
                    case 40: this.title='Rewind a Card From Discard Pile and Double Upgrade it'; break
                    case 41: this.title='Scry'; break
                    case 42: this.title='Rewind a Card From Discard Pile and Reduce its Cost by 1'; break
                    case 43: this.title='Reduce the Cost of a Card by 1'; break
                    case 44: this.title='Scry and Make Discarded Cards Cost 0'; break
                    case 47: this.title='Scry and Apply Freeze'; break
                    case 48: this.title='Scry and Shuffle Afterward'; break
                    case 49: this.title=`Scry, Draw Afterward, Gain Intangible if ${['','','','','Power','','','','','','','Skill'][this.args[4]]} Drawn`; break
                    case 50: this.title='Edition a Basic Card'; break
                    case 51: this.title='Make a Card Colorless'; break
                    case 52: this.title='Transform a Card From Discard Pile'; break
                    case 53: this.title='Make an Attack Innate'; break
                    case 54: this.title='Make a Defense Innate'; break
                    case 55: this.title='Make a Movement Innate'; break
                    case 56: this.title='Make a Power Innate'; break
                    case 57: this.title='Make a Card Polychrome and Duplicate it 2 Times'; break
                    case 58: this.title='Transform a Card From Draw Pile'; break
                    case 59: this.title='Scry and Deal Random Damage or Add Block'; break
                    case 60: this.title=`Put a Card From Draw Pile in Hand and Make ${this.args[1]} Cop${this.args[1]==1?`y`:`ies`}`; break
                    case 61: this.title='Make a Skill Innate'; break
                    case 62: this.title='Put a Skill From Draw Pile in Hand'; break
                    case 63: this.title='Put a Copy of a Card From Draw Pile in Hand'; break
                    case 64: this.title='Make a Card Foil'; break
                    case 65: this.title='Make a Card Erratic'; break
                    case 66: this.title='Transform a Basic Card'; break
                    case 67: this.title='Remove a Non-Basic Card'; break
                    case 68: this.title='Make a Card Ethereal'; break
                    case 69: this.title='Make a Card Exhaust'; break
                    case 70: this.title='Make a Card Health-Costing'; break
                    case 71: case 88: this.title='Put a Removed Card in Deck'; break
                    case 72: this.title='Combine Two Equivalent Cards Into a Negative Copy'; break
                    case 73: this.title='Scry and Add Block For Discard Defenses'; break
                    case 74: this.title='Put a Card From Draw Pile in Hand And Make it Cost 0'; break
                    case 75: this.title=`Double Effect and Cost of ${['an Attack','a Defense'][this.args[1]]}`; break
                    case 76: this.title='Duplicate a Card, it Costs 1 More'; break
                    case 77: this.title='Upgrade a Card From Discard Pile'; break
                    case 78: this.title='Transform a card Into Any Random Double Upgraded Card With an Edition'; break
                    case 79: this.title='Put a Card From Discard Pile in Hand and Make it Duplicate Once'; break
                    case 80: this.title=`Exhaust a Card From the First ${this.args[1]} in Draw Pile`; break
                    case 81: this.title='Remove a Curse'; break
                    case 82: this.title='Transform a Curse'; break
                    case 83: this.title=`Make a Card Replenish`; break
                    case 84: this.title='Scry and Draw'; break
                    case 85: this.title='Scry and Apply Vulnerable'; break
                    case 86: this.title='Make a Card Glitched'; break
                    case 89: this.title='Reduce the Cost of a Basic Card by 1'; break
                    case 90: this.title='Drawlink a Card'; break
                    case 91: this.title='Upgrade and Duplicate a Card'; break
                    case 94: this.title='Put a Card From Draw Pile on Top of Draw Pile'; break
                    case 95: this.title='Put a Foil Copy of a Card From Draw Pile in Hand'; break
                    case 96: this.title=`Make a Card From Draw Pile Ethereal and Duplicate it ${this.args[1]} Time${pl(this.args[1])}`; break
                    case 97: this.title='View Exhaust Pile'; break

                }
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2,this.layer.height/2,510,400,10)
                this.layer.rect(this.layer.width/2-285,this.layer.height/2,40,40,10)
                this.layer.rect(this.layer.width/2+285,this.layer.height/2,40,40,10)
                this.layer.rect(this.layer.width/2,this.layer.height/2-225,this.title.length*9+60,40,10)
                if(this.args[0]!=87&&this.args[0]!=88){
                    this.layer.rect(this.layer.width/2,this.layer.height/2+225,120,40,10)
                }
                this.layer.fill(0,this.fade*0.8)
                regTriangle(this.layer,this.layer.width/2-282.5,this.layer.height/2,15,15,30)
                regTriangle(this.layer,this.layer.width/2+282.5,this.layer.height/2,15,15,-30)
                this.layer.textSize(8)
                switch(this.args[0]){
                    case 0: case 6: case 18: case 22: case 25: case 30: case 45: case 58: case 60:
                    case 63: case 74: case 80: case 94: case 95: case 96:
                        this.layer.text('Not in Actual Order',this.layer.width/2,this.layer.height/2+197.5); break
                }
                this.layer.textSize(20)
                this.layer.text(this.title,this.layer.width/2,this.layer.height/2-225)
                switch(this.args[0]){
                    case 0: case 1: case 2: case 9: case 23: case 24:
                        this.layer.text('Close',this.layer.width/2,this.layer.height/2+225); break
                    case 3: case 4: case 5: case 6: case 7: case 8: case 10: case 11: case 13: case 14:
                    case 15: case 16: case 12: case 17: case 18: case 19: case 20: case 21: case 22: case 25:
                    case 26: case 27: case 28: case 29: case 30: case 31: case 32: case 33: case 34: case 35:
                    case 36: case 37: case 38: case 39: case 40: case 41: case 42: case 43: case 44: case 45:
                    case 46: case 47: case 48: case 49: case 50: case 51: case 52: case 53: case 54: case 55:
                    case 56: case 57: case 58: case 59: case 60: case 61: case 62: case 63: case 64: case 65:
                    case 66: case 67: case 68: case 69: case 70: case 71: case 72: case 73: case 74: case 75:
                    case 76: case 77: case 78: case 79: case 80: case 81: case 82: case 83: case 84: case 85:
                    case 86: case 89: case 90: case 91: case 92: case 93: case 94: case 95: case 96: case 97:
                        this.layer.text('Skip',this.layer.width/2,this.layer.height/2+225); break
                }
                switch(this.args[0]){
                    case 0: case 6: case 18: case 22: case 25: case 30: case 45: case 58: case 60: case 63:
                    case 74: case 94: case 95: case 96:
                        this.battle.cardManagers[this.player].reserve.display('overlay',[0,this.page]); break
                    case 1: case 5: case 11: case 19: case 21: case 31: case 34: case 39: case 40: case 42:
                    case 46: case 52: case 77: case 79:
                        this.battle.cardManagers[this.player].discard.display('overlay',[1,this.page]); break
                    case 2: case 3: case 4: case 7: case 8: case 10: case 17: case 26: case 27: case 28:
                    case 29: case 32: case 33: case 35: case 37: case 38: case 43: case 51: case 57: case 64:
                    case 65: case 68: case 69: case 70: case 72: case 76: case 78: case 83: case 86: case 87:
                    case 90: case 91:
                        this.battle.cardManagers[this.player].deck.display('overlay',[1,this.page]); break
                    case 9: this.battle.cardManagers[this.player].reserve.display('overlay',[1,this.page]); break
                    case 12: case 97: 
                        this.battle.cardManagers[this.player].exhaust.display('overlay',[1,this.page]); break
                    case 13: this.battle.cardManagers[this.player].reserve.display('overlay',[2,this.page]); break
                    case 14: this.battle.cardManagers[this.player].reserve.display('overlay',[3,this.page]); break
                    case 15: this.battle.cardManagers[this.player].reserve.display('overlay',[4,this.page]); break
                    case 16: this.battle.cardManagers[this.player].reserve.display('overlay',[5,this.page]); break
                    case 20: this.battle.cardManagers[this.player].reserve.display('overlay',[6,this.page,3]); break
                    case 23: this.battle.cardManagers[this.player].reserve.display('overlay',[7,this.args[1]]); break
                    case 24: this.battle.tierManager.tiers[this.args[1]].display('overlay',[1,this.page]); break
                    case 36: this.battle.cardManagers[this.player].deck.display('overlay',[10,this.page,0]); break
                    case 41: case 44: case 47: case 48: case 49: case 59: case 73: case 80: case 84: case 85:
                        this.battle.cardManagers[this.player].reserve.display('overlay',[6,this.page,this.args[1]]); break
                    case 50: case 66: case 89:
                        this.battle.cardManagers[this.player].deck.display('overlay',[11,this.page,true]); break
                    case 53: this.battle.cardManagers[this.player].deck.display('overlay',[2,this.page]); break
                    case 54: this.battle.cardManagers[this.player].deck.display('overlay',[3,this.page]); break
                    case 55: this.battle.cardManagers[this.player].deck.display('overlay',[4,this.page]); break
                    case 56: this.battle.cardManagers[this.player].deck.display('overlay',[5,this.page]); break
                    case 61: this.battle.cardManagers[this.player].deck.display('overlay',[8,this.page]); break
                    case 62: this.battle.cardManagers[this.player].reserve.display('overlay',[8,this.page]); break
                    case 67: this.battle.cardManagers[this.player].deck.display('overlay',[11,this.page,false]); break
                    case 71: case 88:
                        this.battle.cardManagers[this.player].remove.display('overlay',[1,this.page]); break
                    case 75: this.battle.cardManagers[this.player].deck.display('overlay',[9,this.page,[1,2][this.args[1]]]); break
                    case 81: case 82:
                        this.battle.cardManagers[this.player].deck.display('overlay',[9,this.page,6]); break
                    case 92: case 93:
                        this.battle.cardManagers[this.player].deck.display('overlay',[12,this.page,1]); break

                }
                switch(this.args[0]){
                    case 3: case 17: case 43: case 75: case 77: case 89: case 91:
                        this.card.fade=1
                        this.card.anim.afford=1
                        this.card.display()
                    break
                }
            break
            case 3:
                this.layer.fill(160,this.fade*0.8)
                if(this.options>=8){
                    this.layer.rect(this.layer.width/2,this.layer.height/2,max(175,ceil(this.options/2)*120+(this.setupArgs[2]==0||this.setupArgs[2]==7?this.battle.relicManager.active[172][this.player+1]:0)*120+40),350,10)
                }else{
                    this.layer.rect(this.layer.width/2,this.layer.height/2,max(175,this.options*120+(this.setupArgs[2]==0||this.setupArgs[2]==7?this.battle.relicManager.active[172][this.player+1]:0)*120+40),200,10)
                }
                if(!this.battle.modded(83)){
                    this.layer.rect(this.layer.width/2,this.layer.height/2+125+(this.options>=8?75:0),120,40,10)
                }
                if(this.battle.relicManager.hasRelic(173,this.player)){
                    this.layer.rect(this.layer.width/2,this.layer.height/2+170+(this.options>=8?75:0),120,40,10)
                }
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                switch(this.args[0]){
                    case 0: case 1: case 2: this.layer.text('Add a Card',this.layer.width/2,this.layer.height/2-70-(this.options>=8?75:0)); break
                }
                if(!this.battle.modded(83)){
                    this.layer.textSize(20)
                    switch(this.args[0]){
                        case 0: case 1: case 2: this.layer.text('Skip',this.layer.width/2,this.layer.height/2+125+(this.options>=8?75:0)); break
                    }
                    let bonuses=[]
                    if(this.args[0]==0){
                        if(this.battle.relicManager.hasRelic(49,this.player)){
                            bonuses.push('2 Max HP')
                        }
                        if(this.battle.relicManager.hasRelic(101,this.player)){
                            bonuses.push('10 Currency')
                        }
                    }
                    this.layer.textSize(8)
                    if(bonuses.length>=2){
                        this.layer.text('Multiple Bonuses',this.layer.width/2,this.layer.height/2+140+(this.options>=8?75:0))
                    }else if(bonuses.length>=1){
                        this.layer.text(bonuses[0],this.layer.width/2,this.layer.height/2+140+(this.options>=8?75:0))
                    }
                }
                if(this.battle.relicManager.hasRelic(173,this.player)){
                    this.layer.textSize(20)
                    this.layer.text('Select All',this.layer.width/2,this.layer.height/2+170+(this.options>=8?75:0))
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
                this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2+225,120,40,10)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                this.layer.text('Stats',this.layer.width/2+225*this.posKey,this.layer.height/2-175)
                this.layer.textSize(20)
                this.layer.text('Close',this.layer.width/2+225*this.posKey,this.layer.height/2-225)
                this.layer.text('Save',this.layer.width/2+225*this.posKey,this.layer.height/2+225)
                this.layer.textSize(10)
                let variantStack=''
                for(let a=0,la=variants.map.length;a<la;a++){
                    if(variants[variants.map[a]]){
                        if(variantStack.length>0){
                            variantStack+=', '
                        }
                        variantStack+=variants.names[a]
                    }
                }
                let y=this.layer.height/2-165
                let split=[14,10]
                this.layer.text(`Difficulty ${game.ascend}`,this.layer.width/2+225*this.posKey,y+=split[0])
                this.layer.text(`Variants: ${variantStack.length>0?variantStack:`None`}`,this.layer.width/2+225*this.posKey,y+=split[0])
                this.layer.text(`${this.battle.stats.node[0]} Nodes Traveled`,this.layer.width/2+225*this.posKey,y+=split[0])
                this.layer.textSize(8)
                this.layer.text(`${this.battle.stats.node[1]} Battles`,this.layer.width/2+225*this.posKey,y+=split[0])
                this.layer.text(`${this.battle.stats.node[2]} Elites`,this.layer.width/2+225*this.posKey,y+=split[1])
                this.layer.text(`${this.battle.stats.node[3]} Bosses`,this.layer.width/2+225*this.posKey,y+=split[1])
                this.layer.text(`${this.battle.stats.node[4]} Rest Sites`,this.layer.width/2+225*this.posKey,y+=split[1])
                this.layer.text(`${this.battle.stats.node[5]} Shops`,this.layer.width/2+225*this.posKey,y+=split[1])
                this.layer.text(`${this.battle.stats.node[6]} Unknowns`,this.layer.width/2+225*this.posKey,y+=split[1])
                this.layer.text(`${this.battle.stats.node[7]} Stashes`,this.layer.width/2+225*this.posKey,y+=split[1])
                this.layer.textSize(10)
                this.layer.text(`${this.battle.stats.killed[this.player]} Enemies Killed`,this.layer.width/2+225*this.posKey,y+=split[0])
                this.layer.text(`${tennify(this.battle.stats.damage[this.player])} Damage Dealt`,this.layer.width/2+225*this.posKey,y+=split[0])
                this.layer.text(`${tennify(this.battle.stats.block[this.player])} Block Added${this.battle.stats.barrier[this.player]>0?`, ${tennify(this.battle.stats.barrier[this.player])} Barrier Added`:``}`,this.layer.width/2+225*this.posKey,y+=split[0])
                this.layer.text(`${this.battle.stats.move[this.player]} Tiles Moved`,this.layer.width/2+225*this.posKey,y+=split[0])
                this.layer.text(`${this.battle.stats.drawn[this.player]} Cards Drawn`,this.layer.width/2+225*this.posKey,y+=split[0])
                this.layer.text(`${this.battle.stats.played[this.player][0]} Cards Played:`,this.layer.width/2+225*this.posKey,y+=split[0])
                this.layer.textSize(8)
                this.layer.text(`${this.battle.stats.played[this.player][1]} Attacks`,this.layer.width/2+225*this.posKey,y+=split[0])
                this.layer.text(`${this.battle.stats.played[this.player][2]} Defenses`,this.layer.width/2+225*this.posKey,y+=split[1])
                this.layer.text(`${this.battle.stats.played[this.player][3]} Movements`,this.layer.width/2+225*this.posKey,y+=split[1])
                this.layer.text(`${this.battle.stats.played[this.player][4]} Powers`,this.layer.width/2+225*this.posKey,y+=split[1])
                this.layer.text(`${this.battle.stats.played[this.player][11]} Skills`,this.layer.width/2+225*this.posKey,y+=split[1])
                this.layer.textSize(10)
                this.layer.text(`${tennify(this.battle.stats.taken[this.player][0])} Damage Taken:`,this.layer.width/2+225*this.posKey,y+=split[0])
                this.layer.textSize(8)
                this.layer.text(`${tennify(this.battle.stats.taken[this.player][1])} Blocked`,this.layer.width/2+225*this.posKey,y+=split[0])
                this.layer.text(`${tennify(this.battle.stats.taken[this.player][2])} Unblocked`,this.layer.width/2+225*this.posKey,y+=split[1])
                this.layer.textSize(10)
                this.layer.text(`${this.battle.stats.earned[this.player]} Currency Obtained`,this.layer.width/2+225*this.posKey,y+=split[0])
                this.layer.text(`${this.battle.stats.card[this.player]} Cards Obtained`,this.layer.width/2+225*this.posKey,y+=split[0])
                this.layer.text(`${this.battle.stats.relic[this.player]} Relics Obtained`,this.layer.width/2+225*this.posKey,y+=split[0])
                this.layer.text(`${this.battle.stats.item[this.player]} Items Obtained`,this.layer.width/2+225*this.posKey,y+=split[0])
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
                this.layer.text(`Heal ${10+this.battle.relicManager.active[449][this.player+1]*5} HP`,this.layer.width/2,this.layer.height/2-40)
                this.layer.text('Close',this.layer.width/2,this.layer.height/2+40)
                this.layer.textSize(8)
                this.layer.text('60 Currency',this.layer.width/2,this.layer.height/2-25)
                this.battle.combatantManager.combatants[this.player].displayInfo('food')
            break
            case 8:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2,this.layer.height/2-20,810,440,10)
                this.layer.rect(this.layer.width/2-85,this.layer.height/2+225,40,40,10)
                this.layer.rect(this.layer.width/2+85,this.layer.height/2+225,40,40,10)
                this.layer.rect(this.layer.width/2-130,this.layer.height/2+225,40,40,10)
                this.layer.rect(this.layer.width/2+130,this.layer.height/2+225,40,40,10)
                this.layer.rect(this.layer.width/2,this.layer.height/2+225,120,40,10)
                this.layer.fill(0,this.fade*0.8)
                regTriangle(this.layer,this.layer.width/2-82.5,this.layer.height/2+225,15,15,30)
                regTriangle(this.layer,this.layer.width/2+82.5,this.layer.height/2+225,15,15,-30)
                regTriangle(this.layer,this.layer.width/2-122.5,this.layer.height/2+225,15,15,30)
                regTriangle(this.layer,this.layer.width/2+122.5,this.layer.height/2+225,15,15,-30)
                regTriangle(this.layer,this.layer.width/2-132.5,this.layer.height/2+225,15,15,30)
                regTriangle(this.layer,this.layer.width/2+132.5,this.layer.height/2+225,15,15,-30)
                this.layer.textSize(8)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                switch(this.args[0]){
                    case 0: case 1: this.layer.text('Add a Card',this.layer.width/2,this.layer.height/2-210); break
                }
                this.layer.textSize(20)
                switch(this.args[0]){
                    case 0: case 1: this.layer.text('Skip',this.layer.width/2,this.layer.height/2+225); break
                }
                this.layer.textSize(15)
                switch(this.args[0]){
                    case 0: case 1: this.layer.text(`Page ${this.page+1}/${this.marks[this.marks.length-1]+1}`,this.layer.width/2+300,this.layer.height/2-210); break
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
                this.layer.text('Techify a Card',this.layer.width/2,this.layer.height/2-65-this.battle.players*150+150+this.player*300)
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
                for(let a=0,la=this.battle.nodeManager.listing.static[this.world][2].length;a<la;a++){
                    this.layer.noStroke()
                    this.layer.fill(120,this.fade)
                    this.layer.rect(this.layer.width/2,this.layer.height/2-105+a*50,340,40,10)
                    this.layer.fill(0,this.fade)
                    this.layer.noStroke()
                    this.layer.textSize(18)
                    this.layer.text(types.encounter[this.battle.nodeManager.listing.static[this.world][2][a]].name,this.layer.width/2,this.layer.height/2-105+a*50)
                }
            break
            case 13:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2,this.layer.height/2+10,480,100,10)
                this.layer.rect(this.layer.width/2,this.layer.height/2-65,120,40,10)
                this.layer.fill(200,this.fade*0.8)
                this.layer.stroke(0,this.fade*0.8)
                this.layer.strokeWeight(3)
                this.layer.rect(this.layer.width/2,this.layer.height/2+25,440,30,5)
                this.layer.fill(0,this.fade*0.8)
                this.layer.noStroke()
                this.layer.textSize(20)
                this.layer.text('Name',this.layer.width/2,this.layer.height/2-5)
                this.layer.textAlign(LEFT,CENTER)
                this.layer.text(this.text,this.layer.width/2-215,this.layer.height/2+25)
                this.layer.textAlign(CENTER,CENTER)
                this.layer.text('Save',this.layer.width/2,this.layer.height/2-65)
            break
            case 14:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2,this.layer.height/2+100,360,560,10)
                this.layer.rect(this.layer.width/2,this.layer.height/2-205,120,40,10)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                this.layer.text('Select Intent',this.layer.width/2,this.layer.height/2-150)
                this.layer.textSize(20)
                this.layer.text('Close',this.layer.width/2,this.layer.height/2-205)
                for(let a=0,la=this.combatant.attack.length;a<la;a++){
                    this.layer.noStroke()
                    this.layer.fill(120,this.fade)
                    this.layer.rect(this.layer.width/2,this.layer.height/2-105+a*50,340,40,10)
                    this.layer.fill(0,this.fade)
                    this.layer.noStroke()
                    this.layer.textSize(18)
                    this.layer.text(
                        variants.mtg?types.attack[this.combatant.attack[a].type].name.replace('Energy','Mana'):types.attack[this.combatant.attack[a].type].name
                        ,this.layer.width/2,this.layer.height/2-105+a*50)
                }
            break
            case 15:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2,this.layer.height/2+100,360,560,10)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                this.layer.text('Select Enemy',this.layer.width/2,this.layer.height/2-150)
                for(let a=0,la=this.encounters.length;a<la;a++){
                    this.layer.noStroke()
                    this.layer.fill(120,this.fade)
                    this.layer.rect(this.layer.width/2,this.layer.height/2-105+a*50,340,40,10)
                    this.layer.fill(0,this.fade)
                    this.layer.noStroke()
                    this.layer.textSize(18)
                    this.layer.text(types.encounter[this.encounters[a]].name,this.layer.width/2,this.layer.height/2-105+a*50)
                }
            break
            case 16:
                let title=''
                switch(this.args[0]){
                    case 0:
                        title='Select Base Mana to Add'
                    break
                    case 1:
                        title='Select Mana to Add'
                    break
                    case 2: case 3:
                        title='Select Base Mana to Remove'
                    break
                }
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2+225*(this.player*2-this.battle.players+1),this.layer.height/2,15+this.colors.length*55,70,10)
                this.layer.rect(this.layer.width/2+225*(this.player*2-this.battle.players+1),this.layer.height/2-60,title.length*9+60,40,10)
                this.layer.rect(this.layer.width/2+225*(this.player*2-this.battle.players+1),this.layer.height/2+60,120,40,10)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(20)
                this.layer.text(title,this.layer.width/2+225*(this.player*2-this.battle.players+1),this.layer.height/2-60)
                this.layer.text('Skip',this.layer.width/2+225*(this.player*2-this.battle.players+1),this.layer.height/2+60)
                for(let a=0,la=this.colors.length;a<la;a++){
                    displayMtgManaSymbol(this.layer,this.layer.width/2+27.5-la*27.5+a*55+225*(this.player*2-this.battle.players+1),this.layer.height/2,this.colors[a],0,this.fade*2,1)
                }
                this.layer.strokeJoin(MITER)
            break
            case 17:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2,this.layer.height/2,this.args[1]*120+40,200,10)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                this.layer.text(`Select Ability`,this.layer.width/2,this.layer.height/2-70)
                for(let a=0,la=this.cards.length;a<la;a++){
                    this.cards[a].fade=1
                    this.cards[a].anim={select:0,afford:1}
                    this.cards[a].display()
                }
            break
            case 18:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2,this.layer.height/2-25,360,160,10)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                this.layer.text('Select Combat Class',this.layer.width/2,this.layer.height/2-75)
                for(let a=0,la=2;a<la;a++){
                    this.layer.noStroke()
                    this.layer.fill(120,this.fade)
                    this.layer.rect(this.layer.width/2,this.layer.height/2-25+a*50,340,40,10)
                    this.layer.fill(0,this.fade)
                    this.layer.noStroke()
                    this.layer.textSize(18)
                    this.layer.text(['Enemy','Elite'][a],this.layer.width/2,this.layer.height/2-25+a*50)
                }
            break
            case 19:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2,this.layer.height/2,280,200,10)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                this.layer.text(`Select Service`,this.layer.width/2,this.layer.height/2-70)
                this.layer.strokeWeight(5)
                this.layer.fill(225,150,150)
                this.layer.stroke(200,125,125)
                this.layer.rect(this.layer.width/2-60,this.layer.height/2+20,90,120,5)
                this.layer.fill(150,225,150)
                this.layer.stroke(125,200,125)
                this.layer.rect(this.layer.width/2+60,this.layer.height/2+20,90,120,5)
                this.layer.noStroke()
                this.layer.fill(0)
                this.layer.textSize(10)
                this.layer.text('Remove Card',this.layer.width/2-60,this.layer.height/2+20)
                this.layer.text('Deluxe Upgrade',this.layer.width/2+60,this.layer.height/2+20)
            break
            case 20:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2-30,240,300,10)
                this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2+145,120,40,10)
                this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2+190,120,40,10)
                this.layer.fill(120,this.fade)
                this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2+40,120,40,10)
                this.layer.rect(this.layer.width/2+225*this.posKey-85,this.layer.height/2+40,30,30,10)
                this.layer.rect(this.layer.width/2+225*this.posKey+85,this.layer.height/2+40,30,30,10)
                this.layer.rect(this.layer.width/2+225*this.posKey,this.layer.height/2+90,120,40,10)
                this.layer.rect(this.layer.width/2+225*this.posKey-85,this.layer.height/2+90,30,30,10)
                this.layer.rect(this.layer.width/2+225*this.posKey+85,this.layer.height/2+90,30,30,10)
                this.layer.fill(60,this.fade)
                regTriangle(this.layer,this.layer.width/2+225*this.posKey-85,this.layer.height/2+39,8,8,0)
                regTriangle(this.layer,this.layer.width/2+225*this.posKey+85,this.layer.height/2+41,8,8,60)
                regTriangle(this.layer,this.layer.width/2+225*this.posKey-85,this.layer.height/2+89,8,8,0)
                regTriangle(this.layer,this.layer.width/2+225*this.posKey+85,this.layer.height/2+91,8,8,60)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                this.layer.text(`Design Pod`,this.layer.width/2+225*this.posKey,this.layer.height/2-150)
                this.layer.textSize(20)
                this.layer.text(`Purchase`,this.layer.width/2+225*this.posKey,this.layer.height/2+145)
                this.layer.text(`Cancel`,this.layer.width/2+225*this.posKey,this.layer.height/2+190)
                this.layer.textSize(8)
                this.layer.text(`${this.cost} Currency`,this.layer.width/2+225*this.posKey,this.layer.height/2+160)
                this.layer.fill(0,this.fade)
                this.layer.textSize(16)
                this.layer.text(`Damage`,this.layer.width/2+225*this.posKey,this.layer.height/2+40)
                this.layer.text(`Block`,this.layer.width/2+225*this.posKey,this.layer.height/2+90)
                this.card.fade=1
                this.card.anim.afford=1
                this.card.display()
            break
            case 21:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2,this.layer.height/2-150+floor(constants.playerNumber/2)*20,360,60+floor(constants.playerNumber/2)*40,10)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                this.layer.text('Select Disguise Target',this.layer.width/2,this.layer.height/2-150)
                for(let a=0,la=constants.playerNumber;a<la;a++){
                    this.layer.noStroke()
                    this.layer.fill(120,this.fade)
                    this.layer.rect(this.layer.width/2-85+a%2*170,this.layer.height/2-110+floor(a/2)*40,160,30,10)
                    this.layer.fill(0,this.fade)
                    this.layer.noStroke()
                    this.layer.textSize(16)
                    this.layer.text(types.combatant[a+1].name,this.layer.width/2-85+a%2*170,this.layer.height/2-110+floor(a/2)*40)
                }
            break
            case 22:
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
                this.battle.relicManager.display('all',[this.args[1],this.page])
            break
            case 23:
                this.layer.fill(160,this.fade*0.8)
                this.layer.rect(this.layer.width/2,this.layer.height/2-45,160,60,10)
                this.layer.rect(this.layer.width/2,this.layer.height/2+10,100,40,10)
                this.layer.rect(this.layer.width/2,this.layer.height/2+55,100,40,10)
                this.layer.fill(0,this.fade*0.8)
                this.layer.textSize(30)
                this.layer.text('Save?',this.layer.width/2,this.layer.height/2-45)
                this.layer.textSize(20)
                this.layer.text('Yes',this.layer.width/2,this.layer.height/2+10)
                this.layer.text('No',this.layer.width/2,this.layer.height/2+55)
            break
            
        }
    }
    update(first,firstType){
        this.fade=smoothAnim(this.fade,this.active&&(first==-1||firstType==this.type&&(this.type==1||this.type==4||this.type==16||this.type==20)),0,1,5)
        if(this.activeTimer>0){
            this.activeTimer--
            if(this.activeTimer<=0){
                this.active=false
            }
        }
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
                                continue
                            }
                        }else{
                            if(this.rewards[a].fade<1){
                                this.rewards[a].fade+=0.2
                            }
                            if(this.rewards[a].position>a*50){
                                this.rewards[a].position-=10
                            }
                        }
                        if(this.rewards[a].type==2){
                            this.rewards[a].relic.update(this.rewards[a].usable,0,inputs,{x:this.layer.width/2+225*this.posKey-40,y:this.layer.height/2-105+this.rewards[a].position})
                            this.rewards[a].relic.size=this.rewards[a].fade*0.8
                        }else if(this.rewards[a].type==3){
                            this.rewards[a].item.update(this.rewards[a].usable,0,inputs,false)
                            this.rewards[a].item.size=this.rewards[a].fade*0.8
                        }
                    }
                    if(this.rewards.length<=0&&!this.battle.overlayManager.overlays[3].active&&this.active){
                        this.active=false
                    }
                break
                case 2:
                    switch(this.args[0]){
                        case 0: case 6: case 9: case 18: case 22: case 25: case 30: case 45: case 58: case 60:
                        case 63: case 74: case 94: case 95: case 96:
                            this.page=constrain(this.page,0,ceil(this.battle.cardManagers[this.player].reserve.cards.length/15)-1)
                        break
                        case 1: case 5: case 11: case 19: case 21: case 31: case 34: case 39: case 40: case 42:
                        case 46: case 52: case 77: case 79:
                            this.page=constrain(this.page,0,ceil(this.battle.cardManagers[this.player].discard.cards.length/15)-1)
                        break
                        case 2: case 3: case 4: case 7: case 8: case 10: case 17: case 26: case 27: case 28:
                        case 29: case 32: case 33: case 35: case 37: case 38: case 43: case 50: case 51: case 57:
                        case 64: case 65: case 66: case 67: case 68: case 69: case 70: case 72: case 76: case 78:
                        case 83: case 86: case 87: case 89: case 90: case 91: case 92: case 93:
                            this.page=constrain(this.page,0,ceil(this.battle.cardManagers[this.player].deck.cards.length/15)-1)
                        break
                        case 12: case 97:
                            this.page=constrain(this.page,0,ceil(this.battle.cardManagers[this.player].exhaust.cards.length/15)-1)
                        break
                        case 71: case 88:
                            this.page=constrain(this.page,0,ceil(this.battle.cardManagers[this.player].remove.cards.length/15)-1)
                        break
                        case 13: case 14: case 15: case 16: case 62:
                            this.page=constrain(this.page,0,ceil(this.battle.cardManagers[this.player].reserve.sorted.length/15)-1)
                        break
                        case 20: case 23:
                            this.page=0
                        break
                        case 41: case 44: case 47: case 48: case 49: case 59: case 73: case 80: case 84: case 85:
                            this.page=constrain(this.page,0,ceil(this.args[1]/15)-1)
                        break
                        case 24:
                            this.page=constrain(this.page,0,ceil(this.battle.tierManager.tiers[this.args[1]].cards.length/15)-1)
                        break
                        case 53: case 54: case 55: case 56: case 61: case 75:
                            this.page=constrain(this.page,0,ceil(this.battle.cardManagers[this.player].deck.sorted.length/15)-1)
                        break
                        case 36: case 81: case 82:
                            this.page=constrain(this.page,0,ceil(this.battle.cardManagers[this.player].deck.finalPosition/15)-1)
                        break
                    }
                    switch(this.args[0]){
                        case 0: case 6: case 9: case 13: case 14: case 15: case 16: case 18: case 20: case 22:
                        case 23: case 25: case 30: case 41: case 44: case 45: case 47: case 48: case 49: case 58:
                        case 59: case 60: case 62: case 63: case 73: case 74: case 80: case 84: case 85: case 94:
                        case 95: case 96:
                            this.battle.cardManagers[this.player].reserve.update('overlay',[this.page])
                        break
                        case 1: case 5: case 11: case 19: case 21: case 31: case 34: case 39: case 40: case 42:
                        case 46: case 52: case 77: case 79:
                            this.battle.cardManagers[this.player].discard.update('overlay',[this.page])
                        break
                        case 2: case 3: case 4: case 7: case 8: case 10: case 17: case 26: case 27: case 28:
                        case 29: case 32: case 33: case 35: case 36: case 37: case 38: case 43: case 50: case 51:
                        case 53: case 54: case 55: case 56: case 57: case 61: case 64: case 65: case 66: case 67:
                        case 68: case 69: case 70: case 72: case 75: case 76: case 78: case 81: case 82: case 83:
                        case 86: case 87: case 89: case 90: case 91: case 92: case 93:
                            this.battle.cardManagers[this.player].deck.update('overlay',[this.page])
                        break
                        case 12: case 97:
                            this.battle.cardManagers[this.player].exhaust.update('overlay',[this.page])
                        break
                        case 71: case 88:
                            this.battle.cardManagers[this.player].remove.update('overlay',[this.page])
                        break
                        case 24:
                            this.battle.tierManager.tiers[this.args[1]].update('overlay',[this.page])
                        break
                    }
                    switch(this.args[0]){
                        case 0: case 6: case 9: case 13: case 14: case 15: case 16: case 18: case 20: case 22:
                        case 23: case 25: case 30: case 41: case 44: case 45: case 47: case 48: case 49: case 58:
                        case 59: case 60: case 62: case 63: case 73: case 74: case 80: case 84: case 85: case 94:
                        case 95: case 96:
                            for(let a=0,la=this.battle.cardManagers[this.player].reserve.cards.length;a<la;a++){
                                this.battle.cardManagers[this.player].reserve.cards[a].size=constrain(this.battle.cardManagers[this.player].reserve.cards[a].size,0,this.fade)
                            }
                        break
                        case 1: case 5: case 11: case 19: case 21: case 31: case 34: case 39: case 40: case 42:
                        case 46: case 52: case 77: case 79:
                            for(let a=0,la=this.battle.cardManagers[this.player].discard.cards.length;a<la;a++){
                                this.battle.cardManagers[this.player].discard.cards[a].size=constrain(this.battle.cardManagers[this.player].discard.cards[a].size,0,this.fade)
                            }
                        break
                        case 2: case 3: case 4: case 7: case 8: case 10: case 17: case 26: case 27: case 28:
                        case 29: case 32: case 33: case 35: case 36: case 37: case 38: case 43: case 50: case 51:
                        case 53: case 54: case 55: case 56: case 57: case 61: case 64: case 65: case 66: case 67:
                        case 68: case 69: case 70: case 72: case 75: case 76: case 78: case 81: case 82: case 83:
                        case 86: case 87: case 89: case 90: case 91: case 92: case 93:
                            for(let a=0,la=this.battle.cardManagers[this.player].deck.cards.length;a<la;a++){
                                this.battle.cardManagers[this.player].deck.cards[a].size=constrain(this.battle.cardManagers[this.player].deck.cards[a].size,0,this.fade)
                            }
                        break
                        case 12: case 97:
                            for(let a=0,la=this.battle.cardManagers[this.player].exhaust.cards.length;a<la;a++){
                                this.battle.cardManagers[this.player].exhaust.cards[a].size=constrain(this.battle.cardManagers[this.player].exhaust.cards[a].size,0,this.fade)
                            }
                        break
                        case 71: case 88:
                            for(let a=0,la=this.battle.cardManagers[this.player].remove.cards.length;a<la;a++){
                                this.battle.cardManagers[this.player].remove.cards[a].size=constrain(this.battle.cardManagers[this.player].remove.cards[a].size,0,this.fade)
                            }
                        break
                        case 24:
                            for(let a=0,la=this.battle.tierManager.tiers[this.args[1]].cards.length;a<la;a++){
                                this.battle.tierManager.tiers[this.args[1]].cards[a].size=constrain(this.battle.tierManager.tiers[this.args[1]].cards[a].size,0,this.fade)
                            }
                        break
                    }
                    switch(this.args[0]){
                        case 3: case 17: case 43: case 75: case 77: case 89: case 91:
                            this.card.size=constrain(smoothAnim(this.card.size,this.card.page==this.page,0,this.fade,5),0,this.fade)
                        break
                    }
                break
                case 3: case 9: case 17:
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
                case 20:
                    this.card.size=constrain(smoothAnim(this.card.size,this.active,0,this.fade,5),0,this.fade)
                break
                case 22:
                    this.battle.relicManager.update('all',[this.active,this.page,this.args[1]])
                break
            }
        }else if(!this.active){
            switch(this.type){
                case 1:
                    this.rewards=[]
                break
            }
        }
    }
    onClick(){
        if(this.active&&this.activeTimer<=0){
            switch(this.type){
                case 1:
                    for(let a=0,la=this.rewards.length;a<la;a++){
                        if(this.rewards[a].usable){
                            if(this.battle.players==2&&this.rewards[a].type==0&&pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+170*this.posKey,y:this.layer.height/2-105+this.rewards[a].position},width:30,height:30})){
                                this.rewards[a].usable=false
                                this.battle.overlayManager.overlays[this.index][this.battle.players-1-this.player].active=true
                                this.battle.overlayManager.overlays[this.index][this.battle.players-1-this.player].activate([1,[{type:0,value:this.rewards[a].value}]])
                            }else if(this.battle.players==2&&this.rewards[a].type==2&&pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+140*this.posKey,y:this.layer.height/2-105+this.rewards[a].position},width:30,height:30})){
                                this.rewards[a].usable=false
                                this.battle.overlayManager.overlays[this.index][this.battle.players-1-this.player].active=true
                                this.battle.overlayManager.overlays[this.index][this.battle.players-1-this.player].activate([1,[{type:2,value:[],key:this.rewards[a].relic.type}]])
                            }else if(this.battle.players==2&&this.rewards[a].type==3&&pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+140*this.posKey,y:this.layer.height/2-105+this.rewards[a].position},width:30,height:30})){
                                this.rewards[a].usable=false
                                this.battle.overlayManager.overlays[this.index][this.battle.players-1-this.player].active=true
                                this.battle.overlayManager.overlays[this.index][this.battle.players-1-this.player].activate([1,[{type:3,value:[],key:this.rewards[a].item.type}]])
                            }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+225*this.posKey,y:this.layer.height/2-105+this.rewards[a].position},width:200,height:40})){
                                this.rewards[a].usable=false
                                this.execute(this.rewards[a])
                            }
                        }
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+225*this.posKey,y:this.layer.height/2-205},width:120,height:40})){
                        this.active=false
                        this.battle.combatantManager.clearBlockCombatants()
                        this.battle.combatantManager.clearStatusCombatants()
                        for(let a=0,la=this.rewards.length;a<la;a++){
                            switch(this.rewards[a].type){
                                case 1:
                                    this.battle.relicManager.activate(8,[this.player])
                                break
                                case 2:
                                    this.battle.relicManager.listing.relic[this.rewards[a].relic.rarity].push(this.rewards[a].relic.type)
                                break
                            }
                            this.rewards[a].usable=false
                        }
                    }
                    /*if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+225*this.posKey,y:this.layer.height/2-250},width:120,height:40})&&this.args[0]==0){
                        this.battle.replay()
                    }*/
                break
                case 2:
                    if(this.args[0]==24){
                        if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-285,y:this.layer.height/2},width:40,height:40})&&this.page>0){
                            this.page--
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+285,y:this.layer.height/2},width:40,height:40})&&this.page<ceil(this.battle.tierManager.tiers[this.args[1]].cards.length/15)-1){
                            this.page++
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2+225},width:120,height:40})){
                            this.active=false
                        }
                    }else{
                        if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-285,y:this.layer.height/2},width:40,height:40})&&this.page>0){
                            this.page--
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+285,y:this.layer.height/2},width:40,height:40})&&(
                            this.page<ceil(this.battle.cardManagers[this.player].reserve.cards.length/15)-1&&(
                                this.args[0]==0||this.args[0]==6||this.args[0]==9||this.args[0]==18||this.args[0]==22||
                                this.args[0]==25||this.args[0]==30||this.args[0]==45||this.args[0]==58||this.args[0]==60||
                                this.args[0]==63||this.args[0]==74||this.args[0]==94||this.args[0]==95
                            )||
                            this.page<ceil(this.battle.cardManagers[this.player].discard.cards.length/15)-1&&(
                                this.args[0]==1||this.args[0]==5||this.args[0]==11||this.args[0]==19||this.args[0]==21||
                                this.args[0]==31||this.args[0]==34||this.args[0]==39||this.args[0]==40||this.args[0]==42||
                                this.args[0]==46||this.args[0]==52||this.args[0]==77||this.args[0]==79
                            )||
                            this.page<ceil(this.battle.cardManagers[this.player].deck.cards.length/15)-1&&(
                                this.args[0]==2||this.args[0]==3||this.args[0]==4||this.args[0]==7||this.args[0]==8||
                                this.args[0]==10||this.args[0]==17||this.args[0]==26||this.args[0]==27||this.args[0]==28||
                                this.args[0]==29||this.args[0]==32||this.args[0]==33||this.args[0]==35||this.args[0]==37||
                                this.args[0]==38||this.args[0]==43||this.args[0]==50||this.args[0]==51||this.args[0]==57||
                                this.args[0]==64||this.args[0]==65||this.args[0]==66||this.args[0]==67||this.args[0]==68||
                                this.args[0]==69||this.args[0]==70||this.args[0]==72||this.args[0]==76||this.args[0]==78||
                                this.args[0]==83||this.args[0]==86||this.args[0]==87||this.args[0]==89||this.args[0]==90||
                                this.args[0]==91
                            )||
                            this.page<ceil(this.battle.cardManagers[this.player].exhaust.cards.length/15)-1&&(
                                this.args[0]==12
                            )||
                            this.page<ceil(this.battle.cardManagers[this.player].remove.cards.length/15)-1&&(
                                this.args[0]==71||this.args[0]==88
                            )||
                            this.page<ceil(this.battle.cardManagers[this.player].deck.sorted.length/15)-1&&(
                                this.args[0]==53||this.args[0]==54||this.args[0]==55||this.args[0]==56||this.args[0]==61
                            )||
                            this.page<ceil(this.battle.cardManagers[this.player].reserve.sorted.length/15)-1&&(
                                this.args[0]==13||this.args[0]==14||this.args[0]==15||this.args[0]==16||this.args[0]==62
                            )||
                            this.page<ceil(this.args[1]/15)-1&&(
                                this.args[0]==41||this.args[0]==44||this.args[0]==47||this.args[0]==48||this.args[0]==49||
                                this.args[0]==59||this.args[0]==73||this.args[0]==80||this.args[0]==84||this.args[0]==85
                            )||
                            this.page<ceil(this.battle.cardManagers[this.player].deck.finalPosition/15)-1&&(
                                this.args[0]==36||this.args[0]==81||this.args[0]==82||this.args[0]==92||this.args[0]==93
                            )
                        )){
                            this.page++
                        }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2+225},width:120,height:40})&&this.args[0]!=87&&this.args[0]!=88){
                            this.active=false
                            this.execute()
                        }
                    }
                    switch(this.args[0]){
                        case 1:
                            for(let a=0,la=this.battle.cardManagers[this.player].discard.cards.length;a<la;a++){
                                if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].discard.cards[a])&&this.battle.cardManagers[this.player].discard.cards[a].size>0.5){
                                    switch(this.battle.cardManagers[this.player].discard.cards[a].attack){
                                        case 5288:
                                            this.battle.cardManagers[this.player].hand.selfCall(6,[5288,this.battle.cardManagers[this.player].discard.cards[a].effect,1,this.battle.cardManagers[this.player].discard.cards[a].target])
                                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.args[1]==1?this.battle.players-1-this.player:this.player].reserve.cards,a,a+1,1)
                                            a--
                                            la--
                                            this.active=false
                                        break
                                    }
                                }
                            }
                        break
                        case 3: case 4: case 7: case 8: case 10: case 17: case 26: case 27: case 28: case 29:
                        case 32: case 33: case 35: case 36: case 37: case 38: case 43: case 50: case 51: case 53:
                        case 54: case 55: case 56: case 57: case 61: case 64: case 65: case 66: case 67: case 68:
                        case 69: case 70: case 72: case 75: case 76: case 78: case 81: case 82: case 83: case 86:
                        case 87: case 89: case 90: case 91: case 92: case 93:
                            switch(this.args[0]){
                                case 3: case 17: case 43: case 75: case 89: case 91:
                                    this.card=new card(this.layer,this.battle,this.player,-100,-100,0,0,variants.mtg?[]:0,0)
                                break
                            }
                            for(let a=0,la=this.battle.cardManagers[this.player].deck.cards.length;a<la;a++){
                                if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].deck.cards[a])&&this.battle.cardManagers[this.player].deck.cards[a].size>0.5&&this.battle.cardManagers[this.player].deck.cards[a].select&&
                                    !((this.args[0]==3||this.args[0]==17||this.args[0]==26||this.args[0]==91)&&this.battle.cardManagers[this.player].deck.cards[a].spec.includes(37))&&
                                    !(this.args[0]==3&&this.battle.cardManagers[this.player].deck.cards[a].level>=1&&!this.battle.cardManagers[this.player].deck.cards[a].spec.includes(53))&&
                                    !((this.args[0]==10||this.args[0]==53||this.args[0]==54||this.args[0]==55||this.args[0]==56||this.args[0]==61)&&(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(3)||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(12)))&&
                                    !(this.args[0]==17&&this.battle.cardManagers[this.player].deck.cards[a].level>=2&&!this.battle.cardManagers[this.player].deck.cards[a].spec.includes(53))&&
                                    !(this.args[0]==43&&this.battle.cardManagers[this.player].deck.cards[a].base.cost<=0)&&
                                    !(this.args[0]==36&&this.battle.cardManagers[this.player].deck.cards[a].rarity!=0)&&
                                    !((this.args[0]==50||this.args[0]==66)&&!this.battle.cardManagers[this.player].deck.cards[a].basic)&&
                                    !(this.args[0]==51&&this.battle.cardManagers[this.player].deck.cards[a].color==0)&&
                                    !(this.args[0]==67&&this.battle.cardManagers[this.player].deck.cards[a].basic)&&
                                    !(this.args[0]==68&&(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(4)||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(12)))&&
                                    !(this.args[0]==69&&(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(1)||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(12)||this.battle.cardManagers[this.player].deck.cards[a].class==4))&&
                                    !(this.args[0]==70&&specialCost(this.battle.cardManagers[this.player].deck.cards[a]))&&
                                    !(this.args[0]==75&&this.battle.cardManagers[this.player].deck.cards[a].getCost(0)<0)&&
                                    !(this.args[0]==83&&(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(63)||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(12)))&&
                                    !(this.args[0]==32&&this.battle.cardManagers[this.player].deck.cards[a].edition==1)&&
                                    !(this.args[0]==33&&this.battle.cardManagers[this.player].deck.cards[a].edition==4)&&
                                    !(this.args[0]==35&&this.battle.cardManagers[this.player].deck.cards[a].edition==5)&&
                                    !(this.args[0]==64&&this.battle.cardManagers[this.player].deck.cards[a].edition==2)&&
                                    !(this.args[0]==65&&this.battle.cardManagers[this.player].deck.cards[a].edition==6)&&
                                    !(this.args[0]==86&&this.battle.cardManagers[this.player].deck.cards[a].edition==8)&&
                                    !(this.args[0]==90&&(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(65)||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(12)))
                                ){
                                    this.battle.cardManagers[this.player].deck.cards[a].select=false
                                    let size=this.battle.cardManagers[this.player].deck.cards[a].size
                                    let complete=true
                                    let breakAfter=false
                                    let rarity=this.battle.cardManagers[this.player].deck.cards[a].rarity
                                    let basic=this.battle.cardManagers[this.player].deck.cards[a].basic
                                    let type=this.battle.cardManagers[this.player].deck.cards[a].type
                                    let cardClass=this.battle.cardManagers[this.player].deck.cards[a].class
                                    let edition=this.battle.cardManagers[this.player].deck.cards[a].edition
                                    switch(this.args[0]){
                                        case 3: case 17:
                                            this.battle.cardManagers[this.player].deck.cards[a]=upgradeCard(this.battle.cardManagers[this.player].deck.cards[a])
                                            if(this.args[0]==17&&this.battle.relicManager.hasRelic(233,this.player)&&this.battle.cardManagers[this.player].deck.cards[a].edition==0){
                                                this.battle.cardManagers[this.player].deck.cards[a].edition=floor(random(1,7))
                                            }
                                            this.activated++
                                            complete=this.activated>=this.args[1]
                                            breakAfter=true
                                        break
                                        case 4: case 67: case 81: case 87: case 92:
                                            if(this.args[2]==4){
                                                this.base=copyCard(this.battle.cardManagers[this.player].deck.cards[a])
                                            }
                                            if(this.battle.cardManagers[this.player].deck.remove(a)){
                                                this.battle.relicManager.activate(11,[this.player,cardClass])
                                                a--
                                                la--
                                                this.activated++
                                                complete=this.activated>=this.args[1]
                                                breakAfter=true
                                                switch(this.args[2]){
                                                    case 1:
                                                        this.battle.eventManagers[this.player].page=basic||cardClass==6?3:rarity==2?6:rarity==1?5:4
                                                    break
                                                    case 2:
                                                        this.battle.cardManagers[this.player].deck.removeAbstract(0,[type])
                                                    break
                                                    case 3:
                                                        if(edition!=0){
                                                            this.battle.cardManagers[this.player].randomEffect(0,30,[edition])
                                                        }
                                                    break
                                                    case 4:
                                                        this.battle.relicManager.detail[465][this.player][1]=this.base
                                                    break
                                                }
                                            }else{
                                                complete=false
                                            }
                                        break
                                        case 7: case 66: case 82: case 93:
                                            this.battle.cardManagers[this.player].deck.cards[a]=this.battle.cardManagers[this.player].transformCard(this.battle.cardManagers[this.player].deck.cards[a])
                                            this.battle.cardManagers[this.player].deck.cards[a].callAddEffect()
                                            this.battle.cardManagers[this.player].deck.cards.forEach(card=>card.callAnotherAddEffect())
                                            this.activated++
                                            complete=false
                                            this.activeTimer=this.activated>=this.args[1]?30:0
                                            if(this.args[2]==1&&this.battle.cardManagers[this.player].deck.cards[a].level==0){
                                                this.battle.cardManagers[this.player].deck.cards[a]=upgradeCard(this.battle.cardManagers[this.player].deck.cards[a])
                                            }
                                            breakAfter=true
                                        break
                                        case 8:
                                            this.battle.cardManagers[this.player].deck.copySelf(a)
                                        break
                                        case 10: case 53: case 54: case 55: case 56: case 61:
                                            if(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(3)){
                                                complete=false
                                            }else{
                                                this.battle.cardManagers[this.player].deck.cards[a].spec.push(3)
                                                this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.push(3)
                                                if(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(47)){
                                                    this.battle.cardManagers[this.player].deck.cards[a].spec.splice(this.battle.cardManagers[this.player].deck.cards[a].spec.indexOf(47))
                                                }
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
                                            this.battle.cardManagers[this.player].deck.copy(this.battle.cardManagers[this.player].hand.cards,a,a+1,0)
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
                                            }else{
                                                complete=false
                                            }
                                        break
                                        case 29: case 50:
                                            this.battle.cardManagers[this.player].deck.cards[a].edition=floor(random(1,7))
                                        break
                                        case 32:
                                            this.battle.cardManagers[this.player].deck.cards[a].edition=1
                                        break
                                        case 33:
                                            this.battle.cardManagers[this.player].deck.cards[a].edition=4
                                        break
                                        case 35:
                                            this.battle.cardManagers[this.player].deck.cards[a].edition=5
                                        break
                                        case 36:
                                            this.battle.cardManagers[this.player].deck.copySelf(a)
                                            this.battle.cardManagers[this.player].deck.copySelf(a)
                                        break
                                        case 37:
                                            if(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(47)){
                                                complete=false
                                            }else{
                                                this.battle.cardManagers[this.player].deck.cards[a].spec.push(47)
                                                this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.push(47)
                                                if(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(3)){
                                                    this.battle.cardManagers[this.player].deck.cards[a].spec.splice(this.battle.cardManagers[this.player].deck.cards[a].spec.indexOf(3))
                                                }
                                            }
                                        break
                                        case 38:
                                            this.battle.cardManagers[this.player].deck.cards[a].edition=2
                                            this.battle.cardManagers[this.player].deck.copySelf(a)
                                            this.battle.cardManagers[this.player].deck.copySelf(a)
                                        break
                                        case 43: case 89:
                                            this.battle.cardManagers[this.player].deck.cards[a].costDown(3,[1])
                                        break
                                        case 51:
                                            this.battle.cardManagers[this.player].deck.cards[a].color=variants.mtg?[0]:0
                                            this.battle.cardManagers[this.player].deck.cards[a].setColorDetail()
                                            if(variants.mtg&&!this.battle.cardManagers[this.player].deck.cards[a].specialCost){
                                                for(let b=0,lb=this.battle.cardManagers[this.player].deck.cards[a].cost.length;b<lb;b++){
                                                    if(this.battle.cardManagers[this.player].deck.cards[a].cost[b]>=1){
                                                        this.battle.cardManagers[this.player].deck.cards[a].cost[b]=0
                                                    }
                                                }
                                            }
                                        break
                                        case 57:
                                            this.battle.cardManagers[this.player].deck.cards[a].edition=4
                                            this.battle.cardManagers[this.player].deck.copySelf(a)
                                            this.battle.cardManagers[this.player].deck.copySelf(a)
                                        break
                                        case 64:
                                            this.battle.cardManagers[this.player].deck.cards[a].edition=2
                                        break
                                        case 65:
                                            this.battle.cardManagers[this.player].deck.cards[a].edition=6
                                        break
                                        case 68:
                                            if(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(4)){
                                                complete=false
                                            }else{
                                                this.battle.cardManagers[this.player].deck.cards[a].spec.push(4)
                                                this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.push(4)
                                            }
                                        break
                                        case 69:
                                            if(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(1)){
                                                complete=false
                                            }else{
                                                this.battle.cardManagers[this.player].deck.cards[a].spec.push(1)
                                                this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.push(1)
                                            }
                                        break
                                        case 70:
                                            if(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(58)){
                                                complete=false
                                            }else{
                                                this.battle.cardManagers[this.player].deck.cards[a].spec.push(58)
                                                this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.push(58)
                                                this.battle.cardManagers[this.player].deck.cards[a].updateSpecialCost()
                                            }
                                        break
                                        case 72:
                                            if(this.battle.cardManagers[this.player].deck.smooshNeg(a)){
                                                la--
                                                a--
                                            }else{
                                                complete=false
                                            }
                                        break
                                        case 75:
                                            this.battle.cardManagers[this.player].deck.cards[a].doubleBoth()
                                            this.battle.cardManagers[this.player].deck.cards[a].spec.push(61)
                                            this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.push(61)
                                        break
                                        case 76:
                                            this.battle.cardManagers[this.player].deck.copySelfAbstract(a,0)
                                        break
                                        case 78:
                                            this.battle.cardManagers[this.player].deck.cards[a]=upgradeCard(upgradeCard(this.battle.cardManagers[this.player].transformCardPrism(this.battle.cardManagers[this.player].deck.cards[a])))
                                            this.battle.cardManagers[this.player].deck.cards[a].edition=floor(random(1,7))
                                            this.battle.cardManagers[this.player].deck.cards[a].callAddEffect()
                                            this.battle.cardManagers[this.player].deck.cards.forEach(card=>card.callAnotherAddEffect())
                                            complete=false
                                            this.activeTimer=30
                                            if(this.args[1]==1&&this.battle.cardManagers[this.player].deck.cards[a].level==0){
                                                this.battle.cardManagers[this.player].deck.cards[a]=upgradeCard(this.battle.cardManagers[this.player].deck.cards[a])
                                            }
                                        break
                                        case 83:
                                            if(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(63)){
                                                complete=false
                                            }else if(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(62)){
                                                this.battle.cardManagers[this.player].deck.cards[a].spec.push(63)
                                                this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.push(63)
                                                this.battle.cardManagers[this.player].deck.cards[a].spec.splice(this.battle.cardManagers[this.player].deck.cards[a].spec.indexOf(62),1)
                                                this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.splice(this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.indexOf(62),1)
                                            }else{
                                                this.battle.cardManagers[this.player].deck.cards[a].spec.push(62)
                                                this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.push(62)
                                            }
                                        break
                                        case 86:
                                            this.battle.cardManagers[this.player].deck.cards[a].edition=8
                                        break
                                        case 90:
                                            if(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(65)){
                                                complete=false
                                            }else{
                                                this.battle.cardManagers[this.player].deck.cards[a].spec.push(65)
                                                this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.push(65)
                                                this.activated++
                                                complete=this.activated>=this.args[1]
                                            }
                                        break
                                        case 91:
                                            if(this.battle.cardManagers[this.player].deck.cards[a].level<1||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(53)){
                                                this.battle.cardManagers[this.player].deck.cards[a]=upgradeCard(this.battle.cardManagers[this.player].deck.cards[a])
                                            }
                                            this.battle.cardManagers[this.player].deck.copySelf(a)
                                            this.activated++
                                            complete=this.activated>=this.args[1]
                                        break

                                    }
                                    this.active=!complete
                                    if(breakAfter){
                                        break
                                    }
                                    this.battle.cardManagers[this.player].deck.cards[a].size=size
                                }
                                if(a>=0&&a<la&&this.activeTimer<=0){
                                    this.battle.cardManagers[this.player].deck.cards[a].select=false
                                    if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].deck.cards[a])&&this.battle.cardManagers[this.player].deck.cards[a].size>0.5&&this.active&&
                                        !((this.args[0]==3||this.args[0]==17||this.args[0]==26||this.args[0]==91)&&this.battle.cardManagers[this.player].deck.cards[a].spec.includes(37))&&
                                        !(this.args[0]==3&&this.battle.cardManagers[this.player].deck.cards[a].level>=1&&!this.battle.cardManagers[this.player].deck.cards[a].spec.includes(53))&&
                                        !((this.args[0]==10||this.args[0]==53||this.args[0]==54||this.args[0]==55||this.args[0]==56||this.args[0]==61)&&(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(3)||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(12)))&&
                                        !(this.args[0]==17&&this.battle.cardManagers[this.player].deck.cards[a].level>=2&&!this.battle.cardManagers[this.player].deck.cards[a].spec.includes(53))&&
                                        !(this.args[0]==36&&this.battle.cardManagers[this.player].deck.cards[a].rarity!=0)&&
                                        !(this.args[0]==43&&this.battle.cardManagers[this.player].deck.cards[a].base.cost<=0)&&
                                        !((this.args[0]==50||this.args[0]==66)&&!this.battle.cardManagers[this.player].deck.cards[a].basic)&&
                                        !(this.args[0]==51&&this.battle.cardManagers[this.player].deck.cards[a].color==0)&&
                                        !(this.args[0]==67&&this.battle.cardManagers[this.player].deck.cards[a].basic)&&
                                        !(this.args[0]==68&&(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(4)||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(12)))&&
                                        !(this.args[0]==69&&(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(1)||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(12)||this.battle.cardManagers[this.player].deck.cards[a].class==4))&&
                                        !(this.args[0]==70&&specialCost(this.battle.cardManagers[this.player].deck.cards[a]))&&
                                        !(this.args[0]==75&&this.battle.cardManagers[this.player].deck.cards[a].getCost(0)<0)&&
                                        !(this.args[0]==83&&(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(63)||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(12)))&&
                                        !(this.args[0]==32&&this.battle.cardManagers[this.player].deck.cards[a].edition==1)&&
                                        !(this.args[0]==33&&this.battle.cardManagers[this.player].deck.cards[a].edition==4)&&
                                        !(this.args[0]==35&&this.battle.cardManagers[this.player].deck.cards[a].edition==5)&&
                                        !(this.args[0]==64&&this.battle.cardManagers[this.player].deck.cards[a].edition==2)&&
                                        !(this.args[0]==65&&this.battle.cardManagers[this.player].deck.cards[a].edition==6)&&
                                        !(this.args[0]==86&&this.battle.cardManagers[this.player].deck.cards[a].edition==8)&&
                                        !(this.args[0]==90&&(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(65)||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(12)))
                                    ){
                                        this.battle.cardManagers[this.player].deck.cards[a].select=true
                                        switch(this.args[0]){
                                            case 3: case 17:
                                                this.card=upgradeCard(this.battle.cardManagers[this.player].deck.cards[a])
                                                this.card.nonCalc=true
                                                this.card.page=this.page
                                                this.card.size=1
                                            break
                                            case 43: case 89:
                                                this.card=copyCard(this.battle.cardManagers[this.player].deck.cards[a])
                                                this.card.nonCalc=true
                                                this.card.page=this.page
                                                this.card.size=1
                                                this.card.costDown(3,[1])
                                                this.card.anim.costDown=1
                                            break
                                            case 75:
                                                this.card=copyCard(this.battle.cardManagers[this.player].deck.cards[a])
                                                this.card.doubleBoth()
                                                this.card.nonCalc=true
                                                this.card.page=this.page
                                                this.card.size=1
                                            break
                                            case 91:
                                                if(this.battle.cardManagers[this.player].deck.cards[a].level<1||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(53)){
                                                    this.card=upgradeCard(this.battle.cardManagers[this.player].deck.cards[a])
                                                }
                                                this.card.nonCalc=true
                                                this.card.page=this.page
                                                this.card.size=1
                                            break
                                        }
                                    }
                                }
                            }
                        break
                        case 5: case 11: case 19: case 21: case 31: case 34: case 39: case 40: case 42: case 46:
                        case 52: case 77: case 79:
                            switch(this.args[0]){
                                case 77:
                                    this.card=new card(this.layer,this.battle,this.player,-100,-100,0,0,variants.mtg?[]:0,0)
                                break
                            }
                            for(let a=0,la=this.battle.cardManagers[this.player].discard.cards.length;a<la;a++){
                                if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].discard.cards[a])&&this.battle.cardManagers[this.player].discard.cards[a].size>0.5&&this.battle.cardManagers[this.player].discard.cards[a].select&&
                                    !(this.args[0]==77&&this.battle.cardManagers[this.player].discard.cards[a].spec.includes(37))&&
                                    !(this.args[0]==77&&this.battle.cardManagers[this.player].discard.cards[a].level>=2&&!this.battle.cardManagers[this.player].discard.cards[a].spec.includes(53))
                                ){
                                    this.battle.cardManagers[this.player].discard.cards[a].select=false
                                    let complete=true
                                    switch(this.args[0]){
                                        case 5:
                                            if(this.endAfter){
                                                this.endAfter=false
                                                this.battle.endTurn()
                                            }
                                            if(this.args[1]==1){
                                                this.battle.cardManagers[this.player].discard.cards[a].player=this.battle.players-1-this.battle.cardManagers[this.player].discard.cards[a].player
                                            }
                                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.args[1]==1?this.battle.players-1-this.player:this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                            this.activated++
                                            complete=this.activated>=this.args[2]
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
                                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.block*this.battle.cardManagers[this.player].discard.cards[a].getCost(0))
                                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                        case 31:
                                            this.battle.cardManagers[this.player].discard.generalExhaust(a)
                                            a--
                                            la--
                                            this.activated++
                                            complete=this.activated>=this.args[1]
                                        break
                                        case 34:
                                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,16)
                                            a--
                                            la--
                                        break
                                        case 39:
                                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].activateRewind()
                                            if(this.battle.cardManagers[this.player].discard.cards[a].callRewindEffect()){
                                                this.battle.cardManagers[this.player].discard.generalExhaust(a)
                                            }else{
                                                this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1,15)
                                            }
                                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].activateRewind()
                                            a--
                                            la--
                                        break
                                        case 40:
                                            this.battle.cardManagers[this.player].discard.cards[a]=upgradeCard(upgradeCard(this.battle.cardManagers[this.player].discard.cards[a],true))
                                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].activateRewind()
                                            if(this.battle.cardManagers[this.player].discard.cards[a].callRewindEffect()){
                                                this.battle.cardManagers[this.player].discard.generalExhaust(a)
                                            }else{
                                                this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1,15)
                                            }
                                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].activateRewind()
                                            a--
                                            la--
                                        break
                                        case 42:
                                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].activateRewind()
                                            if(this.battle.cardManagers[this.player].discard.cards[a].callRewindEffect()){
                                                this.battle.cardManagers[this.player].discard.generalExhaust(a)
                                            }else{
                                                this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1,17)
                                            }
                                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].activateRewind()
                                            a--
                                            la--
                                        break
                                        case 46:
                                            this.battle.cardManagers[this.player].discard.generalExhaust(a)
                                            a--
                                            la--
                                            this.activated++
                                            complete=this.activated>=this.args[1]
                                            if(complete){
                                                this.battle.cardManagers[this.player].hand.exhaust(this.args[2])
                                            }
                                        break
                                        case 52:
                                            this.battle.cardManagers[this.player].discard.cards[a]=this.battle.cardManagers[this.player].transformCard(this.battle.cardManagers[this.player].discard.cards[a])
                                            complete=false
                                            this.activeTimer=30
                                        break
                                        case 77:
                                            this.battle.cardManagers[this.player].discard.cards[a]=upgradeCard(this.battle.cardManagers[this.player].discard.cards[a])
                                            this.activated++
                                            complete=this.activated>=this.args[1]
                                        break
                                        case 79:
                                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,20)
                                            a--
                                            la--
                                        break
                                    }
                                    this.active=!complete
                                }
                                if(a>=0&&a<la&&this.activeTimer<=0){
                                    this.battle.cardManagers[this.player].discard.cards[a].select=false
                                    if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].discard.cards[a])&&this.battle.cardManagers[this.player].discard.cards[a].size>0.5&&
                                        !(this.args[0]==77&&this.battle.cardManagers[this.player].discard.cards[a].spec.includes(37))&&
                                        !(this.args[0]==77&&this.battle.cardManagers[this.player].discard.cards[a].level>=2&&!this.battle.cardManagers[this.player].discard.cards[a].spec.includes(53))
                                    ){
                                        this.battle.cardManagers[this.player].discard.cards[a].select=true
                                        switch(this.args[0]){
                                            case 77:
                                                this.card=upgradeCard(this.battle.cardManagers[this.player].discard.cards[a])
                                                this.card.nonCalc=true
                                                this.card.page=this.page
                                                this.card.size=1
                                            break
                                        }
                                    }
                                }
                            }
                        break
                        case 6: case 13: case 14: case 15: case 16: case 18: case 22: case 25: case 30: case 45:
                        case 58: case 60: case 62: case 63: case 74: case 80: case 94: case 95: case 96:
                            for(let a=0,la=this.battle.cardManagers[this.player].reserve.cards.length;a<la;a++){
                                if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].reserve.cards[a])&&this.battle.cardManagers[this.player].reserve.cards[a].size>0.5&&this.battle.cardManagers[this.player].reserve.cards[a].select){
                                    this.battle.cardManagers[this.player].reserve.cards[a].select=false
                                    let complete=true
                                    switch(this.args[0]){
                                        case 6: case 13: case 14: case 15: case 16: case 62:
                                            if(this.args[1]==1){
                                                this.battle.cardManagers[this.player].reserve.cards[a].player=this.battle.players-1-this.battle.cardManagers[this.player].reserve.cards[a].player
                                            }
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.args[1]==1?this.battle.players-1-this.player:this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                            this.activated++
                                            complete=this.activated>=this.args[2]
                                        break
                                        case 18:
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,10)
                                            a--
                                            la--
                                        break
                                        case 22:
                                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.block*this.battle.cardManagers[this.player].reserve.cards[a].getCost(0))
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
                                        case 30: case 80:
                                            this.battle.cardManagers[this.player].reserve.generalExhaust(a)
                                            a--
                                            la--
                                            this.activated++
                                            complete=this.args[0]==80||this.activated>=this.args[1]
                                        break
                                        case 45:
                                            this.battle.cardManagers[this.player].reserve.generalExhaust(a)
                                            a--
                                            la--
                                            this.activated++
                                            complete=this.activated>=this.args[1]
                                            if(complete){
                                                this.battle.overlayManager.overlays[66][this.player].active=true
                                                this.battle.overlayManager.overlays[66][this.player].activate([this.args[2],this.args[3]])
                                            }
                                        break
                                        case 58:
                                            this.battle.cardManagers[this.player].reserve.cards[a]=this.battle.cardManagers[this.player].transformCard(this.battle.cardManagers[this.player].reserve.cards[a])
                                            complete=false
                                            this.activeTimer=30
                                        break
                                        case 60:
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                            for(let b=0,lb=this.args[1];b<lb;b++){
                                                this.battle.cardManagers[this.player].hand.copySelf(this.battle.cardManagers[this.player].hand.cards.length-1)
                                            }
                                        break
                                        case 63:
                                            this.battle.cardManagers[this.player].reserve.copy(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                        break
                                        case 74:
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,4)
                                            a--
                                            la--
                                        break
                                        case 94:
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1,11)
                                        break
                                        case 95:
                                            this.battle.cardManagers[this.player].reserve.copy(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            this.battle.cardManagers[this.player].hand.cards[this.battle.cardManagers[this.player].hand.cards.length-1].edition=2
                                        break
                                        case 96:
                                            if(!this.battle.cardManagers[this.player].reserve.cards[a].spec.includes(4)){
                                                this.battle.cardManagers[this.player].reserve.cards[a].spec.push(4)
                                                this.battle.cardManagers[this.player].reserve.cards[a].additionalSpec.push(4)
                                            }
                                            this.battle.cardManagers[this.player].reserve.copySelfShuffleMulti(a,this.args[1])
                                        break
                                    }
                                    this.active=!complete
                                }
                                if(a>=0&&a<la&&this.activeTimer<=0){
                                    this.battle.cardManagers[this.player].reserve.cards[a].select=false
                                    if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].reserve.cards[a])&&this.battle.cardManagers[this.player].reserve.cards[a].size>0.5){
                                        this.battle.cardManagers[this.player].reserve.cards[a].select=true
                                    }
                                }
                            }
                        break
                        case 12:
                            for(let a=0,la=this.battle.cardManagers[this.player].exhaust.cards.length;a<la;a++){
                                if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].exhaust.cards[a])&&this.battle.cardManagers[this.player].exhaust.cards[a].size>0.5&&this.battle.cardManagers[this.player].exhaust.cards[a].select){
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
                                if(a>=0&&a<la&&this.activeTimer<=0){
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
                                if(a>=0&&a<la&&this.activeTimer<=0){
                                    this.battle.cardManagers[this.player].reserve.cards[a].select=false
                                    if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].reserve.cards[a])&&this.battle.cardManagers[this.player].reserve.cards[a].size>0.5){
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
                        case 41: case 44: case 47: case 48: case 49: case 59: case 73: case 84: case 85:
                            for(let a=0,la=min(this.args[1],this.battle.cardManagers[this.player].reserve.cards.length);a<la;a++){
                                if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].reserve.cards[a])&&this.battle.cardManagers[this.player].reserve.cards[a].size>0.5&&this.battle.cardManagers[this.player].reserve.cards[a].select){
                                    this.battle.cardManagers[this.player].reserve.cards[a].select=false
                                    let complete=true
                                    switch(this.args[0]){
                                        case 41: case 48: case 49: case 84:
                                            this.battle.cardManagers[this.player].reserve.cards[a].callScryDiscardEffect()
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].discard.cards,a,a+1)
                                            this.args[1]--
                                            a--
                                            la--
                                            complete=this.args[1]<=0
                                        break
                                        case 44:
                                            this.battle.cardManagers[this.player].reserve.cards[a].setCost(0,[0])
                                            this.battle.cardManagers[this.player].reserve.cards[a].additionalSpec.push(-2)
                                            this.battle.cardManagers[this.player].reserve.cards[a].callScryDiscardEffect()
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].discard.cards,a,a+1)
                                            this.args[1]--
                                            a--
                                            la--
                                            complete=this.args[1]<=0
                                        break
                                        case 47:
                                            this.battle.cardManagers[this.player].reserve.cards[a].callScryDiscardEffect()
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].discard.cards,a,a+1)
                                            this.args[1]--
                                            a--
                                            la--
                                            this.battle.combatantManager.combatants[this.args[3]].statusEffect('Freeze',this.args[2])
                                            complete=this.args[1]<=0
                                        break
                                        case 59:
                                            this.battle.cardManagers[this.player].reserve.cards[a].callScryDiscardEffect()
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].discard.cards,a,a+1)
                                            this.args[1]--
                                            a--
                                            la--
                                            this.battle.combatantManager.randomEnemyEffect(3,[this.args[3],this.args[5]])
                                            complete=this.args[1]<=0
                                        break
                                        case 73:
                                            this.battle.cardManagers[this.player].reserve.cards[a].callScryDiscardEffect()
                                            if(this.battle.cardManagers[this.player].reserve.cards[a].class==2){
                                                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.args[3])
                                            }
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].discard.cards,a,a+1)
                                            this.args[1]--
                                            a--
                                            la--
                                            complete=this.args[1]<=0
                                        break
                                        case 85:
                                            this.battle.cardManagers[this.player].reserve.cards[a].callScryDiscardEffect()
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].discard.cards,a,a+1)
                                            this.args[1]--
                                            a--
                                            la--
                                            this.battle.combatantManager.combatants[this.args[3]].statusEffect('Vulnerable',this.args[2])
                                            complete=this.args[1]<=0
                                        break
                                    }
                                    this.active=!complete
                                    if(!this.active){
                                        this.execute()
                                    }
                                }
                                if(a>=0&&a<la&&this.activeTimer<=0){
                                    this.battle.cardManagers[this.player].reserve.cards[a].select=false
                                    if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].reserve.cards[a])&&this.battle.cardManagers[this.player].reserve.cards[a].size>0.5){
                                        this.battle.cardManagers[this.player].reserve.cards[a].select=true
                                    }
                                }
                            }
                        break
                        case 71: case 88:
                            for(let a=0,la=this.battle.cardManagers[this.player].remove.cards.length;a<la;a++){
                                if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].remove.cards[a])&&this.battle.cardManagers[this.player].remove.cards[a].size>0.5&&this.battle.cardManagers[this.player].remove.cards[a].select){
                                    this.battle.cardManagers[this.player].remove.cards[a].select=false
                                    switch(this.args[0]){
                                        case 71:
                                            this.battle.cardManagers[this.player].remove.send(this.battle.cardManagers[this.player].deck.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                        case 88:
                                            this.battle.cardManagers[this.player].remove.copy(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            this.battle.cardManagers[this.player].remove.send(this.battle.cardManagers[this.player].deck.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                    }
                                    this.active=false
                                }
                                if(a>=0&&a<la&&this.activeTimer<=0){
                                    this.battle.cardManagers[this.player].remove.cards[a].select=false
                                    if(pointInsideBox({position:inputs.rel},this.battle.cardManagers[this.player].remove.cards[a])&&this.battle.cardManagers[this.player].remove.cards[a].size>0.5&&!this.battle.cardManagers[this.player].remove.cards[a].spec.includes(37)){
                                        this.battle.cardManagers[this.player].remove.cards[a].select=true
                                    }
                                }
                            }
                        break
                    }
                break
                case 3:
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if((pointInsideBox({position:inputs.rel},this.cards[a])||this.battle.relicManager.hasRelic(173,this.player)&&pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2+170+(this.options>=8?75:0)},width:120,height:40}))&&!this.cards[a].deSize){
                            if(this.setupArgs[2]==22){
                                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect(['Strength','Dexterity'][a%2],this.setupArgs[4+a%2])
                            }
                            let lists=[]
                            switch(this.args[0]){
                                case 0:
                                    lists=['deck']
                                break
                                case 1:
                                    lists=['hand']
                                break
                                case 2:
                                    lists=['deck','hand']
                                break
                            }
                            for(let b=0,lb=lists.length;b<lb;b++){
                                if(this.setupArgs[2]==36){
                                    this.battle.cardManagers[this.player][lists[b]].addAbstract(this.cards[a].type,this.cards[a].level,this.cards[a].color,this.cards[a].edition,[1,11],[[-1]])
                                }else if(this.setupArgs[2]==34){
                                    this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player][lists[b]].cards,this.setupArgs[4][a],this.setupArgs[4][a]+1)
                                    for(let c=0,lc=this.setupArgs[4].length;c<lc;c++){
                                        if(this.setupArgs[4][c]>this.setupArgs[4][a]){
                                            this.setupArgs[4][c]--
                                        }
                                        if(c!=a){
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].discard.cards,this.setupArgs[4][c],this.setupArgs[4][c]+1)
                                            for(let d=0,ld=this.setupArgs[4].length;d<ld;d++){
                                                if(this.setupArgs[4][d]>this.setupArgs[4][c]){
                                                    this.setupArgs[4][d]--
                                                }
                                            }
                                        }
                                    }
                                }else if(this.setupArgs[2]==27){
                                    this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player][lists[b]].cards,this.setupArgs[4][a],this.setupArgs[4][a]+1,4)
                                }else if(this.setupArgs[2]==4||this.setupArgs[2]==24||this.setupArgs[2]==29||this.setupArgs[2]==33||(this.setupArgs[2]==2||this.setupArgs[2]==12)&&this.setupArgs[3]==1||this.setupArgs[2]==38||this.setupArgs[2]==44||this.setupArgs[2]==45){
                                    this.battle.cardManagers[this.player][lists[b]].addAbstract(this.cards[a].type,this.cards[a].level,this.cards[a].color,this.cards[a].edition,[1],[])
                                }else{
                                    this.battle.cardManagers[this.player][lists[b]].add(this.cards[a].type,this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                }
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
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2+125+(this.options>=8?75:0)},width:120,height:40})&&!this.battle.modded(83)){
                        this.active=false
                        if(this.args[0]==0){
                            this.battle.relicManager.activate(8,[this.player])
                        }
                        if(this.prune){
                            for(let a=0,la=this.cards.length;a<la;a++){
                                for(let b=0,lb=this.battle.cardManagers[this.player].listing.card.length;b<lb;b++){
                                    for(let c=0,lc=this.battle.cardManagers[this.player].listing.card[b].length;c<lc;c++){
                                        for(let d=0,ld=this.battle.cardManagers[this.player].listing.card[b][c].length;d<ld;d++){
                                            if(this.cards[a].type==this.battle.cardManagers[this.player].listing.card[b][c][d]){
                                                this.battle.cardManagers[this.player].listing.card[b][c].splice(d,1)
                                                d--
                                                ld--
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                break
                case 4:
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+225*this.posKey,y:this.layer.height/2-225},width:120,height:40})){
                        this.active=false
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+225*this.posKey,y:this.layer.height/2+225},width:120,height:40})){
                        this.battle.overlayManager.overlays[51][this.player].active=true
                        this.battle.overlayManager.overlays[51][this.player].activate()
                    }
                break
                case 5:
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-215,y:this.layer.height/2},width:40,height:40})&&this.page>0){
                        this.page--
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+215,y:this.layer.height/2},width:40,height:40})&&
                    this.page<ceil((this.battle.relicManager.overTotal[this.player]-1)/30)-1){
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
                        this.battle.combatantManager.combatants[this.player].heal(10+this.battle.relicManager.active[449][this.player+1]*5)
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2+40},width:120,height:40})){
                        this.active=false
                    }
                break
                case 8:
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-85,y:this.layer.height/2+225},width:40,height:40})&&this.page>0){
                        this.page--
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+85,y:this.layer.height/2+225},width:40,height:40})&&this.page<ceil(this.cards.length/24)-1){
                        this.page++
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-130,y:this.layer.height/2+225},width:40,height:40})){
                        for(let a=0,la=this.marks.length;a<la;a++){
                            if(this.marks[la-1-a]<this.page){
                                this.page=this.marks[la-1-a]
                                a=la
                            }
                        }
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+130,y:this.layer.height/2+225},width:40,height:40})){
                        for(let a=0,la=this.marks.length;a<la;a++){
                            if(this.marks[a]>this.page){
                                this.page=this.marks[a]
                                a=la
                            }
                        }
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
                            if(this.args[2]==2){
                                this.battle.relicManager.detail[459][this.player]=this.cards[a].type
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
                    for(let a=0,la=this.battle.nodeManager.listing.static[this.world][2].length;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2-105+a*50},width:340,height:40})){
                            this.active=false
                            this.battle.nodeManager.setCombat(2,this.battle.nodeManager.listing.static[this.world][2][a])
                        }
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2-205},width:120,height:40})){
                        this.active=false
                    }
                break
                case 13:
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2-70},width:120,height:40})){
                        let date=new Date()
                        let final=`${this.text},${game.ascend},${variants.ultraprism?2:variants.prism?1:0},${variants.mod},${this.battle.player[this.player]-1},${this.battle.deck[this.player]},${this.battle.stats.node[0]},${this.battle.stats.killed[this.player]},${this.battle.stats.damage[this.player]},${this.battle.stats.taken[this.player][0]},${this.battle.stats.block[this.player]},${this.battle.stats.move[this.player]},${this.battle.stats.card[this.player]},${this.battle.stats.played[this.player][0]},${this.battle.stats.earned[this.player]},${this.battle.cardManagers[this.player].deck.cards.length},${this.battle.stats.relic[this.player]},${this.battle.stats.item[this.player]},${stage.internal.version},${date.getMonth()+1},${date.getDate()},${(date.getFullYear()-2022)},${this.battle.cardManagers[this.player].deck.outCSV()},${stage.scene=='victory'?`true`:`false`}`
                        saveStrings([final],'runResultsFile','csv')
                        this.active=false
                    }
                break
                case 14:
                    for(let a=0,la=this.combatant.attack.length;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2-105+a*50},width:340,height:40})){
                            this.active=false
                            this.combatant.intent=a
                            this.battle.updateTargetting()
                        }
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2-205},width:120,height:40})){
                        this.active=false
                    }
                break
                case 15:
                    for(let a=0,la=this.encounters.length;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2-105+a*50},width:340,height:40})){
                            this.active=false
                            transition.trigger=true
                            transition.scene='battle'
                            this.battle.setupBattle(types.encounter[this.encounters[a]])
                            switch(this.class){
                                case 1:
                                    this.battle.combatantManager.allEffect(24,[2])
                                    this.battle.combatantManager.allEffect(3,[5])
                                break
                            }
                        }
                    }
                break
                case 16:
                    for(let a=0,la=this.colors.length;a<la;a++){
                        if(dist(this.layer.width/2+27.5-la*27.5+a*55+225*(this.player*2-this.battle.players+1),this.layer.height/2,inputs.rel.x,inputs.rel.y)<40){
                            switch(this.args[0]){
                                case 0:
                                    this.battle.addSpecificEnergyBase(this.player,this.colors[a])
                                    this.battle.cardManagers[this.player].mtgListing()
                                break
                                case 1:
                                    this.battle.addSpecificEnergy(this.setupArgs[0],this.player,this.colors[a])
                                break
                                case 2:
                                    this.battle.loseSpecificEnergyBase(this.player,this.colors[a])
                                    this.battle.addSpecificEnergyBase(this.player,0)
                                    this.battle.addSpecificEnergyBase(this.player,0)
                                    this.battle.cardManagers[this.player].mtgListing()
                                break
                                case 3:
                                    this.battle.loseSpecificEnergyBase(this.player,this.colors[a])
                                    this.battle.overlayManager.overlays[64][this.player].active=true
                                    this.battle.overlayManager.overlays[64][this.player].activate()
                                break
                            }
                            this.active=false
                        }
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2+60},width:120,height:40})){
                        this.active=false
                    }
                break
                case 17:
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},this.cards[a])&&!this.cards[a].deSize&&this.active){
                            this.execute([this.cards[a]])
                            for(let b=0,lb=this.cards.length;b<lb;b++){
                                this.cards[b].deSize=true
                                this.cards[b].upSize=false
                            }
                            this.active=false
                        }
                    }
                break
                case 18:
                    for(let a=0,la=2;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2-25+a*50},width:340,height:40})){
                            this.active=false
                            this.battle.nodeManager.saveClass=a
                        }
                    }
                break
                case 19:
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-60,y:this.layer.height/2+20},width:90,height:120})&&this.active){
                        this.battle.overlayManager.overlays[6][this.player].active=true
                        this.battle.overlayManager.overlays[6][this.player].activate()
                        this.active=false
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+60,y:this.layer.height/2+20},width:90,height:120})&&this.active){
                        this.battle.overlayManager.overlays[28][this.player].active=true
                        this.battle.overlayManager.overlays[28][this.player].activate()
                        this.active=false
                    }
                break
                case 20:
                    let scaling=[]
                    switch(this.setupArgs[0]){
                        case 0:
                            scaling=[2,3,30,5]
                        break
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+225*this.posKey-85,y:this.layer.height/2+40},width:30,height:30})&&this.card.effect[0]>scaling[0]){
                        this.card.effect[0]-=scaling[0]
                        this.changes--
                        this.cost-=scaling[2]+scaling[3]*this.changes
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+225*this.posKey+85,y:this.layer.height/2+40},width:30,height:30})){
                        this.card.effect[0]+=scaling[0]
                        this.cost+=scaling[2]+scaling[3]*this.changes
                        this.changes++
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+225*this.posKey-85,y:this.layer.height/2+90},width:30,height:30})&&this.card.effect[1]>scaling[1]){
                        this.card.effect[1]-=scaling[1]
                        this.changes--
                        this.cost-=scaling[2]+scaling[3]*this.changes
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+225*this.posKey+85,y:this.layer.height/2+90},width:30,height:30})){
                        this.card.effect[1]+=scaling[1]
                        this.cost+=scaling[2]+scaling[3]*this.changes
                        this.changes++
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+225*this.posKey,y:this.layer.height/2+145},width:120,height:40})&&this.battle.currency.money[this.player]>=this.cost){
                        this.active=false
                        this.battle.loseCurrency(this.cost,this.player)
                        switch(this.setupArgs[0]){
                            case 0:
                                this.battle.cardManagers[this.player].deck.addAbstract(this.card.type,this.card.level,this.card.color,this.card.edition,[6,6],[0,this.card.effect[0],1,this.card.effect[1]])
                            break
                        }
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+225*this.posKey,y:this.layer.height/2+190},width:120,height:40})){
                        this.active=false
                    }
                break
                case 21:
                    for(let a=0,la=constants.playerNumber;a<la;a++){
                        if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-85+a%2*170,y:this.layer.height/2-110+floor(a/2)*40},width:160,height:30})){
                            this.active=false
                            switch(this.args[0]){
                                case 0:
                                    this.battle.relicManager.detail[458][this.player]=a+1
                                break
                            }
                        }
                    }
                break
                case 22:
                    let finalTotal=0
                    for(let a=0,la=this.args[1].length;a<la;a++){
                        finalTotal+=this.battle.relicManager.allTotal[this.args[1][a]]
                    }
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2-215,y:this.layer.height/2},width:40,height:40})&&this.page>0){
                        this.page--
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2+215,y:this.layer.height/2},width:40,height:40})&&
                    this.page<ceil((finalTotal-1)/30)-1){
                        this.page++
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2+180},width:120,height:40})){
                        this.active=false
                    }else{
                        switch(this.args[0]){
                            case 1:
                                this.active=!this.battle.relicManager.onClick('all',[this.args[1],this.page,this.player])
                            break
                        }
                    }
                break
                case 23:
                    if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2+10},width:100,height:40})){
                        this.battle.saveCol()
                        this.active=false
                    }else if(pointInsideBox({position:inputs.rel},{position:{x:this.layer.width/2,y:this.layer.height/2+55},width:100,height:40})){
                        this.active=false
                    }
                break
            
            }
        }
    }
    onKey(key,code){
        if(this.active&&this.activeTimer<=0){
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
                            switch(this.rewards[a].type){
                                case 1:
                                    this.battle.relicManager.activate(8,[this.player])
                                break
                                case 2:
                                    this.battle.relicManager.listing.relic[this.rewards[a].relic.rarity].push(this.rewards[a].relic.type)
                                break
                            }
                            this.rewards[a].usable=false
                        }
                    }
                    /*if((key=='r'||key=='R')&&this.args[0]==0){
                        this.battle.replay()
                    }*/
                break
                case 2:
                    if(this.args[0]==24){
                        if(code==LEFT_ARROW&&this.page>0){
                            this.page--
                        }else if(code==RIGHT_ARROW&&this.page<ceil(this.battle.tierManager.tiers[this.args[1]].cards.length/15)-1){
                            this.page++
                        }else if(code==ENTER){
                            this.active=false
                        }
                    }else{
                        if(code==LEFT_ARROW&&this.page>0){
                            this.page--
                        }else if(code==RIGHT_ARROW&&(
                            this.page<ceil(this.battle.cardManagers[this.player].reserve.cards.length/15)-1&&(
                                this.args[0]==0||this.args[0]==6||this.args[0]==9||this.args[0]==18||this.args[0]==22||
                                this.args[0]==25||this.args[0]==30||this.args[0]==45||this.args[0]==58||this.args[0]==60||
                                this.args[0]==63||this.args[0]==74||this.args[0]==94||this.args[0]==95
                            )||
                            this.page<ceil(this.battle.cardManagers[this.player].discard.cards.length/15)-1&&(
                                this.args[0]==1||this.args[0]==5||this.args[0]==11||this.args[0]==19||this.args[0]==21||
                                this.args[0]==31||this.args[0]==34||this.args[0]==39||this.args[0]==40||this.args[0]==42||
                                this.args[0]==46||this.args[0]==52||this.args[0]==77||this.args[0]==79
                            )||
                            this.page<ceil(this.battle.cardManagers[this.player].deck.cards.length/15)-1&&(
                                this.args[0]==2||this.args[0]==3||this.args[0]==4||this.args[0]==7||this.args[0]==8||
                                this.args[0]==10||this.args[0]==17||this.args[0]==26||this.args[0]==27||this.args[0]==28||
                                this.args[0]==29||this.args[0]==32||this.args[0]==33||this.args[0]==35||this.args[0]==37||
                                this.args[0]==38||this.args[0]==43||this.args[0]==50||this.args[0]==51||this.args[0]==57||
                                this.args[0]==64||this.args[0]==65||this.args[0]==66||this.args[0]==67||this.args[0]==68||
                                this.args[0]==69||this.args[0]==70||this.args[0]==72||this.args[0]==76||this.args[0]==78||
                                this.args[0]==83||this.args[0]==86||this.args[0]==87||this.args[0]==89||this.args[0]==90||
                                this.args[0]==91
                            )||
                            this.page<ceil(this.battle.cardManagers[this.player].exhaust.cards.length/15)-1&&(
                                this.args[0]==12
                            )||
                            this.page<ceil(this.battle.cardManagers[this.player].remove.cards.length/15)-1&&(
                                this.args[0]==71||this.args[0]==88
                            )||
                            this.page<ceil(this.battle.cardManagers[this.player].deck.sorted.length/15)-1&&(
                                this.args[0]==53||this.args[0]==54||this.args[0]==55||this.args[0]==56||this.args[0]==61
                            )||
                            this.page<ceil(this.battle.cardManagers[this.player].reserve.sorted.length/15)-1&&(
                                this.args[0]==13||this.args[0]==14||this.args[0]==15||this.args[0]==16||this.args[0]==62
                            )||
                            this.page<ceil(this.args[1]/15)-1&&(
                                this.args[0]==41||this.args[0]==44||this.args[0]==47||this.args[0]==48||this.args[0]==49||
                                this.args[0]==59||this.args[0]==73||this.args[0]==80||this.args[0]==84||this.args[0]==85
                            )||
                            this.page<ceil(this.battle.cardManagers[this.player].deck.finalPosition/15)-1&&(
                                this.args[0]==36||this.args[0]==81||this.args[0]==82||this.args[0]==92||this.args[0]==93
                            )
                        )){
                            this.page++
                        }else if(code==ENTER&&this.args[0]!=87&&this.args[0]!=88){
                            this.active=false
                            this.execute()
                        }
                    }
                    switch(this.args[0]){
                        case 1:
                            for(let a=0,la=this.battle.cardManagers[this.player].discard.cards.length;a<la;a++){
                                if(key==inputs.hexadec[a%15]&&this.battle.cardManagers[this.player].discard.cards[a].size>0.5){
                                    switch(this.battle.cardManagers[this.player].discard.cards[a].attack){
                                        case 5288:
                                            this.battle.cardManagers[this.player].hand.selfCall(6,[5288,this.battle.cardManagers[this.player].discard.cards[a].effect,1,this.battle.cardManagers[this.player].discard.cards[a].target])
                                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.args[1]==1?this.battle.players-1-this.player:this.player].reserve.cards,a,a+1,1)
                                            a--
                                            la--
                                            this.active=false
                                        break
                                    }
                                }
                            }
                        break
                        case 3: case 4: case 7: case 8: case 10: case 17: case 26: case 27: case 28: case 29:
                        case 32: case 33: case 35: case 36: case 37: case 38: case 43: case 50: case 51: case 53:
                        case 54: case 55: case 56: case 57: case 61: case 64: case 65: case 66: case 67: case 68:
                        case 69: case 70: case 72: case 75: case 76: case 78: case 81: case 82: case 83: case 86:
                        case 87: case 89: case 90: case 91: case 92: case 93:
                            switch(this.args[0]){
                                case 3: case 17: case 43: case 75: case 89: case 91:
                                    this.card=new card(this.layer,this.battle,this.player,-100,-100,0,0,variants.mtg?[]:0,0)
                                break
                            }
                            for(let a=0,la=this.battle.cardManagers[this.player].deck.cards.length;a<la;a++){
                                if(key==inputs.hexadec[this.battle.cardManagers[this.player].deck.cards[a].relIndex%15]&&this.battle.cardManagers[this.player].deck.cards[a].size>0.5&&this.battle.cardManagers[this.player].deck.cards[a].select&&
                                    !((this.args[0]==3||this.args[0]==17||this.args[0]==26||this.args[0]==91)&&this.battle.cardManagers[this.player].deck.cards[a].spec.includes(37))&&
                                    !(this.args[0]==3&&this.battle.cardManagers[this.player].deck.cards[a].level>=1&&!this.battle.cardManagers[this.player].deck.cards[a].spec.includes(53))&&
                                    !((this.args[0]==10||this.args[0]==53||this.args[0]==54||this.args[0]==55||this.args[0]==56||this.args[0]==61)&&(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(3)||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(12)))&&
                                    !(this.args[0]==17&&this.battle.cardManagers[this.player].deck.cards[a].level>=2&&!this.battle.cardManagers[this.player].deck.cards[a].spec.includes(53))&&
                                    !(this.args[0]==36&&this.battle.cardManagers[this.player].deck.cards[a].rarity!=0)&&
                                    !(this.args[0]==43&&this.battle.cardManagers[this.player].deck.cards[a].base.cost<=0)&&
                                    !((this.args[0]==50||this.args[0]==66)&&!this.battle.cardManagers[this.player].deck.cards[a].basic)&&
                                    !(this.args[0]==51&&this.battle.cardManagers[this.player].deck.cards[a].color==0)&&
                                    !(this.args[0]==67&&this.battle.cardManagers[this.player].deck.cards[a].basic)&&
                                    !(this.args[0]==68&&(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(4)||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(12)))&&
                                    !(this.args[0]==69&&(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(1)||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(12)||this.battle.cardManagers[this.player].deck.cards[a].class==4))&&
                                    !(this.args[0]==70&&this.battle.cardManagers[this.player].deck.cards[a].specialCost)&&
                                    !(this.args[0]==75&&this.battle.cardManagers[this.player].deck.cards[a].getCost(0)<0)&&
                                    !(this.args[0]==83&&(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(63)||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(12)))&&
                                    !(this.args[0]==32&&this.battle.cardManagers[this.player].deck.cards[a].edition==1)&&
                                    !(this.args[0]==33&&this.battle.cardManagers[this.player].deck.cards[a].edition==4)&&
                                    !(this.args[0]==35&&this.battle.cardManagers[this.player].deck.cards[a].edition==5)&&
                                    !(this.args[0]==64&&this.battle.cardManagers[this.player].deck.cards[a].edition==2)&&
                                    !(this.args[0]==65&&this.battle.cardManagers[this.player].deck.cards[a].edition==6)&&
                                    !(this.args[0]==86&&this.battle.cardManagers[this.player].deck.cards[a].edition==8)&&
                                    !(this.args[0]==90&&(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(65)||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(12)))
                                ){
                                    this.battle.cardManagers[this.player].deck.cards[a].select=false
                                    let size=this.battle.cardManagers[this.player].deck.cards[a].size
                                    let complete=true
                                    let breakAfter=false
                                    let rarity=this.battle.cardManagers[this.player].deck.cards[a].rarity
                                    let basic=this.battle.cardManagers[this.player].deck.cards[a].basic
                                    let type=this.battle.cardManagers[this.player].deck.cards[a].type
                                    let cardClass=this.battle.cardManagers[this.player].deck.cards[a].class
                                    let edition=this.battle.cardManagers[this.player].deck.cards[a].edition
                                    switch(this.args[0]){
                                        case 3: case 17:
                                            this.battle.cardManagers[this.player].deck.cards[a]=upgradeCard(this.battle.cardManagers[this.player].deck.cards[a])
                                            if(this.args[0]==17&&this.battle.relicManager.hasRelic(233,this.player)&&this.battle.cardManagers[this.player].deck.cards[a].edition==0){
                                                this.battle.cardManagers[this.player].deck.cards[a].edition=floor(random(1,7))
                                            }
                                            this.activated++
                                            complete=this.activated>=this.args[1]
                                            breakAfter=true
                                        break
                                        case 4: case 67: case 81: case 87: case 92:
                                            if(this.args[2]==4){
                                                this.base=copyCard(this.battle.cardManagers[this.player].deck.cards[a])
                                            }
                                            if(this.battle.cardManagers[this.player].deck.remove(a)){
                                                this.battle.relicManager.activate(11,[this.player,cardClass])
                                                a--
                                                la--
                                                this.activated++
                                                complete=this.activated>=this.args[1]
                                                breakAfter=true
                                                switch(this.args[2]){
                                                    case 1:
                                                        this.battle.eventManagers[this.player].page=basic||cardClass==6?3:rarity==2?6:rarity==1?5:4
                                                    break
                                                    case 2:
                                                        this.battle.cardManagers[this.player].deck.removeAbstract(0,[type])
                                                    break
                                                    case 3:
                                                        if(edition!=0){
                                                            this.battle.cardManagers[this.player].randomEffect(0,30,[edition])
                                                        }
                                                    break
                                                    case 4:
                                                        this.battle.relicManager.detail[465][this.player][1]=this.base
                                                    break
                                                }
                                            }else{
                                                complete=false
                                            }
                                        break
                                        case 7: case 66: case 82: case 93:
                                            this.battle.cardManagers[this.player].deck.cards[a]=this.battle.cardManagers[this.player].transformCard(this.battle.cardManagers[this.player].deck.cards[a])
                                            this.battle.cardManagers[this.player].deck.cards[a].callAddEffect()
                                            this.battle.cardManagers[this.player].deck.cards.forEach(card=>card.callAnotherAddEffect())
                                            this.activated++
                                            complete=false
                                            this.activeTimer=this.activated>=this.args[1]?30:0
                                            if(this.args[2]==1&&this.battle.cardManagers[this.player].deck.cards[a].level==0){
                                                this.battle.cardManagers[this.player].deck.cards[a]=upgradeCard(this.battle.cardManagers[this.player].deck.cards[a])
                                            }
                                            breakAfter=true
                                        break
                                        case 8:
                                            this.battle.cardManagers[this.player].deck.copySelf(a)
                                        break
                                        case 10: case 53: case 54: case 55: case 56: case 61:
                                            if(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(3)){
                                                complete=false
                                            }else{
                                                this.battle.cardManagers[this.player].deck.cards[a].spec.push(3)
                                                this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.push(3)
                                                if(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(47)){
                                                    this.battle.cardManagers[this.player].deck.cards[a].spec.splice(this.battle.cardManagers[this.player].deck.cards[a].spec.indexOf(47))
                                                }
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
                                            this.battle.cardManagers[this.player].deck.copy(this.battle.cardManagers[this.player].hand.cards,a,a+1,0)
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
                                            }else{
                                                complete=false
                                            }
                                        break
                                        case 29: case 50:
                                            this.battle.cardManagers[this.player].deck.cards[a].edition=floor(random(1,7))
                                        break
                                        case 32:
                                            this.battle.cardManagers[this.player].deck.cards[a].edition=1
                                        break
                                        case 33:
                                            this.battle.cardManagers[this.player].deck.cards[a].edition=4
                                        break
                                        case 35:
                                            this.battle.cardManagers[this.player].deck.cards[a].edition=5
                                        break
                                        case 36:
                                            this.battle.cardManagers[this.player].deck.copySelf(a)
                                            this.battle.cardManagers[this.player].deck.copySelf(a)
                                        break
                                        case 37:
                                            if(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(47)){
                                                complete=false
                                            }else{
                                                this.battle.cardManagers[this.player].deck.cards[a].spec.push(47)
                                                this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.push(47)
                                                if(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(3)){
                                                    this.battle.cardManagers[this.player].deck.cards[a].spec.splice(this.battle.cardManagers[this.player].deck.cards[a].spec.indexOf(3))
                                                }
                                            }
                                        break
                                        case 38:
                                            this.battle.cardManagers[this.player].deck.cards[a].edition=2
                                            this.battle.cardManagers[this.player].deck.copySelf(a)
                                            this.battle.cardManagers[this.player].deck.copySelf(a)
                                        break
                                        case 43: case 89:
                                            this.battle.cardManagers[this.player].deck.cards[a].costDown(3,[1])
                                        break
                                        case 51:
                                            this.battle.cardManagers[this.player].deck.cards[a].color=variants.mtg?[0]:0
                                            this.battle.cardManagers[this.player].deck.cards[a].setColorDetail()
                                            if(variants.mtg&&!this.battle.cardManagers[this.player].deck.cards[a].specialCost){
                                                for(let b=0,lb=this.battle.cardManagers[this.player].deck.cards[a].cost.length;b<lb;b++){
                                                    if(this.battle.cardManagers[this.player].deck.cards[a].cost[b]>=1){
                                                        this.battle.cardManagers[this.player].deck.cards[a].cost[b]=0
                                                    }
                                                }
                                            }
                                        break
                                        case 57:
                                            this.battle.cardManagers[this.player].deck.cards[a].edition=4
                                            this.battle.cardManagers[this.player].deck.copySelf(a)
                                            this.battle.cardManagers[this.player].deck.copySelf(a)
                                        break
                                        case 64:
                                            this.battle.cardManagers[this.player].deck.cards[a].edition=2
                                        break
                                        case 65:
                                            this.battle.cardManagers[this.player].deck.cards[a].edition=6
                                        break
                                        case 68:
                                            if(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(4)){
                                                complete=false
                                            }else{
                                                this.battle.cardManagers[this.player].deck.cards[a].spec.push(4)
                                                this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.push(4)
                                            }
                                        break
                                        case 69:
                                            if(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(1)){
                                                complete=false
                                            }else{
                                                this.battle.cardManagers[this.player].deck.cards[a].spec.push(1)
                                                this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.push(1)
                                            }
                                        break
                                        case 70:
                                            if(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(58)){
                                                complete=false
                                            }else{
                                                this.battle.cardManagers[this.player].deck.cards[a].spec.push(58)
                                                this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.push(58)
                                                this.battle.cardManagers[this.player].deck.cards[a].updateSpecialCost()
                                            }
                                        break
                                        case 72:
                                            if(this.battle.cardManagers[this.player].deck.smooshNeg(a)){
                                                la--
                                                a--
                                            }else{
                                                complete=false
                                            }
                                        break
                                        case 75:
                                            this.battle.cardManagers[this.player].deck.cards[a].doubleBoth()
                                            this.battle.cardManagers[this.player].deck.cards[a].spec.push(61)
                                            this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.push(61)
                                        break
                                        case 76:
                                            this.battle.cardManagers[this.player].deck.copySelfAbstract(a,0)
                                        break
                                        case 78:
                                            this.battle.cardManagers[this.player].deck.cards[a]=upgradeCard(upgradeCard(this.battle.cardManagers[this.player].transformCardPrism(this.battle.cardManagers[this.player].deck.cards[a])))
                                            this.battle.cardManagers[this.player].deck.cards[a].edition=floor(random(1,7))
                                            this.battle.cardManagers[this.player].deck.cards[a].callAddEffect()
                                            this.battle.cardManagers[this.player].deck.cards.forEach(card=>card.callAnotherAddEffect())
                                            complete=false
                                            this.activeTimer=30
                                            if(this.args[1]==1&&this.battle.cardManagers[this.player].deck.cards[a].level==0){
                                                this.battle.cardManagers[this.player].deck.cards[a]=upgradeCard(this.battle.cardManagers[this.player].deck.cards[a])
                                            }
                                        break
                                        case 83:
                                            if(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(63)){
                                                complete=false
                                            }else if(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(62)){
                                                this.battle.cardManagers[this.player].deck.cards[a].spec.push(63)
                                                this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.push(63)
                                                this.battle.cardManagers[this.player].deck.cards[a].spec.splice(this.battle.cardManagers[this.player].deck.cards[a].spec.indexOf(62),1)
                                                this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.splice(this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.indexOf(62),1)
                                            }else{
                                                this.battle.cardManagers[this.player].deck.cards[a].spec.push(62)
                                                this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.push(62)
                                            }
                                        break
                                        case 86:
                                            this.battle.cardManagers[this.player].deck.cards[a].edition=8
                                        break
                                        case 90:
                                            if(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(65)){
                                                complete=false
                                            }else{
                                                this.battle.cardManagers[this.player].deck.cards[a].spec.push(65)
                                                this.battle.cardManagers[this.player].deck.cards[a].additionalSpec.push(65)
                                                this.activated++
                                                complete=this.activated>=this.args[1]
                                            }
                                        break
                                        case 91:
                                            if(this.battle.cardManagers[this.player].deck.cards[a].level<1||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(53)){
                                                this.battle.cardManagers[this.player].deck.cards[a]=upgradeCard(this.battle.cardManagers[this.player].deck.cards[a])
                                            }
                                            this.battle.cardManagers[this.player].deck.copySelf(a)
                                            this.activated++
                                            complete=this.activated>=this.args[1]
                                        break

                                    }
                                    this.active=!complete
                                    if(breakAfter){
                                        break
                                    }
                                    this.battle.cardManagers[this.player].deck.cards[a].size=size
                                }
                                if(a>=0&&a<la&&this.activeTimer<=0){
                                    this.battle.cardManagers[this.player].deck.cards[a].select=false
                                    if(key==inputs.hexadec[this.battle.cardManagers[this.player].deck.cards[a].relIndex%15]&&this.battle.cardManagers[this.player].deck.cards[a].size>0.5&&this.active&&
                                        !((this.args[0]==3||this.args[0]==17||this.args[0]==26||this.args[0]==91)&&this.battle.cardManagers[this.player].deck.cards[a].spec.includes(37))&&
                                        !(this.args[0]==3&&this.battle.cardManagers[this.player].deck.cards[a].level>=1&&!this.battle.cardManagers[this.player].deck.cards[a].spec.includes(53))&&
                                        !((this.args[0]==10||this.args[0]==53||this.args[0]==54||this.args[0]==55||this.args[0]==56||this.args[0]==61)&&(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(3)||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(12)))&&
                                        !(this.args[0]==17&&this.battle.cardManagers[this.player].deck.cards[a].level>=2&&!this.battle.cardManagers[this.player].deck.cards[a].spec.includes(53))&&
                                        !(this.args[0]==36&&this.battle.cardManagers[this.player].deck.cards[a].rarity!=0)&&
                                        !(this.args[0]==43&&this.battle.cardManagers[this.player].deck.cards[a].base.cost<=0)&&
                                        !((this.args[0]==50||this.args[0]==66)&&!this.battle.cardManagers[this.player].deck.cards[a].basic)&&
                                        !(this.args[0]==51&&this.battle.cardManagers[this.player].deck.cards[a].color==0)&&
                                        !(this.args[0]==67&&this.battle.cardManagers[this.player].deck.cards[a].basic)&&
                                        !(this.args[0]==68&&(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(4)||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(12)))&&
                                        !(this.args[0]==69&&(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(1)||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(12)||this.battle.cardManagers[this.player].deck.cards[a].class==4))&&
                                        !(this.args[0]==70&&this.battle.cardManagers[this.player].deck.cards[a].specialCost)&&
                                        !(this.args[0]==75&&this.battle.cardManagers[this.player].deck.cards[a].getCost(0)<0)&&
                                        !(this.args[0]==83&&(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(63)||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(12)))&&
                                        !(this.args[0]==32&&this.battle.cardManagers[this.player].deck.cards[a].edition==1)&&
                                        !(this.args[0]==33&&this.battle.cardManagers[this.player].deck.cards[a].edition==4)&&
                                        !(this.args[0]==35&&this.battle.cardManagers[this.player].deck.cards[a].edition==5)&&
                                        !(this.args[0]==64&&this.battle.cardManagers[this.player].deck.cards[a].edition==2)&&
                                        !(this.args[0]==65&&this.battle.cardManagers[this.player].deck.cards[a].edition==6)&&
                                        !(this.args[0]==86&&this.battle.cardManagers[this.player].deck.cards[a].edition==8)&&
                                        !(this.args[0]==90&&(this.battle.cardManagers[this.player].deck.cards[a].spec.includes(65)||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(12)))
                                    ){
                                        this.battle.cardManagers[this.player].deck.cards[a].select=true
                                        switch(this.args[0]){
                                            case 3: case 17:
                                                this.card=upgradeCard(this.battle.cardManagers[this.player].deck.cards[a])
                                                this.card.nonCalc=true
                                                this.card.page=this.page
                                                this.card.size=1
                                            break
                                            case 43: case 89:
                                                this.card=copyCard(this.battle.cardManagers[this.player].deck.cards[a])
                                                this.card.nonCalc=true
                                                this.card.page=this.page
                                                this.card.size=1
                                                this.card.costDown(3,[1])
                                                this.card.anim.costDown=1
                                            break
                                            case 75:
                                                this.card=copyCard(this.battle.cardManagers[this.player].deck.cards[a])
                                                this.card.doubleBoth()
                                                this.card.nonCalc=true
                                                this.card.page=this.page
                                                this.card.size=1
                                            break
                                            case 91:
                                                if(this.battle.cardManagers[this.player].deck.cards[a].level<1||this.battle.cardManagers[this.player].deck.cards[a].spec.includes(53)){
                                                    this.card=upgradeCard(this.battle.cardManagers[this.player].deck.cards[a])
                                                }
                                                this.card.nonCalc=true
                                                this.card.page=this.page
                                                this.card.size=1
                                            break
                                        }
                                    }
                                }
                            }
                        break
                        case 5: case 11: case 19: case 21: case 31: case 34: case 39: case 40: case 42: case 46:
                        case 52: case 77: case 79:
                            switch(this.args[0]){
                                case 77:
                                    this.card=new card(this.layer,this.battle,this.player,-100,-100,0,0,variants.mtg?[]:0,0)
                                break
                            }
                            for(let a=0,la=this.battle.cardManagers[this.player].discard.cards.length;a<la;a++){
                                if(key==inputs.hexadec[a%15]&&this.battle.cardManagers[this.player].discard.cards[a].size>0.5&&this.battle.cardManagers[this.player].discard.cards[a].select&&
                                    !(this.args[0]==77&&this.battle.cardManagers[this.player].discard.cards[a].spec.includes(37))&&
                                    !(this.args[0]==77&&this.battle.cardManagers[this.player].discard.cards[a].level>=2&&!this.battle.cardManagers[this.player].discard.cards[a].spec.includes(53))
                                ){
                                    this.battle.cardManagers[this.player].discard.cards[a].select=false
                                    let complete=true
                                    switch(this.args[0]){
                                        case 5:
                                            if(this.endAfter){
                                                this.endAfter=false
                                                this.battle.endTurn()
                                            }
                                            if(this.args[1]==1){
                                                this.battle.cardManagers[this.player].discard.cards[a].player=this.battle.players-1-this.battle.cardManagers[this.player].discard.cards[a].player
                                            }
                                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.args[1]==1?this.battle.players-1-this.player:this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                            this.activated++
                                            complete=this.activated>=this.args[2]
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
                                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.block*this.battle.cardManagers[this.player].discard.cards[a].getCost(0))
                                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                        case 31:
                                            this.battle.cardManagers[this.player].discard.generalExhaust(a)
                                            a--
                                            la--
                                        break
                                        case 34:
                                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,16)
                                            a--
                                            la--
                                        break
                                        case 39:
                                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].activateRewind()
                                            if(this.battle.cardManagers[this.player].discard.cards[a].callRewindEffect()){
                                                this.battle.cardManagers[this.player].discard.generalExhaust(a)
                                            }else{
                                                this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1,15)
                                            }
                                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].activateRewind()
                                            a--
                                            la--
                                        break
                                        case 40:
                                            this.battle.cardManagers[this.player].discard.cards[a]=upgradeCard(upgradeCard(this.battle.cardManagers[this.player].discard.cards[a],true))
                                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].activateRewind()
                                            if(this.battle.cardManagers[this.player].discard.cards[a].callRewindEffect()){
                                                this.battle.cardManagers[this.player].discard.generalExhaust(a)
                                            }else{
                                                this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1,15)
                                            }
                                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].activateRewind()
                                            a--
                                            la--
                                        break
                                        case 42:
                                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].activateRewind()
                                            if(this.battle.cardManagers[this.player].discard.cards[a].callRewindEffect()){
                                                this.battle.cardManagers[this.player].discard.generalExhaust(a)
                                            }else{
                                                this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1,17)
                                            }
                                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].activateRewind()
                                            a--
                                            la--
                                        break
                                        case 46:
                                            this.battle.cardManagers[this.player].discard.generalExhaust(a)
                                            a--
                                            la--
                                            this.activated++
                                            complete=this.activated>=this.args[1]
                                            if(complete){
                                                this.battle.cardManagers[this.player].hand.exhaust(this.args[2])
                                            }
                                        break
                                        case 52:
                                            this.battle.cardManagers[this.player].discard.cards[a]=this.battle.cardManagers[this.player].transformCard(this.battle.cardManagers[this.player].discard.cards[a])
                                            complete=false
                                            this.activeTimer=30
                                        break
                                        case 77:
                                            this.battle.cardManagers[this.player].discard.cards[a]=upgradeCard(this.battle.cardManagers[this.player].discard.cards[a])
                                            this.activated++
                                            complete=this.activated>=this.args[1]
                                        break
                                        case 79:
                                            this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,20)
                                            a--
                                            la--
                                        break
                                    }
                                    this.active=!complete
                                }
                                if(a>=0&&a<la&&this.activeTimer<=0){
                                    this.battle.cardManagers[this.player].discard.cards[a].select=false
                                    if(key==inputs.hexadec[a%15]&&this.battle.cardManagers[this.player].discard.cards[a].size>0.5&&
                                            !(this.args[0]==77&&this.battle.cardManagers[this.player].discard.cards[a].spec.includes(37))&&
                                            !(this.args[0]==77&&this.battle.cardManagers[this.player].discard.cards[a].level>=2&&!this.battle.cardManagers[this.player].discard.cards[a].spec.includes(53))
                                        ){
                                        this.battle.cardManagers[this.player].discard.cards[a].select=true
                                        switch(this.args[0]){
                                            case 77:
                                                this.card=upgradeCard(this.battle.cardManagers[this.player].discard.cards[a])
                                                this.card.nonCalc=true
                                                this.card.page=this.page
                                                this.card.size=1
                                            break
                                        }
                                    }
                                }
                            }
                        break
                        case 6: case 13: case 14: case 15: case 16: case 18: case 22: case 25: case 30: case 45:
                        case 58: case 60: case 62: case 63: case 74: case 80: case 94: case 95: case 96:
                            for(let a=0,la=this.battle.cardManagers[this.player].reserve.cards.length;a<la;a++){
                                if((key==inputs.hexadec[this.battle.cardManagers[this.player].reserve.cards[a].relIndex%15])&&this.battle.cardManagers[this.player].reserve.cards[a].size>0.5&&this.battle.cardManagers[this.player].reserve.cards[a].select){
                                    this.battle.cardManagers[this.player].reserve.cards[a].select=false
                                    let complete=true
                                    switch(this.args[0]){
                                        case 6: case 13: case 14: case 15: case 16: case 62:
                                            if(this.args[1]==1){
                                                this.battle.cardManagers[this.player].reserve.cards[a].player=this.battle.players-1-this.battle.cardManagers[this.player].reserve.cards[a].player
                                            }
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.args[1]==1?this.battle.players-1-this.player:this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                            this.activated++
                                            complete=this.activated>=this.args[2]
                                        break
                                        case 18:
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,10)
                                            a--
                                            la--
                                        break
                                        case 22:
                                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.block*this.battle.cardManagers[this.player].reserve.cards[a].getCost(0))
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
                                        case 30: case 80:
                                            this.battle.cardManagers[this.player].reserve.generalExhaust(a)
                                            a--
                                            la--
                                            this.activated++
                                            complete=this.args[0]==80||this.activated>=this.args[1]
                                        break
                                        case 45:
                                            this.battle.cardManagers[this.player].reserve.generalExhaust(a)
                                            a--
                                            la--
                                            this.activated++
                                            complete=this.activated>=this.args[1]
                                            if(complete){
                                                this.battle.overlayManager.overlays[66][this.player].active=true
                                                this.battle.overlayManager.overlays[66][this.player].activate([this.args[2],this.args[3]])
                                            }
                                        break
                                        case 58:
                                            this.battle.cardManagers[this.player].reserve.cards[a]=this.battle.cardManagers[this.player].transformCard(this.battle.cardManagers[this.player].reserve.cards[a])
                                            complete=false
                                            this.activeTimer=30
                                        break
                                        case 60:
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            a--
                                            la--
                                            for(let b=0,lb=this.args[1];b<lb;b++){
                                                this.battle.cardManagers[this.player].hand.copySelf(this.battle.cardManagers[this.player].hand.cards.length-1)
                                            }
                                        break
                                        case 63:
                                            this.battle.cardManagers[this.player].reserve.copy(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                        break
                                        case 74:
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].hand.cards,a,a+1,4)
                                            a--
                                            la--
                                        break
                                        case 94:
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].reserve.cards,a,a+1,11)
                                        break
                                        case 95:
                                            this.battle.cardManagers[this.player].reserve.copy(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            this.battle.cardManagers[this.player].hand.cards[this.battle.cardManagers[this.player].hand.cards.length-1].edition=2
                                        break
                                        case 96:
                                            if(!this.battle.cardManagers[this.player].reserve.cards[a].spec.includes(4)){
                                                this.battle.cardManagers[this.player].reserve.cards[a].spec.push(4)
                                                this.battle.cardManagers[this.player].reserve.cards[a].additionalSpec.push(4)
                                            }
                                            this.battle.cardManagers[this.player].reserve.copySelfShuffleMulti(a,this.args[1])
                                        break
                                    }
                                    this.active=!complete
                                }
                                if(a>=0&&a<la&&this.activeTimer<=0){
                                    this.battle.cardManagers[this.player].reserve.cards[a].select=false
                                    if(key==inputs.hexadec[this.battle.cardManagers[this.player].reserve.cards[a].relIndex%15]&&this.battle.cardManagers[this.player].reserve.cards[a].size>0.5){
                                        this.battle.cardManagers[this.player].reserve.cards[a].select=true
                                    }
                                }
                            }
                        break
                        case 12:
                            for(let a=0,la=this.battle.cardManagers[this.player].exhaust.cards.length;a<la;a++){
                                if(key==inputs.hexadec[a%15]&&this.battle.cardManagers[this.player].exhaust.cards[a].size>0.5&&this.battle.cardManagers[this.player].exhaust.cards[a].select){
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
                                if(a>=0&&a<la&&this.activeTimer<=0){
                                    this.battle.cardManagers[this.player].exhaust.cards[a].select=false
                                    if(key==inputs.hexadec[a%15]&&this.battle.cardManagers[this.player].exhaust.cards[a].size>0.5&&!this.battle.cardManagers[this.player].exhaust.cards[a].spec.includes(37)){
                                        this.battle.cardManagers[this.player].exhaust.cards[a].select=true
                                    }
                                }
                            }
                        break
                        case 20:
                            for(let a=0,la=min(3,this.battle.cardManagers[this.player].reserve.cards.length);a<la;a++){
                                if(key==inputs.hexadec[a%15]&&this.battle.cardManagers[this.player].reserve.cards[a].size>0.5&&this.battle.cardManagers[this.player].reserve.cards[a].select){
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
                                if(a>=0&&a<la&&this.activeTimer<=0){
                                    this.battle.cardManagers[this.player].reserve.cards[a].select=false
                                    if(key==inputs.hexadec[a%15]&&this.battle.cardManagers[this.player].reserve.cards[a].size>0.5){
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
                        case 41: case 44: case 47: case 48: case 49: case 59: case 73: case 84: case 85:
                            for(let a=0,la=min(this.args[1],this.battle.cardManagers[this.player].reserve.cards.length);a<la;a++){
                                if(key==inputs.hexadec[a%15]&&this.battle.cardManagers[this.player].reserve.cards[a].size>0.5&&this.battle.cardManagers[this.player].reserve.cards[a].select){
                                    this.battle.cardManagers[this.player].reserve.cards[a].select=false
                                    let complete=true
                                    switch(this.args[0]){
                                        case 41: case 48: case 49: case 84:
                                            this.battle.cardManagers[this.player].reserve.cards[a].callScryDiscardEffect()
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].discard.cards,a,a+1)
                                            this.args[1]--
                                            a--
                                            la--
                                            complete=this.args[1]<=0
                                        break
                                        case 44:
                                            this.battle.cardManagers[this.player].reserve.cards[a].setCost(0,[0])
                                            this.battle.cardManagers[this.player].reserve.cards[a].additionalSpec.push(-2)
                                            this.battle.cardManagers[this.player].reserve.cards[a].callScryDiscardEffect()
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].discard.cards,a,a+1)
                                            this.args[1]--
                                            a--
                                            la--
                                            complete=this.args[1]<=0
                                        break
                                        case 47:
                                            this.battle.cardManagers[this.player].reserve.cards[a].callScryDiscardEffect()
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].discard.cards,a,a+1)
                                            this.args[1]--
                                            a--
                                            la--
                                            this.battle.combatantManager.combatants[this.args[3]].statusEffect('Freeze',this.args[2])
                                            complete=this.args[1]<=0
                                        break
                                        case 59:
                                            this.battle.cardManagers[this.player].reserve.cards[a].callScryDiscardEffect()
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].discard.cards,a,a+1)
                                            this.args[1]--
                                            a--
                                            la--
                                            this.battle.combatantManager.randomEnemyEffect(3,[this.args[3],this.args[5]])
                                            complete=this.args[1]<=0
                                        break
                                        case 73:
                                            this.battle.cardManagers[this.player].reserve.cards[a].callScryDiscardEffect()
                                            if(this.battle.cardManagers[this.player].reserve.cards[a].class==2){
                                                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.args[3])
                                            }
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].discard.cards,a,a+1)
                                            this.args[1]--
                                            a--
                                            la--
                                            complete=this.args[1]<=0
                                        break
                                        case 85:
                                            this.battle.cardManagers[this.player].reserve.cards[a].callScryDiscardEffect()
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].discard.cards,a,a+1)
                                            this.args[1]--
                                            a--
                                            la--
                                            this.battle.combatantManager.combatants[this.args[3]].statusEffect('Vulnerable',this.args[2])
                                            complete=this.args[1]<=0
                                        break
                                    }
                                    a=la
                                    this.active=!complete
                                    if(!this.active){
                                        this.execute()
                                    }
                                }
                                if(a>=0&&a<la&&this.activeTimer<=0){
                                    this.battle.cardManagers[this.player].reserve.cards[a].select=false
                                    if(key==inputs.hexadec[a%15]&&this.battle.cardManagers[this.player].reserve.cards[a].size>0.5){
                                        this.battle.cardManagers[this.player].reserve.cards[a].select=true
                                    }
                                }
                            }
                        break
                        case 71: case 88:
                            for(let a=0,la=this.battle.cardManagers[this.player].remove.cards.length;a<la;a++){
                                if(key==inputs.hexadec[a%15]&&this.battle.cardManagers[this.player].remove.cards[a].size>0.5&&this.battle.cardManagers[this.player].remove.cards[a].select){
                                    this.battle.cardManagers[this.player].remove.cards[a].select=false
                                    switch(this.args[0]){
                                        case 71:
                                            this.battle.cardManagers[this.player].remove.send(this.battle.cardManagers[this.player].deck.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                        case 88:
                                            this.battle.cardManagers[this.player].remove.copy(this.battle.cardManagers[this.player].hand.cards,a,a+1,1)
                                            this.battle.cardManagers[this.player].remove.send(this.battle.cardManagers[this.player].deck.cards,a,a+1,1)
                                            a--
                                            la--
                                        break
                                    }
                                    this.active=false
                                }
                                if(a>=0&&a<la&&this.activeTimer<=0){
                                    this.battle.cardManagers[this.player].remove.cards[a].select=false
                                    if(key==inputs.hexadec[a%15]&&this.battle.cardManagers[this.player].remove.cards[a].size>0.5&&!this.battle.cardManagers[this.player].remove.cards[a].spec.includes(37)){
                                        this.battle.cardManagers[this.player].remove.cards[a].select=true
                                    }
                                }
                            }
                        break
                    }
                break
                case 3:
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if(((int(key)+9)%10==a||this.battle.relicManager.hasRelic(173,this.player)&&(key=='t'||key=='T'))&&!this.cards[a].deSize){
                            if(this.setupArgs[2]==22){
                                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect(['Strength','Dexterity'][a%2],this.setupArgs[4+a%2])
                            }
                            let lists=[]
                            switch(this.args[0]){
                                case 0:
                                    lists=['deck']
                                break
                                case 1:
                                    lists=['hand']
                                break
                                case 2:
                                    lists=['deck','hand']
                                break
                            }
                            for(let b=0,lb=lists.length;b<lb;b++){
                                if(this.setupArgs[2]==36){
                                    this.battle.cardManagers[this.player][lists[b]].addAbstract(this.cards[a].type,this.cards[a].level,this.cards[a].color,this.cards[a].edition,[1,11],[[-1]])
                                }else if(this.setupArgs[2]==34){
                                    this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player][lists[b]].cards,this.setupArgs[4][a],this.setupArgs[4][a]+1)
                                    for(let c=0,lc=this.setupArgs[4].length;c<lc;c++){
                                        if(this.setupArgs[4][c]>this.setupArgs[4][a]){
                                            this.setupArgs[4][c]--
                                        }
                                        if(c!=a){
                                            this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].discard.cards,this.setupArgs[4][c],this.setupArgs[4][c]+1)
                                            for(let d=0,ld=this.setupArgs[4].length;d<ld;d++){
                                                if(this.setupArgs[4][d]>this.setupArgs[4][c]){
                                                    this.setupArgs[4][d]--
                                                }
                                            }
                                        }
                                    }
                                }else if(this.setupArgs[2]==27){
                                    this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player][lists[b]].cards,this.setupArgs[4][a],this.setupArgs[4][a]+1,4)
                                }else if(this.setupArgs[2]==4||this.setupArgs[2]==24||this.setupArgs[2]==29||this.setupArgs[2]==33||(this.setupArgs[2]==2||this.setupArgs[2]==12)&&this.setupArgs[3]==1||this.setupArgs[2]==38||this.setupArgs[2]==44||this.setupArgs[2]==45){
                                    this.battle.cardManagers[this.player][lists[b]].addAbstract(this.cards[a].type,this.cards[a].level,this.cards[a].color,this.cards[a].edition,[1],[])
                                }else{
                                    this.battle.cardManagers[this.player][lists[b]].add(this.cards[a].type,this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                }
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
                        if(this.prune){
                            for(let a=0,la=this.cards.length;a<la;a++){
                                for(let b=0,lb=this.battle.cardManagers[this.player].listing.card.length;b<lb;b++){
                                    for(let c=0,lc=this.battle.cardManagers[this.player].listing.card[b].length;c<lc;c++){
                                        for(let d=0,ld=this.battle.cardManagers[this.player].listing.card[b][c].length;d<ld;d++){
                                            if(this.cards[a].type==this.battle.cardManagers[this.player].listing.card[b][c][d]){
                                                this.battle.cardManagers[this.player].listing.card[b][c].splice(d,1)
                                                d--
                                                ld--
                                            }
                                        }
                                    }
                                }
                            }
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
                        this.page<ceil((this.battle.relicManager.overTotal[this.player]-1)/30)-1){
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
                            if(
                                (types.dictionary[a].mtg==0||types.dictionary[a].mtg==1&&!variants.mtg||types.dictionary[a].mtg==2&&variants.mtg)&&
                                types.dictionary[a].name.substr(0,this.text.length).toUpperCase()==this.text.toUpperCase()
                            ){
                                this.suggestions.push(a)
                            }
                        }
                    }else if(code==BACKSPACE&&this.text.length>0){
                        this.text=this.text.substring(0,this.text.length-1)
                        this.suggestions=[]
                        if(this.text.length>0){
                            for(let a=0,la=types.dictionary.length;a<la;a++){
                                if(
                                    (types.dictionary[a].mtg==0||types.dictionary[a].mtg==1&&!variants.mtg||types.dictionary[a].mtg==2&&variants.mtg)&&
                                    types.dictionary[a].name.substr(0,this.text.length).toUpperCase()==this.text.toUpperCase()
                                ){
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
                        this.battle.combatantManager.combatants[this.player].heal(10+this.battle.relicManager.relic[449][this.player+1]*5)
                    }else if(code==ENTER){
                        this.active=false
                    }
                break
                case 8:
                    if(code==LEFT_ARROW&&this.page>0){
                        this.page--
                    }else if(code==RIGHT_ARROW&&this.page<ceil(this.cards.length/24)-1){
                        this.page++
                    }else if(key=='['){
                        for(let a=0,la=this.marks.length;a<la;a++){
                            if(this.marks[la-1-a]<this.page){
                                this.page=this.marks[la-1-a]
                                a=la
                            }
                        }
                    }else if(key==']'){
                        for(let a=0,la=this.marks.length;a<la;a++){
                            if(this.marks[a]>this.page){
                                this.page=this.marks[a]
                                a=la
                            }
                        }
                    }else if(code==ENTER){
                        this.active=false
                    }
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if((int(key)+9)%10==a&&!this.cards[a].deSize){
                            switch(this.args[0]){
                                case 0:
                                    this.battle.cardManagers[this.player].deck.add(this.cards[a].type,this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                break
                                case 1:
                                    this.battle.cardManagers[this.player].hand.add(this.cards[a].type,this.cards[a].level,this.cards[a].color,this.cards[a].edition)
                                break
                            }
                            if(this.args[2]==2){
                                this.battle.relicManager.detail[459][this.player]=this.cards[a].type
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
                    for(let a=0,la=this.battle.nodeManager.listing.static[this.world][2].length;a<la;a++){
                        if(int(key)==a+1){
                            this.active=false
                            this.battle.nodeManager.setCombat(2,this.battle.nodeManager.listing.static[this.world][2][a])
                        }
                    }
                    if(code==ENTER){
                        this.active=false
                    }
                break
                case 13:
                    if(this.possible.includes(key)&&this.text.length<40){
                        this.text+=key
                    }else if(code==BACKSPACE&&this.text.length>0){
                        this.text=this.text.substring(0,this.text.length-1)
                    }
                break
                case 14:
                    for(let a=0,la=this.combatant.attack.length;a<la;a++){
                        if(int(key)==a+1){
                            this.active=false
                            this.combatant.intent=a
                            this.battle.updateTargetting()
                        }
                    }
                    if(code==ENTER){
                        this.active=false
                    }
                break
                case 15:
                    for(let a=0,la=this.encounters.length;a<la;a++){
                        if(int(key)==a+1){
                            this.active=false
                            transition.trigger=true
                            transition.scene='battle'
                            this.battle.setupBattle(types.encounter[this.encounters[a]])
                            switch(this.class){
                                case 1:
                                    this.battle.combatantManager.allEffect(24,[2])
                                    this.battle.combatantManager.allEffect(3,[5])
                                break
                            }
                        }
                    }
                break
                case 16:
                    for(let a=0,la=this.colors.length;a<la;a++){
                        if(int(key)==a+1){
                            switch(this.args[0]){
                                case 0:
                                    this.battle.energy.base[this.player].push(this.colors[a])
                                    this.battle.cardManagers[this.player].mtgListing()
                                break
                                case 1:
                                    this.battle.addSpecificEnergy(this.setupArgs[0],this.player,this.colors[a])
                                break
                                case 2:
                                    this.battle.loseSpecificEnergyBase(this.player,this.colors[a])
                                    this.battle.addSpecificEnergyBase(this.player,0)
                                    this.battle.addSpecificEnergyBase(this.player,0)
                                    this.battle.cardManagers[this.player].mtgListing()
                                break
                                case 3:
                                    this.battle.loseSpecificEnergyBase(this.player,this.colors[a])
                                    this.battle.overlayManager.overlays[64][this.player].active=true
                                    this.battle.overlayManager.overlays[64][this.player].activate()
                                break
                            }
                            this.active=false
                        }
                    }
                    if(code==ENTER){
                        this.active=false
                    }
                break
                case 17:
                    for(let a=0,la=this.cards.length;a<la;a++){
                        if((int(key)+9)%10==a&&!this.cards[a].deSize&&this.active){
                            this.execute([this.cards[a]])
                            for(let b=0,lb=this.cards.length;b<lb;b++){
                                this.cards[b].deSize=true
                                this.cards[b].upSize=false
                            }
                            this.active=false
                        }
                    }
                break
                case 18:
                    for(let a=0,la=2;a<la;a++){
                        if((int(key)+9)%10==a){
                            this.active=false
                            this.battle.nodeManager.saveClass=a
                        }
                    }
                break
                case 19:
                    if((int(key)+9)%10==0&&this.active){
                        this.battle.overlayManager.overlays[6][this.player].active=true
                        this.battle.overlayManager.overlays[6][this.player].activate()
                        this.active=false
                    }else if((int(key)+9)%10==1&&this.active){
                        this.battle.overlayManager.overlays[28][this.player].active=true
                        this.battle.overlayManager.overlays[28][this.player].activate()
                        this.active=false
                    }
                break
                case 20:
                    if(code==ENTER){
                        this.active=false
                    }
                break
                case 21:
                    for(let a=0,la=constants.playerNumber;a<la;a++){
                        if(key==inputs.hexadec[a]&&this.active){
                            this.active=false
                            switch(this.args[0]){
                                case 0:
                                    this.battle.relicManager.detail[458][this.player]=a+1
                                break
                            }
                        }
                    }
                break
                case 22:
                    let finalTotal=0
                    for(let a=0,la=this.args[1].length;a<la;a++){
                        finalTotal+=this.battle.relicManager.allTotal[this.args[1][a]]
                    }
                    if(code==LEFT_ARROW&&this.page>0){
                        this.page--
                    }else if(code==RIGHT_ARROW&&
                    this.page<ceil((finalTotal-1)/30)-1){
                        this.page++
                    }else if(code==ENTER){
                        this.active=false
                    }
                break
                case 23:
                    if(code==ENTER){
                        this.active=false
                    }
                break
            }
        }
    }
}