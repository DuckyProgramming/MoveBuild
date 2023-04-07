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
                new item(this.layer,a,25+(this.layer.width-50)*a,100,0,1),
                new item(this.layer,a,75+(this.layer.width-150)*a,100,1,1),
                new item(this.layer,a,125+(this.layer.width-250)*a,100,1,1),
                new item(this.layer,a,175+(this.layer.width-350)*a,100,1,1)])
            this.position.push(0)
            this.up.push(false)
        }
    }
    addItem(type,player){
        /*this.player[types.relic[type].id]=player
        this.active[types.relic[type].id]+=1
        if(this.battle.player.length==2){
            this.relics.push(new relic(this.layer,player,this.layer.width*player+(25+(this.position[player]%8)*50)*(1-2*player),50+floor(this.position[player]/8)*50,types.relic[type].id,1))
        }else{
            this.relics.push(new relic(this.layer,player,25+(this.position[player]%18)*50,50+floor(this.position[player]/18)*50,types.relic[type].id,1))
        }
        this.position[player]++
        this.total[player]++
        this.get(types.relic[type].id,player)*/
    }
    addRandomRelic(player){
        /*let possible=[0,0,0,1,1,2]
        let rarity=possible[floor(random(0,possible.length))]
        let index=floor(random(0,this.listing.item[rarity].length))
        this.adItem(this.listing.relic[rarity][index],player)*/
    }
    addSetRelic(rarity,player){
        /*let index=floor(random(0,this.listing.item[rarity].length))
        this.addRelic(this.listing.item[rarity][index],player)
        this.listing.item[rarity].splice(index,1)*/
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
        }
    }
    update(scene){
        switch(scene){
            case 'battle':
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
                if(dist(inputs.rel.x,inputs.rel.y,25,100)<20&&this.items[0].length>0){
                    this.up[0]=toggle(this.up[0])
                }
                if(this.battle.player.length==2&&dist(inputs.rel.x,inputs.rel.y,this.layer.width-25,100)<20&&this.items[1].length>0){
                    this.up[1]=toggle(this.up[1])
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
        }
    }
}