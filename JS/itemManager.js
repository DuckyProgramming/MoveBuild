class itemManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle

        this.listing={item:[[],[],[]]}
        
        this.items=[]
        this.position=[]
        this.up=[]

        this.initialListing()
    }
    initialListing(){
        for(let a=0,la=types.item.length;a<la;a++){
            if(types.item[a].rarity>=0&&(types.item[a].list==0||this.battle.player.includes(types.item[a].list))){
                this.listing.item[types.item[a].rarity].push(a)
            }
        }
        for(let a=0,la=this.battle.player.length;a<la;a++){
            this.items.push([
                new item(this.layer,a,25+(this.layer.width-50)*a,50,0,1),
                new item(this.layer,a,75+(this.layer.width-150)*a,50,1,1),
                new item(this.layer,a,125+(this.layer.width-250)*a,50,1,1),
                new item(this.layer,a,175+(this.layer.width-350)*a,50,1,1)])
            this.position.push(0)
            this.up.push(true)
        }
    }
    addItem(type,player){
        for(let a=0,la=this.items[player].length;a<la;a++){
            if(this.items[player][a].type==1){
                this.items[player][a].type=type
                this.items[player][a].refresh()
                break
            }
        }
    }
    addRandomItem(player){
        let possible=[0,0,0,1,1,2]
        let rarity=possible[floor(random(0,possible.length))]
        let index=floor(random(0,this.listing.item[rarity].length))
        this.addItem(this.listing.item[rarity][index],player)
    }
    addSetItem(rarity,player){
        let index=floor(random(0,this.listing.item[rarity].length))
        this.addRelic(this.listing.item[rarity][index],player)
    }
    makeItemSelection(rarity){
        /*(for(let a=0,la=this.complete.length;a<la;a++){
            this.complete[a]=false
        }
        let list=[]
        let relics=copyArrayStack(this.listing.relic)
        for(let a=0,la=rarity.length;a<la;a++){
            let index=floor(random(0,relics[rarity[a]].length))
            list.push(relics[rarity[a]][index])
            relics[rarity[a]].splice(index,1)
        }
        return list*/
    }
    activateItem(type,player){
        switch(type){
            case 2:
                this.battle.cardManagers[player].hand.callInput(6,[57,[10],1,[2,1,6]])
            break
        }
    }
    use(type,player){
        switch(type){
        }
    }
    display(scene){
        switch(scene){
            case 'battle':
                for(let a=0,la=this.items.length;a<la;a++){
                    for(let b=0,lb=this.items[a].length;b<lb;b++){
                        this.items[a][b].display()
                    }
                }
                for(let a=0,la=this.items.length;a<la;a++){
                    for(let b=0,lb=this.items[a].length;b<lb;b++){
                        this.items[a][b].displayInfo()
                    }
                }
            break
            case 'shop':
                for(let a=0,la=this.items.length;a<la;a++){
                    for(let b=0,lb=this.items[a].length;b<lb;b++){
                        this.items[a][b].display()
                    }
                }
                for(let a=0,la=this.items.length;a<la;a++){
                    for(let b=0,lb=this.items[a].length;b<lb;b++){
                        this.items[a][b].displayInfo()
                    }
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
                    for(let b=0,lb=this.items[a].length;b<lb;b++){
                        this.items[a][b].update(this.up[this.items[a][b].player],la,inputs)
                    }
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
                if(this.battle.player.length==2&&dist(inputs.rel.x,inputs.rel.y,this.layer.width-25,50)<20&&this.items[1].length>0){
                    this.up[1]=toggle(this.up[1])
                }
                for(let a=0,la=this.items.length;a<la;a++){
                    for(let b=0,lb=this.items[a].length;b<lb;b++){
                        if(dist(inputs.rel.x,inputs.rel.y,this.items[a][b].position.x,this.items[a][b].position.y)<20*this.items[a][b].size&&this.items[a][b].type>=2&&this.up[a]){
                            this.activateItem(this.items[a][b].type,a)
                            this.battle.cardManagers[a].hand.callInput(7,0)
                            this.items[a][b].type=1
                            this.items[a][b].refresh()
                        }
                    }
                }
            break
            case 'shop':
                if(dist(inputs.rel.x,inputs.rel.y,25,50)<20&&this.items[0].length>0){
                    this.up[0]=toggle(this.up[0])
                }
                if(this.battle.player.length==2&&dist(inputs.rel.x,inputs.rel.y,this.layer.width-25,50)<20&&this.items[1].length>0){
                    this.up[1]=toggle(this.up[1])
                }
                for(let a=0,la=this.items.length;a<la;a++){
                    for(let b=0,lb=this.items[a].length;b<lb;b++){
                        if(dist(inputs.rel.x,inputs.rel.y,this.items[a][b].position.x,this.items[a][b].position.y)<20*this.items[a][b].size&&this.items[a][b].type>=2&&this.up[a]){
                            this.battle.currency.money[a]+=10
                            this.battle.cardManagers[a].hand.callInput(7,0)
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
                if(this.battle.player.length==2&&key=='O'&&this.items[1].length>0){
                    this.up[1]=toggle(this.up[1])
                }
            break
            case 'shop':
                if(key=='o'&&this.items[0].length>0){
                    this.up[0]=toggle(this.up[0])
                }
                if(this.battle.player.length==2&&key=='O'&&this.items[1].length>0){
                    this.up[1]=toggle(this.up[1])
                }
            break
        }
    }
}