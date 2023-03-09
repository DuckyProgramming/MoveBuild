class attack{
    constructor(type,effect,user,target){
        this.type=type
        this.effect=effect
        this.user=user
        this.target=target
        this.timer=0
        this.remove=false
    }
    update(combatantManager){
        this.timer++
        switch(this.type){
            case 1:
                if(this.timer==10){
                    combatantManager.combatants[this.target[0]].takeDamage(this.effect[0])
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 2:
                if(this.timer==10){
                    combatantManager.combatants[this.user].addBlock(this.effect[0])
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
        }
    }
}