class relicManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        
        this.listing={relic:[[],[],[],[]]}
        this.active=[]
        this.player=[]

        this.relics=[]
        this.displayRelics=[]
        this.position=0
        this.total=0
        this.up=false
        this.complete=[]

        this.initialListing()
        this.addRelic(0,0)
    }
    initialListing(){
        for(let a=0,la=types.relic.length;a<la;a++){
            if(types.relic[a].rarity>=0&&(types.relic[a].list==0||this.battle.player.includes(types.relic[a].list))){
                this.listing.relic[types.relic[a].rarity].push(a)
            }
            this.player.push(-1)
            this.active.push(0)
        }
        for(let a=0,la=this.battle.player.length;a<la;a++){
            this.complete.push(false)
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
            this.displayRelics.push(new relic(this.layer,this.layer.width/2,this.layer.height/2-100+a*100,relics[rarity][index],2))
            relics[rarity].splice(index,1)
        }
    }
    addRelic(type,player){
        this.player[types.relic[type].id]=player
        this.active[types.relic[type].id]+=1
        this.relics.push(new relic(this.layer,25+(this.position%18)*50,50+floor(this.position/18)*50,types.relic[type].id,1))
        this.position++
        this.total++
        this.get(types.relic[type].id,player)
    }
    addRandomRelic(player){
        let possible=[0,0,0/*,1,1,2*/]
        let rarity=possible[floor(random(0,possible.length))]
        let index=floor(random(0,this.listing.relic[rarity].length))
        this.addRelic(this.listing.relic[rarity][index],player)
        this.listing.relic[rarity].splice(index,1)
    }
    makeRelicSelection(rarity){
        this.displayRelics=[]
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
        }
    }
    activate(type,args){
        switch(type){
            case 0:
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
                    if(this.active[8]>0){
                        for(let a=0,la=this.active[8];a<la;a++){
                            this.battle.cardManagers[this.player[8]].hand.add(findName('Emergency\nMove',types.card),0,0)
                        }
                    }
                    if(this.active[9]>0){
                        for(let a=0,la=this.active[9];a<la;a++){
                            this.battle.cardManagers[this.player[9]].hand.add(findName('Redraw',types.card),0,0)
                        }
                    }
                    if(this.active[10]>0){
                        for(let a=0,la=this.active[10];a<la;a++){
                            this.battle.cardManagers[this.player[10]].hand.add(findName('Miracle',types.card),0,0)
                        }
                    }
                }
                if(args[0]%3==0){
                    if(this.active[4]>0){
                        this.battle.energy.main[this.player[4]]+=this.active[4]
                    }
                }
            break
            case 1:
                if(this.active[1]>0){
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player[1])].heal(2*this.active[1])
                }
            break
        }
    }
    display(scene){
        switch(scene){
            case 'battle':
                for(let a=0,la=this.relics.length;a<la;a++){
                    this.relics[a].display(scene)
                }
                for(let a=0,la=this.relics.length;a<la;a++){
                    this.relics[a].displayInfo(scene)
                }
            break
            case 'stash':
                for(let a=0,la=this.displayRelics.length;a<la;a++){
                    if(this.battle.player.length==1){
                        this.displayRelics[a].display('battle')
                    }else{
                        this.displayRelics[a].display(scene)
                    }
                    for(let a=0,la=this.displayRelics.length;a<la;a++){
                        this.displayRelics[a].displayInfo(scene)
                    }
                }
            break
        }
    }
    update(scene){
        switch(scene){
            case 'battle':
                for(let a=0,la=this.relics.length;a<la;a++){
                    this.relics[a].update(this.up,this.total,inputs)
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
                if(dist(inputs.rel.x,inputs.rel.y,25,50)<20){
                    this.up=toggle(this.up)
                }
            break
            case 'stash':
                for(let a=0,la=this.displayRelics.length;a<la;a++){
                    if(dist(inputs.rel.x,inputs.rel.y,this.displayRelics[a].position.x,this.displayRelics[a].position.y)<20*this.displayRelics[a].size&&!this.displayRelics[a].deFade&&(this.battle.player.length==1&&!this.complete[0]||this.battle.player.length==2&&(inputs.rel.x<this.displayRelics[a].position.x&&!this.complete[0]||inputs.rel.x>this.displayRelics[a].position.x&&!this.complete[1]))){
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
                    }
                }
            break
        }
    }
    onKey(scene,key,code){
        switch(scene){
            case 'battle':
                if(key=='i'){
                    this.up=toggle(this.up)
                }
            break
            case 'stash':
            break
        }
    }
}