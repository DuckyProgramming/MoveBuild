class nodeManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.nodes=[]

        this.listing={encounter:[[[],[],[]],[[],[],[]],[[],[],[]]]}

        this.tilePosition={x:0,y:-1}
        this.scroll=this.layer.height-150
        this.world=0

        this.initialListing()
    }
    initialListing(){
        for(let a=0,la=types.encounter.length;a<la;a++){
            if(types.encounter[a].world>=0){
                this.listing.encounter[types.encounter[a].world][types.encounter[a].class].push(a)
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
        let possibilities=[0,0,0,1,3,4,5,5]
        for(let a=0,la=20;a<la;a++){
            for(let b=0,lb=min(min(a+1,4),20-a);b<lb;b++){
                if(a<2&&false){
                    this.nodes.push(new node(this.layer,this.battle,this.layer.width/2+60-lb*60+b*120,this.layer.height/2+a*100-150-min(3,a)*10,b,a,0))
                }else if(a==la-1){
                    this.nodes.push(new node(this.layer,this.battle,this.layer.width/2+60-lb*60+b*120,this.layer.height/2+a*100-150-min(3,a)*10,b,a,2))
                }else{
                    this.nodes.push(new node(this.layer,this.battle,this.layer.width/2+60-lb*60+b*120,this.layer.height/2+a*100-150-min(3,a)*10,b,a,possibilities[floor(random(0,possibilities.length))]))
                }
            }
        }
        this.scroll=this.layer.height/2-240
        let side=[floor(random(0,2)),floor(random(0,4)),floor(random(0,4)),floor(random(0,2))]
        for(let a=0,la=this.nodes.length;a<la;a++){
            for(let b=0,lb=this.nodes.length;b<lb;b++){
                if(this.nodes[a].tilePosition.y==this.nodes[b].tilePosition.y-1&&(
                    this.nodes[a].tilePosition.y==0||this.nodes[a].tilePosition.y==1&&(this.nodes[b].tilePosition.x==this.nodes[a].tilePosition.x*2||this.nodes[b].tilePosition.x==1&&(this.nodes[a].tilePosition.x==side[0]||this.nodes[a].tilePosition.x==1-side[0]&&floor(random(0,4))==0))||
                    this.nodes[a].tilePosition.y==2&&(this.nodes[b].tilePosition.x==this.nodes[a].tilePosition.x*3/2||(this.nodes[a].tilePosition.x+this.nodes[b].tilePosition.x!=side[1]+1||floor(random(0,4))==0)&&(this.nodes[a].tilePosition.x==this.nodes[b].tilePosition.x||this.nodes[a].tilePosition.x==this.nodes[b].tilePosition.x-1))||
                    this.nodes[a].tilePosition.y>=3&&this.nodes[a].tilePosition.y<=15&&(this.nodes[b].tilePosition.x==this.nodes[a].tilePosition.x||abs(this.nodes[b].tilePosition.x-this.nodes[a].tilePosition.x)<=1&&floor(random(0,4))==0)||
                    this.nodes[a].tilePosition.y==16&&(this.nodes[b].tilePosition.x==this.nodes[a].tilePosition.x*2/3||(this.nodes[a].tilePosition.x+this.nodes[b].tilePosition.x!=side[2]+1||floor(random(0,4))==0)&&(this.nodes[a].tilePosition.x==this.nodes[b].tilePosition.x||this.nodes[a].tilePosition.x==this.nodes[b].tilePosition.x+1))||
                    this.nodes[a].tilePosition.y==18||this.nodes[a].tilePosition.y==17&&(this.nodes[b].tilePosition.x==this.nodes[a].tilePosition.x/2||this.nodes[a].tilePosition.x==1&&(this.nodes[b].tilePosition.x==side[3]||this.nodes[b].tilePosition.x==1-side[3]&&floor(random(0,4))==0)))){
                    this.nodes[a].connections.push(b)
                }
            }
        }
    }
    scrollDown(scroll){
        for(let a=0,la=this.nodes.length;a<la;a++){
            this.nodes[a].scroll+=scroll-this.scroll
        }
        this.scroll=scroll
    }
    enterNode(type){
        switch(type){
            case 0:
                transition.scene='battle'
                this.battle.setupBattle(types.encounter[this.listing.encounter[this.world][0][floor(random(0,this.listing.encounter[this.world][0].length))]])
            break
            case 1:
                transition.scene='battle'
                this.battle.setupBattle(types.encounter[this.listing.encounter[this.world][1][floor(random(0,this.listing.encounter[this.world][1].length))]])
            break
            case 2:
                transition.scene='battle'
                this.battle.setupBattle(types.encounter[this.listing.encounter[this.world][2][floor(random(0,this.listing.encounter[this.world][2].length))]])
            break
            case 3:
                transition.scene='rest'
                this.battle.setupRest()
            break
            case 4:
                transition.scene='shop'
                this.battle.setupShop()
            break
            case 5:
                let send=[0,0,0,0,0,1,3,4,5,5,5,5,5,5,5,5][floor(random(0,10))]
                if(send==5){
                }else{
                    this.enterNode(send)
                }
            break
        }
    }
    display(){
        for(let a=0,la=this.nodes.length;a<la;a++){
            this.nodes[a].displayConnections()
        }
        for(let a=0,la=this.nodes.length;a<la;a++){
            this.nodes[a].display()
        }
    }
    update(){
        for(let a=0,la=this.nodes.length;a<la;a++){
            this.nodes[a].update()
        }
    }
    onClick(){
        for(let a=0,la=this.nodes.length;a<la;a++){
            if(dist(inputs.rel.x,inputs.rel.y,this.nodes[a].position.x,this.nodes[a].position.y)<25&&(this.tilePosition.y==-1&&this.nodes[a].tilePosition.y==0||this.tilePosition.y>=0&&this.nodes[this.getNodeIndex(this.tilePosition.x,this.tilePosition.y)].connections.includes(a))){
                this.tilePosition.x=this.nodes[a].tilePosition.x
                this.tilePosition.y=this.nodes[a].tilePosition.y
                this.nodes[a].complete=true
                transition.trigger=true
                this.scrollDown(this.nodes[a].base.position.y)
                this.enterNode(this.nodes[a].type)
                break
            }
        }
    }
    onKey(key,code){
        for(let a=0,la=this.nodes.length;a<la;a++){
            if((int(key)+9)%10==this.nodes[a].tilePosition.x&&(this.tilePosition.y==-1&&this.nodes[a].tilePosition.y==0||this.tilePosition.y>=0&&this.nodes[this.getNodeIndex(this.tilePosition.x,this.tilePosition.y)].connections.includes(a))){
                this.tilePosition.x=this.nodes[a].tilePosition.x
                this.tilePosition.y=this.nodes[a].tilePosition.y
                this.nodes[a].complete=true
                transition.trigger=true
                this.scrollDown(this.nodes[a].base.position.y)
                this.enterNode(this.nodes[a].type)
                break
            }
        }
    }
}