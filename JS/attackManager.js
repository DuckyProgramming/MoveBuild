class attackManager{
    constructor(){
        this.attacks=[]

        this.type=0
        this.effect=0
        this.user=0
        this.target=[0]

        this.cost=0
        this.targetInfo=[0,0,0]
    }
    execute(combatantManager){
        this.attacks.push(new attack(this.type,this.effect,this.user,this.target))
        switch(this.type){
            case 1:
            break
        }
    }
    update(combatantManager){
        for(let a=0;a<game.animRate;a++){
            if(this.attacks.length>0){
                this.attacks[0].update(combatantManager)
                if(this.attacks[0].remove){
                    this.attacks.splice(0,1)
                }
            }
        }
    }
}