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
            group=[0,0,0,1,1,1,2,2]
            cost=[[160,200],[280,350],[400,500]]
            list=this.battle.relicManager.makeRelicSelection(group)
            let index=floor(random(0,group.length))
            for(let a=0,la=group.length;a<la;a++){
                if(this.battle.relicManager.hasRelic(85,-1)&&a==index){
                    this.purchases.push(new purchase(this.layer,this.battle,0,700+(a%2)*100,100+floor(a/2)*125,3,[0],[list[a]]))
                }else{
                    this.purchases.push(new purchase(this.layer,this.battle,0,700+(a%2)*100,100+floor(a/2)*125,3,[round(random(cost[group[a]][0],cost[group[a]][1]))],[list[a]]))
                }
            }
            this.purchases.push(new purchase(this.layer,this.battle,0,550,487.5,2,[100],[]))
        }else{
            for(let a=0,la=this.battle.player.length;a<la;a++){
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
            group=[0,0,0,1,1,1,2,2]
            cost=[[160,200],[280,350],[400,500]]
            list=this.battle.relicManager.makeRelicSelection(group)
            let index=floor(random(0,group.length))
            for(let a=0,la=group.length;a<la;a++){
                let price=round(random(cost[group[a]][0],cost[group[a]][1]))
                if(this.battle.relicManager.hasRelic(85,0)&&a==index){
                    this.purchases.push(new purchase(this.layer,this.battle,-1,100+a*100,75,3,[0,price],[list[a]]))
                }else if(this.battle.relicManager.hasRelic(85,1)&&a==index){
                    this.purchases.push(new purchase(this.layer,this.battle,-1,100+a*100,75,3,[price,0],[list[a]]))
                }else{
                    this.purchases.push(new purchase(this.layer,this.battle,-1,100+a*100,75,3,[price,price],[list[a]]))
                }
            }
            this.purchases.push(new purchase(this.layer,this.battle,0,150,200,2,[100,100],[]))
            this.purchases.push(new purchase(this.layer,this.battle,1,750,200,2,[100,100],[]))
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