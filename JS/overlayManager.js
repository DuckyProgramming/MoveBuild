class overlayManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle

        this.overlays=[]
        this.overlays.push(
            [new overlay(this.layer,this.battle,0,1,[0])],//rewards,0
            [new overlay(this.layer,this.battle,0,2,[0])],//view reserve
            [new overlay(this.layer,this.battle,0,2,[1])],//view discard
            [new overlay(this.layer,this.battle,0,3,[0])],//new card to deck
            [new overlay(this.layer,this.battle,0,2,[2])],//view deck
            [new overlay(this.layer,this.battle,0,2,[3])],//upgrade card, no return
            [new overlay(this.layer,this.battle,0,2,[4,1,0])],//remove card, no return
            [new overlay(this.layer,this.battle,0,2,[5])],//bring in discard card, no return
            [new overlay(this.layer,this.battle,0,2,[6])],//bring in draw card, no return
            [new overlay(this.layer,this.battle,0,2,[7])],//transform card, no return
            [new overlay(this.layer,this.battle,0,3,[1])],//new card to hand,10
            [new overlay(this.layer,this.battle,0,4,[])],//end stats
            [new overlay(this.layer,this.battle,0,2,[8])],//duplicate card, no return
            [new overlay(this.layer,this.battle,0,2,[9])],//view reserve (ordered)
            [new overlay(this.layer,this.battle,0,2,[10])],//make card innate
            [new overlay(this.layer,this.battle,0,2,[4,3,0])],//remove 3 cards, no return
            [new overlay(this.layer,this.battle,0,5,[0])],//sell relic, no return
            [new overlay(this.layer,this.battle,0,2,[4,1,1])],//remove card, return through event (bonfire spirits)
            [new overlay(this.layer,this.battle,0,2,[11])],//bring in discard card as free, no return
            [new overlay(this.layer,this.battle,0,2,[12])],//bring in exhaust card, no return
            [new overlay(this.layer,this.battle,0,2,[13])],//bring in draw card-attack, no return,20
            [new overlay(this.layer,this.battle,0,2,[14])],//bring in draw card-defense, no return
            [new overlay(this.layer,this.battle,0,2,[15])],//bring in draw card-movement, no return
            [new overlay(this.layer,this.battle,0,2,[16])],//bring in draw card-power, no return
            [new overlay(this.layer,this.battle,0,6,[])],//dictionary
            [new overlay(this.layer,this.battle,0,1,[1])],//rewards (draft)
            [new overlay(this.layer,this.battle,0,2,[3])],//upgrade card, no return, out of rewards
            [new overlay(this.layer,this.battle,0,7,[])],//food
            [new overlay(this.layer,this.battle,0,2,[17])],//upgrade card, no return, out of rewards, SOLITAIRE

        )
        if(this.battle.players==2){
            this.copyOverlays()
        }
        this.positionOverlays()
        this.priority=[24,17,3,26,28,10,0,25,1,13,2,16,4,15,5,6,7,18,8,19,20,21,22,23,9,12,14,11,27]
        this.anyActive=false
    }
    copyOverlays(){
        for(let a=0,la=this.overlays.length;a<la;a++){
            this.overlays[a].push(new overlay(this.overlays[a][0].layer,this.overlays[a][0].battle,this.overlays[a][0].player+1,this.overlays[a][0].type,this.overlays[a][0].args))
        }
    }
    positionOverlays(){
        for(let a=0,la=this.overlays.length;a<la;a++){
            this.overlays[a].forEach(overlay=>overlay.getPosKey())
        }
    }
    closeAll(){
        for(let a=0,la=this.overlays.length;a<la;a++){
            this.overlays[a].forEach(overlay=>overlay.active=false)
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