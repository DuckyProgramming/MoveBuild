class card{
    constructor(layer,battle,player,x,y,type,level,color,id,cost,additionalSpec,name,list,effect,attack,target,spec,cardClass){
        this.layer=layer
        this.battle=battle
        this.player=player
        this.position={x:x,y:y}
        this.type=type
        this.level=level
        this.color=color
        this.id=id
        this.cost=cost||-1

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
        this.energyAfford=false
        this.nonCalc=false
        this.discardEffect=[]

        this.anim={select:0,afford:0}
        this.colorDetail=types.color.card[this.color]

        this.name=name||types.card[this.type].name
        this.list=list||types.card[this.type].list
        this.rarity=types.card[this.type].rarity
        this.effect=effect||copyArray(types.card[this.type].levels[this.level].effect)
        this.attack=attack||types.card[this.type].levels[this.level].attack
        this.target=target||types.card[this.type].levels[this.level].target
        this.spec=(spec||types.card[this.type].levels[this.level].spec).concat(additionalSpec||[])
        this.class=cardClass||types.card[this.type].levels[this.level].class
        this.levels=types.card[this.type].levels.length
        this.additionalSpec=additionalSpec||[]
        if(this.list==-1){
            this.list=this.color
        }

        this.base={cost:cost||types.card[this.type].levels[this.level].cost}
        if(this.cost==-1){
            this.cost=this.base.cost
        }
        if(this.spec.includes(12)){
            this.reality=types.card[this.type].levels[this.level].reality
        }
        if(this.spec.includes(15)){
            this.limit=types.card[this.type].levels[this.level].limit
        }

        this.strike=this.name.includes('Strike')
        this.basic=this.name=='Strike'||this.name=='Defend'||this.name=='Step'
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
    description(attack,effect){
        let string=''
        if(this.spec.includes(5)){
            string+='Unplayable\n'
        }
        if(this.spec.includes(7)){
            string+='Unremovable\n'
        }
        if(this.spec.includes(3)){
            string+='Innate\n'
        }
        if(this.spec.includes(9)){
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
            case 1: case 25: case 32: case 36: case 57: case 327:
                string+=`Deal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 2: string+=`Add ${this.calculateEffect(effect[0],1)} Block`; break
            case 3: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}`; break
            case 4: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n2 Times`; break
            case 5: case 16:
                string+=`${effect[0]>0?`Deal `+this.calculateEffect(effect[0],0)+` Damage\n`:`\n`}Push 1 Tile`; break
            case 6: string+=`Next ${effect[0]!=1?effect[0]+` `:``}Attack${effect[0]!=1?`s`:``}\nDeal${effect[0]==1?`s`:``} Double\nDamage`; break
            case 7: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal, Gain\n${effect[1]} Energy`; break
            case 8: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}`; break
            case 9: string+=`Swap With an\nAdjacent Target\nTarget Will Face User\nor\nMove ${effect[0]} Tiles`; break
            case 10: string+=`Heal ${this.calculateEffect(effect[0],4)} Health`; break
            case 11: case 251:
                string+=`Pull Target Until Adjacent\nTarget Will Face User`; break
            case 12: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage`; break
            case 13: string+=`Add ${this.calculateEffect(effect[0],3)} Block`; break
            case 14: string+=`Pass Through an\nAdjacent Target\nor\nMove ${effect[0]} Tile`; if(effect[0]!=1){string+=`s`} break
            case 15: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nPush 1 Tile\nMove Forward 1 Tile`; break
            case 17: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nMove 1 Tile Away`; break
            case 18: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin All Directions`; break
            case 19: string+=`Swap With an\nAdjacent Target\nDeal ${this.calculateEffect(effect[0],0)} Damage\nPush 1 Tile`; break
            case 20: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nDiscard 1\nRandom Card`; break
            case 21: string+=`Advance up to ${effect[0]} Tile${effect[0]!=1?`s`:``}\nToward an Enemy`; break
            case 22: string+=`Gain ${effect[0]} Energy\nTake ${effect[1]} Damage`; break
            case 23: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]}`; break
            case 24: string+=`Make an Enemy Attack\nThey Will Not Attack\non Their Turn`; break
            case 26: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCannot be Pushed\nThis Turn`; break
            case 27: string+=`Advance up to ${effect[1]} Tile${effect[0]!=1?`s`:``}\nToward an Enemy\nDeal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 28: string+=`Put a Card in Discard\nPile in Your Hand`; break
            case 29: string+=`Put a Card in Draw\nPile in Your Hand`; break
            case 30: string+=`Add ${effect[0]} Dodge`; break
            case 31: string+=`Push 1 Tile\nin All Directions`; break
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
            case 47: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nApply ${effect[1]} Bleed`; break
            case 48: case 100:
                string+=`${effect[0]>0?`Deal `+this.calculateEffect(effect[0],0)+` Damage`:``}\nPush 2 Tiles`; break
            case 50: string+=`Add ${this.calculateEffect(+effect[0],1)} Block\nRetain Block\nfor ${effect[1]} Turn${effect[1]!=1?`s`:``}`; break
            case 51: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nAdd ${effect[1]} Dodge`; break
            case 52: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nDiscard When a\nCard is Played`; break
            case 53: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${effect[1]} Dodge`; break
            case 54: string+=`Move to Any\nEmpty Tile`; break
            case 55: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nDiscard ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 56: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nCosts 1 More When\na Card is Played`; break
            case 58: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nAdd a Stride\nto Your Hand`; break
            case 59: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nLose All Block`; break
            case 60: string+=`Move ${effect[0]!=1?effect[0]:``}X${effect[1]>0?`+`+effect[1]:``} Tiles`; break
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
            case 92: string+=`Remove ${effect[0]} Fatigues`; break
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
            case 121: string+=`If Unarmed,\n${effect[0]>0?`Deal `+this.calculateEffect(effect[0],0)+` Damage`:``}\nPush 1 Tile`; break
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
            case 134: string+=`${effect[0]>0?`Deal `+this.calculateEffect(effect[0],0)+` Damage`:``}\nPush 1 Tile Right`; break
            case 135: string+=`${effect[0]>0?`Deal `+this.calculateEffect(effect[0],0)+` Damage`:``}\nPush 1 Tile Left`; break
            case 136: case 217:
                string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Times`; break
            case 137: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nGain ${effect[1]} Strength\nNext Turn`; break
            case 138: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n3 Tiles Wide`; break
            case 139: string+=`Deal ${this.calculateEffect(effect[0],0)}+${effect[1]!=1?`${effect[1]}*`:``}Combo\nDamage 3 Tiles Wide\nEnd Combo`; break
            case 140: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIgnore Block`; break
            case 141: string+=`Convert ${this.calculateEffect(effect[0],6)}\nto Block`; break
            case 142: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Strength\nWhen Attacked`; break
            case 143: string+=`${effect[0]>0?`Deal `+this.calculateEffect(effect[0],0)+` Damage\n2 Times\n`:`\n`}Push 1 Tile`; break
            case 144: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number of\nCards in Discard\n(Including This Card)`; break
            case 145: string+=`Heal ${this.calculateEffectAlly(effect[0],4)} Health\nto Ally`; break
            case 146: string+=`Add ${this.calculateEffectAlly(effect[0],1)} Block\nto Ally`; break
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
            case 180: string+=`Your Next ${effect[0]} Exhausts\nDo Not Occur`; break
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
            case 201: string+=`${effect[0]>0?`Deal `+this.calculateEffect(effect[0],0)+` Damage\n`:`\n`}Push 1 Tile\nin Both Directions`; break
            case 202: string+=`Gain ${effect[0]} Combo\nIf Exhausted,\nGain ${effect[1]} Combo`; break
            case 203: string+=`Retain Block\nfor ${effect[0]} Turn${effect[0]!=1?`s`:``}`; break
            case 204: string+=`Add ${effect[0]} Dodge\nGain ${effect[1]} Conditioning`; break
            case 205: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nDoesn't Trigger Enemies`; break
            case 206: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nWhere X = Number of\nCards in Hand\nDiscard Your Hand`; break
            case 207: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nAdd ${effect[1]} Random\nCards to Your Hand`; break
            case 208: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\n4 Times`; break
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
            case 220: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDiscard When a\nCard is Played`; break
            case 221: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nGain ${effect[1]} Combo`; break
            case 222: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nin Both Directions`; break
            case 223: string+=`Gain ${effect[0]} Conditioning`; break
            case 224: string+=`Heal ${this.calculateEffect(effect[0],9)} Health`; break
            case 225: string+=`Gain ${effect[0]} Combo\nGain ${effect[1]} Energy\nNext Turn`; break
            case 226: string+=`Gain ${effect[0]} Combo\nLose All Combo\nat End of Turn`; break
            case 227: case 281:
                string+=`Next ${effect[0]} Card${effect[0]!=1?`s`:``}\nPlayed are Duplicated`; break
            case 228: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],7)}\nDamage\nDraw ${effect[1]} Card${effect[1]!=1?`s`:``}`; break
            case 229: string+=`Add ${effect[0]} Random\nAttack${effect[0]!=1?`s`:``} to Your Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0\nThis Turn`; break
            case 230: string+=`Add ${effect[0]} Random\nAttack${effect[0]!=1?`s`:``} to Your Hand\n${effect[0]!=1?`They Cost`:`It Costs`} 0`; break
            case 231: string+=`Each Hit Gains\n${effect[0]} More Combo`; break
            case 232: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\nWhen Attack Played`; break
            case 233: string+=`Gain ${effect[0]} Combo\nWhen You Gain Block`; break
            case 234: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nIf Fatal, Gain\n${effect[1]} Combo`; break
            case 235: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nCounter ${effect[1]}X`; break
            case 236: string+=`${effect[0]>0?`Deal `+this.calculateEffect(effect[0],0)+` Damage`:``}\nPush 1 Tile Right Back`; break
            case 237: string+=`${effect[0]>0?`Deal `+this.calculateEffect(effect[0],0)+` Damage`:``}\nPush 1 Tile Left Back`; break
            case 239: string+=`Gain ${effect[0]} Combo\nPer Turn`; break
            case 240: string+=`Gain ${effect[0]} Combo\nNext Turn`; break
            case 241: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nDeals ${this.calculateEffect(effect[0],10)} More Damage\nWhen Up to Wall`; break
            case 242: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nCounter ${effect[1]}\nat Range 1-2`; break
            case 243: string+=`Pull Target 1 Tile\nTarget Will Face User\nAdvance`; break
            case 244: string+=`${effect[0]>0?`Deal `+this.calculateEffect(effect[0],0)+` Damage\n`:`\n`}Push 2 Tile\nAround Left`; break
            case 245: string+=`${effect[0]>0?`Deal `+this.calculateEffect(effect[0],0)+` Damage\n`:`\n`}Push 2 Tile\nAround Right`; break
            case 246: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nMove 6 Tiles Away`; break
            case 247: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],7)}\nDamage\nPush 1 Tile\nEnd Combo`; break
            case 248: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}\nGain ${effect[1]} Conditioning`; break
            case 249: string+=`Gain Strength\nPer ${effect[0]} Combo\nEnd Combo`; break
            case 250: string+=`${effect[0]>0?`Deal `+this.calculateEffect(effect[0],0)+` Damage\n`:`\n`}Push to End`; break
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
            case 270: string+=`Add ${effect[0]} Shiv${effect[0]!=1?`s`:``}\nto Your Hand\nDraw ${effect[1]} Card ${effect[1]!=1?`s`:``}`; break
            case 271: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nCounter ${effect[1]}`; break
            case 272: string+=`Apply ${effect[0]}\nRandom Debuff`; break
            case 273: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd ${this.calculateEffect(effect[1],1)} Block`; break
            case 274: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd a Chip to\nDiscard Pile`; break
            case 275: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nAdd ${this.calculateEffect(effect[1],3)} Block\nValues Swap\nWhen X is Odd`; break
            case 276: string+=`Next ${effect[0]} Card${effect[0]!=1?`s`:``}\nPlayed are Duplicated\nDiscard ${effect[0]} Random Card${effect[0]!=1?`s`:``}`; break
            case 277: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nAdd an Overflow to\nDiscard Pile`; break
            case 278: string+=`Gain ${effect[0]} Temporary Strength`; break
            case 279: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}\n${this.effect[0]!=1?`They Cost`:`It Costs`} 0`; break
            case 280: string+=`Deal ${this.calculateEffect(effect[0],0)}+${this.calculateEffect(effect[1],11)} Damage\nWhere X = Number of\nAttacks in Hand`; break
            case 281: string+=`Add ${this.calculateEffect(effect[0],1)} Block\nExhaust ${effect[1]} Random Card${effect[1]!=1?`s`:``}`; break
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
            case 295: string+=`Target Explodes\non Death For\nits Max Health`
            case 296: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage\nif Draw Pile\nis Empty`; break
            case 297: string+=`Remove ${effect[0]}X Strength\nApply ${effect[1]}X Weak`; break
            case 298: string+=`Add ${effect[0]} Cop${effect[0]!=1?`ies`:`y`}\nof a Card to\nYour Draw Pile\n${effect[0]!=1?`They Cost`:`It Costs`} 0`; break
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
            case 312: string+=`When You\nTake Damage,\nAdd ${effect[0]} Shiv${effect[0]!=1?`s`:``}\nto Your Hand`; break
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
            case 334: string+=`Gain ${effect[0]} Energy and\nDraw ${effect[1]} Less Card${effect[1]!=1?`s`:``}\nEvery Turn`
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

            case 376: string+=`Deal ${this.calculateEffect(1,0)} Damage\nFor Every ${effect[0]}\nHealth You Have`; break
            case 377: string+=`Add ${this.calculateEffect(effect[0],3)} Block\nWhere X = Number\nof Fatigues`; break
            case 378: string+=`Lose 10% Health\nDeal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Health Lost`; break
            case 379: string+=`Deal ${this.calculateEffect(effect[0],2)} Damage\nWhere X = Number\nof Fatigues\nExhausted`; break
            case 380: string+=`Gain ${effect[0]} Strength\nLose ${effect[1]} Max Health`; break
            case 381: string+=`For the Rest\nof Combat, Take\n40% Less Damage`; break






            /*
            case 1: string+=`Deal ${this.calculateEffect(effect[0],0)} Damage`; break
            case 2: string+=`Add ${this.calculateEffect(effect[0],1)} Block`; break
            case 3: string+=`Move ${effect[0]} Tile${effect[0]!=1?`s`:``}`; break
            case 8: string+=`Draw ${effect[0]} Card${effect[0]!=1?`s`:``}`; break
            case 10: string+=`Heal ${this.calculateEffect(effect[0],4)} Health`; break
            case 64: string+=`Gain ${effect[0]} Control`; break
            case 366: string+=``; break
            */
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
        if(this.spec.includes(16)){
            string+='\n2 Fatigue'
        }
        if(this.spec.includes(14)){
            string+='\n3 Fatigue'
        }
        if(this.spec.includes(17)){
            string+='\nX Fatigue'
        }
        if(this.spec.includes(2)){
            string+='\nRetain'
        }
        if(this.spec.includes(1)){
            string+='\nExhaust'
        }
        if(this.spec.includes(15)){
            string+=`\nVanishing ${this.limit}`
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
                    this.base.cost++
                }
                if(this.cost>0){
                    this.cost++
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
            case 118:
                this.effect[0]+=this.effect[1]
            break
        }
        this.battle.attackManager.level=this.level
        this.battle.attackManager.color=this.color
    }
    anotherPlayed(){
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
            case 52: case 220:
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
    etherealed(){
        switch(this.attack){
            case 151:
                this.battle.cardManagers[this.player].hand.add(findName('Operational\nDefend',types.card),this.level,this.color)
            break
            case 152:
                this.battle.cardManagers[this.player].hand.add(findName('Operational\nStrike',types.card),this.level,this.color)
            break
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
                    this.layer.text(this.description(this.attack[0],this.effect[0]),0,-15)
                    this.layer.text(this.description(this.attack[1],this.effect[1]),0,this.height/2-25)
                }else{
                    this.layer.text(this.description(this.attack,this.effect),0,10)
                }
                this.layer.textSize(6)
                this.layer.text(this.id,this.width/2-8,-this.height/2+8)
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
            if(anim[3]>0){
                this.layer.stroke(255,100,255,this.fade*anim[3])
                this.layer.rect(0,0,this.width+2,this.height+2,5)
            }
            if(anim[4]>0){
                this.layer.stroke(255,200,200,this.fade*anim[4])
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
        this.afford=(userCombatant.getStatus('Free Card')>0||userCombatant.getStatus('Free Attack')>0&&this.class==1||this.battle.energy.main[this.player]>=this.cost&&!this.spec.includes(11)||this.battle.combatantManager.combatants[this.player].combo>=this.cost&&this.spec.includes(11))&&!(userCombatant.getStatus('Cannot Move')>0&&this.class==3)&&
        !(this.spec.includes(6)&&!userCombatant.armed)
        this.energyAfford=(userCombatant.getStatus('Free Card')>0||userCombatant.getStatus('Free Attack')>0&&this.class==1||this.battle.energy.main[this.player]>=this.cost&&!this.spec.includes(11)||this.battle.combatantManager.combatants[this.player].combo>=this.cost&&this.spec.includes(11))
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