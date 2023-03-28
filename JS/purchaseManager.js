class purchaseManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.purchases=[]
    }
    setup(){
        this.purchases=[]
        if(this.battle.player.length==1){
            let list=copyArrayStack(this.battle.cardManagers[0].listing.card[this.battle.player[0]])
            let group=[0,0,0,0,1,1,1,2]
            let cost=[[80,100],[120,150],[200,250]]
            for(let a=0,la=8;a<la;a++){
                let index=floor(random(0,list[group[a]].length))
                this.purchases.push(new purchase(this.layer,this.battle,0,100+a%4*150,100+floor(a/4)*200,1,round(random(cost[group[a]][0],cost[group[a]][1])),[list[group[a]][index],0,this.battle.player[0]]))
                list[group[a]].splice(index,1)
            }
            this.purchases.push(new purchase(this.layer,this.battle,0,750,300,2,100,[]))
        }else{
            for(let a=0,la=this.battle.player.length;a<la;a++){
                let list=copyArrayStack(this.battle.cardManagers[a].listing.card[this.battle.player[a]])
                let group=[0,0,0,0,1,1,1,2]
                let cost=[[80,100],[120,150],[200,250]]
                for(let b=0,lb=8;b<lb;b++){
                    let index=floor(random(0,list[group[b]].length))
                    this.purchases.push(new purchase(this.layer,this.battle,a,this.layer.width*a+(100+(9-b)%3*100)*(1-a*2),125+floor(b/3)*175+floor(b%3/2)*87.5,1,round(random(cost[group[b]][0],cost[group[b]][1])),[list[group[b]][index],0,this.battle.player[a]]))
                    //list[group[b]].splice(index,1)
                }
            }
            this.purchases.push(new purchase(this.layer,this.battle,0,400,212.5,2,100,[]))
            this.purchases.push(new purchase(this.layer,this.battle,1,500,387.5,2,100,[]))
        }
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