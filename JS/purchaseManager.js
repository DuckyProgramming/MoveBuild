class purchaseManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.purchases=[]
    }
    setup(type){
        this.purchases=[]
        switch(type){
            case 0:
                if(this.battle.tutorialManager.active){
                    let sale=floor(random(0,8))
                    let group=[0,0,0,0,1,1,1,2]
                    let cost=[[60,75],[100,125],[160,200]]
                    for(let a=0,la=group.length;a<la;a++){
                        this.purchases.push(new purchase(this.layer,this.battle,0,100+a%4*150,112.5+floor(a/4)*187.5,1,[round(random(cost[group[a]][0],cost[group[a]][1]))],[findName(['Placeholder\nCommon','Placeholder\nUncommon','Placeholder\nRare'][group[a]],types.card),0,0,sale==a]))
                    }
                    group=[1,1,2]
                    cost=[[120,150],[180,225],[300,375]]
                    for(let a=0,la=group.length;a<la;a++){
                        this.purchases.push(new purchase(this.layer,this.battle,0,100+a*150,487.5,1,[round(random(cost[group[a]][0],cost[group[a]][1]))],[findName(['','Colorless\nUncommon','Colorless\nRare'][group[a]],types.card),0,0]))
                    }
                    group=[0,0,0,1,1,1,2,2,3,3]
                    cost=[[160,200],[240,300],[400,500],[200,250]]
                    let list=findInternal('Placeholder',types.relic)
                    let index=floor(random(0,group.length))
                    for(let a=0,la=group.length;a<la;a++){
                        this.purchases.push(new purchase(this.layer,this.battle,0,700+(a%2)*100,100+floor(a/2)*100,3,[this.battle.relicManager.hasRelic(85,-1)&&a==index?0:round(random(cost[group[a]][0],cost[group[a]][1]))],[list]))
                    }
                    this.purchases.push(new purchase(this.layer,this.battle,0,550,487.5,2,[200],[]))
                }else if(this.battle.players==1){
                    if(this.battle.currency.money[0]>100){
                        let sale=floor(random(0,8))
                        let list=variants.junk?quadroArray(copyArray(this.battle.cardManagers[0].listing.junk[game.playerNumber+1])):variants.ultraprism?copyArrayStack(this.battle.cardManagers[0].listing.all):variants.prism?copyArrayStack(this.battle.cardManagers[0].listing.allPlayerCard):copyArrayStack(this.battle.cardManagers[0].listing.card[this.battle.player[0]])
                        let group=[0,0,0,0,1,1,1,2]
                        let cost=[[60,75],[100,125],[160,200]]
                        for(let a=0,la=group.length;a<la;a++){
                            let index=floor(random(0,list[group[a]].length))
                            this.purchases.push(new purchase(this.layer,this.battle,0,100+a%4*150,112.5+floor(a/4)*187.5,1,[round(random(cost[group[a]][0],cost[group[a]][1]))],[list[group[a]][index],0,variants.junk?types.card[list[group[a]][index]].list:variants.ultraprism?(types.card[list[group[a]][index]].list<0?0:types.card[list[group[a]][index]].list>=types.color.card.length?0:types.card[list[group[a]][index]].list):variants.prism?types.card[list[group[a]][index]].list:this.battle.player[0],sale==a]))
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
                        cost=[[160,200],[240,300],[400,500],[200,250]]
                        list=this.battle.relicManager.makeRelicSelection(group)
                        let index=floor(random(0,group.length))
                        for(let a=0,la=group.length;a<la;a++){
                            this.purchases.push(new purchase(this.layer,this.battle,0,700+(a%2)*100,100+floor(a/2)*100,3,[this.battle.relicManager.hasRelic(85,-1)&&a==index?0:round(random(cost[group[a]][0],cost[group[a]][1]))],[list[a]]))
                        }
                        this.purchases.push(new purchase(this.layer,this.battle,0,550,487.5,2,[this.battle.relicManager.hasRelic(97,0)?120:200],[]))
                    }else{
                        let list=variants.junk?quadroArray(copyArray(this.battle.cardManagers[0].listing.junk[game.playerNumber+1])):variants.ultraprism?copyArrayStack(this.battle.cardManagers[0].listing.all):variants.prism?copyArrayStack(this.battle.cardManagers[0].listing.allPlayerCard):copyArrayStack(this.battle.cardManagers[0].listing.card[this.battle.player[0]])
                        let index=floor(random(0,list[3].length))
                        this.purchases.push(new purchase(this.layer,this.battle,0,450,300,4,[0],[list[3][index],0,variants.junk?types.card[list[3][index]].list:variants.ultraprism?(types.card[list[3][index]].list<0?0:types.card[list[3][index]].list>=types.color.card.length?0:types.card[list[3][index]].list):variants.prism?types.card[list[3][index]].list:this.battle.player[0]]))
                        if(this.purchases[this.purchases.length-1].remove){
                            this.purchases.splice(this.purchases.length-1,1)
                        }
                    }
                }else{
                    if(this.battle.currency.money[0]>100&&this.battle.currency.money[1]>100){
                        for(let a=0,la=this.battle.players;a<la;a++){
                            let sale=floor(random(0,8))
                            let list=variants.junk?quadroArray(copyArray(this.battle.cardManagers[0].listing.junk[game.playerNumber+1])):variants.ultraprism?copyArrayStack(this.battle.cardManagers[0].listing.all):variants.prism?copyArrayStack(this.battle.cardManagers[a].listing.allPlayerCard):copyArrayStack(this.battle.cardManagers[a].listing.card[this.battle.player[a]])
                            let group=[0,0,0,0,1,1,1,2]
                            let cost=[[80,100],[120,150],[200,250]]
                            for(let b=0,lb=group.length;b<lb;b++){
                                let index=floor(random(0,list[group[b]].length))
                                let price=round(random(cost[group[b]][0],cost[group[b]][1]))
                                this.purchases.push(new purchase(this.layer,this.battle,a,this.layer.width*a+(100+(b%4*100))*(1-a*2),350+floor(b/4)*150,1,[price,price],[list[group[b]][index],0,variants.junk?types.card[list[group[a]][index]].list:variants.ultraprism?(types.card[list[group[b]][index]].list<0?0:types.card[list[group[b]][index]].list>=types.color.card.length?0:types.card[list[group[b]][index]].list):variants.prism?types.card[list[group[b]][index]].list:this.battle.player[a],sale==b]))
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
                        cost=[[160,200],[240,300],[400,500],[200,250]]
                        list=this.battle.relicManager.makeRelicSelection(group)
                        let index=floor(random(0,group.length))
                        for(let a=0,la=group.length;a<la;a++){
                            let price=round(random(cost[group[a]][0],cost[group[a]][1]))
                            this.purchases.push(new purchase(this.layer,this.battle,-1,112.5+a*75,75,3,[this.battle.relicManager.hasRelic(85,0)&&a==index?0:price,this.battle.relicManager.hasRelic(85,1)&&a==index?0:price],[list[a]]))
                        }
                        list=copyArrayStack(this.battle.cardManagers[0].listing.card[game.playerNumber+3])
                        group=[0,1]
                        cost=[[100,125],[140,175],[260,325]]
                        for(let a=0,la=group.length;a<la;a++){
                            let index=floor(random(0,list[group[a]].length))
                            let price=round(random(cost[group[a]][0],cost[group[a]][1]))
                            this.purchases.push(new purchase(this.layer,this.battle,-1,250+a*400,200,1,[price,price],[list[group[a]][index],0,game.playerNumber+3]))
                            list[group[a]].splice(index,1)
                        }
                        this.purchases.push(new purchase(this.layer,this.battle,0,150,200,2,[this.battle.relicManager.hasRelic(97,0)?120:200,this.battle.relicManager.hasRelic(97,1)?120:200],[]))
                        this.purchases.push(new purchase(this.layer,this.battle,1,750,200,2,[this.battle.relicManager.hasRelic(97,0)?120:200,this.battle.relicManager.hasRelic(97,1)?120:200],[]))
                    }else{
                        for(let a=0,la=2;a<la;a++){
                            let list=variants.junk?quadroArray(copyArray(this.battle.cardManagers[a].listing.junk[game.playerNumber+1])):variants.ultraprism?copyArrayStack(this.battle.cardManagers[a].listing.all):variants.prism?copyArrayStack(this.battle.cardManagers[a].listing.allPlayerCard):copyArrayStack(this.battle.cardManagers[a].listing.card[this.battle.player[a]])
                            let index=floor(random(0,list[3].length))
                            this.purchases.push(new purchase(this.layer,this.battle,a,225+a*450,300,4,[0,0],[list[3][index],0,variants.junk?types.card[list[3][index]].list:variants.ultraprism?(types.card[list[3][index]].list<0?0:types.card[list[3][index]].list>=types.color.card.length?0:types.card[list[3][index]].list):variants.prism?types.card[list[3][index]].list:this.battle.player[0]]))
                            if(this.purchases[this.purchases.length-1].remove){
                                this.purchases.splice(this.purchases.length-1,1)
                            }
                        }
                    }
                }
            break
            case 1:
                if(this.battle.players==1){
                    let group=[0,0,0,0,0,1,1,1,1,1,2,2,2,2,3,3,3,3]
                    let cost=[[128,160],[192,240],[320,400],[160,200]]
                    let list=this.battle.relicManager.makeRelicSelection(group)
                    let index=floor(random(0,group.length))
                    for(let a=0,la=group.length;a<la;a++){
                        this.purchases.push(new purchase(this.layer,this.battle,0,200+(a%6)*100,200+floor(a/6)*100,3,[this.battle.relicManager.hasRelic(85,-1)&&a==index?0:round(random(cost[group[a]][0],cost[group[a]][1]))],[list[a]]))
                    }
                }else{
                    let group=[0,0,0,0,0,1,1,1,1,1,2,2,2,2,3,3,3,3]
                    let cost=[[128,160],[192,240],[320,400],[160,200]]
                    let list=this.battle.relicManager.makeRelicSelection(group)
                    let index=floor(random(0,group.length))
                    for(let a=0,la=group.length;a<la;a++){
                        let price=round(random(cost[group[a]][0],cost[group[a]][1]))
                        this.purchases.push(new purchase(this.layer,this.battle,-1,200+(a%6)*100,200+floor(a/6)*100,3,[this.battle.relicManager.hasRelic(85,0)&&a==index?0:price,this.battle.relicManager.hasRelic(85,1)&&a==index?0:price],[list[a]]))
                    }
                }
            break
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