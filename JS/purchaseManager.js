class purchaseManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.purchases=[]
    }
    setup(){
        this.purchases=[]
        if(this.battle.players==1){
            let list=copyArrayStack(this.battle.cardManagers[0].listing.card[this.battle.player[0]])
            let group=[0,0,0,0,1,1,1,2]
            let cost=[[80,100],[120,150],[200,250]]
            for(let a=0,la=group.length;a<la;a++){
                let index=floor(random(0,list[group[a]].length))
                this.purchases.push(new purchase(this.layer,this.battle,0,100+a%4*150,112.5+floor(a/4)*187.5,1,[round(random(cost[group[a]][0],cost[group[a]][1]))],[list[group[a]][index],0,this.battle.player[0]]))
                list[group[a]].splice(index,1)
            }
            list=copyArrayStack(this.battle.cardManagers[0].listing.card[0])
            group=[1,1,2]
            cost=[[120,150],[180,225],[300,375]]
            for(let a=0,la=group.length;a<la;a++){
                let index=floor(random(0,list[group[a]].length))
                this.purchases.push(new purchase(this.layer,this.battle,0,100+a*150,487.5,1,[round(random(cost[group[a]][0],cost[group[a]][1]))],[list[group[a]][index],0,0]))
                list[group[a]].splice(index,1)
            }
            group=[0,0,0,1,1,1,2,2,3,3]
            cost=[[160,200],[280,350],[400,500],[240,300]]
            list=this.battle.relicManager.makeRelicSelection(group)
            let index=floor(random(0,group.length))
            for(let a=0,la=group.length;a<la;a++){
                this.purchases.push(new purchase(this.layer,this.battle,0,700+(a%2)*100,100+floor(a/2)*100,3,[this.battle.relicManager.hasRelic(85,-1)&&a==index?0:round(random(cost[group[a]][0],cost[group[a]][1]))],[list[a]]))
            }
            this.purchases.push(new purchase(this.layer,this.battle,0,550,487.5,2,[this.battle.relicManager.hasRelic(97,0)?120:200],[]))
        }else{
            for(let a=0,la=this.battle.players;a<la;a++){
                let list=copyArrayStack(this.battle.cardManagers[a].listing.card[this.battle.player[a]])
                let group=[0,0,0,0,1,1,1,2]
                let cost=[[80,100],[120,150],[200,250]]
                for(let b=0,lb=group.length;b<lb;b++){
                    let index=floor(random(0,list[group[b]].length))
                    let price=round(random(cost[group[b]][0],cost[group[b]][1]))
                    this.purchases.push(new purchase(this.layer,this.battle,a,this.layer.width*a+(100+(b%4*100))*(1-a*2),350+floor(b/4)*150,1,[price,price],[list[group[b]][index],0,this.battle.player[a]]))
                    list[group[b]].splice(index,1)
                }
            }
            let list=copyArrayStack(this.battle.cardManagers[0].listing.card[0])
            let group=[1,2,1]
            let cost=[[120,150],[180,225],[300,375]]
            for(let a=0,la=group.length;a<la;a++){
                let index=floor(random(0,list[group[a]].length))
                let price=round(random(cost[group[a]][0],cost[group[a]][1]))
                this.purchases.push(new purchase(this.layer,this.battle,-1,350+a*100,200,1,[price,price],[list[group[a]][index],0,0]))
                list[group[a]].splice(index,1)
            }
            group=[0,0,0,1,1,1,2,2,3,3]
            cost=[[160,200],[280,350],[400,500],[240,300]]
            list=this.battle.relicManager.makeRelicSelection(group)
            let index=floor(random(0,group.length))
            for(let a=0,la=group.length;a<la;a++){
                let price=round(random(cost[group[a]][0],cost[group[a]][1]))
                this.purchases.push(new purchase(this.layer,this.battle,-1,112.5+a*75,75,3,[this.battle.relicManager.hasRelic(85,0)&&a==index?0:price,this.battle.relicManager.hasRelic(85,1)&&a==index?0:price],[list[a]]))
            }
            this.purchases.push(new purchase(this.layer,this.battle,0,150,200,2,[this.battle.relicManager.hasRelic(97,0)?120:200,this.battle.relicManager.hasRelic(97,1)?120:200],[]))
            this.purchases.push(new purchase(this.layer,this.battle,1,750,200,2,[this.battle.relicManager.hasRelic(97,0)?120:200,this.battle.relicManager.hasRelic(97,1)?120:200],[]))
        }
    }
    bogo(player,type){
        let list=[]
        for(let a=0,la=this.purchases.length;a<la;a++){
            if(this.purchases[a].type==type&&this.purchases[a].cost[player]>0&&this.purchases[a].usable){
                list.push(a)
            }
        }
        if(list.length>0){
            this.purchases[list[floor(random(0,list.length))]].cost[player]=0
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
        this.purchases.forEach(purchase=>purchase.update())
    }
    onClick(){
        this.purchases.forEach(purchase=>purchase.onClick())
    }
    onKey(key,code){
        this.purchases.forEach(purchase=>purchase.onKey(key,code))
    }
}