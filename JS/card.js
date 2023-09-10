class card{
    constructor(layer,battle,player,x,y,type,level,color,id,cost,additionalSpec,name,list,effect,attack,target,spec,cardClass){
        this.layer=layer
        this.battle=battle
        this.player=player
        this.position={x:x,y:y}
        this.type=round(type)
        if(variants.speedcard){
            switch(types.card[this.type].name){
                case 'Step':
                    this.type=round(findName('I-Step',types.card))
                break
                case 'Step-L':
                    this.type=round(findName('I-Step-L',types.card))
                break
                case 'Step-R':
                    this.type=round(findName('I-Step-R',types.card))
                break
                case 'Initiative':
                    this.type=round(findName('I-Initiative',types.card))
                break
            }
        }
        this.level=level
        this.color=color
        this.id=id
        this.cost=cost
        if(cost==undefined&&this.type<types.card.length){
            this.cost=types.card[this.type].levels[this.level].cost
        }

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
        this.retain=false
        this.select=false
        this.afford=false
        this.energyAfford=false
        this.nonCalc=false
        this.discardEffect=[]
        this.discardEffectBuffered=[]

        this.anim={select:0,afford:0}
        this.colorDetail=types.color.card[this.color]

        try{
            this.name=name||types.card[this.type].name
            this.list=list||types.card[this.type].list
            this.rarity=types.card[this.type].rarity
            this.effect=effect
            this.effect=this.effect==undefined?copyArray(types.card[this.type].levels[this.level].effect):copyArray(this.effect)
            this.attack=attack||types.card[this.type].levels[this.level].attack
            this.target=target||types.card[this.type].levels[this.level].target
            this.spec=(spec||types.card[this.type].levels[this.level].spec).concat(additionalSpec||[])
            this.class=cardClass||types.card[this.type].levels[this.level].class
            this.levels=types.card[this.type].levels.length
            this.additionalSpec=additionalSpec||[]
            if(this.list==-1){
                this.list=this.color
            }

            this.base={cost:cost}
            if(this.base.cost==undefined){
                this.base.cost=types.card[this.type].levels[this.level].cost
            }
            if(this.spec.includes(12)){
                this.reality=types.card[this.type].levels[this.level].reality
            }
            if(this.spec.includes(15)){
                this.limit=types.card[this.type].levels[this.level].limit
            }

            this.strike=this.name.includes('Strike')
            this.basic=this.name=='Strike'||this.name=='Defend'||this.name=='Step'||this.name=='Strike-'||this.name=='Defend-'||this.name=='Step-L'||this.name=='Step-R'

            this.remove=false
        }catch(error){
            print('!!!',this.type,error)
            this.remove=true
        }
    }
    calculateEffect(effect,type){
        if(stage.scene=='battle'&&!this.nonCalc){
            let user=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
            return calculateEffect(effect,user,type,this.player,this.battle.relicManager,true,[this.strike,this.name=='Shiv'])
        }else{
            return calculateEffect(effect,this.battle.combatantManager.proxyPlayer,type,-1,new disabledRelicManager(),-1,[false])
        }
    }
    calculateEffectAlly(effect,type){
        if(stage.scene=='battle'&&!this.nonCalc){
            let user=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.battle.players-1-this.player)]
            return calculateEffect(effect,user,type,this.player,this.battle.relicManager,true,[this.strike,this.name=='Shiv'])
        }else{
            return calculateEffect(effect,this.battle.combatantManager.proxyPlayer,type,-1,new disabledRelicManager(),-1,[false])
        }
    }
    description(attack,effect,spec){
        let string=''
        if(spec.includes(5)){
            string+='Unplayable\n'
        }
        if(spec.includes(7)){
            string+='Unremovable\n'
        }
        if(spec.includes(3)){
            string+='Innate\n'
        }
        if(spec.includes(9)){
            string+='Stapled\n'
        }
        switch(attack){
            case -1: string+=`Gain 1 Weak at\nthe End of Your Turn`; break
            case -2: string+=`Gain 1 Vulnerable at\nthe End of Your Turn`; break
            case -3: string+=`When Drawn,\nExhaust ${effect[0]} Card\nCannot be Selected\nto Exhaust`; break
            case -4: string+=`Take ${effect[0]} Damage at\nthe End of Your Turn`; break
            case -5: string+=`Take ${effect[0]} Damage\nWhen You Play a Card`; break
            case -6: string+=`When Drawn,\nGain ${effect[0]} Weak`; break
            case -7: string+=`At the End of Your\nTurn, Take ${effect[0]} Damage\nPer You Card Left\nat End of Turn`; break
            case -8: string+=`Take ${effect[0]} Damage\nWhen an Enemy Dies`; break
            case -9: string+=`You Cannot\nPlay More Than ${effect[0]}\nCards This Turn`; break
            case -10: string+=`When Removed,\nLose ${effect[0]} Max Health`; break
            case -11: string+=`If Unplayed,\nAdd a Pride to\nDiscard Pile`; break
            case -12: string+=`When Drawn,\nA Random Card\nCosts ${effect[0]} More`; break
            case -13: string+=`Take ${effect[0]} Damage`; break
            case -14: string+=`Lose ${effect[0]} Currency`; break
            case -15: string+=`When Drawn,\nYou Cannot Move\nFor ${effect[0]} Turns\nWhen Played, Cancels\nPrevious Effect`; break
            case -16: string+=`When Drawn,\nAdd a Fatigue to Hand`; break
            case -17: string+=`When Drawn,\nA Random Card\nCosts ${effect[0]} More This Combat`; break
            case -18: string+=`When Drawn,\nLose ${effect[0]} Energy`; break
            case -19: string+=`When Drawn,\nYou Cannot Move\nFor ${effect[0]} Turns`; break
            case -20: string+=`When Drawn,\nMovement Cards in Hand\nCost ${effect[0]} More`; break
            case -21: string+=`Take ${effect[0]} Damage\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case -22: string+=`When Drawn,\nStop Drawing`; break
            case -23: string+=`When Drawn,\nExhaust ${effect[0]}\nRandom Card${effect[0]!=1?`s`:``}`; break
            case -24: string+=`When Drawn,\nAdd a Burn to Hand`; break
            case -25: string+=`When Drawn,\nAll Cards in Hand\nWill Exhaust`; break
            case -26: string+=`When Drawn,\nHalve Card Effects`; break
            case -27: string+=`When Drawn,\nLose ${effect[0]} Temporary\nStrength`; break
            case 1: case 25: case 32: case 36: case 57: case 327: case 590:
                string+=`Deal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 2: string+=`Add ${this.calculateEffect(effect[0],1)} Block`; break
            case 3: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}`; break
            case 4: case 729:
                string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times`; break
            case 5: case 16:
                string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile`; break
            case 6: string+=`Next ${effect[0]!=1?effect[0]+` `:``}Attack${effect[0]!=1?`s`:``}\nDeal${effect[0]==1?`s`:``} Double\nDamage`; break
            case 7: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal, Gain\n${effect[1]} Energy`; break
            case 8: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}`; break
            case 9: string+=`Swap With an\nAdjacent Target\nTarget Will Face User\nor\nMove ${effect[0]} Tiles`; break
            case 10: string+=`Heal ${this.calculateEffect(effect[0],4)} Health`; break
            case 11: case 251:
                string+=`Pull Target Until Adjacent\nTarget Will Face User`; break
            case 12: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage`; break
            case 13: string+=`Add ${this.calculateEffect(effect[0],3)} Block`; break
            case 14: string+=`Pass Through an\nAdjacent Target\nor\nMove ${effect[0]} Tile${effect[0]!=1?`s`:``}`; break
            case 15: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPush 1 Tile\nMove Forward 1 Tile`; break
            case 17: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nMove 1 Tile Away`; break
            case 18: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions`; break
            case 19: string+=`Swap With an\nAdjacent Target\nDeal ${this.calculateEffect(effect[0],0)} Damage\nPush 1 Tile`; break
            case 20: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nDiscard ${effect[1]}\nRandom Card`; break
            case 21: string+=`Advance up to ${effect[0]} Tile${effect[0]!=1?`s`:``}\nToward an Enemy`; break
            case 22: string+=`Gain ${effect[0]} Energy\nTake ${effect[1]} Damage`; break
            case 23: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]}`; break
            case 24: string+=`Make an Enemy Attack\nThey Will Not Attack\non Their Turn`; break
            case 26: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCannot be Pushed\nThis Turn`; break
            case 27: string+=`Advance up to ${effect[1]} Tile${effect[0]!=1?`s`:``}\nToward an Enemy\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 28: string+=`Put a Card in Discard\nPile in Your Hand`; break
            case 29: string+=`Put a Card in Draw\nPile in Your Hand`; break
            case 30: string+=`Add ${effect[0]} Dodge`; break
            case 31: case 489:
                string+=`Push 1 Tile\nin All Directions`; break
            case 33: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdvance`; break
            case 34: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Energy\nNext Turn`; break
            case 35: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target is Undamaged,\nGain ${effect[1]} Energy`; break
            case 37: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDisarm`; break
            case 38: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Attack,\nReduce Damage by ${effect[1]}`; break
            case 39: case 49:
                string+=`Apply ${effect[0]} Bleed`; break
            case 40: string+=`Discard Your Hand\nDraw That Many Cards`; break
            case 41: string+=`Gain ${effect[0]} Energy`; break
            case 42: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 43: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 44: string+=`Shuffle Discard Pile\nInto Draw Pile\nDraw ${effect[0]} Card${effect[1]!=1?`s`:``}`; break
            case 45: string+=`Upgrade All Cards\nTemporarily`; break
            case 46: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nif Target Has Bleed`; break
            case 47: case 662:
                string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Bleed`; break
            case 48: case 100:
                string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage`:``}\nPush 2 Tiles`; break
            case 50: string+=`Add ${this.calculateEffect(+effect[0],1)} Block\nRetain Block\nfor ${effect[1]} Turn${effect[1]!=1?`s`:``}`; break
            case 51: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nAdd ${effect[1]} Dodge`; break
            case 52: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nDiscard When a\nCard is Played`; break
            case 53: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${effect[1]} Dodge`; break
            case 54: string+=`Move to Any\nEmpty Tile`; break
            case 55: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nDiscard ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 56: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nCosts 1 More When\na Card is Played`; break
            case 58: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nAdd a Stride\nto Your Hand`; break
            case 59: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nLose All Block`; break
            case 60: string+=`Move Up to ${effect[0]!=1?effect[0]:``}X${effect[1]>0?`+`+effect[1]:``} Tiles`; break
            case 61: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal, Gain\n${effect[1]} Currency`; break
            case 62: string+=`Reduce Cost of\nAll Cards in\nHand to ${effect[0]}${effect[1]==0?`\nTemporarily`:``}`; break
            case 63: string+=`Exhaust Any Number\nof Cards in Hand`; break
            case 64: string+=`Gain ${effect[0]} Control`; break
            case 65: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCannot Gain Block\nfor ${effect[1]} Turn${effect[1]!=1?`s`:``}`; break
            case 66: case 84:
                string+=`Apply ${effect[0]} Weak`; break
            case 67: case 85:
                string+=`Apply ${effect[0]} Vulnerable`; break
            case 68: string+=`Remove ${effect[0]} Strength\nTemporarily`; break
            case 69: string+=`Add ${effect[0]} Random\nColorless Card${effect[0]!=1?`s`:``}\nto Your Hand`; break
            case 70: string+=`Place a Card\non Top of Your\nDraw Pile\nIt Costs 0\nTemporarily`; break
            case 71: string+=`Choose Between 3\nCards to Add\nto Your Hand\nIt Costs 0`; break
            case 72: string+=`Gain ${effect[0]} Strength\nLose ${effect[1]} Health`; break
            case 73: string+=`Gain ${effect[0]} Dexterity\nLose ${effect[1]} Health`; break
            case 74: string+=`Gain ${effect[0]} Buffer\nLose ${effect[1]} Health`; break
            case 75: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nAway From Target`; break
            case 76: string+=`Gain ${effect[0]} Intangible`; break
            case 77: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHeal ${this.calculateEffect(effect[1],4)} Health`; break
            case 78: string+=`A Random Card\nin Your Hand\nBecomes Free`; break
            case 79: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd an Ouroboros With\n+${effect[1]} Damage to Discard`; break
            case 80: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Frail`; break
            case 81: string+=`Apply ${effect[0]} Poison`; break
            case 82: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nCan be Thrown\nThrough Things`; break
            case 83: string+=`Apply ${effect[0]} Stun`; break
            case 86: string+=`Apply ${effect[0]} Frail`; break
            case 87: string+=`Move to Any Tile\nDestroy its\nOccupants`; break
            case 88: string+=`Deal ${this.calculateEffect(effect[0],5)} Damage`; break
            case 89: string+=`Remove All\nBlock of Target\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 90: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nNext Attack Deals\n${effect[1]} More Damage`; break
            case 91: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 92: string+=`Remove ${effect[0]} Fatigue${effect[0]!=1?`s`:``}`; break
            case 93: string+=`Put a Card in Exhaust\nPile in Your Hand`; break
            case 94: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nExhaust ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 95: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nExhaust ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 96: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter Push 1 Tile`; break
            case 97: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]} Bleed`; break
            case 98: string+=`Gain ${effect[0]} Temporary\nDamage Up`; break
            case 99: string+=`Gain ${effect[0]} Energy\nNext Turn`; break
            case 101: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDoes Double\nDamage if\nPlayed First`; break
            case 102: string+=`Rearm or Create\na Rearmament Point`; break
            case 103: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Less\nCards Next Turn`; break
            case 104: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will\nUse a Special Move,\nReduce Damage by ${effect[1]}`; break
            case 105: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nLose ${effect[1]} Energy`; break
            case 106: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Attack,\nApply ${effect[1]} Weak`; break
            case 107: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDecreases by ${effect[1]}`; break
            case 108: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 1 Less`; break
            case 109: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nAdd a Burn to\nDiscard Pile`; break
            case 110: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Control`; break
            case 111: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf You Have Played\nLess Than ${effect[1]} Card${effect[1]>0?`s`:``},\nDraw ${effect[2]} Card${effect[2]>0?`s`:``}`; break
            case 112: string+=`Add ${effect[0]} Shiv${effect[0]!=1?`s`:``}\nto Your Hand`; break
            case 113: string+=`Gain ${effect[0]} Energy\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 114: string+=`Gain 1 Item`; break
            case 115: string+=`Deal ${effect[0]} Damage\nAdd an Anger to\nYour Draw Pile`; break
            case 116: string+=`End Your Turn\nGain X${effect[0]!=0?`+${effect[0]}`:``} Energy\nNext Turn`; break
            case 117: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nif You Have Weak`; break
            case 118: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases By ${effect[1]}`; break
            case 119: string+=`If Every Card in\nHand is an Attack,\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 120: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDiscard ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 121: string+=`If Unarmed,\n${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage`:``}\nPush 1 Tile`; break
            case 122: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]} All`; break
            case 123: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd 1 Slow Bleed\nto Discard`; break
            case 124: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nExhaust ${effect[1]} Random Card${effect[1]!=1?`s`:``}`; break
            case 125: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDiscard ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 126: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Weak`; break
            case 127: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Vulnerable\nAdvance`; break
            case 128: string+=`Gain ${effect[0]} Combo`; break
            case 129: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],7)}\nDamage`; break
            case 130: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],7)}\nDamage\nEnd Combo\nAdvance`; break
            case 131: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]}+${effect[2]!=1?`${effect[2]}*`:``}Combo`; break
            case 132: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],7)}\nDamage 3 Times\nEnd Combo`; break
            case 133: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPush 1 Tile\nMove 1 Tile Away`; break
            case 134: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage`:``}\nPush 1 Tile Right`; break
            case 135: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage`:``}\nPush 1 Tile Left`; break
            case 136: case 217:
                string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Times`; break
            case 137: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Strength\nNext Turn`; break
            case 138: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Tiles Wide`; break
            case 139: string+=`Deal ${this.calculateEffect(effect[0],0)}+${effect[1]!=1?`${effect[1]}*`:``}Combo\nDamage 3 Tiles Wide\nEnd Combo`; break
            case 140: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIgnore Block`; break
            case 141: string+=`Convert ${this.calculateEffect(effect[0],6)}\nto Block`; break
            case 142: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Strength\nWhen Attacked`; break
            case 143: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\n`:`\n`}Push 1 Tile`; break
            case 144: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number of\nCards in Discard\n(Including This Card)`; break
            case 145: string+=`Heal ${effect[0]} Health\nto Ally`; break
            case 146: string+=`Add ${effect[0]} Block\nto Ally`; break
            case 147: string+=`Swap Places\nWith Ally`; break
            case 148: string+=`Heal ${this.calculateEffectAlly(effect[0],4)} Health\nRemove ${effect[1]} Health\nfrom Ally`; break
            case 149: string+=`Take 25% Less\nDamage For ${effect[0]} Turn${effect[0]!=1?`s`:``}`; break
            case 150: string+=`Gain ${effect[0]} Strength\nFor 2 Turns`; break
            case 151: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Etherealed, Add\nan Operational Defend`; break
            case 152: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen Etherealed, Add\nan Operational Strike`; break
            case 153: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nDiagonally`; break
            case 154: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Your Block`; break
            case 155: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Energy`; break
            case 156: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Temporary Slow`; break
            case 157: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Target And to Up\nto 1 Adjacent Enemy`; break
            case 158: string+=`Ally Draws ${effect[0]} More\nCards on Their Turn`; break
            case 159: string+=`Ally Gains ${effect[0]} Strength`; break
            case 160: string+=`Ally Gains ${effect[0]} Energy\non Their Turn`; break
            case 161: string+='Send All Remaining\nCards to Ally'; break
            case 162: string+=`Ally Gains ${effect[0]} Buffer`; break
            case 163: string+=`Ally Removes ${effect[0]} Statuses`; break
            case 164: string+=`Steal ${effect[0]} Currency\nFrom Ally`; break
            case 165: string+=`Move Ally to Any\nEmpty Tile`; break
            case 166: string+=`Add to Hand:\nRiot Shield\nPepper Spray\nShock Baton`; break
            case 167: string+=`Add to Hand:\nRiot Shield\nPepper Spray\nShock Baton\nUpgrade 1\nat Random`; break
            case 168: string+=`Add to Hand:\nFlamethrower\nImpact Grenade\nLandmine`; break
            case 169: string+=`Add to Hand:\nFlamethrower\nImpact Grenade\nLandmine\nUpgrade 1\nat Random`; break
            case 170: string+=`Add to Hand:\nSubmachine\nAntitank Rocket\nAmmo Box`; break
            case 171: string+=`Add to Hand:\nSubmachine\nAntitank Rocket\nAmmo Box\nUpgrade 1\nat Random`; break
            case 172: string+=`You Cannot Take\nFrontal Damage\nFor ${effect[0]} Turns`; break
            case 173: string+=`Target Moves in\na Random Direction`; break
            case 174: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Stun`; break
            case 175: string+=`Apply ${effect[0]} Burn\n3 Tiles Wide`; break
            case 176: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nIgnore Block`; break
            case 177: string+=`Create 1 Landmine`; break
            case 178: string+=`Deal ${this.calculateEffect(effect[0],0)} Decrementing\nDamage 4 Times`; break
            case 179: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nPushes Without\nSplash at Range 1`; break
            case 180: string+=`Your Next ${effect[0]} Exhausts\nDo Not Occur\nDoes Not Affect Self`; break
            case 181: string+=`Add ${effect[0]} Dodge\nCounter ${effect[1]}`; break
            case 182: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nGain ${effect[1]} Combo\nTake ${effect[2]} Damage\nif You Don't Attack`; break
            case 183: string+=`Draw ${effect[0]}X${effect[1]>0?`+${effect[1]}`:``} Cards`; break
            case 184: string+=`Collisions do ${effect[0]}\nMore Damage`; break
            case 185: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card\n${effect[1]!=1?`They Cost`:`It Costs`} 0`; break
            case 186: string+=`All Cards in Hand\nCost ${effect[0]} Less`; break
            case 187: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTake ${effect[1]} Damage\nif Discarded`; break
            case 188: string+=`Apply ${effect[0]} Damage\nTaken Bonus\nand ${effect[1]} Strength`; break
            case 189: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTarget Will Attack`; break
            case 190: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Energy\nWhen Hit`; break
            case 191: string+=`Deal ${this.calculateEffect(effect[0],8)}\nDamage`; break
            case 192: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nGain ${effect[1]} Strength`; break
            case 193: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double to Bosses`; break
            case 194: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nLose ${effect[1]} Health`; break
            case 195: string+=`Convert ${effect[0]}*Combo\nto Health`; break
            case 196: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Conditioning`; break
            case 197: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Conditioning`; break
            case 198: string+=`Multiply Your Combo\nby ${effect[0]}`; break
            case 199: string+=`Combo-Costing Cards\nCost ${effect[0]} Less`; break
            case 200: string+=`Gain ${effect[0]} Conditioning\nLose ${effect[1]} Health`; break
            case 201: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile\nin Both Directions`; break
            case 202: string+=`Gain ${effect[0]} Combo\nIf Exhausted,\nGain ${effect[1]} Combo`; break
            case 203: string+=`Retain Block\nfor ${effect[0]} Turn${effect[0]!=1?`s`:``}`; break
            case 204: string+=`Add ${effect[0]} Dodge\nGain ${effect[1]} Conditioning`; break
            case 205: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nDoesn't Trigger Enemies`; break
            case 206: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nWhere X = Number of\nCards in Hand\nDiscard Your Hand`; break
            case 207: string+=`Discard ${effect[0]} Card${effect[0]!=1?`s`:``}\nAdd ${effect[1]} Random\nCards to Your Hand`; break
            case 208: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n4 Times\nAdvance`; break
            case 209: string+=`Add ${effect[0]} Random\nDefense${effect[0]!=1?`s`:``} to Your Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0\nThis Turn`; break
            case 210: string+=`Add ${effect[0]} Random\nDefense${effect[0]!=1?`s`:``} to Your Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0`; break
            case 211: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nAdd ${effect[1]} Dodge`; break
            case 212: string+=`Gain ${effect[0]} Base\nEnergy This Combat`; break
            case 213: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nGain ${effect[1]} Conditioning`; break
            case 214: string+=`Upgrade ${effect[0]} Random Card${effect[0]!=1?`s`:``}\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 215: string+=`Gain ${effect[0]} Combo\nLose ${effect[1]} Health`; break
            case 216: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd ${effect[1]} Shiv${effect[1]!=1?`s`:``}\nto Your Hand`; break
            case 218: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}\nDiscard ${effect[2]} Card${effect[2]!=1?`s`:``}`; break
            case 219: string+=`Add ${effect[0]} Shiv${effect[0]!=1?`s`:``}\nto Your Hand\nEvery Turn`; break
            case 220: case 594:
                string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDiscard When a\nCard is Played`; break
            case 221: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Combo`; break
            case 222: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin Both Directions`; break
            case 223: string+=`Gain ${effect[0]} Conditioning`; break
            case 224: string+=`Heal ${this.calculateEffect(effect[0],9)} Health`; break
            case 225: string+=`Gain ${effect[0]} Combo\nGain ${effect[1]} Energy\nNext Turn`; break
            case 226: string+=`Gain ${effect[0]} Combo\nLose All Combo\nat End of Turn`; break
            case 227: string+=`Next ${effect[0]} Card${effect[0]!=1?`s`:``}\nPlayed ${effect[0]!=1?`are`:`is`} Duplicated`; break
            case 228: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],7)}\nDamage\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 229: string+=`Add ${effect[0]} Random\nAttack${effect[0]!=1?`s`:``} to Your Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0\nThis Turn`; break
            case 230: string+=`Add ${effect[0]} Random\nAttack${effect[0]!=1?`s`:``} to Your Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0`; break
            case 231: string+=`Each Hit Gains\n${effect[0]} More Combo`; break
            case 232: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nWhen Attack Played`; break
            case 233: string+=`Gain ${effect[0]} Combo\nWhen You Gain Block`; break
            case 234: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal, Gain\n${effect[1]} Combo`; break
            case 235: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nCounter ${effect[1]}X`; break
            case 236: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage`:``}\nPush 1 Tile Right Back`; break
            case 237: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage`:``}\nPush 1 Tile Left Back`; break
            case 239: string+=`Gain ${effect[0]} Combo\nPer Turn`; break
            case 240: string+=`Gain ${effect[0]} Combo\nNext Turn`; break
            case 241: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals ${this.calculateEffect(effect[1],10)} More Damage\nWhen Up to Wall\nMove 1 Tile Away`; break
            case 242: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]}\nat Range 1-2`; break
            case 243: string+=`Pull Target 1 Tile\nTarget Will Face User\nAdvance`; break
            case 244: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 2 Tiles\nAround Right`; break
            case 245: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 2 Tiles\nAround Left`; break
            case 246: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nMove 6 Tiles Away`; break
            case 247: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],7)}\nDamage\nPush 1 Tile\nEnd Combo`; break
            case 248: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nGain ${effect[1]} Conditioning`; break
            case 249: string+=`Gain Strength\nPer ${effect[0]} Combo\nEnd Combo`; break
            case 250: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push to End`; break
            case 252: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nX Times`; break
            case 253: string+=`Discard Your Hand\nAnd Add That\nMany${effect[0]>0?`+${effect[0]}`:``} Shivs`; break
            case 254: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen Card Played`; break
            case 255: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nDecreases by ${effect[1]}`; break
            case 256: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nDiscard ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 257: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nWhen Selectively\nDiscarded`; break
            case 258: string+=`Gain ${effect[0]} Energy\nWhen Selectively\nDiscarded`; break
            case 259: string+=`Gain ${effect[0]} Energy\nDiscard ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 260: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Temporary\nDamage Down`; break
            case 261: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}\n${effect[1]!=1?`They Cost`:`It Costs`} 1 Less`; break
            case 262: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd ${effect[1]} Block\nNext Turn`; break
            case 263: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 0 This\nTurn When a\nCard is Discarded`; break
            case 264: string+=`Shivs Deal ${effect[0]}\nMore Damage`; break
            case 265: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number of\nAttacks Played\nThis Turn\n(Including This Card)`; break
            case 266: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 1 More\nWhen Damage Taken`; break
            case 267: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number of\nDefenses in Hand`; break
            case 268: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Has Weak:\nGain ${effect[1]} Energy\nDraw ${effect[2]} Card${effect[2]!=1?`s`:``}`; break
            case 269: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Has Vulnerable:\nGain ${effect[1]} Energy\nDraw ${effect[2]} Card${effect[2]!=1?`s`:``}`; break
            case 270: string+=`Add ${effect[0]} Shiv${effect[0]!=1?`s`:``}\nto Your Hand\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 271: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCounter ${effect[1]}`; break
            case 272: string+=`Apply ${effect[0]}\nRandom Debuff`; break
            case 273: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 274: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd a Chip to\nDiscard Pile`; break
            case 275: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nAdd ${this.calculateEffect(effect[1],3)} Block\nValues Swap\nWhen X is Odd`; break
            case 276: string+=`Next ${effect[0]} Card${effect[0]!=1?`s`:``}\nPlayed ${effect[0]!=1?`are`:`is`} Duplicated\nDiscard ${effect[0]} Random Card${effect[0]!=1?`s`:``}`; break
            case 277: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd an Overflow to\nDiscard Pile`; break
            case 278: string+=`Gain ${effect[0]}\nTemporary Strength`; break
            case 279: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\n${effect[0]!=1?`They Cost`:`It Costs`} 0`; break
            case 280: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],11)} Damage\nWhere X = Number of\nAttacks in Hand`; break
            case 281: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nExhaust ${effect[1]} Random\nCard${effect[1]!=1?`s`:``}`; break
            case 282: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 1 Less\nWhen Damage Taken`; break
            case 283: string+=`Gain ${effect[0]} Energy\nLose ${effect[1]} Health`; break
            case 284: string+=`Gain ${effect[0]} Energy\nFor the Next\n2 Turns`; break
            case 285: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nDiscard ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 286: string+=`Counter ${effect[0]} All\nThis Combat`; break
            case 287: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTarget Takes ${effect[1]}\nDamage Per Card\nPlayed This Turn`; break
            case 288: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Drawn, Add ${effect[1]}\nStream${effect[1]!=1?`s`:``} to Hand`; break
            case 289: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nIf Last Card\nis a Defense,\nGain ${this.calculateEffect(effect[1],1)} Block`; break
            case 290: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Times\nCosts 1 Less This\nTurn When a\nCard is Discarded`; break
            case 291: string+=`Draw to ${effect[0]} Card${effect[0]!=1?`s`:``}`; break
            case 292: string+=`Apply ${effect[0]} Weak\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 293: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} More\nCard${effect[1]!=1?`s`:``} Next Turn`; break
            case 294: string+=`All Cards Cost 0\nYou Cannot Draw\nCards This Turn`; break
            case 295: string+=`Target Explodes\non Death For\nits Max Health`; break
            case 296: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nif Draw Pile\nis Empty`; break
            case 297: string+=`Remove ${effect[0]}X Strength\nApply ${effect[1]}X Weak`; break
            case 298: string+=`Add ${effect[0]} Cop${effect[0]!=1?`ies`:`y`}\nof a Card to\nthe Bottom of\nYour Draw Pile\n${effect[0]!=1?`They Cost`:`It Costs`} 0`; break
            case 299: string+=`Deal Double Damage\nNext Turn`; break
            case 300: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``} and\nDiscard ${effect[1]} Card${effect[1]!=1?`s`:``}\nEvery Turn`; break
            case 301: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDiscard Non-Attacks`; break
            case 302: string+=`Gain ${effect[0]} Intangible\nLose ${effect[1]} Dexterity\nPer Turn`; break
            case 303: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Energy\nWhen Exhausted`; break
            case 304: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nExhuast Non-Attacks`; break
            case 305: string+=`If Target Will Attack,\nGain ${effect[0]} Strength`; break
            case 306: string+=`Retain Block\nFor 999 Turns`; break
            case 307: string+=`Gain ${effect[0]} Vulnerable\nGain ${effect[1]} Energy\nPer Turn`; break
            case 308: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``} and\nLose ${effect[1]} Health\nEvery Turn`; break
            case 309: string+=`All Defenses Are\nFree and Exhaust`; break
            case 310: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal, Gain\n${effect[1]} Max Health`; break
            case 311: string+=`Multiply Your\nBuffs By ${effect[0]}`; break
            case 312: string+=`When Damage Taken,\nAdd ${effect[0]} Shiv${effect[0]!=1?`s`:``}\nto Your Hand`; break
            case 313: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nIf Last Card\nis an Attack,\nAdd ${effect[1]} Shiv${effect[1]!=1?`s`:``}\nto Your Hand`; break
            case 314: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal, Deal\n${this.calculateEffect(effect[1],0)} Splash Damage`; break
            case 315: string+=`Send Discard\nPile to Hand`; break
            case 316: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]}\nRandom Debuff`; break
            case 317: string+=`Gain ${effect[0]} Intangible\nand ${effect[1]} Energy\nNext Turn`; break
            case 318: string+=`When Card Exhausted\nDraw ${effect[0]} Card${effect[0]!=1?`s`:``}`; break
            case 319: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeal ${this.calculateEffect(effect[0],1)} Damage\nto a Random\nOther Enemy`; break
            case 320: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nFor 3 Turns`; break
            case 321: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nNext Attack Deals\n${effect[1]} More Damage`; break
            case 322: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIf You Have No Block,\nGain ${effect[1]} Energy`; break
            case 323: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked,\nAdd ${effect[1]} Shiv${effect[1]!=1?`s`:``}\nto Your Hand`; break
            case 324: string+=`Add a Shiv\nto Your Hand\nFor Each One\nYou Already Have`; break
            case 325: string+=`Add ${effect[0]}X Shivs\nto Your Hand`; break
            case 326: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Attack,\nAdd ${effect[1]} Shiv${effect[1]!=1?`s`:``}\nto Your Hand`; break
            case 328: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nin Any Direction`; break
            case 329: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDiagonally`; break
            case 330: string+=`Move to\nEnd of Board\nMax Range of ${effect[0]} Tile${effect[0]!=1?`s`:``}`; break
            case 331: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nAdd ${effect[1]} Shiv${effect[1]!=1?`s`:``}\nto Your Hand`; break
            case 332: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nHorizontally Only`; break
            case 333: string+=`Swap With an\nRange 1-2 Target\nTarget Will Face User`; break
            case 334: string+=`Gain ${effect[0]} Energy and\nDraw ${effect[1]} Less Card${effect[1]!=1?`s`:``}\nEvery Turn`; break
            case 335: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nGain ${effect[1]} Energy\nNext Turn`; break
            case 336: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nRange 1-2`; break
            case 337: string+='Put an Attack\nFrom Your Draw\nPile into\nYour Hand'; break
            case 338: string+='Put a Defense\nFrom Your Draw\nPile into\nYour Hand'; break
            case 339: string+='Put a Movement\nFrom Your Draw\nPile into\nYour Hand'; break
            case 340: string+='Put a Power\nFrom Your Draw\nPile into\nYour Hand'; break
            case 341: string+=`Enemies Move\nToward Point`; break
            case 342: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto Any Enemy`; break
            case 343: string+=`Shuffle ${effect[0]} Random\nAttack${effect[0]!=1?`s`:``} Into\nYour Draw Pile\n${effect[0]!=1?`They Cost`:`It Costs`} 0`; break
            case 344: string+=`Shuffle ${effect[0]} Random\nDefense${effect[0]!=1?`s`:``} Into\nYour Draw Pile\n${effect[0]!=1?`They Cost`:`It Costs`} 0`; break            
            case 345: string+=`Deal Damage Equal to\nNumber of Cards in\nYour Deck${this.player>=0&&this.player<this.battle.players?` (${this.battle.cardManagers[this.player].deck.cards.length})`:``}`; break
            case 346: string+=`Add ${effect[0]}X Random\nColorless Cards\nto Your Hand`; break
            case 347: string+=`When You\nApply a Debuff,\nDeal ${effect[0]} Damage`; break
            case 348: string+=`Target Rotates\n180 Degrees`; break
            case 349: string+=`Heal All Health`; break
            case 350: string+=`Gain ${effect[0]} Energy Per Turn\nGain ${effect[1]} Strength\nGain ${effect[2]} Dexterity`; break
            case 351: string+=`Ally Gains ${effect[0]}\nCompletely Random Card${effect[0]!=1?`s`:``}`; break
            case 352: string+=`Add to Ally's Hand:\nStrike Aid\nDefend Aid\nStep Aid`; break
            case 353: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nAround Ally`; break
            case 354: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter Push 1\nTile Left`; break
            case 355: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter Push 1\nTile Right`; break
            case 356: string+=`Push 1 Tile Left\nin All Directions`; break
            case 357: string+=`Push 1 Tile Right\nin All Directions`; break
            case 358: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAnd to Another\nEnemy Behind`; break
            case 359: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter Temporary\nSpeed Down ${effect[1]}`; break
            case 360: string+=`Gain ${effect[0]} Max Health`; break
            case 361: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nLose ${effect[1]} Health`; break
            case 362: string+=`Remove All Fatigues\nLose ${effect[0]} Health Each`; break
            case 363: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nExhaust ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 364: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nLose ${effect[1]}X Health`; break
            case 365: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nLose ${effect[1]}X Health`; break
            case 366: string+=`All Fatigues\nAre Ethereal`; break
            case 367: string+=`Move All Fatigues\nto Your Hand`; break
            case 368: string+=`Advance up to ${effect[0]} Tile${effect[0]!=1?`s`:``}\nToward an Enemy\nEnds 2 Tiles Away`; break
            case 369: string+=`Gain ${effect[0]} Regnereation`; break
            case 370: string+=`Dealing Damage\nHeals ${this.calculateEffect(effect[0],4)} Health`; break
            case 371: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDoubles When You\nare Below 50% Health`; break
            case 372: string+=`Gain ${effect[0]} Energy\nPer Turn\nAll Cards Cost\n${effect[1]} Health to Play`; break
            case 373: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nLose ${effect[1]} Max Health`; break
            case 374: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nWhen Drawn, Add ${effect[1]}\nMulti-Step${effect[1]!=1?`s`:``} to Hand`; break
            case 375: string+=`Move Between ${effect[0]}\nand ${effect[1]} Tile${effect[0]!=1?`s`:``}`; break
            case 376: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nFor Every ${effect[1]}\nHealth You Have`; break
            case 377: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nWhere X = Number\nof Fatigues`; break
            case 378: string+=`Lose 10% Health\nDeal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Health Lost`; break
            case 379: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number\nof Fatigues\nExhausted`; break
            case 380: string+=`Gain ${effect[0]} Strength\nLose ${effect[1]} Max Health`; break
            case 381: string+=`For the Rest\nof Combat, Take\n40% Less Damage`; break
            case 382: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply 1 Confusion`; break
            case 383: string+=`Move to Scythe\nUp to ${effect[0]} Tile${effect[0]!=1?`s`:``} Away`; break
            case 384: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Bleed\nDiscard ${effect[2]} Card${effect[2]!=1?`s`:``}`; break
            case 385: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n${effect[1]} Balance`; break
            case 386: string+=`Add ${this.calculateEffect(effect[0],1)} Block\n${effect[1]} Balance`; break
            case 387: string+=`Set Balance to 0`; break
            case 388: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Balance\nSet Balance to 0`; break
            case 389: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nWhere X = Balance\nSet Balance to 0`; break
            case 390: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\n${effect[1]} Balance`; break
            case 391: string+=`Heal ${this.calculateEffect(effect[0],9)} Health\nWhere X = Balance\nSet Balance to 0`; break
            case 392: string+=`Gain ${effect[0]} Intangible\n${effect[1]} Balance`; break
            case 393: string+=`Gain ${effect[0]} Dexterity\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}\n${effect[1]} Balance`; break
            case 394: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\n${effect[1]} Balance`; break
            case 395: string+=`Apply ${effect[0]} Bleed\nin All Directions`; break
            case 396: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRearm From\nAdjacent Tiles`; break
            case 397: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\n${effect[1]} Balance`; break
            case 398: string+=`Tick Statuses\nDraw ${effect[0]} Card${effect[0]!=1?`s`:``}`; break
            case 399: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nDisarm`; break
            case 400: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Tiles Wide\n${effect[1]} Balance`; break
            case 401: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Bleed\nAdvance`; break
            case 402: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHeal Health Equal\nto Target's Bleed`; break
            case 403: string+=`Attacks This Turn\nApply ${effect[0]} Bleed`; break
            case 404: string+=`Next Attack This Turn\nApply ${effect[0]} Bleed`; break
            case 405: string+=`Attacks This Combat\nApply ${effect[0]} Bleed`; break
            case 406: string+=`Gain ${effect[0]} Bleed\nGain ${effect[1]} Strength`; break
            case 407: string+=`Multiply All\nBleed by ${effect[0]}`; break
            case 408: string+=`Multiply Target\nBleed by ${effect[0]}`; break
            case 409: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Weak`; break
            case 410: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]} Confusion`; break
            case 411: string+=`Draw ${effect[0]} More\nCard${effect[0]!=1?`s`:``} Per Turn\n${effect[1]} Balance`; break
            case 412: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Bleed\nDisarm`; break
            case 413: string+=`Apply ${effect[0]} Bleed\nDisarm`; break
            case 414: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 1 Less\nWhen Attack Played\n${effect[1]} Balance`; break
            case 415: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 1 Less\nWhen Defense Played`; break
            case 416: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCosts 1 Less\nWhen Attack Played`; break
            case 417: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Confusion\n${effect[2]} Balance`; break
            case 418: string+=`When Enemy Dies,\nHeal ${this.calculateEffect(effect[0],4)} Health`; break
            case 419: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number of\nCards in Hand\nExhaust Hand`; break
            case 420: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nHeal ${this.calculateEffect(effect[0],4)} Health Each`; break
            case 421: string+=`Rearm From Anywhere`; break
            case 422: string+=`Balance Has No Effect`; break
            case 423: string+=`Breaking Balance\nGives 1 Energy`; break
            case 424: string+=`Existing Cards\nNo Longer\nRequire Armament`; break
            case 425: string+=`Apply ${effect[0]} Confuse\nto All Enemies`; break
            case 426: string+=`Gain ${effect[0]} Strength\nGain ${effect[1]} Dexterity\nDisarm as\nNon-Reusable`; break
            case 427: string+=`If Unarmed\nDeal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Confusion\nApply ${effect[2]} Vulnerable`; break
            case 428: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]} 3 Times`; break
            case 429: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd 1 Winded\nto Discard`; break
            case 430: string+=`Add ${this.calculateEffect(+effect[0],1)} Block\nRetain Block\nfor ${effect[1]} Turn${effect[1]!=1?`s`:``}\n${effect[2]} Balance`; break
            case 431: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nRearm From\nAdjacent Tiles`; break
            case 432: case 435:
                string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDisarm on Own Tile`; break
            case 433: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Defend,\nReduce Block by ${effect[1]}`; break
            case 434: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nIf Targets Will Attack,\nReduce Damage by ${effect[1]}`; break
            case 436: string+=`${effect[0]>0?`Apply ${effect[0]} Bleed\n`:`\n`}Push 1 Tile`; break
            case 437: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDisarm as\nNon-Reusable`; break
            case 438: string+=`Pull Target Until Adjacent\nTarget Will Face Away\nApply ${effect[0]} Confusion`; break
            case 439: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nPer Turn When Armed`; break
            case 440: string+=`Gain ${effect[0]} Dodge\nGain ${effect[1]} Bleed`; break
            case 441: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Bleed\nGain ${effect[2]} Bleed`; break
            case 442: string+=`Heal ${this.calculateEffect(effect[0],9)} Health\nWhere X = Self Bleed\nRemove All Self Bleed`; break
            case 443: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nReduce Balance\nLimit by ${effect[1]}`; break
            case 444: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd a Fury With\n-1 Damage to Hand\n${effect[1]} Balance`; break
            case 445: string+=`Gain ${effect[0]!=1?effect[0]:``}X Strength\nWhere X = Balance\nSet Balance to 0`; break
            case 446: string+=`Gain ${effect[0]!=1?effect[0]:``}X Dexterity\nWhere X = Balance\nSet Balance to 0`; break
            case 447: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile\nto All Enemies`; break
            case 448: string+=`Pass Through an\nAdjacent Target\nApply ${effect[0]} Bleed`; break
            case 449: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRearm From Target Tile`; break
            case 450: string+=`Double Balance`; break
            case 451: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nNext Turn`; break
            case 452: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd 1 Dazed\nto Draw Pile`; break
            case 453: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Bleed\n3 Tiles Wide`; break
            case 454: string+=`When Damage Taken\nAdd ${this.calculateEffect(effect[0],1)} Block`; break
            case 455: string+=`When You Heal,\nGain ${effect[0]} Max HP`; break
            case 456: string+=`Remove All Items,\nGain ${effect[0]} Max HP Each`; break
            case 457: string+=`Gain ${effect[0]} Energy\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 458: string+=`Pass Through an\nAdjacent Target\nAnd Add a Chain\nShift to Your Hand\nor\nMove ${effect[0]} Tile${effect[0]!=1?`s`:``}`; break
            case 459: string+=`Push 2 Tiles\nin All Directions`; break
            case 460: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nLose ${effect[1]} Health\nAdd a Pain\nStrike to Hand`; break
            case 461: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nLose ${effect[1]} Health\nAdd a Pain\nDefend to Hand`; break
            case 462: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRemove ${effect[1]} Fatigue${effect[1]!=1?`s`:``}`; break
            case 463: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRemove ${effect[1]} Fatigue${effect[1]!=1?`s`:``}`; break
            case 464: string+=`Move in a L Shape`; break
            case 465: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Rotate Target Left`; break
            case 466: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Rotate Target Right`; break
            case 467: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Rotate Target Hard Left`; break
            case 468: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Rotate Target Hard Right`; break
            case 469: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHorizontally Only`; break
            case 470: string+=`Gain ${effect[0]}X Max HP`; break
            case 471: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nTargets Will Face\nAway and Attack`; break
            case 472: string+=`Create 1 Plant Tile`; break
            case 473: string+=`Deal ${effect[0]} Damage\nto Targets on\nPlant Tiles`; break
            case 474: string+=`Create 7 Plant Tiles\nin a Circle`; break
            case 475: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nWhen Used on\na Plant Tile`; break
            case 476: string+=`Heal ${effect[0]} Heal\nto Targets on\nPlant Tiles`; break
            case 477: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nWhere X = Number\nof Plant Tiles`; break
            case 478: string+=`Randomly Rotate\nTargets on Plant Tiles`; break
            case 479: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nto a Target on\na Plant Tile`; break
            case 480: string+=`Apply ${effect[0]} Strength\nApply ${effect[1]} Dexterity\nto Targets on\nPlant Tiles`; break
            case 481: string+=`Apply ${effect[0]} Poison\nto Targets on\nPlant Tiles`; break
            case 482: string+=`Create a Row of Up\nto 6 Plant Tiles`; break
            case 483: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash\nDamage Around Self`; break
            case 484: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nCan't Move\nStraight Right`; break
            case 485: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nCan't Move\nStraight Left`; break
            case 486: string+=`Move to Any\nEmpty Plant Tile`; break
            case 487: string+=`${effect[0]>0?`Deal ${this.calculateEffect(effect[0],0)} Damage\n`:`\n`}Push 1 Tile\nAdvance`; break
            case 488: string+=`Gain ${effect[0]} Combo\nAdd ${effect[1]} Random\nCombo Card${effect[1]!=1?`s`:``}\nto Your Hand`; break
            case 490: string+=`Hold ${effect[0]} Basic Orb${effect[0]!=1?`s`:``}`; break
            case 491: string+=`Evoke First Orb\n${effect[0]} Time${effect[0]!=1?`s`:``}`; break
            case 492: string+=`Hold ${effect[0]} Shield Orb${effect[0]!=1?`s`:``}`; break
            case 493: string+=`Hold ${effect[0]} Explosive Orb${effect[0]!=1?`s`:``}`; break
            case 494: string+=`Evoke All Orbs`; break
            case 495: string+=`Hold ${effect[0]} Energy Orb${effect[0]!=1?`s`:``}`; break
            case 496: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Vulnerable`; break
            case 497: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nClaw Up ${effect[1]}`; break
            case 498: string+=`Hold ${effect[0]} Basic Orb${effect[0]!=1?`s`:``}\nClaw Up ${effect[1]}`; break
            case 499: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nClaw Up ${effect[1]}`; break
            case 500: string+=`Claw Up ${effect[0]}`; break
            case 501: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nClaw Up ${effect[1]}`; break
            case 502: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nClaw Up ${effect[1]}`; break
            case 503: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nClaw Up ${effect[1]}`; break
            case 504: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nClaw Up ${effect[1]}\nAdvance`; break
            case 505: string+=`Hold ${effect[0]} Dark Orb${effect[0]!=1?`s`:``}`; break
            case 506: string+=`Hold ${effect[0]} Lightning Orb${effect[0]!=1?`s`:``}`; break
            case 507: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal, Gain\n${effect[1]} Energy\nClaw Up ${effect[2]}`; break
            case 508: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHold ${effect[1]} Basic Orb${effect[1]!=1?`s`:``}`; break
            case 509: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHold ${effect[1]} Shield Orb${effect[1]!=1?`s`:``}`; break
            case 510: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number\nof Orbs`; break
            case 511: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]}X Cards\nWhere X = Number\nof Orbs`; break
            case 512: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nHold ${effect[1]} Shield Orb${effect[1]!=1?`s`:``}`; break
            case 513: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nPut a Card in Discard\nPile in Your Hand`; break
            case 514: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nNext Card Played\nReturns to Draw`; break
            case 515: string+=`Add Block Equal\nto Number of Cards\nin Discard ${effect[0]>0?`+${effect[0]}`:``}`; break
            case 516: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Tiles Wide\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 517: string+=`Gain ${effect[0]} Energy\nAdd a Void\nto Discard`; break
            case 518: string+=`Gain ${effect[0]} Energy\nFor Every ${effect[1]} Cards\nin Draw Pile`; break
            case 519: string+=`Gain ${effect[0]} Focus`; break
            case 520: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash Damage\nHold ${effect[1]} Dark Orb${effect[1]!=1?`s`:``}`; break
            case 521: string+=`Double Your Energy`; break
            case 522: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRetain Your Hand`; break
            case 523: string+=`When Power Played,\nDraw ${effect[0]} Card${effect[0]!=1?`s`:``}`; break
            case 524: string+=`Each Turn,\nAdd ${effect[0]} Random Power${effect[0]!=1?`s`:``}\nto Your Hand`; break
            case 525: string+=`Lose ${effect[0]} Focus\nGain ${effect[1]} Strength\nGain ${effect[2]} Dexterity`; break
            case 526: string+=`Hold X Basic Orb${effect[0]!=1?`s`:``}`; break
            case 527: string+=`Add ${effect[0]} Random Power${effect[0]!=1?`s`:``}\nto Your Hand\nIt Costs 0 This Turn`; break
            case 528: string+=`When Power Played\nHold ${effect[0]} Basic Orb${effect[0]!=1?`s`:``}`; break
            case 529: string+=`When Damage Taken\nHold ${effect[0]} Basic Orb${effect[0]!=1?`s`:``}`; break
            case 530: string+=`Each Turn, Add ${effect[0]}\nRandom Common Card${effect[0]!=1?`s`:``}\nto Your Hand`; break
            case 531: string+=`Remove All Orbs\nGain 1 Energy\nand Draw 1\nCard Each`; break
            case 532: string+=`Evoke All Orbs\nGain 1 Energy\nand Draw 1\nCard Each`; break
            case 533: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nLose ${effect[1]} Focus`; break
            case 534: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHold ${effect[1]} Energy Orb${effect[1]!=1?`s`:``}`; break
            case 535: string+=`Evoke First Orb\n${effect[0]}X Time${effect[0]!=1?`s`:``}`; break
            case 536: string+=`Hold ${effect[0]} Shield Orb${effect[0]!=1?`s`:``}\nHold ${effect[1]} Dark Orb${effect[1]!=1?`s`:``}\nHold ${effect[2]} Lightning Orb${effect[2]!=1?`s`:``}`; break
            case 537: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number\nof Orbs Held\nThis Combat`; break
            case 538: string+=`Apply ${effect[0]} Lock-On`; break
            case 539: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Lock-On`; break
            case 540: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nReturn 0 Cost\nCards to Hand`; break
            case 541: string+=`Gain ${effect[0]} Focus\nLose ${effect[1]} Focus\nEvery Turn`; break
            case 542: string+=`Discard Your Hand\nReturn Discard to Draw\nDraw ${effect[0]} Card${effect[0]!=1?`s`:``}`; break
            case 543: string+=`Evoke First Orb\n${effect[0]} Time${effect[0]!=1?`s`:``}\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 544: string+=`Hold ${effect[0]} Shield Orb${effect[0]!=1?`s`:``}\nFor Every Enemy`; break
            case 545: string+=`Evoke First Orb\nFor Every Enemy`; break
            case 546: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nWhere X = Number\nof Shield Orbs\nHeld This Combat`; break
            case 547: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nHold ${effect[1]} Shield Orb${effect[1]!=1?`s`:``}`; break
            case 548: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nMultiply Target's\nVulnerable by ${effect[1]}`; break
            case 549: string+=`Hold ${effect[0]} Random Orb${effect[0]!=1?`s`:``}`; break
            case 550: string+=`Evoke First Orb\n${effect[0]} Time${effect[0]!=1?`s`:``}\nRehold it`; break
            case 551: string+=`Hold ${effect[0]} Light Orb${effect[0]!=1?`s`:``}`; break
            case 552: string+=`Hold ${effect[0]} Flame Orb${effect[0]!=1?`s`:``}`; break
            case 553: string+=`Hold ${effect[0]} Ice Orb${effect[0]!=1?`s`:``}`; break
            case 554: string+=`Hold ${effect[0]} Buff Orb${effect[0]!=1?`s`:``}`; break
            case 555: string+=`Hold ${effect[0]} Cop${effect[0]!=1?`ies`:`y`}\nof the Last Orb`; break
            case 556: string+=`Evoke First Orb\n${effect[0]} Time${effect[0]!=1?`s`:``}\nRehold it ${effect[1]} Time${effect[1]!=1?`s`:``}`; break
            case 557: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Times\nHold ${effect[1]} Lightning Orb${effect[1]!=1?`s`:``}`; break
            case 558: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHold ${effect[1]} Light Orb${effect[1]!=1?`s`:``}`; break
            case 559: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHold ${effect[1]} Flame Orb${effect[1]!=1?`s`:``}`; break
            case 560: string+=`Hold ${effect[0]} Flame Orb${effect[0]!=1?`s`:``}\nHold ${effect[1]} Energy Orb${effect[1]!=1?`s`:``}\nHold ${effect[2]} Ice Orb${effect[2]!=1?`s`:``}`; break
            case 561: string+=`Replace Basic Orbs\nWith Explosive Orbs`; break
            case 562: string+=`Replace Basic Orbs\nWith Dark Orbs`; break
            case 563: string+=`Replace Basic Orbs\nWith Light Orbs`; break
            case 564: string+=`Hold ${effect[0]} Basic Orb${effect[0]!=1?`s`:``}\nAnd Evoke 1`; break
            case 565: string+=`Minor Evoke\nAll Orbs`; break
            case 566: string+=`Alternate Evoke\nAll Shield Orbs`; break
            case 567: string+=`Alternate Evoke\nAll Explosive Orbs`; break
            case 568: string+=`Alternate Evoke\nAll Buff Orbs`; break
            case 569: string+=`Swap With an\nAdjacent Target\nTarget Will Face User\nEvoke All Orbs\non Target`; break
            case 570: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nHold ${effect[1]} Basic Orb${effect[1]!=1?`s`:``}`; break
            case 571: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nHold ${effect[1]} Explosive Orb${effect[1]!=1?`s`:``}`; break
            case 572: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nOrthoganally or\n${effect[1]} Tile${effect[1]!=1?`s`:``}\nDiagonally`; break
            case 573: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nAdd 1 Step\nNext Turn`; break
            case 574: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nEvoke First Orb\non Self ${effect[1]} Time${effect[1]!=1?`s`:``}`; break
            case 575: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nRemove All Orbs`; break
            case 576: string+=`Push 1 Tile\nin All Directions\nHold ${effect[0]} Ice Orb${effect[0]!=1?`s`:``}`; break
            case 577: string+=`Hold ${effect[0]} Nerf Orb${effect[0]!=1?`s`:``}`; break
            case 578: string+=`Hold ${effect[0]} Poison Orb${effect[0]!=1?`s`:``}`; break
            case 579: string+=`Alternate Evoke\nAll Nerf Orbs`; break
            case 580: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHold ${effect[1]} Buff Orb${effect[1]!=1?`s`:``}`; break
            case 581: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nHold ${effect[1]} Nerf Orb${effect[1]!=1?`s`:``}`; break
            case 582: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal,\nHold ${effect[1]} Poison Orb${effect[1]!=1?`s`:``}`; break
            case 583: string+=`Hold ${effect[0]} Buff Orb${effect[0]!=1?`s`:``}\nHold ${effect[1]} Poison Orb${effect[1]!=1?`s`:``}\nHold ${effect[2]} Light Orb${effect[2]!=1?`s`:``}`; break
            case 584: string+=`Hold ${effect[0]} Lightning Orb${effect[0]!=1?`s`:``}\nAdd ${this.calculateEffect(effect[1],3)} Block\nWhere X = Number\nOf Lightning Orbs`; break
            case 585: string+=`Build a Wall`; break
            case 586: string+=`Gain ${effect[0]} Metal`; break
            case 587: string+=`Destroy a Construct\nMay Exhuast When a\nConstruct is Destroyed`; break
            case 588: string+=`Heal ${effect[0]} Health\nto Construct`; break
            case 589: string+=`Add ${effect[0]} Block\nto Construct`; break
            case 591: string+=`Deal ${this.calculateEffect(effect[0],0)}-${this.calculateEffect(effect[1],2)} Damage\nWhere X = (Range-1)`; break
            case 592: string+=`Remove All\nEnemy Strength\nApply ${effect[0]} Weak`; break
            case 593: string+=`Deal ${this.calculateEffect(effect[0],0)}-${this.calculateEffect(effect[1],2)} Damage\nWhere X = (Range-1)\nIf Fatal, Gain\n${effect[2]} Energy`; break
            case 595: string+=`Exhaust All Blueprints,\nGain 1 Energy Each`; break
            case 596: string+=`Construct Gains\n${effect[0]} Max Health`; break
            case 597: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Jagged Bleed`; break
            case 598: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Jagged Bleed\n3 Times`; break
            case 599: string+=`Apply ${effect[0]} Jagged Bleed`; break
            case 600: string+=`Deal Splash Damage\nEqual to Target\nConstruct Health`; break
            case 601: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nUpgrade ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 602: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nUpgrade ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 603: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nUpgrade ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 604: string+=`Construct Gains\n${effect[0]} Regeneration`; break
            case 605: string+=`Add ${effect[0]} Random\nBlueprint${effect[0]!=1?`s`:``}\nto Your Hand`; break
            case 606: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Blocked,\nApply ${effect[1]} Vulnerable`; break
            case 607: string+=`Draw and Upgrade\n${effect[0]} Card${effect[0]!=1?`s`:``}`; break
            case 608: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nBecome Confused`; break
            case 609: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRemove ${effect[1]}\nTemporary Strength`; break
            case 610: string+=`Construct Gains\n${effect[0]} Armor`; break
            case 611: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTo All Targets`; break
            case 612: string+=`Discard and\nUpgrade Your Hand\nDraw ${effect[0]} Card${effect[0]!=1?`s`:``}`; break
            case 613: string+=`Add ${effect[0]} Random Card${effect[0]!=1?`s`:``}\nto Your Hand\nSkewed Odds`; break
            case 614: string+=`Add ${effect[0]} Random Defense${effect[0]!=1?`s`:``}\nto Your Hand\nSkewed Odds`; break
            case 615: string+=`Add ${effect[0]} Random Blueprint${effect[0]!=1?`s`:``}\nto Your Hand\nSkewed Odds`; break
            case 616: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage 2 Times\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 617: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage 2 Times\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}\nTarget Will Face\nAway and Attack`; break
            case 618: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage 2 Times\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}\nApply ${effect[2]} Frail`; break
            case 619: string+=`Gain ${effect[0]} Metal\nIncreases by ${effect[1]}`; break
            case 620: string+=`Build a Spike Pillar`; break
            case 621: string+=`Build a Projector`; break
            case 622: string+=`Build a Turret`; break
            case 623: string+=`Build a Readout`; break
            case 624: string+=`Build a Strengthener`; break
            case 625: string+=`Gain ${effect[0]} Metal\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 626: string+=`Build an Explosive Turret`; break
            case 627: string+=`Build a Multiturret`; break
            case 628: string+=`Build a Barbed Pillar`; break
            case 629: string+=`Build a Gun Rack`; break
            case 630: string+=`Build a Repulse Turret`; break
            case 631: string+=`Build a Machine Gun`; break
            case 632: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTarget Takes Double\nDamage Next Hit`; break
            case 633: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTarget Takes Double\nDamage Next Hit\nAdd a 1-Shooter\nto Draw`; break
            case 634: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals ${this.calculateEffect(effect[1],10)} More Damage\nFrom Directly Behind`; break
            case 635: string+=`Gain ${effect[0]} Dodge\nAdd ${this.calculateEffect(effect[1],1)} Block\nNext Turn`; break
            case 636: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Dodge\nNext Turn`; break
            case 637: string+=`Gain ${effect[0]} Currency`; break
            case 638: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTransform ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 639: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals ${effect[1]} Times\nMore Damage If\nTarget Has Block`; break
            case 640: string+=`Draw Cards Equal\nto Hand Size${effect[0]>0?`+${effect[0]}`:``}`; break
            case 641: string+=`Add to Hand:\nRiot Shield\nPepper Spray\nShock Baton\nUpgrade 2\nat Random`; break
            case 642: string+=`Add to Hand:\nFlamethrower\nImpact Grenade\nLandmine\nUpgrade 2\nat Random`; break
            case 643: string+=`Add to Hand:\nSubmachine\nAntitank Rocket\nAmmo Box\nUpgrade 2\nat Random`; break
            case 644: string+=`Gain ${effect[0]} Combo\nGain ${effect[1]} Energy\nNext Turn\nGain ${effect[2]} Combo\nNext Turn`; break
            case 645: string+=`Gain ${effect[0]} Energy\nNext Turn\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}\nNext Turn`; break
            case 646: string+=`Each Hit Gains\n${effect[0]} More Combo\nGain ${effect[1]} Combo`; break
            case 647: string+=`Gain ${effect[0]} Combo\nWhen You Gain Block\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 648: string+=`Gain ${effect[0]} Combo\nPer Turn\nGain ${effect[1]} Combo`; break
            case 649: string+=`Gain Strength\nPer ${effect[0]} Combo\nEnd Combo\nGain ${effect[1]} Combo`; break
            case 650: string+=`Swap With an\nAdjacent Target\nor\nMove ${effect[0]} Tiles`; break
            case 651: string+=`Advance up to ${effect[0]} Tile${effect[0]!=1?`s`:``}\nToward an Enemy\nor\nMove ${effect[1]} Tile${effect[1]!=1?`s`:``}`; break
            case 652: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPush 1 Tile\nin All Directions`; break
            case 653: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPush 1 Tile Left\nin All Directions`; break
            case 654: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPush 1 Tile Right\nin All Directions`; break
            case 655: string+=`Remove ${effect[0]} Fatigue${effect[0]!=1?`s`:``}\nAll Fatigues\nAre Ethereal`; break
            case 656: string+=`Remove ${effect[0]} Fatigue${effect[0]!=1?`s`:``}\nMove All Fatigues\nto Your Hand`; break
            case 657: string+=`Advance up to ${effect[0]} Tile${effect[0]!=1?`s`:``}\nToward an Enemy\nEnds 2 Tiles Away\nor\nMove ${effect[1]} Tile${effect[1]!=1?`s`:``}`; break
            case 658: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPush 2 Tiles\nin All Directions`; break
            case 659: string+=`Gain ${effect[0]}X+${effect[1]} Max HP`; break
            case 660: string+=`Move to Any\nEmpty Plant Tile\nor Create One`; break
            case 661: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double Damage\nif Target Has Bleed\nApply ${effect[1]} Bleed`; break
            case 663: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nAdd ${effect[1]} Dodge\nAdd ${this.calculateEffect(effect[2],1)} Block`; break
            case 664: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nLose All Block\nExcept ${effect[1]}`; break
            case 665: string+=`End Your Turn\nGain X${effect[0]!=0?`+${effect[0]}`:``} Energy\nAnd $n{effect[1]} Temporary Strength\nNext Turn`; break
            case 666: string+=`Move to Scythe\nUp to ${effect[0]} Tile${effect[0]!=1?`s`:``} Away\nor\nMove ${effect[1]} Tile${effect[1]!=1?`s`:``}`; break
            case 667: string+=`Apply ${effect[0]}\nRandom Debuff\nApply ${effect[1]}\nRandom Debuff`; break
            case 668: string+=`When Damage Taken,\nAdd ${effect[0]} Shiv${effect[0]!=1?`s`:``}\nto Your Hand\nAdd ${effect[1]} Shivs\nto Your Hand`; break
            case 669: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]}\nRandom Debuff\nApply ${effect[2]}\nRandom Debuff`; break
            case 670: string+=`Add ${effect[0]}X+${effect[1]} Shivs\nto Your Hand`; break
            case 671: string+=`Hold X Basic Orb${effect[0]!=1?`s`:``}+${effect[1]}`; break
            case 672: string+=`Evoke First Orb\n${effect[0]}X+${effect[1]} Time${effect[0]!=1?`s`:``}}`; break
            case 673: string+=`Hold ${effect[0]} Basic Orb${effect[0]!=1?`s`:``}\nAnd Evoke 1`; break
            case 674: string+=`Move to Any Tile\nSwap With its\nOccupants`; break
            case 675: string+=`Add ${effect[0]}X+${effect[1]} Random\nColorless Cards\nto Your Hand`; break
            case 676: string+=`Destroy a Construct\nMay Exhuast When a\nConstruct is Destroyed\nReturn ${effect[0]} Metal`; break
            case 677: string+=`Heal All Health\nto Construct`; break
            case 678: string+=`Construct Takes\nExtra Turn`; break
            case 679: string+=`Construct Gains\n${effect[0]} Ethereal`; break
            case 680: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nExhaust ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 681: string+=`Transform ${effect[0]} Card${effect[0]!=1?`s`:``}`; break
            case 682: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nTransform ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 683: string+=`Destroy a Construct\nReturn Used Metal`; break
            case 684: string+=`Gain ${effect[0]} Metal\nGain ${effect[1]} Less Per\nBuilt Construct`; break
            case 685: string+=`Build a Miniturret`; break
            case 686: string+=`Build a Metal Box`; break
            case 687: string+=`Build an Upgrader`; break
            case 688: string+=`Build a Transformer`; break
            case 689: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Metal`; break
            case 690: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nGain ${effect[1]} Metal`; break
            case 691: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nConstructs Attack Target`; break
            case 692: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal, Gain\n${effect[1]} Metal`; break
            case 693: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nUpward or Horizontally`; break
            case 694: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nDownward or Horizontally`; break
            case 695: string+=`Build a Doubler`; break
            case 696: string+=`Build an Exhauster`; break
            case 697: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nTarget Moves in\na Random Direction`; break
            case 698: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nDiscard ${effect[1]}\nRandom Card`; break
            case 699: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Metal`; break
            case 700: string+=`Build a Teleporter Start`; break
            case 701: string+=`Build a Teleporter End`; break
            case 702: string+=`Add a Proxy\nTeleport to Hand\nDestroys Teleporter Used`; break
            case 703: string+=`Teleport to Teleporter\nDestroys Teleporter Used`; break
            case 704: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nReturn ${effect[1]} Gun${effect[1]!=1?`s`:``}\nFrom Discard to Hand`; break
            case 705: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nRemove Effects on\nTarget Tile`; break
            case 706: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nUpgrade ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 707: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nor Diagonally Vertically`; break
            case 708: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nor Diagonally Top\nRight or Bottom Left`; break
            case 709: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nor Diagonally Top\nLeft or Bottom Right`; break
            case 710: string+=`Destroy a Construct\nReturn Blueprint`; break
            case 711: string+=`Gain ${effect[0]} Metal\nGain ${effect[1]} Buffer`; break
            case 712: string+=`Gain Metal Equal\nto the Cost of the\nMost Expensive Blueprint\nin Your Hand${effect[0]>0?`+${effect[0]}`:``}\nMinimum 1`; break
            case 713: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nGain ${effect[1]} Metal`; break
            case 714: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nNext ${effect[1]} Card${effect[1]!=1?`s`:``}\nPlayed ${effect[1]!=1?`are`:`is`} Duplicated`; break
            case 715: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nSwap Attack Intents`; break
            case 716: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nSwap Defense Intents`; break
            case 717: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nAdd ${effect[1]} Random\nBlueprint${effect[1]!=1?`s`:``} to Hand`; break
            case 718: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number of\nDestroyed Constructs+1`; break
            case 719: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nApply ${effect[1]}X Weak\nApply ${effect[2]}X Vulnerable`; break
            case 720: string+=`Apply ${effect[0]} Weak Next Turn`; break
            case 721: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEnter Wrath`; break
            case 722: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nEnter Calm`; break
            case 723: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nEnter Haste`; break
            case 724: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nEnter Sturdy`; break
            case 725: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nExit Stance`; break
            case 726: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nExit Stance`; break
            case 727: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``} or\n${effect[1]} Tile${effect[1]!=1?`s`:``} Toward an Enemy`; break
            case 728: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nExit Stance`; break
            case 730: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Attack,\nEnter Wrath`; break
            case 731: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Attack,\nEnter Calm`; break
            case 732: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Attack,\nEnter Haste`; break
            case 733: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Target Will Attack,\nEnter Sturdy`; break
            case 734: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number\nof Enemies`; break
            case 735: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nShuffle an Insight\ninto Draw Pile`; break
            case 736: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nReturn on Stance Change`; break
            case 737: string+=`Add ${effect[0]} Smite\nto Your Hand\nEvery Turn`; break
            case 738: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdds ${effect[1]} Times More\nWhen in Wrath`; break
            case 739: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions\nEnd Turn`; break
            case 740: string+=`Enter Wrath`; break
            case 741: string+=`Enter Calm`; break
            case 742: string+=`Enter Haste`; break
            case 743: string+=`Enter Strudy`; break
            case 744: string+=`Gain ${effect[0]} Faith`; break
            case 745: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd a Safety\nto Hand`; break
            case 746: string+=`Wrath: Apply ${effect[0]} Weak\nElse: Enter Wrath`; break
            case 747: string+=`Calm: Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nElse: Enter Calm`; break
            case 748: string+=`Put a\nDiscarded Card\ninto Your Hand\nEnter Calm\nEnd Turn`; break
            case 749: string+=`Put a\nDiscarded Card\ninto Your Hand\nEnter Calm\nEnd Turn\nGain ${effect[0]} Energy Next Turn`; break
            case 750: string+=`Haste: Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nElse: Enter Haste`; break
            case 751: string+=`Sturdy: Apply ${effect[0]} Frail\nand Gain ${effect[1]} Dexterity\nElse: Enter Sturdy`; break
            case 752: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nNext Turn\nEnter Sturdy\nEnd Turn`; break
            case 753: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nNext Turn\nEnter Sturdy\nEnd Turn\nGain ${effect[1]} Energy Next Turn`; break
            case 754: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nWhen You Change Stance`; break
            case 755: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nWhen You Change Stance`; break
            case 756: string+=`Gain ${effect[0]} Faith\nShuffle an Insight\ninto Draw Pile`; break
            case 757: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 1 Less\nWhen Retained`; break
            case 758: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain Block Equal to\nTarget's Health Lost`; break
            case 759: string+=`Gain ${effect[0]} Faith\nGain ${effect[1]} Strength`; break
            case 760: string+=`Next Attack Deals\n${effect[0]} More Damage`; break
            case 761: string+=`Gain ${effect[0]} Faith\nLose ${effect[1]} Health\nNext Turn`; break
            case 762: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times\nEnter Wrath`; break
            case 763: string+=`Gain ${effect[0]} Dodge\nEnter Calm`; break
            case 764: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPush 1 Tile\nEnter Haste`; break
            case 765: string+=`Gain ${effect[0]} Armor\nEnter Sturdy`; break
            case 766: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],12)}\nDamage`; break
            case 767: string+=`Add ${effect[0]} Miracle${effect[0]!=1?`s`:``}\nto Hand`; break
            case 768: string+=`Gain ${effect[0]} Faith\nPer Turn`; break
            case 769: string+=`Add Block Equal to\nNumber of Cards in\nYour Deck${this.player>=0&&this.player<this.battle.players?` (${this.battle.cardManagers[this.player].deck.cards.length})`:``}`; break
            case 770: string+=`Gain ${effect[0]} Faith\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 771: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd a Smite\nto Hand`; break
            case 772: string+=`Add a Miracle to Your\nHand For X Turns\nGain ${effect[0]} Energy`; break
            case 773: string+=`Add a Miracle+ to Your\nHand For X Turns\nGain ${effect[0]} Energy`; break
            case 774: string+=`Gain ${effect[0]} Strength\nGain ${effect[1]} Dexterity\nLose ${effect[2]} Energy\nPer Turn`; break
            case 775: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIncreases by ${effect[1]}\nWhen Retained`; break
            case 776: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nIncreases by ${effect[1]}\nWhen Retained`; break
            case 777: string+=`Choose Between 3\nAttacks to Add\nto Your Hand`; break
            case 778: string+=`Choose Between 3\nAttacks to Add\nto Your Hand\nIt Costs 0`; break
            case 779: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nShuffle a End Up\ninto Draw`; break
            case 780: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf You Have\nNo Other Attacks\nin Hand`; break
            case 781: string+=`Next Turn,\nDraw ${effect[0]} Card${effect[0]!=1?`s`:``}\nand Enter Wrath`; break
            case 782: string+=`Shuffle ${effect[0]} Insight${effect[0]!=1?`s`:``}\ninto Draw Per Turn`; break
            case 783: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nNext Attack is Free`; break
            case 784: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nWhen Target is Hit,\nAttacker Gains ${effect[1]} Block`; break
            case 785: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash\nDamage ${effect[1]} Times`; break
            case 786: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal, Upgrade\na Card Permanently`; break
            case 787: string+=`If Target Has\nLess Than ${effect[0]} Health\nIt Dies`; break
            case 788: string+=`Gain ${effect[0]} Energy\nPer Turn Per Turn`; break
            case 789: string+=`When Any Card is\nRetained, Its Cost is\nReduced By ${effect[0]}`; break
            case 790: string+=`Shuffle a Beta\ninto Draw Pile`; break
            case 791: string+=`Shuffle an Omega\ninto Draw Pile`; break
            case 792: string+=`Shuffle an Expunger\nWith X${effect[0]>0?`+${effect[1]}`:``} into Draw Pile`; break
            case 793: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n${effect[1]} Times`; break
            case 794: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nYou Cannot Die\nThis Turn`; break
            case 795: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf You Have\nStatuses or Curses\nin Hand`; break
            case 796: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf You Do Not Have\nStatuses or Curses\nin Hand`; break
            case 797: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nIt Costs 0 This Turn\nIf First Card\nPlayed This Turn,\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 798: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf First Card\nPlayed This Turn,\nApply ${effect[1]} Vulnerable`; break
            case 799: string+=`If Turn 3 Or Later,\nGain ${effect[0]} Energy\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 800: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdds ${effect[1]} Times More\nWhen in Calm`; break
            case 801: string+=`Target Loses Health\nEqual to Your\nMissing Health`; break
            case 802: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nEnter Wrath`; break
            case 803: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nEnter Calm`; break
            case 804: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nEnter Haste`; break
            case 805: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nEnter Sturdy`; break
            case 806: string+=`Wrath: Deal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 807: string+=`Calm: Gain ${effect[0]} Energy`; break
            case 808: string+=`Haste: Move ${effect[0]} Tile${effect[0]!=1?`s`:``}`; break
            case 809: string+=`Sturdy: Add ${this.calculateEffect(effect[0],1)} Block`; break
            case 810: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nNext ${effect[1]} Block${effect[1]!=1?`s`:``} Add\nis Tripled`; break
            case 811: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nNext ${effect[1]} Damage${effect[1]!=1?`s`:``} Deal\nAdd Equivalent Block`; break
            case 812: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nExit Stance`; break
            case 813: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nin Triangles Vertically`; break
            case 814: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nin Triangles Top\nRight or Bottom Left`; break
            case 815: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nin Triangles Top\nLeft or Bottom Right`; break
            case 816: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nGain ${effect[1]} Faith`; break
            case 817: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nCosts 0 at\nLeft of Hand`; break
            case 818: string+=`Calm: Add to Hand:\nCrescendo\nForward\nStandstill`; break
            case 819: string+=`Calm: Add to Hand:\nCrescendo+\nForward+\nStandstill+`; break
            case 820: string+=`Wrath: Gain ${effect[0]} Energy`; break
            case 821: string+=`Haste: Gain ${effect[0]} Energy`; break
            case 822: string+=`Sturdy: Gain ${effect[0]} Energy`; break
            case 823: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nMay Pass Obstructions\nEnter Haste`; break
            case 824: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPlayable in Haste`; break
            case 825: string+=`Push 1 Tile\nSturdy: Deal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 826: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Faith`; break
            case 827: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nFatigues in\nHand Gain Quickdraw`; break
            case 828: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Max HP`; break
            case 829: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}\nand Retain it`; break
            case 830: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nShuffle a Restrike\ninto Discard Pile`; break
            case 831: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAmplify:\nAdd ${this.calculateEffect(effect[1],1)} Block\nNext Turn`; break
            case 832: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nAmplify:\nDraw ${effect[1]} More`; break
            case 833: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAmplify:\nDeal Triple Damage`; break
            case 834: string+=`Deal ${this.calculateEffect(effect[0],4)} Damage\nWhere X = Charge`; break
            case 835: string+=`Exhuast Half of\nYour Discard Pile\nGain 1 Energy For\nEvery ${effect[0]} Cards Exhausted`; break
            case 836: string+=`Add ${effect[0]} Cop${effect[0]!=1?`ies`:`y`} of\nthe Last Attack\nto Your Hand`; break
            case 837: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeal ${this.calculateEffect(effect[1],4)} More For\nEvery Burn in Hand\nAmplify:\nDeal Double Damage`; break
            case 838: string+=`When You Add Block,\nAdd ${effect[0]} Spark${effect[0]!=1?`s`:``} to Hand`; break
            case 839: string+=`When You Add Block,\nAdd ${effect[0]} Spark${effect[0]!=1?`s`:``}+ to Hand`; break
            case 840: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Possible:\nSpend ${effect[1]} Charge Up\nGain ${effect[2]} Energy\nDraw ${effect[3]} Card${effect[3]!=1?`s`:``}`; break
            case 841: string+=`Gain ${effect[0]} Charge`; break
            case 842: string+=`Gain ${effect[0]} Charge\nAmplify:\nGain ${effect[1]} More`; break
            case 843: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nFor Every ${effect[1]}\nRelics You Have`; break
            case 844: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals Double When\nDiscard Pile is Empty`; break
            case 845: string+=`Add ${effect[0]} Dark Matter${effect[0]!=1?`s`:``}\nto Draw Pile\nWhen Etherealed,\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 846: string+=`Exhaust the Top ${effect[0]}\nCard${effect[0]!=1?`s`:``} of Your Draw Pile\nDeal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number\nof Attacks Exhausted`; break
            case 847: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nRemove ${effect[1]} Strength\nto a Random Enemy\nAmplify:\nRepeat`; break
            case 848: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd a Spark to Hand`; break
            case 849: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd a Spark+ to Hand`; break
            case 850: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],4)}X\nDamage\nWhere X = Number\nof Cards in\nExhaust Pile`; break
            case 851: string+=`Heal ${this.calculateEffect(effect[0],4)} Health\nAmplify:\nReturn ${effect[1]} Random Card${effect[1]!=1?`s`:``}\nto Your Hand\nFrom Discard Pile`; break
            case 852: string+=`Gain ${effect[0]} Charge\nPer Turn`; break
            case 853: string+=`Add ${this.calculateEffect(1,3)} Block\nWhere X = Charge${effect[0]>0?`+${effect[0]}`:``}`; break
            case 854: string+=`Draw ${effect[0]} More\nCard${effect[0]!=1?`s`:``} Per Turn\n${effect[1]} Balance`; break
            case 855: string+=`When You Amplify,\nPut a Card in Discard\nPile in Your Hand`; break
            case 856: string+=`Deal ${this.calculateEffect(effect[0],0)} Splash\nAmplify 2:\nInstantly Kill Those\nWith ${effect[1]} or Less Health`; break
            case 857: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 1 Less\nWhen Spark Played`; break
            case 858: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Charge`; break
            case 859: string+=`Add to Hand:\nInstant Wrath\nInstant Calm`; break
            case 860: string+=`Add to Hand:\nInstant Haste\nInstant Sturdy`; break
            case 861: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nAdd a Burn\nto Your Hand`; break
            case 862: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCosts 0 When\na Card is Amplified`; break
            case 863: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain 1 Energy \nPer ${effect[1]} Card${effect[1]!=1?`s`:``}\nin Your Deck`; break
            case 864: string+=`Add ${effect[0]} Random Card${effect[0]!=1?`s`:``}\nto Your Hand\nSkewed Odds\nPlace a Card\non Top of Your\nDraw Pile`; break
            case 865: string+=`Deal ${this.calculateEffect(1,2)}${effect[0]!=0?`+${this.calculateEffect(effect[0],10)}`:``} Damage\nWhere X = Number\nof Cards in Hand\nAmplify:\nDeal ${this.calculateEffect(effect[1],2)} Damage\nWhere X = Current Energy`; break
            case 866: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n${effect[1]} Time${effect[1]!=1?`s`:``}`; break
            case 867: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nRemove a\nRandom Debuff`; break
            case 868: string+=`Put a Card in Draw\nPile in Your Hand\nUpgrade It`; break
            case 869: string+=`Gain ${effect[0]} Energy\nExhaust ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 870: string+=`Add X Random\nAttacks to Your Hand\nThey Cost 0\nand Exhaust`; break
            case 871: string+=`Add X Random Upgraded\nAttacks to Your Hand\nThey Cost 0\nand Exhaust`; break
            case 872: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAmplify: Deal ${this.calculateEffect(effect[1],10)} More`; break







            /*
            case 1: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 2: string+=`Add ${this.calculateEffect(effect[0],1)} Block`; break
            case 3: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}`; break
            case 8: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}`; break
            case 10: string+=`Heal ${this.calculateEffect(effect[0],4)} Health`; break
            case 23: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]}`; break
            case 64: string+=`Gain ${effect[0]} Control`; break
            case 490: string+=c`Hold ${effect[0]} Basic Orb${effect[0]!=1?`s`:``}`; break
            case 366: string+=``; break
            case 491: string+=`Evoke First Orb\n${effect[0]} Time${effect[0]!=1?`s`:``}`; break
            */
        }
        if(string[string.length-1]=='\n'){
            string=string.substring(0,string.length-1)
        }
        if(this.target[0]==2||this.target[0]==17||this.target[0]==22||this.target[0]==26||this.target[0]==29||this.target[0]==30){
            string+='\nRange '+this.target[1]+'-'+this.target[2]
        }
        if(spec.includes(0)){
            string+='\nFatigue'
        }
        if(spec.includes(16)){
            string+='\n2 Fatigue'
        }
        if(spec.includes(14)){
            string+='\n3 Fatigue'
        }
        if(spec.includes(18)){
            string+='\n4 Fatigue'
        }
        if(spec.includes(19)){
            string+='\nHeavy Fatigue'
        }
        if(spec.includes(17)){
            string+='\nX Fatigue'
        }
        if(spec.includes(2)){
            string+='\nRetain'
        }
        if(spec.includes(1)){
            string+='\nExhaust'
        }
        if(spec.includes(15)){
            string+=`\nVanishing ${this.limit}`
        }
        if(spec.includes(4)){
            string+='\nEthereal'
        }
        if(spec.includes(20)){
            string+='\nClaw'
        }
        if(spec.includes(25)){
            string+='\nGun'
        }
        if(spec.includes(22)){
            string+='\nQuickdraw'
        }
        if(spec.includes(24)){
            string+='\nQuickdraw 2'
        }
        if(spec.includes(23)){
            string+='\nHolding 1'
        }
        if(spec.includes(26)){
            string+='\nAmalgum'
        }
        if(string[0]=='\n'){
            string=string.substring(1,string.length)
        }
        return string
    }
    callDiscardEffect(){
        switch(this.attack){
            case -1:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Weak',[0])
            break
            case -2:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].statusEffect('Frail',this.effect[0])
            break
            case -4:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].takeDamage(this.effect[0],-1)
            break
            case -7:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].takeDamage(this.effect[0]*(this.battle.cardManagers[this.player].hand.cards.length-1),-1)
            break
            case 187:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].takeDamage(this.effect[1],-1)
            break
        }
    }
    callSpecDiscardEffect(){
        switch(this.attack){
            case 257:
                this.battle.cardManagers[this.player].draw(this.effect[0])
            break
            case 258:
                this.battle.energy.main[this.player]+=this.effect[0]
            break
        }
    }
    callExhaustEffect(){
        switch(this.attack){
            case 202:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].combo+=this.effect[1]
            break
            case 303:
                this.battle.energy.main[this.id]+=this.effect[1]
            break
        }
    }
    otherDiscard(){
        switch(this.attack){
            case 263:
                this.cost=0
            break
            case 290:
                if(this.cost>0){
                    this.cost--
                }
            break
        }
    }
    taken(){
        switch(this.attack){
            case 266:
                this.base.cost++
                this.cost++
            break
            case 282:
                if(this.base.cost>0){
                    this.base.cost--
                }
                if(this.cost>0){
                    this.cost--
                }
            break
        }
    }
    played(){
        switch(this.attack){
            case 107: case 255:
                this.effect[0]=max(this.effect[0]-this.effect[1],0)
            break
            case 108:
                this.cost=max(this.cost-1)
                this.base.cost=max(this.base.cost-1)
            break
            case 118: case 619:
                this.effect[0]+=this.effect[1]
            break
        }
        this.battle.attackManager.level=this.level
        this.battle.attackManager.color=this.color
    }
    anotherPlayed(cardClass,name){
        if(this.spec.includes(9)){
            this.deSize=true
        }
        switch(this.attack){
            case -5:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].takeDamage(this.effect[0],-1)
            break
            case -9:
                if(this.battle.counter.turnPlayed[0]+1>=this.effect[0]){
                    this.battle.cardManagers[this.player].allEffect(2,2)
                }
            break
            case 52: case 220: case 594:
                this.deSize=true
            break
            case 56:
                if(this.cost>=0){
                    this.cost++
                }
            break
            case 414: case 416:
                if(cardClass==1&&this.cost>0){
                    this.cost--
                    this.base.cost--
                }
            break
            case 415:
                if(cardClass==2&&this.cost>0){
                    this.cost--
                    this.base.cost--
                }
            break
            case 857:
                if(name=='Spark'&&this.cost>0){
                    this.cost--
                    this.base.cost--
                }
            break
            
        }
    }
    anotherAmplified(){
        switch(this.attack){
            case 862:
                if(this.cost>0){
                    this.cost=0
                }
            break
        }
    }
    playable(){
        return !this.spec.includes(5)||this.battle.relicManager.hasRelic(11,this.player)
    }
    etherealed(){
        switch(this.attack){
            case 151:
                this.battle.cardManagers[this.player].hand.add(findName('Operational\nDefend',types.card),this.level,this.color)
            break
            case 152:
                this.battle.cardManagers[this.player].hand.add(findName('Operational\nStrike',types.card),this.level,this.color)
            break
            case 845:
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(this.effect[1])
            break
        }
    }
    retained(){
        switch(this.attack){
            case 757:
                if(this.cost>0){
                    this.cost--
                    this.base.cost--
                }
            break
            case 775: case 776:
                this.effect[0]+=this.effect[1]
            break
        }
        if(this.cost>0){
            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
            if(userCombatant.status.main[findList('Retain Cost Reduce',userCombatant.status.name)]>0){
                this.cost=max(0,this.cost-userCombatant.status.main[findList('Retain Cost Reduce',userCombatant.status.name)])
            }
        }
    }
    display(){
        if(this.size>0&&this.fade>0){
            this.layer.push()
            this.layer.translate(this.position.x,this.position.y)
            this.layer.scale(this.size)
            this.layer.fill(this.colorDetail.active[0],this.colorDetail.active[1],this.colorDetail.active[2],this.fade*this.anim.select)
            this.layer.noStroke()
            this.layer.rect(0,0,this.width+15,this.height+15,10)
            this.layer.fill(this.colorDetail.fill[0],this.colorDetail.fill[1],this.colorDetail.fill[2],this.fade)
            this.layer.stroke(this.colorDetail.stroke[0],this.colorDetail.stroke[1],this.colorDetail.stroke[2],this.fade)
            this.layer.strokeWeight(5)
            this.layer.rect(0,0,this.width,this.height,5)
            this.layer.strokeWeight(3)
            switch(this.rarity){
                case -1:
                    this.layer.ellipse(-this.width/2+7.5,this.height/2-7.5,10,10)
                break
                case -2:
                    this.layer.line(-this.width/2+7.5,this.height/2,-this.width/2+7.5,this.height/2-10)
                break
                case -3:
                    this.layer.line(-this.width/2+1,this.height/2-12,-this.width/2+12,this.height/2-12)
                    this.layer.line(-this.width/2+12,this.height/2-1,-this.width/2+12,this.height/2-12)
                    this.layer.strokeWeight(2)
                    this.layer.line(-this.width/2+1,this.height/2-12,-this.width/2+12,this.height/2-1)
                    this.layer.line(-this.width/2+1,this.height/2-1,-this.width/2+12,this.height/2-12)
                break
                case 0:
                    this.layer.line(-this.width/2,this.height/2-10,-this.width/2+10,this.height/2-10)
                    this.layer.line(-this.width/2+10,this.height/2,-this.width/2+10,this.height/2-10)
                break
                case 1:
                    this.layer.line(-this.width/2,this.height/2-15,-this.width/2+15,this.height/2)
                break
                case 2:
                    this.layer.line(-this.width/2,this.height/2-5,-this.width/2+15,this.height/2-15)
                    this.layer.line(-this.width/2+5,this.height/2,-this.width/2+15,this.height/2-15)
                break
            }
            if(this.spec.includes(12)){
                this.layer.line(-this.width/2,10,this.width/2,10)
            }
            if(this.spec.includes(13)){
                this.layer.noStroke()
                this.layer.fill(mergeColor([0,0,0],this.colorDetail.text,this.level/max(1,this.levels-1))[0],mergeColor([0,0,0],this.colorDetail.text,this.level/max(1,this.levels-1))[1],mergeColor([0,0,0],this.colorDetail.text,this.level/max(1,this.levels-1))[2],this.fade)
                this.layer.textSize(24)
                this.layer.text('???',0,0)
            }else if(this.spec.includes(8)){
                this.layer.noStroke()
                this.layer.fill(mergeColor([0,0,0],this.colorDetail.text,this.level/max(1,this.levels-1))[0],mergeColor([0,0,0],this.colorDetail.text,this.level/max(1,this.levels-1))[1],mergeColor([0,0,0],this.colorDetail.text,this.level/max(1,this.levels-1))[2],this.fade)
                this.layer.textSize(16)
                if(this.spec.includes(10)){
                    this.layer.text('Slimed',0,-12)
                    this.layer.text('Smoked',0,12)
                }else{
                    this.layer.text('Slimed',0,0)
                }
            }else if(this.spec.includes(10)){
                this.layer.noStroke()
                this.layer.fill(mergeColor([0,0,0],this.colorDetail.text,this.level/max(1,this.levels-1))[0],mergeColor([0,0,0],this.colorDetail.text,this.level/max(1,this.levels-1))[1],mergeColor([0,0,0],this.colorDetail.text,this.level/max(1,this.levels-1))[2],this.fade)
                this.layer.textSize(16)
                this.layer.text('Smoked',0,0)
            }else{
                if(this.player==-1){
                    this.layer.noStroke()
                    switch(this.color){
                        case game.playerNumber+3:
                            this.layer.fill(255,100,100,this.fade)
                        break
                        default:
                            this.layer.fill(150,this.fade)
                        break
                    }
                    this.layer.rect(0,0,3,this.height+5)
                }
                if(this.spec.includes(6)){
                    this.layer.fill(138,141,207,this.fade)
                    this.layer.stroke(111,114,178,this.fade)
                    this.layer.strokeWeight(2)
                    this.layer.ellipse(-this.width/2+10,-this.height/2+12,20,20)
                }
                if(this.spec.includes(11)){
                    this.layer.noFill()
                    this.layer.stroke(240,240,40,this.fade)
                    this.layer.strokeWeight(3)
                    this.layer.strokeCap(SQUARE)
                    this.layer.arc(-this.width/2+10.5,-this.height/2+11.5,15,15,-135,45)
                    this.layer.arc(-this.width/2+9.5,-this.height/2+12.5,15,15,45,225)
                    this.layer.strokeCap(ROUND)
                }else if(this.spec.includes(21)){
                    this.layer.fill(140,120,160,this.fade)
                    this.layer.stroke(120,100,140,this.fade)
                    this.layer.strokeWeight(2)
                    regPoly(this.layer,-this.width/2+10,-this.height/2+12,8,7,7,0)
                }else if(!this.spec.includes(5)){
                    this.layer.fill(225,255,255,this.fade)
                    this.layer.stroke(200,255,255,this.fade)
                    this.layer.strokeWeight(2)
                    this.layer.quad(-this.width/2+2,-this.height/2+12,-this.width/2+10,-this.height/2+2,-this.width/2+18,-this.height/2+12,-this.width/2+10,-this.height/2+22)
                }
                this.layer.noStroke()
                if(!this.spec.includes(5)){
                    if(this.spec.includes(11)){
                        this.layer.fill(mergeColor([255,0,0],[255,255,255],this.anim.afford),this.level/2,this.fade)
                    }else if(this.spec.includes(21)){
                        this.layer.fill(mergeColor([255,0,0],[50,40,60],this.anim.afford),this.level/2,this.fade)
                    }else{
                        this.layer.fill(mergeColor([255,0,0],[0,0,0],this.anim.afford),this.level/2,this.fade)
                    }
                    this.layer.textSize(14)
                    if(this.cost==-1){
                        this.layer.text('X',-this.width/2+10,-this.height/2+13)
                    }else{
                        this.layer.text(this.cost,-this.width/2+10,-this.height/2+13)
                    }
                }
                this.layer.fill(mergeColor([0,0,0],this.colorDetail.text,this.level/max(1,this.levels-1))[0],mergeColor([0,0,0],this.colorDetail.text,this.level/max(1,this.levels-1))[1],mergeColor([0,0,0],this.colorDetail.text,this.level/max(1,this.levels-1))[2],this.fade)
                this.layer.textSize(10)
                this.layer.text(this.name+multiplyString('+',this.level),0,-this.height/2+15)
                this.layer.fill(0,this.fade)
                this.layer.textSize(8)
                if(this.spec.includes(12)){
                    this.layer.text(this.description(this.attack[0],this.effect[0],this.reality[0]),0,-15)
                    this.layer.text(this.description(this.attack[1],this.effect[1],this.reality[1]),0,this.height/2-25)
                }else{
                    this.layer.text(this.description(this.attack,this.effect,this.spec),0,10)
                }
                this.layer.textSize(6)
                if(options.id){
                    this.layer.text(this.id,this.width/2-8,-this.height/2+8)
                }
                if(this.spec.includes(12)){
                    for(let a=0,la=2;a<la;a++){
                        switch(this.class[a]){
                            case 1:
                                this.layer.text('Attack',0,4+a*(this.height/2-10))
                            break
                            case 2:
                                this.layer.text('Defense',0,4+a*(this.height/2-10))
                            break
                            case 3:
                                this.layer.text('Movement',0,4+a*(this.height/2-10))
                            break
                            case 4:
                                this.layer.text('Power',0,4+a*(this.height/2-10))
                            break
                            case 5:
                                this.layer.text('Status',0,4+a*(this.height/2-10))
                            break
                            case 6:
                                this.layer.text('Curse',0,4+a*(this.height/2-10))
                            break
                            case 7:
                                this.layer.text('Blueprint',0,4+a*(this.height/2-10))
                            break
                        }
                    }
                }else{
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
                        case 7:
                            this.layer.text('Blueprint',0,this.height/2-6)
                        break
                    }
                }
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
            let stack=0
            if(anim[0]>0){
                this.layer.stroke(255,0,0,this.fade*anim[0])
                this.layer.rect(0,0,this.width+2-stack*6,this.height+2-stack*6,max(0,5-stack*3))
                stack++
            }
            if(anim[1]>0){
                this.layer.stroke(100,255,255,this.fade*anim[1])
                this.layer.rect(0,0,this.width+2-stack*6,this.height+2-stack*6,max(0,5-stack*3))
                stack++
            }
            if(anim[2]>0){
                this.layer.stroke(255,225,0,this.fade*anim[2])
                this.layer.rect(0,0,this.width+2-stack*6,this.height+2-stack*6,max(0,5-stack*3))
                stack++
            }
            if(anim[3]>0){
                this.layer.stroke(255,100,255,this.fade*anim[3])
                this.layer.rect(0,0,this.width+2-stack*6,this.height+2-stack*6,max(0,5-stack*3))
                stack++
            }
            if(anim[4]>0){
                this.layer.stroke(255,200,200,this.fade*anim[4])
                this.layer.rect(0,0,this.width+2-stack*6,this.height+2-stack*6,max(0,5-stack*3))
                stack++
            }
            if(anim[5]>0){
                this.layer.stroke(0,150,255,this.fade*anim[5])
                this.layer.rect(0,0,this.width+2-stack*6,this.height+2-stack*6,max(0,5-stack*3))
                stack++
            }
            if(anim[6]>0){
                this.layer.stroke(200,225,255,this.fade*anim[6])
                this.layer.rect(0,0,this.width+2-stack*6,this.height+2-stack*6,max(0,5-stack*3))
                stack++
            }
            if(anim[7]>0){
                this.layer.stroke(255,255,150,this.fade*anim[7])
                this.layer.rect(0,0,this.width+2-stack*6,this.height+2-stack*6,max(0,5-stack*3))
                stack++
            }
            if(anim[8]>0){
                this.layer.stroke(255,225,100,this.fade*anim[8])
                this.layer.rect(0,0,this.width+2-stack*6,this.height+2-stack*6,max(0,5-stack*3))
                stack++
            }
            this.layer.pop()
        }
    }
    update(){
        if(this.select){
            this.upSize=true
        }
        if(this.player>=0&&this.player<this.battle.players){
            let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.player)]
            this.afford=(userCombatant.getStatus('Free Card')>0||userCombatant.getStatus('Free Attack')>0&&this.class==1||this.battle.energy.main[this.player]>=this.cost&&!this.spec.includes(11)&&!this.spec.includes(21)||this.battle.combatantManager.combatants[this.player].combo>=this.cost&&this.spec.includes(11)||this.battle.combatantManager.combatants[this.player].metal>=this.cost&&this.spec.includes(21))&&!(userCombatant.getStatus('Cannot Move')>0&&this.class==3)&&!(userCombatant.stance==3&&this.class==1&&this.attack!=824)&&
            !(this.spec.includes(6)&&!userCombatant.armed)
            this.energyAfford=(userCombatant.getStatus('Free Card')>0||userCombatant.getStatus('Free Attack')>0&&this.class==1||this.battle.energy.main[this.player]>=this.cost&&!this.spec.includes(11)&&!this.spec.includes(21)||this.battle.combatantManager.combatants[this.player].combo>=this.cost&&this.spec.includes(11)||this.battle.combatantManager.combatants[this.player].metal>=this.cost&&this.spec.includes(21))
        }else{
            this.afford=false
            this.energyAfford=false
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