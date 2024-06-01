class overlayManager{
    constructor(layer,battle,initMode){
        this.layer=layer
        this.battle=battle

        this.overlays=[]
        switch(initMode){
            case 0:
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
                    [new overlay(this.layer,this.battle,0,2,[4,0,0])],//remove number cards, no return
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
                    [new overlay(this.layer,this.battle,0,2,[17])],//double upgrade card, no return, out of rewards
                    [new overlay(this.layer,this.battle,0,2,[18])],//bring in draw card, upgrade, no return
                    [new overlay(this.layer,this.battle,0,2,[19])],//bring in discard card to draw, no return,30
                    [new overlay(this.layer,this.battle,0,2,[20])],//bring in first 3 draw card as free, no return
                    [new overlay(this.layer,this.battle,0,2,[4,1,2])],//remove card, obliterative
                    [new overlay(this.layer,this.battle,0,2,[21])],//bring in discard card, no return
                    [new overlay(this.layer,this.battle,0,2,[22])],//bring in draw card, no return
                    [new overlay(this.layer,this.battle,0,8,[1])],//new card to hand, allcard
                    [new overlay(this.layer,this.battle,0,2,[23,3])],//view draw (ordered, only 3)
                    [new overlay(this.layer,this.battle,0,2,[25])],//bring in draw card, originated, no return
                    [new overlay(this.layer,this.battle,0,9,[0])],//choose card to techify
                    [new overlay(this.layer,this.battle,0,2,[26])],//smush together
                    [new overlay(this.layer,this.battle,0,2,[27])],//bring in deck card, no return,40
                    [new overlay(this.layer,this.battle,0,10,[])],//see mods
                    [new overlay(this.layer,this.battle,0,11,[])],//add mods
                    [new overlay(this.layer,this.battle,0,2,[28])],//double or nothing, no return
                    [new overlay(this.layer,this.battle,0,2,[29])],//random edition, no return
                    [new overlay(this.layer,this.battle,0,12,[])],//select boss
                    [new overlay(this.layer,this.battle,0,2,[30,0])],//exhaust draw card, no return
                    [new overlay(this.layer,this.battle,0,2,[31,0])],//exhaust discard card, no return
                    [new overlay(this.layer,this.battle,0,2,[32])],//silver edition, no return
                    [new overlay(this.layer,this.battle,0,2,[33])],//polychrome edition, no return
                    [new overlay(this.layer,this.battle,0,2,[34])],//bring in discard card as confused, no return,50
                    [new overlay(this.layer,this.battle,0,13,[])],//output stats and write name
                    [new overlay(this.layer,this.battle,0,2,[35])],//negative edition, no return
                    [new overlay(this.layer,this.battle,0,2,[36])],//duplicate common card 2 times, no return
                    [new overlay(this.layer,this.battle,0,2,[37])],//make card anti-innate
                    [new overlay(this.layer,this.battle,0,2,[38])],//foil edition and double duplicate, no return
                    [new overlay(this.layer,this.battle,0,2,[39])],//rewind discard card, no return
                    [new overlay(this.layer,this.battle,0,2,[40])],//rewind discard card, double upgrade, no return
                    [new overlay(this.layer,this.battle,0,2,[41,0,0])],//scry
                    [new overlay(this.layer,this.battle,0,2,[42])],//rewind discard card, cost down, no return
                    [new overlay(this.layer,this.battle,0,14,[])],//select intent,60
                    [new overlay(this.layer,this.battle,0,15,[])],//select combat
                    [new overlay(this.layer,this.battle,0,2,[43])],//deck card cost down
                    [new overlay(this.layer,this.battle,0,2,[44,0,0])],//scry, cost 0
                    [new overlay(this.layer,this.battle,0,16,[])],//mtg mana choice
                    [new overlay(this.layer,this.battle,0,2,[45,0,0,0])],//exhaust draw card, then trigger exhaust discard, no return
                    [new overlay(this.layer,this.battle,0,2,[46,0,0])],//exhaust discard card, then trigger hand discard, no return
                    [new overlay(this.layer,this.battle,0,2,[47,0,0,0])],//scry, freeze target
                    [new overlay(this.layer,this.battle,0,2,[48,0,0])],//scry, shuffle afterward
                    [new overlay(this.layer,this.battle,0,2,[49,0,0,0])],//scry, draw into intangible
                    [new overlay(this.layer,this.battle,0,17,[0])],//dual card choice,70
                    [new overlay(this.layer,this.battle,0,2,[50])],//random edition basic, no return
                    [new overlay(this.layer,this.battle,0,2,[51])],//become colorless, no return

                )
                if(this.battle.players==2){
                    this.copyOverlays()
                }
                this.positionOverlays()
                this.priority=[51,61,64,41,42,24,4,16,38,17,3,26,28,10,35,6,44,71,72,48,49,12,0,25,1,13,36,2,15,5,32,7,18,50,30,56,57,58,67,68,69,70,63,59,33,52,53,8,65,66,46,47,34,37,19,20,21,22,23,29,31,40,9,14,62,54,11,27,39,43,55,45,60]
            break
            case 1:
                this.overlays.push(
                    [new overlay(this.layer,this.battle,0,2,[24,0])],//view tier 1
                    [new overlay(this.layer,this.battle,0,2,[24,1])],//view tier 2
                    [new overlay(this.layer,this.battle,0,2,[24,2])],//view tier 3
                    [new overlay(this.layer,this.battle,0,2,[24,3])],//view tier 4,
                    [new overlay(this.layer,this.battle,0,2,[24,4])],//view tier 5
                    [new overlay(this.layer,this.battle,0,2,[24,5])],//view tier 6
                    [new overlay(this.layer,this.battle,0,2,[24,6])],//view tier 7
                    [new overlay(this.layer,this.battle,0,2,[24,7])],//view tier 8
                    [new overlay(this.layer,this.battle,0,2,[24,8])],//view tier 9
                )
                this.priority=[0,1,2,3,4,5,6,7,8]
            break
        }
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
    closeElse(indices){
        for(let a=0,la=this.overlays.length;a<la;a++){
            if(!indices.includes(a)){
                this.overlays[a].forEach(overlay=>overlay.active=false)
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
                    a=la
                    b=lb
                }
            }
        }
    }
}