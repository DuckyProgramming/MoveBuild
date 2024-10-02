class nodeManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.nodes=[]

        this.listing={
            encounter:[[[],[],[],[],[]],[[],[],[],[],[]],[[],[],[],[],[]],[[],[],[],[],[]]],
            static:[[[],[],[],[],[]],[[],[],[],[],[]],[[],[],[],[],[]],[[],[],[],[],[]]],
            name:[[[],[],[],[],[]],[[],[],[],[],[]],[[],[],[],[],[]],[[],[],[],[],[]]]
        }

        this.tilePosition={x:0,y:-1}
        this.scroll=0
        this.world=0
        this.total=0

        this.freeMove=0
        this.saveClass=-1
        this.harmBoss=0
        
        this.unknownPossibilities=[]

        this.initialListing()
    }
    save(){
        let composite={
            nodes:[
            ],
            listing:{
                static:this.listing.static,
            },
            tilePosition:this.tilePosition,
            scroll:this.scroll,
            world:this.world,
            total:this.total,
            freeMove:this.freeMove,
            saveClass:this.saveClass,
            harmBoss:this.harmBoss,
        }
        this.nodes.forEach(node=>composite.nodes.push(node.save()))
        return composite
    }
    load(composite){
        this.tilePosition=composite.tilePosition
        this.scroll=composite.scroll
        this.world=composite.world
        this.total=composite.world
        this.freeMove=composite.freeMove
        this.saveClass=composite.saveClass
        this.harmBoss=composite.harmBoss
        this.nodes=[]
        for(let a=0,la=composite.nodes.length;a<la;a++){
            let base=composite.nodes[a]
            this.nodes.push(new node(this.layer,this.battle))
            this.nodes[this.nodes.length-1].establish(base.position.x,base.position.y,base.base.position.x,base.base.position.y,base.tilePosition.x,base.tilePosition.y,base.type,base.reality,base.combat,base.connections,base.extraConnections,base.scroll,base.complete)
        }
    }
    initialListing(){
        for(let a=0,la=types.encounter.length;a<la;a++){
            if(types.encounter[a].class>=0&&types.encounter[a].world>=0){
                if(types.encounter[a].world>=1&&types.encounter[a].class!=4){
                    //temporary, until enough enemies are active
                    this.listing.encounter[types.encounter[a].world][types.encounter[a].class].push(a)
                }
                this.listing.encounter[types.encounter[a].world][types.encounter[a].class].push(a)
                this.listing.static[types.encounter[a].world][types.encounter[a].class].push(a)
                this.listing.name[types.encounter[a].world][types.encounter[a].class].push(types.encounter[a].name)
            }
        }
    }
    nextWorld(){
        this.tilePosition={x:0,y:-1}
        this.world++
        this.setupMap()
    }
    setCombat(type,combat){
        for(let a=0,la=this.nodes.length;a<la;a++){
            if(this.nodes[a].type==type){
                this.nodes[a].combat=combat
            }
        }
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
            let possibilities=[]
            switch(this.world){
                case 0:
                    for(let a=0,la=game.ascend>=1?28:31;a<la;a++){
                        possibilities.push(0)
                    }
                    for(let a=0,la=game.ascend>=1?9:6;a<la;a++){
                        possibilities.push(1)
                    }
                    for(let a=0,la=9;a<la;a++){
                        possibilities.push(3)
                    }
                    for(let a=0,la=5;a<la;a++){
                        possibilities.push(4)
                    }
                    for(let a=0,la=15;a<la;a++){
                        possibilities.push(5)
                    }
                    this.unknownPossibilities=game.ascend>=15?[0,0,1,1,3,4,5,5,5,5,5,5,5,5,5]:[0,0,0,1,3,4,5,5,5,5,5,5,5,5,5]
                break
                case 1: case 2:
                    for(let a=0,la=game.ascend>=1?24:27;a<la;a++){
                        possibilities.push(0)
                    }
                    for(let a=0,la=game.ascend>=1?9:6;a<la;a++){
                        possibilities.push(1)
                    }
                    for(let a=0,la=9;a<la;a++){
                        possibilities.push(3)
                    }
                    for(let a=0,la=5;a<la;a++){
                        possibilities.push(4)
                    }
                    for(let a=0,la=15;a<la;a++){
                        possibilities.push(5)
                    }
                    this.unknownPossibilities=game.ascend>=15?[0,1,1,3,4,5,5,5,5,5,5,5,5,5,5]:[0,0,1,3,4,5,5,5,5,5,5,5,5,5,5]
                break
            }
            let length=(this.world>=2?21:22)-(variants.shortmap?9:0)-(variants.shortermap?13:0)
            for(let a=0,la=length;a<la;a++){
                for(let b=0,lb=min(a+1,4,la-a);b<lb;b++){
                    let type=game.allMap>=0?game.allMap:a<2?0:a==la-1?2:a==la-2?3:a==round(la/2)?6:a==round(la/4)&&this.world==1?7:-1
                    if(type==-1){
                        let index=floor(random(0,possibilities.length))
                        type=possibilities[index]
                        possibilities.splice(index,1)
                    }
                    this.nodes.push(new node(this.layer,this.battle,this.layer.width/2+60-lb*60+b*120,this.layer.height/2+a*100-150-min(3,a)*10,b,a,type))
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
    enterNode(type,y,chain,args){
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
                transition.scene='battle'
                if(this.saveClass>=0){
                    let list=this.listing.static[this.world][this.saveClass]
                    let index=floor(random(0,list.length))
                    this.battle.setupBattle(types.encounter[list[index]])
                    list.splice(index,1)
                }else{
                    if(variants.selectCombat){
                        transition.trigger=false
                        this.battle.overlayManager.overlays[61][0].active=true
                        this.battle.overlayManager.overlays[61][0].activate([0,y])
                    }else{
                        this.battle.setupBattle(types.encounter[args[0]])
                    }
                }
            break
            case 1:
                transition.scene='battle'
                if(this.saveClass>=0){
                    let list=this.listing.static[this.world][this.saveClass]
                    let index=floor(random(0,list.length))
                    this.battle.setupBattle(types.encounter[list[index]])
                    list.splice(index,1)
                }else{
                    if(this.battle.modded(69)){
                        if(variants.selectCombat){
                            transition.trigger=false
                            this.battle.overlayManager.overlays[61][0].active=true
                            this.battle.overlayManager.overlays[61][0].activate([1,y])
                        }else{
                            let list=this.listing.static[this.world][y==0?4:y<3&&this.world==0?3:0]
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
                            this.battle.setupBattle(types.encounter[args[0]])
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
                        let list=this.listing.static[this.world][1]
                        let index=floor(random(0,list.length))
                        this.battle.setupBattle(types.encounter[list[index]])
                        list.splice(index,1)
                        this.battle.combatantManager.allEffect(24,[2])
                        this.battle.combatantManager.allEffect(3,[5])
                    }
                }else{
                    this.battle.setupBattle(types.encounter[args[0]])
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
                    if(args[1]==5){
                        this.battle.relicManager.activate(7,[type])
                        transition.scene='event'
                        this.battle.setupEvent()
                    }else{
                        this.enterNode(args[1],y,true,args)
                    }
                }
            break
            case 6:
                if(this.world==1&&game.ascend>=23){
                    this.enterNode(args[1],y,true,args)
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
        if(!this.battle.modded(215)){
            this.nodes.forEach(node=>node.displayConnections())
        }
        this.nodes.forEach(node=>node.display(this.battle.relicManager.hasRelic(282,-1)&&node.tilePosition.y>=this.tilePosition.y+4?8:undefined))
        this.layer.fill(200,this.fade)
        this.layer.noStroke()
        this.layer.ellipse(this.layer.width/2,25,40)
        this.layer.stroke(100,this.fade)
        this.layer.strokeWeight(2)
        this.layer.line(this.layer.width/2-10,36,this.layer.width/2+10,36)
        this.layer.line(this.layer.width/2-10,36,this.layer.width/2-10,30)
        this.layer.line(this.layer.width/2+10,36,this.layer.width/2+10,30)
        this.layer.line(this.layer.width/2-3,10,this.layer.width/2+3,10)
        this.layer.line(this.layer.width/2-3,10,this.layer.width/2-3,20)
        this.layer.line(this.layer.width/2-8,20,this.layer.width/2-3,20)
        this.layer.line(this.layer.width/2-8,20,this.layer.width/2,30)
        this.layer.line(this.layer.width/2+3,10,this.layer.width/2+3,20)
        this.layer.line(this.layer.width/2+8,20,this.layer.width/2+3,20)
        this.layer.line(this.layer.width/2+8,20,this.layer.width/2,30)
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
                        this.enterNode(this.nodes[a].type,this.nodes[a].tilePosition.y,false,[this.nodes[a].combat,this.nodes[a].reality])
                    }
                }
                break
            }
        }
        if(dist(inputs.rel.x,inputs.rel.y,this.layer.width/2,25)<20){
            this.battle.overlayManager.overlays[144][0].active=true
            this.battle.overlayManager.overlays[144][0].activate()
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
                        this.enterNode(this.nodes[a].type,this.nodes[a].tilePosition.y,false,[this.nodes[a].combat,this.nodes[a].reality])
                    }
                }
                break
            }
        }
    }
}