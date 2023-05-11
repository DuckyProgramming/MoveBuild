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

        this.initialListing()
    }
    initialListing(){
        for(let a=0,la=types.item.length;a<la;a++){
            if(types.item[a].rarity>=0&&(types.item[a].list==0||this.battle.player.includes(types.item[a].list))){
                this.listing.item[types.item[a].rarity].push(a)
            }
        }
        for(let a=0,la=this.battle.players;a<la;a++){
            this.items.push([
                new item(this.layer,a,25+(this.layer.width-50)*a,50,25+(this.layer.width-50)*a,50,0,1),
                new item(this.layer,a,75+(this.layer.width-150)*a,50,25+(this.layer.width-50)*a,100,1,1),
                new item(this.layer,a,125+(this.layer.width-250)*a,50,25+(this.layer.width-50)*a,150,1,1),
                new item(this.layer,a,175+(this.layer.width-350)*a,50,25+(this.layer.width-50)*a,200,1,1)])
            this.position.push(0)
            this.up.push(true)
            this.total.push(0)
            this.effectiveness.push(1)
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
            if(this.items[player].type>1){
                possible.push(a)
            }
        }
        if(possible.length>0){
            this.items[possible[floor(random(0,possible.length))]].type=1
        }
    }
    addSetItem(rarity,player){
        let index=floor(random(0,this.listing.item[rarity].length))
        this.addItem(this.listing.item[rarity][index],player)
    }
    addItemSlots(amount,player){
        for(let a=0;a<amount;a++){
            this.items[player].push(new item(this.layer,player,225+50*this.position[player]+(this.layer.width-450-100*this.position[player])*player,50,25+(this.layer.width-50)*player,250+this.position[player],1,1))
            this.position[player]++
        }
    }
    removeItemSlots(amount,player){
        for(let a=0;a<amount;a++){
            this.items[player].splice(this.items[player].length-1,1)
        }
        this.position-=player
    }
    activateItem(type,player){
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)]
        switch(types.item[type].id){
            case 2:
                this.battle.cardManagers[player].hand.callInput(6,[57,[10*this.effectiveness[player]],1,[2,1,6]])
            break
            case 3:
                for(let a=0,la=3*this.effectiveness[player];a<la;a++){
                    this.battle.cardManagers[player].addRandomClass(2,0,1)
                }
            break
            case 4:
                for(let a=0,la=3*this.effectiveness[player];a<la;a++){
                    this.battle.cardManagers[player].addRandomClass(2,0,2)
                }
            break
            case 5:
                for(let a=0,la=3*this.effectiveness[player];a<la;a++){
                    this.battle.cardManagers[player].addRandomClass(2,0,3)
                }
            break
            case 6:
                for(let a=0,la=3*this.effectiveness[player];a<la;a++){
                    this.battle.cardManagers[player].addRandomClass(2,0,4)
                }
            break
            case 7:
                userCombatant.heal(15*this.effect[player])
            break
            case 8:
                this.battle.cardManagers[player].hand.callInput(6,[81,[10*this.effectiveness[player]],4,[2,1,2]])
            break
            case 9:
                this.battle.cardManagers[player].hand.callInput(6,[54,[],4,[6]])
            break
            case 10:
                userCombatant.statusEffect('Counter All',10*this.effectiveness[player])
            break
            case 11:
                userCombatant.addBlock(20*this.effectiveness[player])
            break
            case 12:
                this.battle.cardManagers[player].hand.callInput(6,[82,[10*this.effectiveness[player]],4,[8,1,3]])
            break
            case 13:
                this.battle.cardManagers[player].allEffect(2,4)
            break
            case 14:
                this.battle.energy.main[player]+=3*this.effectiveness[player]
            break
            case 15:
                userCombatant.statusEffect('Strength',2*this.effectiveness[player])
            break
            case 16:
                userCombatant.statusEffect('Dexterity',2*this.effectiveness[player])
            break
            case 17:
                userCombatant.statusEffect('Temporary Strength',5*this.effectiveness[player])
            break
            case 18:
                userCombatant.statusEffect('Temporary Dexterity',5*this.effectiveness[player])
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
                this.battle.cardManagers[player].hand.callInput(6,[84,[3*this.effectiveness[player]],4,[2,1,3]])
            break
            case 23:
                this.battle.cardManagers[player].hand.callInput(6,[85,[3*this.effectiveness[player]],4,[2,1,3]])
            break
            case 24:
                this.battle.cardManagers[player].hand.callInput(6,[86,[3*this.effectiveness[player]],4,[2,1,3]])
            break
            case 25:
                this.battle.cardManagers[player].draw(3*this.effectiveness[player])
            break
            
            case 101:
                userCombatant.statusEffect('Strength',5*this.effectiveness[player])
                for(let a=0,la=5*this.effectiveness[player];a<la;a++){
                    this.battle.cardManagers[player].discard.add(findName('Burn',types.card),0,game.playerNumber+1)
                }
            break
            case 102:
                userCombatant.heal(15*this.effectiveness[player])
                userCombatant.statusEffect('Cannot Gain Block',99)
            break
        }
        if(this.battle.relicManager.hasRelic(80,player)&&floor(random(0,2))==0){
            this.addRandomItem(player)
        }
    }
    display(scene){
        switch(scene){
            case 'battle':
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
                this.layer.fill(230,230,210)
                this.layer.textSize(16)
                this.layer.text('10',25,33+this.items[0].length*50)
                if(this.battle.currency.money.length>1){
                    this.layer.text('10',this.layer.width-25,33+this.items[1].length*50)
                }
            break
        }
    }
    update(scene){
        switch(scene){
            case 'battle':
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
            case 'battle':
                if(dist(inputs.rel.x,inputs.rel.y,25,50)<20&&this.items[0].length>0){
                    this.up[0]=toggle(this.up[0])
                }
                if(this.battle.players==2&&dist(inputs.rel.x,inputs.rel.y,this.layer.width-25,50)<20&&this.items[1].length>0){
                    this.up[1]=toggle(this.up[1])
                }
                for(let a=0,la=this.items.length;a<la;a++){
                    for(let b=0,lb=this.items[a].length;b<lb;b++){
                        if(dist(inputs.rel.x,inputs.rel.y,this.items[a][b].position.x,this.items[a][b].position.y)<20*this.items[a][b].size&&this.items[a][b].type>=2&&this.up[a]&&this.battle.attackManager.attacks.length<=0){
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
                if(dist(inputs.rel.x,inputs.rel.y,25,50)<20&&this.items[0].length>0){
                    this.up[0]=toggle(this.up[0])
                }
                if(this.battle.players==2&&dist(inputs.rel.x,inputs.rel.y,this.layer.width-25,50)<20&&this.items[1].length>0){
                    this.up[1]=toggle(this.up[1])
                }
                for(let a=0,la=this.items.length;a<la;a++){
                    for(let b=0,lb=this.items[a].length;b<lb;b++){
                        if(dist(inputs.rel.x,inputs.rel.y,this.items[a][b].altPosition.x,this.items[a][b].altPosition.y)<20*this.items[a][b].size&&this.items[a][b].type>=2&&this.up[a]){
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
            case 'battle':
                if(key=='o'&&this.items[0].length>0){
                    this.up[0]=toggle(this.up[0])
                }
                if(this.battle.players==2&&key=='O'&&this.items[1].length>0){
                    this.up[1]=toggle(this.up[1])
                }
            break
            case 'shop':
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