class purchaseManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.purchases=[]
        this.rerollActive=[false,false]
        this.free=[0,0]
        this.scroll=0
        this.goalScroll=0
        this.setupKey=0
        this.anim={scroll:[0,0]}
    }
    save(){
        let composite={
            free:this.free
        }
        return composite
    }
    load(composite){
        this.free=composite.free
    }
    generalizedListing(type){
        switch(type){
            case 0:
                return variants.business?[[80,100],[180,225],[480,600]]:[[80,100],[120,150],[240,300]]
            case 1:
                return variants.business?[[100,125],[240,360],[600,750]]:[[100,125],[160,240],[400,500]]
            case 2:
                return variants.business?[[144,180],[324,405],[540,675],[252,315]]:[[144,180],[216,270],[360,450],[180,225]]
        }
    }
    setup(type){
        this.scroll=0
        this.goalScroll=0
        this.purchases=[]
        switch(type){
            case 0:
                if(this.battle.tutorialManager.active){
                    let sale=floor(random(0,8))
                    let group=this.battle.modded(153)?[0,0,0,0,0,0,0,0,0,0,0,0]:variants.commoners?[0,0,0,0,0,0,0,0,0,1,1,2]:[0,0,0,0,0,0,1,1,1,1,2,2]
                    let cost=this.generalizedListing(0)
                    for(let a=0,la=group.length;a<la;a++){
                        this.purchases.push(new purchase(this.layer,this.battle,0,95+a%6*130,130+floor(a/6)*170,1,
                            [this.battle.relicManager.hasRelic([216,267,268][group[a]],0)?0:round(random(cost[group[a]][0],cost[group[a]][1])*(sale==a?(this.battle.modded(234)?2:0.5):1))],
                            [findName(['Placeholder\nCommon','Placeholder\nUncommon','Placeholder\nRare'][group[a]],types.card),0,0,sale==a],
                            group[a]+1
                        ))
                    }
                    let bar=floor(random(0,2))
                    group=this.battle.modded(153)?[0,0,0,0,0]:variants.commoners?[0,0,0,0,bar+1]:[0,0,bar,1,2]
                    cost=this.generalizedListing(1)
                    for(let a=0,la=group.length;a<la;a++){
                        this.purchases.push(new purchase(this.layer,this.battle,0,95+a*130,470,1,
                            [round(random(cost[group[a]][0],cost[group[a]][1]))],
                            [findName(['Colorless\nCommon','Colorless\nUncommon','Colorless\nRare'][group[a]],types.card),0,0],
                            group[a]+4
                        ))
                    }
                    this.purchases.push(new purchase(this.layer,this.battle,0,745,470,2,
                        [this.battle.relicManager.hasRelic(97,0)?125:250],
                        [],
                        0
                    ))
                    for(let a=0,la=3;a<la;a++){
                        this.purchases.push(new purchase(this.layer,this.battle,0,1040,160+a*140,5,
                            [100],
                            [4],
                            13
                        ))
                    }
                    group=this.battle.modded(152)?[0,0,0,0,0,0,0,0,0,0]:[0,0,0,0,1,1,2,2,3,3]
                    cost=this.generalizedListing(2)
                    let list=findInternal('Placeholder',types.relic)
                    let index=floor(random(0,group.length))
                    for(let a=0,la=group.length;a<la;a++){
                        let price=round(random(cost[group[a]][0],cost[group[a]][1]))
                        this.purchases.push(new purchase(this.layer,this.battle,0,855+(a%2)*90,100+floor(a/2)*100,3,
                            [this.battle.relicManager.hasRelic(85,-1)&&a==index?0:price*(this.battle.relicManager.hasRelic([302,303,304,305][group[a]],0)?0.5:1)*(this.battle.relicManager.hasRelic(345,0)?2:1)],
                            [list],
                            group[a]+9
                        ))
                    }
                }else if(this.battle.players==1){
                    if(this.battle.currency.money[0]>=100){
                        let sale=floor(random(0,8))
                        let list=variants.ultraprism?copyArrayStack(this.battle.cardManagers[0].listing.all):variants.prism?copyArrayStack(this.battle.cardManagers[0].listing.allPlayerCard):variants.mtg?copyArrayStack(this.battle.cardManagers[0].listing.mtg[0]):variants.junk?quadroArray(copyArray(this.battle.cardManagers[0].listing.junk[constants.playerNumber+1])):copyArrayStack(this.battle.cardManagers[0].listing.card[this.battle.player[0]])
                        let group=this.battle.modded(153)?[0,0,0,0,0,0,0,0,0,0,0,0]:variants.commoners?[0,0,0,0,0,0,0,0,0,1,1,2]:[0,0,0,0,0,0,1,1,1,1,2,2]
                        let cost=this.generalizedListing(0)
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
                        for(let a=0,la=group.length;a<la;a++){
                            if(list[group[a]].length>0){
                                let index=floor(random(0,list[group[a]].length))
                                this.purchases.push(new purchase(this.layer,this.battle,0,95+a%6*130,130+floor(a/6)*170,1,
                                    [this.battle.relicManager.hasRelic([216,267,268][group[a]],0)?0:round(random(cost[group[a]][0],cost[group[a]][1])*(sale==a?(this.battle.modded(234)?2:0.5):1))],
                                    [list[group[a]][index],0,this.battle.standardColorize(list[group[a]][index]),sale==a],
                                    group[a]+1
                                ))
                                list[group[a]].splice(index,1)
                                if(variants.colorshift){
                                    (variants.ultraprism?this.battle.cardManagers[0].listing.all[group[a]]:variants.prism?this.battle.cardManagers[0].listing.allPlayerCard[group[a]]:variants.mtg?this.battle.cardManagers[0].listing.mtg[0][group[a]]:variants.junk?this.battle.cardManagers[0].listing.junk[constants.playerNumber+1]:this.battle.cardManagers[0].listing.card[this.battle.player[0]][group[a]]).splice(index,1)
                                    if(!variants.ultraprism&&!variants.prism&&!variants.mtg&&!variants.junk){
                                        let possible=[]
                                        for(let b=0,lb=constants.playerNumber;b<lb;b++){
                                            if(!this.battle.player.includes(b+1)){
                                                possible.push(b+1)
                                            }
                                        }
                                        let type=possible[floor(random(0,possible.length))]
                                        if(this.battle.cardManagers[0].listing.card[type][group[a]].length>0){
                                            let index=floor(random(0,this.battle.cardManagers[0].listing.card[type][group[a]].length))
                                            this.battle.cardManagers[0].listing.card[this.battle.player[0]][group[a]].push(this.battle.cardManagers[0].listing.card[type][group[a]][index])
                                            this.battle.cardManagers[0].listing.card[type][group[a]].splice(index,1)
                                        }
                                    }
                                }
                            }
                        }
                        list=variants.ultraprism?copyArrayStack(this.battle.cardManagers[0].listing.all):variants.prism?copyArrayStack(this.battle.cardManagers[0].listing.allPlayerCard):variants.mtg?copyArrayStack(this.battle.cardManagers[0].listing.mtg[1][0]):variants.junk?quadroArray(copyArray(this.battle.cardManagers[0].listing.junk[constants.playerNumber+1])):copyArrayStack(this.battle.cardManagers[0].listing.card[0])
                        let bar=floor(random(0,2))
                        group=this.battle.modded(153)?[0,0,0,0,0]:variants.commoners?[0,0,0,0,bar+1]:[0,0,bar,1,2]
                        cost=this.generalizedListing(1)
                        for(let a=0,la=group.length;a<la;a++){
                            if(list[group[a]].length>0){
                                let index=floor(random(0,list[group[a]].length))
                                this.purchases.push(new purchase(this.layer,this.battle,0,95+a*130,470,1,
                                    [round((this.battle.relicManager.hasRelic([269,300,301][group[a]],0)?0.5:1)*random(cost[group[a]][0],cost[group[a]][1]))],
                                    [list[group[a]][index],0,this.battle.standardColorize(list[group[a]][index])],
                                    group[a]+4
                                ))
                                list[group[a]].splice(index,1)
                            }
                        }
                        this.purchases.push(new purchase(this.layer,this.battle,0,745,470,2,
                            [this.battle.relicManager.hasRelic(97,0)?125:250],
                            [],
                            0
                        ))
                        for(let a=0,la=3;a<la;a++){
                            let type=[0,0,1,2,3][floor(random(0,5))]
                            this.purchases.push(new purchase(this.layer,this.battle,0,1040,160+a*140,5,
                                [(this.battle.relicManager.hasRelic([270,271,272,273][type],0)?0.5:1)*[100,160,200,80][type]],
                                [type],
                                type+9
                            ))
                        }
                        group=this.battle.modded(152)?[0,0,0,0,0,0,0,0,0,0]:[0,0,0,0,1,1,2,2,3,3]
                        cost=this.generalizedListing(2)
                        list=this.battle.relicManager.makeRelicSelection(group)
                        let index=floor(random(0,group.length))
                        for(let a=0,la=group.length;a<la;a++){
                            let price=list[a]==516?0:round(random(cost[group[a]][0],cost[group[a]][1]))
                            this.purchases.push(new purchase(this.layer,this.battle,0,855+(a%2)*90,100+floor(a/2)*100,3,
                                [this.battle.relicManager.hasRelic(85,-1)&&a==index?0:price*(this.battle.relicManager.hasRelic([302,303,304,305][group[a]],0)?0.5:1)*(this.battle.relicManager.hasRelic(345,0)?2:1)],
                                [list[a]],
                                group[a]+14
                            ))
                        }
                    }else{
                        let list=variants.ultraprism?copyArrayStack(this.battle.cardManagers[0].listing.all):variants.prism?copyArrayStack(this.battle.cardManagers[0].listing.allPlayerCard):variants.mtg?copyArrayStack(this.battle.cardManagers[0].listing.mtg[0]):variants.junk?quadroArray(copyArray(this.battle.cardManagers[0].listing.junk[constants.playerNumber+1])):copyArrayStack(this.battle.cardManagers[0].listing.card[this.battle.player[0]])
                        let valid=[]
                        for(let a=0,la=this.battle.cardManagers[0].deck.cards.length;a<la;a++){
                            if(!this.battle.cardManagers[0].deck.cards[a].basic&&!this.battle.cardManagers[0].deck.cards[a].spec.includes(80)){
                                valid.push(a)
                            }
                        }
                        for(let a=0,la=2;a<la;a++){
                            if(valid.length>0){
                                let index=floor(random(0,list[3].length))
                                let index2=floor(random(0,valid.length))
                                this.purchases.push(new purchase(this.layer,this.battle,0,450,210+a*240,4,
                                    [0],
                                    [list[3][index],0,this.battle.standardColorize(list[3][index]),valid[index2]],
                                    19
                                ))
                                list[3].splice(index,1)
                                valid.splice(index2,1)
                            }
                        }
                    }
                }else{
                    if(this.battle.currency.money[0]>=100&&this.battle.currency.money[1]>=100){
                        for(let a=0,la=this.battle.players;a<la;a++){
                            let sale=floor(random(0,8))
                            let list=variants.mtg?copyArrayStack(this.battle.cardManagers[a].listing.mtg[0]):variants.junk?quadroArray(copyArray(this.battle.cardManagers[a].listing.junk[constants.playerNumber+1])):variants.ultraprism?copyArrayStack(this.battle.cardManagers[a].listing.all):variants.prism?copyArrayStack(this.battle.cardManagers[a].listing.allPlayerCard):copyArrayStack(this.battle.cardManagers[a].listing.card[this.battle.player[a]])
                            let group=this.battle.modded(153)?[0,0,0,0,0,0,0,0,0,0,0,0]:variants.commoners?[0,0,0,0,0,0,0,0,0,1,1,2]:[0,0,0,0,0,0,1,1,1,1,2,2]
                            let cost=this.generalizedListing(0)
                            if(variants.mtg){
                                for(let b=0,lb=list.length;b<lb;b++){
                                    for(let c=0,lc=list[b].length;c<lc;c++){
                                        if(types.card[list[b][c]].mtg.list==-1&&types.card[list[b][c]].mtg.color[0]!=0&&floor(random(0,4))!=0){
                                            list[b].splice(c,1)
                                            c--
                                            lc--
                                        }
                                    }
                                }
                            }
                            for(let b=0,lb=group.length;b<lb;b++){
                                if(list[group[b]].length>0){
                                    let index=floor(random(0,list[group[b]].length))
                                    let price=round(random(cost[group[b]][0],cost[group[b]][1])*(sale==b?(this.battle.modded(234)?2:0.5):1))
                                    this.purchases.push(new purchase(this.layer,this.battle,a,450+(905-b%4*130)*(a*2-1),130+floor(b/4)*170,1,
                                        [this.battle.relicManager.hasRelic([216,267,268][group[b]],0)?0:price,group[b]==0&&this.battle.relicManager.hasRelic(216,1)?0:price],
                                        [list[group[b]][index],0,this.battle.standardColorize(list[group[b]][index]),sale==b],
                                        group[b]+1
                                    ))
                                    list[group[b]].splice(index,1)
                                    if(variants.colorshift){
                                        (variants.ultraprism?this.battle.cardManagers[a].listing.all[group[b]]:variants.prism?this.battle.cardManagers[a].listing.allPlayerCard[group[b]]:variants.mtg?this.battle.cardManagers[a].listing.mtg[0][group[b]]:variants.junk?this.battle.cardManagers[a].listing.junk[constants.playerNumber+1]:this.battle.cardManagers[a].listing.card[this.battle.player[a]][group[b]]).splice(index,1)
                                        if(!variants.ultraprism&&!variants.prism&&!variants.mtg&&!variants.junk){
                                            let possible=[]
                                            for(let c=0,lc=constants.playerNumber;c<lc;c++){
                                                if(!this.battle.player.includes(c+1)){
                                                    possible.push(c+1)
                                                }
                                            }
                                            let type=possible[floor(random(0,possible.length))]
                                            if(this.battle.cardManagers[a].listing.card[type][group[b]].length>0){
                                                let index=floor(random(0,this.battle.cardManagers[a].listing.card[type][group[b]].length))
                                                this.battle.cardManagers[a].listing.card[this.battle.player[a]][group[b]].push(this.battle.cardManagers[a].listing.card[type][group[b]][index])
                                                this.battle.cardManagers[a].listing.card[type][group[b]].splice(index,1)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        let list=variants.mtg?copyArrayStack(this.battle.cardManagers[0].listing.mtg[1][0]):variants.ultraprism?copyArrayStack(this.battle.cardManagers[0].listing.all):variants.prism?copyArrayStack(this.battle.cardManagers[0].listing.allPlayerCard):variants.junk?quadroArray(copyArray(this.battle.cardManagers[0].listing.junk[constants.playerNumber+1])):copyArrayStack(this.battle.cardManagers[0].listing.card[0])
                        let group=this.battle.modded(153)?[0,0,0,0,0,0,0,0]:variants.commoners?[0,0,0,0,0,1+bar,2-bar,0]:[0,0,0,0,1,2,2,1]
                        let cost=this.generalizedListing(1)
                        for(let a=0,la=group.length;a<la;a++){
                            if(list[group[a]].length>0){
                                let index=floor(random(0,list[group[a]].length))
                                let price=random(cost[group[a]][0],cost[group[a]][1])
                                this.purchases.push(new purchase(this.layer,this.battle,-1,[65,195,705,835][a%4],130+floor(a/4)*170,1,
                                    [round((this.battle.relicManager.hasRelic([269,300,301][group[a]],0)?0.5:1)*price),round((this.battle.relicManager.hasRelic([269,300,301][group[a]],1)?0.5:1)*price)],
                                    [list[group[a]][index],0,this.battle.standardColorize(list[group[a]][index])],
                                    group[a]+4
                                ))
                                list[group[a]].splice(index,1)
                            }
                        }
                        group=this.battle.modded(152)?[0,0,0,0,0,0,0,0,0,0]:[0,0,0,0,1,1,2,2,3,3]
                        cost=this.generalizedListing(2)
                        list=this.battle.relicManager.makeRelicSelection(group)
                        let index=floor(random(0,group.length))
                        for(let a=0,la=group.length;a<la;a++){
                            let price=list[a]==516?0:round(random(cost[group[a]][0],cost[group[a]][1]))
                            this.purchases.push(new purchase(this.layer,this.battle,-1,305+a%2*290,100+floor(a/2)*100,3,
                                [
                                    this.battle.relicManager.hasRelic(85,0)&&a==index?0:price*(this.battle.relicManager.hasRelic([302,303,304,305][group[a]],0)?0.5:1)*(this.battle.relicManager.hasRelic(345,0)?2:1),
                                    this.battle.relicManager.hasRelic(85,1)&&a==index?0:price*(this.battle.relicManager.hasRelic([302,303,304,305][group[a]],1)?0.5:1)*(this.battle.relicManager.hasRelic(345,1)?2:1)
                                ],
                                [list[a]],
                                group[a]+14
                            ))
                        }
                        for(let a=0,la=this.battle.players;a<la;a++){
                            this.purchases.push(new purchase(this.layer,this.battle,-1,65+a*770,470,2,
                                [this.battle.relicManager.hasRelic(97,0)?125:250,this.battle.relicManager.hasRelic(97,1)?125:250],
                                [],
                                0
                            ))
                        }
                        for(let a=0,la=6;a<la;a++){
                            let type=[0,0,1,2,3][floor(random(0,5))]
                            this.purchases.push(new purchase(this.layer,this.battle,-1,400+a%2*100,160+floor(a/2)*140,5,
                                [(this.battle.relicManager.hasRelic([270,271,272,273][type],0)?0.5:1)*[100,160,200,80][type],(this.battle.relicManager.hasRelic([270,271,272,273][type],1)?0.5:1)*[100,160,200,80][type]],
                                [type],
                                type+9
                            ))
                        }
                        list=variants.mtg?copyArrayStack(this.battle.cardManagers[0].listing.mtg[1][constants.playerNumber+3]):copyArrayStack(this.battle.cardManagers[0].listing.card[constants.playerNumber+3])
                        let bar=floor(random(0,2))
                        group=this.battle.modded(153)?[0,0]:variants.commoners?[[0,bar],[bar,0]][floor(random(0,2))]:[bar,1-bar]
                        if(!this.battle.modded(153)&&floor(random(0,4))==0&&!(variants.commoners&&floor(random(0,2))==0)){
                            group[floor(random(0,group.length))]=2
                        }
                        cost=[[100,125],[140,175],[260,325]]
                        for(let a=0,la=group.length;a<la;a++){
                            if(list[group[a]].length>0){
                                let index=floor(random(0,list[group[a]].length))
                                let price=round(random(cost[group[a]][0],cost[group[a]][1]))
                                this.purchases.push(new purchase(this.layer,this.battle,-1,195+a*510,470,1,
                                    [price,price],
                                    [list[group[a]][index],0,constants.playerNumber+3],
                                    group[a]+7
                                ))
                                list[group[a]].splice(index,1)
                            }
                        }
                    }else{
                        for(let a=0,la=this.battle.players;a<la;a++){
                            let list=variants.mtg?copyArrayStack(this.battle.cardManagers[a].listing.mtg[0]):variants.junk?quadroArray(copyArray(this.battle.cardManagers[a].listing.junk[constants.playerNumber+1])):variants.ultraprism?copyArrayStack(this.battle.cardManagers[a].listing.all):variants.prism?copyArrayStack(this.battle.cardManagers[a].listing.allPlayerCard):copyArrayStack(this.battle.cardManagers[a].listing.card[this.battle.player[a]])
                            let valid=[]
                            for(let b=0,lb=this.battle.cardManagers[a].deck.cards.length;b<lb;b++){
                                if(!this.battle.cardManagers[a].deck.cards[b].basic&&!this.battle.cardManagers[a].deck.cards[b].spec.includes(80)){
                                    valid.push(b)
                                }
                            }
                            for(let b=0,lb=2;b<lb;b++){
                                if(valid.length>0){
                                    let index=floor(random(0,list[3].length))
                                    let index2=floor(random(0,valid.length))
                                    this.purchases.push(new purchase(this.layer,this.battle,a,270+a*360,210+b*240,4,
                                        [0,0],
                                        [list[3][index],0,this.battle.standardColorize(list[3][index]),valid[index2]],
                                        19
                                    ))
                                    list[3].splice(index,1)
                                    valid.splice(index2,1)
                                }
                            }
                        }
                    }
                }
                for(let a=0,la=this.battle.players;a<la;a++){
                    if(this.free[a]>0){
                        for(let b=0,lb=this.free[a];b<lb;b++){
                            let list=[]
                            for(let c=0,lc=this.purchases.length;c<lc;c++){
                                if((this.purchases[c].player==a||this.purchases[c].player==-1)&&this.purchases[c].cost[a]>0){
                                    list.push(c)
                                }
                            }
                            this.purchases[list[floor(random(list.length))]].cost[a]=0
                        }
                    }
                    this.free[a]=0
                }
            break
            case 1:
                if(this.battle.players==1){
                    let group=this.battle.modded(152)?[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]:[0,0,0,0,0,1,1,1,1,1,2,2,2,2,3,3,3,3]
                    let cost=[[96,120],[144,180],[240,300],[120,150]]
                    let list=this.battle.relicManager.makeRelicSelection(group)
                    let index=floor(random(0,group.length))
                    for(let a=0,la=group.length;a<la;a++){
                        let price=list[a]==516?0:round(random(cost[group[a]][0],cost[group[a]][1]))
                        this.purchases.push(new purchase(this.layer,this.battle,0,200+(a%6)*100,200+floor(a/6)*100,3,
                            [this.battle.relicManager.hasRelic(85,-1)&&a==index?0:price*(this.battle.relicManager.hasRelic([302,303,304,305][group[a]],0)?0.5:1)*(this.battle.relicManager.hasRelic(345,0)?2:1)],
                            [list[a]],
                            group[a]+20
                        ))
                    }
                }else{
                    let group=this.battle.modded(152)?[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]:[0,0,0,0,0,1,1,1,1,1,2,2,2,2,3,3,3,3]
                    let cost=[[96,120],[144,180],[240,300],[120,150]]
                    let list=this.battle.relicManager.makeRelicSelection(group)
                    let index=floor(random(0,group.length))
                    for(let a=0,la=group.length;a<la;a++){
                        let price=list[a]==516?0:round(random(cost[group[a]][0],cost[group[a]][1]))
                        this.purchases.push(new purchase(this.layer,this.battle,-1,200+(a%6)*100,200+floor(a/6)*100,3,
                            [
                                this.battle.relicManager.hasRelic(85,0)&&a==index?0:price*(this.battle.relicManager.hasRelic([302,303,304,305][group[a]],0)?0.5:1)*(this.battle.relicManager.hasRelic(345,0)?2:1),
                                this.battle.relicManager.hasRelic(85,1)&&a==index?0:price*(this.battle.relicManager.hasRelic([302,303,304,305][group[a]],1)?0.5:1)*(this.battle.relicManager.hasRelic(345,1)?2:1)
                            ],
                            [list[a]],
                            group[a]+20
                        ))
                    }
                }
            break
            case 2:
                if(this.battle.players==1){
                    let list=variants.ultraprism?copyArrayStack(this.battle.cardManagers[0].listing.all):variants.prism?copyArrayStack(this.battle.cardManagers[0].listing.allPlayerCard):variants.mtg?copyArrayStack(this.battle.cardManagers[0].listing.mtg[0]):variants.junk?quadroArray(copyArray(this.battle.cardManagers[0].listing.junk[constants.playerNumber+1])):copyArrayStack(this.battle.cardManagers[0].listing.card[this.battle.player[0]])
                    let valid=[]
                    for(let a=0,la=this.battle.cardManagers[0].deck.cards.length;a<la;a++){
                        if(!this.battle.cardManagers[0].deck.cards[a].basic&&!this.battle.cardManagers[0].deck.cards[a].spec.includes(80)){
                            valid.push(a)
                        }
                    }
                    for(let a=0,la=2;a<la;a++){
                        if(valid.length>0){
                            let index=floor(random(0,list[3].length))
                            let index2=floor(random(0,valid.length))
                            this.purchases.push(new purchase(this.layer,this.battle,0,450,210+a*240,4,
                                [0],
                                [list[3][index],0,this.battle.standardColorize(list[3][index]),valid[index2]],
                                19
                            ))
                            list[3].splice(index,1)
                            valid.splice(index2,1)
                        }
                    }
                }else{
                    for(let a=0,la=this.battle.players;a<la;a++){
                        let list=variants.mtg?copyArrayStack(this.battle.cardManagers[a].listing.mtg[0]):variants.junk?quadroArray(copyArray(this.battle.cardManagers[a].listing.junk[constants.playerNumber+1])):variants.ultraprism?copyArrayStack(this.battle.cardManagers[a].listing.all):variants.prism?copyArrayStack(this.battle.cardManagers[a].listing.allPlayerCard):copyArrayStack(this.battle.cardManagers[a].listing.card[this.battle.player[a]])
                        let valid=[]
                        for(let b=0,lb=this.battle.cardManagers[a].deck.cards.length;b<lb;b++){
                            if(!this.battle.cardManagers[a].deck.cards[b].basic&&!this.battle.cardManagers[a].deck.cards[b].spec.includes(80)){
                                valid.push(b)
                            }
                        }
                        for(let b=0,lb=2;b<lb;b++){
                            if(valid.length>0){
                                let index=floor(random(0,list[3].length))
                                let index2=floor(random(0,valid.length))
                                this.purchases.push(new purchase(this.layer,this.battle,a,270+a*360,210+b*240,4,
                                    [0,0],
                                    [list[3][index],0,this.battle.standardColorize(list[3][index]),valid[index2]],
                                    19
                                ))
                                list[3].splice(index,1)
                                valid.splice(index2,1)
                            }
                        }
                    }
                }
            break
            case 3:
                if(this.battle.players==1){
                    let group=[0,0,0,0,0,0,1,1,1,1,1,1,2,2,2,2,2,2]
                    let cost=[[16,20],[48,60],[80,100]]
                    let list=this.battle.itemManager.makeItemSelection(group)
                    for(let a=0,la=group.length;a<la;a++){
                        let price=round(random(cost[group[a]][0],cost[group[a]][1]))
                        this.purchases.push(new purchase(this.layer,this.battle,0,200+(a%6)*100,200+floor(a/6)*100,6,
                            [price],
                            [list[a]],
                            group[a]+20
                        ))
                    }
                }else{
                    let group=[0,0,0,0,0,0,1,1,1,1,1,1,2,2,2,2,2,2]
                    let cost=[[16,20],[48,60],[80,100]]
                    let list=this.battle.itemManager.makeItemSelection(group)
                    for(let a=0,la=group.length;a<la;a++){
                        let price=round(random(cost[group[a]][0],cost[group[a]][1]))
                        this.purchases.push(new purchase(this.layer,this.battle,-1,200+(a%6)*100,200+floor(a/6)*100,6,
                            [price,price],
                            [list[a]],
                            group[a]+20
                        ))
                    }
                }
            break
        }
        if(this.battle.modded(226)){
            this.purchases=this.purchases.filter(purchase=>purchase.tag<9||purchase.tag>13)
        }
        if(this.battle.modded(228)){
            this.purchases=this.purchases.filter(purchase=>purchase.tag<4||purchase.tag>6)
        }
        if(this.battle.modded(229)){
            this.purchases=this.purchases.filter(purchase=>floor(random(0,2))==0)
        }
    }
    reroll(){
        this.setupKey=15
        for(let a=0,la=this.purchases.length;a<la;a++){
            this.purchases[a].deSize=true
        }
    }
    costChange(player,tag,value){
        for(let a=0,la=this.purchases.length;a<la;a++){
            if(this.purchases[a].tag==tag&&(this.purchases[a].player==player||this.purchases[a].player==-1)){
                if(value==-1&&this.purchases[a].formerCost[this.purchases[a].player==-1?player:0]==0){
                    this.purchases[a].formerCost[this.purchases[a].player==-1?player:0]=[
                        200,

                        floor(random(60,70)),
                        floor(random(100,125)),
                        floor(random(160,200)),

                        floor(random(120,150)),
                        floor(random(200,250)),
                        floor(random(320,400)),

                        floor(random(100,125)),
                        floor(random(140,175)),

                        100,160,200,120,150,

                        floor(random(160,200)),
                        floor(random(240,300)),
                        floor(random(400,500)),
                        floor(random(200,250)),

                        0
                    ][this.purchases[a].tag]*(game.ascend>=16?1.1:1)*(this.battle.modded(130)>=16?2:1)
                }
                this.purchases[a].costChange(player,value)
            }
        }
        /*
        0 remove card
        1-3 character card
        4-6 colorless card
        7-8 ally card
        9-13 booster pack
        14-18 relic
        19 trade offer
        20-22 item
        */
    }
    editSelf(player,tag,type){
        for(let a=0,la=this.purchases.length;a<la;a++){
            if(this.purchases[a].tag==tag&&this.purchases[a].player==player){
                this.purchases[a].editSelf(type)
            }
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
        this.layer.noStroke()
        this.layer.fill(200,this.fade)
        this.layer.ellipse(this.layer.width/2,575,40)
        this.layer.fill(80+120*this.anim.scroll[0],this.fade)
        this.layer.ellipse(this.layer.width/2-50,575,40)
        this.layer.fill(80+120*this.anim.scroll[1],this.fade)
        this.layer.ellipse(this.layer.width/2+50,575,40)
        this.layer.stroke(100,this.fade)
        this.layer.strokeWeight(2)
        this.layer.noFill()
        this.layer.rect(this.layer.width/2,575,20)
        this.layer.line(this.layer.width/2+10,573,this.layer.width/2+1,573)
        this.layer.line(this.layer.width/2+10,577,this.layer.width/2+1,577)
        this.layer.line(this.layer.width/2+1,570,this.layer.width/2+1,573)
        this.layer.line(this.layer.width/2+1,580,this.layer.width/2+1,577)
        this.layer.line(this.layer.width/2+1,570,this.layer.width/2-6,575)
        this.layer.line(this.layer.width/2+1,580,this.layer.width/2-6,575)
        regTriangle(this.layer,this.layer.width/2-50,575,10,10,30)
        regTriangle(this.layer,this.layer.width/2+50,575,10,10,90)
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
        this.purchases.forEach(purchase=>purchase.displayInfo())
    }
    update(){
        this.purchases.forEach(purchase=>purchase.update())
        if(this.setupKey>0){
            this.setupKey--
            if(this.setupKey==0){
                this.setup(0)
            }
        }
        if(this.scroll<this.goalScroll-5){
            this.scroll+=25
            this.purchases.forEach(purchase=>purchase.position.x-=25)
        }else if(this.scroll>this.goalScroll+5){
            this.scroll-=25
            this.purchases.forEach(purchase=>purchase.position.x+=25)
        }
        switch(this.battle.players){
            case 1:
                this.anim.scroll[0]=smoothAnim(this.anim.scroll[0],this.goalScroll>210,0,1,5)
                this.anim.scroll[1]=smoothAnim(this.anim.scroll[1],this.goalScroll<10,0,1,5)
            break
            case 2:
                this.anim.scroll[0]=smoothAnim(this.anim.scroll[0],this.goalScroll>-10,0,1,5)
                this.anim.scroll[1]=smoothAnim(this.anim.scroll[1],this.goalScroll<10,0,1,5)
            break
        }
    }
    onClick(){
        this.purchases.forEach(purchase=>purchase.onClick())
        switch(this.battle.players){
            case 1:
                if(dist(inputs.rel.x,inputs.rel.y,this.layer.width/2-50,575)<20){
                    this.goalScroll=0
                }else if(dist(inputs.rel.x,inputs.rel.y,this.layer.width/2+50,575)<20){
                    this.goalScroll=225
                }
            break
            case 2:
                if(dist(inputs.rel.x,inputs.rel.y,this.layer.width/2-50,575)<20&&this.goalScroll>-10){
                    this.goalScroll-=550
                }else if(dist(inputs.rel.x,inputs.rel.y,this.layer.width/2+50,575)<20&&this.goalScroll<10){
                    this.goalScroll+=550
                }
            break
        }
        if(dist(inputs.rel.x,inputs.rel.y,this.layer.width/2,575)<20){
            transition.trigger=true
            transition.scene='map'
        }
    }
    onKey(key,code){
        this.purchases.forEach(purchase=>purchase.onKey(key,code))
        switch(this.battle.players){
            case 1:
                if(key=='ArrowLeft'){
                    this.goalScroll=0
                }else if(key=='ArrowRight'){
                    this.goalScroll=225
                }
            break
            case 2:
                if(key=='ArrowLeft'&this.goalScroll>-10){
                    this.goalScroll-=550
                }else if(key=='ArrowRight'&&this.goalScroll<10){
                    this.goalScroll+=550
                }
            break
        }
        if(code==ENTER){
            transition.trigger=true
            transition.scene='map'
        }
    }
}
