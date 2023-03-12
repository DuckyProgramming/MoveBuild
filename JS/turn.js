class turn{
    constructor(type,battle,effect,user){
        this.type=type

        this.battle=battle
        this.effect=effect
        this.user=user

        this.userCombatant=this.battle.combatantManager.combatants[this.user]
        
        this.timer=0
        this.remove=false
    }
    update(){
        this.timer++
        switch(this.type){
            case 0:
                switch(this.userCombatant.intent){
                }
            break
            case 1:
            break
        }
    }
}