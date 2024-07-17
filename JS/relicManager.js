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
        this.detail=[]

        this.relics=[]
        this.displayRelics=[]
        this.position=[]
        this.total=[]
        this.up=[]
        this.complete=[]
        this.lost=[]

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
            this.active.push([])
            for(let b=0,lb=this.battle.players+1;b<lb;b++){
                this.active[a].push(0)
            }
            switch(types.relic[a].id){
                case 4: case 18: case 37: case 38: case 39: case 42: case 43: case 44: case 59: case 60:
                case 63: case 64: case 70: case 73: case 78: case 90: case 93: case 108: case 111: case 118:
                case 139: case 201: case 204: case 205: case 244: case 254: case 293: case 298: case 308: case 317:
                case 321: case 323: case 324:
                    this.detail.push([])
                    for(let b=0,lb=this.battle.players;b<lb;b++){
                        this.detail[this.detail.length-1].push(0)
                    }
                break
                case 206: case 295:
                    this.detail.push([])
                    for(let b=0,lb=this.battle.players;b<lb;b++){
                        this.detail[this.detail.length-1].push([0,0])
                    }
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
            this.lost.push([])
        }
    }
    setupStash(){
        this.displayRelics=[]
        for(let a=0,la=this.complete.length;a<la;a++){
            this.complete[a]=false
        }
        if(this.battle.tutorialManager.active){
            for(let a=0,la=3;a<la;a++){
                this.displayRelics.push(new relic(this.layer,this.battle,1-this.battle.players,this.layer.width/2,this.layer.height/2+50-la*50+a*100,findInternal('Placeholder',types.relic),2))
            }
        }else{
            let relics=copyArrayStack(this.listing.relic)
            let possible=[0,0,0,1,1,2]
            for(let a=0,la=this.active[109]>0?5:3;a<la;a++){
                let rarity=possible[floor(random(0,possible.length))]
                if(relics[rarity].length==0){
                    this.displayRelics.push(new relic(this.layer,this.battle,1-this.battle.players,this.layer.width/2,this.layer.height/2+50-la*50+a*100,findName('Menger Square',types.relic),2))
                }else{
                    let index=floor(random(0,relics[rarity].length))
                    this.displayRelics.push(new relic(this.layer,this.battle,1-this.battle.players,this.layer.width/2,this.layer.height/2+50-la*50+a*100,relics[rarity][index],2))
                    relics[rarity].splice(index,1)
                }
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
                this.displayRelics.push(new relic(this.layer,this.battle,1-this.battle.players,this.layer.width/2,this.layer.height/2+50-la*50+a*100,findInternal('Placeholder',types.relic),2))
            }
        }else{
            let relics=copyArrayStack(this.listing.relic)
            for(let a=0,la=3;a<la;a++){
                let rarity=4
                let index=floor(random(0,relics[rarity].length))
                this.displayRelics.push(new relic(this.layer,this.battle,1-this.battle.players,this.layer.width/2+50-la*50+a*100,this.layer.height/2-45,relics[rarity][index],2))
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
        if(types.relic[type].id==226){
            for(let a=0,la=3;a<la;a++){
                this.loseRandomRelic(player)
            }
        }
        this.active[types.relic[type].id][0]+=1
        this.active[types.relic[type].id][player+1]+=1
        stop=false
        for(let a=0,la=this.relics.length;a<la;a++){
            if(this.relics[a].player==player&&this.relics[a].name==types.relic[type].name){
                stop=true
            }
        }
        if(!stop){
            if(this.battle.players==2){
                this.relics.push(new relic(this.layer,this.battle,player,this.layer.width*player+(25+(this.position[player]%8)*50)*(1-2*player),100+floor(this.position[player]/8)*50,types.relic[type].id,1))
            }else{
                this.relics.push(new relic(this.layer,this.battle,player,25+(this.position[player]%18)*50,100+floor(this.position[player]/18)*50,types.relic[type].id,1))
            }
            this.position[player]++
        }
        this.get(types.relic[type].id,player)
        if(type>0){
            this.battle.stats.relic[player]++
            this.total[player]++
        }
    }
    loseRelic(type,player){
        this.active[types.relic[type].id][0]-=1
        this.active[types.relic[type].id][player+1]-=1
        this.lose(types.relic[type].id,player)
        if(type>0){
            this.total[player]--
        }
    }
    loseRandomRelic(player){
        let list=[]
        for(let a=1,la=this.active.length;a<la;a++){
            if(this.active[a][player+1]>0){
                list.push(a)
            }
        }
        if(list.length>0){
            let index=list[floor(random(0,list.length))]
            this.active[index][0]-=1
            this.active[index][player+1]-=1
            this.lose(index,player)
        }
    }
    getRandomRelic(player){
        let list=[]
        for(let a=1,la=this.active.length;a<la;a++){
            if(this.active[a][player+1]>0){
                list.push(a)
            }
        }
        if(list.length>0){
            return list[floor(random(0,list.length))]
        }
        return 0
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
    returnLostRelic(player){
        if(this.lost[player].length>0){
            this.addRelic(this.lost[player][this.lost[player].length-1],player)
            this.lost[player].splice(this.lost[player].length-1,1)
        }
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
            case 97:
                this.battle.purchaseManager.costChange(player,0,0.5)
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
            case 132:
                this.battle.energyBaseUp(player)
                this.battle.optionManagers[player].removeOption(1)
            break
            case 133:
                this.battle.energyBaseUp(player)
                this.battle.optionManagers[player].removeOption(2)
            break
            case 134:
                this.battle.energyBaseUp(player)
                this.battle.cardManagers[player].addRandomAbstract(0,0,0,1,0,[],[game.playerNumber+2,3])
                this.battle.cardManagers[player].addRandomAbstract(0,0,0,1,0,[],[game.playerNumber+2,3])
            break
            case 131: case 135: case 136: case 137: case 138: case 140: case 141: case 142: case 144: case 145:
            case 146: case 147: case 148: case 170: case 222: case 228: case 234: case 242: case 243: case 280:
            case 281: case 282: case 284: case 285: case 286: case 287: case 288: case 289: case 306:
                this.battle.energyBaseUp(player)
            break
            case 139:
                this.battle.energyBaseUp(player)
                this.battle.cardManagers[player].drawAmount--
            break
            case 143:
                this.battle.energyBaseUp(player)
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].loseMaxHP(10)
            break
            case 150:
                for(let a=0,la=this.battle.cardManagers[player].deck.cards.length;a<la;a++){
                    if(this.battle.cardManagers[player].deck.cards[a].name=='Step'||this.battle.cardManagers[player].deck.cards[a].name=='Step-L'||this.battle.cardManagers[player].deck.cards[a].name=='Step-R'){
                        let base=this.battle.cardManagers[player].deck.cards[a]
                        this.battle.cardManagers[player].deck.cards[a]=new card(base.layer,base.battle,base.player,base.position.x,base.position.y,findName('Swap',types.card),base.level,base.color,base.id)
                    }
                }
            break
            case 151:
                this.battle.overlayManager.overlays[15][player].active=true
                this.battle.overlayManager.overlays[15][player].activate([])
                this.battle.overlayManager.overlays[15][player].args[1]=6
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
                this.battle.addCurrency(300,player)
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
            case 181:
                for(let a=0,la=3;a<la;a++){
                    this.battle.cardManagers[player].randomEffect(0,30,[1])
                }
            break
            case 182:
                for(let a=0,la=3;a<la;a++){
                    this.battle.cardManagers[player].randomEffect(0,30,[2])
                }
            break
            case 183:
                for(let a=0,la=2;a<la;a++){
                    this.battle.cardManagers[player].randomEffect(0,30,[3])
                }
            break
            case 184:
                this.battle.cardManagers[player].randomEffect(0,30,[4])
            break
            case 185:
                this.battle.cardManagers[player].randomEffect(0,30,[5])
            break
            case 186:
                this.battle.cardManagers[player].randomEffect(0,30,[6])
            break
            case 201:
                this.detail[201][player]+=16
            break
            case 213:
                this.battle.energyBaseUp(player)
                this.battle.cardManagers[player].allEffect(0,65)
            break
            case 214:
                this.battle.energyBaseUp(player)
                for(let a=0,la=5;a<la;a++){
                    this.battle.cardManagers[player].randomEffect(0,3,[0])
                }
            break
            case 215:
                this.battle.cardManagers[player].addRandomAbstract(0,0,0,1,0,[],[game.playerNumber+4,3])
            break
            case 216:
                this.battle.purchaseManager.costChange(player,1,0)
            break
            case 218:
                this.battle.overlayManager.overlays[54][player].active=true
                this.battle.overlayManager.overlays[54][player].activate([])
            break
            case 223:
                this.battle.cardManagers[player].deck.cards[this.battle.cardManagers[player].deck.cards.length-1].cost=0
                this.battle.cardManagers[player].deck.cards[this.battle.cardManagers[player].deck.cards.length-1].additionalSpec.push(-1)
            break
            case 226:
                this.battle.energyBaseUp(player)
            break
            case 230:
                for(let a=0,la=this.relics.length;a<la;a++){
                    if(this.relics[a].player==player&&this.relics[a].type!=230&&this.active[this.relics[a].type][player+1]>0&&this.relics[a].type!=0){
                        this.loseRelic(this.relics[a].type,player)
                        a=la
                    }
                }
            break
            case 244:
                this.battle.optionManagers[player].addOption(9)
            break
            case 247:
                this.battle.cardManagers[player].addRandomAbstract(0,0,4,1,0,[],[0,0])
            break
            case 254:
                this.battle.optionManagers[player].addOption(10)
            break
            case 265:
                this.battle.optionManagers[player].addOption(11)
            break
            case 267:
                this.battle.purchaseManager.costChange(player,2,0)
            break
            case 268:
                this.battle.purchaseManager.costChange(player,3,0)
            break
            case 269:
                this.battle.purchaseManager.costChange(player,4,0.5)
            break
            case 270:
                this.battle.purchaseManager.costChange(player,9,0.5)
            break
            case 271:
                this.battle.purchaseManager.costChange(player,10,0.5)
            break
            case 272:
                this.battle.purchaseManager.costChange(player,11,0.5)
            break
            case 273:
                this.battle.purchaseManager.costChange(player,12,0.5)
            break
            case 283:
                this.battle.energyBaseUp(player)
                this.battle.loseCurrency(600,player)
            break
            case 275:
                this.battle.overlayManager.overlays[74][player].active=true
                this.battle.overlayManager.overlays[74][player].activate([])
            break
            case 276:
                this.battle.overlayManager.overlays[75][player].active=true
                this.battle.overlayManager.overlays[75][player].activate([])
            break
            case 277:
                this.battle.overlayManager.overlays[76][player].active=true
                this.battle.overlayManager.overlays[76][player].activate([])
            break
            case 278:
                this.battle.overlayManager.overlays[77][player].active=true
                this.battle.overlayManager.overlays[77][player].activate([])
            break
            case 290:
                this.battle.optionManagers[player].addOption(12)
                this.battle.optionManagers[player].removeOption(2)
            break
            case 291:
                this.battle.overlayManager.overlays[25][player].active=true
                this.battle.overlayManager.overlays[25][player].activate([0,[]])
                for(let a=0,la=5;a<la;a++){
                    this.battle.overlayManager.overlays[25][player].activate([1,[{type:1,value:[2,2,12]}]])
                }
            break
            case 294:
                for(let a=0,la=10;a<la;a++){
                    this.battle.cardManagers[player].deck.randomEffect(38,[0])
                }
            break
            case 297:
                this.battle.overlayManager.overlays[78][player].active=true
                this.battle.overlayManager.overlays[78][player].activate()
            break
            case 300:
                this.battle.purchaseManager.costChange(player,5,0.5)
            break
            case 301:
                this.battle.purchaseManager.costChange(player,6,0.5)
            break
            case 302:
                this.battle.purchaseManager.costChange(player,14,0.5)
            break
            case 303:
                this.battle.purchaseManager.costChange(player,15,0.5)
            break
            case 304:
                this.battle.purchaseManager.costChange(player,16,0.5)
            break
            case 305:
                this.battle.purchaseManager.costChange(player,17,0.5)
            break
            case 312:
                this.battle.cardManagers[player].randomEffect(0,2,[11])
                this.battle.cardManagers[player].randomEffect(0,2,[11])
            break
            case 313:
                this.battle.overlayManager.overlays[84][player].active=true
                this.battle.overlayManager.overlays[84][player].activate([])
            break

        }
        this.reactivate(type,player)
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
            case 97:
                this.battle.purchaseManager.costChange(player,0,2)
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
                this.battle.cardManagers[player].deck.removeAbstract(1,[findName('Hoarding',types.card)])
            break
            case 130:
                this.battle.cardManagers[player].deck.unInnate(-1)
            break
            case 132:
                this.battle.energyBaseDown(player)
                this.battle.optionManagers[player].addOption(1)
            break
            case 133:
                this.battle.energyBaseDown(player)
                this.battle.optionManagers[player].addOption(2)
            break
            case 134:
                this.battle.energyBaseUp(player)
                this.battle.cardManagers[player].deck.removeAbstract(2,[[6]])
                this.battle.cardManagers[player].deck.removeAbstract(2,[[6]])
            break
            case 131: case 135: case 136: case 137: case 138: case 140: case 141: case 142: case 144: case 145:
            case 146: case 147: case 148: case 222: case 228: case 234: case 242: case 243: case 280: case 281:
            case 282: case 284: case 285: case 286: case 287: case 288: case 289: case 306:
                this.battle.energyBaseDown(player)
            break
            case 139:
                this.battle.energyBaseDown(player)
                this.battle.cardManagers[player].drawAmount++
            break
            case 143:
                this.battle.energyBaseDown(player)
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].gainMaxHP(10)
            break
            case 151:
                for(let a=0,la=6;a<la;a++){
                    this.battle.cardManagers[player].deck.unRemove()
                }
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
                this.battle.loseCurrency(300,player)
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].loseMaxHP(10)
                this.battle.cardManagers[player].deck.removeAbstract(3,[2])
                this.battle.cardManagers[player].randomEffect(0,3,[0])
            break
            case 160:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].loseMaxHP(30)
            break
            case 168:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].loseMaxHP(0.5)
            break
            case 181:
                for(let a=0,la=3;a<la;a++){
                    this.battle.cardManagers[player].randomEffect(0,31,[1])
                }
            break
            case 182:
                for(let a=0,la=3;a<la;a++){
                    this.battle.cardManagers[player].randomEffect(0,31,[2])
                }
            break
            case 183:
                for(let a=0,la=2;a<la;a++){
                    this.battle.cardManagers[player].randomEffect(0,31,[3])
                }
            break
            case 184:
                this.battle.cardManagers[player].randomEffect(0,31,[4])
            break
            case 185:
                this.battle.cardManagers[player].randomEffect(0,31,[5])
            break
            case 186:
                this.battle.cardManagers[player].randomEffect(0,31,[6])
            break
            case 201:
                this.detail[201][player]=min(this.detail[201][player],16*this.active[201][player+1])
            break
            case 211:
                for(let a=0,la=this.relics.length;a<la;a++){
                    if(this.relics[a].player==player&&this.active[this.relics[a].type][player+1]>0&&this.relics[a].type!=0){
                        this.addRelic(this.relics[a].type,player)
                        a=la
                    }
                }
            break
            case 213:
                this.battle.energyBaseUp(player)
            break
            case 214:
                this.battle.energyBaseUp(player)
                for(let a=0,la=5;a<la;a++){
                    this.battle.cardManagers[player].randomEffect(0,2,[0])
                }
            break
            case 215:
                this.battle.cardManagers[player].deck.removeAbstract(4,[game.playerNumber+4])
            break
            case 216:
                this.battle.purchaseManager.costChange(player,1,-1)
            break
            case 217:
                let list=[]
                for(let a=0,la=this.relics.length;a<la;a++){
                    if(this.relics[a].player==player&&this.active[this.relics[a].type][player+1]>0&&this.relics[a].type!=0){
                        list.push(a)
                    }
                }
                if(list.length>0){
                    let type=this.relics[list[floor(random(0,list.length))]].type
                    this.addRelic(type,player)
                }
            break
            case 223:
                this.battle.cardManagers[player].deck.cards[this.battle.cardManagers[player].deck.cards.length-1].cost=69
            break
            case 226:
                this.battle.energyBaseDown(player)
                for(let a=0,la=3;a<la;a++){
                    this.returnLostRelic(player)
                }
            break
            case 230:
                for(let a=0,la=this.relics.length;a<la;a++){
                    if(this.relics[a].player==player&&this.relics[a].type!=230&&this.active[this.relics[a].type][player+1]==0&&this.relics[a].type!=0){
                        this.addRelic(this.relics[a].type,player)
                        a=la
                    }
                }
            break
            case 236:
                this.addRandomRelic(player)
            break
            case 244:
                this.battle.optionManagers[player].removeOption(9)
            break
            case 247:
                this.battle.cardManagers[player].deck.removeAbstract(5,[0,4])
            break
            case 254:
                this.battle.optionManagers[player].removeOption(10)
            break
            case 265:
                this.battle.optionManagers[player].removeOption(11)
            break
            case 267:
                this.battle.purchaseManager.costChange(player,2,-1)
            break
            case 268:
                this.battle.purchaseManager.costChange(player,3,-1)
            break
            case 269:
                this.battle.purchaseManager.costChange(player,4,2)
            break
            case 270:
                this.battle.purchaseManager.costChange(player,9,2)
            break
            case 271:
                this.battle.purchaseManager.costChange(player,10,2)
            break
            case 272:
                this.battle.purchaseManager.costChange(player,11,2)
            break
            case 273:
                this.battle.purchaseManager.costChange(player,12,2)
            break
            case 275:
                this.battle.cardManagers[player].deck.unInnate(1)
            break
            case 276:
                this.battle.cardManagers[player].deck.unInnate(2)
            break
            case 277:
                this.battle.cardManagers[player].deck.unInnate(3)
            break
            case 278:
                this.battle.cardManagers[player].deck.unInnate(4)
            break
            case 283:
                this.battle.energyBaseDown(player)
                this.battle.addCurrency(600,player)
            break
            case 290:
                this.battle.optionManagers[player].removeOption(12)
                this.battle.optionManagers[player].addOption(2)
            break
            case 291:
                for(let a=0,la=5;a<la;a++){
                    this.battle.cardManagers[player].deck.removeAbstract(8,[2,2])
                }
            break
            case 294:
                for(let a=0,la=10;a<la;a++){
                    this.battle.cardManagers[player].deck.randomEffect(47,[0])
                }
            break
            case 297:
                this.battle.cardManagers[player].deck.unTriochrome()
            break
            case 300:
                this.battle.purchaseManager.costChange(player,5,2)
            break
            case 301:
                this.battle.purchaseManager.costChange(player,6,2)
            break
            case 302:
                this.battle.purchaseManager.costChange(player,14,2)
            break
            case 303:
                this.battle.purchaseManager.costChange(player,15,2)
            break
            case 304:
                this.battle.purchaseManager.costChange(player,16,2)
            break
            case 305:
                this.battle.purchaseManager.costChange(player,17,2)
            break
            case 312:
                this.battle.cardManagers[player].randomEffect(0,3,[11])
                this.battle.cardManagers[player].randomEffect(0,3,[11])
            break
            case 313:
                this.battle.cardManagers[player].deck.unInnate(11)
            break

        }
        this.deactivate(type,player)
        this.lost[player].push(type)
    }
    deactivate(type,player){
        if(this.active[type][player+1]<=0){
            for(let a=0,la=this.relics.length;a<la;a++){
                if(this.relics[a].type==type){
                    this.relics[a].active=false
                }
            }
        }
    }
    reactivate(type,player){
        if(this.active[type][player+1]>0){
            for(let a=0,la=this.relics.length;a<la;a++){
                if(this.relics[a].type==type){
                    this.relics[a].active=true
                }
            }
        }
    }
    loseRandom(player){
        let possible=[]
        for(let a=0,la=this.relics.length;a<la;a++){
            if(this.relics[a].player==player&&this.active[this.relics[a].type][player+1]>0&&this.relics[a].active&&this.relics[a].type>0){
                possible.push(this.relics[a].type)
            }
        }
        if(possible.length>0){
            this.loseRelic(possible[floor(random(0,possible.length))],player)
        }
    }
    clearRelicsSin(player){
        for(let a=0,la=this.relics.length;a<la;a++){
            if(this.relics[a].player==player&&this.relics[a].rarity!=4&&this.active[this.relics[a].type][player+1]>0&&this.relics[a].active&&this.relics[a].type>0){
                for(let b=0,lb=this.active[this.relics[a].type][player+1];b<lb;b++){
                    this.active[this.relics[a].type][0]-=1
                    this.active[this.relics[a].type][player+1]-=1
                    this.deactivate(this.relics[a].type,player)
                }
            }
        }
    }
    hasRelic(type,player){
        return type>=0?this.active[type][player+1]>0:false
    }
    getPlayer(id){
        return this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(id)]
    }
    activate(type,args){
        switch(type){
            case 0://start of general turn [turn,class]
                switch(args[0]){
                    case 1:
                        for(let a=0,la=this.battle.players;a<la;a++){
                            if(this.active[2][a+1]>0){
                                this.battle.cardManagers[a].draw(2*this.active[2][a+1])
                            }
                            if(this.active[3][a+1]>0){
                                this.battle.addSpecificEnergy(this.active[3][a+1],a,6)
                            }
                            if(this.active[6][a+1]>0){
                                this.getPlayer(a).statusEffect('Strength',this.active[6][a+1])
                            }
                            if(this.active[7][a+1]>0){
                                this.getPlayer(a).statusEffect('Dexterity',this.active[7][a+1])
                            }
                            if(this.active[21][a+1]>0){
                                this.getPlayer(a).statusEffect('Buffer',this.active[21][a+1])
                            }
                            if(this.active[31][a+1]>0){
                                this.getPlayer(a).statusEffect('Single Damage Up',8*this.active[31][a+1])
                            }
                            if(this.active[36][a+1]>0){
                                this.getPlayer(a).addBlock(10*this.active[36][a+1])
                            }
                            if(this.active[38][a+1]>0&&this.detail[38][a]==1){
                                this.detail[38][a]=0
                                this.battle.addSpecificEnergy(2*this.active[38][a+1],a,6)
                            }
                            if(this.active[45][a+1]>0&&args[1]==2){
                                this.getPlayer(a).heal(this.getPlayer(a).base.life)
                            }
                            if(this.active[57][a+1]>0){
                                this.getPlayer(a).statusEffect('Armor',4*this.active[57][a+1])
                            }
                            if(this.active[60][a+1]>0){
                                this.getPlayer(a).statusEffect('Strength',this.detail[60][a])
                            }
                            if(this.active[86][a+1]>0){
                                this.getPlayer(a).statusEffect('Free Attack',this.active[86][a+1])
                            }
                            if(this.active[89][a+1]>0){
                                this.getPlayer(a).statusEffect('Take Half Damage',2*this.active[89][a+1])
                            }
                            if(this.active[93][a+1]>0&&this.detail[93][a]==1){
                                this.detail[93][a]=0
                                this.battle.addSpecificEnergy(2*this.active[93][a+1],a,6)
                            }
                            if(this.active[111][a+1]>0&&args[1]!=2){
                                this.detail[111][a]++
                                if(this.detail[111][a]<=3){
                                    this.battle.combatantManager.allEffect(2,[1])
                                }
                                if(this.detail[111][a]>=3){
                                    this.loseRelic(111,a)
                                }
                            }
                            if(this.active[122][a+1]>0){
                                this.getPlayer(a).statusEffect('Control',this.active[122][a+1])
                            }
                            if(this.active[149][a+1]>0){
                                this.getPlayer(a).statusEffect('Free Card',3*this.active[149][a+1])
                            }
                            if(this.active[188][a+1]>0){
                                if(floor(random(0,10))==0){
                                    this.loseRelic(188,a)
                                }else{
                                    this.getPlayer(a).statusEffect('Strength',3*this.active[188][a+1])
                                }
                            }
                            if(this.active[200][a+1]>0){
                                this.getPlayer(a).statusEffect('Strength',this.active[200][a+1]*floor(this.total[a]/10))
                            }
                            if(this.active[201][a+1]>0&&this.detail[201][a]>0){
                                this.getPlayer(a).statusEffect('Single Damage Up',this.detail[201][a])
                                this.detail[201][a]--
                            }
                            if(this.active[209][a+1]>0){
                                this.getPlayer(a).statusEffect('Strength',2*this.active[209][a+1]*floor(this.battle.currency.money[a]/500))
                            }
                            if(this.active[220][a+1]>0&&this.battle.itemManager.total[a]>0){
                                this.battle.cardManagers[a].draw(this.battle.itemManager.total[a]*this.active[220][a+1])
                            }
                            if(this.active[222][a+1]>0){
                                this.getPlayer(a).statusEffect('Return Buffer',this.active[222][a+1])
                            }
                            if(this.active[224][a+1]>0){
                                this.getPlayer(a).statusEffect('Conditioning',this.active[224][a+1])
                            }
                            if(this.active[237][a+1]>0){
                                this.battle.cardManagers[a].draw(this.active[237][a+1],9)
                            }
                            if(this.active[239][a+1]>0){
                                for(let b=0,lb=this.active[239][a+1];b<lb;b++){
                                    this.battle.itemManager.addItem(findName(['Cream Paper','Pink Paper'][floor(random(0,2))],types.item),a)
                                }
                            }
                            if(this.active[242][a+1]>0){
                                this.getPlayer(a).statusEffect('Miss',2*this.active[242][a])
                            }
                            if(this.active[228][a+1]>0){
                                this.getPlayer(a).statusEffect('Anti-Control',this.active[228][a+1])
                            }
                            if(this.active[256][a+1]>0){
                                this.getPlayer(a).statusEffect('Fragile Damage Up',this.active[256][a+1]*2)
                            }
                            if(this.active[320][a+1]>0){
                                this.getPlayer(a).statusEffect('Strength',this.active[320][a+1]*this.battle.cardManagers[a].deck.numberAbstract(4,[[6]]))
                            }
                            if(this.active[328][a+1]>0){
                                this.getPlayer(a).statusEffect('Single Attack Lose Per Turn',3*this.active[328][a+1])
                            }
                            if(this.active[329][a+1]>0){
                                this.getPlayer(a).statusEffect('Single Attack Remove Block',this.active[329][a+1])
                            }
                            if(this.active[39][a+1]>0){this.detail[39][a]=0}
                            if(this.active[108][a+1]>0){this.detail[108][a]=0}
                            if(this.active[206][a+1]>0){this.detail[206][a][0]=0}
                            if(this.active[317][a+1]>0){this.detail[317][a]=0}
                            if(this.active[323][a+1]>0){this.detail[323][a]=0}
                            if(this.active[324][a+1]>0){this.detail[324][a]=0}
                        }
                        if(this.active[96][0]>0&&args[1]==1){
                            this.battle.combatantManager.allEffect(1,[1-this.active[96][0]*0.2])
                        }
                        if(this.active[137][0]>0){
                            this.battle.combatantManager.allEffect(3,[this.active[137][0]*2])
                        }
                        if(this.active[146][0]>0){
                            this.battle.combatantManager.allEffect(4,[this.active[146][0]])
                        }
                        if(this.active[147][0]>0){
                            this.battle.combatantManager.allEffect(5,[1+this.active[147][0]*0.2])
                        }
                        if(this.active[241][0]>0){
                            this.battle.combatantManager.allEffect(35,[this.active[241][0]])
                        }
                        if(this.active[255][0]>0&&current.counter.enemy>=3){
                            this.battle.combatantManager.randomEffect(1,[2*this.active[255][0]])
                        }
                        if(this.active[281][0]>0&&args[1]==1){
                            this.battle.combatantManager.allEffect(3,[this.active[281][0]*5])
                        }
                        if(this.active[287][0]>0){
                            for(let a=0,la=this.active[287][0];a<la;a++){
                                let tile=this.battle.tileManager.getRandomTilePosition()
                                if(tile!=-1){
                                    this.battle.addCombatant(tile,findName(['Duck','Blue Duck','Management Autoduck','Void Duck'][this.battle.nodeManager.world],types.combatant),0,0,false)
                                    this.battle.counter.enemy++
                                    this.battle.combatantManager.recount()
                                    this.battle.tileManager.activate()
                                    this.battle.updateTargetting()
                                }
                            }
                        }
                        if(this.battle.modded(11)){
                            this.battle.combatantManager.fullAllEffect(3,[3])
                        }
                        if(this.battle.modded(113)){
                            for(let a=0,la=this.battle.players;a<la;a++){
                                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(a)].statusEffect(['Weak','Miss'][floor(random(0,2))],2)
                            }
                        }
                        if(this.battle.modded(133)){
                            for(let a=0,la=this.battle.players;a<la;a++){
                                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(a)].statusEffect('Weak',floor(this.battle.currency.money[a]/100))
                            }
                        }
                        if(this.battle.modded(157)){
                            for(let a=0,la=this.battle.players;a<la;a++){
                                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(a)].statusEffect('No Damage',1)
                            }
                        }
                        if(this.battle.modded(158)){
                            for(let a=0,la=this.battle.players;a<la;a++){
                                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(a)].statusEffect('No Block',1)
                            }
                        }
                    break
                    case 2:
                        for(let a=0,la=this.battle.players;a<la;a++){
                            if(this.active[41][a+1]>0){
                                this.getPlayer(a).addBlock(16*this.active[41][a+1])
                            }
                            if(this.active[72][a+1]>0){
                                this.battle.addSpecificEnergy(2*this.active[72][a+1],a,6)
                            }
                            if(this.active[309][a+1]>0){
                                this.getPlayer(a).statusEffect('Temporary Strength',5*this.active[309][a+1])
                                this.getPlayer(a).statusEffect('Temporary Dexterity',5*this.active[309][a+1])
                            }
                        }
                    break
                    case 3:
                        for(let a=0,la=this.battle.players;a<la;a++){
                            if(this.active[112][a+1]>0){
                                this.getPlayer(a).addBlock(24*this.active[112][a+1])
                            }
                        }
                        if(this.battle.modded(60)){
                            this.battle.combatantManager.allEffect(3,[3])
                        }
                    break
                    case 4:
                        if(this.battle.modded(168)){
                            this.battle.combatantManager.allEffect(29,[1])
                        }
                    break
                    case 5:
                        if(this.active[319][a+1]>0){
                            this.getPlayer(a).statusEffect('Buffer',2*this.active[319][a+1])
                        }
                        if(this.battle.modded(58)){
                            this.battle.quickReinforce('Management Soldier')
                        }
                        if(this.battle.modded(172)){
                            this.battle.combatantManager.allEffect(40,[[1,3]])
                        }
                    break
                    case 6: case 9:
                        if(this.active[248][a+1]>0){
                            this.getPlayer(a).statusEffect('Temporary Strength',4*this.active[248][a+1])
                            this.getPlayer(a).addBlock(20*this.active[248][a+1])
                        }
                    break
                    case 7:
                        if(this.active[174][0]>0){
                            this.battle.combatantManager.allEffect(19,[52*this.active[174][0]])
                        }
                    break
                    case 10:
                        if(this.active[318][a+1]>0){
                            this.getPlayer(a).statusEffect('Extra Turn',this.active[318][a+1])
                        }
                    break
                    case 20:
                        if(this.battle.modded(175)){
                            for(let a=0,la=this.battle.players;a<la;a++){
                                this.getPlayer(a).life=0
                            }
                        }
                    break
                }
                for(let a=0,la=this.battle.players;a<la;a++){
                    if(this.active[4][a+1]>0){
                        this.detail[4][a]++
                        if(this.detail[4][a]%5==4){
                            this.battle.addSpecificEnergy(this.active[4][a+1],a,6)
                        }
                    }
                    if(this.active[37][a+1]>0){
                        if(args[0]>1&&this.detail[37][a]==0){
                            this.battle.addSpecificEnergy(this.active[37][a+1],a,6)
                        }
                        this.detail[37][a]=0
                    }
                    if(this.active[83][a+1]>0&&args[0]>=2){
                        this.getPlayer(a).addBlock(4*this.active[83][a+1])
                    }
                    if(this.active[88][a+1]>0){
                        this.getPlayer(a).addBlock(this.active[88][a+1]*(this.battle.counter.enemy-this.battle.counter.killed))
                    }
                    if(this.active[90][a+1]>0){
                        this.detail[90][a]++
                        if(this.detail[90][a]%8==7){
                            this.getPlayer(a).statusEffect('Intangible',this.active[90][a+1])
                        }
                    }
                    if(this.active[105][a+1]>0){
                        let ownerCombatant=this.getPlayer(a)
                        if(ownerCombatant.life<ownerCombatant.base.life/2){
                            ownerCombatant.statusEffect('Strength',this.active[105][a+1])
                        }
                    }
                    if(this.active[148][a+1]>0&&args[0]>=2){
                        this.getPlayer(a).statusEffect('Dexterity',-this.active[148][a+1])
                    }
                    if(this.active[152][a+1]>0&&(args[1]==1||args[1]==2)){
                        this.battle.addSpecificEnergy(2*this.active[152][a+1],a,6)
                    }
                    if(this.active[178][a+1]>0&&this.battle.cardManagers[a].discard.cards.length>this.battle.cardManagers[a].reserve.cards.length){
                        this.battle.addSpecificEnergy(this.active[178][a+1],a,6)
                    }
                    if(this.active[193][a+1]>0&&this.battle.cardManagers[a].reserve.cards.length>this.battle.cardManagers[a].discard.cards.length){
                        this.getPlayer(a).addBlock(3*this.active[193][a+1])
                    }
                    if(this.active[196][a+1]>0&&args[0]%2==1){
                        this.getPlayer(a).addBlock(5*this.active[196][a+1])
                    }
                    if(this.active[197][a+1]>0&&args[0]%2==0){
                        this.getPlayer(a).addBlock(5*this.active[197][a+1])
                    }
                    if(this.active[204][a+1]>0){
                        if(args[0]>1&&this.detail[204][a]==0){
                            this.getPlayer(a).statusEffect('Double Damage',this.active[204][a+1])
                        }
                        this.detail[204][a]=0
                    }
                    if(this.active[227][a+1]>0&&args[0]%2==0){
                        this.getPlayer(a).statusEffect('Single Damage Up',4*this.active[227][a+1])
                    }
                    if(this.active[266][a+1]>0&&args[0]%2==0){
                        this.battle.addSpecificEnergy(this.active[266][a+1],a,6)
                    }
                    if(this.active[280][a+1]>0&&floor(random(0,6))==0){
                        this.battle.loseEnergy(this.active[280][a+1],a)
                    }
                    if(this.active[298][a+1]>0){
                        this.detail[298][a]++
                        if(this.detail[298][a]%6==5){
                            this.getPlayer(a).statusEffect('Extra Turn',this.active[298][a+1])
                        }
                    }
                    if(this.active[306][a+1]>0){
                        for(let a=0,la=this.active[306][a+1];a<la;a++){
                            if(this.battle.cardManagers[a].hand.cards.length-1-a>=0&&!this.battle.cardManagers[a].hand.cards[this.battle.cardManagers[a].hand.cards.length-1-a].spec.includes(9)){
                                this.battle.cardManagers[a].hand.cards[this.battle.cardManagers[a].hand.cards.length-1-a].spec.push(9)
                            }
                        }
                    }
                    if(this.active[308][a+1]>0&&this.detail[308][a]<10){
                        this.detail[308][a]++
                        this.getPlayer(a).addBlock(10*this.active[308][a+1])
                    }
                }
                if(args[0]%3==0&&this.battle.modded(23)){
                    this.battle.combatantManager.allEffect(3,[1])
                }
                if(this.battle.modded(59)){
                    this.detail[59][0]++
                    if(this.detail[59][0]%3==0){
                        for(let a=0,la=this.battle.players;a<la;a++){
                            this.battle.loseEnergy(1,a)
                        }
                    }
                }
                if(this.battle.modded(118)){
                    this.battle.combatantManager.allEffect(25,[10])
                }
                if(args[0]%5==0&&this.battle.modded(151)){
                    this.battle.quickReinforce('Duck')
                }
            break
            case 1://end of combat [encounterclass]
                for(let a=0,la=this.battle.players;a<la;a++){
                    if(this.active[1][a+1]>0){
                        this.getPlayer(a).heal(3*this.active[1][a+1])
                    }
                    if(this.active[19][a+1]>0){
                        if(this.getPlayer(a).life<this.getPlayer(a).base.life/2){
                            this.getPlayer(a).heal(12*this.active[19][a+1])
                        }
                    }
                    if(this.active[153][a+1]>0){
                        this.getPlayer(a).heal(10*this.active[153][a+1])
                    }
                    if(this.active[258][a+1]>0&&args[0]==1){
                        this.getPlayer(a).gainMaxHP(5*this.active[258][a+1])
                    }
                }
            break
            case 2://start of player turn [turn,player,played]
                if(args[0]==1){
                    for(let a=0,la=this.battle.players;a<la;a++){
                        if(this.active[156][a+1]>0){
                            this.battle.cardManagers[a].allEffect(2,5)
                        }
                    }
                    if(this.active[8][args[1]+1]>0){
                        for(let a=0,la=this.active[8][args[1]+1];a<la;a++){
                            this.battle.cardManagers[args[1]].hand.add(findName('Emergency\nMove',types.card),0,0)
                        }
                    }
                    if(this.active[9][args[1]+1]>0){
                        for(let a=0,la=this.active[9][args[1]+1];a<la;a++){
                            this.battle.cardManagers[args[1]].hand.add(findName('Redraw',types.card),0,0)
                        }
                    }
                    if(this.active[10][args[1]+1]>0){
                        for(let a=0,la=this.active[10][args[1]+1];a<la;a++){
                            this.battle.cardManagers[args[1]].hand.add(findName('Miracle',types.card),0,0)
                        }
                    }
                    if(this.active[22][args[1]+1]>0){
                        for(let a=0,la=this.active[22][args[1]+1];a<la;a++){
                            this.battle.cardManagers[args[1]].hand.add(findName('Selective\nRedraw',types.card),0,0)
                        }
                    }
                    if(this.active[52][args[1]+1]>0){
                        for(let a=0,la=4*this.active[52][args[1]+1];a<la;a++){
                            this.battle.cardManagers[args[1]].hand.add(findName('Shiv',types.card),0,0)
                        }
                    }
                    if(this.active[87][args[1]+1]>0){
                        if(options.oldDuplicate){
                            this.getPlayer(args[1]).statusEffect('Double Play',this.active[87][args[1]+1])
                        }else{
                            this.battle.cardManagers[args[1]].hand.duplicate(this.active[87][args[1]+1])
                        }
                    }
                    if(this.active[126][args[1]+1]>0){
                        this.battle.overlayManager.overlays[10][args[1]].active=true
                        this.battle.overlayManager.overlays[10][args[1]].activate([0,0,1])
                    }
                    if(this.active[144][args[1]+1]>0){
                        for(let a=0,la=this.active[144][args[1]+1];a<la;a++){
                            this.battle.cardManagers[args[1]].reserve.addAbstract(findName('Electrocuted',types.card),0,game.playerNumber+1,0,[5],[])
                        }
                    }
                    if(this.active[158][args[1]+1]>0){
                        for(let a=0,la=3*this.active[158][args[1]+1];a<la;a++){
                            this.battle.cardManagers[args[1]].hand.add(findName('Miracle',types.card),0,0)
                        }
                    }
                    if(this.active[205][args[1]+1]>0){
                        this.detail[205][args[1]]=''
                    }
                    if(this.active[206][args[1]+1]>0){
                        this.detail[206][args[1]][0]=0
                        this.detail[206][args[1]][1]=0
                    }
                    if(this.active[257][args[1]+1]>0){
                        for(let a=0,la=this.active[257][args[1]+1];a<la;a++){
                            this.battle.cardManagers[args[1]].hand.add(findName('Madness',types.card),0,0)
                        }
                    }
                    if(this.active[261][args[1]+1]>0){
                        for(let a=0,la=this.active[261][args[1]+1];a<la;a++){
                            this.battle.cardManagers[args[1]].hand.allEffect(97)
                        }
                    }
                    if(this.active[285][args[1]+1]>0){
                        for(let a=0,la=this.active[285][args[1]+1];a<la;a++){
                            this.battle.cardManagers[args[1]].reserve.addAbstract(findName('Trough',types.card),0,game.playerNumber+1,0,[5],[])
                        }
                    }
                    if(this.battle.modded(62)){
                        for(let a=0,la=3;a<la;a++){
                            this.battle.cardManagers[args[1]].fatigue()
                        }
                    }
                }else{
                    if(args[0]==2){
                        if(this.active[114][args[1]+1]>0){
                            for(let a=0,la=this.active[114][args[1]+1];a<la;a++){
                                if(this.battle.cardManagers[args[1]].discard.cards.length>0){
                                    let pos=floor(random(0,this.battle.cardManagers[args[1]].discard.cards.length))
                                    this.battle.cardManagers[args[1]].discard.send(this.battle.cardManagers[args[1]].hand.cards,pos,pos+1,1)
                                }
                            }
                        }
                    }else if(args[0]==4){
                        if(this.active[207][args[1]+1]>0){
                            if(options.oldDuplicate){
                                this.getPlayer(args[1]).statusEffect('Double Play',this.active[207][a+1])
                            }else{
                                this.battle.cardManagers[args[1]].hand.duplicate(3*this.active[207][args[1]+1])
                            }
                        }
                    }
                    if(this.active[82][args[1]+1]>0&&args[2][0]<3){
                        this.battle.cardManagers[args[1]].draw(2*this.active[82][args[1]+1])
                    }
                }
                if(this.active[70][args[1]+1]>0){
                    this.detail[70][args[1]]++
                    if(this.detail[70]%3==2){
                        this.battle.cardManagers[args[1]].draw(this.active[70][args[1]+1])
                    }
                }
                if(this.active[115][args[1]+1]>0){
                    for(let a=0,la=this.active[115][args[1]+1];a<la;a++){
                        this.battle.cardManagers[args[1]].hand.add(findName('Back\nUp',types.card),0,0)
                    }
                }
                if(this.active[120][args[1]+1]>0){
                    let manager=this.battle.cardManagers[args[1]]
                    for(let a=0,la=this.active[120][args[1]+1];a<la;a++){
                        if(manager.reserve.cards.length>0&&manager.reserve.cards[0].class==1){
                            manager.reserve.send(manager.hand.cards,0,1,1)
                            if(manager.hand.cards[manager.hand.cards.length-1].cost>0){
                                manager.hand.cards[manager.hand.cards.length-1].cost--
                            }
                        }
                    }
                }
                if(this.active[139][args[1]+1]>0){
                    this.detail[139][args[1]]++
                    if(this.detail[139]%2==0){
                        this.battle.cardManagers[args[1]].draw(this.active[139][args[1]+1])
                    }
                }
                if(this.active[161][args[1]+1]>0){
                    for(let a=0,la=this.active[161][args[1]+1];a<la;a++){
                        this.battle.cardManagers[args[1]].randomEffect(2,2,[0])
                    }
                }
                if(this.active[162][args[1]+1]>0){
                    for(let a=0,la=this.active[162][args[1]+1];a<la;a++){
                        this.battle.cardManagers[args[1]].randomEffect(2,4,[0])
                    }
                }
                if(this.active[266][args[1]+1]>0&&args[0]%2==1){
                    this.battle.cardManagers[args[1]].draw(2*this.active[266][args[1]+1])
                }
                if(this.active[299][args[1]+1]>0){
                    if(options.oldDuplicate){
                        this.getPlayer(args[1]).statusEffect('Double Play',this.active[299][a+1])
                    }else{
                        this.battle.cardManagers[args[1]].hand.duplicate(this.active[299][args[1]+1])
                    }
                }
                if(this.active[314][args[1]+1]>0){
                    for(let a=0,la=2*this.active[314][args[1]+1];a<la;a++){
                        this.battle.cardManagers[args[1]].randomEffect(2,1,[1])
                    }
                }
                if(this.active[330][args[1]+1]>0&&this.getPlayer(args[1]).life<5){
                    this.getPlayer(args[1]).statusEffect('Strength',this.active[330][args[1]+1])
                    this.getPlayer(args[1]).permanentStrength+=this.active[330][args[1]+1]
                    this.loseRelic(330,a)
                }
                if(this.battle.modded(143)){
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(args[1])].statusEffect(['Burn','Freeze','Shock'][floor(random(0,3))],1)
                }
                if(this.battle.modded(176)){
                    this.battle.cardManagers[args[1]].randomEffect(2,43,[])
                }
            break
            case 3://enemy dies
                for(let a=0,la=this.battle.players;a<la;a++){
                    if(this.active[17][a+1]>0){
                        this.battle.cardManagers[a].draw(this.active[17][a+1])
                        this.battle.addSpecificEnergy(this.active[17][a+1],a,6)
                    }
                    if(this.active[94][a+1]>0){
                        this.getPlayer(a).statusEffect('Strength',this.active[94][a+1])
                    }
                    if(this.active[95][a+1]>0){
                        this.getPlayer(a).statusEffect('Dexterity',this.active[95][a+1])
                    }
                    if(this.active[116][a+1]>0){
                        this.battle.addCurrency(10*this.active[116][a+1],a)
                    }
                }
                if(this.battle.modded(15)){
                    for(let a=0,la=this.battle.players;a<la;a++){
                        this.battle.loseCurrency(10,a)
                    }
                }
            break
            case 4://playing card [class,player,cost,rarity,name,edition,turnPlayed,basic]
                if(this.active[18][args[1]+1]>0){
                    this.detail[18][args[1]]++
                    if(this.detail[18][args[1]]%15==0){
                        this.battle.cardManagers[args[1]].draw(this.active[18][args[1]+1])
                    }
                }
                if(this.active[140][args[1]+1]>0&&args[6][0]>=7){
                    this.battle.cardManagers[this.battle.turn.main].allEffect(2,2)
                    this.battle.setEnergy(0,this.battle.turn.main)
                }
                if(this.active[194][args[1]+1]>0&&args[3]==2){
                    this.battle.cardManagers[args[1]].draw(this.active[194][args[1]+1])
                }
                if(this.active[205][args[1]+1]>0){
                    if(args[2]<1){
                        this.detail[205][args[1]]=''
                    }else{
                        if(this.detail[205][args[1]]==args[4]){
                            this.battle.addSpecificEnergy(this.active[205][args[1]+1],args[1],6)
                            this.detail[205][args[1]]=''
                        }else{
                            this.detail[205][args[1]]=args[4]
                        }
                    }
                }
                if(this.active[206][args[1]+1]>0){
                    if(args[2]<=this.detail[206][args[1]][1]){
                        this.detail[206][args[1]][0]=1
                    }else{
                        this.detail[206][args[1]][0]++
                        if(this.detail[206][args[1]][0]>=3){
                            this.battle.addSpecificEnergy(this.active[206][args[1]+1],args[1],6)
                        }
                    }
                    this.detail[206][args[1]][1]=max(args[2],0)
                }
                if(this.active[235][args[1]+1]>0&&args[5]!=0){
                    this.getPlayer(args[1]).addBlock(2)
                }
                if(this.active[245][args[1]+1]>0&&args[2]>=3){
                    this.getPlayer(args[1]).statusEffect('Energy Next Turn',this.active[245][args[1]+1])
                }
                if(this.active[251][args[1]+1]>0&&args[4]=='Fatigue'){
                    this.battle.cardManagers[this.battle.turn.main].draw(this.active[251][args[1]+1])
                }
                if(this.active[279][args[1]+1]>0&&args[4]=='Fatigue'){
                    this.getPlayer(args[1]).addBlock(3)
                }
                if(this.active[293][args[1]+1]>0){
                    this.detail[293][args[1]]++
                    if(this.detail[293][args[1]]%3==0){
                        this.battle.cardManagers[this.battle.turn.main].draw(this.active[293][args[1]+1])
                    }
                }
                if(this.active[296][args[1]+1]>0&&args[6][0]==3){
                    this.battle.addSpecificEnergy(this.active[296][args[1]+1],args[1],6)
                }
                if(this.active[327][args[1]+1]>0&&args[6][0]==6){
                    this.battle.combatantManager.allEffect(43,[3*this.active[327][args[1]+1],this.getPlayer(args[1]).id])
                }
                switch(args[0]){
                    case 1:
                        if(this.active[37][args[1]+1]>0&&this.detail[37][args[1]]==0){
                            this.detail[37][args[1]]=1
                        }
                        if(this.active[42][args[1]+1]>0){
                            this.detail[42][args[1]]++
                            if(this.detail[42][args[1]]%8==0){
                                this.getPlayer(args[1]).statusEffect('Strength',this.active[42][args[1]+1])
                            }
                        }
                        if(this.active[43][args[1]+1]>0){
                            this.detail[43][args[1]]++
                            if(this.detail[43][args[1]]%8==0){
                                this.getPlayer(args[1]).statusEffect('Dexterity',this.active[43][args[1]+1])
                            }
                        }
                        if(this.active[44][args[a]+1]>0){
                            this.detail[44][args[1]]++
                            if(this.detail[44]%3==2){
                                this.getPlayer(args[1]).addBlock(4*this.active[44][args[1]+1])
                            }
                        }
                        if(this.active[63][args[1]]>0){
                            this.detail[63][args[1]]++
                            if(this.detail[63][args[1]]%12==0){
                                this.getPlayer(args[1]).statusEffect('Double Damage',this.active[63][args[1]])
                            }
                        }
                        if(this.active[64][args[1]+1]>0){
                            this.detail[64][args[1]]++
                            if(this.detail[64][args[1]]%12==0){
                                this.battle.addSpecificEnergy(this.active[64][args[1]],args[1],6)
                            }
                        }
                        if(this.active[71][args[1]+1]>0){
                            this.getPlayer(args[1]).statusEffect('Temporary Dexterity',this.active[71][args[1]])
                        }
                        if(this.active[204][args[1]+1]>0&&this.detail[204][args[1]]==0){
                            this.detail[204][args[1]]=1
                        }
                        if(this.active[225][args[1]+1]>0&&args[3]==1){
                            this.getPlayer(args[1]).heal(this.active[225][args[1]+1])
                        }
                        if(this.active[295][args[1]+1]>0){
                            this.detail[295][args[1]][0]++
                            if(this.detail[295][args[1]][0]%3==0){
                                this.getPlayer(args[1]).statusEffect('Strength',this.active[295][args[1]+1])
                            }
                        }
                        if(this.active[331][args[1]+1]>0&&args[7]){
                            this.getPlayer(args[1]).heal(this.active[331][args[1]+1])
                        }
                    break
                    case 2:
                        if(this.active[73][args[1]+1]>0){
                            this.detail[73][args[1]]++
                            if(this.detail[73][args[1]]%3==0){
                                this.getPlayer(args[1]).statusEffect('Metallicize',2*this.active[73][args[1]+1])
                            }
                        }
                        if(this.active[78][args[1]+1]>0){
                            this.detail[78][args[1]]++
                            if(this.detail[78][args[1]]%12==0){
                                this.getPlayer(args[1]).statusEffect('Buffer',this.active[78][args[1]+1])
                            }
                        }
                        if(this.active[295][args[1]+1]>0){
                            this.detail[295][args[1]][1]++
                            if(this.detail[295][args[1]][1]%3==0){
                                this.getPlayer(args[1]).statusEffect('Dexterity',this.active[295][args[1]+1])
                            }
                        }
                        if(this.active[331][args[1]+1]>0&&args[7]){
                            this.getPlayer(args[1]).heal(this.active[331][args[1]+1])
                        }
                    break
                    case 4:
                        if(this.active[20][args[1]+1]>0&&args[2]>=1){
                            this.battle.cardManagers[args[1]].randomEffect(2,1,[this.active[20][args[1]+1]])
                        }
                        if(this.active[27][args[1]+1]>0){
                            this.getPlayer(args[1]).heal(2*this.active[27][args[1]+1])
                        }
                        if(this.battle.modded(84)){
                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(args[1])].loseHealth(3)
                        }
                    break
                }
            break
            case 5://adding card [player]
                if(this.active[40][args[0]+1]>0){
                    this.battle.addCurrency(20*this.active[40][args[0]+1],args[0])
                }
            break
            case 6://taking damage [player]
                if(this.active[38][args[0]+1]>0&&this.detail[38][args[1]]==0){
                    this.detail[38]=1
                    this.battle.cardManagers[args[0]].draw(3*this.active[38][args[0]+1])
                }
                if(this.active[48][args[0]+1]>0){
                    this.getPlayer(args[0]).statusEffect('Block Next Turn',3)
                }
            break
            case 7://entering node [node]
                for(let a=0,la=this.relics.length;a<la;a++){
                    if(this.relics[a].type==321){
                        if(this.detail[321][this.relics[a].player]==0){
                            this.relics[a].value+=20
                        }else{
                            this.relics[a].value=floor(this.relics[a].value*0.9)
                        }
                    }
                }
                for(let a=0,la=this.battle.players;a<la;a++){
                    if(this.active[91][a+1]>0&&args[0]!=4){
                        this.battle.addCurrency(20*this.active[91][a+1],a)
                    }
                    if(this.active[166][a+1]>0){
                        this.battle.addCurrency(10*this.active[166][a+1],a)
                    }
                    if(this.active[210][a+1]>0&&this.battle.currency.money[a]>=1000){
                        this.battle.addCurrency(40*this.active[210][a+1],a)
                    }
                    if(this.active[221][a+1]>0&&this.battle.nodeManager.world>=2){
                        this.battle.addCurrency(1000*this.active[221][a+1],a)
                        for(let b=0,lb=this.active[221][a+1];b<lb;b++){
                            this.loseRelic(221,a)
                        }
                    }
                    switch(args[0]){
                        case 3://rest
                            if(this.active[38][a+1]>0&&this.detail[38][a]==0){
                                this.detail[38][a]=1
                            }
                            if(this.active[262][a+1]>0&&this.battle.currency.money[a]<=500){
                                this.getPlayer(a).heal(20*this.active[262][a+1])
                            }
                            if(this.active[308][a+1]>0&&this.detail[308][a]>0){
                                this.detail[308][a]=0
                            }
                            if(this.active[310][a+1]>0){
                                this.battle.overlayManager.overlays[25][a].active=true
                                this.battle.overlayManager.overlays[25][a].activate([0,[]])
                                for(let b=0,lb=this.active[310][a+1];b<lb;b++){
                                    this.battle.overlayManager.overlays[25][a].activate([1,[{type:1,value:[0,0,0]}]])
                                }
                            }
                            if(this.active[325][a+1]>0){
                                this.getPlayer(a).gainMaxHP(2*this.active[325][a+1])
                            }
                            if(this.battle.modded(183)){
                                this.getPlayer(a).loseHealth(10)
                            }
                        break
                        case 4://shop
                            if(this.active[91][a+1]>0){
                                this.loseRelic(91,a)
                            }
                            if(this.active[92][a+1]>0){
                                this.getPlayer(a).heal(15*this.active[92][a+1])
                            }
                            if(this.active[93][a+1]>0&&this.detail[93][a]==0){
                                this.detail[93][a]=1
                            }
                            if(this.active[118][a+1]>0&&this.detail[118][a]==1){
                                this.detail[118][a]=0
                            }
                            if(this.active[263][a+1]>0){
                                this.battle.addCurrency(50*this.active[263][a+1],a)
                            }
                            if(this.active[326][a+1]>0){
                                this.getPlayer(a).gainMaxHP(2*this.active[326][a+1])
                            }
                            if(this.battle.modded(184)){
                                this.getPlayer(a).loseHealth(10)
                            }
                        break
                    }
                    if(this.active[321][a+1]>0&&this.detail[321][a]==0&&floor(random(0,10))==0){this.detail[321][a]=1}
                }
                if(this.battle.modded(39)){
                    for(let a=0,la=this.battle.players;a<la;a++){
                        this.battle.loseCurrency(5,a)
                    }
                }
            break
            case 8://skipping card [player]
                if(this.active[49][args[0]+1]>0){
                    this.getPlayer(args[0]).gainMaxHP(2*this.active[49][args[0]+1])
                }
                if(this.active[101][args[0]+1]>0){
                    this.battle.addCurrency(10*this.active[101][args[0]+1],args[0])
                }
            break
            case 9://start of player turn [turn,player]
                if(this.active[68][args[1]+1]>0){
                    let player=this.getPlayer(args[1])
                    if(player.block<=0){
                        player.addBlock(6*this.active[68][args[1]+1])
                    }
                }
            break
            case 10://card exhausted [player]
                if(this.active[113][args[0]+1]>0){
                    for(let a=0,la=this.active[113][args[0]+1];a<la;a++){
                        this.battle.cardManagers[args[0]].addRandomAbstract(2,0,0,0,0,[],[3])
                    }
                }
            break
            case 11://removing card [player,class]
                if(this.active[104][args[0]+1]>0){
                    this.getPlayer(args[0]).gainMaxHP(7*this.active[104][args[0]+1])
                }
                if(this.active[199][args[0]+1]>0){
                    for(let a=0,la=this.active[199][args[0]+1];a<la;a++){
                        this.battle.cardManagers[args[0]].randomEffect(0,2,[0])
                    }
                }
                if(this.active[212][args[0]+1]>0&&args[1]==3){
                    this.battle.addCurrency(400*this.active[212][args[0]+1],args[0])
                }
            break
            case 12://preentering node [node]
                switch(args[0]){
                    case 5://event
                        for(let a=0,la=this.battle.players;a<la;a++){
                            if(this.active[99][a+1]>0){
                                this.getPlayer(a).heal(5*this.active[99][a+1])
                            }
                        }
                    break
                }
            break
            case 13://make purchase [player]
                if(this.active[189][args[0]+1]>0){
                    for(let a=0,la=this.active[189][args[0]+1];a<la;a++){
                        this.battle.itemManager.addRandomItem(args[0])
                    }
                }
            break
            case 14://leftover energy [player,energy]
                if(args[1]>0){
                    if(this.active[179][args[0]+1]>0){
                        this.getPlayer(args[0]).statusEffectNext('Temporary Strength',this.active[179][args[0]+1]*args[1])
                    }
                    if(this.active[198][args[0]+1]>0){
                        this.getPlayer(args[0]).addBlock(4*this.active[198][args[0]+1]*args[1])
                    }
                    if(this.active[252][args[0]+1]>0&&args[1]>=2){
                        this.getPlayer(args[0]).statusEffect('Double Damage',this.active[252][args[0]+1])
                    }
                }
            break
            case 15://rewards [player,class,access,turn]
                switch(args[1]){
                    case -1:
                        if(this.active[208][args[0]+1]>0&&args[3]<=5){
                            for(let a=0,la=this.active[208][args[0]+1];a<la;a++){
                                args[2].push({type:0,value:[50]})
                            }
                        }
                    break
                    case 1:
                        if(this.active[171][args[0]+1]>0){
                            for(let a=0,la=2*this.active[171][args[0]+1];a<la;a++){
                                args[2].push({type:2,value:[1]})
                            }
                        }
                    break
                    case 2:
                        if(this.active[176][args[0]+1]>0){
                            for(let a=0,la=this.active[176][args[0]+1];a<la;a++){
                                args[2].push({type:8,value:[1]})
                            }
                        }
                        if(this.active[177][args[0]+1]>0){
                            for(let a=0,la=this.active[177][args[0]+1];a<la;a++){
                                args[2].push({type:7,value:[1]})
                            }
                        }
                        if(this.active[202][args[0]+1]>0){
                            for(let a=0,la=this.active[202][args[0]+1];a<la;a++){
                                args[2].push({type:9,value:[1]})
                            }
                        }
                        if(this.active[203][args[0]+1]>0){
                            for(let a=0,la=this.active[203][args[0]+1];a<la;a++){
                                args[2].push({type:10,value:[1]})
                            }
                        }
                        if(this.active[240][args[0]+1]>0){
                            for(let a=0,la=this.active[240][args[0]+1];a<la;a++){
                                args[2].push({type:11,value:[0,3,16]})
                            }
                        }
                    break
                }
            break
            case 16://shuffle pile [pile,player]
                if(this.active[316][args[1]+1]>0&&args[0]==1){
                    for(let a=0,la=this.active[316][args[1]+1];a<la;a++){
                        this.battle.cardManagers[args[1]].hand.add(findName('Miracle',types.card),0,0)
                    }
                }
            break
        }
    }
    display(scene,args){
        let lea=this.displayRelics.length
        switch(scene){
            case 'battle': case 'map': case 'event':
                for(let a=0,la=this.relics.length;a<la;a++){
                    this.relics[a].display(this.total[this.relics[a].player],this.active[types.relic[this.relics[a].type].id][this.relics[a].player+1],undefined,undefined,this.detail[this.relics[a].type][this.relics[a].player])
                }
                this.relics.forEach(relic=>relic.displayInfo())
            break
            case 'stash':
                if(this.battle.players>1){
                    for(let a=0,la=this.battle.players;a<la;a++){
                        displayPlayerSymbol(this.layer,40+a*(this.layer.width-80),60,this.battle.player[a],0,1,1)
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
                        displayPlayerSymbol(this.layer,40+a*(this.layer.width-80),60,this.battle.player[a],0,1,1)
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
                    if(this.relics[a].player==args[0]&&this.relics[a].type!=0){
                        this.relics[a].display(la-1,this.active[types.relic[this.relics[a].type].id][args[0]+1],{x:this.layer.width/2-150+position%6*60,y:this.layer.height/2-120+floor(position/6)*60},true)
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
    callInput(type,args){
        switch(type){
            case 0:
                if(!this.complete[args[1]]){
                    this.displayRelics[args[0]].deFade=true
                    this.addRelic(this.displayRelics[args[0]].type,args[1])
                    this.complete[args[1]]=true
                    if(this.battle.players==1&&this.complete[0]||this.battle.players==2&&this.complete[0]&&this.complete[1]){
                        transition.trigger=true
                        transition.scene='map'
                        if(args[2]){
                            this.battle.nextWorld()
                        }
                    }
                }
            break
        }
    }
    update(scene,args){
        switch(scene){
            case 'battle': case 'map': case 'event':
                this.relics.forEach(relic=>relic.update(this.up[relic.player],this.total[relic.player],inputs))
            break
            case 'stash': case 'bossstash':
                this.displayRelics.forEach(relic=>relic.update(true,0,inputs))
            break
            case 'overlay':
                let position=0
                let index=0
                for(let a=0,la=this.relics.length;a<la;a++){
                    if(this.relics[a].player==args[2]&&this.relics[a].type!=0){
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
            case 'battle':
                this.relics.forEach(relic=>relic.onClick(inputs.rel,this.battle))
                if(dist(inputs.rel.x,inputs.rel.y,25,100)<20&&this.total[0]>0){
                    this.up[0]=toggle(this.up[0])
                }
                if(this.battle.players==2&&dist(inputs.rel.x,inputs.rel.y,this.layer.width-25,100)<20&&this.total[1]>0){
                    this.up[1]=toggle(this.up[1])
                }
            break
            case 'map': case 'event':
                if(dist(inputs.rel.x,inputs.rel.y,25,100)<20&&this.total[0]>0){
                    this.up[0]=toggle(this.up[0])
                }
                if(this.battle.players==2&&dist(inputs.rel.x,inputs.rel.y,this.layer.width-25,100)<20&&this.total[1]>0){
                    this.up[1]=toggle(this.up[1])
                }
            break
            case 'stash':
                for(let a=0,la=this.displayRelics.length;a<la;a++){
                    if(dist(inputs.rel.x,inputs.rel.y,this.displayRelics[a].position.x,this.displayRelics[a].position.y)<20*this.displayRelics[a].size&&!this.displayRelics[a].deFade){
                        this.callInput(0,[a,this.battle.players==1?0:inputs.rel.x<this.displayRelics[a].position.x&&!this.complete[0]||this.complete[1]?0:1,false])
                    }
                }
                if(dist(inputs.rel.x,inputs.rel.y,this.layer.width/2,this.layer.height/2+40+this.displayRelics.length*50)<30){
                    transition.trigger=true
                    transition.scene='map'
                }
            break
            case 'bossstash':
                for(let a=0,la=this.displayRelics.length;a<la;a++){
                    if(dist(inputs.rel.x,inputs.rel.y,this.displayRelics[a].position.x,this.displayRelics[a].position.y)<20*this.displayRelics[a].size&&!this.displayRelics[a].deFade){
                        this.callInput(0,[a,this.battle.players==1?0:inputs.rel.x<this.displayRelics[a].position.x&&!this.complete[0]||this.complete[1]?0:1,true])
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
                    if(this.relics[a].player==args[0]&&this.relics[a].type!=0){
                        if(index>=args[1]*30&&index<args[1]*30+30){
                            if(dist(inputs.rel.x,inputs.rel.y,this.layer.width/2-150+position%6*60,this.layer.height/2-120+floor(position/6)*60)<20&&this.active[this.relics[a].type][args[0]+1]>0){
                                this.battle.addCurrency(this.relics[a].value*(1+this.active[307][this.relics[a].player+1]*0.5),this.relics[a].player)
                                this.loseRelic(this.relics[a].type,args[0])
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
            case 'battle': case 'map': case 'event':
                if(key=='i'&&this.total[0]>0){
                    this.up[0]=toggle(this.up[0])
                }
                if(this.battle.players==2&&key=='I'&&this.total[1]>0){
                    this.up[1]=toggle(this.up[1])
                }
            break
            case 'stash':
                for(let a=0,la=this.displayRelics.length;a<la;a++){
                    if((int(key)+9)%10==a&&!this.displayRelics[a].deFade){
                        this.callInput(0,[a,this.complete[0]?1:0,false])
                    }
                }
                if(code==ENTER){
                    transition.trigger=true
                    transition.scene='map'
                }
            break
            case 'bossstash':
                for(let a=0,la=this.displayRelics.length;a<la;a++){
                    if((int(key)+9)%10==a&&!this.displayRelics[a].deFade){
                        this.callInput(0,[a,this.complete[0]?1:0,true])
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