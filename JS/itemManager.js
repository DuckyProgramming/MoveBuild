class itemManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle

        this.listing={item:[[],[],[]]}
        
        this.items=[]
        this.position=[]
        this.up=[]
        this.total=[]
        this.effectiveness=[]
        this.combatEffectiveness=[]
        this.tempEffectiveness=[]

        this.initialListing()
    }
    initialListing(){
        for(let a=0,la=types.item.length;a<la;a++){
            if(types.item[a].rarity>=0&&(types.item[a].list==0||this.battle.player.includes(types.item[a].list))){
                this.listing.item[types.item[a].rarity].push(a)
            }
        }
        for(let a=0,la=this.battle.players;a<la;a++){
            this.items.push(game.ascend>=11?[
                new item(this.layer,a,25+(this.layer.width-50)*a,50,100+(this.layer.width-200)*a,25,0,1),
                new item(this.layer,a,75+(this.layer.width-150)*a,50,150+(this.layer.width-300)*a,25,1,1),
                new item(this.layer,a,125+(this.layer.width-250)*a,50,200+(this.layer.width-400)*a,25,1,1)]:[
                new item(this.layer,a,25+(this.layer.width-50)*a,50,100+(this.layer.width-200)*a,25,0,1),
                new item(this.layer,a,75+(this.layer.width-150)*a,50,150+(this.layer.width-300)*a,25,1,1),
                new item(this.layer,a,125+(this.layer.width-250)*a,50,200+(this.layer.width-400)*a,25,1,1),
                new item(this.layer,a,175+(this.layer.width-350)*a,50,250+(this.layer.width-500)*a,25,1,1)])
            this.position.push(game.ascend>=11?-1:0)
            this.up.push(true)
            this.total.push(0)
            this.effectiveness.push(1)
            this.combatEffectiveness.push(1)
            this.tempEffectiveness.push(1)
        }
    }
    addItem(type,player){
        if(!this.battle.relicManager.hasRelic(138,player)){
            for(let a=0,la=this.items[player].length;a<la;a++){
                if(this.items[player][a].type==1){
                    this.items[player][a].type=type
                    this.items[player][a].refresh()
                    this.total[player]++
                    break
                }
            }
            this.battle.stats.item[player]++
        }
    }
    addRandomItem(player){
        let possible=[0,0,0,1,1,2]
        let rarity=possible[floor(random(0,possible.length))]
        let index=floor(random(0,this.listing.item[rarity].length))
        this.addItem(this.listing.item[rarity][index],player)
    }
    loseRandom(player){
        let possible=[]
        for(let a=0,la=this.items[player].length;a<la;a++){
            if(this.items[player][a].type>1){
                possible.push(a)
            }
        }
        if(possible.length>0){
            let index=possible[floor(random(0,possible.length))]
            this.items[player][index].type=1
            this.items[player][index].refresh()
            this.total[player]--
        }
    }
    makeRandom(){
        let possible=[0,0,0,1,1,2]
        let rarity=possible[floor(random(0,possible.length))]
        let index=floor(random(0,this.listing.item[rarity].length))
        return this.listing.item[rarity][index]
    }
    dupeRandom(player){
        let possible=[]
        for(let a=0,la=this.items[player].length;a<la;a++){
            if(this.items[player][a].type>1){
                possible.push(a)
            }
        }
        if(possible.length>0){
            this.addItem(this.items[player][possible[floor(random(0,possible.length))]].type,player)
        }
    }
    addSetItem(rarity,player){
        let index=floor(random(0,this.listing.item[rarity].length))
        this.addItem(this.listing.item[rarity][index],player)
    }
    addItemSlots(amount,player){
        for(let a=0;a<amount;a++){
            this.items[player].push(new item(this.layer,player,225+50*this.position[player]+(this.layer.width-450-100*this.position[player])*player,50,300+this.position[player]*50+(this.layer.width-600-this.position[player]*100)*player,25,1,1))
            this.position[player]++
        }
    }
    removeItemSlots(amount,player){
        for(let a=0;a<amount;a++){
            if(this.items[player].length>0){
                delete this.items[player][this.items[player].length-1]
                this.items[player].splice(this.items[player].length-1,1)
            }
        }
        this.position[player]-=amount
        this.total[player]=0
        for(let a=0,la=this.items[player].length;a<la;a++){
            if(this.items[player][a].type>1){
                this.total[player]++
            }
        }
    }
    removeAll(player){
        for(let a=0,la=this.items[player].length;a<la;a++){
            if(this.items[player][a].type>1){
                this.items[player][a].type=1
                this.items[player][a].refresh()
                this.total[player]--
            }
        }
    }
    fillAll(type,player){
        for(let a=0,la=this.items[player].length;a<la;a++){
            this.addItem(type,player)
        }
    }
    activateNode(){
        for(let a=0,la=this.tempEffectiveness.length;a<la;a++){
            this.tempEffectiveness[a]=1
        }
    }
    activateItem(type,player){
        this.battle.cardManagers[player].hand.allEffect(70)
        let effectiveness=this.effectiveness[player]*this.combatEffectiveness[player]*this.tempEffectiveness[player]
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)]
        if(userCombatant.getStatus('Item Use Energy')>0){
            this.battle.addEnergy(userCombatant.getStatus('Item Use Energy'),player)
        }
        if(userCombatant.getStatus('Item Use Draw')>0){
            this.battle.cardManagers[player].draw(userCombatant.getStatus('Item Use Draw'))
        }
        switch(types.item[type].id){
            case 2:
                this.battle.cardManagers[player].hand.callInput(6,[57,[10*effectiveness],1,[2,1,6]])
            break
            case 3:
                for(let a=0,la=3*effectiveness;a<la;a++){
                    this.battle.cardManagers[player].addRandomAbstract(2,0,0,0,1,[0],[3,1,0])
                }
            break
            case 4:
                for(let a=0,la=3*effectiveness;a<la;a++){
                    this.battle.cardManagers[player].addRandomAbstract(2,0,0,0,1,[0],[3,2,0])
                }
            break
            case 5:
                for(let a=0,la=3*effectiveness;a<la;a++){
                    this.battle.cardManagers[player].addRandomAbstract(2,0,0,0,1,[0],[3,3,0])
                }
            break
            case 6:
                for(let a=0,la=2*effectiveness;a<la;a++){
                    this.battle.cardManagers[player].addRandomAbstract(2,0,0,0,1,[0],[3,4,0])
                }
            break
            case 7:
                userCombatant.heal(15*effectiveness)
            break
            case 8:
                this.battle.cardManagers[player].hand.callInput(6,[81,[10*effectiveness],4,[2,1,2]])
            break
            case 9:
                this.battle.cardManagers[player].hand.callInput(6,[54,[],4,[6]])
            break
            case 10:
                userCombatant.statusEffect('Counter All',10*effectiveness)
            break
            case 11:
                userCombatant.addBlock(20*effectiveness)
            break
            case 12:
                this.battle.cardManagers[player].hand.callInput(6,[82,[10*effectiveness],4,[8,1,3]])
            break
            case 13:
                this.battle.cardManagers[player].allEffect(2,4)
            break
            case 14:
                this.battle.addEnergy(3*effectiveness,player)
            break
            case 15:
                userCombatant.statusEffect('Strength',2*effectiveness)
            break
            case 16:
                userCombatant.statusEffect('Dexterity',2*effectiveness)
            break
            case 17:
                userCombatant.statusEffect('Temporary Strength',5*effectiveness)
            break
            case 18:
                userCombatant.statusEffect('Temporary Dexterity',5*effectiveness)
            break
            case 19:
                this.battle.cardManagers[player].hand.callInput(6,[83,[1],1,[2,1,6]])
            break
            case 20:
                this.addItemSlots(1,player)
            break
            case 21:
                this.battle.overlayManager.overlays[10][player].active=true
                this.battle.overlayManager.overlays[10][player].activate([0,3,1])
            break
            case 22:
                this.battle.cardManagers[player].hand.callInput(6,[84,[3*effectiveness],4,[2,1,3]])
            break
            case 23:
                this.battle.cardManagers[player].hand.callInput(6,[85,[3*effectiveness],4,[2,1,3]])
            break
            case 24:
                this.battle.cardManagers[player].hand.callInput(6,[86,[3*effectiveness],4,[2,1,3]])
            break
            case 25:
                this.battle.cardManagers[player].draw(3*effectiveness)
            break
            case 26:
                userCombatant.statusEffect('Control',1*effectiveness)
            break
            case 27:
                this.battle.tileManager.typeArea(1,userCombatant.tilePosition)
            break
            case 28:
                userCombatant.statusEffect('Armor',10*effectiveness)
            break
            case 29:
                let amount=this.battle.cardManagers[player].hand.cards.length
                this.battle.cardManagers[player].allEffect(2,2)
                this.battle.cardManagers[player].draw(amount)
            break
            case 30:
                userCombatant.statusEffect('Regeneration',8*effectiveness)
            break
            case 31:
                userCombatant.statusEffect('Strength Per Turn',effectiveness)
            break
            case 32:
                userCombatant.statusEffect('Dexterity Per Turn',effectiveness)
            break
            case 33:
                this.battle.overlayManager.overlays[18][player].active=true
                this.battle.overlayManager.overlays[18][player].activate([0,3,1])
            break
            case 34:
                for(let a=0,la=3*effectiveness;a<la;a++){
                    this.battle.cardManagers[player].hand.add(findName('Miracle',types.card),0,0)
                }
            break
            case 35:
                this.battle.cardManagers[player].hand.duplicate(2)
            break
            case 36:
                this.battle.cardManagers[player].draw(3*effectiveness,5)
            break
            case 37:
                userCombatant.statusEffect('Retain Block',99)
            break
            case 38:
                this.battle.combatantManager.randomizeCombatants()
            break
            case 39:
                this.battle.cardManagers[player].hand.callInput(6,[489,[3*effectiveness],1,[0]])
            break
            case 40:
                this.battle.cardManagers[player].reserve.removeAbstract(0,[findName('Fatigue',types.card)])
                this.battle.cardManagers[player].discard.removeAbstract(0,[findName('Fatigue',types.card)])
                this.battle.cardManagers[player].allEffect(2,8)
            break
            case 41:
                for(let a=0,la=5*effectiveness;a<la;a++){
                    this.battle.cardManagers[player].hand.add(findName('Shiv',types.card),0,0)
                }
            break
            case 42:
                userCombatant.statusEffect('Extra Turn',effectiveness)
            break
            case 43:
                this.battle.overlayManager.overlays[6][player].active=true
                this.battle.overlayManager.overlays[6][player].activate([0,3,1])
            break
            case 44:
                userCombatant.gainMaxHP(5*effectiveness)
            break
            case 45:
                userCombatant.statusEffect('Intangible',2*effectiveness)
            break
            case 46:
                if(this.battle.encounter.class!=2){
                    transition.trigger=true
                    transition.scene='map'
                }
            break
            case 47:
                this.battle.cardManagers[player].draw(10*effectiveness)
                this.battle.cardManagers[player].allEffect(2,5)
            break
            case 48:
                userCombatant.statusEffect('Buffer',2*effectiveness)
            break
            case 49:
                userCombatant.heal(10*effectiveness)
            break
            case 50:
                for(let a=0,la=15;a<la;a++){
                    this.battle.combatantManager.randomEnemyEffect(0,[6])
                }
            break
            case 51:
                for(let a=0,la=this.items[player].length;a<la;a++){
                    this.addRandomItem(player)
                }
            break
            case 52:
                for(let a=0,la=3*effectiveness;a<la;a++){
                    this.battle.cardManagers[player].addRandomAbstract(2,0,0,0,1,[0],[3,11,0])
                }
            break
            case 101:
                userCombatant.statusEffect('Strength',5*effectiveness)
                for(let a=0,la=5*effectiveness;a<la;a++){
                    this.battle.dropDrawShuffle(player,findName('Burn',types.card),0,game.playerNumber+1)
                }
            break
            case 102:
                userCombatant.heal(15*effectiveness)
                if(stage.scene=='battle'){
                    userCombatant.statusEffect('Cannot Gain Block',99)
                }
            break
            case 103:
                userCombatant.heal(3*effectiveness)
            break
            case 104:
                this.battle.addEnergy(2*effectiveness,player)
            break
            case 105:
                this.battle.cardManagers[player].hand.callInput(6,[57,[5*effectiveness],1,[2,1,3]])
            break
            case 106:
                userCombatant.addBlock(10*effectiveness)
            break
            case 107:
                this.battle.cardManagers[player].draw(2*effectiveness)
            break
            case 108:
                userCombatant.statusEffect('Strength',effectiveness)
            break
            case 109:
                userCombatant.statusEffect('Dexterity',effectiveness)
            break
            case 110:
                for(let a=0,la=effectiveness;a<la;a++){
                    this.battle.cardManagers[player].addRandomAbstract(2,0,0,0,1,[],[3,1])
                }
            break
            case 112:
                this.battle.overlayManager.overlays[3][player].active=true
                this.battle.overlayManager.overlays[3][player].activate([0,3,20,16])
            break
            case 113:
                this.battle.overlayManager.overlays[3][player].active=true
                this.battle.overlayManager.overlays[3][player].activate([0,3,20,3])
            break
        }
        this.tempEffectiveness[player]=1
        if(this.battle.relicManager.hasRelic(80,player)&&floor(random(0,100))<(100-100*0.5**this.battle.relicManager.active[80][player+1])&&!types.item[type].temp){
            this.addRandomItem(player)
        }
    }
    activateEndBattle(player){
        for(let a=0,la=this.items[player].length;a<la;a++){
            if(this.items[player][a].temp){
                this.items[player][a].type=1
                this.items[player][a].refresh()
                this.total[player]--
            }
        }
        this.combatEffectiveness[player]=1
    }
    activateDeath(player){
        let effectiveness=this.effectiveness[player]*this.combatEffectiveness[player]*this.tempEffectiveness[player]
        for(let a=0,la=this.items[player].length;a<la;a++){
            if(this.items[player][a].name=='Bottled Fairy'){
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].healLifable(10*effectiveness)
                this.items[player][a].type=1
                this.items[player][a].refresh()
                this.tempEffectiveness[player]=1
            }
        }
    }
    display(scene){
        switch(scene){
            case 'battle': case 'map': case 'event':
                for(let a=0,la=this.items.length;a<la;a++){
                    this.items[a].forEach(item=>item.display(this.total[a],false))
                }
                for(let a=0,la=this.items.length;a<la;a++){
                    this.items[a].forEach(item=>item.displayInfo(0))
                }
            break
            case 'shop':
                for(let a=0,la=this.items.length;a<la;a++){
                    this.items[a].forEach(item=>item.display(this.total[a],true))
                }
                for(let a=0,la=this.items.length;a<la;a++){
                    this.items[a].forEach(item=>item.displayInfo(1))
                }
                this.layer.noStroke()
                this.layer.fill(230,230,210)
                this.layer.textSize(12)
                this.layer.textAlign(LEFT,CENTER)
                this.layer.text('Sell For 10:',10,36)
                this.layer.textAlign(CENTER,CENTER)
            break
        }
    }
    update(scene){
        switch(scene){
            case 'battle': case 'map': case 'event':
                for(let a=0,la=this.items.length;a<la;a++){
                    this.items[a].forEach(item=>item.update(this.up[a],la,inputs,false))
                }
            break
            case 'shop':
                for(let a=0,la=this.items.length;a<la;a++){
                    this.items[a].forEach(item=>item.update(this.up[a],la,inputs,true))
                }
            break
        }
    }
    onClick(scene){
        switch(scene){
            case 'battle': case 'map': case 'shop': case 'event':
                if(dist(inputs.rel.x,inputs.rel.y,25,50)<20&&this.items[0].length>0){
                    this.up[0]=toggle(this.up[0])
                }
                if(this.battle.players==2&&dist(inputs.rel.x,inputs.rel.y,this.layer.width-25,50)<20&&this.items[1].length>0){
                    this.up[1]=toggle(this.up[1])
                }
            break
        }
        switch(scene){
            case 'battle':
                for(let a=0,la=this.items.length;a<la;a++){
                    for(let b=0,lb=this.items[a].length;b<lb;b++){
                        if(dist(inputs.rel.x,inputs.rel.y,this.items[a][b].position.x,this.items[a][b].position.y)<20*this.items[a][b].size&&this.items[a][b].name!='Mundane Dust'&&this.items[a][b].type>=2&&this.up[a]&&this.battle.attackManager.attacks.length<=0&&this.battle.attackManager.targetInfo[0]==0){
                            let type=this.items[a][b].type
                            this.total[a]--
                            this.items[a][b].type=1
                            this.items[a][b].refresh()
                            this.activateItem(type,a)
                            this.battle.cardManagers[a].hand.callInput(7,0)
                        }
                    }
                }
            break
            case 'rewards':
                for(let a=0,la=this.items.length;a<la;a++){
                    for(let b=0,lb=this.items[a].length;b<lb;b++){
                        if(dist(inputs.rel.x,inputs.rel.y,this.items[a][b].position.x,this.items[a][b].position.y)<20*this.items[a][b].size&&this.items[a][b].name!='Mundane Dust'&&this.items[a][b].type>=2&&this.up[a]){
                            let menu=this.items[a][b].menu
                            let type=this.items[a][b].type
                            this.total[a]--
                            this.items[a][b].type=1
                            this.items[a][b].refresh()
                            if(menu){
                                this.activateItem(type,a)
                            }
                            this.battle.cardManagers[a].hand.callInput(7,0)
                        }
                    }
                }
            break
            case 'map':
                for(let a=0,la=this.items.length;a<la;a++){
                    for(let b=0,lb=this.items[a].length;b<lb;b++){
                        if(dist(inputs.rel.x,inputs.rel.y,this.items[a][b].position.x,this.items[a][b].position.y)<20*this.items[a][b].size&&this.items[a][b].name!='Mundane Dust'&&this.items[a][b].type>=2&&this.up[a]&&this.items[a][b].menu){
                            let type=this.items[a][b].type
                            this.total[a]--
                            this.items[a][b].type=1
                            this.items[a][b].refresh()
                            this.activateItem(type,a)
                            this.battle.cardManagers[a].hand.callInput(7,0)
                        }
                    }
                }
            break
            case 'shop':
                for(let a=0,la=this.items.length;a<la;a++){
                    for(let b=0,lb=this.items[a].length;b<lb;b++){
                        if(dist(inputs.rel.x,inputs.rel.y,this.items[a][b].altPosition.x,this.items[a][b].altPosition.y)<20*this.items[a][b].size&&this.items[a][b].name!='Mundane Dust'&&this.items[a][b].type>=2&&this.up[a]){
                            this.battle.addCurrency(10,a)
                            this.total[a]--
                            this.items[a][b].type=1
                            this.items[a][b].refresh()
                        }
                    }
                }
            break
        }
    }
    onKey(scene,key,code){
        switch(scene){
            case 'battle': case 'map': case 'shop': case 'event':
                if(key=='o'&&this.items[0].length>0){
                    this.up[0]=toggle(this.up[0])
                }
                if(this.battle.players==2&&key=='O'&&this.items[1].length>0){
                    this.up[1]=toggle(this.up[1])
                }
            break
        }
    }
}