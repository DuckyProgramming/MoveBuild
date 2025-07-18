class overlayManager{
    constructor(layer,battle,initMode){
        this.layer=layer
        this.battle=battle

        this.overlays=[]
        this.priority=[]
        switch(initMode){
            case 0:
                this.overlays.push(
                    [new overlay(this.layer,this.battle,0,1,[0])],//rewards,0
                    [new overlay(this.layer,this.battle,0,2,[0])],//view reserve
                    [new overlay(this.layer,this.battle,0,2,[1])],//view discard
                    [new overlay(this.layer,this.battle,0,3,[0])],//new card to deck
                    [new overlay(this.layer,this.battle,0,2,[2])],//view deck
                    [new overlay(this.layer,this.battle,0,2,[3,1])],//upgrade card, no return
                    [new overlay(this.layer,this.battle,0,2,[4,1,0])],//remove card, no return
                    [new overlay(this.layer,this.battle,0,2,[5,0,1])],//bring in discard card, no return
                    [new overlay(this.layer,this.battle,0,2,[6,0,1])],//bring in draw card, no return
                    [new overlay(this.layer,this.battle,0,2,[7,0,0])],//transform card, no return
                    [new overlay(this.layer,this.battle,0,3,[1])],//new card to hand,10
                    [new overlay(this.layer,this.battle,0,4,[])],//end stats
                    [new overlay(this.layer,this.battle,0,2,[8])],//duplicate card, no return
                    [new overlay(this.layer,this.battle,0,2,[9])],//view reserve (ordered)
                    [new overlay(this.layer,this.battle,0,2,[10])],//make card innate
                    [new overlay(this.layer,this.battle,0,2,[4,0,0])],//remove number cards, no return
                    [new overlay(this.layer,this.battle,0,5,[])],//sell relic, no return
                    [new overlay(this.layer,this.battle,0,2,[4,1,1])],//remove card, return through event (bonfire spirits)
                    [new overlay(this.layer,this.battle,0,2,[11])],//bring in discard card as free, no return
                    [new overlay(this.layer,this.battle,0,2,[12])],//bring in exhaust card, no return
                    [new overlay(this.layer,this.battle,0,2,[13,0,1])],//bring in draw card-attack, no return,20
                    [new overlay(this.layer,this.battle,0,2,[14,0,1])],//bring in draw card-defense, no return
                    [new overlay(this.layer,this.battle,0,2,[15,0,1])],//bring in draw card-movement, no return
                    [new overlay(this.layer,this.battle,0,2,[16,0,1])],//bring in draw card-power, no return
                    [new overlay(this.layer,this.battle,0,6,[])],//dictionary
                    [new overlay(this.layer,this.battle,0,1,[1])],//rewards (draft)
                    [new overlay(this.layer,this.battle,0,2,[3,1])],//upgrade card, no return, out of rewards
                    [new overlay(this.layer,this.battle,0,7,[])],//food
                    [new overlay(this.layer,this.battle,0,2,[17,1])],//deluxe upgrade card, no return
                    [new overlay(this.layer,this.battle,0,2,[18])],//bring in draw card, upgrade, no return
                    [new overlay(this.layer,this.battle,0,2,[19])],//bring in discard card to draw, no return,30
                    [new overlay(this.layer,this.battle,0,2,[20,0])],//bring in first number draw card as free, no return
                    [new overlay(this.layer,this.battle,0,2,[4,1,2])],//remove card, obliterative
                    [new overlay(this.layer,this.battle,0,2,[21])],//bring in discard card, get block, no return
                    [new overlay(this.layer,this.battle,0,2,[22])],//bring in draw card, get block, no return
                    [new overlay(this.layer,this.battle,0,8,[1,-1,0])],//new card to hand, allcard
                    [new overlay(this.layer,this.battle,0,2,[23,3])],//view draw (ordered, only 3)
                    [new overlay(this.layer,this.battle,0,2,[25])],//bring in draw card, originated (card slot), no return
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
                    [new overlay(this.layer,this.battle,0,2,[43,1])],//deck card cost down
                    [new overlay(this.layer,this.battle,0,2,[44,0,0])],//scry, cost 0
                    [new overlay(this.layer,this.battle,0,16,[0])],//mtg mana choice
                    [new overlay(this.layer,this.battle,0,2,[45,0,0,0])],//exhaust draw card, then trigger exhaust discard, no return
                    [new overlay(this.layer,this.battle,0,2,[46,0,0])],//exhaust discard card, then trigger hand discard, no return
                    [new overlay(this.layer,this.battle,0,2,[47,0,0,0])],//scry, freeze target
                    [new overlay(this.layer,this.battle,0,2,[48,0,0])],//scry, shuffle afterward
                    [new overlay(this.layer,this.battle,0,2,[49,0,0,0,4])],//scry, draw power into intangible
                    [new overlay(this.layer,this.battle,0,17,[0,2])],//dual card choice,70
                    [new overlay(this.layer,this.battle,0,2,[50])],//random edition basic, no return
                    [new overlay(this.layer,this.battle,0,2,[51])],//become colorless, no return
                    [new overlay(this.layer,this.battle,0,2,[52,0])],//transform discard card, no return
                    [new overlay(this.layer,this.battle,0,2,[53])],//make attack innate
                    [new overlay(this.layer,this.battle,0,2,[54])],//make defend innate
                    [new overlay(this.layer,this.battle,0,2,[55])],//make movement innate
                    [new overlay(this.layer,this.battle,0,2,[56])],//make power innate
                    [new overlay(this.layer,this.battle,0,2,[57])],//polychrome edition and double duplicate, no return
                    [new overlay(this.layer,this.battle,0,2,[58,0])],//transform draw card, no return
                    [new overlay(this.layer,this.battle,0,2,[59,0,0,0,0,0])],//scry, damage and block,80
                    [new overlay(this.layer,this.battle,0,2,[60,0])],//bring in draw card as multiple copies, no return
                    [new overlay(this.layer,this.battle,0,18,[])],//select combat type
                    [new overlay(this.layer,this.battle,0,3,[2])],//new card to hand and deck
                    [new overlay(this.layer,this.battle,0,2,[61])],//make power innate
                    [new overlay(this.layer,this.battle,0,2,[62,0,1])],//bring in draw card-skill, no return
                    [new overlay(this.layer,this.battle,0,2,[63])],//bring in copy of draw card, no return
                    [new overlay(this.layer,this.battle,0,2,[64])],//foil edition, no return
                    [new overlay(this.layer,this.battle,0,2,[65])],//erratic edition, no return
                    [new overlay(this.layer,this.battle,0,2,[66,0])],//transform basic card, no return
                    [new overlay(this.layer,this.battle,0,2,[67,1,0])],//remove non-basic card, no return,90
                    [new overlay(this.layer,this.battle,0,2,[68])],//make card ethereal, no return
                    [new overlay(this.layer,this.battle,0,2,[69])],//make card exhaust, no return
                    [new overlay(this.layer,this.battle,0,2,[70])],//make card health-costing, no return
                    [new overlay(this.layer,this.battle,0,2,[71])],//return removed to deck
                    [new overlay(this.layer,this.battle,0,8,[1,0,0])],//new card to hand, all common card
                    [new overlay(this.layer,this.battle,0,2,[72])],//negative edition smush, no return
                    [new overlay(this.layer,this.battle,0,2,[73,0,0,0])],//scry, block on defense
                    [new overlay(this.layer,this.battle,0,2,[4,1,3])],//remove, edition transfer
                    [new overlay(this.layer,this.battle,0,2,[7,0,1])],//transform and upgrade card, no return
                    [new overlay(this.layer,this.battle,0,2,[74])],//bring in discard card as free, no return,100
                    [new overlay(this.layer,this.battle,0,2,[75,0])],//double cost and effect of attack, no return
                    [new overlay(this.layer,this.battle,0,2,[75,1])],//double cost and effect of defense, no return
                    [new overlay(this.layer,this.battle,0,2,[3,0])],//upgrade number cards, no return
                    [new overlay(this.layer,this.battle,0,2,[17,0])],//deluxe upgrade number cards, no return
                    [new overlay(this.layer,this.battle,0,2,[76])],//duplicate card, costs 1 more, no return
                    [new overlay(this.layer,this.battle,0,2,[77,1])],//upgrade discard card, no return
                    [new overlay(this.layer,this.battle,0,2,[78])],//transform any, double upgrade, edition, no return
                    [new overlay(this.layer,this.battle,0,17,[1,2])],//dual card choice, secondary
                    [new overlay(this.layer,this.battle,0,2,[79])],//bring in discard card as duplicate once, no return
                    [new overlay(this.layer,this.battle,0,2,[80,0])],//exhaust from first cards of draw, no return,110
                    [new overlay(this.layer,this.battle,0,17,[0,3])],//triple card choice
                    [new overlay(this.layer,this.battle,0,2,[81,1,0])],//remove curse, no return
                    [new overlay(this.layer,this.battle,0,2,[82,0])],//transform curse, no return
                    [new overlay(this.layer,this.battle,0,16,[1])],//mtg any energy
                    [new overlay(this.layer,this.battle,0,8,[1,-1,1])],//new card to hand, all disbanded card
                    [new overlay(this.layer,this.battle,0,2,[83])],//make card replenish, no return
                    [new overlay(this.layer,this.battle,0,2,[84,0,[]])],//scry, drawabstract, no return
                    [new overlay(this.layer,this.battle,0,2,[85,0,0,0])],//scry, vulnerable target
                    [new overlay(this.layer,this.battle,0,2,[7,1,0])],//transform number cards, no return
                    [new overlay(this.layer,this.battle,0,16,[2])],//mtg mana removal choice,120
                    [new overlay(this.layer,this.battle,0,16,[3])],//mtg mana swap
                    [new overlay(this.layer,this.battle,0,2,[86])],//glitched edition, no return
                    [new overlay(this.layer,this.battle,0,2,[87,1,0])],//remove card, no return, unskippable
                    [new overlay(this.layer,this.battle,0,2,[88])],//return removed to deck, unskippable
                    [new overlay(this.layer,this.battle,0,2,[49,0,0,0,11])],//scry, draw skill into intangible
                    [new overlay(this.layer,this.battle,0,2,[49,0,0,0,11])],//scry, draw skill into intangible
                    [new overlay(this.layer,this.battle,0,19,[])],//card service choice
                    [new overlay(this.layer,this.battle,0,2,[5,1,1])],//bring in discard card from ally, no return
                    [new overlay(this.layer,this.battle,0,2,[6,1,1])],//bring in draw card from ally, no return
                    [new overlay(this.layer,this.battle,0,2,[89])],//free basic, no return,130
                    [new overlay(this.layer,this.battle,0,2,[90,0,0])],//link number cards, no return
                    [new overlay(this.layer,this.battle,0,20,[])],//pod constructor
                    [new overlay(this.layer,this.battle,0,2,[6,0,0])],//bring in number draw cards, no return
                    [new overlay(this.layer,this.battle,0,21,[0])],//set relic 458, quality disguise
                    [new overlay(this.layer,this.battle,0,8,[0,0,2])],//new card to deck, relic 459, backtick
                    [new overlay(this.layer,this.battle,0,2,[91,1])],//upgrade and duplicate card, no return
                    [new overlay(this.layer,this.battle,0,2,[92,1,0])],//remove upgraded card, no return
                    [new overlay(this.layer,this.battle,0,2,[93,0,0])],//transform upgraded card, no return
                    [new overlay(this.layer,this.battle,0,2,[94])],//flip draw card to top
                    [new overlay(this.layer,this.battle,0,2,[4,1,4])],//remove card, return through relic (vitrine),140
                    [new overlay(this.layer,this.battle,0,22,[1,[0,1]])],//all common and uncommon relics, no return
                    [new overlay(this.layer,this.battle,0,22,[0,[0,1,2,3,4]])],//all relics, no return
                    [new overlay(this.layer,this.battle,0,2,[95])],//bring in foil copy of draw card, no return
                    [new overlay(this.layer,this.battle,0,23,[])],//save prompt
                    [new overlay(this.layer,this.battle,0,24,[])],//dictionary
                    [new overlay(this.layer,this.battle,0,2,[96,0])],//make card in draw pile ethereal and duplicate it
                    [new overlay(this.layer,this.battle,0,2,[97])],//view exhaust
                    [new overlay(this.layer,this.battle,0,25,[0])],//wheel of money
                    [new overlay(this.layer,this.battle,0,25,[1])],//wheel of stab
                    [new overlay(this.layer,this.battle,0,8,[0,-1,2])],//new card to deck, brakecheck,150
                    [new overlay(this.layer,this.battle,0,26,[0])],//money math
                    [new overlay(this.layer,this.battle,0,2,[98,1,0])],//remove rare card, no return
                    [new overlay(this.layer,this.battle,0,2,[99])],//shuffle any discard cards into draw
                    [new overlay(this.layer,this.battle,0,2,[100,0,0,0])],//exhaust draw card, then trigger exhaust discard, no return
                    [new overlay(this.layer,this.battle,0,2,[101,0,0])],//exhaust discard card, then trigger hand discard, no return
                    [new overlay(this.layer,this.battle,0,2,[12,1])],//bring in exhaust card from ally, no return
                    [new overlay(this.layer,this.battle,0,2,[27,1])],//bring in deck card from ally, no return
                    [new overlay(this.layer,this.battle,0,2,[102])],//bring in discard card as free and retain until played, no return
                    [new overlay(this.layer,this.battle,0,2,[103])],//make draw card free and replenish
                    [new overlay(this.layer,this.battle,0,2,[104])],//discard draw card,160
                    [new overlay(this.layer,this.battle,0,2,[105,0])],//bring in first number draw card, no return
                    [new overlay(this.layer,this.battle,0,2,[106])],//make card quickdiscard
                    [new overlay(this.layer,this.battle,0,2,[107])],//make card add d6block
                    [new overlay(this.layer,this.battle,0,2,[108])],//make card cycle skill
                    [new overlay(this.layer,this.battle,0,2,[109])],//make card quickdraw
                    [new overlay(this.layer,this.battle,0,2,[110])],//make card retain
                    [new overlay(this.layer,this.battle,0,2,[111])],//make discard card free
                    [new overlay(this.layer,this.battle,0,2,[112,0])],//recovery
                    [new overlay(this.layer,this.battle,0,28,[])],//death note
                    [new overlay(this.layer,this.battle,0,8,[0,0,3])],//new card to deck, relic 497, typewriter,170
                    [new overlay(this.layer,this.battle,0,2,[113])],//make card innate and free
                    [new overlay(this.layer,this.battle,0,29,[])],//propup
                    [new overlay(this.layer,this.battle,0,2,[114,0])],//exhaust draw card, no return
                    [new overlay(this.layer,this.battle,0,25,[2])],//wheel of surprise
                    [new overlay(this.layer,this.battle,0,2,[115])],//duplicate uncommon card, no return
                )
                if(this.battle.players==2){
                    this.copyOverlays()
                }
                this.positionOverlays()
            break
            case 1:
                this.overlays.push(
                    [new overlay(this.layer,this.battle,0,2,[24,0])],//view tier 1
                    [new overlay(this.layer,this.battle,0,2,[24,1])],//view tier 2
                    [new overlay(this.layer,this.battle,0,2,[24,2])],//view tier 3
                    [new overlay(this.layer,this.battle,0,2,[24,3])],//view tier 4
                    [new overlay(this.layer,this.battle,0,2,[24,4])],//view tier 5
                    [new overlay(this.layer,this.battle,0,2,[24,5])],//view tier 6
                    [new overlay(this.layer,this.battle,0,2,[24,6])],//view tier 7
                    [new overlay(this.layer,this.battle,0,2,[24,7])],//view tier 8
                    [new overlay(this.layer,this.battle,0,2,[24,8])],//view tier 9
                )
            break
            case 2:
                this.overlays.push(
                    [new overlay(this.layer,this.battle,0,27,[])],//movebuildle
                )
        }
        for(let a=0,la=this.overlays.length;a<la;a++){
            for(let b=0,lb=this.overlays[a].length;b<lb;b++){
                this.overlays[a][b].index=a
            }
        }
        this.anyActive=false
    }
    save(){
        let composite={
            additionalOptions:[],
        }
        this.overlays[3].forEach(overlay=>composite.additionalOptions.push(overlay.additionalOptions))
        return composite
    }
    load(composite){
        for(let a=0,la=composite.additionalOptions.length;a<la;a++){
            this.overlays[3][a].additionalOptions=composite.additionalOptions[a]
        }
    }
    anySpecificActive(index){
        for(let a=0,la=this.overlays[index].length;a<la;a++){
            if(this.overlays[index][a].active){
                return true
            }
        }
        return false
    }
    anyNotSpecificActive(index){
        for(let a=0,la=this.overlays.length;a<la;a++){
            if(a!=index){
                for(let b=0,lb=this.overlays[a].length;b<lb;b++){
                    if(this.overlays[a][b].active){
                        return true
                    }
                }
            }
        }
        return false
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
        let firstType=-1
        for(let a=0,la=this.priority.length-1;a<la;a++){
            for(let b=a+1,lb=this.priority.length;b<lb;b++){
                if(this.priority[a][0]==this.priority[b][0]&&this.priority[a][1]>this.priority[b][1]){
                    [this.priority[a][1],this.priority[b][1]]=[this.priority[b][1],this.priority[a][1]]
                }
            }
        }
        for(let a=0,la=this.priority.length;a<la;a++){
            this.overlays[this.priority[a][0]][this.priority[a][1]].update(first,firstType)
            if(this.overlays[this.priority[a][0]][this.priority[a][1]].fade>0){
                first=this.overlays[this.priority[a][0]][this.priority[a][1]].index
                firstType=this.overlays[this.priority[a][0]][this.priority[a][1]].type
            }else if(!this.overlays[this.priority[a][0]][this.priority[a][1]].active){
                this.priority.splice(a,1)
                a--
                la--
            }
        }
        this.anyActive=false
        for(let a=0,la=this.overlays.length;a<la;a++){
            for(let b=0,lb=this.overlays[a].length;b<lb;b++){
                if(this.overlays[a][b].active){
                    this.anyActive=true
                    if(!arrayIncludes(this.priority,[a,b])){
                        this.priority.push([a,b])
                    }
                }
            }
        }
    }
    onClick(){
        for(let a=0,la=this.priority.length;a<la;a++){
            if(this.overlays[this.priority[a][0]][this.priority[a][1]].active&&this.overlays[this.priority[a][0]][this.priority[a][1]].fade>0.5){
                this.overlays[this.priority[a][0]][this.priority[a][1]].onClick()
            }
        }
    }
    onKey(key,code){
        for(let a=0,la=this.priority.length;a<la;a++){
            if(this.overlays[this.priority[a][0]][this.priority[a][1]].active&&this.overlays[this.priority[a][0]][this.priority[a][1]].fade>0.5){
                this.overlays[this.priority[a][0]][this.priority[a][1]].onKey(key,code)
                a=la
            }
        }
    }
}