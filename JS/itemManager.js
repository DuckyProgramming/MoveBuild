class itemManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle

        this.listing={item:[[],[],[]]}
        
        this.items=[]
        this.position=[]
        this.up=[]
        this.total=[]
        this.effectiveness=[]

        this.initialListing()
    }
    initialListing(){
        for(let a=0,la=types.item.length;a<la;a++){
            if(types.item[a].rarity>=0&&(types.item[a].list==0||this.battle.player.includes(types.item[a].list))){
                this.listing.item[types.item[a].rarity].push(a)
            }
        }
        for(let a=0,la=this.battle.players;a<la;a++){
            this.items.push([
                new item(this.layer,a,25+(this.layer.width-50)*a,50,0,1),
                new item(this.layer,a,75+(this.layer.width-150)*a,50,1,1),
                new item(this.layer,a,125+(this.layer.width-250)*a,50,1,1),
                new item(this.layer,a,175+(this.layer.width-350)*a,50,1,1)])
            this.position.push(0)
            this.up.push(true)
            this.total.push(0)
            this.effectiveness.push(1)
        }
    }
    addItem(type,player){
        for(let a=0,la=this.items[player].length;a<la;a++){
            if(this.items[player][a].type==1){
                this.items[player][a].type=type
                this.items[player][a].refresh()
                this.total[player]++
                break
            }
        }
        this.battle.stats.item[player]++
    }
    addRandomItem(player){
        let possible=[0,0,0,1,1,2]
        let rarity=possible[floor(random(0,possible.length))]
        let index=floor(random(0,this.listing.item[rarity].length))
        this.addItem(this.listing.item[rarity][index],player)
    }
    addSetItem(rarity,player){
        let index=floor(random(0,this.listing.item[rarity].length))
        this.addItem(this.listing.item[rarity][index],player)
    }
    addItemSlots(amount,player){
        for(let a=0;a<amount;a++){
            this.items[player].push(new item(this.layer,player,225+50*this.position[player]+(this.layer.width-450-100*this.position[player])*player,50,1,1))
            this.position[player]++
        }
    }
    removeItemSlots(amount,player){
        for(let a=0;a<amount;a++){
            this.items[player].splice(this.items[player].length-1,1)
        }
        this.position-=player
    }
    activateItem(type,player){
        switch(type){
            case 2:
                this.battle.cardManagers[player].hand.callInput(6,[57,[10*this.effectiveness[player]],1,[2,1,6]])
            break
        }
        if(this.battle.relicManager.hasRelic(80,player)&&floor(random(0,2))==0){
            this.addRandomItem(player)
        }
    }
    display(scene){
        switch(scene){
            case 'battle':
                for(let a=0,la=this.items.length;a<la;a++){
                    this.items[a].forEach(item=>item.display(this.total[a]))
                }
                for(let a=0,la=this.items.length;a<la;a++){
                    this.items[a].forEach(item=>item.displayInfo())
                }
            break
            case 'shop':
                for(let a=0,la=this.items.length;a<la;a++){
                    this.items[a].forEach(item=>item.display(this.total[a]))
                }
                for(let a=0,la=this.items.length;a<la;a++){
                    this.items[a].forEach(item=>item.displayInfo())
                }
                this.layer.fill(230,230,210)
                this.layer.textSize(16)
                this.layer.text('10',25,83)
                if(this.battle.currency.money.length>1){
                    this.layer.text('10',this.layer.width-25,83)
                }
            break
        }
    }
    update(scene){
        switch(scene){
            case 'battle': case 'shop':
                for(let a=0,la=this.items.length;a<la;a++){
                    this.items[a].forEach(item=>item.update(this.up[a],la,inputs))
                }
            break
        }
    }
    onClick(scene){
        switch(scene){
            case 'battle':
                if(dist(inputs.rel.x,inputs.rel.y,25,50)<20&&this.items[0].length>0){
                    this.up[0]=toggle(this.up[0])
                }
                if(this.battle.players==2&&dist(inputs.rel.x,inputs.rel.y,this.layer.width-25,50)<20&&this.items[1].length>0){
                    this.up[1]=toggle(this.up[1])
                }
                for(let a=0,la=this.items.length;a<la;a++){
                    for(let b=0,lb=this.items[a].length;b<lb;b++){
                        if(dist(inputs.rel.x,inputs.rel.y,this.items[a][b].position.x,this.items[a][b].position.y)<20*this.items[a][b].size&&this.items[a][b].type>=2&&this.up[a]&&this.battle.attackManager.attacks.length<=0){
                            let type=this.items[a][b].type
                            this.total[a]--
                            this.items[a][b].type=1
                            this.items[a][b].refresh()
                            this.activateItem(type,a)
                            this.battle.cardManagers[a].hand.callInput(7,0)
                        }
                    }
                }
            break
            case 'shop':
                if(dist(inputs.rel.x,inputs.rel.y,25,50)<20&&this.items[0].length>0){
                    this.up[0]=toggle(this.up[0])
                }
                if(this.battle.players==2&&dist(inputs.rel.x,inputs.rel.y,this.layer.width-25,50)<20&&this.items[1].length>0){
                    this.up[1]=toggle(this.up[1])
                }
                for(let a=0,la=this.items.length;a<la;a++){
                    for(let b=0,lb=this.items[a].length;b<lb;b++){
                        if(dist(inputs.rel.x,inputs.rel.y,this.items[a][b].position.x,this.items[a][b].position.y)<20*this.items[a][b].size&&this.items[a][b].type>=2&&this.up[a]){
                            this.battle.getCurrency(10,a)
                            this.total[a]--
                            this.items[a][b].type=1
                            this.items[a][b].refresh()
                        }
                    }
                }
            break
        }
    }
    onKey(scene,key,code){
        switch(scene){
            case 'battle':
                if(key=='o'&&this.items[0].length>0){
                    this.up[0]=toggle(this.up[0])
                }
                if(this.battle.players==2&&key=='O'&&this.items[1].length>0){
                    this.up[1]=toggle(this.up[1])
                }
            break
            case 'shop':
                if(key=='o'&&this.items[0].length>0){
                    this.up[0]=toggle(this.up[0])
                }
                if(this.battle.players==2&&key=='O'&&this.items[1].length>0){
                    this.up[1]=toggle(this.up[1])
                }
            break
        }
    }
}