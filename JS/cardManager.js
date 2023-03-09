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
            this.reserve.send(this.hand.cards,0,min(amount,this.reserve.cards.length))
        }
    }
    clearBattle(){
        this.reserve.cards=[]
        this.hand.cards=[]
        this.discard.cards=[]
    }
    display(scene,args){
        switch(scene){
            case 'battle':
                this.hand.display('battle')
            break
        }
    }
    update(scene,args){
        switch(scene){
            case 'battle':
                this.hand.update('battle',[this.discard.cards,args[0]])
            break
        }
    }
    onClick(scene,args){
        switch(scene){
            case 'battle':
                this.hand.onClick('battle',[args[0],args[1],args[2],args[3]])
            break
        }
    }
}