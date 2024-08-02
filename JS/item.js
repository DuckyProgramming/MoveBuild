class item{
    constructor(layer,battle,player,x,y,altX,altY,type,size){
        this.layer=layer
        this.battle=battle
        this.player=player
        this.position={x:x,y:y}
        this.altPosition={x:altX,y:altY}
        this.type=type
        this.size=size

        this.name=types.item[this.type].name
        this.internal=types.item[this.type].internal
        this.menu=types.item[this.type].menu
        this.temp=types.item[this.type].temp
        this.description=types.item[this.type].description
        this.rarity=types.item[this.type].rarity

        this.fade=0
        this.infoFade=0
        this.deFade=false
    }
    refresh(){
        this.name=types.item[this.type].name
        this.internal=types.item[this.type].internal
        this.menu=types.item[this.type].menu
        this.temp=types.item[this.type].temp
        this.description=types.item[this.type].description
        this.rarity=types.item[this.type].rarity
    }
    display(total,alt=false){
        if(this.fade>0){
            this.layer.push()
            this.layer.translate(alt?this.altPosition.x:this.position.x,alt?this.altPosition.y:this.position.y)
            this.layer.scale(this.size)
            this.layer.fill(200,this.fade)
            this.layer.noStroke()
            this.layer.ellipse(0,0,40)
            if(this.temp){
                this.layer.fill(150,this.fade)
                this.layer.ellipse(0,0,36)
                this.layer.fill(200,this.fade)
                this.layer.ellipse(0,0,33)
            }
            if(this.player==-1){
                this.layer.fill(150,this.fade)
                this.layer.rect(0,0,2,40)
            }
            switch(this.internal){
                case '':
                    displaySymbol(this.layer,0,0,30,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text(total,0,0)
                break
                case 'N/A':
                    displaySymbol(this.layer,0,0,31,0,1,this.fade)
                break
                case '10 Damage':
                    displaySymbol(this.layer,0,0,18,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('10',0,0)
                break
                case '3 Free Attacks':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,18,0,0.6,this.fade)
                    if(variants.mtg){
                        displayMtgManaSymbol(this.layer,9,0,-1,0,0.8,this.fade,-1,[])
                    }else{
                        displaySymbol(this.layer,8,0,9,0,1,this.fade)
                    }
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('0',variants.mtg?9:8,0)
                break
                case '3 Free Defenses':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,19,0,0.6,this.fade)
                    if(variants.mtg){
                        displayMtgManaSymbol(this.layer,9,0,-1,0,0.8,this.fade,-1,[])
                    }else{
                        displaySymbol(this.layer,8,0,9,0,1,this.fade)
                    }
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('0',variants.mtg?9:8,0)
                break
                case '3 Free Movements':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,13,0,1,this.fade)
                    if(variants.mtg){
                        displayMtgManaSymbol(this.layer,9,0,-1,0,0.8,this.fade,-1,[])
                    }else{
                        displaySymbol(this.layer,8,0,9,0,1,this.fade)
                    }
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('0',variants.mtg?9:8,0)
                break
                case '2 Free Powers':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,21,0,0.6,this.fade)
                    if(variants.mtg){
                        displayMtgManaSymbol(this.layer,9,0,-1,0,0.8,this.fade,-1,[])
                    }else{
                        displaySymbol(this.layer,8,0,9,0,1,this.fade)
                    }
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('0',variants.mtg?9:8,0)
                break
                case 'Heal 15':
                    displaySymbol(this.layer,0,0,2,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('15',0,0)
                break
                case '10 Poison':
                    displaySymbol(this.layer,0,0,66,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('10',0,0)
                break
                case 'Move Anywhere':
                    for(let a=0,la=3;a<la;a++){
                        displaySymbol(this.layer,cos(a*120)*7,sin(a*120)*7,20,a*120,0.8,this.fade)
                    }
                break
                case 'Counter 5 All':
                    displaySymbol(this.layer,0,0,38,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('5',0,0)
                break
                case '20 Block':
                    displaySymbol(this.layer,0,0,27,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('20',0,0)
                break
                case '20 Splash Damage':
                    displaySymbol(this.layer,0,0,67,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('20',0,0)
                break
                case 'Upgrade Hand':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,7,0,0.9,this.fade)
                break
                case '3 Energy':
                    displaySymbol(this.layer,0,0,9,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',0,0)
                break
                case '2 Strength':
                    displaySymbol(this.layer,0,0,11,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('2',0,0)
                break
                case '2 Dexterity':
                    displaySymbol(this.layer,0,0,12,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('2',0,0)
                break
                case '5 Temporary Strength':
                    displaySymbol(this.layer,0,0,41,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('5',0,0)
                break
                case '5 Temporary Dexterity':
                    displaySymbol(this.layer,0,0,42,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('5',0,0)
                break
                case '1 Stun':
                    displaySymbol(this.layer,0,0,69,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case 'Item Slot':
                    displaySymbol(this.layer,0,0,68,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case 'Colorless Card':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,57,0,1,this.fade)
                break
                case '3 Weak':
                    displaySymbol(this.layer,0,0,24,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',0,0)
                break
                case '3 Vulnerable':
                    displaySymbol(this.layer,0,0,26,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',0,0)
                break
                case '3 Frail':
                    displaySymbol(this.layer,0,0,25,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',0,0)
                break
                case 'Draw 3':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',0,0)
                break
                case '1 Control':
                    displaySymbol(this.layer,0,0,56,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case 'Spike Tiles':
                    displaySymbol(this.layer,0,0,70,0,0.8,this.fade)
                break
                case '10 Armor':
                    displaySymbol(this.layer,0,0,37,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('10',0,0)
                break
                case 'Redraw':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,14,0,1.5,this.fade)
                break
                case '8 Regeneration':
                    displaySymbol(this.layer,0,0,71,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('8',0,0)
                break
                case '1 Strength Per Turn':
                    displaySymbol(this.layer,0,0,72,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case '1 Dexterity Per Turn':
                    displaySymbol(this.layer,0,0,73,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case 'Free Discard Pull':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,5,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,0,125,0,0.8,this.fade)
                    if(variants.mtg){
                        displayMtgManaSymbol(this.layer,9,0,-1,0,0.8,this.fade,-1,[])
                    }else{
                        displaySymbol(this.layer,8,0,9,0,1,this.fade)
                    }
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('0',variants.mtg?9:8,0)
                break
                case '3 Miracles':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,15,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',0,0)
                break
                case 'Duplicate 2':
                    displaySymbol(this.layer,-12,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,12,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,0,2,4,0,0.6,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('2',0,-6)
                break
                case 'Draw 3 Free':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    if(variants.mtg){
                        displayMtgManaSymbol(this.layer,9,0,-1,0,0.8,this.fade,-1,[])
                    }else{
                        displaySymbol(this.layer,8,0,9,0,1,this.fade)
                    }
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',-8,0)
                    this.layer.text('0',variants.mtg?9:8,0)
                break
                case 'Retain Block':
                    displaySymbol(this.layer,0,0,74,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('5',0,0)
                break
                case 'Random Rotate':
                    displaySymbol(this.layer,0,0,3,0,0.4,this.fade)
                    displaySymbol(this.layer,12,0,4,0,0.4,this.fade)
                    displaySymbol(this.layer,-12,0,5,0,0.4,this.fade)
                    displaySymbol(this.layer,0,12,6,0,0.4,this.fade)
                    displaySymbol(this.layer,0,-12,7,0,0.4,this.fade)
                break
                case 'Push All Directions':
                    displaySymbol(this.layer,-8,-8,20,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,8,20,0,0.6,this.fade)
                    displaySymbol(this.layer,7,-8,3,0,0.4,this.fade)
                    displaySymbol(this.layer,7,8,3,0,0.4,this.fade)
                break
                case 'Remove Fatigues':
                    displaySymbol(this.layer,0,0,8,0,1.2,this.fade)
                    displaySymbol(this.layer,0,0,60,0,1.2,this.fade)
                    displaySymbol(this.layer,0,0,16,0,1.2,this.fade)
                break
                case '5 Shivs':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,36,0,1.4,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('5',0,0)
                break
                case 'Extra Turn':
                    displaySymbol(this.layer,0,0,75,0,1.5,this.fade)
                break
                case 'Remove Card':
                    displaySymbol(this.layer,0,0,8,0,1.2,this.fade)
                    displaySymbol(this.layer,0,0,16,0,1.2,this.fade)
                break
                case '5 Max HP':
                    displaySymbol(this.layer,0,0,10,0,0.8,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('5',0,0)
                break
                case '2 Intangible':
                    displaySymbol(this.layer,0,-4,48,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('2',0,0)
                break
                case 'End Combat':
                    displaySymbol(this.layer,0,-4,3,0,0.6,this.fade)
                    displaySymbol(this.layer,0,12,4,0,0.8,this.fade)
                break
                case '10 Confused Draw':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('10',-8,0)
                    this.layer.textSize(20)
                    this.layer.text('?',8,0)
                break
                case '2 Buffer':
                    displaySymbol(this.layer,0,0,44,0,2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('2',0,0)
                break
                case 'Revive':
                    displaySymbol(this.layer,-10,0,22,0,0.4,this.fade)
                    displaySymbol(this.layer,8,0,2,0,0.6,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('10',8,0)
                break
                case '6 Random Damage 10 Times':
                    displaySymbol(this.layer,-6,0,18,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(6)
                    this.layer.text('6x10',-6,0)
                    this.layer.textSize(20)
                    this.layer.text('?',10,0)
                break
                case 'Fill Items':
                    displaySymbol(this.layer,-8,0,30,0,0.6,this.fade)
                    displaySymbol(this.layer,8,0,30,0,0.6,this.fade)
                break
                case '3 Free Skills':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,123,0,0.6,this.fade)
                    if(variants.mtg){
                        displayMtgManaSymbol(this.layer,9,0,-1,0,0.8,this.fade,-1,[])
                    }else{
                        displaySymbol(this.layer,8,0,9,0,1,this.fade)
                    }
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('0',variants.mtg?9:8,0)
                break
                case 'Double Damage':
                    displaySymbol(this.layer,0,2,39,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case 'Deck Pull':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,5,0,0.9,this.fade)
                    displaySymbol(this.layer,0,0,124,0,1.2,this.fade)
                break
                case 'Discard Pull':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,5,0,0.9,this.fade)
                    displaySymbol(this.layer,0,0,125,0,1.2,this.fade)
                break
                case 'Draw Pull':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,5,0,0.9,this.fade)
                    displaySymbol(this.layer,0,0,126,0,1.2,this.fade)
                break
                case 'Random Upgrade':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,7,0,0.9,this.fade)
                    displaySymbol(this.layer,0,0,64,0,0.4,this.fade)
                break
                case '3 Energy/5 Cards/Lose 3 Health':
                    displaySymbol(this.layer,-8,-4,9,0,0.8,this.fade)
                    displaySymbol(this.layer,8,-4,8,0,0.8,this.fade)
                    displaySymbol(this.layer,0,9,2,0,0.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',-8,-4)
                    this.layer.text('5',8,-4)
                    this.layer.textSize(8)
                    this.layer.text('-3',0,9)
                break
                case '5 Retained Energy':
                    displaySymbol(this.layer,-9,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,128,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('5',-9,0)
                    this.layer.text('5',9,0)
                break
                case '30 Splash Damage/Burn/Freeze/Shock':
                    displaySymbol(this.layer,0,-5,18,0,1,this.fade)
                    displaySymbol(this.layer,-8,11,65,0,0.6,this.fade)
                    displaySymbol(this.layer,8,11,129,0,0.6,this.fade)
                    displaySymbol(this.layer,0,13,130,0,0.6,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('30',0,-5)
                    this.layer.text('2',-8,11)
                    this.layer.text('2',8,11)
                    this.layer.text('2',0,13)
                break
                case '1 Base Energy':
                    displaySymbol(this.layer,0,0,131,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case '1 Energy/Redraw Non-Attacks':
                    displaySymbol(this.layer,-9,0,9,0,1,this.fade)
                    displaySymbol(this.layer,7,-7,8,0,0.75,this.fade)
                    displaySymbol(this.layer,7,-7,14,0,0.75,this.fade)
                    displaySymbol(this.layer,7,8,16,0,0.5,this.fade)
                    displaySymbol(this.layer,7,8,18,0,0.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',-9,0)
                break
                case '1 Energy/Redraw Non-Defenses':
                    displaySymbol(this.layer,-9,0,9,0,1,this.fade)
                    displaySymbol(this.layer,7,-7,8,0,0.75,this.fade)
                    displaySymbol(this.layer,7,-7,14,0,0.75,this.fade)
                    displaySymbol(this.layer,7,8,16,0,0.5,this.fade)
                    displaySymbol(this.layer,7,8,19,0,0.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',-9,0)
                break
                case 'Cancel 3 Exhausts':
                    displaySymbol(this.layer,0,0,132,0,2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(15)
                    this.layer.text('3',0,0)
                break
                case 'Exhaust Pull':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,5,0,0.9,this.fade)
                    displaySymbol(this.layer,0,0,127,0,1.2,this.fade)
                break
                case 'Duplicate Item':
                    displaySymbol(this.layer,0,0,30,0,1,this.fade)
                    displaySymbol(this.layer,0,0,64,0,0.6,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(15)
                    this.layer.text('x2',0,0)
                break
                case 'Half Damage 2 Turns':
                    displaySymbol(this.layer,0,0,47,0,2.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',0,0)
                break
                case 'Relic Voucher':
                    displaySymbol(this.layer,-10,0,1,0,0.5,this.fade)
                    displaySymbol(this.layer,8,0,35,0,0.25,this.fade)
                break
                case 'Any Uncommon Card':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,-5,114,0,0.8,this.fade)
                    displaySymbol(this.layer,0,5,95,0,0.6,this.fade)
                break
                case 'Oracle':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,-4,120,0,1.2,this.fade)
                    displaySymbol(this.layer,0,6,64,0,0.4,this.fade)
                break
                case '24 Damage/Limited Extra Turn':
                    displaySymbol(this.layer,-9,0,18,0,0.8,this.fade)
                    if(variants.mtg){
                        displayMtgManaSymbol(this.layer,9,0,-1,0,0.5,this.fade,-1,[])
                    }else{
                        displaySymbol(this.layer,9,0,9,0,0.6,this.fade)
                    }
                    displaySymbol(this.layer,9,0,75,0,0.9,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('24',-9,0)
                break
                case '35 Damage/2 Prismatic Bombs':
                    displaySymbol(this.layer,-8,0,18,0,1,this.fade)
                    displaySymbol(this.layer,10,0,133,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('35',-8,0)
                    this.layer.text('2',10,0)
                break
                case 'Double or Nothing':
                    displaySymbol(this.layer,-8,0,89,0,0.8,this.fade)
                    displaySymbol(this.layer,8,0,8,0,0.6,this.fade)
                    displaySymbol(this.layer,8,0,16,0,0.6,this.fade)
                break
                case 'Edition':
                    displaySymbol(this.layer,0,0,88,0,1.5,this.fade)
                break
                case 'Heal All':
                    displaySymbol(this.layer,-8,0,2,0,0.6,this.fade)
                    displaySymbol(this.layer,8,0,10,0,0.4,this.fade)
                break
                case '3 Free Items':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,1,0,0.5,this.fade)
                    displaySymbol(this.layer,9,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',-8,0)
                    this.layer.text('0',9,0)
                break
                case 'Basic Cards':
                    displaySymbol(this.layer,-12,0,18,0,0.6,this.fade)
                    displaySymbol(this.layer,0,0,19,0,0.6,this.fade)
                    displaySymbol(this.layer,12,0,20,0,0.6,this.fade)
                break
                case 'Retain Hand':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,49,0,1.5,this.fade)
                break
                case 'Nothings':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,134,0,1.5,this.fade)
                break
                case 'Discard All Block/Miracle':
                    displaySymbol(this.layer,-8,-4,8,0,0.9,this.fade)
                    displaySymbol(this.layer,-8,-4,6,0,0.54,this.fade)
                    displaySymbol(this.layer,8,-4,8,0,0.9,this.fade)
                    displaySymbol(this.layer,8,-4,15,0,0.9,this.fade)
                    displaySymbol(this.layer,0,11,27,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('5',0,11)
                break
                case 'Double Item':
                    displaySymbol(this.layer,0,-6,30,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2x',0,10)
                break
                case 'Tick':
                    displaySymbol(this.layer,0,0,135,0,1.5,this.fade)
                break
                case 'All Cannot Move':
                    displaySymbol(this.layer,0,0,136,0,2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case '1 Damage All':
                    for(let a=0,la=6;a<la;a++){
                        displaySymbol(this.layer,lsin(a*60)*12,lcos(a*60)*12,18,0,0.6,this.fade)
                    }
                    displaySymbol(this.layer,0,0,18,0,0.6,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case '50 Sell':
                    displaySymbol(this.layer,0,0,28,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('50',0,0)
                break
                case 'All Cannot Add Block':
                    displaySymbol(this.layer,0,0,137,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('2',0,0)
                break
                case '3 Pristines':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,138,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',0,0)
                break
                case 'Expensive Free':
                    displaySymbol(this.layer,-9,0,8,0,1.1,this.fade)
                    if(variants.mtg){
                        displayMtgManaSymbol(this.layer,-9,0,-1,0,0.5,this.fade,0,[1,0,1])
                        displayMtgManaSymbol(this.layer,9,0,-1,0,0.8,this.fade,-1,[])
                    }else{
                        displaySymbol(this.layer,-9,1,139,0,0.5,this.fade)
                        displaySymbol(this.layer,9,0,9,0,1,this.fade)
                    }
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('0',9,0)
                break
                case 'Free Draw Pull':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,5,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,0,126,0,0.8,this.fade)
                    if(variants.mtg){
                        displayMtgManaSymbol(this.layer,9,0,-1,0,0.8,this.fade,-1,[])
                    }else{
                        displaySymbol(this.layer,8,0,9,0,1,this.fade)
                    }
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('0',variants.mtg?9:8,0)
                break
                case 'Upgrade All/Burn':
                    displaySymbol(this.layer,-7,0,8,0,0.6,this.fade)
                    displaySymbol(this.layer,-15,0,8,0,0.45,this.fade)
                    displaySymbol(this.layer,1,0,8,0,0.45,this.fade)
                    displaySymbol(this.layer,-7,0,7,0,0.36,this.fade)
                    displaySymbol(this.layer,11,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,11,1,65,0,0.6,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('2',11,0)
                break
                case 'Cleanse':
                    displaySymbol(this.layer,0,0,143,0,2,this.fade)
                break
                case 'Exhaust 5 From Draw':
                    displaySymbol(this.layer,0,-4,8,0,1,this.fade)
                    displaySymbol(this.layer,0,-4,16,0,1,this.fade)
                    displaySymbol(this.layer,0,-4,126,0,0.8,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('5',0,15)
                break
                case '8 Damage Any':
                    displaySymbol(this.layer,0,0,18,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,120,0,2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('8',0,0)
                break
                case 'Transform Hand':
                    displaySymbol(this.layer,0,0,8,0,0.9,this.fade)
                    displaySymbol(this.layer,-12,0,8,0,0.6,this.fade)
                    displaySymbol(this.layer,12,0,8,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('?',0,0)
                break
                case 'Push to End':
                    displaySymbol(this.layer,-13,0,20,0,0.6,this.fade)
                    displaySymbol(this.layer,2,0,3,0,0.4,this.fade)
                    displaySymbol(this.layer,14,0,144,0,0.6,this.fade)
                break
                case 'Strength in 3 Turns/Dexterity in 3 Turns':
                    displaySymbol(this.layer,-7,-3,145,0,1.75,this.fade)
                    displaySymbol(this.layer,7,-3,146,0,1.75,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',-7,-3)
                    this.layer.text('3',7,-3)
                break
                case '1 Energy/Redraw Non-Movements':
                    displaySymbol(this.layer,-9,0,9,0,1,this.fade)
                    displaySymbol(this.layer,7,-7,8,0,0.75,this.fade)
                    displaySymbol(this.layer,7,-7,14,0,0.75,this.fade)
                    displaySymbol(this.layer,7,8,16,0,0.5,this.fade)
                    displaySymbol(this.layer,7,8,20,0,0.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',-9,0)
                break
                case '1 Energy/Redraw Non-Skills':
                    displaySymbol(this.layer,-9,0,9,0,1,this.fade)
                    displaySymbol(this.layer,7,-7,8,0,0.75,this.fade)
                    displaySymbol(this.layer,7,-7,14,0,0.75,this.fade)
                    displaySymbol(this.layer,7,8,16,0,0.5,this.fade)
                    displaySymbol(this.layer,7,8,123,0,0.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',-9,0)
                break
                case '1 Energy/Redraw Non-Powers':
                    displaySymbol(this.layer,-9,0,9,0,1,this.fade)
                    displaySymbol(this.layer,7,-7,8,0,0.75,this.fade)
                    displaySymbol(this.layer,7,-7,14,0,0.75,this.fade)
                    displaySymbol(this.layer,7,8,16,0,0.5,this.fade)
                    displaySymbol(this.layer,7,8,21,0,0.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',-9,0)
                break
                case 'Duplicate Hand':
                    displaySymbol(this.layer,0,0,89,0,0.8,this.fade)
                    displaySymbol(this.layer,-12,0,89,0,0.6,this.fade)
                    displaySymbol(this.layer,12,0,89,0,0.6,this.fade)
                break
                case 'Remove Block/25 Damage':
                    displaySymbol(this.layer,-9,0,27,0,0.6,this.fade)
                    displaySymbol(this.layer,-9,0,16,0,0.6,this.fade)
                    displaySymbol(this.layer,9,0,18,0,0.8,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('25',9,0)
                break
                case 'Draw to 5':
                    displaySymbol(this.layer,4,0,8,0,1.2,this.fade)
                    displaySymbol(this.layer,-12,0,4,0,0.6,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('5',4,0)
                break
                case 'Draw 5 Commons':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,-2.5,5.5,95,0,0.75,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',0,0)
                break
                case 'Draw 5 Uncommons':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,-2.5,5.5,100,0,0.75,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',0,0)
                break
                case '5 Mana':
                    for(let a=0,la=5;a<la;a++){
                        displayMtgManaSymbol(this.layer,lsin(a*72)*11,lcos(a*72)*11,1+a,0,0.5,this.fade,-1,[])
                    }
                break
                case '3 Mana/5 Cards/Lose 3 Health':
                    displayMtgManaSymbol(this.layer,-8,-4,6,0,0.64,this.fade,-1,[])
                    displaySymbol(this.layer,8,-4,8,0,0.8,this.fade)
                    displaySymbol(this.layer,0,9,2,0,0.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',-8,-4)
                    this.layer.text('5',8,-4)
                    this.layer.textSize(8)
                    this.layer.text('-3',0,9)
                break
                case '5 Retained Mana':
                    displayMtgManaSymbol(this.layer,-9,0,6,0,0.8,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,9,0,-1,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,160,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('5',-9,0)
                    this.layer.text('5',9,0)
                break
                case 'Base Mana Swap':
                    displayMtgManaSymbol(this.layer,-11,0,-1,0,0.6,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,11,0,-1,0,0.6,this.fade,-1,[])
                    displaySymbol(this.layer,0,0,4,0,0.4,this.fade)
                break
                case 'Rainbow Base Mana':
                    displayMtgManaSymbol(this.layer,0,0,6,0,1.2,this.fade,2,[1])
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case '2 Mana/Redraw Non-Attacks':
                    displayMtgManaSymbol(this.layer,-9,0,5,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,7,-7,8,0,0.75,this.fade)
                    displaySymbol(this.layer,7,-7,14,0,0.75,this.fade)
                    displaySymbol(this.layer,7,8,16,0,0.5,this.fade)
                    displaySymbol(this.layer,7,8,18,0,0.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('2',-9,0)
                break
                case '2 Mana/Redraw Non-Defenses':
                    displayMtgManaSymbol(this.layer,-9,0,4,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,7,-7,8,0,0.75,this.fade)
                    displaySymbol(this.layer,7,-7,14,0,0.75,this.fade)
                    displaySymbol(this.layer,7,8,16,0,0.5,this.fade)
                    displaySymbol(this.layer,7,8,19,0,0.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('2',-9,0)
                break
                case '2 Mana/Redraw Non-Movements':
                    displayMtgManaSymbol(this.layer,-9,0,2,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,7,-7,8,0,0.75,this.fade)
                    displaySymbol(this.layer,7,-7,14,0,0.75,this.fade)
                    displaySymbol(this.layer,7,8,16,0,0.5,this.fade)
                    displaySymbol(this.layer,7,8,20,0,0.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('2',-9,0)
                break
                case '2 Mana/Redraw Non-Skills':
                    displayMtgManaSymbol(this.layer,-9,0,3,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,7,-7,8,0,0.75,this.fade)
                    displaySymbol(this.layer,7,-7,14,0,0.75,this.fade)
                    displaySymbol(this.layer,7,8,16,0,0.5,this.fade)
                    displaySymbol(this.layer,7,8,123,0,0.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('2',-9,0)
                break
                case '2 Mana/Redraw Non-Powers':
                    displayMtgManaSymbol(this.layer,-9,0,1,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,7,-7,8,0,0.75,this.fade)
                    displaySymbol(this.layer,7,-7,14,0,0.75,this.fade)
                    displaySymbol(this.layer,7,8,16,0,0.5,this.fade)
                    displaySymbol(this.layer,7,8,21,0,0.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('2',-9,0)
                break

                case '5 Strength/Burn':
                    displaySymbol(this.layer,-8,0,11,0,1,this.fade)
                    displaySymbol(this.layer,8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,2,65,0,0.8,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('5',-8,0)
                break
                case '15 Heal/No Block':
                    displaySymbol(this.layer,-8,0,2,0,0.6,this.fade)
                    displaySymbol(this.layer,8,0,27,0,0.8,this.fade)
                    displaySymbol(this.layer,8,0,16,0,0.6,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('15',-8,0)
                break
                case 'Heal 3':
                    displaySymbol(this.layer,0,0,2,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',0,0)
                break
                case '2 Energy':
                    displaySymbol(this.layer,0,0,9,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('2',0,0)
                break
                case '5 Damage':
                    displaySymbol(this.layer,0,0,18,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('5',0,0)
                break
                case '10 Block':
                    displaySymbol(this.layer,0,0,27,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('10',0,0)
                break
                case 'Draw 2':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('2',0,0)
                break
                case '1 Strength':
                    displaySymbol(this.layer,0,0,11,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case '1 Dexterity':
                    displaySymbol(this.layer,0,0,12,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case '1 Free Card':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,64,0,0.3,this.fade)
                    if(variants.mtg){
                        displayMtgManaSymbol(this.layer,9,0,-1,0,0.8,this.fade,-1,[])
                    }else{
                        displaySymbol(this.layer,8,0,9,0,1,this.fade)
                    }
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('0',variants.mtg?9:8,0)
                break
                case 'Mothing':
                    this.layer.fill(0)
                    this.layer.textSize(20)
                    this.layer.text('?',0,0)
                break
                case 'Sanae Card':
                    displaySymbol(this.layer,0,0,101,0,2,this.fade)
                break
                case 'Sakura Card':
                    displaySymbol(this.layer,0,0,102,0,2,this.fade)
                break
                case '3 Energy/Draw and Upgrade 3':
                    displaySymbol(this.layer,-9,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,11,0,7,0,0.4,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',-9,0)
                    this.layer.text('3',6,0)
                break
                case '3 Mana':
                    displayMtgManaSymbol(this.layer,0,0,6,0,1,this.fade,-1,[])
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',0,0)
                break
                case '4 Mana/Draw and Upgrade 3':
                    displayMtgManaSymbol(this.layer,-9,0,6,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,11,0,7,0,0.4,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('4',-9,0)
                    this.layer.text('3',6,0)
                break

                //mark p
            }
            this.layer.pop()
        }
    }
    displayInfo(pos=0){
        if(this.infoFade>0){
            this.layer.fill(150,this.infoFade)
            this.layer.noStroke()
            this.layer.rect(100+pos*50,240,160,120,10)
            this.layer.fill(0,this.infoFade)
            this.layer.textSize(12)
            this.layer.text(this.name,100+pos*50,200)
            this.layer.textSize(8)
            this.layer.text(this.description,100+pos*50,245)
            this.layer.textSize(10)
            switch(this.rarity){
                case 0:
                    this.layer.text('Common',100+pos*50,290)
                break
                case 1:
                    this.layer.text('Uncommon',100+pos*50,290)
                break
                case 2:
                    this.layer.text('Rare',100+pos*50,290)
                break
            }
        }
    }
    update(up,total,inputs,alt){
        this.fade=smoothAnim(this.fade,up&&!this.deFade||this.type==0&&total>0,0,1,5)
        this.infoFade=smoothAnim(this.infoFade,up&&(this.battle.encounter.tooltip==0||stage.scene!='battle')&&dist(inputs.rel.x,inputs.rel.y,alt?this.altPosition.x:this.position.x,alt?this.altPosition.y:this.position.y)<20*this.size&&this.type!=0,0,1,5)
    }
}