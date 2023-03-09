class tileManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.width=0
        this.height=0
        this.tiles=[]
    }
    generateTiles(level){
        this.tiles=[]
        this.width=level.map[0].length
        this.height=level.map.length
        for(let a=0,la=level.map.length;a<la;a++){
            for(let b=0,lb=level.map[a].length;b<lb;b++){
                if(level.map[a][b].type>=0){
                    this.tiles.push(new tile(this.layer,this.layer.width/2-(lb-1)*50+(la-1)*25+b*100-a*50,this.layer.height/2-50-(la-1)*20+a*40,this.layer.width/2-(lb-1)*25+b*100-a*50,this.layer.height/2-50-(la-1)*25*sqrt(3)+a*50*sqrt(3),b,a))
                }
            }
        }
    }
    getTilePosition(tileX,tileY){
        for(let a=0,la=this.tiles.length;a<la;a++){
            if(this.tiles[a].tilePosition.x==tileX&&this.tiles[a].tilePosition.y==tileY){
                return this.tiles[a].position
            }
        }
    }
    getTileDirection(tile1X,tile1Y,tile2X,tile2Y){
        return vectorAtan(this.getTilePosition(tile1X,tile1Y),this.getTilePosition(tile2X,tile2Y))
    }
    getTileRelativePosition(tileX,tileY){
        for(let a=0,la=this.tiles.length;a<la;a++){
            if(this.tiles[a].tilePosition.x==tileX&&this.tiles[a].tilePosition.y==tileY){
                return this.tiles[a].relativePosition
            }
        }
    }
    getTileRelativeDirection(tile1X,tile1Y,tile2X,tile2Y){
        return vectorAtan(this.getTileRelativePosition(tile1X,tile1Y),this.getTileRelativePosition(tile2X,tile2Y))
    }
    display(scene){
        switch(scene){
            case 'battle':
                for(let a=0,la=this.tiles.length;a<la;a++){
                    this.tiles[a].display()
                }
                for(let a=0,la=this.tiles.length;a<la;a++){
                    if((this.battle.attackManager.targetInfo[0]==1&&!this.tiles[a].occupied&&legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],this.tiles[a],this.battle.attackManager,this.tiles))&&this.tiles[a].anim.target[0]<1){
                        this.tiles[a].anim.target[0]=round(this.tiles[a].anim.target[0]*5+1)/5
                    }else if(!(this.battle.attackManager.targetInfo[0]==1&&!this.tiles[a].occupied&&legalTargetCombatant(0,this.battle.attackManager.targetInfo[1],this.tiles[a],this.battle.attackManager,this.tiles))&&this.tiles[a].anim.target[0]>0){
                        this.tiles[a].anim.target[0]=round(this.tiles[a].anim.target[0]*5-1)/5
                    }
                }
            break
        }
    }
    update(scene){
        switch(scene){
            case 'battle':
                for(let a=0,la=this.tiles.length;a<la;a++){
                    this.tiles[a].occupied=false
                }
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.battle.combatantManager.combatants[a].life>0){
                        for(let b=0,lb=this.tiles.length;b<lb;b++){
                            if(this.tiles[b].tilePosition.x==this.battle.combatantManager.combatants[a].tilePosition.x&&this.tiles[b].tilePosition.y==this.battle.combatantManager.combatants[a].tilePosition.y){
                                this.tiles[b].occupied=true
                            }
                        }
                    }
                }
            break
        }
    }
}