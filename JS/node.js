class node{
    constructor(layer,battle,x,y,tileX,tileY,type){
        this.layer=layer
        this.battle=battle
        this.position={x:x,y:y}
        this.tilePosition={x:tileX,y:tileY}
        this.type=type

        this.connections=[]

        this.fade=1
        this.scroll=0
        this.complete=false

        this.anim={complete:0}
    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        switch(this.type){
            case 0:
                this.layer.stroke(mergeColor([190,195,200],[50,255,50],this.anim.complete),this.fade)
                this.layer.strokeWeight(3)
                this.layer.noFill()
                this.layer.ellipse(0,0,30,30)
                this.layer.strokeWeight(6)
                this.layer.point(-6,0)
                this.layer.point(6,0)
            break
            case 1:
                this.layer.stroke(mergeColor([190,195,200],[50,255,50],this.anim.complete),this.fade)
                this.layer.strokeWeight(3)
                this.layer.noFill()
                this.layer.ellipse(0,0,30,30)
                this.layer.strokeWeight(6)
                this.layer.point(-6,0)
                this.layer.point(6,0)
                this.layer.strokeWeight(2)
                this.layer.line(-3,-3,-8,-5)
                this.layer.line(3,-3,8,-5)
            break
        }
        this.layer.pop()
    }
    displayConnections(){
        this.layer.stroke(225,this.fade*0.1)
        this.layer.strokeWeight(3)
        for(let a=0,la=this.connections.length;a<la;a++){
            for(let b=0;b<10;b++){
                this.layer.line(
                    this.position.x*(0.7-b*0.01)+this.battle.nodeManager.nodes[this.connections[a]].position.x*(0.3+b*0.01),this.position.y*(0.7-b*0.01)+this.battle.nodeManager.nodes[this.connections[a]].position.y*(0.3+b*0.01),
                    this.position.x*(0.3+b*0.01)+this.battle.nodeManager.nodes[this.connections[a]].position.x*(0.7-b*0.01),this.position.y*(0.3+b*0.01)+this.battle.nodeManager.nodes[this.connections[a]].position.y*(0.7-b*0.01))
                }
        }
    }
    update(){
        this.anim.complete=smoothAnim(this.anim.complete,this.complete,0,1,5)
        if(this.scroll>0){
            this.scroll-=5
            this.position.y-=5
        }
    }
}