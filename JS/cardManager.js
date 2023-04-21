class cardManager{
    constructor(layer,battle,player){
        this.layer=layer
        this.battle=battle
        this.player=player

        this.listing={card:[]}

        this.deck=new group(this.layer,this.battle,this.player,0)
        this.reserve=new group(this.layer,this.battle,this.player,1)
        this.hand=new group(this.layer,this.battle,this.player,2)
        this.discard=new group(this.layer,this.battle,this.player,3)
        this.drop=new group(this.layer,this.battle,this.player,4)
        this.exhaust=new group(this.layer,this.battle,this.player,5)

        this.drawAmount=6

        this.initialListing()
    }
    initialListing(){
        for(let a=0;a<game.playerNumber+3;a++){
            this.listing.card.push([[],[],[],[]])
        }
        for(let a=0,la=types.card.length;a<la;a++){
            if(types.card[a].rarity>=0&&types.card[a].list>=0){
                this.listing.card[types.card[a].list][types.card[a].rarity].push(a)
                this.listing.card[types.card[a].list][3].push(a)
            }
        }
    }
    initialDeck(){
        this.deck.initialCards(0,this.battle.player[this.player])
    }
    getList(type){
        switch(type){
            case 0: return this.deck
            case 1: return this.reserve
            case 2: return this.hand
            case 3: return this.discard
            case 4: return this.drop
            case 5: return this.exhaust
        }
    }
    send(group1,group2){
        this.getList(group1).send(this.getList(group2).cards,0,-1)
    }
    copy(group1,group2){
        this.getList(group1).copy(this.getList(group2).cards,0,-1)
    }
    shuffle(group){
        this.getList(group).shuffle()
    }
    allEffect(group,effect){
        this.getList(group).allEffect(effect)
    }
    randomEffect(group,effect,args){
        this.getList(group).randomEffect(effect,args)
    }
    draw(amount){
        this.battle.stats.drawn[this.player]+=amount
        let amountLeft=amount-this.reserve.cards.length
        if(this.reserve.cards.length>0){
            this.reserve.send(this.hand.cards,0,min(amount,this.reserve.cards.length),1)
        }
        if(amountLeft>0&&this.discard.cards.length>0){
            this.discard.send(this.reserve.cards,0,-1,2)
            this.reserve.shuffle()
            if(this.reserve.cards.length>0){
                this.reserve.send(this.hand.cards,0,min(amountLeft,this.reserve.cards.length),1)
            }
        }
        if(this.battle.relicManager.hasRelic(106,this.player)){
            for(let a=0,la=this.hand.cards.length;a<la;a++){
                if(this.hand.cards[a].class==5&&this.hand.cards[a].name!='Fatigue'){
                    this.battle.relicManager.activate(10,[this.player])
                    this.hand.send(this.exhaust.cards,a,a+1,0)
                    a--
                    la--
                }
            }
        }
    }
    turnDraw(){
        this.draw(this.drawAmount)
    }
    fatigue(){
        if(this.battle.relicManager.hasRelic(108,this.player)&&this.battle.relicManager.detail[108]==0){
            this.battle.relicManager.detail[108]=1
        }else{
            this.discard.add(findName('Fatigue',types.card),0,game.playerNumber+1)
            this.drop.addDrop(findName('Fatigue',types.card),0,game.playerNumber+1)
        }
    }
    transformCard(base){
        return new card(base.layer,base.battle,base.player,base.position.x,base.position.y,this.listing.card[base.list][3][floor(random(0,this.listing.card[base.list][3].length))],base.level,base.color,base.id)
    }
    clear(){
        this.reserve.cards=[]
        this.hand.cards=[]
        this.discard.cards=[]
        this.drop.cards=[]
        this.exhaust.cards=[]
    }
    reset(){
        this.hand.reset()
    }
    display(scene,args){
        switch(scene){
            case 'battle':
                this.drop.display('drop',[])
                this.layer.push()
                this.layer.translate(0,200-args[0]*200)
                this.hand.display('battle',[])
                this.layer.pop()
            break
        }
    }
    update(scene){
        switch(scene){
            case 'battle':
                this.hand.update('battle',[])
                this.drop.update('drop',[])
            break
        }
    }
    onClick(scene){
        switch(scene){
            case 'battle':
                this.hand.onClick('battle')
            break
        }
    }
    onKey(scene,key,code){
        switch(scene){
            case 'battle':
                this.hand.onKey('battle',key,code)
            break
        }
    }
}