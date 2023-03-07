class cardManager{
    constructor(layer,player){
        this.layer=layer
        this.player=player
        this.deck=new group(this.layer,0)
        this.reserve=new group(this.layer,1)
        this.hand=new group(this.layer,2)
        this.discard=new group(this.layer,3)

        this.deck.initialCards(0,this.player)
    }
    display(scene){
        switch(scene){
            case 'battle':
                this.hand.display()
            break
        }
    }
}