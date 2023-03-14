class card{
    constructor(layer,battle,x,y,type,level,color,id){
        this.layer=layer
        this.battle=battle
        this.position={x:x,y:y}
        this.type=type
        this.level=level
        this.color=color
        this.id=id
        this.width=90
        this.height=120
        this.size=0
        this.fade=1
        this.deSize=false
        this.deFade=false
        this.downSize=false
        this.upSize=false
        this.usable=true
        this.exhaust=false
        this.select=false
        this.afford=false

        this.anim={select:0,afford:0}

        this.colorDetail=types.color.card[this.color]

        this.name=types.card[this.type].name
        this.effect=types.card[this.type].levels[this.level].effect
        this.attack=types.card[this.type].levels[this.level].attack
        this.cost=types.card[this.type].levels[this.level].cost
        this.target=types.card[this.type].levels[this.level].target
        this.spec=types.card[this.type].levels[this.level].spec
        this.class=types.card[this.type].levels[this.level].class
        this.levels=types.card[this.type].levels.length
    }
    calculateEffect(effect,type){
        switch(type){
            case 0:
                let damage=effect
                let user=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex()]
                if(user.status.main[0]>0){
                    damage*=2
                }
                if(damage==effect){
                    return effect
                }else{
                    return effect+' ('+damage+')'
                }
        }
    }
    description(){
        let string=''
        if(this.spec.includes(3)){
            string+='Innate\n'
        }
        switch(this.attack){
            case 1: string+='Deal '+this.calculateEffect(this.effect[0],0)+' Damage'; break
            case 2: string+='Add '+this.effect[0]+ ' Block'; break
            case 3: string+='Move '+this.effect[0]+' Tiles'; break
            case 4: string+='Deal '+this.calculateEffect(this.effect[0],0)+' Damage\n2 Times'; break
            case 5: if(this.effect[0]>0){string+='Deal '+this.effect[0]+' Damage\n'} string+='Push 1 Tile'; break
            case 6: string+='Next '; if(this.effect[0]!=1){string+=this.effect[0]+' '} string+='Hit'; if(this.effect[0]!=1){string+='s'} string+='\nDeal'; if(this.effect[0]==1){string+='s'} string+=' Double\nDamage'; break
            case 7: string+='Deal '+this.calculateEffect(this.effect[0],0)+' Damage\nIf Fatal, Gain\n'+this.effect[1]+' Energy'; break
            case 8: string+='Draw '+this.effect[0]+' Cards'; break
            case 9: string+='Swap With an\nAdjacent Enemy\nTarget Will Face User\nor\nMove '+this.effect[0]+' Tiles'; break
            case 10: string+='Heal '+this.effect+' Health'; break
            case 11: if(this.effect[0]>0){string+='Deal '+this.effect[0]+' Damage\n'} string+='Pull 1 Tile\nTarget Will Face User'; break
        }
        if(string[string.length-1]=='\n'){
            string=string.substring(0,string.length-1)
        }
        if(this.target[0]==2){
            string+='\nRange '+this.target[1]+'-'+this.target[2]
        }
        if(this.spec.includes(0)){
            string+='\nFatigue'
        }
        if(this.spec.includes(2)){
            string+='\nRetain'
        }
        if(this.spec.includes(1)){
            string+='\nExhaust'
        }
        if(this.spec.includes(4)){
            string+='\nEthereal'
        }
        if(string[0]=='\n'){
            string=string.substring(1,string.length)
        }
        return string
    }
    display(){
        if(this.size>0&&this.fade>0){
            this.layer.push()
            this.layer.translate(this.position.x,this.position.y)
            this.layer.scale(this.size)
            this.layer.fill(255,this.fade*this.anim.select)
            this.layer.noStroke()
            this.layer.rect(0,0,this.width+15,this.height+15,10)
            this.layer.fill(this.colorDetail.fill,this.fade)
            this.layer.stroke(this.colorDetail.stroke,this.fade)
            this.layer.strokeWeight(5)
            this.layer.rect(0,0,this.width,this.height,5)
            this.layer.fill(225,255,255,this.fade)
            this.layer.stroke(200,255,255,this.fade)
            this.layer.strokeWeight(2)
            this.layer.quad(-this.width/2+2,-this.height/2+12,-this.width/2+10,-this.height/2+2,-this.width/2+18,-this.height/2+12,-this.width/2+10,-this.height/2+22)
            this.layer.noStroke()
            this.layer.fill(mergeColor([255,0,0],[0,0,0],this.anim.afford),this.level/2,this.fade)
            this.layer.textSize(14)
            this.layer.text(this.cost,-this.width/2+10,-this.height/2+13)
            this.layer.fill(mergeColor([0,0,0],this.colorDetail.text,this.level/max(1,this.levels-1)),this.level/2,this.fade)
            this.layer.textSize(10)
            this.layer.text(this.name+multiplyString('+',this.level),0,-this.height/2+15)
            this.layer.fill(0,this.fade)
            this.layer.textSize(8)
            this.layer.text(this.description(),0,5)
            this.layer.textSize(6)
            switch(this.class){
                case 1:
                    this.layer.text('Attack',0,this.height/2-6)
                break
                case 2:
                    this.layer.text('Defense',0,this.height/2-6)
                break
                case 3:
                    this.layer.text('Movement',0,this.height/2-6)
                break
                case 4:
                    this.layer.text('Power',0,this.height/2-6)
                break
                case 5:
                    this.layer.text('Status',0,this.height/2-6)
                break
            }
            this.layer.pop()
        }
    }
    update(){
        if(this.select){
            this.upSize=true
        }
        if(this.battle.energy.main>=this.cost){
            this.afford=true
        }else{
            this.afford=false
        }
        if(this.deSize&&this.size>0||this.downSize&&this.size>0.6||!this.upSize&&this.size>1){
            this.size=round(this.size*5-1)/5
        }else if(!this.deSize&&(!this.downSize&&this.size<1||this.size<0.6||this.upSize&&this.size<1.5)){
            this.size=min(round(this.size*5+1)/5,1.5)
        }
        this.fade=smoothAnim(this.fade,!this.deFade,0,1,5)
        this.anim.select=smoothAnim(this.anim.select,this.select,0,1,5)
        this.anim.afford=smoothAnim(this.anim.afford,this.afford,0,1,5)
    }
}