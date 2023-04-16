class card{
    constructor(layer,battle,player,x,y,type,level,color,id,cost=-1){
        this.layer=layer
        this.battle=battle
        this.player=player
        this.position={x:x,y:y}
        this.type=type
        this.level=level
        this.color=color
        this.id=id
        this.cost=cost

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
        this.discardEffect=[]

        this.anim={select:0,afford:0}
        this.colorDetail=types.color.card[this.color]

        this.name=types.card[this.type].name
        this.list=types.card[this.type].list
        this.effect=types.card[this.type].levels[this.level].effect
        this.attack=types.card[this.type].levels[this.level].attack
        this.target=types.card[this.type].levels[this.level].target
        this.spec=types.card[this.type].levels[this.level].spec
        this.class=types.card[this.type].levels[this.level].class
        this.levels=types.card[this.type].levels.length
        if(this.list==-1){
            this.list=this.color
        }

        this.base={cost:types.card[this.type].levels[this.level].cost}
        if(this.cost==-1){
            this.cost=this.base.cost
        }

        this.strike=this.name.includes('Strike')
    }
    calculateEffect(effect,type){
        if(stage.scene=='battle'){
            let user=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
            switch(type){
                case 0: case 2:
                    let damage=effect
                    if(user.status.main[6]>0){
                        damage+=user.status.main[6]
                    }
                    if(user.status.main[12]>0){
                        damage+=user.status.main[12]
                    }
                    if(user.status.main[17]>0){
                        damage+=user.status.main[17]
                    }
                    if(this.strike&&this.battle.relicManager.hasRelic(50,this.player)){
                        damage+=2
                    }
                    if(user.status.main[0]>0){
                        damage*=2
                    }
                    if(user.status.main[8]>0){
                        damage*=0.75
                    }
                    damage=floor(damage)
                    if(type==0){
                        return damage==effect?effect:effect+` (${damage})`
                    }else if(type==2){
                        return damage==effect?effect+'X':effect+`X (+${damage})`
                    }
                case 1: case 3:
                    let block=effect
                    if(user.status.main[7]>0){
                        block+=user.status.main[7]
                    }
                    if(user.status.main[18]>0){
                        block+=user.status.main[18]
                    }
                    if(user.status.main[9]>0){
                        block*=0.75
                    }
                    block=floor(block)
                    if(type==1){
                        return block==effect?effect:effect+` (${block})`
                    }else if(type==3){
                        return block==effect?effect+'X':effect+`X (+${block})`
                    }
                case 4:
                    let health=effect
                    if(this.battle.relicManager.hasRelic(53,this.player)){
                        health*=1.5
                    }
                    return health==effect?effect:effect+` (${health})`
            }
        }else{
            return effect
        }
    }
    description(){
        let string=''
        if(this.spec.includes(5)){
            string+='Unplayable\n'
        }
        if(this.spec.includes(3)){
            string+='Innate\n'
        }
        switch(this.attack){
            case -1: string+='Gain 1 Weak at\nthe End of Your Turn'; break
            case -2: string+='Gain 1 Vulnerable at\nthe End of Your Turn'; break
            case 1: case 25: case 32: case 36: case 57:
                string+='Deal '+this.calculateEffect(this.effect[0],0)+' Damage';
            break
            case 2: string+='Add '+this.calculateEffect(this.effect[0],1)+' Block'; break
            case 3: string+='Move '+this.effect[0]+' Tile'; if(this.effect[0]>1){string+='s'} break
            case 4: string+='Deal '+this.calculateEffect(this.effect[0],0)+' Damage\n2 Times'; break
            case 5: string+='Push 1 Tile'; break
            case 6: string+='Next '; if(this.effect[0]!=1){string+=this.effect[0]+' '} string+='Attack'; if(this.effect[0]!=1){string+='s'} string+='\nDeal'; if(this.effect[0]==1){string+='s'} string+=' Double\nDamage'; break
            case 7: string+='Deal '+this.calculateEffect(this.effect[0],0)+' Damage\nIf Fatal, Gain\n'+this.effect[1]+' Energy'; break
            case 8: string+='Draw '+this.effect[0]+' Card'; if(this.effect[0]>1){string+='s'} break
            case 9: string+='Swap With an\nAdjacent Enemy\nTarget Will Face User\nor\nMove '+this.effect[0]+' Tiles'; break
            case 10: string+='Heal '+this.calculateEffect(this.effect[0],4)+' Health'; break
            case 11: string+='Pull 1 Tile\nTarget Will Face User'; break
            case 12: string+='Deal '+this.calculateEffect(this.effect[0],2)+' Damage'; break
            case 13: string+='Add '+this.calculateEffect(this.effect[0],3)+' Block'; break
            case 14: string+='Pass Through an\nAdjacent Enemy\nor\nMove '+this.effect[0]+' Tile'; if(this.effect[0]>1){string+='s'} break
            case 15: string+='Deal '+this.calculateEffect(this.effect[0],0)+' Damage\nPush 1 Tile\nMove Forward 1 Tile'; break
            case 16: if(this.effect[0]>0){string+='Deal '+this.calculateEffect(this.effect[0],0)+' Damage\n'} string+='Push 1 Tile'; break
            case 17: string+='Deal '+this.calculateEffect(this.effect[0],0)+' Damage\nMove 1 Tile Away'; break
            case 18: string+='Deal '+this.calculateEffect(this.effect[0],0)+' Damage\nin All Directions'; break
            case 19: string+='Swap With an\nAdjacent Enemy\nDeal '+this.calculateEffect(this.effect[0],0)+' Damage\nPush 1 Tile'; break
            case 20: string+='Move '+this.effect[0]+' Tile'; if(this.effect[0]>1){string+='s'} string+='\nDiscard 1\nRandom Card'; break
            case 21: string+='Advance up to '+this.effect[0]+' Tile'; if(this.effect[0]>1){string+='s'} string+='\nToward an Enemy'; break
            case 22: string+='Gain '+this.effect[0]+' Energy\nTake '+this.effect[1]+' Damage'; break
            case 23: string+='Add '+this.calculateEffect(this.effect[0],1)+' Block\nCounter '+this.effect[1]; break
            case 24: string+='Make an Enemy Attack\nThey Will Not Attack\non Their Turn'; break
            case 26: string+='Add '+this.calculateEffect(this.effect[0],1)+' Block\nCannot be Pushed\nThis Turn'; break
            case 27: string+='Advance up to '+this.effect[1]+' Tile'; if(this.effect[0]>1){string+='s'} string+='\nToward an Enemy\nDeal '+this.calculateEffect(this.effect[0],0)+' Damage'; break
            case 28: string+='Put a Card in Discard\nPile in Your Hand'; break
            case 29: string+='Put a Card in Draw\nPile in Your Hand'; break
            case 30: string+='Add '+this.effect[0]+' Dodge'; break
            case 31: string+='Push 1 Tile\nin All Directions'; break
            case 33: string+='Deal '+this.calculateEffect(this.effect[0],0)+' Damage\nAdvance'; break
            case 34: string+='Deal '+this.calculateEffect(this.effect[0],0)+' Damage\nGain '+this.effect[1]+' Energy\nNext Turn'; break
            case 35: string+='Deal '+this.calculateEffect(this.effect[0],0)+' Damage\nIf Target is Undamaged,\nGain '+this.effect[1]+' Energy'; break
            case 37: string+='Deal '+this.calculateEffect(this.effect[0],0)+' Damage\nDisarm'; break
            case 38: string+='Deal '+this.calculateEffect(this.effect[0],0)+' Damage\nIf Target Will Attack,\nReduce Damage by '+this.effect[1]; break
            case 39: case 49: string+='Apply '+this.effect[0]+' Bleed'; break
            case 40: string+='Discard Your Hand\nDraw That Many Cards'; break
            case 41: string+='Gain '+this.effect[0]+' Energy'; break
            case 42: string+='Deal '+this.calculateEffect(this.effect[0],0)+' Damage\nDraw '+this.effect[1]+' Card'; if(this.effect[1]>1){string+='s'} break
            case 43: string+='Add '+this.calculateEffect(this.effect[0],1)+' Block\nDraw '+this.effect[1]+' Card'; if(this.effect[1]>1){string+='s'} break
            case 44: string+='Shuffle Discard Pile\nInto Draw Pile\nDraw '+this.effect[0]+' Card'; if(this.effect[0]>1){string+='s'} break
            case 45: string+='Upgrade All Cards\nTemporarily'; break
            case 46: string+='Deal '+this.calculateEffect(this.effect[0],0)+' Damage\nDeals Double Damage\nif Target Has Bleed'; break
            case 47: string+='Deal '+this.calculateEffect(this.effect[0],0)+' Damage\nApply '+this.effect[1]+' Bleed'; break
            case 48: if(this.effect[0]>0){string+='Deal '+this.calculateEffect(this.effect[0],0)+' Damage\n'} string+='Push 2 Tiles'; break
            case 50: string+='Add '+this.calculateEffect(+this.effect[0],1)+' Block\nRetain Block\nfor '+this.effect[1]+' Turn'; if(this.effect[1]>1){string+='s'} break
            case 51: string+='Move '+this.effect[0]+' Tile';if(this.effect[0]>1){string+='s'} string+='\nAdd '+this.effect[1]+' Dodge'; break
            case 52: string+='Move '+this.effect[0]+' Tile';if(this.effect[0]>1){string+='s'} string+='\nDiscard When a\nCard is Played'; break
            case 53: string+='Deal '+this.calculateEffect(this.effect[0],0)+' Damage\nAdd '+this.effect[1]+' Dodge'; break
            case 54: string+='Move to Any\nEmpty Tile'; break
            case 55: string+='Draw '+this.effect[0]+' Card'; if(this.effect[0]>1){string+='s'} string+='\nDiscard '+this.effect[1]+' Card'; if(this.effect[1]>1){string+='s'} break
            case 56: string+='Move '+this.effect[0]+' Tile'; if(this.effect[0]>1){string+='s'} string+='\nCosts 1 More When\na Card is Played'; break
            case 58: string+='Move '+this.effect[0]+' Tile'; if(this.effect[0]>1){string+='s'} string+='\nAdd a Stride\nto Your Hand'; break
            case 59: string+='Move '+this.effect[0]+' Tile'; if(this.effect[0]>1){string+='s'} string+='\nLose All Block'; break
            case 60: string+='Move '; if(this.effect[0]!=1){string+=this.effect[0]} string+='X'; if(this.effect[1]>0){string+='+1'} string+=' Tiles'; break
            case 61: string+='Deal '+this.calculateEffect(this.effect[0],0)+' Damage\nIf Fatal, Gain\n'+this.effect[1]+' Currency'; break
            case 62: string+='Reduce Cost of\nAll Cards in\nHand to '+this.effect[0]; if(this.effect[1]==0){string+='\nTemporarily'} break
            case 63: string+='Exhaust Any Number\nof Cards in Hand'; break
            case 64: string+='Gain '+this.effect[0]+' Control'; break
            case 65: string+='Add '+this.calculateEffect(this.effect[0],1)+' Block\nCannot Gain Block\nfor '+this.effect[1]+' Turn'; if(this.effect[1]>1){string+='s'} break
            case 66: string+='Apply '+this.effect[0]+' Weak'; break
            case 67: string+='Apply '+this.effect[0]+' Vulnerable'; break
            case 68: string+='Remove '+this.effect[0]+' Strength\nTemporarily'; break
            case 69: string+='Add '+this.effect[0]+' Random\nColorless Card'; if(this.effect[0]>1){string+='s'}; string+='\nto Your Hand'; break
            case 70: string+='Place a Card\non Top of Your\nDraw Pile\nIt Costs 0\nTemporarily'; break
            case 71: string+='Choose Between 3\nCards to Add\nto Your Hand\nIt Costs 0'; break
            
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
    callDiscardEffect(){
        switch(this.attack){
            case -1:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].status.main[8]++
            break
            case -2:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].status.main[9]++
            break
        }
    }
    anotherPlayed(){
        switch(this.attack){
            case 52:
                this.deSize=true
            break
            case 56:
                if(this.cost>=0){
                    this.cost++
                }
            break
        }
    }
    playable(){
        return !this.spec.includes(5)||this.battle.relicManager.hasRelic(11,this.player)
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
            if(this.player==-1){
                this.layer.noStroke()
                this.layer.fill(150,this.fade)
                this.layer.rect(0,0,3,this.height+5)
            }
            if(this.spec.includes(6)){
                this.layer.fill(138,141,207,this.fade)
                this.layer.stroke(111,114,178,this.fade)
                this.layer.strokeWeight(2)
                this.layer.ellipse(-this.width/2+10,-this.height/2+12,20,20)
            }
            if(!this.spec.includes(5)){
                this.layer.fill(225,255,255,this.fade)
                this.layer.stroke(200,255,255,this.fade)
                this.layer.strokeWeight(2)
                this.layer.quad(-this.width/2+2,-this.height/2+12,-this.width/2+10,-this.height/2+2,-this.width/2+18,-this.height/2+12,-this.width/2+10,-this.height/2+22)
            }
            this.layer.noStroke()
            if(!this.spec.includes(5)){
                this.layer.fill(mergeColor([255,0,0],[0,0,0],this.anim.afford),this.level/2,this.fade)
                this.layer.textSize(14)
                if(this.cost==-1){
                    this.layer.text('X',-this.width/2+10,-this.height/2+13)
                }else{
                    this.layer.text(this.cost,-this.width/2+10,-this.height/2+13)
                }
            }
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
                case 6:
                    this.layer.text('Curse',0,this.height/2-6)
                break
            }
            this.layer.pop()
        }
    }
    displayStatus(anim){
        if(this.size>0&&this.fade>0){
            this.layer.push()
            this.layer.translate(this.position.x,this.position.y)
            this.layer.scale(this.size)
            this.layer.noFill()
            this.layer.strokeWeight(3)
            if(anim[0]>0){
                this.layer.stroke(255,0,0,this.fade*anim[0])
                this.layer.rect(0,0,this.width+2,this.height+2,5)
            }
            if(anim[1]>0){
                this.layer.stroke(100,255,255,this.fade*anim[1])
                this.layer.rect(0,0,this.width+2,this.height+2,5)
            }
            if(anim[2]>0){
                this.layer.stroke(255,255,0,this.fade*anim[2])
                this.layer.rect(0,0,this.width+2,this.height+2,5)
            }
            this.layer.pop()
        }
    }
    update(){
        if(this.select){
            this.upSize=true
        }
        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
        this.afford=(userCombatant.status.main[22]>0&&this.class==1||this.battle.energy.main[this.player]>=this.cost)&&
        !(this.spec.includes(6)&&!userCombatant.armed)?true:false
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