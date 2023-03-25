class cardManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle

        this.listing={card:[]}

        this.deck=new group(this.layer,this.battle,0)
        this.reserve=new group(this.layer,this.battle,1)
        this.hand=new group(this.layer,this.battle,2)
        this.discard=new group(this.layer,this.battle,3)
        this.drop=new group(this.layer,this.battle,4)
        this.exhaust=new group(this.layer,this.battle,5)

        this.drawAmount=6

        this.initialListing()
    }
    initialListing(){
        for(let a=0;a<game.playerNumber+1;a++){
            this.listing.card.push([[],[],[]])
        }
        for(let a=0,la=types.card.length;a<la;a++){
            if(types.card[a].rarity>=0&&types.card[a].list>=0){
                this.listing.card[types.card[a].list][types.card[a].rarity].push(a)
                if(types.card[a].list==0){
                    for(let b=0,lb=game.playerNumber;b<lb;b++){
                        this.listing.card[b+1][types.card[a].rarity].push(a)
                    }
                }
            }
        }
    }
    initialDeck(){
        this.deck.initialCards(0,this.battle.player)
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
    draw(amount){
        let amountLeft=amount-this.reserve.cards.length
        if(this.reserve.cards.length>0){
            this.reserve.send(this.hand.cards,0,min(amount,this.reserve.cards.length),1)
        }
        if(amountLeft>0&&this.discard.cards.length>0){
            this.discard.send(this.reserve.cards,0,-1)
            this.reserve.shuffle()
            if(this.reserve.cards.length>0){
                this.reserve.send(this.hand.cards,0,min(amountLeft,this.reserve.cards.length),1)
            }
        }
    }
    fatigue(){
        this.discard.add(findName('Fatigue',types.card),0,game.playerNumber+1)
        this.drop.addDrop(findName('Fatigue',types.card),0,game.playerNumber+1)
    }
    clear(){
        this.reserve.cards=[]
        this.hand.cards=[]
        this.discard.cards=[]
        this.drop.cards=[]
        this.exhaust.cards=[]
    }
    display(scene){
        switch(scene){
            case 'battle':
                this.drop.display('drop',[])
                this.hand.display('battle',[])
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