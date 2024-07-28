class attackManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle

        this.attacks=[]

        this.type=0
        this.player=0
        this.effect=0
        this.attackClass=0
        this.user=0
        this.level=0
        this.color=0
        this.energy=0
        this.target=[0]
        this.mtgManaColor=0

        this.cost=0
        this.targetInfo=[0,0,0]
        this.targetClass=0
        this.combo=0
        this.amplify=false
        this.relPos=[0,0]
        this.limit=0
        this.id=0
        this.edition=0
        this.drawn=0
        this.cost=0

        this.targetDistance=0
        this.position={x:0,y:0}
        this.relativePosition={x:0,y:0}
        this.tilePosition={x:0,y:0}
        this.endAfter=false
        this.nodeAfter=false
        this.finalAfter=false
    }
    clear(){
        for(let a=0,la=this.attacks.length;a<la;a++){
            delete this.attacks[a]
            this.attacks.splice(a,1)
            a--
            la--
        }
        this.attacks=[]
        this.targetInfo[0]=0
    }
    execute(){
        if(
            !(this.battle.modded(91)&&this.cost==0&&floor(random(0,4))==0)&&
            !(variants.cursed&&floor(random(0,5))==0)&&
            !(this.battle.relicManager.hasRelic(288,this.player)&&floor(random(0,20))<this.battle.relicManager.active[288][a+1])
        ){
            this.attacks.push(new attack(this.type,this.battle,this.player,this.effect,this.attackClass,this.user,this.level,this.color,this.energy,this.target,this.targetDistance,this.targetClass,this.combo,{replay:0},this.amplify,this.relPos,this.limit,this.id,this.edition,this.drawn,this.cost))
            this.battle.replayManager.list.push(new attack(this.type,this.battle,this.player,this.effect,this.attackClass,this.user,this.level,this.color,this.energy,copyArray(this.target),this.targetDistance,this.targetClass,this.combo,{replay:1,direction:this.attacks[this.attacks.length-1].userCombatant.goal.anim.direction},this.amplify,this.relPos,this.limit,this.id,this.edition,this.drawn))
            this.battle.turnManager.loads=0
        }
    }
    editionCard(type){
        switch(type){
            case -6:
                for(let a=0,la=this.effect.length;a<la;a++){
                    this.effect[a]=floor(random(1,this.effect[a]+1))
                }
            break
            case 6:
                for(let a=0,la=this.effect.length;a<la;a++){
                    this.effect[a]=floor(random(this.effect[a],this.effect[a]*2+1))
                }
            break
        }
    }
    spendCard(spend,card,player){
        if(this.battle.relicManager.hasRelic(393,player)&&card.basic){
            let mult=1
            for(let a=0,la=spend.length;a<la;a++){
                if(spend[a]==0){
                    mult+=this.battle.relicManager.active[393][player+1]
                }
            }
            for(let a=0,la=this.effect.length;a<la;a++){
                this.effect[a]*=mult
            }
        }
    }
    after(){
        if(this.battle.combatantManager.summons.length>0){
            this.battle.combatantManager.outSummons()
        }
        if(this.endAfter){
            this.endAfter=false
            this.battle.endTurn()
        }else if(this.nodeAfter){
            this.nodeAfter=false
            this.battle.nodeManager.enterNode(this.battle.encounter.class>2||this.battle.encounter.class<0?0:this.battle.encounter.class,this.battle.nodeManager.tilePosition.y,false)
        }else if(this.finalAfter){
            this.finalAfter=false
            this.battle.nodeManager.world=3
            this.battle.setupBattle(types.encounter[findName(['Rewriter','Eternal Judge'][floor(random(0,2))],types.encounter)])
        }
    }
    update(){
        for(let a=0;a<game.animRate;a++){
            if(this.attacks.length>0){
                if(this.attacks[0].timer==0&&this.attacks[0].remove){
                    delete this.attacks[0]
                    this.attacks.splice(0,1)
                    this.after()
                }else{
                    this.attacks[0].update()
                    if(this.attacks[0].remove){
                        delete this.attacks[0]
                        this.attacks.splice(0,1)
                        this.after()
                    }
                }
            }
        }
    }
}