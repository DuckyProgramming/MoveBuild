class overlayManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle

        this.overlays=[]
        this.overlays.push(
            [new overlay(this.layer,this.battle,0,1,[])],//rewards,0
            [new overlay(this.layer,this.battle,0,2,[0])],//view reserve
            [new overlay(this.layer,this.battle,0,2,[1])],//view discard
            [new overlay(this.layer,this.battle,0,3,[0])],//new card to deck
            [new overlay(this.layer,this.battle,0,2,[2])],//view deck
            [new overlay(this.layer,this.battle,0,2,[3])],//upgrade card, no return
            [new overlay(this.layer,this.battle,0,2,[4])],//remove card, no return
            [new overlay(this.layer,this.battle,0,2,[5])],//bring in discard card, no return
            [new overlay(this.layer,this.battle,0,2,[6])],//bring in draw card, no return
        )
        if(this.battle.player.length==2){
            this.copyOverlays()
        }
        this.positionOverlays()
        this.priority=[3,0,1,2,4,5,6,7,8]
        this.anyActive=false
    }
    copyOverlays(){
        for(let a=0,la=this.overlays.length;a<la;a++){
            this.overlays[a].push(new overlay(this.overlays[a][0].layer,this.overlays[a][0].battle,this.overlays[a][0].player+1,this.overlays[a][0].type,this.overlays[a][0].args))
        }
    }
    positionOverlays(){
        for(let a=0,la=this.overlays.length;a<la;a++){
            for(let b=0,lb=this.overlays[a].length;b<lb;b++){
                this.overlays[a][b].getPosKey()
            }
        }
    }
    closeAll(){
        for(let a=0,la=this.overlays.length;a<la;a++){
            for(let b=0,lb=this.overlays[a].length;b<lb;b++){
                this.overlays[a][b].active=false
            }
        }
    }
    display(){
        for(let a=0,la=this.overlays.length;a<la;a++){
            for(let b=0,lb=this.overlays[a].length;b<lb;b++){
                if(this.overlays[a][b].fade>0){
                    this.overlays[a][b].display()
                }
            }
        }
    }
    update(){
        let first=-1
        for(let a=0,la=this.priority.length;a<la;a++){
            for(let b=0,lb=this.overlays[this.priority[a]].length;b<lb;b++){
                this.overlays[this.priority[a]][b].update(first)
                if(this.overlays[this.priority[a]][b].fade>0){
                    first=this.overlays[this.priority[a]][b].type
                }
            }
        }
        this.anyActive=false
        for(let a=0,la=this.overlays.length;a<la;a++){
            for(let b=0,lb=this.overlays[a].length;b<lb;b++){
                if(this.overlays[a][b].active){
                    this.anyActive=true
                }
            }
        }
    }
    onClick(){
        for(let a=0,la=this.priority.length;a<la;a++){
            for(let b=0,lb=this.overlays[this.priority[a]].length;b<lb;b++){
                if(this.overlays[this.priority[a]][b].active&&this.overlays[this.priority[a]][b].fade>0.5){
                    this.overlays[this.priority[a]][b].onClick()
                }
            }
        }
    }
    onKey(key,code){
        for(let a=0,la=this.priority.length;a<la;a++){
            for(let b=0,lb=this.overlays[this.priority[a]].length;b<lb;b++){
                if(this.overlays[this.priority[a]][b].active&&this.overlays[this.priority[a]][b].fade>0.5){
                    this.overlays[this.priority[a]][b].onKey(key,code)
                }
            }
        }
    }
}