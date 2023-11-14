class combatant{
    constructor(layer,battle,x,y,relativeX,relativeY,tileX,tileY,type,team,id,direction,minion=false){
        this.layer=layer
        this.battle=battle
        this.position={x:x,y:y}
        this.relativePosition={x:relativeX,y:relativeY}
        this.tilePosition={x:tileX,y:tileY}
        this.type=round(type)
        this.team=team
        this.id=id
        this.minion=minion
        this.offset={position:{x:0,y:0},life:{x:0,y:25}}

        this.fade=0
        this.time=0

        try{
            this.name=types.combatant[this.type].name
            this.life=types.combatant[this.type].life
            this.behavior=types.combatant[this.type].behavior
            this.spec=copyArray(types.combatant[this.type].spec)
            this.move=types.combatant[this.type].move
            this.attack=copyArrayAttack(types.combatant[this.type].attack)
            this.description=types.combatant[this.type].description
        }catch(error){
            print('!!!',this.type,error)
            this.type=0
            this.name=types.combatant[this.type].name
            this.life=types.combatant[this.type].life
            this.behavior=types.combatant[this.type].behavior
            this.spec=copyArray(types.combatant[this.type].spec)
            this.move=types.combatant[this.type].move
            this.attack=copyArrayAttack(types.combatant[this.type].attack)
            this.description=types.combatant[this.type].description
        }
        this.initialName=this.name

        if(this.attack.length==0){
            this.attack=[{type:0,effect:[]}]
        }
        if(this.battle.initialized&&this.team==0&&this.battle.modded(7)){
            this.name='Unknown'
            this.description='Unrecognizable'
        }
        if(this.battle.initialized&&this.team==0&&this.battle.modded(13)){
            for(let a=0,la=this.attack.length;a<la;a++){
                if(this.attack[a].type==21){
                    this.attack.splice(a,1)
                    a--
                    la--
                }
            }
        }
        if(this.battle.initialized&&this.team==0&&this.battle.modded(42)&&floor(random(0,10))==0&&!this.spec.includes(1)){
            this.spec.push(1)
        }
        if(this.battle.initialized&&this.team==0&&this.battle.modded(53)&&!this.spec.includes(0)){
            this.spec.push(0)
        }
        if(this.battle.initialized&&this.team==0&&this.battle.modded(80)&&this.move.type!=3&&floor(random(0,4))==0){
            this.move.type=3
        }
        if(this.battle.initialized&&this.team==0&&this.battle.modded(96)&&this.battle.turn.total>1&&!this.spec.includes(1)){
            this.spec.push(1)
        }
        if(this.battle.initialized&&this.team==0&&this.battle.modded(123)&&!this.spec.includes(3)){
            this.spec.push(3)
        }
        if(this.battle.initialized&&this.team==0&&(this.battle.modded(126)&&this.battle.encounter.class==2||this.battle.modded(127)&&this.battle.encounter.class==1)&&this.battle.turn.total==0&&this.battle.nodeManager.world!=3){
            this.battle.quickReinforce(this.name)
        }
        if(this.battle.initialized&&this.team==0&&(this.battle.modded(126)&&this.battle.encounter.class==2||this.battle.modded(127)&&this.battle.encounter.class==1)&&this.spec.includes(2)){
            this.spec.splice(this.spec.indexOf(2))
        }
        if(this.battle.initialized&&this.team==0&&this.battle.players>1){
            this.life*=1.5
            for(let a=0,la=this.attack.length;a<la;a++){
                if(types.attack[this.attack[a].type].class==1||types.attack[this.attack[a].type].class==2){
                    this.attack[a].effect[0]=round(this.attack[a].effect[0]*1.5)
                }
            }
        }

        this.order=0
        this.moved=false
        this.aggressor=false
        this.dead=false
        this.respawn=false
        this.graphic=false
        this.construct=false
        this.support=false
        this.programmedDeath=false
        this.blocked=0
        this.taken=0
        this.builder=0
        this.compression=0
        this.base={position:{x:this.position.x,y:this.position.y},life:this.life,size:0}
        this.collect={life:this.life}
        this.infoAnim={life:1,block:0,size:1,balance:0,orb:0,orbSpec:[],description:0,upSize:false,intent:[],flash:[0,0,0,0],upFlash:[false,false,false,false],stance:[0,0,0,0,0,0],faith:[0,0,0,0,0,0,0,0,0,0]}

        this.block=0
        this.lastBlock=0
        this.dodges=[]
        this.status={main:[],name:[
            'Double Damage','Counter','Cannot Be Pushed','Dodge','Energy Next Turn','Bleed','Strength','Dexterity','Weak','Frail',
            'Vulnerable','Retain Block','Single Damage','Block Next Turn','Armor','Control','Cannot Gain Block','Temporary Strength','Temporary Dexterity','Metallicize',
            'Weak Next Turn','Buffer','Free Attack','Double Play','Take Half Damage','Intangible','Counter All','Free Card', 'Cannot Move','Cannot Move Next Turn',
            'Strength Per Turn','Poison','Stun','Regeneration','Dexterity Per Turn','Extra Turn','Counter Combat','Cannot Gain Block Next Turn','Counter Push','Counter Bleed',
            'Temporary Damage Up','Temporary Draw','Currency','Strength on Hit','Weak on Kill','Vulnerable on Kill','Anti-Control','Counter Combat Turn','Distracted','Burn',
            'Single Counter Block','Invisible','Dissipating','Take Third Damage','Speed Up','Strength Next Turn','Temporary Strength on Hit','Take 3/4 Damage','Temporary Strength Next Turn','Temporary Speed Up',
            'Untargettable From Front','Cancel Exhaust','Must Attack or Take Damage','Damage Taken Up','Energy on Hit','Conditioning','Shiv Per Turn','Remove Combo','Combo Per Hit Boost','Attack Draw',
            'Combo on Block','Combo Per Turn','Combo Next Turn','2 Range Counter','Card Play Block','Temporary Damage Down','Shiv Boost','Take Per Card Played','Counter All Combat','No Draw',
            'Explode on Death','Energy Next Turn Next Turn','Double Damage Turn','Double Damage Turn Next Turn','Draw Up','Turn Discard','Lose Per Turn','Shiv on Hit','Intangible Next Turn','Block Next Turn Next Turn',
            'Exhaust Draw','Debuff Damage','Counter Push Left','Counter Push Right','Counter Temporary Speed Down','Heal on Hit','Take Per Card Played Combat','Take 3/5 Damage','Attack Bleed Turn','Single Attack Bleed',
            'Attack Bleed Combat','Confusion','Counter Confusion','Heal on Death','Ignore Balance','Balance Energy','Counter 3 Times','Armed Block Per Turn','Counter Block','Heal Gain Max HP',
            'Take Per Turn','Focus','Power Draw','Random Power Per Turn','Power Basic','Basic on Hit','Random Common Per Turn','Lock-On','Focus Per Turn','Freeze',
            'Step Next Turn','Jagged Bleed','Counter Bleed Combat','Single Take Double Damage','Dodge Next Turn','Smite Per Turn','Stance Block','Stance Draw','Lose Next Turn','Faith Per Turn',
            'Miracle Time','Miracle+ Time','Wrath Next Turn','Insight Per Turn','Block Return','Energy Per Turn Per Turn','Retain Cost Reduce','Cannot Die','Single Damage Block Convert','Triple Block',
            'Block Spark','Block Spark+','Charge Per Turn','Burn Per Turn','Amplify Return','Free Amplify','Dexterity Next Turn','Counter Burn','No Amplify','No Amplify Next Turn',
            'Charge Consume Block','Shuffle Energy','Shuffle Draw','Take Credit','Triple Damage','Charge Next Turn','Single Free Amplify','Random Defense Per Turn','Random Upgraded Defense Per Turn','1.5x Damage',
            '1.5x Block','Upgrade Created','Lowroll Strength','Decrementing Strength','Energy Next Turn Next Turn Next Turn','Bruise','Gun Boost','Take Double Damage Turn','Block Up','Take Credit Turn',
            'Damage Dealt Currency','Attack Regeneration','Take Credit Block Turn','Reflect','Currency Tank','Damage Down','Counter Damage Down All','Temporary Ammo on Hit','Ichor','Take Damage',
            'Take Damage Next Turn','Take Damage Next Turn Next Turn','Block Next Turn Next Turn Next Turn','Dexterity on Hit','Temporary Dexterity on Hit','Temporary Block Up','Damage Up','Block Down','End Move','Conviction Next Turn',
            'Rizz','Shock','Shiv Range Up','Double Exhaust','Miss','Single Attack Strength','Rotate Lock','Jinx','Half Damage Turn','Numeric Explode on Death',
            'Luck Guarantee','Double Damage-1','20 Damage Miss','Heal Per Turn','Wet','Counter Weak All','Counter Freeze','Temporary Dexterity Next Turn','Lock','Fragile Heal',
            'Self Damage Immunity','Self-Reflect','Half Damage Turn Next Turn','Survive Fatal','Free 1 Cost Card','No Damage','1.5x Damage+1','Decrementing Armor','Twos','Ignore Tile',
            'Jinx Next Turn','Jinxshock','Burn Draw Up','Lowroll Draw','Single Attack Regeneration','Shiv Freeze','Shiv Burn','Mixed','Silence','Faith Next Turn',
            'Hook','Temporary Single Damage',
            ],next:[],display:[],active:[],position:[],size:[],
            behavior:[
                0,2,1,0,2,1,0,0,1,1,//1
                3,0,0,2,0,0,1,2,2,0,//2
                2,0,0,0,1,1,2,0,1,2,//3
                0,1,1,1,0,0,0,2,1,2,//4
                2,2,0,0,0,0,0,2,0,0,//5
                0,1,0,1,0,2,2,1,2,2,//6
                1,0,2,0,2,0,0,1,0,0,//7
                0,0,2,2,0,2,0,2,0,1,//8
                0,2,2,2,0,0,0,0,2,2,//9
                0,0,1,1,1,0,0,1,2,0,//10
                0,0,2,0,0,0,2,0,0,0,//11
                0,0,0,0,0,0,0,1,0,0,//12
                2,1,0,0,2,0,0,0,2,0,//13
                1,1,1,0,0,0,0,1,0,0,//14
                0,0,0,0,0,1,2,2,2,1,//15
                0,0,0,0,0,2,0,0,0,0,//16
                0,0,0,1,2,2,0,1,0,1,//17
                1,0,1,0,2,0,2,2,0,2,//18
                2,2,2,0,0,2,0,0,0,2,//19
                0,0,0,0,0,0,1,0,1,0,//20
                0,0,0,0,1,2,2,2,1,2,//21
                1,0,2,0,0,0,0,1,0,0,//22
                2,0,0,0,0,0,0,0,1,2,//23
                1,2,
            ],
            class:[
                0,2,0,0,2,1,0,0,1,1,//1
                0,0,0,0,0,0,1,0,0,0,//2
                1,0,2,2,0,0,0,2,3,1,//3
                0,1,1,0,0,2,0,1,2,2,//4
                0,2,3,0,2,2,1,0,1,1,//5
                0,0,3,0,2,0,0,0,0,1,//6
                2,2,1,1,2,0,2,3,2,2,//7
                2,2,2,2,2,0,2,1,0,3,//8
                3,2,0,0,2,2,1,2,0,0,//9
                2,2,2,2,2,0,1,0,0,0,//10
                0,1,2,0,2,2,2,2,0,2,//11
                1,2,2,2,2,2,2,3,2,1,//12
                2,0,2,1,0,2,2,2,1,2,//13
                2,2,2,2,1,2,2,0,0,0,//14
                2,2,2,3,2,2,0,2,3,3,//15
                2,2,2,0,0,2,2,2,3,0,//16
                0,2,2,0,2,1,2,1,0,0,//17
                2,1,0,0,2,1,2,2,1,1,//18
                1,1,1,0,0,0,0,0,2,2,//19
                2,1,2,2,1,0,3,1,1,3,//20
                2,0,2,0,1,0,2,0,1,0,//21
                2,1,1,0,2,1,0,0,2,0,//22
                1,1,2,2,1,2,2,3,3,2,//23
                2,0,
            ]}
        //0-none, 1-decrement, 2-remove, 3-early decrement, player
        //0-good, 1-bad, 2-nonclassified good, 3-nonclassified bad
        for(let a=0;a<this.status.name.length;a++){
            this.status.main.push(0)
            this.status.next.push(0)
            this.status.active.push(false)
            this.status.position.push(0)
            this.status.size.push(0)
        }

        for(let a=0,la=this.attack.length;a<la;a++){
            this.infoAnim.intent.push(0)
        }

        this.direction=0
        this.size=1

        this.combo=0
        this.armed=true
        this.balance=0
        this.balanceCap=10
        this.orbs=[]
        this.orbDetail=[]
        this.anyOrb=false
        this.totalOrb=0
        this.totalOrbClass=[]
        this.lastOrb=0
        this.metal=0
        this.stance=0
        this.faith=0
        this.charge=0
        this.ammo=3

        this.intent=0
        this.activated=false
        this.target=0

        this.setupGraphics(direction)

        this.base.size=this.size
        this.base.anim=this.anim
        if(this.team>0){
            this.fade=1
        }
        if(this.battle.players>0&&this.battle.initialized){
            this.initialBuff()
        }
    }
    setupGraphics(direction){
        switch(this.name){
            case 'Joe':
                this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                    legs:[{top:9,bottom:0,length:{top:17,bottom:17}},{top:9,bottom:0,length:{top:17,bottom:17}}],
                    arms:[{top:24,bottom:9,length:{top:17,bottom:17}},{top:24,bottom:9,length:{top:17,bottom:17}}]}
                this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
                this.parts={eyeLevel:-78,mouth:-70,minor:15,
                    legs:[{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                this.graphics={
                    legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
                this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1},logo:1}
                this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true},logo:true}}
                this.trigger.display.extra={damage:false}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0,hand:0,foot:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={skin:{head:[240,220,180],body:[180,170,160],legs:[160,150,140],arms:[100,180,200],upperBody:[120,200,220]},logo:[0,255,50],belt:[180,100,20],eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
            break
            case 'George':
                this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                    legs:[{top:9,bottom:0,length:{top:18,bottom:18}},{top:9,bottom:0,length:{top:18,bottom:18}}],
                    arms:[{top:24,bottom:9,length:{top:18,bottom:18}},{top:24,bottom:9,length:{top:18,bottom:18}}]}
                this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216,sword:0}
                this.color={skin:{head:[240,220,180],body:[35,40,40],legs:[25,30,30],arms:[30,35,35]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]},helmet:[40,45,45],visor:[200,200,200],belt:[30,25,0],badge:[[240,240,200],[240,240,40]]}
                this.parts={eyeLevel:-81,mouth:-73,minor:15,
                    legs:[{top:{x:3.5,y:-36},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-36},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:4,y:-64},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-64},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                this.graphics={
                    legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
                this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1},helmet:1,visor:1,belt:1,badge:1}
                this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true},helmet:true,visor:true,belt:true,badge:true,extra:{damage:false}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0,hand:0,foot:0}
                this.goal={anim:{direction:this.anim.direction,sword:false}}
            break
            case 'Lira':
                this.anim={direction:direction,head:direction,sword:1,mouth:{x:8,y:5,open:0},
                    eye:[0,0],eyeStyle:[0,0],under:{top:{x:1,y:1},bottom:{x:1,y:1},bow:{top:{position:{x:1,y:1},size:{x:1,y:1}},bottom:{position:{x:1,y:1},size:{x:1,y:1}}},under:{bottom:1}},
                    kimono:{bow:{position:{x:1,y:1},size:{x:1,y:1}}},
                    legs:[
                        {top:9,bottom:0,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}},
                        {top:9,bottom:0,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}}
                    ],arms:[
                        {top:24,bottom:9,length:{top:16,bottom:16}},
                        {top:24,bottom:9,length:{top:16,bottom:16}}
                    ]}

                this.kimono={decoration:[]}

                this.spin={
                    legs:[{top:-60,bottom:-120},{top:60,bottom:120}],
                    arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],
                    bow:{center:0,loop:[-24,24]},
                    under:{top:[],bottom:[],tanga:24,piece:36,under:{top:[-40,40],button:[-39,39],bottom:[0,-15,15,-9,9]}},
                    underBow:{top:{center:0,end:[-4,4],loop:[-12,12]},bottom:{center:0,end:[-5,5],loop:[-15,15]}},
                    sandal:[6,-6],eye:[-18,18],flower:[54,48,56],button:0,sword:75,mouth:216}

                this.color=graphics.combatant[0].color

                this.parts={eyeLevel:-72,flowerLevel:[-77.5,-75,-71.5],mouth:-65,
                    under:{top:-51,bottom:-31,bow:{top:2.75,bottom:-5}},
                    kimono:{main:-58,outside:-59,bow:-53},
                    minor:15,
                    legs:[
                        {top:{x:3,y:-32},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}},
                        {top:{x:3,y:-32},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}}
                    ],arms:[
                        {top:{x:3.5,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}},
                        {top:{x:3.5,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}}
                    ],}

                this.graphics={
                    legs:[
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}},
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}}
                    ],arms:[
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}
                    ]}

                this.fades={flower:[1,1,1],eye:[1,1],band:[1,1],mouth:1,
                    sandal:{back:[1,1],front:[1,1]},
                    skin:{legs:1,arms:1,body:1,head:1,button:1},
                    kimono:{decoration:{fade:1,position:{x:1,y:1},size:{x:1,y:1}},
                    main:{back:{x:1,y:1},front:{x:1,y:1}},outside:{back:{x:1,y:1},front:{x:1,y:1}},bow:1},
                    under:{top:1,bottom:1,tanga:1,bow:{top:1,bottom:1},under:{top:1,button:1,bottom:1}},
                }

                if(options.alt){
                    this.trigger={display:{flower:[true,true,true],band:[false,true],mouth:true,
                        hair:{back:true,front:true,glow:true},eye:[true,true],sandal:{back:[false,false],front:[false,false]},
                        skin:{legs:true,arms:true,body:true,head:true,button:false},
                        kimono:{main:{back:false,front:false},outside:{back:false,front:false},bow:false,decoration:false},
                        under:{top:true,bottom:true,tanga:false,bow:{top:true,bottom:true},under:{top:true,button:false,bottom:false}},
                    }}
                }else{
                    this.trigger={display:{flower:[true,true,true],band:[true,true],mouth:true,
                        hair:{back:true,front:true,glow:true},eye:[true,true],sandal:{back:[true,true],front:[true,true]},
                        skin:{legs:true,arms:true,body:true,head:true,button:false},
                        kimono:{main:{back:true,front:true},outside:{back:true,front:true},bow:true,decoration:true},
                        under:{top:false,bottom:false,tanga:false,bow:{top:false,bottom:false},under:{top:true,button:false,bottom:false}},
                    }}
                }

                this.trigger.display.mode={
                    sandal:{edge:0},
                }

                this.trigger.display.extra={sword:true,damage:false}

                this.calc={int:[0,0,0,0]}

                this.sprites={spin:0,detail:15,spinDetail:0,spinDetailHead:0,temp:0}

                this.animSet={loop:0,flip:0,hand:1,foot:1}

                this.goal={anim:{direction:this.anim.direction,sword:true}}

                for(let g=0;g<25;g++){
                    this.spin.under.top.push(g*72/5)
                }
                for(let g=0;g<20;g++){
                    this.spin.under.bottom.push(g*18)
                }
                for(let g=0;g<2;g++){
                    this.kimono.decoration.push({spin:90-g*47.5,rotate:random(0,360),y:46-g*4.5,width:0.2,height:1,type:0})
                }
                this.kimono.decoration.push({spin:134,rotate:random(0,360),y:49,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:180,rotate:random(0,360),y:50,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:226,rotate:random(0,360),y:49,width:0.2,height:1,type:0})
                for(let g=0;g<7;g++){
                    this.kimono.decoration.push({spin:270+g*47.5,rotate:random(0,360),y:46-g*4.5,width:0.2,height:1,type:0})
                }
            
                this.kimono.decoration.push({spin:78,rotate:random(0,360),y:38,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:118,rotate:random(0,360),y:42,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:156,rotate:random(0,360),y:44,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:204,rotate:random(0,360),y:44,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:242,rotate:random(0,360),y:42,width:0.2,height:1,type:0})
                for(let g=0;g<5;g++){
                    this.kimono.decoration.push({spin:282+g*47.5,rotate:random(0,360),y:38-g*4.4,width:0.2,height:1,type:0})
                }
            
                this.kimono.decoration.push({spin:96,rotate:random(0,360),y:34,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:138,rotate:random(0,360),y:36,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:180,rotate:random(0,360),y:38,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:222,rotate:random(0,360),y:36,width:0.2,height:1,type:0})
                for(let g=0;g<4;g++){
                    this.kimono.decoration.push({spin:264+g*47.5,rotate:random(0,360),y:32.5-g*4.4,width:0.2,height:1,type:0})
                }
            
                this.kimono.decoration.push({spin:154,rotate:random(0,360),y:30,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:206,rotate:random(0,360),y:30,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:254,rotate:random(0,360),y:27,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:302,rotate:random(0,360),y:22,width:0.2,height:1,type:0})
            
                this.kimono.decoration.push({spin:218,rotate:random(0,360),y:24,width:0.2,height:1,type:0})
            break
            case 'Sakura':
                this.anim={direction:direction,head:direction,sword:1,sword2:0,mouth:{x:8,y:5,open:0},
                    eye:[0,0],eyeStyle:[0,0],under:{top:{x:1,y:1},bottom:{x:1,y:1},bow:{top:{position:{x:1,y:1},size:{x:1,y:1}},bottom:{position:{x:1,y:1},size:{x:1,y:1}}},under:{bottom:1}},
                    kimono:{bow:{position:{x:1,y:1},size:{x:1,y:1}}},
                    wrap:{bow:{position:{x:1,y:1}}},
                    legs:[
                        {top:9,bottom:0,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}},
                        {top:9,bottom:0,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}}
                    ],arms:[
                        {top:27,bottom:9,length:{top:16,bottom:16}},
                        {top:27,bottom:9,length:{top:16,bottom:16}}
                    ]}

                this.kimono={decoration:{large:[],small:[]},string:[]}

                this.under={dressDecoration:{large:[]}}

                this.spin={
                    legs:[{top:-60,bottom:-120},{top:60,bottom:120}],
                    arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],
                    bow:{center:0,end:[-5,5],loop:[-20,20]},
                    under:{top:[[],[]],bottom:[[],[]],tanga:30,under:{top:[-40,40],button:[-39,39],bottom:[0,-15,15,-9,9]}},
                    underBow:{top:{center:0,end:[-4,4],loop:[-16,16]},bottom:{center:0,end:[-4,4],loop:[-16,16]}},
                    necklaceBow:{center:180,end:[172,-172],loop:[160,-160]},
                    wrap:{bow:180,bar:33,center:0},
                    sleeve:{decoration:[]},
                    sandal:[10,-10],eye:[-18,18],flower:[-48,-30],necklace:[-45,45,0],button:0,tail:108,sword:75,mouth:36}

                this.color=graphics.combatant[1].color

                this.parts={eyeLevel:-71.5,flowerLevel:-77.5,necklaceBow:-59,mouth:-68.5,
                    under:{dress:-58,top:-50,bottom:-31,bow:{top:3,bottom:-6.25}},
                    kimono:{main:-58,outside:-62,fringe:-38,shadow:-37.5,bow:-51.5,string:9,flowerLevel:-44},
                    wrap:{bow:-44,bar:7.5},
                    minor:15,
                    legs:[
                        {top:{x:3,y:-32},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}},
                        {top:{x:3,y:-32},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}}
                    ],arms:[
                        {top:{x:3.5,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}},
                        {top:{x:3.5,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}}
                    ]}

                this.graphics={
                    legs:[
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}},
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}}
                    ],arms:[
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}
                    ]}

                this.fades={flower:1,flower2:1,eye:[1,1],mouth:1,
                    sandal:{back:[1,1],front:[1,1]},necklace:{back:1,front:1},sleeve:1,sleeveDecoration:1,
                    skin:{legs:1,arms:1,body:1,head:1,button:1},
                    kimono:{decoration:{fade:{large:1,small:1},position:{large:{x:1,y:1},small:{x:1,y:1}},size:{large:{x:1,y:1},small:{x:1,y:1}}},
                    main:{back:{x:1,y:1},front:{x:1,y:1}},outside:{back:{x:1,y:1},front:{x:1,y:1}},fringe:{back:{x:1,y:1},front:{x:1,y:1}},shadow:{x:1,y:1},bow:1,string:1,flower:1},
                    under:{dress:{back:{x:1,y:1},front:{x:1,y:1},decoration:{fade:{large:1},position:{large:{x:1,y:1}},size:{large:{x:1,y:1}}}},towel:1,top:1,bottom:1,tanga:1,bow:{top:1,bottom:1},under:{top:1,button:1,bottom:1}},
                    wrap:{round:1,bow:1,bar:1,sleeve:1},
                }

                if(options.alt){
                    this.trigger={display:{flower:true,flower2:false,mouth:true,
                        hair:{back:true,front:true,tail:true,glow:true},eye:[true,true],sandal:{back:[false,false],front:[false,false]},sleeve:false,sleeveDecoration:false,necklace:{back:true,front:true},
                        skin:{legs:true,arms:true,body:true,head:true,button:true},
                        kimono:{main:{back:false,front:false},outside:{back:false,front:false},fringe:{back:false,front:false},decoration:{large:false,small:false},shadow:false,bow:false,string:false,flower:false},
                        wrap:{round:false,bow:false,bar:false,sleeve:false},
                        under:{dress:{back:false,front:false,decoration:{large:false}},towel:false,top:true,bottom:true,tanga:false,bow:{top:true,bottom:true},under:{top:true,button:false,bottom:false}},
                    }}
                }else{
                    this.trigger={display:{flower:true,flower2:false,mouth:true,
                        hair:{back:true,front:true,tail:true,glow:true},eye:[true,true],sandal:{back:[true,true],front:[true,true]},sleeve:true,sleeveDecoration:true,necklace:{back:true,front:true},
                        skin:{legs:true,arms:true,body:true,head:true,button:false},
                        kimono:{main:{back:true,front:true},outside:{back:true,front:true},fringe:{back:true,front:true},decoration:{large:true,small:true},shadow:true,bow:true,string:true,flower:true},
                        wrap:{round:true,bow:true,bar:true,sleeve:true},
                        under:{dress:{back:false,front:false,decoration:{large:false}},towel:false,top:false,bottom:false,tanga:false,bow:{top:false,bottom:false},under:{top:true,button:false,bottom:false}},
                    }}
                }

                this.trigger.display.mode={
                    kimono:{main:1},
                    sandal:{edge:0},
                }

                this.trigger.display.extra={sword:true,sword2:true,damage:false}

                this.calc={int:[0,0,0,0]}

                this.sprites={spin:0,detail:15,spinDetail:0,spinDetailHead:0,temp:0}

                this.animSet={loop:0,flip:0,hand:0,foot:0}

                this.goal={anim:{direction:this.anim.direction,sword:true,sword2:true}}

                for(let g=0;g<2;g++){
                    this.kimono.decoration.large.push({spin:90-g*47.5,rotate:24,y:50-g*5,width:0.35,height:1})
                }
                this.kimono.decoration.large.push({spin:134,rotate:12,y:54,width:0.35,height:1})
                this.kimono.decoration.large.push({spin:180,rotate:0,y:55,width:0.35,height:1})
                this.kimono.decoration.large.push({spin:226,rotate:-12,y:54,width:0.35,height:1})
                for(let g=0;g<7;g++){
                    this.kimono.decoration.large.push({spin:270+g*47.5,rotate:-24,y:50-g*5,width:0.35,height:1})
                }
                for(let g=0;g<2;g++){
                    this.kimono.decoration.small.push({spin:66-g*47.5,rotate:24,y:47-g*5,width:0.6,height:0.8})
                }
                this.kimono.decoration.small.push({spin:112,rotate:21,y:52,width:0.6,height:0.8})
                this.kimono.decoration.small.push({spin:156,rotate:6,y:54.5,width:0.6,height:0.8})
                this.kimono.decoration.small.push({spin:204,rotate:-6,y:54.5,width:0.6,height:0.8})
                this.kimono.decoration.small.push({spin:248,rotate:-21,y:52,width:0.6,height:0.8})
                for(let g=0;g<7;g++){
                    this.kimono.decoration.small.push({spin:294+g*47.5,rotate:-24,y:47-g*5,width:0.6,height:0.8})
                }
                for(let g=0;g<15;g++){
                    this.spin.under.top[0].push(g*24)
                    this.spin.under.bottom[0].push(g*24+12)
                }
                for(let g=0;g<20;g++){
                    this.spin.under.top[1].push(g*18)
                    this.spin.under.bottom[1].push(g*18+9)
                }
                for(let g=0;g<21;g++){
                    this.kimono.string.push(g*120/7)
                }
                for(let g=0;g<4;g++){
                    this.spin.sleeve.decoration.push({spin:g*90,rotate:random(0,360),part:0,length:0.3,type:floor(random(0,this.color.sleeve.decoration.length))})
                    this.spin.sleeve.decoration.push({spin:45+g*90,rotate:random(0,360),part:1,length:0.3,type:floor(random(0,this.color.sleeve.decoration.length))})
                    this.spin.sleeve.decoration.push({spin:45+g*90,rotate:random(0,360),part:0,length:0.65,type:floor(random(0,this.color.sleeve.decoration.length))})
                    this.spin.sleeve.decoration.push({spin:g*90,rotate:random(0,360),part:1,length:0.65,type:floor(random(0,this.color.sleeve.decoration.length))})
                    this.spin.sleeve.decoration.push({spin:g*90,rotate:random(0,360),part:0,length:1,type:floor(random(0,this.color.sleeve.decoration.length))})
                    this.spin.sleeve.decoration.push({spin:45+g*90,rotate:random(0,360),part:1,length:1,type:floor(random(0,this.color.sleeve.decoration.length))})
                    this.spin.sleeve.decoration.push({spin:45+g*90,rotate:random(0,360),part:0,length:1.45,type:floor(random(0,this.color.sleeve.decoration.length))})
                    this.spin.sleeve.decoration.push({spin:g*90,rotate:random(0,360),part:1,length:1.45,type:floor(random(0,this.color.sleeve.decoration.length))})
                    this.spin.sleeve.decoration.push({spin:g*90,rotate:random(0,360),part:0,length:1.8,type:floor(random(0,this.color.sleeve.decoration.length))})
                    this.spin.sleeve.decoration.push({spin:45+g*90,rotate:random(0,360),part:1,length:1.8,type:floor(random(0,this.color.sleeve.decoration.length))})
                }
                for(let h=0;h<2;h++){
                    for(let g=0,lg=8+h*2;g<lg;g++){
                        this.under.dressDecoration.large.push({spin:360*g/lg+10,rotate:random(0,360),y:22+(g%2)+h*10,width:0.3,height:1.5,type:0})
                        this.under.dressDecoration.large.push({spin:360*g/lg+180/lg+10,rotate:random(0,360),y:27+(g%2)+h*10,width:0.3,height:1.5,type:0})
                    }
                }
            break
            case 'Certes':
                this.anim={direction:direction,head:direction,mouth:{x:8,y:4,open:0},
                    eye:[0,0],eyeStyle:[0,0],under:{bow:{position:{x:1,y:1},size:{x:1,y:1}}},
                    legs:[
                        {top:9,bottom:0,length:{top:16,bottom:16}},
                        {top:9,bottom:0,length:{top:16,bottom:16}}
                    ],arms:[
                        {top:27,bottom:9,length:{top:16,bottom:16}},
                        {top:27,bottom:9,length:{top:16,bottom:16}}
                    ]}

                this.spin={
                    legs:[{top:-60,bottom:-120},{top:60,bottom:120}],
                    arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],
                    bow:{center:0,end:[-5,5],loop:[-20,20]},
                    eye:[-18,18],mouth:36}

                this.color=graphics.combatant[2].color

                this.parts={eyeLevel:-71.5,mouth:-68.5,
                    under:{dress:-58,bow:3},
                    minor:15,
                    legs:[
                        {top:{x:3,y:-32},middle:{x:0,y:0},bottom:{x:0,y:0}},
                        {top:{x:3,y:-32},middle:{x:0,y:0},bottom:{x:0,y:0}}
                    ],arms:[
                        {top:{x:3.5,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}},
                        {top:{x:3.5,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}}
                    ]}

                this.graphics={
                    legs:[
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}
                    ],arms:[
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}
                    ]}

                this.fades={eye:[1,1],mouth:1,
                    skin:{legs:1,arms:1,body:1,head:1},
                    under:{dress:{back:{x:1,y:1},front:{x:1,y:1}},bow:1},
                }

                this.trigger={display:{mouth:true,
                    hair:{back:true,front:true,glow:true},eye:[true,true],
                    skin:{legs:true,arms:true,body:true,head:true},
                    under:{dress:{back:true,front:true},bow:true},
                }}

                this.trigger.display.extra={damage:false}

                this.calc={int:[0,0,0,0]}

                this.sprites={spin:0,detail:15,spinDetail:0,spinDetailHead:0,temp:0}

                this.animSet={loop:0,flip:0,hand:0,foot:0}

                this.goal={anim:{direction:this.anim.direction}}
            break
            case 'Azis':
                this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                    legs:[{top:9,bottom:0,length:{top:16.5,bottom:16.5}},{top:9,bottom:0,length:{top:16.5,bottom:16.5}}],
                    arms:[{top:24,bottom:9,length:{top:16.5,bottom:16.5}},{top:24,bottom:9,length:{top:16.5,bottom:16.5}}]}
                this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216,sword:0}
                this.color={skin:{head:[230,220,185],body:[85,75,65],legs:[80,70,60],arms:[80,70,60]},eye:{back:[80,0,0],front:[100,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]},button:[70,60,50],hood:[60,50,40],hoodBack:[40,35,30],cape:[30,25,20]}
                this.hood=[{spin:[0,180,105],height:16},{spin:[-180,0,-105],height:16}]
                this.parts={eyeLevel:-75,mouth:-66,minor:15,
                    legs:[{top:{x:3,y:-32},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3,y:-32},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:3.5,y:-58},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-58},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                this.graphics={
                    legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
                this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1},button:1,hood:1,cape:1}
                this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true},button:true,hood:true,cape:true,extra:{damage:false}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0,hand:0,foot:1}
                this.goal={anim:{direction:this.anim.direction,sword:false}}
            break
            case 'Donakho':
                this.anim={direction:direction,fat:1,eye:[0,0],eyeStyle:[0,0],legs:[{top:24,length:{top:12.5}},{top:24,length:{top:12.5}}],arms:[{top:54,length:{top:12.5}},{top:54,length:{top:12.5}}]}
                this.fades={eye:[1,1],beak:{main:1,mouth:1,nostril:1},skin:{legs:1,arms:1,body:1,head:1},hat:1,coat:1}
                this.spin={legs:[{top:-90},{top:90}],arms:[{top:-90},{top:90}],eye:[-18,18]}
                this.color={eye:{back:[0,0,0],front:[0,20,30],glow:[200,255,255]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,250,200],body:[120,130,130],legs:[255,235,175],arms:[255,240,180]},hat:[200,200,75],coat:[165,155,45]}
                this.parts={eyeLevel:-48,beakLevel:-41,minor:13,legs:[{top:{x:4,y:-18},middle:{x:0,y:0}},{top:{x:4,y:-18},middle:{x:0,y:0}}],arms:[{top:{x:3.75,y:-30.5},middle:{x:0,y:0}},{top:{x:3.75,y:-30.5},middle:{x:0,y:0}}]}
                this.graphics={legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                this.trigger={display:{eye:[true,true],beak:{main:true,mouth:true,nostril:true},skin:{legs:true,arms:true,body:true,head:true},hat:true,coat:true,extra:{damage:false}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0,hand:0,foot:0}
                this.goal={anim:{direction:this.anim.direction}}
            break
            case 'Setsuna':
                this.anim={direction:direction,head:direction,sword:1,mouth:{x:8,y:4,open:0},
                    eye:[0,0],eyeStyle:[0,0],under:{top:{x:1,y:1},bottom:{x:1,y:1},bow:{top:{position:{x:1,y:1},size:{x:1,y:1}},bottom:{position:{x:1,y:1},size:{x:1,y:1}}},under:{bottom:1}},
                    kimono:{bow:{position:{x:1,y:1},size:{x:1,y:1}}},
                    legs:[
                        {top:9,bottom:0,length:{top:17,bottom:17,sandal:{back:16.5,front:15.5}}},
                        {top:9,bottom:0,length:{top:17,bottom:17,sandal:{back:16.5,front:15.5}}}
                    ],arms:[
                        {top:24,bottom:9,length:{top:17,bottom:17}},
                        {top:24,bottom:9,length:{top:17,bottom:17}}
                    ]}

                this.kimono={decoration:[]}

                this.spin={
                    legs:[{top:-60,bottom:-120},{top:60,bottom:120}],
                    arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],
                    bow:{center:0,loop:[-24,24]},
                    under:{top:[],bottom:[],tanga:24,piece:36,under:{top:[-40,40],button:[-39,39],bottom:[0,-15,15,-9,9]}},
                    underBow:{top:{center:0,end:[-4,4],loop:[-12,12]},bottom:{center:0,end:[-5,5],loop:[-15,15]}},
                    sandal:[6,-6],eye:[-18,18],flower:[-57,-60,-42],button:0,sword:75,mouth:216}

                this.color=graphics.combatant[3].color

                this.parts={eyeLevel:-78,flowerLevel:[-85,-81,-84],mouth:-71,
                    under:{top:-55,bottom:-34,bow:{top:2.75,bottom:-5}},
                    kimono:{main:-63,outside:-64,bow:-57},
                    minor:15,
                    legs:[
                        {top:{x:3,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}},
                        {top:{x:3,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}}
                    ],arms:[
                        {top:{x:3.5,y:-59},middle:{x:0,y:0},bottom:{x:0,y:0}},
                        {top:{x:3.5,y:-59},middle:{x:0,y:0},bottom:{x:0,y:0}}
                    ],}

                this.graphics={
                    legs:[
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}},
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}}
                    ],arms:[
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}
                    ]}

                this.fades={flower:[1,1,1],eye:[1,1],band:[1,1],mouth:1,
                    sandal:{back:[1,1],front:[1,1]},
                    skin:{legs:1,arms:1,body:1,head:1,button:1},
                    kimono:{decoration:{fade:1,position:{x:1,y:1},size:{x:1,y:1}},
                    main:{back:{x:1,y:1},front:{x:1,y:1}},outside:{back:{x:1,y:1},front:{x:1,y:1}},bow:1,ribbon:1},
                    under:{top:1,bottom:1,tanga:1,bow:{top:1,bottom:1},under:{top:1,button:1,bottom:1}},
                }

                if(options.alt){
                    this.trigger={display:{flower:[true,true,true],band:[false,true],mouth:true,
                        hair:{back:true,front:true,glow:true},eye:[true,true],sandal:{back:[false,false],front:[false,false]},
                        skin:{legs:true,arms:true,body:true,head:true,button:false},
                        kimono:{main:{back:false,front:false},outside:{back:false,front:false},bow:false,decoration:false,ribbon:true},
                        under:{top:true,bottom:true,tanga:false,bow:{top:true,bottom:true},under:{top:true,button:false,bottom:false}},
                    }}
                }else{
                    this.trigger={display:{flower:[true,true,true],band:[true,true],mouth:true,
                        hair:{back:true,front:true,glow:true},eye:[true,true],sandal:{back:[true,true],front:[true,true]},
                        skin:{legs:true,arms:true,body:true,head:true,button:false},
                        kimono:{main:{back:true,front:true},outside:{back:true,front:true},bow:true,decoration:true,ribbon:true},
                        under:{top:false,bottom:false,tanga:false,bow:{top:false,bottom:false},under:{top:true,button:false,bottom:false}},
                    }}
                }

                this.trigger.display.mode={
                    sandal:{edge:0},
                }

                this.trigger.display.extra={sword:true,damage:false}

                this.calc={int:[0,0,0,0]}

                this.sprites={spin:0,detail:15,spinDetail:0,spinDetailHead:0,temp:0}

                this.animSet={loop:0,flip:0,hand:0,foot:0}

                this.goal={anim:{direction:this.anim.direction,sword:true}}

                for(let g=0;g<2;g++){
                    this.kimono.decoration.push({spin:90-g*47.5,rotate:random(0,360),y:50-g*6,width:0.2,height:1,type:0})
                }
                this.kimono.decoration.push({spin:134,rotate:random(0,360),y:57,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:180,rotate:random(0,360),y:59,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:226,rotate:random(0,360),y:57,width:0.2,height:1,type:0})
                for(let g=0;g<7;g++){
                    this.kimono.decoration.push({spin:270+g*47.5,rotate:random(0,360),y:50-g*6,width:0.2,height:1,type:0})
                }
            
                this.kimono.decoration.push({spin:78,rotate:random(0,360),y:42,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:118,rotate:random(0,360),y:48,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:156,rotate:random(0,360),y:51,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:204,rotate:random(0,360),y:51,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:242,rotate:random(0,360),y:48,width:0.2,height:1,type:0})
                for(let g=0;g<5;g++){
                    this.kimono.decoration.push({spin:282+g*47.5,rotate:random(0,360),y:42-g*5.9,width:0.2,height:1,type:0})
                }
            break
            case 'Airi':
                this.anim={direction:direction,head:direction,mouth:{x:6,y:4,open:0},
                    eye:[0,0],eyeStyle:[0,0],
                    legs:[
                        {top:9,bottom:0,length:{top:16,bottom:16}},
                        {top:9,bottom:0,length:{top:16,bottom:16}}
                    ],arms:[
                        {top:27,bottom:9,length:{top:16,bottom:16}},
                        {top:27,bottom:9,length:{top:16,bottom:16}}
                    ]}

                this.spin={
                    legs:[{top:-60,bottom:-120},{top:60,bottom:120}],
                    arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],
                    hair:{pin:[-85,85]},
                    eye:[-18,18],blush:[-17,17],button:0,sword:75,mouth:36}

                this.color=graphics.combatant[4].color

                this.parts={eyeLevel:-72,mouth:-69,blush:-68.5,
                    minor:15,
                    legs:[
                        {top:{x:3,y:-32},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}},
                        {top:{x:3,y:-32},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}}
                    ],arms:[
                        {top:{x:3.5,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}},
                        {top:{x:3.5,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}}
                    ]}

                this.graphics={
                    legs:[
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}},
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}}
                    ],arms:[
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}
                    ]}

                this.fades={eye:[1,1],mouth:1,halo:1,sock:1,shoe:1,
                    hair:{pin:1},
                    uniform:{shirt:1,skirt:1,stripeShirt:1,stripeSkirt:1,collar:1,bow:1,belt:1},
                    skin:{legs:1,arms:1,body:1,head:1,button:1,blush:1},
                }

                this.trigger={display:{mouth:true,halo:true,sock:true,shoe:true,
                    hair:{back:true,front:true,pin:true,glow:true},eye:[true,true],
                    uniform:{shirt:true,skirt:true,stripeShirt:true,stripeSkirt:true,collar:true,bow:true,belt:true},
                    skin:{legs:true,arms:true,body:true,head:true,button:true,blush:true},
                }}

                this.trigger.display.extra={sword:true,damage:false}

                this.calc={int:[0,0,0,0]}

                this.sprites={spin:0,detail:15,spinDetail:0,spinDetailHead:0,temp:0}

                this.animSet={loop:0,flip:0,hand:0,foot:1}

                this.goal={anim:{direction:this.anim.direction}}
            break
            case 'Edgar':
                this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                    legs:[{top:9,bottom:0,length:{top:17,bottom:17}},{top:9,bottom:0,length:{top:17,bottom:17}}],
                    arms:[{top:24,bottom:9,length:{top:17,bottom:17}},{top:24,bottom:9,length:{top:17,bottom:17}}]}
                this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
                this.color={skin:{head:[250,225,125],body:[30,40,50],legs:[20,30,40],arms:[25,35,45]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]},tie:[[80,120,200],[200,80,40]],belt:[[120,60,20],[120,140,160],[80,100,120]],monocle:[[200,210,220],[40,50,60]]}
                this.parts={eyeLevel:-78,mouth:-70,minor:15,
                    legs:[{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                this.graphics={
                    legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
                this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1},tie:1,belt:1,monocle:1}
                this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true},tie:true,belt:true,monocle:true,briefcase:true,extra:{damage:false,sword:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0,hand:0,foot:0}
                this.goal={anim:{direction:this.anim.direction}}
            break
            case 'Chip':
                this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                    legs:[{top:9,bottom:0,length:{top:17,bottom:17}},{top:9,bottom:0,length:{top:17,bottom:17}}],
                    arms:[{top:24,bottom:9,length:{top:17,bottom:17}},{top:24,bottom:9,length:{top:17,bottom:17}}]}
                this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
                this.color={skin:{head:[240,220,180],body:[220,220,220],upperBody:[240,240,240],legs:[210,210,210],arms:[230,230,230]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]},rose:[[50,200,50],[200,50,50]],bowtie:[[200,200,120],[100,100,100]],hat:[240,240,240]}
                this.parts={eyeLevel:-78,mouth:-70,minor:15,
                    legs:[{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                this.graphics={
                    legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
                this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1},rose:1,bowtie:1,hat:1}
                this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true},rose:true,bowtie:true,hat:true,extra:{damage:false}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0,hand:1,foot:0}
                this.goal={anim:{direction:this.anim.direction}}
            break
            case 'Ume':
                this.anim={direction:direction,head:direction,sword:1,mouth:{x:6,y:4,open:0},
                    eye:[0,0],eyeStyle:[0,0],under:{top:{x:1,y:1},bottom:{x:1,y:1},bow:{
                        top:[{position:{x:1,y:1},size:{x:1,y:1}},{position:{x:1,y:1},size:{x:1,y:1}}],
                        bottom:[{position:{x:1,y:1},size:{x:1,y:1}},{position:{x:1,y:1},size:{x:1,y:1}}],
                        extra:{position:{x:1,y:1},size:{x:1,y:1}}},under:{bottom:1}},
                    kimono:{bow:{position:{x:1,y:1},size:{x:1,y:1}}},
                    wrap:{bow:{position:{x:1,y:1}}},
                    legs:[
                        {top:9,bottom:0,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}},
                        {top:9,bottom:0,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}}
                    ],arms:[
                        {top:27,bottom:9,length:{top:16,bottom:16}},
                        {top:27,bottom:9,length:{top:16,bottom:16}}
                    ]}

                this.spin={
                    legs:[{top:-60,bottom:-120},{top:60,bottom:120}],
                    arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],
                    bow:{center:-36},
                    under:{top:[[[],[]],[[],[]],[[],[]],[[],[]],[[],[]]],bottom:[[],[],[],[],[]],shawl:[],piece:54,tanga:30,under:{top:[-40,40],button:[-39,39],bottom:[0,-15,15,-9,9]}},
                    underBow:{top:[{center:-40,end:[-43,-37],loop:[-49,-31]},{center:40,end:[37,43],loop:[31,49]}],bottom:[{center:-90,loop:[-120,-60]},{center:90,loop:[60,120]}],extra:{center:0,end:[-5,5],loop:[-15,15]}},
                    necklaceBow:{center:180,end:[172,-172],loop:[160,-160]},
                    hair:{pin:[-85,85]},
                    wrap:{bow:24,center:0},
                    sleeve:{decoration:[]},
                    sandal:[10,-10],eye:[-18,18],blush:[-17,17],button:0,sword:75,mouth:216}

                this.color=graphics.combatant[10].color

                this.parts={eyeLevel:-72,mouth:-65,blush:-68.5,
                    under:{top:-51,bottom:-31,bow:{top:[-1.8,-1.8],bottom:[-5.8,-5.8],extra:2.5}},
                    kimono:{main:-58,bow:-42},
                    wrap:{bow:-45.5},
                    minor:15,
                    legs:[
                        {top:{x:3,y:-32},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}},
                        {top:{x:3,y:-32},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}}
                    ],arms:[
                        {top:{x:3.5,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}},
                        {top:{x:3.5,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}}
                    ]}

                this.graphics={
                    legs:[
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}},
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}}
                    ],arms:[
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}
                    ]}

                this.fades={eye:[1,1],mouth:1,
                    sandal:{back:[1,1],front:[1,1]},
                    hair:{pin:1},
                    sleeve:1,sleeveDecoration:1,
                    skin:{legs:1,arms:1,body:1,head:1,button:1,blush:1},
                    kimono:{main:{back:{x:1,y:1},front:{x:1,y:1}},decoration:{fade:{large:1},position:{large:{x:1,y:1}},size:{large:{x:1,y:1}}},bow:1},
                    under:{top:1,bottom:1,shawl:1,bow:{top:[1,1],bottom:[1,1],extra:1},tanga:1,under:{top:1,button:1,bottom:1}},
                    wrap:{round:1,bow:1,sleeve:1},
                }

                if(options.alt){
                    this.trigger={display:{mouth:true,
                        hair:{back:true,front:true,pin:true,glow:true},eye:[true,true],sleeve:false,sleeveDecoration:false,sandal:{back:[false,false],front:[false,false]},
                        skin:{legs:true,arms:true,body:true,head:true,button:true,blush:true},
                        kimono:{main:{back:false,front:false},decoration:{large:false},bow:false},
                        wrap:{round:false,bow:false,sleeve:false},
                        under:{top:true,bottom:true,shawl:true,bow:{top:[true,true],bottom:[true,true],extra:true},tanga:false,under:{top:true,button:false,bottom:false}},
                    }}
                }else{
                    this.trigger={display:{mouth:true,
                        hair:{back:true,front:true,pin:true,glow:true},eye:[true,true],sleeve:true,sleeveDecoration:true,sandal:{back:[true,true],front:[true,true]},
                        skin:{legs:true,arms:true,body:true,head:true,button:true,blush:true},
                        kimono:{main:{back:true,front:true},decoration:{large:true},bow:true},
                        wrap:{round:true,bow:true,sleeve:true},
                        under:{top:false,bottom:false,shawl:false,bow:{top:[false,false],bottom:[false,false],extra:false},tanga:false,under:{top:true,button:false,bottom:false}},
                    }}
                }

                this.trigger.display.mode={
                    kimono:{main:1},
                    sandal:{edge:0},
                }

                this.trigger.display.extra={sword:true,damage:false}

                this.calc={int:[0,0,0,0]}

                this.sprites={spin:0,detail:15,spinDetail:0,spinDetailHead:0,temp:0}

                this.animSet={loop:0,flip:0,hand:0,foot:1}

                this.goal={anim:{direction:this.anim.direction,sword:true}}

                this.spin.sleeve.decoration.push({spin:0,rotate:random(0,360),part:0,length:0.4,type:floor(random(0,15))})
                this.spin.sleeve.decoration.push({spin:120,rotate:random(0,360),part:0,length:0.4,type:floor(random(0,15))})
                this.spin.sleeve.decoration.push({spin:240,rotate:random(0,360),part:0,length:0.4,type:floor(random(0,15))})
                this.spin.sleeve.decoration.push({spin:60,rotate:random(0,360),part:0,length:0.95,type:floor(random(0,15))})
                this.spin.sleeve.decoration.push({spin:180,rotate:random(0,360),part:0,length:0.95,type:floor(random(0,15))})
                this.spin.sleeve.decoration.push({spin:300,rotate:random(0,360),part:0,length:0.95,type:floor(random(0,15))})
                this.spin.sleeve.decoration.push({spin:0,rotate:random(0,360),part:0,length:1.35,type:floor(random(0,15))})
                this.spin.sleeve.decoration.push({spin:120,rotate:random(0,360),part:0,length:1.35,type:floor(random(0,15))})
                this.spin.sleeve.decoration.push({spin:240,rotate:random(0,360),part:0,length:1.35,type:floor(random(0,15))})
                this.spin.sleeve.decoration.push({spin:60,rotate:random(0,360),part:0,length:1.7,type:floor(random(0,15))})
                this.spin.sleeve.decoration.push({spin:180,rotate:random(0,360),part:0,length:1.7,type:floor(random(0,15))})
                this.spin.sleeve.decoration.push({spin:300,rotate:random(0,360),part:0,length:1.7,type:floor(random(0,15))})

                this.spin.sleeve.decoration.push({spin:60,rotate:random(0,360),part:1,length:0.4,type:floor(random(0,15))})
                this.spin.sleeve.decoration.push({spin:180,rotate:random(0,360),part:1,length:0.4,type:floor(random(0,15))})
                this.spin.sleeve.decoration.push({spin:300,rotate:random(0,360),part:1,length:0.4,type:floor(random(0,15))})
                this.spin.sleeve.decoration.push({spin:0,rotate:random(0,360),part:1,length:0.95,type:floor(random(0,15))})
                this.spin.sleeve.decoration.push({spin:120,rotate:random(0,360),part:1,length:0.95,type:floor(random(0,15))})
                this.spin.sleeve.decoration.push({spin:240,rotate:random(0,360),part:1,length:0.95,type:floor(random(0,15))})
                this.spin.sleeve.decoration.push({spin:60,rotate:random(0,360),part:1,length:1.35,type:floor(random(0,15))})
                this.spin.sleeve.decoration.push({spin:180,rotate:random(0,360),part:1,length:1.35,type:floor(random(0,15))})
                this.spin.sleeve.decoration.push({spin:300,rotate:random(0,360),part:1,length:1.35,type:floor(random(0,15))})
                this.spin.sleeve.decoration.push({spin:0,rotate:random(0,360),part:1,length:1.7,type:floor(random(0,15))})
                this.spin.sleeve.decoration.push({spin:120,rotate:random(0,360),part:1,length:1.7,type:floor(random(0,15))})
                this.spin.sleeve.decoration.push({spin:240,rotate:random(0,360),part:1,length:1.7,type:floor(random(0,15))})

                for(let h=0;h<5;h++){
                    for(let g=0,lg=3-h/2;g<lg;g++){
                        if(lg==1){
                            this.spin.under.top[h][1].push(-40)
                            this.spin.under.top[h][1].push(40)
                        }else{
                            this.spin.under.top[h][0].push(-40-(lg-1)*8+g/(ceil(lg-1))*(lg-1)*16)
                            this.spin.under.top[h][1].push(40-(lg-1)*8+g/ceil(lg-1)*(lg-1)*16)
                        }
                    }
                }
                for(let g=0;g<12;g++){
                    for(let h=0;h<5;h++){
                        this.spin.under.bottom[h].push(g*30+h*18)
                    }
                }
            break
            case 'Drunk Boss': case 'Enforcer': case 'Bomber Boy': case 'Chief Engineering Officer': case 'Gangmaster':
                this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                    legs:[{top:9,bottom:0,length:{top:19,bottom:19}},{top:9,bottom:0,length:{top:19,bottom:19}}],
                    arms:[{top:24,bottom:9,length:{top:19,bottom:19}},{top:24,bottom:9,length:{top:19,bottom:19}}]}
                this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
                this.parts={eyeLevel:-87,mouth:-79,minor:15,
                    legs:[{top:{x:4,y:-38},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-38},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:7,y:-67},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:7,y:-67},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                this.graphics={
                    legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
                this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1}}
                this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0,hand:0,foot:0}
                this.goal={anim:{direction:this.anim.direction}}
                switch(this.name){
                    case 'Drunk Boss':
                        this.color={skin:{head:[240,220,180],body:[120,60,20],legs:[120,60,20],arms:[120,60,20]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.belt=[90,45,15]
                        this.color.bottle=[60,30,15]
                        this.fades.belt=1
                        this.fades.bottle=1
                        this.trigger.display.belt=true
                        this.trigger.display.bottle=true
                    break
                    case 'Enforcer':
                        this.color={skin:{head:[240,220,180],body:[125,200,125],legs:[120,200,120],arms:[115,195,115]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.button=[75,150,75]
                        this.color.glasses=[[40,40,40],[255,255,255]]
                        this.fades.button=1
                        this.fades.glasses=1
                        this.trigger.display.button=true
                        this.trigger.display.glasses=true
                    break
                    case 'Bomber Boy':
                        this.color={skin:{head:[240,220,180],body:[180,60,60],legs:[175,55,55],arms:[170,50,50]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.helmet=[120,40,40]
                        this.color.logo=[135,45,45]
                        this.color.emblem=[220,220,220]
                        this.fades.helmet=1
                        this.fades.logo=1
                        this.fades.emblem=1
                        this.trigger.display.helmet=true
                        this.trigger.display.logo=true
                        this.trigger.display.emblem=true
                    break
                    case 'Chief Engineering Officer':
                        this.color={skin:{head:[240,220,180],body:[70,70,70],legs:[60,60,60],arms:[255,200,25]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.skin.upperBody=[20,60,100]
                        this.color.tie=[[160,200,220],[255,150,0]]
                        this.color.coat=[255,225,50]
                        this.color.hat=[255,255,100]
                        this.color.belt=[160,100,20]
                        this.fades.tie=1
                        this.fades.coat=1
                        this.fades.hat=1
                        this.fades.belt=1
                        this.trigger.display.tie=true
                        this.trigger.display.coat=true
                        this.trigger.display.hat=true
                        this.trigger.display.belt=true
                    break
                    case 'Gangmaster':
                        this.color={skin:{head:[240,220,180],body:[60,20,50],legs:[50,10,40],arms:[50,10,40]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.tie=[[240,240,240],[40,0,30]]
                        this.color.pocket=[220,220,220]
                        this.color.beard=[60,60,60]
                        this.fades.tie=1
                        this.fades.pocket=1
                        this.fades.beard=1
                        this.trigger.display.tie=true
                        this.trigger.display.pocket=true
                        this.trigger.display.beard=true
                    break
                }
            break
            case 'Pointy': case 'Little Guy': case 'Rich Kid': case 'Latency':
                this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                    legs:[{top:12,bottom:0,length:{top:14,bottom:14}},{top:12,bottom:0,length:{top:14,bottom:14}}],
                    arms:[{top:27,bottom:12,length:{top:14,bottom:14}},{top:27,bottom:12,length:{top:14,bottom:14}}]}
                this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
                this.parts={eyeLevel:-69,mouth:-61,minor:15,
                    legs:[{top:{x:3.5,y:-31},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-31},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:4,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                this.graphics={
                    legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
                this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1}}
                this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0,hand:0,foot:0}
                this.goal={anim:{direction:this.anim.direction}}
                switch(this.name){
                    case 'Pointy':
                        this.color={skin:{head:[240,220,150],body:[50,150,200],legs:[50,150,200],arms:[200,50,50]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.skin.upperBody=[200,50,50]
                        this.anim.sword=1
                        this.spin.sword=75
                        this.fades.sword=1
                        this.trigger.display.extra={sword:true}
                    break
                    case 'Little Guy':
                        this.color={skin:{head:[240,220,150],body:[120,80,40],legs:[110,70,30],arms:[150,200,200]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.skin.upperBody=[150,200,200]
                    break
                    case 'Rich Kid':
                        this.color={skin:{head:[240,220,180],body:[60,80,120],legs:[55,75,115],arms:[105,145,165]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.skin.upperBody=[100,140,160]
                        this.color.tie=[[180,160,60],[200,255,50]]
                        this.color.chocolate=[80,50,10]
                        this.fades.tie=1
                        this.fades.chocolate=1
                        this.trigger.display.tie=true
                        this.trigger.display.chocolate=true
                        this.anim.eyeStyle=[4,4]
                    break
                    case 'Latency':
                        this.color={eye:{back:[255,150,150],front:[255,50,50],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    break
                }
            break
            case 'Duck': case 'Fungal Duck': case 'Duckforce': case 'Blue Duck':
                this.anim={direction:direction,eye:[0,0],legs:[{top:24,length:{top:10}},{top:24,length:{top:10}}],arms:[{top:54,length:{top:10}},{top:54,length:{top:10}}]}
                this.fades={eye:[1,1],beak:{main:1,mouth:1,nostril:1},skin:{legs:1,arms:1,body:1,head:1}}
                this.spin={legs:[{top:-90},{top:90}],arms:[{top:-90},{top:90}],eye:[-18,18]}
                this.parts={eyeLevel:-40,beakLevel:-33,legs:[{top:{x:3,y:-15},middle:{x:0,y:0}},{top:{x:3,y:-15},middle:{x:0,y:0}}],arms:[{top:{x:3.5,y:-25},middle:{x:0,y:0}},{top:{x:3.5,y:-25},middle:{x:0,y:0}}]}
                this.graphics={legs:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}],arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
                this.trigger={display:{eye:[true,true],beak:{main:true,mouth:true,nostril:true},skin:{legs:true,arms:true,body:true,head:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                switch(this.name){
                    case 'Duck':
                        this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,235,25],body:[255,225,15],legs:[255,210,0],arms:[255,215,5]}}
                    break
                    case 'Fungal Duck':
                        this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,235,25],body:[255,225,15],legs:[255,210,0],arms:[255,215,5]}}
                        this.color.fungus=[[200,160,120],[180,170,160]]
                        this.fades.fungus=1
                        this.trigger.display.fungus=true
                    break
                    case 'Duckforce':
                        this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,235,25],body:[66,22,22],legs:[72,24,24],arms:[78,26,26]}}
                        this.color.helmet=[60,20,20]
                        this.fades.helmet=1
                        this.trigger.display.helmet=true
                    break
                    case 'Blue Duck':
                        this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[90,0,255],body:[75,0,215],legs:[60,0,175],arms:[65,0,180]}}
                    break
                }
            break
            case 'Big Duck': case 'Agent Duck': case 'General Duckion':
                this.anim={direction:direction,eye:[0,0],legs:[{top:24,length:{top:15}},{top:24,length:{top:15}}],arms:[{top:54,length:{top:15}},{top:54,length:{top:15}}]}
                this.fades={eye:[1,1],beak:{main:1,mouth:1,nostril:1},skin:{legs:1,arms:1,body:1,head:1}}
                this.spin={legs:[{top:-90},{top:90}],arms:[{top:-90},{top:90}],eye:[-18,18]}
                this.parts={eyeLevel:-56,beakLevel:-49,legs:[{top:{x:5,y:-21},middle:{x:0,y:0}},{top:{x:5,y:-21},middle:{x:0,y:0}}],arms:[{top:{x:4,y:-36},middle:{x:0,y:0}},{top:{x:4,y:-36},middle:{x:0,y:0}}]}
                this.graphics={legs:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}],arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
                this.trigger={display:{eye:[true,true],beak:{main:true,mouth:true,nostril:true},skin:{legs:true,arms:true,body:true,head:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                switch(this.name){
                    case 'Big Duck':
                        this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,235,25],body:[255,225,15],legs:[255,210,0],arms:[255,215,5]}}
                    break
                    case 'Agent Duck':
                        this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,235,25],body:[60,60,60],legs:[255,210,0],arms:[255,215,5]}}
                        this.color.tie=[[240,240,240],[100,150,255]]
                        this.color.hat=[40,40,40]
                        this.color.sunglasses=[0,0,0]
                        this.fades.tie=1
                        this.fades.hat=1
                        this.fades.sunglasses=1
                        this.trigger.display.tie=true
                        this.trigger.display.hat=true
                        this.trigger.display.sunglasses=true
                    break
                    case 'General Duckion':
                        this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,235,25],body:[66,22,22],legs:[72,24,24],arms:[78,26,26]}}
                        this.color.helmet=[60,20,20]
                        this.color.badge=[[200,200,200],[255,255,150]]
                        this.fades.helmet=1
                        this.fades.badge=1
                        this.trigger.display.helmet=true
                        this.trigger.display.badge=true
                    break
                }
            break
            case 'Monkey': case 'Monkey Gangster': case 'AllyMonkey':
                this.anim={direction:direction,head:direction,mouth:{x:12,y:8,open:0},eye:[0,0],eyeStyle:[0,0],
                    legs:[{top:9,bottom:0,length:{top:9,bottom:9}},{top:9,bottom:0,length:{top:9,bottom:9}}],
                    arms:[{top:24,bottom:9,length:{top:9,bottom:9}},{top:24,bottom:9,length:{top:9,bottom:9}}]}
                this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
                this.parts={eyeLevel:-60,mouth:-48,minor:20,
                    legs:[{top:{x:4,y:-18},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-18},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:8,y:-30},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:8,y:-30},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                this.graphics={
                    legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
                this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1}}
                this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0,hand:0,foot:0}
                this.goal={anim:{direction:this.anim.direction}}
                switch(this.name){
                    case 'Monkey':
                        this.color={skin:{head:[190,95,0],body:[170,85,0],legs:[160,80,0],arms:[160,80,0]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    break
                    case 'Monkey Gangster':
                        this.color={skin:{head:[190,95,0],body:[225,225,225],legs:[220,220,220],arms:[215,215,215]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.tie=[[250,250,250],[100,200,200]]
                        this.color.hat=[210,210,210]
                        this.fades.tie=1
                        this.fades.hat=1
                        this.trigger.display.tie=true
                        this.trigger.display.hat=true
                    break
                    case 'AllyMonkey':
                        this.color={skin:{head:[190,155,0],body:[170,145,0],legs:[160,140,0],arms:[160,140,0]},eye:{back:[0,50,0],front:[0,25,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.spin.eye=[-27,27]
                        this.parts.eyeLevel+=3
                        this.trigger.display.sprig=true
                    break
                }
            break
            case 'Orb Walker':
                this.anim={direction:direction,legs:[{top:39,length:{top:36}},{top:39,length:{top:36}},{top:39,length:{top:36}},{top:39,length:{top:36}}]}
                this.fades={body:1,cover:1,legs:1}
                this.spin={legs:[{top:-45},{top:-135},{top:135},{top:45}]}
                this.color={body:[[30,120,110],[30,210,200]],cover:[200,180,120],outer:[130,110,75]}
                this.parts={legs:[{top:{x:0,y:-30},middle:{x:0,y:0}},{top:{x:0,y:-30},middle:{x:0,y:0}},{top:{x:0,y:-30},middle:{x:0,y:0}},{top:{x:0,y:-30},middle:{x:0,y:0}}]}
                this.graphics={legs:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
                this.trigger={display:{body:true,cover:true,legs:true}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
            break
            case 'Modicum':
                this.anim={direction:direction,eye:[0,0],arms:[{top:54,length:{top:6}},{top:54,length:{top:6}}]}
                this.fades={eye:[1,1],skin:{arms:1,body:1}}
                this.spin={arms:[{top:-90},{top:90}],eye:[-24,24]}
                this.parts={eyeLevel:-18,arms:[{top:{x:14,y:-14},middle:{x:0,y:0}},{top:{x:14,y:-14},middle:{x:0,y:0}}]}
                this.graphics={arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
                this.trigger={display:{eye:[true,true],skin:{arms:true,body:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={eye:{back:[0,0,0]},skin:{body:[240,240,220],arms:[235,235,215]}}
            break
            case 'Slime': case 'Spike Slime': case 'Slimoid':
                this.anim={direction:direction,eye:[0,0],arms:[{top:54,length:{top:10}},{top:54,length:{top:10}}]}
                this.fades={eye:[1,1],skin:{arms:1,body:1}}
                this.spin={arms:[{top:-90},{top:90}],eye:[-24,24]}
                this.parts={eyeLevel:-30,arms:[{top:{x:30,y:-20},middle:{x:0,y:0}},{top:{x:30,y:-20},middle:{x:0,y:0}}]}
                this.graphics={arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
                this.trigger={display:{eye:[true,true],skin:{arms:true,body:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                switch(this.name){
                    case 'Slime':
                        this.color={eye:{back:[0,0,0]},skin:{body:[150,255,50],arms:[140,245,40]}}
                    break
                    case 'Spike Slime':
                        this.color={eye:{back:[0,0,0]},skin:{body:[150,100,50],arms:[145,95,45]}}
                    break
                    case 'Slimoid':
                        this.color={eye:{back:[0,0,0]},skin:{body:[240,240,220],arms:[235,235,215]}}
                    break
                }
            break
            case 'Big Slime': case 'Big Spike Slime': case 'Big Slimoid':
                this.anim={direction:direction,eye:[0,0],arms:[{top:54,length:{top:15}},{top:54,length:{top:15}}]}
                this.fades={eye:[1,1],skin:{arms:1,body:1}}
                this.spin={arms:[{top:-90},{top:90}],eye:[-24,24]}
                this.parts={eyeLevel:-45,arms:[{top:{x:45,y:-30},middle:{x:0,y:0}},{top:{x:45,y:-30},middle:{x:0,y:0}}]}
                this.graphics={arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
                this.trigger={display:{eye:[true,true],skin:{arms:true,body:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                switch(this.name){
                    case 'Big Slime':
                        this.color={eye:{back:[0,0,0]},skin:{body:[150,255,50],arms:[140,245,40]}}
                    break
                    case 'Big Spike Slime':
                        this.color={eye:{back:[0,0,0]},skin:{body:[150,100,50],arms:[145,95,45]}}
                    break
                    case 'Big Slimoid':
                        this.color={eye:{back:[0,0,0]},skin:{body:[240,240,220],arms:[235,235,215]}}
                    break
                }
            break
            case 'Slime Boss':
                this.anim={direction:direction,eye:[0,0],arms:[{top:54,length:{top:22.5}},{top:54,length:{top:22.5}}]}
                this.fades={eye:[1,1],skin:{arms:1,body:1}}
                this.spin={arms:[{top:-90},{top:90}],eye:[-24,24]}
                this.parts={eyeLevel:-67.5,arms:[{top:{x:67.5,y:-45},middle:{x:0,y:0}},{top:{x:67.5,y:-45},middle:{x:0,y:0}}]}
                this.graphics={arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
                this.trigger={display:{eye:[true,true],skin:{arms:true,body:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={eye:{back:[0,0,0]},skin:{body:[150,255,50],arms:[140,245,40]}}
            break
            case 'Spheron':
                this.anim={direction:direction}
                this.fades={body:1,balls:1}
                this.spin={legs:[{top:-45},{top:-135},{top:135},{top:45}]}
                this.color={body:[225,220,200],balls:[220,215,195],highlight:[235,120,110]}
                this.trigger={display:{body:true,balls:true}}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
            break
            case 'Rock Golem': case 'Shield Particle':
                this.anim={direction:direction,eye:[0,0],arms:[{top:54,length:{top:36}},{top:54,length:{top:36}}]}
                this.fades={eye:[1,1],skin:{arms:1,body:1}}
                this.spin={arms:[{top:-90},{top:90}],eye:[-36,36]}
                this.parts={eyeLevel:-46,arms:[{top:{x:0,y:-48},middle:{x:0,y:0}},{top:{x:0,y:-48},middle:{x:0,y:0}}]}
                this.graphics={arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
                this.trigger={display:{eye:[true,true],skin:{arms:true,body:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                switch(this.name){
                    case 'Rock Golem':
                        this.color={eye:{back:[32,30,28]},skin:{body:[80,75,70]}}
                    break
                    case 'Shield Particle':
                        this.color={eye:{back:[90,10,60]},skin:{body:[180,20,120]}}
                    break
                }
            break
            case 'Goblin': case 'Sneaky Gremlin': case 'Fat Gremlin': case 'Angry Gremlin': case 'Gremlin': case 'Elf Archer':
                this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
                this.graphics={
                    legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
                this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1}}
                this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0,hand:0,foot:0}
                switch(this.name){
                    case 'Goblin':
                        this.color={skin:{head:[150,200,50],body:[100,150,50],legs:[95,145,45],arms:[90,140,40]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.trigger.display.ear=true
                        this.anim={direction:direction,head:direction,thick:4,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                            legs:[{top:9,bottom:0,length:{top:9,bottom:9}},{top:9,bottom:0,length:{top:9,bottom:9}}],
                            arms:[{top:24,bottom:9,length:{top:9,bottom:9}},{top:24,bottom:9,length:{top:9,bottom:9}}]}
                        this.parts={eyeLevel:-44,mouth:-36,minor:12,
                            legs:[{top:{x:3.5,y:-18},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-18},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                            arms:[{top:{x:4,y:-30},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-30},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                    break
                    case 'Sneaky Gremlin':
                        this.color={skin:{head:[175,75,125],body:[150,50,100],legs:[145,45,95],arms:[140,40,90]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.trigger.display.ear=true
                        this.anim={direction:direction,head:direction,thick:3,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                            legs:[{top:9,bottom:0,length:{top:10,bottom:10}},{top:9,bottom:0,length:{top:10,bottom:10}}],
                            arms:[{top:24,bottom:9,length:{top:10,bottom:10}},{top:24,bottom:9,length:{top:10,bottom:10}}]}
                        this.parts={eyeLevel:-52,mouth:-44,minor:12,
                            legs:[{top:{x:3,y:-20},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3,y:-20},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                            arms:[{top:{x:3.5,y:-36},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-36},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                    break
                    case 'Fat Gremlin':
                        this.color={skin:{head:[175,100,75],body:[150,75,50],legs:[145,70,45],arms:[140,65,40]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.trigger.display.ear=true
                        this.anim={direction:direction,head:direction,thick:5,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                            legs:[{top:9,bottom:0,length:{top:7,bottom:7}},{top:9,bottom:0,length:{top:7,bottom:7}}],
                            arms:[{top:24,bottom:9,length:{top:7,bottom:7}},{top:24,bottom:9,length:{top:7,bottom:7}}]}
                        this.parts={eyeLevel:-46,mouth:-38,minor:15,
                            legs:[{top:{x:5,y:-14},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:5,y:-14},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                            arms:[{top:{x:6,y:-24},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:6,y:-24},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                    break
                    case 'Angry Gremlin':
                        this.color={skin:{head:[175,50,50],body:[150,25,25],legs:[145,20,20],arms:[140,15,15]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.trigger.display.ear=true
                        this.anim={direction:direction,head:direction,thick:4,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                            legs:[{top:9,bottom:0,length:{top:14,bottom:14}},{top:9,bottom:0,length:{top:14,bottom:14}}],
                            arms:[{top:24,bottom:9,length:{top:14,bottom:14}},{top:24,bottom:9,length:{top:14,bottom:14}}]}
                        this.parts={eyeLevel:-64,mouth:-56,minor:12,
                            legs:[{top:{x:3,y:-28},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3,y:-28},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                            arms:[{top:{x:4,y:-48},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-48},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                    break
                    case 'Gremlin':
                        this.color={skin:{head:[50,200,150],body:[50,150,100],legs:[45,145,95],arms:[40,140,90]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.trigger.display.ear=true
                        this.anim={direction:direction,head:direction,thick:3,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                            legs:[{top:9,bottom:0,length:{top:10,bottom:10}},{top:9,bottom:0,length:{top:10,bottom:10}}],
                            arms:[{top:24,bottom:9,length:{top:10,bottom:10}},{top:24,bottom:9,length:{top:10,bottom:10}}]}
                        this.parts={eyeLevel:-58,mouth:-50,minor:13.5,
                            legs:[{top:{x:3,y:-20},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3,y:-20},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                            arms:[{top:{x:3.5,y:-40},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-40},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                    break
                    case 'Elf Archer':
                        this.color={skin:{head:[255,225,220],body:[160,220,230],legs:[255,225,220],arms:[255,220,215]},eye:{back:[115,55,45],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.skin.upperBody=[155,170,110]
                        this.color.hair=[150,70,60]
                        this.color.waistband=[220,225,235]
                        this.color.bows=[100,90,90]
                        this.color.belt=[55,50,60]
                        this.fades.hair=1
                        this.fades.waistband=1
                        this.fades.bows=1
                        this.fades.belt=1
                        this.trigger.display.hair=true
                        this.trigger.display.waistband=true
                        this.trigger.display.bows=true
                        this.trigger.display.belt=true
                        this.trigger.display.ear=true
                        this.anim={direction:direction,head:direction,thick:4,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                            legs:[{top:9,bottom:0,length:{top:14,bottom:14}},{top:9,bottom:0,length:{top:14,bottom:14}}],
                            arms:[{top:24,bottom:9,length:{top:14,bottom:14}},{top:24,bottom:9,length:{top:14,bottom:14}}]}
                        this.parts={eyeLevel:-62.5,mouth:-54.5,minor:13.5,
                            legs:[{top:{x:3.5,y:-28},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-28},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                            arms:[{top:{x:4,y:-44},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-44},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                    break
                }
                this.goal={anim:{direction:this.anim.direction}}
            break
            case 'Fat Scrapper':
                this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                    legs:[{top:9,bottom:0,length:{top:13,bottom:13}},{top:9,bottom:0,length:{top:13,bottom:13}}],
                    arms:[{top:24,bottom:9,length:{top:13,bottom:13}},{top:24,bottom:9,length:{top:13,bottom:13}}]}
                this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
                this.parts={eyeLevel:-63,mouth:-55,minor:15,
                    legs:[{top:{x:7.5,y:-26},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:7.5,y:-26},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:16,y:-41},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:16,y:-41},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                this.graphics={
                    legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
                this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1}}
                this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0,hand:0,foot:0}
                this.goal={anim:{direction:this.anim.direction}}
                switch(this.name){
                    case 'Fat Scrapper':
                        this.color={skin:{head:[240,220,180],body:[120,120,120],legs:[115,115,115],arms:[110,110,110]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.belt=[[100,100,100],[60,60,60],[80,80,80]]
                        this.color.goggles=[200,200,200]
                        this.fades.belt=1
                        this.fades.goggles=0.6
                        this.trigger.display.belt=true
                        this.trigger.display.goggles=true
                    break
                }
            break
            case 'Donu': case 'Deca':
                this.anim={direction:direction,
                    legs:[{top:9,bottom:0,length:{top:10,bottom:10}},{top:9,bottom:0,length:{top:10,bottom:10}}],
                    arms:[{top:24,bottom:9,length:{top:10,bottom:10}},{top:24,bottom:9,length:{top:10,bottom:10}}]}
                this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}]}
                this.parts={
                    legs:[{top:{x:5,y:-20},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:5,y:-20},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:30,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:30,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                this.graphics={
                    legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
                this.fades={skin:{legs:1,arms:1,body:1}}
                this.trigger={display:{skin:{legs:true,arms:true,body:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                switch(this.name){
                    case 'Donu':
                        this.color={skin:{body:[[135,175,130],[80,110,85]],legs:[90,125,95],arms:[90,125,95]}}
                    break
                    case 'Deca':
                        this.color={skin:{body:[[250,235,155],[235,140,70],[235,180,100],[185,115,70]],legs:[235,170,100],arms:[235,170,100]}}
                    break
                }
            break
            case 'Flame':
                this.anim={direction:direction,glow:1}
                this.color=[150,255,50]
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
            break
            case 'Hexaghost Orb':
                this.anim={direction:direction,glow:1}
                this.color=[150,255,50]
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
            break
            case 'Hexaghost Core':
                this.anim={direction:direction,glow:1}
                this.color={glow:[[130,55,110],[150,70,130],[170,85,150],[190,100,170],[210,115,190],[230,130,210]],base:[[225,220,185],[245,240,205]]}
                this.fades={glow:1,base:1}
                this.trigger={display:{glow:true,base:true}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
            break
            case 'Bronze Automaton':
                this.anim={direction:direction,
                    legs:[{top:9,bottom:0,length:{top:15,bottom:15}},{top:9,bottom:0,length:{top:15,bottom:15}}],
                    arms:[{top:24,bottom:9,length:{top:15,bottom:15}},{top:24,bottom:9,length:{top:15,bottom:15}}]}
                this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}]}
                this.parts={
                    legs:[{top:{x:9,y:-30},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:9,y:-30},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:12,y:-72},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:12,y:-72},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                this.graphics={
                    legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
                this.color={skin:{legs:[100,70,30],arms:[100,70,30]},gear:[80,50,10],main:[[120,90,50],[180,150,130]],diamond:[[200,150,100],[250,200,150]]}
                this.fades={skin:{legs:1,arms:1},gear:1,main:1,diamond:1}
                this.trigger={display:{skin:{legs:true,arms:true},gear:true,main:true,diamond:true}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
            break
            case 'Bronze Orb C': case 'Bronze Orb A':
                this.anim={direction:direction}
                this.color={gear:[80,50,10],main:[[120,90,50],[180,150,130]],diamond:[[200,150,100],[250,200,150]]}
                this.fades={gear:1,main:1,diamond:1}
                this.trigger={display:{gear:true,main:true,diamond:true}}
                this.calc={int:[0,0,0,0]}
                this.goal={anim:{direction:this.anim.direction}}
            break
            case 'Management Robot': case 'Management Prototype': case 'Destructor Bot': case 'Purge X02':
                this.anim={direction:direction,head:direction,eye:[0,0],eyeStyle:[0,0],
                    legs:[{top:9,bottom:0,length:{top:17,bottom:17}},{top:9,bottom:0,length:{top:17,bottom:17}}],
                    arms:[{top:24,bottom:9,length:{top:17,bottom:17}},{top:24,bottom:9,length:{top:17,bottom:17}}]}
                this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18]}
                this.parts={eyeLevel:-78,minor:15,
                    legs:[{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                this.graphics={
                    legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
                this.fades={eye:[1,1],skin:{legs:1,arms:1,body:1,head:1}}
                this.trigger={display:{eye:[true,true],skin:{legs:true,arms:true,body:true,head:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0,hand:0,foot:0}
                this.goal={anim:{direction:this.anim.direction}}
                switch(this.name){
                    case 'Management Prototype':
                        this.color={skin:{in:[80,120,120],out:[60,100,100],limb:[55,95,95]},eye:{back:[200,50,200],front:[225,75,225],glow:[150,150,255]}}
                    break
                    case 'Destructor Bot':
                        this.color={skin:{in:[160,120,120],out:[140,100,100],limb:[135,95,95]},eye:{back:[200,50,200],front:[225,75,225],glow:[150,150,255]}}
                        this.color.bomb=[125,25,0]
                        this.fades.bomb=1
                        this.trigger.display.bomb=true
                    break
                    case 'Purge X02':
                        this.color={skin:{in:[20,25,30],out:[30,35,40],limb:[25,30,35]},eye:{back:[150,25,25],front:[200,50,50],glow:[255,150,150]}}
                        this.color.hat=[80,60,80]
                        this.fades.hat=1
                        this.trigger.display.hat=true
                        this.anim.sword=1
                        this.spin.sword=75
                        this.fades.sword=1
                        this.trigger.display.extra={sword:true}
                    break
                    default:
                        this.color={skin:{in:[120,120,120],out:[100,100,100],limb:[95,95,95]},eye:{back:[50,50,200],front:[75,75,225],glow:[150,150,255]}}
                    break
                }
            break
            case 'Sentry':
                this.anim={direction:direction}
                this.color={leg:[100,100,100],body:[140,140,140],turret:[180,180,180]}
                this.graphics={arms:[{bottom:{x:0,y:-20}},{bottom:{x:0,y:-20}}]}
                this.fades={leg:1,body:1,turret:1}
                this.trigger={display:{leg:true,body:true,turret:true}}
                this.calc={int:[0,0,0,0]}
                this.goal={anim:{direction:this.anim.direction}}
            break
            case 'Flying Rock':
                this.anim={direction:direction,head:direction,eye:[0],eyeStyle:0}
                this.spin={eye:[0]}
                this.parts={eyeLevel:-46,minor:12}
                this.color={body:[80,75,70],eye:{back:[32,30,28],front:[48,45,42],glow:[240,225,210]}}
                this.fades={body:1,eye:[1]}
                this.trigger={display:{body:true,eye:[true]}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
            break
            case 'Repulsor':
                this.anim={direction:direction,body:direction}
                this.fades={skin:{body:1}}
                this.trigger={display:{skin:{body:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={skin:{body:[[150,200,100],[100,150,75],[50,150,0],[100,175,50],[200,255,200],[175,200,150],[175,225,125]]}}
            break
            case 'Management Autoduck':
                this.anim={direction:direction,eye:[0,0],legs:[{top:24,length:{top:10}},{top:24,length:{top:10}}],arms:[{top:54,length:{top:10}},{top:54,length:{top:10}}]}
                this.fades={eye:[1,1],beak:{main:1,mouth:1,nostril:1},skin:{legs:1,arms:1,body:1,head:1}}
                this.spin={legs:[{top:-90},{top:90}],arms:[{top:-90},{top:90}],eye:[-18,18]}
                this.parts={eyeLevel:-40,beakLevel:-31,legs:[{top:{x:3,y:-15},middle:{x:0,y:0}},{top:{x:3,y:-15},middle:{x:0,y:0}}],arms:[{top:{x:3.5,y:-25},middle:{x:0,y:0}},{top:{x:3.5,y:-25},middle:{x:0,y:0}}]}
                this.graphics={legs:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}],arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
                this.trigger={display:{eye:[true,true],beak:{main:true,mouth:true,nostril:true},skin:{legs:true,arms:true,body:true,head:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={skin:{in:[120,120,120],out:[100,100,100],limb:[95,95,95]},eye:{back:[50,50,200],front:[75,75,225],glow:[150,150,255]}}
            break
            case 'Bush Thing':
                this.anim={direction:direction,eye:[0,0],arms:[{top:54,length:{top:15}},{top:54,length:{top:15}}]}
                this.fades={eye:[1,1],skin:{arms:1,body:1}}
                this.spin={arms:[{top:-90},{top:90}],eye:[-24,24]}
                this.parts={eyeLevel:-24,arms:[{top:{x:15,y:-21},middle:{x:0,y:0}},{top:{x:15,y:-21},middle:{x:0,y:0}}]}
                this.graphics={arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
                this.trigger={display:{eye:[true,true],skin:{arms:true,body:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={eye:{back:[255,0,0]},skin:{body:[40,120,40],arms:[30,90,30]}}
            break
            case 'Fireball':
                this.anim={direction:direction,eye:[0,0],arms:[{top:54,length:{top:10}},{top:54,length:{top:10}}]}
                this.fades={eye:[1,1],skin:{arms:1,body:1}}
                this.spin={arms:[{top:-90},{top:90}],eye:[-24,24]}
                this.parts={eyeLevel:-24,arms:[{top:{x:12,y:-21},middle:{x:0,y:0}},{top:{x:12,y:-21},middle:{x:0,y:0}}]}
                this.graphics={arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
                this.trigger={display:{eye:[true,true],skin:{arms:true,body:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={eye:{back:[50,0,0]},skin:{body:[240,140,40],arms:[235,135,35]}}
            break
            case 'Dead Shell':
                this.anim={direction:direction,head:direction,mouth:{x:30,y:18,open:1}}
                this.spin={legs:[-120,-60,60,120],mouth:180}
                this.parts={mouth:-21,minor:30}
                this.fades={eye:[1,1],mouth:1,skin:{legs:1,body:1}}
                this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,body:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={skin:{body:[175,180,120],legs:[210,120,95]},mouth:{in:[90,40,75],out:[0,0,0]}}
            break
            case 'Management Drone':
                this.anim={direction:direction,head:direction,eye:[0,0],eyeStyle:[0,0]}
                this.spin={eye:[-18,18]}
                this.parts={eyeLevel:-63,minor:22}
                this.fades={eye:[1,1],skin:{body:1}}
                this.trigger={display:{eye:[true,true],skin:{body:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={skin:{in:[120,120,120],out:[100,100,100],limb:[95,95,95]},eye:{back:[50,50,200],front:[75,75,225],glow:[150,150,255]}}
            break
            case 'Personnel Carrier':
                this.anim={direction:direction}
                this.fades={wheel:1,body:1,window:1}
                this.trigger={display:{wheel:true,body:true,window:true}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={in:[120,120,120],out:[100,100,100],window:[75,75,225]}
            break
            case 'Executive':
                this.anim={direction:direction,head:direction,mouth:{x:11,y:7,open:0},eye:[0,0],eyeStyle:[0,0],
                    legs:[{top:9,bottom:0,length:{top:17,bottom:17}},{top:9,bottom:0,length:{top:17,bottom:17}}],
                    arms:[{top:24,bottom:9,length:{top:17,bottom:17}},{top:24,bottom:9,length:{top:17,bottom:17}}]}
                this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
                this.parts={eyeLevel:-84,mouth:-73,minor:21,
                    legs:[{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                this.graphics={
                    legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
                this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1}}
                this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0,hand:0,foot:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={skin:{head:[240,220,180],body:[20,60,80],legs:[15,55,75],arms:[215,215,215]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                this.color.skin.upperBody=[220,220,220]
                this.color.tie=[[80,100,160]]
                this.fades.tie=1
                this.trigger.display.tie=true
            break
            case 'Mechanized':
                this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                    legs:[{top:9,bottom:0,length:{top:17,bottom:17}},{top:9,bottom:0,length:{top:17,bottom:17}}],
                    arms:[{top:24,bottom:9,length:{top:17,bottom:17}},{top:24,bottom:9,length:{top:17,bottom:17}}]}
                this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
                this.parts={eyeLevel:-84,mouth:-76,minor:15,
                    legs:[{top:{x:4.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:12,y:-66},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:12,y:-66},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                this.graphics={
                    legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
                this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1}}
                this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0,hand:0,foot:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={skin:{in:[120,120,120],out:[100,100,100],limb:[95,95,95],head:[240,220,180]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
            break
            case 'Louse':
                this.anim={direction:direction}
                this.fades={antenna:1,body:1}
                this.trigger={display:{antenna:true,body:true}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={antenna:[225,120,100],body:[[145,170,85],[215,230,5]]}
            break
            case 'Fungling':
                this.anim={direction:direction,head:direction,eye:[1,1],eyeStyle:[1,1],arms:[{top:54,length:{top:14}},{top:54,length:{top:14}}],mouth:{x:8,y:5,open:0}}
                this.fades={eye:[1,1],mouth:1,skin:{arms:1,body:1,tumor:1}}
                this.spin={arms:[{top:-90},{top:90}],eye:[-33,33],mouth:216}
                this.parts={eyeLevel:-24,mouth:-15,minor:18,arms:[{top:{x:12,y:-21},middle:{x:0,y:0}},{top:{x:12,y:-21},middle:{x:0,y:0}}]}
                this.graphics={arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
                this.trigger={display:{eye:[true,true],mouth:true,skin:{arms:true,body:true,tumor:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]},skin:{body:[165,160,150],arms:[125,130,125],tumor:[50,70,80]}}
            break
            case 'Hwurmp': case 'Antihwurmp':
                this.fades={eye:[1,1],mouth:1,body:1}
                this.parts={eyeLevel:-27}
                this.trigger={display:{eye:[true,true],mouth:true,body:true}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.color={eye:{back:[205,135,55]},mouth:[255,155,65],body:[255,205,65]}
                switch(this.name){
                    case 'Hwurmp':
                        this.anim={direction:direction,eye:[0,0],body:1}
                        this.spin={eye:[-24,24]}
                    break
                    case 'Antihwurmp':
                        this.anim={direction:direction,eye:[0,0],body:2}
                        this.spin={eye:[-36,36]}
                    break
                }
                this.goal={anim:{direction:this.anim.direction}}
            break
            case 'Bee':
                this.anim={direction:direction,arms:[{top:54,length:{top:3}},{top:54,length:{top:3}}]}
                this.fades={skin:{arms:1,body:1}}
                this.spin={arms:[{top:-90},{top:90}]}
                this.parts={arms:[{top:{x:3,y:-18},middle:{x:0,y:0}},{top:{x:3,y:-18},middle:{x:0,y:0}}]}
                this.graphics={arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
                this.trigger={display:{skin:{arms:true,body:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={skin:{body:[250,200,50],arms:[20,20,20]}}
            break
            case 'Pixie':
                this.anim={direction:direction,arms:[{top:54,length:{top:4}},{top:54,length:{top:4}}]}
                this.fades={skin:{arms:1,body:1},glow:1}
                this.spin={arms:[{top:-90},{top:90}]}
                this.parts={arms:[{top:{x:4,y:-23},middle:{x:0,y:0}},{top:{x:4,y:-23},middle:{x:0,y:0}}]}
                this.graphics={arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
                this.trigger={display:{skin:{arms:true,body:true},glow:true}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={skin:{body:[100,200,230],arms:[150,200,230]},glow:[200,230,255]}
            break
            case 'Glimerrer':
                this.anim={direction:direction,eye:[0,0]}
                this.spin={eye:[-12,12]}
                this.fades={crystal:1,body:1,eye:[1,1]}
                this.parts={eyeLevel:-10}
                this.trigger={display:{crystal:true,body:true,eye:[true,true]}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={crystal:[[180,125,205],[240,170,225],[250,190,240]],body:[[20,25,50],[30,50,70]],eye:{back:[235,105,65]}}
            break
            case 'Host': case 'Host Drone':
                this.anim={direction:direction,body:0}
                this.fades={body:1}
                this.trigger={display:{body:true}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={body:[190,235,255]}
            break
            case 'Darkblot':
                this.anim={direction:direction,eye:[0,0],arms:[{top:54,length:{top:12}},{top:54,length:{top:12}}]}
                this.fades={eye:[1,1],skin:{arms:1,body:1}}
                this.spin={arms:[{top:-90},{top:90}],eye:[-24,24]}
                this.parts={eyeLevel:-6,arms:[{top:{x:12,y:-12},middle:{x:0,y:0}},{top:{x:12,y:-12},middle:{x:0,y:0}}]}
                this.graphics={arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
                this.trigger={display:{eye:[true,true],skin:{arms:true,body:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={eye:{back:[120,240,60]},skin:{body:[40,60,40],arms:[30,45,30]}}
                this.progress=0
            break
            case 'Managerial':
                this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                    legs:[{top:9,bottom:0,length:{top:20,bottom:20}},{top:9,bottom:0,length:{top:20,bottom:20}}],
                    arms:[{top:24,bottom:9,length:{top:20,bottom:20}},{top:24,bottom:9,length:{top:20,bottom:20}}]}
                this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216,sword:0}
                this.color={skin:{head:[240,220,180],body:[10,10,10],legs:[15,15,15],arms:[15,15,15]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                this.parts={eyeLevel:-81,mouth:-73,minor:15,
                    legs:[{top:{x:3.5,y:-36},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-36},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:4,y:-64},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-64},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                this.graphics={
                    legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
                this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1},helmet:1,visor:1,belt:1,badge:1}
                this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true},extra:{damage:false}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0,hand:0,foot:0}
                this.goal={anim:{direction:this.anim.direction,sword:false}}
            break
            case 'Thornvine':
                this.anim={direction:direction,glow:1}
                this.fades={body:1}
                this.trigger={display:{body:true}}
                this.color=[[25,150,25],[200,200,200]]
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
            break
            case 'Fat Duck':
                this.anim={direction:direction,eye:[0,0],legs:[{top:24,length:{top:14}},{top:24,length:{top:14}}],arms:[{top:54,length:{top:20}},{top:54,length:{top:20}}]}
                this.fades={eye:[1,1],beak:{main:1,mouth:1,nostril:1},skin:{legs:1,arms:1,body:1,head:1}}
                this.spin={legs:[{top:-90},{top:90}],arms:[{top:-90},{top:90}],eye:[-18,18]}
                this.parts={eyeLevel:-40,beakLevel:-33,legs:[{top:{x:3,y:-18},middle:{x:0,y:0}},{top:{x:3,y:-18},middle:{x:0,y:0}}],arms:[{top:{x:3.5,y:-27},middle:{x:0,y:0}},{top:{x:3.5,y:-27},middle:{x:0,y:0}}]}
                this.graphics={legs:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}],arms:[{top:{x:0,y:0},middle:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0}}]}
                this.trigger={display:{eye:[true,true],beak:{main:true,mouth:true,nostril:true},skin:{legs:true,arms:true,body:true,head:true}}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={eye:{back:[0,0,0]},beak:{main:[255,140,25],mouth:[0,0,0],nostril:[0,0,0]},skin:{head:[255,235,25],body:[255,225,15],legs:[255,210,0],arms:[255,215,5]}}
            break
            case 'Wall':
                this.anim={direction:direction}
                this.fades={body:1}
                this.trigger={display:{body:true}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={in:[120,120,120],out:[100,100,100]}
            break
            case 'Spike Pillar':
                this.anim={direction:direction}
                this.fades={body:1}
                this.trigger={display:{body:true}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={in:[200,195,190],out:[160,155,150]}
            break
            case 'Projector':
                this.anim={direction:direction,light:1}
                this.fades={body:1,light:1}
                this.trigger={display:{body:true,light:true}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={in:[120,120,120],out:[100,100,100],light:[100,200,255]}
            break
            case 'Turret': case 'Explosive Turret': case 'Multiturret': case 'Repulse Turret': case 'Machine Gun': case 'Armored Turret':
                this.anim={direction:direction}
                this.fades={base:1,body:1,dot:1}
                this.graphics={arms:[{bottom:{x:0,y:-25}},{bottom:{x:0,y:-25}}]}
                this.trigger={display:{base:true,body:true,dot:true}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                switch(this.name){
                    case 'Turret':
                        this.color={base:{in:[120,120,120],out:[100,100,100]},body:{in:[0,0,200],out:[0,0,240]},dot:{in:[125,125,125],out:[105,105,105]}}
                    break
                    case 'Explosive Turret':
                        this.color={base:{in:[120,120,120],out:[100,100,100]},body:{in:[200,0,0],out:[240,0,0]},dot:{in:[125,125,125],out:[105,105,105]}}
                    break
                    case 'Multiturret':
                        this.color={base:{in:[120,120,120],out:[100,100,100]},body:{in:[0,200,200],out:[0,240,240]},dot:{in:[125,125,125],out:[105,105,105]}}
                    break
                    case 'Repulse Turret':
                        this.color={base:{in:[120,120,120],out:[100,100,100]},body:{in:[200,0,200],out:[240,0,240]},dot:{in:[125,125,125],out:[105,105,105]}}
                    break
                    case 'Machine Gun':
                        this.color={base:{in:[120,120,120],out:[100,100,100]},body:{in:[0,200,0],out:[0,240,0]},dot:{in:[125,125,125],out:[105,105,105]}}
                    break
                    case 'Armored Turret':
                        this.color={base:{in:[120,120,120],out:[100,100,100]},body:{in:[150,150,0],out:[180,180,0]},dot:{in:[125,125,125],out:[105,105,105]}}
                    break
                }
            break
            case 'Readout':
                this.anim={direction:direction,light:1}
                this.fades={body:1,light:1,glow:1}
                this.trigger={display:{body:true,light:true,glow:true}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={in:[120,120,120],out:[100,100,100],light:[100,200,255],glow:[255,255,255]}
            break
            case 'Strengthener':
                this.anim={direction:direction,light:1}
                this.fades={body:1,light:1}
                this.trigger={display:{body:true,light:true}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={in:[120,120,120],out:[100,100,100],light:[255,100,100]}
            break
            case 'Barbed Pillar':
                this.anim={direction:direction}
                this.fades={body:1}
                this.trigger={display:{body:true}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={in:[220,200,180],out:[180,160,140]}
            break
            case 'Gun Rack':
                this.anim={direction:direction,light:1}
                this.fades={body:1,gun:1}
                this.trigger={display:{body:true,gun:true}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={in:[120,120,120],out:[100,100,100],gun:[40,40,40]}
            break
            case 'Miniturret':
                this.anim={direction:direction}
                this.fades={base:1,body:1,dot:1}
                this.graphics={arms:[{bottom:{x:0,y:-15}},{bottom:{x:0,y:-15}}]}
                this.trigger={display:{base:true,body:true,dot:true}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={base:{in:[120,120,120],out:[100,100,100]},body:{in:[0,0,200],out:[0,0,240]},dot:{in:[125,125,125],out:[105,105,105]}}
            break
            case 'Metal Box':
                this.anim={direction:direction,light:1}
                this.fades={body:1,metal:1}
                this.trigger={display:{body:true}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={in:[120,120,120],out:[100,100,100],metal:[140,120,160]}
            break
            case 'Upgrader': case 'Transformer': case 'Doubler': case 'Exhauster':
                this.anim={direction:direction,light:1}
                this.fades={body:1}
                this.trigger={display:{body:true}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                switch(this.name){
                    case 'Upgrader':
                        this.color={in:[120,120,120],out:[100,100,100],lightIn:[200,225,255],lightOut:[150,200,255]}
                    break
                    case 'Transformer':
                        this.color={in:[120,120,120],out:[100,100,100],lightIn:[255,255,150],lightOut:[255,255,100]}
                    break
                    case 'Doubler':
                        this.color={in:[120,120,120],out:[100,100,100],lightIn:[255,100,255],lightOut:[255,25,255]}
                    break
                    case 'Exhauster':
                        this.color={in:[120,120,120],out:[100,100,100],lightIn:[100,255,255],lightOut:[25,255,255]}
                    break
                }
            break
            case 'Teleporter Start': case 'Teleporter End':
                this.anim={direction:direction}
                this.fades={body:1,metal:1}
                this.trigger={display:{body:true}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                switch(this.name){
                    case 'Teleporter Start':
                        this.color={in:[120,120,120],out:[100,100,100],light:[50,200,50]}
                    break
                    case 'Teleporter End':
                        this.color={in:[120,120,120],out:[100,100,100],light:[200,50,50]}
                    break
                }
            break
            case 'Antizone':
                this.anim={direction:direction}
                this.fades={body:1}
                this.trigger={display:{body:true}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={in:[100,255,255]}
            break
            case 'Mirror Shield':
                this.anim={direction:direction}
                this.fades={body:1}
                this.trigger={display:{body:true}}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0}
                this.goal={anim:{direction:this.anim.direction}}
                this.color={in:[120,120,120],out:[100,100,100],shieldIn:[200,220,240],shieldOut:[160,180,200]}
            break
            default:
                this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},eye:[0,0],eyeStyle:[0,0],
                    legs:[{top:9,bottom:0,length:{top:17,bottom:17}},{top:9,bottom:0,length:{top:17,bottom:17}}],
                    arms:[{top:24,bottom:9,length:{top:17,bottom:17}},{top:24,bottom:9,length:{top:17,bottom:17}}]}
                this.spin={legs:[{top:-60,bottom:-120},{top:60,bottom:120}],arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],eye:[-18,18],mouth:216}
                this.parts={eyeLevel:-78,mouth:-70,minor:15,
                    legs:[{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}}]}
                this.graphics={
                    legs:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}],
                    arms:[{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},{top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}]}
                this.fades={eye:[1,1],mouth:1,skin:{legs:1,arms:1,body:1,head:1}}
                this.trigger={display:{mouth:true,eye:[true,true],skin:{legs:true,arms:true,body:true,head:true}}}
                this.trigger.display.extra={damage:false}
                this.calc={int:[0,0,0,0]}
                this.animSet={loop:0,flip:0,hand:0,foot:0}
                this.goal={anim:{direction:this.anim.direction}}
                switch(this.name){
                    case 'Bouncer':
                        this.color={skin:{head:[240,220,180],body:[200,200,200],legs:[195,195,195],arms:[205,205,205]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.belt=[255,50,50]
                        this.fades.belt=1
                        this.trigger.display.belt=true
                    break
                    case 'Thug':
                        this.color={skin:{head:[160,60,60],body:[150,50,50],legs:[145,45,45],arms:[155,55,55]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.eyeHole=[240,220,180]
                    break
                    case 'Biker':
                        this.color={skin:{head:[240,220,180],body:[225,25,25],legs:[220,20,20],arms:[230,30,30]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.hat=[200,0,0]
                        this.color.goggles=[255,255,255]
                        this.fades.hat=1
                        this.fades.goggles=0.6
                        this.trigger.display.hat=true
                        this.trigger.display.goggles=true
                    break
                    case 'Drunk':
                        this.color={skin:{head:[240,220,180],body:[120,60,20],legs:[120,60,20],arms:[120,60,20]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.belt=[90,45,15]
                        this.color.bottle=[60,30,15]
                        this.fades.belt=1
                        this.fades.bottle=1
                        this.trigger.display.belt=true
                        this.trigger.display.bottle=true
                    break
                    case 'Trenchcoat': case 'Trenchcoat Gunner':
                        this.color={skin:{head:[240,220,180],body:[25,25,25],legs:[20,20,20],arms:[120,100,60]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.tie=[[240,240,240],[200,50,50]]
                        this.color.coat=[115,95,55]
                        this.color.hat=[10,10,10]
                        this.fades.tie=1
                        this.fades.coat=1
                        this.fades.hat=1
                        this.trigger.display.tie=true
                        this.trigger.display.coat=true
                        this.trigger.display.hat=true
                    break
                    case 'Goon':
                        this.color={skin:{head:[160,60,60],body:[150,50,50],legs:[145,45,45],arms:[155,55,55]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.eyeHole=[240,220,180]
                        this.anim.sword=1
                        this.spin.sword=75
                        this.fades.sword=1
                        this.trigger.display.extra={sword:true}
                    break
                    case 'Slaver':
                        this.color={skin:{head:[240,220,180],body:[50,125,150],legs:[40,115,140],arms:[35,110,135]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.anim.sword=1
                        this.spin.sword=75
                        this.fades.sword=1
                        this.trigger.display.extra={sword:true}
                    break
                    case 'Romeo':
                        this.color={skin:{head:[240,220,180],body:[50,150,200],legs:[50,150,200],arms:[200,50,50]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.skin.upperBody=[200,50,50]
                        this.anim.sword=1
                        this.spin.sword=75
                        this.fades.sword=1
                        this.trigger.display.extra={sword:true}
                    break
                    case 'Billy Beatup':
                        this.color={skin:{head:[240,220,180],body:[60,80,100],legs:[60,80,100],arms:[240,220,180]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.skin.upperBody=[160,160,160]
                        this.color.logo=[150,50,50]
                        this.color.band=[100,75,75]
                        this.fades.logo=1
                        this.fades.band=1
                        this.trigger.display.logo=true
                        this.trigger.display.band=true
                    break
                    case 'Cartel':
                        this.color={skin:{head:[240,220,180],body:[200,160,80],legs:[190,150,70],arms:[195,155,75]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.neck=[150,75,75]
                        this.color.bandana=[200,100,100]
                        this.color.sunglasses=[0,0,0]
                        this.fades.neck=1
                        this.fades.bandana=1
                        this.fades.sunglasses=1
                        this.trigger.display.neck=true
                        this.trigger.display.bandana=true
                        this.trigger.display.sunglasses=true
                    break
                    case 'Gangster': case 'Gangster Gunner':
                        this.color={skin:{head:[240,220,180],body:[240,240,240],legs:[75,55,75],arms:[235,235,235]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.overall=[80,60,80]
                        this.color.hat=[70,50,70]
                        this.fades.overall=1
                        this.fades.hat=1
                        this.trigger.display.overall=true
                        this.trigger.display.hat=true
                    break
                    case 'Ninja':
                        this.color={skin:{head:[130,205,130],body:[125,200,125],legs:[120,200,120],arms:[115,195,115]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.eyeHole=[240,220,180]
                        this.color.belt=[75,150,75]
                        this.fades.belt=1
                        this.trigger.display.belt=true
                    break
                    case 'Red':
                        this.color={skin:{head:[240,220,180],body:[120,110,100],legs:[115,105,95],arms:[110,100,90]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.belt=[80,70,60]
                        this.color.hat=[[60,50,40],[200,25,25],[255,225,25],[200,25,25]]
                        this.fades.belt=1
                        this.fades.hat=1
                        this.trigger.display.belt=true
                        this.trigger.display.hat=true
                    break
                    case 'Batter':
                        this.color={skin:{head:[240,220,180],body:[240,240,240],legs:[75,55,75],arms:[235,235,235]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.overall=[80,60,80]
                        this.color.hat=[70,50,70]
                        this.fades.overall=1
                        this.fades.hat=1
                        this.trigger.display.overall=true
                        this.trigger.display.hat=true
                        this.anim.sword=1
                        this.spin.sword=75
                        this.fades.sword=1
                        this.trigger.display.extra={sword:true}
                    break
                    case 'Slippery Gangster':
                        this.color={skin:{head:[240,220,180],body:[80,60,80],legs:[75,55,75],arms:[70,50,70]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.sunglasses=[0,0,0]
                        this.fades.sunglasses=1
                        this.trigger.display.sunglasses=true
                    break
                    case 'Moss Creature':
                        this.color={skin:{head:[45,85,45],body:[40,80,40],legs:[35,75,35],arms:[35,75,35]},eye:{back:[200,150,0],front:[225,150,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.eyeHole=[0,0,0]
                        this.fades.eyeHole=1
                        this.trigger.display.eyeHole=true
                    break
                    case 'Roger Reviv':
                        this.color={skin:{head:[240,220,180],body:[80,160,200],legs:[70,150,190],arms:[75,155,195]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.neck=[75,75,150]
                        this.color.bandana=[100,100,200]
                        this.color.sunglasses=[0,0,0]
                        this.color.headset=[100,100,100]
                        this.fades.neck=1
                        this.fades.bandana=1
                        this.fades.sunglasses=1
                        this.fades.headset=1
                        this.trigger.display.neck=true
                        this.trigger.display.bandana=true
                        this.trigger.display.sunglasses=true
                        this.trigger.display.headset=true
                    break
                    case 'Sharpshot':
                        this.color={skin:{head:[240,220,180],body:[180,180,180],legs:[170,170,170],arms:[175,175,175]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.hat=[2300,160,40]
                        this.color.belt=[[120,80,40],[60,40,20]]
                        this.fades.hat=1
                        this.fades.belt=1
                        this.trigger.display.hat=true
                        this.trigger.display.belt=true
                    break
                    case 'Slow King':
                        this.size=1.2
                        this.color={skin:{head:[20,75,20],body:[25,25,25],legs:[20,20,20],arms:[15,15,15]},eye:{back:[160,0,100],front:[180,20,120],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.cape=[5,5,5]
                        this.color.shield=[180,20,120]
                        this.fades.cape=1
                        this.fades.shield=0
                        this.trigger.display.cape=true
                        this.trigger.display.tumor=true
                        this.trigger.display.shield=true
                    break
                    case 'Nerfer':
                        this.color={skin:{head:[240,220,180],body:[200,150,150],legs:[190,140,140],arms:[180,130,130]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.arrows=[[200,0,0],[0,150,255],[255,255,50]]
                        this.fades.arrows=1
                        this.trigger.display.arrows=true
                    break
                    case 'Buffer':
                        this.color={skin:{head:[240,220,180],body:[150,200,200],legs:[140,190,190],arms:[130,180,180]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.arrows=[[200,0,0],[0,150,255],[255,255,50]]
                        this.fades.arrows=1
                        this.trigger.display.arrows=true
                    break
                    case 'Scrapper':
                        this.color={skin:{head:[240,220,180],body:[120,120,120],legs:[115,115,115],arms:[110,110,110]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.belt=[[100,100,100],[60,60,60],[80,80,80]]
                        this.color.goggles=[200,200,200]
                        this.fades.belt=1
                        this.fades.goggles=0.6
                        this.trigger.display.belt=true
                        this.trigger.display.goggles=true
                    break
                    case 'Looter':
                        this.color={skin:{head:[240,220,180],body:[40,60,80],legs:[50,75,100],arms:[50,75,100]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.bandana=[[200,100,50],[160,80,40]]
                        this.fades.bandana=1
                        this.trigger.display.bandana=1
                    break
                    case 'Mugger':
                        this.color={skin:{head:[30,35,40],body:[80,60,40],legs:[100,75,50],arms:[100,75,50]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.eyeHole=[240,220,180]
                    break
                    case 'Capitalist':
                        this.color={skin:{head:[240,220,180],body:[20,20,20],legs:[15,15,15],arms:[15,15,15]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.tie=[[200,200,200],[200,100,50]]
                        this.color.hat=[40,40,40]
                        this.fades.tie=1
                        this.fades.hat=1
                        this.trigger.display.tie=true
                        this.trigger.display.hat=true
                    break
                    case 'Bodyguard':
                        this.color={skin:{head:[240,220,180],body:[20,20,20],legs:[15,15,15],arms:[15,15,15]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.tie=[[200,200,200],[200,100,50]]
                        this.color.sunglasses=[0,0,0]
                        this.fades.tie=1
                        this.fades.sunglasses=1
                        this.trigger.display.tie=true
                        this.trigger.display.sunglasses=true
                    break
                    case 'Management Soldier':
                        this.color={skin:{head:[240,220,180],body:[95,105,110],legs:[65,85,85],arms:[85,135,195]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.belt=[30,25,0]
                        this.color.helmet=[80,85,90]
                        this.color.visor=[65,130,140]
                        this.fades.belt=1
                        this.fades.helmet=1
                        this.fades.visor=1
                        this.trigger.display.belt=true
                        this.trigger.display.helmet=true
                        this.trigger.display.visor=true
                    break
                    case 'Management Officer':
                        this.color={skin:{head:[240,220,180],body:[100,100,100],legs:[95,95,95],arms:[95,95,95]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.belt=[60,60,60]
                        this.color.badge=[[50,50,200],[75,75,225]]
                        this.color.glasses=[[40,40,40],[255,255,255]]
                        this.fades.belt=1
                        this.fades.badge=1
                        this.fades.glasses=1
                        this.trigger.display.belt=true
                        this.trigger.display.badge=true
                        this.trigger.display.glasses=true
                    break
                    case 'Management Special Forces':
                        this.color={skin:{head:[240,220,180],body:[85,90,90],legs:[75,80,80],arms:[80,85,85]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.belt=[80,75,50]
                        this.color.helmet=[50,55,60]
                        this.color.visor=[100,150,200]
                        this.fades.belt=1
                        this.fades.helmet=1
                        this.fades.visor=1
                        this.trigger.display.belt=true
                        this.trigger.display.helmet=true
                        this.trigger.display.visor=true
                    break
                    case 'Deployer':
                        this.color={skin:{head:[240,220,180],body:[10,50,10],legs:[15,55,15],arms:[20,60,20]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.belt=[50,45,50]
                        this.color.glasses=[[60,60,60],[200,200,200]]
                        this.fades.belt=1
                        this.fades.glasses=1
                        this.trigger.display.belt=true
                        this.trigger.display.glasses=true
                    break
                    case 'Chief Deployer':
                        this.color={skin:{head:[240,220,180],body:[20,30,40],legs:[25,35,45],arms:[30,40,50]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.belt=[60,70,80]
                        this.color.glasses=[[60,60,60],[255,150,150]]
                        this.fades.belt=1
                        this.fades.glasses=1
                        this.trigger.display.belt=true
                        this.trigger.display.glasses=true
                    break
                    case 'Lunar Dust':
                        this.color={skin:{head:[180,125,255],body:[150,95,225],legs:[145,90,220],arms:[145,90,220]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.outline=[30,15,35]
                        this.fades.outline=1
                        this.trigger.display.outline=true
                        this.size=0.8
                    break
                    case 'Lunar Shard':
                        this.color={skin:{head:[50,25,55],body:[35,20,40],legs:[30,15,35],arms:[30,15,35]},eye:{back:[225,75,225],front:[255,90,255],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.moon=[[255,255,255],[255,235,235]]
                        this.color.band=[255,120,255]
                        this.fades.moon=1
                        this.fades.band=1
                        this.trigger.display.moon=true
                        this.trigger.display.band=true
                    break
                    case 'Solar Shard':
                        this.color={skin:{head:[80,55,85],body:[65,50,70],legs:[60,45,65],arms:[60,45,65]},eye:{back:[225,135,225],front:[255,150,255],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.sun=[255,145,70]
                        this.color.band=[255,180,255]
                        this.fades.sun=1
                        this.fades.band=1
                        this.trigger.display.sun=true
                        this.trigger.display.band=true
                        this.size=1.1
                    break
                    case 'Management Sniper':
                        this.color={skin:{head:[240,220,180],body:[125,140,135],legs:[95,115,115],arms:[115,225,165]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.belt=[30,25,0]
                        this.color.helmet=[80,90,95]
                        this.color.visor=[240,230,65]
                        this.color.monocle=[150,255,150]
                        this.fades.belt=1
                        this.fades.helmet=1
                        this.fades.visor=1
                        this.fades.monocle=1
                        this.trigger.display.belt=true
                        this.trigger.display.helmet=true
                        this.trigger.display.visor=true
                        this.trigger.display.monocle=true
                    break
                    case 'Management Caller':
                        this.color={skin:{head:[240,220,180],body:[200,200,200],legs:[195,195,195],arms:[195,195,195]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.belt=[160,160,160]
                        this.color.badge=[[200,200,50],[225,225,75]]
                        this.color.glasses=[[40,40,40],[255,255,255]]
                        this.fades.belt=1
                        this.fades.badge=1
                        this.fades.glasses=1
                        this.trigger.display.belt=true
                        this.trigger.display.badge=true
                        this.trigger.display.glasses=true
                    break
                    case 'Management Custodian':
                        this.color={skin:{head:[240,220,180],body:[160,160,160],legs:[85,85,65],arms:[195,135,85]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.belt=[120,120,120]
                        this.color.hat=[220,220,60]
                        this.fades.belt=1
                        this.fades.hat=1
                        this.trigger.display.belt=true
                        this.trigger.display.hat=true
                    break
                    case 'Walker Driver':
                        this.color={skin:{head:[240,220,180],body:[185,180,165],legs:[180,175,160],arms:[180,175,160]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.belt=[30,25,0]
                        this.color.helmet=[120,135,95]
                        this.color.visor=[10,10,10]
                        this.fades.belt=1
                        this.fades.helmet=1
                        this.fades.visor=1
                        this.trigger.display.belt=true
                        this.trigger.display.helmet=true
                        this.trigger.display.visor=true
                    break
                    case 'Prisoner':
                        this.color={skin:{head:[240,220,180],body:[225,155,25],legs:[220,150,20],arms:[215,145,15]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.belt=[230,230,230]
                        this.fades.belt=1
                        this.trigger.display.belt=true
                    break
                    case 'Prison Guard':
                        this.color={skin:{head:[240,220,180],body:[175,100,0],legs:[170,95,0],arms:[165,90,0]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.belt=[[70,70,70],[60,60,60]]
                        this.color.armor=[80,80,80]
                        this.color.helmet=[100,100,100]
                        this.color.visor=[200,200,200]
                        this.fades.belt=1
                        this.fades.armor=1
                        this.fades.helmet=1
                        this.fades.visor=1
                        this.trigger.display.belt=true
                        this.trigger.display.armor=true
                        this.trigger.display.helmet=true
                        this.trigger.display.visor=true
                    break
                    case 'Lightspeed':
                        this.color={skin:{head:[40,80,120],body:[20,40,60],legs:[15,35,55],arms:[15,35,55]},eye:{back:[100,200,255],front:[150,225,255],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.wing=[200,255,255]
                        this.fades.wing=1
                        this.trigger.display.wing=true
                    break
                    case 'Swordmaster':
                        this.color={skin:{head:[240,220,180],body:[50,100,75],legs:[40,80,60],arms:[40,80,60]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.helmet=[60,120,90]
                        this.color.belt=[70,140,105]
                        this.fades.helmet=1
                        this.fades.belt=1
                        this.trigger.display.helmet=true
                        this.trigger.display.belt=true
                        this.anim.sword=1
                        this.spin.sword=75
                        this.fades.sword=1
                        this.trigger.display.extra={sword:true}
                    break
                    case 'Gas Man':
                        this.color={skin:{head:[240,220,180],body:[160,140,120],legs:[150,130,110],arms:[145,125,105]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.belt=[120,100,80]
                        this.color.helmet=[80,40,40]
                        this.color.visor=[200,50,50]
                        this.fades.belt=1
                        this.fades.helmet=1
                        this.fades.visor=1
                        this.trigger.display.can=true
                        this.trigger.display.belt=true
                        this.trigger.display.helmet=true
                        this.trigger.display.visor=true
                    break
                    case 'Champion':
                        this.color={skin:{head:[200,200,200],body:[160,160,160],legs:[150,150,150],arms:[140,140,140]},eye:{back:[255,255,255],front:[255,255,255],glow:[0,0,0]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.anim.eye=[1,1]
                        this.anim.eyeStyle=[3,3]
                        this.color.hat=[180,180,180]
                        this.fades.hat=1
                        this.trigger.display.hat=true
                        this.anim.sword=1
                        this.spin.sword=75
                        this.fades.sword=1
                        this.trigger.display.extra={sword:true}
                    break
                    case 'Ninja Master':
                        this.color={skin:{head:[50,125,50],body:[45,120,45],legs:[40,120,40],arms:[35,115,35]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.eyeHole=[240,220,180]
                        this.color.belt=[[240,240,240],[0,0,0]]
                        this.fades.belt=1
                        this.trigger.display.belt=true
                    break
                    case 'Intern':
                        this.size=0.7
                        this.color={skin:{head:[240,220,180],body:[80,60,40],legs:[70,50,30],arms:[170,200,230]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.skin.upperBody=[180,210,240]
                        this.color.glasses=[[120,120,120],[220,220,220]]
                        this.fades.glasses=1
                        this.trigger.display.glasses=true
                    break
                    case 'Assistant Hiring Officer':
                        this.color={skin:{head:[240,220,180],body:[180,150,120],legs:[170,140,110],arms:[50,70,90]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.skin.upperBody=[40,60,80]
                        this.color.tie=[[180,200,220],[255,225,50]]
                        this.fades.tie=1
                        this.trigger.display.clipboard=true
                        this.trigger.display.tie=true
                    break
                    case 'Gangster Machinegunner':
                        this.color={skin:{head:[240,220,180],body:[240,240,240],legs:[75,55,75],arms:[235,235,235]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.overall=[80,60,80]
                        this.color.hat=[70,50,70]
                        this.color.sunglasses=[60,50,40]
                        this.fades.overall=1
                        this.fades.hat=1
                        this.fades.sunglasses=1
                        this.trigger.display.overall=true
                        this.trigger.display.hat=true
                        this.trigger.display.sunglasses=true
                    break
                    case 'Bolt':
                        this.color={skin:{head:[200,255,255],body:[175,255,255],legs:[125,255,255],arms:[150,255,255]},eye:{back:[255,255,255],front:[255,255,255],glow:[0,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.size=0.8
                        this.color.shock=[100,255,255]
                        this.trigger.display.shock=true
                        this.shocks=[]
                    break
                    case 'Jet':
                        this.color={skin:{head:[240,220,180],body:[240,240,200],legs:[220,220,180],arms:[230,230,190]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.belt=[120,70,20]
                        this.color.goggles=[50,150,200]
                        this.color.pack=[[160,160,160]]
                        this.fades.belt=1
                        this.fades.goggles=0.4
                        this.fades.pack=1
                        this.trigger.display.belt=true
                        this.trigger.display.goggles=true
                        this.trigger.display.pack=true
                        this.offset.position.y-=10
                    break
                    case 'Armored Ninja':
                        this.color={skin:{head:[30,75,30],body:[25,70,25],legs:[20,65,20],arms:[15,60,15]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.eyeHole=[240,220,180]
                        this.color.belt=[0,40,0]
                        this.color.helmet=[40,100,40]
                        this.fades.belt=1
                        this.fades.helmet=1
                        this.trigger.display.belt=true
                        this.trigger.display.helmet=true
                    break
                    case 'Assistant Fitness Officer':
                        this.color={skin:{head:[240,220,180],body:[120,140,160],legs:[110,130,150],arms:[20,40,60]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.skin.upperBody=[15,35,55]
                        this.color.tie=[[235,210,160],[200,125,50]]
                        this.fades.tie=1
                        this.trigger.display.tie=true
                        this.trigger.display.muscles=true
                        this.size=0.75
                    break
                    case 'Corrupt Detective':
                        this.color={skin:{head:[240,220,180],body:[60,60,55],legs:[55,55,50],arms:[115,105,95]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.skin.upperBody=[110,115,100]
                        this.color.tie=[[190,190,180],[110,110,110]]
                        this.color.coat=[120,110,100]
                        this.color.hat=[[85,80,70],[170,160,150]]
                        this.fades.tie=1
                        this.fades.coat=1
                        this.fades.hat=1
                        this.trigger.display.tie=true
                        this.trigger.display.coat=true
                        this.trigger.display.hat=true
                    break
                    case 'Riot Police':
                        this.color={skin:{head:[240,220,180],body:[50,50,60],legs:[40,40,50],arms:[45,45,55]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.belt=[20,60,120]
                        this.color.helmet=[40,50,80]
                        this.color.visor=[240,150,60]
                        this.color.shield=[[20,20,30],[50,150,255]]
                        this.fades.belt=1
                        this.fades.helmet=1
                        this.fades.visor=1
                        this.fades.shield=1
                        this.trigger.display.belt=true
                        this.trigger.display.helmet=true
                        this.trigger.display.visor=true
                        this.trigger.display.shield=true
                    break
                    case 'Reichswehr':
                        this.color={skin:{head:[240,220,180],body:[80,100,80],legs:[70,90,70],arms:[75,95,75]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.pocket=[60,80,60]
                        this.color.helmet=[[30,30,30],[240,240,240]]
                        this.fades.pocket=1
                        this.fades.helmet=1
                        this.trigger.display.pocket=true
                        this.trigger.display.helmet=true
                    break
                    case 'Beekeeper':
                        this.color={skin:{head:[240,220,180],body:[200,160,20],legs:[180,140,0],arms:[190,150,10]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.helmet=[[200,200,0],[180,180,160]]
                        this.color.belt=[120,120,40]
                        this.fades.helmet=1
                        this.fades.belt=1
                        this.trigger.display.helmet=true
                        this.trigger.display.belt=true
                    break
                    case 'PhD':
                        this.color={skin:{head:[240,220,180],body:[80,60,40],legs:[70,50,30],arms:[110,140,170]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.skin.upperBody=[120,150,180]
                        this.color.glasses=[[40,40,40],[160,200,240]]
                        this.color.button=[120,120,60]
                        this.color.coat=[190,200,190]
                        this.fades.glasses=1
                        this.fades.button=1
                        this.fades.coat=1
                        this.trigger.display.glasses=true
                        this.trigger.display.button=true
                        this.trigger.display.coat=true
                    break
                    case 'Prestige':
                        this.color={skin:{head:[80,90,100],body:[60,70,80],legs:[50,60,70],arms:[70,80,90]},eye:{back:[255,255],front:[255,255,255],glow:[0,0,0]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.hex=[255,255,255]
                        this.fades.hex=1
                        this.trigger.display.hex=true
                    break
                    case 'Junkie':
                        this.color={skin:{head:[240,220,180],body:[90,60,30],legs:[120,80,40],arms:[120,80,40]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.coat=[150,100,50]
                        this.color.hat=[170,170,170]
                        this.fades.coat=1
                        this.fades.hat=1
                        this.trigger.display.coat=true
                        this.trigger.display.hat=true
                    break
                    case 'Coffee Commander':
                        this.color={skin:{head:[240,220,180],body:[40,40,40],legs:[30,30,30],arms:[30,30,30]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.helmet=[40,40,40]
                        this.color.visor=[255,125,50]
                        this.color.tie=[[200,200,200],[0,0,0]]
                        this.color.belt=[180,180,180]
                        this.color.badge=[240,240,240]
                        this.color.band=[160,80,0]
                        this.fades.helmet=1
                        this.fades.visor=1
                        this.fades.tie=1
                        this.fades.belt=1
                        this.fades.badge=1
                        this.fades.band=1
                        this.trigger.display.helmet=true
                        this.trigger.display.visor=true
                        this.trigger.display.tie=true
                        this.trigger.display.belt=true
                        this.trigger.display.badge=true
                        this.trigger.display.band=true
                    break
                    case 'Comrade':
                        this.color={skin:{head:[240,220,180],body:[120,110,100],legs:[115,105,95],arms:[110,100,90]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.belt=[80,70,60]
                        this.color.hat=[[60,50,40],[200,25,25],[255,225,25],[200,25,25]]
                        this.color.moustache=[120,120,120]
                        this.color.badge=[[255,175,0],[255,225,0]]
                        this.fades.belt=1
                        this.fades.hat=1
                        this.fades.moustache=1
                        this.fades.badge=1
                        this.trigger.display.belt=true
                        this.trigger.display.hat=true
                        this.trigger.display.moustache=true
                        this.trigger.display.badge=true
                    break
                    case 'Councilman':
                        this.color={skin:{head:[140,125,120],body:[35,40,45],legs:[25,30,35],arms:[30,35,40]},eye:{back:[255,250,220]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.halo=[250,240,230]
                        this.color.wing=[250,235,210]
                        this.fades.halo=1
                        this.fades.wing-1
                        this.trigger.display.halo=true
                        this.trigger.display.wing-true
                        this.size=1.2
                    break
                    case 'Shadow Trooper':
                        this.color={skin:{head:[0,0,0],body:[0,0,0],legs:[0,0,0],arms:[0,0,0]},eye:{back:[255,255,255],front:[255,255,255],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.fades.skin.head=0.2
                        this.fades.skin.body=0.2
                        this.fades.skin.legs=0.2
                        this.fades.skin.arms=0.2
                        this.trigger.display.mouth=false
                    break
                    case 'Dark Priest':
                        this.color={skin:{head:[200,210,210],body:[180,190,190],legs:[70,65,30],arms:[160,170,170]},eye:{back:[255,225,150],front:[255,250,215],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.eyeHole=[0,0,0]
                        this.color.band=[195,185,145]
                        this.fades.eyeHole=1
                        this.fades.band=1
                        this.trigger.display.eyeHole=true
                        this.trigger.display.band=true
                    break
                    case 'Soul':
                        this.color={skin:{head:[255,255,255],body:[255,255,255],legs:[255,255,255],arms:[255,255,255]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.fades.skin.head=0.5
                        this.fades.skin.body=0.4
                        this.fades.skin.legs=0.3
                        this.fades.skin.arms=0.3
                    break
                    case 'Glitch':
                        this.colorChances=[[200,0,255],[0,100,200],[0,150,255],[255,150,50],[255,75,255],[50,255,50],[125,255,125],[255,255,100],[180,180,180],[255,100,100]]
                        this.color={skin:{head:this.colorChances[floor(random(0,this.colorChances.length))],body:this.colorChances[floor(random(0,this.colorChances.length))],legs:[this.colorChances[floor(random(0,this.colorChances.length))],this.colorChances[floor(random(0,this.colorChances.length))]],arms:[this.colorChances[floor(random(0,this.colorChances.length))],this.colorChances[floor(random(0,this.colorChances.length))]]},eye:{back:[255,255,255],front:[255,255,255],glow:[255,255,255]},mouth:{in:[200,100,100],out:[255,255,255]}}
                        this.size=0.8
                    break
                    case 'Glitched Giant':
                        this.colorChances=[[200,0,255],[0,100,200],[0,150,255],[255,150,50],[255,75,255],[50,255,50],[125,255,125],[255,255,100],[180,180,180],[255,100,100]]
                        this.color={skin:{head:this.colorChances[floor(random(0,this.colorChances.length))],body:this.colorChances[floor(random(0,this.colorChances.length))],legs:[this.colorChances[floor(random(0,this.colorChances.length))],this.colorChances[floor(random(0,this.colorChances.length))]],arms:[this.colorChances[floor(random(0,this.colorChances.length))],this.colorChances[floor(random(0,this.colorChances.length))]]},eye:{back:[255,255,255],front:[255,255,255],glow:[255,255,255]},mouth:{in:[200,100,100],out:[255,255,255]}}
                        this.color.armor=[195,115,35]
                        this.color.belt=[225,145,65]
                        this.fades.armor=1
                        this.fades.belt=1
                        this.trigger.display.armor=true
                        this.trigger.display.belt=true
                    break
                    case 'Nil':
                        this.color={skin:{head:[75,75,85],body:[20,20,25],legs:[10,10,15],arms:[10,10,15]},eye:{back:[255,255,255],front:[255,255,255],glow:[100,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.cape=[[170,230,235],[250,250,250]]
                        this.fades.cape=1
                        this.trigger.display.cape=true
                        this.trigger.display.mouth=false
                    break
                    case 'Rewriter':
                        this.color={skin:{head:[220,220,225],body:[80,90,110],legs:[70,80,100],arms:[70,80,100]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.bowtie=[[150,160,180],[10,25,40]]
                        this.color.goggles=[[245,245,250],[30,30,40]]
                        this.color.hat=[170,170,175]
                        this.fades.bowtie=1
                        this.fades.goggles=1
                        this.fades.hat=1
                        this.trigger.display.bowtie=true
                        this.trigger.display.goggles=true
                        this.trigger.display.hat=true
                    break
                    case 'Buried':
                        this.color={skin:{head:[120,150,250],body:[110,70,60],legs:[100,60,50],arms:[110,140,240]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.bone=[220,220,220]
                        this.fades.bone=1
                        this.trigger.display.bone=true
                    break
                    case 'Wiz':
                        this.color={skin:{head:[240,220,180],body:[80,40,100],legs:[70,30,90],arms:[70,30,100]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.belt=[180,180,180]
                        this.color.hat=[60,20,80]
                        this.color.moustache=[90,90,90]
                        this.fades.belt=1
                        this.fades.hat=1
                        this.fades.moustache=1
                        this.trigger.display.belt=true
                        this.trigger.display.hat=true
                        this.trigger.display.moustache=true
                    break
                    case 'Rusty':
                        this.color={skin:{head:[132,72,40],body:[126,68,38],legs:[120,65,36],arms:[120,65,36]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.bar=[96,51,28]
                        this.color.rust=[[140,78,43],[150,86,47]]
                        this.fades.bar=1
                        this.fades.rust=1
                        this.trigger.display.bar=true
                        this.trigger.display.rust=true
                    break
                    case 'Tech Support':
                        this.color={skin:{head:[240,220,180],body:[30,30,30],legs:[20,20,20],arms:[20,20,20]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.sunglasses=[0,0,0]
                        this.color.headset=[80,80,80]
                        this.color.hat=[40,40,40]
                        this.color.logo=[150,150,150]
                        this.fades.sunglasses=1
                        this.fades.headset=1
                        this.fades.hat=1
                        this.fades.logo=1
                        this.trigger.display.sunglasses=true
                        this.trigger.display.headset=true
                        this.trigger.display.hat=true
                        this.trigger.display.logo=true
                    break
                    case 'Vengeful':
                        this.color={skin:{head:[30,35,45],body:[30,50,125],legs:[20,40,115],arms:[20,40,115]},eye:{back:[0,125,255],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.hat=[[145,150,235],[20,25,50]]
                        this.fades.hat=1
                        this.trigger.display.hat=true
                        this.anim.sword=1
                        this.spin.sword=75
                        this.fades.sword=1
                        this.trigger.display.extra={sword:true}
                    break
                    case 'Lunaria':
                        this.color={skin:{head:[150,120,200],body:[50,20,55],legs:[40,10,45],arms:[40,10,45]},eye:{back:[255,255,255],front:[255,255,255],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.halo=[255,245,200]
                        this.color.stars=[255,255,235]
                        this.fades.halo=1
                        this.fades.stars=1
                        this.trigger.display.halo=true
                        this.trigger.display.stars=true
                        this.color.under={under:{top:[70,40,75]}}
                        this.spin.under={under:{top:[-40,40]}}
                        this.fades.under={under:{top:1}}
                        this.trigger.display.under={under:{top:true}}
                        this.anim.sword=1
                        this.spin.sword=75
                        this.fades.sword=1
                        this.trigger.display.extra={sword:true}
                    break
                    case 'Divine Guard':
                        this.color={skin:{head:[195,195,150],body:[140,140,130],legs:[130,130,120],arms:[130,130,120]},eye:{back:[255,255,220],front:[255,255,220],glow:[255,255,255]},mouth:{in:[200,100,100],out:[255,255,220]}}
                        this.color.sphere=[255,150,150]
                        this.color.band=[150,150,140]
                        this.color.hat=[175,175,160]
                        this.fades.sphere=1
                        this.fades.band=1
                        this.fades.hat=1
                        this.trigger.display.sphere=1
                        this.trigger.display.band=1
                        this.trigger.display.hat=1
                        this.anim.sword=1
                        this.spin.sword=75
                        this.fades.sword=1
                        this.trigger.display.extra={sword:true}
                    break
                    case 'Avant Guard':
                        this.color={skin:{head:[25,30,35],body:[20,25,25],legs:[15,20,20],arms:[15,20,20]},eye:{back:[175,170,190],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.wing=[210,215,225]
                        this.color.band=[245,195,150]
                        this.color.helmet=[30,33,366]
                        this.fades.wing=1
                        this.fades.band=1
                        this.fades.helmet=1
                        this.trigger.display.wing=true
                        this.trigger.display.band=true
                        this.trigger.display.helmet=true
                        this.anim.sword=1
                        this.spin.sword=75
                        this.fades.sword=1
                        this.trigger.display.extra={sword:true}
                    break
                    case 'Medic':
                        this.color={skin:{head:[240,220,180],body:[175,175,175],legs:[170,170,170],arms:[180,180,180]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.logo=[255,50,50]
                        this.color.mask=[150,200,200]
                        this.fades.logo=1
                        this.fades.mask=1
                        this.trigger.display.logo=true
                        this.trigger.display.mask=true
                        this.anim.eyeStyle=[4,4]
                    break
                    case 'Smith':
                        this.color={skin:{head:[240,220,180],body:[75,85,95],legs:[70,80,90],arms:[80,90,100]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.belt=[75,25,0]
                        this.color.apron=[220,220,220]
                        this.color.hammer=[100,90,80]
                        this.fades.belt=1
                        this.fades.apron=1
                        this.fades.hammer=1
                        this.trigger.display.belt=true
                        this.trigger.display.apron=true
                        this.trigger.display.hammer=true
                        this.anim.eyeStyle=[4,4]
                    break
                    case 'Navigator':
                        this.color={skin:{head:[240,220,180],body:[80,70,60],legs:[75,65,55],arms:[85,75,65]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.goggles=[[50,76,80],[120,100,0]]
                        this.color.midshirt=[180,190,200]
                        this.fades.goggles=1
                        this.fades.midshirt=1
                        this.trigger.display.goggles=true
                        this.trigger.display.clipboard=true
                        this.trigger.display.midshirt=true
                        this.anim.eyeStyle=[4,4]
                    break
                    case 'MobMan':
                        this.color={skin:{head:[240,220,180],body:[160,160,160],legs:[150,150,150],arms:[145,145,145]},eye:{back:[100,100,100],front:[80,80,80],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.spin.eye=[-30,30]
                        this.anim.mouth={x:9,y:1,open:0}
                        this.parts.mouth-=2
                        this.spin.mouth=186
                        this.color.tie=[[170,170,170],[60,60,60]]
                        this.fades.tie=1
                        this.trigger.display.tie=true
                    break
                    case 'NumberDummy':
                        this.color={skin:{head:[240,220,180],body:[70,80,90],legs:[60,70,80],arms:[65,75,85]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.logo=[255,255,0]
                        this.fades.logo=1
                        this.trigger.display.logo=true
                    break
                    case 'AttackDummy':
                        this.color={skin:{head:[240,220,180],body:[70,80,90],legs:[60,70,80],arms:[65,75,85]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.logo=[255,0,0]
                        this.fades.logo=1
                        this.trigger.display.logo=true
                    break
                    case 'BlockDummy':
                        this.color={skin:{head:[240,220,180],body:[70,80,90],legs:[60,70,80],arms:[65,75,85]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.logo=[0,0,255]
                        this.fades.logo=1
                        this.trigger.display.logo=true
                    break
                    case 'MoveDummy':
                        this.color={skin:{head:[240,220,180],body:[70,80,90],legs:[60,70,80],arms:[65,75,85]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.logo=[255,0,255]
                        this.fades.logo=1
                        this.trigger.display.logo=true
                    break
                    case '💀':
                        this.color={skin:{head:[230,230,210],body:[220,220,200],legs:[210,210,190],arms:[205,205,185]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[0,0,0],out:[0,0,0]}}
                        this.anim.eyeStyle=[5,5]
                        this.parts.legs[0].top.x=3
                        this.parts.legs[1].top.x=3
                        this.parts.arms[0].top.x=3.5
                        this.parts.arms[1].top.x=3.5
                        this.size=0.9
                    break
                    case 'L':
                        this.color={skin:{head:[240,220,180],body:[0,100,0],legs:[0,40,0],arms:[180,180,180]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.tie=[0,80,0]
                        this.color.coat=[210,210,210]
                        this.fades.tie=1
                        this.fades.coat=1
                        this.trigger.display.tie=true
                        this.trigger.display.coat=true
                        this.size=0.95
                    break
                    case 'Inconsistent':
                        this.color={eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    break
                    case 'Unknown':
                        this.color={skin:{head:[200,200,200],body:[190,190,190],legs:[180,180,180],arms:[185,185,185]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    break
                    case 'Jester':
                        this.color={skin:{head:[240,220,180],body:[0,50,100],legs:[0,45,90],arms:[240,245,250]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                        this.color.skin.upperBody=[225,0,0]
                        this.color.hat=[[225,0,0],[150,0,0],[200,160,0]]
                        this.fades.hat=1
                        this.trigger.display.hat=true
                    break
                    case 'Man':
                        this.color={skin:{head:[240,220,180],body:[160,160,160],legs:[150,150,150],arms:[145,145,145]},eye:{back:[100,100,100],front:[80,80,80],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    break
                    default:
                        this.color={skin:{head:[240,220,180],body:[95,95,95],legs:[90,90,90],arms:[100,100,100]},eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},mouth:{in:[200,100,100],out:[0,0,0]}}
                    break
                }
            break
        }
    }
    reset(){
        this.size=this.base.size
        this.anim=this.base.anim
        this.block=0

        this.combo=0
        this.armed=true
        this.balance=0
        this.balanceCap=10
        this.orbs=[-1,-1,-1,-1]
        this.orbDetail=[0,0,0,0]
        this.anyOrb=false
        this.totalOrb=0
        this.totalOrbClass=[]
        this.lastOrb=0
        this.metal=0
        this.stance=0
        this.faith=0
        this.charge=0
        this.ammo=3
        this.resetAnim()
        
        for(let a=0,la=this.status.main.length;a<la;a++){
            this.status.main[a]=0
            this.status.active[a]=false
            this.status.position[a]=0
            this.status.size[a]=0
        }
        this.status.display=[]
        this.infoAnim={life:1,block:0,size:1,balance:0,orb:0,orbSpec:[],description:0,upSize:false,intent:[],flash:[0,0,0,0],upFlash:[false,false,false,false],stance:[0,0,0,0,0,0],faith:[0,0,0,0,0,0,0,0,0,0]}
        for(let a=0,la=this.orbs.length;a<la;a++){
            this.infoAnim.orbSpec.push([])
            for(let b=0,lb=game.orbNumber;b<lb;b++){
                this.infoAnim.orbSpec[a].push(0)
            }
        }
        for(let a=0,la=game.orbNumber;a<la;a++){
            this.totalOrbClass.push(0)
        }
    }
    resetAnim(){
        this.startAnimation(0)
        this.runAnimation(0,0)
        switch(this.name){
            case 'Donakho':
                this.anim.fat=1
            break
        }
    }
    initialBuff(){
        if(this.spec.includes(5)){
            let tile=this.battle.tileManager.getTileIndex(this.tilePosition.x,this.tilePosition.y)
            if(tile>=0){
                this.battle.tileManager.tiles[tile].addType(6)
            }
        }
        if(this.spec.includes(6)){
            this.threshold=this.life-20
        }
        if(this.team==0){
            if(this.battle.modded(20)&&floor(random(0,4))==0){
                this.statusEffect('Invisible',999)
            }
            if(this.battle.modded(24)){
                this.statusEffect('Dodge',1)
            }
            if(this.battle.modded(27)){
                this.statusEffect('Strength on Hit',1)
            }
            if(this.battle.modded(43)&&(this.name.includes('P')||this.name.includes('p'))){
                this.statusEffect('Strength',3)
            }
            if(this.battle.modded(44)&&(this.name.includes('R')||this.name.includes('r'))){
                this.statusEffect('Strength',3)
            }
            if(this.battle.modded(45)&&(this.name.includes('S')||this.name.includes('s'))){
                this.statusEffect('Strength',3)
            }
            if(this.battle.modded(46)&&(this.name.includes('C')||this.name.includes('c'))){
                this.statusEffect('Strength',3)
            }
            if(this.battle.modded(47)&&(this.name.includes('F')||this.name.includes('f'))){
                this.statusEffect('Strength',3)
            }
            if(this.battle.modded(88)){
                this.statusEffect('Single Counter Block',10)
            }
            if(this.battle.modded(99)){
                this.randomStatus(1,[0])
            }
            if(this.battle.modded(105)){
                this.statusEffect('Counter All Combat',1)
            }
            if(this.battle.modded(134)){
                this.statusEffect('Take Half Damage',2)
            }
            if(this.battle.modded(139)){
                this.statusEffect('Invisible',1)
            }
        }
        if(this.name.includes('Duck')){
            if(this.battle.modded(22)){
                this.life*=2
                this.base.life*=2
                this.collect.life*=2
            }
            if(this.battle.modded(106)){
                this.statusEffect('Double Damage',999)
            }
        }
        switch(this.name){
            case 'Orb Walker':
                this.statusEffect('Strength Per Turn',1)
            break
            case 'Gangster':
                this.statusEffect('Counter Combat',4)
            break
            case 'Slippery Gangster':
                this.statusEffect('Dodge',3)
            break
            case 'Spheron':
                this.addBlock(20)
                this.statusEffect('Retain Block',999)
            break
            case 'Enforcer':
                this.statusEffect('Strength on Hit',1)
            break
            case 'Spike Slime': case 'Big Spike Slime':
                this.statusEffect('Counter All Combat',1)
            break
            case 'Moss Creature':
                this.statusEffect('Metallicize',2)
            break
            case 'Slow King':
                this.addBlock(60)
                this.statusEffect('Retain Block',999)
            break
            case 'Donu': case 'Deca':
                this.statusEffect('Control',2)
            break
            case 'Angry Gremlin':
                this.statusEffect('Strength on Hit',1)
            break
            case 'Solar Shard':
                this.statusEffect('Vulnerable on Kill',4)
            break
            case 'Lunar Shard':
                this.statusEffect('Weak on Kill',2)
            break
            case 'Fireball':
                this.statusEffect('Counter All Combat',3)
            break
            case 'Armored Ninja':
                this.addBlock(18)
                this.statusEffect('Retain Block',999)
                this.statusEffect('Counter All Combat',1)
            break
            case 'Louse':
                this.statusEffect('Single Counter Block',floor(random(3,8)))
            break
            case 'Soul':
                this.statusEffect('Dissipating',5)
            break
            case 'Spike Pillar':
                this.statusEffect('Counter All Combat',4)
            break
            case 'Barbed Pillar':
                this.statusEffect('Counter Bleed Combat',2)
            break
            case 'Glitch':
                this.statusEffect('End Move',floor(random(1,3)))
            break
            case 'Rewriter':
                this.statusEffect('Cannot Die',999)
            break
            case 'Mirror Shield':
                this.statusEffect('Reflect',1)
            break
            case 'L':
                this.statusEffect('Numeric Explode on Death',6)
            break
        }
        if(this.team==0){
            if(game.ascend>=2&&this.battle.encounter.class==0||game.ascend>=3&&this.battle.encounter.class==1||game.ascend>=4&&this.battle.encounter.class==2){
                for(let a=0,la=this.attack.length;a<la;a++){
                    if((types.attack[this.attack[a].type].class==1||types.attack[this.attack[a].type].class==5)&&this.attack[a].effect.length>=1&&this.attack[a].effect[0]>1){
                        for(let b=0,lb=this.attack[a].effect.length;b<lb;b++){
                            if(this.attack[a].effect[b]<0||this.attack[a].effect[b]>0){
                                this.attack[a].effect[b]=round(this.attack[a].effect[b]*1.2)
                            }
                        }
                    }
                }
            }
            if(game.ascend>=7&&this.battle.encounter.class==0||game.ascend>=8&&this.battle.encounter.class==1||game.ascend>=9&&this.battle.encounter.class==2){
                this.life=round(this.life*1.2)
                this.base.life=round(this.base.life*1.2)
                this.collect.life=round(this.collect.life*1.2)
                for(let a=0,la=this.attack.length;a<la;a++){
                    if((types.attack[this.attack[a].type].class==2)&&this.attack[a].effect.length>=1&&this.attack[a].effect[0]>1){
                        for(let b=0,lb=this.attack[a].effect.length;b<lb;b++){
                            if(this.attack[a].effect[b]<0||this.attack[a].effect[b]>0){
                                this.attack[a].effect[b]=round(this.attack[a].effect[b]*1.2)
                            }
                        }
                    }
                }
            }
            if(game.ascend>=17&&this.battle.encounter.class==0||game.ascend>=18&&this.battle.encounter.class==1||game.ascend>=19&&this.battle.encounter.class==2){
                for(let a=0,la=this.attack.length;a<la;a++){
                    if((types.attack[this.attack[a].type].class==4)&&this.attack[a].effect.length>=1&&this.attack[a].effect[0]>1&&this.attack[a].effect[0]<0){
                        for(let b=0,lb=this.attack[a].effect.length;b<lb;b++){
                            if(this.attack[a].effect[b]<0||this.attack[a].effect[b]>0){
                                this.attack[a].effect[b]=round(this.attack[a].effect[b]*1.25)
                            }
                        }
                    }
                }
            }
            if(game.ascend>=27&&this.battle.encounter.class==0||game.ascend>=28&&this.battle.encounter.class==1){
                let randombuffs=[
                    ['Double Damage',1],['Dodge',1],['Strength',2],['Dexterity',2],['Single Damage',6],['Retain Block',10],['Block Next Turn',10],['Armor',4],['Control',1],['Temporary Strength',10],
                    ['Temporary Dexterity',10],['Metallicize',2],['Buffer',1],['Take Half Damage',2],['Intangible',1],['Counter All',3],['Strength Per Turn',1],['Regeneration',5],['Dexterity Per Turn',1],['Counter Combat',2],
                    ['Temporary Damage Up',4],['Strength on Hit',1],['Weak on Kill',2],['Vulnerable on Kill',2],['Counter Combat Turn',4],['Single Counter Block',8],['Invisible',4],['Take Third Damage',2],['Speed Up',1],['Strength Next Turn',3],
                    ['Temporary Strength on Hit',2],['Take 3/4 Damage',4],['Temporary Strength Next Turn',20],['Temporary Speed Up',3],['Untargettable From Front',1],['Conditioning',2],['Counter All Combat',1],['Damage Damage Turn',1],['Damage Damage Turn Next Turn',1],['Intangible Next Turn',1],
                    ['Block Next Turn Next Turn',20],['Heal on Hit',3],['Take 3/5 Damage',2],['Attack Bleed Turn',2],['Single Attack Bleed',4],['Attack Bleed Combat',1],['Counter Block',3],['Dodge Next Turn',1],['Block Return',5],['Cannot Die',1],
                    ['Single Damage Block Convert',2],['Triple Block',1],['Dexterity Next Turn',3],['Take Credit',1],['Triple Damage',1],['1.5x Damage',2],['1.5x Block',3],['Decrementing Strength',3],['Block Up',2],['Take Credit Turn',1],
                    ['Take Credit Block Turn',1],['Damage Up',2],['Temporary Block Up',4],['Block Next Turn Next Turn Next Turn',40],['Dexterity on Hit',1],['Temporary Dexterity on Hit',2],['Heal Per Turn',2],['Temporary Dexterity Next Turn',20]
                ]
                for(let a=0,la=2;a<la;a++){
                    let index=floor(random(0,randombuffs.length))
                    this.statusEffect(randombuffs[index][0],randombuffs[index][1])
                    randombuffs.splice(index,1)
                }
            }
            if(game.ascend>=30&&this.battle.encounter.class==2&&this.battle.nodeManager.world==3){
                if(this.spec.includes(2)){
                    this.life=round(this.life*1.5)
                    this.base.life=round(this.base.life*1.5)
                    this.collect.life=round(this.collect.life*1.5)
                }
                for(let a=0,la=this.attack.length;a<la;a++){
                    if((types.attack[this.attack[a].type].class==1||types.attack[this.attack[a].type].class==2||types.attack[this.attack[a].type].class==5)&&this.attack[a].effect.length>=1&&this.attack[a].effect[0]>1){
                        this.attack[a].effect[0]=round(this.attack[a].effect[0]*1.2)
                    }
                }
            }else if(game.ascend>=29&&this.battle.encounter.class==2){
                this.statusEffect('Strength',2)
                this.statusEffect('Dexterity',2)
            }
        }else if(this.type<=game.playerNumber){
            if(game.ascend>=6){
                this.life*=0.8
                this.collect.life*=0.8
            }
            if(game.ascend>=14){
                this.base.life*=0.9
            }
        }
        if(variants.lowhealth){
            this.life=round(this.life*0.2)
            this.base.life=round(this.base.life*0.2)
            this.collect.life=round(this.collect.life*0.2)
        }
        if(variants.midhealth){
            this.life=round(this.life*0.5)
            this.base.life=round(this.base.life*0.5)
            this.collect.life=round(this.collect.life*0.5)
        }
        if(variants.shortmap&&this.team==0){
            this.life=round(this.life*0.8**this.battle.nodeManager.world)
            this.base.life=round(this.base.life*0.8**this.battle.nodeManager.world)
            this.collect.life=round(this.collect.life*0.8**this.battle.nodeManager.world)
            if(this.battle.encounter.class==2){
                this.life=round(this.life*0.9)
                this.base.life=round(this.base.life*0.9)
                this.collect.life=round(this.collect.life*0.9)
            }
        }
        if(variants.shortermap&&this.team==0){
            this.life=round(this.life*0.7**this.battle.nodeManager.world)
            this.base.life=round(this.base.life*0.7**this.battle.nodeManager.world)
            this.collect.life=round(this.collect.life*0.7**this.battle.nodeManager.world)
            if(this.battle.encounter.class==2){
                this.life=round(this.life*0.8)
                this.base.life=round(this.base.life*0.8)
                this.collect.life=round(this.collect.life*0.8)
            }
        }
    }
    calculateParts(){
        this.anim.head=this.anim.direction
        switch(this.name){
            case 'Lira': case 'Sakura': case 'Setsuna': case 'Ume':
                for(let g=0;g<2;g++){
                    this.parts.legs[g].middle.x=this.parts.legs[g].top.x+lsin(this.anim.legs[g].top)*this.anim.legs[g].length.top
                    this.parts.legs[g].middle.y=this.parts.legs[g].top.y+lcos(this.anim.legs[g].top)*this.anim.legs[g].length.top
                    this.parts.legs[g].bottom.x=this.parts.legs[g].middle.x+lsin(this.anim.legs[g].bottom)*this.anim.legs[g].length.bottom
                    this.parts.legs[g].bottom.y=this.parts.legs[g].middle.y+lcos(this.anim.legs[g].bottom)*this.anim.legs[g].length.bottom
                    this.parts.legs[g].sandal.front.x=this.parts.legs[g].middle.x+lsin(this.anim.legs[g].bottom)*this.anim.legs[g].length.sandal.front
                    this.parts.legs[g].sandal.front.y=this.parts.legs[g].middle.y+lcos(this.anim.legs[g].bottom)*this.anim.legs[g].length.sandal.front
                    this.parts.legs[g].sandal.back.x=this.parts.legs[g].middle.x+lsin(this.anim.legs[g].bottom)*this.anim.legs[g].length.sandal.back
                    this.parts.legs[g].sandal.back.y=this.parts.legs[g].middle.y+lcos(this.anim.legs[g].bottom)*this.anim.legs[g].length.sandal.back

                    this.graphics.legs[g].top.x=this.parts.legs[g].top.x*lsin(this.spin.legs[g].top+this.anim.direction),
                    this.graphics.legs[g].top.y=this.parts.legs[g].top.y
                    this.graphics.legs[g].middle.x=this.parts.legs[g].middle.x*lsin(this.spin.legs[g].top+this.anim.direction),
                    this.graphics.legs[g].middle.y=this.parts.legs[g].middle.y
                    this.graphics.legs[g].bottom.x=this.parts.legs[g].bottom.x*lsin(this.spin.legs[g].bottom+this.anim.direction),
                    this.graphics.legs[g].bottom.y=this.parts.legs[g].bottom.y
                    this.graphics.legs[g].sandal.front.x=this.parts.legs[g].sandal.front.x*lsin(this.spin.legs[g].bottom+this.anim.direction),
                    this.graphics.legs[g].sandal.front.y=this.parts.legs[g].sandal.front.y
                    this.graphics.legs[g].sandal.back.x=this.parts.legs[g].sandal.back.x*lsin(this.spin.legs[g].bottom+this.anim.direction),
                    this.graphics.legs[g].sandal.back.y=this.parts.legs[g].sandal.back.y

                    this.parts.arms[g].middle.x=this.parts.arms[g].top.x+lsin(this.anim.arms[g].top)*this.anim.arms[g].length.top
                    this.parts.arms[g].middle.y=this.parts.arms[g].top.y+lcos(this.anim.arms[g].top)*this.anim.arms[g].length.top
                    this.parts.arms[g].bottom.x=this.parts.arms[g].middle.x+lsin(this.anim.arms[g].bottom)*this.anim.arms[g].length.bottom
                    this.parts.arms[g].bottom.y=this.parts.arms[g].middle.y+lcos(this.anim.arms[g].bottom)*this.anim.arms[g].length.bottom

                    this.graphics.arms[g].top.x=this.parts.arms[g].top.x*lsin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].top.y=this.parts.arms[g].top.y
                    this.graphics.arms[g].middle.x=this.parts.arms[g].middle.x*lsin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].middle.y=this.parts.arms[g].middle.y
                    this.graphics.arms[g].bottom.x=this.parts.arms[g].bottom.x*lsin(this.spin.arms[g].bottom+this.anim.direction),
                    this.graphics.arms[g].bottom.y=this.parts.arms[g].bottom.y

                    this.graphics.arms[g].topStack.x=(this.parts.arms[g].top.x+(4-min(4,lcos(this.spin.arms[g].top+this.anim.direction)*5+2))/2)*lsin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].topStack.y=this.parts.arms[g].top.y-(4-min(4,lcos(this.spin.arms[g].top+this.anim.direction)*5+2))/4
                    this.graphics.arms[g].middleStack.x=(this.parts.arms[g].middle.x+(4-min(4,lcos(this.spin.arms[g].top+this.anim.direction)*5+2))/2)*lsin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].middleStack.y=this.parts.arms[g].middle.y
                    this.graphics.arms[g].bottomStack.x=(this.parts.arms[g].bottom.x+(4-min(4,lcos(this.spin.arms[g].top+this.anim.direction)*5+2))/2)*lsin(this.spin.arms[g].bottom+this.anim.direction),
                    this.graphics.arms[g].bottomStack.y=this.parts.arms[g].bottom.y
                }
                this.sprites.spin=round(((this.anim.direction%360)+360)%360)
                this.sprites.spinDetail=constrain(round((((this.anim.direction%360)+360)%360)/this.sprites.detail),0,360/this.sprites.detail-1)
                this.sprites.spinDetailHead=constrain(round((((this.anim.head%360)+360)%360)/this.sprites.detail),0,360/this.sprites.detail-1)
            break
            case 'Certes': case 'Airi':
                for(let g=0;g<2;g++){
                    this.parts.legs[g].middle.x=this.parts.legs[g].top.x+lsin(this.anim.legs[g].top)*this.anim.legs[g].length.top
                    this.parts.legs[g].middle.y=this.parts.legs[g].top.y+lcos(this.anim.legs[g].top)*this.anim.legs[g].length.top
                    this.parts.legs[g].bottom.x=this.parts.legs[g].middle.x+lsin(this.anim.legs[g].bottom)*this.anim.legs[g].length.bottom
                    this.parts.legs[g].bottom.y=this.parts.legs[g].middle.y+lcos(this.anim.legs[g].bottom)*this.anim.legs[g].length.bottom

                    this.graphics.legs[g].top.x=this.parts.legs[g].top.x*lsin(this.spin.legs[g].top+this.anim.direction),
                    this.graphics.legs[g].top.y=this.parts.legs[g].top.y
                    this.graphics.legs[g].middle.x=this.parts.legs[g].middle.x*lsin(this.spin.legs[g].top+this.anim.direction),
                    this.graphics.legs[g].middle.y=this.parts.legs[g].middle.y
                    this.graphics.legs[g].bottom.x=this.parts.legs[g].bottom.x*lsin(this.spin.legs[g].bottom+this.anim.direction),
                    this.graphics.legs[g].bottom.y=this.parts.legs[g].bottom.y

                    this.parts.arms[g].middle.x=this.parts.arms[g].top.x+lsin(this.anim.arms[g].top)*this.anim.arms[g].length.top
                    this.parts.arms[g].middle.y=this.parts.arms[g].top.y+lcos(this.anim.arms[g].top)*this.anim.arms[g].length.top
                    this.parts.arms[g].bottom.x=this.parts.arms[g].middle.x+lsin(this.anim.arms[g].bottom)*this.anim.arms[g].length.bottom
                    this.parts.arms[g].bottom.y=this.parts.arms[g].middle.y+lcos(this.anim.arms[g].bottom)*this.anim.arms[g].length.bottom

                    this.graphics.arms[g].top.x=this.parts.arms[g].top.x*lsin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].top.y=this.parts.arms[g].top.y
                    this.graphics.arms[g].middle.x=this.parts.arms[g].middle.x*lsin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].middle.y=this.parts.arms[g].middle.y
                    this.graphics.arms[g].bottom.x=this.parts.arms[g].bottom.x*lsin(this.spin.arms[g].bottom+this.anim.direction),
                    this.graphics.arms[g].bottom.y=this.parts.arms[g].bottom.y

                    this.graphics.arms[g].topStack.x=(this.parts.arms[g].top.x+(4-min(4,lcos(this.spin.arms[g].top+this.anim.direction)*5+2))/2)*lsin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].topStack.y=this.parts.arms[g].top.y-(4-min(4,lcos(this.spin.arms[g].top+this.anim.direction)*5+2))/4
                    this.graphics.arms[g].middleStack.x=(this.parts.arms[g].middle.x+(4-min(4,lcos(this.spin.arms[g].top+this.anim.direction)*5+2))/2)*lsin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].middleStack.y=this.parts.arms[g].middle.y
                    this.graphics.arms[g].bottomStack.x=(this.parts.arms[g].bottom.x+(4-min(4,lcos(this.spin.arms[g].top+this.anim.direction)*5+2))/2)*lsin(this.spin.arms[g].bottom+this.anim.direction),
                    this.graphics.arms[g].bottomStack.y=this.parts.arms[g].bottom.y
                }
                this.sprites.spin=round(((this.anim.direction%360)+360)%360)
                this.sprites.spinDetail=constrain(round((((this.anim.direction%360)+360)%360)/this.sprites.detail),0,360/this.sprites.detail-1)
                this.sprites.spinDetailHead=constrain(round((((this.anim.head%360)+360)%360)/this.sprites.detail),0,360/this.sprites.detail-1)
            break
            case 'Donakho':
                for(let g=0;g<2;g++){
                    this.parts.legs[g].middle.x=this.parts.legs[g].top.x+lsin(this.anim.legs[g].top)*this.anim.legs[g].length.top
                    this.parts.legs[g].middle.y=this.parts.legs[g].top.y+lcos(this.anim.legs[g].top)*this.anim.legs[g].length.top

                    this.graphics.legs[g].top.x=this.parts.legs[g].top.x*lsin(this.spin.legs[g].top+this.anim.direction),
                    this.graphics.legs[g].top.y=this.parts.legs[g].top.y
                    this.graphics.legs[g].middle.x=this.parts.legs[g].middle.x*lsin(this.spin.legs[g].top+this.anim.direction),
                    this.graphics.legs[g].middle.y=this.parts.legs[g].middle.y
                    this.graphics.legs[g].bottom.x=this.graphics.legs[g].middle.x
                    this.graphics.legs[g].bottom.y=this.graphics.legs[g].middle.y

                    this.parts.arms[g].middle.x=this.parts.arms[g].top.x+lsin(this.anim.arms[g].top)*this.anim.arms[g].length.top
                    this.parts.arms[g].middle.y=this.parts.arms[g].top.y+lcos(this.anim.arms[g].top)*this.anim.arms[g].length.top

                    this.graphics.arms[g].top.x=this.parts.arms[g].top.x*lsin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].top.y=this.parts.arms[g].top.y
                    this.graphics.arms[g].middle.x=this.parts.arms[g].middle.x*lsin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].middle.y=this.parts.arms[g].middle.y
                    this.graphics.arms[g].bottom.x=this.graphics.arms[g].middle.x
                    this.graphics.arms[g].bottom.y=this.graphics.arms[g].middle.y
                }
            break
            case 'Duck': case 'Fungal Duck': case 'Duckforce': case 'Big Duck': case 'Agent Duck': case 'General Duckion': case 'Blue Duck': case 'Management Autoduck': case 'Fat Duck':
                for(let g=0;g<2;g++){
                    this.parts.legs[g].middle.x=this.parts.legs[g].top.x+lsin(this.anim.legs[g].top)*this.anim.legs[g].length.top
                    this.parts.legs[g].middle.y=this.parts.legs[g].top.y+lcos(this.anim.legs[g].top)*this.anim.legs[g].length.top

                    this.graphics.legs[g].top.x=this.parts.legs[g].top.x*lsin(this.spin.legs[g].top+this.anim.direction),
                    this.graphics.legs[g].top.y=this.parts.legs[g].top.y
                    this.graphics.legs[g].middle.x=this.parts.legs[g].middle.x*lsin(this.spin.legs[g].top+this.anim.direction),
                    this.graphics.legs[g].middle.y=this.parts.legs[g].middle.y

                    this.parts.arms[g].middle.x=this.parts.arms[g].top.x+lsin(this.anim.arms[g].top)*this.anim.arms[g].length.top
                    this.parts.arms[g].middle.y=this.parts.arms[g].top.y+lcos(this.anim.arms[g].top)*this.anim.arms[g].length.top

                    this.graphics.arms[g].top.x=this.parts.arms[g].top.x*lsin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].top.y=this.parts.arms[g].top.y
                    this.graphics.arms[g].middle.x=this.parts.arms[g].middle.x*lsin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].middle.y=this.parts.arms[g].middle.y
                }
            break
            case 'Orb Walker':
                for(let g=0;g<4;g++){
                    this.parts.legs[g].middle.x=this.parts.legs[g].top.x+lsin(this.anim.legs[g].top)*this.anim.legs[g].length.top
                    this.parts.legs[g].middle.y=this.parts.legs[g].top.y+lcos(this.anim.legs[g].top)*this.anim.legs[g].length.top

                    this.graphics.legs[g].top.x=this.parts.legs[g].top.x*lsin(this.spin.legs[g].top+this.anim.direction),
                    this.graphics.legs[g].top.y=this.parts.legs[g].top.y
                    this.graphics.legs[g].middle.x=this.parts.legs[g].middle.x*lsin(this.spin.legs[g].top+this.anim.direction),
                    this.graphics.legs[g].middle.y=this.parts.legs[g].middle.y
                }
            break
            case 'Slime': case 'Big Slime': case 'Spike Slime': case 'Big Spike Slime': case 'Slime Boss': case 'Slimoid': case 'Big Slimoid': case 'Modicum': case 'Rock Golem': case 'Shield Particle': case 'Bush Thing': case 'Fireball': case 'Fungling': case 'Bee': case 'Pixie': case 'Darkblot':
                for(let g=0;g<2;g++){
                    this.parts.arms[g].middle.x=this.parts.arms[g].top.x+lsin(this.anim.arms[g].top)*this.anim.arms[g].length.top
                    this.parts.arms[g].middle.y=this.parts.arms[g].top.y+lcos(this.anim.arms[g].top)*this.anim.arms[g].length.top

                    this.graphics.arms[g].top.x=this.parts.arms[g].top.x*lsin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].top.y=this.parts.arms[g].top.y
                    this.graphics.arms[g].middle.x=this.parts.arms[g].middle.x*lsin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].middle.y=this.parts.arms[g].middle.y
                }
            break
            case 'Turret': case 'Explosive Turret': case 'Multiturret': case 'Repulse Turret': case 'Machine Gun': case 'Miniturret': case 'Armored Turret':
                this.graphics={arms:[{bottom:{x:lsin(this.anim.direction)*40,y:-25}},{bottom:{x:lsin(this.anim.direction)*40,y:-25}}]}
            break
            case 'Spheron': case 'Flame': case 'Hexaghost Orb': case 'Hexaghost Core': case 'Host': case 'Host Drone': case 'Thornvine':
            case 'Bronze Orb C': case 'Bronze Orb A': case 'Sentry': case 'Flying Rock': case 'Repulsor': case 'Dead Shell': case 'Management Drone': case 'Personnel Carrier': case 'Louse': case 'Hwurmp': case 'Glimerrer': case 'Antihwurmp':
            case 'Wall': case 'Spike Pillar': case 'Projector': case 'Readout': case 'Strengthener': case 'Barbed Pillar': case 'Gun Rack': case 'Metal Box': case 'Upgrader': case 'Transformer': case 'Doubler': case 'Exhauster': case 'Teleporter Start': case 'Teleporter End': case 'Antizone': case 'Mirror Shield': break
            default:
                for(let g=0;g<2;g++){
                    this.parts.legs[g].middle.x=this.parts.legs[g].top.x+lsin(this.anim.legs[g].top)*this.anim.legs[g].length.top
                    this.parts.legs[g].middle.y=this.parts.legs[g].top.y+lcos(this.anim.legs[g].top)*this.anim.legs[g].length.top
                    this.parts.legs[g].bottom.x=this.parts.legs[g].middle.x+lsin(this.anim.legs[g].bottom)*this.anim.legs[g].length.bottom
                    this.parts.legs[g].bottom.y=this.parts.legs[g].middle.y+lcos(this.anim.legs[g].bottom)*this.anim.legs[g].length.bottom

                    this.graphics.legs[g].top.x=this.parts.legs[g].top.x*lsin(this.spin.legs[g].top+this.anim.direction),
                    this.graphics.legs[g].top.y=this.parts.legs[g].top.y
                    this.graphics.legs[g].middle.x=this.parts.legs[g].middle.x*lsin(this.spin.legs[g].top+this.anim.direction),
                    this.graphics.legs[g].middle.y=this.parts.legs[g].middle.y
                    this.graphics.legs[g].bottom.x=this.parts.legs[g].bottom.x*lsin(this.spin.legs[g].bottom+this.anim.direction),
                    this.graphics.legs[g].bottom.y=this.parts.legs[g].bottom.y

                    this.parts.arms[g].middle.x=this.parts.arms[g].top.x+lsin(this.anim.arms[g].top)*this.anim.arms[g].length.top
                    this.parts.arms[g].middle.y=this.parts.arms[g].top.y+lcos(this.anim.arms[g].top)*this.anim.arms[g].length.top
                    this.parts.arms[g].bottom.x=this.parts.arms[g].middle.x+lsin(this.anim.arms[g].bottom)*this.anim.arms[g].length.bottom
                    this.parts.arms[g].bottom.y=this.parts.arms[g].middle.y+lcos(this.anim.arms[g].bottom)*this.anim.arms[g].length.bottom

                    this.graphics.arms[g].top.x=this.parts.arms[g].top.x*lsin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].top.y=this.parts.arms[g].top.y
                    this.graphics.arms[g].middle.x=this.parts.arms[g].middle.x*lsin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].middle.y=this.parts.arms[g].middle.y
                    this.graphics.arms[g].bottom.x=this.parts.arms[g].bottom.x*lsin(this.spin.arms[g].bottom+this.anim.direction),
                    this.graphics.arms[g].bottom.y=this.parts.arms[g].bottom.y

                    this.graphics.arms[g].topStack.x=(this.parts.arms[g].top.x+(4-min(4,lcos(this.spin.arms[g].top+this.anim.direction)*5+2))/2)*lsin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].topStack.y=this.parts.arms[g].top.y-(4-min(4,lcos(this.spin.arms[g].top+this.anim.direction)*5+2))/4
                    this.graphics.arms[g].middleStack.x=(this.parts.arms[g].middle.x+(4-min(4,lcos(this.spin.arms[g].top+this.anim.direction)*5+2))/2)*lsin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].middleStack.y=this.parts.arms[g].middle.y
                    this.graphics.arms[g].bottomStack.x=(this.parts.arms[g].bottom.x+(4-min(4,lcos(this.spin.arms[g].top+this.anim.direction)*5+2))/2)*lsin(this.spin.arms[g].bottom+this.anim.direction),
                    this.graphics.arms[g].bottomStack.y=this.parts.arms[g].bottom.y
                }
            break
            
        }
    }
    getTarget(){
        switch(this.attack[this.intent].type){
            case 1: case 2: case 3: case 11: case 13: case 22: case 23: case 31: case 34: case 35:
            case 36: case 37: case 97: case 101: case 103: case 113: case 116: case 121: case 122: case 209:
            case 212: case 229: case 242: case 246: case 247:
                return this.battle.modded(57)?[
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*2)
                ]:
                [this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1])]
            case 6: case 7: case 8: case 14: case 15: case 19: case 20: case 24: case 27: case 30:
            case 32: case 33: case 61: case 62: case 66: case 67: case 76: case 77: case 96: case 107:
            case 112: case 138: case 139: case 149: case 156: case 183: case 203: case 211: case 223: case 224:
            case 248:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*2)
                ]
            case 71: case 73: case 79: case 99: case 143: case 172: case 175:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*3,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*3)
                ]
            case 100:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*3,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*4,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*4)
                ]
            case 9: case 60: case 64: case 69: case 82: case 84: case 95: case 104: case 114: case 124:
            case 153:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1])
                ]
            case 12: case 38: case 45: case 47: case 50: case 59: case 80: case 81: case 83: case 89:
            case 90: case 91: case 98: case 106: case 115: case 117: case 118: case 119: case 123: case 125:
            case 129: case 130: case 134: case 135: case 140: case 141: case 144: case 145: case 148: case 151:
            case 152: case 154: case 158: case 160: case 161: case 162: case 165: case 173: case 178: case 179:
            case 180: case 184: case 188: case 191: case 193: case 194: case 196: case 199: case 200: case 201:
            case 202: case 206: case 208: case 235: case 236: case 245:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*3,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*4,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*4),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*5,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*5),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*6,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*6)
                ]
            case 16: case 17: case 54: case 87: case 120: case 128: case 132: case 133: case 136: case 142:
            case 147: case 157: case 198: case 213: case 215: case 217:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-150)[0],this.tilePosition.y+transformDirection(0,-150)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-90)[0],this.tilePosition.y+transformDirection(0,-90)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-30)[0],this.tilePosition.y+transformDirection(0,-30)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,30)[0],this.tilePosition.y+transformDirection(0,30)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,90)[0],this.tilePosition.y+transformDirection(0,90)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,150)[0],this.tilePosition.y+transformDirection(0,150)[1])
                ]
            case 28: case 44: case 53: case 105: case 146: case 168: case 171:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]*2)
                ]
            case 49: case 164: case 185:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*3,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*4,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*4),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*5,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*5),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*6,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*6),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]+transformDirection(0,this.goal.anim.direction)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]+transformDirection(0,this.goal.anim.direction)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]+transformDirection(0,this.goal.anim.direction)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]+transformDirection(0,this.goal.anim.direction)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]+transformDirection(0,this.goal.anim.direction)[0]*3,this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]+transformDirection(0,this.goal.anim.direction)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]+transformDirection(0,this.goal.anim.direction)[0]*4,this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]+transformDirection(0,this.goal.anim.direction)[1]*4),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]+transformDirection(0,this.goal.anim.direction)[0]*5,this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]+transformDirection(0,this.goal.anim.direction)[1]*5),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]+transformDirection(0,this.goal.anim.direction)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]+transformDirection(0,this.goal.anim.direction)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]+transformDirection(0,this.goal.anim.direction)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]+transformDirection(0,this.goal.anim.direction)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]+transformDirection(0,this.goal.anim.direction)[0]*3,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]+transformDirection(0,this.goal.anim.direction)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]+transformDirection(0,this.goal.anim.direction)[0]*4,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]+transformDirection(0,this.goal.anim.direction)[1]*4),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]+transformDirection(0,this.goal.anim.direction)[0]*5,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]+transformDirection(0,this.goal.anim.direction)[1]*5)
                ]
            case 55: case 192:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-150)[0],this.tilePosition.y+transformDirection(0,-150)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-90)[0],this.tilePosition.y+transformDirection(0,-90)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-30)[0],this.tilePosition.y+transformDirection(0,-30)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,30)[0],this.tilePosition.y+transformDirection(0,30)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,90)[0],this.tilePosition.y+transformDirection(0,90)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,150)[0],this.tilePosition.y+transformDirection(0,150)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-150)[0]*2,this.tilePosition.y+transformDirection(0,-150)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-90)[0]*2,this.tilePosition.y+transformDirection(0,-90)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-30)[0]*2,this.tilePosition.y+transformDirection(0,-30)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,30)[0]*2,this.tilePosition.y+transformDirection(0,30)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,90)[0]*2,this.tilePosition.y+transformDirection(0,90)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,150)[0]*2,this.tilePosition.y+transformDirection(0,150)[1]*2)
                ]
            case 85: case 86:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]+transformDirection(0,this.goal.anim.direction+60)[1])
                ]
            case 127: case 150: case 181:
                return [this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*2)]
            case 131: case 195: case 205:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*3,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*4,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*4),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*5,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*5),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*6,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*6),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]*3,this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]*4,this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]*4),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]*5,this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]*5),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]*6,this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]*6),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]*3,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]*4,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]*4),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]*5,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]*5),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]*6,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]*6)
                ]
            case 137:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]+transformDirection(0,this.goal.anim.direction+60)[1])
                ]
            case 166:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-150)[0],this.tilePosition.y+transformDirection(0,-150)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-150)[0]*2,this.tilePosition.y+transformDirection(0,-150)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-90)[0],this.tilePosition.y+transformDirection(0,-90)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-90)[0]*2,this.tilePosition.y+transformDirection(0,-90)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-30)[0],this.tilePosition.y+transformDirection(0,-30)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-30)[0]*2,this.tilePosition.y+transformDirection(0,-30)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,30)[0],this.tilePosition.y+transformDirection(0,30)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,30)[0]*2,this.tilePosition.y+transformDirection(0,30)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,90)[0],this.tilePosition.y+transformDirection(0,90)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,90)[0]*2,this.tilePosition.y+transformDirection(0,90)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,150)[0],this.tilePosition.y+transformDirection(0,150)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,150)[0]*2,this.tilePosition.y+transformDirection(0,150)[1]*2)
                ]
            case 176:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-150)[0],this.tilePosition.y+transformDirection(0,-150)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-90)[0],this.tilePosition.y+transformDirection(0,-90)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-30)[0],this.tilePosition.y+transformDirection(0,-30)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,30)[0],this.tilePosition.y+transformDirection(0,30)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,90)[0],this.tilePosition.y+transformDirection(0,90)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,150)[0],this.tilePosition.y+transformDirection(0,150)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-150)[0]*2,this.tilePosition.y+transformDirection(0,-150)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-90)[0]*2,this.tilePosition.y+transformDirection(0,-90)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-30)[0]*2,this.tilePosition.y+transformDirection(0,-30)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,30)[0]*2,this.tilePosition.y+transformDirection(0,30)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,90)[0]*2,this.tilePosition.y+transformDirection(0,90)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,150)[0]*2,this.tilePosition.y+transformDirection(0,150)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-150)[0]+transformDirection(0,-90)[0],this.tilePosition.y+transformDirection(0,-150)[1]+transformDirection(0,-90)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-90)[0]+transformDirection(0,-30)[0],this.tilePosition.y+transformDirection(0,-90)[1]+transformDirection(0,-30)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-30)[0]+transformDirection(0,30)[0],this.tilePosition.y+transformDirection(0,-30)[1]+transformDirection(0,30)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,30)[0]+transformDirection(0,90)[0],this.tilePosition.y+transformDirection(0,30)[1]+transformDirection(0,90)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,90)[0]+transformDirection(0,150)[0],this.tilePosition.y+transformDirection(0,90)[1]+transformDirection(0,150)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,150)[0]+transformDirection(0,-150)[0],this.tilePosition.y+transformDirection(0,150)[1]+transformDirection(0,-150)[1])
                ]
            case 204:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-120)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction-120)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+120)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+120)[1])
                ]
            case 214:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*2)
                ]
            case 218:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-150)[0]+transformDirection(0,-90)[0],this.tilePosition.y+transformDirection(0,-150)[1]+transformDirection(0,-90)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-90)[0]+transformDirection(0,-30)[0],this.tilePosition.y+transformDirection(0,-90)[1]+transformDirection(0,-30)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-30)[0]+transformDirection(0,30)[0],this.tilePosition.y+transformDirection(0,-30)[1]+transformDirection(0,30)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,30)[0]+transformDirection(0,90)[0],this.tilePosition.y+transformDirection(0,30)[1]+transformDirection(0,90)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,90)[0]+transformDirection(0,150)[0],this.tilePosition.y+transformDirection(0,90)[1]+transformDirection(0,150)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,150)[0]+transformDirection(0,-150)[0],this.tilePosition.y+transformDirection(0,150)[1]+transformDirection(0,-150)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-150)[0]+transformDirection(0,-90)[0]*2,this.tilePosition.y+transformDirection(0,-150)[1]+transformDirection(0,-90)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-90)[0]+transformDirection(0,-30)[0]*2,this.tilePosition.y+transformDirection(0,-90)[1]+transformDirection(0,-30)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-30)[0]+transformDirection(0,30)[0]*2,this.tilePosition.y+transformDirection(0,-30)[1]+transformDirection(0,30)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,30)[0]+transformDirection(0,90)[0]*2,this.tilePosition.y+transformDirection(0,30)[1]+transformDirection(0,90)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,90)[0]+transformDirection(0,150)[0]*2,this.tilePosition.y+transformDirection(0,90)[1]+transformDirection(0,150)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,150)[0]+transformDirection(0,-150)[0]*2,this.tilePosition.y+transformDirection(0,150)[1]+transformDirection(0,-150)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-150)[0]*2+transformDirection(0,-90)[0],this.tilePosition.y+transformDirection(0,-150)[1]*2+transformDirection(0,-90)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-90)[0]*2+transformDirection(0,-30)[0],this.tilePosition.y+transformDirection(0,-90)[1]*2+transformDirection(0,-30)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-30)[0]*2+transformDirection(0,30)[0],this.tilePosition.y+transformDirection(0,-30)[1]*2+transformDirection(0,30)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,30)[0]*2+transformDirection(0,90)[0],this.tilePosition.y+transformDirection(0,30)[1]*2+transformDirection(0,90)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,90)[0]*2+transformDirection(0,150)[0],this.tilePosition.y+transformDirection(0,90)[1]*2+transformDirection(0,150)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,150)[0]*2+transformDirection(0,-150)[0],this.tilePosition.y+transformDirection(0,150)[1]*2+transformDirection(0,-150)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-150)[0]*2+transformDirection(0,-90)[0]*2,this.tilePosition.y+transformDirection(0,-150)[1]*2+transformDirection(0,-90)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-90)[0]*2+transformDirection(0,-30)[0]*2,this.tilePosition.y+transformDirection(0,-90)[1]*2+transformDirection(0,-30)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-30)[0]*2+transformDirection(0,30)[0]*2,this.tilePosition.y+transformDirection(0,-30)[1]*2+transformDirection(0,30)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,30)[0]*2+transformDirection(0,90)[0]*2,this.tilePosition.y+transformDirection(0,30)[1]*2+transformDirection(0,90)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,90)[0]*2+transformDirection(0,150)[0]*2,this.tilePosition.y+transformDirection(0,90)[1]*2+transformDirection(0,150)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,150)[0]*2+transformDirection(0,-150)[0]*2,this.tilePosition.y+transformDirection(0,150)[1]*2+transformDirection(0,-150)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-150)[0]*2+transformDirection(0,-90)[0]*3,this.tilePosition.y+transformDirection(0,-150)[1]*2+transformDirection(0,-90)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-90)[0]*2+transformDirection(0,-30)[0]*3,this.tilePosition.y+transformDirection(0,-90)[1]*2+transformDirection(0,-30)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-30)[0]*2+transformDirection(0,30)[0]*3,this.tilePosition.y+transformDirection(0,-30)[1]*2+transformDirection(0,30)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,30)[0]*2+transformDirection(0,90)[0]*3,this.tilePosition.y+transformDirection(0,30)[1]*2+transformDirection(0,90)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,90)[0]*2+transformDirection(0,150)[0]*3,this.tilePosition.y+transformDirection(0,90)[1]*2+transformDirection(0,150)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,150)[0]*2+transformDirection(0,-150)[0]*3,this.tilePosition.y+transformDirection(0,150)[1]*2+transformDirection(0,-150)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-150)[0]*3+transformDirection(0,-90)[0]*2,this.tilePosition.y+transformDirection(0,-150)[1]*3+transformDirection(0,-90)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-90)[0]*3+transformDirection(0,-30)[0]*2,this.tilePosition.y+transformDirection(0,-90)[1]*3+transformDirection(0,-30)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-30)[0]*3+transformDirection(0,30)[0]*2,this.tilePosition.y+transformDirection(0,-30)[1]*3+transformDirection(0,30)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,30)[0]*3+transformDirection(0,90)[0]*2,this.tilePosition.y+transformDirection(0,30)[1]*3+transformDirection(0,90)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,90)[0]*3+transformDirection(0,150)[0]*2,this.tilePosition.y+transformDirection(0,90)[1]*3+transformDirection(0,150)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,150)[0]*3+transformDirection(0,-150)[0]*2,this.tilePosition.y+transformDirection(0,150)[1]*3+transformDirection(0,-150)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-150)[0]*3+transformDirection(0,-90)[0]*3,this.tilePosition.y+transformDirection(0,-150)[1]*3+transformDirection(0,-90)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-90)[0]*3+transformDirection(0,-30)[0]*3,this.tilePosition.y+transformDirection(0,-90)[1]*3+transformDirection(0,-30)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-30)[0]*3+transformDirection(0,30)[0]*3,this.tilePosition.y+transformDirection(0,-30)[1]*3+transformDirection(0,30)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,30)[0]*3+transformDirection(0,90)[0]*3,this.tilePosition.y+transformDirection(0,30)[1]*3+transformDirection(0,90)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,90)[0]*3+transformDirection(0,150)[0]*3,this.tilePosition.y+transformDirection(0,90)[1]*3+transformDirection(0,150)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,150)[0]*3+transformDirection(0,-150)[0]*3,this.tilePosition.y+transformDirection(0,150)[1]*3+transformDirection(0,-150)[1]*3)
                ]
            case 219:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-150)[0],this.tilePosition.y+transformDirection(0,-150)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-150)[0]*2,this.tilePosition.y+transformDirection(0,-150)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-150)[0]*3,this.tilePosition.y+transformDirection(0,-150)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-150)[0]*4,this.tilePosition.y+transformDirection(0,-150)[1]*4),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-150)[0]*5,this.tilePosition.y+transformDirection(0,-150)[1]*5),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-150)[0]*6,this.tilePosition.y+transformDirection(0,-150)[1]*6),

                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-90)[0],this.tilePosition.y+transformDirection(0,-90)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-90)[0]*2,this.tilePosition.y+transformDirection(0,-90)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-90)[0]*3,this.tilePosition.y+transformDirection(0,-90)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-90)[0]*4,this.tilePosition.y+transformDirection(0,-90)[1]*4),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-90)[0]*5,this.tilePosition.y+transformDirection(0,-90)[1]*5),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-90)[0]*6,this.tilePosition.y+transformDirection(0,-90)[1]*6),

                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-30)[0],this.tilePosition.y+transformDirection(0,-30)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-30)[0]*2,this.tilePosition.y+transformDirection(0,-30)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-30)[0]*3,this.tilePosition.y+transformDirection(0,-30)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-30)[0]*4,this.tilePosition.y+transformDirection(0,-30)[1]*4),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-30)[0]*5,this.tilePosition.y+transformDirection(0,-30)[1]*5),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-30)[0]*6,this.tilePosition.y+transformDirection(0,-30)[1]*6),

                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,30)[0],this.tilePosition.y+transformDirection(0,30)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,30)[0]*2,this.tilePosition.y+transformDirection(0,30)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,30)[0]*3,this.tilePosition.y+transformDirection(0,30)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,30)[0]*4,this.tilePosition.y+transformDirection(0,30)[1]*4),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,30)[0]*5,this.tilePosition.y+transformDirection(0,30)[1]*5),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,30)[0]*6,this.tilePosition.y+transformDirection(0,30)[1]*6),

                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,90)[0],this.tilePosition.y+transformDirection(0,90)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,90)[0]*2,this.tilePosition.y+transformDirection(0,90)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,90)[0]*3,this.tilePosition.y+transformDirection(0,90)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,90)[0]*4,this.tilePosition.y+transformDirection(0,90)[1]*4),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,90)[0]*5,this.tilePosition.y+transformDirection(0,90)[1]*5),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,90)[0]*6,this.tilePosition.y+transformDirection(0,90)[1]*6),

                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,150)[0],this.tilePosition.y+transformDirection(0,150)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,150)[0]*2,this.tilePosition.y+transformDirection(0,150)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,150)[0]*3,this.tilePosition.y+transformDirection(0,150)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,150)[0]*4,this.tilePosition.y+transformDirection(0,150)[1]*4),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,150)[0]*5,this.tilePosition.y+transformDirection(0,150)[1]*5),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,150)[0]*6,this.tilePosition.y+transformDirection(0,150)[1]*6)
                ]
            case 221:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]+transformDirection(0,this.goal.anim.direction+60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*3,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*3)
                ]
            case 222:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]+transformDirection(0,this.goal.anim.direction+60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*3,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]*3,this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]*3,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]+transformDirection(0,this.goal.anim.direction-60)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]+transformDirection(0,this.goal.anim.direction-60)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]+transformDirection(0,this.goal.anim.direction+60)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]+transformDirection(0,this.goal.anim.direction+60)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*2+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*2+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0]*2+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1]*2+transformDirection(0,this.goal.anim.direction+60)[1])
                ]
            default: return []               
        }
    }
    setIntent(type){
        switch(type){
            case 0:
                if(this.battle.modded(41)){
                    this.intent=(this.battle.turn.total-1)%this.attack.length
                }else{
                    switch(this.behavior){
                        case 0:
                            this.intent=(this.battle.turn.total-1)%this.attack.length
                        break
                        case 1:
                            this.intent=floor(random(0,this.attack.length))
                        break
                        case 2:
                            this.intent=floor(random(0,this.attack.length-0.5))
                        break
                        case 3:
                            this.intent=this.battle.turn.total<=3?this.attack.length-1:floor(random(0,this.attack.length-1))
                        break
                        case 4:
                            this.intent=this.battle.turn.total<=3?this.attack.length-1:(this.battle.turn.total-4)%this.attack.length
                        break
                        case 5:
                            this.intent=(this.battle.turn.total+this.id)%this.attack.length
                        break
                        case 6:
                            let value=(this.battle.turn.total-1)%(this.attack.length*2-2)
                            this.intent=value==0?0:value==this.attack.length*2-3?this.attack.length-1:(value-1)%(this.attack.length-2)+1
                        break
                        case 7:
                            this.intent=floor(random(0,this.attack.length))
                            if(this.intent==0&&this.status.main[42]<=0){
                                this.intent=floor(random(0,this.attack.length))
                            }
                        break
                        case 8:
                            this.intent=this.battle.turn.total<=1?this.attack.length-1:(this.battle.turn.total-2)%(this.attack.length-1)
                        break
                        case 9:
                            this.intent=this.battle.turn.total<=1?this.attack.length-1:(this.battle.turn.total-2)%this.attack.length
                        break
                        case 10:
                            this.intent=this.battle.turn.total<=1?this.attack.length-1:floor(random(0,this.attack.length-1))
                        break
                        case 11:
                            this.intent=this.battle.turn.total%3==1?this.attack.length-1:(floor(this.battle.turn.total*2/3)+this.attack.length-2)%(this.attack.length-1)
                        break
                        case 12:
                            this.intent=this.battle.turn.total<=3?this.attack.length-1:floor(random(0,this.attack.length))
                        break
                        case 13:
                            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                                if(this.battle.combatantManager.combatants[a].name==this.name&&this.battle.combatantManager.combatants[a].life<=0&&!this.battle.combatantManager.combatants[a].respawn){
                                    this.progress++
                                }
                            }
                            if(this.progress>=4&&floor(random(0,2))==0){
                                this.intent=this.attack.length-1
                                this.progress=0
                            }else{
                                this.intent=floor(random(0,this.attack.length-1))
                            }
                        break
                    }
                }
            break
        }
    }
    randomIntent(){
        this.intent=floor(random(0,this.attack.length))
    }
    convertTile(target){
        let targetTile=[]
        for(let a=0,la=target.length;a<la;a++){
            targetTile.push(target[a]==-1||(this.status.main[208]>0&&distTargetCombatant(0,this.battle.tileManager.tiles[target[a]],this)>1)?{tilePosition:{x:-1,y:-1}}:this.battle.tileManager.tiles[target[a]])
        }
        return targetTile
    }
    pareidolia(){
        if(this.battle.initialized&&this.team==0&&!this.spec.includes(2)){
            this.battle.combatantManager.summonCombatant(this.tilePosition,this.type,this.direction)
            this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].life=1
            this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].base.life=1
            this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].collect.life=1
        }
    }
    anotherDead(){
        if(this.status.main[103]>0){
            this.heal(this.status.main[103])
        }
    }
    playCard(){
        if(this.spec.includes(8)){
            this.battle.turnManager.loadEnemyAttackRepeat(this.id)
        }
    }
    playCardFront(){
        if(this.status.main[77]>0){
            this.takeDamage(this.status.main[77],-1)
        }
        if(this.status.main[96]>0){
            this.takeDamage(this.status.main[96],-1)
        }
    }
    autoAim(){
        let list=[]
        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
            if(legalTargetCombatant(0,1,6,this,this.battle.combatantManager.combatants[a],this.battle.tileManager.tiles)&&this.battle.combatantManager.combatants[a].team!=this.team&!(this.construct&&this.battle.combatantManager.combatants[a].team>0)&&this.battle.combatantManager.combatants[a].life>0){
                list.push(a)
            }
        }
        if(list.length>0){
            let position=this.battle.combatantManager.combatants[list[floor(random(0,list.length))]].relativePosition
            this.goal.anim.direction=round(atan2(position.x-this.relativePosition.x,position.y-this.relativePosition.y)/60-1/2)*60+30
            this.activated=true
        }
    }
    activate(type,id){
        if(this.life>0&&!this.moved){
            if(this.spec.includes(0)&&(id==this.target||this.spec.includes(2)&&id<this.battle.players)&&type==1&&this.battle.turn.main<this.battle.players){
                this.target=id
                this.battle.turnManager.loadEnemyRotate(this.id)
            }
            if(this.spec.includes(1)&&(id==this.target||this.spec.includes(2)&&id<this.battle.players)&&type==1&&this.battle.turn.main<this.battle.players){
                this.target=id
                this.battle.turnManager.loadEnemyMoveBack(this.id)
                this.battle.turnManager.loadEnemyRotateBack(this.id)
            }
            if(this.spec.includes(7)&&(id==this.target||this.spec.includes(2)&&id<this.battle.players)&&type==1&&this.battle.turn.main<this.battle.players&&!this.aggressor){
                this.target=id
                this.battle.turnManager.loadEnemyAttackRepeat(this.id)
                this.aggressor=true
            }
            let target=this.getTarget()
            this.targetTile=this.convertTile(target)
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].team!=this.team&&type==0||this.battle.combatantManager.combatants[a].id==id&&(type==1||type==2)){
                    switch(this.attack[this.intent].type){
                        case 1: case 2: case 3: case 11: case 13: case 22: case 23: case 31: case 34: case 35:
                        case 36: case 37: case 97: case 101: case 103: case 113: case 116: case 121: case 122: case 209:
                        case 212: case 229: case 242: case 246: case 247:
                            if(this.battle.modded(57)){
                                for(let b=0,lb=this.targetTile.length;b<lb;b++){
                                    if(
                                        this.battle.combatantManager.combatants[a].tilePosition.x==this.targetTile[b].tilePosition.x&&
                                        this.battle.combatantManager.combatants[a].tilePosition.y==this.targetTile[b].tilePosition.y&&
                                        !(b>=1&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))){
                                            this.activated=true
                                    }
                                }
                            }else if(
                                this.battle.combatantManager.combatants[a].tilePosition.x==this.targetTile[0].tilePosition.x&&
                                this.battle.combatantManager.combatants[a].tilePosition.y==this.targetTile[0].tilePosition.y){
                                    this.activated=true
                            }
                        break
                        case 6: case 7: case 8: case 14: case 15: case 19: case 20: case 24: case 27: case 30:
                        case 32: case 33: case 61: case 62: case 66: case 67: case 76: case 77: case 96: case 99:
                        case 107: case 112: case 137: case 138: case 139: case 149: case 156: case 183: case 203: case 211:
                        case 223: case 224: case 248:
                            for(let b=0,lb=this.targetTile.length;b<lb;b++){
                                if(
                                    this.battle.combatantManager.combatants[a].tilePosition.x==this.targetTile[b].tilePosition.x&&
                                    this.battle.combatantManager.combatants[a].tilePosition.y==this.targetTile[b].tilePosition.y&&
                                    !(b>=1&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))){
                                        this.activated=true
                                }
                            }
                        break
                        case 71: case 73: case 79: case 143: case 172:
                            for(let b=0,lb=this.targetTile.length;b<lb;b++){
                                if(
                                    this.battle.combatantManager.combatants[a].tilePosition.x==this.targetTile[b].tilePosition.x&&
                                    this.battle.combatantManager.combatants[a].tilePosition.y==this.targetTile[b].tilePosition.y&&
                                    !(b>=1&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))&&
                                    !(b>=2&&(this.targetTile[1].tilePosition.x<0||this.targetTile[1].occupied>0))){
                                        this.activated=true
                                }
                            }
                        break
                        case 100:
                            for(let b=0,lb=this.targetTile.length;b<lb;b++){
                                if(
                                    this.battle.combatantManager.combatants[a].tilePosition.x==this.targetTile[b].tilePosition.x&&
                                    this.battle.combatantManager.combatants[a].tilePosition.y==this.targetTile[b].tilePosition.y&&
                                    !(b>=1&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))&&
                                    !(b>=2&&(this.targetTile[1].tilePosition.x<0||this.targetTile[1].occupied>0))&&
                                    !(b>=3&&(this.targetTile[2].tilePosition.x<0||this.targetTile[2].occupied>0))){
                                        this.activated=true
                                }
                            }
                        break
                        case 9: case 16: case 17: case 28: case 44: case 53: case 54: case 55: case 60: case 64:
                        case 69: case 82: case 84: case 85: case 86: case 87: case 95: case 104: case 105: case 114:
                        case 117: case 120: case 124: case 128: case 131: case 132: case 133: case 136: case 142: case 146:
                        case 147: case 153: case 157: case 168: case 171: case 174: case 175: case 176: case 192: case 195:
                        case 198: case 204: case 213: case 215: case 217: case 222:
                            for(let b=0,lb=this.targetTile.length;b<lb;b++){
                                if(
                                    this.battle.combatantManager.combatants[a].tilePosition.x==this.targetTile[b].tilePosition.x&&
                                    this.battle.combatantManager.combatants[a].tilePosition.y==this.targetTile[b].tilePosition.y){
                                        this.activated=true
                                }
                            }
                        break
                        case 12: case 38: case 45: case 47: case 50: case 59: case 80: case 81: case 83: case 89:
                        case 90: case 91: case 98: case 106: case 115: case 118: case 119: case 123: case 125: case 129:
                        case 130: case 134: case 140: case 141: case 144: case 145: case 148: case 151: case 152: case 158:
                        case 160: case 161: case 162: case 165: case 173: case 178: case 179: case 180: case 184: case 185:
                        case 188: case 191: case 193: case 194: case 196: case 199: case 200: case 201: case 202: case 206:
                        case 208: case 235: case 236: case 245:
                            for(let b=0,lb=this.targetTile.length;b<lb;b++){
                                if(
                                    this.battle.combatantManager.combatants[a].tilePosition.x==this.targetTile[b].tilePosition.x&&
                                    this.battle.combatantManager.combatants[a].tilePosition.y==this.targetTile[b].tilePosition.y&&
                                    !(b>=1&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))&&
                                    !(b>=2&&(this.targetTile[1].tilePosition.x<0||this.targetTile[1].occupied>0))&&
                                    !(b>=3&&(this.targetTile[2].tilePosition.x<0||this.targetTile[2].occupied>0))&&
                                    !(b>=4&&(this.targetTile[3].tilePosition.x<0||this.targetTile[3].occupied>0))&&
                                    !(b>=5&&(this.targetTile[4].tilePosition.x<0||this.targetTile[4].occupied>0))){
                                        this.activated=true
                                }
                            }
                        break
                        case 49: case 164: case 205: case 219:
                            for(let b=0,lb=this.targetTile.length;b<lb;b++){
                                if(
                                    this.battle.combatantManager.combatants[a].tilePosition.x==this.targetTile[b].tilePosition.x&&
                                    this.battle.combatantManager.combatants[a].tilePosition.y==this.targetTile[b].tilePosition.y&&
                                    !(b%6>=1&&(this.targetTile[floor(b/6)*6].tilePosition.x<0||this.targetTile[floor(b/6)*6].occupied>0))&&
                                    !(b%6>=2&&(this.targetTile[floor(b/6)*6+1].tilePosition.x<0||this.targetTile[floor(b/6)*6+1].occupied>0))&&
                                    !(b%6>=3&&(this.targetTile[floor(b/6)*6+2].tilePosition.x<0||this.targetTile[floor(b/6)*6+2].occupied>0))&&
                                    !(b%6>=4&&(this.targetTile[floor(b/6)*6+3].tilePosition.x<0||this.targetTile[floor(b/6)*6+3].occupied>0))&&
                                    !(b%6>=5&&(this.targetTile[floor(b/6)*6+4].tilePosition.x<0||this.targetTile[floor(b/6)*6+4].occupied>0))){
                                        this.activated=true
                                }
                            }
                        break
                        case 166:
                            for(let b=0,lb=this.targetTile.length;b<lb;b++){
                                if(
                                    this.battle.combatantManager.combatants[a].tilePosition.x==this.targetTile[b].tilePosition.x&&
                                    this.battle.combatantManager.combatants[a].tilePosition.y==this.targetTile[b].tilePosition.y&&
                                    !(b%2==1&&(this.targetTile[floor(b/2)*2].tilePosition.x<0||this.targetTile[floor(b/2)*2].occupied>0))){
                                        this.activated=true
                                }
                            }
                        break
                        case 214:
                            for(let b=0,lb=this.targetTile.length;b<lb;b++){
                                if(
                                    this.battle.combatantManager.combatants[a].tilePosition.x==this.targetTile[b].tilePosition.x&&
                                    this.battle.combatantManager.combatants[a].tilePosition.y==this.targetTile[b].tilePosition.y&&
                                    !(b==3&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))){
                                        this.activated=true
                                }
                            }
                        break
                        case 218:
                            for(let b=0,lb=this.targetTile.length;b<lb;b++){
                                if(
                                    this.battle.combatantManager.combatants[a].tilePosition.x==this.targetTile[b].tilePosition.x&&
                                    this.battle.combatantManager.combatants[a].tilePosition.y==this.targetTile[b].tilePosition.y&&
                                    !(b>=18&&(this.targetTile[b-18].tilePosition.x<0||this.targetTile[b-18].occupied>0))&&
                                    !(b>=36&&(this.targetTile[b-36].tilePosition.x<0||this.targetTile[b-36].occupied>0))){
                                            this.activated=true
                                }
                            }
                        break
                        case 221:
                            for(let b=0,lb=this.targetTile.length;b<lb;b++){
                                if(
                                    this.battle.combatantManager.combatants[a].tilePosition.x==this.targetTile[b].tilePosition.x&&
                                    this.battle.combatantManager.combatants[a].tilePosition.y==this.targetTile[b].tilePosition.y&&
                                    !(b>=3&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))&&
                                    !(b>=6&&(this.targetTile[3].tilePosition.x<0||this.targetTile[3].occupied>0))){
                                        this.activated=true
                                }
                            }
                        break
                    }
                }
            }
        }
    }
    deTarget(){
        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
            if((this.battle.combatantManager.combatants[a].team==0||this.battle.combatantManager.combatants[a].construct)&&this.battle.combatantManager.combatants[a].target==this.id){
                this.battle.combatantManager.setSpecificTarget(a)
            }
        }
    }
    markTarget(){
        if(this.life>0&&!this.moved&&this.status.main[32]<=0&&this.status.main[51]<=0){
            if(this.attack[this.intent].type==78){
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(legalTargetCombatant(2,1,6,this,this.battle.combatantManager.combatants[a],this.battle.tileManager.tiles)&&this.battle.combatantManager.combatants[a].name==this.name&&distTargetCombatant(0,this,this.battle.combatantManager.combatants[a])>1&&this.battle.combatantManager.combatants[a].life>0){
                        let direction=targetDirectionCombatant(0,this,this.battle.combatantManager.combatants[a])
                        for(let b=1,lb=distTargetCombatant(0,this,this.battle.combatantManager.combatants[a]);b<lb;b++){
                            let index=this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-direction*60+90)[0]*b,this.tilePosition.y+transformDirection(0,-direction*60+90)[1]*b)
                            if(index>=0){
                                this.battle.tileManager.tiles[index].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.battle.tileManager.tiles[index],this)))
                            }
                        }
                    }
                }
            }else{
                let target=this.getTarget()
                this.targetTile=this.convertTile(target)
                switch(this.attack[this.intent].type){
                    case 1: case 2: case 3: case 11: case 13: case 22: case 23: case 31: case 34: case 35:
                    case 36: case 37: case 97: case 101: case 103: case 113: case 116: case 121: case 122: case 127:
                    case 150: case 181: case 209: case 212: case 229: case 242: case 246: case 247:
                        if(this.battle.modded(57)){
                            for(let b=0,lb=this.targetTile.length;b<lb;b++){
                                if(
                                    this.targetTile[b].tilePosition.x>=0&&
                                    !(b>=1&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))){
                                        this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)))
                                }
                            }
                        }else if(this.targetTile[0].tilePosition.x>=0){
                            this.targetTile[0].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[0],this)))
                        }
                    break
                    case 6: case 7: case 14: case 15: case 19: case 20: case 24: case 27: case 30: case 32:
                    case 33: case 61: case 62: case 66: case 67: case 76: case 77: case 96: case 99: case 107:
                    case 112: case 137: case 138: case 139: case 149: case 156: case 183: case 203: case 211: case 223:
                    case 224: case 248:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b>=1&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))){
                                    this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)))
                            }
                        }
                    break
                    case 8:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b==1&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))){
                                    this.targetTile[b].target(this.activated?4:3,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)))
                            }
                        }
                    break
                    case 71: case 73: case 79: case 143: case 172:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b>=1&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))&&
                                !(b>=2&&(this.targetTile[1].tilePosition.x<0||this.targetTile[1].occupied>0))){
                                    this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)))
                            }
                        }
                    break
                    case 100:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b>=1&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))&&
                                !(b>=2&&(this.targetTile[1].tilePosition.x<0||this.targetTile[1].occupied>0))&&
                                !(b>=3&&(this.targetTile[2].tilePosition.x<0||this.targetTile[2].occupied>0))){
                                    this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)))
                            }
                        }
                    break
                    case 9: case 16: case 17: case 28: case 44: case 53: case 54: case 55: case 60: case 64:
                    case 69: case 82: case 84: case 85: case 86: case 87: case 95: case 104: case 114: case 117:
                    case 120: case 124: case 128: case 131: case 133: case 135: case 136: case 142: case 146: case 147:
                    case 153: case 154: case 157: case 168: case 171: case 175: case 176: case 192: case 198: case 204:
                    case 213: case 215: case 217: case 222:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(this.targetTile[b].tilePosition.x>=0){
                                this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)))
                            }
                        }
                    break
                    case 105: case 132:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(this.targetTile[b].tilePosition.x>=0){
                                this.targetTile[b].target(this.activated?4:3,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)))
                            }
                        }
                    break
                    case 12: case 38: case 45: case 47: case 50: case 59: case 80: case 81: case 83: case 89:
                    case 90: case 91: case 98: case 106: case 115: case 118: case 119: case 123: case 125: case 129:
                    case 130: case 134: case 140: case 141: case 144: case 145: case 148: case 151: case 152: case 158:
                    case 160: case 161: case 162: case 165: case 173: case 178: case 179: case 180: case 184: case 188:
                    case 191: case 193: case 194: case 196: case 199: case 200: case 201: case 202: case 206: case 208:
                    case 235: case 236: case 245:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b>=1&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))&&
                                !(b>=2&&(this.targetTile[1].tilePosition.x<0||this.targetTile[1].occupied>0))&&
                                !(b>=3&&(this.targetTile[2].tilePosition.x<0||this.targetTile[2].occupied>0))&&
                                !(b>=4&&(this.targetTile[3].tilePosition.x<0||this.targetTile[3].occupied>0))&&
                                !(b>=5&&(this.targetTile[4].tilePosition.x<0||this.targetTile[4].occupied>0))){
                                    this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)))
                            }
                        }
                    break
                    case 49: case 164: case 185: case 195: case 205: case 219:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b%6>=1&&(this.targetTile[floor(b/6)*6].tilePosition.x<0||this.targetTile[floor(b/6)*6].occupied>0))&&
                                !(b%6>=2&&(this.targetTile[floor(b/6)*6+1].tilePosition.x<0||this.targetTile[floor(b/6)*6+1].occupied>0))&&
                                !(b%6>=3&&(this.targetTile[floor(b/6)*6+2].tilePosition.x<0||this.targetTile[floor(b/6)*6+2].occupied>0))&&
                                !(b%6>=4&&(this.targetTile[floor(b/6)*6+3].tilePosition.x<0||this.targetTile[floor(b/6)*6+3].occupied>0))&&
                                !(b%6>=5&&(this.targetTile[floor(b/6)*6+4].tilePosition.x<0||this.targetTile[floor(b/6)*6+4].occupied>0))){
                                    this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)))
                            }
                        }
                    break
                    case 166:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b%2==1&&(this.targetTile[floor(b/2)*2].tilePosition.x<0||this.targetTile[floor(b/2)*2].occupied>0))){
                                    this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)))
                            }
                        }
                    break
                    case 214:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b==3&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))){
                                    this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)))
                            }
                        }
                    break
                    case 218:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b>=18&&(this.targetTile[b-18].tilePosition.x<0||this.targetTile[b-18].occupied>0))&&
                                !(b>=36&&(this.targetTile[b-36].tilePosition.x<0||this.targetTile[b-36].occupied>0))){
                                    this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)))
                            }
                        }
                    break
                    case 221:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b>=3&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))&&
                                !(b>=6&&(this.targetTile[3].tilePosition.x<0||this.targetTile[3].occupied>0))){
                                    this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)))
                            }
                        }
                    break
                }
            }
        }
    }
    revive(){
        if(this.dead){
            this.dead=false
            this.fade=1
            this.startAnimation(0)
            this.runAnimation(0,0)
            this.goal.anim.sword=true
            for(let g=0;g<2;g++){
                this.anim.eye[g]=0
            }
            this.offset.position.y=0
        }
    }
    doubleHalf(){
        this.base.life/=2
        this.life=this.base.life
        for(let a=0,la=this.attack.length;a<la;a++){
            for(let b=0,lb=this.attack[a].effect.length;b<lb;b++){
                this.attack[a].effect[b]*=2
            }
        }
    }
    safeDamage(value){
        this.life=max(min(1,this.life),this.life-value)
    }
    orbTake(value,user,spec){
        this.takeDamage(value*(this.status.main[117]>0?2:1),user,spec)
    }
    lowRoll(){
        if(this.status.main[162]>0){
            this.statusEffect('Strength',this.status.main[162])
        }
        if(this.status.main[223]>0&&this.id<this.battle.players){
            this.battle.cardManagers[this.id].draw(this.status.main[223])
        }
    }
    takeDamage(value,user,spec=0){
        let damage=value
        if(value>0&&user>=0&&user<this.battle.combatantManager.combatants.length){
            let userCombatant=this.battle.combatantManager.combatants[user]
            let totalStr=0
            if(userCombatant.status.main[194]>0&&floor(random(0,2))==0){
                damage=0
                userCombatant.status.main[194]--
            }
            if(userCombatant.status.main[12]>0){
                damage+=userCombatant.status.main[12]
            }
            if(userCombatant.status.main[40]>0){
                damage+=userCombatant.status.main[40]
            }
            if(userCombatant.status.main[186]>0){
                damage+=userCombatant.status.main[186]
            }
            if(userCombatant.status.main[75]>0){
                damage-=userCombatant.status.main[75]
            }
            if(userCombatant.status.main[175]>0){
                damage-=userCombatant.status.main[175]
            }
            if(userCombatant.status.main[231]>0){
                damage+=userCombatant.status.main[231]
            }
            if(userCombatant.status.main[6]!=0){
                totalStr+=userCombatant.status.main[6]
            }
            if(userCombatant.status.main[17]!=0){
                totalStr+=userCombatant.status.main[17]
            }
            if(userCombatant.status.main[163]!=0){
                totalStr+=userCombatant.status.main[163]
            }
            if(userCombatant.status.main[195]!=0){
                totalStr+=userCombatant.status.main[195]
                userCombatant.status.main[195]=0
            }
            if(totalStr>0){
                damage*=1+totalStr*0.1
            }else if(totalStr<0){
                damage*=max(0.2,1+totalStr*0.1)
            }
            if(userCombatant.status.main[8]>0){
                damage*=0.75
            }
            if(this.block>0&&this.battle.relicManager.hasRelic(69,userCombatant.id)){
                damage+=4
            }
            if(userCombatant.status.main[49]>0){
                userCombatant.status.main[49]--
                if(userCombatant.status.main[204]<=0){
                    userCombatant.takeDamage(this.team>0?4:8,-1)
                }
            }
            if(userCombatant.status.main[119]>0&&(damage>4||userCombatant.status.main[204]>0&&damage>2)){
                userCombatant.status.main[119]--
                damage=userCombatant.status.main[204]>0?2:4
            }
            if(userCombatant.status.main[95]>0){
                userCombatant.heal(userCombatant.status.main[95])
            }
        }
        damage=round(damage*10)/10
        if(damage>0&&this.life>0){
            let hit=true
            if(user>=0&&user<this.battle.combatantManager.combatants.length){
                let userCombatant=this.battle.combatantManager.combatants[user]
                if(userCombatant.status.main[0]>0){
                    damage*=2
                }
                if(userCombatant.status.main[82]>0){
                    damage*=2
                }
                if(userCombatant.status.main[154]>0){
                    damage*=3
                }
                if(userCombatant.status.main[159]>0){
                    damage*=1.5
                }
                if(userCombatant.status.main[198]>0){
                    damage/=2
                }
                if(userCombatant.status.main[201]>0){
                    damage=damage*2-1
                }
                if(userCombatant.status.main[216]>0){
                    damage=damage*1.5+1
                }
                if(userCombatant.status.main[215]>0){
                    damage=0
                }
                if(this.status.main[3]>0){
                    this.status.main[3]--
                    hit=false
                    this.dodges.push({timer:0,direction:atan2(userCombatant.relativePosition.x-this.relativePosition.x,userCombatant.relativePosition.y-this.relativePosition.y)-90+180*floor(random(0,2))})
                }
                if(this.status.main[173]>0){
                    this.status.main[173]--
                    hit=false
                    this.infoAnim.upFlash[3]=true
                    userCombatant.takeDamage(damage)
                    damage=0
                }
                if(userCombatant.status.main[211]>0){
                    userCombatant.status.main[211]--
                    hit=false
                    this.infoAnim.upFlash[3]=true
                    userCombatant.takeDamage(damage)
                    damage=0
                }
                if(userCombatant.status.main[98]>0){
                    this.statusEffect('Bleed',userCombatant.status.main[98])
                }
                if(userCombatant.status.main[99]>0){
                    this.statusEffect('Bleed',userCombatant.status.main[99])
                    userCombatant.status.main[99]=0
                }
                if(userCombatant.status.main[100]>0){
                    this.statusEffect('Bleed',userCombatant.status.main[100])
                }
                if(userCombatant.status.main[171]>0){
                    this.statusEffect('Regeneration',userCombatant.status.main[171])
                }
                if(userCombatant.status.main[224]>0){
                    this.statusEffect('Regeneration',userCombatant.status.main[224])
                    userCombatant.status.main[224]=0
                }
                if(userCombatant.team==this.team&&this.team==0&&this.battle.modded(12)){
                    hit=false
                }
                if(userCombatant.team==0&&this.battle.modded(18)){
                    this.statusEffect('Bleed',1)
                }
                if(userCombatant.team==0&&this.battle.modded(34)){
                    if(floor(random(0,5))==0){
                        damage+=userCombatant.combo*2
                        userCombatant.combo=0
                    }else{
                        userCombatant.combo++
                    }
                }
            }
            if(this.status.main[21]>0){
                this.status.main[21]--
                hit=false
                this.infoAnim.upFlash[2]=true
            }
            if(this.status.main[210]>0&&this.battle.turn.main==this.id){
                hit=false
            }
            if(this.status.main[43]>0){
                this.statusEffect('Strength',this.status.main[43])
            }
            if(this.status.main[56]>0){
                this.statusEffect('Temporary Strength',this.status.main[56])
            }
            if(this.status.main[64]>0){
                this.statusEffect('Energy Next Turn',this.status.main[64])
            }
            if(this.status.main[183]>0){
                this.statusEffect('Dexterity',this.status.main[183])
            }
            if(this.status.main[184]>0){
                this.statusEffect('Temporary Strength',this.status.main[184])
            }
            if(this.status.main[177]>0){
                this.ammo+=this.status.main[177]
            }
            if(this.status.main[63]>0){
                damage+=this.status.main[63]
            }
            if(this.status.main[123]>0){
                damage*=2
                this.status.main[123]--
            }
            if(this.status.main[167]>0){
                damage*=2
            }
            if(this.status.main[178]>0){
                damage*=1+this.status.main[178]*0.25
                this.status.main[178]--
            }
            if(this.battle.relicManager.hasRelic(55,this.id)){
                damage=max(min(damage,1),damage-this.battle.relicManager.active[55])
            }
            if(this.battle.relicManager.hasRelic(56,this.id)&&damage>1&&damage<=5){
                damage=1
            }
            if(this.status.main[10]>0){
                damage*=1.5
            }
            if(this.status.main[24]>0){
                damage*=0.5
            }
            if(this.status.main[53]>0){
                damage*=0.333
            }
            if(this.status.main[57]>0){
                damage*=0.75
            }
            if(this.status.main[97]>0){
                damage*=0.6
            }
            if(this.status.main[165]>0){
                damage+=this.status.main[165]
                this.status.main[165]--
            }
            if(this.status.main[25]>0&&damage>1){
                damage=1
            }
            if(this.battle.turn.main<this.battle.players&&(this.team==0||this.construct||this.support)){
                if(this.battle.combatantManager.getPlayerCombatantIndex(this.battle.turn.main)>=0){
                    if(this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.battle.turn.main)].stance==1){
                        damage*=2
                    }
                }
            }
            if(this.battle.modded(2)&&this.team>0){
                damage*=1.2
            }
            if(this.battle.modded(16)&&this.team>0&&floor(random(0,4))==0){
                damage*=2
            }
            if(this.battle.modded(102)&&this.team==0&&damage>20){
                damage=20
            }
            if(this.battle.modded(103)&&this.team==0&&damage<5){
                damage=1
            }
            if(this.battle.modded(111)&&this.team>0){
                damage++
            }
            if(this.battle.modded(112)&&this.team>0&&damage<3){
                damage=3
            }
            if(this.battle.modded(119)&&this.team>0&&floor(random(0,4))==0){
                damage*=2
            }
            if(this.battle.modded(128)&&this.team==0&&this.spec.includes(2)){
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.battle.combatantManager.combatants[a].team==0&&!this.battle.combatantManager.combatants[a].spec.includes(2)){
                        damage=0
                    }
                }
            }
            if(this.stance==1){
                damage*=2
            }
            if(this.battle.turn.main<this.battle.players&&(this.team==0||this.construct||this.support)){
                if(this.battle.combatantManager.getPlayerCombatantIndex(this.battle.turn.main)>=0){
                    if(this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.battle.turn.main)].stance==4){
                        damage*=0.6
                    }
                }
            }
            if(this.stance==4){
                damage*=0.4
            }
            if(this.battle.turn.main<this.battle.players&&(this.team==0||this.construct||this.support)){
                if(this.battle.combatantManager.getPlayerCombatantIndex(this.battle.turn.main)>=0){
                    if(this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.battle.turn.main)].stance==5){
                        damage*=3
                    }
                }
            }
            if(this.status.main[48]>0){
                this.status.main[48]=0
            }
            if(this.status.main[51]>0){
                this.status.main[51]=0
                this.battle.updateTargetting()
                this.battle.tileManager.activate()
            }
            if(this.status.main[209]>0){
                this.status.main[209]=0
            }
            if(this.status.main[14]>0){
                this.status.main[14]--
            }
            if(this.status.main[217]>0){
                this.status.main[217]--
            }
            if(this.status.main[87]>0){
                for(let a=0,la=this.status.main[87];a<la;a++){
                    this.battle.cardManagers[this.id].hand.add(findName('Shiv',types.card),0,0)
                }
            }
            if(this.status.main[115]>0){
                for(let a=0,la=this.status.main[115];a<la;a++){
                    this.holdOrb(0)
                }
            }
            if(hit){
                if(this.battle.modded(40)&&this.id<this.battle.players){
                    this.battle.loseCurrency(5,this.id)
                }
                if(this.status.main[169]>0){
                    this.heal(damage)
                }else if(this.status.main[153]>0){
                    this.status.main[153]--
                    this.heal(damage)
                }else if(this.status.main[172]>0){
                    this.statusEffect('Block Next Turn',damage)
                }else if(this.status.main[174]>0){
                    this.battle.loseCurrency(damage*this.status.main[174],this.id)
                }else if(this.block>=damage&&spec!=2){
                    this.block-=damage
                    this.infoAnim.upFlash[1]=true
                    this.blocked=0
                    this.taken=0
                    if(this.id<this.battle.players){
                        this.battle.stats.taken[this.id][1]+=damage
                    }
                    if(this.block<=0&&0<=user&&user<this.battle.players){
                        if(this.battle.relicManager.hasRelic(124,user)){
                            this.statusEffect('Vulnerable',2)
                        }
                    }
                }else if(this.block>0&&spec!=2){
                    let damageLeft=damage-this.block
                    this.taken=damageLeft
                    if(this.id<this.battle.players){
                        this.battle.stats.taken[this.id][1]+=this.block
                        this.battle.stats.taken[this.id][2]+=damageLeft
                    }
                    this.block=0
                    this.life-=damageLeft
                    this.infoAnim.upFlash[0]=true
                    this.battle.relicManager.activate(6,[this.id])
                    this.blocked=1
                }else{
                    this.life-=damage
                    this.taken=damage
                    this.infoAnim.upFlash[0]=true
                    this.battle.relicManager.activate(6,[this.id])
                    this.blocked=2
                    if(this.id<this.battle.players){
                        this.battle.stats.taken[this.id][2]+=damage
                    }
                }
                if(this.id<this.battle.players){
                    this.battle.cardManagers[this.id].allGroupEffect(16)
                }
                this.compression+=damage
                this.battle.particleManager.createDamageNumber(this.position.x,this.position.y,damage)
                if(this.battle.turn.main<this.battle.players){
                    this.battle.stats.damage[this.battle.turn.main]+=damage
                    if(user>=0&&user<this.battle.combatantManager.combatants.length){
                        let userCombatant=this.battle.combatantManager.combatants[user]
                        userCombatant.combo+=1+userCombatant.status.main[68]
                    }
                }
                if(this.id<this.battle.players){
                    this.battle.stats.taken[this.id][0]+=damage
                }
                if(this.battle.modded(9)&&this.team>0&&this.team<=this.battle.players&&damage>10){
                    this.battle.drop(this.id,findName('Concussion',types.card),0,game.playerNumber+1)
                }
                if(user>=0&&user<this.battle.combatantManager.combatants.length&&spec==0){
                    let userCombatant=this.battle.combatantManager.combatants[user]
                    let distance=distTargetCombatant(0,this,userCombatant)
                    if(this.status.main[134]>0){
                        userCombatant.addBlock(this.status.main[134])
                    }
                    if(userCombatant.status.main[139]>0){
                        userCombatant.addBlock(damage)
                        userCombatant.status.main[139]--
                    }
                    if(userCombatant.status.main[202]>0&&damage>=20){
                        this.statusEffect('Miss',userCombatant.status.main[202])
                    }
                    if(userCombatant.status.main[170]>0&&userCombatant.id<this.battle.players){
                        this.battle.currency.money[userCombatant.id]+=damage
                    }
                    if(this.battle.modded(76)&&userCombatant.team==0){
                        userCombatant.heal(damage)
                    }
                    if(this.life>0){
                        if(this.battle.turnManager.turns.length==0){
                            if(this.status.main[1]>0&&distance<=1){
                                this.battle.turnManager.turns.push(new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turns[0].target=[user]
                                this.battle.turnManager.turns[0].auxiliary=true
                                this.battle.turnManager.turns.push(new turn(0,this.battle,1,[this.status.main[1]],this.id,false))
                            }
                            if(this.status.main[36]>0&&distance<=1){
                                this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].auxiliary=true
                                this.battle.turnManager.turnsBack.push(new turn(0,this.battle,1,[this.status.main[36]],this.id,false))
                            }
                            if(this.status.main[38]>0&&distance<=1){
                                this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turnsBack[0].target=[user]
                                this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].auxiliary=true
                                this.battle.turnManager.turnsBack.push(new turn(0,this.battle,3,[0],this.id,false))
                            }
                            if(this.status.main[39]>0&&distance<=1){
                                this.battle.turnManager.turns.push(new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turns[0].target=[user]
                                this.battle.turnManager.auxiliary=true
                                this.battle.turnManager.turns.push(new turn(0,this.battle,58,[this.status.main[39]],this.id,false))
                            }
                            if(this.status.main[47]>0&&distance<=1){
                                this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                this.battle.turnManager.auxiliary=true
                                this.battle.turnManager.turnsBack.push(new turn(0,this.battle,1,[this.status.main[47]],this.id,false))
                            }
                            if(this.status.main[73]>0&&distance<=2){
                                this.battle.turnManager.turns.push(new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turns[0].target=[user]
                                this.battle.turnManager.auxiliary=true
                                this.battle.turnManager.turns.push(new turn(0,this.battle,6,[this.status.main[73]],this.id,false))
                            }
                            if(this.status.main[92]>0&&distance<=1){
                                this.battle.turnManager.turns.push(new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turns[0].target=[user]
                                this.battle.turnManager.auxiliary=true
                                this.battle.turnManager.turns.push(new turn(0,this.battle,122,[0],this.id,false))
                            }
                            if(this.status.main[93]>0&&distance<=1){
                                this.battle.turnManager.turns.push(new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turns[0].target=[user]
                                this.battle.turnManager.auxiliary=true
                                this.battle.turnManager.turns.push(new turn(0,this.battle,121,[0],this.id,false))
                            }
                            if(this.status.main[94]>0&&distance<=1){
                                this.battle.turnManager.turns.push(new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turns[0].target=[user]
                                this.battle.turnManager.auxiliary=true
                                this.battle.turnManager.turns.push(new turn(0,this.battle,226,[this.status.main[94]],this.id,false))
                            }
                            if(this.status.main[102]>0&&distance<=1){
                                this.battle.turnManager.turns.push(new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turns[0].target=[user]
                                this.battle.turnManager.auxiliary=true
                                this.battle.turnManager.turns.push(new turn(0,this.battle,227,[this.status.main[102]],this.id,false))
                            }
                            if(this.status.main[106]>0&&distance<=1){
                                this.battle.turnManager.turns.push(new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turns[0].target=[user]
                                this.battle.turnManager.auxiliary=true
                                this.battle.turnManager.turns.push(new turn(0,this.battle,2,[this.status.main[106]],this.id,false))
                            }
                            if(this.status.main[147]>0&&distance<=1){
                                this.battle.turnManager.turns.push(new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turns[0].target=[user]
                                this.battle.turnManager.auxiliary=true
                                this.battle.turnManager.turns.push(new turn(0,this.battle,242,[this.status.main[147]],this.id,false))
                            }
                            if(this.status.main[206]>0&&distance<=1){
                                this.battle.turnManager.turns.push(new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turns[0].target=[user]
                                this.battle.turnManager.auxiliary=true
                                this.battle.turnManager.turns.push(new turn(0,this.battle,246,[this.status.main[206]],this.id,false))
                            }
                        }else{
                            if(this.status.main[1]>0&&distance<=1){
                                this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turns[1].target=[user]
                                this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,1,[this.status.main[1]],this.id,false))
                            }
                            if(this.status.main[36]>0&&distance<=1){
                                this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                this.battle.turnManager.turnsBack.push(new turn(0,this.battle,1,[this.status.main[36]],this.id,false))
                            }
                            if(this.status.main[38]>0&&distance<=1){
                                this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turns[1].target=[user]
                                this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,3,[0],this.id,false))
                            }
                            if(this.status.main[39]>0&&distance<=1){
                                this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turns[1].target=[user]
                                this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,58,[this.status.main[39]],this.id,false))
                            }
                            if(this.status.main[47]>0&&distance<=1){
                                this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                this.battle.turnManager.turnsBack.push(new turn(0,this.battle,1,[this.status.main[47]],this.id,false))
                            }
                            if(this.status.main[73]>0&&distance<=2){
                                this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turns[1].target=[user]
                                this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,6,[this.status.main[73]],this.id,false))
                            }
                            if(this.status.main[92]>0&&distance<=1){
                                this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turns[1].target=[user]
                                this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,122,[0],this.id,false))
                            }
                            if(this.status.main[93]>0&&distance<=1){
                                this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turns[1].target=[user]
                                this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,121,[0],this.id,false))
                            }
                            if(this.status.main[94]>0&&distance<=1){
                                this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turns[1].target=[user]
                                this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,226,[this.status.main[94]],this.id,false))
                            }
                            if(this.status.main[102]>0&&distance<=1){
                                this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turns[1].target=[user]
                                this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,227,[this.status.main[102]],this.id,false))
                            }
                            if(this.status.main[106]>0&&distance<=1){
                                this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turns[1].target=[user]
                                this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,2,[this.status.main[106]],this.id,false))
                            }
                            if(this.status.main[147]>0&&distance<=1){
                                this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turns[1].target=[user]
                                this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,242,[this.status.main[147]],this.id,false))
                            }
                            if(this.status.main[206]>0&&distance<=1){
                                this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                this.battle.turnManager.turns[1].target=[user]
                                this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,246,[this.status.main[206]],this.id,false))
                            }
                        }
                        if(this.battle.relicManager.hasRelic(61,this.id)){
                            userCombatant.takeDamage(3*this.battle.relicManager.active[61],-1)
                        }
                        if(this.blocked>0&&this.battle.relicManager.hasRelic(74,this.id)){
                            userCombatant.statusEffect('Weak Next Turn',this.battle.relicManager.active[74])
                        }
                        if(this.blocked==0&&this.battle.relicManager.hasRelic(75,this.id)){
                            userCombatant.statusEffect('Weak Next Turn',this.battle.relicManager.active[75])
                        }
                        if(this.status.main[26]>0){
                            userCombatant.takeDamage(this.status.main[26],-1)
                        }
                        if(this.status.main[78]>0){
                            userCombatant.takeDamage(this.status.main[78],-1)
                        }
                        if(this.status.main[122]>0){
                            userCombatant.statusEffect('Bleed',this.status.main[122])
                        }
                        if(this.status.main[176]>0){
                            userCombatant.statusEffect('Damage Down',this.status.main[176])
                        }
                        if(this.status.main[205]>0){
                            userCombatant.statusEffectNext('Weak',this.status.main[205])
                        }
                        if(this.status.main[50]>0){
                            this.addBlock(this.status.main[50])
                            this.status.main[50]=0
                        }
                        if(this.status.main[108]>0){
                            this.addBlock(this.status.main[108])
                        }
                    }
                    if(this.status.main[44]>0&&this.life<=0){
                        userCombatant.statusEffect('Weak',this.status.main[44])
                    }
                    if(this.status.main[45]>0&&this.life<=0){
                        userCombatant.statusEffect('Vulnerable',this.status.main[45])
                    }
                }
                if(this.status.main[213]>0&&this.life<=0){
                    this.status.main[213]--
                    this.life=1
                }
                if(this.spec.includes(16)&&this.life<=0&&user>=0&&user<this.battle.players){
                    for(let a=0,la=this.battle.players;a<la;a++){
                        this.battle.overlayManager.overlays[25][a].active=true
                        this.battle.overlayManager.overlays[25][a].activate([0,[{type:0,value:[5]}]])
                    }
                }
            }
        }
        if(this.spec.includes(6)&&this.life<=this.threshold){
            this.threshold-=20
            this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Slime',types.combatant),this.goal.anim.direction)
        }
        if(this.spec.includes(10)&&this.battle.turn.main<this.battle.players&&!this.aggressor){
            this.battle.turnManager.loadEnemyAttackRepeatBack(this.id)
            this.aggressor=true
        }
    }
    addBlock(value){
        if(value>0&&this.status.main[16]<=0){
            let block=value
            let totalDex=0
            if(this.status.main[168]>0){
                block+=this.status.main[168]
            }
            if(this.status.main[185]>0){
                block+=this.status.main[185]
            }
            if(this.status.main[187]>0){
                block-=this.status.main[187]
            }
            if(this.status.main[7]!=0){
                totalDex+=this.status.main[7]
            }
            if(this.status.main[18]!=0){
                totalDex+=this.status.main[18]
            }
            if(totalDex>0){
                block*=1+totalDex*0.2
            }else if(totalDex<0){
                block*=max(0.2,1+totalDex*0.1)
            }
            if(this.status.main[9]>0){
                block*=0.75
            }
            if(this.status.main[65]>0){
                block*=2
                this.status.main[65]--
            }
            if(this.status.main[138]>0){
                block*=3
                this.status.main[138]--
            }
            if(this.status.main[160]>0){
                block*=1.5
                this.status.main[160]--
            }
            block=round(block*10)/10
            if(this.status.main[70]>0){
                this.combo+=this.status.main[70]
            }
            if(this.status.main[140]>0){
                for(let a=0,la=this.status.main[140];a<la;a++){
                    this.battle.cardManagers[this.id].hand.add(findName('Spark',types.card),0,0)
                }
            }
            if(this.status.main[141]>0){
                for(let a=0,la=this.status.main[141];a<la;a++){
                    this.battle.cardManagers[this.id].hand.add(findName('Spark',types.card),1,0)
                }
            }
            if(this.battle.modded(140)&&this.team==0){
                block*=2
            }
            if(block>=0){
                this.lastBlock=block
                if(this.battle.modded(74)&&this.team==0){
                    this.heal(block)
                }else{
                    this.block+=block
                }
                if(this.id<this.battle.players){
                    this.battle.stats.block[this.id]+=block
                }
            }
        }
    }
    endBlock(){
        if(this.status.main[11]>0){
            this.status.main[11]--
        }else if(!(this.team==0&&this.battle.modded(26))){
            this.block=this.battle.relicManager.hasRelic(26,this.id)?max(0,this.block-10):0
        }
    }
    moveTile(direction,speed){
        this.position.x+=sin(direction)*speed
        this.position.y+=cos(direction)*speed
        this.battle.combatantManager.sort()
    }
    moveRelativeTile(direction,speed){
        this.relativePosition.x+=lsin(direction)*speed
        this.relativePosition.y+=lcos(direction)*speed
    }
    moveTilePosition(preX,preY){
        let x=round(preX)
        let y=round(preY)
        if(this.id<this.battle.players){
            let distance=max(0,max(distTarget(0,x-this.tilePosition.x,y-this.tilePosition.y),distTargetDiagonal(0,x-this.tilePosition.x,y-this.tilePosition.y)))
            this.battle.stats.move[this.id]+=distance
            if(this.battle.relicManager.hasRelic(100,this.id)){
                this.addBlock(2*distance*this.battle.relicManager.active[100])
            }
        }
        this.tilePosition.x=x
        this.tilePosition.y=y
        if(this.spec.includes(5)){
            let tile=this.battle.tileManager.getTileIndex(this.tilePosition.x,this.tilePosition.y)
            if(tile>=0){
                this.battle.tileManager.tiles[tile].addType(6)
            }
        }
        if(this.battle.modded(89)&&this.team>0){
            this.statusEffect('Poison',1)
        }
        this.takeDamage(this.status.main[191]*(this.status.main[204]>0?2:1),-1)
        this.statusEffect('Jinx',this.status.main[221])
    }
    getOrbNumber(type){
        let count=0
        for(let a=0,la=this.orbs.length;a<la;a++){
            if(this.orbs[a]==type||type==-1&&this.orbs[a]>=0){
                count++
            }
        }
        return count
    }
    checkAnyOrb(){
        this.anyOrb=false
        for(let a=0,la=this.orbs.length;a<la;a++){
            if(this.orbs[a]>=0){
                this.anyOrb=true
            }
        }
    }
    clearOrbs(){
        for(let a=0,la=this.orbs.length;a<la;a++){
            this.orbs[a]=-1
        }
        this.checkAnyOrb()
    }
    replaceOrb(start,end){
        for(let a=0,la=this.orbs.length;a<la;a++){
            if(this.orbs[a]==start){
                this.orbs[a]=end
            }
        }
        this.checkAnyOrb()
    }
    holdOrb(type){
        this.totalOrb++
        this.totalOrbClass[type]++
        this.lastOrb=type
        let success=false
        for(let a=0,la=this.orbs.length;a<la;a++){
            if(this.orbs[a]==-1){
                success=true
                this.orbs[a]=type
                if(type==4){
                    this.orbDetail[a]=6
                }
                a=la
            }
        }
        if(!success){
            this.evoke(0,this.id,[1])
            this.holdOrb(type)
        }
        this.checkAnyOrb()
    }
    subEvoke(type,detail,target){
        let multi=1
        if(this.status.main[111]>0){
            multi=1+this.status.main[111]*0.2
        }else if(this.status.main[111]<0){
            multi=max(0.2,1+this.status.main[111]*0.1)
        }
        let playerMulti=target==this.id?0.5:1
        switch(type){
            case 0:
                this.battle.combatantManager.combatants[target].orbTake(round(12*multi*playerMulti),-1)
            break
            case 1:
                this.battle.combatantManager.combatants[target].addBlock(round(16*multi))
            break
            case 2:
                if(target==this.id){
                    this.battle.combatantManager.damageAreaRulelessID(round(20*multi),this.id,this.battle.combatantManager.combatants[target].tilePosition)
                }else{
                    this.battle.combatantManager.damageAreaRuleless(round(20*multi),this.battle.combatantManager.combatants[target].tilePosition)
                }
            break
            case 3:
                this.battle.energy.main[target>=this.battle.players?this.id:target]+=round(3*multi)
            break
            case 4:
                this.battle.combatantManager.combatants[target].orbTake(round(detail*multi*playerMulti),-1)
            break
            case 5:
                this.battle.combatantManager.combatants[target].orbTake(round(8*multi*playerMulti),-1)
            break
            case 6:
                this.battle.cardManagers[target>=this.battle.players?this.id:target].draw(round(4*multi))
            break
            case 7:
                this.battle.combatantManager.combatants[target].statusEffect('Burn',3)
            break
            case 8:
                this.battle.combatantManager.combatants[target].statusEffect('Freeze',3)
            break
            case 9:
                this.battle.combatantManager.combatants[target].statusEffect('Strength',round(3*multi))
            break
            case 10:
                this.battle.combatantManager.combatants[target].statusEffect('Weak',round(3*multi))
            break
            case 11:
                this.battle.combatantManager.combatants[target].statusEffect('Poison',round(4*multi))
            break
        }
    }
    subMinorEvoke(type,detail,target){
        let multi=1
        if(this.status.main[111]>0){
            multi=1+this.status.main[111]*0.2
        }else if(this.status.main[111]<0){
            multi=max(0.2,1+this.status.main[111]*0.1)
        }
        switch(type){
            case 0:
                this.battle.combatantManager.combatants[target].orbTake(round(6*multi),-1)
            break
            case 1:
                this.battle.combatantManager.combatants[target].addBlock(round(8*multi))
            break
            case 2:
                this.battle.combatantManager.damageAreaRuleless(round(10*multi),this.battle.combatantManager.combatants[target].tilePosition)
            break
            case 3:
                this.battle.energy.main[target>=this.battle.players?this.id:target]+=round(2*multi)
            break
            case 4:
                this.battle.combatantManager.combatants[target].orbTake(round(detail*multi/2),-1)
            break
            case 5:
                this.battle.combatantManager.combatants[target].orbTake(round(4*multi),-1)
            break
            case 6:
                this.battle.cardManagers[target>=this.battle.players?this.id:target].draw(round(2*multi))
            break
            case 7:
                this.battle.combatantManager.combatants[target].statusEffect('Burn',2)
            break
            case 8:
                this.battle.combatantManager.combatants[target].statusEffect('Freeze',2)
            break
            case 9:
                this.battle.combatantManager.combatants[target].statusEffect('Strength',round(1.5*multi))
            break
            case 10:
                this.battle.combatantManager.combatants[target].statusEffect('Weak',round(1.5*multi))
            break
            case 11:
                this.battle.combatantManager.combatants[target].statusEffect('Poison',round(2*multi))
            break
        }
    }
    alternateEvoke(type,detail,target){
        let multi=1
        if(this.status.main[111]>0){
            multi=1+this.status.main[111]*0.2
        }else if(this.status.main[111]<0){
            multi=max(0.2,1+this.status.main[111]*0.1)
        }
        switch(type){
            case 1:
                this.battle.combatantManager.combatants[target].statusEffect('Buffer',round(2*multi))
            break
            case 2:
                this.battle.combatantManager.combatants[target].orbTake(round(50*multi),-1)
            break
            case 9:
                this.battle.combatantManager.combatants[target].statusEffect('Double Damage',round(4*multi))
            break
            case 10:
                this.battle.combatantManager.combatants[target].statusEffect('Strength',-round(3*multi))
            break
        }
    }
    evoke(type,target,args){
        switch(type){
            case 0:
                for(let a=0,la=args[0];a<la;a++){
                    this.subEvoke(this.orbs[0],this.orbDetail[0],target)
                }
                for(let a=0,la=this.orbs.length-1;a<la;a++){
                    this.orbs[a]=this.orbs[a+1]
                    this.orbDetail[a]=this.orbDetail[a+1]
                }
                this.orbs[this.orbs.length-1]=-1
                this.orbDetail[this.orbs.length-1]=-1
            break
            case 1:
                for(let a=0,la=this.orbs.length;a<la;a++){
                    if(this.orbs[a]>=0){
                        this.subEvoke(this.orbs[a],this.orbDetail[a],target)
                        this.orbs[a]=-1
                    }
                }
            break
            case 2:
                for(let a=0,la=this.orbs.length;a<la;a++){
                    if(this.orbs[a]>=0){
                        this.battle.energy.main[this.id]++
                        this.battle.cardManagers[this.id].draw(1)
                        this.orbs[a]=-1
                    }
                }
            break
            case 3:
                for(let a=0,la=this.orbs.length;a<la;a++){
                    if(this.orbs[a]>=0){
                        this.battle.energy.main[this.id]++
                        this.battle.cardManagers[this.id].draw(1)
                        this.subEvoke(this.orbs[a],this.orbDetail[a],target)
                        this.orbs[a]=-1
                    }
                }
            break
            case 4:
                let type=this.orbs[0]
                for(let a=0,la=args[0];a<la;a++){
                    this.subEvoke(this.orbs[0],this.orbDetail[0],target)
                }
                for(let a=0,la=this.orbs.length-1;a<la;a++){
                    this.orbs[a]=this.orbs[a+1]
                    this.orbDetail[a]=this.orbDetail[a+1]
                }
                for(let a=0,la=args[1];a<la;a++){
                    this.holdOrb(type)
                }
            break
            case 5:
                for(let a=0,la=this.orbs.length;a<la;a++){
                    if(this.orbs[a]>=0){
                        this.subMinorEvoke(this.orbs[a],this.orbDetail[a],target)
                    }
                }
            break
            case 6:
                for(let a=0,la=this.orbs.length;a<la;a++){
                    if(this.orbs[a]==args[0]){
                        this.alternateEvoke(this.orbs[a],this.orbDetail[a],target)
                        for(let b=0,lb=this.orbs.length-1;b<lb;b++){
                            this.orbs[b]=this.orbs[b+1]
                            this.orbDetail[b]=this.orbDetail[b+1]
                        }
                        this.orbs[this.orbs.length-1]=-1
                        this.orbDetail[this.orbs.length-1]=-1
                        a--
                    }
                }
            break
        }
        this.checkAnyOrb()
    }
    luckCheck(){
        if(this.status.main[200]>0){
            this.status.main[200]--
            return true
        }else{
            return false
        }
    }
    checkTile(){
        if(this.status.main[219]>0){
            this.status.main[219]--
            return true
        }else{
            return false
        }
    }
    enterStance(stance){
        this.leaveStance(this.stance)
        this.battle.cardManagers[this.id].discard.allEffect(28)
        this.battle.cardManagers[this.id].reserve.allEffect(28)
        this.stance=stance
        switch(stance){
            case 3:
                this.battle.cardManagers[this.id].hand.add(findName('Speed',types.card),0,0)
            break
            case 5:
                this.battle.energy.main[this.id]+=3
                this.battle.cardManagers[this.id].draw(3)
            break
        }
        if(this.status.main[126]>0){
            this.addBlock(this.status.main[126])
        }
        if(this.status.main[127]>0){
            this.battle.cardManagers[this.id].draw(this.status.main[127])
        }
    }
    leaveStance(stance){
        switch(stance){
            case 2:
                this.battle.energy.main[this.id]+=2
            break
        }
    }
    chargeConsumed(){
        if(this.status.main[150]>0){
            this.addBlock(this.status.main[150])
        }
    }
    clearStatus(){
        for(let a=0,la=this.status.main.length;a<la;a++){
            this.status.main[a]=0
        }
    }
    statusEffect(name,value){
        if(!(
            this.battle.relicManager.hasRelic(23,this.id)&&name=='Weak'||
            this.battle.relicManager.hasRelic(24,this.id)&&name=='Frail'||
            this.battle.relicManager.hasRelic(25,this.id)&&name=='Vulnerable')){
            let status=findList(name,this.status.name)
            if(status>=0){
                let mult=1
                if(this.status.name[status].includes('Counter')&&this.team==0&&this.battle.modded(19)){
                    mult*=2
                }
                if((this.status.class[status]==1||this.status.class[status]==3)&&this.team>0&&this.battle.modded(35)){
                    mult*=2
                }
                if((this.status.class[status]==0||this.status.class[status]==2)&&this.team==0&&this.battle.modded(36)){
                    mult*=2
                }
                if(this.status.main[15]>0&&((this.status.class[status]==1||this.status.class[status]==3)&&value>0||(this.status.class[status]==0||this.status.class[status]==2)&&value<0)){
                    this.status.main[15]--
                }else if(this.status.main[46]>0&&((this.status.class[status]==0||this.status.class[status]==2)&&value>0||(this.status.class[status]==1||this.status.class[status]==3)&&value<0)){
                    this.status.main[46]--
                }else{
                    this.status.main[status]+=value*mult
                }
            }
            if(status==32){
                this.battle.updateTargetting()
            }
            if(this.battle.turn.main>=0&&this.battle.turn.main<this.battle.players&&this.team!=this.battle.turn.main+1&&this.battle.turn.main<this.battle.combatantManager.combatants.length){
                let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.battle.turn.main)]
                if((this.status.class[status]==1||this.status.class[status]==3)&&userCombatant.getStatus('Debuff Damage')>0){
                    this.takeDamage(userCombatant.getStatus('Debuff Damage'),-1)
                }
            }
        }
    }
    statusEffectNext(name,value){
        if(!(
            this.battle.relicManager.hasRelic(23,this.id)&&name=='Weak'||
            this.battle.relicManager.hasRelic(24,this.id)&&name=='Frail'||
            this.battle.relicManager.hasRelic(25,this.id)&&name=='Vulnerable')){
            let status=findList(name,this.status.name)
            if(status>=0){
                if(this.status.main[15]>0&&((this.status.class[status]==1||this.status.class[status]==3)&&value>0||(this.status.class[status]==0||this.status.class[status]==2)&&value<0)){
                    this.status.main[15]--
                }else if(this.status.main[46]>0&&((this.status.class[status]==0||this.status.class[status]==2)&&value>0||(this.status.class[status]==1||this.status.class[status]==3)&&value<0)){
                    this.status.main[46]--
                }else{
                    this.status.next[status]+=value
                }
            }
            if(status==32){
                this.battle.updateTargetting()
            }
        }
    }
    multiplyStatus(name,multiplier){
        let status=findList(name,this.status.name)
        this.status.main[status]*=multiplier
    }
    reverseStatus(){
        for(let a=0,la=this.status.main.length;a<la;a++){
            this.status.main[a]*=-1
        }
    }
    deStatus(name,value){
        this.statusEffect(name,-value)
        let status=findList(name,this.status.name)
        if(status>=0){
            this.status.main[status]=max(0,this.status.main[status])
        }
    }
    getStatus(name){
        return this.status.main[findList(name,this.status.name)]
    }
    randomStatusInstant(effect,classes){
        let list=[]
        for(let a=0,la=this.status.class.length;a<la;a++){
            if(classes.includes(this.status.class[a])){
                list.push(a)
            }
        }
        if(list.length>0){
            this.statusEffect(this.status.name[list[floor(random(0,list.length))]],effect)
        }
    }
    randomStatus(effect,classes){
        let list=[]
        for(let a=0,la=this.status.class.length;a<la;a++){
            if(classes.includes(this.status.class[a])){
                list.push(a)
            }
        }
        if(list.length>0){
            this.statusEffectNext(this.status.name[list[floor(random(0,list.length))]],effect)
        }
    }
    removeRandomStatus(classes){
        let list=[]
        for(let a=0,la=this.status.class.length;a<la;a++){
            if(classes.includes(this.status.class[a])&&this.status.main[a]>0||!classes.includes(this.status.class[a])&&this.status.main[a]<0){
                list.push(a)
            }
        }
        if(list.length>0){
            this.status.main[list[floor(random(0,list.length))]]=0
        }
    }
    multiplyStatusClass(effect,classes){
        for(let a=0,la=this.status.class.length;a<la;a++){
            if(classes.includes(this.status.class[a])){
                this.status.main[a]*=effect
            }
        }
    }
    heal(amount){
        if(!this.battle.relicManager.hasRelic(163,this.id)&&amount>0&&this.life>0){
            let gain=amount
            if(this.battle.relicManager.hasRelic(53,this.id)){
                gain*=1.5
            }
            if(this.status.main[109]>0){
                this.gainMaxHP(1)
            }
            this.life=min(this.life+ceil(gain),this.base.life)
        }
    }
    healLifable(amount){
        if(!this.battle.relicManager.hasRelic(163,this.id)&&amount>0){
            let gain=amount
            if(this.battle.relicManager.hasRelic(53,this.id)){
                gain*=1.5
            }
            if(this.status.main[109]>0){
                this.gainMaxHP(1)
            }
            if(this.life<0){
                this.life=0
            }
            this.life=min(this.life+ceil(gain),this.base.life)
        }
    }
    gainMaxHP(amount){
        if(this.life>0){
            this.base.life+=amount
            this.life+=amount
        }
    }
    setMaxHP(amount){
        this.base.life=amount
        this.life=amount
    }
    loseMaxHP(amount){
        this.base.life=max(1,this.base.life-amount)
        this.life=min(this.life,this.base.life)
    }
    tick(){
        this.charge++
        for(let a=0,la=this.status.main.length;a<la;a++){
            if(this.status.main[a]!=0){
                switch(a){
                    case 4: this.battle.energy.main[this.id]+=this.status.main[a]; break
                    case 5: case 31: case 52: case 62: case 110: case 121: case 179: this.takeDamage(this.status.main[a],-1); break
                    case 13: case 14: case 19: case 217: this.addBlock(this.status.main[a]); break
                    case 20: this.status.main[findList('Weak',this.status.name)]+=this.status.main[a]; break
                    case 29: this.status.main[findList('Cannot Move',this.status.name)]+=this.status.main[a]; break
                    case 30: case 55: this.status.main[findList('Strength',this.status.name)]+=this.status.main[a]; break
                    case 33: case 209: this.heal(this.status.main[a]); break
                    case 34: case 146: this.status.main[findList('Dexterity',this.status.name)]+=this.status.main[a]; break
                    case 37: this.status.main[findList('Cannot Gain Block',this.status.name)]+=this.status.main[a]; break
                    case 41: case 84: if(this.id<this.battle.players){this.battle.cardManagers[this.id].tempDraw+=this.status.main[a]}; break
                    case 58: this.status.main[findList('Temporary Strength',this.status.name)]+=this.status.main[a]; break
                    case 66: for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].hand.add(findName('Shiv',types.card),0,0)} break
                    case 67: this.combo=0; break
                    case 71: case 72: this.combo+=this.status.main[a]; break
                    case 81: this.status.main[findList('Energy Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 83: this.status.main[findList('Double Damage Turn',this.status.name)]+=this.status.main[a]; break
                    case 85: if(this.id<this.battle.players){this.battle.cardManagers[this.id].hand.discard(this.status.main[a])}; break
                    case 86: case 128: this.life-=this.status.main[a]; break
                    case 88: this.status.main[findList('Intangible',this.status.name)]+=this.status.main[a]; break
                    case 89: this.status.main[findList('Block Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 107: if(this.armed){this.addBlock(this.status.main[a])} break
                    case 113: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].addRandomClass(2,0,4)}} break
                    case 116: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].addRandom(2,0,0)}} break
                    case 118: this.status.main[findList('Focus',this.status.name)]+=this.status.main[a]; break
                    case 120: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].hand.add(findName('Step',types.card),0,this.type)}} break
                    case 124: this.status.main[findList('Dodge',this.status.name)]+=this.status.main[a]; break
                    case 125: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].hand.add(findName('Smite',types.card),0,0)}} break
                    case 129: case 229: this.faith+=this.status.main[a]; break
                    case 130: if(this.id<this.battle.players){this.battle.cardManagers[this.id].hand.add(findName('Miracle',types.card),0,0)}; break
                    case 131: if(this.id<this.battle.players){this.battle.cardManagers[this.id].hand.add(findName('Miracle',types.card),1,0)}; break
                    case 132: this.enterStance(1); break
                    case 133: if(this.id<this.battle.players){this.battle.cardManagers[this.id].reserve.addShuffle(findName('Insight',types.card),0,0)}; break
                    case 135: this.battle.energy.main[this.id]+=this.status.main[a];this.battle.energy.gen[this.id]+=this.status.main[a]; break
                    case 142: this.charge+=this.status.main[a]; break
                    case 143: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].hand.add(findName('Burn',types.card),0,game.playerNumber+1)}} break
                    case 149: this.status.main[findList('No Amplify',this.status.name)]+=this.status.main[a]; break
                    case 155: this.status.main[findList('Charge Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 157: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].addRandomAllClass(2,0,2)}} break
                    case 158: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].addRandomAllClass(2,1,2)}} break
                    case 164: this.status.main[findList('Energy Next Turn Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 180: this.status.main[findList('Take Damage',this.status.name)]+=this.status.main[a]; break
                    case 181: this.status.main[findList('Take Damage Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 182: this.status.main[findList('Block Next Turn Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 189: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].hand.add(findName('Conviction',types.card),0,types.card[findName('Conviction',types.card)].list)}} break
                    case 197: if(floor(random(0,3))==0){this.takeDamage(this.status.main[a],-1); this.status.main[a]=0} break
                    case 203: this.heal(this.status.main[a]); break
                    case 207: this.status.main[findList('Temporary Dexterity',this.status.name)]+=this.status.main[a]; break
                    case 212: this.status.main[findList('Half Damage Turn',this.status.name)]+=this.status.main[a]; break
                    case 220: this.status.main[findList('Jinx',this.status.name)]+=this.status.main[a]; break
                    case 222: if(this.id<this.battle.players){this.battle.cardManagers[this.id].tempDrawBurn+=this.status.main[a]}; break

                }
                if(this.status.behavior[a]==1||this.status.behavior[a]==3&&this.team<=0){
                    if(this.status.main[a]>0){
                        this.status.main[a]--
                    }else if(this.status.main[a]<0){
                        this.status.main[a]++
                    }
                }else if(this.status.behavior[a]==2){
                    this.status.main[a]=0
                }
            }
        }
        for(let a=0,la=this.status.next.length;a<la;a++){
            if(this.status.next[a]!=0){
                this.status.main[a]+=this.status.next[a]
                this.status.next[a]=0
            }
        }
        if(this.stance==5){
            this.stance=0
        }
        if(this.battle.modded(28)&&this.team==0&&floor(random(0,4))==0){
            this.addBlock(20)
        }
        if(this.battle.modded(32)&&this.team==0){
            this.addBlock(3)
        }
        for(let a=0,la=this.orbs.length;a<la;a++){
            switch(this.orbs[a]){
                case 4:
                    this.orbDetail[a]+=6
                break
                case 5:
                    this.battle.combatantManager.randomEnemyEffect(0,[4])
                break
            }
        }
        if(this.stance>0){
            switch(this.stance){
                case 3:
                    this.battle.cardManagers[this.id].hand.add(findName('Speed',types.card),0,0)
                break
            }
        }
    }
    tickEarly(){
        for(let a=0,la=this.status.main.length;a<la;a++){
            if(this.status.main[a]!=0){
                if(this.status.behavior[a]==3&&this.team>0){
                    if(this.status.main[a]>0){
                        this.status.main[a]--
                    }else if(this.status.main[a]<0){
                        this.status.main[a]++
                    }
                }
            }
        }
    }
    flashColor(color){
        return mergeColor(mergeColor(mergeColor(mergeColor(
            color,
            [0,125,255],this.infoAnim.flash[3]),
            [125,255,0],this.infoAnim.flash[2]),
            [150,150,150],this.infoAnim.flash[1]),
            [200,0,0],this.infoAnim.flash[0])
    }
    startAnimation(type){
        switch(this.name){
            case 'Joe': case 'George': case 'Lira': case 'Sakura': case 'Certes': case 'Azis': case 'Setsuna': case 'Airi': case 'Edgar': case 'Chip': case 'Ume':
                switch(type){
                    case 0:
                        this.animSet.loop=0
                        this.animSet.flip=floor(random(0,2))
                        if(this.name=='Sakura'){
                            this.goal.anim.sword=true
                        }
                    break
                    case 1: case 2: case 10: case 13: case 16:
                        this.animSet.loop=0
                        this.goal.anim.sword=true
                    break
                    case 3: case 6: case 8: case 9: case 17: case 23: case 26: case 28: case 29: case 31:
                    case 32: case 33: case 36: case 38:
                        this.animSet.loop=0
                        this.goal.anim.sword=false
                    break
                    case 4: case 12: case 14: case 15: case 18: case 19: case 20: case 22: case 24: case 25:
                    case 30: case 34: case 37:
                        this.animSet.loop=0
                    break
                    case 5:
                        this.animSet.loop=0
                        this.anim.eyeStyle=[2,2]
                    break
                    case 7:
                        this.animSet.loop=0
                        this.goal.anim.sword=false
                        this.anim.eyeStyle=[0,0]
                    break
                    case 11:
                        this.animSet.loop=0
                        this.goal.anim.sword=false
                        this.anim.eyeStyle=[0,0]
                    break
                    case 21:
                        this.animSet.loop=0
                        this.goal.anim.sword=true
                        this.anim.eyeStyle=[1,1]
                    break
                    case 27:
                        this.animSet.loop=0
                        this.goal.anim.sword=false
                        this.goal.anim.sword2=true
                    break
                    case 35:
                        this.animSet.loop=0
                        this.goal.anim.sword=false
                        this.anim.eyeStyle=[1,1]
                    break
                }
            break
            case 'Donakho':
                switch(type){
                    case 0:
                        this.animSet.loop=0
                        this.animSet.flip=floor(random(0,2))
                    break
                    case 2: case 4: case 6: case 7: case 16: case 17: case 19: case 25: case 26: case 32:
                        this.animSet.loop=0
                    break
                    case 5:
                        this.animSet.loop=0
                        this.anim.eyeStyle=[2,2]
                    break
                }
            break
            case 'Duck': case 'Fungal Duck': case 'Duckforce': case 'Big Duck': case 'Agent Duck': case 'General Duckion': case 'Blue Duck': case 'Management Autoduck': case 'Fat Duck':
            case 'Slime': case 'Big Slime': case 'Spike Slime': case 'Big Spike Slime': case 'Slimoid': case 'Big Slimoid':
            case 'Modicum': case 'Rock Golem': case 'Shield Particle':  case 'Bush Thing': case 'Fireball': case 'Fungling': case 'Bee': case 'Pixie': case 'Darkblot':
                switch(type){
                    case 0:
                        this.animSet.loop=0
                        this.animSet.flip=floor(random(0,2))
                    break
                    case 2: case 3: case 4: case 6: case 7: case 10:
                        this.animSet.loop=0
                    break
                }
            break
            case 'Orb Walker': case 'Spheron': case 'Flame': case 'Hexaghost Orb': case 'Hexaghost Core': case 'Flying Rock': case 'Repulsor': case 'Dead Shell': case 'Louse': case 'Hwurmp': case 'Glimerrer': case 'Antihwurmp': case 'Host': case 'Host Drone': case 'Thornvine':
            case 'Projector': case 'Readout': case 'Strengthener': case 'Gun Rack': case 'Metal Box': case 'Upgrader': case 'Transformer': case 'Doubler': case 'Exhauster':
                this.animSet.loop=0
            break
            case 'Bronze Orb C': case 'Bronze Orb A': case 'Sentry': case 'Management Drone': case 'Personnel Carrier':
            case 'Wall': case 'Spike Pillar': case 'Turret': case 'Explosive Turret': case 'Multiturret': case 'Repulse Turret': case 'Machine Gun': case 'Barbed Pillar': case 'Miniturret': case 'Teleporter Start': case 'Teleporter End': case 'Antizone': case 'Mirror Shield': case 'Armored Turret': break
            default:
                switch(type){
                    case 0: case 2: case 4: case 6:
                        this.animSet.loop=0
                        this.animSet.flip=floor(random(0,2))
                        if((this.name=='Goon'||this.name=='Slaver'||this.name=='Pointy'||this.name=='Romeo'||this.name=='Batter'||this.name=='Swordmaster'||this.name=='Champion'||this.name=='Purge X02'||this.name=='Vengeful'||this.name=='Lunaria'||this.name=='Divine Guard'||this.name=='Avant Guard')&&(type==2||type==6)){
                            this.animSet.loop=0
                            this.goal.anim.sword=true
                        }
                    break
                    case 1: case 3: case 5: case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14:
                        this.animSet.loop=0
                    break
                }
            break
        }
    }
    runAnimation(rate,type){
        switch(this.name){
            case 'Joe': case 'George': case 'Lira': case 'Sakura': case 'Certes': case 'Azis': case 'Setsuna': case 'Airi': case 'Edgar': case 'Chip': case 'Ume':
                switch(type){
                    case 0:
                        this.animSet.loop+=rate
                        if(this.animSet.loop>=1){
                            this.animSet.loop-=1
                            this.animSet.flip=1-this.animSet.flip
                        }
                        this.animSet.flip=round(this.animSet.flip)
                        for(let g=0;g<2;g++){
                            if(lsin((this.animSet.loop+this.animSet.flip+g)*180)>=0){
                                this.anim.legs[g].top=9+lsin((this.animSet.loop+this.animSet.flip+g)*180)*27
                                this.anim.legs[g].bottom=lsin((this.animSet.loop+this.animSet.flip+g)*180)*21
                                this.spin.legs[g].top=(60+lsin((this.animSet.loop+this.animSet.flip+g)*180)*-30)*(g*2-1)
                                this.spin.legs[g].bottom=(120+lsin((this.animSet.loop+this.animSet.flip+g)*180)*-90)*(g*2-1)
                                this.anim.arms[g].top=24+lsin((this.animSet.loop+this.animSet.flip+g)*180)*6
                                this.anim.arms[g].bottom=9+lsin((this.animSet.loop+this.animSet.flip+g)*180)*9
                                this.spin.arms[g].top=(93+lsin((this.animSet.loop+this.animSet.flip+g)*180)*24)*(g*2-1)
                                this.spin.arms[g].bottom=(75+lsin((this.animSet.loop+this.animSet.flip+g)*180)*36)*(g*2-1)
                            }else{
                                this.anim.legs[g].top=9+lsin((this.animSet.loop+this.animSet.flip+g)*180)*-9
                                this.anim.legs[g].bottom=lsin((this.animSet.loop+this.animSet.flip+g)*180)*-30
                                this.spin.legs[g].top=(60+lsin((this.animSet.loop+this.animSet.flip+g)*180)*-60)*(g*2-1)
                                this.spin.legs[g].bottom=(120+lsin((this.animSet.loop+this.animSet.flip+g)*180)*-30)*(g*2-1)
                                this.anim.arms[g].top=24-lsin((this.animSet.loop+this.animSet.flip+g)*180)*3
                                this.anim.arms[g].bottom=9-lsin((this.animSet.loop+this.animSet.flip+g)*180)*18
                                this.spin.arms[g].top=(93-lsin((this.animSet.loop+this.animSet.flip+g)*180)*-24)*(g*2-1)
                                this.spin.arms[g].bottom=(75-lsin((this.animSet.loop+this.animSet.flip+g)*180)*-18)*(g*2-1)
                            }
                        }
                        if(this.name=='Lira'||this.name=='Sakura'||this.name=='Setsuna'||this.name=='Ume'){
                            this.fades.kimono.main.back.x=1+abs(lsin(this.animSet.loop*180))*0.1
                            this.fades.kimono.main.front.x=1+abs(lsin(this.animSet.loop*180))*0.1
                            this.fades.kimono.main.back.y=1-abs(lsin(this.animSet.loop*180))*0.05
                            this.fades.kimono.main.front.y=1-abs(lsin(this.animSet.loop*180))*0.05
                            if(this.name!='Ume'){
                                this.fades.kimono.outside.back.x=1+abs(lsin(this.animSet.loop*180))*0.1
                                this.fades.kimono.outside.front.x=1+abs(lsin(this.animSet.loop*180))*0.1
                                this.fades.kimono.outside.back.y=1-abs(lsin(this.animSet.loop*180))*0.05
                                this.fades.kimono.outside.front.y=1-abs(lsin(this.animSet.loop*180))*0.05
                            }
                            this.fades.kimono.decoration.position.x=1+abs(lsin(this.animSet.loop*180))*0.1
                            this.fades.kimono.decoration.position.y=1-abs(lsin(this.animSet.loop*180))*0.05
                        }
                    break
                    case 1:
                        this.animSet.loop+=rate
                        this.anim.arms[this.animSet.hand].top=24+lsin(this.animSet.loop*180)*27
                        this.anim.arms[this.animSet.hand].bottom=9+lsin(this.animSet.loop*180)*45
                        this.spin.arms[this.animSet.hand].top=(93-lsin(this.animSet.loop*180)*72)*(this.animSet.hand*2-1)
                        this.spin.arms[this.animSet.hand].bottom=(75-lsin(this.animSet.loop*180)*105)*(this.animSet.hand*2-1)
                        this.spin.sword=75+lsin(this.animSet.loop*180)*30
                    break
                    case 2:
                        this.animSet.loop+=rate
                        if(this.name=='Lira'||this.name=='Sakura'||this.name=='Setsuna'||this.name=='Ume'){
                            this.anim.arms[this.animSet.hand].top=24+lsin(this.animSet.loop*180)*36
                            this.anim.arms[this.animSet.hand].bottom=9+lsin(this.animSet.loop*180)*96
                            this.spin.arms[this.animSet.hand].top=(93-lsin(this.animSet.loop*180)*63)*(this.animSet.hand*2-1)
                            this.spin.arms[this.animSet.hand].bottom=(75-lsin(this.animSet.loop*180)*90)*(this.animSet.hand*2-1)
                            this.spin.sword=75+lsin(this.animSet.loop*180)*45
                        }else{
                            for(let g=0;g<2;g++){
                                if(lsin((this.animSet.loop+this.animSet.flip+g)*180)>=0){
                                    this.anim.arms[g].top=24+lsin((this.animSet.loop+this.animSet.flip+g)*180)*36
                                    this.anim.arms[g].bottom=9+lsin((this.animSet.loop+this.animSet.flip+g)*180)*96
                                    this.spin.arms[g].top=(93-lsin((this.animSet.loop+this.animSet.flip+g)*180)*63)*(g*2-1)
                                    this.spin.arms[g].bottom=(75-lsin((this.animSet.loop+this.animSet.flip+g)*180)*90)*(g*2-1)
                                }
                            }
                        }
                    break
                    case 3:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.anim.arms[g].top=24+lsin(this.animSet.loop*90)*24
                            this.anim.arms[g].bottom=9+lsin(this.animSet.loop*90)*87
                            this.spin.arms[g].top=(93+lsin(this.animSet.loop*90)*-63)*(g*2-1)
                            this.spin.arms[g].bottom=(75+lsin(this.animSet.loop*90)*-60)*(g*2-1)
                        }
                    break
                    case 4:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.anim.arms[g].top=24+abs(lsin(this.animSet.loop*90))*12
                            this.anim.arms[g].bottom=9+abs(lsin(this.animSet.loop*90))*15
                        }
                    break
                    case 5:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.anim.eye[g]=constrain(abs(lsin(this.animSet.loop*90))*1.5,0,1)
                        }
                    break
                    case 6:
                        this.animSet.loop+=rate
                        this.anim.arms[this.animSet.hand].top=24+lsin(this.animSet.loop*90)*6
                        this.anim.arms[this.animSet.hand].bottom=9+lsin(this.animSet.loop*90)*36
                        this.spin.arms[this.animSet.hand].top=(93+lsin(this.animSet.loop*90)*-63)*(this.animSet.hand*2-1)
                        this.spin.arms[this.animSet.hand].bottom=(75+lsin(this.animSet.loop*90)*-120)*(this.animSet.hand*2-1)
                    break
                    case 7:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.anim.arms[g].top=24-constrain(this.animSet.loop,0,1)*6
                            this.anim.arms[g].bottom=9+constrain(this.animSet.loop,0,1)*27
                            this.spin.arms[g].top=(93+constrain(this.animSet.loop,0,1)*27)*(g*2-1)
                            this.spin.arms[g].bottom=(75+constrain(this.animSet.loop,0,1)*45)*(g*2-1)
                            this.anim.legs[g].top=9+constrain(this.animSet.loop,0,1)*9
                            this.anim.legs[g].bottom=constrain(this.animSet.loop,0,1)*90
                            this.spin.legs[g].top=(60+constrain(this.animSet.loop,0,1)*30)*(g*2-1)
                            this.spin.legs[g].bottom=(120+constrain(this.animSet.loop,0,1)*30)*(g*2-1)
                            this.anim.eye[g]=constrain(this.animSet.loop,0,1)
                            if(this.name=='Lira'||this.name=='Sakura'||this.name=='Ume'){
                                this.anim.legs[g].length.sandal.back=15.5+constrain(this.animSet.loop,0,1)*0.5
                                this.anim.legs[g].length.sandal.front=14.5+constrain(this.animSet.loop,0,1)*1.5
                            }
                            if(this.name=='Setsuna'){
                                this.anim.legs[g].length.sandal.back=17.5+constrain(this.animSet.loop,0,1)*0.5
                                this.anim.legs[g].length.sandal.front=16.5+constrain(this.animSet.loop,0,1)*1.5
                            }
                        }
                        this.offset.position.y=constrain(this.animSet.loop,0,1)*20
                    break
                    case 8:
                        this.animSet.loop+=rate
                        this.anim.legs[this.animSet.foot].top=9+lsin(this.animSet.loop*180)*63
                        this.anim.legs[this.animSet.foot].bottom=-lsin(this.animSet.loop*180)*12
                        this.spin.legs[this.animSet.foot].bottom=(120-lsin(this.animSet.loop*180)*60)*(this.animSet.foot*2-1)
                    break
                    case 9:
                        this.animSet.loop+=rate
                        this.anim.legs[this.animSet.foot].top=9+lsin(this.animSet.loop*90)*81
                        this.anim.legs[this.animSet.foot].bottom=lsin(this.animSet.loop*90)*75
                        this.spin.legs[this.animSet.foot].top=(60-lsin(this.animSet.loop*90)*45)*(this.animSet.foot*2-1)
                        this.spin.legs[this.animSet.foot].bottom=(120-lsin(this.animSet.loop*90)*105)*(this.animSet.foot*2-1)
                    break
                    case 10:
                        this.animSet.loop+=rate
                        this.goal.anim.direction+=rate*360
                        this.anim.direction+=rate*360
                        this.anim.arms[this.animSet.hand].top=24+lsin(this.animSet.loop*90)*60
                        this.anim.arms[this.animSet.hand].bottom=9+lsin(this.animSet.loop*90)*63
                        this.spin.sword=75+lsin(this.animSet.loop*90)*15
                    break
                    case 11:
                        this.animSet.loop+=rate
                        this.anim.arms[this.animSet.hand].top=24+lsin(this.animSet.loop*90)*3
                        this.anim.arms[this.animSet.hand].bottom=9+lsin(this.animSet.loop*90)*63
                        this.spin.arms[this.animSet.hand].top=(93+lsin(this.animSet.loop*90)*-57)*(this.animSet.hand*2-1)
                        this.spin.arms[this.animSet.hand].bottom=(75+lsin(this.animSet.loop*90)*-135)*(this.animSet.hand*2-1)
                        for(let g=0;g<2;g++){
                            this.anim.eye[g]=constrain(abs(lsin(this.animSet.loop*90))*1.5,0,1)
                        }
                    break
                    case 12:
                        this.animSet.loop+=rate
                        this.anim.arms[1-this.animSet.hand].top=24+lsin(this.animSet.loop*90)*21
                        this.anim.arms[1-this.animSet.hand].bottom=9+lsin(this.animSet.loop*90)*66
                        this.spin.arms[1-this.animSet.hand].top=(-93+lsin(this.animSet.loop*90)*48)*(this.animSet.hand*2-1)
                        this.spin.arms[1-this.animSet.hand].bottom=(-75+lsin(this.animSet.loop*90)*60)*(this.animSet.hand*2-1)
                    break
                    case 13:
                        this.animSet.loop+=rate
                        this.anim.arms[this.animSet.hand].top=24+lsin(this.animSet.loop*180)*51
                        this.anim.arms[this.animSet.hand].bottom=9+lsin(this.animSet.loop*180)*81
                        this.spin.arms[this.animSet.hand].top=(93-lsin(this.animSet.loop*180)*33)*(this.animSet.hand*2-1)
                        this.spin.arms[this.animSet.hand].bottom=(75-lsin(this.animSet.loop*180)*30)*(this.animSet.hand*2-1)
                        this.spin.sword=75+lsin(this.animSet.loop*180)*21
                    break
                    case 14:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.anim.legs[g].top=9+lsin(this.animSet.loop*180)*27
                            this.anim.legs[g].bottom=lsin(this.animSet.loop*180)*12
                            this.spin.legs[g].top=(60+lsin(this.animSet.loop*180)*15)*(g*2-1)
                            this.spin.legs[g].bottom=(120-lsin(this.animSet.loop*180)*45)*(g*2-1)
                        }
                        this.offset.position.y=lsin(this.animSet.loop*180)*-20
                    break
                    case 15:
                        this.animSet.loop+=rate
                        this.anim.arms[1-this.animSet.hand].top=24+lsin(this.animSet.loop*90)*36
                        this.anim.arms[1-this.animSet.hand].bottom=9+lsin(this.animSet.loop*90)*87
                        this.spin.arms[1-this.animSet.hand].top=(-93+lsin(this.animSet.loop*90)*48)*(this.animSet.hand*2-1)
                        this.spin.arms[1-this.animSet.hand].bottom=(-75+lsin(this.animSet.loop*90)*60)*(this.animSet.hand*2-1)
                    break
                    case 16:
                        this.animSet.loop+=rate
                        this.anim.arms[this.animSet.hand].top=24+lsin(this.animSet.loop*180)*48
                        this.anim.arms[this.animSet.hand].bottom=9+lsin(this.animSet.loop*180)*111
                        this.spin.arms[this.animSet.hand].top=(93-lsin(this.animSet.loop*180)*63)*(this.animSet.hand*2-1)
                        this.spin.arms[this.animSet.hand].bottom=(75-lsin(this.animSet.loop*180)*90)*(this.animSet.hand*2-1)
                        this.spin.sword=75+lsin(this.animSet.loop*180)*45
                    break
                    case 17:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.anim.arms[g].top=24+lsin(this.animSet.loop*180)*12
                            this.anim.arms[g].bottom=9+lsin(this.animSet.loop*180)*75
                            this.spin.arms[g].top=(93-lsin(this.animSet.loop*180)*33)*(g*2-1)
                            this.spin.arms[g].bottom=(75-lsin(this.animSet.loop*180)*30)*(g*2-1)
                        }
                    break
                    case 18:
                        this.animSet.loop+=rate
                        this.anim.arms[1-this.animSet.hand].top=24+lsin(this.animSet.loop*90)*36
                        this.anim.arms[1-this.animSet.hand].bottom=9+lsin(this.animSet.loop*90)*87
                        this.spin.arms[1-this.animSet.hand].top=(93-lsin(this.animSet.loop*90)*48)*(this.animSet.hand*2-1)
                        this.spin.arms[1-this.animSet.hand].bottom=(75-lsin(this.animSet.loop*90)*60)*(this.animSet.hand*2-1)
                    break
                    case 19:
                        this.animSet.loop+=rate
                        this.size=1-lsin(this.animSet.loop*180)
                    break
                    case 20:
                        this.animSet.loop+=rate
                        this.anim.arms[this.animSet.hand].top=24+lsin(this.animSet.loop*90)*36
                        this.anim.arms[this.animSet.hand].bottom=9+lsin(this.animSet.loop*90)*87
                        this.spin.arms[this.animSet.hand].top=(93-lsin(this.animSet.loop*90)*48)*(this.animSet.hand*2-1)
                        this.spin.arms[this.animSet.hand].bottom=(75-lsin(this.animSet.loop*90)*60)*(this.animSet.hand*2-1)
                    break
                    case 21:
                        this.animSet.loop+=rate
                        this.anim.arms[this.animSet.hand].top=24+lsin(this.animSet.loop*180)*36
                        this.anim.arms[this.animSet.hand].bottom=9+lsin(this.animSet.loop*180)*96
                        this.spin.arms[this.animSet.hand].top=(93-lsin(this.animSet.loop*180)*63)*(this.animSet.hand*2-1)
                        this.spin.arms[this.animSet.hand].bottom=(75-lsin(this.animSet.loop*180)*90)*(this.animSet.hand*2-1)
                        for(let g=0;g<2;g++){
                            this.anim.eye[g]=lsin(this.animSet.loop*180)
                        }
                        this.spin.sword=75+lsin(this.animSet.loop*180)*45
                        if(this.name=='Lira'){
                            this.parts.mouth=-65+lsin(this.animSet.loop*180)*-4
                            this.anim.mouth.y=abs(5-lsin(this.animSet.loop*180)*10)
                            this.spin.mouth=lsin(this.animSet.loop*180)>=0.5?36:216
                        }else if(this.name=='Sakura'){
                            this.anim.mouth.y=5+lsin(this.animSet.loop*180)
                        }else if(this.name=='Setsuna'){
                            this.parts.mouth=-65+lsin(this.animSet.loop*180)*-4
                            this.anim.mouth.y=abs(4-lsin(this.animSet.loop*180)*8)
                            this.spin.mouth=lsin(this.animSet.loop*180)>=0.5?36:216
                        }else if(this.name=='Ume'){
                            this.parts.mouth=-65+lsin(this.animSet.loop*180)*-2
                            this.anim.mouth.y=abs(4-lsin(this.animSet.loop*180)*8)
                            this.spin.mouth=lsin(this.animSet.loop*180)>=0.5?36:216
                        }
                    break
                    case 22:
                        this.animSet.loop+=rate
                        this.anim.arms[1-this.animSet.hand].top=24+lsin(this.animSet.loop*180)*84
                        this.anim.arms[1-this.animSet.hand].bottom=9+lsin(this.animSet.loop*180)*135
                        this.spin.arms[1-this.animSet.hand].top=(93-lsin(this.animSet.loop*180)*57)*(1-this.animSet.hand*2)
                        this.spin.arms[1-this.animSet.hand].bottom=(75-lsin(this.animSet.loop*180)*69)*(1-this.animSet.hand*2)
                    break
                    case 23:
                        this.animSet.loop+=rate
                        this.anim.legs[this.animSet.foot].top=9+lsin(this.animSet.loop*90)*51
                        this.anim.legs[this.animSet.foot].bottom=lsin(this.animSet.loop*90)*48
                        this.spin.legs[this.animSet.foot].top=(60-lsin(this.animSet.loop*90)*45)*(this.animSet.foot*2-1)
                        this.spin.legs[this.animSet.foot].bottom=(120-lsin(this.animSet.loop*90)*105)*(this.animSet.foot*2-1)
                    break
                    case 24:
                        this.animSet.loop+=rate
                        this.offset.position.x=abs(lsin(this.animSet.loop*180))*lsin(this.anim.direction)*60
                        this.offset.position.y=abs(lsin(this.animSet.loop*180))*lcos(this.anim.direction)*30
                    break
                    case 25:
                        this.animSet.loop+=rate
                        this.anim.arms[1-this.animSet.hand].top=24+lsin(this.animSet.loop*90)*48
                        this.anim.arms[1-this.animSet.hand].bottom=9+lsin(this.animSet.loop*90)*84
                        this.spin.arms[1-this.animSet.hand].top=(93-lsin(this.animSet.loop*90)*48)*(1-this.animSet.hand*2)
                        this.spin.arms[1-this.animSet.hand].bottom=(75-lsin(this.animSet.loop*90)*60)*(1-this.animSet.hand*2)
                    break
                    case 26:
                        this.animSet.loop+=rate
                        this.anim.arms[this.animSet.hand].top=24+lsin(this.animSet.loop*90)*18
                        this.anim.arms[this.animSet.hand].bottom=9+lsin(this.animSet.loop*90)*75
                        this.spin.arms[this.animSet.hand].bottom=(75+lsin(this.animSet.loop*90)*30)*(this.animSet.hand*2-1)
                    break
                    case 27:
                        this.animSet.loop+=rate
                        this.anim.arms[1-this.animSet.hand].top=24+lsin(this.animSet.loop*90)*36
                        this.anim.arms[1-this.animSet.hand].bottom=9+lsin(this.animSet.loop*90)*96
                        this.spin.arms[1-this.animSet.hand].top=(93-lsin(this.animSet.loop*90)*63)*(1-this.animSet.hand*2)
                        this.spin.arms[1-this.animSet.hand].bottom=(75-lsin(this.animSet.loop*90)*90)*(1-this.animSet.hand*2)
                    break
                    case 28:
                        this.animSet.loop+=rate
                        this.anim.legs[this.animSet.foot].top=9+lsin(this.animSet.loop*90)*81
                        this.anim.legs[this.animSet.foot].bottom=lsin(this.animSet.loop*90)*75
                        this.spin.legs[this.animSet.foot].top=(60+lsin(this.animSet.loop*90)*45)*(this.animSet.foot*2-1)
                        this.spin.legs[this.animSet.foot].bottom=(120+lsin(this.animSet.loop*90)*105)*(this.animSet.foot*2-1)
                        this.offset.position.y=lsin(this.animSet.loop*90)*-30
                    break
                    case 29:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.anim.arms[g].top=24+abs(lsin((this.animSet.loop+this.animSet.flip+g)*180))*60
                            this.anim.arms[g].bottom=9+abs(lsin((this.animSet.loop+this.animSet.flip+g)*180))*93
                            this.spin.arms[g].top=(93-abs(lsin((this.animSet.loop+this.animSet.flip+g)*180))*57)*(g*2-1)
                            this.spin.arms[g].bottom=(75-abs(lsin((this.animSet.loop+this.animSet.flip+g)*180))*60)*(g*2-1)
                        }
                    break
                    case 30:
                        this.animSet.loop+=rate
                        this.anim.arms[1-this.animSet.hand].top=24+lsin(this.animSet.loop*90)*111
                        this.anim.arms[1-this.animSet.hand].bottom=9+lsin(this.animSet.loop*90)*141
                        this.spin.arms[1-this.animSet.hand].top=(-93+lsin(this.animSet.loop*90)*33)*(this.animSet.hand*2-1)
                        this.spin.arms[1-this.animSet.hand].bottom=(-75+lsin(this.animSet.loop*90)*27)*(this.animSet.hand*2-1)
                    break
                    case 31:
                        this.animSet.loop+=rate
                        for(let a=0,la=2;a<la;a++){
                            this.anim.legs[this.animSet.foot+a*(1-this.animSet.foot*2)].top=9+lsin(this.animSet.loop*90)*81*(1-a*2)
                            this.anim.legs[this.animSet.foot+a*(1-this.animSet.foot*2)].bottom=lsin(this.animSet.loop*90)*75*(1-a*2)
                            this.spin.legs[this.animSet.foot+a*(1-this.animSet.foot*2)].top=(60-lsin(this.animSet.loop*90)*60)*(this.animSet.foot*2-1)*(1-a*2)
                            this.spin.legs[this.animSet.foot+a*(1-this.animSet.foot*2)].bottom=(120-lsin(this.animSet.loop*90)*120)*(this.animSet.foot*2-1)*(1-a*2)
                        }
                    break
                    case 32:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.anim.arms[g].top=24+abs(lsin(this.animSet.loop*180))*81
                            this.anim.arms[g].bottom=9+abs(lsin(this.animSet.loop*180))*126
                        }
                    break
                    case 33:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.anim.arms[g].top=24+abs(lsin(this.animSet.loop*180))*111
                            this.anim.arms[g].bottom=9+abs(lsin(this.animSet.loop*180))*201
                        }
                    break
                    case 34:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.anim.legs[g].top=9-abs(lsin(this.animSet.loop*180))*9
                        }
                        this.offset.position.y=-abs(lsin(this.animSet.loop*180))*30
                    break
                    case 35:
                        this.animSet.loop+=rate
                        this.goal.anim.direction+=rate*720
                        this.anim.direction+=rate*720
                        for(let g=0;g<2;g++){
                            this.anim.arms[g].top=24+abs(lsin(this.animSet.loop*180))*72
                            this.anim.arms[g].bottom=9+abs(lsin(this.animSet.loop*180))*111
                            this.anim.eye[g]=lsin(this.animSet.loop*180)
                        }
                        if(this.name=='Sakura'){
                            this.anim.mouth.y=5+lsin(this.animSet.loop*180)
                        }
                    break
                    case 36:
                        this.animSet.loop+=rate
                        this.anim.arms[0].top=24+abs(lsin(this.animSet.loop*180))*114
                        this.anim.arms[0].bottom=9+abs(lsin(this.animSet.loop*180))*186
                    break
                    case 37:
                        this.animSet.loop+=rate
                        this.anim.arms[1-this.animSet.hand].top=24+abs(lsin((this.animSet.loop+this.animSet.flip+(1-this.animSet.hand))*180))*36
                        this.anim.arms[1-this.animSet.hand].bottom=9+abs(lsin((this.animSet.loop+this.animSet.flip+(1-this.animSet.hand))*180))*96
                        this.spin.arms[1-this.animSet.hand].top=(93-abs(lsin((this.animSet.loop+this.animSet.flip+(1-this.animSet.hand))*180))*63)*((1-this.animSet.hand)*2-1)
                        this.spin.arms[1-this.animSet.hand].bottom=(75-abs(lsin((this.animSet.loop+this.animSet.flip+(1-this.animSet.hand))*180))*90)*((1-this.animSet.hand)*2-1)
                    break
                    case 38:
                        this.animSet.loop+=rate
                        this.anim.arms[0].top=24+lsin(this.animSet.loop*180)*60
                        this.anim.arms[0].bottom=9+lsin(this.animSet.loop*180)*99
                        this.spin.arms[0].top=-93+sqrt(sin(this.animSet.loop*180))*78
                        this.spin.arms[0].bottom=-75+sqrt(sin(this.animSet.loop*180))*75
                    break
                }
            break
            case 'Donakho':
                switch(type){
                    case 0:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.spin.legs[g].top=(90-lsin((this.animSet.loop+this.animSet.flip)*180)*75)*(g*2-1)
                            this.spin.arms[g].top=(90-lsin((this.animSet.loop+this.animSet.flip)*180)*60)*(g*2-1)
                        }
                    break
                    case 1:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.spin.arms[g].top=(90-abs(lsin(this.animSet.loop*180)*36))*(g*2-1)
                            this.anim.arms[g].top=54+abs(lsin(this.animSet.loop*180))*12
                        }
                    break
                    case 2:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.spin.arms[g].top=(90-abs(lsin(this.animSet.loop*180)*84))*(g*2-1)
                            this.anim.arms[g].top=54+abs(lsin(this.animSet.loop*180))*30
                        }
                    break
                    case 4:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.spin.arms[g].top=90*(g*2-1)+this.animSet.loop*360
                            this.anim.arms[g].top=54-abs(lsin(this.animSet.loop*180))*18
                        }
                    break
                    case 5:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.anim.eye[g]=constrain(abs(lsin(this.animSet.loop*90))*1.5,0,1)
                        }
                    break
                    case 6:
                        this.animSet.loop+=rate
                        this.spin.arms[1-this.animSet.hand].top=(90-abs(lsin(this.animSet.loop*90)*150))*(1-this.animSet.hand*2)
                        this.anim.arms[1-this.animSet.hand].top=54+abs(lsin(this.animSet.loop*90))*18
                    break
                    case 7:
                        this.animSet.loop+=rate
                        this.anim.fat=1+this.animSet.loop*5
                        if(this.anim.fat>2){
                            if(this.size>0){
                                this.size+=0.1
                                if(this.size>2){
                                    this.size=0
                                }
                            }
                        }
                    break
                    case 16:
                        this.animSet.loop+=rate
                        this.spin.arms[this.animSet.hand].top=(90-this.animSet.loop*360)*(this.animSet.hand*2-1)
                        this.anim.arms[this.animSet.hand].top=54+abs(lsin(this.animSet.loop*180))*60
                    break
                    case 17:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.spin.arms[g].top=(90-abs(lsin(this.animSet.loop*180)*66))*(g*2-1)
                            this.anim.arms[g].top=54+abs(lsin(this.animSet.loop*180))*42
                        }
                    break
                    case 19:
                        this.animSet.loop+=rate
                        this.size=this.base.size*(1-lsin(this.animSet.loop*180))
                    break
                    case 25:
                        this.animSet.loop+=rate
                        this.spin.arms[1-this.animSet.hand].top=(90-abs(lsin(this.animSet.loop*90)*60))*(1-this.animSet.hand*2)
                        this.anim.arms[1-this.animSet.hand].top=54+abs(lsin(this.animSet.loop*90))*48
                    break
                    case 26:
                        this.animSet.loop+=rate
                        this.spin.arms[this.animSet.hand].top=(90-abs(lsin(this.animSet.loop*180)*36))*(this.animSet.hand*2-1)
                        this.anim.arms[this.animSet.hand].top=54+abs(lsin(this.animSet.loop*180))*60
                    break
                    case 32:
                        this.animSet.loop+=rate
                        this.offset.position.y=lsin(this.animSet.loop*180)*-10
                    break
                }
            break
            case 'Duck': case 'Fungal Duck': case 'Duckforce': case 'Big Duck': case 'Agent Duck': case 'General Duckion': case 'Blue Duck': case 'Management Autoduck': case 'Fat Duck':
                switch(type){
                    case 0:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.spin.legs[g].top=(-90+lsin((this.animSet.loop+this.animSet.flip)*180)*75)*(g*2-1)
                            this.spin.arms[g].top=(-90+lsin((this.animSet.loop+this.animSet.flip)*180)*60)*(g*2-1)
                        }
                    break
                    case 2:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.spin.arms[g].top=(-90+abs(lsin(this.animSet.loop*540)*75))*(g*2-1)
                            this.anim.arms[g].top=54+abs(lsin(this.animSet.loop*540))*30
                        }
                    break
                    case 3:
                        this.animSet.loop+=rate
                        this.offset.position.y=lsin(this.animSet.loop*180)*-10
                    break
                    case 7:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.spin.arms[g].top+=rate*180
                        }
                    break
                    case 10:
                        this.animSet.loop+=rate
                        this.size=this.base.size*(1-lsin(this.animSet.loop*180))
                    break
                }
            break
            case 'Orb Walker':
                switch(type){
                    case 0:
                        this.animSet.loop+=rate
                        for(let g=0;g<4;g++){
                            this.spin.legs[g].top=(-45+g*90+lsin(this.animSet.loop*720)*15*(g%2*2-1))
                        }
                    break
                    case 2:
                        this.animSet.loop+=rate
                        for(let g=0;g<4;g++){
                            this.spin.legs[g].top+=rate*360
                            this.anim.legs[g].top=39+lsin(this.animSet.loop*180)*36
                            this.anim.legs[g].length.top=36+lsin(this.animSet.loop*180)*12
                        }
                        this.offset.position.x=abs(lsin(this.animSet.loop*180))*lsin(this.anim.direction)*60
                        this.offset.position.y=abs(lsin(this.animSet.loop*180))*lcos(this.anim.direction)*30
                    break
                    case 6:
                        this.animSet.loop+=rate
                        this.goal.anim.direction+=rate*180
                        this.anim.direction+=rate*360
                        for(let g=0;g<4;g++){
                            this.anim.legs[g].top=39+lsin(this.animSet.loop*90)*51
                            this.anim.legs[g].length.top=36+lsin(this.animSet.loop*90)*24
                        }
                    break
                }
            break
            case 'Slime': case 'Big Slime': case 'Spike Slime': case 'Big Spike Slime': case 'Slime Boss': case 'Slimoid': case 'Big Slimoid':
            case 'Modicum': case 'Rock Golem': case 'Shield Particle':  case 'Bush Thing': case 'Fireball': case 'Fungling': case 'Bee': case 'Pixie': case 'Darkblot':
                switch(type){
                    case 0:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.spin.arms[g].top=(-90+lsin((this.animSet.loop+this.animSet.flip)*180)*60)*(g*2-1)
                        }
                    break
                    case 1:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.spin.arms[g].top=(-90+abs(lsin(this.animSet.loop*180)*60))*(g*2-1)
                        }
                    break
                    case 2: case 4:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.spin.arms[g].top=(-90+abs(lsin(this.animSet.loop*360)*75))*(g*2-1)
                            this.anim.arms[g].top=54+abs(lsin(this.animSet.loop*360))*30
                        }
                    break
                    case 3:
                        this.animSet.loop+=rate
                        this.offset.position.y=lsin(this.animSet.loop*180)*-10
                    break
                    case 6:
                        this.animSet.loop+=rate
                        this.goal.anim.direction+=rate*180
                        this.anim.direction+=rate*180
                        for(let g=0;g<2;g++){
                            this.anim.arms[g].top=54+abs(lsin(this.animSet.loop*360))*30
                        }
                    break
                    case 7:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.anim.arms[g].top=54+abs(lsin(this.animSet.loop*180))*96
                        }
                    break
                    case 10:
                        this.animSet.loop+=rate
                        this.size=this.base.size*(1-lsin(this.animSet.loop*180))
                    break
                }
            break
            case 'Spheron': case 'Louse':
                switch(type){
                    case 2:
                        this.animSet.loop+=rate
                        this.offset.position.x=abs(lsin(this.animSet.loop*180))*lsin(this.anim.direction)*60
                        this.offset.position.y=abs(lsin(this.animSet.loop*180))*lcos(this.anim.direction)*30
                    break
                }
            break
            case 'Flame': case 'Hexaghost Orb': case 'Hexaghost Core': case 'Thornvine':
                this.animSet.loop+=rate
                this.anim.glow=1+abs(lsin(this.animSet.loop*180))*0.5
            break
            case 'Flying Rock':
                switch(type){
                    case 0:
                        this.animSet.loop+=rate
                        this.goal.anim.direction+=rate*360
                        this.anim.direction+=rate*360
                    break
                    case 1:
                        this.animSet.loop+=rate
                        this.goal.anim.direction+=rate*360
                        this.anim.direction+=rate*360
                        this.offset.position.y=abs(lsin(this.animSet.loop*360))*20
                    break
                    case 2:
                        this.animSet.loop+=rate
                        this.goal.anim.direction+=rate*360
                        this.anim.direction+=rate*360
                        this.offset.position.x=abs(lsin(this.animSet.loop*180))*lsin(this.anim.direction)*60
                        this.offset.position.y=abs(lsin(this.animSet.loop*180))*lcos(this.anim.direction)*30
                    break
                }
            break
            case 'Repulsor':
                switch(type){
                    case 0:
                        this.animSet.loop+=rate
                        this.anim.body+=rate*180
                    break
                    case 2:
                        this.animSet.loop+=rate
                        this.anim.body+=rate*180
                        this.offset.position.x=abs(lsin(this.animSet.loop*180))*lsin(this.anim.direction)*60
                        this.offset.position.y=abs(lsin(this.animSet.loop*180))*lcos(this.anim.direction)*30
                    break
                    case 9:
                        this.animSet.loop+=rate
                        this.anim.body+=rate*180
                        this.offset.position.y=lsin(this.animSet.loop*180)*-20
                    break
                }
            break
            case 'Dead Shell':
                switch(type){
                    case 0:
                        this.animSet.loop+=rate
                        for(let g=0;g<4;g++){
                            this.spin.legs[g]=(-120+g*60+floor(g/2)*60+lsin(this.animSet.loop*720)*15*(g%2*2-1))
                        }
                    break
                    case 2:
                        this.animSet.loop+=rate
                        for(let g=0;g<4;g++){
                            this.spin.legs[g]+=rate*360
                        }
                    break
                    case 4:
                        this.animSet.loop+=rate
                        for(let g=0;g<4;g++){
                            this.spin.legs[g]+=rate*360*lcos(this.animSet.loop*180)
                        }
                    break
                }
            break
            case 'Hwurmp':
                switch(type){
                    case 9:
                        this.animSet.loop+=rate
                        this.anim.body=1+lsin(this.animSet.loop*180)
                    break
                }
            break
            case 'Antihwurmp':
                switch(type){
                    case 9:
                        this.animSet.loop+=rate
                        this.anim.body=2-lsin(this.animSet.loop*180)
                    break
                }
            break
            case 'Glimerrer':
                switch(type){
                    case 9:
                        this.animSet.loop+=rate
                        this.offset.position.y=lsin(this.animSet.loop*180)*-20
                    break
                }
            break
            case 'Host': case 'Host Drone':
                switch(type){
                    case 1: case 8:
                        this.animSet.loop+=rate
                        this.anim.body=lsin(this.animSet.loop*180)
                    break
                    case 2:
                        this.animSet.loop+=rate
                        this.offset.position.x=abs(lsin(this.animSet.loop*180))*lsin(this.anim.direction)*60
                        this.offset.position.y=abs(lsin(this.animSet.loop*180))*lcos(this.anim.direction)*30
                    break
                }
            break
            case 'Projector': case 'Readout': case 'Strengthener': case 'Gun Rack': case 'Metal Box': case 'Upgrader': case 'Transformer': case 'Doubler': case 'Exhauster':
                this.animSet.loop+=rate
                this.anim.light=lsin(this.animSet.loop*180)+1
            break
            case 'Bronze Orb C': case 'Bronze Orb A': case 'Sentry': case 'Management Drone': case 'Personnel Carrier':
            case 'Wall': case 'Spike Pillar': case 'Turret': case 'Readout': case 'Explosive Turret': case 'Multiturret': case 'Barbed Pillar': case 'Repulse Turret': case 'Machine Gun': case 'Miniturret': case 'Teleporter Start': case 'Teleporter End': case 'Antizone': case 'Mirror Shield': case 'Armored Turret': break
            default:
                switch(type){
                    case 0:
                        if(this.name!='Jet'){
                            this.animSet.loop+=rate
                            if(this.animSet.loop>=1){
                                this.animSet.loop-=1
                                this.animSet.flip=1-this.animSet.flip
                            }
                            this.animSet.flip=round(this.animSet.flip)
                            for(let g=0;g<2;g++){
                                if(lsin((this.animSet.loop+this.animSet.flip+g)*180)>=0){
                                    this.anim.legs[g].top=9+lsin((this.animSet.loop+this.animSet.flip+g)*180)*27
                                    this.anim.legs[g].bottom=lsin((this.animSet.loop+this.animSet.flip+g)*180)*21
                                    this.spin.legs[g].top=(60+lsin((this.animSet.loop+this.animSet.flip+g)*180)*-30)*(g*2-1)
                                    this.spin.legs[g].bottom=(120+lsin((this.animSet.loop+this.animSet.flip+g)*180)*-90)*(g*2-1)
                                    this.anim.arms[g].top=24+lsin((this.animSet.loop+this.animSet.flip+g)*180)*6
                                    this.anim.arms[g].bottom=9+lsin((this.animSet.loop+this.animSet.flip+g)*180)*9
                                    this.spin.arms[g].top=(93+lsin((this.animSet.loop+this.animSet.flip+g)*180)*24)*(g*2-1)
                                    this.spin.arms[g].bottom=(75+lsin((this.animSet.loop+this.animSet.flip+g)*180)*36)*(g*2-1)
                                }else{
                                    this.anim.legs[g].top=9+lsin((this.animSet.loop+this.animSet.flip+g)*180)*-9
                                    this.anim.legs[g].bottom=lsin((this.animSet.loop+this.animSet.flip+g)*180)*-30
                                    this.spin.legs[g].top=(60+lsin((this.animSet.loop+this.animSet.flip+g)*180)*-60)*(g*2-1)
                                    this.spin.legs[g].bottom=(120+lsin((this.animSet.loop+this.animSet.flip+g)*180)*-30)*(g*2-1)
                                    this.anim.arms[g].top=24-lsin((this.animSet.loop+this.animSet.flip+g)*180)*3
                                    this.anim.arms[g].bottom=9-lsin((this.animSet.loop+this.animSet.flip+g)*180)*18
                                    this.spin.arms[g].top=(93-lsin((this.animSet.loop+this.animSet.flip+g)*180)*-24)*(g*2-1)
                                    this.spin.arms[g].bottom=(75-lsin((this.animSet.loop+this.animSet.flip+g)*180)*-18)*(g*2-1)
                                }
                            }
                        }
                    break
                    case 1:
                        this.animSet.loop+=rate
                        this.anim.arms[1].top=24+lsin(this.animSet.loop*180)*27
                        this.anim.arms[1].bottom=9+lsin(this.animSet.loop*180)*45
                        this.spin.arms[1].top=93-lsin(this.animSet.loop*180)*72
                        this.spin.arms[1].bottom=75-lsin(this.animSet.loop*180)*105
                    break
                    case 2:
                        this.animSet.loop+=rate
                        if(this.name=='Goon'||this.name=='Slaver'||this.name=='Pointy'||this.name=='Romeo'||this.name=='Batter'||this.name=='Swordmaster'||this.name=='Champion'||this.name=='Purge X02'||this.name=='Vengeful'||this.name=='Lunaria'||this.name=='Divine Guard'||this.name=='Avant Guard'){
                            this.anim.arms[0].top=24+lsin(this.animSet.loop*180)*36
                            this.anim.arms[0].bottom=9+lsin(this.animSet.loop*180)*96
                            this.spin.arms[0].top=-93+lsin(this.animSet.loop*180)*63
                            this.spin.arms[0].bottom=-75+lsin(this.animSet.loop*180)*90
                            this.spin.sword=75+lsin(this.animSet.loop*180)*45
                        }else{
                            for(let g=0;g<2;g++){
                                if(lsin((this.animSet.loop+this.animSet.flip+g)*180)>=0){
                                    this.anim.arms[g].top=24+lsin((this.animSet.loop+this.animSet.flip+g)*180)*36
                                    this.anim.arms[g].bottom=9+lsin((this.animSet.loop+this.animSet.flip+g)*180)*96
                                    this.spin.arms[g].top=(93-lsin((this.animSet.loop+this.animSet.flip+g)*180)*63)*(g*2-1)
                                    this.spin.arms[g].bottom=(75-lsin((this.animSet.loop+this.animSet.flip+g)*180)*90)*(g*2-1)
                                }
                            }
                        }
                    break
                    case 3:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.anim.arms[g].top=24+lsin(this.animSet.loop*90)*24
                            this.anim.arms[g].bottom=9+lsin(this.animSet.loop*90)*87
                            this.spin.arms[g].top=(93+lsin(this.animSet.loop*90)*-63)*(g*2-1)
                            this.spin.arms[g].bottom=(75+lsin(this.animSet.loop*90)*-60)*(g*2-1)
                        }
                    break
                    case 4:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.anim.arms[g].top=24+abs(lsin((this.animSet.loop+this.animSet.flip+g)*180))*60
                            this.anim.arms[g].bottom=9+abs(lsin((this.animSet.loop+this.animSet.flip+g)*180))*93
                            this.spin.arms[g].top=(93-abs(lsin((this.animSet.loop+this.animSet.flip+g)*180))*57)*(g*2-1)
                            this.spin.arms[g].bottom=(75-abs(lsin((this.animSet.loop+this.animSet.flip+g)*180))*60)*(g*2-1)
                        }
                    break
                    case 5:
                        this.animSet.loop+=rate
                        this.anim.arms[0].top=24+lsin(this.animSet.loop*90)*48
                        this.anim.arms[0].bottom=9+lsin(this.animSet.loop*90)*84
                        this.spin.arms[0].top=-93+lsin(this.animSet.loop*90)*48
                        this.spin.arms[0].bottom=-75+lsin(this.animSet.loop*90)*60
                    break
                    case 6:
                        this.animSet.loop+=rate
                        this.goal.anim.direction+=rate*180
                        this.anim.direction+=rate*180
                        this.anim.arms[0].top=24+lsin(this.animSet.loop*90)*60
                        this.anim.arms[0].bottom=9+lsin(this.animSet.loop*90)*63
                        this.spin.sword=75+lsin(this.animSet.loop*90)*15
                    break
                    case 7:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.anim.arms[g].top=24+abs(lsin(this.animSet.loop*180))*12
                            this.anim.arms[g].bottom=9+abs(lsin(this.animSet.loop*180))*15
                        }
                    break
                    case 8:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.anim.arms[g].top=24+abs(lsin(this.animSet.loop*180))*81
                            this.anim.arms[g].bottom=9+abs(lsin(this.animSet.loop*180))*126
                        }
                    break
                    case 9:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.anim.legs[g].top=9+lsin(this.animSet.loop*180)*27
                            this.anim.legs[g].bottom=lsin(this.animSet.loop*180)*12
                            this.spin.legs[g].top=(60+lsin(this.animSet.loop*180)*15)*(g*2-1)
                            this.spin.legs[g].bottom=(120-lsin(this.animSet.loop*180)*45)*(g*2-1)
                        }
                        this.offset.position.y=lsin(this.animSet.loop*180)*-20
                    break
                    case 10:
                        this.animSet.loop+=rate
                        this.size=this.base.size*(1-lsin(this.animSet.loop*180))
                    break
                    case 11:
                        this.animSet.loop+=rate
                        this.anim.mouth.x=8+lsin(this.animSet.loop*540)*6
                        this.anim.mouth.y=5+lsin(this.animSet.loop*540)*2
                    break
                    case 12:
                        this.animSet.loop+=rate
                        this.anim.legs[0].top=9+lsin(this.animSet.loop*90)*81
                        this.anim.legs[0].bottom=lsin(this.animSet.loop*90)*75
                        this.spin.legs[0].top=-60+lsin(this.animSet.loop*90)*45
                        this.spin.legs[0].bottom=-120+lsin(this.animSet.loop*90)*105
                    break
                    case 13:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.anim.arms[g].top=24+abs(lsin((this.animSet.loop+g)*180))*21
                            this.anim.arms[g].bottom=9+abs(lsin((this.animSet.loop+g)*180))*66
                            this.spin.arms[g].top=(93-abs(lsin((this.animSet.loop+g)*180))*33)*(g*2-1)
                            this.spin.arms[g].bottom=(75-abs(lsin((this.animSet.loop+g)*180))*75)*(g*2-1)
                        }
                        this.size+=rate/8
                    break
                    case 14:
                        this.animSet.loop+=rate
                        this.anim.arms[1].top=24+lsin(this.animSet.loop*180)*27
                        this.anim.arms[1].bottom=9+lsin(this.animSet.loop*180)*45
                        this.spin.arms[1].top=93-lsin(this.animSet.loop*180)*39
                        this.spin.arms[1].bottom=75-lsin(this.animSet.loop*180)*66
                    break

                }
            break
            
        }
    }
    minorDisplay(type,key){
        switch(this.name){
            case 'Lira':
                switch(type){
                    case 0:
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x*0.9+this.graphics.arms[key].middle.x*0.1,this.graphics.arms[key].bottom.y*0.9+this.graphics.arms[key].middle.y*0.1)
                        this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom-75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom-75)))
                        this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom-75)*2,-1,1)*this.anim.sword)
                        this.layer.fill(235,245,255,this.fade)
                        this.layer.noStroke()
                        this.layer.rect(0,-20,3,40)
                        this.layer.triangle(-3/2,-40,3/2,-40,0,-55)
                        this.layer.fill(160,170,180,this.fade)
                        this.layer.rect(3/4,-20,3/2,40)
                        this.layer.triangle(3/2,-40,0,-55,0,-40)
                        for(let g=0;g<4;g++){
                            this.layer.stroke(125+g*10,70+g*10,80+g*10,this.fade)
                            this.layer.strokeWeight(4-g)
                            this.layer.line(0,-3+g/2,0,2-g/2)
                        }
                        this.layer.pop()
                    break
                    case 1:
                        this.layer.stroke(this.color.band[1][0],this.color.band[1][1],this.color.band[1][2],this.fade*this.fades.band[0])
                        this.layer.strokeWeight(0.5)
                        if(this.trigger.display.extra.damage){
                            this.layer.line(
                                this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-1.1*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-1.1*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-1.925*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-1.925*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90))
                            this.layer.line(
                                this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+1.925*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+1.925*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+1.1*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+1.1*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90))
                        }else{
                            this.layer.line(
                                this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+1.925*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+1.925*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-1.925*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-1.925*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90))
                        }
                        this.layer.stroke(this.color.band[2][0],this.color.band[2][1],this.color.band[2][2],this.fade*this.fades.band[0])
                        this.layer.strokeWeight(0.6)
                        for(let g=0;g<4;g++){
                            if(!this.trigger.display.extra.damage||g<1||g>3){
                                this.layer.point(
                                    this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+(-1.8+g*1.2)*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                    this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+(-1.8+g*1.2)*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90))
                            }
                        }
                    break
                }
            break
            case 'Sakura':
                switch(type){
                    case 0:
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x*0.9+this.graphics.arms[key].middle.x*0.1,this.graphics.arms[key].bottom.y*0.9+this.graphics.arms[key].middle.y*0.1)
                        this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                        this.layer.scale(-1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                        this.layer.image(graphics.minor[17],-27*this.fade,-15-27*this.fade,54*this.fade,54*this.fade)
                        this.layer.pop()
                    break
                    case 1:
                        if(this.anim.sword2>0){
                            this.layer.push()
                            this.layer.translate(this.graphics.arms[key].bottom.x*0.9+this.graphics.arms[key].middle.x*0.1,this.graphics.arms[key].bottom.y*0.9+this.graphics.arms[key].middle.y*0.1)
                            this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom-75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom-75)))
                            this.layer.scale(-0.5,-0.5*constrain(lsin(this.anim.direction+this.spin.arms[key].bottom-75)*2,-1,1)*this.anim.sword2)
                            this.layer.strokeCap(SQUARE)
                            this.layer.noFill()
                            this.layer.stroke(207,217,220,this.fade)
                            this.layer.strokeWeight(0.4)
                            this.layer.beginShape()
                            this.layer.vertex(45,45)
                            this.layer.bezierVertex(25,40,-25,40,-45,45)
                            this.layer.endShape()
                            this.layer.strokeCap(ROUND)
                            this.layer.fill(237,155,140,this.fade)
                            this.layer.noStroke()
                            this.layer.beginShape()
                            this.layer.vertex(-45,45)
                            this.layer.vertex(0,65)
                            this.layer.vertex(45,45)
                            this.layer.bezierVertex(25,40,-25,40,-45,45)
                            this.layer.endShape()
                            this.layer.stroke(104,78,95,this.fade)
                            this.layer.strokeWeight(1.5)
                            this.layer.line(0,-5,0,50)
                            this.layer.image(graphics.minor[24],-75*this.fade,50-30*this.fade,150*this.fade,60*this.fade)
                            this.layer.fill(246,209,161,this.fade)
                            this.layer.noStroke()
                            this.layer.beginShape()
                            this.layer.vertex(-45,45)
                            this.layer.vertex(0,65)
                            this.layer.vertex(45,45)
                            this.layer.bezierVertex(25,50,-25,50,-45,45)
                            this.layer.endShape()
                            this.layer.image(graphics.minor[25],-50*this.fade,60-20*this.fade,100*this.fade,40*this.fade)
                            this.layer.push()
                            this.layer.fill(239,230,231,this.fade)
                            this.layer.ellipse(0,65,3,3)
                            this.layer.translate(0,65)
                            this.layer.rotate(95-165*3/4)
                            for(let a=0;a<4;a++){
                                this.layer.arc(0,0,12.5,2.5,-90,90)
                                this.layer.rotate(-165/4)
                            }
                            this.layer.pop()
                            this.layer.fill(225,202,187,this.fade)
                            this.layer.rect(0,65.5,3.5,0.4)
                            this.layer.strokeCap(SQUARE)
                            this.layer.noFill()
                            this.layer.stroke(207,217,220,this.fade)
                            this.layer.strokeWeight(0.4)
                            this.layer.beginShape()
                            this.layer.vertex(45.5,45)
                            this.layer.bezierVertex(25,50,-25,50,-45.5,45)
                            this.layer.endShape()
                            this.layer.strokeCap(ROUND)
                            this.layer.pop()
                        }
                    break
                }
            break
            case 'Setsuna':
                switch(type){
                    case 0:
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x*0.9+this.graphics.arms[key].middle.x*0.1,this.graphics.arms[key].bottom.y*0.9+this.graphics.arms[key].middle.y*0.1)
                        this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                        this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                        this.layer.fill(245,250,255,this.fade)
                        this.layer.noStroke()
                        this.layer.rect(0,-25,2.5,50)
                        this.layer.triangle(-1.25,-50,1.25,-50,0,-70)
                        this.layer.fill(160,170,180,this.fade)
                        this.layer.rect(0.625,-25,1.25,50)
                        this.layer.triangle(1.25,-50,0,-70,0,-50)
                        for(let g=0;g<4;g++){
                            this.layer.stroke(75+g*10,40+g*10,50+g*10,this.fade)
                            this.layer.strokeWeight(3.6-g*0.9)
                            this.layer.line(0,-4+g/2,0,2-g/2)
                        }
                        this.layer.pop()
                    break
                    case 1:
                        this.layer.stroke(this.color.band[1][0],this.color.band[1][1],this.color.band[1][2],this.fade*this.fades.band[0])
                        this.layer.strokeWeight(0.3)
                        if(this.trigger.display.extra.damage){
                            this.layer.line(
                                this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-1.1*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-1.1*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-1.925*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-1.925*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90))
                            this.layer.line(
                                this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+1.925*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+1.925*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+1.1*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+1.1*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90))
                        }else{
                            this.layer.line(
                                this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+1.925*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+1.925*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-1.925*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-1.925*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90))
                        }
                        this.layer.stroke(this.color.band[2][0],this.color.band[2][1],this.color.band[2][2],this.fade*this.fades.band[0])
                        this.layer.strokeWeight(0.55)
                        this.layer.line(
                            this.graphics.arms[key].middle.x*0.065+this.graphics.arms[key].bottom.x*0.935+0.6*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.y*0.065+this.graphics.arms[key].bottom.y*0.935+0.6*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.x*0.135+this.graphics.arms[key].bottom.x*0.865-0.6*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.y*0.135+this.graphics.arms[key].bottom.y*0.865-0.6*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90))
                        if(!this.trigger.display.extra.damage){
                            this.layer.line(
                                this.graphics.arms[key].middle.x*0.135+this.graphics.arms[key].bottom.x*0.865+0.6*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.y*0.135+this.graphics.arms[key].bottom.y*0.865+0.6*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.x*0.065+this.graphics.arms[key].bottom.x*0.935-0.6*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.y*0.065+this.graphics.arms[key].bottom.y*0.935-0.6*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90))
                        }
                        this.layer.stroke(this.color.band[3][0],this.color.band[3][1],this.color.band[3][2],this.fade*this.fades.band[0])
                        this.layer.strokeWeight(0.25)
                        this.layer.line(
                            this.graphics.arms[key].middle.x*0.065+this.graphics.arms[key].bottom.x*0.935+0.6*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.y*0.065+this.graphics.arms[key].bottom.y*0.935+0.6*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.x*0.135+this.graphics.arms[key].bottom.x*0.865-0.6*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.y*0.135+this.graphics.arms[key].bottom.y*0.865-0.6*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90))
                        if(!this.trigger.display.extra.damage){
                            this.layer.line(
                                this.graphics.arms[key].middle.x*0.135+this.graphics.arms[key].bottom.x*0.865+0.6*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.y*0.135+this.graphics.arms[key].bottom.y*0.865+0.6*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.x*0.065+this.graphics.arms[key].bottom.x*0.935-0.6*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.y*0.065+this.graphics.arms[key].bottom.y*0.935-0.6*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90))
                        }
                    break
                }
            break
            case 'Edgar':
                switch(type){
                    case 0:
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x*0.9+this.graphics.arms[key].middle.x*0.1,this.graphics.arms[key].bottom.y*0.9+this.graphics.arms[key].middle.y*0.1)
                        this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom-75)))
                        this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom-75)*2,-1,1))
                        this.layer.fill(60,this.fade)
                        this.layer.noStroke()
                        this.layer.rect(0,-14,24,16,2)
                        this.layer.stroke(60,this.fade)
                        this.layer.strokeWeight(2)
                        this.layer.noFill()
                        this.layer.arc(0,-6,8,8,0,180)
                        this.layer.pop()
                    break
                }
            break
            case 'Ume':
                switch(type){
                    case -1:
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x*0.95+this.graphics.arms[key].middle.x*0.05,this.graphics.arms[key].bottom.y*0.95+this.graphics.arms[key].middle.y*0.05)
                        this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                        this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                        this.layer.fill(225,this.fade)
                        this.layer.noStroke()
                        this.layer.rect(0,-12,1,24)
                        this.layer.fill(50,255,200)
                        this.layer.ellipse(0,-24,3,3)
                        this.layer.pop()
                    break
                    default:
                        minorGraphicDisplay(this.layer,type)
                    break
                }
            break
            case 'Goon':
                switch(type){
                    case 0:
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x*0.95+this.graphics.arms[key].middle.x*0.05,this.graphics.arms[key].bottom.y*0.95+this.graphics.arms[key].middle.y*0.05)
                        this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                        this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                        this.layer.fill(150,this.fade)
                        this.layer.noStroke()
                        this.layer.rect(0,-18,3,36)
                        this.layer.pop()
                    break
                }
            break
            case 'Slaver':
                switch(type){
                    case 0:
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x*0.95+this.graphics.arms[key].middle.x*0.05,this.graphics.arms[key].bottom.y*0.95+this.graphics.arms[key].middle.y*0.05)
                        this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                        this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                        this.layer.noFill()
                        this.layer.stroke(200,this.fade)
                        this.layer.strokeWeight(3)
                        this.layer.line(0,12,0,-36)
                        this.layer.arc(0,-36,12,24,0,180)
                        this.layer.pop()
                    break
                }
            break
            case 'Pointy':
                switch(type){
                    case 0:
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x*0.95+this.graphics.arms[key].middle.x*0.05,this.graphics.arms[key].bottom.y*0.95+this.graphics.arms[key].middle.y*0.05)
                        this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75-key*150))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75-key*150)))
                        this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75-key*150)*2,-1,1)*this.anim.sword)
                        this.layer.fill(200,this.fade)
                        this.layer.noStroke()
                        this.layer.rect(0,-12,1.5,24)
                        this.layer.pop()
                    break
                }
            break
            case 'Romeo':
                switch(type){
                    case 0:
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x*0.95+this.graphics.arms[key].middle.x*0.05,this.graphics.arms[key].bottom.y*0.95+this.graphics.arms[key].middle.y*0.05)
                        this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                        this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                        this.layer.fill(80,this.fade)
                        this.layer.noStroke()
                        this.layer.rect(0,-20,2,40)
                        this.layer.pop()
                    break
                }
            break
            case 'Batter':
                switch(type){
                    case 0:
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x*0.9+this.graphics.arms[key].middle.x*0.1,this.graphics.arms[key].bottom.y*0.9+this.graphics.arms[key].middle.y*0.1)
                        this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                        this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                        this.layer.fill(220,180,60,this.fade)
                        this.layer.noStroke()
                        this.layer.rect(0,-18,6,36)
                        this.layer.arc(0,-36,6,4,-180,0)
                        this.layer.pop()
                    break
                }
            break
            case 'Billy Beatup':
                switch(type){
                    case 1:
                        this.layer.stroke(this.color.band[0],this.color.band[1],this.color.band[2],this.fade*this.fades.band)
                        this.layer.strokeWeight(1)
                        this.layer.line(
                            this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+1.925*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+1.925*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-1.925*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-1.925*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90))
                    break
                }
            break
            case 'Lunar Shard': case 'Solar Shard':
                switch(type){
                    case 1:
                        this.layer.stroke(this.color.band[0],this.color.band[1],this.color.band[2],this.fade*this.fades.band)
                        this.layer.strokeWeight(2)
                        this.layer.line(
                            this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+1.85*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+1.85*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-1.85*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-1.85*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90))
                    break
                }
            break
            case 'Coffee Commander':
                switch(type){
                    case 1:
                        this.layer.stroke(this.color.band[0],this.color.band[1],this.color.band[2],this.fade*this.fades.band)
                        this.layer.strokeWeight(1.5)
                        this.layer.line(
                            this.graphics.arms[key].middle.x*0.2+this.graphics.arms[key].bottom.x*0.8+1.8875*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.y*0.2+this.graphics.arms[key].bottom.y*0.8+1.8875*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.x*0.2+this.graphics.arms[key].bottom.x*0.8-1.8875*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.y*0.2+this.graphics.arms[key].bottom.y*0.8-1.8875*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90))
                    break
                }
            break
            case 'Swordmaster':
                switch(type){
                    case 0:
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x*0.9+this.graphics.arms[key].middle.x*0.1,this.graphics.arms[key].bottom.y*0.9+this.graphics.arms[key].middle.y*0.1)
                        this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                        this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                        this.layer.fill(175,this.fade)
                        this.layer.noStroke()
                        this.layer.rect(0,-25,4,50)
                        this.layer.triangle(-2,-50,2,-50,0,-70)
                        this.layer.fill(125,this.fade)
                        this.layer.rect(1,-25,2,50)
                        this.layer.triangle(2,-50,0,-70,0,-50)
                        for(let g=0;g<4;g++){
                            this.layer.stroke(100+g*10,50+g*10,25+g*10,this.fade)
                            this.layer.strokeWeight(4-g)
                            this.layer.line(0,-4+g/2,0,3-g/2)
                        }
                        this.layer.pop()
                    break
                }
            break
            case 'Gas Man':
                switch(type){
                    case 1:
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x,this.graphics.arms[key].bottom.y)
                        this.layer.fill(100,70,35,this.fade)
                        this.layer.noStroke()
                        this.layer.quad(10,-1,8,-3,4,1,6,3)
                        this.layer.fill(120,90,45,this.fade)
                        this.layer.rect(0,10,12,18,2)
                        this.layer.fill(110,80,40,this.fade)
                        this.layer.rect(0,10,2,18)
                        this.layer.rect(0,10,12,2)
                        this.layer.pop()
                    break
                }
            break
            case 'Champion':
                switch(type){
                    case 0:
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x*0.95+this.graphics.arms[key].middle.x*0.05,this.graphics.arms[key].bottom.y*0.95+this.graphics.arms[key].middle.y*0.05)
                        this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                        this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                        this.layer.fill(240,this.fade)
                        this.layer.noStroke()
                        this.layer.rect(0,-16,2,32)
                        this.layer.pop()
                    break
                }
            break
            case 'Assistant Hiring Officer':
                switch(type){
                    case 1:
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x,this.graphics.arms[key].bottom.y)
                        this.layer.noStroke()
                        this.layer.fill(90,60,30,this.fade)
                        this.layer.rect(0,10,12,18,2)
                        this.layer.fill(220,this.fade)
                        this.layer.rect(0,10,10,16)
                        this.layer.fill(0,this.fade)
                        this.layer.rect(0,4,8,1)
                        this.layer.rect(0,6,8,1)
                        this.layer.pop()
                    break
                }
            break
            case 'Purge X02':
                switch(type){
                    case 0:
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x*0.85+this.graphics.arms[key].middle.x*0.15,this.graphics.arms[key].bottom.y*0.85+this.graphics.arms[key].middle.y*0.15)
                        this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                        this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                        this.layer.stroke(175,75,175,this.fade/2)
                        this.layer.strokeWeight(12)
                        this.layer.line(0,0,0,-36)
                        this.layer.stroke(175,75,175,this.fade)
                        this.layer.strokeWeight(6)
                        this.layer.line(0,0,0,-36)
                        this.layer.pop()
                    break
                }
            break
            case 'Billy Beatup':
                switch(type){
                    case 1:
                        this.layer.stroke(this.color.band[0],this.color.band[1],this.color.band[2],this.fade*this.fades.band)
                        this.layer.strokeWeight(1.5)
                        this.layer.line(
                            this.graphics.arms[key].middle.x*0.35+this.graphics.arms[key].bottom.x*0.65+1.9*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.y*0.35+this.graphics.arms[key].bottom.y*0.65+1.9*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.x*0.35+this.graphics.arms[key].bottom.x*0.65-1.9*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.y*0.35+this.graphics.arms[key].bottom.y*0.65-1.9*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90))
                    break
                }
            break
            case 'Vengeful':
                switch(type){
                    case 0:
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x*0.95+this.graphics.arms[key].middle.x*0.05,this.graphics.arms[key].bottom.y*0.95+this.graphics.arms[key].middle.y*0.05)
                        this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                        this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                        this.layer.stroke(60,145,255,this.fade)
                        this.layer.strokeWeight(3)
                        this.layer.line(0,0,0,-32)
                        this.layer.pop()
                    break
                }
            break
            case 'Lunaria':
                switch(type){
                    case 0:
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x*0.95+this.graphics.arms[key].middle.x*0.05,this.graphics.arms[key].bottom.y*0.95+this.graphics.arms[key].middle.y*0.05)
                        this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                        this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                        this.layer.stroke(90,this.fade)
                        this.layer.strokeWeight(2)
                        this.layer.fill(135,this.fade/2)
                        this.layer.line(0,10,0,-30)
                        this.layer.line(0,-30,-3,-27)
                        this.layer.line(0,-30,3,-27)
                        this.layer.ellipse(-5,-20,10,10)
                        this.layer.ellipse(5,-20,10,10)
                        this.layer.fill(255,this.fade)
                        this.layer.stroke(255,235,235,this.fade)
                        this.layer.strokeWeight(1)
                        this.layer.beginShape()
                        this.layer.vertex(-5,-18)
                        this.layer.bezierVertex(-4,-19,-4,-21,-5,-22)
                        this.layer.bezierVertex(-4.5,-21,-4.5,-19,-5,-18)
                        this.layer.bezierVertex(-4,-19,-4,-21,-5,-22)
                        this.layer.bezierVertex(-4.5,-21,-4.5,-19,-5,-18)
                        this.layer.endShape()
                        this.layer.noFill()
                        this.layer.stroke(255,145,70,this.fade)
                        this.layer.ellipse(5,-20,5,5)
                        for(g=0,lg=8;g<lg;g++){
                            this.layer.line(5+2.5*lsin(g/lg*360),-20+2.5*lcos(g/lg*360),5+3.5*lsin(g/lg*360),-20+3.5*lcos(g/lg*360))
                        }
                        this.layer.pop()
                    break
                }
            break
            case 'Divine Guard':
                switch(type){
                    case 0:
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x*0.95+this.graphics.arms[key].middle.x*0.05,this.graphics.arms[key].bottom.y*0.95+this.graphics.arms[key].middle.y*0.05)
                        this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                        this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                        this.layer.stroke(255,this.fade)
                        this.layer.strokeWeight(2)
                        this.layer.line(4,-32,-4,-34)
                        this.layer.line(4,-28,-4,-30)
                        this.layer.stroke(180,150,60,this.fade)
                        this.layer.strokeWeight(3)
                        this.layer.line(0,7,0,-38)
                        this.layer.stroke(255,this.fade)
                        this.layer.strokeWeight(2)
                        this.layer.line(-4,-34,4,-36)
                        this.layer.line(-4,-30,4,-32)
                        this.layer.line(-4,-26,4,-28)
                        this.layer.noStroke()
                        this.layer.fill(255,250,220,this.fade)
                        this.layer.triangle(-6,-40,6,-40,0,-52)
                        this.layer.pop()
                    break
                    case 1:
                        this.layer.stroke(this.color.band[0],this.color.band[1],this.color.band[2],this.fade*this.fades.band)
                        this.layer.strokeWeight(1.5)
                        this.layer.line(
                            this.graphics.arms[key].middle.x*0.35+this.graphics.arms[key].bottom.x*0.65+1.8875*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.y*0.35+this.graphics.arms[key].bottom.y*0.65+1.8875*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.x*0.35+this.graphics.arms[key].bottom.x*0.65-1.8875*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.y*0.35+this.graphics.arms[key].bottom.y*0.65-1.8875*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90))
                    break
                }
            break
            case 'Avant Guard':
                switch(type){
                    case 0:
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x*0.95+this.graphics.arms[key].middle.x*0.05,this.graphics.arms[key].bottom.y*0.95+this.graphics.arms[key].middle.y*0.05)
                        this.layer.rotate(90+90*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75))-this.spin.sword*sign(lsin(this.anim.direction+this.spin.arms[key].bottom+75)))
                        this.layer.scale(1,constrain(lsin(this.anim.direction+this.spin.arms[key].bottom+75)*2,-1,1)*this.anim.sword)
                        this.layer.noStroke()
                        this.layer.fill(10,12,14,this.fade)
                        this.layer.rect(0,-11,4,44)
                        this.layer.fill(30,36,42,this.fade)
                        this.layer.arc(0,-33,36,36,-45,45)
                        this.layer.arc(0,-33,36,36,135,225)
                        this.layer.fill(255,250,215,this.fade)
                        this.layer.arc(0,-33,24,24,-45,45)
                        this.layer.arc(0,-33,24,24,135,225)
                        this.layer.fill(30,36,42,this.fade)
                        this.layer.arc(0,-33,21,21,-45,45)
                        this.layer.arc(0,-33,21,21,135,225)
                        this.layer.ellipse(0,-33,6,6)
                        this.layer.pop()
                    break
                    case 1:
                        this.layer.stroke(this.color.band[0],this.color.band[1],this.color.band[2],this.fade*this.fades.band)
                        this.layer.strokeWeight(1)
                        this.layer.line(
                            this.graphics.arms[key].middle.x*0.275+this.graphics.arms[key].bottom.x*0.725+1.9*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.y*0.275+this.graphics.arms[key].bottom.y*0.725+1.9*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.x*0.275+this.graphics.arms[key].bottom.x*0.725-1.9*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.y*0.275+this.graphics.arms[key].bottom.y*0.725-1.9*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90))
                        this.layer.line(
                            this.graphics.arms[key].middle.x*0.15+this.graphics.arms[key].bottom.x*0.85+1.9*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.y*0.15+this.graphics.arms[key].bottom.y*0.85+1.9*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.x*0.15+this.graphics.arms[key].bottom.x*0.85-1.9*lsin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                            this.graphics.arms[key].middle.y*0.15+this.graphics.arms[key].bottom.y*0.85-1.9*lcos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90))
                    break
                }
            break
            case 'Navigator':
                switch(type){
                    case 1:
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x,this.graphics.arms[key].bottom.y)
                        this.layer.noStroke()
                        this.layer.fill(200,180,40,this.fade)
                        this.layer.rect(0,10,12,18,2)
                        this.layer.fill(200,160,20,this.fade)
                        this.layer.rect(0,10,10,16)
                        this.layer.fill(160,120,0,this.fade)
                        this.layer.rect(0,6,1,6)
                        this.layer.rect(0,14,1,6)
                        this.layer.rect(-3,10,1,6)
                        this.layer.rect(3,10,1,6)
                        this.layer.pop()
                    break
                }
            break
            case 'Rich Kid':
                switch(type){
                    case 1:
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x,this.graphics.arms[key].bottom.y)
                        this.layer.noStroke()
                        this.layer.fill(this.color.chocolate[0],this.color.chocolate[1],this.color.chocolate[2],this.fade*this.fades.chocolate)
                        this.layer.rect(0,4,13,9)
                        this.layer.fill(this.color.chocolate[0]-20,this.color.chocolate[1]-20,this.color.chocolate[2]-20,this.fade*this.fades.chocolate)
                        this.layer.rect(-4,2,3,3)
                        this.layer.rect(-4,6,3,3)
                        this.layer.rect(0,2,3,3)
                        this.layer.rect(0,6,3,3)
                        this.layer.rect(4,2,3,3)
                        this.layer.rect(4,6,3,3)
                        this.layer.pop()
                    break
                }
            break
        }
    }
    minorDisplayGeneral(type,key){
        switch(type){
            case 0:
                this.layer.noFill()
                if(this.anim.eyeStyle[key]==5){
                    this.layer.stroke(this.color.eye.back[0],this.color.eye.back[1],this.color.eye.back[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((6-this.anim.eye[key]*3)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                    if(this.anim.eye[key]==0){
                        this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel)
                        this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel)
                    }else{
                        this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2)
                        this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2)
                    }
                    this.layer.stroke(this.color.eye.front[0],this.color.eye.front[1],this.color.eye.front[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((6-this.anim.eye[key]*2)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                    if(this.anim.eye[key]==0){
                        this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2)
                        this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2)
                    }else{
                        this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                        this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                    }
                    if(this.anim.eye[key]==0&&constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1)>0){
                        this.layer.stroke(this.color.eye.glow[0],this.color.eye.glow[1],this.color.eye.glow[2],this.fade*this.fades.eye[key]/4)
                        this.layer.strokeWeight(0.6)
                        this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*(this.parts.minor+0.5),this.parts.eyeLevel,2.7*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),2.7*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),-72,-12)
                        if(this.anim.eyeStyle[key]==4){
                            this.layer.stroke(this.color.eye.back[0],this.color.eye.back[1],this.color.eye.back[2],this.fade*this.fades.eye[key])
                            this.layer.strokeWeight(0.5)
                            this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor,this.parts.eyeLevel,10*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),10*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),-165+key*90,-105+key*90)
                        }
                    }
                }else if(this.anim.eyeStyle[key]==3&&this.anim.eye[key]>0){
                    this.layer.stroke(this.color.eye.back[0],this.color.eye.back[1],this.color.eye.back[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((4-this.anim.eye[key]*3)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2)
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel)
                    this.layer.stroke(this.color.eye.front[0],this.color.eye.front[1],this.color.eye.front[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((3-this.anim.eye[key]*2)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2+this.anim.eye[key]*2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2)
                }else if(this.anim.eyeStyle[key]==2&&this.anim.eye[key]>0){
                    this.layer.stroke(this.color.eye.back[0],this.color.eye.back[1],this.color.eye.back[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((4-this.anim.eye[key]*3)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                    this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor,this.parts.eyeLevel-1*this.anim.eye[key],3*this.anim.eye[key],4*this.anim.eye[key],30,150)
                    this.layer.stroke(this.color.eye.front[0],this.color.eye.front[1],this.color.eye.front[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((3-this.anim.eye[key]*2)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                    this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5),this.parts.eyeLevel-1*this.anim.eye[key],3*this.anim.eye[key],4*this.anim.eye[key],30,150)
                }else if(this.anim.eyeStyle[key]==1&&this.anim.eye[key]>0){                    
                    this.layer.stroke(this.color.eye.back[0],this.color.eye.back[1],this.color.eye.back[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((4-this.anim.eye[key]*3)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                    this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor,this.parts.eyeLevel+2*this.anim.eye[key],3*this.anim.eye[key],4*this.anim.eye[key],-150,-30)
                    this.layer.stroke(this.color.eye.front[0],this.color.eye.front[1],this.color.eye.front[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((3-this.anim.eye[key]*2)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                    this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5),this.parts.eyeLevel+2*this.anim.eye[key],3*this.anim.eye[key],4*this.anim.eye[key],-150,-30)
                }else{
                    this.layer.stroke(this.color.eye.back[0],this.color.eye.back[1],this.color.eye.back[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((4-this.anim.eye[key]*3)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                    if(this.anim.eye[key]==0){
                        this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel)
                        this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel)
                    }else{
                        this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2)
                        this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2)
                    }
                    this.layer.stroke(this.color.eye.front[0],this.color.eye.front[1],this.color.eye.front[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((3-this.anim.eye[key]*2)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                    if(this.anim.eye[key]==0){
                        this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2)
                        this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2)
                    }else{
                        this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                        this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                    }
                    if(this.anim.eye[key]==0&&constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1)>0){
                        this.layer.stroke(this.color.eye.glow[0],this.color.eye.glow[1],this.color.eye.glow[2],this.fade*this.fades.eye[key]/4)
                        this.layer.strokeWeight(0.6)
                        this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*(this.parts.minor+0.5),this.parts.eyeLevel,1.8*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),1.8*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),-72,-12)
                        if(this.anim.eyeStyle[key]==4){
                            this.layer.stroke(this.color.eye.back[0],this.color.eye.back[1],this.color.eye.back[2],this.fade*this.fades.eye[key])
                            this.layer.strokeWeight(0.5)
                            this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor,this.parts.eyeLevel,6.5*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),6.5*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),-165+key*90,-105+key*90)
                        }
                    }
                }
            break
            case 1:
                this.calc.int=this.anim.mouth.x/this.anim.mouth.y*lcos(this.anim.direction)/(0.5+lcos(this.anim.direction)*0.5)
                if(this.anim.mouth.open>0){
                    this.layer.fill(this.color.mouth.in[0],this.color.mouth.in[1],this.color.mouth.in[2],this.fade*this.fades.mouth)
                }else{
                    this.layer.noFill()
                }
                this.layer.stroke(this.color.mouth.out[0],this.color.mouth.out[1],this.color.mouth.out[2],this.fade*this.fades.mouth)
                this.layer.strokeWeight(0.5-this.anim.mouth.open*0.25)
                this.layer.arc(lsin(this.anim.direction)*(this.parts.minor-2),this.parts.mouth,this.anim.mouth.x*lcos(this.anim.direction),this.anim.mouth.y*(0.5+lcos(this.anim.direction)*0.5),this.spin.mouth,180-this.spin.mouth)
                this.layer.strokeWeight(0.25*this.anim.mouth.open)
                this.layer.line(lsin(this.anim.direction)*(this.parts.minor-2)-this.anim.mouth.x/2*lcos(this.anim.direction),this.parts.mouth,lsin(this.anim.direction)*(this.parts.minor-2)+this.anim.mouth.x/2*lcos(this.anim.direction),this.parts.mouth)
            break
            case 2:
                this.layer.noFill()
                if(this.anim.eyeStyle[key]==3&&this.anim.eye[key]>0){
                    this.layer.stroke(this.color.eye.back[0],this.color.eye.back[1],this.color.eye.back[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((2.5-this.anim.eye[key]*1.75)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2)
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel)
                    this.layer.stroke(this.color.eye.front[0],this.color.eye.front[1],this.color.eye.front[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((2-this.anim.eye[key]*1.25)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                    this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2+this.anim.eye[key]*2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2)
                }else if(this.anim.eyeStyle[key]==2&&this.anim.eye[key]>0){
                    this.layer.stroke(this.color.eye.back[0],this.color.eye.back[1],this.color.eye.back[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((2.5-this.anim.eye[key]*1.75)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                    this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor,this.parts.eyeLevel-1*this.anim.eye[key],3*this.anim.eye[key],4*this.anim.eye[key],30,150)
                    this.layer.stroke(this.color.eye.front[0],this.color.eye.front[1],this.color.eye.front[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((2-this.anim.eye[key]*1.25)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                    this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5),this.parts.eyeLevel-1*this.anim.eye[key],3*this.anim.eye[key],4*this.anim.eye[key],30,150)
                }else if(this.anim.eyeStyle[key]==1&&this.anim.eye[key]>0){                    
                    this.layer.stroke(this.color.eye.back[0],this.color.eye.back[1],this.color.eye.back[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((2.5-this.anim.eye[key]*1.75)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                    this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor,this.parts.eyeLevel+2*this.anim.eye[key],3*this.anim.eye[key],4*this.anim.eye[key],-150,-30)
                    this.layer.stroke(this.color.eye.front[0],this.color.eye.front[1],this.color.eye.front[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((2-this.anim.eye[key]*1.25)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                    this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5),this.parts.eyeLevel+2*this.anim.eye[key],3*this.anim.eye[key],4*this.anim.eye[key],-150,-30)
                }else{
                    this.layer.stroke(this.color.eye.back[0],this.color.eye.back[1],this.color.eye.back[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((2.5-this.anim.eye[key]*1.75)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                    if(this.anim.eye[key]==0){
                        this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel)
                        this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel)
                    }else{
                        this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2)
                        this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2)
                        this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2)
                        this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor,this.parts.eyeLevel,lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2)
                    }
                    this.layer.stroke(this.color.eye.front[0],this.color.eye.front[1],this.color.eye.front[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((2-this.anim.eye[key]*1.25)*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1))
                    if(this.anim.eye[key]==0){
                        this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2)
                        this.layer.point(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2)
                    }else{
                        this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5),this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                        this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5),this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)+(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                        this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5),this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                        this.layer.line(lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5),this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,lsin(this.spin.eye[key]+this.anim.head)*((this.parts.minor+0.5)-this.anim.eye[key]*0.5)-(key*2-1)*lcos(this.spin.eye[key]+this.anim.head)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                    }
                    if(this.anim.eye[key]==0&&constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1)>0){
                        this.layer.stroke(this.color.eye.glow[0],this.color.eye.glow[1],this.color.eye.glow[2],this.fade*this.fades.eye[key]/4)
                        this.layer.strokeWeight(0.4)
                        this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*(this.parts.minor+0.5),this.parts.eyeLevel,1.2*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),1.2*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),-72,-12)
                        if(this.anim.eyeStyle[key]==4){
                            this.layer.stroke(this.color.eye.back[0],this.color.eye.back[1],this.color.eye.back[2],this.fade*this.fades.eye[key])
                            this.layer.strokeWeight(0.3)
                            this.layer.arc(lsin(this.spin.eye[key]+this.anim.head)*this.parts.minor,this.parts.eyeLevel,4.5*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),4.5*constrain(lcos(this.spin.eye[key]+this.anim.head)*5,0,1),-165+key*90,-105+key*90)
                        }
                    }
                }
            break
        }
    }
    displayInfoInternal(){
        this.layer.noStroke()
        this.layer.fill(150,this.fade*this.infoAnim.life)
        this.layer.rect(0,0,50,6,3)
        if(!this.battle.modded(8)||this.team!=0){
            if(this.collect.life>=this.life){
                this.layer.fill(240,0,0,this.fade*this.infoAnim.life)
                this.layer.rect((max(0,this.collect.life)/this.base.life)*25-25,0,(max(0,this.collect.life)/this.base.life)*50,2+min((max(0,this.collect.life)/this.base.life)*80,4),3)
                this.layer.fill(min(255,510-max(0,this.life)/this.base.life*510)-max(0,5-max(0,this.life)/this.base.life*30)*25,max(0,this.life)/this.base.life*510,0,this.fade*this.infoAnim.life)
                this.layer.rect((max(0,this.life)/this.base.life)*25-25,0,(max(0,this.life)/this.base.life)*50,2+min((max(0,this.life)/this.base.life)*80,4),3)
            }else if(this.collect.life<this.life){
                this.layer.fill(240,0,0,this.fade*this.infoAnim.life)
                this.layer.rect((max(0,this.life)/this.base.life)*25-25,0,(max(0,this.life)/this.base.life)*50,2+min((max(0,this.life)/this.base.life)*80,4),3)
                this.layer.fill(min(255,510-max(0,this.collect.life)/this.base.life*510)-max(0,5-max(0,this.collect.life)/this.base.life*30)*25,max(0,this.collect.life)/this.base.life*510,0,this.fade*this.infoAnim.life)
                this.layer.rect((max(0,this.collect.life)/this.base.life)*25-25,0,(max(0,this.collect.life)/this.base.life)*50,2+min((max(0,this.collect.life)/this.base.life)*80,4),3)
            }
        }
        this.layer.noFill()
        this.layer.stroke(0,this.fade*this.infoAnim.life)
        this.layer.strokeWeight(0.75)
        this.layer.rect(0,0,51,6.75,3.75)
        this.layer.noStroke()
        if(this.infoAnim.block>0){
            this.layer.fill(0,this.fade*this.infoAnim.block)
            this.layer.ellipse(-28,0,11.5,11.5)
            this.layer.fill(150,175,200,this.fade*this.infoAnim.block)
            this.layer.ellipse(-28,0,10,10)
        }
        if(this.team==0){
            this.layer.fill(0,this.fade*this.infoAnim.life)
            this.layer.ellipse(28,0,11.5,11.5)
            this.layer.fill(200,100,100,this.fade*this.infoAnim.life)
            this.layer.ellipse(28,0,10,10)
        }
        for(let a=0,la=this.status.display.length;a<la;a++){
            displayStatusSymbol(this.layer,this.status.position[this.status.display[a]],12,this.status.display[a],0,this.status.size[this.status.display[a]],this.fade*this.infoAnim.life)
        }
        if(this.team==0||this.construct||this.support){
            for(let a=0,la=this.attack.length;a<la;a++){
                if(this.infoAnim.intent[a]>0){
                    displayIntentSymbol(this.layer,0,-12,this.attack[a].type,this.attack[a].effect,0,1,this.fade*this.infoAnim.intent[a],!this.battle.relicManager.hasRelic(136,-1))
                }
            }
        }
        this.layer.fill(0,this.fade*this.infoAnim.life)
        this.layer.textSize(6)
        if(this.battle.modded(104)&&this.team==0){
            this.layer.text('?',0,0.5)
        }else if(this.battle.modded(8)&&this.team==0){
            this.layer.text(max(0,ceil(this.life*10)/10),0,0.5)
        }else{
            this.layer.text(max(0,ceil(this.life*10)/10)+'/'+max(0,ceil(this.base.life*10)/10),0,0.5)
        }
        if(this.infoAnim.block>0){
            this.layer.fill(0,this.fade*this.infoAnim.block)
            this.layer.text(ceil(this.block*10)/10,-28,0.5)
        }
        this.layer.fill(0,this.fade*this.infoAnim.life)
        if(this.team==0){
            this.layer.text(this.order,28,0.5)
        }
        for(let a=0,la=this.status.display.length;a<la;a++){
            if(this.status.size[this.status.display[a]]>0){
                this.layer.textSize(8*this.status.size[this.status.display[a]])
                this.layer.text(this.status.main[this.status.display[a]],this.status.position[this.status.display[a]],12)
            }
        }
        if(this.infoAnim.balance>0){
            this.layer.noStroke()
            for(let a=0,la=10;a<la;a++){
                this.layer.fill(255,200*a/la,200*a/la,this.fade*this.infoAnim.balance)
                this.layer.rect(-18+a*4,-8,4,5)
            }
            this.layer.stroke(0,this.fade*this.infoAnim.balance)
            this.layer.strokeWeight(1)
            this.layer.noFill()
            this.layer.rect(0,-8,40,5,2)
            this.layer.stroke(255,this.fade*this.infoAnim.balance)
            this.layer.line(-19+38/this.balanceCap*constrain(this.balance,0,this.balanceCap),-11,-19+38/this.balanceCap*constrain(this.balance,0,this.balanceCap),-5)
            this.layer.fill(255,this.fade*this.infoAnim.balance)
            this.layer.noStroke()
            this.layer.textSize(5)
            this.layer.text(this.balance,0,-8)
        }
    }
    displayInfo(scene){
        switch(scene){
            case 'battle':
                if(this.fade>0&&this.infoAnim.size>0){
                    this.layer.push()
                    this.layer.translate(this.position.x+this.offset.life.x,this.position.y+this.offset.life.y)
                    this.layer.scale(this.infoAnim.size)
                    this.displayInfoInternal()
                    this.layer.pop()
                }
            break
            case 'overlay':
                if(this.fade>0&&this.infoAnim.description>0){
                    if(this.team>0&&!this.construct&&!this.support){
                        this.layer.fill(mergeColor(types.color.card[this.type].fill,[150,150,150],0.5)[0],mergeColor(types.color.card[this.type].fill,[150,150,150],0.5)[1],mergeColor(types.color.card[this.type].fill,[150,150,150],0.5)[2],this.fade*this.infoAnim.description)
                    }else{
                        this.layer.fill(150,this.fade*this.infoAnim.description)
                    }
                    this.layer.noStroke()
                    this.layer.rect(100,300,160,240,10)
                    this.layer.fill(0,this.fade*this.infoAnim.description)
                    this.layer.textSize(this.name.length>=20?12:16)
                    this.layer.text(this.name,100,200)
                    this.layer.textSize(8)
                    this.layer.text(this.description,100,240)
                    this.layer.textSize(6)
                    this.layer.textAlign(LEFT,CENTER)
                    if(this.team==0||this.construct||this.support){
                        for(let a=0,la=min(6,this.status.display.length);a<la;a++){
                            this.layer.text(this.status.name[this.status.display[a]],50,305+a*20+this.spec.length*15)
                        }
                    }else{
                        for(let a=0,la=min(6,this.status.display.length);a<la;a++){
                            this.layer.text(this.status.name[this.status.display[a]],50,305+a*20)
                        }
                    }
                    if(this.team==0||this.construct||this.support){
                        for(let a=0,la=this.attack.length;a<la;a++){
                            this.layer.fill(0,this.fade*this.infoAnim.description*this.infoAnim.intent[a])
                            this.layer.text(intentDescription(this.attack[a],this,!this.battle.relicManager.hasRelic(136,-1)),60,280)
                        }
                        this.layer.fill(0,this.fade*this.infoAnim.description)
                        for(let a=0,la=this.spec.length;a<la;a++){
                            switch(this.spec[a]){
                                case 0: this.layer.text('Will Turn to Face Player',40,305+a*15); break
                                case 1: this.layer.text('Moves When You Move',40,305+a*15); break
                                case 2: this.layer.text('Boss',40,305+a*15); break
                                case 3: this.layer.text('Immune to Spikes and Mines',40,305+a*15); break
                                case 4: this.layer.text('Immune to Traps',40,305+a*15); break
                                case 5: this.layer.text('Slimes Tiles Moved On',40,305+a*15); break
                                case 6: this.layer.text('Spawns Slimes Every 20 HP Lost',40,305+a*15); break
                                case 7: this.layer.text('Attacks When You Move',40,305+a*15); break
                                case 8: this.layer.text('Attacks When You Play a Card',40,305+a*15); break
                                case 9: this.layer.text('Untargettable From Front',40,305+a*15); break
                                case 10: this.layer.text('Attacks When Injured',40,305+a*15); break
                                case 11: this.layer.text('Immune to Poison Tiles',40,305+a*15); break
                                case 12: this.layer.text('Co-Boss',40,305+a*15); break
                                case 13: this.layer.text('On Survival, Heal 20 HP',40,305+a*15); break
                                case 14: this.layer.text('On Survival, Deluxe Upgrade Card',40,305+a*15); break
                                case 15: this.layer.text('On Survival, Move Freely',40,305+a*15); break
                                case 16: this.layer.text('On Survival, Gain 25 Currency',40,305+a*15); break
                                case 17: this.layer.text('Auto-Aims',40,305+a*15); break

                            }
                        }
                    }
                    this.layer.textAlign(CENTER,CENTER)
                    if(this.team==0||this.construct||this.support){
                        for(let a=0,la=min(6,this.status.display.length);a<la;a++){
                            displayStatusSymbol(this.layer,40,305+a*20+this.spec.length*15,this.status.display[a],0,this.status.size[this.status.display[a]]*1.5,this.fade*this.infoAnim.description*this.infoAnim.life)
                        }
                    }else{
                        for(let a=0,la=min(6,this.status.display.length);a<la;a++){
                            displayStatusSymbol(this.layer,40,305+a*20,this.status.display[a],0,this.status.size[this.status.display[a]]*1.5,this.fade*this.infoAnim.description*this.infoAnim.life)
                        }
                    }
                    this.layer.fill(0,this.fade*this.infoAnim.description)
                    this.layer.textSize(12)
                    if(this.team==0||this.construct||this.support){
                        for(let a=0,la=min(6,this.status.display.length);a<la;a++){
                            this.layer.text(this.status.main[this.status.display[a]],40,305+a*20+this.spec.length*15)
                        }
                    }else{
                        for(let a=0,la=min(6,this.status.display.length);a<la;a++){
                            this.layer.text(this.status.main[this.status.display[a]],40,305+a*20)
                        }
                    }
                    if(this.team==0||this.construct||this.support){
                        for(let a=0,la=this.attack.length;a<la;a++){
                            if(this.infoAnim.intent[a]>0){
                                displayIntentSymbol(this.layer,40,280,this.attack[a].type,this.attack[a].effect,0,1.5,this.fade*this.infoAnim.description*this.infoAnim.intent[a],!this.battle.relicManager.hasRelic(136,-1))
                            }
                        }
                    }
                }
            break
            case 'rest':
                this.layer.push()
                this.layer.translate(350-this.id*100,495)
                this.layer.scale(1.5)
                this.displayInfoInternal()
                this.layer.pop()
            break
            case 'event':
                this.layer.push()
                this.layer.translate(100+this.id*700,510)
                this.layer.scale(1.5)
                this.displayInfoInternal()
                this.layer.pop()
            break
            case 'food':
                this.layer.push()
                this.layer.translate(450,300)
                this.layer.scale(1.5)
                this.fade=1
                this.infoAnim.life=1
                this.displayInfoInternal()
                this.layer.pop()
            break
        }
    }
    updatePassive(){
        this.collect.life=this.collect.life*0.9+this.life*0.1
    }
    updatePassiveAnimLife(){
        this.infoAnim.life=smoothAnim(this.infoAnim.life,this.life>0,0,1,5)
    }
    update(){
        this.updatePassive()
        this.tilePosition.x=round(this.tilePosition.x)
        this.tilePosition.y=round(this.tilePosition.y)
        if(this.life<=0&&this.status.main[137]>0){
            this.life=1
        }
        if(this.team>0&&!this.construct&&!this.support){
            this.fade=1
            for(let a=0,la=this.infoAnim.stance.length;a<la;a++){
                this.infoAnim.stance[a]=smoothAnim(this.infoAnim.stance[a],a==this.stance,0,1,5)
            }
            for(let a=0,la=this.infoAnim.faith.length;a<la;a++){
                this.infoAnim.faith[a]=smoothAnim(this.infoAnim.faith[a],this.faith>a,0,1,5)
            }
            if(this.faith>=10&&this.infoAnim.faith[9]>=1){
                this.faith-=10
                this.enterStance(5)
            }
            if(this.life<=0){
                this.battle.itemManager.activateDeath(this.id)
                if(this.life<=0){
                    if(!this.dead){
                        if(this.battle.relicManager.hasRelic(81,this.id)){
                            this.battle.relicManager.active[81]--
                            if(this.battle.relicManager.active[81]<=0){
                                this.battle.relicManager.deactivate(81)
                            }
                            this.healLifable(round(this.base.life*5)/10)
                        }else{
                            this.dead=true
                            this.startAnimation(7)
                            this.deTarget()
                            let allDead=true
                            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                                if(this.battle.combatantManager.combatants[a].team>0&&this.battle.combatantManager.combatants[a].life>0&&!this.battle.combatantManager.combatants[a].construct&&!this.battle.combatantManager.combatants[a].support){
                                    allDead=false
                                }
                            }
                            if(this.battle.turn.main==this.id&&this.battle.turnManager.turns.length==0||this.battle.turnManager.auxiliary){
                                this.battle.endTurn()
                            }
                            if(allDead){
                                this.battle.result.defeat=true
                            }
                        }
                    }else{
                        this.runAnimation(1/15,7)
                    }
                }
            }
        }else if(this.construct){
            this.fade=smoothAnim(this.fade,this.life>0&&this.status.main[51]<=0,0,1,15)
            this.infoAnim.life=smoothAnim(this.infoAnim.life,this.life>0,0,1,5)
            if(this.life<=0&&!this.dead&&this.team>0){
                this.dead=true
                this.battle.tileManager.activate()
                this.battle.updateTargetting()
                if(this.status.main[80]>0){
                    this.battle.combatantManager.damageAreaID(this.base.life,this.id,this.id,this.tilePosition)
                }
                if(this.status.main[199]>0){
                    this.battle.combatantManager.damageAreaID(this.status.main[199],this.id,this.id,this.tilePosition)
                    this.battle.particleManager.particles.push(new particle(this.layer,this.position.x,this.position.y,10,[30]))
                }
                if(this.team<=this.battle.players){
                    if(!this.programmedDeath){
                        this.battle.cardManagers[this.team-1].deCard(1,'Unbuild')
                    }
                    if(this.name=='Teleporter Start'){
                        this.battle.cardManagers[this.team-1].deCard(1,'Use Teleporter\nStart')
                    }else if(this.name=='Teleporter End'){
                        this.battle.cardManagers[this.team-1].deCard(1,'Use Teleporter\nEnd')
                    }
                }
            }
        }else if(this.support){
            this.fade=smoothAnim(this.fade,this.life>0&&this.status.main[51]<=0,0,1,15)
            this.infoAnim.life=smoothAnim(this.infoAnim.life,this.life>0,0,1,5)
            if(this.life<=0&&!this.dead){
                this.dead=true
                this.deTarget()
                this.battle.tileManager.activate()
                this.battle.updateTargetting()
                if(this.battle.modded(114)){
                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Soul',types.combatant),this.goal.anim.direction)
                }
            }
        }else{
            this.fade=smoothAnim(this.fade,this.life>0&&this.status.main[51]<=0,0,1,15)
            this.infoAnim.life=smoothAnim(this.infoAnim.life,this.life>0,0,1,5)
            if(this.life<=0&&!this.dead){
                this.dead=true
                this.battle.tileManager.activate()
                this.battle.counter.killed++
                this.battle.updateTargetting()
                if(this.battle.turn.main<this.battle.players){
                    this.battle.cardManagers[this.battle.turn.main].hand.deathEffect()
                }
                if(!this.minion){
                    this.battle.relicManager.activate(3)
                }
                if(this.battle.turn.main<this.battle.players){
                    this.battle.stats.killed[this.battle.turn.main]++
                }
                if(this.spec.includes(2)){
                    this.battle.combatantManager.allEffect(2,[0])
                    this.battle.clearReinforce()
                }
                if(this.status.main[42]>0){
                    this.battle.overlayManager.overlays[25][floor(random(0,this.battle.players))].active=true
                    this.battle.overlayManager.overlays[25][floor(random(0,this.battle.players))].activate([0,[
                            {type:0,value:[this.status.main[42]]}]])
                }
                if(this.status.main[80]>0){
                    this.battle.combatantManager.damageAreaID(this.base.life,this.id,this.id,this.tilePosition)
                }
                if(this.status.main[199]>0){
                    this.battle.combatantManager.damageAreaID(this.status.main[199],this.id,this.id,this.tilePosition)
                    this.battle.particleManager.particles.push(new particle(this.layer,this.position.x,this.position.y,10,[30]))
                }
                this.battle.combatantManager.dead()
                if(this.battle.modded(17)){
                    for(let a=0,la=this.battle.players;a<la;a++){
                        for(let b=0,lb=3;b<lb;b++){
                            if(this.battle.cardManagers[a].reserve.cards.length>0){
                                this.battle.cardManagers[a].randomEffect(1,8,[])
                            }else{
                                this.battle.cardManagers[a].randomEffect(3,8,[])
                            }
                        }
                    }
                }
                if(this.battle.modded(55)&&this.battle.turn.main<this.battle.players){
                    this.battle.energy.main[this.battle.turn.main]--
                }
                if(this.battle.modded(55)){
                    for(let a=0,la=this.battle.players;a<la;a++){
                        this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(a)].statusEffect('Weak',2)
                    }
                }
                if(this.battle.modded(56)){
                    for(let a=0,la=this.battle.players;a<la;a++){
                        this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(a)].statusEffect('Vulnerable',2)
                    }
                }
                if(this.battle.modded(107)){
                    for(let a=0,la=this.battle.players;a<la;a++){
                        this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(a)].statusEffect(['Burn','Freeze'][floor(random(0,2))],1)
                    }
                }
                if(this.name=='Prestige'&&this.base.life>10){
                    this.doubleHalf()
                    this.battle.updateTargetting()
                    this.dead=false
                    this.battle.tileManager.activate()
                    this.battle.counter.killed--
                }else if(this.battle.modded(100)&&this.base.life>1){
                    this.life=1
                    this.base.life=1
                    this.collect.life=1
                    this.battle.updateTargetting()
                    this.dead=false
                    this.battle.tileManager.activate()
                    this.battle.counter.killed--
                }else{
                    let type=0
                    for(let a=0,la=1+(this.battle.modded(71)?1:0);a<la;a++){
                        if(this.battle.modded(72)&&floor(random(0,2))==0&&this.initialName!='Modicum'){
                            this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Modicum',types.combatant),this.goal.anim.direction)
                        }
                        if(this.battle.modded(92)&&this.initialName!='Bee'){
                            this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Bee',types.combatant),this.goal.anim.direction)
                        }
                        if(this.battle.modded(141)&&floor(random(0,2))==0&&this.initialName!='Soul'&&(this.battle.encounter.class==1||this.battle.encounter.class==2)){
                            this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Soul',types.combatant),this.goal.anim.direction)
                        }
                        if(this.battle.modded(29)){
                            switch(this.initialName){
                                case 'Big Duck':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Duck',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Duck',types.combatant),this.goal.anim.direction)
                                break
                                case 'Enforcer':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Ninja Master',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Ninja Master',types.combatant),this.goal.anim.direction)
                                break
                                case 'Agent Duck':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Big Duck',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Duck',types.combatant),this.goal.anim.direction)
                                break
                                case 'Chief Deployer':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Deployer',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Deployer',types.combatant),this.goal.anim.direction)
                                break
                                case 'Solar Shard':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Lunar Shard',types.combatant),this.goal.anim.direction)
                                break
                                case 'Management Caller':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Management Soldier',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Management Soldier',types.combatant),this.goal.anim.direction)
                                break
                                case 'Prison Guard':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Prisoner',types.combatant),this.goal.anim.direction)
                                break
                                case 'Swordmaster':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Human',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Human',types.combatant),this.goal.anim.direction)
                                break
                                case 'Gas Man':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Fireball',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Fireball',types.combatant),this.goal.anim.direction)
                                break
                                case 'Champion':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Vengeful',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Vengeful',types.combatant),this.goal.anim.direction)
                                break
                                case 'Deadshell':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Thornvine',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Thornvine',types.combatant),this.goal.anim.direction)
                                break
                                case 'Executive':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Intern',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Intern',types.combatant),this.goal.anim.direction)
                                break
                                case 'Mechanized':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Management Robot',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Management Robot',types.combatant),this.goal.anim.direction)
                                break
                                case 'Bomber Boy':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Thug',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Thug',types.combatant),this.goal.anim.direction)
                                break
                                case 'Assistant Hiring Officer':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Executive',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Executive',types.combatant),this.goal.anim.direction)
                                break
                                case 'Assistant Fitness Officer':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Billy Beatup',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Billy Beatup',types.combatant),this.goal.anim.direction)
                                break
                                case 'Armored Ninja':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Ninja',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Ninja',types.combatant),this.goal.anim.direction)
                                break
                                case 'Jet':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Management Sniper',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Management Sniper',types.combatant),this.goal.anim.direction)
                                break
                                case 'Gangster Machinegunner':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Gangster',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Gangster',types.combatant),this.goal.anim.direction)
                                break
                                case 'Elf Archer':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Bush Thing',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Bush Thing',types.combatant),this.goal.anim.direction)
                                break
                                case 'Beekeeper':
                                    type=findName('Bee',types.combatant)
                                    for(let b=0,lb=7;b<lb;b++){
                                        this.battle.combatantManager.summonCombatant(this.tilePosition,type,this.goal.anim.direction)
                                    }
                                break
                                case 'Coffee Commander':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Management Special Forces',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Management Special Forces',types.combatant),this.goal.anim.direction)
                                break
                                case 'Prestige':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Nerfer',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Buffer',types.combatant),this.goal.anim.direction)
                                break
                                case 'Divine Guard':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Nil',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Nil',types.combatant),this.goal.anim.direction)
                                break
                                case 'Avant Guard':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Glitched Giant',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Glitched Giant',types.combatant),this.goal.anim.direction)
                                break
                                case 'Vengeful':
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Rusty',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Rusty',types.combatant),this.goal.anim.direction)
                                break
                                case 'Tech Support':
                                    type=findName('Bolt',types.combatant)
                                    for(let b=0,lb=7;b<lb;b++){
                                        this.battle.combatantManager.summonCombatant(this.tilePosition,type,this.goal.anim.direction)
                                    }
                                break

                            }
                        }
                        switch(this.initialName){
                            case 'Slimoid':
                                type=findName('Modicum',types.combatant)
                                for(let b=0,lb=7;b<lb;b++){
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,type,this.goal.anim.direction)
                                }
                            break
                            case 'Big Slime':
                                this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Slime',types.combatant),this.goal.anim.direction)
                                this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Slime',types.combatant),this.goal.anim.direction)
                            break
                            case 'Big Spike Slime':
                                this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Spike Slime',types.combatant),this.goal.anim.direction)
                                this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Spike Slime',types.combatant),this.goal.anim.direction)
                            break
                            case 'Big Slimoid':
                                this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Slimoid',types.combatant),this.goal.anim.direction)
                                this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Slimoid',types.combatant),this.goal.anim.direction)
                            break
                            case 'Slime Boss':
                                this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Big Slime',types.combatant),this.goal.anim.direction)
                                this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Big Slime',types.combatant),this.goal.anim.direction)
                            break
                            case 'Solar Shard':
                                this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Lunar Shard',types.combatant),this.goal.anim.direction)
                            break
                            case 'Lunar Shard':
                                this.battle.combatantManager.summonCombatant(this.tilePosition,findName('Lunar Dust',types.combatant),this.goal.anim.direction)
                            break
                            case 'Personnel Carrier':
                                type=findName('Management Robot',types.combatant)
                                for(let a=0,la=5;a<la;a++){
                                    this.battle.combatantManager.summonCombatant(this.tilePosition,type,this.goal.anim.direction)
                                }
                            break
                        }
                    }
                    this.battle.combatantManager.reorder()
                }
            }
        }
        this.time++
        this.infoAnim.block=smoothAnim(this.infoAnim.block,this.block>0,0,1,5)
        this.infoAnim.size=smoothAnim(this.infoAnim.size,this.infoAnim.upSize,1,1.5,5)
        this.infoAnim.description=smoothAnim(this.infoAnim.description,this.infoAnim.upSize,0,1,5)
        this.infoAnim.balance=smoothAnim(this.infoAnim.balance,this.balance>0,0,1,5)
        this.infoAnim.orb=smoothAnim(this.infoAnim.orb,this.anyOrb,0,1,5)
        for(let a=0,la=this.orbs.length;a<la;a++){
            for(let b=0,lb=game.orbNumber;b<lb;b++){
                this.infoAnim.orbSpec[a][b]=smoothAnim(this.infoAnim.orbSpec[a][b],this.orbs[a]==b,0,1,5)
            }
        }
        if(abs(this.anim.direction-this.goal.anim.direction)<=18||abs(this.anim.direction-this.goal.anim.direction-360)<=18||abs(this.anim.direction-this.goal.anim.direction+360)<=18||abs(this.anim.direction-this.goal.anim.direction-720)<=18||abs(this.anim.direction-this.goal.anim.direction+720)<=18){
            this.anim.direction=this.goal.anim.direction
        }else if(
            this.anim.direction>this.goal.anim.direction&&this.anim.direction<this.goal.anim.direction+180||
            this.anim.direction>this.goal.anim.direction-360&&this.anim.direction<this.goal.anim.direction-180||
            this.anim.direction>this.goal.anim.direction+360&&this.anim.direction<this.goal.anim.direction+540||
            this.anim.direction>this.goal.anim.direction-720&&this.anim.direction<this.goal.anim.direction-540||
            this.anim.direction>this.goal.anim.direction+720&&this.anim.direction<this.goal.anim.direction+900){
            this.anim.direction-=15
        }else if(
            this.anim.direction<this.goal.anim.direction&&this.anim.direction>this.goal.anim.direction-180||
            this.anim.direction<this.goal.anim.direction+360&&this.anim.direction>this.goal.anim.direction+180||
            this.anim.direction<this.goal.anim.direction-360&&this.anim.direction>this.goal.anim.direction-540||
            this.anim.direction<this.goal.anim.direction+720&&this.anim.direction>this.goal.anim.direction+540||
            this.anim.direction<this.goal.anim.direction-720&&this.anim.direction>this.goal.anim.direction-900){
            this.anim.direction+=15
        }else{
            this.anim.direction+=15*(floor(random(0,2)*2-1))
        }
        if(this.anim.direction>180){
            this.anim.direction-=360
        }else if(this.anim.direction<-180){
            this.anim.direction+=360
        }
        if(this.goal.anim.direction>180){
            this.goal.anim.direction-=360
        }else if(this.goal.anim.direction<-180){
            this.goal.anim.direction+=360
        }
        for(let a=0,la=this.status.main.length;a<la;a++){
            this.status.main[a]=round(this.status.main[a])
            if(this.status.main[a]!=0&&!this.status.active[a]){
                this.status.active[a]=true
                this.status.size[a]=0
                this.status.position[a]=this.status.display.length*6
                this.status.display.push(a)
            }
            if(this.status.active[a]){
                this.status.size[a]=smoothAnim(this.status.size[a],this.status.main[a]!=0,0,1,5)
            }
        }
        for(let a=0,la=this.status.display.length;a<la;a++){
            if(abs(this.status.position[this.status.display[a]]-(a*12-(la-1)*6))<2){
                this.status.position[this.status.display[a]]=a*12-(la-1)*6
            }else if(abs(this.status.position[this.status.display[a]]<a*12-(la-1)*6)){
                this.status.position[this.status.display[a]]+=2
            }else if(abs(this.status.position[this.status.display[a]]>a*12-(la-1)*6)){
                this.status.position[this.status.display[a]]-=2
            }
            if(this.status.main[this.status.display[a]]==0&&this.status.size[this.status.display[a]]<=0){
                this.status.active[this.status.display[a]]=false
                this.status.display.splice(a,1)
            }
        }
        for(let a=0,la=this.infoAnim.intent.length;a<la;a++){
            this.infoAnim.intent[a]=smoothAnim(this.infoAnim.intent[a],a==this.intent,0,1,5)
        }
        for(let a=0,la=this.infoAnim.flash.length;a<la;a++){
            this.infoAnim.flash[a]=smoothAnim(this.infoAnim.flash[a],this.infoAnim.upFlash[a],0,1,5)
            if(this.infoAnim.flash[a]>=1&&this.infoAnim.upFlash[a]){
                this.infoAnim.upFlash[a]=false
            }
        }
        for(let a=0,la=this.dodges.length;a<la;a++){
            this.dodges[a].timer++
            if(this.dodges[a].timer<=8){
                this.moveTile(this.dodges[a].direction,5)
                this.moveRelativeTile(this.dodges[a].direction,5)
            }else if(this.dodges[a].timer<=16){
                this.moveTile(this.dodges[a].direction,-5)
                this.moveRelativeTile(this.dodges[a].direction,-5)
            }else{
                this.dodges.splice(a,1)
                a--
                la--
            }
        }
        if(this.name=='George'||this.name=='Lira'||this.name=='Sakura'||this.name=='Certes'||this.name=='Ume'){
            this.trigger.display.extra.damage=this.life<=this.base.life*0.2&&options.damage
            if(this.balance>this.balanceCap){
                if(this.status.main[105]>0){
                    this.battle.energy.main[this.id]++
                }else if(this.status.main[104]<=0){
                    this.balance=0
                }
                if(this.battle.turn.main==this.id){
                    this.battle.turn.endReady=true
                }
            }else if(this.balance<0){
                this.balance=0
            }
        }
        switch(this.name){
            case 'Lira': case 'Setsuna': case 'Ume':
                this.anim.sword=smoothAnim(this.anim.sword,this.goal.anim.sword,0,1,5)
            break
            case 'Sakura':
                this.anim.sword=smoothAnim(this.anim.sword,this.goal.anim.sword,0,1,5)
                this.anim.sword2=smoothAnim(this.anim.sword2,this.goal.anim.sword2,0,1,5)
                if(!this.armed){
                    this.goal.anim.sword=false
                }else if(this.battle.attackManager.attacks.length<=0&&this.life>0){
                    this.goal.anim.sword=true
                }
                if(this.battle.attackManager.attacks.length<=0){
                    this.goal.anim.sword2=false
                }
            break
            case 'Azis':
                controlSpin(this.hood,this.anim.direction,0)
            break
            case 'Slow King':
                this.fades.shield=smoothAnim(this.fades.shield,this.block>0,0,1,5)
            break
            case 'Bolt':
                for(let a=0,la=this.shocks.length;a<la;a++){
                    this.shocks[a][1]-=0.05
                    if(this.shocks[a][1]<=0){
                        delete this.shocks[a]
                        this.shocks.splice(a,1)
                        a--
                        la--
                    }
                }
                if(this.time%5==0){
                    this.shocks.push([random(0,360),1])
                }
            break
            case 'Glitch': case 'Glitched Giant':
                if(this.time%5==0){
                    let part=floor(random(0,6))
                    switch(part){
                        case 0: this.color.skin.head=this.colorChances[floor(random(0,this.colorChances.length))]; break
                        case 1: this.color.skin.body=this.colorChances[floor(random(0,this.colorChances.length))]; break
                        case 2: this.color.skin.arms[0]=this.colorChances[floor(random(0,this.colorChances.length))]; break
                        case 3: this.color.skin.arms[1]=this.colorChances[floor(random(0,this.colorChances.length))]; break
                        case 4: this.color.skin.legs[0]=this.colorChances[floor(random(0,this.colorChances.length))]; break
                        case 5: this.color.skin.legs[1]=this.colorChances[floor(random(0,this.colorChances.length))]; break
                    }
                }
            break
        }
    }
}