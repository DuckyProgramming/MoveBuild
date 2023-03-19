class purchaseManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.purchases=[]
    }
    setup(){
        this.purchases=[]
        let list=copyArrayStack(this.battle.cardManager.listing.card)
        let group=[0,0,0,0,1,1,1,2]
        let cost=[[80,100],[120,150],[200,250]]
        for(let a=0,la=8;a<la;a++){
            let index=floor(random(0,list[0].length))
            this.purchases.push(new purchase(this.layer,this.battle,100+a%4*150,100+floor(a/4)*200,1,round(random(cost[group[a]][0],cost[group[a]][1])),[list[group[a]][index],0,this.battle.player]))
            list[0].splice(index,1)
        }
        this.purchases.push(new purchase(this.layer,this.battle,750,300,2,100,[]))
    }
    display(){
        for(let a=0,la=this.purchases.length;a<la;a++){
            if(this.purchases[a].size<=1){
                this.purchases[a].display()
            }
        }
        for(let a=0,la=this.purchases.length;a<la;a++){
            if(this.purchases[a].size>1){
                this.purchases[a].display()
            }
        }
    }
    update(){
        for(let a=0,la=this.purchases.length;a<la;a++){
            this.purchases[a].update()
        }
    }
    onClick(){
        for(let a=0,la=this.purchases.length;a<la;a++){
            this.purchases[a].onClick()
        }
    }
    onKey(key,code){
        for(let a=0,la=this.purchases.length;a<la;a++){
            this.purchases[a].onKey(key,code)
        }
    }
}