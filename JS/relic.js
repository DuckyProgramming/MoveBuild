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
    display(){
        if(this.fade>0){
            this.layer.push()
            this.layer.translate(this.position.x,this.position.y)
            this.layer.scale(this.size)
            if(this.active){
                this.layer.fill(200,this.fade)
            }else{
                this.layer.fill(120,this.fade)
            }
            this.layer.noStroke()
            this.layer.ellipse(0,0,40,40)
            if(this.player==-1){
                this.layer.fill(150,this.fade)
                this.layer.rect(0,0,2,40)
            }
            switch(this.internal){
                case '':
                    displaySymbol(this.layer,0,0,1,0,1,this.fade)
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
                case '7 Max HP':
                    displaySymbol(this.layer,0,-6,10,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('7',0,12)
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
                case 'Starting Dodge':
                    displaySymbol(this.layer,-8,0,23,0,1,this.fade)
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
                case '14 Max HP':
                    displaySymbol(this.layer,0,-6,10,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('14',0,12)
                break
                case '300 Currency':
                    displaySymbol(this.layer,0,0,28,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('300',0,0)
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