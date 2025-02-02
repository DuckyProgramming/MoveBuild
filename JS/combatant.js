class disabledCombatant{
    constructor(){}
    getStatus(){return 0}
}
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
            this.move={type:types.combatant[this.type].move.type,speed:types.combatant[this.type].move.speed}
            this.attack=copyArrayAttack(types.combatant[this.type].attack)
            this.description=types.combatant[this.type].description
        }catch(error){
            console.log('!!!',this.type,error)
            this.type=0
            this.name=types.combatant[this.type].name
            this.life=types.combatant[this.type].life
            this.behavior=types.combatant[this.type].behavior
            this.spec=copyArray(types.combatant[this.type].spec)
            this.move={type:types.combatant[this.type].move.type,speed:types.combatant[this.type].move.speed}
            this.attack=copyArrayAttack(types.combatant[this.type].attack)
            this.description=types.combatant[this.type].description
        }
        this.initialName=this.name

        if(this.attack.length==0||this.id<game.players){
            this.attack=[{type:0,effect:[]}]
        }
        if(this.battle.initialized&&this.team==0){
            if(this.battle.modded(7)){
                this.name='Unknown'
                this.description='Unrecognizable'
            }
            if(this.battle.modded(13)){
                for(let a=0,la=this.attack.length;a<la;a++){
                    if(this.attack[a].type==21){
                        this.attack.splice(a,1)
                        a--
                        la--
                    }
                }
            }
            if(this.battle.modded(42)&&floor(random(0,10))==0&&!this.spec.includes(1)){
                this.spec.push(1)
            }
            if(this.battle.modded(53)&&!this.spec.includes(0)){
                this.spec.push(0)
            }
            if(this.battle.modded(80)&&this.move.type!=3&&floor(random(0,4))==0){
                this.move.type=3
            }
            if(this.battle.modded(96)&&this.battle.turn.total>1&&!this.spec.includes(1)){
                this.spec.push(1)
            }
            if(this.battle.modded(123)&&!this.spec.includes(3)){
                this.spec.push(3)
            }
            if((this.battle.modded(126)&&this.battle.encounter.class==2||this.battle.modded(127)&&this.battle.encounter.class==1)&&this.battle.turn.total==0&&this.battle.nodeManager.world!=3){
                this.battle.quickReinforce(this.name)
            }
            if((this.battle.modded(126)&&this.battle.encounter.class==2||this.battle.modded(127)&&this.battle.encounter.class==1)&&this.spec.includes(2)){
                this.spec.splice(this.spec.indexOf(2))
            }
            if(this.battle.modded(201)&&!this.spec.includes(7)){
                this.spec.push(7)
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
        this.ally=-1
        this.blocked=0
        this.taken=0
        this.turnTaken=0
        this.builder=0
        
        this.compression=0
        this.permanentStrength=0
        this.carry=[0,0,0,0]

        this.base={position:{x:this.position.x,y:this.position.y},life:this.life,size:0}
        this.collect={life:this.life}
        this.infoAnim={
            life:1,
            block:0,blockSize:1,
            barrier:0,barrierSize:1,barrierPush:0,
            bounce:0,bounceSize:1,bouncePush:0,
            size:1,description:0,upSize:false,intent:[],
            flash:[0,0,0,0],upFlash:[false,false,false,false],
            balance:0,
            orb:0,orbSpec:[],
            stance:[0,0,0,0,0,0,0],
            faith:[0,0,0,0,0,0,0,0,0,0,0,0],elemental:0,
            inspiration:[0,0,0,0,0],fugue:0,
        }
        this.dodges=[]
        this.turnDodges=0
        this.communizers=[]
        this.status={
            main:[],name:[
                'Double Damage','Counter','Cannot Be Pushed','Dodge','Energy Next Turn','Bleed','Strength','Dexterity','Weak','Frail',
                'Vulnerable','Retain Block','Single Damage Up','Block Next Turn','Armor','Control','Cannot Add Block','Temporary Strength','Temporary Dexterity','Metallicize',
                'Weak Next Turn','Buffer','Free Attack','Double Play','Take Half Damage','Intangible','Counter All','Free Card', 'Cannot Move','Cannot Move Next Turn',
                'Strength Per Turn','Poison','Stun','Regeneration','Dexterity Per Turn','Extra Turn','Counter Combat','Cannot Add Block Next Turn','Counter Push','Counter Bleed',
                'Temporary Damage Up','Temporary Draw','Currency','Strength on Hit','Weak on Kill','Vulnerable on Kill','Anti-Control','Counter Combat Turn','Distracted','Burn',
                'Single Counter Block','Invisible','Dissipating','Take Third Damage','Speed Up','Strength Next Turn','Temporary Strength on Hit','Take 3/4 Damage','Temporary Strength Next Turn','Temporary Speed Up',
                'Untargettable From Front','Cancel Exhaust','Must Attack or Take Damage','Damage Taken Up','Energy on Hit','Conditioning','Shiv Per Turn','Remove Combo','Combo Per Hit Boost','Attack Draw',
                'Combo on Block','Combo Per Turn','Combo Next Turn','2 Range Counter','Card Play Block','Temporary Damage Down','Shiv Boost','Take Per Card Played','Counter All Combat','No Draw',
                'Explode on Death','Energy in 2 Turns','Double Damage Turn','Double Damage Turn Next Turn','Draw Up','Turn Discard','Mortal','Shiv on Hit','Intangible Next Turn','Block in 2 Turns',
                'Exhaust Draw','Debuff Damage','Counter Push Left','Counter Push Right','Counter Temporary Speed Down','Heal on Hit','Take Per Card Played Combat','Take 3/5 Damage','Attack Bleed Turn','Single Attack Bleed',
                'Attack Bleed Combat','Confusion','Counter Confusion','Heal on Death','Ignore Balance','Balance Energy','Counter 3 Times','Armed Block Per Turn','Counter Block Combat','Heal Gain Max HP',
                'Take Per Turn','Focus','Power Draw','Random Power Per Turn','Power Basic Orb','Basic Orb on Hit','Random Common Per Turn','Node','Focus Per Turn','Freeze',
                'Step Next Turn','Jagged Bleed','Counter Bleed All Combat','Single Take Double Damage','Dodge Next Turn','Smite Per Turn','Stance Block','Stance Draw','Lose Health','Faith Per Turn',
                'Miracle Time','Miracle+ Time','Wrath Next Turn','Insight Per Turn','Block Return','Energy Per Turn Per Turn','Retain Cost Reduce','Cannot Die','Triple Block','Single Damage Block Convert',
                'Block Spark','Block Spark+','Charge Per Turn','Burn Per Turn','Amplify Return','Free Amplify','Dexterity Next Turn','Counter Burn','No Amplify','No Amplify Next Turn',
                'Charge Consume Block','Shuffle Energy','Shuffle Draw','Take Credit','Triple Damage','Charge Next Turn','Single Free Amplify','Random Defense Per Turn','Random Upgraded Defense Per Turn','1.5x Damage',
                '1.5x Block','Upgrade Created','Lowroll Strength','Decrementing Strength','Energy in 3 Turns','Bruise','Gun Boost','Take Double Damage Turn','Block Up','Take Credit Turn',
                'Damage Dealt Currency','Attack Regeneration','Take Credit Block Turn','Reflect','Currency Tank','Damage Down','Counter Damage Down All','Temporary Ammo on Hit','Ichor','Take Damage',
                'Take Damage Next Turn','Take Damage in 2 Turns','Block in 3 Turns','Dexterity on Hit','Temporary Dexterity on Hit','Temporary Block Up','Damage Up','Block Down','End Move','Conviction Next Turn',
                'Rizz','Shock','Shiv Range Up','Double Exhaust','Miss','Single Attack Strength','Rotate Lock','Jinx','Half Damage Turn','Numeric Explode on Death',
                'Luck Guarantee','Double Damage-1','20 Damage Miss','Heal Per Turn','Wet','Counter Weak All','Counter Freeze','Temporary Dexterity Next Turn','Chained','Fragile Heal',
                'Self Damage Immunity','Self-Reflect','Half Damage Turn Next Turn','Survive Fatal','Free 1 Cost Card','No Damage','1.5x Damage+1','Decrementing Armor','Twos','Ignore Tile',
                'Jinx Next Turn','Jinxshock','Burn Draw Up','Lowroll Draw','Single Attack Regeneration','Shiv Freeze','Shiv Burn','Mixed','Silence','Faith Next Turn',
                'Hook','Temporary Single Damage Up','Peak Next Turn','Double Countdowns','Fade','Miracle Next Turn','10 or Less Damage Up','Hyperquill Next Turn','Odd Double Damage','10 or Less Double Damage',
                'Fail','Double Curse','20 or More Double Damage Turn','Take 2/5 Damage','Damage Cycle 3 1','Damage Cycle 3 2','Damage Cycle 3 3','Sting','No Damage Next Turn','Freeze Draw Up',
                'Single Damage Convert','2 Exhaust Draw','Dice Boost','Lowroll Dexterity','Lowroll Energy','Highroll Strength','Highroll Draw','Highroll Dexterity','Highroll Energy','Vulnerable Next Turn',
                '10% = 25%','Perfect Dice Rolls','Luck Guarantee Next Turn','Luckier Time','Single Damage Down','Temporary Damage Down Next Turn','Lasting Counter Once','Fragile Speed Up','Block Cycle 2 1','Block Cycle 2 2',
                'Temporary Damage Up Next Turn','Single Weak','Counter 2 Times','No Block','Discard Block','8+ Block Shiv','Block Heal','Block Break Splash','Lose 1 HP','2 Cost Block',
                'Heal Damage Random','Block Single Damage Up Convert','Strength in 2 Turns','Dexterity in 2 Turns','Damage Taken Regeneration','Block-Fragile Draw','Double Damage Next','Strength in 3 Turns','Free Movement','Cable Swap',
                'Strike Block','0 Cost Single Damage Up','Double Status','Take Per Power Played Combat','Jinxheal','Always Odd Energy','Luck Guarantee Fail','Damage Taken Currency','Random Card Cost Less Per Turn','Luck Guarantee Turn',
                'Return Buffer','Fragile Double Damage','Bleed Next Turn','Bleed in 2 Turns','Cannot Move Shiv','Awakening','History','Knowledge','Wisdom','History Target All',
                'Retain History','History Per Turn','Vision Return','3 Rewind Draw','2 Rewind Draw','Rewind Block','Turn Rewind','Rewind Cost Down','Attack Shock Turn','Take 1/4 Damage',
                'Double Damage Without Power','Damage Taken Up to Nearest 5','Item Use Energy','Item Use Draw','Damage Taken Up to 10','10 Damage Taken Damage Down Convert','20 Damage Taken Random Debuff','Taken Damage Repeat','Item Per Turn','Block Barrier Convert',
                'Barrier Damage Random','Scry Per Turn','Dual Discus Per Turn','Temporary Draw Next Turn','Temporary Draw in 2 Turns','Scry Up','Freeze Temporary Damage Up','2+ Cost Energy','2+ Cost Draw','Temporary Barrier Return',
                'Discus Boost','3+ Cost Free Discus','3+ Cost Free Upgraded Discus','Base Energy Next Turn','Base Energy in 2 Turns','Scry Barrier','Miracle in 2 Turns','Tick Per Turn','Barrier Next Turn','Miracle in 3 Turns',
                'Extra Turn Next Turn','Extra Turn in 2 Turns','Damage Taken Down','Fragile Damage Up','Temporary Free Non-Rare Colorless','Extra Drawless Turn','Damage Highest','No Damage Turn','Heal on Hit Taken','Temporary Dexterity Per Turn',
                'Counter Once','Common Temporary Strength','Temporary Strength Convert','Double Damage Without Movement','No Energy','End of Combat Heal','Pristine Per Turn','Colorless Damage All','Stride Next Turn','Stride in 2 Turns',
                'Attack Damage Taken Up Turn','Dexterity in 3 Turns','Strength in 4 Turns','Dexterity in 4 Turns','Protected Invisible','Orb Overload Bounce','Enemy Death Shiv','Single Splash Damage','Retain Intent','Move Retain Combo',
                'Construct Speed Up','Weak Reverse','Drawn Shiv Draw','Prismatic Bomb Freeze','Prismatic Bomb Poison','Prismatic Bomb Targets','Counter Gun','Counter Bomb','Low Health Construct','Temporary Strength Per Turn',
                'Single Damage All','Prismatic Bomb Per Turn','Fatigue Splash','Random Deck Card Per Turn','Energy Cycle 2 1','Energy Cycle 2 2','Random Negative Per Turn','Rewind Next Turn','Damage All','Armament Bypass',
                'Burn Strength','Burn Bypass','Strike Boost','Mineral Boost','Cable Boost','Free Defenses','Exhausting Defenses','Strike Range','Skill Cost Down','Exhausting Skills',
                'Step Draw','Cable Range','Mineral Range','Common Attack Boost','Free Cables','Construct Turn','Construct Dual Block','Metal Per Turn','All Construct Speed Up','Construct Strength',
                'Construct Dexterity','Gun Temporary Strength','Gun Block','Turn Speed','Extra Turn Block','Turn Reversal','Deluxe Weak','Prismatic Bomb Boost','No Damage Turn Next Turn','Play Limit',
                '2+ Cost Single Damage Up','2+ Cost Block','Damage Block Convert','Damage Half Block Convert','Single Block Damage Convert','Draw Exhaust Per Turn','Elemental Block','X Cost Boost','Self Health Loss Splash',variants.mtg?'Mana Gain Splash':'Energy Gain Splash',
                'Attack Draw Per Turn','Random Free Exhausting Skill Per Turn','3 Exhaust Draw','Exhaust Shiv','12+ Block Draw','Buff Loss Barrier','Astrology Per Turn','Construct Metal','Attack Jinx Combat','Attack Shock Combat',
                'Ammo Per Turn','Countdown Chain','Common Colorless Per Turn','Damage Delay 2','Combo Cost Down','All Cost Down','Random Card Cost Less Next Turn','Defense Cost Down','Dodge Strength','Dodge Energy',
                'Damage Repeat in 2 Turns','Lock On','Temporary Damage Taken Up','Attack Lock On Turn','Retain Energy','Temporary All Cost Up','Temporary All Cost Up Next Turn','Retain Hand','Buffer Next Turn','Free Skill',
                'Single Attack Mortal','Single Attack Remove Block','Counter Bleed Combat','Single Dice Up','Block Repeat in 2 Turns','Exhaust Temporary Strength','Attack Poison Combat','Counter Once Next Turn','Triple Wrath','5 Card Random Mana',
                '5 Card Energy','Drawn Status Draw','Skill Temporary Strength','Counter Poison','Free Defense','Counter Dexterity Down','Random Card Cost More Next Turn','Play Limit Next Turn','Wish Power Per Turn','13 Card Block',
                '13 Card Draw','Lose Health Next Turn','Wish Miracle','Turn Exhaust and Draw Equal','Colorless Cost Up','Dice Roll Block','Vision Per Turn','Knowledge Next Turn','Knowledge in 2 Turns','Elemental Energy',
                'Elemental Draw','(E) Next Turn','(W) Next Turn','(B) Next Turn','(K) Next Turn','(G) Next Turn','(R) Next Turn','(N) Next Turn','(E) on Hit','Free Draw Up',
                'Stance Temporary Strength','Debuff Block','Basic Temporary Strength','Basic Draw','Card Delay Exhaust','Card Delay Draw','Balance (E)','Invisible Per Turn','Random Mana Next Turn','Colorless Cost Down',
                'Colorless Neutral Convert','Single Attack Weak','Amplify Draw','(E) in 2 Turns','(W) in 2 Turns','(B) in 2 Turns','(K) in 2 Turns','(G) in 2 Turns','(R) in 2 Turns','(N) in 2 Turns',
                '(E) in 3 Turns','(W) in 3 Turns','(B) in 3 Turns','(K) in 3 Turns','(G) in 3 Turns','(R) in 3 Turns','(N) in 3 Turns','Lowroll (E)','Highroll (E)','All Mana (W)',
                'All Mana (B)','All Mana (K)','All Mana (G)','All Mana (R)','Claw Up','Metallicize All','Frail Next Turn','Retain Dodge','Counter Once Per Turn','Counter Bleed Once',
                'Counter Bleed Once Per Turn','Counter Gun Once','Counter Gun Once Per Turn','Counter Push Combat','Attack Burn Combat','All Strength Cycle 4 1','All Strength Cycle 4 2','All Strength Cycle 4 3','All Strength Cycle 4 4','Counter Weak All Combat',
                'Counter Shockwave Combat','Protected Invisible Next Turn','Power Play Strength','3+ Cost Single Damage Up','3+ Cost Block','Item Use (N)','(E) Cyscle 2 1','(E) Cycle 2 2','(W) Cycle 2 1','(W) Cycle 2 2',
                '(B) Cycle 2 1','(B) Cycle 2 2','(K) Cycle 2 1','(K) Cycle 2 2','(G) Cycle 2 1','(G) Cycle 2 2','(R) Cycle 2 1','(R) Cycle 2 2','(N) Cycle 2 1','(N) Cycle 2 2',
                'Elemental (E)','Base (E) Next Turn','Base (E) in 2 Turns','Temporary Damage Taken Down','Dodge (G)','Defend Boost','Random Base Mana Per Turn','Shuffle (E)','(E) Spend Splash','2+ Cost (E)',
                'Discus Temporary Strength','Discus Temporary Dexterity','Lightning Orb Per Turn','Lightning Orb Boost','Retain Mana','Free Overdrive','Burn All Per Turn','Freeze All Per Turn','Shiv Next Turn','Rearm Draw',
                'Retain Once Per Turn','Dodge Splash','All Cost Up','Strike Lock On','Temporary Damage Cap','Dice Max Boost','Exhaust Block','Counter Shockwave','Frail on Kill','Mailshield',
                'Intent Change Threshold','Counter Push Once','Counter Push Once Per Turn','Dodge Per Turn','Dodge Cycle 2 1','Dodge Cycle 2 2','Play Limit Combat','Damage Cap','Lasting Single Counter','Random Mana in 2 Turns',
                variants.mtg?'Mana Gain Temporary Strength':'Energy Gain Temporary Strength','X Cost Single Damage Up','X Cost Block','X Cost Energy','X Cost (E)','Chocolate Chip','Mass Pull Damage Random','Turn Exhaust Random','Freeze Vulnerable',variants.mtg?'Mana Gain Splash Freeze':'Energy Gain Splash Freeze',
                'Skill Draw Per Turn','Quest Chain','Tile Draw','Movement Draw Per Turn','Dark Matter Per Turn','Dark Matter Draw Block','Retain Bar Per Turn','Mass Pull Boost','Splash Attach Poison','Splash Boost',
                'Basic Orb Per Turn','Calm Block Per Turn','Dark Matter Pull Fuel All','Snowflake Per Turn','Counter All Spread','Flame Orb Splash','Dark Light Orb Swap','Light Dark Orb Swap','2+ Cost Attack Energy','2+ Cost Attack (E)',
                'Dark Matter Fuel All','Combo Spend Draw','Double Wrath Block','Turn Exhaust','Skill Draw Next Turn','Health Loss Poison Random','Free Minerals','Lose Health in 2 Turns','Lock On Bleed','Elemental Entrance Draw',
                'Dodge on Kill','5 or Less Charge Block','Amplify Charge','Radiation','Retain Radiation','Radiation Per Turn','Dark Matter Pull Radiation','Dark Matter Radiation Trigger','Calm Next Turn','Unplayable Draw Retain Once',
                'Basic Orb Boost','Prismatic Bomb Items','Skill Draw','Defense Draw','Evoke Block','Orb Tick Per Turn','Revive','Invulnerable','Calm Bonus','Scry Damage All',
                'Wisp Exhaust Charge','Shiv Scatter','Shiv Block','X Cost Chocolate Chip','Hand Copy Next Turn','Poison Damage','Shiv Extra Target','Unplayable Draw Block','Lock On Poison','Bleed Boost',
                'Control Base','Random Free Exhausting Ethereal Card Per Turn','Attack Freeze Combat','Blueprint Cost Down','Gun Draw Next Turn','Shock All Per Turn','Amplify Poison All','No Draw Next Turn','Energy Gain Energy','Energy Gain (E)',
                'Cable Claw Up','Energy Orb Per Turn','Basic Energy','Basic (E)','Bleed Damage','Dust Orb Boost','Armor Per Turn','Max Health Gift','Fragile','Free Card Per Turn',
                'Draw Pull','Power Energy Next Turn','Power (N) Next Turn','Power Strength','Unplayable Discard Damage Random','Silver Block','Mineral Block','Mineral Draw','End of Combat Lose','End of Combat Item',
                'Moriya Talisman Per Turn','Drawn Status Exhaust','Counter Shockswwave Once','Counter Shockwave Once Per Turn','Attack Bruise Combat','Pure','Drawn Status Block','Drawn Curse Block','Dodge Draw','All Damage Convert',
                'Reversal Per Turn','Sharp Word Per Turn','Discus Flip Top','Shining Moon Per Turn','Intangible in 2 Turns','No Heal','Drawn Status Temporary Strength','Drawn Status Temporary Dexterity','Temporary Card Play Temporary Strength','Temporary Card Play Temporary Strength Next Turn',
                'Retain Duplicate','Power Cost Up','Temporary All Damage Convert','Extra Turn Play Limit Per Turn','Auto Follow-Up','Calm Temporary Strength','Bleed Attack Intent','Rearm Strength','All X Cost Boost','Move Block',
                'Base Attack Vulnerable Combat','Retain Freeze','Orb Hold Tick','Fugue Strength','Cycle Attack','Cycle Defense','Cycle Movement','Cycle Power','Cycle Skill','Speed Strike',
                '2+ Cost Strength','Half Block','Random Mana in 3 Turns','No Extra Turns','No Extra Turns Next Turn','Cost Down Per Turn','Bounce Next Turn','Scry Discard Block','Play Evolve','Evolve Temporary Strength',
                'Communized','Energy in 4 Turns','Energy in 5 Turns','(E) in 4 Turns','(E) in 5 Turns','0 Cost Block','Charge Consume Single Damage Up','Assign Return','Assign Temporary Strength','Pity',
            ],next:[],display:[],active:[],position:[],size:[],sign:[],
            behavior:[
                0,2,1,1,2,0,0,0,1,1,//1
                1,0,0,2,0,0,1,2,2,0,//2
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
                2,2,2,0,2,2,0,0,0,2,//19
                0,0,0,0,0,0,1,0,1,0,//20
                0,0,0,0,1,2,2,2,1,2,//21
                1,0,2,0,0,0,0,1,0,0,//22
                2,0,0,0,0,0,0,0,1,2,//23
                1,2,2,1,0,2,0,2,0,0,//24
                1,0,1,1,2,2,2,0,2,0,//25
                0,0,0,0,0,0,0,0,0,2,//26
                1,1,2,1,0,2,0,0,2,2,//27
                2,0,2,0,0,0,1,2,1,0,//28
                0,2,2,2,0,2,0,2,0,1,//29
                0,0,0,0,0,0,0,1,0,1,//30
                0,0,2,2,0,1,6,0,0,1,//31
                1,0,0,0,0,0,0,0,2,1,//32
                0,1,0,0,0,0,0,0,0,1,//33
                0,0,0,2,2,0,0,0,0,2,//34
                0,0,0,2,2,0,2,0,2,2,//35
                2,2,0,0,2,0,2,1,0,0,//36
                2,0,0,0,1,0,0,0,2,2,//37
                2,2,2,2,1,1,0,2,0,1,//38
                0,1,0,0,0,0,2,2,0,0,//39
                2,0,0,0,2,2,0,2,0,1,//40
                0,1,0,0,0,1,1,1,0,0,//41
                1,0,1,0,1,0,0,0,0,0,//42
                0,0,0,0,0,1,1,0,2,2,//43
                0,0,0,0,0,0,0,0,0,0,//44
                0,0,0,0,0,0,0,0,0,0,//45
                0,0,0,1,0,0,0,0,0,0,//46
                0,1,2,2,0,2,2,0,2,0,//47
                0,0,0,0,0,0,0,2,1,0,//48
                0,0,0,2,0,2,0,2,0,0,//49
                0,2,0,0,0,0,0,2,2,0,//50
                0,2,2,2,2,2,2,2,2,0,//51
                0,0,0,0,0,0,0,0,2,0,//52
                1,0,0,2,2,2,2,2,2,2,//53
                2,2,2,2,2,2,2,0,0,0,//54
                0,0,0,0,0,0,2,1,0,2,//55
                0,2,0,0,0,2,2,2,2,0,//56
                0,2,0,0,0,0,2,2,2,2,//57
                2,2,2,2,2,2,2,2,2,2,//58
                0,2,2,2,0,0,0,0,0,0,//59
                0,0,0,0,0,0,0,0,2,0,//60
                0,0,0,0,2,0,0,2,0,0,//61
                0,2,0,0,2,2,0,0,0,2,//62
                0,0,0,0,0,0,0,0,0,0,//63
                0,0,0,0,0,0,0,0,0,0,//64
                0,0,0,0,1,0,0,0,0,0,//65
                0,0,1,0,2,0,1,2,0,0,//66
                0,0,0,6,1,0,0,0,1,1,//67
                0,0,0,0,0,0,0,1,0,0,//68
                0,0,0,0,2,0,0,0,0,0,//69
                0,0,0,0,2,0,0,0,0,0,//70
                0,0,0,0,0,0,0,0,0,0,//71
                1,0,0,0,0,0,0,0,0,0,//72
                0,0,2,0,0,0,0,0,0,0,//73
                0,0,0,0,2,1,0,0,2,2,//74
                1,0,2,0,0,0,1,0,0,0,//75
                0,1,0,0,2,2,2,2,2,1,//76
                0,0,2,1,0,0,0,0,1,0,//77
                1,2,2,2,2,0,0,0,0,1,//78
            ],
            class:[
                0,2,0,0,2,1,0,0,1,1,//1
                1,0,0,0,0,0,1,0,0,0,//2
                1,0,2,4,0,0,0,2,3,1,//3
                0,1,1,0,0,2,0,1,2,2,//4
                0,2,3,0,2,2,1,0,1,1,//5
                0,0,3,0,2,0,0,0,0,0,//6
                2,2,1,1,2,0,2,3,2,2,//7
                2,2,2,2,2,0,2,1,0,3,//8
                3,2,0,0,2,3,1,2,0,0,//9
                2,2,2,2,2,0,1,0,0,0,//10
                0,1,2,0,2,2,2,2,0,2,//11
                1,2,2,2,2,2,2,3,2,1,//12
                2,1,2,1,0,2,2,2,1,2,//13
                2,2,2,2,1,2,2,0,0,0,//14
                2,2,2,3,2,2,0,2,3,3,//15
                2,2,2,0,0,2,2,2,3,0,//16
                0,2,2,0,2,1,2,1,0,0,//17
                2,1,0,0,2,1,2,2,1,1,//18
                1,1,0,0,0,0,0,0,2,2,//19
                2,1,2,2,1,0,3,1,1,3,//20
                2,0,2,0,1,0,2,0,1,0,//21
                2,1,1,0,2,1,0,0,2,0,//22
                1,1,2,2,1,2,2,3,3,2,//23
                2,0,2,2,1,2,0,2,0,0,//24
                1,0,0,0,3,3,3,3,1,2,//25
                1,2,2,2,2,2,2,2,2,1,//26
                2,2,2,2,1,1,2,0,0,0,//27
                0,1,0,1,2,2,0,0,1,2,//28
                2,2,0,0,0,2,0,0,2,2,//29
                2,2,2,1,0,2,3,2,2,2,//30
                1,0,1,1,2,2,2,2,2,2,//31
                2,2,3,2,2,2,2,2,0,0,//32
                2,1,2,2,2,2,2,2,2,2,//33
                2,2,2,2,2,2,4,2,2,3,//34
                2,2,2,2,2,2,2,2,0,2,//35
                2,2,0,0,2,2,2,1,0,0,//36
                2,2,2,0,3,2,2,2,2,2,//37
                0,0,0,0,2,2,2,0,3,2,//38
                2,2,2,2,2,2,2,2,3,0,//39
                2,2,2,2,2,2,2,2,2,2,//40
                2,2,2,2,2,2,2,2,2,2,//41
                2,2,2,2,2,2,2,2,2,2,//42
                2,2,2,2,2,2,2,2,1,3,//43
                2,2,0,0,0,2,2,2,2,2,//44
                2,2,2,2,2,2,2,2,2,2,//45
                2,2,2,0,2,2,2,2,2,2,//46
                0,1,1,0,2,3,3,2,0,2,//47
                0,0,0,2,0,2,2,0,2,2,//48
                2,2,2,0,2,0,3,3,2,2,//49
                2,1,2,2,2,2,2,2,2,2,//50
                2,2,2,2,2,2,2,2,2,2,//51
                2,2,2,2,2,2,2,2,2,2,//52
                2,0,2,2,2,2,2,2,2,2,//53
                2,2,2,2,2,2,2,2,2,2,//54
                2,2,2,2,2,2,1,2,2,2,//55
                2,2,2,2,0,2,2,2,2,2,//56
                2,2,2,2,2,2,2,2,2,2,//57
                2,2,2,2,2,2,2,2,2,2,//58
                2,2,2,0,2,2,2,2,2,2,//59
                2,2,2,2,2,2,2,2,2,2,//60
                2,2,3,2,0,2,2,2,2,2,//61
                3,2,2,2,2,2,3,2,2,2,//62
                2,2,2,2,2,2,2,2,2,2,//63
                2,2,2,2,2,2,2,2,2,2,//64
                2,2,2,2,2,2,2,2,2,2,//65
                2,2,2,2,2,2,2,1,2,2,//66
                1,2,2,0,2,2,2,2,2,2,//67
                2,2,2,2,2,2,0,0,2,2,//68
                2,2,2,2,2,2,2,2,2,2,//69
                2,2,2,2,2,2,2,3,2,2,//70
                2,2,2,2,2,2,0,1,1,2,//71
                2,2,2,2,2,2,2,2,2,2,//72
                2,2,2,2,0,2,2,2,2,2,//73
                2,2,2,2,2,1,2,2,2,2,//74
                2,2,2,2,2,2,2,2,2,0,//75
                0,1,2,2,2,2,2,2,2,2,//76
                2,1,3,3,3,2,2,2,2,2,//77
                3,2,2,2,2,2,2,2,2,2,//78
            ]}
        /*
        0-none
        1-decrement
        2-remove
        3-early decrement, player
        4-early decrement, enemy
        5-early decrement, general
        6-half decrement
        */
        //0-good, 1-bad, 2-nonclassified good, 3-nonclassified bad, 4-disband
        this.tempStatus=[1,0,0,0,0,0]
        //multiplier,add,damage block convert,damage repeat in 2 turns,single attack bleed
        this.interiorStatus=[0,0]
        //repeat extra turn 1,has done damage
        for(let a=0;a<this.status.name.length;a++){
            this.status.main.push(0)
            this.status.next.push(0)
            this.status.active.push(false)
            this.status.position.push(0)
            this.status.size.push(0)
            this.status.sign.push(0)
        }

        for(let a=0,la=this.attack.length;a<la;a++){
            this.infoAnim.intent.push(0)
        }

        this.direction=0
        this.size=1

        this.constants()

        this.intent=-1
        this.usedIntent=[]
        this.activated=this.construct
        this.target=0
        for(let a=0,la=this.orbs.length;a<la;a++){
            this.infoAnim.orbSpec.push([])
            for(let b=0,lb=constants.orbNumber;b<lb;b++){
                this.infoAnim.orbSpec[a].push(0)
            }
        }

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
    save(){
        let composite={
            life:this.life,
            base:{life:this.base.life},
            compression:this.compression,
            permanentStrength:this.permanentStrength,
            carry:this.carry,
        }
        return composite
    }
    load(composite){
        this.life=composite.life
        this.base.life=composite.base.life
        this.compression=composite.compression
        this.permanentStrength=composite.permanentStrength
        this.carry=composite.carry
    }
    constants(){
        this.block=0
        this.barrier=0
        this.bounce=0
        this.lastDeal=0
        this.highestDeal=0
        this.lastTake=0
        this.lastBlock=0

        this.combo=0
        this.comboCap=10
        this.armed=true
        this.balance=0
        this.balanceCap=10
        this.orbs=[-1,-1,-1,-1]
        this.orbDetail=[0,0,0,0]
        this.orbPos=[0,90,180,270]
        this.anyOrb=false
        this.totalOrb=0
        this.totalOrbClass=[]
        this.lastOrb=0
        this.metal=3
        this.stance=0
        this.faith=0
        this.charge=0
        this.ammo=3
        this.vision=0
        this.elemental=false
        this.wish=3
        this.inspiration=0
        this.fugue=0
    }
    resetInfo(){
        this.constants()
        this.resetAnim()
        this.tempStatus=[1,0,0,0,0,0]
        this.interiorStatus=[0,0]
        for(let a=0,la=this.status.main.length;a<la;a++){
            this.status.main[a]=0
            this.status.next[a]=0
            this.status.active[a]=false
            this.status.position[a]=0
            this.status.size[a]=0
        }
        this.status.display=[]
        this.infoAnim={
            life:1,
            block:0,blockSize:1,
            barrier:0,barrierSize:1,barrierPush:0,
            bounce:0,bounceSize:1,bouncePush:0,
            size:1,balance:0,orb:0,orbSpec:[],description:0,upSize:false,intent:[],
            flash:[0,0,0,0],upFlash:[false,false,false,false],
            stance:[0,0,0,0,0,0,0],faith:[0,0,0,0,0,0,0,0,0,0,0,0],elemental:0,
            inspiration:[0,0,0,0,0],fugue:0,
        }
    }
    reset(){
        this.size=this.base.size
        this.anim=this.base.anim
        
        this.resetInfo()
        if(this.team>0&&variants.terminal){
            this.statusEffect('Armor',4)
            this.addBlock(4)
        }
        if(this.permanentStrength>0){
            this.statusEffect('Strength',this.permanentStrength)
        }
        for(let a=0,la=this.carry.length;a<la;a++){
            if(this.carry[a]>0){
                switch(a){
                    case 0:
                        this.addBlock(this.carry[a])
                    break
                    case 1:
                        this.addBarrier(this.carry[a])
                    break
                    case 2:
                        this.vision+=this.carry[a]
                    break
                    case 3:
                        this.statusEffect('Strength',this.carry[a])
                    break
                }
                this.carry[a]=0
            }
        }
        for(let a=0,la=this.orbs.length;a<la;a++){
            this.infoAnim.orbSpec.push([])
            for(let b=0,lb=constants.orbNumber;b<lb;b++){
                this.infoAnim.orbSpec[a].push(0)
            }
        }
        for(let a=0,la=constants.orbNumber;a<la;a++){
            this.totalOrbClass.push(0)
        }
    }
    resetAnim(){
        this.startAnimation(0)
        this.runAnimation(0,0)
        switch(this.name){
            case 'Donakho': case 'Ducopo': case 'Dukelis':
                this.anim.fat=1
            break
        }
    }
    initialBuff(){
        this.turnsAlive=0
        if((this.spec.includes(2)||this.spec.includes(12))&&this.battle.nodeManager.harmBoss>0){
            this.life*=1-this.battle.nodeManager.harmBoss
        }
        if(this.spec.includes(5)){
            let tile=this.battle.tileManager.getTileIndex(this.tilePosition.x,this.tilePosition.y)
            if(tile>=0){
                this.battle.tileManager.tiles[tile].addType(6)
            }
        }
        if(this.battle.relicManager.hasRelic(493,-1)){
            for(let a=0,la=this.battle.relicManager.detail[493].length;a<la;a++){
                for(let b=0,lb=this.battle.relicManager.detail[493][a].length;b<lb;b++){
                    if(this.battle.relicManager.detail[493][a][b]==this.type){
                        this.loseHealth(500)
                    }
                }
            }
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
            if(this.battle.modded(178)&&(this.name.includes('N')||this.name.includes('n'))){
                this.statusEffect('Strength',3)
            }
            if(this.battle.modded(180)&&(this.name.includes('L')||this.name.includes('l'))){
                this.statusEffect('Strength',3)
            }
            if(this.battle.modded(204)&&this.name.includes('Management')){
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
            if(this.battle.modded(162)){
                this.statusEffect('Buffer',1)
            }
            if(this.battle.modded(163)){
                this.statusEffect('Regeneration',4)
            }
            if(this.battle.modded(167)){
                this.statusEffect('Fragile Speed Up',2)
            }
            if(this.battle.modded(170)){
                let offset=[random(-80,80),random(-80,80)]
                this.offset.position.x+=offset[0]
                this.offset.position.y+=offset[1]
                this.offset.life.x+=offset[0]
                this.offset.life.y+=offset[1]
            }
            if(this.battle.modded(173)){
                this.statusEffect('Heal on Hit Taken',1)
            }
            if(this.battle.modded(179)){
                this.statusEffect('Counter Block Combat',2)
            }
            if(this.battle.modded(189)){
                this.statusEffect('Control',1)
            }
            if(this.battle.modded(190)){
                this.statusEffect('Currency',25)
            }
            if(this.battle.modded(191)&&floor(random(0,2))==0){
                this.statusEffect('Reflect',1)
            }
            if(this.battle.modded(192)){
                this.subAttackTypeSwitch([[0,1,12,[]]])
                this.subAttackTypeSwitch([[0,6,12,[]]])
                this.subAttackTypeSwitch([[0,38,12,[]]])
                this.subAttackTypeSwitch([[0,79,12,[]]])
                this.subAttackTypeSwitch([[0,100,12,[]]])
            }
            if(this.battle.modded(194)){
                this.statusEffect('Mailshield',1)
            }
            if(this.battle.modded(195)){
                this.statusEffect('Intent Change Threshold',20)
            }
            if(this.battle.modded(199)){
                this.statusEffect('Dodge Cycle 2 1',1)
            }
            if(this.battle.modded(212)){
                this.statusEffect('Counter Gun Once Per Turn',6)
                this.statusEffect('Counter Gun Once',6)
            }
            if(this.battle.modded(218)&&floor(random(0,20))==0){
                this.statusEffect('Protected Invisible',999)
            }
            if(this.battle.modded(219)){
                this.statusEffect('Numeric Explode on Death',4)
            }
            if(this.battle.modded(220)){
                this.size*=1.2
                this.base.size*=1.2
            }
            if(this.battle.modded(222)&&floor(random(0,4))==0){
                this.statusEffect('Revive',1)
            }
        }
        if(this.name.includes('Duck')){
            if(this.battle.modded(22)){
                this.life*=2
                this.base.life*=2
                this.collect.life*=2
            }
            if(this.battle.modded(106)){
                this.statusEffect('Double Damage Turn',999)
            }
        }
        switch(this.name){
            case 'Gangster':
                this.statusEffect('Counter Once Per Turn',game.ascend>=31?12:8)
                this.statusEffect('Counter Once',game.ascend>=31?12:8)
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
                this.statusEffect('Control',game.ascend>=31?3:2)
            break
            case 'Angry Gremlin':
                this.statusEffect('Strength on Hit',game.ascend>=31?2:1)
            break
            case 'Solar Shard':
                this.statusEffect('Vulnerable on Kill',game.ascend>=31?4:2)
            break
            case 'Lunar Shard':
                this.statusEffect('Weak on Kill',game.ascend>=31?4:2)
            break
            case 'Fireball':
                this.statusEffect('Counter All Combat',game.ascend>=31?2:1)
            break
            case 'Armored Ninja':
                this.addBlock(18)
                this.statusEffect('Retain Block',999)
            break
            case 'Louse':
                this.statusEffect('Single Counter Block',floor(random(3,8)))
            break
            case 'Shadow Trooper':
                if(game.ascend>=31){
                    this.statusEffect('Protected Invisible Next Turn',999)
                }else{
                    this.statusEffect('Invisible Per Turn',1)
                }
            break
            case 'Soul':
                this.statusEffect('Dissipating',5)
            break
            case 'Spike Pillar':
                this.statusEffect('Counter All Combat',8)
            break
            case 'Barbed Pillar':
                this.statusEffect('Counter Bleed All Combat',4)
            break
            case 'Glitch':
                this.statusEffect('End Move',floor(random(1,3)))
            break
            case 'Rewriter':
                this.statusEffect('Cannot Die',999)
                this.loseHealth(this.battle.combatantManager.finalBossSwitch)
            break
            case 'Mirror Shield':
                this.statusEffect('Reflect',1)
            break
            case 'L':
                this.statusEffect('Numeric Explode on Death',6)
            break
            case 'Lead Brick':
                this.statusEffect('Metallicize',2)
            break
            case 'Regen Balloon':
                this.statusEffect('Regeneration',game.ascend>=31?9:5)
            break
            case 'Precision':
                this.statusEffect('Dodge',1)
                this.statusEffect('Lasting Counter Once',game.ascend>=31?8:4)
            break
            case 'Legacy':
                this.statusEffect('Decrementing Armor',game.ascend>=31?20:10)
            break
            case 'Anomaly':
                this.statusEffect('Fragile Speed Up',game.ascend>=31?2:1)
            break
            case 'Recollection':
                this.statusEffect('Block Cycle 2 1',game.ascend>=31?24:10)
            break
            case 'Daughter of Heaven':
                this.statusEffect('Heal on Hit Taken',game.ascend>=31?5:3)
            break
            case 'Keystone':
                this.statusEffect('Damage Taken Down',game.ascend>=31?5:3)
            break
            case 'Eternal Judge':
                this.sins=[]
                this.infoAnim.sins=[]
                this.loseHealth(this.battle.combatantManager.finalBossSwitch)
            break
            case 'Golden Duck':
                this.statusEffect('Currency',100)
            break
            case 'Management Light Infantry':
                this.statusEffect('Dodge',2)
            break
            case 'Gangster Assassin':
                this.statusEffect('Counter Once Per Turn',game.ascend>=31?18:12)
                this.statusEffect('Counter Bleed Once Per Turn',1)
                this.statusEffect('Counter Once',game.ascend>=31?18:12)
                this.statusEffect('Counter Bleed Once',1)
            break
            case 'Crusader':
                this.statusEffect('Armor',game.ascend>=31?20:10)
            break
            case 'Exploding Wall':
                this.statusEffect('Numeric Explode on Death',20)
            break
            case 'Sick Duck':
                this.statusEffect('Weak on Kill',game.ascend>=31?4:2)
                this.statusEffect('Vulnerable on Kill',game.ascend>=31?4:2)
                this.statusEffect('Frail on Kill',game.ascend>=31?4:2)
            break
            case 'Spirit of Wealth':
                this.statusEffect('Currency',25)
                this.statusEffect('Control',1)
            break
            case 'Puffball':
                this.statusEffect('Buffer',game.ascend>=31?4:2)
            break
            case 'Brawler':
                this.statusEffect('Strength Per Turn',1)
            break
            case 'Mailman':
                this.statusEffect('Mailshield',game.ascend>=31?5:4)
            break
            case 'Thoughtless':
                if(!this.battle.modded(195)){
                    this.statusEffect('Intent Change Threshold',20)
                }
                this.accelerate=0
            break
            case 'Speedrunner':
                for(let a=0,la=this.battle.players;a<la;a++){
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(a)].statusEffect('Play Limit Combat',game.ascend>=31?4:5)
                }
            break
            case 'Lockdown':
                this.statusEffect('Counter Once Per Turn',8)
                this.statusEffect('Counter Once',8)
                this.statusEffect('Metallicize',game.ascend>=31?10:4)
            break
            case 'Adrian Kane':
                this.statusEffect('Damage Cap',game.ascend>=31?25:50)
            break
            case 'Armored Biker':
                this.statusEffect('Metallicize',game.ascend>=31?10:6)
            break
            case 'Zombie Duck':
                this.statusEffect('Revive',game.ascend>=31?3:2)
            break
            case 'Graphite Block':
                this.statusEffect('Armor',game.ascend>=31?16:8)
                this.statusEffect('Armor Per Turn',1)
            break
            case 'Spirit of Elegance':
                this.statusEffect('Max Health Gift',1)
                this.statusEffect('Control',1)
            break
            case 'Hit Squad':
                this.addBlock(game.ascend>=31?16:32)
                this.statusEffect('Retain Block',999)
                this.statusEffect('Fragile',1)
            break
            case 'Red':
                if(this.battle.player.includes(24)){
                    this.life=0
                    this.statusEffect('Communized',1)
                    for(let a=0,la=this.battle.players;a<la;a++){
                        if(this.battle.player[a]==24){
                            this.communizers.push(a)
                        }
                    }
                }
            break
        }
        //mark b
        if(this.team==0){
            if(this.type<=constants.playerNumber){
                this.subHealthBuff(2)
            }
            if(game.ascend>=2&&(this.battle.encounter.class==0||this.battle.encounter.class==3||this.battle.encounter.class==4)||game.ascend>=3&&this.battle.encounter.class==1||game.ascend>=4&&this.battle.encounter.class==2){
                this.subAttackBuff([1,5],1.2)
            }
            if(game.ascend>=7&&(this.battle.encounter.class==0||this.battle.encounter.class==3||this.battle.encounter.class==4)||game.ascend>=8&&this.battle.encounter.class==1||game.ascend>=9&&this.battle.encounter.class==2){
                this.subHealthBuff(1.2)
                this.subAttackBuff([2],1.2)
            }
            if(game.ascend>=17&&(this.battle.encounter.class==0||this.battle.encounter.class==3||this.battle.encounter.class==4)||game.ascend>=18&&this.battle.encounter.class==1||game.ascend>=19&&this.battle.encounter.class==2){
                this.subAttackBuff([4,11],1.5)
            }
            /*if(game.ascend>=27&&(this.battle.encounter.class==0||this.battle.encounter.class==3||this.battle.encounter.class==4)||game.ascend>=28&&this.battle.encounter.class==1){
                let randombuffs=[
                    ['Double Damage',1],['Dodge',2],['Strength',2],['Dexterity',2],['Single Damage Up',6],
                    ['Retain Block',10],['Block Next Turn',10],['Armor',4],['Control',1],['Metallicize',2],
                    ['Buffer',1],['Take Half Damage',2],['Counter All',3],['Strength Per Turn',1],['Regeneration',5],
                    ['Dexterity Per Turn',1],['Strength on Hit',1],['Weak on Kill',2],['Vulnerable on Kill',2],['Single Counter Block',10],
                    ['Invisible',4],['Speed Up',1],['Strength Next Turn',3],['Conditioning',1],['Counter All Combat',1],
                    ['Heal on Hit',3],['Attack Bleed Combat',1],['Counter Block',3],['Single Damage Block Convert',2],['Triple Block',1],
                    ['Dexterity Next Turn',3],['1.5x Damage',2],['1.5x Block',2],['Block Up',2],['Damage Up',2],
                    ['Dexterity on Hit',1],['Heal Per Turn',2],['Survive Fatal',1],['Decrementing Armor',6],['Block Heal',3],
                    ['Fragile Damage Up',4],['Strength in 2 Turns',4],['Dexterity in 2 Turns',4]
                ]
                for(let a=0,la=2;a<la;a++){
                    let index=floor(random(0,randombuffs.length))
                    this.statusEffect(randombuffs[index][0],randombuffs[index][1])
                    randombuffs.splice(index,1)
                }
            }*/
            if(game.ascend>=30&&this.battle.encounter.class==2&&this.battle.nodeManager.world==3&&this.spec.includes(2)){
                this.subHealthBuff(1.5)
                this.subAttackBuff([1,2,5],1.2)
            }
            if(game.ascend>=31){
                switch(this.name){
                    case 'Human':
                        this.subAttackTypeSwitch([[0,1,38,[]]])
                    break
                    case 'Duck': case 'Big Duck': case 'Blue Duck':
                        this.subAttackTypeSwitch([[1,2,377,[1,'Dazed']]])
                    break
                    case 'Bouncer':
                        this.spec.push(0)
                        this.subAttackTypeSwitch([[0,3,7,[]]])
                    break
                    case 'Thug':
                        this.subAttackTypeSwitch([[0,6,28,[]]])
                    break
                    case 'Biker':
                        this.addAttack(117,[12])
                    break
                    case 'Drunk':
                        this.subAttackTypeSwitch([[2,1,12,[1.5]]])
                    break
                    case 'Drunk Boss':
                        this.statusEffect('Metallicize All',4)
                    break
                    case 'Monkey':
                        this.addBlock(4)
                        this.statusEffect('Armor',2)
                    break
                    case 'Trenchcoat':
                        this.subAttackTypeSwitch([[0,1,6,[]]])
                    break
                    case 'Trenchcoat Gunner': case 'Management Drone': case 'Gangster Machinegunner': case 'Personnel Carrier': case 'Gangster Machinegunner Informant':
                        this.spec.push(7)
                        this.move.type=11
                    break
                    case 'Goon':
                        this.spec.push(0)
                        this.subAttackBuff([1],2)
                        this.removeAttack(6)
                    break
                    case 'Slaver':
                        this.subAttackTypeSwitch([[2,17,17,[2,2]]])
                    break
                    case 'Fungal Duck':
                        this.subAttackTypeSwitch([[2,18,18,[2]]])
                    break
                    case 'Orb Walker':
                        this.statusEffect('Strength Per Turn',1)
                        this.statusEffect('Control',1)
                    break
                    case 'Pointy': case 'Sentry': case 'Prisoner': case 'Elf Archer': case 'Normal1': case 'Structural Energy': case 'Disorder Energy': case 'Prisoner Informant': case 'Inconsistent': case 'Latency': case 'Dark Priest': case 'Brawler':
                        this.spec.push(0)
                    break
                    case 'Romeo':
                        this.spec.push(0)
                        this.subAttackTypeSwitch([[1,6,27,[2]]])
                    break
                    case 'Billy Beatup':
                        this.statusEffect('Metallicize',5)
                    break
                    case 'Monkey Gangster':
                        this.addBlock(6)
                        this.statusEffect('Armor',3)
                    break
                    case 'Slime': case 'Spike Slime': case 'Slimoid':
                        this.subAttackTypeSwitch([[2,22,22,[1,2]]])
                    break
                    case 'Cartel':
                        this.subAttackTypeSwitch([[2,24,24,[1,2]]])
                    break
                    case 'Ninja':
                        this.subAttackTypeSwitch([[0,9,28,[]],[0,20,99,[]]])
                    break
                    case 'Red':
                        this.subAttackTypeSwitch([[2,15,15,[1,2]],[2,25,25,[2]]])
                    break
                    case 'Batter':
                        this.subAttackTypeSwitch([[2,26,26,[2]]])
                    break
                    case 'Slippery Gangster': case 'Management Light Infantry':
                        this.statusEffect('Retain Dodge',999)
                    break
                    case 'Gangster Gunner':
                        this.statusEffect('Counter Gun Once Per Turn',6)
                        this.statusEffect('Counter Gun Once',6)
                    break
                    case 'Spheron':
                        this.statusEffect('Metallicize',2)
                    break
                    case 'Enforcer':
                        this.statusEffect('Counter Push Once Per Turn',4)
                        this.statusEffect('Counter Push Once',4)
                    break
                    case 'Rock Golem':
                        this.subAttackTypeSwitch([[0,4,10,[]]])
                    break
                    case 'Big Slime': case 'Big Spike Slime': case 'Big Slimoid':
                        this.subAttackTypeSwitch([[2,32,32,[1,2]]])
                    break
                    case 'Moss Creature': case 'Deployer': case 'Chief Deployer':
                        this.statusEffect('Armor',5)
                    break
                    case 'Goblin':
                        this.attack.splice(0,1)
                        this.attack.splice(0,1)
                        this.attack.splice(2,1)
                    break
                    case 'Agent Duck':
                        this.statusEffect('Attack Bleed Combat',2)
                    break
                    case 'Nerfer': case 'Buffer':
                        this.removeAttack(1)
                        this.removeAttack(4)
                        this.subAttackTypeSwitch([[2,6,6,[1.5]]])
                    break
                    case 'Scrapper': case 'Champion': case 'Avant Guard': case 'Carbonado Robot': case 'Pure Swordsman': case 'Wiz': case 'Gangmaster': case 'Bodyguard': case 'Chief Engineering Officer': case 'Purge X02': case 'Caporegime':
                        this.spec.push(1)
                        this.spec.splice(this.spec.indexOf(0),1)
                    break
                    case 'Fat Scrapper':
                        this.removeAttack(21)
                        this.behavior=0
                    break
                    case 'Looter': case 'Mugger':
                        this.subAttackTypeSwitch([[2,67,67,[1,4]]])
                    break
                    case 'Little Guy':
                        this.subAttackTypeSwitch([[1,1,378,[8]]])
                        this.removeAttack(4)
                    break
                    case 'Management Prototype':
                        this.spec.push(7)
                        this.removeAttack(4)
                    break
                    case 'Management Robot': case 'Destructor Bot': case 'Riot Police': case 'Duckforce': case 'Management Robot Commander': case 'Rocket Launcher Management Robot': case 'Shotgun Management Robot': case 'Rammer Robot': case 'Management Experimental Robot':
                        this.spec.push(7)
                    break
                    case 'Management Soldier':
                        this.removeAttack(10)
                        this.statusEffect('Metallicize All',3)
                    break
                    case 'Management Officer':
                        this.subAttackTypeSwitch([[2,26,26,[2]]])
                    break
                    case 'Management Special Forces':
                        this.spec.splice(this.spec.indexOf(0),1)
                        this.spec.push(1)
                    break
                    case 'Sneaky Gremlin': case 'Lead Brick': case 'Capitalist':
                        this.move.speed++
                    break
                    case 'Fat Gremlin':
                        this.statusEffect('Single Counter Block',12)
                    break
                    case 'Golden Duck':
                        this.move.type=12
                    break
                    case 'Solar Shard':
                        this.subAttackTypeSwitch([[2,39,39,[3]]])
                    break
                    case 'Lunar Shard':
                        this.addAttack(39,[2,'Lunar Dust'])
                    break
                    case 'Lunar Dust':
                        this.subAttackTypeSwitch([[1,85,379,[1,1]]])
                    break
                    case 'Management Sniper':
                        this.behavior=0
                        this.removeAttack(21)
                        this.move.type=11
                    break
                    case 'Management Caller':
                        this.removeAttack(21)
                        this.behavior=9
                    break
                    case 'Management Custodian':
                        this.move.type=12
                        this.spec.push(1)
                        this.subAttackTypeSwitch([[2,92,92,[2]]])
                    break
                    case 'Walker Driver': case 'Walker Driver Informant':
                        this.removeAttack(4)
                        this.statusEffect('Buffer',1)
                    break
                    case 'Prison Guard':
                        this.move.type=2
                        this.statusEffect('Metallicize',4)
                    break
                    case 'Lightspeed':
                        this.move.speed++
                        this.subAttackTypeSwitch([[0,101,77,[]],[0,19,367,[]],[0,99,380,[]],[0,100,38,[]]])
                    break
                    case 'Swordmaster':
                        this.removeAttack(21)
                        this.behavior=1
                    break
                    case 'Gas Man':
                        this.subAttackTypeSwitch([[0,6,38,[]],[0,104,381,[]]])
                    break
                    case 'Gremlin':
                        this.spec.push(0)
                        this.subAttackTypeSwitch([[0,9,28,[]]])
                    break
                    case 'Flying Rock':
                        this.subAttackTypeSwitch([[1,4,72,[1]],[0,6,38,[]]])
                    break
                    case 'Repulsor':
                        this.removeAttack(6)
                        this.subAttackTypeSwitch([[1,87,157,[2,'Dazed']]])
                    break
                    case 'Management Autoduck':
                        this.spec.push(7)
                        this.subAttackTypeSwitch([[0,2,104,[]],[0,6,79,[]]])
                    break
                    case 'Modicum':
                        this.removeAttack(109)
                        this.statusEffect('Heal Per Turn',6)
                    break
                    case 'Bush Thing':
                        this.spec.push(0)
                        this.subAttackTypeSwitch([[1,6,27,[1]],[2,108,108,[2]]])
                    break
                    case 'Fireball':
                        this.behavior=0
                        this.removeAttack(21)
                        this.statusEffect('Attack Burn Combat',1)
                    break
                    case 'Dead Shell':
                        this.statusEffect('Armor',14)
                    break
                    case 'Executive':
                        this.removeAttack(6)
                        this.subAttackTypeSwitch([[2,12,12,[1.2]]])
                    break
                    case 'Mechanized':
                        this.removeAttack(126)
                        this.statusEffect('Metallicize All',6)
                        this.subAttackTypeSwitch([[2,124,124,[1,2]]])
                    break
                    case 'Ninja Master':
                        this.subAttackTypeSwitch([[0,121,382,[]],[0,122,383,[]]])
                        this.move.type=13
                    break
                    case 'Bomber Boy':
                        this.subAttackTypeSwitch([[1,127,181,[2,'Shrapnel']]])
                    break
                    case 'Intern':
                        this.spec.push(0)
                        this.removeAttack(1)
                        this.removeAttack(4)
                        this.statusEffect('Armor',4)
                        this.subAttackTypeSwitch([[2,6,6,[1.5]]])
                    break
                    case 'Assistant Hiring Officer':
                        this.move.type=11
                        this.spec.push(0)
                    break
                    case 'Bolt':
                        this.removeAttack(132)
                        this.subAttackTypeSwitch([[1,131,384,[1,'Electrocuted']]])
                    break
                    case 'Jet':
                        this.subAttackTypeSwitch([[2,134,134,[1,2]]])
                    break
                    case 'Armored Ninja':
                        this.statusEffect('All Strength Cycle 4 4',1)
                    break
                    case 'Assistant Fitness Officer': case 'MMIS Agent':
                        this.statusEffect('Strength Per Turn',1)
                    break
                    case 'Corrupt Detective':
                        this.move.type=11
                        this.statusEffect('Counter Once Per Turn',8)
                        this.statusEffect('Counter Once',8)
                    break
                    case 'Reichswehr':
                        this.subAttackTypeSwitch([[2,151,151,[1,2]]])
                    break
                    case 'Louse':
                        this.spec.push(0)
                        this.statusEffect('Retain Block',999)
                    break
                    case 'Fungling':
                        this.spec.push(7)
                        this.subAttackTypeSwitch([[0,4,10,[]]])
                    break
                    case 'Hwurmp': case 'Antihwurmp':
                        this.spec.push(7)
                        this.move.type=0
                        this.addBlock(12)
                        this.statusEffect('Retain Block',2)
                    break
                    case 'Bee':
                        this.spec.push(7)
                        this.subAttackTypeSwitch([[2,2,2,[2]]])
                    break
                    case 'Beekeeper':
                        this.subAttackTypeSwitch([[2,155,155,[1.5]]])
                    break
                    case 'Pixie':
                        this.subAttackTypeSwitch([[2,1,1,[1.5]],[1,1,378,[4]]])
                    break
                    case 'PhD':
                        this.subAttackTypeSwitch([[2,158,158,[1,2]],[2,159,159,[3]]])
                    break
                    case 'Glimmerrer':
                        this.statusEffect('Single Counter Block',floor(random(6,16)))
                        this.statusEffect('Retain Block',999)
                    break
                    case 'Host Drone':
                        this.move.type=11
                        this.statusEffect('Regeneration',3)
                    break
                    case 'Host': case 'Embodimental Destabilization': case 'Embodimental Element':
                        this.spec.push(1)
                    break
                    case 'Junkie':
                        this.removeAttack(167)
                        for(let a=0,la=5;a<la;a++){
                            this.randomStatus(floor(random(1,6)),[1])
                        }
                    break
                    case 'Divine Guard':
                        this.statusEffect('Metallicize',10)
                        this.subAttackTypeSwitch([[2,72,72,[1.5]]])
                    break
                    case 'Rusty':
                        this.statusEffect('Counter Weak All Combat',1)
                    break
                    case 'Thornvine':
                        this.statusEffect('Counter Block Combat',2)
                        this.move.speed++
                    break
                    case 'Vengeful':
                        this.removeAttack(210)
                        this.removeAttack(214)
                        this.spec.push(1)
                        this.spec.splice(this.spec.indexOf(0),1)
                    break
                    case 'Coffee Commander':
                        this.spec.push(7)
                        this.subAttackTypeSwitch([[2,164,164,[0.8]]])
                    break
                    case 'Tech Support':
                        this.removeAttack(29)
                        this.statusEffect('Armor',12)
                        this.statusEffect('Retain Block',999)
                    break
                    case 'Jester':
                        this.subAttackTypeSwitch([[0,247,385,[]],[2,248,248,[1,1.5]]])
                    break
                    case 'Lalex':
                        this.removeAttack(251)
                        this.addAttack(367,[8])
                    break
                    case 'Boss1':
                        this.subAttackTypeSwitch([[1,4,254,[1]]])
                    break
                    case 'Danger':
                        this.subAttackTypeSwitch([[2,255,255,[1,2]],[2,256,256,[1,2]]])
                    break
                    case 'Obstruction':
                        this.subAttackTypeSwitch([[1,6,386,[1]]])
                    break
                    case 'Kugelblitz':
                        this.subAttackTypeSwitch([[2,262,262,[1.2]],[2,263,264,[1.2]],[0,264,387,[]],[0,265,388,[]]])
                    break
                    case 'Voidglass':
                        this.subAttackTypeSwitch([[1,12,81,[1,'Void']]])
                    break
                    case 'Intruder':
                        this.subAttackTypeSwitch([[2,270,270,[1,2]]])
                    break
                    case 'Relic':
                        this.statusEffect('1.5x Damage',1)
                    break
                    case 'Anomaly':
                        this.subAttackTypeSwitch([[0,2,19,[]]])
                    break
                    case 'Concentric':
                        this.statusEffect('Counter Shockwave Once',6)
                        this.statusEffect('Counter Shockwave Once Per Turn',6)
                    break
                    case 'Dimension Wanderer':
                        this.subAttackTypeSwitch([[2,300,300,[1.5]],[2,297,297,[1,2]],[2,298,298,[1,2]],[2,299,299,[1,2]]])
                    break
                    case 'Management Shotgunner':
                        this.spec.push(7)
                        this.statusEffect('Armor',10)
                    break
                    case 'Ducky Donka':
                        this.subAttackTypeSwitch([[2,370,370,[1,1.5]]])
                    break
                    case 'Ducky McDuff':
                        this.subAttackTypeSwitch([[2,371,371,[1,1.5]]])
                    break
                    case 'Kugelblitz Particle':
                        this.subAttackTypeSwitch([[0,374,389,[]],[0,375,390,[]]])
                    break
                    case 'Void Duck':
                        this.subAttackTypeSwitch([[1,2,377,[1,'Void']]])
                    break
                    case 'General Duckion':
                        this.subAttackTypeSwitch([[2,40,40,[2]]])
                    break
                    case 'Slime Boss':
                        this.subAttackTypeSwitch([[2,53,53,[1,2]]])
                        this.subAttackTypeSwitch([[2,5,54,[1,2]]])
                    break
                    case 'Slow King':
                        this.subAttackTypeSwitch([[0,57,391,[]]])
                    break
                    case 'Shield Particle':
                        this.statusEffect('Retain Block',999)
                    break
                    case 'Donu':
                        this.statusEffect('Strength',1)
                    break
                    case 'Deca':
                        this.subAttackTypeSwitch([[0,66,358,[]],[1,65,392,[2]]])
                    break
                    case 'Hexaghost Core':
                        this.removeAttack(21)
                        this.behavior=9
                    break
                    case 'Hexaghost Orb':
                        this.subAttackTypeSwitch([[2,22,22,[1,2]]])
                    break
                    case 'Flame':
                        this.subAttackTypeSwitch([[2,54,54,[1,2]]])
                    break
                    case 'Buried':
                        this.subAttackTypeSwitch([[0,1,9,[]],[0,2,19,[]],[0,3,7,[]],[0,4,10,[]]])
                    break
                    case 'Roger Reviv':
                        this.behavior=9
                        for(let a=0,la=2;a<la;a++){
                            this.battle.quickReinforce('Cartel')
                        }
                    break
                    case 'Sharpshot':
                        this.move.type=11
                        this.move.speed++
                    break
                    case 'Bronze Orb A': case 'Bronze Orb C':
                        this.statusEffect('Metallicize',6)
                    break
                    case 'Bronze Automaton':
                        this.removeAttack(21)
                    break
                    case 'Comrade':
                        this.statusEffect('Buffer',2)
                        this.statusEffect('Regeneration',10) 
                    break
                    case 'Councilman':
                        this.move.speed++
                        this.subAttackTypeSwitch([[0,9,28,[]]])
                    break
                    case 'Lunaria':
                        this.statusEffect('Block Cycle 2 1',40)
                        this.statusEffect('Heal Per Turn',10)
                        for(let a=0,la=2;a<la;a++){
                            this.battle.quickReinforce('Soul')
                        }
                    break
                    case 'Archivist':
                        this.move.type=12
                        this.behavior=4
                        this.removeAttack(352)
                        this.addAttack(352,[])
                    break
                    case 'Rewriter':
                        this.statusEffect('Power Play Strength',1)
                    break
                    case 'Eternal Judge':
                        let sin=floor(random(0,7))
                        this.sins.push(sin)
                        this.infoAnim.sins.push(0)
                        this.addSin(sin)
                    break
                    case 'Spirit of Wealth': case 'Spirit of Elegance':
                        this.addBlock(26)
                        this.statusEffect('Retain Block',3)
                    break
                    case 'Pistol Biker':
                        this.move.type=11
                    break
                    case 'Mailman':
                        this.subAttackTypeSwitch([[2,5,5,[1.5]]])
                    break
                    case 'Guard':
                        this.spec.push(0)
                        this.statusEffect('Metallicize',3)
                    break
                    case 'Bar Security':
                        this.statusEffect('Counter Push Once Per Turn',6)
                        this.statusEffect('Counter Push Once',6)
                    break
                    case 'Bartender':
                        this.subAttackTypeSwitch([[2,92,92,[2]]])
                    break
                    case 'Thoughtless':
                        this.subAttackTypeSwitch([[0,147,415,[]]])
                    break
                    case 'Cutthroat':
                        this.statusEffect('Dodge Cycle 2 2',1)
                        this.statusEffect('Dodge',1)
                    break
                    case 'Psychologist':
                        this.subAttackTypeSwitch([[0,9,28,[]]])
                    break
                    case 'Adrian Kane':
                        this.spec.push(7)
                        this.subAttackTypeSwitch([[2,406,406,[0.8]]])
                    break
                    case 'Prison Guard Gunner':
                        this.move.type=12
                        this.statusEffect('Metallicize',4)
                    break
                    case 'Shield Prison Guard':
                        this.statusEffect('Metallicize',4)
                        this.statusEffect('Armor',4)
                    break
                    case 'Half Spikeball':
                        this.addBlock(8)
                        this.statusEffect('Retain Block',3)
                    break
                    case 'Pistol Duck':
                        this.subAttackTypeSwitch([[1,236,443,[1,'Dazed']]])
                    break
                    case 'Old Konaian':
                        this.move.speed++
                        this.statusEffect('Armor',6)
                    break
                    case 'HVM Contractor':
                        this.statusEffect('Metallicize All',2)
                    break
                    case 'Warning Man':
                        this.battle.quickReinforce('Cartel')
                    break
                    case 'Big Bounce':
                        this.spec.push(0)
                        this.subAttackTypeSwitch([[0,447,106,[]]])
                    break
                    case 'Pinstripe':
                        this.subAttackTypeSwitch([[2,446,446,[1.5]]])
                    break

                    //mark 31
                }
            }
            if(game.ascend>=32){
                this.subHealthBuff(1.2)
                this.subAttackBuff([1,2,5],1.2)
            }
            if(this.battle.players>1){
                this.subHealthBuff(1.5)
                this.subAttackBuff([1,2,5],1.5)
            }
            this.normalizeAttack()
        }else if(this.type<=constants.playerNumber){
            if(game.ascend>=6){
                this.life*=0.75
                this.collect.life*=0.75
            }
            if(game.ascend>=14){
                this.base.life*=0.9
            }
        }
        if(variants.lowhealth){
            this.subHealthBuff(0.2)
        }
        if(variants.midhealth){
            this.subHealthBuff(0.5)
        }
        if(variants.shortmap&&this.team==0){
            this.subHealthBuff(0.8**this.battle.nodeManager.world)
            if(this.battle.encounter.class==2){
                this.subHealthBuff(0.9)
            }
        }
        if(variants.shortermap&&this.team==0){
            this.subHealthBuff(0.7**this.battle.nodeManager.world)
            if(this.battle.encounter.class==2){
                this.subHealthBuff(0.8)
            }
        }
        if(this.spec.includes(6)){
            this.threshold=this.life-25
        }
    }
    subHealthBuff(value){
        this.life=round(this.life*value)
        this.base.life=round(this.base.life*value)
        this.collect.life=round(this.collect.life*value)
    }
    subAttackBuff(classes,value){
        for(let a=0,la=this.attack.length;a<la;a++){
            if(
                classes.includes(types.attack[this.attack[a].type].class)&&this.attack[a].effect.length>=1&&
                (this.attack[a].effect[0]>1||types.attack[this.attack[a].type].class==1||types.attack[this.attack[a].type].class==2||types.attack[this.attack[a].type].class==5)
            ){
                for(let b=0,lb=this.attack[a].effect.length;b<lb;b++){
                    if(
                        (this.attack[a].effect[b]<0||this.attack[a].effect[b]>0)
                        &&!(this.attack[a].type==67&&b==1)
                        &&!(this.attack[a].type==124&&b==1)
                        &&!(this.attack[a].type==141&&b==1)
                        &&!(this.attack[a].type==150&&b==1)
                        &&!(this.attack[a].type==163&&b==1)
                        &&!(this.attack[a].type==198&&b==1)
                        &&!(this.attack[a].type==254&&b==1)
                        &&!(this.attack[a].type==271&&b==1)
                        &&!(this.attack[a].type==281&&b==1)
                        &&!(this.attack[a].type==329&&b==1)
                        &&!(this.attack[a].type==331&&b==1)
                        &&!(this.attack[a].type==342&&b==1)
                        &&this.attack[a].type!=39
                        &&this.attack[a].type!=40
                        &&this.attack[a].type!=41
                        &&this.attack[a].type!=42
                        &&this.attack[a].type!=51
                        &&this.attack[a].type!=52
                        &&this.attack[a].type!=56
                        &&this.attack[a].type!=57
                        &&this.attack[a].type!=120
                        &&this.attack[a].type!=155
                        &&this.attack[a].type!=300
                        &&this.attack[a].type!=391
                    ){
                        this.attack[a].effect[b]=this.attack[a].effect[b]*value
                        this.attack[a].baseEffect[b]=this.attack[a].baseEffect[b]*value
                    }
                }
            }
        }
    }
    subAttackBaseBuff(classes,value){
        for(let a=0,la=this.attack.length;a<la;a++){
            if(
                classes.includes(types.attack[this.attack[a].type].class)&&this.attack[a].effect.length>=1&&
                (this.attack[a].effect[0]>1||types.attack[this.attack[a].type].class==1||types.attack[this.attack[a].type].class==2||types.attack[this.attack[a].type].class==5)
            ){
                for(let b=0,lb=this.attack[a].effect.length;b<lb;b++){
                    if(
                        (this.attack[a].effect[b]<0||this.attack[a].effect[b]>0)
                        &&!(this.attack[a].type==67&&b==1)
                    ){
                        this.attack[a].effect[b]=this.attack[a].effect[b]+this.attack[a].baseEffect[b]*value
                    }
                }
            }
        }
    }
    subAttackTypeSwitch(switches){
        for(let a=0,la=this.attack.length;a<la;a++){
            for(let b=0,lb=switches.length;b<lb;b++){
                if(this.attack[a].type==switches[b][1]){
                    this.attack[a].type=switches[b][2]
                    switch(switches[b][0]){
                        case 1:
                            for(let c=0,lc=switches[b][3].length;c<lc;c++){
                                this.attack[a].effect.push(switches[b][3][c])
                                this.attack[a].baseEffect.push(switches[b][3][c])
                            }
                        break
                        case 2:
                            for(let c=0,lc=switches[b][3].length;c<lc;c++){
                                if(switches[b][3][c]!=1){
                                    this.attack[a].effect[c]=this.attack[a].effect[c]*switches[b][3][c]
                                    this.attack[a].baseEffect[c]=this.attack[a].baseEffect[c]*switches[b][3][c]
                                }
                            }
                        break
                    }
                }
            }
        }
    }
    normalizeAttack(){
        for(let a=0,la=this.attack.length;a<la;a++){
            for(let b=0,lb=this.attack[a].effect.length;b<lb;b++){
                if(typeof this.attack[a].effect[b]=='number'){
                    this.attack[a].effect[b]=round(this.attack[a].effect[b])
                    this.attack[a].baseEffect[b]=round(this.attack[a].baseEffect[b])
                }
            }
        }
    }
    addAttack(type,effect){
        this.attack.push({type:type,effect:copyArray(effect),baseEffect:copyArray(effect)})
        this.infoAnim.intent.push(0)
    }
    removeAttack(type){
        for(let a=0,la=this.attack.length;a<la;a++){
            if(this.attack[a].type==type){
                this.attack.splice(a,1)
                a--
                la--
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
            case 'Certes': case 'Airi': case 'Shiru': case 'Daiyousei': case 'Sanae': case 'Shinmyoumaru': case 'Merlin': case 'Sagume':
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

                    this.graphics.arms[g].top.x=this.parts.arms[g].top.x*lsin((this.name=='Sagume'?-93+g*186:this.spin.arms[g].top)+this.anim.direction),
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
            case 'Donakho': case 'Ducopo': case 'Dukelis':
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
            case 'Duck': case 'Fungal Duck': case 'Duckforce': case 'Big Duck': case 'Agent Duck': case 'General Duckion': case 'Blue Duck': case 'Management Autoduck': case 'Fat Duck': case 'Void Duck': case 'Golden Duck': case 'Bowler Duck': case 'Ducky Donka': case 'Ducky McDuff': case 'Sick Duck': case 'Zombie Duck': case 'Pistol Duck':
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
            case 'Slime': case 'Big Slime': case 'Spike Slime': case 'Big Spike Slime': case 'Slime Boss': case 'Slimoid': case 'Big Slimoid': case 'Modicum': case 'Rock Golem': case 'Shield Particle': case 'Bush Thing': case 'Fireball': case 'Fungling': case 'Bee': case 'Pixie': case 'Darkblot': case 'Lead Brick': case 'Puffball': case 'Graphite Block': case 'Rainbow Slime': case 'Big Rainbow Slime':
                for(let g=0;g<2;g++){
                    this.parts.arms[g].middle.x=this.parts.arms[g].top.x+lsin(this.anim.arms[g].top)*this.anim.arms[g].length.top
                    this.parts.arms[g].middle.y=this.parts.arms[g].top.y+lcos(this.anim.arms[g].top)*this.anim.arms[g].length.top

                    this.graphics.arms[g].top.x=this.parts.arms[g].top.x*lsin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].top.y=this.parts.arms[g].top.y
                    this.graphics.arms[g].middle.x=this.parts.arms[g].middle.x*lsin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].middle.y=this.parts.arms[g].middle.y
                }
            break
            case 'Turret': case 'Explosive Turret': case 'Multiturret': case 'Repulse Turret': case 'Machine Gun': case 'Miniturret': case 'Armored Turret': case 'Shotgun': case 'Swarm Turret':
                this.graphics={arms:[{bottom:{x:lsin(this.anim.direction)*40,y:-25}},{bottom:{x:lsin(this.anim.direction)*40,y:-25}}]}
            break
            case 'Spheron': case 'Flame': case 'Hexaghost Orb': case 'Hexaghost Core': case 'Host': case 'Host Drone': case 'Thornvine': case 'Keystone': case 'Spirit of Wealth': case 'Spirit of Elegance':
            case 'Bronze Orb C': case 'Bronze Orb A': case 'Sentry': case 'Flying Rock': case 'Repulsor': case 'Dead Shell': case 'Management Drone': case 'Personnel Carrier': case 'Louse': case 'Hwurmp': case 'Glimmerrer': case 'Antihwurmp': case 'Half Spikeball':
            case 'Wall': case 'Spike Pillar': case 'Projector': case 'Readout': case 'Strengthener': case 'Barbed Pillar': case 'Gun Rack': case 'Metal Box': case 'Upgrader': case 'Transformer': case 'Doubler': case 'Exhauster': case 'Teleporter Start': case 'Teleporter End': case 'Antizone': case 'Mirror Shield': case 'Exploding Wall':
            break
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
        let transformBase=transformDirection(0,this.goal.anim.direction)
        if(this.intent==-1){
            this.intent=0
        }
        switch(this.attack[this.intent].type){
            case 1: case 2: case 3: case 11: case 13: case 22: case 23: case 31: case 34: case 35:
            case 36: case 37: case 97: case 101: case 103: case 113: case 116: case 121: case 122: case 209:
            case 212: case 229: case 242: case 246: case 247: case 251: case 252: case 270: case 271: case 274:
            case 282: case 295: case 305: case 309: case 332: case 341: case 355: case 369: case 370: case 371:
            case 372: case 373: case 377: case 378: case 399: case 412: case 424: case 426: case 434: case 437:
            case 440:
                return this.battle.modded(57)?[
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0],this.tilePosition.y+transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*2,this.tilePosition.y+transformBase[1]*2)
                ]:
                [this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0],this.tilePosition.y+transformBase[1])]
            case 6: case 7: case 8: case 14: case 15: case 19: case 20: case 24: case 27: case 30:
            case 32: case 33: case 61: case 62: case 66: case 67: case 76: case 77: case 96: case 107:
            case 112: case 138: case 139: case 149: case 156: case 183: case 203: case 211: case 223: case 224:
            case 248: case 250: case 253: case 258: case 260: case 272: case 273: case 275: case 276: case 277:
            case 297: case 298: case 299: case 310: case 317: case 325: case 329: case 342: case 343: case 354:
            case 374: case 375: case 382: case 383: case 386: case 394: case 403: case 429: case 430: case 433:
            case 435:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0],this.tilePosition.y+transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*2,this.tilePosition.y+transformBase[1]*2)
                ]
            case 71: case 73: case 79: case 99: case 143: case 172: case 175: case 312: case 319: case 322:
            case 339: case 348: case 367: case 385: case 389: case 390: case 397: case 447:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0],this.tilePosition.y+transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*2,this.tilePosition.y+transformBase[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*3,this.tilePosition.y+transformBase[1]*3)
                ]
            case 100: case 304: case 347: case 380:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0],this.tilePosition.y+transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*2,this.tilePosition.y+transformBase[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*3,this.tilePosition.y+transformBase[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*4,this.tilePosition.y+transformBase[1]*4)
                ]
            case 9: case 60: case 64: case 69: case 82: case 84: case 95: case 104: case 114: case 124:
            case 153: case 264: case 265: case 278: case 308: case 330: case 368: case 395: case 441:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0],this.tilePosition.y+transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1])
                ]
            case 12: case 38: case 45: case 47: case 50: case 59: case 80: case 81: case 83: case 89:
            case 90: case 91: case 98: case 106: case 115: case 117: case 118: case 119: case 123: case 125:
            case 129: case 130: case 134: case 135: case 140: case 141: case 144: case 145: case 148: case 151:
            case 152: case 154: case 158: case 160: case 161: case 162: case 165: case 173: case 178: case 179:
            case 180: case 184: case 188: case 191: case 193: case 194: case 196: case 199: case 200: case 201:
            case 202: case 206: case 208: case 235: case 236: case 245: case 262: case 263: case 266: case 268:
            case 279: case 283: case 284: case 285: case 287: case 290: case 303: case 306: case 313: case 316:
            case 320: case 321: case 327: case 328: case 335: case 336: case 337: case 338: case 340: case 353:
            case 358: case 361: case 362: case 364: case 398: case 400: case 402: case 407: case 419: case 420:
            case 425: case 427: case 428: case 436: case 439: case 443: case 445: case 448:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0],this.tilePosition.y+transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*2,this.tilePosition.y+transformBase[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*3,this.tilePosition.y+transformBase[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*4,this.tilePosition.y+transformBase[1]*4),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*5,this.tilePosition.y+transformBase[1]*5),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*6,this.tilePosition.y+transformBase[1]*6)
                ]
            case 16: case 17: case 54: case 87: case 120: case 128: case 132: case 133: case 136: case 142:
            case 147: case 157: case 198: case 213: case 215: case 217: case 255: case 256: case 350: case 351:
            case 396: case 451: case 452:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-150)[0],this.tilePosition.y+transformDirection(0,-150)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-90)[0],this.tilePosition.y+transformDirection(0,-90)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-30)[0],this.tilePosition.y+transformDirection(0,-30)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,30)[0],this.tilePosition.y+transformDirection(0,30)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,90)[0],this.tilePosition.y+transformDirection(0,90)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,150)[0],this.tilePosition.y+transformDirection(0,150)[1])
                ]
            case 28: case 44: case 53: case 105: case 146: case 168: case 171: case 288: case 357: case 360:
            case 381: case 387: case 388: case 404: case 409:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0],this.tilePosition.y+transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*2,this.tilePosition.y+transformBase[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]*2)
                ]
            case 49: case 164: case 185: case 406: case 444:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0],this.tilePosition.y+transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*2,this.tilePosition.y+transformBase[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*3,this.tilePosition.y+transformBase[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*4,this.tilePosition.y+transformBase[1]*4),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*5,this.tilePosition.y+transformBase[1]*5),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*6,this.tilePosition.y+transformBase[1]*6),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]+transformBase[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]+transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]+transformBase[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]+transformBase[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]+transformBase[0]*3,this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]+transformBase[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]+transformBase[0]*4,this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]+transformBase[1]*4),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]+transformBase[0]*5,this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]+transformBase[1]*5),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]+transformBase[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]+transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]+transformBase[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]+transformBase[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]+transformBase[0]*3,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]+transformBase[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]+transformBase[0]*4,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]+transformBase[1]*4),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]+transformBase[0]*5,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]+transformBase[1]*5)
                ]
            case 55: case 166: case 192: case 415:
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
            case 85: case 86: case 379:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0],this.tilePosition.y+transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*2,this.tilePosition.y+transformBase[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformBase[1]+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformBase[1]+transformDirection(0,this.goal.anim.direction+60)[1])
                ]
            case 88: case 296: case 323: case 324: case 446:
                return [this.battle.tileManager.getTileIndex(this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.target)].tilePosition.x,this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.target)].tilePosition.y)]
            case 127: case 150: case 181: case 331: case 363:
                return [this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*2,this.tilePosition.y+transformBase[1]*2)]
            case 131: case 195: case 205: case 384:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0],this.tilePosition.y+transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*2,this.tilePosition.y+transformBase[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*3,this.tilePosition.y+transformBase[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*4,this.tilePosition.y+transformBase[1]*4),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*5,this.tilePosition.y+transformBase[1]*5),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*6,this.tilePosition.y+transformBase[1]*6),
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
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0],this.tilePosition.y+transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*2,this.tilePosition.y+transformBase[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformBase[1]+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformBase[1]+transformDirection(0,this.goal.anim.direction+60)[1])
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
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0],this.tilePosition.y+transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-120)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction-120)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+120)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+120)[1])
                ]
            case 214:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0],this.tilePosition.y+transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*2,this.tilePosition.y+transformBase[1]*2)
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
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0],this.tilePosition.y+transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*2,this.tilePosition.y+transformBase[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformBase[1]+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformBase[1]+transformDirection(0,this.goal.anim.direction+60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*3,this.tilePosition.y+transformBase[1]*3)
                ]
            case 222:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0],this.tilePosition.y+transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*2,this.tilePosition.y+transformBase[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformBase[1]+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformBase[1]+transformDirection(0,this.goal.anim.direction+60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*3,this.tilePosition.y+transformBase[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]*3,this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]*3,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]+transformDirection(0,this.goal.anim.direction-60)[0]*2,this.tilePosition.y+transformBase[1]+transformDirection(0,this.goal.anim.direction-60)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]+transformDirection(0,this.goal.anim.direction+60)[0]*2,this.tilePosition.y+transformBase[1]+transformDirection(0,this.goal.anim.direction+60)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*2+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformBase[1]*2+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*2+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformBase[1]*2+transformDirection(0,this.goal.anim.direction+60)[1])
                ]
            case 259:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0],this.tilePosition.y+transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]*2)
                ]
            case 286:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0],this.tilePosition.y+transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*2,this.tilePosition.y+transformBase[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*3,this.tilePosition.y+transformBase[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*4,this.tilePosition.y+transformBase[1]*4),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*5,this.tilePosition.y+transformBase[1]*5),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*6,this.tilePosition.y+transformBase[1]*6),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x-transformBase[0],this.tilePosition.y-transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x-transformBase[0]*2,this.tilePosition.y-transformBase[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x-transformBase[0]*3,this.tilePosition.y-transformBase[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x-transformBase[0]*4,this.tilePosition.y-transformBase[1]*4),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x-transformBase[0]*5,this.tilePosition.y-transformBase[1]*5),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x-transformBase[0]*6,this.tilePosition.y-transformBase[1]*6),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]+transformDirection(0,this.goal.anim.direction+120)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]+transformDirection(0,this.goal.anim.direction+120)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]*2+transformDirection(0,this.goal.anim.direction+120)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]*2+transformDirection(0,this.goal.anim.direction+120)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]*3+transformDirection(0,this.goal.anim.direction+120)[0]*3,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]*3+transformDirection(0,this.goal.anim.direction+120)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]*4+transformDirection(0,this.goal.anim.direction+120)[0]*4,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]*4+transformDirection(0,this.goal.anim.direction+120)[1]*4),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]*5+transformDirection(0,this.goal.anim.direction+120)[0]*5,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]*5+transformDirection(0,this.goal.anim.direction+120)[1]*5),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]*6+transformDirection(0,this.goal.anim.direction+120)[0]*6,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]*6+transformDirection(0,this.goal.anim.direction+120)[1]*6),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x-transformDirection(0,this.goal.anim.direction+60)[0]-transformDirection(0,this.goal.anim.direction+120)[0],this.tilePosition.y-transformDirection(0,this.goal.anim.direction+60)[1]-transformDirection(0,this.goal.anim.direction+120)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x-transformDirection(0,this.goal.anim.direction+60)[0]*2-transformDirection(0,this.goal.anim.direction+120)[0]*2,this.tilePosition.y-transformDirection(0,this.goal.anim.direction+60)[1]*2-transformDirection(0,this.goal.anim.direction+120)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x-transformDirection(0,this.goal.anim.direction+60)[0]*3-transformDirection(0,this.goal.anim.direction+120)[0]*3,this.tilePosition.y-transformDirection(0,this.goal.anim.direction+60)[1]*3-transformDirection(0,this.goal.anim.direction+120)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x-transformDirection(0,this.goal.anim.direction+60)[0]*4-transformDirection(0,this.goal.anim.direction+120)[0]*4,this.tilePosition.y-transformDirection(0,this.goal.anim.direction+60)[1]*4-transformDirection(0,this.goal.anim.direction+120)[1]*4),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x-transformDirection(0,this.goal.anim.direction+60)[0]*5-transformDirection(0,this.goal.anim.direction+120)[0]*5,this.tilePosition.y-transformDirection(0,this.goal.anim.direction+60)[1]*5-transformDirection(0,this.goal.anim.direction+120)[1]*5),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x-transformDirection(0,this.goal.anim.direction+60)[0]*6-transformDirection(0,this.goal.anim.direction+120)[0]*6,this.tilePosition.y-transformDirection(0,this.goal.anim.direction+60)[1]*6-transformDirection(0,this.goal.anim.direction+120)[1]*6)
                ]
            case 291: case 292:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0],this.tilePosition.y+transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x-transformBase[0],this.tilePosition.y-transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]+transformDirection(0,this.goal.anim.direction+120)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]+transformDirection(0,this.goal.anim.direction+120)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x-transformDirection(0,this.goal.anim.direction+60)[0]-transformDirection(0,this.goal.anim.direction+120)[0],this.tilePosition.y-transformDirection(0,this.goal.anim.direction+60)[1]-transformDirection(0,this.goal.anim.direction+120)[1])
                ]
            case 344:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x-transformBase[0],this.tilePosition.y-transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x-transformBase[0]*2,this.tilePosition.y-transformBase[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x-transformBase[0]*3,this.tilePosition.y-transformBase[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x-transformBase[0]*4,this.tilePosition.y-transformBase[1]*4)
                ]
            case 417:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-150)[0],this.tilePosition.y+transformDirection(0,-150)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-90)[0],this.tilePosition.y+transformDirection(0,-90)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,-30)[0],this.tilePosition.y+transformDirection(0,-30)[1])
                ]
            case 418:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,30)[0],this.tilePosition.y+transformDirection(0,30)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,90)[0],this.tilePosition.y+transformDirection(0,90)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,150)[0],this.tilePosition.y+transformDirection(0,150)[1])
                ]
            case 449:
                return [
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0],this.tilePosition.y+transformBase[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*2,this.tilePosition.y+transformBase[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformBase[0]*3,this.tilePosition.y+transformBase[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction-60)[0]*3,this.tilePosition.y+transformDirection(0,this.goal.anim.direction-60)[1]*3),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]*2,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]*2),
                    this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction+60)[0]*3,this.tilePosition.y+transformDirection(0,this.goal.anim.direction+60)[1]*3)
                ]
            default: return []
        }
    }
    convertIntent(){
        if(types.attack[this.attack[this.intent].type].class==1&&this.status.main[5]>0){
            this.takeDamage(this.status.main[5])
        }
    }
    setIntent(type){
        switch(type){
            case 0:
                if(this.team==0&&this.turnsAlive>0&&
                    (game.ascend>=27&&(this.battle.encounter.class==0||this.battle.encounter.class==3||this.battle.encounter.class==4)||game.ascend>=28&&this.battle.encounter.class==1||game.ascend>=29&&this.battle.encounter.class==2)&&
                    (this.turnsAlive%2==0&&(this.battle.encounter.class==0||this.battle.encounter.class==3||this.battle.encounter.class==4)||this.turnsAlive%3==0&&this.battle.encounter.class==1||this.turnsAlive%4==0&&this.battle.encounter.class==2)
                ){
                    this.subAttackBaseBuff([1,2,5],0.1)
                    this.normalizeAttack()
                }
                this.turnsAlive++
                if(this.battle.modded(193)&&this.turnsAlive>5){
                    this.statusEffect('Strength',1)
                }
                if(this.battle.modded(200)&&this.turnsAlive%4==0){
                    this.addBlock(15)
                }
                if(this.battle.modded(223)&&floor(random(0,10))==0){
                    this.statusEffect('Invulnerable',1)
                }
                if(!this.usedIntent.includes(this.intent)&&this.turnsAlive>=1){
                    this.usedIntent.push(this.intent)
                }
                if(this.status.main[378]>0){
                    this.status.main[378]--
                }else if(this.battle.modded(41)){
                    this.intent=(this.turnsAlive-1)%this.attack.length
                    this.convertIntent()
                }else{
                    switch(this.behavior){
                        case 0:
                            this.intent=(this.turnsAlive-1)%this.attack.length
                        break
                        case 1:
                            this.intent=floor(random(0,this.attack.length))
                        break
                        case 2:
                            this.intent=floor(random(0,this.attack.length-0.5))
                        break
                        case 3:
                            this.intent=this.turnsAlive<=3?this.attack.length-1:floor(random(0,this.attack.length-1))
                        break
                        case 4:
                            this.intent=this.turnsAlive<=3?this.attack.length-1:(this.turnsAlive-4)%this.attack.length
                        break
                        case 5:
                            this.intent=(this.turnsAlive+this.id)%this.attack.length
                        break
                        case 6:
                            let value=(this.turnsAlive-1)%(this.attack.length*2-2)
                            this.intent=value==0?0:value==this.attack.length*2-3?this.attack.length-1:(value-1)%(this.attack.length-2)+1
                        break
                        case 7:
                            this.intent=floor(random(0,this.attack.length))
                            if(this.intent==0&&this.status.main[42]<=0){
                                this.intent=floor(random(0,this.attack.length))
                            }
                        break
                        case 8:
                            this.intent=this.turnsAlive<=1?this.attack.length-1:(this.turnsAlive-2)%(this.attack.length-1)
                        break
                        case 9:
                            this.intent=this.turnsAlive<=1?this.attack.length-1:(this.turnsAlive-2)%this.attack.length
                        break
                        case 10:
                            this.intent=this.turnsAlive<=1?this.attack.length-1:floor(random(0,this.attack.length-1))
                        break
                        case 11:
                            this.intent=this.turnsAlive%3==1?this.attack.length-1:(floor(this.turnsAlive*2/3)+this.attack.length-2)%(this.attack.length-1)
                        break
                        case 12:
                            this.intent=this.turnsAlive<=3?this.attack.length-1:floor(random(0,this.attack.length))
                        break
                        case 13:
                            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                                if(this.battle.combatantManager.combatants[a].name==this.name&&this.battle.combatantManager.combatants[a].life<=0&&!this.battle.combatantManager.combatants[a].respawn){
                                    this.progress++
                                }
                            }
                            if(this.progress>=(game.ascend>=31?2:4)&&floor(random(0,2))==0){
                                this.intent=this.attack.length-1
                                this.progress=0
                            }else{
                                this.intent=floor(random(0,this.attack.length-1))
                            }
                        break
                        case 14:
                            this.intent=this.turnsAlive<=2?this.attack.length-1:(this.turnsAlive-3)%(this.attack.length-1)
                        break
                        case 15:
                            this.intent=(this.turnsAlive-1)%this.attack.length
                            this.move.type=this.turnsAlive%6>=3?9:0
                        break
                        case 16:
                            this.intent=this.turnsAlive>=4?1:0
                        break
                        case 17:
                            this.intent=(this.turnsAlive-1+this.accelerate)%this.attack.length
                        break
                        case 18:
                            this.intent=(this.turnsAlive-1)%this.attack.length
                            switch(this.intent){
                                case 0:
                                    this.addBlock(15)
                                    if(this.spec.includes(1)){
                                        this.spec.splice(this.spec.indexOf(1),1)
                                    }
                                break
                                case 1:
                                    this.statusEffect('Dodge',1)
                                    if(this.spec.includes(1)){
                                        this.spec.splice(this.spec.indexOf(1),1)
                                    }
                                break
                                case 2:
                                    this.statusEffect('Counter Once',10)
                                    if(this.spec.includes(1)){
                                        this.spec.splice(this.spec.indexOf(1),1)
                                    }
                                break
                                case 3:
                                    this.spec.push(1)
                                break
                            }
                        break
                    }
                    this.convertIntent()
                }
            break
        }
    }
    setIntentClass(intentClass){
        if(this.intent==-1){
            this.intent=0
        }
        if(this.attack.length>0){
            for(let a=0,la=this.attack.length;a<la;a++){
                if(types.attack[this.attack[(this.intent+a)%this.attack.length].type].class==intentClass){
                    if(!this.usedIntent.includes(this.intent)){
                        this.usedIntent.push(this.intent)
                    }
                    this.intent=(this.intent+a)%this.attack.length
                    this.convertIntent()
                    a=la
                }
            }
            this.battle.updateTargetting()
        }
    }
    randomIntent(){
        if(!this.usedIntent.includes(this.intent)){
            this.usedIntent.push(this.intent)
        }
        this.intent=floor(random(0,this.attack.length))
        this.convertIntent()
        this.battle.updateTargetting()
    }
    convertTile(target){
        let targetTile=[]
        for(let a=0,la=target.length;a<la;a++){
            targetTile.push(target[a]==-1?{tilePosition:{x:-1,y:-1}}:this.battle.tileManager.tiles[target[a]])
        }
        return targetTile
    }
    manaEquate(type,equal){
        return type==equal||type==6||
            equal==1&&this.status.main[539]>0||
            equal==2&&this.status.main[540]>0||
            equal==3&&this.status.main[541]>0||
            equal==4&&this.status.main[542]>0||
            equal==5&&this.status.main[543]>0
    }
    pareidolia(){
        if(!this.spec.includes(2)){
            this.battle.combatantManager.holdSummonCombatant(this.tilePosition,this.type,this.direction,1)
        }
    }
    baseDuplicate(){
        if(!this.spec.includes(2)){
            this.battle.combatantManager.holdSummonCombatant(this.tilePosition,this.type,this.direction)
        }
    }
    anotherDead(){
        if(this.status.main[103]>0){
            this.heal(this.status.main[103])
        }
        if(this.status.main[376]>0&&this.id>=0&&this.id<this.battle.players){
            for(let a=0,la=this.status.main[376];a<la;a++){
                this.battle.cardManagers[this.id].hand.add(findName('Shiv',types.card),0,0)
            }
        }
        if(this.id<this.battle.players){
            if(variants.hungry){
                this.heal(5)
            }
            if(this.battle.modded(240)){
                this.takeDamage(2,-1)
            }
        }
    }
    amplified(){
        if(this.id<this.battle.players){
            if(this.status.main[144]>0){
                this.battle.overlayManager.overlays[7][this.id].active=true
                this.battle.overlayManager.overlays[7][this.id].activate()
            }
            if(this.status.main[522]>0){
                this.battle.cardManagers[this.id].draw(this.status.main[522])
            }
            if(this.status.main[662]>0){
                this.charge+=this.status.main[662]
            }
            if(this.status.main[696]>0){
                this.battle.combatantManager.allEffect(48,['Poison',this.status.main[696]])
            }
        }
    }
    playCard(){
        if(this.spec.includes(8)){
            this.battle.turnManager.loadEnemyAttackRepeat(this.id)
        }
        if(this.spec.includes(20)&&!this.spec.includes(-1)){
            this.battle.turnManager.loadEnemyAttackRepeat(this.id)
            this.spec.push(-1)
        }
    }
    playCardFront(cardClass,card){
        if(this.status.main[77]>0){
            this.takeDamage(this.status.main[77],-1)
        }
        if(this.status.main[96]>0){
            this.takeDamage(this.status.main[96],-1)
        }
        if(this.status.main[293]>0&&cardClass==4){
            this.takeDamage(this.status.main[293],-1)
        }
        if(this.status.main[562]>0&&cardClass==4){
            this.statusEffect('Strength',this.status.main[562])
        }
        if(this.name=='Eternal Judge'&&this.battle.turn.main<this.battle.players){
            if(this.sins.includes(4)){
                this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.battle.turn.main)].takeDamage(1)
            }
            if(this.sins.includes(8)&&this.battle.cardManagers[this.battle.turn.main].hand.turnPlayed[0]>=5){
                this.battle.cardManagers[this.battle.turn.main].allEffect(2,2)
            }
        }
    }
    autoAim(){
        let list=[]
        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
            if(legalTargetCombatant(0,1,6,this,this.battle.combatantManager.combatants[a],this.battle.tileManager.tiles)&&this.battle.combatantManager.combatants[a].team!=this.team&&!(this.construct&&this.battle.combatantManager.combatants[a].team>0)&&this.battle.combatantManager.combatants[a].life>0){
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
            let target=this.getTarget()
            let targetted=false
            this.targetTile=this.convertTile(target)
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if((this.battle.combatantManager.combatants[a].team!=this.team&&type==0||this.battle.combatantManager.combatants[a].id==id&&(type==1||type==2))&&!(this.construct&&this.battle.combatantManager.combatants[a].team>0)){
                    switch(this.attack[this.intent].type){
                        case 1: case 2: case 3: case 11: case 13: case 22: case 23: case 31: case 34: case 35:
                        case 36: case 37: case 97: case 101: case 103: case 113: case 116: case 121: case 122: case 209:
                        case 212: case 229: case 242: case 246: case 247: case 251: case 252: case 270: case 271: case 274:
                        case 282: case 295: case 304: case 305: case 309: case 332: case 341: case 355: case 369: case 370:
                        case 371: case 372: case 373: case 377: case 378: case 399: case 412: case 424: case 426: case 434:
                        case 437:
                            if(this.battle.modded(57)){
                                for(let b=0,lb=this.targetTile.length;b<lb;b++){
                                    if(
                                        this.battle.combatantManager.combatants[a].tilePosition.x==this.targetTile[b].tilePosition.x&&
                                        this.battle.combatantManager.combatants[a].tilePosition.y==this.targetTile[b].tilePosition.y&&
                                        !(b>=1&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))){
                                            this.activated=true
                                            targetted=true
                                    }
                                }
                            }else if(
                                this.battle.combatantManager.combatants[a].tilePosition.x==this.targetTile[0].tilePosition.x&&
                                this.battle.combatantManager.combatants[a].tilePosition.y==this.targetTile[0].tilePosition.y){
                                this.activated=true
                                targetted=true
                            }
                        break
                        case 6: case 7: case 8: case 14: case 15: case 19: case 20: case 24: case 27: case 30:
                        case 32: case 33: case 61: case 62: case 66: case 67: case 76: case 77: case 96: case 107:
                        case 112: case 137: case 138: case 139: case 149: case 156: case 183: case 203: case 211: case 223:
                        case 224: case 248: case 250: case 253: case 258: case 260: case 272: case 273: case 275: case 276:
                        case 277: case 297: case 298: case 299: case 310: case 317: case 325: case 329: case 342: case 343:
                        case 354: case 374: case 375: case 382: case 383: case 386: case 394: case 433: case 435:
                            for(let b=0,lb=this.targetTile.length;b<lb;b++){
                                if(
                                    this.battle.combatantManager.combatants[a].tilePosition.x==this.targetTile[b].tilePosition.x&&
                                    this.battle.combatantManager.combatants[a].tilePosition.y==this.targetTile[b].tilePosition.y&&
                                    !(b>=1&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))){
                                        this.activated=true
                                        targetted=true
                                }
                            }
                        break
                        case 71: case 73: case 79: case 99: case 143: case 172: case 312: case 319: case 322: case 339:
                        case 348: case 367: case 385: case 389: case 390: case 397: case 447:
                            for(let b=0,lb=this.targetTile.length;b<lb;b++){
                                if(
                                    this.battle.combatantManager.combatants[a].tilePosition.x==this.targetTile[b].tilePosition.x&&
                                    this.battle.combatantManager.combatants[a].tilePosition.y==this.targetTile[b].tilePosition.y&&
                                    !(b>=1&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))&&
                                    !(b>=2&&(this.targetTile[1].tilePosition.x<0||this.targetTile[1].occupied>0))){
                                        this.activated=true
                                        targetted=true
                                }
                            }
                        break
                        case 100: case 380:
                            for(let b=0,lb=this.targetTile.length;b<lb;b++){
                                if(
                                    this.battle.combatantManager.combatants[a].tilePosition.x==this.targetTile[b].tilePosition.x&&
                                    this.battle.combatantManager.combatants[a].tilePosition.y==this.targetTile[b].tilePosition.y&&
                                    !(b>=1&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))&&
                                    !(b>=2&&(this.targetTile[1].tilePosition.x<0||this.targetTile[1].occupied>0))&&
                                    !(b>=3&&(this.targetTile[2].tilePosition.x<0||this.targetTile[2].occupied>0))){
                                        this.activated=true
                                        targetted=true
                                }
                            }
                        break
                        case 9: case 16: case 17: case 28: case 44: case 53: case 54: case 55: case 60: case 64:
                        case 69: case 82: case 84: case 85: case 86: case 87: case 95: case 104: case 105: case 114:
                        case 117: case 120: case 124: case 128: case 131: case 132: case 133: case 136: case 142: case 146:
                        case 147: case 153: case 154: case 157: case 166: case 168: case 171: case 174: case 175: case 176:
                        case 192: case 195: case 198: case 204: case 213: case 215: case 217: case 222: case 255: case 256:
                        case 259: case 264: case 265: case 278: case 288: case 291: case 292: case 308: case 330: case 350:
                        case 351: case 357: case 360: case 368: case 379: case 381: case 384: case 387: case 388: case 395:
                        case 396: case 403: case 404: case 409: case 415: case 417: case 418: case 441: case 449: case 451:
                        case 452:
                            for(let b=0,lb=this.targetTile.length;b<lb;b++){
                                if(
                                    this.battle.combatantManager.combatants[a].tilePosition.x==this.targetTile[b].tilePosition.x&&
                                    this.battle.combatantManager.combatants[a].tilePosition.y==this.targetTile[b].tilePosition.y){
                                        this.activated=true
                                        targetted=true
                                }
                            }
                        break
                        case 12: case 38: case 45: case 47: case 50: case 59: case 80: case 81: case 83: case 89:
                        case 90: case 91: case 98: case 106: case 115: case 118: case 119: case 123: case 125: case 129:
                        case 130: case 134: case 140: case 141: case 144: case 145: case 148: case 151: case 152: case 158:
                        case 160: case 161: case 162: case 165: case 173: case 178: case 179: case 180: case 184: case 185:
                        case 188: case 191: case 193: case 194: case 196: case 199: case 200: case 201: case 202: case 206:
                        case 208: case 235: case 236: case 245: case 262: case 263: case 266: case 268: case 279: case 283:
                        case 284: case 285: case 287: case 290: case 303: case 306: case 313: case 316: case 320: case 321:
                        case 327: case 328: case 335: case 336: case 337: case 338: case 340: case 353: case 358: case 361:
                        case 362: case 364: case 398: case 400: case 402: case 407: case 419: case 420: case 425: case 427:
                        case 428: case 436: case 439: case 443: case 445: case 448:
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
                                        targetted=true
                                }
                            }
                        break
                        case 49: case 164: case 205: case 219: case 286: case 406: case 444:
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
                                        targetted=true
                                }
                            }
                        break
                        case 127: case 150: case 440:
                            if(
                                this.battle.combatantManager.combatants[a].tilePosition.x==this.targetTile[0].tilePosition.x&&
                                this.battle.combatantManager.combatants[a].tilePosition.y==this.targetTile[0].tilePosition.y){
                                this.activated=true
                                targetted=true
                            }
                        break
                        case 214:
                            for(let b=0,lb=this.targetTile.length;b<lb;b++){
                                if(
                                    this.battle.combatantManager.combatants[a].tilePosition.x==this.targetTile[b].tilePosition.x&&
                                    this.battle.combatantManager.combatants[a].tilePosition.y==this.targetTile[b].tilePosition.y&&
                                    !(b==3&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))){
                                        this.activated=true
                                        targetted=true
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
                                        targetted=true
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
                                        targetted=true
                                }
                            }
                        break
                        case 429: case 430:
                            if(
                                this.battle.combatantManager.combatants[a].tilePosition.x==this.targetTile[1].tilePosition.x&&
                                this.battle.combatantManager.combatants[a].tilePosition.y==this.targetTile[1].tilePosition.y&&
                                !(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0)){
                                    this.activated=true
                                    targetted=true
                            }
                        break
                    }
                }
            }
            if(this.spec.includes(7)&&type==1&&(this.battle.turn.main<this.battle.players||this.construct)&&targetted&&!this.aggressor&&this.getStatus('Stun')<=0){
                this.battle.turnManager.loadEnemyAttackRepeatBack(this.id)
                this.aggressor=true
            }else{
                if(this.spec.includes(0)&&id<this.battle.players&&type==1&&this.battle.turn.main<this.battle.players&&this.battle.turnManager.loads<100&&this.getStatus('Stun')<=0&&this.battle.turnManager.loads<100&&this.getStatus('Cannot Move')<=0){
                    this.battle.turnManager.loadEnemyRotate(this.id,id)
                }
                if(this.spec.includes(1)&&id<this.battle.players&&type==1&&this.battle.turn.main<this.battle.players&&this.battle.turnManager.loads<100&&this.getStatus('Stun')<=0&&this.battle.turnManager.loads<100&&this.getStatus('Cannot Move')<=0){
                    this.battle.turnManager.loadEnemyMoveBack(this.id)
                    this.battle.turnManager.loadEnemyRotateBack(this.id,id)
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
        if(this.intent<=0){
            this.intent=0
        }
        if(this.life>0&&!this.moved&&this.status.main[32]<=0&&this.status.main[51]<=0&&this.status.main[374]<=0){
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
                    case 150: case 181: case 209: case 212: case 229: case 242: case 246: case 247: case 251: case 252:
                    case 270: case 271: case 274: case 282: case 295: case 304: case 305: case 309: case 331: case 332:
                    case 341: case 355: case 363: case 369: case 370: case 371: case 372: case 373: case 377: case 378:
                    case 399: case 412: case 424: case 426: case 434: case 437: case 440:
                        if(this.battle.modded(57)){
                            for(let b=0,lb=this.targetTile.length;b<lb;b++){
                                if(
                                    this.targetTile[b].tilePosition.x>=0&&
                                    !(b>=1&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))){
                                        this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)),this)
                                }
                            }
                        }else if(this.targetTile[0].tilePosition.x>=0){
                            this.targetTile[0].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[0],this)),this)
                        }
                    break
                    case 6: case 7: case 14: case 15: case 19: case 20: case 24: case 27: case 30: case 32:
                    case 33: case 61: case 62: case 66: case 67: case 76: case 77: case 96: case 107: case 112:
                    case 137: case 138: case 139: case 149: case 156: case 183: case 203: case 211: case 223: case 224:
                    case 248: case 250: case 253: case 258: case 260: case 272: case 273: case 275: case 276: case 277:
                    case 297: case 298: case 299: case 310: case 317: case 325: case 329: case 335: case 342: case 343:
                    case 354: case 374: case 375: case 382: case 383: case 386: case 394: case 433: case 435:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b>=1&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))){
                                    this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)),this)
                            }
                        }
                    break
                    case 8:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b==1&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))){
                                    this.targetTile[b].target(this.activated?4:3,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)),this)
                            }
                        }
                    break
                    case 88: case 296: case 323: case 324: case 446:
                        this.targetTile[0].indescriptTarget(this.activated?2:1)
                    break
                    case 71: case 73: case 79: case 99: case 143: case 172: case 312: case 339: case 348: case 367:
                    case 385: case 389: case 390: case 397: case 447:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b>=1&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))&&
                                !(b>=2&&(this.targetTile[1].tilePosition.x<0||this.targetTile[1].occupied>0))){
                                    this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)),this)
                            }
                        }
                    break
                    case 100: case 380:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b>=1&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))&&
                                !(b>=2&&(this.targetTile[1].tilePosition.x<0||this.targetTile[1].occupied>0))&&
                                !(b>=3&&(this.targetTile[2].tilePosition.x<0||this.targetTile[2].occupied>0))){
                                    this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)),this)
                            }
                        }
                    break
                    case 9: case 16: case 17: case 28: case 44: case 53: case 54: case 55: case 60: case 64:
                    case 69: case 82: case 84: case 85: case 86: case 87: case 95: case 104: case 114: case 120:
                    case 124: case 128: case 131: case 133: case 136: case 142: case 146: case 147: case 153: case 157:
                    case 166: case 168: case 171: case 176: case 192: case 198: case 204: case 213: case 215: case 217:
                    case 222: case 255: case 256: case 259: case 264: case 265: case 278: case 288: case 291: case 292:
                    case 308: case 330: case 350: case 351: case 357: case 360: case 368: case 379: case 381: case 384:
                    case 387: case 388: case 395: case 396: case 404: case 409: case 415: case 417: case 418: case 441:
                    case 449: case 451: case 452:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(this.targetTile[b].tilePosition.x>=0){
                                this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)),this)
                            }
                        }
                    break
                    case 105: case 132:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(this.targetTile[b].tilePosition.x>=0){
                                this.targetTile[b].target(this.activated?4:3,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)),this)
                            }
                        }
                    break
                    case 12: case 38: case 45: case 47: case 50: case 59: case 80: case 81: case 83: case 89:
                    case 90: case 91: case 98: case 106: case 115: case 118: case 119: case 123: case 125: case 129:
                    case 130: case 134: case 140: case 141: case 144: case 145: case 148: case 151: case 152: case 158:
                    case 160: case 161: case 162: case 165: case 173: case 178: case 179: case 180: case 184: case 188:
                    case 191: case 193: case 194: case 196: case 199: case 200: case 201: case 202: case 206: case 208:
                    case 235: case 236: case 245: case 262: case 263: case 266: case 268: case 279: case 283: case 284:
                    case 285: case 287: case 290: case 303: case 306: case 313: case 316: case 320: case 321: case 322:
                    case 327: case 328: case 336: case 337: case 338: case 340: case 346: case 353: case 358: case 361:
                    case 362: case 364: case 398: case 400: case 402: case 407: case 419: case 420: case 425: case 427:
                    case 428: case 436: case 439: case 443: case 445: case 448:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b>=1&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))&&
                                !(b>=2&&(this.targetTile[1].tilePosition.x<0||this.targetTile[1].occupied>0))&&
                                !(b>=3&&(this.targetTile[2].tilePosition.x<0||this.targetTile[2].occupied>0))&&
                                !(b>=4&&(this.targetTile[3].tilePosition.x<0||this.targetTile[3].occupied>0))&&
                                !(b>=5&&(this.targetTile[4].tilePosition.x<0||this.targetTile[4].occupied>0))){
                                    this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)),this)
                            }
                        }
                    break
                    case 49: case 164: case 185: case 205: case 219: case 286: case 406: case 444:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b%6>=1&&(this.targetTile[floor(b/6)*6].tilePosition.x<0||this.targetTile[floor(b/6)*6].occupied>0))&&
                                !(b%6>=2&&(this.targetTile[floor(b/6)*6+1].tilePosition.x<0||this.targetTile[floor(b/6)*6+1].occupied>0))&&
                                !(b%6>=3&&(this.targetTile[floor(b/6)*6+2].tilePosition.x<0||this.targetTile[floor(b/6)*6+2].occupied>0))&&
                                !(b%6>=4&&(this.targetTile[floor(b/6)*6+3].tilePosition.x<0||this.targetTile[floor(b/6)*6+3].occupied>0))&&
                                !(b%6>=5&&(this.targetTile[floor(b/6)*6+4].tilePosition.x<0||this.targetTile[floor(b/6)*6+4].occupied>0))){
                                    this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)),this)
                            }
                        }
                    break
                    case 117: case 135: case 154:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b>=1&&(this.targetTile[0].tilePosition.x<0))&&
                                !(b>=2&&(this.targetTile[1].tilePosition.x<0))&&
                                !(b>=3&&(this.targetTile[2].tilePosition.x<0))&&
                                !(b>=4&&(this.targetTile[3].tilePosition.x<0))&&
                                !(b>=5&&(this.targetTile[4].tilePosition.x<0))){
                                    this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)),this)
                            }
                        }
                    break
                    case 175: case 319:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b>=1&&(this.targetTile[0].tilePosition.x<0))&&
                                !(b>=2&&(this.targetTile[1].tilePosition.x<0))){
                                    this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)),this)
                            }
                        }
                    break
                    case 195:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b%6>=1&&(this.targetTile[floor(b/6)*6].tilePosition.x<0))&&
                                !(b%6>=2&&(this.targetTile[floor(b/6)*6+1].tilePosition.x<0))&&
                                !(b%6>=3&&(this.targetTile[floor(b/6)*6+2].tilePosition.x<0))&&
                                !(b%6>=4&&(this.targetTile[floor(b/6)*6+3].tilePosition.x<0))&&
                                !(b%6>=5&&(this.targetTile[floor(b/6)*6+4].tilePosition.x<0))){
                                    this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)),this)
                            }
                        }
                    break
                    case 214:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b==3&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))){
                                    this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)),this)
                            }
                        }
                    break
                    case 218:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b>=18&&(this.targetTile[b-18].tilePosition.x<0||this.targetTile[b-18].occupied>0))&&
                                !(b>=36&&(this.targetTile[b-36].tilePosition.x<0||this.targetTile[b-36].occupied>0))){
                                    this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)),this)
                            }
                        }
                    break
                    case 221:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b>=3&&(this.targetTile[0].tilePosition.x<0||this.targetTile[0].occupied>0))&&
                                !(b>=6&&(this.targetTile[3].tilePosition.x<0||this.targetTile[3].occupied>0))){
                                    this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)),this)
                            }
                        }
                    break
                    case 344: case 347:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b>=1&&(this.targetTile[0].tilePosition.x<0))&&
                                !(b>=2&&(this.targetTile[1].tilePosition.x<0))&&
                                !(b>=3&&(this.targetTile[2].tilePosition.x<0))){
                                    this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)),this)
                            }
                        }
                    break
                    case 403:
                        for(let b=0,lb=this.targetTile.length;b<lb;b++){
                            if(
                                this.targetTile[b].tilePosition.x>=0&&
                                !(b>=1&&(this.targetTile[0].tilePosition.x<0))){
                                    this.targetTile[b].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[b],this)),this)
                            }
                        }
                    break
                    case 429: case 430:
                        if(this.targetTile[1].tilePosition.x>=0){
                            this.targetTile[1].target(this.activated?2:1,numeralizeDirection(0,directionCombatant(this.targetTile[1],this)),this)
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
        if(game.ascend){
            this.addBlock(12)
        }
        this.base.life/=2
        this.life=this.base.life
        for(let a=0,la=this.attack.length;a<la;a++){
            for(let b=0,lb=this.attack[a].effect.length;b<lb;b++){
                this.attack[a].effect[b]=round(this.attack[a].effect[b]*2)
            }
        }
    }
    safeDamage(value){
        this.life=max(min(1,this.life),this.life-value)
    }
    orbTake(value,user,spec){
        this.takeDamage(value*(this.status.main[117]>0?1.5:1),user,spec)
    }
    energyChange(amount){
        if(amount>0&&this.status.main[439]>0){
            this.battle.combatantManager.areaAbstract(0,[this.status.main[439],this.id,0],this.tilePosition,[3,this.id],[0,1],false,0)
        }
        if(amount>0&&this.status.main[620]>0){
            this.statusEffect('Temporary Strength',this.status.main[620])
        }
        if(amount>0&&this.status.main[629]>0){
            this.battle.combatantManager.areaAbstract(2,['Freeze',this.status.main[629]],this.tilePosition,[3,this.id],[0,1],false,0)
        }
        if(amount>0&&this.status.main[698]>0){
            this.battle.addSpecificEnergy(this.status.main[698],this.id,0,true)
        }
        if(amount>0&&this.status.main[699]>0){
            this.battle.addSpecificEnergy(this.status.main[699],this.id,6,true)
        }
    }
    lowRoll(){
        if(this.status.main[162]>0){
            this.statusEffect('Strength',this.status.main[162])
        }
        if(this.status.main[223]>0&&this.id<this.battle.players){
            this.battle.cardManagers[this.id].draw(this.status.main[223])
        }
        if(this.status.main[253]>0){
            this.statusEffect('Dexterity',this.status.main[253])
        }
        if(this.status.main[254]>0){
            this.battle.addSpecificEnergy(this.status.main[254],this.id,0)
        }
        if(this.status.main[537]>0){
            this.battle.addSpecificEnergy(this.status.main[537],this.id,6)
        }
    }
    highRoll(){
        if(this.status.main[255]>0){
            this.statusEffect('Strength',this.status.main[255])
        }
        if(this.status.main[256]>0&&this.id<this.battle.players){
            this.battle.cardManagers[this.id].draw(this.status.main[256])
        }
        if(this.status.main[257]>0){
            this.statusEffect('Dexterity',this.status.main[257])
        }
        if(this.status.main[258]>0){
            this.battle.addSpecificEnergy(this.status.main[258],this.id,0)
        }
        if(this.status.main[538]>0){
            this.battle.addSpecificEnergy(this.status.main[538],this.id,6)
        }
    }
    takeDamage(value,user,spec=0){
        let damage=value
        if(value>0&&user>=0&&user<this.battle.combatantManager.combatants.length){
            let userCombatant=this.battle.combatantManager.combatants[user]
            if(userCombatant.status.main[398]>0){
                userCombatant.status.main[398]--
                this.battle.combatantManager.allEffect(44,[value,user,this.id])
            }
            if(spec!=3){
                let totalStr=0
                if(userCombatant.status.main[194]>0&&floor(random(0,2))==0){
                    damage=0
                    userCombatant.status.main[194]--
                }
                if(userCombatant.status.main[240]>0&&floor(random(0,2))==0){
                    userCombatant.status.main[240]--
                }
                if(userCombatant.tempStatus[1]!=0){
                    damage=max(0,damage+userCombatant.tempStatus[1])
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
                if(userCombatant.status.main[236]>0&&value<=10){
                    damage+=userCombatant.status.main[236]
                }
                if(userCombatant.status.main[353]>0){
                    damage+=userCombatant.status.main[353]
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
                if(userCombatant.status.main[250]>0){
                    userCombatant.statusEffect('Single Damage Up',damage)
                    damage=0
                    userCombatant.status.main[250]--
                }
                if(totalStr>0){
                    damage*=1+totalStr*0.1
                }else if(totalStr<0){
                    damage*=max(0.2,1+totalStr*0.1)
                }
                if(this.block>0&&this.battle.relicManager.hasRelic(69,userCombatant.id)){
                    damage+=4
                }
                if(distTargetCombatant(0,this,userCombatant)>=2&&this.battle.relicManager.hasRelic(175,userCombatant.id)){
                    damage+=3*this.battle.relicManager.active[175][userCombatant.id+1]
                }
                if(this.status.main[3]>0&&this.battle.relicManager.hasRelic(486,userCombatant.id)){
                    this.status.main[3]=0
                }
                if(this.status.main[21]>0&&this.battle.relicManager.hasRelic(486,userCombatant.id)){
                    this.status.main[21]=0
                }
                if(this.status.main[24]>0&&this.battle.relicManager.hasRelic(486,userCombatant.id)){
                    this.status.main[24]=0
                }
                if(this.status.main[53]>0&&this.battle.relicManager.hasRelic(486,userCombatant.id)){
                    this.status.main[53]=0
                }
                if(this.status.main[57]>0&&this.battle.relicManager.hasRelic(486,userCombatant.id)){
                    this.status.main[57]=0
                }
                if(this.status.main[97]>0&&this.battle.relicManager.hasRelic(486,userCombatant.id)){
                    this.status.main[97]=0
                }
                if(this.status.main[243]>0&&this.battle.relicManager.hasRelic(486,userCombatant.id)){
                    this.status.main[243]=0
                }
                if(this.status.main[319]>0&&this.battle.relicManager.hasRelic(486,userCombatant.id)){
                    this.status.main[319]=0
                }
            }
            /*if(userCombatant.status.main[49]>0){
                userCombatant.takeDamage(userCombatant.status.main[49])
            }*/
            if(userCombatant.status.main[95]>0&&!userCombatant.midHeal){
                userCombatant.heal(userCombatant.status.main[95])
            }
            if(userCombatant.interiorStatus[1]==0){
                userCombatant.interiorStatus[1]=1
            }
            /*if(userCombatant.status.main[119]>0){
                if(this.battle.turn.main<this.battle.players){
                    this.statusEffect('Temporary Damage Up',2*userCombatant.status.main[119]*(userCombatant.status.main[204]>0?2:1)+this.status.main[336])
                }else{
                    this.statusEffect('Temporary Damage Up Next Turn',2*userCombatant.status.main[119]*(userCombatant.status.main[204]>0?2:1)+this.status.main[336])
                }
            }*/
        }
        damage=round(damage*10)/10
        if(damage>0&&this.life>0){
            let hit=true
            let dodged=false
            if(user>=0&&user<this.battle.combatantManager.combatants.length){
                let userCombatant=this.battle.combatantManager.combatants[user]
                if(spec!=3){
                    if(userCombatant.tempStatus[0]!=1){
                        damage*=userCombatant.tempStatus[0]
                    }
                    if(userCombatant.status.main[8]>0&&userCombatant.status.main[779]<=0){
                        damage*=this.battle.modded(213)&&user<this.battle.players?0:this.status.main[426]>0?0.5:userCombatant.status.main[381]>0?1.25:0.75
                    }
                    if(userCombatant.status.main[82]>0){
                        damage*=2
                    }
                    if(userCombatant.status.main[198]>0){
                        damage/=2
                    }
                    if(userCombatant.status.main[238]>0&&value%2==1){
                        damage*=2
                        userCombatant.status.main[238]=0
                    }
                    if(userCombatant.status.main[239]>0&&value<=10){
                        damage*=2
                        userCombatant.status.main[239]=0
                    }
                    if(userCombatant.status.main[242]>0&&value>=20){
                        damage*=2
                    }
                    if(userCombatant.status.main[271]>0){
                        damage*=0.75
                        userCombatant.status.main[271]--
                    }
                    if(userCombatant.status.main[301]>0){
                        damage*=2
                    }
                    if(userCombatant.status.main[320]>0){
                        damage*=2
                    }
                    if(userCombatant.status.main[363]>0){
                        damage*=2
                    }
                    if(userCombatant.status.main[357]>0){
                        damage=0
                    }
                    if(this.status.main[3]>0){
                        this.status.main[3]--
                        hit=false
                        dodged=true
                        this.blocked=0
                        this.dodges.push({timer:0,direction:atan2(userCombatant.relativePosition.x-this.relativePosition.x,userCombatant.relativePosition.y-this.relativePosition.y)-90+180*floor(random(0,2))})
                        this.turnDodges++
                        if(this.status.main[458]>0){
                            this.statusEffect('Strength',this.status.main[458])
                        }
                        if(this.status.main[728]>0&&this.id<this.battle.players){
                            this.battle.cardManagers[this.id].draw(this.status.main[728])
                        }
                        if(this.status.main[459]>0){
                            if(this.battle.turn.main<=this.id){
                                this.battle.addSpecificEnergy(this.status.main[459],this.id,6)
                            }else{
                                this.statusEffect('Energy Next Turn',this.status.main[459])
                            }
                        }
                        if(this.status.main[584]>0){
                            if(this.battle.turn.main<=this.id){
                                this.battle.addSpecificEnergy(this.status.main[584],this.id,4)
                            }else{
                                this.statusEffect('(G) Next Turn',this.status.main[584])
                            }
                        }
                        if(this.status.main[601]>0){
                            this.battle.combatantManager.areaAbstract(0,[this.status.main[601],this.id,0],this.tilePosition,[3,this.id],[0,1],false,0)
                        }
                    }
                    if(this.status.main[173]>0){
                        this.status.main[173]--
                        hit=false
                        this.blocked=0
                        this.infoAnim.upFlash[3]=true
                        userCombatant.takeDamage(damage)
                        damage=0
                    }
                    if(userCombatant.status.main[211]>0){
                        userCombatant.status.main[211]--
                        hit=false
                        this.blocked=0
                        this.infoAnim.upFlash[3]=true
                        userCombatant.takeDamage(damage)
                        damage=0
                    }
                }
                if(userCombatant.tempStatus[3]>0){
                    this.statusEffect('Take Damage Next Turn',round(damage)*userCombatant.tempStatus[3])
                }
                if(userCombatant.status.main[171]>0){
                    this.statusEffect('Regeneration',userCombatant.status.main[171])
                }
                if(userCombatant.status.main[318]>0){
                    this.statusEffect('Shock',userCombatant.status.main[318])
                }
                if(userCombatant.status.main[448]>0){
                    this.statusEffect('Jinx',userCombatant.status.main[448])
                }
                if(userCombatant.status.main[449]>0){
                    this.statusEffect('Shock',userCombatant.status.main[449])
                }
                if(userCombatant.status.main[470]>0){
                    this.statusEffect('Mortal',userCombatant.status.main[470])
                    userCombatant.status.main[470]=0
                }
                if(userCombatant.status.main[471]>0&&this.block>0){
                    this.block=0
                    userCombatant.status.main[471]--
                }
                if(userCombatant.status.main[521]>0){
                    this.statusEffect('Weak',userCombatant.status.main[521])
                    userCombatant.status.main[521]=0
                }
                if(this.team==0&&userCombatant.team==0){
                    if(this.battle.modded(12)){
                        hit=false
                    }
                    if(this.battle.modded(185)){
                        this.statusEffect('Strength',2)
                        userCombatant.statusEffect('Strength',2)
                    }
                    if(this.battle.modded(207)){
                        this.addBlock(20)
                        userCombatant.addBlock(20)
                    }
                    if(this.battle.modded(208)){
                        this.heal(10)
                        userCombatant.heal(10)
                    }
                }
                if(userCombatant.team==0&&this.battle.modded(18)){
                    this.statusEffect('Poison',1)
                }
                if(userCombatant.team==0&&this.battle.modded(34)){
                    if(floor(random(0,5))==0){
                        damage+=userCombatant.combo*2
                        userCombatant.combo=0
                    }else{
                        userCombatant.combo++
                    }
                }
                if(userCombatant.stance==1){
                    damage*=userCombatant.status.main[478]>0?3:2
                }
                if(userCombatant.stance==4){
                    damage*=0.5
                }
                if(userCombatant.stance==5){
                    damage*=3
                }
                if(userCombatant.status.main[729]>0){
                    damage=userCombatant.status.main[729]
                }
                if(userCombatant.status.main[742]>0){
                    damage=userCombatant.status.main[742]
                }
            }
            if(this.status.main[210]>0&&this.battle.turn.main==this.id&&hit){
                hit=false
            }
            if(this.status.main[453]>0&&hit){
                hit=false
                this.statusEffect('Take Damage in 2 Turns',damage)
            }
            if(this.status.main[43]>0){
                this.statusEffect('Strength',this.status.main[43])
            }
            if(this.status.main[56]>0){
                if(this.battle.turn.main<this.battle.players){
                    this.statusEffect('Temporary Strength',this.status.main[56])
                }else{
                    this.statusEffectNext('Temporary Strength',this.status.main[56])
                }
            }
            if(this.status.main[64]>0){
                if(this.battle.turn.main<=this.id){
                    this.battle.addSpecificEnergy(this.status.main[64],this.id,6)
                }else{
                    this.statusEffect('Energy Next Turn',this.status.main[64])
                }
            }
            if(this.status.main[183]>0){
                this.statusEffect('Dexterity',this.status.main[183])
            }
            if(this.status.main[184]>0){
                if(this.battle.turn.main<this.battle.players){
                    this.statusEffect('Temporary Dexterity',this.status.main[184])
                }else{
                    this.statusEffectNext('Temporary Dexterity',this.status.main[184])
                }
            }
            if(this.status.main[177]>0){
                this.ammo+=this.status.main[177]
            }
            if(this.status.main[284]>0){
                this.statusEffect('Regeneration',this.status.main[284])
            }
            if(this.status.main[508]>0){
                if(this.battle.turn.main<=this.id){
                    this.battle.addSpecificEnergy(this.status.main[508],this.id,6)
                }else{
                    this.statusEffect('(E) Next Turn',this.status.main[508])
                }
            }
            if(this.status.main[677]>0&&hit){
                hit=false
            }
            if(spec!=3){
                if(this.status.main[63]>0){
                    damage+=this.status.main[63]
                }
                if(this.status.main[462]>0){
                    damage+=this.status.main[462]
                }
                if(this.status.main[165]>0){
                    damage+=this.status.main[165]
                    this.status.main[165]--
                }
                if(this.status.main[352]>0){
                    damage=max(min(1,damage),damage-this.status.main[352])
                }
                if(this.status.main[583]>0){
                    damage=max(min(1,damage),damage-this.status.main[583])
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
                    damage=max(min(damage,1),damage-this.battle.relicManager.active[55][this.id+1])
                }
                if(this.battle.relicManager.hasRelic(56,this.id)&&damage>1&&damage<=5){
                    damage=1
                }
                if(this.status.main[10]>0&&this.status.main[779]<=0){
                    damage*=this.team==0&&this.battle.relicManager.hasRelic(407,0)?2:1.5
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
                if(this.status.main[243]>0){
                    damage*=0.4
                }
                if(this.status.main[319]>0){
                    damage*=0.25
                }
                if(this.status.main[609]>0){
                    damage=this.status.main[609]>=5?min(damage,1):damage*min(1-this.status.main[609]*0.2,1)
                }
                if(this.status.main[604]>0&&damage>this.status.main[604]){
                    damage=this.status.main[604]
                }
                if(this.status.main[617]>0&&damage>this.status.main[617]){
                    damage=this.status.main[617]
                }
                let totalLck=0
                if(this.status.main[461]>0){
                    totalLck+=this.status.main[461]
                }
                if(totalLck>0){
                    damage*=1+totalLck*0.1
                }else if(totalLck<0){
                    damage*=max(0.2,1+totalLck*0.1)
                }
                if(this.status.main[324]>0&&damage>0&&damage<10){
                    damage=10
                }
                if(this.status.main[25]>0&&damage>1){
                    damage=1
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
                if(this.battle.modded(128)&&this.team==0&&this.spec.includes(2)&&this.battle.combatantManager.numberAbstract(2,[2])){
                    damage=0
                }
                if(this.stance==1){
                    damage*=this.status.main[478]>0?3:2
                }
                if(this.stance==4){
                    damage*=0.5
                }
                if(this.status.main[321]>0){
                    damage=ceil(damage/5)*5
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
            if(this.status.main[267]>0){
                this.status.main[267]=0
            }
            if(this.status.main[353]>0){
                this.status.main[353]=0
            }
            if(this.status.main[14]>0){
                this.status.main[14]--
            }
            if(this.status.main[217]>0){
                this.status.main[217]--
            }
            if(this.status.main[325]>0&&damage>=10){
                this.statusEffect('Temporary Damage Down',floor(damage/10))
            }
            if(this.status.main[326]>0&&damage>20){
                this.randomStatusInstant(1,[1])
            }
            if(this.status.main[87]>0&&this.id<this.battle.players){
                for(let a=0,la=this.status.main[87];a<la;a++){
                    this.battle.cardManagers[this.id].hand.add(findName('Shiv',types.card),0,0)
                }
            }
            if(this.status.main[115]>0){
                for(let a=0,la=this.status.main[115];a<la;a++){
                    this.holdOrb(0)
                }
            }
            if(this.status.main[327]>0){
                this.battle.combatantManager.randomEnemyEffect(0,[this.status.main[327]*damage])
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
                }else{
                    if(damage>0){
                        if(this.id<this.battle.players){
                            this.battle.stats.taken[this.id][0]+=damage
                        }
                        let damageLeft=damage
                        let preBlock=this.block
                        if(damageLeft>0&&this.block>0&&spec!=2){
                            if(this.block>=damageLeft){
                                if(this.id<this.battle.players){
                                    this.battle.stats.taken[this.id][1]+=damageLeft
                                }
                                if(this.status.main[276]>0){
                                    this.heal(damageLeft)
                                }
                                this.block-=damageLeft
                                damageLeft=0
                            }else{
                                if(this.id<this.battle.players){
                                    this.battle.stats.taken[this.id][1]+=this.block
                                }
                                if(this.status.main[276]>0){
                                    this.heal(this.block)
                                }
                                damageLeft-=this.block
                                this.block=0
                            }
                        }
                        if(damageLeft>0&&this.barrier>0){
                            if(this.barrier>=damageLeft){
                                if(this.id<this.battle.players){
                                    this.battle.stats.taken[this.id][1]+=damageLeft
                                }
                                this.barrier-=damageLeft
                                damageLeft=0
                                this.taken=0
                            }else{
                                if(this.id<this.battle.players){
                                    this.battle.stats.taken[this.id][1]+=this.barrier
                                }
                                damageLeft-=this.barrier
                                this.barrier=0
                            }
                        }
                        if(damageLeft>0&&this.bounce>0){
                            if(this.bounce>=damageLeft){
                                if(this.id<this.battle.players){
                                    this.battle.stats.taken[this.id][1]+=damageLeft
                                }
                                if(user>=0&&user<this.battle.combatantManager.combatants.length&&(spec==0||spec==2)){
                                    let userCombatant=this.battle.combatantManager.combatants[user]
                                    userCombatant.takeDamage(damageLeft,-1)
                                }
                                this.bounce-=damageLeft
                                damageLeft=0
                                this.taken=0
                            }else{
                                if(this.id<this.battle.players){
                                    this.battle.stats.taken[this.id][1]+=this.bounce
                                }
                                if(user>=0&&user<this.battle.combatantManager.combatants.length&&(spec==0||spec==2)){
                                    let userCombatant=this.battle.combatantManager.combatants[user]
                                    userCombatant.takeDamage(this.bounce,-1)
                                }
                                damageLeft-=this.bounce
                                this.bounce=0
                            }
                        }
                        this.blocked=damageLeft==0&&this.block>0?0:damageLeft<damage?1:2
                        if(damageLeft>0){
                            this.loseHealth(damageLeft)
                            if(!this.infoAnim.upFlash[2]){
                                this.infoAnim.upFlash[0]=true
                            }
                            this.taken=damageLeft
                            this.turnTaken+=damageLeft
                            this.battle.relicManager.activate(6,[this.id])
                            if(this.id<this.battle.players){
                                this.battle.stats.taken[this.id][2]+=damageLeft
                            }
                        }else if(!this.infoAnim.upFlash[2]){
                            this.infoAnim.upFlash[1]=true
                        }
                        if(preBlock>0&&this.block>0&&this.battle.relicManager.hasRelic(229,this.id)){
                            this.statusEffect('Metallicize',this.battle.relicManager.active[229][this.id+1])
                        }
                        if(preBlock>0&&this.block<=0&&this.status.main[277]>0){
                            this.battle.combatantManager.areaAbstract(0,[this.status.main[277],this.id,0],this.tilePosition,[3,this.id],[0,1],false,0)
                        }
                        if(preBlock>0&&this.block<=0&&this.status.main[708]>0){
                            this.status.main[708]--
                            this.statusEffect('Stun',1)
                            this.battle.updateTargetting()
                        }
                        if(preBlock>0&&this.block<=0&&0<=user&&user<this.battle.players){
                            if(this.battle.relicManager.hasRelic(124,user)){
                                this.statusEffect('Vulnerable',2)
                            }
                        }
                    }
                }
                if(this.id<this.battle.players){
                    this.battle.cardManagers[this.id].allGroupEffect(16)
                }
                this.compression+=damage
                this.lastTake=damage
                this.battle.particleManager.createNumber(0,this.position.x,this.position.y,damage)
                if(this.battle.turn.main<this.battle.players){
                    this.battle.stats.damage[this.battle.turn.main]+=damage
                    if(user>=0&&user<this.battle.combatantManager.combatants.length){
                        let userCombatant=this.battle.combatantManager.combatants[user]
                        userCombatant.combo=min(userCombatant.combo+1+userCombatant.status.main[68],userCombatant.comboCap)
                    }
                }
                if(this.battle.modded(9)&&this.team>0&&this.team<=this.battle.players&&damage>10){
                    this.battle.drop(this.id,findName('Concussion',types.card),0,constants.playerNumber+1)
                }
                if(this.status.main[285]>0&&this.block<=0){
                    this.status.main[285]=0
                }
                if(this.status.main[297]>0){
                    this.battle.addCurrency(round(damage),this.id)
                }
                if(user>=0&&user<this.battle.combatantManager.combatants.length){
                    let userCombatant=this.battle.combatantManager.combatants[user]
                    userCombatant.lastDeal=damage
                    userCombatant.highestDeal=max(userCombatant.highestDeal,damage)
                    if(userCombatant.tempStatus[4]!=0){
                        this.statusEffect('Bleed',userCombatant.tempStatus[4])
                    }
                    if(userCombatant.tempStatus[5]!=0){
                        this.statusEffect('Regeneration',userCombatant.tempStatus[5])
                    }
                    if(userCombatant.status.main[98]>0){
                        this.statusEffect('Bleed',userCombatant.status.main[98])
                    }
                    if(userCombatant.status.main[100]>0){
                        this.statusEffect('Bleed',userCombatant.status.main[100])
                    }
                    if(userCombatant.status.main[202]>0&&damage>=20){
                        this.statusEffect('Miss',userCombatant.status.main[202])
                    }
                    if(userCombatant.status.main[370]>0){
                        this.statusEffect('Damage Taken Up',userCombatant.status.main[370])
                    }
                    if(userCombatant.status.main[463]>0){
                        this.statusEffect('Lock On',userCombatant.status.main[463])
                    }
                    if(userCombatant.status.main[476]>0){
                        this.statusEffect('Poison',userCombatant.status.main[476])
                    }
                    if(userCombatant.status.main[554]>0){
                        this.statusEffect('Burn',userCombatant.status.main[554])
                    }
                    if(userCombatant.status.main[692]>0){
                        this.statusEffect('Freeze',userCombatant.status.main[692])
                    }
                    if(userCombatant.status.main[724]>0){
                        this.statusEffect('Bruise',userCombatant.status.main[724])
                    }
                    if(userCombatant.status.main[750]>0&&this.getStatus('Vulnerable')==0){
                        this.statusEffect('Vulnerable',userCombatant.status.main[750])
                    }
                    if(this.battle.relicManager.hasRelic(246,user)&&damage>=25){
                        this.battle.cardManagers[user].draw(this.battle.relicManager.active[246][user+1])
                    }
                    if(this.battle.relicManager.hasRelic(475,user)&&damage>=25){
                        this.statusEffect('Weak',this.battle.relicManager.active[475][user+1])
                    }
                    if(user>=0&&user<this.battle.players){
                        this.battle.cardManagers[user].trueAllGroupEffectArgs(65,[7239,damage])
                    }
                }
            }
            if(hit||dodged){
                if(user>=0&&user<this.battle.combatantManager.combatants.length&&(spec==0||spec==2)){
                    let userCombatant=this.battle.combatantManager.combatants[user]
                    let distance=distTargetCombatant(0,this,userCombatant)
                    if(this.status.main[134]>0){
                        userCombatant.addBlock(this.status.main[134])
                    }
                    if(this.status.main[300]>0){
                        userCombatant.statusEffect('Buffer',this.status.main[300])
                    }
                    if(this.status.main[312]>0){
                        userCombatant.vision+=this.status.main[312]
                    }
                    if(this.status.main[339]>0){
                        userCombatant.addBarrier(this.status.main[339])
                    }
                    if(userCombatant.status.main[139]>0){
                        userCombatant.addBlock(damage)
                        userCombatant.status.main[139]--
                    }
                    if(userCombatant.tempStatus[2]>0){
                        userCombatant.addBlock(damage*userCombatant.tempStatus[2])
                    }
                    if(userCombatant.status.main[170]>0&&userCombatant.id<this.battle.players){
                        this.battle.addCurrency(round(damage),userCombatant.id)
                    }
                    if(userCombatant.status.main[234]>0){
                        userCombatant.statusEffect('No Damage Next Turn',1)
                        userCombatant.status.main[234]--
                    }
                    if(this.battle.modded(76)&&userCombatant.team==0){
                        userCombatant.heal(damage)
                    }
                    if(this.life>0){
                        if(this.status.main[32]<=0){
                            if(this.battle.turnManager.turns.length==0){
                                if(this.status.main[1]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].auxiliary=true
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,1,[this.status.main[1]],this.id,false))
                                }
                                if(this.status.main[36]>0){
                                    if(this.status.main[472]>0&&distance>=0&&distance<=1){
                                        this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                        this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                        this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].auxiliary=true
                                        this.battle.turnManager.turnsBack.push(new turn(0,this.battle,369,[this.status.main[36],this.status.main[472]],this.id,false))
                                    }else{
                                        this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                        this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                        this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].auxiliary=true
                                        this.battle.turnManager.turnsBack.push(new turn(0,this.battle,1,[this.status.main[36]],this.id,false))
                                    }
                                }else if(this.status.main[472]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].auxiliary=true
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,58,[this.status.main[472]],this.id,false))
                                }
                                if(this.status.main[38]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].auxiliary=true
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,3,[0],this.id,false))
                                }
                                if(this.status.main[39]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.auxiliary=true
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,58,[this.status.main[39]],this.id,false))
                                }
                                if(this.status.main[47]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.auxiliary=true
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,1,[this.status.main[47]],this.id,false))
                                }
                                if(this.status.main[73]>0&&distance<=2){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.auxiliary=true
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,6,[this.status.main[73]],this.id,false))
                                }
                                if(this.status.main[92]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.auxiliary=true
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,122,[0],this.id,false))
                                }
                                if(this.status.main[93]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.auxiliary=true
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,121,[0],this.id,false))
                                }
                                if(this.status.main[94]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.auxiliary=true
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,226,[this.status.main[94]],this.id,false))
                                }
                                if(this.status.main[102]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.auxiliary=true
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,227,[this.status.main[102]],this.id,false))
                                }
                                if(this.status.main[106]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.auxiliary=true
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,2,[this.status.main[106]],this.id,false))
                                }
                                if(this.status.main[147]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.auxiliary=true
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,242,[this.status.main[147]],this.id,false))
                                }
                                if(this.status.main[206]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.auxiliary=true
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,246,[this.status.main[206]],this.id,false))
                                }
                                if(this.status.main[266]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].auxiliary=true
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,1,[this.status.main[266]],this.id,false))
                                    this.status.main[266]=0
                                }
                                if(this.status.main[272]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.auxiliary=true
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,31,[this.status.main[272]],this.id,false))
                                }
                                if(this.status.main[360]>0&&distance>=0&&distance<=1){
                                    if(this.status.main[549]>0&&distance>=0&&distance<=1){
                                        this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                        this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                        this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].auxiliary=true
                                        this.battle.turnManager.turnsBack.push(new turn(0,this.battle,369,[this.status.main[360],this.status.main[549]],this.id,false))
                                        this.status.main[549]=0
                                    }else{
                                        this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                        this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                        this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].auxiliary=true
                                        this.battle.turnManager.turnsBack.push(new turn(0,this.battle,1,[this.status.main[360]],this.id,false))
                                    }
                                    this.status.main[360]=0
                                }
                                if(this.status.main[386]>0&&distance<=6&&(this.team==0||this.ammo>0)){
                                    if(this.team>0){
                                        this.ammo--
                                    }
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].auxiliary=true
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,362,[this.status.main[386]],this.id,false))
                                }
                                if(this.status.main[387]>0){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].auxiliary=true
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,363,[this.status.main[387]],this.id,false))
                                }
                                if(this.status.main[483]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.auxiliary=true
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,372,[this.status.main[483]],this.id,false))
                                }
                                if(this.status.main[485]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.auxiliary=true
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,373,[this.status.main[485]],this.id,false))
                                }
                                if(this.status.main[549]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.auxiliary=true
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,58,[this.status.main[549]],this.id,false))
                                    this.status.main[549]=0
                                }
                                if(this.status.main[551]>0&&distance<=6&&(this.team==0||this.ammo>0)){
                                    if(this.team>0){
                                        this.ammo--
                                    }
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].auxiliary=true
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,362,[this.status.main[551]],this.id,false))
                                    this.status.main[551]=0
                                }
                                if(this.status.main[553]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].auxiliary=true
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,3,[this.status.main[553]],this.id,false))
                                }
                                if(this.status.main[560]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,87,[this.status.main[560]],this.id,false))
                                }
                                if(this.status.main[607]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,87,[this.status.main[607]],this.id,false))
                                }
                                if(this.status.main[611]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].auxiliary=true
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,3,[this.status.main[611]],this.id,false))
                                    this.status.main[611]=0
                                }
                                if(this.status.main[722]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,87,[this.status.main[607]],this.id,false))
                                    this.status.main[722]=0
                                }
                            }else{
                                if(this.status.main[1]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turns[1].target=[user]
                                    this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,1,[this.status.main[1]],this.id,false))
                                }
                                if(this.status.main[36]>0&&distance>=0&&distance<=1){
                                    if(this.status.main[472]>0&&distance>=0&&distance<=1){
                                        this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                        this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                        this.battle.turnManager.turnsBack.push(new turn(0,this.battle,369,[this.status.main[36],this.status.main[472]],this.id,false))
                                    }else{
                                        this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                        this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                        this.battle.turnManager.turnsBack.push(new turn(0,this.battle,1,[this.status.main[36]],this.id,false))
                                    }
                                }else if(this.status.main[472]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,58,[this.status.main[472]],this.id,false))
                                }
                                if(this.status.main[38]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turns[1].target=[user]
                                    this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,3,[0],this.id,false))
                                }
                                if(this.status.main[39]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turns[1].target=[user]
                                    this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,58,[this.status.main[39]],this.id,false))
                                }
                                if(this.status.main[47]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,1,[this.status.main[47]],this.id,false))
                                }
                                if(this.status.main[73]>0&&distance<=2){
                                    this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turns[1].target=[user]
                                    this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,6,[this.status.main[73]],this.id,false))
                                }
                                if(this.status.main[92]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turns[1].target=[user]
                                    this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,122,[0],this.id,false))
                                }
                                if(this.status.main[93]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turns[1].target=[user]
                                    this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,121,[0],this.id,false))
                                }
                                if(this.status.main[94]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turns[1].target=[user]
                                    this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,226,[this.status.main[94]],this.id,false))
                                }
                                if(this.status.main[102]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turns[1].target=[user]
                                    this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,227,[this.status.main[102]],this.id,false))
                                }
                                if(this.status.main[106]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turns[1].target=[user]
                                    this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,2,[this.status.main[106]],this.id,false))
                                }
                                if(this.status.main[147]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turns[1].target=[user]
                                    this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,242,[this.status.main[147]],this.id,false))
                                }
                                if(this.status.main[206]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turns[1].target=[user]
                                    this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,246,[this.status.main[206]],this.id,false))
                                }
                                if(this.status.main[266]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.turnsBack.splice(2,0,new turn(0,this.battle,1,[this.status.main[266]],this.id,false))
                                    this.status.main[266]=0
                                }
                                if(this.status.main[272]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                    this.battle.turnManager.turnsBack.push(new turn(0,this.battle,31,[this.status.main[272]],this.id,false))
                                }
                                if(this.status.main[360]>0&&distance>=0&&distance<=1){
                                    if(this.status.main[549]>0&&distance>=0&&distance<=1){
                                        this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                        this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                        this.battle.turnManager.turnsBack.push(new turn(0,this.battle,369,[this.status.main[360],this.status.main[549]],this.id,false))
                                        this.status.main[549]=0
                                    }else{
                                        this.battle.turnManager.turnsBack.push(new turn(3,this.battle,0,0,this.id,false))
                                        this.battle.turnManager.turnsBack[this.battle.turnManager.turnsBack.length-1].target=[user]
                                        this.battle.turnManager.turnsBack.push(new turn(0,this.battle,1,[this.status.main[360]],this.id,false))
                                    }
                                    this.status.main[360]=0
                                }
                                if(this.status.main[386]>0&&distance<=6&&(this.team==0||this.ammo>0)){
                                    if(this.team>0){
                                        this.ammo--
                                    }
                                    this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turns[1].target=[user]
                                    this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,362,[this.status.main[386]],this.id,false))
                                }
                                if(this.status.main[387]>0){
                                    this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turns[1].target=[user]
                                    this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,363,[this.status.main[387]],this.id,false))
                                }
                                if(this.status.main[483]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turns[1].target=[user]
                                    this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,372,[this.status.main[483]],this.id,false))
                                }
                                if(this.status.main[485]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turns[1].target=[user]
                                    this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,373,[this.status.main[485]],this.id,false))
                                }
                                if(this.status.main[549]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turns[1].target=[user]
                                    this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,58,[this.status.main[549]],this.id,false))
                                }
                                if(this.status.main[551]>0&&distance<=6&&(this.team==0||this.ammo>0)){
                                    if(this.team>0){
                                        this.ammo--
                                    }
                                    this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turns[1].target=[user]
                                    this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,362,[this.status.main[551]],this.id,false))
                                    this.status.main[551]=0
                                }
                                if(this.status.main[553]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turns[1].target=[user]
                                    this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,3,[this.status.main[553]],this.id,false))
                                }
                                if(this.status.main[560]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,87,[this.status.main[560]],this.id,false))
                                }
                                if(this.status.main[607]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,87,[this.status.main[607]],this.id,false))
                                }
                                if(this.status.main[611]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turns.splice(1,0,new turn(3,this.battle,0,0,this.id,false))
                                    this.battle.turnManager.turns[1].target=[user]
                                    this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,3,[this.status.main[611]],this.id,false))
                                    this.status.main[611]=0
                                }
                                if(this.status.main[722]>0&&distance>=0&&distance<=1){
                                    this.battle.turnManager.turns.splice(2,0,new turn(0,this.battle,87,[this.status.main[607]],this.id,false))
                                    this.status.main[722]=0
                                }
                            }
                        }
                        if(this.blocked>0&&this.battle.relicManager.hasRelic(74,this.id)){
                            userCombatant.statusEffect('Weak Next Turn',this.battle.relicManager.active[74][this.id+1])
                        }
                        if(this.blocked==0&&this.battle.relicManager.hasRelic(75,this.id)){
                            userCombatant.statusEffect('Weak Next Turn',this.battle.relicManager.active[75][this.id+1])
                        }
                        if(this.status.main[26]>0){
                            if(this.status.main[644]>0){
                                this.battle.combatantManager.allEffect(19,[this.status.main[26]])
                            }else{
                                userCombatant.takeDamage(this.status.main[26],-1)
                            }
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
                            userCombatant.statusEffect('Weak',this.status.main[205])
                        }
                        if(this.status.main[559]>0){
                            userCombatant.statusEffect('Weak',this.status.main[559])
                        }
                        if(this.status.main[50]>0){
                            this.addBlock(this.status.main[50])
                            this.status.main[50]=0
                        }
                        if(this.status.main[108]>0){
                            this.addBlock(this.status.main[108])
                        }
                        if(this.status.main[618]>0){
                            userCombatant.takeDamage(this.status.main[618],-1)
                            this.status.main[618]=0
                        }
                    }
                    if(this.status.main[44]>0&&this.life<=0){
                        userCombatant.statusEffect('Weak',this.status.main[44])
                    }
                    if(this.status.main[45]>0&&this.life<=0){
                        userCombatant.statusEffect('Vulnerable',this.status.main[45])
                    }
                    if(this.status.main[608]>0&&this.life<=0){
                        userCombatant.statusEffect('Frail',this.status.main[608])
                    }
                    if(this.status.main[660]>0&&this.life<=0){
                        userCombatant.statusEffect('Dodge',this.status.main[660])
                    }
                }
                if(this.status.main[213]>0&&this.life<=0){
                    this.status.main[213]--
                    this.life=1
                }
                if(this.status.main[358]>0){
                    this.heal(this.status.main[358])
                }
                if((this.spec.includes(13)||this.battle.relicManager.hasRelic(492,-1)&&(this.spec.includes(14)||this.spec.includes(15)||this.spec.includes(16)||this.spec.includes(21)||this.spec.includes(22)))&&this.life<=0&&user>=0&&user<this.battle.players){
                    let prefered=floor(random(0,this.battle.overlayManager.overlays[0].length))
                    for(let a=0,la=this.battle.players;a<la;a++){
                        let reward=this.spec.includes(16)?[{type:0,value:[5]}]:[]
                        if(this.battle.relicManager.hasRelic(492,user)){
                            if(this.spec.includes(13)){
                                reward.push({type:4,value:[10]})
                            }
                            if(this.spec.includes(14)){
                                reward.push({type:7,value:[1]})
                            }
                            if(this.spec.includes(15)&&a==prefered){
                                reward.push({type:6,value:[1]})
                            }
                            if(this.spec.includes(16)){
                                reward.push({type:0,value:[25]})
                            }
                            if(this.spec.includes(21)){
                                reward.push({type:4,value:[15]})
                                reward.push({type:0,value:[250]})
                            }
                            if(this.spec.includes(22)){
                                reward.push({type:0,value:[100]})
                            }
                        }
                        if(reward.length>0){
                            this.battle.overlayManager.overlays[25][a].active=true
                            this.battle.overlayManager.overlays[25][a].activate([0,reward])
                        }
                    }
                }
            }
            if(this.spec.includes(6)&&this.life<=this.threshold){
                this.threshold-=25
                this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Slime',types.combatant),this.goal.anim.direction)
            }
            if(this.spec.includes(10)&&this.battle.turn.main<this.battle.players&&!this.aggressor){
                this.battle.turnManager.loadEnemyAttackRepeatBack(this.id)
                this.aggressor=true
            }
        }
    }
    addBlock(value){
        if(value>0&&this.status.main[16]<=0&&!(this.battle.modded(67)&&floor(random(0,5))==0)){
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
                block*=1+totalDex*0.1
            }else if(totalDex<0){
                block*=max(0.2,1+totalDex*0.1)
            }
            if(this.status.main[9]>0&&this.status.main[779]<=0){
                block*=this.battle.modded(217)&&this.id<this.battle.players?0:0.75
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
            if(this.status.main[273]>0){
                block=0
                this.status.main[273]--
            }
            if(this.status.main[761]>0){
                block*=0.5
                this.status.main[761]--
            }
            if(this.status.main[652]>0&&this.stance==1){
                block*=2
            }
            block=round(block*10)/10
            if(this.status.main[70]>0){
                this.combo=min(this.combo+this.status.main[70],this.comboCap)
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
            if(this.status.main[434]>0){
                this.status.main[434]=0
                this.battle.combatantManager.randomEnemyEffect(3,[block,this.id])
            }
            if(this.status.main[625]>0){
                this.battle.combatantManager.areaAbstract(0,[this.status.main[625],this.id,0],this.tilePosition,[3,this.id],[0,1],false,0)
            }
            if(this.battle.modded(140)&&this.team==0){
                block*=2
            }
            if(block>=0){
                this.lastBlock=block
                if(block>=8&&this.status.main[275]>0){
                    for(let a=0,la=this.status.main[275];a<la;a++){
                        this.battle.cardManagers[this.id].hand.add(findName('Shiv',types.card),0,0)
                    }
                }
                if(block>=12&&this.status.main[444]>0){
                    this.battle.cardManagers[this.id].draw(this.status.main[444])
                }
                if(this.status.main[474]>0){
                    this.statusEffect('Block in 2 Turns',round(block))
                    this.status.main[474]--
                }
                if(this.battle.modded(74)&&this.team==0){
                    this.heal(block)
                }else if(this.status.main[329]>0){
                    if(this.status.main[330]>0){
                        this.battle.combatantManager.randomEnemyEffect(3,[this.status.main[330],this.id])
                    }
                    this.barrier+=block
                }else{
                    this.block+=block
                }
                if(this.id<this.battle.players){
                    this.battle.stats.block[this.id]+=block
                    this.battle.relicManager.activate(18,[block,this.id])
                }
            }
        }
    }
    addBarrier(value){
        if(value>0){
            let barrier=value
            let totalDex=0
            if(this.status.main[7]!=0){
                totalDex+=this.status.main[7]
            }
            if(this.status.main[18]!=0){
                totalDex+=this.status.main[18]
            }
            if(totalDex>0){
                barrier*=1+totalDex*0.1
            }else if(totalDex<0){
                barrier*=max(0.2,1+totalDex*0.1)
            }
            barrier=round(barrier*10)/10
            if(this.status.main[330]>0){
                this.battle.combatantManager.randomEnemyEffect(0,[this.status.main[330]])
            }
            if(barrier>=0){
                this.barrier+=barrier
                if(this.id<this.battle.players){
                    this.battle.stats.barrier[this.id]+=barrier
                }
            }
        }
    }
    addBounce(value){
        if(value>0){
            let bounce=value
            let totalDex=0
            if(this.status.main[7]!=0){
                totalDex+=this.status.main[7]
            }
            if(this.status.main[18]!=0){
                totalDex+=this.status.main[18]
            }
            if(totalDex>0){
                bounce*=1+totalDex*0.1
            }else if(totalDex<0){
                bounce*=max(0.2,1+totalDex*0.1)
            }
            bounce=round(bounce*10)/10
            if(bounce>=0){
                this.bounce+=bounce
                if(this.id<this.battle.players){
                    this.battle.stats.bounce[this.id]+=bounce
                }
            }
        }
    }
    endBlock(){
        if(this.status.main[119]>0){
            this.takeDamage(this.status.main[119]**2,-1)
            if(this.status.main[751]<=0){
                this.status.main[119]=floor(this.status.main[119]/2)
            }
        }
        if(this.status.main[281]>0){
            this.statusEffect('Single Damage Up',ceil(this.block))
        }
        if(this.status.main[11]>0){
            this.status.main[11]--
        }else if(!(this.team==0&&this.battle.modded(26))){
            this.block=this.battle.relicManager.hasRelic(444,this.id)?
            round(this.block*(1-0.5**this.battle.relicManager.active[444][this.id+1])):
            this.battle.relicManager.hasRelic(37,this.id)?
            max(this.block-20,0):
            0
        }
        this.bounce=0
    }
    addSin(sin){
        switch(sin){
            case 1:
                for(let a=0,la=this.attack.length;a<la;a++){
                    if(this.attack[a].type==357){
                        this.attack[a].type=360
                    }else if(this.attack[a].type==358){
                        this.attack[a].type=361
                    }
                }
            break
        }
    }
    moveOffset(direction,speed){
        this.offset.position.x+=sin(direction)*speed
        this.offset.position.y+=cos(direction)*speed
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
                this.addBlock(2*distance*this.battle.relicManager.active[100][this.id+1])
            }
            if(this.battle.relicManager.hasRelic(250,this.id)&&distance>=2){
                this.battle.cardManagers[this.id].draw(this.battle.relicManager.active[250][this.id+1])
            }
            this.battle.cardManagers[this.id].hand.allEffectArgs(20,[this.tilePosition,{x:x,y:y},distance])
            if(this.status.main[379]<=0){
                this.combo=max(this.combo-distance,0)
                if(distance>0){
                    this.comboConsumed()
                }
            }
            if(this.battle.modded(197)&&this.battle.turn.main!=this.id){
                this.takeDamage(6,-1)
            }
        }
        this.tilePosition.x=x
        this.tilePosition.y=y
        let index=this.battle.tileManager.getTileIndex(this.tilePosition.x,this.tilePosition.y)
        if(index>=0){
            let tile=this.battle.tileManager.tiles[index]
            this.position.x=tile.position.x
            this.position.y=tile.position.y
            this.relativePosition.x=tile.relativePosition.x
            this.relativePosition.y=tile.relativePosition.y
            if(this.spec.includes(5)){
                if(tile>=0){
                    tile.addType(6)
                }
            }
            this.battle.combatantManager.sort()
        }
        if(this.battle.modded(89)&&this.team>0){
            this.statusEffect('Poison',1)
        }
        if(this.status.main[749]>0){
            this.addBlock(this.status.main[749])
        }
        this.takeDamage(this.status.main[191]*(this.status.main[204]>0?2:1),-1)
        this.statusEffect('Jinx',this.status.main[221])
    }
    getOrbNumber(type){
        let count=0
        let checked=[]
        for(let a=0,la=this.orbs.length;a<la;a++){
            if(type>=0&&this.orbs[a]==type||type==-1&&this.orbs[a]>=0||type==-2&&this.orbs[a]>=0&&!checked.includes(this.orbs[a])){
                count++
                checked.push(this.orbs[a])
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
        if(this.orbs.length>0){
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
                    if(this.status.main[752]>0){
                        this.tickOrb(a)
                    }
                    a=la
                }
            }
            if(!success){
                if(this.status.main[375]>0){
                    let result=this.battle.combatantManager.getRandom(1,[])
                    if(result.length>0){
                        this.evoke(0,result[0],[1])
                        this.holdOrb(type)
                    }
                }else{
                    this.evoke(0,this.id,[1])
                    this.holdOrb(type)
                }
            }
            this.checkAnyOrb()
        }
    }
    subEvoke(type,detail,target){
        let multi=1
        if(this.status.main[111]>0){
            multi=1+this.status.main[111]*0.1
        }else if(this.status.main[111]<0){
            multi=max(0.2,1+this.status.main[111]*0.1)
        }
        if(this.id>=0&&this.id<this.battle.players){
            this.battle.cardManagers[this.id].hand.allEffectArgs(51,[type])
            switch(type){
                case 0:
                    this.battle.cardManagers[this.id].discard.allEffectArgs(44,[5935])
                    this.battle.cardManagers[this.id].reserve.allEffectArgs(44,[5935])
                break
                case 1:
                    this.battle.cardManagers[this.id].discard.allEffectArgs(44,[6209])
                    this.battle.cardManagers[this.id].reserve.allEffectArgs(44,[6209])
                break
            }
        }
        if(this.status.main[674]>0&&type>=0){
            this.addBlock(this.status.main[674])
        }
        let playerMulti=target==this.id?0.5:1
        switch(type){
            case 0:
                this.battle.combatantManager.combatants[target].orbTake(round((12+this.status.main[670])*multi*playerMulti),-1)
            break
            case 1:
                this.battle.combatantManager.combatants[target].addBlock(round(16*multi))
            break
            case 2:
                if(target==this.id){
                    this.battle.combatantManager.areaAbstract(0,[round(20*multi),-1,0],this.battle.combatantManager.combatants[target].tilePosition,[3,this.id],[0,1],false,0)
                }else{
                    this.battle.combatantManager.areaAbstract(0,[round(20*multi),-1,0],this.battle.combatantManager.combatants[target].tilePosition,[0],[0,1],false,0)
                }
            break
            case 3:
                if(target<this.battle.players||this.id<this.battle.players){
                    this.battle.addSpecificEnergy(3,target>=this.battle.players?this.id:target,6)
                }
            break
            case 4:
                this.battle.combatantManager.combatants[target].orbTake(round(detail*multi*playerMulti),-1)
                if(this.status.main[646]>0&&!this.orbs.includes(6)){
                    for(let a=0,la=this.status.main[646];a<la;a++){
                        this.holdOrb(6)
                    }
                }
            break
            case 5:
                this.battle.combatantManager.combatants[target].orbTake(round(8*multi*playerMulti),-1)
            break
            case 6:
                if(target<this.battle.players||this.id<this.battle.players){
                    this.battle.cardManagers[target>=this.battle.players?this.id:target].draw(2)
                }
                if(this.status.main[647]>0&&!this.orbs.includes(4)){
                    for(let a=0,la=this.status.main[647];a<la;a++){
                        this.holdOrb(4)
                    }
                }
            break
            case 7:
                this.battle.combatantManager.combatants[target].statusEffect('Burn',3)
                if(this.status.main[645]>0){
                    this.battle.combatantManager.areaAbstract(0,[this.status.main[645],this.id,0],this.tilePosition,[3,this.id],[0,1],false,0)
                }
            break
            case 8:
                this.battle.combatantManager.combatants[target].statusEffect('Freeze',3)
            break
            case 9:
                this.battle.combatantManager.combatants[target].statusEffect('Strength',3)
            break
            case 10:
                this.battle.combatantManager.combatants[target].statusEffect('Weak',3)
            break
            case 11:
                this.battle.combatantManager.combatants[target].statusEffect('Poison',5)
            break
            case 12:
                this.battle.combatantManager.combatants[target].orbTake(round(4*multi*playerMulti),-1)
            break
            case 13:
                if((this.battle.combatantManager.combatants[target].team>0?1:0)!=(this.team>0?1:0)){
                    this.battle.combatantManager.combatants[target].orbTake(round(15*multi*playerMulti),-1)
                }else{
                    this.battle.combatantManager.combatants[target].addBlock(round(20*multi))
                }
            break
            case 14:
                this.battle.combatantManager.combatants[target].statusEffect('Counter All',round(12*multi))
                if(target<this.battle.players||this.id<this.battle.players){
                    this.battle.addSpecificEnergy(1,target>=this.battle.players?this.id:target,0)
                }
            break
            case 15:
                this.battle.combatantManager.combatants[target].addBlock(round(12*multi))
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
        if(this.id>=0&&this.id<this.battle.players){
            this.battle.cardManagers[this.id].hand.allEffect(115,[])
            if(type==0){
                this.battle.cardManagers[this.id].discard.allEffectArgs(44,[5935])
                this.battle.cardManagers[this.id].reserve.allEffectArgs(44,[5935])
            }
        }
        if(this.status.main[674]>0&&type>=0){
            this.addBlock(this.status.main[674])
        }
        let playerMulti=target==this.id?0.1:1
        switch(type){
            case 0:
                this.battle.combatantManager.combatants[target].orbTake(round((6+this.status.main[670])*multi*playerMulti),-1)
            break
            case 1:
                this.battle.combatantManager.combatants[target].addBlock(round(8*multi))
            break
            case 2:
                if(target==this.id){
                    this.battle.combatantManager.areaAbstract(0,[round(10*multi),-1,0],this.battle.combatantManager.combatants[target].tilePosition,[3,this.id],[0,1],false,0)
                }else{
                    this.battle.combatantManager.areaAbstract(0,[round(10*multi),-1,0],this.battle.combatantManager.combatants[target].tilePosition,[0],[0,1],false,0)
                }
            break
            case 3:
                this.battle.addSpecificEnergy(2,target>=this.battle.players?this.id:target,6)
            break
            case 4:
                this.battle.combatantManager.combatants[target].orbTake(round(detail*multi*playerMulti/2),-1)
            break
            case 5:
                this.battle.combatantManager.combatants[target].orbTake(round(4*multi*playerMulti),-1)
            break
            case 6:
                this.battle.cardManagers[target>=this.battle.players?this.id:target].draw(1)
            break
            case 7:
                this.battle.combatantManager.combatants[target].statusEffect('Burn',2)
                if(this.status.main[645]>0){
                    this.battle.combatantManager.areaAbstract(0,[this.status.main[645],this.id,0],this.tilePosition,[3,this.id],[0,1],false,0)
                }
            break
            case 8:
                this.battle.combatantManager.combatants[target].statusEffect('Freeze',2)
            break
            case 9:
                this.battle.combatantManager.combatants[target].statusEffect('Strength',1)
            break
            case 10:
                this.battle.combatantManager.combatants[target].statusEffect('Weak',1)
            break
            case 11:
                this.battle.combatantManager.combatants[target].statusEffect('Poison',2)
            break
            case 12:
                this.battle.combatantManager.combatants[target].orbTake(round(2*multi*playerMulti),-1)
            break
            case 13:
                if((this.battle.combatantManager.combatants[target].team>0?1:0)!=(this.team>0?1:0)){
                    this.battle.combatantManager.combatants[target].orbTake(round(8*multi*playerMulti),-1)
                }else{
                    this.battle.combatantManager.combatants[target].addBlock(round(10*multi))
                }
            break
            case 14:
                this.battle.combatantManager.combatants[target].statusEffect('Counter All',round(6*multi))
                if(target<this.battle.players||this.id<this.battle.players){
                    this.battle.addSpecificEnergy(1,target>=this.battle.players?this.id:target,0)
                }
            break
            case 15:
                this.battle.combatantManager.combatants[target].addBlock(round(6*multi))
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
                this.battle.combatantManager.combatants[target].statusEffect('Buffer',round(2))
            break
            case 2:
                this.battle.combatantManager.combatants[target].orbTake(round(50*multi),-1)
            break
            case 9:w
                this.battle.combatantManager.combatants[target].statusEffect('Double Damage',round(4))
            break
            case 10:
                this.battle.combatantManager.combatants[target].statusEffect('Strength',-round(3))
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
                        this.battle.addSpecificEnergy(1,this.id,6)
                        this.battle.cardManagers[this.id].draw(1)
                        this.orbs[a]=-1
                    }
                }
            break
            case 3:
                for(let a=0,la=this.orbs.length;a<la;a++){
                    if(this.orbs[a]>=0){
                        this.battle.addSpecificEnergy(1,this.id,6)
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
                this.orbs[this.orbs.length-1]=-1
                this.orbDetail[this.orbs.length-1]=-1
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
            case 7:
                for(let a=0,la=this.orbs.length;a<la;a++){
                    if(this.orbs[a]>=0){
                        switch(this.orbs[a]){
                            case 1: case 3: case 6: case 9:
                                this.subEvoke(this.orbs[a],this.orbDetail[a],this.id)
                            break
                            case 0: case 2: case 4: case 5: case 7: case 8: case 10: case 11: case 12:
                                this.subEvoke(this.orbs[a],this.orbDetail[a],target)
                            break
                        }
                        this.orbs[a]=-1
                    }
                }
            break
            case 8:
                for(let a=0,la=args[0];a<la;a++){
                    this.subEvoke(this.orbs[0],this.orbDetail[0],target)
                }
            break
            case 9:
                for(let a=0,la=this.orbs.length;a<la;a++){
                    if(this.orbs[a]>=0){
                        this.battle.addSpecificEnergy(args[0],this.id,6)
                        this.battle.cardManagers[this.id].draw(args[1])
                        this.orbs[a]=-1
                    }
                }
            break
            case 10:
                for(let a=0,la=this.orbs.length;a<la;a++){
                    if(this.orbs[a]>=0){
                        this.battle.addSpecificEnergy(args[0],this.id,6)
                        this.battle.cardManagers[this.id].draw(args[1])
                        this.subEvoke(this.orbs[a],this.orbDetail[a],target)
                        this.orbs[a]=-1
                    }
                }
            break
            case 11:
                for(let a=0,la=this.orbs.length;a<la;a++){
                    if(this.orbs[a]>=0){
                        for(let b=0,lb=args[0].length;b<lb;b++){
                            this.battle.addSpecificEnergy(1,this.id,args[0][b])
                        }
                        this.battle.cardManagers[this.id].draw(args[1])
                        this.orbs[a]=-1
                    }
                }
            break
            case 12:
                for(let a=0,la=this.orbs.length;a<la;a++){
                    if(this.orbs[a]>=0){
                        for(let b=0,lb=args[0].length;b<lb;b++){
                            this.battle.addSpecificEnergy(1,this.id,args[0][b])
                        }
                        this.battle.cardManagers[this.id].draw(args[1])
                        this.subEvoke(this.orbs[a],this.orbDetail[a],target)
                        this.orbs[a]=-1
                    }
                }
            break
            case 13:
                for(let a=0,la=this.orbs.length;a<la;a++){
                    if(this.orbs[a]>=0){
                        let hold=this.orbs[a]
                        this.orbs[a]=-1
                        let result=floor(random(0,constants.orbNumber-1))
                        this.holdOrb(result+(result>=hold?1:0))
                    }
                }
            break
        }
        this.checkAnyOrb()
    }
    spendCharge(value){
        if(this.status.main[595]>0){
            this.status.main[595]--
            return true
        }else if(this.charge>=value){
            this.charge-=value
            this.chargeConsumed()
            return true
        }
        return false
    }
    check10(){
        return this.status.main[260]>0?floor(random(0,4))==0:floor(random(0,10))==0
    }
    luckCheck(){
        if(this.status.main[263]>0&&floor(random(0,2))==0||this.status.main[299]){
            return true
        }else if(this.status.main[200]>0){
            this.status.main[200]--
            return true
        }else{
            return false
        }
    }
    luckCheckFail(){
        if(this.status.main[296]>0){
            this.status.main[296]--
            return true
        }else{
            return false
        }
    }
    retainAllEnergy(){
        if(this.status.main[464]>0){
            this.status.main[464]--
            return true
        }else if(this.status.main[594]>0){
            this.status.main[594]--
            return true
        }else{
            return false
        }
    }
    cable(target,key){
        return targetDirection(0,target.tilePosition.x-this.tilePosition.x,target.tilePosition.y-this.tilePosition.y)==key||
            targetDirection(0,target.tilePosition.x-this.tilePosition.x,target.tilePosition.y-this.tilePosition.y)%3==key%3&&this.status.main[289]>0
    }
    checkTile(){
        if(this.status.main[219]>0){
            this.status.main[219]--
            return true
        }else{
            return false
        }
    }
    onScry(){
        this.addBarrier(this.status.main[345])
        this.battle.combatantManager.allEffect(19,[this.status.main[679]])
        return this.status.main[335]
    }
    energyParity(energy){
        return this.status.main[295]>0?1:energy%2
    }
    enterStance(stance){
        this.leaveStance(this.stance)
        if(this.id<this.battle.players){
            this.battle.cardManagers[this.id].hand.allEffect(110)
            this.battle.cardManagers[this.id].discard.allEffect(28)
            this.battle.cardManagers[this.id].reserve.allEffect(28)
        }
        this.stance=stance
        switch(stance){
            case 3:
                this.battle.cardManagers[this.id].hand.add(findName('Stride',types.card),0,0)
            break
            case 5:
                this.battle.addSpecificEnergy(variants.mtg?5:3,this.id,6)
            break
        }
        if(this.status.main[126]>0){
            this.addBlock(this.status.main[126])
        }
        if(this.status.main[127]>0&&this.id>=0&&this.id<this.battle.players){
            this.battle.cardManagers[this.id].draw(this.status.main[127])
        }
        if(this.status.main[510]>0){
            this.statusEffect('Temporary Strength',this.status.main[510])
        }
    }
    leaveStance(stance){
        switch(stance){
            case 2:
                this.battle.addSpecificEnergy(variants.mtg?3:2+this.status.main[678],this.id,6)
                if(this.status.main[745]>0){
                    this.statusEffect('Temporary Strength',this.status.main[745])
                }
            break
        }
    }
    comboConsumed(){
        if(this.status.main[651]>0&&this.id>=0&&this.id<this.battle.players){
            this.battle.cardManagers[this.id].draw(this.status.main[651])
        }
    }
    chargeConsumed(){
        if(this.status.main[150]>0){
            this.addBlock(this.status.main[150])
        }
        if(this.status.main[776]>0){
            this.statusEffect('Single Damage Up',this.status.main[776])
        }
    }
    activateDraw(){
        this.activateHistory()
    }
    activateRewind(){
        this.activateHistory()
    }
    activateHistory(){
        if(this.life>0&&this.status.main[306]>0){
            if(this.status.main[309]>0){
                this.battle.combatantManager.allEffect(19,[this.status.main[306]])
            }else{
                this.battle.combatantManager.randomEnemyEffect(0,[this.status.main[306]])
            }
        }
    }
    rearm(){
        if(!this.armed){
            this.armed=true
        }
        if(this.status.main[599]>0&&this.id>=0&&this.id<this.battle.players){
            this.battle.cardManagers[this.id].draw(this.status.main[599])
        }
        if(this.status.main[747]>0){
            this.statusEffect('Strength',this.status.main[747])
        }
        if(this.id<this.battle.players){
            this.battle.cardManagers[this.id].hand.allEffect(95)
        }
    }
    diceRoll(number,value){
        let effectiveValue=value+this.status.main[605]
        let total=0
        let average=0
        let roll=0
        let luckCheck=false
        let luckCheckFail=false
        if(this.status.main[473]>0){
            number+=this.status.main[473]
            this.status.main[473]=0
        }
        if(this.status.main[261]>0){
            luckCheck=true
        }else{
            luckCheck=this.luckCheck()
            if(!luckCheck){
                luckCheckFail=this.luckCheckFail()
            }
        }
        for(let a=0,la=number;a<la;a++){
            roll=(luckCheck?effectiveValue:luckCheckFail?1:1+floor(random(0,effectiveValue)))+this.status.main[252]
            total+=roll
            average+=(1+value)/2+this.status.main[252]
            this.battle.particleManager.createNumber(41,this.position.x,this.position.y,roll)
        }
        if(total<average*0.8){
            this.lowRoll()
        }else if(total>average*1.2){
            this.highRoll()

        }
        if(this.status.main[495]>0){
            this.addBlock(this.status.main[495])
        }
        return total
    }
    prime(value){
        if(this.id<this.battle.players){
            this.battle.cardManagers[this.id].hand.allEffectArgs(62,[value,'Slash'])
            this.battle.cardManagers[this.id].discard.allEffectArgs(44,[6965])
            this.battle.cardManagers[this.id].reserve.allEffectArgs(44,[6965])
        }
    }
    assign(value){
        if(this.battle.cardManagers[this.id].hand.numberAbstract(3,[82])>=value){
            this.battle.cardManagers[this.id].hand.deAbstract(6,value,[82])
            if(this.status.main[777]>0){
                this.battle.cardManagers[this.id].exhaust.sendAbstract(this.battle.cardManagers[this.id].hand.cards,this.status.main[777],10,0,[82])
            }
            if(this.status.main[778]>0){
                this.statusEffect('Temporary Strength',this.status.main[778])
            }
            return true
        }else{
            return false
        }
    }
    clearStatus(){
        for(let a=0,la=this.status.main.length;a<la;a++){
            this.status.main[a]=0
            this.statusSignUpdate(a)
        }
    }
    statusEffect(name,value){
        let effectiveValue=value
        if(!(
            (this.battle.relicManager.hasRelic(23,this.id)||this.battle.relicManager.hasRelic(398,this.id))&&name=='Weak'||
            (this.battle.relicManager.hasRelic(24,this.id)||this.battle.relicManager.hasRelic(398,this.id))&&name=='Frail'||
            (this.battle.relicManager.hasRelic(25,this.id)||this.battle.relicManager.hasRelic(398,this.id))&&name=='Vulnerable')&&
            effectiveValue!=0
        ){
            let status=findList(name,this.status.name)
            if(status>=0){
                if(name=='Bleed'&&effectiveValue>0){
                    if(this.battle.turn.main>=0&&this.battle.turn.main<this.battle.players&&this.team!=this.battle.turn.main+1&&this.battle.turn.main<this.battle.combatantManager.combatants.length){
                        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.battle.turn.main)]
                        if(userCombatant.getStatus('Bleed Boost')>0){
                            effectiveValue+=userCombatant.getStatus('Bleed Boost')
                        }
                    }
                }
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
                if(this.status.main[292]>0){
                    this.status.main[292]--
                    mult*=2
                }
                if((this.status.class[status]==1||this.status.class[status]==3)&&this.team>0&&this.battle.modded(238)&&name!='Weak'&&name!='Weak Next Turn'){
                    this.statusEffect(this.battle.turn.main==this.id?'Weak':'Weak Next Turn',1)
                }
                if(this.status.main[15]>0&&((this.status.class[status]==1||this.status.class[status]==3)&&effectiveValue>0||(this.status.class[status]==0||this.status.class[status]==2)&&effectiveValue<0)){
                    this.status.main[15]--
                }else if(this.status.main[46]>0&&((this.status.class[status]==0||this.status.class[status]==2)&&effectiveValue>0||(this.status.class[status]==1||this.status.class[status]==3)&&effectiveValue<0)){
                    this.status.main[46]--
                }else{
                    this.status.main[status]=constrain(this.status.main[status]+effectiveValue*mult,-999,999)
                }
                if(name=='Temporary Strength'&&this.status.main[362]>0){
                    this.statusEffect('Strength',this.status.main[362])
                }
                if(status==32){
                    this.battle.updateTargetting()
                }
                if((this.status.class[status]==1||this.status.class[status]==3)&&effectiveValue>0||(this.status.class[status]==0||this.status.class[status]==2)){
                    if(this.battle.turn.main>=0&&this.battle.turn.main<this.battle.players&&this.team!=this.battle.turn.main+1&&this.battle.turn.main<this.battle.combatantManager.combatants.length){
                        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.battle.turn.main)]
                        if(userCombatant.getStatus('Debuff Damage')>0){
                            this.takeDamage(userCombatant.getStatus('Debuff Damage'),userCombatant.id)
                        }
                    }
                    if(this.battle.modded(203)&&this.battle.turn.main>=0&&this.battle.turn.main<this.battle.players&&this.team!=this.battle.turn.main+1&&this.battle.turn.main<this.battle.combatantManager.combatants.length){
                        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.battle.turn.main)]
                        userCombatant.statusEffect(name,effectiveValue)
                    }
                    if(this.status.main[511]>0){
                        this.addBlock(this.status.main[511])
                    }
                }
                if(name=='Poison'&&effectiveValue>0){
                    if(this.battle.turn.main>=0&&this.battle.turn.main<this.battle.players&&this.team!=this.battle.turn.main+1&&this.battle.turn.main<this.battle.combatantManager.combatants.length){
                        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.battle.turn.main)]
                        if(userCombatant.getStatus('Poison Damage')>0){
                            this.takeDamage(userCombatant.getStatus('Poison Damage'),-1)
                        }
                    }
                }
                if(name=='Bleed'&&effectiveValue>0){
                    if(this.battle.turn.main>=0&&this.battle.turn.main<this.battle.players&&this.team!=this.battle.turn.main+1&&this.battle.turn.main<this.battle.combatantManager.combatants.length){
                        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.battle.turn.main)]
                        if(userCombatant.getStatus('Bleed Damage')>0){
                            this.takeDamage(userCombatant.getStatus('Bleed Damage'),-1)
                        }
                        if(userCombatant.getStatus('Bleed Attack Intent')>0){
                            this.setIntentClass(1)
                        }
                    }
                }
                if(name=='Freeze'&&effectiveValue>0){
                    if(this.battle.turn.main>=0&&this.battle.turn.main<this.battle.players&&this.team!=this.battle.turn.main+1&&this.battle.turn.main<this.battle.combatantManager.combatants.length){
                        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.battle.turn.main)]
                        if(userCombatant.getStatus('Freeze Vulnerable')>0){
                            this.statusEffect('Vulnerable',userCombatant.getStatus('Freeze Vulnerable'))
                        }
                    }
                }
                if(name=='Lock On'&&effectiveValue>0){
                    if(this.battle.turn.main>=0&&this.battle.turn.main<this.battle.players&&this.team!=this.battle.turn.main+1&&this.battle.turn.main<this.battle.combatantManager.combatants.length){
                        let userCombatant=this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(this.battle.turn.main)]
                        if(userCombatant.getStatus('Lock On Bleed')>0&&this.block<=0){
                            this.statusEffect('Bleed',userCombatant.getStatus('Lock On Bleed'))
                        }
                        if(userCombatant.getStatus('Lock On Poison')>0){
                            this.statusEffect('Poison',userCombatant.getStatus('Lock On Poison'))
                        }
                    }
                }
                if(name=='Communized'&&effectiveValue>0&&!this.communizers.includes(this.battle.turn.main)){
                    this.communizers.push(this.battle.turn.main)
                }
                if(this.status.main[status]!=0&&!this.status.active[status]){
                    this.status.active[status]=true
                    this.status.size[status]=0
                    this.status.position[status]=this.status.display.length*6
                    this.status.display.push(status)
                }
                this.statusSignUpdate(status)
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
    upRandomStatus(value,classes){
        let list=[]
        for(let a=0,la=this.status.main.length;a<la;a++){
            if(this.status.main[a]>0&&classes.includes(this.status.class[a])){
                list.push(a)
            }
        }
        if(list.length>0){
            this.statusEffect(this.status.name[list[floor(random(0,list.length))]],value)
        }
    }
    multiplyStatus(name,multiplier){
        let status=findList(name,this.status.name)
        this.status.main[status]=constrain(this.status.main[status]*multiplier,-999,999)
        this.statusSignUpdate(status)
    }
    reverseStatus(){
        for(let a=0,la=this.status.main.length;a<la;a++){
            this.status.main[a]*=-1
            this.statusSignUpdate(a)
        }
    }
    deStatus(name,value){
        this.statusEffect(name,-value)
        let status=findList(name,this.status.name)
        if(status>=0){
            this.status.main[status]=max(0,this.status.main[status])
        }
        this.statusSignUpdate(status)
    }
    totalUniqueStatus(buff){
        let total=0
        for(let a=0,la=this.status.main.length;a<la;a++){
            switch(buff){
                case 0:
                    if(this.status.main[a]>0&&(this.status.class[a]==0||this.status.class[a]==2)||this.status.main[a]<0&&(this.status.class[a]==1||this.status.class[a]==3)){
                        total++
                    }
                break
                case 1:
                    if(this.status.main[a]<0&&(this.status.class[a]==0||this.status.class[a]==2)||this.status.main[a]>0&&(this.status.class[a]==1||this.status.class[a]==3)){
                        total++
                    }
                break
                case 2:
                    if(this.status.main[a]!=0){
                        total++
                    }
                break
                case 3:
                    if(this.status.main[a]!=0&&this.status.name[a]!='Strength'){
                        total++
                    }
                break
            }
        }
        return total
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
            this.statusEffect(this.status.name[list[floor(random(0,list.length))]],effect)
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
    removeAllStatuses(classes){
        for(let a=0,la=this.status.class.length;a<la;a++){
            if(classes.length==0||classes.includes(this.status.class[a])&&this.status.main[a]>0||!classes.includes(this.status.class[a])&&this.status.main[a]<0){
                this.status.main[a]=0
            }
        }
    }
    multiplyStatusClass(multiplier,classes){
        for(let a=0,la=this.status.class.length;a<la;a++){
            if(
                classes.includes(this.status.class[a])&&this.status.main[a]>0||
                !classes.includes(this.status.class[a])&&this.status.main[a]<0
            ){
                this.status.main[a]=constrain(this.status.main[a]*multiplier,-999,999)
            }
        }
    }
    statusSignUpdate(index){
        if(this.status.main[index]==0&&this.status.sign[index]!=0){
            if((
                (this.status.class[index]==0||this.status.class[index]==2)&&this.status.sign[index]==1||
                (this.status.class[index]==1||this.status.class[index]==3)&&this.status.sign[index]==-1
                )&&this.status.main[445]>0
            ){
                this.addBarrier(this.status.main[445])
            }
            this.status.sign[index]=0
        }else if(this.status.main[index]>0&&this.status.sign[index]!=1){
            if((this.status.class[index]==1||this.status.class[index]==3)&&this.status.sign[index]==-1&&this.status.main[445]>0){
                this.addBarrier(this.status.main[445])
            }
            this.status.sign[index]=1
        }else if(this.status.main[index]<0&&this.status.sign[index]!=-1){
            if((this.status.class[index]==0||this.status.class[index]==2)&&this.status.sign[index]==1&&this.status.main[445]>0){
                this.addBarrier(this.status.main[445])
            }
            this.status.sign[index]=-1
        }
    }
    callEndEffect(){
        if(this.status.main[365]>0){
            this.heal(this.status.main[365])
        }
        if(this.status.main[718]>0){
            this.loseHealth(this.status.main[718])
        }
        if(this.status.main[719]>0&&this.id>=0&&this.id<this.battle.players){
            for(let a=0,la=this.status.main[719];a<la;a++){
                this.battle.itemManager.addRandomItem(this.id)
            }
        }
    }
    heal(amount){
        this.midHeal=true
        if(!this.battle.relicManager.hasRelic(163,this.id)&&amount>0&&this.life>0&&this.status.main[735]<=0){
            let gain=amount
            if(this.battle.relicManager.hasRelic(53,this.id)){
                gain*=1.5
            }
            if(this.battle.relicManager.hasRelic(284,this.id)){
                gain*=0.5
            }
            gain=float(tennify(gain))
            if(this.status.main[109]>0){
                this.gainMaxHP(this.status.main[109])
            }
            if(this.status.main[280]>0){
                this.battle.combatantManager.randomEnemyEffect(3,[this.status.main[280],this.id])
            }
            if(stage.scene=='battle'&&this.position.x>0&&this.position.y>0&&this.position.x<this.layer.width&&this.position.y<this.layer.height){
                this.battle.particleManager.createNumber(77,this.position.x,this.position.y,gain)
            }
            if(this.id<this.battle.players){
                this.battle.cardManagers[this.id].discard.allEffectArgs(24,[3198,4727])
                this.battle.cardManagers[this.id].reserve.allEffectArgs(24,[3198,4727])
            }
            this.life=min(this.life+ceil(gain),this.base.life)
        }
        this.midHeal=false
    }
    healLifable(amount){
        if(!this.battle.relicManager.hasRelic(163,this.id)&&amount>0){
            let gain=amount
            if(this.battle.relicManager.hasRelic(53,this.id)){
                gain*=1.5
            }
            if(this.battle.relicManager.hasRelic(284,this.id)){
                gain*=0.5
            }
            gain=float(tennify(gain))
            if(this.status.main[109]>0){
                this.gainMaxHP(this.status.main[109])
            }
            if(this.life<0){
                this.life=0
            }
            if(stage.scene=='battle'&&this.position.x>0&&this.position.y>0&&this.position.x<this.layer.width&&this.position.y<this.layer.height){
                this.battle.particleManager.createNumber(77,this.position.x,this.position.y,gain)
            }
            this.life=min(this.life+ceil(gain),this.base.life)
        }
    }
    gainMaxHP(amount){
        if(this.life>0&&amount>0){
            this.base.life+=amount
            this.life+=amount
        }
    }
    setMaxHP(amount){
        this.base.life=amount
        this.life=amount
        this.collect.life=amount
    }
    loseMaxHP(amount){
        this.base.life=max(1,this.base.life-amount)
        this.life=min(this.life,this.base.life)
    }
    loseHealth(amount){
        let preLife=this.life
        if(this.status.main[21]>0){
            this.status.main[21]--
            this.infoAnim.upFlash[2]=true
        }else{
            this.life-=amount
            if(this.status.main[301]>0){
                this.status.main[301]--
            }
            if(this.status.main[610]>0){
                this.status.main[610]-=amount
                if(this.status.main[610]<=0){
                    this.accelerate++
                    if(!this.usedIntent.includes(this.intent)){
                        this.usedIntent.push(this.intent)
                    }
                    this.intent=(this.turnsAlive-1+this.accelerate)%this.attack.length
                    this.convertIntent()
                    this.battle.updateTargetting()
                    this.status.main[610]=20
                }
            }
            if(this.id<this.battle.players&&this.id==this.battle.turn.main&&this.status.main[438]>0){
                this.battle.combatantManager.areaAbstract(0,[this.status.main[438],this.id,0],this.tilePosition,[3,this.id],[0,1],false,0)
            }
            if(this.id<this.battle.players){
                this.battle.relicManager.activate(20,[amount,this.id])
            }
            if(this.id<this.battle.players){
                this.battle.cardManagers[this.id].discard.allEffectArgs(24,[4727])
                this.battle.cardManagers[this.id].reserve.allEffectArgs(24,[4727])
                this.battle.cardManagers[this.id].trueAllGroupEffectArgs(65,[7242,amount])
            }
            if(this.status.main[655]>0){
                this.battle.combatantManager.randomEnemyEffect(23,['Poison',this.status.main[655]])
            }
        }
        if(this.battle.relicManager.hasRelic(482,-1)&&preLife>=this.base.life*0.25&&this.life<this.base.life*0.25){
            this.statusEffect('Weak',999)
        }
    }
    endTurn(){
        this.turnDodges=0
        this.turnTaken=0
    }
    tick(sub){
        this.charge++
        if(this.elemental){
            if(this.status.main[305]<=0){
                if(this.status.main[6]>0){
                    this.statusEffect('Strength',-1)
                }
                this.elemental=false
            }else{
                if(this.status.main[499]>0){
                    this.battle.addEnergy(this.status.main[499],this.id)
                }else if(this.status.main[499]<0){
                    this.battle.loseEnergy(-this.status.main[499],this.id)
                }
                if(this.status.main[580]>0){
                    this.battle.addSpecificEnergy(this.status.main[580],this.id,6)
                }else if(this.status.main[580]<0){
                    this.battle.loseEnergy(-this.status.main[580],this.id)
                }
                if(this.status.main[500]>0){
                    if(this.id<this.battle.players){
                        this.battle.cardManagers[this.id].tempDraw.main+=this.status.main[500]
                    }
                }
            }
        }
        for(let a=0,la=this.spec.length;a<la;a++){
            if(this.spec[a]<0){
                this.spec.splice(a,1)
                a--
                la--
            }
        }
        for(let a=0,la=this.status.main.length;a<la;a++){
            if(this.status.main[a]!=0){
                if(this.status.behavior[a]==5){
                    if(this.status.main[a]>0){
                        this.status.main[a]--
                    }else if(this.status.main[a]<0){
                        this.status.main[a]++
                    }
                }
            }
        }
        for(let a=0,la=this.status.main.length;a<la;a++){
            if(this.status.main[a]!=0){
                switch(a){
                    case 4: if(this.status.main[a]<0){this.battle.loseEnergy(-this.status.main[a],this.id)}else{this.battle.addSpecificEnergy(this.status.main[a],this.id,6)} break
                    case 31: case 52: case 62: case 110: case 121: case 179: this.takeDamage(this.status.main[a],-1); break
                    case 13: case 14: case 19: case 217: this.addBlock(this.status.main[a]); break
                    case 20: this.status.main[findList('Weak',this.status.name)]+=this.status.main[a]; break
                    case 29: this.status.main[findList('Cannot Move',this.status.name)]+=this.status.main[a]; break
                    case 30: case 55: this.status.main[findList('Strength',this.status.name)]+=this.status.main[a]; break
                    case 33: case 209: this.heal(this.status.main[a]); break
                    case 34: case 146: this.status.main[findList('Dexterity',this.status.name)]+=this.status.main[a]; break
                    case 37: this.status.main[findList('Cannot Add Block',this.status.name)]+=this.status.main[a]; break
                    case 41: case 84: case 285: if(this.id<this.battle.players){this.battle.cardManagers[this.id].tempDraw.main+=this.status.main[a]} break
                    case 49: if(this.interiorStatus[1]==0){this.takeDamage(this.status.main[a],-1)} break
                    case 58: this.status.main[findList('Temporary Strength',this.status.name)]+=this.status.main[a]; break
                    case 66: case 598: for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].hand.add(findName('Shiv',types.card),0,0)} break
                    case 67: if(this.combo>0){this.comboConsumed()};this.combo=0; break
                    case 71: case 72: if(this.combo>0&&this.status.main[a]<0){this.comboConsmed()};this.combo=constrain(this.combo+this.status.main[a],0,this.comboCap); break
                    case 81: this.status.main[findList('Energy Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 83: this.status.main[findList('Double Damage Turn',this.status.name)]+=this.status.main[a]; break
                    case 85: if(this.id<this.battle.players){this.battle.cardManagers[this.id].hand.discard(this.status.main[a])}; break
                    case 86: case 128: this.loseHealth(this.status.main[a]); break
                    case 88: this.status.main[findList('Intangible',this.status.name)]+=this.status.main[a]; break
                    case 89: this.status.main[findList('Block Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 107: if(this.armed){this.addBlock(this.status.main[a])} break
                    case 113: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].addRandomAbstract(2,0,0,0,0,[0],[3,4])}} break
                    case 116: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].addRandomAbstract(2,0,0,0,0,[],[0])}} break
                    case 118: this.status.main[findList('Focus',this.status.name)]+=this.status.main[a]; break
                    case 120: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].hand.add(findName('Step',types.card),0,this.type)}} break
                    case 124: case 613: this.status.main[findList('Dodge',this.status.name)]+=this.status.main[a]; break
                    case 125: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].hand.add(findName('Smite',types.card),0,0)}} break
                    case 129: case 229: this.faith+=this.status.main[a]; break
                    case 130: case 235: if(this.id<this.battle.players){this.battle.cardManagers[this.id].hand.add(findName('Miracle',types.card),0,0)}; break
                    case 131: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].hand.add(findName('Miracle',types.card),1,0)}}; break
                    case 132: this.enterStance(1); break
                    case 133: if(this.id<this.battle.players){this.battle.cardManagers[this.id].reserve.addAbstract(findName('Insight',types.card),0,0,0,[5],[])}; break
                    case 135: case 343: if(this.status.main[a]<0){this.battle.loseEnergy(-this.status.main[a],this.id)}else{this.battle.addSpecificEnergy(this.status.main[a],this.id,6)};if(this.status.main[a]<0){this.battle.loseEnergyGen(-this.status.main[a],this.id)}else{this.battle.addEnergyGen(this.status.main[a],this.id)} break
                    case 142: case 155: this.charge+=this.status.main[a]; break
                    case 143: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].hand.add(findName('Burn',types.card),0,constants.playerNumber+1)}} break
                    case 149: this.status.main[findList('No Amplify',this.status.name)]+=this.status.main[a]; break
                    case 157: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].addRandomAbstract(2,0,0,0,0,[0],[3,2])}} break
                    case 158: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].addRandomAbstract(2,1,0,0,0,[0],[3,2])}} break
                    case 164: this.status.main[findList('Energy in 2 Turns',this.status.name)]+=this.status.main[a]; break
                    case 180: this.status.main[findList('Take Damage',this.status.name)]+=this.status.main[a]; break
                    case 181: this.status.main[findList('Take Damage Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 182: this.status.main[findList('Block in 2 Turns',this.status.name)]+=this.status.main[a]; break
                    case 189: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].hand.add(findName('Conviction',types.card),0,types.card[findName('Conviction',types.card)].list)}} break
                    case 197: if(floor(random(0,3))==0){this.takeDamage(this.status.main[a],-1);this.status.main[a]=floor(this.status.main[a]/2)} break
                    case 203: this.heal(this.status.main[a]); break
                    case 207: this.status.main[findList('Temporary Dexterity',this.status.name)]+=this.status.main[a]; break
                    case 212: this.status.main[findList('Half Damage Turn',this.status.name)]+=this.status.main[a]; break
                    case 220: this.status.main[findList('Jinx',this.status.name)]+=this.status.main[a]; break
                    case 222: if(this.id<this.battle.players){this.battle.cardManagers[this.id].tempDraw.burn+=this.status.main[a]}; break
                    case 232: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].hand.add(findName('Peak',types.card),0,0)}}; break
                    case 237: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].hand.add(findName('Hyperquill',types.card),0,0)}}; break
                    case 244: this.takeDamage(this.status.main[a],-1);this.status.next[findList('Damage Cycle 3 3',this.status.name)]+=this.status.main[a]; break
                    case 245: this.status.main[findList('Damage Cycle 3 1',this.status.name)]+=this.status.main[a]; break
                    case 246: this.status.main[findList('Damage Cycle 3 2',this.status.name)]+=this.status.main[a]; break
                    case 248: this.status.main[findList('No Damage',this.status.name)]+=this.status.main[a]; break
                    case 249: if(this.id<this.battle.players){this.battle.cardManagers[this.id].tempDraw.freeze+=this.status.main[a]}; break
                    case 259: this.status.main[findList('Vulnerable',this.status.name)]+=this.status.main[a]; break
                    case 262: this.status.main[findList('Luck Guarantee',this.status.name)]+=this.status.main[a]; break
                    case 265: this.status.main[findList('Temporary Damage Down',this.status.name)]+=this.status.main[a]; break
                    case 268: this.addBlock(this.status.main[a]);this.status.next[findList('Block Cycle 2 2',this.status.name)]+=this.status.main[a]; break
                    case 269: this.status.main[findList('Block Cycle 2 1',this.status.name)]+=this.status.main[a]; break
                    case 270: this.status.main[findList('Temporary Damage Up',this.status.name)]+=this.status.main[a]; break
                    case 278: this.loseHealth(1); break
                    case 282: this.status.main[findList('Strength Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 283: this.status.main[findList('Dexterity Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 287: this.status.main[findList('Strength in 2 Turns',this.status.name)]+=this.status.main[a]; break
                    case 294: if(floor(random(0,3))==0){this.heal(this.status.main[a]);this.status.main[a]=0} break
                    case 302: this.status.main[findList('Bleed',this.status.name)]+=this.status.main[a]; break
                    case 303: this.status.main[findList('Bleed Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 304: if(this.status.main[findList('Cannot Move',this.status.name)]>0){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].hand.add(findName('Shiv',types.card),0,0)}} break
                    case 307: if(this.id<this.battle.players){this.battle.cardManagers[this.id].tempDraw.main+=constrain(floor(this.status.main[a]/3),0,1+this.getStatus('Wisdom'))}; break
                    case 311: this.status.main[findList('History',this.status.name)]+=this.status.main[a]; break
                    case 316: if(this.id<this.battle.players){this.battle.cardManagers[this.id].hand.rewind(this.status.main[a])}; break
                    case 328: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.itemManager.addItem(findInternal(['Heal 3',variants.mtg?'3 Mana':'2 Energy','5 Damage','10 Block','Draw 2','1 Strength','1 Dexterity','1 Free Card'][floor(random(0,8))],types.item),this.id)}} break
                    case 331: if(this.id<this.battle.players){this.battle.overlayManager.overlays[58][this.id].active=true;this.battle.overlayManager.overlays[58][this.id].activate([this.status.main[a],0])} break
                    case 332: for(let b=0,lb=this.status.main[a];b<lb;b++){if(this.battle.cardManagers[this.id].hand.numberAbstract(0,[['Dual\nDiscus']])<=0){this.battle.cardManagers[this.id].hand.add(findName('Dual\nDiscus',types.card),0,0)}} break
                    case 333: this.status.main[findList('Temporary Draw',this.status.name)]+=this.status.main[a]; break
                    case 334: this.status.main[findList('Temporary Draw Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 344: this.status.main[findList('Base Energy Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 346: this.status.main[findList('Miracle Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 347: if(!sub){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.combatantManager.tickSub()}} break
                    case 348: this.addBarrier(this.status.main[a]); break
                    case 349: this.status.main[findList('Miracle in 2 Turns',this.status.name)]+=this.status.main[a]; break
                    case 350: this.status.main[findList('Extra Turn',this.status.name)]+=this.status.main[a]; break
                    case 351: this.status.main[findList('Extra Turn Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 356: this.battle.combatantManager.highestEffect(0,[this.status.main[a],this.id]); break
                    case 359: this.status.main[findList('Temporary Dexterity',this.status.name)]+=this.status.main[a]; break
                    case 364: this.battle.setEnergy(0,this.id); break
                    case 366: for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].hand.add(findName('Pristine',types.card),0,0)} break
                    case 368: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].hand.add(findName('Stride',types.card),0,0)}} break
                    case 369: this.status.main[findList('Stride Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 371: this.status.main[findList('Dexterity in 2 Turns',this.status.name)]+=this.status.main[a]; break
                    case 372: this.status.main[findList('Strength in 3 Turns',this.status.name)]+=this.status.main[a]; break
                    case 373: this.status.main[findList('Dexterity in 3 Turns',this.status.name)]+=this.status.main[a]; break
                    case 377: case 663: this.battle.combatantManager.areaAbstract(0,[this.status.main[a],this.id,0],this.tilePosition,[3,this.id],[0,1],false,0); break
                    case 389: this.status.main[findList('Temporary Strength',this.status.name)]+=this.status.main[a]; break
                    case 390: this.battle.combatantManager.allEffect(43,[this.status.main[a],this.id]); break
                    case 391: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].discard.add(findName('Prismatic\nBomb',types.card),0,0)}} break
                    case 393: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){let index=floor(random(0,this.battle.cardManagers[this.id].deck.cards.length));this.battle.cardManagers[this.id].deck.copy(this.battle.cardManagers[this.id].hand.cards,index,index+1,0)}} break
                    case 394: if(this.status.main[a]<0){this.battle.loseEnergy(-this.status.main[a],this.id)}else{this.battle.addSpecificEnergy(this.status.main[a],this.id,6)};this.status.next[findList('Energy Cycle 2 2',this.status.name)]+=this.status.main[a]; break
                    case 395: this.status.main[findList('Energy Cycle 2 1',this.status.name)]+=this.status.main[a]; break
                    case 396: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].addRandomAbstract(2,0,5,2,0,[],[3])}} break
                    case 397: if(this.id<this.battle.players){this.battle.cardManagers[this.id].hand.rewind(this.status.main[a])} break
                    case 417: this.metal+=this.status.main[a]; break
                    case 423: this.battle.setTurn(this.battle.turn.total+this.status.main[a]); break
                    case 428: this.status.main[findList('No Damage Turn',this.status.name)]+=this.status.main[a]; break
                    case 435: if(this.id<this.battle.players){this.battle.overlayManager.overlays[46][this.id].active=true;this.battle.overlayManager.overlays[46][this.id].activate([this.status.main[a]])} break
                    case 440: if(this.id<this.battle.players){this.battle.cardManagers[this.id].tempDraw.class[1]+=this.status.main[a]} break
                    case 441: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].addRandomAbstract(2,0,0,2,2,[0],[3,11,1,[[1]]])}} break
                    case 446: for(let b=0,lb=this.status.main[a];b<lb;b++){if(this.battle.cardManagers[this.id].hand.numberAbstract(0,[['Astrology']])<=0){this.battle.cardManagers[this.id].hand.add(findName('Astrology',types.card),0,0)}} break
                    case 450: this.ammo+=this.status.main[a]; break
                    case 452: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].addRandomAbstract(2,0,0,1,0,[],[0,0])}} break
                    case 466: this.status.main[findList('Temporary All Cost Up',this.status.name)]+=this.status.main[a]; break
                    case 468: this.status.main[findList('Buffer',this.status.name)]+=this.status.main[a]; break
                    case 477: this.status.main[findList('Counter Once',this.status.name)]+=this.status.main[a]; break
                    case 487: this.status.main[findList('Play Limit',this.status.name)]+=this.status.main[a]; break
                    case 488: this.wish+=this.status.main[a]; break
                    case 491: this.status.main[findList('Lose Health',this.status.name)]+=this.status.main[a]; break
                    case 493: if(this.id<this.battle.players){this.battle.cardManagers[this.id].hand.exhaustViable(this.status.main[a])}; break
                    case 496: this.vision+=this.status.main[a]; break
                    case 497: this.status.main[findList('Knowledge',this.status.name)]+=this.status.main[a]; break
                    case 498: this.status.main[findList('Knowledge Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 501: if(this.status.main[a]<0){this.battle.loseSpecificEnergy(-this.status.main[a],this.id,6)}else{this.battle.addSpecificEnergy(this.status.main[a],this.id,6)} break
                    case 502: if(this.status.main[a]<0){this.battle.loseSpecificEnergy(-this.status.main[a],this.id,1)}else{this.battle.addSpecificEnergy(this.status.main[a],this.id,1)} break
                    case 503: if(this.status.main[a]<0){this.battle.loseSpecificEnergy(-this.status.main[a],this.id,2)}else{this.battle.addSpecificEnergy(this.status.main[a],this.id,2)} break
                    case 504: if(this.status.main[a]<0){this.battle.loseSpecificEnergy(-this.status.main[a],this.id,3)}else{this.battle.addSpecificEnergy(this.status.main[a],this.id,3)} break
                    case 505: if(this.status.main[a]<0){this.battle.loseSpecificEnergy(-this.status.main[a],this.id,4)}else{this.battle.addSpecificEnergy(this.status.main[a],this.id,4)} break
                    case 506: if(this.status.main[a]<0){this.battle.loseSpecificEnergy(-this.status.main[a],this.id,5)}else{this.battle.addSpecificEnergy(this.status.main[a],this.id,5)} break
                    case 507: if(this.status.main[a]<0){this.battle.loseSpecificEnergy(-this.status.main[a],this.id,0)}else{this.battle.addSpecificEnergy(this.status.main[a],this.id,0)} break
                    case 509: if(this.id<this.battle.players){this.battle.cardManagers[this.id].tempDraw.free+=this.status.main[a]} break
                    case 517: this.status.main[findList('Invisible',this.status.name)]+=this.status.main[a]; break
                    case 518: if(this.status.main[a]<0){this.battle.loseEnergy(-this.status.main[a],this.id,6)}else{this.battle.addSpecificEnergy(this.status.main[a],this.id,-1)} break
                    case 523: this.status.main[findList('(E) Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 524: this.status.main[findList('(W) Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 525: this.status.main[findList('(B) Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 526: this.status.main[findList('(K) Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 527: this.status.main[findList('(G) Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 528: this.status.main[findList('(R) Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 529: this.status.main[findList('(N) Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 530: this.status.main[findList('(E) in 2 Turns',this.status.name)]+=this.status.main[a]; break
                    case 531: this.status.main[findList('(W) in 2 Turns',this.status.name)]+=this.status.main[a]; break
                    case 532: this.status.main[findList('(B) in 2 Turns',this.status.name)]+=this.status.main[a]; break
                    case 533: this.status.main[findList('(K) in 2 Turns',this.status.name)]+=this.status.main[a]; break
                    case 534: this.status.main[findList('(G) in 2 Turns',this.status.name)]+=this.status.main[a]; break
                    case 535: this.status.main[findList('(R) in 2 Turns',this.status.name)]+=this.status.main[a]; break
                    case 536: this.status.main[findList('(N) in 2 Turns',this.status.name)]+=this.status.main[a]; break
                    case 545: this.battle.combatantManager.allEffect(6,[this.status.main[a]]); break
                    case 546: this.status.main[findList('Frail',this.status.name)]+=this.status.main[a]; break
                    case 548: this.status.main[findList('Counter Once',this.status.name)]+=this.status.main[a]; break
                    case 550: this.status.main[findList('Counter Bleed Once',this.status.name)]+=this.status.main[a]; break
                    case 552: this.status.main[findList('Counter Gun Once',this.status.name)]+=this.status.main[a]; break
                    case 555: this.battle.combatantManager.allEffect(48,['Strength',this.status.main[a]]);this.status.next[findList('All Strength Cycle 4 4',this.status.name)]+=this.status.main[a]; break
                    case 556: this.status.main[findList('All Strength Cycle 4 1',this.status.name)]+=this.status.main[a]; break
                    case 557: this.status.main[findList('All Strength Cycle 4 2',this.status.name)]+=this.status.main[a]; break
                    case 558: this.status.main[findList('All Strength Cycle 4 3',this.status.name)]+=this.status.main[a]; break
                    case 561: this.status.main[findList('Protected Invisible',this.status.name)]+=this.status.main[a]; break
                    case 566: if(this.status.main[a]<0){this.battle.loseEnergy(-this.status.main[a],this.id)}else{this.battle.addSpecificEnergy(this.status.main[a],this.id,6)};this.status.next[findList('(E) Cycle 2 2',this.status.name)]+=this.status.main[a]; break
                    case 567: this.status.main[findList('(E) Cycle 2 1',this.status.name)]+=this.status.main[a]; break
                    case 568: if(this.status.main[a]<0){this.battle.loseEnergy(-this.status.main[a],this.id)}else{this.battle.addSpecificEnergy(this.status.main[a],this.id,1)};this.status.next[findList('(W) Cycle 2 2',this.status.name)]+=this.status.main[a]; break
                    case 569: this.status.main[findList('(W) Cycle 2 1',this.status.name)]+=this.status.main[a]; break
                    case 570: if(this.status.main[a]<0){this.battle.loseEnergy(-this.status.main[a],this.id)}else{this.battle.addSpecificEnergy(this.status.main[a],this.id,2)};this.status.next[findList('(B) Cycle 2 2',this.status.name)]+=this.status.main[a]; break
                    case 571: this.status.main[findList('(B) Cycle 2 1',this.status.name)]+=this.status.main[a]; break
                    case 572: if(this.status.main[a]<0){this.battle.loseEnergy(-this.status.main[a],this.id)}else{this.battle.addSpecificEnergy(this.status.main[a],this.id,3)};this.status.next[findList('(K) Cycle 2 2',this.status.name)]+=this.status.main[a]; break
                    case 573: this.status.main[findList('(K) Cycle 2 1',this.status.name)]+=this.status.main[a]; break
                    case 574: if(this.status.main[a]<0){this.battle.loseEnergy(-this.status.main[a],this.id)}else{this.battle.addSpecificEnergy(this.status.main[a],this.id,4)};this.status.next[findList('(G) Cycle 2 2',this.status.name)]+=this.status.main[a]; break
                    case 575: this.status.main[findList('(G) Cycle 2 1',this.status.name)]+=this.status.main[a]; break
                    case 576: if(this.status.main[a]<0){this.battle.loseEnergy(-this.status.main[a],this.id)}else{this.battle.addSpecificEnergy(this.status.main[a],this.id,5)};this.status.next[findList('(R) Cycle 2 2',this.status.name)]+=this.status.main[a]; break
                    case 577: this.status.main[findList('(R) Cycle 2 1',this.status.name)]+=this.status.main[a]; break
                    case 578: if(this.status.main[a]<0){this.battle.loseEnergy(-this.status.main[a],this.id)}else{this.battle.addSpecificEnergy(this.status.main[a],this.id,0)};this.status.next[findList('(N) Cycle 2 2',this.status.name)]+=this.status.main[a]; break
                    case 579: this.status.main[findList('(N) Cycle 2 1',this.status.name)]+=this.status.main[a]; break
                    case 581: if(this.status.main[a]<0){this.battle.loseEnergy(-this.status.main[a],this.id);this.battle.loseEnergyGen(-this.status.main[a],this.id)}else{this.battle.addSpecificEnergy(this.status.main[a],this.id,6);this.battle.addSpecificEnergyGen(this.status.main[a],this.id,6)} break
                    case 582: this.status.main[findList('Base (E) Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 586: if(this.status.main[a]<0){this.battle.loseEnergy(-this.status.main[a],this.id);this.battle.loseEnergyGen(-this.status.main[a],this.id)}else{let roll=floor(random(0,7));this.battle.addSpecificEnergy(this.status.main[a],this.id,roll);this.battle.addSpecificEnergyGen(this.status.main[a],this.id,roll)} break
                    case 592: for(let b=0,lb=this.status.main[a];b<lb;b++){this.holdOrb(5)} break
                    case 596: this.battle.combatantManager.allEffect(48,['Burn',this.status.main[a]]); break
                    case 597: this.battle.combatantManager.allEffect(48,['Freeze',this.status.main[a]]); break
                    case 600: if(this.id<this.battle.players){this.battle.cardManagers[this.id].hand.retain(this.status.main[a])}; break
                    case 612: this.status.main[findList('Counter Push Once',this.status.name)]+=this.status.main[a]; break
                    case 614: this.status.main[findList('Dodge',this.status.name)]+=this.status.main[a];this.status.next[findList('Dodge Cycle 2 2',this.status.name)]+=this.status.main[a]; break
                    case 615: this.status.main[findList('Dodge Cycle 2 1',this.status.name)]+=this.status.main[a]; break
                    case 619: this.status.main[findList('Random Mana Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 627: if(this.id<this.battle.players){this.battle.cardManagers[this.id].tempDraw.exhaustRandom+=this.status.main[a]} break
                    case 630: case 654: if(this.id<this.battle.players){this.battle.cardManagers[this.id].tempDraw.class[11]+=this.status.main[a]} break
                    case 633: if(this.id<this.battle.players){this.battle.cardManagers[this.id].tempDraw.class[3]+=this.status.main[a]} break
                    case 634: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.dropDrawShuffle(this.id,findName('Dark\nMatter',types.card),0,0)}} break
                    case 640: for(let b=0,lb=this.status.main[a];b<lb;b++){this.holdOrb(0)} break
                    case 641: if(this.stance==2){this.addBlock(this.status.main[a])} break
                    case 643: for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].hand.add(findName('Snowflake',types.card),0,0)} break
                    case 653: if(this.id<this.battle.players){this.battle.cardManagers[this.id].hand.exhaust(this.status.main[a])} break
                    case 657: this.status.main[findList('Lose Health Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 661: if(this.charge<=5){this.addBlock(this.status.main[a])} break
                    case 665: this.status.main[findList('Radiation',this.status.name)]+=this.status.main[a]; break
                    case 668: this.enterStance(2); break
                    case 684: if(this.id<this.battle.players){this.battle.cardManagers[this.id].hand.duplicateSelect(this.status.main[a])} break
                    case 690: if(this.status.main[findList('Control',this.status.name)]==0){this.status.main[findList('Control',this.status.name)]+=this.status.main[a]} break
                    case 691: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].addRandomAbstract(2,0,0,2,2,[4],[3,4,1,[[1]]])}} break
                    case 694: if(this.id<this.battle.players){this.battle.cardManagers[this.id].tempDraw.spec.push([25,this.status.main[a]])} break
                    case 695: this.battle.combatantManager.allEffect(48,['Shock',this.status.main[a]]); break
                    case 701: for(let b=0,lb=this.status.main[a];b<lb;b++){this.holdOrb(3)} break
                    case 706: this.status.main[findList('Armor',this.status.name)]+=this.status.main[a]; break
                    case 709: this.status.main[findList('Free Card',this.status.name)]+=this.status.main[a]; break
                    case 710: if(this.id<this.battle.players){this.battle.overlayManager.overlays[8][this.id].active=true;this.battle.overlayManager.overlays[8][this.id].activate()} break
                    case 720: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.drop(this.id,findName('Moriya\nTalisman',types.card),0,0)}} break
                    case 723: this.status.main[findList('Counter Shockwave Once',this.status.name)]+=this.status.main[a]; break
                    case 730: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].reserve.drawEffect(this.battle.cardManagers[this.id].hand.addReturn(findName('Reversal',types.card),0,constants.playerNumber+1))}} break
                    case 731: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].reserve.drawEffect(this.battle.cardManagers[this.id].hand.addReturn(findName('Sharp\nWord',types.card),0,constants.playerNumber+1))}} break
                    case 733: if(this.id<this.battle.players){for(let b=0,lb=this.status.main[a];b<lb;b++){this.battle.cardManagers[this.id].reserve.drawEffect(this.battle.cardManagers[this.id].hand.addReturn(findName('Shining\nMoon',types.card),0,constants.playerNumber+1))}} break
                    case 734: this.status.main[findList('Intangible Next Turn',this.status.name)]+=this.status.main[a]; break
                    case 739: this.status.main[findList('Temporary Card Play Temporary Strength',this.status.name)]+=this.status.main[a]; break
                    case 762: this.status.main[findList('Random Mana in 2 Turns',this.status.name)]+=this.status.main[a]; break
                    case 765: if(this.id<this.battle.players){this.battle.cardManagers[this.id].hand.costDown(this.status.main[a])} break
                    case 766: this.addBounce(this.status.main[a]); break
                    case 771: this.status.main[findList('Energy in 3 Turns',this.status.name)]+=this.status.main[a]; break
                    case 772: this.status.main[findList('Energy in 4 Turns',this.status.name)]+=this.status.main[a]; break
                    case 773: this.status.main[findList('(E) in 3 Turns',this.status.name)]+=this.status.main[a]; break
                    case 774: this.status.main[findList('(E) in 4 Turns',this.status.name)]+=this.status.main[a]; break
                    
                }
                if(this.status.behavior[a]==6&&
                    !(a==306&&this.getStatus('Retain History')>0)&&
                    !(a==663&&this.getStatus('Retain Radiation')>0)
                ){
                    if(this.status.main[a]>0){
                        this.status.main[a]=floor(this.status.main[a]/2)
                    }else if(this.status.main[a]<0){
                        this.status.main[a]=ceil(this.status.main[a]/2)
                    }
                }else if(
                    (this.status.behavior[a]==1||this.status.behavior[a]==3&&this.team<=0||this.status.behavior[a]==4&&this.team>0)
                    &&!(a==3&&this.getStatus('Retain Dodge')>0)
                ){
                    if(this.status.main[a]>0){
                        this.status.main[a]--
                    }else if(this.status.main[a]<0){
                        this.status.main[a]++
                    }
                }else if(this.status.behavior[a]==2){
                    this.status.main[a]=0
                }
                this.statusSignUpdate(a)
            }
        }
        for(let a=0,la=this.status.next.length;a<la;a++){
            if(this.status.next[a]!=0){
                this.statusEffect(this.status.name[a],this.status.next[a])
                this.status.next[a]=0
            }
        }
        this.tickOrbs(-1)
        if(this.status.main[675]>0){
            for(let a=0,la=this.status.main[675];a<la;a++){
                this.tickOrbs(-1)
            }
        }
        if(this.stance>0&&this.id<this.battle.players){
            switch(this.stance){
                case 5:
                    this.stance=0
                break
                case 6:
                    this.battle.loseEnergy(1,this.id)
                break
            }
        }
        if(this.battle.modded(28)&&this.team==0&&floor(random(0,4))==0){
            this.addBlock(20)
        }
        if(this.battle.modded(32)&&this.team==0){
            this.addBlock(3)
        }
        this.fugue=0
        if(this.name=='Eternal Judge'&&this.life>0){
            if(this.sins.includes(0)&&this.turnsAlive%2==0){
                for(let a=0,la=this.battle.cardManagers.length;a<la;a++){
                    this.battle.cardManagers[a].hand.add(findName('Pride',types.card),0,constants.playerNumber+2)
                }
            }
            if(this.sins.includes(2)){
                for(let a=0,la=this.battle.cardManagers.length;a<la;a++){
                    this.battle.cardManagers[a].addRandomAbstract(1,0,0,1,0,[],[constants.playerNumber+1,3])
                }
            }
            if(this.sins.includes(3)){
                for(let a=0,la=this.battle.players;a<la;a++){
                    this.battle.relicManager.clearRelicsSin(a)
                }
            }
            if(this.sins.includes(5)){
                for(let a=0,la=this.battle.players;a<la;a++){
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(a)].statusEffectNext(['Weak','Vulnerable','Frail'][this.turnsAlive%3],3)
                }
            }
            if(this.sins.includes(6)&&this.turnsAlive%2==0){
                let list=[]
                for(let a=constants.playerNumber,la=findName('Managerial',types.combatant);a<la;a++){
                    if(types.combatant[a].life>5&&types.combatant[a].life<=30&&!types.combatant[a].spec.includes(2)&&!types.combatant[a].spec.includes(12)){
                        list.push(a)
                    }
                }
                this.battle.combatantManager.holdSummonCombatant(this.tilePosition,list[floor(random(0,list.length))],this.goal.anim.direction)
            }
            if(this.sins.includes(7)){
                this.statusEffect('Strength',2)
            }
            if(this.sins.includes(9)){
                for(let a=0,la=this.battle.players;a<la;a++){
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(a)].loseHealth(10)
                }
            }
            if(this.sins.includes(10)){
                for(let a=0,la=this.battle.players;a<la;a++){
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(a)].life=0
                }
            }
        }
        this.interiorStatus[1]=0
    }
    tickOrbs(type){
        for(let a=0,la=this.orbs.length;a<la;a++){
            if(this.orbs[a]==type||type==-1){
                this.tickOrb(a)
            }
        }
    }
    tickOrb(a){
        let multi=1
        if(this.status.main[111]>0){
            multi=1+this.status.main[111]*0.1
        }else if(this.status.main[111]<0){
            multi=max(0.2,1+this.status.main[111]*0.1)
        }
        switch(this.orbs[a]){
            case 4:
                this.orbDetail[a]+=3
            break
            case 5:
                if(this.team==0){
                    this.battle.combatantManager.randomPlayerEffect(0,[round((4+this.status.main[593])*multi)])
                }else{
                    this.battle.combatantManager.randomEnemyEffect(0,[round((4+this.status.main[593])*multi)])
                }
            break
            case 14:
                this.statusEffect('Counter All',round(4*multi))
            break
            case 15:
                this.addBlock(round((6+this.status.main[705])*multi))
            break
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
                this.statusSignUpdate(a)
            }
        }
    }
    tickLate(){
        for(let a=0,la=this.status.main.length;a<la;a++){
            if(this.status.main[a]!=0){
                if(this.status.behavior[a]==4){
                    if(this.status.main[a]>0){
                        this.status.main[a]--
                    }else if(this.status.main[a]<0){
                        this.status.main[a]++
                    }
                }
                this.statusSignUpdate(a)
            }
        }
    }
    extraTurn(){
        if(this.status.main[424]>0){
            this.addBlock(this.status.main[424])
        }
    }
    flashColor(color){
        if(this.infoAnim.flash[0]==0&&this.infoAnim.flash[1]==0&&this.infoAnim.flash[2]==0&&this.infoAnim.flash[3]==0){
            return color
        }else{
            return mergeColor(mergeColor(mergeColor(mergeColor(
                color,
                [0,125,255],this.infoAnim.flash[3]),
                [125,255,0],this.infoAnim.flash[2]),
                [150,150,150],this.infoAnim.flash[1]),
                [200,0,0],this.infoAnim.flash[0])
        }
    }
    startAnimation(type){
        switch(this.name){
            case 'Joe': case 'George': case 'Lira': case 'Sakura': case 'Certes': case 'Azis': case 'Setsuna': case 'Airi': case 'Edgar': case 'Chip':
            case 'Shiru': case 'DD-610': case 'Prehextorica': case 'Vincent': case 'Daiyousei': case 'Sanae': case 'Shinmyoumaru': case 'Merlin': case 'Randy':
            case 'Sagume': case '-----': case 'Lanyan':
            case 'Ume':
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
                    case 32: case 33: case 36: case 38: case 39: case 40: case 41: case 42:
                        this.animSet.loop=0
                        this.goal.anim.sword=false
                    break
                    case 4: case 12: case 14: case 15: case 18: case 19: case 20: case 22: case 24: case 25:
                    case 30: case 34: case 37:
                        this.animSet.loop=0
                    break
                    case 5: case 45:
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
                    case 21: case 43:
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
                    case 44:
                        this.animSet.loop=0
                        this.anim.eyeStyle=[2,2]
                    break
                }
            break
            case 'Donakho': case 'Ducopo': case 'Dukelis':
                switch(type){
                    case 0:
                        this.animSet.loop=0
                        this.animSet.flip=floor(random(0,2))
                    break
                    case 1: case 2: case 3: case 4: case 6: case 7: case 10: case 16: case 17: case 19:
                    case 25: case 26: case 29: case 32: case 41:
                        this.animSet.loop=0
                    break
                    case 5:
                        this.animSet.loop=0
                        this.anim.eyeStyle=[2,2]
                    break
                }
            break
            case 'Duck': case 'Fungal Duck': case 'Duckforce': case 'Big Duck': case 'Agent Duck': case 'General Duckion': case 'Blue Duck': case 'Management Autoduck': case 'Fat Duck': case 'Void Duck': case 'Bowler Duck': case 'Ducky Donka': case 'Ducky McDuff': case 'Sick Duck': case 'Zombie Duck': case 'Pistol Duck':
            case 'Slime': case 'Big Slime': case 'Spike Slime': case 'Big Spike Slime': case 'Slimoid': case 'Big Slimoid': case 'Rainbow Slime': case 'Big Rainbow Slime':
            case 'Modicum': case 'Rock Golem': case 'Shield Particle':  case 'Bush Thing': case 'Fireball': case 'Fungling': case 'Bee': case 'Pixie': case 'Darkblot': case 'Lead Brick':  case 'Golden Duck': case 'Puffball': case 'Graphite Block':
                switch(type){
                    case 0:
                        this.animSet.loop=0
                        this.animSet.flip=floor(random(0,2))
                    break
                    case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 10: case 19:
                        this.animSet.loop=0
                    break
                }
            break
            case 'Orb Walker': case 'Spheron': case 'Flame': case 'Hexaghost Orb': case 'Hexaghost Core': case 'Flying Rock': case 'Repulsor': case 'Dead Shell': case 'Louse': case 'Hwurmp': case 'Glimmerrer': case 'Antihwurmp': case 'Host': case 'Host Drone': case 'Thornvine': case 'Keystone': case 'Spirit of Wealth': case 'Spirit of Elegance': case 'Half Spikeball':
            case 'Projector': case 'Readout': case 'Strengthener': case 'Gun Rack': case 'Metal Box': case 'Upgrader': case 'Transformer': case 'Doubler': case 'Exhauster':
                this.animSet.loop=0
            break
            case 'Bronze Orb C': case 'Bronze Orb A': case 'Sentry': case 'Management Drone': case 'Personnel Carrier':
            case 'Wall': case 'Spike Pillar': case 'Turret': case 'Explosive Turret': case 'Multiturret': case 'Repulse Turret': case 'Machine Gun': case 'Barbed Pillar': case 'Miniturret': case 'Teleporter Start': case 'Teleporter End': case 'Antizone': case 'Mirror Shield': case 'Armored Turret': case 'Shotgun': case 'Exploding Wall': case 'Swarm Turret':
                switch(type){
                    case 19:
                        this.animSet.loop=0
                    break
                }
            break
            default:
                switch(type){
                    case 0: case 2: case 4: case 6:
                        this.animSet.loop=0
                        this.animSet.flip=floor(random(0,2))
                        if((this.name=='Goon'||this.name=='Slaver'||this.name=='Pointy'||this.name=='Romeo'||this.name=='Batter'||this.name=='Swordmaster'||this.name=='Champion'||this.name=='Purge X02'||this.name=='Vengeful'||this.name=='Lunaria'||this.name=='Divine Guard'||this.name=='Avant Guard'||this.name=='Dimension Wanderer'||this.name=='Daughter of Heaven'||this.name=='Pure Swordsman'||this.name=='Old Konaian')&&(type==2||type==6)){
                            this.animSet.loop=0
                            this.goal.anim.sword=true
                        }
                    break
                    case 1: case 3: case 5: case 7: case 8: case 9: case 10: case 11: case 12: case 13:
                    case 14: case 19:
                        this.animSet.loop=0
                    break
                }
            break
        }
    }
    runAnimation(rate,type){
        switch(this.name){
            case 'Joe': case 'George': case 'Lira': case 'Sakura': case 'Certes': case 'Azis': case 'Setsuna': case 'Airi': case 'Edgar': case 'Chip':
            case 'Shiru': case 'DD-610': case 'Prehextorica': case 'Vincent': case 'Daiyousei': case 'Sanae': case 'Shinmyoumaru': case 'Merlin': case 'Randy':
            case 'Sagume': case '-----': case 'Lanyan':
            case 'Ume':
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
                        if(this.name=='Lira'||this.name=='Sakura'||this.name=='Setsuna'||this.name=='Shinmyoumaru'||this.name=='Ume'){
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
                            if(this.name!='Shinmyoumaru'){
                                this.fades.kimono.decoration.position.x=1+abs(lsin(this.animSet.loop*180))*0.1
                                this.fades.kimono.decoration.position.y=1-abs(lsin(this.animSet.loop*180))*0.05
                            }
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
                        this.anim.arms[this.animSet.hand].top=24+lsin(this.animSet.loop*180)*36
                        this.anim.arms[this.animSet.hand].bottom=9+lsin(this.animSet.loop*180)*96
                        this.spin.arms[this.animSet.hand].top=(93-lsin(this.animSet.loop*180)*63)*(this.animSet.hand*2-1)
                        this.spin.arms[this.animSet.hand].bottom=(75-lsin(this.animSet.loop*180)*90)*(this.animSet.hand*2-1)
                        if(this.name=='Lira'||this.name=='Sakura'||this.name=='Setsuna'||this.name=='Sanae'||this.name=='Shinmyoumaru'||this.name=='Ume'){
                            this.spin.sword=75+lsin(this.animSet.loop*180)*45
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
                        this.spin.arms[1-this.animSet.hand].top=(93-lsin(this.animSet.loop*90)*48)*(1-this.animSet.hand*2)
                        this.spin.arms[1-this.animSet.hand].bottom=(75-lsin(this.animSet.loop*90)*60)*(1-this.animSet.hand*2)
                    break
                    case 19:
                        this.animSet.loop+=rate
                        this.size=this.base.size*(1-lsin(this.animSet.loop*180))
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
                        if(this.name!='Sakura'){
                            for(let g=0;g<2;g++){
                                this.anim.eye[g]=lsin(this.animSet.loop*180)
                            }
                        }
                        this.spin.sword=75+lsin(this.animSet.loop*180)*45
                        if(this.name=='Sakura'){
                            this.anim.mouth.y=5+lsin(this.animSet.loop*180)
                            this.anim.eye[0]=lsin(this.animSet.loop*180)
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
                            if(this.name!='Sakura'){
                                this.anim.eye[g]=lsin(this.animSet.loop*180)
                            }
                        }
                        if(this.name=='Sakura'){
                            this.anim.eye[0]=lsin(this.animSet.loop*180)
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
                        this.spin.arms[0].top=-93+sqrt(abs(sin(this.animSet.loop*180)))*78
                        this.spin.arms[0].bottom=-75+sqrt(abs(sin(this.animSet.loop*180)))*75
                    break
                    case 39:
                        this.animSet.loop+=rate
                        this.anim.arms[0].top=24+abs(lsin((this.animSet.loop+this.animSet.flip)*180))*60
                        this.anim.arms[0].bottom=9+abs(lsin((this.animSet.loop+this.animSet.flip)*180))*93
                        this.spin.arms[0].top=(93-abs(lsin((this.animSet.loop+this.animSet.flip)*180))*57)*-1
                        this.spin.arms[0].bottom=(75-abs(lsin((this.animSet.loop+this.animSet.flip)*180))*60)*-1
                    break
                    case 40:
                        this.animSet.loop+=rate
                        this.anim.arms[1].top=24+abs(lsin((this.animSet.loop+this.animSet.flip+1)*180))*60
                        this.anim.arms[1].bottom=9+abs(lsin((this.animSet.loop+this.animSet.flip+1)*180))*93
                        this.spin.arms[1].top=(93-abs(lsin((this.animSet.loop+this.animSet.flip+1)*180))*57)
                        this.spin.arms[1].bottom=(75-abs(lsin((this.animSet.loop+this.animSet.flip1g)*180))*60)
                    break
                    case 41:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.anim.arms[g].top=24+abs(lsin(this.animSet.loop*180))*81
                            this.anim.arms[g].bottom=9+abs(lsin(this.animSet.loop*180))*126
                            this.spin.arms[g].top=(93-abs(lsin(this.animSet.loop*180))*12)*(g*2-1)
                            this.spin.arms[g].bottom=(75-abs(lsin(this.animSet.loop*180))*9)*(g*2-1)
                        }
                    break
                    case 42:
                        this.animSet.loop+=rate
                        this.anim.arms[0].top=24+lsin(this.animSet.loop*90)*48
                        this.anim.arms[0].bottom=9+lsin(this.animSet.loop*90)*84
                        this.spin.arms[0].top=-93+lsin(this.animSet.loop*90)*48
                        this.spin.arms[0].bottom=-75+lsin(this.animSet.loop*90)*60
                    break
                    case 43:
                        this.animSet.loop+=rate
                        this.anim.arms[this.animSet.hand].top=24+lsin(this.animSet.loop*90)*18
                        this.anim.arms[this.animSet.hand].bottom=9+lsin(this.animSet.loop*90)*75
                        this.spin.arms[this.animSet.hand].bottom=(75+lsin(this.animSet.loop*90)*30)*(this.animSet.hand*2-1)
                        if(this.name!='Sakura'){
                            for(let g=0;g<2;g++){
                                this.anim.eye[g]=lsin(this.animSet.loop*90)
                            }
                        }else{
                            this.anim.mouth.y=5+lsin(this.animSet.loop*90)
                            this.anim.eye[0]=lsin(this.animSet.loop*90)
                        }
                    break
                    case 44: case 45:
                        this.animSet.loop+=rate
                        this.anim.eye[0]=lsin(this.animSet.loop*180)
                    break
                }
            break
            case 'Donakho': case 'Ducopo': case 'Dukelis':
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
                    case 3:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.spin.arms[g].top=(90-abs(lsin(this.animSet.loop*180)*30))*(g*2-1)
                            this.anim.arms[g].top=54+abs(lsin(this.animSet.loop*180))*24
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
                    case 10:
                        this.animSet.loop+=rate
                        this.goal.anim.direction+=rate*360
                        this.anim.direction+=rate*360
                        this.spin.sword=75+lsin(this.animSet.loop*90)*15
                        this.anim.arms[1-this.animSet.hand].top=54+abs(lsin(this.animSet.loop*90))*15
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
                    case 29:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.spin.arms[g].top=(90-abs(lsin(this.animSet.loop*180)*63))*(g*2-1)
                            this.anim.arms[g].top=54-abs(lsin(this.animSet.loop*180))*12
                        }
                    break
                    case 32:
                        this.animSet.loop+=rate
                        this.offset.position.y=lsin(this.animSet.loop*180)*-10
                    break
                    case 41:
                        this.animSet.loop+=rate
                        this.offset.position.y=lsin(this.animSet.loop*180)*-10
                        for(let g=0;g<2;g++){
                            this.anim.arms[g].top=54+abs(lsin(this.animSet.loop*180))*60
                        }
                    break
                }
            break
            case 'Duck': case 'Fungal Duck': case 'Duckforce': case 'Big Duck': case 'Agent Duck': case 'General Duckion': case 'Blue Duck': case 'Management Autoduck': case 'Fat Duck': case 'Void Duck': case 'Golden Duck': case 'Bowler Duck': case 'Ducky Donka': case 'Ducky McDuff': case 'Sick Duck': case 'Zombie Duck': case 'Pistol Duck':
                switch(type){
                    case 0:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.spin.legs[g].top=(-90+lsin((this.animSet.loop+this.animSet.flip)*180)*75)*(g*2-1)
                            this.spin.arms[g].top=(-90+lsin((this.animSet.loop+this.animSet.flip)*180)*60)*(g*2-1)
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
                            this.spin.arms[g].top=(-90+abs(lsin(this.animSet.loop*540)*75))*(g*2-1)
                            this.anim.arms[g].top=54+abs(lsin(this.animSet.loop*540))*30
                        }
                    break
                    case 3:
                        this.animSet.loop+=rate
                        this.offset.position.y=lsin(this.animSet.loop*180)*-10
                    break
                    case 4:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.spin.arms[g].top=(90-abs(lsin(this.animSet.loop*180)*63))*(g*2-1)
                            this.anim.arms[g].top=54-abs(lsin(this.animSet.loop*180))*12
                        }
                    break
                    case 5:
                        this.animSet.loop+=rate
                        this.anim.arms[0].top=54+lsin(this.animSet.loop*90)*36
                        this.spin.arms[0].top=90-lsin(this.animSet.loop*90)*54
                    break
                    case 7:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.spin.arms[g].top+=rate*180
                        }
                    break
                    case 10: case 19:
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
                    case 19:
                        this.animSet.loop+=rate
                        this.size=this.base.size*(1-lsin(this.animSet.loop*180))
                    break
                }
            break
            case 'Slime': case 'Big Slime': case 'Spike Slime': case 'Big Spike Slime': case 'Slime Boss': case 'Slimoid': case 'Big Slimoid': case 'Rainbow Slime': case 'Big Rainbow Slime':
            case 'Modicum': case 'Rock Golem': case 'Shield Particle':  case 'Bush Thing': case 'Fireball': case 'Fungling': case 'Bee': case 'Pixie': case 'Darkblot': case 'Lead Brick': case 'Puffball': case 'Graphite Block':
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
                    case 19:
                        this.animSet.loop+=rate
                        this.size=this.base.size*(1-lsin(this.animSet.loop*180))
                    break
                }
            break
            case 'Spheron': case 'Louse': case 'Spirit of Wealth': case 'Spirit of Elegance':
                switch(type){
                    case 2:
                        this.animSet.loop+=rate
                        this.offset.position.x=abs(lsin(this.animSet.loop*180))*lsin(this.anim.direction)*60
                        this.offset.position.y=abs(lsin(this.animSet.loop*180))*lcos(this.anim.direction)*30
                    break
                    case 19:
                        this.animSet.loop+=rate
                        this.size=this.base.size*(1-lsin(this.animSet.loop*180))
                    break
                }
            break
            case 'Flame': case 'Hexaghost Orb': case 'Hexaghost Core': case 'Thornvine':
                switch(type){
                    case 19:
                        this.animSet.loop+=rate
                        this.size=this.base.size*(1-lsin(this.animSet.loop*180))
                    break
                    default:
                        this.animSet.loop+=rate
                        this.anim.glow=1+abs(lsin(this.animSet.loop*180))*0.5
                    break
                }
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
                    case 19:
                        this.animSet.loop+=rate
                        this.size=this.base.size*(1-lsin(this.animSet.loop*180))
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
                    case 19:
                        this.animSet.loop+=rate
                        this.size=this.base.size*(1-lsin(this.animSet.loop*180))
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
                    case 19:
                        this.animSet.loop+=rate
                        this.size=this.base.size*(1-lsin(this.animSet.loop*180))
                    break
                }
            break
            case 'Hwurmp':
                switch(type){
                    case 9:
                        this.animSet.loop+=rate
                        this.anim.body=1+lsin(this.animSet.loop*180)
                    break
                    case 19:
                        this.animSet.loop+=rate
                        this.size=this.base.size*(1-lsin(this.animSet.loop*180))
                    break
                }
            break
            case 'Antihwurmp':
                switch(type){
                    case 9:
                        this.animSet.loop+=rate
                        this.anim.body=2-lsin(this.animSet.loop*180)
                    break
                    case 19:
                        this.animSet.loop+=rate
                        this.size=this.base.size*(1-lsin(this.animSet.loop*180))
                    break
                }
            break
            case 'Glimmerrer':
                switch(type){
                    case 9:
                        this.animSet.loop+=rate
                        this.offset.position.y=lsin(this.animSet.loop*180)*-20
                    break
                    case 19:
                        this.animSet.loop+=rate
                        this.size=this.base.size*(1-lsin(this.animSet.loop*180))
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
                    case 19:
                        this.animSet.loop+=rate
                        this.size=this.base.size*(1-lsin(this.animSet.loop*180))
                    break
                }
            break
            case 'Projector': case 'Readout': case 'Strengthener': case 'Gun Rack': case 'Metal Box': case 'Upgrader': case 'Transformer': case 'Doubler': case 'Exhauster':
                switch(type){
                    case 19:
                        this.animSet.loop+=rate
                        this.size=this.base.size*(1-lsin(this.animSet.loop*180))
                    break
                    default:
                        this.animSet.loop+=rate
                        this.anim.light=lsin(this.animSet.loop*180)+1
                    break
                }
            break
            case 'Keystone':
                switch(type){
                    case 19:
                        this.animSet.loop+=rate
                        this.size=this.base.size*(1-lsin(this.animSet.loop*180))
                    break
                    default:
                        this.animSet.loop+=rate
                        this.anim.spin+=rate*20
                    break
                }
            break
            case 'Bronze Orb C': case 'Bronze Orb A': case 'Sentry': case 'Management Drone': case 'Personnel Carrier':
            case 'Wall': case 'Spike Pillar': case 'Turret': case 'Readout': case 'Explosive Turret': case 'Multiturret': case 'Barbed Pillar': case 'Repulse Turret': case 'Machine Gun': case 'Miniturret': case 'Teleporter Start': case 'Teleporter End': case 'Antizone': case 'Mirror Shield': case 'Armored Turret': case 'Shotgun': case 'Exploding Wall': case 'Swarm Turret':
                switch(type){
                    case 19:
                        this.animSet.loop+=rate
                        this.size=this.base.size*(1-lsin(this.animSet.loop*180))
                    break
                }
            break
            case 'Half Spikeball':
                this.animSet.loop+=rate
                this.anim.body[type-4]=1+abs(lsin(this.animSet.loop*360))*0.5
            break
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
                        if(this.name=='Goon'||this.name=='Slaver'||this.name=='Pointy'||this.name=='Romeo'||this.name=='Batter'||this.name=='Swordmaster'||this.name=='Champion'||this.name=='Purge X02'||this.name=='Vengeful'||this.name=='Lunaria'||this.name=='Divine Guard'||this.name=='Avant Guard'||this.name=='Dimension Wanderer'||this.name=='Daughter of Heaven'||this.name=='Pure Swordsman'||this.name=='Old Konaian'){
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
                    case 19:
                        this.animSet.loop+=rate
                        this.size=this.base.size*(1-lsin(this.animSet.loop*180))
                    break
                }
            break
            
        }
    }
    displayInfoInternal(scene){
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
            this.layer.ellipse(
                -28-(5.5*this.infoAnim.blockSize+5.5*this.infoAnim.barrierSize)*this.infoAnim.barrierPush-(5.5*this.infoAnim.blockSize+5.5*this.infoAnim.bounceSize)*this.infoAnim.bouncePush,0,
                11.5*this.infoAnim.blockSize,11.5*this.infoAnim.blockSize
            )
            this.layer.fill(150,175,200,this.fade*this.infoAnim.block)
            this.layer.ellipse(
                -28-(5.5*this.infoAnim.blockSize+5.5*this.infoAnim.barrierSize)*this.infoAnim.barrierPush-(5.5*this.infoAnim.blockSize+5.5*this.infoAnim.bounceSize)*this.infoAnim.bouncePush,0,
                11.5*this.infoAnim.blockSize-1.5,11.5*this.infoAnim.blockSize-1.5
            )
        }
        if(this.infoAnim.barrier>0){
            this.layer.fill(0,this.fade*this.infoAnim.barrier)
            this.layer.ellipse(
                -28-(5.5*this.infoAnim.barrierSize+5.5*this.infoAnim.bounceSize)*this.infoAnim.bouncePush,0,
                11.5*this.infoAnim.barrierSize,11.5*this.infoAnim.barrierSize
            )
            this.layer.fill(225,225,200,this.fade*this.infoAnim.barrier)
            this.layer.ellipse(
                -28-(5.5*this.infoAnim.barrierSize+5.5*this.infoAnim.bounceSize)*this.infoAnim.bouncePush,0,
                11.5*this.infoAnim.barrierSize-1.5,11.5*this.infoAnim.barrierSize-1.5
            )
        }
        if(this.infoAnim.bounce>0){
            this.layer.fill(0,this.fade*this.infoAnim.bounce)
            this.layer.ellipse(
                -28,0,
                11.5*this.infoAnim.bounceSize,11.5*this.infoAnim.bounceSize
            )
            this.layer.fill(175,225,175,this.fade*this.infoAnim.bounce)
            this.layer.ellipse(
                -28,0,
                11.5*this.infoAnim.bounceSize-1.5,11.5*this.infoAnim.bounceSize-1.5
            )
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
            this.layer.text(max(0,vceil(this.life*10)/10),0,0.5)
        }else{
            this.layer.text(max(0,vceil(this.life*10)/10)+'/'+max(0,vceil(this.base.life*10)/10),0,0.5)
        }
        if(this.infoAnim.block>0){
            this.layer.fill(0,this.fade*this.infoAnim.block)
            this.layer.text(vceil(this.block*10)/10,-28-(5.5*this.infoAnim.blockSize+5.5*this.infoAnim.barrierSize)*this.infoAnim.barrierPush-(5.5*this.infoAnim.blockSize+5.5*this.infoAnim.bounceSize)*this.infoAnim.bouncePush,0.5)
        }
        if(this.infoAnim.barrier>0){
            this.layer.fill(0,this.fade*this.infoAnim.barrier)
            this.layer.text(vceil(this.barrier*10)/10,-28-(5.5*this.infoAnim.barrierSize+5.5*this.infoAnim.bounceSize)*this.infoAnim.bouncePush,0.5)
        }
        if(this.infoAnim.bounce>0){
            this.layer.fill(0,this.fade*this.infoAnim.bounce)
            this.layer.text(vceil(this.bounce*10)/10,-28,0.5)
        }
        this.layer.fill(0,this.fade*this.infoAnim.life)
        if(this.team==0){
            this.layer.text(this.order,28,0.5)
        }
        this.layer.fill(255,this.fade*this.infoAnim.life)
        this.layer.stroke(0,this.fade*this.infoAnim.life)
        this.layer.strokeWeight(1)
        for(let a=0,la=this.status.display.length;a<la;a++){
            if(this.status.size[this.status.display[a]]>0){
                this.layer.textSize((this.status.main[this.status.display[a]]>=100?6:8)*this.status.size[this.status.display[a]])
                this.layer.text(this.status.main[this.status.display[a]],this.status.position[this.status.display[a]],12)
            }
        }
        if(this.name=='Sakura'&&!this.graphic&&this.team>0&&this.infoAnim.balance>0&&scene=='battle'){
            this.layer.noStroke()
            for(let a=0,la=10;a<la;a++){
                this.layer.fill(255,200*a/la,200*a/la,this.fade*this.infoAnim.balance)
                if(a==0){
                    this.layer.rect(-17+a*4,-8.5,2,6)
                    this.layer.rect(-18+a*4,-8.5,4,6,2)
                }else if(a==9){
                    this.layer.rect(-19+a*4,-8.5,2,6)
                    this.layer.rect(-18+a*4,-8.5,4,6,2)
                }else{
                    this.layer.rect(-18+a*4,-8.5,4,6)
                }
            }
            this.layer.stroke(0,this.fade*this.infoAnim.balance)
            this.layer.strokeWeight(1)
            this.layer.noFill()
            this.layer.rect(0,-8.5,40,6,3)
            this.layer.stroke(255,this.fade*this.infoAnim.balance)
            this.layer.line(-19+38/this.balanceCap*constrain(this.balance,0,this.balanceCap),-12,-19+38/this.balanceCap*constrain(this.balance,0,this.balanceCap),-5)
            this.layer.fill(0,this.fade*this.infoAnim.balance)
            this.layer.noStroke()
            this.layer.textSize(5)
            this.layer.text(this.balance,0,-8.25)
        }
        if(this.name=='Donakho'&&!this.graphic&&this.team>0&&this.team>0&&scene=='battle'){
            this.layer.fill(140,120,160,this.fade)
            this.layer.stroke(120,100,140,this.fade)
            this.layer.strokeWeight(2)
            regPoly(this.layer,0,-12,8,7,7,0)
            this.layer.noStroke()
            this.layer.fill(50,40,60,this.fade)
            this.layer.textSize(12)
            this.layer.text(this.metal,0,-11.5)
        }
        if(this.name=='Edgar'&&!this.graphic&&this.team>0&&this.team>0&&scene=='battle'){
            this.layer.noStroke()
            this.layer.fill(60,75,90,this.fade)
            this.layer.rect(-2,-12,12,12)
            this.layer.arc(4,-12,12,12,-90,90)
            this.layer.fill(80,100,120,this.fade)
            this.layer.rect(-1,-12,10,8)
            this.layer.arc(4,-12,8,8,-90,90)
            this.layer.fill(20,25,30,this.fade)
            this.layer.textSize(12)
            this.layer.text(this.ammo,0,-12)
        }
        if(this.name=='Daiyousei'&&!this.graphic&&this.team>0&&this.team>0&&scene=='battle'){
            this.layer.noFill()
            this.layer.stroke(150,255,100,this.fade)
            this.layer.strokeWeight(1)
            this.layer.translate(0,-10-this.infoAnim.balance*6)
            this.layer.bezier(-5,0,-3,-3.5,3,-3.5,5,0)
            this.layer.bezier(-5,0,-3,3.5,3,3.5,5,0)
            this.layer.translate(0,10+this.infoAnim.balance*6)
            this.layer.fill(225,255,200,this.fade)
            this.layer.stroke(0,this.fade)
            this.layer.strokeWeight(1)
            this.layer.textSize(8)
            this.layer.text(this.vision,0,-9.25-this.infoAnim.balance*6)
        }
        if(this.name=='Shinmyoumaru'&&!this.graphic&&this.team>0&&this.team>0&&scene=='battle'){
            this.layer.translate(0,-14)
            this.layer.fill(255,100,150,this.fade)
            this.layer.stroke(255,125,175,this.fade)
            this.layer.strokeWeight(1.2)
            this.layer.strokeJoin(ROUND)
            regStarGear(this.layer,0,0,6,2,5.6,5.6,7.2,7.2,30)  
            this.layer.strokeJoin(MITER)
            this.layer.noStroke()
            this.layer.fill(255,150,200,this.fade)
            this.layer.ellipse(0,0,4.8)
            for(let a=0,la=3;a<la;a++){
                this.layer.quad(-1.2,-3.4,1.2,-3.4,0.4,-4.8,-0.4,-4.8)
                this.layer.rotate(120)
            }
            this.layer.translate(0,14)
            this.layer.fill(15,5,10,this.fade)
            this.layer.textSize(12)
            this.layer.text(this.wish,0,-14)
        }
    }
    displayInfo(scene){
        switch(scene){
            case 'battle':
                if(this.fade>0&&this.infoAnim.size>0){
                    this.layer.push()
                    this.layer.translate(this.position.x+this.offset.life.x,this.position.y+this.offset.life.y)
                    this.layer.scale(this.infoAnim.size)
                    this.displayInfoInternal(scene)
                    this.layer.pop()
                }
            break
            case 'overlay':
                if(this.fade>0&&this.infoAnim.description>0){
                    this.battle.encounter.tooltip++
                    if(this.team>0&&!this.construct&&!this.support){
                        this.layer.fill(mergeColor(types.color.card[this.type].fill,[150,150,150],0.5)[0],mergeColor(types.color.card[this.type].fill,[150,150,150],0.5)[1],mergeColor(types.color.card[this.type].fill,[150,150,150],0.5)[2],this.fade*this.infoAnim.description)
                    }else{
                        this.layer.fill(150,this.fade*this.infoAnim.description)
                    }
                    this.layer.noStroke()
                    this.layer.rect(100,300,160,240,10)
                    if(this.name=='Eternal Judge'){
                        this.layer.rect(280,300,160,240,10)
                    }
                    this.layer.fill(0,this.fade*this.infoAnim.description)
                    this.layer.textSize(this.name.length>=25?10:this.name.length>=20?12:16)
                    this.layer.text(this.name,100,200)
                    if(this.name=='Eternal Judge'){
                        this.layer.text('Effects',280,200)
                    }
                    this.layer.textSize(8)
                    this.layer.text(this.description,100,240)
                    this.layer.textSize(6)
                    this.layer.textAlign(LEFT,CENTER)
                    if(this.team==0||this.construct||this.support){
                        for(let a=0,la=min(6,this.status.display.length);a<la;a++){
                            this.layer.text(this.status.name[this.status.display[a]],60,315+a*20+this.spec.length*10)
                        }
                    }else{
                        for(let a=0,la=min(6,this.status.display.length);a<la;a++){
                            this.layer.text(this.status.name[this.status.display[a]],60,275+a*20)
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
                                case 0: this.layer.text('Will Turn to Face Player',40,305+a*10); break
                                case 1: this.layer.text('Moves When You Move',40,305+a*10); break
                                case 2: this.layer.text('Boss',40,305+a*10); break
                                case 3: this.layer.text('Immune to Spikes and Mines',40,305+a*10); break
                                case 4: this.layer.text('Immune to Traps',40,305+a*10); break
                                case 5: this.layer.text('Slimes Tiles Moved On',40,305+a*10); break
                                case 6: this.layer.text('Spawns Slimes Every 20 HP Lost',40,305+a*10); break
                                case 7: this.layer.text('Auto-Attacks Line of Sight',40,305+a*10); break
                                case 8: this.layer.text('Attacks When You Play a Card',40,305+a*10); break
                                case 9: this.layer.text('Untargettable From Front',40,305+a*10); break
                                case 10: this.layer.text('Attacks When Injured',40,305+a*10); break
                                case 11: this.layer.text('Immune to Poison Tiles',40,305+a*10); break
                                case 12: this.layer.text('Co-Boss',40,305+a*10); break
                                case 13: this.layer.text('On Survival, Heal 10 HP',40,305+a*10); break
                                case 14: this.layer.text('On Survival, Deluxe Upgrade a Card',40,305+a*10); break
                                case 15: this.layer.text('On Survival, Move Freely',40,305+a*10); break
                                case 16: this.layer.text('On Survival, Gain 25 Currency\nIf Killed by Player, Gain 5 Currency',40,305+a*10); break
                                case 17: this.layer.text('Auto-Aims',40,305+a*10); break
                                case 18: this.layer.text('On Defeat, Gain a Relic',40,305+a*10); break
                                case 19: this.layer.text('Robot',40,305+a*10); break
                                case 20: this.layer.text('Attacks When You Play the First Card Each Turn',40,305+a*10); break
                                case 21: this.layer.text('On Survival, Heal 15 HP\nand Gain 250 Currency',40,305+a*10); break
                                case 22: this.layer.text('On Survival, Gain 100 Currency',40,305+a*10); break

                            }
                        }
                    }
                    if(this.name=='Eternal Judge'){
                        this.layer.fill(0,this.fade*this.infoAnim.description)
                        for(let a=0,la=this.sins.length;a<la;a++){
                            switch(this.sins[a]){
                                case 0: this.layer.text('Pride - Add a Pride to Hand Every 2 Turns',210,225+a*15); break
                                case 1: this.layer.text('Wrath - All Attacks Are Doubled',210,225+a*15); break
                                case 2: this.layer.text('Gluttony - Adds a Random Status\nCard to Draw Each Turn',210,225+a*15); break
                                case 3: this.layer.text('Greed - Remove All Non-Boss Relics',210,225+a*15); break
                                case 4: this.layer.text('Envy - Take 1 Damage Per Card Played',210,225+a*15); break
                                case 5: this.layer.text('Sloth - Each Turn, Applies 3 Weak, Vulnerable, or Frail',210,225+a*15); break
                                case 6: this.layer.text('Lust - Spawns a Random Enemy Every 2 Turns',210,225+a*15); break
                                case 7: this.layer.text('War - Gains 2 Strength Per Turn',210,225+a*15); break
                                case 8: this.layer.text('Famine - Can Only Play 5 Cards Per Turn',210,225+a*15); break
                                case 9: this.layer.text('Pestilence - Lose 10 Health Each Turn',210,225+a*15); break
                                case 10: this.layer.text('Death - You Die',210,225+a*15); break

                            }
                        }
                    }
                    this.layer.textAlign(CENTER,CENTER)
                    if(this.team==0||this.construct||this.support){
                        for(let a=0,la=min(6,this.status.display.length);a<la;a++){
                            displayStatusSymbol(this.layer,40,315+a*20+this.spec.length*10,this.status.display[a],0,this.status.size[this.status.display[a]]*1.5,this.fade*this.infoAnim.description*this.infoAnim.life)
                        }
                    }else{
                        for(let a=0,la=min(6,this.status.display.length);a<la;a++){
                            displayStatusSymbol(this.layer,40,275+a*20,this.status.display[a],0,this.status.size[this.status.display[a]]*1.5,this.fade*this.infoAnim.description*this.infoAnim.life)
                        }
                    }
                    this.layer.fill(255,this.fade*this.infoAnim.description)
                    this.layer.stroke(0,this.fade*this.infoAnim.description)
                    this.layer.strokeWeight(1.5)
                    this.layer.textSize(12)
                    if(this.team==0||this.construct||this.support){
                        for(let a=0,la=min(6,this.status.display.length);a<la;a++){
                            this.layer.text(this.status.main[this.status.display[a]],40,315+a*20+this.spec.length*10)
                        }
                    }else{
                        for(let a=0,la=min(6,this.status.display.length);a<la;a++){
                            this.layer.text(this.status.main[this.status.display[a]],40,275+a*20)
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
            case 'map':
                this.layer.push()
                this.layer.translate(125+this.id*650,16)
                this.layer.scale(1.5)
                this.displayInfoInternal(scene)
                this.layer.pop()
            break
            case 'rest':
                this.layer.push()
                this.layer.translate(350-this.id*100,495)
                this.layer.scale(1.5)
                this.displayInfoInternal(scene)
                this.layer.pop()
            break
            case 'event':
                this.layer.push()
                this.layer.translate(100+this.id*700,510)
                this.layer.scale(1.5)
                this.displayInfoInternal(scene)
                this.layer.pop()
            break
            case 'food':
                this.layer.push()
                this.layer.translate(450,300)
                this.layer.scale(1.5)
                this.fade=1
                this.infoAnim.life=1
                this.displayInfoInternal(scene)
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
            this.fade=smoothAnim(this.fade,this.status.main[51]<=0&&this.status.main[374]<=0,0,1,15)
            for(let a=0,la=this.infoAnim.stance.length;a<la;a++){
                this.infoAnim.stance[a]=smoothAnim(this.infoAnim.stance[a],a==this.stance&&this.life>0,0,1,5)
            }
            for(let a=0,la=this.infoAnim.faith.length;a<la;a++){
                this.infoAnim.faith[a]=smoothAnim(this.infoAnim.faith[a],this.faith>a,0,1,5)
            }
            this.infoAnim.elemental=smoothAnim(this.infoAnim.elemental,this.elemental,0,1,5)
            for(let a=0,la=this.infoAnim.inspiration.length;a<la;a++){
                this.infoAnim.inspiration[a]=smoothAnim(this.infoAnim.inspiration[a],this.inspiration>a,0,1,5)
            }
            this.infoAnim.fugue=smoothAnim(this.infoAnim.fugue,this.fugue>0,0,1,5)
            if(this.faith>=12&&this.infoAnim.faith[9]>=1){
                this.faith-=12
                this.enterStance(5)
            }
            if(this.vision>=12){
                this.vision-=12
                this.statusEffect('Awakening',1)
                if(!this.elemental){
                    this.statusEffect('Strength',1)
                }
                this.elemental=true
                if(this.status.main[436]>0){
                    this.addBlock(this.status.main[436])
                }
                if(this.status.main[659]>0&&this.id>=0&&this.id<this.battle.players){
                    this.battle.cardManagers[this.id].draw(this.status.main[659])
                }
            }
            if(this.inspiration>=5){
                this.inspiration-=5
                this.fugue+=5
                this.battle.cardManagers[this.id].discard.allEffectArgs(44,[6989])
                this.battle.cardManagers[this.id].reserve.allEffectArgs(44,[6989])
                if(this.status.main[753]>0){
                    this.statusEffect('Strength',this.status.main[753])
                }
            }
            if(this.life<=0){
                this.battle.itemManager.activateDeath(this.id)
                if(this.life<=0){
                    if(!this.dead){
                        if(this.battle.relicManager.hasRelic(81,this.id)){
                            this.battle.relicManager.loseRelic(81,this.id)
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
            this.fade=smoothAnim(this.fade,this.life>0&&this.status.main[51]<=0&&this.status.main[374]<=0,0,1,15)
            this.infoAnim.life=smoothAnim(this.infoAnim.life,this.life>0,0,1,5)
            if(this.life<=0&&!this.dead&&this.team>0){
                this.dead=true
                this.battle.tileManager.activate()
                this.battle.updateTargetting()
                if(this.status.main[80]>0){
                    this.battle.combatantManager.areaAbstract(0,[this.base.life*this.status.main[80],this.id,0],this.tilePosition,[3,this.id],[0,1],false,0)
                }
                if(this.status.main[199]>0){
                    this.battle.combatantManager.areaAbstract(0,[this.status.main[199],this.id,0],this.tilePosition,[3,this.id],[0,1],false,0)
                    this.battle.particleManager.particles.push(new particle(this.layer,this.position.x,this.position.y,10,[30]))
                }
                if(this.team<=this.battle.players){
                    if(!this.programmedDeath&&options.oldUnbuild){
                        this.battle.cardManagers[this.team-1].deAbstract(2,1,['Unbuild'])
                    }
                    if(!options.oldUnbuild&&!this.battle.combatantManager.constructAlive(this.team)){
                        this.battle.cardManagers[this.team-1].deAbstract(2,1,['Unbuild'])
                    }
                    if(this.name=='Teleporter Start'&&this.battle.cardManagers[this.team-1].hand.lastPlayed[0].name!='Use Teleporter\nStart'){
                        this.battle.cardManagers[this.team-1].deAbstract(2,1,['Use Teleporter\nStart'])
                    }else if(this.name=='Teleporter End'&&this.battle.cardManagers[this.team-1].hand.lastPlayed[0].name!='Use Teleporter\nEnd'){
                        this.battle.cardManagers[this.team-1].deAbstract(2,1,['Use Teleporter\nEnd'])
                    }
                }
            }
        }else if(this.support){
            this.fade=smoothAnim(this.fade,this.life>0&&this.status.main[51]<=0&&this.status.main[374]<=0,0,1,15)
            this.infoAnim.life=smoothAnim(this.infoAnim.life,this.life>0,0,1,5)
            if(this.life<=0&&!this.dead){
                this.dead=true
                this.deTarget()
                this.battle.tileManager.activate()
                this.battle.updateTargetting()
                switch(this.name){
                    case 'Medic':
                        for(let a=0,la=this.battle.players;a<la;a++){
                            this.battle.cardManagers[a].trueAllGroupEffectArgs(65,[7237])
                            if(this.battle.relicManager.hasRelic(231,a)){
                                this.battle.overlayManager.overlays[25][a].active=true
                                this.battle.overlayManager.overlays[25][a].activate([0,[]])
                                for(let b=0,lb=this.battle.relicManager.active[231][a+1];b<lb;b++){
                                    this.battle.overlayManager.overlays[25][a].activate([1,[{type:8,value:[]}]])
                                }
                            }
                        }
                    break
                }
                if(this.ally>=0){
                    this.battle.combatantManager.purgeAlly(this.ally,this.type)
                }else{
                    if(this.battle.modded(114)){
                        this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Soul',types.combatant),this.goal.anim.direction)
                    }
                    if(this.battle.modded(181)){
                        for(let a=0,la=this.battle.players;a<la;a++){
                            this.battle.loseCurrency(200,a)
                        }
                    }
                }
            }
        }else{
            this.fade=smoothAnim(this.fade,this.life>0&&this.status.main[51]<=0&&this.status.main[374]<=0,0,1,15)
            this.infoAnim.life=smoothAnim(this.infoAnim.life,this.life>0,0,1,5)
            if(this.life<=0&&!this.dead){
                this.dead=true
                this.battle.tileManager.activate()
                if(this.name!='Prisoner Informant'&&this.name!='Gangster Machinegunner Informant'&&this.name!='Walker Driver Informant'){
                    this.battle.counter.killed++
                }
                this.battle.updateTargetting()
                if(this.battle.turn.main<this.battle.players){
                    this.battle.cardManagers[this.battle.turn.main].hand.allEffect(111)
                }
                if(!this.minion){
                    this.battle.relicManager.activate(3,[this.id])
                }
                if(this.battle.turn.main<this.battle.players){
                    this.battle.stats.killed[this.battle.turn.main]++
                }
                if(this.spec.includes(2)){
                    this.battle.combatantManager.allEffect(2,[0])
                    this.battle.clearReinforce()
                }
                if(this.status.main[42]>0){
                    let player=this.battle.turn.main>=0&&this.battle.turn.main<this.battle.players?this.battle.turn.main:floor(random(0,this.battle.players))
                    this.battle.overlayManager.overlays[25][player].active=true
                    this.battle.overlayManager.overlays[25][player].activate([0,[
                        {type:0,value:[this.status.main[42]]}]])
                }
                if(this.status.main[80]>0){
                    this.battle.combatantManager.areaAbstract(0,[this.base.life*this.status.main[80],this.id,0],this.tilePosition,[3,this.id],[0,1],false,0)
                }
                if(this.status.main[199]>0){
                    this.battle.combatantManager.areaAbstract(0,[this.status.main[199],this.id,0],this.tilePosition,[3,this.id],[0,1],false,0)
                    this.battle.particleManager.particles.push(new particle(this.layer,this.position.x,this.position.y,10,[30]))
                }
                if(this.status.main[707]>0){
                    let player=this.battle.turn.main>=0&&this.battle.turn.main<this.battle.players?this.battle.turn.main:floor(random(0,this.battle.players))
                    this.battle.combatantManager.combatants[this.battle.combatantManager.getPlayerCombatantIndex(player)].gainMaxHP(this.status.main[707])
                }
                if(this.status.main[770]>0){
                    for(let a=0,la=this.battle.cardManagers.length;a<la;a++){
                        if(this.communizers.includes(a)){
                            this.battle.cardManagers[a].deck.add(findName('Worker',types.card),0,0,0)
                            this.battle.cardManagers[a].trueAllGroupEffectArgs(65,[7236])
                        }
                    }
                }
                this.battle.combatantManager.dead()
                for(let a=0,la=this.battle.players;a<la;a++){
                    this.battle.cardManagers[a].discard.allEffectArgs(24,[3198])
                    this.battle.cardManagers[a].reserve.allEffectArgs(24,[3198])
                    if(this.battle.modded(17)){
                        for(let b=0,lb=3;b<lb;b++){
                            if(this.battle.cardManagers[a].reserve.cards.length>0){
                                this.battle.cardManagers[a].randomEffect(1,8,[])
                            }else{
                                this.battle.cardManagers[a].randomEffect(3,8,[])
                            }
                        }
                    }
                }
                if(this.battle.modded(54)&&this.battle.turn.main<this.battle.players){
                    this.battle.loseEnergy(1,this.battle.turn.main)
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
                if(this.spec.includes(18)){
                    let player=this.battle.turn.main>=0&&this.battle.turn.main<this.battle.players?this.battle.turn.main:floor(random(0,this.battle.players))
                    this.battle.overlayManager.overlays[25][player].active=true
                    this.battle.overlayManager.overlays[25][player].activate([0,[
                        {type:2,value:[]}]])
                }
                if(this.name=='Prestige'&&this.base.life>(game.ascend>=31?10:20)){
                    this.doubleHalf()
                    this.moved=false
                    this.battle.updateTargetting()
                    this.dead=false
                    this.battle.tileManager.activate()
                    this.battle.counter.killed--
                }else if(this.battle.modded(100)&&this.base.life>1){
                    this.life=1
                    this.base.life=1
                    this.collect.life=1
                    this.moved=false
                    this.battle.updateTargetting()
                    this.dead=false
                    this.battle.tileManager.activate()
                    this.battle.counter.killed--
                }else if(this.status.main[676]>0){
                    this.status.main[676]--
                    this.life=this.base.life
                    this.statusEffect('Stun',1)
                    this.statusEffect('Invulnerable',1)
                    this.moved=false
                    this.battle.updateTargetting()
                    this.dead=false
                    this.battle.tileManager.activate()
                    this.battle.counter.killed--
                }else{
                    let type=0
                    for(let a=0,la=1+(this.battle.modded(71)?1:0);a<la;a++){
                        if(this.battle.modded(72)&&floor(random(0,2))==0&&this.initialName!='Modicum'){
                            this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Modicum',types.combatant),this.goal.anim.direction)
                        }
                        if(this.battle.modded(92)&&this.initialName!='Bee'){
                            this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Bee',types.combatant),this.goal.anim.direction)
                        }
                        if(this.battle.modded(141)&&floor(random(0,2))==0&&this.initialName!='Soul'&&(this.battle.encounter.class==1||this.battle.encounter.class==2)){
                            this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Soul',types.combatant),this.goal.anim.direction)
                        }
                        if(this.battle.modded(29)){
                            switch(this.initialName){
                                case 'Big Duck':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Duck',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Duck',types.combatant),this.goal.anim.direction)
                                break
                                case 'Enforcer':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Ninja Master',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Ninja Master',types.combatant),this.goal.anim.direction)
                                break
                                case 'Agent Duck':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Big Duck',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Duck',types.combatant),this.goal.anim.direction)
                                break
                                case 'Chief Deployer':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Deployer',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Deployer',types.combatant),this.goal.anim.direction)
                                break
                                case 'Solar Shard':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Lunar Shard',types.combatant),this.goal.anim.direction)
                                break
                                case 'Management Caller':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Management Soldier',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Management Soldier',types.combatant),this.goal.anim.direction)
                                break
                                case 'Prison Guard':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Prisoner',types.combatant),this.goal.anim.direction)
                                break
                                case 'Swordmaster':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Human',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Human',types.combatant),this.goal.anim.direction)
                                break
                                case 'Gas Man':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Fireball',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Fireball',types.combatant),this.goal.anim.direction)
                                break
                                case 'Champion':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Pure Swordsman',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Pure Swordsman',types.combatant),this.goal.anim.direction)
                                break
                                case 'Deadshell':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Thornvine',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Thornvine',types.combatant),this.goal.anim.direction)
                                break
                                case 'Executive':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Intern',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Intern',types.combatant),this.goal.anim.direction)
                                break
                                case 'Mechanized':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Management Robot',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Management Robot',types.combatant),this.goal.anim.direction)
                                break
                                case 'Bomber Boy':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Thug',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Thug',types.combatant),this.goal.anim.direction)
                                break
                                case 'Assistant Hiring Officer':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Executive',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Executive',types.combatant),this.goal.anim.direction)
                                break
                                case 'Assistant Fitness Officer':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Billy Beatup',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Billy Beatup',types.combatant),this.goal.anim.direction)
                                break
                                case 'Armored Ninja':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Ninja',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Ninja',types.combatant),this.goal.anim.direction)
                                break
                                case 'Jet':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Management Sniper',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Management Sniper',types.combatant),this.goal.anim.direction)
                                break
                                case 'Gangster Machinegunner':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Gangster',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Gangster',types.combatant),this.goal.anim.direction)
                                break
                                case 'Elf Archer':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Bush Thing',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Bush Thing',types.combatant),this.goal.anim.direction)
                                break
                                case 'Beekeeper':
                                    type=findName('Bee',types.combatant)
                                    for(let b=0,lb=7;b<lb;b++){
                                        this.battle.combatantManager.holdSummonCombatant(this.tilePosition,type,this.goal.anim.direction)
                                    }
                                break
                                case 'Coffee Commander':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Management Special Forces',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Management Special Forces',types.combatant),this.goal.anim.direction)
                                break
                                case 'Prestige':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Nerfer',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Buffer',types.combatant),this.goal.anim.direction)
                                break
                                case 'Divine Guard':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Nil',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Nil',types.combatant),this.goal.anim.direction)
                                break
                                case 'Avant Guard':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Glitched Giant',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Glitched Giant',types.combatant),this.goal.anim.direction)
                                break
                                case 'Vengeful':
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Rusty',types.combatant),this.goal.anim.direction)
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Rusty',types.combatant),this.goal.anim.direction)
                                break
                                case 'Tech Support':
                                    type=findName('Bolt',types.combatant)
                                    for(let b=0,lb=7;b<lb;b++){
                                        this.battle.combatantManager.holdSummonCombatant(this.tilePosition,type,this.goal.anim.direction)
                                    }
                                break

                            }
                        }
                        switch(this.initialName){
                            case 'Slimoid':
                                type=findName('Modicum',types.combatant)
                                for(let b=0,lb=7;b<lb;b++){
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,type,this.goal.anim.direction)
                                }
                            break
                            case 'Big Slime':
                                this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Slime',types.combatant),this.goal.anim.direction)
                                this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Slime',types.combatant),this.goal.anim.direction)
                            break
                            case 'Big Spike Slime':
                                this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Spike Slime',types.combatant),this.goal.anim.direction)
                                this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Spike Slime',types.combatant),this.goal.anim.direction)
                            break
                            case 'Big Slimoid':
                                this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Slimoid',types.combatant),this.goal.anim.direction)
                                this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Slimoid',types.combatant),this.goal.anim.direction)
                            break
                            case 'Big Rainbow Slime':
                                this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Rainbow Slime',types.combatant),this.goal.anim.direction)
                                this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Rainbow Slime',types.combatant),this.goal.anim.direction)
                            break
                            case 'Slime Boss':
                                this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Big Slime',types.combatant),this.goal.anim.direction)
                                this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Big Slime',types.combatant),this.goal.anim.direction)
                            break
                            case 'Solar Shard':
                                this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Lunar Shard',types.combatant),this.goal.anim.direction)
                            break
                            case 'Lunar Shard':
                                this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName('Lunar Dust',types.combatant),this.goal.anim.direction)
                            break
                            case 'Personnel Carrier':
                                type=findName('Management Robot',types.combatant)
                                for(let a=0,la=5;a<la;a++){
                                    this.battle.combatantManager.holdSummonCombatant(this.tilePosition,type,this.goal.anim.direction)
                                }
                            break
                            case 'Danger':
                                this.battle.combatantManager.holdSummonCombatant(this.tilePosition,findName(['Management Robot','Management Soldier','Management Officer','Management Custodian','Management Autoduck','Management Sniper'][floor(random(0,6))],types.combatant),this.goal.anim.direction)
                            break
                        }
                    }
                    this.battle.combatantManager.reorder()
                }
            }
        }
        this.time++
        this.infoAnim.block=smoothAnim(this.infoAnim.block,this.block>0,0,1,5)
        this.infoAnim.barrier=smoothAnim(this.infoAnim.barrier,this.barrier>0,0,1,5)
        this.infoAnim.bounce=smoothAnim(this.infoAnim.bounce,this.bounce>0,0,1,5)
        this.infoAnim.blockSize=smoothAnim(this.infoAnim.blockSize,this.block>=100||vceil(this.block*10)%10!=0&&this.block>=10,1,this.block>=100&&vceil(this.block*10)%10!=0?1.5:1.25,10)
        this.infoAnim.barrierSize=smoothAnim(this.infoAnim.barrierSize,this.barrier>=100||vceil(this.barrier*10)%10!=0&&this.barrier>=10,1,this.barrier>=100&&vceil(this.barrier*10)%10!=0?1.5:1.25,10)
        this.infoAnim.bounceSize=smoothAnim(this.infoAnim.bounceSize,this.bounce>=100||vceil(this.bounce*10)%10!=0&&this.bounce>=10,1,this.bounce>=100&&vceil(this.bounce*10)%10!=0?1.5:1.25,10)
        this.infoAnim.barrierPush=smoothAnim(this.infoAnim.barrierPush,this.block>0&&this.barrier>0,0,1,5)
        this.infoAnim.bouncePush=smoothAnim(this.infoAnim.bouncePush,(this.block>0||this.barrier>0)&&this.bounce>0,0,1,5)
        this.infoAnim.size=smoothAnim(this.infoAnim.size,this.infoAnim.upSize,1,1.5,5)
        this.infoAnim.description=smoothAnim(this.infoAnim.description,this.infoAnim.upSize,0,1,5)
        this.infoAnim.balance=smoothAnim(this.infoAnim.balance,this.balance>0,0,1,5)
        this.infoAnim.orb=smoothAnim(this.infoAnim.orb,this.anyOrb,0,1,5)
        if(this.infoAnim.orb>0){
            for(let a=0,la=this.orbs.length;a<la;a++){
                for(let b=0,lb=constants.orbNumber;b<lb;b++){
                    this.infoAnim.orbSpec[a][b]=smoothAnim(this.infoAnim.orbSpec[a][b],this.orbs[a]==b,0,1,10)
                }
                if(abs(this.orbPos[a]-a/la*360)>1){
                    this.orbPos[a]=map(0.1,0,1,this.orbPos[a],a/la*360)
                }
            }
        }
        if(abs(this.anim.direction-this.goal.anim.direction)<=15*game.animRate||abs(this.anim.direction-this.goal.anim.direction-360)<=15*game.animRate||abs(this.anim.direction-this.goal.anim.direction+360)<=15*game.animRate||abs(this.anim.direction-this.goal.anim.direction-720)<=15*game.animRate||abs(this.anim.direction-this.goal.anim.direction+720)<=15*game.animRate){
            this.anim.direction=this.goal.anim.direction
        }else if(
            this.anim.direction>this.goal.anim.direction&&this.anim.direction<this.goal.anim.direction+180||
            this.anim.direction>this.goal.anim.direction-360&&this.anim.direction<this.goal.anim.direction-180||
            this.anim.direction>this.goal.anim.direction+360&&this.anim.direction<this.goal.anim.direction+540||
            this.anim.direction>this.goal.anim.direction-720&&this.anim.direction<this.goal.anim.direction-540||
            this.anim.direction>this.goal.anim.direction+720&&this.anim.direction<this.goal.anim.direction+900){
            this.anim.direction-=15*game.animRate
        }else if(
            this.anim.direction<this.goal.anim.direction&&this.anim.direction>this.goal.anim.direction-180||
            this.anim.direction<this.goal.anim.direction+360&&this.anim.direction>this.goal.anim.direction+180||
            this.anim.direction<this.goal.anim.direction-360&&this.anim.direction>this.goal.anim.direction-540||
            this.anim.direction<this.goal.anim.direction+720&&this.anim.direction>this.goal.anim.direction+540||
            this.anim.direction<this.goal.anim.direction-720&&this.anim.direction>this.goal.anim.direction-900){
            this.anim.direction+=15*game.animRate
        }else{
            this.anim.direction+=15*game.animRate*(floor(random(0,2)*2-1))
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
            this.statusSignUpdate(this.status.display[a])
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
                this.moveOffset(this.dodges[a].direction,5)
            }else if(this.dodges[a].timer<=16){
                this.moveOffset(this.dodges[a].direction,-5)
            }else{
                this.dodges.splice(a,1)
                a--
                la--
            }
        }
        if(this.type>0&&this.type<=constants.playerNumber){
            this.trigger.display.extra.damage=this.life<=this.base.life*0.2&&options.damage
            if(this.balance>this.balanceCap){
                if(this.status.main[105]>0){
                    this.battle.addSpecificEnergy(1,this.id,0)
                }else if(this.status.main[516]>0){
                    this.battle.addSpecificEnergy(1,this.id,6)
                }else if(this.status.main[104]<=0){
                    this.battle.cardManagers[this.id].hand.allEffect(94)
                    if(this.battle.turn.main==this.id){
                        this.battle.turn.endReady=true
                    }
                }
                this.balance=0
            }else if(this.balance<0){
                this.balance=0
            }
        }
        switch(this.name){
            case 'Lira': case 'Setsuna': case 'Sanae': case 'Shinmyoumaru': case 'Ume':
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
            case 'Eternal Judge':
                for(let a=0,la=this.sins.length;a<la;a++){
                    this.infoAnim.sins[a]=smoothAnim(this.infoAnim.sins[a],this.sins[a]>=0,0,1,5)
                    if(this.life>0){
                        let marker=[0,4,8,2,6,9,1,5,10,10,3,7][a]/11
                        if(this.time%22==marker*22){
                            let spin=this.time*(1+marker)*(a%2*2-1)+360*marker
                            this.battle.particleManager.particlesNonCalc.push(new particle(
                                this.layer,this.position.x+lsin(spin)*45,this.position.y-45+lcos(this.time*2+360*marker)*10+lcos(-this.time+360*marker)*30+a*4-20,112,
                                [[100-50*this.sins[a]%2,0,50*floor(this.sins[a]/2)]]))
                        }
                    }
                }
            break
            case 'Spirit of Wealth': case 'Spirit of Elegance':
                if(this.time%5==0&&this.life>0){
                    this.battle.particleManager.particlesNonCalc.push(new particle(
                        this.layer,this.position.x+random(-30,30),this.position.y+random(-30,5),197,
                        [0,random(0.4,0.6),this.color]))
                }
            break
        }
    }
    onClick(scene){
        switch(scene){
            case 'battle':
                if(this.life>0&&this.infoAnim.orb>0){
                    let complete=false
                    for(let a=1,la=this.orbs.length;a<la;a++){
                        if(lcos(this.time/game.animRate+this.orbPos[a])>0){
                            if(dist(inputs.rel.x,inputs.rel.y,this.position.x+lsin(this.time/game.animRate+this.orbPos[a])*30,this.position.y-45+lcos(this.time/game.animRate+this.orbPos[a])*10)<10&&this.orbs[0]>=0&&this.orbs[a]>=0){
                                let hold=[this.orbs[a],this.orbDetail[a]]
                                this.orbs[a]=this.orbs[0]
                                this.orbs[0]=hold[0]
                                this.orbDetail[a]=this.orbDetail[0]
                                this.orbDetail[0]=hold[1]
                            }
                        }
                    }
                    if(!complete){
                        for(let a=1,la=this.orbs.length;a<la;a++){
                            if(lcos(this.time/game.animRate+this.orbPos[a])<=0){
                                if(dist(inputs.rel.x,inputs.rel.y,this.position.x+lsin(this.time/game.animRate+this.orbPos[a])*30,this.position.y-45+lcos(this.time/game.animRate+this.orbPos[a])*10)<10&&this.orbs[0]>=0&&this.orbs[a]>=0){
                                    let hold=[this.orbs[a],this.orbDetail[a]]
                                    this.orbs[a]=this.orbs[0]
                                    this.orbs[0]=hold[0]
                                    this.orbDetail[a]=this.orbDetail[0]
                                    this.orbDetail[0]=hold[1]
                                }
                            }
                        }
                    }
                }
            break
        }
    }
}