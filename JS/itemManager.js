class itemManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle

        this.listing={item:[[],[],[],[]]}
        
        this.items=[]
        this.position=[]
        this.up=[]
        this.total=[]
        this.effectiveness=[]
        this.combatEffectiveness=[]
        this.tempEffectiveness=[]

        this.initialListing()
    }
    save(){
        let composite={
            listing:{
                item:this.listing.item,
            },
            items:[
            ],
            position:this.position,
            up:this.up,
            total:this.total,
            effectiveness:this.effectiveness,
        }
        for(let a=0,la=this.items.length;a<la;a++){
            composite.items.push([])
            this.items[a].forEach(item=>composite.items[a].push(item.save()))
        }
        return composite
    }
    load(composite){
        this.listing.item=composite.listing.item
        this.position=composite.position
        this.up=composite.up
        this.total=composite.total
        this.effectiveness=composite.effectiveness
        this.items=[]
        for(let a=0,la=composite.items.length;a<la;a++){
            this.items.push([])
            for(let b=0,lb=composite.items[a].length;b<lb;b++){
                let base=composite.items[a][b]
                this.items[a].push(new item(this.layer,this.battle,0,0,0,0,0,0,0))
                this.items[a][this.items[a].length-1].establish(base.player,base.position.x,base.position.y,base.altPosition.x,base.altPosition.y,base.type,base.size)
            }
        }
    }
    initialListing(){
        for(let a=0,la=types.item.length;a<la;a++){
            if(
                types.item[a].rarity>=0&&
                (types.item[a].list==0||this.battle.player.includes(types.item[a].list))&&
                (types.item[a].mtg==0||types.item[a].mtg==1&&!variants.mtg||types.item[a].mtg==2&&variants.mtg)
            ){
                this.listing.item[types.item[a].rarity].push(a)
            }
        }
        for(let a=0,la=this.battle.players;a<la;a++){
            this.items.push(game.ascend>=11?[
                new item(this.layer,this.battle,a,25+(this.layer.width-50)*a,50,100+(this.layer.width-200)*a,25,0,1),
                new item(this.layer,this.battle,a,75+(this.layer.width-150)*a,50,150+(this.layer.width-300)*a,25,1,1),
                new item(this.layer,this.battle,a,125+(this.layer.width-250)*a,50,200+(this.layer.width-400)*a,25,1,1)]:[
                new item(this.layer,this.battle,a,25+(this.layer.width-50)*a,50,100+(this.layer.width-200)*a,25,0,1),
                new item(this.layer,this.battle,a,75+(this.layer.width-150)*a,50,150+(this.layer.width-300)*a,25,1,1),
                new item(this.layer,this.battle,a,125+(this.layer.width-250)*a,50,200+(this.layer.width-400)*a,25,1,1),
                new item(this.layer,this.battle,a,175+(this.layer.width-350)*a,50,250+(this.layer.width-500)*a,25,1,1)])
            this.position.push(game.ascend>=11?-1:0)
            this.up.push(true)
            this.total.push(0)
            this.effectiveness.push(1)
            this.combatEffectiveness.push(1)
            this.tempEffectiveness.push(1)
        }
    }
    hasEmpty(player){
        for(let a=0,la=this.items[player].length;a<la;a++){
            if(this.items[player][a].type==1){
                return true
            }
        }
        return false
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
    makeItemSelection(rarity){
        let list=[]
        let items=copyArrayStack(this.listing.item)
        for(let a=0,la=rarity.length;a<la;a++){
            if(items[rarity[a]].length>0){
                let index=floor(random(0,items[rarity[a]].length))
                list.push(items[rarity[a]][index])
                items[rarity[a]].splice(index,1)
            }
        }
        return list
    }
    addItemSlots(amount,player){
        for(let a=0;a<amount;a++){
            this.items[player].push(new item(this.layer,this.battle,player,225+50*this.position[player]+(this.layer.width-450-100*this.position[player])*player,50,300+this.position[player]*50+(this.layer.width-600-this.position[player]*100)*player,25,1,1))
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
    transformAll(player){
        for(let a=0,la=this.items[player].length;a<la;a++){
            if(this.items[player][a].type>1){
                let rarity=constrain(this.items[player][a].rarity,0,3)
                this.items[player][a].type=this.listing.item[rarity][floor(random(0,this.listing.item[rarity].length))]
                this.items[player][a].refresh()
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
        let holdTempEffectiveness=1
        if(userCombatant.getStatus('Item Use Energy')>0){
            this.battle.addSpecificEnergy(userCombatant.getStatus('Item Use Energy'),player,6)
        }
        if(userCombatant.getStatus('Item Use Draw')>0){
            this.battle.cardManagers[player].draw(userCombatant.getStatus('Item Use Draw'))
        }
        if(userCombatant.getStatus('Item Use (N)')>0){
            this.battle.addSpecificEnergy(userCombatant.getStatus('Item Use (N)'),player,0)
        }
        switch(types.item[type].id){
            case 2:
                this.battle.cardManagers[player].hand.selfCall(6,[57,[10*effectiveness],1,[2,1,6]])
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
                this.battle.cardManagers[player].hand.selfCall(6,[81,[10*effectiveness],1,[2,1,2]])
            break
            case 9:
                this.battle.cardManagers[player].hand.selfCall(6,[54,[],3,[6]])
            break
            case 10:
                userCombatant.statusEffect('Counter All',10*effectiveness)
            break
            case 11:
                userCombatant.addBlock(20*effectiveness)
            break
            case 12:
                this.battle.cardManagers[player].hand.selfCall(6,[3595,[20*effectiveness],1,[2,1,3]])
            break
            case 13:
                this.battle.cardManagers[player].allEffect(2,4)
            break
            case 14:
                this.battle.addSpecificEnergy(3*effectiveness,player,6)
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
                this.battle.cardManagers[player].hand.selfCall(6,[83,[effectiveness],11,[2,1,6]])
            break
            case 20:
                this.addItemSlots(1,player)
            break
            case 21:
                this.battle.overlayManager.overlays[10][player].active=true
                this.battle.overlayManager.overlays[10][player].activate([0,3,1])
            break
            case 22:
                this.battle.cardManagers[player].hand.selfCall(6,[84,[3*effectiveness],11,[2,1,3]])
            break
            case 23:
                this.battle.cardManagers[player].hand.selfCall(6,[85,[3*effectiveness],11,[2,1,3]])
            break
            case 24:
                this.battle.cardManagers[player].hand.selfCall(6,[86,[3*effectiveness],11,[2,1,3]])
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
                this.battle.overlayManager.overlays[18][player].activate()
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
                userCombatant.statusEffect('Retain Block',5*effectiveness)
            break
            case 38:
                this.battle.combatantManager.randomizeCombatants()
            break
            case 39:
                this.battle.cardManagers[player].hand.selfCall(6,[489,[3*effectiveness],1,[0]])
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
                for(let a=0,la=10;a<la;a++){
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
            case 53:
                userCombatant.statusEffect('Double Damage',effectiveness)
            break
            case 54:
                this.battle.overlayManager.overlays[40][player].active=true
                this.battle.overlayManager.overlays[40][player].activate()
            break
            case 55:
                this.battle.overlayManager.overlays[7][player].active=true
                this.battle.overlayManager.overlays[7][player].activate()
            break
            case 56:
                this.battle.overlayManager.overlays[8][player].active=true
                this.battle.overlayManager.overlays[8][player].activate()
            break
            case 57:
                for(let a=0,la=effectiveness;a<la;a++){
                    this.battle.cardManagers[player].randomEffect(0,2,[0])
                }
            break
            case 58:
                this.battle.addEnergy(3*effectiveness,player)
                this.battle.cardManagers[player].draw(5*effectiveness)
                userCombatant.loseHealth(3*effectiveness)
            break
            case 59:
                this.battle.addEnergy(5*effectiveness,player)
                userCombatant.statusEffect('Retain Energy',5*effectiveness)
            break
            case 60:
                current.particleManager.particles.push(new particle(this.battle.layer,userCombatant.position.x,userCombatant.position.y-50,120,[40]))
                this.battle.combatantManager.areaAbstract(0,[30*effectiveness,userCombatant.id,0],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
                this.battle.combatantManager.areaAbstract(2,['Burn',2*effectiveness],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
                this.battle.combatantManager.areaAbstract(2,['Freeze',2*effectiveness],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
                this.battle.combatantManager.areaAbstract(2,['Shock',2*effectiveness],userCombatant.tilePosition,[3,userCombatant.id],[0,1],false,0)
            break
            case 61:
                current.particleManager.particles.push(new particle(this.battle.layer,userCombatant.position.x,userCombatant.position.y-50,121,[20]))
                this.battle.addEnergyGen(effectiveness,player)
            break
            case 62:
                this.battle.addSpecificEnergy(effectiveness,player,6)
                this.battle.cardManagers[player].draw(this.battle.cardManagers[player].hand.allEffectArgs(32,[1])*effectiveness)
            break
            case 63:
                this.battle.addSpecificEnergy(effectiveness,player,6)
                this.battle.cardManagers[player].draw(this.battle.cardManagers[player].hand.allEffectArgs(32,[2])*effectiveness)
            break
            case 64:
                userCombatant.statusEffect('Cancel Exhaust',3*effectiveness)
            break
            case 65:
                this.battle.overlayManager.overlays[19][player].active=true
                this.battle.overlayManager.overlays[19][player].activate()
            break
            case 66:
                this.battle.itemManager.dupeRandom(player)
            break
            case 67:
                userCombatant.statusEffect('Take Half Damage',2*effectiveness)
            break
            case 69:
                this.battle.overlayManager.overlays[3][player].active=true
                this.battle.overlayManager.overlays[3][player].activate([0,1,12])
            break
            case 70:
                this.battle.overlayManager.overlays[35][player].active=true
                this.battle.overlayManager.overlays[35][player].activate([0,3,0])
            break
            case 71:
                this.battle.cardManagers[player].hand.selfCall(6,[3632,[24*effectiveness,1],1,[2,1,6]])
            break
            case 72:
                this.battle.cardManagers[player].hand.selfCall(6,[3633,[35*effectiveness,2*effectiveness],1,[2,1,6]])
            break
            case 73:
                this.battle.overlayManager.overlays[43][player].active=true
                this.battle.overlayManager.overlays[43][player].activate()
            break
            case 74:
                this.battle.overlayManager.overlays[44][player].active=true
                this.battle.overlayManager.overlays[44][player].activate()
            break
            case 75:
                userCombatant.heal(userCombatant.base.life*effectiveness)
            break
            case 76:
                this.battle.purchaseManager.free[player]+=3
            break
            case 77:
                for(let a=0,la=effectiveness;a<la;a++){
                    this.battle.cardManagers[player].hand.add(findName('Strike',types.card),0,this.battle.player[player])
                    this.battle.cardManagers[player].hand.add(findName('Defend',types.card),0,this.battle.player[player])
                    this.battle.cardManagers[player].hand.add(findName('Step',types.card),0,this.battle.player[player])
                }
            break
            case 78:
                userCombatant.statusEffect('Retain Hand',effectiveness)
            break
            case 79:
                for(let a=0,la=3*effectiveness;a<la;a++){
                    this.battle.cardManagers[player].hand.add(findName(`${floor(random(1,12))} of\nNothings`,types.card),0,0)
                }
            break
            case 80:
                let amount80=this.battle.cardManagers[player].hand.cards.length
                this.battle.cardManagers[player].allEffect(2,2)
                userCombatant.addBlock(5*amount80*effectiveness)
                for(let a=0,la=effectiveness;a<la;a++){
                    this.battle.cardManagers[player].hand.add(findName('Miracle',types.card),0,0)
                }
            break
            case 81:
                holdTempEffectiveness=max(1+effectiveness,holdTempEffectiveness)
            break
            case 82:
                for(let a=0,la=effectiveness;a<la;a++){
                    this.battle.combatantManager.tick()
                }
            break
            case 83:
                this.battle.combatantManager.allEffect(48,['Cannot Move',effectiveness])
            break
            case 84:
                this.battle.combatantManager.allEffect(43,[effectiveness,userCombatant.id])
            break
            case 86:
                this.battle.combatantManager.allEffect(48,['Cannot Add Block',2*effectiveness])
            break
            case 87:
                for(let a=0,la=3*effectiveness;a<la;a++){
                    this.battle.cardManagers[player].hand.add(findName('Pristine',types.card),0,0)
                }
            break
            case 88:
                this.battle.cardManagers[player].hand.extremaEffect(0,1)
            break
            case 89:
                this.battle.overlayManager.overlays[100][player].active=true
                this.battle.overlayManager.overlays[100][player].activate()
            break
            case 90:
                this.battle.cardManagers[player].allEffect(1,4)
                this.battle.cardManagers[player].allEffect(2,3)
                this.battle.cardManagers[player].allEffect(3,4)
                userCombatant.statusEffect('Burn',2*effectiveness)
            break
            case 91:
                userCombatant.removeAllStatuses([1,3])
            break
            case 92:
                this.battle.overlayManager.overlays[46][player].active=true
                this.battle.overlayManager.overlays[46][player].activate([5*effectiveness])
            break
            case 93:
                this.battle.cardManagers[player].hand.selfCall(6,[342,[8*effectiveness],1,[5]])
            break
            case 94:
                this.battle.cardManagers[player].allEffect(2,35)
            break
            case 95:
                this.battle.cardManagers[player].hand.selfCall(6,[250,[],1,[2,1,1]])
            break
            case 96:
                userCombatant.statusEffect('Strength in 3 Turns',3*effectiveness)
                userCombatant.statusEffect('Dexterity in 3 Turns',3*effectiveness)
            break
            case 97:
                this.battle.addSpecificEnergy(effectiveness,player,6)
                this.battle.cardManagers[player].draw(this.battle.cardManagers[player].hand.allEffectArgs(32,[3])*effectiveness)
            break
            case 98:
                this.battle.addSpecificEnergy(effectiveness,player,6)
                this.battle.cardManagers[player].draw(this.battle.cardManagers[player].hand.allEffectArgs(32,[4])*effectiveness)
            break
            case 99:
                this.battle.addSpecificEnergy(effectiveness,player,6)
                this.battle.cardManagers[player].draw(this.battle.cardManagers[player].hand.allEffectArgs(32,[11])*effectiveness)
            break
            case 100:
                this.battle.cardManagers[player].hand.allEffect(107)
            break
            case 101:
                this.battle.cardManagers[player].hand.selfCall(6,[3645,[25*effectiveness],1,[2,1,3]])
            break
            case 102:
                this.battle.cardManagers[player].draw(5*effectiveness-this.battle.cardManagers[player].hand.cards.length)
            break
            case 103:
                this.battle.cardManagers[player].drawAbstract(5*effectiveness,4,0,[0])
            break
            case 104:
                this.battle.cardManagers[player].drawAbstract(5*effectiveness,4,0,[1])
            break
            case 105:
                for(let a=0,la=5;a<la;a++){
                    this.battle.addSpecificEnergy(effectiveness,player,a+1)
                }
            break
            case 106:
                this.battle.addSpecificEnergy(3*effectiveness,player,6)
                this.battle.cardManagers[player].draw(5*effectiveness)
                userCombatant.loseHealth(3*effectiveness)
            break
            case 107:
                this.battle.addSpecificEnergy(5*effectiveness,player,6)
                userCombatant.statusEffect('Retain Mana',5*effectiveness)
            break
            case 108:
                this.battle.overlayManager.overlays[121][player].active=true
                this.battle.overlayManager.overlays[121][player].activate()
            break
            case 109:
                this.battle.addSpecificEnergyGen(1,player,6)
            break
            case 110:
                this.battle.addSpecificEnergy(2*effectiveness,player,5)
                this.battle.cardManagers[player].draw(this.battle.cardManagers[player].hand.allEffectArgs(32,[1])*effectiveness)
            break
            case 111:
                this.battle.addSpecificEnergy(2*effectiveness,player,4)
                this.battle.cardManagers[player].draw(this.battle.cardManagers[player].hand.allEffectArgs(32,[2])*effectiveness)
            break
            case 112:
                this.battle.addSpecificEnergy(2*effectiveness,player,2)
                this.battle.cardManagers[player].draw(this.battle.cardManagers[player].hand.allEffectArgs(32,[3])*effectiveness)
            break
            case 113:
                this.battle.addSpecificEnergy(2*effectiveness,player,3)
                this.battle.cardManagers[player].draw(this.battle.cardManagers[player].hand.allEffectArgs(32,[4])*effectiveness)
            break
            case 114:
                this.battle.addSpecificEnergy(2*effectiveness,player,1)
                this.battle.cardManagers[player].draw(this.battle.cardManagers[player].hand.allEffectArgs(32,[11])*effectiveness)
            break
            case 115:
                userCombatant.statusEffect('Free Card',effectiveness)
            break
            case 116:
                this.battle.cardManagers[player].hand.selfCall(6,[7962,[35*effectiveness,2*effectiveness],1,[2,1,6]])
            break
            case 117:
                this.battle.cardManagers[player].hand.duplicateSelect(3*effectiveness)
            break

            //mark p

            case 1001:
                userCombatant.statusEffect('Strength',5*effectiveness)
                for(let a=0,la=5*effectiveness;a<la;a++){
                    this.battle.dropDrawShuffle(player,findName('Burn',types.card),0,constants.playerNumber+1)
                }
            break
            case 1002:
                userCombatant.heal(15*effectiveness)
                if(stage.scene=='battle'){
                    userCombatant.statusEffect('Cannot Add Block',99)
                }
            break
            case 1003:
                userCombatant.heal(3*effectiveness)
            break
            case 1004:
                this.battle.addSpecificEnergy(effectiveness,player,6)
            break
            case 1005:
                this.battle.cardManagers[player].hand.selfCall(6,[57,[5*effectiveness],1,[2,1,3]])
            break
            case 1006:
                userCombatant.addBlock(10*effectiveness)
            break
            case 1007:
                this.battle.cardManagers[player].draw(2*effectiveness)
            break
            case 1008:
                userCombatant.statusEffect('Strength',effectiveness)
            break
            case 1009:
                userCombatant.statusEffect('Dexterity',effectiveness)
            break
            case 1010:
                for(let a=0,la=effectiveness;a<la;a++){
                    this.battle.cardManagers[player].addRandomAbstract(2,0,0,0,1,[],[3,1])
                }
            break
            case 1012:
                this.battle.overlayManager.overlays[3][player].active=true
                this.battle.overlayManager.overlays[3][player].activate([0,3,20,16])
            break
            case 1013:
                this.battle.overlayManager.overlays[3][player].active=true
                this.battle.overlayManager.overlays[3][player].activate([0,3,20,3])
            break
            case 1014:
                this.battle.addSpecificEnergy(3*effectiveness,player,6)
                this.battle.cardManagers[player].draw(3*effectiveness,1)
            break
            case 1015:
                this.battle.addSpecificEnergy(2*effectiveness,player,6)
            break
            case 1016:
                this.battle.addSpecificEnergy(4*effectiveness,player,6)
                this.battle.cardManagers[player].draw(3*effectiveness,1)
            break
            case 1017: case 1018:
                this.battle.combatantManager.randomNumberEffect(
                    1+userCombatant.getStatus('Prismatic Bomb Targets'),
                    0,
                    [
                        (9+userCombatant.getStatus('Prismatic Bomb Boost'))*effectiveness,
                        this.player,
                        userCombatant.getStatus('Prismatic Bomb Freeze'),
                        userCombatant.getStatus('Prismatic Bomb Poison')
                    ]
                )
                if(userCombatant.getStatus('Prismatic Bomb Items')>0){
                    for(let a=0,la=userCombatant.getStatus('Prismatic Bomb Items');a<la;a++){
                        this.battle.itemManager.addItem(findInternal(['Heal 3',variants.mtg?'3 Mana':'2 Energy','5 Damage','10 Block','Draw 2','1 Strength','1 Dexterity','1 Free Card'][floor(random(0,8))],types.item),this.player)
                    }
                }
                this.battle.addSpecificEnergy(effectiveness,player,6)
                this.battle.cardManagers[player].draw(effectiveness)
            break
        }
        this.tempEffectiveness[player]=holdTempEffectiveness
        if(this.battle.relicManager.hasRelic(80,player)&&floor(random(0,100))<(100-100*0.5**this.battle.relicManager.active[80][player+1])&&!types.item[type].temp){
            this.addRandomItem(player)
        }
    }
    activatePreEndBattle(player,encounterClass){
        for(let a=0,la=this.items[player].length;a<la;a++){
            if(this.items[player][a].temp){
                this.items[player][a].type=1
                this.items[player][a].refresh()
                this.total[player]--
            }
        }
        this.combatEffectiveness[player]=1
    }
    activateEndBattle(player,encounterClass,reward){
        for(let a=0,la=this.items[player].length;a<la;a++){
            switch(encounterClass){
                case 2:
                    switch(types.item[this.items[player][a].type].id){
                        case 68:
                            reward.push({type:2,value:[]})
                            this.items[player][a].type=1
                            this.items[player][a].refresh()
                            this.total[player]--
                        break
                    }
                break
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
            case 'battle':
                for(let a=0,la=this.items.length;a<la;a++){
                    this.items[a].forEach(item=>item.display(this.total[a],false))
                }
            break
            case 'info':
                for(let a=0,la=this.items.length;a<la;a++){
                    this.items[a].forEach(item=>item.displayInfo(0))
                }
            break
            case 'map': case 'event':
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
                    this.items[a].forEach(item=>item.update(this.up[a],la,inputs,false,this.battle))
                }
            break
            case 'shop':
                for(let a=0,la=this.items.length;a<la;a++){
                    this.items[a].forEach(item=>item.update(this.up[a],la,inputs,true,this.battle))
                }
            break
        }
    }
    onClick(scene){
        switch(scene){
            case 'battle': case 'map': case 'event':
                if(dist(inputs.rel.x,inputs.rel.y,25,50)<20&&this.items[0].length>0){
                    this.up[0]=toggle(this.up[0])
                }
                if(this.battle.players==2&&dist(inputs.rel.x,inputs.rel.y,this.layer.width-25,50)<20&&this.items[1].length>0){
                    this.up[1]=toggle(this.up[1])
                }
            break
            case 'shop':
                if(dist(inputs.rel.x,inputs.rel.y,100,25)<20&&this.items[0].length>0){
                    this.up[0]=toggle(this.up[0])
                }
                if(this.battle.players==2&&dist(inputs.rel.x,inputs.rel.y,this.layer.width-100,25)<20&&this.items[1].length>0){
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
                            this.battle.cardManagers[a].hand.selfCall(7,0)
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
                            this.battle.cardManagers[a].hand.selfCall(7,0)
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
                            this.battle.cardManagers[a].hand.selfCall(7,0)
                        }
                    }
                }
            break
            case 'shop':
                for(let a=0,la=this.items.length;a<la;a++){
                    for(let b=0,lb=this.items[a].length;b<lb;b++){
                        if(dist(inputs.rel.x,inputs.rel.y,this.items[a][b].altPosition.x,this.items[a][b].altPosition.y)<20*this.items[a][b].size&&this.items[a][b].name!='Mundane Dust'&&this.items[a][b].type>=2&&this.up[a]){
                            this.battle.addCurrency(types.item[this.items[a][b].type].id==85?50:10,a)
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