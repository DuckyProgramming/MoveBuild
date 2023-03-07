class group{
    constructor(layer,id){
        this.layer=layer
        this.id=id
        this.cards=[]
    }
    initialCards(type,player){
        switch(type){
            case 0:
                switch(player){
                    case 1:
                        this.add(findName('Strike',types.card),0,0)
                    break
                }
            break
        }
    }
    add(type,level,color){
        game.id++
        this.cards.push(new card(this.layer,1200,500,type,level,color,game.id))
        print(this.cards.length)
    }
    display(){
        print(this.cards.length)
        for(let a=0,la=this.cards.length;a<la;a++){
            this.cards[a].display()
        }
    }
    update(scene){
        switch(scene){
            case 'battle':
                /*for(let a=0,la=this.cards.length;a<la;a++){
                    if(this.cards[a].position.x>a*80+120&&(this.cards[a].position.x>this.cards[max(0,a-1)].position.x+120||a==0)){
                        this.cards[a].position.x-=10
                    }
                }*/
            break
        }
    }
}