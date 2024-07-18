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
                case 'Defense Box':
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
                    displaySymbol(this.layer,-8,0,21,0,0.6,this.fade)
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
                    displaySymbol(this.layer,0,0,7,0,0.9,this.fade)
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
                    displaySymbol(this.layer,0,0,26,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',0,0)
                break
                case 'Ash':
                    displaySymbol(this.layer,0,0,25,0,1.2,this.fade)
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
                case 'Rusted Gear':
                    displaySymbol(this.layer,0,0,56,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case 'Spike Pads':
                    displaySymbol(this.layer,0,0,70,0,0.8,this.fade)
                break
                case 'Metal Plating':
                    displaySymbol(this.layer,0,0,37,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('10',0,0)
                break
                case 'Rigged Die':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,14,0,1.5,this.fade)
                break
                case 'Lifesprig':
                    displaySymbol(this.layer,0,0,71,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('8',0,0)
                break
                case 'Attack Powder':
                    displaySymbol(this.layer,0,0,72,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case 'Defense Powder':
                    displaySymbol(this.layer,0,0,73,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case 'Memory Pearl':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,5,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,0,125,0,0.8,this.fade)
                    displaySymbol(this.layer,8,0,9,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('0',8,0)
                break
                case 'Shiny Cube':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,15,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',0,0)
                break
                case 'Berlin Key':
                    displaySymbol(this.layer,-12,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,12,0,8,0,0.8,this.fade)
                    displaySymbol(this.layer,0,2,4,0,0.6,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('2',0,-6)
                break
                case 'Distilled Chaos':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,8,0,9,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',-8,0)
                    this.layer.text('0',8,0)
                break
                case 'Melted Steel':
                    displaySymbol(this.layer,0,0,74,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('5',0)
                break
                case 'Flashbang':
                    displaySymbol(this.layer,0,0,3,0,0.4,this.fade)
                    displaySymbol(this.layer,12,0,4,0,0.4,this.fade)
                    displaySymbol(this.layer,-12,0,5,0,0.4,this.fade)
                    displaySymbol(this.layer,0,12,6,0,0.4,this.fade)
                    displaySymbol(this.layer,0,-12,7,0,0.4,this.fade)
                break
                case 'Buggy Horn':
                    displaySymbol(this.layer,-8,-8,20,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,8,20,0,0.6,this.fade)
                    displaySymbol(this.layer,7,-8,3,0,0.4,this.fade)
                    displaySymbol(this.layer,7,8,3,0,0.4,this.fade)
                break
                case 'Orange Juice':
                    displaySymbol(this.layer,0,0,8,0,1.2,this.fade)
                    displaySymbol(this.layer,0,0,60,0,1.2,this.fade)
                    displaySymbol(this.layer,0,0,16,0,1.2,this.fade)
                break
                case 'Bag of Knives':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,36,0,1.4,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('5',0,0)
                break
                case 'Time Crystal':
                    displaySymbol(this.layer,0,0,75,0,1.5,this.fade)
                break
                case 'Trash Can':
                    displaySymbol(this.layer,0,0,8,0,1.2,this.fade)
                    displaySymbol(this.layer,0,0,16,0,1.2,this.fade)
                break
                case 'Duck Soup':
                    displaySymbol(this.layer,0,0,10,0,0.8,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('5',0,0)
                break
                case 'Hologram Projector':
                    displaySymbol(this.layer,0,-4,48,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('2',0,0)
                break
                case 'Large Smoke Bomb':
                    displaySymbol(this.layer,0,-4,3,0,0.6,this.fade)
                    displaySymbol(this.layer,0,12,4,0,0.8,this.fade)
                break
                case 'Mirror Dome':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('10',-8,0)
                    this.layer.textSize(20)
                    this.layer.text('?',8,0)
                break
                case 'Shield Field':
                    displaySymbol(this.layer,0,0,44,0,2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('2',0,0)
                break
                case 'Bottled Fairy':
                    displaySymbol(this.layer,-10,0,22,0,0.4,this.fade)
                    displaySymbol(this.layer,8,0,2,0,0.6,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('10',8,0)
                break
                case 'Particle Storm':
                    displaySymbol(this.layer,-6,0,18,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(6)
                    this.layer.text('6x10',-6,0)
                    this.layer.textSize(20)
                    this.layer.text('?',10,0)
                break
                case 'Pile of Junk':
                    displaySymbol(this.layer,-8,0,30,0,0.6,this.fade)
                    displaySymbol(this.layer,8,0,30,0,0.6,this.fade)
                break
                case 'Skill Box':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,123,0,0.6,this.fade)
                    displaySymbol(this.layer,8,0,9,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('0',8,0)
                break
                case 'Spiked Glove':
                    displaySymbol(this.layer,0,2,39,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case 'Floppy Disc':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,5,0,0.9,this.fade)
                    displaySymbol(this.layer,0,0,124,0,1.2,this.fade)
                break
                case 'Red Pill':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,5,0,0.9,this.fade)
                    displaySymbol(this.layer,0,0,125,0,1.2,this.fade)
                break
                case 'Blue Pill':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,5,0,0.9,this.fade)
                    displaySymbol(this.layer,0,0,126,0,1.2,this.fade)
                break
                case 'Booster Shot':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,7,0,0.9,this.fade)
                    displaySymbol(this.layer,0,0,64,0,0.4,this.fade)
                break
                case 'Contained Boundary':
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
                case 'Jeweled Branch':
                    displaySymbol(this.layer,-9,0,9,0,1,this.fade)
                    displaySymbol(this.layer,9,0,128,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('5',-9,0)
                    this.layer.text('5',9,0)
                break
                case 'Elemental Burst':
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
                case 'Hypergrowth':
                    displaySymbol(this.layer,0,0,131,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case 'Offense Tonic':
                    displaySymbol(this.layer,-9,0,9,0,1,this.fade)
                    displaySymbol(this.layer,7,-7,8,0,0.75,this.fade)
                    displaySymbol(this.layer,7,-7,14,0,0.75,this.fade)
                    displaySymbol(this.layer,7,8,16,0,0.5,this.fade)
                    displaySymbol(this.layer,7,8,18,0,0.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',-9,0)
                break
                case 'Defense Tonic':
                    displaySymbol(this.layer,-9,0,9,0,1,this.fade)
                    displaySymbol(this.layer,7,-7,8,0,0.75,this.fade)
                    displaySymbol(this.layer,7,-7,14,0,0.75,this.fade)
                    displaySymbol(this.layer,7,8,16,0,0.5,this.fade)
                    displaySymbol(this.layer,7,8,19,0,0.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',-9,0)
                break
                case 'Deuterium':
                    displaySymbol(this.layer,0,0,132,0,2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(15)
                    this.layer.text('3',0,0)
                break
                case 'Anaglyph Pill':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,5,0,0.9,this.fade)
                    displaySymbol(this.layer,0,0,127,0,1.2,this.fade)
                break
                case 'Golden Camera':
                    displaySymbol(this.layer,0,0,30,0,1,this.fade)
                    displaySymbol(this.layer,0,0,64,0,0.6,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(15)
                    this.layer.text('x2',0,0)
                break
                case 'Hummingbird Feather':
                    displaySymbol(this.layer,0,0,47,0,2.5,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2',0,0)
                break
                case 'Surplus Voucher':
                    displaySymbol(this.layer,-10,0,1,0,0.5,this.fade)
                    displaySymbol(this.layer,8,0,35,0,0.25,this.fade)
                break
                case 'Grimoire Page':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,-5,114,0,0.8,this.fade)
                    displaySymbol(this.layer,0,5,95,0,0.6,this.fade)
                break
                case 'Oracle':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,-4,120,0,1.2,this.fade)
                    displaySymbol(this.layer,0,6,64,0,0.4,this.fade)
                break
                case 'Blinkseal':
                    displaySymbol(this.layer,-9,0,18,0,0.8,this.fade)
                    displaySymbol(this.layer,9,0,9,0,0.6,this.fade)
                    displaySymbol(this.layer,9,0,75,0,0.9,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('24',-9,0)
                break
                case 'Vacuum Collapse':
                    displaySymbol(this.layer,-8,0,18,0,1,this.fade)
                    displaySymbol(this.layer,10,0,133,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('35',-8,0)
                    this.layer.text('2',10,0)
                break
                case 'Binary Die':
                    displaySymbol(this.layer,-8,0,89,0,0.8,this.fade)
                    displaySymbol(this.layer,8,0,8,0,0.6,this.fade)
                    displaySymbol(this.layer,8,0,16,0,0.6,this.fade)
                break
                case 'Replacement Papers':
                    displaySymbol(this.layer,0,0,88,0,1.5,this.fade)
                break
                case 'Full Medkit':
                    displaySymbol(this.layer,-8,0,2,0,0.6,this.fade)
                    displaySymbol(this.layer,8,0,10,0,0.4,this.fade)
                break
                case 'Surprise Coupon':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,1,0,0.5,this.fade)
                    displaySymbol(this.layer,9,0,28,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('3',-8,0)
                    this.layer.text('0',9,0)
                break
                case 'Starter Pack':
                    displaySymbol(this.layer,-12,0,18,0,0.6,this.fade)
                    displaySymbol(this.layer,0,0,19,0,0.6,this.fade)
                    displaySymbol(this.layer,12,0,20,0,0.6,this.fade)
                break
                case 'Equilibrium System':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,49,0,1.5,this.fade)
                break
                case 'Unfinished Potion':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,134,0,1.5,this.fade)
                break
                case 'Cup of Water':
                    displaySymbol(this.layer,-8,-4,8,0,0.9,this.fade)
                    displaySymbol(this.layer,-8,-4,6,0,0.54,this.fade)
                    displaySymbol(this.layer,8,-4,8,0,0.9,this.fade)
                    displaySymbol(this.layer,8,-4,15,0,0.9,this.fade)
                    displaySymbol(this.layer,0,11,27,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('5',0,11)
                break
                case 'Fuel Cell':
                    displaySymbol(this.layer,0,-6,30,0,0.8,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('2x',0,10)
                break
                case 'Bumper Sticker':
                    displaySymbol(this.layer,0,0,135,0,1.5,this.fade)
                break
                case 'Tape Roll':
                    displaySymbol(this.layer,0,0,136,0,2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case 'Confetti':
                    for(let a=0,la=6;a<la;a++){
                        displaySymbol(this.layer,lsin(a*60)*12,lcos(a*60)*12,18,0,0.6,this.fade)
                    }
                    displaySymbol(this.layer,0,0,18,0,0.6,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case 'Shiny Coin':
                    displaySymbol(this.layer,0,0,28,0,1,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('50',0,0)
                break
                case 'Helium Canister':
                    displaySymbol(this.layer,0,0,137,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('2',0,0)
                break
                case 'Spare Spacebar':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,138,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',0,0)
                break
                case 'Corn Cob':
                    displaySymbol(this.layer,-9,0,8,0,1.1,this.fade)
                    displaySymbol(this.layer,-9,1,139,0,0.5,this.fade)
                    displaySymbol(this.layer,9,0,9,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('0',9,0)
                break
                case 'Divination Pearl':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,5,0,0.6,this.fade)
                    displaySymbol(this.layer,-8,0,126,0,0.8,this.fade)
                    displaySymbol(this.layer,8,0,9,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('0',8,0)
                break
                case 'Sun Stone':
                    displaySymbol(this.layer,-7,0,8,0,0.6,this.fade)
                    displaySymbol(this.layer,-15,0,8,0,0.45,this.fade)
                    displaySymbol(this.layer,1,0,8,0,0.45,this.fade)
                    displaySymbol(this.layer,-7,0,7,0,0.36,this.fade)
                    displaySymbol(this.layer,11,1,65,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('2',11,0)
                break
                case 'Soap':
                    displaySymbol(this.layer,0,0,143,0,2,this.fade)
                break
                case 'Giant Scissors':
                    displaySymbol(this.layer,0,-4,8,0,1,this.fade)
                    displaySymbol(this.layer,0,-4,16,0,1,this.fade)
                    displaySymbol(this.layer,0,-4,126,0,0.8,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('5',0,15)
                break
                case 'Falling Stick':
                    displaySymbol(this.layer,0,0,18,0,1.5,this.fade)
                    displaySymbol(this.layer,0,0,120,0,2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('8',0,0)
                break
                case 'Catalytic Converter':
                    displaySymbol(this.layer,0,0,8,0,0.9,this.fade)
                    displaySymbol(this.layer,-12,0,8,0,0.6,this.fade)
                    displaySymbol(this.layer,12,0,8,0,0.6,this.fade)
                    this.layer.fill(0,this.fade)
                    this.layer.textSize(10)
                    this.layer.text('?',0,0)
                break
                case 'Large Speaker':
                    displaySymbol(this.layer,-13,0,20,0,0.6,this.fade)
                    displaySymbol(this.layer,2,0,3,0,0.4,this.fade)
                    displaySymbol(this.layer,14,0,144,0,0.6,this.fade)
                break
                case 'Tree Sapling':
                    displaySymbol(this.layer,-7,-3,145,0,1.75,this.fade)
                    displaySymbol(this.layer,7,-3,146,0,1.75,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',-7,-3)
                    this.layer.text('3',7,-3)
                break
                case 'Mobile Tonic':
                    displaySymbol(this.layer,-9,0,9,0,1,this.fade)
                    displaySymbol(this.layer,7,-7,8,0,0.75,this.fade)
                    displaySymbol(this.layer,7,-7,14,0,0.75,this.fade)
                    displaySymbol(this.layer,7,8,16,0,0.5,this.fade)
                    displaySymbol(this.layer,7,8,20,0,0.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',-9,0)
                break
                case 'Skillful Tonic':
                    displaySymbol(this.layer,-9,0,9,0,1,this.fade)
                    displaySymbol(this.layer,7,-7,8,0,0.75,this.fade)
                    displaySymbol(this.layer,7,-7,14,0,0.75,this.fade)
                    displaySymbol(this.layer,7,8,16,0,0.5,this.fade)
                    displaySymbol(this.layer,7,8,123,0,0.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',-9,0)
                break
                case 'Powerful Tonic':
                    displaySymbol(this.layer,-9,0,9,0,1,this.fade)
                    displaySymbol(this.layer,7,-7,8,0,0.75,this.fade)
                    displaySymbol(this.layer,7,-7,14,0,0.75,this.fade)
                    displaySymbol(this.layer,7,8,16,0,0.5,this.fade)
                    displaySymbol(this.layer,7,8,21,0,0.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',-9,0)
                break
                case 'Two-Sided Mirror':
                    displaySymbol(this.layer,0,0,89,0,0.8,this.fade)
                    displaySymbol(this.layer,-12,0,89,0,0.6,this.fade)
                    displaySymbol(this.layer,12,0,89,0,0.6,this.fade)
                break
                case 'Bottled Cement':
                    displaySymbol(this.layer,-9,0,27,0,0.6,this.fade)
                    displaySymbol(this.layer,-9,0,16,0,0.6,this.fade)
                    displaySymbol(this.layer,9,0,18,0,0.8,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('25',9,0)
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
                case 'Salad':
                    displaySymbol(this.layer,0,0,2,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',0,0)
                break
                case 'Energy Drink':
                    displaySymbol(this.layer,0,0,9,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('2',0,0)
                break
                case 'Glass Shard':
                    displaySymbol(this.layer,0,0,18,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('5',0,0)
                break
                case 'Molten Metal':
                    displaySymbol(this.layer,0,0,27,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('10',0,0)
                break
                case 'Caffeine Pill':
                    displaySymbol(this.layer,0,0,8,0,1.5,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('2',0,0)
                break
                case 'Attack Dust':
                    displaySymbol(this.layer,0,0,11,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case 'Defense Dust':
                    displaySymbol(this.layer,0,0,12,0,1.2,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('1',0,0)
                break
                case 'Mystery Box':
                    displaySymbol(this.layer,-8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,-8,0,64,0,0.3,this.fade)
                    displaySymbol(this.layer,8,0,9,0,1,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('0',8,0)
                break
                case 'Mundane Dust':
                    this.layer.fill(0)
                    this.layer.textSize(20)
                    this.layer.text('?',0,0)
                break
                case 'Cream Paper':
                    displaySymbol(this.layer,0,0,101,0,2,this.fade)
                break
                case 'Pink Paper':
                    displaySymbol(this.layer,0,0,102,0,2,this.fade)
                break
                case 'Quality Coffee':
                    displaySymbol(this.layer,-9,0,9,0,1,this.fade)
                    displaySymbol(this.layer,8,0,8,0,1,this.fade)
                    displaySymbol(this.layer,11,0,7,0,0.4,this.fade)
                    this.layer.fill(0)
                    this.layer.textSize(10)
                    this.layer.text('3',-9,0)
                    this.layer.text('3',6,0)
                break
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