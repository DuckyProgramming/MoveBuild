class group{
    constructor(layer,id){
        this.layer=layer
        this.id=id
        this.cards=[]
    }
    initialCards(type,player){
        switch(type){
            case 0:
                for(let a=0,la=types.deck.start[player].length;a<la;a++){
                    this.add(findName(types.deck.start[player][a][0],types.card),types.deck.start[player][a][1],types.deck.start[player][a][2])
                }
            break
        }
    }
    add(type,level,color){
        game.id++
        this.cards.push(new card(this.layer,1200,520,type,level,color,game.id))
    }
    send(list,firstIndex,lastIndex){
        if(lastIndex==-1){
            for(let a=0,la=this.cards.length-firstIndex;a<la;a++){
                list.push(copyCard(this.cards[firstIndex]))
                this.cards.splice(firstIndex,1)
            }
        }else{
            for(let a=0,la=lastIndex-firstIndex;a<la;a++){
                list.push(copyCard(this.cards[firstIndex]))
                this.cards.splice(firstIndex,1)
            }
        }
    }
    copy(list,firstIndex,lastIndex){
        if(lastIndex==-1){
            for(let a=0,la=this.cards.length-firstIndex;a<la;a++){
                list.push(copyCard(this.cards[firstIndex+a]))
            }
        }else{
            for(let a=0,la=lastIndex-firstIndex+1;a<la;a++){
                list.push(copyCard(this.cards[firstIndex+a]))
            }
        }
    }
    display(){
        for(let a=0,la=this.cards.length;a<la;a++){
            this.cards[a].display()
        }
    }
    update(scene){
        switch(scene){
            case 'battle':
                for(let a=0,la=this.cards.length;a<la;a++){
                    if(this.cards[a].position.x>a*100+120&&(this.cards[a].position.x>this.cards[max(0,a-1)].position.x+100||a==0)){
                        this.cards[a].position.x-=10
                    }
                }
            break
        }
    }
}