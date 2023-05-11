class item{
    constructor(layer,player,x,y,altX,altY,type,size){
        this.layer=layer
        this.player=player
        this.position={x:x,y:y}
        this.altPosition={x:altX,y:altY}
        this.type=type
        this.size=size

        this.name=types.item[this.type].name
        this.description=types.item[this.type].description
        this.rarity=types.item[this.type].rarity

        this.fade=0
        this.infoFade=0
        this.deFade=false
    }
    refresh(){
        this.name=types.item[this.type].name
        this.description=types.item[this.type].description
        this.rarity=types.item[this.type].rarity
    }
    display(total,alt){
        if(this.fade>0){
            this.layer.push()
            this.layer.translate(alt?this.altPosition.x:this.position.x,alt?this.altPosition.y:this.position.y)
            this.layer.scale(this.size)
            this.layer.fill(200,this.fade)
            this.layer.noStroke()
            this.layer.ellipse(0,0,40,40)
            switch(this.name){
                case '':
                    displaySymbol(this.layer,0,0,30,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(15)
                    this.layer.text(total,0,0)
                break
                case 'Empty':
                    displaySymbol(this.layer,0,0,31,0,1,this.fade)
                break
                case 'Rock':
                    displaySymbol(this.layer,0,0,18,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('10',0,0)
                break
                case 'Attack Box':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,18,0,0.6,this.fade)
                    displaySymbol(this.layer,8,0,9,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('0',8,0)
                break
                case 'Skill Box':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,19,0,0.6,this.fade)
                    displaySymbol(this.layer,8,0,9,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('0',8,0)
                break
                case 'Movement Box':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,13,0,1,this.fade)
                    displaySymbol(this.layer,8,0,9,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('0',8,0)
                break
                case 'Power Box':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,20,0,0.6,this.fade)
                    displaySymbol(this.layer,8,0,9,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('0',8,0)
                break
                case 'Bread':
                    displaySymbol(this.layer,0,0,2,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('15',0,0)
                break
                case 'Arsenic':
                    displaySymbol(this.layer,0,0,66,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('10',0,0)
                break
                case 'Small Smoke Bomb':
                    for(let a=0,la=3;a<la;a++){
                        displaySymbol(this.layer,cos(a*120)*7,sin(a*120)*7,20,a*120,0.8,this.fade)
                    }
                break
                case 'Battery Pack':
                    displaySymbol(this.layer,0,0,38,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('5',0,0)
                break
                case 'Portable Shield':
                    displaySymbol(this.layer,0,0,27,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('20',0,0)
                break
                case 'Grenade':
                    displaySymbol(this.layer,0,0,67,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('10',0,0)
                break
                case 'Rapid Forge':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,7,0,1,this.fade)
                break
                case 'Caffeine':
                    displaySymbol(this.layer,0,0,9,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',0,0)
                break
                case 'Attack Juice':
                    displaySymbol(this.layer,0,0,11,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('2',0,0)
                break
                case 'Defense Juice':
                    displaySymbol(this.layer,0,0,12,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('2',0,0)
                break
                case 'Attack Syringe':
                    displaySymbol(this.layer,0,0,41,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('5',0,0)
                break
                case 'Defense Syringe':
                    displaySymbol(this.layer,0,0,42,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('5',0,0)
                break
                case 'Stun Dart':
                    displaySymbol(this.layer,0,0,69,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case 'Extra Bag':
                    displaySymbol(this.layer,0,0,68,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case 'Blank Paper':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,57,0,1,this.fade)
                break
                case 'Sand':
                    displaySymbol(this.layer,0,0,24,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',0,0)
                break
                case 'Dirt':
                    displaySymbol(this.layer,0,0,25,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',0,0)
                break
                case 'Ash':
                    displaySymbol(this.layer,0,0,26,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',0,0)
                break
                case 'Decaf':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',0,0)
                break


                case 'Starflame Prototype':
                    displaySymbol(this.layer,-8,0,11,0,1,this.fade)
                    displaySymbol(this.layer,8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,2,65,0,0.8,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('5',-8,0)
                break
                case 'Cola':
                    displaySymbol(this.layer,-8,0,2,0,0.6,this.fade)
                    displaySymbol(this.layer,8,0,27,0,0.8,this.fade)
                    displaySymbol(this.layer,8,0,16,0,0.6,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('15',-8,0)
                break
            }
            this.layer.pop()
        }
    }
    displayInfo(pos){
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
                K
            }
        }
    }
    update(up,total,inputs,alt){
        this.fade=smoothAnim(this.fade,up&&!this.deFade||this.type==0&&total>0,0,1,5)
        this.infoFade=smoothAnim(this.infoFade,up&&dist(inputs.rel.x,inputs.rel.y,alt?this.altPosition.x:this.position.x,alt?this.altPosition.y:this.position.y)<20*this.size&&this.type!=0,0,1,5)
    }
}