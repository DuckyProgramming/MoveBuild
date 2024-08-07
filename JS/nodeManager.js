class nodeManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.nodes=[]

        this.listing={encounter:[[[],[],[],[],[]],[[],[],[],[],[]],[[],[],[],[],[]],[[],[],[],[],[]]],name:[[[],[],[],[],[]],[[],[],[],[],[]],[[],[],[],[],[]],[[],[],[],[],[]]]}

        this.tilePosition={x:0,y:-1}
        this.scroll=0
        this.world=0
        this.total=0

        this.freeMove=0
        this.saveBoss=-1
        this.saveClass=-1
        this.harmBoss=0

        this.initialListing()
    }
    initialListing(){
        for(let a=0,la=types.encounter.length;a<la;a++){
            if(types.encounter[a].class>=0&&types.encounter[a].world>=0){
                this.listing.encounter[types.encounter[a].world][types.encounter[a].class].push(a)
                this.listing.name[types.encounter[a].world][types.encounter[a].class].push(types.encounter[a].name)
            }
        }
    }
    nextWorld(){
        this.tilePosition={x:0,y:-1}
        this.world++
        this.saveBoss=-1
        this.setupMap()
    }
    getNodeIndex(tileX,tileY){
        for(let a=0,la=this.nodes.length;a<la;a++){
            if(this.nodes[a].tilePosition.x==tileX&&this.nodes[a].tilePosition.y==tileY){
                return a
            }
        }
        return -1
    }
    setupMap(){
        this.nodes=[]
        this.scroll=this.layer.height/2-150
        if(this.world==3){
            let list=[4,3,1,2]
            for(let a=0,la=4;a<la;a++){
                this.nodes.push(new node(this.layer,this.battle,this.layer.width/2,this.layer.height/2+a*100-150,0,a,game.allMap>=0?game.allMap:list[a]))
            }
            for(let a=0,la=this.nodes.length;a<la;a++){
                for(let b=0,lb=this.nodes.length;b<lb;b++){
                    if(this.nodes[a].tilePosition.y==this.nodes[b].tilePosition.y-1){
                        this.nodes[a].connections.push(b)
                    }
                }
            }
        }else if(variants.singlemap){
            let possibilities=game.ascend>=1?[0,0,0,0,0,1,1,1,3,3,3,4,4,5,5,5,5]:[0,0,0,0,0,0,1,1,3,3,3,4,4,5,5,5,5]
            let length=(this.world>=2?21:22)-(variants.shortmap?9:0)-(variants.shortermap?13:0)
            for(let a=0,la=length;a<la;a++){
                this.nodes.push(new node(this.layer,this.battle,this.layer.width/2,this.layer.height/2+a*100-150-min(3,a)*10,0,a,
                game.allMap>=0?game.allMap:a<2?0:a==la-1?2:a==la-2?3:a==round(la/2)?6:a==round(la/4)&&this.world==1?7:possibilities[floor(random(0,possibilities.length))]))
            }
            for(let a=0,la=this.nodes.length;a<la;a++){
                for(let b=0,lb=this.nodes.length;b<lb;b++){
                    if(this.nodes[a].tilePosition.y==this.nodes[b].tilePosition.y-1){
                        this.nodes[a].connections.push(b)
                    }
                }
            }
        }else{
            let possibilities=game.ascend>=1?[0,0,0,0,0,1,1,1,3,3,3,4,4,5,5,5,5]:[0,0,0,0,0,0,1,1,3,3,3,4,4,5,5,5,5]
            let length=(this.world>=2?21:22)-(variants.shortmap?9:0)-(variants.shortermap?13:0)
            for(let a=0,la=length;a<la;a++){
                for(let b=0,lb=min(a+1,4,la-a);b<lb;b++){
                    this.nodes.push(new node(this.layer,this.battle,this.layer.width/2+60-lb*60+b*120,this.layer.height/2+a*100-150-min(3,a)*10,b,a,
                    game.allMap>=0?game.allMap:a<2?0:a==la-1?2:a==la-2?3:a==round(la/2)?6:a==round(la/4)&&this.world==1?7:possibilities[floor(random(0,possibilities.length))]))
                }
            }
            let side=[floor(random(0,2)),floor(random(0,3)),floor(random(0,3)),floor(random(0,2))]
            for(let a=0,la=this.nodes.length;a<la;a++){
                for(let b=0,lb=this.nodes.length;b<lb;b++){
                    let posA=this.nodes[a].tilePosition
                    let posB=this.nodes[b].tilePosition
                    if(posA.y==posB.y-1&&(
                        posA.y==0||
                        posA.y==1&&(posB.x==posA.x*2||posB.x==1&&posA.x==side[0])||
                        posA.y==2&&(posB.x==posA.x*3/2||(posA.x==posB.x||posA.x==posB.x-1)&&[[0,2],[1,2],[1,3]][side[1]].includes(posA.x+posB.x-1))||
                        posA.y>=3&&posA.y<=length-5&&(posB.x==posA.x||abs(posB.x-posA.x)<=1&&floor(random(0,3))==0)||
                        posA.y==length-4&&(posB.x==posA.x*2/3||(posA.x==posB.x||posA.x==posB.x+1)&&[[0,2],[1,2],[1,3]][side[3]].includes(posB.x+posA.x-1))||
                        posA.y==length-3&&(posB.x==posA.x/2||posA.x==1&&posB.x==side[3])||
                        posA.y==length-2
                    )){
                        this.nodes[a].connections.push(b)
                    }else if(floor(random(0,5))==0&&posA.y==posB.y-1&&(
                        posA.y==0||
                        posA.y==1&&posB.x==1&&posA.x==1-side[0]||
                        posA.y==2&&(posA.x==posB.x||posA.x==posB.x-1)&&![[0,2],[1,2],[1,3]][side[1]].includes(posA.x+posB.x-1)||
                        posA.y>=3&&posA.y<=length-5&&abs(posB.x-posA.x)==1&&!this.nodes[a].connections.includes(b)||
                        posA.y==length-4&&(posA.x==posB.x||posA.x==posB.x+1)&&![[0,2],[1,2],[1,3]][side[3]].includes(posB.x+posA.x-1)||
                        posA.y==length-3&&posB.x==1&&posB.x==1-side[3]||
                        posA.y==length-2
                    )){
                        this.nodes[a].extraConnections.push(b)
                    }
                }
            }
        }
    }
    setupTutorialMap(){
        this.nodes=[]
        let list=[3,4,5,6]
        for(let a=0,la=4;a<la;a++){
            this.nodes.push(new node(this.layer,this.battle,this.layer.width/2,this.layer.height/2+a*100-150,0,a,game.allMap>=0?game.allMap:list[a]))
        }
        for(let a=0,la=this.nodes.length;a<la;a++){
            for(let b=0,lb=this.nodes.length;b<lb;b++){
                if(this.nodes[a].tilePosition.y==this.nodes[b].tilePosition.y-1){
                    this.nodes[a].connections.push(b)
                }
            }
        }
    }
    scrollDown(scroll){
        this.nodes.forEach(node=>node.scroll+=scroll-this.scroll)
        this.scroll=scroll
    }
    enterNode(type,y,chain){
        if(type!=5){
            this.battle.relicManager.activate(7,[type])
        }
        this.battle.relicManager.activate(12,[type])
        this.battle.itemManager.activateNode()
        if(!chain){
            this.battle.stats.node[0]++
            this.battle.stats.node[1+type]++
            for(let a=0,la=this.battle.players;a<la;a++){
                this.battle.cardManagers[a].allEffect(0,62)
            }
            if(variants.terminal){
                for(let a=0,la=this.battle.players;a<la;a++){
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(a)].loseMaxHP(1)
                }
            }
        }
        switch(type){
            case 0:
                if((type==0||type==1)&&this.saveClass>=0){
                    let tempClass=this.saveClass
                    this.saveClass=-1
                    this.enterNode(tempClass,y,true)
                }else{
                    transition.scene='battle'
                    if(variants.selectCombat){
                        transition.trigger=false
                        this.battle.overlayManager.overlays[61][0].active=true
                        this.battle.overlayManager.overlays[61][0].activate([0,y])
                    }else{
                        let list=this.listing.encounter[this.world][y==0?4:y<3&&this.world==0?3:0]
                        let index=floor(random(0,list.length))
                        this.battle.setupBattle(types.encounter[list[index]])
                        if(y>0){
                            list.splice(index,1)
                        }
                    }
                }
            break
            case 1:
                if((type==0||type==1)&&this.saveClass>=0){
                    let tempClass=this.saveClass
                    this.saveClass=-1
                    this.enterNode(tempClass,y,true)
                }else{
                    transition.scene='battle'
                    if(this.battle.modded(69)){
                        if(variants.selectCombat){
                            transition.trigger=false
                            this.battle.overlayManager.overlays[61][0].active=true
                            this.battle.overlayManager.overlays[61][0].activate([1,y])
                        }else{
                            let list=this.listing.encounter[this.world][y==0?4:y<3&&this.world==0?3:0]
                            let index=floor(random(0,list.length))
                            this.battle.setupBattle(types.encounter[list[index]])
                            list.splice(index,1)
                            this.battle.combatantManager.allEffect(24,[2])
                            this.battle.combatantManager.allEffect(3,[5])
                        }
                    }else{
                        if(variants.selectCombat){
                            transition.trigger=false
                            this.battle.overlayManager.overlays[61][0].active=true
                            this.battle.overlayManager.overlays[61][0].activate([2,y])
                        }else{
                            let list=this.listing.encounter[this.world][1]
                            let index=floor(random(0,list.length))
                            this.battle.setupBattle(types.encounter[list[index]])
                            list.splice(index,1)
                        }
                    }
                }
            break
            case 2:
                transition.scene='battle'
                if(this.battle.modded(188)){
                    if(variants.selectCombat){
                        transition.trigger=false
                        this.battle.overlayManager.overlays[61][0].active=true
                        this.battle.overlayManager.overlays[61][0].activate([2,y])
                    }else{
                        let list=this.listing.encounter[this.world][1]
                        let index=floor(random(0,list.length))
                        this.battle.setupBattle(types.encounter[list[index]])
                        list.splice(index,1)
                        this.battle.combatantManager.allEffect(24,[2])
                        this.battle.combatantManager.allEffect(3,[5])
                    }
                }else{
                    this.battle.setupBattle(types.encounter[this.listing.encounter[this.world][2][this.saveBoss>=0?this.saveBoss:floor(random(0,this.listing.encounter[this.world][2].length))]])
                    this.saveBoss=-1
                }
            break
            case 3:
                if(this.battle.modded(161)&&floor(random(0,4))==0){
                    transition.scene='battle'
                    let list=this.listing.encounter[this.world][0]
                    let index=floor(random(0,list.length))
                    this.battle.setupBattle(types.encounter[list[index]])
                    list.splice(index,1)
                }else{
                    transition.scene='rest'
                    this.battle.setupRest()
                }
            break
            case 4:
                if(this.battle.modded(161)&&floor(random(0,4))==0){
                    transition.scene='battle'
                    let list=this.listing.encounter[this.world][0]
                    let index=floor(random(0,list.length))
                    this.battle.setupBattle(types.encounter[list[index]])
                    list.splice(index,1)
                }else{
                    transition.scene='shop'
                    this.battle.setupShop()
                }
            break
            case 5:
                if(this.battle.tutorialManager.active){
                    transition.scene='event'
                    this.battle.setupSpecificEvent(findName('Placeholder Event',types.event))
                }else{
                    let send=game.ascend>=15
                    ?this.battle.relicManager.hasRelic(98,-1)?[3,4,5,5,5,5,5,5,5,5][floor(random(0,10))]:[0,0,1,1,3,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5][floor(random(0,20))]
                    :this.battle.relicManager.hasRelic(98,-1)?[3,4,5,5,5,5,5,5,5,5][floor(random(0,10))]:[0,0,0,1,3,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5][floor(random(0,20))]
                    if(send==5){
                        this.battle.relicManager.activate(7,[type])
                        transition.scene='event'
                        this.battle.setupEvent()
                    }else{
                        this.enterNode(send,y,true)
                    }
                }
            break
            case 6:
                if(this.world==1&&game.ascend>=23){
                    this.enterNode(1,y,true)
                }else{
                    transition.scene='stash'
                    this.battle.setupStash()
                }
            break
            case 7:
                transition.scene='event'
                this.battle.setupSpecificEvent(findName('Fortune Teller',types.event))
            break
        }
    }
    display(){
        this.nodes.forEach(node=>node.displayConnections())
        this.nodes.forEach(node=>node.display(this.battle.relicManager.hasRelic(282,-1)&&node.tilePosition.y>=this.tilePosition.y+4?8:undefined))
    }
    update(){
        for(let a=0,la=this.nodes.length;a<la;a++){
            this.nodes[a].update(!(this.nodes[a].tilePosition.y==this.tilePosition.y&&this.nodes[a].complete)&&(
                this.tilePosition.y==-1&&this.nodes[a].tilePosition.y==0||
                this.tilePosition.y>=0&&this.nodes[this.getNodeIndex(this.tilePosition.x,this.tilePosition.y)].getConnections().includes(a)||
                this.tilePosition.y>=0&&this.freeMove>0&&this.nodes[a].tilePosition.y>=this.tilePosition.y&&this.nodes[a].tilePosition.y<=this.tilePosition.y+2||
                this.tilePosition.y>0&&(this.nodes[a].getConnections().includes(this.getNodeIndex(this.tilePosition.x,this.tilePosition.y))&&this.battle.relicManager.hasRelic(336,-1))
            ),this.nodes[a].tilePosition.y<this.tilePosition.y)
        }
    }
    onClick(){
        for(let a=0,la=this.nodes.length;a<la;a++){
            if(dist(inputs.rel.x,inputs.rel.y,this.nodes[a].position.x,this.nodes[a].position.y)<25&&!(this.nodes[a].tilePosition.y==this.tilePosition.y&&this.nodes[a].complete)&&(
                this.tilePosition.y==-1&&this.nodes[a].tilePosition.y==0||
                this.tilePosition.y>=0&&this.nodes[this.getNodeIndex(this.tilePosition.x,this.tilePosition.y)].getConnections().includes(a)||
                this.tilePosition.y>=0&&this.freeMove>0&&this.nodes[a].tilePosition.y>=this.tilePosition.y&&this.nodes[a].tilePosition.y<=this.tilePosition.y+2||
                this.tilePosition.y>0&&(this.nodes[a].getConnections().includes(this.getNodeIndex(this.tilePosition.x,this.tilePosition.y))&&this.battle.relicManager.hasRelic(336,-1))
            )){
                this.total++
                if(this.nodes[a].tilePosition.y<this.tilePosition.y){
                    if(this.battle.relicManager.hasRelic(336,0)){
                        this.battle.relicManager.detail[336][0]++
                        if(this.battle.relicManager.detail[336][0]>=3*this.battle.relicManager.active[336][1]){
                            this.battle.relicManager.loseRelic(336,0)
                        }
                    }else if(this.battle.relicManager.hasRelic(336,1)){
                        this.battle.relicManager.detail[336][1]++
                        if(this.battle.relicManager.detail[336][1]>=3*this.battle.relicManager.active[336][2]){
                            this.battle.relicManager.loseRelic(336,1)
                        }
                    }
                }
                if(variants.mod&&this.total%6==0){
                    this.battle.overlayManager.overlays[42][0].active=true
                    this.battle.overlayManager.overlays[42][0].activate()
                }else{
                    this.scrollDown(this.nodes[a].base.position.y)
                    this.tilePosition.x=this.nodes[a].tilePosition.x
                    this.tilePosition.y=this.nodes[a].tilePosition.y
                    if(this.freeMove>0){
                        this.freeMove--
                    }
                    if(!this.nodes[a].complete){
                        this.nodes[a].complete=true
                        transition.trigger=true
                        this.enterNode(this.nodes[a].type,this.nodes[a].tilePosition.y,false)
                    }
                }
                break
            }
        }
    }
    onKey(key,code){
        for(let a=0,la=this.nodes.length;a<la;a++){
            if((int(key)+9)%10==this.nodes[a].tilePosition.x&&!(this.nodes[a].tilePosition.y==this.tilePosition.y&&this.nodes[a].complete)&&(
                this.tilePosition.y==-1&&this.nodes[a].tilePosition.y==0||
                this.tilePosition.y>=0&&this.nodes[this.getNodeIndex(this.tilePosition.x,this.tilePosition.y)].connections.includes(a)||
                this.tilePosition.y>=0&&this.freeMove>0&&this.nodes[a].tilePosition.y==this.tilePosition.y+1
            )){
                this.total++
                if(this.nodes[a].tilePosition.y<this.tilePosition.y){
                    if(this.battle.relicManager.hasRelic(336,0)){
                        this.battle.relicManager.detail[336][0]++
                        if(this.battle.relicManager.detail[336][0]>=3*this.battle.relicManager.active[336][1]){
                            this.battle.relicManager.loseRelic(336,0)
                        }
                    }else if(this.battle.relicManager.hasRelic(336,1)){
                        this.battle.relicManager.detail[336][1]++
                        if(this.battle.relicManager.detail[336][1]>=3*this.battle.relicManager.active[336][2]){
                            this.battle.relicManager.loseRelic(336,1)
                        }
                    }
                }
                if(variants.mod&&this.total%6==0){
                    this.battle.overlayManager.overlays[42][0].active=true
                    this.battle.overlayManager.overlays[42][0].activate()
                }else{
                    this.scrollDown(this.nodes[a].base.position.y)
                    this.tilePosition.x=this.nodes[a].tilePosition.x
                    this.tilePosition.y=this.nodes[a].tilePosition.y
                    if(this.freeMove>0){
                        this.freeMove--
                    }
                    if(!this.nodes[a].complete){
                        this.nodes[a].complete=true
                        transition.trigger=true
                        this.enterNode(this.nodes[a].type,this.nodes[a].tilePosition.y,false)
                    }
                }
                break
            }
        }
    }
}