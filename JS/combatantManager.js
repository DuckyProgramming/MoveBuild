class combatantManager{
    constructor(layer){
        this.layer=layer
        this.combatants=[]
    }
    addCombatant(x,y,tileX,tileY,type,team,direction){
        this.combatants.push(new combatant(this.layer,x,y,tileX,tileY,type,team,direction))
    }
    display(scene,height,args){
        switch(scene){
            case 'battle':
                for(let a=0;a<height;a++){
                    for(let b=0,lb=this.combatants.length;b<lb;b++){
                        if(this.combatants[b].tilePosition.y==a){
                            this.combatants[b].display()
                        }
                    }
                }
                this.layer.noFill()
                this.layer.stroke(255)
                this.layer.strokeWeight(3)
                for(let a=0,la=this.combatants.length;a<la;a++){
                    if((args[0].targetInfo[0]==2&&this.combatants[a].life>0&&this.combatants[a].team!=this.combatants[args[0].user].team&&legalTargetCombatant(0,args[0].targetInfo[1],this.combatants[a],this.combatants[args[0].user]))&&this.combatants[a].infoAnim.target[0]<1){
                        this.combatants[a].infoAnim.target[0]=round(this.combatants[a].infoAnim.target[0]*5+1)/5
                    }else if(!(args[0].targetInfo[0]==2&&this.combatants[a].life>0&&this.combatants[a].team!=this.combatants[args[0].user].team&&legalTargetCombatant(0,args[0].targetInfo[1],this.combatants[a],this.combatants[args[0].user]))&&this.combatants[a].infoAnim.target[0]>0){
                        this.combatants[a].infoAnim.target[0]=round(this.combatants[a].infoAnim.target[0]*5-1)/5
                    }
                }
            break
        }
    }
    displayInfo(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            this.combatants[a].displayInfo()
        }
    }
    update(){
        for(let a=0,la=this.combatants.length;a<la;a++){
            this.combatants[a].update()
            if(dist(inputs.rel.x,inputs.rel.y,this.combatants[a].position.x,this.combatants[a].position.y)<40){
                this.combatants[a].infoAnim.upSize=true
            }else{
                this.combatants[a].infoAnim.upSize=false
            }
        }
    }
}