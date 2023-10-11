class tierManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle

        this.tiers=[]
        for(let a=0,la=9;a<la;a++){
            this.tiers.push(new group(this.layer,this.battle,this.player,a))
        }
        this.unranked=new group(this.layer,this.battle,this.player,9)
        this.cards=[]
        for(let a=0,la=types.card.length;a<la;a++){
            this.unranked.add(a,0,types.card[a].list<0?0:types.card[a].list>=types.color.card.length?0:types.card[a].list)
        }
        this.anim={tiers:[1,1,1,1,1,1,1,1,1],name:['S+','S','A','B','C','D','F','F-','No'],options:[1,1,1,1,1,1,1,1,1]}
    }
    display(){
        this.layer.background(100)
        this.unranked.display('tier')
        this.layer.fill(types.color.card[0].fill)
        this.layer.stroke(types.color.card[0].stroke)
        for(let a=0,la=this.tiers.length;a<la;a++){
            this.layer.strokeWeight(3*this.anim.tiers[a])
            this.layer.rect(26,22+a*28,32*this.anim.tiers[a],20*this.anim.tiers[a],5*this.anim.tiers[a])
        }
        for(let a=0,la=this.anim.options.length;a<la;a++){
            this.layer.strokeWeight(5*this.anim.options[a])
            this.layer.rect(130+a*80,450,64*this.anim.options[a],40*this.anim.options[a],10*this.anim.options[a])
        }
        this.layer.fill(0)
        this.layer.noStroke()
        for(let a=0,la=this.tiers.length;a<la;a++){
            this.layer.textSize(8*this.anim.tiers[a])
            this.layer.text(this.anim.name[a]+' Tier',26,22+a*28-4*this.anim.tiers[a])
            this.layer.text('('+this.tiers[a].cards.length+')',26,22+a*28+4*this.anim.tiers[a])
        }
        for(let a=0,la=this.anim.options.length;a<la;a++){
            this.layer.textSize(10*this.anim.options[a])
            this.layer.text('Put in '+this.anim.name[a]+' Tier',130+a*80,450-5*this.anim.options[a])
            this.layer.text('('+(a+1)+')',130+a*80,450+5*this.anim.options[a])
        }
    }
    update(){
        for(let a=0,la=this.tiers.length;a<la;a++){
            this.anim.tiers[a]=smoothAnim(this.anim.tiers[a],pointInsideBox({position:inputs.rel},{position:{x:26,y:22+a*28},width:32,height:20})&&!this.battle.overlayManager.anyActive,1,1.5,5)
        }
        for(let a=0,la=this.anim.options.length;a<la;a++){
            this.anim.options[a]=smoothAnim(this.anim.tiers[a],pointInsideBox({position:inputs.rel},{position:{x:130+a*80,y:450},width:64,height:40})&&!this.battle.overlayManager.anyActive,1,1.5,5)
        }
        this.unranked.update('tier')
    }
    onClick(){
        for(let a=0,la=this.tiers.length;a<la;a++){
            if(pointInsideBox({position:inputs.rel},{position:{x:26,y:22+a*28},width:32,height:20})){
                this.battle.overlayManager.overlays[a][0].active=true
                this.battle.overlayManager.overlays[a][0].activate()
            }
        }
        for(let a=0,la=this.anim.options.length;a<la;a++){
            if(pointInsideBox({position:inputs.rel},{position:{x:130+a*80,y:450},width:64,height:40})){
                this.unranked.send(this.tiers[a].cards,0,1)
            }
        }
    }
    onKey(key,code){
        for(let a=0,la=this.anim.options.length;a<la;a++){
            if((int(key)+9)%10==a){
                this.unranked.send(this.tiers[a].cards,0,1)
            }
        }
    }
}