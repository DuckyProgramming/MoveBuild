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

        this.listing={event:[],complete:[]}
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
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        let sublist=[]
        let effectiveEnergy=variants.mtg?[0,0,0,0,0,0,0]:this.battle.energy.base[this.player]
        if(variants.mtg){
            for(let a=0,la=this.battle.energy.base[this.player].length;a<la;a++){
                effectiveEnergy[this.battle.energy.base[this.player][a]]++
            }
        }
        for(let a=0,la=this.listing.event.length;a<la;a++){if(
                !(this.listing.event[a]==1&&userCombatant.life<5)&&
                !(this.listing.event[a]==2&&(userCombatant.life<21||userCombatant.life>=userCombatant.base.life))&&
                !(this.listing.event[a]==3&&(userCombatant.life<14||this.battle.relicManager.total[this.player]<1))&&
                !(this.listing.event[a]==5&&userCombatant.life<31)&&
                !(this.listing.event[a]==6&&(userCombatant.life<7||this.battle.nodeManager.world!=1))&&
                !(this.listing.event[a]==8&&(this.battle.relicManager.total[this.player]<1||this.battle.nodeManager.world!=0))&&
                !(this.listing.event[a]==9&&(userCombatant.life<6||this.battle.nodeManager.world!=1))&&
                !(this.listing.event[a]==10&&this.battle.nodeManager.world!=1)&&
                !(this.listing.event[a]==12&&userCombatant.life<16)&&
                !(this.listing.event[a]==13&&this.battle.cardManagers[this.player].deck.numberAbstract(14,[[6],7])<=0)&&
                !(this.listing.event[a]==19&&userCombatant.life<13)&&
                !(this.listing.event[a]==20&&this.battle.currency.money[this.player]<50)&&
                !(this.listing.event[a]==22&&this.battle.cardManagers[this.player].deck.numberAbstract(8,[])<=0)&&
                !(this.listing.event[a]==24&&this.battle.currency.money[this.player]<50)&&
                !(this.listing.event[a]==25&&userCombatant.life>=userCombatant.base.life-25)&&
                !(this.listing.event[a]==26&&userCombatant.life<19)&&
                !(this.listing.event[a]==27&&userCombatant.life<51)&&
                !(this.listing.event[a]==28&&this.battle.nodeManager.world!=0)&&
                !(this.listing.event[a]==30&&userCombatant.life<25)&&
                !(this.listing.event[a]==31&&this.battle.currency.money[this.player]<50)&&
                !(this.listing.event[a]==32&&this.battle.cardManagers[this.player].deck.numberAbstract(9,[[1]])<4)&&
                !(this.listing.event[a]==33&&this.battle.nodeManager.world!=2)&&
                !(this.listing.event[a]==35&&userCombatant.base.life<11)&&
                !(this.listing.event[a]==36&&userCombatant.life<7)&&
                !(this.listing.event[a]==37&&(userCombatant.life<12||this.battle.currency.money[this.player]<25))&&
                !(this.listing.event[a]==38&&this.battle.nodeManager.world!=0)&&
                !(this.listing.event[a]==39&&this.battle.nodeManager.world!=0)&&
                !(this.listing.event[a]==40&&(this.battle.nodeManager.world!=0||this.battle.currency.money[this.player]<100))&&
                !(this.listing.event[a]==41&&userCombatant.life>=userCombatant.base.life-10)&&
                !(this.listing.event[a]==42&&userCombatant.life<26)&&
                !(this.listing.event[a]==43&&this.battle.currency.money[this.player]<250)&&
                !(this.listing.event[a]==45&&this.battle.currency.money[this.player]<60)&&
                !(this.listing.event[a]==46&&this.battle.relicManager.total[this.player]<1)&&
                !(this.listing.event[a]==47&&(userCombatant.life>=userCombatant.base.life-6||!this.battle.itemManager.hasEmpty(this.player)))&&
                !(this.listing.event[a]==48&&(this.battle.nodeManager.world!=1||this.battle.currency.money[this.player]<125))&&
                !(this.listing.event[a]==49&&(userCombatant.life<17||userCombatant.base.life<5))&&
                !(this.listing.event[a]==50&&!this.battle.itemManager.hasEmpty(this.player))&&
                !(this.listing.event[a]==51&&this.battle.currency.money[this.player]<100)&&
                !(this.listing.event[a]==52&&userCombatant.life<13)&&
                !(this.listing.event[a]==55&&userCombatant.life<10)&&
                !(this.listing.event[a]==56&&this.battle.currency.money[this.player]<40)&&
                !(this.listing.event[a]==60&&userCombatant.life>=userCombatant.base.life-12)&&
                !(this.listing.event[a]==63&&(this.listing.complete.length<=3||this.battle.nodeManager.world==0))&&
                !(this.listing.event[a]==66&&this.battle.currency.money[this.player]<50)&&
                !(this.listing.event[a]==68&&this.battle.cardManagers[this.player].deck.numberAbstract(8,[])<=0)&&
                !(this.listing.event[a]==69&&userCombatant.life<7)&&
                !(this.listing.event[a]==73&&this.battle.nodeManager.world==0)&&
                !(this.listing.event[a]==74&&userCombatant.life<9)&&
                !(this.listing.event[a]==75&&(userCombatant.life>=userCombatant.base.life-20||this.battle.currency.money[this.player]<35))&&
                !(this.listing.event[a]==77&&this.battle.currency.money[this.player]<50)&&
                !(this.listing.event[a]==78&&(userCombatant.life<21||this.battle.cardManagers[this.player].deck.numberAbstract(9,[[2]])<=4))&&
                !(this.listing.event[a]==79&&userCombatant.life<27)&&
                !(this.listing.event[a]==81&&(this.battle.cardManagers[this.player].deck.numberAbstract(4,[[1]])<=4||this.battle.cardManagers[this.player].deck.numberAbstract(4,[[2]])<=4))&&
                !(this.listing.event[a]==84&&(userCombatant.base.life<11||this.battle.currency.money[this.player]<25))&&
                !(this.listing.event[a]==85&&this.battle.currency.money[this.player]<75)&&
                !(this.listing.event[a]==86&&this.battle.currency.money[this.player]<150)&&
                !(this.listing.event[a]==87&&userCombatant.life<16)&&
                !(this.listing.event[a]==88&&this.battle.relicManager.total[this.player]<1)&&
                !(this.listing.event[a]==89&&userCombatant.life<31)&&
                !(this.listing.event[a]==90&&this.battle.currency.money[this.player]<125)&&
                !(this.listing.event[a]==92&&this.battle.cardManagers[this.player].deck.numberAbstract(14,[[6],7])<=0)&&
                !(this.listing.event[a]==93&&this.battle.currency.money[this.player]<60)&&
                !(this.listing.event[a]==94&&(this.battle.currency.money[this.player]<200||this.battle.nodeManager.world!=2))&&
                !(this.listing.event[a]==97&&this.battle.currency.money[this.player]<65)&&
                !(this.listing.event[a]==99&&this.battle.currency.money[this.player]<40)&&
                !(this.listing.event[a]==100&&(userCombatant.life<16||this.battle.currency.money[this.player]<40))&&
                !(this.listing.event[a]==103&&userCombatant.life>=userCombatant.base.life-7)&&
                !(this.listing.event[a]==104&&this.battle.nodeManager.world!=2)&&
                !(this.listing.event[a]==105&&this.battle.nodeManager.world!=0)&&
                !(this.listing.event[a]==106&&this.battle.currency.money[this.player]<25)&&
                !(this.listing.event[a]==107&&this.battle.currency.money[this.player]<50)&&
                !(this.listing.event[a]==111&&userCombatant.life<28)&&
                !(this.listing.event[a]==112&&(this.battle.currency.money[this.player]<100||!this.battle.itemManager.hasEmpty(this.player)))&&
                !(this.listing.event[a]==113&&this.battle.currency.money[this.player]<125)&&
                !(this.listing.event[a]==114&&this.battle.currency.money[this.player]<375)&&
                !(this.listing.event[a]==115&&userCombatant.life<16)&&
                !(this.listing.event[a]==116&&this.battle.nodeManager.world!=2)&&
                !(this.listing.event[a]==117&&this.battle.nodeManager.world!=1)&&
                !(this.listing.event[a]==118&&this.battle.nodeManager.world!=0)&&
                !(this.listing.event[a]==119&&this.battle.nodeManager.world!=0)&&
                !(this.listing.event[a]==120&&userCombatant.life<19)&&
                !(this.listing.event[a]==121&&this.battle.cardManagers[this.player].deck.numberAbstract(11,[])<=0)&&
                !(this.listing.event[a]==122&&this.battle.currency.money[this.player]<50)&&
                !(this.listing.event[a]==123&&userCombatant.life<41)&&
                !(this.listing.event[a]==127&&this.battle.currency.money[this.player]<200)&&
                !(this.listing.event[a]==128&&this.battle.currency.money[this.player]<20)&&
                !(this.listing.event[a]==129&&(userCombatant.life<9||userCombatant.life<13))&&
                !(this.listing.event[a]==130&&userCombatant.life<33)&&
                !(this.listing.event[a]==131&&userCombatant.life<28)&&
                !(this.listing.event[a]==132&&this.battle.currency.money[this.player]<100)&&
                !(this.listing.event[a]==134&&this.battle.nodeManager.world!=2)&&
                !(this.listing.event[a]==136&&userCombatant.life<6)&&
                !(variants.mtg&&(
                    (this.listing.event[a]==23&&effectiveEnergy[3]<2)||
                    (this.listing.event[a]==32&&effectiveEnergy[5]<2)||
                    (this.listing.event[a]==35&&effectiveEnergy[0]<1)||
                    (this.listing.event[a]==57&&effectiveEnergy[2]<2)||
                    (this.listing.event[a]==78&&effectiveEnergy[3]<2)||
                    (this.listing.event[a]==99&&effectiveEnergy[4]<1)||
                    (this.listing.event[a]==102&&effectiveEnergy[3]<1)||
                    (this.listing.event[a]==103&&(effectiveEnergy[1]<1||effectiveEnergy[4]<1))||
                    (this.listing.event[a]==106&&(effectiveEnergy[1]<1||effectiveEnergy[4]<1||effectiveEnergy[5]<1))||
                    (this.listing.event[a]==131&&(effectiveEnergy[2]<1||effectiveEnergy[4]<1))||
                    (this.listing.event[a]==136&&effectiveEnergy[3]<1)

                ))

            ){
                sublist.push(this.listing.event[a])
            }
        }
        let index=floor(random(0,sublist.length))
        this.event=sublist[index]
        this.listing.complete.push(sublist[index])
        this.listing.event.splice(this.listing.event.indexOf(sublist[index]),1)
    }
    setup(){
        this.complete=false
        this.id=types.event[this.event].id
        this.name=types.event[this.event].name
        this.pages=[]
        for(let a=0,la=types.event[this.event].pages.length;a<la;a++){
            let base=types.event[this.event].pages[a]
            this.pages.push({desc:base.desc,option:copyArray(base.option),optionDesc:copyArray(base.optionDesc),link:copyArray(base.link)})
        }
        this.page=0
        this.primaryFade=1
        for(let a=0,la=this.pages.length;a<la;a++){
            this.fade.push(0)
        }
        if(this.firstEvent==''){
            this.firstEvent=this.name
        }
        switch(this.id){
            case 30:
                if(this.battle.relicManager.hasRelic(259,this.player)){
                    for(let a=0,la=this.pages[0].optionDesc.length;a<la;a++){
                        this.pages[0].optionDesc[a]+=' (Non-Bypassable)'
                    }
                }
            break
            case 63:
                let correct=floor(random(0,5))
                this.pages[0].option[correct]=types.event[this.listing.complete[0]].name
                this.pages[0].link[correct]=1
                let sublist=copyArray(this.listing.complete)
                let backlist=copyArray(this.listing.event)
                sublist.splice(0,1)
                if(sublist.includes(63)){
                    sublist.splice(sublist.indexOf(63),1)
                }
                for(let a=0,la=5;a<la;a++){
                    if(a!=correct){
                        if(sublist.length>0){
                            let index=floor(random(0,sublist.length))
                            this.pages[0].option[a]=types.event[sublist[index]].name
                            sublist.splice(index,1)
                        }else if(backlist.length>0){
                            let index=floor(random(0,backlist.length))
                            this.pages[0].option[a]=types.event[backlist[index]].name
                            backlist.splice(index,1)
                        }
                    }
                }
            break
            case 70:
                if(variants.mtg){
                    this.pages[0].optionDesc[0]='Replace a Base Mana With 2 Neutral Mana'
                    this.pages[1].optionDesc[0]=''
                }
            break
            case 85:
                let possible=[]
                for(let a=1,la=game.playerNumber+1;a<la;a++){
                    if(!this.battle.player.includes(a)){
                        possible.push(a)
                    }
                }
                this.selection=[]
                this.selected=[]
                for(let a=0,la=3;a<la;a++){
                    let index=floor(random(0,possible.length))
                    this.selection.push(possible[index])
                    this.pages[0].option[a]=types.combatant[possible[index]].name
                    this.pages[0].optionDesc[a]='Lose 25 Currency, Add a Card'
                    this.pages[0].link[a]=1
                    possible.splice(index,1)
                    this.selected.push(0)
                }
            break
            case 88:
                this.selection=this.battle.relicManager.getRandomRelic(this.player)
                this.pages[0].optionDesc[0]=`Lose Relic - ${types.relic[this.selection].name}`
                this.pages[0].optionDesc[1]=`Lose Relic - ${types.relic[this.selection].name}`
            break
            case 123:
                this.selection=[]
            break
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
        this.layer.textSize(this.name.length>=25?24:30)
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
                this.layer.text(b>0&&this.battle.relicManager.hasRelic(339,this.player)?'-':this.pages[a].option[b],this.posKey,300+b*50-(this.pages[a].optionDesc[b].length>0?2:0))
            }
            this.layer.textSize(8)
            for(let b=0,lb=this.pages[a].optionDesc.length;b<lb;b++){
                this.layer.text(b>0&&this.battle.relicManager.hasRelic(339,this.player)?'':this.pages[a].optionDesc[b],this.posKey,310+b*50)
            }
            this.layer.noFill()
            this.layer.stroke(0,this.fade[a]*this.primaryFade)
            this.layer.strokeWeight(1)
            for(let b=0,lb=this.pages[a].option.length;b<lb;b++){
                this.layer.rect(this.posKey,300+b*50,220,30,5)
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
                let cut=false
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
                            this.battle.cardManagers[this.player].randomEffect(0,21,[])
                            this.battle.cardManagers[this.player].randomEffect(0,21,[])
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
                            this.battle.cardManagers[this.player].deck.removeAbstract(6,[[6]])
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
                            this.battle.addCurrency(275,this.player)
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
                            this.harmMax(userCombatant,userCombatant.base.life/4)
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
                                userCombatant.loseHealth(8)
                            }
                        }else if(this.page==0&&a==2){
                            if(userCombatant.life<=0){
                                tempPage=-this.pages[this.page].link[a]
                            }else{
                                userCombatant.loseHealth(24)
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
                            this.battle.cardManagers[this.player].deck.removeAbstract(7,[[1]])
                        }else if(this.page==1&&a==0){
                            for(let b=0,lb=4;b<lb;b++){
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
                            userCombatant.gainMaxHP(20)
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
                            this.battle.cardManagers[this.player].randomEffect(0,21,[])
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
                            this.battle.relicManager.addRelic(findInternal('Currency Per Node',types.relic),this.player)
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
                            this.battle.cardManagers[this.player].addRandomAbstract(0,0,0,0,0,[],[3])
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
                            this.battle.cardManagers[this.player].addRandomAbstract(0,0,0,0,0,[],[3])
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
                        }else if(this.page==2&&a==0){
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
                            for(let a=0,la=2;a<la;a++){
                                this.battle.cardManagers[this.player].addRandomAbstract(0,0,0,0,0,[],[2])
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
                        if(this.page==0&&a==0){
                            this.battle.overlayManager.overlays[3][this.player].active=true
                            this.battle.overlayManager.overlays[3][this.player].activate([0,3,6])
                        }
                    break
                    case 62:
                        if(this.page==0&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Drunk',types.card),0,game.playerNumber+2)
                        }else if(this.page==1&&a==0){
                            this.battle.addCurrency(400,this.player)
                        }
                    break
                    case 63:
                        if(this.page==1&&a==0){
                            this.battle.relicManager.addRandomRelic(this.player)
                            this.battle.relicManager.addRandomRelic(this.player)
                        }
                    break
                    case 64:
                        if(this.page>=1&&this.page<=3&&a>=0&&a<=2){
                            this.battle.overlayManager.overlays[3][this.player].active=true
                            this.battle.overlayManager.overlays[3][this.player].activate([0,3,31,[1,2,-99][this.page-1],[1,2,11][a]])
                        }
                    break
                    case 65:
                        if(this.page==0&&a==0){
                            this.battle.overlayManager.overlays[88][this.player].active=true
                            this.battle.overlayManager.overlays[88][this.player].activate()
                            this.battle.cardManagers[this.player].deck.add(findName('Bozo',types.card),0,game.playerNumber+2)
                        }else if(this.page==0&&a==1){
                            this.battle.overlayManager.overlays[52][this.player].active=true
                            this.battle.overlayManager.overlays[52][this.player].activate()
                            this.battle.cardManagers[this.player].deck.add(findName('Backfire',types.card),0,game.playerNumber+2)
                        }
                    break
                    case 66:
                        if(this.page==0&&a==0){
                            this.battle.loseCurrency(50,this.player)
                        }else if(this.page==1&&a==0){
                            this.battle.nodeManager.harmBoss+=0.4
                        }
                    break
                    case 67:
                        if(this.page==0&&a==0){
                            this.battle.loseCurrency(40,this.player)
                        }else if(this.page==1&&a==0){
                            this.battle.nodeManager.freeMove+=2
                        }
                    break
                    case 68:
                        if(this.page==0&&a==0){
                            this.battle.overlayManager.overlays[89][this.player].active=true
                            this.battle.overlayManager.overlays[89][this.player].activate()
                        }else if(this.page==0&&a==1){
                            this.battle.cardManagers[this.player].randomEffect(0,54)
                        }else if(this.page==0&&a==2){
                            this.battle.overlayManager.overlays[90][this.player].active=true
                            this.battle.overlayManager.overlays[90][this.player].activate()
                        }
                    break
                    case 69:
                        if(this.page==0&&a==1){
                            this.harm(userCombatant,6)
                        }else if(this.page==1&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('EMP\nGun',types.card),0,0)
                        }else if(this.page==2&&a==0){
                            for(let a=0,la=3;a<la;a++){
                                this.battle.cardManagers[this.player].addRandomAbstract(0,0,0,1,0,[],[0,0])
                            }
                        }
                    break
                    case 70:
                        if(this.page==0&&a==0){
                            this.battle.loseEnergyBase(this.player)
                        }else if(this.page==1&&a==0&&!variants.mtg){
                            this.battle.relicManager.addRelic(findInternal('2 Cost Down Per Turn',types.relic),this.player)
                        }
                    break
                    case 71:
                        if(this.page==0&&a==0){
                            this.battle.nodeManager.enterNode(0,10,true)
                        }else if(this.page==0&&a==1){
                            this.battle.nodeManager.enterNode(1,10,true)
                        }else if(this.page==0&&a==2){
                            this.pickEvent()
                            this.setup()
                            cut=true
                        }
                    break
                    case 72:
                        if(this.page==0&&a==0){
                            this.battle.addCurrency(450,this.player)
                        }else if(this.page==2&&a==0){
                            this.battle.loseCurrency(450,this.player)
                        }else if(this.page==2&&a==1){
                            this.battle.loseCurrency(300,this.player)
                        }else if(this.page==2&&a==2){
                            this.battle.cardManagers[this.player].deck.add(findName('Unfortunate',types.card),0,game.playerNumber+2)
                        }else if(this.page==3&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Lucky\nCharm',types.card),0,0)
                        }
                    break
                    case 73:
                        if(this.page==0&&a==0){
                            transition.scene='shop'
                            this.battle.purchaseManager.setup(2)
                        }
                    break
                    case 74:
                        if(this.page==0&&a==1){
                            this.harm(userCombatant,4)
                        }else if(this.page==0&&a==2){
                            this.harm(userCombatant,8)
                        }else if(this.page==1&&a==0){
                            this.battle.overlayManager.overlays[5][this.player].active=true
                            this.battle.overlayManager.overlays[5][this.player].activate()
                        }else if(this.page==2&&a==0){
                            this.battle.overlayManager.overlays[6][this.player].active=true
                            this.battle.overlayManager.overlays[6][this.player].activate()
                        }else if(this.page==3&&a==0){
                            this.battle.overlayManager.overlays[9][this.player].active=true
                            this.battle.overlayManager.overlays[9][this.player].activate()
                        }
                    break
                    case 75:
                        if(this.page==0&&a==0){
                            userCombatant.heal(20)
                        }else if(this.page==0&&a==1){
                            this.battle.overlayManager.overlays[3][this.player].active=true
                            this.battle.overlayManager.overlays[3][this.player].activate([0,floor(random(1,3)),0])
                        }else if(this.page==1&&a==0){
                            this.battle.loseCurrency(35,this.player)
                        }else if(this.page==4&&a==0){
                            this.harm(userCombatant,1)
                        }
                    break
                    case 76:
                        if(this.page==0&&a==0){
                            userCombatant.gainMaxHP(16)
                            this.battle.cardManagers[this.player].deck.add(findName('Lunar\nNight',types.card),0,game.playerNumber+2)
                        }else if(this.page==0&&a==1){
                            this.battle.cardManagers[this.player].deck.add(findName('Lunar\nSoil',types.card),0,0)
                            this.battle.cardManagers[this.player].deck.add(findName('Lunar\nSoil',types.card),0,0)
                        }
                    break
                    case 77:
                        if(this.page==0&&a==0){
                            this.battle.loseCurrency(50,this.player)
                        }else if(this.page==1&&a==0){
                            this.battle.relicManager.addRelic(findInternal('Normal Spectrals',types.relic),this.player)
                        }
                    break
                    case 78:
                        if(this.page==0&&a==0){
                            this.harm(userCombatant,20)
                            this.battle.cardManagers[this.player].deck.removeAbstract(7,[[2]])
                        }else if(this.page==1&&a==0){
                            for(let b=0,lb=3;b<lb;b++){
                                this.battle.cardManagers[this.player].deck.add(findName('Shade',types.card),0,0)
                            }
                        }
                    break
                    case 79:
                        if(this.page==0&&a==0){
                            this.harm(userCombatant,26)
                        }else if(this.page==1&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Starry\nSky',types.card),0,0)
                        }
                    break
                    case 80:
                        if(this.page==1&&a==0){
                            this.battle.overlayManager.overlays[91][this.player].active=true
                            this.battle.overlayManager.overlays[91][this.player].activate()
                        }else if(this.page==2&&a==0){
                            this.battle.overlayManager.overlays[92][this.player].active=true
                            this.battle.overlayManager.overlays[92][this.player].activate()
                        }
                    break
                    case 81:
                        if(this.page==0&&a==0){
                            this.battle.cardManagers[this.player].randomEffect(0,52,[1])
                            this.battle.cardManagers[this.player].randomEffect(0,52,[1])
                        }else if(this.page==0&&a==1){
                            this.battle.cardManagers[this.player].randomEffect(0,52,[2])
                            this.battle.cardManagers[this.player].randomEffect(0,52,[2])
                        }else if(this.page==1&&a==0){
                            this.battle.addCurrency(5,this.player)
                        }
                    break
                    case 82:
                        if(this.page==0&&a==0){
                            this.battle.overlayManager.overlays[93][this.player].active=true
                            this.battle.overlayManager.overlays[93][this.player].activate()
                        }
                    break
                    case 83:
                        if(this.page==0&&a==0){
                            this.battle.overlayManager.overlays[87][this.player].active=true
                            this.battle.overlayManager.overlays[87][this.player].activate()
                        }
                    break
                    case 84:
                        if(this.page==0&&a==0){
                            this.harmMax(userCombatant,10)
                        }else if(this.page==0&&a==1){
                            this.battle.loseCurrency(25,this.player)
                        }else if(this.page==1&&a==0){
                            this.battle.relicManager.addRelic(findInternal('Shuffle Miracle',types.relic),this.player)
                        }else if(this.page==2&&a==0){
                            this.battle.overlayManager.overlays[5][this.player].active=true
                            this.battle.overlayManager.overlays[5][this.player].activate()
                        }
                    break
                    case 85:
                        for(let b=0,lb=3;b<lb;b++){
                            if(this.page==0&&a==b&&this.selected[b]==0){
                                this.battle.loseCurrency(25,this.player)
                                this.selected[b]=1
                                this.pages[0].option[b]='Purchased'
                                this.pages[0].optionDesc[b]=''
                                this.pages[0].link[b]=0
                                this.battle.overlayManager.overlays[3][this.player].active=true
                                this.battle.overlayManager.overlays[3][this.player].activate([0,3,20,this.selection[b]])
                            }
                        }
                    break
                    case 86:
                        if(this.page==0&&a==0){
                            this.battle.loseCurrency(150,this.player)
                        }else if(this.page==1&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('11 of\nNothings',types.card),0,0)
                        }else if(this.page==2&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('1 of\nNothings',types.card),0,0)
                        }
                    break
                    case 87:
                        if(this.page==0&&a==0){
                            this.harm(userCombatant,15)
                        }else if(this.page==1&&a==0){
                            this.battle.relicManager.addRelic(findInternal('Click to Swap',types.relic),this.player)
                        }else if(this.page==2&&a==0){
                            this.battle.addCurrency(120,this.player)
                        }
                    break
                    case 88:
                        if(this.page==0&&(a==0||a==1)){
                            this.battle.relicManager.loseRelic(this.selection,this.player)
                        }else if(this.page==1&&a==0){
                            this.battle.addCurrency(325,this.player)
                        }else if(this.page==2&&a==0){
                            this.battle.overlayManager.overlays[15][this.player].active=true
                            this.battle.overlayManager.overlays[15][this.player].activate([])
                            this.battle.overlayManager.overlays[15][this.player].args[1]=2
                        }
                    break
                    case 89:
                        if(this.page==0&&a==1){
                            this.harm(userCombatant,10)
                        }else if(this.page==0&&a==2){
                            this.harm(userCombatant,30)
                        }else if(this.page==1&&a==0){
                            this.battle.relicManager.addSetRelic(0,this.player)
                        }else if(this.page==2&&a==0){
                            this.battle.relicManager.addSetRelic(1,this.player)
                        }else if(this.page==3&&a==0){
                            this.battle.relicManager.addSetRelic(2,this.player)
                        }
                    break
                    case 90:
                        if(this.page==0&&a==0){
                            this.battle.loseCurrency(125,this.player)
                        }else if(this.page==1&&a==0){
                            this.battle.relicManager.addRelic(findInternal('Turn 10 Turn',types.relic),this.player)
                        }else if(this.page==1&&a==1){
                            this.battle.relicManager.addRelic(findInternal('Turn 5 Buffer',types.relic),this.player)
                        }
                    break
                    case 91:
                        if(this.page==0&&a==0){
                            this.battle.overlayManager.overlays[3][this.player].active=true
                            this.battle.overlayManager.overlays[3][this.player].activate([0,3,16])
                        }else if(this.page==0&&a==1){
                            this.battle.cardManagers[this.player].addRandomAbstract(0,0,0,1,0,[],[game.playerNumber+5,3])
                            this.battle.cardManagers[this.player].addRandomAbstract(0,0,0,1,0,[],[game.playerNumber+5,3])
                        }
                    break
                    case 92:
                        if(this.page==0&&a==0){
                            this.battle.cardManagers[this.player].deck.removeAbstract(6,[[6]])
                        }else if(this.page==0&&a==1){
                            this.battle.cardManagers[this.player].addRandomAbstract(0,0,0,1,0,[],[game.playerNumber+2,3])
                            this.battle.relicManager.addRelic(findInternal('Curse Strength',types.relic),this.player)
                        }
                    break
                    case 93:
                        if(this.page==0&&a==0){
                            this.battle.loseCurrency(60,this.player)
                        }else if(this.page==1&&a==0){
                            this.battle.relicManager.addRelic(findInternal('Random Value',types.relic),this.player)
                        }
                    break
                    case 94:
                        if(this.page==0&&a==0){
                            this.battle.loseCurrency(200,this.player)
                            this.battle.overlayManager.overlays[3][this.player].active=true
                            this.battle.overlayManager.overlays[3][this.player].activate([0,3,6])
                        }
                    break
                    case 95:
                        if(this.page==0&&a==0){
                            transition.scene='battle'
                            this.battle.setupBattle(types.encounter[findName('Duck Hunt',types.encounter)])
                        }
                    break
                    case 96:
                        if(this.page==0&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Duck\nFluff',types.card),0,game.playerNumber+2)
                        }else if(this.page==1&&a==0){
                            this.battle.relicManager.addRandomRelic(this.player)
                        }
                    break
                    case 97:
                        if(this.page==0&&a==0){
                            this.battle.loseCurrency(65,this.player)
                        }else if(this.page==1&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Money\nShower',types.card),0,0)
                        }
                    break
                    case 98:
                        if(this.page==1&&a==0){
                            this.battle.overlayManager.overlays[43][this.player].active=true
                            this.battle.overlayManager.overlays[43][this.player].activate()
                        }
                    break
                    case 99:
                        if(this.page==0&&a==0){
                            this.battle.loseCurrency(40,this.player)
                            this.battle.cardManagers[this.player].deck.add(findName('Titanite',types.card),0,0)
                        }
                    break
                    case 100:
                        if(this.page==0&&a==0){
                            this.harm(userCombatant,15)
                        }else if(this.page==0&&a==1){
                            this.battle.loseCurrency(33,this.player)
                        }else if((this.page==1||this.page==2)&&a==0){
                            this.battle.overlayManager.overlays[3][this.player].active=true
                            this.battle.overlayManager.overlays[3][this.player].activate([0,0,32])
                        }else if(this.page==3&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName(`Reimu's\nWrath`,types.card),0,game.playerNumber+2)
                        }
                    break
                    case 101:
                        if(this.page==0&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Inchling\nBowl',types.card),0,0)
                        }else if(this.page==0&&a==1){
                            current.addCurrency(25,this.player)
                        }
                    break
                    case 102:
                        if(this.page==0&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Final\nRest',types.card),0,0)
                        }else if(this.page==0&&a==1){
                            this.battle.relicManager.addRandomRelic(this.player)
                        }
                    break
                    case 103:
                        if(this.page==0&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Mountain\nEcho',types.card),0,0)
                        }else if(this.page==0&&a==1){
                            userCombatant.heal(7)
                        }
                    break
                    case 104:
                        if(this.page==0&&a==0){
                            transition.scene='battle'
                            this.battle.setupBattle(types.encounter[findName('Sniper Outpost',types.encounter)])
                        }
                    break
                    case 105:
                        if(this.page==0&&a==0){
                            this.battle.combatantManager.allies[this.player].push(findName('Bowler Duck',types.combatant))
                        }
                    break
                    case 106:
                        if(this.page==0&&a>=0&&a<=1){
                            this.battle.loseCurrency(25,this.player)
                        }else if(this.page==1&&a==0){
                            this.battle.overlayManager.overlays[3][this.player].active=true
                            this.battle.overlayManager.overlays[3][this.player].activate([0,0,32])
                        }else if(this.page==2&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Spring-Colored\nPath',types.card),0,0)
                        }
                    break
                    case 107:
                        if((this.page==0||this.page==2)&a==0&&this.battle.currency.money[this.player]>=5){
                            this.battle.loseCurrency(5,this.player)
                            if(floor(random(0,4))!=0){
                                tempPage++
                            }
                        }else if(this.page==1&&a==0){
                            this.battle.overlayManager.overlays[5][this.player].active=true
                            this.battle.overlayManager.overlays[5][this.player].activate()
                        }
                    break
                    case 108:
                        if(this.page==0&&a==0){
                            this.battle.cardManagers[this.player].randomEffect(0,21)
                        }else if(this.page==1&&a==0){
                            this.battle.addCurrency(35,this.player)
                        }
                    break
                    case 109:
                        if(this.page==0&&a==0){
                            this.battle.relicManager.addRelic(findInternal('Glitched Cards',types.relic),this.player)
                            this.battle.cardManagers[this.player].deck.add(findName('Gamer',types.card),0,game.playerNumber+2)
                        }
                    break
                    case 110:
                        if(this.page==1&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Good\nNews',types.card),0,0)
                        }else if(this.page==1&&a==1){
                            this.battle.cardManagers[this.player].deck.add(findName('Bad\nNews',types.card),0,0)
                            this.battle.addCurrency(200,this.player)
                        }else if(this.page==1&&a==2){
                            this.battle.cardManagers[this.player].deck.add(findName('Entertaining\nNews',types.card),0,0)
                        }
                    break
                    case 111:
                        if(this.page==0&&a==0){
                            this.harm(userCombatant,27)
                        }else if(this.page==1&&a==0){
                            this.battle.relicManager.addRelic(findInternal('Click to Block',types.relic),this.player)
                        }
                    break
                    case 112:
                        if(this.page==0&&a==0){
                            transition.scene='shop'
                            this.battle.purchaseManager.setup(3)
                        }
                    break
                    case 113:
                        if(this.page==0&&a==0){
                            this.battle.loseCurrency(125,this.player)
                            this.battle.overlayManager.overlays[28][this.player].active=true
                            this.battle.overlayManager.overlays[28][this.player].activate()
                        }
                    break
                    case 114:
                        if(this.page==0&&a==1){
                            this.battle.loseCurrency(150,this.player)
                        }else if(this.page==0&&a==2){
                            this.battle.loseCurrency(375,this.player)
                        }else if(this.page==1&&a==0){
                            this.battle.overlayManager.overlays[6][this.player].active=true
                            this.battle.overlayManager.overlays[6][this.player].activate()
                        }else if(this.page==2&&a==0){
                            this.battle.overlayManager.overlays[15][this.player].active=true
                            this.battle.overlayManager.overlays[15][this.player].activate([])
                            this.battle.overlayManager.overlays[15][this.player].args[1]=2
                        }else if(this.page==3&&a==0){
                            this.battle.overlayManager.overlays[15][this.player].active=true
                            this.battle.overlayManager.overlays[15][this.player].activate([])
                            this.battle.overlayManager.overlays[15][this.player].args[1]=3
                        }
                    break
                    case 115:
                        if(this.page==0&&a==1){
                            this.harm(userCombatant,15)
                        }else if(this.page==0&&a==2){
                            this.harm(userCombatant,5)
                        }else if(this.page==1&&a==0){
                            this.battle.cardManagers[this.player].addRandomAbstract(0,0,0,0,0,[],[3])
                        }else if(this.page==2&&a==0){
                            this.battle.overlayManager.overlays[6][this.player].active=true
                            this.battle.overlayManager.overlays[6][this.player].activate()
                        }
                    break
                    case 116:
                        if(this.page==0&&a==0){
                            transition.scene='battle'
                            this.battle.setupBattle(types.encounter[findName('Canyon',types.encounter)])
                        }
                    break
                    case 117:
                        if(this.page==0&&a==0){
                            transition.scene='battle'
                            this.battle.setupBattle(types.encounter[findName('Negotiator',types.encounter)])
                        }
                    break
                    case 118:
                        if(this.page==0&&a==0){
                            this.battle.relicManager.addRelic(findInternal('Rest Max HP',types.relic),this.player)
                            transition.scene='battle'
                            this.battle.setupBattle(types.encounter[findName(`Ducky's Chocolate Experience (1)`,types.encounter)])
                        }else if(this.page==0&&a==1){
                            this.battle.relicManager.addRelic(findInternal('Shop Max HP',types.relic),this.player)
                            transition.scene='battle'
                            this.battle.setupBattle(types.encounter[findName(`Ducky's Chocolate Experience (2)`,types.encounter)])
                        }
                    break
                    case 119:
                        if(this.page==0&&a==0){
                            transition.scene='battle'
                            this.battle.setupBattle(types.encounter[findName('Prison Informant',types.encounter)])
                        }
                    break
                    case 120:
                        if(this.page==0&&a==0){
                            this.battle.addCurrency(100,this.player)
                            if(floor(random(0,2))==0){
                                tempPage++
                            }
                        }else if(this.page==2&&a==0){
                            this.harm(userCombatant,18)
                        }
                    break
                    case 121:
                        if(this.page==0&&a==1){
                            this.battle.cardManagers[this.player].deck.randomEffect(55)
                            this.battle.addCurrency(300,this.player)
                        }else if(this.page==1&&a==0){
                            this.battle.relicManager.addRelic(findInternal(`Low Health Permanent Strength`,types.relic),this.player)
                        }
                    break
                    case 122:
                        if(this.page==0&&a==0){
                            this.battle.loseCurrency(50,this.player)
                            this.battle.relicManager.addRelic(findInternal(`Basic Heal`,types.relic),this.player)
                        }else if(this.page==0&&a==1){
                            this.battle.loseCurrency(50,this.player)
                            userCombatant.heal(userCombatant.base.life)
                        }
                    break
                    case 123:
                        if(this.page==0&&a==0){
                            this.selection=[floor(random(2,5)),floor(random(0,8))]
                            this.pages[1].optionDesc[0]=`Lose ${this.selection[0]} Health${this.battle.relicManager.hasRelic(259,this.player)?` (Non-Bypassable)`:``}, ${[
                                `Gain 5 Currency`,
                                `Gain 10 Currency`,
                                `Gain 25 Currency`,
                                `Gain an Item`,
                                `Add a Card`,
                                `Gain a Common Relic`,
                                `Upgrade a Card`,
                                `Get Nothing`
                            ][this.selection[1]]}`
                        }else if((this.page==1||this.page==2||this.page==3)&&a==0){
                            if(userCombatant.life<=0){
                                tempPage=this.page-this.pages[this.page].link[a]
                            }else{
                                userCombatant.loseHealth(this.selection[0])
                                switch(this.selection[1]){
                                    case 0:
                                        this.battle.addCurrency(5,this.player)
                                    break
                                    case 1:
                                        this.battle.addCurrency(10,this.player)
                                    break
                                    case 2:
                                        this.battle.addCurrency(25,this.player)
                                    break
                                    case 3:
                                        this.battle.itemManager.addRandomItem(this.player)
                                    break
                                    case 4:
                                        this.battle.overlayManager.overlays[3][this.player].active=true
                                        this.battle.overlayManager.overlays[3][this.player].activate([0,floor(random(0,2)),0])
                                    break
                                    case 5:
                                        this.battle.relicManager.addSetRelic(this.player,0)
                                    break
                                    case 6:
                                        this.battle.overlayManager.overlays[5][this.player].active=true
                                        this.battle.overlayManager.overlays[5][this.player].activate()
                                    break
                                }
                                this.selection=[this.selection[0]+floor(random(0,3)),floor(random(0,8))]
                                this.pages[this.page==2?3:2].optionDesc[0]=`Lose ${this.selection[0]} Health, ${[
                                    `Gain 5 Currency`,
                                    `Gain 10 Currency`,
                                    `Gain 25 Currency`,
                                    `Gain an Item`,
                                    `Gain a Card Reward`,
                                    `Gain a Common Relic`,
                                    `Upgrade a Card`,
                                    `Get Nothing`
                                ][this.selection[1]]}`
                            }
                        }
                    break
                    case 124:
                        if(this.page==1&&a==0){
                            this.battle.overlayManager.overlays[3][this.player].active=true
                            this.battle.overlayManager.overlays[3][this.player].activate([0,3,36,1])
                        }else if(this.page==2&&a==0){
                            this.battle.overlayManager.overlays[5][this.player].active=true
                            this.battle.overlayManager.overlays[5][this.player].activate()
                        }
                    break
                    case 125:
                        if(this.page==0&a==0){
                            this.battle.relicManager.addRelic(findInternal(`6 Card 3 Damage All`,types.relic),this.player)
                        }else if(this.page==0&a==1){
                            this.battle.overlayManager.overlays[3][this.player].active=true
                            this.battle.overlayManager.overlays[3][this.player].activate([0,2,0])
                        }else if(this.page==0&a==2){
                            userCombatant.gainMaxHP(5)
                        }
                    break
                    case 126:
                        if(this.page==1&&a==0){
                            this.battle.overlayManager.overlays[101][this.player].active=true
                            this.battle.overlayManager.overlays[101][this.player].activate()
                        }
                    break
                    case 127:
                        if(this.page==0&&a==0&&this.battle.currency.money[this.player]>0){
                            this.battle.loseCurrency(this.battle.currency.money[this.player],this.player)
                        }else if(this.page==0&&a==1){
                            this.battle.cardManagers[this.player].deck.add(findName('Buy\nSafety',types.card),0,game.playerNumber+2)
                        }
                    break
                    case 128:
                        if(this.page==0&&a==0){
                            this.battle.loseCurrency(20,this.player)
                        }else if(this.page==0&&a==1){
                            this.battle.loseCurrency(25,this.player)
                        }else if(this.page==1&&a==0){
                            this.battle.itemManager.addItem(findName('Quality Coffee',types.item),this.player)
                        }else if(this.page==2&&a==0){
                            userCombatant.gainMaxHP(3)
                        }
                    break
                    case 129:
                        if(this.page==0&&a==0){
                            userCombatant.loseMaxHP(12)
                        }else if(this.page==0&&a==1){
                            this.battle.cardManagers[this.player].deck.add(findName('Direct\nSunlight',types.card),0,game.playerNumber+2)
                        }else if(this.page==0&&a==2){
                            this.harm(userCombatant,8)
                        }else if(this.page==1&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Sunny, Glowing\nSunlight',types.card),0,game.playerNumber+5)
                        }else if(this.page==2&&a==0){
                            this.battle.overlayManager.overlays[104][this.player].active=true
                            this.battle.overlayManager.overlays[104][this.player].activate([])
                            this.battle.overlayManager.overlays[104][this.player].args[1]=2
                        }else if(this.page==3&&a==0){
                            this.battle.overlayManager.overlays[103][this.player].active=true
                            this.battle.overlayManager.overlays[103][this.player].activate([])
                            this.battle.overlayManager.overlays[103][this.player].args[1]=2
                        }
                    break
                    case 130:
                        if(this.page==0&&a==0){
                            this.harm(userCombatant,2)
                        }else if(this.page==2&&a==0){
                            this.harm(userCombatant,4)
                        }else if(this.page==3&&a==0){
                            this.harm(userCombatant,8)
                        }else if(this.page==4&&a==0){
                            this.harm(userCombatant,18)
                        }else if(this.page==5&&a==0){
                            this.battle.relicManager.addRelic(findInternal(variants.mtg?'Click For Mana':'Click For Energy',types.relic),this.player)
                        }
                    break
                    case 131:
                        if(this.page==0&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Maelstrom',types.card),0,0)
                            this.harm(userCombatant,15)
                        }else if(this.page==0&&a==1){
                            this.battle.cardManagers[this.player].addRandomAbstract(0,0,0,2,0,[],[3])
                            this.battle.cardManagers[this.player].addRandomAbstract(0,0,0,2,0,[],[3])
                            this.battle.overlayManager.overlays[15][this.player].active=true
                            this.battle.overlayManager.overlays[15][this.player].activate([0,3,1])
                            this.battle.overlayManager.overlays[15][this.player].args[1]=2
                        }
                    break
                    case 132:
                        if(this.page==0&&a==0){
                            this.battle.loseCurrency(25,this.player)
                        }else if(this.page==0&&a==1){
                            this.battle.loseCurrency(100,this.player)
                        }else if(this.page==1&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Paper\nBall',types.card),0,0)
                        }else if(this.page==2&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Deluxe\nPaper Ball',types.card),0,0)
                        }
                    break
                    case 133:
                        if(this.page==0&&a==0){
                            this.battle.loseCurrency(25,this.player)
                        }else if(this.page==1&&a==0){
                            this.battle.overlayManager.overlays[105][this.player].active=true
                            this.battle.overlayManager.overlays[105][this.player].activate()
                        }
                    break
                    case 134:
                        if(this.page==0&&a==0){
                            this.battle.addCurrency(200,this.player)
                            transition.scene='battle'
                            this.battle.setupBattle(types.encounter[findName('Traitor',types.encounter)])
                        }
                    break
                    case 135:
                        if(this.page==1&&a==0){
                            this.battle.overlayManager.overlays[102][this.player].active=true
                            this.battle.overlayManager.overlays[102][this.player].activate()
                        }
                    break
                    case 136:
                        if(this.page==0&&a==0){
                            tempPage=floor(random(0,4))
                        }else if(this.page==1&&a==0){
                            this.battle.relicManager.addRelic(findInternal('First Enemy Lose Per Turn',types.relic),this.player)
                        }else if(this.page==2&&a==0){
                            this.battle.relicManager.addRelic(findInternal('First Enemy Remove Block',types.relic),this.player)
                        }else if(this.page==3&&a==0){
                            this.battle.cardManagers[this.player].deck.add(findName('Temptation of\nthe Next World',types.card),0,0)
                        }else if(this.page==4&&a==0){
                            this.harm(userCombatant,5)
                        }
                    break

                }
                if(!cut){
                    this.page=this.pages[this.page].link[a]+tempPage
                    if(this.page==-1){
                        this.complete=true
                    }else if(this.page==-2){
                        transition.trigger=true
                    }
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
                if(pointInsideBox({position:inputs.rel},{position:{x:this.posKey,y:300+a*50},width:220,height:30})&&!(a>0&&this.battle.relicManager.hasRelic(339,this.player))){
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
                if(int(key)-1==a&&!(a>0&&this.battle.relicManager.hasRelic(339,this.player))){
                    this.callInput(0,a)
                }
            }
            if(this.battle.relicManager.hasRelic(103,this.player)&&code==ENTER){
                this.complete=true
            }
        }
    }
}