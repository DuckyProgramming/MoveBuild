class relicManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        
        this.listing={relic:[[],[],[],[]]}
        this.active=[]
        this.player=[]
        this.detail=[]

        this.relics=[]
        this.displayRelics=[]
        this.position=[]
        this.total=[]
        this.up=[]
        this.complete=[]

        this.initialListing()
        for(let a=0,la=this.battle.player.length;a<la;a++){
            this.addRelic(0,a)
        }
    }
    initialListing(){
        for(let a=0,la=types.relic.length;a<la;a++){
            if(types.relic[a].rarity>=0&&(types.relic[a].list==0||this.battle.player.includes(types.relic[a].list))){
                this.listing.relic[types.relic[a].rarity].push(a)
            }
            this.active.push(0)
            this.player.push(-1)
            switch(types.relic[a].id){
                case 4: case 17: case 37: case 38: case 39: case 42: case 43: case 44: case 60: case 63:
                case 64: case 70: case 73: case 78: case 90:
                    this.detail.push(0)
                break
                default:
                    this.detail.push(-1)
                break
            }
        }
        for(let a=0,la=this.battle.player.length;a<la;a++){
            this.complete.push(false)
            this.position.push(0)
            this.total.push(0)
            this.up.push(true)
        }
    }
    setupStash(){
        this.displayRelics=[]
        for(let a=0,la=this.complete.length;a<la;a++){
            this.complete[a]=false
        }
        let relics=copyArrayStack(this.listing.relic)
        let possible=[0,0,0/*,1,1,2*/]
        for(let a=0,la=3;a<la;a++){
            let rarity=possible[floor(random(0,possible.length))]
            let index=floor(random(0,relics[rarity].length))
            this.displayRelics.push(new relic(this.layer,1-this.battle.player.length,this.layer.width/2,this.layer.height/2-100+a*100,relics[rarity][index],2))
            relics[rarity].splice(index,1)
        }
    }
    addRelic(type,player){
        this.player[types.relic[type].id]=player
        this.active[types.relic[type].id]+=1
        if(this.battle.player.length==2){
            this.relics.push(new relic(this.layer,player,this.layer.width*player+(25+(this.position[player]%8)*50)*(1-2*player),100+floor(this.position[player]/8)*50,types.relic[type].id,1))
        }else{
            this.relics.push(new relic(this.layer,player,25+(this.position[player]%18)*50,100+floor(this.position[player]/18)*50,types.relic[type].id,1))
        }
        this.position[player]++
        this.total[player]++
        this.get(types.relic[type].id,player)
    }
    loseRelic(type){
        this.active[types.relic[type].id]-=1
        for(let a=0,la=this.relics.length;a<la;a++){
            if(this.relics[a].type==type){
                this.relics[a].active=false
            }
        }
        this.lose(types.relic[type].id,this.player[types.relic[type].id])
    }
    addRandomRelic(player){
        let possible=[0,0,0,1,1,2]
        let rarity=possible[floor(random(0,possible.length))]
        let index=floor(random(0,this.listing.relic[rarity].length))
        this.addRelic(this.listing.relic[rarity][index],player)
        this.listing.relic[rarity].splice(index,1)
    }
    addSetRelic(rarity,player){
        let index=floor(random(0,this.listing.relic[rarity].length))
        this.addRelic(this.listing.relic[rarity][index],player)
        this.listing.relic[rarity].splice(index,1)
    }
    makeRelicSelection(rarity){
        for(let a=0,la=this.complete.length;a<la;a++){
            this.complete[a]=false
        }
        let list=[]
        let relics=copyArrayStack(this.listing.relic)
        for(let a=0,la=rarity.length;a<la;a++){
            let index=floor(random(0,relics[rarity[a]].length))
            list.push(relics[rarity[a]][index])
            relics[rarity[a]].splice(index,1)
        }
        return list
    }
    get(type,player){
        switch(type){
            case 5:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].gainMaxHP(7)
            break
            case 16:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].gainMaxHP(10)
            break
            case 29:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].gainMaxHP(14)
            break
            case 30:
                this.battle.currency.money[player]+=300
            break
            case 32:
                this.battle.cardManagers[player].randomEffect(0,2,[1])
                this.battle.cardManagers[player].randomEffect(0,2,[1])
            break
            case 33:
                this.battle.cardManagers[player].randomEffect(0,2,[2])
                this.battle.cardManagers[player].randomEffect(0,2,[2])
            break
            case 34:
                this.battle.cardManagers[player].randomEffect(0,2,[3])
                this.battle.cardManagers[player].randomEffect(0,2,[3])
            break
            case 35:
                this.battle.cardManagers[player].randomEffect(0,2,[4])
                this.battle.cardManagers[player].randomEffect(0,2,[4])
            break
            case 46:
                this.battle.overlayManager.overlays[3][player].options++
            break
            case 47:
                this.battle.optionManagers[player].addOption(3)
            break
            case 58:
                this.battle.optionManagers[player].addOption(4)
            break
            case 59:
                this.battle.optionManagers[player].addOption(5)
            break
            case 60:
                this.battle.optionManagers[player].addOption(6)
            break
            case 62:
                this.battle.optionManagers[player].addOption(7)
            break
            case 67:
                this.battle.itemManager.addItemSlots(2,player)
            break
            case 77:
                this.battle.itemManager.effectiveness[player]*=1.5
            break
        }
    }
    lose(type,player){
        switch(type){
            case 46:
                this.battle.overlayManager.overlays[3][player].options++
            break
            case 47:
                this.battle.optionManagers[player].removeOption(3)
            break
            case 58:
                this.battle.optionManagers[player].removeOption(4)
            break
            case 59:
                this.battle.optionManagers[player].removeOption(5)
            break
            case 60:
                this.battle.optionManagers[player].removeOption(6)
            break
            case 62:
                this.battle.optionManagers[player].removeOption(7)
            break
            case 67:
                this.battle.itemManager.RemoveItemSlots(2,player)
            break
            case 77:
                this.battle.itemManager.effectiveness[player]/=1.5
            break
        }
        this.deactivate(type)
    }
    deactivate(type){
        for(let a=0,la=this.relics.length;a<la;a++){
            if(this.relics[a].type==type){
                this.relics[a].active=false
            }
        }
    }
    hasRelic(type,player){
        return this.active[type]>0&&(this.player[type]==player||player==-1)
    }
    relicPlayer(relic){
        return this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player[relic])]
    }
    activate(type,args){
        switch(type){
            case 0://start of general turn [turn,class]
                switch(args[0]){
                    case 1:
                        if(this.active[2]>0){
                            this.battle.cardManagers[this.player[2]].draw(2*this.active[2])
                        }
                        if(this.active[3]>0){
                            this.battle.energy.main[this.player[3]]+=this.active[3]
                        }
                        if(this.active[6]>0){
                            this.relicPlayer(6).statusEffect('Strength',this.active[6])
                        }
                        if(this.active[7]>0){
                            this.relicPlayer(7).statusEffect('Dexterity',this.active[7])
                        }
                        if(this.active[21]>0){
                            this.relicPlayer(21).statusEffect('Buffer',this.active[21])
                        }
                        if(this.active[31]>0){
                            this.relicPlayer(31).statusEffect('Single Strength',8*this.active[31])
                        }
                        if(this.active[36]>0){
                            this.relicPlayer(36).addBlock(10*this.active[36])
                        }
                        if(this.active[38]>0&&this.detail[38]==1){
                            this.detail[38]=0
                            this.battle.energy.main[this.player[38]]+=2*this.active[38]
                        }
                        if(this.active[45]>0&&args[1]==2){
                            this.relicPlayer(45).heal(25*this.active[45])
                        }
                        if(this.active[57]>0){
                            this.relicPlayer(57).statusEffect('Armor',4*this.active[57])
                        }
                        if(this.active[60]>0){
                            this.relicPlayer(60).statusEffect('Strength',this.detail[60])
                        }
                        if(this.active[86]>0){
                            this.relicPlayer(86).statusEffect('Free Attack',this.active[86])
                        }
                        if(this.active[87]>0){
                            this.relicPlayer(87).statusEffect('Double Play',this.active[87])
                        }
                        if(this.active[89]>0){
                            this.relicPlayer(89).statusEffect('Take Half Damage',2*this.active[89])
                        }
                        if(this.active[39]>0){this.detail[39]=0}
                    break
                    case 2:
                        if(this.active[41]>0){
                            this.relicPlayer(41).addBlock(14*this.active[41])
                        }
                        if(this.active[72]>0){
                            this.battle.energy.main[this.player[72]]+=2*this.active[72]
                        }
                    break
                }
                if(this.active[4]>0){
                    this.detail[4]++
                    if(this.detail[4]%3==0){
                        this.battle.energy.main[this.player[4]]+=this.active[4]
                    }
                }
                if(this.active[37]>0){
                    if(args[0]>1&&this.detail[37]==0){
                        this.battle.energy.main[this.player[37]]+=this.active[37]
                    }
                    this.detail[37]=0
                }
                if(this.active[83]>0&&args[0]>=2){
                    this.relicPlayer(83).addBlock(8*this.active[83])
                }
                if(this.active[88]>0){
                    this.relicPlayer(88).addBlock(this.active[88]*(this.battle.counter.enemy-this.battle.counter.killed))
                }
                if(this.active[90]>0){
                    this.detail[90]++
                    if(this.detail[90]%5==0){
                        this.relicPlayer(90).statusEffect('Intangible',this.active[90])
                    }
                }
            break
            case 1://end of combat
                if(this.active[1]>0){
                    this.relicPlayer(1).heal(2*this.active[1])
                }
                if(this.active[19]>0){
                    if(this.relicPlayer(19).life<this.relicPlayer(19).base.life){
                        this.relicPlayer(19).heal(12*this.active[19])
                    }
                }
            break
            case 2://start of player turn [turn,player,played]
                if(args[0]==1){
                    if(this.active[8]>0&&args[1]==this.player[8]){
                        for(let a=0,la=this.active[8];a<la;a++){
                            this.battle.cardManagers[this.player[8]].hand.add(findName('Emergency\nMove',types.card),0,0)
                        }
                    }
                    if(this.active[9]>0&&args[1]==this.player[9]){
                        for(let a=0,la=this.active[9];a<la;a++){
                            this.battle.cardManagers[this.player[9]].hand.add(findName('Redraw',types.card),0,0)
                        }
                    }
                    if(this.active[10]>0&&args[1]==this.player[10]){
                        for(let a=0,la=this.active[10];a<la;a++){
                            this.battle.cardManagers[this.player[10]].hand.add(findName('Miracle',types.card),0,0)
                        }
                    }
                    if(this.active[22]>0&&args[1]==this.player[22]){
                        for(let a=0,la=this.active[22];a<la;a++){
                            this.battle.cardManagers[this.player[22]].hand.add(findName('Selective\nRedraw',types.card),0,0)
                        }
                    }
                    if(this.active[52]>0&&args[1]==this.player[52]){
                        for(let a=0,la=2*this.active[52];a<la;a++){
                            this.battle.cardManagers[this.player[52]].hand.add(findName('Shiv',types.card),0,0)
                        }
                    }
                }else{
                    if(this.active[82]>0&&args[1]==this.player[82]&&args[2][0]<3){
                        this.battle.cardManagers[this.player[82]].draw(3*this.active[82])
                    }
                }
                if(this.active[70]>0&&args[1]==this.player[70]){
                    this.detail[70]++
                    if(this.detail[70]%3==0){
                        this.battle.cardManagers[this.player[70]].draw(this.active[70])
                    }
                }
            break
            case 3://enemy dies
                if(this.active[17]>0){
                    this.battle.cardManagers[this.player[17]].draw(this.active[17])
                    this.battle.energy.main[this.player[17]]+=this.active[17]
                }
            break
            case 4://playing card [class,plauer]
                if(this.active[18]>0&&args[1]==this.player[18]){
                    this.detail[18]++
                    if(this.detail[18]%10==0){
                        this.battle.cardManagers[this.player[18]].draw(this.active[18])
                    }
                }
                switch(args[0]){
                    case 1:
                        if(this.active[37]>0&&args[1]==this.player[37]&&this.detail[37]==0){
                            this.detail[37]=1
                        }
                        if(this.active[42]>0&&args[1]==this.player[42]){
                            this.detail[42]++
                            if(this.detail[42]%3==0){
                                this.relicPlayer(42).statusEffect('Strength',this.active[42])
                            }
                        }
                        if(this.active[43]>0&&args[1]==this.player[43]){
                            this.detail[43]++
                            if(this.detail[43]%3==0){
                                this.relicPlayer(43).statusEffect('Dexterity',this.active[43])
                            }
                        }
                        if(this.active[44]>0&&args[1]==this.player[44]){
                            this.detail[44]++
                            if(this.detail[44]%3==0){
                                this.relicPlayer(44).addBlock(4*this.active[44])
                            }
                        }
                        if(this.active[63]>0&&args[1]==this.player[63]){
                            this.detail[63]++
                            if(this.detail[63]%10==0){
                                this.relicPlayer(63).statusEffect('Double Damage',this.active[63])
                            }
                        }
                        if(this.active[64]>0&&args[1]==this.player[64]){
                            this.detail[64]++
                            if(this.detail[64]%10==0){
                                this.battle.energy.main[this.player[64]]+=this.active[64]
                            }
                        }
                        if(this.active[71]>0&&args[1]==this.player[71]){
                            this.relicPlayer(71).statusEffect('Temporary Dexterity',this.active[71])
                        }
                    break
                    case 2:
                        if(this.active[73]>0&&args[1]==this.player[73]){
                            this.detail[73]++
                            if(this.detail[73]%3==0){
                                this.relicPlayer(73).statusEffect('Metallicize',2*this.active[73])
                            }
                        }
                        if(this.active[78]>0&&args[1]==this.player[78]){
                            this.detail[78]++
                            if(this.detail[78]%10==0){
                                this.relicPlayer(78).statusEffect('Buffer',this.active[78])
                            }
                        }
                    break
                    case 4:
                        if(this.active[20]>0&&args[1]==this.player[20]){
                            this.battle.cardManagers[this.player[20]].randomEffect(2,1,[this.active[20]])
                        }
                        if(this.active[27]>0&&args[1]==this.player[27]){
                            this.relicPlayer(27).heal(this.active[1])
                        }
                    break
                }
            break
            case 5://adding card [player]
                if(this.active[40]>0&&args[0]==this.player[40]){
                    this.battle.currency.money[this.player[40]]+=10*this.active[0]
                }
            break
            case 6://taking damage [player]
                if(this.active[38]>0&&args[0]==this.player[38]&&this.detail[38]==0){
                    this.detail[38]=1
                    this.battle.cardManagers[this.player[38]].draw(3*this.active[38])
                }
                if(this.active[48]>0&&args[0]==this.player[48]){
                    this.relicPlayer(48).statusEffect('Block Next Turn',3)
                }
            break
            case 7://entering rest
                if(this.active[38]>0&&this.detail[38]==0){
                    this.detail[38]=1
                }
            break
            case 8://skipping card [player]
                if(this.active[49]>0&&args[0]==this.player[49]){
                    this.relicPlayer(49).gainMaxHP(2*this.active[49])
                }
            break
            case 9://start of player turn [turn,player]
                if(this.active[68]>0&&args[1]==this.player[68]){
                    let player=this.relicPlayer(68)
                    if(player.block<=0){
                        player.addBlock(6)
                    }
                }
            break
        }
    }
    display(scene){
        switch(scene){
            case 'battle':
                for(let a=0,la=this.relics.length;a<la;a++){
                    this.relics[a].display(la-1)
                }
                for(let a=0,la=this.relics.length;a<la;a++){
                    this.relics[a].displayInfo()
                }
            break
            case 'stash':
                for(let a=0,la=this.displayRelics.length,lea=this.relics.length;a<la;a++){
                    this.displayRelics[a].display(lea-1)
                }
                for(let a=0,la=this.displayRelics.length;a<la;a++){
                    this.displayRelics[a].displayInfo()
                }
            break
        }
    }
    callInput(type,a){
        switch(type){
            case 0:
                this.displayRelics[a].deFade=true
                for(let b=0,lb=this.listing.relic.length;b<lb;b++){
                    for(let c=0,lc=this.listing.relic[b].length;c<lc;c++){
                        if(this.listing.relic[b][c]==this.displayRelics[a].type){
                            this.listing.relic[b].splice(c,1)
                        }
                    }
                }
                if(this.battle.player.length==1){
                    this.addRelic(this.displayRelics[a].type,0)
                    this.complete[0]=true
                    transition.trigger=true
                    transition.scene='map'
                }else if(this.battle.player.length==2){
                    if(inputs.rel.x<this.displayRelics[a].position.x){
                        this.addRelic(this.displayRelics[a].type,0)
                        this.complete[0]=true
                        if(this.complete[1]){
                            transition.trigger=true
                            transition.scene='map'
                        }
                    }else if(inputs.rel.x>this.displayRelics[a].position.x){
                        this.addRelic(this.displayRelics[a].type,1)
                        this.complete[1]=true
                        if(this.complete[0]){
                            transition.trigger=true
                            transition.scene='map'
                        }
                    }
                }
            break
        }
    }
    update(scene){
        switch(scene){
            case 'battle':
                for(let a=0,la=this.relics.length;a<la;a++){
                    this.relics[a].update(this.up[this.relics[a].player],this.total[this.relics[a].player],inputs)
                }
            break
            case 'stash':
                for(let a=0,la=this.displayRelics.length;a<la;a++){
                    this.displayRelics[a].update(true,0,inputs)
                }
            break
        }
    }
    onClick(scene){
        switch(scene){
            case 'battle':
                if(dist(inputs.rel.x,inputs.rel.y,25,100)<20&&this.total[0]>1){
                    this.up[0]=toggle(this.up[0])
                }
                if(this.battle.player.length==2&&dist(inputs.rel.x,inputs.rel.y,this.layer.width-25,100)<20&&this.total[1]>0){
                    this.up[1]=toggle(this.up[1])
                }
            break
            case 'stash':
                for(let a=0,la=this.displayRelics.length;a<la;a++){
                    if(dist(inputs.rel.x,inputs.rel.y,this.displayRelics[a].position.x,this.displayRelics[a].position.y)<20*this.displayRelics[a].size&&!this.displayRelics[a].deFade&&(this.battle.player.length==1&&!this.complete[0]||this.battle.player.length==2&&(inputs.rel.x<this.displayRelics[a].position.x&&!this.complete[0]||inputs.rel.x>this.displayRelics[a].position.x&&!this.complete[1]))){
                        this.callInput(0,a)
                    }
                }
            break
        }
    }
    onKey(scene,key,code){
        switch(scene){
            case 'battle':
                if(key=='i'&&this.total[0]>1){
                    this.up[0]=toggle(this.up[0])
                }
                if(this.battle.player.length==2&&key=='I'&&this.total[1]>0){
                    this.up[1]=toggle(this.up[1])
                }
            break
            case 'stash':
                for(let a=0,la=this.displayRelics.length;a<la;a++){
                    if((int(key)+9)%10==a&&!this.displayRelics[a].deFade&&(this.battle.player.length==1&&!this.complete[0]||this.battle.player.length==2&&(inputs.rel.x<this.displayRelics[a].position.x&&!this.complete[0]||inputs.rel.x>this.displayRelics[a].position.x&&!this.complete[1]))){
                        this.callInput(0,a)
                    }
                }
            break
        }
    }
}