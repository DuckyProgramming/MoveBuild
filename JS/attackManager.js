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
        this.energy=0
        this.target=[0]

        this.cost=0
        this.targetInfo=[0,0,0]
        this.targetClass=0

        this.targetDistance=0
        this.position={x:0,y:0}
        this.relativePosition={x:0,y:0}
        this.tilePosition={x:0,y:0}
    }
    clear(){
        this.attacks=[]
        this.targetInfo[0]=0
    }
    execute(){
        this.attacks.push(new attack(this.type,this.battle,this.player,this.effect,this.attackClass,this.user,this.energy,this.target,this.targetDistance,this.targetClass))
    }
    update(){
        for(let a=0;a<game.animRate;a++){
            if(this.attacks.length>0){
                this.attacks[0].update()
                if(this.attacks[0].remove){
                    delete this.attacks[0]
                    this.attacks.splice(0,1)
                }
            }
        }
    }
}