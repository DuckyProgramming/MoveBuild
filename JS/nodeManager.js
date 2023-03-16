class nodeManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.nodes=[]

        this.level=0
    }
    setupMap(){
        let possibilities=[0]
        for(let a=0,la=20;a<la;a++){
            for(let b=0,lb=min(min(a+1,4),20-a);b<lb;b++){
                if(a<2){
                    this.nodes.push(new node(this.layer,this.battle,this.layer.width/2+60-lb*60+b*120,this.layer.height/2+a*100-150-min(3,a)*10,b,a,0))
                }else{
                    this.nodes.push(new node(this.layer,this.battle,this.layer.width/2+60-lb*60+b*120,this.layer.height/2+a*100-150-min(3,a)*10,b,a,possibilities[floor(random(0,possibilities.length))]))
                }
            }
        }
        this.level=this.layer.height/2-240
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
    scroll(scroll){
        for(let a=0,la=this.nodes.length;a<la;a++){
            this.nodes[a].scroll+=scroll-this.level
        }
        this.level=scroll
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
}