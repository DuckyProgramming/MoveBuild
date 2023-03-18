class option{
    constructor(layer,x,y,type){
        this.layer=layer
        this.position={x:x,y:y}
        this.type=type

        this.connections=[]

        this.size=1
        this.fade=1
        this.complete=false

        this.anim={complete:0,description:0}
    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        this.layer.scale(this.size)
        switch(this.type){
            case 0:
                this.layer.stroke(mergeColor([255,125,0],[50,255,50],this.anim.complete)[0],mergeColor([255,125,0],[50,255,50],this.anim.complete)[1],mergeColor([255,125,0],[50,255,50],this.anim.complete)[2],this.fade)
                this.layer.strokeWeight(3)
                this.layer.noFill()
                this.layer.line(10,-30,50,0)
                this.layer.line(10,-10,10,-30)
                this.layer.line(10,-10,-40,-10)
                this.layer.line(-40,-10,-40,10)
                this.layer.line(10,10,-40,10)
                this.layer.line(10,10,10,30)
                this.layer.line(10,30,50,0)
                this.layer.noStroke()
                this.layer.fill(mergeColor([255,125,0],[50,255,50],this.anim.complete)[0],mergeColor([255,125,0],[50,255,50],this.anim.complete)[1],mergeColor([255,125,0],[50,255,50],this.anim.complete)[2],this.fade*max(this.anim.complete,this.anim.description))
                this.layer.textSize(24)
                this.layer.text('Skip',0,60)
            break
            case 1:
                this.layer.stroke(mergeColor([255,125,0],[50,255,50],this.anim.complete)[0],mergeColor([255,125,0],[50,255,50],this.anim.complete)[1],mergeColor([255,125,0],[50,255,50],this.anim.complete)[2],this.fade)
                this.layer.strokeWeight(3)
                this.layer.noFill()
                this.layer.line(-10,-40,10,-40)
                this.layer.line(-10,-40,-10,-10)
                this.layer.line(10,-40,10,-10)
                this.layer.line(-10,40,10,40)
                this.layer.line(-10,40,-10,10)
                this.layer.line(10,40,10,10)
                this.layer.line(-40,-10,-40,10)
                this.layer.line(-40,-10,-10,-10)
                this.layer.line(-40,10,-10,10)
                this.layer.line(40,-10,40,10)
                this.layer.line(40,-10,10,-10)
                this.layer.line(40,10,10,10)
                this.layer.noStroke()
                this.layer.fill(mergeColor([255,125,0],[50,255,50],this.anim.complete)[0],mergeColor([255,125,0],[50,255,50],this.anim.complete)[1],mergeColor([255,125,0],[50,255,50],this.anim.complete)[2],this.fade*max(this.anim.complete,this.anim.description))
                this.layer.textSize(24)
                this.layer.text('Heal',0,60)
            break
            case 2:
                this.layer.stroke(mergeColor([255,125,0],[50,255,50],this.anim.complete)[0],mergeColor([255,125,0],[50,255,50],this.anim.complete)[1],mergeColor([255,125,0],[50,255,50],this.anim.complete)[2],this.fade)
                this.layer.strokeWeight(3)
                this.layer.noFill()
                this.layer.rect(0,0,60,80,5)
                this.layer.rect(0,-17.5,30,15)
                this.layer.rect(0,7.5,10,35)
                this.layer.noStroke()
                this.layer.fill(mergeColor([255,125,0],[50,255,50],this.anim.complete)[0],mergeColor([255,125,0],[50,255,50],this.anim.complete)[1],mergeColor([255,125,0],[50,255,50],this.anim.complete)[2],this.fade*max(this.anim.complete,this.anim.description))
                this.layer.textSize(24)
                this.layer.text('Upgrade',0,60)
            break
        }
        this.layer.pop()
    }
    update(){
        this.size=smoothAnim(this.size,dist(inputs.rel.x,inputs.rel.y,this.position.x,this.position.y)<50,1,1.5,5)
        this.anim.description=smoothAnim(this.anim.description,dist(inputs.rel.x,inputs.rel.y,this.position.x,this.position.y)<50,0,1,5)
        this.anim.complete=smoothAnim(this.anim.complete,this.complete,0,1,5)
    }
}