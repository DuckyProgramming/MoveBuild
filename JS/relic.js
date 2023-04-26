class relic{
    constructor(layer,player,x,y,type,size){
        this.layer=layer
        this.player=player
        this.position={x:x,y:y}
        this.type=type
        this.size=size

        this.name=types.relic[this.type].name
        this.internal=types.relic[this.type].internal
        this.description=types.relic[this.type].description
        this.rarity=types.relic[this.type].rarity

        this.fade=0
        this.infoFade=0
        this.deFade=false
        this.active=true
    }
    display(total){
        if(this.fade>0){
            this.layer.push()
            this.layer.translate(this.position.x,this.position.y)
            this.layer.scale(this.size)
            this.layer.fill(this.active?200:80,this.fade)
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
                case '3 Turn Energy':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,7,10,4,0,0.6,this.fade)
                    displaySymbol(this.layer,7,-10,5,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('3',7,1)
                break
                case '8 Max HP':
                    displaySymbol(this.layer,0,-6,10,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('8',0,12)
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
                    displaySymbol(this.layer,-8,0,13,0,1,this.fade)
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
                case '14 Max HP':
                    displaySymbol(this.layer,0,-6,10,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('14',0,12)
                break
                case 'Death Boost':
                    displaySymbol(this.layer,-8,0,22,0,0.5,this.fade)
                    displaySymbol(this.layer,6,-8,8,0,0.7,this.fade)
                    displaySymbol(this.layer,6,8,9,0,0.7,this.fade)
                break
                case '10 Card Draw':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,-4,8,0,0.8,this.fade)
                    displaySymbol(this.layer,8,8,4,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('10',-8,0)
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
                    displaySymbol(this.layer,-8,0,9,0,0.7,this.fade)
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
                    this.layer.textSize(6)
                    this.layer.text('-10',0,-4)
                break
                case 'Power Heal':
                    displaySymbol(this.layer,-8,-4,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,-4,21,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,10,4,0,0.6,this.fade)
                    displaySymbol(this.layer,8,0,2,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',8,0)
                break
                case 'Retain Energy':
                    displaySymbol(this.layer,-10,-4,9,0,0.8,this.fade)
                    displaySymbol(this.layer,10,-4,9,0,0.8,this.fade)
                    displaySymbol(this.layer,0,8,4,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',0,-4)
                break
                case '20 Max HP':
                    displaySymbol(this.layer,0,-6,10,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('20',0,12)
                break
                case '500 Currency':
                    displaySymbol(this.layer,0,0,28,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('500',0,0)
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
                    this.layer.text('10',-8,0)
                    this.layer.text('1',8,-3)
                break
                case 'Rest Energy':
                    displaySymbol(this.layer,0,-6,9,0,1,this.fade)
                    displaySymbol(this.layer,0,10,32,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',0,-6)
                break
                case 'Damage Taken Draw':
                    displaySymbol(this.layer,-8,0,33,0,1,this.fade)
                    displaySymbol(this.layer,8,0,8,0,0.8,this.fade)
                break
                case 'Card Add Currency':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,17,0,0.3,this.fade)
                    displaySymbol(this.layer,8,-5,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('10',8,10)
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
                case '3 Attack Strength':
                    displaySymbol(this.layer,-7,0,18,0,1,this.fade)
                    displaySymbol(this.layer,10,0,11,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',-7,0)
                    this.layer.text('1',10,0)
                break
                case '3 Attack Dexterity':
                    displaySymbol(this.layer,-7,0,18,0,1,this.fade)
                    displaySymbol(this.layer,10,0,12,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',-7,0)
                    this.layer.text('1',10,0)
                break
                case '3 Attack Block':
                    displaySymbol(this.layer,-7,0,18,0,1,this.fade)
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
                    this.layer.textSize(10)
                    this.layer.text('25',10,0)
                break
                case 'Extra Card Option':
                    displaySymbol(this.layer,-8,0,17,0,0.6,this.fade)
                    displaySymbol(this.layer,8,0,8,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,0)
                    this.layer.text('1',8,0)
                break
                case 'Max HP Rest':
                    displaySymbol(this.layer,0,-6,10,0,0.5,this.fade)
                    displaySymbol(this.layer,0,10,32,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('4',0,-6)
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
                    displaySymbol(this.layer,0,-6,17,0,0.5,this.fade)
                    displaySymbol(this.layer,0,10,32,0,1,this.fade)
                break
                case '10 Attack Damage':
                    displaySymbol(this.layer,-9,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-9,0,18,0,0.8,this.fade)
                    displaySymbol(this.layer,9,0,39,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('10',-9,0)
                    this.layer.text('1',9,0)
                break
                case '10 Attack Energy':
                    displaySymbol(this.layer,-9,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-9,0,18,0,0.8,this.fade)
                    displaySymbol(this.layer,9,0,9,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('10',-9,0)
                    this.layer.text('1',9,0)
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
                case '3 Skill Metallicize':
                    displaySymbol(this.layer,-9,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-9,0,19,0,0.8,this.fade)
                    displaySymbol(this.layer,9,0,43,0,1.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',-9,0)
                    this.layer.text('1',9,0)
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
                case '10 Skill Buffer':
                    displaySymbol(this.layer,-9,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-9,0,19,0,0.8,this.fade)
                    displaySymbol(this.layer,9,0,44,0,1.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('10',-9,0)
                    this.layer.text('1',9,0)
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
                    this.layer.text('3',-9,0)
                    this.layer.text('3',9,0)
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
                    this.layer.text('8',-10,0)
                    this.layer.textSize(15)
                    this.layer.text('2',2,-1)
                break
                case 'Coupon':
                    displaySymbol(this.layer,0,-6,1,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('$0',0,10)
                break
                case 'First Attack Free':
                    displaySymbol(this.layer,0,0,45,0,2.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case 'First Card Double':
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
                    this.layer.text('2',-10,0)
                break
                case '2 Turn Half Damage':
                    displaySymbol(this.layer,0,0,47,0,2.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',0,0)
                break
                case '5 Turn Intangible':
                    displaySymbol(this.layer,-8,0,48,0,1.5,this.fade)
                    displaySymbol(this.layer,7,10,4,0,0.6,this.fade)
                    displaySymbol(this.layer,7,-10,5,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('1',-8,0)
                    this.layer.textSize(15)
                    this.layer.text('5',7,1)
                break
                case 'No Shop Currency':
                    displaySymbol(this.layer,-7,0,16,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('$',-7,0)
                    this.layer.text('$',9,0)
                break
                case 'Shop Heal':
                    displaySymbol(this.layer,6,0,2,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('$',-10,0)
                    this.layer.textSize(10)
                    this.layer.text('15',6,0)
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
                    this.layer.text('2',8,0)
                break
                case 'Death Dexterity':
                    displaySymbol(this.layer,-8,0,22,0,0.5,this.fade)
                    displaySymbol(this.layer,8,0,12,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',8,0)
                break
                case 'Weak Elites':
                    displaySymbol(this.layer,-10,0,34,0,0.5,this.fade)
                    displaySymbol(this.layer,8,0,2,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('-20%',8,0)
                break
                case 'Remove Discount':
                    displaySymbol(this.layer,0,-6,8,0,0.75,this.fade)
                    displaySymbol(this.layer,0,-6,16,0,0.75,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('$120',0,10)
                break
                case 'Better Unknown':
                    displaySymbol(this.layer,8,0,50,0,1,this.fade)
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
                    displaySymbol(this.layer,-8,0,17,0,0.45,this.fade)
                    displaySymbol(this.layer,8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,0,17,0,0.45,this.fade)
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
                    displaySymbol(this.layer,10,0,10,0,0.5,this.fade)
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
                    displaySymbol(this.layer,8,0,2,0,0.6,this.fade)
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
                case 'Death Money':
                    displaySymbol(this.layer,-8,0,22,0,0.5,this.fade)
                    displaySymbol(this.layer,10,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('10',10,0)
                break
                case 'Double Rest':
                    displaySymbol(this.layer,-8,0,32,0,1,this.fade)
                    displaySymbol(this.layer,8,0,32,0,1,this.fade)
                break
                case 'Buy One Get One':
                    displaySymbol(this.layer,-10,-4,8,0,0.6,this.fade)
                    displaySymbol(this.layer,0,-4,4,0,0.4,this.fade)
                    displaySymbol(this.layer,10,-4,8,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('$0',0,10)
                break
                case 'Premium':
                    displaySymbol(this.layer,-9,0,28,0,0.6,this.fade)
                    displaySymbol(this.layer,-9,0,17,0,0.4,this.fade)
                    displaySymbol(this.layer,9,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('10',9,0)
                break
                case 'Planned Attack':
                    displaySymbol(this.layer,-9,-2,8,0,1,this.fade)
                    displaySymbol(this.layer,-9,-2,18,0,0.8,this.fade)
                    displaySymbol(this.layer,9,-2,28,0,0.6,this.fade)
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
                    displaySymbol(this.layer,-12,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,12,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,0,0,4,0,0.6,this.fade)
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
                    displaySymbol(this.layer,0,0,8,0,1.2,this.fade)
                    displaySymbol(this.layer,0,0,58,1.2,this.fade)
                break
                case 'Energy/Card Choice':
                    displaySymbol(this.layer,0,0,9,0,1,this.fade)
                    displaySymbol(this.layer,-13,0,8,0,0.6,this.fade)
                    displaySymbol(this.layer,13,0,8,0,0.6,this.fade)
                break
                case 'Energy/Rest Heal':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,-4,2,0,0.5,this.fade)
                    displaySymbol(this.layer,8,8,32,0,0.6,this.fade)
                break
                case 'Energy/Rest Upgrade':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,-4,8,0,0.75,this.fade)
                    displaySymbol(this.layer,8,-4,17,0,0.3,this.fade)
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
                break
                case 'Energy/Items':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,30,0,0.6,this.fade)
                break
                case 'Energy/Draw':
                    displaySymbol(this.layer,-8,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,0,8,0,0.9,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('-1',8,0)
                break
                case 'Energy/Card Limit':
                    displaySymbol(this.layer,-11,0,9,0,0.8,this.fade)
                    displaySymbol(this.layer,8,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,8,0,16,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(8)
                    this.layer.text('>5',8,0)
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
                    displaySymbol(this.layer,8,0,61,0,0.8,this.fade)
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
                case '2 Free Cards':
                    displaySymbol(this.layer,0,0,62,0,2.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',0,0)
                break
                case 'Avoidance':
                    displaySymbol(this.layer,0,0,63,0,1,this.fade)
                    displaySymbol(this.layer,-13,0,20,0,0.6,this.fade)
                    displaySymbol(this.layer,12,0,20,0,0.6,this.fade)
                break
                case 'Remove 3':
                    displaySymbol(this.layer,0,0,8,0,1,this.fade)
                    displaySymbol(this.layer,0,0,16,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text('3',0,0)
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
                case '30 Max HP':
                    displaySymbol(this.layer,0,-6,10,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('30',0,12)
                break

            }
            this.layer.pop()
        }
    }
    displayInfo(){
        if(this.infoFade>0){
            this.layer.fill(150,this.infoFade)
            this.layer.noStroke()
            this.layer.rect(100,240,160,120,10)
            this.layer.fill(0,this.infoFade)
            this.layer.textSize(12)
            this.layer.text(this.name,100,200)
            this.layer.textSize(8)
            this.layer.text(this.description,100,245)
            this.layer.textSize(10)
            switch(this.rarity){
                case 0:
                    this.layer.text('Common',100,290)
                break
                case 1:
                    this.layer.text('Uncommon',100,290)
                break
                case 2:
                    this.layer.text('Rare',100,290)
                break
                case 3:
                    this.layer.text('Shop',100,290)
                break
                case 4:
                    this.layer.text('Boss',100,290)
                break
            }
        }
    }
    update(up,total,inputs){
        this.fade=smoothAnim(this.fade,up&&!this.deFade||this.type==0&&total>1,0,1,5)
        this.infoFade=smoothAnim(this.infoFade,up&&dist(inputs.rel.x,inputs.rel.y,this.position.x,this.position.y)<20*this.size&&this.type!=0,0,1,5)
    }
}