class tileManager{
    constructor(layer,size){
        this.layer=layer
        this.size=size
        this.tiles=[]
        this.generateTiles(this.size)
    }
    generateTiles(size){
        for(let a=0;a<size;a++){
            for(let b=0;b<size;b++){
                if(abs(size-1-a)+abs(b)>size/2-1&&abs(a)+abs(size-1-b)>size/2-1){
                    this.tiles.push(new tile(this.layer,this.layer.width/2-(size-1)*30+a*120-b*60,this.layer.height/2-(size-1)*25+b*50,a,b))
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
    display(){
        for(let a=0,la=this.tiles.length;a<la;a++){
            this.tiles[a].display()
        }
    }
}