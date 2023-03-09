class attack{
    constructor(type,effect,user,target,position,relativePosition,tilePosition){
        this.type=type
        this.effect=effect
        this.user=user
        this.target=target
        this.position={x:position.x,y:position.y}
        this.relativePosition={x:relativePosition.x,y:relativePosition.y}
        this.tilePosition={x:tilePosition.x,y:tilePosition.y}
        this.timer=0
        this.remove=false
    }
    update(combatantManager,tileManager){
        this.timer++
        switch(this.type){
            case 1:
                if(this.timer==15){
                    combatantManager.combatants[this.target[0]].takeDamage(this.effect[0])
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 2:
                if(this.timer==15){
                    combatantManager.combatants[this.user].addBlock(this.effect[0])
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 3:
                combatantManager.combatants[this.user].moveTile(atan2(tileManager.tiles[this.target].position.x-this.position.x,tileManager.tiles[this.target].position.y-this.position.y),sqrt((tileManager.tiles[this.target].position.x-this.position.x)**2+(tileManager.tiles[this.target].position.y-this.position.y)**2)/30)
                combatantManager.combatants[this.user].moveRelativeTile(atan2(tileManager.tiles[this.target].relativePosition.x-this.relativePosition.x,tileManager.tiles[this.target].relativePosition.y-this.relativePosition.y),sqrt((tileManager.tiles[this.target].relativePosition.x-this.relativePosition.x)**2+(tileManager.tiles[this.target].relativePosition.y-this.relativePosition.y)**2)/30)
                if(this.timer>=30){
                    combatantManager.combatants[this.user].tilePosition.x=tileManager.tiles[this.target].tilePosition.x
                    combatantManager.combatants[this.user].tilePosition.y=tileManager.tiles[this.target].tilePosition.y
                    this.remove=true
                }
            break
        }
    }
}