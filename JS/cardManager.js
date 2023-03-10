class cardManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle

        this.deck=new group(this.layer,this.battle,0)
        this.reserve=new group(this.layer,this.battle,1)
        this.hand=new group(this.layer,this.battle,2)
        this.discard=new group(this.layer,this.battle,3)

        this.drawAmount=6
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
    draw(amount){
        if(this.reserve.cards.length>0){
            this.reserve.send(this.hand.cards,0,min(amount,this.reserve.cards.length))
        }
    }
    fatigue(){
        this.discard.add(findName('Fatigue',types.card),0,game.playerNumber+1)
    }
    clearBattle(){
        this.reserve.cards=[]
        this.hand.cards=[]
        this.discard.cards=[]
    }
    display(scene){
        switch(scene){
            case 'battle':
                this.hand.display('battle')
            break
        }
    }
    update(scene){
        switch(scene){
            case 'battle':
                this.hand.update('battle')
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
}