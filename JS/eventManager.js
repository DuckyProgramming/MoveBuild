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
        this.posKey=this.layer.width/2+225*(this.player*2-this.battle.player.length+1)
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
        this.fade.push([])
        for(let a=0,la=this.pages.length;a<la;a++){
            this.fade.push(0)
        }
    }
    display(){
        this.layer.fill(200,this.primaryFade*0.5)
        this.layer.noStroke()
        this.layer.rect(this.posKey,300,360,480,10)
        this.layer.fill(0,this.primaryFade)
        this.layer.textSize(30)
        this.layer.text(this.name,this.posKey,100)
        for(let a=0,la=this.pages.length;a<la;a++){
            this.layer.fill(0,this.fade[a])
            this.layer.textSize(10)
            this.layer.text(this.pages[a].desc,this.posKey,200)
            this.layer.textSize(12)
            for(let b=0,lb=this.pages[a].option.length;b<lb;b++){
                this.layer.text(this.pages[a].option[b],this.posKey,300+b*50)
            }
            this.layer.textSize(8)
            for(let b=0,lb=this.pages[a].optionDesc.length;b<lb;b++){
                this.layer.text(this.pages[a].optionDesc[b],this.posKey,310+b*50)
            }
            this.layer.noFill()
            this.layer.stroke(0,this.fade[a])
            this.layer.strokeWeight(1)
            for(let b=0,lb=this.pages[a].option.length;b<lb;b++){
                this.layer.rect(this.posKey,300+b*50,180,30,5)
            }
            this.layer.noStroke()
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
                            userCombatant.life-=4
                        }else if(this.page==1&&a==0){
                            this.battle.overlayManager.overlays[3][this.player].active=true
                            this.battle.overlayManager.overlays[3][this.player].activate([0,1,0])
                        }
                    break
                    case 2:
                        if(this.page==1&&a==0){
                            this.battle.getCurrency(300,this.player)
                            userCombatant.life-=20
                        }else if(this.page==2&&a==0){
                            userCombatant.heal(userCombatant.base.life)
                        }
                    break
                    case 3:
                        if(this.page==1&&a==0){
                            this.battle.relicManager.getRandomRelic(this.player)
                        }else if(this.page==2&&a==0){
                            for(let a=0;a<this.effect[0];a++){
                                let index=floor(random(0,this.battle.cardManagers[this.player].listing.card[0][3].length))
                                this.battle.cardManagers[this.player].hand.add(this.battle.cardManagers[this.player].listing.card[0][3][index],0,0)
                            }
                        }else if(this.page==3&&a==0){
                            userCombatant.life-=13
                        }
                    break
                    case 4:
                        if(this.page==0&&a==0){
                            current.cardManagers[this.player].deck.add(findName('Mixture A',types.card),0,0)
                        }else if(this.page==0&&a==1){
                            current.cardManagers[this.player].deck.add(findName('Mixture B',types.card),0,0)
                        }else if(this.page==0&&a==2){
                            current.cardManagers[this.player].deck.add(findName('Mixture C',types.card),0,0)
                        }
                    break
                    case 5:
                        if(this.page==0&&a<3&&floor(random(0,3))==0){
                            tempPage++
                        }else if(this.page==1&&a==0){
                            this.battle.getCurrency(200,this.player)
                        }else if(this.page==2&&a==0){
                            userCombatant.life-=30
                        }
                    break
                }
                this.page=this.pages[this.page].link[a]+tempPage
                if(this.page==-1){
                    this.complete=true
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
                if(pointInsideBox({position:inputs.rel},{position:{x:this.posKey,y:300+a*50},width:120,height:30})){
                    this.callInput(0,a)
                }
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
        }
    }
}