class relic{
    constructor(layer,battle,player,x,y,type,size){
        this.layer=layer
        this.battle=battle
        this.player=player
        this.position={x:x,y:y}
        this.type=type
        this.size=size

        this.base()

        this.fade=0
        this.infoFade=0
        this.deFade=false
        this.active=true
        this.anim={active:1}
    }
    save(){
        let composite={
            player:this.player,
            position:this.position,
            type:this.type,
            size:this.size,
            active:this.active,
        }
        return composite
    }
    establish(player,x,y,type,size,active){
        this.player=player
        this.position={x:x,y:y}
        this.type=type
        this.size=size
        this.active=active

        this.base()
    }
    base(){
        this.name=types.relic[this.type].name
        this.internal=types.relic[this.type].internal
        this.description=types.relic[this.type].description
        this.rarity=types.relic[this.type].rarity

        this.value=relicSellValue(this.rarity)
    }
    display(total,active=0,position=this.position,value=false,detail=-1){
        if(this.fade>0){
            this.layer.push()
            this.layer.translate(position.x,position.y)
            this.layer.scale(this.size)
            this.layer.fill(80+this.anim.active*120,this.fade)
            this.layer.noStroke()
            this.layer.ellipse(0,0,40,40)
            if(this.player==-1){
                this.layer.fill(150,this.fade)
                this.layer.rect(0,0,2,40)
            }
            switch(this.internal){
                case '':
                    displaySymbol(this.layer,0,0,1,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text(total,0,0)
                break
                case 'Quick Heal':
                    displaySymbol(this.layer,-10,0,2,0,0.6,this.fade)
                    displaySymbol(this.layer,7,-4,3,0,0.4,this.fade)
                    displaySymbol(this.layer,7,9,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',-10,0)
                break
                case 'Extra Draw':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'First Turn Energy':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case '5 Turn Energy':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,7,10,4,0,0.6,this.fade)
                    displaySymbol(this.layer,7,-10,5,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('5',7,1)
                break
                case '6 Max HP':
                    displaySymbol(this.layer,0,-6,10,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('6',0,12)
                break
                case 'Starting Strength':
                    displaySymbol(this.layer,-8,0,11,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Starting Dexterity':
                    displaySymbol(this.layer,-8,0,12,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Emergency Move':
                    displaySymbol(this.layer,-8,0,13,0,0.8,this.fade)
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Redraw':
                    displaySymbol(this.layer,-8,0,14,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Miracle':
                    displaySymbol(this.layer,-8,0,15,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Play Unplayable':
                    displaySymbol(this.layer,-10,0,8,0,0.7,this.fade)
                    displaySymbol(this.layer,9,-5,4,0,0.7,this.fade)
                    displaySymbol(this.layer,9,8,4,0,0.7,this.fade)
                    displaySymbol(this.layer,-10,0,16,0,0.7,this.fade)
                    displaySymbol(this.layer,9,-5,16,0,0.7,this.fade)
                break
                case 'Upgrade All Attacks':
                    displaySymbol(this.layer,-7,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-7,0,17,0,0.3,this.fade)
                    displaySymbol(this.layer,8,-7,7,0,0.6,this.fade)
                    displaySymbol(this.layer,8,7,18,0,0.6,this.fade)
                break
                case 'Upgrade All Defense':
                    displaySymbol(this.layer,-7,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-7,0,17,0,0.3,this.fade)
                    displaySymbol(this.layer,8,-7,7,0,0.6,this.fade)
                    displaySymbol(this.layer,8,7,19,0,0.6,this.fade)
                break
                case 'Upgrade All Movement':
                    displaySymbol(this.layer,-7,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-7,0,17,0,0.3,this.fade)
                    displaySymbol(this.layer,8,-7,7,0,0.6,this.fade)
                    displaySymbol(this.layer,8,7,20,0,0.6,this.fade)
                break
                case 'Upgrade All Powers':
                    displaySymbol(this.layer,-7,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-7,0,17,0,0.3,this.fade)
                    displaySymbol(this.layer,8,-7,7,0,0.6,this.fade)
                    displaySymbol(this.layer,8,7,21,0,0.6,this.fade)
                break
                case '10 Max HP':
                    displaySymbol(this.layer,0,-6,10,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('10',0,12)
                break
                case 'Death Boost':
                    displaySymbol(this.layer,-8,0,22,0,0.5,this.fade)
                    displaySymbol(this.layer,6,-8,8,0,0.7,this.fade)
                    displaySymbol(this.layer,6,8,9,0,0.7,this.fade)
                break
                case '15 Card Draw':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,-4,8,0,0.8,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('15',-8,0)
                break
                case 'Emergency Heal':
                    displaySymbol(this.layer,-10,-4,2,0,0.6,this.fade)
                    displaySymbol(this.layer,7,-7,3,0,0.4,this.fade)
                    displaySymbol(this.layer,7,4,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('12',-10,-2)
                    this.layer.textSize(8)
                    this.layer.text('<50%',0,12)
                break
                case 'Power Cost Reduce':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    if(variants.mtg){
                        displayMtgManaSymbol(this.layer,-8,0,-1,0,0.56,this.fade,-1,[])
                    }else{
                        displaySymbol(this.layer,-8,0,9,0,0.7,this.fade)
                    }
                    displaySymbol(this.layer,8,-4,8,0,0.8,this.fade)
                    displaySymbol(this.layer,8,-4,21,0,0.5,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('-1',-8,0)
                break
                case 'Starting Buffer':
                    displaySymbol(this.layer,-8,0,44,0,1.5,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Selective Redraw':
                    displaySymbol(this.layer,-8,0,14,0,1.2,this.fade)
                    displaySymbol(this.layer,-8,0,8,0,1.2,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                    this.layer.textSize(8)
                    this.layer.text('1',-8,1)
                break
                case 'No Weak':
                    displaySymbol(this.layer,0,0,24,0,1,this.fade)
                    displaySymbol(this.layer,0,0,16,0,1.2,this.fade)
                break
                case 'No Frail':
                    displaySymbol(this.layer,0,0,25,0,1,this.fade)
                    displaySymbol(this.layer,0,0,16,0,1.2,this.fade)
                break
                case 'No Vulnerable':
                    displaySymbol(this.layer,0,0,26,0,1,this.fade)
                    displaySymbol(this.layer,0,0,16,0,1.2,this.fade)
                break
                case 'Retain Block':
                    displaySymbol(this.layer,0,-4,27,0,1,this.fade)
                    displaySymbol(this.layer,0,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(8)
                    this.layer.text('-20',0,-4)
                break
                case 'Power Heal':
                    displaySymbol(this.layer,-8,-4,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,-4,21,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,10,4,0,0.6,this.fade)
                    displaySymbol(this.layer,8,0,2,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',8,0)
                break
                case 'Retain Energy':
                    displaySymbol(this.layer,-10,-4,9,0,0.8,this.fade)
                    displaySymbol(this.layer,10,-4,9,0,0.8,this.fade)
                    displaySymbol(this.layer,0,8,4,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',0,-4)
                break
                case '16 Max HP':
                    displaySymbol(this.layer,0,-6,10,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('16',0,12)
                break
                case '600 Currency':
                    displaySymbol(this.layer,0,0,28,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('600',0,0)
                break
                case 'First Attack':
                    displaySymbol(this.layer,-8,0,29,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('8',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Upgrade Random Attacks':
                    displaySymbol(this.layer,-7,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,-7,7,0,0.6,this.fade)
                    displaySymbol(this.layer,8,7,18,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',-7,0)
                break
                case 'Upgrade Random Defense':
                    displaySymbol(this.layer,-7,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,-7,7,0,0.6,this.fade)
                    displaySymbol(this.layer,8,7,19,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',-7,0)
                break
                case 'Upgrade Random Movement':
                    displaySymbol(this.layer,-7,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,-7,7,0,0.6,this.fade)
                    displaySymbol(this.layer,8,7,20,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',-7,0)
                break
                case 'Upgrade Random Powers':
                    displaySymbol(this.layer,-7,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,-7,7,0,0.6,this.fade)
                    displaySymbol(this.layer,8,7,21,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',-7,0)
                break
                case 'Starting Block':
                    displaySymbol(this.layer,-8,0,27,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('10',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'No Attack Energy':
                    displaySymbol(this.layer,-8,0,18,0,0.75,this.fade)
                    displaySymbol(this.layer,-8,0,16,0,0.8,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    displaySymbol(this.layer,8,-3,9,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',8,-3)
                break
                case 'Rest Energy':
                    displaySymbol(this.layer,0,-6,9,0,1,this.fade)
                    displaySymbol(this.layer,0,10,32,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',0,-6)
                break
                case 'Damage Taken Draw':
                    displaySymbol(this.layer,-8,0,33,0,1,this.fade)
                    displaySymbol(this.layer,10,0,8,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',10,0)
                break
                case 'Card Add Currency':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,17,0,0.3,this.fade)
                    displaySymbol(this.layer,8,-5,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('20',8,10)
                break
                case 'Turn 2 Block':
                    displaySymbol(this.layer,-8,0,27,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('16',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('2',8,-3)
                break
                case '8 Attack Strength':
                    displaySymbol(this.layer,-7,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-7,0,18,0,0.8,this.fade)
                    displaySymbol(this.layer,10,0,11,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('8',-7,0)
                    this.layer.text('1',10,0)
                break
                case '8 Attack Dexterity':
                    displaySymbol(this.layer,-7,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-7,0,18,0,0.8,this.fade)
                    displaySymbol(this.layer,10,0,12,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('8',-7,0)
                    this.layer.text('1',10,0)
                break
                case '3 Attack Block':
                    displaySymbol(this.layer,-7,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-7,0,18,0,0.8,this.fade)
                    displaySymbol(this.layer,10,0,27,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',-7,0)
                    this.layer.text('4',10,0)
                break
                case 'Boss Heal':
                    displaySymbol(this.layer,-8,0,35,0,0.25,this.fade)
                    displaySymbol(this.layer,10,0,2,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(8)
                    this.layer.text('100%',10,0)
                break
                case 'Extra Card Option':
                    displaySymbol(this.layer,-8,0,17,0,0.5,this.fade)
                    displaySymbol(this.layer,8,0,8,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',8,0)
                break
                case 'Max HP Rest':
                    displaySymbol(this.layer,0,-6,10,0,0.5,this.fade)
                    displaySymbol(this.layer,0,10,32,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('8',0,-6)
                break
                case 'Damage Block Next Turn':
                    displaySymbol(this.layer,-8,0,33,0,0.8,this.fade)
                    displaySymbol(this.layer,10,0,27,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',10,0)
                break
                case 'Skip Card Max HP':
                    displaySymbol(this.layer,-8,0,16,0,0.8,this.fade)
                    displaySymbol(this.layer,-8,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,-8,0,17,0,0.4,this.fade)
                    displaySymbol(this.layer,10,0,10,0,0.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',10,0)
                break
                case 'Strike Damage':
                    displaySymbol(this.layer,-10,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,0,18,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('S',-10,0)
                    this.layer.text('+2',8,0)
                break
                case 'Unplayed Card Block':
                    displaySymbol(this.layer,-10,0,27,0,1,this.fade)
                    displaySymbol(this.layer,8,-4,8,0,1,this.fade)
                    displaySymbol(this.layer,8,10,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-10,0)
                break
                case 'Shivs':
                    displaySymbol(this.layer,-8,0,36,0,0.8,this.fade)
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Healing Boost':
                    displaySymbol(this.layer,0,0,2,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('+50%',0,0)
                break
                case 'No Card Draw':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,0,8,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('0',-8,0)
                    this.layer.text('1',8,0)
                break
                case 'Damage Decrease':
                    displaySymbol(this.layer,0,0,18,0,1.2,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('-1',0,0)
                break
                case 'Damage Threshold':
                    displaySymbol(this.layer,-9,0,18,0,1,this.fade)
                    displaySymbol(this.layer,9,0,18,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('<5',-9,0)
                    this.layer.text('1',9,0)
                break
                case 'Starting Armor':
                    displaySymbol(this.layer,-8,0,37,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('4',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Relic Rest':
                    displaySymbol(this.layer,0,-6,1,0,0.75,this.fade)
                    displaySymbol(this.layer,0,10,32,0,1,this.fade)
                break
                case 'Remove Rest':
                    displaySymbol(this.layer,0,-6,8,0,0.75,this.fade)
                    displaySymbol(this.layer,0,-6,16,0,0.75,this.fade)
                    displaySymbol(this.layer,0,10,32,0,1,this.fade)
                break
                case 'Strength Rest':
                    displaySymbol(this.layer,0,-6,11,0,0.75,this.fade)
                    displaySymbol(this.layer,0,10,32,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',0,-6)
                break
                case 'Always Counter':
                    displaySymbol(this.layer,0,0,38,0,1.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('3',0,0)
                break
                case 'Card Rest':
                    displaySymbol(this.layer,0,-6,8,0,1,this.fade)
                    displaySymbol(this.layer,0,-6,17,0,0.4,this.fade)
                    displaySymbol(this.layer,0,10,32,0,1,this.fade)
                break
                case '12 Attack Damage':
                    displaySymbol(this.layer,-7,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-7,0,18,0,0.8,this.fade)
                    displaySymbol(this.layer,10,0,39,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('12',-7,0)
                    this.layer.text('1',10,0)
                break
                case '12 Attack Energy':
                    displaySymbol(this.layer,-7,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-7,0,18,0,0.8,this.fade)
                    displaySymbol(this.layer,10,0,9,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('12',-7,0)
                    this.layer.text('1',10,0)
                break
                case 'Better Rest Heal':
                    displaySymbol(this.layer,0,-6,2,0,0.75,this.fade)
                    displaySymbol(this.layer,0,10,32,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('10',0,-6)
                break
                case 'Cancel Curse':
                    displaySymbol(this.layer,0,0,8,0,1.2,this.fade)
                    displaySymbol(this.layer,0,0,40,0,1,this.fade)
                    displaySymbol(this.layer,0,0,16,0,1.2,this.fade)
                break
                case 'Large Bag':
                    displaySymbol(this.layer,-8,0,30,0,0.6,this.fade)
                    displaySymbol(this.layer,8,0,30,0,0.6,this.fade)
                break
                case 'Base Block':
                    displaySymbol(this.layer,-8,-2,27,0,0.8,this.fade)
                    displaySymbol(this.layer,-8,-2,16,0,0.8,this.fade)
                    displaySymbol(this.layer,10,-2,27,0,0.8,this.fade)
                    displaySymbol(this.layer,1,12,4,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('6',10,-2)
                break
                case 'Block Damage':
                    displaySymbol(this.layer,0,0,27,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,18,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('4',0,0)
                break
                case '3 Turn Draw':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,7,10,4,0,0.6,this.fade)
                    displaySymbol(this.layer,7,-10,5,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('3',7,1)
                break
                case 'Attacking Defense':
                    displaySymbol(this.layer,-9,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-9,0,18,0,0.8,this.fade)
                    displaySymbol(this.layer,9,0,42,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',9,0)
                break
                case 'Turn 2 Energy':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('2',8,-3)
                break
                case '3 Defense Metallicize':
                    displaySymbol(this.layer,-7,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-7,0,19,0,0.8,this.fade)
                    displaySymbol(this.layer,10,0,43,0,1.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',-7,0)
                    this.layer.text('2',10,0)
                break
                case 'Unblocked Weaken':
                    displaySymbol(this.layer,-8,0,27,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,0,18,0,1,this.fade)
                    displaySymbol(this.layer,9,0,24,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',9,0)
                break
                case 'Blocked Weaken':
                    displaySymbol(this.layer,-8,0,27,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,18,0,0.6,this.fade)
                    displaySymbol(this.layer,9,0,24,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',9,0)
                break
                case 'Retain Card Block':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,49,0,1,this.fade)
                    displaySymbol(this.layer,8,0,27,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('4',8,0)
                break
                case 'Better Items':
                    displaySymbol(this.layer,0,-6,30,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2x',0,10)
                break
                case '16 Defense Buffer':
                    displaySymbol(this.layer,-7,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-7,0,19,0,0.8,this.fade)
                    displaySymbol(this.layer,10,0,44,0,1.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('16',-7,0)
                    this.layer.text('1',10,0)
                break
                case 'Important Enemies':
                    displaySymbol(this.layer,-9,0,3,0,0.5,this.fade)
                    displaySymbol(this.layer,9,0,34,0,0.5,this.fade)
                break
                case 'Item Reuse':
                    displaySymbol(this.layer,-7,0,30,0,0.8,this.fade)
                    displaySymbol(this.layer,11,0,30,0,0.6,this.fade)
                break
                case 'Revive':
                    displaySymbol(this.layer,-9,-4,22,0,0.5,this.fade)
                    displaySymbol(this.layer,9,-4,2,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('50%',0,12)
                break
                case 'Low Play Draw':
                    displaySymbol(this.layer,-9,0,8,0,0.75,this.fade)
                    displaySymbol(this.layer,-9,0,16,0,0.75,this.fade)
                    displaySymbol(this.layer,9,0,8,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('4',-9,0)
                    this.layer.text('2',9,0)
                break
                case 'Item Collector':
                    displaySymbol(this.layer,-9,0,3,0,0.5,this.fade)
                    displaySymbol(this.layer,9,0,30,0,0.6,this.fade)
                break
                case 'Block Collection':
                    displaySymbol(this.layer,-10,0,27,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    displaySymbol(this.layer,13,-1,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('4',-10,0)
                    this.layer.textSize(15)
                    this.layer.text('2',2,-1)
                break
                case 'Free Shop Relic':
                    displaySymbol(this.layer,0,0,1,0,1.4,this.fade)
                    displaySymbol(this.layer,0,0,28,0,0.75,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('0',0,1)
                break
                case 'First Attack Free':
                    displaySymbol(this.layer,0,0,45,0,2.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case 'First Card Double Play':
                    displaySymbol(this.layer,0,0,46,0,3,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case 'Per Enemy Block':
                    displaySymbol(this.layer,-10,0,27,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    displaySymbol(this.layer,6,-4,3,0,0.4,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-10,0)
                break
                case '2 Turn Half Damage':
                    displaySymbol(this.layer,0,0,47,0,2.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',0,0)
                break
                case '8 Turn Intangible':
                    displaySymbol(this.layer,-8,-2,48,0,1,this.fade)
                    displaySymbol(this.layer,7,10,4,0,0.6,this.fade)
                    displaySymbol(this.layer,7,-10,5,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('8',7,1)
                break
                case 'No Shop Currency':
                    displaySymbol(this.layer,-8,0,16,0,0.6,this.fade)
                    displaySymbol(this.layer,9,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('$',-8,1)
                    this.layer.textSize(10)
                    this.layer.text('20',9,0)
                break
                case 'Shop Heal':
                    displaySymbol(this.layer,6,0,2,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('$',-10,0)
                    this.layer.textSize(10)
                    this.layer.text('10',6,0)
                break
                case 'Shop Energy':
                    displaySymbol(this.layer,6,0,9,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('$',-8,0)
                    this.layer.textSize(10)
                    this.layer.text('2',6,0)
                break
                case 'Death Strength':
                    displaySymbol(this.layer,-8,0,22,0,0.5,this.fade)
                    displaySymbol(this.layer,8,0,11,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',8,0)
                break
                case 'Death Dexterity':
                    displaySymbol(this.layer,-8,0,22,0,0.5,this.fade)
                    displaySymbol(this.layer,8,0,12,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',8,0)
                break
                case 'Weak Elites':
                    displaySymbol(this.layer,-12,0,34,0,0.4,this.fade)
                    displaySymbol(this.layer,8,0,2,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('-20%',8,0)
                break
                case 'Card Service Discount':
                    displaySymbol(this.layer,0,-7,8,0,0.75,this.fade)
                    displaySymbol(this.layer,0,-7,16,0,0.75,this.fade)
                    displaySymbol(this.layer,-1.75,-7,7,0,0.3,this.fade)
                    displaySymbol(this.layer,1.75,-7,7,0,0.3,this.fade)
                    displaySymbol(this.layer,0,11,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(6)
                    this.layer.text('-50%',0,11)
                break
                case 'Visible Unknown':
                    displaySymbol(this.layer,8,0,120,0,2,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(20)
                    this.layer.text('?',-8,0)
                break
                case 'Unknown Heal':
                    displaySymbol(this.layer,8,0,2,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(20)
                    this.layer.text('?',-8,0)
                    this.layer.textSize(10)
                    this.layer.text('5',8,0)
                break
                case 'Running Block':
                    displaySymbol(this.layer,0,-6,27,0,1,this.fade)
                    displaySymbol(this.layer,0,10,20,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',0,-6)
                break
                case 'Skip Card Currency':
                    displaySymbol(this.layer,-8,0,16,0,0.8,this.fade)
                    displaySymbol(this.layer,-8,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,-8,0,17,0,0.4,this.fade)
                    displaySymbol(this.layer,11,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('10',11,0)
                break
                case 'Take 2 Cards':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,17,0,0.4,this.fade)
                    displaySymbol(this.layer,8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,0,17,0,0.4,this.fade)
                break
                case 'Skip Events':
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(20)
                    this.layer.text('?',0,0)
                    displaySymbol(this.layer,0,0,16,0,1,this.fade)
                break
                case 'Remove Max HP':
                    displaySymbol(this.layer,-8,0,16,0,0.8,this.fade)
                    displaySymbol(this.layer,-8,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,10,0,10,0,0.4,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('7',10,0)
                break
                case 'Low Health Strength':
                    displaySymbol(this.layer,-8,-2,2,0,0.6,this.fade)
                    displaySymbol(this.layer,8,-2,11,0,0.6,this.fade)
                    displaySymbol(this.layer,0,10,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',8,-2)
                    this.layer.textSize(8)
                    this.layer.text('<50%',-8,-2)
                break
                case 'Status Immunity':
                    displaySymbol(this.layer,0,0,8,0,1,this.fade)
                    displaySymbol(this.layer,0,0,51,0,1,this.fade)
                    displaySymbol(this.layer,0,0,16,0,1,this.fade)
                break
                case 'Early Initiative':
                    displaySymbol(this.layer,-10,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-10,0,13,0,0.8,this.fade)
                    displaySymbol(this.layer,10,0,8,0,1,this.fade)
                    displaySymbol(this.layer,10,0,13,0,0.8,this.fade)
                    displaySymbol(this.layer,0,12,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('1',0,1)
                break
                case 'Less Fatigue':
                    displaySymbol(this.layer,-4,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,-4,0,51,0,0.8,this.fade)
                    displaySymbol(this.layer,-4,0,16,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('1',12,0)
                break
                case 'More Stashes':
                    displaySymbol(this.layer,-8,0,52,0,0.4,this.fade)
                    displaySymbol(this.layer,8,0,1,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',8,0)
                break
                case 'Upgrade Purchases':
                    displaySymbol(this.layer,-7,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-7,0,17,0,0.3,this.fade)
                    displaySymbol(this.layer,8,-7,7,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('$',7,9)
                break
                case '3 Enemy 1 HP':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,0,3,0,0.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',-8,0)
                    this.layer.text('1',8,0)
                break
                case 'Turn 3 Block':
                    displaySymbol(this.layer,-8,0,27,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('24',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('3',8,-3)
                break
                case 'Exhaust Random':
                    displaySymbol(this.layer,-8,0,54,0,1,this.fade)
                    displaySymbol(this.layer,8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,0,53,0,0.6,this.fade)
                break
                case 'Reuse Card':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,8,0,0.6,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('2',8,-3)
                break
                case 'Always Back Up':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,55,0,1,this.fade)
                    displaySymbol(this.layer,7,4,4,0,0.6,this.fade)
                    displaySymbol(this.layer,7,-4,5,0,0.6,this.fade)
                break
                case 'Death Currency':
                    displaySymbol(this.layer,-8,0,22,0,0.5,this.fade)
                    displaySymbol(this.layer,10,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('20',10,0)
                break
                case 'Double Rest':
                    displaySymbol(this.layer,-8,0,32,0,1,this.fade)
                    displaySymbol(this.layer,8,0,32,0,1,this.fade)
                break
                case 'Buy One Get One':
                    displaySymbol(this.layer,-10,-4,8,0,0.6,this.fade)
                    displaySymbol(this.layer,1,-4,4,0,0.4,this.fade)
                    displaySymbol(this.layer,10,-4,8,0,0.6,this.fade)
                    displaySymbol(this.layer,0,10,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('0',0,10)
                break
                case 'Premium':
                    displaySymbol(this.layer,-9,0,28,0,0.6,this.fade)
                    displaySymbol(this.layer,-9,0,17,0,0.3,this.fade)
                    displaySymbol(this.layer,9,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('20',9,0)
                break
                case 'Planned Attack':
                    displaySymbol(this.layer,-9,-2,8,0,1,this.fade)
                    displaySymbol(this.layer,-9,-2,18,0,0.8,this.fade)
                    displaySymbol(this.layer,9,-2,9,0,0.6,this.fade)
                    displaySymbol(this.layer,0,12,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('-1',9,-2)
                break
                case 'X 2 Increase':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('X',-8,0)
                    this.layer.text('+2',8,0)
                break
                case 'Starting Control':
                    displaySymbol(this.layer,-8,0,56,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Duplicate Card':
                    displaySymbol(this.layer,0,0,89,0,1.5,this.fade)
                break
                case 'Block Break Vulnerable':
                    displaySymbol(this.layer,-8,0,27,0,1.2,this.fade)
                    displaySymbol(this.layer,-8,0,18,0,0.8,this.fade)
                    displaySymbol(this.layer,8,0,26,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',8,0)
                break
                case '10 Max HP Full Heal':
                    displaySymbol(this.layer,-7,-4,10,0,0.5,this.fade)
                    displaySymbol(this.layer,9,-4,2,0,0.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('10',0,12)
                break
                case 'Starting Colorless':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,57,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Relic Pack':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,40,0,1,this.fade)
                    displaySymbol(this.layer,8,0,1,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',8,0)
                break
                case 'Card Hold':
                    displaySymbol(this.layer,0,0,8,0,1.2,this.fade)
                    displaySymbol(this.layer,0,0,49,0,1.2,this.fade)
                break
                case 'View Draw':
                    displaySymbol(this.layer,0,0,8,0,1,this.fade)
                    displaySymbol(this.layer,0,0,7,0,0.6,this.fade)
                    displaySymbol(this.layer,-12,0,6,0,0.8,this.fade)
                    displaySymbol(this.layer,12,0,7,0,0.8,this.fade)
                break
                case 'Innate Card':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,58,1.5,this.fade)
                break
                case 'Energy/Card Choice':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,9,0,17,0,0.3,this.fade)
                break
                case 'Energy/Rest Heal':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,-4,2,0,0.5,this.fade)
                    displaySymbol(this.layer,8,8,32,0,0.6,this.fade)
                break
                case 'Energy/Rest Upgrade':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,-4,8,0,0.75,this.fade)
                    displaySymbol(this.layer,8,-4,7,0,0.4,this.fade)
                    displaySymbol(this.layer,8,8,32,0,0.6,this.fade)
                break
                case 'Energy/Curses':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,0,8,0,0.75,this.fade)
                    displaySymbol(this.layer,8,0,40,0,0.6,this.fade)
                break
                case 'Energy/Currency':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(6)
                    this.layer.text('-50%',9,0)
                break
                case 'Energy/Intent':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,7,-8,59,0,0.5,this.fade)
                    displaySymbol(this.layer,8,4,3,0,0.4,this.fade)
                break
                case 'Energy/Strength':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,-8,11,0,0.5,this.fade)
                    displaySymbol(this.layer,8,4,3,0,0.4,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',8,-8)
                break
                case 'Energy/Items':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,30,0,0.6,this.fade)
                break
                case 'Energy/Draw':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,-6,8,0,0.75,this.fade)
                    displaySymbol(this.layer,8,13,4,0,0.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('-1',8,-6)
                    this.layer.text('2',8,6)
                break
                case 'Energy/Card Limit':
                    displaySymbol(this.layer,-11,0,9,0,0.8,this.fade)
                    displaySymbol(this.layer,8,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,8,0,16,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(8)
                    this.layer.text('>7',8,0)
                break
                case 'Energy/Initiative':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,8,0,0.9,this.fade)
                    displaySymbol(this.layer,9,0,13,0,0.9,this.fade)
                break
                case 'Energy/Fatigue':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,8,0,0.9,this.fade)
                    displaySymbol(this.layer,9,0,60,0,0.9,this.fade)
                break
                case 'Energy/Max HP':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,10,0,0.4,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('10',9,0)
                break
                case 'Energy/Electrocuted':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,8,0,0.9,this.fade)
                    displaySymbol(this.layer,9,0,51,0,0.9,this.fade)
                break
                case 'Energy/Range':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,0,13,0,1.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',8,0)
                break
                case 'Energy/Counter':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,0,38,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',8,0)
                break
                case 'Energy/Enemy Health':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,-8,2,0,0.4,this.fade)
                    displaySymbol(this.layer,8,6,3,0,0.4,this.fade)
                break
                case 'Energy/Dexterity':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,12,0,0.8,this.fade)
                    displaySymbol(this.layer,9,0,16,0,0.6,this.fade)
                break
                case '3 Free Cards':
                    displaySymbol(this.layer,0,0,62,0,2.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',0,0)
                break
                case 'Avoidance':
                    displaySymbol(this.layer,0,0,63,0,1,this.fade)
                    displaySymbol(this.layer,-13,0,20,0,0.6,this.fade)
                    displaySymbol(this.layer,12,0,20,0,0.6,this.fade)
                break
                case 'Remove 6':
                    displaySymbol(this.layer,0,0,8,0,1,this.fade)
                    displaySymbol(this.layer,0,0,16,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('6',0,0)
                break
                case 'Difficulty Energy':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,34,0,0.4,this.fade)
                break
                case 'Large Quick Heal':
                    displaySymbol(this.layer,-10,0,2,0,0.6,this.fade)
                    displaySymbol(this.layer,7,-4,3,0,0.4,this.fade)
                    displaySymbol(this.layer,7,9,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('10',-10,0)
                break
                case 'Transform Basic':
                    displaySymbol(this.layer,-12,0,8,0,0.7,this.fade)
                    displaySymbol(this.layer,-12,0,18,0,0.4,this.fade)
                    displaySymbol(this.layer,0,0,8,0,0.7,this.fade)
                    displaySymbol(this.layer,0,0,19,0,0.4,this.fade)
                    displaySymbol(this.layer,12,0,8,0,0.7,this.fade)
                    displaySymbol(this.layer,12,0,20,0,0.4,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('?',0,14)
                break
                case 'Basic Draw':
                    displaySymbol(this.layer,-8,-2,8,0,0.8,this.fade)
                    displaySymbol(this.layer,8,-2,8,0,0.8,this.fade)
                    displaySymbol(this.layer,0,10,4,0,0.6,this.fade)
                break
                case 'Confused Draw':
                    displaySymbol(this.layer,-12,-4,8,0,0.6,this.fade)
                    displaySymbol(this.layer,0,-4,8,0,0.8,this.fade)
                    displaySymbol(this.layer,12,-4,8,0,0.6,this.fade)
                    displaySymbol(this.layer,0,-4,9,0,0.8,this.fade)
                    displaySymbol(this.layer,0,10,4,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('?',0,-4)
                break
                case 'Much Better Items':
                    displaySymbol(this.layer,0,-6,30,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('5x',0,10)
                break
                case '3 Starting Miracles':
                    displaySymbol(this.layer,-8,0,15,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                    this.layer.textSize(10)
                    this.layer.text('3',-8,0)
                break
                case 'Random':
                    displaySymbol(this.layer,-8,-8,30,0,0.4,this.fade)
                    displaySymbol(this.layer,-8,8,10,0,0.3,this.fade)
                    displaySymbol(this.layer,8,-8,28,0,0.5,this.fade)
                    displaySymbol(this.layer,8,8,8,0,0.6,this.fade)
                    displaySymbol(this.layer,0,0,8,0,0.6,this.fade)
                    displaySymbol(this.layer,0,0,7,0,0.4,this.fade)
                    displaySymbol(this.layer,8,8,17,0,0.3,this.fade)
                break
                case '50 Max HP':
                    displaySymbol(this.layer,0,-6,10,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('50',0,12)
                break
                case 'Upgrade Random Turn':
                    displaySymbol(this.layer,0,-4,8,0,1,this.fade)
                    displaySymbol(this.layer,0,-4,7,0,0.8,this.fade)
                    displaySymbol(this.layer,0,12,4,0,0.8,this.fade)
                break
                case 'Duplicate Random Turn':
                    displaySymbol(this.layer,0,-4,89,0,1,this.fade)
                    displaySymbol(this.layer,0,12,4,0,0.8,this.fade)
                break
                case 'No Heal':
                    displaySymbol(this.layer,0,0,2,0,1,this.fade)
                    displaySymbol(this.layer,0,0,16,0,1.2,this.fade)
                break
                case 'Rarer Rewards':
                    displaySymbol(this.layer,0,-4,8,0,1,this.fade)
                    displaySymbol(this.layer,0,10,64,0,0.5,this.fade)
                break
                case 'More Currency':
                    displaySymbol(this.layer,0,0,28,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('+25%',0,0)
                break
                case 'Currency Per Node':
                    displaySymbol(this.layer,6,0,28,0,0.8,this.fade)
                    displaySymbol(this.layer,-10,0,7,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('10',6,0)
                break
                case 'Random Fatigue Cost Decrease':
                    displaySymbol(this.layer,-8,0,8,0,1.2,this.fade)
                    displaySymbol(this.layer,-8,0,60,0,1.2,this.fade)
                    displaySymbol(this.layer,8,0,9,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('-1',8,0)
                break
                case 'No Effect':
                    this.layer.fill(160,160,40,this.fade)
                    this.layer.rect(-3,-9,3,9)
                    this.layer.rect(-3,9,3,9)
                    this.layer.rect(3,-9,3,9)
                    this.layer.rect(3,9,3,9)
                    this.layer.rect(-9,-3,9,3)
                    this.layer.rect(-9,3,9,3)
                    this.layer.rect(9,-3,9,3)
                    this.layer.rect(9,3,9,3)
                    this.layer.rect(-6,0,3,27)
                    this.layer.rect(6,0,3,27)
                    this.layer.rect(-12,0,3,27)
                    this.layer.rect(12,0,3,27)
                    this.layer.rect(0,-6,27,3)
                    this.layer.rect(0,6,27,3)
                    this.layer.rect(0,-12,27,3)
                    this.layer.rect(0,12,27,3)
                break
                case 'Placeholder':
                    this.layer.fill(100,this.fade)
                    this.layer.quad(-6,-8,-8,-6,6,8,8,6)
                    this.layer.quad(-6,8,-8,6,6,-8,8,-6)
                break
                case 'Energy/Card Size':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,10,0,76,0,0.8,this.fade)
                break
                case 'Elite Relic':
                    displaySymbol(this.layer,-8,0,1,0,0.8,this.fade)
                    displaySymbol(this.layer,10,0,34,0,0.4,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('+2',-8,0)
                break
                case 'Offcolor Card':
                    displaySymbol(this.layer,-11,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,0,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,11,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,-11,0,77,0,0.6,this.fade)
                break
                case 'Take All Cards':
                    displaySymbol(this.layer,-11,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,0,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,11,0,8,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('+',-11,0)
                    this.layer.text('+',0,0)
                    this.layer.text('+',11,0)
                break
                case 'Turn 7 Bomb':
                    displaySymbol(this.layer,-9,0,75,0,1,this.fade)
                    displaySymbol(this.layer,9,0,18,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('52',9,0)
                    this.layer.fill(240,0,0,this.fade)
                    this.layer.text('7',-9,0)
                break
                case 'Range Damage':
                    displaySymbol(this.layer,-9,0,13,0,1.5,this.fade)
                    displaySymbol(this.layer,7,0,18,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2+',-9,0)
                    this.layer.text('+3',7,0)
                break
                case 'Boss Remove':
                    displaySymbol(this.layer,-9,0,35,0,0.25,this.fade)
                    displaySymbol(this.layer,9,0,8,0,0.7,this.fade)
                    displaySymbol(this.layer,9,0,16,0,0.7,this.fade)
                break
                case 'Boss Deluxe Upgrade':
                    displaySymbol(this.layer,-9,0,35,0,0.25,this.fade)
                    displaySymbol(this.layer,9,0,8,0,1,this.fade)
                    displaySymbol(this.layer,7,0,7,0,0.4,this.fade)
                    displaySymbol(this.layer,11,0,7,0,0.4,this.fade)
                break
                case 'Discard Over Draw Energy':
                    displaySymbol(this.layer,-6,-8,8,0,0.8,this.fade)
                    displaySymbol(this.layer,-6,8,8,0,0.8,this.fade)
                    displaySymbol(this.layer,-6,0,6,0,0.4,this.fade)
                    displaySymbol(this.layer,-6,-8,5,0,0.4,this.fade)
                    displaySymbol(this.layer,-6,8,4,0,0.4,this.fade)
                    displaySymbol(this.layer,9,0,9,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',9,0)
                break
                case 'Extra Energy Temporary Strength':
                    displaySymbol(this.layer,-10,-3,9,0,0.8,this.fade)
                    displaySymbol(this.layer,10,-3,41,0,0.8,this.fade)
                    displaySymbol(this.layer,0,8,4,0,0.8,this.fade)
                break
                case 'More Editions':
                    displaySymbol(this.layer,0,-4,88,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('4x',0,12)
                break
                case '3 Random Silvers':
                    displaySymbol(this.layer,0,0,82,0,1.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('3',0,0)
                break
                case '3 Random Foils':
                    displaySymbol(this.layer,0,0,78,0,1.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('3',0,0)
                break
                case '2 Random Holographics':
                    displaySymbol(this.layer,0,0,79,0,1.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('2',0,0)
                break
                case '1 Random Polychrome':
                    displaySymbol(this.layer,0,0,80,0,1.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('1',0,0)
                break
                case '1 Random Negative':
                    displaySymbol(this.layer,0,0,81,0,1.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('1',0,0)
                break
                case '1 Random Erratic':
                    displaySymbol(this.layer,0,0,83,0,1.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('1',0,0)
                break
                case 'Go Into Debt':
                    displaySymbol(this.layer,0,0,40,0,3,this.fade)
                    displaySymbol(this.layer,0,0,28,0,1.2,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('-200',0,0)
                break
                case 'Fragile Strength':
                    displaySymbol(this.layer,0,0,84,0,2,this.fade)
                    displaySymbol(this.layer,-8,0,11,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Purchase Item':
                    displaySymbol(this.layer,4,0,30,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('$',-12,0)
                break
                case 'Unplayed Card Damage':
                    displaySymbol(this.layer,8,-4,8,0,1,this.fade)
                    displaySymbol(this.layer,8,10,4,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,0,29,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,0)
                break
                case 'Shop Reroll':
                    displaySymbol(this.layer,-9,0,14,0,1.6,this.fade)
                    displaySymbol(this.layer,9,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('$',-9,1)
                    this.layer.textSize(10)
                    this.layer.text('50',9,0)
                break
                case 'Last Card Retain':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,-6,49,0,0.8,this.fade)
                    displaySymbol(this.layer,8,6,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,0)
                break
                case 'Draw Over Discard Block':
                    displaySymbol(this.layer,-6,-8,8,0,0.8,this.fade)
                    displaySymbol(this.layer,-6,8,8,0,0.8,this.fade)
                    displaySymbol(this.layer,-6,0,6,0,0.4,this.fade)
                    displaySymbol(this.layer,-6,8,5,0,0.4,this.fade)
                    displaySymbol(this.layer,-6,-8,4,0,0.4,this.fade)
                    displaySymbol(this.layer,9,0,27,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',9,0)
                break
                case 'Rare Draw':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,85,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',8,0)
                break
                case 'Upgrade Played Card':
                    displaySymbol(this.layer,-6,-4,8,0,1,this.fade)
                    displaySymbol(this.layer,-6,-4,7,0,0.8,this.fade)
                    displaySymbol(this.layer,-6,10,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(8)
                    this.layer.text('25%',10,0)
                break
                case 'Odd Turn Block':
                    displaySymbol(this.layer,-8,0,27,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    displaySymbol(this.layer,8,-4,86,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('5',-8,0)
                break
                case 'Even Turn Block':
                    displaySymbol(this.layer,-8,0,27,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    displaySymbol(this.layer,8,-4,87,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('5',-8,0)
                break
                case 'Extra Energy Block':
                    displaySymbol(this.layer,-10,-3,9,0,0.8,this.fade)
                    displaySymbol(this.layer,10,-3,27,0,0.8,this.fade)
                    displaySymbol(this.layer,0,8,4,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('4',10,-3)
                break
                case 'Remove Card Upgrade':
                    displaySymbol(this.layer,-8,0,16,0,0.8,this.fade)
                    displaySymbol(this.layer,-8,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,10,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,10,0,7,0,0.6,this.fade)
                break
                case 'Relic Strength':
                    displaySymbol(this.layer,-8,-6,11,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,6,1,0,0.5,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,-6)
                    this.layer.text('10',-8,6)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Deprecating Damage':
                    displaySymbol(this.layer,-8,0,29,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('16',-8,-4)
                    this.layer.textSize(8)
                    this.layer.text('-1',-8,6)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Boss Edition':
                    displaySymbol(this.layer,-9,0,35,0,0.25,this.fade)
                    displaySymbol(this.layer,9,0,88,0,1,this.fade)
                break
                case 'Boss Duplicate':
                    displaySymbol(this.layer,-9,0,35,0,0.25,this.fade)
                    displaySymbol(this.layer,9,0,89,0,1,this.fade)
                break
                case 'No Attack Double':
                    displaySymbol(this.layer,-8,0,18,0,0.75,this.fade)
                    displaySymbol(this.layer,-8,0,16,0,0.8,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    displaySymbol(this.layer,8,-3,39,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',8,-3)
                break
                case 'Same Card Energy':
                    displaySymbol(this.layer,-6,-8,90,0,0.8,this.fade)
                    displaySymbol(this.layer,-6,8,90,0,0.8,this.fade)
                    displaySymbol(this.layer,8,0,9,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',8,0)
                break
                case 'Ascending Cost Energy':
                    displaySymbol(this.layer,-10,-6,90,0,0.6,this.fade)
                    displaySymbol(this.layer,0,-6,91,0,0.6,this.fade)
                    displaySymbol(this.layer,10,-6,92,0,0.6,this.fade)
                    displaySymbol(this.layer,0,8,9,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',0,8)
                break
                case 'Turn 4 Duplicate':
                    displaySymbol(this.layer,-9,0,89,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('4',8,-3)
                    this.layer.textSize(10)
                    this.layer.text('3',-9,0)
                break
                case 'Speedrunner':
                    displaySymbol(this.layer,-9,0,28,0,0.8,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('5',8,-3)
                    this.layer.textSize(10)
                    this.layer.text('50',-9,0)
                break
                case 'Currency Strength':
                    displaySymbol(this.layer,-8,-7,11,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,6,28,0,0.6,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',-8,-7)
                    this.layer.textSize(8)
                    this.layer.text('500',-8,6)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case '1000 Currency Currency Per Node':
                    displaySymbol(this.layer,4,-9,28,0,0.6,this.fade)
                    displaySymbol(this.layer,4,9,28,0,0.6,this.fade)
                    displaySymbol(this.layer,-10,0,7,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('40',4,-9)
                    this.layer.textSize(5)
                    this.layer.text('≥1000',4,9)
                break
                case 'Copy First Relic':
                    displaySymbol(this.layer,-8,-4,16,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,-4,1,0,0.4,this.fade)
                    displaySymbol(this.layer,8,-4,1,0,0.5,this.fade)
                    displaySymbol(this.layer,8,-4,5,0,0.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2x',0,10)
                break
                case 'Movement Remove Currency':
                    displaySymbol(this.layer,-8,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,-8,0,13,0,0.8,this.fade)
                    displaySymbol(this.layer,-8,0,16,0,0.8,this.fade)
                    displaySymbol(this.layer,11,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(8)
                    this.layer.text('400',11,0)
                break
                case 'Energy/Shinies':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,88,0,0.8,this.fade)
                break
                case 'Energy/Unupgrade':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,9,0,6,0,0.48,this.fade)
                break
                case 'Random Arcana':
                    displaySymbol(this.layer,0,0,8,0,1.2,this.fade)
                    displaySymbol(this.layer,0,0,99,0,1,this.fade)
                break
                case 'Free Common':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,100,0,0.7,this.fade)
                    displaySymbol(this.layer,8,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('0',8,1)
                break
                case 'Copy Random Relic':
                    displaySymbol(this.layer,-8,-4,16,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,-4,1,0,0.4,this.fade)
                    displaySymbol(this.layer,8,-4,1,0,0.5,this.fade)
                    displaySymbol(this.layer,8,-4,53,0,0.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2x',0,10)
                break
                case 'Anti-Innate Card':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,98,1.5,this.fade)
                break
                case 'Double Upgraded Card Rewards':
                    displaySymbol(this.layer,-12,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,-14.5,0,7,0,0.4,this.fade)
                    displaySymbol(this.layer,-9.5,0,7,0,0.4,this.fade)
                    displaySymbol(this.layer,0,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,12,0,8,0,0.8,this.fade)
                break
                case 'Item Card Draw':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,30,0,0.4,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'World 3 Currency':
                    displaySymbol(this.layer,-8,0,28,0,0.8,this.fade)
                    displaySymbol(this.layer,10,0,97,0,1.2,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(8)
                    this.layer.text('1000',-8,0)
                break
                case 'Energy/Enemy Buffer':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,44,0,1.2,this.fade)
                break
                case 'Last Card Free':
                    displaySymbol(this.layer,0,0,4,0,1.2,this.fade)
                    displaySymbol(this.layer,0,0,8,0,1.2,this.fade)
                    displaySymbol(this.layer,0,0,9,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('0',0,0)
                break
                case 'Starting Conditioning':
                    displaySymbol(this.layer,-8,0,96,0,2,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Uncommon Attack Heal':
                    displaySymbol(this.layer,-8,-4,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,-4,18,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,-4,95,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,10,4,0,0.6,this.fade)
                    displaySymbol(this.layer,8,0,2,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',8,0)
                break
                case 'Energy/Relics':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,11,0,1,0,0.4,this.fade)
                    displaySymbol(this.layer,5,-10,1,0,0.4,this.fade)
                    displaySymbol(this.layer,5,10,1,0,0.4,this.fade)
                break
                case 'Odd Turn Single Damage Up':
                    displaySymbol(this.layer,-8,0,29,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    displaySymbol(this.layer,8,-4,86,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('4',-8,0)
                break
                case 'Energy/Anti-Control':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,93,0,1.2,this.fade)
                break
                case 'Defensive Metallicize':
                    displaySymbol(this.layer,0,0,94,0,1.8,this.fade)
                    displaySymbol(this.layer,0,0,43,0,1,this.fade)
                break
                case 'Compact/Lose First Relic':
                    displaySymbol(this.layer,-5,-2,8,0,1.2,this.fade)
                    displaySymbol(this.layer,5,2,8,0,1.2,this.fade)
                    displaySymbol(this.layer,0,0,1,0,0.8,this.fade)
                break
                case 'Medic Death Remove':
                    displaySymbol(this.layer,-8,7,2,0,0.4,this.fade)
                    displaySymbol(this.layer,-8,-7,3,0,0.4,this.fade)
                    displaySymbol(this.layer,9,0,8,0,0.7,this.fade)
                    displaySymbol(this.layer,9,0,16,0,0.7,this.fade)
                break
                case 'More Boss Rewards':
                    displaySymbol(this.layer,-9,0,35,0,0.25,this.fade)
                    displaySymbol(this.layer,9,-7,8,0,0.7,this.fade)
                    displaySymbol(this.layer,9,7,28,0,0.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(5)
                    this.layer.text('+50%',9,7)
                break
                case 'Edition Deluxe Upgrades':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,88,0,1.5,this.fade)
                    displaySymbol(this.layer,-3,0,7,0,0.6,this.fade)
                    displaySymbol(this.layer,3,0,7,0,0.6,this.fade)
                break
                case 'Energy/Visible Energy':
                    displaySymbol(this.layer,-9,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,9,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('?',9,0)
                break
                case 'Edition Block':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,88,0,1,this.fade)
                    displaySymbol(this.layer,9,0,27,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',9,0)
                break
                case 'Sell Relic':
                    displaySymbol(this.layer,0,0,1,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('+',0,1)
                break
                case 'Starting Draw Retain':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,49,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Booster Pack Choice':
                    displaySymbol(this.layer,-14,0,8,0,0.6,this.fade)
                    displaySymbol(this.layer,14,0,8,0,0.6,this.fade)
                    displaySymbol(this.layer,0,0,103,0,1.2,this.fade)
                break
                case 'Paper Items':
                    displaySymbol(this.layer,-8,0,104,0,1.5,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Boss Spectral Pack':
                    displaySymbol(this.layer,-9,0,35,0,0.25,this.fade)
                    displaySymbol(this.layer,9,0,103,0,1,this.fade)
                break
                case 'Random Enemy Statuses':
                    displaySymbol(this.layer,-8,0,105,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Energy/Miss':
                    displaySymbol(this.layer,-9,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,106,0,1,this.fade)
                break
                case 'Energy/View':
                    displaySymbol(this.layer,-9,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,0,107,0,1,this.fade)
                break
                case 'Spectral Rest':
                    displaySymbol(this.layer,0,-6,103,0,1,this.fade)
                    displaySymbol(this.layer,0,10,32,0,1,this.fade)
                break
                case '3 Cost Energy Next Turn':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,9,0,0.6,this.fade)
                    displaySymbol(this.layer,8,-4,9,0,0.8,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',-8,0)
                    this.layer.text('1',8,-4)
                break
                case '25 Damage Draw':
                    displaySymbol(this.layer,-8,0,18,0,1,this.fade)
                    displaySymbol(this.layer,10,0,8,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('25',-8,0)
                    this.layer.text('1',10,0)
                break
                case 'Random Polychrome Colorless':
                    displaySymbol(this.layer,0,0,80,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,57,0,1,this.fade)
                break
                case '69':
                    displaySymbol(this.layer,-7,-7,41,0,0.8,this.fade)
                    displaySymbol(this.layer,-7,9,27,0,0.8,this.fade)
                    displaySymbol(this.layer,8,1,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('4',-7,-7)
                    this.layer.text('20',-7,9)
                    this.layer.text('6',8,-8)
                    this.layer.text('9',8,10)
                break
                case 'Polychrome Erratics':
                    displaySymbol(this.layer,-6,-3,80,0,1.2,this.fade)
                    displaySymbol(this.layer,6,3,83,0,1.2,this.fade)
                break
                case '2 Tile Move Draw':
                    displaySymbol(this.layer,0,-6,8,0,1,this.fade)
                    displaySymbol(this.layer,0,10,20,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',0,-6)
                    this.layer.text('2',0,10)
                break
                case 'Fatigue Draw':
                    displaySymbol(this.layer,-8,0,60,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,0,8,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',8,0)
                break
                case 'Extra Energy Double Damage':
                    displaySymbol(this.layer,-10,-3,9,0,0.8,this.fade)
                    displaySymbol(this.layer,10,-3,39,0,0.8,this.fade)
                    displaySymbol(this.layer,0,8,4,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',-10,-3)
                break
                case 'Health Loss Currency':
                    displaySymbol(this.layer,0,0,18,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,28,0,0.75,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',0,0)
                break
                case 'Rest Cost Down':
                    displaySymbol(this.layer,0,-6,8,0,1,this.fade)
                    displaySymbol(this.layer,0,-6,9,0,0.6,this.fade)
                    displaySymbol(this.layer,0,-6,6,0,0.4,this.fade)
                    displaySymbol(this.layer,0,10,32,0,1,this.fade)
                break
                case '3 Enemy Stun':
                    displaySymbol(this.layer,-8,4,3,0,0.45,this.fade)
                    displaySymbol(this.layer,9,0,69,0,0.9,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',-8,-9)
                    this.layer.text('2',9,0)
                break
                case 'Fragile Damage Up':
                    displaySymbol(this.layer,-8,0,109,0,1.5,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Starting Madness':
                    displaySymbol(this.layer,-8,0,110,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Elite Max HP':
                    displaySymbol(this.layer,-8,0,34,0,0.5,this.fade)
                    displaySymbol(this.layer,9,0,10,0,0.4,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('5',9,0)
                break
                case 'Event Immunity':
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(20)
                    this.layer.text('?',-10,0)
                    displaySymbol(this.layer,7,0,18,0,0.7,this.fade)
                    displaySymbol(this.layer,7,0,16,0,0.8,this.fade)
                break
                case 'Standard Card Reward':
                    displaySymbol(this.layer,-10,-2,8,0,0.8,this.fade)
                    displaySymbol(this.layer,6,-2,8,0,0.8,this.fade)
                    displaySymbol(this.layer,-8,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,8,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,-6,2,8,0,0.8,this.fade)
                    displaySymbol(this.layer,10,2,8,0,0.8,this.fade)
                break
                case 'Starting Upgrade':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,7,0,0.6,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Poor Rest Heal':
                    displaySymbol(this.layer,-8,-4,28,0,0.7,this.fade)
                    displaySymbol(this.layer,10,-4,2,0,0.6,this.fade)
                    displaySymbol(this.layer,0,12,32,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('20',10,-4)
                    this.layer.textSize(6)
                    this.layer.text('≤500',-8,-4)
                break
                case 'Shop Currency':
                    displaySymbol(this.layer,6,0,28,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('$',-10,0)
                    this.layer.textSize(10)
                    this.layer.text('50',6,0)
                break
                case 'Cheap Basics':
                    displaySymbol(this.layer,-9,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-9,0,108,0,1,this.fade)
                    if(variants.mtg){
                        displayMtgManaSymbol(this.layer,9,0,-1,0,0.8,this.fade,-1,[])
                    }else{
                        displaySymbol(this.layer,9,0,9,0,1,this.fade)
                    }
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('-1',9,0)
                break
                case 'Currency Rest':
                    displaySymbol(this.layer,0,-6,28,0,0.8,this.fade)
                    displaySymbol(this.layer,0,12,32,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('300',0,-6)
                break
                case 'Energy/Draw Toggle':
                    displaySymbol(this.layer,-8,-6,9,0,0.8,this.fade)
                    displaySymbol(this.layer,8,-6,8,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,-6)
                    this.layer.text('2',8,-6)
                    displaySymbol(this.layer,-8,10,87,0,0.8,this.fade)
                    displaySymbol(this.layer,8,10,86,0,0.8,this.fade)
                break
                case 'Free Uncommon':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,95,0,0.6,this.fade)
                    displaySymbol(this.layer,8,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('0',8,1)
                break
                case 'Free Rare':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,85,0,0.6,this.fade)
                    displaySymbol(this.layer,8,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('0',8,1)
                break
                case 'Cheap Common Colorless':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,57,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,100,0,0.7,this.fade)
                    displaySymbol(this.layer,8,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(6)
                    this.layer.text('-50%',8,1)
                break
                case 'Standard Pack Discount':
                    displaySymbol(this.layer,-8,0,103,0,1,this.fade)
                    displaySymbol(this.layer,8,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(6)
                    this.layer.text('-50%',8,1)
                break
                case 'Colorless Pack Discount':
                    displaySymbol(this.layer,-8,10,57,0,0.9,this.fade)
                    displaySymbol(this.layer,-8,-4,103,0,0.9,this.fade)
                    displaySymbol(this.layer,8,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(6)
                    this.layer.text('-50%',8,1)
                break
                case 'Spectral Pack Discount':
                    displaySymbol(this.layer,-8,10,113,0,0.9,this.fade)
                    displaySymbol(this.layer,-8,-4,103,0,0.9,this.fade)
                    displaySymbol(this.layer,8,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(6)
                    this.layer.text('-50%',8,1)
                break
                case 'Prism Pack Discount':
                    displaySymbol(this.layer,-8,10,114,0,0.9,this.fade)
                    displaySymbol(this.layer,-8,-4,103,0,0.9,this.fade)
                    displaySymbol(this.layer,8,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(6)
                    this.layer.text('-50%',8,1)
                break
                case 'Add Card Max HP':
                    displaySymbol(this.layer,-9,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,-9,0,17,0,0.3,this.fade)
                    displaySymbol(this.layer,8,0,10,0,0.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',8,0)
                break
                case 'Innate Attack':
                    displaySymbol(this.layer,-6,0,8,0,1.2,this.fade)
                    displaySymbol(this.layer,-6,0,18,0,0.6,this.fade)
                    displaySymbol(this.layer,10,0,58,1.2,this.fade)
                break
                case 'Innate Defense':
                    displaySymbol(this.layer,-6,0,8,0,1.2,this.fade)
                    displaySymbol(this.layer,-6,0,19,0,0.6,this.fade)
                    displaySymbol(this.layer,10,0,58,1.2,this.fade)
                break
                case 'Innate Movement':
                    displaySymbol(this.layer,-6,0,8,0,1.2,this.fade)
                    displaySymbol(this.layer,-6,0,20,0,0.6,this.fade)
                    displaySymbol(this.layer,10,0,58,1.2,this.fade)
                break
                case 'Innate Power':
                    displaySymbol(this.layer,-6,0,8,0,1.2,this.fade)
                    displaySymbol(this.layer,-6,0,21,0,0.6,this.fade)
                    displaySymbol(this.layer,10,0,58,1.2,this.fade)
                break
                case 'Fatigue Block':
                    displaySymbol(this.layer,-8,0,60,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,0,27,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',8,0)
                break
                case 'Energy/Chance':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,9,0,0.8,this.fade)
                    displaySymbol(this.layer,9,0,115,0,1,this.fade)
                break
                case 'Energy/Hard Elites':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,-8,11,0,0.5,this.fade)
                    displaySymbol(this.layer,8,4,34,0,0.4,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('5',8,-8)
                break
                case 'Energy/Blind':
                    displaySymbol(this.layer,-9,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,0,116,0,0.4,this.fade)
                break
                case 'Energy/Immediate Currency':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(6)
                    this.layer.text('-600',9,0)
                break
                case 'Energy/Healing':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,2,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(6)
                    this.layer.text('-50%',9,0)
                break
                case 'Energy/Trough':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,8,0,0.9,this.fade)
                    displaySymbol(this.layer,9,0,117,0,0.9,this.fade)
                break
                case 'Energy/Fatigue Draw':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,7,-8,8,0,0.6,this.fade)
                    displaySymbol(this.layer,7,8,8,0,0.6,this.fade)
                    displaySymbol(this.layer,7,-8,60,0,0.6,this.fade)
                    displaySymbol(this.layer,7,0,7,0,0.3,this.fade)
                break
                case 'Energy/Ducks':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,0,118,0,0.4,this.fade)
                break
                case 'Energy/Crit Fail':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,18,0,0.8,this.fade)
                    displaySymbol(this.layer,9,0,115,0,1,this.fade)
                break
                case 'Energy/Elite Relics':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,-7,1,0,0.5,this.fade)
                    displaySymbol(this.layer,8,7,34,0,0.3,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('-1',8,-7)
                break
                case 'Always Deluxe Upgrade':
                    displaySymbol(this.layer,0,-6,8,0,1,this.fade)
                    displaySymbol(this.layer,-2,-6,7,0,0.4,this.fade)
                    displaySymbol(this.layer,2,-6,7,0,0.4,this.fade)
                    displaySymbol(this.layer,0,10,32,0,1,this.fade)
                break
                case 'Any 5 Rare Cards':
                    displaySymbol(this.layer,-3,-6,8,0,1,this.fade)
                    displaySymbol(this.layer,-5,-6,7,0,0.4,this.fade)
                    displaySymbol(this.layer,-1,-6,7,0,0.4,this.fade)
                    displaySymbol(this.layer,-3,10,114,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('5',10,2)
                break
                case 'First Free':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,9,0,0.8,this.fade)
                    displaySymbol(this.layer,8,-3,8,0,0.8,this.fade)
                    displaySymbol(this.layer,8,10,5,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('0',-8,0)
                    this.layer.text('1',8,-3)
                break
                case '3 Card Draw':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,-4,8,0,0.8,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',-8,0)
                break
                case 'Random Double Upgrade':
                    displaySymbol(this.layer,0,-4,8,0,1.25,this.fade)
                    displaySymbol(this.layer,-2.5,-4,7,0,0.5,this.fade)
                    displaySymbol(this.layer,2.5,-4,7,0,0.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('10',0,13)
                break
                case '3 Attack Strength/3 Defense Dexterity':
                    displaySymbol(this.layer,-7,-7,8,0,0.75,this.fade)
                    displaySymbol(this.layer,-7,-7,18,0,0.6,this.fade)
                    displaySymbol(this.layer,-7,9,11,0,0.6,this.fade)
                    displaySymbol(this.layer,7,-7,8,0,0.75,this.fade)
                    displaySymbol(this.layer,7,-7,19,0,0.6,this.fade)
                    displaySymbol(this.layer,7,9,12,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',7,-7)
                    this.layer.text('1',7,9)
                    this.layer.text('3',-7,-7)
                    this.layer.text('1',-7,9)
                break
                case 'Energy Bump':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,-5,9,0,0.8,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',-8,0)
                    this.layer.text('1',8,-5)
                break
                case 'Triochrome':
                    displaySymbol(this.layer,0,0,119,0,1.2,this.fade)
                break
                case '6 Turn Turn':
                    displaySymbol(this.layer,-8,0,75,0,1,this.fade)
                    displaySymbol(this.layer,7,10,4,0,0.6,this.fade)
                    displaySymbol(this.layer,7,-10,5,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('6',7,0)
                break
                case 'Duplicate Per Turn':
                    displaySymbol(this.layer,0,-4,89,0,1,this.fade)
                    displaySymbol(this.layer,0,-4,120,0,1,this.fade)
                    displaySymbol(this.layer,0,12,4,0,0.8,this.fade)
                break
                case 'Cheap Uncommon Colorless':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,57,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,95,0,0.7,this.fade)
                    displaySymbol(this.layer,8,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(6)
                    this.layer.text('-50%',8,1)
                break
                case 'Cheap Rare Colorless':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,57,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,85,0,0.7,this.fade)
                    displaySymbol(this.layer,8,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(6)
                    this.layer.text('-50%',8,1)
                break
                case 'Common Relic Discount':
                    displaySymbol(this.layer,-8,0,1,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,0,100,0,0.7,this.fade)
                    displaySymbol(this.layer,9,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(6)
                    this.layer.text('-50%',9,1)
                break
                case 'Uncommon Relic Discount':
                    displaySymbol(this.layer,-8,0,1,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,0,95,0,0.7,this.fade)
                    displaySymbol(this.layer,9,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(6)
                    this.layer.text('-50%',9,1)
                break
                case 'Rare Relic Discount':
                    displaySymbol(this.layer,-8,0,1,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,0,85,0,0.7,this.fade)
                    displaySymbol(this.layer,9,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(6)
                    this.layer.text('-50%',9,1)
                break
                case 'Shop Relic Discount':
                    displaySymbol(this.layer,-8,0,1,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,0,121,0,0.7,this.fade)
                    displaySymbol(this.layer,9,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(6)
                    this.layer.text('-50%',9,1)
                break
                case 'Energy/Staple':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,0,122,0,0.8,this.fade)
                break
                case 'Sell Value':
                    displaySymbol(this.layer,0,0,1,0,1.2,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(6)
                    this.layer.text('+50%',0,0)
                break
                case 'Rest 10 Turn Block':
                    displaySymbol(this.layer,-10,0,27,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    displaySymbol(this.layer,3,-1,4,0,0.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('10',-10,0)
                    this.layer.text('10',12,-1)
                    displaySymbol(this.layer,0,14,32,0,0.6,this.fade)
                break
                case 'Turn 2 Temporary Strength/Turn 2 Temporary Dexterity':
                    displaySymbol(this.layer,-8,-7,41,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,7,42,0,0.6,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('5',-8,-7)
                    this.layer.text('5',-8,7)
                    this.layer.textSize(15)
                    this.layer.text('2',8,-3)
                break
                case 'Rest Free Card':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,17,0,0.4,this.fade)
                    displaySymbol(this.layer,8,-6,32,0,0.8,this.fade)
                    displaySymbol(this.layer,8,6,32,0,0.8,this.fade)
                break
                case 'Upgrade All Skills':
                    displaySymbol(this.layer,-7,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-7,0,17,0,0.3,this.fade)
                    displaySymbol(this.layer,8,-7,7,0,0.6,this.fade)
                    displaySymbol(this.layer,8,7,123,0,0.6,this.fade)
                break
                case 'Upgrade Random Skills':
                    displaySymbol(this.layer,-7,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,-7,7,0,0.6,this.fade)
                    displaySymbol(this.layer,8,7,123,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',-7,0)
                break
                case 'Innate Skill':
                    displaySymbol(this.layer,-6,0,8,0,1.2,this.fade)
                    displaySymbol(this.layer,-6,0,123,0,0.6,this.fade)
                    displaySymbol(this.layer,10,0,58,1.2,this.fade)
                break
                case '2 Cost Down Per Turn':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,-4,8,0,0.8,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',8,-4)
                    this.layer.text('-1',-8,0)
                break
                case 'Normal Spectrals':
                    displaySymbol(this.layer,-11,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,0,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,11,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,-11,0,113,0,0.6,this.fade)
                break
                case 'Shuffle Miracle':
                    displaySymbol(this.layer,-8,0,15,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,0,14,0,1,this.fade)
                    displaySymbol(this.layer,8,0,8,0,1,this.fade)
                break
                case 'Click to Swap':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,9,4,0,0.6,this.fade)
                    displaySymbol(this.layer,8,3,5,0,0.6,this.fade)
                    displaySymbol(this.layer,8,-6,120,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,0)
                break
                case 'Turn 10 Turn':
                    displaySymbol(this.layer,-8,0,75,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('10',8,-3)
                break
                case 'Turn 5 Buffer':
                    displaySymbol(this.layer,-8,0,44,0,1.5,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('5',8,-3)
                break
                case 'Curse Strength':
                    displaySymbol(this.layer,-8,0,40,0,1.2,this.fade)
                    displaySymbol(this.layer,-8,0,11,0,0.8,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Random Value':
                    displaySymbol(this.layer,0,0,28,0,1,this.fade)
                    displaySymbol(this.layer,0,0,64,0,1,this.fade)
                break
                case 'Glitched Cards':
                    displaySymbol(this.layer,0,0,147,0,1.5,this.fade)
                break
                case 'Click to Block':
                    displaySymbol(this.layer,-6,0,27,0,1,this.fade)
                    displaySymbol(this.layer,10,0,120,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('15',-6,0)
                break
                case 'Click For Energy':
                    displaySymbol(this.layer,-6,0,9,0,1,this.fade)
                    displaySymbol(this.layer,10,0,120,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',-6,0)
                break
                case 'Rest Max HP':
                    displaySymbol(this.layer,-7,0,10,0,0.5,this.fade)
                    displaySymbol(this.layer,10,0,32,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',-7,0)
                break
                case 'Shop Max HP':
                    displaySymbol(this.layer,-6,0,10,0,0.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('$',9,1)
                    this.layer.textSize(10)
                    this.layer.text('2',-6,0)
                break
                case '6 Card 3 Damage All':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,-4,18,0,0.8,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('6',-8,0)
                    this.layer.text('3',8,-4)
                break
                case 'First Enemy Lose Per Turn':
                    displaySymbol(this.layer,-8,-4,3,0,0.5,this.fade)
                    displaySymbol(this.layer,-8,10,120,0,1,this.fade)
                    displaySymbol(this.layer,8,2,148,0,1.2,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',8,2)
                break
                case 'First Enemy Remove Block':
                    displaySymbol(this.layer,-8,-4,3,0,0.5,this.fade)
                    displaySymbol(this.layer,-8,10,120,0,1,this.fade)
                    displaySymbol(this.layer,9,2,27,0,0.6,this.fade)
                    displaySymbol(this.layer,9,2,16,0,0.6,this.fade)
                break
                case 'Low Health Permanent Strength':
                    displaySymbol(this.layer,-8,-2,2,0,0.6,this.fade)
                    displaySymbol(this.layer,8,-2,149,0,0.8,this.fade)
                    displaySymbol(this.layer,0,10,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',8,-2)
                    this.layer.textSize(8)
                    this.layer.text('<5',-8,-2)
                break
                case 'Basic Heal':
                    displaySymbol(this.layer,-9,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-9,0,108,0,1,this.fade)
                    displaySymbol(this.layer,9,0,2,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',9,0)
                break
                case 'Low Play Energy':
                    displaySymbol(this.layer,-9,0,8,0,0.75,this.fade)
                    displaySymbol(this.layer,-9,0,16,0,0.75,this.fade)
                    displaySymbol(this.layer,10,0,9,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('4',-9,0)
                    this.layer.text('1',10,0)
                break
                case 'Booster Pack Upgrade':
                    displaySymbol(this.layer,-8,0,103,0,1,this.fade)
                    displaySymbol(this.layer,8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,0,7,0,0.6,this.fade)
                break
                case 'First Defense Free':
                    displaySymbol(this.layer,0,0,153,0,2.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case 'Energy/Power Vulnerable':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,-6,21,0,0.6,this.fade)
                    displaySymbol(this.layer,8,6,26,0,0.6,this.fade)
                break
                case 'Backwards Move':
                    displaySymbol(this.layer,0,4,150,180,0.6,this.fade)
                break
                case 'Energy/Duplicate Cards':
                    displaySymbol(this.layer,-9,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,0,89,0,1,this.fade)
                break
                case 'Special Draw':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,-3.5,113,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,3.5,99,0,0.5,this.fade)
                    displaySymbol(this.layer,8,0,8,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',8,0)
                break
                case 'Energy/Event Options':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,152,0,1,this.fade)
                break
                case 'Energy/Invisible':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,151,0,1,this.fade)
                break
                case 'Extra Map Path':
                    displaySymbol(this.layer,0,-4,150,0,0.6,this.fade)
                break
                case 'Boss Extra Relic':
                    displaySymbol(this.layer,-8,0,35,0,0.25,this.fade)
                    displaySymbol(this.layer,10,0,1,0,0.5,this.fade)
                break
                case '8 Skill Draw':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,123,0,0.8,this.fade)
                    displaySymbol(this.layer,9,0,8,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('8',-8,0)
                    this.layer.text('2',9,0)
                break
                case '1 Cost Down Per Turn/Energy Gain Block':
                    displaySymbol(this.layer,-8,-4,9,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,-4,8,0,0.8,this.fade)
                    displaySymbol(this.layer,-8,8,4,0,0.6,this.fade)
                    displaySymbol(this.layer,8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,0,27,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('-1',-8,-4)
                    this.layer.text('6',8,0)
                break
                case 'Energy/Shop Relics':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,-7,1,0,0.5,this.fade)
                    displaySymbol(this.layer,8,7,28,0,0.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(6)
                    this.layer.text('x2',8,6.5)
                break
                case 'No Shop Items':
                    displaySymbol(this.layer,-8,0,16,0,0.6,this.fade)
                    displaySymbol(this.layer,9,0,30,0,0.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('$',-8,1)
                break
                case 'Energy/Leftover Energy':
                    displaySymbol(this.layer,0,8,9,0,1,this.fade)
                    displaySymbol(this.layer,-8,-6,9,0,0.75,this.fade)
                    displaySymbol(this.layer,8,-6,2,0,0.5,this.fade)
                    displaySymbol(this.layer,0,-12,4,0,0.4,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(8)
                    this.layer.text('-4',8,-6)
                break
                case 'Turn 1 Energy/Turn 2 Heal/Turn 3 Temporary Strength':
                    displaySymbol(this.layer,-12,-5,9,0,0.6,this.fade)
                    displaySymbol(this.layer,0,-5,2,0,0.4,this.fade)
                    displaySymbol(this.layer,12,-5,41,0,0.6,this.fade)
                    displaySymbol(this.layer,0,15,4,0,0.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-12,-5)
                    this.layer.text('2',0,-5)
                    this.layer.text('3',12,-5)
                    this.layer.textSize(8)
                    this.layer.text('1',-12,8)
                    this.layer.text('2',0,8)
                    this.layer.text('3',12,8)
                break
                case 'Double Foil':
                    displaySymbol(this.layer,0,0,78,0,1.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('x2',0,0)
                break
                case 'Energy Gain Draw':
                    displaySymbol(this.layer,0,0,9,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,8,0,1.25,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case 'Replenish Card':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,154,0.9,this.fade)
                break
                case '3 Turn Duplicate':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,89,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,120,0,1,this.fade)
                    displaySymbol(this.layer,7,10,4,0,0.6,this.fade)
                    displaySymbol(this.layer,7,-10,5,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('3',7,1)
                break
                case '25 Block Draw':
                    displaySymbol(this.layer,-8,0,27,0,1,this.fade)
                    displaySymbol(this.layer,9,0,8,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('25',-8,0)
                    this.layer.text('1',9,0)
                break
                case 'Double Silver':
                    displaySymbol(this.layer,0,0,82,0,1.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('x2',0,0)
                break
                case 'Double First Attack':
                    displaySymbol(this.layer,-8,0,39,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Protocol':
                    displaySymbol(this.layer,-9,0,155,0,1,this.fade)
                break
                case 'Cheap Skills':
                    displaySymbol(this.layer,-9,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-9,0,123,0,0.6,this.fade)
                    displaySymbol(this.layer,9,0,9,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('-1',9,0)
                    this.layer.textSize(6)
                    this.layer.text('50%',-9,0)
                break
                case 'Energy/Colorless':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,10,0,57,0,1.2,this.fade)
                break
                case 'Power Draw':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,21,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',8,0)
                break
                case 'First Turn Mana':
                    displayMtgManaSymbol(this.layer,-8,0,3,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case '5 Turn Mana':
                    displayMtgManaSymbol(this.layer,-8,0,4,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,7,10,4,0,0.6,this.fade)
                    displaySymbol(this.layer,7,-10,5,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('5',7,1)
                break
                case 'Death Boost (M)':
                    displaySymbol(this.layer,-8,0,22,0,0.5,this.fade)
                    displaySymbol(this.layer,6,-8,8,0,0.7,this.fade)
                    displayMtgManaSymbol(this.layer,6,8,5,0,0.56,this.fade,-1,[])
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',6,8)
                break
                case 'Retain Mana':
                    displayMtgManaSymbol(this.layer,-10,-4,-1,0,0.64,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,10,-4,-1,0,0.64,this.fade,-1,[])
                    displaySymbol(this.layer,0,8,4,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',0,-4)
                break
                case 'No Attack Mana':
                    displaySymbol(this.layer,-8,0,18,0,0.75,this.fade)
                    displaySymbol(this.layer,-8,0,16,0,0.8,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    displayMtgManaSymbol(this.layer,10,-3,2,0,0.56,this.fade,-1,[])
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',10,-3)
                break
                case 'Rest Mana':
                    displayMtgManaSymbol(this.layer,-11,-2,1,0,0.48,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,-6,-6,2,0,0.48,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,0,-8,3,0,0.48,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,6,-6,4,0,0.48,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,11,-2,5,0,0.48,this.fade,-1,[])
                    displaySymbol(this.layer,0,10,32,0,1,this.fade)
                break
                case 'Damage Taken Energy':
                    displaySymbol(this.layer,-8,0,33,0,1,this.fade)
                    displaySymbol(this.layer,11,0,9,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',11,0)
                break
                case 'Damage Taken Mana':
                    displaySymbol(this.layer,-8,0,33,0,1,this.fade)
                    displayMtgManaSymbol(this.layer,11,0,1,0,0.64,this.fade,-1,[])
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',11,0)
                break
                case '8 Attack Mana':
                    displaySymbol(this.layer,-7,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-7,0,18,0,0.8,this.fade)
                    displayMtgManaSymbol(this.layer,10,0,1,0,0.64,this.fade,-1,[])
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('8',-7,0)
                    this.layer.text('1',10,0)
                break
                case 'Turn 2 Mana':
                    displayMtgManaSymbol(this.layer,-8,0,0,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('2',8,-3)
                break
                case 'Shop Mana':
                    displayMtgManaSymbol(this.layer,-11,-2,1,0,0.48,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,-6,-6,2,0,0.48,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,0,-8,3,0,0.48,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,6,-6,4,0,0.48,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,11,-2,5,0,0.48,this.fade,-1,[])
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('$',0,10)
                break
                case 'Discard Over Draw Mana':
                    displaySymbol(this.layer,-6,-8,8,0,0.8,this.fade)
                    displaySymbol(this.layer,-6,8,8,0,0.8,this.fade)
                    displaySymbol(this.layer,-6,0,6,0,0.4,this.fade)
                    displaySymbol(this.layer,-6,-8,5,0,0.4,this.fade)
                    displaySymbol(this.layer,-6,8,4,0,0.4,this.fade)
                    displayMtgManaSymbol(this.layer,9,0,4,0,0.64,this.fade,-1,[])
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',9,0)
                break
                case 'Extra Mana Temporary Strength':
                    displayMtgManaSymbol(this.layer,-10,-3,-1,0,0.64,this.fade,-1,[])
                    displaySymbol(this.layer,10,-3,41,0,0.8,this.fade)
                    displaySymbol(this.layer,0,8,4,0,0.8,this.fade)
                break
                case 'Extra Mana Block':
                    displayMtgManaSymbol(this.layer,-10,-3,-1,0,0.64,this.fade,-1,[])
                    displaySymbol(this.layer,10,-3,27,0,0.8,this.fade)
                    displaySymbol(this.layer,0,8,4,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',10,-3)
                break
                case 'Same Card Mana':
                    displaySymbol(this.layer,-6,-8,90,0,0.8,this.fade)
                    displaySymbol(this.layer,-6,8,90,0,0.8,this.fade)
                    displayMtgManaSymbol(this.layer,8,0,0,0,0.64,this.fade,-1,[])
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',8,0)
                break
                case 'Ascending Cost Mana':
                    displaySymbol(this.layer,-10,-6,90,0,0.6,this.fade)
                    displaySymbol(this.layer,0,-6,91,0,0.6,this.fade)
                    displaySymbol(this.layer,10,-6,92,0,0.6,this.fade)
                    displayMtgManaSymbol(this.layer,0,8,0,0,0.48,this.fade,-1,[])
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',0,8)
                break
                case '3 Cost Mana':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displayMtgManaSymbol(this.layer,-8,0,0,0,0.48,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,8,0,0,0,0.72,this.fade,-1,[])
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',-8,0)
                    this.layer.text('1',8,0)
                break
                case 'Extra Mana Double Damage':
                    displayMtgManaSymbol(this.layer,-10,-3,-1,0,0.64,this.fade,-1,[])
                    displaySymbol(this.layer,10,-3,39,0,0.8,this.fade)
                    displaySymbol(this.layer,0,8,4,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',-10,-3)
                break
                case 'Click For Mana':
                    displayMtgManaSymbol(this.layer,-6,0,6,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,10,0,120,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',-6,0)
                break
                case 'Low Play Mana':
                    displaySymbol(this.layer,-9,0,8,0,0.75,this.fade)
                    displaySymbol(this.layer,-9,0,16,0,0.75,this.fade)
                    displayMtgManaSymbol(this.layer,10,0,5,0,0.75,this.fade,-1,[])
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('4',-9,0)
                    this.layer.text('1',10,0)
                break
                case 'Turn 1 Mana/Turn 2 Heal/Turn 3 Temporary Strength':
                    displayMtgManaSymbol(this.layer,-12,-5,6,0,0.48,this.fade,-1,[])
                    displaySymbol(this.layer,0,-5,2,0,0.4,this.fade)
                    displaySymbol(this.layer,12,-5,41,0,0.6,this.fade)
                    displaySymbol(this.layer,0,15,4,0,0.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-12,-5)
                    this.layer.text('2',0,-5)
                    this.layer.text('3',12,-5)
                    this.layer.textSize(8)
                    this.layer.text('1',-12,8)
                    this.layer.text('2',0,8)
                    this.layer.text('3',12,8)
                break
                case 'Mana Gain Draw':
                    displayMtgManaSymbol(this.layer,0,0,-1,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,0,0,8,0,1.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case 'Cheap Skills (M)':
                    displaySymbol(this.layer,-9,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-9,0,123,0,0.6,this.fade)
                    displayMtgManaSymbol(this.layer,9,0,0,0,0.8,this.fade,-1,[])
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('-1',9,0)
                break
                case 'First Block Energy':
                    displaySymbol(this.layer,-9,0,27,0,1,this.fade)
                    displaySymbol(this.layer,-9,4,4,0,0.4,this.fade)
                    displaySymbol(this.layer,9,0,9,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-9,-2)
                    this.layer.text('2',9,0)
                break
                case 'First Block Mana':
                    displaySymbol(this.layer,-9,0,27,0,1,this.fade)
                    displaySymbol(this.layer,-9,-6,5,0,0.4,this.fade)
                    displaySymbol(this.layer,-9,6,4,0,0.4,this.fade)
                    displayMtgManaSymbol(this.layer,9,0,2,0,0.8,this.fade,-1,[])
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-9,0)
                    this.layer.text('1',9,0)
                break
                case 'Status Draw Energy':
                    displaySymbol(this.layer,-8,-2,51,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,4,4,0,0.5,this.fade)
                    displaySymbol(this.layer,9,0,9,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',9,0)
                break
                case 'Status Draw Mana':
                    displaySymbol(this.layer,-8,-2,51,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,4,4,0,0.5,this.fade)
                    displayMtgManaSymbol(this.layer,9,0,3,0,0.8,this.fade,-1,[])
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',9,0)
                break
                case 'Health Loss Draw':
                    displaySymbol(this.layer,0,0,18,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case 'Random Rare Items':
                    displaySymbol(this.layer,-12,0,30,0,0.45,this.fade)
                    displaySymbol(this.layer,0,0,30,0,0.45,this.fade)
                    displaySymbol(this.layer,12,0,30,0,0.45,this.fade)
                    displaySymbol(this.layer,-12,0,85,0,0.45,this.fade)
                    displaySymbol(this.layer,0,0,85,0,0.45,this.fade)
                    displaySymbol(this.layer,12,0,85,0,0.45,this.fade)
                break
                case 'Same Color Temporary Strength':
                    displaySymbol(this.layer,-9,-5,156,0,0.8,this.fade)
                    displaySymbol(this.layer,-6,5,156,0,0.8,this.fade)
                    displaySymbol(this.layer,9,0,41,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',9,0)
                break
                case 'Neutral Mana/Upgrade':
                    displayMtgManaSymbol(this.layer,-9,0,0,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,8,0,1,this.fade)
                    displaySymbol(this.layer,7,-1,7,0,0.4,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(8)
                    this.layer.text('5',11.5,0.5)
                break
                case 'Neutral Mana/Colorless Cards':
                    displayMtgManaSymbol(this.layer,-9,0,0,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,8,0,1,this.fade)
                    displaySymbol(this.layer,9,0,57,0,1,this.fade)
                break
                case 'Neutral Mana/Pristine':
                    displayMtgManaSymbol(this.layer,-9,0,0,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,8,0,1,this.fade)
                    displaySymbol(this.layer,9,0,138,0,1,this.fade)
                break
                case 'Neutral Mana/Neutral Basic':
                    displayMtgManaSymbol(this.layer,-9,0,0,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,8,0,1,this.fade)
                    displaySymbol(this.layer,9,0,108,0,1,this.fade)
                break
                case 'Neutral Mana/Exhaust Mana':
                    displayMtgManaSymbol(this.layer,-9,0,0,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,4,54,0,0.8,this.fade)
                    displayMtgManaSymbol(this.layer,9,-7,0,0,0.5,this.fade,-1,[])
                break
                case 'White Mana/Extra Mana Barrier':
                    displayMtgManaSymbol(this.layer,-9,0,1,0,0.8,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,7,-10,-1,0,0.48,this.fade,-1,[])
                    displaySymbol(this.layer,7,10,27,0,0.6,this.fade)
                    displaySymbol(this.layer,7,0,6,0,0.4,this.fade)
                break
                case 'White Mana/Items':
                    displayMtgManaSymbol(this.layer,-9,0,1,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,8,-7,3,0,0.35,this.fade)
                    displaySymbol(this.layer,8,7,30,0,0.42,this.fade)
                break
                case 'White Mana/Upgrade':
                    displayMtgManaSymbol(this.layer,-9,0,1,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,5,-5,8,0,0.6,this.fade)
                    displaySymbol(this.layer,5,-5,7,0,0.36,this.fade)
                    displaySymbol(this.layer,9,13.5,4,0,0.36,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(8)
                    this.layer.text('3',13,-5)
                    this.layer.textSize(10)
                    this.layer.text('1',9,7)
                break
                case 'White Mana/Immunity':
                    displayMtgManaSymbol(this.layer,-9,0,1,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,143,0,1,this.fade)
                break
                case 'White Mana/3 Attack Cleanse':
                    displayMtgManaSymbol(this.layer,-9,0,1,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,7,-8,18,0,0.7,this.fade)
                    displaySymbol(this.layer,7,8,8,0,0.55,this.fade)
                    displaySymbol(this.layer,7,8,51,0,0.55,this.fade)
                    displaySymbol(this.layer,7,8,16,0,0.55,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(8)
                    this.layer.text('3',7,-8)
                    this.layer.text('1',7,8)
                break
                case 'Blue Mana/Free Card':
                    displayMtgManaSymbol(this.layer,-9,0,2,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,62,0,1.5,this.fade)
                break
                case 'Blue Mana/Early Draw':
                    displayMtgManaSymbol(this.layer,-9,0,2,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,8,-6,8,0,0.8,this.fade)
                    displaySymbol(this.layer,8,7,4,0,0.2,this.fade)
                    displaySymbol(this.layer,8,12.5,4,0,0.36,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(8)
                    this.layer.text('3',8,-6)
                    this.layer.text('1',4,7)
                    this.layer.text('3',12,7)
                break
                case 'Blue Mana/Astrology':
                    displayMtgManaSymbol(this.layer,-9,0,2,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,158,0,1.5,this.fade)
                break
                case 'Blue Mana/Power Mana':
                    displayMtgManaSymbol(this.layer,-9,0,2,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,21,0,0.72,this.fade)
                    displayMtgManaSymbol(this.layer,9,0,2,0,0.36,this.fade,-1,[])
                break
                case 'Blue Mana/Stride':
                    displayMtgManaSymbol(this.layer,-9,0,2,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,8,0,0.9,this.fade)
                    displaySymbol(this.layer,9,0,13,0,0.9,this.fade)
                break
                case 'Black Mana/Remove 2':
                    displayMtgManaSymbol(this.layer,-9,0,3,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,8,0,0.6,this.fade)
                    displaySymbol(this.layer,9,0,16,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',9,0)
                break
                case 'Black Mana/Better Rest Heal':
                    displayMtgManaSymbol(this.layer,-9,0,3,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,5,-10,2,0,0.4,this.fade)
                    displaySymbol(this.layer,13,-2,10,0,0.3,this.fade)
                    displaySymbol(this.layer,9,9,32,0,0.8,this.fade)
                break
                case 'Black Mana/Vulnerable':
                    displayMtgManaSymbol(this.layer,-9,0,3,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,26,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(8)
                    this.layer.text('x2',9,0)
                break
                case 'Black Mana/Triple Damage':
                    displayMtgManaSymbol(this.layer,-9,0,3,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,157,0,1,this.fade)
                break
                case 'Black Mana/Turn 5 Strength/Turn 5 Dexterity':
                    displayMtgManaSymbol(this.layer,-9,0,3,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,4.5,-5,11,0,0.6,this.fade)
                    displaySymbol(this.layer,13.5,-5,12,0,0.6,this.fade)
                    displaySymbol(this.layer,9,13.5,4,0,0.36,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(8)
                    this.layer.text('2',4.5,-5)
                    this.layer.text('2',13.5,-5)
                    this.layer.textSize(10)
                    this.layer.text('5',9,7)
                break
                case 'Green Mana/10 Max HP':
                    displayMtgManaSymbol(this.layer,-9,0,4,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,-4,10,0,0.4,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(8)
                    this.layer.text('10',9,9)
                break
                case 'Green Mana/Item Slots':
                    displayMtgManaSymbol(this.layer,-9,0,4,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,5,-11,30,0,0.4,this.fade)
                    displaySymbol(this.layer,10,0,30,0,0.4,this.fade)
                    displaySymbol(this.layer,5,11,30,0,0.4,this.fade)
                break
                case 'Green Mana/Armor':
                    displayMtgManaSymbol(this.layer,-9,0,4,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,37,0,0.8,this.fade)
                break
                case 'Green Mana/Quick Heal':
                    displayMtgManaSymbol(this.layer,-9,0,4,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,8,8,2,0,0.5,this.fade)
                    displaySymbol(this.layer,8,-6,3,0,0.4,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('4',8,8)
                break
                case 'Green Mana/3 Turn Dodge':
                    displayMtgManaSymbol(this.layer,-9,0,4,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,7,-8,23,0,0.8,this.fade)
                    displaySymbol(this.layer,7,13.5,4,0,0.4,this.fade)
                    displaySymbol(this.layer,7,2,5,0,0.4,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',7,-8)
                    this.layer.textSize(8)
                    this.layer.text('3',7,8.5)
                break
                case 'Red Mana/Currency':
                    displayMtgManaSymbol(this.layer,-9,0,5,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(5)
                    this.layer.text('+25%',9,0)
                break
                case 'Red Mana/Difficulty Mana':
                    displayMtgManaSymbol(this.layer,-9,0,5,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,8,-6,34,0,0.4,this.fade)
                    displayMtgManaSymbol(this.layer,8,8,5,0,0.5,this.fade,-1,[])
                break
                case 'Red Mana/Rare Relic':
                    displayMtgManaSymbol(this.layer,-9,0,5,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,1,0,0.6,this.fade)
                    displaySymbol(this.layer,9,0,85,0,0.6,this.fade)
                break
                case 'Red Mana/Strength/Burns':
                    displayMtgManaSymbol(this.layer,-9,0,5,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,8,-7,11,0,0.7,this.fade)
                    displaySymbol(this.layer,8,7,8,0,0.8,this.fade)
                    displaySymbol(this.layer,8,8,65,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(6)
                    this.layer.text('2',8,-7)
                    this.layer.text('2',8,8)
                break
                case 'Red Mana/Transform':
                    displayMtgManaSymbol(this.layer,-9,0,5,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,8,0,1,this.fade)
                    displaySymbol(this.layer,9,0,159,0,0.6,this.fade)
                break
                case 'Rainbow Mana/Card Choice':
                    displayMtgManaSymbol(this.layer,-9,0,6,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,8,0,17,0,0.4,this.fade)
                    displaySymbol(this.layer,8,0,8,0,1,this.fade)
                break
                case 'Rainbow Mana/Any Rare Card':
                    displayMtgManaSymbol(this.layer,-9,0,6,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,8,0,1,this.fade)
                    displaySymbol(this.layer,9,3,114,0,0.6,this.fade)
                    displaySymbol(this.layer,7,-4,7,0,0.3,this.fade)
                    displaySymbol(this.layer,11,-4,7,0,0.3,this.fade)
                break
                case 'Rainbow Mana/Mana Gain Block':
                    displayMtgManaSymbol(this.layer,-9,0,6,0,0.8,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,9,-6,-1,0,0.6,this.fade,-1,[])
                    displaySymbol(this.layer,9,9,27,0,0.75,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('6',9,9)
                break
                case 'Rainbow Mana/5 Cost Mana':
                    displayMtgManaSymbol(this.layer,-9,0,6,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,8,-6,8,0,0.75,this.fade)
                    displayMtgManaSymbol(this.layer,8,-6,0,0,0.36,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,8,8,6,0,0.54,this.fade,-1,[])
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('5',8,-6)
                    this.layer.text('1',8,8)
                break
                case 'Rainbow Mana/Rainbow Retain':
                    displayMtgManaSymbol(this.layer,-9,0,6,0,0.8,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,7,-10,6,0,0.4,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,7,10,6,0,0.4,this.fade,-1,[])
                    displaySymbol(this.layer,7,0,6,0,0.4,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',14,0)
                break
                case 'Random Mana/Random':
                    displayMtgManaSymbol(this.layer,-9,0,-1,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,5,9,10,0,0.25,this.fade)
                    displaySymbol(this.layer,5,-9,28,0,0.4,this.fade)
                    displaySymbol(this.layer,14,0,8,0,0.5,this.fade)
                    displaySymbol(this.layer,14,0,7,0,0.3,this.fade)
                break
                case 'Random Mana/Elite Relic':
                    displayMtgManaSymbol(this.layer,-9,0,-1,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,-5,1,0,0.5,this.fade)
                    displaySymbol(this.layer,9,8,34,0,0.3,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(8)
                    this.layer.text('+1',9,-5)
                break
                case 'Random Mana/Editions':
                    displayMtgManaSymbol(this.layer,-9,0,-1,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,-3,88,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(8)
                    this.layer.text('2x',9,10)
                break
                case 'Random Mana/Duplicate':
                    displayMtgManaSymbol(this.layer,-9,0,-1,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,89,0,0.9,this.fade)
                break
                case 'Random Mana/Innate Card':
                    displayMtgManaSymbol(this.layer,-9,0,-1,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,8,0,1,this.fade)
                    displaySymbol(this.layer,9,0,58,1,this.fade)
                break
                case 'X Cost Energy':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,9,0,9,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('X',-8,0)
                    this.layer.text('1',9,0)
                break
                case 'X Cost Mana':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displayMtgManaSymbol(this.layer,9,0,-1,0,0.8,this.fade,-1,[])
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('X',-8,0)
                    this.layer.text('1',9,0)
                break
                case 'Elite Upgrade':
                    displaySymbol(this.layer,-9,0,34,0,0.5,this.fade)
                    displaySymbol(this.layer,8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,0,7,0,0.5,this.fade)
                break
                case 'Emergency Push':
                    displaySymbol(this.layer,-8.25,0,20,0,0.4,this.fade)
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Free Move':
                    displaySymbol(this.layer,-8,0,13,0,0.8,this.fade)
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,0,4,0,0.6,this.fade)
                break
                case 'Neutral Mana/Colorless Cost Clear':
                    displayMtgManaSymbol(this.layer,-9,0,0,0,0.8,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,7,-10,0,0,0.48,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,7,10,-1,0,0.48,this.fade,-1,[])
                    displaySymbol(this.layer,7,0,6,0,0.4,this.fade)
                break
                case 'White Mana/Block Up':
                    displayMtgManaSymbol(this.layer,-9,0,1,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,161,0,1.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',9,0)
                break
                case 'Blue Mana/Ice Wing':
                    displayMtgManaSymbol(this.layer,-9,0,2,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,162,0,1,this.fade)
                break
                case 'Black Mana/Occult':
                    displayMtgManaSymbol(this.layer,-9,0,3,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,163,0,1,this.fade)
                break
                case 'Green Mana/3 Turn Strength':
                    displayMtgManaSymbol(this.layer,-9,0,4,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,7,-8,11,0,0.7,this.fade)
                    displaySymbol(this.layer,7,13.5,4,0,0.4,this.fade)
                    displaySymbol(this.layer,7,2,5,0,0.4,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',7,-8)
                    this.layer.textSize(8)
                    this.layer.text('3',7,8.5)
                break
                case 'Red Mana/Red Spent Temporary Strength':
                    displayMtgManaSymbol(this.layer,-9,0,5,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,8,-6,8,0,0.8,this.fade)
                    displayMtgManaSymbol(this.layer,8,-6,5,0,0.4,this.fade,-1,[])
                    displaySymbol(this.layer,8,8,41,0,0.5,this.fade)
                break
                case 'Rainbow Mana/Mana Dump':
                    displayMtgManaSymbol(this.layer,-9,0,6,0,0.8,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,6,-9.5,1,0,0.48,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,8,-5,2,0,0.48,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,9,0,3,0,0.48,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,8,5,4,0,0.48,this.fade,-1,[])
                    displayMtgManaSymbol(this.layer,6,9.5,5,0,0.48,this.fade,-1,[])
                break
                case 'Random Mana/Duplicate Power':
                    displayMtgManaSymbol(this.layer,-9,0,-1,0,0.8,this.fade,-1,[])
                    displaySymbol(this.layer,9,0,89,0,1,this.fade)
                    displaySymbol(this.layer,9,0,21,0,0.6,this.fade)
                break
                case 'Double Stash':
                    displaySymbol(this.layer,-8,0,52,0,0.4,this.fade)
                    displaySymbol(this.layer,8,0,52,0,0.4,this.fade)
                break
                case 'Retain Block (B)':
                    displaySymbol(this.layer,0,-4,27,0,1,this.fade)
                    displaySymbol(this.layer,0,10,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(6)
                    this.layer.text('-50%',0,-4)
                break
                case 'First Enemy Weak':
                    displaySymbol(this.layer,-8,-4,3,0,0.5,this.fade)
                    displaySymbol(this.layer,-8,10,120,0,1,this.fade)
                    displaySymbol(this.layer,8,2,24,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',8,2)
                break
                case 'Turn Splash Damage':
                    displaySymbol(this.layer,0,0,164,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('5',0,0)
                break
                case 'Boss Debuff':
                    displaySymbol(this.layer,-10,0,35,0,0.2,this.fade)
                    displaySymbol(this.layer,3,0,24,0,0.4,this.fade)
                    displaySymbol(this.layer,9,0,26,0,0.4,this.fade)
                    displaySymbol(this.layer,15,0,25,0,0.4,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',9,0)
                break
                case 'Extended Initiative':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,13,0,0.8,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                    this.layer.textSize(8)
                    this.layer.text('+1',-8,0)
                break
                case 'Better Shop Heal':
                    displaySymbol(this.layer,6,0,2,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('$',-10,0)
                    this.layer.textSize(8)
                    this.layer.text('+50%',6,0)
                break
                case 'No Attack Temporary Strength':
                    displaySymbol(this.layer,-8,0,18,0,0.75,this.fade)
                    displaySymbol(this.layer,-8,0,16,0,0.8,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    displaySymbol(this.layer,8,-3,41,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('5',8,-3)
                break
                case 'Energy/Random Cost':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,-4,9,0,0.6,this.fade)
                    displaySymbol(this.layer,8,-4,8,0,0.8,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(6)
                    this.layer.text('+1',8,-4)
                break
                case '8 Defense Energy':
                    displaySymbol(this.layer,-7,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-7,0,19,0,0.8,this.fade)
                    displaySymbol(this.layer,10,0,9,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('8',-7,0)
                    this.layer.text('1',10,0)
                break
                case '6 Defense Mana':
                    displaySymbol(this.layer,-7,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-7,0,19,0,0.8,this.fade)
                    displayMtgManaSymbol(this.layer,10,0,6,0,0.64,this.fade,-1,[])
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('6',-7,0)
                    this.layer.text('1',10,0)
                break
                case 'Double Common Relic':
                    displaySymbol(this.layer,-6,-3,1,0,0.8,this.fade)
                    displaySymbol(this.layer,6,3,1,0,0.8,this.fade)
                    displaySymbol(this.layer,-6,-3,100,0,0.8,this.fade)
                    displaySymbol(this.layer,6,3,100,0,0.8,this.fade)
                break
                case 'Lasting Counter Once':
                    displaySymbol(this.layer,2,0,165,0,2,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('12',0,0)
                break
                case 'Starting Pull':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,5,0,0.4,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Safe Heal':
                    displaySymbol(this.layer,-10,0,2,0,0.6,this.fade)
                    displaySymbol(this.layer,7,-4,18,0,0.6,this.fade)
                    displaySymbol(this.layer,7,-4,16,0,0.6,this.fade)
                    displaySymbol(this.layer,7,9,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',-10,0)
                break
                case 'Offcolor Choice':
                    displaySymbol(this.layer,-11,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,0,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,11,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,-11,0,120,0,1,this.fade)
                break
                case 'Any Character Card':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,120,0,1.5,this.fade)
                break
                case 'Energy/Damage Down/Block Down':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,-8,166,0,1,this.fade)
                    displaySymbol(this.layer,8,8,167,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',8,-8)
                    this.layer.text('1',8,8)
                break
                case 'Status Damage Up':
                    displaySymbol(this.layer,-8,-2,51,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,4,4,0,0.5,this.fade)
                    displaySymbol(this.layer,9,0,29,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',9,0)
                break
                case 'Starting Attack':
                    displaySymbol(this.layer,-8,0,18,0,1,this.fade)
                    if(variants.mtg){
                        displayMtgManaSymbol(this.layer,-8,0,-1,0,0.6,this.fade,-1,[])
                    }else{
                        displaySymbol(this.layer,-8,0,9,0,0.8,this.fade)
                    }
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('0',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('1',8,-3)
                break
                case 'Death Temporary Strength':
                    displaySymbol(this.layer,-8,0,22,0,0.5,this.fade)
                    displaySymbol(this.layer,9,0,41,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('5',9,0)
                break
                case 'Empty Items':
                    displaySymbol(this.layer,-8,0,30,0,0.45,this.fade)
                    displaySymbol(this.layer,-8,0,16,0,0.75,this.fade)
                    displaySymbol(this.layer,10,0,30,0,0.5,this.fade)
                break
                case 'Store Card':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,168,1.5,this.fade)
                break
                case 'Energy/Power Limit':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,-6,21,0,0.6,this.fade)
                    displaySymbol(this.layer,8,8,8,0,0.6,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.25,this.fade)
                break
                case 'Power Block':
                    displaySymbol(this.layer,-8,-4,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,-4,21,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,10,4,0,0.6,this.fade)
                    displaySymbol(this.layer,8,0,27,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('6',8,0)
                break
                case 'Any Common or Uncommon Relic':
                    displaySymbol(this.layer,0,0,1,0,1.25,this.fade)
                    displaySymbol(this.layer,0,0,120,0,1.5,this.fade)
                break
                case 'Bonus Block':
                    displaySymbol(this.layer,-9,-2,27,0,0.8,this.fade)
                    displaySymbol(this.layer,9,-2,27,0,0.8,this.fade)
                    displaySymbol(this.layer,1,12,4,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',9,-2)
                break
                case '3 Turn Temporary Strength':
                    displaySymbol(this.layer,-8,0,41,0,1,this.fade)
                    displaySymbol(this.layer,7,10,4,0,0.6,this.fade)
                    displaySymbol(this.layer,7,-10,5,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('3',7,1)
                break
                case 'No Fatigue':
                    displaySymbol(this.layer,-6,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,-6,0,51,0,0.8,this.fade)
                    displaySymbol(this.layer,6,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,6,0,51,0,0.8,this.fade)
                    displaySymbol(this.layer,0,0,16,0,1.2,this.fade)
                break

                //mark p
            }
            if(value){
                this.layer.fill(230,230,210,this.fade)
                this.layer.textSize(12)
                this.layer.text(variants.mtg&&this.rarity==4?'X':this.value,0,29)
            }
            if(active>1){
                this.layer.fill(0,this.fade)
                this.layer.textSize(6)
                this.layer.text(`x${active}`,0,18)
            }
            if(detail!=-1){
                switch(this.internal){
                    case '5 Turn Energy': case '5 Turn Mana':
                        this.layer.fill(0,this.fade)
                        this.layer.textSize(6)
                        this.layer.text(`${detail%5+1}/5`,0,-16)
                    break
                    case '15 Card Draw':
                        this.layer.fill(0,this.fade)
                        this.layer.textSize(6)
                        this.layer.text(`${detail%15}/15`,0,-16)
                    break
                    case '8 Attack Strength': case '8 Attack Dexterity': case '8 Skill Draw': case '8 Attack Mana': case '8 Defense Energy':
                        this.layer.fill(0,this.fade)
                        this.layer.textSize(6)
                        this.layer.text(`${detail%8}/8`,0,-16)
                    break
                    case '3 Attack Block': case '3 Defense Metallicize': case '3 Card Draw': case 'White Mana/3 Attack Cleanse':
                        this.layer.fill(0,this.fade)
                        this.layer.textSize(6)
                        this.layer.text(`${detail%3}/3`,0,-16)
                    break
                    case 'Strength Rest': case '3 Enemy 1 HP': case 'Spectral Rest': case 'Rest Cost Down': case 'Backwards Move':
                        this.layer.fill(0,this.fade)
                        this.layer.textSize(6)
                        this.layer.text(`${detail}/3`,0,-16)
                    break
                    case '12 Attack Damage': case '12 Attack Energy':
                        this.layer.fill(0,this.fade)
                        this.layer.textSize(6)
                        this.layer.text(`${detail%12}/12`,0,-16)
                    break
                    case '16 Defense Buffer':
                        this.layer.fill(0,this.fade)
                        this.layer.textSize(6)
                        this.layer.text(`${detail%16}/16`,0,-16)
                    break
                    case '3 Turn Draw': case '3 Turn Duplicate': case 'Green Mana/3 Turn Dodge': case 'Green Mana/3 Turn Strength': case '3 Turn Temporary Strength':
                        this.layer.fill(0,this.fade)
                        this.layer.textSize(6)
                        this.layer.text(`${detail%3+1}/3`,0,-16)
                    break
                    case 'Energy/Draw':
                        this.layer.fill(0,this.fade)
                        this.layer.textSize(6)
                        this.layer.text(`${detail%2+1}/2`,0,-16)
                    break
                    case 'Deprecating Damage':
                        this.layer.fill(0,this.fade)
                        this.layer.textSize(6)
                        this.layer.text(`${detail}/16`,0,-16)
                    break
                    case '3 Attack Strength/3 Defense Dexterity':
                        this.layer.fill(0,this.fade)
                        this.layer.textSize(6)
                        this.layer.text(`${detail[0]%3}/3 ${detail[1]%3}/3`,0,-16)
                    break
                    case 'Ascending Cost Energy':
                        this.layer.fill(0,this.fade)
                        this.layer.textSize(6)
                        this.layer.text(`${min(detail[0],3)}/3 ${detail[1]}`,0,-16)
                    break
                    case 'Rest 10 Turn Block':
                        this.layer.fill(0,this.fade)
                        this.layer.textSize(6)
                        this.layer.text(`${10-detail}/10`,0,-16)
                    break
                    case '6 Turn Turn':
                        this.layer.fill(0,this.fade)
                        this.layer.textSize(6)
                        this.layer.text(`${detail%6+1}/6`,0,-16)
                    break
                    case 'Click to Swap': case 'Click to Block': case 'Click For Energy': case 'Click For Mana':
                        this.layer.fill(0,this.fade)
                        this.layer.textSize(6)
                        this.layer.text(`${active-detail}/${active}`,0,-16)
                    break
                    case '8 Turn Intangible':
                        this.layer.fill(0,this.fade)
                        this.layer.textSize(6)
                        this.layer.text(`${detail%8+1}/8`,0,-16)
                    break
                    case 'Rainbow Mana/Mana Dump':
                        this.layer.fill(0,this.fade)
                        this.layer.textSize(6)
                        this.layer.text(`${detail%12+1}/12`,0,-16)
                    break
                    case '6 Defense Mana':
                        this.layer.fill(0,this.fade)
                        this.layer.textSize(6)
                        this.layer.text(`${detail%6}/6`,0,-16)
                    break
                    case 'Store Card':
                        this.layer.fill(0,this.fade)
                        this.layer.textSize(6)
                        this.layer.text(`${active-detail[0]}/${active}`,0,-16)
                    break
                }
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
                case -1:
                    this.layer.text('Unlisted',100+pos*50,290)
                break
                case 0:
                    this.layer.text('Common',100+pos*50,290)
                break
                case 1:
                    this.layer.text('Uncommon',100+pos*50,290)
                break
                case 2:
                    this.layer.text('Rare',100+pos*50,290)
                break
                case 3:
                    this.layer.text('Shop',100+pos*50,290)
                break
                case 4:
                    this.layer.text('Boss',100+pos*50,290)
                break
            }
        }
    }
    update(up,total,inputs,position=this.position,overlayed=true){
        this.fade=smoothAnim(this.fade,up&&!this.deFade||this.type==0&&total>0,0,1,5)
        this.infoFade=smoothAnim(this.infoFade,up&&(this.battle.encounter.tooltip==0||stage.scene!='battle')&&dist(inputs.rel.x,inputs.rel.y,position.x,position.y)<20*this.size&&this.type!=0&&overlayed,0,1,5)
        this.anim.active=smoothAnim(this.anim.active,this.active,0,1,5)
    }
    onClick(mouse,battle){
        if(dist(mouse.x,mouse.y,this.position.x,this.position.y)<20){
            switch(this.internal){
                case 'Click to Swap': case 'Click to Block': case 'Click For Energy': case 'Click For Mana':
                    if(battle.relicManager.detail[this.type][this.player]<battle.relicManager.active[this.type][this.player+1]&&battle.turn.main==this.player){
                        battle.relicManager.detail[this.type][this.player]++
                        switch(this.internal){
                            case 'Click to Swap':
                                battle.cardManagers[this.player].draw(1)
                                battle.cardManagers[this.player].hand.discard(1)
                            break
                            case 'Click to Block':
                                battle.combatantManager.combatants[battle.combatantManager.getPlayerCombatantIndex(this.player)].addBlock(15)
                            break
                            case 'Click For Energy':
                                battle.addEnergy(2,this.player)
                            break
                            case 'Click For Mana':
                                battle.addSpecificEnergy(3,this.player,6)
                            break
                        }
                    }
                break
                case 'Store Card':
                    if(battle.relicManager.detail[this.type][this.player][0]<battle.relicManager.active[this.type][this.player+1]&&battle.turn.main==this.player){
                        battle.relicManager.detail[this.type][this.player][0]++
                        switch(this.internal){
                            case 'Store Card':
                                battle.cardManagers[this.player].hand.cards.push(copyCard(battle.relicManager.detail[this.type][this.player][1]))
                                battle.cardManagers[this.player].hand.cards[battle.cardManagers[this.player].hand.cards.length-1].position.x=1200
                                battle.cardManagers[this.player].hand.cards[battle.cardManagers[this.player].hand.cards.length-1].position.y=500
                            break
                        }
                    }
                break
            }
        }
    }
}