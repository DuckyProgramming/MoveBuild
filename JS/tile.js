class tile{
    constructor(layer,battle,x,y,relativeX,relativeY,tileX,tileY,type){
        this.layer=layer
        this.battle=battle
        this.position={x:x,y:y}
        this.relativePosition={x:relativeX,y:relativeY}
        this.tilePosition={x:tileX,y:tileY}
        this.type=type

        this.fade=1
        this.occupied=false
        this.targetted=[false,false,false]
        this.reinforce=false

        this.anim={target:[0,0,0],reinforce:0}
    }
    activate(type,id){
        switch(this.type){
            case 1:
                let target=this.battle.combatantManager.getCombatantIndex(this.tilePosition.x,this.tilePosition.y)
                if(target>=0&&(this.battle.combatantManager.combatants[target].team==0&&type==0||this.battle.combatantManager.combatants[target].id==id&&type==1)){
                    this.battle.combatantManager.combatants[target].takeDamage(5,-1,0)
                }
            break
        }
    }
    display(){
        this.layer.push()
        this.layer.translate(this.position.x,this.position.y)
        if(this.occupied){
            this.layer.fill(70,75,80,this.fade)
        }else{
            this.layer.fill(90,95,100,this.fade)
        }
        this.layer.noStroke()
        regPoly(this.layer,0,0,6,40,18,0)
        switch(this.type){
            case 1:
                this.layer.fill(190,195,200,this.fade)
                for(let a=0,la=9;a<la;a++){
                    for(let b=0,lb=9-a%2-max(3,abs(a-4))*2;b<lb;b++){
                        this.layer.triangle(-2+10-lb*10+b*20,2+3/2-la*3/2+a*3,2+10-lb*10+b*20,2+3/2-la*3/2+a*3,10-lb*10+b*20,-3+3/2-la*3/2+a*3)
                    }
                }
            break
        }
        let stack=0
        if(this.anim.reinforce>0){
            this.layer.stroke(255,50,50,this.fade*this.anim.reinforce)
            this.layer.strokeWeight(2)
            this.layer.line(-game.targetRadius/4,-game.targetRadius/4,game.targetRadius/4,game.targetRadius/4)
            this.layer.line(-game.targetRadius/4,game.targetRadius/4,game.targetRadius/4,-game.targetRadius/4)
        }
        if(this.anim.target[0]>0){
            this.layer.noFill()
            this.layer.stroke(200,this.fade*this.anim.target[0])
            this.layer.strokeWeight(2)
            this.layer.ellipse(0,0,game.targetRadius*2)
            stack++
        }
        if(this.anim.target[1]>0){
            this.layer.noFill()
            this.layer.stroke(255,50,50,this.fade*this.anim.target[1])
            this.layer.strokeWeight(2)
            this.layer.ellipse(0,0,game.targetRadius*2-stack*4)
            stack++
        }
        if(this.anim.target[2]>0){
            this.layer.noFill()
            this.layer.stroke(200,0,0,this.fade*this.anim.target[2])
            this.layer.strokeWeight(2)
            this.layer.ellipse(0,0,game.targetRadius*2-stack*4)
        }
        this.layer.pop()
    }
    update(){
        for(let g=0,lg=this.anim.target.length;g<lg;g++){
            this.anim.target[g]=smoothAnim(this.anim.target[g],this.targetted[g],0,1,5)
            this.targetted[g]=false
        }
        this.anim.reinforce=smoothAnim(this.anim.reinforce,this.reinforce,0,1,5)
    }
    displayCoordinate(coordinateAnim){
        this.layer.fill(0,this.fade*coordinateAnim)
        this.layer.noStroke()
        this.layer.textSize(12)
        this.layer.text((this.tilePosition.x+1)+','+(this.tilePosition.y+1),this.position.x,this.position.y)
    }
}