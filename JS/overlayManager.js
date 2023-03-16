class overlayManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle

        this.overlays=[]
        this.overlays.push(
            new overlay(this.layer,this.battle,1,[]),//rewards
            new overlay(this.layer,this.battle,2,[0]),//view reserve
            new overlay(this.layer,this.battle,2,[1]),//view discard
            new overlay(this.layer,this.battle,3,[0])//new card to deck
        )
        this.priority=[3,0,1,2]
        this.anyActive=false
    }
    closeAll(){
        for(let a=0,la=this.overlays.length;a<la;a++){
            this.overlays[a].active=false
        }
    }
    display(){
        for(let a=0,la=this.overlays.length;a<la;a++){
            if(this.overlays[a].fade>0){
                this.overlays[a].display()
            }
        }
    }
    update(){
        let first=true
        for(let a=0,la=this.priority.length;a<la;a++){
            this.overlays[this.priority[a]].update(first)
            if(this.overlays[this.priority[a]].fade>0){
                first=false
            }
        }
        this.anyActive=false
        for(let a=0,la=this.overlays.length;a<la;a++){
            if(this.overlays[a].active){
                this.anyActive=true
            }
        }
    }
    onClick(){
        for(let a=0,la=this.overlays.length;a<la;a++){
            this.overlays[a].onClick()
        }
    }
    onKey(key,code){
        for(let a=0,la=this.overlays.length;a<la;a++){
            this.overlays[a].onKey(key,code)
        }
    }
}