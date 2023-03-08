class tileManager{
    constructor(layer,size){
        this.layer=layer
        this.size=size
        this.tiles=[]
        this.generateTiles(this.size)
    }
    generateTiles(level){
        for(let a=0,la=level.map.length;a<la;a++){
            for(let b=0,lb=level.map[a].length;b<lb;b++){
                if(level.map[a][b].type>=0){
                    this.tiles.push(new tile(this.layer,this.layer.width/2-(lb-1)*60+(la-1)*30+b*120-a*60,this.layer.height/2-(la-1)*25+a*50,this.layer.width/2-(lb-1)*30+b*120-a*60,this.layer.height/2-(la-1)*30*sqrt(3)+a*60*sqrt(3),b,a))
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
    display(){
        for(let a=0,la=this.tiles.length;a<la;a++){
            this.tiles[a].display()
        }
    }
}