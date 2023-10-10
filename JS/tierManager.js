class tierManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle

        this.tiers=[]
        for(let a=0,la=10;a<la;a++){
            this.tiers.push(new group(this.layer,this.battle,this.player,a))
        }
        this.cards=[]
        for(let a=0,la=types.card.length;a<la;a++){
            this.tiers[0].add(a,0,types.card[a].list<0?0:types.card[a].list>=types.color.card.length?0:types.card[a].list)
        }
    }
    display(){
        for(let a=0,la=this.tiers.length;a<la;a++){
            this.tiers[a].display('tier')
        }
    }
    update(){
    }
}