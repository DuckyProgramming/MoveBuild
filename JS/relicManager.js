class relicManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        
        this.listing={relic:[[],[],[],[]]}
        this.active=[]
        this.player=[]

        this.relics=[]
        this.position=0

        this.initialListing()
        this.addRelic(0,0)
    }
    initialListing(){
        for(let a=0,la=types.relic.length;a<la;a++){
            if(types.relic[a].rarity>=0&&(types.relic[a].list==0||this.battle.player.includes(types.relic[a].list))){
                this.listing.relic[types.relic[a].rarity].push(a)
            }
            this.player.push(-1)
            this.active.push(false)
        }
    }
    addRelic(type,player){
        this.player[types.relic[type].id]=player
        this.active[types.relic[type].id]+=1
        this.relics.push(new relic(this.layer,25+(this.position%18)*50,50+floor(this.position/18)*50,types.relic[type].id))
        this.position++
        this.get(types.relic[type].id,player)
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
                        for(let a=0,la=this.active[8];a<la;a++){
                            this.battle.cardManagers[this.player[9]].hand.add(findName('Redraw',types.card),0,0)
                        }
                    }
                    if(this.active[10]>0){
                        for(let a=0,la=this.active[8];a<la;a++){
                            this.battle.cardManagers[this.player[10]].hand.add(findName('Miracle',types.card),0,0)
                        }
                    }
                }
                if(args[0]%3==0){
                    if(this.active[4]>0){
                        this.battle.energy.main[this.player[3]]+=this.active[4]
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
    display(){
        for(let a=0,la=this.relics.length;a<la;a++){
            this.relics[a].display()
        }
    }
    update(){
        for(let a=0,la=this.relics.length;a<la;a++){
            this.relics[a].update()
        }
    }
}