class pack{
    constructor(layer,player,battle,x,y,id){
        this.layer=layer
        this.player=player
        this.battle=battle
        this.position={x:x,y:y}
        this.id=id

        this.cards=[]
        this.complete=false
        this.speed=0
        this.create()
    }
    create(){
        let group=[0,0,0,1]
        for(let a=0,la=4;a<la;a++){
            this.cards.push(new card(this.layer,this.battle,this.player,this.position.x-75+a*50,this.position.y-5+a%2*10,a==0&&this.battle.player[this.player]==1?findName(['Security\nPack','Sapper\nPack','Infantry\nPack'][this.id],types.card):this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]][group[a]][floor(random(0,this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]][group[a]].length))],0,this.battle.player[this.player],a))
        }
    }
    reposition(x,y){
        this.position.x+=x
        this.position.y+=y
        this.cards.forEach(card=>card.position.x+=x)
        this.cards.forEach(card=>card.position.y+=y)
    }
    display(){
        this.cards.forEach(card=>card.display())
    }
    update(){
        this.cards.forEach(card=>card.update())
        this.cards.forEach(card=>card.size=min(card.size,0.8))
        if(this.complete){
            this.speed+=2
            this.cards.forEach(card=>card.position.y-=this.speed)
        }
    }
    reject(){
        this.cards.forEach(card=>card.deSize=true)
    }
    take(){
        this.complete=true
        for(let a=0,la=this.cards.length;a<la;a++){
            this.battle.cardManagers[this.player].deck.add(this.cards[a].type,this.cards[a].level,this.cards[a].color)
        }
    }
}