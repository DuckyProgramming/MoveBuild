class eventManager{
    constructor(layer,battle,player){
        this.layer=layer
        this.battle=battle
        this.player=player

        this.event=0
        this.id=0
        this.name=''
        this.pages=[]
        this.complete=false
        this.page=0
        this.primaryFade=0
        this.fade=[]

        this.listing={event:[]}
        this.posKey=this.layer.width/2+225*(this.player*2-this.battle.players+1)
    }
    initial(){
        for(let a=0,la=types.event.length;a<la;a++){
            if(types.event[a].list==0){
                this.listing.event.push(a)
            }
        }
    }
    pickEvent(){
        let index=floor(random(0,this.listing.event.length))
        this.event=this.listing.event[index]
        this.listing.event.splice(index,1)
    }
    setup(){
        this.complete=false
        this.id=types.event[this.event].id
        this.name=types.event[this.event].name
        this.pages=types.event[this.event].pages
        this.page=0
        this.primaryFade=1
        for(let a=0,la=this.pages.length;a<la;a++){
            this.fade.push(0)
        }
    }
    display(){
        if(this.battle.players>1){
            displayPlayerSymbol(this.layer,40+this.player*(this.layer.width-80),60,this.battle.player[this.player],0,1,1)
        }
        this.layer.fill(200,this.primaryFade*0.5)
        this.layer.noStroke()
        if(this.battle.relicManager.hasRelic(103,this.player)){
            this.layer.rect(this.posKey,35,120,40,10)
        }
        this.layer.rect(this.posKey,300,360,480,10)
        this.layer.fill(0,this.primaryFade)
        if(this.battle.relicManager.hasRelic(103,this.player)){
            this.layer.textSize(20)
            this.layer.text('Skip',this.posKey,35)
        }
        this.layer.textSize(30)
        this.layer.text(this.name,this.posKey,100)
        for(let a=0,la=this.pages.length;a<la;a++){
            this.layer.fill(0,this.fade[a]*this.primaryFade)
            this.layer.textSize(10)
            this.layer.text(this.pages[a].desc
                .replace('|0|',types.combatant[this.battle.player[this.player]].identifier[0])
                .replace('|1|',types.combatant[this.battle.player[this.player]].identifier[1])
                ,this.posKey,200)
            this.layer.textSize(12)
            for(let b=0,lb=this.pages[a].option.length;b<lb;b++){
                this.layer.text(this.pages[a].option[b],this.posKey,300+b*50)
            }
            this.layer.textSize(8)
            for(let b=0,lb=this.pages[a].optionDesc.length;b<lb;b++){
                this.layer.text(this.pages[a].optionDesc[b],this.posKey,310+b*50)
            }
            this.layer.noFill()
            this.layer.stroke(0,this.fade[a]*this.primaryFade)
            this.layer.strokeWeight(1)
            for(let b=0,lb=this.pages[a].option.length;b<lb;b++){
                this.layer.rect(this.posKey,300+b*50,180,30,5)
            }
            this.layer.noStroke()
        }
    }
    harm(combatant,amount){
        if(!this.battle.relicManager.hasRelic(259,this.player)){
            combatant.safeDamage(amount)
        }
    }
    harmMax(combatant,amount){
        if(!this.battle.relicManager.hasRelic(259,this.player)){
            combatant.loseMaxHP(amount)
        }
    }
    callInput(type,a){
        switch(type){
            case 0:
                let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
                let tempPage=0
                switch(this.id){
                    case 1:
                        if(this.page==0&&a==0){
                            this.harm(userCombatant,4)
                        }else if(this.page==1&&a==0){
                            this.battle.overlayManager.overlays[3][this.player].active=true
                            this.battle.overlayManager.overlays[3][this.player].activate([0,1,0])
                        }
                    break
                    case 2:
                        if(this.page==1&&a==0){
                            this.battle.addCurrency(300,this.player)
                            this.harm(userCombatant,20)
                        }else if(this.page==2&&a==0){
                            userCombatant.heal(userCombatant.base.life)
                        }
                    break
                    case 3:
                        if(this.page==1&&a==0){
                            this.battle.relicManager.loseRandom(this.player)
                        }else if(this.page==2&&a==0){
                            for(let a=0;a<2;a++){
                                let index=floor(random(0,this.battle.cardManagers[this.player].listing.card[0][3].length))
                                this.battle.cardManagers[this.player].hand.add(this.battle.cardManagers[this.player].listing.card[0][3][index],0,0)
                            }
                        }else if(this.page==3&&a==0){
                            this.harm(userCombatant,13)
                        }
                    break
                    case 4:
                        if(this.page==0&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Mixture A',types.card),0,0)
                        }else if(this.page==0&&a==1){
                            this.battle.cardManagers[this.player].deck.add(findName('Mixture B',types.card),0,0)
                        }else if(this.page==0&&a==2){
                            this.battle.cardManagers[this.player].deck.add(findName('Mixture C',types.card),0,0)
                        }
                    break
                    case 5:
                        if(this.page==0&&a<3&&floor(random(0,3))==0){
                            tempPage++
                        }else if(this.page==1&&a==0){
                            this.battle.addCurrency(200,this.player)
                        }else if(this.page==2&&a==0){
                            this.harm(userCombatant,30)
                        }
                    break
                    case 6:
                        if((this.page==0||this.page==1)&&a==0&&floor(random(0,3))==0){
                            tempPage=3-this.pages[this.page].link[a]
                        }else if((this.page==0||this.page==1)&&a==1){
                            transition.scene='battle'
                            this.battle.setupBattle(types.encounter[findName('Bar Fight',types.encounter)])
                        }else if(this.page==3&&a==0){
                            this.harm(userCombatant,6)
                            transition.scene='battle'
                            this.battle.setupBattle(types.encounter[findName('Bar Fight',types.encounter)])
                        }
                    break
                    case 7:
                        if(this.page==1&&a==0){
                            this.battle.overlayManager.overlays[5][this.player].active=true
                            this.battle.overlayManager.overlays[5][this.player].activate()
                        }else if(this.page==2&&a==0){
                            this.battle.relicManager.addRelic(findInternal('Upgrade Random Turn',types.relic),this.player)
                            this.battle.cardManagers[this.player].deck.add(findName('Pain',types.card),0,game.playerNumber+2)
                        }
                    break
                    case 8:
                        if(this.page==0&&a==0){
                            transition.scene='battle'
                            this.battle.setupBattle(types.encounter[findName('Monkey Attack',types.encounter)])
                        }else if(this.page==1&&a==0){
                            this.battle.relicManager.loseRandomRelic(this.player)
                        }
                    break
                    case 9:
                        if(this.page==0&&a==0){
                            transition.scene='battle'
                            this.battle.setupBattle(types.encounter[findName('Bus Surprise',types.encounter)])
                        }else if(this.page==0&&a==2&&floor(random(0,3))==0){
                            tempPage=1
                        }else if(this.page==1&&a==0){
                            this.harm(userCombatant,7)
                        }else if(this.page==3&&a==0){
                            this.harm(userCombatant,5)
                            transition.scene='battle'
                            this.battle.setupBattle(types.encounter[findName('Bus Surprise',types.encounter)])
                        }
                    break
                    case 10:
                        if(this.page==1&&a==0){
                            transition.scene='battle'
                            this.battle.setupBattle(types.encounter[findName('The Alley',types.encounter)])
                        }
                    break
                    case 11:
                        if(this.page==0&&a==0){
                            this.battle.overlayManager.overlays[12][this.player].active=true
                            this.battle.overlayManager.overlays[12][this.player].activate()
                        }
                    break
                    case 12:
                        if(this.page<3&&a==0){
                            this.harm(userCombatant,5)
                            if(floor(random(0,4))==0){
                                tempPage=3-this.pages[this.page].link[a]
                            }
                        }else if(this.page==3&&a==0){
                            this.battle.relicManager.addRandomRelic(this.player)
                        }
                    break
                    case 13:
                        if(this.page==1&&a==0){
                            this.battle.cardManagers[this.player].deck.removeAllCurse()
                        }
                    break
                    case 14:
                        if(this.page==1&&a==0){
                            this.battle.addCurrency(75,this.player)
                        }else if(this.page==2&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Regret',types.card),0,game.playerNumber+2)
                            this.battle.addCurrency(175,this.player)
                        }
                    break
                    case 15:
                        if(this.page==1&&a==0){
                            this.battle.overlayManager.overlays[5][this.player].active=true
                            this.battle.overlayManager.overlays[5][this.player].activate()
                        }
                    break
                    case 16:
                        if(this.page==1&&a==0){
                            this.battle.overlayManager.overlays[9][this.player].active=true
                            this.battle.overlayManager.overlays[9][this.player].activate()
                        }
                    break
                    case 17:
                        if(this.page==1&&a==0){
                            this.battle.overlayManager.overlays[6][this.player].active=true
                            this.battle.overlayManager.overlays[6][this.player].activate()
                        }
                    break
                    case 18:
                        if(this.page==1&&a==0){
                            userCombatant.gainMaxHP(5)
                        }else if(this.page==2&&a==0){
                            this.battle.relicManager.addRandomRelic(this.player)
                            this.battle.relicManager.addRandomRelic(this.player)
                            this.battle.cardManagers[this.player].deck.add(findName('Regret',types.card),0,game.playerNumber+2)
                        }
                    break
                    case 19:
                        if(this.page==0&&a==0){
                            this.harm(userCombatant,12)
                        }else if(this.page==1&&a==0){
                            this.battle.cardManagers[this.player].randomEffect(0,2,[0])
                            this.battle.cardManagers[this.player].randomEffect(0,2,[0])
                        }
                    break
                    case 20:
                        if(this.page==0&&a==0){
                            this.battle.loseCurrency(35,this.player)
                        }else if(this.page==0&&a==1){
                            this.battle.loseCurrency(50,this.player)
                        }else if(this.page==1&&a==0){
                            userCombatant.heal(15)
                        }else if(this.page==2&&a==0){
                            this.battle.overlayManager.overlays[6][this.player].active=true
                            this.battle.overlayManager.overlays[6][this.player].activate()
                        }
                    break
                    case 21:
                        if(this.page==0&&a==0){
                            this.battle.addCurrency(175,this.player)
                        }else if(this.page==1&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Doubt',types.card),0,game.playerNumber+2)
                        }
                    break
                    case 22:
                        if(this.page==1&&a==0){
                            this.battle.overlayManager.overlays[6][this.player].active=true
                            this.battle.overlayManager.overlays[6][this.player].activate()
                        }else if(this.page==2&&a==0){
                            this.battle.cardManagers[this.player].allEffect(0,6)
                        }
                    break
                    case 23:
                        if(this.page==0&&a==0){
                            this.harmMax(userCombatant,userCombatant.base.life/2)
                        }else if(this.page==1&&a==0){
                            for(let b=0,lb=5;b<lb;b++){
                                this.battle.cardManagers[this.player].deck.add(findName('Apparition',types.card),0,0)
                            }
                        }
                    break
                    case 24:
                        if(this.page==0&&a<2){
                            if(floor(random(0,2))==0){
                                tempPage++
                            }
                            this.battle.loseCurrency(50,this.player)
                        }else if(this.page==1&&a==0){
                            this.battle.addCurrency(100,this.player)
                        }
                    break
                    case 25:
                        if(this.page==1&&a==0){
                            this.battle.overlayManager.overlays[3][this.player].active=true
                            this.battle.overlayManager.overlays[3][this.player].activate([0,floor(random(1,3)),0])
                        }else if(this.page==2&&a==0){
                            userCombatant.heal(25)
                        }
                    break
                    case 26:
                        if(this.page==0&&a==0){
                            this.harm(userCombatant,18)
                        }else if(this.page==1&&a==0){
                            userCombatant.gainMaxHP(5)
                        }else if(this.page==2&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Decay',types.card),0,game.playerNumber+2)
                        }
                    break
                    case 27:
                        if(this.page==0&&a==0){
                            this.harm(userCombatant,2)
                        }else if(this.page==2&&a==0){
                            this.harm(userCombatant,4)
                        }else if(this.page==3&&a==0){
                            this.harm(userCombatant,8)
                        }else if(this.page==4&&a==0){
                            this.harm(userCombatant,36)
                        }else if(this.page==5&&a==0){
                            this.battle.relicManager.addRelic(findInternal('Duplicate Random Turn',types.relic),this.player)
                        }
                    break
                    case 28:
                        if(this.page==0&&a==0){
                            transition.scene='battle'
                            this.battle.setupBattle(types.encounter[findName('Slaver',types.encounter)])
                        }else if(this.page==1&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Guilt',types.card),0,game.playerNumber+2)
                        }
                    break
                    case 29:
                        if(this.page==0&&a==0){
                            this.battle.relicManager.addRandomRelic(this.player)
                            if(floor(random(0,2))==0){
                                tempPage++
                            }
                        }else if(this.page==1&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Writhe',types.card),0,game.playerNumber+2)
                        }
                    break
                    case 30:
                        if(this.page==0&&a<2){
                            if(userCombatant.life<=0){
                                tempPage=-this.pages[this.page].link[a]
                            }else{
                                userCombatant.life-=8
                            }
                        }else if(this.page==0&&a==2){
                            if(userCombatant.life<=0){
                                tempPage=-this.pages[this.page].link[a]
                            }else{
                                userCombatant.life-=24
                            }
                        }else if(this.page==1&&a==0){
                            this.battle.addCurrency(45,this.player)
                        }else if(this.page==2&&a==0){
                            this.battle.overlayManager.overlays[3][this.player].active=true
                            this.battle.overlayManager.overlays[3][this.player].activate([0,1,1])
                        }else if(this.page==3&&a==0){
                            this.battle.relicManager.addRandomRelic(this.player)
                        }
                    break
                    case 31:
                        if(this.page==0&&a==0){
                            this.battle.loseCurrency(50,this.player)
                        }else if(this.page==0&&a==1&&floor(random(0,2))==0){
                            tempPage++
                        }else if((this.page==1||this.page==2)&&a==0){
                            this.battle.relicManager.addRandomRelic(this.player)
                        }else if(this.page==3&&a==0){
                            this.battle.relicManager.addRandomRelic(this.player)
                            this.battle.cardManagers[this.player].deck.add(findName('Shame',types.card),0,game.playerNumber+2)
                        }
                    break
                    case 32:
                        if(this.page==0&&a==0){
                            this.harmMax(userCombatant,userCombatant.base.life/4)
                            this.battle.cardManagers[this.player].deck.removeAllName('Strike')
                            this.battle.cardManagers[this.player].deck.removeAllName('Strike-')
                        }else if(this.page==1&&a==0){
                            for(let b=0,lb=5;b<lb;b++){
                                this.battle.cardManagers[this.player].deck.add(findName('Bite',types.card),0,0)
                            }
                        }
                    break
                    case 33:
                        if(this.page==0&&a==0){
                            this.battle.cardManagers[this.player].allEffect(0,4,[])
                        }else if(this.page==0&&a==1){
                            this.battle.addCurrency(999,this.player)
                        }else if(this.page==0&&a==2){
                            userCombatant.gainMaxHP(userCombatant.base.life/2)
                        }else if(this.page==1&&a==0){
                            this.battle.relicManager.addRelic(findInternal('No Heal',types.relic),this.player)
                        }else if(this.page==2&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Normality',types.card),0,game.playerNumber+2)
                            this.battle.cardManagers[this.player].deck.add(findName('Normality',types.card),0,game.playerNumber+2)
                        }else if(this.page==3&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Doubt',types.card),0,game.playerNumber+2)
                        }
                    break
                    case 34:
                        if(this.page==1&&a==0){
                            this.battle.overlayManager.overlays[3][this.player].active=true
                            this.battle.overlayManager.overlays[3][this.player].activate([0,1,1])
                        }else if(this.page==2&&a==0){
                            this.battle.overlayManager.overlays[3][this.player].active=true
                            this.battle.overlayManager.overlays[3][this.player].activate([0,2,1])
                        }
                    break
                    case 35:
                        if(this.page==1&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Madness',types.card),0,0)
                            this.battle.cardManagers[this.player].deck.add(findName('Madness',types.card),0,0)
                            this.harmMax(userCombatant,10)
                        }else if(this.page==2&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Writhe',types.card),0,game.playerNumber+2)
                        }else if(this.page==3&&a==0){
                            this.harmMax(userCombatant,5)
                        }
                    break
                    case 36:
                        if(this.page==1&&a==0){
                            this.battle.cardManagers[this.player].randomEffect(0,6,[])
                        }else if(this.page==2&&a==0){
                            this.harm(userCombatant,6)
                        }
                    break
                    case 37:
                        if(this.page==0&&a==0){
                            this.battle.addCurrency(50,this.player)
                        }else if(this.page==0&&a==1){
                            this.battle.loseCurrency(25,this.player)
                        }else if(this.page==1&&a==0){
                            this.harm(userCombatant,11)
                        }
                    break
                    case 38:
                        if(this.page==1&&a==0){
                            transition.scene='battle'
                            this.battle.setupBattle(types.encounter[findName('Fungal Ducks',types.encounter)])
                        }else if(this.page==2&&a==0){
                            userCombatant.heal(25)
                            this.battle.cardManagers[this.player].deck.add(findName('Parasite',types.card),0,game.playerNumber+2)
                        }
                    break
                    case 39:
                        if(this.page==0&&a==0){
                            this.battle.relicManager.addRandomRelic(this.player)
                            this.battle.relicManager.addRandomRelic(this.player)
                            this.battle.relicManager.addRandomRelic(this.player)
                        }else if(this.page==1&&a==0){
                            transition.scene='battle'
                            this.battle.setupBattle(types.encounter[findName('Automata',types.encounter)])
                        }
                    break
                    case 40:
                        if(this.page==0&&a==1&&this.battle.currency.money[this.player]>0){
                            this.battle.loseCurrency(this.battle.currency.money[this.player],this.player)
                        }else if(this.page==1&&a==0){
                            transition.scene='battle'
                            this.battle.setupBattle(types.encounter[findName('Robbery',types.encounter)])
                        }
                    break
                    case 41:
                        if(this.page==1&&a==0){
                            this.battle.overlayManager.overlays[5][this.player].active=true
                            this.battle.overlayManager.overlays[5][this.player].activate()
                        }else if(this.page==2&&a==0){
                            this.battle.overlayManager.overlays[3][this.player].active=true
                            this.battle.overlayManager.overlays[3][this.player].activate([0,1,0])
                        }else if(this.page==3&&a==0){
                            userCombatant.heal(10)
                        }
                    break
                    case 42:
                        if(this.page==0&&a==0&&floor(random(0,2))==0){
                            tempPage++
                        }else if(this.page==1&&a==0){
                            this.battle.relicManager.addRandomRelic(this.player)
                            this.battle.addCurrency(45,this.player)
                        }else if(this.page==2&&a==0){
                            this.harm(userCombatant,25)
                        }
                    break
                    case 43:
                        if(this.page==0&&a==0){
                            transition.scene='shop'
                            this.battle.purchaseManager.setup(1)
                        }
                    break
                    case 44:
                        if(this.page==0&&a==0){
                            this.battle.overlayManager.overlays[17][this.player].active=true
                            this.battle.overlayManager.overlays[17][this.player].activate()
                        }else if(this.page==4&&a==0){
                            userCombatant.heal(5)
                        }else if(this.page==5&&a==0){
                            userCombatant.heal(userCombatant.base.life)
                        }else if(this.page==6&&a==0){
                            userCombatant.heal(userCombatant.base.life)
                            userCombatant.gainMaxHP(10)
                        }
                    break
                    case 45:
                        if(this.page==0&&a==0){
                            this.battle.loseCurrency(40,this.player)
                        }else if(this.page==0&&a==1){
                            this.battle.loseCurrency(60,this.player)
                        }else if(this.page==1&&a==0){
                            this.battle.cardManagers[this.player].randomEffect(0,2,[0])
                            this.battle.cardManagers[this.player].randomEffect(0,2,[0])
                        }else if(this.page==2&&a==0){
                            this.battle.overlayManager.overlays[6][this.player].active=true
                            this.battle.overlayManager.overlays[6][this.player].activate()
                        }else if(this.page==3&&a==0){
                            this.harm(userCombatant,1)
                        }
                    break
                    case 46:
                        if(this.page==0&&a==0){
                            this.battle.relicManager.loseRandomRelic(this.player)
                            this.battle.relicManager.addRelic(findInternal('Rarer Rewards',types.relic),this.player)
                        }
                    break
                    case 47:
                        if(this.page==1&&a==0){
                            this.battle.itemManager.addItem(findName('Starflame Prototype',types.item),this.player)
                        }else if(this.page==2&&a==0){
                            userCombatant.heal(6)
                        }
                    break
                    case 48:
                        if(this.page==0&&a==0){
                            transition.scene='battle'
                            this.battle.setupBattle(types.encounter[findName('Fight Club',types.encounter)])
                        }else if(this.page==0&&a==1&&floor(random(0,2))==0){
                            tempPage++
                        }else if(this.page==1&&a==0){
                            this.battle.addCurrency(125,this.player)
                        }else if(this.page==2&&a==0){
                            this.battle.loseCurrency(125,this.player)
                        }
                    break
                    case 49:
                        if(this.page==0&&a==0){
                            this.battle.relicManager.addRelic(findInternal('More Currency',types.relic),this.player)
                        }else if(this.page==3&&a==0){
                            this.harm(userCombatant,16)
                        }else if(this.page==4&&a==0){
                            this.harmMax(userCombatant,4)
                        }else if(this.page==5&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Injury',types.card),0,game.playerNumber+2)
                        }
                    break
                    case 50:
                        if(this.page==1&&a==0){
                            this.battle.itemManager.addItem(findName('Cola',types.item),this.player)
                        }
                    break
                    case 51:
                        if(this.page==0&&a==0){
                            this.battle.loseCurrency(100,this.player)
                        }else if(this.page==1&&a==0){
                            this.battle.relicManager.addRelic(findInternal('Currency Per Room',types.relic),this.player)
                        }
                    break
                    case 52:
                        if(this.page==0&&a==0&&floor(random(0,2))==0){
                            tempPage++
                        }else if(this.page==2&&a==0){
                            this.harm(userCombatant,6)
                        }else if(this.page==3&&a==0){
                            this.harm(userCombatant,3)
                            if(floor(random(0,4))==0){
                                tempPage=2
                            }
                        }else if(this.page==4&&a==0){
                            this.harm(userCombatant,6)
                        }else if(this.page==6&&a==0){
                            this.battle.relicManager.addRandomRelic(this.player)
                        }
                    break
                    case 53:
                        if(this.page==0&&a==0&&floor(random(0,2))==0){
                            tempPage++
                        }else if(this.page==2&&a==0){
                            this.battle.overlayManager.overlays[3][this.player].active=true
                            this.battle.overlayManager.overlays[3][this.player].activate([0,1,0])
                        }else if(this.page==3&&a==0){
                            this.battle.cardManagers[this.player].addRandom(0,0,3)
                        }
                    break
                    case 54:
                        if(this.page==1&&a==0){
                            this.battle.relicManager.addRelic(findInternal('Random Fatigue Cost Decrease',types.relic),this.player)
                        }else if(this.page==2&&a==0){
                            this.battle.addCurrency(55,this.player)
                        }
                    break
                    case 55:
                        if(this.page==1&&a==0){
                            this.battle.cardManagers[this.player].addRandom(0,0,3)
                        }else if(this.page==2&&a==0){
                            this.harm(userCombatant,99)
                        }else if(this.page==3&&a==0){
                            this.harm(userCombatant,9)
                        }
                    break
                    case 56:
                        if(this.page>=0&&this.page<=1&&a==1){
                            transition.scene='battle'
                            this.battle.setupBattle(types.encounter[findName('Monkey Gang',types.encounter)])
                        }else if(this.page==1&&a==0){
                            this.battle.loseCurrency(40,this.player)
                        }
                    break
                    case 57:
                        if(this.page==0&&a==0){
                            this.battle.overlayManager.overlays[6][this.player].active=true
                            this.battle.overlayManager.overlays[6][this.player].activate()
                        }else if(this.page==0&&a==1){
                            this.battle.cardManagers[this.player].deck.cards=[]
                            this.battle.cardManagers[this.player].deck.add(findName('Ouroboros',types.card),0,0)
                            this.battle.cardManagers[this.player].deck.add(findName('Ourostep',types.card),0,0)
                        }
                    break
                    case 58:
                        if(this.page==0&&a==0){
                            this.battle.overlayManager.overlays[12][this.player].active=true
                            this.battle.overlayManager.overlays[12][this.player].activate()
                        }else if(this.page==0&&a==1){
                            this.battle.cardManagers[this.player].allEffect(0,7)
                        }
                    break
                    case 59:
                        if(this.page==1&&a==0){
                            for(let a=0,la=5;a<la;a++){
                                this.battle.cardManagers[this.player].addRandom(0,0,3)
                            }
                        }else if(this.page==2&&a==0){
                            this.battle.relicManager.addRandomRelic(this.player)
                        }
                    break
                    case 60:
                        if(this.page==1&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Glock',types.card),0,0)
                        }else if(this.page==2&&a==0){
                            userCombatant.heal(12)
                        }
                    break
                    case 61:
                        this.battle.overlayManager.overlays[3][this.player].active=true
                        this.battle.overlayManager.overlays[3][this.player].activate([0,3,6])
                    break
                }
                this.page=this.pages[this.page].link[a]+tempPage
                if(this.page==-1){
                    this.complete=true
                }else if(this.page==-2){
                    transition.trigger=true
                }
            break
        }
    }
    update(){
        for(let a=0,la=this.fade.length;a<la;a++){
            this.fade[a]=smoothAnim(this.fade[a],this.page==a,0,1,5)
        }
        this.primaryFade=smoothAnim(this.primaryFade,!this.complete,0,1,5)
    }
    onClick(){
        if(this.page>=0){
            for(let a=0,la=this.pages[this.page].option.length;a<la;a++){
                if(pointInsideBox({position:inputs.rel},{position:{x:this.posKey,y:300+a*50},width:180,height:30})){
                    this.callInput(0,a)
                }
            }
            if(this.battle.relicManager.hasRelic(103,this.player)&&pointInsideBox({position:inputs.rel},{position:{x:this.posKey,y:35},width:120,height:40})){
                this.complete=true
            }
        }
    }
    onKey(key,code){
        if(this.page>=0){
            for(let a=0,la=this.pages[this.page].option.length;a<la;a++){
                if(int(key)-1==a){
                    this.callInput(0,a)
                }
            }
            if(this.battle.relicManager.hasRelic(103,this.player)&&code==ENTER){
                this.complete=true
            }
        }
    }
}