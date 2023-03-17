class node{
    constructor(layer,battle,x,y,tileX,tileY,type){
        this.layer=layer
        this.battle=battle
        this.position={x:x,y:y}
        this.tilePosition={x:tileX,y:tileY}
        this.type=type

        this.connections=[]

        this.size=1
        this.fade=1
        this.scroll=0
        this.complete=false

        this.anim={complete:0,description:0}
    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        this.layer.scale(this.size)
        switch(this.type){
            case 0:
                this.layer.stroke(mergeColor([110,115,120],[50,255,50],this.anim.complete)[0],mergeColor([110,115,120],[50,255,50],this.anim.complete)[1],mergeColor([110,115,120],[50,255,50],this.anim.complete)[2],this.fade)
                this.layer.strokeWeight(3)
                this.layer.noFill()
                this.layer.ellipse(0,0,30,30)
                this.layer.strokeWeight(6)
                this.layer.point(-6,0)
                this.layer.point(6,0)
                this.layer.noStroke()
                this.layer.fill(50,55,60,this.fade*max(this.anim.complete,this.anim.description))
                this.layer.rect(0,24,42,14,3)
                this.layer.fill(mergeColor([110,115,120],[50,255,50],this.anim.complete)[0],mergeColor([110,115,120],[50,255,50],this.anim.complete)[1],mergeColor([110,115,120],[50,255,50],this.anim.complete)[2],this.fade*max(this.anim.complete,this.anim.description))
                this.layer.textSize(12)
                this.layer.text('Battle',0,25)
            break
            case 1:
                this.layer.stroke(mergeColor([110,115,120],[50,255,50],this.anim.complete)[0],mergeColor([110,115,120],[50,255,50],this.anim.complete)[1],mergeColor([110,115,120],[50,255,50],this.anim.complete)[2],this.fade)
                this.layer.strokeWeight(3)
                this.layer.noFill()
                this.layer.ellipse(0,0,30,30)
                this.layer.strokeWeight(6)
                this.layer.point(-6,0)
                this.layer.point(6,0)
                this.layer.strokeWeight(2)
                this.layer.line(-3,-3,-8,-5)
                this.layer.line(3,-3,8,-5)
                this.layer.noStroke()
                this.layer.fill(50,55,60,this.fade*max(this.anim.complete,this.anim.description))
                this.layer.rect(0,24,35,14,3)
                this.layer.fill(mergeColor([110,115,120],[50,255,50],this.anim.complete)[0],mergeColor([110,115,120],[50,255,50],this.anim.complete)[1],mergeColor([110,115,120],[50,255,50],this.anim.complete)[2],this.fade*max(this.anim.complete,this.anim.description))
                this.layer.textSize(12)
                this.layer.text('Elite',0,25)
            break
            case 2:
                this.layer.noStroke()
                this.layer.fill(50,55,60,this.fade)
                this.layer.ellipse(0,0,90,90)
                this.layer.stroke(mergeColor([110,115,120],[50,255,50],this.anim.complete)[0],mergeColor([110,115,120],[50,255,50],this.anim.complete)[1],mergeColor([110,115,120],[50,255,50],this.anim.complete)[2],this.fade)
                this.layer.strokeWeight(3)
                this.layer.noFill()
                this.layer.ellipse(0,0,70,70)
                this.layer.ellipse(0,0,50,50)
                for(let a=0,la=12;a<la;a++){
                    this.layer.line(sin(360*a/la)*25,cos(360*a/la)*25,sin(360*(a-0.5)/la)*35,cos(360*(a-0.5)/la)*35)
                    this.layer.line(sin(360*a/la)*25,cos(360*a/la)*25,sin(360*(a+0.5)/la)*35,cos(360*(a+0.5)/la)*35)
                    this.layer.line(sin(360*(a-0.5)/la)*35,cos(360*(a-0.5)/la)*35,sin(360*(a-0.5)/la)*40,cos(360*(a-0.5)/la)*40)
                }
                this.layer.ellipse(0,0,30,30)
                this.layer.strokeWeight(6)
                this.layer.point(-6,0)
                this.layer.point(6,0)
                this.layer.strokeWeight(2)
                this.layer.line(-3,-3,-8,-5)
                this.layer.line(3,-3,8,-5)
                this.layer.noStroke()
                this.layer.fill(50,55,60,this.fade*max(this.anim.complete,this.anim.description))
                this.layer.rect(0,49,36,16,3)
                this.layer.fill(mergeColor([110,115,120],[50,255,50],this.anim.complete)[0],mergeColor([110,115,120],[50,255,50],this.anim.complete)[1],mergeColor([110,115,120],[50,255,50],this.anim.complete)[2],this.fade*max(this.anim.complete,this.anim.description))
                this.layer.textSize(15)
                this.layer.text('Boss',0,50)
            break
        }
        this.layer.pop()
    }
    displayConnections(){
        this.layer.stroke(255,this.fade*0.1)
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
        this.size=smoothAnim(this.size,dist(inputs.rel.x,inputs.rel.y,this.position.x,this.position.y)<25,1,1.5,5)
        this.anim.description=smoothAnim(this.anim.description,dist(inputs.rel.x,inputs.rel.y,this.position.x,this.position.y)<25,0,1,5)
        this.anim.complete=smoothAnim(this.anim.complete,this.complete,0,1,5)
        if(this.scroll>0){
            this.scroll-=5
            this.position.y-=5
        }
    }
}