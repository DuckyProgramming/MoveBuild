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
        this.combatantted=[
            [false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false],
            [false,false,false,false,false,false,false],
        ]
        this.reinforce=false
        this.fire=[0,0]
        this.combatant=0

        this.anim={target:[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]],reinforce:0,fire:[0,0],part:[],upPart:[]}
        for(let a=0,la=this.type.length;a<la;a++){
            this.anim.part.push(0)
            this.anim.upPart.push(true)
        }
    }
    activate(type,id){
        for(let a=0,la=this.type.length;a<la;a++){
            switch(this.type[a]){
                case 1:
                    this.combatant=this.battle.combatantManager.getCombatantIndex(this.tilePosition.x,this.tilePosition.y)
                    if(this.combatant>=0&&(this.battle.combatantManager.combatants[this.combatant].team==0&&type==0||this.battle.combatantManager.combatants[this.combatant].id==id&&type==1)&&!this.battle.combatantManager.combatants[this.combatant].spec.includes(3)){
                        this.battle.combatantManager.combatants[this.combatant].takeDamage(5,-1,0)
                    }
                break
                case 2:
                    this.combatant=this.battle.combatantManager.getCombatantIndex(this.tilePosition.x,this.tilePosition.y)
                    if(this.combatant>=0&&(this.battle.combatantManager.combatants[this.combatant].team==0&&type==0||this.battle.combatantManager.combatants[this.combatant].id==id&&type==1)&&!this.battle.combatantManager.combatants[this.combatant].spec.includes(3)){
                        this.battle.combatantManager.combatants[this.combatant].takeDamage(10,-1,0)
                        this.battle.combatantManager.damageArea(10,-1,-1,this.tilePosition)
                        this.battle.particleManager.particles.push(new particle(this.layer,this.position.x,this.position.y,2,[20]))
                        this.anim.upPart[a]=false
                    }
                break
                case 3:
                    this.combatant=this.battle.combatantManager.getCombatantIndex(this.tilePosition.x,this.tilePosition.y)
                    if(this.combatant>=0&&!this.battle.combatantManager.combatants[this.combatant].armed){
                        this.battle.combatantManager.combatants[this.combatant].armed=true
                        this.anim.upPart[a]=false
                    }
                break
                case 4:
                    this.combatant=this.battle.combatantManager.getCombatantIndex(this.tilePosition.x,this.tilePosition.y)
                    if(this.combatant>=0&&this.battle.combatantManager.combatants[this.combatant].team==0&&(this.battle.combatantManager.combatants[this.combatant].team==0&&type==0||this.battle.combatantManager.combatants[this.combatant].id==id&&type==1)){
                        this.battle.combatantManager.combatants[this.combatant].addBlock(10)
                    }
                break
                case 5:
                    this.combatant=this.battle.combatantManager.getCombatantIndex(this.tilePosition.x,this.tilePosition.y)
                    if(this.combatant>=0&&(this.battle.combatantManager.combatants[this.combatant].team==0&&type==0||this.battle.combatantManager.combatants[this.combatant].id==id&&type==1)&&!this.battle.combatantManager.combatants[this.combatant].spec.includes(4)){
                        this.battle.combatantManager.combatants[this.combatant].takeDamage(15,-1,0)
                        this.anim.upPart[a]=false
                    }
                break
                case 6:
                    this.combatant=this.battle.combatantManager.getCombatantIndex(this.tilePosition.x,this.tilePosition.y)
                    if(this.combatant>=0&&this.battle.combatantManager.combatants[this.combatant].id==id&&type==1&&this.battle.combatantManager.combatants[this.combatant].team>0){
                        if(this.battle.cardManagers[this.battle.combatantManager.combatants[this.combatant].id].reserve.cards.length>0){
                            this.battle.cardManagers[this.battle.combatantManager.combatants[this.combatant].id].randomEffect(1,8,[])
                        }else{
                            this.battle.cardManagers[this.battle.combatantManager.combatants[this.combatant].id].randomEffect(3,8,[])
                        }
                    }
                break
                case 7:
                    this.combatant=this.battle.combatantManager.getCombatantIndex(this.tilePosition.x,this.tilePosition.y)
                    if(this.combatant>=0&&(this.battle.combatantManager.combatants[this.combatant].team==0&&type==0||this.battle.combatantManager.combatants[this.combatant].id==id&&type==1)&&!this.battle.combatantManager.combatants[this.combatant].spec.includes(3)){
                        if(this.battle.combatantManager.combatants[this.combatant].team>0){
                            this.battle.addCurrency(10,this.battle.combatantManager.combatants[this.combatant].id)
                            this.anim.upPart[a]=false
                        }else if(this.battle.combatantManager.combatants[this.combatant].name=='Capitalist'){
                            this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Bodyguard',types.combatant),this.battle.combatantManager.combatants[this.combatant].goal.anim.direction)
                            this.anim.upPart[a]=false
                        }
                    }
                break
                case 8:
                    this.combatant=this.battle.combatantManager.getCombatantIndex(this.tilePosition.x,this.tilePosition.y)
                    if(this.combatant>=0&&this.battle.combatantManager.combatants[this.combatant].id==id&&type==1&&this.battle.combatantManager.combatants[this.combatant].team>0){
                        this.battle.drop(this.battle.combatantManager.combatants[this.combatant].id,findName('Burn',types.card),0,game.playerNumber+1)
                    }
                break
                case 9:
                    this.combatant=this.battle.combatantManager.getCombatantIndex(this.tilePosition.x,this.tilePosition.y)
                    if(this.combatant>=0&&(this.battle.combatantManager.combatants[this.combatant].team==0&&type==0||this.battle.combatantManager.combatants[this.combatant].id==id&&type==1)){
                        this.battle.combatantManager.combatants[this.combatant].addBlock(5)
                        this.anim.upPart[a]=false
                    }
                break
            }
        }
    }
    fireAttack(){
        for(let a=0,la=2;a<la;a++){
            if(this.fire[a]>0){
                this.combatant=this.battle.combatantManager.getCombatantIndex(this.tilePosition.x,this.tilePosition.y)
                if(this.combatant>=0){
                    this.battle.combatantManager.combatants[this.combatant].takeDamage(this.fire[a],-1,0)
                }
                this.battle.particleManager.particles.push(new particle(this.layer,this.position.x,this.position.y,10+a*7,[10]))
                this.fire[a]=0
            }
        }
    }
    target(type,direction){
        this.combatantted[type][direction]=true
        this.combatantted[type][6]=true
    }
    unTarget(){
        for(let a=0,la=this.combatantted.length;a<la;a++){
            for(let b=0,lb=this.combatantted[a].length;b<lb;b++){
                this.combatantted[a][b]=false
            }
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
                    for(let b=0,lb=9;b<lb;b++){
                        for(let c=0,lc=9-b%2-max(3,abs(b-4))*2;c<lc;c++){
                            this.layer.triangle(-2+10-lc*10+c*20,2+3/2-lb*3/2+b*3,2+10-lc*10+c*20,2+3/2-lb*3/2+b*3,10-lc*10+c*20,-3+3/2-lb*3/2+b*3)
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
                    if(this.anim.part[a]>0){
                        this.layer.rotate(90+a*15)
                        this.layer.image(graphics.minor[17],5-20*this.fade*this.anim.part[a],-25*this.fade*this.anim.part[a],40*this.fade*this.anim.part[a],50*this.fade*this.anim.part[a])
                        this.layer.rotate(-90-a*15)
                    }
                break
                case 4:
                    this.layer.fill(40,this.fade*this.anim.part[a])
                    for(let b=0,lb=5;b<lb;b++){
                        this.layer.rect(-14+b*7,4,6,8,2)
                    }
                    for(let b=0,lb=4;b<lb;b++){
                        this.layer.rect(-10.5+b*7,-6,6,8,2)
                    }
                break
                case 5:
                    this.layer.fill(120,80,40,this.fade*this.anim.part[a])
                    this.layer.rect(0,0,36,12,4)
                    this.layer.fill(90,60,30,this.fade*this.anim.part[a])
                    this.layer.rect(-9,0,12,10,2)
                    this.layer.rect(9,0,12,10,2)
                    this.layer.fill(200,this.fade*this.anim.part[a])
                    this.layer.triangle(-14,-4.5,-10,-4.5,-12,-12)
                    this.layer.triangle(-14,4.5,-10,4.5,-12,-3)
                    this.layer.triangle(14,-4.5,10,-4.5,12,-12)
                    this.layer.triangle(14,4.5,10,4.5,12,-3)
                    this.layer.triangle(-8,-4.5,-4,-4.5,-6,-12)
                    this.layer.triangle(-8,4.5,-4,4.5,-6,-3)
                    this.layer.triangle(8,-4.5,4,-4.5,6,-12)
                    this.layer.triangle(8,4.5,4,4.5,6,-3)
                break
                case 6:
                    this.layer.fill(130,235,30,this.fade*this.anim.part[a])
                    this.layer.ellipse(0,0,48,24)
                break
                case 7:
                    this.layer.fill(240,240,220,this.fade*this.anim.part[a])
                    this.layer.ellipse(0,0,24,12)
                    this.layer.fill(220,220,200,this.fade*this.anim.part[a])
                    this.layer.ellipse(0,0,15,7.5)
                break
                case 8:
                    this.layer.fill(60,this.fade*this.anim.part[a])
                    this.layer.ellipse(0,0,48,24)
                    this.layer.fill(255,100,0,this.fade*this.anim.part[a])
                    let size=0.9+0.1*lsin(game.timer*10)
                    this.layer.ellipse(0,0,10*size,5*size)
                    this.layer.ellipse(0,-8,10*size,5*size)
                    this.layer.ellipse(0,8,10*size,5*size)
                    this.layer.ellipse(-12,-4,10*size,5*size)
                    this.layer.ellipse(-12,4,10*size,5*size)
                    this.layer.ellipse(12,-4,10*size,5*size)
                    this.layer.ellipse(12,4,10*size,5*size)
                break
                case 9:
                    this.layer.fill(180,20,120,this.fade*this.anim.part[a]*0.2)
					this.layer.stroke(180,20,120,this.fade*this.anim.part[a])
					this.layer.strokeWeight(3)
                    regPoly(this.layer,0,0,7,15,15,game.timer*2)
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
        if(this.anim.fire[0]>0){
            this.layer.stroke(255,50,50,this.fade*this.anim.fire[0])
            this.layer.strokeWeight(2)
            this.layer.line(-game.targetRadius/2,-game.targetRadius/4,0,game.targetRadius*3/8)
            this.layer.line(game.targetRadius/2,-game.targetRadius/4,0,game.targetRadius*3/8)
            this.layer.fill(255,50,50,this.fade*this.anim.fire[0])
            this.layer.noStroke()
            this.layer.textSize(12)
            this.layer.text(this.fire[0],0,-game.targetRadius/8)
        }
        if(this.anim.fire[1]>0){
            this.layer.stroke(255,50,50,this.fade*this.anim.fire[1])
            this.layer.strokeWeight(2)
            this.layer.ellipse(0,0,game.targetRadius*3/4,game.targetRadius*3/4)
            this.layer.line(0,-game.targetRadius/4,0,-game.targetRadius*3/8)
            this.layer.line(0,game.targetRadius/4,0,game.targetRadius*3/8)
            this.layer.line(-game.targetRadius/4,0,-game.targetRadius*3/8,0)
            this.layer.line(game.targetRadius/4,0,game.targetRadius*3/8,0)
            this.layer.fill(255,50,50,this.fade*this.anim.fire[1])
            this.layer.noStroke()
            this.layer.textSize(12)
            this.layer.text(this.fire[1],0,0)
        }
        if(this.anim.target[0][6]>0){
            this.layer.noFill()
            this.layer.stroke(200,this.fade*this.anim.target[0][6])
            this.layer.strokeWeight(2)
            this.layer.ellipse(0,0,game.targetRadius*2)
            for(let a=0,la=6;a<la;a++){
                if(this.anim.target[0][a]>0){
                    this.layer.stroke(200,this.fade*this.anim.target[0][a])
                    this.layer.line(cos(constants.cycle[a])*game.targetRadius,sin(constants.cycle[a])*game.targetRadius,cos(constants.cycle[a])*game.targetRadius*0.6,sin(constants.cycle[a])*game.targetRadius*0.6)
                }
            }
            stack++
        }
        if(this.anim.target[1][6]>0){
            this.layer.noFill()
            this.layer.stroke(255,50,50,this.fade*this.anim.target[1][6])
            this.layer.strokeWeight(2)
            this.layer.ellipse(0,0,game.targetRadius*2+stack*4)
            for(let a=0,la=6;a<la;a++){
                if(this.anim.target[1][a]>0){
                    this.layer.stroke(255,50,50,this.fade*this.anim.target[1][a])
                    this.layer.line(cos(constants.cycle[a])*(game.targetRadius+stack*2),sin(constants.cycle[a])*(game.targetRadius+stack*2),cos(constants.cycle[a])*(game.targetRadius*0.6+stack*2),sin(constants.cycle[a])*(game.targetRadius*0.6+stack*2))
                }
            }
            stack++
        }
        if(this.anim.target[2][6]>0){
            this.layer.noFill()
            this.layer.stroke(200,0,0,this.fade*this.anim.target[2][6])
            this.layer.strokeWeight(2)
            this.layer.ellipse(0,0,game.targetRadius*2+stack*4)
            for(let a=0,la=6;a<la;a++){
                if(this.anim.target[2][a]>0){
                    this.layer.stroke(200,0,0,this.fade*this.anim.target[2][a])
                    this.layer.line(cos(constants.cycle[a])*(game.targetRadius+stack*2),sin(constants.cycle[a])*(game.targetRadius+stack*2),cos(constants.cycle[a])*(game.targetRadius*0.6+stack*2),sin(constants.cycle[a])*(game.targetRadius*0.6+stack*2))
                }
            }
            stack++
        }
        if(this.anim.target[3][6]>0){
            this.layer.noFill()
            this.layer.stroke(255,200,50,this.fade*this.anim.target[3][6])
            this.layer.strokeWeight(2)
            this.layer.ellipse(0,0,game.targetRadius*2+stack*4)
            for(let a=0,la=6;a<la;a++){
                if(this.anim.target[3][a]>0){
                    this.layer.stroke(255,200,50,this.fade*this.anim.target[3][a])
                    this.layer.line(cos(constants.cycle[a])*(game.targetRadius+stack*2),sin(constants.cycle[a])*(game.targetRadius+stack*2),cos(constants.cycle[a])*(game.targetRadius*0.6+stack*2),sin(constants.cycle[a])*(game.targetRadius*0.6+stack*2))
                }
            }
            stack++
        }
        if(this.anim.target[4][6]>0){
            this.layer.noFill()
            this.layer.stroke(200,150,0,this.fade*this.anim.target[4][6])
            this.layer.strokeWeight(2)
            this.layer.ellipse(0,0,game.targetRadius*2+stack*4)
            for(let a=0,la=6;a<la;a++){
                if(this.anim.target[4][a]>0){
                    this.layer.stroke(200,150,0,this.fade*this.anim.target[4][a])
                    this.layer.line(cos(constants.cycle[a])*(game.targetRadius+stack*2),sin(constants.cycle[a])*(game.targetRadius+stack*2),cos(constants.cycle[a])*(game.targetRadius*0.6+stack*2),sin(constants.cycle[a])*(game.targetRadius*0.6+stack*2))
                }
            }
            stack++
        }
        this.layer.pop()
    }
    update(){
        this.tilePosition.x=round(this.tilePosition.x)
        this.tilePosition.y=round(this.tilePosition.y)
        for(let a=0,la=this.anim.target.length;a<la;a++){
            for(let b=0,lb=this.anim.target[a].length;b<lb;b++){
                this.anim.target[a][b]=smoothAnim(this.anim.target[a][b],this.combatantted[a][b],0,1,5)
            }
        }
        this.anim.reinforce=smoothAnim(this.anim.reinforce,this.reinforce,0,1,5)
        for(let a=0,la=this.anim.fire.length;a<la;a++){
            this.anim.fire[a]=smoothAnim(this.anim.fire[a],this.fire[a]>0,0,1,5)
        }
        for(let a=0,la=this.anim.part.length;a<la;a++){
            this.anim.part[a]=smoothAnim(this.anim.part[a],this.anim.upPart[a],0,1,5)
        }
        for(let a=0,la=this.anim.part.length;a<la;a++){
            if(this.anim.part[a]<=0&&!this.anim.upPart[a]){
                this.removeType(a)
                a--
                la--
            }
        }
    }
    displayCoordinate(coordinateAnim){
        this.layer.fill(0,this.fade*coordinateAnim)
        this.layer.noStroke()
        this.layer.textSize(12)
        this.layer.text((this.tilePosition.x+1)+','+(this.tilePosition.y+1),this.position.x,this.position.y)
    }
}