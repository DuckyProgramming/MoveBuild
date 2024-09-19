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
        this.size=1
        this.scale=0
        this.total=0
        this.create()
    }
    create(){
        if(this.battle.player[this.player]>0){
            let group=[0,0,0,1]
            let list=variants.ultraprism?copyArrayStack(this.battle.cardManagers[this.player].listing.all):variants.prism?copyArrayStack(this.battle.cardManagers[this.player].listing.allPlayerCard):variants.mtg?copyArrayStack(this.battle.cardManagers[this.player].listing.mtg[0]):variants.junk?quadroArray(copyArray(this.battle.cardManagers[this.player].listing.junk[constants.playerNumber+1])):copyArrayStack(this.battle.cardManagers[this.player].listing.card[this.battle.player[this.player]])
            if(variants.mtg){
                for(let a=0,la=list.length;a<la;a++){
                    for(let b=0,lb=list[a].length;b<lb;b++){
                        if(types.card[list[a][b]].mtg.list==-1&&types.card[list[a][b]].mtg.color[0]!=0&&floor(random(0,4))!=0){
                            list[a].splice(b,1)
                            b--
                            lb--
                        }
                    }
                }
            }
            for(let a=0,la=4;a<la;a++){
                if(list[group[a]].length>0){
                    let index=floor(random(0,list[group[a]].length))
                    let type=a==0&&this.battle.player[this.player]==1&&!variants.mtg&&!variants.junk&&!variants.ultraprism&&!variants.prism?findName(['Security\nPack','Sapper\nPack','Infantry\nPack'][this.id],types.card):list[group[a]][index]
                    this.cards.push(new card(this.layer,this.battle,this.player,this.position.x-60+a*40,this.position.y-5+a%2*10,
                        type,variants.cursed?1:0,this.battle.standardColorize(type),a+this.id*4+this.player*12))
                    let roll=floor(random(0,180))
                    this.cards[this.cards.length-1].edition=roll==0?6:roll==1?5:roll==2?4:roll>=3&&roll<=5?3:roll>=6&&roll<=8?2:roll>=9&&roll<=11?1:0
                    list[group[a]].splice(index,1)
                }
            }
        }
    }
    reposition(x,y){
        this.position.x+=x
        this.position.y+=y
        this.cards.forEach(card=>card.position.x+=x)
        this.cards.forEach(card=>card.position.y+=y)
    }
    display(){
        for(let a=0,la=this.cards.length;a<la;a++){
            this.cards[a].position.x=this.position.x+(-60+a*40)*this.size
            this.cards[a].position.y=this.position.y+(-5+a%2*10)*this.size-this.total
            this.cards[a].size=0.6*this.size*this.scale
            this.cards[a].anim.afford=1
            this.cards[a].display()
        }
    }
    update(){
        if(this.complete){
            this.speed+=2
            this.total+=this.speed
        }
        this.scale=min(this.scale+0.2,1)
        this.size=smoothAnim(this.size,dist(inputs.rel.x,inputs.rel.y,this.position.x,this.position.y)<100,1,1.8,5)
    }
    reject(){
        this.cards.forEach(card=>card.deSize=true)
    }
    take(){
        this.complete=true
        for(let a=0,la=this.cards.length;a<la;a++){
            this.battle.cardManagers[this.player].deck.add(this.cards[a].type,this.cards[a].level,this.cards[a].color,this.cards[a].edition)
            this.battle.cardManagers[this.player].pack.push(copyCard(this.cards[a]))
            this.battle.cardManagers[this.player].pack[this.battle.cardManagers[this.player].pack.length-1].position.x=1200
            this.battle.cardManagers[this.player].pack[this.battle.cardManagers[this.player].pack.length-1].position.y=500
        }
    }
}