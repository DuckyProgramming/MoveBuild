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
                case 4: case 17: case 37: case 38: case 39:
                    this.detail.push([0])
                break
                default:
                    this.detail.push([])
                break
            }
        }
        for(let a=0,la=this.battle.player.length;a<la;a++){
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
        }
    }
    hasRelic(type,player){
        return this.active[type]>0&&this.player[type]==player
    }
    activate(type,args){
        switch(type){
            case 0://start of general turn [turn]
                if(args[0]==1){
                    if(this.active[2]>0){
                        this.battle.cardManagers[this.player[2]].draw(2*this.active[2])
                    }
                    if(this.active[3]>0){
                        this.battle.energy.main[this.player[3]]+=this.active[3]
                    }
                    if(this.active[6]>0){
                        this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player[6])].statusEffect('Strength',this.active[6])
                    }
                    if(this.active[7]>0){
                        this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player[7])].statusEffect('Dexterity',this.active[7])
                    }
                    if(this.active[21]>0){
                        this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player[21])].statusEffect('Dodge',this.active[21])
                    }
                    if(this.active[31]>0){
                        this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player[31])].statusEffect('Single Strength',8*this.active[31])
                    }
                    if(this.active[36]>0){
                        this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player[36])].addBlock(10*this.active[36])
                    }
                    if(this.active[38]>0&&this.detail[38]==1){
                        this.detail[38]=0
                        this.battle.energy.main[this.player[38]]+=2*this.active[38]
                    }
                    if(this.active[39]>0){this.detail[39]=0}
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
            break
            case 1://end of combat
                if(this.active[1]>0){
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player[1])].heal(2*this.active[1])
                }
                if(this.active[19]>0){
                    if(this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player[19])].life<this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player[19])].base.life){
                        this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player[19])].heal(12*this.active[19])
                    }
                }
            break
            case 2://start of player turn [turn,player]
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
                    break
                    case 4:
                        if(this.active[20]>0&&args[1]==this.player[20]){
                            this.battle.cardManagers[this.player[20]].randomEffect(2,1,[this.active[20]])
                        }
                        if(this.active[27]>0&&args[1]==this.player[27]){
                            this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player[27])].heal(this.active[1])
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
            break
            case 7://entering rest
                if(this.active[38]>0&&this.detail[38]==0){
                    this.detail[38]=1
                }
            break
        }
    }
    display(scene){
        switch(scene){
            case 'battle':
                for(let a=0,la=this.relics.length;a<la;a++){
                    this.relics[a].display()
                }
                for(let a=0,la=this.relics.length;a<la;a++){
                    this.relics[a].displayInfo()
                }
            break
            case 'stash':
                for(let a=0,la=this.displayRelics.length;a<la;a++){
                    this.displayRelics[a].display()
                    for(let a=0,la=this.displayRelics.length;a<la;a++){
                        this.displayRelics[a].displayInfo()
                    }
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