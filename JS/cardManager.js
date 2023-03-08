class cardManager{
    constructor(layer,player){
        this.layer=layer
        this.player=player

        this.deck=new group(this.layer,0)
        this.reserve=new group(this.layer,1)
        this.hand=new group(this.layer,2)
        this.discard=new group(this.layer,3)

        this.drawAmount=6
    }
    initialDeck(){
        this.deck.initialCards(0,this.player)
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
    draw(amount){
        if(this.reserve.cards.length>0){
            this.reserve.send(this.hand.cards,0,min(amount,this.reserve.cards.length-1))
        }
    }
    display(scene){
        switch(scene){
            case 'battle':
                this.hand.display()
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
}