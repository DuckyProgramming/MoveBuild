class disabledRelicManager{
    constructor(){}
    hasRelic(){return false}
}
class relicManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        
        this.listing={relic:[[],[],[],[],[]]}
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
        for(let a=0,la=this.battle.players;a<la;a++){
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
                case 64: case 70: case 73: case 78: case 90: case 93: case 108: case 111: case 118:
                    this.detail.push(0)
                break
                default:
                    this.detail.push(-1)
                break
            }
        }
        for(let a=0,la=this.battle.players;a<la;a++){
            this.complete.push(false)
            this.position.push(0)
            this.total.push(0)
            this.up.push(false)
        }
    }
    setupStash(){
        this.displayRelics=[]
        for(let a=0,la=this.complete.length;a<la;a++){
            this.complete[a]=false
        }
        if(this.battle.tutorialManager.active){
            for(let a=0,la=3;a<la;a++){
                this.displayRelics.push(new relic(this.layer,1-this.battle.players,this.layer.width/2,this.layer.height/2+50-la*50+a*100,findInternal('Placeholder',types.relic),2))
            }
        }else{
            let relics=copyArrayStack(this.listing.relic)
            let possible=[0,0,0,1,1,2]
            for(let a=0,la=this.active[109]>0?5:3;a<la;a++){
                let rarity=possible[floor(random(0,possible.length))]
                let index=floor(random(0,relics[rarity].length))
                this.displayRelics.push(new relic(this.layer,1-this.battle.players,this.layer.width/2,this.layer.height/2+50-la*50+a*100,relics[rarity][index],2))
                relics[rarity].splice(index,1)
            }
        }
    }
    setupBossStash(){
        this.displayRelics=[]
        for(let a=0,la=this.complete.length;a<la;a++){
            this.complete[a]=false
        }
        if(this.battle.tutorialManager.active){
            for(let a=0,la=3;a<la;a++){
                this.displayRelics.push(new relic(this.layer,1-this.battle.players,this.layer.width/2,this.layer.height/2+50-la*50+a*100,findInternal('Placeholder',types.relic),2))
            }
        }else{
            let relics=copyArrayStack(this.listing.relic)
            for(let a=0,la=3;a<la;a++){
                let rarity=4
                let index=floor(random(0,relics[rarity].length))
                this.displayRelics.push(new relic(this.layer,1-this.battle.players,this.layer.width/2+50-la*50+a*100,this.layer.height/2-45,relics[rarity][index],2))
                relics[rarity].splice(index,1)
            }
        }
    }
    addRelic(type,player){
        for(let a=0,la=this.listing.relic.length;a<la;a++){
            for(let b=0,lb=this.listing.relic[a].length;b<lb;b++){
                if(type==this.listing.relic[a][b]){
                    this.listing.relic[a].splice(b,1)
                }
            }
        }
        this.player[types.relic[type].id]=player
        this.active[types.relic[type].id]+=1
        if(types.relic[type].name=='Menger Square'){
            stop=false
            for(let a=0,la=this.relics.length;a<la;a++){
                if(this.relics[a].player==player&&this.relics[a].name=='Menger Square'){
                    stop=true
                }
            }
            if(!stop){
                if(this.battle.players==2){
                    this.relics.push(new relic(this.layer,player,this.layer.width*player+(25+(this.position[player]%8)*50)*(1-2*player),100+floor(this.position[player]/8)*50,types.relic[type].id,1))
                }else{
                    this.relics.push(new relic(this.layer,player,25+(this.position[player]%18)*50,100+floor(this.position[player]/18)*50,types.relic[type].id,1))
                }
                this.position[player]++
            }
        }else{
            if(this.battle.players==2){
                this.relics.push(new relic(this.layer,player,this.layer.width*player+(25+(this.position[player]%8)*50)*(1-2*player),100+floor(this.position[player]/8)*50,types.relic[type].id,1))
            }else{
                this.relics.push(new relic(this.layer,player,25+(this.position[player]%18)*50,100+floor(this.position[player]/18)*50,types.relic[type].id,1))
            }
            this.position[player]++
        }
        this.get(types.relic[type].id,player)
        if(type>0){
            this.battle.stats.relic[player]++
            this.total[player]++
        }
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
    loseRandomRelic(player){
        let list=[]
        for(let a=1,la=this.player.length;a<la;a++){
            if(this.player[a]==player&&this.active[a]>0){
                list.push(a)
            }
        }
        let index=list[floor(random(0,list.length))]
        this.active[index]-=1
        this.lose(index,player)
    }
    addRandomRelic(player){
        let possible=[0,0,0,1,1,2]
        let rarity=possible[floor(random(0,possible.length))]
        if(this.listing.relic[rarity]==0){
            this.addRelic(findName('Menger Square',types.relic),player)
        }else{
            let index=floor(random(0,this.listing.relic[rarity].length))
            this.addRelic(this.listing.relic[rarity][index],player)
        }
    }
    addSetRelic(rarity,player){
        if(this.listing.relic[rarity]==0){
            this.addRelic(findName('Menger Square',types.relic),player)
        }else{
            let index=floor(random(0,this.listing.relic[rarity].length))
            this.addRelic(this.listing.relic[rarity][index],player)
        }
    }
    makeRelicSelection(rarity){
        let list=[]
        let relics=copyArrayStack(this.listing.relic)
        for(let a=0,la=rarity.length;a<la;a++){
            if(relics[rarity[a]].length>0){
                let index=floor(random(0,relics[rarity[a]].length))
                list.push(relics[rarity[a]][index])
                relics[rarity[a]].splice(index,1)
            }else{
                list.push(findName('Menger Square',types.relic))
            }
        }
        return list
    }
    get(type,player){
        switch(type){
            case 5:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].gainMaxHP(6)
            break
            case 16:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].gainMaxHP(10)
            break
            case 29:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].gainMaxHP(14)
            break
            case 30:
                this.battle.addCurrency(600,player)
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
                this.battle.itemManager.effectiveness[player]*=2
            break
            case 102:
                this.battle.overlayManager.overlays[3][player].takable++
            break
            case 123:
                this.battle.overlayManager.overlays[12][player].active=true
                this.battle.overlayManager.overlays[12][player].activate([])
            break
            case 125:
                let owner=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)]
                owner.gainMaxHP(10)
                owner.heal(owner.base.life)
            break
            case 127:
                for(let a=0,la=3;a<la;a++){
                    this.addRandomRelic(player)
                }
                this.battle.cardManagers[player].deck.add(findName('Hoarding',types.card),0,game.playerNumber+2)
            break
            case 130:
                this.battle.overlayManager.overlays[14][player].active=true
                this.battle.overlayManager.overlays[14][player].activate([])
            break
            case 131:
                this.battle.energy.base[player]++
                this.battle.overlayManager.overlays[3][player].options--
            break
            case 132:
                this.battle.energy.base[player]++
                this.battle.optionManagers[player].removeOption(1)
            break
            case 133:
                this.battle.energy.base[player]++
                this.battle.optionManagers[player].removeOption(2)
            break
            case 134:
                this.battle.energy.base[player]++
                let manager=this.battle.cardManagers[player]
                manager.deck.add(manager.listing.card[game.playerNumber+2][3][floor(random(0,manager.listing.card[game.playerNumber+2][3].length))],0,game.playerNumber+2)
                manager.deck.add(manager.listing.card[game.playerNumber+2][3][floor(random(0,manager.listing.card[game.playerNumber+2][3].length))],0,game.playerNumber+2)
            break
            case 135: case 136: case 137: case 138: case 140: case 141: case 142:  case 144: case 145: case 146: case 147: case 148:
                this.battle.energy.base[player]++
            break
            case 139:
                this.battle.energy.base[player]++
                this.battle.cardManagers[player].drawAmount--
            break
            case 143:
                this.battle.energy.base[player]++
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].loseMaxHP(10)
            break
            case 151:
                this.battle.overlayManager.overlays[15][player].active=true
                this.battle.overlayManager.overlays[15][player].activate([])
            break
            case 154:
                for(let a=0,la=this.battle.cardManagers[player].deck.cards.length;a<la;a++){
                    if(this.battle.cardManagers[player].deck.cards[a].basic){
                        if(this.battle.cardManagers[player].deck.cards[a].name=='Step'||this.battle.cardManagers[player].deck.cards[a].name=='Step-L'||this.battle.cardManagers[player].deck.cards[a].name=='Step-R'){
                            if(this.battle.cardManagers[player].deck.cards[a].level==0){
                                this.battle.cardManagers[player].deck.cards[a]=upgradeCard(this.battle.cardManagers[player].deck.cards[a])
                            }
                        }else{
                            this.battle.cardManagers[player].deck.cards[a]=this.battle.cardManagers[player].transformCard(this.battle.cardManagers[player].deck.cards[a])
                        }
                    }
                }
            break
            case 155:
                this.battle.cardManagers[player].drawAmount+=2
            break
            case 156:
                this.battle.cardManagers[player].drawAmount+=3
            break
            case 157:
                this.battle.itemManager.effectiveness[player]*=5
            break
            case 159:
                this.battle.itemManager.addRandomItem(player)
                this.battle.addCurrency(200,player)
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].gainMaxHP(10)
                this.battle.overlayManager.overlays[3][player].active=true
                this.battle.overlayManager.overlays[3][player].activate([0,2,0])
                this.battle.cardManagers[player].randomEffect(0,2,[0])
            break
            case 160:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].gainMaxHP(30)
            break
            case 168:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].gainMaxHP(0.5)
            break

        }
    }
    lose(type,player){
        switch(type){
            case 5:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].loseMaxHP(6)
            break
            case 16:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].loseMaxHP(10)
            break
            case 29:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].loseMaxHP(14)
            break
            case 30:
                this.battle.currency.money[player]-=500
            break
            case 32:
                this.battle.cardManagers[player].randomEffect(0,3,[1])
                this.battle.cardManagers[player].randomEffect(0,3,[1])
            break
            case 33:
                this.battle.cardManagers[player].randomEffect(0,3,[2])
                this.battle.cardManagers[player].randomEffect(0,3,[2])
            break
            case 34:
                this.battle.cardManagers[player].randomEffect(0,3,[3])
                this.battle.cardManagers[player].randomEffect(0,3,[3])
            break
            case 35:
                this.battle.cardManagers[player].randomEffect(0,3,[4])
                this.battle.cardManagers[player].randomEffect(0,3,[4])
            break
            case 46:
                this.battle.overlayManager.overlays[3][player].options--
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
                this.battle.itemManager.removeItemSlots(2,player)
            break
            case 77:
                this.battle.itemManager.effectiveness[player]/=2
            break
            case 102:
                this.battle.overlayManager.overlays[3][player].takable--
            break
            case 123:
                this.battle.cardManagers[player].deck.unDuplicate()
            break
            case 125:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].loseMaxHP(10)
            break
            case 127:
                for(let a=0,la=3;a<la;a++){
                    this.loseRandomRelic(player)
                }
                this.battle.cardManagers[player].deck.removeType(findName('Hoarding',types.card))
            break
            case 130:
                this.battle.cardManagers[player].deck.unInnate()
            break
            case 131:
                this.battle.energy.base[player]--
                this.battle.overlayManager.overlays[3][player].options++
            break
            case 132:
                this.battle.energy.base[player]--
                this.battle.optionManagers[player].addOption(1)
            break
            case 133:
                this.battle.energy.base[player]--
                this.battle.optionManagers[player].addOption(2)
            break
            case 134:
                this.battle.energy.base[player]++
                let manager=this.battle.cardManagers[player]
                manager.deck.removeCurse()
                manager.deck.removeCurse()
            break
            case 135: case 136: case 137: case 138: case 140: case 141: case 142: case 144: case 145: case 146: case 147: case 148:
                this.battle.energy.base[player]--
            break
            case 139:
                this.battle.energy.base[player]--
                this.battle.cardManagers[player].drawAmount++
            break
            case 143:
                this.battle.energy.base[player]--
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].gainMaxHP(10)
            break
            case 151:
                this.battle.cardManagers[player].deck.unRemove()
                this.battle.cardManagers[player].deck.unRemove()
                this.battle.cardManagers[player].deck.unRemove()
            break
            case 154:
                for(let a=0,la=this.battle.cardManagers[player].deck.cards.length;a<la;a++){
                    if(!this.battle.cardManagers[player].deck.cards[a].basic){
                        this.battle.cardManagers[player].deck.cards[a]=this.battle.cardManagers[player].transformCardToBasic(this.battle.cardManagers[player].deck.cards[a])
                    }
                }
            break
            case 155:
                this.battle.cardManagers[player].drawAmount-=2
            break
            case 156:
                this.battle.cardManagers[player].drawAmount-=3
            break
            case 157:
                this.battle.itemManager.effectiveness[player]/=5
            break
            case 159:
                this.battle.itemManager.loseRandom(player)
                this.battle.currency.money[player]-=200
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].loseMaxHP(10)
                this.battle.cardManagers[player].deck.removeRarity(2)
                this.battle.cardManagers[player].randomEffect(0,3,[0])
            break
            case 160:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].loseMaxHP(30)
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
    loseRandom(player){
        let possible=[]
        for(let a=0,la=this.relics.length;a<la;a++){
            if(this.player[this.relics[a].type]==player&&this.relics[a].active&&this.relics[a].type>0){
                possible.push(this.relics[a].type)
            }
        }
        if(possible.length>0){
            this.loseRelic(possible[floor(random(0,possible.length))])
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
                            this.relicPlayer(31).statusEffect('Single Damage',8*this.active[31])
                        }
                        if(this.active[36]>0){
                            this.relicPlayer(36).addBlock(10*this.active[36])
                        }
                        if(this.active[38]>0&&this.detail[38]==1){
                            this.detail[38]=0
                            this.battle.energy.main[this.player[38]]+=2*this.active[38]
                        }
                        if(this.active[45]>0&&args[1]==2){
                            this.relicPlayer(45).heal(this.relicPlayer(45).base.life)
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
                        if(this.active[93]>0&&this.detail[93]==1){
                            this.detail[93]=0
                            this.battle.energy.main[this.player[93]]+=2*this.active[93]
                        }
                        if(this.active[96]>0&&args[1]==1){
                            this.battle.combatantManager.allEffect(1,[1-this.active[96]*0.2])
                        }
                        if(this.active[111]>0&&args[1]!=2){
                            this.detail[111]++
                            if(this.detail[111]<=3){
                                this.battle.combatantManager.allEffect(2,[1])
                            }
                        }
                        if(this.active[122]>0){
                            this.relicPlayer(122).statusEffect('Control',this.active[122])
                        }
                        if(this.active[137]>0){
                            this.battle.combatantManager.allEffect(3,[this.active[137]])
                        }
                        if(this.active[146]>0){
                            this.battle.combatantManager.allEffect(4,[this.active[146]])
                        }
                        if(this.active[147]>0){
                            this.battle.combatantManager.allEffect(5,[1+this.active[147]*0.2])
                        }
                        if(this.active[149]>0){
                            this.relicPlayer(149).statusEffect('Free Card',2*this.active[149])
                        }
                        if(this.active[39]>0){this.detail[39]=0}
                        if(this.active[108]>0){this.detail[108]=0}
                    break
                    case 2:
                        if(this.active[41]>0){
                            this.relicPlayer(41).addBlock(16*this.active[41])
                        }
                        if(this.active[72]>0){
                            this.battle.energy.main[this.player[72]]+=2*this.active[72]
                        }
                    break
                    case 3:
                        if(this.active[112]>0){
                            this.relicPlayer(112).addBlock(24*this.active[112])
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
                if(this.active[105]>0){
                    let ownerCombatant=this.relicPlayer(105)
                    if(ownerCombatant.life<ownerCombatant.base.life/2){
                        ownerCombatant.statusEffect('Strength',this.active[105])
                    }
                }
                if(this.active[148]>0&&args[0]>=2){
                    this.relicPlayer(148).statusEffect('Dexterity',-this.active[148])
                }
                if(this.active[152]>0&&(args[1]==1||args[1]==2)){
                    this.battle.energy.main[this.player[152]]+=2*this.active[152]
                }
            break
            case 1://end of combat
                if(this.active[1]>0){
                    this.relicPlayer(1).heal(3*this.active[1])
                }
                if(this.active[19]>0){
                    if(this.relicPlayer(19).life<this.relicPlayer(19).base.life){
                        this.relicPlayer(19).heal(12*this.active[19])
                    }
                }
                if(this.active[153]>0){
                    this.relicPlayer(153).heal(10*this.active[153])
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
                        for(let a=0,la=4*this.active[52];a<la;a++){
                            this.battle.cardManagers[this.player[52]].hand.add(findName('Shiv',types.card),0,0)
                        }
                    }
                    if(this.active[126]>0&&args[1]==this.player[126]){
                        this.battle.overlayManager.overlays[10][this.player[126]].active=true
                        this.battle.overlayManager.overlays[10][this.player[126]].activate([0,3,1])
                    }
                    if(this.active[144]>0&&args[1]==this.player[144]){
                        for(let a=0,la=this.active[144];a<la;a++){
                            this.battle.cardManagers[this.player[144]].reserve.addShuffle(findName('Electrocuted',types.card),0,game.playerNumber+1)
                        }
                    }
                    if(this.active[156]>0){
                        this.battle.cardManagers[this.player[156]].allEffect(2,5)
                    }
                    if(this.active[158]>0&&args[1]==this.player[158]){
                        for(let a=0,la=3*this.active[158];a<la;a++){
                            this.battle.cardManagers[this.player[158]].hand.add(findName('Miracle',types.card),0,0)
                        }
                    }
                }else{
                    if(args[0]==2){
                        if(this.active[114]>0&&args[1]==this.player[114]){
                            for(let a=0,la=this.active[114];a<la;a++){
                                if(this.battle.cardManagers[this.player[114]].discard.cards.length>0){
                                    let pos=floor(random(0,this.battle.cardManagers[this.player[114]].discard.cards.length))
                                    this.battle.cardManagers[this.player[114]].discard.send(this.battle.cardManagers[this.player[114]].hand.cards,pos,pos+1,1)
                                }
                            }
                        }
                    }
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
                if(this.active[115]>0&&args[1]==this.player[115]){
                    for(let a=0,la=this.active[115];a<la;a++){
                        this.battle.cardManagers[this.player[115]].hand.add(findName('Back\nUp',types.card),0,0)
                    }
                }
                if(this.active[120]>0&&args[1]==this.player[120]){
                    let manager=this.battle.cardManagers[this.player[120]]
                    for(let a=0,la=this.active[120];a<la;a++){
                        if(manager.reserve.cards.length>0&&manager.reserve.cards[0].class==1){
                            manager.reserve.send(manager.hand.cards,0,1,1)
                            if(manager.hand.cards[manager.hand.cards.length-1].cost>0){
                                manager.hand.cards[manager.hand.cards.length-1].cost--
                            }
                        }
                    }
                }
                if(this.active[161]>0&&args[1]==this.player[161]){
                    for(let a=0,la=this.active[161];a<la;a++){
                        this.battle.cardManagers[this.player[161]].randomEffect(2,2,[0])
                    }
                }
                if(this.active[162]>0&&args[1]==this.player[162]){
                    for(let a=0,la=this.active[162];a<la;a++){
                        this.battle.cardManagers[this.player[162]].randomEffect(2,4,[0])
                    }
                }
            break
            case 3://enemy dies
                if(this.active[17]>0){
                    this.battle.cardManagers[this.player[17]].draw(this.active[17])
                    this.battle.energy.main[this.player[17]]+=this.active[17]
                }
                if(this.active[94]>0){
                    this.relicPlayer(94).statusEffect('Strength',2*this.active[94])
                }
                if(this.active[95]>0){
                    this.relicPlayer(95).statusEffect('Dexterity',2*this.active[95])
                }
                if(this.active[116]>0){
                    this.battle.addCurrency(10*this.active[116],this.player[116])
                }
            break
            case 4://playing card [class,plauer]
                if(this.active[18]>0&&args[1]==this.player[18]){
                    this.detail[18]++
                    if(this.detail[18]%10==0){
                        this.battle.cardManagers[this.player[18]].draw(this.active[18])
                    }
                }
                if(this.active[140]>0&&args[1]==this.player[140]){
                    if(this.battle.counter.turnPlayed[0]>=5){
                        this.battle.cardManagers[this.battle.turn.main].allEffect(2,2)
                        this.battle.energy.main[this.battle.turn.main]=0
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
                            this.relicPlayer(27).heal(2*this.active[1])
                        }
                    break
                }
            break
            case 5://adding card [player]
                if(this.active[40]>0&&args[0]==this.player[40]){
                    this.battle.addCurrency(20*this.active[40],this.player[40])
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
            case 7://entering room [room]
                if(this.active[91]>0&&args[0]!=4){
                    this.battle.addCurrency(20*this.active[91],this.player[91])
                }
                if(this.active[166]>0){
                    this.battle.addCurrency(10*this.active[166],this.player[166])
                }
                switch(args[0]){
                    case 3://rest
                        if(this.active[38]>0&&this.detail[38]==0){
                            this.detail[38]=1
                        }
                    break
                    case 4://shop
                        if(this.active[91]>0){
                            this.loseRelic(91)
                        }
                        if(this.active[92]>0){
                            this.relicPlayer(92).heal(15*this.active[92])
                        }
                        if(this.active[93]>0&&this.detail[93]==0){
                            this.detail[93]=1
                        }
                        if(this.active[118]>0&&this.detail[118]==1){
                            this.detail[118]=0
                        }
                    break
                }
            break
            case 8://skipping card [player]
                if(this.active[49]>0&&args[0]==this.player[49]){
                    this.relicPlayer(49).gainMaxHP(2*this.active[49])
                }
                if(this.active[101]>0&&args[0]==this.player[101]){
                    this.battle.addCurrency(10*this.active[101],this.player[101])
                }
            break
            case 9://start of player turn [turn,player]
                if(this.active[68]>0&&args[1]==this.player[68]){
                    let player=this.relicPlayer(68)
                    if(player.block<=0){
                        player.addBlock(6*this.active[68])
                    }
                }
            break
            case 10://card exhausted [player]
                if(this.active[113]>0&&args[0]==this.player[113]){
                    let manager=this.battle.cardManagers[this.player[113]]
                    for(let a=0,la=this.active[113];a<la;a++){
                        manager.hand.add(manager.listing.card[this.battle.player[manager.player]][3][floor(random(0,manager.listing.card[this.battle.player[manager.player]][3].length))],0,this.battle.player[this.player[113]])
                    }
                }
            break
            case 11://removing card [player]
                if(this.active[104]>0&&args[0]==this.player[104]){
                    this.relicPlayer(104).gainMaxHP(7*this.active[104])
                }
            break
            case 12://preentering room [room]
                switch(args[0]){
                    case 5://event
                        if(this.active[99]>0){
                            this.relicPlayer(99).heal(5*this.active[99])
                        }
                    break
                }
            break
        }
    }
    display(scene,args){
        let lea=this.displayRelics.length
        switch(scene){
            case 'battle': case 'map':
                for(let a=0,la=this.relics.length;a<la;a++){
                    this.relics[a].display(this.total[this.relics[a].player],this.active[types.relic[this.relics[a].type].id])
                }
                this.relics.forEach(relic=>relic.displayInfo())
            break
            case 'stash':
                if(this.battle.players>1){
                    for(let a=0,la=this.battle.players;a<la;a++){
                        displayPlayerSymbol(this.layer,40+a*(this.layer.width-80),40,this.battle.player[a],0,1,1)
                    }
                }
                this.displayRelics.forEach(relic=>relic.display(lea-1))
                this.displayRelics.forEach(relic=>relic.displayInfo())
                this.layer.fill(200,this.fade)
                this.layer.noStroke()
                this.layer.ellipse(this.layer.width/2,this.layer.height/2+40+this.displayRelics.length*50,60,60)
                this.layer.fill(80,this.fade)
                regTriangle(this.layer,this.layer.width/2,this.layer.height/2+40+this.displayRelics.length*50,20,20,90)
            break
            case 'bossstash':
                if(this.battle.players>1){
                    for(let a=0,la=this.battle.players;a<la;a++){
                        displayPlayerSymbol(this.layer,40+a*(this.layer.width-80),40,this.battle.player[a],0,1,1)
                    }
                }
                this.displayRelics.forEach(relic=>relic.display(lea-1))
                this.displayRelics.forEach(relic=>relic.displayInfo())
                this.layer.fill(200,this.fade)
                this.layer.noStroke()
                this.layer.ellipse(this.layer.width/2,this.layer.height/2+45,60,60)
                this.layer.fill(80,this.fade)
                regTriangle(this.layer,this.layer.width/2,this.layer.height/2+45,20,20,90)
            break
            case 'overlay':
                let position=0
                for(let a=0,la=this.relics.length;a<la;a++){
                    if(this.player[this.relics[a].type]==args[0]&&this.relics[a].type!=0){
                        this.relics[a].display(la-1,this.active[types.relic[this.relics[a].type].id],{x:this.layer.width/2-150+position%6*60,y:this.layer.height/2-120+floor(position/6)*60},true)
                        position++
                        if(position>=30){
                            position-=30
                        }
                    }
                }
                this.relics.forEach(relic=>relic.displayInfo())
            break
        }
    }
    callInput(type,a){
        switch(type){
            case 0:
                this.displayRelics[a].deFade=true
                if(this.battle.players==1){
                    this.addRelic(this.displayRelics[a].type,0)
                    this.complete[0]=true
                    transition.trigger=true
                    transition.scene='map'
                }else if(this.battle.players==2){
                    if(inputs.rel.x<this.displayRelics[a].position.x||this.complete[1]){
                        this.addRelic(this.displayRelics[a].type,0)
                        this.complete[0]=true
                        if(this.complete[1]){
                            transition.trigger=true
                            transition.scene='map'
                        }
                    }else if(inputs.rel.x>this.displayRelics[a].position.x||this.complete[0]){
                        this.addRelic(this.displayRelics[a].type,1)
                        this.complete[1]=true
                        if(this.complete[0]){
                            transition.trigger=true
                            transition.scene='map'
                        }
                    }
                }
            break
            case 1:
                this.displayRelics[a].deFade=true
                if(this.battle.players==1){
                    this.addRelic(this.displayRelics[a].type,0)
                    this.complete[0]=true
                    transition.trigger=true
                    this.battle.nextWorld()
                    transition.scene='map'
                }else if(this.battle.players==2){
                    if(inputs.rel.x<this.displayRelics[a].position.x){
                        this.addRelic(this.displayRelics[a].type,0)
                        this.complete[0]=true
                        if(this.complete[1]){
                            transition.trigger=true
                            this.battle.nextWorld()
                            transition.scene='map'
                        }
                    }else if(inputs.rel.x>this.displayRelics[a].position.x){
                        this.addRelic(this.displayRelics[a].type,1)
                        this.complete[1]=true
                        if(this.complete[0]){
                            transition.trigger=true
                            this.battle.nextWorld()
                            transition.scene='map'
                        }
                    }
                }
            break
        }
    }
    update(scene,args){
        switch(scene){
            case 'battle': case 'map':
                this.relics.forEach(relic=>relic.update(this.up[relic.player],this.total[relic.player],inputs))
            break
            case 'stash': case 'bossstash':
                this.displayRelics.forEach(relic=>relic.update(true,0,inputs))
            break
            case 'overlay':
                let position=0
                let index=0
                for(let a=0,la=this.relics.length;a<la;a++){
                    if(this.player[this.relics[a].type]==args[2]&&this.relics[a].type!=0){
                        if(index>=args[1]*30&&index<args[1]*30+30){
                            this.relics[a].update(args[0],this.total[relic.player],inputs,{x:this.layer.width/2-150+position%6*60,y:this.layer.height/2-120+floor(position/6)*60})
                            position++
                        }else{
                            this.relics[a].update(false,this.total[relic.player],inputs,{x:-10000,y:0})
                        }
                        index++
                    }else{
                        this.relics[a].update(false,this.total[relic.player],inputs,{x:-10000,y:0})
                    }
                }
            break
        }
    }
    onClick(scene,args){
        switch(scene){
            case 'battle': case 'map':
                if(dist(inputs.rel.x,inputs.rel.y,25,100)<20&&this.total[0]>0){
                    this.up[0]=toggle(this.up[0])
                }
                if(this.battle.players==2&&dist(inputs.rel.x,inputs.rel.y,this.layer.width-25,100)<20&&this.total[1]>0){
                    this.up[1]=toggle(this.up[1])
                }
            break
            case 'stash':
                for(let a=0,la=this.displayRelics.length;a<la;a++){
                    if(dist(inputs.rel.x,inputs.rel.y,this.displayRelics[a].position.x,this.displayRelics[a].position.y)<20*this.displayRelics[a].size&&!this.displayRelics[a].deFade&&(this.battle.players==1&&!this.complete[0]||this.battle.players==2&&(inputs.rel.x<this.displayRelics[a].position.x&&!this.complete[0]||inputs.rel.x>this.displayRelics[a].position.x&&!this.complete[1]))){
                        this.callInput(0,a)
                    }
                }
                if(dist(inputs.rel.x,inputs.rel.y,this.layer.width/2,this.layer.height/2+40+this.displayRelics.length*50)<30){
                    transition.trigger=true
                    transition.scene='map'
                }
            break
            case 'bossstash':
                for(let a=0,la=this.displayRelics.length;a<la;a++){
                    if(dist(inputs.rel.x,inputs.rel.y,this.displayRelics[a].position.x,this.displayRelics[a].position.y)<20*this.displayRelics[a].size&&!this.displayRelics[a].deFade&&(this.battle.players==1&&!this.complete[0]||this.battle.players==2&&(inputs.rel.x<this.displayRelics[a].position.x&&!this.complete[0]||inputs.rel.x>this.displayRelics[a].position.x&&!this.complete[1]))){
                        this.callInput(1,a)
                    }
                }
                if(dist(inputs.rel.x,inputs.rel.y,this.layer.width/2,this.layer.height/2+45)<30){
                    transition.trigger=true
                    this.battle.nextWorld()
                    transition.scene='map'
                }
            break
            case 'overlay':
                let position=0
                let index=0
                for(let a=0,la=this.relics.length;a<la;a++){
                    if(this.player[this.relics[a].type]==args[0]&&this.relics[a].type!=0){
                        if(index>=args[1]*30&&index<args[1]*30+30){
                            if(dist(inputs.rel.x,inputs.rel.y,this.layer.width/2-150+position%6*60,this.layer.height/2-120+floor(position/6)*60)<20&&this.active[this.relics[a].type]>0){
                                this.battle.addCurrency(this.relics[a].value,this.player[this.relics[a].type])
                                this.loseRelic(this.relics[a].type)
                            }
                            position++
                        }
                        index++
                    }
                }
            break
        }
    }
    onKey(scene,key,code){
        switch(scene){
            case 'battle': case 'map':
                if(key=='i'&&this.total[0]>0){
                    this.up[0]=toggle(this.up[0])
                }
                if(this.battle.players==2&&key=='I'&&this.total[1]>0){
                    this.up[1]=toggle(this.up[1])
                }
            break
            case 'stash':
                for(let a=0,la=this.displayRelics.length;a<la;a++){
                    if((int(key)+9)%10==a&&!this.displayRelics[a].deFade&&(this.battle.players==1&&!this.complete[0]||this.battle.players==2&&(inputs.rel.x<this.displayRelics[a].position.x&&!this.complete[0]||inputs.rel.x>this.displayRelics[a].position.x&&!this.complete[1]))){
                        this.callInput(0,a)
                    }
                }
                if(code==ENTER){
                    transition.trigger=true
                    transition.scene='map'
                }
            break
            case 'bossstash':
                for(let a=0,la=this.displayRelics.length;a<la;a++){
                    if((int(key)+9)%10==a&&!this.displayRelics[a].deFade&&(this.battle.players==1&&!this.complete[0]||this.battle.players==2&&(inputs.rel.x<this.displayRelics[a].position.x&&!this.complete[0]||inputs.rel.x>this.displayRelics[a].position.x&&!this.complete[1]))){
                        this.callInput(1,a)
                    }
                }
                if(code==ENTER){
                    transition.trigger=true
                    this.battle.nextWorld()
                    transition.scene='map'
                }
            break
        }
    }
}