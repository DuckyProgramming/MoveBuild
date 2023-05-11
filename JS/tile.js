class tile{
    constructor(layer,battle,x,y,relativeX,relativeY,tileX,tileY,type){
        this.layer=layer
        this.battle=battle
        this.position={x:x,y:y}
        this.relativePosition={x:relativeX,y:relativeY}
        this.tilePosition={x:tileX,y:tileY}
        this.type=copyArray(type)

        this.fade=1
        this.occupied=0
        this.targetted=[false,false,false]
        this.reinforce=false
        this.target=0

        this.anim={target:[0,0,0,0,0],reinforce:0,part:[],upPart:[]}
        for(let a=0,la=this.type.length;a<la;a++){
            this.anim.part.push(0)
            this.anim.upPart.push(true)
        }
    }
    activate(type,id){
        for(let a=0,la=this.type.length;a<la;a++){
            switch(this.type[a]){
                case 1:
                    this.target=this.battle.combatantManager.getCombatantIndex(this.tilePosition.x,this.tilePosition.y)
                    if(this.target>=0&&(this.battle.combatantManager.combatants[this.target].team==0&&type==0||this.battle.combatantManager.combatants[this.target].id==id&&type==1)){
                        this.battle.combatantManager.combatants[this.target].takeDamage(5,-1,0)
                    }
                break
                case 2:
                    this.target=this.battle.combatantManager.getCombatantIndex(this.tilePosition.x,this.tilePosition.y)
                    if(this.target>=0&&(this.battle.combatantManager.combatants[this.target].team==0&&type==0||this.battle.combatantManager.combatants[this.target].id==id&&type==1)){
                        this.battle.combatantManager.combatants[this.target].takeDamage(20,-1,0)
                        this.battle.combatantManager.damageArea(20,-1,this.tilePosition)
                        this.battle.particleManager.particles.push(new particle(this.layer,this.position.x,this.position.y,2,[20]))
                        this.anim.upPart[a]=false
                    }
                break
                case 3:
                    this.target=this.battle.combatantManager.getCombatantIndex(this.tilePosition.x,this.tilePosition.y)
                    if(this.target>=0&&!this.battle.combatantManager.combatants[this.target].armed){
                        this.battle.combatantManager.combatants[this.target].armed=true
                        this.removeType(a)
                    }
                break
            }
        }
    }
    unTarget(){
        for(let a=0,la=this.anim.target.length;a<la;a++){
            this.targetted[a]=false
        }
    }
    removeType(index){
        this.type.splice(index,1)
        this.anim.part.splice(index,1)
        this.anim.upPart.splice(index,1)
    }
    addType(type){
        this.type.push(type)
        this.anim.part.push(0)
        this.anim.upPart.push(true)
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
        for(let a=0,la=this.type.length;a<la;a++){
            switch(this.type[a]){
                case 1:
                    this.layer.fill(190,195,200,this.fade*this.anim.part[a])
                    for(let a=0,la=9;a<la;a++){
                        for(let b=0,lb=9-a%2-max(3,abs(a-4))*2;b<lb;b++){
                            this.layer.triangle(-2+10-lb*10+b*20,2+3/2-la*3/2+a*3,2+10-lb*10+b*20,2+3/2-la*3/2+a*3,10-lb*10+b*20,-3+3/2-la*3/2+a*3)
                        }
                    }
                break
                case 2:
                    this.layer.fill(60,this.fade*this.anim.part[a])
                    this.layer.rect(0,-2,24,4)
                    this.layer.ellipse(0,-4,24,8)
                    this.layer.ellipse(0,0,24,8)
                    this.layer.fill(150,50,50,this.fade*this.anim.part[a])
                    this.layer.rect(0,-5,12,2)
                    this.layer.ellipse(0,-6,12,4)
                    this.layer.ellipse(0,-4,12,4)
                break
                case 3:
                    this.layer.rotate(90)
                    if(this.anim.part[a]>0){
                        this.layer.image(graphics.minor[17],5-20*this.fade*this.anim.part[a],-25*this.fade*this.anim.part[a],40*this.fade*this.anim.part[a],50*this.fade*this.anim.part[a])
                    }
                break
            }
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
            stack++
        }
        if(this.anim.target[3]>0){
            this.layer.noFill()
            this.layer.stroke(255,200,50,this.fade*this.anim.target[3])
            this.layer.strokeWeight(2)
            this.layer.ellipse(0,0,game.targetRadius*2-stack*4)
            stack++
        }
        if(this.anim.target[4]>0){
            this.layer.noFill()
            this.layer.stroke(200,150,0,this.fade*this.anim.target[4])
            this.layer.strokeWeight(2)
            this.layer.ellipse(0,0,game.targetRadius*2-stack*4)
            stack++
        }
        this.layer.pop()
    }
    update(){
        this.tilePosition.x=round(this.tilePosition.x)
        this.tilePosition.y=round(this.tilePosition.y)
        for(let a=0,la=this.anim.target.length;a<la;a++){
            this.anim.target[a]=smoothAnim(this.anim.target[a],this.targetted[a],0,1,5)
        }
        this.anim.reinforce=smoothAnim(this.anim.reinforce,this.reinforce,0,1,5)
        for(let a=0,la=this.anim.part.length;a<la;a++){
            this.anim.part[a]=smoothAnim(this.anim.part[a],this.anim.upPart[a],0,1,5)
        }
        if(this.anim.part<=0&&!this.anim.upPart){
            this.type=0
        }
    }
    displayCoordinate(coordinateAnim){
        this.layer.fill(0,this.fade*coordinateAnim)
        this.layer.noStroke()
        this.layer.textSize(12)
        this.layer.text((this.tilePosition.x+1)+','+(this.tilePosition.y+1),this.position.x,this.position.y)
    }
}